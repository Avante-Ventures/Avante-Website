# Perspective, people and the venture builder

September 14, 2026. Local implementation. No deployment or publishing.

## Changes

- Replaced only the Our perspective background with an Avante-colored dusk edit of the existing real São Paulo skyline. The hero flight, film, gallery and venture exhibits are unchanged.
- Added a single, lightly staggered reveal to the original team photos. Pointer interaction tilts the frame by at most 2.5 / 3.5 degrees. Keyboard focus gets a subtle frame lift. Motion preferences disable animation and transforms. The images are visible before enhancement, and observers and pending frames are cleaned up.
- Renamed the homepage section to Inside the Venture Builder at Cristian's explicit request. This localized naming choice overrides the existing brand-truth vocabulary preference for this section.
- Added the operating model: 3-4 ventures per year, $500K-$1.5M per venture across pre-seed, co-founder economics and operating-partner engagement through first revenue before board oversight. Source: `../content-engine/knowledge-base/brand-truth.md`. Milestone-based capital tranches also appear in `src/app/pages/PrinciplesPage.tsx`.
- Expanded all six canonical stages with work descriptions and a decision question. EN, PT and ES are complete. No portfolio performance figures, customer outcomes or return claims were invented.

## Image generation

Mode: built-in imagegen, lighting-weather edit. Reference/edit target: `public/world-assets/saopaulo-real.webp`, inspected before editing. The result is art-directed imagery derived from a real photograph. Generative detail and lighting are not documentary proof of an actual sunset or exact unchanged architecture.

Saved production assets: `public/world-assets/saopaulo-perspective-{960,1280,1672}.webp`, and `public/world-assets/saopaulo-perspective-portrait-{400,588}.webp`. The native output is 1672 × 941 despite the requested 3840 × 2160. Delivery assets are downsampled only. The largest landscape is 315,886 bytes; the larger mobile crop is 128,808 bytes. Mobile crops and WebP delivery are made with Sharp. Original team image files are unchanged.

Final prompt:

```text
Use case: lighting-weather.
Asset type: premium full-width editorial website background for Avante Ventures, 3840 x 2160 landscape.
Input image 1 is the edit target: the real São Paulo skyline photograph already owned by the website. Preserve its real architecture, geographic arrangement, rooftops, antenna tower, building proportions and photographic perspective. Do not invent or replace buildings.
Primary request: transform the murky underexposed daytime photograph into a beautiful, crisp, sophisticated São Paulo skyline at luminous dusk. Remove the flat muddy exposure and large fake flare. Recover elegant architectural detail with natural amber window lights, a warm coral horizon and a deep violet-indigo evening sky. Keep the city photographically believable, stately, glamorous and atmospheric, like a beautifully graded architectural editorial photograph.
Composition: retain the wide skyline and original buildings. Leftmost 40% should be relatively dark and quiet for ivory website text; the most luminous architecture and horizon glow are center-right. Let the towers read as a coherent skyline. Subtle atmospheric depth, beautifully resolved windows and silhouettes, calm broad sky. No new foreground objects.
Avante palette: amber #FAB437, coral #E47A5C, mauve #B05B8D, purple #7C4B98, indigo #454697 and #304B9B; deep ink #06070d in shadows. Colors come from sunset, sky and light, NOT a rainbow painted across buildings. Smooth natural sky gradient. Restrained warm light, rich cool shadows.
Constraints: preserve the real skyline composition and landmark topology. Change lighting, weather and color treatment only. No text, no logos, no watermark, no yellow dots, no particles, no neon, no cyan, no teal, no fantasy or futuristic towers, no illustration, no blurred buildings. Sharp premium large-display photographic quality.
```

## Verification

- Scoped TypeScript passed after implementation.
- Independent design and accessibility reviews found no blockers. The reviewer flagged possible Safari redundant image fetching; root reproduced it and corrected the picture to use source-only srcsets with an inline fallback.
- Fresh Safari at 390 CSS pixels requests only the 588-pixel mobile skyline. Loaded successfully, no horizontal overflow in the section.
- Safari at 768 CSS pixels in Spanish: the venture-builder section has no horizontal overflow, and the capital range wraps cleanly within its column.
- Safari at 320 CSS pixels in Portuguese: no horizontal overflow in the expanded section. Clicking Compound switches the selected button and the stage heading, explanation and decision question correctly.
- Safari at 390 CSS pixels: original team portraits load, the visible row enters once with `portrait-arrive`, and there is no horizontal overflow. Desktop framing and the new skyline were visually reviewed in Safari. These are responsive viewport checks, not physical-device tests.
- Final `npm run build:vite-only` passed in 4.18 seconds. The existing large article-chunk warning remains. Scoped TypeScript passed again after the Safari fix. `git diff --check` passed.
- Independent adversarial verification found no material missed defect. Reduced-motion behavior was verified in source by the accessibility reviewer, not by changing the user's OS motion setting.
- The temporary responsive QA wrapper was removed before the final build and is absent from both `public` and `dist`. QA screenshots and build log are in `/tmp/avante-perspective-2026-09-14/`. No additional dev server was started.

## Scope note

The earlier IRR comparison question remains pending and unchanged. It is separate from the operating-model facts added here.
