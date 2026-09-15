// /portfolio — full venture lineup, beyond the home hero strip.
//
// Purpose: a destination page anyone (LP, founder, partner) can land on and
// immediately understand the venture builder's track record + active cohort. Avoids
// the home-page constraint of "one editorial line" and shows actual breadth.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { InteriorHero, InteriorClosing } from '@/app/components/interiors/InteriorHero'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { VenturePipeline } from '@/app/components/VenturePipeline'
import { Reveal } from '@/app/components/Reveal'
import { Link } from 'react-router'
import { VENTURES as VENTURE_BRANDS } from '@/app/components/world/ventures'
import { VentureProductPreview } from '@/app/components/world/EditorialHome'
import { VentureCaseNotes } from '@/app/components/world/VentureCaseNotes'

type Translate = (en: string, pt: string, es: string) => string

// Ventures data — Round 9 restructure (full deck-aligned taxonomy).
//   'cohort1'           = selected Avante ventures (internal key retained)
//   'operating-network' = engineering partner, without implying Avante ownership
//   'discovery'         = discovery-phase venture being explored pre-Cohort
//   'partner-cofounded' = boutiques co-founded by an Avante partner
//   'us-building'       = ventures built by Jess + Andrea in the US (Mahway brand family)
//   'investing'         = pre-Avante investments by founding team (Innova era)
//   'us-alumni'         = US-built ventures by team members pre-Avante
// Each venture carries optional `tag`, `est`, `highlight` (e.g. MOI), and
// `backers` (text-based co-investor list) so the cards self-narrate.
interface Venture {
  name: string
  /** Render the first letter in the brand gradient (the αlphajuri nod). */
  gradFirst?: boolean
  description: { en: string; pt: string; es: string }
  status: 'cohort1' | 'operating-network' | 'discovery' | 'partner-cofounded' | 'us-building' | 'investing' | 'us-alumni'
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
    url: VENTURE_BRANDS.risk.url,
    description: {
      en: 'AI for insurance distribution, underwriting and claims, connected to the systems insurers already use.',
      pt: 'IA para distribuição, subscrição e sinistros, integrada aos sistemas que as seguradoras já utilizam.',
      es: 'IA para distribución, suscripción y siniestros, integrada con los sistemas que las aseguradoras ya utilizan.',
    },
    status: 'cohort1',
    accent: '#F9B437',
    tag: 'InsurTech',
    est: 'Est. 2025',
  },
  {
    name: 'AlphaJuri',
    url: VENTURE_BRANDS.legal.url,
    description: {
      en: 'Anticipation of precatórios, RPVs and court-awarded legal fees for creditors and lawyers in Brazil.',
      pt: 'Antecipação de precatórios, RPVs e honorários de sucumbência para credores e advogados no Brasil.',
      es: 'Anticipación de precatórios, RPVs y honorarios judiciales para acreedores y abogados en Brasil.',
    },
    status: 'cohort1',
    accent: '#F4A261',
    tag: 'LegalTech',
    est: 'Est. 2024',
  },
  {
    name: 'FutureProofing Brazil',
    description: {
      en: 'Engineering partner in Avante’s operating network. Connects companies with experienced AI engineers through Futureproofing.dev.',
      pt: 'Parceiro de engenharia na rede operacional da Avante. Conecta empresas a engenheiros experientes em IA por meio da Futureproofing.dev.',
      es: 'Socio de ingeniería en la red operativa de Avante. Conecta empresas con ingenieros experimentados en IA a través de Futureproofing.dev.',
    },
    status: 'operating-network',
    accent: '#ec5f72',
    tag: 'AI Engineering',
    est: 'Est. 2024',
  },
  // ─────────── DISCOVERY ───────────
  {
    name: 'BR Auction Intel',
    description: {
      en: 'Builds in real estate auctions: scraping, enriching, and scoring properties, where the dataset compounds as coverage grows.',
      pt: 'Constrói em leilões imobiliários: scrape, enriquecimento e scoring de imóveis, onde o conjunto de dados melhora conforme a cobertura cresce.',
      es: 'Inteligencia para subastas inmobiliarias en Brasil. Recopila, enriquece y evalúa información de propiedades.',
    },
    status: 'discovery',
    accent: '#B05B8D',
    tag: 'Real Estate Auctions',
  },
  // ─────────── PARTNER CO-FOUNDED ───────────
  {
    name: 'Bamboo DCM',
    description: {
      en: 'AI-native technology platform and financial company based in Brazil that specializes in originating, structuring, and distributing private credit. Co-founded by Felipe Moraes.',
      pt: 'Plataforma tecnológica e empresa financeira AI-native baseada no Brasil, especializada em originar, estruturar e distribuir crédito privado. Co-fundada por Felipe Moraes.',
      es: 'Plataforma tecnológica y empresa financiera AI-native en Brasil, especializada en originar, estructurar y distribuir crédito privado. Cofundada por Felipe Moraes.',
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
      es: 'Modelo fundacional de IA orientado al comportamiento, las preferencias, la biología y la ética humanas. Desarrollado por Jess Mah y Andrea Barrica dentro de Mahway.',
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
      es: 'Desarrolla empresas de biotecnología a partir de avances científicos mediante un modelo de holding. Forma parte de la actividad de Mahway en Estados Unidos.',
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
      en: 'Fintech platform that originates, bundles, and sells equity in litigation finance portfolios, opening access to a $16B+ asset class.',
      pt: 'Plataforma fintech que origina, agrega e vende equity em portfólios de litigation finance, abrindo acesso a uma classe de ativos de $16B+.',
      es: 'Plataforma financiera que origina y agrupa carteras de financiación de litigios y permite invertir en ellas.',
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
      es: 'Holding tecnológica brasileña de iFood, Wavy y Playkids. Innova invirtió por primera vez en Movile en 2014 y participó en rondas posteriores y operaciones secundarias. Forma parte de la experiencia de inversión del equipo anterior a Avante.',
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
      es: 'Software de gestión de activos y trabajo de campo integrado con SAP, para industrias como minería, papel y energía. Inversión de la etapa Innova, anterior a Avante.',
    },
    status: 'investing',
    accent: '#98509A',
    tag: 'Maintenance SaaS',
    est: 'Est. 2013',
    highlight: 'MOI 10×',
  },
  {
    name: 'Accera',
    description: {
      en: 'Platform for retailers and manufacturers, providing end-to-end advanced analytics and execution management.',
      pt: 'Plataforma para varejistas e fabricantes, oferecendo analytics avançado end-to-end e gestão de execução.',
      es: 'Plataforma para comercios y fabricantes que ofrece análisis de datos y gestión de la ejecución. Inversión de la etapa Innova, anterior a Avante.',
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
      en: 'Profitable company with 200+ clients in the USA, connecting finance teams with offshoring accounting solutions. Founded by Jess Mah pre-Avante; reference operator track record for the venture builder.',
      pt: 'Empresa rentável com mais de 200 clientes nos EUA, conectando times de finanças com soluções de contabilidade offshore. Fundada por Jess Mah pré-Avante; track record de referência operacional para o venture builder.',
      es: 'Empresa rentable con más de 200 clientes en Estados Unidos que conecta equipos financieros con servicios contables. Fundada por Jess Mah antes de Avante.',
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
      'Explore AlphaJuri and WIR, selected Avante ventures. Discover our operating network and the team’s separate company-building and prior investment experience.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Portfólio — Avante Ventures',
    description:
      'Conheça AlphaJuri e WIR, ventures selecionados da Avante, nossa rede operacional e a experiência própria do time em empresas e investimentos anteriores.',
    inLanguage: 'pt-BR',
  },
  es: {
    title: 'Portafolio — Avante Ventures',
    description:
      'Conoce AlphaJuri y WIR, empresas seleccionadas de Avante, nuestra red operativa y la experiencia independiente del equipo en empresas e inversiones anteriores.',
    inLanguage: 'es',
  },
} as const

