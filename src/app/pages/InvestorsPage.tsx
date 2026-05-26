// /investors — LP-facing page. Goal: institutional / family-office reader
// gets a clear read on the thesis, the team's track record, the investment
// structure at a high level, and what we will (and won't) commit to in a
// first conversation.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { EditorialCard } from '@/app/components/EditorialCard'
import { InvestorEcosystem } from '@/app/components/InvestorEcosystem'
import { Link } from 'react-router'
import { useState } from 'react'
import { ContactModal } from '@/app/components/ContactModal'

const SEO = {
  en: {
    title: 'For Investors / LPs — Avante Ventures',
    description:
      'Strategic exposure to AI-native Brazil through a venture studio with a 10× exit on its track record. Investment structure, thesis, and what we will and will not do in a first conversation.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Para Investidores / LPs — Avante Ventures',
    description:
      'Exposição estratégica ao Brasil AI-native através de um venture studio com exit de 10× no track record. Estrutura de investimento, tese, e o que faremos e não faremos em uma primeira conversa.',
    inLanguage: 'pt-BR',
  },
  es: {
    title: 'Para Inversores / LPs — Avante Ventures',
    description:
      'Exposición estratégica al Brasil AI-native a través de un venture studio con exit de 10× en su track record. Estructura de inversión, tesis, y lo que haremos y no haremos en una primera conversación.',
    inLanguage: 'es',
  },
} as const

