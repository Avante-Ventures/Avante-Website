// Research areas grounded in the Avante umbrella and brand-truth domains.
// These are questions to investigate, not announced companies or launch plans.

import { useLanguage } from '@/app/hooks/useLanguage'

interface PipelineVenture {
  name: string
  tagline: string
  bullets: string[]
  // A quiet divider color for each research area.
  color: string
}

export function VenturePipeline() {
  const { language } = useLanguage()
  const t = (en: string, pt: string, es: string) => ({ en, pt, es })[language]

  const pipelineVentures: PipelineVenture[] = [
    {
      name: t('Judicial assets', 'Créditos judiciais', 'Créditos judiciales'),
      tagline: t('Where does the payment process break down?', 'Onde o processo de pagamento trava?', '¿Dónde se atasca el proceso de pago?'),
      bullets: [
        t('How claims are identified and reviewed', 'Como os créditos são identificados e analisados', 'Cómo se identifican y revisan los créditos'),
        t('What lawyers need to assess a proposal', 'O que advogados precisam para avaliar uma proposta', 'Qué necesitan los abogados para evaluar una propuesta'),
        t('Where data can improve the workflow', 'Onde dados podem melhorar o fluxo de trabalho', 'Dónde los datos pueden mejorar el proceso'),
      ],
      color: '#98509A',
    },
    {
      name: t('Insurance operations', 'Operações de seguros', 'Operaciones de seguros'),
      tagline: t('Which decisions need better information?', 'Quais decisões precisam de informações melhores?', '¿Qué decisiones necesitan mejor información?'),
      bullets: [
        t('How quote requests reach the right team', 'Como pedidos de cotação chegam ao time certo', 'Cómo llegan las solicitudes al equipo adecuado'),
        t('What underwriters need to evaluate risk', 'O que subscritores precisam para avaliar riscos', 'Qué necesita suscripción para evaluar riesgos'),
        t('How new tools connect to existing systems', 'Como novas ferramentas se conectam aos sistemas existentes', 'Cómo se conectan las herramientas a los sistemas existentes'),
      ],
      color: '#ec5f72',
    },
    {
      name: t('Real estate data', 'Dados imobiliários', 'Datos inmobiliarios'),
      tagline: t('What makes an auction opportunity legible?', 'O que torna uma oportunidade de leilão compreensível?', '¿Qué permite entender una oportunidad en una subasta?'),
      bullets: [
        t('Collecting fragmented property information', 'Reunir informações dispersas sobre imóveis', 'Reunir información dispersa sobre propiedades'),
        t('Connecting listings with supporting records', 'Conectar anúncios a registros de apoio', 'Conectar anuncios con los registros disponibles'),
        t('Making comparison and due diligence easier', 'Facilitar comparação e análise', 'Facilitar la comparación y el análisis'),
      ],
      color: '#3a2f8f',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {pipelineVentures.map((venture, index) => {
        return (
          <div
            key={index}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              padding: '32px',
              cursor: 'default',
              border: `1px solid ${venture.color}33`,
              background: 'var(--avt-ink-2)',
            }}
          >
            <p style={{ margin: '0 0 18px', color: 'var(--avt-meta)', fontSize: 12 }}>
              {t('Research theme', 'Tema de pesquisa', 'Tema de investigación')}
            </p>

            {/* Name */}
            <h3
              style={{
                fontFamily: 'var(--avt-font-display)',
                fontSize: 'clamp(26px, 2.4vw, 32px)',
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: '#fff',
                margin: '0 0 10px 0',
                lineHeight: 1,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {venture.name}
            </h3>

            {/* The research question */}
            <p
              style={{
                fontFamily: 'var(--avt-font-display)',
                fontSize: '17px',
                fontWeight: 400,
                color: '#cdd2ee',
                margin: '0 0 22px 0',
                lineHeight: 1.3,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {venture.tagline}
            </p>

            {/* Areas of inquiry */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {venture.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.82)',
                    lineHeight: 1.55,
                  }}
                >
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
