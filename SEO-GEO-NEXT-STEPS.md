# SEO + GEO — Pasos pendientes (tu lado)

El stack técnico (Phase 0-5) está deployed. Lo que falta requiere tu cuenta personal — no puedo hacerlo por ti.

## 1. Google Search Console (10 min) — ALTA PRIORIDAD

Sin esto, Google no sabe oficialmente que el sitio existe (aunque eventualmente lo descubra).

1. Ve a https://search.google.com/search-console
2. **Add property** → escoge **URL prefix** → ingresa `https://avanteventures.com`
3. Verificación recomendada: **DNS TXT record** (no requiere tocar el código)
   - GSC te da un valor tipo `google-site-verification=abc123...`
   - Vas a NameCheap → Domain List → Manage `avanteventures.com` → Advanced DNS
   - Add record: `TXT Record` / Host: `@` / Value: el valor de GSC / TTL: Automatic
   - Click **Verify** en GSC (puede tomar 5-30 min para que propague)
4. Una vez verificado:
   - **Sitemaps** → submit `https://avanteventures.com/sitemap.xml`
   - **URL Inspection** → ingresa `https://avanteventures.com/en` → "Request Indexing" (acelera el primer crawl)
   - Repite con `/pt`, `/en/why-avante`, `/pt/why-avante`, `/en/library`, `/pt/library`

**Alternativa si no quieres tocar DNS**: GSC también acepta verificación via meta tag. Si prefieres esto, mándame el valor `google-site-verification=...` que te da GSC y lo agrego a `index.html` en un commit.

## 2. Bing Webmaster Tools (5 min) — MEDIA

Bing tiene 8% del search market global pero es la fuente que ChatGPT (vía Bing API) y Copilot usan para citas. No es redundante con Google.

1. Ve a https://www.bing.com/webmasters
2. Sign in con tu Microsoft account (o crea una)
3. Add site → `https://avanteventures.com`
4. Verifica via DNS TXT (mismo proceso que GSC)
5. **Sitemaps** → submit `https://avanteventures.com/sitemap.xml`
6. **Bonus**: Bing Webmaster te da un **IndexNow API key**. Si me lo pasas, agrego un postbuild step que pingea IndexNow cada vez que deploys → indexación instantánea en Bing.

## 3. LinkedIn / Twitter / WhatsApp share preview test (3 min)

Antes de publicar el link en LinkedIn, valida el OG image preview:

- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Favanteventures.com%2Fen
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator (pega `https://avanteventures.com/en`)
- **WhatsApp** simplemente compártelo a un chat de prueba — debería mostrar OG image + título + descripción

Si el preview se ve mal: dime y regenero el `og-image.png` con composición distinta.

## 4. Perplexity / ChatGPT cita test (5 min) — el verdadero ROI de GEO

Los GEO investments rinden cuando los LLMs te citan. Test en 2 semanas:

- **Perplexity**: ve a https://www.perplexity.ai → pregunta *"What is Avante Ventures?"* → debe citar `avanteventures.com` con un summary correcto
- **ChatGPT** (gratis o paid): pregunta lo mismo, **enable Web Search** si está disponible → debería buscar y citar
- **Claude**: pregunta lo mismo en https://claude.ai → debería tener acceso vía web search
- **Google AI Overviews**: busca `"venture studio brazil ai-native"` en Google.com → si Avante aparece en el AI Overview box, jackpot

Las citas tardan 2-12 semanas en aparecer porque los LLMs se reentrenan / re-crawlean periódicamente. Vuelves en 30 días y revisas.

## 5. Contenido (Phase 6 del plan original) — OPCIONAL pero ALTO ROI

El stack técnico está listo. Pero **GEO = LLMs citan contenido específico**. Tu Library page lista 9 artículos con títulos+descripciones — pero no contenido completo.

Para que los LLMs realmente te citen como fuente autorizada:
- Escribe **3-5 artículos completos** (1000+ palabras) sobre tus theses
- Súbelos como rutas reales (ej. `/en/library/why-venture-studios-outperform`)
- Cada uno tendrá su propio JSON-LD `Article` schema (ya tenemos la infra de `SEOHelmet` lista)

Cuando tengas los drafts en md/google docs/lo que sea, pásamelos y los integro como rutas.

---

## Lo que ya está deployed y funcionando

| Fase | Qué hace | Verificable en |
|---|---|---|
| 0 | robots.txt, sitemap.xml, llms.txt, humans.txt, manifest, OG image, favicons, JSON-LD Org+WebSite | `curl https://avanteventures.com/robots.txt` |
| 1 | Prerender de las 6 rutas + redirect — HTML estático con contenido completo (no JS-only) | `curl https://avanteventures.com/en/why-avante \| grep "<h1"` |
| 2 | Per-page `<title>`, `<description>`, canonical, OG, JSON-LD per route (WebPage / Article / CollectionPage) | `curl ... \| grep -oE '"@type":"[^"]+"'` |
| 3 | URLs `/en/*` y `/pt/*` con hreflang + sitemap bilingüe + llms.txt bilingüe | `curl https://avanteventures.com/pt \| grep "Venture Studio AI-Native no Brasil"` |
| 4 | WebP en lugar de PNG (-90% en pesos) + code-split de Why/Library | Bundle inicial home: ~265 KB gzipped |
| 5 | Vercel Web Analytics + Speed Insights (Core Web Vitals reales) | Vercel dashboard → Project → Analytics + Speed Insights tabs |

## Métricas de salud

Cuando quieras chequearlas:
- **Lighthouse**: `pnpm dlx -y @lhci/cli@latest collect --url=https://avanteventures.com/en`
- **PageSpeed Insights**: https://pagespeed.web.dev/analysis?url=https%3A%2F%2Favanteventures.com%2Fen
- **Vercel Speed Insights**: dashboard de Vercel (Real User Metrics, no synthetic)
- **Schema validation**: https://validator.schema.org → pega URL
