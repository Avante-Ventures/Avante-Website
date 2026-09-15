# World experience assets

- `land.json`: derived from Natural Earth 1:110m Admin 0 Countries. Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson, retrieved September 14, 2026. Only country names and polygon coordinates are retained. Coordinates rounded to two decimal places. Natural Earth data is public domain: https://www.naturalearthdata.com/about/terms-of-use/.
- `saopaulo-real.webp`: WebP conversion of `../brand-assets/avante-background-saopaulo-1920x1080.png`, the existing Avante São Paulo photographic background. Original pixels and composition are preserved in the source asset. Display exposure, color lighting and parallax are applied at runtime in CSS and the photographic shader.
- `saopaulo-editorial.webp`: unused legacy conversion of `public/redesign-assets/photo-skyline.jpg`. That file is an illustration, despite its filename. It is no longer used by the homepage.
- `saopaulo-real.webp` is retained as the reference for the editorial perspective image. The current hero uses the continuous bridge flight documented below. Night and golden-hour footage are retained as unused previous versions.
- `saopaulo-night-journey.mp4`: a 20-second excerpt (starting at source second 2) from Sérgio Souza's **Aerial Night View of Sao Paulo Cityscape**, Pexels video 31673220. Source page: https://www.pexels.com/video/aerial-night-view-of-sao-paulo-cityscape-31673220/. Original download: https://videos.pexels.com/video-files/31673220/13493626_3840_2160_30fps.mp4. Retrieved September 14, 2026. Source resolution 3840 × 2160; web delivery 1920 × 1080, H.264, no audio, half-second keyframe intervals. Exposure and violet shadow grading were adjusted; buildings and geography were not generated or altered.
- `saopaulo-night.webp`: full-resolution 3840 × 2160 still from the same source and color treatment, matching the opening frame of the previous city film. Retained as an unused previous version.
- The video and derived still use the Pexels License: https://www.pexels.com/license/. The license permits website use and modification, and does not require attribution. Credit is retained here. The photographer and depicted buildings do not endorse Avante; no depicted building is presented as Avante property.
- `avante-A.svg`: unchanged official Avante mark copied from `../brand-assets/A/avante-A.svg`. The silhouette is extruded into a beveled 3D sculpture with the seven canonical brand colors. The gallery, plinth and lighting are original procedural geometry in `AvanteGallery.ts`; they represent an imaginary brand environment, not a physical Avante office. The office-door photograph is not used.
- Globe shading, geographic connection line and camera motion are original code in `src/app/components/world/WorldScene.tsx`. The connection depicts team experience, not transport routes or a claim of owned offices. The real city footage transitions into the imaginary brand gallery through a cinematic dissolve, not a geographically continuous flight.
- Product exhibits are illustrative HTML/CSS compositions. They are labeled as product concepts and do not show customer records, performance figures, live functionality or actual product screenshots.

## Previous night responsive variants (September 14, 2026; now unused)

- `saopaulo-night-{1280,1920,2560}.webp`: landscape resizes of the same graded original still; WebP quality 86. The 3840-pixel master remains available for large displays.
- `saopaulo-night-portrait-{720,1080}.webp`: portrait crops from the same still (source crop x=1680, y=0, width=1215, height=2160), resized with Sharp and encoded at WebP quality 86. No buildings or geography were added.
- `saopaulo-night-mobile.mp4`: the same 20-second excerpt and grade, delivered at 1280 × 720, 24 fps, H.264 CRF 26, two-second GOP, no audio, fast-start MP4. This variant was used for explicit normal playback; desktop scroll seeking used the original 1080p, half-second-GOP file.

## Perspective skyline (September 14, 2026)

