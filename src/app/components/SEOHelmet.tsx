// Per-page SEO + GEO meta + JSON-LD injection.
//
// Wraps react-helmet-async with sane defaults so each Page just declares
// its title/description/jsonLd. The Phase 0 baseline lives in index.html
// (Organization + WebSite schemas, default OG image); this component
// overrides per-route fields and adds a third schema describing the page
// itself.

import { Helmet } from 'react-helmet-async'

export interface SEOHelmetProps {
  /** Page-specific title (will be appended with " — Avante Ventures") */
  title: string
  /** Concise meta description, ≤160 chars ideally */
  description: string
  /** Canonical URL for this route (full https URL) */
  canonical: string
  /** Optional OG image override; defaults to /og-image.png */
  image?: string
  /** Page-specific JSON-LD object (Article, CollectionPage, etc.) */
  jsonLd?: object
}

const SITE_NAME = 'Avante Ventures'
const DEFAULT_IMAGE = 'https://avanteventures.com/og-image.png'

export function SEOHelmet({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  jsonLd,
}: SEOHelmetProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph (override Phase 0 defaults) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

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
