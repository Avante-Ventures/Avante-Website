// HERO CONCEPT B — Light sweep on AVANTE wordmark
//
// Same hero structure, only the AVANTE wordmark image gains a recurring
// "light sweep" — a soft highlight passes left-to-right across the mark
// every 7 seconds. CSS-only via a moving `-webkit-mask-image` linear
// gradient that briefly dims, then restores, the pixels under it.
//
// Why: most subtle of the 5. The wordmark feels alive without competing
// with copy. Premium-IPO-page energy.

import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'
import { HeroBody } from './HeroBody'
import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'

export function HeroB_LightSweep() {
  const sweepWordmark = (
    <img
      src={avanteLogo}
      alt="Avante"
      loading="eager"
      className="herob-sweep"
      style={{
        height: '200px',
        width: 'auto',
        filter: 'drop-shadow(0 10px 40px rgba(249, 180, 55, 0.15))',
      }}
    />
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
      <HeroBody wordmark={sweepWordmark} />

      <style>{`
        .herob-sweep {
          -webkit-mask-image: linear-gradient(
            105deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) 35%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 1) 65%,
            rgba(255, 255, 255, 1) 100%
          );
                  mask-image: linear-gradient(
            105deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) 35%,
            rgba(255, 255, 255, 0.55) 50%,
            rgba(255, 255, 255, 1) 65%,
            rgba(255, 255, 255, 1) 100%
          );
          -webkit-mask-size: 250% 100%;
                  mask-size: 250% 100%;
          -webkit-mask-position: 100% 0;
                  mask-position: 100% 0;
          animation: herob-sweep 7s ease-in-out infinite;
        }
        @keyframes herob-sweep {
          0%   { -webkit-mask-position: 130% 0;         mask-position: 130% 0; }
          50%  { -webkit-mask-position: -30% 0;         mask-position: -30% 0; }
          100% { -webkit-mask-position: -30% 0;         mask-position: -30% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .herob-sweep { animation: none; -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>
    </section>
  )
}
