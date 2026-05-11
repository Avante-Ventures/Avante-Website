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
  es: {
    title: 'Para Fundadores — Avante Ventures',
    description:
      'Qué ofrecemos a los fundadores, qué esperamos, y cómo el studio Avante funciona día a día. Compromisos específicos, no listas de beneficios.',
    inLanguage: 'es',
  },
} as const

export default function FoundersPage() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)
  const copy = SEO[language] ?? SEO.en

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
        'Primeiro cheque pré-negociado da Avante no dia um — sem corrida de fundraising antes de você contratar seu primeiro engenheiro.'
      ),
      accent: '#F9B437',
    },
    {
      label: t('Operating muscle', 'Músculo operacional'),
      title: t('Senior operating partner attached, week one.', 'Operating partner sênior anexado, semana um.'),
      body: t(
        'A partner who has built and exited at scale — in the codebase, not on a quarterly call. Engaged through your first revenue milestone.',
        'Um partner que já construiu e fez exit em escala — dentro do código, não em call trimestral. Engajado até seu primeiro milestone de receita.'
      ),
      accent: '#F4A261',
    },
    {
      label: t('Infrastructure', 'Infraestrutura'),
      title: t('Talent funnel, finance, legal, security — pre-built.', 'Funil de talento, financeiro, jurídico, segurança — pré-construídos.'),
      body: t(
        'A recruiter who already knows the local senior funnel. SOC2-ready posture from incorporation. Books that survive a Series A audit.',
        'Recrutador que já conhece o funil sênior local. Postura SOC2-ready desde a incorporação. Contabilidade que aguenta uma auditoria de Série A.'
      ),
      accent: '#98509A',
    },
    {
      label: t('Distribution', 'Distribuição'),
      title: t('A first-30-customer pipeline, run as a sprint.', 'Pipeline de primeiros 30 clientes, rodado como sprint.'),
      body: t(
        'When you hit Stage 4 (Traction), a structured 90-day sprint with named buyer targets — not random warm intros.',
        'Quando você chega no Estágio 4 (Tração), um sprint estruturado de 90 dias com targets nomeados — não warm intros soltas.'
      ),
      accent: '#98509A',
    },
  ]

  const expectations = [
    t(
      'You are operating in a Brazilian market vertical with real, daily-operating-decision domain experience.',
      'Você opera numa vertical do mercado brasileiro com experiência real de decisão operacional do dia a dia.'
    ),
    t(
      "You are willing to spend Stage 1 (Research) doing customer-discovery, not building product. The discipline is the point.",
      'Você está disposto a passar o Estágio 1 (Research) fazendo customer discovery, não construindo produto. A disciplina é o ponto.'
    ),
    t(
      "You can name your ICP in one sentence — and you've already had at least 10 unstructured conversations with that ICP.",
      'Você consegue descrever seu ICP em uma frase — e já teve pelo menos 10 conversas não-estruturadas com gente desse ICP.'
    ),
    t(
      'You are comfortable with the studio holding meaningful equity in exchange for first-money-in plus the operating stack.',
      'Você está confortável com o studio mantendo equity significativo em troca do primeiro cheque mais o stack operacional.'
    ),
    t(
      'You see English-language internal docs as a feature, not a friction point. Our partner network spans São Paulo + San Francisco.',
      'Você enxerga docs internos em inglês como feature, não fricção. Nossa rede de partners cobre São Paulo e San Francisco.'
    ),
  ]

  const differences = [
    {
      title: t('Operating partner, not check-writer.', 'Operating partner, não check-writer.'),
      body: t(
        'Most studios oversee from quarterly board meetings. Avante operating partners are in the ICP doc, the unit economics spreadsheet, and the first ten hires.',
        'A maioria dos studios supervisiona em board meeting trimestral. Operating partners da Avante ficam no doc de ICP, na planilha de unit economics e nas primeiras dez contratações.'
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
        'Aprendizado da Sigga (exit 10×). Se você não chega num pilot pago em 90 dias depois de uma conversa séria com cliente, o ICP ou o produto está errado — a gente expõe isso cedo em vez de deixar deal zumbi queimar runway.'
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

        {/* Q&A block — the questions founders actually ask before committing */}
        <section style={{ margin: '64px 0' }}>
          <SectionMasthead
            compact
            eyebrow={t('Honest answers', 'Respostas honestas')}
            title={t(
              'The questions founders ask before signing.',
              'As perguntas que fundadores fazem antes de assinar.'
            )}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            {/* Apple-curve toggle on the '+' affordance: rotates 45° to
                read as '×' when expanded. CSS-only via [open] selector. */}
            <style>{`
              .avt-qa[open] .avt-qa-mark {
                transform: rotate(45deg);
              }
              .avt-qa-mark {
                transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
                transform-origin: center;
                will-change: transform;
              }
              .avt-qa summary::-webkit-details-marker { display: none; }
            `}</style>
            {[
              {
                q: t(
                  '"Why not just raise from a tier-1 VC instead?"',
                  '"Por que não levantar direto com um VC tier-1?"'
                ),
                a: t(
                  "Tier-1 VCs are great at writing checks. They are not great at being in your codebase week one, designing your discovery script, or carrying the first 30 customers with you. If your venture needs $5M and three intros, raise from Sequoia. If it needs an operating partner who has built and exited at scale in Brazil, that is a different product — and that is what the studio is.",
                  'VCs tier-1 são ótimos para escrever cheques. Não são ótimos para estar no seu código na semana um, desenhar seu script de discovery, ou carregar os primeiros 30 clientes com você. Se sua venture precisa de R$25M e três introduções, levante com a Sequoia. Se precisa de um operating partner que já construiu e fez exit em escala no Brasil, é outro produto — e é o que o studio é.'
                ),
              },
              {
                q: t(
                  '"How much equity does the studio take?"',
                  '"Quanto equity o studio fica?"'
                ),
                a: t(
                  'Studio economics — meaningful enough that we are aligned for a decade, calibrated so the founders still own their company in a way that makes a Series A unblocked. Specific numbers are shared in the first structured call, not on a public page.',
                  'Economics de studio — suficiente para nos alinharmos por uma década, calibrado para que os fundadores ainda sejam donos da empresa de uma forma que destrava a Série A. Números específicos são compartilhados na primeira call estruturada, não em página pública.'
                ),
              },
              {
                q: t(
                  '"Do I have to relocate to São Paulo or San Francisco?"',
                  '"Preciso me mudar para São Paulo ou San Francisco?"'
                ),
                a: t(
                  'No. Most founders we work with are already operating somewhere in Brazil and stay there. The studio comes to you — partners visit, working sessions happen on your turf, and remote rituals (weekly checkpoints, async loom reviews) are designed for distance, not against it.',
                  'Não. A maioria dos fundadores com quem trabalhamos já opera em algum ponto do Brasil e fica lá. O studio vai até você — partners visitam, sessões de trabalho acontecem no seu território, e rituais remotos (checkpoints semanais, reviews em loom assíncrono) são desenhados para distância, não contra ela.'
                ),
              },
              {
                q: t(
                  '"What happens if my venture fails?"',
                  '"O que acontece se minha venture quebrar?"'
                ),
                a: t(
                  'Some will. The studio is built around honest stage gates (90-day-to-pilot, 6-month-to-paid-customers, 12-month-to-Series-A-readiness) — if a venture cannot clear them, we have a structured wind-down protocol: founders keep equity earned, IP rights are clear, and we stay in the corner of any future thing the team builds. We have lived this and we treat it as part of the relationship, not a worst-case clause buried in a side letter.',
                  'Algumas vão quebrar. O studio é construído em torno de stage gates honestos (90 dias para pilot, 6 meses para clientes pagos, 12 meses para readiness de Série A) — se uma venture não passa, temos um protocolo estruturado de wind-down: fundadores mantêm o equity ganho, direitos de IP são claros, e ficamos no canto de qualquer coisa futura que o time construir. Já vivemos isso e tratamos como parte da relação, não cláusula de pior caso escondida em side letter.'
                ),
              },
              {
                q: t(
                  '"What does an Avante operating partner actually do day-to-day?"',
                  '"O que um operating partner da Avante faz no dia a dia?"'
                ),
                a: t(
                  "First 30 days: customer-discovery alongside the founder, ICP doc co-authored, first-ten-customer target list assembled. Months 2–6: weekly working sessions on whatever blocks the venture (pricing test, hiring loop, security review, fundraising deck). Months 6–12: shifts to coach + escalation owner — present at major customer + investor calls, on-call for crises. After Series A: board observer or full board seat, depending on what the founder wants. Concrete and bounded — not 'available for advice.'",
                  'Primeiros 30 dias: customer discovery junto com o fundador, doc de ICP co-escrito, lista de primeiros dez clientes-alvo montada. Meses 2–6: working sessions semanais no que estiver travando a venture (teste de pricing, loop de contratação, security review, deck de fundraising). Meses 6–12: vira coach + dono de escalações — presente em calls grandes de cliente e investidor, on-call em crises. Depois da Série A: board observer ou cadeira de board, dependendo do que o fundador quiser. Concreto e delimitado — não "disponível para conselhos".'
                ),
              },
              {
                q: t(
                  '"How long is the engagement? When does the studio step back?"',
                  '"Quanto tempo dura o engajamento? Quando o studio sai de cena?"'
                ),
                a: t(
                  "The default is 18 months of intensive operating engagement, then a structured handoff into board-level governance only. Some founders want the studio to stay closer for longer; some want full operational autonomy by month 12. We are explicit about this in month 6 — no surprises, no slow fades. The relationship continues through the cap table for the life of the venture, but the work changes.",
                  'O default são 18 meses de engajamento operacional intensivo, depois transição estruturada para governança só em nível de board. Alguns fundadores querem que o studio fique mais perto por mais tempo; outros querem autonomia operacional total no mês 12. A gente é explícito sobre isso no mês 6 — sem surpresa, sem fade gradual. A relação continua via cap table pela vida da venture, mas o trabalho muda.'
                ),
              },
            ].map((item, i) => (
              <details
                key={i}
                className="avt-qa"
                style={{
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '20px 24px',
                }}
              >
                <summary
                  style={{
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className="avt-qa-mark"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      fontSize: '22px',
                      color: '#F9B437',
                      flexShrink: 0,
                      lineHeight: 1,
                      fontWeight: 300,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'rgba(255, 255, 255, 0.72)',
                    margin: '14px 0 4px 0',
                  }}
                >
                  {item.a}
                </p>
              </details>
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
