// SectionMasthead. Phase C editorial refactor.
//
// Old: 28-44px section title in Bricolage-via-system, modest. Read like
// SaaS section headers.
//
// New: 48-128px Funnel Display monumental poster. The title IS the moment.
// No eyebrow above it. Description switches to Funnel Display
// weight 400, lighter, larger, reads like a magazine standfirst.
//
// New optional prop: `screenNum` ("§ II — thesis" + "02 / 05" pair on the
// right). When passed, renders a pre-title meta row that anchors the
// section in the publication's table of contents.
//
// API preservation: `title`, `description`, `centered`, `compact`
// all still work.
//
// Microinteraction (Apple out-quint curve, 900ms, staggered): preserved
// from rev a3. Only the typography and color tokens were swapped.

import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface SectionMastheadProps {
  /** Main title. Pass JSX with <span class="avt-grad"> for gradient accents. */
  title: ReactNode
  /** Optional secondary copy below the title. Keep ≤ 2 lines. */
  description?: ReactNode
  /** Center-align the masthead. Default: left-aligned. */
  centered?: boolean
  /** Tighter spacing variant for nested sections. */
  compact?: boolean
  /**
   * Optional editorial screen-number row above the title:
   *   left:  "§ II — thesis"
   *   right: "02 / 05"
   * Pass either or both. When neither is set, the row is omitted entirely.
   */
  screenLabel?: string
  screenNum?: string
}

// Apple's signature out-quint curve. Slower than ease-out, settles softly.
const APPLE_CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)'

export function SectionMasthead({
  title,
  description,
  centered = false,
  compact = false,
  screenLabel,
  screenNum,
}: SectionMastheadProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      setRevealed(true)
      return
    }
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const baseDuration = reducedMotion ? '0ms' : '900ms'
  const stage = (delay: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity ${baseDuration} ${APPLE_CURVE} ${delay}ms, transform ${baseDuration} ${APPLE_CURVE} ${delay}ms`,
  })

  const showScreenRow = !!(screenLabel || screenNum)

  return (
    <div
      ref={ref}
      className="avante-editorial-masthead"
      style={{
        textAlign: centered ? 'center' : 'left',
        marginBottom: compact ? 'var(--avante-space-6)' : 'var(--avante-space-10)',
      }}
    >
      {showScreenRow && (
        <div
          style={{
            display: 'flex',
            justifyContent: centered ? 'center' : 'space-between',
            gap: '24px',
            marginBottom: compact ? '24px' : '40px',
            alignItems: 'baseline',
            ...stage(0),
          }}
        >
          {screenLabel && (
            <span
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--avt-meta)',
              }}
            >
              {screenLabel}
            </span>
          )}
          {screenNum && (
            <span
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--avt-meta)',
              }}
            >
              {screenNum}
            </span>
          )}
        </div>
      )}

      <h2
        style={{
          fontFamily: 'var(--avt-font-serif)',
          // Monumental but responsive. Compact bounded to 56px max, used
          // when the masthead is nested inside a card or smaller container.
          fontSize: compact
            ? 'clamp(28px, 4vw, 56px)'
            : 'clamp(40px, 7vw, 112px)',
          lineHeight: 1.02,
          letterSpacing: '-0.015em',
          color: '#FFFFFF',
          fontWeight: 500,
          margin: 0,
          maxWidth: centered ? '1240px' : 'none',
          marginLeft: centered ? 'auto' : 0,
          marginRight: centered ? 'auto' : 0,
          ...stage(140),
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            fontFamily: 'var(--avt-font-serif)',
            fontSize: compact ? 'clamp(15px, 1.6vw, 18px)' : 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: '0',
            color: '#cdd2ee',
            margin: compact ? '20px 0 0 0' : '32px 0 0 0',
            maxWidth: centered ? '880px' : '720px',
            marginLeft: centered ? 'auto' : 0,
            marginRight: centered ? 'auto' : 0,
            ...stage(280),
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
