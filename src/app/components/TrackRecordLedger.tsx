import { useLanguage } from "@/app/hooks/useLanguage";
import { Reveal } from "@/app/components/Reveal";

// Scene 5 — Track record (quiet ledger). A chronological "career ledger":
// the year is the spine, the figure is the star, no count-up animation.
// Only the cumulative $500M+ line gets the brand gradient. Reconciled,
// audit-safe figures only (Sigga 10×, Accera 4×) — never the contradictory
// 11× / 5×. «REAL WORDS NEEDED»: confirm the exact iFood involvement verb +
// a one-line humble sign-off before ship.

type Row = { tick: string; figure: string; grad?: boolean; ctx: { en: string; pt: string; es: string } };

const ROWS: Row[] = [
  {
    tick: "2014 · INNOVA ERA",
    figure: "iFood",
    ctx: {
      en: "Backed iFood before it was iFood — pre-unicorn, when the bet still looked early.",
      pt: "Apostamos no iFood antes de ele ser o iFood — pré-unicórnio, quando ainda parecia cedo.",
      es: "Apostamos por iFood antes de ser iFood — pre-unicornio, cuando aún parecía temprano.",
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
    grad: true,
    ctx: {
      en: "Deployed across 20+ companies — by the same people now building Avante.",
      pt: "Investidos em 20+ empresas — pelas mesmas pessoas que agora constroem a Avante.",
      es: "Desplegados en 20+ empresas — por las mismas personas que ahora construyen Avante.",
    },
  },
];

export function TrackRecordLedger() {
  const { language } = useLanguage();
  const pick = (c: Row["ctx"]) => (language === "pt" ? c.pt : language === "es" ? c.es : c.en);
  const eyebrow =
    language === "pt"
      ? "O QUE NOSSO TIME CONSTRUIU — E SAIU"
      : language === "es"
        ? "LO QUE NUESTRO EQUIPO CONSTRUYÓ — Y VENDIÓ"
        : "WHAT OUR TEAM BUILT — AND EXITED";

  return (
    <section
      aria-label={eyebrow}
      style={{ position: "relative", width: "100%", background: "var(--avt-ink)", padding: "clamp(96px, 16vh, 180px) 0" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        <Reveal>
          <div className="avt-lbl" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(40px, 7vh, 80px)" }}>
            <span aria-hidden style={{ width: "24px", height: "2px", background: "var(--avt-grad)", display: "inline-block" }} />
            <span>{eyebrow}</span>
          </div>
        </Reveal>

        <dl style={{ margin: 0, borderTop: "1px solid var(--avt-hair)" }}>
          {ROWS.map((r, i) => (
            <Reveal
              key={r.tick}
              delay={i * 90}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(130px, 220px) 1fr",
                gap: "clamp(20px, 5vw, 64px)",
                alignItems: "baseline",
                padding: "clamp(26px, 4.5vh, 48px) 0",
                borderBottom: "1px solid var(--avt-hair)",
              }}
            >
              <dt className="avt-lbl" style={{ letterSpacing: "0.18em", opacity: 0.8, paddingTop: "0.6em" }}>
                {r.tick}
              </dt>
              <dd style={{ margin: 0 }}>
                <div
                  className={r.grad ? "avt-grad" : undefined}
                  style={{
                    fontFamily: "var(--avt-font-serif)",
                    fontWeight: 500,
                    fontSize: "clamp(40px, 6.4vw, 88px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                    color: r.grad ? undefined : "var(--avt-txt)",
                  }}
                >
                  {r.figure}
                </div>
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
