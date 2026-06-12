// Bilingual URL routing: /en/* and /pt/*. Phase 3 of SEO+GEO migration.
//
// /              -> Navigate to /<detected-locale> (browser Accept-Language)
// /en, /pt       -> HomePage in that locale
// /<locale>/why-avante, /<locale>/library
// /<unknown-locale>/* -> redirect to default locale
//
// Why URL-based instead of state: Google + LLMs need DISTINCT URLs per
// language to index PT content. State-only toggle is invisible to crawlers.

import { useEffect } from 'react'
import { createBrowserRouter, Outlet, Navigate, useParams, useNavigation, useLocation } from "react-router"
import HomePage from "./pages/HomePage.tsx"
import { LanguageProvider, type Language } from "@/app/hooks/useLanguage"
import { AvtSpinner } from "@/app/components/AvtSpinner"

// HomePage stays in the main bundle (it's the LCP-critical entry route).
// Sub-pages are heavy (JSX + framer-motion + article content) and only
// loaded on demand. Saves ~150 KB from the initial bundle download for
// users who never click into them.
const WhyAvantePage = () =>
  import('./pages/WhyAvantePage.tsx').then((m) => ({ Component: m.default }))
const LibraryPage = () =>
  import('./pages/LibraryPage.tsx').then((m) => ({ Component: m.default }))
const ArticlePage = () =>
  import('./pages/ArticlePage.tsx').then((m) => ({ Component: m.default }))
const PortfolioPage = () =>
  import('./pages/PortfolioPage.tsx').then((m) => ({ Component: m.default }))
const InvestorsPage = () =>
  import('./pages/InvestorsPage.tsx').then((m) => ({ Component: m.default }))
const PrinciplesPage = () =>
  import('./pages/PrinciplesPage.tsx').then((m) => ({ Component: m.default }))
const HeroConceptsPage = () =>
  import('./pages/HeroConceptsPage.tsx').then((m) => ({ Component: m.default }))
// 404 page is small and shipped eagerly — it must be available the moment
// a no-match is detected (no chunk download for an error state).
import NotFoundPage from './pages/NotFoundPage.tsx'

const SUPPORTED_LOCALES: Language[] = ['en', 'pt', 'es']
const DEFAULT_LOCALE: Language = 'en'

function detectLocale(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('pt')) return 'pt'
  if (lang.startsWith('es')) return 'es'
  return DEFAULT_LOCALE
}

function RootRedirect() {
  return <Navigate to={`/${detectLocale()}`} replace />
}

// Scroll-to-top on navigation. react-router does NOT reset scroll position on
// navigation, so clicking the Avante logo (or any route link) used to leave the
// viewport wherever it was: clicking the logo while scrolled into a sub-page
// changed the route to home but kept you at the footer, so it read as "the link
// doesn't go back to the main page". We key on location.key (not pathname) so it
// ALSO fires when re-clicking the logo on the same route, and we skip when there
// is a hash so in-page anchors (#playbook, #contact) still scroll to their target.
function ScrollToTopOnNavigate() {
  const { key, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    // 'instant' opts out of the global `html { scroll-behavior: smooth }`
    // (index.css / theme.css). On navigation we want an immediate jump to the
    // top, not a 1s+ glide through the new page; smooth stays for the in-page
    // anchor clicks (#playbook, #contact) that set it explicitly.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, hash])
  return null
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>()
  // useNavigation() lets us detect when react-router is loading a `lazy:`
  // route module so we can overlay the brand spinner instead of letting
  // the navigation hang silently. The current page stays visible behind
  // the overlay — no flash of blank background.
  const navigation = useNavigation()
  const isLoadingRoute = navigation.state === 'loading'

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Language)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }
  return (
    <LanguageProvider locale={locale as Language}>
      <ScrollToTopOnNavigate />
      <Outlet />
      {isLoadingRoute && (
        <AvtSpinner
          fullViewport
          size="xl"
          caption={locale === 'pt' ? 'Carregando…' : locale === 'es' ? 'Cargando…' : 'Loading…'}
        />
      )}
    </LanguageProvider>
  )
}

export const router = createBrowserRouter([
  // Root: detect browser language, redirect
  { path: "/", element: <RootRedirect /> },

  // Internal preview pages — listed BEFORE /:locale so the locale matcher
  // doesn't swallow "preview". Have noindex meta tag in the page itself.
  { path: "/preview/heroes", lazy: HeroConceptsPage },

  // Locale-prefixed routes
  {
    path: "/:locale",
    element: <LocaleLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "why-avante", lazy: WhyAvantePage },
      { path: "library", lazy: LibraryPage },
      { path: "library/:slug", lazy: ArticlePage },
      { path: "portfolio", lazy: PortfolioPage },
      { path: "investors", lazy: InvestorsPage },
      { path: "principles", lazy: PrinciplesPage },
      // Catch-all 404 within the locale layout — preserves the EN/PT context
      // so the NotFoundPage renders in the right language for the URL.
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // Top-level catch-all (no locale matched) — falls back to NotFoundPage.
  // The page itself infers locale from the URL pathname.
  { path: "*", element: <NotFoundPage /> },
])
