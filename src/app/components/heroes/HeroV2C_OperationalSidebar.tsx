// V2C — Editorial + Operational Sidebar (data-driven)
//
// Same 60/40 editorial layout. The right column gains an "Active
// Operations" panel ABOVE the 3 article cards. It shows real
// operational data per city (São Paulo + San Francisco) — not as
// geography illustration but as evidence of activity.
//
// The hero now communicates BOTH "here's what we publish" (cards
// below) AND "here's what we're doing right now" (ops panel above).

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
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

export function HeroV2C_OperationalSidebar() {
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

      <div
        className="hv2c-grid"
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

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* OPERATIONAL SIDEBAR */}
          <div
            style={{
              padding: '20px 22px',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              fontSize: '13px',
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.45)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                  animation: 'hv2c-pulse 2s ease-in-out infinite',
                }}
              />
              Active Operations
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* São Paulo */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#98509A',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    São Paulo
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                    3 ventures incubating
                  </li>
                  <li style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    2 portfolio compounding
                  </li>
                </ul>
              </div>

              {/* San Francisco */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#F9B437',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    San Francisco
                  </span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                    Playbook source
                  </li>
                  <li style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Capital partner
                  </li>
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '0.04em',
              }}
            >
              <span>Established 2025</span>
              <span style={{ color: '#F4A261', fontWeight: 600 }}>Next cohort: Q3 2026</span>
            </div>
          </div>

          {/* Library cards */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '12px',
              }}
            >
              From the Library
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FEATURES.map((f) => (
                <Link
                  key={f.title}
                  to={`/${language}/${f.href}`}
                  style={{
                    display: 'block',
                    padding: '16px 20px',
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
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: f.accent, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {f.kind}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                    {f.metric}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hv2c-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2c-grid { grid-template-columns: 1.4fr 1fr; } }
        @keyframes hv2c-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
