// /founders — structured offer page for founders considering joining a
// studio cohort. Goal: convert "I'm exploring this" → "I'm scheduling a
// conversation" by being concrete about what we offer, what we expect,
// and what makes Avante different.

import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { Footer } from '@/app/components/Footer'
import { BackToTop } from '@/app/components/BackToTop'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { SectionMasthead } from '@/app/components/SectionMasthead'
import { EditorialCard } from '@/app/components/EditorialCard'
import { Link } from 'react-router'

const SEO = {
  en: {
    title: 'For Founders — Avante Ventures',
    description:
      "What we offer founders, what we expect, and how the Avante studio actually works day to day. Specific commitments, not perks lists.",
    inLanguage: 'en',
  },
  pt: {
    title: 'Para Fundadores — Avante Ventures',
    description:
      'O que oferecemos a fundadores, o que esperamos, e como o studio Avante efetivamente funciona dia a dia. Compromissos específicos, não listas de benefícios.',
    inLanguage: 'pt-BR',
  },
} as const

export default function FoundersPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://avanteventures.com/${language}/founders#page`,
    name: copy.title,
    description: copy.description,
    url: `https://avanteventures.com/${language}/founders`,
    inLanguage: copy.inLanguage,
    isPartOf: { '@id': 'https://avanteventures.com/#website' },
    audience: { '@type': 'Audience', audienceType: 'Founders' },
  }

  const offer = [
    {
      label: t('Capital', 'Capital'),
      title: t('First-ticket capital, written by the studio.', 'Capital de primeiro cheque, escrito pelo studio.'),
      body: t(
        'Pre-negotiated first ticket from Avante on day one — no fundraising sprint before you can hire your first engineer.',
        'Primeiro cheque pré-negociado da Avante no dia um — sem sprint de fundraising antes de você poder contratar seu primeiro engenheiro.'
      ),
      accent: '#F9B437',
    },
    {
      label: t('Operating muscle', 'Músculo operacional'),
      title: t('Senior operating partner attached, week one.', 'Operating partner sênior anexado, semana um.'),
      body: t(
        'A partner who has built and exited at scale — in the codebase, not on a quarterly call. Engaged through your first revenue milestone.',
        'Um partner que já construiu e fez exit em escala — no código, não em ligação trimestral. Engajado até seu primeiro marco de receita.'
      ),
      accent: '#F4A261',
    },
    {
      label: t('Infrastructure', 'Infraestrutura'),
      title: t('Talent funnel, finance, legal, security — pre-built.', 'Funil de talento, financeiro, jurídico, segurança — pré-construídos.'),
      body: t(
        'A recruiter who already knows the local senior funnel. SOC2-ready posture from incorporation. Books that survive a Series A audit.',
        'Um recrutador que já conhece o funil sênior local. Postura SOC2-ready desde a incorporação. Contabilidade que sobrevive a uma auditoria de Série A.'
      ),
      accent: '#98509A',
    },
    {
      label: t('Distribution', 'Distribuição'),
      title: t('A first-30-customer pipeline, run as a sprint.', 'Pipeline de primeiros 30 clientes, rodado como sprint.'),
      body: t(
        'When you hit Stage 4 (Traction), a structured 90-day sprint with named buyer targets — not random warm intros.',
        'Quando você bater no Estágio 4 (Tração), um sprint estruturado de 90 dias com targets de comprador nomeados — não warm intros aleatórias.'
      ),
      accent: '#42468C',
    },
  ]

  const expectations = [
    t(
      'You are operating in a Brazilian market vertical with real, daily-operating-decision domain experience.',
      'Você opera em uma vertical de mercado brasileira com experiência de decisão operacional diária real.'
    ),
    t(
      "You are willing to spend Stage 1 (Research) doing customer-discovery, not building product. The discipline is the point.",
      'Você está disposto a passar o Estágio 1 (Research) fazendo customer discovery, não construindo produto. A disciplina é o ponto.'
    ),
    t(
      "You can name your ICP in one sentence — and you've already had at least 10 unstructured conversations with that ICP.",
      'Você consegue nomear seu ICP em uma frase — e já teve pelo menos 10 conversas não estruturadas com esse ICP.'
    ),
    t(
      'You are comfortable with the studio holding meaningful equity in exchange for first-money-in plus the operating stack.',
      'Você está confortável com o studio mantendo equity significativo em troca do primeiro cheque mais o stack operacional.'
    ),
    t(
      'You see English-language internal docs as a feature, not a friction point. Our partner network spans São Paulo + San Francisco.',
      'Você vê docs internos em inglês como feature, não fricção. Nossa rede de partners cobre São Paulo + San Francisco.'
    ),
  ]

  const differences = [
    {
      title: t('Operating partner, not check-writer.', 'Operating partner, não check-writer.'),
      body: t(
        'Most studios oversee from quarterly board meetings. Avante operating partners are in the ICP doc, the unit economics spreadsheet, and the first ten hires.',
        'A maioria dos studios supervisiona de board meetings trimestrais. Operating partners da Avante estão no doc de ICP, na planilha de unit economics e nas primeiras dez contratações.'
      ),
    },
    {
      title: t('São Paulo + San Francisco, both real.', 'São Paulo + San Francisco, ambos reais.'),
      body: t(
        "Not a 'LATAM-focused fund based in NYC.' Half the team operates in Brazil; the other half built and exited in Silicon Valley. Both halves are in the founder's daily WhatsApp.",
        "Não é um 'fundo focado em LATAM baseado em NY'. Metade do time opera no Brasil; a outra metade construiu e fez exit no Vale do Silício. Ambas estão no WhatsApp diário do fundador."
      ),
    },
    {
      title: t('A 90-day-to-pilot discipline, enforced.', 'Disciplina de 90 dias para pilot, enforced.'),
      body: t(
        "Lessons from Sigga (10× exit). If you can't get to a paid pilot inside 90 days of a serious customer conversation, the ICP or product is wrong — we surface that early instead of letting zombie deals burn runway.",
        'Lições da Sigga (exit 10×). Se você não consegue chegar a um pilot pago em 90 dias de uma conversa séria com cliente, o ICP ou produto está errado — trazemos isso à tona cedo em vez de deixar deals zumbis queimarem runway.'
      ),
    },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--avante-background)' }}>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/founders"
        jsonLd={jsonLd}
      />
      <Navbar />
      <BackToTop />

      <div
        style={{
          maxWidth: '1100px',
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
          eyebrow={t('For Founders', 'Para Fundadores')}
          title={t(
            'We co-found AI-native companies in Brazil — and we write the first ticket.',
            'Co-fundamos empresas AI-native no Brasil — e escrevemos o primeiro cheque.'
          )}
          description={t(
            'If you are a Brazilian-market operator with real domain scar tissue and an AI-native thesis you cannot stop thinking about, this page exists to tell you exactly what we offer, what we expect, and how the studio actually works.',
            'Se você é um operador do mercado brasileiro com cicatrizes reais de domínio e uma tese AI-native em que você não para de pensar, esta página existe para te dizer exatamente o que oferecemos, o que esperamos, e como o studio efetivamente funciona.'
          )}
        />

        {/* What we offer — 4 cards */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('What we offer', 'O que oferecemos')}
            title={t('A studio stack, not a perks list.', 'Um stack de studio, não uma lista de perks.')}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '20px',
              marginTop: '8px',
            }}
          >
            {offer.map((o) => (
              <EditorialCard
                key={o.title}
                eyebrow={o.label}
                title={o.title}
                body={o.body}
                accent={o.accent}
                accentPosition="border-top"
                style={{ padding: '28px' }}
              />
            ))}
          </div>
        </section>

        {/* What we expect — checklist */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('What we expect', 'O que esperamos')}
            title={t(
              'A founder profile, not a credential.',
              'Um perfil de fundador, não credenciais.'
            )}
            description={t(
              'We do not screen on schools, prior titles, or brand-name resumes. We screen on the five things below — and we are honest if a venture does not fit before either side wastes a quarter.',
              'Não filtramos por escolas, títulos anteriores ou currículos de marca. Filtramos pelos cinco itens abaixo — e somos honestos se uma venture não encaixa antes de qualquer lado desperdiçar um trimestre.'
            )}
          />
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '24px 0 0 0',
              display: 'grid',
              gap: '12px',
            }}
          >
            {expectations.map((line, i) => (
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(249, 180, 55, 0.15)',
                    border: '1px solid rgba(249, 180, 55, 0.4)',
                    color: '#F9B437',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's different — 3 cards */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('What is different', 'O que é diferente')}
            title={t(
              'Three commitments most studios do not actually deliver.',
              'Três compromissos que a maioria dos studios não cumpre de fato.'
            )}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {differences.map((d) => (
              <EditorialCard
                key={d.title}
                title={d.title}
                body={d.body}
                accentPosition="none"
                style={{ padding: '28px' }}
              />
            ))}
          </div>
        </section>

        {/* CTA block */}
        <section
          style={{
            margin: '80px 0 0',
            padding: 'clamp(48px, 8vw, 72px)',
            background:
              'linear-gradient(135deg, rgba(249, 180, 55, 0.08) 0%, rgba(152, 80, 154, 0.05) 100%)',
            border: '1px solid rgba(249, 180, 55, 0.18)',
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
            {t('Ready for a real conversation?', 'Pronto para uma conversa real?')}
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
              'No deck required. A 30-minute structured first call: your thesis, our diligence frame, an honest read on whether this is a fit before anyone commits to anything.',
              'Sem deck necessário. Uma primeira ligação estruturada de 30 minutos: sua tese, nosso frame de diligência, uma leitura honesta sobre se isso encaixa antes de qualquer lado se comprometer com qualquer coisa.'
            )}
          </p>
          <Link
            to={`/${language}#contact`}
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
            {t('Book a founder call →', 'Agendar conversa →')}
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  )
}
