// /portfolio — full venture lineup, beyond the home hero strip.
//
// Purpose: a destination page anyone (LP, founder, partner) can land on and
// immediately understand the studio's track record + active cohort. Avoids
// the home-page constraint of "one editorial line" and shows actual breadth.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { VenturePipeline } from '@/app/components/VenturePipeline'
import { Link } from 'react-router'

// Ventures data — Round 9 restructure (full deck-aligned taxonomy).
//   'cohort1'           = Avante studio Cohort 1 — active Year 1 builds
//   'partner-cofounded' = boutiques co-founded by an Avante partner
//   'us-building'       = ventures built by Jess + Andrea in the US (Mahway brand family)
//   'investing'         = pre-Avante investments by founding team (Innova era)
//   'us-alumni'         = US-built ventures by team members pre-Avante
// Each venture carries optional `tag`, `est`, `highlight` (e.g. MOI), and
// `backers` (text-based co-investor list) so the cards self-narrate.
interface Venture {
  name: string
  description: { en: string; pt: string }
  status: 'cohort1' | 'partner-cofounded' | 'us-building' | 'investing' | 'us-alumni'
  accent: string
  url?: string
  /** Short category chip rendered in the card eyebrow row. */
  tag?: string
  /** Establishment year shown next to the tag. */
  est?: string
  /** Big metric callout (e.g. "MOI 11×", "Exit 2021"). Renders on the right. */
  highlight?: string
  /** Text-based backer/co-investor strip. Rendered as a small caps line. */
  backers?: string
  /** Optional alt brand name to display (e.g. Mahway is shown as "Softmax"
   *  in the deck because Softmax is the Mahway-built AI product). */
  altBrand?: string
}

