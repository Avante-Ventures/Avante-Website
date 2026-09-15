import { useState } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/app/hooks/useLanguage';

const STAGES = ['Research', 'Partner', 'Build', 'Traction', 'Revenue', 'Compound'];
const COPY = {
  en: {
    label: 'Inside the Venture Builder', title: ['We co-found', 'the company.'],
    thesis: 'The conviction of a founder. The discipline of an operating partner.',
    body: 'We build AI-native companies around complex Brazilian markets. Domain expertise, product, engineering and first capital come together from the start. Our role is to build the business alongside its founders, with shared ownership and responsibility for the work.',
    why: 'Why Avante', principles: 'Our operating principles', model: 'Built for depth',
    commitments: [
      ['3-4', 'Ventures per year', 'A deliberately focused annual cohort. Each company gets the attention of operating partners and a shared product and engineering team.'],
      ['$500K-$1.5M', 'Pre-seed capital per venture', 'Capital moves in tranches tied to product, pilot and revenue milestones. Avante participates as a co-founder, with aligned economics.'],
      ['First revenue', 'Hands-on through the milestone', 'Operating partners stay engaged through the first revenue milestone, then transition to board-level oversight as the company builds its own operating team.'],
    ],
    process: 'A company takes shape in six stages.', processNote: 'Each stage has work to do and a question to answer.', gate: 'The decision to advance',
    stages: [
      ['Understand the market from the inside.', 'Map the workflow with the people doing the work. Examine the buyer, the cost of the problem, existing alternatives and the constraints of operating in Brazil.', 'Is there a specific problem, an identifiable buyer and a credible reason to build?'],
      ['Form the founding partnership.', 'Bring domain operators together with Avante’s product, engineering and capital experience. Agree on roles, ownership and the operating priorities before building.', 'Do the founding team, incentives and market knowledge fit the company we want to create?'],
      ['Build around a real workflow.', 'Design and engineer the first product with users close to the process. Test how AI changes the work, with attention to data quality, integrations and operational reliability.', 'Does the product solve the core problem well enough for a customer to use it?'],
      ['Turn usage into a route to market.', 'Work with early customers to refine positioning, onboarding and distribution. Use product adoption and commercial conversations to understand where demand is strongest.', 'Can we reach the right buyer and see a credible path from use to a paid relationship?'],
      ['Connect the product to a business.', 'Validate the first revenue milestone. Review pricing, delivery costs and the work required to serve a customer. Give the company a clear commercial and operating rhythm.', 'Will a customer pay for the value, and can the company deliver it with operating discipline?'],
      ['Build the capacity to keep growing.', 'Transition operating partners toward board-level oversight. Strengthen the company’s team and systems, while carrying reusable methods and experience into future ventures.', 'Can the team own the next stage, with clear accountability and the right oversight?'],
    ],
  },
  pt: {
    label: 'Por dentro do Venture Builder', title: ['Cofundamos', 'a empresa.'],
    thesis: 'A convicção de um fundador. A disciplina de um sócio operacional.',
    body: 'Construímos empresas AI-native para mercados complexos do Brasil. Conhecimento setorial, produto, engenharia e primeiro capital se encontram desde o início. Nosso papel é construir o negócio ao lado dos fundadores, com participação societária e responsabilidade pelo trabalho.',
    why: 'Por que Avante', principles: 'Nossos princípios operacionais', model: 'Foco para ir a fundo',
    commitments: [
      ['3-4', 'Ventures por ano', 'Uma seleção anual deliberadamente concentrada. Cada empresa recebe a atenção de sócios operacionais e de um time compartilhado de produto e engenharia.'],
      ['US$500K-US$1.5M', 'Capital pré-seed por venture', 'O capital avança em parcelas vinculadas a marcos de produto, piloto e receita. A Avante participa como cofundadora, com interesses econômicos alinhados.'],
      ['Primeira receita', 'Atuação direta até esse marco', 'Os sócios operacionais atuam até o primeiro marco de receita. Depois, passam à supervisão no conselho enquanto a empresa forma seu próprio time operacional.'],
    ],
    process: 'Uma empresa toma forma em seis etapas.', processNote: 'Cada etapa tem trabalho a fazer e uma pergunta a responder.', gate: 'A decisão de avançar',
    stages: [
      ['Entender o mercado por dentro.', 'Mapeamos o fluxo com quem faz o trabalho. Examinamos o comprador, o custo do problema, as alternativas existentes e as condições de operar no Brasil.', 'Existe um problema específico, um comprador identificável e uma razão concreta para construir?'],
      ['Formar a sociedade fundadora.', 'Reunimos operadores do setor e a experiência da Avante em produto, engenharia e capital. Alinhamos papéis, participação e prioridades antes de construir.', 'O time fundador, os incentivos e o conhecimento do mercado estão alinhados com a empresa que queremos criar?'],
      ['Construir para um fluxo real.', 'Desenhamos e desenvolvemos o primeiro produto próximos dos usuários. Testamos como a IA transforma o trabalho, com atenção à qualidade dos dados, integrações e confiabilidade.', 'O produto resolve o problema central bem o suficiente para um cliente utilizá-lo?'],
      ['Transformar uso em acesso ao mercado.', 'Trabalhamos com os primeiros clientes para refinar posicionamento, integração e distribuição. A adoção do produto e as conversas comerciais mostram onde a demanda é mais forte.', 'Conseguimos alcançar o comprador certo e enxergar um caminho do uso para uma relação paga?'],
      ['Conectar o produto ao negócio.', 'Validamos o primeiro marco de receita. Revisamos preço, custos de entrega e o trabalho de atender o cliente. Estabelecemos um ritmo comercial e operacional claro.', 'O cliente paga pelo valor e a empresa consegue entregá-lo com disciplina operacional?'],
      ['Criar capacidade para continuar crescendo.', 'Os sócios operacionais passam à supervisão no conselho. Fortalecemos o time e os sistemas da empresa e levamos métodos e experiência reutilizáveis às próximas ventures.', 'O time consegue assumir a próxima etapa, com responsabilidades claras e a supervisão adequada?'],
    ],
  },
  es: {
    label: 'Dentro del Venture Builder', title: ['Cofundamos', 'la empresa.'],
    thesis: 'La convicción de un fundador. La disciplina de un socio operativo.',
    body: 'Construimos empresas AI-native para mercados complejos de Brasil. Experiencia sectorial, producto, ingeniería y primer capital se reúnen desde el inicio. Nuestro papel es construir el negocio junto a sus fundadores, con participación y responsabilidad compartidas.',
    why: 'Por qué Avante', principles: 'Nuestros principios operativos', model: 'Foco para construir a fondo',
    commitments: [
      ['3-4', 'Ventures al año', 'Una selección anual deliberadamente concentrada. Cada empresa recibe la atención de socios operativos y de un equipo compartido de producto e ingeniería.'],
      ['USD500K-USD1.5M', 'Capital pre-seed por venture', 'El capital avanza por tramos ligados a hitos de producto, piloto e ingresos. Avante participa como cofundador, con intereses económicos alineados.'],
      ['Primeros ingresos', 'Trabajo directo hasta ese hito', 'Los socios operativos siguen involucrados hasta el primer hito de ingresos. Después pasan a la supervisión desde la junta mientras la empresa forma su propio equipo operativo.'],
    ],
    process: 'Una empresa toma forma en seis etapas.', processNote: 'Cada etapa tiene trabajo por hacer y una pregunta por responder.', gate: 'La decisión de avanzar',
    stages: [
      ['Entender el mercado desde dentro.', 'Mapeamos el proceso con las personas que hacen el trabajo. Estudiamos al comprador, el costo del problema, las alternativas y las condiciones de operar en Brasil.', '¿Hay un problema específico, un comprador identificable y una razón concreta para construir?'],
      ['Formar la sociedad fundadora.', 'Reunimos a operadores del sector con la experiencia de Avante en producto, ingeniería y capital. Acordamos roles, participación y prioridades antes de construir.', '¿El equipo fundador, los incentivos y el conocimiento del mercado encajan con la empresa que queremos crear?'],
      ['Construir para un proceso real.', 'Diseñamos y desarrollamos el primer producto cerca de los usuarios. Probamos cómo la IA cambia el trabajo, atendiendo la calidad de los datos, las integraciones y la fiabilidad.', '¿El producto resuelve el problema central lo suficientemente bien para que un cliente lo use?'],
      ['Convertir el uso en acceso al mercado.', 'Trabajamos con los primeros clientes para afinar posicionamiento, incorporación y distribución. La adopción y las conversaciones comerciales muestran dónde está la demanda.', '¿Podemos llegar al comprador correcto y ver un camino del uso a una relación comercial pagada?'],
      ['Conectar el producto con un negocio.', 'Validamos el primer hito de ingresos. Revisamos precios, costos de entrega y el trabajo de atender al cliente. Establecemos un ritmo comercial y operativo claro.', '¿El cliente paga por el valor y la empresa puede entregarlo con disciplina operativa?'],
      ['Crear capacidad para seguir creciendo.', 'Los socios operativos pasan a la supervisión desde la junta. Fortalecemos el equipo y los sistemas, y llevamos métodos y experiencia reutilizables a las siguientes ventures.', '¿Puede el equipo asumir la siguiente etapa con responsabilidades claras y la supervisión adecuada?'],
    ],
  },
};

