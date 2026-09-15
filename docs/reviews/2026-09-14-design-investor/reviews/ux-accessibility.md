# Avante UX, accessibility and performance review

Date: September 14, 2026. Independent read-only review of the current local source. No app changes, browser automation, builds or network benchmarks were run by this reviewer. Findings below distinguish source observations from runtime consequences that still need reproduction. Previous audit documents were treated as historical evidence, not fresh test results.

## Assessment

Preserve the cinematic entrance and the newly individualized venture showcases. The progressive rendering architecture is thoughtful. The highest-value next pass is interaction reliability and readable diligence content, rather than adding another visual effect.

## Three strengths

1. **The journey has a real alternative path.** Narrow/touch/short/reduced-motion viewports receive a static city entrance. The desktop film is not mounted until journey intent, and visitors can go directly to the ventures or studio. The explicit mobile film uses a native dialog, restores focus, locks background scrolling and provides localized retry copy. Sources: `src/app/components/world/WorldTour.tsx:7`, `:58`, `:115`, `:138`; `src/app/components/world/JourneyFilm.tsx:39`. Observed in source; prior playback tests are documented, not repeated here.
2. **The venture displays connect identity to a real destination.** Both the image preview and the visible domain/CTA link to the actual company website. Local responsive screenshots avoid a live third-party iframe, and an accessible static official logo remains behind the decorative canvas. Sources: `src/app/components/world/VentureExhibit.tsx:32`, `:36`, `:42`; `src/app/components/world/world.css:136`, `:161`. The 72px mobile website row is a strong interaction target.
3. **3D is mostly event-driven and disposable.** Venture scenes mount on intersection, respect reduced motion, avoid touch interception and release resources on unmount. Drawing responds to load, resize and mouse movement instead of a permanent spin loop. Sources: `src/app/components/world/VentureExhibit.tsx:15`; `src/app/components/world/VentureLogoScene.tsx:36`, `:54`, `:113`. This is appropriate polish for a studio website.

## Five concerns, ordered by practical priority

### 1. The mobile menu visually behaves like a modal, but keyboard interaction does not

- **Evidence:** `src/app/components/Navbar.tsx:64` handles Escape only; `:267` renders a full-screen overlay with `role="navigation"`. Opening it neither moves focus into the menu nor makes the covered page inert. There is no focus containment or background scroll lock in this component.
- **Impact:** Keyboard or assistive-technology users can reach content visually hidden behind the navigation; touch scrolling at overlay boundaries may still affect the page. The film dialog already demonstrates the desired level of interaction discipline.
- **Confidence:** High source observation; medium-high confidence in the runtime consequence until keyboard/VoiceOver testing.
- **Suggested fix:** Give the overlay proper modal focus management, including the close control, initial focus, background inertness, scroll locking and restoration to the opener. Preserve the current Escape behavior and large links.
- **Parent should challenge:** Reproduce Tab/Shift+Tab with the menu open before labeling this a confirmed user-visible failure. Do not confuse a working Escape key with complete menu accessibility.

### 2. Hash navigation moves the viewport, but not the keyboard reading position

- **Evidence:** `src/app/routes.tsx:65` opens disclosures and calls `scrollIntoView` at `:73`, without focusing the target. The primary hero links use router hash navigation at `src/app/components/world/WorldTour.tsx:115`; the navbar's anchor interception also scrolls without moving focus at `src/app/components/Navbar.tsx:80`.
- **Impact:** After choosing a venture or section, the next Tab can continue from the old link rather than the newly visible content. Screen-reader context may remain at the entrance while the viewport has jumped several screens.
- **Confidence:** High source observation; medium-high runtime inference. Browser focus behavior must be tested with the actual router.
- **Suggested fix:** On user-initiated section navigation, focus a meaningful target heading/section using `tabIndex={-1}` and `focus({ preventScroll: true })`, then align the viewport. Handle cross-route focus deliberately; avoid stealing focus during passive scrolling.
- **Parent should challenge:** Test “Explore our ventures” → Tab and an arrival venture link → Tab. A screenshot cannot verify this behavior.

