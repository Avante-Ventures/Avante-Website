import { lazy, Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { useStageScrollBus, setStageInView } from "./useStageProgress";
import { StaticPoster } from "./StaticPoster";

// Lazy so the `three` chunk is fetched only for a capable, in-view desktop.
const Stage3D = lazy(() => import("./Stage3D"));

// StageMount — the non-lazy gatekeeper for the cinematic 3D stage. It runs the
// tiering gate (only capable desktops get WebGL), watches the band (beats 3–7)
// with an IntersectionObserver so the heavy layer only exists while the user is
// actually there, and drives the scroll bus. Tier-0 (mobile / reduced-motion /
// prerender / low-end) renders the StaticPoster — never WebGL. Stage B: this
// renders the poster for BOTH tiers (no Canvas yet); Stage C swaps Tier-1 to a
// lazy-loaded <Stage3D/> so `three` stays out of the initial bundle.

function computeEnable3D(): boolean {
  if (typeof window === "undefined") return false;
  // Dev/QA escape hatch: ?force3d=1 forces the WebGL tier on (used to verify the
  // stage under headless Chromium, which otherwise reads as prerender). Harmless
  // in prod — it only ever opts INTO 3D on explicit request, never bypasses
  // reduced-motion preference.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.location.search.includes("force3d=1")) return !reduce;
  const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
  const small = window.matchMedia("(max-width: 760px)").matches;
  const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMem = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
  return !reduce && !wd && !small && !(lowCore && lowMem);
}

export function StageMount({ bandRef }: { bandRef: RefObject<HTMLElement | null> }) {
  const [enable3D, setEnable3D] = useState(false);
  const [inView, setInView] = useState(false);
  const ranGate = useRef(false);

  useStageScrollBus(bandRef);

  useEffect(() => {
    if (ranGate.current) return;
    ranGate.current = true;
    setEnable3D(computeEnable3D());
  }, []);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          setInView(e.isIntersecting);
          setStageInView(e.isIntersecting);
        }),
      { rootMargin: "25% 0px" }
    );
    io.observe(band);
    return () => io.disconnect();
  }, [bandRef]);

  // Only exists while the band is near the viewport (mounts the GPU layer just
  // before arrival, frees it when scrolled away).
  if (!inView) return null;

  // Tier 1 (capable desktop): the WebGL stage, with the poster as the load
  // fallback. Tier 0 (mobile / reduced-motion / prerender / low-end): poster only.
  if (enable3D) {
    return (
      <Suspense fallback={<StaticPoster />}>
        <Stage3D />
      </Suspense>
    );
  }
  return <StaticPoster />;
}
