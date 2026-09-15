# Interior experience — September 14, 2026

The six interior templates extend the approved home direction: warm São Paulo light, ivory typography, mauve architecture and generous editorial spacing. The home, continuous drone film and existing venture exhibits remain intact.

## Pages

- **Studio:** cinematic skyline opening, founding partnership narrative, canonical operating commitments, real team portraits, interactive six-stage process and FAQs aligned with the visible copy.
- **Ventures:** Avante gallery sculpture, spacious venture exhibits and expanded AlphaJuri/WIR details. Existing venture identity, website links and anchors are retained.
- **Investors:** a documentary São Paulo skyline from the approved film, readable evidence strip, editorial thesis and quiet institutional sections. The $500M+ historical capital figure retains its attribution to Amanda's Innova/Unbox experience.
- **Principles:** an architectural process exhibit that builds through Research, Partner, Build, Traction, Revenue and Compound, followed by all ten operating principles.
- **Library:** latest published story, localized category filters, accent-insensitive search, result feedback and incremental pagination.
- **Articles:** editorial artwork and a restrained reading column. Existing content, tables, sources, related links, metadata and social preview images are retained. Social preview title cards are not reused as cropped page illustrations.

## Assets and rendering

`saopaulo-interior-*` images come from the eight-second frame of the approved real drone film; source credit is in `public/world-assets/ATTRIBUTION.md`. The Studio uses the approved perspective skyline. New process architecture is illustrative, not a representation of a building owned by Avante.

Decorative Three.js scenes load only near the viewport, above 760 px and without a reduced-motion preference. Rendering settles after a short entrance and resumes for pointer or stage changes. Pixel ratio is capped at 1.4. Off-screen scenes unmount; geometries, materials and renderer resources are disposed. Mobile and reduced-motion layouts use CSS/SVG compositions. A lazy-load boundary and WebGL context-loss handling preserve those compositions if rendering fails. Process descriptions and controls remain accessible HTML.

Scoped styles live in `src/app/components/interiors/interiors.css`. New shared components live beside that file. The Studio and process reuse canonical copy exported from `InsideVentureBuilder.tsx`.

## Validation

- Existing film, world journey and compound story tests: 17 passed.
- All six changed page modules parsed successfully with Vite's TSX transformer.
- Scoped TypeScript check: no diagnostics in the changed pages or new interior components. The complete check still reports 1,694 existing errors in unchanged `src/app/data/articles.ts`, primarily extra `id` properties in `ArticleSection`; that generated content was not modified.
- `npm run build:vite-only`: passed (2,081 modules; 4.25 seconds). Vite still warns about the existing article-data chunk (3.50 MB / 1.10 MB gzip). Prerender and IndexNow were not run.
- Native Safari review: six templates × English/Portuguese/Spanish × 320/390/1,221 px = 54 route/viewport checks. Each had one H1, one main landmark, no page-width overflow, no detected broken loaded images and no captured runtime errors. Mobile widths were emulated inside an iframe, not tested on a physical phone.
- Library interactions verified: AlphaJuri search, no-result feedback, filter reset, AI & Tech category selection and pagination from 12 to 24 articles. Singular result grammar was subsequently corrected and included in the successful build.
- Process controls verified from Research to Compound and back. The real WebGL canvas reported ready. A synthetic context-loss event followed by resize and another stage selection kept the static composition active and the HTML controls usable.
- Gallery canvas reported ready with no captured errors. Visual review covered Studio, Ventures, Investors, Principles, Library and an article. Safari's background-window animation throttling limits assessment of animation cadence; no real-device frame-rate claim is made.
- Temporary browser review code was removed before the build. Audit output and screenshots are in `/tmp/avante-interiors-2026-09-14/`. The existing local server remains available on port 4315.
- `git diff --check`: passed.

No commit, push, production deployment or IndexNow submission was performed. Use `npm run build:vite-only` for the local build; the normal build script submits IndexNow URLs.
