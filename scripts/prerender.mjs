// Post-build prerender: launches headless Chromium against a tiny static SPA
// server pointed at dist/, navigates each route, and writes the post-hydration
// HTML to dist/<route>/index.html. Vercel will serve those static files
// directly, so crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot) see
// fully-rendered content without executing JavaScript.
//
// Cross-environment Chromium strategy:
//   - On Vercel build (`VERCEL=1`): use @sparticuz/chromium (stripped binary
//     that ships its own libnspr4 etc., works in Vercel's bare container)
//   - Locally on macOS: use installed Google Chrome (`/Applications/...`)
//   - Locally on Linux: probe well-known chromium / google-chrome paths
//
// Why not full puppeteer: bundles ~150MB of Chromium that fails on Vercel's
// build container with "libnspr4.so: cannot open shared object file".

import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
// Phase 3: bilingual URL routing — 6 routes (3 paths × 2 locales).
// Plus the apex `/` which redirects to /en (or /pt by browser detection)
// at runtime; we still prerender it so crawlers without JS see the redirect.
const ROUTES = [
  '/',
  '/en', '/en/why-avante', '/en/library',
  '/pt', '/pt/why-avante', '/pt/library',
]
const PORT = 4179

// ─────────────────────────────────────────────────────────────────────
// Resolve a Chromium binary path that works in this environment
// ─────────────────────────────────────────────────────────────────────

const KNOWN_LOCAL_PATHS = [
  // macOS
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  // Linux
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
]

async function resolveChromium() {
  // Vercel / generic CI: use Sparticuz
  if (process.env.VERCEL || process.env.CI) {
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: chromium.headless,
    }
  }

  // Local: probe known install paths
  for (const path of KNOWN_LOCAL_PATHS) {
    if (existsSync(path)) {
      return {
        executablePath: path,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      }
    }
  }

  throw new Error(
    'No Chromium binary found at known paths. Install Google Chrome ' +
    'locally, or set VERCEL=1 to use @sparticuz/chromium.'
  )
}

// ─────────────────────────────────────────────────────────────────────
// Tiny SPA static server: SPA fallback so React Router takes over for
// extension-less paths (matches Vercel rewrite contract).
// ─────────────────────────────────────────────────────────────────────

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.webmanifest': 'application/manifest+json',
}

function makeServer() {
  return createServer(async (req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0])
    let filePath = join(DIST, urlPath === '/' ? 'index.html' : urlPath)

    if (!extname(filePath) && !existsSync(filePath)) {
      filePath = join(DIST, 'index.html')
    } else if (!existsSync(filePath)) {
      res.writeHead(404)
      return res.end('404')
    }

    try {
      const data = await readFile(filePath)
      const ext = extname(filePath).toLowerCase()
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(data)
    } catch (err) {
      res.writeHead(500)
      res.end(String(err))
    }
  })
}

// ─────────────────────────────────────────────────────────────────────
// Pipeline
// ─────────────────────────────────────────────────────────────────────

const launchOpts = await resolveChromium()
console.log(`🌐 Chromium: ${launchOpts.executablePath}`)

const server = makeServer()
await new Promise((r) => server.listen(PORT, r))
console.log(`📡 Static server on http://localhost:${PORT}`)

const browser = await puppeteer.launch(launchOpts)

const errors = []

// Render a single route with up to 2 attempts. Vercel's Sparticuz Chromium
// is slower than local Chrome and occasionally trips the hydration sentinel.
// One retry on a fresh page is enough — true hangs don't recover.
async function renderRoute(route) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const page = await browser.newPage()
    try {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
      page.on('pageerror', (e) => errors.push({ route, err: String(e) }))

      const url = `http://localhost:${PORT}${route}`
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

      // Wait until React mounts real content into #root. 30s tolerates
      // Vercel build's slower Chromium + lazy chunk loads on first nav.
      await page.waitForFunction(
        () => document.getElementById('root')?.children.length > 0,
        { timeout: 30000 }
      )

      // Settle window for lazy effects (Framer Motion poses, etc.)
      await new Promise((r) => setTimeout(r, 500))

      const html = await page.content()

      const outDir = route === '/' ? DIST : join(DIST, route)
      if (route !== '/') await mkdir(outDir, { recursive: true })
      const outFile = join(outDir, 'index.html')
      await writeFile(outFile, html)

      const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(1)
      console.log(`  ✓ ${outFile.replace(DIST, 'dist')}  (${sizeKB} KB)`)
      return // success
    } catch (err) {
      const tag = attempt === 1 ? 'retry' : 'FAILED'
      console.log(`  ${attempt === 1 ? '↻' : '✗'} ${tag}: ${err.message}`)
      if (attempt === 2) errors.push({ route, err: String(err) })
    } finally {
      await page.close()
    }
  }
}

for (const route of ROUTES) {
  console.log(`→ Rendering ${route}`)
  await renderRoute(route)
}

await browser.close()
server.close()

if (errors.length) {
  console.error('\n❌ Errors during prerender:')
  for (const e of errors) console.error(`  ${e.route}: ${e.err}`)
  process.exit(1)
}

console.log('\n✅ Prerender complete.')
