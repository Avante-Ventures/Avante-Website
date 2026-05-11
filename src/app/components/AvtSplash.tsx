// AvtSplash — Tier 3 / use 09.
//
// One-time-per-session brand splash. On the visitor's first arrival of the
// session, fades in a centered gradient "A" mark, holds for 700ms, then
// fades out and unmounts. Subsequent route changes within the same session
// do NOT replay it (sessionStorage gate).
//
// Why session-scoped instead of cookie/localStorage: the splash is a
// "welcome to Avante" beat, not a daily ritual. A returning visitor who
// closes the tab and opens it tomorrow gets the splash again — that's the
// right cadence. A user who is browsing internally should never see it
// twice in the same session.
//
// Accessibility: respects prefers-reduced-motion (renders nothing); also
// has a 1.4s hard ceiling so it never traps a user.
//
// Mounted at the root level of the app so it overlays everything else.
// The hero behind it pre-paints (visible during the fade-out cross-fade).

import { useEffect, useState } from 'react'
import { AvanteLockup } from '@/app/components/AvanteLockup'

const SESSION_KEY = 'avt-splash-shown-v1'
const FADE_IN_MS = 280
const HOLD_MS = 700
const FADE_OUT_MS = 460

export function AvtSplash() {
  // Decide once on mount whether to render the splash at all. We can't
  // gate this behind useEffect because we want SSR / first paint to also
  // skip the splash if it's already been shown — but sessionStorage is
  // browser-only, so we default to "show" until we can read the flag.
  const [phase, setPhase] = useState<'pre' | 'visible' | 'fading' | 'done'>('pre')

  useEffect(() => {
    // Reduced-motion users skip the splash entirely.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setPhase('done')
      return
    }

    // If the splash already played this session, skip it.
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase('done')
        return
      }
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // sessionStorage blocked → still play once (no big deal).
    }

    // Sequence: fade-in → hold → fade-out → unmount
    const visibleTimer = window.setTimeout(() => setPhase('visible'), 16)
    const fadeOutTimer = window.setTimeout(() => setPhase('fading'), FADE_IN_MS + HOLD_MS)
    const doneTimer = window.setTimeout(
      () => setPhase('done'),
      FADE_IN_MS + HOLD_MS + FADE_OUT_MS
    )

    return () => {
      window.clearTimeout(visibleTimer)
      window.clearTimeout(fadeOutTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  if (phase === 'done') return null

  // While the page is settling we hide initial flash by keeping body lock
  // for the first frame. After done, we restore scroll.
  const opacity = phase === 'visible' ? 1 : 0
  const scale = phase === 'visible' ? 1 : phase === 'fading' ? 1.08 : 0.92

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--avt-ink)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: `opacity ${phase === 'fading' ? FADE_OUT_MS : FADE_IN_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transition: `transform ${FADE_IN_MS + HOLD_MS + FADE_OUT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <AvanteLockup size="xl" markOnly variant="default" ariaLabel="Avante" />
      </div>
    </div>
  )
}
