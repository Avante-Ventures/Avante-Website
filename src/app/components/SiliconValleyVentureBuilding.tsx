import { memo } from 'react';

const SiliconValleyVentureBuildingComponent = () => {
  return (
    <div
      style={{
        padding: '24px 24px 32px',
        background: 'rgba(255, 255, 255, 0.01)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 'var(--font-weight-medium)',
              margin: 0
            }}
          >
            Silicon Valley Venture Building
          </p>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {/* Table Header */}
          <div
            style={{
              padding: '24px 32px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#F4A261',
                margin: 0,
                textAlign: 'center'
              }}
            >
              AI Intake Solution (LegalTech)
            </h4>
          </div>

          {/* Table Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1px',
              background: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Header Row */}
            <div
              style={{
                padding: '16px 24px',
                background: 'var(--avante-background)',
                fontSize: '13px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Metric
            </div>
            <div
              style={{
                padding: '16px 24px',
                background: 'var(--avante-background)',
                fontSize: '13px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center'
              }}
            >
              Before AI
            </div>
            <div
              style={{
                padding: '16px 24px',
                background: 'var(--avante-background)',
                fontSize: '13px',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textAlign: 'center'
              }}
            >
              After AI
            </div>

            {/* Time to Market Row */}
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Time to Market
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}
            >
              3 years
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#98509A',
                textAlign: 'center'
              }}
            >
              1 year
            </div>

            {/* Capital Required Row */}
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Capital Required
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}
            >
              $5M
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#F4A261',
                textAlign: 'center'
              }}
            >
              $1M
            </div>

            {/* Headcount Row */}
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Headcount
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'rgba(255, 255, 255, 0.5)',
                textAlign: 'center'
              }}
            >
              20
            </div>
            <div
              style={{
                padding: '20px 24px',
                background: 'var(--avante-background)',
                fontSize: '20px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#F9B437',
                textAlign: 'center'
              }}
            >
              3
            </div>
          </div>

          {/* Result Footer */}
          <div
            style={{
              padding: '24px 32px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(249, 180, 55, 0.05)',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                fontSize: '16px',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#FFFFFF',
                margin: '0 0 8px 0'
              }}
            >
              Result
            </p>
            <p
              style={{
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                background: 'linear-gradient(135deg, #F4A261 0%, #F9B437 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                lineHeight: '1.4'
              }}
            >
              5x intake volume, up to 90% cost reduction
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            table {
              font-size: 12px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export const SiliconValleyVentureBuilding = memo(SiliconValleyVentureBuildingComponent);
