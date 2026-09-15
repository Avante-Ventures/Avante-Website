# Golden-hour bridge journey

September 14, 2026. Local implementation. No commit, push or deployment.

Cristian requested the same luminous Avante feeling as the new perspective skyline in the hero's 3D journey, suggesting Faria Lima or São Paulo's famous bridge. This version selects the Ponte Estaiada and replaces the previous dark aerial footage, including desktop and mobile posters and the mobile player.

## Creative treatment

Real 4K sunset footage of the Ponte Estaiada by Roberto Queiroz, [Pexels 20786103](https://www.pexels.com/video/ponte-estaiada-20786103/), under the [Pexels License](https://www.pexels.com/license/). The original two angles become a wide-to-close sequence joined by a 1.1-second dissolve. Both shots play at two-thirds speed. Warm highlights, violet shadows and a luminance-masked atmospheric color wash connect the video to Avante's amber, coral, mauve and indigo palette.

The bridge and city geometry, vehicle movement and camera movement are real. This is a color-graded edit rather than an AI-generated flight. Higgsfield account status failed with a connection error, and the model list reported Not authenticated. No generation job was submitted. Real footage fulfills the requested location and preserves the city's identity.

The chapter-two overlay now shades mainly the lower text area, preserving light in the architecture and sky. Globe, chapter timing, pause/replay, reverse scroll seeking and the branded 3D gallery remain in place. The journey still ends at Avante with links to AlphaJuri and WIR. The recently approved Our perspective skyline and team section are unchanged.

## Delivery

- Desktop film: `public/world-assets/saopaulo-golden-journey.mp4`, 20.6 seconds, 1080p30, H.264, no audio, fast start, half-second GOP. 14,582,118 bytes.
- Mobile film: `public/world-assets/saopaulo-golden-mobile.mp4`, 20.58 seconds, 720p24, H.264, no audio, fast start. 2,984,461 bytes. It loads after opening the player.
- Responsive 4K, 2560, 1920 and 1280-pixel posters plus 720/1080-pixel portrait crops. The portrait retains the bridge's pylon. The 720-pixel crop is 73,518 bytes.
- Reproduce with `node scripts/prepare-golden-journey.mjs /path/to/bridge-source.mp4 /path/to/scratch`. Source URL and all processing details are recorded in `public/world-assets/ATTRIBUTION.md`.

## Verification

- Video metadata verified using ffprobe: expected dimensions, frame rates, H.264/yuv420p, duration and no audio stream.
- Scoped TypeScript passes. All four existing journey tests pass.
- Independent art review selected the masked color treatment for continuity with the Avante palette.
- Safari desktop visually renders the new bridge footage with readable chapter copy and a substantially brighter city.
- Safari desktop completed the guided journey at 30/30, stopped on Replay Journey and displayed the Avante gallery with both venture links. The São Paulo chapter was also checked directly.
- Safari at a 390-pixel viewport rendered the portrait poster without horizontal overflow or requesting a video before interaction. Opening Watch São Paulo loaded only the mobile film; native playback reached the end at 20 seconds without a media error. Closing the player returned to the homepage. This is browser viewport verification, not a physical iPhone test.
- `npm run build:vite-only` passes. Vite still reports the existing large articles chunk warning. `git diff --check` passes. The temporary mobile QA wrapper was removed before the build and is absent from both public and dist.
- Independent accessibility/loading and adversarial source reviews found no new blocking issue.

The previous night assets are preserved as unused local source history. QA frames, screenshots and encoding logs live in `/tmp/avante-golden-journey-2026-09-14/`.
