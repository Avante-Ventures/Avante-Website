import { memo } from 'react';
import imgAmandaPinheiro from "figma:asset/b5863e4467cfc4dd5b953580a9fd0f52cb39d694.png";
import imgFelipeMoraes from "figma:asset/24217fa1372f1a7a6001c942dbc43c8d05ffbe06.png";
import imgJessMah from "figma:asset/0cc97db3c08e4e16ab3eed711a0e53d69d4a9e2d.png";
import imgAndreaBarrica from "figma:asset/f44c4accfb2025a70b48a3e7ce1e850a67f1519f.png";
import { SectionMasthead } from '@/app/components/SectionMasthead';
import { useLanguage } from '@/app/hooks/useLanguage';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  highlights: string[];
  accentColor: string;
}

const TeamSectionComponent = () => {
  const { language } = useLanguage();
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en);

  const teamMembers: TeamMember[] = [
    {
      name: 'Amanda Pinheiro',
      title: 'Co-Founder & Partner - Avante',
      image: imgAmandaPinheiro,
      highlights: [
        'Board Member Sigga Technologies (10x exit)',
        'Deep expertise in AI-native venture building',
        'Former C-Level at insurance and fintech companies'
      ],
      accentColor: '#98509A'
    },
    {
      name: 'Felipe Moraes',
      title: 'Strategic Advisor and founder of Bamboo DCM',
      image: imgFelipeMoraes,
      highlights: [
        'Strategic Partner and Founder of Bamboo DCM',
        'Board Member WIR'
      ],
      accentColor: '#F4A261'
    },
    {
      name: 'Jess Mah',
      title: 'Partner & Co-Founder - Mahway',
      image: imgJessMah,
      highlights: [
        'Founding CEO of inDinero (100+ employees, profitable)',
        'Sequoia Scout',
        'Built and scaled inDinero (Fintech) for 10+ years'
      ],
      accentColor: '#F9B437'
    },
    {
      name: 'Andrea Barrica',
      title: 'Partner & Co-Founder - Mahway',
      image: imgAndreaBarrica,
      highlights: [
        'Former VP at 500 Startups (500 Global)',
        'CEO of O.school',
        'Co-founder of inDinero'
      ],
      accentColor: '#E6C54C'
    }
  ];

  return (
    <div
      style={{
        padding: '24px 24px 48px',
        background: 'rgba(255, 255, 255, 0.01)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow removed per Ive's panel — was ambient, not structural */}

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Title */}
        <SectionMasthead
          centered
          eyebrow={t('Our Team', 'Nosso Time')}
          title={t(
            'Silicon Valley meets Brazil.',
            'Vale do Silício encontra o Brasil.'
          )}
          description={t(
            'Operators who have built, scaled, and exited — now writing the playbook for Brazil.',
            'Operadores que construíram, escalaram e saíram — agora escrevendo o playbook para o Brasil.'
          )}
        />

        {/* Team Grid */}
        <div
          className="team-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px'
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = memo(({ member }: TeamMemberCardProps) => {
  return (
    <div
      style={{
        padding: '32px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Subtle gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, ${member.accentColor}10 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header: Photo + Name/Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px'
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: `2px solid ${member.accentColor}40`,
              boxShadow: `0 8px 24px ${member.accentColor}20`,
              flexShrink: 0,
              background: '#364153'
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Name & Title */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 'var(--font-weight-bold)',
                color: '#FFFFFF',
                marginBottom: '8px',
                lineHeight: '1.2'
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'var(--font-weight-semibold)',
                color: member.accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0
              }}
            >
              {member.title}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {member.highlights.map((highlight, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              {/* Bullet dot */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: member.accentColor,
                  marginTop: '8px',
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${member.accentColor}60`
                }}
              />
              {/* Text */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: 0,
                  fontWeight: 'var(--font-weight-regular)'
                }}
              >
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';

export const TeamSection = memo(TeamSectionComponent);
