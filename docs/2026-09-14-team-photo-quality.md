# Team portrait quality — September 14, 2026

The six sunset portraits now use higher-quality exports from the existing native 1254 × 1254 masters. The previous delivery capped images at 800 pixels, and responsive sizing measured card width instead of the larger square image painted behind the vertical crop. This caused undersampling on Retina displays.

## Delivery and presentation

- New assets: `public/world-assets/team/{amanda,felipe,jess,andrea,cristian,luiz}-sunset-hq-{480,960,1254}.webp`.
- Pillow exports directly from the existing generated PNG masters, with WebP quality 96 and method 6. Smaller variants are downsampled; the largest retains native dimensions. No upscaling or new generative edit was performed.
- File sizes range from 51–67 KiB at 480 pixels, 122–184 KiB at 960 pixels, and 171–258 KiB at 1254 pixels. Images remain lazy-loaded with asynchronous decoding.
- `TeamPortrait` advertises all three sizes and accounts for the vertical cover crop in `sizes`. The venture builder portrait strip has its own crop-aware sizing.
- Homepage cards are capped at 340 CSS pixels wide. The mild saturation/contrast filter is removed. Existing framing, city assignments and motion remain.
- Andrea, Jess and Cristian retain San Francisco; Amanda, Felipe and Luiz retain São Paulo. The original supplied photos and previous exports are preserved.

## Verification

- All 18 new WebP files decode and have the expected dimensions. Comparison with the native masters confirms higher fidelity than the previous 800-pixel delivery.
- Native Safari at DPR 2: the home team section loaded all six portraits at 1221, 1440, 820, 390 and 320 CSS-pixel viewport widths, without horizontal overflow. Source resolution covered the full square image behind each vertical crop.
- Desktop and tablet cards selected 960-pixel assets at approximately 340 × 400 CSS pixels. The 390-pixel viewport selected 480-pixel assets at approximately 161 × 215; the 320-pixel single-column layout selected 960-pixel assets at 272 × 340.
- The venture builder strip selected 960-pixel assets for all three portraits at approximately 200 × 267 CSS pixels in a 1440-pixel viewport. These are browser viewport checks, not tests on physical phones.
- Scoped TypeScript validation passed. `npm run build:vite-only` passed; Vite retains its existing large article-data chunk warning. No prerender or IndexNow notification was run.
- Disposable QA, screenshots, asset validation and build logs are in `/tmp/avante-photo-quality-2026-09-14/`. The temporary review page was removed from `public` before building.

No deployment, commit or push was performed.
