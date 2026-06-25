import { useEffect, useRef } from "react";

// AtmosphereField — the ONE continuous world behind the whole scroll-film.
// A fixed dusk→dawn environment: cool indigo from the top (dusk), a warm
// amber/coral glow rising from the bottom that INTENSIFIES as you scroll, so
// arriving at the end IS the sunrise (Peak–End payoff). Scenes render
// transparent on top, so the same world threads through all of them — that is
// what turns "stacked sections" (templated/AI-ish) into "one authored film".
// transform/opacity only, scroll-linked via direct DOM (no re-renders),
// reduced-motion → a calm static mid-state.
export function AtmosphereField() {
  const dawnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dawnRef.current;
    if (!el) return;
    if (reduce) {
      el.style.opacity = "0.45";
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        el.style.opacity = (0.12 + p * 0.9).toFixed(3);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "var(--avt-ink)" }}>
      {/* dusk — cool indigo wash from the top */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(125% 80% at 50% -15%, rgba(58,47,143,0.28), rgba(6,7,13,0) 58%)",
        }}
      />
      {/* dawn — warm horizon glow rising from the bottom, scroll-intensified */}
      <div
        ref={dawnRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          background: "radial-gradient(120% 78% at 50% 116%, rgba(244,169,58,0.30), rgba(236,95,114,0.14) 38%, rgba(6,7,13,0) 72%)",
        }}
      />
    </div>
  );
}
