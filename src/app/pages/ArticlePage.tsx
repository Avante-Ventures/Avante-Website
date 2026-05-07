import { useParams, Link, Navigate } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'
import { Navbar } from '@/app/components/Navbar'
import { BackToTop } from '@/app/components/BackToTop'
import { Footer } from '@/app/components/Footer'
import { SEOHelmet } from '@/app/components/SEOHelmet'
import { articleBySlug, type ArticleSection } from '@/app/data/articles'

export default function ArticlePage() {
  const { language } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to={`/${language}/library`} replace />
  }

  const content = article[language]
  const t = (en: string, pt: string) => (language === 'pt' ? pt : en)

  // JSON-LD Article schema — declares this page to LLMs and Google as a
  // first-class Article authored by Avante Ventures.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://avanteventures.com/${language}/library/${article.slug}#article`,
    headline: content.title,
    description: content.description,
    url: `https://avanteventures.com/${language}/library/${article.slug}`,
    image: 'https://avanteventures.com/og-image.png',
    inLanguage: language === 'pt' ? 'pt-BR' : 'en',
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    articleSection: article.category,
    wordCount: estimateWordCount(content.sections),
    author: { '@id': 'https://avanteventures.com/#organization' },
    publisher: { '@id': 'https://avanteventures.com/#organization' },
    isPartOf: { '@id': 'https://avanteventures.com/#website' },
    mainEntityOfPage: `https://avanteventures.com/${language}/library/${article.slug}`,
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
        jsonLd={jsonLd}
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
          <span>←</span> {t('Back to Library', 'Voltar para Biblioteca')}
        </Link>

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
                {t('Draft', 'Rascunho')}
              </span>
            </>
          )}
        </div>

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
          <Section key={i} section={section} />
        ))}

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
              'Quer mais? Receba um ensaio por mês sobre venture building, negócios AI-native e a oportunidade Brasil.'
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
            {t('Browse the Library', 'Ver Biblioteca completa')} →
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

function Section({ section }: { section: ArticleSection }) {
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
          {p}
        </p>
      ))}

      {section.bullets && section.bullets.length > 0 && (
        <ul
          style={{
            margin: '8px 0 18px 0',
            paddingLeft: '20px',
            color: 'rgba(255, 255, 255, 0.82)',
          }}
        >
          {section.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                marginBottom: '8px',
              }}
            >
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.callout && <Callout {...section.callout} />}
    </section>
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
        borderLeft: `3px solid ${s.accent}`,
        background: s.bg,
        borderRadius: '0 12px 12px 0',
        border: `1px solid ${s.border}`,
        borderLeftColor: s.accent,
        borderLeftWidth: '3px',
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
