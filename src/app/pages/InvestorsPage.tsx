// /investors — LP-facing page. Goal: institutional / family-office reader
// gets a clear read on the thesis, the team's track record, the investment
// structure at a high level, and what we will (and won't) commit to in a
// first conversation.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { InteriorHero } from '@/app/components/interiors/InteriorHero'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { EditorialCard } from '@/app/components/EditorialCard'
import { InvestorEcosystem } from '@/app/components/InvestorEcosystem'
import { Link } from 'react-router'

const SEO = {
  en: {
    title: 'For Investors / LPs | Avante Ventures',
    description:
      'A venture builder building AI-native companies in Brazil. Explore the investment thesis, current ventures, and the team’s prior experience, including Amanda Pinheiro’s $500M+ under management at Innova and Unbox.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Para Investidores / LPs | Avante Ventures',
    description:
      'Um venture builder que constrói empresas AI-native no Brasil. Conheça a tese, as ventures atuais e a experiência anterior do time, incluindo US$500M+ sob gestão na trajetória de Amanda Pinheiro na Innova e Unbox.',
    inLanguage: 'pt-BR',
  },
  es: {
    title: 'Para Inversores / LPs | Avante Ventures',
    description:
      'Un venture builder que construye empresas AI-native en Brasil. Conoce la tesis, las ventures actuales y la experiencia previa del equipo, incluidos US$500M+ bajo gestión en la trayectoria de Amanda Pinheiro en Innova y Unbox.',
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
      a: "Avante Ventures is a venture builder building AI-native companies in Brazil and Latin America. Services account for roughly 70% of Brazilian GDP, per IBGE. The venture builder focuses on complex workflows with limited software adoption and provides first capital across 3-4 ventures per year.",
    },
    {
      q: "Which industry benchmarks inform Avante's thesis?",
      a: "GSSN reports studio IRR of ~50% versus ~19% for traditional VC, roughly 2.5x. These are industry-model benchmarks, not Avante's realized returns or a return target. Avante's thesis emphasizes operating experience, shared capabilities and capital efficiency.",
    },
    {
      q: "What is the typical Avante investment structure for LPs?",
      a: "LPs gain exposure across the annual cohort of 3-4 ventures co-founded by Avante. Operating partners participate in venture builder economics. LPs participate through their capital commitments. Quarterly reporting includes cohort-level net asset value and venture milestones. Specific terms, including target fund size, GP commitment, fees and distribution waterfall, are shared in a private LP conversation.",
    },
    {
      q: "What is Avante's track record?",
      a: "Amanda Pinheiro's historical experience includes $500M+ under management as CFO at Innova Capital and Unbox Capital. Sigga’s 10× exit belongs to the team’s prior investment experience at Innova. Selected current Avante ventures include AlphaJuri and WIR. Bamboo DCM was co-founded by Felipe Moraes. Mahway belongs to team members' separate US company-building experience.",
    },
    {
      q: "What will Avante NOT do as a venture builder?",
      a: "Avante will not share LP names or identities (confidential by default), will not provide financial advice or tax structuring (LPs engage their own counsel), will not run a parallel co-investment vehicle without explicit governance, and will not launch ventures whose primary buyer is the LP base. Customer markets are independent of capital markets.",
    },
  ],
  pt: [
    {
      q: "Qual é a tese de investimento da Avante?",
      a: "A Avante Ventures é um venture builder que constrói empresas AI-native no Brasil e na América Latina. Os serviços representam cerca de 70% do PIB brasileiro, segundo o IBGE. O venture builder se concentra em fluxos de trabalho complexos com adoção limitada de software e aporta o primeiro capital em 3-4 ventures por ano.",
    },
    {
      q: "Quais benchmarks do setor informam a tese da Avante?",
      a: "O GSSN reporta IRR de studios de ~50% versus ~19% para VC tradicional, cerca de 2,5x. São benchmarks do modelo, não retornos realizados da Avante nem uma meta de retorno. A tese da Avante enfatiza experiência operacional, capacidades compartilhadas e eficiência de capital.",
    },
    {
      q: "Qual é a estrutura típica de investimento da Avante para LPs?",
      a: "Os LPs têm exposição à cohort anual de 3-4 ventures cofundadas pela Avante. Os sócios operacionais participam dos resultados econômicos do venture builder. Os LPs participam por meio de seus compromissos de capital. Os relatórios trimestrais incluem o valor patrimonial líquido da cohort e os marcos de cada venture. Termos específicos, incluindo tamanho-alvo do fundo, compromisso do GP, taxas e ordem de distribuição, são compartilhados em uma conversa privada com LPs.",
    },
    {
      q: "Qual é o track record da Avante?",
      a: "A experiência anterior de Amanda Pinheiro inclui US$500M+ sob gestão como CFO na Innova Capital e Unbox Capital. O exit de 10× da Sigga faz parte da experiência anterior do time em investimentos na Innova. Entre as ventures atuais da Avante estão AlphaJuri e WIR. A Bamboo DCM foi cofundada por Felipe Moraes. A Mahway faz parte da experiência dos membros do time na construção de empresas nos EUA, em uma operação separada.",
    },
    {
      q: "O que a Avante NÃO faz como venture builder?",
      a: "A Avante não compartilha nomes nem identidades de LPs. Não presta aconselhamento financeiro ou estruturação tributária. Os LPs contratam seus próprios assessores. Não opera um veículo paralelo de coinvestimento sem governança explícita e não lança ventures cujo principal comprador seja a base de LPs. Os mercados de clientes são independentes dos mercados de capital.",
    },
  ],
  es: [
    {
      q: "¿Cuál es la tesis de inversión de Avante?",
      a: "Avante Ventures es un venture builder que construye empresas AI-native en Brasil y América Latina. Los servicios representan cerca del 70% del PIB brasileño, según el IBGE. El venture builder se concentra en procesos complejos con adopción limitada de software y aporta el primer capital a 3-4 ventures al año.",
    },
    {
      q: "¿Qué benchmarks del sector informan la tesis de Avante?",
      a: "GSSN reporta un IRR de studios de ~50% frente a ~19% del VC tradicional, aproximadamente 2,5x. Son benchmarks del modelo, no retornos realizados de Avante ni una meta de retorno. La tesis de Avante enfatiza la experiencia operativa, las capacidades compartidas y la eficiencia de capital.",
    },
    {
      q: "¿Cuál es la estructura típica de inversión de Avante para LPs?",
      a: "Los LPs obtienen exposición a la cohorte anual de 3-4 ventures cofundadas por Avante. Los socios operativos participan en los resultados económicos del venture builder. Los LPs participan mediante sus compromisos de capital. Los informes trimestrales incluyen el valor patrimonial neto de la cohorte y los hitos de cada venture. Los términos específicos, incluidos el tamaño objetivo del fondo, el compromiso del GP, las comisiones y el orden de distribución, se comparten en una conversación privada con LPs.",
    },
    {
      q: "¿Cuál es el track record de Avante?",
      a: "La experiencia previa de Amanda Pinheiro incluye US$500M+ bajo gestión como CFO en Innova Capital y Unbox Capital. El exit de 10× de Sigga corresponde a la experiencia previa del equipo en inversiones en Innova. Entre las ventures actuales de Avante están AlphaJuri y WIR. Bamboo DCM fue cofundada por Felipe Moraes. Mahway forma parte de la experiencia de los miembros del equipo en la creación de empresas en Estados Unidos, en una operación separada.",
    },
    {
      q: "¿Qué NO hace Avante como venture builder?",
      a: "Avante no comparte nombres ni identidades de LPs. No ofrece asesoramiento financiero ni estructuración fiscal. Los LPs contratan a sus propios asesores. No opera un vehículo paralelo de coinversión sin una gobernanza explícita ni lanza ventures cuyo comprador principal sea la base de LPs. Los mercados de clientes son independientes de los mercados de capital.",
    },
  ],
} as const

