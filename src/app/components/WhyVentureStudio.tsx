export function WhyVentureStudio() {
  return (
    <div 
      style={{
        position: 'relative',
        padding: '0',
        overflow: 'hidden'
      }}
    >
      {/* Hero stat card - Full width gradient box */}
      <div 
        style={{
          position: 'relative',
          padding: 'var(--avante-space-10) var(--avante-space-6)',
          background: 'linear-gradient(135deg, rgba(152, 80, 154, 0.12) 0%, rgba(249, 180, 55, 0.08) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--avante-radius-24)',
          marginBottom: 'var(--avante-space-6)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Animated glow effect */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(249, 180, 55, 0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            animation: 'pulse 4s ease-in-out infinite'
          }}
        />

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          }
        `}</style>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div 
            style={{
              display: 'inline-block',
              padding: 'var(--avante-space-2) var(--avante-space-4)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 'var(--avante-radius-8)',
              marginBottom: 'var(--avante-space-6)',
              fontSize: '12px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Industry Benchmark
          </div>

          {/* Large stat */}
          <h2 
            style={{
              fontSize: 'clamp(56px, 8vw, 88px)',
              lineHeight: '1',
              fontWeight: 'var(--font-weight-bold)',
              background: 'linear-gradient(135deg, #F4A261 0%, #F9B437 50%, #98509A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 'var(--avante-space-5)',
              letterSpacing: '-0.03em',
              filter: 'drop-shadow(0 4px 20px rgba(249, 180, 55, 0.3))'
            }}
          >
            50% IRR
          </h2>
          
          <p 
            style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              lineHeight: '1.4',
              color: '#FFFFFF',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--avante-space-4)',
              maxWidth: '900px',
              margin: '0 auto var(--avante-space-4) auto'
            }}
          >
            Venture Studios generate 50% annualized IRR
          </p>

          <p 
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 'var(--font-weight-regular)',
              marginBottom: 'var(--avante-space-2)'
            }}
          >
            vs 14-25% for traditional VC funds
          </p>

          <p 
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.4)',
              fontStyle: 'italic',
              fontWeight: 'var(--font-weight-regular)'
            }}
          >
            Source: Cambridge Associates, March 2024
          </p>
        </div>
      </div>

      {/* Divider with centered label */}
      <div style={{ position: 'relative', marginBottom: 'var(--avante-space-10)' }}>
        <div 
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            position: 'relative'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '0 var(--avante-space-4)',
            backgroundColor: 'var(--avante-background)',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 'var(--font-weight-semibold)'
          }}
        >
          Three Structural Advantages
        </div>
      </div>

      {/* Three comparison cards */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--avante-space-6)',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        {/* Card 1 - Purple accent */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(152, 80, 154, 0.15) 0%, rgba(152, 80, 154, 0.05) 100%)',
            border: '1px solid rgba(152, 80, 154, 0.3)',
            borderRadius: 'var(--avante-radius-20)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(152, 80, 154, 0.25) 0%, rgba(152, 80, 154, 0.1) 100%)';
            e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.6)';
            e.currentTarget.style.transform = 'translateY(-12px)';
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(152, 80, 154, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(152, 80, 154, 0.15) 0%, rgba(152, 80, 154, 0.05) 100%)';
            e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Glow effect */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(152, 80, 154, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />

          {/* Large number */}
          <div 
            style={{
              fontSize: '72px',
              lineHeight: '1',
              fontWeight: 'var(--font-weight-bold)',
              color: 'rgba(152, 80, 154, 0.25)',
              marginBottom: 'var(--avante-space-4)',
              position: 'relative'
            }}
          >
            01
          </div>

          {/* Top badge */}
          <div 
            style={{
              display: 'inline-block',
              padding: 'var(--avante-space-2) var(--avante-space-4)',
              backgroundColor: 'rgba(152, 80, 154, 0.25)',
              border: '1px solid rgba(152, 80, 154, 0.5)',
              borderRadius: 'var(--avante-radius-8)',
              marginBottom: 'var(--avante-space-5)',
              fontSize: '11px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Pre-traction Entry
          </div>

          <h3 
            style={{
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              marginBottom: 'var(--avante-space-4)',
              lineHeight: '1.3'
            }}
          >
            Lower Price, More Upside
          </h3>

          <p 
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'var(--font-weight-regular)'
            }}
          >
            We invest before the market sees the signal. Lower entry price means more equity and more upside when the business compounds.
          </p>
        </div>

        {/* Card 2 - Orange accent */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(244, 162, 97, 0.15) 0%, rgba(244, 162, 97, 0.05) 100%)',
            border: '1px solid rgba(244, 162, 97, 0.3)',
            borderRadius: 'var(--avante-radius-20)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244, 162, 97, 0.25) 0%, rgba(244, 162, 97, 0.1) 100%)';
            e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.6)';
            e.currentTarget.style.transform = 'translateY(-12px)';
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(244, 162, 97, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244, 162, 97, 0.15) 0%, rgba(244, 162, 97, 0.05) 100%)';
            e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Glow effect */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(244, 162, 97, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />

          {/* Large number */}
          <div 
            style={{
              fontSize: '72px',
              lineHeight: '1',
              fontWeight: 'var(--font-weight-bold)',
              color: 'rgba(244, 162, 97, 0.25)',
              marginBottom: 'var(--avante-space-4)',
              position: 'relative'
            }}
          >
            02
          </div>

          {/* Top badge */}
          <div 
            style={{
              display: 'inline-block',
              padding: 'var(--avante-space-2) var(--avante-space-4)',
              backgroundColor: 'rgba(244, 162, 97, 0.25)',
              border: '1px solid rgba(244, 162, 97, 0.5)',
              borderRadius: 'var(--avante-radius-8)',
              marginBottom: 'var(--avante-space-5)',
              fontSize: '11px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Shared Infrastructure
          </div>

          <h3 
            style={{
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              marginBottom: 'var(--avante-space-4)',
              lineHeight: '1.3'
            }}
          >
            Faster Payback, Lower Burn
          </h3>

          <p 
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'var(--font-weight-regular)'
            }}
          >
            Shared product, engineering, and go-to-market infrastructure reduces burn and accelerates time to market. Capital efficient by design.
          </p>
        </div>

        {/* Card 3 - Gold accent */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(249, 180, 55, 0.15) 0%, rgba(249, 180, 55, 0.05) 100%)',
            border: '1px solid rgba(249, 180, 55, 0.3)',
            borderRadius: 'var(--avante-radius-20)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 180, 55, 0.25) 0%, rgba(249, 180, 55, 0.1) 100%)';
            e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.6)';
            e.currentTarget.style.transform = 'translateY(-12px)';
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(249, 180, 55, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 180, 55, 0.15) 0%, rgba(249, 180, 55, 0.05) 100%)';
            e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Glow effect */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-30%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(249, 180, 55, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none'
            }}
          />

          {/* Large number */}
          <div 
            style={{
              fontSize: '72px',
              lineHeight: '1',
              fontWeight: 'var(--font-weight-bold)',
              color: 'rgba(249, 180, 55, 0.25)',
              marginBottom: 'var(--avante-space-4)',
              position: 'relative'
            }}
          >
            03
          </div>

          {/* Top badge */}
          <div 
            style={{
              display: 'inline-block',
              padding: 'var(--avante-space-2) var(--avante-space-4)',
              backgroundColor: 'rgba(249, 180, 55, 0.25)',
              border: '1px solid rgba(249, 180, 55, 0.5)',
              borderRadius: 'var(--avante-radius-8)',
              marginBottom: 'var(--avante-space-5)',
              fontSize: '11px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Execution Control
          </div>

          <h3 
            style={{
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              color: '#FFFFFF',
              marginBottom: 'var(--avante-space-4)',
              lineHeight: '1.3'
            }}
          >
            Higher Ownership, Real Governance
          </h3>

          <p 
            style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'var(--font-weight-regular)'
            }}
          >
            Co-building from day one means more ownership, better alignment, and real control over strategic direction. Not just capital—execution partners.
          </p>
        </div>
      </div>
    </div>
  );
}