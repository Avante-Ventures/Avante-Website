// EditorialCard: Phase C editorial refactor.
//
// Old: rounded 14px card with soft glass background, 17px title, 10px
// eyebrow. Read like a SaaS feature card.
//
// New: hairline-bordered newspaper item. 2px corner radius (almost flat,
// preserves a hint of softness for screen-to-screen continuity), Funnel
// Display title at 22-28px, JetBrains Mono eyebrow with 0.22em tracking,
// gradient highlight chip when present. Background defaults to fully
// transparent so containers control their own surface, the card adds
// only structure (border + spacing), not visual weight.
//
// API preservation: the prop set is unchanged. Consumers across the site
// (HomePage hero feature row, PortfolioPage venture cards, FoundersPage
// offer cards, InvestorsPage thesis cards) get the new look automatically.
//
// One quietly powerful behavior worth noting: the hover applies a tinted
// background derived from the `accent` color via hex8 (`${accent}0E` =
// 0E hex = 14/255 alpha = 5.5%). Same trick as before, kept intact.
// The accent color itself drives a tonally consistent hover.

import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { AvanteLockup } from '@/app/components/AvanteLockup'

export type EditorialCardAccent = 'border-left' | 'border-top' | 'none'

export interface EditorialCardProps {
  /** Caps eyebrow tag shown above the title. ALL CAPS by convention. */
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
  /** When true, prepends a pulsing "A" mark before the eyebrow as a
   *  "live / active" indicator. Used for portfolio active cohort cards. */
  livePulse?: boolean
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
  livePulse = false,
  style,
  className,
}: EditorialCardProps) {
  // Border base: hairline on all sides; the accent side gets bumped to 3px
  // so the card has a clear "publication tag" of color on its left or top.
  const HAIR = 'var(--avt-hair)'
  const baseStyle: CSSProperties = {
    display: 'block',
    padding: '28px 32px',
    background: 'transparent',
    border: `1px solid ${HAIR}`,
    borderLeft: accentPosition === 'border-left' ? `3px solid ${accent}` : `1px solid ${HAIR}`,
    borderTop: accentPosition === 'border-top' ? `3px solid ${accent}` : `1px solid ${HAIR}`,
    borderRadius: '2px',
    textDecoration: 'none',
    transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
    ...style,
  }

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.background = `${accent}0E` // ~5.5% alpha
    el.style.borderColor = `${accent}40` // ~25% alpha
    if (accentPosition === 'border-left') el.style.borderLeftColor = accent
    if (accentPosition === 'border-top') el.style.borderTopColor = accent
    el.style.transform = 'translateY(-2px)'
  }
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    el.style.background = 'transparent'
    el.style.borderColor = HAIR
    if (accentPosition === 'border-left') el.style.borderLeftColor = accent
    if (accentPosition === 'border-top') el.style.borderTopColor = accent
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
            marginBottom: '16px',
            gap: '12px',
          }}
        >
          {eyebrow && (
            <div
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: accent,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {/* Tier 3 / use 12: Pulsing "A" live indicator. Renders only
                  when `livePulse` is true (e.g., active cohort ventures).
                  Replaces the conventional green dot with brand-aligned pulse. */}
              {livePulse && (
                <AvanteLockup size="xs" markOnly variant="default" pulse ariaLabel="Live" />
              )}
              {eyebrow}
            </div>
          )}
          {highlight && (
            <div
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '11.5px',
                fontWeight: 600,
                color: '#fff',
                padding: '3px 10px',
                background: 'var(--avt-grad)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
              }}
            >
              {highlight}
            </div>
          )}
        </div>
      )}
      <h3
        style={{
          fontFamily: 'var(--avt-font-display)',
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          fontWeight: 500,
          color: '#FFFFFF',
          margin: '0 0 12px 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
      {body && (
        <p
          style={{
            fontSize: '14.5px',
            lineHeight: 1.65,
            color: 'var(--avt-muted)',
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
