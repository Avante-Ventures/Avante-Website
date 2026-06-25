import { useEffect, useRef } from "react";
import { stageState, subscribeStage, opacityFor } from "./useStageProgress";

// StaticPoster — the Tier-0 premium fallback for the cinematic 3D stage
// (mobile / reduced-motion / prerender / low-end), and the Suspense fallback
// while the WebGL chunk loads. A fixed, brand-palette light composition that
// sits BEHIND the editorial HTML of beats 3–7: cool indigo from the top
// (dusk), a warm gold→coral glow that strengthens as you descend the band
// (the same dawn law as AtmosphereField). Pure CSS, transform/opacity only,
// pointer-events:none, aria-hidden — zero a11y/CWV cost. Never an empty void.
export function StaticPoster() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const warmRef = useRef<HTMLDivElement | null>(null);

  // The continuity bridge + warm-glow ramp, both driven by the shared store
  // (no re-renders). The whole poster fades in as you descend into beat 3 and
  // out before the footer (opacityFor(raw)); the warm layer strengthens with
  // progress. Reduced-motion users get a calm static mid-state.
  useEffect(() => {
    const root = rootRef.current;
    const warm = warmRef.current;
    if (!root || !warm) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.style.opacity = "1";
      warm.style.opacity = "0.5";
      return;
    }
    const apply = () => {
      root.style.opacity = opacityFor(stageState.raw).toFixed(3);
      warm.style.opacity = (0.28 + stageState.progress * 0.55).toFixed(3);
    };
    apply();
    return subscribeStage(apply);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0,
      }}
    >
      {/* dusk — cool indigo wash from the top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 70% at 50% -10%, rgba(58,47,143,0.30), rgba(6,7,13,0) 60%)",
        }}
      />
      {/* dawn — warm gold→coral glow rising from below, scroll-strengthened */}
      <div
        ref={warmRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.28,
          background:
            "radial-gradient(95% 60% at 50% 118%, rgba(244,169,58,0.34), rgba(236,95,114,0.18) 38%, rgba(168,66,155,0.08) 60%, rgba(6,7,13,0) 78%)",
        }}
      />
      {/* a faint mauve depth haze mid-frame for premium falloff */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(80% 50% at 50% 50%, rgba(168,66,155,0.06), rgba(6,7,13,0) 70%)",
        }}
      />
    </div>
  );
}