- `saopaulo-perspective-{960,1280,1672}.webp`: AI-assisted dusk lighting and color treatment of the existing real São Paulo photograph `saopaulo-real.webp`, created with the built-in imagegen tool. The edit targets the original skyline composition and recognizable architecture, with Avante amber, coral, mauve, violet and indigo lighting. It is art-directed imagery derived from a real photograph, not documentary evidence of an actual sunset or exact unchanged building details. No pictured building is claimed as Avante property.
- Native generated resolution: 1672 × 941. Landscape variants are downsampled only, with WebP quality 88. No artificial upscale is used.
- `saopaulo-perspective-portrait-{400,588}.webp`: mobile crops of that same edit, source region x=820, y=0, width=588, height=941, delivered at 400 × 640 and 588 × 941. The skyline is lazy-loaded only in the perspective section. That edit left the hero unchanged; the later golden-hour hero update is documented below.
- Original generation prompt, tool mode and verification notes: `../../docs/2026-09-14-perspective-and-venture-builder.md`.
- Team portraits remain the original `public/redesign-assets/team-*.webp` files. Framing, color reveal and shallow perspective motion are CSS effects. People and faces were not generatively edited.

## Golden-hour bridge source edit (September 14, 2026)

- Initial golden-hour film: `saopaulo-golden-journey.mp4`. Real footage of São Paulo's Ponte Estaiada by **Roberto Queiroz**, Pexels video 20786103. Source page: https://www.pexels.com/video/ponte-estaiada-20786103/. Original file: https://videos.pexels.com/video-files/20786103/20786103-uhd_3840_2160_24fps.mp4. Retrieved September 14, 2026. Licensed under https://www.pexels.com/license/ for website use and modification. No endorsement or ownership of the depicted architecture is implied.
- Original: 3840 × 2160, 24000/1001 fps, 15.06 seconds. The original has a hard angle change at approximately 7.59 seconds. The edit uses source 0–7.3 seconds and 7.7–14.85 seconds, each played at two-thirds speed, joined with a 1.1-second dissolve. Web duration: 20.6 seconds. The complete guided world-to-gallery experience remains 30 seconds.
- Art direction: lifted exposure, amber and coral highlights, violet shadows and a luminance-masked indigo/mauve sky wash. Color and edit are produced in FFmpeg; city, bridge, vehicles and camera motion are real footage. No AI-generated geometry or clouds are added. The bridge sequence has two camera angles, followed by the existing dissolve into the conceptual 3D Avante gallery.
- Desktop: H.264, 1920 × 1080, 30 fps, yuv420p, 15-frame closed GOP, CRF 20, fast-start MP4, no audio. 14,582,118 bytes. The short GOP supports reversible scroll seeking.
- Mobile: `saopaulo-golden-mobile.mp4`, H.264, 1280 × 720, 24 fps, 48-frame GOP, CRF 23, fast-start MP4, no audio. 2,984,461 bytes. Loaded only when the visitor opens the film player.
- Posters: `saopaulo-golden.webp` (3840 × 2160) and `saopaulo-golden-{1280,1920,2560}.webp` match the opening shot and grade. The poster retains original 4K detail. `saopaulo-golden-portrait-{720,1080}.webp` uses the source region x=1400, y=0, width=1215, height=2160, keeping the pylon centered.
- Reproducible processing: `scripts/prepare-golden-journey.mjs`. Implementation and QA: `docs/2026-09-14-golden-hour-journey.md`. Higgsfield checks returned a connection error and then an unauthenticated status. No generation job was submitted or charged.

## Previous fluid-motion delivery (September 14, 2026; now unused)

- `saopaulo-fluid-journey.mp4` and `saopaulo-fluid-mobile.mp4` supersede the initial golden-hour films in the hero and mobile player. They use the same licensed source, two takes, timing, dissolve and color treatment described above.
- FFmpeg `minterpolate` estimates intermediate frames inside each slowed take before the dissolve, replacing the previous repeated-frame cadence. No optical-flow interpolation crosses the angle change. This is processed real footage; intermediate motion frames are reconstructed rather than independently photographed.
- Desktop: 1920 × 1080, H.264, 30fps, 20.6 seconds, 15,114,756 bytes. Mobile: 1280 × 720, H.264, 24fps, 20.583 seconds, 3,036,499 bytes. Both have fast-start metadata and no audio. Existing GOP and quality settings remain in place. The approved `saopaulo-golden-*` posters remain active.
- Reproduce: `node scripts/prepare-golden-journey.mjs /path/to/source.mp4 /path/to/scratch --smooth-motion`. Both films are encoded in scratch before moving to the local public directory. Controller changes and verification: `docs/2026-09-14-journey-fluency.md`.

