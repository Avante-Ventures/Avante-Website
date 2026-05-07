// Bilingual URL routing: /en/* and /pt/*. Phase 3 of SEO+GEO migration.
//
// /              -> Navigate to /<detected-locale> (browser Accept-Language)
// /en, /pt       -> HomePage in that locale
// /<locale>/why-avante, /<locale>/library
// /<unknown-locale>/* -> redirect to default locale
//
// Why URL-based instead of state: Google + LLMs need DISTINCT URLs per
// language to index PT content. State-only toggle is invisible to crawlers.

import { createBrowserRouter, Outlet, Navigate, useParams } from "react-router"
import HomePage from "./pages/HomePage.tsx"
import { LanguageProvider, type Language } from "@/app/hooks/useLanguage"

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
const HeroConceptsPage = () =>
  import('./pages/HeroConceptsPage.tsx').then((m) => ({ Component: m.default }))

const SUPPORTED_LOCALES: Language[] = ['en', 'pt']
const DEFAULT_LOCALE: Language = 'en'

function detectLocale(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('pt')) return 'pt'
  return DEFAULT_LOCALE
}

function RootRedirect() {
  return <Navigate to={`/${detectLocale()}`} replace />
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>()
  if (!locale || !SUPPORTED_LOCALES.includes(locale as Language)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }
  return (
    <LanguageProvider locale={locale as Language}>
      <Outlet />
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
    ],
  },
])
