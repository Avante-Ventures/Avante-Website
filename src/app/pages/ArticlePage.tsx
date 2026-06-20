import { useParams, Link, Navigate } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { BackToTop } from '@/app/components/BackToTop'
import { Footer } from '@/app/components/Footer'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { AvanteLockup } from '@/app/components/AvanteLockup'
import { articleBySlug, type ArticleSection } from '@/app/data/articles'

export default function ArticlePage() {
  const { language } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to={`/${language}/library`} replace />
  }

  // Resolve content with locale-aware fallback. ES gets its own slot when
  // available; otherwise falls back to EN (and we render a banner so the
  // visitor knows the translation is in flight). This keeps the URL stable
  // for Google (canonical /es/library/<slug> is real) without lying about
  // the language served right now.
  const hasEsContent = !!article.es
  const content =
    language === 'pt'
      ? article.pt
      : language === 'es' && article.es
        ? article.es
        : article.en
  const isEsFallingBackToEn = language === 'es' && !hasEsContent
  const t = (en: string, pt: string, es?: string) =>
    language === 'pt' ? pt : language === 'es' && es !== undefined ? es : en

  // JSON-LD Article schema — declares this page to LLMs and Google as a
  // first-class Article authored by Avante Ventures. inLanguage tracks the
  // URL's locale, not the served content; with hreflang declared on the
  // sitemap + SEOHelmet, this is the correct signal.
  //
  // GEO enrichment (Apr 2026): added `keywords`, `about`, and `mentions`.
  // Schema.org signals that LLM crawlers + Google AI Overviews actively
  // parse to understand topical scope. A bare Article schema is enough for
  // ranking; these three fields are what gets you cited in answers.
  const inLanguage =
    language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en'
  const taxonomy = articleTaxonomy(article.slug)
  const articleUrl = `https://avanteventures.com/${language}/library/${article.slug}`
  const breadcrumbHome = t('Home', 'Início', 'Inicio')
  const breadcrumbLibrary = t('Library', 'Biblioteca', 'Biblioteca')

  // Combined JSON-LD using the canonical @graph form: a single
  // @context applies to all nodes inside the array. This lets Google +
  // LLMs resolve the Article and BreadcrumbList as related parts of the
  // same page without parsing two separate <script> tags.
  //
  // GEO E-E-A-T moves layered in here:
  //   - `author` is the named Founding Team (E-E-A-T author entity)
  //     plus a back-reference to the Organization @id.
  //   - `publisher` includes a `logo` ImageObject — Google requires this
  //     to consider the Article schema valid for rich results.
  //   - `keywords` / `about` / `mentions` come from articleTaxonomy()
  //     so each Schema.org Thing the article addresses is named and
  //     (where applicable) sameAs-linked to Wikipedia / official sites.
  //   - `BreadcrumbList` enables the Home › Library › Article trail
  //     to appear in Google search snippets.
  // Per-article social/OG image when provided, else the global brand card.
  const ogImageUrl = article.ogImage
    ? `https://avanteventures.com${article.ogImage}`
    : 'https://avanteventures.com/og-image.png'

  const combinedJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        headline: content.title,
        description: content.description,
        url: articleUrl,
        image: ogImageUrl,
        inLanguage,
        datePublished: article.datePublished,
        dateModified: article.dateModified ?? article.datePublished,
        articleSection: article.category,
        wordCount: estimateWordCount(content.sections),
        author: [
          {
            '@type': 'Organization',
            '@id': 'https://avanteventures.com/#founding-team',
            name: 'Avante Founding Team',
            url: 'https://avanteventures.com/',
            memberOf: { '@id': 'https://avanteventures.com/#organization' },
          },
          { '@id': 'https://avanteventures.com/#organization' },
        ],
        publisher: {
          '@type': 'Organization',
          '@id': 'https://avanteventures.com/#organization',
          name: 'Avante Ventures',
          logo: {
            '@type': 'ImageObject',
            url: 'https://avanteventures.com/apple-touch-icon.png',
            width: 180,
            height: 180,
          },
        },
        isPartOf: { '@id': 'https://avanteventures.com/#website' },
        mainEntityOfPage: articleUrl,
        keywords: taxonomy.keywords,
        about: taxonomy.about,
        mentions: taxonomy.mentions,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: breadcrumbHome,
            item: `https://avanteventures.com/${language}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbLibrary,
            item: `https://avanteventures.com/${language}/library`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.title,
            item: articleUrl,
          },
        ],
      },
      ...(content.faqs && content.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${articleUrl}#faq`,
              inLanguage,
              mainEntity: content.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--avante-background)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SEOHelmet
        title={content.title}
        description={content.description}
        pathname={`/library/${article.slug}`}
        image={ogImageUrl}
        jsonLd={combinedJsonLd}
        noindex={!article.isPublished}
      />

      <Navbar />
      <BackToTop />

      {/* Background haze */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '60%',
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(152, 80, 154, 0.025) 0%, transparent 60%)',
            opacity: 0.8,
          }}
        />
      </div>

      <article
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 var(--avante-space-6)',
          paddingTop: 'var(--avante-space-20)',
          paddingBottom: 'var(--avante-space-16)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Back link */}
        <Link
          to={`/${language}/library`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '32px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F4A261')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
        >
          <span>←</span> {t('Back to Library', 'Voltar para Biblioteca', 'Volver a la Biblioteca')}
        </Link>

        {/* Tier 2 / use 07 — Editorial article anchor. Replaces the absent
            featured image with the gradient "A" mark. Acts as a visual
            "Avante essay" stamp at the top of every article body. */}
        <div style={{ marginBottom: '32px' }}>
          <AvanteLockup size="md" markOnly variant="default" ariaLabel="Avante editorial" />
        </div>

        {/* Meta strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ color: '#F9B437', fontWeight: 600 }}>{article.type}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <span>{article.date}</span>
          {!article.isPublished && (
            <>
              <span>·</span>
              <span style={{ color: 'rgba(249, 180, 55, 0.85)', fontWeight: 600 }}>
                {t('Draft', 'Rascunho', 'Borrador')}
              </span>
            </>
          )}
        </div>

        {/* ES translation in-progress notice — shown only when an ES viewer
            lands on a slug that does not yet have a Spanish version. We
            serve the EN body so the page is still useful, and signal
            clearly that the ES translation is on the way. */}
        {isEsFallingBackToEn && (
          <div
            style={{
              margin: '0 0 32px 0',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(249, 180, 55, 0.08)',
              border: '1px solid rgba(249, 180, 55, 0.25)',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.78)',
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: '#F9B437' }}>Traducción al español en proceso.</strong>{' '}
            Por ahora se muestra el contenido original en inglés.
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
          }}
        >
          {content.title}
        </h1>

        {/* Description as lede */}
        <p
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.55,
            margin: '0 0 56px 0',
          }}
        >
          {content.description}
        </p>

        {/* Body */}
        {content.sections.map((section, i) => (
          <Section key={i} section={section} locale={language} />
        ))}

        {content.faqs && content.faqs.length > 0 && (
          <FaqBlock
            faqs={content.faqs}
            locale={language}
            heading={t('Frequently asked questions', 'Perguntas frequentes', 'Preguntas frecuentes')}
          />
        )}

        {/* Tier 3 / use 10 — Newsletter signature. Closes the article as a
            signed editorial letter from the firm rather than an anonymous
            blog post. Sits between the body and the "Browse Library" CTA. */}
        <div
          style={{
            marginTop: '72px',
            paddingTop: '40px',
            borderTop: '1px solid var(--avt-hair)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <AvanteLockup size="md" markOnly variant="default" ariaLabel="" />
          <div
            style={{
              fontFamily: 'var(--avt-font-mono)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--avt-meta)',
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: '#fff' }}>
              {t('— Avante Founding Team', '— Time Fundador da Avante', '— Equipo Fundador de Avante')}
            </div>
            <div style={{ marginTop: '4px' }}>
              {t(
                'São Paulo + San Francisco · written from inside the studio',
                'São Paulo + San Francisco · escrito de dentro do studio',
                'São Paulo + San Francisco · escrito desde dentro del studio'
              )}
            </div>
          </div>
        </div>

        {/* Article footer CTA */}
        <div
          style={{
            marginTop: '64px',
            padding: '32px',
            borderRadius: '16px',
            background: 'rgba(249, 180, 55, 0.04)',
            border: '1px solid rgba(249, 180, 55, 0.15)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 16px 0',
              lineHeight: 1.6,
            }}
          >
            {t(
              'Want more? Get one essay per month on venture building, AI-native businesses, and the Brazil opportunity.',
              'Quer mais? Receba um ensaio por mês sobre venture building, negócios AI-native e a oportunidade Brasil.',
              '¿Quieres más? Recibe un ensayo al mes sobre venture building, negocios AI-native y la oportunidad Brasil.'
            )}
          </p>
          <Link
            to={`/${language}/library`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'rgba(249, 180, 55, 0.15)',
              border: '1px solid rgba(249, 180, 55, 0.4)',
              color: '#F9B437',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(249, 180, 55, 0.25)'
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.7)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(249, 180, 55, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(249, 180, 55, 0.4)'
            }}
          >
            {t('Browse the Library', 'Ver Biblioteca completa', 'Ver Biblioteca completa')} →
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Section renderer
// ─────────────────────────────────────────────────────────────────────

// Parse inline markdown links [label](href) into real anchors so the content
// engine's in-body links (106 internal + external citations) render as
// crawlable <a> tags instead of literal text. Internal hrefs (starting with
// "/") render as locale-prefixed SPA <Link>s; safe external hrefs open in a new
// tab; anything else (e.g. javascript:/data:) stays literal. Plain text passes
// through untouched.
const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g
const SAFE_EXTERNAL = /^(https?:|mailto:|tel:)/i
const LOCALE_PREFIXED = /^\/(en|pt|es)(\/|$)/

function renderRichText(text: string, locale: string): Array<string | JSX.Element> {
  const nodes: Array<string | JSX.Element> = []
  let lastIndex = 0
  let key = 0
  const linkStyle = {
    color: '#F9B437',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  }
  for (const match of text.matchAll(MD_LINK)) {
    const start = match.index ?? 0
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))
    const [, label, href] = match
    const isInternal = href.startsWith('/') && !href.startsWith('//')
    if (isInternal) {
      // Routes are mounted under /:locale, so a bare /library/<slug> must carry
      // the active locale or React Router resolves it from root (locale becomes
      // "library") and LocaleLayout redirects to the homepage.
      const to = LOCALE_PREFIXED.test(href) ? href : `/${locale}${href}`
      nodes.push(
        <Link key={key++} to={to} style={linkStyle}>
          {label}
        </Link>,
      )
    } else if (SAFE_EXTERNAL.test(href)) {
      nodes.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          {label}
        </a>,
      )
    } else {
      // Unknown or unsafe scheme — never promote to an href; keep it literal.
      nodes.push(match[0])
    }
    lastIndex = start + match[0].length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function Section({ section, locale }: { section: ArticleSection; locale: string }) {
  const Heading = (section.level ?? 2) === 3 ? 'h3' : 'h2'
  return (
    <section style={{ marginBottom: '40px' }}>
      {section.heading && (
        <Heading
          style={{
            fontSize: section.level === 3 ? '22px' : '28px',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            margin: section.level === 3 ? '24px 0 12px 0' : '40px 0 16px 0',
          }}
        >
          {section.heading}
        </Heading>
      )}

      {section.paragraphs?.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: '17px',
            lineHeight: 1.75,
            color: 'rgba(255, 255, 255, 0.82)',
            margin: '0 0 18px 0',
          }}
        >
          {renderRichText(p, locale)}
        </p>
      ))}

      {section.bullets && section.bullets.length > 0 && (
        <ul
          className="avt-bullet-list"
          style={{
            // The utility class handles list-style and bullet glyph;
            // we override only font-size + color tone for the article context.
            margin: '8px 0 18px 0',
            color: 'rgba(255, 255, 255, 0.82)',
          }}
        >
          {section.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
              }}
            >
              {renderRichText(b, locale)}
            </li>
          ))}
        </ul>
      )}

      {section.table && <ComparisonTable {...section.table} locale={locale} />}

      {section.callout && <Callout {...section.callout} />}
    </section>
  )
}

