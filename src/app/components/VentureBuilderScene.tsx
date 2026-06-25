import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";
import { RadiateField } from "@/app/components/RadiateField";

// Beat — "What is a venture builder (and why AI-native, in Brazil)." The
// conceptual turn of the film: the definition. A studio is not a fund. A fund
// writes a check and waits; a studio co-founds the company and stays in the
// building. We encode that as a large assembling DEFINITION statement (the
// crossed-out "bet" → "build" turn), a tight 3-row studio-vs-fund contrast
// where the gradient lands only on the studio side, and a closing "AI-native,
// in Brazil" line. Awareness/editorial — no pitch, no CTA. Copy is structural
// placeholder; Cristian supplies the final substance.
// «REAL WORDS NEEDED»: confirm the exact one-line definition verb + the closing
// "AI-native, in Brazil" framing before ship (see markers inline below).

type Contrast = {
  axis: { en: string; pt: string; es: string };
  fund: { en: string; pt: string; es: string };
  studio: { en: string; pt: string; es: string };
};

const CONTRAST: Contrast[] = [
  {
    axis: { en: "The capital", pt: "O capital", es: "El capital" },
    fund: { en: "Writes the check.", pt: "Assina o cheque.", es: "Firma el cheque." },
    studio: { en: "Writes the first line of code.", pt: "Escreve a primeira linha de código.", es: "Escribe la primera línea de código." },
  },
  {
    axis: { en: "The team", pt: "O time", es: "El equipo" },
    fund: { en: "Joins the board.", pt: "Entra no conselho.", es: "Se une al directorio." },
    studio: { en: "Co-founds, in the building from day one.", pt: "Co-funda, no prédio desde o dia um.", es: "Co-funda, en el edificio desde el día uno." },
  },
  {
    axis: { en: "The outcome", pt: "O resultado", es: "El resultado" },
    fund: { en: "Waits for the exit.", pt: "Espera pela saída.", es: "Espera la salida." },
    studio: { en: "Builds the company — then does it again.", pt: "Constrói a empresa — e faz de novo.", es: "Construye la empresa — y lo hace de nuevo." },
  },
];

