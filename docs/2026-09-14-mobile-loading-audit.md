# Mobile and loading audit

The approved real São Paulo night footage, Avante palette, globe and sculptural arrival remain intact. Changes are local only.

## Changes

- Defer the desktop film until the visitor starts the guided journey or scrolls beyond 6% of the tour. The poster remains visible while the film loads or if media loading fails.
- Keep Three.js and automatic film loading off for narrow screens, touch-only devices, short windows and reduced-motion preferences. Static visitors can explicitly open the city film.
- Deliver responsive landscape images and portrait crops. Use source elements with an inline fallback to avoid Safari requesting desktop images while React assembles the picture.
- Give normal mobile playback its own 720p/24 fps encode. Desktop scroll seeking retains the approved 1080p version with frequent keyframes.
- Let mobile hero height follow the translated content. Fix overlapping copy at 320 px and improve text contrast against city lights.
- Increase key touch targets to at least 44 px. Make the navigation overlay scrollable in landscape.
- Lock background scrolling while the native film dialog is open, restore focus when it closes, and provide localized error/retry messages.
- Hide Back to top during the hero journey so it does not cover the skip action. Respect reduced motion when returning to the top.

## Measured media sizes

File sizes are actual bytes, not page-load timings.

| Asset | Before | After |
| --- | ---: | ---: |
| Mobile hero still | 802,280 bytes | 120,436 or 195,638 bytes, selected by viewport/DPR |
| Mobile film | 20,479,108 bytes | 5,708,718 bytes |
| Automatic video on initial desktop/mobile entry | Desktop mounted a video with preload=auto | No video mounted before journey intent; none on static entry |

The portrait image is 76–85% smaller; the explicit mobile film is 72% smaller. The 20-second duration and real source remain unchanged.

## Verification

- Vite-only production build passes. The regular build is intentionally not used because it invokes IndexNow.
- Four journey tests pass: chapter stops, reversible camera progress, destination ordering and geography.
- Targeted TypeScript check passes with the project's existing implicit-indexing exception (`--noImplicitAny false`). This is not a claim that the whole repository passes strict TypeScript.
- MP4 metadata verified: H.264, 1280 × 720, 24 fps, 20 seconds, no audio. Local byte-range requests return HTTP 206.
- Native Safari and Chrome, local iframe viewports: 320 × 680 PT, 390 × 680 ES, 768 × 680 EN, 844 × 390 PT and 1080 × 680 EN. Document width matches each tested viewport; no horizontal page overflow was observed.
- Mobile entry requests only its selected city picture: no Three.js or video mounted. Safari's duplicate fallback-image requests were observed and eliminated.
- Mobile film loaded and reached its 20-second endpoint in Chrome and Safari. Escape closes the dialog and restores focus to the trigger in Chrome.
- Mobile menu opens and the People action reaches the actual team section. The desktop city film loads after chapter navigation; its decoded seek position matches the city chapter. The Avante gallery and venture destinations remain present.
- Safari pauses requestAnimationFrame when its window is occluded. The guided timer's full 30-second run was verified in the preceding implementation review; this audit rechecks the city seek and gallery navigation after deferring media. Do not interpret an occluded-window pause as a slow-network benchmark.

## Next improvements

1. Replace illustrative product exhibits with approved real product captures and concise evidence of the work. Keep the immersive introduction as the entrance to tangible products.
2. Give visitors a clearer contact destination and a short path from each venture to a relevant conversation.
3. Split the Library's metadata from full article bodies. Its existing all-articles chunk is 3.50 MB minified / 1.10 MB gzip; it is loaded on Library/article routes, not initial home entry. The build warning remains.
4. Test on a physical iPhone and Android over cellular service, then measure deployed LCP/INP/CLS. No physical-device, throttled-network or Lighthouse score is claimed here.

Temporary responsive QA pages and telemetry are removed before handoff. No external form, email, commit, push or deployment is performed.