// FAQ schema feeds LLM retrieval (Perplexity / ChatGPT / Claude). Every
// Q&A here is anchored to a number or claim that appears visibly on this
// page (stats row, thesis cards, structure list, transparency block).
const FAQ_COPY = {
  en: [
    {
      q: "What is Avante's investment thesis?",
      a: "Avante invests in AI-native ventures in Brazil's services economy. Brazil's $2.5T GDP is 70% services with ~90% of SMBs under-digitalized, and AI infrastructure is now cheap enough that a 4-person team can ship a vertical product at 2018 SaaS operating costs. The studio model captures this arbitrage across 3–4 ventures per year.",
    },
    {
      q: "What returns does Avante target for LPs?",
      a: "The reference benchmark is the GSSN industry data: venture studios generate ~50% annualized IRR over 10-year vintages versus ~19% for traditional VC. Avante targets the structural advantage that drives this gap — operating depth at week one, capital efficiency by design, and no losing competitive deal sourcing.",
    },
    {
      q: "What is the typical Avante investment structure for LPs?",
      a: "LPs gain exposure across the full annual cohort of 3–4 ventures co-founded by Avante — not single-deal selection risk. Operating partners hold studio economics; LPs hold capital economics. Reporting is quarterly with cohort-level NAV transparency. Specific terms (target fund size, GP commitment, fee model, distribution waterfall) are shared in a structured LP conversation.",
    },
    {
      q: "What is Avante's track record?",
      a: "The founding team has historically deployed $500M+ in venture and growth capital. The most recent realized outcome is Sigga Technologies — a 10× exit in industrial software, with Avante operators involved through fundraising, GTM, and exit prep. Active studio cohort includes Mahway, WIR, and Bamboo DCM.",
    },
    {
      q: "What will Avante NOT do as a venture studio?",
      a: "Avante will not share LP names or identities (confidential by default), will not provide financial advice or tax structuring (LPs engage their own counsel), will not run a parallel co-investment vehicle without explicit governance, and will not launch ventures whose primary buyer is the LP base — customer markets are independent of capital markets.",
    },
  ],
  pt: [
    {
      q: "Qual é a tese de investimento da Avante?",
      a: "A Avante investe em ventures AI-native na economia de serviços do Brasil. O PIB brasileiro de US$ 2,5 tri é 70% serviços com ~90% das PMEs sub-digitalizadas, e a infraestrutura de IA está barata o suficiente para um time de 4 pessoas lançar um produto vertical com o custo operacional de uma SaaS de 2018. O modelo de studio captura essa arbitragem em 3–4 ventures por ano.",
    },
    {
      q: "Quais retornos a Avante busca para LPs?",
      a: "O benchmark de referência são os dados da indústria GSSN: venture studios geram ~50% de IRR anualizado em vintages de 10 anos versus ~19% de VC tradicional. A Avante busca a vantagem estrutural que gera esse gap — profundidade operacional desde a semana um, eficiência de capital por design e ausência de sourcing competitivo perdido.",
    },
    {
      q: "Qual é a estrutura típica de investimento da Avante para LPs?",
      a: "LPs ganham exposição em toda a cohort anual de 3–4 ventures co-fundadas pela Avante — não risco de seleção de deal único. Operating partners ficam com a economics do studio; LPs ficam com a economics de capital. Reporting trimestral com transparência de NAV no nível de cohort. Termos específicos (target de fund size, GP commitment, modelo de fees, distribution waterfall) são compartilhados em uma conversa estruturada de LP.",
    },
    {
      q: "Qual é o track record da Avante?",
      a: "O time fundador deployou historicamente mais de US$ 500M em capital de venture e growth. O resultado realizado mais recente é Sigga Technologies — um exit de 10× em software industrial, com operadores Avante envolvidos em fundraising, GTM e prep de exit. A cohort ativa do studio inclui Mahway, WIR e Bamboo DCM.",
    },
    {
      q: "O que a Avante NÃO faz como venture studio?",
      a: "A Avante não compartilha nomes de LPs ou identidades (confidencial por padrão), não dá conselho financeiro ou estruturação tributária (LPs contratam seus próprios advisors), não roda veículo paralelo de co-investment sem governança explícita, e não lança ventures cujo comprador principal é a base de LPs — mercados de cliente são independentes do mercado de capital.",
    },
  ],
  es: [
    {
      q: "¿Cuál es la tesis de inversión de Avante?",
      a: "Avante invierte en ventures AI-native en la economía de servicios de Brasil. El PIB brasileño de US$ 2,5 billones es 70% servicios con ~90% de las PYMEs subdigitalizadas, y la infraestructura de IA está barata lo suficiente para que un equipo de 4 personas lance un producto vertical con el costo operativo de una SaaS de 2018. El modelo de studio captura este arbitraje en 3–4 ventures por año.",
    },
    {
      q: "¿Qué retornos busca Avante para los LPs?",
      a: "El benchmark de referencia son los datos de la industria GSSN: los venture studios generan ~50% de IRR anualizado en vintages de 10 años versus ~19% del VC tradicional. Avante busca la ventaja estructural que genera ese gap — profundidad operativa desde la semana uno, eficiencia de capital por diseño y ausencia de sourcing competitivo perdido.",
    },
    {
      q: "¿Cuál es la estructura típica de inversión de Avante para LPs?",
      a: "Los LPs obtienen exposición en toda la cohort anual de 3–4 ventures co-fundadas por Avante — no riesgo de selección de deal único. Los operating partners tienen la economics del studio; los LPs tienen la economics de capital. Reporting trimestral con transparencia de NAV a nivel de cohort. Términos específicos (target de fund size, GP commitment, modelo de fees, distribution waterfall) se comparten en una conversación estructurada de LP.",
    },
    {
      q: "¿Cuál es el track record de Avante?",
      a: "El equipo fundador ha desplegado históricamente más de US$ 500M en capital de venture y growth. El resultado realizado más reciente es Sigga Technologies — un exit de 10× en software industrial, con operadores de Avante involucrados en fundraising, GTM y preparación de exit. La cohort activa del studio incluye Mahway, WIR y Bamboo DCM.",
    },
    {
      q: "¿Qué NO hace Avante como venture studio?",
      a: "Avante no comparte nombres de LPs ni identidades (confidencial por defecto), no da consejo financiero ni estructuración tributaria (los LPs contratan sus propios advisors), no opera un vehículo paralelo de co-investment sin gobernanza explícita, y no lanza ventures cuyo comprador principal sea la base de LPs — los mercados de cliente son independientes del mercado de capital.",
    },
  ],
} as const

