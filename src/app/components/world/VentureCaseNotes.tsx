import { VENTURES, type VentureKind } from './ventures';

// Scope sources: ../TEAM-FACTS.md and ../CLAUDE.md.
// Public product evidence: AlphaJuri components/how-it-works.tsx and
// app/(site)/sobre/page.tsx; WIR src/home-shift.jsx and src/solutions.jsx.
// Describe inspectable workflows, without implying customer or revenue results.
const COPY = {
  en: {
    title: 'Inside the company', labels: ['Customer problem', 'Avante’s role', 'See the work'],
    link: 'Explore the product',
    legal: [
      'Lawyers can have court-awarded fees to receive long before the payment arrives. AlphaJuri’s current public workflow focuses on anticipating payment of those RPV claims.',
      'Product and engineering for the judicial-credit platform, as part of Avante’s venture portfolio.',
      'The website walks through case identification, claim eligibility review, a digital proposal and electronic assignment. The customer can inspect that journey before starting a request.',
    ],
    risk: [
      'Insurance teams receive fragmented quote requests and spend time organizing submissions and checking whether risks fit the insurer’s appetite.',
      'Product and engineering for insurance pricing and risk workflows within WIR, an Avante venture.',
      'WIR presents Smart Sales for distribution and Underwriter Intelligence for quoting. Its public product pages show how submissions, prioritization and risk policies connect to existing systems.',
    ],
  },
  pt: {
    title: 'Por dentro da empresa', labels: ['O problema do cliente', 'O papel da Avante', 'Conheça o trabalho'],
    link: 'Explore o produto',
    legal: [
      'Advogados podem ter honorários reconhecidos pela Justiça muito antes do pagamento. O fluxo público atual da AlphaJuri é voltado à antecipação desses créditos em RPV.',
      'Produto e engenharia para a plataforma de créditos judiciais, como parte do portfólio de ventures da Avante.',
      'O site apresenta a identificação do processo, análise de elegibilidade, proposta digital e cessão eletrônica. O cliente pode conhecer esse fluxo antes de iniciar uma solicitação.',
    ],
    risk: [
      'Equipes de seguros recebem pedidos de cotação fragmentados e gastam tempo organizando propostas e verificando se os riscos se encaixam no apetite da seguradora.',
      'Produto e engenharia para os fluxos de precificação e análise de riscos da WIR, um venture da Avante.',
      'A WIR apresenta Smart Sales para distribuição e Underwriter Intelligence para cotações. As páginas públicas mostram como propostas, priorização e políticas de risco se conectam aos sistemas existentes.',
    ],
  },
  es: {
    title: 'Dentro de la empresa', labels: ['El problema del cliente', 'El papel de Avante', 'Conoce el trabajo'],
    link: 'Explora el producto',
    legal: [
      'Los abogados pueden tener honorarios reconocidos por la Justicia mucho antes de recibir el pago. El flujo público actual de AlphaJuri se centra en anticipar esos créditos judiciales en RPV.',
      'Producto e ingeniería para la plataforma de créditos judiciales, como parte del portafolio de empresas de Avante.',
      'El sitio presenta la identificación del proceso, revisión de elegibilidad, propuesta digital y cesión electrónica. El cliente puede conocer ese flujo antes de iniciar una solicitud.',
    ],
    risk: [
      'Los equipos de seguros reciben solicitudes de cotización fragmentadas y dedican tiempo a organizarlas y comprobar si los riesgos encajan con los criterios de la aseguradora.',
      'Producto e ingeniería para los flujos de tarificación y análisis de riesgos de WIR, una empresa de Avante.',
      'WIR presenta Smart Sales para distribución y Underwriter Intelligence para cotizaciones. Sus páginas públicas muestran cómo las solicitudes, la priorización y las políticas de riesgo se conectan a los sistemas existentes.',
    ],
  },
};

export function VentureCaseNotes({ kind, language }: { kind: VentureKind; language: keyof typeof COPY }) {
  const c = COPY[language], venture = VENTURES[kind];
  return <section className="venture-case-notes" aria-label={`${venture.name}: ${c.title}`}>
    <dl>{c[kind].map((body, index) => <div key={c.labels[index]}><dt>{c.labels[index]}</dt><dd>{body}</dd></div>)}</dl>
    <a href={venture.url} target="_blank" rel="noopener noreferrer">{c.link}<span aria-hidden="true">↗</span></a>
    <style>{`
      .venture-case-notes { padding: clamp(24px, 4vw, 42px); background: #0b0d16; border-top: 1px solid #b8bfd726; }
      .venture-case-notes dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(24px, 3vw, 40px); margin: 0; }
      .venture-case-notes dt { color: #f0f1f7; font-size: 14px; font-weight: 600; margin-bottom: 14px; }
      .venture-case-notes dd { margin: 0; color: #b8bfd0; font-size: 15px; line-height: 1.65; }
      .venture-case-notes > a { display: inline-flex; align-items: center; gap: 24px; min-height: 44px; margin-top: 24px; color: #edf0f8; font-size: 14px; border-bottom: 1px solid #b8bfd755; }
      .venture-case-notes > a:hover { border-bottom-color: #edf0f8; }
      .venture-case-notes > a:focus-visible { outline: 2px solid #edf0f8; outline-offset: 5px; }
      @media (max-width: 760px) { .venture-case-notes dl { grid-template-columns: 1fr; } }
    `}</style>
  </section>;
}