## Current continuous bridge flight (September 14, 2026)

- `saopaulo-flight-journey.mp4` and `saopaulo-flight-mobile.mp4` replace the previous two-angle films. A single continuous drone take passes the bridge pylons and continues toward the São Paulo skyline. Source: **Sérgio Souza**, **Aerial View of Iconic Bridge in Sao Paulo**, Pexels 31074326, https://www.pexels.com/video/aerial-view-of-iconic-bridge-in-sao-paulo-31074326/. Original download: https://videos.pexels.com/video-files/31074326/13279033_1920_1080_60fps.mp4. Retrieved September 14, 2026.
- Source: 1920 × 1080, 60000/1001 fps, 945 frames, 15.76575 seconds. The full take retains its original camera motion and frame cadence. No cuts, zoom animation, optical-flow interpolation or generated city geometry. A restrained FFmpeg color grade adds warm highlights and violet shadows. The existing final dissolve enters the conceptual Avante gallery, not a real Avante-owned building.
- License: https://www.pexels.com/license/ permits website use and modification. Attribution retained here; no endorsement by the photographer or depicted buildings is implied.
- Desktop: 1920 × 1080, H.264 CRF 22, approximately 59.94 fps, 30-frame GOP, 15.76575 seconds, 25,790,953 bytes. Mobile: 1280 × 720, H.264 CRF 24, approximately 29.97 fps, 60-frame GOP, 15.782433 seconds, 7,285,970 bytes. Both use fast-start MP4 and contain no audio. The compact video is selected once per visit and requested near the beginning of the enhanced scroll journey, or when the visitor opens the reduced-motion film player.
- `saopaulo-flight-{1280,1920}.webp` match the opening frame and grade. `saopaulo-flight-portrait-{400,600}.webp` use a source crop at x=730, y=0, width=608, height=1080. All posters are downsampled from the available source; no 4K or artificial upscale claim.
- Reproduce: `node scripts/prepare-continuous-flight.mjs /path/to/source.mp4 /path/to/scratch`. Processing stages all outputs before replacing local public assets. Playback and verification: `docs/2026-09-14-continuous-flight.md`.

## Interior-page visual system (September 14, 2026)

- `saopaulo-interior-{1280,1920}.webp` and `saopaulo-interior-portrait-600.webp` are frame extracts at second 8 of the current graded continuous bridge flight. Same Sérgio Souza / Pexels 31074326 source and license documented above. Portrait crop: x=750, y=0, width=608, height=1080; output 600 pixels wide. No generated detail or artificial upscale.
- Studio reuses the approved `saopaulo-perspective-*` skyline, whose AI-assisted lighting treatment is documented above. Investors uses the documentary video frame. Neither depicts an Avante-owned building.
- The interior Avante sculpture reuses the official silhouette and procedural gallery. The six-floor process model is original Three.js geometry illustrating the six operating stages. It is a conceptual exhibit, not a building project, office rendering or quantitative forecast.
- Library and article fallback artwork is original CSS geometry representing publications, research and layers of technology. The Brazil topic uses the documented city frame. These are topic illustrations, not evidence for an article's claims. Article OG title cards remain exclusively in social metadata and are not cropped into on-page artwork.

## Team sunset portraits (September 14, 2026)

- `team/{amanda,felipe,jess,andrea,cristian,luiz}-sunset-{400,800}.webp` are ImageGen-assisted background replacements based on the existing supplied team photos in `public/redesign-assets/`.
- Andrea, Jess and Cristian share a San Francisco sunset backdrop; Amanda, Felipe and Luiz share a São Paulo sunset backdrop based on the approved perspective skyline. These are editorial composites, not documentary location photographs or evidence of a person's residence or workplace.
- Source portraits are preserved. Identity preservation was instructed and visually reviewed; the output is generatively edited and is not claimed to preserve every source pixel. ImageGen produced the edits; Pillow only resized and encoded the final WebP files.
- Prompt set, asset paths and QA: `docs/2026-09-14-team-sunset-portraits.md`.

