import { memo } from 'react';

interface MetricData {
  value: string;
  color: string;
  context: string;
}

const ProofSectionComponent = () => {
  const trackRecordMetrics: MetricData[] = [
    {
      value: '10x',
      color: '#98509A',
      context: 'Exit multiple — Sigga Technologies (Board: Amanda Pinheiro)'
    },
    {
      value: '4x',
      color: '#F18B46',
      context: 'MOI — Accera investment (Innova Capital era)'
    },
    {
      value: '$500MM+',
      color: '#F9B437',
      context: 'Invested across 20+ companies by our founding team'
    }
  ];

  const currentMetrics: MetricData[] = [
    {
      value: '5x',
      color: '#98509A',
      context: 'Intake volume increase (WIR InsurTech)'
    },
    {
      value: '90%',
      color: '#F18B46',
      context: 'Cost reduction in underwriting workflows'
    }
  ];

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
          background: 'radial-gradient(ellipse, rgba(152, 80, 154, 0.04) 0%, transparent 70%)',
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
        {/* PART A: Track Record */}
        <div style={{ marginBottom: '64px' }}>
          {/* Subtitle */}
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
              What our team has built and exited
            </p>
          </div>

          {/* Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              marginBottom: '24px'
            }}
          >
            {trackRecordMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
            margin: '64px auto',
            maxWidth: '800px'
          }}
        />

        {/* PART B: Current Ventures */}
        <div>
          {/* Subtitle */}
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
              Early signals from our ventures
            </p>
          </div>

          {/* Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              maxWidth: '800px',
              margin: '0 auto 32px'
            }}
          >
            {currentMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>

          {/* Bottom Statement */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              paddingTop: '32px'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.6)',
                fontStyle: 'italic',
                margin: 0
              }}
            >
              AI-native architecture consistently delivers 3-10x operational improvements across our portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  metric: MetricData;
}

const MetricCard = memo(({ metric }: MetricCardProps) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '32px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Metric Value */}
      <div
        style={{
          fontSize: '64px',
          fontWeight: 'var(--font-weight-bold)',
          color: metric.color,
          lineHeight: '1.1',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
          wordBreak: 'keep-all',
          whiteSpace: 'nowrap',
          overflow: 'visible'
        }}
      >
        {metric.value}
      </div>

      {/* Context */}
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.85)',
          margin: 0,
          fontWeight: 'var(--font-weight-regular)'
        }}
      >
        {metric.context}
      </p>

      {/* Subtle glow behind metric */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, ${metric.color}15 0%, transparent 70%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: -1
        }}
      />
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

export const ProofSection = memo(ProofSectionComponent);