export default function PortfolioPage() {
  const { language } = useLanguage()
  const t: Translate = (en, pt, es) => ({ en, pt, es })[language]
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
    <div className="avante-interior">
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/portfolio"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <main>
        <InteriorHero kind="ventures" eyebrow={t('Our ventures', 'Nossos ventures', 'Nuestros ventures')}
          title={<>{t('Conviction,', 'Convicção,', 'Convicción,')}<br />{t('made tangible.', 'em construção.', 'hecha realidad.')}</>}
          description={t('Explore AlphaJuri and WIR. Real problems, companies built around them, and the work behind each one.', 'Conheça AlphaJuri e WIR. Problemas reais, empresas criadas para resolvê-los e o trabalho por trás de cada uma.', 'Conoce AlphaJuri y WIR. Problemas reales, empresas creadas para resolverlos y el trabajo detrás de cada una.')} />
        <div className="interior-content" id="page-content">
        <div className="portfolio-exhibits">
          {(['legal', 'risk'] as const).map(kind => (
            <details open key={kind} id={kind === 'legal' ? 'venture-alphajuri' : 'venture-wir'} className="portfolio-exhibit-detail">
              <summary>
                <span>{kind === 'legal' ? 'AlphaJuri' : 'WIR'}</span>
                <span>{language === 'pt' ? 'Conheça a empresa' : language === 'es' ? 'Conoce la empresa' : 'Discover the company'} ↗</span>
              </summary>
              <VentureProductPreview kind={kind} />
              <VentureCaseNotes kind={kind} language={language} />
            </details>
          ))}
        </div>

        {/* (1) BY THE NUMBERS — panoramic strip right after the masthead.
            Anchors the visitor with operating scale before they scroll into
            individual cards. Hairline border + mono-style proportional caps
            so it reads as a "headline summary," not chrome. */}
        <PortfolioSummaryStrip t={t} />

        {/* Prior Innova investment experience, explicitly separate from Avante ventures. */}
        <SiggaAnchorCard language={language} t={t} />

        {/* (3) GROUPED VENTURE SECTIONS — replaces the 5-dot legend +
            single grid with explicit subheaders. Reads as "structured
            portfolio" instead of "filterable list." Each group has its own
            mini-masthead so the eye understands the taxonomy. */}
        {(
          [
            { status: 'cohort1', label: t('Selected Avante ventures', 'Ventures selecionados da Avante', 'Empresas seleccionadas de Avante'), accent: '#98509A' },
            { status: 'operating-network', label: t('Operating network', 'Rede operacional', 'Red operativa'), accent: '#ec5f72' },
            { status: 'discovery', label: t('Discovery', 'Em exploração', 'En exploración'), accent: '#B05B8D' },
            { status: 'partner-cofounded', label: t('Companies co-founded by partners', 'Empresas cofundadas pelos sócios', 'Empresas cofundadas por socios'), accent: '#F4A261' },
            { status: 'us-building', label: t('Partners’ US company-building experience', 'Experiência dos sócios em empresas nos EUA', 'Experiencia de los socios creando empresas en EE. UU.'), accent: '#a8429b' },
            { status: 'investing', label: t('Prior investments at Innova', 'Investimentos anteriores na Innova', 'Inversiones anteriores en Innova'), accent: '#ec5f72' },
            { status: 'us-alumni', label: t('Companies founded before Avante', 'Empresas fundadas antes da Avante', 'Empresas fundadas antes de Avante'), accent: '#7B68EE' },
          ] as const
        ).map((group, gi) => {
          const ventures = VENTURES.filter((v) => v.status === group.status)
          if (ventures.length === 0) return null
          return (
            <Reveal key={group.status} delay={gi * 60} style={{ display: 'block', marginTop: gi === 0 ? '64px' : '56px' }}>
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
                    body={v.description[language]}
                    language={language}
                  />
                ))}
              </div>
            </Reveal>
          )
        })}

        {/* Bottom note */}
        <div
          style={{
            marginTop: '64px',
            padding: '32px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '2px',
          }}
        >
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.75)',
              margin: 0,
            }}
          >
            {t(
              'The venture builder’s operating model is built around 3-4 ventures per year. The selections above describe different relationships: Avante ventures, engineering partners, independently built companies and prior investments. Partner experience is attributed to the person and firm involved.',
              'O modelo operacional do venture builder prevê 3-4 ventures por ano. A seleção acima distingue ventures da Avante, parceiros de engenharia, empresas independentes e investimentos anteriores. A experiência dos sócios é atribuída à pessoa e à firma envolvidas.',
              'El modelo operativo del venture builder contempla 3-4 empresas por año. La selección anterior distingue empresas de Avante, socios de ingeniería, empresas independientes e inversiones anteriores. La experiencia de los socios se atribuye a la persona y a la firma involucradas.'
            )}
          </p>
        </div>

        {/* Research areas carry no inferred launch dates or progress metrics. */}
        <section style={{ marginTop: '96px' }}>
          <SectionMasthead
            centered
            compact
            eyebrow={t('Discovery', 'Em exploração', 'En exploración')}
            title={t(
              'Questions worth building around.',
              'Perguntas que merecem uma empresa.',
              'Preguntas que merecen una empresa.'
            )}
            description={t(
              'Discovery starts with a market, a workflow and a question. These areas describe the work we investigate before defining a new company.',
              'A exploração começa por um mercado, um fluxo de trabalho e uma pergunta. Estas áreas descrevem o que investigamos antes de definir uma nova empresa.',
              'La exploración empieza por un mercado, un flujo de trabajo y una pregunta. Estas áreas describen lo que investigamos antes de definir una nueva empresa.'
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
              'Research themes describe areas of inquiry. Company formation and launch dates are announced only when confirmed.',
              'Temas de pesquisa descrevem áreas de investigação. A formação de empresas e as datas de lançamento são anunciadas quando confirmadas.',
              'Los temas de investigación describen áreas de estudio. La creación de empresas y las fechas de lanzamiento se anuncian cuando están confirmadas.'
            )}
          </p>
        </section>

        {/* CTA back to home library — editorial text link, not a hard button
            (matches the homepage VerticalsScene "→" link language) */}
        <div style={{ textAlign: 'center', marginTop: '96px' }}>
          <Link
            to={`/${language}/library/sigga-case-study-10x-exit`}
            style={{
              fontFamily: 'var(--avt-font-body)',
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: 'var(--avt-txt)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--avt-hair-2)',
              paddingBottom: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {t('Read the Sigga case study', 'Leia o estudo de caso da Sigga', 'Lee el caso de Sigga')}
            <span className="avt-grad" aria-hidden style={{ fontWeight: 600 }}>→</span>
          </Link>
        </div>
      </div>

      <InteriorClosing />
      </main>
      <Footer />
    </div>
  )
}

