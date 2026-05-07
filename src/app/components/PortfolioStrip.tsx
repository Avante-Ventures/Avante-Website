// PortfolioStrip — the social-proof line that already appears in the
// home hero (2A). Now a reusable primitive for placing in 2-3 strategic
// locations: end of WhyAvante page, above the contact form, and as the
// replacement for the retired Behind-the-Scenes placeholder section.
//
// All-text, no images. Dot separators. Lightweight + responsive.

interface PortfolioStripProps {
  /** Optional eyebrow label. Default: "PORTFOLIO" */
  label?: string
  /** Optional Link to a /portfolio page. Renders a "View all →" affordance. */
  viewAllHref?: string
  /** Whether to render with a top border separator. Default: true. */
  bordered?: boolean
  /** Compact mode reduces vertical padding. Default: false. */
  compact?: boolean
}

const PORTFOLIO_NAMES = [
  'SIGGA',
  'MAHWAY',
  'WIR',
  'BAMBOO DCM',
  'ALPHALIT',
  'INDINERO',
]

export function PortfolioStrip({
  label = 'Portfolio',
  viewAllHref,
  bordered = true,
  compact = false,
}: PortfolioStripProps) {
  return (
    <div
      style={{
        paddingTop: compact ? '16px' : '24px',
        paddingBottom: compact ? '16px' : '24px',
        borderTop: bordered ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.16em',
        color: 'rgba(255, 255, 255, 0.45)',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: 'rgba(255, 255, 255, 0.35)', textTransform: 'uppercase' }}>
        {label} ·
      </span>
      {PORTFOLIO_NAMES.map((name, i) => (
        <span
          key={name}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}
        >
          <span>{name}</span>
          {i < PORTFOLIO_NAMES.length - 1 && (
            <span style={{ opacity: 0.3 }}>·</span>
          )}
        </span>
      ))}
      {viewAllHref && (
        <a
          href={viewAllHref}
          style={{
            marginLeft: 'auto',
            color: '#F9B437',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.12em',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          VIEW ALL →
        </a>
      )}
    </div>
  )
}
