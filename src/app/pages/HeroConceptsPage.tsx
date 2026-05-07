// Internal preview page that stacks all 5 hero concepts vertically with
// labels. Visit /preview/heroes to compare. NOINDEX so this never enters
// search results — it's purely for picking a winner before merging to
// the live home page.

import { Helmet } from 'react-helmet-async'
import { HeroA_Bridge } from '@/app/components/heroes/HeroA_Bridge'
import { HeroB_LightSweep } from '@/app/components/heroes/HeroB_LightSweep'
import { HeroC_GradientMesh } from '@/app/components/heroes/HeroC_GradientMesh'
import { HeroD_DataTicker } from '@/app/components/heroes/HeroD_DataTicker'
import { HeroE_Constellation } from '@/app/components/heroes/HeroE_Constellation'

const CONCEPTS = [
  {
    letter: 'A',
    name: 'Bridge SF ↔ São Paulo',
    pitch: 'Animated gold arc linking the two maps. Literalizes the brand line.',
    Component: HeroA_Bridge,
  },
  {
    letter: 'B',
    name: 'Light Sweep on AVANTE',
    pitch: 'Subtle highlight passes across the wordmark every 7s. CSS-only, premium.',
    Component: HeroB_LightSweep,
  },
  {
    letter: 'C',
    name: 'Gradient Mesh Background',
    pitch: '4 brand-color blobs slowly drifting under the maps. Adds depth without distraction.',
    Component: HeroC_GradientMesh,
  },
  {
    letter: 'D',
    name: 'Live Data Ticker',
    pitch: '5 stats cycle below the orange tagline every 4.5s. Data-driven brand.',
    Component: HeroD_DataTicker,
  },
  {
    letter: 'E',
    name: 'Portfolio Constellation',
    pitch: '7 portfolio nodes orbiting AVANTE. Replaces the maps. Visualizes the ecosystem.',
    Component: HeroE_Constellation,
  },
]

export default function HeroConceptsPage() {
  return (
    <div style={{ background: '#0a0e1f', color: '#FFFFFF' }}>
      <Helmet>
        <title>Hero Concepts — Avante (internal preview)</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Helmet>

      {/* Top header */}
      <header
        style={{
          padding: '40px 24px 32px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#0a0e1f',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: 'rgba(255, 255, 255, 0.4)',
            margin: '0 0 12px 0',
            fontWeight: 600,
          }}
        >
          Internal preview · noindex
        </p>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em',
          }}
        >
          5 Hero Concepts
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          Scroll through the 5 variants below. Each is a full-height hero with the
          same copy and CTAs — only the background/decoration differs. Pick the one
          you want shipped to the live home page.
        </p>

        {/* Quick-jump nav */}
        <nav
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {CONCEPTS.map((c) => (
            <a
              key={c.letter}
              href={`#concept-${c.letter}`}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'rgba(255, 255, 255, 0.85)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(249, 180, 55, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              }}
            >
              {c.letter} · {c.name}
            </a>
          ))}
        </nav>
      </header>

      {CONCEPTS.map((c) => (
        <section key={c.letter} id={`concept-${c.letter}`} style={{ position: 'relative' }}>
          {/* Floating label badge — sticks to top-left of each variant */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: 100,
              padding: '10px 16px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(249, 180, 55, 0.4)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              maxWidth: '320px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#F9B437',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Concept {c.letter}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '4px',
              }}
            >
              {c.name}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.5,
              }}
            >
              {c.pitch}
            </div>
          </div>

          <c.Component />
        </section>
      ))}

      {/* Footer back-to-top */}
      <footer
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: '#0a0e1f',
        }}
      >
        <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.55)', margin: 0 }}>
          When you've picked one, tell me the letter and I'll merge it to the live home page.
        </p>
      </footer>
    </div>
  )
}
