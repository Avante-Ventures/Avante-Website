import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '48px 24px 32px'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        {/* Top Section: Location & Social */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Location */}
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '15px',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            São Paulo + San Francisco
          </div>

          {/* Social Icons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <a
              href="https://www.linkedin.com/company/avante-ventures/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                color: '#9CA3AF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                e.currentTarget.style.borderColor = '#f97316';
                e.currentTarget.style.color = '#f97316';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Linkedin size={18} />
            </a>

            <a
              href="mailto:cristian@avanteventures.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                color: '#9CA3AF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                e.currentTarget.style.borderColor = '#f97316';
                e.currentTarget.style.color = '#f97316';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#9CA3AF';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.08)'
          }}
        />

        {/* Bottom Section: Copyright */}
        <div
          style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px'
          }}
        >
          © 2026 Avante. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
