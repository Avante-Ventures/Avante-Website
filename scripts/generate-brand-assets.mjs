// Generates favicons + OG image from inline SVG using the Avante brand:
//   - Background: #151E35 (avante-background CSS var)
//   - Gradient on the "A": #F9B437 → #F18B46 → #98509A → #42468C (135deg)
//
// Run: node scripts/generate-brand-assets.mjs
// Outputs to: public/

import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')

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

const OG_SVG = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F9B437"/>
      <stop offset="25%" stop-color="#F18B46"/>
      <stop offset="60%" stop-color="#98509A"/>
      <stop offset="100%" stop-color="#42468C"/>
    </linearGradient>
    <radialGradient id="haze" cx="20%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#98509A" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#151E35" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haze2" cx="80%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#F9B437" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#151E35" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#151E35"/>
  <rect width="1200" height="630" fill="url(#haze)"/>
  <rect width="1200" height="630" fill="url(#haze2)"/>

  <!-- AVANTE wordmark (gradient A + white VANTE) -->
  <text x="600" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="160" font-weight="900" text-anchor="middle" letter-spacing="-5">
    <tspan fill="url(#grad)">A</tspan><tspan fill="#FFFFFF">VANTE</tspan>
  </text>

  <!-- Tagline -->
  <text x="600" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="34" font-weight="500" text-anchor="middle" fill="#F4A261" letter-spacing="-0.5">
    Silicon Valley Playbooks. Brazil-Native Execution.
  </text>

  <!-- Subtitle -->
  <text x="600" y="440" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="22" font-weight="400" text-anchor="middle" fill="rgba(255,255,255,0.55)">
    AI-native venture studio · Brazil + LATAM
  </text>

  <!-- Bottom domain -->
  <text x="600" y="570" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="18" font-weight="500" text-anchor="middle" fill="rgba(255,255,255,0.4)" letter-spacing="2">
    AVANTEVENTURES.COM
  </text>
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
  { svg: OG_SVG,               out: 'og-image.png',              width: 1200, height: 630 },
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

console.log('\nDone. All assets written to public/')
