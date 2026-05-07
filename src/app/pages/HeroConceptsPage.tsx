// Internal preview — Concept 2 enhancement variants.
//
// User picked Concept 2 (Editorial Asymmetric) as the direction. Now
// comparing 4 versions of how to handle SF/SP geography:
//   - Concept 2 base (no maps, no geography touches)
//   - 2A: magazine masthead (text-only dateline + portfolio strip)
//   - 2B: Brazil silhouette watermark behind cards + SF pin
//   - 2C: operational data sidebar above cards
//
// NOINDEX. Visit /preview/heroes.

import { Helmet } from 'react-helmet-async'
import { HeroV2_Editorial } from '@/app/components/heroes/HeroV2_Editorial'
import { HeroV2A_Masthead } from '@/app/components/heroes/HeroV2A_Masthead'
import { HeroV2B_BrazilWatermark } from '@/app/components/heroes/HeroV2B_BrazilWatermark'
import { HeroV2C_OperationalSidebar } from '@/app/components/heroes/HeroV2C_OperationalSidebar'
import { LanguageProvider } from '@/app/hooks/useLanguage'

const CONCEPTS = [
  {
    letter: '2',
    name: 'Editorial — base (no geography)',
    pitch:
      'Reference: original Concept 2. The 60/40 split with featured cards. No SF/SP treatment yet. Useful as the comparison point.',
    Component: HeroV2_Editorial,
  },
  {
    letter: '2A',
    name: 'Magazine Masthead + Portfolio Strip',
    pitch:
      'Top dateline: "São Paulo + San Francisco · Est. 2025 · AI-Native Venture Studio". Bottom: a horizontal portfolio strip below CTAs (SIGGA · MAHWAY · WIR ...). 100% type, no images. Cleanest.',
    Component: HeroV2A_Masthead,
  },
  {
    letter: '2B',
    name: 'Brazil Silhouette Watermark',
    pitch:
      'Brazil-shaped watermark at 7% opacity behind the right column cards. Plus a small "+ San Francisco" pill above the cards. Geographic identity felt subliminally; cards stay sharp via backdrop-blur.',
    Component: HeroV2B_BrazilWatermark,
  },
  {
    letter: '2C',
    name: 'Operational Data Sidebar',
    pitch:
      'Right column gets a "Live · Active Operations" panel above the article cards: per-city stats (3 ventures incubating in SP, playbook source in SF). "Next cohort Q3 2026" line. Data over geography.',
    Component: HeroV2C_OperationalSidebar,
  },
]

export default function HeroConceptsPage() {
  return (
    <LanguageProvider locale="en">
      <div style={{ background: '#08091A', color: '#FFFFFF' }}>
        <Helmet>
          <title>Hero Concepts — Concept 2 enhancements (internal preview)</title>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </Helmet>

        <header
          style={{
            padding: '48px 24px 36px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#08091A',
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
            Internal preview · noindex · concept 2 variants
          </p>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 600,
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Concept 2: how to handle SF + São Paulo
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0,
              maxWidth: '720px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
            }}
          >
            Same 60/40 editorial layout in all 4. Only the geographic identity
            treatment changes. Compare and pick — A, B, C — or combine (e.g. A
            masthead + B watermark together is also viable).
          </p>

          <nav
            style={{
              marginTop: '24px',
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
                  padding: '10px 18px',
                  borderRadius: '10px',
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
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                zIndex: 100,
                padding: '12px 18px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(249, 180, 55, 0.5)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                maxWidth: '420px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#F9B437',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                Variant {c.letter}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.5,
                }}
              >
                {c.pitch}
              </div>
            </div>

            <c.Component />
          </section>
        ))}

        <footer
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#08091A',
          }}
        >
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.55)', margin: '0 0 8px 0' }}>
            Pick a letter — 2 (no geo), 2A, 2B, 2C — or combine (e.g. "2A + 2B").
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.35)', margin: 0 }}>
            Concepts 1 (Minimal) + 3 (Bridge) retired from this preview · already eliminated
          </p>
        </footer>
      </div>
    </LanguageProvider>
  )
}
