# UX implementation follow-up review

Read-only source review on September 14, 2026. No application edits, browser interaction, servers or builds by this reviewer. Root owns runtime verification.

## Main finding: Back to top focuses a hidden hero heading

**Medium priority, high confidence in source logic; runtime reproduction still required.**

`src/app/components/BackToTop.tsx:28` now calls `focusSection(heroSection, behavior)`. `src/app/components/focusSection.ts:6` always selects the first heading and focuses it immediately at line 14, while smooth scrolling is still in progress. At this point the desktop journey remains in chapter 3: the first `h1` is hidden outside chapter 0 at `src/app/components/world/WorldTour.tsx:118`, and its parent is hidden on arrival at line 115. A hidden heading cannot receive focus. The floating button also unmounts once scrolling re-enters the journey (`BackToTop.tsx:14`), so keyboard context is not reliably restored to the entrance.

Suggested surgical fix: for Back to top, focus the stable hero section itself with a temporary `tabIndex=-1`, or wait until the actual chapter-0 heading is visible. A generic helper should avoid hidden headings and fall back to the target container rather than focusing an ephemeral arrival heading.

Verification: keyboard-activate Back to top from a venture section, wait for scrolling, then inspect activeElement and press Tab. Also try `#hero` while the current hero chapter is 3.

## Secondary context-restoration check

**Low priority; source-backed rendering concern, not a reproduced visual regression.**

The context-loss guard now correctly prevents subsequent pointer/resize draws from re-hiding the fallback. However, `VentureLogoScene.tsx:64` restores by resizing the original scene. Its PMREM environment was rendered once at lines 25–27, then its source room and generator were disposed. Three's local `WebGLRenderer.js:1098` rebuilds GPU state on restoration. A generated render-target texture's pixels are not recreated merely by rendering the logo again, so the metallic edges may lose their environment/reflection after restoration even though the flat colored faces survive.

Root should compare appearance before and after a genuine `WEBGL_lose_context` restore, rather than checking only `data-ready`. If restoration looks wrong, remount the small logo scene or regenerate its environment before reporting readiness. Keeping the static official logo until remount is a valid fallback.

## Changes that look correct in source

- **Same-page menu navigation:** `Navbar.tsx:96` closes the native dialog before `focusSection`; cleanup checks `dialog.open` at line 79, so it does not subsequently steal focus back from the target heading. This ordering addresses the main close-versus-routing concern.
- **Dismissal:** Escape is prevented and routed through the same state cleanup; the native dialog isolates the background, and explicit Tab cycling covers close/link controls. Body/root overflow values are restored. Test Close, Escape, and desktop resize independently.
- **Hero deferral:** The 520svh reservation depends on the enhancement query, not scene loading (`WorldTour.tsx:31`, `:107`; `world.css:10`). The new intersection observer at lines 38–50 does not collapse that height. No new reserved-height regression found in source.
- **Mobile content:** Team roles, biographies and profile links now use materially more readable sizes; contact is the primary closing action. The approved venture compositions remain unchanged.
- **Locale changes:** `useLanguage.tsx:939` preserves search and hash, with matching callback dependencies. Section focus now follows router hash navigation.

## Focused remaining runtime checks

- Back-to-top focus as described above.
- Menu People on the homepage versus People from an inner page; menu route links, Close, Escape and width change across 1024px.
- ES header at 1024–1100px: the new longer Inversionistas item shares an absolutely centered row with the language/contact cluster. This is a layout check, not a claimed overlap.
- Cold direct venture anchor: no WorldScene import until approaching the reserved hero, and stable target position when the hero eventually loads.
- Context restoration visual comparison; 320/390px expanded biographies and menu scrolling.

No benchmark or physical-device success is claimed by this review.
