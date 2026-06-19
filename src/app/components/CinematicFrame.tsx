// CinematicFrame — Phase D.
//
// An editorial photo frame with camera-bracket corners, hairline border,
// caption strip on top, and bottom-left + bottom-right metadata slots.
// The photograph itself is a CSS background (cover, center) so the frame
// crops gracefully across aspect ratios.
//
// Borrowed from the Figma's cinematic moments. These are the "stop and
// breathe" visual beats between data-dense sections. They give the page
// permission to slow down without wasting a full hero.
//
// We pin the brackets as 4 corner squares with hairline borders. Two are
// CSS pseudo-elements on the parent (top-right, bottom-left), and two are
// child spans (top-left, bottom-right). This pattern gets us all 4
// brackets with minimum DOM and no JS.
//
// Caption rendering: the top strip ("frame 001 — to be commissioned · av.
// paulista · 06:14 BRT") stays outside the frame in its own row, with a
// hairline separator. The bottom-left slot is bilingual; the bottom-right
// is technical metadata (aspect ratio + time).

import type { CSSProperties, ReactNode } from 'react'
import { AvanteLockup } from '@/app/components/AvanteLockup'

export interface CinematicFrameProps {
  /** Public URL or imported asset path for the frame photograph. */
  imageUrl: string
  /** Aspect ratio CSS string. Defaults to 21:9. Use 4/5 for portrait beats. */
  aspectRatio?: string
  /** Background-position override. Defaults to "center". */
  backgroundPosition?: string
  /** Top caption (left side). E.g. "frame 001 — to be commissioned". */
  captionLeft?: ReactNode
  /** Top caption (right side). E.g. "av. paulista · são paulo · 06:14". */
  captionRight?: ReactNode
  /** Bottom-left slot inside the frame. E.g. "— frame · São Paulo at dawn". */
  slotLeft?: ReactNode
  /** Bottom-right slot inside the frame. E.g. "21:9 · 06:14 BRT". */
  slotRight?: ReactNode
  /** When true, renders a faint "A" watermark in the bottom-left of the
   *  frame as an editorial sigil. Defaults to true; opt out for frames
   *  where it would conflict with the photography subject. */
  watermark?: boolean
  /** Extra inline styling for the outer wrapper. */
  style?: CSSProperties
}

export function CinematicFrame({
  imageUrl,
  aspectRatio = '21 / 9',
  backgroundPosition = 'center',
  captionLeft,
  captionRight,
  slotLeft,
  slotRight,
  watermark = true,
  style,
}: CinematicFrameProps) {
  const captionRow = captionLeft || captionRight

  return (
    <figure style={{ margin: 0, ...style }}>
      {captionRow && (
        <figcaption
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            marginBottom: '0',
            fontFamily: 'var(--avt-font-mono)',
            fontSize: '11px',
            color: 'var(--avt-meta)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            borderBottom: '1px solid var(--avt-hair)',
          }}
        >
          <span>{captionLeft}</span>
          <span>{captionRight}</span>
        </figcaption>
      )}

      <div
        className="avt-cine-frame"
        style={{
          marginTop: captionRow ? '20px' : 0,
          position: 'relative',
          border: '1px solid var(--avt-hair-2)',
          aspectRatio,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition,
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
          // Subtle vignette
          boxShadow: 'inset 0 0 120px rgba(6, 7, 13, 0.55)',
        }}
      >
        {/* Top-left bracket */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '18px',
            left: '18px',
            width: '18px',
            height: '18px',
            borderTop: '1px solid #fff',
            borderLeft: '1px solid #fff',
            opacity: 0.85,
          }}
        />
        {/* Bottom-right bracket */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '18px',
            right: '18px',
            width: '18px',
            height: '18px',
            borderBottom: '1px solid #fff',
            borderRight: '1px solid #fff',
            opacity: 0.85,
          }}
        />

        {/* Top-right + bottom-left brackets via inline pseudo-style div tricks */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '18px',
            height: '18px',
            borderTop: '1px solid #fff',
            borderRight: '1px solid #fff',
            opacity: 0.85,
          }}
        />
        <span
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '18px',
            width: '18px',
            height: '18px',
            borderBottom: '1px solid #fff',
            borderLeft: '1px solid #fff',
            opacity: 0.85,
          }}
        />

        {/* Tier 1 / use 02 — Editorial sigil. A watermark "A" placed in the
            top-right of the frame at 8% opacity. Doubles as a "this frame
            is Avante's" stamp without competing with the slot text below. */}
        {watermark && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '14%',
              right: '8%',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <AvanteLockup size="xl" markOnly variant="watermark" ariaLabel="" />
          </div>
        )}

        {/* Bottom slots (text overlay with shadow for legibility on any photo) */}
        {(slotLeft || slotRight) && (
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '28px',
              right: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              fontFamily: 'var(--avt-font-mono)',
              fontSize: '11px',
              color: '#fff',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              textShadow: '0 1px 8px rgba(0, 0, 0, 0.6)',
              zIndex: 3,
            }}
          >
            <span>{slotLeft}</span>
            <span style={{ opacity: 0.85 }}>{slotRight}</span>
          </div>
        )}
      </div>
    </figure>
  )
}
