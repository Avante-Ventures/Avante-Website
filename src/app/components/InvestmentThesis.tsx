import { memo } from 'react';

const InvestmentThesisComponent = () => {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 'clamp(var(--avante-space-14), 12vw, var(--avante-space-16))' }}>
        <h2 
          className="text-[36px] md:text-[48px] lg:text-[60px]"
          style={{ 
            lineHeight: '1.1',
            color: 'var(--avante-text-primary)',
            marginBottom: 'var(--avante-space-6)',
            fontWeight: 'var(--font-weight-semibold)',
            letterSpacing: '-0.03em'
          }}
        >
          How We Choose
        </h2>
        
        <p 
          className="text-[17px] md:text-[19px]"
          style={{ 
            color: 'var(--avante-text-secondary)',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
            letterSpacing: '0.01em'
          }}
        >
          Our investment framework: where we play, what we build, and what we avoid.
        </p>
      </div>

      {/* 3 Premium Cards */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ 
          gap: 'clamp(var(--avante-space-6), 4vw, var(--avante-space-7))',
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}
      >
        {/* Column 1: WHERE WE PLAY */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(66, 70, 140, 0.08) 0%, rgba(66, 70, 140, 0.02) 100%)',
            WebkitBackdropFilter: 'blur(10px)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(66, 70, 140, 0.2)',
            borderRadius: 'var(--avante-radius-20)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--avante-space-6)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 32px 80px rgba(66, 70, 140, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(66, 70, 140, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(66, 70, 140, 0.2)';
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(66, 70, 140, 0.15)',
              border: '2px solid rgba(66, 70, 140, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}
          >
            🎯
          </div>

          <div>
            <h3 
              style={{
                fontSize: 'clamp(24px, 3.5vw, 28px)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.2',
                marginBottom: 'var(--avante-space-2)',
                letterSpacing: '-0.02em'
              }}
            >
              Where We Play
            </h3>
            <div
              style={{
                width: '40px',
                height: '3px',
                background: 'rgba(66, 70, 140, 0.5)',
                borderRadius: '2px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--avante-space-4)' }}>
            {[
              "Brazil's Service Economy",
              'Under-digitized workflows',
              'High ROI automation opportunities'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--avante-space-3)' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(76, 175, 80, 0.15)',
                    border: '2px solid rgba(76, 175, 80, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', color: 'var(--avante-text-secondary)', lineHeight: '1.7' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(66, 70, 140, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Column 2: WHAT WE BUILD */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(249, 180, 55, 0.08) 0%, rgba(249, 180, 55, 0.02) 100%)',
            WebkitBackdropFilter: 'blur(10px)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(249, 180, 55, 0.2)',
            borderRadius: 'var(--avante-radius-20)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--avante-space-6)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 32px 80px rgba(249, 180, 55, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.2)';
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(249, 180, 55, 0.15)',
              border: '2px solid rgba(249, 180, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}
          >
            🚀
          </div>

          <div>
            <h3 
              style={{
                fontSize: 'clamp(24px, 3.5vw, 28px)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.2',
                marginBottom: 'var(--avante-space-2)',
                letterSpacing: '-0.02em'
              }}
            >
              What We Build
            </h3>
            <div
              style={{
                width: '40px',
                height: '3px',
                background: 'rgba(249, 180, 55, 0.5)',
                borderRadius: '2px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--avante-space-2)' }}>
            {['Legaltech', 'Insurtech', 'FinTech', 'Retail', 'Compliance'].map((vertical, i) => (
              <span 
                key={i}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--avante-text-primary)',
                  background: 'rgba(249, 180, 55, 0.18)',
                  border: '1px solid rgba(249, 180, 55, 0.4)',
                  borderRadius: '8px',
                  letterSpacing: '0.02em',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 180, 55, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(249, 180, 55, 0.18)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {vertical}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--avante-text-muted)', lineHeight: '1.7', marginTop: 'var(--avante-space-2)' }}>
            AI-native software in massive service-heavy verticals where workflows are manual and fragmented.
          </p>

          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '-60px',
              left: '-60px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249, 180, 55, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Column 3: WHAT WE AVOID */}
        <div
          style={{
            padding: 'var(--avante-space-8)',
            background: 'linear-gradient(135deg, rgba(152, 80, 154, 0.08) 0%, rgba(152, 80, 154, 0.02) 100%)',
            WebkitBackdropFilter: 'blur(10px)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(152, 80, 154, 0.2)',
            borderRadius: 'var(--avante-radius-20)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--avante-space-6)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 32px 80px rgba(152, 80, 154, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.2)';
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(152, 80, 154, 0.15)',
              border: '2px solid rgba(152, 80, 154, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}
          >
            ⛔
          </div>

          <div>
            <h3 
              style={{
                fontSize: 'clamp(24px, 3.5vw, 28px)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.2',
                marginBottom: 'var(--avante-space-2)',
                letterSpacing: '-0.02em'
              }}
            >
              What We Avoid
            </h3>
            <div
              style={{
                width: '40px',
                height: '3px',
                background: 'rgba(152, 80, 154, 0.5)',
                borderRadius: '2px'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--avante-space-4)' }}>
            {[
              'Hype cycles without operational edge',
              'Capital-intensive models',
              'Long validation paths before traction'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--avante-space-3)' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(244, 67, 54, 0.15)',
                    border: '2px solid rgba(244, 67, 54, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3L9 9" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', color: 'var(--avante-text-secondary)', lineHeight: '1.7' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(152, 80, 154, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const InvestmentThesis = memo(InvestmentThesisComponent);
