# Avante swarm — adversarial verification

Date: 2026-09-14. Read-only verification of five independent simulated reviews: institutional investor, venture investor, UX/accessibility, brand/editorial, and art direction. This is an audit of what those reviews can support, not real investor feedback or financial diligence. No application files, browser state, build, or server were changed by this verifier.

## Decision

Preserve the approved visual direction. The credible findings concern inconsistent institutional claims, the next step for an interested investor, depth of venture evidence, narrow-screen reading, and unfinished language paths. None of the reports establishes that the 3D reduces conversion or that the site is slow.

## Five prioritized improvements

| Order | Improvement | What is verified | Confidence and boundary |
|---|---|---|---|
| 1 | Reconcile investment-history attribution and company relationships across visible copy, SEO, and FAQ data. Give benchmarks document-level provenance. | `InvestorsPage.tsx:58`, `:80`, `:102`, and `:165` call $500M+ historically deployed; `../TEAM-FACTS.md:45` explicitly settles Amanda's figure as under management. The investor FAQ and Portfolio use incompatible cohort lists. Footer source 6 links to organizational homepages rather than the named reports. | High for contradictions and link destinations. The correct full portfolio classification still requires reconciliation: FutureProofing is explicitly unresolved in the creative-direction document. The benchmark figures were neither validated nor disproven. |
| 2 | Give investor interest a working, context-preserving next step. | The final investor-page Link correctly navigates to the general homepage contact section. Separately, the embedded `InvestorEcosystem` “Start a Conversation” button only searches the current document for `#contact`; this route has no such target. Its supplied `onOpenContact` callback is unused. Root reproduced the no-op in native Safari on `/en/investors`; capture 12 records the unchanged page after clicking. | High: independently inspected source plus root's runtime reproduction. Newsletter-versus-partnership prominence is a strategic decision, not a measured conversion result. |
| 3 | Make the internal venture destination add concise operating evidence. | Homepage descriptions explain the markets and website links show actual public destinations. The internal portfolio disclosures repeat the exhibit, while current records give short descriptions without a dated Avante-specific milestone. | High for the content present; medium for recommended impact. Add only approved facts: customer/problem, Avante's contribution, and a dated milestone or real workflow. This is missing public evidence, not missing underlying traction. |
| 4 | Remove narrow-screen occlusion and improve the reading/interaction layer. | Screenshot 11 shows the floating BackToTop circle covering part of Felipe Moraes's name. The component is 48px square with 32px right/bottom offsets from `--avante-space-4`; it has no narrow-screen exclusion. Mobile CSS specifies 10px roles, 11px biographies, and 9px profile links. Menu focus containment and section-navigation focus management are absent in the inspected implementation. | High for screenshot occlusion and declared CSS sizes. Font recommendations are readability judgments, not a universal WCAG minimum. Keyboard consequences need live reproduction. Mobile captures are Safari at 390 CSS pixels in a frame, not physical-phone tests. |
| 5 | Complete Spanish investor and portfolio paths, then harmonize secondary-page presentation. | Both `InvestorsPage` and `PortfolioPage` use a two-language helper that returns English for Spanish. Portfolio also explicitly maps Spanish venture descriptions to English. Spanish metadata and translated controls coexist with English body copy. | High for localization defects. Inner-page visual harmonization and portrait treatment are lower-priority taste judgments; inspect each route before editing. |

Source paths above are relative to `projects/avante/avante-website` unless stated otherwise. Supporting captures are in `/tmp/avante-swarm-2026-09-14/screens/`.

## Verification details and corrections

### Institutional claims

- **Accept:** $500M+ “deployed” versus Amanda's “under management” is a real semantic contradiction, not merely alternate framing. The correction must retain the person and historical institution context. It must not become a claim that Avante itself managed $500M+.
- **Accept with qualification:** The active-cohort lists conflict. **Reject:** treating Portfolio's WIR/AlphaJuri/FutureProofing list as automatically authoritative. `docs/2026-09-14-full-website-creative-direction.md:72` explicitly says FutureProofing's classification disagrees with internal canonical material; `../CLAUDE.md:65` places it separately from the umbrella. Resolve the relationship rather than inferring ownership.
- **Accept as attribution ambiguity:** The investor headline describes a studio with a 10× exit, while the portfolio explains prior team experience at another institution. This supports making historical attribution more precise; it does not establish that the exit itself is false.
- **Accept:** `Footer.tsx:421` and `:423` label particular reports but link to `gssn.co` and `cambridgeassociates.com` homepages. The page offers a citation path, so “no sources” is false. Document-level provenance and methodology remain incomplete. No external report existence or financial benchmark was checked here.

### Investor actions

