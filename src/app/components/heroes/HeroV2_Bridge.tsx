// V2.3 — REFINED BRIDGE (cinematic SF ↔ São Paulo with real city cards)
//
// Replaces the static gray maps entirely. Two floating "city cards" (left
// = San Francisco, right = São Paulo) with name + GPS coords + small
// gradient dot. Between them: a thick gradient ribbon arcing from one to
// the other with multiple particles flowing along it (SF → SP direction
// to imply playbook flow). Wordmark sits BELOW the bridge, smaller, so
// the bridge is the hero, not decoration.
//
// Why this beats v1A: v1's bridge was a thin 0.4-stroke arc tacked on
// over the gray maps. v2 makes the bridge the centerpiece — thick
// gradient ribbon, particle flow, prominent endpoints with city names
// as content (not just dots), and the wordmark deferred to a supporting
// role. Reads as "Avante is the bridge" instead of "Avante has a bridge."

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'

export function HeroV2_Bridge() {
  return (
    <section
      className="relative w-full"
      style={{
        background: '#0E1428',
        overflow: 'hidden',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* Soft brand glows in corners for depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249, 180, 55, 0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(152, 80, 154, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Bridge SVG — thick gradient ribbon + flowing particles */}
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: '12%',
          left: '0',
          width: '100%',
          height: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="hv2b-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9B437" stopOpacity="0.15" />
            <stop offset="15%" stopColor="#F9B437" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#F4A261" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#98509A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#98509A" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="hv2b-ribbon-soft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F9B437" stopOpacity="0" />
            <stop offset="50%" stopColor="#F4A261" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#98509A" stopOpacity="0" />
          </linearGradient>
          <filter id="hv2b-glow" x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Glow under ribbon */}
        <path
          d="M 150 250 Q 500 -20 850 250"
          fill="none"
          stroke="url(#hv2b-ribbon-soft)"
          strokeWidth="50"
          strokeLinecap="round"
          filter="url(#hv2b-glow)"
        />
        {/* Main ribbon */}
        <path
          d="M 150 250 Q 500 -20 850 250"
          fill="none"
          stroke="url(#hv2b-ribbon)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Animated dashed flow */}
        <path
          d="M 150 250 Q 500 -20 850 250"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 14"
          opacity="0.4"
          style={{ animation: 'hv2b-flow 4s linear infinite' }}
        />

        {/* Particles flowing along the ribbon (SF → SP) */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            r="3.5"
            fill="#F9B437"
            opacity="0.95"
            filter="url(#hv2b-glow)"
            style={{
              offsetPath: 'path("M 150 250 Q 500 -20 850 250")',
              offsetRotate: '0deg',
              animation: `hv2b-particle 6s linear ${i * 1.2}s infinite`,
            }}
          />
        ))}

        {/* Endpoint glows */}
        <circle cx="150" cy="250" r="14" fill="#F9B437" opacity="0.18" />
        <circle cx="150" cy="250" r="6" fill="#F9B437">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="850" cy="250" r="14" fill="#98509A" opacity="0.18" />
        <circle cx="850" cy="250" r="6" fill="#98509A">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" begin="1.25s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Left city card — San Francisco */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(140px, 25vh, 220px)',
          left: 'clamp(24px, 5vw, 80px)',
          zIndex: 3,
          padding: '14px 18px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(249, 180, 55, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 12px 32px rgba(249, 180, 55, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#F9B437',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Origin · Playbooks
        </div>
        <div style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          San Francisco
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', letterSpacing: '0.04em' }}>
          37.77° N · 122.42° W
        </div>
      </div>

      {/* Right city card — São Paulo */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(140px, 25vh, 220px)',
          right: 'clamp(24px, 5vw, 80px)',
          zIndex: 3,
          padding: '14px 18px',
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(152, 80, 154, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 12px 32px rgba(152, 80, 154, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          textAlign: 'right',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            color: '#D9A6DA',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Execution · Brazil
        </div>
        <div style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
          São Paulo
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', letterSpacing: '0.04em' }}>
          23.55° S · 46.63° W
        </div>
      </div>

      {/* Lower content: wordmark + tagline + CTAs */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(60px, 12vh, 120px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          maxWidth: '900px',
          gap: '20px',
        }}
      >
        <img
          src={avanteLogo}
          alt="Avante"
          loading="eager"
          style={{
            height: 'clamp(80px, 12vw, 140px)',
            width: 'auto',
            filter: 'drop-shadow(0 16px 40px rgba(249, 180, 55, 0.18))',
          }}
        />

        <h1
          style={{
            fontSize: 'clamp(22px, 3vw, 36px)',
            lineHeight: 1.25,
            color: '#FFFFFF',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Silicon Valley playbooks.{' '}
          <span style={{ color: '#F4A261' }}>Brazil-native execution.</span>
        </h1>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            style={{
              padding: '14px 26px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#0E1428',
              background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            For Founders →
          </button>
          <button
            style={{
              padding: '14px 26px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#FFFFFF',
              background: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            For Investors
          </button>
        </div>
      </div>

      <style>{`
        @keyframes hv2b-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
        @keyframes hv2b-particle {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
