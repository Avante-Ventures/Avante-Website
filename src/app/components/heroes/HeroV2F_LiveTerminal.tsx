// V2F — Editorial + Live Operations Terminal
//
// Replaces the masthead text dateline of 2A with a Bloomberg-style status
// terminal: a tiny panel showing rotating live data lines from both
// cities (SP + SF). Updates every 4 seconds with operational metrics.
//
// No maps. Geography is implied by city codes (SP / SF). The widget reads
// as "we are an active operation, not a brochure."

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

const FEATURES = [
  { kind: 'MARKET REPORT', title: 'Brazil AI Market 2026', metric: '$2.5T economy · 70% services GDP', accent: '#F9B437', href: 'library/brazil-ai-market-report-2026' },
  { kind: 'PLAYBOOK', title: 'The First Ticket Advantage', metric: '4-filter framework · 100× upside vs 7×', accent: '#F4A261', href: 'library/first-ticket-advantage-framework' },
  { kind: 'RESEARCH', title: 'Why Studios Beat Traditional VC', metric: '50% IRR vs 19% · GSSN 2025 data', accent: '#98509A', href: 'library/venture-studios-outperform-traditional-vc' },
]

const PORTFOLIO = ['SIGGA', 'MAHWAY', 'WIR', 'BAMBOO DCM', 'ALPHALIT', 'INDINERO']

const TERMINAL_LINES = [
  { city: 'SP', label: '3 ventures incubating · 2 portfolio compounding', dot: '#22C55E' },
  { city: 'SF', label: 'Capital partner · playbook source · 7 advisors', dot: '#22C55E' },
  { city: 'GLOBAL', label: '50% target IRR · cohort 2026 active', dot: '#F9B437' },
  { city: 'NEXT', label: 'Q3 2026 cohort · accepting founder applications', dot: '#F9B437' },
]

export function HeroV2F_LiveTerminal() {
  const { language } = useLanguage()
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % TERMINAL_LINES.length), 4000)
    return () => clearInterval(id)
  }, [])

  const current = TERMINAL_LINES[i]

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
        className="hv2f-grid"
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
          {/* LIVE TERMINAL MASTHEAD */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
              fontSize: '12px',
              marginBottom: '24px',
              minWidth: '420px',
              maxWidth: '100%',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: current.dot,
                boxShadow: `0 0 8px ${current.dot}`,
                animation: 'hv2f-pulse 2s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span style={{ color: '#22C55E', fontWeight: 700, letterSpacing: '0.08em', fontSize: '11px', flexShrink: 0 }}>LIVE</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)', flexShrink: 0 }}>·</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', minWidth: 0 }}
              >
                <span
                  style={{
                    color: '#F9B437',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    fontSize: '11px',
                    flexShrink: 0,
                  }}
                >
                  {current.city}
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>›</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {current.label}
                </span>
              </motion.div>
            </AnimatePresence>
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
        .hv2f-grid { grid-template-columns: 1fr; }
        @media (min-width: 900px) { .hv2f-grid { grid-template-columns: 1.4fr 1fr; } }
        @keyframes hv2f-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