const VENTURES: Venture[] = [
  // ─────────── COHORT 1 — ACTIVE ───────────
  {
    name: 'WIR',
    description: {
      en: 'Async insurance pricing + risk scoring API. Top-tier global insurer pilot in motion (under NDA); reference architecture for InsurTech sales across LATAM.',
      pt: 'API assíncrona de pricing e risk scoring para seguros. Piloto com seguradora global Tier-1 em andamento (sob NDA); arquitetura de referência para vendas InsurTech na LATAM.',
    },
    status: 'cohort1',
    accent: '#F9B437',
    tag: 'InsurTech',
    est: 'Est. 2024',
  },
  {
    name: 'Alphajuri',
    description: {
      en: 'AI-native judicial asset platform for the Brazilian precatorios + claims market. Copilot-to-fund flywheel; built from scratch inside Cohort 1.',
      pt: 'Plataforma AI-native de ativos judiciais para o mercado brasileiro de precatórios + claims. Flywheel copilot-to-fund; construído do zero dentro da Cohort 1.',
    },
    status: 'cohort1',
    accent: '#F4A261',
    tag: 'LegalTech',
    est: 'Est. 2024',
  },
  // ─────────── PARTNER CO-FOUNDED ───────────
  {
    name: 'Bamboo DCM',
    description: {
      en: 'AI-native technology platform and financial company based in Brazil that specializes in originating, structuring, and distributing private credit. Co-founded by Felipe Moraes.',
      pt: 'Plataforma tecnológica e empresa financeira AI-native baseada no Brasil, especializada em originar, estruturar e distribuir crédito privado. Co-fundada por Felipe Moraes.',
    },
    status: 'partner-cofounded',
    accent: '#F4A261',
    tag: 'Fintech',
    est: 'Est. 2022',
    backers: 'Scale Up by Endeavor',
  },
  // ─────────── US BUILDING TRACK RECORD (Mahway brand family) ───────────
  {
    // Round 9.1 — Softmax is the front-facing AI venture (a16z-backed);
    // Mahway is the parent operating company. User clarified that the deck
    // "softmax" slide is the asset for Mahway's flagship build, so we
    // surface Softmax as the primary brand with Mahway as the parent context.
    name: 'Softmax',
    altBrand: 'by Mahway',
    description: {
      en: 'AI foundational model that understands and aligns with human behaviour, preferences, biology, and ethics. Built by Jess Mah + Andrea Barrica inside Mahway; flagship of the US Building track.',
      pt: 'Modelo fundacional de IA que entende e se alinha com comportamento, preferências, biologia e ética humanas. Construído por Jess Mah + Andrea Barrica dentro da Mahway; flagship do track US Building.',
    },
    status: 'us-building',
    accent: '#a8429b',
    tag: 'AI · Mahway',
    est: 'Est. 2023',
    backers: 'Andreessen Horowitz',
  },
  {
    name: 'Astonishing Labs',
    description: {
      en: 'Turns breakthrough science into high-upside biotech ventures via a holding company model. US-side venture in the Mahway operating family.',
      pt: 'Transforma ciência de fronteira em ventures de biotech de alto potencial via modelo de holding company. Venture americana na família operacional Mahway.',
    },
    status: 'us-building',
    accent: '#ec5f72',
    tag: 'BioTech',
    est: 'Est. 2022',
    backers: 'X Prize',
  },
  {
    name: 'Alpha Lit',
    description: {
      en: 'Fintech platform that originates, bundles, and sells equity in litigation finance portfolios — opening access to a $16B+ asset class.',
      pt: 'Plataforma fintech que origina, agrega e vende equity em portfólios de litigation finance — abrindo acesso a uma classe de ativos de $16B+.',
    },
    status: 'us-building',
    accent: '#E6C54C',
    tag: 'FinTech',
    est: 'Est. 2023',
    backers: 'Bright Ventures · FJ Labs · Slow Ventures',
  },
  // ─────────── INVESTING TRACK RECORD (Innova era — Amanda + Felipe) ───────────
  {
    name: 'Movile / iFood',
    description: {
      en: 'Brazil\'s largest food-delivery unicorn. Tech holding comprising iFood, Wavy, and Playkids. Innova first invested in Movile in 2014; participated in several rounds and secondary investments. Exit 2021 at 80% market share, 55M users/month.',
      pt: 'O maior unicórnio de delivery do Brasil. Holding tecnológica composta por iFood, Wavy e Playkids. Innova investiu pela primeira vez em 2014; participou de várias rodadas e secundários. Exit em 2021 com 80% de market share e 55M de usuários/mês.',
    },
    status: 'investing',
    accent: '#ec5f72',
    tag: 'Tech Holding',
    est: 'Est. 2014',
    highlight: 'Exit 2021',
  },
  {
    name: 'Sigga Technologies',
    description: {
      en: '#1 enterprise asset management (EAM) field service solution in Brazil and one of the largest EAM companies globally. Mobile-native, SAP-integrated; sold into mining, paper, energy.',
      pt: 'Solução #1 em enterprise asset management (EAM) field service no Brasil e uma das maiores empresas EAM globalmente. Mobile-native, integrada com SAP; vendida para mineração, papel, energia.',
    },
    status: 'investing',
    accent: '#98509A',
    tag: 'Maintenance SaaS',
    est: 'Est. 2013',
    highlight: 'MOI 11×',
  },
  {
    name: 'Accera',
    description: {
      en: 'Platform for retailers and manufacturers, providing end-to-end advanced analytics and execution management.',
      pt: 'Plataforma para varejistas e fabricantes, oferecendo analytics avançado end-to-end e gestão de execução.',
    },
    status: 'investing',
    accent: '#F18B46',
    tag: 'Retail Tech',
    est: 'Est. 2014',
    highlight: 'MOI 4×',
  },
  // ─────────── US ALUMNI ───────────
  {
    name: 'inDinero',
    description: {
      en: 'Profitable company with 200+ clients in the USA, connecting finance teams with offshoring accounting solutions. Founded by Jess Mah pre-Avante; reference operator track record for the studio.',
      pt: 'Empresa rentável com mais de 200 clientes nos EUA, conectando times de finanças com soluções de contabilidade offshore. Fundada por Jess Mah pré-Avante; track record de referência operacional para o studio.',
    },
    status: 'us-alumni',
    accent: '#7B68EE',
    tag: 'Finance',
    est: 'Est. 2014',
    backers: 'Y Combinator · SaaS Capital · MRTNZ · Acequia Capital',
  },
]

const SEO = {
  en: {
    title: 'Portfolio — Avante Ventures',
    description:
      'The full Avante portfolio: realized exits, active cohort, and alumni ventures from our partner team. From Sigga (10× exit) to Mahway, WIR, and beyond.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Portfólio — Avante Ventures',
    description:
      'O portfólio completo da Avante: exits realizados, cohort ativa e ventures alumni do nosso time de partners. Da Sigga (exit 10×) à Mahway, WIR e além.',
    inLanguage: 'pt-BR',
  },
  es: {
    title: 'Portafolio — Avante Ventures',
    description:
      'El portafolio completo de Avante: exits realizados, cohort activa y ventures alumni de nuestro equipo de partners. Desde Sigga (exit 10×) a Mahway, WIR y más allá.',
    inLanguage: 'es',
  },
} as const

