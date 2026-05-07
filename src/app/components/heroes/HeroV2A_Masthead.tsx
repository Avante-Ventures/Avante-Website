// V2A — Editorial + Magazine Masthead
//
// Same 60/40 editorial layout as V2_Editorial. Adds two text-only editorial
// touches that handle the geographic identity without competing visually:
//
// 1. TOP MASTHEAD: a thin dateline above the wordmark in tiny letter-spaced
//    caps — "SÃO PAULO + SAN FRANCISCO · EST. 2025 · AI-NATIVE VENTURE STUDIO"
// 2. BOTTOM PORTFOLIO STRIP: a horizontal line below the CTAs listing
//    portfolio companies as plain text with subtle dividers.
//
// Both are pure type — no images, no maps. The hero stays visually clean
// while gaining magazine-cover credibility (geography + portfolio + status).

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

const FEATURES = [
  {
    kind: 'PORTFOLIO MILESTONE',
    title: 'Sigga Technologies · 10× exit',
    metric: 'Industrial software · Brazil · Amanda Pinheiro on Board',
    accent: '#98509A',
    href: 'library/sigga-case-study-10x-exit',
  },
  {
    kind: 'MARKET REPORT',
    title: 'Brazil AI Market 2026',
    metric: '$2.5T economy · 70% services GDP',
    accent: '#F9B437',
    href: 'library/brazil-ai-market-report-2026',
  },
  {
    kind: 'PLAYBOOK',
    title: 'The First Ticket Advantage',
    metric: '4-filter framework · 100× upside vs 7×',
    accent: '#F4A261',
    href: 'library/first-ticket-advantage-framework',
  },
]

const PORTFOLIO = ['SIGGA', 'MAHWAY', 'WIR', 'BAMBOO DCM', 'ALPHALIT', 'INDINERO']

// Wire CTAs to the contact form below: scroll to it, then auto-select
// the inquiry type after the smooth-scroll has settled (~800ms).
function scrollToContactAndSelect(inquiryType: 'Founder Inquiry' | 'Investor Inquiry') {
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

  return (
    <section
      className="relative w-full"
      style={{
        background: '#0E1428',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Soft brand glow corners (same as V2_Editorial) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(152, 80, 154, 0.18) 0%, rgba(66, 70, 140, 0.08) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249, 180, 55, 0.12) 0%, rgba(241, 139, 70, 0.06) 50%, transparent 75%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="hv2a-grid"
        style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(80px, 12vh, 140px) clamp(24px, 4vw, 48px) 64px',
          display: 'grid',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* LEFT */}
        <div>
          {/* MASTHEAD — top dateline */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#F9B437',
                boxShadow: '0 0 8px rgba(249, 180, 55, 0.6)',
              }}
            />
            <span style={{ color: '#F9B437' }}>São Paulo + San Francisco</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Est. 2025</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>AI-Native Venture Studio</span>
          </div>

          <img
            src={avanteLogo}
            alt="Avante"
            loading="eager"
            style={{
              height: 'clamp(70px, 7vw, 100px)',
              width: 'auto',
              marginBottom: 'clamp(24px, 4vw, 40px)',
              filter: 'drop-shadow(0 8px 24px rgba(249, 180, 55, 0.18))',
            }}
          />

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              fontWeight: 600,
              margin: 0,
              marginBottom: '20px',
            }}
          >
            We co-found AI-native companies.
            <br />
            <span style={{ color: '#F4A261' }}>Built to compound.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '500px',
              margin: '0 0 32px 0',
            }}
          >
            Silicon Valley playbooks. Brazil-native execution. We bring SF
            venture-building standards to operators on the ground in São Paulo
            — and write the first ticket.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={() => scrollToContactAndSelect('Founder Inquiry')}
              style={{
                padding: '14px 26px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0E1428',
                background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)',
                border: 'none',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 180, 55, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 180, 55, 0.25)'
              }}
            >
              For Founders →
            </button>
            <button
              onClick={() => scrollToContactAndSelect('Investor Inquiry')}
              style={{
                padding: '14px 26px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'transparent',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              For Investors
            </button>
          </div>

          {/* PORTFOLIO STRIP */}
          <div
            style={{
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: 'rgba(255, 255, 255, 0.45)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>PORTFOLIO ·</span>
            {PORTFOLIO.map((name, i) => (
              <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
                <span>{name}</span>
                {i < PORTFOLIO.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — same as V2_Editorial */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '8px',
            }}
          >
            From the Library
          </div>
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={`/${language}/${f.href}`}
              style={{
                display: 'block',
                padding: '20px 24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: `3px solid ${f.accent}`,
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${f.accent}0F`
                e.currentTarget.style.borderColor = `${f.accent}40`
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: f.accent, textTransform: 'uppercase', marginBottom: '6px' }}>
                {f.kind}
              </div>
              <div style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {f.title}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                {f.metric}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hv2a-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2a-grid { grid-template-columns: 1.4fr 1fr; } }
      `}</style>
    </section>
  )
}
