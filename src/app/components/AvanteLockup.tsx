// Avante editorial lockup: gradient "A" mark + Funnel Display "vante" word.
// Phase B of the redesign. Replaces the bitmap logo with a vector-feeling
// composition that scales to monumental sizes (footer = 280px wide A) and
// shrinks cleanly to navbar (22px wide A).
//
// The mark itself is shipped as a PNG in /redesign-assets/avante-A.png — a
// tightly cropped silhouette of the "A" with the gradient already applied.
// We import via figma:asset to get hashed-cache + Vite asset pipeline rather
// than referencing it as a public URL (so it ships into the bundle).
//
// Sizes follow the Figma rhythm: sm (navbar) / md / lg / xl (hero) / mono
// (footer monumental). Word weight stays 500 — the mark carries the gravity.

import { CSSProperties, ReactNode } from 'react'

type LockupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'mono'

/**
 * Visual variant of the mark.
 *  - `default`    : full-color gradient PNG.
 *  - `watermark`  : low-opacity (8%) gradient — for backgrounds, frame
 *                   bottom-corners, decorative use.
 *  - `inline`     : same as default but with no marginBottom (vertically
 *                   centered for inline-with-text usage like bullets +
 *                   section anchors).
 */
type LockupVariant = 'default' | 'watermark' | 'inline'

interface AvanteLockupProps {
  /** Visual size preset. `xs` is bullet (14px A), `mono` is footer (280px A). */
  size?: LockupSize
  /** Visual variant — gradient default, watermark, or inline-aligned. */
  variant?: LockupVariant
  /** Optional override for the word ("vante" by default). */
  word?: ReactNode
  /** Hide the word and render mark only (favicon / decorative use). */
  markOnly?: boolean
  /** Pulse animation on the mark (for live indicators / loading states). */
  pulse?: boolean
  /** Aria label for screen readers. */
  ariaLabel?: string
  /** Extra inline style passed to the wrapper. */
  style?: CSSProperties
  className?: string
}

// The avante-A.png asset has ~18% horizontal padding around the actual
// glyph (the cropped bounding box includes extra whitespace from the
// original artboard). To produce optical "kerning" rather than a giant
// visual gap, we (a) keep `gap` at 0 and (b) apply a negative `wordPull`
// on the word to slide it into the asset padding.
//
// Fix 5 (TOC panel — Spiekermann): with `align-items: flex-end`, the "A"
// PNG bounding box hits the container's bottom — but the asset has ~14%
// bottom padding inside the box, so the visible glyph baseline ends ABOVE
// the wordmark baseline (the "v" descender visibly drops below the "A").
// Negative margin-bottom extends the box DOWN past the flex baseline,
// which moves the visible "A" glyph DOWN to align with the wordmark.
// Magnitudes scale ~12% of mark height, matching the asset's bottom
// padding ratio. Iterated visually at 1440px until "A" baseline ≈ "v" baseline.
const SIZE_TOKENS: Record<
  LockupSize,
  { mark: number; word: number; gap: number; markOffset: number; wordPull: number }
> = {
  xs: { mark: 14, word: 14, gap: 0, markOffset: -1, wordPull: 3 },
  sm: { mark: 22, word: 24, gap: 0, markOffset: -2, wordPull: 4 },
  md: { mark: 36, word: 40, gap: 0, markOffset: -3, wordPull: 7 },
  lg: { mark: 64, word: 72, gap: 0, markOffset: -5, wordPull: 14 },
  xl: { mark: 120, word: 132, gap: 0, markOffset: -10, wordPull: 26 },
  mono: { mark: 280, word: 340, gap: 0, markOffset: -22, wordPull: 60 },
}

// `A` aspect ratio comes from the source asset (364:535).
const A_ASPECT = 364 / 535

export function AvanteLockup({
  size = 'sm',
  variant = 'default',
  word = 'vante',
  markOnly = false,
  pulse = false,
  ariaLabel = 'Avante',
  style,
  className,
}: AvanteLockupProps) {
  const tokens = SIZE_TOKENS[size]
  const markHeight = tokens.mark / A_ASPECT

  // Variant styling: watermark drops opacity dramatically; inline removes
  // the markOffset so the mark vertically centers with surrounding text.
  const isInline = variant === 'inline'
  const isWatermark = variant === 'watermark'
  const markOpacity = isWatermark ? 0.08 : 1
  const effectiveMarkOffset = isInline ? 0 : tokens.markOffset

  return (
    <span
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: isInline ? 'center' : 'flex-end',
        gap: markOnly ? 0 : tokens.gap,
        lineHeight: 1,
        verticalAlign: isInline ? 'middle' : 'baseline',
        ...style,
      }}
    >
      <span
        aria-hidden
        className={pulse ? 'avt-lockup-pulse' : undefined}
        style={{
          display: 'inline-block',
          width: tokens.mark,
          height: markHeight,
          backgroundImage: `url(/redesign-assets/avante-A.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          marginBottom: effectiveMarkOffset,
          flexShrink: 0,
          opacity: markOpacity,
        }}
      />
      {!markOnly && (
        <span
          style={{
            fontFamily: 'var(--avt-font-display)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            color: '#fff',
            fontSize: tokens.word,
            // Pull the word into the asset's right-side padding so the
            // visual gap reads as proper kerning rather than a divider.
            marginLeft: -tokens.wordPull,
          }}
        >
          {word}
        </span>
      )}

      {pulse && (
        <style>{`
          .avt-lockup-pulse {
            animation: avt-lockup-pulse-kf 1.6s ease-in-out infinite;
          }
          @keyframes avt-lockup-pulse-kf {
            0%, 100% { opacity: ${markOpacity}; transform: scale(1); }
            50%      { opacity: ${Math.min(markOpacity + 0.4, 1)}; transform: scale(1.05); }
          }
          @media (prefers-reduced-motion: reduce) {
            .avt-lockup-pulse { animation: none; }
          }
        `}</style>
      )}
    </span>
  )
}
