// HERO CONCEPT A — Bridge SF ↔ São Paulo
//
// The two existing maps stay (USA on the left, Brazil on the right). Layered
// on top: a glowing gold arc that loops every 6 seconds connecting San
// Francisco (≈ 12% from left, 35% from top) to São Paulo (≈ 80% from left,
// 60% from top). Pulsing dots at both endpoints. The line draws in (~1.5s),
// holds (~2s), fades out (~1s), repeats.
//
// Why: literalizes the brand line "Silicon Valley Playbooks. Brazil-Native
// Execution." A founder or LP grasps the thesis before reading copy.

import { AvanteHeroBackground } from '@/app/components/AvanteHeroBackground'
import { HeroBody } from './HeroBody'

export function HeroA_Bridge() {
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

      {/* Bridge arc + pulses */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="bridge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9B437" stopOpacity="0" />
            <stop offset="20%" stopColor="#F9B437" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#F4A261" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#98509A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#98509A" stopOpacity="0" />
          </linearGradient>
          <filter id="bridge-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Arc — control point sets the curve. SF ≈ (12, 35), São Paulo ≈ (80, 60). */}
        <path
          d="M 12 35 Q 46 5 80 60"
          fill="none"
          stroke="url(#bridge-grad)"
          strokeWidth="0.4"
          strokeLinecap="round"
          filter="url(#bridge-glow)"
          style={{
            strokeDasharray: 110,
            strokeDashoffset: 110,
            animation: 'heroa-arc-draw 6s ease-in-out infinite',
          }}
        />

        {/* SF endpoint — pulse */}
        <circle cx="12" cy="35" r="0.6" fill="#F9B437">
          <animate attributeName="r" values="0.6;1.4;0.6" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.4;1" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="12" cy="35" r="2" fill="#F9B437" opacity="0.18">
          <animate attributeName="r" values="2;4;2" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.18;0.05;0.18" dur="2.8s" repeatCount="indefinite" />
        </circle>

        {/* São Paulo endpoint — pulse, offset 1.4s for visual rhythm */}
        <circle cx="80" cy="60" r="0.6" fill="#98509A">
          <animate
            attributeName="r"
            values="0.6;1.4;0.6"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="80" cy="60" r="2" fill="#98509A" opacity="0.18">
          <animate
            attributeName="r"
            values="2;4;2"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.18;0.05;0.18"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* SF + São Paulo labels (small caps, very subtle) */}
        <text x="12" y="32" fill="rgba(255,255,255,0.45)" fontSize="1.3" textAnchor="middle" fontFamily="system-ui">
          SF
        </text>
        <text x="80" y="64" fill="rgba(255,255,255,0.45)" fontSize="1.3" textAnchor="middle" fontFamily="system-ui">
          SP
        </text>
      </svg>

      <HeroBody />

      <style>{`
        @keyframes heroa-arc-draw {
          0%   { stroke-dashoffset: 110; opacity: 0; }
          15%  { opacity: 1; }
          50%  { stroke-dashoffset: 0; opacity: 1; }
          70%  { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -110; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
