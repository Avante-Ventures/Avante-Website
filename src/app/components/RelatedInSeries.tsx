import { Link } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'
import { articleBySlug } from '@/app/data/articles'
import { relatedInCluster } from '@/app/data/clusters'

// Hub-and-spoke internal-linking block rendered at the foot of every article that
// belongs to a topical cluster (see data/clusters.ts). It emits real <Link>s so
// Google and answer engines see the cluster's topical-authority graph, and it
// links the pillar page from every member (the signal that was missing: only
// 2 of 22 studio pages linked the hub before this).
//
// Defensive by design: any slug that does not resolve to a PUBLISHED article is
// skipped, so a stale cluster entry can never render a broken or thin-content link.
export function RelatedInSeries({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const related = relatedInCluster(slug)
  if (!related) return null

  const titleFor = (s: string): string | undefined => {
    const a = articleBySlug(s)
    if (!a || !a.isPublished) return undefined
    const c = language === 'pt' ? a.pt : language === 'es' && a.es ? a.es : a.en
    return c?.title
  }

  type Item = { slug: string; title: string; isHub: boolean }
  const items: Item[] = []
  if (related.hub) {
    const title = titleFor(related.hub)
    if (title) items.push({ slug: related.hub, title, isHub: true })
  }
  for (const s of related.siblings) {
    const title = titleFor(s)
    if (title) items.push({ slug: s, title, isHub: false })
  }
  if (items.length === 0) return null

  const heading =
    language === 'pt'
      ? related.label.pt
      : language === 'es'
        ? related.label.es
        : related.label.en

  return (
    <nav
      aria-label={heading}
      style={{
        marginTop: '56px',
        paddingTop: '32px',
        borderTop: '1px solid var(--avt-hair)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--avt-font-mono)',
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--avt-meta)',
          marginBottom: '20px',
        }}
      >
        {heading}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '14px' }}>
        {items.map((it) => (
          <li key={it.slug}>
            <Link
              to={`/${language}/library/${it.slug}`}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                color: it.isHub ? '#F9B437' : 'var(--avt-txt)',
                textDecoration: 'none',
                fontSize: '16px',
                lineHeight: 1.45,
              }}
            >
              <span aria-hidden style={{ color: '#F9B437' }}>
                →
              </span>
              <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {it.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
