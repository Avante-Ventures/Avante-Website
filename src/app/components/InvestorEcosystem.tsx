import { Sparkles, Users, Cpu, MessageSquare, Linkedin, Mail, MapPin } from 'lucide-react';

interface InvestorEcosystemProps {
  onOpenContact: () => void;
}

export function InvestorEcosystem({ onOpenContact }: InvestorEcosystemProps) {
  return (
    <div 
      style={{
        position: 'relative',
        textAlign: 'center'
      }}
    >
      {/* Subtle gradient background */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <h2 
          style={{
            fontSize: '48px',
            lineHeight: '1.2',
            fontWeight: 'var(--font-weight-bold)',
            color: '#FFFFFF',
            marginBottom: 'var(--avante-space-4)',
            letterSpacing: '-0.02em'
          }}
        >
          Welcome to the Avante Ecosystem
        </h2>
        
        <p 
          style={{
            fontSize: '20px',
            lineHeight: '1.5',
            color: '#9CA3AF',
            fontWeight: 'var(--font-weight-regular)',
            marginBottom: 'var(--avante-space-3)',
            maxWidth: '800px',
            margin: '0 auto var(--avante-space-3) auto'
          }}
        >
          Beyond returns — strategic access to the AI revolution in Brazil
        </p>

        {/* Eyebrow badge */}
        <div 
          style={{
            display: 'inline-block',
            padding: 'var(--avante-space-2) var(--avante-space-5)',
            backgroundColor: 'rgba(230, 197, 76, 0.12)',
            border: '1px solid rgba(230, 197, 76, 0.3)',
            borderRadius: 'var(--avante-radius-8)',
            marginBottom: 'var(--avante-space-12)',
            fontSize: '13px',
            fontWeight: 'var(--font-weight-bold)',
            color: '#E6C54C',
            textTransform: 'uppercase',
            letterSpacing: '1.5px'
          }}
        >
          Investor Mega Perks
        </div>

        {/* Investor Perks - Bento Grid Style */}
        <div 
          className="investor-perks-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--avante-space-5)',
            marginBottom: 'var(--avante-space-12)',
            maxWidth: '1200px',
            margin: '0 auto var(--avante-space-12) auto'
          }}
        >
          {/* Perk 1 - Large Featured Card (spans 7 columns) */}
          <div
            className="bento-card bento-card-large"
            style={{
              gridColumn: 'span 7',
              padding: 'var(--avante-space-10)',
              background: 'linear-gradient(135deg, rgba(230, 197, 76, 0.08) 0%, rgba(152, 80, 154, 0.06) 100%)',
              border: '1px solid rgba(230, 197, 76, 0.2)',
              borderRadius: 'var(--avante-radius-24)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(230, 197, 76, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 64px rgba(230, 197, 76, 0.2), inset 0 0 60px rgba(230, 197, 76, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(230, 197, 76, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Animated gradient orb */}
            <div 
              style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 197, 76, 0.4) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
              }}
            />

            {/* Large number watermark */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '140px',
                lineHeight: '1',
                fontWeight: 'var(--font-weight-bold)',
                background: 'linear-gradient(135deg, rgba(230, 197, 76, 0.15) 0%, rgba(230, 197, 76, 0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              01
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Icon with circular background */}
              <div 
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(230, 197, 76, 0.2) 0%, rgba(230, 197, 76, 0.1) 100%)',
                  border: '1px solid rgba(230, 197, 76, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--avante-space-6)',
                  boxShadow: '0 8px 32px rgba(230, 197, 76, 0.2)'
                }}
              >
                <Sparkles size={32} color="#E6C54C" strokeWidth={2} />
              </div>

              <h3 
                style={{
                  fontSize: '32px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--avante-space-4)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em'
                }}
              >
                Quarterly Expert AI Training
              </h3>

              <p 
                style={{
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 'var(--font-weight-regular)',
                  maxWidth: '420px'
                }}
              >
                Exclusive workshops led by top AI practitioners. Stay ahead of the curve with hands-on learning from the best minds in AI.
              </p>
            </div>
          </div>

          {/* Perk 2 - Vertical Card (spans 5 columns) */}
          <div
            className="bento-card bento-card-vertical"
            style={{
              gridColumn: 'span 5',
              padding: 'var(--avante-space-8)',
              background: 'linear-gradient(180deg, rgba(152, 80, 154, 0.08) 0%, rgba(230, 197, 76, 0.05) 100%)',
              border: '1px solid rgba(152, 80, 154, 0.2)',
              borderRadius: 'var(--avante-radius-24)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '320px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 64px rgba(152, 80, 154, 0.2), inset 0 0 60px rgba(152, 80, 154, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Gradient orb */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '-60px',
                width: '240px',
                height: '240px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(152, 80, 154, 0.35) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
              }}
            />

            {/* Number badge */}
            <div 
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(152, 80, 154, 0.15)',
                border: '1px solid rgba(152, 80, 154, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'rgba(152, 80, 154, 0.8)'
              }}
            >
              02
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(152, 80, 154, 0.2) 0%, rgba(152, 80, 154, 0.1) 100%)',
                  border: '1px solid rgba(152, 80, 154, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--avante-space-5)',
                  boxShadow: '0 8px 32px rgba(152, 80, 154, 0.2)'
                }}
              >
                <Users size={28} color="var(--avante-accent-purple)" strokeWidth={2} />
              </div>

              <h3 
                style={{
                  fontSize: '24px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--avante-space-4)',
                  lineHeight: '1.3'
                }}
              >
                Futureproofing.dev Priority
              </h3>

              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontWeight: 'var(--font-weight-regular)'
                }}
              >
                Priority access to our AI talent company. Hire vetted AI engineers before anyone else.
              </p>
            </div>
          </div>

          {/* Perk 3 - Horizontal Card (spans 5 columns) */}
          <div
            className="bento-card bento-card-horizontal"
            style={{
              gridColumn: 'span 5',
              padding: 'var(--avante-space-8)',
              background: 'linear-gradient(135deg, rgba(244, 162, 97, 0.08) 0%, rgba(249, 180, 55, 0.05) 100%)',
              border: '1px solid rgba(244, 162, 97, 0.2)',
              borderRadius: 'var(--avante-radius-24)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 64px rgba(244, 162, 97, 0.2), inset 0 0 60px rgba(244, 162, 97, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(244, 162, 97, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Gradient orb */}
            <div 
              style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(244, 162, 97, 0.35) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
              }}
            />

            {/* Number badge */}
            <div 
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(244, 162, 97, 0.15)',
                border: '1px solid rgba(244, 162, 97, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'var(--font-weight-bold)',
                color: 'rgba(244, 162, 97, 0.9)'
              }}
            >
              03
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(244, 162, 97, 0.2) 0%, rgba(244, 162, 97, 0.1) 100%)',
                  border: '1px solid rgba(244, 162, 97, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--avante-space-5)',
                  boxShadow: '0 8px 32px rgba(244, 162, 97, 0.2)'
                }}
              >
                <Cpu size={28} color="var(--avante-accent-orange)" strokeWidth={2} />
              </div>

              <h3 
                style={{
                  fontSize: '24px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--avante-space-4)',
                  lineHeight: '1.3'
                }}
              >
                Access to Mahway Agents
              </h3>

              <p 
                style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontWeight: 'var(--font-weight-regular)'
                }}
              >
                Portfolio of custom AI agents for your business. Ready-to-deploy automation tools.
              </p>
            </div>
          </div>

          {/* Perk 4 - Feature Card (spans 7 columns) */}
          <div
            className="bento-card bento-card-feature"
            style={{
              gridColumn: 'span 7',
              padding: 'var(--avante-space-10)',
              background: 'linear-gradient(135deg, rgba(249, 180, 55, 0.08) 0%, rgba(244, 162, 97, 0.06) 100%)',
              border: '1px solid rgba(249, 180, 55, 0.2)',
              borderRadius: 'var(--avante-radius-24)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 32px 64px rgba(249, 180, 55, 0.2), inset 0 0 60px rgba(249, 180, 55, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Gradient orb */}
            <div 
              style={{
                position: 'absolute',
                bottom: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '400px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(249, 180, 55, 0.35) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
              }}
            />

            {/* Large number watermark */}
            <div 
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '140px',
                lineHeight: '1',
                fontWeight: 'var(--font-weight-bold)',
                background: 'linear-gradient(135deg, rgba(249, 180, 55, 0.15) 0%, rgba(249, 180, 55, 0.05) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                pointerEvents: 'none',
                userSelect: 'none'
              }}
            >
              04
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div 
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(249, 180, 55, 0.2) 0%, rgba(249, 180, 55, 0.1) 100%)',
                  border: '1px solid rgba(249, 180, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--avante-space-6)',
                  boxShadow: '0 8px 32px rgba(249, 180, 55, 0.2)'
                }}
              >
                <MessageSquare size={32} color="var(--avante-accent-gold)" strokeWidth={2} />
              </div>

              <h3 
                style={{
                  fontSize: '32px',
                  fontWeight: 'var(--font-weight-bold)',
                  color: '#FFFFFF',
                  marginBottom: 'var(--avante-space-4)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em'
                }}
              >
                On-Demand AI Consulting
              </h3>

              <p 
                style={{
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 'var(--font-weight-regular)',
                  maxWidth: '420px'
                }}
              >
                Personalized AI implementation consulting. Turn your operations into AI-powered workflows with expert guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ marginTop: 'var(--avante-space-8)' }}>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            style={{
              padding: 'var(--avante-space-5) var(--avante-space-8)',
              fontSize: '18px',
              fontWeight: 'var(--font-weight-semibold)',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, var(--avante-accent-orange) 0%, var(--avante-accent-gold) 100%)',
              border: 'none',
              borderRadius: 'var(--avante-radius-12)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 8px 32px rgba(249, 180, 55, 0.3)',
              marginBottom: 'var(--avante-space-6)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(249, 180, 55, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(249, 180, 55, 0.3)';
            }}
          >
            Start a Conversation
          </button>

          {/* Location info */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--avante-space-2)',
              marginBottom: 'var(--avante-space-5)',
              color: '#9CA3AF',
              fontSize: '15px'
            }}
          >
            <MapPin size={16} strokeWidth={2} />
            <span>São Paulo + San Francisco</span>
          </div>

          {/* Social links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--avante-space-4)'
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
                e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.1)';
                e.currentTarget.style.borderColor = 'var(--avante-accent-orange)';
                e.currentTarget.style.color = 'var(--avante-accent-orange)';
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
                color: '#9CA3AF',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.1)';
                e.currentTarget.style.borderColor = 'var(--avante-accent-orange)';
                e.currentTarget.style.color = 'var(--avante-accent-orange)';
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

          {/* Legal Advisors Section */}
          <div
            style={{
              marginTop: 'var(--avante-space-12)',
              paddingTop: 'var(--avante-space-8)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <p
              style={{
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 'var(--font-weight-medium)',
                marginBottom: 'var(--avante-space-5)',
                textAlign: 'center'
              }}
            >
              Worldwide Legal Advisors
            </p>

            <div
              style={{
                display: 'flex',
                gap: 'var(--avante-space-4)',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  padding: 'var(--avante-space-3) var(--avante-space-6)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--avante-radius-8)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Foley (USA)
              </div>

              <div
                style={{
                  padding: 'var(--avante-space-3) var(--avante-space-6)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--avante-radius-8)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Lefosse (Brazil)
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .investor-perks-grid {
            grid-template-columns: 1fr !important;
            gap: var(--avante-space-4) !important;
          }
          
          .bento-card {
            grid-column: span 12 !important;
            min-height: 280px !important;
            padding: var(--avante-space-6) !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .investor-perks-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
          
          .bento-card-large,
          .bento-card-feature {
            grid-column: span 6 !important;
          }
          
          .bento-card-vertical,
          .bento-card-horizontal {
            grid-column: span 3 !important;
          }
        }
      `}</style>
    </div>
  );
}