// HeroV2A_Masthead — Phase D.5 editorial refactor.
//
// Two big shifts vs rev a3:
//
// 1) ESTÉTICA EDITORIAL. The hero now belongs to the same design vocabulary
//    as the rest of the site:
//      • Background goes transparent (the body's ink takes over) — drops
//        the legacy `#0E1428` dark navy.
//      • Soft brand glow corners switch to the new orange→pink→purple
//        gradient palette (subtle: opacity ~12% behind blur 100px).
//      • Masthead dateline uses JetBrains Mono with 0.22em tracking and
//        the gold-dot signature.
//      • The bitmap `avanteLogo` is replaced by `AvanteLockup` size="lg" —
//        gradient "A" mark + Funnel Display "vante" wordmark, vector-feel.
//      • Headline jumps to Funnel Display monumental clamp(44px → 88px).
//      • CTAs go from gradient pills to editorial mono-uppercase boxes
//        (filled gradient for "Founders", hairline for "Investors").
//      • Portfolio strip uses mono labels with thin separators.
//      • Library cards already inherit Phase C's editorial card styling,
//        but their copy is now bilingual.
//
// 2) BILINGÜE COMPLETO. Every visible string runs through a local `pick(en, pt)`
//    helper backed by `useLanguage`. Pre-existing leak: the hero copy was
//    100% English even on /pt. Fixed.
//
// API preserved: this component stays parameterless, the parent renders it
// inside <div id="hero">. Keep the slot id intact for #hero anchor scroll.

import { useLanguage } from '@/app/hooks/useLanguage'
import { EditorialCard } from '@/app/components/EditorialCard'

interface FeatureCard {
  kind: { en: string; pt: string; es: string }
  title: { en: string; pt: string; es: string }
  metric: { en: string; pt: string; es: string }
  accent: string
  href: string
}

const FEATURES: FeatureCard[] = [
  {
    // Round 9 — replaced Sigga (pre-Avante Innova-era exit) with the live
    // Cohort 1 callout. Sigga is now anchored on /portfolio in the
    // Investing Track Record + as the dedicated case-study link there.
    // The hero should communicate what Avante is doing NOW, not what the
    // founding team did before Avante existed.
    kind: { en: 'COHORT 1 · LIVE', pt: 'COHORT 1 · ATIVA', es: 'COHORT 1 · ACTIVA' },
    title: {
      en: 'WIR · InsurTech first clients',
      pt: 'WIR · primeiros clientes InsurTech',
      es: 'WIR · primeros clientes InsurTech',
    },
    metric: {
      en: 'Top global insurer pilot · NDA-bound · LATAM reference architecture',
      pt: 'Piloto com seguradora global Tier-1 · sob NDA · arquitetura de referência LATAM',
      es: 'Piloto con aseguradora global Tier-1 · bajo NDA · arquitectura de referencia LATAM',
    },
    accent: '#F9B437',
    href: 'portfolio',
  },
  {
    kind: { en: 'MARKET REPORT', pt: 'RELATÓRIO DE MERCADO', es: 'REPORTE DE MERCADO' },
    title: {
      en: 'Brazil AI Market 2026',
      pt: 'Mercado de IA Brasil 2026',
      es: 'Mercado de IA Brasil 2026',
    },
    metric: {
      en: '$2.5T economy · 70% services GDP',
      pt: 'Economia $2.5T · 70% PIB de serviços',
      es: 'Economía $2.5T · 70% PIB de servicios',
    },
    accent: '#f4a93a',
    href: 'library/brazil-ai-market-report-2026',
  },
  {
    kind: { en: 'PLAYBOOK', pt: 'PLAYBOOK', es: 'PLAYBOOK' },
    title: {
      en: 'The First Ticket Advantage',
      pt: 'A Vantagem do Primeiro Cheque',
      es: 'La Ventaja del Primer Cheque',
    },
    metric: {
      en: '4-filter framework · 100× upside vs 7×',
      pt: 'Framework de 4 filtros · upside 100× vs 7×',
      es: 'Framework de 4 filtros · upside 100× vs 7×',
    },
    accent: '#ec5f72',
    href: 'library/first-ticket-advantage-framework',
  },
]

const PORTFOLIO = ['SIGGA', 'MAHWAY', 'WIR', 'BAMBOO DCM', 'ALPHALIT', 'INDINERO']

