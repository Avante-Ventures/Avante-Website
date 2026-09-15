# Art-direction review: Avante

Reading this as a preservation review of a cinematic venture-studio website for founders, operators and potential investors. The approved São Paulo journey and individual venture identities are the foundation. Apply taste contextually: variance 8, motion 7, density 3 for Avante; the calmer AlphaJuri treatment intentionally lowers variance and motion.

## Evidence and limits

Reviewed the current source (`world.css`, `EditorialHome.tsx`, `WorldTour.tsx`, `VentureExhibit.tsx`, `Navbar.tsx`, `SectionMasthead.tsx`, and relevant Portfolio/Library styling), the showcase provenance document, and desktop/mobile captures 01–11 in `../screens/`. The corrected 05 capture shows WIR. Mobile images are native Safari rendering at 390 CSS pixels inside a same-origin review frame, not a physical-phone test. This is an independent simulated art-director opinion, not external customer research. No app files were edited and no live interaction, performance measurement or contrast certification was performed by this reviewer.

## Three things that work

1. **The journey has a credible visual story.** The globe in 01 leads to the actual urban fabric in 03 and a recognizable Avante sculpture in 02. Geography gives the spectacle a reason to exist; the large, spare headline leaves room for the image. Keep the real city and this beginning-to-destination structure.
2. **The venture showcases finally behave like distinct brands.** In 05, WIR's violet/cream diagonal, expressive official mark and angled website form one composition. In 04, AlphaJuri's orthogonal porcelain/navy panel, monogram and level website feel orderly and institutional. They should not be made identical. The mobile layouts in 09 and 10 preserve those differences without squeezing the desktop arrangement into a narrow column.
3. **The main editorial hierarchy is calm and readable.** The strong sans headlines and quieter paragraphs in 06 and 07 create breathing room after the dense city scene. Actual team portraits provide a welcome human change of subject. The mobile hero in 08 keeps a clear headline and primary venture link, instead of forcing visitors to operate the desktop globe.

## Concerns and concrete refinements

| Priority | Classification | Evidence | Recommended refinement |
|---|---|---|---|
| First | **Observed visual occlusion; transition persistence unconfirmed** | The fixed BackToTop circle overlaps Felipe Moraes's name in 11 and the paragraph edge in 10. At the captured anchor positions in 06, 09 and 10, underlying journey controls or section links are visible behind the navbar. `Navbar.tsx` already has a translucent scrolled backplate, so this is not a missing-header claim. Safari's background capture may freeze transition frames; repeat settled navigation before diagnosing a persistent navbar bug. | Remove the floating top control on narrow screens, or place that action within the page/footer. Recheck settled anchors in the foreground; if the navbar collision persists, strengthen the scrolled backplate and prevent outgoing journey controls from sharing its visual zone. Preserve visible keyboard focus. |
| Next | **Observed small type; aesthetic/readability judgment, not a measured WCAG failure** | `world.css` sets the main mono metadata group to 10px, mobile hero metadata to 8px, mobile team roles to 10px, bios to 11px and profile links to 9px. Captures 08 and 11 show some of this text operating as texture. The large display text reads much more comfortably. | Separate useful labels from decoration: make functional secondary labels around 12–14px and mobile biographies around 14px. Remove expendable coordinates/scroll microcopy on mobile instead of shrinking everything to fit. The artwork can remain large; supporting text should not have to whisper. |
| Later | **Aesthetic preference** | In 07, Amanda, Felipe and the third portrait have noticeably different background temperature, lighting and framing. The real people are persuasive; their photographic treatment is less coordinated than the carefully composed venture panels. | Standardize crop/eye line and apply a restrained common color treatment to the supplied portraits. For a future photo session, use one lighting/background brief. Preserve likeness and authentic expressions; do not replace the team with generated people or generic stock. |
| Later | **Source-observed inconsistency; secondary routes not visually revalidated here** | The new homepage uses mostly sharp edges and concise headings. `PortfolioPage.tsx` still opens with a long, mixed-jargon standfirst and has a rounded, gold-edge explanatory note; `LibraryPage.tsx` retains numerous 20–24px rounded card treatments and a pill CTA. Shared masthead typography helps, but those local treatments express a different level of restraint. | Carry the homepage's spacing, border and CTA vocabulary into the secondary routes in a focused consistency pass. Shorten the portfolio standfirst into a clear introduction with details below. Preserve all actual venture facts, page URLs and article content. Confirm each route visually before changing it. |

## Two preservation priorities

- Preserve the optional cinematic sequence, genuine São Paulo imagery, Avante palette and recognizable arrival sculpture. The improvement should sharpen the experience, not replace it with a generic institutional brochure.
- Preserve the deliberate contrast between WIR's expressive brand world and AlphaJuri's orderly institutional composition, including the official logo geometry and colors. The marks' intrinsic dots are brand assets, not decorative UI dots.

## A disagreement worth debating

An investor-focused reviewer may prefer a static, fact-dense opening or completely uniform venture cards. I would keep the cinematic opening and different venture compositions, then make the route to evidence more immediate. An investor needs clear facts; the site does not need to abandon the thing that makes Avante recognizable to provide them. This is a design judgment, not a claim that the animation improves conversion.

## Recommendation

Keep the current direction. Prioritize content visibility and readable secondary type, then photographic consistency and secondary-page continuity. A broad redesign would risk erasing the strongest parts of this iteration.