### 3. Important mobile diligence copy is too small for the institutional positioning

- **Evidence:** The phone rule at `src/app/components/world/world.css:222` sets team roles to 10px, biographies to 11px and LinkedIn links to 9px. The underlying content is real professional experience at `src/app/components/world/EditorialHome.tsx:68`.
- **Impact:** The content that should build confidence requires more effort than the large brand displays. This is a legibility and hierarchy judgment, not a claim that WCAG establishes a universal minimum font size.
- **Confidence:** High that these sizes are specified; medium that they are uncomfortable without a physical-phone read.
- **Suggested fix:** Raise biography copy to roughly 14–16px and supporting text/links to 12–14px. Let cards become taller or use one column where needed; keep the identity showcases unchanged.
- **Parent should challenge:** Read a full biography at 100% zoom on a phone before deciding. Do not judge mobile legibility from a large desktop screenshot alone.

### 4. A direct desktop venture link still initializes the offscreen hero

- **Evidence:** `src/app/components/world/WorldTour.tsx:38` imports the scene whenever the desktop enhancement query matches, regardless of viewport intersection or an initial deep link. `src/app/components/world/WorldScene.tsx:68` immediately creates the arrival gallery; its intersection observer at `:103` gates drawing, while the map fetch at `:105` still runs. `src/app/components/world/AvanteGallery.ts:13` creates its environment immediately and fetches/extrudes the mark at `:39`.
- **Impact:** A cold visit to `#home-alphajuri` may pay for globe/gallery setup while the visitor only sees a venture. This is unnecessary work worth measuring, not evidence that current loading is slow. Venture logos themselves are properly deferred; the desktop film is already deferred and should remain so.
- **Confidence:** High source observation; medium performance significance without a waterfall/CPU trace.
- **Suggested fix:** Gate initial hero scene construction by hero proximity, while reserving its existing layout height so anchor positioning remains stable. Consider deferring the gallery environment/geometry until travel approaches arrival.
- **Parent should challenge:** Compare cold top-of-page and cold deep-link requests on the production build. Do not claim that mobile loads Three.js on entry: it currently loads venture 3D when a logo becomes visible, which is a different and intentional boundary.

### 5. A lost logo WebGL context can re-hide the static fallback

- **Evidence:** `src/app/components/world/VentureLogoScene.tsx:60` calls `onFailure()` on `webglcontextlost`, but does not clear `loaded` or suppress subsequent draws. The draw function calls `onReady()` whenever `loaded` is true at `:43`. CSS hides the fallback when readiness returns at `src/app/components/world/world.css:134`.
- **Impact:** A later pointer move or resize after context loss can mark the scene ready again while its renderer has no valid context, leaving a blank logo instead of the intended static mark.
- **Confidence:** High logic-level inference; not reproduced in a browser in this review.
- **Suggested fix:** Track a lost-context state, stop rendering/readiness notifications until a valid restore/rebuild, and keep the official fallback visible. Unmounting the failed scene is also a simple safe option.
- **Parent should challenge:** Trigger context loss through a dedicated local QA harness and then resize or move the pointer. Ordinary successful loading does not exercise this path.

## Outstanding runtime verification

- Keyboard navigation: menu Tab/Shift+Tab/Escape, hero and venture hash navigation, and returning from portfolio disclosures.
- Screen reader: heading navigation, language-picker behavior, menu reachability, and localized link announcements.
- Physical iPhone/Android: biography readability, 200% text scaling, landscape menu scrolling and touch behavior.
- Reduced-motion preference changed while the experience is open; verify static identity and no involuntary journey motion.
- Simulated missing logo asset, blocked lazy chunk and WebGL context loss; verify fallback persistence and working website links.
- Cold production-build waterfall/CPU trace at the home top and a direct venture anchor; then deployed LCP/INP/CLS. No Lighthouse, cellular or benchmark score is claimed.

The earlier iframe-width, playback and build checks in `docs/2026-09-14-mobile-loading-audit.md` and `docs/2026-09-14-venture-brand-showcases.md` are useful coverage. They do not replace the keyboard, assistive-technology, context-loss and physical-device checks above.
