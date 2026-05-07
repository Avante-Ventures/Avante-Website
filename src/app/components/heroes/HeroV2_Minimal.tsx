// V2.1 — CONFIDENT MINIMALISM (Sequoia / Anthropic energy)
//
// The hero is the wordmark. No maps, no mesh, no decoration competing
// for attention. AVANTE at scale most VC sites won't dare. One sentence
// in editorial-italic below. One CTA. Massive negative space.
//
// The signature move: a soft gradient halo behind the wordmark that
// pulses very slowly (8s breath cycle, single radial gradient at 12%
// opacity). Almost subliminal — it's not "happening", the page is just
// alive.
//
// Why this beats v1: structural confidence. The user's instinct that v1
// was "decoration on top" is correct — v1 added stuff. v2.1 SUBTRACTS
// stuff. What's left is the brand at maximum confidence.

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'

export function HeroV2_Minimal() {
  return (
    <section
      className="flex flex-col items-center justify-center relative w-full"
      style={{
        background: '#0E1428',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      {/* Tiny eyebrow */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(40px, 8vh, 80px)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(249, 180, 55, 0.7)',
          fontWeight: 600,
          zIndex: 2,
        }}
      >
        AI-Native Venture Studio · Brazil + LATAM
      </div>

      {/* Soft halo behind wordmark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          maxWidth: '1100px',
          maxHeight: '1100px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249, 180, 55, 0.10) 0%, rgba(241, 139, 70, 0.06) 30%, rgba(152, 80, 154, 0.04) 55%, transparent 75%)',
          filter: 'blur(60px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'hv2m-breathe 8s ease-in-out infinite',
          zIndex: 0,
        }}
      />

      {/* Wordmark — massive */}
      <img
        src={avanteLogo}
        alt="Avante"
        loading="eager"
        style={{
          height: 'clamp(140px, 22vw, 320px)',
          width: 'auto',
          maxWidth: '90vw',
          objectFit: 'contain',
          zIndex: 1,
          animation: 'hv2m-fade-up 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          opacity: 0,
          filter: 'drop-shadow(0 30px 80px rgba(249, 180, 55, 0.18))',
        }}
      />

      {/* Single editorial line */}
      <p
        style={{
          marginTop: 'clamp(28px, 5vh, 56px)',
          fontSize: 'clamp(18px, 2.4vw, 28px)',
          lineHeight: 1.4,
          color: 'rgba(255, 255, 255, 0.75)',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          maxWidth: '720px',
          textAlign: 'center',
          margin: 'clamp(28px, 5vh, 56px) 0 0 0',
          zIndex: 1,
          animation: 'hv2m-fade-up 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards',
          opacity: 0,
        }}
      >
        We co-found AI-native companies in Brazil.
        <br />
        <span style={{ color: '#F4A261', fontStyle: 'normal', fontWeight: 500 }}>
          Built to compound for decades.
        </span>
      </p>

      {/* Single CTA */}
      <button
        style={{
          marginTop: 'clamp(36px, 6vh, 64px)',
          padding: '14px 28px',
          fontSize: '15px',
          fontWeight: 600,
          color: '#0E1428',
          background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 60%, #F18B46 100%)',
          border: 'none',
          borderRadius: '999px',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          boxShadow: '0 12px 32px rgba(249, 180, 55, 0.25)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          zIndex: 1,
          animation: 'hv2m-fade-up 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards',
          opacity: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 18px 48px rgba(249, 180, 55, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 180, 55, 0.25)'
        }}
      >
        Co-found with us →
      </button>

      {/* Footer signature line */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(32px, 6vh, 64px)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.06em',
          zIndex: 2,
        }}
      >
        <span>São Paulo</span>
        <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #F9B437, #98509A)' }} />
        <span>San Francisco</span>
      </div>

      <style>{`
        @keyframes hv2m-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50%      { transform: translate(-50%, -50%) scale(1.08); opacity: 0.7; }
        }
        @keyframes hv2m-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
