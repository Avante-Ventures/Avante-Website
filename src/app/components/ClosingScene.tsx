import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

// Beat — Quiet close / "we think in public." The dawn payoff at the end of the
// scroll-film: this is the warmest, brightest point of the continuous backdrop,
// so the <section> stays transparent and only adds a faint warm radial glow
// (gold→coral, very low opacity) under the type. AWARENESS-FIRST — no pitch, no
// founder/LP ask. One primary focal area (the monthly memo + the library), with
// a whisper-level partners/press mailto degraded below it. Reveal-on-scroll
// mirrors DualityScene's `shown` pattern exactly (defaults shown=true under
// reduced-motion / webdriver so prerender + a11y get the static end-state).
// Copy is editorial placeholder; the sign-off needs Felipe/Amanda's real words.
export function ClosingScene() {
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
  // Staggered upward reveal — one shared vocabulary, delayed per layer so the
  // eye lands on the memo/library first and the secondaries settle after.
  const rise = (delay = 0): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(16px)",
    transition: `opacity ${dur} ${ease} ${delay}ms, transform ${dur} ${ease} ${delay}ms`,
  });

  return (
    <section
      id="contact"
      aria-label={t("We think in public", "Pensamos em público", "Pensamos en público")}
      style={{ position: "relative", width: "100%", background: "transparent", padding: "var(--avt-section-pad) 0", overflow: "hidden" }}
    >
      <style>{`
        .avt-close-link {
          position: relative;
          font-family: var(--avt-font-serif);
          color: var(--avt-txt);
          text-decoration: none;
          white-space: nowrap;
          background-image: var(--avt-grad-line, linear-gradient(90deg, #f4a93a, #ec5f72, #a8429b));
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 2px;
          transition: background-size 360ms var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1)), color 360ms var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1));
          padding-bottom: 3px;
        }
        .avt-close-link:hover,
        .avt-close-link:focus-visible {
          background-size: 100% 2px;
        }
        .avt-close-arrow {
          display: inline-block;
          transition: transform 360ms var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1));
        }
        .avt-close-link:hover .avt-close-arrow,
        .avt-close-link:focus-visible .avt-close-arrow {
          transform: translateX(5px);
        }
        .avt-close-press {
          font-family: var(--avt-font-mono);
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--avt-meta);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: color 280ms var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1)), border-color 280ms var(--avt-ease-out, cubic-bezier(0.16,1,0.3,1));
        }
        .avt-close-press:hover,
        .avt-close-press:focus-visible {
          color: var(--avt-muted);
          border-bottom-color: var(--avt-hair-2);
        }
        @media (max-width: 760px) {
          .avt-close-wrap { text-align: left !important; }
          .avt-close-memo { font-size: clamp(28px, 9vw, 40px) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .avt-close-link, .avt-close-arrow, .avt-close-press { transition: none !important; }
        }
      `}</style>

      {/* Local warm glow — the dawn. Gold core bleeding into coral, very low
          opacity so it only lifts the backdrop rather than introducing a fill.
          Pinned behind the type and fading in with the scene. NO cyan. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "38%",
          width: "min(900px, 120vw)",
          height: "min(900px, 120vw)",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(244,169,58,0.10) 0%, rgba(236,95,114,0.06) 34%, rgba(236,95,114,0) 68%)",
          opacity: shown ? 1 : 0,
          transition: `opacity var(--avt-dur-spatial, 900ms) ${ease}`,
          pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        className="avt-close-wrap"
        style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 var(--avt-page-pad-x)", textAlign: "center" }}
      >
        {/* collective track-record bridge — the ONE aggregate stat (per-founder
            record lives in the founders accordion). Leads into the finale. */}
        <div style={{ ...rise(0), marginBottom: "clamp(40px, 7vh, 80px)" }}>
          <div style={{ margin: "0 auto", maxWidth: "20ch", fontFamily: "var(--avt-font-serif)", fontWeight: 500, fontSize: "clamp(28px, 4.6vw, 58px)", lineHeight: 1.04, letterSpacing: "-0.02em", color: "var(--avt-txt)" }}>
            <span className="avt-grad">$500M+</span>{" "}
            {t("deployed across 20+ companies.", "investidos em 20+ empresas.", "desplegados en 20+ empresas.")}
          </div>
          <div style={{ marginTop: "14px", fontFamily: "var(--avt-font-body)", fontSize: "clamp(14px, 1.4vw, 17px)", color: "var(--avt-muted)" }}>
            {t("By the same hands now building Avante.", "Pelas mesmas mãos que agora constroem a Avante.", "Por las mismas manos que ahora construyen Avante.")}
          </div>
        </div>

        <div className="avt-lbl" style={{ ...rise(120), marginBottom: "clamp(28px, 5vh, 48px)" }}>
          {t("§ — CLOSE", "§ — ENCERRAMENTO", "§ — CIERRE")}
        </div>

        {/* Human sign-off — editorial, collective (unattributed) brand voice. */}
        <p
          style={{
            ...rise(80),
            margin: "0 auto",
            maxWidth: "30ch",
            fontFamily: "var(--avt-font-serif)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(19px, 2.4vw, 27px)",
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
            color: "var(--avt-muted)",
          }}
        >
          {t(
            "We don't pitch. We build in the open — and let the work compound.",
            "Não fazemos pitch. Construímos à vista de todos — e deixamos o trabalho compor.",
            "No hacemos pitch. Construimos a la vista de todos — y dejamos que el trabajo componga."
          )}
        </p>

        {/* Primary focal area — "We think in public." + the memo + the library.
            This is the one thing the closing frame asks of the reader. */}
        <div style={{ ...rise(180), marginTop: "clamp(44px, 8vh, 88px)" }}>
          <h2
            className="avt-close-memo"
            style={{
              margin: 0,
              fontFamily: "var(--avt-font-serif)",
              fontWeight: 500,
              fontSize: "clamp(34px, 6vw, 76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--avt-txt)",
            }}
          >
            {t("We think in public.", "Pensamos em público.", "Pensamos en público.")}
          </h2>

          {/* Memo subscribe — the single primary action, an editorial gradient-
              underline link, not a button. Opens Substack in a new tab. */}
          <p style={{ margin: "clamp(28px, 5vh, 44px) 0 0", fontFamily: "var(--avt-font-body)", fontSize: "clamp(17px, 1.6vw, 21px)", lineHeight: 1.6, color: "var(--avt-txt)" }}>
            <a
              className="avt-close-link"
              href="https://avanteventures.substack.com"
              target="_blank"
              rel="noopener"
            >
              {t("Subscribe to the weekly memo", "Assine o memo semanal", "Suscríbete al memo semanal")}
              {" "}
              <span className="avt-close-arrow" aria-hidden>→</span>
            </a>
          </p>
          <p className="avt-lbl" style={{ marginTop: "14px", textTransform: "none", letterSpacing: "0.02em", color: "var(--avt-meta)" }}>
            {t(
              "One email a week. No spam. Unsubscribe anytime.",
              "Um email por semana. Sem spam. Cancele quando quiser.",
              "Un email a la semana. Sin spam. Cancela cuando quieras."
            )}
          </p>

          {/* Read the library — the secondary read, same link grammar. Locale-
              prefixed so the /:locale router does not redirect it home. */}
          <p style={{ margin: "clamp(24px, 4vh, 36px) 0 0", fontFamily: "var(--avt-font-body)", fontSize: "16px", lineHeight: 1.6 }}>
            <a className="avt-close-link" href={`/${language}/library`}>
              {t("Read the library", "Ler a biblioteca", "Leer la biblioteca")}
              {" "}
              <span className="avt-close-arrow" aria-hidden>→</span>
            </a>
          </p>
        </div>

        {/* Whisper-level partners & press door — lowest contrast, degraded last.
            A quiet mono mailto, not a focal point. */}
        <div style={{ ...rise(300), marginTop: "clamp(56px, 10vh, 104px)" }}>
          <a className="avt-close-press" href="mailto:cristian@avanteventures.com">
            {t("partners & press", "parcerias & imprensa", "alianzas & prensa")}
            {" — cristian@avanteventures.com"}
          </a>
        </div>
      </div>
    </section>
  );
}
