import { useLanguage } from "@/app/hooks/useLanguage";
import { AvtCord } from "@/app/components/AvtCord";

// Scene 1 — Orientation. The quiet breath after the convergence hero.
// One statement of what Avante is + where. Sets the documentary genre and
// the loud→quiet pacing. Static, prerender-safe, no WebGL.
// «REAL WORDS NEEDED»: Felipe/Amanda's own one-line definition of Avante and
// the literal SP/SF setup (studio? office? headcount per city?) before ship.
export function OrientationScene() {
  const { language } = useLanguage();

  const kicker =
    language === "pt" ? "01 — ORIENTAÇÃO" : language === "es" ? "01 — ORIENTACIÓN" : "01 — ORIENTATION";

  const statement =
    language === "pt" ? (
      <>
        A Avante é um <span className="avt-grad">venture builder</span> liderado por operadores. Começamos
        empresas e apoiamos fundadores — de <span className="avt-grad">São Paulo</span> e{" "}
        <span className="avt-grad">San Francisco</span>, cinco horas de distância, uma só empresa.
      </>
    ) : language === "es" ? (
      <>
        Avante es un <span className="avt-grad">venture builder</span> liderado por operadores. Creamos
        empresas y respaldamos fundadores — desde <span className="avt-grad">São Paulo</span> y{" "}
        <span className="avt-grad">San Francisco</span>, cinco horas de diferencia, una sola empresa.
      </>
    ) : (
      <>
        Avante is an operator-led <span className="avt-grad">venture builder</span>. We start companies and
        back founders — from <span className="avt-grad">São Paulo</span> and{" "}
        <span className="avt-grad">San Francisco</span>, five hours apart, one company.
      </>
    );

  return (
    <section
      aria-label={kicker}
      style={{
        position: "relative",
        width: "100%",
        background: "transparent",
        padding: "var(--avt-section-pad) 0",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
        <div
          className="avt-lbl"
          style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "clamp(28px, 5vh, 56px)" }}
        >
          <span aria-hidden style={{ width: "24px", height: "2px", background: "var(--avt-grad)", display: "inline-block" }} />
          <span>{kicker}</span>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: "var(--avt-font-serif)",
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 46px)",
            lineHeight: 1.3,
            letterSpacing: "-0.005em",
            color: "rgba(238,240,247,0.82)",
            maxWidth: "20em",
          }}
        >
          {statement}
        </p>

        <div
          style={{
            marginTop: "clamp(40px, 7vh, 72px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 240px", minWidth: "160px" }}>
            <AvtCord width="42%" />
          </div>
          <span className="avt-lbl" style={{ letterSpacing: "0.24em", whiteSpace: "nowrap" }}>
            SÃO PAULO · SAN FRANCISCO
          </span>
        </div>
      </div>
    </section>
  );
}