### Higher-quality team delivery (September 14, 2026)

- `team/{amanda,felipe,jess,andrea,cristian,luiz}-sunset-hq-{480,960,1254}.webp` supersede the previous 400/800-pixel delivery. These are new encodes of the same approved native 1254 × 1254 generated PNG masters, with the same editorial-composite provenance and city assignments documented above.
- Pillow performs downsampling and WebP encoding only, at quality 96 and method 6. The 1254-pixel exports preserve native resolution; there is no upscaling, new generation or additional face/background edit.
- Responsive delivery and validation: `docs/2026-09-14-team-photo-quality.md`.

## Opening globe loading frame (September 14, 2026)

- `globe-opening.webp`: transparent 2160 × 1350 capture of the existing `WorldScene` at progress 0, with its original camera, geography, materials and lighting. Rendered in native Safari at a 1440 × 900 CSS viewport and DPR 1.5, then encoded as WebP quality 90 (104 KiB). No AI generation or additional geographic source. The underlying Natural Earth attribution for `land.json` applies.
- Used only as the enhanced desktop opening poster while WebGL and map data load. The native `<picture>` media query matches the 3D eligibility query. Mobile, touch-only and reduced-motion layouts retain their existing city photograph.
- The poster and live scene share vertical camera framing. Regenerate this asset if the opening camera, globe geometry, materials or lighting changes. The city film keeps its own matching bridge poster.

## WIR logo update (September 14, 2026)

- `wir-logo.svg` is the official white WIR logo with the outlined “AI for insurance” signature, downloaded from https://wirinnovation.ai/assets/wir-logo-branco.svg. It replaces the older “Innovation” lockup.
- The SVG retains its official paths, gradients, viewBox and outlined lettering. Only trailing whitespace was removed on import. The complete lockup remains on the journey destination card.
- `wir-mark.svg` and `wir-signature.svg` separate the existing paths into display layers with cropped viewBoxes. The mark keeps all seven original paths and both gradients; the signature keeps the original outlined lettering. No paths, typography or face colors were redrawn.
- The exhibit uses a shallow satin extrusion and restrained pointer tilt for the mark in `VentureLogoScene.tsx`. The fine italic signature is a separate, stationary SVG below it, preserving its sharp edges on desktop and mobile. The static fallback uses the same two layers and alignment.

## Mobile journey opening (September 15, 2026)

- `globe-opening-mobile.webp` is a transparent capture of the existing `WorldScene` at progress 0, using its compact camera composition. It was rendered in native Safari at a 780 × 1440 CSS viewport, with the scene occupying 780 × 633.6 CSS pixels and DPR capped at 1.25. Source: 975 × 792 PNG; delivery: WebP quality 90. No AI generation or new geography. The Natural Earth attribution for `land.json` applies.
- The mobile poster and live globe share vertical framing and center alignment. Regenerate this poster if the compact opening camera or globe geometry changes. It preserves the opening while WebGL loads and supplies the static reduced-motion/failure fallback.
- Phones and touch tablets now retain the complete globe → São Paulo film → Avante gallery journey. The existing continuous `saopaulo-flight-mobile.mp4` supplies the mobile film; its source, grading and license are unchanged.

## Scroll transition continuity (September 15, 2026)

- The compact scene now uses a fixed full-stage canvas and a camera view offset. Its opening projection is mathematically identical to the existing mobile globe poster; no poster regeneration or asset changes were needed. The globe can approach Brazil beyond its original upper rectangle. Gallery framing settles while the city film is opaque.
- The compact film fallback now uses `saopaulo-flight-1280.webp` with the same aspect ratio and object position as the video, avoiding a crop change when decoding starts. Portrait poster files remain available for other uses.
- Fast scroll transitions have minimum travel durations and work in reverse. The city-to-gallery dissolve finishes at the film endpoint. Verification: `docs/2026-09-15-scroll-transition-continuity.md`.
