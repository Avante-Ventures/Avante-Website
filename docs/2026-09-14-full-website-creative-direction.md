# Avante: a full website built from its existing identity

Status: approved for local implementation, September 14, 2026. The homepage and shared navigation now follow this direction, with an added 3D world tour requested by Cristian. See [implementation and validation](2026-09-14-world-to-work-implementation.md). The remaining inner-page editorial reconciliation is documented there.

Visual concept: [Full homepage study](concepts/2026-09-14-avante-homepage-concept.png). This is a generated composition study, not an implemented page. Product interfaces and article choices are illustrative. It shows two selected ventures and two sample portraits to establish the layout, not the total portfolio or complete team. Extra generated slogans and the phrase "Two ventures" are unapproved concept copy, not factual claims to carry into implementation.

## The idea

**Built in Brazil. Built to compound.**

A visitor first encounters the place Avante builds from, then its work, then its people. A cinematic opening gives way to a substantial portfolio and an editorial website that visitors can explore in any order.

The previous implementation placed too much narrative weight on a miniature workstation. It gave an abstract representation of company building more attention than the actual firm. The new direction starts with Avante's existing São Paulo atmosphere, real mark, real people, ventures, and publishing activity.

Working assumption: "the old site" means the existing Avante website at https://avanteventures.com/en. Terminal Industries remains a reference for cinematic composition and continuity of movement. It is not the content or visual-asset source.

## What carries forward

- Exact Avante mark and its existing gradient. Preserve shape and proportions.
- Ink background, warm São Paulo dusk imagery, Funnel Display headlines, Bricolage Grotesque body text, and restrained JetBrains Mono labels.
- The core distinction that Avante co-founds companies and contributes operating work.
- The Brazil / Silicon Valley connection, with clear attribution to people and their experience.
- Real team photography and canonical biographies.
- Existing trilingual routes, article URLs, Library, subscription, and partner/press contact destinations.
- The quiet editorial objective: help visitors understand the firm and inspect its work.

## Homepage, from arrival to close

| Chapter | Visitor question | Composition | Motion and interaction | Destination |
| --- | --- | --- | --- | --- |
| Opening | Who is this and where do they build? | Full-width São Paulo dusk. An uninterrupted city horizon, the exact small Avante lockup, and a large ivory headline: "Built in Brazil. Built to compound." Supporting sentence uses the canonical venture-studio description. | A short forward camera drift through two or three carefully separated photographic layers. One viewport of scroll resolves into the next section. Text and navigation appear immediately. | Explore our ventures, Meet the studio. |
| The studio | What does Avante actually do? | A spacious typographic statement, "We co-found the company." A short explanation beside it describes product, operating work, and company creation. | The six actual stage names form one readable process: Research, Partner, Build, Traction, Revenue, Compound. Selecting a stage reveals its practical work and output. | Existing why-avante and principles pages. |
| Selected ventures | What can I inspect? | Two substantial project features, beginning with AlphaJuri and WIR. Each has its own composition, a concise domain statement, a real or explicitly illustrative product view, and a clear detail link. | As a project enters view, its image expands gently. A brief guided sequence may focus on input, processing, and output. The visitor can skip directly to the detail. | Portfolio, with venture details expanded in place. |
| Two perspectives | Why this team and this geography? | Paired documentary city imagery and editorial text: "Silicon Valley perspective. Brazilian execution." Explain how experience reaches the local operating work. | Restrained image parallax on desktop. Both viewpoints remain available without dragging or a horizontal scroll requirement. | Meet the operators. |
| People | Who does the work? | The complete real team in generous, readable portrait rows. Names and roles below images. Expanded biographies include specifically attributed experience. | Click or keyboard activation opens a profile. Collapsed profiles retain full names and roles. | Canonical biographies and existing professional links. |
| Thinking | How does Avante think? | A magazine-like Library preview: one featured real article, two secondary pieces, strong type, visible topics. Actual article titles replace concept placeholders. | Simple hover and focus states, topic navigation, and a clear reading destination. | Library and existing article routes. |
| Close | How do I stay connected? | A warm, quiet closing composition, the real mark, subscription link, and partner/press contact. | A subtle light transition from the opening dusk. No additional interaction is required to reach contact. | Avante Intelligence and existing contact. |

Homepage target: the first screen explains the firm immediately. A visitor can reach ventures or the team in one action. Motion does not impose a mandatory reading duration.

## The rest of the website

