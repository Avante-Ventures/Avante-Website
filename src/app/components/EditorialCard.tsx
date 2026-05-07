// EditorialCard — the studio's repeating card primitive.
//
// One look across the site:
//   • Eyebrow tag (caps, accent color, 11px / 0.18em letter-spacing)
//   • Title (17–22px, weight 600, white, -0.01em letter-spacing)
//   • Body copy (14–15px, 0.7 white, 1.65 line-height)
//   • Optional left-border accent (3px) OR top-border accent (3px)
//   • Optional right-side highlight chip (e.g. "10× exit")
//   • Hover lift + subtle accent-tinted background
//
// Used on: HeroV2A_Masthead (FEATURES cards), PortfolioPage (VentureCard),
// FoundersPage (offer cards), InvestorsPage (thesis cards).
//
// Renders as a <Link> if `to` is passed, otherwise a <div>. Keeps the API
// flat and predictable — no slots, no children projection.

import type { CSSProperties } from 'react'
import { Link } from 'react-router'

export type EditorialCardAccent = 'border-left' | 'border-top' | 'none'

export interface EditorialCardProps {
  /** Caps eyebrow tag shown above the title. Use ALL CAPS by convention. */
  eyebrow?: string
  /** Main title (h3-equivalent). */
  title: string
  /** Body copy paragraph below the title. */
  body?: string
  /** Optional small chip rendered to the right of the eyebrow row. */
  highlight?: string
  /** Accent color for borders, eyebrow, hover tint. Defaults to gold. */
  accent?: string
  /** Where the accent border goes. Default: 'border-left'. */
  accentPosition?: EditorialCardAccent
  /** If passed, the card becomes a <Link> to this route. */
  to?: string
  /** External href (target=_blank). Mutually exclusive with `to`. */
  href?: string
  /** Override the default padding/border-radius (rare). */
  style?: CSSProperties
  /** Optional className for layout-context overrides. */
  className?: string
}

const DEFAULT_ACCENT = '#F9B437'

export function EditorialCard({
  eyebrow,
  title,
  body,
  highlight,
  accent = DEFAULT_ACCENT,
  accentPosition = 'border-left',
  to,
  href,
  style,
  className,
}: EditorialCardProps) {
  const baseStyle: CSSProperties = {
    display: 'block',
    padding: '24px 28px',
    background: 'rgba(255, 255, 255, 0.025)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderLeft: accentPosition === 'border-left' ? `3px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
    borderTop: accentPosition === 'border-top' ? `3px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '14px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    ...style,
  }

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.background = `${accent}0E`
    el.style.borderColor = `${accent}40`
    el.style.transform = 'translateY(-2px)'
  }
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.background = 'rgba(255, 255, 255, 0.025)'
    el.style.borderColor = 'rgba(255, 255, 255, 0.08)'
    el.style.transform = 'translateY(0)'
  }

  const inner = (
    <>
      {(eyebrow || highlight) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
            gap: '12px',
          }}
        >
          {eyebrow && (
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: accent,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
          )}
          {highlight && (
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#F9B437',
                padding: '3px 10px',
                borderRadius: '999px',
                background: 'rgba(249, 180, 55, 0.12)',
                border: '1px solid rgba(249, 180, 55, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {highlight}
            </div>
          )}
        </div>
      )}
      <h3
        style={{
          fontSize: '17px',
          fontWeight: 600,
          color: '#FFFFFF',
          margin: '0 0 10px 0',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      {body && (
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
          }}
        >
          {body}
        </p>
      )}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className={className}
        style={baseStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={baseStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </a>
    )
  }

  return (
    <div
      className={className}
      style={baseStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {inner}
    </div>
  )
}
