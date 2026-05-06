// Post-build prerender: launches Puppeteer against a tiny static SPA server
// pointed at dist/, navigates each route, and writes the post-hydration HTML
// to dist/<route>/index.html. Vercel will serve those static files directly,
// so crawlers (Googlebot, GPTBot, ClaudeBot, PerplexityBot) see fully-rendered
// content without executing JavaScript.
//
// Run automatically as part of `pnpm build` (see package.json scripts).
//
// Why this over vite-react-ssg: no refactor of routes.tsx, no peer-dep
// mismatch with react-router 7, captures real post-hydration DOM (Three.js,
// Framer Motion etc all settled).

import puppeteer from 'puppeteer'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const ROUTES = ['/', '/why-avante', '/library']
const PORT = 4179 // arbitrary free-ish port

// ─────────────────────────────────────────────────────────────────────
// Tiny SPA static server: serves files from DIST, falls back to /index.html
// for unknown paths so the React Router takes over. Identical contract to
// what Vercel will do at the edge once vercel.json rewrites kick in.
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

    // SPA fallback: if path has no extension and the file doesn't exist,
    // serve index.html. Lets Puppeteer hit /why-avante and React Router
    // resolves it.
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
// Main pipeline
// ─────────────────────────────────────────────────────────────────────

const server = makeServer()
await new Promise((r) => server.listen(PORT, r))
console.log(`📡 Static server on http://localhost:${PORT}`)

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const errors = []

for (const route of ROUTES) {
  const url = `http://localhost:${PORT}${route}`
  console.log(`→ Rendering ${route}`)
  const page = await browser.newPage()

  try {
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
    page.on('pageerror', (e) => errors.push({ route, err: String(e) }))

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

    // Wait until React has actually mounted real content into #root.
    // The shell ships with <div id="root"></div> empty; once hydrated it has
    // children. This guards against capturing a blank shell.
    await page.waitForFunction(
      () => document.getElementById('root')?.children.length > 0,
      { timeout: 10000 }
    )

    // Small delay to let lazy effects (animations, deferred loads) settle.
    await new Promise((r) => setTimeout(r, 500))

    const html = await page.content()

    // Write to dist/<route>/index.html (or dist/index.html for "/")
    const outDir = route === '/' ? DIST : join(DIST, route)
    if (route !== '/') await mkdir(outDir, { recursive: true })
    const outFile = join(outDir, 'index.html')
    await writeFile(outFile, html)

    const sizeKB = (Buffer.byteLength(html) / 1024).toFixed(1)
    console.log(`  ✓ ${outFile.replace(DIST, 'dist')}  (${sizeKB} KB)`)
  } catch (err) {
    errors.push({ route, err: String(err) })
    console.log(`  ✗ FAILED: ${err.message}`)
  } finally {
    await page.close()
  }
}

await browser.close()
server.close()

if (errors.length) {
  console.error('\n❌ Errors during prerender:')
  for (const e of errors) console.error(`  ${e.route}: ${e.err}`)
  process.exit(1)
}

console.log('\n✅ Prerender complete.')