export default function InvestorsPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language] ?? SEO.en
  const faqEntries = FAQ_COPY[language] ?? FAQ_COPY.en
  const [isContactOpen, setIsContactOpen] = useState(false)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `https://avanteventures.com/${language}/investors#page`,
        name: copy.title,
        description: copy.description,
        url: `https://avanteventures.com/${language}/investors`,
        inLanguage: copy.inLanguage,
        isPartOf: { '@id': 'https://avanteventures.com/#website' },
        audience: { '@type': 'Audience', audienceType: 'Investors' },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://avanteventures.com/${language}/investors#faq`,
        inLanguage: copy.inLanguage,
        mainEntity: faqEntries.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  const stats = [
    {
      value: '~50%',
      label: t('Studio IRR (GSSN, 10-yr)', 'IRR de studios (GSSN, 10 anos)'),
      color: '#F9B437',
      fn: '6',
    },
    {
      value: '~19%',
      label: t('Traditional VC IRR', 'IRR de VC tradicional'),
      color: 'rgba(255, 255, 255, 0.45)',
      fn: '6',
    },
    {
      value: '10×',
      label: t('Sigga exit (Avante team)', 'Exit Sigga (time Avante)'),
      color: '#98509A',
      fn: '',
    },
    {
      value: '$500M+',
      label: t('Deployed by founding team historically', 'Deployado pelo time fundador historicamente'),
      color: '#F4A261',
      fn: '',
    },
  ]

  const thesis = [
    {
      title: t('Brazil is the largest under-served services economy on earth.', 'O Brasil é a maior economia de serviços subatendida do mundo.'),
      body: t(
        '$2.5T GDP, 70% services, ~90% of SMBs under-digitalized. The structural gap between volume and software penetration is unique among large markets globally.',
        'PIB de US$ 2,5 tri, 70% serviços, ~90% das PMEs sub-digitalizadas. O gap estrutural entre volume e penetração de software é único entre grandes mercados no mundo.'
      ),
      accent: '#F9B437',
    },
    {
      title: t('AI infrastructure is now cheap enough to deploy without a Series A.', 'Infraestrutura de IA é barata o suficiente para deployar sem uma Série A.'),
      body: t(
        'In 2026, a 4-person Brazilian team can ship an AI-native vertical product with the operating cost of a 2018 SaaS startup. The studio model captures that arbitrage with discipline.',
        'Em 2026, um time brasileiro de 4 pessoas consegue lançar um produto vertical AI-native com o custo operacional de uma SaaS de 2018. O modelo de studio captura essa arbitragem com disciplina.'
      ),
      accent: '#F4A261',
    },
    {
      title: t('The studio model historically outperforms VC by ~2.5×.', 'O modelo de studio historicamente supera VC por ~2.5×.'),
      body: t(
        'Operating depth at week one. Capital efficiency by design. Time spent on chosen ventures, not on losing competitive deal sourcing. Each compounds with every cohort.',
        'Profundidade operacional desde a semana um. Eficiência de capital por design. Tempo dedicado às ventures escolhidas, não a sourcing competitivo perdido. Cada elemento compõe a cada cohort.'
      ),
      accent: '#98509A',
    },
  ]

  const structureItems = [
    t(
      'Studio writes first-money-in across 3–4 ventures per year.',
      'Studio escreve primeiro cheque em 3–4 ventures por ano.'
    ),
    t(
      'LPs gain exposure across the full cohort — not single-deal selection risk.',
      'LPs ganham exposição em toda a cohort — não risco de seleção de deal único.'
    ),
    t(
      'Operating partners hold studio economics; LPs hold capital economics. Aligned incentives, separated workload.',
      'Operating partners ficam com a economics do studio; LPs ficam com a economics de capital. Incentivos alinhados, cargas de trabalho separadas.'
    ),
    t(
      'Reporting on a quarterly cadence with cohort-level NAV transparency and per-venture milestone notes.',
      'Reporting trimestral com transparência de NAV no nível de cohort e notas de milestones por venture.'
    ),
    t(
      'Specific terms (target fund size, GP commitment, fee model, distribution waterfall) are shared in a structured LP conversation, not on a public page.',
      'Termos específicos (target de fund size, GP commitment, modelo de fees, distribution waterfall) são compartilhados em uma conversa estruturada de LP, não em uma página pública.'
    ),
  ]

  const willNotDo = [
    t('We will not share LP names or other LP identities. Each LP relationship is confidential by default.', 'Não compartilhamos nomes de LPs ou outras identidades de LPs. Cada relação de LP é confidencial por padrão.'),
    t('We will not provide financial advice, allocation guidance, or tax structuring. LPs engage their own counsel.', 'Não damos conselho financeiro, orientação de alocação ou estruturação tributária. LPs contratam seus próprios advisors.'),
    t('We will not run a parallel co-investment vehicle without explicit governance for it. The studio is the studio.', 'Não rodamos veículo paralelo de co-investment sem governança explícita. Studio é studio.'),
    t('We will not launch ventures whose primary buyer is "the LP base." Customer markets are independent of capital markets.', 'Não lançamos ventures cujo comprador principal é "a base de LPs". Mercados de cliente são independentes do mercado de capital.'),
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--avante-background)' }}>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/investors"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <div
        style={{
          maxWidth: '1100px',
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
          }}
        >
          ← {t('Back to home', 'Voltar ao início')}
        </Link>

        <SectionMasthead
          eyebrow={t('For LPs', 'Para LPs')}
          title={t(
            'Strategic exposure to AI-native Brazil — through a studio with a 10× exit already in the ground.',
            'Exposição estratégica ao Brasil AI-native — através de um studio com um exit de 10× já no chão.'
          )}
          description={t(
            'This page is the public version of how we describe ourselves to LPs. The private version goes deeper on terms, vintage, and pacing — but the thesis, the structure, and the discipline are the same in both.',
            'Esta página é a versão pública de como nos descrevemos para LPs. A versão privada vai mais fundo em termos, vintage e pacing — mas a tese, estrutura e disciplina são as mesmas em ambas.'
          )}
        />

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            margin: '40px 0 64px',
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                padding: '24px 20px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(36px, 5vw, 48px)',
                  fontWeight: 600,
                  color: s.color,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  marginBottom: '8px',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.value}
                {s.fn && (
                  <a
                    href={`/${language}#source-${s.fn}`}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.4)',
                      textDecoration: 'none',
                      marginLeft: '2px',
                      verticalAlign: 'super',
                    }}
                  >
                    {s.fn}
                  </a>
                )}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Thesis */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('The thesis', 'A tese')}
            title={t(
              'Three structural conditions that compound into LP-grade returns.',
              'Três condições estruturais que compõem em retornos de LP-grade.'
            )}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {thesis.map((p, i) => (
              <EditorialCard
                key={p.title}
                eyebrow={String(i + 1).padStart(2, '0')}
                title={p.title}
                body={p.body}
                accent={p.accent}
                accentPosition="border-left"
                style={{ padding: '28px' }}
              />
            ))}
          </div>
        </section>

        {/* Structure */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('Structure', 'Estrutura')}
            title={t(
              'How the studio is set up — at a public level.',
              'Como o studio é estruturado — em nível público.'
            )}
            description={t(
              'Specific commercial terms are shared in a private LP conversation. The architecture below is what every conversation starts from.',
              'Termos comerciais específicos são compartilhados em conversa privada de LP. A arquitetura abaixo é onde cada conversa começa.'
            )}
          />
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: '12px' }}>
            {structureItems.map((line, i) => (
              <li
                key={i}
                style={{
                  padding: '20px 24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#F9B437',
                    fontFamily: 'monospace',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.65, color: 'rgba(255, 255, 255, 0.8)' }}>
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* What we will not do — transparency block */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('What we will not do', 'O que não faremos')}
            title={t(
              'Discipline matters more than the pitch. Here is what is off the table.',
              'Disciplina importa mais que o pitch. Eis o que está fora da mesa.'
            )}
          />
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'grid', gap: '12px' }}>
            {willNotDo.map((line, i) => (
              <li
                key={i}
                style={{
                  padding: '20px 24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderLeft: '3px solid rgba(241, 139, 70, 0.5)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: 'rgba(255, 255, 255, 0.78)',
                }}
              >
                <strong style={{ color: 'rgba(241, 139, 70, 1)', fontWeight: 600 }}>×</strong>{' '}
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* INVESTOR PERKS — relocated from home (InvestorEcosystem). The
            "Investor Mega Perks" bento (Quarterly AI training, FutureProofing
            priority, Mahway agents, On-demand AI consulting) is LP-side
            value-add and belongs on the investor-facing page, not on home. */}
        <section style={{ margin: '64px 0' }}>
          <InvestorEcosystem onOpenContact={() => setIsContactOpen(true)} />
        </section>

        {/* CTA */}
        <section
          style={{
            margin: '80px 0 0',
            padding: 'clamp(48px, 8vw, 72px)',
            background:
              'linear-gradient(135deg, rgba(98, 80, 154, 0.08) 0%, rgba(66, 70, 140, 0.06) 100%)',
            border: '1px solid rgba(152, 80, 154, 0.18)',
            borderRadius: '20px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {t('Schedule an LP conversation.', 'Agendar uma conversa de LP.')}
          </h2>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '620px',
              margin: '0 auto 32px',
            }}
          >
            {t(
              "First call is 45 minutes: thesis walkthrough, team's prior track record in detail, the LP terms document, your questions. We do not run roadshow calls — every conversation is structured and documented.",
              'A primeira ligação tem 45 minutos: walkthrough da tese, track record anterior do time em detalhe, o documento de termos de LP, suas perguntas. Não rodamos calls de roadshow — cada conversa é estruturada e documentada.'
            )}
          </p>
          <Link
            to={`/${language}#contact`}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {t('Request an LP conversation', 'Solicitar conversa de LP')}
          </Link>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <Footer />
    </div>
  )
}