All paths below retain the existing `/:locale` prefix for EN, PT, and ES.

| Surface | Existing route | Proposed content and behavior |
| --- | --- | --- |
| Home | `/` within locale | The visual introduction and routes into work, people, thesis, and writing. |
| Studio / Why Avante | `/why-avante` | A clear, sourced argument for the market and the studio model. Geography, operating contribution, and carefully attributed evidence. Short essays and exhibits carry the page. |
| Ventures | `/portfolio` | An inspectable body of work. Distinguish current ventures, operating-network companies, and team members' prior track record after reconciling the canonical list. Each expanded venture explains the problem, product, Avante's role, and substantiated status. Keep expansions inside this existing route in the first release. |
| People | Homepage `#team` section | Full team portraits and profiles. No new standalone route is required in the first release. |
| Principles | `/principles` | The six-stage process, with plain explanations of the work and decisions at each stage. Interactive exhibits supplement readable HTML. |
| Library | `/library` | Editorial index with topic navigation and a featured article. Reuse the existing content source. Preserve a useful empty state for filters and a direct reset action. |
| Article | `/library/:slug` | Excellent long-form reading: restrained line length, clear headings, source links, related reading, and one subscription invitation. |
| Investors | `/investors` | A sober page for a distinct audience. Explain the structure using verified facts and specifically attributed track record. Avoid carrying cinematic motion into evidence-heavy reading. |

Primary navigation: Studio, Ventures, People, Library. Principles and Investors remain accessible from the relevant sections and footer. Subscribe remains the recurring relationship action.

## Visual and motion rules

- Full-width imagery alternates with calm editorial sections. Project features vary in composition while sharing spacing and typography.
- Main headlines are ivory. Reserve the multicolor gradient for the actual brand mark and selected environmental light.
- Team members use their existing photographs. Product views use approved screens, or are explicitly labeled illustrative when showing a proposed interface.
- The opening and venture features carry the strongest movement. Reading sections use normal document flow.
- Keep camera travel short. Provide direct navigation, native scroll, stable links, and keyboard equivalents for interactive controls.
- On phones, use a considered portrait crop of the city and a shortened image reveal. Venture features stack normally and all essential content remains readable without animation.
- Reduced-motion and unavailable-WebGL paths present the same content with static imagery. No waiting screen or required sound.

## Content and relationship boundaries

- Use the canonical identity: "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America."
- The stage names in this proposal follow Brand Truth verbatim. Homepage chapter names are editorial structure, not a replacement operating model.
- The live portfolio and the internal canonical list currently disagree on FutureProofing's classification. The visual concept uses AlphaJuri and WIR as selected work and makes no new ownership assertion about other companies. Reconcile before final portfolio copy.
- Attribute prior team experience to the relevant people and organizations. The $500M+ figure is under management in Amanda's experience per TEAM-FACTS, not Avante capital deployed.
- Generated concept article titles are layout placeholders. They must not be inserted into the live Library as invented publications.
- Generated portrait renderings are only visual-composition studies. Implementation uses the original supplied photographs directly.

## How to build this direction

1. Review a full-page visual concept covering the opening, ventures, people, Library, and footer. Judge the overall website, not an isolated animation.
2. Implement the complete static homepage using real typography, imagery, copy, routes, and responsive layouts. Its quality must hold with animation disabled.
3. Apply the same system to the existing Studio, Portfolio, Principles, Library, Article, and Investors templates. Preserve article URLs and localized navigation.
4. Add the opening depth treatment and short venture reveals. Use the current React/Vite application. Choose photo-layer depth or a small 3D treatment based on the approved visual result; a single physical object need not carry the story.
5. Verify every route, contact destination, locale, keyboard flow, reduced-motion state, and responsive breakpoint. Test the opening on Safari, Chromium, and a real phone. Measure loading and frame pacing before making performance claims.

Nothing is published as part of this proposal. Existing local experiments remain available until a replacement is actually implemented and reviewed.

## Sources

- Existing homepage: https://avanteventures.com/en
- Existing portfolio: https://avanteventures.com/en/portfolio
- Existing principles: https://avanteventures.com/en/principles
- Routes: `src/app/routes.tsx`
- Brand terminology and operating stages: `../content-engine/knowledge-base/brand-truth.md`
- Biographical and financial attribution: `../TEAM-FACTS.md`
- Brand images: `public/redesign-assets/` and `../brand-assets/avante-background-saopaulo-1920x1080.png`
