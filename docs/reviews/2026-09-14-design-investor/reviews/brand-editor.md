# Avante — independent brand, editorial and conversion review

**Scope:** Read-only review of the current local source and desktop screenshots `01-desktop-hero.png`, `02-desktop-arrival.png`, `03-desktop-city.png`, and `04-desktop-alphajuri.png`. This is a simulated professional critique, not visitor research or investor feedback. No conversion measurements, mobile interaction tests, or financial-claim verification were performed for this review. File references below are relative to the website repository.

**Design read:** Preserve the cinematic venture-studio identity and the newly approved brand-specific portfolio compositions. The next improvement should make the institutional story as precise as the visual presentation, rather than add another visual system.

## Three things working

1. **The opening has a recognizable place and destination.** The globe, real São Paulo footage, and Avante sculpture form a coherent world-to-company sequence. This is much more memorable than an abstract technology background. The headline and description also identify the firm immediately; the visitor can explore ventures without first watching the full story. Evidence: screenshots `01`, `02`, and `03`; `src/app/components/world/WorldTour.tsx:15`.
2. **The current AlphaJuri composition feels organized and institutional.** Porcelain gives the symbol breathing room, navy frames the actual website, and the baseline website link makes the composition actionable. The copper accent comes from the venture identity rather than unrelated decoration. Its restraint is an asset; it does not need to imitate WIR's more expressive arrangement. Evidence: screenshot `04-desktop-alphajuri.png`; `src/app/components/world/world.css:117`, `:122`, and `:126`.
3. **The content structure has credible foundations.** Specific descriptions of the ventures, named people with professional profiles, a fuller portfolio taxonomy, and a linked Library give visitors places to investigate. The homepage's short descriptions now explain real customer problems rather than relying on an AI label. Evidence: `src/app/components/world/EditorialHome.tsx:13`, `:58`, `:68`, and `:72`; `src/app/pages/PortfolioPage.tsx:319`.

## Four concerns and proposed improvements

### 1. Resolve the contradictory company story before adding more polish

**Concrete content defect.** The investor page's structured FAQ calls Mahway, WIR, and Bamboo DCM the active studio cohort. The Portfolio page identifies WIR, AlphaJuri, and FutureProofing as Cohort 1 and separates partner-co-founded and US-building companies. These are different institutional claims. The discrepancy exists in machine-readable metadata even if a visitor does not see that FAQ as page text.

**Evidence:** `src/app/pages/InvestorsPage.tsx:58`, `:80`, `:102`, and `:135`; `src/app/pages/PortfolioPage.tsx:286` and `:319`.

**Improve:** Reconcile current studio companies, partner history, and prior investment experience against the canonical company facts. Publish those distinctions consistently in visible copy and metadata. Keep attribution beside each proof point; do not collapse the team's history into studio-owned outcomes. This review does not establish which financial claims are correct.

### 2. Give the business conversation more prominence than newsletter acquisition

**Strategic design concern, not a broken control.** Subscribe is the persistent header action. The final homepage section again gives the filled primary button to the newsletter and a smaller text link to partnership contact. The dedicated investor route is reachable in the footer, but is not part of the primary navigation. This hierarchy presents Avante partly as a publication, despite the strong studio story.

**Evidence:** `src/app/components/Navbar.tsx:218`; `src/app/components/world/EditorialHome.tsx:74`; `src/app/components/Footer.tsx:165`.

**Improve:** Keep “Explore our ventures” in the hero. Give the closing primary action to “Build with Avante” or another clearly defined partnership conversation, with a short explanation of whom the team wants to hear from. Keep newsletter signup within the Library/newsletter context. Surface the existing Investors destination through a clear audience entry point without adding a dense navigation bar. Validate this hierarchy against the firm's actual acquisition priority before changing it.

### 3. Finish the language experience beyond the homepage

**Concrete localization defect.** Spanish visitors get translated homepage copy and selected controls, but the investor body falls back to English and portfolio descriptions explicitly do the same. The studio process also retains English labels across languages. The footer renders “compounds” as “compõe/compone,” which describes composition rather than accumulated growth, weakening the central brand promise.

**Evidence:** `src/app/pages/InvestorsPage.tsx:113`; `src/app/pages/PortfolioPage.tsx:228` and `:345`; `src/app/components/world/EditorialHome.tsx:8` and `:51`; `src/app/components/Footer.tsx:123` and `:127`.

**Improve:** Translate complete visitor paths, especially portfolio, investor explanation, and contact. Use a small editorial glossary for studio, venture, compounding, claims, and underwriting. Keep brand names and necessary Brazilian legal terms intact, with a brief explanation for international audiences. Do not mechanically translate screenshots of the actual Portuguese venture websites; identify them as site previews if necessary.

### 4. Let venture exploration reveal substance beyond another image

**Content opportunity.** The new exhibits convincingly show that the companies have identities and websites. The secondary “Explore this venture” journey, however, leads to a portfolio disclosure containing the same exhibit, followed by short portfolio descriptions. The design promises more depth than that route currently provides. Elsewhere, repeated phrases about work, building, and the next chapter add atmosphere but few discriminating details.

**Evidence:** `src/app/components/world/EditorialHome.tsx:58`, `:59`, `:15`, and `:17`; `src/app/pages/PortfolioPage.tsx:291` and `:298`; `src/app/components/world/VentureExhibit.tsx:32`.

**Improve:** Keep the attractive visual and direct website link. Give the internal venture destination a concise case narrative: customer and problem, what exists today, Avante's specific role, and the next milestone. Add one approved, attributable proof item when available—such as a real product view, named founding operator, or documented milestone. Do not invent customer counts, revenue, partnerships, or return figures. The homepage can stay cinematic and concise once the deeper route earns its promise.

## Two things to preserve

- Preserve the real São Paulo journey, official Avante sculpture, and direct skip/explore routes. The geographic story is the signature, not disposable decoration.
- Preserve distinct venture identities inside a shared exhibition structure: AlphaJuri's calm porcelain/navy treatment and WIR's more expressive brand palette. Consistent outer spacing, navigation, and CTA placement matter more than identical compositions.

## Preference versus defect

Preferring less motion or preferring AlphaJuri's symmetry to WIR's tilt is taste, not proof that either approved composition is wrong. The contradictory cohort metadata and Spanish-to-English fallback are demonstrable defects. The CTA hierarchy and deeper venture stories are reasoned recommendations that should be judged against Avante's business goals, not presented as measured conversion improvements.
