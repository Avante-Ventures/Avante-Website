import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

// Beat — "Who we are." Four operators rendered as a FULL-BLEED image accordion:
// four big photos side by side; hover/focus (desktop) or tap (mobile) expands
// one and compresses the others, revealing that operator's track record + the
// companies they built/backed (text wordmarks). The team's pedigree is Avante's
// strongest asset, so it's the visual hero — show, don't tell.
// Brand-truth: facts verbatim, real affiliations, no invented metrics.
// AEO/a11y: all names, bios and companies live in the DOM always (detail is
// revealed by opacity, never removed); reduced-motion / prerender → static
// readable state (every panel shows its detail).
type Operator = {
  slug: string;
  name: string;
  linkedin: string;
  role: { en: string; pt: string; es: string };
  house: string;
  city: string;
  coord: string;
  accent: string;
  fact: { en: string; pt: string; es: string };
  companies: string[];
  // hero highlight — a real number where one exists, else the marquee affiliation
  highlight: { value: string; label: { en: string; pt: string; es: string } };
};

const OPERATORS: Operator[] = [
  {
    slug: "amanda",
    name: "Amanda Pinheiro",
    linkedin: "https://www.linkedin.com/in/amandafmpinheiro/",
    role: { en: "Co-Founder & Partner", pt: "Cofundadora e Sócia", es: "Cofundadora y Socia" },
    house: "Avante",
    city: "São Paulo",
    coord: "23°33′S",
    accent: "#a8429b",
    fact: {
      en: "CFO at Innova Capital & Unbox Capital — $500M+ under management. Investor Relations. CPA, Columbia University (USA).",
      pt: "CFO na Innova Capital e Unbox Capital — US$500M+ sob gestão. Investor Relations. CPA, Columbia University (EUA).",
      es: "CFO en Innova Capital y Unbox Capital — US$500M+ bajo gestión. Investor Relations. CPA, Columbia University (EE. UU.).",
    },
    companies: ["Innova Capital", "Unbox Capital"],
    highlight: { value: "$500M+", label: { en: "under management · CFO", pt: "sob gestão · CFO", es: "bajo gestión · CFO" } },
  },
  {
    slug: "felipe",
    name: "Felipe Moraes",
    linkedin: "https://www.linkedin.com/in/felipegrassidemoraes/",
    role: { en: "Strategic Partner", pt: "Sócio Estratégico", es: "Socio Estratégico" },
    house: "Avante",
    city: "São Paulo",
    coord: "23°33′S",
    accent: "#f4a93a",
    fact: {
      en: "Founder of Bamboo DCM (private credit) — R$850M+ transacted on the platform. Partner at Innova Capital.",
      pt: "Fundador da Bamboo DCM (crédito privado) — R$850M+ transacionados na plataforma. Sócio da Innova Capital.",
      es: "Fundador de Bamboo DCM (crédito privado) — R$850M+ transaccionados en la plataforma. Socio de Innova Capital.",
    },
    companies: ["Bamboo DCM", "Innova Capital"],
    highlight: { value: "R$850M+", label: { en: "transacted on Bamboo DCM", pt: "transacionados na Bamboo DCM", es: "transaccionados en Bamboo DCM" } },
  },
  {
    slug: "jess",
    name: "Jess Mah",
    linkedin: "https://www.linkedin.com/in/jessicamah/",
    role: { en: "Partner & Co-Founder", pt: "Sócia e Cofundadora", es: "Socia y Cofundadora" },
    house: "Mahway",
    city: "Silicon Valley",
    coord: "37°23′N",
    accent: "#ec5f72",
    fact: {
      en: "Co-founder of Mahway. Founder of inDinero (YC). Forbes 30 Under 30 · YPO · Berkeley & Harvard.",
      pt: "Cofundadora da Mahway. Fundadora da inDinero (YC). Forbes 30 Under 30 · YPO · Berkeley e Harvard.",
      es: "Cofundadora de Mahway. Fundadora de inDinero (YC). Forbes 30 Under 30 · YPO · Berkeley y Harvard.",
    },
    companies: ["Mahway", "inDinero", "Forbes 30 Under 30", "YPO"],
    highlight: { value: "200+", label: { en: "inDinero clients · YC ’12", pt: "clientes da inDinero · YC ’12", es: "clientes de inDinero · YC ’12" } },
  },
  {
    slug: "andrea",
    name: "Andrea Barrica",
    linkedin: "https://www.linkedin.com/in/abarrica/",
    role: { en: "Partner & Co-Founder", pt: "Sócia e Cofundadora", es: "Socia y Cofundadora" },
    house: "Mahway",
    city: "Silicon Valley",
    coord: "37°23′N",
    accent: "#8b8ed8",
    fact: {
      en: "Co-founder of Mahway. Former VP at 500 Global; founder & CEO of O.school.",
      pt: "Cofundadora da Mahway. Ex-VP na 500 Global; fundadora e CEO da O.school.",
      es: "Cofundadora de Mahway. Ex-VP en 500 Global; fundadora y CEO de O.school.",
    },
    companies: ["Mahway", "500 Global", "O.school"],
    highlight: { value: "$100M+", label: { en: "USD coached", pt: "USD em coaching", es: "USD en coaching" } },
  },
];

