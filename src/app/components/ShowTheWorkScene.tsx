import { useLanguage } from "@/app/hooks/useLanguage";
import { Reveal } from "@/app/components/Reveal";

// Beat — the quiet thesis line: "Anyone can fund one company. We are the engine
// behind many." Its radiate particle field was MOVED into the Venture Builder
// closing (beside "we build them AI-native"), so this is now a calm centered
// text beat over the shared AtmosphereField — no canvas. Prerender/a11y-safe
// (real DOM text, Reveal defaults visible under webdriver/reduced-motion).
export function ShowTheWorkScene() {
  const { language } = useLanguage();
  const t = (en: string, pt: string, es: string) => (language === "pt" ? pt : language === "es" ? es : en);
  const lead = t("Anyone can fund one company.", "Qualquer um financia uma empresa.", "Cualquiera financia una empresa.");
  const grad = t("We are the engine behind many.", "Nós somos o motor por trás de muitas.", "Somos el motor detrás de muchas.");

  return (
    <section
      aria-label={t("What venture building is", "O que é venture building", "Qué es venture building")}
      style={{
        position: "relative",
        minHeight: "62vh",
        width: "100%",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "var(--avt-section-pad) var(--avt-page-pad-x)",
      }}
    >
      <Reveal y={22}>
        <h2
          className="avt-display"
          style={{
            margin: "0 auto",
            fontSize: "clamp(28px, 4vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--avt-txt)",
            maxWidth: "20ch",
            textAlign: "center",
          }}
        >
          {lead} <span className="avt-grad">{grad}</span>
        </h2>
      </Reveal>
    </section>
  );
}
