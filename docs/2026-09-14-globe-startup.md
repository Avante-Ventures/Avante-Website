# Globe startup correction

## Cause and change

The enhanced desktop journey rendered a full-opacity São Paulo bridge photograph while the lazy-loaded Three.js scene and map data initialized. Once ready, the photograph still remained at 8% opacity behind the transparent globe. This produced the bridge-to-globe flash on reload.

The opening picture now selects `globe-opening.webp` using the exact same media query as the enhanced journey. Selection happens through native `<picture>` rules, before effects or WebGL initialization. The 104 KiB transparent poster is captured from the existing scene at progress 0, with its original camera, geometry and lighting. Vertical framing matches the live scene across desktop aspect ratios. The atmosphere background sits behind both representations, and the poster disappears only after the scene reports its first completed textured render.

The bridge poster remains specific to the city film and existing static mobile/reduced-motion presentation. If map loading or WebGL fails on an eligible desktop, the static opening globe remains available.

## Verification

- Native Safari with the map request held: chapter 0, globe poster loaded and visible, canvas opacity 0, film opacity 0, no horizontal overflow.
- Releasing the request: textured scene ready, poster opacity 0, canvas opacity 1, chapter 0, film opacity 0.
- Rejecting the request: static globe remains loaded and visible, no canvas or film, usable page, no horizontal overflow.
- Normal homepage reload visually opens on the globe.
- A 390px Safari iframe retains the existing mobile city crop, skips the enhanced scene and has no horizontal overflow. This is a viewport check, not a physical phone test.
- Fourteen existing journey/playback tests pass. Scoped TypeScript passes using the installed Three addon declarations. The older temporary TypeScript config lacked the addon path alias; the corrected scratch config resolves the actual installed declarations without changing repository dependencies.
- `npm run build:vite-only` validates the production bundle. No prerender, IndexNow, commit, push or deployment is involved.

Capture source, disposable browser fixtures and QA evidence are in `/tmp/avante-globe-startup-2026-09-14/`. Temporary pages were removed from public assets. Regenerate the opening poster if the initial globe camera, geography or lighting changes.
