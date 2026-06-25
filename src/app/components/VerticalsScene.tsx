import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

// Beat — "What we're building" (the verticals). Three ventures, each a row
// that reads like a spec sheet, not a ledger: a venture name (serif), a
// one-line "what it is", and its concrete AI WEDGE rendered as a verb chain
// (the machine reading → scoring → pricing), so the page SHOWS the wedge
// instead of asserting "AI-powered." A short gradient spine to the left of
// each row tints it with a 2-stop slice of the brand gradient — warm gold at
// the top venture, cooling toward indigo at the bottom — so the three read as
// one instrument. The current "signal" line is intentionally left as a
// «REAL WORDS NEEDED» placeholder: a true, current proof point (design
// partner / pilot / N tracked) that Cristian must confirm before ship — we
// never invent traction. Reveal-on-scroll copies the DualityScene `shown`
// pattern exactly (defaults shown=true under webdriver / reduced-motion so
// prerender + a11y get the static end-state).

type Venture = {
  /* mono kicker — sector tag */
  tag: string;
  /* serif venture name; `gradFirst` renders the first letter in gradient (αlphajuri nod) */
  name: string;
  gradFirst?: boolean;
  /* outbound link to the venture's own site (omit if it has none yet) */
  url?: string;
  /* 2-stop slice of the brand gradient for the spine + accents */
  spine: [string, string];
  /* maturity rank on the DISCOVERY→BUILDING→PILOT→IN MARKET ladder (1..4).
     drives the visual scale: indent, name size, brightness, stage meter fill. */
  stage: 1 | 2 | 3 | 4;
  what: { en: string; pt: string; es: string };
  /* the concrete AI wedge as a verb chain (show, don't tell) */
  wedge: { en: string[]; pt: string[]; es: string[] };
  signal: { en: string; pt: string; es: string };
};

// The universal maturity axis. Each venture fills the meter up to its `stage`.
const STAGES: { en: string; pt: string; es: string }[] = [
  { en: "Discovery", pt: "Descoberta", es: "Discovery" },
  { en: "Building", pt: "Em construção", es: "En construcción" },
  { en: "Pilot", pt: "Piloto", es: "Piloto" },
  { en: "In market", pt: "No mercado", es: "En mercado" },
];

// Ordered base→summit on the maturity ladder: as you scroll DOWN the tiers
// widen, brighten and grow, climbing from discovery to in-market — so the
// section crescendos into the most-proven venture right before the close.
// Spines warm from cool indigo (base) to bright gold (summit) — echoing the
// hero's warm-dawn finale.
const VENTURES: Venture[] = [
  {
    tag: "LEGALTECH · BRAZIL",
    name: "alphajuri",
    gradFirst: true,
    spine: ["#a8429b", "#ec5f72"], // mauve → coral
    stage: 2,
    what: {
      en: "An AI copilot for Brazilian lawyers.",
      pt: "Um copiloto de IA para advogados brasileiros.",
      es: "Un copiloto de IA para abogados brasileños.",
    },
    wedge: {
      en: ["Reads the case file", "finds the claim", "prices what's worth buying"],
      pt: ["Lê os autos", "encontra o crédito", "precifica o que vale comprar"],
      es: ["Lee el expediente", "encuentra el crédito", "precia lo que vale comprar"],
    },
    signal: {
      en: "In active build.",
      pt: "Em construção ativa.",
      es: "En construcción activa.",
    },
  },
  {
    tag: "INSURTECH · LATAM",
    name: "WIR",
    url: "https://wirinnovation.ai",
    spine: ["#ec5f72", "#f4a93a"], // coral → gold
    stage: 3,
    what: {
      en: "The AI layer for insurers and brokers.",
      pt: "A camada de IA para seguradoras e corretores.",
      es: "La capa de IA para aseguradoras y corredores.",
    },
    wedge: {
      en: ["Reads the submission", "scores it against the insurer's appetite", "prices it with an audit trail"],
      pt: ["Lê a submissão", "pontua contra o apetite da seguradora", "precifica com trilha de auditoria"],
      es: ["Lee la solicitud", "la puntúa contra el apetito de la aseguradora", "la precia con traza de auditoría"],
    },
    signal: {
      en: "Live POC with a global insurer.",
      pt: "POC ativo com uma seguradora global.",
      es: "POC activo con una aseguradora global.",
    },
  },
  {
    tag: "AI ENGINEERING · BRAZIL",
    name: "FutureProofing",
    url: "https://futureproofing.dev",
    spine: ["#f4a93a", "#ffcf7a"], // gold → light gold (warmest, summit)
    stage: 4,
    what: {
      en: "AI engineers embedded inside legacy companies.",
      pt: "Engenheiros de IA dentro de empresas tradicionais.",
      es: "Ingenieros de IA dentro de empresas tradicionales.",
    },
    wedge: {
      en: ["Embeds senior AI engineers", "inside the legacy operation", "ships AI into the core business"],
      pt: ["Coloca engenheiros de IA sênior", "dentro da operação tradicional", "leva IA ao núcleo do negócio"],
      es: ["Inserta ingenieros de IA senior", "dentro de la operación tradicional", "lleva IA al núcleo del negocio"],
    },
    signal: {
      en: "Already working with several companies.",
      pt: "Já trabalhando com várias empresas.",
      es: "Ya trabajando con varias empresas.",
    },
  },
];

