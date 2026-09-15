# Journey fluency revision

September 14, 2026. Local implementation following feedback that the bridge journey did not feel fluid.

## Confirmed causes and changes

The guided tour previously scrolled the document on every animation frame, read that scroll back into progress, and repeatedly assigned the paused video's currentTime. The city therefore advanced through serialized seeks even during Watch the journey. CSS used immediate scroll progress while Three applied a separate frame-dependent delay.

The guided city chapter now plays through the native media decoder. Its actual media time drives the shared visual progress, so buffering cannot advance the transition independently. Native playback aligns once when starting or resuming; manual exploration retains serialized seeking. Introduction and arrival use active elapsed time. The film plays at its actual duration divided by 17.7 seconds, preserving a 30-second complete journey. Pause, navigation keys, wheel, visibility changes and reduced-motion changes stop playback. A blocked play request or a ten-second stall leaves the controls available.

Manual scroll uses time-based easing before publishing progress. CSS, chapter copy and Three consume that same value. Chapter copy fades out before a content/layout change and fades back in afterward. The side shade also blends continuously instead of changing with the chapter. The renderer clears once during the opaque city interval and then avoids empty GPU renders until the gallery arrives.

The source was also slowed from roughly 24fps to two-thirds speed using duplicated frames. The new fluid delivery interpolates each clean camera take to 30fps before the existing dissolve and Avante grade. Optical flow is confined to each take; it does not interpolate across the angle change. This is motion interpolation of the same licensed real footage, not a new generated city. Approved full-resolution posters and location remain unchanged.

## Files

- `filmPlayback.mjs`: native playback controller, media-driven clock, frame-rate-independent manual easing.
- `JourneyFilm.tsx`, `WorldTour.tsx`, `WorldScene.tsx`, `journey.mjs`, `world.css`: integration and synchronized transitions.
- `scripts/film-playback.test.mjs`: regression checks for the playback behavior.
- `scripts/prepare-golden-journey.mjs`: optional `--smooth-motion` processing into staged fluid desktop/mobile files.
- `public/world-assets/saopaulo-fluid-{journey,mobile}.mp4`: new delivery variants; provenance remains Roberto Queiroz / Pexels 20786103.

## Verification

- Ten journey/controller tests pass: continuous native play without per-frame seeks, manual reversal and resume alignment, buffering, ended handoff, stale play rejection, time-based easing and invisible copy changes.
- Scoped TypeScript passes. A simulated native media clock reaches the end in 30 active seconds.
- Safari's automation window reports `document.hidden=true` and suspends native animation-frame callbacks. A disposable same-origin QA wrapper used timer callbacks only in that hidden context to exercise controls. This is not a foreground FPS or end-to-end visual fluency benchmark.
- In that Safari check, native video playback from the city chapter decoded 197 frames with one play call, zero seeking events and zero media errors. Context-loss simulation during guided playback returned to chapter zero with the static headline and Watch São Paulo control, instead of leaving a blank heading or waiting for an unmounted video.
- Motion-interpolation sample inspected at full resolution for visible bridge/cable deformation.
- Both final encodes verified with ffprobe: 1080p30 / 20.6 seconds / 15,114,756 bytes and 720p24 / 20.583 seconds / 3,036,499 bytes. Frame samples of both camera takes were inspected at full resolution.
- Safari's 390-pixel viewport has no horizontal overflow, retains the static headline/poster, and mounts no video before interaction. The new mobile film opens in the existing player and plays natively without an error. This is a viewport check, not a physical phone test.
- `npm run build:vite-only`, scoped TypeScript, all ten tests and `git diff --check` pass. Vite retains its existing large articles chunk warning. Both fluid assets are present in dist; the QA wrapper is absent from public and dist.

QA assets and temporary logs: `/tmp/avante-fluid-journey-2026-09-14/`. The temporary QA wrapper was removed from public before building; a copy remains in that scratch directory.

Implementation references: [HTMLMediaElement.play](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play), [currentTime and seeking](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime), and [FFmpeg minterpolate](https://ffmpeg.org/ffmpeg-filters.html#minterpolate).
