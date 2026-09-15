# Avante — Built to compound

Status: local implementation available on September 12, 2026. Five animated chapters, two illustrative workflow exhibits, localized copy, and a static mobile/reduced-motion path are implemented. Publication and complete device/performance validation remain pending. See `2026-09-12-compound-implementation.md` for verification evidence and limitations.

## Basis and limits

- Brand reviewed: https://avanteventures.com/en on September 12, 2026. Live page content and accessibility structure were retrieved. Safari displayed the opening brand mark, but further visual inspection failed with `noWindowsAvailable`; this is not a complete animation audit.
- Motion reference: https://terminal-industries.com/ and the existing local reference project in `experiments/3d-web-replicas`. That project caches a 410-frame desktop opening sequence and a separate mobile sequence. Its compiled resources are reference material, not an implementation base for Avante.
- Local sources: `src/styles/theme.css`, `package.json`, project `CLAUDE.md`, umbrella `../CLAUDE.md`, and the existing storytelling-redesign memory.
- Working objective: awareness and understanding, followed by Library readership and memo subscriptions. Preserve the current quiet partner/press contact path.
- Current source tokens take precedence over older memory: headings use Funnel Display, body Bricolage Grotesque, and labels JetBrains Mono. The older Newsreader decision was superseded in the source.
- Implementation reconciliation: `../content-engine/knowledge-base/brand-truth.md` requires "venture studio" as Avante's identity. The implementation uses that term instead of the live site's older "venture builder" wording. `../TEAM-FACTS.md` establishes Amanda's $500M+ as under management, not capital deployed.

## Creative direction

Make the construction of an AI-native company tangible. The visitor follows a business operation from a document on an operator's desk into a working product, then sees the underlying company take shape around it. The same structure can support another venture.

The central object is an original, carefully art-directed operating model: a physical desk vignette that opens into an exploded arrangement of document, product interface, structured records, and operator workstations. Each object has a readable business role. This avoids a generic collection of glowing nodes and gives camera movement a reason.

Use the reference's continuous cinematic pacing, large object composition, depth, and scroll-linked reveals. Avante supplies the subject, geometry, branding, information, and code. The promise is equivalent craft and narrative clarity, not an identical industrial scene.

Proposed headline: **We build to compound.**

Proposed supporting copy: **AI-native companies. Built from Brazil.**

These are draft creative lines. Preserve or reconcile existing positioning claims before implementation.

## Storyboard

Scroll percentages below describe the proposed animated opening, not the whole homepage. First prototype target: approximately five viewport heights on desktop, adjustable after testing.

| Beat | Camera and scene | What the visitor learns | Draft on-screen copy |
| --- | --- | --- | --- |
| 1. Enter, 0–15% | An operator's desk against a subdued São Paulo dusk backdrop. One document, one screen, and a restrained Avante mark. Camera moves gently from a wide composition toward the desk. | Avante works inside actual business operations in Brazil. | We build to compound. |
| 2. Open the operation, 15–35% | The document rises slightly; its pages separate. Selected fields align with structured records beside it. Keep readable labels in HTML over the scene. | A concrete workflow is the starting point. | Start with the work. |
| 3. Build the company, 35–65% | Camera orbits roughly 25 degrees. The view expands into three aligned layers: product interface, data records, and operator workstations. Layers assemble around the original workflow. | Avante contributes product, data infrastructure, and hands-on operating work. | Product. Data. Operators. |
| 4. Show the work, 65–85% | The camera settles. A visitor-controlled selector changes the workflow exhibit between AlphaJuri and WIR without restarting the scene. Each shows a short input → process → output path. | The method connects to actual work and identifiable ventures. | Built around real operations. |
| 5. Compound, 85–100% | Camera pulls back to show a second workbench using the same underlying structure with a different workflow. A warm accent follows the reused structure. Resolve into the Avante mark and release the pinned scene. | Experience and infrastructure can carry into the next build. This is an explanatory metaphor, not a quantified performance claim. | Build. Learn. Build again. |
| 6. Meet the people, normal scroll | Real portraits and concise biographies follow in normal document flow. Continue into selected work, Library, memo subscription, and quiet contact. | Real people stand behind the operating model, and visitors can inspect their thinking. | We think in public. |

AlphaJuri exhibit: an illustrative legal document → highlighted relevant fields → product result. WIR exhibit: an illustrative submission → appetite assessment → traceable output. Use explicitly illustrative, synthetic content in the prototype; final product screens must accurately reflect the product and contain no client data.

Use the current public venture names as research inputs, not proof of ownership or status. The live homepage groups FutureProofing under its venture heading; umbrella instructions describe it as separate. Keep its relationship explicitly unresolved in the content inventory and omit ownership claims from the prototype. Reconcile before final copy. Do not substitute BR Auction Intel merely because older memory lists it.

## Visual specification

