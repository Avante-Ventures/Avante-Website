// IndexNow ping — notifies Bing / Yandex / Seznam (and downstream:
// Perplexity, ChatGPT-search, Claude all use Bing as their crawl
// backbone) that our URLs have changed. They re-crawl within minutes
// instead of the weeks Google takes for new domains.
//
// How it works:
//   1. We host /<KEY>.txt at the domain root with the key as content.
//   2. We POST a JSON body listing the URLs to api.indexnow.org.
//   3. The endpoint fetches our key file once to verify ownership,
//      then queues the URLs for fast re-crawl.
//
// When this runs:
//   - Manually:  pnpm indexnow            (pings every URL in sitemap)
//   - Manually:  pnpm indexnow --new      (only URLs changed in last 24h)
//   - Optional:  hook into Vercel deploy via a GitHub Action or a
//     post-deploy webhook — the script is self-contained and exits
//     0/1 cleanly so any CI can wrap it.
//
// Why we don't run it automatically on every Vercel build:
//   IndexNow's TOS asks consumers not to submit URLs that have not
//   changed (it would burn the daily 10k cap with no benefit). The
//   sensible cadence is on intentional content updates, not on every
//   tweak that triggers a redeploy.

import { readFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const HOST = 'avanteventures.com'
const KEY = 'd4f16a311c574ce29e7899c80170927c'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/IndexNow'
const SITEMAP = resolve(__dirname, '..', 'public', 'sitemap.xml')

const FRESH_WINDOW_DAYS = 1
const onlyFresh = process.argv.includes('--new')

// Parse <loc> entries out of the sitemap. Cheap regex parse — sitemap
// is hand-written and well-formed; pulling in an XML lib for one tag
// is overkill.
async function loadSitemapUrls() {
  const xml = await readFile(SITEMAP, 'utf8')
  const urls = []
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? []
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
    if (!loc) continue
    urls.push({ loc, lastmod })
  }
  return urls
}

function isFresh(lastmod) {
  if (!lastmod) return false
  const ts = Date.parse(lastmod)
  if (Number.isNaN(ts)) return false
  const ageMs = Date.now() - ts
  return ageMs < FRESH_WINDOW_DAYS * 24 * 60 * 60 * 1000
}

async function ping(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return { status: res.status, statusText: res.statusText, text: await res.text().catch(() => '') }
}

async function main() {
  const urls = await loadSitemapUrls()
  if (urls.length === 0) {
    console.error('✗ No URLs found in sitemap.xml')
    process.exit(1)
  }

  let urlList = urls.map((u) => u.loc)
  if (onlyFresh) {
    urlList = urls.filter((u) => isFresh(u.lastmod)).map((u) => u.loc)
    if (urlList.length === 0) {
      console.log(`ℹ No URLs with lastmod in the last ${FRESH_WINDOW_DAYS}d — nothing to ping.`)
      process.exit(0)
    }
  }

  console.log(`📤 Pinging IndexNow with ${urlList.length} URL${urlList.length === 1 ? '' : 's'}...`)
  console.log(`   Endpoint: ${ENDPOINT}`)
  console.log(`   Key file: ${KEY_LOCATION}`)

  // IndexNow caps the urlList at 10,000 entries per request. We're far
  // under that today (47 URLs total) but chunk preemptively so the script
  // keeps working as the Library grows.
  const CHUNK = 9_500
  for (let i = 0; i < urlList.length; i += CHUNK) {
    const chunk = urlList.slice(i, i + CHUNK)
    const { status, statusText, text } = await ping(chunk)
    const ok = status === 200 || status === 202
    console.log(
      `${ok ? '  ✓' : '  ✗'} chunk ${i / CHUNK + 1}: ${chunk.length} URLs → HTTP ${status} ${statusText}` +
        (text ? ` — ${text.slice(0, 200)}` : '')
    )
    if (!ok) process.exit(1)
  }

  console.log('\n✅ IndexNow ping complete.')
  console.log('   Bing / Yandex / Seznam will re-crawl within minutes.')
  console.log('   (Google does not participate in IndexNow but Perplexity,')
  console.log('    ChatGPT-search and Claude use Bing as their crawl backbone.)')
}

main().catch((err) => {
  console.error('✗ IndexNow failed:', err)
  process.exit(1)
})