export default function InvestorsPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string, es: string) => (language === 'pt' ? pt : language === 'es' ? es : en)
  const copy = SEO[language] ?? SEO.en
  const faqEntries = FAQ_COPY[language] ?? FAQ_COPY.en
  const contactHref = `mailto:cristian@avanteventures.com?subject=${encodeURIComponent(t('Avante investor conversation', 'Conversa com investidores Avante', 'Conversación para inversores de Avante'))}`

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
      label: t("Studio-model IRR (GSSN)", "IRR do modelo de studio (GSSN)", "IRR del modelo de studio (GSSN)"),
      color: '#F9B437',
      fn: '6',
    },
    {
      value: '~19%',
      label: t("Traditional VC benchmark IRR", "IRR de referência de VC tradicional", "IRR de referencia del VC tradicional"),
      color: 'rgba(255, 255, 255, 0.45)',
      fn: '6',
    },
    {
      value: '10×',
      label: t("Sigga exit · Prior Innova experience", "Exit Sigga · Experiência anterior na Innova", "Exit de Sigga · Experiencia previa en Innova"),
      color: '#98509A',
      fn: '',
    },
    {
      value: '$500M+',
      label: t("Historically under management · Amanda, Innova & Unbox", "Historicamente sob gestão · Amanda, Innova e Unbox", "Históricamente bajo gestión · Amanda, Innova y Unbox"),
      color: '#F4A261',
      fn: '',
    },
  ]

  const thesis = [
    {
      title: t("Brazil’s services economy is the starting point.", "A economia de serviços do Brasil é o ponto de partida.", "La economía de servicios de Brasil es el punto de partida."),
      body: t(
        "Services account for roughly 70% of Brazilian GDP, per IBGE. Our thesis focuses on complex workflows where software adoption remains limited.", "Os serviços representam cerca de 70% do PIB brasileiro, segundo o IBGE. Nossa tese se concentra em fluxos de trabalho complexos com adoção limitada de software.", "Los servicios representan cerca del 70% del PIB brasileño, según el IBGE. Nuestra tesis se concentra en procesos complejos donde la adopción de software sigue siendo limitada."
      ),
      accent: '#F9B437',
    },
    {
      title: t("AI infrastructure is now cheap enough to deploy without a Series A.", "A infraestrutura de IA já permite colocar produtos em operação sem uma Série A.", "La infraestructura de IA ya permite poner productos en operación sin una Serie A."),
      body: t(
        "Shared product, engineering and operating capabilities let each founding team focus on its customers and product.", "Capacidades compartilhadas de produto, engenharia e operação permitem que cada time fundador se concentre nos clientes e no produto.", "Las capacidades compartidas de producto, ingeniería y operación permiten que cada equipo fundador se concentre en sus clientes y su producto."
      ),
      accent: '#F4A261',
    },
    {
      title: t("The studio-model benchmark is roughly 2.5× traditional VC IRR.", "O benchmark do modelo de studio é de cerca de 2,5× o IRR de VC tradicional.", "El benchmark del modelo de studio es de aproximadamente 2,5× el IRR del VC tradicional."),
      body: t(
        "GSSN reports studio IRR of ~50% versus ~19% for traditional VC. These are industry-model benchmarks, not Avante’s realized returns or a return target.", "O GSSN reporta IRR de studios de ~50% versus ~19% para VC tradicional. São benchmarks do modelo, não retornos realizados da Avante nem uma meta de retorno.", "GSSN reporta un IRR de studios de ~50% frente a ~19% del VC tradicional. Son benchmarks del modelo, no retornos realizados de Avante ni una meta de retorno."
      ),
      accent: '#98509A',
    },
  ]

  const structureItems = [
    t(
      "The venture builder provides first capital across 3-4 ventures per year.", "O venture builder aporta o primeiro capital em 3-4 ventures por ano.", "El venture builder aporta el primer capital a 3-4 ventures al año."
    ),
    t(
      "LPs gain exposure across the full cohort.", "Os LPs têm exposição ao conjunto de ventures da cohort.", "Los LPs obtienen exposición al conjunto de ventures de la cohorte."
    ),
    t(
      "Operating partners participate in venture builder economics. LPs participate through their capital commitments.", "Os sócios operacionais participam dos resultados econômicos do venture builder. Os LPs participam por meio de seus compromissos de capital.", "Los socios operativos participan en los resultados económicos del venture builder. Los LPs participan mediante sus compromisos de capital."
    ),
    t(
      "Quarterly reporting includes cohort-level net asset value and milestone notes for each venture.", "Os relatórios trimestrais incluem o valor patrimonial líquido da cohort e os marcos de cada venture.", "Los informes trimestrales incluyen el valor patrimonial neto de la cohorte y los hitos de cada venture."
    ),
    t(
      "Specific terms, including target fund size, GP commitment, fees and distribution waterfall, are shared in a private LP conversation.", "Termos específicos, incluindo tamanho-alvo do fundo, compromisso do GP, taxas e ordem de distribuição, são compartilhados em uma conversa privada com LPs.", "Los términos específicos, incluidos el tamaño objetivo del fondo, el compromiso del GP, las comisiones y el orden de distribución, se comparten en una conversación privada con LPs."
    ),
  ]

  const willNotDo = [
    t("We will not share LP names or other LP identities. Each LP relationship is confidential by default.", "Não compartilhamos nomes nem identidades de LPs. Cada relação com um LP é confidencial por padrão.", "No compartimos nombres ni identidades de LPs. Cada relación con un LP es confidencial por defecto."),
    t("We will not provide financial advice, allocation guidance, or tax structuring. LPs engage their own counsel.", "Não prestamos aconselhamento financeiro, orientação de alocação ou estruturação tributária. Os LPs contratam seus próprios assessores.", "No ofrecemos asesoramiento financiero, orientación de asignación de capital ni estructuración fiscal. Los LPs contratan a sus propios asesores."),
    t("We will not run a parallel co-investment vehicle without explicit governance for it.", "Não operamos um veículo paralelo de coinvestimento sem governança explícita.", "No operamos un vehículo paralelo de coinversión sin una gobernanza explícita."),
    t("We will not launch ventures whose primary buyer is the LP base. Customer markets are independent of capital markets.", "Não lançamos ventures cujo principal comprador seja a base de LPs. Os mercados de clientes são independentes dos mercados de capital.", "No lanzamos ventures cuyo comprador principal sea la base de LPs. Los mercados de clientes son independientes de los mercados de capital."),
  ]

  return (
    <div className="avante-interior">
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/investors"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <main>
        <InteriorHero kind="investors" eyebrow={t('For investors', 'Para investidores', 'Para inversores')}
          title={<>{t('A local conviction.', 'Uma convicção local.', 'Una convicción local.')}<br />{t('A long horizon.', 'Um horizonte longo.', 'Un horizonte largo.')}</>}
          description={t('AI-native Brazil. Built with operating experience. Explore the thesis, the team and the structure behind Avante.', 'Brasil AI-native. Construído com experiência operacional. Conheça a tese, o time e a estrutura da Avante.', 'Brasil AI-native. Construido con experiencia operativa. Conoce la tesis, el equipo y la estructura de Avante.')} />
        <div className="interior-content" id="page-content">
        <div className="investor-facts">{stats.map(s => <div key={s.label} className="investor-fact"><div className="investor-fact-value">{s.value}{s.fn && <a href={`/${language}#source-${s.fn}`} aria-label={`${t('Source', 'Fonte', 'Fuente')} ${s.fn}`}>{s.fn}</a>}</div><p>{s.label}</p></div>)}</div>

        <p style={{ margin: '0 0 64px', maxWidth: '820px', fontSize: '15px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.72)' }}>
          {t(
            'The $500M+ reflects capital historically under management during Amanda Pinheiro’s CFO roles at Innova Capital and Unbox Capital. Sigga’s 10× exit belongs to the team’s prior investment experience at Innova. AlphaJuri and WIR are among the companies Avante builds today.',
            'Os US$500M+ refletem capital historicamente sob gestão durante a atuação de Amanda Pinheiro como CFO na Innova Capital e Unbox Capital. O exit de 10× da Sigga faz parte da experiência anterior do time em investimentos na Innova. AlphaJuri e WIR estão entre as empresas que a Avante constrói hoje.',
            'Los US$500M+ reflejan capital históricamente bajo gestión durante la trayectoria de Amanda Pinheiro como CFO en Innova Capital y Unbox Capital. El exit de 10× de Sigga corresponde a la experiencia previa del equipo en inversiones en Innova. AlphaJuri y WIR están entre las empresas que Avante construye hoy.'
          )}
        </p>

        {/* Thesis */}
        <section className="investor-section">
          <SectionMasthead
            compact
            eyebrow={t("The thesis", "A tese", "La tesis")}
            title={t(
              "The conditions behind our thesis.", "As condições por trás da nossa tese.", "Las condiciones detrás de nuestra tesis."
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
                className="investor-thesis-card"
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
        <section className="investor-section">
          <SectionMasthead
            compact
            eyebrow={t("Structure", "Estrutura", "Estructura")}
            title={t(
              "How the venture builder is structured.", "Como o venture builder é estruturado.", "Cómo se estructura el venture builder."
            )}
            description={t(
              "Specific commercial terms are shared in a private LP conversation. The architecture below is the starting point.", "Os termos comerciais específicos são compartilhados em uma conversa privada com LPs. A estrutura abaixo é o ponto de partida.", "Los términos comerciales específicos se comparten en una conversación privada con LPs. La estructura que sigue es el punto de partida."
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
        <section className="investor-section">
          <SectionMasthead
            compact
            eyebrow={t("What we will not do", "O que não faremos", "Lo que no haremos")}
            title={t(
              "Clear boundaries from the first conversation.", "Limites claros desde a primeira conversa.", "Límites claros desde la primera conversación."
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
          <InvestorEcosystem />
        </section>

        {/* CTA */}
        <section
          style={{
            margin: '80px 0 0',
            padding: 'clamp(48px, 8vw, 72px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.18)',
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
            {t("Let’s discuss the venture builder.", "Vamos conversar sobre o venture builder.", "Conversemos sobre el venture builder.")}
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
              "Email Cristian to arrange a 45-minute investor conversation. We will cover the thesis, the team’s prior experience, the venture builder structure and your questions.", "Envie um email ao Cristian para agendar uma conversa de 45 minutos para investidores. Vamos abordar a tese, a experiência anterior do time, a estrutura do venture builder e suas perguntas.", "Escribe a Cristian para coordinar una conversación de 45 minutos para inversores. Hablaremos de la tesis, la experiencia previa del equipo, la estructura del venture builder y tus preguntas."
            )}
          </p>
          <a
            href={contactHref}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#F4F1EB',
              color: '#171C36',
              border: '1px solid #F4F1EB',
              borderRadius: '2px',
              minHeight: '44px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F4F1EB'
            }}
          >
            {t("Request an investor conversation", "Solicite uma conversa para investidores", "Solicita una conversación para inversores")}
          </a>
        </section>
      </div>

      </main>
      <Footer />
    </div>
  )
}