// Wire CTAs to the contact form below: scroll to it, then auto-select
// the inquiry type after the smooth-scroll has settled (~800ms).
function scrollToContactAndSelect(inquiryType: 'General' | 'Investor Inquiry') {
  const element = document.getElementById('contact')
  if (!element) return
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => {
    const select = document.querySelector('#inquiryType') as HTMLSelectElement | null
    if (select) {
      select.value = inquiryType
      select.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, 800)
}

export function HeroV2A_Masthead() {
  const { language } = useLanguage()
  // Optional `es` for incremental Spanish rollout. Spanish viewers fall
  // back to EN when no third arg is provided.
  const pick = <T,>(en: T, pt: T, es?: T): T =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en

  return (
    <section
      className="relative w-full"
      style={{
        // Transparent — body's --avt-ink takes over. Drops legacy #0E1428.
        background: 'transparent',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Soft brand glow corners — refreshed to the new gradient palette
          (orange-pink upper right, purple-indigo lower left). Same blur,
          same scale, but the colors now match the redesigned vocabulary. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '760px',
          height: '760px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(236, 95, 114, 0.16) 0%, rgba(244, 169, 58, 0.08) 50%, transparent 75%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '640px',
          height: '640px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168, 66, 155, 0.16) 0%, rgba(58, 47, 143, 0.08) 50%, transparent 75%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="hv2a-grid"
        style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(96px, 14vh, 160px) clamp(24px, 4vw, 48px) 64px',
          display: 'grid',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* LEFT */}
        <div>
          {/* MASTHEAD — top dateline. Round 8.3: switched from JetBrains Mono
              (which read as "AI/tech console" per user feedback) to Bricolage
              Grotesque uppercase with reduced tracking. The mono family
              still owns labels in editorial frames (cinematic captions,
              ticker cells), but the dateline reads as a magazine standfirst
              — less algorithmic, more publication. */}
          <div
            className="hv2a-masthead"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px 16px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              fontFamily: 'var(--avt-font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#cdd2ee',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F9B437',
                  boxShadow: '0 0 8px rgba(249, 180, 55, 0.6)',
                }}
              />
              <span style={{ color: '#F9B437' }}>São Paulo · San Francisco</span>
            </span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ whiteSpace: 'nowrap' }}>{pick('Est. 2025', 'Est. 2025', 'Est. 2025')}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ whiteSpace: 'nowrap' }}>
              {pick(
                'Operator-Led Venture Studio',
                'Venture Studio Liderado por Operadores',
                'Venture Studio Liderado por Operadores'
              )}
            </span>
          </div>

          {/* Hero lockup removed per Round 8 feedback — the navbar lockup
              already carries identity at the top, and the monumental hero
              headline below doesn't need a second visual anchor competing
              for attention. Drops ~80px of vertical real estate and lets
              the headline land sooner. */}

          <h1
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: 'clamp(40px, 6vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              fontWeight: 500,
              margin: 0,
              marginBottom: '28px',
            }}
          >
            {pick(
              <>
                We co-found AI‑native companies.
                <br />
                <span className="avt-grad">Built to compound.</span>
              </>,
              <>
                Co-fundamos empresas AI‑native.
                <br />
                <span className="avt-grad">Construídas para compor.</span>
              </>,
              <>
                Co-fundamos empresas AI‑native.
                <br />
                <span className="avt-grad">Construidas para componerse.</span>
              </>
            )}
          </h1>

          <p
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              color: '#cdd2ee',
              maxWidth: '560px',
              margin: '0 0 40px 0',
            }}
          >
            {pick(
              'Silicon Valley playbooks. Brazil-native execution. We bring SF venture-building standards to operators on the ground in São Paulo — and write the first ticket.',
              'Playbooks do Vale do Silício. Execução nativa do Brasil. Trazemos os padrões de venture-building de SF para operadores em campo em São Paulo — e escrevemos o primeiro cheque.',
              'Playbooks de Silicon Valley. Ejecución nativa de Brasil. Traemos los estándares de venture-building de SF a operadores sobre el terreno en São Paulo — y escribimos el primer cheque.'
            )}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {/* Primary CTA — gradient fill with editorial mono caps */}
            <button
              onClick={() => scrollToContactAndSelect('General')}
              style={{
                padding: '14px 22px',
                fontFamily: 'var(--avt-font-body)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#06070d',
                background: 'var(--avt-grad)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(236, 95, 114, 0.3)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 95, 114, 0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 95, 114, 0.3)'
              }}
            >
              {pick('Get in touch', 'Fale com a gente', 'Hablemos')}
              <span aria-hidden>→</span>
            </button>

            {/* Secondary CTA — hairline editorial box */}
            <button
              onClick={() => scrollToContactAndSelect('Investor Inquiry')}
              style={{
                padding: '14px 22px',
                fontFamily: 'var(--avt-font-body)',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#fff',
                background: 'transparent',
                border: '1px solid var(--avt-hair-2)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--avt-hair-2)'
              }}
            >
              {pick('For Investors', 'Para Investidores', 'Para Inversores')}
            </button>
          </div>

          {/* PORTFOLIO STRIP — Bricolage uppercase (Round 8.3 type pivot) */}
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid var(--avt-hair)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontFamily: 'var(--avt-font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--avt-meta)',
              flexWrap: 'wrap',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'var(--avt-meta)', opacity: 0.7 }}>
              {pick('Portfolio · ', 'Portfólio · ', 'Portafolio · ')}
            </span>
            {PORTFOLIO.map((name, i) => (
              <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'var(--avt-muted)' }}>{name}</span>
                {i < PORTFOLIO.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — From the Library cards, bilingual */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontFamily: 'var(--avt-font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--avt-meta)',
              marginBottom: '12px',
            }}
          >
            {pick('From the Library', 'Da Biblioteca', 'De la Biblioteca')}
          </div>
          {FEATURES.map((f) => (
            <EditorialCard
              key={f.title.en}
              to={`/${language}/${f.href}`}
              eyebrow={pick(f.kind.en, f.kind.pt, f.kind.es)}
              title={pick(f.title.en, f.title.pt, f.title.es)}
              body={pick(f.metric.en, f.metric.pt, f.metric.es)}
              accent={f.accent}
              accentPosition="border-left"
              style={{ padding: '20px 24px' }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .hv2a-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2a-grid { grid-template-columns: 1.4fr 1fr; } }
        @media (min-width: 1600px) {
          .hv2a-grid { grid-template-columns: 1.2fr 1fr; max-width: 1440px; }
        }
      `}</style>
    </section>
  )
}
