// SectionMasthead — the foundational primitive for every section header
// across the site. Mirrors the masthead pattern from the home hero (2A):
// gold dot + caps eyebrow + title with optional gradient accent + optional
// description.
//
// Replaces the previous SectionHeader. Kept as a separate component so the
// migration can happen section-by-section without breaking what's there.

import type { ReactNode } from 'react'

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
  return (
    <div
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
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
