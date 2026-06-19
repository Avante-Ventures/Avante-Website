// CompoundingChart: the signature visual moment of the site.
//
// Visual brief: a minimal "compounding curve" chart drawn with 7 dots
// arranged on an exponential curve from bottom-left to top-right, connected
// by a faint guide line. Each dot represents a hypothetical cohort year;
// later dots are larger, communicating the studio's compounding thesis
// without literal data labels. The chart is tactile, not informational.
// The math is the message.
//
// Animation: on scroll-into-view (IntersectionObserver, plays once), the
// guide curve draws itself first using stroke-dasharray, then the dots
// fade+scale in with stagger. Apple curve cubic-bezier(0.16, 1, 0.3, 1),
// total choreography ~1.6s. Respects prefers-reduced-motion.
//
// Why this specifically:
//   - Brand-aligned: "Built to compound" → the literal compounding curve
//   - Genre-breaking: most VC sites use bar charts or pie charts. This is
//     a single elegant data sketch, like a Tufte sparkline scaled up
//   - Memorable: a viewer remembers "the dots growing on a curve" months
//     later. Generic gradient orbs do not get remembered

import { useLanguage } from '@/app/hooks/useLanguage'

interface CompoundingChartProps {
  /** Optional eyebrow above the chart. Defaults bilingual. */
  eyebrow?: string
  /** Optional caption below the chart. Defaults bilingual. */
  caption?: string
  /** Compact mode for embedding in tighter spots (smaller dots, less padding). */
  compact?: boolean
}

const APPLE_CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const ACCENT = '#F9B437'

// 7 dots arranged on an exponential curve. y = a * b^x where a, b are
// chosen so the curve goes from (10%, 85%) to (95%, 12%) of the SVG box.
// Dot radii grow non-linearly to emphasize compounding.
const DOTS = [
  { x: 10, y: 85, r: 3 },
  { x: 24, y: 76, r: 3.6 },
  { x: 38, y: 64, r: 4.4 },
  { x: 52, y: 50, r: 5.4 },
  { x: 66, y: 36, r: 6.8 },
  { x: 80, y: 22, r: 8.6 },
  { x: 94, y: 12, r: 11 },
]

// Smooth path through the dots using cubic Bézier curves (catmull-rom-like).
// Hand-tuned control points that generate a clean exponential-feeling curve.
const CURVE_PATH =
  'M 10,85 C 16,82 19,80 24,76 C 30,72 34,68 38,64 C 44,58 48,54 52,50 C 58,44 62,40 66,36 C 72,30 76,26 80,22 C 86,17 90,14 94,12'

