// V2E — Brazil Hero / SF Inset
//
// The most thesis-aligned of the three new proposals: the visual
// hierarchy matches the brand promise. Brazil is the BIG geographic
// element on the right; San Francisco is a small inset card. Reads
// instantly as "Brazil-native execution (huge), Silicon Valley
// playbooks (supporting)".
//
// Right column composition:
//   Top half: Brazil map at ~280px tall, purple-tinted with glow,
//     with São Paulo + Rio + BH pin labels floating beside it.
//   Top right corner: small SF inset card showing tiny USA map
//     and "+ San Francisco · 37.7° N" label.
//   Bottom half: 3 article cards (compact format).

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
import brazilMap from 'figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png'
import usaMap from 'figma:asset/6c4d6ef642d31dd41502fcb0023f6c5da5537058.png'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

const FEATURES = [
  { kind: 'MARKET REPORT', title: 'Brazil AI Market 2026', accent: '#F9B437', href: 'library/brazil-ai-market-report-2026' },
  { kind: 'PLAYBOOK', title: 'The First Ticket Advantage', accent: '#F4A261', href: 'library/first-ticket-advantage-framework' },
  { kind: 'RESEARCH', title: 'Why Studios Beat Traditional VC', accent: '#98509A', href: 'library/venture-studios-outperform-traditional-vc' },
]

const PORTFOLIO = ['SIGGA', 'MAHWAY', 'WIR', 'BAMBOO DCM', 'ALPHALIT', 'INDINERO']

export function HeroV2E_BrazilHero() {
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
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(152, 80, 154, 0.18) 0%, rgba(66, 70, 140, 0.08) 50%, transparent 75%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 180, 55, 0.12) 0%, rgba(241, 139, 70, 0.06) 50%, transparent 75%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div
        className="hv2e-grid"
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
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '20px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F9B437', boxShadow: '0 0 8px rgba(249, 180, 55, 0.6)' }} />
            <span style={{ color: '#F9B437' }}>São Paulo + San Francisco</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Est. 2025</span>
          </div>

          <img src={avanteLogo} alt="Avante" loading="eager" style={{ height: 'clamp(70px, 7vw, 100px)', width: 'auto', marginBottom: 'clamp(24px, 4vw, 40px)', filter: 'drop-shadow(0 8px 24px rgba(249, 180, 55, 0.18))' }} />

          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#FFFFFF', fontWeight: 600, margin: '0 0 20px 0' }}>
            We co-found AI-native companies.
            <br />
            <span style={{ color: '#F4A261' }}>Built to compound.</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.65)', maxWidth: '500px', margin: '0 0 32px 0' }}>
            Silicon Valley playbooks. Brazil-native execution. We bring SF venture-building standards to operators on the ground in São Paulo — and write the first ticket.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button style={{ padding: '14px 26px', fontSize: '15px', fontWeight: 600, color: '#0E1428', background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)', border: 'none', borderRadius: '999px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)' }}>For Founders →</button>
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

        {/* RIGHT — Brazil hero + SF inset + cards */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Brazil large + SF inset overlay + city pins */}
          <div style={{ position: 'relative', height: '320px', marginBottom: '8px' }}>
            {/* Brazil glow halo */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 60% 55%, rgba(152, 80, 154, 0.20) 0%, rgba(217, 166, 218, 0.08) 35%, transparent 65%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />
            {/* Brazil */}
            <img
              src={brazilMap}
              alt="Brazil"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter:
                  'brightness(0) saturate(100%) invert(56%) sepia(34%) saturate(1600%) hue-rotate(245deg) brightness(105%) contrast(85%) drop-shadow(0 0 24px rgba(217, 166, 218, 0.3))',
                opacity: 0.92,
                zIndex: 1,
              }}
            />

            {/* São Paulo pin (with label) */}
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: '40%',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#F9B437',
                  boxShadow: '0 0 12px rgba(249, 180, 55, 0.9)',
                  animation: 'hv2e-pulse 2.4s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(249, 180, 55, 0.4)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                São Paulo · HQ
              </div>
            </div>

            {/* Rio pin (smaller, label only on hover-feel) */}
            <div style={{ position: 'absolute', top: '67%', left: '52%', zIndex: 2 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(217, 166, 218, 0.7)', boxShadow: '0 0 8px rgba(217, 166, 218, 0.5)', display: 'block', animation: 'hv2e-pulse 2.4s ease-in-out 0.8s infinite' }} />
            </div>

            {/* BH pin (smaller) */}
            <div style={{ position: 'absolute', top: '57%', left: '47%', zIndex: 2 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(217, 166, 218, 0.7)', boxShadow: '0 0 8px rgba(217, 166, 218, 0.5)', display: 'block', animation: 'hv2e-pulse 2.4s ease-in-out 1.6s infinite' }} />
            </div>

            {/* SF inset card — top-right corner */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                zIndex: 4,
                padding: '10px 14px',
                background: 'rgba(14, 20, 40, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(249, 180, 55, 0.4)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div style={{ position: 'relative', width: '36px', height: '22px' }}>
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
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: '36%',
                    left: '12%',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#F9B437',
                    boxShadow: '0 0 6px rgba(249, 180, 55, 0.9)',
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#F9B437', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>+ San Francisco</div>
                <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.04em' }}>Capital · Playbook source</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.4)' }}>From the Library</div>
          {FEATURES.map((f) => (
            <Link key={f.title} to={`/${language}/${f.href}`} style={{ display: 'block', padding: '14px 18px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderLeft: `3px solid ${f.accent}`, borderRadius: '10px', textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `${f.accent}0F`; e.currentTarget.style.borderColor = `${f.accent}40` }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: f.accent, textTransform: 'uppercase', marginBottom: '4px' }}>{f.kind}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{f.title}</div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hv2e-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2e-grid { grid-template-columns: 1.4fr 1fr; } }
        @keyframes hv2e-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
      `}</style>
    </section>
  )
}
