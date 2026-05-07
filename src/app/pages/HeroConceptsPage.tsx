// Internal preview — V2.
//
// V1 (5 concepts) was rated 4/10 best, 0/10 rest. The feedback hit a real
// limitation: V1 was decoration on top of the existing centered hero.
// V2 is structural redesign — each variant rebuilds the hero composition,
// not adds animation to it.
//
// Visit /preview/heroes. NOINDEX.

import { Helmet } from 'react-helmet-async'
import { HeroV2_Minimal } from '@/app/components/heroes/HeroV2_Minimal'
import { HeroV2_Editorial } from '@/app/components/heroes/HeroV2_Editorial'
import { HeroV2_Bridge } from '@/app/components/heroes/HeroV2_Bridge'
import { LanguageProvider } from '@/app/hooks/useLanguage'

const CONCEPTS = [
  {
    letter: '1',
    name: 'Confident Minimalism',
    pitch:
      'Strip everything. Massive AVANTE wordmark, one editorial line, single CTA. Sequoia/Anthropic energy. Confidence projects scale.',
    Component: HeroV2_Minimal,
  },
  {
    letter: '2',
    name: 'Editorial Asymmetric',
    pitch:
      '60/40 split. Pitch on the left. Featured Library articles + portfolio metrics on the right as clickable cards. a16z magazine-cover energy.',
    Component: HeroV2_Editorial,
  },
  {
    letter: '3',
    name: 'Cinematic Bridge',
    pitch:
      'Refined SF↔SP — no static maps. Two floating city cards (with GPS coords) connected by a thick gradient ribbon and flowing particles. Wordmark sits below.',
    Component: HeroV2_Bridge,
  },
]

export default function HeroConceptsPage() {
  // Wrap with LanguageProvider so HeroV2_Editorial can use useLanguage()
  // for locale-aware Library links. Default to 'en' since this is internal.
  return (
    <LanguageProvider locale="en">
    <div style={{ background: '#08091A', color: '#FFFFFF' }}>
      <Helmet>
        <title>Hero Concepts V2 — Avante (internal preview)</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Helmet>

      {/* Top header */}
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
          Internal preview · noindex · v2
        </p>
        <h1
          style={{
            fontSize: '36px',
            fontWeight: 600,
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em',
          }}
        >
          3 hero directions
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0,
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
          }}
        >
          V1 was decoration on top of the existing centered hero — that's why
          it felt tibio. V2 rebuilds the hero composition itself. Each variant
          below is a structurally different hero, not a re-skin.
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
          {/* Floating label badge */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: 100,
              padding: '12px 18px',
              borderRadius: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(249, 180, 55, 0.5)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
              maxWidth: '380px',
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
              Concept {c.letter}
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
          Pick a number (1, 2, 3) or combine. Tell me your reaction even if it's "nope" — we iterate.
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.35)', margin: 0 }}>
          v1 retired · 5 concepts removed from preview
        </p>
      </footer>
    </div>
    </LanguageProvider>
  )
}
