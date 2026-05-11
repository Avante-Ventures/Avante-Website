// ContactDoors — Phase D.
//
// Three mailto-targeted cells: Founders, Investors (LPs), Press. Replaces
// the all-inclusive single ContactForm CTA pattern with a "pick your door"
// editorial pattern that:
//   • Routes the inquiry to the right inbox without a form (no friction).
//   • Telegraphs that each audience gets a dedicated reply path.
//   • Creates a memorable visual moment ("Founders. LPs. Press.") with
//     monumental Funnel Display titles, 48px on desktop.
//
// The middle door (LPs) gets a gradient title to flag that Vintage 1 is
// the live commercial moment of the firm right now. The other two stay
// solid white. This is intentional emphasis, not chrome.
//
// Hover behavior: padding-left grows from 48px → 56px (subtle "the door
// is opening"), background fills to var(--avt-ink-2). No lift transform —
// the padding shift is the language.

import { useLanguage } from '@/app/hooks/useLanguage'

interface DoorSpec {
  id: 'founders' | 'lps' | 'press'
  number: string
  meta: { en: string; pt: string; es: string }
  title: { en: string; pt: string; es: string }
  body: { en: string; pt: string; es: string }
  email: string
  /** When true, the title renders in the gradient. */
  emphasize?: boolean
}

const DOORS: DoorSpec[] = [
  {
    id: 'founders',
    number: '001',
    meta: { en: 'door 001', pt: 'porta 001', es: 'puerta 001' },
    title: { en: 'Founders.', pt: 'Founders.', es: 'Founders.' },
    body: {
      en: 'Send the deck, the demo, or the codebase. Replies signed by a partner within seven days. We read every memo. Twice.',
      pt: 'Envie o deck, o demo, ou o codebase. Respostas assinadas por um partner em sete dias. Lemos cada memo. Duas vezes.',
      es: 'Envía el deck, el demo, o el codebase. Respuestas firmadas por un partner en siete días. Leemos cada memo. Dos veces.',
    },
    email: 'cristian@avanteventures.com',
  },
  {
    id: 'lps',
    number: '002',
    meta: {
      en: 'door 002 — open to LPs',
      pt: 'porta 002 — aberta a LPs',
      es: 'puerta 002 — abierta a LPs',
    },
    title: { en: 'LPs.', pt: 'LPs.', es: 'LPs.' },
    body: {
      en: 'We are open to LP conversations. Quarterly portfolio updates and operating dashboards available under NDA. We share more, not less.',
      pt: 'Estamos abertos a conversas com LPs. Updates trimestrais de portfólio e dashboards operacionais disponíveis sob NDA. Compartilhamos mais, não menos.',
      es: 'Estamos abiertos a conversaciones con LPs. Updates trimestrales de portafolio y dashboards operativos disponibles bajo NDA. Compartimos más, no menos.',
    },
    email: 'cristian@avanteventures.com',
    emphasize: true,
  },
  {
    id: 'press',
    number: '003',
    meta: { en: 'door 003', pt: 'porta 003', es: 'puerta 003' },
    title: { en: 'Press.', pt: 'Imprensa.', es: 'Prensa.' },
    body: {
      en: 'For coverage on the firm or its ventures. We respond within 48h with the founder we’d like you to talk to instead of us.',
      pt: 'Para cobertura sobre o studio ou suas ventures. Respondemos em 48h com o founder com quem gostaríamos que você falasse no nosso lugar.',
      es: 'Para cobertura sobre el studio o sus ventures. Respondemos en 48h con el founder con quien preferiríamos que hables en lugar de nosotros.',
    },
    email: 'cristian@avanteventures.com',
  },
]

export function ContactDoors() {
  const { language } = useLanguage()
  const pick = <T,>(en: T, pt: T, es?: T): T =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en

  return (
    <div
      className="avt-doors"
      style={{
        display: 'grid',
        gap: 0,
        border: '1px solid var(--avt-hair)',
        background: 'var(--avt-ink)',
      }}
    >
      {DOORS.map((door, i) => (
        <a
          key={door.id}
          className="avt-door"
          href={`mailto:${door.email}?subject=${encodeURIComponent(door.title.en.replace('.', ''))} — Avante`}
          style={{
            padding: '48px',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'background 0.25s ease, padding-left 0.25s ease',
            borderRight: i < DOORS.length - 1 ? '1px solid var(--avt-hair)' : 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--avt-ink-2)'
            e.currentTarget.style.paddingLeft = '56px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.paddingLeft = '48px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--avt-font-body)',
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--avt-meta)',
                marginBottom: '24px',
              }}
            >
              {pick(door.meta.en, door.meta.pt, door.meta.es)}
            </div>
            <h3
              style={{
                fontFamily: 'var(--avt-font-display)',
                fontWeight: 500,
                fontSize: 'clamp(36px, 4vw, 56px)',
                color: door.emphasize ? 'transparent' : '#fff',
                background: door.emphasize ? 'var(--avt-grad)' : 'none',
                WebkitBackgroundClip: door.emphasize ? 'text' : 'unset',
                backgroundClip: door.emphasize ? 'text' : 'unset',
                letterSpacing: '-0.025em',
                lineHeight: 1,
                margin: '0 0 20px 0',
              }}
            >
              {pick(door.title.en, door.title.pt, door.title.es)}
            </h3>
          </div>

          <p
            style={{
              fontSize: '14.5px',
              color: 'var(--avt-muted)',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              maxWidth: '34ch',
            }}
          >
            {pick(door.body.en, door.body.pt, door.body.es)}
          </p>

          <div
            style={{
              fontFamily: 'var(--avt-font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--avt-meta)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{door.email}</span>
            <span aria-hidden>↗</span>
          </div>
        </a>
      ))}

      <style>{`
        .avt-doors {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .avt-doors { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 899px) {
          .avt-door { border-right: none !important; border-bottom: 1px solid var(--avt-hair); }
          .avt-door:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
