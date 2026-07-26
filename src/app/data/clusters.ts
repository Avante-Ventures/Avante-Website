// Topical clusters for internal hub-and-spoke interlinking.
//
// SEO/GEO rationale: a low-authority domain ranks a topic cluster faster when its
// pages link to one another and to a pillar ("hub") page, concentrating topical
// authority instead of leaving 20+ pages as disconnected islands. Before this file
// the venture-studio cluster averaged ~1.2 intra-cluster links per page and only
// 2 of 22 pages linked the hub. The RelatedInSeries block wired from here makes
// every cluster page link the hub plus a rotating set of siblings.
//
// CODE-ONLY BY DESIGN: the content engine (content-engine/merge.py) regenerates
// src/app/data/articles.ts but never touches this file, so cluster membership
// survives every re-merge. When the engine publishes a new article into a cluster,
// add its slug to `members` here. Slugs that do not resolve to a published article
// are skipped at render time, so a stale entry can never produce a broken link.

export interface Cluster {
  id: string
  /** Pillar page slug. Every member links up to it. */
  hub: string
  label: { en: string; pt: string; es: string }
  /** Member slugs (the hub is implicit and is not repeated here). */
  members: string[]
}

export const CLUSTERS: Cluster[] = [
  {
    id: 'venture-studio',
    hub: 'what-is-a-venture-studio',
    label: {
      en: 'More on venture studios',
      pt: 'Mais sobre venture studios',
      es: 'Más sobre venture studios',
    },
    members: [
      'what-is-a-startup-studio',
      'how-venture-studios-make-money',
      'venture-studio-vs-vc-explained',
      'venture-studio-vs-accelerator-explained',
      'venture-studio-vs-accelerator-vs-incubator',
      'venture-studio-vs-incubator-explained',
      'venture-studio-vs-bootstrapping',
      'venture-studio-vs-raising-a-seed-round',
      'studio-vs-accelerator-vs-vc',
      'yc-vs-techstars-vs-venture-studio',
      'accelerator-vs-vc-founder-guide',
      'how-much-equity-do-venture-studios-take',
      'how-to-choose-a-venture-studio',
      'is-a-venture-studio-worth-it-for-founders',
      'how-long-venture-studio-startup-reaches-series-a',
      'measuring-studio-performance',
      'venture-studios-outperform-traditional-vc',
      'global-venture-studio-data-50-percent-returns',
      'why-venture-studios-win-latam',
      'venture-studio-founder-economics-latam',
      'venture-builders-brazil-vs-usa-benchmark',
      'vertical-ai-studio-portfolio-construction',
      'lp-allocation-case-venture-studios',
      // Engine build wave (2026-07, gate-PASSED, merge at ship):
      'do-venture-studios-take-a-board-seat',
      'venture-studio-red-flags',
      'venture-studio-vs-private-equity',
      'ai-venture-studio-vs-traditional-venture-studio',
      'solo-founder-vs-venture-studio',
      'technical-cofounder-vs-venture-studio',
    ],
  },
  {
    id: 'brazil-market',
    hub: 'brazil-ai-market-report-2026',
    label: {
      en: 'More on the Brazil AI market',
      pt: 'Mais sobre o mercado de IA no Brasil',
      es: 'Más sobre el mercado de IA en Brasil',
    },
    members: [
      'brazil-services-economy-opportunity',
      'brazilian-regulatory-complexity-as-moat',
      'brazil-ai-fintech-market-opportunity',
      'brazil-generative-ai-market-opportunity',
      'brazil-industrial-ai-market-opportunity',
      'brazil-computer-vision-market-opportunity',
      'brazil-ai-agriculture-agritech-opportunity',
      'brazil-ai-cybersecurity-opportunity',
      'brazil-receivables-automation-ai-opportunity',
      // Test batch (2026-07):
      'brazil-ai-studio-market-opportunity',
      'brazil-mobile-ai-market-opportunity',
      'brazil-ai-image-generator-market-opportunity',
    ],
  },
]

// Deterministic string hash (no Math.random) so prerendered HTML stays stable.
function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) | 0
  }
  return h
}

export function clusterFor(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.hub === slug || c.members.includes(slug))
}

/**
 * Related links for an article's "in this series" block: the hub slug (omitted
 * when the article IS the hub) plus a deterministic rotating window of siblings,
 * so every page links the hub and a varied-but-stable subset of the cluster.
 * Stable across renders (hash-based, not random) so prerender output is stable.
 */
export function relatedInCluster(
  slug: string,
  limit = 6,
): { hub?: string; siblings: string[]; label: Cluster['label'] } | undefined {
  const c = clusterFor(slug)
  if (!c) return undefined
  const pool = c.members.filter((s) => s !== slug)
  const siblings: string[] = []
  if (pool.length > 0) {
    const start = Math.abs(hashSlug(slug)) % pool.length
    for (let i = 0; i < Math.min(limit, pool.length); i++) {
      siblings.push(pool[(start + i) % pool.length])
    }
  }
  return { hub: slug === c.hub ? undefined : c.hub, siblings, label: c.label }
}
