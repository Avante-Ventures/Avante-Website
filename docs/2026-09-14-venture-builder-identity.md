# Venture builder identity correction

Cristian confirmed on September 14, 2026 that Avante is a **venture builder**. This is the canonical identity in English, Portuguese and Spanish.

## Implementation

- Updated navigation, homepage, interior-page copy, CTAs, footer, accessibility descriptions, metadata, structured data, web manifest and AI-readable site information.
- Corrected Avante-specific Library passages and internal-link labels, including the articles about Avante and its operating stack. Existing article routes and URLs are preserved.
- Corrected the upstream content engine’s brand-truth rule, which previously required “venture studio” and prohibited “venture builder”. Synchronized the three voice guides and existing final/step2 content so future merges do not restore the old identity.
- Preserved third-party research topics, exact source names, numerical claims and benchmark labels. Research about venture studios does not define Avante’s identity. Internal component names, CSS classes and legacy anchors remain compatible.

## Verification

- Native Safari: 21 routes across EN, PT and ES at a 390px viewport passed navigation, identity, metadata and horizontal-overflow checks. Includes the six main page templates and the Avante operating-stack article.
- Visually checked desktop navigation, the Venture Builder hero and the expanded mobile menu.
- Parsed the changed article source and 234 upstream JSON files. Compared strings against pre-edit snapshots: numerical values, links and source names are unchanged.
- Homepage reading metadata matches the published article source.
- Production bundle checked with `npm run build:vite-only`. No prerender, IndexNow, commit, push or deployment was run.

The upstream content engine has no Git repository. Pre-edit snapshots are saved in `../content-engine/.backups/2026-09-14-venture-builder-identity.tar.gz`. Disposable QA evidence is in `/tmp/avante-builder-terminology-2026-09-14/`. The temporary browser review page was removed.
