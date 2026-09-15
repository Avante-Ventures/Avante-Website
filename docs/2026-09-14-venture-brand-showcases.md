# Venture brand showcases

Design read: preserve the approved cinematic Avante experience, then make each venture feel like its own company. Audience: founders, operators and potential partners. Taste dials: design variance 8, motion 7, visual density 3. The reference skill is `/Users/cristianjaviermendivelsohincapie/.claude/skills/taste/SKILL.md`.

## Final composition

- AlphaJuri: a porcelain identity panel and a navy website panel on an orthogonal grid. The official alpha symbol is extruded with its blue-to-copper face and brushed copper edges; the official wordmark sits separately beneath it. The website is level, centered within its panel, with restrained depth and equal margins. On mobile, the symbol and wordmark form one horizontal masthead above the website.
- WIR: deep violet, warm cream, the official multicolor mark in 3D, and an offset website preview. Its colored faces use an enamel finish so lighting does not wash out the gradient.
- Both the website preview and the footer link open the public website. The same component appears in the portfolio disclosures. Arrival cards use the official SVG logos and lead to the corresponding homepage sections.
- The original illustrative product interfaces have been replaced by real website captures. São Paulo footage and the Avante arrival sculpture remain intact.

## Asset provenance

- AlphaJuri website: https://www.alphajuri.com/. Screenshot captured from the public page in Safari on September 14, 2026. Logo paths copied from `../alphajuri/brand/kit/alphajuri-logo.svg`, its official white variant and `alphajuri-symbol.svg`. Only the symbol's viewBox is cropped; its copper dot is intrinsic to the official mark and retained.
- WIR website: https://wirinnovation.ai/. Screenshot captured from the public page in Safari on September 14, 2026. Logo paths copied from `../wir-website/public/assets/wir-logo-branco.svg`; only the viewBox was cropped to remove empty margins.
- Website screenshots are cropped to the hero content and exported as local WebP assets. Mobile previews are approximately 21–23 KB each; larger versions are approximately 45–47 KB. These are linked snapshots, not embedded third-party applications.
- SVG paths are extruded directly with Three.js. Letter shapes, counters and the dot intrinsic to WIR's mark are preserved.

## Motion and cleanup

The logo scene is imported on intersection, renders on load/resize/pointer input, and releases geometry, materials, environment maps and WebGL contexts offscreen. There is no continuous spin or mobile touch interception. Reduced-motion and WebGL failure retain the official static logo. Screenshots load lazily with responsive sources; the existing mobile film behavior is preserved.

Decorative dots were removed from the homepage labels, location markers, process controls, globe endpoints, portfolio group headings, Library categories and Why Avante lists. Timeline dots became ticks. Removed the footer version tag and numbered homepage section labels. Brand colors, functional controls and punctuation remain.

The desktop journey now reserves its full height on the initial render, so direct venture anchors land correctly before the deferred scene loads.

The subsequent AlphaJuri refinement follows the user's request for an institutional, organized presentation. Local taste dials: variance 4, motion 4, density 3. It replaces the large floating wordmark and angled copper plane with the official monogram, clear alignment and restrained movement. WIR's approved composition is preserved.

## Validation

- `npm run build:vite-only`: passed. The existing large article-data chunk warning remains; no IndexNow notification was sent.
- Targeted TypeScript check using the existing `/tmp/avante-world-check/tsconfig.json`, with `--noImplicitAny false`: passed.
- `node --test scripts/world-journey.test.mjs`: 4 passed.
- `git diff --check`: passed.
- Safari: inspected desktop compositions, mobile layouts at 320 and 390 CSS pixels, the portfolio disclosure, link destinations and direct homepage anchor navigation. No horizontal overflow at those mobile widths; website CTA targets are 72px high. The visible logo reports ready with a canvas; the offscreen logo releases its canvas.
- Repeated desktop, 320px and 390px checks after the institutional AlphaJuri refinement: logo ready, no horizontal overflow, full preview and 72px mobile website CTA visible.
- Temporary same-origin QA wrapper removed from `public` and the final build. It disabled only the logo crossfade during screenshots because Safari background-window rendering throttles transitions.
- No Lighthouse score or physical-phone/4G result is claimed. Headless browser runs are disallowed by the project's local machine guidance. No commit, push or deployment performed.
