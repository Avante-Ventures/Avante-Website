// Shared hero inner content: logo + headline + subtitle + tagline + CTAs.
// The 5 concept variants compose this with their own background/decoration
// layers so we don't duplicate the copy and CTA wiring across each.

import avanteLogo from 'figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png'

interface HeroBodyProps {
  /** Optional custom wordmark element (e.g. with sweep effect for variant B) */
  wordmark?: React.ReactNode
  /** Padding from top — used by the data ticker variant to make room */
  bottomTickerSlot?: React.ReactNode
}

export function HeroBody({ wordmark, bottomTickerSlot }: HeroBodyProps) {
  return (
    <div
      className="flex flex-col items-center justify-center relative z-10 px-6 max-w-[1000px] mx-auto text-center"
      style={{ gap: '32px' }}
    >
      <div>
        {wordmark ?? (
          <img
            src={avanteLogo}
            alt="Avante"
            loading="eager"
            style={{
              height: '200px',
              width: 'auto',
              filter: 'drop-shadow(0 10px 40px rgba(249, 180, 55, 0.15))',
            }}
          />
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1
          style={{
            fontSize: '56px',
            lineHeight: '1.1',
            color: '#FFFFFF',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          We co-found AI-native companies from scratch.
        </h1>
        <h2
          style={{
            fontSize: '56px',
            lineHeight: '1.1',
            color: '#FFFFFF',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Built to compound for decades.
        </h2>
      </div>

      <p
        style={{
          fontSize: '24px',
          lineHeight: '1.4',
          color: '#F4A261',
          fontWeight: 500,
          margin: 0,
        }}
      >
        Silicon Valley Playbooks. Brazil-Native Execution.
      </p>

      <p
        style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#9CA3AF',
          fontWeight: 400,
          maxWidth: '800px',
          margin: 0,
        }}
      >
        We combine SF venture-building standards with proven operators and investors on the ground in Brazil.
      </p>

      {bottomTickerSlot}

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '24px',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          style={{
            padding: '16px 32px',
            minHeight: '48px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#FFFFFF',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          Get in touch
        </button>
        <button
          style={{
            padding: '16px 32px',
            minHeight: '48px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#FFFFFF',
            background: 'linear-gradient(135deg, #F4A261 0%, #98509A 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 180, 55, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          For Investors
        </button>
      </div>
    </div>
  )
}
