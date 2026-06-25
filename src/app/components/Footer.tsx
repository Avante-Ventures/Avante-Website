// Footer — Phase B editorial refactor.
//
// Old (rev a3): a balanced 4-column grid with brand blurb + nav + sources +
// social. Functional but visually small — read like a SaaS footer.
//
// New: a publication colophon. A scroll-triggered cord (gradient line that
// draws itself in 1.4s on scroll-into-view) opens the footer, followed by a
// MONUMENTAL "A vante." lockup at 340px on desktop (clamps to 96px on
// mobile). Below: a Funnel Display tagline anchored to the firm's actual
// horizon ("Studio that compounds. Brazil-native, AI-native. Built for
// decades."), the 4-column nav grid (Offices / Firm / For / Now), and the
// Sources block (preserved verbatim — Diana's panel insisted citations stay).
// Bottom is a mono colophon row: © + cordão version + signature line.
//
// Why this scale matters: the Figma's footer mark is the visual full stop
// of the site's narrative arc. Anything smaller reads as "we ran out of
// runway." 340px reads as "we put our name on the building."

import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'
import { ClockRow } from '@/app/components/ClockRow'

export function Footer() {
  const { language } = useLanguage()
  // Accepts ReactNode so the tagline can carry inline JSX (gradient span).
  // Optional `es` arg lets us add Spanish without breaking existing 2-arg
  // callsites — those fall back to EN for ES viewers until translated.
  const t = <T extends ReactNode>(en: T, pt: T, es?: T): T =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en
  const cordRef = useRef<HTMLDivElement>(null)
  const sourcesRef = useRef<HTMLDetailsElement>(null)

  // Scroll-trigger the cord exactly once when 40% of it enters the viewport.
  // Pure CSS class flip — the tween itself is in theme.css (.avt-cord-fill).
  useEffect(() => {
    const el = cordRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('avt-cord--played')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The Sources list is collapsed by default (keeps the footer short) but must
  // stay reachable: the Investors and Why-Avante pages link footnotes to
  // /<lang>#source-N. So whenever the URL hash points at a source, open the
  // <details> and scroll to it — on first load and on later hash changes.
  useEffect(() => {
    const openIfSourceHash = () => {
      if (!location.hash.startsWith('#source-')) return
      const det = sourcesRef.current
      if (det) det.open = true
      // wait one frame for the disclosure to expand before scrolling
      requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ block: 'center' })
      })
    }
    openIfSourceHash()
    window.addEventListener('hashchange', openIfSourceHash)
    return () => window.removeEventListener('hashchange', openIfSourceHash)
  }, [])

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--avt-ink)',
        padding: 'clamp(72px, 9vw, 104px) 24px 48px',
        borderTop: '1px solid var(--avt-hair)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Scroll-triggered cord */}
        <div
          ref={cordRef}
          className="avt-cord"
          style={{ ['--cord-w' as string]: '78%' } as React.CSSProperties}
        >
          <div className="avt-cord-fill" />
        </div>

        {/* Editorial signature mark — the SAME gradient wordmark as the navbar
            (avante-logo.svg), rendered monumental as the page's visual full stop.
            One canonical logo across the site, not two. */}
        <div style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
          <img
            src="/redesign-assets/avante-logo.svg"
            alt="Avante"
            style={{ height: 'clamp(44px, 7vw, 104px)', width: 'auto', display: 'block' }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            marginTop: 'clamp(32px, 5vw, 64px)',
            fontFamily: 'var(--avt-font-display)',
            fontWeight: 400,
            fontSize: 'clamp(20px, 2.4vw, 32px)',
            color: '#cdd2ee',
            letterSpacing: '-0.015em',
            lineHeight: 1.25,
            maxWidth: '780px',
          }}
        >
          {t(
            <>
              Studio that compounds.{' '}
              <span className="avt-grad">Brazil-native, AI-native.</span> Built for decades.
            </>,
            <>
              Studio que compõe.{' '}
              <span className="avt-grad">Brasil-native, AI-native.</span> Construído para décadas.
            </>,
            <>
              Studio que compone.{' '}
              <span className="avt-grad">Brasil-native, AI-native.</span> Construido para décadas.
            </>
          )}
        </p>

        {/* ClockRow — Phase D. Live local time in the firm's two operating
            cities, rendered as 2-column hairline cells. Quietly tells the
            visitor where the studio physically is, in real time. */}
        <div style={{ marginTop: 'clamp(40px, 5vw, 60px)' }}>
          <ClockRow />
        </div>

        {/* 4-column nav grid (preserves all current routes) */}
        <div
          className="avt-footer-grid"
          style={{
            marginTop: 'clamp(44px, 5vw, 72px)',
            display: 'grid',
            gap: 'clamp(28px, 4vw, 48px)',
          }}
        >
          {/* Column 1: Offices (2 cities for clock-row vibe) */}
          <FooterColumn title={t('Offices', 'Escritórios', 'Oficinas')}>
            <FooterStaticLine>São Paulo · sede</FooterStaticLine>
            <FooterStaticLine>Silicon Valley</FooterStaticLine>
          </FooterColumn>

          {/* Column 2: Firm — top-level routes */}
          <FooterColumn title={t('Firm', 'Studio', 'Studio')}>
            <FooterLink to={`/${language}/why-avante`} label={t('Why Avante', 'Por Que Avante', 'Por Qué Avante')} />
            <FooterLink to={`/${language}/portfolio`} label={t('Portfolio', 'Portfólio', 'Portafolio')} />
            <FooterLink to={`/${language}/principles`} label={t('Principles', 'Princípios', 'Principios')} />
            <FooterLink to={`/${language}/library`} label={t('Library', 'Biblioteca', 'Biblioteca')} />
          </FooterColumn>

          {/* Column 3: For — audiences (doors pattern coming in Phase D) */}
          <FooterColumn title={t('For', 'Para', 'Para')}>
            <FooterLink to={`/${language}/investors`} label={t('Investors / LPs', 'Investidores / LPs', 'Inversores / LPs')} />
            <FooterMail href="mailto:cristian@avanteventures.com" label={t('Press · Inquiries', 'Imprensa · Consultas', 'Prensa · Consultas')} />
          </FooterColumn>

          {/* Column 4: Now — operating reality */}
          <FooterColumn title={t('Now', 'Agora', 'Ahora')}>
            <FooterStaticLine>{t('3 active · 3 in pipeline', '3 ativas · 3 no pipeline', '3 activas · 3 en pipeline')}</FooterStaticLine>
            <FooterStaticLine>{t('São Paulo · winter 2026', 'São Paulo · inverno 2026', 'São Paulo · invierno 2026')}</FooterStaticLine>
            <FooterStaticLine
              style={{ color: 'rgba(205, 210, 238, 0.55)', marginTop: '6px', fontSize: '12px' }}
            >
              {t('Legal: Lefosse + Foley', 'Jurídico: Lefosse + Foley', 'Legal: Lefosse + Foley')}
            </FooterStaticLine>
          </FooterColumn>
        </div>

        {/* Sources — Diana's panel: a venture firm that cites is a firm that opens
            its work. Collapsed by default to keep the colophon tight; opens on a
            #source-N hash (see effect above) so footnote links still resolve. */}
        <SourcesBlock t={t} innerRef={sourcesRef} />

        {/* Bottom mono colophon */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '28px',
            borderTop: '1px solid var(--avt-hair)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <MonoColophon>© 2026 Avante Ventures · São Paulo · cordão v0.1</MonoColophon>
          <MonoColophon>
            {t(
              '— a venture studio that signs its name',
              '— um venture studio que assina seu nome',
              '— un venture studio que firma con su nombre'
            )}
          </MonoColophon>
        </div>
      </div>

      <style>{`
        .avt-footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .avt-footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .avt-footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; }
        }
        .avt-sources summary::-webkit-details-marker { display: none; }
        .avt-sources summary::marker { content: ''; }
        .avt-sources summary:hover { color: #fff; }
        .avt-sources .avt-sources-chevron { display: inline-block; transition: transform 240ms ease; }
        .avt-sources[open] .avt-sources-chevron { transform: rotate(90deg); }
      `}</style>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Internal building blocks. Kept inline (not extracted to a separate file)
// to make the editorial vocabulary easy to read in one place.
// ─────────────────────────────────────────────────────────────────────────

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        style={{
          fontFamily: 'var(--avt-font-body)',
          fontSize: '12px',
          color: 'var(--avt-meta)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '18px',
        }}
      >
        {title}
      </h4>
      {children}
    </div>
  )
}

const footerLinkStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  color: '#cdd2ee',
  textDecoration: 'none',
  padding: '6px 0',
  transition: 'color 0.2s ease',
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      style={footerLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#cdd2ee')}
    >
      {label}
    </Link>
  )
}

function FooterMail({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={footerLinkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#cdd2ee')}
    >
      {label}
    </a>
  )
}

function FooterStaticLine({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        display: 'block',
        fontSize: '14px',
        color: '#cdd2ee',
        padding: '6px 0',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function MonoColophon({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: 'var(--avt-font-body)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--avt-meta)',
      }}
    >
      {children}
    </span>
  )
}

function SourcesBlock({
  t,
  innerRef,
}: {
  t: <T extends ReactNode>(en: T, pt: T, es?: T) => T
  innerRef?: React.Ref<HTMLDetailsElement>
}) {
  return (
    <details ref={innerRef} className="avt-sources" style={{ marginTop: 'clamp(40px, 5vw, 56px)' }}>
      <summary
        style={{
          cursor: 'pointer',
          listStyle: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--avt-font-body)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--avt-meta)',
          userSelect: 'none',
          transition: 'color 0.2s ease',
        }}
      >
        <span className="avt-sources-chevron" aria-hidden>▸</span>
        {t('Sources & methodology', 'Fontes e metodologia', 'Fuentes y metodología')}
      </summary>
      <ol
        style={{
          fontSize: '12px',
          color: 'rgba(205, 210, 238, 0.78)',
          lineHeight: 1.7,
          margin: '18px 0 0',
          paddingLeft: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4px 24px',
        }}
      >
        <SourceItem id="source-1">
          {t(
            'Brazil GDP, population, services share: ',
            'PIB, população e parcela de serviços do Brasil: ',
            'PIB, población y participación de servicios de Brasil: '
          )}
          <SourceLink href="https://www.ibge.gov.br">IBGE National Accounts 2025</SourceLink>
          {' · '}
          <SourceLink href="https://www.bcb.gov.br">Banco Central do Brasil</SourceLink>
        </SourceItem>
        <SourceItem id="source-2">
          {t(
            'Brazilian unicorns count: ',
            'Número de unicórnios brasileiros: ',
            'Número de unicornios brasileños: '
          )}
          <SourceLink href="https://www.distrito.me">Distrito Mining Report 2025</SourceLink>
        </SourceItem>
        <SourceItem id="source-3">
          {t(
            'Brazil renewable energy share: ',
            'Parcela de energia renovável do Brasil: ',
            'Participación de energía renovable de Brasil: '
          )}
          <SourceLink href="https://www.epe.gov.br">EPE Brazilian Energy Balance 2025</SourceLink>
        </SourceItem>
        <SourceItem id="source-4">
          {t(
            'Brazil AI investment: ',
            'Investimento em IA no Brasil: ',
            'Inversión en IA en Brasil: '
          )}
          <SourceLink href="https://www.lavca.org">LAVCA Brazil VC + Tech Report 2025</SourceLink>
        </SourceItem>
        <SourceItem id="source-5">
          {t(
            'SME software penetration: ',
            'Penetração de software em PMEs: ',
            'Penetración de software en PYMEs: '
          )}
          <SourceLink href="https://www.sebrae.com.br">Sebrae SME Tech Adoption Survey 2024</SourceLink>
          {' · '}
          {t('Avante internal market sizing', 'Estimativa interna Avante', 'Estimación interna Avante')}
        </SourceItem>
        <SourceItem id="source-6">
          {t(
            'Studio IRR vs traditional VC: ',
            'IRR de studios vs VC tradicional: ',
            'IRR de studios vs VC tradicional: '
          )}
          <SourceLink href="https://www.gssn.co">GSSN Annual Report 2025</SourceLink>
          {' · '}
          <SourceLink href="https://www.cambridgeassociates.com">Cambridge Associates US VC Index Q4 2025</SourceLink>
        </SourceItem>
      </ol>
    </details>
  )
}

function SourceItem({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <li id={id} style={{ marginBottom: '4px' }}>
      {children}
    </li>
  )
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'rgba(205, 210, 238, 0.85)',
        textDecoration: 'none',
        borderBottom: '1px dotted rgba(205, 210, 238, 0.3)',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.borderBottomColor = '#fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(205, 210, 238, 0.85)'
        e.currentTarget.style.borderBottomColor = 'rgba(205, 210, 238, 0.3)'
      }}
    >
      {children}
    </a>
  )
}
