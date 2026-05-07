// V2B — Editorial + Brazil silhouette watermark
//
// Same 60/40 editorial layout as V2_Editorial. The right column gets a
// subtle Brazil-shaped watermark behind the 3 article cards (the existing
// brazilMap3D PNG at 6% opacity, with a small "+ SF" pin-tag in the
// top-right corner of the watermark area).
//
// Geographic identity is felt without being illustrated. The eye reads
// "we are based in Brazil" subliminally; the cards stay the focus.

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
import brazilMap from 'figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

const FEATURES = [
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
  {
    kind: 'RESEARCH',
    title: 'Why Studios Beat Traditional VC',
    metric: '50% IRR vs 19% · GSSN 2025 data',
    accent: '#98509A',
    href: 'library/venture-studios-outperform-traditional-vc',
  },
]

export function HeroV2B_BrazilWatermark() {
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
      {/* Soft brand glows */}
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

      {/* Brazil watermark — large, behind right column, low opacity */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-8%',
          top: '8%',
          width: '60vw',
          maxWidth: '650px',
          height: '90vh',
          maxHeight: '900px',
          backgroundImage: `url(${brazilMap})`,
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.07,
          filter: 'brightness(2) hue-rotate(15deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="hv2b-grid"
        style={{
          position: 'relative',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(80px, 12vh, 140px) clamp(24px, 4vw, 48px) 64px',
          display: 'grid',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
          minHeight: '100vh',
          zIndex: 1,
        }}
      >
        {/* LEFT */}
        <div>
          <img
            src={avanteLogo}
            alt="Avante"
            loading="eager"
            style={{
              height: 'clamp(70px, 7vw, 100px)',
              width: 'auto',
              marginBottom: 'clamp(28px, 4vw, 48px)',
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
              margin: '0 0 20px 0',
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
              margin: '0 0 36px 0',
            }}
          >
            Silicon Valley playbooks. Brazil-native execution. We bring SF
            venture-building standards to operators on the ground in São Paulo
            — and write the first ticket.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
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
                transition: 'transform 0.25s ease',
              }}
            >
              For Founders →
            </button>
            <button
              style={{
                padding: '14px 26px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'transparent',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '999px',
                cursor: 'pointer',
              }}
            >
              For Investors
            </button>
          </div>
        </div>

        {/* RIGHT — cards stack with SF pin and Brazil watermark behind */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* SF pin tag — top right of right column */}
          <div
            style={{
              position: 'absolute',
              top: '-44px',
              right: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: 'rgba(249, 180, 55, 0.08)',
              border: '1px solid rgba(249, 180, 55, 0.3)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#F9B437',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#F9B437',
              }}
            />
            <span>+ San Francisco</span>
          </div>

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
                background: 'rgba(14, 20, 40, 0.7)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: `3px solid ${f.accent}`,
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${f.accent}1A`
                e.currentTarget.style.borderColor = `${f.accent}60`
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(14, 20, 40, 0.7)'
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
        .hv2b-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2b-grid { grid-template-columns: 1.4fr 1fr; } }
      `}</style>
    </section>
  )
}
