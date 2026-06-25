// /principles — the 10 operating principles of the Avante studio.
//
// Strategic intent: most studios keep their operating doctrine private.
// Publishing it is competitive damage to peer studios and a signal of
// confidence to founders + LPs. Each principle is a rule that constrains
// behavior, not a value that flatters identity.
//
// Designed as an editorial poster: large numbered blocks, no decoration,
// gold-dot eyebrow signature, masthead family. Reads top-to-bottom.

import { Fragment } from 'react'
import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { AvtSectionDivider } from '@/app/components/AvtSectionDivider'
import { Link } from 'react-router'

interface Principle {
  number: string
  title: { en: string; pt: string; es: string }
  body: { en: string; pt: string; es: string }
}

// Round 9.2 — principles refined per user direction. Top 5 are the new
// operating thesis (serial founders, B2B AI flywheel, speed-with-capital,
// milestones unlock capital, first clients in 90 days). Bottom 5 keep the
// strongest survivors (cap on throughput, operating partner in codebase,
// founders own customer, dual-anchor standards, negative space).
const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: {
      en: 'Operators who have already shipped something hard.',
      pt: 'Operadores que já entregaram algo difícil.',
      es: 'Operadores que ya han entregado algo difícil.',
    },
    body: {
      en: "We back founders with deep operating scars in their vertical: serial founders with 20-year vertical depth, first-time founders with a decade of being the operator who actually shipped, intrapreneurs who have lived inside the buyer. Pedigree is a poor proxy for that. Operating scars are the cheapest form of risk-reduction at the seed stage.",
      pt: 'Apostamos em founders com cicatrizes operacionais profundas na sua vertical: serial founders com 20 anos de profundidade vertical, founders de primeira vez com uma década sendo o operador que realmente entregou, intrapreneurs que viveram dentro do comprador. Pedigree é uma proxy pobre para isso. Cicatriz operacional é a forma mais barata de redução de risco no seed.',
      es: 'Apostamos por founders con cicatrices operativas profundas en su vertical: serial founders con 20 años de profundidad vertical, founders de primera vez con una década siendo el operador que realmente entregó, intrapreneurs que vivieron dentro del comprador. El pedigree es una proxy pobre para eso. La cicatriz operativa es la forma más barata de reducción de riesgo en seed.',
    },
  },
  {
    number: '02',
    title: {
      en: 'B2B-focused AI engine flywheel.',
      pt: 'Flywheel de engine de IA focada em B2B.',
      es: 'Flywheel de engine de IA enfocado en B2B.',
    },
    body: {
      en: "We build AI engines, not AI features: vertical-specific models that get smarter with every customer transaction. The flywheel: customer N's data trains the model that closes customer N+1, faster and at higher margin. B2B because the data feedback loop and pricing leverage are simply better than consumer.",
      pt: 'Construímos engines de IA, não features de IA: modelos vertical-específicos que ficam mais inteligentes a cada transação. O flywheel: o dado do cliente N treina o modelo que fecha o cliente N+1, mais rápido e com margem maior. B2B porque o loop de dados e a alavanca de pricing são simplesmente melhores que consumer.',
      es: 'Construimos engines de IA, no features de IA: modelos vertical-específicos que se vuelven más inteligentes con cada transacción. El flywheel: el dato del cliente N entrena el modelo que cierra al cliente N+1, más rápido y con mejor margen. B2B porque el loop de datos y el apalancamiento de pricing son simplemente mejores que consumer.',
    },
  },
  {
    number: '03',
    title: {
      en: 'Speed to market, validated with capital.',
      pt: 'Velocidade ao mercado, validada com capital.',
      es: 'Velocidad al mercado, validada con capital.',
    },
    body: {
      en: 'We optimize for time-to-revenue, not time-to-product. A venture that ships in 4 months but takes 24 to find a paying customer is a 24-month venture. Speed without revenue validation is theatre. Capital deploys in tranches that reward each market signal. The next dollar follows the customer signature, not the calendar.',
      pt: 'Otimizamos por time-to-revenue, não time-to-product. Uma venture que sobe produto em 4 meses mas leva 24 para achar um cliente pagante é uma venture de 24 meses. Velocidade sem validação de receita é teatro. O capital entra em tranches que recompensam cada sinal de mercado. O próximo dólar segue a assinatura do cliente, não o calendário.',
      es: 'Optimizamos por time-to-revenue, no time-to-product. Una venture que sube producto en 4 meses pero tarda 24 en encontrar un cliente pagador es una venture de 24 meses. Velocidad sin validación de revenue es teatro. El capital entra en tranches que recompensan cada señal de mercado. El siguiente dólar sigue la firma del cliente, no el calendario.',
    },
  },
  {
    number: '04',
    title: {
      en: 'Milestones unlock capital. Calendars do not.',
      pt: 'Hitos liberam capital. Calendário não.',
      es: 'Los hitos desbloquean capital. Los calendarios no.',
    },
    body: {
      en: 'We do not write flat seed checks against vesting periods. Capital advances in tranches tied to specific product, revenue, or pilot milestones. The next dollar earns its way in. This protects the founder, the cap table, and the studio from running 12 months on auto-pilot.',
      pt: 'Não escrevemos cheques seed flat amarrados a períodos de vesting. O capital avança em tranches atadas a milestones específicos de produto, receita ou pilot. O próximo dólar precisa ganhar a entrada. Isso protege o founder, o cap table e o studio de rodar 12 meses no automático.',
      es: 'No escribimos cheques seed flat amarrados a periodos de vesting. El capital avanza en tranches atadas a hitos específicos de producto, revenue o piloto. El siguiente dólar tiene que ganarse la entrada. Esto protege al founder, al cap table y al studio de correr 12 meses en piloto automático.',
    },
  },
  {
    number: '05',
    title: {
      en: 'First clients in the first 90 days.',
      pt: 'Primeiros clientes nos primeiros 90 dias.',
      es: 'Primeros clientes en los primeros 90 días.',
    },
    body: {
      en: 'The first 90 days after launch separate ventures with real ICP fit from ventures with deck fit. We expect first paying clients, or signed LOIs in regulated verticals where compliance gates the contract. The form of the signal flexes by industry; the requirement that one exists, does not.',
      pt: 'Os primeiros 90 dias depois do lançamento separam ventures com ICP fit real de ventures com fit-de-deck. Esperamos os primeiros clientes pagantes, ou LOIs assinadas em verticais reguladas onde compliance trava o contrato. A forma do sinal flexiona por indústria; a exigência de que ele exista, não.',
      es: 'Los primeros 90 días después del lanzamiento separan ventures con ICP fit real de ventures con fit-de-deck. Esperamos los primeros clientes pagadores, o LOIs firmadas en verticales reguladas donde compliance bloquea el contrato. La forma de la señal flexiona por industria; el requisito de que exista, no.',
    },
  },
  {
    number: '06',
    title: {
      en: '3–4 ventures per year. No exceptions.',
      pt: '3–4 ventures por ano. Sem exceção.',
      es: '3–4 ventures por año. Sin excepciones.',
    },
    body: {
      en: 'We deliberately cap throughput. Studios that scale faster than their operating stack matures debase the very advantage that justifies the model. Discipline at the top of the funnel is the cheapest form of selection.',
      pt: 'A gente limita throughput de propósito. Studios que escalam mais rápido do que seu stack operacional amadurece degradam a própria vantagem que justifica o modelo. Disciplina no topo do funil é a forma mais barata de seleção.',
      es: 'Limitamos throughput a propósito. Los studios que escalan más rápido de lo que madura su stack operativo degradan la propia ventaja que justifica el modelo. La disciplina en la cima del funnel es la forma más barata de selección.',
    },
  },
  {
    number: '07',
    title: {
      en: 'Operating partner in the codebase.',
      pt: 'Operating partner dentro do código.',
      es: 'Operating partner dentro del código.',
    },
    body: {
      en: 'Not on a quarterly call. Not on a Slack channel that goes silent. In the ICP doc, the unit-economics spreadsheet, and the first ten hires. The studio earns its equity by sitting beside the founder where the work happens.',
      pt: 'Não em call trimestral. Não em canal de Slack que esfria. Dentro do doc de ICP, da planilha de unit economics e nas primeiras dez contratações. O studio ganha seu equity sentando ao lado do founder onde o trabalho acontece.',
      es: 'No en call trimestral. No en canal de Slack que se enfría. Dentro del doc de ICP, de la planilla de unit economics y en las primeras diez contrataciones. El studio se gana su equity sentándose al lado del founder donde sucede el trabajo.',
    },
  },
  {
    number: '08',
    title: {
      en: 'Founders close the first 10 enterprise deals. We never replace them.',
      pt: 'Founders fecham os primeiros 10 contratos enterprise. Nunca os substituímos.',
      es: 'Los founders cierran los primeros 10 contratos enterprise. Nunca los reemplazamos.',
    },
    body: {
      en: 'A specific commitment, not a slogan. The first ten enterprise customers must be closed by the founder personally: name on the contract, direct line for escalations, in the room for renewals. The studio brand never appears on a customer call. Studio support is operational behind the scenes, never relational on the front.',
      pt: 'Um compromisso específico, não um slogan. Os primeiros dez clientes enterprise precisam ser fechados pelo founder pessoalmente: nome no contrato, linha direta para escalações, na sala nas renovações. A marca do studio nunca aparece numa call com cliente. Suporte do studio é operacional nos bastidores, nunca relacional na frente.',
      es: 'Un compromiso específico, no un slogan. Los primeros diez clientes enterprise tienen que ser cerrados por el founder personalmente: nombre en el contrato, línea directa para escalaciones, en la sala en las renovaciones. La marca del studio nunca aparece en una call con cliente. El soporte del studio es operativo tras bastidores, nunca relacional en el frente.',
    },
  },
  {
    number: '09',
    title: {
      en: 'Brazil-native execution. Silicon Valley-native standards.',
      pt: 'Execução nativa do Brasil. Padrões nativos do Vale do Silício.',
      es: 'Ejecución nativa de Brasil. Estándares nativos de Silicon Valley.',
    },
    body: {
      en: 'The São Paulo team operates the venture in market. The Silicon Valley team brings the bar: product reviews, hiring filters, capital discipline calibrated against US-tier outcomes. Neither side dilutes the other. Both anchors are real.',
      pt: 'O time de São Paulo opera a venture em mercado. O time do Vale do Silício traz a régua: product reviews, filtros de contratação, disciplina de capital calibrada contra outcomes de tier US. Nenhum lado dilui o outro. Ambas as âncoras são reais.',
      es: 'El equipo de São Paulo opera la venture en mercado. El equipo de Silicon Valley trae la vara: product reviews, filtros de contratación, disciplina de capital calibrada contra outcomes de tier US. Ningún lado diluye al otro. Ambas anclas son reales.',
    },
  },
  {
    number: '10',
    title: {
      en: 'What we will not do is what we are.',
      pt: 'O que não fazemos é o que somos.',
      es: 'Lo que no hacemos es lo que somos.',
    },
    body: {
      en: 'A studio that cannot articulate its negative space cannot articulate its positive. We turn down 95% of inbound: services-disguised-as-software, AI-feature wrappers, hype-first markets, founder profiles that score on charisma instead of judgment. Saying no is the discipline.',
      pt: 'Um studio que não consegue articular seu espaço negativo não consegue articular o positivo. Recusamos 95% do inbound: serviços disfarçados de software, wrappers de feature de IA, mercados hype-first, perfis de founder que pontuam em carisma em vez de julgamento. Dizer não é a disciplina.',
      es: 'Un studio que no puede articular su espacio negativo no puede articular el positivo. Rechazamos 95% del inbound: servicios disfrazados de software, wrappers de feature de IA, mercados hype-first, perfiles de founder que puntúan en carisma en vez de juicio. Decir no es la disciplina.',
    },
  },
]

