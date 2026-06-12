// ContactDoors — Phase D.
//
// A single mailto-targeted cell: one general contact door. Replaces the
// all-inclusive single ContactForm CTA pattern with a "pick your door"
// editorial pattern that:
//   • Routes the inquiry to the inbox without a form (no friction).
//   • Telegraphs a single, dedicated reply path.
//   • Creates a memorable visual moment ("Contact.") with a monumental
//     Funnel Display title, 48px on desktop.
//
// The door keeps a gradient title so the moment reads as a deliberate
// focal point rather than flat chrome. This is intentional emphasis.
//
// Hover behavior: padding-left grows from 48px → 56px (subtle "the door
// is opening"), background fills to var(--avt-ink-2). No lift transform —
// the padding shift is the language.

import { useLanguage } from '@/app/hooks/useLanguage'

interface DoorSpec {
  id: 'contact'
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
    id: 'contact',
    number: '001',
    meta: {
      en: 'door 001 — contact',
      pt: 'porta 001 — contato',
      es: 'puerta 001 — contacto',
    },
    title: { en: 'Contact.', pt: 'Contato.', es: 'Contacto.' },
    body: {
      en: 'General inquiries — partnerships, press, or anything else. A partner replies, signed, within seven days. We read every message.',
      pt: 'Consultas gerais — parcerias, imprensa, ou qualquer outra coisa. Um partner responde, assinado, em sete dias. Lemos cada mensagem.',
      es: 'Consultas generales — alianzas, prensa, o cualquier otra cosa. Un partner responde, firmado, en siete días. Leemos cada mensaje.',
    },
    email: 'cristian@avanteventures.com',
    emphasize: true,
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
            minHeight: '260px',
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
          .avt-doors { grid-template-columns: 1fr; }
        }
        @media (max-width: 899px) {
          .avt-door { border-right: none !important; border-bottom: 1px solid var(--avt-hair); }
          .avt-door:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  )
}
