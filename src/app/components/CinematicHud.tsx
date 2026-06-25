import { useEffect, useRef } from "react";

// CinematicHud — the documentary "instrument" frame that threads the whole
// scroll-film into one authored world: a live São Paulo clock + coordinates,
// a §01→§07 beat counter, and a gradient progress meridian that fills as you
// scroll. Fixed, pointer-events:none, mono. Perf: direct-DOM updates via refs
// (no per-scroll/per-second React re-renders). This is the signature chrome
// no generic VC template has — it says "authored film", not "section stack".

const BEATS = [
  "CONVERGÊNCIA",
  "ORIENTAÇÃO",
  "OPERADORES",
  "O QUE CONSTRUÍMOS",
  "A REDE",
  "TRACK RECORD",
  "BIBLIOTECA",
];

export function CinematicHud() {
  const clockRef = useRef<HTMLSpanElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const idxRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Live São Paulo clock (BRT) — direct textContent, no re-render.
    let fmt: Intl.DateTimeFormat;
    try {
      fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } catch {
      fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    }
    const tick = () => {
      if (clockRef.current) clockRef.current.textContent = fmt.format(new Date());
    };
    tick();
    const iv = window.setInterval(tick, 1000);

    // Scroll progress → meridian fill + beat counter (rAF-throttled, direct DOM).
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        const i = Math.min(BEATS.length - 1, Math.floor(p * BEATS.length));
        if (idxRef.current) idxRef.current.textContent = String(i + 1).padStart(2, "0");
        if (labelRef.current) labelRef.current.textContent = BEATS[i];
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      clearInterval(iv);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        pointerEvents: "none",
        fontFamily: "var(--avt-font-mono)",
      }}
    >
      {/* progress meridian */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "1px", background: "rgba(255,255,255,0.07)" }}>
        <div
          ref={fillRef}
          style={{ height: "100%", width: "100%", transform: "scaleX(0)", transformOrigin: "left", background: "var(--avt-grad-line)" }}
        />
      </div>
      {/* instrument row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "0 var(--avt-page-pad-x) 13px",
          fontSize: "11px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--avt-meta)",
        }}
      >
        <span style={{ whiteSpace: "nowrap" }}>
          SÃO PAULO <span ref={clockRef} style={{ color: "var(--avt-muted)" }}>--:--:--</span>
          <span style={{ opacity: 0.6 }}> · 23°33′S 46°38′W</span>
        </span>
        <span style={{ whiteSpace: "nowrap" }}>
          § <span ref={idxRef}>01</span> / 07 —{" "}
          <span ref={labelRef} style={{ color: "var(--avt-muted)" }}>CONVERGÊNCIA</span>
        </span>
      </div>
    </div>
  );
}
