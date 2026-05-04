import { memo } from 'react';
import bambooDcmLogo from '../../imports/image-6.png';
import mahwayLogo from '../../imports/image.png';
import siggaLogo from '../../imports/image-3.png';
import softmaxLogo from '../../imports/image-1.png';
import indineroLogo from '../../imports/image-2.png';
import alphaLitLogo from '../../imports/image-5.png';
import astonishingLabsLogo from '../../imports/image-4.png';

interface Logo {
  src: string;
  alt: string;
  name: string;
  darkBackground?: boolean;
}

const SocialProofStripComponent = () => {
  const logos: Logo[] = [
    { src: bambooDcmLogo, alt: 'Bamboo DCM', name: 'Bamboo DCM' },
    { src: mahwayLogo, alt: 'Mahway', name: 'Mahway' },
    { src: siggaLogo, alt: 'Sigga Technologies', name: 'Sigga Technologies' },
    { src: softmaxLogo, alt: 'Softmax', name: 'Softmax' },
    { src: indineroLogo, alt: 'inDinero', name: 'inDinero' },
    { src: alphaLitLogo, alt: 'Alpha Lit', name: 'Alpha Lit', darkBackground: true },
    { src: astonishingLabsLogo, alt: 'Astonishing Labs', name: 'Astonishing Labs', darkBackground: true },
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
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        {/* Title */}
        <div 
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          <p 
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.5)',
              fontWeight: 'var(--font-weight-medium)',
              margin: 0
            }}
          >
            Our ecosystem includes
          </p>
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
              <LogoItem key={`${logo.name}-${index}`} src={logo.src} alt={logo.alt} darkBackground={logo.darkBackground} />
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
            "We are not tourists. We have built, scaled, and exited. Now we are deploying that pattern recognition to build Brazil's next category leaders."
          </p>
          <p 
            style={{
              fontSize: '14px',
              color: '#F4A261',
              fontWeight: 'var(--font-weight-medium)',
              margin: 0
            }}
          >
            — Avante Founding Team
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
  darkBackground?: boolean;
}

const LogoItem = memo(({ src, alt, darkBackground }: LogoItemProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.3s ease',
        cursor: 'default',
        opacity: 0.6,
        padding: '8px 0',
        minWidth: '180px',
        height: '80px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.6';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          maxWidth: '160px',
          maxHeight: '70px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          filter: darkBackground ? 'none' : 'brightness(0) invert(1)',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
});

LogoItem.displayName = 'LogoItem';

export const SocialProofStrip = memo(SocialProofStripComponent);