// Round 9 — richer card that renders the deck-aligned data: tag chip,
// est year, body, optional backers strip, optional highlight metric.
// Replaces the generic EditorialCard for the portfolio grid because we
// now have multi-field data per venture.
function VentureCard({ venture, body, language }: { venture: Venture; body: string; language: 'en' | 'pt' | 'es' }) {
  const t: Translate = (en, pt, es) => ({ en, pt, es })[language]
  const tags: Record<string, [string, string, string]> = {
    'AI Engineering': ['AI engineering', 'Engenharia de IA', 'Ingeniería de IA'],
    'Real Estate Auctions': ['Real estate auctions', 'Leilões imobiliários', 'Subastas inmobiliarias'],
    'Tech Holding': ['Technology holding', 'Holding de tecnologia', 'Holding de tecnología'],
    'Maintenance SaaS': ['Maintenance software', 'Software de manutenção', 'Software de mantenimiento'],
    'Retail Tech': ['Retail technology', 'Tecnologia para varejo', 'Tecnología para comercios'],
    Finance: ['Finance', 'Finanças', 'Finanzas'],
  }
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
              {tags[venture.tag] ? t(...tags[venture.tag]) : venture.tag}
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
            {venture.highlight.replace('Exit', t('Exit', 'Saída', 'Salida'))}
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
          {venture.gradFirst ? (
            <>
              <span className="avt-grad" style={{ fontWeight: 500 }}>{venture.name.charAt(0)}</span>
              {venture.name.slice(1)}
            </>
          ) : (
            venture.name
          )}
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
            {venture.altBrand === 'by Mahway' ? t('by Mahway', 'da Mahway', 'de Mahway') : venture.altBrand}
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

      {venture.url && <a href={venture.url} target="_blank" rel="noopener noreferrer" aria-label={`${t('Visit website', 'Visite o site', 'Visita el sitio')}: ${venture.name}`} style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', minHeight: 44, gap: 16, color: '#eef0f7', borderBottom: '1px solid #b8bfd755', fontSize: 13 }}>
        {new URL(venture.url).hostname.replace(/^www\./, '')}<span aria-hidden="true">↗</span>
      </a>}

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
            {t('Backed by', 'Apoiada por', 'Respaldada por')}:&nbsp;
          </span>
          <span style={{ color: 'var(--avt-muted)', textTransform: 'none', letterSpacing: '0.02em', fontWeight: 500 }}>
            {venture.backers}
          </span>
        </div>
      )}
    </div>
  )
}



