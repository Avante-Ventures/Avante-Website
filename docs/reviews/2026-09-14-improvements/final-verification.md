# Final adversarial verification

Date: 2026-09-14. Read-only, bounded review of the implemented design/investor improvements and the UX/content follow-up reports. No browser interaction, application edits, build, or server operation by this verifier.

## Blocking regressions

**No new blocking regression identified in the inspected changes.** The benchmark provenance question remains a known unresolved content issue awaiting the user's decision; this review does not clear the ~50%/~19% comparison or its old source label for publication.

## Confirmed implementation outcomes

- **Back-to-top focus correction is present.** `BackToTop.tsx` calls `focusSection(heroSection, behavior, false)`, focusing the stable section instead of a currently hidden chapter heading. The control is excluded below 900px. This addresses the concrete hidden-heading concern in `ux-review.md`.
- **Context restoration now rebuilds reflection resources.** `VentureLogoScene.tsx` guards rendering while the context is lost, clears readiness, and regenerates the PMREM environment before resuming on restoration. Cleanup removes both context listeners and disposes the current environment. This addresses the follow-up reflection concern as well as the original fallback-state defect.
- **Menu semantics and section focus are implemented deliberately.** The native modal isolates background content, restores saved overflow values, handles Escape, and explicitly cycles Tab. Same-page navigation closes the dialog before focusing the section, preventing cleanup from taking focus back to the opener. Route hash navigation shares the section-focus helper.
- **Desktop scene deferral preserves the journey's reserved height.** Scene import is proximity-gated while the desktop enhancement state still determines layout height. The approved mobile/static alternative remains.
- **The investor no-op is removed.** `InvestorEcosystem` and the closing investor action are direct email links with investor-specific, localized subjects. The unused modal callback path is gone. The closing paragraph accurately explains that the visitor emails Cristian to arrange a conversation.
- **Attribution and content depth are improved.** Investor visible text and FAQs attribute $500M+ to Amanda's historical management experience at Innova/Unbox and Sigga to the team's prior Innova investment experience. Portfolio separates selected studio ventures, the operating network, and prior team activities. Case notes add public workflows and Avante's role without invented traction. The English legal-workflow wording now says “case identification,” resolving the content review's minor correction.
- **Spanish and mobile reading improvements are present.** Reviewed investor, ecosystem, portfolio, pipeline and case-note paths supply Spanish text. Mobile biographies are 14px and profile links 12px; the narrower team grid becomes one column below 380px. Language switching preserves hash and query.

## Runtime and check boundaries

Root reports native Safari verification of menu Tab/Shift+Tab wrapping, Escape returning to the opener, People navigation focusing its heading with scrolling unlocked, zero horizontal overflow at 320/390 CSS pixels, and logo fallback persistence through context loss plus correct rendering after restore. Root also verified the Spanish portfolio disclosure and investor mailto destinations. These are root's runtime observations, consistent with the independently inspected code; no email was sent.

The scoped TypeScript check is reported passing by root. Expanded TypeScript still reports inherited article-data and WhyAvante typing errors; do not describe the full project typecheck as passing. The final Vite build and removal of the temporary QA wrapper were pending at the time of this review. No physical-device, assistive-technology, production-performance or deployment certification is implied.
