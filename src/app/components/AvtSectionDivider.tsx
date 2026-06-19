// AvtSectionDivider — Tier 3 / use 11.
//
// Editorial section divider. Renders a centered gradient "A" mark flanked
// by two thin gradient hairlines that fade to transparent at the page
// edges. Replaces standard `<hr>` with something that reads like a
// section break in a printed magazine, quiet but emphatic.
//
// Used on long-form routes (/why-avante, /principles) to mark conceptual
// transitions between blocks of body content. Not intended for high-density
// layouts (cards, grids) where it would compete for visual weight.
//
// The hairlines use the same gradient palette as the rest of the system
// (orange → pink → purple → indigo) but with transparent endpoints so
// they melt into the page background rather than terminating sharply.

import { AvanteLockup } from '@/app/components/AvanteLockup'

export interface AvtSectionDividerProps {
  /** Vertical padding around the divider. Default 48px each side. */
  spacing?: number
  /** Mark size, usually `sm` (small breaks) or `md` (major breaks). */
  size?: 'sm' | 'md'
}

export function AvtSectionDivider({ spacing = 48, size = 'sm' }: AvtSectionDividerProps) {
  return (
    <div
      role="presentation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        margin: `${spacing}px 0`,
        width: '100%',
      }}
    >
      <span
        aria-hidden
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(244, 169, 58, 0.35) 35%, rgba(168, 66, 155, 0.45) 70%, rgba(58, 47, 143, 0.35) 100%)',
        }}
      />
      <AvanteLockup size={size} markOnly variant="default" ariaLabel="" />
      <span
        aria-hidden
        style={{
          flex: 1,
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(58, 47, 143, 0.35) 0%, rgba(168, 66, 155, 0.45) 30%, rgba(244, 169, 58, 0.35) 65%, transparent 100%)',
        }}
      />
    </div>
  )
}