export function VentureBuilderScene() {
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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const t = (en: string, pt: string, es: string) => (language === "pt" ? pt : language === "es" ? es : en);
  const pick = (c: { en: string; pt: string; es: string }) => (language === "pt" ? c.pt : language === "es" ? c.es : c.en);

  const ease = "var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1))";
  const dur = "var(--avt-dur-reveal, 560ms)";
  const rise = (delay: number): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(20px)",
    transition: `opacity ${dur} ${ease} ${delay}ms, transform ${dur} ${ease} ${delay}ms`,
  });

  return (
    <section
      aria-label={t(
        "What a venture builder is — and why AI-native, in Brazil",
        "O que é um venture builder — e por que AI-native, no Brasil",
        "Qué es un venture builder — y por qué AI-native, en Brasil"
      )}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0" }}
    >
      <style>{`
        @media (max-width: 760px) {
          .avt-vb-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            padding: 22px 0 !important;
          }
          .avt-vb-axis { opacity: 0.62; margin-bottom: 4px !important; }
          .avt-vb-fund { order: 2; }
          .avt-vb-studio { order: 3; }
          .avt-vb-def { font-size: clamp(34px, 11vw, 52px) !important; }
          .avt-vb-close { grid-template-columns: 1fr !important; gap: 28px !important; }
          .avt-vb-field { min-height: 240px !important; }
        }
      `}</style>

      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        {/* eyebrow — the question this beat answers */}
        <div className="avt-lbl" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(28px, 5vh, 52px)", ...rise(0) }}>
          <span aria-hidden style={{ width: "24px", height: "2px", background: "var(--avt-grad)", display: "inline-block" }} />
          {/* «REAL WORDS NEEDED»: final phrasing of the category label */}
          <span>{t("WHAT A VENTURE BUILDER IS", "O QUE É UM VENTURE BUILDER", "QUÉ ES UN VENTURE BUILDER")}</span>
        </div>

        {/* assembling definition — the "we don't bet, we build" turn */}
        <h2
          className="avt-vb-def"
          style={{
            margin: 0,
            fontFamily: "var(--avt-font-serif)",
            fontWeight: 500,
            fontSize: "clamp(40px, 7vw, 92px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: "var(--avt-txt)",
            maxWidth: "18ch",
          }}
        >
          {/* «REAL WORDS NEEDED»: confirm the exact definition verb — "co-found / build" */}
          <span style={{ ...rise(80), display: "inline-block" }}>
            {t("We don't ", "Nós não ", "No ")}
          </span>
          <span
            aria-hidden
            style={{
              ...rise(140),
              display: "inline-block",
              position: "relative",
              color: "var(--avt-meta)",
            }}
          >
            <span style={{ position: "relative" }}>
              {t("write the check", "assinamos o cheque", "firmamos el cheque")}
              {/* strike-through that draws across on reveal */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  top: "52%",
                  height: "3px",
                  width: shown ? "100%" : "0%",
                  background: "var(--avt-grad)",
                  transformOrigin: "left center",
                  transition: `width 720ms ${ease} 460ms`,
                  borderRadius: "2px",
                }}
              />
            </span>
          </span>
          {/* screen-reader sees the resolved meaning, not the crossed-out word */}
          <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
            {t("write the check.", "assinamos o cheque.", "firmamos el cheque.")}
          </span>
          <br />
          <span className="avt-grad" style={{ ...rise(220), display: "inline-block", fontWeight: 500 }}>
            {t("We co-found the company.", "Nós co-fundamos a empresa.", "Co-fundamos la empresa.")}
          </span>
        </h2>

        {/* studio-vs-fund contrast — three axes, gradient only on the studio side */}
        <div style={{ marginTop: "clamp(56px, 9vh, 112px)" }}>
          <div
            className="avt-vb-row"
            aria-hidden
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(110px, 200px) 1fr 1fr",
              gap: "clamp(20px, 5vw, 64px)",
              alignItems: "baseline",
              paddingBottom: "14px",
              borderBottom: "1px solid var(--avt-hair)",
              ...rise(120),
            }}
          >
            <span />
            <span className="avt-lbl" style={{ color: "var(--avt-meta)", fontSize: "clamp(18px, 2.1vw, 26px)", letterSpacing: "0.12em" }}>{t("FUND", "FUNDO", "FONDO")}</span>
            <span className="avt-lbl" style={{ color: "#f4a93a", fontSize: "clamp(18px, 2.1vw, 26px)", letterSpacing: "0.1em" }}>{t("VENTURE BUILDER", "VENTURE BUILDER", "VENTURE BUILDER")}</span>
          </div>

          <dl style={{ margin: 0 }}>
            {CONTRAST.map((c, i) => (
              <div
                key={c.axis.en}
                className="avt-vb-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(110px, 200px) 1fr 1fr",
                  gap: "clamp(20px, 5vw, 64px)",
                  alignItems: "baseline",
                  padding: "clamp(22px, 3.6vh, 36px) 0",
                  borderBottom: "1px solid var(--avt-hair)",
                  ...rise(180 + i * 90),
                }}
              >
                <dt className="avt-vb-axis avt-lbl" style={{ letterSpacing: "0.16em", opacity: 0.9, paddingTop: "0.35em", fontSize: "clamp(15px, 1.7vw, 21px)" }}>
                  {pick(c.axis)}
                </dt>
                <dd
                  className="avt-vb-fund"
                  style={{
                    margin: 0,
                    fontFamily: "var(--avt-font-serif)",
                    fontWeight: 500,
                    fontSize: "clamp(15px, 1.6vw, 20px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.005em",
                    color: "var(--avt-meta)",
                  }}
                >
                  {pick(c.fund)}
                </dd>
                <dd
                  className="avt-vb-studio"
                  style={{
                    margin: 0,
                    fontFamily: "var(--avt-font-serif)",
                    fontWeight: 500,
                    fontSize: "clamp(20px, 2.4vw, 31px)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.012em",
                    color: "var(--avt-txt)",
                  }}
                >
                  {pick(c.studio)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* the "AI-native, in Brazil" turn — closing line, now paired with the
            living radiate field on the right (the "engine behind many" visual). */}
        <div
          className="avt-vb-close"
          style={{
            marginTop: "clamp(56px, 9vh, 112px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
            ...rise(180 + CONTRAST.length * 90 + 60),
          }}
        >
          <div style={{ maxWidth: "30ch" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--avt-font-serif)",
                fontWeight: 500,
                fontSize: "clamp(26px, 3.6vw, 50px)",
                lineHeight: 1.12,
                letterSpacing: "-0.015em",
                color: "var(--avt-txt)",
              }}
            >
              {t("And we build them ", "E as construímos ", "Y las construimos ")}
              <span className="avt-grad" style={{ fontWeight: 500 }}>
                {t("AI-native", "AI-native", "AI-native")}
              </span>
              {t(", from Brazil.", ", a partir do Brasil.", ", desde Brasil.")}
            </p>
            <p
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--avt-font-body)",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.6,
                color: "var(--avt-muted)",
                maxWidth: "42ch",
              }}
            >
              {t(
                "AI in the foundation, not bolted on after. Built where the market actually is.",
                "IA na fundação, não acoplada depois. Construído onde o mercado realmente está.",
                "IA en los cimientos, no añadida después. Construido donde el mercado realmente está."
              )}
            </p>
          </div>
          {/* the living "engine behind many" radiate field */}
          <div className="avt-vb-field" aria-hidden style={{ position: "relative", minHeight: "clamp(360px, 40vw, 540px)" }}>
            <RadiateField />
          </div>
        </div>
      </div>
    </section>
  );
}
