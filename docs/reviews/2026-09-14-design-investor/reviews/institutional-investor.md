# Institutional investor review

Independent first pass. Simulated institutional LP / family-office diligence perspective, not feedback from real investors or investment advice. Source review of the current local build on 2026-09-14. No browser, financial diligence, or performance testing performed. Paths below are relative to `projects/avante/avante-website`.

## Overall read

The homepage makes the studio feel tangible and gives a credible reason to start a conversation. The greatest institutional weakness is not the 3D. It is that the older investor page makes materially less careful claims than the new homepage. Preserve the presentation and reconcile the evidence underneath it.

## Three strengths

1. **Clear identity and actual companies.** The first screen explicitly says venture studio, AI-native, Brazil and Latin America. AlphaJuri and WIR explain a customer problem and link to their own public domains. This is better evidence of operating substance than another anonymous technology claim. Sources: `src/app/components/world/WorldTour.tsx:15`, `src/app/components/world/EditorialHome.tsx:13`, `src/app/components/world/VentureExhibit.tsx:32`, `src/app/components/world/ventures.ts:4`.
2. **Experience belongs to identifiable people.** The team introduction says exactly that, and bios have individual profiles. Amanda's biography correctly says $500M+ under management. Luiz is correctly Head of Engineering. These align with the supplied canonical facts. Sources: `src/app/components/world/EditorialHome.tsx:15`, `src/app/components/world/EditorialHome.tsx:68`, `src/app/components/WhoWeAreScene.tsx:47`, `src/app/components/WhoWeAreScene.tsx:126`, `../TEAM-FACTS.md:45`.
3. **A useful public/private diligence boundary.** The investor page describes cohort exposure, quarterly reporting, and a first conversation, while keeping fees, waterfall, GP commitment, and LP identities private. That is an appropriate direction. These are stated operating commitments, not independently verified implementation. Sources: `src/app/pages/InvestorsPage.tsx:198`, `src/app/pages/InvestorsPage.tsx:216`, `src/app/pages/InvestorsPage.tsx:222`, `src/app/pages/InvestorsPage.tsx:491`.

## Five prioritized concerns

### 1. Critical: the $500M+ attribution contradicts the canonical facts

**Verified contradiction.** The investor statistics say "Deployed by founding team historically" and the FAQ repeats that claim in all languages. The canonical reconciliation explicitly replaced deployed with under management. The portfolio already has the correct attribution to Amanda at Innova and Unbox.

Sources: `src/app/pages/InvestorsPage.tsx:165`, `src/app/pages/InvestorsPage.tsx:58`, `src/app/pages/InvestorsPage.tsx:80`, `src/app/pages/InvestorsPage.tsx:102`, `src/app/pages/PortfolioPage.tsx:659`, `../TEAM-FACTS.md:45`.

**Improve:** use the approved management attribution consistently in visible text, SEO and structured data. Keep the institution, person, and historical context attached to the figure. Do not imply Avante itself managed or deployed this amount.

### 2. High: current studio holdings and prior team experience blur together

**Verified cross-page inconsistency.** The investor FAQ calls Mahway, WIR, and Bamboo the active studio cohort. Portfolio explicitly places Bamboo under partner co-founded and Mahway's builds under US Building. Its current Cohort 1 is WIR, AlphaJuri, and FutureProofing. Separately, the investor headline says the studio has a 10x exit, while portfolio describes Sigga as an Innova-era investment involving Amanda. This is an attribution ambiguity, not a finding that the exit is false.

Sources: `src/app/pages/InvestorsPage.tsx:58`, `src/app/pages/InvestorsPage.tsx:264`, `src/app/pages/InvestorsPage.tsx:22`, `src/app/pages/PortfolioPage.tsx:105`, `src/app/pages/PortfolioPage.tsx:123`, `src/app/pages/PortfolioPage.tsx:286`, `src/app/pages/PortfolioPage.tsx:829`.

**Improve:** use one taxonomy throughout. Label prior investment results as team experience at the relevant institution. Distinguish current Avante ventures from affiliated and previously built companies, without publishing confidential ownership percentages.

### 3. High: the IRR comparison is attributed but difficult to verify

**Missing accessible source detail, not a disproven benchmark.** The figures name GSSN, which follows brand truth. However, a question about Avante's target returns is answered with industry benchmarks. The footnote lands on generic organizational homepages rather than the particular study. A reader cannot establish sample, vintage, gross/net basis, survivorship treatment, or whether the comparison is like-for-like.

Sources: `src/app/pages/InvestorsPage.tsx:49`, `src/app/pages/InvestorsPage.tsx:147`, `src/app/pages/InvestorsPage.tsx:343`, `src/app/components/Footer.tsx:421`, `src/app/components/Footer.tsx:423`, `../content-engine/knowledge-base/brand-truth.md:30`.

**Improve:** retain the approved figures and GSSN attribution, add the exact verified primary source and relevant methodology, and identify them prominently as model benchmarks rather than Avante realized or target returns. Avoid implying a dependable return from structural advantages alone.

### 4. High: the exhibits prove that websites exist, not venture progress

**Missing website evidence only.** Each exhibit shows a real website and customer proposition, but the homepage does not state current stage, what Avante built, or the next operating milestone. The portfolio's common "Cohort 1" label does not resolve those questions. This does not establish that traction is absent.

Sources: `src/app/components/world/EditorialHome.tsx:58`, `src/app/components/world/EditorialHome.tsx:59`, `src/app/components/world/VentureExhibit.tsx:34`, `src/app/pages/PortfolioPage.tsx:58`, `src/app/pages/PortfolioPage.tsx:71`.

**Improve:** add one concise, dated fact line for each company: customer, present stage, Avante's role, and one approved milestone. Evidence can be a public product demonstration or an anonymized industry/region case. Keep revenue, customers, ownership, and commercial terms private unless specifically approved.

### 5. Medium: the investor CTA loses investor intent

**Verified flow from source.** After promising a structured 45-minute LP conversation, the final button sends the visitor to the homepage's general contact anchor. That section prioritizes newsletter reading and a generic "Partner with us" email. It does not preserve LP context or explain how to request the private materials mentioned earlier.

Sources: `src/app/pages/InvestorsPage.tsx:491`, `src/app/pages/InvestorsPage.tsx:496`, `src/app/components/world/EditorialHome.tsx:74`.

**Improve:** provide a direct "Request an investor conversation" action with an LP-specific subject or inquiry flow and clear next step. Offer an approved overview first, with sensitive materials shared privately after qualification. Do not make visitors find a second generic action.

## Three unanswered diligence questions

1. What is the actual investment exposure being discussed today: studio economics, a specific vehicle, or an annual cohort? Which public description is approved and current?
2. Which current venture milestones can an interested LP inspect through an approved demo or anonymized case, and what did Avante directly contribute?
3. What prior track-record evidence can be attributed to each person and institution in the private diligence package, separate from Avante's own operating history?

## Two elements to preserve

1. The Brazil-centered cinematic identity and optional journey controls. A distinctive introduction is compatible with institutional trust when readers can immediately reach the operating content. Source: `src/app/components/world/WorldTour.tsx:115`, `src/app/components/world/WorldTour.tsx:131`.
2. The separate AlphaJuri and WIR compositions with official marks, distinct brand colors, website previews, and explicit outbound links. They make the portfolio concrete. Add evidence next to them, rather than replacing them with a wall of metrics. Source: `src/app/components/world/VentureExhibit.tsx:30`.

No numerical ratings assigned. No application files changed.