export function CompoundingChart({
  eyebrow,
  caption,
  compact = false,
}: CompoundingChartProps) {
  const { language } = useLanguage()
  const t = (en: string, pt: string, es?: string) =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en

  const eyebrowText =
    eyebrow ?? t('Built to compound', 'Construído para compor', 'Construido para componer')
  // Caption, Round 8 update: replaced "Vintage 1, year 2" anchor with
  // an operating thesis statement ("Building 3-4 companies per year.
  // Cashflow-focused machines.") that frames the compounding curve as
  // a function of execution discipline rather than vintage age.
  const captionText =
    caption ??
    t(
      'Building 3–4 companies per year. Cashflow‑focused machines.',
      'Construímos 3–4 empresas por ano. Máquinas focadas em cashflow.',
      'Construimos 3–4 empresas por año. Máquinas enfocadas en cashflow.'
    )

  // Total path length is approximately the diagonal of the curve, ~110 units.
  const PATH_LEN = 130

  // Animation strategy: CSS @keyframes that play ONCE on mount, regardless
  // of IntersectionObserver state. This means SSR / prerender / Playwright
  // screenshot all show the chart in its final state, never blank. The
  // animation is pure enhancement; the chart is never gated by JS state.
  // prefers-reduced-motion disables the keyframes via @media query.

  return (
    <figure
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: compact ? '14px' : '20px',
      }}
    >
      {/* Eyebrow, same gold-dot signature as the masthead family */}
      <figcaption
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: ACCENT,
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: ACCENT,
            boxShadow: `0 0 8px ${ACCENT}99`,
          }}
        />
        <span>{eyebrowText}</span>
      </figcaption>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          maxWidth: compact ? '420px' : '720px',
          height: 'auto',
          aspectRatio: '1.6 / 1',
          overflow: 'visible',
        }}
        aria-label={t(
          'Avante studio compounding curve: illustrative, not data',
          'Curva de compounding do studio Avante: ilustrativa, não dados'
        )}
        role="img"
      >
        {/* Radial gradient for the LAST dot, communicates jerarquía narrativa.
            Dots 1-6 are gold; dot 7 transitions gold center → purple edge,
            signaling "the future is where the model goes non-linear" without
            disrupting the unified palette.                                  */}
        <defs>
          <radialGradient id="avt-future-dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F9B437" />
            <stop offset="55%" stopColor="#F4A261" />
            <stop offset="100%" stopColor="#98509A" />
          </radialGradient>
        </defs>
        {/* CSS keyframes: curve draws + dots pop in. Plays once on mount.
            Animations are enhancement only; final state is the rendered
            state, so prerender/SSR/Playwright always see the full chart. */}
        <style>{`
          @keyframes avt-curve-draw {
            from { stroke-dashoffset: ${PATH_LEN}; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes avt-dot-pop {
            from { transform: scale(0); opacity: 0; }
            to   { transform: scale(1); opacity: var(--final-opacity, 1); }
          }
          .avt-curve {
            stroke-dasharray: ${PATH_LEN};
            stroke-dashoffset: 0;
            animation: avt-curve-draw 1400ms ${APPLE_CURVE} both;
          }
          .avt-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: avt-dot-pop 700ms ${APPLE_CURVE} both;
          }
          @media (prefers-reduced-motion: reduce) {
            .avt-curve, .avt-dot { animation: none; }
          }
        `}</style>

        {/* Faint baseline (y-axis hint) */}
        <line
          x1="6"
          y1="92"
          x2="98"
          y2="92"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />

        {/* Compounding curve path, draws itself once on mount */}
        <path
          className="avt-curve"
          d={CURVE_PATH}
          fill="none"
          stroke={ACCENT}
          strokeWidth="0.6"
          strokeOpacity="0.35"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${ACCENT}33)`,
          }}
        />

        {/* The 7 compounding dots, staggered via animation-delay inline.
            The last dot uses the radial gradient (gold → purple) to signal
            narrative hierarchy. The future cohort is where compounding
            transitions to category-leadership outcomes.                    */}
        {DOTS.map((dot, i) => {
          const stagger = 600 + i * 90
          const isFuture = i === DOTS.length - 1
          const finalOpacity = isFuture ? 1 : 0.55 + i * 0.06
          return (
            <circle
              key={i}
              className="avt-dot"
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={isFuture ? 'url(#avt-future-dot)' : ACCENT}
              opacity={finalOpacity}
              style={
                {
                  animationDelay: `${stagger}ms`,
                  ['--final-opacity' as string]: String(finalOpacity),
                  filter: isFuture
                    ? `drop-shadow(0 0 ${dot.r * 1.6}px rgba(152, 80, 154, 0.6)) drop-shadow(0 0 ${dot.r * 0.9}px ${ACCENT}aa)`
                    : `drop-shadow(0 0 ${dot.r * 0.8}px ${ACCENT}66)`,
                } as React.CSSProperties
              }
            />
          )
        })}
      </svg>

      <p
        style={{
          margin: 0,
          fontSize: compact ? '12px' : '13px',
          color: 'rgba(255, 255, 255, 0.5)',
          fontStyle: 'italic',
          letterSpacing: '0.02em',
          textAlign: 'center',
          maxWidth: '420px',
        }}
      >
        {captionText}
      </p>
    </figure>
  )
}
