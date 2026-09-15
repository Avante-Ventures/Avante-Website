# Avante cinematic arrival

Status: local implementation, pending creative review. No publication, commit or push.

## Direction

The journey has a destination: a sculptural Avante brand gallery that opens into the venture exhibits. The city remains real. After reviewing the first daylight edit, Cristian requested a more glamorous city and rejected the office-door ending. The final direction uses São Paulo at night and an imaginary gallery built around the official Avante A.

## Experience

- Four chapters: The world → Brazil → São Paulo → Avante.
- A user-triggered 30-second guided journey moves through the same native scroll timeline. Pause, resume, replay and direct chapter navigation remain available. Wheel, touch and scrolling keys stop guided playback; backgrounding the tab also stops it.
- The city is real drone footage, with a 4K source still and an optimized 1080p video. A serial seek controller follows scroll in either direction without building a queue of outdated seeks.
- The city dissolves into the 3D gallery. The official SVG silhouette becomes a beveled metal sculpture with the Avante spectrum, an illuminated plinth and a violet arc. This is a conceptual brand environment, not an owned office or an exact geographical route.
- AlphaJuri and WIR appear as keyboard-accessible links after the gallery settles. They lead directly to the corresponding homepage product exhibits. The links use the router's existing immediate hash handling to avoid a Safari native-anchor positioning issue observed during QA.
- Mobile and reduced-motion visitors get a photographic opening and ordinary page content. An explicit video button opens a native video player in a modal dialog; the city video and WebGL scene are not mounted automatically in this mode.

## Media

Source: [Sérgio Souza / Pexels](https://www.pexels.com/video/aerial-night-view-of-sao-paulo-cityscape-31673220/), 3840 × 2160, approximately 30 seconds. The web excerpt uses source seconds 2–22, delivering 20.02 seconds of H.264 video at 1920 × 1080. It is silent and encoded with a half-second GOP for seeking. The 30-second guided experience includes the globe and gallery, not 30 seconds of city footage.

Higgsfield CLI connection checks failed with “request failed (no response received).” No generation job was submitted and no AI-generated city imagery is used. Real licensed footage fulfilled the city requirement. Attribution and provenance are retained in `public/world-assets/ATTRIBUTION.md`.

## Validation

- `node --test scripts/world-journey.test.mjs`: all four tests passed (navigation stops, reversible camera progression, geography and destination sequencing).
- Targeted TypeScript check using the existing temporary check environment and `--noImplicitAny false`; the project has a pre-existing strict dictionary-indexing issue in `useLanguage.tsx`.
- `npm run build:vite-only`: passed. The existing large Library article chunk warning remains. The regular build script was not run because it pings IndexNow.
- Visual and interaction review in Safari at 1116 × 720 content viewport. Verified globe, real city frame, branded gallery and direct navigation to the AlphaJuri exhibit. Guided playback reached the gallery and stopped at 30/30; replay restarted from the globe and manual pause stopped at 05/30. A 390 × 740 iframe check in Spanish verified the static opening, modal video playback and close action. The temporary QA page was removed from public and dist.

## Limitations

The night source contains genuine sensor noise, particularly in the sky. A 4K source does not eliminate that noise. The web film is about 20 MB, loaded only for the enhanced desktop journey or after the mobile player is opened. Performance has not been benchmarked on physical low-end phones or a throttled mobile network. The city-to-gallery dissolve is cinematic, not a reconstruction of a continuous flight into a real Avante building.
