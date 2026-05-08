// SectionMasthead — the foundational primitive for every section header
// across the site. Mirrors the masthead pattern from the home hero (2A):
// gold dot + caps eyebrow + title with optional gradient accent + optional
// description.
//
// Signature microinteraction (Apple curve): on first scroll-into-view, the
// eyebrow + title + description reveal with a staggered fade+rise using
// cubic-bezier(0.16, 1, 0.3, 1) — the "out-quint" curve that Apple uses
// for product reveals. Once played, the elements stay at rest. Respects
// prefers-reduced-motion.

import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface SectionMastheadProps {
  /** Caps eyebrow text shown above the title (e.g. "Our Playbook"). */
  eyebrow?: string
  /** Main title. Pass JSX to embed gradient accents on specific words. */
  title: ReactNode
  /** Optional secondary copy below the title. Keep ≤ 2 lines. */
  description?: ReactNode
  /** Center-align the masthead. Default: left-aligned. */
  centered?: boolean
  /** Tighter spacing variant for nested sections. */
  compact?: boolean
}

export function SectionMasthead({
  eyebrow,
  title,
  description,
  centered = false,
  compact = false,
}: SectionMastheadProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Respect user's accessibility preference. If reduced motion, skip
    // the choreography and render at rest immediately.
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

  // Apple's signature out-quint curve. Slower than the default ease-out,
  // settles into rest with a soft deceleration that feels expensive.
  const APPLE_CURVE = 'cubic-bezier(0.16, 1, 0.3, 1)'
  const baseDuration = reducedMotion ? '0ms' : '900ms'

  // Staggered reveal: eyebrow first (snappy), title second (anchor), then
  // description. The total choreography is ~1.1s — long enough to feel
  // intentional, short enough not to make the user wait.
  const stage = (delay: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity ${baseDuration} ${APPLE_CURVE} ${delay}ms, transform ${baseDuration} ${APPLE_CURVE} ${delay}ms`,
  })

  return (
    <div
      ref={ref}
      style={{
        textAlign: centered ? 'center' : 'left',
        marginBottom: compact ? 'var(--avante-space-6)' : 'var(--avante-space-10)',
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: compact ? '12px' : '20px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#F9B437',
            ...stage(0),
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#F9B437',
              boxShadow: '0 0 8px rgba(249, 180, 55, 0.6)',
            }}
          />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        style={{
          fontSize: compact ? 'clamp(22px, 3vw, 32px)' : 'clamp(28px, 4vw, 44px)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#FFFFFF',
          fontWeight: 600,
          margin: 0,
          maxWidth: centered ? '880px' : 'none',
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
            fontSize: compact ? '15px' : '18px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.65)',
            margin: '16px 0 0 0',
            maxWidth: centered ? '720px' : '640px',
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
