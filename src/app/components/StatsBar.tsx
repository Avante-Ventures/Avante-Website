import { memo } from 'react';

interface StatItem {
  value: string;
  label: string;
  color: string;
}

const StatsBarComponent = () => {
  const stats: StatItem[] = [
    { value: '$2.5T', label: 'Economy', color: '#7B68EE' },
    { value: '215M', label: 'People', color: '#F4A261' },
    { value: '70%', label: 'Services', color: '#E6C54C' },
    { value: '25', label: 'Unicorns', color: '#7B68EE' },
    { value: '93%', label: 'Renewable', color: '#F4A261' },
    { value: '$4.5B', label: 'AI Investment', color: '#E6C54C' },
    { value: '~90%', label: 'SMEs under-digitalized', color: '#7B68EE' }
  ];

  return (
    <div
      style={{
        padding: '48px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.015)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(66, 70, 140, 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
        className="stats-grid"
      >
        {stats.map((stat, index) => (
          <StatDisplay
            key={index}
            value={stat.value}
            label={stat.label}
            color={stat.color}
            fn={stat.fn}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

interface StatDisplayProps {
  value: string;
  label: string;
  color: string;
  fn?: string;
}

const StatDisplay = memo(({ value, label, color, fn }: StatDisplayProps) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '16px 8px'
      }}
    >
      <div
        style={{
          fontSize: '48px',
          fontWeight: 'var(--font-weight-bold)',
          color: color,
          lineHeight: '1.1',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {value}
        {fn && (
          <a
            href={`#source-${fn}`}
            aria-label={`Source ${fn}`}
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.4)',
              textDecoration: 'none',
              marginLeft: '2px',
              verticalAlign: 'super',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
          >
            {fn}
          </a>
        )}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.6)',
          lineHeight: '1.5',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 'var(--font-weight-medium)'
        }}
      >
        {label}
      </div>
    </div>
  );
});

StatDisplay.displayName = 'StatDisplay';

export const StatsBar = memo(StatsBarComponent);