// (2) Summary strip — Round 9 update with deck-aligned framing.
function PortfolioSummaryStrip({ t }: { t: Translate }) {
  const items: Array<{ value: string; label: string }> = [
    { value: t('Brazil', 'Brasil', 'Brasil'), label: t('Venture builder roots', 'Raízes do venture builder', 'Origen del venture builder') },
    { value: String(VENTURES.filter(v => v.status === 'cohort1').length), label: t('Selected Avante ventures', 'Ventures selecionados da Avante', 'Empresas seleccionadas de Avante') },
    { value: 'Innova', label: t('Team’s prior investment experience', 'Experiência anterior do time em investimentos', 'Experiencia previa del equipo en inversiones') },
    { value: 'USD 500M+', label: t('Under management in Amanda Pinheiro’s prior roles at Innova and Unbox', 'Sob gestão na trajetória de Amanda Pinheiro na Innova e Unbox', 'Bajo gestión en la trayectoria de Amanda Pinheiro en Innova y Unbox') },
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
  t: Translate
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
        borderRadius: '2px',
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
            {t('Prior investment · Innova', 'Investimento anterior · Innova', 'Inversión anterior · Innova')}
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
              ? 'Software industrial para empresas brasileiras. A Sigga faz parte da experiência anterior de investimento do time na Innova, antes da Avante. Esse trabalho em investimento e governança informa como construímos hoje.'
              : language === 'es'
                ? 'Software industrial para empresas brasileñas. Sigga forma parte de la experiencia de inversión del equipo en Innova, anterior a Avante. Ese trabajo en inversión y gobierno corporativo informa cómo construimos hoy.'
                : 'Industrial software for Brazilian companies. Sigga belongs to the team’s prior investment experience at Innova, before Avante. That work in investment and governance informs how we build today.'}
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
            {t('Read the case study', 'Leia o estudo de caso', 'Lee el caso')}
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
function PortfolioTimeline({ t }: { t: Translate }) {
  const milestones: Array<{ year: string; label: string; accent: string }> = [
    { year: '2014', label: t('iFood (early investment)', 'iFood (investimento inicial)', 'iFood (inversión inicial)'), accent: '#42468C' },
    { year: '2018', label: t('Accera · 4× MOI', 'Accera · 4× MOI', 'Accera · 4× MOI'), accent: '#F18B46' },
    { year: '2022', label: t('Sigga · 10× exit', 'Sigga · saída 10×', 'Sigga · salida 10×'), accent: '#98509A' },
    { year: '2024', label: t('Avante founded', 'Avante fundada', 'Fundación de Avante'), accent: '#F9B437' },
    { year: '2026', label: t('Selected Avante ventures', 'Ventures selecionados do venture builder', 'Empresas seleccionadas del venture builder'), accent: '#ec5f72' },
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
                width: '2px',
                height: '12px',
                borderRadius: 0,
                background: m.accent,

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
