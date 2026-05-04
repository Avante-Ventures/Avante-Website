import { useLanguage } from '@/app/hooks/useLanguage';
import { useState, useEffect, useRef } from 'react';

interface StepData {
  number: number;
  titleKey: string;
  descKey: string;
  label: string;
}

const steps: StepData[] = [
  {
    number: 1,
    titleKey: 'system.step1.title',
    descKey: 'system.step1.desc',
    label: 'Research'
  },
  {
    number: 2,
    titleKey: 'system.step2.title',
    descKey: 'system.step2.desc',
    label: 'Partner'
  },
  {
    number: 3,
    titleKey: 'system.step3.title',
    descKey: 'system.step3.desc',
    label: 'Build'
  },
  {
    number: 4,
    titleKey: 'system.step4.title',
    descKey: 'system.step4.desc',
    label: 'Traction'
  },
  {
    number: 5,
    titleKey: 'system.step5.title',
    descKey: 'system.step5.desc',
    label: 'Revenue'
  },
  {
    number: 6,
    titleKey: 'system.step6.title',
    descKey: 'system.step6.desc',
    label: 'Compound'
  }
];

// Color gradients for each step number - gray to purple to orange
const stepColors = [
  'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
  'linear-gradient(135deg, #8B92A0 0%, #6B7280 100%)',
  'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
  'linear-gradient(135deg, #B794C1 0%, #98509A 100%)',
  'linear-gradient(135deg, #E0A878 0%, #F4A261 100%)',
  'linear-gradient(135deg, #F9B437 0%, #F18B46 100%)'
];

export function PlaybookStaircase() {
  const { t } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);
  
  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        paddingTop: 'var(--avante-space-6)', 
        paddingBottom: 'var(--avante-space-4)',
        width: '100%',
        maxWidth: '1200px'
      }}
    >
      
      {/* Connecting Lines - Desktop Only (3 columns) */}
      <div className="connector-lines-wrapper">
        {/* Top Row Line (connecting circles 1-2-3) */}
        <svg 
          className="connector-line connector-line-top"
          style={{
            position: 'absolute',
            top: '16px',
            left: 0,
            width: '100%',
            height: '4px',
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          preserveAspectRatio="none"
          viewBox="0 0 100 1"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F4A261" />
              <stop offset="100%" stopColor="#7B68EE" />
            </linearGradient>
          </defs>
          <rect 
            x="0" 
            y="0" 
            width="100" 
            height="1" 
            fill="url(#lineGradient)"
            style={{
              transformOrigin: 'left center',
              animation: hasAnimated ? 'drawConnectorLine 1s ease-out forwards' : 'none'
            }}
          />
        </svg>

        {/* Bottom Row Line (connecting circles 4-5-6) */}
        <svg 
          className="connector-line connector-line-bottom"
          style={{
            position: 'absolute',
            top: 'calc(50% + 8px)',
            left: 0,
            width: '100%',
            height: '4px',
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'visible'
          }}
          preserveAspectRatio="none"
          viewBox="0 0 100 1"
        >
          <rect 
            x="0" 
            y="0" 
            width="100" 
            height="1" 
            fill="url(#lineGradient)"
            style={{
              transformOrigin: 'left center',
              animation: hasAnimated ? 'drawConnectorLine 1s ease-out 0.3s forwards' : 'none'
            }}
          />
        </svg>
      </div>
      
      {/* Grid Layout */}
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '16px',
          position: 'relative',
          zIndex: 1
        }}
        className="playbook-grid"
      >
        
        {steps.map((step, index) => (
          <div 
            key={step.number}
            style={{ 
              position: 'relative',
              height: '100%',
              minHeight: '140px'
            }}
          >
            <div 
              style={{
                height: '100%',
                padding: 'var(--avante-space-4)',
                backgroundColor: step.number === 6 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.03)',
                border: step.number === 6 ? '1px solid rgba(249, 180, 55, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--avante-radius-12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: step.number === 6 ? '0 0 30px rgba(249, 180, 55, 0.1)' : 'none',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Step Number Badge with Animation */}
              <div 
                className="step-circle"
                style={{
                  position: 'absolute',
                  left: '-12px',
                  top: '-12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: step.number === 6 ? '0 0 20px rgba(249, 180, 55, 0.3)' : 'none',
                  zIndex: 2
                }}
              >
                {/* Gradient Fill - Animated */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: stepColors[step.number - 1],
                    animation: hasAnimated ? `fillCircle 0.4s ease-out ${0.2 + index * 0.3}s forwards` : 'none',
                    transform: hasAnimated ? 'scale(1)' : 'scale(0)',
                    opacity: hasAnimated ? 1 : 0
                  }}
                />
                
                {/* Inner circle with number */}
                <div 
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--avante-background)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--avante-text-primary)',
                    fontSize: '13px',
                    fontWeight: 'var(--font-weight-semibold)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {step.number}
                </div>
              </div>
              
              <h3 
                className="avante-body-emphasized" 
                style={{ 
                  color: 'var(--avante-text-primary)', 
                  marginBottom: 'var(--avante-space-2)',
                  fontSize: '16px',
                  fontWeight: 'var(--font-weight-semibold)'
                }}
              >
                {t(step.titleKey)}
              </h3>
              <p 
                className="avante-body" 
                style={{ 
                  color: 'var(--avante-text-secondary)', 
                  fontSize: '14px',
                  lineHeight: '1.6',
                  flex: 1
                }}
              >
                {t(step.descKey)}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Flow Text Below Cards */}
      <div 
        style={{
          marginTop: 'var(--avante-space-6)',
          textAlign: 'center',
          fontSize: '14px',
          color: '#F4A261',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '0.02em'
        }}
      >
        Research → Partner → Build → Traction → Revenue → Compound
      </div>

      <style>{`
        @keyframes fillCircle {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes drawConnectorLine {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        /* Hide connector lines on mobile and tablet */
        .connector-lines-wrapper {
          display: none;
        }

        /* Mobile: 1 column */
        .playbook-grid {
          grid-template-columns: repeat(1, 1fr);
        }

        /* Tablet: 2 columns x 3 rows */
        @media (min-width: 640px) {
          .playbook-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Desktop: 3 columns x 2 rows */
        @media (min-width: 1024px) {
          .playbook-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          /* Show connector lines only on desktop */
          .connector-lines-wrapper {
            display: block;
          }
        }
      `}</style>

    </div>
  );
}