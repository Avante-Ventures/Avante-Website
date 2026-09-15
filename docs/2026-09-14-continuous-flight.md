# Continuous São Paulo flight

September 14, 2026. Local revision after feedback that the previous film felt like enlarging one image into another.

## Film

The city chapter now uses one continuous real drone take by Sérgio Souza (Pexels 31074326). Foreground bridge pylons leave the frame as the camera passes them, revealing buildings behind them. This provides actual camera displacement and depth throughout the shot. The entire 15.77-second source is preserved, with restrained warm highlights and violet shadows. The world introduction and conceptual Avante gallery remain a 30-second guided experience.

Desktop preserves the source's 60000/1001 frame cadence at 1080p. Mobile uses 720p at 30000/1001 fps and loads on demand. Posters match the first decoded view and use only available source resolution. Current asset sizes are 25.79 MB desktop and 7.29 MB mobile. Dense moving city detail and native cadence increase the files relative to the old film.

Source, license and exact media properties: `public/world-assets/ATTRIBUTION.md`. Reproducible processing: `scripts/prepare-continuous-flight.mjs`. The prior golden-hour and interpolated films remain as historical local assets but are no longer referenced by the homepage.

## Playback

Ordinary scrolling into the city starts native playback from the opening frame at 1× speed. Further scroll movement does not assign `currentTime`. Leaving the city resets alignment so a later entry can start the complete take again. The film plays once, avoiding a discontinuous loop from skyline back to bridge.

Watch the journey continues to use actual decoded media time as the city chapter's clock. Its rate maps the complete film to the 17.7-second city interval. Explicit pause and tab suspension preserve the current frame. Returning to a visible tab resumes ambient playback only while it remains authorized; Pause and Escape stay paused. Resuming the guided journey derives its position from the decoded frame, avoiding a jump to the current scroll position. Pending play failures cannot override a newer pause.

## Verification

- Fourteen controller/journey regression tests pass, including native playback without repeated seeking, ambient first-frame entry, pause/resume continuity, re-entry reset, obsolete play rejection, buffering and final gallery handoff.
- Scoped TypeScript and `npm run build:vite-only` pass. Vite retains its existing large articles-chunk warning. Both new delivery files are present in dist; the temporary QA wrapper was removed before building. `git diff --check` passes.
- FFprobe confirms both final encodes and the full source cadence. A scene-change scan at threshold 0.18 found no cuts; chronological frame samples confirm actual camera travel.
- Safari's native MP4 player was visually checked at the opening and eight seconds: the pylons have passed and the viewpoint has advanced into the city.
- Integrated Safari QA: ambient playback decoded 222 frames before pausing at 3.822 seconds, with zero seeking events and zero runtime/media errors. The paused time remained unchanged; guided resume continued from that frame with zero seeking events.
- The integrated journey reached the final gallery at progress 1.0, with 839 decoded frame callbacks, zero seeking events and zero runtime/media errors. The 390-pixel viewport has no horizontal overflow, and its dedicated mobile film plays with native controls. This is a viewport check, not a physical phone test.
- Safari automation reports the app as hidden and suspends animation-frame callbacks. A disposable local wrapper simulated visibility and used timer callbacks in that hidden context for integrated control checks. This confirms decoder/control behavior, not foreground rendering performance. The standalone native film check did not use that wrapper.

Temporary media sources, frame boards and browser evidence: `/tmp/avante-continuous-flight-2026-09-14/`. No generation job, deployment, commit or push was performed.
