// HERO CONCEPT E — Particle constellation (portfolio map)
//
// Replaces the static USA + Brazil maps with a constellation diagram:
// AVANTE at center, 7 portfolio company nodes on a slowly-rotating orbit
// (one full revolution every 120 seconds). Faint gradient lines connect
// each portfolio node back to AVANTE. Pulse animations on every node.
//
// Why: visualizes "ecosystem" / "compound" — the brand promise. Doubles
// as social proof (the SocialProofStrip can be moved or trimmed if this
// ships, since the portfolio names are already visible in the hero).

import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'
import { HeroBody } from './HeroBody'

const PORTFOLIO = [
  { name: 'Sigga', color: '#F4A261' },
  { name: 'Mahway', color: '#F9B437' },
  { name: 'WIR', color: '#98509A' },
  { name: 'Bamboo DCM', color: '#42468C' },
  { name: 'AlphaLit', color: '#F4A261' },
  { name: 'Astonishing', color: '#F9B437' },
  { name: 'inDinero', color: '#98509A' },
]

export function HeroE_Constellation() {
  return (
    <section
      className="flex items-center justify-center relative w-full"
      style={{
        overflow: 'hidden',
        background: '#151E35',
        position: 'relative',
        height: '100vh',
      }}
    >
      {/* No AvanteHeroBackground here — the constellation IS the background */}
      <AvanteHeroBackground />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.7,
        }}
        aria-hidden
      >
        <defs>
          <radialGradient id="heroe-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9B437" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F9B437" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow halo */}
        <circle cx="50" cy="50" r="22" fill="url(#heroe-center-glow)" />

        {/* Rotating orbit group */}
        <g
          style={{
            transformOrigin: '50px 50px',
            animation: 'heroe-rotate 120s linear infinite',
          }}
        >
          {PORTFOLIO.map((p, i) => {
            const total = PORTFOLIO.length
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2 // start at top
            const r = 32
            const x = 50 + Math.cos(angle) * r
            const y = 50 + Math.sin(angle) * r
            const labelOffset = 3.2
            const labelX = 50 + Math.cos(angle) * (r + labelOffset)
            const labelY = 50 + Math.sin(angle) * (r + labelOffset)
            return (
              <g key={p.name}>
                {/* Connection line to center */}
                <line
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={p.color}
                  strokeWidth="0.18"
                  strokeOpacity="0.3"
                />
                {/* Node halo */}
                <circle cx={x} cy={y} r="1.6" fill={p.color} opacity="0.18">
                  <animate
                    attributeName="r"
                    values="1.6;2.4;1.6"
                    dur="3.5s"
                    begin={`${(i * 0.4).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Node */}
                <circle cx={x} cy={y} r="0.65" fill={p.color}>
                  <animate
                    attributeName="opacity"
                    values="0.7;1;0.7"
                    dur="3.5s"
                    begin={`${(i * 0.4).toFixed(1)}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Counter-rotate the label so it stays upright */}
                <g
                  style={{
                    transformOrigin: `${x}px ${y}px`,
                    animation: 'heroe-counter-rotate 120s linear infinite',
                  }}
                >
                  <text
                    x={labelX}
                    y={labelY}
                    fill="rgba(255,255,255,0.5)"
                    fontSize="1.25"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {p.name}
                  </text>
                </g>
              </g>
            )
          })}
        </g>

        {/* Center node — Avante */}
        <circle cx="50" cy="50" r="2.2" fill="#F9B437" opacity="0.25" />
        <circle cx="50" cy="50" r="1.1" fill="#F9B437">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <HeroBody />

      <style>{`
        @keyframes heroe-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroe-counter-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroe-rotate"], [style*="heroe-counter-rotate"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
