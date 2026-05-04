import { memo } from 'react';
import avanteLogo from "figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png";
import mahwayLogo from "figma:asset/3b1856ef610a311820b67d46f611d33acbb4a723.png";
import bambooLogo from "figma:asset/0dd943f4f69d462c71e06ce449e4451bd2b01681.png";
import futureProofingLogo from "figma:asset/c9a0b54648245f57238f9c98fa5893acf2b738cb.png";

const LogoCarouselComponent = () => {
  const logos = [
    { src: mahwayLogo, alt: 'Mahway', size: 110 },
    { src: bambooLogo, alt: 'Bamboo', size: 110 },
    { src: futureProofingLogo, alt: 'Future Proofing', size: 130 },
    { src: avanteLogo, alt: 'Avante', size: 80 }
  ];

  // Triple the logos for smoother infinite loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div 
      style={{ 
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: 'var(--avante-space-4) 0'
      }}
    >
      {/* Fade edges */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(to right, var(--avante-color-background) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '100%',
          background: 'linear-gradient(to left, var(--avante-color-background) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div 
        className="logo-carousel"
        style={{
          display: 'flex',
          gap: 'var(--avante-space-12)',
          animation: 'scroll 30s linear infinite',
          width: 'fit-content',
          alignItems: 'center',
          willChange: 'transform'
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={index}
            style={{
              minWidth: '200px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--avante-space-4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <img 
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              style={{
                maxWidth: '100%',
                maxHeight: `${logo.size}px`,
                objectFit: 'contain',
                transition: 'opacity 0.3s ease',
                opacity: 0.85
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .logo-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export const LogoCarousel = memo(LogoCarouselComponent);