import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

// Beat — Operators + Playbooks (the SF ⇄ SP duality). Two hemispheres slide
// in from opposite sides and fuse at a gradient seam: cool indigo (Silicon
// Valley playbooks) + warm gold (local operators) → the full Avante gradient
// → "one company." Visually encodes the thesis instead of asserting it.
// Copy is structural; Cristian supplies the final substance.
export function DualityScene() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    return Boolean(r || wd);
  });

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } }),
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const t = (en: string, pt: string, es: string) => (language === "pt" ? pt : language === "es" ? es : en);

  const ease = "var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1))";
  const dur = "var(--avt-dur-reveal, 560ms)";
  const slide = (dir: number): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateX(0)" : `translateX(${dir * 44}px)`,
    transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
  });

  return (
    <section
      aria-label={t("Local operators and Silicon Valley playbooks", "Operadores locais e playbooks do Vale do Silício", "Operadores locales y playbooks de Silicon Valley")}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0" }}
    >
      <style>{`
        @media (max-width: 760px) {
          .avt-duality { grid-template-columns: 1fr !important; gap: 36px !important; }
          .avt-duality .avt-duality-seam { display: none !important; }
          .avt-duality .avt-duality-sf { text-align: left !important; }
          .avt-duality .avt-duality-sf p { margin-left: 0 !important; }
        }
      `}</style>
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        <div className="avt-duality" style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "clamp(28px, 6vw, 80px)", alignItems: "start" }}>
          {/* SF — Silicon Valley playbooks (cool) */}
          <div className="avt-duality-sf" style={{ ...slide(-1), textAlign: "right" }}>
            <div className="avt-lbl" style={{ color: "#8b8ed8", marginBottom: "18px", letterSpacing: "0.24em" }}>SILICON VALLEY · 37°23′N</div>
            <h3 style={{ margin: 0, fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(26px, 3.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--avt-txt)" }}>
              {t("Silicon Valley playbooks.", "Playbooks do Vale do Silício.", "Playbooks de Silicon Valley.")}
            </h3>
            <p style={{ margin: "16px 0 0 auto", fontFamily: "var(--avt-font-body)", color: "var(--avt-muted)", fontSize: "15px", lineHeight: 1.6, maxWidth: "34ch" }}>
              {t("How the best AI companies are built.", "Como as melhores empresas de IA são construídas.", "Cómo se construyen las mejores empresas de IA.")}
            </p>
          </div>

          {/* seam — where they fuse */}
          <div className="avt-duality-seam" aria-hidden style={{ position: "relative", width: "1px", justifySelf: "center", alignSelf: "stretch", minHeight: "140px" }}>
            <div style={{ position: "absolute", inset: 0, background: "var(--avt-grad)", transformOrigin: "center", transform: shown ? "scaleY(1)" : "scaleY(0)", transition: `transform 900ms ${ease} 140ms`, boxShadow: "0 0 18px rgba(236,95,114,0.4)" }} />
          </div>

          {/* SP — local operators (warm) */}
          <div style={{ ...slide(1) }}>
            <div className="avt-lbl" style={{ color: "#f4a93a", marginBottom: "18px", letterSpacing: "0.24em" }}>SÃO PAULO · 23°33′S</div>
            <h3 style={{ margin: 0, fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(26px, 3.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--avt-txt)" }}>
              {t("Operators on the ground.", "Operadores em campo.", "Operadores en el terreno.")}
            </h3>
            <p style={{ margin: "16px 0 0", fontFamily: "var(--avt-font-body)", color: "var(--avt-muted)", fontSize: "15px", lineHeight: 1.6, maxWidth: "34ch" }}>
              {t("Who actually build them, here.", "Quem realmente as constrói, aqui.", "Quiénes realmente las construyen, aquí.")}
            </p>
          </div>
        </div>

        {/* fusion */}
        <div style={{ textAlign: "center", marginTop: "clamp(52px, 9vh, 104px)", opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : "translateY(16px)", transition: `opacity ${dur} ${ease} 340ms, transform ${dur} ${ease} 340ms` }}>
          <span className="avt-grad" style={{ fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(28px, 4.2vw, 62px)", letterSpacing: "-0.015em", lineHeight: 1.1 }}>
            {t("The playbook, on the ground.", "O playbook, em campo.", "El playbook, en el terreno.")}
          </span>
        </div>
      </div>
    </section>
  );
}
