import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";
import { lerpColor } from "@/app/lib/brandGradient";

// Scene 0 — The Convergence (motion-first, logo as the destination).
// The Avante "A" stands crisp + centered; bright light-streams pour in from
// the world's AI capitals and flow INTO it (trails + cursor parallax), so
// "the world's intelligence lands here and becomes Avante." Canvas is ALWAYS
// mounted so the effect can init; animation gated to capable devices.
// Reduced-motion / mobile / headless → static streams, same crisp A.

const FOCAL = { x: 0.5, y: 0.45 };

const ORIGINS = [
  { key: "sf", label: "SAN FRANCISCO", x: 0.1, y: 0.26 },
  { key: "seattle", label: "SEATTLE", x: 0.08, y: 0.53 },
  { key: "toronto", label: "TORONTO", x: 0.15, y: 0.78 },
  { key: "telaviv", label: "TEL AVIV", x: 0.63, y: 0.1 },
  { key: "london", label: "LONDON", x: 0.8, y: 0.13 },
  { key: "paris", label: "PARIS", x: 0.92, y: 0.3 },
  { key: "shenzhen", label: "SHENZHEN", x: 0.93, y: 0.55 },
  { key: "bangalore", label: "BANGALORE", x: 0.87, y: 0.79 },
  { key: "beijing", label: "BEIJING", x: 0.35, y: 0.9 },
  { key: "singapore", label: "SINGAPORE", x: 0.69, y: 0.9 },
];

export function HeroConvergencePoster() {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    if (reduce || wd) {
      setAnimate(false);
      return;
    }
    setAnimate(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    type P = { ang: number; rad: number; spd: number; col: number[]; size: number; depth: number };
    const N = window.innerWidth > 1280 ? 250 : 160;
    const ps: P[] = [];
    const spawn = (init = false): P => {
      const ang = Math.random() * Math.PI * 2;
      return {
        ang,
        rad: init ? Math.random() * 1.08 : 0.8 + Math.random() * 0.5,
        spd: 0.0022 + Math.random() * 0.005,
        col: lerpColor((Math.cos(ang) + 1) / 2),
        size: 1.0 + Math.random() * 2.3,
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
        const a = Math.min(0.8, 0.14 + prog * 0.82);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a * 0.6})`;
        ctx.lineWidth = p.size * 0.9;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
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

  const headline =
    language === "pt"
      ? "O primeiro venture builder AI-native do Brasil. Construímos para compor."
      : language === "es"
        ? "El primer venture builder AI-native de Brasil. Construimos para componer."
        : "The first AI-native venture builder in Brazil. We build to compound.";
  const scrollCue = language === "pt" ? "Continue" : language === "es" ? "Sigue bajando" : "Keep going";
  const gradWord = "AI-native";
  const [before, after] = headline.split(gradWord);

  return (
    <section
      aria-label="Avante Ventures — the first AI-native venture builder in Brazil"
      data-anim={animate ? "on" : "off"}
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        background: "transparent",
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
        .avtRise.dEye { animation-delay: 300ms; }
        .avtMark { animation: avtMarkIn 1500ms cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce){ .avtRise,.avtMark{ animation:none !important; } }
        /* Short / landscape viewports only — lift the A + headline so the
           value-prop and scroll cue never fall below the fold. Tall desktop
           (the loved composition) is untouched. */
        @media (max-height: 720px){
          .avt-hero-logo { top: 36% !important; }
          .avt-hero-title { top: 63% !important; }
        }
        @media (max-height: 560px){
          .avt-hero-logo { top: 30% !important; }
          .avt-hero-title { top: 57% !important; }
        }
      `}</style>

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
          background: "radial-gradient(circle, rgba(244,169,58,0.20) 0%, rgba(236,95,114,0.10) 32%, rgba(168,66,155,0.05) 54%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Static streams when not animating */}
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
            <line key={o.key} x1={o.x * 100} y1={o.y * 100} x2={FOCAL.x * 100} y2={FOCAL.y * 100} stroke="url(#avtStreamGrad)" strokeWidth={1} vectorEffect="non-scaling-stroke" opacity={0.22} />
          ))}
        </svg>
      )}

      {/* City labels removed — pure convergence (no world-city names) */}

      {/* Logo group — dead-center, the protagonist (crisp) */}
      <div
        className="avt-hero-logo"
        style={{
          position: "absolute",
          left: "50%",
          top: "43%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          padding: "0 var(--avt-page-pad-x)",
          pointerEvents: "none",
        }}
      >
        <img
          src="/redesign-assets/avante-A.png"
          width={340}
          height={500}
          fetchpriority="high"
          alt="Avante"
          style={{
            height: "clamp(168px, 32vh, 340px)",
            width: "auto",
            filter: "drop-shadow(0 16px 64px rgba(244,169,58,0.24)) drop-shadow(0 4px 26px rgba(168,66,155,0.28))",
          }}
        />
      </div>

      {/* Legibility scrim — a soft radial darkening clamped behind the title
          so the headline never loses contrast against the 'lighter'-blended
          particle field (sits above the canvas, below the text). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "72%",
          transform: "translate(-50%, -50%)",
          width: "min(1100px, 94vw)",
          height: "46vh",
          background: "radial-gradient(58% 58% at 50% 50%, rgba(6,7,13,0.6) 0%, rgba(6,7,13,0.34) 46%, rgba(6,7,13,0) 78%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Title — lower third */}
      <div
        className="avt-hero-title"
        style={{
          position: "absolute",
          left: "50%",
          top: "70%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "1000px",
          padding: "0 var(--avt-page-pad-x)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--avt-font-serif)",
            fontWeight: 500,
            letterSpacing: "-0.034em",
            lineHeight: 1.0,
            fontSize: "clamp(36px, 3.9vw, 58px)",
            color: "var(--avt-txt)",
            maxWidth: "24ch",
            textWrap: "balance",
          }}
        >
          {before}
          <span className="avt-grad">{gradWord}</span>
          {after}
        </h1>
        <div className="avt-lbl avtRise d2" style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.6, marginTop: "clamp(24px, 4vh, 44px)" }}>
          <span>{scrollCue}</span>
          <span aria-hidden>↓</span>
        </div>
      </div>
    </section>
  );
}
