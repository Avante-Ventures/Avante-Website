// Per-page SEO + GEO meta + JSON-LD injection.
//
// Now bilingual (Phase 3): canonical resolves to the active /<locale>/path,
// and hreflang alternates declare the EN ↔ PT pair plus an x-default that
// points to /en (matches the routes.tsx default-locale fallback).
//
// The Phase 0 baseline (Organization + WebSite schemas, default OG image,
// favicons) lives in index.html and is shared across all routes; this
// component overrides the per-route fields and adds a third schema
// describing the page itself.

import { Helmet } from 'react-helmet-async'
import { useLanguage } from '@/app/hooks/useLanguage'

export interface SEOHelmetProps {
  /** Page-specific title (will be appended with " — Avante Ventures") */
  title: string
  /** Concise meta description, ≤160 chars ideally */
  description: string
  /** Path relative to the locale root, e.g. "" for home, "/why-avante", "/library" */
  pathname: string
  /** Optional OG image override; defaults to /og-image.png */
  image?: string
  /** Page-specific JSON-LD object (Article, CollectionPage, etc.) */
  jsonLd?: object
}

const SITE_NAME = 'Avante Ventures'
const ORIGIN = 'https://avanteventures.com'
const DEFAULT_IMAGE = `${ORIGIN}/og-image.png`
const SUPPORTED_LOCALES = ['en', 'pt'] as const
const HREFLANG_MAP: Record<string, string> = {
  en: 'en',
  pt: 'pt-BR',
}

export function SEOHelmet({
  title,
  description,
  pathname,
  image = DEFAULT_IMAGE,
  jsonLd,
}: SEOHelmetProps) {
  const { language } = useLanguage()
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`

  // Normalize pathname: ensure leading slash, no trailing slash (except home)
  const normalized = pathname && !pathname.startsWith('/') ? `/${pathname}` : pathname
  const canonical = `${ORIGIN}/${language}${normalized}`
  const ogLocale = language === 'pt' ? 'pt_BR' : 'en_US'
  const ogLocaleAlt = language === 'pt' ? 'en_US' : 'pt_BR'

  return (
    <Helmet>
      <html lang={HREFLANG_MAP[language]} />

      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates — tell Google + LLMs which version is which */}
      {SUPPORTED_LOCALES.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={HREFLANG_MAP[loc]}
          href={`${ORIGIN}/${loc}${normalized}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${ORIGIN}/en${normalized}`} />

      {/* OpenGraph (override Phase 0 defaults) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