function ComparisonTable({
  headers,
  rows,
  caption,
  locale,
}: NonNullable<ArticleSection['table']> & { locale: string }) {
  return (
    <div style={{ margin: '24px 0', overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '15px',
          lineHeight: 1.55,
          color: 'rgba(255, 255, 255, 0.85)',
          minWidth: '480px',
        }}
      >
        {caption && (
          <caption
            style={{
              captionSide: 'bottom',
              fontSize: '13px',
              color: 'var(--avt-meta)',
              textAlign: 'left',
              padding: '10px 0 0 0',
            }}
          >
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderBottom: '1px solid rgba(249, 180, 55, 0.4)',
                  color: '#FCD96E',
                  fontFamily: 'var(--avt-font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {renderRichText(h, locale)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid var(--avt-hair)',
                    fontWeight: ci === 0 ? 600 : 400,
                    color: ci === 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.82)',
                    verticalAlign: 'top',
                  }}
                >
                  {renderRichText(cell, locale)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({
  kind,
  text,
  attribution,
}: NonNullable<ArticleSection['callout']>) {
  const styles: Record<typeof kind, { border: string; bg: string; accent: string }> = {
    quote: {
      border: 'rgba(244, 162, 97, 0.3)',
      bg: 'rgba(244, 162, 97, 0.05)',
      accent: '#F4A261',
    },
    stat: {
      border: 'rgba(152, 80, 154, 0.4)',
      bg: 'rgba(152, 80, 154, 0.08)',
      accent: '#D9A6DA',
    },
    tip: {
      border: 'rgba(249, 180, 55, 0.4)',
      bg: 'rgba(249, 180, 55, 0.06)',
      accent: '#FCD96E',
    },
  }
  const s = styles[kind]
  return (
    <div
      style={{
        margin: '24px 0',
        padding: '20px 24px',
        background: s.bg,
        borderRadius: '0 12px 12px 0',
        // All borders expressed as longhand to avoid React's shorthand-vs-longhand
        // rerender warning. Top/right/bottom share the muted hairline; left is
        // the accent-colored 3px rule that signals the callout kind.
        borderTop: `1px solid ${s.border}`,
        borderRight: `1px solid ${s.border}`,
        borderBottom: `1px solid ${s.border}`,
        borderLeft: `3px solid ${s.accent}`,
      }}
    >
      <p
        style={{
          fontSize: kind === 'quote' ? '18px' : '17px',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.92)',
          margin: 0,
          fontStyle: kind === 'quote' ? 'italic' : 'normal',
          fontWeight: kind === 'stat' ? 600 : 400,
        }}
      >
        {text}
      </p>
      {attribution && (
        <p
          style={{
            fontSize: '13px',
            color: s.accent,
            margin: '12px 0 0 0',
            fontWeight: 500,
          }}
        >
          — {attribution}
        </p>
      )}
    </div>
  )
}

function FaqBlock({
  faqs,
  locale,
  heading,
}: {
  faqs: { q: string; a: string }[]
  locale: string
  heading: string
}) {
  return (
    <section style={{ marginTop: '56px' }}>
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 600,
          color: '#FFFFFF',
          lineHeight: 1.3,
          letterSpacing: '-0.015em',
          margin: '0 0 8px 0',
        }}
      >
        {heading}
      </h2>
      <dl style={{ margin: 0 }}>
        {faqs.map((f, i) => (
          <div
            key={i}
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--avt-hair)',
            }}
          >
            <dt
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.4,
                margin: '0 0 10px 0',
              }}
            >
              {f.q}
            </dt>
            <dd
              style={{
                margin: 0,
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.82)',
              }}
            >
              {renderRichText(f.a, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────

function estimateWordCount(sections: ArticleSection[]): number {
  let count = 0
  for (const s of sections) {
    if (s.heading) count += s.heading.split(/\s+/).length
    s.paragraphs?.forEach((p) => (count += p.split(/\s+/).length))
    s.bullets?.forEach((b) => (count += b.split(/\s+/).length))
    if (s.callout?.text) count += s.callout.text.split(/\s+/).length
  }
  return count
}

// Per-slug topical taxonomy. Feeds Schema.org `keywords`, `about`, and
// `mentions` so LLM crawlers + Google AI Overviews can resolve which entities
// the article addresses. We keep this in code (not in the article record)
// because (a) it is metadata-about-content rather than content itself, and
// (b) it lets us evolve the GEO strategy without touching the source copy.
//
// `keywords`: free-form tags (used by Google's keyword index)
// `about`:    Schema.org Things the article is primarily about
// `mentions`: Schema.org Things named in the body but not the primary subject
function articleTaxonomy(slug: string): {
  keywords: string[]
  about: Array<{ '@type': string; name: string; sameAs?: string }>
  mentions: Array<{ '@type': string; name: string; sameAs?: string }>
} {
  const COMMON_AVANTE = {
    '@type': 'Organization',
    name: 'Avante Ventures',
    sameAs: 'https://avanteventures.com',
  }
  switch (slug) {
    case 'venture-studios-outperform-traditional-vc':
      return {
        keywords: ['venture studio', 'venture capital', 'IRR', 'GSSN', 'startup studio model', 'venture building', 'Brazil VC'],
        about: [
          { '@type': 'Thing', name: 'Venture studio model' },
          { '@type': 'Thing', name: 'Internal rate of return (IRR)', sameAs: 'https://en.wikipedia.org/wiki/Internal_rate_of_return' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Organization', name: 'Cambridge Associates', sameAs: 'https://www.cambridgeassociates.com' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          COMMON_AVANTE,
        ],
      }
    case 'first-ticket-advantage-framework':
      return {
        keywords: ['first ticket', 'pre-seed investing', 'pre-traction venture', 'venture studio framework', 'cap table', 'AI-native startup', 'investment framework'],
        about: [
          { '@type': 'Thing', name: 'Pre-seed investing' },
          { '@type': 'Thing', name: 'Venture capital ownership economics' },
        ],
        mentions: [
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          COMMON_AVANTE,
        ],
      }
    case 'brazil-ai-market-report-2026':
      return {
        keywords: ['Brazil AI market', 'LATAM AI', 'Brazilian SMEs', 'service economy', 'AI-native venture building', 'Brazilian VC 2026', 'AI investment Brazil', 'venture studio Brazil'],
        about: [
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          { '@type': 'Thing', name: 'Artificial intelligence market' },
          { '@type': 'Thing', name: 'Service economy' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'IBGE', sameAs: 'https://www.ibge.gov.br' },
          { '@type': 'Organization', name: 'Banco Central do Brasil', sameAs: 'https://www.bcb.gov.br' },
          { '@type': 'Organization', name: 'LAVCA', sameAs: 'https://www.lavca.org' },
          { '@type': 'Organization', name: 'Distrito', sameAs: 'https://www.distrito.me' },
          { '@type': 'Place', name: 'São Paulo', sameAs: 'https://en.wikipedia.org/wiki/S%C3%A3o_Paulo' },
          COMMON_AVANTE,
        ],
      }
    case 'sigga-case-study-10x-exit':
      return {
        keywords: ['Sigga Technologies', '10x exit', 'industrial software Brazil', 'Brazilian SaaS exit', 'venture case study', 'mobile-native software', 'SAP integration', 'Amanda Pinheiro'],
        about: [
          { '@type': 'Organization', name: 'Sigga Technologies' },
          { '@type': 'Thing', name: 'Industrial asset management software' },
        ],
        mentions: [
          { '@type': 'Person', name: 'Amanda Pinheiro' },
          { '@type': 'Organization', name: 'SAP', sameAs: 'https://www.sap.com' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          { '@type': 'Place', name: 'Minas Gerais', sameAs: 'https://en.wikipedia.org/wiki/Minas_Gerais' },
          COMMON_AVANTE,
        ],
      }
    case 'inside-the-avante-operating-stack':
      return {
        keywords: ['venture studio infrastructure', 'operating stack', 'shared studio infrastructure', 'cap table architecture', 'studio talent funnel', 'GTM templates', 'venture studio playbook', 'Avante studio'],
        about: [
          { '@type': 'Thing', name: 'Venture studio operating model' },
          { '@type': 'Thing', name: 'Shared startup infrastructure' },
        ],
        mentions: [
          { '@type': 'Place', name: 'São Paulo', sameAs: 'https://en.wikipedia.org/wiki/S%C3%A3o_Paulo' },
          { '@type': 'Place', name: 'Delaware', sameAs: 'https://en.wikipedia.org/wiki/Delaware' },
          COMMON_AVANTE,
        ],
      }
    // Stubs share a topical seed so even the noindex pages declare their
    // intended scope to internal-link crawlers and to LLMs that ignore
    // the noindex hint.
    case 'building-ai-native-companies-avante-playbook':
      return {
        keywords: ['AI-native company', 'venture studio playbook', 'startup studio system', 'Brazilian venture building'],
        about: [{ '@type': 'Thing', name: 'AI-native venture building' }],
        mentions: [COMMON_AVANTE],
      }
    case 'idea-to-cashflow-90-days':
      return {
        keywords: ['90-day pilot', 'venture cashflow', 'AI workflow automation', 'unit economics validation'],
        about: [{ '@type': 'Thing', name: 'Pre-seed venture validation' }],
        mentions: [{ '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' }, COMMON_AVANTE],
      }
    case 'unit-economics-101-ltv-cac-day-one':
      return {
        keywords: ['unit economics', 'LTV', 'CAC', 'cashflow first', 'pre-seed venture metrics'],
        about: [{ '@type': 'Thing', name: 'Unit economics' }],
        mentions: [COMMON_AVANTE],
      }
    case 'operators-guide-ai-automation':
      return {
        keywords: ['AI automation', 'workflow automation', 'AI for operators', 'vertical AI', 'AI-native product design'],
        about: [{ '@type': 'Thing', name: 'AI workflow automation' }],
        mentions: [COMMON_AVANTE],
      }
    case 'brazil-service-economy-disruption':
      return {
        keywords: ['Brazil service economy', 'Brazilian SMEs', 'fragmented industries', 'AI disruption Brazil', 'service economy AI'],
        about: [
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          { '@type': 'Thing', name: 'Service economy' },
        ],
        mentions: [COMMON_AVANTE],
      }
    case 'global-venture-studio-data-50-percent-returns':
      return {
        keywords: ['venture studio returns', 'GSSN report', 'studio IRR', 'startup studio data', 'venture studio benchmarks'],
        about: [{ '@type': 'Thing', name: 'Venture studio performance benchmarks' }],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    // === content-engine slugs (managed block in articles.ts) ===
    case 'taste-is-the-moat':
      return {
        keywords: ['taste', 'product judgment', 'Tony Fadell', 'AI-native product', 'defensibility', 'LLMflation', 'design taste', 'venture studio'],
        about: [
          { '@type': 'Thing', name: 'Product design' },
          { '@type': 'Thing', name: 'Competitive moat' },
        ],
        mentions: [
          { '@type': 'Person', name: 'Tony Fadell', sameAs: 'https://en.wikipedia.org/wiki/Tony_Fadell' },
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'Epoch AI', sameAs: 'https://epochai.org' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'ai-native-without-series-a':
      return {
        keywords: ['AI-native company', 'Series A', 'AI inference cost', 'LLMflation', 'defensibility', 'vertical AI', 'lean startup', 'venture studio'],
        about: [
          { '@type': 'Thing', name: 'AI-native venture building' },
          { '@type': 'Thing', name: 'Startup financing' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'Epoch AI', sameAs: 'https://epochai.org' },
          { '@type': 'Organization', name: 'OpenAI', sameAs: 'https://openai.com' },
          { '@type': 'Organization', name: 'Insignia Ventures Partners', sameAs: 'https://www.insignia.vc' },
          { '@type': 'Organization', name: 'McKinsey & Company', sameAs: 'https://www.mckinsey.com' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'copilot-to-data-to-fund-flywheel':
      return {
        keywords: ['copilot to data to fund', 'proprietary data', 'data flywheel', 'venture studio flywheel', 'AI copilot', 'defensibility', 'capital strategy'],
        about: [
          { '@type': 'Thing', name: 'Data network effects' },
          { '@type': 'Thing', name: 'Venture studio operating model' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'Epoch AI', sameAs: 'https://epochai.org' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'data-network-effects-vertical-ai':
      return {
        keywords: ['data network effects', 'vertical AI', 'proprietary data', 'process power', 'competitive moat', 'model commoditization', 'defensibility'],
        about: [
          { '@type': 'Thing', name: 'Data network effects' },
          { '@type': 'Thing', name: 'Competitive moat' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'Epoch AI', sameAs: 'https://epochai.org' },
          { '@type': 'Organization', name: 'Insignia Ventures Partners', sameAs: 'https://www.insignia.vc' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'ai-infrastructure-cost-curve-latam':
      return {
        keywords: ['AI inference cost', 'AI cost curve', 'LATAM venture', 'Series A', 'capital efficiency', 'LLMflation', 'Brazil AI'],
        about: [
          { '@type': 'Thing', name: 'AI infrastructure cost' },
          { '@type': 'Place', name: 'Latin America', sameAs: 'https://en.wikipedia.org/wiki/Latin_America' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'Epoch AI', sameAs: 'https://epochai.org' },
          { '@type': 'Organization', name: 'IBGE', sameAs: 'https://www.ibge.gov.br' },
          { '@type': 'Organization', name: 'LAVCA', sameAs: 'https://www.lavca.org' },
          { '@type': 'Organization', name: 'Stanford HAI', sameAs: 'https://hai.stanford.edu' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          COMMON_AVANTE,
        ],
      }
    case 'brazil-services-economy-opportunity':
      return {
        keywords: ['Brazil services economy', 'services GDP', 'software penetration', 'Brazilian SMEs', 'vertical software', 'operators'],
        about: [
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          { '@type': 'Thing', name: 'Service economy' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          { '@type': 'Organization', name: 'LAVCA', sameAs: 'https://www.lavca.org' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'brazilian-regulatory-complexity-as-moat':
      return {
        keywords: ['Brazilian regulation', 'tax complexity', 'compliance moat', 'regulatory complexity', 'operator advantage', 'vertical AI Brazil'],
        about: [
          { '@type': 'Thing', name: 'Regulatory compliance' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'IBGE', sameAs: 'https://www.ibge.gov.br' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'infinity-constellation-ai-studio-thesis':
      return {
        keywords: ['venture studio', 'Infinity Constellation', 'startup studio as asset class', 'AI companies', 'professional services AI', 'studio thesis'],
        about: [
          { '@type': 'Thing', name: 'Venture studio model' },
          { '@type': 'Thing', name: 'Startup studio as an asset class' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Infinity Constellation' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Organization', name: 'University of Oxford', sameAs: 'https://en.wikipedia.org/wiki/University_of_Oxford' },
          { '@type': 'Organization', name: 'Andreessen Horowitz', sameAs: 'https://a16z.com' },
          COMMON_AVANTE,
        ],
      }
    case 'measuring-studio-performance':
      return {
        keywords: ['venture studio metrics', 'IRR', 'TVPI', 'DPI', 'survivorship bias', 'studio performance', 'GSSN benchmark'],
        about: [
          { '@type': 'Thing', name: 'Internal rate of return (IRR)', sameAs: 'https://en.wikipedia.org/wiki/Internal_rate_of_return' },
          { '@type': 'Thing', name: 'Venture studio performance benchmarks' },
        ],
        mentions: [
          { '@type': 'Person', name: 'Ludovic Phalippou' },
          { '@type': 'Organization', name: 'University of Oxford', sameAs: 'https://en.wikipedia.org/wiki/University_of_Oxford' },
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    case 'operating-partner-economics':
      return {
        keywords: ['operating partner', 'venture studio economics', 'ownership', 'dilution', 'hours to ownership', 'co-building', 'VC partner'],
        about: [
          { '@type': 'Thing', name: 'Venture studio operating model' },
          { '@type': 'Thing', name: 'Equity ownership economics' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Organization', name: 'IBGE', sameAs: 'https://www.ibge.gov.br' },
          COMMON_AVANTE,
        ],
      }
    case 'studio-vs-accelerator-vs-vc':
      return {
        keywords: ['venture studio', 'accelerator', 'venture capital', 'dilution', 'founder financing', 'Y Combinator', 'choosing a model'],
        about: [
          { '@type': 'Thing', name: 'Startup financing models' },
          { '@type': 'Thing', name: 'Venture studio model' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Organization', name: 'Y Combinator', sameAs: 'https://www.ycombinator.com' },
          COMMON_AVANTE,
        ],
      }
    case 'venture-builders-brazil-vs-usa-benchmark':
      return {
        keywords: ['venture studio benchmark', 'US venture studios', 'Brazil venture building', 'studio track record', 'startup studio returns'],
        about: [
          { '@type': 'Thing', name: 'Venture studio performance benchmarks' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Place', name: 'United States', sameAs: 'https://en.wikipedia.org/wiki/United_States' },
          COMMON_AVANTE,
        ],
      }
    case 'why-venture-studios-win-latam':
      return {
        keywords: ['venture studio', 'traditional VC', 'IRR', 'LATAM', 'Brazil', 'studio model', 'venture building', 'GSSN'],
        about: [
          { '@type': 'Thing', name: 'Venture studio model' },
          { '@type': 'Thing', name: 'Internal rate of return (IRR)', sameAs: 'https://en.wikipedia.org/wiki/Internal_rate_of_return' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          { '@type': 'Organization', name: 'Cambridge Associates', sameAs: 'https://www.cambridgeassociates.com' },
          { '@type': 'Place', name: 'Brazil', sameAs: 'https://en.wikipedia.org/wiki/Brazil' },
          COMMON_AVANTE,
        ],
      }
    case 'what-is-a-venture-studio':
      return {
        keywords: ['what is a venture studio', 'venture studio', 'venture builder', 'startup studio', 'company builder', 'venture studio model', 'venture studio vs vc'],
        about: [
          { '@type': 'Thing', name: 'Venture studio' },
          { '@type': 'Thing', name: 'Startup studio model' },
        ],
        mentions: [
          { '@type': 'Organization', name: 'Global Startup Studio Network', sameAs: 'https://www.gssn.co' },
          COMMON_AVANTE,
        ],
      }
    default:
      return { keywords: [], about: [], mentions: [COMMON_AVANTE] }
  }
}