- Base: existing deep ink `#06070d`, with soft warm illumination and generous empty space for text.
- Brand accents: amber `#FAB437`, coral `#E47A5C`, mauve `#B05B8D`, purple `#7C4B98`, blue `#304B9B`. No cyan.
- Materials: warm paper, matte dark surfaces, restrained translucent panels, and brushed metal details. Use lighting and dimensional composition rather than excessive glow.
- Geography: the approved São Paulo dusk background is a grounding reference, not an invented map of Avante offices or portfolio reach.
- Typography: reuse the current tokens; keep prose outside the 3D rendering for selectable, accessible, localized text.
- Branding: preserve the supplied logo silhouette and proportions. Any depth treatment must retain its recognizable shape.
- Motion: deliberate camera movement, one primary action per beat, smooth forward and reverse scrolling, and no mandatory introductory wait or audio.

## Production assets

| Asset | Source / production | Acceptance requirement |
| --- | --- | --- |
| Desk and operating-model geometry | Original low-poly scene; procedural geometry for the first prototype, custom refinement afterward | All three opening beats share identical object geometry and lighting |
| Document and record panels | Synthetic design fixtures, authored as reusable layouts | Readable purpose; no real personal or client data |
| Product exhibits | Existing approved screens or clearly marked illustrative mockups | Accurate workflow; no invented capabilities or results |
| Avante mark and type | Existing local brand assets and font tokens | Correct proportions, colors, and font loading |
| São Paulo atmosphere | Approved brand background asset | Warm grade, subtle treatment, no misleading new geographic claims |
| Team and credibility content | Existing portraits plus reconciled canonical bios/facts | Partners and portfolio correctly distinguished; figures attributed and verified |
| Static opening poster | Export from the final scene | Same camera, lighting, and typography alignment as the interactive opening |

Image generation can help explore materials and lighting before production. Independently generated images should not become successive animation frames: geometry and camera continuity must come from one coherent scene. Video generation is not a prerequisite for this direction.

## Technical approach

Reuse the existing React/Vite application and its installed Three.js / React Three Fiber stack. Use a single lazily loaded canvas for the animated opening. Start with the existing Motion scroll tools; add GSAP ScrollTrigger only if prototype evidence justifies dedicated timeline orchestration. ScrollTrigger officially supports pinned sections and scroll-scrubbed timelines: https://gsap.com/docs/v3/Plugins/ScrollTrigger/.

Map one normalized scroll progress value to camera position, object transforms, lighting, and matching HTML copy. Store scene states declaratively so the experience remains deterministic when the visitor reverses direction. Keep one animation owner per property.

Render the headline, navigation, copy, and destination links before loading 3D. Preserve existing localized routes, metadata, Library content, and prerender behavior. Test dependency compatibility in the actual project before changing package versions.

Desktop: one canvas, capped pixel ratio, restrained object count, progressive asset loading, and rendering paused while offscreen. Start with a compressed scene budget of 4 MB and a poster budget of 200 KB; these are prototype targets, not measured results.

Mobile: a shorter two- or three-beat composition with normal vertical scrolling and larger text. Reduced-motion and unsupported-WebGL paths show the poster plus the full HTML story, without camera travel. Do not make content depend on completing the animation.

## Build sequence and review criteria

1. **Storyboard and art direction.** Produce three keyframes: wide opening, exploded operation, assembled company. Judge subject clarity, brand fit, and continuity before detailed asset production.
2. **Local motion prototype.** Implement beats 1–3 using simple geometry and draft copy. Verify forward/reverse scrolling, loading fallback, responsive layouts, and camera pacing. This is the first useful deliverable for Cristian to review.
3. **Production scene.** Refine models, textures, lighting, and the two workflow exhibits. Introduce the repeating-build transition only after the first operation reads clearly.
4. **Homepage integration.** Connect to real people, selected work, Library, subscription, and existing contact paths. Reconcile relationship labels and quantitative claims, then complete EN/PT/ES copy.
5. **Verification.** Check desktop Safari and Chromium, one real touch device, keyboard navigation, reduced motion, WebGL failure, reload, resize, back navigation, and all localized routes. Target a stable 60 fps on the M3 desktop and at least 30 fps on the selected mobile device; report actual measurements. Ensure LCP/CLS do not materially regress from a measured baseline.

For implementation validation, use `build:vite-only` first; the full build automatically triggers IndexNow. A documentation-only plan does not require an application build. Any later release follows the explicit deployment approval rule; main-branch push is deployment-triggering.

## Scope and effort

Planning estimate, not a delivery commitment: 1–2 focused production days for keyframes and the basic motion prototype; 3–5 for scene refinement and exhibits; 2–4 for integration, localization, and device tuning. Bespoke photorealistic modeling or missing approved content can expand this substantially. No paid generation, new subscription, or production deployment is included.

The recommended first implementation is the three-beat local prototype: **desk → operation opens → company assembles**. It establishes whether the motion is convincing and the story is understandable before expanding the homepage.