export { COPY as BUILDER_COPY, STAGES as BUILDER_STAGES };

export function InsideVentureBuilder() {
  const { language } = useLanguage();
  const c = COPY[language];
  const [stage, setStage] = useState(0);
  return <section id="studio" className="editorial-section studio-section">
    <div className="editorial-kicker">{c.label}</div>
    <div className="editorial-split">
      <h2 className="editorial-title">{c.title[0]}<br /><span>{c.title[1]}</span></h2>
      <div className="studio-description"><h3>{c.thesis}</h3><p>{c.body}</p><div className="editorial-links"><Link to={`/${language}/why-avante`}>{c.why} ↗</Link><Link to={`/${language}/principles`}>{c.principles} ↗</Link></div></div>
    </div>
    <dl className="studio-commitments" aria-label={c.model}>
      {c.commitments.map(([value, label, detail]) => <div key={label}><dt>{label}</dt><dd className="studio-commitment-value">{value}</dd><dd className="studio-commitment-detail">{detail}</dd></div>)}
    </dl>
    <div className="studio-process" aria-labelledby="studio-process-title">
      <div className="studio-process-heading"><h3 id="studio-process-title">{c.process}</h3><p>{c.processNote}</p></div>
      <div className="stage-buttons">{STAGES.map((name, i) => <button key={name} onClick={() => setStage(i)} aria-pressed={stage === i} aria-controls="stage-description"><span>0{i + 1}</span>{name}</button>)}</div>
      <div className="stage-description" id="stage-description" aria-live="polite" aria-atomic="true">
        <span>0{stage + 1}</span><h4>{c.stages[stage][0]}</h4>
        <div className="stage-detail"><p>{c.stages[stage][1]}</p><div className="stage-gate"><span>{c.gate}</span><p>{c.stages[stage][2]}</p></div></div>
      </div>
    </div>
  </section>;
}
