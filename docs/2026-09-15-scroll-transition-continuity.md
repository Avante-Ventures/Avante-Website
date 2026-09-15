# Scroll transition continuity — September 15, 2026

Cristian reported abrupt transitions between Brazil, São Paulo and Avante specifically while scrolling on mobile.

## Changes

- Keep the compact WebGL drawing buffer at full-stage dimensions. A view offset preserves the approved globe opening exactly, lets the approaching globe extend beyond its old rectangle, and reframes the gallery while the city film is fully opaque. Changing chapters no longer resizes the canvas.
- Pace scroll progress through both dissolves, including fast forward and reverse scrolling. At an instantaneous full-range target change, the Brazil/city dissolve takes at least approximately 0.59 seconds and the city/gallery dissolve 0.875 seconds. Normal page scrolling remains native; an offscreen hero synchronizes immediately.
- Fade the whole globe through the film overlay rather than separately darkening its surface. Retain the current continuous native drone film and keep it active through the gallery dissolve endpoint.
- Give chapter text a quiet gap during handoffs. On compact screens, the Brazil headline sits lower; destination copy and venture links arrive after the sculpture. Hide its floor reflection in compact layouts so it does not overlap the text.
- Match the compact loading image to the video's landscape source ratio and object position. Explicitly select the compact or desktop video once per visit, keeping the decoder stable across resizing. Request the movie early in the scroll journey.

## Verification

- `node --test scripts/film-playback.test.mjs scripts/world-journey.test.mjs`: 18 passed. Covers decoding, buffering, pause/replay, fast scroll, reversal, 30/60/120 Hz timing, invisible chapter copy changes, and exact opening camera projection at portrait and landscape dimensions.
- Scoped TypeScript check for the world components: passed.
- `npm run build:vite-only`: passed. Existing large article-bundle warning remains. Full prerender is left to Vercel CI because local headless Chromium is unreliable on this machine.
- Native Safari review using the real local app in a temporary viewport harness: 390 × 667 and 320 × 568 portrait, 844 × 390 landscape, and 960 × 667 desktop. Observed continuous canvas dimensions across arrival, no horizontal overflow, readable destination layouts, and compact MP4 selection on a fresh mobile load.
- Browser visibility was checked during animation review: hidden-document captures were excluded from motion judgments. This was desktop Safari at mobile viewport sizes, not a physical iPhone/Android performance measurement.
- Temporary review page removed from the project after review. Existing dev server and unrelated work preserved.