// Company wordmark-chips link out to the real company when a URL exists.
// Chips with no entry here (e.g. Bamboo DCM) render as plain, non-linked text.
const COMPANY_URLS: Record<string, string> = {
  "Innova Capital": "https://www.innovacapital.com.br/",
  "Unbox Capital": "https://www.unboxcapital.com/en",
  "Mahway": "https://mahway.com/",
  "inDinero": "https://www.indinero.com/",
  "500 Global": "https://500.co/",
  "O.school": "https://www.o.school/",
  "Forbes 30 Under 30": "https://www.forbes.com/profile/jessica-ma/",
  "YPO": "https://www.ypo.org/",
};

export function WhoWeAreScene() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement | null>(null);

  const isStatic = () => {
    if (typeof window === "undefined") return true;
    const r = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    return Boolean(r || wd);
  };

  const [shown, setShown] = useState<boolean>(() => isStatic());
  const [small, setSmall] = useState(false);
  const [staticAll, setStaticAll] = useState<boolean>(() => isStatic());
  const [active, setActive] = useState<number>(0); // first founder open by default (instant pedigree)

  useEffect(() => {
    setStaticAll(isStatic());
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track the mobile breakpoint REACTIVELY. A one-time matchMedia read would
  // strand the layout in its mount-time state, so on device rotation / window
  // resize across 760px the column panels (flex-basis:auto + explicit height)
  // would collapse to ~2px. Re-reading on change keeps the accordion correct
  // and resets to the first-open default whenever the mode flips.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const apply = () => { setSmall(mq.matches); setActive(0); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const t = (en: string, pt: string, es: string) => (language === "pt" ? pt : language === "es" ? es : en);
  const tl = (o: { en: string; pt: string; es: string }) => (language === "pt" ? o.pt : language === "es" ? o.es : o.en);

  const ease = "var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1))";
  const dur = "var(--avt-dur-reveal, 560ms)";

  // flex-grow per panel: hovered grows, others compress; null = all equal.
  const growFor = (i: number) => {
    if (staticAll) return 1;
    return active === i ? 3.2 : 0.62;
  };
  // a panel shows its detail when it's active, or in the static fallback.
  const open = (i: number) => staticAll || active === i;

  return (
    <section
      aria-label={t("Who we are", "Quem somos", "Quiénes somos")}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0" }}
    >
      <style>{`
        .avt-fa-row { display: flex; flex-direction: row; }
        .avt-fa-panel { transition: flex-grow 520ms ${ease}; }
        .avt-fa-detail { transition: opacity 460ms ${ease}, transform 460ms ${ease}; }
        @media (max-width: 760px) {
          .avt-fa-row { flex-direction: column; }
          .avt-fa-panel { transition: height 460ms ${ease}; }
        }
      `}</style>

      <div ref={ref}>
        {/* Masthead */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
          <div
            style={{
              maxWidth: "62ch",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(18px)",
              transition: `opacity ${dur} ${ease}, transform ${dur} ${ease}`,
            }}
          >
            <div className="avt-lbl" style={{ marginBottom: "18px" }}>{t("WHO WE ARE", "QUEM SOMOS", "QUIÉNES SOMOS")}</div>
            <h2 style={{ margin: 0, fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(30px, 4.4vw, 60px)", lineHeight: 1.04, letterSpacing: "-0.015em", color: "var(--avt-txt)" }}>
              {t("Four operators.", "Quatro operadores.", "Cuatro operadores.")}{" "}
              <span className="avt-grad">{t("One conclusion.", "Uma conclusão.", "Una conclusión.")}</span>
            </h2>
            <p style={{ margin: "20px 0 0", fontFamily: "var(--avt-font-body)", color: "var(--avt-muted)", fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.65, maxWidth: "52ch" }}>
              {t(
                "They met in 2024 — Silicon Valley and São Paulo — and landed on the same conviction about building AI-native companies in Brazil.",
                "Encontraram-se em 2024 — Vale do Silício e São Paulo — e chegaram à mesma convicção sobre construir empresas nativas de IA no Brasil.",
                "Se conocieron en 2024 — Silicon Valley y São Paulo — y llegaron a la misma convicción sobre construir empresas nativas de IA en Brasil."
              )}
            </p>
          </div>
        </div>

        {/* Full-bleed accordion */}
        <div
          className="avt-fa-row"
          onMouseLeave={() => { if (!small) setActive(0); }}
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginTop: "clamp(36px, 6vh, 72px)",
            gap: "3px",
          }}
        >
          {OPERATORS.map((o, i) => {
            const isOpen = open(i);
            const detailId = `fa-detail-${o.slug}`;
            return (
              // role=group, NOT a button — a button must not wrap the inner
              // LinkedIn/company <a>s (WCAG 4.1.2). Pointer users still expand by
              // hovering/clicking the panel; keyboard/SR users use the toggle
              // button below (aria-expanded). Open-on-focus is removed.
              <div
                key={o.slug}
                className="avt-fa-panel"
                role="group"
                aria-label={`${o.name} — ${tl(o.role)}`}
                onMouseEnter={() => { if (!small) setActive(i); }}
                onClick={() => setActive(i)}
                style={{
                  position: "relative",
                  flexGrow: small ? 0 : growFor(i),
                  flexShrink: 0,
                  flexBasis: small ? "auto" : 0,
                  height: small ? (isOpen ? "clamp(420px, 64vh, 560px)" : "88px") : "clamp(440px, 72vh, 780px)",
                  minWidth: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  outline: "none",
                  borderTop: `2px solid ${isOpen ? o.accent : "transparent"}`,
                  // staggered entrance on scroll-into-view (#6)
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(26px)",
                  transition:
                    `${small ? `height 460ms ${ease}` : `flex-grow 520ms ${ease}`}` +
                    `, opacity 640ms ${ease} ${i * 90}ms, transform 640ms ${ease} ${i * 90}ms`,
                }}
              >
                {/* the real, announced toggle (keyboard/SR path) — a "+" that
                    becomes "×" when open. aria-expanded + aria-controls make the
                    disclosure legible to assistive tech. */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  aria-label={`${isOpen ? t("Collapse", "Recolher", "Contraer") : t("Expand", "Expandir", "Expandir")} ${o.name}`}
                  onClick={(e) => { e.stopPropagation(); setActive(isOpen ? -1 : i); }}
                  style={{
                    position: "absolute",
                    top: "clamp(14px, 1.6vw, 22px)",
                    right: "clamp(14px, 1.6vw, 22px)",
                    zIndex: 4,
                    width: "28px",
                    height: "28px",
                    borderRadius: "999px",
                    border: `1px solid ${o.accent}aa`,
                    color: o.accent,
                    display: "grid",
                    placeItems: "center",
                    fontSize: "18px",
                    lineHeight: 1,
                    padding: 0,
                    cursor: "pointer",
                    background: "rgba(6,7,13,0.35)",
                    backdropFilter: "blur(2px)",
                    opacity: isOpen ? 0.6 : 0.9,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: `opacity 360ms ${ease}, transform 360ms ${ease}`,
                  }}
                >
                  +
                </button>
                {/* photo */}
                <img
                  src={`/redesign-assets/team-${o.slug}.webp`}
                  alt={o.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 22%",
                    // Unifying grade: the four source photos come from very
                    // different shoots (studio grey, cream wall, dark editorial,
                    // outdoor daylight). A common warm-desaturated grade — kept
                    // even when open — pulls them toward one editorial register
                    // instead of reading as four stock pulls.
                    filter: isOpen
                      ? "saturate(0.82) contrast(1.06) brightness(0.92) sepia(0.14)"
                      : "grayscale(0.6) contrast(1.05) brightness(0.66) sepia(0.12)",
                    transition: `filter 520ms ${ease}`,
                  }}
                />
                {/* unifying overlay — warm vignette so the disparate backgrounds
                    recede uniformly (edges darken, a faint common warmth on top). */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(120% 80% at 50% 26%, rgba(6,7,13,0) 44%, rgba(6,7,13,0.46) 100%), linear-gradient(0deg, rgba(36,20,8,0.10), rgba(36,20,8,0.10))",
                  }}
                />
                {/* scrim for legibility */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, rgba(6,7,13,0.92) 0%, rgba(6,7,13,0.55) 30%, rgba(6,7,13,0.05) 60%, rgba(6,7,13,0) 100%)`,
                  }}
                />

                {/* bottom content */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "clamp(18px, 2.2vw, 34px)",
                  }}
                >
                  <div className="avt-lbl" style={{ color: o.accent, marginBottom: "10px", opacity: isOpen ? 1 : 0.85 }}>
                    {o.city.toUpperCase()}
                  </div>
                  <h3 style={{ margin: 0, fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(20px, 2vw, 30px)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--avt-txt)", whiteSpace: "nowrap" }}>
                    <a
                      href={o.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${o.name} on LinkedIn`}
                      // panel is click-to-open: when closed, the name click opens it
                      // (no nav); when open, it navigates to LinkedIn. stopPropagation
                      // keeps the parent toggle from also firing.
                      onClick={(e) => { e.stopPropagation(); if (!isOpen) { e.preventDefault(); setActive(i); } }}
                      style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "baseline", gap: "8px" }}
                    >
                      {o.name}
                      <span aria-hidden style={{ fontSize: "0.52em", color: o.accent, opacity: isOpen ? 0.85 : 0, transition: `opacity 320ms ${ease}` }}>↗</span>
                    </a>
                  </h3>

                  {/* detail (revealed when open; always in DOM for AEO, but
                      aria-hidden + non-focusable links when collapsed so SR and
                      keyboard users don't hit invisible content) */}
                  <div
                    id={detailId}
                    className="avt-fa-detail"
                    aria-hidden={!isOpen}
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(10px)",
                      maxWidth: "44ch",
                      pointerEvents: isOpen ? "auto" : "none",
                    }}
                  >
                    {/* hero highlight — scannable pedigree (#3) */}
                    <div style={{ marginTop: "10px", display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--avt-font-serif)", fontWeight: 600, fontSize: "clamp(30px, 3.4vw, 52px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: o.accent }}>
                        {o.highlight.value}
                      </span>
                      <span style={{ fontFamily: "var(--avt-font-body)", fontSize: "13px", color: "var(--avt-muted)", letterSpacing: "0.01em" }}>
                        {tl(o.highlight.label)}
                      </span>
                    </div>
                    <div className="avt-grad" style={{ marginTop: "12px", fontFamily: "var(--avt-font-body)", fontSize: "13.5px", fontWeight: 600, letterSpacing: "0.01em" }}>
                      {tl(o.role)} · {o.house}
                    </div>
                    <p style={{ margin: "12px 0 0", fontFamily: "var(--avt-font-body)", color: "var(--avt-txt)", fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.55 }}>
                      {tl(o.fact)}
                    </p>
                    {/* company wordmark-chips — link out when a URL exists */}
                    <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {o.companies.map((c) => {
                        const href = COMPANY_URLS[c];
                        const chipStyle: React.CSSProperties = {
                          fontFamily: "var(--avt-font-mono, var(--avt-font-body))",
                          fontSize: "11.5px",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--avt-txt)",
                          border: `1px solid ${o.accent}66`,
                          borderRadius: "999px",
                          padding: "5px 11px",
                          background: `${o.accent}1a`,
                          whiteSpace: "nowrap",
                        };
                        return href ? (
                          <a
                            key={c}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            tabIndex={isOpen ? 0 : -1}
                            onClick={(e) => e.stopPropagation()}
                            onMouseEnter={(e) => { e.currentTarget.style.background = `${o.accent}33`; e.currentTarget.style.borderColor = o.accent; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = `${o.accent}1a`; e.currentTarget.style.borderColor = `${o.accent}66`; }}
                            style={{ ...chipStyle, textDecoration: "none", cursor: "pointer", transition: `background 220ms ${ease}, border-color 220ms ${ease}` }}
                          >
                            {c}
                          </a>
                        ) : (
                          <span key={c} style={chipStyle}>{c}</span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge — closing editorial line */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)" }}>
          <div
            style={{
              marginTop: "clamp(48px, 8vh, 96px)",
              textAlign: "center",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(18px)",
              transition: `opacity ${dur} ${ease} 200ms, transform ${dur} ${ease} 200ms`,
            }}
          >
            <span className="avt-grad" style={{ fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(24px, 3.6vw, 50px)", letterSpacing: "-0.015em", lineHeight: 1.12 }}>
              {t("The strongest team betting on Brazil.", "O time mais forte apostando no Brasil.", "El mejor equipo apostando por Brasil.")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
