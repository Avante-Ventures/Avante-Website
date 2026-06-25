// VenturePipeline, Round 8 redesign.
//
// The previous cards read flat and identical, same eyebrow, same bullet
// list, same color. Operators flipping through them couldn't tell which
// venture was further along or which had personality.
//
// New design language:
//   1. Big monogram (the venture's first letter as a 96px gradient glyph).
//      Each venture earns its own visual identity from glyph alone.
//   2. Color-tinted gradient background per venture, not all gold.
//   3. Stage indicator: 5-segment progress bar showing where the venture
//      sits in the studio playbook (Research → Partner → Build → Traction
//      → Revenue). Reads at a glance.
//   4. Launch ETA badge: "Q2 2026" mono uppercase. Reduces "vaporware"
//      perception of the whole pipeline by anchoring each card to a date.
//   5. Hover: card lifts + glow blooms in the venture's color, monogram
//      scales 1.05× with a 200ms transition. Reads as "this thing is alive."
//   6. Editorial bullets with custom geometric markers (◆ instead of ●).

import { useLanguage } from '@/app/hooks/useLanguage'

interface PipelineVenture {
  name: string
  monogram: string // single letter for the visual identity
  tagline: string
  bullets: string[]
  // Visual personality: primary color + accent for gradients/glows.
  color: string
  accentColor: string
  // Stage 1–5 of the studio playbook. 5 = ready to launch.
  stage: 1 | 2 | 3 | 4 | 5
  // Expected public launch window (e.g. "Q2 2026").
  eta: string
}

export function VenturePipeline() {
  const { language } = useLanguage()
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)

  const pipelineVentures: PipelineVenture[] = [
    {
      name: 'Pulse.ai',
      monogram: 'P',
      tagline: t('WhatsApp Sales for CPG', 'Vendas por WhatsApp para CPG'),
      bullets: [
        t('Conversational commerce at scale', 'Comércio conversacional em escala'),
        t('Automated order fulfillment', 'Captação e expedição automatizadas'),
        t('Real-time inventory sync', 'Sincronia de estoque em tempo real'),
      ],
      color: '#98509A',
      accentColor: '#C47EC6',
      stage: 1,
      eta: 'Q4 2026',
    },
    {
      name: 'RADAR.ai',
      monogram: 'R',
      tagline: t('Market Intelligence for Investors', 'Inteligência de mercado para investidores'),
      bullets: [
        t('Real-time sector trend analysis', 'Análise setorial em tempo real'),
        t('Automated deal sourcing pipeline', 'Pipeline de sourcing automatizado'),
        t('Competitive landscape mapping', 'Mapeamento do cenário competitivo'),
      ],
      color: '#ec5f72',
      accentColor: '#F9B437',
      stage: 3,
      eta: 'Q2 2026',
    },
    {
      name: 'ROTA.ai',
      monogram: 'R',
      tagline: t('AI Procurement Hub', 'Procurement inteligente'),
      bullets: [
        t('Intelligent vendor matching', 'Matching inteligente de fornecedores'),
        t('Automated RFP generation', 'Geração automática de RFPs'),
        t('Contract negotiation assistance', 'Assistência em negociação contratual'),
      ],
      color: '#3a2f8f',
      accentColor: '#a8429b',
      stage: 1,
      eta: 'Q4 2026',
    },
  ]

  const stageLabels = [
    t('Research', 'Pesquisa'),
    t('Partner', 'Parceiros'),
    t('Build', 'Build'),
    t('Traction', 'Tração'),
    t('Revenue', 'Receita'),
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pipelineVentures.map((venture, index) => {
        const stageLabel = stageLabels[venture.stage - 1]
        return (
          <div
            key={index}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '14px',
              padding: '32px',
              cursor: 'default',
              border: `1px solid ${venture.color}33`,
              background: `linear-gradient(140deg, ${venture.color}0F 0%, transparent 65%), var(--avt-ink-2)`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.borderColor = `${venture.color}88`
              e.currentTarget.style.boxShadow = `0 22px 50px ${venture.color}44`
              const mono = e.currentTarget.querySelector('[data-monogram]') as HTMLElement
              if (mono) mono.style.transform = 'scale(1.06)'
              const glow = e.currentTarget.querySelector('[data-glow]') as HTMLElement
              if (glow) glow.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = `${venture.color}33`
              e.currentTarget.style.boxShadow = 'none'
              const mono = e.currentTarget.querySelector('[data-monogram]') as HTMLElement
              if (mono) mono.style.transform = 'scale(1)'
              const glow = e.currentTarget.querySelector('[data-glow]') as HTMLElement
              if (glow) glow.style.opacity = '0.45'
            }}
          >
            {/* Color glow blob (decorative, behind content) */}
            <div
              data-glow
              aria-hidden
              style={{
                position: 'absolute',
                top: '-30%',
                right: '-15%',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${venture.color}55 0%, transparent 70%)`,
                filter: 'blur(50px)',
                pointerEvents: 'none',
                opacity: 0.45,
                transition: 'opacity 0.4s ease',
              }}
            />

            {/* Top row: monogram + ETA badge */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '20px',
                zIndex: 1,
              }}
            >
              <span
                data-monogram
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '72px',
                  height: '72px',
                  fontFamily: 'var(--avt-font-display)',
                  fontSize: '64px',
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  background: `linear-gradient(135deg, ${venture.accentColor} 0%, ${venture.color} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {venture.monogram}
              </span>

              {/* ETA chip */}
              <span
                style={{
                  fontFamily: 'var(--avt-font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: venture.accentColor,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: `1px solid ${venture.color}55`,
                  background: `${venture.color}14`,
                  whiteSpace: 'nowrap',
                }}
              >
                {venture.eta}
              </span>
            </div>

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

            {/* Tagline in gradient */}
            <p
              style={{
                fontFamily: 'var(--avt-font-display)',
                fontSize: '17px',
                fontWeight: 400,
                background: `linear-gradient(90deg, ${venture.accentColor} 0%, ${venture.color} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 22px 0',
                lineHeight: 1.3,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {venture.tagline}
            </p>

            {/* Bullets with custom diamond markers */}
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
                  <span
                    aria-hidden
                    style={{
                      color: venture.accentColor,
                      fontSize: '9px',
                      lineHeight: 1.8,
                      flexShrink: 0,
                    }}
                  >
                    ◆
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Stage indicator: 5-segment progress bar */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                paddingTop: '18px',
                borderTop: `1px solid ${venture.color}22`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontFamily: 'var(--avt-font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--avt-meta)',
                }}
              >
                <span>
                  {t('Stage', 'Estágio')} {venture.stage}/5 · <span style={{ color: venture.accentColor }}>{stageLabel}</span>
                </span>
                <span style={{ color: 'var(--avt-meta)' }}>
                  {Math.round((venture.stage / 5) * 100)}%
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  height: '4px',
                }}
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    style={{
                      flex: 1,
                      height: '100%',
                      borderRadius: '2px',
                      background:
                        s <= venture.stage
                          ? `linear-gradient(90deg, ${venture.accentColor} 0%, ${venture.color} 100%)`
                          : 'rgba(255, 255, 255, 0.06)',
                      transition: 'background 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
