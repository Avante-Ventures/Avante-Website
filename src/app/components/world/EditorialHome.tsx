import { VentureExhibit } from './VentureExhibit';
import type { VentureKind } from './ventures';
import { PerspectiveSkyline } from './PerspectiveSkyline';
import { TeamPortrait } from './TeamPortrait';
import { InsideVentureBuilder } from './InsideVentureBuilder';
import { Link } from 'react-router';
import { useLanguage } from '@/app/hooks/useLanguage';
import { OPERATORS } from '@/app/components/WhoWeAreScene';
import reading from './reading.json';
const COPY = {
  en: {
    ventureRole: 'Built with Avante: product and engineering.', work: ['Conviction,', 'made tangible.'], workIntro: 'Real problems. Companies built around them.', all: 'Explore the portfolio', view: 'Explore this venture', legal: 'Liquidity for judicial claims.', legalBody: 'AlphaJuri helps creditors and lawyers anticipate payments from precatórios, RPVs and court-awarded legal fees in Brazil.', insurance: 'Complex risk. Clearer decisions.', insuranceBody: 'WIR connects distribution, underwriting and claims with AI. Intelligence that works with the systems insurers already use.', brand: 'Brands that reach the right buyers.', brandBody: 'CRIA connects brand strategy, content and go-to-market execution, so companies earn trust and start sales conversations.',
    perspectiveTitle: ['Silicon Valley perspective.', 'Brazilian execution.'], perspectiveBody: 'Different markets. Shared operating experience. Our team connects company building in the United States with the context, relationships and complexity of Brazil.', peopleLink: 'Meet the people behind it',
    peopleTitle: ['The people', 'doing the work.'], peopleBody: 'Founders, partners and builders. The experience belongs to the people. The work happens together.', bio: 'Experience', profile: 'View LinkedIn profile',
    thinkingTitle: ['We build.', 'We write it down.'], thinkingBody: 'Research, field notes and the thinking behind our work.', library: 'Enter the Library', read: 'Read article',
    closeTitle: ['The next chapter', 'is being built.'], closeBody: 'Building a company or exploring a partnership? Tell us what you are working on.', subscribe: 'Read Avante Intelligence', contact: 'Partner with us',
  },
  pt: {
    ventureRole: 'Construído com a Avante: produto e engenharia.', work: ['Convicção,', 'em construção.'], workIntro: 'Problemas reais. Empresas construídas para resolvê-los.', all: 'Explore o portfólio', view: 'Explore este venture', legal: 'Liquidez para créditos judiciais.', legalBody: 'A AlphaJuri ajuda credores e advogados a antecipar precatórios, RPVs e honorários de sucumbência no Brasil.', insurance: 'Risco complexo. Decisões mais claras.', insuranceBody: 'A WIR conecta distribuição, subscrição e sinistros com IA. Inteligência integrada aos sistemas que as seguradoras já utilizam.', brand: 'Marcas que chegam aos compradores certos.', brandBody: 'A CRIA conecta estratégia de marca, conteúdo e execução de go-to-market para que as empresas conquistem confiança e iniciem conversas de venda.',
    perspectiveTitle: ['Perspectiva do Vale do Silício.', 'Execução brasileira.'], perspectiveBody: 'Mercados diferentes. Experiência operacional compartilhada. Nosso time conecta a construção de empresas nos Estados Unidos ao contexto, às relações e à complexidade do Brasil.', peopleLink: 'Conheça quem está por trás',
    peopleTitle: ['As pessoas', 'que fazem acontecer.'], peopleBody: 'Fundadores, sócios e builders. A experiência é de cada pessoa. O trabalho acontece em conjunto.', bio: 'Experiência', profile: 'Ver perfil no LinkedIn',
    thinkingTitle: ['Construímos.', 'E compartilhamos.'], thinkingBody: 'Pesquisa, notas de campo e o pensamento por trás do nosso trabalho.', library: 'Entre na Biblioteca', read: 'Leia o artigo',
    closeTitle: ['O próximo capítulo', 'está em construção.'], closeBody: 'Está construindo uma empresa ou buscando uma parceria? Conte o que você está desenvolvendo.', subscribe: 'Leia Avante Intelligence', contact: 'Construa conosco',
  },
  es: {
    ventureRole: 'Construido con Avante: producto e ingeniería.', work: ['Convicción,', 'hecha realidad.'], workIntro: 'Problemas reales. Empresas creadas para resolverlos.', all: 'Explora el portafolio', view: 'Explora este venture', legal: 'Liquidez para créditos judiciales.', legalBody: 'AlphaJuri ayuda a acreedores y abogados a anticipar pagos de precatórios, RPVs y honorarios judiciales en Brasil.', insurance: 'Riesgo complejo. Decisiones más claras.', insuranceBody: 'WIR conecta distribución, suscripción y siniestros con IA. Inteligencia integrada con los sistemas que las aseguradoras ya utilizan.', brand: 'Marcas que llegan a los compradores correctos.', brandBody: 'CRIA conecta estrategia de marca, contenido y ejecución de go-to-market para que las empresas ganen confianza e inicien conversaciones de venta.',
    perspectiveTitle: ['Perspectiva de Silicon Valley.', 'Ejecución brasileña.'], perspectiveBody: 'Mercados distintos. Experiencia operativa compartida. Nuestro equipo conecta la creación de empresas en Estados Unidos con el contexto, las relaciones y la complejidad de Brasil.', peopleLink: 'Conoce a las personas detrás',
    peopleTitle: ['Las personas', 'que hacen el trabajo.'], peopleBody: 'Fundadores, socios y builders. La experiencia pertenece a cada persona. El trabajo sucede en conjunto.', bio: 'Experiencia', profile: 'Ver perfil en LinkedIn',
    thinkingTitle: ['Construimos.', 'Lo compartimos.'], thinkingBody: 'Investigación, notas de campo y las ideas detrás de nuestro trabajo.', library: 'Entra a la Biblioteca', read: 'Lee el artículo',
    closeTitle: ['El próximo capítulo', 'está en construcción.'], closeBody: '¿Estás construyendo una empresa o buscando una alianza? Cuéntanos en qué estás trabajando.', subscribe: 'Lee Avante Intelligence', contact: 'Construye con nosotros',
  },
};
function Heading({ lines }: { lines: string[] }) { return <h2 className="editorial-title">{lines[0]}<br /><span>{lines[1]}</span></h2>; }
export function VentureProductPreview({ kind }: { kind: VentureKind }) {
  const { language } = useLanguage();
  return <div className="avante-world-home portfolio-product"><VentureExhibit kind={kind} language={language} /></div>;
}
export function EditorialHome() {
  const { language } = useLanguage(), c = COPY[language];
  return <>
    <InsideVentureBuilder />
    <section id="ventures" className="editorial-section ventures-section">
      <div className="section-heading-row"><Heading lines={c.work} /><div><p>{c.workIntro}</p><Link className="editorial-link" to={`/${language}/portfolio`}>{c.all} ↗</Link></div></div>
      <article id="home-alphajuri" className="venture-feature"><VentureExhibit kind="legal" language={language} /><div className="venture-description"><div><span className="venture-domain">AlphaJuri / LegalTech</span><h3>{c.legal}</h3></div><div><p>{c.legalBody}</p><p className="venture-role">{c.ventureRole}</p><Link className="editorial-link" to={`/${language}/portfolio#venture-alphajuri`}>{c.view} ↗</Link></div></div></article>
      <article id="home-wir" className="venture-feature"><VentureExhibit kind="risk" language={language} /><div className="venture-description"><div><span className="venture-domain">WIR / InsurTech</span><h3>{c.insurance}</h3></div><div><p>{c.insuranceBody}</p><p className="venture-role">{c.ventureRole}</p><Link className="editorial-link" to={`/${language}/portfolio#venture-wir`}>{c.view} ↗</Link></div></div></article>
      <article id="home-cria" className="venture-feature"><VentureExhibit kind="brand" language={language} /><div className="venture-description"><div><span className="venture-domain">CRIA / Brand &amp; Go-to-market</span><h3>{c.brand}</h3></div><div><p>{c.brandBody}</p><p className="venture-role">{c.ventureRole}</p><Link className="editorial-link" to={`/${language}/portfolio#venture-cria`}>{c.view} ↗</Link></div></div></article>
    </section>
    <section id="perspective" className="perspective-section">
      <PerspectiveSkyline /><div className="perspective-shade" />
      <div className="perspective-content"><Heading lines={c.perspectiveTitle} /><p>{c.perspectiveBody}</p><a className="editorial-link" href="#team">{c.peopleLink} ↗</a></div>
    </section>
    <section id="team" className="editorial-section people-section">
      <div className="section-heading-row"><Heading lines={c.peopleTitle} /><p>{c.peopleBody}</p></div>
      <div className="people-grid">{OPERATORS.map((person, index) => <article className="person-card" key={person.slug}><TeamPortrait slug={person.slug} name={person.name} city={person.city} index={index} /><h3>{person.name}</h3><p className="person-role">{person.role[language]}</p><details><summary>{c.bio}<span>+</span></summary><p>{person.fact[language].replace(/\s*[—–]\s*/g, '. ').replace(/;/g, ',')}</p>{person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer">{c.profile} ↗</a>}</details></article>)}</div>
    </section>
    <section className="editorial-section reading-section">
      <div className="section-heading-row"><Heading lines={c.thinkingTitle} /><div><p>{c.thinkingBody}</p><Link className="editorial-link" to={`/${language}/library`}>{c.library} ↗</Link></div></div>
      <div className="reading-grid">{reading.map((article, i) => <Link key={article.slug} to={`/${language}/library/${article.slug}`} className={`reading-card ${i === 0 ? 'reading-feature' : ''}`}><div className="reading-meta"><span>{article.category}</span><time dateTime={article.date}>{new Date(`${article.date}T12:00:00Z`).toLocaleDateString(language, { month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></div>{i === 0 && <div className="reading-art" aria-hidden="true"><i /><i /><i /><img src="/redesign-assets/avante-A.png" alt="" /></div>}<h3>{article[language].title}</h3>{i === 0 && <p>{article[language].description}</p>}<span className="reading-open">{c.read}<span>↗</span></span></Link>)}</div>
    </section>
    <section id="contact" className="editorial-section editorial-close"><img src="/redesign-assets/avante-A.png" alt="" loading="lazy" /><Heading lines={c.closeTitle} /><p>{c.closeBody}</p><div className="world-actions"><a className="world-button" href="mailto:cristian@avanteventures.com?subject=Building%20with%20Avante">{c.contact}<span>↗</span></a><a className="world-text-link" href="https://avanteventures.substack.com" target="_blank" rel="noopener noreferrer">{c.subscribe} ↗</a></div></section>
  </>;
}
