# Swarm improvements — implementation and verification

September 14, 2026. Applied to the local Avante website following the design/investor review. The owner explicitly reconfirmed that more than USD 500M has been administered/managed and requested that “Start a Conversation” lead to his email.

**Implemented**

- Both investor conversation actions are real links to `cristian@avanteventures.com`, with a localized investor-specific email subject. Removed the unused contact-modal callback and state. The main navigation and homepage closing now prioritize a business conversation; newsletter access remains available.
- Kept **USD 500M+ under management**, attributed to Amanda Pinheiro’s historical roles at Innova Capital and Unbox Capital. Visible copy, investor metadata and FAQ data now agree. Sigga’s exit is attributed to the team’s prior investment experience at Innova, without inventing a board role for Amanda.
- Distinguished selected Avante ventures (AlphaJuri and WIR), the engineering network (Futureproofing.dev), partner-founded companies and prior team investment experience. Replaced the footer’s contradictory active-company count with named selected work. Removed ambiguous founding-date captions from portfolio cards while preserving stored records and links.
- Added trilingual company notes inside the existing AlphaJuri/WIR disclosures: customer problem, Avante’s product/engineering role and an inspectable public workflow. Homepage captions make that role visible. No revenue, customer count or launch milestone was invented.
- Completed Spanish copy in Investors, InvestorEcosystem, Portfolio and VenturePipeline. Replaced unsupported pipeline launch dates/progress with qualitative research themes. The canonical six English stage names remain unchanged. Language switching now preserves the section anchor and query string.
- Improved mobile reading sizes and team-photo treatment. The floating top button no longer appears below 900px; very narrow team layouts use one column. Portfolio, Library and investor controls share more restrained corner treatments.
- Replaced the mobile menu overlay with a native modal dialog, explicit Tab cycling, scroll locking and opener-focus restoration. Section navigation moves focus to meaningful content; returning to the animated hero focuses its stable container rather than a temporarily hidden heading.
- Deferred initial desktop hero construction until the journey is near the viewport while preserving its reserved height. A lost logo WebGL context keeps the official static fallback visible. Recovery rebuilds the reflection environment before marking the rendered logo ready again.

**Verification**

- `npm run build:vite-only`: passed in 3.48 seconds. No prerender or IndexNow notification was run. The existing large article-chunk warning remains.
- `node --test scripts/world-journey.test.mjs`: 4/4 passed.
- Scoped TypeScript check for the world/UI components and their dependencies: passed.
- Expanded TypeScript check: **failed on 1,694 existing `ArticleSection` data errors in `src/app/data/articles.ts`; zero errors outside that file**. The article data was not modified. This is not a claim of a clean repository-wide typecheck.
- `git diff --check`: passed.
- Native Safari: confirmed both EN/ES investor conversation links have the requested `mailto:` destination; inspected the rendered ivory CTA. No email was sent.
- Native Safari at 390 CSS pixels: confirmed menu initial focus, forward/reverse Tab cycling, Escape returning focus to the opener, and People navigation focusing the section heading with the menu closed and scrolling unlocked.
- Width checks at 320/390 CSS pixels showed no horizontal overflow in the inspected home/venture layouts. The team capture confirms the floating button no longer covers names. These are framed Safari width checks, not physical-phone or cellular performance tests.
- Simulated WebGL loss on AlphaJuri, then resized: the fallback stayed visible with readiness false. Restored WebGL and resized again: readiness returned and the 3D logo rendered correctly.
- Opened `/es/portfolio#venture-alphajuri`: the disclosure opens automatically, focus reaches its summary and the translated case details are visible. Reviewed the Spanish investor page and its historical-management explanation.
- Independent UX/content reviewers and an adversarial verifier checked the changes. Their confirmed findings—hidden hero-heading focus, reflection recovery and an unsupported board-role attribution—were corrected before the final build.

**Benchmark decision remains pending**

The owner was asked whether to use the source-backed historical 53% / 21.3% comparison or remove the numeric comparison. No answer had arrived when this implementation record was written. The existing ~50% / ~19% figures and their unresolved source labels were not silently replaced. This remains a known content limitation, particularly on Why Avante and in the footer sources.

The primary [GSSN white paper, *Disrupting the Venture Landscape* (2020)](https://insightstudios.s3.amazonaws.com/Disrupting-the-Venture-Landscape_GSSN-White-Paper-1.pdf), printed page 9, reports 53% / 21.3%, rather than the exact current pair. The [Cambridge Associates Q4 2025 report](https://www.cambridgeassociates.com/wp-content/uploads/2026/06/2025-Q4-USVC-Benchmark-Book.pdf), printed page 3, reports a 14.86% ten-year US venture-capital horizon return. Those documents do not substantiate the site’s existing shared ten-year framing. Any follow-up must update the visible comparison, metadata, footnotes and canonical brand source consistently; do not mix company-survey outcomes with fund-level returns.

**Scope and evidence**

Canonical references: `../TEAM-FACTS.md`, `../CLAUDE.md`, and `../content-engine/knowledge-base/brand-truth.md`. Case content also uses the sibling AlphaJuri public workflow and WIR public product sources. The owner’s USD 500M+ confirmation agrees with the existing canonical management attribution.

Screenshots and final review notes are archived in `docs/reviews/2026-09-14-improvements/`. Original working logs remain in `/tmp/avante-improvements-2026-09-14/`. The temporary browser QA page was removed before the build. Existing development server reused; no extra server started. No commit, push, deployment or external message.
