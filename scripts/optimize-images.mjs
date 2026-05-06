// One-shot image optimizer: walks src/assets/ and creates .webp variants
// next to every PNG larger than the threshold. Originals stay as fallback.
//
// The figmaAssetResolver vite plugin (vite.config.ts) automatically swaps
// `figma:asset/<hash>.png` to the .webp file when present, so component
// imports don't need to change.
//
// WebP @ quality 82 typically saves 60-80% on photographic content vs PNG
// truecolor and is supported in 96%+ of browsers in 2026 (Safari 14+,
// Chrome 32+, Firefox 65+, Edge 18+).
//
// Run: node scripts/optimize-images.mjs

import sharp from 'sharp'
import { readdir, stat, writeFile } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOTS = [
  resolve(__dirname, '..', 'src', 'assets'),
  resolve(__dirname, '..', 'src', 'imports'),
]
const MIN_BYTES = 20_000 // skip tiny PNGs (already optimal)
const QUALITY = 82

let totalBefore = 0
let totalAfter = 0

for (const root of ROOTS) {
  console.log(`\n[${root.split('/').slice(-2).join('/')}]`)
  let files
  try {
    files = await readdir(root)
  } catch {
    console.log('  (skip — directory not found)')
    continue
  }

  for (const f of files) {
    if (!f.endsWith('.png')) continue
    const inPath = join(root, f)
    const outPath = inPath.replace(/\.png$/, '.webp')
    const { size } = await stat(inPath)

    if (size < MIN_BYTES) {
      console.log(`-  ${f}  ${(size/1024).toFixed(1)} KB  (skip, < ${MIN_BYTES/1024}KB)`)
      continue
    }

    const buf = await sharp(inPath).webp({ quality: QUALITY, effort: 6 }).toBuffer()
    await writeFile(outPath, buf)

    const reduction = (1 - buf.length / size) * 100
    console.log(
      `✓  ${f}  ${(size/1024).toFixed(1)}KB → ${(buf.length/1024).toFixed(1)}KB  (-${reduction.toFixed(0)}%)`
    )

    totalBefore += size
    totalAfter += buf.length
  }
}

const totalReduction = totalBefore ? (1 - totalAfter / totalBefore) * 100 : 0
console.log(
  `\nTotal: ${(totalBefore/1024).toFixed(0)}KB → ${(totalAfter/1024).toFixed(0)}KB  (-${totalReduction.toFixed(0)}%)`
)
console.log('Done. .webp files written next to .png originals.')
