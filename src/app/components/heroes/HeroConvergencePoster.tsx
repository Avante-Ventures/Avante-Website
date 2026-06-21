import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

// Scene 0 — The Convergence (motion-first, logo as the destination).
// The Avante "A" stands crisp at center; streams of light-particles pour in
// from the world's AI capitals and flow INTO it (trails + cursor parallax),
// so "the world's intelligence lands here and becomes Avante." The canvas is
// ALWAYS mounted (so the effect can init); animation is gated to capable
// devices. Reduced-motion / mobile / headless → static streams, same crisp A.
// Brand gradient only — NO cyan.

const FOCAL = { x: 0.5, y: 0.43 };

const ORIGINS = [
  { key: "sf", label: "SAN FRANCISCO", x: 0.13, y: 0.2 },
  { key: "london", label: "LONDON", x: 0.85, y: 0.15 },
  { key: "shenzhen", label: "SHENZHEN", x: 0.94, y: 0.45 },
  { key: "bangalore", label: "BANGALORE", x: 0.86, y: 0.8 },
  { key: "telaviv", label: "TEL AVIV", x: 0.5, y: 0.08 },
  { key: "berlin", label: "BERLIN", x: 0.15, y: 0.74 },
];

const GRAD = [
  [244, 169, 58],
  [236, 95, 114],
  [168, 66, 155],
  [58, 47, 143],
];
function lerpColor(t: number) {
  t = Math.max(0, Math.min(1, t));
  const seg = Math.min(GRAD.length - 2, Math.floor(t * (GRAD.length - 1)));
  const lt = t * (GRAD.length - 1) - seg;
  const a = GRAD[seg];
  const b = GRAD[seg + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * lt),
    Math.round(a[1] + (b[1] - a[1]) * lt),
    Math.round(a[2] + (b[2] - a[2]) * lt),
  ];
}

