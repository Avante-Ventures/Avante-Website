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
import WhyAvantePage from "./pages/WhyAvantePage.tsx"
import LibraryPage from "./pages/LibraryPage.tsx"
import { LanguageProvider, type Language } from "@/app/hooks/useLanguage"

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

  // Locale-prefixed routes
  {
    path: "/:locale",
    element: <LocaleLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "why-avante", element: <WhyAvantePage /> },
      { path: "library", element: <LibraryPage /> },
    ],
  },
])