const SEO = {
  en: {
    title: 'Operating Principles — Avante Ventures',
    description:
      'Ten principles the Avante studio operates by. Not values. Rules that constrain behavior. The decisions we have already made so we can spend operating time on the ones that are left.',
    inLanguage: 'en',
  },
  pt: {
    title: 'Princípios Operacionais — Avante Ventures',
    description:
      'Dez princípios pelos quais o studio Avante opera. Não são valores. São regras que constrangem comportamento. As decisões que já tomamos para gastar tempo operacional nas que ainda restam.',
    inLanguage: 'pt-BR',
  },
  es: {
    title: 'Principios Operativos — Avante Ventures',
    description:
      'Diez principios por los que opera el studio Avante. No son valores. Son reglas que limitan el comportamiento. Las decisiones que ya tomamos para gastar tiempo operativo en las que quedan.',
    inLanguage: 'es',
  },
} as const

export default function PrinciplesPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string, es?: string) =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en
  const copy = SEO[language] ?? SEO.en

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://avanteventures.com/${language}/principles#article`,
    headline: copy.title,
    description: copy.description,
    url: `https://avanteventures.com/${language}/principles`,
    inLanguage: copy.inLanguage,
    author: { '@id': 'https://avanteventures.com/#organization' },
    publisher: { '@id': 'https://avanteventures.com/#organization' },
    isPartOf: { '@id': 'https://avanteventures.com/#website' },
    about: PRINCIPLES.map((p) => p.title.en),
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--avante-background)' }}>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/principles"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <div
        style={{
          maxWidth: '960px',
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
          ← {t('Back to home', 'Voltar ao início', 'Volver al inicio')}
        </Link>

        <SectionMasthead
          eyebrow={t('Operating Principles', 'Princípios Operacionais', 'Principios Operativos')}
          title={t(
            'Ten principles we operate by.',
            'Dez princípios pelos quais operamos.',
            'Diez principios por los que operamos.'
          )}
          description={t(
            'Not values. Rules that constrain behavior. The set of decisions we have already made so we can spend operating time on the ones that are left.',
            'Não são valores. São regras que constrangem comportamento. As decisões que já tomamos para gastar tempo operacional nas que ainda restam.',
            'No son valores. Son reglas que limitan el comportamiento. El conjunto de decisiones que ya tomamos para gastar tiempo operativo en las que quedan.'
          )}
        />

        {/* The 10 principles. Generous vertical rhythm — designed to be
            read top-to-bottom, not scanned. Each block reveals on scroll
            with the same Apple curve as the masthead family.            */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(48px, 6vw, 72px)',
            marginTop: 'clamp(48px, 8vw, 80px)',
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <Fragment key={p.number}>
              <PrincipleBlock principle={p} language={language} index={i} />
              {/* Tier 3 / use 11 — Editorial section dividers between
                  groups of 3 principles. Breaks the rhythm of the long
                  scroll into 3 movements (1-3, 4-6, 7-9), with #10 as
                  the codifying close. */}
              {(i === 2 || i === 5 || i === 8) && i !== PRINCIPLES.length - 1 && (
                <AvtSectionDivider size="sm" spacing={32} />
              )}
            </Fragment>
          ))}
        </div>

        {/* Closing note + CTA back into the site */}
        <div
          style={{
            marginTop: 'clamp(80px, 10vw, 120px)',
            paddingTop: 'clamp(48px, 6vw, 72px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '640px',
              margin: '0 auto 32px',
              fontStyle: 'italic',
            }}
          >
            {t(
              'These principles are public for one reason: a studio that cannot publish its operating doctrine is operating one.',
              'Estes princípios são públicos por uma razão: um studio que não consegue publicar sua doutrina operacional está operando uma.',
              'Estos principios son públicos por una razón: un studio que no puede publicar su doctrina operativa está operando una.'
            )}
          </p>
          <Link
            to={`/${language}/library/inside-the-avante-operating-stack`}
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
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.55)'
              e.currentTarget.style.background = 'rgba(249, 180, 55, 0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {t('Read the Operating Stack →', 'Leia o Operating Stack →', 'Leer el Operating Stack →')}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function PrincipleBlock({
  principle,
  language,
  index,
}: {
  principle: Principle
  language: 'en' | 'pt' | 'es'
  index: number
}) {
  // Two-column layout: large number on the left, content on the right.
  // At mobile, stacks vertically with the number above.
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(60px, 10vw, 100px) 1fr',
        gap: 'clamp(20px, 4vw, 40px)',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 600,
          color: '#F9B437',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {principle.number}
      </div>
      <div>
        <h2
          style={{
            fontSize: 'clamp(22px, 2.6vw, 30px)',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            margin: '0 0 14px 0',
          }}
        >
          {principle.title[language]}
        </h2>
        <p
          style={{
            fontSize: 'clamp(15px, 1.6vw, 17px)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.72)',
            margin: 0,
            maxWidth: '620px',
          }}
        >
          {principle.body[language]}
        </p>
      </div>
    </div>
  )
}
