import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { BackToTop } from "@/app/components/BackToTop";
import { SEOHelmet } from "@/app/components/SEOHelmet";
import { EditorialCover } from '@/app/components/interiors/EditorialCover';
import '@/app/components/interiors/interiors.css';
import { Link } from "react-router";
import { useState } from "react";
import { articles, type Category as ArticleCategory } from "@/app/data/articles";

type Category = 'all' | ArticleCategory;

// LibraryItem is derived from the articles data file (single source of truth).
// Title/description are localized at render time via article[language].
interface LibraryItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  type: string;
  readTime: string;
  featured?: boolean;
  date?: string;
  datePublished: string;
  isPublished: boolean;
}

export default function LibraryPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Only published articles are listed. Drafts (isPublished:false) still
  // exist as direct URLs but are excluded from the index, sitemap.xml, and
  // llms.txt to preserve crawl budget and signal hygiene.
  const libraryItems: LibraryItem[] = articles
    .filter((a) => a.isPublished)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || a.slug.localeCompare(b.slug))
    .map((a, i) => ({
      id: String(i + 1),
      slug: a.slug,
      title: (a[language] ?? a.en).title,
      description: (a[language] ?? a.en).description,
      category: a.category,
      type: a.type,
      readTime: a.readTime,
      featured: a.featured,
      date: a.date,
      datePublished: a.datePublished,
      isPublished: a.isPublished,
    }));

  const categories = [
    { id: 'all',         label: t('library.category.all'),         color: '#FFFFFF' },
    { id: 'insights',    label: t('library.category.insights'),    color: '#F9B437' },
    { id: 'research',    label: t('library.category.research'),    color: '#98509A' },
    { id: 'casestudies', label: t('library.category.casestudies'), color: '#F4A261' },
    { id: 'playbooks',   label: t('library.category.playbooks'),   color: '#F9B437' },
    { id: 'brazil',      label: t('library.category.brazil'),      color: '#98509A' },
    { id: 'ai',          label: t('library.category.ai'),          color: '#E6C54C' },
  ];

  const search = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(language);
  const filteredItems = libraryItems.filter(item => (activeCategory === 'all' || item.category === activeCategory) && search(`${item.title} ${item.description}`).includes(search(query.trim())));
  const lead = libraryItems[0];
  const listing = activeCategory === 'all' && !query.trim() ? filteredItems.filter(item => item.slug !== lead?.slug) : filteredItems;
  const editorial = {
    en: { title: 'The Library.', intro: 'Research, field notes and the thinking behind the companies we build.', latest: 'Latest from Avante', search: 'Search the Library', count: 'articles', read: 'Read article', more: 'Show more articles', empty: 'No articles match this selection.', reset: 'Reset filters', newsletter: 'Thinking worth staying close to.', newsletterBody: 'Research and perspectives from Avante, delivered through Avante Intelligence.', subscribe: 'Read Avante Intelligence' },
    pt: { title: 'A Biblioteca.', intro: 'Pesquisa, notas de campo e o pensamento por trás das empresas que construímos.', latest: 'O mais recente da Avante', search: 'Buscar na Biblioteca', count: 'artigos', read: 'Leia o artigo', more: 'Ver mais artigos', empty: 'Nenhum artigo corresponde a esta seleção.', reset: 'Limpar filtros', newsletter: 'Ideias para acompanhar de perto.', newsletterBody: 'Pesquisa e perspectivas da Avante, compartilhadas pelo Avante Intelligence.', subscribe: 'Leia Avante Intelligence' },
    es: { title: 'La Biblioteca.', intro: 'Investigación, notas de campo y las ideas detrás de las empresas que construimos.', latest: 'Lo más reciente de Avante', search: 'Buscar en la Biblioteca', count: 'artículos', read: 'Leer artículo', more: 'Ver más artículos', empty: 'Ningún artículo coincide con esta selección.', reset: 'Restablecer filtros', newsletter: 'Ideas que vale la pena seguir.', newsletterBody: 'Investigación y perspectivas de Avante, compartidas en Avante Intelligence.', subscribe: 'Lee Avante Intelligence' },
  }[language];
  const date = (item: LibraryItem) => new Date(`${item.datePublished}T12:00:00Z`).toLocaleDateString(language, { month: 'short', year: 'numeric', timeZone: 'UTC' });

  // GEO-friendly schema: CollectionPage + ItemList of every published article.
  // Lets LLMs cite specific titles even when the underlying article pages
  // don't exist as standalone routes yet (they're listed inline on /library).
  const SEO_COPY = {
    en: {
      title: "Library: Insights, Research, Playbooks on AI-native Venture Building",
      description: "Avante Library: research, case studies, and playbooks on venture builders, Brazil's AI market, and operating AI-native startups.",
      collectionName: "Avante Library: Insights, Research, Playbooks",
      collectionDescription: "Insights, research reports, case studies, and playbooks on AI-native venture building, Brazil's service economy, and venture builder dynamics.",
      inLanguage: "en",
    },
    pt: {
      title: "Biblioteca: Insights, Pesquisa e Playbooks para Empresas AI-Native",
      description: "Biblioteca Avante: pesquisas, estudos de caso e playbooks sobre venture builders, mercado de IA no Brasil e operação de startups AI-native.",
      collectionName: "Biblioteca Avante: Insights, Pesquisa, Playbooks",
      collectionDescription: "Insights, relatórios de pesquisa, estudos de caso e playbooks sobre venture building AI-native, economia de serviços do Brasil e dinâmica de venture builders.",
      inLanguage: "pt-BR",
    },
    es: {
      title: "Biblioteca: Insights, Investigación y Playbooks para Empresas AI-Native",
      description: "Biblioteca Avante: investigación, casos de estudio y playbooks sobre venture builders, mercado de IA en Brasil y operación de startups AI-native.",
      collectionName: "Biblioteca Avante: Insights, Investigación, Playbooks",
      collectionDescription: "Insights, reportes de investigación, casos de estudio y playbooks sobre venture building AI-native, economía de servicios de Brasil y dinámica de venture builders.",
      inLanguage: "es",
    },
  } as const;
  const copy = SEO_COPY[language] ?? SEO_COPY.en;

  const libraryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `https://avanteventures.com/${language}/library#collection`,
    "url": `https://avanteventures.com/${language}/library`,
    "name": copy.collectionName,
    "description": copy.collectionDescription,
    "inLanguage": copy.inLanguage,
    "publisher": { "@id": "https://avanteventures.com/#organization" },
    "isPartOf": { "@id": "https://avanteventures.com/#website" },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": libraryItems.length,
      "itemListElement": libraryItems.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Article",
          "name": item.title,
          "description": item.description,
          "genre": item.type,
          "datePublished": item.date,
        },
      })),
    },
  };

  return (
    <div className="avante-interior">
      <SEOHelmet title={copy.title} description={copy.description} pathname="/library" jsonLd={libraryJsonLd} />
      <Navbar /><BackToTop />
      <main>
        <header className="library-opening">
          <div className="library-opening-top"><div><span className="interior-kicker">Avante / {language === 'pt' ? 'Pesquisa e perspectivas' : language === 'es' ? 'Investigación y perspectivas' : 'Research & insights'}</span><h1>{editorial.title}</h1></div><p>{editorial.intro}</p></div>
          {lead && <Link className="library-feature" to={`/${language}/library/${lead.slug}`}><EditorialCover category={lead.category} priority /><div><span className="interior-kicker">{editorial.latest}</span><h2>{lead.title}</h2><div className="library-meta"><span>{categories.find(c => c.id === lead.category)?.label}</span><time dateTime={lead.datePublished}>{date(lead)}</time><span>{lead.readTime}</span></div><p>{lead.description}</p><span className="interior-link">{editorial.read}<span>↗</span></span></div></Link>}
        </header>
        <section className="interior-content" id="page-content" aria-label={editorial.title}>
          <div className="library-controls"><div className="library-filters">{categories.map(category => <button key={category.id} aria-pressed={activeCategory === category.id} onClick={() => { setActiveCategory(category.id as Category); setVisibleCount(12); }}>{category.label}</button>)}</div><label className="library-search"><span className="sr-only">{editorial.search}</span><input type="search" value={query} placeholder={editorial.search} onChange={event => { setQuery(event.target.value); setVisibleCount(12); }} /></label></div>
          <span className="library-result-count" role="status">{filteredItems.length} {filteredItems.length === 1 ? { en: 'article', pt: 'artigo', es: 'artículo' }[language] : editorial.count}</span>
          <div className="library-index">
            {listing.length === 0 && <div className="library-empty"><p>{editorial.empty}</p><button onClick={() => { setQuery(''); setActiveCategory('all'); setVisibleCount(12); }}>{editorial.reset} ↗</button></div>}
            {listing.slice(0, visibleCount).map(item => <Link key={item.slug} className="library-entry" to={`/${language}/library/${item.slug}`}>
              <div className="library-meta"><span>{categories.find(c => c.id === item.category)?.label}</span><time dateTime={item.datePublished}>{date(item)}</time></div><h3>{item.title}</h3><p>{item.description}</p><div className="library-entry-bottom"><span>{item.readTime}</span><span aria-hidden="true">↗</span></div>
            </Link>)}
          </div>
          {listing.length > visibleCount && <div className="library-pagination"><span>{Math.min(listing.length, visibleCount)} / {listing.length}</span><button onClick={() => setVisibleCount(count => count + 12)}>{editorial.more} ↓</button></div>}
        </section>
        <section className="interior-closing"><div><span className="interior-kicker">Avante Intelligence</span><h2>{editorial.newsletter}</h2><p>{editorial.newsletterBody}</p><a className="interior-button" href="https://avanteventures.substack.com" target="_blank" rel="noopener noreferrer">{editorial.subscribe} ↗</a></div><img src="/world-assets/avante-A.svg" alt="" width="180" height="240" loading="lazy" /></section>
      </main>
      <Footer />
    </div>
  );
}
