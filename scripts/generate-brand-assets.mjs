// Generates favicons + OG image using the Avante brand:
//   - Background: #151E35 (avante-background CSS var)
//   - Gradient on the "A": #F9B437 → #F18B46 → #98509A → #42468C (135deg)
//
// Favicons render an inline system-font "A" (small sizes, glyph legibility
// beats fidelity). The OG image (1200×630, the social share preview) instead
// composites the REAL vector wordmark (public/redesign-assets/avante-logo.svg)
// onto the branded background — a previous Arial-drawn "AVANTE" looked generic
// and off-brand in link previews. Logo-only, centered (chosen design).
//
// Run: node scripts/generate-brand-assets.mjs
// Outputs to: public/

import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')
const LOGO = resolve(PUBLIC, 'redesign-assets', 'avante-logo.svg')
const LOGO_RATIO = 2100 / 6108 // height / width of avante-logo.svg viewBox

// ─────────────────────────────────────────────────────────────────────
// Brand SVGs (inline) — keep system fonts so we don't depend on font files
// ─────────────────────────────────────────────────────────────────────

const FAVICON_SVG = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9B437"/>
      <stop offset="25%" stop-color="#F18B46"/>
      <stop offset="60%" stop-color="#98509A"/>
      <stop offset="100%" stop-color="#42468C"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="#151E35"/>
  <text x="256" y="256" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="380" font-weight="900" fill="url(#g)" text-anchor="middle"
        dominant-baseline="central" letter-spacing="-12">A</text>
</svg>
`.trim()

// Maskable variant — keep "A" inside the safe zone (~80% of canvas)
const FAVICON_MASKABLE_SVG = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9B437"/>
      <stop offset="25%" stop-color="#F18B46"/>
      <stop offset="60%" stop-color="#98509A"/>
      <stop offset="100%" stop-color="#42468C"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="#151E35"/>
  <text x="256" y="256" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="280" font-weight="900" fill="url(#g)" text-anchor="middle"
        dominant-baseline="central" letter-spacing="-8">A</text>
</svg>
`.trim()

// OG background only — the real logo is composited on top in generateOgImage().
const OG_W = 1200
const OG_H = 630
const OG_BG_SVG = `
<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="haze" cx="22%" cy="18%" r="75%">
      <stop offset="0%" stop-color="#98509A" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#151E35" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haze2" cx="82%" cy="88%" r="70%">
      <stop offset="0%" stop-color="#F9B437" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#151E35" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="#151E35"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#haze)"/>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#haze2)"/>
</svg>
`.trim()

// ─────────────────────────────────────────────────────────────────────
// Generation pipeline
// ─────────────────────────────────────────────────────────────────────

const targets = [
  { svg: FAVICON_SVG,          out: 'favicon-16x16.png',         size: 16  },
  { svg: FAVICON_SVG,          out: 'favicon-32x32.png',         size: 32  },
  { svg: FAVICON_SVG,          out: 'favicon.ico',               size: 32  }, // PNG-as-ico is OK in modern browsers
  { svg: FAVICON_SVG,          out: 'apple-touch-icon.png',      size: 180 },
  { svg: FAVICON_SVG,          out: 'favicon-192.png',           size: 192 },
  { svg: FAVICON_SVG,          out: 'favicon-512.png',           size: 512 },
  { svg: FAVICON_MASKABLE_SVG, out: 'favicon-512-maskable.png',  size: 512 },
]

for (const t of targets) {
  const pipeline = sharp(Buffer.from(t.svg))
  const resized = t.width
    ? pipeline.resize(t.width, t.height)
    : pipeline.resize(t.size, t.size)
  const buffer = await resized.png({ compressionLevel: 9, palette: false }).toBuffer()
  await writeFile(resolve(PUBLIC, t.out), buffer)
  console.log(`✓ ${t.out}  (${buffer.length.toLocaleString()} bytes)`)
}

// OG image: composite the REAL vector wordmark (gradient A + white VANTE),
// centered on the branded haze background. Logo width = 63% of canvas.
async function generateOgImage() {
  const logoW = Math.round(OG_W * 0.633) // 760px
  const logoH = Math.round(logoW * LOGO_RATIO)
  const logo = await sharp(Buffer.from(readFileSync(LOGO, 'utf8')), { density: 300 })
    .resize(logoW, logoH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const composited = await sharp(Buffer.from(OG_BG_SVG))
    .composite([{
      input: logo,
      top: Math.round((OG_H - logoH) / 2),
      left: Math.round((OG_W - logoW) / 2),
    }])
    .png()
    .toBuffer()
  // Second pass: strip the alpha channel → opaque RGB. Sharp applies flatten
  // BEFORE composite within a single pipeline, so it must run here on the
  // already-composited buffer. Some social crawlers (LinkedIn/WhatsApp image
  // proxies) render RGBA OG images as a blank preview; opaque RGB is safe.
  const buffer = await sharp(composited)
    .removeAlpha()
    .png({ compressionLevel: 9, palette: false })
    .toBuffer()
  await writeFile(resolve(PUBLIC, 'og-image.png'), buffer)
  console.log(`✓ og-image.png  (${buffer.length.toLocaleString()} bytes)`)
}

await generateOgImage()

console.log('\nDone. All assets written to public/')