export function HeroConvergencePoster() {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    const on = !reduce && !small && !wd;
    setAnimate(on);
    if (!on) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    type P = { ang: number; rad: number; spd: number; col: number[]; size: number; depth: number };
    const N = window.innerWidth > 1280 ? 220 : 130;
    const ps: P[] = [];
    const spawn = (init = false): P => {
      const ang = Math.random() * Math.PI * 2;
      return {
        ang,
        rad: init ? Math.random() * 1.05 : 0.78 + Math.random() * 0.5,
        spd: 0.0022 + Math.random() * 0.005,
        col: lerpColor((Math.cos(ang) + 1) / 2),
        size: 0.9 + Math.random() * 2.1,
        depth: 0.3 + Math.random() * 1.7,
      };
    };
    for (let i = 0; i < N; i++) ps.push(spawn(true));

    const setSize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    const onResize = () => setSize();
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const frame = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      const cx = w * FOCAL.x + mouse.x * 24;
      const cy = h * FOCAL.y + mouse.y * 18;
      const md = Math.min(w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      for (const p of ps) {
        p.rad -= p.spd;
        if (p.rad <= 0.015) Object.assign(p, spawn());
        const prog = 1 - Math.min(1, p.rad / 1.28);
        const r = p.rad * md * 0.66;
        const rPrev = (p.rad + p.spd * 16) * md * 0.66;
        const dx = Math.cos(p.ang);
        const dy = Math.sin(p.ang) * 0.94;
        const x = cx + dx * r + mouse.x * p.depth * 6;
        const y = cy + dy * r + mouse.y * p.depth * 5;
        const px = cx + dx * rPrev + mouse.x * p.depth * 6;
        const py = cy + dy * rPrev + mouse.y * p.depth * 5;
        const [cr, cg, cb] = p.col;
        const a = Math.min(0.85, 0.1 + prog * 0.9);
        // trailing streak
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a * 0.5})`;
        ctx.lineWidth = p.size * 0.9;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
        // head
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const eyebrow = "SÃO PAULO · 23°33′S 46°38′W";
  const headline =
    language === "pt"
      ? "A inteligência do mundo está chegando a São Paulo."
      : language === "es"
        ? "La inteligencia del mundo está aterrizando en São Paulo."
        : "The world's intelligence is landing in São Paulo.";
  const scrollCue = language === "pt" ? "Continue" : language === "es" ? "Sigue bajando" : "Keep going";
  const [before, after] = headline.split("São Paulo");

  return (
    <section
      aria-label="Avante Ventures — the world's intelligence is landing in São Paulo"
      data-anim={animate ? "on" : "off"}
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "var(--avt-ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes avtRise { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:translateY(0);} }
        @keyframes avtMarkIn { from { opacity:0; transform:scale(0.9); filter:blur(8px);} to { opacity:1; transform:scale(1); filter:blur(0);} }
        .avtRise { animation: avtRise 1100ms cubic-bezier(0.16,1,0.3,1) both; }
        .avtRise.d1 { animation-delay: 520ms; }
        .avtRise.d2 { animation-delay: 760ms; }
        .avtMark { animation: avtMarkIn 1500ms cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .avtRise,.avtMark{ animation:none !important; } }
      `}</style>

      {/* Particle field — ALWAYS mounted so the effect can initialize. */}
      <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />

      {/* Focal glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: `${FOCAL.x * 100}%`,
          top: `${FOCAL.y * 100}%`,
          width: "64vmax",
          height: "64vmax",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(244,169,58,0.16) 0%, rgba(236,95,114,0.09) 32%, rgba(168,66,155,0.05) 54%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Static streams (only when not animating) */}
      {!animate && (
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <defs>
            <linearGradient id="avtStreamGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f4a93a" />
              <stop offset="40%" stopColor="#ec5f72" />
              <stop offset="70%" stopColor="#a8429b" />
              <stop offset="100%" stopColor="#3a2f8f" />
            </linearGradient>
          </defs>
          {ORIGINS.map((o) => (
            <line key={o.key} x1={o.x * 100} y1={o.y * 100} x2={FOCAL.x * 100} y2={FOCAL.y * 100} stroke="url(#avtStreamGrad)" strokeWidth={1} vectorEffect="non-scaling-stroke" opacity={0.3} />
          ))}
        </svg>
      )}

      {/* City labels */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {ORIGINS.map((o) => (
          <span key={o.key} className="avt-lbl" style={{ position: "absolute", left: `${o.x * 100}%`, top: `${o.y * 100}%`, transform: "translate(-50%, -50%)", whiteSpace: "nowrap", opacity: 0.38 }}>
            {o.label}
          </span>
        ))}
      </div>

      {/* Centerpiece — the crisp Avante "A" (always), then the kinetic title */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 var(--avt-page-pad-x)",
          width: "100%",
          maxWidth: "1000px",
          marginTop: "-4vh",
        }}
      >
        <div className="avt-lbl avtRise" style={{ marginBottom: "26px", letterSpacing: "0.32em", opacity: 0.7 }}>
          {eyebrow}
        </div>
        <img
          className="avtMark"
          src="/redesign-assets/avante-A.png"
          alt="Avante"
          style={{
            height: "clamp(150px, 26vh, 290px)",
            width: "auto",
            filter: "drop-shadow(0 16px 64px rgba(244,169,58,0.24)) drop-shadow(0 4px 26px rgba(168,66,155,0.28))",
            marginBottom: "clamp(28px, 4.5vh, 52px)",
          }}
        />
        <h1
          className="avtRise d1"
          style={{
            margin: 0,
            fontFamily: "var(--avt-font-serif)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.06,
            fontSize: "clamp(32px, 4.4vw, 70px)",
            color: "var(--avt-txt)",
            maxWidth: "18ch",
          }}
        >
          {before}
          <span className="avt-grad">São Paulo</span>
          {after}
        </h1>
        <div className="avt-lbl avtRise d2" style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.6, marginTop: "clamp(28px, 5vh, 52px)" }}>
          <span>{scrollCue}</span>
          <span aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
