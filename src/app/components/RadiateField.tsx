import { useEffect, useRef } from "react";
import { lerpColor, clamp01 } from "@/app/lib/brandGradient";

// RadiateField — the perpetual "irradia" particle field (a lone seed ignites and
// radiates into many gradient points streaming outward, reborn at the core).
// Extracted from ShowTheWorkScene so it can live as a contained visual (it fills
// its RELATIVE-positioned parent). Gated: reduced-motion / prerender / mobile →
// a single settled frame. The loop runs only while on-screen (Intersection
// Observer) and stops when scrolled away (CWV).
export function RadiateField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    const small = window.innerWidth < 768;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const FOCAL = { x: 0.5, y: 0.5 };
    const N = small ? 80 : 150;
    type P = { ang: number; rad: number; col: number[]; size: number; delay: number; spd: number; phase: number; seed?: boolean };
    const pts: P[] = [];
    for (let i = 0; i < N; i++) {
      const ang = Math.random() * Math.PI * 2;
      pts.push({
        ang,
        rad: 0.16 + Math.random() * 0.84,
        col: lerpColor((Math.cos(ang) + 1) / 2),
        size: 1 + Math.random() * 2.1,
        delay: Math.random() * 0.22,
        spd: 0.05 + Math.random() * 0.09,
        phase: Math.random(),
      });
    }
    for (let i = 1; i < 7; i++) {
      pts[i].size = 3.2 + Math.random() * 1.4;
      pts[i].rad = 0.42 + Math.random() * 0.4;
    }
    pts[0].seed = true;
    pts[0].rad = 0;

    let w = 0, h = 0;
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
    window.addEventListener("resize", onResize, { passive: true });

    const render = (t: number, clock: number) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w * FOCAL.x;
      const cy = h * FOCAL.y;
      const md = Math.min(w, h);
      const ignite = clamp01((t - 0.24) / 0.12);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      if (ignite > 0 && t < 0.52) {
        const f = ignite * (1 - clamp01((t - 0.36) / 0.16));
        ctx.fillStyle = `rgba(255,222,180,${f * 0.1})`;
        ctx.beginPath();
        ctx.arc(cx, cy, md * 0.5, 0, 6.283);
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const [r, g, b] = p.col;

        if (p.seed) {
          const a = t < 0.24 ? 0.45 + 0.25 * Math.sin(clock * 2.2) : 0.95;
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 3 + ignite * 2.4, 0, 6.283);
          ctx.fill();
          continue;
        }

        const born = clamp01((t - 0.26) / 0.16);
        const cycle = (clock * p.spd + p.phase) % 1;
        const rr = cycle * p.rad * md * 0.62;
        const x = cx + Math.cos(p.ang) * rr;
        const y = cy + Math.sin(p.ang) * 0.9 * rr;
        const life = Math.sin(cycle * Math.PI);
        const a = born * life * 0.82;
        if (a <= 0.01) continue;
        ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.28})`;
        ctx.lineWidth = p.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, 6.283);
        ctx.fill();
      }
    };

    if (reduce || wd) {
      render(1, 0);
      return () => window.removeEventListener("resize", onResize);
    }

    const DURATION = 2600;
    let raf = 0;
    let started = false;
    let start = 0;
    const frame = (now: number) => {
      const t = started ? clamp01((now - start) / DURATION) : 0;
      render(t, now / 1000);
      raf = requestAnimationFrame(frame);
    };
    const startLoop = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const stopLoop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          if (!started) { started = true; start = performance.now(); }
          startLoop();
        } else {
          stopLoop();
        }
      }),
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      stopLoop();
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
