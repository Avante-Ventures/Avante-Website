// EditorialTicker — Phase D.
//
// A horizontal infinite-scroll strip of monospace pill cells that telegraphs
// the studio's operating reality (vintage, exits, intake metrics, offices,
// legal, etc.) in a single bilingual line. Borrowed from the Bloomberg /
// FT publication ticker pattern: high-density, low-attention, "I'm
// confident enough to show this on a strip."
//
// Why a ticker for a venture firm:
//   • Avante's home reduced to 7 sections (Move B). The ticker reintroduces
//     ambient density without bloating section count.
//   • Track-record stats (Sigga 10x, $500MM+, WIR 5x intake) live too deep
//     in the page. The ticker surfaces them above the fold.
//   • The Figma ships a ticker — adopting it brings the editorial vocabulary
//     in without touching arch.
//
// Implementation: CSS @keyframes scroll the strip from 0 → -50% over 56s.
// The list renders TWICE so the loop is visually seamless. No JS animation
// frame loop, no scroll-position math. prefers-reduced-motion pauses it.

import { useLanguage } from '@/app/hooks/useLanguage'

type TickItem = [
  labelEn: string,
  valueEn: string,
  labelPt: string,
  valuePt: string,
  labelEs: string,
  valueEs: string,
  arrow?: 'up' | 'dn',
]

// Single source of trilingual truth. Keep edits to this list — DO NOT
// fork to three arrays per language. The component picks the side based
// on the active locale at render time.
const TICKS: TickItem[] = [
  ['portfolio · pipeline', '1 active · 4 pipeline', 'portfólio · pipeline', '1 ativa · 4 pipeline', 'portafolio · pipeline', '1 activa · 4 pipeline'],
  ['cohort 1', 'year 1 of building · live', 'cohort 1', 'ano 1 de building · ativa', 'cohort 1', 'año 1 de building · activa', 'up'],
  ['team track record', '$500M+ invested', 'track record do time', '$500M+ investidos', 'track record del equipo', '$500M+ invertidos'],
  ['exits · sigga', '10x', 'exits · sigga', '10x', 'exits · sigga', '10x', 'up'],
  ['exits · accera', '4x MOI', 'exits · accera', '4x MOI', 'exits · accera', '4x MOI', 'up'],
  ['flagship · WIR', '5x intake volume', 'flagship · WIR', '5x volume intake', 'flagship · WIR', '5x volumen de intake', 'up'],
  ['cost reduction · WIR', '90% underwriting', 'redução custo · WIR', '90% underwriting', 'reducción costo · WIR', '90% underwriting', 'up'],
  ['offices', 'SP · SF', 'escritórios', 'SP · SF', 'oficinas', 'SP · SF'],
  ['legal', 'Lefosse · Foley', 'jurídico', 'Lefosse · Foley', 'legal', 'Lefosse · Foley'],
  ['next memo', 'weekly', 'próxima carta', 'semanal', 'próxima carta', 'semanal'],
  ['founded', 'são paulo · 2024', 'fundada', 'são paulo · 2024', 'fundada', 'são paulo · 2024'],
  ['horizon', 'here in 2034', 'horizonte', 'aqui em 2034', 'horizonte', 'aquí en 2034'],
]

export function EditorialTicker() {
  const { language } = useLanguage()
  const items = TICKS.map(([en, ev, pt, pv, es, esv, arrow]) => ({
    label: language === 'pt' ? pt : language === 'es' ? es : en,
    value: language === 'pt' ? pv : language === 'es' ? esv : ev,
    arrow,
  }))

  return (
    <div
      className="avt-ticker"
      role="marquee"
      aria-label={
        language === 'pt'
          ? 'Métricas operacionais — Avante studio'
          : language === 'es'
            ? 'Métricas operativas — Avante studio'
            : 'Operating metrics — Avante studio'
      }
      style={{
        position: 'relative',
        borderTop: '1px solid var(--avt-hair)',
        borderBottom: '1px solid var(--avt-hair)',
        overflow: 'hidden',
        background: 'var(--avt-ink-2)',
      }}
    >
      <div className="avt-ticker-strip">
        {/* Render the list twice for seamless infinite scroll. */}
        {[0, 1].map((dup) => (
          <div key={dup} style={{ display: 'flex', flexShrink: 0 }} aria-hidden={dup === 1}>
            {items.map((item, idx) => (
              <TickerCell
                key={`${dup}-${idx}`}
                label={item.label}
                value={item.value}
                arrow={item.arrow}
              />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .avt-ticker-strip {
          display: flex;
          width: max-content;
          animation: avt-ticker-scroll 56s linear infinite;
        }
        .avt-ticker:hover .avt-ticker-strip { animation-play-state: paused; }
        @keyframes avt-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .avt-ticker-strip { animation: none; }
        }
      `}</style>
    </div>
  )
}

function TickerCell({ label, value, arrow }: { label: string; value: string; arrow?: 'up' | 'dn' }) {
  return (
    <div
      style={{
        padding: '14px 28px',
        borderRight: '1px solid var(--avt-hair)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        whiteSpace: 'nowrap',
        // Round 8.4 type pivot: ticker shed the JetBrains Mono "console feed"
        // look that read as AI/tech. Bricolage Grotesque keeps the editorial
        // publication voice consistent with the rest of the meta labels.
        fontFamily: 'var(--avt-font-body)',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          color: 'var(--avt-meta)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
          fontSize: '11px',
        }}
      >
        {label}
      </span>
      <span style={{ color: '#fff', fontWeight: 600 }}>{value}</span>
      {arrow && (
        <span
          style={{
            color: arrow === 'up' ? '#7dd394' : '#e26a7d',
            fontSize: '10px',
          }}
          aria-hidden
        >
          {arrow === 'up' ? '▲' : '▼'}
        </span>
      )}
    </div>
  )
}
