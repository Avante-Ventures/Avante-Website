import { memo } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';

interface PlaybookPhase {
  title: string;
  description: string;
  step: number;
}

const PlaybookStaircaseComponent = () => {
  const { t } = useLanguage();

  const phases: PlaybookPhase[] = [
    {
      title: t('system.step1.title'),
      description: t('system.step1.desc'),
      step: 1
    },
    {
      title: t('system.step2.title'),
      description: t('system.step2.desc'),
      step: 2
    },
    {
      title: t('system.step3.title'),
      description: t('system.step3.desc'),
      step: 3
    },
    {
      title: t('system.step4.title'),
      description: t('system.step4.desc'),
      step: 4
    },
    {
      title: t('system.step5.title'),
      description: t('system.step5.desc'),
      step: 5
    },
    {
      title: t('system.step6.title'),
      description: t('system.step6.desc'),
      step: 6
    }
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'clamp(var(--avante-space-6), 4vw, var(--avante-space-8)) 0'
      }}
    >
      {/* 3x2 Grid on desktop, 1 column on mobile */}
      <div
        className="avante-system-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}
      >
        {phases.map((phase, index) => (
          <VerticalPhaseCard
            key={index}
            phase={phase}
            index={index}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .avante-system-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

interface VerticalPhaseCardProps {
  phase: PlaybookPhase;
  index: number;
}

const VerticalPhaseCard = memo(({ phase, index }: VerticalPhaseCardProps) => {
  return (
    <div
      style={{
        padding: 'clamp(var(--avante-space-5), 4vw, var(--avante-space-6))',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 'var(--avante-radius-12)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--avante-space-3)',
        minHeight: '220px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(241, 139, 70, 0.3)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(241, 139, 70, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Step number badge */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--avante-space-3)',
          right: 'var(--avante-space-3)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(241, 139, 70, 0.15), rgba(152, 80, 154, 0.15))',
          border: '1px solid rgba(241, 139, 70, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--avante-text-primary)'
        }}
      >
        {phase.step}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(20px, 2.5vw, 24px)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--avante-text-primary)',
          marginBottom: '0',
          lineHeight: '1.2',
          letterSpacing: '-0.01em'
        }}
      >
        {phase.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(13px, 1.8vw, 14px)',
          color: 'var(--avante-text-secondary)',
          lineHeight: '1.6',
          margin: 0,
          flexGrow: 1
        }}
      >
        {phase.description}
      </p>
    </div>
  );
});

VerticalPhaseCard.displayName = 'VerticalPhaseCard';

export const AvantePlaybookStaircase = memo(PlaybookStaircaseComponent);