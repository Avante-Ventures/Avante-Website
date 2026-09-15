# Avante: world to work

Implemented locally on September 14, 2026, following the approved full-website creative direction and the request for a 3D world tour. Preview: http://127.0.0.1:4315/en.

## What changed

The homepage now opens with a real Three.js globe, a scroll-controlled approach to Brazil and a transition into the existing Avante photograph of São Paulo with shallow photographic depth. Native scroll and three chapter buttons control the camera. Ventures and Studio remain one click away. Following Cristian's visual correction, the procedural block city was removed. The arrival now uses the real São Paulo photographic asset, with runtime camera travel and parallax. It is a 2.5D photographic treatment, not a scanned city.

The rest of the homepage is a complete editorial sequence:

- Studio statement and six interactive canonical stages.
- Two substantial AlphaJuri and WIR product exhibits, with keyboard-operable workflow tabs. These interfaces are explicitly labeled illustrative concepts.
- São Paulo photographic chapter and the Brazil / Silicon Valley team perspective.
- All six original team portraits, readable names and roles, expandable canonical biographies and existing LinkedIn links.
- Three actual published Library articles with localized metadata and preserved article URLs.
- Subscription, partner contact and the existing footer, including source anchors.

Navigation now includes Studio, Ventures, People and Library. Portfolio includes expandable product exhibits, and direct venture links open the correct exhibit. Shared inner-page mastheads use the new ivory editorial typography. Existing Studio, Principles, Library, Article and Investors routes retain their substantive content and structure. They are not wholesale rewrites. The Library index now uses available Spanish translations, limits entrance delays on long indexes and includes a filter empty state with a reset action.

The mobile menu opens without an animation-dependent delay, exposes expanded state and supports Escape. Cross-route hash navigation now resolves its target after lazy content mounts and opens a containing disclosure when needed.

A portfolio summary incorrectly labeled Amanda's $500M+ experience as deployed capital. It now identifies assets under management and attributes her CFO role at Innova and Unbox, consistent with TEAM-FACTS. The cohort count is derived from the displayed list rather than a separate hardcoded number.

## Rendering and assets

- One lazily loaded Three.js renderer. No animation library or new runtime dependency added.
- The globe uses the canonical seven-stop Avante gradient. The city uses a single photographic shader pass, replacing the repeated building geometry.
- Frames are requested while the scroll or pointer camera settles. Rendering pauses offscreen and in hidden documents, except a single initial frame or an explicit navigation update. Resources and listeners are released on unmount.
- The first frame is drawn even when a browser initially opens in the background. This avoids a blank 3D layer while requestAnimationFrame is suspended.
- Below 900 px, reduced motion, unavailable WebGL or map-load failure, the city photograph carries the opening. Core content remains ordinary HTML.
- Geography: Natural Earth public-domain polygons, rounded and stripped to a local 160 KB file. Attribution: `public/world-assets/ATTRIBUTION.md`.
- Real team photos and Avante marks are reused. The approved São Paulo photographic background is converted to WebP without changing its composition. The prior `photo-skyline.jpg` asset was visually identified as an illustration and removed from the editorial chapter.
- Homepage article previews are a small generated metadata snapshot, avoiding an initial import of the complete Library corpus. After article changes, run `node scripts/generate-home-reading.mjs`. Use `--check` to verify it matches the published source.

## Validation

- `npm run build:vite-only`: successful. The existing complete Library corpus still produces the large-chunk warning. No IndexNow, prerender publication, deployment, commit or push was run.
- `node --test scripts/world-journey.test.mjs`: three tests passed. Covers chapter destinations, bounded and reversible camera travel, continuous scene coverage and geographic point placement.
- `node scripts/generate-home-reading.mjs --check`: passed. All three previews match actual published articles.
- Targeted TypeScript check: new world components pass with `noImplicitAny` disabled. Strict checking reports the existing `useLanguage.tsx:948` dictionary-index error. It was reproduced and left untouched.
- Safari desktop: visually inspected initial globe, Brazil approach, São Paulo arrival, venture layout, product tab switching, full team grid, expanded Amanda biography and cross-route AlphaJuri exhibit link.
- Chrome desktop: visually confirmed the initial globe and homepage composition.
- Safari at a real 390 px iframe viewport: inspected Spanish photographic opening, mobile menu, menu-to-team navigation, portrait grid and an actual Spanish article. The temporary viewport-check page was removed.

Real phone hardware, foreground frame pacing, browser GPU-context loss and OS-level reduced-motion emulation have not been measured or exercised. No frame-rate or Lighthouse score is claimed.

## Existing content boundary

The original Portfolio still classifies FutureProofing differently from the internal canonical venture list. This implementation does not make a new ownership determination. The new homepage selects AlphaJuri and WIR only. The remaining pre-existing Portfolio and Investors claims need their separate editorial reconciliation before publication.

The previous desk experiment remains in the working tree as an unused component directory. The homepage imports only the new world experience. The proposal image remains a composition study, not an asset used as the implemented page.


## Palette and photographic-city revision

Cristian asked to restore the original concept's Avante colors and real São Paulo city. The correction uses the canonical design system (`../AVANTE-DESIGN-SYSTEM.md`): amber, coral, mauve, purple and indigo, with frost-white text and ink surfaces. Environment lighting, globe geography, project exhibits, progress line and closing glow now follow those colors. Beige and bronze secondary typography was replaced with the brand's cooler neutral text tones.

The real São Paulo photograph appears at desktop arrival, in the mobile/reduced-motion fallback and in the editorial geography chapter. Gentle foreground-dependent parallax and forward travel preserve the photographic buildings rather than substituting geometry. The existing Avante source image limits the available detail. No photogrammetry, new buildings or AI-generated skyline is presented as a real location.


## Cinematic arrival revision

The photo-only arrival described above has been superseded by the [cinematic arrival implementation](2026-09-14-cinematic-arrival.md): a 30-second guided journey, real São Paulo night footage, a 4K poster and a procedural gallery using the official Avante A. The office-door ending was removed at Cristian's request. Four journey tests, the targeted TypeScript check and the Vite-only build pass. See the new note for source attribution, responsive behavior and visual QA.
