import { memo } from 'react';
import avanteLogo from "figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png";
import mahwayLogo from "figma:asset/3b1856ef610a311820b67d46f611d33acbb4a723.png";
import futureProofingLogo from "figma:asset/c9a0b54648245f57238f9c98fa5893acf2b738cb.png";

const LogoGridComponent = () => {
  const items = [
    { name: 'WIR', subtitle: 'AI-Native InsurTech', type: 'venture', color: '#42468C' },
    { name: 'Clareo', subtitle: 'Litigation Finance', type: 'venture', color: '#98509A' },
    { src: mahwayLogo, alt: 'Mahway', subtitle: 'Operational Partner', size: 120, type: 'logo' },
    { src: futureProofingLogo, alt: 'Future Proofing', subtitle: 'Operational Partner', size: 200, type: 'logo' }
  ];

  // Duplicate items for seamless infinite loop
  const allItems = [...items, ...items, ...items];

  return (
    <div 
      style={{ 
        width: '100%',
        position: 'relative',
        padding: 'var(--avante-space-4) 0',
        overflow: 'hidden'
      }}
    >
      {/* Infinite Carousel */}
      <div 
        style={{
          display: 'flex',
          gap: 'var(--avante-space-12)',
          animation: 'scroll-left 40s linear infinite',
          width: 'fit-content'
        }}
      >
        {allItems.map((item, index) => (
          <div 
            key={index}
            style={{
              minWidth: '280px',
              height: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--avante-space-5)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              textAlign: 'center',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {item.type === 'venture' ? (
              <>
                {/* Venture Name as Text */}
                <div 
                  style={{
                    fontSize: '38px',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--avante-text-primary)',
                    marginBottom: 'var(--avante-space-2)',
                    letterSpacing: '-0.02em',
                    opacity: 0.9,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                >
                  {item.name}
                </div>
                <div 
                  style={{
                    fontSize: '13px',
                    color: item.color,
                    fontWeight: 'var(--font-weight-medium)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    opacity: 0.8
                  }}
                >
                  {item.subtitle}
                </div>
              </>
            ) : (
              <>
                {/* Partner Logo */}
                <img 
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: `${item.size}px`,
                    objectFit: 'contain',
                    transition: 'opacity 0.3s ease',
                    opacity: 0.7,
                    marginBottom: 'var(--avante-space-2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
                <div 
                  style={{
                    fontSize: '12px',
                    color: 'var(--avante-text-muted)',
                    fontWeight: 'var(--font-weight-medium)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: 'var(--avante-space-2)'
                  }}
                >
                  {item.subtitle}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
};

export const LogoGrid = memo(LogoGridComponent);