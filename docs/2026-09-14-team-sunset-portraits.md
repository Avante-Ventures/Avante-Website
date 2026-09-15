# Team sunset portraits — September 14, 2026

Delivery update: the original 400/800-pixel exports described below were superseded by higher-quality 480/960/1254-pixel variants. See [Team portrait quality](2026-09-14-team-photo-quality.md) for the current implementation and validation.

The home and Studio now use a coordinated sunset portrait series through the shared `TeamPortrait` component.

| People | Backdrop |
| --- | --- |
| Andrea Barrica, Jess Mah, Cristian Mendivelso | San Francisco: Golden Gate Bridge, bay and skyline |
| Amanda Pinheiro, Felipe Moraes, Luiz Mitidiero | São Paulo: Paulista skyline at sunset |

The source portraits remain unchanged in `public/redesign-assets/team-*.webp`. The new backgrounds are AI-assisted editorial composites, not evidence of a photo shoot, residence or office at the depicted location. Biography/location records in `OPERATORS` were not changed. The small caption on each image describes its backdrop.

## Final files

`public/world-assets/team/{amanda,felipe,jess,andrea,cristian,luiz}-sunset-{400,800}.webp`

There are twelve files: six portraits at two resolutions. The 400 px files are 15–21 KB, and the 800 px files are 42–61 KB. HTML `srcSet` and `sizes` select the appropriate resolution; the Studio thumbnail strip uses the smaller images. Original square framing is retained in the files, with a CSS crop positioned to keep the landmark visible in portrait cards. Existing tilt and entrance motion remain, with a scale-only entrance that does not dim faces or reveal an empty strip above the image.

## Generation and prompt set

Generated with the built-in ImageGen editing tool, six independent image edits. Original team portraits were supplied as identity/edit targets. Pillow was used only to downsample and encode the selected images into WebP.

Shared first-edit prompt:

> Use case: identity-preserve / background replacement. Edit target is image 1. Preserve the original person exactly: facial identity and geometry, expression, gaze, skin tone, hair, body proportions, hands, clothing, all clothing marks and accessories. Do not retouch or reconstruct the face. Cut out the existing photographed person and change ONLY the background. Keep the square original composition and person size/position. No text, no borders, no new foreground objects. Premium natural editorial photograph for the Avante team page, not an illustration.
>
> Image 2 is the approved São Paulo sunset color/style reference, NOT a face reference. Cohesive warm amber, dusty rose, muted mauve and soft indigo shadows. City background gently out of focus, identifiable but quiet, with a continuous sunset sky and a low skyline; elegant and bright enough to read, no neon, no lens flare, no glowing particles. Keep the original subject's natural exposure.

- **Cristian:** replace the event wall with a San Francisco sunset viewed from a high overlook: Golden Gate to the left, bay and distant skyline, golden-peach sky and mauve hills. Keep the bridge beside the subject, not across the face.
- **Amanda:** replace the gray background with the approved São Paulo sunset: Paulista skyline and antennas around the shoulders, peach/amber sky, mauve city, indigo shadows.
- **Felipe and Luiz:** use each original portrait as the only identity target and Amanda's generated portrait strictly as background/color reference. Replace only the backdrop with the same São Paulo skyline, horizon and sunset treatment; preserve the man's face, expression, hair, beard, glasses, clothing, hands and pose.
- **Andrea and Jess:** use each original portrait as the only identity target and Cristian's generated portrait strictly as background/color reference. Replace only the backdrop with the same Golden Gate/bay/skyline composition and color treatment; preserve the woman's face, smile, gaze, skin tone, hair, clothing and pose. Remove the old white photo border where present.

The generated portraits were visually compared with their source photos. These are generative edits, not a claim of pixel-identical subject preservation.

## Verification

- Native Safari: all six new images loaded and matched the requested city assignment at 1,221 px, 390 px and 320 px, with no detected broken images or horizontal overflow.
- At 390 px, all six selected the 400 px files; at 320 px, the wider single-column cards selected 800 px files.
- Studio: all three shared portraits loaded the correct 400 px assets and city assignments.
- Screenshots and the disposable review page are archived in `/tmp/avante-team-sunsets-2026-09-14/`.
- `npm run build:vite-only` and `git diff --check` passed. All twelve optimized images are present in the build; the temporary review page is absent. Vite retains the existing large article-data chunk warning. No deployment, commit or push was performed.
