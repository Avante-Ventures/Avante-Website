import { memo } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import bambooDcmLogo from '../../imports/image-6.webp';
import mahwayLogo from '../../imports/image.webp';
import siggaLogo from '../../imports/image-3.webp';
import softmaxLogo from '../../imports/image-1.webp';
import indineroLogo from '../../imports/image-2.webp';
import alphaLitLogo from '../../imports/image-5.webp';
import astonishingLabsLogo from '../../imports/image-4.webp';

interface Logo {
  src: string;
  alt: string;
  name: string;
}

const SocialProofStripComponent = () => {
  const { language } = useLanguage();
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en);

  const logos: Logo[] = [
    { src: bambooDcmLogo, alt: 'Bamboo DCM', name: 'Bamboo DCM' },
    { src: mahwayLogo, alt: 'Mahway', name: 'Mahway' },
    { src: siggaLogo, alt: 'Sigga Technologies', name: 'Sigga Technologies' },
    { src: softmaxLogo, alt: 'Softmax', name: 'Softmax' },
    { src: indineroLogo, alt: 'inDinero', name: 'inDinero' },
    { src: alphaLitLogo, alt: 'Alpha Lit', name: 'Alpha Lit' },
    { src: astonishingLabsLogo, alt: 'Astonishing Labs', name: 'Astonishing Labs' },
  ];

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <div 
      style={{
        padding: '48px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.01)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow removed per Ive's panel — was ambient, not structural */}

      <div
        style={{ 
          position: 'relative', 
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Eyebrow — gold-dot signature, matching the masthead family */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '40px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.18em',
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
          <span>{t('Our ecosystem includes', 'Nosso ecossistema inclui')}</span>
        </div>

        {/* Logo Marquee Container */}
        <div 
          style={{
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            marginBottom: '56px'
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '64px',
              animation: 'marquee 50s linear infinite',
              width: 'fit-content',
              alignItems: 'center'
            }}
          >
            {allLogos.map((logo, index) => (
              <LogoItem key={`${logo.name}-${index}`} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <p
            style={{
              fontSize: '20px',
              lineHeight: '1.6',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 'var(--font-weight-regular)',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}
          >
            {t(
              '"We are not tourists. We have built, scaled, and exited. Now we are deploying that pattern recognition to build Brazil\'s next category leaders."',
              '"Não somos turistas. Já construímos, escalamos e saímos. Agora estamos aplicando esse reconhecimento de padrões para construir os próximos líderes de categoria do Brasil."'
            )}
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#F4A261',
              fontWeight: 'var(--font-weight-medium)',
              margin: 0
            }}
          >
            {t('— Avante Founding Team', '— Time Fundador da Avante')}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

interface LogoItemProps {
  src: string;
  alt: string;
}

// Uniform "muted-ghost" logo treatment: grayscale + dim by default, full
// color + opacity on hover. Avoids the previous inconsistent look where some
// logos rendered white-on-transparent (filter: brightness(0) invert(1)) and
// others kept native colors via the `darkBackground` flag — visually noisy.
const LogoItem = memo(({ src, alt }: LogoItemProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'default',
        padding: '8px 16px',
        minWidth: '180px',
        height: '80px',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          maxWidth: '140px',
          maxHeight: '60px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          filter: 'grayscale(100%) brightness(1.4) contrast(0.9)',
          opacity: 0.55,
          transition: 'filter 0.3s ease, opacity 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'grayscale(0%) brightness(1) contrast(1)'
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'grayscale(100%) brightness(1.4) contrast(0.9)'
          e.currentTarget.style.opacity = '0.55'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      />
    </div>
  );
});

LogoItem.displayName = 'LogoItem';

export const SocialProofStrip = memo(SocialProofStripComponent);