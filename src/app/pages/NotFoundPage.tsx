// NotFoundPage — Tier 2 / use 06.
//
// 404 / no-match route handler. Replaces the default react-router blank
// page with a fully editorial moment: monumental "A" lockup, mono caption
// "ROUTE NOT FOUND · 404", a brief bilingual line of copy, and a single
// back-to-home button.
//
// Why a page instead of a redirect: a 404 *is* an editorial signal —
// "you're somewhere intentional, just not where the content is." A
// redirect to home hides that signal, and breaks browser back-button
// expectation. We serve a real 404 page with the brand voice intact.

import { Link, useLocation } from 'react-router'
import { AvanteLockup } from '@/app/components/AvanteLockup'

export default function NotFoundPage() {
  // Infer locale from the URL pathname directly. We don't call useLanguage()
  // because the top-level catch-all route renders OUTSIDE LocaleLayout (no
  // LanguageProvider in the tree), and React forbids hooks in try/catch.
  const location = useLocation()
  const language: 'en' | 'pt' | 'es' = location.pathname.startsWith('/pt')
    ? 'pt'
    : location.pathname.startsWith('/es')
      ? 'es'
      : 'en'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--avt-ink)',
        color: 'var(--avt-txt)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        gap: '40px',
        textAlign: 'center',
      }}
    >
      {/* Monumental mark — same scale as the footer signature. Reads as
          editorial "we put our name on this miss" rather than apologetic. */}
      <AvanteLockup size="xl" markOnly ariaLabel="Avante 404" />

      <div
        style={{
          fontFamily: 'var(--avt-font-body)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: 'var(--avt-meta)',
        }}
      >
        {language === 'pt'
          ? '404 · rota não encontrada'
          : language === 'es'
            ? '404 · ruta no encontrada'
            : '404 · route not found'}
      </div>

      <h1
        style={{
          fontFamily: 'var(--avt-font-display)',
          fontWeight: 500,
          fontSize: 'clamp(40px, 6vw, 88px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: '#fff',
          margin: 0,
          maxWidth: '760px',
        }}
      >
        {language === 'pt' ? (
          <>
            Esta página{' '}
            <span className="avt-grad">não existe.</span>
          </>
        ) : language === 'es' ? (
          <>
            Esta página{' '}
            <span className="avt-grad">no existe.</span>
          </>
        ) : (
          <>
            This page{' '}
            <span className="avt-grad">does not exist.</span>
          </>
        )}
      </h1>

      <p
        style={{
          fontFamily: 'var(--avt-font-display)',
          fontWeight: 400,
          fontSize: 'clamp(16px, 1.6vw, 20px)',
          color: '#cdd2ee',
          lineHeight: 1.4,
          maxWidth: '560px',
          margin: 0,
        }}
      >
        {language === 'pt'
          ? 'Talvez a URL esteja incorreta, ou movemos esta página enquanto você não estava olhando. Em qualquer caso, voltar ao início é o caminho mais curto.'
          : language === 'es'
            ? 'Tal vez la URL está mal escrita, o tal vez movimos esta página mientras no mirabas. En cualquier caso, volver al inicio es el camino más corto.'
            : 'Maybe the URL is mistyped, or maybe we moved this page while you weren’t looking. Either way, heading home is the shortest path.'}
      </p>

      <Link
        to={`/${language}`}
        style={{
          marginTop: '8px',
          padding: '14px 22px',
          fontFamily: 'var(--avt-font-body)',
          fontSize: '12.5px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#06070d',
          background: 'var(--avt-grad)',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 24px rgba(236, 95, 114, 0.3)',
        }}
      >
        {language === 'pt' ? 'Voltar ao início' : language === 'es' ? 'Volver al inicio' : 'Back to home'}
        <span aria-hidden>↗</span>
      </Link>
    </main>
  )
}
