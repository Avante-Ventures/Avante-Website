import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";
import { Reveal } from "@/app/components/Reveal";

// Scene 5 — Track record (a ledger that COMPOUNDS). A chronological "career
// ledger": the year is the spine, the figure is the star. The numbers now
// PERFORM — each figure counts up from zero when it scrolls into view, and a
// gradient spine on the left fills top→bottom as you read down the ledger
// (2014 → today): "build to compound" made literal, not a fake unified value
// axis (4× and $500M live in different units — never implied on one scale).
// Reconciled, audit-safe figures only (Sigga 10×, Accera 4×) — never the
// contradictory 11× / 5×. Count-up + spine are gated: reduced-motion /
// prerender (navigator.webdriver) → final values + full spine instantly.
// «REAL WORDS NEEDED»: confirm the exact iFood involvement verb + a one-line
// humble sign-off before ship.

type Row = { tick: string; figure: string; grad?: boolean; ctx: { en: string; pt: string; es: string } };

const ROWS: Row[] = [
  {
    tick: "2014 · INNOVA ERA",
    figure: "iFood",
    ctx: {
      en: "Backed iFood through Innova — pre-unicorn, when the bet still looked early.",
      pt: "Apostamos no iFood via Innova — pré-unicórnio, quando ainda parecia cedo.",
      es: "Apostamos por iFood vía Innova — pre-unicornio, cuando aún parecía temprano.",
    },
  },
  {
    tick: "2019 · INNOVA ERA",
    figure: "4×",
    ctx: {
      en: "Accera returned 4× MOI — retail execution software, scaled and sold.",
      pt: "A Accera retornou 4× MOI — software de execução no varejo, escalado e vendido.",
      es: "Accera devolvió 4× MOI — software de ejecución en retail, escalado y vendido.",
    },
  },
  {
    tick: "2021 · EXIT",
    figure: "10×",
    ctx: {
      en: "Sigga Technologies — 10× at exit. Amanda sat on the board through scale.",
      pt: "Sigga Technologies — 10× na saída. Amanda no conselho durante a escala.",
      es: "Sigga Technologies — 10× en la salida. Amanda en el directorio durante la escala.",
    },
  },
  {
    tick: "TO DATE",
    figure: "$500M+",
    ctx: {
      en: "Deployed across 20+ companies — before any of us started Avante.",
      pt: "Investidos em 20+ empresas — antes de qualquer um de nós iniciar a Avante.",
      es: "Desplegados en 20+ empresas — antes de que ninguno iniciara Avante.",
    },
  },
  {
    tick: "2024 · AVANTE",
    figure: "4",
    grad: true,
    ctx: {
      en: "AI-native ventures underway — the same operators, now building from Brazil.",
      pt: "4 ventures AI-native em andamento — os mesmos operadores, agora construindo do Brasil.",
      es: "4 ventures AI-native en marcha — los mismos operadores, ahora construyendo desde Brasil.",
    },
  },
];

// Brand gradient stops (gold → coral → mauve → indigo), same vocabulary as the
// hero "A" and AtmosphereField — used for the vertical compounding spine.
const SPINE_GRADIENT = "linear-gradient(180deg, #f4a93a 0%, #ec5f72 38%, #a8429b 68%, #3a2f8f 100%)";

const prefersStatic = () => {
  if (typeof window === "undefined") return true;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
  return Boolean(reduce || wd);
};

// Split "$500M+" → { prefix:"$", value:500, suffix:"M+" }. Non-numeric
// figures (e.g. "iFood") return null and render verbatim, no count-up.
function parseFigure(figure: string) {
  const m = figure.match(/^(\D*)(\d+)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], value: parseInt(m[2], 10), suffix: m[3] };
}

