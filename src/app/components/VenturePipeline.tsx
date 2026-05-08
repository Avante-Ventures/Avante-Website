interface PipelineVenture {
  name: string;
  tagline: string;
  bullets: string[];
  color: string;
  accentColor: string;
}

export function VenturePipeline() {
  const pipelineVentures: PipelineVenture[] = [
    {
      name: 'CRIA Studio',
      tagline: 'AI Creative Studio for SMB',
      bullets: [
        'On-demand branded content generation',
        'Multi-channel asset optimization',
        'Built-in compliance & brand guidelines'
      ],
      color: '#F4A261',
      accentColor: '#F9B437',
    },
    {
      name: 'Pulse.ai',
      tagline: 'WhatsApp Sales for CPG',
      bullets: [
        'Conversational commerce at scale',
        'Automated order fulfillment',
        'Real-time inventory sync'
      ],
      color: '#98509A',
      accentColor: '#C47EC6',
    },
    {
      name: 'RADAR.ai',
      tagline: 'Market Intelligence for Investors',
      bullets: [
        'Real-time sector trend analysis',
        'Automated deal sourcing pipeline',
        'Competitive landscape mapping'
      ],
      color: '#F18B46',
      accentColor: '#F9B437',
    },
    {
      name: 'ROTA.ai',
      tagline: 'AI Procurement Hub',
      bullets: [
        'Intelligent vendor matching',
        'Automated RFP generation',
        'Contract negotiation assistance'
      ],
      color: '#F9B437',
      accentColor: '#FDD068',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pipelineVentures.map((venture, index) => {
        return (
          <div
            key={index}
            className="interactive-card"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              border: '2px solid transparent',
              backgroundImage: `
                linear-gradient(rgba(21, 30, 53, 1), rgba(21, 30, 53, 1)),
                linear-gradient(135deg, rgba(241, 139, 70, 0.3) 0%, rgba(152, 80, 154, 0.3) 100%)
              `,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
            onMouseEnter={(e) => {
              const r = parseInt(venture.color.slice(1,3), 16);
              const g = parseInt(venture.color.slice(3,5), 16);
              const b = parseInt(venture.color.slice(5,7), 16);
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 16px 40px ${venture.color}40`;
              e.currentTarget.style.backgroundImage = `
                linear-gradient(rgba(${r}, ${g}, ${b}, 0.08), rgba(${r}, ${g}, ${b}, 0.08)),
                linear-gradient(135deg, rgba(241, 139, 70, 0.5) 0%, rgba(152, 80, 154, 0.5) 100%)
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundImage = `
                linear-gradient(rgba(21, 30, 53, 1), rgba(21, 30, 53, 1)),
                linear-gradient(135deg, rgba(241, 139, 70, 0.3) 0%, rgba(152, 80, 154, 0.3) 100%)
              `;
            }}
          >
            {/* Company Logo — styled typographic badge */}
            <div
              style={{
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px'
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  letterSpacing: '-0.03em',
                  background: `linear-gradient(135deg, ${venture.accentColor} 0%, ${venture.color} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {venture.name}
              </span>
            </div>

            {/* Tagline in Orange */}
            <p
              style={{
                fontSize: '14px',
                color: '#F18B46',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: '20px',
                lineHeight: '1.4'
              }}
            >
              {venture.tagline}
            </p>

            {/* 3 Bullet Points */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {venture.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#FFFFFF',
                    lineHeight: '1.6'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: venture.color,
                      marginTop: '8px',
                      flexShrink: 0
                    }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Subtle glow effect */}
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${venture.color}30 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none',
                opacity: 0.5
              }}
            />
          </div>
        );
      })}
    </div>
  );
}