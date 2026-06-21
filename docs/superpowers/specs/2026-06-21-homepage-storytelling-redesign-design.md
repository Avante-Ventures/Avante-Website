# Avante Ventures — Homepage Storytelling Redesign — Design Spec

- **Date:** 2026-06-21
- **Status:** Design approved (arc + medium). Blueprint produced by a 14-agent design swarm.
- **GUARDRAIL: LOCAL ONLY.** No `git push`, no `vercel --prod`, no deploy until Cristian explicitly approves. The repo auto-deploys to the live site.
- **Repo:** projects/avante/avante-website (React 18 + Vite 6 SPA, trilingual EN/PT/ES).

## 0. Context & locked decisions

**Problem:** external reviewer feedback — avanteventures.com reads "too AI-ish." Root cause (per narrative audit): it's a credential dump, not a story; uniform gradient/haze; built for conversion CTAs; thin human voice. A separate 34-issue credibility audit found metric contradictions live on the page.

**Strategy:** GENRE SWITCH from "VC landing page" -> "editorial/documentary." Awareness-first (NOT a pitch). Make Avante the protagonist of a story.

**Locked decisions (brainstorm 2026-06-21):**
- Hero medium: CODED in-repo (Three.js / @react-three/fiber + scroll). No produced video.
- Spine / CTA: Read the Library + Subscribe to the monthly memo + ONE quiet partner/press door. No founder/LP pitch CTAs, no contact form.
- Conversation format: scroll-driven documentary exchange (real founder words; never fabricated).
- Mahway + FutureProofing: shown as a connected/allied operator network & shared lineage, NOT Avante portfolio.
- Scope: homepage-first flagship; other pages get the awareness-CTA + credibility-fix pass.
- Fold in the story-critical credibility fixes (metric contradictions, cyan removal, prerender bug).

**The 8-scene arc:** 0 Convergence (coded-3D hero) - 1 Orientation - 2 Conversation (Felipe & Amanda) - 3 What we build (verticals) - 4 The network (Mahway + FutureProofing) - 5 Track record (quiet) - 6 We think in public (Library) - 7 Quiet close (dusk->dawn).

---

# Avante Ventures — Homepage Redesign Blueprint (build-ready)

**Genre:** documentary published by named operators. Loud once (Scene 0), quiet throughout, specific everywhere, asking only to be read. Local-only until Cristian says ship.

This blueprint resolves all conflicts across the eight scene specs, the benchmark, the motion system, the 3D spec, the brand gate, and the adversarial critic. Where the critic's highest-leverage upgrades change a scene's *instrument* (Scenes 3, 4, 5, 6, 7), the upgrade is adopted as canonical — because the single biggest threat to the Awwwards bar is **instrument repetition**, not perf. The defensive craft is kept; it now serves the differentiated moment instead of being the design.

---

## PART 1 — DESIGN SYSTEM (tokens)

All tokens already exist in `src/styles/theme.css` unless marked **NEW**. Verified present: `--avt-grad`, `--avt-grad-line`, `--avt-ink`, `--avt-ink-2 #0a0c16`, `--avt-ink-3 #0f1124`, `--avt-hair #171a2a`, `--avt-hair-2 #252a40`, `--avt-meta #5d6486`, `--avt-muted #8a91b0`, `--avt-txt #eef0f7`, the three font tokens.

### 1.1 Color
- **Ink ground:** `--avt-ink #06070d`. Surfaces: `--avt-ink-2 #0a0c16`, hover fill `--avt-ink-3 #0f1124`.
- **Signature gradient (RATIONED, used as light/punctuation, never as a fill behind text):** `--avt-grad = linear-gradient(118deg, #f4a93a 0%, #ec5f72 38%, #a8429b 68%, #3a2f8f 100%)`; hairline form `--avt-grad-line` (transparent→stops→transparent).
- **Per-venture hue slices (2-stop cuts of the master gradient, no foreign color):** Alphajuri `#3a2f8f→#a8429b`, WIR `#ec5f72→#f4a93a`, BR Auction `#a8429b→#3a2f8f`.
- **Text:** primary `--avt-txt #eef0f7`; secondary `rgba(238,240,247,0.78)`; body `rgba(238,240,247,0.82)` / `#cdd2ee`; muted `--avt-muted #8a91b0`; mono meta `--avt-meta #5d6486` (≥12px, decorative, always paired with high-contrast text).
- **Accents:** gold `#f4a93a`, coral `#ec5f72`, mauve `#a8429b`, indigo `#3a2f8f`.
- **BRAND GATE — ZERO CYAN/TEAL.** Definition-of-done for Scene 4: **delete** `NetworkGlobe.tsx` (real `#1FE4C9` ×7+, verified) and **remove** the dead `--color-avante-accent-teal` / `--color-avante-accent-magenta` tokens at `theme.css:236-237`. Shader/material colors read from `--avt-grad` stops only; flag any `#00…` blue-green stop in review. The Scene-0 ignition flash is amber-biased warm-white, never blue-white.
- **Greyscale test (hard gate):** any non-hero section screenshotted in greyscale must still look composed by typography and layout, not by glow. Glowing-card AND glowing-constellation treatments both FAIL this test — see Scene 3/4 instrument changes.

### 1.2 Type (all three brand faces)
- **Funnel Display** (`--avt-font-display`): headlines, venture wordmarks, masthead titles, the one big line. At least one moment ≥ 88px desktop.
- **Bricolage Grotesque** (`--avt-font-body`): editorial prose, sign-off letter, wedge lines, standfirsts.
- **JetBrains Mono** (`--avt-font-mono`): kickers, section numbers, dates, coordinates, captions, nameplates, signals. The "publication nameplate" voice.
- Hierarchy jump is the art direction: a clamp(40–88px+) display line against ~12–15px mono caption.