export function VerticalsScene() {
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
  const pick = <T,>(c: { en: T; pt: T; es: T }) => (language === "pt" ? c.pt : language === "es" ? c.es : c.en);

  const ease = "var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1))";
  const dur = "var(--avt-dur-reveal, 560ms)";

  const eyebrow = t("WHAT WE'RE BUILDING", "O QUE ESTAMOS CONSTRUINDO", "LO QUE ESTAMOS CONSTRUYENDO");

  // Visual scale per maturity rank m (1..4): the higher the stage, the wider
  // (less indent), brighter and larger the tier — the "climb." Indent is pure
  // CSS calc (number × clamp) so it scales fluidly and is zeroed on mobile.
  const STEP = "clamp(20px, 4vw, 72px)";
  const scaleFor = (m: number) => ({
    indent: `calc((4 - ${m}) * ${STEP})`,
    opacity: 0.74 + m * 0.065, // ≈0.80 (base) → 1.0 (summit)
    nameFont: `clamp(${22 + m * 4}px, ${(2.4 + m * 0.5).toFixed(2)}vw, ${24 + m * 8}px)`,
  });

  return (
    <section
      aria-label={eyebrow}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0" }}
    >
      <style>{`
        @media (max-width: 760px) {
          .avt-vert-row { grid-template-columns: 1fr !important; gap: 18px !important; padding-left: 22px !important; margin-left: 0 !important; }
          .avt-vert-row .avt-vert-spine { top: 6px !important; bottom: 6px !important; }
          .avt-vert-wedge { gap: 8px !important; }
          .avt-vert-wedge .avt-vert-arrow { display: none !important; }
          .avt-vert-wedge .avt-vert-step { display: block !important; }
          .avt-vert-meter { flex-wrap: wrap !important; gap: 10px !important; }
        }
      `}</style>

      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        {/* masthead — eyebrow + framing line + the maturity axis legend */}
        <div
          style={{
            marginBottom: "clamp(40px, 7vh, 80px)",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(12px)",
            transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
          }}
        >
          <div className="avt-lbl" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span aria-hidden style={{ width: "24px", height: "2px", background: "var(--avt-grad)", display: "inline-block" }} />
            <span>{eyebrow}</span>
          </div>
          <h2
            style={{
              margin: "20px 0 0",
              fontFamily: "var(--avt-font-serif)",
              fontWeight: 500,
              fontSize: "clamp(26px, 3.6vw, 46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: "var(--avt-txt)",
              maxWidth: "20ch",
            }}
          >
            {t("Three ventures on one thesis —", "Três ventures, uma tese —", "Tres ventures, una tesis —")}{" "}
            <span className="avt-grad">{t("climbing from discovery to market.", "subindo da descoberta ao mercado.", "escalando del discovery al mercado.")}</span>
          </h2>
          {/* maturity axis legend — labels the stage meter below each venture */}
          <div
            aria-hidden
            style={{
              marginTop: "22px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--avt-font-mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--avt-meta)",
            }}
          >
            {STAGES.map((s, si) => (
              <span key={si} style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <span>{pick(s)}</span>
                {si < STAGES.length - 1 && <span className="avt-grad" style={{ fontWeight: 600 }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--avt-hair)" }}>
          {VENTURES.map((v, i) => {
            const wedge = pick(v.wedge);
            const grad = `linear-gradient(180deg, ${v.spine[0]} 0%, ${v.spine[1]} 100%)`;
            const sc = scaleFor(v.stage);
            return (
              <div
                key={v.name}
                className="avt-vert-row"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "minmax(160px, 320px) 1fr",
                  gap: "clamp(24px, 5vw, 64px)",
                  alignItems: "start",
                  padding: "clamp(30px, 5vh, 56px) 0",
                  paddingLeft: "28px",
                  marginLeft: sc.indent, // staircase indent — shrinks with maturity
                  borderBottom: "1px solid var(--avt-hair)",
                  opacity: shown ? sc.opacity : 0,
                  transform: shown ? "translateY(0)" : "translateY(22px)",
                  transition: `opacity ${dur} ${ease} ${i * 110}ms, transform ${dur} ${ease} ${i * 110}ms`,
                }}
              >
                {/* gradient spine — the through-line that makes the three one instrument */}
                <span
                  aria-hidden
                  className="avt-vert-spine"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "clamp(30px, 5vh, 56px)",
                    bottom: "clamp(30px, 5vh, 56px)",
                    width: `${2 + v.stage}px`, // thickens up the climb (3px → 6px)
                    borderRadius: "3px",
                    background: grad,
                    transformOrigin: "top",
                    transform: shown ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform var(--avt-dur-spatial, 900ms) ${ease} ${140 + i * 110}ms`,
                    boxShadow: `0 0 ${10 + v.stage * 4}px ${v.spine[1]}${v.stage >= 3 ? "88" : "55"}`,
                  }}
                />

                {/* left column — tag + venture name */}
                <div>
                  <div className="avt-lbl" style={{ marginBottom: "14px", letterSpacing: "0.2em", opacity: 0.85 }}>
                    {v.tag}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "var(--avt-font-serif)",
                      fontWeight: 500,
                      fontSize: sc.nameFont, // grows with maturity (hierarchy)
                      lineHeight: 1.04,
                      letterSpacing: "-0.015em",
                      color: "var(--avt-txt)",
                      overflowWrap: "break-word", // long names (FutureProofing) wrap instead of bleeding into the wedge column
                    }}
                  >
                    {(() => {
                      const inner = v.gradFirst ? (
                        <>
                          <span className="avt-grad" style={{ fontWeight: 500 }}>{v.name.charAt(0)}</span>
                          {v.name.slice(1)}
                        </>
                      ) : (
                        // soft break at camelCase seams (Future​Proofing) so long
                        // one-word names wrap on a natural seam, never mid-word
                        v.name.replace(/([a-z])([A-Z])/g, "$1​$2")
                      );
                      return v.url ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${v.name} — visit site`}
                          style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "0.28em", flexWrap: "wrap" }}
                        >
                          {inner}
                          <span aria-hidden style={{ fontSize: "0.4em", color: v.spine[1], opacity: 0.9 }}>↗</span>
                        </a>
                      ) : inner;
                    })()}
                  </h3>
                </div>

                {/* right column — what it is, the wedge (verb chain), the signal */}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--avt-font-body)",
                      fontSize: "clamp(16px, 1.6vw, 20px)",
                      lineHeight: 1.5,
                      color: "var(--avt-txt)",
                      maxWidth: "46ch",
                    }}
                  >
                    {pick(v.what)}
                  </p>

                  {/* the AI wedge, shown as machine verbs in sequence */}
                  <div
                    className="avt-vert-wedge"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "12px",
                      marginTop: "20px",
                    }}
                  >
                    {wedge.map((step, si) => (
                      <span key={si} style={{ display: "inline-flex", alignItems: "baseline", gap: "12px" }}>
                        <span
                          className="avt-vert-step"
                          style={{
                            fontFamily: "var(--avt-font-mono)",
                            fontSize: "13px",
                            letterSpacing: "0.01em",
                            color: "var(--avt-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {step}
                        </span>
                        {si < wedge.length - 1 && (
                          <span
                            aria-hidden
                            className="avt-vert-arrow"
                            style={{ color: v.spine[1], fontSize: "13px", lineHeight: 1.5, opacity: 0.9 }}
                          >
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* stage meter — 4 segments filled to this venture's rank,
                      labelled with the current stage. Visual proof of the climb. */}
                  <div
                    className="avt-vert-meter"
                    style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "24px" }}
                  >
                    <div aria-hidden style={{ display: "flex", gap: "5px" }}>
                      {STAGES.map((_, si) => {
                        const filled = si < v.stage;
                        return (
                          <span
                            key={si}
                            style={{
                              width: "clamp(22px, 3vw, 40px)",
                              height: "4px",
                              borderRadius: "4px",
                              background: filled ? v.spine[1] : "var(--avt-hair-2, rgba(255,255,255,0.12))",
                              boxShadow: filled ? `0 0 10px ${v.spine[1]}66` : "none",
                              transition: `background 420ms ${ease} ${260 + i * 110 + si * 90}ms`,
                            }}
                          />
                        );
                      })}
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--avt-font-mono)",
                        fontSize: "12px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: v.spine[1],
                        fontWeight: 600,
                      }}
                    >
                      {pick(STAGES[v.stage - 1])}
                    </span>
                  </div>

                  {/* current signal — real traction only. Until a true signal
                      lands, the «REAL WORDS NEEDED» placeholder must NEVER render
                      to a live user (a builder brand showing a TODO disproves its
                      own thesis), so we hide the line entirely when unset. */}
                  {!pick(v.signal).trim().startsWith("«") && (
                    <p
                      style={{
                        margin: "12px 0 0 0",
                        fontFamily: "var(--avt-font-body)",
                        fontSize: "15px",
                        lineHeight: 1.55,
                        color: "var(--avt-muted)",
                        maxWidth: "52ch",
                      }}
                    >
                      {pick(v.signal)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* awareness-first text link — not a button */}
        <div
          style={{
            marginTop: "clamp(40px, 7vh, 72px)",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(12px)",
            transition: `opacity ${dur} ${ease} ${VENTURES.length * 110 + 120}ms, transform ${dur} ${ease} ${VENTURES.length * 110 + 120}ms`,
          }}
        >
          <a
            href="/portfolio"
            style={{
              fontFamily: "var(--avt-font-body)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "var(--avt-txt)",
              textDecoration: "none",
              borderBottom: "1px solid var(--avt-hair-2)",
              paddingBottom: "3px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {t("The same pattern, every time", "O mesmo padrão, sempre", "El mismo patrón, siempre")}
            <span className="avt-grad" aria-hidden style={{ fontWeight: 600 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
