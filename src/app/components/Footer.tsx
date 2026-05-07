import { Linkedin, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'

export function Footer() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        padding: '64px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top: 4-column grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gap: '32px',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
                marginBottom: '12px',
              }}
            >
              Avante Ventures
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.55)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '280px',
              }}
            >
              {t(
                'AI-native venture studio. Silicon Valley playbooks, Brazil-native execution.',
                'Venture studio AI-native. Playbooks do Vale do Silício, execução brasileira.'
              )}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '16px',
              }}
            >
              {t('Navigate', 'Navegação')}
            </div>
            <FooterLink to={`/${language}`} label={t('Home', 'Início')} />
            <FooterLink to={`/${language}/why-avante`} label={t('Why Avante', 'Por Que Avante')} />
            <FooterLink to={`/${language}/library`} label={t('Library', 'Biblioteca')} />
          </div>

          {/* Resources / inline section anchors on home */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '16px',
              }}
            >
              {t('Explore', 'Explore')}
            </div>
            <FooterAnchor href={`/${language}#whatwedo`} label={t('Thesis', 'Tese')} />
            <FooterAnchor href={`/${language}#playbook`} label="Playbook" />
            <FooterAnchor href={`/${language}#ventures`} label="Ventures" />
            <FooterAnchor href={`/${language}#team`} label={t('Team', 'Time')} />
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '16px',
              }}
            >
              {t('Get in Touch', 'Entre em Contato')}
            </div>

            <a
              href="mailto:cristian@avanteventures.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                textDecoration: 'none',
                marginBottom: '12px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F4A261')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
            >
              <Mail size={14} />
              cristian@avanteventures.com
            </a>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255, 255, 255, 0.55)',
                fontSize: '14px',
                marginBottom: '20px',
              }}
            >
              <MapPin size={14} />
              São Paulo · San Francisco
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://www.linkedin.com/company/avante-ventures/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Avante Ventures on LinkedIn"
                style={socialIconStyle}
                onMouseEnter={(e) => applySocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => applySocialHover(e.currentTarget, false)}
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:cristian@avanteventures.com"
                aria-label="Email Avante Ventures"
                style={socialIconStyle}
                onMouseEnter={(e) => applySocialHover(e.currentTarget, true)}
                onMouseLeave={(e) => applySocialHover(e.currentTarget, false)}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Sources — Sprint 1 / A3.
            Footnote anchors for the StatsBar numbers. Diana opens the door
            on a site that cites; Pedro stops calling them "every BR pitch
            deck stats"; Karim respects intellectual honesty. */}
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '12px',
            }}
          >
            {t('Sources', 'Fontes')}
          </div>
          <ol
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.55)',
              lineHeight: 1.7,
              margin: 0,
              paddingLeft: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '4px 24px',
            }}
          >
            <li id="source-1">
              {t(
                'Brazil GDP, population, services share: ',
                'PIB, população e parcela de serviços do Brasil: '
              )}
              <a href="https://www.ibge.gov.br" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                IBGE National Accounts 2025
              </a>
              {' · '}
              <a href="https://www.bcb.gov.br" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                Banco Central do Brasil
              </a>
            </li>
            <li id="source-2">
              {t('Brazilian unicorns count: ', 'Número de unicórnios brasileiros: ')}
              <a href="https://www.distrito.me" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                Distrito Mining Report 2025
              </a>
            </li>
            <li id="source-3">
              {t('Brazil renewable energy share: ', 'Parcela de energia renovável do Brasil: ')}
              <a href="https://www.epe.gov.br" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                EPE Brazilian Energy Balance 2025
              </a>
            </li>
            <li id="source-4">
              {t('Brazil AI investment: ', 'Investimento em IA no Brasil: ')}
              <a href="https://www.lavca.org" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                LAVCA Brazil VC + Tech Report 2025
              </a>
            </li>
            <li id="source-5">
              {t(
                'SME software penetration: ',
                'Penetração de software em PMEs: '
              )}
              <a href="https://www.sebrae.com.br" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                Sebrae SME Tech Adoption Survey 2024
              </a>
              {' · '}Avante internal market sizing
            </li>
            <li id="source-6">
              {t(
                'Studio IRR vs traditional VC: ',
                'IRR de studios vs VC tradicional: '
              )}
              <a href="https://www.gssn.co" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                GSSN Annual Report 2025
              </a>
              {' · '}
              <a href="https://www.cambridgeassociates.com" target="_blank" rel="noopener noreferrer" style={sourceLinkStyle}>
                Cambridge Associates US VC Index Q4 2025
              </a>
            </li>
          </ol>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Bottom: copyright + language switch hint */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '13px',
          }}
        >
          <div>© 2026 Avante Ventures. {t('All rights reserved.', 'Todos os direitos reservados.')}</div>
          <div style={{ fontSize: '12px' }}>
            {t('Built to compound for decades.', 'Construído para compor por décadas.')}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; }
        }
      `}</style>
    </footer>
  )
}

const sourceLinkStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.75)',
  textDecoration: 'none',
  borderBottom: '1px dotted rgba(255, 255, 255, 0.3)',
  transition: 'color 0.2s ease, border-color 0.2s ease',
}

const socialIconStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.25s ease',
  color: '#9CA3AF',
}

function applySocialHover(el: HTMLElement, hover: boolean) {
  if (hover) {
    el.style.backgroundColor = 'rgba(249, 180, 55, 0.12)'
    el.style.borderColor = 'rgba(249, 180, 55, 0.6)'
    el.style.color = '#F9B437'
    el.style.transform = 'translateY(-2px)'
  } else {
    el.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
    el.style.borderColor = 'rgba(255, 255, 255, 0.1)'
    el.style.color = '#9CA3AF'
    el.style.transform = 'translateY(0)'
  }
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        textDecoration: 'none',
        marginBottom: '10px',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#F4A261')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
    >
      {label}
    </Link>
  )
}

function FooterAnchor({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '14px',
        textDecoration: 'none',
        marginBottom: '10px',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#F4A261')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
    >
      {label}
    </a>
  )
}
