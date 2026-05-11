import { memo } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';

interface StatItem {
  value: string;
  label: string;
  color: string;
}

const StatsBarComponent = () => {
  const { language } = useLanguage();
  const t = (en: string, pt: string, es: string) =>
    language === 'pt' ? pt : language === 'es' ? es : en;

  const stats: StatItem[] = [
    { value: '$2.5T', label: t('Economy', 'Economia', 'Economía'), color: '#7B68EE' },
    { value: '215M', label: t('People', 'Pessoas', 'Personas'), color: '#F4A261' },
    { value: '70%', label: t('Services', 'Serviços', 'Servicios'), color: '#E6C54C' },
    { value: '25', label: t('Unicorns', 'Unicórnios', 'Unicornios'), color: '#7B68EE' },
    { value: '93%', label: t('Renewable', 'Renovável', 'Renovable'), color: '#F4A261' },
    { value: '$4.5B', label: t('AI Investment', 'Investimento em IA', 'Inversión en IA'), color: '#E6C54C' },
    { value: '~90%', label: t('SMEs under-digitalized', 'PMEs sub-digitalizadas', 'PYMEs sub-digitalizadas'), color: '#7B68EE' }
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

      {/* Two-row layout: 4 + 3. The previous 7-column grid was visually
          dense per Beirut's panel note ("seven equal cells fight each
          other"). Splitting in two rows also lets the 'SMEs' label breathe
          since it's longer than the others.                                */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section title — "Why we choose Brazil?" frames the metrics as
            an answer to a strategic question, not just decorative figures.
            Round 8 feedback. */}
        <SectionTitle />
        <div
          className="stats-grid stats-row-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {stats.slice(0, 4).map((stat, index) => (
            <StatDisplay
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              fn={stat.fn}
            />
          ))}
        </div>
        <div
          className="stats-grid stats-row-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '825px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {stats.slice(4).map((stat, index) => (
            <StatDisplay
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
              fn={stat.fn}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-row-4, .stats-row-3 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            max-width: none !important;
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
        padding: '16px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* "A" prefix removed per Round 8 feedback — under a "Why we choose
          Brazil?" title, the marks felt like noise on top of macro stats. */}
      <div
        style={{
          fontSize: 'clamp(32px, 3.5vw, 42px)',
          fontWeight: 'var(--font-weight-bold)',
          color: color,
          lineHeight: '1.1',
          marginBottom: '10px',
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

// Section title for StatsBar — frames the metrics under a strategic question.
// Uses the gold-dot eyebrow signature pattern + Funnel Display monumental
// title for visual continuity with SectionMasthead family.
const SectionTitle = memo(() => {
  const { language } = useLanguage();
  const title =
    language === 'pt'
      ? <>Por que <span className="avt-grad">escolhemos o Brasil?</span></>
      : language === 'es'
        ? <>¿Por qué <span className="avt-grad">elegimos Brasil?</span></>
        : <>Why we <span className="avt-grad">choose Brazil?</span></>;
  return (
    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          fontFamily: 'var(--avt-font-body)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#F9B437',
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#F9B437',
            boxShadow: '0 0 8px rgba(249, 180, 55, 0.6)',
          }}
        />
        <span>
          {language === 'pt' ? 'Macro' : language === 'es' ? 'Macro' : 'Macro'}
        </span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--avt-font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 1.0,
          color: '#fff',
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
});
SectionTitle.displayName = 'StatsBarSectionTitle';

export const StatsBar = memo(StatsBarComponent);