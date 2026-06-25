import { useEffect, type RefObject } from "react";

// useStageProgress — the scroll bus for the cinematic 3D stage (beats 3–7).
// Mirrors AtmosphereField's idiom: one RAF-throttled passive scroll listener
// writes progress into a module-level store; consumers (the R3F camera via
// useFrame, the poster) read the store directly — ZERO React re-renders on
// scroll. The band element wraps beats 3–7; we measure it (and each child
// <section>) to map scroll → a 0..1 progress across the band plus per-station
// windows. No three.js here — this file is safe in the initial bundle.

export type Station = { beat: number; start: number; end: number }; // window in band-progress [0,1]

type StageState = {
  progress: number; // 0..1 clamped across beats 3–7
  raw: number; // unclamped (negative before band, >1 after)
  stations: Station[];
  inView: boolean;
};

// Single module-level store. The camera reads `stageState.progress` each frame.
export const stageState: StageState = { progress: 0, raw: 0, stations: [], inView: false };

const subs = new Set<() => void>();
export function subscribeStage(fn: () => void) {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}
const emit = () => subs.forEach((f) => f());

// The continuity bridge. Maps the UNCLAMPED scroll progress (`raw`) → an
// opacity for the whole 3D layer (and the Tier-0 poster), so the stage EMERGES
// as you descend into beat 3 and fades out before the footer — never popping in
// over beats 1–2 (raw < 0 → 0) and never bleeding onto the footer (raw > ~1).
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
export function opacityFor(raw: number): number {
  const fadeIn = smoothstep(0, 0.1, raw); // 0 before band → 1 entering the band
  // Stay present THROUGH the closing (the finale crescendo); fade only at the
  // band bottom into the footer so the colophon is clean.
  const fadeOut = 1 - smoothstep(1.0, 1.12, raw);
  return fadeIn * fadeOut;

// Subtle finale crescendo: the field intensity rises toward the closing (so the
// rayitos peak at the end — the bookend to the hero — without dominating).
}
export function intensityFor(raw: number): number {
  return 0.46 + 0.34 * smoothstep(0.5, 0.96, Math.max(0, raw)); // ~0.46 mid → ~0.80 at the close
}

export function setStageInView(v: boolean) {
  if (stageState.inView !== v) {
    stageState.inView = v;
    emit();
  }
}

// Map the band + its child sections into station windows in band-progress space.
function measureStations(band: HTMLElement, bandTop: number, bandH: number) {
  const sections = Array.from(band.querySelectorAll("section"));
  stageState.stations = sections.map((el, i) => {
    const top = el.getBoundingClientRect().top + window.scrollY - bandTop;
    const h = (el as HTMLElement).offsetHeight;
    return { beat: 3 + i, start: top / bandH, end: (top + h) / bandH };
  });
}

export function useStageScrollBus(bandRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    let bandTop = 0;
    let bandH = 1;
    let raf = 0;

    const update = () => {
      // progress is anchored to the viewport MID-line crossing the band
      const mid = window.scrollY + window.innerHeight * 0.5;
      const raw = (mid - bandTop) / bandH;
      stageState.raw = raw;
      stageState.progress = Math.min(1, Math.max(0, raw));
      emit();
    };

    const remeasure = () => {
      const rect = band.getBoundingClientRect();
      bandTop = rect.top + window.scrollY;
      bandH = band.offsetHeight || 1;
      measureStations(band, bandTop, bandH);
      update();
    };

    remeasure();
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    // re-measure once after fonts/images settle (section heights are stable post-load)
    const settle = window.setTimeout(remeasure, 400);

    // expose for live verification during development
    (window as unknown as { __stage?: StageState }).__stage = stageState;

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [bandRef]);
}