// The star figure. Numeric figures count up from zero the first time they
// enter view; the RAF stops at t=1 (no idle loop). Static when reduced-motion
// or prerendered, so crawlers/a11y see the real number immediately (AEO-safe).
function Figure({ figure, grad }: { figure: string; grad?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const parsed = parseFigure(figure);
  const [display, setDisplay] = useState<string>(() =>
    !parsed || prefersStatic() ? figure : `${parsed.prefix}0${parsed.suffix}`
  );

  useEffect(() => {
    if (!parsed || prefersStatic()) {
      setDisplay(figure);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const DURATION = 1400;
    const animate = (startTime: number) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - startTime) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${parsed.prefix}${Math.round(parsed.value * eased)}${parsed.suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            animate(performance.now());
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figure]);

  return (
    <div
      ref={ref}
      className={grad ? "tr-fig avt-grad" : "tr-fig"}
      style={{
        fontFamily: "var(--avt-font-serif)",
        fontWeight: 500,
        fontSize: "clamp(40px, 6.4vw, 88px)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        fontVariantNumeric: "tabular-nums",
        color: grad ? undefined : "var(--avt-txt)",
      }}
    >
      {display}
    </div>
  );
}

export function TrackRecordLedger() {
  const { language } = useLanguage();
  const pick = (c: Row["ctx"]) => (language === "pt" ? c.pt : language === "es" ? c.es : c.en);
  const eyebrow =
    language === "pt"
      ? "ANTES DA AVANTE — O HISTÓRICO DOS OPERADORES"
      : language === "es"
        ? "ANTES DE AVANTE — EL HISTORIAL DE LOS OPERADORES"
        : "BEFORE AVANTE — THE OPERATORS' RECORD";

  // Compounding spine: a vertical gradient line that fills top→bottom as the
  // ledger scrolls through the viewport — accumulation over time. Scroll-linked
  // via direct DOM (no re-renders), same family as AtmosphereField. Static fill
  // when reduced-motion / prerendered.
  const dlRef = useRef<HTMLDListElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dl = dlRef.current;
    const fill = fillRef.current;
    if (!dl || !fill) return;
    if (prefersStatic()) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = dl.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85; // begin filling when the ledger top reaches 85% down
        const end = vh * 0.4; // full once it has scrolled to 40%
        const span = rect.height + (start - end);
        const p = span > 0 ? (start - rect.top) / span : 0;
        fill.style.transform = `scaleY(${Math.min(1, Math.max(0, p)).toFixed(3)})`;
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
    <section
      aria-label={eyebrow}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0" }}
    >
      <style>{`
        .tr-row {
          display: grid;
          grid-template-columns: minmax(130px, 220px) 1fr;
          gap: clamp(20px, 5vw, 64px);
          align-items: baseline;
          padding: clamp(26px, 4.5vh, 48px) 0;
          border-bottom: 1px solid var(--avt-hair);
        }
        @media (max-width: 640px) {
          .tr-row { grid-template-columns: 1fr; gap: 10px; align-items: start; }
          .tr-row .avt-lbl { padding-top: 0 !important; }
          .tr-fig { font-size: clamp(52px, 17vw, 80px) !important; }
        }
      `}</style>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        <Reveal>
          <div className="avt-lbl" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(40px, 7vh, 80px)" }}>
            <span aria-hidden style={{ width: "24px", height: "2px", background: "var(--avt-grad)", display: "inline-block" }} />
            <span>{eyebrow}</span>
          </div>
        </Reveal>

        <dl ref={dlRef} style={{ position: "relative", margin: 0, paddingLeft: "clamp(18px, 2.4vw, 30px)", borderTop: "1px solid var(--avt-hair)" }}>
          {/* compounding spine — faint track + scroll-filled gradient */}
          <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "var(--avt-hair-2)" }} />
          <div
            ref={fillRef}
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              transformOrigin: "top",
              transform: "scaleY(0)",
              background: SPINE_GRADIENT,
            }}
          />

          {ROWS.map((r, i) => (
            <Reveal key={r.tick} delay={i * 90} className="tr-row">
              <dt className="avt-lbl" style={{ letterSpacing: "0.18em", opacity: 0.8, paddingTop: "0.6em" }}>
                {r.tick}
              </dt>
              <dd style={{ margin: 0 }}>
                <Figure figure={r.figure} grad={r.grad} />
                <p
                  style={{
                    margin: "16px 0 0 0",
                    fontFamily: "var(--avt-font-body)",
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    lineHeight: 1.6,
                    color: "var(--avt-muted)",
                    maxWidth: "44ch",
                  }}
                >
                  {pick(r.ctx)}
                </p>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
