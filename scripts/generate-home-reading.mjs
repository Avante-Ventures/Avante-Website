// Keep the homepage light while using the Library's actual published metadata.
// Run after editorial changes. --check verifies without writing.
import { readFile, writeFile } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';
const source = await readFile(new URL('../src/app/data/articles.ts', import.meta.url), 'utf8');
const { code } = await transformWithEsbuild(source, 'articles.ts', { loader: 'ts', format: 'esm' });
const { articles } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const selected = articles.filter(a => a.isPublished).sort((a, b) => b.datePublished.localeCompare(a.datePublished)).slice(0, 3);
const previews = selected.map(a => ({ slug: a.slug, category: a.category, date: a.datePublished, readTime: a.readTime, ...Object.fromEntries(['en', 'pt', 'es'].map(lang => [lang, { title: (a[lang] ?? a.en).title, description: (a[lang] ?? a.en).description }])) }));
const output = `${JSON.stringify(previews, null, 2)}\n`;
const target = new URL('../src/app/components/world/reading.json', import.meta.url);
if (process.argv.includes('--check')) {
  if (await readFile(target, 'utf8') !== output) throw new Error('Homepage reading metadata is stale. Run node scripts/generate-home-reading.mjs');
  console.log('Homepage reading metadata matches published articles.');
} else { await writeFile(target, output); console.log('Generated three published article previews.'); }
