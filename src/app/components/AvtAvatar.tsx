// AvtAvatar — Tier 2 / use 05.
//
// Square avatar with hairline border. Renders the team member's photo
// when present; otherwise renders a centered "A" mark in the gradient.
// Used in TeamGrid for partners and (future) operators / advisors who
// don't have headshots yet.
//
// Why not just use a generic "person" icon as fallback: every fallback
// pixel is a brand impression. The Avante "A" turns "no photo" from an
// awkward absence into an intentional editorial moment.

import { AvanteLockup } from '@/app/components/AvanteLockup'

export interface AvtAvatarProps {
  /** Image URL (webp/png/jpg). When undefined or empty, renders the placeholder. */
  src?: string
  /** Alt text — used when image renders, ignored for placeholder (the lockup
   *  carries its own ariaLabel). */
  alt?: string
  /** Square edge length in px. Default 120. Mobile screens may want 80-96. */
  size?: number
  /** When true, applies grayscale(100%) on the photo (matches TeamGrid pattern). */
  grayscale?: boolean
  /** Optional className for layout-context overrides. */
  className?: string
}

export function AvtAvatar({
  src,
  alt = '',
  size = 120,
  grayscale = false,
  className,
}: AvtAvatarProps) {
  const hasPhoto = !!src
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        background: 'var(--avt-ink-3)',
        border: '1px solid var(--avt-hair-2)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {hasPhoto ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: grayscale ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.3s ease',
          }}
        />
      ) : (
        // Placeholder: gradient "A" mark centered. Sized at ~50% of the
        // tile so it has comfortable breathing room from the hairline border.
        <AvanteLockup
          size={size >= 96 ? 'lg' : 'md'}
          markOnly
          variant="default"
          ariaLabel={alt || 'Avante team member'}
        />
      )}
    </div>
  )
}
