// HERO CONCEPT C — Gradient mesh background
//
// Replaces the flat #151E35 with a slow-breathing mesh of brand-color blobs:
// 4 large radial gradients (gold, orange, purple, indigo) at 4-10% opacity
// blurred to 150px, animating their positions over 60 seconds. Maps still
// visible. Effect is "depth without distraction" — page feels alive without
// any element you can point to.
//
// Why: the trick a16z / Linear / Stripe use to make landing pages feel
// expensive without designing anything new. Pure CSS, no JS.

import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'
import { HeroBody } from './HeroBody'

export function HeroC_GradientMesh() {
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
      {/* Mesh layer — sits between bg color and existing maps */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div className="heroc-blob heroc-blob-1" />
        <div className="heroc-blob heroc-blob-2" />
        <div className="heroc-blob heroc-blob-3" />
        <div className="heroc-blob heroc-blob-4" />
      </div>

      <AvanteHeroBackground />
      <HeroBody />

      <style>{`
        .heroc-blob {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          filter: blur(150px);
          opacity: 0.55;
          mix-blend-mode: screen;
          will-change: transform;
        }
        .heroc-blob-1 {
          background: radial-gradient(circle, rgba(249, 180, 55, 0.18) 0%, transparent 70%);
          top: -10%;
          left: -10%;
          animation: heroc-drift-1 60s ease-in-out infinite;
        }
        .heroc-blob-2 {
          background: radial-gradient(circle, rgba(241, 139, 70, 0.14) 0%, transparent 70%);
          top: 30%;
          left: 60%;
          animation: heroc-drift-2 75s ease-in-out infinite;
        }
        .heroc-blob-3 {
          background: radial-gradient(circle, rgba(152, 80, 154, 0.16) 0%, transparent 70%);
          top: 55%;
          left: -15%;
          animation: heroc-drift-3 90s ease-in-out infinite;
        }
        .heroc-blob-4 {
          background: radial-gradient(circle, rgba(66, 70, 140, 0.18) 0%, transparent 70%);
          top: -5%;
          left: 55%;
          animation: heroc-drift-4 80s ease-in-out infinite;
        }
        @keyframes heroc-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(8vw, 6vh); }
          50%      { transform: translate(15vw, 2vh); }
          75%      { transform: translate(5vw, 10vh); }
        }
        @keyframes heroc-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          33%      { transform: translate(-12vw, -8vh); }
          66%      { transform: translate(-4vw, 6vh); }
        }
        @keyframes heroc-drift-3 {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(20vw, -10vh); }
        }
        @keyframes heroc-drift-4 {
          0%, 100% { transform: translate(0, 0); }
          40%      { transform: translate(-15vw, 12vh); }
          80%      { transform: translate(-6vw, -4vh); }
        }
        @media (prefers-reduced-motion: reduce) {
          .heroc-blob { animation: none; }
        }
      `}</style>
    </section>
  )
}
