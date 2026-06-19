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
  /** When true, emits robots noindex,follow, used for stub articles that
   *  do not yet have full content. Prevents thin-content from dragging the
   *  domain authority while still allowing the page to be discoverable
   *  through internal links. */
  noindex?: boolean
}

const SITE_NAME = 'Avante Ventures'
const ORIGIN = 'https://avanteventures.com'
const DEFAULT_IMAGE = `${ORIGIN}/og-image.png`
const SUPPORTED_LOCALES = ['en', 'pt', 'es'] as const
const HREFLANG_MAP: Record<string, string> = {
  en: 'en',
  pt: 'pt-BR',
  es: 'es',
}
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  pt: 'pt_BR',
  es: 'es_419', // Latin American Spanish, matches our LATAM positioning
}

export function SEOHelmet({
  title,
  description,
  pathname,
  image = DEFAULT_IMAGE,
  jsonLd,
  noindex = false,
}: SEOHelmetProps) {
  const { language } = useLanguage()
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`

  // Normalize pathname: ensure leading slash, no trailing slash (except home)
  const normalized = pathname && !pathname.startsWith('/') ? `/${pathname}` : pathname
  const canonical = `${ORIGIN}/${language}${normalized}`
  const ogLocale = OG_LOCALE_MAP[language] ?? OG_LOCALE_MAP.en
  const ogLocaleAlternates = SUPPORTED_LOCALES.filter((l) => l !== language).map(
    (l) => OG_LOCALE_MAP[l]
  )

  return (
    <Helmet>
      <html lang={HREFLANG_MAP[language]} />

      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Robots: emit per-route so we own the value (and so the static HTML
          baseline does not silently duplicate the tag). Default = full index;
          stub articles flip to noindex,follow to avoid thin-content penalties
          while still letting link equity flow through. */}
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex,follow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      {/* hreflang alternates: tell Google + LLMs which version is which */}
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
      {ogLocaleAlternates.map((alt) => (
        <meta key={alt} property="og:locale:alternate" content={alt} />
      ))}

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
