// AvtCord — Phase D.
//
// A 1px hairline gradient line that draws itself in 1.4s the first time it
// enters the viewport. Borrowed from the Figma's "cord" pattern: a quiet,
// almost-imperceptible signal of section transition that activates only on
// scroll, never on initial mount. After it plays it stays at rest forever.
//
// The CSS animation lives in theme.css as `.avt-cord` + `.avt-cord-fill`;
// this component is a thin React wrapper that applies the play class
// exactly once via IntersectionObserver. We use 0.4 threshold so the cord
// is comfortably in-view (not just barely peeking) before it fires.
//
// Use freely as a section divider replacement: the editorial cord reads
// more deliberate than a standard `<hr>` and reinforces the brand language.

import { useEffect, useRef } from 'react'

export interface AvtCordProps {
  /** Final width of the drawn line as a CSS length (e.g. "62%", "420px"). */
  width?: string
  /** Vertical spacing override. Default 0. Wrap in a parent if you need padding. */
  style?: React.CSSProperties
  /** Override threshold for IntersectionObserver firing. Default 0.4. */
  threshold?: number
}

export function AvtCord({ width = '42%', style, threshold = 0.4 }: AvtCordProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('avt-cord--played')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className="avt-cord"
      style={{
        ['--cord-w' as string]: width,
        ...style,
      } as React.CSSProperties}
    >
      <div className="avt-cord-fill" />
    </div>
  )
}
