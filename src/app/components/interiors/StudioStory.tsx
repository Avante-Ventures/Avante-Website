import { Link } from 'react-router';
import { useLanguage } from '@/app/hooks/useLanguage';
import { BUILDER_COPY } from '../world/InsideVentureBuilder';
import { TeamPortrait } from '../world/TeamPortrait';
import { OPERATORS } from '../WhoWeAreScene';

export function StudioStory() {
  const { language } = useLanguage(), c = BUILDER_COPY[language];
  const copy = {
    en: { label: 'The work behind the company', title: 'Built alongside the people who know the problem.', intro: 'From the first market question to the first revenue milestone, we bring the founding partnership, product, engineering and capital into the same operating process.', people: 'People, close to the work.', peopleBody: 'Founders, operating partners and engineers. A team working across São Paulo and Silicon Valley, with experience attributed to the people who earned it.', meet: 'Meet the whole team' },
    pt: { label: 'O trabalho por trás da empresa', title: 'Ao lado de quem conhece o problema.', intro: 'Da primeira pergunta sobre o mercado ao primeiro marco de receita, reunimos sociedade fundadora, produto, engenharia e capital no mesmo processo operacional.', people: 'Pessoas próximas do trabalho.', peopleBody: 'Fundadores, sócios operacionais e engenheiros. Um time entre São Paulo e o Vale do Silício, com experiência atribuída a quem a construiu.', meet: 'Conheça todo o time' },
    es: { label: 'El trabajo detrás de la empresa', title: 'Junto a quienes conocen el problema.', intro: 'Desde la primera pregunta sobre el mercado hasta el primer hito de ingresos, reunimos sociedad fundadora, producto, ingeniería y capital en el mismo proceso operativo.', people: 'Personas cerca del trabajo.', peopleBody: 'Fundadores, socios operativos e ingenieros. Un equipo entre São Paulo y Silicon Valley, con la experiencia atribuida a quienes la construyeron.', meet: 'Conoce a todo el equipo' },
  }[language];
  return <>
    <section className="studio-introduction"><div><span className="interior-kicker">{copy.label}</span><h2>{copy.title}</h2></div><div><p>{copy.intro}</p><p>{c.body}</p></div></section>
    <section className="studio-capabilities" aria-label={c.model}>{c.commitments.map(([value, label, detail]) => <article key={label}><span className="interior-kicker">{label}</span><h3>{value}</h3><p>{detail}</p></article>)}</section>
    <section className="studio-people-strip"><div><span className="interior-kicker">São Paulo / Silicon Valley</span><h2>{copy.people}</h2><p>{copy.peopleBody}</p><Link className="interior-link" to={`/${language}#team`}>{copy.meet} <span>↗</span></Link></div><div className="studio-portrait-grid">{OPERATORS.filter(p => ['amanda', 'cristian', 'luiz'].includes(p.slug)).map((person,i) => <figure key={person.slug}><TeamPortrait slug={person.slug} name={person.name} city={person.city} index={i} sizes="(max-width: 700px) calc((88vw - 62px) / 2.25), (max-width: 1000px) 200px, 280px" /><figcaption>{person.name}</figcaption></figure>)}</div></section>
  </>;
}
