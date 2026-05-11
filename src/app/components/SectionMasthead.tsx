// SectionMasthead — Phase C editorial refactor.
//
// Old: 28-44px section title in Bricolage-via-system, modest. Read like
// SaaS section headers.
//
// New: 48-128px Funnel Display monumental poster. The title IS the moment.
// The eyebrow keeps its gold-dot signature (a runtime "tag" the brand
// learned in earlier sprints) but switches to JetBrains Mono for the
// editorial publication voice. Description switches to Funnel Display
// weight 400 — lighter, larger, reads like a magazine standfirst.
//
// New optional prop: `screenNum` ("§ II — thesis" + "02 / 05" pair on the
// right). When passed, renders a pre-title meta row that anchors the
// section in the publication's table of contents.
//
// API preservation: `eyebrow`, `title`, `description`, `centered`, `compact`
// all still work. Consumers don't need to change.
//
// Microinteraction (Apple out-quint curve, 900ms, staggered): preserved
// from rev a3. Only the typography and color tokens were swapped.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AvanteLockup } from '@/app/components/AvanteLockup'

export interface SectionMastheadProps {
  /** Caps eyebrow shown above the title (e.g. "Our Playbook"). */
  eyebrow?: string
  /** Main title. Pass JSX with <span class="avt-grad"> for gradient accents. */
  title: ReactNode
  /** Optional secondary copy below the title. Keep ≤ 2 lines. */
  description?: ReactNode
  /** Center-align the masthead. Default: left-aligned. */
  centered?: boolean
  /** Tighter spacing variant for nested sections. */
  compact?: boolean
  /**
   * Optional editorial screen-number row above the eyebrow:
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
  eyebrow,
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

      {eyebrow && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: compact ? '14px' : '24px',
            fontFamily: 'var(--avt-font-body)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#F9B437',
            ...stage(60),
          }}
        >
          {/* Tier 1 / use 01 — The gold dot signature is replaced by a mini
              "A" lockup mark in xs/inline variant. Carries brand identity
              into every section header rather than abstract ornament. */}
          <AvanteLockup size="xs" markOnly variant="inline" ariaLabel="Avante section mark" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        style={{
          fontFamily: 'var(--avt-font-display)',
          // Monumental but responsive. Compact bounded to 56px max — used
          // when the masthead is nested inside a card or smaller container.
          fontSize: compact
            ? 'clamp(28px, 4vw, 56px)'
            : 'clamp(40px, 7vw, 112px)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
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
            fontFamily: 'var(--avt-font-display)',
            fontSize: compact ? 'clamp(15px, 1.6vw, 18px)' : 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
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
