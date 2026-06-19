// V2D — Editorial + Geo Strip Masthead
//
// Replaces the text-only dateline of 2A with a small visual strip:
//   [USA map ~50px tall, gold-tinted]  ━━━ ribbon ━━━  [Brazil map ~70px, purple-tinted]
//        • SF (gold pulse)                                 • São Paulo (purple pulse)
//
// The two PNG maps return, but treated as branded artifacts (recolored
// via CSS filter to match the gradient palette). City pins pulse on each.
// A small gold-to-purple ribbon connects them. Below the strip, a tighter
// dateline: "Est. 2025 · AI-Native Venture Studio".
//
// Why: the maps are now part of the brand language, not stock decoration.
// Their small size + bold color + city pins reads as "operational map,"
// not "world map clipart."

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
import brazilMap from 'figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png'
import usaMap from 'figma:asset/6c4d6ef642d31dd41502fcb0023f6c5da5537058.png'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

const FEATURES = [
  { kind: 'MARKET REPORT', title: 'Brazil AI Market 2026', metric: '$2.5T economy · 70% services GDP', accent: '#F9B437', href: 'library/brazil-ai-market-report-2026' },
  { kind: 'PLAYBOOK', title: 'The First Ticket Advantage', metric: '4-filter framework · 100× upside vs 7×', accent: '#F4A261', href: 'library/first-ticket-advantage-framework' },
  { kind: 'RESEARCH', title: 'Why Studios Beat Traditional VC', metric: '50% IRR vs 19% · GSSN 2025 data', accent: '#98509A', href: 'library/venture-studios-outperform-traditional-vc' },
]

const PORTFOLIO = ['SIGGA', 'MAHWAY', 'WIR', 'BAMBOO DCM', 'ALPHALIT', 'INDINERO']

export function HeroV2D_GeoStrip() {
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
      {/* Brand glows */}
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(152, 80, 154, 0.18) 0%, rgba(66, 70, 140, 0.08) 50%, transparent 75%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 180, 55, 0.12) 0%, rgba(241, 139, 70, 0.06) 50%, transparent 75%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div
        className="hv2d-grid"
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
        <div>
          {/* GEO STRIP MASTHEAD */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '24px',
            }}
          >
            {/* USA map mini, gold-tinted */}
            <div style={{ position: 'relative', width: '64px', height: '40px' }}>
              <img
                src={usaMap}
                alt=""
                aria-hidden
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter:
                    'brightness(0) saturate(100%) invert(78%) sepia(55%) saturate(560%) hue-rotate(0deg) brightness(102%) contrast(95%)',
                  opacity: 0.85,
                }}
              />
              {/* SF pin */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '12%',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#F9B437',
                  boxShadow: '0 0 6px rgba(249, 180, 55, 0.9)',
                  animation: 'hv2d-pulse 2.4s ease-in-out infinite',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '40px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: '#F9B437', textTransform: 'uppercase' }}>SF</span>
              <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.05em' }}>37.7° N</span>
            </div>

            {/* Connecting ribbon */}
            <svg width="80" height="20" viewBox="0 0 80 20" aria-hidden style={{ flexShrink: 0 }}>
              <defs>
                <linearGradient id="hv2d-rib" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F9B437" />
                  <stop offset="50%" stopColor="#F4A261" />
                  <stop offset="100%" stopColor="#98509A" />
                </linearGradient>
              </defs>
              <line
                x1="2"
                y1="10"
                x2="78"
                y2="10"
                stroke="url(#hv2d-rib)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="3 4"
                style={{ animation: 'hv2d-flow 2s linear infinite' }}
              />
            </svg>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end', minWidth: '60px' }}>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', color: '#D9A6DA', textTransform: 'uppercase' }}>SÃO PAULO</span>
              <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.05em' }}>23.5° S</span>
            </div>

            {/* Brazil map mini, purple-tinted */}
            <div style={{ position: 'relative', width: '54px', height: '60px' }}>
              <img
                src={brazilMap}
                alt=""
                aria-hidden
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter:
                    'brightness(0) saturate(100%) invert(56%) sepia(34%) saturate(1600%) hue-rotate(245deg) brightness(95%) contrast(85%)',
                  opacity: 0.85,
                }}
              />
              {/* São Paulo pin */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '40%',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#98509A',
                  boxShadow: '0 0 6px rgba(217, 166, 218, 0.9)',
                  animation: 'hv2d-pulse 2.4s ease-in-out 1.2s infinite',
                }}
              />
            </div>
          </div>

          {/* Tighter dateline below */}
          <div
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: '20px',
            }}
          >
            Est. 2025 · AI-Native Venture Studio
          </div>

          <img src={avanteLogo} alt="Avante" loading="eager" style={{ height: 'clamp(70px, 7vw, 100px)', width: 'auto', marginBottom: 'clamp(24px, 4vw, 40px)', filter: 'drop-shadow(0 8px 24px rgba(249, 180, 55, 0.18))' }} />

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#FFFFFF', fontWeight: 600, margin: '0 0 20px 0' }}>
            We co-found AI-native companies.
            <br />
            <span style={{ color: '#F4A261' }}>Built to compound.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', maxWidth: '500px', margin: '0 0 32px 0' }}>
            Silicon Valley playbooks. Brazil-native execution. We bring SF venture-building standards to operators on the ground in São Paulo, and write the first ticket.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 600, color: '#0E1428', background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)', border: 'none', borderRadius: '999px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)' }}>Get in touch →</button>
            <button style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 600, color: '#FFFFFF', background: 'transparent', border: '1.5px solid rgba(255, 255, 255, 0.25)', borderRadius: '999px', cursor: 'pointer' }}>For Investors</button>
          </div>

          <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255, 255, 255, 0.45)', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>PORTFOLIO ·</span>
            {PORTFOLIO.map((name, i) => (
              <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
                <span>{name}</span>
                {i < PORTFOLIO.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: same article cards as 2A */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '8px' }}>From the Library</div>
          {FEATURES.map((f) => (
            <Link key={f.title} to={`/${language}/${f.href}`} style={{ display: 'block', padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderLeft: `3px solid ${f.accent}`, borderRadius: '12px', textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${f.accent}0F`; e.currentTarget.style.borderColor = `${f.accent}40`; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.transform = 'translateX(0)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: f.accent, textTransform: 'uppercase', marginBottom: '6px' }}>{f.kind}</div>
              <div style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>{f.metric}</div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hv2d-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2d-grid { grid-template-columns: 1.4fr 1fr; } }
        @keyframes hv2d-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
        @keyframes hv2d-flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -14; }
        }
      `}</style>
    </section>
  )
}
