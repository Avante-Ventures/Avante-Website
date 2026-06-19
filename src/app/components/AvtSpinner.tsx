// AvtSpinner — Tier 1 / use 04.
//
// Editorial loading state. The "A" mark gradient pulses in place at 80px
// (default) with an optional caption underneath. Replaces generic
// shadcn/radix spinners in route Suspense fallbacks and async-hydrating
// sections.
//
// Why the brand mark instead of a generic ring spinner: every loading
// moment is a brand impression. Stripe's wordmark pulse, Linear's logo
// fade, GitHub's spinning octocat, same playbook. The cost is zero
// (already shipping the asset) and the perceived loading time drops
// because the user reads "Avante is loading" not "system is busy".

import { AvanteLockup } from '@/app/components/AvanteLockup'

export interface AvtSpinnerProps {
  /** Visual size: pulls from AvanteLockup token table. Default `lg`. */
  size?: 'md' | 'lg' | 'xl'
  /** Optional caption rendered below the mark in mono uppercase. */
  caption?: string
  /** When true, render full-viewport centered (for Suspense fallbacks). */
  fullViewport?: boolean
}

export function AvtSpinner({ size = 'lg', caption, fullViewport = false }: AvtSpinnerProps) {
  const wrapperStyle: React.CSSProperties = fullViewport
    ? {
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        background: 'var(--avt-ink)',
        zIndex: 100,
      }
    : {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '32px',
      }

  return (
    <div role="status" aria-live="polite" style={wrapperStyle}>
      <AvanteLockup size={size} markOnly pulse ariaLabel="Loading" />
      {caption && (
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
          {caption}
        </span>
      )}
    </div>
  )
}
