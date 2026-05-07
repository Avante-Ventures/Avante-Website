// HERO CONCEPT D — Live data ticker
//
// Same hero, plus a thin rotating line of data underneath the orange tagline.
// 5 facts cycle every 4.5 seconds with a fade transition. Communicates
// "data-driven studio" instantly — any LP / founder skimming gets the thesis
// numerically without reading the body paragraph.

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'
import { HeroBody } from './HeroBody'

const STATS = [
  '$2.5T LATAM economy · 215M people · 70% services GDP',
  '$4.5B AI investment in Brazil 2025 · ~90% of SMEs under-digitized',
  'Studios deliver 50% IRR vs 19% for traditional VC (GSSN data)',
  '3–4 ventures launched per year · co-founder economics retained',
  'First-ticket positions: 100× upside vs 7× for Series A on the same exit',
]

export function HeroD_DataTicker() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % STATS.length), 4500)
    return () => clearInterval(id)
  }, [])

  const ticker = (
    <div
      style={{
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-8px',
      }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.55)',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.01em',
            fontWeight: 500,
          }}
        >
          {STATS[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )

  return (
    <section
      className="flex items-center justify-center relative w-full"
      style={{
        overflow: 'hidden',
        background: '#151E35',
        position: 'relative',
        height: '100vh',
      }}
    >
      <AvanteHeroBackground />
      <HeroBody bottomTickerSlot={ticker} />
    </section>
  )
}