export default function PortfolioPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language] ?? SEO.en

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://avanteventures.com/${language}/portfolio#page`,
    name: copy.title,
    description: copy.description,
    url: `https://avanteventures.com/${language}/portfolio`,
    inLanguage: copy.inLanguage,
    isPartOf: { '@id': 'https://avanteventures.com/#website' },
    about: VENTURES.map((v) => v.name),
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--avante-background)' }}>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/portfolio"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--avt-page-pad-top) var(--avt-page-pad-x) var(--avt-page-pad-bottom)',
        }}
      >
        <Link
          to={`/${language}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.55)',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '32px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F9B437')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}
        >
          ← {t('Back to home', 'Voltar ao início')}
        </Link>

        <SectionMasthead
          eyebrow={t('Portfolio · Year 1 of Building', 'Portfólio · Ano 1 de Building')}
          title={t(
            'Our Ventures — and our Track Record.',
            'Nossas Ventures — e nosso Track Record.'
          )}
          description={t(
            'Cohort 1 is live (WIR + Alphajuri). Below: every venture this team has built, co-founded, or invested in — from Innova-era tickets in 2014 (iFood, Sigga, Accera) to today\'s active US Building track (Mahway, Astonishing Labs, Alpha Lit) and the Avante studio cohort.',
            'Cohort 1 está ativa (WIR + Alphajuri). Abaixo: cada venture que este time construiu, co-fundou ou investiu — dos cheques da era Innova em 2014 (iFood, Sigga, Accera) ao track US Building ativo hoje (Mahway, Astonishing Labs, Alpha Lit) e a cohort do studio Avante.'
          )}
        />

        {/* (1) BY THE NUMBERS — panoramic strip right after the masthead.
            Anchors the visitor with operating scale before they scroll into
            individual cards. Hairline border + mono-style proportional caps
            so it reads as a "headline summary," not chrome. */}
        <PortfolioSummaryStrip t={t} />

        {/* (4) FEATURED ANCHOR — Sigga gets its own hero card before the
            grid. It's the strongest single proof point we have (10× exit,
            Amanda on board through scale + exit). Treating it as one of six
            "regular" cards buried the most important data. */}
        <SiggaAnchorCard language={language} t={t} />

        {/* (3) GROUPED VENTURE SECTIONS — replaces the 5-dot legend +
            single grid with explicit subheaders. Reads as "structured
            portfolio" instead of "filterable list." Each group has its own
            mini-masthead so the eye understands the taxonomy. */}
        {(
          [
            { status: 'cohort1', label: t('Cohort 1', 'Cohort 1'), accent: '#F9B437' },
            { status: 'partner-cofounded', label: t('Partner Co-founded', 'Co-fundada por Partner'), accent: '#F4A261' },
            { status: 'us-building', label: t('US Building Track Record', 'Track Record US Building'), accent: '#a8429b' },
            { status: 'investing', label: t('Investing Track Record', 'Track Record de Investimento'), accent: '#ec5f72' },
            { status: 'us-alumni', label: t('US Alumni', 'Alumni EUA'), accent: '#7B68EE' },
          ] as const
        ).map((group, gi) => {
          const ventures = VENTURES.filter((v) => v.status === group.status)
          if (ventures.length === 0) return null
          return (
            <div key={group.status} style={{ marginTop: gi === 0 ? '64px' : '56px' }}>
              <GroupHeader label={group.label} accent={group.accent} count={ventures.length} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                  gap: '20px',
                }}
              >
                {ventures.map((v) => (
                  <VentureCard
                    key={v.name}
                    venture={v}
                    body={v.description[language === 'es' ? 'en' : language]}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* Bottom note */}
        <div
          style={{
            marginTop: '64px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderLeft: '3px solid #F9B437',
            borderRadius: '12px',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {t(
              'We launch 3–4 new ventures per year inside the studio. The active cohort listed here is intentionally narrow — a discipline, not a scarcity. New cohort additions are introduced after a venture has cleared Stage 3 (Build) of the playbook.',
              'Lançamos 3–4 novas ventures por ano dentro do studio. A cohort ativa aqui listada é deliberadamente enxuta — disciplina, não escassez. Novas ventures aparecem na lista depois de passar pelo Estágio 3 (Build) do playbook.'
            )}
          </p>
        </div>

        {/* TRACK RECORD section — relocated from home (ProofSection).
            10× / 4× / $500MM+ + 5× / 90% are studio-level proof points
            and belong with the venture data, not with the marketing
            home flow.                                                      */}
        {/* Round 9: Track Record metrics + Early Signals + Timeline removed.
            Those datapoints now live inside the venture cards above
            (Investing Track Record group carries Sigga MOI 11×, Accera 5×,
            iFood Exit 2021). Avoids duplicate proof and keeps the page
            focused on cards. */}

        {/* PIPELINE section — relocated from home. The 3 pipeline ventures
            (CRIA Studio, Pulse.ai, RADAR.ai) belong on the portfolio page
            alongside the realized + active cohort, not as a separate home
            section.                                                        */}
        <section style={{ marginTop: '96px' }}>
          <SectionMasthead
            centered
            compact
            eyebrow={t('New Ventures', 'Novas Ventures')}
            title={t(
              'Next wave of AI-native category leaders.',
              'A próxima onda de líderes de categoria AI-native.'
            )}
            description={t(
              'Ventures currently in Stage 1–3 of the playbook (Research / Partner / Build). Names and details may shift before public launch.',
              'Ventures atualmente nos Estágios 1–3 do playbook (Research / Partner / Build). Nomes e detalhes podem mudar antes do lançamento público.'
            )}
          />
          <div style={{ marginTop: '32px' }}>
            <VenturePipeline />
          </div>

          {/* Disclaimer per Toney (Plexo) + Felipe Martins panel notes:
              named pipeline ventures are quasi-public commitments. If any
              pivots pre-Series A (50%+ of the time), the public site reads
              as broken promises. Make the soft-commitment explicit.       */}
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.45)',
              fontStyle: 'italic',
              textAlign: 'center',
              margin: '24px auto 0',
              maxWidth: '640px',
              lineHeight: 1.6,
            }}
          >
            {t(
              'Pipeline ventures are pre-launch — names, taglines, and scope are subject to change as theses sharpen. Track Record above reflects realized outcomes from the founding team\'s prior work, not Pipeline performance.',
              'Ventures de pipeline estão pré-lançamento — nomes, taglines e escopo podem mudar conforme as teses afinam. O Track Record acima reflete resultados realizados do trabalho prévio do time fundador, não performance do Pipeline.'
            )}
          </p>
        </section>

        {/* CTA back to home library */}
        <div style={{ textAlign: 'center', marginTop: '96px' }}>
          <Link
            to={`/${language}/library/sigga-case-study-10x-exit`}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #F9B437 0%, #F4A261 100%)',
              color: '#0E1428',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(249, 180, 55, 0.25)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 180, 55, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 180, 55, 0.25)'
            }}
          >
            {t('Read the Sigga case study →', 'Leia o estudo de caso da Sigga →')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// Round 9 — richer card that renders the deck-aligned data: tag chip,
// est year, body, optional backers strip, optional highlight metric.
// Replaces the generic EditorialCard for the portfolio grid because we
// now have multi-field data per venture.
function VentureCard({ venture, body }: { venture: Venture; body: string }) {
  const isCohort1 = venture.status === 'cohort1'
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '2px',
        padding: '28px',
        border: `1px solid var(--avt-hair)`,
        borderLeft: `3px solid ${venture.accent}`,
        background: 'transparent',
        transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${venture.accent}0E`
        e.currentTarget.style.borderColor = `${venture.accent}40`
        e.currentTarget.style.borderLeftColor = venture.accent
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'var(--avt-hair)'
        e.currentTarget.style.borderLeftColor = venture.accent
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row: tag + est on the left, optional highlight on the right */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          {isCohort1 && (
            <span
              aria-hidden
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '99px',
                background: '#ec5f72',
                boxShadow: '0 0 10px #ec5f72',
                animation: 'navPulse 2s ease-in-out infinite',
                display: 'inline-block',
              }}
            />
          )}
          {venture.tag && (
            <span
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: venture.accent,
                padding: '3px 9px',
                border: `1px solid ${venture.accent}55`,
                borderRadius: '99px',
              }}
            >
              {venture.tag}
            </span>
          )}
          {venture.est && (
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
              {venture.est}
            </span>
          )}
        </div>
        {venture.highlight && (
          <span
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              background: `linear-gradient(135deg, ${venture.accent} 0%, #F9B437 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}
          >
            {venture.highlight}
          </span>
        )}
      </div>

      {/* Brand name + alt brand (if any). The altBrand renders smaller next
          to the canonical name to surface "Mahway / Softmax" gracefully. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--avt-font-display)',
            fontSize: 'clamp(22px, 2vw, 28px)',
            fontWeight: 500,
            letterSpacing: '-0.025em',
            color: '#fff',
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {venture.name}
        </h3>
        {venture.altBrand && (
          <span
            style={{
              fontFamily: 'var(--avt-font-body)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: venture.accent,
              padding: '2px 8px',
              border: `1px solid ${venture.accent}55`,
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            {venture.altBrand}
          </span>
        )}
      </div>

      {/* Body */}
      <p
        style={{
          fontSize: '14.5px',
          lineHeight: 1.6,
          color: 'var(--avt-muted)',
          margin: 0,
        }}
      >
        {body}
      </p>

      {/* Backers — small caps line at the bottom when present */}
      {venture.backers && (
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: `1px solid ${venture.accent}22`,
            fontFamily: 'var(--avt-font-body)',
            fontSize: '10.5px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--avt-meta)',
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: 'var(--avt-meta)', opacity: 0.7 }}>
            {/* Small "Backed by" prefix kept short to give the names room */}
            Backed by:&nbsp;
          </span>
          <span style={{ color: 'var(--avt-muted)', textTransform: 'none', letterSpacing: '0.02em', fontWeight: 500 }}>
            {venture.backers}
          </span>
        </div>
      )}
    </div>
  )
}

function StatusKey({ label, dot }: { label: string; dot: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: dot,
          boxShadow: `0 0 8px ${dot}80`,
        }}
      />
      <span>{label}</span>
    </div>
  )
}

// (2) Summary strip — Round 9 update with deck-aligned framing.
function PortfolioSummaryStrip({ t }: { t: (en: string, pt: string) => string }) {
  const items: Array<{ value: string; label: string }> = [
    { value: t('Year 1', 'Ano 1'), label: t('of Building', 'de Building') },
    { value: '2', label: t('Ventures · Cohort 1', 'Ventures · Cohort 1') },
    { value: t('Since 2010', 'Desde 2010'), label: t('Building & Investing', 'Building & Investing') },
    { value: '$500M+', label: t('Deployed lifetime', 'Investidos historicamente') },
  ]
  return (
    <div
      className="avt-summary-strip"
      style={{
        marginTop: '40px',
        display: 'grid',
        border: '1px solid var(--avt-hair)',
        background: 'rgba(255, 255, 255, 0.015)',
      }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            padding: '20px 24px',
            borderRight: i < items.length - 1 ? '1px solid var(--avt-hair)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: 'clamp(22px, 2.4vw, 32px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {it.value}
          </span>
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
            {it.label}
          </span>
        </div>
      ))}
      <style>{`
        .avt-summary-strip { grid-template-columns: 1fr; }
        @media (min-width: 640px) { .avt-summary-strip { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .avt-summary-strip { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 899px) { .avt-summary-strip > div { border-right: none !important; border-bottom: 1px solid var(--avt-hair); } .avt-summary-strip > div:last-child { border-bottom: none; } }
      `}</style>
    </div>
  )
}

// (4) Sigga featured anchor — the realized 10× exit deserves a stage of its
// own. Wider than a normal venture card, with a callout layout: big metric
// on the left, narrative on the right.
function SiggaAnchorCard({
  language,
  t,
}: {
  language: 'en' | 'pt' | 'es'
  t: (en: string, pt: string) => string
}) {
  return (
    <div
      style={{
        marginTop: '40px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #98509A55',
        background:
          'linear-gradient(135deg, rgba(152, 80, 154, 0.10) 0%, rgba(66, 70, 140, 0.04) 60%, transparent 100%), var(--avt-ink-2)',
        padding: 'clamp(28px, 4vw, 48px)',
        borderRadius: '14px',
      }}
    >
      {/* Decorative glow */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(152, 80, 154, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 240px) 1fr',
          gap: 'clamp(24px, 4vw, 56px)',
          alignItems: 'center',
        }}
        className="avt-sigga-grid"
      >
        {/* LEFT: monumental metric */}
        <div>
          <div
            style={{
              fontFamily: 'var(--avt-font-body)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#98509A',
              marginBottom: '12px',
            }}
          >
            {t('Realized Exit · 2022', 'Exit Realizado · 2022')}
          </div>
          <div
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: 'clamp(64px, 10vw, 128px)',
              fontWeight: 500,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #98509A 0%, #ec5f72 60%, #F9B437 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            10×
          </div>
        </div>

        {/* RIGHT: narrative */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--avt-font-display)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 500,
              letterSpacing: '-0.025em',
              color: '#fff',
              margin: '0 0 12px 0',
              lineHeight: 1.05,
            }}
          >
            Sigga Technologies
          </h3>
          <p
            style={{
              fontSize: '15.5px',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 16px 0',
              maxWidth: '560px',
            }}
          >
            {language === 'pt'
              ? 'Software industrial para o mid-market brasileiro. Amanda Pinheiro no Conselho durante todo o ciclo de escala e exit. A tese, a paciência operacional e o pool de exit não-óbvio que aprendemos com Sigga são a base do playbook Avante.'
              : language === 'es'
                ? 'Software industrial para el mid-market brasileño. Amanda Pinheiro en el Consejo durante todo el ciclo de escala y exit. La tesis, la paciencia operativa y el pool de exit no-obvio que aprendimos con Sigga son la base del playbook Avante.'
                : "Industrial software for Brazilian mid-market operators. Amanda Pinheiro on the Board through the full scale-and-exit arc. The thesis, the operating patience, and the non-obvious exit pool we learned at Sigga are the foundation of the Avante playbook."}
          </p>
          <Link
            to={`/${language}/library/sigga-case-study-10x-exit`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--avt-font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 18px',
              border: '1px solid #98509A88',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#fff'
              e.currentTarget.style.background = 'rgba(152, 80, 154, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#98509A88'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {t('Read the case study', 'Leia o estudo de caso')}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .avt-sigga-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// Group section header — used to separate the venture grid into the new
// taxonomy buckets (Cohort 1, US Portco, Partner Co-founded, Alumni).
function GroupHeader({ label, accent, count }: { label: string; accent: string; count: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: `1px solid ${accent}33`,
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 12px ${accent}AA`,
          }}
        />
        <h3
          style={{
            fontFamily: 'var(--avt-font-display)',
            fontSize: 'clamp(22px, 2.2vw, 28px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {label}
        </h3>
      </div>
      <span
        style={{
          fontFamily: 'var(--avt-font-body)',
          fontSize: '11.5px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--avt-meta)',
        }}
      >
        {count.toString().padStart(2, '0')}
      </span>
    </div>
  )
}

// (3) Horizontal timeline — anchors the track record metrics in continuous
// chronology. Each milestone is a dot on a hairline gradient line, with
// year + label below. Reads as a decade of operating + investing history.
function PortfolioTimeline({ t }: { t: (en: string, pt: string) => string }) {
  const milestones: Array<{ year: string; label: string; accent: string }> = [
    { year: '2014', label: t('iFood (early ticket)', 'iFood (cheque inicial)'), accent: '#42468C' },
    { year: '2018', label: t('Accera · 4× MOI', 'Accera · 4× MOI'), accent: '#F18B46' },
    { year: '2022', label: t('Sigga · 10× exit', 'Sigga · exit 10×'), accent: '#98509A' },
    { year: '2024', label: t('Avante founded', 'Avante fundada'), accent: '#F9B437' },
    { year: '2026', label: t('Cohort 1 live', 'Cohort 1 ativa'), accent: '#ec5f72' },
  ]
  return (
    <div style={{ marginTop: '40px', marginBottom: '48px', position: 'relative', padding: '0 8px' }}>
      {/* Gradient hairline */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '14px',
          left: '8%',
          right: '8%',
          height: '1px',
          background:
            'linear-gradient(90deg, rgba(66,70,140,0.5) 0%, rgba(241,139,70,0.5) 25%, rgba(152,80,154,0.55) 50%, rgba(249,180,55,0.55) 75%, rgba(236,95,114,0.55) 100%)',
        }}
      />
      <div
        className="avt-timeline-row"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${milestones.length}, 1fr)`,
          gap: '8px',
          position: 'relative',
        }}
      >
        {milestones.map((m, i) => (
          <div
            key={m.year}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: m.accent,
                boxShadow: `0 0 12px ${m.accent}AA`,
                marginTop: '8px',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--avt-font-display)',
                fontSize: 'clamp(18px, 1.8vw, 22px)',
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              {m.year}
            </span>
            <span
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--avt-meta)',
                lineHeight: 1.4,
                maxWidth: '140px',
              }}
            >
              {m.label}
            </span>
            {/* Hide intermediate dots on small screens by collapsing to vertical list */}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) {
          .avt-timeline-row { grid-template-columns: 1fr 1fr 1fr !important; }
          .avt-timeline-row > div:nth-child(n+4) { display: none; }
        }
      `}</style>
    </div>
  )
}

