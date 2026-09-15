# Built to compound: local implementation

Local preview: http://127.0.0.1:4315/en

## Implemented

- Original Three.js scene: desk, lamp, monitor, keyboard, layered documents, data records, operator chair, connecting paths, and a second operation in the closing beat. Geometry and canvas textures are authored locally. No Terminal runtime or assets are reused.
- Five scroll chapters with reversible scene poses, chapter controls, subtle pointer response, and an operator-section shortcut.
- AlphaJuri/WIR selector updates the HTML workflow and the scene's document/screen textures. The second operation displays the other workflow. Examples are labeled illustrative and use synthetic data.
- English, Portuguese, and Spanish copy follows the existing locale routes.
- Mobile and reduced-motion layouts use an original SVG illustration and the complete story in normal document flow. WebGL construction failure, lazy-import failure, and context loss use the same fallback.
- Lazy 3D loading, capped pixel ratio, offscreen/hidden-tab pause, idle rendering stop, and resource cleanup. Removed the old homepage 3D stage and its perpetual cursor-glow loop.
- Existing navigation, category explanation, operator network, real team portraits, Library links, subscription, contact links, and footer remain connected. The old homepage venture ladder is replaced by the two explicitly illustrative workflow exhibits; no new FutureProofing ownership claim is introduced. Portfolio subpage content is unchanged.
- Homepage splash is skipped so content is immediately available.
- Brand wording uses "venture studio". The existing homepage closing statistic now says "under management" and attributes the experience to Amanda Pinheiro, following TEAM-FACTS. This does not reconcile every claim on other routes.

## Verification

| Check | Result |
| --- | --- |
| `npm run build:vite-only` | Passed after final code edits. Existing 3.5 MB article-data chunk still generates a size warning. |
| `node --test scripts/compound-story.test.mjs` | 3 tests passed: reversible finite poses, assembly ordering, chapter boundaries and locale completeness. |
| `git diff --check` | Passed. |
| Focused TypeScript check | New components checked using temporary TypeScript 5.9 and React/Three type declarations, without changing project dependencies. Check passes with `noImplicitAny: false`; the strict check exposes a pre-existing string-index error in `useLanguage.tsx:948`. |
| Local EN/PT/ES requests | HTTP 200 on all three routes. This is availability evidence, not a full rendered-locale test. |
| Chrome visual inspection | Initial live WebGL scene rendered with loaded fonts. A chapter transition visibly opened the document stack. Text-transition overlap was then reduced in CSS. |
| Full interaction/device QA | Not completed. Computer Use repeatedly returned `noWindowsAvailable` or reported that the active browser had changed. Workflow selection, complete forward/reverse traversal, mobile layout, reduced motion, and Safari need a reliable browser pass. |
| Asset budget | Skyline WebP approximately 28 KB, SVG fallback approximately 3.4 KB. Async scene bundle approximately 505 KB / 126 KB gzip, including Three.js. |
| FPS / Core Web Vitals | Not measured. No performance-target achievement is claimed. |

## Art direction limits

The current scene is a stylized procedural 3D implementation. Product screens are schematic illustrations, not approved product screenshots. The static SVG is a matching art-direction fallback, not a pixel-identical export of the WebGL camera. Bespoke photorealistic asset production, final product-screen replacement, and real-device tuning remain production refinements.

## Working files

- `src/app/components/compound/CompoundExperience.tsx`: chapter UI, locale content, fallback, and scroll integration.
- `src/app/components/compound/CompoundScene.tsx`: scene geometry, textures, camera, lighting, and rendering lifecycle.
- `src/app/components/compound/story.mjs`: localized story and pure pose functions.
- `src/app/components/compound/compound.css`: desktop stage, transitions, and static/mobile layouts.
- `public/compound-assets/`: fallback illustration and compressed approved São Paulo backdrop.
- `scripts/compound-story.test.mjs`: animation and content checks.

Start locally with `npm run dev -- --host 127.0.0.1 --port 4315 --strictPort` when the current preview process is not running. Do not launch a duplicate instance. Nothing was committed, pushed, or deployed. The full build's IndexNow notification was not run.
