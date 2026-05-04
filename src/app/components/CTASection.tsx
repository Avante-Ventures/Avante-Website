import { useLanguage } from '@/app/hooks/useLanguage';

interface CTASectionProps {
  onOpenContact: () => void;
  variant?: 'default' | 'compact';
}

export function CTASection({ onOpenContact, variant = 'default' }: CTASectionProps) {
  const { t } = useLanguage();

  if (variant === 'compact') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'var(--avante-space-8)',
        }}
      >
        <button
          onClick={onOpenContact}
          style={{
            padding: 'var(--avante-space-2) var(--avante-space-5)',
            background: 'var(--avante-gradient-linear)',
            color: 'var(--avante-text-primary)',
            border: 'none',
            borderRadius: 'var(--avante-radius-12)',
            fontSize: '16px',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(152, 80, 154, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {t('cta.compact')}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--avante-space-10) var(--avante-space-3)',
      }}
    >
      <h2
        style={{
          fontSize: '36px',
          lineHeight: '1.2',
          color: 'var(--avante-text-primary)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--avante-space-3)',
        }}
      >
        {t('cta.title')}
      </h2>
      <p
        style={{
          fontSize: '18px',
          color: 'var(--avante-text-secondary)',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto var(--avante-space-5)',
        }}
      >
        {t('cta.subtitle')}
      </p>
      <div
        style={{
          display: 'flex',
          gap: 'var(--avante-space-3)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={onOpenContact}
          style={{
            padding: 'var(--avante-space-2) var(--avante-space-5)',
            background: 'var(--avante-gradient-linear)',
            color: 'var(--avante-text-primary)',
            border: 'none',
            borderRadius: 'var(--avante-radius-12)',
            fontSize: '16px',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(152, 80, 154, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {t('cta.primary')}
        </button>
        <button
          onClick={() => {
            const teamSection = document.getElementById('team');
            teamSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            padding: 'var(--avante-space-2) var(--avante-space-5)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: 'var(--avante-text-primary)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--avante-radius-12)',
            fontSize: '16px',
            fontWeight: 'var(--font-weight-semibold)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {t('cta.secondary')}
        </button>
      </div>
    </div>
  );
}
