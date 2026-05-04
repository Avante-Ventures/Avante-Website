import { Building2, Dna, Sparkles, DollarSign } from 'lucide-react';

interface Venture {
  name: string;
  industry: string;
  year: string;
  description: string;
  color: string;
}

export function VenturesGrid() {
  const ventures: Venture[] = [
    {
      name: 'Alpha Lit',
      industry: 'FinTech',
      year: '2023',
      description: 'AI-powered financial literacy platform for emerging markets',
      color: '#42468C'
    },
    {
      name: 'Astonishing Labs',
      industry: 'BioTech',
      year: '2022',
      description: 'ML-driven drug discovery accelerating therapeutic development',
      color: '#98509A'
    },
    {
      name: 'Softmax',
      industry: 'AI Infrastructure',
      year: '2023',
      description: 'Enterprise-grade AI deployment and monitoring solutions',
      color: '#F18B46'
    },
    {
      name: 'Indinero',
      industry: 'Finance',
      year: '2014',
      description: 'Automated accounting and tax services for growing businesses',
      color: '#F9B437'
    }
  ];

  const getIcon = (industry: string) => {
    switch (industry) {
      case 'FinTech':
        return DollarSign;
      case 'BioTech':
        return Dna;
      case 'AI Infrastructure':
        return Sparkles;
      case 'Finance':
        return Building2;
      default:
        return Building2;
    }
  };

  return (
    <div>
      {/* Grid of Venture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {ventures.map((venture, index) => {
          const Icon = getIcon(venture.industry);
          
          return (
            <div
              key={index}
              className="interactive-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 40px ${venture.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Colored Top Bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  backgroundColor: venture.color
                }}
              />

              {/* Company Logo/Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: `${venture.color}14`,
                  border: `1px solid ${venture.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Icon size={28} style={{ color: venture.color, strokeWidth: 1.8 }} />
              </div>

              {/* Company Name */}
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#151E35',
                  marginBottom: '12px',
                  letterSpacing: '-0.01em'
                }}
              >
                {venture.name}
              </h3>

              {/* Industry Tag & Year */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                {/* Industry Pill */}
                <span
                  style={{
                    display: 'inline-flex',
                    padding: '6px 12px',
                    fontSize: '11px',
                    color: venture.color,
                    backgroundColor: `${venture.color}0A`,
                    border: `1px solid ${venture.color}30`,
                    borderRadius: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: '600'
                  }}
                >
                  {venture.industry}
                </span>

                {/* Establishment Year */}
                <span
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontWeight: '500',
                    letterSpacing: '0.02em'
                  }}
                >
                  Est. {venture.year}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#4B5563',
                  lineHeight: '1.6',
                  margin: 0
                }}
              >
                {venture.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Case Studies Link */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="#case-studies"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
            color: '#F18B46',
            fontWeight: 'var(--font-weight-medium)',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            padding: '8px 16px',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F9B437';
            e.currentTarget.style.backgroundColor = 'rgba(241, 139, 70, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#F18B46';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          View Case Studies
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transition: 'transform 0.3s ease' }}
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