- **Do not call the closing Link broken.** `InvestorsPage.tsx:496` navigates to `/${language}#contact`, which exists in `EditorialHome.tsx:74`. Its weakness is losing LP context and placing a newsletter action first.
- **New verified defect:** `InvestorEcosystem.tsx:518` checks `document.getElementById('contact')` and does nothing when absent. `InvestorsPage.tsx:454` mounts this component on the investor route, which has no `#contact`. The component accepts `onOpenContact` but never invokes it. Root clicked this specific button in native Safari and observed no viewport movement, route change, or dialog; `screens/12-investor-cta-after-click.png` records the result. The source was independently checked by this verifier; runtime evidence comes from root.
- **Reject any claim that investors cannot contact Avante at all.** A generic email link exists in InvestorEcosystem, and the closing route reaches homepage contact. The problem is a failed particular button plus indirect/context-free alternatives.

### UX and rendering

- **Accept as source-observed interaction risk:** The menu restores focus on Escape, but opening does not relocate focus, isolate background content, or contain Tab navigation. There is no shared focus-management mechanism in the inspected wrapper. Live keyboard/assistive-technology testing is still needed before calling a particular user journey reproduced.
- **Narrow the scrolling complaint:** The overlay already has `overflowY: auto` and `overscrollBehavior: contain`. It is unsupported to say touch scrolling definitely leaks to the page without a device reproduction.
- **Accept as source-observed focus risk:** The router hash effect and intercepted navbar anchors scroll without focusing the target. Native anchor behavior varies, so source absence alone does not prove every hash link fails screen-reader navigation. Test the actual intercepted/router paths.
- **Accept as high-confidence logic defect, not observed runtime failure:** After WebGL context loss, `VentureLogoScene.tsx:60` clears readiness through `onFailure`, but leaves `loaded` true. A later pointer move or resize reaches `draw()`, whose `onReady()` call has no success/context guard. The installed Three implementation at `node_modules/three/src/renderers/WebGLRenderer.js:1603` returns immediately when its context is lost; it does not throw before that callback. Thus a lost-context draw can restore the CSS-ready flag while no valid render occurred. Context loss frequency and real-device appearance were not measured. Keep this in the engineering reliability queue, below ordinary visible reading issues.
- **Accept as optimization opportunity only:** A desktop deep link can initialize offscreen hero scene resources. This does not prove slow loading, excess mobile entry work, or poor Core Web Vitals. Current source includes mobile/static alternatives and intersection-based venture mounting.
- **Accept mobile floating-control overlap.** Independently viewed screenshot 11. The 48px figure is the button's size; the current right/bottom inset resolves to 32px, not 48px.
- **Exclude a persistent navbar collision finding for now.** The scrolled navbar already has a backplate, and background Safari may capture a frozen transition. The screenshot supports rechecking settled navigation, not declaring the header permanently broken.

### Editorial and art direction

- **Reject the six English stage labels as an automatic localization defect.** `brand-truth.md` explicitly requires “Research, Partner, Build, Traction, Revenue, Compound” verbatim and in that order. Localized supporting descriptions already exist.
- **Keep “compõe/compone” as editorial judgment.** The concern about losing accumulated-growth meaning is reasonable, but a proposed replacement needs an approved brand-language decision rather than an automatic mechanical translation.
- **No genuine cinematic-versus-institutional disagreement emerged.** Both investor reviews support retaining the cinematic identity and distinct venture compositions. The art director's imagined objection is hypothetical; do not report it as a disagreement among this swarm.
- **Keep WIR's expressive treatment and AlphaJuri's restraint.** Uniformity is not required to establish institutional quality. The shared website action and exhibition structure already provide a common frame.
- **Portrait color consistency and secondary-page border/radius vocabulary are taste refinements.** They are less urgent than contradictory claims, unavailable Spanish copy, or content occlusion.

## Claims to exclude from the user synthesis

- Any numerical design score, conversion lift, investor willingness estimate, performance score, or claim of physical-device validation.
- “Investors dislike 3D,” “the 30-second film blocks the website,” “mobile loads the full hero scene,” or “all navigation/contact is broken.” The inspected architecture and independent reviews do not support these statements.
- “Avante lacks traction,” “the financial benchmarks are false,” or “FutureProofing definitely belongs in the active Avante cohort.” Those conclusions exceed this evidence.
- A mandate to translate the six canonical stage names or replace official logo geometry/dots.
- A claim that any suggested copy, code, or design changes have already been applied.

## Recommended synthesis

The independent reviews agree on the central direction: the real-city journey, recognizable Avante arrival, individually branded ventures, and real team should stay. The next iteration should make the institutional detail and the path to a conversation as convincing as the visual introduction. Distinguish two established content errors and a few interaction issues from strategic recommendations; avoid turning this into another full redesign.
