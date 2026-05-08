// /principles — the 10 operating principles of the Avante studio.
//
// Strategic intent: most studios keep their operating doctrine private.
// Publishing it is competitive damage to peer studios and a signal of
// confidence to founders + LPs. Each principle is a rule that constrains
// behavior, not a value that flatters identity.
//
// Designed as an editorial poster: large numbered blocks, no decoration,
// gold-dot eyebrow signature, masthead family. Reads top-to-bottom.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { Link } from 'react-router'

interface Principle {
  number: string
  title: { en: string; pt: string }
  body: { en: string; pt: string }
}

const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: {
      en: 'First ticket or no ticket.',
      pt: 'Primeiro cheque ou nada.',
    },
    body: {
      en: "We are first-money-in or we do not invest. The studio's edge is at the founding moment; we do not chase rounds we did not start.",
      pt: 'Somos first-money-in ou não investimos. A vantagem do studio está no momento de fundação; não corremos atrás de rounds que não começamos.',
    },
  },
  {
    number: '02',
    title: {
      en: '90 days to pilot.',
      pt: '90 dias até o pilot.',
    },
    body: {
      en: 'If a venture cannot get to a paid pilot inside 90 days of a serious customer conversation, the ICP or product is wrong. We surface that early instead of subsidizing zombie pipeline.',
      pt: 'Se uma venture não chega num pilot pago em 90 dias de uma conversa séria com cliente, o ICP ou o produto está errado. A gente expõe isso cedo em vez de subsidiar pipeline zumbi.',
    },
  },
  {
    number: '03',
    title: {
      en: 'The operating partner is in the codebase.',
      pt: 'O operating partner fica no código.',
    },
    body: {
      en: 'Not on a quarterly call. Not on a Slack channel that goes silent. In the ICP doc, the unit-economics spreadsheet, and the first ten hires.',
      pt: 'Não em call trimestral. Não em canal de Slack que esfria. Dentro do doc de ICP, da planilha de unit economics e nas primeiras dez contratações.',
    },
  },
  {
    number: '04',
    title: {
      en: 'Three to four ventures per year. No exceptions.',
      pt: 'Três a quatro ventures por ano. Sem exceção.',
    },
    body: {
      en: 'We deliberately cap throughput. Studios that scale faster than their stack matures debase the very advantage that justifies the model.',
      pt: 'A gente limita throughput de propósito. Studios que escalam mais rápido do que seu stack amadurece degradam a própria vantagem que justifica o modelo.',
    },
  },
  {
    number: '05',
    title: {
      en: 'Founders own the customer relationship.',
      pt: 'Fundadores são donos da relação com o cliente.',
    },
    body: {
      en: 'Always. Studio support is operational, never relational. The first ten enterprise customers must know the founder, not the studio brand.',
      pt: 'Sempre. Suporte do studio é operacional, nunca relacional. Os primeiros dez clientes enterprise precisam conhecer o fundador, não a marca do studio.',
    },
  },
  {
    number: '06',
    title: {
      en: 'The exit pool is wider than the obvious incumbent.',
      pt: 'O pool de exit é mais largo que o incumbente óbvio.',
    },
    body: {
      en: 'Map who needs your customer base, not who is in your category. Most exits come from category-adjacent buyers; the obvious one rarely wins.',
      pt: 'Mapeie quem precisa da sua base de clientes, não quem está na sua categoria. A maioria dos exits vem de compradores adjacentes-de-categoria; o óbvio raramente ganha.',
    },
  },
  {
    number: '07',
    title: {
      en: 'Capital discipline as a strategic weapon.',
      pt: 'Disciplina de capital como arma estratégica.',
    },
    body: {
      en: 'Optionality is the most undervalued asset in early-stage venture-building. Build for an 18-month dry market, because in Brazilian venture history the dry markets always come.',
      pt: 'Opcionalidade é o ativo mais subestimado em construção de venture early-stage. Construa para um mercado seco de 18 meses — porque na história do venture brasileiro, os mercados secos sempre chegam.',
    },
  },
  {
    number: '08',
    title: {
      en: 'Demo-quality is not production-quality.',
      pt: 'Qualidade-de-demo não é qualidade-de-produção.',
    },
    body: {
      en: 'Industrial verticals punish that confusion harder than any other. "Works on a deck" and "works in a copper mine" are not the same product.',
      pt: 'Verticais industriais punem essa confusão mais duro que qualquer outra. "Funciona num deck" e "funciona numa mina de cobre" não são o mesmo produto.',
    },
  },
  {
    number: '09',
    title: {
      en: 'English internal docs. Portuguese customer docs.',
      pt: 'Docs internos em inglês. Docs de cliente em português.',
    },
    body: {
      en: 'The team operates in English (SF + SP, both real). Customers, partners, and regulatory docs are native Portuguese. Both are non-negotiable.',
      pt: 'O time opera em inglês (SF e SP, ambos reais). Clientes, parceiros e docs regulatórios são em português nativo. Ambos não-negociáveis.',
    },
  },
  {
    number: '10',
    title: {
      en: 'What we will not do is what we are.',
      pt: 'O que não fazemos é o que somos.',
    },
    body: {
      en: 'A studio that cannot articulate its negative space cannot articulate its positive space either. Saying no is the discipline.',
      pt: 'Um studio que não consegue articular seu espaço negativo não consegue articular seu espaço positivo. Dizer não é a disciplina.',
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
} as const

export default function PrinciplesPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language]

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
          padding: 'clamp(96px, 12vh, 140px) 24px 96px',
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
          eyebrow={t('Operating Principles', 'Princípios Operacionais')}
          title={t(
            'Ten principles we operate by.',
            'Dez princípios pelos quais operamos.'
          )}
          description={t(
            'Not values. Rules that constrain behavior. The set of decisions we have already made so we can spend operating time on the ones that are left.',
            'Não são valores. São regras que constrangem comportamento. As decisões que já tomamos para gastar tempo operacional nas que ainda restam.'
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
            <PrincipleBlock key={p.number} principle={p} language={language} index={i} />
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
              'Estes princípios são públicos por uma razão: um studio que não consegue publicar sua doutrina operacional está operando uma.'
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
            {t('Read the Operating Stack →', 'Leia o Operating Stack →')}
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
  language: 'en' | 'pt'
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
