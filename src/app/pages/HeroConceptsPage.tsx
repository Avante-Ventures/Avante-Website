// Internal preview: Concept 2A (7/10 base) + 3 new map treatments.
//
// User confirmed Concept 2A is on the right track but missed the visual
// geographic anchor. Three new variants experiment with how to put maps
// back without making them feel like stock decoration:
//   - 2A base (text-only masthead, current 7/10 reference)
//   - 2D: Geo Strip Masthead, both maps recolored, small, with city pins
//   - 2E: Brazil Hero / SF Inset, Brazil prominent, SF small inset
//   - 2F: Live Operations Terminal, no maps, Bloomberg-style status feed

import { Helmet } from 'react-helmet-async'
import { HeroV2A_Masthead } from '@/app/components/heroes/HeroV2A_Masthead'
import { HeroV2D_GeoStrip } from '@/app/components/heroes/HeroV2D_GeoStrip'
import { HeroV2E_BrazilHero } from '@/app/components/heroes/HeroV2E_BrazilHero'
import { HeroV2F_LiveTerminal } from '@/app/components/heroes/HeroV2F_LiveTerminal'
import { LanguageProvider } from '@/app/hooks/useLanguage'

const CONCEPTS = [
  {
    letter: '2A',
    name: 'Reference: text masthead (7/10 baseline)',
    pitch:
      'Original Concept 2A. Text-only dateline + portfolio strip. No maps. The 7/10 your gut was reading.',
    Component: HeroV2A_Masthead,
  },
  {
    letter: '2D',
    name: 'Geo Strip Masthead: maps return, recolored',
    pitch:
      'Both maps return as a small horizontal strip ABOVE the wordmark. USA (gold-tinted, ~50px) → animated dotted gradient ribbon → Brazil (purple-tinted, ~70px). City pins pulse on each. The maps are now branded artifacts, not stock decoration. Text dateline tucked below in tighter caps.',
    Component: HeroV2D_GeoStrip,
  },
  {
    letter: '2E',
    name: 'Brazil Hero / SF Inset: hierarchy matches the brand',
    pitch:
      'Brazil BIG (~280px tall, purple glow) on the right column with SP/Rio/BH pins floating + a labeled "São Paulo · HQ" badge. Top-right corner: small SF inset card with a tiny USA map and "+ San Francisco · Capital · Playbook source". The visual hierarchy literally is the brand promise.',
    Component: HeroV2E_BrazilHero,
  },
  {
    letter: '2F',
    name: 'Live Operations Terminal: no maps, but undeniable',
    pitch:
      'Replaces the dateline with a Bloomberg-style live status panel. Cycles every 4s through "SP · 3 ventures incubating", "SF · capital partner", "GLOBAL · 50% target IRR", "NEXT · Q3 2026 cohort accepting founders". Geography is implied by city codes. Reads as "active operation, not a brochure."',
    Component: HeroV2F_LiveTerminal,
  },
]

export default function HeroConceptsPage() {
  return (
    <LanguageProvider locale="en">
      <div style={{ background: '#08091A', color: '#FFFFFF' }}>
        <Helmet>
          <title>Hero Concepts: 2A + map proposals (internal preview)</title>
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
            Internal preview · noindex · 2A reference + 3 map proposals
          </p>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 600,
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em',
            }}
          >
            How to put SF + São Paulo back in
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
            2A is the 7/10 baseline (text-only masthead). 2D returns the maps as
            branded artifacts in a strip masthead. 2E makes Brazil the visual
            hero with SF as inset. 2F drops the maps entirely for a live
            operations terminal. Pick one, or combine (e.g. "2D masthead + 2E
            Brazil right column" is the most ambitious combo).
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
                background: 'rgba(0, 0, 0, 0.78)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(249, 180, 55, 0.5)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                maxWidth: '460px',
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
            Pick a letter (2A · 2D · 2E · 2F) or combine (e.g. "2D + 2E").
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.35)', margin: 0 }}>
            Earlier 2B + 2C retired · Concepts 1 + 3 retired
          </p>
        </footer>
      </div>
    </LanguageProvider>
  )
}