### 1.3 Spacing & layout
- Page max-width `1200px` (front-page scenes may use `1440px`); side padding `--avt-page-pad-x`.
- Section vertical rhythm: `clamp(96px, 13vh, 140px)` top/bottom; editorial scenes get generous air (56–72px between blocks).
- 12-col editorial grid; **asymmetric splits only** (46/54, 7/5, 8/4) — never 6/6, never uniform 3-up card grids (the #1 AI tell). The one earned grid is Scene 6's index.
- `min-height: 100svh` (not vh) on full-bleed sections to dodge iOS URL-bar jump.

### 1.4 Motion tokens **NEW** (add to `theme.css` + mirror in `src/app/motion/tokens.ts`)
- **Easing:** `--avt-ease-entrance: cubic-bezier(0.16,1,0.3,1)` (house curve; promotes existing SectionMasthead/AvtSplash easing), `--avt-ease-exit: cubic-bezier(0.7,0,0.84,0)`, `--avt-ease-standard: cubic-bezier(0.4,0,0.2,1)`, `--avt-ease-linear: linear` (scroll-linked only — never double-ease a scroll value).
- **Duration:** `--avt-dur-micro 160ms`, `--avt-dur-short 320ms`, `--avt-dur-base 640ms`, `--avt-dur-long 900ms`, `--avt-dur-epic 1400ms` (hard ceiling).
- **Stagger:** `--avt-stagger-tight 60ms`, `--avt-stagger-loose 120ms`. Max 5 staggered children before collapsing to a group fade.
- **Banned:** `ease`/`ease-in-out` keywords on decorative motion; spring overshoot/bounce on text; any `repeat: Infinity`; animating `background`, `filter`, `box-shadow`, `width/height/top/left`, `color`.

---

## PART 2 — SCENE-BY-SCENE FINAL ART DIRECTION

### Scene 0 — Convergence (hero, coded 3D)
**Layout:** full-bleed `100svh`, single lazy R3F `<Canvas>` pinned `inset-0 z-0` over `#06070d`; flat DOM overlay above (`z-10`). Focal point ~52%w/46%h desktop (Brazil SE, rule-of-thirds), ~50%/38% under 900px. Overlay safe lower-left column (max 620px): corner `AvanteLockup size="sm"`, mono eyebrow, the `<h1>`, one `--avt-grad-line` hairline, a quiet scroll cue. No button, no pill, no CTA.

**Motion (poster-first):** Layer A is the **static poster = the real LCP** (coded SVG/CSS: ink field, faint dotted SP coastline path, resolved gradient "A", ~12 static SVG stream paths converging at low opacity). Layer B is the WebGL convergence, cross-fading in over A only on capable devices. Beats: streams arrive 0–2.5s → collapse onto SP point + amber-biased bloom/flare 2.5–4s → particles resolve into the "A" glyph 4–5.5s, hand off to crisp DOM `AvanteLockup` → idle freeze (high tier keeps a near-subliminal shimmer; low tier stops rendering). Scroll-out: opacity 1→0, y 0→-8vh, scale 1→0.96 mapped to first viewport.

**CRITIC UPGRADE (adopt):** make the streams *legible as the world's AI*, not abstract light. Tag the major incoming streams mid-flight (~1.2s) with faint mono labels of real AI-building places — **"SAN FRANCISCO", "SHENZHEN", "LONDON", "BANGALORE", "TEL AVIV"** — fading as they bend toward São Paulo, the one stream that *arrives* and stays. Render these labels as **static SVG text in the poster too**, so the thesis ("the world's AI is built everywhere, it lands here") survives for the ~40% who only ever see the poster (mobile/reduced-motion/crawler).

**3D (the only WebGL on the page):**
- One `THREE.Points` + raw `ShaderMaterial`, additive blend, `depthWrite/depthTest:false`, soft sprite via `gl_PointCoord` falloff (no texture). Per-particle attrs `aStart/aControl/aTarget/aSeed/aStream`; single `uProgress` uniform drives a deterministic bezier→cluster→glyph interpolation. ~6–8k pts high / ~1500 low. One draw call.
- Gradient sampled in fragment shader from the four `--avt-grad` stops (comment links back to theme.css). **No cyan.**
- Glyph target positions = **build-time baked** `markPoints.json` from `scripts/sample-mark-points.mjs` (sample `avante-A.png` alpha). No runtime PNG decode.
- `<Canvas dpr={[1, high?2:1.5]} frameloop="demand" gl={{antialias:false, alpha:true, powerPreference:'high-performance', depth:false, stencil:false}}>`. Drive frames via `invalidate()`; **freeze after resolve**; pause via IntersectionObserver off-screen. Dispose geometry/material on unmount; handle `webglcontextlost` → fall back to poster. No postprocessing in v1 (bloom faked by a DOM `filter: blur()` glow behind the mark during the flare).

**Copy (documentary title card, no CTA, no "AI" narration):**
- Eyebrow (mono): `SÃO PAULO · 23°33′S 46°38′W`
- `<h1>` DRAFT (place-first, recommended): "The world's intelligence is landing in São Paulo." Scroll cue: "Keep going".
- «REAL WORDS NEEDED: confirm Felipe/Amanda endorse this exact framing of the cold open, or supply their own one-line thesis.» Zero numbers in Scene 0 by design.

**Fallback/perf:** poster is server-truth and the LCP. WebGL gated (all must pass): `prefers-reduced-motion: no-preference` AND `min-width:768px` AND WebGL2 ctx ok AND `hardwareConcurrency≥4` AND `deviceMemory≥4` (where available) AND NOT `navigator.webdriver`. Runtime FPS escape hatch: median <45fps over 1.5s drops high→low / low→freeze. `aria-hidden` canvas; real `<h1>` in DOM (18:1 contrast). Amber focus ring, never cyan.

---

### Scene 1 — Orientation
**Layout:** full-bleed `100svh`, flat `--avt-ink` (NO gradient fill — deliberate contrast to Scene 0). 12-col grid, max 1200px. Top-left mono kicker `01 — ORIENTATION` with 24px gradient tick. Statement block cols 1–9, first baseline ~46% viewport height, Funnel Display `clamp(28px,3.4vw,46px)` lineHeight 1.18, color `rgba(238,240,247,0.78)`, 2–3 emphasis nouns in `.avt-grad`. Bottom strip: `<AvtCord width="38%">` left + the two-place clock row right (reuse `ClockRow`).

**CRITIC UPGRADE (adopt):** make the clocks state the *operating truth*, not logo-soup geography. The orientation line names the operating fact the clocks prove — two time zones, one company. This differentiates Scene 1's instrument from Scenes 5/7 (which have no clocks).

**Motion:** word-level stagger (split on spaces, not chars), opacity+y14px+blur4px→0, `--avt-ease-entrance`, stagger 45ms, settles ~1.5s. Kicker tick scaleX 0→1 from left. `<AvtCord>` draws 38% via its existing transition. Gentle scroll parallax (±24px, opacity 0.55→1→0.85). Native scroll only, no pin.

**Copy (DRAFT, EN; PT/ES in useLanguage.tsx under `scene1.*`):**
- "Avante is an operator-led venture builder. We start companies and back founders — from **São Paulo** and **San Francisco**, five hours apart, one company." (bold = `.avt-grad` spans; clocks render the live HH:MM gap beneath SP/SF labels.)
- «REAL WORDS NEEDED: Felipe/Amanda's own one-line definition of what Avante is, and the literal SP/SF setup (studio? office? headcount where?) — do not ship the geography as fact until confirmed.»

**Fallback/perf:** zero WebGL. `useReducedMotion()` → full statement at opacity 1, tick at scaleX 1, cord at final, clocks static. `aria-labelledby` + visually-hidden `<h2>`. Live clocks `aria-hidden`. Initial render = settled state (prerender parity).

---

### Scene 2 — The Conversation (Felipe & Amanda)
**Layout:** desktop sticky-pinned stage (`position:sticky`, ~260vh section). Grid `[0.42fr | 1fr | 0.42fr]`: Felipe portrait (left) | center transcript channel (max 560px) | Amanda portrait (right). Portraits = existing 800×800 webp cropped to tall `aspect-ratio:3/4` interview frames in 1px hairline frames, mono nameplates beneath. Thin vertical center seam (`--avt-grad-line` @18%). Mono timecode top-left `02 — THE CONVERSATION`, exchange counter top-right. Tablet: portraits stack as top band. **Mobile: NO pin** — vertical chat-transcript, small 64×64 portraits, alternating left/right indent.

**CRITIC UPGRADE (adopt) + GATING DEPENDENCY:** this is the human heart and it is **100% placeholder today**. The scene is **unbuildable until real founder words exist** — design follows the words, never the reverse. Treat it as *captured footage*: real transcript with **timecodes and disfluency** (`[00:04] Felipe: …`, an em-dash trail-off, one interruption where Amanda's line overlaps Felipe's for a beat). The brittle 260vh apparatus must NOT be built around generic drafts that would anchor the founders toward generic answers. **Flag to Cristian: a 30-min recorded conversation with Felipe & Amanda is the top project dependency** (it also feeds Scenes 3/4/5/7 signals).

**Motion:** `useScroll({target, offset:['start start','end end']})` → discrete active-exchange index + intra phase. Per exchange (~85vh): speaking line rises (y16→0, opacity 0→1), speaking portrait `saturate(.55) brightness(.7) opacity .45 → 1` while listening portrait eases opposite; seam gradient leans toward active speaker; outgoing line settles to 0.28 (transcript accumulates). Motion vocab: opacity, ≤16px translate, filter brightness/saturate, one background-position. Nothing rotates/scales/loops.

**Founder accents (verified warm, no cyan):** Felipe `#f4a93a` (gold), Amanda `#a8429b` (mauve) — as a 2px under-line beneath the speaking nameplate only, never a card glow.

**Copy:** three short exchanges (why-a-builder → why-Brazil → what-"partner"-means), spoken, specific, with one un-roundable detail. Nameplates render as fact: **FELIPE MORAES / Bamboo DCM** (DROP "WIR board" — unverified per brand gate); **AMANDA PINHEIRO / Innova · Unbox** (surname verified). Every load-bearing line is a marked «REAL WORDS NEEDED» placeholder until the recording lands. No fabricated quotes. PT/ES via `scene2.*`, run through `/humanize`.

**Fallback/perf:** reduced-motion → static two-column printed-interview, full opacity, no dimming. Mobile/`hardwareConcurrency≤4` → native vertical scroll, no `useScroll`, optional grain disabled. Semantic `<blockquote>`+`<cite>`. Portraits get width/height + `loading="lazy"` + `decoding="async"`. Prerender captures exchange 1 live + 2–3 at 0.28 + portraits present (all lines in DOM). No per-frame setState — `useTransform`→motion values.

---

### Scene 3 — What we build (verticals)
**INSTRUMENT CHANGE (adopt critic — kill the constellation).** A glowing node-and-filament constellation is the *other* universal AI/VC cliché and FAILS the greyscale test exactly like glowing cards; "arc echoes Brazil's coastline" is designer-private meaning no viewer decodes. **Replace with a documentary exhibit:** for each venture, show the transformation it performs as a literal **before→after of a real artifact** — a scanned, paper-bound Brazilian court docket / insurance submission / fragmented auction notice (messy, stamped, unstructured) resolving into a clean structured data row. This *shows* the wedge instead of asserting it, passes greyscale (it's typography + document structure), is un-generatable (needs real domain artifacts), and makes "same shape, three problems" coherent.

**Layout:** reuse `SectionMasthead` (screenLabel "§ III — what we build", screenNum "03 / 08", title "Same shape. <span class='avt-grad'>Three problems.</span>"). Desktop sticky diptych 46/54: LEFT sticky = the artifact exhibit for the active venture (the before→after, rendered as coded SVG/HTML document mock with a structured-row resolve); RIGHT scrolls three ledger entries (~85vh each), each: mono meta row ("01 / 03 — JUDICIAL"), venture wordmark Funnel Display `clamp(40px,5vw,72px)` (Alphajuri honors Greek-α: "αlphajuri", α in indigo→mauve `.avt-grad`), one-line "what it is", 2 Bricolage wedge lines, ONE hairline-topped signal row, a text link (not a button). Slim vertical progress spine. Mobile: linear stack, each entry leads with a small inline artifact glyph.

**Motion:** house easing, 700–1000ms, no bounce. Per-entry IO stagger (meta→wordmark→what-it-is→wedge→signal→link). Scroll progress → activeIndex drives: which artifact exhibit is shown (cross-dissolve, the docket→data resolve animating via `stroke-dashoffset`/opacity), progress-spine fill. Text stays crisp/still; only the LEFT exhibit animates. Hover previews early then re-syncs. Transition into Scene 4: the structured rows briefly extend a thread off the right edge ("none of these were built alone").

**Copy (DRAFT, /humanize):**
- Masthead standfirst: "Every company we build is a copilot that turns a closed, paper-bound market into something you can query. Here's where the work actually is."
- αlphajuri (JUDICIAL): "A copilot for Brazilian litigators. It reads the case files, finds the claims worth buying, and prices them. The lawyers get a faster tool; we get a map of where the money is owed." SIGNAL — «REAL WORDS NEEDED: one true current signal (N firms / live in [court/state] / design-partner status). Do not publish a number until Felipe/Amanda confirm.»
- WIR (INSURANCE): "The AI layer for insurers and brokers. A submission used to sit in an underwriter's inbox for days — WIR reads it, scores the risk against the insurer's own appetite, and prices it, with a full audit trail. It sits on top of the core systems; nothing to rip out." SIGNAL — «REAL WORDS NEEDED: gate the "built with Mahway / founded 2025" claim — sourced outside this repo. Keep framing if verified in company-facts; else mark.»
- BR Auction Intel (REAL-ESTATE AUCTIONS): "An edge in Brazil's judicial property auctions. Thousands of foreclosed properties go to auction across fragmented court sites; we scrape every notice, enrich it, and score the ones worth bidding on. The data is the product; the good deals are the bonus." SIGNAL — «REAL WORDS NEEDED: e.g. "[N] auctions tracked across [N] states" — confirm live coverage.»
- Connective close: "None of these were built alone."

**Fallback/perf:** SVG/HTML-first (prerender-meaningful); no R3F here (the artifact exhibits are coded SVG/CSS, cheaper and more legible than 3D). Reduced-motion → exhibits show resolved state instantly. `<ol>/<li>` semantics, exhibit `aria-hidden`, real `<a>` links to /portfolio. CLS≈0 via reserved aspect-ratio boxes.

---

### Scene 4 — The network (allied, not owned)
**INSTRUMENT CHANGE (adopt critic — demote scene to band, drop the second diagram).** A second node-and-filament diagram makes Scenes 3+4 read as the same constellation twice (the cardinal benchmark sin); solid-vs-dashed is not a legible difference; the card↔node hover is a 2017 pattern invisible on touch. The "we don't build alone" point is one paragraph — give it a **band, not 140vh**, and change instrument to **shared people, shown like film end-credits**.

**Layout:** a tight editorial credits-style row. Left-aligned mono eyebrow "04 — THE NETWORK". Funnel Display line "We don't build alone." Then a **named-humans lineage block** — each ally as an `<article>` with the human link: name + the cross-org line ("[Name] — Mahway, FutureProofing"), the way credits show who worked on what. Mahway = SF AI engineering/agents; FutureProofing = distributed AI-talent + content engine. **Allies render as TYPESET wordmarks** (Funnel Display) — there are no Mahway/FP logo SVGs in the repo (verified). 1px `rgba(238,240,247,.10)` borders, NO gradient fills (distinguishes allies from owned ventures). Mobile stacks full-width, larger Mahway block first.

**Motion:** entrance reveal only (eyebrow→headline→credits rows, loose stagger). No second canvas, no parallax diagram. Hover warms border to 1px amber @18% + 6px lift (pointer:fine only); touch gets the static credits.

**Copy:** Headline "We don't build alone." Sub: "The operators who built these companies are the same people standing behind ours." Mahway: "An AI engineering and agents shop in San Francisco. When a venture needs hands that have shipped agents before, they come from here." FutureProofing: "An AI-talent and content operation. It finds the engineers and writes in public, so the ecosystem keeps learning out loud."
- «REAL WORDS NEEDED: the actual shared founder/operator relationships across Avante/Mahway/FutureProofing — one true sentence per ally (who came from where).»
- «REAL WORDS NEEDED: one verifiable signal per ally (named shared client / N agents in production / N engineers placed) — never fabricate.»
- PT/ES: "04 — A REDE" / "04 — LA RED"; "Não construímos sozinhos." / "No construimos solos."

**DEFINITION OF DONE (brand gate):** delete `NetworkGlobe.tsx` and the dead `--color-avante-accent-teal`/`--color-avante-accent-magenta` tokens (theme.css:236-237) as part of this scene, not a deferred ticket. (Tracking chip task_871206a2 exists.)

**Fallback/perf:** zero WebGL (credits row is plain DOM). Reduced-motion → opacity-only reveal. `<article>` + `<h3>` semantics, real `<a rel="noopener">`. 3-second pass test ("partners not portfolio?") met instantly because these are *people shown like credits*. Different instrument than Scene 3 — repetition fixed.

---

### Scene 5 — Track record (quiet ledger)
**Layout:** full-bleed `--avt-ink`, left-margin SPINE (not a grid). Gold-dot mono eyebrow. 1px `--avt-grad-line` @~30% vertical spine. Four LEDGER ROWS hang off the spine, 56–72px gaps, each: mono date/era tick — big number (Funnel Display `clamp(40px,5vw,72px)`, `tabular-nums`) — one Bricolage context line. Numbers float on ink (not boxed), right-aligned to a shared baseline column like a real ledger. Mobile: number-on-top, context below, date as mono kicker.

**INSTRUMENT/UPGRADE CHANGES (adopt critic):**
1. **KILL the count-up animation.** Count-up is the stat-wall's twin tell (benchmark anti-pattern). A hand-set ledger does not animate its figures — numbers arrive by the same fade-up as every other line. More editorial, more confident, and removes a perf trap.
2. **Reorganize around CHRONOLOGY — make the dates the spine.** Lead each row with the year as the dominant element; the ledger reads as a *timeline of a career* (biography, not a flex), and the temporal axis distinguishes it visually from Scenes 1/7.
3. **Color restraint (verified fix):** current ProofSection uses 4 candy hexes (`#42468C/#98509A/#F18B46/#F9B437`). Numbers are off-white `#eef0f7`; ONLY the cumulative `$500MM+` line gets the `.avt-grad` background-clip — one earned gradient on the line that sums the story.

**Copy (reconciled facts — never alter the figures):**
- Eyebrow: "What our team built — and exited"
- 2014 / iFood: "Backed iFood before it was iFood. Pre-unicorn, when the bet still looked early." «REAL WORDS NEEDED: confirm exact involvement wording — "backed / advised / invested alongside" — keep the repo's existing hedge ("early investment by our team, pre-unicorn"); do not overstate.»
- 2019 / Accera: "Accera returned 4x. Innova Capital era." (verbatim-safe)
- 2021 / Sigga: "Sigga Technologies, 10x at exit. Amanda sat on the board." (verbatim-safe)
- to date / cumulative: "$500MM+ deployed across 20+ companies — by the people now building Avante." (verbatim-safe; the one gradient number)
- Closing (italic, muted): «REAL WORDS NEEDED: a one-line sign-off in Felipe or Amanda's voice framing past wins as license to build, not a flex — humble, forward-looking.»

**Fallback/perf:** no WebGL. Only drawn element = 1 SVG spine + 4 ticks (<1KB). No count-up → final numbers in prerendered HTML verbatim (great for SEO/AEO). Render rows as `<dl>` (date+number `<dt>`, context `<dd>`) with `aria-label` spelling out each number ("ten times return at exit"). Reduced-motion → static. `tabular-nums` reserves width → no CLS.

---

### Scene 6 — We think in public (the Library, PRIMARY action)
**UPGRADE (adopt critic — right-size to content + kill the vanity metric).** Verified: only **6 published / 3 featured** articles. A fake 12-item newspaper front reads as "a blog pretending to be a newspaper." And "#1 on DuckDuckGo" (≈2% market share, long-tail term) is a vanity metric that *undermines* the no-hype thesis. So:
1. **DROP the DuckDuckGo "#1" stat entirely.** If a credible signal is wanted, use consistency-of-output if true: "18 months, published every month" beats a search-engine rank. «REAL WORDS NEEDED: confirm the true publishing cadence/longevity; do not invent pageview/subscriber numbers.»
2. **Right-size the metaphor:** make it a single confident "current issue" — ONE big lead piece with real editorial weight (its actual opening paragraph set large), built to showcase the **hover-pull-the-lede** interaction (the genuinely novel, conversion-smart move); the other 5 as a quiet dated index below. Don't borrow newsprint chrome the content can't fill.

**Layout:** reuse `SectionMasthead` (screenLabel "§ VI — the library", screenNum "06 / 08", title "We think in public."). Mono dateline rule beneath: left "AVANTE LIBRARY" (inline mark-only `AvanteLockup`), a `--avt-grad-line` hairline center, right a **live-from-data** count `{published} published · updated monthly` (computed from `articles.filter(isPublished)`, never hardcoded). LEAD: the featured published piece treated as a lead story (mono category kicker in category accent, Funnel Display headline `clamp(30px,3.4vw,52px)`, the REAL description as standfirst, mono byline `TYPE · MIN · MONTH`, 3px `.avt-grad` left border). INDEX: the remaining published pieces as a quiet dated list (hairline-ruled), category kicker + headline + readTime. Featured-but-unpublished render dimmed "In the works —" with no link (honest). Closing door: one left-aligned text link "Read the room. →" → /:locale/library (underline-on-hover, NO button).

**Motion:** the strongest reveal beat on the page (this is the primary CTA). One IO (`rootMargin '0px 0px -10% 0px'`, unobserve after). Dateline `--avt-grad-line` draws via scaleX(0→1) from left (the "press laying a column rule" signature). Lead children stagger up-fade; left border wipes top→bottom. **Hover = pull-the-lede:** each item reserves a clipped row (`max-height:0`) holding the article's real first sentence; on hover/`:focus-within` it eases open + the category dot grows 4→6px + border tints `${accent}40`. Door arrow translates +6px with gradient underline wipe. No parallax, no canvas.

**Copy:** title "We think in public." (PT "Pensamos em público." / ES "Pensamos en público."). Dateline standfirst (computed): "Everything we've figured out about building here — written down, dated, and open. {N} pieces, {published} published, more every month." Door: "Read the room. →" sub "The full library — research, playbooks, case studies, and what Brazil actually looks like." All titles/types/readtimes/dates/descriptions render verbatim from `articles.ts`.
- «REAL WORDS NEEDED: optional one-line editor's note under the lead, in Felipe/Amanda's voice, on why they publish the playbook instead of guarding it. Pull from a real quote.»

**Fallback/perf:** zero JS for first paint — fully prerendered (all headlines/standfirsts/count/lead in static HTML; LCP candidate = lead headline). Hover-preview content is in the DOM (clipped via max-height, not display:none) so it's SR-readable + indexable. Category word always accompanies the color dot (color-blind safe). `<section aria-labelledby>`, lead `<article>`, index `<ul>` of `<article>`, reading aside `<aside>`. Reduced-motion → instant revealed, no rule-draw, hover-preview shows instantly. No images → no CLS.

---

### Scene 7 — Quiet close (dusk→dawn)
**UPGRADE (adopt critic — earn the dawn, drop the fake signature).**
1. **Tie the dawn to page scroll.** Arriving at Scene 7 IS the sunrise: the persistent `AtmosphereField` (the single scroll-linked gradient backdrop) has warmed from dusk→dawn over the whole scroll, and the final frame is the brightest the page ever gets. Dawn becomes the *payoff of having read the whole thing*, not a static recolor of the one reused skyline JPG (verified: only one skyline asset — a tinted recolor alone may not read as a different time of day).
2. **Drop the skeuomorphic "pen-stroke signature rule."** Either use a **real photographed signature** (flag as an asset to capture from Felipe & Amanda) or let the plain typeset names sit — more confident than animated calligraphy.

**Layout:** single editorial column, max 1080px, centered, generous top air. Three acts separated by `avt-cord` hairlines. **ACT 1 SIGN-OFF (letter):** left-aligned mono kicker "§ VII — sign-off", Bricolage body `clamp(22px,2.6vw,34px)` lineHeight 1.5 (≤60ch), then a signature block — name+role in mono. Right of signature on desktop: live SP time via `ClockRow` ("writing from São Paulo"). **ACT 2 MEMO (subscribe — the PRIMARY affordance of this scene):** hairline band (`--avt-ink-2`, border-radius 0), Funnel Display line + `library.cta.note` sub. Preferred zero-backend control: a quiet pill "Read the memo →" opening **avanteventures.substack.com** (canonical — never @avante3) in a new tab; fills to `--avt-ink-3` on hover, gradient underline on the arrow. **ACT 3 DAWN FRAME:** reuse `CinematicFrame` (21/9 desktop, 4/5 mobile) with the dawn grade (see below); captionLeft "frame 007 — são paulo at dawn", captionRight live date + "06:14 BRT"; slotLeft the human full-stop; slotRight the ONE quiet partner/press door as mono mailto. Then the existing `Footer` is the literal last line. Partner/press appears exactly twice (frame slot + footer), both whisper-level.

**Motion:** calm, sequential. Mono kicker fade+rise; sign-off LINE-BY-LINE reveal (stagger 120ms); names fade in. Memo band fades in, one-time gradient-underline sweep on the arrow (fires once, never loops). Frame: 1200ms opacity+scale(1.012→1) settle; the dawn-wash is the *end-state of the page-level scroll transform*, not a per-scene keyframe. No parallax.

**Dawn grade (CSS only, no shader, no new asset):** three layered backgrounds over `photo-skyline.jpg` — (a) pre-dawn indigo wash `linear-gradient(180deg, rgba(58,47,143,.55) 0%, rgba(6,7,13,.2) 55%, rgba(6,7,13,.8) 100%)`; (b) warm horizon band low `radial-gradient(120% 60% at 50% 88%, rgba(244,169,58,.45), rgba(236,95,114,.18) 40%, transparent 70%)`; (c) the frame's existing inset vignette. Cools toward indigo `#3a2f8f`, **never teal**.

**Copy:**
- ACT 1 sign-off «REAL WORDS NEEDED — Felipe/Amanda, 1–2 sentences closing the Scene-2 conversation.» DRAFT EN: "We didn't start Avante to place bets. We started it to build the companies we wished existed here — and to stay in the room while they grow up." Signature: **"Felipe Moraes · Amanda Pinheiro"** / "co-founders · São Paulo" (names CORRECTED + verified — A1 blocker fixed).
- ACT 2 (ship-ready, reuses `library.cta`): "We think in public. Once a month, we mail what we learned." Note verbatim: "One email per month. No spam. Unsubscribe anytime." Action: "Read the memo →".
- ACT 3 slotLeft: "— built for decades, from São Paulo"; slotRight: "partners & press → cristian@avanteventures.com".
- PT/ES mirror with the same restraint, no padding.

**Fallback/perf:** no WebGL, no parallax, no per-frame JS. Reduced-motion → final composition static, dawn grade at end-state immediately, `.avt-cord-fill { transition:none }` (existing). `<blockquote>`+`<cite>`, real `<a>` memo link with amber focus ring, frame `role="img"` aria-label "São Paulo skyline at dawn", mailto with discernible text. Skyline JPG already loaded; below fold + `loading="lazy"`. IO+class-flip pattern observes on mount → prerender captures complete close.

---

## PART 3 — GLOBAL MOTION & CWV BUDGET

**Stack (no Lenis, no smooth-scroll hijack):** native scroll + existing global `scroll-behavior:smooth`. Three layers: (1) **Reveal** — one IO+CSS-transition primitive `<Reveal>` (threshold 0.05, rootMargin `0px 0px -12% 0px`, triggerOnce); (2) **Scroll-linked** — `motion` `useScroll`/`useTransform` (+ `useSpring` only where listed: Scene 2 line cross-fade), always with explicit `target`+`offset`, gated by `useInView`, **off on touch by default**; (3) **Spectacle** — Scene 0 R3F only, lazy + sandboxed. Wrap Home tree in `<LazyMotion features={domAnimation} strict>`, use `m.*` not `motion.*`.

**The persistent atmosphere (replaces the 4 banned infinite loops in `AvanteHeroBackground.tsx`):** one fixed full-viewport dusk gradient field; its ONLY motion is a single scroll-linked transform shifting dusk→dawn across page scrollYProgress (transform/opacity only, no animated `background`/`filter`). Idle = 0% CPU. This is the dusk→dawn through-line that pays off in Scene 7. Cross-scene rule: dissolves over the continuous atmosphere, never sliding carousels.

**HARD mobile budget (validate on PageSpeed Insights, NOT synthetic M3 — synthetic lies 4–6×):** LCP ≤2.5s, TBT ≤200ms, INP ≤200ms, CLS ≤0.05, **0 KB three.js in the critical path**, total initial JS ≤180KB gz (excl. lazy r3f chunk), no long task >50ms during scroll.

**Enforceable rules:** animate only transform/opacity; no `repeat:Infinity`; LCP = static text/poster never gated on JS/fonts/WebGL; three.js lazy + capability-gated + DPR-clamped + visibility-paused + mobile-off; reveals = IO-once composited transitions (no scroll math in render, no per-frame setState); count-ups removed (Scene 5); `content-visibility:auto` + `contain-intrinsic-size` on every below-fold `<section>`; reserve final box for animated elements (CLS from motion = 0); `will-change` JIT applied + removed on transitionend; **prerender parity is a hard gate** — every animated component renders its RESOLVED state when IO/viewport is unknown (the current `useScrollReveal` defaulting `isVisible=false` is the bug — `<Reveal>` must default visible or read `navigator.webdriver`/below-fold to decide).

**Reduced-motion contract:** global CSS `!important` block covers CSS motion; JS motion must self-gate via one `useAvtReducedMotion()` hook (wraps `useReducedMotion` + live matchMedia). Reduced = the designed static state = the prerendered state = the no-JS state (one invariant).

---

## PART 4 — ASSET LIST (all coded; zero AI-gen, zero ImageMagick, zero video)

| Asset | Source | Notes |
|---|---|---|
| Avante "A" mark | EXISTS `public/redesign-assets/avante-A.png` via `AvanteLockup` | DOM resolve + poster; not GPU-decoded |
| Glyph point cloud `markPoints.json` | BUILD ONCE `scripts/sample-mark-points.mjs` | ~2500 normalized pts, committed |
| SP coastline path | CODE — one simplified inline SVG `<path>` | poster + collapse anchor; no map bitmaps |
| Stream origin labels (SF/Shenzhen/London/Bangalore/Tel Aviv) | CODE — DOM/SVG mono text | the legibility upgrade; static in poster |
| Brand gradient stops | CODE — 4 `vec3` mirrored from `--avt-grad` | only color source; no cyan |
| Soft particle sprite | CODE — `gl_PointCoord` radial falloff | no texture file |
| Scene-3 artifact exhibits (docket→data) | CODE — SVG/HTML document mocks | before→after resolve; coded, prerender-safe |
| Skyline (dusk + dawn-graded) | EXISTS `photo-skyline.jpg` + CSS grade | dawn = CSS layers, no new image |
| Portraits | EXISTS ~31KB webp | Scene 2 interview frames |
| Fonts | EXIST (Funnel/Bricolage/JetBrains) | DOM only, never in WebGL |
| Real founder signature (optional) | FLAG — capture from Felipe/Amanda | replaces fake pen-stroke (Scene 7) |

Net new binary assets: **zero**. New code/data: one Node sampler + one JSON + the coded artifact exhibits.

---

## PART 5 — COMPONENT ARCHITECTURE (files to add/modify)

**Add — motion core:**
- `src/app/motion/tokens.ts` (EASE/DUR/STAGGER, mirror of CSS vars)
- `src/app/motion/useAvtReducedMotion.ts`, `useDeviceTier.ts` (`'high'|'standard'|'reduced'`), `useHeroTier.ts` (`'poster'|'low'|'high'`)
- `src/app/motion/Reveal.tsx` (THE reveal primitive — **defaults to visible / webdriver-aware** to fix prerender blanking), `ScrollScene.tsx` (gated useScroll), `AtmosphereField.tsx` (dusk→dawn backdrop)

**Add — hero:**
- `src/app/components/heroes/HeroConvergence.tsx` (wrapper: poster + lazy canvas + DOM type, owns `useHeroTier`)
- `src/app/components/heroes/ConvergencePoster.tsx` (Layer A — the prerendered LCP, includes the static stream labels)
- `src/app/components/heroes/ConvergenceCanvas.tsx` (ONLY module importing three/r3f/drei; React.lazy)
- `src/app/components/heroes/StreamField.tsx` + `convergence.glsl.ts`
- `src/app/components/heroes/_data/markPoints.json`
- `scripts/sample-mark-points.mjs`

**Add — scenes:** `OrientationScene.tsx` (1), `ConversationScene.tsx` (2, gated on real words), `VerticalsExhibits.tsx` + `ArtifactExhibit.tsx` (3), `NetworkCredits.tsx` (4, replaces NetworkGlobe usage), `TrackRecordLedger.tsx` (5, replaces ProofSection), `LibraryFront.tsx` (6), `QuietClose.tsx` (7).

**Modify:** `AppContentWrapper.tsx` (`AppContent`) → re-compose into the 8 scenes, remove `StatsBar`/`PlaybookStaircase`/`SocialProofStrip` and the 4 unused hero variants. `SectionMasthead.tsx` → swap inline 900ms/curve for tokens. `ScrollReveal.tsx` + `ScrollRevealSection.tsx` → re-wrap `Reveal` (one behavior; **fix isVisible default**). `vite.config.ts` → add `manualChunks.r3f: ['three','@react-three/fiber','@react-three/drei']`. `theme.css` → add motion tokens; **DELETE** `--color-avante-accent-teal`/`--color-avante-accent-magenta` (236-237). `scripts/prerender.mjs` → confirm webdriver reads true (it does — no spoof present) so Scene-0 gate falls to poster.

**Delete (Scene-4 DoD):** `src/app/components/NetworkGlobe.tsx` (cyan `#1FE4C9` ×7+), `ProofSection.tsx` (candy-color stat wall, replaced by ledger).

---

## OWNER INPUTS NEEDED (from Cristian / Felipe / Amanda)

- RECORDED FOUNDER CONVERSATION (top blocker, gates Scenes 2/3/4/5/7): a ~30-min recorded talk with Felipe Moraes & Amanda Pinheiro covering — why a venture builder, why Brazil, what 'partner' actually cost on one real venture; one un-roundable specific detail (a date, a failure, a number not ending in 0/5). No design substitutes for this.
- Scene 0 thesis sign-off: confirm Felipe/Amanda endorse the cold-open framing 'the world's intelligence is landing in São Paulo' OR supply their own one-line thesis.
- Scene 1 literal facts: their own one-line definition of what Avante is, and the real SP/SF setup (studio? office? headcount in each city?) — geography must not ship as fact until confirmed.
- Scene 3 venture signals (one true, current signal each): Alphajuri (N firms / live in which court-state / design-partner status); WIR (confirm 'built with Mahway / founded 2025' is publishable, or a named pilot); BR Auction Intel (N auctions tracked across N states).
- Scene 4 lineage + signals: the actual shared founder/operator relationships across Avante, Mahway, FutureProofing (one true sentence per ally) + one verifiable signal per ally (named shared client / agents in production / engineers placed).
- Scene 5 iFood wording + closing line: confirm the exact iFood involvement verb ('backed/advised/invested alongside', keep the pre-unicorn hedge) and a one-line humble forward-looking sign-off in Felipe/Amanda's voice.
- Scene 6 library proof: confirm the true publishing cadence/longevity (e.g. 'published every month for N months') to replace the dropped DuckDuckGo metric; optional one-line editor's note on why they publish the playbook.
- Scene 7 sign-off: the real 1–2 sentence closing letter in Felipe/Amanda's voice; OPTIONAL real photographed signatures (replaces the dropped fake pen-stroke).
- Confirm avanteventures.substack.com as the memo destination and cristian@avanteventures.com as the single partner/press door.

---

## BUILD PHASES

- Phase 0 — Foundation & cleanup (no new scenes): add motion tokens to theme.css + tokens.ts; build useAvtReducedMotion/useDeviceTier/useHeroTier; build the one <Reveal> primitive defaulting to VISIBLE (fixes the prerender-blanking bug); re-wrap ScrollReveal/ScrollRevealSection over it; add AtmosphereField (single dusk→dawn scroll-linked backdrop) and retire AvanteHeroBackground's 4 infinite loops; add vite r3f manualChunk; DELETE NetworkGlobe.tsx + the dead teal/magenta tokens (theme.css:236-237). Verify build still prerenders.
- Phase 1 — Static editorial spine (no 3D, ships meaningful HTML): re-compose AppContentWrapper into the 8 scene slots; build the GPU-free, real-words-light scenes first — Scene 1 Orientation, Scene 5 Track-record ledger (replace ProofSection, off-white numbers + one gradient, NO count-up, chronological), Scene 6 Library current-issue + hover-pull-the-lede (drop DuckDuckGo), Scene 4 Network credits row. Use DRAFT copy with «REAL WORDS NEEDED» markers. Validate prerender parity + PSI mobile.
- Phase 2 — Coded exhibits & atmosphere polish: Scene 3 artifact exhibits (docket→data SVG/HTML before→after, sticky diptych), Scene 7 quiet close with CSS dawn grade tied to AtmosphereField scroll end-state, memo + single partner/press door. Wire CORRECT founder names (Felipe Moraes · Amanda Pinheiro). Run /humanize on all copy.
- Phase 3 — The spectacle (gated, last): Scene 0 poster-first hero — ConvergencePoster (LCP, with static stream labels), sample-mark-points.mjs → markPoints.json, ConvergenceCanvas (lazy, capability-gated, DPR-clamped, frameloop=demand, freeze-after-resolve, mobile-off). Add stream origin labels mid-flight. Verify three.js absent from main chunk; validate LCP/TBT/INP/CLS on PageSpeed Insights mobile + reduced-motion + JS-off.
- Phase 4 — Real-words integration (after owner inputs land): build Scene 2 Conversation around the ACTUAL recorded transcript (timecodes + disfluency), not drafts; replace all «REAL WORDS NEEDED» markers across Scenes 2/3/4/5/6/7; final /humanize + adversarial quality swarm before any ship decision.

---

## TOP RISKS

- INSTRUMENT REPETITION (the #1 Awwwards-bar threat): without the Scene-3 (artifact exhibits) and Scene-4 (human credits row) instrument changes, 6 of 8 scenes collapse into two instruments (3 glow-canvases + 3 quiet-hairline beats) and the site reads as a tasteful template. Mitigation: the blueprint MANDATES those two changes — verify the 8 scene thumbnails look like 8 different things before ship.
- PLACEHOLDER-GATED EMOTIONAL CORE: ~half the homepage's payload (Scenes 2/3/4/5/7) depends on real founder words/facts that don't exist yet. Building Scene 2's 260vh apparatus around generic drafts would anchor the founders toward generic answers and waste the build. Mitigation: get the recorded conversation FIRST (Phase 4 is gated on it); build everything else (Phases 0–3) without it; flag this conversation to Cristian as the top dependency.
- FOUNDER-FACT FABRICATION (credibility blocker): the original Scene-7 draft signed 'Felipe Matos' (wrong) and treated Amanda's surname as unknown. Verified correct: Felipe MORAES, Amanda PINHEIRO. Also drop the unverified 'WIR board' for Felipe (Scene 2) and keep the iFood hedge (Scene 5). Mitigation: names hard-coded correct in the blueprint; gate the WIR 'founded 2025/built with Mahway' claim against company-facts before publishing.
- MOBILE CWV REGRESSION FROM THE HERO: a naive r3f hero tanks mid-range Android (15–25fps, thermal throttle) and blows TBT/LCP. Mitigation: poster-first architecture (static SVG/CSS LCP), three.js lazy + mobile-off + DPR-clamped + frameloop=demand + freeze-after-resolve + FPS escape hatch; validate on PageSpeed Insights mobile, never on the M3 (synthetic lies 4–6×).
- PRERENDER BLANKING: the existing useScrollReveal defaults isVisible=false, so any component using it ships opacity:0 to the crawler and the 500ms-settle snapshot captures blank sections. Mitigation: the new <Reveal> primitive defaults to VISIBLE (or reads navigator.webdriver/below-fold) and all reveal callers migrate to it — a hard gate verified against dist/en/index.html before ship.
- VANITY-METRIC SELF-OWN (Scene 6): surfacing '#1 on DuckDuckGo' (≈2% market share, long-tail term) prominently reads as exactly the hype the redesign is killing and can damage credibility with a skeptical LP. Mitigation: dropped entirely; replace only with a true consistency/longevity line if confirmed, never an invented number.
