import { Linkedin } from 'lucide-react';
import amandaPinheiroImg from "figma:asset/0a1ec90c23ea3ecfd7aad617181931030fd5b933.png";
import andreaBarricaImg from "figma:asset/95fc15c3891d5e0cda0ff1d42037cfa820486b7d.png";
import felipeMoraesImg from "figma:asset/519c629d474eecc634d87a6923ca3cebba52d7bf.png";
import jessMahImg from "figma:asset/96db4b20b151852d0ac2c591cbf6a583e744966a.png";

interface TeamMember {
  name: string;
  role: string;
  roleColor: string;
  trackRecord: string;
  photo: string;
  linkedin: string;
}

export function TeamGrid() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Amanda Pinheiro',
      role: 'Co-Founder & Managing Partner',
      roleColor: '#F18B46',
      trackRecord: 'Previously: $500MM+ invested at Innova Capital. Board exits: Sigga (10x), Accera (4x MOI)',
      photo: amandaPinheiroImg,
      linkedin: 'https://www.linkedin.com/in/amandafmpinheiro/'
    },
    {
      name: 'Andrea Barrica',
      role: 'Co-Founder & Operating Partner',
      roleColor: '#98509A',
      trackRecord: 'Previously: YC W14, founded O.school',
      photo: andreaBarricaImg,
      linkedin: 'https://www.linkedin.com/in/andreabarrica/'
    },
    {
      name: 'Felipe Moraes',
      role: 'Venture Partner',
      roleColor: '#F9B437',
      trackRecord: 'Previously: Innova Capital, Brazilian PE/VC ecosystem',
      photo: felipeMoraesImg,
      linkedin: 'https://www.linkedin.com/in/felipe-moraes/'
    },
    {
      name: 'Jess Mah',
      role: 'Strategic Advisor',
      roleColor: '#F18B46',
      trackRecord: 'Previously: YC, inDinero founder, Forbes 30 Under 30',
      photo: jessMahImg,
      linkedin: 'https://www.linkedin.com/in/jessmah/'
    }
  ];

  return (
    <div>
      {/* Team Grid 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="interactive-card"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'default',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => {
              const r = parseInt(member.roleColor.slice(1,3), 16);
              const g = parseInt(member.roleColor.slice(3,5), 16);
              const b = parseInt(member.roleColor.slice(5,7), 16);
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = `0 20px 48px ${member.roleColor}30`;
              e.currentTarget.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            {/* Photo - Black and White, fills top 60% */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '320px',
                overflow: 'hidden'
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(70%)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              
              {/* LinkedIn Icon - Top Right Corner */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = member.roleColor;
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Linkedin size={18} style={{ color: '#FFFFFF' }} />
              </a>
            </div>

            {/* Card Content - Bottom 40% */}
            <div style={{ padding: '24px' }}>
              {/* Name */}
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  letterSpacing: '-0.01em'
                }}
              >
                {member.name}
              </h3>

              {/* Role - Uppercase with tracking */}
              <p
                style={{
                  fontSize: '14px',
                  color: member.roleColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 'var(--font-weight-medium)',
                  marginBottom: '16px'
                }}
              >
                {member.role}
              </p>

              {/* Track Record Line - Italic Gray */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#9CA3AF',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                  margin: 0
                }}
              >
                {member.trackRecord}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Advisors Mention */}
      <div
        style={{
          textAlign: 'center',
          padding: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          marginTop: '32px'
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
            lineHeight: '1.6',
            margin: 0
          }}
        >
          <span style={{ fontWeight: 'var(--font-weight-medium)', color: '#FFFFFF' }}>
            Legal & Governance:
          </span>{' '}
          Lefosse (BR) + Foley & Lardner (US)
        </p>
      </div>
    </div>
  );
}
