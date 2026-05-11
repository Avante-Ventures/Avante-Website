// ClockRow — Phase D.
//
// Three live local clocks (São Paulo, San Francisco, Bogotá) rendered as
// a 3-column grid with hairline cell borders. Each clock shows: city
// name in Funnel Display monumental, HH:MM time in JetBrains Mono, the
// timezone abbreviation, and a one-line address blurb.
//
// Tick cadence: every 30 seconds. We display HH:MM, not HH:MM:SS, so
// there's no visible benefit to per-second updates and meaningful cost
// (3× Intl.DateTimeFormat calls per tick). We tick once on mount so the
// clocks aren't blank for the first 30s.
//
// Bilingual policy: city names stay in their native form (São Paulo, not
// "Saint Paul"). Address blurbs and TZ labels translate to keep the
// editorial register consistent with the rest of the page.

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'

interface ClockSpec {
  city: string
  tz: string
  tzLabel: string
  addr: { en: string; pt: string; es: string }
}

const CLOCKS: ClockSpec[] = [
  {
    city: 'São Paulo',
    tz: 'America/Sao_Paulo',
    tzLabel: 'UTC −03 · BRT',
    addr: {
      en: 'Av. Brigadeiro Faria Lima · sede',
      pt: 'Av. Brigadeiro Faria Lima · sede',
      es: 'Av. Brigadeiro Faria Lima · sede',
    },
  },
  {
    city: 'San Francisco',
    tz: 'America/Los_Angeles',
    tzLabel: 'UTC −08 · PST',
    addr: {
      en: 'Bay Area · operating hub',
      pt: 'Bay Area · hub operacional',
      es: 'Bay Area · hub operativo',
    },
  },
  {
    city: 'Bogotá',
    tz: 'America/Bogota',
    tzLabel: 'UTC −05 · COT',
    addr: {
      en: 'Andes · LATAM ex-Brazil',
      pt: 'Andes · LATAM ex-Brasil',
      es: 'Andes · LATAM ex-Brasil',
    },
  },
]

function formatTime(tz: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: tz,
    }).format(new Date())
  } catch {
    return '— : —'
  }
}

export function ClockRow() {
  const { language } = useLanguage()
  const [, setNow] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Tick once immediately, then every 30s. We bump a counter so React
    // re-renders; we don't store the time itself in state because the
    // formatting is deterministic per-render.
    setNow((n) => n + 1)
    intervalRef.current = window.setInterval(() => setNow((n) => n + 1), 30_000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div
      className="avt-clocks"
      style={{
        display: 'grid',
        gap: 0,
        border: '1px solid var(--avt-hair)',
      }}
    >
      {CLOCKS.map((clock, i) => (
        <div
          key={clock.tz}
          className="avt-clock-cell"
          style={{
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            minHeight: '200px',
            borderRight: i < CLOCKS.length - 1 ? '1px solid var(--avt-hair)' : 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--avt-font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--avt-meta)',
            }}
          >
            00{i + 1}
          </div>
          <div
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 3vw, 44px)',
              letterSpacing: '-0.025em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {clock.city}
          </div>
          <div
            style={{
              fontFamily: 'var(--avt-font-mono)',
              fontWeight: 400,
              fontSize: 'clamp(24px, 2.4vw, 32px)',
              color: '#fff',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            {formatTime(clock.tz)}
          </div>
          <div
            style={{
              fontFamily: 'var(--avt-font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.22em',
              color: 'var(--avt-meta)',
              textTransform: 'uppercase',
            }}
          >
            {clock.tzLabel}
          </div>
          <div
            style={{
              fontFamily: 'var(--avt-font-mono)',
              fontSize: '10.5px',
              letterSpacing: '0.12em',
              color: 'var(--avt-muted)',
              lineHeight: 1.5,
            }}
          >
            {language === 'pt' ? clock.addr.pt : language === 'es' ? clock.addr.es : clock.addr.en}
          </div>
        </div>
      ))}

      <style>{`
        .avt-clocks {
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .avt-clocks { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 719px) {
          .avt-clock-cell { border-right: none !important; border-bottom: 1px solid var(--avt-hair); }
          .avt-clock-cell:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
