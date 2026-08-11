# avanteventures.com

Vite **6.3.5** SPA + prerender. Trilingual **EN / PT / ES**.
Repo `Avante-Ventures/Avante-Website`. Vercel project `avante-website`.

> ⚠️ **Scope (verified 2026-08-10):** this project lives in `team_C8qbNEPkePG8k7PL1YF5Bq9w`, slug
> **`cristian-mendivelsos-projects`** — Cristian's *second* personal Vercel account, distinct from
> `cristian-2293s-projects` (which holds `avante-hub-new`, `avante-brain`, `wir-website`) and from
> team Avante (which holds only `alphajuri-webapp`).
>
> The Vercel token connected to Claude is authenticated against the *other* personal account, so it
> returns **403** here — this project cannot be inspected or deployed through Claude's Vercel tools.
> To watch a deploy without dashboard access:
> `gh api repos/Avante-Ventures/Avante-Website/commits/<sha>/status` — the `target_url` is the
> deployment, and `state` goes pending → success.
>
> Auto-deploy on push to `main` **is** wired and works. Budget ~8 minutes end to end
> (Vite build + prerender + IndexNow + cache purge), not the ~2 a plain Vite build suggests.

## Build pings IndexNow automatically

```
vite build && node scripts/prerender.mjs && (node scripts/indexnow.mjs || true)
```

`pnpm build` handles IndexNow on its own here. **This is the exception** — `wir-axa/website` requires a
manual `npm run indexnow` after deploy. Do not generalize one to the other.

IndexNow notifies Bing / Yandex / Naver / Seznam and **never Google**. Google only via sitemap +
Search Console submitted by hand.

> Note the `|| true` — an IndexNow failure will not fail the build, and will not be loud.
> If indexing looks stale, check the build log rather than assuming the ping fired.

## Team section

Lives in `src/app/components/WhoWeAreScene.tsx`, in the `OPERATORS[]` array.

⚠️ Canonical bios live in **`../avante-hub/src/data/team.ts`** (that is what the IC deck reads).
These two lists are maintained separately — when someone joins or leaves, update **both**.

Photos: convert PNG → webp with **PIL**, not a browser. Chrome headless and Playwright hang on this
machine. SVG → PNG via `rsvg-convert` (installed).

## Content

Articles are fed by the sibling `../content-engine/` pipeline (trilingual Library → `articles.ts`).

## ⚠️ Brand-truth gate

Every public figure on this site must reconcile against the brand-truth / company-facts docs before
it ships. The `~50% vs ~19% IRR` numbers are historically sensitive.
