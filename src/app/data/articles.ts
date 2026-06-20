// Single source of truth for Library articles.
// Used by:
//   - LibraryPage (renders the index/grid + click-throughs)
//   - ArticlePage (renders individual /library/<slug> routes)
//   - prerender script (iterates slugs to crawl)
//   - sitemap.xml + llms.txt generation (when re-built)
//
// Schema.org Article requirements: headline, description, datePublished,
// author, publisher are all here per article.

export type Category =
  | 'insights'
  | 'research'
  | 'casestudies'
  | 'playbooks'
  | 'brazil'
  | 'ai'

export interface ArticleSection {
  /** Optional heading. Leave undefined for intro paragraphs after the title. */
  heading?: string
  /** Heading level — 2 = section, 3 = subsection. Defaults to 2. */
  level?: 2 | 3
  /** Body paragraphs (rendered in order, each as a <p>). */
  paragraphs?: string[]
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[]
  /** Optional pull-quote/callout rendered after content. */
  callout?: { kind: 'quote' | 'stat' | 'tip'; text: string; attribution?: string }
  /** Optional comparison table rendered after bullets, before the callout.
   *  Cells support the same inline-link markdown as paragraphs. */
  table?: { headers: string[]; rows: string[][]; caption?: string }
}

export interface ArticleLocaleContent {
  title: string
  description: string
  sections: ArticleSection[]
  /** Optional FAQ block rendered at the end of the article. Each entry also
   *  feeds a Schema.org FAQPage node in the JSON-LD graph (rich results +
   *  LLM/AI-Overview citation). Answers support inline-link markdown. */
  faqs?: { q: string; a: string }[]
}

export interface Article {
  slug: string
  category: Category
  type: string
  readTime: string
  featured?: boolean
  date: string
  /** YYYY-MM-DD for JSON-LD datePublished */
  datePublished: string
  /** YYYY-MM-DD for JSON-LD dateModified; falls back to datePublished when absent */
  dateModified?: string
  en: ArticleLocaleContent
  pt: ArticleLocaleContent
  /** Optional Spanish translation. When absent, ES viewers see EN with a
   *  banner indicating the ES translation is in progress. JSON-LD still
   *  declares inLanguage:'es' on the /es/ URL — Google treats the URL as
   *  an es-region landing page that is currently serving en content (which
   *  is the truth on the ground). */
  es?: ArticleLocaleContent
  /** True if full long-form content is published. False = stub/coming-soon. */
  isPublished: boolean
  /** Optional per-article social/OG image, absolute path from site root
   *  (e.g. /og/<slug>.png). Falls back to the global /og-image.png when absent.
   *  Used for og:image, twitter:image, and the JSON-LD Article.image. */
  ogImage?: string
}

// ─────────────────────────────────────────────────────────────────────
// FEATURED — full long-form content
// ─────────────────────────────────────────────────────────────────────

const articleVentureStudios: Article = {
  slug: 'venture-studios-outperform-traditional-vc',
  category: 'insights',
  type: 'Research Report',
  readTime: '12 min',
  featured: true,
  date: 'Jan 2026',
  datePublished: '2026-01-18',
  isPublished: true,
  en: {
    title: 'Why Venture Studios Outperform Traditional VC',
    description: "The data is striking: venture studios generate ~50% IRR vs ~19% for traditional VC. Here's the structural reason, and why Brazil is the next theater for the model.",
    sections: [
      {
        paragraphs: [
          "Most asset classes report performance in five-year smoothing. Venture studios don't have that luxury, every cohort is a single year of decisions. Yet the data, gathered consistently for over a decade now, points in one direction: when measured over realistic time horizons, studios produce roughly 2.5× the IRR of traditional venture capital.",
          "The Global Startup Studio Network (GSSN) report, the industry's most-cited longitudinal study, pegs studio IRR at around 50%, against an industry-standard ~19% for VC funds in similar vintages. That gap isn't a quirk of measurement. It's a structural consequence of how the model is built.",
        ],
      },
      {
        heading: 'The 50% IRR isn\'t about luck',
        paragraphs: [
          "If you spent fifteen minutes thinking about VC returns, you'd assume the gap is explained by survivorship bias, only the studios with great deals report data. The GSSN methodology controls for that: dead studios, dormant studios, and studios with subpar returns are all in the dataset.",
          "Look closer and three structural advantages emerge that traditional VC simply cannot replicate at scale, no matter how good the partners are.",
        ],
      },
      {
        heading: 'Advantage 1: Operational depth, by design',
        level: 3,
        paragraphs: [
          "A traditional VC partner sits on 8–12 boards. Their lever is advice, introductions, and reserve capital. None of those compound at the daily-operating-decision layer where a startup actually wins or dies.",
          "A venture studio's operating partner is in the codebase, the unit economics spreadsheet, and the first hiring conversation. The studio has shared infrastructure, recruiters who already know the pipeline, finance leads who set up the books from day one, GTM operators who've sold into adjacent markets. The compounding effect is brutal: each new venture launches 6–9 months ahead of where a similarly-funded standalone team would be.",
        ],
        callout: {
          kind: 'stat',
          text: '6–9 months: typical time-to-traction advantage of a studio venture vs an unaffiliated team with the same capital.',
        },
      },
      {
        heading: 'Advantage 2: Time efficiency at the portfolio level',
        level: 3,
        paragraphs: [
          "VC funds are constrained by deal flow. A partner spends 60%+ of their time sourcing, evaluating, and chasing rounds they may not win. The actual ownership built per hour-of-attention is low.",
          'Studios invert this. Every venture is a venture the studio chose to start, sourcing is internal, evaluation is performed before founding, and the firm is the first investor by definition. The hours-to-ownership ratio is dramatically better, and crucially, those hours are spent at the stage where small operational interventions create the largest strategic deltas.',
        ],
      },
      {
        heading: 'Advantage 3: Capital efficiency through repeatable systems',
        level: 3,
        paragraphs: [
          "A first-time founder spends roughly 40% of pre-seed capital on what we'd call 'company plumbing', legal entity setup, payroll/HR, accounting books, basic security and compliance, founding GTM playbook construction. Most of that is repeated work across every venture in a region.",
          "Studios solve plumbing once. Subsequent ventures inherit it on day one. Result: every dollar deployed goes further toward differentiation work. In our experience this difference alone routes ~$300K–$500K of effective capital per venture into product and traction-building rather than overhead.",
        ],
      },
      {
        heading: 'Why this matters for Brazil specifically',
        paragraphs: [
          "Brazil's startup ecosystem has a structural shortage that makes the studio model especially well-suited: domain operators with 10+ years of Brazilian-market scar tissue. These are people who know how to navigate fragmented service industries, complicated tax regimes, and a labor market with unusual dynamics, but they're not natively wired to read SaaS metrics or design AI-native product loops.",
          "A studio bridges that. Domain operator + Silicon Valley playbook + first-ticket capital, all assembled day one. The local market offers what's globally rare in 2026: massive service-economy volume (70% of GDP), low product penetration, and AI infrastructure now cheap enough to deploy without a Series A.",
          "We see Brazil as one of the cleanest setups of any geography for studio outperformance, and the early data from our portfolio bears that out. The full sector-by-sector picture is in [where the AI-native opportunity sits in Brazil](/library/brazil-ai-market-report-2026).",
        ],
      },
      {
        heading: 'How Avante implements the model',
        paragraphs: [
          "We launch 3–4 ventures per year. Each goes through the same six-stage system (Research → Partner → Build → Traction → Revenue → Compound) with shared studio infrastructure across all of them. Operating partners stay engaged through the first revenue milestone, then transition to board-level oversight.",
          'Capital deployment per venture sits in the $500K–$1.5M range across pre-seed, with the studio retaining co-founder economics. We measure ourselves not by deal flow but by IRR per cohort, the only honest measure of whether the model is working.',
        ],
        callout: {
          kind: 'quote',
          text: 'We are not tourists. We have built, scaled, and exited. Now we are deploying that pattern recognition to build Brazil\'s next category leaders.',
          attribution: 'Avante Founding Team',
        },
      },
      {
        heading: 'Sources and further reading',
        paragraphs: [
          'GSSN Annual Report 2025 (Global Startup Studio Network), the longitudinal IRR comparison referenced above.',
          'Cambridge Associates US Venture Capital Index Q4 2025, for the ~19% benchmark IRR figure.',
          'Brazil VC + Tech Report 2025 (LAVCA), service-economy and AI-investment data points.',
        ],
      },
    ],
  },
  pt: {
    title: 'Por Que Venture Studios Superam VC Tradicional',
    description: 'Os dados são contundentes: venture studios geram ~50% de IRR vs ~19% do VC tradicional. A razão estrutural, e por que o Brasil é o próximo palco do modelo.',
    sections: [
      {
        paragraphs: [
          'A maioria das classes de ativos reporta performance suavizada em cinco anos. Venture studios não têm esse luxo, cada cohort é um único ano de decisões. Ainda assim, os dados consistentes da última década apontam em uma direção: quando medidos em horizontes realistas, studios produzem aproximadamente 2.5× o IRR do venture capital tradicional.',
          'O relatório anual da GSSN (Global Startup Studio Network), o estudo longitudinal mais citado da indústria, coloca o IRR de studios em ~50%, contra um padrão de ~19% de fundos de VC em vintages similares. Essa diferença não é estatística. É uma consequência estrutural de como o modelo é construído.',
        ],
      },
      {
        heading: 'Os 50% de IRR não são sorte',
        paragraphs: [
          'Se você passar quinze minutos pensando em retornos de VC, vai assumir que a diferença é explicada por viés de sobrevivência, apenas os studios com bons deals reportam dados. A metodologia da GSSN controla isso: studios mortos, dormentes e com retornos abaixo da média estão todos no dataset.',
          'Olhe mais de perto e três vantagens estruturais emergem que o VC tradicional simplesmente não pode replicar em escala, não importa o quão bons sejam os partners.',
        ],
      },
      {
        heading: 'Vantagem 1: Profundidade operacional por design',
        level: 3,
        paragraphs: [
          'Um partner de VC tradicional senta em 8–12 conselhos. Sua alavanca é conselho, introduções e capital de reserva. Nenhuma delas compõe na camada de decisão operacional diária onde uma startup realmente vence ou morre.',
          'Um operating partner de venture studio está no código, na planilha de unit economics e na primeira conversa de contratação. O studio tem infraestrutura compartilhada, recrutadores que já conhecem o pipeline, líderes financeiros que estruturam a contabilidade desde o dia um, operadores de GTM que já venderam em mercados adjacentes. O efeito de composição é brutal: cada novo venture lança 6–9 meses à frente de onde um time independente similarmente capitalizado estaria.',
        ],
        callout: {
          kind: 'stat',
          text: '6–9 meses: vantagem típica em time-to-traction de um venture de studio vs um time não afiliado com o mesmo capital.',
        },
      },
      {
        heading: 'Vantagem 2: Eficiência de tempo no nível do portfólio',
        level: 3,
        paragraphs: [
          'Fundos de VC são constrangidos por deal flow. Um partner gasta 60%+ do tempo sourcing, avaliando e perseguindo rounds que pode não ganhar. O ownership real construído por hora-de-atenção é baixo.',
          'Studios invertem isso. Todo venture é um venture que o studio escolheu começar, sourcing é interno, avaliação é feita antes de fundar, e a firma é o primeiro investidor por definição. A razão horas-para-ownership é dramaticamente melhor, e crucialmente, essas horas são gastas no estágio onde pequenas intervenções operacionais criam os maiores deltas estratégicos.',
        ],
      },
      {
        heading: 'Vantagem 3: Eficiência de capital via sistemas repetíveis',
        level: 3,
        paragraphs: [
          'Um first-time founder gasta aproximadamente 40% do capital pré-seed no que chamaríamos "encanamento da empresa", abertura de pessoa jurídica, folha/RH, contabilidade, segurança e compliance básicos, construção do playbook de GTM fundador. A maior parte disso é trabalho repetido em cada venture em uma região.',
          'Studios resolvem o encanamento uma vez. Os ventures subsequentes herdam tudo no dia um. Resultado: cada dólar investido vai mais longe em trabalho diferenciador. Na nossa experiência, essa diferença sozinha redireciona ~R$1.5M–R$2.5M de capital efetivo por venture para produto e tração em vez de overhead.',
        ],
      },
      {
        heading: 'Por que isso importa especificamente para o Brasil',
        paragraphs: [
          'O ecossistema brasileiro tem uma escassez estrutural que torna o modelo de studio especialmente adequado: operadores de domínio com 10+ anos de cicatrizes do mercado brasileiro. Pessoas que sabem navegar indústrias de serviço fragmentadas, regimes tributários complexos e um mercado de trabalho com dinâmicas peculiares, mas que não estão nativamente cabladas para ler métricas SaaS ou desenhar loops de produto AI-native.',
          'Um studio faz essa ponte. Operador de domínio + playbook do Vale do Silício + capital de primeiro cheque, tudo montado no dia um. O mercado local oferece o que é globalmente raro em 2026: volume massivo de economia de serviços (70% do PIB), baixa penetração de produto e infraestrutura de IA agora barata o suficiente para deployar sem uma Série A.',
          'Vemos o Brasil como um dos setups mais limpos de qualquer geografia para outperformance de studios, e os dados iniciais do nosso portfólio confirmam isso.',
        ],
      },
      {
        heading: 'Como a Avante implementa o modelo',
        paragraphs: [
          'Lançamos 3–4 ventures por ano. Cada um passa pelo mesmo sistema de seis estágios (Research → Partner → Build → Traction → Revenue → Compound) com infraestrutura de studio compartilhada entre todos. Operating partners permanecem engajados até o primeiro marco de receita, depois transitam para supervisão de conselho.',
          'Capital deployado por venture fica na faixa de R$2.5M–R$7.5M no pré-seed, com o studio retendo economics de co-founder. Nos medimos não por deal flow mas por IRR por cohort, a única medida honesta de se o modelo está funcionando.',
        ],
        callout: {
          kind: 'quote',
          text: 'Não somos turistas. Construímos, escalamos e fizemos exit. Agora estamos deployando esse pattern recognition para construir os próximos líderes de categoria do Brasil.',
          attribution: 'Time Fundador da Avante',
        },
      },
      {
        heading: 'Fontes e leituras adicionais',
        paragraphs: [
          'GSSN Annual Report 2025 (Global Startup Studio Network), comparação longitudinal de IRR referenciada acima.',
          'Cambridge Associates US Venture Capital Index Q4 2025, para o número de IRR de referência ~19%.',
          'LAVCA Brazil VC + Tech Report 2025, pontos de dados de economia de serviço e investimento em IA.',
        ],
      },
    ],
  },
  es: {
    title: 'Por Qué los Venture Studios Superan al VC Tradicional',
    description: 'Los datos son contundentes: los venture studios generan ~50% de IRR vs ~19% del VC tradicional. La razón estructural, y por qué Brasil es el próximo escenario del modelo.',
    sections: [
      {
        paragraphs: [
          'La mayoría de las clases de activos reportan desempeño suavizado a cinco años. Los venture studios no tienen ese lujo, cada cohort es un único año de decisiones. Aun así, los datos consistentes de la última década apuntan en una dirección: cuando se miden en horizontes realistas, los studios producen aproximadamente 2.5× el IRR del venture capital tradicional.',
          'El reporte anual de la GSSN (Global Startup Studio Network), el estudio longitudinal más citado de la industria, coloca el IRR de studios en ~50%, contra un estándar de ~19% de fondos VC en vintages similares. Esa brecha no es estadística. Es una consecuencia estructural de cómo se construye el modelo.',
        ],
      },
      {
        heading: 'El 50% de IRR no es suerte',
        paragraphs: [
          'Si pasas quince minutos pensando en retornos de VC, asumirás que la brecha se explica por sesgo de supervivencia, solo los studios con grandes deals reportan datos. La metodología de la GSSN controla por eso: studios muertos, dormidos y con retornos por debajo del promedio están todos en el dataset.',
          'Mira más de cerca y emergen tres ventajas estructurales que el VC tradicional simplemente no puede replicar a escala, no importa qué tan buenos sean los partners.',
        ],
      },
      {
        heading: 'Ventaja 1: Profundidad operativa por diseño',
        level: 3,
        paragraphs: [
          'Un partner de VC tradicional se sienta en 8–12 consejos. Su palanca es consejo, presentaciones y capital de reserva. Ninguna de ellas compone en la capa de decisión operativa diaria donde una startup realmente gana o muere.',
          'El operating partner de un venture studio está en el codebase, en la planilla de unit economics y en la primera conversación de contratación. El studio tiene infraestructura compartida, recruiters que ya conocen el pipeline, líderes financieros que estructuran la contabilidad desde el día uno, operadores de GTM que ya vendieron en mercados adyacentes. El efecto compositor es brutal: cada nueva venture lanza 6–9 meses adelante de donde estaría un equipo standalone con capital similar.',
        ],
        callout: {
          kind: 'stat',
          text: '6–9 meses: ventaja típica en time-to-traction de una venture de studio vs un equipo no afiliado con el mismo capital.',
        },
      },
      {
        heading: 'Ventaja 2: Eficiencia de tiempo a nivel de portafolio',
        level: 3,
        paragraphs: [
          'Los fondos VC están restringidos por deal flow. Un partner gasta 60%+ de su tiempo en sourcing, evaluando y persiguiendo rondas que puede no ganar. El ownership real construido por hora-de-atención es bajo.',
          'Los studios invierten esto. Cada venture es una venture que el studio eligió empezar, el sourcing es interno, la evaluación se hace antes de fundar, y la firma es el primer inversor por definición. La razón horas-a-ownership es dramáticamente mejor, y crucialmente, esas horas se gastan en la etapa donde pequeñas intervenciones operativas crean los mayores deltas estratégicos.',
        ],
      },
      {
        heading: 'Ventaja 3: Eficiencia de capital vía sistemas repetibles',
        level: 3,
        paragraphs: [
          'Un first-time founder gasta aproximadamente 40% del capital pre-seed en lo que llamaríamos "plomería de la empresa", apertura de persona jurídica, nómina/RRHH, libros contables, seguridad y compliance básicos, construcción del playbook GTM fundador. La mayoría de eso es trabajo repetido en cada venture en una región.',
          'Los studios resuelven la plomería una vez. Las ventures subsiguientes la heredan en el día uno. Resultado: cada dólar desplegado va más lejos en trabajo diferenciador. En nuestra experiencia, esa diferencia sola redirige ~US$300K–US$500K de capital efectivo por venture hacia producto y construcción de tracción en lugar de overhead.',
        ],
      },
      {
        heading: 'Por qué importa específicamente para Brasil',
        paragraphs: [
          'El ecosistema brasileño tiene una escasez estructural que hace al modelo de studio especialmente adecuado: operadores de dominio con 10+ años de cicatrices del mercado brasileño. Personas que saben navegar industrias de servicio fragmentadas, regímenes tributarios complicados y un mercado laboral con dinámicas inusuales, pero que no están nativamente cableadas para leer métricas SaaS o diseñar loops de producto AI-native.',
          'Un studio puentea eso. Operador de dominio + playbook de Silicon Valley + capital de primer cheque, todo ensamblado en el día uno. El mercado local ofrece lo que es globalmente raro en 2026: volumen masivo de economía de servicios (70% del PIB), baja penetración de producto e infraestructura de IA ahora barata para desplegar sin una Serie A.',
          'Vemos a Brasil como uno de los setups más limpios de cualquier geografía para outperformance de studios, y los datos iniciales de nuestro portafolio lo confirman.',
        ],
      },
      {
        heading: 'Cómo Avante implementa el modelo',
        paragraphs: [
          'Lanzamos 3–4 ventures por año. Cada una pasa por el mismo sistema de seis etapas (Research → Partner → Build → Traction → Revenue → Compound) con infraestructura de studio compartida entre todas. Los operating partners se mantienen comprometidos hasta el primer hito de revenue, después transitan a supervisión a nivel de consejo.',
          'El capital desplegado por venture está en el rango de US$500K–US$1.5M en pre-seed, con el studio reteniendo economics de co-founder. Nos medimos no por deal flow sino por IRR por cohort, la única medida honesta de si el modelo está funcionando.',
        ],
        callout: {
          kind: 'quote',
          text: 'No somos turistas. Hemos construido, escalado y hecho exit. Ahora estamos desplegando ese pattern recognition para construir los próximos líderes de categoría de Brasil.',
          attribution: 'Equipo Fundador de Avante',
        },
      },
      {
        heading: 'Fuentes y lecturas adicionales',
        paragraphs: [
          'GSSN Annual Report 2025 (Global Startup Studio Network), la comparación longitudinal de IRR referenciada arriba.',
          'Cambridge Associates US Venture Capital Index Q4 2025, para el número de IRR de referencia ~19%.',
          'LAVCA Brazil VC + Tech Report 2025, puntos de datos de economía de servicios e inversión en IA.',
        ],
      },
    ],
  },
}

const articleFirstTicket: Article = {
  slug: 'first-ticket-advantage-framework',
  category: 'playbooks',
  type: 'Playbook',
  readTime: '8 min',
  featured: true,
  date: 'Jan 2026',
  datePublished: '2026-01-12',
  isPublished: true,
  en: {
    title: 'The First Ticket Advantage: A Framework',
    description: 'The biggest determinant of venture returns isn\'t picking ability, it\'s whether you wrote the first check. Here\'s the math, and the four-filter framework Avante uses to act on it.',
    sections: [
      {
        paragraphs: [
          'There\'s a near-universal misconception about how venture returns actually work. Founders, LPs, and even working VCs tend to credit "picking", the ability to spot greatness before consensus. The data tells a different story: the dominant variable in long-term venture returns isn\'t which deals you picked. It\'s when you got into them.',
          'Specifically: did you write the first material check, or did you write the third or the fifth?',
        ],
      },
      {
        heading: 'The math: ownership decay across rounds',
        paragraphs: [
          "Take a venture that ends with a billion-dollar exit. The pre-seed first-ticket investor with a $500K check at a $4M post-money owns roughly 12.5% pre-dilution and ~4–5% post-dilution at exit, depending on subsequent rounds. That\'s ~$40–50M of return on $500K. A 100× outcome.",
          "The same investor writing $5M into the Series A at $40M post-money owns 12.5% pre-dilution but starts with much less room to compound. After three more rounds of dilution, they hold ~3–4% at exit, returning $30–40M on $5M, a respectable 7×, but a different category of outcome.",
          'The gap is structural. The first ticket is paid for taking earlier risk; subsequent rounds are paid for less risk and less ownership accordingly. There is no way to replicate first-ticket returns by doubling down later.',
        ],
        callout: {
          kind: 'stat',
          text: 'A first-ticket position can return 100×; the same exit pays the Series A investor 7×. Same company, very different outcomes.',
        },
      },
      {
        heading: 'But first ticket without information is just gambling',
        paragraphs: [
          'The reason most investors don\'t write first tickets isn\'t lack of capital. It\'s that the information asymmetry is brutal. At pre-traction, there\'s no revenue to test, no market signal, no consensus. You\'re evaluating people, ideas, and timing, and being wrong is costly.',
          'The smart move isn\'t to "swing more often" at first tickets. It\'s to systematically build information advantages BEFORE the round, so that when you write the check, you\'re not gambling, you\'re acting on conviction earned through proximity to the operators and the market.',
        ],
      },
      {
        heading: 'The Avante four-filter framework',
        paragraphs: [
          'When we evaluate a potential first-ticket investment (or a venture we\'re about to co-found), we put it through four filters. A pass requires three of four. Two-of-four = study deeper. One-or-zero = pass.',
        ],
      },
      {
        heading: 'Filter 1: Operator-market fit',
        level: 3,
        paragraphs: [
          'Does the founder have at least 7 years of in-the-arena scar tissue in this exact market? Not "knows the space", has been operationally responsible for outcomes in it. Service economies in Brazil are particularly punishing on this filter; you cannot fake fragmentation knowledge.',
          'This filter alone eliminates 80% of inbound. We\'ve been wrong about it maybe 5% of the time.',
        ],
      },
      {
        heading: 'Filter 2: AI-as-core, not bolted-on',
        level: 3,
        paragraphs: [
          'Is the AI architecture the foundation of the product\'s differentiation, or a feature you could remove and still have a working product? The latter is fragile to commoditization; the former compounds with every model improvement.',
          'A practical test: if GPT-5 became free tomorrow, does this venture get more valuable or less? AI-native gets more valuable. AI-bolted-on gets commoditized.',
        ],
      },
      {
        heading: 'Filter 3: Cashflow path inside 12 months',
        level: 3,
        paragraphs: [
          'Can we see a credible path to first revenue dollar within 12 months of founding? Not "could it work eventually", credible path, with named first customers in the pipeline.',
          'This filter is the antidote to vanity metrics. It eliminates beautiful decks with no shipping plan. It also forces founder honesty about distribution: most ventures fail because nobody bought, not because the product didn\'t work.',
        ],
      },
      {
        heading: 'Filter 4: Compoundability',
        level: 3,
        paragraphs: [
          'Once we get to traction, does the moat compound? Network effects, switching costs, data loops, regulatory advantages, at least one structural compounder needs to be visible from year one. "We\'ll be cheaper" is not a moat. Neither is "we\'ll work harder."',
          'This is the filter that separates a 5× outcome from a 100× outcome. You can survive a weak result on the other three; if filter 4 fails, the math caps your upside no matter how well you execute.',
        ],
        callout: {
          kind: 'tip',
          text: 'Three of four filters = green light. Two of four = research deeper before deciding. One or zero = pass cleanly.',
        },
      },
      {
        heading: 'Why the framework beats intuition',
        paragraphs: [
          'Intuition in pre-traction venture investing is mostly pattern-matching against your own bias. The framework forces explicit reasoning about each filter, which surfaces the disagreements within an investment team and exposes the blind spots that pure pattern-matching hides.',
          'It also creates institutional memory. We can look back at every Avante investment and see which filters passed, which were marginal, and where we got it wrong. That feedback loop is what makes the framework better over time, and is the actual reason studios outperform: structured learning compounds.',
        ],
      },
    ],
  },
  pt: {
    title: 'A Vantagem do Primeiro Cheque: Um Framework',
    description: 'O maior determinante de retornos em VC não é capacidade de escolher, é se você escreveu o primeiro cheque. A matemática, e o framework de quatro filtros que a Avante usa.',
    sections: [
      {
        paragraphs: [
          'Existe uma concepção errada quase universal sobre como retornos em VC realmente funcionam. Founders, LPs e até VCs ativos tendem a creditar a "escolha", a habilidade de identificar grandeza antes do consenso. Os dados contam uma história diferente: a variável dominante em retornos de longo prazo não é quais deals você escolheu. É quando você entrou neles.',
          'Especificamente: você escreveu o primeiro cheque material, ou o terceiro ou o quinto?',
        ],
      },
      {
        heading: 'A matemática: decaimento de ownership por round',
        paragraphs: [
          'Pegue um venture que termina com exit de bilhão de dólares. O investidor pré-seed do primeiro cheque com R$2.5M a R$20M post-money detém aproximadamente 12.5% pré-diluição e ~4–5% pós-diluição no exit, dependendo dos rounds subsequentes. Isso é ~R$200–250M de retorno em R$2.5M. Um resultado de 100×.',
          'O mesmo investidor escrevendo R$25M no Series A a R$200M post-money detém 12.5% pré-diluição mas começa com muito menos espaço para compor. Após mais três rounds de diluição, fica com ~3–4% no exit, retornando R$150–200M em R$25M, um respeitável 7×, mas uma categoria diferente de resultado.',
          'A diferença é estrutural. O primeiro cheque é pago por assumir risco mais cedo; rounds subsequentes pagam menos risco e proporcionalmente menos ownership. Não há como replicar retornos de primeiro cheque dobrando a aposta depois.',
        ],
        callout: {
          kind: 'stat',
          text: 'Uma posição de primeiro cheque pode retornar 100×; o mesmo exit paga 7× ao investidor de Series A. Mesma empresa, resultados muito diferentes.',
        },
      },
      {
        heading: 'Mas primeiro cheque sem informação é apostar',
        paragraphs: [
          'A razão pela qual a maioria dos investidores não escreve primeiros cheques não é falta de capital. É que a assimetria de informação é brutal. No pré-tração não há receita para testar, sinal de mercado, consenso. Você está avaliando pessoas, ideias e timing, e errar é caro.',
          'O movimento inteligente não é "balançar mais" em primeiros cheques. É construir sistematicamente vantagens informacionais ANTES do round, para que quando você escrever o cheque, não esteja apostando, esteja agindo com convicção construída por proximidade aos operadores e ao mercado.',
        ],
      },
      {
        heading: 'O framework de quatro filtros da Avante',
        paragraphs: [
          'Quando avaliamos um potencial primeiro cheque (ou um venture que estamos prestes a co-fundar), passamos por quatro filtros. Aprovação requer três de quatro. Dois de quatro = estudar mais. Um ou zero = pass.',
        ],
      },
      {
        heading: 'Filtro 1: Fit operador-mercado',
        level: 3,
        paragraphs: [
          'O founder tem pelo menos 7 anos de cicatrizes na arena nesse mercado exato? Não "conhece o espaço", esteve operacionalmente responsável por resultados nele. Economias de serviço no Brasil são particularmente punitivas nesse filtro; você não pode fingir conhecimento de fragmentação.',
          'Esse filtro sozinho elimina 80% do inbound. Erramos talvez 5% das vezes.',
        ],
      },
      {
        heading: 'Filtro 2: IA como núcleo, não acoplada',
        level: 3,
        paragraphs: [
          'A arquitetura de IA é a fundação da diferenciação do produto, ou uma feature que você poderia remover e ainda ter um produto funcional? A última é frágil a commoditização; a primeira compõe com cada melhoria de modelo.',
          'Um teste prático: se o GPT-5 ficasse grátis amanhã, este venture fica mais valioso ou menos? AI-native fica mais valioso. AI-acoplada fica commoditizada.',
        ],
      },
      {
        heading: 'Filtro 3: Caminho de cashflow em até 12 meses',
        level: 3,
        paragraphs: [
          'Conseguimos ver um caminho crível para primeiro real de receita dentro de 12 meses da fundação? Não "poderia funcionar eventualmente", caminho crível, com primeiros clientes nomeados no pipeline.',
          'Esse filtro é o antídoto para métricas de vaidade. Elimina decks bonitos sem plano de envio. Também força honestidade do founder sobre distribuição: a maioria dos ventures falha porque ninguém comprou, não porque o produto não funcionou.',
        ],
      },
      {
        heading: 'Filtro 4: Composabilidade',
        level: 3,
        paragraphs: [
          'Uma vez chegando à tração, o moat compõe? Efeitos de rede, switching costs, loops de dados, vantagens regulatórias, pelo menos um compositor estrutural precisa ser visível desde o ano um. "Vamos ser mais baratos" não é moat. "Vamos trabalhar mais" também não.',
          'Esse é o filtro que separa um resultado de 5× de um de 100×. Você pode sobreviver a um resultado fraco nos outros três; se o filtro 4 falha, a matemática limita seu upside não importa quão bem você execute.',
        ],
        callout: {
          kind: 'tip',
          text: 'Três de quatro filtros = sinal verde. Dois de quatro = pesquisar mais antes de decidir. Um ou zero = pass limpo.',
        },
      },
      {
        heading: 'Por que o framework supera a intuição',
        paragraphs: [
          'Intuição em VC pré-tração é majoritariamente pattern-matching contra os próprios vieses. O framework força raciocínio explícito sobre cada filtro, o que faz emergir os desacordos dentro de um time de investimento e expõe os blind spots que o pure pattern-matching esconde.',
          'Também cria memória institucional. Conseguimos olhar para trás em cada investimento da Avante e ver quais filtros passaram, quais foram marginais e onde erramos. Esse loop de feedback é o que faz o framework melhorar com o tempo, e é a verdadeira razão pela qual studios superam: aprendizado estruturado compõe.',
        ],
      },
    ],
  },
  es: {
    title: 'La Ventaja del Primer Cheque: Un Framework',
    description: 'El mayor determinante de los retornos en VC no es la habilidad de elegir, es si escribiste el primer cheque. Las matemáticas, y el framework de cuatro filtros que Avante usa para actuar sobre ello.',
    sections: [
      {
        paragraphs: [
          'Existe una concepción errada casi universal sobre cómo funcionan realmente los retornos en VC. Founders, LPs y hasta VCs activos tienden a acreditar la "elección", la habilidad de identificar grandeza antes del consenso. Los datos cuentan otra historia: la variable dominante en retornos de largo plazo no es qué deals elegiste. Es cuándo entraste en ellos.',
          'Específicamente: ¿escribiste el primer cheque material, o el tercero o el quinto?',
        ],
      },
      {
        heading: 'Las matemáticas: decaimiento de ownership a través de las rondas',
        paragraphs: [
          'Toma una venture que termina con un exit de mil millones de dólares. El inversor pre-seed del primer cheque con US$500K a US$4M post-money posee aproximadamente 12.5% pre-dilución y ~4–5% post-dilución en el exit, dependiendo de las rondas siguientes. Eso son ~US$40–50M de retorno sobre US$500K. Un resultado de 100×.',
          'El mismo inversor escribiendo US$5M en la Serie A a US$40M post-money posee 12.5% pre-dilución pero arranca con mucho menos espacio para componer. Después de tres rondas más de dilución, queda con ~3–4% en el exit, retornando US$30–40M sobre US$5M, un respetable 7×, pero una categoría diferente de resultado.',
          'La brecha es estructural. El primer cheque se paga por asumir riesgo más temprano; las rondas siguientes pagan por menos riesgo y proporcionalmente menos ownership. No hay forma de replicar retornos de primer cheque doblando la apuesta más tarde.',
        ],
        callout: {
          kind: 'stat',
          text: 'Una posición de primer cheque puede retornar 100×; el mismo exit le paga 7× al inversor de Serie A. Misma empresa, resultados muy distintos.',
        },
      },
      {
        heading: 'Pero primer cheque sin información es solo apostar',
        paragraphs: [
          'La razón por la que la mayoría de los inversores no escribe primeros cheques no es falta de capital. Es que la asimetría de información es brutal. En pre-tracción no hay revenue para testear, ni señal de mercado, ni consenso. Estás evaluando personas, ideas y timing, y equivocarte cuesta caro.',
          'El movimiento inteligente no es "swingear más" en primeros cheques. Es construir sistemáticamente ventajas informacionales ANTES de la ronda, para que cuando escribas el cheque no estés apostando, estés actuando con convicción ganada por proximidad a los operadores y al mercado.',
        ],
      },
      {
        heading: 'El framework de cuatro filtros de Avante',
        paragraphs: [
          'Cuando evaluamos una potencial inversión de primer cheque (o una venture que estamos por co-fundar), la pasamos por cuatro filtros. Aprobar requiere tres de cuatro. Dos-de-cuatro = estudiar más profundo. Uno-o-cero = pasar.',
        ],
      },
      {
        heading: 'Filtro 1: Fit operador-mercado',
        level: 3,
        paragraphs: [
          '¿Tiene el founder al menos 7 años de cicatrices en la arena en este mercado exacto? No "conoce el espacio", ha sido operativamente responsable de outcomes en él. Las economías de servicios en Brasil son particularmente punitivas en este filtro; no puedes fingir conocimiento de fragmentación.',
          'Este filtro solo elimina el 80% del inbound. Nos hemos equivocado quizá un 5% de las veces.',
        ],
      },
      {
        heading: 'Filtro 2: IA como núcleo, no acoplada',
        level: 3,
        paragraphs: [
          '¿Es la arquitectura de IA la fundación de la diferenciación del producto, o una feature que podrías remover y aún tener un producto funcional? La última es frágil a la commoditización; la primera compone con cada mejora del modelo.',
          'Una prueba práctica: si GPT-5 fuera gratis mañana, ¿esta venture se vuelve más valiosa o menos? AI-native se vuelve más valiosa. AI-acoplada se commoditiza.',
        ],
      },
      {
        heading: 'Filtro 3: Camino a cashflow dentro de 12 meses',
        level: 3,
        paragraphs: [
          '¿Podemos ver un camino creíble al primer dólar de revenue dentro de 12 meses de la fundación? No "podría funcionar eventualmente", camino creíble, con primeros clientes nombrados en el pipeline.',
          'Este filtro es el antídoto contra las métricas de vanidad. Elimina decks bonitos sin plan de envío. También fuerza honestidad del founder sobre distribución: la mayoría de las ventures fallan porque nadie compró, no porque el producto no funcionó.',
        ],
      },
      {
        heading: 'Filtro 4: Composabilidad',
        level: 3,
        paragraphs: [
          'Una vez llegando a la tracción, ¿el moat compone? Efectos de red, switching costs, loops de datos, ventajas regulatorias, al menos un compositor estructural debe ser visible desde el año uno. "Vamos a ser más baratos" no es un moat. Tampoco "vamos a trabajar más duro".',
          'Este es el filtro que separa un resultado de 5× de uno de 100×. Puedes sobrevivir un resultado débil en los otros tres; si el filtro 4 falla, las matemáticas limitan tu upside no importa qué tan bien ejecutes.',
        ],
        callout: {
          kind: 'tip',
          text: 'Tres de cuatro filtros = luz verde. Dos de cuatro = investigar más antes de decidir. Uno o cero = pasar limpiamente.',
        },
      },
      {
        heading: 'Por qué el framework supera a la intuición',
        paragraphs: [
          'La intuición en inversión VC pre-tracción es mayoritariamente pattern-matching contra tus propios sesgos. El framework fuerza razonamiento explícito sobre cada filtro, lo que saca a la luz los desacuerdos dentro de un equipo de inversión y expone los blind spots que el pure pattern-matching esconde.',
          'También crea memoria institucional. Podemos mirar atrás cada inversión de Avante y ver qué filtros pasaron, cuáles fueron marginales y dónde nos equivocamos. Ese loop de feedback es lo que hace que el framework mejore con el tiempo, y es la verdadera razón por la que los studios sobreperforman: el aprendizaje estructurado compone.',
        ],
      },
    ],
  },
}

const articleBrazilAIMarket: Article = {
  slug: 'brazil-ai-market-report-2026',
  category: 'brazil',
  type: 'Market Report',
  readTime: '15 min',
  featured: true,
  date: 'Jan 2026',
  datePublished: '2026-01-05',
  isPublished: true,
  en: {
    title: 'Brazil AI Market Report 2026',
    description: '$2.5T economy, 215M people, 70% services GDP, $4.5B AI investment, ~90% of SMEs under-digitized. The setup for AI-native venture creation in Latin America\'s largest market.',
    sections: [
      {
        paragraphs: [
          'Brazil in 2026 is in a position the rest of the developed world isn\'t: an economy large enough to matter ($2.5 trillion in GDP, ranked top-10 globally), service-economy-heavy (70%+ of output), and structurally under-digitized at the small and mid-business layer (~90% of SMEs lack basic operational software). When AI infrastructure dropped to a price point where founder teams can [deploy production-grade models without a Series A](/library/ai-infrastructure-cost-curve-latam), the constraint binding Brazilian software opportunity flipped from "can we afford to build it" to "do we have the operators to ship it."',
          'This report is our internal model of where the AI-native opportunity sits in Brazil right now. We\'re publishing it because the gap between what the global VC press writes about Brazil and what\'s actually shippable here is wide.',
        ],
      },
      {
        heading: 'The structural setup: why Brazil specifically, why now',
        paragraphs: [
          "There are five facts about the Brazilian economy that, taken together, define the AI-native opportunity better than any sectoral list:",
        ],
        bullets: [
          '$2.5T GDP, top-10 economy globally, large enough that category leaders can be billion-dollar businesses without exporting.',
          '215M people, population concentration in São Paulo / Rio / Belo Horizonte / Curitiba creates dense urban markets with shared infrastructure.',
          '70%+ services GDP, disproportionately operations-and-workflow-heavy, exactly the kind of work AI automates well.',
          '~90% of SMEs without basic software, the under-digitization is the opportunity. The entry point is "your first software," not "switch from Salesforce."',
          '$4.5B AI investment in 2025 (LAVCA + local trackers), capital is arriving but is heavily late-stage. Pre-traction is genuinely under-served.',
        ],
      },
      {
        heading: 'Why service economies are AI-native',
        paragraphs: [
          'In a product-economy GDP (think US technology and consumer goods), AI is largely a tool that makes existing software more capable. The disruption is incremental within established product categories.',
          'In a service-economy GDP, AI is something else: it can do the actual work. Legal intake, insurance underwriting, customer support, accounting reconciliation, recruiter screening, real-estate matchmaking, these aren\'t "improved by software." They are software, once a sufficiently capable model is wired correctly into the workflow.',
          'Brazil\'s 70%+ services GDP means AI-native software has a much larger surface area than in product-heavy economies. Every fragmented industry of small operators is a candidate for an AI-native consolidator. That\'s the structural setup.',
        ],
      },
      {
        heading: 'The talent layer is genuinely deeper than reported',
        paragraphs: [
          'Brazilian engineering talent is one of the most consistently underestimated strategic assets in global tech. Engineers from USP, UNICAMP, ITA and a handful of self-taught feeder pools have been shipping into US tech companies (Stripe, Shopify, Cloudflare, Datadog, OpenAI) for a decade. The depth of senior IC talent who can architect AI-native products end-to-end is, by our internal headcount, comparable to a tier-2 US metro market, and roughly one-third the cost.',
          'The talent constraint isn\'t engineering. It\'s the rarer combination of senior engineering plus domain operating experience plus first-time-founder energy. That triplet is what venture studios assemble.',
        ],
      },
      {
        heading: 'Capital geometry: the gap is at pre-traction',
        paragraphs: [
          "$4.5B of 2025 AI investment in Brazil sounds healthy, and at the late-stage level, it is. Series B / C rounds are getting funded by global tier-1 funds opening LATAM allocations. That capital is necessary and welcome.",
          "What\'s structurally absent is true pre-traction capital with operational depth attached. Local angels write small ticks; family offices want post-revenue; global VCs want Series A traction. The 0-to-1 stage where products are still being designed and first revenue is being earned is the thinnest part of the capital stack, and it\'s precisely the stage where studio-style operational involvement creates the most value.",
        ],
        callout: {
          kind: 'stat',
          text: 'In our model, the addressable pre-traction AI-native venture-building opportunity in Brazil is approximately 200–300 net-new ventures per year through 2030.',
        },
      },
      {
        heading: 'Sectors we watch closely',
        paragraphs: [
          'Out of the broader services landscape, six sectors keep returning to the top of our pipeline because they share three traits: high fragmentation, mostly-manual workflows, and a clear path to monthly recurring revenue from day one. The reason a focused entrant can defend these verticals is the [data network effect that compounds inside vertical AI](/library/data-network-effects-vertical-ai).',
        ],
      },
      {
        heading: 'Legal services',
        level: 3,
        paragraphs: [
          'Brazilian legal is famously fragmented (60K+ small firms), heavily document-driven, and nearly entirely operated through email and spreadsheets. AI-native intake, document drafting, deadline tracking, and judicial-precedent search are all viable. Early ventures here are showing 5× intake-volume increases at 90% lower cost than legacy paralegal teams.',
        ],
      },
      {
        heading: 'Insurance underwriting and claims',
        level: 3,
        paragraphs: [
          'Brazil\'s insurance penetration is below OECD average but growing fast. The legacy underwriting infrastructure was built for high-touch agent distribution; AI-native pricing and claims-triage products can serve the next 100M policyholders with dramatically lower OPEX. WIR (one of our portfolio companies) is in this category.',
        ],
      },
      {
        heading: 'SMB accounting and finance',
        level: 3,
        paragraphs: [
          '15M SMEs in Brazil, most still on hand-keyed bookkeeping. The combination of complex tax regimes plus AI-native bookkeeping plus open banking creates a setup for vertical SaaS that auto-categorizes, auto-reconciles, and auto-generates compliance filings. Margin structure is excellent because the work is genuinely repeatable.',
        ],
      },
      {
        heading: 'Real-estate auction intelligence',
        level: 3,
        paragraphs: [
          'Brazil has a peculiar judicial-debt and bank-foreclosure auction market that\'s opaque, document-heavy, and full of inefficiencies. AI-native scraping plus enrichment plus scoring creates an information arbitrage that returns capital quickly. We have a venture (BR Auction Intel) operating in this space.',
        ],
      },
      {
        heading: 'Healthcare administration',
        level: 3,
        paragraphs: [
          "Brazilian private healthcare runs on a tangle of operadora-prestador relationships with manual claims, prior-auth, and reconciliation workflows. AI-native middleware that automates these steps is showing 70%+ time-to-decision improvements where deployed. This sector is constrained more by regulation than by AI capability, patient teams that can navigate ANS rules win.",
        ],
      },
      {
        heading: 'Recruiting and workforce ops',
        level: 3,
        paragraphs: [
          'Brazilian labor law (CLT) makes hiring and managing workforce structurally complex. AI-native recruiting tools that handle CLT compliance, automate screening, and integrate with eSocial + folha workflows have clear willingness-to-pay from mid-market companies. Mid-tier opportunity but durable.',
        ],
      },
      {
        heading: 'What this means for capital allocators',
        paragraphs: [
          'If you\'re an LP allocating to LATAM in 2026, the highest-leverage exposure is at pre-traction with operational involvement. The Series A market is increasingly competed; the late-stage market is global-fund-dominated; pre-seed and seed with hands-on studios is where IRR potential is highest and where capital deployed compounds fastest. The structural reason studios win this stage is laid out in [why venture studios win in LATAM](/library/why-venture-studios-win-latam).',
          'For founders, the implication is simpler: build AI-native, focus on a fragmented service vertical with named first customers, and prove unit economics inside 12 months. Capital will follow.',
        ],
      },
      {
        heading: 'Risks and what we\'re watching',
        paragraphs: [
          'The biggest risk to the thesis is regulatory drift on AI in regulated industries (especially healthcare and financial services), where the cost-and-time-to-launch could materially extend. We track this monthly via direct relationships with the regulators and via portfolio company friction logs.',
          'The second risk is talent compression: as global funds enter Brazil, senior engineering compensation has been rising faster than revenue at most early-stage ventures. Studio-style infrastructure helps absorb this, but it bears watching at portfolio level.',
          'The third, and currently smallest, risk is capital deployment crowding at Series A. We don\'t see it as a near-term concern but it would change the dynamics of follow-on rounds for studio ventures if it materializes.',
        ],
      },
      {
        heading: 'Methodology and sources',
        paragraphs: [
          'GDP, services share, and SME data: Banco Central do Brasil 2025 reports + IBGE national accounts.',
          'AI investment numbers: LAVCA Brazil + private deal-tracking from Distrito.',
          'Talent assessments: Avante internal pipeline data plus public LinkedIn + GitHub signals across 800+ engineers reviewed in the past 12 months.',
          'Sector-specific traction figures: Avante portfolio + comparable benchmarks from non-portfolio operators we have direct conversations with.',
        ],
      },
    ],
  },
  pt: {
    title: 'Relatório do Mercado de IA no Brasil 2026',
    description: 'Economia de US$2.5T, 215M de pessoas, 70% de serviços no PIB, US$4.5B de investimento em IA, ~90% das PMEs sub-digitalizadas. O setup para criação de ventures AI-native no maior mercado da América Latina.',
    sections: [
      {
        paragraphs: [
          'O Brasil em 2026 está em uma posição que o resto do mundo desenvolvido não está: uma economia grande o suficiente para importar (US$2.5 trilhões em PIB, top-10 globalmente), pesada em serviços (70%+ do output) e estruturalmente sub-digitalizada na camada de pequenas e médias empresas (~90% das PMEs não têm software operacional básico). Quando a infraestrutura de IA chegou a um preço onde times fundadores podem deployar modelos production-grade sem uma Série A, a restrição que limitava a oportunidade de software brasileiro flipou de "podemos pagar para construir" para "temos os operadores para enviar".',
          'Este relatório é nosso modelo interno de onde a oportunidade AI-native está no Brasil agora. Publicamos porque a diferença entre o que a imprensa global de VC escreve sobre o Brasil e o que é realmente entregável aqui é grande.',
        ],
      },
      {
        heading: 'O setup estrutural: por que Brasil especificamente, por que agora',
        paragraphs: [
          'Existem cinco fatos sobre a economia brasileira que, em conjunto, definem a oportunidade AI-native melhor do que qualquer lista setorial:',
        ],
        bullets: [
          'PIB de US$2.5T, top-10 mundial, grande o suficiente para que líderes de categoria sejam negócios bilionários sem exportar.',
          '215M de pessoas, concentração populacional em São Paulo / Rio / Belo Horizonte / Curitiba cria mercados urbanos densos com infraestrutura compartilhada.',
          '70%+ de serviços no PIB, desproporcionalmente pesado em operações e workflows, exatamente o tipo de trabalho que IA automatiza bem.',
          '~90% das PMEs sem software básico, a sub-digitalização é a oportunidade. O ponto de entrada é "seu primeiro software", não "troque do Salesforce".',
          'US$4.5B de investimento em IA em 2025 (LAVCA + trackers locais), capital está chegando mas é pesado em estágio tardio. Pré-tração é genuinamente sub-atendido.',
        ],
      },
      {
        heading: 'Por que economias de serviço são AI-native',
        paragraphs: [
          'Em um PIB de economia de produto (pense em tecnologia e bens de consumo dos EUA), IA é em grande parte uma ferramenta que torna software existente mais capaz. A disrupção é incremental dentro de categorias de produto estabelecidas.',
          'Em um PIB de economia de serviço, IA é outra coisa: pode fazer o trabalho real. Triagem jurídica, underwriting de seguros, atendimento ao cliente, conciliação contábil, screening de recrutamento, matchmaking imobiliário, não são "melhorados por software". São software, uma vez que um modelo suficientemente capaz é cabeado corretamente no workflow.',
          'Os 70%+ de serviços no PIB do Brasil significa que software AI-native tem uma área de superfície muito maior do que em economias pesadas em produto. Cada indústria fragmentada de pequenos operadores é candidata a um consolidador AI-native. Esse é o setup estrutural.',
        ],
      },
      {
        heading: 'A camada de talento é genuinamente mais profunda do que se reporta',
        paragraphs: [
          'Talento de engenharia brasileira é um dos ativos estratégicos consistentemente mais subestimados em tech global. Engenheiros da USP, UNICAMP, ITA e um punhado de pools auto-didatas vêm enviando para empresas de tech dos EUA (Stripe, Shopify, Cloudflare, Datadog, OpenAI) há uma década. A profundidade de talento sênior IC que pode arquitetar produtos AI-native end-to-end é, pelo nosso headcount interno, comparável a um mercado metropolitano tier-2 dos EUA, e custa aproximadamente um terço.',
          'A restrição de talento não é engenharia. É a combinação mais rara de engenharia sênior mais experiência operacional de domínio mais energia de first-time founder. Esse trio é o que venture studios montam.',
        ],
      },
      {
        heading: 'Geometria de capital: o gap está na pré-tração',
        paragraphs: [
          'US$4.5B de investimento em IA em 2025 no Brasil soa saudável, e no nível de estágio tardio, é. Rounds Série B / C estão recebendo funding de fundos tier-1 globais abrindo alocações para LATAM. Esse capital é necessário e bem-vindo.',
          'O que está estruturalmente ausente é capital genuíno de pré-tração com profundidade operacional acoplada. Anjos locais escrevem ticks pequenos; family offices querem pós-receita; VCs globais querem tração de Série A. O estágio 0-para-1 onde produtos ainda estão sendo desenhados e a primeira receita está sendo conquistada é a parte mais fina do capital stack, e é precisamente o estágio onde envolvimento operacional estilo-studio cria mais valor.',
        ],
        callout: {
          kind: 'stat',
          text: 'No nosso modelo, a oportunidade endereçável de venture-building AI-native pré-tração no Brasil é de aproximadamente 200–300 ventures novos por ano até 2030.',
        },
      },
      {
        heading: 'Setores que observamos de perto',
        paragraphs: [
          'Da paisagem de serviços mais ampla, seis setores continuam voltando ao topo do nosso pipeline porque compartilham três traços: alta fragmentação, workflows majoritariamente manuais e um caminho claro para receita recorrente mensal desde o dia um.',
        ],
      },
      {
        heading: 'Serviços jurídicos',
        level: 3,
        paragraphs: [
          'O jurídico brasileiro é famosamente fragmentado (60K+ escritórios pequenos), pesado em documentos e quase inteiramente operado via email e planilhas. Triagem AI-native, geração de documentos, controle de prazos e busca de jurisprudência são todos viáveis. Ventures iniciais aqui mostram aumento de 5× em volume de triagem a 90% menos custo que times de paralegal legados.',
        ],
      },
      {
        heading: 'Underwriting e sinistros de seguros',
        level: 3,
        paragraphs: [
          'A penetração de seguros no Brasil está abaixo da média OCDE mas crescendo rápido. A infraestrutura legada de underwriting foi construída para distribuição via corretor de alta-toque; produtos AI-native de pricing e triagem de sinistros podem atender os próximos 100M de segurados com OPEX dramaticamente menor. WIR (uma das empresas do nosso portfólio) está nessa categoria.',
        ],
      },
      {
        heading: 'Contabilidade e finanças PME',
        level: 3,
        paragraphs: [
          '15M de PMEs no Brasil, a maioria ainda em escrituração manual. A combinação de regimes tributários complexos mais escrituração AI-native mais open banking cria um setup para vertical SaaS que auto-categoriza, auto-concilia e auto-gera obrigações acessórias. A estrutura de margem é excelente porque o trabalho é genuinamente repetível.',
        ],
      },
      {
        heading: 'Inteligência de leilões imobiliários',
        level: 3,
        paragraphs: [
          'O Brasil tem um mercado peculiar de leilões de dívida judicial e de execução bancária que é opaco, pesado em documentos e cheio de ineficiências. Scraping AI-native mais enrichment mais scoring cria uma arbitragem informacional que retorna capital rapidamente. Temos um venture (BR Auction Intel) operando nesse espaço.',
        ],
      },
      {
        heading: 'Administração de saúde',
        level: 3,
        paragraphs: [
          'A saúde privada brasileira roda em uma teia de relações operadora-prestador com workflows manuais de sinistros, autorização prévia e conciliação. Middleware AI-native que automatiza esses passos mostra melhorias de 70%+ em time-to-decision onde deployado. Esse setor é mais limitado por regulação que por capacidade de IA, times pacientes que sabem navegar regras da ANS vencem.',
        ],
      },
      {
        heading: 'Recrutamento e workforce ops',
        level: 3,
        paragraphs: [
          'A legislação trabalhista brasileira (CLT) torna contratação e gestão de workforce estruturalmente complexa. Ferramentas AI-native de recrutamento que lidam com compliance CLT, automatizam screening e integram com eSocial + folha têm clara willingness-to-pay de empresas mid-market. Oportunidade de tier médio mas durável.',
        ],
      },
      {
        heading: 'O que isso significa para alocadores de capital',
        paragraphs: [
          'Se você é um LP alocando para LATAM em 2026, a exposição de mais alavanca é em pré-tração com envolvimento operacional. O mercado de Série A está cada vez mais competido; o mercado de estágio tardio é dominado por fundos globais; pré-seed e seed com studios hands-on é onde o potencial de IRR é mais alto e onde capital deployado compõe mais rápido.',
          'Para founders, a implicação é mais simples: construa AI-native, foque em um vertical de serviço fragmentado com primeiros clientes nomeados, e prove unit economics dentro de 12 meses. Capital seguirá.',
        ],
      },
      {
        heading: 'Riscos e o que estamos observando',
        paragraphs: [
          'O maior risco para a tese é deriva regulatória em IA em indústrias reguladas (especialmente saúde e serviços financeiros), onde o custo-e-tempo-para-lançar pode estender materialmente. Acompanhamos isso mensalmente via relações diretas com os reguladores e via logs de fricção de empresas do portfólio.',
          'O segundo risco é compressão de talento: à medida que fundos globais entram no Brasil, compensação de engenharia sênior tem subido mais rápido que receita na maioria dos ventures de estágio inicial. Infraestrutura estilo-studio ajuda a absorver isso, mas vale observar no nível de portfólio.',
          'O terceiro, e atualmente menor, risco é crowding de capital deployado em Série A. Não vemos como preocupação de curto prazo mas mudaria as dinâmicas de rounds follow-on para ventures de studio se materializar.',
        ],
      },
      {
        heading: 'Metodologia e fontes',
        paragraphs: [
          'PIB, parcela de serviços e dados de PMEs: relatórios do Banco Central do Brasil 2025 + contas nacionais do IBGE.',
          'Números de investimento em IA: LAVCA Brasil + tracking privado de deals da Distrito.',
          'Avaliações de talento: dados de pipeline interno da Avante mais sinais públicos do LinkedIn + GitHub em 800+ engenheiros revisados nos últimos 12 meses.',
          'Números setoriais de tração: portfólio Avante + benchmarks comparáveis de operadores não-portfólio com quem temos conversas diretas.',
        ],
      },
    ],
  },
  es: {
    title: 'Reporte del Mercado de IA en Brasil 2026',
    description: 'Economía de US$2.5T, 215M de personas, 70% de servicios en el PIB, US$4.5B de inversión en IA, ~90% de las PYMEs sub-digitalizadas. El setup para creación de ventures AI-native en el mayor mercado de América Latina.',
    sections: [
      {
        paragraphs: [
          'Brasil en 2026 está en una posición en la que el resto del mundo desarrollado no está: una economía lo suficientemente grande para importar (US$2.5 billones de PIB, top-10 global), pesada en servicios (70%+ del output) y estructuralmente sub-digitalizada en la capa de pequeñas y medianas empresas (~90% de las PYMEs no tienen software operativo básico). Cuando la infraestructura de IA bajó a un precio donde equipos founders pueden desplegar modelos production-grade sin una Serie A, la restricción que limitaba la oportunidad de software brasileño se invirtió de "¿podemos pagar para construirlo?" a "¿tenemos los operadores para enviarlo?".',
          'Este reporte es nuestro modelo interno de dónde está la oportunidad AI-native en Brasil ahora mismo. Lo publicamos porque la brecha entre lo que la prensa global de VC escribe sobre Brasil y lo que es realmente entregable aquí es amplia.',
        ],
      },
      {
        heading: 'El setup estructural: por qué Brasil específicamente, por qué ahora',
        paragraphs: [
          'Hay cinco hechos sobre la economía brasileña que, tomados en conjunto, definen la oportunidad AI-native mejor que cualquier lista sectorial:',
        ],
        bullets: [
          'PIB de US$2.5T, top-10 mundial, lo suficientemente grande para que líderes de categoría sean negocios billonarios sin exportar.',
          '215M de personas, concentración poblacional en São Paulo / Río / Belo Horizonte / Curitiba crea mercados urbanos densos con infraestructura compartida.',
          '70%+ del PIB en servicios, desproporcionadamente pesado en operaciones y workflows, exactamente el tipo de trabajo que la IA automatiza bien.',
          '~90% de las PYMEs sin software básico, la sub-digitalización es la oportunidad. El punto de entrada es "tu primer software", no "cámbiate de Salesforce".',
          'US$4.5B de inversión en IA en 2025 (LAVCA + trackers locales), el capital está llegando pero está pesado hacia etapa tardía. Pre-tracción está genuinamente sub-atendido.',
        ],
      },
      {
        heading: 'Por qué las economías de servicios son AI-native',
        paragraphs: [
          'En un PIB de economía de producto (piensa en tecnología y bienes de consumo de EE.UU.), la IA es en gran medida una herramienta que hace al software existente más capaz. La disrupción es incremental dentro de categorías de producto establecidas.',
          'En un PIB de economía de servicios, la IA es otra cosa: puede hacer el trabajo real. Triaje legal, underwriting de seguros, atención al cliente, conciliación contable, screening de reclutamiento, matchmaking inmobiliario, no son "mejorados por software". Son software, una vez que un modelo lo suficientemente capaz se cablea correctamente al workflow.',
          'El 70%+ de servicios en el PIB de Brasil significa que el software AI-native tiene un área de superficie mucho mayor que en economías pesadas en producto. Cada industria fragmentada de pequeños operadores es candidata a un consolidador AI-native. Ese es el setup estructural.',
        ],
      },
      {
        heading: 'La capa de talento es genuinamente más profunda de lo que se reporta',
        paragraphs: [
          'El talento de ingeniería brasileño es uno de los activos estratégicos consistentemente más subestimados en tech global. Ingenieros de USP, UNICAMP, ITA y un puñado de pools auto-didactas vienen enviando a empresas tech de EE.UU. (Stripe, Shopify, Cloudflare, Datadog, OpenAI) hace una década. La profundidad de talento sénior IC que puede arquitectar productos AI-native end-to-end es, según nuestro headcount interno, comparable a un mercado metropolitano tier-2 de EE.UU., y cuesta aproximadamente un tercio.',
          'La restricción de talento no es la ingeniería. Es la combinación más rara de ingeniería sénior + experiencia operativa de dominio + energía de first-time founder. Ese trío es lo que los venture studios ensamblan.',
        ],
      },
      {
        heading: 'Geometría de capital: el gap está en pre-tracción',
        paragraphs: [
          'US$4.5B de inversión en IA en 2025 en Brasil suena saludable, y a nivel de etapa tardía, lo es. Rondas Serie B / C están recibiendo funding de fondos tier-1 globales abriendo asignaciones a LATAM. Ese capital es necesario y bienvenido.',
          'Lo que está estructuralmente ausente es capital genuino de pre-tracción con profundidad operativa adjunta. Ángeles locales escriben tickets pequeños; family offices quieren post-revenue; VCs globales quieren tracción de Serie A. La etapa 0-a-1 donde los productos aún se están diseñando y la primera receta se está ganando es la parte más delgada del capital stack, y es precisamente la etapa donde el involucramiento operativo estilo-studio crea más valor.',
        ],
        callout: {
          kind: 'stat',
          text: 'En nuestro modelo, la oportunidad direccionable de venture-building AI-native pre-tracción en Brasil es de aproximadamente 200–300 ventures nuevas por año hasta 2030.',
        },
      },
      {
        heading: 'Sectores que observamos de cerca',
        paragraphs: [
          'Del paisaje más amplio de servicios, seis sectores siguen volviendo al tope de nuestro pipeline porque comparten tres rasgos: alta fragmentación, workflows mayoritariamente manuales y un camino claro hacia revenue recurrente mensual desde el día uno.',
        ],
      },
      {
        heading: 'Servicios legales',
        level: 3,
        paragraphs: [
          'El sector legal brasileño es famosamente fragmentado (60K+ pequeñas firmas), pesado en documentos y casi enteramente operado vía email y planillas. Triaje AI-native, generación de documentos, control de plazos y búsqueda de jurisprudencia son todos viables. Ventures iniciales aquí están mostrando aumentos de 5× en volumen de triaje a 90% menos costo que equipos de paralegal legados.',
        ],
      },
      {
        heading: 'Underwriting y siniestros de seguros',
        level: 3,
        paragraphs: [
          'La penetración de seguros en Brasil está por debajo del promedio OCDE pero crece rápido. La infraestructura legada de underwriting fue construida para distribución vía corredor de alto-toque; productos AI-native de pricing y triaje de siniestros pueden atender a los próximos 100M de asegurados con OPEX dramáticamente menor. WIR (una de las empresas de nuestro portafolio) está en esta categoría.',
        ],
      },
      {
        heading: 'Contabilidad y finanzas PYME',
        level: 3,
        paragraphs: [
          '15M de PYMEs en Brasil, la mayoría aún en contabilidad manual. La combinación de regímenes tributarios complejos + contabilidad AI-native + open banking crea un setup para SaaS vertical que auto-categoriza, auto-concilia y auto-genera obligaciones fiscales. La estructura de margen es excelente porque el trabajo es genuinamente repetible.',
        ],
      },
      {
        heading: 'Inteligencia de subastas inmobiliarias',
        level: 3,
        paragraphs: [
          'Brasil tiene un mercado peculiar de subastas de deuda judicial y ejecución bancaria que es opaco, pesado en documentos y lleno de ineficiencias. Scraping AI-native + enrichment + scoring crea un arbitraje informacional que retorna capital rápidamente. Tenemos una venture (BR Auction Intel) operando en este espacio.',
        ],
      },
      {
        heading: 'Administración de salud',
        level: 3,
        paragraphs: [
          'La salud privada brasileña corre sobre una maraña de relaciones operadora-prestador con workflows manuales de siniestros, autorización previa y conciliación. Middleware AI-native que automatiza estos pasos muestra mejoras de 70%+ en time-to-decision donde se desplegó. Este sector está más limitado por la regulación que por la capacidad de IA, equipos pacientes que saben navegar reglas de la ANS ganan.',
        ],
      },
      {
        heading: 'Reclutamiento y workforce ops',
        level: 3,
        paragraphs: [
          'La legislación laboral brasileña (CLT) hace la contratación y gestión de workforce estructuralmente compleja. Herramientas AI-native de reclutamiento que manejan compliance CLT, automatizan screening e integran con eSocial + folha tienen clara willingness-to-pay de empresas mid-market. Oportunidad de tier medio pero duradera.',
        ],
      },
      {
        heading: 'Qué significa esto para asignadores de capital',
        paragraphs: [
          'Si eres un LP asignando a LATAM en 2026, la exposición de mayor apalancamiento está en pre-tracción con involucramiento operativo. El mercado Serie A está cada vez más competido; el mercado de etapa tardía está dominado por fondos globales; pre-seed y seed con studios hands-on es donde el potencial de IRR es más alto y donde el capital desplegado compone más rápido.',
          'Para founders, la implicación es más simple: construye AI-native, enfócate en una vertical de servicios fragmentada con primeros clientes nombrados, y prueba unit economics dentro de 12 meses. El capital seguirá.',
        ],
      },
      {
        heading: 'Riesgos y qué estamos observando',
        paragraphs: [
          'El mayor riesgo para la tesis es deriva regulatoria de IA en industrias reguladas (especialmente salud y servicios financieros), donde el costo-y-tiempo-de-lanzamiento podría extenderse materialmente. Lo seguimos mensualmente vía relaciones directas con los reguladores y vía logs de fricción de empresas de portafolio.',
          'El segundo riesgo es compresión de talento: a medida que fondos globales entran a Brasil, la compensación de ingeniería sénior ha venido subiendo más rápido que el revenue en la mayoría de las ventures de etapa inicial. La infraestructura estilo-studio ayuda a absorberlo, pero conviene observarlo a nivel de portafolio.',
          'El tercero, y actualmente menor, riesgo es el crowding de capital desplegado en Serie A. No lo vemos como preocupación de corto plazo pero cambiaría las dinámicas de rondas follow-on para ventures de studio si se materializa.',
        ],
      },
      {
        heading: 'Metodología y fuentes',
        paragraphs: [
          'PIB, participación de servicios y datos de PYMEs: reportes del Banco Central do Brasil 2025 + cuentas nacionales del IBGE.',
          'Números de inversión en IA: LAVCA Brasil + tracking privado de deals de Distrito.',
          'Evaluaciones de talento: datos de pipeline interno de Avante + señales públicas de LinkedIn + GitHub sobre 800+ ingenieros revisados en los últimos 12 meses.',
          'Cifras sectoriales de tracción: portafolio Avante + benchmarks comparables de operadores no-portafolio con quienes tenemos conversaciones directas.',
        ],
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────
// STUBS — title + description + a single intro section + "coming soon"
// These render as routes too, so LLMs can index the topic exists.
// ─────────────────────────────────────────────────────────────────────

function makeStub(args: {
  slug: string
  category: Category
  type: string
  readTime: string
  date: string
  datePublished: string
  en: { title: string; description: string; intro: string }
  pt: { title: string; description: string; intro: string }
  es: { title: string; description: string; intro: string }
}): Article {
  const comingSoonEn: ArticleSection = {
    callout: {
      kind: 'tip',
      text: 'This article is being drafted. The full version with data, frameworks, and case detail will be published soon. Subscribe via the contact form to be notified when it ships.',
    },
  }
  const comingSoonPt: ArticleSection = {
    callout: {
      kind: 'tip',
      text: 'Este artigo está sendo escrito. A versão completa com dados, frameworks e detalhes de casos será publicada em breve. Inscreva-se pelo formulário de contato para ser notificado quando sair.',
    },
  }
  const comingSoonEs: ArticleSection = {
    callout: {
      kind: 'tip',
      text: 'Este artículo está siendo escrito. La versión completa con datos, frameworks y detalle de casos se publicará pronto. Suscríbete por el formulario de contacto para recibir notificación cuando salga.',
    },
  }
  return {
    slug: args.slug,
    category: args.category,
    type: args.type,
    readTime: args.readTime,
    date: args.date,
    datePublished: args.datePublished,
    isPublished: false,
    en: {
      title: args.en.title,
      description: args.en.description,
      sections: [{ paragraphs: [args.en.intro] }, comingSoonEn],
    },
    pt: {
      title: args.pt.title,
      description: args.pt.description,
      sections: [{ paragraphs: [args.pt.intro] }, comingSoonPt],
    },
    es: {
      title: args.es.title,
      description: args.es.description,
      sections: [{ paragraphs: [args.es.intro] }, comingSoonEs],
    },
  }
}

const articleAvantePlaybook = makeStub({
  slug: 'building-ai-native-companies-avante-playbook',
  category: 'playbooks',
  type: 'Playbook',
  readTime: '10 min',
  date: 'Dec 2025',
  datePublished: '2025-12-15',
  en: {
    title: 'Building AI-Native Companies: The Avante Playbook',
    description: 'Our repeatable system for launching 3-4 ventures per year: from research to traction to compounding.',
    intro: 'The Avante Playbook is the operating system that produces 3–4 AI-native companies per year out of a single studio. Six stages, deliberately constrained inputs, repeatable infrastructure. The full playbook covers stage-by-stage gates, owner roles, and the metrics we use to decide whether a venture continues to the next stage.',
  },
  pt: {
    title: 'Construindo Empresas AI-Native: O Playbook Avante',
    description: 'Nosso sistema repetível para lançar 3-4 ventures por ano: de pesquisa a tração e composição.',
    intro: 'O Playbook Avante é o sistema operacional que produz 3–4 empresas AI-native por ano a partir de um único studio. Seis estágios, inputs deliberadamente constrangidos, infraestrutura repetível. O playbook completo cobre gates por estágio, papéis de owners e as métricas que usamos para decidir se um venture continua para o próximo estágio.',
  },
  es: {
    title: 'Construyendo Empresas AI-Native: El Playbook Avante',
    description: 'Nuestro sistema repetible para lanzar 3-4 ventures por año: de investigación a tracción a composición.',
    intro: 'El Playbook Avante es el sistema operativo que produce 3–4 empresas AI-native por año desde un único studio. Seis etapas, inputs deliberadamente acotados, infraestructura repetible. El playbook completo cubre gates por etapa, roles de owners y las métricas que usamos para decidir si una venture continúa a la siguiente etapa.',
  },
})

const articleCashflow90Days = makeStub({
  slug: 'idea-to-cashflow-90-days',
  category: 'casestudies',
  type: 'Case Study',
  readTime: '7 min',
  date: 'Dec 2025',
  datePublished: '2025-12-08',
  en: {
    title: 'Case Study: From Idea to Cashflow in 90 Days',
    description: "How we co-built an AI workflow automation tool in a fragmented service industry, proving unit economics in 12 weeks.",
    intro: 'A walkthrough of one Avante venture\'s first 90 days: from white-paper customer discovery to first paid contracts to validated unit economics. We share the timeline, the spend, the team composition, the GTM motion, and the specific moments where studio infrastructure changed the trajectory of the venture.',
  },
  pt: {
    title: 'Estudo de Caso: De Ideia ao Cashflow em 90 Dias',
    description: 'Como co-construímos uma ferramenta de automação de workflow com IA em uma indústria de serviços fragmentada, provando unit economics em 12 semanas.',
    intro: 'Um walkthrough dos primeiros 90 dias de um venture da Avante: do descobrimento de clientes em white-paper aos primeiros contratos pagos à validação de unit economics. Compartilhamos a timeline, o spend, a composição do time, o motion de GTM e os momentos específicos onde a infraestrutura de studio mudou a trajetória do venture.',
  },
  es: {
    title: 'Caso de Estudio: De Idea a Cashflow en 90 Días',
    description: 'Cómo co-construimos una herramienta de automatización de workflow con IA en una industria de servicios fragmentada, probando unit economics en 12 semanas.',
    intro: 'Un walkthrough de los primeros 90 días de una venture de Avante: del descubrimiento de clientes en white-paper a los primeros contratos pagados a la validación de unit economics. Compartimos el timeline, el spend, la composición del equipo, el motion de GTM y los momentos específicos donde la infraestructura del studio cambió la trayectoria de la venture.',
  },
})

const articleUnitEconomics = makeStub({
  slug: 'unit-economics-101-ltv-cac-day-one',
  category: 'insights',
  type: 'Article',
  readTime: '6 min',
  date: 'Nov 2025',
  datePublished: '2025-11-22',
  en: {
    title: 'Unit Economics 101: LTV:CAC from Day One',
    description: 'Why cashflow-first businesses compound, and how to prove unit economics before scaling.',
    intro: 'Unit economics are the most honest signal of whether a business will work. Most early-stage ventures defer the calculation; the discipline that separates compounders from burners is computing LTV and CAC from contract one and acting on the ratio every month thereafter. The full article walks through the formulas, the common mistakes, and the threshold values we use as Avante.',
  },
  pt: {
    title: 'Unit Economics 101: LTV:CAC desde o Dia Um',
    description: 'Por que negócios cashflow-first compõem, e como provar unit economics antes de escalar.',
    intro: 'Unit economics são o sinal mais honesto de se um negócio vai funcionar. A maioria dos ventures iniciais adia o cálculo; a disciplina que separa compositores de queimadores é calcular LTV e CAC desde o contrato um e agir sobre a razão todo mês depois disso. O artigo completo percorre as fórmulas, os erros comuns e os valores de threshold que usamos na Avante.',
  },
  es: {
    title: 'Unit Economics 101: LTV:CAC desde el Día Uno',
    description: 'Por qué los negocios cashflow-first componen, y cómo probar unit economics antes de escalar.',
    intro: 'Las unit economics son la señal más honesta de si un negocio va a funcionar. La mayoría de las ventures iniciales posterga el cálculo; la disciplina que separa a quienes componen de quienes queman capital es calcular LTV y CAC desde el contrato uno y actuar sobre la razón cada mes después. El artículo completo recorre las fórmulas, los errores comunes y los valores de threshold que usamos en Avante.',
  },
})

const articleAIOperatorGuide = makeStub({
  slug: 'operators-guide-ai-automation',
  category: 'ai',
  type: 'Guide',
  readTime: '9 min',
  date: 'Nov 2025',
  datePublished: '2025-11-10',
  en: {
    title: "The Operator's Guide to AI Automation",
    description: 'Identifying workflows where AI creates 10× advantages, a framework for domain experts building AI-native products.',
    intro: 'Most AI automation initiatives fail not because the model is wrong but because the workflow chosen is wrong. The full guide presents the three-question filter we use with operators (specificity, repeatability, and value-per-decision) to identify the workflows where AI delivers a 10× advantage rather than a 10% one.',
  },
  pt: {
    title: 'O Guia do Operador para Automação com IA',
    description: 'Identificando workflows onde IA cria vantagens de 10×, um framework para experts de domínio construindo produtos AI-native.',
    intro: 'A maioria das iniciativas de automação com IA falha não porque o modelo está errado mas porque o workflow escolhido está errado. O guia completo apresenta o filtro de três perguntas que usamos com operadores (especificidade, repetibilidade e valor-por-decisão) para identificar os workflows onde IA entrega uma vantagem de 10× em vez de 10%.',
  },
  es: {
    title: 'La Guía del Operador para Automatización con IA',
    description: 'Identificando workflows donde la IA crea ventajas de 10×, un framework para expertos de dominio construyendo productos AI-native.',
    intro: 'La mayoría de las iniciativas de automatización con IA fallan no porque el modelo esté equivocado, sino porque el workflow elegido lo está. La guía completa presenta el filtro de tres preguntas que usamos con operadores (especificidad, repetibilidad y valor-por-decisión) para identificar los workflows donde la IA entrega una ventaja de 10× en lugar de 10%.',
  },
})

const articleBrazilServices = makeStub({
  slug: 'brazil-service-economy-disruption',
  category: 'brazil',
  type: 'Analysis',
  readTime: '11 min',
  date: 'Oct 2025',
  datePublished: '2025-10-28',
  en: {
    title: "Why Brazil's Service Economy is Ripe for Disruption",
    description: 'Manual workflows, fragmented industries, and low software penetration create massive opportunities for AI automation.',
    intro: 'Brazil\'s 70% services GDP looks like a slow-growth weight on an emerging economy. Read it differently: it\'s the largest pool of un-software\'d work of any major economy. The full analysis breaks down the sub-sectors by addressable market, fragmentation index, and current software penetration to show where the disruption fronts are widest.',
  },
  pt: {
    title: 'Por Que a Economia de Serviços do Brasil Está Pronta para Disrupção',
    description: 'Workflows manuais, indústrias fragmentadas e baixa penetração de software criam oportunidades massivas para automação com IA.',
    intro: 'Os 70% de serviços no PIB do Brasil parecem um peso de baixo crescimento em uma economia emergente. Leia diferente: é o maior pool de trabalho não-softwarizado de qualquer economia importante. A análise completa quebra os subsetores por mercado endereçável, índice de fragmentação e penetração atual de software para mostrar onde as frentes de disrupção são mais amplas.',
  },
  es: {
    title: 'Por Qué la Economía de Servicios de Brasil Está Lista para Disrupción',
    description: 'Workflows manuales, industrias fragmentadas y baja penetración de software crean oportunidades masivas para automatización con IA.',
    intro: 'El 70% de servicios en el PIB de Brasil parece un lastre de bajo crecimiento sobre una economía emergente. Léelo distinto: es el mayor pool de trabajo no-softwarizado de cualquier economía importante. El análisis completo descompone los subsectores por mercado direccionable, índice de fragmentación y penetración actual de software para mostrar dónde están más abiertos los frentes de disrupción.',
  },
})

const articleGlobalStudioData = makeStub({
  slug: 'global-venture-studio-data-50-percent-returns',
  category: 'research',
  type: 'Data Report',
  readTime: '14 min',
  date: 'Oct 2025',
  datePublished: '2025-10-14',
  en: {
    title: 'Global Venture Studio Data: 50% Annual Returns',
    description: 'GSSN Report breakdown: why venture studios lead all asset classes and what this means for emerging markets.',
    intro: 'The Global Startup Studio Network\'s annual report is the cleanest longitudinal data available on studio performance. The full report breakdown covers IRR distribution by region, by stage of follow-on, and by sector, plus our reading of which structural advantages explain the spread between top-quartile and bottom-quartile studios.',
  },
  pt: {
    title: 'Dados Globais de Venture Studios: 50% de Retornos Anuais',
    description: 'Quebra do Relatório GSSN: por que venture studios lideram todas as classes de ativos e o que isso significa para mercados emergentes.',
    intro: 'O relatório anual da Global Startup Studio Network é o dado longitudinal mais limpo disponível sobre performance de studios. A quebra completa do relatório cobre distribuição de IRR por região, por estágio de follow-on e por setor, mais nossa leitura de quais vantagens estruturais explicam o spread entre studios do topo do quartil e do fundo do quartil.',
  },
  es: {
    title: 'Datos Globales de Venture Studios: 50% de Retornos Anuales',
    description: 'Desglose del Reporte GSSN: por qué los venture studios lideran todas las clases de activos y qué significa esto para mercados emergentes.',
    intro: 'El reporte anual de la Global Startup Studio Network es el dato longitudinal más limpio disponible sobre el desempeño de studios. El desglose completo cubre distribución de IRR por región, por etapa de follow-on y por sector, más nuestra lectura de qué ventajas estructurales explican el spread entre los studios del cuartil superior y del cuartil inferior.',
  },
})

// ─────────────────────────────────────────────────────────────────────
// CASE STUDIES — published artifacts for portfolio milestones.
// Sigga is featured on the home hero (replacing one Library article card)
// because it's our strongest single proof point: a 10× exit with Amanda
// Pinheiro on the Board.
// ─────────────────────────────────────────────────────────────────────

const articleOperatingStack: Article = {
  slug: 'inside-the-avante-operating-stack',
  category: 'playbooks',
  type: 'Playbook',
  readTime: '10 min',
  featured: true,
  date: 'Feb 2026',
  datePublished: '2026-02-08',
  isPublished: true,
  en: {
    title: 'Inside the Avante Operating Stack',
    description:
      'Most studios talk about "shared infrastructure" without specifying what they actually share. This is what Avante shares, and what we deliberately do not, across every venture in the studio.',
    sections: [
      {
        paragraphs: [
          'Every venture studio claims to offer "shared infrastructure" and "operational support" and "founder leverage." Most of those claims do not survive a careful look at what is actually shared and what is delivered case-by-case as informal partner advice. The two are very different products.',
          'Avante runs on a deliberate operating stack, a set of shared capabilities that every venture in the studio inherits on day one, with the explicit ones documented and the boundaries clear. This piece walks through what is in that stack, what is deliberately not in it, and why we believe the distinction matters more than the headline list of perks.',
        ],
      },
      {
        heading: 'The premise: shared where it compounds, separate where it differentiates',
        paragraphs: [
          'A venture studio is not a holding company and is not a services firm. The right framing is closer to a software platform: there is a shared layer of infrastructure that becomes more valuable with every venture that runs on top of it, and there is an application layer where each venture has to be radically different in order to win its market.',
          "Confusing those layers is the failure mode that has killed more studios than capital scarcity. When studios standardize on the application layer, same product patterns, same brand voice, same go-to-market motion, they produce ventures that look like a portfolio of internal projects rather than independent companies with a chance at category leadership. When studios fragment on the infrastructure layer, every venture rebuilding cap tables, payroll, security policies from scratch, they burn the entire efficiency advantage that justified the studio model in the first place.",
          'Avante is built around the opposite discipline: the infrastructure layer is shared aggressively, with named owners and SLAs. The application layer, product, brand, GTM, is held by the founders of each venture, with the studio acting as a force-multiplier rather than a designer.',
        ],
        callout: {
          kind: 'tip',
          text: 'A working studio shares infrastructure with discipline and shares application choices with restraint. The reverse pattern is why most studios underperform.',
        },
      },
      {
        heading: 'Layer 1: Capital + cap-table architecture',
        paragraphs: [
          'Every Avante venture launches with a pre-negotiated first-ticket structure: studio first-money-in at a defined ownership band, with founder economics protected against the dilution gymnastics that founder-investor mismatches typically produce in Brazilian seed deals. Cap-table templates, vesting structures, and option-pool design are pre-built and reviewed by the same legal counsel for every venture. A founder going through Stage 2 (Partner) of the playbook does not spend three weeks on incorporation choices, those decisions are already made.',
          'Concretely: standard incorporation in São Paulo with a Delaware C-corp parent, four-year founder vesting with a one-year cliff, an 18% post-Series-A option pool reserved at founding, and a Brazilian operating subsidiary structured for clean transfer pricing. None of that is novel; what matters is that it is decided once and reused, freeing founders to spend their first 90 days on customers instead of paperwork.',
        ],
      },
      {
        heading: 'Layer 2: Talent, the recruiter who already knows the funnel',
        paragraphs: [
          'The single most expensive mistake in early-stage Brazilian venture-building is the wrong first ten hires. Sourcing senior product engineers, GTM operators, or finance leads inside the local market is a long, relationship-dependent search that first-time founders are uniquely badly positioned to run. Studios fix this by maintaining a continuous talent pipeline that every new venture taps into on day one.',
          'In Avante\'s case, that means an in-house talent partner who has been running the funnel for the previous three ventures, knows which senior candidates are open to a studio venture vs which prefer a direct-funded startup, and can ship a curated shortlist within 7–10 days of a role opening. That is not a placement service. That is a structural recruitment advantage that compounds with every cohort.',
        ],
        callout: {
          kind: 'stat',
          text: '7–10 days from role opening to curated shortlist of 3–5 senior candidates. The benchmark for first-time-founder recruiting in Brazil is typically 8–14 weeks.',
        },
      },
      {
        heading: 'Layer 3: Finance, legal, and security, set up correctly from day one',
        paragraphs: [
          'A meaningful portion of pre-seed capital in Brazilian startups is consumed not by product but by the cumulative cost of getting basic operating systems wrong: messy bookkeeping that has to be re-done before a Series A, mis-classified contractor relationships that surface at audit, security postures that fail the first enterprise customer\'s vendor review.',
          'Avante runs a single accounting partner across the studio, a single information-security baseline (SOC2-ready architecture and policies set up at incorporation rather than retrofitted before the first enterprise pilot), and a shared employment-law counsel who handles the differences between CLT, PJ, and US-employee structures correctly the first time. Each venture pays its share of these capabilities at a marginal cost. None of them rebuild the work.',
        ],
      },
      {
        heading: 'Layer 4: Go-to-market templates, and the discipline to break them',
        paragraphs: [
          "Each Avante venture inherits a starting GTM playbook: the ICP definition framework, the discovery-call structure that has been refined across ten previous founder cohorts, the pilot-to-contract conversion templates, the standard pricing-sensitivity test, the sales-comp model that aligns reps with category-leader behavior rather than transactional closing. These are starting points, not endpoints. The first job of every Avante founder is to run their version of these templates against their actual market and break the parts that do not fit.",
          "Why give templates if they are meant to be broken? Because templates produce informed disagreement faster than blank pages do. A founder who has spent three weeks deciding why the standard discovery script is wrong for their vertical has produced more market understanding than a founder who has spent three weeks designing a discovery script from scratch.",
        ],
      },
      {
        heading: 'Layer 5: Distribution, the network that earns its place',
        paragraphs: [
          'The ecosystem of Avante operating partners, board members, and prior-venture alumni is a meaningful but easily overstated asset. Used badly, it becomes a series of warm intros that founders are too polite to refuse and too distracted to make use of. Used well, it becomes a structured first-30-customer pipeline curated by the people most likely to know which buyer profiles will engage seriously.',
          'Avante\'s discipline here is to run distribution as a quarterly sprint with named targets and feedback loops, rather than as a perpetual ambient resource. A venture entering Stage 4 (Traction) of the playbook gets a sprint with explicit lists, owners, and conversion metrics. After 90 days, the sprint either produced the conversation pattern the venture needed or it surfaced a market mismatch the founders need to address, both useful outcomes.',
        ],
      },
      {
        heading: 'What is deliberately NOT shared',
        paragraphs: [
          'The temptation in any studio is to over-share. Each new piece of "common infrastructure" feels like it should compound. In practice, certain pieces are corrosive when shared and only useful when each venture builds them with founder ownership.',
        ],
        bullets: [
          'Product. Each venture\'s product DNA, what it feels like to use, how it talks, what it refuses to do, has to be authored by its founders. Shared product patterns produce ventures that read as a portfolio of clones, which is a death sentence in any market with real competition.',
          'Brand and tone of voice. Founders own this entirely. The studio supplies a clean visual baseline if a venture wants it; everything else is the venture\'s decision.',
          'Customer relationships. The founder is always the senior relationship owner with first ten enterprise customers. Studio support teams help operationally but never own the relationship.',
          'Hiring decisions. Avante runs the funnel; founders make the calls. We have hard rules against the studio overriding a founder veto on a senior hire, that pattern would erode the founder authority needed for the venture to develop its own culture.',
          'Strategic direction. Operating partners can argue hard for a position, but the venture\'s strategy is the founder\'s call. The studio\'s job is to make that call as well-informed as possible, not to make it.',
        ],
        callout: {
          kind: 'quote',
          text: 'Studios that confuse "shared infrastructure" with "shared product" produce ventures that look more like internal projects than independent companies. That confusion is the single biggest reason most studios underperform their pitch.',
          attribution: 'Avante Operating Partner Notes',
        },
      },
      {
        heading: 'Why the stack compounds',
        paragraphs: [
          'The structural argument for the studio model, and the reason the empirical IRR data shows ~50% for studios vs ~19% for traditional VC over comparable vintages, is that this infrastructure layer compounds across cohorts in a way that fund-level capital allocation simply cannot. Every venture run on the stack contributes lessons that improve the templates, refine the recruiter\'s funnel, sharpen the legal-and-security baseline, and expand the distribution network for the next cohort.',
          "A first-time founder going through the playbook in 2026 inherits the cumulative learning of every Avante venture before them, plus the shared learning of partners who have built and exited at scale. That is not a marginal advantage; it is a categorical one. It is also why we expect the IRR gap between studios and traditional VC to widen rather than narrow as our portfolio matures.",
        ],
      },
      {
        heading: 'The honest limits',
        paragraphs: [
          'Operating stacks compound, but they do not eliminate execution risk. A great stack does not save a venture from a wrong market thesis, a misaligned founding team, or a product that the market simply does not want. The stack lowers the cost and increases the speed of testing those questions; it does not answer them.',
          'The other honest limit: studios that get larger faster than their stack matures end up debasing the very advantage that justifies the model. We deliberately cap the studio at 3–4 ventures per year, with a hard ceiling on operating-partner load per cohort. Growing past that without re-engineering the stack would produce the same kind of dilution-of-attention failure that traditional VC partners suffer at 8–12 board seats.',
        ],
      },
      {
        heading: 'How a founder reads this',
        paragraphs: [
          "If you are a founder considering joining a studio cohort, Avante's or anyone else's, the right question to ask is not 'what perks do you offer?' but 'what is in your stack, who owns each layer, and what is in writing about how it gets delivered?' A studio whose answer is vague is selling perks. A studio whose answer is specific is selling infrastructure. The two perform very differently across a venture's first 24 months.",
          "If you would like to see Avante's stack documents in detail, the contact form is the right starting point. We share them in a structured conversation rather than as a public download, not because they are secret, but because the documents only make sense in the context of a venture's specific stage and market.",
        ],
      },
    ],
  },
  pt: {
    title: 'Por Dentro do Stack Operacional da Avante',
    description:
      'A maioria dos studios fala em "infraestrutura compartilhada" sem especificar o que efetivamente compartilha. Esse é o stack que a Avante compartilha, e o que deliberadamente não compartilha, em cada venture do studio.',
    sections: [
      {
        paragraphs: [
          'Todo venture studio promete oferecer "infraestrutura compartilhada", "suporte operacional" e "alavancagem para fundadores". A maior parte dessas promessas não sobrevive a um olhar cuidadoso sobre o que efetivamente é compartilhado e o que é entregue caso-a-caso como conselho informal de partner. Os dois são produtos muito diferentes.',
          'A Avante roda em um stack operacional deliberado, um conjunto de capacidades compartilhadas que cada venture do studio herda no dia um, com as fronteiras documentadas e claras. Este texto percorre o que está nesse stack, o que deliberadamente não está nele, e por que acreditamos que essa distinção importa mais que a lista de benefícios da capa.',
        ],
      },
      {
        heading: 'A premissa: compartilhe onde compõe, separe onde diferencia',
        paragraphs: [
          'Um venture studio não é uma holding e não é uma empresa de serviços. O frame correto está mais perto de uma plataforma de software: há uma camada compartilhada de infraestrutura que se torna mais valiosa com cada venture que roda em cima dela, e há uma camada de aplicação onde cada venture precisa ser radicalmente diferente para ganhar seu mercado.',
          'Confundir essas camadas é o modo de falha que matou mais studios que escassez de capital. Quando studios padronizam a camada de aplicação, mesmos padrões de produto, mesma voz de marca, mesmo motion de go-to-market, produzem ventures que parecem um portfólio de projetos internos em vez de empresas independentes com chance de liderança de categoria. Quando studios fragmentam a camada de infraestrutura, cada venture reconstruindo cap tables, folha, políticas de segurança do zero, queimam toda a vantagem de eficiência que justificava o modelo de studio.',
          'A Avante é construída em torno da disciplina oposta: a camada de infraestrutura é compartilhada agressivamente, com owners nomeados e SLAs. A camada de aplicação, produto, marca, GTM, é dos fundadores de cada venture, com o studio agindo como multiplicador de força em vez de designer.',
        ],
        callout: {
          kind: 'tip',
          text: 'Um studio que funciona compartilha infraestrutura com disciplina e compartilha escolhas de aplicação com restrição. O padrão inverso é por que a maioria dos studios underperforma.',
        },
      },
      {
        heading: 'Camada 1: Capital + arquitetura de cap-table',
        paragraphs: [
          'Cada venture Avante lança com uma estrutura de primeiro cheque pré-negociada: studio first-money-in em uma faixa de ownership definida, com economics de fundador protegidos contra a ginástica de diluição que mismatches founder-investor tipicamente produzem em deals de seed brasileiros. Templates de cap-table, estruturas de vesting e desenho de option-pool são pré-construídos e revisados pelo mesmo conselho jurídico para cada venture. Um fundador passando pelo Estágio 2 (Partner) do playbook não gasta três semanas em escolhas de incorporação, essas decisões já estão tomadas.',
          'Concretamente: incorporação padrão em São Paulo com uma matriz Delaware C-corp, vesting de fundador de quatro anos com cliff de um ano, um option pool de 18% pós-Série-A reservado na fundação, e uma subsidiária operacional brasileira estruturada para transfer pricing limpo. Nada disso é novo; o que importa é que é decidido uma vez e reusado, liberando fundadores para gastar seus primeiros 90 dias com clientes em vez de papelada.',
        ],
      },
      {
        heading: 'Camada 2: Talento, o recrutador que já conhece o funil',
        paragraphs: [
          'O erro mais caro em construção de venture early-stage no Brasil é as primeiras dez contratações erradas. Sourcing de senior product engineers, operadores de GTM ou líderes financeiros dentro do mercado local é uma busca longa e dependente de relacionamento que first-time founders estão singularmente mal posicionados para rodar. Studios consertam isso mantendo um pipeline de talento contínuo que cada novo venture acessa no dia um.',
          'No caso da Avante, isso significa um talent partner in-house que já roda o funil para os três ventures anteriores, sabe quais candidatos sêniores estão abertos a um venture de studio vs quais preferem uma startup direct-funded, e consegue entregar uma shortlist curada em 7–10 dias da abertura de uma vaga. Isso não é um serviço de placement. Isso é uma vantagem estrutural de recrutamento que compõe com cada cohort.',
        ],
        callout: {
          kind: 'stat',
          text: '7–10 dias da abertura da vaga até shortlist curada de 3–5 candidatos sêniores. O benchmark para recrutamento de first-time founder no Brasil é tipicamente 8–14 semanas.',
        },
      },
      {
        heading: 'Camada 3: Financeiro, jurídico e segurança, corretos desde o dia um',
        paragraphs: [
          'Uma porção significativa do capital pré-seed em startups brasileiras é consumida não por produto mas pelo custo cumulativo de errar sistemas operacionais básicos: contabilidade bagunçada que precisa ser refeita antes de uma Série A, relacionamentos de contratante mal classificados que aparecem em auditoria, posturas de segurança que falham na primeira vendor review de cliente enterprise.',
          'A Avante roda um único parceiro contábil em todo o studio, um único baseline de segurança da informação (arquitetura e políticas SOC2-ready estabelecidas na incorporação em vez de retrofitadas antes do primeiro pilot enterprise), e um conselho jurídico-trabalhista compartilhado que lida corretamente da primeira vez com as diferenças entre estruturas CLT, PJ e US-employee. Cada venture paga sua porção dessas capacidades a custo marginal. Nenhuma reconstrói o trabalho.',
        ],
      },
      {
        heading: 'Camada 4: Templates de go-to-market, e a disciplina para quebrá-los',
        paragraphs: [
          'Cada venture Avante herda um playbook inicial de GTM: o framework de definição de ICP, a estrutura de discovery-call refinada em dez cohorts anteriores de fundadores, os templates de conversão pilot-para-contrato, o teste padrão de sensibilidade de pricing, o modelo de comp de vendas que alinha reps com comportamento de líder de categoria em vez de fechamento transacional. Esses são pontos de partida, não pontos de chegada. O primeiro trabalho de cada fundador Avante é rodar a versão deles desses templates contra o mercado real e quebrar as partes que não se encaixam.',
          'Por que dar templates se eles são para serem quebrados? Porque templates produzem desacordo informado mais rápido que páginas em branco. Um fundador que gastou três semanas decidindo por que o script padrão de discovery está errado para sua vertical produziu mais entendimento de mercado que um fundador que gastou três semanas desenhando um script de discovery do zero.',
        ],
      },
      {
        heading: 'Camada 5: Distribuição, a rede que merece seu lugar',
        paragraphs: [
          'O ecossistema de operating partners, board members e alumni de ventures anteriores da Avante é um ativo significativo mas facilmente superestimado. Usado mal, vira uma série de warm intros que fundadores são polidos demais para recusar e distraídos demais para aproveitar. Usado bem, vira um pipeline estruturado de primeiros 30 clientes curado pelas pessoas mais propensas a saber quais perfis de comprador vão engajar seriamente.',
          'A disciplina da Avante aqui é rodar distribuição como sprint trimestral com targets nomeados e feedback loops, em vez de como recurso ambiente perpétuo. Um venture entrando no Estágio 4 (Tração) do playbook ganha um sprint com listas explícitas, owners e métricas de conversão. Após 90 dias, o sprint ou produziu o padrão de conversa que o venture precisava ou trouxe à tona um mismatch de mercado que os fundadores precisam endereçar, ambos outcomes úteis.',
        ],
      },
      {
        heading: 'O que deliberadamente NÃO é compartilhado',
        paragraphs: [
          'A tentação em qualquer studio é compartilhar demais. Cada nova peça de "infraestrutura comum" parece que deveria compor. Na prática, certas peças são corrosivas quando compartilhadas e só úteis quando cada venture as constrói com ownership de fundador.',
        ],
        bullets: [
          'Produto. O DNA de produto de cada venture, como se sente usar, como conversa, o que se recusa a fazer, precisa ser autorado pelos seus fundadores. Padrões de produto compartilhados produzem ventures que se leem como portfólio de clones, o que é sentença de morte em qualquer mercado com competição real.',
          'Marca e tom de voz. Fundadores são donos disso inteiramente. O studio fornece um baseline visual limpo se um venture quiser; tudo o mais é decisão da venture.',
          'Relacionamentos com clientes. O fundador é sempre o sênior dono do relacionamento com os primeiros dez clientes enterprise. Times de suporte do studio ajudam operacionalmente mas nunca são donos do relacionamento.',
          'Decisões de contratação. A Avante roda o funil; fundadores fazem as escolhas. Temos regras rígidas contra o studio sobrescrever um veto de fundador em uma contratação sênior, esse padrão erodiria a autoridade fundadora necessária para o venture desenvolver sua própria cultura.',
          'Direção estratégica. Operating partners podem argumentar duro por uma posição, mas a estratégia da venture é decisão do fundador. O trabalho do studio é fazer essa decisão o mais bem-informada possível, não tomá-la.',
        ],
        callout: {
          kind: 'quote',
          text: 'Studios que confundem "infraestrutura compartilhada" com "produto compartilhado" produzem ventures que parecem mais projetos internos que empresas independentes. Essa confusão é a maior razão única pela qual a maioria dos studios underperforma seu pitch.',
          attribution: 'Notas de Operating Partner — Avante',
        },
      },
      {
        heading: 'Por que o stack compõe',
        paragraphs: [
          'O argumento estrutural para o modelo de studio, e a razão pela qual os dados empíricos de IRR mostram ~50% para studios vs ~19% para VC tradicional em vintages comparáveis, é que essa camada de infraestrutura compõe entre cohorts de uma forma que alocação de capital em nível de fundo simplesmente não consegue. Cada venture rodado no stack contribui com lições que melhoram os templates, refinam o funil do recrutador, afiam o baseline jurídico-e-de-segurança e expandem a rede de distribuição para o próximo cohort.',
          'Um first-time founder passando pelo playbook em 2026 herda o aprendizado cumulativo de cada venture Avante anterior, mais o aprendizado compartilhado de partners que construíram e fizeram exit em escala. Isso não é vantagem marginal; é categórica. É também por que esperamos que o gap de IRR entre studios e VC tradicional alargue em vez de fechar à medida que nosso portfólio amadurece.',
        ],
      },
      {
        heading: 'Os limites honestos',
        paragraphs: [
          'Stacks operacionais compõem, mas não eliminam risco de execução. Um stack ótimo não salva uma venture de uma tese de mercado errada, um time fundador desalinhado, ou um produto que o mercado simplesmente não quer. O stack reduz o custo e aumenta a velocidade de testar essas perguntas; não as responde.',
          'O outro limite honesto: studios que ficam grandes mais rápido que seu stack amadurece acabam degradando a própria vantagem que justifica o modelo. Deliberadamente limitamos o studio a 3–4 ventures por ano, com um teto rígido de carga de operating-partner por cohort. Crescer além disso sem re-engenhar o stack produziria o mesmo tipo de falha de diluição-de-atenção que partners de VC tradicional sofrem em 8–12 cadeiras de conselho.',
        ],
      },
      {
        heading: 'Como um fundador lê isso',
        paragraphs: [
          'Se você é um fundador considerando se juntar a um cohort de studio, da Avante ou de qualquer outro, a pergunta certa a fazer não é "quais perks vocês oferecem?" mas "o que está no stack de vocês, quem é dono de cada camada e o que está por escrito sobre como é entregue?" Um studio cuja resposta é vaga está vendendo perks. Um studio cuja resposta é específica está vendendo infraestrutura. Os dois performam muito diferente nos primeiros 24 meses de uma venture.',
          'Se você quiser ver os documentos do stack da Avante em detalhe, o formulário de contato é o ponto de partida certo. Compartilhamos eles em uma conversa estruturada em vez de como download público, não porque são secretos, mas porque os documentos só fazem sentido no contexto do estágio e mercado específicos de uma venture.',
        ],
      },
    ],
  },
  es: {
    title: 'Por Dentro del Stack Operativo de Avante',
    description:
      'La mayoría de los studios habla de "infraestructura compartida" sin especificar qué comparten realmente. Este es el stack que Avante comparte, y lo que deliberadamente no, en cada venture del studio.',
    sections: [
      {
        paragraphs: [
          'Cada venture studio promete ofrecer "infraestructura compartida", "soporte operativo" y "apalancamiento para founders". La mayoría de esas promesas no sobrevive a una mirada cuidadosa sobre qué se comparte efectivamente y qué se entrega caso-a-caso como consejo informal de partner. Los dos son productos muy distintos.',
          'Avante corre sobre un stack operativo deliberado, un conjunto de capacidades compartidas que cada venture del studio hereda en el día uno, con las fronteras documentadas y claras. Este texto recorre qué está en ese stack, qué deliberadamente no está en él, y por qué creemos que esa distinción importa más que la lista de perks de la portada.',
        ],
      },
      {
        heading: 'La premisa: comparte donde compone, separa donde diferencia',
        paragraphs: [
          'Un venture studio no es una holding y no es una firma de servicios. El frame correcto está más cerca de una plataforma de software: hay una capa compartida de infraestructura que se vuelve más valiosa con cada venture que corre encima de ella, y hay una capa de aplicación donde cada venture tiene que ser radicalmente distinta para ganar su mercado.',
          'Confundir esas capas es el modo de fallo que ha matado más studios que la escasez de capital. Cuando los studios estandarizan la capa de aplicación, mismos patrones de producto, misma voz de marca, mismo motion de go-to-market, producen ventures que parecen un portafolio de proyectos internos en vez de empresas independientes con chance de liderazgo de categoría. Cuando los studios fragmentan la capa de infraestructura, cada venture reconstruyendo cap tables, nómina, políticas de seguridad desde cero, queman toda la ventaja de eficiencia que justificaba el modelo de studio.',
          'Avante está construido en torno a la disciplina opuesta: la capa de infraestructura se comparte agresivamente, con owners nombrados y SLAs. La capa de aplicación, producto, marca, GTM, la sostienen los founders de cada venture, con el studio actuando como multiplicador de fuerza en lugar de diseñador.',
        ],
        callout: {
          kind: 'tip',
          text: 'Un studio que funciona comparte infraestructura con disciplina y comparte decisiones de aplicación con restricción. El patrón inverso es por qué la mayoría de los studios sub-rinden.',
        },
      },
      {
        heading: 'Capa 1: Capital + arquitectura de cap-table',
        paragraphs: [
          'Cada venture Avante lanza con una estructura de primer cheque pre-negociada: studio first-money-in en una banda de ownership definida, con economics de founder protegidas contra la gimnasia de dilución que los mismatches founder-investor típicamente producen en deals de seed brasileños. Los templates de cap-table, las estructuras de vesting y el diseño de option-pool están pre-construidos y revisados por el mismo consejo legal para cada venture. Un founder pasando por la Etapa 2 (Partner) del playbook no gasta tres semanas en decisiones de incorporación, esas decisiones ya están tomadas.',
          'Concretamente: incorporación estándar en São Paulo con una matriz Delaware C-corp, vesting de founder de cuatro años con cliff de un año, un option pool del 18% post-Serie-A reservado en la fundación, y una subsidiaria operativa brasileña estructurada para transfer pricing limpio. Nada de eso es novedoso; lo que importa es que se decide una vez y se reusa, liberando a los founders para gastar sus primeros 90 días con clientes en lugar de papeleo.',
        ],
      },
      {
        heading: 'Capa 2: Talento, el recruiter que ya conoce el funnel',
        paragraphs: [
          'El error más caro en construcción de venture early-stage en Brasil son las primeras diez contrataciones equivocadas. El sourcing de senior product engineers, operadores de GTM o líderes financieros dentro del mercado local es una búsqueda larga y dependiente de relaciones que los first-time founders están singularmente mal posicionados para correr. Los studios arreglan esto manteniendo un pipeline de talento continuo que cada nueva venture toca en el día uno.',
          'En el caso de Avante, eso significa un talent partner in-house que ya corre el funnel para las tres ventures anteriores, sabe qué candidatos sénior están abiertos a una venture de studio vs cuáles prefieren una startup direct-funded, y puede entregar una shortlist curada en 7–10 días de la apertura de un rol. Eso no es un servicio de placement. Es una ventaja estructural de reclutamiento que compone con cada cohort.',
        ],
        callout: {
          kind: 'stat',
          text: '7–10 días de la apertura del rol a shortlist curada de 3–5 candidatos sénior. El benchmark para reclutamiento de first-time founder en Brasil es típicamente 8–14 semanas.',
        },
      },
      {
        heading: 'Capa 3: Finanzas, legal y seguridad, bien armadas desde el día uno',
        paragraphs: [
          'Una porción significativa del capital pre-seed en startups brasileñas se consume no por producto sino por el costo acumulado de equivocarse en sistemas operativos básicos: contabilidad desordenada que tiene que rehacerse antes de una Serie A, relaciones de contractor mal clasificadas que aparecen en auditoría, posturas de seguridad que fallan en la primera vendor review de cliente enterprise.',
          'Avante corre un único partner contable a través del studio, una única baseline de seguridad de la información (arquitectura y políticas SOC2-ready establecidas en la incorporación en lugar de retroinstaladas antes del primer pilot enterprise), y un consejo legal-laboral compartido que maneja correctamente desde la primera vez las diferencias entre estructuras CLT, PJ y US-employee. Cada venture paga su parte de estas capacidades a costo marginal. Ninguna reconstruye el trabajo.',
        ],
      },
      {
        heading: 'Capa 4: Templates de go-to-market, y la disciplina para romperlos',
        paragraphs: [
          'Cada venture Avante hereda un playbook GTM inicial: el framework de definición de ICP, la estructura de discovery-call refinada en diez cohorts anteriores de founders, los templates de conversión pilot-a-contrato, el test estándar de sensibilidad de pricing, el modelo de comp de ventas que alinea reps con comportamiento de líder de categoría en lugar de cierre transaccional. Esos son puntos de partida, no puntos de llegada. El primer trabajo de cada founder Avante es correr su versión de esos templates contra su mercado real y romper las partes que no encajan.',
          '¿Por qué dar templates si están hechos para romperse? Porque los templates producen desacuerdo informado más rápido que páginas en blanco. Un founder que ha pasado tres semanas decidiendo por qué el script estándar de discovery está mal para su vertical ha producido más entendimiento de mercado que un founder que ha pasado tres semanas diseñando un script de discovery desde cero.',
        ],
      },
      {
        heading: 'Capa 5: Distribución, la red que se gana su lugar',
        paragraphs: [
          'El ecosistema de operating partners, miembros de consejo y alumni de ventures previas de Avante es un activo significativo pero fácilmente sobreestimado. Usado mal, se vuelve una serie de warm intros que los founders son demasiado educados para rechazar y demasiado distraídos para aprovechar. Usado bien, se vuelve un pipeline estructurado de primeros 30 clientes curado por las personas más propensas a saber qué perfiles de comprador van a engancharse en serio.',
          'La disciplina de Avante aquí es correr distribución como sprint trimestral con targets nombrados y feedback loops, en lugar de como recurso ambiente perpetuo. Una venture entrando en la Etapa 4 (Tracción) del playbook recibe un sprint con listas explícitas, owners y métricas de conversión. Después de 90 días, el sprint o produjo el patrón de conversación que la venture necesitaba o sacó a la luz un mismatch de mercado que los founders necesitan abordar, ambos outcomes útiles.',
        ],
      },
      {
        heading: 'Lo que deliberadamente NO se comparte',
        paragraphs: [
          'La tentación en cualquier studio es sobre-compartir. Cada nueva pieza de "infraestructura común" se siente como que debería componer. En la práctica, ciertas piezas son corrosivas cuando se comparten y solo útiles cuando cada venture las construye con ownership de founder.',
        ],
        bullets: [
          'Producto. El DNA de producto de cada venture, cómo se siente usarlo, cómo conversa, qué se rehúsa a hacer, tiene que ser autorado por sus founders. Patrones de producto compartidos producen ventures que se leen como un portafolio de clones, lo cual es sentencia de muerte en cualquier mercado con competencia real.',
          'Marca y tono de voz. Los founders son dueños de esto enteramente. El studio aporta una baseline visual limpia si una venture la quiere; todo lo demás es decisión de la venture.',
          'Relaciones con clientes. El founder es siempre el dueño sénior de la relación con los primeros diez clientes enterprise. Los equipos de soporte del studio ayudan operativamente pero nunca son dueños de la relación.',
          'Decisiones de contratación. Avante corre el funnel; los founders toman las decisiones. Tenemos reglas duras contra que el studio anule un veto de founder en una contratación sénior, ese patrón erosionaría la autoridad de founder necesaria para que la venture desarrolle su propia cultura.',
          'Dirección estratégica. Los operating partners pueden argumentar duro por una posición, pero la estrategia de la venture es decisión del founder. El trabajo del studio es hacer que esa decisión sea lo más bien-informada posible, no tomarla.',
        ],
        callout: {
          kind: 'quote',
          text: 'Los studios que confunden "infraestructura compartida" con "producto compartido" producen ventures que parecen más proyectos internos que empresas independientes. Esa confusión es la mayor razón única por la que la mayoría de los studios sub-rinde su pitch.',
          attribution: 'Notas de Operating Partner — Avante',
        },
      },
      {
        heading: 'Por qué el stack compone',
        paragraphs: [
          'El argumento estructural para el modelo de studio, y la razón por la que los datos empíricos de IRR muestran ~50% para studios vs ~19% para VC tradicional en vintages comparables, es que esta capa de infraestructura compone entre cohorts de una forma que la asignación de capital a nivel de fondo simplemente no puede. Cada venture corrida sobre el stack contribuye lecciones que mejoran los templates, refinan el funnel del recruiter, afilan la baseline legal-y-de-seguridad y expanden la red de distribución para el próximo cohort.',
          'Un first-time founder pasando por el playbook en 2026 hereda el aprendizaje acumulado de cada venture Avante anterior, más el aprendizaje compartido de partners que han construido y hecho exit a escala. Eso no es una ventaja marginal; es categórica. Es también por qué esperamos que la brecha de IRR entre studios y VC tradicional se ensanche en lugar de cerrarse a medida que nuestro portafolio madure.',
        ],
      },
      {
        heading: 'Los límites honestos',
        paragraphs: [
          'Los stacks operativos componen, pero no eliminan el riesgo de ejecución. Un gran stack no salva a una venture de una tesis de mercado equivocada, un equipo fundador desalineado, o un producto que el mercado simplemente no quiere. El stack baja el costo y aumenta la velocidad de testear esas preguntas; no las responde.',
          'El otro límite honesto: los studios que crecen más rápido de lo que su stack madura terminan degradando la propia ventaja que justifica el modelo. Limitamos deliberadamente al studio a 3–4 ventures por año, con un techo duro de carga de operating-partner por cohort. Crecer más allá sin re-ingenierizar el stack produciría el mismo tipo de fallo de dilución-de-atención que sufren los partners de VC tradicional con 8–12 asientos de consejo.',
        ],
      },
      {
        heading: 'Cómo lee esto un founder',
        paragraphs: [
          'Si eres un founder considerando unirte a un cohort de studio, el de Avante o el de cualquier otro, la pregunta correcta no es "¿qué perks ofrecen?" sino "¿qué está en su stack, quién es dueño de cada capa y qué hay por escrito sobre cómo se entrega?". Un studio cuya respuesta es vaga está vendiendo perks. Un studio cuya respuesta es específica está vendiendo infraestructura. Los dos rinden muy distinto en los primeros 24 meses de una venture.',
          'Si quieres ver los documentos del stack de Avante en detalle, el formulario de contacto es el punto de partida correcto. Los compartimos en una conversación estructurada en lugar de como download público, no porque sean secretos, sino porque los documentos solo tienen sentido en el contexto de la etapa y el mercado específicos de una venture.',
        ],
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────
// SIGGA CASE STUDY — full long-form (Sprint 3)
// ─────────────────────────────────────────────────────────────────────

const articleSiggaCaseStudy: Article = {
  slug: 'sigga-case-study-10x-exit',
  category: 'casestudies',
  type: 'Case Study',
  readTime: '11 min',
  featured: true,
  date: 'Jan 2026',
  datePublished: '2026-01-25',
  isPublished: true,
  en: {
    title: 'Sigga Technologies: From Founding to 10× Exit',
    description:
      'A working case study from inside the Avante team. How a Brazilian industrial-software bet became a 10× outcome, and what it taught us about building category leaders in fragmented Brazilian verticals.',
    sections: [
      {
        paragraphs: [
          'Most case studies in venture are written by people who watched from a distance. This one is written from the inside. Amanda Pinheiro served on the Sigga Technologies Board through scale and exit. Other members of what is now the Avante team were operationally involved through several inflection points, fundraising rounds that almost did not close, a GTM motion that had to be redesigned twice, and an exit process that tested every assumption we had about who would actually buy a Brazilian industrial-software business at scale.',
          "The result was a 10× outcome, the kind of return that makes a fund's vintage and resets your assumptions about what is possible in fragmented Brazilian verticals. This piece walks through what happened, what we got right, what we almost broke, and how those lessons now shape every venture inside the Avante studio.",
        ],
      },
      {
        heading: 'The thesis: a market everyone said was impossible',
        paragraphs: [
          'Industrial asset management, the software that helps refineries, mines, mills, and power plants schedule maintenance, track equipment, and stay compliant, is a global category dominated by a few enterprise vendors with long implementation cycles and even longer sales cycles. SAP, IBM Maximo, Infor: each has a multi-year deployment, a seven-figure starting price, and a roster of customers in the Fortune 500.',
          "Brazil's industrial base does not look like that. The country has a dense ecosystem of medium-sized industrial operators, mining companies in Minas Gerais, sugar and ethanol mills in São Paulo state, pulp and paper across the south, for whom a $2M Maximo deployment is unthinkable, but who are also too operationally complex to run on spreadsheets. The conventional wisdom in 2010 was that this segment was unservable. Too small for the global vendors. Too complex for the local generic-ERP players. A no-man's-land.",
          "Sigga's founding bet was that the no-man's-land was actually the largest opportunity in Brazilian industrial software, if you could build a product that was deeply mobile-native, integrated with the SAP backbones the larger customers already had, and priced for a Brazilian P&L. The thesis was contrarian inside the Brazilian software industry. It also turned out to be exactly right.",
        ],
        callout: {
          kind: 'tip',
          text: 'Markets that "everyone says are impossible" are often markets where the operating reality has shifted faster than the consensus. The discount on conviction is usually larger than the discount on execution risk.',
        },
      },
      {
        heading: 'The first inflection: when the product almost did not ship',
        paragraphs: [
          "Eighteen months in, Sigga had a product that worked beautifully in the demo and broke quietly in the field. The mobile sync engine, the entire product's reason to exist, was struggling under the realities of Brazilian industrial connectivity: refineries with patchy 3G in some sectors and full WiFi blackouts in others, mines with deep-shaft work zones, paper mills with electromagnetic interference around the heavy machinery.",
          'The right product call was to rebuild the sync layer from scratch as offline-first, with a conflict-resolution model designed for hours-long disconnections rather than seconds. That call cost roughly six months of runway and pushed the company past one of those near-death milestones every venture has but few admit. It was also, in retrospect, the single decision that built the moat.',
          'Once shipped, the rebuilt sync layer became the unfair advantage. Competitors with cleaner architectures-on-paper consistently lost field bake-offs. The lesson: in industrial verticals, "works on a deck" and "works in a copper mine" are not the same product. The companies that confuse the two get killed at the procurement stage.',
        ],
      },
      {
        heading: 'The GTM motion: enterprise speed at SMB price points',
        paragraphs: [
          "Selling industrial software in Brazil to medium-sized operators is a strange motion. The buyer profile is enterprise, multi-stakeholder procurement, formal RFPs, security reviews, but the average contract size starts at SMB-tier numbers. You cannot afford the 12-month enterprise sales cycle, but you also cannot run a transactional bottom-up motion because the buyer doesn't behave that way.",
          "Sigga's answer was a hybrid that, looking back, prefigured a lot of what we now build into Avante studio playbooks: a narrow ICP (industrial operators with SAP backbones in three vertical clusters), a vertical-specific pre-sales engineer attached to each opportunity from week one, and a strict 90-day-to-pilot rule. If we couldn't get to a paid pilot inside 90 days, we walked. Walking sounds expensive. Staying in zombie deals is far more expensive.",
          'That motion produced something rare: a sales cycle that compressed each year as the reference roster grew. By year five, deals were closing on the strength of three reference calls and a 30-day pilot, closer to a SaaS motion than a traditional industrial-software one, while retaining the integration depth that made the product sticky.',
        ],
        callout: {
          kind: 'stat',
          text: '90-day-to-pilot or walk: the discipline that compounds reference velocity in any vertical SaaS motion. Zombie pipeline kills more startups than competition does.',
        },
      },
      {
        heading: 'The fundraises: capital discipline as a strategic weapon',
        paragraphs: [
          "Sigga raised less capital than the vintage average for a venture of its scale and stage. That was not entirely a choice, the Brazilian growth-capital market between 2014 and 2019 was thinner than US comparables, but it became a real strategic advantage. With less capital we built more conservative unit economics, lower burn structures, and a culture of capital discipline that, when the round-to-round market got harder, kept the company optionable.",
          "The contrast matters. Several of Sigga's would-be competitors raised significantly larger early rounds, scaled go-to-market faster, and ran out of runway before the market cycle turned. Sigga arrived at the exit window with a clean P&L, a long reference roster, and the kind of capital efficiency that strategic acquirers actually pay for.",
          'The lesson we now repeat across every Avante venture: when you cannot control market timing, you can still control your runway profile. Optionality is the most undervalued asset in early-stage venture-building.',
        ],
      },
      {
        heading: 'The exit: who actually buys Brazilian industrial software at scale',
        paragraphs: [
          'When the exit conversation became real, the natural assumption was that the buyer would be one of the global enterprise-asset-management incumbents, a strategic looking to plug a gap in Latin America. The reality was different. The strongest interest came from category-adjacent global players for whom Sigga represented a credible foothold in a fast-growing region with a Brazilian customer base that was hard to assemble organically.',
          "The exit closed at what we estimate as a roughly 10× return on capital deployed across the venture's lifetime, a number we hold privately but that materially shaped how the team now thinks about distribution of outcomes in fragmented Brazilian verticals. The lesson: exit theses written too narrowly miss the actual buyer pool. The right framing was always 'who needs this Brazilian customer base and this product capability,' not 'who else is in this exact category.'",
        ],
      },
      {
        heading: 'What this taught us, and what we now do day one',
        paragraphs: [
          'Sigga shaped the Avante studio playbook in ways that go beyond a single case study. Concretely, every venture in the studio inherits some hard-won lessons from that experience:',
        ],
        bullets: [
          'A 90-day-to-pilot discipline, if a venture cannot get a paid pilot inside 90 days of a serious conversation, the ICP is wrong, the product is wrong, or both.',
          'Capital efficiency designed in, not retrofitted. Every Avante venture starts with a runway plan that survives an 18-month dry market, because in Brazilian venture history, the dry markets always come.',
          'A "works in the field" engineering bar from week one. Demo-quality and production-quality are not the same product. Industrial verticals punish that confusion harder than any other.',
          'Exit-pool thinking from the founding cap-table. The buyer is rarely "the obvious incumbent." Map the actual decision-makers who would benefit from owning this customer base, then build relationships across that map for years before they matter.',
          'A board that adds operating muscle, not just oversight. Amanda\'s role on the Sigga Board was a direct, operational one, that template is now Avante\'s default for every studio venture.',
        ],
        callout: {
          kind: 'quote',
          text: 'Sigga taught us that the most fragmented verticals in Brazil are not impossible, they are simply un-served by people who actually understand the operating reality. That is the gap we build into every Avante venture today.',
          attribution: 'Avante Founding Team',
        },
      },
      {
        heading: 'Why this case matters for current Avante cohorts',
        paragraphs: [
          'Brazil in 2026 has more capital, more domain operators, and more cheap AI infrastructure than at any point in the country\'s tech history. The pattern Sigga ran, find a fragmented industrial-services vertical, build mobile-native and integration-deep, sell with enterprise rigor at SMB pricing, exit to a category-adjacent global player, is now repeatable across half a dozen Brazilian verticals, with AI as a multiplier that did not exist in 2012.',
          'Every venture currently inside the Avante studio is being built with that lineage in mind. Not as a copy-paste of Sigga, but as a deliberate application of the lessons that turned a "market everyone said was impossible" into a 10× outcome.',
        ],
      },
      {
        heading: 'Notes on what is publicly disclosed',
        paragraphs: [
          'Sigga Technologies financial details are not publicly disclosed. The 10× return figure referenced here reflects the Avante team\'s internal estimate of capital deployed across the venture\'s lifetime versus the realized exit value. Specific revenue numbers, customer counts, and acquisition price are confidential and not included in this case study.',
          'For independent context on the Brazilian industrial software market, see EPE Brazilian Energy Balance 2025 and IBGE National Accounts 2025 (both linked in the sources footer).',
        ],
      },
    ],
  },
  pt: {
    title: 'Sigga Technologies: Da Fundação ao Exit de 10×',
    description:
      'Um estudo de caso de dentro do time da Avante. Como uma aposta em software industrial brasileiro virou um resultado de 10×, e o que isso nos ensinou sobre construir líderes de categoria em verticais fragmentadas no Brasil.',
    sections: [
      {
        paragraphs: [
          'A maioria dos estudos de caso em venture é escrita por pessoas que assistiram de longe. Este é escrito de dentro. Amanda Pinheiro serviu no Conselho da Sigga Technologies durante o crescimento e o exit. Outros membros do que hoje é o time da Avante estiveram operacionalmente envolvidos em vários momentos de inflexão, rodadas de fundraising que quase não fecharam, um GTM motion que precisou ser redesenhado duas vezes, e um processo de exit que testou cada premissa que tínhamos sobre quem efetivamente compraria um negócio de software industrial brasileiro em escala.',
          'O resultado foi um exit de 10×, o tipo de retorno que define a vintage de um fundo e reseta suas premissas sobre o que é possível em verticais fragmentadas no Brasil. Este texto percorre o que aconteceu, o que acertamos, o que quase quebramos, e como essas lições agora moldam cada venture dentro do studio Avante.',
        ],
      },
      {
        heading: 'A tese: um mercado que todos diziam ser impossível',
        paragraphs: [
          'Gestão de ativos industriais, o software que ajuda refinarias, minas, usinas e plantas de papel a programar manutenção, rastrear equipamentos e permanecer em compliance, é uma categoria global dominada por alguns vendors enterprise com ciclos de implementação longos e ciclos de venda ainda mais longos. SAP, IBM Maximo, Infor: cada um com deployment de múltiplos anos, preço-base de sete dígitos e clientela na Fortune 500.',
          'A base industrial brasileira não se parece com isso. O país tem um ecossistema denso de operadores industriais de médio porte, mineradoras em Minas Gerais, usinas de cana em São Paulo, indústrias de papel e celulose no sul, para quem um deployment de R$10M de Maximo é impensável, mas que também são operacionalmente complexos demais para rodar em planilhas. A sabedoria convencional em 2010 era que esse segmento era inservível. Pequeno demais para os vendors globais. Complexo demais para os players genéricos de ERP local. Uma terra de ninguém.',
          'A aposta fundadora da Sigga foi que a terra de ninguém era na verdade a maior oportunidade em software industrial brasileiro, se você conseguisse construir um produto profundamente mobile-native, integrado com os backbones SAP que clientes maiores já tinham, e precificado para um P&L brasileiro. A tese era contrária dentro da indústria de software brasileira. Acabou se mostrando exatamente certa.',
        ],
        callout: {
          kind: 'tip',
          text: 'Mercados que "todo mundo diz serem impossíveis" são frequentemente mercados onde a realidade operacional mudou mais rápido que o consenso. O desconto em convicção costuma ser maior que o desconto em risco de execução.',
        },
      },
      {
        heading: 'A primeira inflexão: quando o produto quase não foi ao ar',
        paragraphs: [
          'Dezoito meses dentro, a Sigga tinha um produto que funcionava lindamente no demo e quebrava silenciosamente no campo. O motor de sync mobile, a razão de existir do produto inteiro, estava penando com a realidade da conectividade industrial brasileira: refinarias com 3G falho em alguns setores e blecautes totais de WiFi em outros, minas com zonas de trabalho em poços profundos, indústrias de papel com interferência eletromagnética ao redor das máquinas pesadas.',
          'A decisão de produto correta foi reconstruir a camada de sync do zero como offline-first, com um modelo de resolução de conflito desenhado para desconexões de horas em vez de segundos. Essa decisão custou aproximadamente seis meses de runway e empurrou a empresa por um daqueles marcos quase-de-morte que toda venture tem mas poucos admitem. Foi também, em retrospecto, a única decisão que construiu o moat.',
          'Uma vez no ar, a camada de sync reconstruída virou a vantagem injusta. Competidores com arquiteturas mais limpas no papel consistentemente perdiam bake-offs em campo. A lição: em verticais industriais, "funciona num deck" e "funciona numa mina de cobre" não são o mesmo produto. As empresas que confundem os dois morrem no estágio de procurement.',
        ],
      },
      {
        heading: 'O GTM motion: velocidade enterprise em preço de SMB',
        paragraphs: [
          'Vender software industrial no Brasil para operadores de médio porte é um motion estranho. O perfil de comprador é enterprise, procurement multi-stakeholder, RFPs formais, security reviews, mas o tamanho médio de contrato começa em números de SMB. Você não pode arcar com o ciclo de venda enterprise de 12 meses, mas também não pode rodar um motion transacional bottom-up porque o comprador não se comporta assim.',
          'A resposta da Sigga foi um híbrido que, olhando para trás, prefigurou muito do que agora construímos no playbook do studio Avante: um ICP estreito (operadores industriais com backbones SAP em três clusters verticais), um pre-sales engineer vertical-específico anexado a cada oportunidade desde a semana um, e uma regra rígida de 90 dias para pilot. Se não conseguíssemos chegar a um pilot pago em 90 dias, saíamos. Sair parece caro. Ficar em deals zumbis é muito mais caro.',
          'Esse motion produziu algo raro: um ciclo de venda que comprimia a cada ano à medida que o roster de referência crescia. No quinto ano, deals estavam fechando com a força de três reference calls e um pilot de 30 dias, mais perto de um motion SaaS do que de um motion tradicional de software industrial, mantendo a profundidade de integração que tornava o produto sticky.',
        ],
        callout: {
          kind: 'stat',
          text: '90 dias para pilot ou sai: a disciplina que compõe velocidade de referência em qualquer motion vertical SaaS. Pipeline zumbi mata mais startups que competição.',
        },
      },
      {
        heading: 'Os fundraises: disciplina de capital como arma estratégica',
        paragraphs: [
          'A Sigga levantou menos capital que a média de vintage para uma venture do seu porte e estágio. Isso não foi inteiramente uma escolha, o mercado brasileiro de capital de crescimento entre 2014 e 2019 era mais raso que comparáveis americanos, mas virou uma vantagem estratégica real. Com menos capital construímos unit economics mais conservadores, estruturas de burn mais baixas, e uma cultura de disciplina de capital que, quando o mercado round-to-round ficou mais difícil, manteve a empresa opcional.',
          'O contraste importa. Vários dos competidores que poderiam ter ameaçado a Sigga levantaram rodadas iniciais significativamente maiores, escalaram go-to-market mais rápido, e ficaram sem runway antes do ciclo de mercado virar. A Sigga chegou na janela de exit com um P&L limpo, um roster longo de referências, e o tipo de eficiência de capital que adquirentes estratégicos efetivamente pagam.',
          'A lição que agora repetimos em cada venture Avante: quando você não pode controlar o timing do mercado, você ainda pode controlar seu perfil de runway. Opcionalidade é o ativo mais subestimado em construção de venture early-stage.',
        ],
      },
      {
        heading: 'O exit: quem efetivamente compra software industrial brasileiro em escala',
        paragraphs: [
          'Quando a conversa de exit virou real, a premissa natural foi que o comprador seria um dos incumbentes globais de enterprise-asset-management, um estratégico buscando preencher um gap na América Latina. A realidade foi diferente. O interesse mais forte veio de players globais adjacentes-de-categoria para quem a Sigga representava um foothold credível em uma região de rápido crescimento com uma base de clientes brasileira difícil de montar organicamente.',
          'O exit fechou no que estimamos como aproximadamente 10× sobre o capital deployado ao longo da vida da venture, um número que mantemos privadamente mas que moldou materialmente como o time agora pensa sobre distribuição de outcomes em verticais fragmentadas no Brasil. A lição: teses de exit escritas estreitas demais perdem o pool real de compradores. O frame correto sempre foi "quem precisa dessa base de clientes brasileira e dessa capacidade de produto", não "quem mais está nessa categoria exata".',
        ],
      },
      {
        heading: 'O que isso nos ensinou, e o que agora fazemos no dia um',
        paragraphs: [
          'A Sigga moldou o playbook do studio Avante de formas que vão além de um único estudo de caso. Concretamente, cada venture no studio herda algumas lições duramente conquistadas dessa experiência:',
        ],
        bullets: [
          'Disciplina de 90 dias para pilot, se uma venture não consegue chegar a um pilot pago dentro de 90 dias de uma conversa séria, o ICP está errado, o produto está errado, ou ambos.',
          'Eficiência de capital desenhada de origem, não retrofitada. Cada venture Avante começa com um plano de runway que sobrevive a um mercado seco de 18 meses, porque na história do venture brasileiro, os mercados secos sempre vêm.',
          'Padrão de engenharia "funciona no campo" desde a semana um. Qualidade-de-demo e qualidade-de-produção não são o mesmo produto. Verticais industriais punem essa confusão mais duro que qualquer outro.',
          'Pensamento de exit-pool desde o cap-table fundador. O comprador raramente é "o incumbente óbvio". Mapeie os tomadores de decisão reais que beneficiariam de possuir essa base de clientes, então construa relacionamentos por anos antes que importem.',
          'Um conselho que adiciona músculo operacional, não apenas supervisão. O papel da Amanda no Conselho da Sigga foi direto e operacional, esse template é agora o default da Avante para cada venture do studio.',
        ],
        callout: {
          kind: 'quote',
          text: 'A Sigga nos ensinou que as verticais mais fragmentadas no Brasil não são impossíveis, são simplesmente não-servidas por pessoas que efetivamente entendem a realidade operacional. Esse é o gap que construímos em cada venture Avante hoje.',
          attribution: 'Time Fundador da Avante',
        },
      },
      {
        heading: 'Por que este caso importa para os cohorts atuais da Avante',
        paragraphs: [
          'O Brasil em 2026 tem mais capital, mais operadores de domínio e mais infraestrutura de IA barata que em qualquer ponto da história tech do país. O padrão que a Sigga rodou, encontrar uma vertical fragmentada de serviços industriais, construir mobile-native e profundamente integrado, vender com rigor enterprise em pricing de SMB, fazer exit para um player global adjacente-de-categoria, agora é repetível em meia dúzia de verticais brasileiras, com IA como multiplicador que não existia em 2012.',
          'Cada venture atualmente dentro do studio Avante está sendo construída com essa linhagem em mente. Não como um copy-paste da Sigga, mas como uma aplicação deliberada das lições que transformaram um "mercado que todos diziam ser impossível" em um resultado de 10×.',
        ],
      },
      {
        heading: 'Notas sobre o que é publicamente divulgado',
        paragraphs: [
          'Detalhes financeiros da Sigga Technologies não são publicamente divulgados. O número de retorno de 10× referenciado aqui reflete a estimativa interna do time da Avante sobre capital deployado ao longo da vida da venture versus o valor de exit realizado. Números específicos de receita, contagem de clientes e preço de aquisição são confidenciais e não estão incluídos neste estudo de caso.',
          'Para contexto independente sobre o mercado brasileiro de software industrial, veja EPE Balanço Energético Brasileiro 2025 e IBGE Contas Nacionais 2025 (ambos linkados no rodapé de fontes).',
        ],
      },
    ],
  },
  es: {
    title: 'Sigga Technologies: De la Fundación al Exit de 10×',
    description:
      'Un caso de estudio desde dentro del equipo de Avante. Cómo una apuesta en software industrial brasileño se convirtió en un resultado de 10×, y qué nos enseñó sobre construir líderes de categoría en verticales fragmentadas en Brasil.',
    sections: [
      {
        paragraphs: [
          'La mayoría de los casos de estudio en venture los escriben personas que miraron desde lejos. Este se escribe desde dentro. Amanda Pinheiro sirvió en el Consejo de Sigga Technologies durante la escala y el exit. Otros miembros de lo que hoy es el equipo de Avante estuvieron operativamente involucrados en varios momentos de inflexión, rondas de fundraising que casi no cierran, un GTM motion que tuvo que rediseñarse dos veces, y un proceso de exit que puso a prueba cada premisa que teníamos sobre quién compraría efectivamente un negocio de software industrial brasileño en escala.',
          'El resultado fue un exit de 10×, el tipo de retorno que define la vintage de un fondo y resetea tus premisas sobre lo que es posible en verticales fragmentadas en Brasil. Este texto recorre lo que pasó, lo que acertamos, lo que casi rompimos, y cómo esas lecciones ahora moldean cada venture dentro del studio Avante.',
        ],
      },
      {
        heading: 'La tesis: un mercado que todos decían que era imposible',
        paragraphs: [
          'Gestión de activos industriales, el software que ayuda a refinerías, minas, ingenios y plantas papeleras a programar mantenimiento, rastrear equipos y mantener compliance, es una categoría global dominada por unos pocos vendors enterprise con ciclos de implementación largos y ciclos de venta aún más largos. SAP, IBM Maximo, Infor: cada uno con deployment de varios años, precio base de siete dígitos y cartera de clientes en la Fortune 500.',
          'La base industrial brasileña no se ve así. El país tiene un ecosistema denso de operadores industriales medianos, mineras en Minas Gerais, ingenios de caña en São Paulo, papeleras en el sur, para quienes un deployment de US$2M de Maximo es impensable, pero también son demasiado complejos operativamente para correr en planillas. La sabiduría convencional en 2010 era que ese segmento no era atendible. Demasiado pequeño para los vendors globales. Demasiado complejo para los players locales de ERP genérico. Una tierra de nadie.',
          'La apuesta fundadora de Sigga fue que la tierra de nadie era en realidad la mayor oportunidad en software industrial brasileño, si lograbas construir un producto profundamente mobile-native, integrado con los backbones SAP que los clientes mayores ya tenían, y con pricing para un P&L brasileño. La tesis era contraria dentro de la industria de software brasileña. Resultó ser exactamente correcta.',
        ],
        callout: {
          kind: 'tip',
          text: 'Los mercados que "todos dicen que son imposibles" son frecuentemente mercados donde la realidad operativa cambió más rápido que el consenso. El descuento por convicción usualmente es mayor que el descuento por riesgo de ejecución.',
        },
      },
      {
        heading: 'La primera inflexión: cuando el producto casi no salió',
        paragraphs: [
          'A los dieciocho meses, Sigga tenía un producto que funcionaba bellamente en el demo y se rompía silenciosamente en el campo. El motor de sync mobile, la razón de existir del producto entero, penaba con la realidad de la conectividad industrial brasileña: refinerías con 3G intermitente en algunos sectores y blackouts totales de WiFi en otros, minas con zonas de trabajo en pozos profundos, papeleras con interferencia electromagnética alrededor de la maquinaria pesada.',
          'La decisión de producto correcta fue reconstruir la capa de sync desde cero como offline-first, con un modelo de resolución de conflictos diseñado para desconexiones de horas en vez de segundos. Esa decisión costó aproximadamente seis meses de runway y empujó a la empresa por uno de esos hitos casi-de-muerte que toda venture tiene pero pocos admiten. Fue también, en retrospectiva, la única decisión que construyó el moat.',
          'Una vez en el aire, la capa de sync reconstruida se volvió la ventaja injusta. Competidores con arquitecturas más limpias en el papel consistentemente perdían bake-offs en campo. La lección: en verticales industriales, "funciona en un deck" y "funciona en una mina de cobre" no son el mismo producto. Las empresas que confunden los dos mueren en la etapa de procurement.',
        ],
      },
      {
        heading: 'El GTM motion: velocidad enterprise a precios SMB',
        paragraphs: [
          'Vender software industrial en Brasil a operadores medianos es un motion extraño. El perfil de comprador es enterprise, procurement multi-stakeholder, RFPs formales, security reviews, pero el tamaño promedio de contrato arranca en números SMB. No puedes pagar el ciclo de venta enterprise de 12 meses, pero tampoco puedes correr un motion transaccional bottom-up porque el comprador no se comporta así.',
          'La respuesta de Sigga fue un híbrido que, mirando atrás, prefiguró mucho de lo que ahora construimos en los playbooks del studio Avante: un ICP estrecho (operadores industriales con backbones SAP en tres clusters verticales), un pre-sales engineer vertical-específico anclado a cada oportunidad desde la semana uno, y una regla rígida de 90-días-a-piloto. Si no podíamos llegar a un piloto pagado en 90 días, salíamos. Salir suena caro. Quedarse en deals zombis es mucho más caro.',
          'Ese motion produjo algo raro: un ciclo de venta que se comprimía cada año a medida que el roster de referencia crecía. Para el quinto año, deals estaban cerrando con la fuerza de tres reference calls y un piloto de 30 días, más cercano a un motion SaaS que al motion tradicional de software industrial, manteniendo la profundidad de integración que hacía al producto sticky.',
        ],
        callout: {
          kind: 'stat',
          text: '90-días-a-piloto o sales: la disciplina que compone velocidad de referencia en cualquier motion vertical SaaS. El pipeline zombi mata más startups que la competencia.',
        },
      },
      {
        heading: 'Los fundraises: disciplina de capital como arma estratégica',
        paragraphs: [
          'Sigga levantó menos capital que el promedio de vintage para una venture de su tamaño y etapa. Eso no fue enteramente una elección, el mercado brasileño de capital de crecimiento entre 2014 y 2019 era más delgado que comparables americanos, pero se convirtió en una ventaja estratégica real. Con menos capital construimos unit economics más conservadoras, estructuras de burn más bajas, y una cultura de disciplina de capital que, cuando el mercado round-to-round se puso más difícil, mantuvo a la empresa con opciones.',
          'El contraste importa. Varios de los competidores que pudieron haber amenazado a Sigga levantaron rondas iniciales significativamente mayores, escalaron go-to-market más rápido, y se quedaron sin runway antes de que el ciclo de mercado cambiara. Sigga llegó a la ventana de exit con un P&L limpio, un roster largo de referencias, y el tipo de eficiencia de capital que los adquirentes estratégicos efectivamente pagan.',
          'La lección que ahora repetimos en cada venture Avante: cuando no puedes controlar el timing del mercado, todavía puedes controlar tu perfil de runway. La opcionalidad es el activo más subestimado en construcción de venture early-stage.',
        ],
      },
      {
        heading: 'El exit: quién compra realmente software industrial brasileño en escala',
        paragraphs: [
          'Cuando la conversación de exit se volvió real, la premisa natural fue que el comprador sería uno de los incumbentes globales de enterprise-asset-management, un estratégico buscando llenar un gap en América Latina. La realidad fue distinta. El interés más fuerte vino de players globales adyacentes-a-categoría para quienes Sigga representaba un foothold creíble en una región de rápido crecimiento con una base de clientes brasileña difícil de ensamblar orgánicamente.',
          'El exit cerró en lo que estimamos como aproximadamente 10× sobre el capital desplegado a lo largo de la vida de la venture, un número que mantenemos privado pero que moldeó materialmente cómo el equipo ahora piensa sobre la distribución de outcomes en verticales fragmentadas en Brasil. La lección: las tesis de exit escritas demasiado estrechas pierden el pool real de compradores. El frame correcto siempre fue "quién necesita esta base de clientes brasileña y esta capacidad de producto", no "quién más está en esta categoría exacta".',
        ],
      },
      {
        heading: 'Lo que esto nos enseñó, y lo que ahora hacemos en el día uno',
        paragraphs: [
          'Sigga moldeó el playbook del studio Avante de formas que van más allá de un solo caso de estudio. Concretamente, cada venture en el studio hereda algunas lecciones duramente ganadas de esa experiencia:',
        ],
        bullets: [
          'Una disciplina de 90-días-a-piloto, si una venture no puede llegar a un piloto pagado dentro de 90 días de una conversación seria, el ICP está mal, el producto está mal, o ambos.',
          'Eficiencia de capital diseñada de origen, no retroinstalada. Cada venture Avante arranca con un plan de runway que sobrevive a un mercado seco de 18 meses, porque en la historia del venture brasileño, los mercados secos siempre llegan.',
          'Estándar de ingeniería "funciona en el campo" desde la semana uno. La calidad-de-demo y la calidad-de-producción no son el mismo producto. Las verticales industriales castigan esa confusión más duro que cualquier otra.',
          'Pensamiento de exit-pool desde el cap-table fundador. El comprador rara vez es "el incumbente obvio". Mapea a los tomadores de decisión reales que se beneficiarían de poseer esta base de clientes, después construye relaciones a través de ese mapa por años antes de que importen.',
          'Un consejo que aporta músculo operativo, no solo supervisión. El rol de Amanda en el Consejo de Sigga fue directo y operativo, esa plantilla es ahora el default de Avante para cada venture del studio.',
        ],
        callout: {
          kind: 'quote',
          text: 'Sigga nos enseñó que las verticales más fragmentadas en Brasil no son imposibles, simplemente no están servidas por personas que entienden efectivamente la realidad operativa. Ese es el gap que construimos en cada venture Avante hoy.',
          attribution: 'Equipo Fundador de Avante',
        },
      },
      {
        heading: 'Por qué este caso importa para los cohorts actuales de Avante',
        paragraphs: [
          'Brasil en 2026 tiene más capital, más operadores de dominio y más infraestructura de IA barata que en cualquier punto de la historia tech del país. El patrón que Sigga corrió, encontrar una vertical fragmentada de servicios industriales, construir mobile-native y profundo en integración, vender con rigor enterprise a pricing SMB, hacer exit a un player global adyacente-a-categoría, ahora es repetible en media docena de verticales brasileñas, con la IA como multiplicador que no existía en 2012.',
          'Cada venture actualmente dentro del studio Avante se está construyendo con esa filiación en mente. No como un copy-paste de Sigga, sino como una aplicación deliberada de las lecciones que convirtieron a un "mercado que todos decían que era imposible" en un resultado de 10×.',
        ],
      },
      {
        heading: 'Notas sobre lo que se divulga públicamente',
        paragraphs: [
          'Los detalles financieros de Sigga Technologies no son públicamente divulgados. El número de retorno de 10× referenciado aquí refleja la estimación interna del equipo de Avante sobre capital desplegado a lo largo de la vida de la venture versus el valor de exit realizado. Números específicos de revenue, conteo de clientes y precio de adquisición son confidenciales y no están incluidos en este caso de estudio.',
          'Para contexto independiente sobre el mercado brasileño de software industrial, ver EPE Balance Energético Brasileño 2025 e IBGE Cuentas Nacionales 2025 (ambos linkados en el footer de fuentes).',
        ],
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────
// Export — order matches LibraryPage's display order
// ─────────────────────────────────────────────────────────────────────

// === CONTENT-ENGINE:START (managed by content-engine/merge.py — do not edit by hand) ===
// 23 article(s) generated from content-engine/outputs. Edit the engine, not this block.
const engineArticles: Article[] = [
  {
    "slug": "ai-agents-vs-copilots-b2b",
    "category": "ai",
    "type": "Playbook",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/ai-agents-vs-copilots-b2b.png",
    "isPublished": true,
    "en": {
      "title": "Agents vs Copilots: The Order That Builds a Moat",
      "description": "A copilot earns trust and starts the data loop. An agent compounds it. Why a B2B venture ships them in that order, not the reverse.",
      "sections": [
        {
          "paragraphs": [
            "A copilot and an agent are not two products. They are two points on one autonomy spectrum, and the gap between them is where most B2B value and most B2B risk now sit. A copilot keeps a human in the loop on every step. The human prompts, the model proposes, the human approves and acts. An agent moves the human from supervising steps to supervising outcomes. You hand it a goal, it plans and acts across tools and data, and you check the result.",
            "The AI agents vs copilots debate usually argues about which is more impressive. The better question for a B2B builder is which one to ship first. At Avante Ventures the answer is the copilot, and not because it is safer for its own sake. The copilot is the wedge that earns trust and starts the data loop. The agent is the destination where that data compounds into pricing power. Ship them in that order, and the moat builds itself. Ship the agent first, and you tend to burn the trust you needed to get there."
          ]
        },
        {
          "id": "the-spectrum",
          "heading": "The autonomy spectrum, defined",
          "level": 2,
          "paragraphs": [
            "The cleanest test is not technical. It is this. What does the human supervise? A copilot is an assistant that works alongside a person who still reviews, edits, and executes the final action. It is reactive. It waits to be asked, and nothing happens until a human says go. An agent is given a goal and takes multi-step action toward it without a prompt at each turn, which means the human supervises the outcome instead of the keystrokes.",
            "One [2025 treatment of the distinction](https://medium.com/@kanerika/ai-copilot-vs-ai-agent-when-to-let-ai-assist-vs-act-autonomously-3ed60438f0b4) puts it well. A copilot speeds up a human's existing tasks. An agent takes over and completes an entire process. The spectrum runs from low-to-medium autonomy and a reactive posture on the copilot end to high autonomy and a proactive one on the agent end.",
            "This matters to a builder, not just a taxonomist, because the moment a system acts without a human gate on each step, the economics and the failure modes both change. A copilot that suggests a wrong answer wastes a click. An agent that takes a wrong action sends the email, books the trip, or files the claim. Same model underneath. Very different blast radius. AI-native means the model does the judgment work inside the loop either way. The open question is how much of the loop you trust it to close alone."
          ]
        },
        {
          "id": "adoption-signal",
          "heading": "What the adoption data says",
          "level": 2,
          "paragraphs": [
            "The copilot is already close to universal. The agent is the frontier that is mostly still unbuilt. Two analyst forecasts fix the moment. On agents, [Gartner predicts](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) that roughly 40% of enterprise applications will feature task-specific AI agents by 2026, up from less than 5% in 2025. Gartner Senior Director Analyst Anushree Verma describes the arc as a progression from basic assistants embedded in applications today, to task-specific agents by 2026, to multiagent ecosystems by 2029.",
            "Gartner is explicit that the assistant is the precursor. In their framing, AI assistants depend on human input and do not operate independently, while task-specific agents begin to act on their own. On the other side of the spectrum, IDC's FutureScape 2026 research finds that over 80% of enterprise applications will embed AI copilot capabilities by the end of 2026, and that agent usage at the largest enterprises is set to rise roughly tenfold with API call loads up about a thousandfold.",
            "Read together, the two numbers tell a builder where to stand. A capability heading for 80% penetration is becoming table stakes, not a moat. A capability growing from under 5% is where the next decade of pricing power gets decided. Enterprise AI agents in 2026 are the steep part of the curve. The copilot is the door almost everyone already walks through."
          ],
          "callout": {
            "kind": "stat",
            "text": "Roughly 40% of enterprise applications will feature task-specific AI agents by 2026, up from less than 5% in 2025. Copilots will be embedded in over 80% of enterprise applications by the end of 2026.",
            "attribution": "Gartner, August 2025, and IDC FutureScape 2026, October 2025"
          }
        },
        {
          "id": "copilot-as-wedge",
          "heading": "Why the copilot is the wedge",
          "level": 2,
          "paragraphs": [
            "The copilot earns its way into a workflow, and earning the way in is what starts the data loop. It is a low-trust entry point. It asks a customer to risk a click, not a process, and that low bar is exactly why it gets used. Adoption is the only thing that produces data. Every supervised interaction in a regulation-dense workflow leaves behind a structured, labeled record of what an expert accepted, corrected, or rejected. That exhaust is the raw material of a moat.",
            "The defensibility logic is well established, and it is sharper than most data-moat talk. According to [Andreessen Horowitz](https://a16z.com/the-empty-promise-of-data-moats/), accumulating proprietary data is defensible mainly when the sources are scanty or reticent to supply more than one vendor. That is the precise profile of a regulation-dense vertical. The data is scarce, hard to assemble, and the holder is reluctant to hand it to a second buyer. A copilot is the instrument that mints exactly that kind of data, one supervised step at a time, while the customer is still comfortable supervising every step."
          ],
          "bullets": [
            "Low entry cost. A copilot asks for a click, not a process, so it clears the trust bar that an autonomous agent cannot clear on day one.",
            "Data exhaust. Every accept, edit, and reject is a labeled judgment from a domain expert, the scarce input an off-the-shelf model never sees.",
            "Earned trust on a schedule. A copilot that is visibly right nine times in ten for six months is what later makes a customer willing to delegate the whole task.",
            "The first turn of the flywheel. Enter with a copilot, mint proprietary data, build the trust and the dataset the agent will need. This is [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel) at the start."
          ]
        },
        {
          "id": "agent-as-destination",
          "heading": "Why the agent is the destination",
          "level": 2,
          "paragraphs": [
            "The agent is where pricing power lives, because autonomous action over a proprietary dataset is hard to commoditize. A copilot competes on convenience, and convenience compresses as every application ships one. Recall the IDC figure. Over 80% of enterprise apps will carry a copilot by the end of 2026. A capability that common is not where margin accumulates. An agent that can be trusted to run a multi-step process over [data no rival holds](/library/data-network-effects-vertical-ai) is selling an outcome, not a suggestion, and outcomes priced against a proprietary dataset hold their price.",
            "This is also the turn where the flywheel compounds into capital. The destination of the copilot to data to fund flywheel is an agent acting on the dataset the copilot built. In a judicial-asset workflow, the agent does not just propose a valuation. It can originate and act on the assets the data identifies. The data stops being a feature and becomes an origination engine. That is the point where a venture moves from selling software to deploying capital against its own signal, and it is reachable only because the copilot earned the data and the trust first. The order is the entire argument."
          ]
        },
        {
          "id": "autonomy-failure",
          "heading": "Where premature autonomy backfires",
          "level": 2,
          "paragraphs": [
            "Most enterprise workflows are not ready for full autonomy, and shipping an agent too early fails in a way a copilot never does. The market is already pricing this. [Gartner predicts](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) that over 40% of agentic AI projects will be canceled by the end of 2027, on escalating costs, unclear business value, and weak risk controls. Verma is blunt about the state of play. Most agentic AI projects today are early-stage experiments driven by hype and often misapplied. Gartner also flags rampant agent washing, estimating that of thousands of vendors claiming agentic AI, only about 130 offer the genuine article.",
            "The failure is structural. An agent fails silently and expensively when a step goes wrong, because no human was watching that step. A copilot's mistake is caught at the gate. An agent's mistake executes. And readiness is mostly a data problem. Gartner's wider work on AI outcomes finds only about 28% of AI use cases fully meet their ROI expectations, roughly 20% fail outright, and 85% of failures trace to poor or missing data. An agent acting on thin or wrong data does not hesitate. It acts, at scale, on the wrong thing.",
            "For a B2B venture there is a specific relationship cost. Ship an agent before you have earned the data and the trust to supervise it well, and you erode the customer relationship the whole thesis depends on. A customer who watched an autonomous system make a costly mistake does not grant more autonomy. They revoke it. The premature agent does not just fail a task. It burns the trust the copilot would have built, and trust is the scarce input the flywheel runs on."
          ],
          "callout": {
            "kind": "tip",
            "text": "Before you ship autonomy, ask one question. Has the copilot earned the trust and the data to supervise the agent well? If not, the agent will fail silently, at scale, on the wrong thing.",
            "attribution": "The Avante sequencing test"
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante sequences it",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. It launches 3-4 ventures per year through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. It deploys $500K-1.5M per venture and retains co-founder economics. The benchmark behind the model is GSSN's finding that studio IRR runs about ~50% versus ~19% for traditional VC, roughly 2.5x. The structural edge is domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled on day one.",
            "Brazil suits the copilot-then-agent sequence because the workflows are both vast and newly ready. Services account for roughly 70% of Brazilian GDP, a deep surface of under-digitized, regulation-dense work where a copilot can mint data no incumbent holds. And the on-ramp just opened. The share of Brazilian industrial firms using AI rose from 16.9% in 2022 to 41.9% in 2024, more than doubling in two years, yet roughly three in four AI-adopting firms still sit at experimental maturity. Fast adoption, shallow operation. That gap is a market full of copilots that have not yet earned their way to agents.",
            "The studio model is what makes the discipline affordable. Solving company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction instead of overhead, which buys the copilot the runway to [reach usage density without a Series A](/library/ai-native-without-series-a) before the data thesis or the agent has to prove itself. Operating partners stay engaged through the first revenue milestone, the exact window where the copilot has to earn trust before any autonomy ships. A studio venture launches 6-9 months ahead of a comparable standalone team. That is 6-9 months more data and more earned trust before the agent is asked to act. The companies that win the agent era will be the ones that were patient enough to ship the copilot first. Read the model at [/why-avante](/why-avante) and the operating rules at [/principles](/principles)."
          ]
        }
      ]
    },
    "pt": {
      "title": "Agentes vs Copilots: a Ordem que Constrói um Moat",
      "description": "Um copilot ganha confiança e inicia o loop de dados. Um agente o multiplica. Por que uma venture B2B lança nessa ordem, e não no contrário.",
      "sections": [
        {
          "paragraphs": [
            "Um copilot e um agente não são dois produtos. São dois pontos de um mesmo espectro de autonomia, e a distância entre eles é onde mora hoje a maior parte do valor e do risco em B2B. O copilot mantém o humano no circuito a cada passo. A pessoa pede, o modelo propõe, a pessoa aprova e executa. O agente tira o humano da supervisão de passos e o coloca na supervisão de resultados. Você entrega um objetivo, ele planeja e age sobre ferramentas e dados, e você confere o que saiu no fim.",
            "O debate agentes de IA vs copilots quase sempre discute qual é o mais impressionante. A pergunta que importa para quem constrói em B2B é qual lançar primeiro. Na Avante Ventures a resposta é o copilot, e não por ser mais seguro em si. O copilot é a cunha que ganha confiança e abre o loop de dados. O agente é o destino onde esse dado se transforma em poder de precificação. Lance nessa ordem e o moat se constrói sozinho. Lance o agente primeiro e você tende a queimar a confiança de que precisava para chegar lá."
          ]
        },
        {
          "id": "the-spectrum",
          "heading": "O espectro de autonomia, definido",
          "level": 2,
          "paragraphs": [
            "O teste mais limpo não é técnico. É este. O que o humano supervisiona? O copilot é um assistente que trabalha ao lado de uma pessoa que ainda revisa, edita e executa a ação final. Ele é reativo. Espera ser acionado, e nada acontece até alguém dar a ordem. O agente recebe um objetivo e age em múltiplos passos sem um comando a cada turno, o que move o humano para a supervisão do resultado, não das teclas.",
            "Um [tratamento de 2025 sobre a distinção](https://medium.com/@kanerika/ai-copilot-vs-ai-agent-when-to-let-ai-assist-vs-act-autonomously-3ed60438f0b4) resume bem. O copilot acelera as tarefas que o humano já faz. O agente assume e completa um processo inteiro. O espectro vai da autonomia baixa a média e da postura reativa, na ponta do copilot, à autonomia alta e proativa, na ponta do agente.",
            "Isso importa para quem constrói, não só para quem classifica, porque no instante em que um sistema age sem um portão humano a cada passo, a economia e os modos de falha mudam. Um copilot que sugere uma resposta errada custa um clique. Um agente que toma uma ação errada manda o e-mail, fecha a viagem ou protocola o pedido. O mesmo modelo por baixo. Raio de impacto muito diferente. Ser AI-native significa que o modelo faz o trabalho de julgamento dentro do loop nos dois casos. A pergunta aberta é quanto do loop você confia a ele para fechar sozinho."
          ]
        },
        {
          "id": "adoption-signal",
          "heading": "O que os dados de adoção dizem",
          "level": 2,
          "paragraphs": [
            "O copilot já é quase universal. O agente é a fronteira ainda em grande parte por construir. Duas projeções de analistas fixam o momento. Sobre agentes, o [Gartner projeta](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) que cerca de 40% das aplicações corporativas terão agentes de IA de tarefa específica até 2026, ante menos de 5% em 2025. A analista sênior do Gartner, Anushree Verma, descreve o arco como uma progressão dos assistentes básicos embarcados nas aplicações hoje, para agentes de tarefa específica até 2026, e para ecossistemas multiagentes até 2029.",
            "O Gartner é explícito ao dizer que o assistente é o precursor. Na leitura deles, os assistentes de IA dependem de input humano e não operam de forma independente, enquanto os agentes de tarefa específica começam a agir por conta própria. Na outra ponta do espectro, a pesquisa FutureScape 2026 da IDC aponta que mais de 80% das aplicações corporativas terão recursos de copilot de IA embarcados até o fim de 2026, e que o uso de agentes nas maiores empresas deve crescer cerca de dez vezes, com a carga de chamadas de API subindo aproximadamente mil vezes.",
            "Lidos juntos, os dois números mostram a quem constrói onde se posicionar. Uma capacidade rumo a 80% de penetração vira custo de entrada, não moat. Uma capacidade que sai de menos de 5% é onde se decide a próxima década de poder de precificação. Os agentes de IA empresariais em 2026 são a parte íngreme da curva. O copilot é a porta por onde quase todos já passam."
          ],
          "callout": {
            "kind": "stat",
            "text": "Cerca de 40% das aplicações corporativas terão agentes de IA de tarefa específica até 2026, ante menos de 5% em 2025. Os copilots estarão embarcados em mais de 80% das aplicações corporativas até o fim de 2026.",
            "attribution": "Gartner, agosto de 2025, e IDC FutureScape 2026, outubro de 2025"
          }
        },
        {
          "id": "copilot-as-wedge",
          "heading": "Por que o copilot é a cunha",
          "level": 2,
          "paragraphs": [
            "O copilot conquista seu lugar dentro de um fluxo de trabalho, e conquistar esse lugar é o que abre o loop de dados. Ele é um ponto de entrada de baixa confiança. Pede ao cliente que arrisque um clique, não um processo, e essa barreira baixa é exatamente o motivo de ser usado. Adoção é a única coisa que produz dado. Cada interação supervisionada em um fluxo denso de regulação deixa para trás um registro estruturado e rotulado do que um especialista aceitou, corrigiu ou rejeitou. Esse rastro é a matéria-prima de um moat.",
            "A lógica de defensibilidade é bem estabelecida, e é mais afiada do que a conversa comum sobre dado como barreira. Segundo a [Andreessen Horowitz](https://a16z.com/the-empty-promise-of-data-moats/), acumular dado proprietário é defensável sobretudo quando as fontes são escassas ou relutantes em fornecer a mais de um fornecedor. Esse é o perfil exato de um vertical denso de regulação. O dado é raro, difícil de montar, e quem o detém reluta em entregá-lo a um segundo comprador. O copilot é o instrumento que cunha exatamente esse tipo de dado, um passo supervisionado por vez, enquanto o cliente ainda se sente confortável supervisionando cada passo."
          ],
          "bullets": [
            "Custo de entrada baixo. O copilot pede um clique, não um processo, então passa pela barreira de confiança que um agente autônomo não vence no primeiro dia.",
            "Rastro de dado. Cada aceite, edição e rejeição é um julgamento rotulado de um especialista de domínio, o insumo escasso que um modelo de prateleira nunca vê.",
            "Confiança conquistada no tempo certo. Um copilot visivelmente certo nove vezes em dez por seis meses é o que depois faz o cliente disposto a delegar a tarefa inteira.",
            "A primeira volta do flywheel. Entre com um copilot, cunhe dado proprietário, construa a confiança e a base que o agente vai exigir. É o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel) no seu início."
          ]
        },
        {
          "id": "agent-as-destination",
          "heading": "Por que o agente é o destino",
          "level": 2,
          "paragraphs": [
            "O agente é onde mora o poder de precificação, porque ação autônoma sobre uma base proprietária é difícil de comoditizar. O copilot compete em conveniência, e conveniência comprime à medida que toda aplicação passa a embarcar um. Lembre do número da IDC. Mais de 80% das aplicações corporativas terão um copilot até o fim de 2026. Uma capacidade tão comum não é onde a margem se acumula. Um agente em quem se pode confiar para rodar um processo de múltiplos passos sobre [dados que nenhum rival possui](/library/data-network-effects-vertical-ai) vende um resultado, não uma sugestão, e resultados precificados contra uma base proprietária sustentam o preço.",
            "É também a volta em que o flywheel se transforma em capital. O destino do flywheel copilot, dado, capital é um agente agindo sobre a base que o copilot construiu. Em um fluxo de ativos judiciais, o agente não apenas propõe uma avaliação. Ele pode originar e agir sobre os ativos que o dado identifica. O dado deixa de ser uma funcionalidade e vira um motor de originação. É o ponto em que uma venture sai de vender software para alocar capital contra o próprio sinal, e só se chega lá porque o copilot conquistou o dado e a confiança antes. A ordem é o argumento inteiro."
          ]
        },
        {
          "id": "autonomy-failure",
          "heading": "Onde a autonomia prematura sai pela culatra",
          "level": 2,
          "paragraphs": [
            "A maioria dos fluxos corporativos não está pronta para autonomia plena, e lançar um agente cedo demais falha de um jeito que o copilot nunca falha. O mercado já está precificando isso. O [Gartner projeta](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que mais de 40% dos projetos de IA agêntica serão cancelados até o fim de 2027, por custos crescentes, valor de negócio pouco claro e controles de risco frágeis. Verma é direta sobre o estado das coisas. A maioria dos projetos de IA agêntica hoje são experimentos em estágio inicial, movidos por hype e muitas vezes mal aplicados. O Gartner ainda aponta o agent washing generalizado, estimando que, dos milhares de fornecedores que se dizem agênticos, apenas cerca de 130 entregam o artigo genuíno.",
            "A falha é estrutural. Um agente falha de forma silenciosa e cara quando um passo dá errado, porque nenhum humano estava observando aquele passo. O erro de um copilot é barrado no portão. O erro de um agente é executado. E a prontidão é, em grande parte, um problema de dado. O trabalho mais amplo do Gartner sobre resultados de IA aponta que apenas cerca de 28% dos casos de uso de IA cumprem plenamente suas expectativas de ROI, cerca de 20% falham por completo, e 85% das falhas vêm de dado ruim ou ausente. Um agente agindo sobre dado raso ou errado não hesita. Ele age, em escala, sobre a coisa errada.",
            "Para uma venture B2B há um custo de relacionamento específico. Lance um agente antes de ter conquistado o dado e a confiança para supervisioná-lo bem, e você corrói a relação com o cliente de que toda a tese depende. Um cliente que viu um sistema autônomo cometer um erro caro não concede mais autonomia. Ele a revoga. O agente prematuro não apenas falha em uma tarefa. Ele queima a confiança que o copilot teria construído, e confiança é o insumo escasso de que o flywheel vive."
          ],
          "callout": {
            "kind": "tip",
            "text": "Antes de lançar autonomia, faça uma pergunta. O copilot já conquistou a confiança e o dado para supervisionar bem o agente? Se não, o agente vai falhar em silêncio, em escala, sobre a coisa errada.",
            "attribution": "O teste de sequenciamento da Avante"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante sequencia isso",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Lança 3-4 ventures por ano por um sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. Aporta $500K-1.5M por venture e mantém economia de co-founder. O benchmark por trás do modelo é o achado da GSSN de que o IRR de studio fica em torno de ~50% contra ~19% do venture capital tradicional, cerca de 2,5x. A vantagem estrutural são operadores de domínio com mais de 10 anos de cicatriz no mercado brasileiro, somados a um playbook de Vale do Silício e capital de primeiro cheque, montados no dia um.",
            "O Brasil combina com a sequência copilot e depois agente porque os fluxos de trabalho são ao mesmo tempo vastos e recém-prontos. Os serviços respondem por cerca de 70% do PIB brasileiro, uma superfície profunda de trabalho pouco digitalizado e denso de regulação, onde um copilot pode cunhar dado que nenhum incumbente possui. E a rampa de entrada acabou de abrir. A fatia de empresas industriais brasileiras usando IA subiu de 16,9% em 2022 para 41,9% em 2024, mais que dobrando em dois anos, mas cerca de três em cada quatro empresas que adotam IA ainda estão em maturidade experimental. Adoção rápida, operação rasa. Essa lacuna é um mercado cheio de copilots que ainda não conquistaram seu caminho até os agentes.",
            "O modelo de studio é o que torna a disciplina acessível. Resolver o encanamento da empresa uma vez direciona cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead, o que dá ao copilot o fôlego para [alcançar densidade de uso sem uma Série A](/library/ai-native-without-series-a) antes de a tese de dado ou o agente terem de se provar. Os operating partners seguem engajados até o primeiro marco de receita, a janela exata em que o copilot precisa conquistar confiança antes de qualquer autonomia ir ao ar. Uma venture de studio nasce 6-9 meses à frente de um time autônomo comparável. São 6-9 meses a mais de dado e de confiança conquistada antes de o agente ser chamado a agir. As empresas que vencerem a era dos agentes serão as que tiveram paciência de lançar o copilot primeiro. Veja o modelo em [/why-avante](/why-avante) e as regras de operação em [/principles](/principles)."
          ]
        }
      ]
    },
    "es": {
      "title": "Agentes vs Copilots: el Orden que Construye un Moat",
      "description": "Un copilot gana confianza e inicia el loop de datos. Un agente lo multiplica. Por qué una venture B2B lanza en ese orden, y no al revés.",
      "sections": [
        {
          "paragraphs": [
            "Un copilot y un agente no son dos productos. Son dos puntos de un mismo espectro de autonomía, y la distancia entre ellos es donde hoy vive la mayor parte del valor y del riesgo en B2B. El copilot mantiene al humano en el circuito en cada paso. La persona pide, el modelo propone, la persona aprueba y ejecuta. El agente saca al humano de la supervisión de pasos y lo lleva a la supervisión de resultados. Usted le entrega un objetivo, él planifica y actúa sobre herramientas y datos, y usted revisa lo que salió al final.",
            "El debate agentes de IA vs copilots casi siempre discute cuál es el más impresionante. La pregunta que importa para quien construye en B2B es cuál lanzar primero. En Avante Ventures la respuesta es el copilot, y no por ser más seguro en sí mismo. El copilot es la cuña que gana confianza e inicia el loop de datos. El agente es el destino donde ese dato se convierte en poder de fijación de precios. Lance en ese orden y el moat se construye solo. Lance el agente primero y tiende a quemar la confianza que necesitaba para llegar ahí."
          ]
        },
        {
          "id": "the-spectrum",
          "heading": "El espectro de autonomía, definido",
          "level": 2,
          "paragraphs": [
            "La prueba más limpia no es técnica. Es esta. ¿Qué supervisa el humano? El copilot es un asistente que trabaja al lado de una persona que todavía revisa, edita y ejecuta la acción final. Es reactivo. Espera a ser activado, y nada ocurre hasta que alguien da la orden. El agente recibe un objetivo y actúa en múltiples pasos sin un comando en cada turno, lo que mueve al humano a supervisar el resultado, no las teclas.",
            "Un [tratamiento de 2025 sobre la distinción](https://medium.com/@kanerika/ai-copilot-vs-ai-agent-when-to-let-ai-assist-vs-act-autonomously-3ed60438f0b4) lo resume bien. El copilot acelera las tareas que el humano ya hace. El agente asume y completa un proceso entero. El espectro va de la autonomía baja a media y la postura reactiva, en el extremo del copilot, a la autonomía alta y proactiva, en el extremo del agente.",
            "Esto importa para quien construye, no solo para quien clasifica, porque en el instante en que un sistema actúa sin una compuerta humana en cada paso, la economía y los modos de falla cambian. Un copilot que sugiere una respuesta equivocada cuesta un clic. Un agente que toma una acción equivocada manda el correo, cierra el viaje o radica la solicitud. El mismo modelo por debajo. Un radio de impacto muy distinto. Ser AI-native significa que el modelo hace el trabajo de juicio dentro del loop en ambos casos. La pregunta abierta es cuánto del loop usted confía en que cierre solo."
          ]
        },
        {
          "id": "adoption-signal",
          "heading": "Qué dicen los datos de adopción",
          "level": 2,
          "paragraphs": [
            "El copilot ya es casi universal. El agente es la frontera que en gran parte aún está por construir. Dos proyecciones de analistas fijan el momento. Sobre agentes, [Gartner proyecta](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) que cerca del 40% de las aplicaciones empresariales tendrán agentes de IA de tarea específica hacia 2026, frente a menos del 5% en 2025. La analista senior de Gartner, Anushree Verma, describe el arco como una progresión de los asistentes básicos embebidos en las aplicaciones hoy, hacia agentes de tarea específica para 2026, y hacia ecosistemas multiagente para 2029.",
            "Gartner es explícito al decir que el asistente es el precursor. En su lectura, los asistentes de IA dependen de input humano y no operan de forma independiente, mientras que los agentes de tarea específica empiezan a actuar por cuenta propia. En el otro extremo del espectro, la investigación FutureScape 2026 de IDC encuentra que más del 80% de las aplicaciones empresariales tendrán capacidades de copilot de IA embebidas hacia el fin de 2026, y que el uso de agentes en las mayores empresas crecería cerca de diez veces, con la carga de llamadas de API subiendo aproximadamente mil veces.",
            "Leídos juntos, los dos números le muestran a quien construye dónde pararse. Una capacidad camino al 80% de penetración se vuelve costo de entrada, no moat. Una capacidad que sale de menos del 5% es donde se decide la próxima década de poder de fijación de precios. Los agentes de IA empresariales en 2026 son la parte empinada de la curva. El copilot es la puerta por la que casi todos ya pasan."
          ],
          "callout": {
            "kind": "stat",
            "text": "Cerca del 40% de las aplicaciones empresariales tendrán agentes de IA de tarea específica hacia 2026, frente a menos del 5% en 2025. Los copilots estarán embebidos en más del 80% de las aplicaciones empresariales hacia el fin de 2026.",
            "attribution": "Gartner, agosto de 2025, e IDC FutureScape 2026, octubre de 2025"
          }
        },
        {
          "id": "copilot-as-wedge",
          "heading": "Por qué el copilot es la cuña",
          "level": 2,
          "paragraphs": [
            "El copilot se gana su lugar dentro de un flujo de trabajo, y ganarse ese lugar es lo que abre el loop de datos. Es un punto de entrada de baja confianza. Le pide al cliente que arriesgue un clic, no un proceso, y esa barrera baja es exactamente la razón por la que se usa. La adopción es lo único que produce datos. Cada interacción supervisada en un flujo denso de regulación deja atrás un registro estructurado y etiquetado de lo que un experto aceptó, corrigió o rechazó. Ese rastro es la materia prima de un moat.",
            "La lógica de defensibilidad está bien establecida, y es más afilada que la charla común sobre el dato como barrera. Según [Andreessen Horowitz](https://a16z.com/the-empty-promise-of-data-moats/), acumular dato propietario es defendible sobre todo cuando las fuentes son escasas o reacias a entregarlo a más de un proveedor. Ese es el perfil exacto de un vertical denso de regulación. El dato es raro, difícil de armar, y quien lo posee es reacio a entregarlo a un segundo comprador. El copilot es el instrumento que acuña justo ese tipo de dato, un paso supervisado a la vez, mientras el cliente todavía se siente cómodo supervisando cada paso."
          ],
          "bullets": [
            "Costo de entrada bajo. El copilot pide un clic, no un proceso, así que pasa la barrera de confianza que un agente autónomo no supera el primer día.",
            "Rastro de datos. Cada aceptación, edición y rechazo es un juicio etiquetado de un experto de dominio, el insumo escaso que un modelo de estantería nunca ve.",
            "Confianza ganada en el momento justo. Un copilot visiblemente acertado nueve de cada diez veces durante seis meses es lo que después hace que el cliente esté dispuesto a delegar la tarea entera.",
            "La primera vuelta del flywheel. Entre con un copilot, acuñe dato propietario, construya la confianza y la base que el agente va a exigir. Es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel) en su inicio."
          ]
        },
        {
          "id": "agent-as-destination",
          "heading": "Por qué el agente es el destino",
          "level": 2,
          "paragraphs": [
            "El agente es donde vive el poder de fijación de precios, porque la acción autónoma sobre una base propietaria es difícil de comoditizar. El copilot compite en conveniencia, y la conveniencia se comprime a medida que toda aplicación pasa a embeber uno. Recuerde el número de IDC. Más del 80% de las aplicaciones empresariales tendrán un copilot hacia el fin de 2026. Una capacidad tan común no es donde se acumula el margen. Un agente en quien se puede confiar para correr un proceso de múltiples pasos sobre [datos que ningún rival posee](/library/data-network-effects-vertical-ai) vende un resultado, no una sugerencia, y los resultados fijados contra una base propietaria sostienen su precio.",
            "Es también la vuelta en la que el flywheel se convierte en capital. El destino del flywheel copilot, dato, capital es un agente actuando sobre la base que el copilot construyó. En un flujo de activos judiciales, el agente no solo propone una valoración. Puede originar y actuar sobre los activos que el dato identifica. El dato deja de ser una funcionalidad y se vuelve un motor de originación. Es el punto en que una venture pasa de vender software a asignar capital contra su propia señal, y solo se llega ahí porque el copilot se ganó el dato y la confianza antes. El orden es el argumento entero."
          ]
        },
        {
          "id": "autonomy-failure",
          "heading": "Dónde la autonomía prematura es contraproducente",
          "level": 2,
          "paragraphs": [
            "La mayoría de los flujos empresariales no están listos para la autonomía plena, y lanzar un agente demasiado pronto falla de un modo en que el copilot nunca falla. El mercado ya lo está poniendo en precio. [Gartner proyecta](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) que más del 40% de los proyectos de IA agéntica serán cancelados hacia el fin de 2027, por costos crecientes, valor de negocio poco claro y controles de riesgo débiles. Verma es directa sobre el estado de las cosas. La mayoría de los proyectos de IA agéntica hoy son experimentos en etapa temprana, movidos por el hype y a menudo mal aplicados. Gartner además señala el agent washing generalizado, estimando que, de los miles de proveedores que se dicen agénticos, solo cerca de 130 entregan el artículo genuino.",
            "La falla es estructural. Un agente falla de forma silenciosa y cara cuando un paso sale mal, porque ningún humano estaba observando ese paso. El error de un copilot se detiene en la compuerta. El error de un agente se ejecuta. Y la preparación es, en gran parte, un problema de datos. El trabajo más amplio de Gartner sobre resultados de IA encuentra que solo cerca del 28% de los casos de uso de IA cumplen plenamente sus expectativas de ROI, cerca del 20% fallan por completo, y el 85% de las fallas vienen de dato malo o ausente. Un agente actuando sobre dato pobre o equivocado no duda. Actúa, a escala, sobre lo equivocado.",
            "Para una venture B2B hay un costo de relación específico. Lance un agente antes de haberse ganado el dato y la confianza para supervisarlo bien, y erosiona la relación con el cliente de la que toda la tesis depende. Un cliente que vio a un sistema autónomo cometer un error caro no concede más autonomía. La revoca. El agente prematuro no solo falla en una tarea. Quema la confianza que el copilot habría construido, y la confianza es el insumo escaso del que vive el flywheel."
          ],
          "callout": {
            "kind": "tip",
            "text": "Antes de lanzar autonomía, hágase una pregunta. ¿El copilot ya se ganó la confianza y el dato para supervisar bien al agente? Si no, el agente fallará en silencio, a escala, sobre lo equivocado.",
            "attribution": "La prueba de secuenciamiento de Avante"
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante lo secuencia",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Lanza 3-4 ventures por año mediante un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Despliega $500K-1.5M por venture y retiene economía de co-founder. El benchmark detrás del modelo es el hallazgo de GSSN de que el IRR de studio ronda el ~50% frente al ~19% del venture capital tradicional, cerca de 2,5x. La ventaja estructural son operadores de dominio con más de 10 años de cicatriz en el mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque, ensamblados el día uno.",
            "Brasil encaja con la secuencia copilot y luego agente porque los flujos de trabajo son a la vez vastos y recién listos. Los servicios representan cerca del 70% del PIB brasileño, una superficie profunda de trabajo poco digitalizado y denso de regulación, donde un copilot puede acuñar dato que ningún incumbente posee. Y la rampa de entrada acaba de abrirse. La porción de empresas industriales brasileñas que usan IA subió del 16,9% en 2022 al 41,9% en 2024, más que duplicándose en dos años, pero cerca de tres de cada cuatro empresas que adoptan IA todavía están en madurez experimental. Adopción rápida, operación superficial. Esa brecha es un mercado lleno de copilots que aún no se han ganado su camino hacia los agentes.",
            "El modelo de studio es lo que vuelve asequible la disciplina. Resolver la plomería de la empresa una sola vez dirige cerca de $300K-500K de capital efectivo por venture hacia producto y tracción en lugar de overhead, lo que le da al copilot el aire para [alcanzar densidad de uso sin una Serie A](/library/ai-native-without-series-a) antes de que la tesis de dato o el agente tengan que probarse. Los operating partners siguen comprometidos hasta el primer hito de ingresos, la ventana exacta en que el copilot debe ganarse la confianza antes de que cualquier autonomía salga al aire. Una venture de studio nace 6-9 meses por delante de un equipo autónomo comparable. Son 6-9 meses más de dato y de confianza ganada antes de que se le pida al agente actuar. Las empresas que ganen la era de los agentes serán las que tuvieron la paciencia de lanzar el copilot primero. Vea el modelo en [/why-avante](/why-avante) y las reglas de operación en [/principles](/principles)."
          ]
        }
      ]
    }
  },
  {
    "slug": "ai-infrastructure-cost-curve-latam",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "The AI Cost Curve Lets LATAM Ventures Skip the Series A",
      "description": "Inference cost is collapsing about 10x a year. That routes capital from infrastructure to product and neutralizes LATAM's historic capital disadvantage right on time.",
      "sections": [
        {
          "paragraphs": [
            "The cost to run a model of a given capability is falling by roughly an order of magnitude per year, and that single fact rewrites the math of building an AI startup. Stanford's AI Index found the inference cost for a GPT-3.5-level system dropped more than 280-fold between November 2022 and October 2024. When the build gets that cheap, the money that used to fund a 20-person engineering team moves to product and distribution instead.",
            "For Brazil and the broader LATAM market, the timing matters. Founders here never had the capital depth of their US peers. A falling AI inference cost curve neutralizes that disadvantage just as Brazil's services economy stays under-digitized. This is the case for why a LATAM venture can now [launch without a Series A](/library/ai-native-without-series-a), and why Avante Ventures treats that as a structural opening rather than a slogan."
          ]
        },
        {
          "id": "the-curve",
          "heading": "The cost curve, with dated numbers",
          "level": 2,
          "paragraphs": [
            "Start with the number that anchors everything else. For a model of equivalent performance, inference cost is decreasing by about 10x every year, per Andreessen Horowitz. The concrete version is sharper. At roughly GPT-3 capability, the price ran 60 dollars per million tokens in November 2021 and about 0.06 dollars per million tokens by November 2024, a 1,000x reduction over three years, as documented in [a16z's LLMflation analysis](https://a16z.com/llmflation-llm-inference-cost/).",
            "Stanford backs the same story from a neutral seat. The [AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report) reports the inference cost for a GPT-3.5-level system fell more than 280-fold between November 2022 and October 2024. For a 2026 reader that is the figure to lead with, because it is recent and it comes from academia, not a fund.",
            "Epoch AI measured the same collapse and held it to a stricter method. Across benchmarks, the price to reach a fixed capability level fell at a median of about 50x per year, with the range running from 9x to 900x depending on the task. The decline has accelerated. From January 2024 onward, the median rate rose to roughly 200x per year, according to [Epoch AI's inference price research](https://epoch.ai/data-insights/llm-inference-price-trends).",
            "The three sources agree on direction and order of magnitude. They differ on the exact slope, which is the honest way to report a moving target. Take the Stanford 280-fold and the a16z 10x per year as the working headline and the 9x to 900x range as the reason to trust it."
          ]
        },
        {
          "id": "mechanism",
          "heading": "What cheap inference moves the money toward",
          "level": 2,
          "paragraphs": [
            "When inference, vector search, and managed infrastructure all commoditize, the fixed cost of standing up an AI product collapses and the marginal cost of testing an idea approaches zero. The capital a 2021 startup burned on a platform team to build retrieval, eval harnesses, and serving infrastructure is now a managed API line item. The scarce input shifts from engineering capacity to product judgment and access to a market.",
            "This is the structural reason a class of AI companies now reaches scale with tiny teams and little outside capital. Reporting through 2025 describes seed-strapped AI startups that refuse large rounds to stay lean and reach profitability early, and a wave of AI-native companies hitting serious revenue with headcounts under 50. The verified hard number underneath all of it is the cost curve."
          ],
          "bullets": [
            "The build is no longer the differentiator. Writing the plumbing is a commodity that gets cheaper every quarter.",
            "The differentiated value moves to domain access, proprietary data, and speed to revenue.",
            "That is exactly the set of inputs a venture studio supplies on day one rather than leaving a founder to assemble over 18 months."
          ]
        },
        {
          "id": "capital-efficiency",
          "heading": "Routing $300K-500K to product, not infra",
          "level": 2,
          "paragraphs": [
            "Here is where the cost curve meets the studio balance sheet. Solving company plumbing once routes roughly $300K-$500K of effective capital per venture into product and traction rather than overhead. With Avante deploying $500K-1.5M per venture across pre-seed, the falling cost curve is what makes that routing real instead of aspirational. When the infrastructure line item shrinks toward an API bill, more of the first ticket reaches the customer.",
            "Put it in founder terms. A 2021 seed-stage AI team might have spent a third of its first year of cash standing up infrastructure that a 2026 team rents by the call. That recovered third is the difference between one shot at product-market fit and three.",
            "The studio model compounds this. Shared infrastructure across a portfolio, plus a cost curve that keeps falling, means the same dollar buys more product attempts every year."
          ],
          "callout": {
            "kind": "stat",
            "text": "A capability that cost 60 dollars per million tokens in November 2021 cost about 0.06 dollars by November 2024. A 1,000x drop in three years.",
            "attribution": "a16z, Welcome to LLMflation, November 2024"
          }
        },
        {
          "id": "brazil-timing",
          "heading": "Why the timing favors Brazil",
          "level": 2,
          "paragraphs": [
            "Start with the structural fact. Services account for roughly 70% of Brazilian GDP, with low software penetration. That base is still under-digitized, and it is still growing. The services sector expanded 3.1% in 2024, its fourth straight year of growth, according to [IBGE](https://agenciabrasil.ebc.com.br/economia/noticia/2025-02/setor-de-servicos-cresce-31-em-2024-mostra-ibge). A large, growing, software-thin economy is exactly what an AI-native team can now address without a Series A. We map that opportunity sector by sector in the [Brazil AI Market Report 2026](/library/brazil-ai-market-report-2026).",
            "Now the capital backdrop. LATAM venture funding reset hard after 2021 and is recovering off a low base. In 2024 the region drew about 4.5 billion dollars across 751 deals, an 8% increase year over year, with Brazil taking 44% and Mexico 26%, per [LAVCA industry data](https://www.lavca.org/research/2024-lavca-industry-data-analysis/). For scale, that full-year regional total is a rounding error next to a single large US AI round. LATAM founders have never competed on capital depth.",
            "The timing argument follows directly. A cheaper cost curve neutralizes the exact disadvantage that thin capital used to impose. When the build no longer requires a 20-person team and a Series A to fund it, the infrastructure playing field flattens, and the edge that remains is domain operator depth. Brazil has that in abundance. AI infrastructure is now cheap enough to deploy without a Series A."
          ]
        },
        {
          "id": "not-a-moat",
          "heading": "Cheap inference is not a moat",
          "level": 2,
          "paragraphs": [
            "Here is the part a pitch deck would skip. A falling cost curve is available to everyone. It lowers the barrier for your competitors at the same rate it lowers it for you. Cheap inference is a tailwind, not a moat. Anyone with a credit card and an API key gets the same prices you do.",
            "There is a second trap. Per-token prices fall while total inference spend can climb, because newer reasoning models burn far more tokens per task. Cheap per unit is not cheap in aggregate once usage scales. Epoch AI flagged this directly in its 2025 work. The lesson is to treat the cost curve as a starting condition, not a strategy.",
            "If cost is not a moat, the durable advantage has to come from somewhere the cost curve does not touch. The studio answer is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. The copilot is cheap to build precisely because of the cost curve. The data it accumulates is the moat the cost curve cannot erode."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante uses the curve",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. It treats the cost curve as a tailwind, not a thesis. The thesis is operator depth paired with proprietary data, assembled on day one.",
            "The mechanics are specific. Avante launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. It deploys $500K-1.5M per venture across pre-seed and retains co-founder economics. Because the cost curve routes roughly $300K-$500K of effective capital per venture into product rather than overhead, a studio venture launches 6-9 months ahead of a comparably funded standalone team.",
            "The benchmark behind the model is blunt. Venture studios materially outperform traditional venture capital on IRR, at a studio IRR of ~50% versus an industry-standard ~19% for traditional VC, per the Global Startup Studio Network (GSSN). That is roughly 2.5x the IRR of traditional VC over realistic time horizons, and it is the studio-model benchmark, not Avante's own realized return.",
            "The cost curve makes the build cheap. Domain operators with 10+ years of Brazilian-market scar tissue, and the proprietary data they generate, are what make it defensible. The first one is a gift the whole market receives. The second is the only part a competitor cannot buy with a credit card. Read the full thesis at [/why-avante](/why-avante), or browse related market analysis in the [/library](/library)."
          ]
        }
      ]
    },
    "pt": {
      "title": "A Curva de Custo da IA Deixa Ventures da América Latina Pularem a Série A",
      "description": "O custo de inferência está despencando. Isso desloca capital de infraestrutura para produto e neutraliza, na hora certa, a desvantagem histórica de capital da América Latina.",
      "sections": [
        {
          "paragraphs": [
            "A curva de custo de inferência de IA fez algo silencioso e enorme. O preço para rodar um modelo de uma dada capacidade cai cerca de uma ordem de grandeza por ano, o que significa que o build que antes exigia uma Série A agora cabe dentro de um cheque pré-seed. Veja como isso funciona na prática em [Como Construir uma Empresa AI-Native Sem uma Série A](/library/ai-native-without-series-a). Para o Brasil, isso não é nota de rodapé técnica. É o momento em que uma desvantagem histórica de profundidade de capital deixa de pesar.",
            "O AI Index 2025 de Stanford mostrou que o custo de inferência para um sistema no nível do GPT-3.5 caiu mais de 280 vezes entre novembro de 2022 e outubro de 2024. A Andreessen Horowitz coloca a mesma tendência em cerca de 10x ao ano. Quando o custo de levantar um produto de IA desaba, o insumo escasso deixa de ser capacidade de engenharia. Passa a ser acesso a um domínio e distribuição.",
            "A Avante Ventures constrói exatamente em cima dessa virada. A curva de custo é o vento a favor. Profundidade de operador e dado proprietário são a estratégia."
          ]
        },
        {
          "id": "the-curve",
          "heading": "A curva de custo, com números datados",
          "level": 2,
          "paragraphs": [
            "A queda do custo por token de IA é hoje a tendência mais bem documentada do setor, e os números são diretos. Para um modelo de desempenho equivalente, o custo de inferência cai cerca de 10x todo ano, segundo a Andreessen Horowitz em novembro de 2024. O exemplo âncora é difícil de ignorar. No nível do GPT-3, o preço foi de 60 dólares por milhão de tokens em novembro de 2021 para cerca de 0,06 dólares em novembro de 2024. Uma queda de 1.000x em três anos.",
            "Stanford sustenta a mesma história de uma cadeira neutra. O [AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report) relata que o custo de inferência de um sistema no nível do GPT-3.5 caiu mais de 280 vezes entre novembro de 2022 e outubro de 2024. Para um leitor de 2026 esse é o número para liderar, porque é recente e vem da academia, não de um fundo.",
            "A Epoch AI mediu o mesmo colapso com método mais rigoroso. O preço para atingir um nível fixo de capacidade caiu a uma mediana de cerca de 50x ao ano, com faixa de 9x a 900x conforme a tarefa. A aceleração importa mais que a média. A partir de janeiro de 2024, a mediana subiu para cerca de 200x ao ano."
          ],
          "bullets": [
            "a16z (nov 2024): cerca de 10x ao ano, 1.000x em três anos no nível do GPT-3.",
            "Stanford HAI AI Index (2025): mais de 280 vezes para inferência no nível do GPT-3.5, de nov 2022 a out 2024.",
            "Epoch AI (mar 2025): mediana de 50x ao ano entre benchmarks, acelerando para cerca de 200x ao ano após janeiro de 2024."
          ],
          "callout": {
            "kind": "stat",
            "text": "O custo de inferência para um sistema no nível do GPT-3.5 caiu mais de 280 vezes entre novembro de 2022 e outubro de 2024.",
            "attribution": "Stanford HAI, AI Index Report 2025"
          }
        },
        {
          "id": "mechanism",
          "heading": "Para onde a inferência barata move o dinheiro",
          "level": 2,
          "paragraphs": [
            "Quando inferência, busca vetorial e infraestrutura gerenciada se tornam commodity ao mesmo tempo, o custo fixo de levantar um produto de IA desaba e o custo marginal de testar uma ideia se aproxima de zero. O capital que uma startup de 2021 queimava com um time de plataforma de 20 pessoas para construir retrieval, harnesses de avaliação e infraestrutura de serving virou uma linha de fatura de API gerenciada.",
            "Então o gargalo se desloca. O insumo escasso deixa de ser quantos engenheiros você contrata para escrever encanamento. Passa a ser julgamento de produto, acesso a domínio e chegar à receita antes do dinheiro acabar. A cobertura ao longo de 2025 documenta empresas AI-native alcançando avaliação de unicórnio com [times abaixo de 50 pessoas](https://www.businessinsider.com/ai-startup-unicorns-with-tiny-teams-2025-5), um padrão estruturalmente impossível quando a infraestrutura precisava ser construída antes do produto.",
            "Para um venture studio isso é o jogo inteiro. Se o build é barato, o valor diferenciado não está em escrever o código. Está no acesso a domínio, no dado proprietário e na velocidade até a primeira receita. É o que a Avante entrega no dia um, não no mês nove."
          ]
        },
        {
          "id": "capital-efficiency",
          "heading": "Direcionar US$ 300 mil a 500 mil para produto, não infra",
          "level": 2,
          "paragraphs": [
            "A eficiência de capital de uma startup de IA hoje é decidida por onde vão os primeiros dólares, não por quantos são. Resolver o encanamento da empresa uma única vez direciona cerca de US$ 300 mil a US$ 500 mil de capital efetivo por venture para produto e tração, em vez de overhead. A curva de custo é o que torna esse direcionamento possível. Quando a linha de infraestrutura encolhe até virar conta de API, uma fatia maior do primeiro cheque chega ao cliente.",
            "Em termos de caixa. Um time de IA em estágio seed de 2021 talvez gastasse um terço do primeiro ano levantando infraestrutura que um time de 2026 aluga por chamada. Esse terço recuperado é a diferença entre uma tentativa de product-market fit e duas ou três. A Avante aplica US$ 500 mil a US$ 1,5 milhão por venture no pré-seed, e a curva decide quanto disso chega ao produto.",
            "A eficiência se compõe dentro de um studio. Infraestrutura compartilhada na carteira, somada a uma curva de custo que segue caindo, faz o mesmo dólar comprar mais tentativas de produto a cada ano."
          ]
        },
        {
          "id": "brazil-timing",
          "heading": "Por que o timing favorece o Brasil",
          "level": 2,
          "paragraphs": [
            "O Brasil é onde a curva de custo e a lacuna de mercado se alinham com mais clareza. Os serviços respondem por cerca de 70% do PIB brasileiro, e essa base segue pouco digitalizada. O setor de serviços cresceu 3,1% em 2024, quarto ano seguido de alta, segundo o [IBGE](https://agenciabrasil.ebc.com.br/economia/noticia/2025-02/setor-de-servicos-cresce-31-em-2024-mostra-ibge). Uma economia grande, em crescimento e com pouco software é exatamente o alvo que um time AI-native consegue endereçar agora sem uma Série A.",
            "O pano de fundo de capital é a outra metade. O funding de venture da América Latina passou por um reset forte depois de 2021 e se recupera de uma base baixa. Em 2024 a região captou cerca de 4,5 bilhões de dólares em 751 deals, alta de 8% no ano, com o Brasil ficando com 44% e o México com 26%, segundo dados da LAVCA. Esse total regional de ano inteiro é um arredondamento perto de uma única grande rodada de IA nos Estados Unidos.",
            "O argumento de timing segue direto. Uma curva de custo mais barata neutraliza exatamente a desvantagem que o capital escasso impunha. Quando o build não exige mais 20 engenheiros e uma Série A para financiá-los, o campo de infraestrutura se nivela, e a vantagem que resta é profundidade de operador de domínio. O Brasil tem isso de sobra."
          ],
          "callout": {
            "kind": "tip",
            "text": "Leia o timing nos dois sentidos ao mesmo tempo. A curva de custo torna barato construir uma empresa de IA brasileira, e a economia de serviços de 70% do PIB dá a ela um terreno subconstruído para apontar esse capital."
          }
        },
        {
          "id": "not-a-moat",
          "heading": "Inferência barata não é moat",
          "level": 2,
          "paragraphs": [
            "Aqui está a parte que um pitch deck pularia. Uma curva de custo em queda está disponível para todos, e é por isso que ela não pode ser sua defesa. Ela baixa a barreira para seus concorrentes no mesmo ritmo em que baixa para você. Qualquer um com cartão de crédito e uma chave de API recebe os mesmos preços. Inferência barata é vento a favor, nunca um moat.",
            "Há uma segunda armadilha nos mesmos dados. A Epoch AI documenta um paradoxo de custo. Os preços por token caem enquanto o gasto total com inferência pode subir, porque modelos de raciocínio queimam muito mais tokens por tarefa. Barato por unidade não é barato no agregado quando o uso escala. Fundadores que planejam pelo preço de manchete de hoje se surpreendem com a fatura de amanhã.",
            "Se custo não é moat, a vantagem durável tem de vir de algum lugar que a curva de custo não toca. Dado proprietário, distribuição e custo de troca. A resposta do studio é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construa um copiloto de IA para gerar dado proprietário, depois use esse dado para levantar e alocar capital. O copiloto é barato por causa da curva de custo. O dado é o moat que a curva de custo não consegue corroer."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante usa a curva",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Ela trata a curva de custo como vento estrutural a favor, não como tese. A tese é profundidade de operador combinada com dado proprietário, montadas no dia um.",
            "Na mecânica, a Avante lança 3-4 ventures por ano por um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. Aplica US$ 500 mil a US$ 1,5 milhão por venture no pré-seed e mantém economia de co-founder. Como a curva de custo direciona cerca de US$ 300 mil a US$ 500 mil de capital efetivo para produto em vez de overhead, um venture de studio lança 6-9 meses à frente de um time independente comparável.",
            "O benchmark por trás do modelo é a razão de o studio existir. A Global Startup Studio Network coloca o IRR de studio em cerca de ~50% contra um ~19% padrão do setor para VC tradicional, cerca de 2,5x ao longo de horizontes realistas. Esse é o benchmark do modelo de studio, não o retorno realizado da própria Avante. Leia a tese completa em [/why-avante](/why-avante) e análises de mercado relacionadas em [/library](/library).",
            "A curva de custo barateou o build para todo mundo de uma vez. O que ela não fez foi entregar a ninguém operadores de domínio com mais de 10 anos de cicatriz no mercado brasileiro. Esse é o insumo que segue escasso, e é o que a Avante monta antes da primeira linha de código."
          ]
        }
      ]
    },
    "es": {
      "title": "La Curva de Costo de la IA Permite a las Ventures de LATAM Saltarse la Serie A",
      "description": "El costo de inferencia se desploma. Eso mueve el capital de la infraestructura al producto y neutraliza, justo a tiempo, la desventaja histórica de capital de LATAM.",
      "sections": [
        {
          "paragraphs": [
            "La curva de costo de inferencia de IA hizo algo silencioso y enorme. El precio de correr un modelo de una capacidad dada cae cerca de un orden de magnitud por año, lo que significa que el build que antes exigía una Serie A ahora cabe dentro de un cheque pre-seed. El argumento completo está en [Cómo Construir una Empresa AI-Native Sin una Serie A](/library/ai-native-without-series-a). Para América Latina eso no es una nota técnica al pie. Es el momento en que una desventaja histórica de profundidad de capital deja de importar.",
            "El AI Index 2025 de Stanford encontró que el costo de inferencia de un sistema al nivel de GPT-3.5 cayó más de 280 veces entre noviembre de 2022 y octubre de 2024. Andreessen Horowitz ubica la misma tendencia en cerca de 10x por año. Cuando el costo de levantar un producto de IA se desploma, el insumo escaso deja de ser capacidad de ingeniería. Pasa a ser acceso a un dominio y distribución.",
            "Avante Ventures construye exactamente sobre ese giro. La curva de costo es el viento a favor. La profundidad de operador y el dato propietario son la estrategia."
          ]
        },
        {
          "id": "the-curve",
          "heading": "La curva de costo, con números fechados",
          "level": 2,
          "paragraphs": [
            "La caída del costo por token de IA es hoy la tendencia mejor documentada del sector, y los números son contundentes. Para un modelo de desempeño equivalente, el costo de inferencia cae cerca de 10x cada año, según Andreessen Horowitz en noviembre de 2024. El ejemplo ancla es difícil de descartar. Al nivel de GPT-3, el precio pasó de 60 dólares por millón de tokens en noviembre de 2021 a cerca de 0,06 dólares en noviembre de 2024. Una caída de 1.000x en tres años.",
            "Stanford respalda la misma historia desde una silla neutral. El [AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report) reporta que el costo de inferencia de un sistema al nivel de GPT-3.5 cayó más de 280 veces entre noviembre de 2022 y octubre de 2024. Para un lector de 2026 esa es la cifra con la que conviene abrir, porque es reciente y viene de la academia, no de un fondo.",
            "Epoch AI midió el mismo colapso con un método más estricto. El precio para alcanzar un nivel fijo de capacidad cayó a una mediana de cerca de 50x por año, con un rango de 9x a 900x según la tarea. La aceleración importa más que el promedio. Desde enero de 2024, la mediana subió a cerca de 200x por año."
          ],
          "bullets": [
            "a16z (nov 2024): cerca de 10x por año, 1.000x en tres años al nivel de GPT-3.",
            "Stanford HAI AI Index (2025): más de 280 veces para inferencia al nivel de GPT-3.5, de nov 2022 a oct 2024.",
            "Epoch AI (mar 2025): mediana de 50x por año entre benchmarks, acelerando a cerca de 200x por año después de enero de 2024."
          ],
          "callout": {
            "kind": "stat",
            "text": "El costo de inferencia de un sistema al nivel de GPT-3.5 cayó más de 280 veces entre noviembre de 2022 y octubre de 2024.",
            "attribution": "Stanford HAI, AI Index Report 2025"
          }
        },
        {
          "id": "mechanism",
          "heading": "Hacia dónde mueve el dinero la inferencia barata",
          "level": 2,
          "paragraphs": [
            "Cuando la inferencia, la búsqueda vectorial y la infraestructura gestionada se vuelven commodity al mismo tiempo, el costo fijo de levantar un producto de IA se desploma y el costo marginal de probar una idea se acerca a cero. El capital que una startup de 2021 quemaba en un equipo de plataforma de 20 personas para construir retrieval, harnesses de evaluación e infraestructura de serving hoy es una línea en una factura de API gestionada.",
            "Entonces el cuello de botella se mueve. El insumo escaso deja de ser cuántos ingenieros contrata para escribir plomería. Pasa a ser criterio de producto, acceso a dominio y llegar a los ingresos antes de que se acabe el dinero. La cobertura a lo largo de 2025 documenta empresas AI-native que alcanzan valoración de unicornio con [equipos de menos de 50 personas](https://www.businessinsider.com/ai-startup-unicorns-with-tiny-teams-2025-5), un patrón estructuralmente imposible cuando la infraestructura debía construirse antes que el producto.",
            "Para un venture studio ese es el juego entero. Si el build es barato, el valor diferenciado no está en escribir el código. Está en el acceso a dominio, el dato propietario y la velocidad a los primeros ingresos. Es lo que Avante entrega el día uno, no en el mes nueve."
          ]
        },
        {
          "id": "capital-efficiency",
          "heading": "Dirigir US$ 300 mil a 500 mil a producto, no a infra",
          "level": 2,
          "paragraphs": [
            "La eficiencia de capital de una startup de IA hoy se decide por dónde van los primeros dólares, no por cuántos son. Resolver la plomería de la empresa una sola vez dirige cerca de US$ 300 mil a US$ 500 mil de capital efectivo por venture hacia producto y tracción, en lugar de overhead. La curva de costo es lo que hace posible ese direccionamiento. Cuando la línea de infraestructura se encoge hasta volverse una cuenta de API, una porción mayor del primer cheque llega al cliente.",
            "En términos de caja. Un equipo de IA en etapa seed de 2021 quizá gastaba un tercio de su primer año levantando infraestructura que un equipo de 2026 alquila por llamada. Ese tercio recuperado es la diferencia entre un intento de product-market fit y dos o tres. Avante despliega US$ 500 mil a US$ 1,5 millones por venture en el pre-seed, y la curva decide cuánto de eso llega al producto.",
            "La eficiencia se compone dentro de un studio. Infraestructura compartida en el portafolio, sumada a una curva de costo que sigue cayendo, hace que el mismo dólar compre más intentos de producto cada año."
          ]
        },
        {
          "id": "brazil-timing",
          "heading": "Por qué el timing favorece a Brasil",
          "level": 2,
          "paragraphs": [
            "Brasil es donde la curva de costo y la brecha de mercado se alinean con más nitidez. Los servicios representan cerca del 70% del PIB brasileño, y esa base sigue poco digitalizada. El sector de servicios creció 3,1% en 2024, su cuarto año seguido de alza, según el [IBGE](https://agenciabrasil.ebc.com.br/economia/noticia/2025-02/setor-de-servicos-cresce-31-em-2024-mostra-ibge). Una economía grande, en crecimiento y con poco software es exactamente el objetivo que un equipo AI-native puede atender ahora sin una Serie A.",
            "El telón de fondo de capital es la otra mitad, y vale para toda la región, de México y Colombia a Chile y Argentina. El funding de venture en LATAM tuvo un reset fuerte después de 2021 y se recupera desde una base baja. En 2024 la región captó cerca de 4.500 millones de dólares en 751 deals, un alza de 8% interanual, con Brasil tomando 44% y México 26%, según datos de LAVCA. Ese total regional de un año entero es un redondeo frente a una sola ronda grande de IA en Estados Unidos.",
            "El argumento de timing se desprende directo. Una curva de costo más barata neutraliza justo la desventaja que el capital escaso imponía. Cuando el build ya no exige 20 ingenieros y una Serie A para financiarlos, el campo de infraestructura se nivela, y la ventaja que queda es la profundidad de operador de dominio. Brasil la tiene en abundancia, y el resto de LATAM también."
          ],
          "callout": {
            "kind": "tip",
            "text": "Lea el timing en los dos sentidos a la vez. La curva de costo abarata construir una empresa de IA en LATAM, y la economía de servicios del 70% del PIB de Brasil le da un terreno subconstruido al cual apuntar ese capital."
          }
        },
        {
          "id": "not-a-moat",
          "heading": "La inferencia barata no es un moat",
          "level": 2,
          "paragraphs": [
            "Aquí está la parte que un pitch deck se saltaría. Una curva de costo en caída está disponible para todos, y por eso no puede ser su defensa. Baja la barrera para sus competidores al mismo ritmo en que la baja para usted. Cualquiera con una tarjeta de crédito y una clave de API recibe los mismos precios. La inferencia barata es viento a favor, nunca un moat.",
            "Hay una segunda trampa en los mismos datos. Epoch AI documenta una paradoja de costo. Los precios por token caen mientras el gasto total en inferencia puede subir, porque los modelos de razonamiento queman muchos más tokens por tarea. Barato por unidad no es barato en agregado cuando el uso escala. Los fundadores que planean con el precio de titular de hoy se sorprenden con la factura de mañana.",
            "Si el costo no es un moat, la ventaja durable tiene que venir de algún lugar que la curva de costo no toca. Dato propietario, distribución y costo de cambio. La respuesta del studio es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construya un copiloto de IA para generar dato propietario, luego use ese dato para levantar y desplegar capital. El copiloto es barato gracias a la curva de costo. El dato es el moat que la curva de costo no puede erosionar."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo usa Avante la curva",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Trata la curva de costo como viento estructural a favor, no como tesis. La tesis es profundidad de operador combinada con dato propietario, ensambladas el día uno.",
            "En la mecánica, Avante lanza 3-4 ventures por año a través de un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Despliega US$ 500 mil a US$ 1,5 millones por venture en el pre-seed y conserva economía de co-founder. Como la curva de costo dirige cerca de US$ 300 mil a US$ 500 mil de capital efectivo a producto en lugar de overhead, un venture de studio lanza 6-9 meses por delante de un equipo independiente con financiamiento comparable.",
            "El benchmark detrás del modelo es la razón por la que el studio existe. La Global Startup Studio Network ubica el IRR de studio en cerca de ~50% frente a un ~19% estándar del sector para VC tradicional, cerca de 2,5x a lo largo de horizontes realistas. Ese es el benchmark del modelo de studio, no el retorno realizado de la propia Avante. Lea la tesis completa en [/why-avante](/why-avante) y análisis de mercado relacionados en [/library](/library).",
            "La curva de costo abarató el build para todos a la vez. Lo que no hizo fue entregarle a nadie operadores de dominio con más de 10 años de cicatriz en el mercado brasileño. Ese es el insumo que sigue escaso, y es el que Avante ensambla antes de la primera línea de código."
          ]
        }
      ]
    }
  },
  {
    "slug": "ai-native-without-series-a",
    "category": "ai",
    "type": "Playbook",
    "readTime": "9 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "How to Build an AI-Native Company Without Raising a Series A",
      "description": "AI inference is falling 10x a year, so you can launch lean. The moat is not the model. Here is what AI-native really means and where defensibility lives.",
      "sections": [
        {
          "paragraphs": [
            "An AI-native company is one where removing the model breaks the product. The model sits in the core loop, reads the input, decides the action, and produces the thing the customer pays for. That is a precise claim, and it is the only version of AI-native worth building, because the cost of running that model is collapsing by 10x a year.",
            "That collapse changes the financing question. The single biggest line item a software company used to raise a Series A to cover, model compute, now gets cheaper on its own faster than any fundraise could help. The hard part is no longer affording inference. It is owning something the inference touches. At Avante Ventures we build AI-native companies in Brazil and Latin America on exactly that bet. The model is a commodity. The loop around it is not.",
            "This piece defines AI-native in terms a skeptic would accept, shows the cost curve that changed the math, and locates where defensibility actually lives once the model itself is cheap for everyone."
          ]
        },
        {
          "id": "definition",
          "heading": "What AI-native actually means",
          "level": 2,
          "paragraphs": [
            "AI-native is a test, not a label. A company is AI-native when a model sits inside the core product loop and the product would not function without it. Contrast that with AI-bolted-on, where a chat box or a summarize button sits next to a product that worked fine before the model arrived and would keep working if you ripped it out.",
            "The skeptic's test is removal. Take the model out. If the product still does its primary job, the model was a feature. If the product stops working, the company is AI-native. A judicial-debt copilot that reads thousands of court filings and surfaces which claims are actually collectible is AI-native, because no human team prices that volume by hand. A CRM that added a summarize button is not.",
            "The reason this distinction earns its keep is the cost curve below. Cheap inference made the bolt-on version available to everyone. The bolt-on is not defensible. The loop is."
          ],
          "bullets": [
            "The model is in the decision loop, not the marketing copy. It produces the output the customer buys.",
            "Every customer interaction generates proprietary signal that improves the next output. That is the compounding loop.",
            "The cost structure assumes inference, not headcount. The unit economics break if you staff the work with people."
          ]
        },
        {
          "id": "cost-curve",
          "heading": "The cost curve changed the math",
          "level": 2,
          "paragraphs": [
            "For a model of equivalent performance, inference cost is falling by 10x a year. Andreessen Horowitz named this LLMflation and put a number on it: the cost of LLM inference has dropped by a factor of 1,000 in 3 years, per [a16z](https://a16z.com/llmflation-llm-inference-cost/).",
            "The concrete numbers are stark. In November 2021, hitting an MMLU score of 42 with GPT-3 cost about $60 per million tokens. By late 2024 an open model, Llama 3.2 3B, reached the same score for about $0.06 per million tokens, per [a16z](https://a16z.com/llmflation-llm-inference-cost/). For the higher GPT-4 capability tier, prices fell roughly 62x in under two years.",
            "Independent measurement confirms the trend and shows it speeding up. Epoch AI found the price to match GPT-4's performance on PhD-level science questions fell by 40x per year, with decline rates across benchmarks ranging from 9x to 900x per year and a median of 50x, per [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends). Looking only at data after January 2024, that median rose from 50x to 200x per year. The drops are not slowing. They are accelerating.",
            "The strategic read is direct. AI infrastructure is now cheap enough to deploy without a Series A. A capability that needed $5M to staff and serve in 2022 can be served in 2026 for a fraction of that, and the saved capital goes into product and traction instead of compute.",
            "One honest caveat. The cost to serve a fixed capability falls, but total spend often rises as usage scales and frontier models stay expensive. OpenAI's o1 launched at roughly the same $60 per million output tokens that GPT-3 cost at launch, per [a16z](https://a16z.com/llmflation-llm-inference-cost/). Cheap is the floor, not the ceiling. The lean play is to build on the rapidly cheapening commodity tier, not the frontier."
          ],
          "callout": {
            "kind": "stat",
            "text": "LLM inference cost is falling roughly 10x a year, down 1,000x in three years. The same MMLU 42 capability that cost $60 per million tokens with GPT-3 in November 2021 cost about $0.06 by late 2024.",
            "attribution": "a16z, Welcome to LLMflation"
          }
        },
        {
          "id": "moat",
          "heading": "Where the moat lives",
          "level": 2,
          "paragraphs": [
            "Models commoditize. That is what the cost curve forces. When any competitor can call the same model at the same falling price, the model cannot be the moat. Defensibility moves to what the model touches: proprietary data, data network effects, and workflow lock-in. As models become a commodity, durable advantage comes from proprietary information and embedded workflows rather than the model itself, per [McKinsey QuantumBlack](https://www.mckinsey.com/capabilities/quantumblack/our-insights).",
            "There is a live debate worth naming. Some investors argue proprietary data alone is not a moat and that distribution speed matters more, a tension captured by [Insignia Ventures](https://review.insignia.vc/2025/03/10/ai-moat/). The studio answer is that you do not pick one. You pair the data engine with an operator who already owns the distribution. More on that mechanism below at [/why-avante](/why-avante)."
          ]
        },
        {
          "id": "moat-data",
          "heading": "Proprietary data and network effects",
          "level": 3,
          "paragraphs": [
            "Proprietary data is a moat only when it compounds. A static dataset is a one-time advantage a well-funded competitor can buy or scrape. The durable version is the [data network effect](/library/data-network-effects-vertical-ai): every interaction generates proprietary signal that improves the product for the next user. The flywheel turns once the product is in production, doing real work the incumbent cannot observe.",
            "This is why the wedge matters more than the model. A copilot deployed inside a Brazilian judicial-debt workflow sees filings, outcomes, and recovery rates no general model and no competitor can access. That data is not bought. It is earned by being in the workflow. Think of the moat as a loop you maintain, not a warehouse you own."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power and workflow lock-in",
          "level": 3,
          "paragraphs": [
            "Process power is the second durable moat, and the one a domain operator builds faster than a generalist. When an AI-native product becomes the system of record for how a team actually does its job, the switching cost is the team's entire operating rhythm, not a data export. Hamilton Helmer's 7 Powers names this: an advantage embedded in how an organization works that a competitor cannot copy by watching from outside.",
            "Workflow lock-in compounds with the data moat. The deeper the product sits in the daily workflow, the more proprietary signal it captures, the better the output gets, the harder it is to rip out. That is the mechanism behind the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. The copilot earns the workflow. The workflow generates the data. The data funds the next stage."
          ],
          "callout": {
            "kind": "tip",
            "text": "If your product could be cloned by a competitor wrapping the same API, you have a feature, not a moat. Defensibility is the proprietary signal you capture by living inside a workflow no one else can see."
          }
        },
        {
          "id": "failure-modes",
          "heading": "The failure modes to avoid",
          "level": 2,
          "paragraphs": [
            "Cheap inference is a trap as easily as an advantage. Three failure modes catch lean AI-native ventures, and each has a specific fix."
          ],
          "bullets": [
            "Wrapper risk. A thin layer over a public model, with no proprietary data and no workflow depth, has no moat. When the provider ships the same feature natively, the wrapper has nothing left. The fix is to earn a workflow that generates data the model maker cannot see.",
            "Model-dependency risk. Betting the company on one provider's frontier model exposes it to price, policy, and availability shocks. The cost curve helps here. Because capable commodity-tier models now cost roughly 10x less each year per a16z, you can design for model portability instead.",
            "Data-without-distribution risk. Proprietary data with no path to users is a science project. This is the live counter-argument in the moat debate. A studio answers it by pairing the data engine with a domain operator who already owns the distribution."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante builds AI-native",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. The studio does not bet on a model. It builds the loop. Every venture is AI-native from day one, with a model in the core product loop and a copilot positioned to capture proprietary data inside a real workflow.",
            "The structural advantage is the studio model itself. Venture studios produce roughly ~50% IRR versus an industry-standard ~19% for traditional VC, per the Global Startup Studio Network, roughly 2.5x the IRR of traditional VC over realistic time horizons. That ~50% is the studio-model benchmark, not a track-record claim. The operating model is built for capital efficiency, which is exactly what the cost curve rewards. The full structure is covered in [How Operating-Partner Economics Work](/library/operating-partner-economics).",
            "Here is the part that mirrors LLMflation. Solving company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction rather than overhead. Do the expensive thing once, centrally, and let every venture launch lean. The same logic that drops inference cost 10x a year, applied to the company itself.",
            "The market backs the focus. Brazil-based startups raised $2.1B in 2025, up 10.5% from $1.9B in 2024, per [Crunchbase](https://news.crunchbase.com/venture/vcs-bullish-latam-startup-funding-rebounds-2025/). Services account for roughly 70% of Brazilian GDP, with low software penetration. The structural edge is domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled on day one. You can read the full thesis at [/why-avante](/why-avante). Cheap inference is the tailwind. It was never the company."
          ]
        }
      ]
    },
    "pt": {
      "title": "Como Construir uma Empresa AI-Native Sem Levantar uma Série A",
      "description": "A inferência de IA cai 10x ao ano e dá para lançar enxuto. O moat não é o modelo. O que AI-native significa de verdade e onde mora a defensibilidade.",
      "sections": [
        {
          "paragraphs": [
            "Uma empresa AI-native é aquela em que tirar o modelo quebra o produto. O modelo fica no loop central, lê a entrada, decide a ação e produz aquilo que o cliente paga para ter. Isso é uma afirmação precisa, e é a única versão de AI-native que vale a pena construir. Porque o custo de rodar esse modelo está caindo 10x ao ano.",
            "Essa queda muda a pergunta do fundraising. O maior item de custo que uma empresa de software levantava uma Série A para bancar, o compute do modelo, fica mais barato sozinho mais rápido do que qualquer rodada conseguiria ajudar. O difícil deixou de ser pagar a inferência. Passou a ser ter algo que a inferência toca. Na Avante Ventures construímos empresas AI-native no Brasil e na América Latina exatamente sobre essa aposta. O modelo é commodity. O loop em volta dele não é.",
            "Este texto define AI-native em termos que um cético aceitaria, mostra a curva de custo que mudou a conta e localiza onde mora a defensibilidade quando o próprio modelo já é barato para todo mundo."
          ]
        },
        {
          "id": "definition",
          "heading": "O que AI-native significa de verdade",
          "level": 2,
          "paragraphs": [
            "AI-native é um teste, não um rótulo. Uma empresa é AI-native quando um modelo está dentro do loop central do produto e o produto não funcionaria sem ele. Compare com a IA parafusada por cima, onde uma caixa de chat ou um botão de resumir fica do lado de um produto que já funcionava bem antes do modelo chegar e continuaria funcionando se você arrancasse o modelo fora.",
            "O teste do cético é a remoção. Tire o modelo. Se o produto ainda faz o trabalho principal dele, o modelo era um recurso. Se o produto para de funcionar, a empresa é AI-native. Um copilot de dívida judicial que lê milhares de petições e aponta quais precatórios são de fato recuperáveis é AI-native, porque nenhum time humano precifica esse volume na mão. Um CRM que ganhou um botão de resumo não é.",
            "Essa distinção se paga por causa da curva de custo logo abaixo. A inferência barata deixou a versão parafusada disponível para todo mundo. O parafuso não é defensável. O loop é."
          ],
          "bullets": [
            "O modelo está no loop de decisão, não na peça de marketing. Ele produz o resultado que o cliente compra.",
            "Cada interação do cliente gera sinal proprietário que melhora o próximo resultado. Esse é o loop que compõe.",
            "A estrutura de custo assume inferência, não headcount. A economia unitária quebra se você coloca gente para fazer o trabalho."
          ]
        },
        {
          "id": "cost-curve",
          "heading": "A curva de custo mudou a conta",
          "level": 2,
          "paragraphs": [
            "Para um modelo de desempenho equivalente, o custo de inferência cai 10x ao ano. A Andreessen Horowitz batizou isso de LLMflation e colocou um número: o custo de inferência de LLM caiu por um fator de 1.000 em 3 anos, segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/).",
            "Os números concretos são duros. Em novembro de 2021, atingir um MMLU de 42 com o GPT-3 custava cerca de $60 por milhão de tokens. No fim de 2024, um modelo aberto, o Llama 3.2 3B, alcançava o mesmo score por cerca de $0,06 por milhão de tokens, segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/). No nível de capacidade do GPT-4, os preços caíram cerca de 62x em menos de dois anos.",
            "Medição independente confirma a tendência e mostra ela acelerando. A Epoch AI achou que o preço para igualar o desempenho do GPT-4 em questões de ciência de nível PhD caiu 40x ao ano, com taxas de queda entre 9x e 900x por ano e mediana de 50x, segundo a [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends). Olhando só os dados depois de janeiro de 2024, essa mediana subiu de 50x para 200x ao ano. As quedas não estão desacelerando. Estão acelerando.",
            "A leitura estratégica é direta. A infraestrutura de IA já está barata o suficiente para implantar sem uma Série A. Uma capacidade que precisava de $5M para montar e servir em 2022 dá para servir em 2026 por uma fração disso. E o capital economizado vai para produto e tração em vez de compute.",
            "Uma ressalva honesta. O custo de servir uma capacidade fixa cai, mas o gasto total muitas vezes sobe conforme o uso escala e os modelos de fronteira seguem caros. O o1 da OpenAI lançou em torno dos mesmos $60 por milhão de tokens de saída que o GPT-3 custava no lançamento, segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/). Barato é o piso, não o teto. A jogada enxuta é construir sobre a camada commodity que barateia rápido, não sobre a fronteira."
          ],
          "callout": {
            "kind": "stat",
            "text": "O custo de inferência de LLM cai cerca de 10x ao ano, queda de 1.000x em três anos. A mesma capacidade MMLU 42 que custava $60 por milhão de tokens com o GPT-3 em novembro de 2021 custava cerca de $0,06 no fim de 2024.",
            "attribution": "a16z, Welcome to LLMflation"
          }
        },
        {
          "id": "moat",
          "heading": "Onde mora o moat",
          "level": 2,
          "paragraphs": [
            "Modelos viram commodity. É o que a curva de custo força. Quando qualquer concorrente chama o mesmo modelo pelo mesmo preço em queda, o modelo não pode ser o moat. A defensibilidade migra para o que o modelo toca: dado proprietário, efeitos de rede de dados e lock-in de workflow. À medida que os modelos viram commodity, a vantagem durável vem da informação proprietária e dos workflows embutidos, não do modelo em si, segundo a [McKinsey QuantumBlack](https://www.mckinsey.com/capabilities/quantumblack/our-insights).",
            "Vale nomear um debate em aberto. Alguns investidores argumentam que dado proprietário sozinho não é moat e que a velocidade de distribuição importa mais, uma tensão capturada pela [Insignia Ventures](https://review.insignia.vc/2025/03/10/ai-moat/). A resposta do studio é que você não escolhe um dos dois. Você junta o motor de dados a um operador que já tem a distribuição. Mais sobre esse mecanismo logo abaixo, em [/why-avante](/why-avante)."
          ]
        },
        {
          "id": "moat-data",
          "heading": "Dado proprietário e efeitos de rede",
          "level": 3,
          "paragraphs": [
            "Dado proprietário só é moat quando ele compõe. Uma base de dados estática é uma vantagem única que um concorrente bem capitalizado compra ou raspa. A versão durável é o [efeito de rede de dados](/library/data-network-effects-vertical-ai): cada interação gera sinal proprietário que melhora o produto para o próximo usuário. O flywheel gira quando o produto está em produção, fazendo trabalho real que o incumbente não consegue observar.",
            "É por isso que a cunha importa mais que o modelo. Um copilot rodando dentro de um workflow brasileiro de dívida judicial enxerga petições, desfechos e taxas de recuperação que nenhum modelo geral e nenhum concorrente acessam. Esse dado não é comprado. É conquistado por estar dentro do workflow. Pense no moat como um loop que você mantém, não um armazém que você possui."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power e lock-in de workflow",
          "level": 3,
          "paragraphs": [
            "Process power é o segundo moat durável, e o que um operador de domínio constrói mais rápido que um generalista. Quando um produto AI-native vira o sistema de registro de como um time realmente faz o trabalho, o custo de troca é o ritmo operacional inteiro do time, não um export de dados. O 7 Powers de Hamilton Helmer dá nome a isso: uma vantagem embutida no jeito como a organização trabalha, que o concorrente não copia só olhando de fora.",
            "O lock-in de workflow compõe com o moat de dados. Quanto mais fundo o produto fica no workflow diário, mais sinal proprietário ele captura, melhor fica o resultado, mais difícil é arrancar. Esse é o mecanismo por trás do [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construa um copilot de IA para gerar dado proprietário, depois use esse dado para levantar e implantar capital. O copilot conquista o workflow. O workflow gera o dado. O dado financia o próximo estágio."
          ],
          "callout": {
            "kind": "tip",
            "text": "Se o seu produto pode ser clonado por um concorrente que parafusa a mesma API, você tem um recurso, não um moat. Defensibilidade é o sinal proprietário que você captura por viver dentro de um workflow que ninguém mais enxerga."
          }
        },
        {
          "id": "failure-modes",
          "heading": "As falhas a evitar",
          "level": 2,
          "paragraphs": [
            "Inferência barata vira armadilha com a mesma facilidade que vira vantagem. Três falhas pegam ventures AI-native enxutos, e cada uma tem uma correção específica."
          ],
          "bullets": [
            "Risco de wrapper. Uma camada fina sobre um modelo público, sem dado proprietário e sem profundidade de workflow, não tem moat. Quando o provedor lança o mesmo recurso nativamente, o wrapper fica sem nada. A correção é conquistar um workflow que gera dado que o dono do modelo não enxerga.",
            "Risco de dependência de modelo. Apostar a empresa no modelo de fronteira de um único provedor expõe ela a choques de preço, política e disponibilidade. A curva de custo ajuda aqui. Como modelos capazes da camada commodity custam cerca de 10x menos a cada ano segundo a a16z, dá para projetar para portabilidade de modelo.",
            "Risco de dado sem distribuição. Dado proprietário sem caminho até o usuário é projeto de pesquisa. Esse é o contra-argumento vivo no debate de moat. Um studio responde juntando o motor de dados a um operador de domínio que já tem a distribuição."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante constrói AI-native",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. O studio não aposta num modelo. Ele constrói o loop. Cada venture nasce AI-native no dia um, com um modelo no loop central do produto e um copilot posicionado para capturar dado proprietário dentro de um workflow real.",
            "A vantagem estrutural é o próprio modelo de studio. Venture studios produzem cerca de ~50% IRR contra um padrão de mercado de ~19% para o VC tradicional, segundo a Global Startup Studio Network, cerca de 2,5x o IRR do VC tradicional em horizontes realistas. Esse ~50% é o benchmark do modelo de studio, não um retorno já realizado. O modelo operacional é feito para eficiência de capital, que é exatamente o que a curva de custo recompensa. A estrutura completa está em [Como Funcionam as Economias de Sócio Operador](/library/operating-partner-economics).",
            "Aqui está a parte que espelha o LLMflation. Resolver o encanamento da empresa uma vez roteia cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead. Faça a coisa cara uma vez, de forma central, e deixe cada venture lançar enxuto. A mesma lógica que derruba o custo de inferência 10x ao ano, aplicada à própria empresa.",
            "O mercado sustenta o foco. Startups brasileiras levantaram $2,1B em 2025, alta de 10,5% sobre os $1,9B de 2024, segundo o [Crunchbase](https://news.crunchbase.com/venture/vcs-bullish-latam-startup-funding-rebounds-2025/). Serviços respondem por cerca de 70% do PIB brasileiro, com baixa penetração de software. A vantagem estrutural são operadores de domínio com mais de 10 anos de calo de mercado brasileiro, somados a um playbook de Vale do Silício e capital de primeiro cheque, montados no dia um. Você pode ler a tese completa em [/why-avante](/why-avante). A inferência barata é o vento a favor. Ela nunca foi a empresa."
          ]
        }
      ]
    },
    "es": {
      "title": "Cómo Construir una Empresa AI-Native Sin Levantar una Serie A",
      "description": "La inferencia de IA cae 10x al año y puedes lanzar enjuto. El moat no es el modelo. Qué significa AI-native de verdad y dónde vive la defensibilidad.",
      "sections": [
        {
          "paragraphs": [
            "Una empresa AI-native es aquella en la que quitar el modelo rompe el producto. El modelo vive en el loop central, lee la entrada, decide la acción y produce aquello que el cliente paga por tener. Es una afirmación precisa, y es la única versión de AI-native que vale la pena construir. Porque el costo de correr ese modelo se desploma 10x al año.",
            "Esa caída cambia la pregunta del fundraising. El mayor rubro de costo que una empresa de software levantaba una Serie A para cubrir, el cómputo del modelo, se abarata solo más rápido de lo que cualquier ronda podría ayudar. Lo difícil dejó de ser pagar la inferencia. Pasó a ser tener algo que la inferencia toca. En Avante Ventures construimos empresas AI-native en Brasil y América Latina justo sobre esa apuesta. El modelo es commodity. El loop alrededor no lo es.",
            "Este texto define AI-native en términos que un escéptico aceptaría, muestra la curva de costo que cambió la cuenta y ubica dónde vive la defensibilidad cuando el modelo mismo ya es barato para todos."
          ]
        },
        {
          "id": "definition",
          "heading": "Qué significa AI-native de verdad",
          "level": 2,
          "paragraphs": [
            "AI-native es una prueba, no una etiqueta. Una empresa es AI-native cuando un modelo vive dentro del loop central del producto y el producto no funcionaría sin él. Compárelo con la IA atornillada por encima, donde una caja de chat o un botón de resumir convive con un producto que ya funcionaba bien antes de que llegara el modelo y seguiría funcionando si usted arrancara el modelo de raíz.",
            "La prueba del escéptico es la remoción. Quite el modelo. Si el producto sigue haciendo su trabajo principal, el modelo era una función. Si el producto deja de funcionar, la empresa es AI-native. Un copilot de deuda judicial que lee miles de expedientes y señala cuáles reclamaciones son de hecho cobrables es AI-native, porque ningún equipo humano cotiza ese volumen a mano. Un CRM que añadió un botón de resumen no lo es.",
            "Esta distinción se gana su lugar por la curva de costo de abajo. La inferencia barata dejó la versión atornillada al alcance de todos. El tornillo no es defendible. El loop sí."
          ],
          "bullets": [
            "El modelo está en el loop de decisión, no en la pieza de marketing. Produce el resultado que el cliente compra.",
            "Cada interacción del cliente genera señal propietaria que mejora el siguiente resultado. Ese es el loop que compone.",
            "La estructura de costo asume inferencia, no headcount. La economía unitaria se rompe si pone gente a hacer el trabajo."
          ]
        },
        {
          "id": "cost-curve",
          "heading": "La curva de costo cambió la cuenta",
          "level": 2,
          "paragraphs": [
            "Para un modelo de desempeño equivalente, el costo de inferencia cae 10x al año. Andreessen Horowitz bautizó esto como LLMflation y le puso un número: el costo de inferencia de LLM cayó por un factor de 1.000 en 3 años, según [a16z](https://a16z.com/llmflation-llm-inference-cost/).",
            "Los números concretos son duros. En noviembre de 2021, alcanzar un MMLU de 42 con GPT-3 costaba cerca de $60 por millón de tokens. Para finales de 2024, un modelo abierto, Llama 3.2 3B, llegaba al mismo score por cerca de $0,06 por millón de tokens, según [a16z](https://a16z.com/llmflation-llm-inference-cost/). En el nivel de capacidad de GPT-4, los precios cayeron cerca de 62x en menos de dos años.",
            "La medición independiente confirma la tendencia y la muestra acelerando. Epoch AI halló que el precio para igualar el desempeño de GPT-4 en preguntas de ciencia de nivel doctoral cayó 40x al año, con tasas de caída entre 9x y 900x por año y mediana de 50x, según [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends). Mirando solo los datos posteriores a enero de 2024, esa mediana subió de 50x a 200x al año. Las caídas no se desaceleran. Se aceleran.",
            "La lectura estratégica es directa. La infraestructura de IA ya está barata para desplegar sin una Serie A. Una capacidad que necesitaba $5M para montar y servir en 2022 se puede servir en 2026 por una fracción de eso. Y el capital ahorrado va a producto y tracción en vez de a cómputo.",
            "Una salvedad honesta. El costo de servir una capacidad fija cae, pero el gasto total a menudo sube conforme el uso escala y los modelos de frontera siguen caros. El o1 de OpenAI lanzó en torno a los mismos $60 por millón de tokens de salida que costaba GPT-3 en su lanzamiento, según [a16z](https://a16z.com/llmflation-llm-inference-cost/). Barato es el piso, no el techo. La jugada enjuta es construir sobre la capa commodity que se abarata rápido, no sobre la frontera."
          ],
          "callout": {
            "kind": "stat",
            "text": "El costo de inferencia de LLM cae cerca de 10x al año, una caída de 1.000x en tres años. La misma capacidad MMLU 42 que costaba $60 por millón de tokens con GPT-3 en noviembre de 2021 costaba cerca de $0,06 a finales de 2024.",
            "attribution": "a16z, Welcome to LLMflation"
          }
        },
        {
          "id": "moat",
          "heading": "Dónde vive el moat",
          "level": 2,
          "paragraphs": [
            "Los modelos se vuelven commodity. Es lo que fuerza la curva de costo. Cuando cualquier competidor llama al mismo modelo por el mismo precio en caída, el modelo no puede ser el moat. La defensibilidad migra a lo que el modelo toca: dato propietario, efectos de red de datos y lock-in de workflow. A medida que los modelos se vuelven commodity, la ventaja durable viene de la información propietaria y los workflows embebidos, no del modelo en sí, según [McKinsey QuantumBlack](https://www.mckinsey.com/capabilities/quantumblack/our-insights).",
            "Vale nombrar un debate abierto. Algunos inversionistas argumentan que el dato propietario por sí solo no es moat y que la velocidad de distribución importa más, una tensión capturada por [Insignia Ventures](https://review.insignia.vc/2025/03/10/ai-moat/). La respuesta del studio es que usted no elige uno. Junta el motor de datos con un operador que ya tiene la distribución. Más sobre ese mecanismo justo abajo, en [/why-avante](/why-avante)."
          ]
        },
        {
          "id": "moat-data",
          "heading": "Dato propietario y efectos de red",
          "level": 3,
          "paragraphs": [
            "El dato propietario solo es moat cuando compone. Una base de datos estática es una ventaja única que un competidor bien capitalizado compra o raspa. La versión durable es el [efecto de red de datos](/library/data-network-effects-vertical-ai): cada interacción genera señal propietaria que mejora el producto para el siguiente usuario. El flywheel gira cuando el producto está en producción, haciendo trabajo real que el incumbente no puede observar.",
            "Por eso la cuña importa más que el modelo. Un copilot corriendo dentro de un workflow de deuda judicial brasileño ve expedientes, resultados y tasas de recuperación que ningún modelo general y ningún competidor acceden. Ese dato no se compra. Se gana por estar dentro del workflow. Piense en el moat como un loop que usted mantiene, no una bodega que usted posee."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power y lock-in de workflow",
          "level": 3,
          "paragraphs": [
            "El process power es el segundo moat durable, y el que un operador de dominio construye más rápido que un generalista. Cuando un producto AI-native se vuelve el sistema de registro de cómo un equipo hace realmente su trabajo, el costo de cambio es el ritmo operativo entero del equipo, no un export de datos. El 7 Powers de Hamilton Helmer le da nombre: una ventaja embebida en la forma en que la organización trabaja, que el competidor no copia con solo mirar desde afuera.",
            "El lock-in de workflow compone con el moat de datos. Mientras más profundo vive el producto en el workflow diario, más señal propietaria captura, mejor se vuelve el resultado, más difícil es arrancarlo. Ese es el mecanismo detrás del [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construya un copilot de IA para generar dato propietario, luego use ese dato para levantar y desplegar capital. El copilot se gana el workflow. El workflow genera el dato. El dato financia la siguiente etapa."
          ],
          "callout": {
            "kind": "tip",
            "text": "Si su producto puede ser clonado por un competidor que atornilla la misma API, usted tiene una función, no un moat. La defensibilidad es la señal propietaria que usted captura por vivir dentro de un workflow que nadie más ve."
          }
        },
        {
          "id": "failure-modes",
          "heading": "Las fallas a evitar",
          "level": 2,
          "paragraphs": [
            "La inferencia barata se vuelve trampa con la misma facilidad que ventaja. Tres fallas atrapan a los ventures AI-native enjutos, y cada una tiene una corrección específica."
          ],
          "bullets": [
            "Riesgo de wrapper. Una capa delgada sobre un modelo público, sin dato propietario y sin profundidad de workflow, no tiene moat. Cuando el proveedor lanza la misma función de forma nativa, el wrapper se queda sin nada. La corrección es ganarse un workflow que genere dato que el dueño del modelo no ve.",
            "Riesgo de dependencia de modelo. Apostar la empresa al modelo de frontera de un solo proveedor la expone a choques de precio, política y disponibilidad. La curva de costo ayuda aquí. Como los modelos capaces de la capa commodity cuestan cerca de 10x menos cada año según a16z, se puede diseñar para portabilidad de modelo.",
            "Riesgo de dato sin distribución. Dato propietario sin camino al usuario es un proyecto de investigación. Ese es el contraargumento vivo en el debate del moat. Un studio responde juntando el motor de datos con un operador de dominio que ya tiene la distribución."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo construye Avante AI-native",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. El studio no apuesta a un modelo. Construye el loop. Cada venture nace AI-native el día uno, con un modelo en el loop central del producto y un copilot posicionado para capturar dato propietario dentro de un workflow real.",
            "La ventaja estructural es el modelo de studio mismo. Los venture studios producen cerca de ~50% IRR contra un estándar de industria de ~19% para el VC tradicional, según la Global Startup Studio Network, cerca de 2,5x el IRR del VC tradicional en horizontes realistas. Ese ~50% es el benchmark del modelo de studio, no un retorno ya realizado. El modelo operativo está hecho para eficiencia de capital, que es exactamente lo que la curva de costo recompensa. La estructura completa está en [Cómo Funcionan las Economías de Socio Operador](/library/operating-partner-economics).",
            "Aquí está la parte que refleja el LLMflation. Resolver la plomería de la empresa una vez enruta cerca de $300K-500K de capital efectivo por venture hacia producto y tracción en vez de overhead. Haga la cosa cara una vez, de forma central, y deje que cada venture lance enjuto. La misma lógica que tira el costo de inferencia 10x al año, aplicada a la empresa misma.",
            "El mercado respalda el foco. Las startups brasileñas levantaron $2,1B en 2025, un alza de 10,5% sobre los $1,9B de 2024, según [Crunchbase](https://news.crunchbase.com/venture/vcs-bullish-latam-startup-funding-rebounds-2025/). Los servicios representan cerca del 70% del PIB brasileño, con baja penetración de software. La ventaja estructural son operadores de dominio con más de 10 años de cicatrices del mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque, montados el día uno. Puede leer la tesis completa en [/why-avante](/why-avante). La inferencia barata es el viento a favor. Nunca fue la empresa."
          ]
        }
      ]
    }
  },
  {
    "slug": "ai-wrapper-trap-defensible-ai-native",
    "category": "ai",
    "type": "Playbook",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/ai-wrapper-trap-defensible-ai-native.png",
    "isPublished": true,
    "en": {
      "title": "The Wrapper Trap: When AI-Native Is Actually Defensible",
      "description": "A system prompt is not an AI wrapper moat. But a wrapper is not doomed either. Here is the line between thin and thick, and how the data flywheel crosses it.",
      "sections": [
        {
          "paragraphs": [
            "A system prompt over a foundation-model API is not a moat, and in February 2026 a Google VP put a date on the death of the thin wrapper. The question is no longer whether AI wrappers are defensible in the abstract. It is whether yours owns anything the next model release cannot erase.",
            "Here is the honest version, because the skeptic is mostly right. A wrapper is not doomed by being a wrapper. It is doomed by being thin. AI-native defensibility comes from owning at least one compounding asset a competitor with the same model and more money cannot copy by next quarter. At Avante Ventures we build for that asset from day one, because the model itself is no longer something you can own."
          ]
        },
        {
          "id": "the-critique",
          "heading": "The thin-wrapper critique is correct",
          "level": 2,
          "paragraphs": [
            "The people who sell the models now say the quiet part out loud. On February 21, 2026, [TechCrunch reported](https://techcrunch.com/2026/02/21/google-vp-warns-that-two-types-of-ai-startups-may-not-survive/) that Darren Mowry, the VP running Google's global startup organization across Cloud, DeepMind, and Alphabet, warned that two kinds of AI startups may not survive. The first is the thin wrapper.",
            "His words are worth quoting exactly. If you are counting on the back-end model to do all the work and you are almost white-labeling that model, the industry does not have a lot of patience for that anymore. Wrapping very thin intellectual property around Gemini or GPT-5 is the trap. The prescription was a phrase worth keeping. Startups need deep, wide moats. His second doomed category was the aggregator, because users want intellectual property built in, not a routing layer the model providers will absorb into their own enterprise features.",
            "The economics behind the warning are margin compression rolling downhill. [TechCrunch reported in September 2025](https://techcrunch.com/2025/09/14/selling-coffee-beans-to-starbucks-how-the-ai-boom-could-leave-ais-biggest-companies-behind/) that application teams now treat foundation models as a commodity to swap in and out at will. That feels like leverage until you notice every competitor can swap in the same commodity. One founder called the endgame for undifferentiated players like selling coffee beans to Starbucks. Essential to the cup, paid almost nothing for it."
          ],
          "callout": {
            "kind": "quote",
            "text": "If you're really just counting on the back-end model to do all the work and you're almost white-labeling that model, the industry doesn't have a lot of patience for that anymore.",
            "attribution": "Darren Mowry, VP, Google global startup organization, TechCrunch, February 2026"
          }
        },
        {
          "id": "thin-vs-thick",
          "heading": "Thin versus thick, defined",
          "level": 2,
          "paragraphs": [
            "Thinness has nothing to do with how much code you wrote. It is about what compounds while you sleep. A thick venture owns at least one asset that gets stronger with use and that a well-funded rival cannot rebuild by copying your interface. Everything else is decoration on a rented engine.",
            "Start with why the engine cannot be the moat. Inference is deflating faster than almost any technology in history, a curve we trace for the region in [the AI infrastructure cost curve](/library/ai-infrastructure-cost-curve-latam). According to [a16z](https://a16z.com/llmflation-llm-inference-cost/), for an LLM of equivalent performance the cost is dropping 10x every year, a factor of 1,000 in three years. GPT-3-level quality went from about $60 per million tokens in late 2021 to roughly $0.06 by late 2024. A capability that gets 10x cheaper every year, available to everyone from multiple vendors, is a utility. You do not build a moat on a utility. You build it on what the utility is bolted to."
          ],
          "callout": {
            "kind": "stat",
            "text": "For an LLM of equivalent performance, inference cost is falling 10x every year, a factor of 1,000 in three years. GPT-3-level quality dropped from about $60 per million tokens to roughly $0.06.",
            "attribution": "a16z, Welcome to LLMflation, November 2024"
          }
        },
        {
          "id": "the-three-moats",
          "heading": "The three sources of thickness",
          "level": 3,
          "paragraphs": [
            "Durable defensibility lives in three places, listed in ascending order of strength. Each one carries a failure test, and most founders quietly fail it.",
            "The reason network effects matter most is the math. NFX, in its [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), credits network effects with roughly 70% of the value created by technology companies since 1994, and rates them the strongest of the four real defensibilities. A proprietary data flywheel is how an AI-native venture builds one, instead of merely claiming it has one."
          ],
          "bullets": [
            "Proprietary data flywheel. A stock of data is not a moat, a flow is, which is the heart of [how data network effects work in vertical AI](/library/data-network-effects-vertical-ai). a16z's The Empty Promise of Data Moats shows there is generally no inherent network effect from merely holding more data, and that in a support-chatbot example past roughly 40% query coverage there is no advantage to collecting more. The moat is a loop where each use produces data that measurably improves the product faster than the pile decays.",
            "Domain-specific evaluations. The hardest asset to copy is a graded definition of what correct means in a regulated, judgment-heavy domain. A general model can draft a clause or price a risk. Knowing which output is right, wrong, or quietly dangerous in a specific Brazilian legal or insurance context is encoded judgment that took operators years to earn. The model vendor cannot ship your evals for you.",
            "Workflow lock-in. Hamilton Helmer's 7 Powers calls this Process Power and Switching Costs. Once an AI product becomes the system of record for a regulated process, leaving means re-validating a compliance trail, retraining staff, and re-integrating adjacent systems. The cost of leaving is the moat. This is why vertical AI beats horizontal. A general assistant has no workflow to anchor."
          ]
        },
        {
          "id": "flywheel-crosses",
          "heading": "How the flywheel crosses the line",
          "level": 2,
          "paragraphs": [
            "The flywheel is the machine that turns a thin entry wedge into a thick position over time. This is the copilot to data to fund flywheel. Ship an AI copilot that does real work inside one vertical. The work generates proprietary data no one else is sitting on. That data sharpens domain evaluations and improves the product, which deepens workflow lock-in, which produces more data. The copilot is the thin-looking wedge on day one. The loop is what makes it thick by year two.",
            "The 2025 evidence that this is the real dividing line comes from emerging markets, not Silicon Valley. According to [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), AI has made building easier and defending exponentially harder, with software reaching $1 million ARR faster than ever before. Their case studies land on these exact mechanisms. A used-car platform compounds a data flywheel from 160-plus data points per vehicle. A lender that pairs a proprietary ERP with financing held a 3% non-performing-loan rate through COVID while the broader fintech industry ran 20 to 30%. Every one of them rented the same model. None of them rented the flywheel."
          ]
        },
        {
          "id": "the-self-deception",
          "heading": "The story founders tell that is not true",
          "level": 2,
          "paragraphs": [
            "The most common pitch in AI is a thick-moat story narrated over a thin product. Founders describe a data network effect they have not built, a flywheel that has not reached escape velocity, and a defensibility that lives entirely in the future tense. The honest failure mode has two parts, and they feed each other.",
            "First, the data loop starves because the company has no distribution. A feedback loop only compounds if enough users feed it. Without a channel to acquire and keep them, a better-distributed competitor with a worse dataset wins, because their worse dataset is growing while yours sits still. Second, proprietary data with no way to keep collecting it is not a moat, it is a stock that decays. A dataset frozen at launch gets lapped by a product that improves with every use.",
            "The swap test is the discipline that cuts through the story. If you replaced your model vendor tomorrow and your defensibility did not change, the model was never your moat. Find the loop or the workflow that survives the swap before a model release finds it for you."
          ],
          "callout": {
            "kind": "tip",
            "text": "Run the swap test on your own venture. Replace your model vendor in your head. If your defensibility is unchanged, the model was never the moat, and the data flywheel you are describing is still a promise, not an asset."
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante builds thick from day one",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, engineered to start thick rather than hope to grow thick later. The method is the copilot to data to fund flywheel run through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. Each venture is paired on day one with a domain operator carrying 10-plus years of Brazilian-market scar tissue, which is where the proprietary evaluations come from, and with $500K-1.5M of first-ticket capital, which buys the distribution that keeps the data loop fed. Because inference is cheap, that first ticket is often enough to [reach revenue without a Series A](/library/ai-native-without-series-a). The full thesis is at [/why-avante](/why-avante).",
            "Brazil makes the math work. Services account for roughly 70% of Brazilian GDP per IBGE, the largest piece of the economy and long under-served by software, which is the exact surface where a vertical AI product can become the system of record. The portfolio shows the pattern by domain. Judicial assets, where the workflow data around precatorios and claims is genuinely proprietary. Insurance pricing, where risk-scoring accuracy feeds a usage loop. Real estate auction intelligence, where enriched and scored auction data compounds. In each one the model is the rented engine and the moat is the domain data flow bolted to it.",
            "Studio-model returns are why we build this way at all, with GSSN data showing studio IRR of roughly 50% versus roughly 19% for traditional VC, about 2.5x, a benchmark for the model rather than a claim on any single fund's realized return. The wrapper critique is correct. That is exactly why a venture should be built so the next model release is a tailwind, not an obituary. See how we operate in [/principles](/principles)."
          ]
        }
      ]
    },
    "pt": {
      "title": "A Armadilha do Wrapper: Quando AI-Native É de Fato Defensável",
      "description": "Um prompt de sistema não é um moat de wrapper de IA. Mas o wrapper não está condenado. Veja a linha entre fino e espesso, e como o flywheel de dados a cruza.",
      "sections": [
        {
          "paragraphs": [
            "Um prompt de sistema sobre uma API de modelo de fundação não é um moat, e em fevereiro de 2026 um VP do Google colocou data na morte do wrapper fino. A pergunta deixou de ser se wrappers de IA são defensáveis no abstrato. É se o seu é dono de algo que o próximo lançamento de modelo não consegue apagar.",
            "A versão honesta, porque o cético está quase sempre certo. Um wrapper não está condenado por ser wrapper. Está condenado por ser fino. A defensabilidade AI-native vem de ser dono de pelo menos um ativo que compõe e que um concorrente com o mesmo modelo e mais dinheiro não consegue copiar até o próximo trimestre. Na Avante Ventures construímos para esse ativo desde o dia um, porque o modelo em si já não é algo que se possa possuir."
          ]
        },
        {
          "id": "the-critique",
          "heading": "A crítica ao wrapper fino está certa",
          "level": 2,
          "paragraphs": [
            "Quem vende os modelos agora diz em voz alta a parte que ficava no sussurro. Em 21 de fevereiro de 2026, o [TechCrunch noticiou](https://techcrunch.com/2026/02/21/google-vp-warns-that-two-types-of-ai-startups-may-not-survive/) que Darren Mowry, o VP que lidera a organização global de startups do Google em Cloud, DeepMind e Alphabet, alertou que dois tipos de startup de IA podem não sobreviver. O primeiro é o wrapper fino.",
            "Vale citar as palavras dele com precisão. Se você está contando com o modelo de back-end para fazer todo o trabalho e está praticamente fazendo white-label desse modelo, a indústria não tem mais muita paciência para isso. Envolver propriedade intelectual muito fina ao redor de Gemini ou GPT-5 é a armadilha. A receita foi uma frase que vale guardar. Startups precisam de moats profundos e largos. A segunda categoria condenada foi o agregador, porque os usuários querem propriedade intelectual embutida, não uma camada de roteamento que os provedores de modelo vão absorver nos próprios recursos corporativos.",
            "A economia por trás do alerta é a compressão de margem descendo a encosta. O [TechCrunch noticiou em setembro de 2025](https://techcrunch.com/2025/09/14/selling-coffee-beans-to-starbucks-how-the-ai-boom-could-leave-ais-biggest-companies-behind/) que equipes de aplicação agora tratam modelos de fundação como uma commodity para trocar de fornecedor à vontade. Parece alavancagem, até você perceber que todo concorrente troca pela mesma commodity. Um fundador descreveu o desfecho para os indiferenciados como vender grãos de café para a Starbucks. Essencial para a xícara, pago quase nada por isso."
          ],
          "callout": {
            "kind": "quote",
            "text": "Se você está contando com o modelo de back-end para fazer todo o trabalho e está praticamente fazendo white-label desse modelo, a indústria não tem mais muita paciência para isso.",
            "attribution": "Darren Mowry, VP da organização global de startups do Google, TechCrunch, fevereiro de 2026"
          }
        },
        {
          "id": "thin-vs-thick",
          "heading": "Fino versus espesso, definido",
          "level": 2,
          "paragraphs": [
            "Espessura não tem nada a ver com quanto código você escreveu. Tem a ver com o que compõe enquanto você dorme. Uma venture espessa é dona de pelo menos um ativo que fica mais forte com o uso e que um rival bem financiado não reconstrói copiando a sua interface. Todo o resto é enfeite sobre um motor alugado.",
            "Comece pelo motivo de o motor não poder ser o moat. A inferência está desinflando mais rápido do que quase qualquer tecnologia da história, uma curva que mapeamos para a região em [a curva de custo da infraestrutura de IA](/library/ai-infrastructure-cost-curve-latam). Segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/), para um LLM de desempenho equivalente o custo cai 10x a cada ano, um fator de 1.000 em três anos. A qualidade nível GPT-3 saiu de cerca de US$ 60 por milhão de tokens no fim de 2021 para por volta de US$ 0,06 no fim de 2024. Uma capacidade que fica 10x mais barata por ano, disponível para todos a partir de vários fornecedores, é uma utilidade. Você não constrói moat sobre uma utilidade. Constrói sobre aquilo a que a utilidade está presa."
          ],
          "callout": {
            "kind": "stat",
            "text": "Para um LLM de desempenho equivalente, o custo de inferência cai 10x a cada ano, um fator de 1.000 em três anos. A qualidade nível GPT-3 caiu de cerca de US$ 60 por milhão de tokens para por volta de US$ 0,06.",
            "attribution": "a16z, Welcome to LLMflation, novembro de 2024"
          }
        },
        {
          "id": "the-three-moats",
          "heading": "As três fontes de espessura",
          "level": 3,
          "paragraphs": [
            "A defensabilidade durável mora em três lugares, em ordem crescente de força. Cada um carrega um teste de falha, e a maioria dos fundadores falha nele em silêncio.",
            "O motivo de os efeitos de rede importarem mais é a matemática. A NFX, no seu [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), credita aos efeitos de rede cerca de 70% do valor criado por empresas de tecnologia desde 1994, e os classifica como a mais forte das quatro defensabilidades reais. Um flywheel de dados proprietário é como uma venture AI-native constrói um, em vez de apenas alegar que tem."
          ],
          "bullets": [
            "Flywheel de dados proprietário. Um estoque de dados não é moat, um fluxo é, que é o coração de [como os efeitos de rede de dados funcionam na IA vertical](/library/data-network-effects-vertical-ai). O texto da a16z, The Empty Promise of Data Moats, mostra que em geral não existe efeito de rede inerente em apenas ter mais dado, e que no exemplo de um chatbot de suporte, passados cerca de 40% de cobertura das perguntas, não há vantagem em coletar mais. O moat é um loop em que cada uso produz dado que melhora o produto de forma mensurável mais rápido do que a pilha decai.",
            "Avaliações específicas de domínio. O ativo mais difícil de copiar é uma definição graduada do que significa correto em um domínio regulado e denso em julgamento. Um modelo genérico redige uma cláusula ou precifica um risco. Saber qual resultado está certo, errado ou silenciosamente perigoso em um contexto jurídico ou de seguros brasileiro é julgamento codificado que operadores levaram anos para conquistar. O fornecedor do modelo não entrega as suas avaliações por você.",
            "Lock-in de workflow. O 7 Powers de Hamilton Helmer chama isso de Process Power e Switching Costs. Quando um produto de IA vira o sistema de registro de um processo regulado, sair significa revalidar uma trilha de compliance, retreinar a equipe e reintegrar sistemas adjacentes. O custo de sair é o moat. É por isso que a IA vertical vence a horizontal. Um assistente genérico não tem workflow para ancorar."
          ]
        },
        {
          "id": "flywheel-crosses",
          "heading": "Como o flywheel cruza a linha",
          "level": 2,
          "paragraphs": [
            "O flywheel é a máquina que transforma uma cunha de entrada fina em uma posição espessa ao longo do tempo. Este é o flywheel copilot, dado, capital. Lance um copilot de IA que faz trabalho real dentro de uma vertical. O trabalho gera dado proprietário que ninguém mais tem. Esse dado afia as avaliações de domínio e melhora o produto, o que aprofunda o lock-in de workflow, o que produz mais dado. O copilot é a cunha de aparência fina no dia um. O loop é o que o torna espesso até o segundo ano.",
            "A evidência de 2025 de que essa é a verdadeira linha divisória vem de mercados emergentes, não do Vale do Silício. Segundo a [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), a IA tornou o construir mais fácil e o defender exponencialmente mais difícil, com software chegando a US$ 1 milhão de ARR mais rápido do que nunca. Os estudos de caso deles caem exatamente nesses mecanismos. Uma plataforma de carros usados compõe um flywheel de dados a partir de mais de 160 pontos de dado por veículo. Um credor que combina um ERP proprietário com financiamento segurou 3% de inadimplência durante a COVID enquanto o setor de fintech mais amplo rodava de 20 a 30%. Todos eles alugaram o mesmo modelo. Nenhum deles alugou o flywheel."
          ]
        },
        {
          "id": "the-self-deception",
          "heading": "A história que fundadores contam e não é verdade",
          "level": 2,
          "paragraphs": [
            "O pitch mais comum em IA é uma história de moat espesso narrada sobre um produto fino. Fundadores descrevem um efeito de rede de dados que não construíram, um flywheel que não atingiu velocidade de escape e uma defensabilidade que vive inteiramente no tempo futuro. O modo de falha honesto tem duas partes, e elas se alimentam.",
            "Primeiro, o loop de dados passa fome porque a empresa não tem distribuição. Um loop de feedback só compõe se usuários suficientes o alimentarem. Sem um canal para adquirir e reter esses usuários, um concorrente mais bem distribuído com um dataset pior vence, porque o dataset pior dele está crescendo enquanto o seu fica parado. Segundo, dado proprietário sem como continuar coletando não é moat, é um estoque que decai. Um dataset congelado no lançamento é ultrapassado por um produto que melhora a cada uso.",
            "O teste da troca é a disciplina que corta a história ao meio. Se você trocasse de fornecedor de modelo amanhã e a sua defensabilidade não mudasse, o modelo nunca foi o seu moat. Ache o loop ou o workflow que sobrevive à troca antes que um lançamento de modelo o ache por você."
          ],
          "callout": {
            "kind": "tip",
            "text": "Rode o teste da troca na sua própria venture. Troque de fornecedor de modelo na cabeça. Se a sua defensabilidade não muda, o modelo nunca foi o moat, e o flywheel de dados que você descreve ainda é promessa, não ativo."
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante constrói espesso desde o dia um",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, projetada para começar espessa em vez de torcer para engrossar depois. O método é o flywheel copilot, dado, capital rodando dentro de um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. Cada venture é pareada no dia um com um operador de domínio que carrega mais de 10 anos de cicatriz de mercado brasileiro, de onde vêm as avaliações proprietárias, e com US$ 500K-1.5M de capital de primeiro cheque, que compra a distribuição que mantém o loop de dados alimentado. Como a inferência é barata, esse primeiro cheque muitas vezes basta para [chegar à receita sem uma Série A](/library/ai-native-without-series-a). A tese completa está em [/why-avante](/why-avante).",
            "O Brasil faz a conta fechar. Serviços respondem por cerca de 70% do PIB brasileiro, segundo o IBGE a maior fatia da economia e por muito tempo mal atendida por software, que é exatamente a superfície onde um produto de IA vertical pode virar o sistema de registro. O portfólio mostra o padrão por domínio. Ativos judiciais, onde o dado de workflow em torno de precatórios e claims é genuinamente proprietário. Precificação de seguros, onde a precisão do scoring de risco alimenta um loop de uso. Inteligência de leilões imobiliários, onde dados de leilão enriquecidos e pontuados se compõem. Em cada um deles o modelo é o motor alugado e o moat é o fluxo de dado de domínio preso a ele.",
            "Os retornos do modelo de studio são o motivo de construirmos assim, com dados da GSSN mostrando IRR de studio de cerca de 50% contra cerca de 19% do VC tradicional, aproximadamente 2.5x, um benchmark do modelo e não uma afirmação sobre o retorno realizado de qualquer fundo específico. A crítica ao wrapper está certa. É justamente por isso que uma venture deve ser construída para que o próximo lançamento de modelo seja vento a favor, não um obituário. Veja como operamos em [/principles](/principles)."
          ]
        }
      ]
    },
    "es": {
      "title": "La Trampa del Wrapper: Cuando AI-Native Es Realmente Defendible",
      "description": "Un prompt de sistema no es un moat de wrapper de IA. Pero el wrapper tampoco está condenado. La línea entre fino y grueso, y cómo el flywheel la cruza.",
      "sections": [
        {
          "paragraphs": [
            "Un prompt de sistema sobre una API de modelo de fundación no es un moat, y en febrero de 2026 un VP de Google le puso fecha a la muerte del wrapper fino. La pregunta ya no es si los wrappers de IA son defendibles en abstracto. Es si el suyo es dueño de algo que el próximo lanzamiento de modelo no pueda borrar.",
            "La versión honesta, porque el escéptico casi siempre tiene razón. Un wrapper no está condenado por ser wrapper. Está condenado por ser fino. La defensibilidad AI-native viene de ser dueño de al menos un activo que compone y que un competidor con el mismo modelo y más dinero no pueda copiar para el próximo trimestre. En Avante Ventures construimos para ese activo desde el día uno, porque el modelo en sí ya no es algo que se pueda poseer."
          ]
        },
        {
          "id": "the-critique",
          "heading": "La crítica al wrapper fino es correcta",
          "level": 2,
          "paragraphs": [
            "Quienes venden los modelos ahora dicen en voz alta la parte que quedaba en susurro. El 21 de febrero de 2026, [TechCrunch reportó](https://techcrunch.com/2026/02/21/google-vp-warns-that-two-types-of-ai-startups-may-not-survive/) que Darren Mowry, el VP que lidera la organización global de startups de Google en Cloud, DeepMind y Alphabet, advirtió que dos tipos de startup de IA podrían no sobrevivir. El primero es el wrapper fino.",
            "Vale citar sus palabras con precisión. Si usted está contando con el modelo de back-end para hacer todo el trabajo y está prácticamente haciendo white-label de ese modelo, la industria ya no tiene mucha paciencia para eso. Envolver propiedad intelectual muy fina alrededor de Gemini o GPT-5 es la trampa. La receta fue una frase que vale guardar. Las startups necesitan moats profundos y anchos. La segunda categoría condenada fue el agregador, porque los usuarios quieren propiedad intelectual incorporada, no una capa de ruteo que los proveedores de modelo van a absorber en sus propios productos corporativos.",
            "La economía detrás de la advertencia es la compresión de margen rodando cuesta abajo. [TechCrunch reportó en septiembre de 2025](https://techcrunch.com/2025/09/14/selling-coffee-beans-to-starbucks-how-the-ai-boom-could-leave-ais-biggest-companies-behind/) que los equipos de aplicación ahora tratan los modelos de fundación como un commodity para cambiar de proveedor a voluntad. Parece apalancamiento, hasta que usted nota que todo competidor cambia por el mismo commodity. Un fundador describió el desenlace para los indiferenciados como vender granos de café a Starbucks. Esencial para la taza, le pagaron casi nada por ello."
          ],
          "callout": {
            "kind": "quote",
            "text": "Si usted está contando con el modelo de back-end para hacer todo el trabajo y está prácticamente haciendo white-label de ese modelo, la industria ya no tiene mucha paciencia para eso.",
            "attribution": "Darren Mowry, VP de la organización global de startups de Google, TechCrunch, febrero de 2026"
          }
        },
        {
          "id": "thin-vs-thick",
          "heading": "Fino versus grueso, definido",
          "level": 2,
          "paragraphs": [
            "El grosor no tiene nada que ver con cuánto código escribió usted. Tiene que ver con qué compone mientras duerme. Una venture gruesa es dueña de al menos un activo que se fortalece con el uso y que un rival bien financiado no reconstruye copiando su interfaz. Todo lo demás es adorno sobre un motor alquilado.",
            "Empiece por la razón de que el motor no pueda ser el moat. La inferencia se está desinflando más rápido que casi cualquier tecnología de la historia, una curva que trazamos para la región en [la curva de costo de la infraestructura de IA](/library/ai-infrastructure-cost-curve-latam). Según [a16z](https://a16z.com/llmflation-llm-inference-cost/), para un LLM de desempeño equivalente el costo cae 10x cada año, un factor de 1.000 en tres años. La calidad nivel GPT-3 pasó de cerca de US$ 60 por millón de tokens a fines de 2021 a alrededor de US$ 0,06 a fines de 2024. Una capacidad que se vuelve 10x más barata cada año, disponible para todos desde varios proveedores, es una utilidad. Usted no construye un moat sobre una utilidad. Lo construye sobre aquello a lo que la utilidad está sujeta."
          ],
          "callout": {
            "kind": "stat",
            "text": "Para un LLM de desempeño equivalente, el costo de inferencia cae 10x cada año, un factor de 1.000 en tres años. La calidad nivel GPT-3 bajó de cerca de US$ 60 por millón de tokens a alrededor de US$ 0,06.",
            "attribution": "a16z, Welcome to LLMflation, noviembre de 2024"
          }
        },
        {
          "id": "the-three-moats",
          "heading": "Las tres fuentes de grosor",
          "level": 3,
          "paragraphs": [
            "La defensibilidad durable vive en tres lugares, en orden creciente de fuerza. Cada uno carga una prueba de falla, y la mayoría de los fundadores la falla en silencio.",
            "La razón de que los efectos de red importen más es la matemática. NFX, en su [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), les acredita a los efectos de red cerca del 70% del valor creado por empresas de tecnología desde 1994, y los clasifica como la más fuerte de las cuatro defensibilidades reales. Un flywheel de datos propietario es como una venture AI-native construye uno, en lugar de solo alegar que lo tiene."
          ],
          "bullets": [
            "Flywheel de datos propietario. Un stock de datos no es un moat, un flujo sí, que es el corazón de [cómo funcionan los efectos de red de datos en la IA vertical](/library/data-network-effects-vertical-ai). El texto de a16z, The Empty Promise of Data Moats, muestra que en general no existe un efecto de red inherente por solo tener más dato, y que en el ejemplo de un chatbot de soporte, pasado cerca del 40% de cobertura de las preguntas, no hay ventaja en recolectar más. El moat es un loop donde cada uso produce dato que mejora el producto de forma medible más rápido de lo que la pila se deprecia.",
            "Evaluaciones específicas de dominio. El activo más difícil de copiar es una definición graduada de qué significa correcto en un dominio regulado y denso en juicio. Un modelo genérico redacta una cláusula o precifica un riesgo. Saber cuál resultado está bien, mal o silenciosamente peligroso en un contexto jurídico o de seguros brasileño es juicio codificado que los operadores tardaron años en ganar. El proveedor del modelo no entrega sus evaluaciones por usted.",
            "Lock-in de workflow. El 7 Powers de Hamilton Helmer llama a esto Process Power y Switching Costs. Cuando un producto de IA se vuelve el sistema de registro de un proceso regulado, salir significa revalidar un rastro de compliance, recapacitar al equipo y reintegrar sistemas adyacentes. El costo de salir es el moat. Por eso la IA vertical le gana a la horizontal. Un asistente genérico no tiene workflow que anclar."
          ]
        },
        {
          "id": "flywheel-crosses",
          "heading": "Cómo el flywheel cruza la línea",
          "level": 2,
          "paragraphs": [
            "El flywheel es la máquina que convierte una cuña de entrada fina en una posición gruesa con el tiempo. Este es el flywheel copilot, dato, capital. Lance un copilot de IA que haga trabajo real dentro de una vertical. El trabajo genera dato propietario que nadie más tiene. Ese dato afina las evaluaciones de dominio y mejora el producto, lo que profundiza el lock-in de workflow, lo que produce más dato. El copilot es la cuña de apariencia fina en el día uno. El loop es lo que lo vuelve grueso para el segundo año.",
            "La evidencia de 2025 de que esta es la verdadera línea divisoria viene de mercados emergentes, no de Silicon Valley. Según [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), la IA hizo el construir más fácil y el defender exponencialmente más difícil, con software llegando a US$ 1 millón de ARR más rápido que nunca. Sus estudios de caso caen exactamente en esos mecanismos. Una plataforma de autos usados compone un flywheel de datos a partir de más de 160 puntos de dato por vehículo. Un prestamista que combina un ERP propietario con financiamiento sostuvo 3% de morosidad durante la COVID mientras el sector fintech más amplio corría de 20 a 30%. Todos ellos alquilaron el mismo modelo. Ninguno de ellos alquiló el flywheel."
          ]
        },
        {
          "id": "the-self-deception",
          "heading": "La historia que los fundadores cuentan y no es cierta",
          "level": 2,
          "paragraphs": [
            "El pitch más común en IA es una historia de moat grueso narrada sobre un producto fino. Los fundadores describen un efecto de red de datos que no construyeron, un flywheel que no alcanzó velocidad de escape y una defensibilidad que vive enteramente en tiempo futuro. El modo de falla honesto tiene dos partes, y se alimentan entre sí.",
            "Primero, el loop de datos pasa hambre porque la empresa no tiene distribución. Un loop de feedback solo compone si suficientes usuarios lo alimentan. Sin un canal para adquirirlos y retenerlos, un competidor mejor distribuido con un dataset peor gana, porque su dataset peor está creciendo mientras el suyo se queda quieto. Segundo, dato propietario sin manera de seguir recolectándolo no es un moat, es un stock que se deprecia. Un dataset congelado en el lanzamiento queda rezagado frente a un producto que mejora con cada uso.",
            "La prueba del cambio es la disciplina que parte la historia a la mitad. Si usted cambiara de proveedor de modelo mañana y su defensibilidad no cambiara, el modelo nunca fue su moat. Encuentre el loop o el workflow que sobrevive al cambio antes de que un lanzamiento de modelo lo encuentre por usted."
          ],
          "callout": {
            "kind": "tip",
            "text": "Corra la prueba del cambio sobre su propia venture. Cambie de proveedor de modelo en su cabeza. Si su defensibilidad no cambia, el modelo nunca fue el moat, y el flywheel de datos que usted describe sigue siendo promesa, no activo."
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante construye grueso desde el día uno",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, diseñada para empezar gruesa en lugar de rogar por engrosar después. El método es el flywheel copilot, dato, capital corriendo dentro de un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Cada venture se empareja en el día uno con un operador de dominio que carga más de 10 años de cicatriz de mercado brasileño, de donde vienen las evaluaciones propietarias, y con US$ 500K-1.5M de capital de primer cheque, que compra la distribución que mantiene el loop de datos alimentado. Como la inferencia es barata, ese primer cheque muchas veces alcanza para [llegar a ingresos sin una Serie A](/library/ai-native-without-series-a). La tesis completa está en [/why-avante](/why-avante).",
            "Brasil hace que la cuenta cierre. Los servicios representan cerca del 70% del PIB brasileño, según el IBGE la mayor porción de la economía y por mucho tiempo mal atendida por software, que es exactamente la superficie donde un producto de IA vertical puede volverse el sistema de registro. El portafolio muestra el patrón por dominio. Activos judiciales, donde el dato de workflow alrededor de precatorios y claims es genuinamente propietario. Precificación de seguros, donde la precisión del scoring de riesgo alimenta un loop de uso. Inteligencia de subastas inmobiliarias, donde datos de subasta enriquecidos y puntuados se componen. En cada uno de ellos el modelo es el motor alquilado y el moat es el flujo de dato de dominio sujeto a él.",
            "Los retornos del modelo de studio son la razón por la que construimos así, con datos de GSSN que muestran un IRR de studio de cerca del 50% frente a cerca del 19% del VC tradicional, aproximadamente 2.5x, un benchmark del modelo y no una afirmación sobre el retorno realizado de cualquier fondo específico. La crítica al wrapper es correcta. Por eso mismo una venture debe construirse para que el próximo lanzamiento de modelo sea viento a favor, no un obituario. Vea cómo operamos en [/principles](/principles)."
          ]
        }
      ]
    }
  },
  {
    "slug": "brazil-ai-agriculture-agritech-opportunity",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/brazil-ai-agriculture-agritech-opportunity.png",
    "isPublished": true,
    "en": {
      "title": "AI in Brazilian Agriculture: The Agtech Build a Studio Would Make",
      "description": "Brazil AI in agriculture grows past USD 260 million by 2034. A superpower in crops, a thin software layer. Here is where an AI-native venture fits.",
      "sections": [
        {
          "paragraphs": [
            "Brazil is one of the few places on earth where agtech has both global scale and a deep domestic operator pool, and the software layer sitting on top of all that output is still thin. That gap is the Brazil AI in agriculture market opportunity in one sentence. According to [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), the market was about USD 60.0 million in 2025 and is projected to reach USD 260.0 million by 2034, a CAGR of 18.53%. Small in absolute dollars today. Growing fast, and sitting on top of an agricultural economy that is anything but small.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We read agtech the way an operator does, not a tourist. The size of the prize is the easy part. The harder and more useful question is structural. Where would an AI-native venture actually build, and why does a copilot for the agronomist turn into a financing or insurance vehicle."
          ]
        },
        {
          "id": "market-size",
          "heading": "The market, with dated numbers",
          "level": 2,
          "paragraphs": [
            "The AI-specific slice of Brazilian agriculture is still early, and the forecasters disagree on exactly how fast it grows. Report the range honestly. According to [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), Brazil AI in agriculture was roughly USD 60.0 million in 2025 and is forecast to hit USD 260.0 million by 2034, a CAGR of 18.53% over 2026 to 2034. A second forecaster has published a higher growth rate in the mid-20s percent range to the early 2030s. We could not confirm that figure on its primary report page, so we report it only as a direction, not a citation. Independent estimates split on the slope and agree on the direction, which is steep.",
            "The surrounding agtech sector is no longer nascent, and that is the number that should move an investor. The Radar Agtech Brasil 2024 study, produced by Embrapa with SP Ventures and Homo Ludens, mapped 1,972 agtechs in 2024, up from 1,125 in 2019, per the [report summary](https://www.academia.edu/145209078/Radar_Agtech_Brasil_2024_Mapping_Startups_Innovation_Environments_and_Investors_in_the_Brazilian_Agro_Ecosystem). That is roughly 75% growth in five years, plus more than 450 mapped innovation environments.",
            "The shape underneath the number matters more than the number itself. A USD 260 million software forecast sits on top of an agricultural economy that is enormous. Agribusiness was 23.2% of Brazilian GDP in 2024, and the agribusiness GDP grew 1.81% that year, according to [CNA and CEPEA-Esalq](https://www.cnabrasil.org.br/noticias/pib-do-agronegocio-fecha-2024-com-crescimento-de-1-81). The distance between the weight of the underlying activity and the thinness of the software running on it is the entire opening."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brazil AI in agriculture was about USD 60 million in 2025 and is forecast to reach USD 260 million by 2034, a CAGR of 18.53%.",
            "attribution": "IMARC Group, 2026 to 2034 forecast"
          }
        },
        {
          "id": "why-brazil",
          "heading": "Why Brazil is the rare global-scale agtech market",
          "level": 2,
          "paragraphs": [
            "Most vertical-AI opportunities in LATAM are domestic-scale plays. Agriculture is the exception. Brazil is a top global producer of soy, corn, coffee, sugarcane, beef, and poultry, which means a model trained on Brazilian fields addresses a world-scale problem, not a local one. That is rare. It is also why agtech is one of the few LATAM categories where a venture can build something with global reach from a Brazilian base.",
            "The second edge is operator depth. Brazil has agronomists, cooperatives, input distributors, and trading desks carrying decades of field knowledge. The scarce input for an AI-native agtech is not engineers or capital. It is people who understand the agronomy, the seasonality, the credit dynamics, and the buyer psychology of one specific crop in one specific region. Those people exist here in numbers, and they are exactly the input a venture studio assembles on day one rather than chasing for eighteen months.",
            "The third edge is the structural backdrop. Services account for roughly 70% of Brazilian GDP, with low software penetration, a figure we attribute to IBGE. Agribusiness straddles primary production and a long services tail of logistics, trading, finance, and insurance, and that tail is where software penetration is thinnest. The same [digitization gap that defines the broader Brazilian services opportunity](/library/brazil-services-economy-opportunity) shows up sharpest in agriculture's commercial and financial layer, which is precisely where an AI-native venture has the most room to build."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "The AI-native openings",
          "level": 2,
          "paragraphs": [
            "Sizing is the warm-up. The real work is deciding where in the chain an AI-native venture builds, and each candidate wedge has to come with a clear answer to one question. What proprietary data does this generate that nobody else has. Four openings pass that test.",
            "Read them as a sequence, not a menu. The first three are real businesses. The fourth is the one that compounds, because it manufactures the data the others need to underwrite."
          ],
          "bullets": [
            "Yield and risk models on satellite and sensor data. Computer vision on imagery, weather, and in-field sensors to forecast yield, detect disease, and time interventions. The asset is a labeled history of what happened on specific hectares.",
            "Input financing and crop insurance underwriting. Brazilian farmers need working capital and protection against weather and price. An AI-native underwriter that prices risk off real agronomic data can serve segments that traditional credit and insurance underprice or skip entirely.",
            "Traceability and carbon. Export markets increasingly demand provenance and emissions data. Software that captures chain of custody and carbon footprint becomes infrastructure, not a feature.",
            "A copilot for the agronomist. The highest-leverage wedge. A tool that sits in the agronomist's daily workflow and captures field decisions as structured, proprietary data. Every recommendation and every outcome becomes training data no competitor can buy."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "From agronomy copilot to financing vehicle",
          "level": 2,
          "paragraphs": [
            "This is where the Avante pattern fits agriculture almost too neatly. The recurring pattern across our portfolio is [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. In most verticals the link from copilot to capital takes explaining. In agriculture it is obvious.",
            "Walk the mechanism. A copilot used by agronomists across thousands of hectares generates the exact dataset an underwriter would kill for. Yield history, input usage, weather exposure, default behavior, and outcomes broken down by crop and region. That dataset is what justifies a financing or crop-insurance vehicle. The copilot earns trust and distribution first. The data it captures becomes the underwriting edge. The capital vehicle monetizes that edge. Each turn of the loop makes the next venture cheaper to underwrite than the last.",
            "The reason this matters for capital allocation is that [the data is the moat, not the model](/library/data-network-effects-vertical-ai). Any competent team can fine-tune a model. Almost nobody can assemble a multi-season record of what actually happened on specific Brazilian hectares, with the outcomes attached. That record is slow to build and impossible to shortcut, which is exactly what makes it defensible."
          ]
        },
        {
          "id": "hard-realities",
          "heading": "Seasonality, connectivity, and transfer risk",
          "level": 2,
          "paragraphs": [
            "Agriculture is one of the hardest verticals to build software in, and any honest version of this thesis has to say so before the close. Three frictions decide whether a venture reaches its data loop or stalls trying.",
            "Start with seasonality. A crop cycle runs months. You often get one real data-collection window per year per crop, which stretches the time to a usable model and forces the sales cycle to move at the speed of the season, not the speed of software. Then connectivity. Large parts of the Brazilian agricultural frontier have weak or no rural coverage, which constrains real-time capture and forces offline-first design. Coverage of Brazilian agriculture keeps flagging the same thing, that high field productivity is held back by uneven technology adoption.",
            "The third friction is the quiet killer. Models do not transfer cleanly. A model trained on soy in Mato Grosso rarely carries over to coffee in Minas Gerais, or even to a different soil and climate for the same crop. Each crop and region can demand its own data and its own tuning, so a venture can burn its runway on data acquisition before the flywheel ever turns. The implication is not that agtech is a bad bet. It is that the binding constraint is data acquisition, and the winner is whoever solves distribution and trust first so the data starts flowing."
          ],
          "callout": {
            "kind": "tip",
            "text": "In a vertical with one data window per crop per year, the first venture goal is a working data loop, not a big raise. Pick one crop and region, earn trust, get the data flowing.",
            "attribution": "Avante operating view"
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante would approach it",
          "level": 2,
          "paragraphs": [
            "Avante launches 3-4 ventures per year through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. In agriculture, Research picks the crop and wedge where data flows first. Partner brings in a domain operator with deep agronomic scar tissue, because operator depth is the binding constraint here and you cannot recruit that person cold into an unfunded idea. We deploy $500K-1.5M per venture across pre-seed and retain co-founder economics, and operating partners stay engaged through the first revenue milestone.",
            "The sequencing is deliberate. Run the copilot to data to fund flywheel against a single crop and region first, then compound into adjacent crops once the data loop works. The first check is small on purpose. In a vertical with brutal seasonality, the goal is to reach a working data loop before raising again, not to fund a large team through three seasons of guessing. Solving the company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction instead of overhead, and a studio venture launches 6-9 months ahead of a comparably funded standalone team.",
            "The model itself is the wager. The Global Startup Studio Network reports studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR of traditional VC over realistic time horizons. That is the GSSN studio-model benchmark, not Avante's own realized return. Where it earns its keep in agriculture is the mechanism. When operator depth and proprietary data are the binding constraints, concentrating scarce talent and shared infrastructure is worth more here than almost anywhere.",
            "The same flywheel already runs across the portfolio in other domains. Alphajuri in the Brazilian judicial-asset market. WIR in insurance pricing and risk scoring. BR Auction Intel in real estate auction intelligence. Agriculture is a natural next domain for the copilot to data to fund pattern, not a departure from it. The obvious objection is survivorship bias, and it is fair. The ~50% figure counts the studios that lived. Our answer is structural rather than a slogan. The first check is small, the six-stage system is built to kill weak ventures before they consume a priced round, and in agtech the discipline is forced on you by the calendar. The ventures that win Brazilian agriculture will not be the best funded. They will be the ones whose operators already know which field to start in. Read [the studio thesis](/why-avante) and the rest of [the Library](/library)."
          ]
        }
      ]
    },
    "pt": {
      "title": "IA na Agricultura Brasileira: o Build de Agtech que um Studio Faria",
      "description": "A IA na agricultura no Brasil cresce além de US$ 260 milhões até 2034. Potência em lavoura, camada fina de software. Veja onde encaixa uma venture AI-native.",
      "sections": [
        {
          "paragraphs": [
            "O Brasil é um dos poucos lugares do mundo onde a agtech tem escala global e um pool profundo de operadores locais ao mesmo tempo, e a camada de software que roda sobre toda essa produção ainda é fina. Essa lacuna resume o mercado de IA na agricultura no Brasil em uma frase. Segundo a [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), o mercado era de cerca de US$ 60,0 milhões em 2025 e deve chegar a US$ 260,0 milhões até 2034, um CAGR de 18,53%. Pequeno em dólares absolutos hoje. Crescendo rápido, e apoiado em uma economia agrícola que de pequena não tem nada.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Lemos agtech como um operador lê, não como turista. O tamanho do prêmio é a parte fácil. A pergunta mais difícil e mais útil é estrutural. Onde uma venture AI-native de fato construiria, e por que um copilot para o agrônomo vira um veículo de financiamento ou de seguro."
          ]
        },
        {
          "id": "market-size",
          "heading": "O mercado, com números datados",
          "level": 2,
          "paragraphs": [
            "A fatia especificamente de IA na agricultura brasileira ainda é incipiente, e os analistas divergem sobre a velocidade exata do crescimento. Reporte a faixa com honestidade. Segundo a [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), a IA na agricultura no Brasil era de aproximadamente US$ 60,0 milhões em 2025 e deve atingir US$ 260,0 milhões até 2034, um CAGR de 18,53% entre 2026 e 2034. Uma segunda casa de pesquisa publicou uma taxa mais alta, na casa dos vinte e poucos por cento, até o início da década de 2030. Não conseguimos confirmar esse número na página primária do relatório, então o tratamos apenas como direção, não como citação. As estimativas independentes discordam sobre a inclinação e concordam sobre a direção, que é íngreme.",
            "O ecossistema agtech ao redor já não é nascente, e esse é o número que deveria mover um investidor. O estudo Radar Agtech Brasil 2024, produzido pela Embrapa com SP Ventures e Homo Ludens, mapeou 1.972 agtechs em 2024, ante 1.125 em 2019, conforme o [resumo do relatório](https://www.academia.edu/145209078/Radar_Agtech_Brasil_2024_Mapping_Startups_Innovation_Environments_and_Investors_in_the_Brazilian_Agro_Ecosystem). São cerca de 75% de crescimento em cinco anos, além de mais de 450 ambientes de inovação mapeados.",
            "O formato por trás do número importa mais do que o número em si. Uma projeção de US$ 260 milhões em software se apoia sobre uma economia agrícola gigantesca. O agronegócio foi 23,2% do PIB brasileiro em 2024, e o PIB do agronegócio cresceu 1,81% naquele ano, segundo a [CNA e o CEPEA-Esalq](https://www.cnabrasil.org.br/noticias/pib-do-agronegocio-fecha-2024-com-crescimento-de-1-81). A distância entre o peso da atividade subjacente e a espessura do software que roda sobre ela é toda a abertura."
          ],
          "callout": {
            "kind": "stat",
            "text": "A IA na agricultura no Brasil era de cerca de US$ 60 milhões em 2025 e deve chegar a US$ 260 milhões até 2034, um CAGR de 18,53%.",
            "attribution": "IMARC Group, projeção 2026 a 2034"
          }
        },
        {
          "id": "why-brazil",
          "heading": "Por que o Brasil é o raro mercado de agtech em escala global",
          "level": 2,
          "paragraphs": [
            "A maioria das oportunidades de IA vertical na América Latina é jogo de escala doméstica. A agricultura é a exceção. O Brasil é um dos maiores produtores globais de soja, milho, café, cana, carne bovina e frango, o que significa que um modelo treinado em lavouras brasileiras endereça um problema de escala mundial, não local. Isso é raro. É também por isso que a agtech é uma das poucas categorias latino-americanas em que uma venture pode construir algo com alcance global a partir de uma base brasileira.",
            "A segunda vantagem é a profundidade de operador. O Brasil tem agrônomos, cooperativas, distribuidores de insumos e mesas de trading carregando décadas de conhecimento de campo. O insumo escasso para uma agtech AI-native não é engenheiro nem capital. São pessoas que entendem a agronomia, a sazonalidade, a dinâmica de crédito e a psicologia de compra de uma cultura específica em uma região específica. Essas pessoas existem aqui em quantidade, e são exatamente o insumo que um venture studio reúne no dia um, em vez de perseguir por dezoito meses.",
            "A terceira vantagem é o pano de fundo estrutural. Os serviços representam cerca de 70% do PIB brasileiro, com baixa penetração de software, número que atribuímos ao IBGE. O agronegócio fica entre a produção primária e uma longa cauda de serviços de logística, trading, finanças e seguro, e é nessa cauda que a penetração de software é mais rala. A mesma [lacuna de digitalização que define a oportunidade mais ampla de serviços no Brasil](/library/brazil-services-economy-opportunity) aparece mais nítida na camada comercial e financeira da agricultura, que é justamente onde uma venture AI-native tem mais espaço para construir."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "As aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "Dimensionar é o aquecimento. O trabalho de verdade é decidir onde na cadeia uma venture AI-native constrói, e cada candidato a wedge precisa vir com resposta para uma pergunta. Que dado proprietário isso gera que ninguém mais tem. Quatro aberturas passam nesse teste.",
            "Leia como sequência, não como cardápio. As três primeiras são negócios reais. A quarta é a que compõe, porque fabrica o dado que as outras precisam para subscrever risco."
          ],
          "bullets": [
            "Modelos de produtividade e risco sobre dados de satélite e sensores. Visão computacional em imagens, clima e sensores em campo para prever safra, detectar doença e cronometrar intervenções. O ativo é um histórico rotulado do que aconteceu em hectares específicos.",
            "Financiamento de insumos e subscrição de seguro agrícola. O produtor brasileiro precisa de capital de giro e de proteção contra clima e preço. Uma subscritora AI-native que precifica risco a partir de dados agronômicos reais atende segmentos que o crédito e o seguro tradicionais subprecificam ou ignoram.",
            "Rastreabilidade e carbono. Mercados de exportação exigem cada vez mais procedência e dados de emissão. Software que captura cadeia de custódia e pegada de carbono vira infraestrutura, não funcionalidade.",
            "Um copilot para o agrônomo. O wedge de maior alavancagem. Uma ferramenta que fica no fluxo diário do agrônomo e captura decisões de campo como dado estruturado e proprietário. Cada recomendação e cada resultado vira dado de treino que nenhum concorrente consegue comprar."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Do copilot do agrônomo ao veículo de financiamento",
          "level": 2,
          "paragraphs": [
            "É aqui que o padrão da Avante encaixa na agricultura quase bem demais. O padrão recorrente no nosso portfólio é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copilot de IA para gerar dado proprietário, e depois usar esse dado para captar e alocar capital. Na maioria das verticais, o elo entre copilot e capital precisa ser explicado. Na agricultura ele é óbvio.",
            "Percorra o mecanismo. Um copilot usado por agrônomos em milhares de hectares gera exatamente a base de dados pela qual uma subscritora mataria. Histórico de safra, uso de insumos, exposição climática, comportamento de inadimplência e resultados separados por cultura e região. Essa base é o que justifica um veículo de financiamento ou de seguro agrícola. O copilot conquista confiança e distribuição primeiro. O dado que ele captura vira a vantagem de subscrição. O veículo de capital monetiza essa vantagem. Cada volta do ciclo deixa a próxima venture mais barata de subscrever do que a anterior.",
            "A razão de isso importar para alocação de capital é que [o dado é o moat, não o modelo](/library/data-network-effects-vertical-ai). Qualquer time competente faz fine-tuning de um modelo. Quase ninguém consegue montar um histórico de várias safras do que de fato aconteceu em hectares brasileiros específicos, com os resultados anexados. Esse histórico é lento de construir e impossível de atalhar, e é justamente isso que o torna defensável."
          ]
        },
        {
          "id": "hard-realities",
          "heading": "Sazonalidade, conectividade e risco de transferência",
          "level": 2,
          "paragraphs": [
            "A agricultura é uma das verticais mais difíceis para construir software, e qualquer versão honesta dessa tese precisa dizer isso antes do fechamento. Três atritos decidem se uma venture chega ao seu loop de dados ou empaca tentando.",
            "Comece pela sazonalidade. Um ciclo de cultura dura meses. Muitas vezes você tem uma única janela real de coleta de dados por ano por cultura, o que estica o tempo até um modelo utilizável e força o ciclo de vendas a andar na velocidade da safra, não na do software. Depois, conectividade. Grande parte da fronteira agrícola brasileira tem cobertura rural fraca ou inexistente, o que limita a captura em tempo real e força um desenho offline-first. A cobertura da agricultura brasileira insiste no mesmo ponto, que a alta produtividade no campo é freada pela adoção desigual de tecnologia.",
            "O terceiro atrito é o que mata em silêncio. Modelos não transferem de forma limpa. Um modelo treinado em soja no Mato Grosso raramente serve para café em Minas Gerais, ou mesmo para outro solo e clima na mesma cultura. Cada cultura e região pode exigir dado próprio e ajuste próprio, então uma venture pode queimar o caixa em aquisição de dados antes de o flywheel girar. A implicação não é que agtech seja aposta ruim. É que a restrição que prende é a aquisição de dados, e quem vence é quem resolve distribuição e confiança primeiro, para o dado começar a fluir."
          ],
          "callout": {
            "kind": "tip",
            "text": "Numa vertical com uma janela de dados por cultura por ano, o primeiro objetivo da venture é um loop de dados funcionando, não uma captação grande. Escolha uma cultura e uma região, conquiste confiança, faça o dado fluir.",
            "attribution": "Visão operacional Avante"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante abordaria",
          "level": 2,
          "paragraphs": [
            "A Avante lança de 3 a 4 ventures por ano por um sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. Na agricultura, Research escolhe a cultura e o wedge onde o dado flui primeiro. Partner traz um operador de domínio com cicatriz agronômica profunda, porque a profundidade de operador é a restrição que prende aqui e essa pessoa não se recruta a frio para uma ideia sem capital. Aplicamos US$ 500K a 1,5M por venture no pré-seed e retemos economia de co-founder, e os operating partners seguem engajados até o primeiro marco de receita.",
            "O sequenciamento é deliberado. Rode o flywheel copilot, dado, capital contra uma única cultura e região primeiro, e depois componha para culturas adjacentes quando o loop de dados funcionar. O primeiro cheque é pequeno de propósito. Numa vertical de sazonalidade brutal, o objetivo é chegar a um loop de dados funcionando antes de captar de novo, não financiar um time grande por três safras de chute. Resolver o encanamento da empresa uma vez roteia cerca de US$ 300K a 500K de capital efetivo por venture para produto e tração em vez de overhead, e uma venture de studio nasce de 6 a 9 meses à frente de um time autônomo com financiamento comparável.",
            "O modelo em si é a aposta. A Global Startup Studio Network reporta IRR de studio de ~50% contra um padrão de mercado de ~19% para o VC tradicional, cerca de 2,5x o IRR do VC tradicional em horizontes realistas. Esse é o benchmark do modelo de studio da GSSN, não o retorno realizado da própria Avante. Onde isso se paga na agricultura é o mecanismo. Quando profundidade de operador e dado proprietário são as restrições que prendem, concentrar talento escasso e infraestrutura compartilhada vale mais aqui do que em quase qualquer lugar.",
            "O mesmo flywheel já roda no portfólio em outros domínios. Alphajuri no mercado brasileiro de ativos judiciais. WIR em precificação de seguro e risk scoring. BR Auction Intel em inteligência de leilões imobiliários. A agricultura é um próximo domínio natural para o padrão copilot, dado, capital, não um desvio dele. A objeção óbvia é viés de sobrevivência, e ela é justa. O número de ~50% conta os studios que sobreviveram. Nossa resposta é estrutural, não slogan. O primeiro cheque é pequeno, o sistema de seis estágios existe para matar ventures fracas antes que consumam uma rodada precificada, e na agtech essa disciplina é imposta pelo calendário. As ventures que vencerem a agricultura brasileira não serão as mais capitalizadas. Serão aquelas cujos operadores já sabem em qual lavoura começar. Leia [a tese do studio](/why-avante) e o resto da [Biblioteca](/library)."
          ]
        }
      ]
    },
    "es": {
      "title": "IA en la Agricultura Brasileña: el Build de Agtech que Haría un Studio",
      "description": "La IA en agricultura en Brasil crece más allá de USD 260 millones hacia 2034. Potencia en cultivos, capa fina de software. Aquí encaja una venture AI-native.",
      "sections": [
        {
          "paragraphs": [
            "Brasil es uno de los pocos lugares del mundo donde la agtech tiene escala global y un pool profundo de operadores locales a la vez, y la capa de software que corre sobre toda esa producción todavía es fina. Esa brecha resume el mercado de IA en agricultura en Brasil en una frase. Según [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), el mercado era de cerca de USD 60,0 millones en 2025 y se proyecta que llegue a USD 260,0 millones hacia 2034, un CAGR de 18,53%. Pequeño en dólares absolutos hoy. Creciendo rápido, y apoyado en una economía agrícola que de pequeña no tiene nada.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Leemos la agtech como la lee un operador, no un turista. El tamaño del premio es la parte fácil. La pregunta más difícil y más útil es estructural. Dónde construiría de verdad una venture AI-native, y por qué un copilot para el agrónomo se vuelve un vehículo de financiamiento o de seguro."
          ]
        },
        {
          "id": "market-size",
          "heading": "El mercado, con números fechados",
          "level": 2,
          "paragraphs": [
            "La porción específicamente de IA en la agricultura brasileña todavía es temprana, y los analistas discrepan sobre la velocidad exacta del crecimiento. Reporte el rango con honestidad. Según [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-agriculture-market), la IA en agricultura en Brasil era de aproximadamente USD 60,0 millones en 2025 y se proyecta que alcance USD 260,0 millones hacia 2034, un CAGR de 18,53% entre 2026 y 2034. Una segunda firma de investigación publicó una tasa más alta, en el rango de veintitantos por ciento, hacia inicios de la década de 2030. No pudimos confirmar esa cifra en la página primaria del reporte, así que la reportamos solo como dirección, no como cita. Las estimaciones independientes discrepan sobre la pendiente y coinciden en la dirección, que es empinada.",
            "El ecosistema agtech alrededor ya no es naciente, y ese es el número que debería mover a un inversionista. El estudio Radar Agtech Brasil 2024, producido por Embrapa con SP Ventures y Homo Ludens, mapeó 1.972 agtechs en 2024, frente a 1.125 en 2019, según el [resumen del reporte](https://www.academia.edu/145209078/Radar_Agtech_Brasil_2024_Mapping_Startups_Innovation_Environments_and_Investors_in_the_Brazilian_Agro_Ecosystem). Son cerca de 75% de crecimiento en cinco años, más de 450 ambientes de innovación mapeados.",
            "La forma detrás del número importa más que el número en sí. Una proyección de USD 260 millones en software se apoya sobre una economía agrícola enorme. El agronegocio fue 23,2% del PIB brasileño en 2024, y el PIB del agronegocio creció 1,81% ese año, según [CNA y CEPEA-Esalq](https://www.cnabrasil.org.br/noticias/pib-do-agronegocio-fecha-2024-com-crescimento-de-1-81). La distancia entre el peso de la actividad subyacente y la delgadez del software que corre sobre ella es toda la apertura."
          ],
          "callout": {
            "kind": "stat",
            "text": "La IA en agricultura en Brasil era de cerca de USD 60 millones en 2025 y se proyecta a USD 260 millones hacia 2034, un CAGR de 18,53%.",
            "attribution": "IMARC Group, proyección 2026 a 2034"
          }
        },
        {
          "id": "why-brazil",
          "heading": "Por qué Brasil es el raro mercado de agtech a escala global",
          "level": 2,
          "paragraphs": [
            "La mayoría de las oportunidades de IA vertical en LATAM son jugadas de escala doméstica. La agricultura es la excepción. Brasil es uno de los mayores productores globales de soja, maíz, café, caña, carne de res y pollo, lo que significa que un modelo entrenado en campos brasileños aborda un problema de escala mundial, no local. Eso es raro. Y por eso la agtech es una de las pocas categorías latinoamericanas en que una venture puede construir algo con alcance global desde una base brasileña.",
            "La segunda ventaja es la profundidad de operador. Brasil tiene agrónomos, cooperativas, distribuidores de insumos y mesas de trading que cargan décadas de conocimiento de campo. El insumo escaso para una agtech AI-native no es el ingeniero ni el capital. Son personas que entienden la agronomía, la estacionalidad, la dinámica de crédito y la psicología de compra de un cultivo específico en una región específica. Esas personas existen aquí en cantidad, y son exactamente el insumo que un venture studio reúne el día uno, en lugar de perseguirlo durante dieciocho meses.",
            "La tercera ventaja es el telón de fondo estructural. Los servicios representan cerca de 70% del PIB brasileño, con baja penetración de software, una cifra que atribuimos al IBGE. El agronegocio queda entre la producción primaria y una larga cola de servicios de logística, trading, finanzas y seguro, y es en esa cola donde la penetración de software es más rala. La misma [brecha de digitalización que define la oportunidad más amplia de servicios en Brasil](/library/brazil-services-economy-opportunity) aparece más nítida en la capa comercial y financiera de la agricultura, que es justo donde una venture AI-native tiene más espacio para construir."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "Las aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "Dimensionar es el calentamiento. El trabajo de verdad es decidir dónde en la cadena construye una venture AI-native, y cada candidato a wedge tiene que venir con respuesta a una pregunta. Qué dato propietario genera esto que nadie más tiene. Cuatro aperturas pasan esa prueba.",
            "Léalas como secuencia, no como menú. Las tres primeras son negocios reales. La cuarta es la que compone, porque fabrica el dato que las demás necesitan para suscribir riesgo."
          ],
          "bullets": [
            "Modelos de rendimiento y riesgo sobre datos de satélite y sensores. Visión computacional en imágenes, clima y sensores en campo para pronosticar cosecha, detectar enfermedad y cronometrar intervenciones. El activo es un historial etiquetado de lo que pasó en hectáreas específicas.",
            "Financiamiento de insumos y suscripción de seguro agrícola. El productor brasileño necesita capital de trabajo y protección contra clima y precio. Una suscriptora AI-native que tarifica el riesgo a partir de datos agronómicos reales atiende segmentos que el crédito y el seguro tradicionales tarifican mal o ignoran.",
            "Trazabilidad y carbono. Los mercados de exportación exigen cada vez más procedencia y datos de emisión. El software que captura cadena de custodia y huella de carbono se vuelve infraestructura, no una funcionalidad.",
            "Un copilot para el agrónomo. El wedge de mayor apalancamiento. Una herramienta que se queda en el flujo diario del agrónomo y captura decisiones de campo como dato estructurado y propietario. Cada recomendación y cada resultado se vuelve dato de entrenamiento que ningún competidor puede comprar."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Del copilot del agrónomo al vehículo de financiamiento",
          "level": 2,
          "paragraphs": [
            "Aquí es donde el patrón de Avante encaja en la agricultura casi demasiado bien. El patrón recurrente en nuestro portafolio es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copilot de IA para generar dato propietario, y después usar ese dato para levantar y desplegar capital. En la mayoría de las verticales el vínculo entre copilot y capital necesita explicación. En la agricultura es obvio.",
            "Recorra el mecanismo. Un copilot usado por agrónomos en miles de hectáreas genera exactamente la base de datos por la que una suscriptora mataría. Historial de cosecha, uso de insumos, exposición climática, comportamiento de mora y resultados separados por cultivo y región. Esa base es lo que justifica un vehículo de financiamiento o de seguro agrícola. El copilot gana confianza y distribución primero. El dato que captura se vuelve la ventaja de suscripción. El vehículo de capital monetiza esa ventaja. Cada vuelta del ciclo deja la próxima venture más barata de suscribir que la anterior.",
            "La razón de que esto importe para la asignación de capital es que [el dato es el moat, no el modelo](/library/data-network-effects-vertical-ai). Cualquier equipo competente hace fine-tuning de un modelo. Casi nadie logra armar un historial de varias cosechas de lo que de verdad pasó en hectáreas brasileñas específicas, con los resultados anexados. Ese historial es lento de construir e imposible de atajar, y es justo eso lo que lo vuelve defendible."
          ]
        },
        {
          "id": "hard-realities",
          "heading": "Estacionalidad, conectividad y riesgo de transferencia",
          "level": 2,
          "paragraphs": [
            "La agricultura es una de las verticales más difíciles para construir software, y cualquier versión honesta de esta tesis tiene que decirlo antes del cierre. Tres fricciones deciden si una venture llega a su loop de datos o se atasca intentándolo.",
            "Empiece por la estacionalidad. Un ciclo de cultivo dura meses. Muchas veces usted tiene una sola ventana real de recolección de datos por año por cultivo, lo que estira el tiempo hasta un modelo utilizable y obliga al ciclo de ventas a moverse a la velocidad de la cosecha, no a la del software. Después, conectividad. Buena parte de la frontera agrícola brasileña tiene cobertura rural débil o inexistente, lo que limita la captura en tiempo real y obliga a un diseño offline-first. La cobertura de la agricultura brasileña insiste en lo mismo, que la alta productividad en el campo está frenada por la adopción desigual de tecnología.",
            "La tercera fricción es la que mata en silencio. Los modelos no transfieren de forma limpia. Un modelo entrenado en soja en Mato Grosso rara vez sirve para café en Minas Gerais, ni siquiera para otro suelo y clima en el mismo cultivo. Cada cultivo y región puede exigir su propio dato y su propio ajuste, así que una venture puede quemar su caja en adquisición de datos antes de que el flywheel gire. La implicación no es que la agtech sea una mala apuesta. Es que la restricción que ata es la adquisición de datos, y quien gana es quien resuelve distribución y confianza primero, para que el dato empiece a fluir."
          ],
          "callout": {
            "kind": "tip",
            "text": "En una vertical con una ventana de datos por cultivo por año, el primer objetivo de la venture es un loop de datos funcionando, no una ronda grande. Elija un cultivo y una región, gane confianza, haga fluir el dato.",
            "attribution": "Visión operativa Avante"
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante lo abordaría",
          "level": 2,
          "paragraphs": [
            "Avante lanza de 3 a 4 ventures por año a través de un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. En agricultura, Research elige el cultivo y el wedge donde el dato fluye primero. Partner trae a un operador de dominio con cicatriz agronómica profunda, porque la profundidad de operador es la restricción que ata aquí y a esa persona no se la recluta en frío para una idea sin capital. Desplegamos USD 500K a 1,5M por venture en el pre-seed y retenemos economía de co-founder, y los operating partners siguen comprometidos hasta el primer hito de ingresos.",
            "La secuencia es deliberada. Corra el flywheel copilot, dato, capital contra un solo cultivo y región primero, y después componga hacia cultivos adyacentes cuando el loop de datos funcione. El primer cheque es pequeño a propósito. En una vertical de estacionalidad brutal, el objetivo es llegar a un loop de datos funcionando antes de levantar de nuevo, no financiar un equipo grande por tres cosechas de adivinanza. Resolver la plomería de la empresa una vez enruta cerca de USD 300K a 500K de capital efectivo por venture hacia producto y tracción en lugar de overhead, y una venture de studio nace de 6 a 9 meses por delante de un equipo independiente con financiamiento comparable.",
            "El modelo en sí es la apuesta. La Global Startup Studio Network reporta un IRR de studio de ~50% frente a un estándar de mercado de ~19% para el VC tradicional, cerca de 2,5x el IRR del VC tradicional en horizontes realistas. Ese es el benchmark del modelo de studio de la GSSN, no el retorno realizado de la propia Avante. Donde se paga en agricultura es el mecanismo. Cuando la profundidad de operador y el dato propietario son las restricciones que atan, concentrar talento escaso e infraestructura compartida vale más aquí que en casi cualquier lugar.",
            "El mismo flywheel ya corre en el portafolio en otros dominios. Alphajuri en el mercado brasileño de activos judiciales. WIR en tarificación de seguro y risk scoring. BR Auction Intel en inteligencia de remates inmobiliarios. La agricultura es un próximo dominio natural para el patrón copilot, dato, capital, no un desvío de él. La objeción obvia es el sesgo de supervivencia, y es justa. El número de ~50% cuenta los studios que sobrevivieron. Nuestra respuesta es estructural, no un eslogan. El primer cheque es pequeño, el sistema de seis etapas existe para matar ventures débiles antes de que consuman una ronda con precio fijado, y en la agtech esa disciplina la impone el calendario. Las ventures que ganen la agricultura brasileña no serán las mejor capitalizadas. Serán aquellas cuyos operadores ya saben en qué cultivo empezar. Lea [la tesis del studio](/why-avante) y el resto de la [Biblioteca](/library)."
          ]
        }
      ]
    }
  },
  {
    "slug": "brazil-ai-cybersecurity-opportunity",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/brazil-ai-cybersecurity-opportunity.png",
    "isPublished": true,
    "en": {
      "title": "AI in Brazilian Cybersecurity: Where a Studio Would Build",
      "description": "Brazil cybersecurity compounds toward USD 7 billion by 2030 with LGPD as the forcing function. Where an AI-native venture builds, and where a thin layer dies.",
      "sections": [
        {
          "paragraphs": [
            "Brazil is the most attacked country in Latin America and runs one of the heaviest data-protection regimes in the hemisphere, yet its security teams are thin and its budget is fragmented. That is the Brazil AI in cybersecurity market opportunity in one sentence. The threat curve, a regulator with real teeth, and a five-figure analyst shortage are already doing the selling. What is missing is software built for how Brazilian teams actually defend, in Portuguese, against Brazilian threats.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We read this market the way an operator does, not the way a market-size chart does. The number that matters is not the headline. It is the slice an AI-native venture can win and defend, and the proprietary data it generates on the way there."
          ]
        },
        {
          "id": "market-size",
          "heading": "The market, with dated numbers",
          "level": 2,
          "paragraphs": [
            "The honest answer is a range, not a single number, because the research firms disagree by billions. Anyone quoting one figure as the market is selling you the rosiest one.",
            "According to [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/brazil-cybersecurity-market-155811757.html), Brazil cybersecurity grows from USD 4.61 billion in 2025 to USD 6.98 billion by 2030, an 8.6% CAGR. [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market) puts it at USD 4.05 billion in 2026, off a USD 3.68 billion base in 2025, reaching USD 6.57 billion by 2031 at a 10.13% CAGR. The narrower IT and telecom security slice runs hotter. [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/it-telecom-cyber-security-market/brazil) sizes that subsegment at USD 1.61 billion by 2030 at a 13.6% CAGR.",
            "Two things follow. The credible whole-market figures cluster near USD 4 billion today, growing 8 to 10% a year to roughly USD 6.5 to 7 billion by 2030, not the 20%-plus that some sizings imply. And the AI-exposed slices grow faster than the blended market, which is exactly where a new venture should aim. The discipline is sizing the slice you can win, not the whole pie."
          ],
          "callout": {
            "kind": "stat",
            "text": "Credible estimates put Brazil cybersecurity near USD 4 billion in 2025, growing to roughly USD 6.5 to 7 billion by 2030 at an 8 to 10% CAGR. Report the range, not the rosiest figure.",
            "attribution": "MarketsandMarkets and Mordor Intelligence, 2025"
          }
        },
        {
          "id": "the-driver",
          "heading": "Why LGPD and the threat curve change the game",
          "level": 2,
          "paragraphs": [
            "The driver is not AI hype. It is a law with teeth meeting an attack volume that thin local teams cannot absorb by hand.",
            "Brazil's Lei Geral de Protecao de Dados, Federal Law No. 13,709, is enforced by the Autoridade Nacional de Protecao de Dados, the ANPD. Penalties reach up to 2% of a company's Brazilian revenue, capped at BRL 50 million, roughly USD 10 million, per violation, according to [Compliance Hub](https://compliancehub.wiki/breaches-and-fines-under-brazils-lei-geral-de-protecao-de-dados-lgpd-2/). The agency is no longer dormant. The [IAPP](https://iapp.org/news/a/lessons-from-brazilian-dpa-sanctions-to-date) counts seven sanctioning decisions published as of October 2024, including an order forcing Meta to halt processing personal data for AI training under a daily fine. Resolution CD/ANPD 15 now requires incident disclosure within three business days. Compliance stopped being theater. It became a recurring cost with a deadline.",
            "The threat side is heavier. FortiGuard Labs recorded 63 billion attempted cyberattacks across Latin America and the Caribbean in the first half of 2023 alone, and Brazil led the region with 23 billion attempts, ahead of Mexico at 14 billion, [as reported by Mexico Business News](https://mexicobusiness.news/cybersecurity/news/fortiguard-reports-cyberattack-attempts-during-1h23). Ransomware is climbing into critical infrastructure. Confirmed ransomware hits on Brazilian utilities went from zero a decade ago to 16 in 2024, per [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market).",
            "Then the part that makes AI non-optional. Brazil graduates fewer than 8,000 cybersecurity specialists a year against more than 37,000 open roles, and managed-security costs run up to 35% higher outside the big metros. A regulator with a three-day clock, 23 billion attack attempts in six months, and a chronic analyst shortfall is the precise setup where software that cuts analyst load gets bought, not just demoed."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "The AI-native openings",
          "level": 2,
          "paragraphs": [
            "The openings sit where AI compresses analyst hours and where Portuguese-language, Brazil-specific context is the wedge a global vendor will not bother to tune. Four stand out."
          ],
          "bullets": [
            "SOC triage and alert-reduction copilots. Cut false positives and rank what a thin team looks at first. A direct answer to the sub-8,000-analyst gap.",
            "Fraud and account-takeover detection on Pix rails. Pix clears around 3 billion transactions a month with about 70% of traffic starting on smartphones, a uniquely Brazilian attack surface generic tools never modeled.",
            "Phishing and social-engineering defense tuned for Brazilian Portuguese. Language-native detection beats a translated global model on local lures.",
            "LGPD compliance automation. Continuous evidence collection, incident disclosure against the ANPD three-day rule, and audit-log retention against Central Bank Resolution 4658."
          ],
          "callout": {
            "kind": "tip",
            "text": "The test for each opening is the same. It is a workflow a local team runs daily, it produces structured data as a byproduct, and it is too small or too Portuguese for a global vendor to prioritize."
          }
        },
        {
          "id": "the-flywheel",
          "heading": "Why security telemetry fits the data-to-fund flywheel",
          "level": 2,
          "paragraphs": [
            "Security is one of the cleanest fits for the copilot to data to fund flywheel because the work product is data. A triage copilot does not just save hours. Every alert a Brazilian analyst confirms or dismisses, every Pix fraud pattern flagged, every phishing lure caught in Portuguese becomes labeled, proprietary training data.",
            "That corpus is local, current, and refreshed by the exact customers a global vendor cannot reach. The model trained on it gets better at Brazilian threats than any generic tool, which wins the next customer, which deepens the data. That is [a data network effect](/library/data-network-effects-vertical-ai), not a slogan. It is the difference between a wrapper and a company.",
            "This is the recurring Avante pattern, the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. The same logic that compounds a judicial-asset platform like Alphajuri or an insurance-pricing API like WIR applies to a threat-detection copilot. The moat is the data exhaust, not the model weights."
          ]
        },
        {
          "id": "incumbents-and-trust",
          "heading": "The incumbent and trust problem",
          "level": 2,
          "paragraphs": [
            "Security is trust-heavy and talent-scarce, and both cut against a newcomer. Global incumbents own the enterprise tier and the brand a CISO defaults to. The SMB base, where most of Brazil's millions of service firms sit, has low willingness to pay for security until after an incident. A thin AI layer with no proprietary threat data and no workflow lock-in has no moat and a hard channel problem. It struggles to be trusted with the keys and struggles to get paid.",
            "The defensible version inverts each of those. It does not sell a generic dashboard. It embeds in a daily workflow, triage or Pix fraud review or LGPD evidence, so switching means losing accumulated context. It earns trust inside one vertical where the operator already has relationships, instead of cold-selling enterprise CISOs against Palo Alto or CrowdStrike. And it compounds Brazilian threat data until it is measurably better at the local problem than any global tool. Skip those three and the channel kills you. Build them and the same friction that blocks foreign incumbents becomes the wall that protects you."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante would approach it",
          "level": 2,
          "paragraphs": [
            "Avante would not start from the market chart. It would start from an operator with 10 or more years of Brazilian-market scar tissue in security or fraud, pair them with the studio playbook and a first ticket of capital on day one, and run the six-stage system: Research, Partner, Build, Traction, Revenue, Compound. Avante deploys $500K-1.5M per venture across pre-seed and retains co-founder economics. Because AI infrastructure is now cheap enough to deploy without a Series A, a security copilot can reach revenue on that first check rather than waiting for a funding round that, in this cycle, may not come.",
            "A word on capital, since it sets the constraint. LATAM venture funding peaked near USD 16 billion in 2021 and reset hard, with quarterly funding around USD 1.35 billion in Q1 2024 as confidence returned, per [Nearshore Americas](https://nearshoreamericas.com/vc-investors-regain-confidence-in-latam-startup-funding-reached-1-35bn-in-q1-2024/). That reset argues for capital efficiency at formation, not against the geography.",
            "The structural case sits underneath all of it, and [the broader Brazil AI market report](/library/brazil-ai-market-report-2026) lays it out. Services are roughly 70% of Brazilian GDP, per IBGE, with low software penetration, so the buyers of vertical security software are everywhere and underserved. Venture studios post a studio IRR of roughly 50% against the industry-standard roughly 19% for traditional VC, per the Global Startup Studio Network, about 2.5 times the return over realistic horizons. The point is not the multiple. It is that the model is built for exactly this market, where the regulator, the threat curve, and the talent gap are already forcing the spend. Read the [studio thesis](/why-avante), or the rest of the [Library](/library) for related Brazil market work. The builder who pairs operator depth with proprietary Brazilian threat data does not have to win the whole market. Just the slice no global tool will ever bother to learn."
          ]
        }
      ]
    },
    "pt": {
      "title": "IA na Cibersegurança Brasileira: Onde um Studio Construiria",
      "description": "O mercado de cibersegurança no Brasil avança rumo a US$ 7 bilhões até 2030, com a LGPD como gatilho. Onde uma venture AI-native constrói de verdade.",
      "sections": [
        {
          "paragraphs": [
            "O Brasil é o país mais atacado da América Latina e opera um dos regimes de proteção de dados mais pesados do hemisfério. Mesmo assim, os times de segurança são enxutos e o orçamento é fragmentado. Esse é o mercado de IA em cibersegurança no Brasil em uma frase. A curva de ameaças, um regulador com dentes de verdade e um déficit de milhares de analistas já estão fazendo a venda. O que falta é software construído para como os times brasileiros de fato defendem, em português, contra ameaças brasileiras.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Lemos esse mercado como um operador lê, não como um gráfico de tamanho de mercado lê. O número que importa não é a manchete. É a fatia que uma venture AI-native consegue vencer e defender, e o dado proprietário que ela gera no caminho."
          ]
        },
        {
          "id": "market-size",
          "heading": "O mercado, com números datados",
          "level": 2,
          "paragraphs": [
            "A resposta honesta é uma faixa, não um número único, porque as consultorias divergem em bilhões. Quem cita uma cifra só como sendo o mercado está te vendendo a mais otimista.",
            "Segundo a [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/brazil-cybersecurity-market-155811757.html), a cibersegurança no Brasil cresce de US$ 4,61 bilhões em 2025 para US$ 6,98 bilhões até 2030, um CAGR de 8,6%. A [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market) estima US$ 4,05 bilhões em 2026, sobre uma base de US$ 3,68 bilhões em 2025, chegando a US$ 6,57 bilhões até 2031 a um CAGR de 10,13%. A fatia mais estreita de segurança em TI e telecom cresce mais rápido. A [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/it-telecom-cyber-security-market/brazil) dimensiona esse subsegmento em US$ 1,61 bilhão até 2030, a um CAGR de 13,6%.",
            "Duas conclusões. As cifras críveis para o mercado inteiro se concentram perto de US$ 4 bilhões hoje, crescendo de 8% a 10% ao ano para algo entre US$ 6,5 e 7 bilhões até 2030, e não os mais de 20% que algumas estimativas sugerem. E as fatias expostas à IA crescem mais rápido que o mercado consolidado, que é exatamente onde uma venture nova deve mirar. A disciplina é dimensionar a fatia que dá para vencer, não a torta inteira."
          ],
          "callout": {
            "kind": "stat",
            "text": "Estimativas críveis colocam a cibersegurança no Brasil perto de US$ 4 bilhões em 2025, crescendo para algo entre US$ 6,5 e 7 bilhões até 2030 a um CAGR de 8% a 10%. Reporte a faixa, não a cifra mais otimista.",
            "attribution": "MarketsandMarkets e Mordor Intelligence, 2025"
          }
        },
        {
          "id": "the-driver",
          "heading": "Por que a LGPD e a curva de ameaças mudam o jogo",
          "level": 2,
          "paragraphs": [
            "O gatilho não é hype de IA. É uma lei com dentes encontrando um volume de ataques que times locais enxutos não conseguem absorver na mão.",
            "A Lei Geral de Proteção de Dados, Lei Federal nº 13.709, é fiscalizada pela Autoridade Nacional de Proteção de Dados, a ANPD. As penalidades chegam a 2% do faturamento da empresa no Brasil, limitadas a R$ 50 milhões, cerca de US$ 10 milhões, por infração, segundo o [Compliance Hub](https://compliancehub.wiki/breaches-and-fines-under-brazils-lei-geral-de-protecao-de-dados-lgpd-2/). A agência não está mais dormente. O [IAPP](https://iapp.org/news/a/lessons-from-brazilian-dpa-sanctions-to-date) contabiliza sete decisões sancionadoras publicadas até outubro de 2024, incluindo uma ordem que obrigou a Meta a suspender o tratamento de dados pessoais para treino de IA sob multa diária. A Resolução CD/ANPD 15 agora exige a comunicação de incidentes em até três dias úteis. Conformidade deixou de ser teatro. Virou um custo recorrente com prazo.",
            "O lado das ameaças é mais pesado. O FortiGuard Labs registrou 63 bilhões de tentativas de ataque cibernético na América Latina e no Caribe só no primeiro semestre de 2023, e o Brasil liderou a região com 23 bilhões de tentativas, à frente do México com 14 bilhões, [conforme reportado pela Mexico Business News](https://mexicobusiness.news/cybersecurity/news/fortiguard-reports-cyberattack-attempts-during-1h23). O ransomware está subindo para a infraestrutura crítica. Incidentes confirmados de ransomware em concessionárias brasileiras saltaram de zero há uma década para 16 em 2024, segundo a [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market).",
            "E então a parte que torna a IA não opcional. O Brasil forma menos de 8.000 especialistas em cibersegurança por ano contra mais de 37.000 vagas abertas, e o custo de segurança gerenciada chega a ser 35% maior fora das grandes capitais. Um regulador com prazo de três dias, 23 bilhões de tentativas de ataque em seis meses e um déficit crônico de analistas é o cenário exato em que software que reduz a carga do analista é comprado, não apenas demonstrado."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "As aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "As aberturas estão onde a IA comprime horas de analista e onde o contexto em português e específico do Brasil é a cunha que um fornecedor global não vai se dar ao trabalho de calibrar. Quatro se destacam."
          ],
          "bullets": [
            "Copilotos de triagem de SOC e redução de alertas. Cortam falsos positivos e priorizam o que um time enxuto deve olhar primeiro. Resposta direta ao déficit de menos de 8.000 analistas.",
            "Detecção de fraude e tomada de conta sobre os trilhos do Pix. O Pix processa cerca de 3 bilhões de transações por mês, com aproximadamente 70% do tráfego começando em smartphones, uma superfície de ataque unicamente brasileira que ferramentas genéricas nunca modelaram.",
            "Defesa contra phishing e engenharia social calibrada para o português do Brasil. Detecção nativa na língua supera um modelo global traduzido nas iscas locais.",
            "Automação de conformidade com a LGPD. Coleta contínua de evidências, comunicação de incidentes contra a regra dos três dias da ANPD e retenção de logs de auditoria contra a Resolução 4658 do Banco Central."
          ],
          "callout": {
            "kind": "tip",
            "text": "O teste para cada abertura é o mesmo. É um fluxo de trabalho que um time local roda todo dia, gera dado estruturado como subproduto, e é pequeno demais ou brasileiro demais para um fornecedor global priorizar."
          }
        },
        {
          "id": "the-flywheel",
          "heading": "Por que a telemetria de segurança encaixa no flywheel dado para capital",
          "level": 2,
          "paragraphs": [
            "Segurança é um dos encaixes mais limpos para o flywheel copilot, dado, capital porque o produto do trabalho é dado. Um copiloto de triagem não só economiza horas. Cada alerta que um analista brasileiro confirma ou descarta, cada padrão de fraude no Pix sinalizado, cada isca de phishing capturada em português vira dado de treino proprietário e rotulado.",
            "Esse acervo é local, atual e renovado pelos mesmos clientes que um fornecedor global não alcança. O modelo treinado nele fica melhor em ameaças brasileiras do que qualquer ferramenta genérica, o que conquista o próximo cliente, o que aprofunda o dado. Isso é [efeito de rede de dados](/library/data-network-effects-vertical-ai), não slogan. É a diferença entre um wrapper e uma empresa.",
            "Esse é o padrão recorrente da Avante, o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copiloto de IA para gerar dado proprietário, e usar esse dado para captar e alocar capital. A mesma lógica que faz uma plataforma de ativos judiciais como a Alphajuri ou uma API de precificação de seguros como a WIR compor aplica a um copiloto de detecção de ameaças. O moat é o dado que sobra, não os pesos do modelo."
          ]
        },
        {
          "id": "incumbents-and-trust",
          "heading": "O problema de incumbentes e confiança",
          "level": 2,
          "paragraphs": [
            "Segurança é intensiva em confiança e escassa em talento, e os dois pesam contra um entrante. Os incumbentes globais dominam o tier enterprise e a marca que um CISO escolhe por padrão. A base SMB, onde está a maioria dos milhões de empresas de serviço do Brasil, tem baixa disposição a pagar por segurança até depois de um incidente. Uma camada fina de IA sem dado de ameaça proprietário e sem trava de fluxo de trabalho não tem moat e tem um problema sério de canal. Custa a ser confiada com as chaves e custa a ser paga.",
            "A versão defensável inverte cada um desses pontos. Ela não vende um dashboard genérico. Ela se encaixa em um fluxo de trabalho diário, triagem ou revisão de fraude no Pix ou evidência de LGPD, de modo que trocar significa perder contexto acumulado. Ela ganha confiança dentro de um vertical onde o operador já tem relacionamento, em vez de vender a frio para CISOs enterprise contra Palo Alto ou CrowdStrike. E ela compõe dado de ameaça brasileiro até ser mensuravelmente melhor no problema local do que qualquer ferramenta global. Pule esses três e o canal te mata. Construa-os e a mesma fricção que barra os incumbentes estrangeiros vira o muro que te protege."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante abordaria",
          "level": 2,
          "paragraphs": [
            "A Avante não começaria pelo gráfico de mercado. Começaria por um operador com 10 anos ou mais de cicatriz de mercado brasileiro em segurança ou fraude, o pareando com o playbook do studio e um primeiro cheque de capital no dia um, e rodaria o sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. A Avante aloca US$ 500 mil a US$ 1,5 milhão por venture ao longo do pre-seed e mantém economia de co-founder. Como a infraestrutura de IA agora é barata o suficiente para subir sem uma Série A, um copiloto de segurança pode chegar à receita com esse primeiro cheque, em vez de esperar uma rodada que, neste ciclo, pode não vir.",
            "Uma palavra sobre capital, já que ela define a restrição. O funding de venture na América Latina chegou ao pico perto de US$ 16 bilhões em 2021 e teve uma correção forte, com aporte trimestral em torno de US$ 1,35 bilhão no primeiro trimestre de 2024 conforme a confiança voltava, segundo a [Nearshore Americas](https://nearshoreamericas.com/vc-investors-regain-confidence-in-latam-startup-funding-reached-1-35bn-in-q1-2024/). Essa correção é argumento a favor de eficiência de capital na formação, não contra a geografia.",
            "O caso estrutural está embaixo de tudo isso, e o [panorama mais amplo de IA no Brasil](/library/brazil-ai-market-report-2026) o detalha. Serviços são cerca de 70% do PIB brasileiro, segundo o IBGE, com baixa penetração de software, então os compradores de software vertical de segurança estão em todo lugar e mal atendidos. Venture studios registram um IRR de studio de cerca de 50% contra os cerca de 19% padrão da indústria para o VC tradicional, segundo a Global Startup Studio Network, cerca de 2,5 vezes o retorno em horizontes realistas. O ponto não é o múltiplo. É que o modelo foi feito exatamente para este mercado, onde o regulador, a curva de ameaças e o déficit de talento já estão forçando o gasto. Leia a [tese do studio](/why-avante), ou o resto da [Library](/library) para trabalhos relacionados sobre o mercado brasileiro. Quem combina profundidade de operador com dado de ameaça brasileiro proprietário não precisa vencer o mercado inteiro. Só a fatia que nenhuma ferramenta global jamais vai se dar ao trabalho de aprender."
          ]
        }
      ]
    },
    "es": {
      "title": "IA en la Ciberseguridad Brasileña: Dónde Construiría un Studio",
      "description": "El mercado de ciberseguridad en Brasil avanza hacia USD 7 mil millones para 2030, con la LGPD como detonante. Dónde construye una venture AI-native.",
      "sections": [
        {
          "paragraphs": [
            "Brasil es el país más atacado de América Latina y opera uno de los regímenes de protección de datos más pesados del hemisferio. Aun así, sus equipos de seguridad son delgados y su presupuesto está fragmentado. Ese es el mercado de IA en ciberseguridad en Brasil en una frase. La curva de amenazas, un regulador con dientes de verdad y un déficit de miles de analistas ya están haciendo la venta. Lo que falta es software construido para cómo los equipos brasileños defienden de verdad, en portugués, contra amenazas brasileñas.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Leemos este mercado como lo lee un operador, no como lo lee un gráfico de tamaño de mercado. El número que importa no es el titular. Es la porción que una venture AI-native puede ganar y defender, y el dato propietario que genera en el camino."
          ]
        },
        {
          "id": "market-size",
          "heading": "El mercado, con números fechados",
          "level": 2,
          "paragraphs": [
            "La respuesta honesta es un rango, no un número único, porque las consultoras difieren por miles de millones. Quien cita una sola cifra como si fuera el mercado le está vendiendo la más optimista.",
            "Según [MarketsandMarkets](https://www.marketsandmarkets.com/Market-Reports/brazil-cybersecurity-market-155811757.html), la ciberseguridad en Brasil crece de USD 4.61 mil millones en 2025 a USD 6.98 mil millones para 2030, un CAGR de 8.6%. [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market) la sitúa en USD 4.05 mil millones en 2026, sobre una base de USD 3.68 mil millones en 2025, llegando a USD 6.57 mil millones para 2031 a un CAGR de 10.13%. La porción más estrecha de seguridad en TI y telecom crece más rápido. [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/it-telecom-cyber-security-market/brazil) dimensiona ese subsegmento en USD 1.61 mil millones para 2030, a un CAGR de 13.6%.",
            "Dos conclusiones. Las cifras creíbles para el mercado entero se concentran cerca de USD 4 mil millones hoy, creciendo de 8% a 10% al año hacia algo entre USD 6.5 y 7 mil millones para 2030, y no el más de 20% que algunas estimaciones sugieren. Y las porciones expuestas a la IA crecen más rápido que el mercado consolidado, que es exactamente donde debe apuntar una venture nueva. La disciplina es dimensionar la porción que se puede ganar, no el pastel entero."
          ],
          "callout": {
            "kind": "stat",
            "text": "Las estimaciones creíbles ubican la ciberseguridad en Brasil cerca de USD 4 mil millones en 2025, creciendo hacia algo entre USD 6.5 y 7 mil millones para 2030 a un CAGR de 8% a 10%. Reporte el rango, no la cifra más optimista.",
            "attribution": "MarketsandMarkets y Mordor Intelligence, 2025"
          }
        },
        {
          "id": "the-driver",
          "heading": "Por qué la LGPD y la curva de amenazas cambian el juego",
          "level": 2,
          "paragraphs": [
            "El detonante no es el hype de la IA. Es una ley con dientes que se encuentra con un volumen de ataques que los equipos locales delgados no pueden absorber a mano.",
            "La Lei Geral de Proteção de Dados, Ley Federal nº 13.709, es fiscalizada por la Autoridade Nacional de Proteção de Dados, la ANPD. Las sanciones llegan al 2% de la facturación de la empresa en Brasil, con un tope de BRL 50 millones, cerca de USD 10 millones, por infracción, según [Compliance Hub](https://compliancehub.wiki/breaches-and-fines-under-brazils-lei-geral-de-protecao-de-dados-lgpd-2/). La agencia ya no está dormida. El [IAPP](https://iapp.org/news/a/lessons-from-brazilian-dpa-sanctions-to-date) contabiliza siete decisiones sancionadoras publicadas hasta octubre de 2024, entre ellas una orden que obligó a Meta a suspender el tratamiento de datos personales para entrenamiento de IA bajo una multa diaria. La Resolución CD/ANPD 15 ahora exige comunicar incidentes en un plazo de tres días hábiles. El cumplimiento dejó de ser teatro. Se volvió un costo recurrente con fecha límite.",
            "El lado de las amenazas es más pesado. FortiGuard Labs registró 63 mil millones de intentos de ciberataque en América Latina y el Caribe solo en el primer semestre de 2023, y Brasil lideró la región con 23 mil millones de intentos, por delante de México con 14 mil millones, [según reportó Mexico Business News](https://mexicobusiness.news/cybersecurity/news/fortiguard-reports-cyberattack-attempts-during-1h23). El ransomware está subiendo hacia la infraestructura crítica. Los incidentes confirmados de ransomware en empresas de servicios públicos brasileñas pasaron de cero hace una década a 16 en 2024, según [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/brazil-cybersecurity-market).",
            "Y luego la parte que vuelve la IA no opcional. Brasil gradúa a menos de 8.000 especialistas en ciberseguridad al año contra más de 37.000 vacantes abiertas, y el costo de seguridad gestionada llega a ser 35% mayor fuera de las grandes capitales. Un regulador con un plazo de tres días, 23 mil millones de intentos de ataque en seis meses y un déficit crónico de analistas es el escenario exacto donde el software que reduce la carga del analista se compra, no solo se demuestra."
          ]
        },
        {
          "id": "where-to-build",
          "heading": "Las aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "Las aberturas están donde la IA comprime horas de analista y donde el contexto en portugués y específico de Brasil es la cuña que un proveedor global no se va a molestar en calibrar. Cuatro se destacan."
          ],
          "bullets": [
            "Copilotos de triaje de SOC y reducción de alertas. Cortan falsos positivos y priorizan lo que un equipo delgado debe mirar primero. Respuesta directa al déficit de menos de 8.000 analistas.",
            "Detección de fraude y robo de cuentas sobre los rieles de Pix. Pix procesa cerca de 3 mil millones de transacciones al mes, con aproximadamente 70% del tráfico iniciando en smartphones, una superficie de ataque únicamente brasileña que las herramientas genéricas nunca modelaron.",
            "Defensa contra phishing e ingeniería social calibrada para el portugués de Brasil. La detección nativa en el idioma supera a un modelo global traducido en los señuelos locales.",
            "Automatización de cumplimiento de la LGPD. Recolección continua de evidencia, comunicación de incidentes contra la regla de tres días de la ANPD y retención de logs de auditoría contra la Resolución 4658 del Banco Central."
          ],
          "callout": {
            "kind": "tip",
            "text": "La prueba para cada abertura es la misma. Es un flujo de trabajo que un equipo local corre todos los días, genera dato estructurado como subproducto, y es demasiado pequeño o demasiado brasileño para que un proveedor global lo priorice."
          }
        },
        {
          "id": "the-flywheel",
          "heading": "Por qué la telemetría de seguridad encaja en el flywheel dato a capital",
          "level": 2,
          "paragraphs": [
            "La seguridad es uno de los encajes más limpios para el flywheel copilot, dato, capital porque el producto del trabajo es dato. Un copiloto de triaje no solo ahorra horas. Cada alerta que un analista brasileño confirma o descarta, cada patrón de fraude en Pix señalado, cada señuelo de phishing capturado en portugués se vuelve dato de entrenamiento propietario y etiquetado.",
            "Ese acervo es local, actual y renovado por los mismos clientes que un proveedor global no alcanza. El modelo entrenado con él se vuelve mejor en amenazas brasileñas que cualquier herramienta genérica, lo que gana al próximo cliente, lo que profundiza el dato. Eso es [un efecto de red de datos](/library/data-network-effects-vertical-ai), no un eslogan. Es la diferencia entre un wrapper y una empresa.",
            "Ese es el patrón recurrente de Avante, el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copiloto de IA para generar dato propietario, y usar ese dato para levantar y desplegar capital. La misma lógica que hace componer a una plataforma de activos judiciales como Alphajuri o a una API de precificación de seguros como WIR aplica a un copiloto de detección de amenazas. El moat es el dato que sobra, no los pesos del modelo."
          ]
        },
        {
          "id": "incumbents-and-trust",
          "heading": "El problema de incumbentes y confianza",
          "level": 2,
          "paragraphs": [
            "La seguridad es intensiva en confianza y escasa en talento, y ambas pesan contra un entrante. Los incumbentes globales dominan el tier enterprise y la marca que un CISO elige por defecto. La base SMB, donde está la mayoría de los millones de empresas de servicio de Brasil, tiene baja disposición a pagar por seguridad hasta después de un incidente. Una capa delgada de IA sin dato de amenaza propietario y sin amarre de flujo de trabajo no tiene moat y tiene un problema serio de canal. Le cuesta que le confíen las llaves y le cuesta cobrar.",
            "La versión defendible invierte cada uno de esos puntos. No vende un dashboard genérico. Se encaja en un flujo de trabajo diario, triaje o revisión de fraude en Pix o evidencia de LGPD, de modo que cambiar significa perder contexto acumulado. Gana confianza dentro de un vertical donde el operador ya tiene relaciones, en vez de vender en frío a CISOs enterprise contra Palo Alto o CrowdStrike. Y compone dato de amenaza brasileño hasta ser mensurablemente mejor en el problema local que cualquier herramienta global. Sáltese esos tres y el canal lo mata. Constrúyalos y la misma fricción que frena a los incumbentes extranjeros se vuelve el muro que lo protege."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante lo abordaría",
          "level": 2,
          "paragraphs": [
            "Avante no empezaría por el gráfico de mercado. Empezaría por un operador con 10 años o más de cicatriz de mercado brasileño en seguridad o fraude, lo emparejaría con el playbook del studio y un primer cheque de capital en el día uno, y correría el sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Avante despliega USD 500K-1.5M por venture a lo largo del pre-seed y retiene economía de co-founder. Como la infraestructura de IA ahora es lo bastante barata para desplegar sin una Serie A, un copiloto de seguridad puede llegar a ingresos con ese primer cheque, en vez de esperar una ronda que, en este ciclo, puede no llegar.",
            "Una palabra sobre el capital, ya que fija la restricción. El funding de venture en América Latina llegó a su pico cerca de USD 16 mil millones en 2021 y tuvo una corrección fuerte, con aporte trimestral en torno a USD 1.35 mil millones en el primer trimestre de 2024 a medida que volvía la confianza, según [Nearshore Americas](https://nearshoreamericas.com/vc-investors-regain-confidence-in-latam-startup-funding-reached-1-35bn-in-q1-2024/). Esa corrección es argumento a favor de la eficiencia de capital en la formación, no contra la geografía.",
            "El caso estructural está debajo de todo esto, y el [panorama más amplio de IA en Brasil](/library/brazil-ai-market-report-2026) lo detalla. Los servicios son cerca del 70% del PIB brasileño, según el IBGE, con baja penetración de software, así que los compradores de software vertical de seguridad están en todas partes y mal atendidos. Los venture studios registran un IRR de studio de cerca de 50% contra el cerca de 19% estándar de la industria para el VC tradicional, según la Global Startup Studio Network, cerca de 2.5 veces el retorno en horizontes realistas. El punto no es el múltiplo. Es que el modelo fue hecho exactamente para este mercado, donde el regulador, la curva de amenazas y el déficit de talento ya están forzando el gasto. Lea la [tesis del studio](/why-avante), o el resto de la [Library](/library) para trabajos relacionados sobre el mercado brasileño. Quien combina profundidad de operador con dato de amenaza brasileño propietario no necesita ganar el mercado entero. Solo la porción que ninguna herramienta global jamás se va a molestar en aprender."
          ]
        }
      ]
    }
  },
  {
    "slug": "brazil-ai-fintech-market-opportunity",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/brazil-ai-fintech-market-opportunity.png",
    "isPublished": true,
    "en": {
      "title": "AI in Brazilian Fintech: Where a Studio Would Actually Build",
      "description": "Brazil AI in fintech scales past USD 2 billion by 2034. Pix and Open Finance moved the moat from rails to underwriting. Here is where to build.",
      "sections": [
        {
          "paragraphs": [
            "The Brazil AI in fintech market is worth about USD 457 million today and is forecast to reach USD 2.17 billion by 2034, per IMARC. That is a real number, and it is smaller than most pitches imply. The interesting part is not the size. It is that Brazil runs two pieces of public financial infrastructure, Pix and Open Finance, that most countries do not have, and they move the entire question of where an AI fintech can defend itself.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We are skeptical of AI fintech as a category, because most of it is a thin layer on a bank API with no moat. This piece is about the exceptions. Where the public rails, a real workflow, and a proprietary data loop combine into something a generalist cannot copy."
          ]
        },
        {
          "id": "market-size",
          "heading": "The market, with dated numbers",
          "level": 2,
          "paragraphs": [
            "Start with the honest number, not the rosiest one. IMARC sizes the Brazil AI in fintech market at USD 457.1 million in 2025, growing to USD 2,165.7 million by 2034 at an 18.30% CAGR, per [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-fintech-market). That AI-specific slice sits inside a larger fintech market IMARC puts at USD 5.5 billion in 2025, heading to USD 19.1 billion by 2034 at 14.92%, per [IMARC Group](https://www.imarcgroup.com/brazil-fintech-market). Other research houses publish a smaller base. That spread is normal for a young category, the kind of pattern our [Brazil AI market report](/library/brazil-ai-market-report-2026) traces across verticals, and pretending it is a settled figure is the first tell of a weak market read.",
            "Two facts survive the range. The AI slice is under half a billion dollars today, so anyone selling a giant addressable market for AI fintech in Brazil is rounding up. And the AI layer is forecast to grow faster than the fintech market it rides on, 18.30% against 14.92%. That gap is the signal. AI is taking share inside fintech, not merely growing alongside it.",
            "So the right framing is not how big the market is. It is where inside a small, fast-compounding category the durable businesses get built. Sizing is the warm-up. The structure is the content."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brazil AI in fintech is forecast to grow from USD 457M in 2025 to USD 2.17B by 2034 at 18.30% CAGR, faster than the 14.92% growth of the USD 5.5B fintech market it sits inside.",
            "attribution": "IMARC Group, 2026"
          }
        },
        {
          "id": "the-rails",
          "heading": "Why Pix and Open Finance change the game",
          "level": 2,
          "paragraphs": [
            "Brazil is structurally different from most fintech markets, and the reason is the public infrastructure, not the market size. Pix, the instant-payment rail Banco Central do Brasil launched in November 2020, passed 175 million users by May 2025 and is used by 93% of the Brazilian adult population, with 62% naming it their most frequent way to pay, per [data summarizing Banco Central figures](https://en.wikipedia.org/wiki/Pix_(payment_system)). By July 2024 it was moving close to R$2.5 trillion a month. By the end of 2024 it was 47% of all non-cash transactions and the fastest-growing payment instrument of the year, up 52%, per [Banco Central reporting](https://brazileconomy.com.br/financas/2025/08/pix-movimenta-r-264-trilhoes-em-2024-e-se-consolida-como-principal-meio-de-pagamento/).",
            "The price tells the strategic story. Pix is free for individuals and 0.33% for merchants, against 1.13% for debit and 2.34% for credit. A rail that cheap and that widely adopted does not stay a differentiator. It becomes the floor everyone builds on.",
            "Open Finance is the rail that matters most for AI. Brazil reached 62 million active Open Finance consents by January 2025, up 44% year over year, with roughly 2.3 billion successful API calls every week, per [DPL News citing FEBRABAN](https://dplnews.com/brasil-consentimentos-de-open-finance-chegam-a-62-milhoes-2025-marca-entrada-de-novas-funcionalidades/). A fintech in the United States or Europe spends years and serious money assembling the data access a Brazilian fintech can request through a standardized consent. That is the shift. When the rails are public and shared, the rails are not the advantage. The advantage moves to what a venture does with the data. Underwriting quality and workflow depth become the moat. Payment plumbing does not."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brazil reached 62 million active Open Finance consents by January 2025, up 44% year over year, with about 2.3 billion API calls every week.",
            "attribution": "FEBRABAN, via DPL News"
          }
        },
        {
          "id": "where-to-build",
          "heading": "The AI-native openings",
          "level": 2,
          "paragraphs": [
            "The openings worth chasing share one shape. Each turns Brazil's standardized data layer into a decision that used to need a human expert or a thick proprietary dataset. Four stand out.",
            "The common thread runs underneath all four. The rail is public but the data loop is not. Two ventures can request the same Open Finance consent. Only one of them turns six months of repayment outcomes into a sharper model and a workflow the customer will not leave. That asymmetry is where the durable business hides, so read each opening below as a place to build a loop, not a feature."
          ],
          "bullets": [
            "Credit and risk underwriting on thin files. Tens of millions of Brazilians and small firms have almost no formal credit history. Open Finance consent plus Pix cash-flow data lets a model underwrite a borrower a bureau score would reject. The moat is the repayment data the lender accumulates, not the model itself.",
            "Fraud and AML. Pix moving close to R$2.5 trillion a month created a real-time fraud surface. AI that scores transactions and flags laundering against live rails is a workflow that both incumbents and regulators want.",
            "Treasury and reconciliation. Brazilian businesses run on a tangle of Pix, boletos, cards, and a layered tax regime. AI that reconciles flows and forecasts cash against the actual rails replaces spreadsheet work that never scaled.",
            "SMB embedded finance. Services are roughly 70% of Brazilian GDP, mostly small operators. Embedding credit and payments inside the software those firms already use turns a vertical tool into a financial-data engine."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Why lending fits the data-to-fund flywheel",
          "level": 2,
          "paragraphs": [
            "Lending is the canonical case for [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel), the recurring pattern across Avante ventures. The mechanics are clean. Build an AI copilot that helps a lender or a borrower reach a credit decision. The copilot generates proprietary performance data, every loan approved and then repaid or defaulted. That outcome data is exactly what a capital vehicle needs to underwrite at scale. So the copilot does not just sell software. It manufactures the dataset that justifies raising and deploying a fund.",
            "This is why lending turns the flywheel harder than fraud or reconciliation. Fraud scoring produces signals. Reconciliation produces efficiency. Lending produces repayment outcomes, and a repayment outcome is a financial asset. A venture that owns the underwriting workflow and [the data network effect it throws off](/library/data-network-effects-vertical-ai) can move from selling a tool to deploying capital against its own edge.",
            "Avante runs this pattern across the portfolio, and the vertical is the only thing that changes. Alphajuri runs it in the Brazilian judicial-debt market, where a copilot for precatórios and claims generates the data to underwrite those assets. WIR runs the same logic in insurance pricing and risk scoring. BR Auction Intel runs it in real estate auction intelligence. Same flywheel, different asset."
          ]
        },
        {
          "id": "crowded-and-regulated",
          "heading": "The crowding and regulation problem",
          "level": 2,
          "paragraphs": [
            "The honest objection is that fintech is the most crowded and most regulated category in LATAM, and a thin AI layer on a bank API has no moat. The funding data backs the crowding. Fintech captured 61% of all Latin American venture funding in 2025 on just 29% of deals, per [Cuantico VP's LatAm VC Report 2026](https://reports.cuanticovp.com/preliminary-findings-from-the-latam-vc-report-2026-more-capital-fewer-startups/), dated February 18, 2026. Total regional VC was USD 4.126 billion across 681 rounds, up 13.8% year over year, and Brazil alone took USD 2.032 billion, 52.9% of the region, across 363 deals. The three largest rounds of the year were all Mexican fintechs.",
            "That is the problem and the filter at once. Nubank and other incumbents already own enormous data loops, so a generic AI wrapper competes with them on their strongest ground and loses. The same data shows pre-seed funding fell 40% in 2025, from USD 110 million to USD 66 million. Early capital got scarcer even as late-stage fintech boomed. A venture that needs a frothy seed market to find product-market fit is built for the wrong cycle.",
            "The way through is not a thinner layer. It is a workflow and a data loop a generalist cannot copy, in a vertical the incumbents find too small or too operationally messy to chase. Defensibility comes from owning one specific underwriting decision end to end. Not from access to an API every competitor can also call."
          ],
          "callout": {
            "kind": "stat",
            "text": "Fintech took 61% of LATAM venture funding in 2025 on only 29% of deals, while pre-seed funding fell 40% from USD 110M to USD 66M.",
            "attribution": "Cuantico VP, LatAm VC Report 2026"
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante would approach it",
          "level": 2,
          "paragraphs": [
            "The first move is to refuse the obvious one. We would not build a horizontal AI fintech to fight Nubank on data scale, because that is a fight the incumbent already won. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. It launches 3-4 ventures per year through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. It deploys $500K-1.5M per venture across pre-seed and retains co-founder economics. Applied to fintech, that model points one way. Pick a single underwriting decision in an underserved vertical, pair a domain operator who has lived that credit market with the public rails, and build the workflow that produces a proprietary data loop.",
            "The structural facts make this buildable now. Pix and Open Finance supply the data access that used to require a Series A to assemble. Solving the company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction rather than overhead. A studio venture launches 6-9 months ahead of a comparably funded standalone team. The scarce input is not capital or models, both of which are cheap. It is operators with 10+ years of scar tissue in a specific Brazilian credit market, paired with a Silicon Valley playbook and first-ticket capital on day one. See [the studio thesis](/why-avante) for how that gets assembled.",
            "The performance case for the model is the studio benchmark, not an Avante track record. The Global Startup Studio Network reports studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR of traditional VC over realistic time horizons. That is the GSSN figure for the studio model, never any single firm's realized return. Where it bears on fintech is the mechanism. In a category this crowded, the edge is operator depth and a data loop, exactly the inputs a studio concentrates.",
            "The close is blunt. Most AI fintech ideas in Brazil will fail, because they are wrappers on a public rail anyone can call. The few that win will own a workflow and the repayment data it generates. Browse [the Library](/library) for the rest of how we think about building in Brazil."
          ]
        }
      ]
    },
    "pt": {
      "title": "IA no Fintech Brasileiro: Onde um Studio de Fato Construiria",
      "description": "A IA em fintech no Brasil avança além de US$ 2 bilhões até 2034. Pix e Open Finance moveram o moat dos trilhos para o crédito. Veja onde construir.",
      "sections": [
        {
          "paragraphs": [
            "O mercado de IA em fintech no Brasil vale cerca de US$ 457 milhões hoje e deve chegar a US$ 2,17 bilhões até 2034, segundo a IMARC. É um número real, e é menor do que a maioria dos pitches sugere. O interessante não é o tamanho. É que o Brasil opera duas peças de infraestrutura financeira pública, Pix e Open Finance, que a maioria dos países não tem, e elas mudam toda a pergunta sobre onde uma fintech de IA consegue se defender.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Somos céticos quanto à IA em fintech como categoria, porque a maior parte dela é uma camada fina sobre uma API bancária sem moat. Este texto é sobre as exceções. Onde os trilhos públicos, um workflow de verdade e um loop de dados proprietário se combinam em algo que um generalista não consegue copiar."
          ]
        },
        {
          "id": "market-size",
          "heading": "O mercado, com números datados",
          "level": 2,
          "paragraphs": [
            "Comece pelo número honesto, não pelo mais otimista. A IMARC dimensiona o mercado de IA em fintech no Brasil em US$ 457,1 milhões em 2025, crescendo para US$ 2.165,7 milhões até 2034 a um CAGR de 18,30%, segundo a [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-fintech-market). Essa fatia específica de IA está dentro de um mercado de fintech maior, que a IMARC estima em US$ 5,5 bilhões em 2025, rumo a US$ 19,1 bilhões até 2034 a 14,92%, segundo a [IMARC Group](https://www.imarcgroup.com/brazil-fintech-market). Outras casas de pesquisa publicam uma base menor. Essa variação é normal numa categoria jovem, o tipo de padrão que o nosso [panorama de IA no Brasil](/library/brazil-ai-market-report-2026) mapeia entre verticais, e fingir que é um número fechado é o primeiro sinal de uma leitura fraca de mercado.",
            "Dois fatos sobrevivem à variação. A fatia de IA está abaixo de meio bilhão de dólares hoje, então quem vende um mercado endereçável gigante para IA em fintech no Brasil está arredondando para cima. E a camada de IA deve crescer mais rápido do que o mercado de fintech sobre o qual ela cavalga, 18,30% contra 14,92%. Essa diferença é o sinal. A IA está ganhando participação dentro do fintech, não apenas crescendo junto.",
            "Então o enquadramento certo não é o tamanho do mercado. É onde, dentro de uma categoria pequena e de rápida composição, os negócios duráveis são construídos. O dimensionamento é o aquecimento. A estrutura é o conteúdo."
          ],
          "callout": {
            "kind": "stat",
            "text": "A IA em fintech no Brasil deve crescer de US$ 457 milhões em 2025 para US$ 2,17 bilhões até 2034 a um CAGR de 18,30%, mais rápido que os 14,92% do mercado de fintech de US$ 5,5 bilhões em que está inserida.",
            "attribution": "IMARC Group, 2026"
          }
        },
        {
          "id": "the-rails",
          "heading": "Por que Pix e Open Finance mudam o jogo",
          "level": 2,
          "paragraphs": [
            "O Brasil é estruturalmente diferente da maioria dos mercados de fintech, e o motivo é a infraestrutura pública, não o tamanho do mercado. O Pix, o trilho de pagamento instantâneo que o Banco Central do Brasil lançou em novembro de 2020, passou de 175 milhões de usuários até maio de 2025 e é usado por 93% da população adulta brasileira, com 62% apontando-o como a forma mais frequente de pagar, segundo [dados que resumem números do Banco Central](https://en.wikipedia.org/wiki/Pix_(payment_system)). Em julho de 2024 já movimentava cerca de R$ 2,5 trilhões por mês. No fim de 2024 era 47% de todas as transações que não usam dinheiro em espécie e o meio de pagamento que mais cresceu no ano, alta de 52%, segundo [reportagem sobre dados do Banco Central](https://brazileconomy.com.br/financas/2025/08/pix-movimenta-r-264-trilhoes-em-2024-e-se-consolida-como-principal-meio-de-pagamento/).",
            "O preço conta a história estratégica. O Pix é gratuito para pessoas físicas e custa 0,33% para o lojista, contra 1,13% no débito e 2,34% no crédito. Um trilho tão barato e tão adotado não permanece um diferencial. Ele vira o piso sobre o qual todo mundo constrói.",
            "O Open Finance é o trilho que mais importa para a IA. O Brasil chegou a 62 milhões de consentimentos ativos de Open Finance até janeiro de 2025, alta de 44% no ano, com cerca de 2,3 bilhões de chamadas de API bem-sucedidas toda semana, segundo o [DPL News citando a FEBRABAN](https://dplnews.com/brasil-consentimentos-de-open-finance-chegam-a-62-milhoes-2025-marca-entrada-de-novas-funcionalidades/). Uma fintech nos Estados Unidos ou na Europa gasta anos e muito dinheiro montando o acesso a dados que uma fintech brasileira consegue solicitar por meio de um consentimento padronizado. Essa é a virada. Quando os trilhos são públicos e compartilhados, os trilhos não são a vantagem. A vantagem migra para o que a empresa faz com o dado. Qualidade de crédito e profundidade de workflow viram o moat. Encanamento de pagamento não."
          ],
          "callout": {
            "kind": "stat",
            "text": "O Brasil chegou a 62 milhões de consentimentos ativos de Open Finance até janeiro de 2025, alta de 44% no ano, com cerca de 2,3 bilhões de chamadas de API por semana.",
            "attribution": "FEBRABAN, via DPL News"
          }
        },
        {
          "id": "where-to-build",
          "heading": "As aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "As aberturas que valem a pena perseguir têm um formato em comum. Cada uma transforma a camada de dados padronizada do Brasil numa decisão que antes exigia um especialista humano ou uma base de dados proprietária densa. Quatro se destacam.",
            "O fio condutor corre por baixo das quatro. O trilho é público, mas o loop de dados não é. Duas empresas podem solicitar o mesmo consentimento de Open Finance. Só uma delas transforma seis meses de resultados de pagamento num modelo mais afiado e num workflow que o cliente não vai abandonar. Essa assimetria é onde o negócio durável se esconde, então leia cada abertura abaixo como um lugar para construir um loop, não uma funcionalidade."
          ],
          "bullets": [
            "Crédito e análise de risco em fichas magras. Dezenas de milhões de brasileiros e pequenas empresas quase não têm histórico formal de crédito. O consentimento de Open Finance somado aos dados de fluxo de caixa do Pix permite a um modelo dar crédito a um tomador que o score de bureau recusaria. O moat é o dado de pagamento que o credor acumula, não o modelo em si.",
            "Fraude e PLD. O Pix movimentando cerca de R$ 2,5 trilhões por mês criou uma superfície de fraude em tempo real. IA que pontua transações e sinaliza lavagem contra trilhos ao vivo é um workflow que tanto os incumbentes quanto os reguladores querem.",
            "Tesouraria e conciliação. As empresas brasileiras rodam num emaranhado de Pix, boletos, cartões e um regime tributário em camadas. IA que concilia fluxos e projeta caixa contra os trilhos reais substitui o trabalho de planilha que nunca escalou.",
            "Finanças embarcadas para PMEs. Serviços são cerca de 70% do PIB brasileiro, em sua maioria pequenos operadores. Embarcar crédito e pagamentos dentro do software que essas empresas já usam transforma uma ferramenta vertical num motor de dados financeiros."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Por que crédito encaixa no flywheel dado para capital",
          "level": 2,
          "paragraphs": [
            "Crédito é o caso canônico do [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel), o padrão recorrente entre as empresas da Avante. A mecânica é limpa. Construa um copilot de IA que ajuda um credor ou um tomador a chegar a uma decisão de crédito. O copilot gera dados proprietários de performance, cada empréstimo aprovado e depois pago ou inadimplido. Esse dado de resultado é exatamente o que um veículo de capital precisa para dar crédito em escala. Então o copilot não vende apenas software. Ele fabrica a base de dados que justifica levantar e alocar um fundo.",
            "É por isso que o crédito gira o flywheel com mais força do que fraude ou conciliação. Pontuação de fraude produz sinais. Conciliação produz eficiência. Crédito produz resultados de pagamento, e um resultado de pagamento é um ativo financeiro. Uma empresa que controla o workflow de crédito e [o efeito de rede de dados que ele gera](/library/data-network-effects-vertical-ai) pode passar de vender uma ferramenta para alocar capital contra a própria vantagem.",
            "A Avante roda esse padrão em todo o portfólio, e a única coisa que muda é o vertical. A Alphajuri roda no mercado brasileiro de dívida judicial, onde um copilot para precatórios e créditos gera o dado para precificar esses ativos. A WIR roda a mesma lógica em precificação de seguros e análise de risco. A BR Auction Intel roda em inteligência de leilões de imóveis. Mesmo flywheel, ativo diferente."
          ]
        },
        {
          "id": "crowded-and-regulated",
          "heading": "O problema de concorrência e regulação",
          "level": 2,
          "paragraphs": [
            "A objeção honesta é que fintech é a categoria mais concorrida e mais regulada da América Latina, e uma camada fina de IA sobre uma API bancária não tem moat. Os dados de funding confirmam a concorrência. Fintech capturou 61% de todo o investimento de venture da América Latina em 2025 com apenas 29% dos deals, segundo o [LatAm VC Report 2026 da Cuantico VP](https://reports.cuanticovp.com/preliminary-findings-from-the-latam-vc-report-2026-more-capital-fewer-startups/), de 18 de fevereiro de 2026. O total regional foi de US$ 4,126 bilhões em 681 rodadas, alta de 13,8% no ano, e o Brasil sozinho levou US$ 2,032 bilhões, 52,9% da região, em 363 deals. As três maiores rodadas do ano foram todas de fintechs mexicanas.",
            "Isso é o problema e o filtro ao mesmo tempo. O Nubank e outros incumbentes já controlam loops de dados enormes, então um wrapper genérico de IA compete com eles no terreno mais forte deles e perde. Os mesmos dados mostram que o funding pre-seed caiu 40% em 2025, de US$ 110 milhões para US$ 66 milhões. O capital inicial ficou mais escasso justamente enquanto o fintech de estágio avançado disparava. Uma empresa que precisa de um mercado de seed aquecido para achar product-market fit foi construída para o ciclo errado.",
            "O caminho não é uma camada mais fina. É um workflow e um loop de dados que um generalista não consegue copiar, num vertical que os incumbentes acham pequeno demais ou operacionalmente bagunçado demais para perseguir. A defensabilidade vem de controlar uma decisão de crédito específica de ponta a ponta. Não do acesso a uma API que todo concorrente também pode chamar."
          ],
          "callout": {
            "kind": "stat",
            "text": "Fintech levou 61% do investimento de venture da América Latina em 2025 com apenas 29% dos deals, enquanto o funding pre-seed caiu 40%, de US$ 110 milhões para US$ 66 milhões.",
            "attribution": "Cuantico VP, LatAm VC Report 2026"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante abordaria",
          "level": 2,
          "paragraphs": [
            "O primeiro movimento é recusar o óbvio. Não construiríamos uma fintech de IA horizontal para brigar com o Nubank em escala de dados, porque essa é uma briga que o incumbente já venceu. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Lança 3-4 ventures por ano por meio de um sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. Aloca $500K-1.5M por venture ao longo do pre-seed e retém economia de co-founder. Aplicado a fintech, o modelo aponta um caminho. Escolher uma única decisão de crédito num vertical mal atendido, juntar um operador de domínio que viveu aquele mercado de crédito com os trilhos públicos e construir o workflow que produz um loop de dados proprietário.",
            "Os fatos estruturais tornam isso construível agora. Pix e Open Finance fornecem o acesso a dados que antes exigia uma Série A para montar. Resolver o encanamento da empresa uma vez direciona cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead. Um venture de studio é lançado 6-9 meses à frente de um time autônomo com financiamento comparável. O insumo escasso não é capital nem modelos, ambos baratos. São operadores com mais de 10 anos de cicatrizes num mercado de crédito brasileiro específico, juntos a um playbook do Vale do Silício e capital de primeiro cheque no dia um. Veja [a tese do studio](/why-avante) para entender como isso é montado.",
            "O argumento de performance do modelo é o benchmark do studio, não um histórico da Avante. A Global Startup Studio Network reporta IRR de studio de ~50% contra um ~19% padrão da indústria para o VC tradicional, cerca de 2,5x o IRR do VC tradicional em horizontes de tempo realistas. Esse é o número da GSSN para o modelo de studio, nunca o retorno realizado de uma firma específica. Onde isso pesa em fintech é o mecanismo. Numa categoria tão concorrida, a vantagem é profundidade de operador e um loop de dados, exatamente os insumos que um studio concentra.",
            "O fechamento é direto. A maioria das ideias de IA em fintech no Brasil vai fracassar, porque são wrappers sobre um trilho público que qualquer um pode chamar. As poucas que vencerem vão controlar um workflow e o dado de pagamento que ele gera. Explore [a Library](/library) para o resto de como pensamos sobre construir no Brasil."
          ]
        }
      ]
    },
    "es": {
      "title": "IA en el Fintech Brasileño: Dónde un Studio Realmente Construiría",
      "description": "La IA en fintech en Brasil supera los USD 2 mil millones hacia 2034. Pix y Open Finance movieron el moat de los rieles al crédito. Dónde construir.",
      "sections": [
        {
          "paragraphs": [
            "El mercado de IA en fintech en Brasil vale cerca de USD 457 millones hoy y se proyecta en USD 2,17 mil millones hacia 2034, según IMARC. Es un número real, y es menor de lo que la mayoría de los pitches sugiere. Lo interesante no es el tamaño. Es que Brasil opera dos piezas de infraestructura financiera pública, Pix y Open Finance, que la mayoría de los países no tiene, y mueven toda la pregunta sobre dónde una fintech de IA puede defenderse.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Somos escépticos frente a la IA en fintech como categoría, porque la mayor parte es una capa fina sobre una API bancaria sin moat. Este texto trata de las excepciones. Donde los rieles públicos, un workflow de verdad y un loop de datos propietario se combinan en algo que un generalista no puede copiar."
          ]
        },
        {
          "id": "market-size",
          "heading": "El mercado, con números fechados",
          "level": 2,
          "paragraphs": [
            "Empiece por el número honesto, no por el más optimista. IMARC dimensiona el mercado de IA en fintech en Brasil en USD 457,1 millones en 2025, creciendo a USD 2.165,7 millones hacia 2034 a un CAGR de 18,30%, según [IMARC Group](https://www.imarcgroup.com/brazil-ai-in-fintech-market). Esa porción específica de IA está dentro de un mercado fintech mayor, que IMARC estima en USD 5,5 mil millones en 2025, rumbo a USD 19,1 mil millones hacia 2034 a 14,92%, según [IMARC Group](https://www.imarcgroup.com/brazil-fintech-market). Otras casas de investigación publican una base menor. Esa variación es normal en una categoría joven, el tipo de patrón que nuestro [panorama de IA en Brasil](/library/brazil-ai-market-report-2026) traza entre verticales, y fingir que es un número cerrado es la primera señal de una lectura débil de mercado.",
            "Dos hechos sobreviven a la variación. La porción de IA está por debajo de medio mil millones de dólares hoy, así que quien vende un mercado direccionable gigante para IA en fintech en Brasil está redondeando hacia arriba. Y la capa de IA debe crecer más rápido que el mercado fintech sobre el que cabalga, 18,30% contra 14,92%. Esa diferencia es la señal. La IA está ganando participación dentro del fintech, no solo creciendo al lado.",
            "Entonces el encuadre correcto no es el tamaño del mercado. Es dónde, dentro de una categoría pequeña y de rápida composición, se construyen los negocios duraderos. El dimensionamiento es el calentamiento. La estructura es el contenido."
          ],
          "callout": {
            "kind": "stat",
            "text": "La IA en fintech en Brasil debe crecer de USD 457 millones en 2025 a USD 2,17 mil millones hacia 2034 a un CAGR de 18,30%, más rápido que el 14,92% del mercado fintech de USD 5,5 mil millones en que está inserta.",
            "attribution": "IMARC Group, 2026"
          }
        },
        {
          "id": "the-rails",
          "heading": "Por qué Pix y Open Finance cambian el juego",
          "level": 2,
          "paragraphs": [
            "Brasil es estructuralmente distinto de la mayoría de los mercados fintech, y la razón es la infraestructura pública, no el tamaño del mercado. Pix, el riel de pago instantáneo que el Banco Central do Brasil lanzó en noviembre de 2020, superó los 175 millones de usuarios hacia mayo de 2025 y lo usa el 93% de la población adulta brasileña, con un 62% que lo nombra su forma más frecuente de pagar, según [datos que resumen cifras del Banco Central](https://en.wikipedia.org/wiki/Pix_(payment_system)). En julio de 2024 ya movía cerca de R$ 2,5 billones por mes. A fines de 2024 era el 47% de todas las transacciones que no usan efectivo y el medio de pago que más creció en el año, un alza del 52%, según [reportes sobre datos del Banco Central](https://brazileconomy.com.br/financas/2025/08/pix-movimenta-r-264-trilhoes-em-2024-e-se-consolida-como-principal-meio-de-pagamento/).",
            "El precio cuenta la historia estratégica. Pix es gratis para personas físicas y cuesta 0,33% para el comercio, contra 1,13% en débito y 2,34% en crédito. Un riel tan barato y tan adoptado no se queda como diferencial. Se vuelve el piso sobre el que todos construyen.",
            "Open Finance es el riel que más importa para la IA. Brasil llegó a 62 millones de consentimientos activos de Open Finance hacia enero de 2025, un alza del 44% en el año, con cerca de 2,3 mil millones de llamadas de API exitosas cada semana, según [DPL News citando a FEBRABAN](https://dplnews.com/brasil-consentimentos-de-open-finance-chegam-a-62-milhoes-2025-marca-entrada-de-novas-funcionalidades/). Una fintech en Estados Unidos o Europa gasta años y mucho dinero armando el acceso a datos que una fintech brasileña puede solicitar mediante un consentimiento estandarizado. Ese es el giro. Cuando los rieles son públicos y compartidos, los rieles no son la ventaja. La ventaja migra a lo que la empresa hace con el dato. Calidad de crédito y profundidad de workflow se vuelven el moat. La plomería de pagos no."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brasil llegó a 62 millones de consentimientos activos de Open Finance hacia enero de 2025, un alza del 44% en el año, con cerca de 2,3 mil millones de llamadas de API por semana.",
            "attribution": "FEBRABAN, vía DPL News"
          }
        },
        {
          "id": "where-to-build",
          "heading": "Las aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "Las aberturas que valen la pena perseguir comparten una forma. Cada una convierte la capa de datos estandarizada de Brasil en una decisión que antes exigía un experto humano o una base de datos propietaria densa. Cuatro se destacan.",
            "El hilo conductor corre por debajo de las cuatro. El riel es público, pero el loop de datos no. Dos empresas pueden solicitar el mismo consentimiento de Open Finance. Solo una convierte seis meses de resultados de pago en un modelo más afilado y en un workflow que el cliente no va a abandonar. Esa asimetría es donde se esconde el negocio duradero, así que lea cada abertura de abajo como un lugar para construir un loop, no una funcionalidad."
          ],
          "bullets": [
            "Crédito y análisis de riesgo en perfiles delgados. Decenas de millones de brasileños y pequeñas empresas casi no tienen historial formal de crédito. El consentimiento de Open Finance sumado a los datos de flujo de caja de Pix permite a un modelo dar crédito a un solicitante que el score de buró rechazaría. El moat es el dato de pago que el prestamista acumula, no el modelo en sí.",
            "Fraude y PLD. Pix moviendo cerca de R$ 2,5 billones por mes creó una superficie de fraude en tiempo real. IA que puntúa transacciones y marca lavado contra rieles en vivo es un workflow que tanto los incumbentes como los reguladores quieren.",
            "Tesorería y conciliación. Las empresas brasileñas funcionan sobre una maraña de Pix, boletos, tarjetas y un régimen tributario en capas. IA que concilia flujos y proyecta caja contra los rieles reales reemplaza el trabajo de planilla que nunca escaló.",
            "Finanzas embebidas para pymes. Los servicios son cerca del 70% del PIB brasileño, en su mayoría pequeños operadores. Embeber crédito y pagos dentro del software que esas empresas ya usan convierte una herramienta vertical en un motor de datos financieros."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Por qué el crédito encaja en el flywheel dato a capital",
          "level": 2,
          "paragraphs": [
            "El crédito es el caso canónico del [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel), el patrón recurrente entre las empresas de Avante. La mecánica es limpia. Construya un copilot de IA que ayuda a un prestamista o a un solicitante a llegar a una decisión de crédito. El copilot genera datos propietarios de desempeño, cada préstamo aprobado y luego pagado o en mora. Ese dato de resultado es exactamente lo que un vehículo de capital necesita para dar crédito a escala. Entonces el copilot no solo vende software. Fabrica la base de datos que justifica levantar y desplegar un fondo.",
            "Por eso el crédito gira el flywheel con más fuerza que el fraude o la conciliación. El puntaje de fraude produce señales. La conciliación produce eficiencia. El crédito produce resultados de pago, y un resultado de pago es un activo financiero. Una empresa que controla el workflow de crédito y [el efecto de red de datos que este genera](/library/data-network-effects-vertical-ai) puede pasar de vender una herramienta a desplegar capital contra su propia ventaja.",
            "Avante corre este patrón en todo el portafolio, y lo único que cambia es el vertical. Alphajuri lo corre en el mercado brasileño de deuda judicial, donde un copilot para precatorios y créditos genera el dato para valorar esos activos. WIR corre la misma lógica en valoración de seguros y análisis de riesgo. BR Auction Intel lo corre en inteligencia de subastas inmobiliarias. Mismo flywheel, activo distinto."
          ]
        },
        {
          "id": "crowded-and-regulated",
          "heading": "El problema de saturación y regulación",
          "level": 2,
          "paragraphs": [
            "La objeción honesta es que fintech es la categoría más saturada y más regulada de América Latina, y una capa fina de IA sobre una API bancaria no tiene moat. Los datos de funding confirman la saturación. Fintech capturó el 61% de toda la inversión de venture de América Latina en 2025 con apenas el 29% de los deals, según el [LatAm VC Report 2026 de Cuantico VP](https://reports.cuanticovp.com/preliminary-findings-from-the-latam-vc-report-2026-more-capital-fewer-startups/), del 18 de febrero de 2026. El total regional fue de USD 4,126 mil millones en 681 rondas, un alza del 13,8% en el año, y Brasil solo se llevó USD 2,032 mil millones, el 52,9% de la región, en 363 deals. Las tres mayores rondas del año fueron todas de fintechs mexicanas.",
            "Eso es el problema y el filtro a la vez. Nubank y otros incumbentes ya controlan loops de datos enormes, así que un wrapper genérico de IA compite con ellos en su terreno más fuerte y pierde. Los mismos datos muestran que el funding pre-seed cayó 40% en 2025, de USD 110 millones a USD 66 millones. El capital inicial se volvió más escaso justo cuando el fintech de etapa avanzada se disparaba. Una empresa que necesita un mercado de seed caliente para encontrar product-market fit fue construida para el ciclo equivocado.",
            "El camino no es una capa más fina. Es un workflow y un loop de datos que un generalista no puede copiar, en un vertical que los incumbentes consideran demasiado pequeño o demasiado desordenado operativamente para perseguir. La defensibilidad viene de controlar una decisión de crédito específica de punta a punta. No del acceso a una API que todo competidor también puede llamar."
          ],
          "callout": {
            "kind": "stat",
            "text": "Fintech se llevó el 61% de la inversión de venture de América Latina en 2025 con apenas el 29% de los deals, mientras el funding pre-seed cayó 40%, de USD 110 millones a USD 66 millones.",
            "attribution": "Cuantico VP, LatAm VC Report 2026"
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante lo abordaría",
          "level": 2,
          "paragraphs": [
            "El primer movimiento es rechazar el obvio. No construiríamos una fintech de IA horizontal para pelear con Nubank en escala de datos, porque esa es una pelea que el incumbente ya ganó. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Lanza 3-4 ventures por año mediante un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Despliega $500K-1.5M por venture a lo largo del pre-seed y retiene economía de co-founder. Aplicado a fintech, el modelo apunta a un solo camino. Elegir una sola decisión de crédito en un vertical mal atendido, juntar a un operador de dominio que vivió ese mercado de crédito con los rieles públicos y construir el workflow que produce un loop de datos propietario.",
            "Los hechos estructurales lo hacen construible ahora. Pix y Open Finance entregan el acceso a datos que antes exigía una Serie A para armar. Resolver la plomería de la empresa una sola vez direcciona cerca de $300K-500K de capital efectivo por venture hacia producto y tracción en lugar de overhead. Un venture de studio se lanza 6-9 meses por delante de un equipo autónomo con financiamiento comparable. El insumo escaso no es capital ni modelos, ambos baratos. Son operadores con más de 10 años de cicatrices en un mercado de crédito brasileño específico, junto a un playbook de Silicon Valley y capital de primer cheque el día uno. Vea [la tesis del studio](/why-avante) para entender cómo se arma eso.",
            "El argumento de desempeño del modelo es el benchmark del studio, no un historial de Avante. La Global Startup Studio Network reporta un IRR de studio de ~50% contra un ~19% estándar de la industria para el VC tradicional, cerca de 2,5x el IRR del VC tradicional en horizontes de tiempo realistas. Ese es el número de GSSN para el modelo de studio, nunca el retorno realizado de una firma específica. Donde pesa en fintech es el mecanismo. En una categoría tan saturada, la ventaja es profundidad de operador y un loop de datos, exactamente los insumos que un studio concentra.",
            "El cierre es directo. La mayoría de las ideas de IA en fintech en Brasil van a fracasar, porque son wrappers sobre un riel público que cualquiera puede llamar. Las pocas que ganen van a controlar un workflow y el dato de pago que este genera. Explore [la Library](/library) para el resto de cómo pensamos sobre construir en Brasil."
          ]
        }
      ]
    }
  },
  {
    "slug": "brazil-receivables-automation-ai-opportunity",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "9 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/brazil-receivables-automation-ai-opportunity.png",
    "isPublished": true,
    "en": {
      "title": "AI Receivables Automation in Brazil: A Quiet, Fundable Build",
      "description": "Brazil receivables automation heads toward USD 591 million by 2033. A dense payments stack makes it a clean data-to-fund flywheel. Here is the build.",
      "sections": [
        {
          "paragraphs": [
            "The Brazil accounts receivable automation market is sized somewhere between USD 147 million and USD 591 million by the early 2030s, depending on which analyst you trust. That spread is the first honest thing to say about it. The sizing is not the reason to build. The reason is underneath the number.",
            "Brazil runs on a dense, regulated payments stack that emits structured transaction data almost no other market produces. AI receivables automation in Brazil is interesting because that data is the raw material for a financing loop, not because collections software is a large software line. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and receivables is one of the cleanest expressions of the pattern we build for."
          ]
        },
        {
          "id": "market-size",
          "heading": "The market, with dated numbers",
          "level": 2,
          "paragraphs": [
            "Analyst estimates of the Brazil accounts receivable automation market diverge by roughly 4x, so reporting the range is the only honest move. Grand View Research projects the market toward USD 591.1 million by 2033 at a 14.1% CAGR, per [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/accounts-receivable-automation-market/brazil). IMARC Group is far more conservative, putting it at USD 66.15 million in 2025 and USD 146.96 million by 2034 at a 9.27% CAGR, per [IMARC Group](https://www.imarcgroup.com/brazil-accounts-receivable-automation-market).",
            "Both agree on direction and double-digit growth. They disagree on the base, which is what happens to any category buried inside ERPs and banks where the software line is hard to isolate. So treat the AR software market as real but modest. The money is not in selling collections software at category-average margins. It is in what the software learns while it runs.",
            "The demand signal is louder than the market estimate. Toku, an AR automation startup founded in 2020, raised a USD 48 million Series A in April 2025 led by Oak HC/FT, explicitly to expand across Brazil, Mexico, and Chile, per [PYMNTS](https://www.pymnts.com/accounts-receivable/2025/toku-raises-48-million-to-expand-ar-automation-platform-in-latin-america/). It already serves more than 450 enterprises across insurance, credit, education, real estate, and utilities. A generalist growth-equity firm writing that check into LATAM receivables is the market saying the category is fundable. Services are roughly 70% of Brazilian GDP, per IBGE, and [that under-digitized services economy](/library/brazil-services-economy-opportunity) is full of firms that all run on receivables."
          ],
          "callout": {
            "kind": "stat",
            "text": "Estimates of the Brazil AR automation market range from USD 147 million by 2034 to USD 591 million by 2033. The AR startup Toku raised a USD 48 million Series A in April 2025 to expand in Brazil, Mexico, and Chile.",
            "attribution": "Grand View Research, IMARC Group, PYMNTS"
          }
        },
        {
          "id": "the-stack",
          "heading": "Why the Brazilian payments stack is the asset",
          "level": 2,
          "paragraphs": [
            "Brazil has built one of the most instrumented payments environments on earth in under a decade, and instrumentation is exactly what makes AI useful. Most markets force a fintech to reconstruct payment behavior from messy bank feeds. Brazil hands it over as registered data.",
            "Start with Pix, the central bank instant-payment rail launched in November 2020. By August 2024 it had accumulated 168.15 million users, 153.11 million individuals and 15.04 million companies, and set a single-day record of 227.1 million transactions on September 6, 2024, per [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2024-09/pix-breaks-record-and-exceeds-227-million-transactions-one-day). Across 2024 Pix moved about R$ 26 trillion, up 54% on the prior year, per [CNN Brasil](https://www.cnnbrasil.com.br/economia/financas/pix-cresce-54-e-atinge-recorde-de-transacoes-em-r-26-tri-em-2024/). It clears at 0.22% of transaction value against 2.2% for credit cards, per the [BIS](https://www.bis.org/publ/qtrpdf/r_qt2403c.htm).",
            "Then the receivables layer, which is the part most foreign observers miss. Brazil treats trade receivables as registered, depositable, tradable instruments. The duplicata escritural regime, grounded in Law 13.775/2018 and tightened by Resolução BCB 339 in 2023, requires emission, registration, and central deposit of electronic duplicatas through authorized registries, per [Conjur](https://www.conjur.com.br/2025-set-14/resolucao-339-do-bc-disciplina-o-instituto-da-duplicata-escritural/). Card receivables already register through entities like CERC and B3.",
            "The scale of the underlying asset is the headline. The duplicata market moves about R$ 10 trillion per year in Brazil, and only 10% of those titles are effectively traded, per [B3](https://www.b3.com.br/pt_br/noticias/duplicatas-8AA8D0CC9851DC300198CCDE8E2018B7.htm), which became an authorized registry in November 2024. Ninety percent of a R$ 10 trillion flow sits outside active financing. Stack the layers and every B2B transaction in Brazil leaves a structured, timestamped, regulator-grade trail. That trail is the asset."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brazil's duplicata market moves about R$ 10 trillion a year, and only 10% of those titles are effectively traded. Pix moved roughly R$ 26 trillion in 2024 across 168 million users.",
            "attribution": "B3, Agência Brasil, CNN Brasil"
          }
        },
        {
          "id": "where-to-build",
          "heading": "The AI-native openings",
          "level": 2,
          "paragraphs": [
            "There are four places an AI-native receivables venture can build. The point is that they compound into one system rather than sitting as four separate features."
          ],
          "bullets": [
            "Predictive collections and dunning. Use payment-behavior history to predict which invoices will slip and to sequence outreach by channel and timing per payer. Brazil is a WhatsApp-first collections market, so well-timed automated dunning is a real wedge, not a cosmetic one.",
            "Cash application and reconciliation. Match incoming Pix, boleto, and card settlements to open invoices automatically. This is the unglamorous core Toku already sells, and it is the data-capture layer for everything above it.",
            "Credit and risk scoring on payment behavior. A payer who always settles a boleto two days late behaves differently from one who pays on Pix the same day. Registered receivables plus settlement history is a credit signal a competitor cannot buy off the shelf.",
            "Embedded receivables finance. Once the system knows who pays and when, it can underwrite advances against registered duplicatas at the point of need. The asset is already registered and depositable, so the legal plumbing exists."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Collections copilot to receivables finance",
          "level": 2,
          "paragraphs": [
            "The cleanest version of [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel) lives in receivables. Ship a collections copilot that does real work, reconciling settlements and running smart dunning. Operators adopt it because it gets them paid faster, not because it is AI.",
            "That copilot then accumulates proprietary payment-behavior data on thousands of payers, the exact structured signal Brazil's registered-receivables regime makes legible. That data underwrites a receivables-financing vehicle that advances cash against the very duplicatas the copilot already tracks. The software earns the data. The data underwrites the capital. The capital deepens the moat.",
            "This is the same shape Avante has built in adjacent Brazilian domains where regulated financial and legal-asset workflows throw off fundable data loops. Alphajuri runs it in judicial assets, a copilot for precatórios and claims. WIR runs it in insurance pricing and risk. BR Auction Intel runs it in real estate auction data. Receivables may be the purest version, because the asset is already registered, already standardized, and already worth R$ 10 trillion a year in flow."
          ],
          "callout": {
            "kind": "tip",
            "text": "The test for this build is not model accuracy. It is whether the copilot earns enough payment-behavior data to underwrite the financing vehicle that follows it."
          }
        },
        {
          "id": "distribution-problem",
          "heading": "Why distribution and trust decide it",
          "level": 2,
          "paragraphs": [
            "The honest failure mode is not model quality. It is distribution and trust, and a builder who ignores that loses to incumbents with worse technology.",
            "AR automation is a feature inside larger ERPs like Totvs and SAP and a service banks already bundle. Switching costs in finance operations are high, because reconciliation sits on top of the accounting close and nobody rips that out casually. Selling to conservative Brazilian finance teams is slow. A CFO does not adopt a collections tool off a demo. They adopt it after a referral, a pilot, and a quarter of clean reconciliations.",
            "So the moat is not the model. It is the wedge that earns adoption, the data that adoption produces, and the trust that lets a young company move money. Toku reinforces the point. It raised growth equity on 450 enterprise relationships and live ERP-to-bank integrations, not on a novel algorithm. In receivables, distribution is the technology."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante would approach it",
          "level": 2,
          "paragraphs": [
            "Receivables automation is a textbook studio build, because the hard parts here are operator-grade, not engineering-grade. The scarce input is a founder with 10+ years of Brazilian-market scar tissue in payments, credit, or finance operations, someone who knows how a Brazilian CFO actually buys and how the duplicata regime actually clears.",
            "Avante pairs that operator with a Silicon Valley playbook and first-ticket capital on day one, deploying $500K-1.5M per venture and retaining co-founder economics. The venture runs the six-stage system, Research, Partner, Build, Traction, Revenue, Compound, and reaches first revenue 6-9 months ahead of a comparably funded standalone team.",
            "The model is grounded in returns, not optimism. The Global Startup Studio Network reports venture-studio IRR near ~50% versus roughly ~19% for traditional VC, about 2.5x over realistic horizons. That is the GSSN studio-model benchmark, not Avante's own realized return. Avante launches 3-4 ventures per year, and a Brazilian receivables venture is exactly the profile it is built to launch, an AI-native company in [a regulated, data-rich, services-heavy market](/library/brazil-ai-market-report-2026). Read more on [why a venture studio](/why-avante) or browse related market reads in the [Avante Library](/library). The data loop is the moat. The demo is not."
          ]
        }
      ]
    },
    "pt": {
      "title": "Automação de Recebíveis com IA no Brasil: um Build Silencioso e Financiável",
      "description": "A automação de recebíveis no Brasil caminha para US$ 591 milhões até 2033. Um stack de pagamentos denso a torna um flywheel limpo de dado para capital.",
      "sections": [
        {
          "paragraphs": [
            "O mercado de automação de contas a receber no Brasil é estimado entre US$ 147 milhões e US$ 591 milhões no início da próxima década, a depender do analista em quem você confia. Esse intervalo é a primeira coisa honesta a se dizer sobre ele. O tamanho não é a razão para construir. A razão está embaixo do número.",
            "O Brasil roda sobre um stack de pagamentos denso e regulado que gera dados de transação estruturados como quase nenhum outro mercado produz. A automação de recebíveis com IA no Brasil interessa porque esse dado é a matéria-prima de um ciclo de financiamento, e não porque software de cobrança seja uma linha de receita grande. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e recebíveis é uma das expressões mais limpas do padrão que construímos."
          ]
        },
        {
          "id": "market-size",
          "heading": "O mercado, com números datados",
          "level": 2,
          "paragraphs": [
            "As estimativas de analistas para o mercado brasileiro de automação de contas a receber divergem em cerca de 4x, então reportar o intervalo é o único movimento honesto. A Grand View Research projeta o mercado rumo a US$ 591,1 milhões até 2033, a um CAGR de 14,1%, segundo a [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/accounts-receivable-automation-market/brazil). O IMARC Group é bem mais conservador, colocando-o em US$ 66,15 milhões em 2025 e US$ 146,96 milhões até 2034, a um CAGR de 9,27%, segundo o [IMARC Group](https://www.imarcgroup.com/brazil-accounts-receivable-automation-market).",
            "Os dois concordam na direção e no crescimento de dois dígitos. Divergem na base, o que acontece com qualquer categoria enterrada dentro de ERPs e bancos, onde a linha de software é difícil de isolar. Então trate o mercado de software de cobrança como real, mas modesto. O dinheiro não está em vender software de cobrança a margens médias da categoria. Está no que o software aprende enquanto roda.",
            "O sinal de demanda é mais alto que a estimativa de mercado. A Toku, uma startup de automação de recebíveis fundada em 2020, levantou uma Série A de US$ 48 milhões em abril de 2025, liderada pela Oak HC/FT, explicitamente para expandir por Brasil, México e Chile, segundo o [PYMNTS](https://www.pymnts.com/accounts-receivable/2025/toku-raises-48-million-to-expand-ar-automation-platform-in-latin-america/). Ela já atende mais de 450 empresas em seguros, crédito, educação, imobiliário e utilities. Uma firma generalista de growth equity assinando esse cheque em recebíveis na América Latina é o mercado dizendo que a categoria é financiável. Serviços são cerca de 70% do PIB brasileiro, segundo o IBGE, e [essa economia de serviços pouco digitalizada](/library/brazil-services-economy-opportunity) está cheia de empresas que rodam sobre recebíveis."
          ],
          "callout": {
            "kind": "stat",
            "text": "As estimativas para o mercado brasileiro de automação de recebíveis vão de US$ 147 milhões até 2034 a US$ 591 milhões até 2033. A startup Toku levantou uma Série A de US$ 48 milhões em abril de 2025 para expandir em Brasil, México e Chile.",
            "attribution": "Grand View Research, IMARC Group, PYMNTS"
          }
        },
        {
          "id": "the-stack",
          "heading": "Por que o stack de pagamentos brasileiro é o ativo",
          "level": 2,
          "paragraphs": [
            "O Brasil construiu um dos ambientes de pagamento mais instrumentados do planeta em menos de uma década, e instrumentação é exatamente o que torna a IA útil. A maioria dos mercados obriga uma fintech a reconstruir o comportamento de pagamento a partir de extratos bancários bagunçados. O Brasil entrega isso como dado registrado.",
            "Comece pelo Pix, o trilho de pagamento instantâneo do banco central lançado em novembro de 2020. Até agosto de 2024 ele havia acumulado 168,15 milhões de usuários, 153,11 milhões de pessoas físicas e 15,04 milhões de empresas, e marcou um recorde de 227,1 milhões de transações em um único dia, em 6 de setembro de 2024, segundo a [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2024-09/pix-breaks-record-and-exceeds-227-million-transactions-one-day). Em 2024 o Pix movimentou cerca de R$ 26 trilhões, alta de 54% sobre o ano anterior, segundo a [CNN Brasil](https://www.cnnbrasil.com.br/economia/financas/pix-cresce-54-e-atinge-recorde-de-transacoes-em-r-26-tri-em-2024/). Ele liquida a 0,22% do valor da transação contra 2,2% do cartão de crédito, segundo o [BIS](https://www.bis.org/publ/qtrpdf/r_qt2403c.htm).",
            "Depois vem a camada de recebíveis, a parte que a maioria dos observadores estrangeiros não enxerga. O Brasil trata recebíveis comerciais como instrumentos registrados, depositáveis e negociáveis. O regime da duplicata escritural, ancorado na Lei 13.775/2018 e endurecido pela Resolução BCB 339 de 2023, exige emissão, registro e depósito centralizado de duplicatas eletrônicas em registradoras autorizadas, segundo o [Conjur](https://www.conjur.com.br/2025-set-14/resolucao-339-do-bc-disciplina-o-instituto-da-duplicata-escritural/). Recebíveis de cartão já registram em entidades como CERC e B3.",
            "A escala do ativo subjacente é a manchete. O mercado de duplicatas movimenta cerca de R$ 10 trilhões por ano no Brasil, e apenas 10% desses títulos são efetivamente negociados, segundo a [B3](https://www.b3.com.br/pt_br/noticias/duplicatas-8AA8D0CC9851DC300198CCDE8E2018B7.htm), que virou registradora autorizada em novembro de 2024. Noventa por cento de um fluxo de R$ 10 trilhões está fora do financiamento ativo. Empilhe as camadas e cada transação B2B no Brasil deixa um rastro estruturado, com data e hora, em grau regulatório. Esse rastro é o ativo."
          ],
          "callout": {
            "kind": "stat",
            "text": "O mercado de duplicatas no Brasil movimenta cerca de R$ 10 trilhões por ano, e apenas 10% desses títulos são efetivamente negociados. O Pix movimentou cerca de R$ 26 trilhões em 2024 com 168 milhões de usuários.",
            "attribution": "B3, Agência Brasil, CNN Brasil"
          }
        },
        {
          "id": "where-to-build",
          "heading": "As aberturas AI-native",
          "level": 2,
          "paragraphs": [
            "Há quatro lugares onde uma empresa AI-native de recebíveis pode construir. O ponto é que eles se acumulam em um único sistema, em vez de ficarem como quatro recursos separados."
          ],
          "bullets": [
            "Cobrança e dunning preditivos. Use o histórico de comportamento de pagamento para prever quais faturas vão atrasar e para sequenciar a abordagem por canal e horário, payer a payer. O Brasil é um mercado de cobrança WhatsApp-first, então um dunning automático e bem cronometrado é uma cunha de verdade, não cosmética.",
            "Aplicação de caixa e reconciliação. Concilie automaticamente Pix, boleto e liquidações de cartão com faturas em aberto. É o núcleo pouco glamouroso que a Toku já vende, e é a camada de captura de dado para tudo acima dele.",
            "Crédito e score de risco sobre comportamento de pagamento. Um pagador que sempre liquida um boleto dois dias atrasado se comporta diferente de um que paga no Pix no mesmo dia. Recebível registrado mais histórico de liquidação é um sinal de crédito que o concorrente não compra pronto na prateleira.",
            "Antecipação de recebíveis embarcada. Quando o sistema sabe quem paga e quando, ele pode subscrever adiantamentos contra duplicatas registradas no ponto da necessidade. O ativo já está registrado e depositável, então o encanamento jurídico existe."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Do copilot de cobrança à antecipação de recebíveis",
          "level": 2,
          "paragraphs": [
            "A versão mais limpa do [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel) vive em recebíveis. Lance um copilot de cobrança que faz trabalho de verdade, conciliando liquidações e rodando dunning inteligente. Operadores adotam porque ele os faz receber mais rápido, não porque é IA.",
            "Esse copilot então acumula dado proprietário de comportamento de pagamento sobre milhares de pagadores, exatamente o sinal estruturado que o regime brasileiro de recebíveis registrados torna legível. Esse dado subscreve um veículo de antecipação de recebíveis que adianta caixa contra as próprias duplicatas que o copilot já acompanha. O software ganha o dado. O dado subscreve o capital. O capital aprofunda o moat.",
            "É o mesmo formato que a Avante construiu em domínios brasileiros adjacentes, onde fluxos financeiros e jurídicos regulados geram ciclos de dado financiáveis. A Alphajuri roda isso em ativos judiciais, um copilot para precatórios e claims. A WIR roda em precificação e risco de seguros. A BR Auction Intel roda em dados de leilões imobiliários. Recebíveis talvez seja a versão mais pura, porque o ativo já está registrado, já é padronizado e já vale R$ 10 trilhões por ano em fluxo."
          ],
          "callout": {
            "kind": "tip",
            "text": "O teste deste build não é a acurácia do modelo. É se o copilot conquista dado de comportamento de pagamento suficiente para subscrever o veículo de antecipação que vem depois dele."
          }
        },
        {
          "id": "distribution-problem",
          "heading": "Por que distribuição e confiança decidem",
          "level": 2,
          "paragraphs": [
            "O modo de falha honesto não é a qualidade do modelo. É distribuição e confiança, e quem ignora isso perde para incumbentes com tecnologia pior.",
            "Automação de recebíveis é um recurso dentro de ERPs maiores como Totvs e SAP e um serviço que bancos já empacotam. O custo de troca em operações financeiras é alto, porque a reconciliação fica em cima do fechamento contábil e ninguém arranca isso por capricho. Vender para times financeiros brasileiros conservadores é lento. Um CFO não adota uma ferramenta de cobrança a partir de uma demo. Ele adota depois de uma indicação, de um piloto e de um trimestre de reconciliações limpas.",
            "Então o moat não é o modelo. É a cunha que conquista adoção, o dado que a adoção produz e a confiança que permite a uma empresa jovem mover dinheiro. A Toku reforça o ponto. Ela levantou growth equity sobre 450 relações com empresas e integrações ERP-para-banco ao vivo, não sobre um algoritmo inédito. Em recebíveis, distribuição é a tecnologia."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante abordaria",
          "level": 2,
          "paragraphs": [
            "Automação de recebíveis é um build de studio de manual, porque as partes difíceis aqui são de operador, não de engenharia. O insumo escasso é um fundador com mais de 10 anos de calos do mercado brasileiro em pagamentos, crédito ou operações financeiras, alguém que sabe como um CFO brasileiro de fato compra e como o regime da duplicata de fato liquida.",
            "A Avante junta esse operador a um playbook de Vale do Silício e capital de primeiro cheque no dia um, aportando $500K-1.5M por empresa e retendo economia de co-founder. A empresa roda o sistema de seis estágios, Research, Partner, Build, Traction, Revenue, Compound, e chega à primeira receita 6-9 meses à frente de um time autônomo com financiamento comparável.",
            "O modelo é ancorado em retornos, não em otimismo. A Global Startup Studio Network reporta IRR de venture studio perto de ~50% contra cerca de ~19% do VC tradicional, cerca de 2,5x em horizontes realistas. Esse é o benchmark do modelo de studio da GSSN, não o retorno realizado da própria Avante. A Avante lança 3-4 empresas por ano, e uma empresa brasileira de recebíveis é exatamente o perfil que ela foi feita para lançar, uma empresa AI-native em [um mercado regulado, rico em dado e pesado em serviços](/library/brazil-ai-market-report-2026). Veja mais sobre [por que um venture studio](/why-avante) ou navegue por leituras de mercado relacionadas na [Avante Library](/library). O ciclo de dado é o moat. A demo não é."
          ]
        }
      ]
    },
    "es": {
      "title": "Automatización de Cobranzas con IA en Brasil: un Build Silencioso y Financiable",
      "description": "La automatización de cobranzas en Brasil avanza hacia USD 591 millones para 2033. Un stack de pagos denso la hace un flywheel limpio de dato a capital.",
      "sections": [
        {
          "paragraphs": [
            "El mercado de automatización de cuentas por cobrar en Brasil se estima entre USD 147 millones y USD 591 millones para inicios de la próxima década, según el analista en quien usted confíe. Ese rango es lo primero honesto que se puede decir de él. El tamaño no es la razón para construir. La razón está debajo del número.",
            "Brasil corre sobre un stack de pagos denso y regulado que genera datos de transacción estructurados como casi ningún otro mercado produce. La automatización de cobranzas con IA en Brasil importa porque ese dato es la materia prima de un ciclo de financiamiento, no porque el software de cobranza sea una línea de ingresos grande. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y cobranzas es una de las expresiones más limpias del patrón que construimos."
          ]
        },
        {
          "id": "market-size",
          "heading": "El mercado, con cifras fechadas",
          "level": 2,
          "paragraphs": [
            "Las estimaciones de analistas para el mercado brasileño de automatización de cuentas por cobrar divergen en cerca de 4x, así que reportar el rango es el único movimiento honesto. Grand View Research proyecta el mercado hacia USD 591,1 millones para 2033, a un CAGR de 14,1%, según [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/accounts-receivable-automation-market/brazil). IMARC Group es mucho más conservador, ubicándolo en USD 66,15 millones en 2025 y USD 146,96 millones para 2034, a un CAGR de 9,27%, según [IMARC Group](https://www.imarcgroup.com/brazil-accounts-receivable-automation-market).",
            "Ambos coinciden en la dirección y en el crecimiento de dos dígitos. Difieren en la base, lo que pasa con cualquier categoría enterrada dentro de ERPs y bancos, donde la línea de software es difícil de aislar. Entonces trate el mercado de software de cobranza como real pero modesto. El dinero no está en vender software de cobranza a márgenes promedio de la categoría. Está en lo que el software aprende mientras corre.",
            "La señal de demanda es más fuerte que la estimación de mercado. Toku, una startup de automatización de cuentas por cobrar fundada en 2020, levantó una Serie A de USD 48 millones en abril de 2025, liderada por Oak HC/FT, explícitamente para expandirse por Brasil, México y Chile, según [PYMNTS](https://www.pymnts.com/accounts-receivable/2025/toku-raises-48-million-to-expand-ar-automation-platform-in-latin-america/). Ya atiende a más de 450 empresas en seguros, crédito, educación, inmobiliario y utilities. Una firma generalista de growth equity firmando ese cheque en cobranzas de América Latina es el mercado diciendo que la categoría es financiable. Los servicios son cerca del 70% del PIB brasileño, según el IBGE, y [esa economía de servicios poco digitalizada](/library/brazil-services-economy-opportunity) está llena de empresas que corren sobre cuentas por cobrar."
          ],
          "callout": {
            "kind": "stat",
            "text": "Las estimaciones para el mercado brasileño de automatización de cobranzas van de USD 147 millones para 2034 a USD 591 millones para 2033. La startup Toku levantó una Serie A de USD 48 millones en abril de 2025 para expandirse en Brasil, México y Chile.",
            "attribution": "Grand View Research, IMARC Group, PYMNTS"
          }
        },
        {
          "id": "the-stack",
          "heading": "Por qué el stack de pagos brasileño es el activo",
          "level": 2,
          "paragraphs": [
            "Brasil construyó uno de los entornos de pago más instrumentados del planeta en menos de una década, y la instrumentación es exactamente lo que vuelve útil a la IA. La mayoría de los mercados obliga a una fintech a reconstruir el comportamiento de pago a partir de extractos bancarios desordenados. Brasil lo entrega como dato registrado.",
            "Empiece por Pix, el riel de pago instantáneo del banco central lanzado en noviembre de 2020. Para agosto de 2024 había acumulado 168,15 millones de usuarios, 153,11 millones de personas físicas y 15,04 millones de empresas, y marcó un récord de 227,1 millones de transacciones en un solo día, el 6 de septiembre de 2024, según [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2024-09/pix-breaks-record-and-exceeds-227-million-transactions-one-day). En 2024 Pix movió cerca de R$ 26 billones, un alza del 54% sobre el año previo, según [CNN Brasil](https://www.cnnbrasil.com.br/economia/financas/pix-cresce-54-e-atinge-recorde-de-transacoes-em-r-26-tri-em-2024/). Liquida al 0,22% del valor de la transacción contra 2,2% de la tarjeta de crédito, según el [BIS](https://www.bis.org/publ/qtrpdf/r_qt2403c.htm).",
            "Luego viene la capa de cuentas por cobrar, la parte que la mayoría de los observadores extranjeros no ve. Brasil trata las cuentas por cobrar comerciales como instrumentos registrados, depositables y negociables. El régimen de la duplicata escritural, anclado en la Ley 13.775/2018 y endurecido por la Resolución BCB 339 de 2023, exige emisión, registro y depósito centralizado de duplicatas electrónicas en registradoras autorizadas, según [Conjur](https://www.conjur.com.br/2025-set-14/resolucao-339-do-bc-disciplina-o-instituto-da-duplicata-escritural/). Las cuentas por cobrar de tarjeta ya se registran en entidades como CERC y B3.",
            "La escala del activo subyacente es el titular. El mercado de duplicatas mueve cerca de R$ 10 billones por año en Brasil, y solo el 10% de esos títulos se negocia efectivamente, según [B3](https://www.b3.com.br/pt_br/noticias/duplicatas-8AA8D0CC9851DC300198CCDE8E2018B7.htm), que se volvió registradora autorizada en noviembre de 2024. Noventa por ciento de un flujo de R$ 10 billones está fuera del financiamiento activo. Apile las capas y cada transacción B2B en Brasil deja un rastro estructurado, con fecha y hora, en grado regulatorio. Ese rastro es el activo."
          ],
          "callout": {
            "kind": "stat",
            "text": "El mercado de duplicatas en Brasil mueve cerca de R$ 10 billones por año, y solo el 10% de esos títulos se negocia efectivamente. Pix movió cerca de R$ 26 billones en 2024 con 168 millones de usuarios.",
            "attribution": "B3, Agência Brasil, CNN Brasil"
          }
        },
        {
          "id": "where-to-build",
          "heading": "Las aperturas AI-native",
          "level": 2,
          "paragraphs": [
            "Hay cuatro lugares donde una empresa AI-native de cobranzas puede construir. El punto es que se acumulan en un solo sistema, en vez de quedar como cuatro funciones separadas."
          ],
          "bullets": [
            "Cobranza y dunning predictivos. Use el historial de comportamiento de pago para predecir qué facturas se van a atrasar y para secuenciar el contacto por canal y horario, pagador por pagador. Brasil es un mercado de cobranza WhatsApp-first, así que un dunning automático y bien cronometrado es una cuña real, no cosmética.",
            "Aplicación de caja y conciliación. Concilie de forma automática Pix, boleto y liquidaciones de tarjeta con facturas abiertas. Es el núcleo poco glamoroso que Toku ya vende, y es la capa de captura de dato para todo lo de arriba.",
            "Crédito y score de riesgo sobre comportamiento de pago. Un pagador que siempre liquida un boleto dos días tarde se comporta distinto de uno que paga por Pix el mismo día. Cuenta por cobrar registrada más historial de liquidación es una señal de crédito que un competidor no compra lista en la estantería.",
            "Financiamiento de cuentas por cobrar embebido. Cuando el sistema sabe quién paga y cuándo, puede suscribir adelantos contra duplicatas registradas en el punto de necesidad. El activo ya está registrado y es depositable, así que la plomería legal existe."
          ]
        },
        {
          "id": "the-flywheel",
          "heading": "Del copilot de cobranza al financiamiento de cuentas por cobrar",
          "level": 2,
          "paragraphs": [
            "La versión más limpia del [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel) vive en cuentas por cobrar. Lance un copilot de cobranza que hace trabajo real, conciliando liquidaciones y corriendo dunning inteligente. Los operadores lo adoptan porque los hace cobrar más rápido, no porque es IA.",
            "Ese copilot luego acumula dato propietario de comportamiento de pago sobre miles de pagadores, exactamente la señal estructurada que el régimen brasileño de cuentas por cobrar registradas vuelve legible. Ese dato suscribe un vehículo de financiamiento de cuentas por cobrar que adelanta caja contra las mismas duplicatas que el copilot ya rastrea. El software gana el dato. El dato suscribe el capital. El capital profundiza el moat.",
            "Es la misma forma que Avante construyó en dominios brasileños adyacentes, donde flujos financieros y jurídicos regulados generan ciclos de dato financiables. Alphajuri lo corre en activos judiciales, un copilot para precatórios y claims. WIR lo corre en fijación de precios y riesgo de seguros. BR Auction Intel lo corre en datos de subastas inmobiliarias. Cuentas por cobrar quizá sea la versión más pura, porque el activo ya está registrado, ya está estandarizado y ya vale R$ 10 billones por año en flujo."
          ],
          "callout": {
            "kind": "tip",
            "text": "La prueba de este build no es la precisión del modelo. Es si el copilot gana suficiente dato de comportamiento de pago para suscribir el vehículo de financiamiento que viene después de él."
          }
        },
        {
          "id": "distribution-problem",
          "heading": "Por qué la distribución y la confianza deciden",
          "level": 2,
          "paragraphs": [
            "El modo de falla honesto no es la calidad del modelo. Es distribución y confianza, y quien lo ignora pierde ante incumbentes con peor tecnología.",
            "La automatización de cobranzas es una función dentro de ERPs mayores como Totvs y SAP y un servicio que los bancos ya empaquetan. El costo de cambio en operaciones financieras es alto, porque la conciliación se apoya sobre el cierre contable y nadie arranca eso por capricho. Vender a equipos financieros brasileños conservadores es lento. Un CFO no adopta una herramienta de cobranza desde una demo. La adopta tras una referencia, un piloto y un trimestre de conciliaciones limpias.",
            "Entonces el moat no es el modelo. Es la cuña que gana adopción, el dato que la adopción produce y la confianza que permite a una empresa joven mover dinero. Toku refuerza el punto. Levantó growth equity sobre 450 relaciones con empresas e integraciones ERP-a-banco en vivo, no sobre un algoritmo inédito. En cuentas por cobrar, la distribución es la tecnología."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante lo abordaría",
          "level": 2,
          "paragraphs": [
            "La automatización de cobranzas es un build de studio de manual, porque las partes difíciles aquí son de operador, no de ingeniería. El insumo escaso es un fundador con más de 10 años de cicatrices del mercado brasileño en pagos, crédito u operaciones financieras, alguien que sabe cómo compra de verdad un CFO brasileño y cómo liquida de verdad el régimen de la duplicata.",
            "Avante junta a ese operador con un playbook de Silicon Valley y capital de primer cheque desde el día uno, desplegando $500K-1.5M por empresa y reteniendo economía de co-founder. La empresa corre el sistema de seis etapas, Research, Partner, Build, Traction, Revenue, Compound, y llega a su primer ingreso 6-9 meses antes que un equipo autónomo con financiamiento comparable.",
            "El modelo está anclado en retornos, no en optimismo. La Global Startup Studio Network reporta IRR de venture studio cerca de ~50% contra cerca de ~19% del VC tradicional, alrededor de 2,5x en horizontes realistas. Ese es el benchmark del modelo de studio de la GSSN, no el retorno realizado de la propia Avante. Avante lanza 3-4 empresas por año, y una empresa brasileña de cuentas por cobrar es exactamente el perfil que está hecha para lanzar, una empresa AI-native en [un mercado regulado, rico en dato y pesado en servicios](/library/brazil-ai-market-report-2026). Lea más sobre [por qué un venture studio](/why-avante) o explore lecturas de mercado relacionadas en la [Avante Library](/library). El ciclo de dato es el moat. La demo no.",
            "El cierre es simple. En cobranzas brasileñas, quien controla el dato de pago controla el crédito."
          ]
        }
      ]
    }
  },
  {
    "slug": "brazil-services-economy-opportunity",
    "category": "brazil",
    "type": "Market Analysis",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "Brazil's Services Economy Is the Opportunity Nobody Is Building For",
      "description": "Services are roughly 70% of Brazilian GDP with low software penetration. The structural gap, the post-2021 capital reality, and why operators win it.",
      "sections": [
        {
          "paragraphs": [
            "Services account for roughly 70% of Brazilian GDP, and almost none of those firms run software built for how they actually operate. That is the Brazil startup market opportunity in one sentence. The demand has been there for years. What was missing was a way to serve millions of small, fragmented service businesses without burning a priced round to do it.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We build for the services economy on purpose, because that is where the gap between economic weight and software penetration is widest, and where local operating knowledge is the thing that actually wins."
          ]
        },
        {
          "heading": "The size and shape of the gap",
          "level": 2,
          "paragraphs": [
            "The Brazilian economy is a services economy, and services are still doing the heavy lifting on growth. Brazil grew 3.4% in 2024, its strongest year since 2021, and services grew 3.7% year over year, ahead of the 3.3% in industry, according to [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-03/brazilian-economy-grows-34-2024-highest-rise-2021). Services were the single largest contributor to that expansion.",
            "The shape underneath the number is what makes it a Brazil B2B software market and not just a statistic. This economy runs on small firms. Small businesses were 97% of all companies opened in Brazil in 2025, and the country hit a record 4.6 million new small businesses from January to November, per [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-12/brazil-reaches-record-46-million-small-businesses-2025). Services were 64% of those registrations, the largest single sector.",
            "So the buyer is a small service operator, multiplied by millions. That is exactly the segment global SaaS underserves, because the unit economics of selling to them the old way never worked. The distance between how much of GDP these firms represent and how little vertical software they run is the opening."
          ],
          "callout": {
            "kind": "stat",
            "text": "Services are roughly 70% of Brazilian GDP, and were 64% of the record 4.6 million new businesses registered in 2025.",
            "attribution": "IBGE, Agência Brasil"
          },
          "id": "market"
        },
        {
          "heading": "Why the gap has not closed",
          "level": 2,
          "paragraphs": [
            "The gap stayed open because building software for Brazilian services is genuinely hard, not because nobody noticed the prize. Three structural frictions keep generic players out.",
            "Start with tax. A Brazilian business needs about 1,501 hours a year to prepare and pay taxes, among the highest in the world, per the [World Bank](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html). Software that ignores ICMS, ISS, the layered federal and municipal regime, and the [live tax-reform transition](/library/brazilian-regulatory-complexity-as-moat) simply does not get adopted. Most global SaaS never localizes this deep.",
            "Then distribution. With small businesses at 97% of new companies and 77% of those being single-person microentrepreneurs, the buyer is small, cash-tight, and unreachable through enterprise sales motions. The bottleneck is reaching them, not convincing them they have the problem.",
            "And informality. A large share of the service economy still runs on paper, WhatsApp, and spreadsheets. The work stayed undone because it required local knowledge and a low cost to build, not because the need was soft. The wall that kept foreign incumbents out is the same wall a local operator can climb."
          ],
          "id": "why-persists"
        },
        {
          "heading": "Capital and exits, honestly",
          "level": 2,
          "paragraphs": [
            "Any honest LATAM venture opportunity has to start with the reset. Latin America saw $4.5 billion of venture capital across 751 deals in 2024, an 8% increase over 2023, per [LAVCA](https://www.lavca.org/research/2024-lavca-industry-data-analysis/). That is a recovery off a low base, not a return to the 2021 spike, which the same data describes as a peak followed by a correction.",
            "Brazil is where the regional capital concentrates. Brazil took 44% of all Latin American venture investment in 2024. So the country with about 70% of its GDP in services and a record run of new service businesses is also where most regional capital already sits.",
            "The honest read for an investor is that later-stage capital is scarcer than the 2021 hype implied and exits take longer. That is the argument for capital efficiency at formation, not against the geography. A model that needs a frothy Series A market to function is the wrong model for this cycle. A model that reaches revenue on a small first check is the right one."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brazil captured 44% of the $4.5 billion invested across Latin America in 2024.",
            "attribution": "LAVCA, data as of December 31, 2024"
          },
          "id": "capital"
        },
        {
          "heading": "The operator-depth edge",
          "level": 2,
          "paragraphs": [
            "The scarce input in Brazil is not capital or engineers. It is operators who have already lived the tax code, the labor rules, the informal distribution, and the buyer psychology of one specific service vertical. Domain operators with 10+ years of Brazilian-market scar tissue are the constraint, and you cannot recruit them cold into an unfunded idea.",
            "This is the structural case for a venture studio over a fund in this geography. A studio assembles on day one what a solo founder chases for 18 months: a domain operator who knows the vertical, a repeatable build playbook, and first-ticket capital. Pair 10+ years of local scar tissue with a Silicon Valley playbook and capital, all at once, and you have skipped the hardest year of company building.",
            "On the model itself, the Global Startup Studio Network reports studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR of traditional VC over realistic time horizons. That is the GSSN studio-model benchmark, not any one firm's realized return. Where it matters for Brazil is the mechanism. Studios concentrate scarce operator talent and shared infrastructure, and when operator depth is the binding constraint, that concentration is worth more here than almost anywhere."
          ],
          "bullets": [
            "The operator knows the vertical's tax, labor, and informal distribution cold.",
            "The playbook turns that knowledge into a product without a year of trial and error.",
            "First-ticket capital removes the fundraising delay that kills most domain founders."
          ],
          "id": "operator-edge"
        },
        {
          "heading": "Why now",
          "level": 2,
          "paragraphs": [
            "The timing rests on [one cost curve](/library/ai-infrastructure-cost-curve-latam). The cost of running an AI model of equivalent performance is falling about 10x every year, per [a16z](https://a16z.com/llmflation-llm-inference-cost/). The same analysis shows the price for a model at one capability tier dropping from $60 per million tokens in late 2021 to about $0.06 three years later, a factor of 1,000.",
            "What that does to building startups in Brazil is concrete. AI infrastructure is now cheap enough to deploy without a Series A. A vertical service copilot that needed a large team and a priced round in 2021 can now ship on a small first check. In a market where later-stage capital reset, reaching revenue before raising again is not a luxury. It is the whole game.",
            "That is why the Brazil services economy is finally addressable. The demand was always there, the operators always existed, and now the build cost has collapsed. A small, operator-led team can serve fragmented Brazilian service firms profitably for the first time."
          ],
          "id": "why-now"
        },
        {
          "heading": "How Avante operates here",
          "level": 2,
          "paragraphs": [
            "Avante launches 3-4 ventures per year through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. We deploy $500K-1.5M per venture across pre-seed and retain co-founder economics. Every stage maps to a fact above.",
            "Operator depth is the scarce input, so we partner with domain operators who carry 10+ years of Brazilian-market scar tissue. Capital reset after 2021, so solving the company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction instead of overhead. Inference cost collapsed, so ventures deploy without a Series A. A studio venture launches 6-9 months ahead of a comparably funded standalone team.",
            "The pattern that repeats is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot for a service vertical, use it to generate proprietary data, then use that data to raise and deploy capital. Alphajuri runs it in the Brazilian judicial-debt market. WIR runs it in insurance pricing and risk scoring. BR Auction Intel runs it in real estate auction intelligence.",
            "The obvious objection is survivorship bias, and it is fair. The ~50% GSSN figure counts the studios that lived, and not every venture works. Our answer is structural, not a slogan. Operating partners stay engaged through the first revenue milestone, the first check is deliberately small, and the six-stage system is built to kill weak ventures before they ever consume a priced round. The studios that win in Brazil will not be the ones with the most capital. They will be the ones with operators who already know where the bodies are buried. Read [the studio thesis](/why-avante) and the rest of [the Library](/library)."
          ],
          "id": "how-avante"
        }
      ]
    },
    "pt": {
      "title": "A Economia de Serviços do Brasil É a Oportunidade que Ninguém Está Atacando",
      "description": "Serviços são cerca de 70% do PIB brasileiro com baixa penetração de software. A lacuna estrutural, a realidade de capital e por que operadores vencem.",
      "sections": [
        {
          "paragraphs": [
            "Serviços representam cerca de 70% do PIB brasileiro, e quase nenhuma dessas empresas roda software feito para o jeito como elas de fato operam. É o mercado de startups no Brasil resumido em uma frase. A demanda existe há anos. O que faltava era uma forma de atender milhões de pequenos negócios de serviços, fragmentados, sem queimar uma rodada precificada para isso.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Construímos para a economia de serviços de propósito, porque é onde a distância entre peso econômico e penetração de software é maior, e onde o conhecimento operacional local é o que de fato vence."
          ]
        },
        {
          "heading": "O tamanho e o formato da lacuna",
          "level": 2,
          "paragraphs": [
            "A economia brasileira é uma economia de serviços, e serviços seguem puxando o crescimento. O Brasil cresceu 3,4% em 2024, o melhor ano desde 2021, e serviços cresceram 3,7% no ano, à frente dos 3,3% da indústria, segundo a [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-03/brazilian-economy-grows-34-2024-highest-rise-2021). Serviços foram o maior contribuinte isolado dessa expansão.",
            "O formato por trás do número é o que transforma isso em mercado de software B2B no Brasil, e não só em estatística. Essa economia roda sobre pequenas empresas. Pequenos negócios foram 97% de todas as empresas abertas no Brasil em 2025, e o país bateu o recorde de 4,6 milhões de novos pequenos negócios entre janeiro e novembro, segundo a [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-12/brazil-reaches-record-46-million-small-businesses-2025). Serviços foram 64% desses registros, o maior setor isolado.",
            "Então o comprador é um pequeno operador de serviços, multiplicado por milhões. É exatamente o segmento que o SaaS global mal atende, porque a economia unitária de vender para ele do jeito antigo nunca fechou. A distância entre quanto do PIB essas empresas representam e quão pouco software vertical elas usam é a abertura."
          ],
          "callout": {
            "kind": "stat",
            "text": "Serviços são cerca de 70% do PIB brasileiro e foram 64% dos 4,6 milhões de novos negócios registrados em 2025.",
            "attribution": "IBGE, Agência Brasil"
          },
          "id": "market"
        },
        {
          "heading": "Por que a lacuna não se fechou",
          "level": 2,
          "paragraphs": [
            "A lacuna ficou aberta porque construir software para serviços brasileiros é realmente difícil, não porque ninguém viu o prêmio. Três atritos estruturais mantêm os players genéricos do lado de fora.",
            "Comece pelos impostos. Uma empresa brasileira gasta cerca de 1.501 horas por ano para apurar e pagar tributos, entre as mais altas do mundo, segundo o [Banco Mundial](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html). Software que ignora ICMS, ISS, o regime federal e municipal em camadas e a [transição da reforma tributária](/library/brazilian-regulatory-complexity-as-moat) simplesmente não é adotado. A maioria do SaaS global nunca localiza tão fundo.",
            "Depois, distribuição. Com pequenos negócios em 97% das novas empresas e 77% deles sendo microempreendedores individuais de uma só pessoa, o comprador é pequeno, com caixa apertado e inalcançável por motores de venda enterprise. O gargalo é chegar até ele, não convencê-lo de que tem o problema.",
            "E a informalidade. Boa parte da economia de serviços ainda roda no papel, no WhatsApp e na planilha. O trabalho ficou por fazer porque exigia conhecimento local e custo baixo de construção, não porque a necessidade fosse fraca. O muro que manteve os incumbentes estrangeiros de fora é o mesmo muro que um operador local consegue escalar."
          ],
          "id": "why-persists"
        },
        {
          "heading": "Capital e exits, com honestidade",
          "level": 2,
          "paragraphs": [
            "Toda oportunidade de venture na América Latina honesta precisa começar pelo reset. A América Latina teve US$ 4,5 bilhões de venture capital em 751 negócios em 2024, alta de 8% sobre 2023, segundo a [LAVCA](https://www.lavca.org/research/2024-lavca-industry-data-analysis/). É recuperação a partir de uma base baixa, não retorno ao pico de 2021, que os mesmos dados descrevem como um auge seguido de correção.",
            "O Brasil é onde o capital regional se concentra. O Brasil ficou com 44% de todo o investimento de venture da América Latina em 2024. Ou seja, o país com cerca de 70% do PIB em serviços e um recorde de novos negócios de serviços é também onde a maior parte do capital regional já está.",
            "A leitura honesta para um investidor é que capital de estágio mais avançado é mais escasso do que o hype de 2021 sugeria, e os exits demoram mais. Isso é argumento a favor de eficiência de capital na formação, não contra a geografia. Um modelo que precisa de um mercado de Série A aquecido para funcionar é o modelo errado para este ciclo. Um modelo que chega à receita com um primeiro cheque pequeno é o certo."
          ],
          "callout": {
            "kind": "stat",
            "text": "O Brasil capturou 44% dos US$ 4,5 bilhões investidos na América Latina em 2024.",
            "attribution": "LAVCA, dados de 31 de dezembro de 2024"
          },
          "id": "capital"
        },
        {
          "heading": "A vantagem da profundidade de operador",
          "level": 2,
          "paragraphs": [
            "O insumo escasso no Brasil não é capital nem engenheiro. São operadores que já viveram o código tributário, as regras trabalhistas, a distribuição informal e a psicologia do comprador de um vertical de serviço específico. Operadores de domínio com mais de 10 anos de cicatrizes do mercado brasileiro são a restrição, e você não os recruta a frio para uma ideia sem capital.",
            "É o argumento estrutural a favor de um venture studio em vez de um fundo nesta geografia. Um studio monta no dia um o que um founder solo persegue por 18 meses: um operador de domínio que conhece o vertical, um playbook de construção repetível e capital de primeiro cheque. Junte mais de 10 anos de cicatriz local a um playbook de Vale do Silício e a capital, tudo de uma vez, e você pulou o ano mais difícil de construir uma empresa.",
            "Sobre o modelo em si, a Global Startup Studio Network reporta IRR de studio de ~50% contra ~19% padrão de mercado para o VC tradicional, cerca de 2,5x o IRR do VC tradicional em horizontes realistas. É o benchmark do modelo de studio da GSSN, não o retorno realizado de nenhuma firma. O que importa para o Brasil é o mecanismo. Studios concentram talento operacional escasso e infraestrutura compartilhada, e quando a profundidade de operador é a restrição que aperta, essa concentração vale mais aqui do que em quase qualquer lugar."
          ],
          "bullets": [
            "O operador domina os impostos, o trabalhista e a distribuição informal do vertical.",
            "O playbook transforma esse conhecimento em produto sem um ano de tentativa e erro.",
            "O capital de primeiro cheque elimina a espera de captação que mata a maioria dos founders de domínio."
          ],
          "id": "operator-edge"
        },
        {
          "heading": "Por que agora",
          "level": 2,
          "paragraphs": [
            "O timing se apoia em [uma curva de custo](/library/ai-infrastructure-cost-curve-latam). O custo de rodar um modelo de IA de desempenho equivalente cai cerca de 10x por ano, segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/). A mesma análise mostra o preço de um modelo em um patamar de capacidade caindo de US$ 60 por milhão de tokens no fim de 2021 para cerca de US$ 0,06 três anos depois, um fator de 1.000.",
            "O que isso faz com quem constrói startup no Brasil é concreto. A infraestrutura de IA já está barata o suficiente para colocar produto no ar sem uma Série A. Um copilot vertical de serviço que exigia um time grande e uma rodada precificada em 2021 agora sobe com um primeiro cheque pequeno. Em um mercado onde o capital de estágio avançado deu reset, chegar à receita antes de captar de novo não é luxo. É o jogo inteiro.",
            "É por isso que a economia de serviços do Brasil é finalmente endereçável. A demanda sempre esteve lá, os operadores sempre existiram, e agora o custo de construção desabou. Um time pequeno, liderado por operador, consegue atender empresas de serviço brasileiras fragmentadas com lucro pela primeira vez."
          ],
          "id": "why-now"
        },
        {
          "heading": "Como a Avante opera aqui",
          "level": 2,
          "paragraphs": [
            "A Avante lança de 3 a 4 ventures por ano através de um sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. Aportamos US$ 500K-1.5M por venture no pré-seed e mantemos economia de co-founder. Cada estágio corresponde a um fato acima.",
            "Profundidade de operador é o insumo escasso, então nos associamos a operadores de domínio com mais de 10 anos de cicatrizes do mercado brasileiro. O capital deu reset depois de 2021, então resolver o encanamento da empresa uma vez direciona cerca de US$ 300K-500K de capital efetivo por venture para produto e tração em vez de overhead. O custo de inferência desabou, então as ventures sobem sem uma Série A. Uma venture de studio nasce de 6 a 9 meses à frente de um time independente com financiamento comparável.",
            "O padrão que se repete é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construa um copilot de IA para um vertical de serviço, use-o para gerar dado proprietário e use esse dado para captar e alocar capital. A Alphajuri roda isso no mercado de dívida judicial brasileiro. A WIR roda em precificação e risco de seguros. A BR Auction Intel roda em inteligência de leilões imobiliários.",
            "A objeção óbvia é viés de sobrevivência, e é justa. O número de ~50% da GSSN conta os studios que sobreviveram, e nem toda venture dá certo. Nossa resposta é estrutural, não slogan. Os operating partners ficam engajados até o primeiro marco de receita, o primeiro cheque é deliberadamente pequeno, e o sistema de seis estágios existe para matar ventures fracas antes que consumam uma rodada precificada. Os studios que vencem no Brasil não serão os de mais capital. Serão os com operadores que já sabem onde estão enterrados os corpos. Leia [a tese do studio](/why-avante) e o resto da [Biblioteca](/library)."
          ],
          "id": "how-avante"
        }
      ]
    },
    "es": {
      "title": "La Economía de Servicios de Brasil Es la Oportunidad que Nadie Está Atacando",
      "description": "Los servicios son cerca del 70% del PIB brasileño con baja penetración de software. La brecha estructural, la realidad de capital y por qué ganan los operadores.",
      "sections": [
        {
          "paragraphs": [
            "Los servicios representan cerca del 70% del PIB brasileño, y casi ninguna de esas empresas usa software hecho para cómo realmente operan. Es el mercado de startups en Brasil resumido en una frase. La demanda lleva años ahí. Lo que faltaba era una forma de atender a millones de pequeños negocios de servicios, fragmentados, sin quemar una ronda valorada para lograrlo.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Construimos para la economía de servicios a propósito, porque ahí la distancia entre peso económico y penetración de software es la más amplia, y porque el conocimiento operativo local es lo que de verdad gana."
          ]
        },
        {
          "heading": "El tamaño y la forma de la brecha",
          "level": 2,
          "paragraphs": [
            "La economía brasileña es una economía de servicios, y los servicios siguen cargando el crecimiento. Brasil creció 3,4% en 2024, su mejor año desde 2021, y los servicios crecieron 3,7% interanual, por delante del 3,3% de la industria, según [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-03/brazilian-economy-grows-34-2024-highest-rise-2021). Los servicios fueron el mayor contribuyente individual de esa expansión.",
            "La forma detrás del número es lo que lo convierte en un mercado de software B2B en Brasil, y no solo en estadística. Esta economía corre sobre empresas pequeñas. Los pequeños negocios fueron el 97% de todas las empresas abiertas en Brasil en 2025, y el país marcó un récord de 4,6 millones de nuevos pequeños negocios entre enero y noviembre, según [Agência Brasil](https://agenciabrasil.ebc.com.br/en/economia/noticia/2025-12/brazil-reaches-record-46-million-small-businesses-2025). Los servicios fueron el 64% de esos registros, el mayor sector individual.",
            "Entonces el comprador es un pequeño operador de servicios, multiplicado por millones. Es justo el segmento que el SaaS global apenas atiende, porque la economía unitaria de venderle a la manera antigua nunca cerró. La distancia entre cuánto del PIB representan estas empresas y qué tan poco software vertical usan es la apertura."
          ],
          "callout": {
            "kind": "stat",
            "text": "Los servicios son cerca del 70% del PIB brasileño y fueron el 64% de los 4,6 millones de nuevos negocios registrados en 2025.",
            "attribution": "IBGE, Agência Brasil"
          },
          "id": "market"
        },
        {
          "heading": "Por qué la brecha no se ha cerrado",
          "level": 2,
          "paragraphs": [
            "La brecha quedó abierta porque construir software para los servicios brasileños es genuinamente difícil, no porque nadie viera el premio. Tres fricciones estructurales mantienen afuera a los jugadores genéricos.",
            "Empiece por los impuestos. Una empresa brasileña necesita cerca de 1.501 horas al año para preparar y pagar tributos, entre las más altas del mundo, según el [Banco Mundial](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html). El software que ignora el ICMS, el ISS, el régimen federal y municipal en capas y la [transición de la reforma tributaria](/library/brazilian-regulatory-complexity-as-moat) simplemente no se adopta. La mayoría del SaaS global nunca localiza tan a fondo.",
            "Luego, la distribución. Con los pequeños negocios en el 97% de las nuevas empresas y el 77% de ellos siendo microemprendedores individuales de una sola persona, el comprador es pequeño, con caja ajustada e inalcanzable por motores de venta enterprise. El cuello de botella es llegar a él, no convencerlo de que tiene el problema.",
            "Y la informalidad. Buena parte de la economía de servicios todavía corre en papel, en WhatsApp y en hojas de cálculo. El trabajo quedó sin hacer porque exigía conocimiento local y un costo bajo de construcción, no porque la necesidad fuera débil. El muro que dejó afuera a los incumbentes extranjeros es el mismo muro que un operador local sí puede escalar."
          ],
          "id": "why-persists"
        },
        {
          "heading": "Capital y exits, con honestidad",
          "level": 2,
          "paragraphs": [
            "Toda oportunidad de venture en LATAM honesta tiene que empezar por el reset. América Latina vio US$ 4.500 millones de venture capital en 751 operaciones en 2024, un alza del 8% sobre 2023, según [LAVCA](https://www.lavca.org/research/2024-lavca-industry-data-analysis/). Es recuperación desde una base baja, no un regreso al pico de 2021, que los mismos datos describen como un auge seguido de corrección.",
            "Brasil es donde se concentra el capital regional. Brasil se quedó con el 44% de toda la inversión de venture de América Latina en 2024. Así que el país con cerca del 70% de su PIB en servicios y un récord de nuevos negocios de servicios es también donde ya está la mayor parte del capital regional.",
            "La lectura honesta para un inversionista es que el capital de etapa avanzada es más escaso de lo que sugería el hype de 2021, y los exits tardan más. Eso es argumento a favor de la eficiencia de capital en la formación, no en contra de la geografía. Un modelo que necesita un mercado de Serie A caliente para funcionar es el modelo equivocado para este ciclo. Un modelo que llega a ingresos con un primer cheque pequeño es el correcto."
          ],
          "callout": {
            "kind": "stat",
            "text": "Brasil capturó el 44% de los US$ 4.500 millones invertidos en América Latina en 2024.",
            "attribution": "LAVCA, datos al 31 de diciembre de 2024"
          },
          "id": "capital"
        },
        {
          "heading": "La ventaja de la profundidad de operador",
          "level": 2,
          "paragraphs": [
            "El insumo escaso en Brasil no es capital ni ingenieros. Son operadores que ya vivieron el código tributario, las reglas laborales, la distribución informal y la psicología del comprador de un vertical de servicio específico. Operadores de dominio con más de 10 años de cicatrices del mercado brasileño son la restricción, y no se les recluta en frío para una idea sin capital.",
            "Es el argumento estructural a favor de un venture studio frente a un fondo en esta geografía. Un studio arma el día uno lo que un founder solo persigue durante 18 meses: un operador de dominio que conoce el vertical, un playbook de construcción repetible y capital de primer cheque. Junte más de 10 años de cicatriz local con un playbook de Silicon Valley y con capital, todo a la vez, y se saltó el año más difícil de construir una empresa.",
            "Sobre el modelo en sí, la Global Startup Studio Network reporta un IRR de studio de ~50% frente a ~19% estándar de la industria para el VC tradicional, cerca de 2,5x el IRR del VC tradicional en horizontes realistas. Es el benchmark del modelo de studio de GSSN, no el retorno realizado de ninguna firma. Lo que importa para Brasil es el mecanismo. Los studios concentran talento operativo escaso e infraestructura compartida, y cuando la profundidad de operador es la restricción que aprieta, esa concentración vale más aquí que en casi cualquier lugar."
          ],
          "bullets": [
            "El operador domina los impuestos, lo laboral y la distribución informal del vertical.",
            "El playbook convierte ese conocimiento en producto sin un año de prueba y error.",
            "El capital de primer cheque elimina la espera de levantamiento que mata a la mayoría de los founders de dominio."
          ],
          "id": "operator-edge"
        },
        {
          "heading": "Por qué ahora",
          "level": 2,
          "paragraphs": [
            "El timing se apoya en [una curva de costo](/library/ai-infrastructure-cost-curve-latam). El costo de correr un modelo de IA de desempeño equivalente cae cerca de 10x por año, según [a16z](https://a16z.com/llmflation-llm-inference-cost/). El mismo análisis muestra el precio de un modelo en un nivel de capacidad cayendo de US$ 60 por millón de tokens a fines de 2021 a cerca de US$ 0,06 tres años después, un factor de 1.000.",
            "Lo que eso le hace a construir startups en Brasil es concreto. La infraestructura de IA ya está suficientemente barata para desplegar sin una Serie A. Un copilot vertical de servicio que necesitaba un equipo grande y una ronda valorada en 2021 hoy sale con un primer cheque pequeño. En un mercado donde el capital de etapa avanzada hizo reset, llegar a ingresos antes de volver a levantar no es un lujo. Es el juego entero.",
            "Por eso la economía de servicios de Brasil es por fin abordable. La demanda siempre estuvo ahí, los operadores siempre existieron, y ahora el costo de construcción se desplomó. Un equipo pequeño, liderado por un operador, puede atender con ganancia a empresas de servicio brasileñas fragmentadas por primera vez."
          ],
          "id": "why-now"
        },
        {
          "heading": "Cómo opera Avante aquí",
          "level": 2,
          "paragraphs": [
            "Avante lanza de 3 a 4 ventures por año a través de un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Aportamos US$ 500K-1.5M por venture en el pre-seed y retenemos economía de co-founder. Cada etapa corresponde a un hecho de arriba.",
            "La profundidad de operador es el insumo escaso, así que nos asociamos con operadores de dominio que cargan más de 10 años de cicatrices del mercado brasileño. El capital hizo reset tras 2021, así que resolver la plomería de la empresa una vez canaliza cerca de US$ 300K-500K de capital efectivo por venture hacia producto y tracción en lugar de overhead. El costo de inferencia se desplomó, así que las ventures despliegan sin una Serie A. Una venture de studio nace de 6 a 9 meses por delante de un equipo independiente con financiamiento comparable.",
            "El patrón que se repite es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construya un copilot de IA para un vertical de servicio, úselo para generar dato propietario y use ese dato para levantar y desplegar capital. Alphajuri lo corre en el mercado de deuda judicial brasileño. WIR lo corre en precificación y riesgo de seguros. BR Auction Intel lo corre en inteligencia de subastas inmobiliarias.",
            "La objeción obvia es el sesgo de supervivencia, y es justa. El número de ~50% de GSSN cuenta los studios que sobrevivieron, y no toda venture funciona. Nuestra respuesta es estructural, no un eslogan. Los operating partners siguen comprometidos hasta el primer hito de ingresos, el primer cheque es deliberadamente pequeño, y el sistema de seis etapas existe para matar ventures débiles antes de que consuman una ronda valorada. Los studios que ganen en Brasil no serán los de más capital. Serán los que tengan operadores que ya saben dónde están enterrados los cuerpos. Lea [la tesis del studio](/why-avante) y el resto de [la Biblioteca](/library)."
          ],
          "id": "how-avante"
        }
      ]
    }
  },
  {
    "slug": "brazilian-regulatory-complexity-as-moat",
    "category": "brazil",
    "type": "Essay",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "Brazil's Regulatory Complexity Is a Moat, Not Just a Cost",
      "description": "The scar tissue of Brazilian tax, labor, and compliance keeps generalists out. Operators who lived it can encode it into software newcomers cannot copy.",
      "sections": [
        {
          "paragraphs": [
            "Brazilian companies spend up to 1,501 hours a year preparing and paying taxes, the highest tax-time burden the World Bank ever recorded for a major economy. Almost everyone reads that number as a cost. That is the mistake. For an operator who has lived the Brazil regulatory complexity moat for a decade, the same wall that costs an incumbent 188 working days a year is the wall a foreign entrant has to climb before it ships anything.",
            "Avante Ventures treats that complexity as an asset class, not a tax line. The argument is simple. Complexity a generalist software team cannot decode becomes a barrier to entry that a domain operator can encode into product."
          ]
        },
        {
          "id": "the-cost-view",
          "heading": "The complexity everyone treats as a cost",
          "level": 2,
          "paragraphs": [
            "Brazil runs the world's most complicated tax system, and the cost view stops at the hours. According to [Trading Economics, citing World Bank data](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html), companies spend 1,501 hours a year to prepare, file, and pay the corporate income tax, the value added tax, and labor taxes. That is the last value in the World Bank series and the highest of any major economy it tracked.",
            "The hours sit inside a thicket of more than 90 distinct taxes across federal, state, and municipal levels. According to [CLM Controller](https://en.clmcontroller.com.br/taxes/fiscal-complexity-in-brazil/), a Brazilian compliance firm, companies spend over 1,500 hours a year on tax compliance alone inside that 90-plus-tax system. The Brazil tax complexity startup question almost always begins here, then stalls.",
            "Stalling there misses the point. Overhead for an incumbent is a moat against a newcomer. The cost line and the barrier to entry are the same wall, read from two sides."
          ],
          "callout": {
            "kind": "stat",
            "text": "1,501 hours a year to comply with taxes in Brazil, roughly 188 working days, the highest tax-time burden the World Bank recorded for a major economy.",
            "attribution": "World Bank Doing Business, via Trading Economics"
          }
        },
        {
          "id": "the-markers",
          "heading": "What the scar tissue actually looks like",
          "level": 2,
          "paragraphs": [
            "The complexity is not one tax. It is a stack of overlapping regimes, each with its own rules, rates, and jurisdictions. Brazil's legacy consumption-tax system runs on five major taxes that an operator has to reconcile across thousands of jurisdictions.",
            "The taxes are only half of it. On top sits a digital reporting machine. SPED, the Public System of Digital Bookkeeping created in 2008, digitized tax records. According to [TMF Group](https://www.tmf-group.com/en/news-insights/articles/company-formation-administration/sped-brazil/), companies manage 12 SPED modules, including five fiscal document types and seven ancillary obligations such as eSocial, EFD-Contribuicoes, and EFD-ReInf. eSocial forces monthly submission of granular labor and payroll data, and can apply even to entities with no employees. Labor itself runs on the CLT, a rigid codified regime that governs every hire and every termination.",
            "The point for a builder is not that any single rule is hard. It is that the rules interlock. ICMS feeds the SPED filings, which feed the eSocial labor data, which sit under the CLT. Decode one and you still do not have the others."
          ],
          "bullets": [
            "ICMS is a state VAT on goods. Internal rates run from 17% to 20%, each of 27 states sets its own, with interstate rates of 4%, 7%, or 12%. Source: PwC Worldwide Tax Summaries.",
            "ISS is a municipal services tax, set independently by hundreds of municipalities, at 2% to 5% by service type.",
            "PIS and COFINS are federal contributions with cumulative and non-cumulative methods, plus higher import rates.",
            "IPI is a federal excise tax from 5% to 30%, and for some products above 300%."
          ]
        },
        {
          "id": "barrier-to-entry",
          "heading": "Complexity as a barrier to entry",
          "level": 2,
          "paragraphs": [
            "Regulatory complexity is the most underrated barrier to entry in Brazil. A foreign company or a generalist team reads 1,501 hours and 90-plus taxes as a reason to delay or to localize on the surface. A domain operator reads it as the wall that keeps competitors out. This is process power in Hamilton Helmer's sense. The knowledge is hard-won, slow to acquire, and expensive to replicate, which is what makes it defensible.",
            "It matters most in regulation-dense verticals where the rules are the product. The judicial-asset domain is one. Precatorios and court-ordered claims move through procedural rules that vary by court and by state, so pricing and verifying them means encoding years of procedural knowledge no foreign entrant carries. The insurance domain is another. Pricing and risk scoring sit on top of actuarial and regulatory constraints specific to Brazil, and a generalist API cannot price what it does not understand.",
            "In both, [the moat is not the AI model](/library/data-network-effects-vertical-ai). It is the regulatory knowledge encoded into the model. A competitor can rent the same compute tomorrow. It cannot rent ten years of having filed the forms."
          ]
        },
        {
          "id": "operator-depth",
          "heading": "Why the operator-depth edge is the unlock",
          "level": 2,
          "paragraphs": [
            "The scarce input is not capital or engineering talent. It is the operator who has lived the complexity and can encode it. This is the operator advantage Brazil rewards. Avante builds on domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled on day one. That pairing turns regulatory pain into product.",
            "The mechanism is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot that automates the hard regulatory work. Generate proprietary data from how operators actually use it. Then use that data to raise and deploy capital. The copilot only works if it encodes real procedural knowledge, which is why the operator has to be in the building, not on an advisory call.",
            "The market is large enough to pay for that depth. Services account for roughly 70% of Brazilian GDP, per IBGE, with low software penetration across most of those industries. The complexity that keeps penetration low is the same complexity that protects whoever ships the right Brazil compliance software first."
          ]
        },
        {
          "id": "where-it-holds",
          "heading": "Where the moat holds and where it does not",
          "level": 2,
          "paragraphs": [
            "The moat is real, and it is not unconditional. Naming the failure modes is what separates this from a pitch. First, complexity slows the venture itself. The same 1,501 hours that block a foreign competitor also tax the operator who is building, and encoding regulatory knowledge into software takes longer than shipping a comparable product in a simpler market.",
            "Second, the moat only holds where the rules change slowly enough to amortize the learning. That is the live risk right now. Constitutional Amendment EC 132/2023, promulgated on December 20, 2023, is the largest tax overhaul in Brazil's democratic history. According to [Vertex](https://www.vertexinc.com/resources/resource-library/brazils-tax-reform-main-changes-you-need-know), it replaces PIS and COFINS with a federal CBS and ICMS and ISS with a state-and-municipal IBS, a dual VAT phased in from 2026 to 2032 with full effect in 2033. During the transition the old and new taxes coexist, so complexity gets worse before it gets simpler.",
            "A reform that truly simplifies the system could, in theory, erode a complexity moat. In the near term the reverse is closer to true. A seven-year transition where two systems run in parallel deepens the knowledge premium, because now an operator has to master both at once. The moat holds where the operator keeps relearning faster than the newcomer can start. This is the regulatory moat LATAM founders should be underwriting, not avoiding."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante builds inside the complexity",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. Where a generalist sees 1,501 hours and 90-plus taxes, the studio sees the wall that protects whoever encodes the knowledge first. The thesis treats Brazilian regulatory complexity as the reason to build, not the reason to wait.",
            "Each venture runs through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. Operating partners stay engaged through the first revenue milestone, then move to board-level oversight. Avante launches 3-4 ventures per year and deploys $500K-$1.5M per venture across pre-seed, retaining co-founder economics. Solving the company plumbing once routes roughly $300K-$500K of effective capital per venture into product instead of overhead.",
            "The model is built for hard markets. According to the Global Startup Studio Network (GSSN), venture studios produce a studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x over realistic time horizons. That edge compounds hardest exactly where the domain is hardest to enter. Brazil's complexity is not the obstacle to the thesis. It is the proof of it. See how that conviction shapes the [studio thesis](/why-avante), or read related market analysis in the [Library](/library)."
          ]
        }
      ]
    },
    "pt": {
      "title": "A Complexidade Regulatória do Brasil É um Moat, Não Só um Custo",
      "description": "As cicatrizes do tributário, do trabalhista e do compliance brasileiros barram generalistas. Operadores que viveram isso codificam tudo em software que recém-chegados não copiam.",
      "sections": [
        {
          "paragraphs": [
            "Empresas no Brasil gastam até 1.501 horas por ano para apurar e pagar impostos, o maior peso de tempo tributário que o Banco Mundial já registrou em uma grande economia. Quase todo mundo lê esse número como custo. Esse é o erro. Para quem vive a complexidade regulatória Brasil moat há uma década, o mesmo muro que custa 188 dias úteis ao incumbente é o muro que um entrante estrangeiro precisa escalar antes de entregar qualquer coisa.",
            "A Avante Ventures trata essa complexidade como classe de ativo, não como linha de custo. O argumento é direto. A complexidade que um time de software generalista não decodifica vira barreira de entrada que um operador de domínio consegue codificar em produto."
          ]
        },
        {
          "id": "the-cost-view",
          "heading": "A complexidade que todo mundo trata como custo",
          "level": 2,
          "paragraphs": [
            "O Brasil opera o sistema tributário mais complicado do mundo, e a leitura de custo para nas horas. Segundo a [Trading Economics, com dados do Banco Mundial](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html), as empresas gastam 1.501 horas por ano para apurar, declarar e pagar o imposto de renda corporativo, o imposto sobre valor agregado e os tributos trabalhistas. Esse é o último valor da série do Banco Mundial e o mais alto entre as grandes economias acompanhadas.",
            "As horas vivem dentro de um emaranhado de mais de 90 tributos distintos nos níveis federal, estadual e municipal. Segundo a [CLM Controller](https://en.clmcontroller.com.br/taxes/fiscal-complexity-in-brazil/), firma brasileira de compliance, as empresas gastam mais de 1.500 horas por ano só com obrigações tributárias dentro desse sistema de mais de 90 tributos. A pergunta sobre complexidade tributária Brasil startup quase sempre começa aqui, e aí empaca.",
            "Empacar aí é perder o ponto. O custo do incumbente é o moat contra o recém-chegado. A linha de custo e a barreira de entrada são o mesmo muro, lido de dois lados."
          ],
          "callout": {
            "kind": "stat",
            "text": "1.501 horas por ano para cumprir obrigações tributárias no Brasil, cerca de 188 dias úteis, o maior peso de tempo tributário que o Banco Mundial registrou em uma grande economia.",
            "attribution": "Banco Mundial Doing Business, via Trading Economics"
          }
        },
        {
          "id": "the-markers",
          "heading": "Como a cicatriz realmente se parece",
          "level": 2,
          "paragraphs": [
            "A complexidade não é um imposto. É uma pilha de regimes sobrepostos, cada um com suas próprias regras, alíquotas e jurisdições. O sistema legado de tributos sobre consumo roda sobre cinco grandes impostos que o operador precisa conciliar entre milhares de jurisdições.",
            "Os impostos são só metade. Em cima vem a máquina de obrigações acessórias digitais. O SPED, o Sistema Público de Escrituração Digital criado em 2008, digitalizou os registros fiscais. Segundo a [TMF Group](https://www.tmf-group.com/en/news-insights/articles/company-formation-administration/sped-brazil/), as empresas administram 12 módulos do SPED, incluindo cinco tipos de documento fiscal e sete obrigações acessórias como eSocial, EFD-Contribuições e EFD-ReInf. O eSocial exige envio mensal de dados granulares de folha e trabalho, e pode valer até para entidades sem empregados. O próprio trabalho roda sobre a CLT, um regime rígido e codificado que governa cada contratação e cada demissão.",
            "Para quem constrói, o ponto não é que uma regra isolada seja difícil. É que as regras se entrelaçam. O ICMS alimenta as escriturações do SPED, que alimentam os dados trabalhistas do eSocial, que ficam sob a CLT. Você decodifica uma e ainda não tem as outras."
          ],
          "bullets": [
            "ICMS é um IVA estadual sobre mercadorias. Alíquotas internas vão de 17% a 20%, cada um dos 27 estados define a sua, com alíquotas interestaduais de 4%, 7% ou 12%. Fonte: PwC Worldwide Tax Summaries.",
            "ISS é um tributo municipal sobre serviços, definido de forma independente por centenas de municípios, de 2% a 5% conforme o tipo de serviço.",
            "PIS e COFINS são contribuições federais com métodos cumulativo e não cumulativo, além de alíquotas mais altas na importação.",
            "IPI é um imposto federal de 5% a 30%, e para alguns produtos acima de 300%."
          ]
        },
        {
          "id": "barrier-to-entry",
          "heading": "Complexidade como barreira de entrada",
          "level": 2,
          "paragraphs": [
            "A complexidade regulatória é a barreira de entrada mais subestimada do Brasil. Uma empresa estrangeira ou um time generalista lê 1.501 horas e mais de 90 tributos como motivo para adiar ou para localizar só na superfície. O operador de domínio lê como o muro que mantém concorrentes do lado de fora. Isso é process power no sentido de Hamilton Helmer. O conhecimento é difícil de obter, lento de acumular e caro de replicar, e é exatamente isso que o torna defensável.",
            "Pesa mais em setores densos de regulação, onde a regra é o produto. O domínio de ativos judiciais é um exemplo. Precatórios e créditos judiciais correm por regras processuais que variam por tribunal e por estado, então precificar e validar esses ativos exige codificar anos de conhecimento processual que nenhum entrante estrangeiro carrega. O domínio de seguros é outro. Precificação e risk scoring assentam sobre restrições atuariais e regulatórias próprias do Brasil, e uma API generalista não precifica o que não entende.",
            "Nos dois casos, [o moat não é o modelo de IA](/library/data-network-effects-vertical-ai). É o conhecimento regulatório codificado dentro do modelo. O concorrente aluga o mesmo poder de computação amanhã. Ele não aluga dez anos de ter preenchido as guias."
          ]
        },
        {
          "id": "operator-depth",
          "heading": "Por que a profundidade de operador é a chave",
          "level": 2,
          "paragraphs": [
            "O insumo escasso não é capital nem talento de engenharia. É o operador que viveu a complexidade e sabe codificá-la. Essa é a vantagem de operador Brasil premia. A Avante constrói sobre operadores de domínio com mais de 10 anos de cicatriz do mercado brasileiro, combinados com um playbook de Vale do Silício e capital de primeiro cheque, montados desde o dia um. Essa combinação transforma dor regulatória em produto.",
            "O mecanismo é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construa um copilot de IA que automatiza o trabalho regulatório pesado. Gere dado proprietário a partir de como os operadores de fato usam a ferramenta. Depois use esse dado para captar e alocar capital. O copilot só funciona se codificar conhecimento processual real, e por isso o operador precisa estar dentro da empresa, não numa call de conselho.",
            "O mercado é grande o bastante para pagar por essa profundidade. Serviços representam cerca de 70% do PIB brasileiro, segundo o IBGE, com baixa penetração de software na maioria desses setores. A complexidade que mantém a penetração baixa é a mesma que protege quem entrega primeiro o software de compliance Brasil certo."
          ]
        },
        {
          "id": "where-it-holds",
          "heading": "Onde o moat se sustenta e onde não",
          "level": 2,
          "paragraphs": [
            "O moat é real, e não é incondicional. Nomear os modos de falha é o que separa isso de um pitch. Primeiro, a complexidade atrasa a própria empresa. As mesmas 1.501 horas que barram o concorrente estrangeiro também pesam sobre o operador que está construindo, e codificar conhecimento regulatório em software leva mais tempo do que entregar um produto comparável em um mercado mais simples.",
            "Segundo, o moat só se sustenta onde as regras mudam devagar o bastante para amortizar o aprendizado. Esse é o risco vivo agora. A Emenda Constitucional 132/2023, promulgada em 20 de dezembro de 2023, é a maior reforma tributária da história democrática do Brasil. Segundo a [Vertex](https://www.vertexinc.com/resources/resource-library/brazils-tax-reform-main-changes-you-need-know), ela substitui PIS e COFINS por uma CBS federal e ICMS e ISS por um IBS estadual e municipal, um IVA dual implantado de 2026 a 2032 com vigência plena em 2033. Na transição, os tributos antigos e novos coexistem, então a complexidade piora antes de simplificar.",
            "Uma reforma que de fato simplifique o sistema poderia, em tese, erodir um moat de complexidade. No curto prazo o oposto está mais perto da verdade. Uma transição de sete anos com dois sistemas rodando em paralelo aprofunda o prêmio do conhecimento, porque agora o operador precisa dominar os dois ao mesmo tempo. O moat se sustenta onde o operador reaprende mais rápido do que o recém-chegado consegue começar. Esse é o moat regulatório América Latina que fundadores deveriam subscrever, não evitar."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante constrói dentro da complexidade",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Onde um generalista vê 1.501 horas e mais de 90 tributos, o studio vê o muro que protege quem codifica o conhecimento primeiro. A tese trata a complexidade regulatória brasileira como o motivo para construir, não o motivo para esperar.",
            "Cada empresa passa por um sistema de seis estágios: Research, Partner, Build, Traction, Revenue, Compound. Os operating partners ficam engajados até o primeiro marco de receita e depois migram para a supervisão de conselho. A Avante lança 3-4 ventures por ano e aloca $500K-$1.5M por empresa no pre-seed, mantendo economia de co-founder. Resolver o encanamento da empresa uma vez direciona cerca de $300K-$500K de capital efetivo por venture para produto em vez de overhead.",
            "O modelo foi feito para mercados difíceis. Segundo o Global Startup Studio Network (GSSN), venture studios entregam um IRR de studio de ~50% contra ~19% padrão da indústria para o VC tradicional, cerca de 2.5x em horizontes realistas. Essa vantagem se compõe com mais força justamente onde o domínio é mais difícil de entrar. A complexidade do Brasil não é o obstáculo à tese. É a prova dela. Veja como essa convicção molda a [tese do studio](/why-avante), ou leia análises de mercado relacionadas na [Library](/library)."
          ]
        }
      ]
    },
    "es": {
      "title": "La Complejidad Regulatoria de Brasil Es un Moat, No Solo un Costo",
      "description": "Las cicatrices del régimen tributario, laboral y de compliance brasileño dejan fuera a los generalistas. El operador que las vivió las codifica en software que nadie copia rápido.",
      "sections": [
        {
          "paragraphs": [
            "Las empresas en Brasil dedican hasta 1.501 horas al año a preparar y pagar impuestos, la mayor carga de tiempo tributario que el Banco Mundial registró en una economía grande. Casi todos leen ese número como un costo. Ese es el error. Para el operador que ha vivido la complejidad regulatoria Brasil moat durante una década, el mismo muro que le cuesta 188 días hábiles al incumbente es el muro que un entrante extranjero tiene que escalar antes de entregar nada.",
            "Avante Ventures trata esa complejidad como una clase de activo, no como una línea de costo. El argumento es directo. La complejidad que un equipo de software generalista no decodifica se vuelve una barrera de entrada que el operador de dominio sí puede codificar en producto."
          ]
        },
        {
          "id": "the-cost-view",
          "heading": "La complejidad que todos tratan como costo",
          "level": 2,
          "paragraphs": [
            "Brasil opera el sistema tributario más complicado del mundo, y la lectura de costo se detiene en las horas. Según [Trading Economics, con datos del Banco Mundial](https://tradingeconomics.com/brazil/time-to-prepare-and-pay-taxes-hours-wb-data.html), las empresas dedican 1.501 horas al año a preparar, declarar y pagar el impuesto a la renta corporativo, el impuesto al valor agregado y los tributos laborales. Ese es el último valor de la serie del Banco Mundial y el más alto entre las economías grandes que midió.",
            "Las horas viven dentro de una maraña de más de 90 tributos distintos en los niveles federal, estatal y municipal. Según [CLM Controller](https://en.clmcontroller.com.br/taxes/fiscal-complexity-in-brazil/), una firma brasileña de compliance, las empresas gastan más de 1.500 horas al año solo en obligaciones tributarias dentro de ese sistema de más de 90 tributos. La pregunta sobre complejidad tributaria Brasil startup casi siempre empieza aquí, y ahí se estanca.",
            "Estancarse ahí es perder el punto. El costo del incumbente es el moat contra el recién llegado. La línea de costo y la barrera de entrada son el mismo muro, leído desde dos lados."
          ],
          "callout": {
            "kind": "stat",
            "text": "1.501 horas al año para cumplir con los impuestos en Brasil, cerca de 188 días hábiles, la mayor carga de tiempo tributario que el Banco Mundial registró en una economía grande.",
            "attribution": "Banco Mundial Doing Business, vía Trading Economics"
          }
        },
        {
          "id": "the-markers",
          "heading": "Cómo se ve realmente la cicatriz",
          "level": 2,
          "paragraphs": [
            "La complejidad no es un impuesto. Es una pila de regímenes superpuestos, cada uno con sus propias reglas, tasas y jurisdicciones. El sistema heredado de tributos al consumo corre sobre cinco grandes impuestos que el operador debe conciliar entre miles de jurisdicciones.",
            "Los impuestos son solo la mitad. Encima viene la máquina de obligaciones digitales. El SPED, el Sistema Público de Contabilidad Digital creado en 2008, digitalizó los registros fiscales. Según [TMF Group](https://www.tmf-group.com/en/news-insights/articles/company-formation-administration/sped-brazil/), las empresas administran 12 módulos del SPED, incluyendo cinco tipos de documento fiscal y siete obligaciones accesorias como eSocial, EFD-Contribuições y EFD-ReInf. El eSocial exige envío mensual de datos granulares de nómina y trabajo, y puede aplicar incluso a entidades sin empleados. El trabajo mismo corre sobre la CLT, un régimen laboral rígido y codificado que gobierna cada contratación y cada despido.",
            "Para quien construye, el punto no es que una regla aislada sea difícil. Es que las reglas se entrelazan. El ICMS alimenta las declaraciones del SPED, que alimentan los datos laborales del eSocial, que quedan bajo la CLT. Decodificas una y todavía no tienes las otras."
          ],
          "bullets": [
            "ICMS es un IVA estatal sobre mercancías. Las tasas internas van de 17% a 20%, cada uno de los 27 estados fija la suya, con tasas interestatales de 4%, 7% o 12%. Fuente: PwC Worldwide Tax Summaries.",
            "ISS es un tributo municipal sobre servicios, fijado de forma independiente por cientos de municipios, de 2% a 5% según el tipo de servicio.",
            "PIS y COFINS son contribuciones federales con métodos acumulativo y no acumulativo, más tasas mayores en la importación.",
            "IPI es un impuesto federal de 5% a 30%, y para algunos productos por encima de 300%."
          ]
        },
        {
          "id": "barrier-to-entry",
          "heading": "La complejidad como barrera de entrada",
          "level": 2,
          "paragraphs": [
            "La complejidad regulatoria es la barrera de entrada más subestimada de Brasil. Una empresa extranjera o un equipo generalista lee 1.501 horas y más de 90 tributos como una razón para postergar o para localizar solo en la superficie. El operador de dominio lo lee como el muro que mantiene afuera a los competidores. Esto es process power en el sentido de Hamilton Helmer. El conocimiento es difícil de ganar, lento de acumular y caro de replicar, y eso es exactamente lo que lo vuelve defendible.",
            "Pesa más en sectores densos de regulación, donde la regla es el producto. El dominio de activos judiciales es uno. Los precatórios y los créditos ordenados por tribunales se mueven por reglas procesales que varían por tribunal y por estado, así que precificar y verificar esos activos exige codificar años de conocimiento procesal que ningún entrante extranjero carga. El dominio de seguros es otro. La precificación y el risk scoring se asientan sobre restricciones actuariales y regulatorias propias de Brasil, y una API generalista no puede precificar lo que no entiende.",
            "En los dos casos, [el moat no es el modelo de IA](/library/data-network-effects-vertical-ai). Es el conocimiento regulatorio codificado dentro del modelo. Un competidor renta el mismo cómputo mañana. No renta diez años de haber llenado las guías."
          ]
        },
        {
          "id": "operator-depth",
          "heading": "Por qué la profundidad de operador es la llave",
          "level": 2,
          "paragraphs": [
            "El insumo escaso no es el capital ni el talento de ingeniería. Es el operador que vivió la complejidad y sabe codificarla. Esa es la ventaja de operador Brasil premia. Avante construye sobre operadores de dominio con más de 10 años de cicatriz del mercado brasileño, combinados con un playbook de Silicon Valley y capital de primer cheque, ensamblados desde el día uno. Esa combinación convierte el dolor regulatorio en producto.",
            "El mecanismo es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construya un copilot de IA que automatiza el trabajo regulatorio pesado. Genere dato propietario a partir de cómo los operadores de verdad lo usan. Después use ese dato para levantar y desplegar capital. El copilot solo funciona si codifica conocimiento procesal real, y por eso el operador tiene que estar dentro de la empresa, no en una llamada de consejo.",
            "El mercado es lo bastante grande para pagar esa profundidad. Los servicios representan cerca de 70% del PIB brasileño, según el IBGE, con baja penetración de software en la mayoría de esos sectores. La complejidad que mantiene baja la penetración es la misma que protege a quien entrega primero el software de compliance Brasil correcto."
          ]
        },
        {
          "id": "where-it-holds",
          "heading": "Dónde se sostiene el moat y dónde no",
          "level": 2,
          "paragraphs": [
            "El moat es real, y no es incondicional. Nombrar los modos de falla es lo que separa esto de un pitch. Primero, la complejidad frena a la propia empresa. Las mismas 1.501 horas que bloquean al competidor extranjero también pesan sobre el operador que está construyendo, y codificar conocimiento regulatorio en software toma más tiempo que entregar un producto comparable en un mercado más simple.",
            "Segundo, el moat solo se sostiene donde las reglas cambian lento como para amortizar el aprendizaje. Ese es el riesgo vivo ahora. La Enmienda Constitucional 132/2023, promulgada el 20 de diciembre de 2023, es la mayor reforma tributaria de la historia democrática de Brasil. Según [Vertex](https://www.vertexinc.com/resources/resource-library/brazils-tax-reform-main-changes-you-need-know), reemplaza PIS y COFINS por una CBS federal e ICMS e ISS por un IBS estatal y municipal, un IVA dual implementado de 2026 a 2032 con vigencia plena en 2033. En la transición, los tributos viejos y nuevos coexisten, así que la complejidad empeora antes de simplificarse.",
            "Una reforma que de verdad simplifique el sistema podría, en teoría, erosionar un moat de complejidad. En el corto plazo lo contrario está más cerca de la verdad. Una transición de siete años con dos sistemas corriendo en paralelo profundiza el premio del conocimiento, porque ahora el operador tiene que dominar los dos a la vez. El moat se sostiene donde el operador reaprende más rápido de lo que el recién llegado consigue arrancar. Ese es el moat regulatorio LATAM que los fundadores deberían suscribir, no evitar."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo construye Avante dentro de la complejidad",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Donde un generalista ve 1.501 horas y más de 90 tributos, el studio ve el muro que protege a quien codifica el conocimiento primero. La tesis trata la complejidad regulatoria brasileña como la razón para construir, no la razón para esperar.",
            "Cada empresa pasa por un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Los operating partners siguen comprometidos hasta el primer hito de ingresos y luego pasan a la supervisión de consejo. Avante lanza 3-4 ventures por año y despliega $500K-$1.5M por empresa en el pre-seed, conservando economía de co-founder. Resolver la plomería de la empresa una sola vez dirige cerca de $300K-$500K de capital efectivo por venture hacia producto en lugar de overhead.",
            "El modelo está hecho para mercados difíciles. Según el Global Startup Studio Network (GSSN), los venture studios producen un IRR de studio de ~50% frente a ~19% estándar de la industria para el VC tradicional, cerca de 2.5x en horizontes realistas. Esa ventaja se compone con más fuerza justo donde el dominio es más difícil de entrar. La complejidad de Brasil no es el obstáculo a la tesis. Es la prueba de ella. Vea cómo esa convicción moldea la [tesis del studio](/why-avante), o lea análisis de mercado relacionados en la [Library](/library)."
          ]
        }
      ]
    }
  },
  {
    "slug": "copilot-to-data-to-fund-flywheel",
    "category": "ai",
    "type": "Playbook",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "The Copilot-to-Data-to-Fund Flywheel, Explained",
      "description": "Ship a copilot to mint proprietary data, then turn that data into capital. The concrete mechanism, the failure mode, and how Avante runs it.",
      "sections": [
        {
          "paragraphs": [
            "The copilot to data to fund flywheel is one idea stated three ways. Build an AI copilot that does real work in a regulation-dense vertical. Let every interaction mint structured, hard-to-source data. Then turn that data into capital, either by raising on the strength of the dataset or by deploying capital directly into the assets the data identifies.",
            "This is the recurring pattern across Avante Ventures, a venture studio building AI-native companies in Brazil and Latin America. It is not a slogan. It is a build sequence with a precise order and a single point of failure, and most teams get the order wrong. They chase the fund before the data is dense enough to price anything."
          ]
        },
        {
          "id": "the-loop",
          "heading": "The loop in one sentence",
          "level": 2,
          "paragraphs": [
            "Copilot generates data, data becomes a priced asset, the asset attracts or becomes capital, and the capital buys more usage that thickens the data. That is the whole machine. The order is not negotiable. Skip the usage and the rest is a pitch deck with no engine underneath.",
            "What makes the loop worth building in 2026 is that the first turn got cheap. The model is no longer the expensive part of an AI company, and it is no longer the durable part either. Everything that lasts has been pushed off the model and onto the data the model touches that nobody else can copy."
          ]
        },
        {
          "id": "stage-copilot",
          "heading": "Stage one: a copilot that mints data",
          "level": 2,
          "paragraphs": [
            "A copilot is AI-native only if removing the model breaks the core workflow. Run the test on any product. If it would still function as ordinary software with the model stripped out, the AI is a feature bolted on the edge. If the workflow exists only because the model does the judgment work, and the act of doing that work leaves behind labeled data, it is AI-native. The product is the data-collection instrument.",
            "The reason this is now [buildable without a Series A](/library/ai-native-without-series-a) is the inference cost collapse. Epoch AI found that the price to match GPT-4 performance on a set of PhD-level science questions fell by about 40x per year, with the median across all measured tasks around 50x per year and the fastest tasks dropping up to 900x annually. A capability that cost a fortune to run last year is a rounding error this year.",
            "The strategic consequence is blunt. If the model is nearly free and improving for everyone at once, no model is a moat. The defensibility has to live somewhere the price curve cannot reach. In this pattern it lives in the proprietary data the copilot produces while it works."
          ],
          "callout": {
            "kind": "stat",
            "text": "The price to reach GPT-4-level performance on PhD-level science questions fell about 40x per year, with the median across tasks near 50x per year. The model is the cheap part now. The data is the moat.",
            "attribution": "Epoch AI, March 2025"
          }
        },
        {
          "id": "stage-data",
          "heading": "Stage two: data becomes the moat and the asset",
          "level": 2,
          "paragraphs": [
            "Most data moats are fiction, and the sharpest takedown comes from the people who fund AI. Andreessen Horowitz put it plainly in 2019. There is generally no inherent network effect that comes from merely having more data. The economics often run the wrong way. The cost of adding unique data to your corpus may actually go up, while the value of incremental data goes down. Past a certain coverage threshold, each new slice costs more and buys less.",
            "So when is data actually defensible? a16z names the exact condition. Accumulating proprietary data is strongest when the sources are scanty or are reticent to provide data to more than one vendor. Their examples are government-regulated sources and credit bureaus. That profile, scarce data, gated by regulation, held by a party reluctant to share it twice, is the precise target of this flywheel.",
            "The working version of the effect has a name. NFX defines a [data network effect](/library/data-network-effects-vertical-ai) as the case where a product's value increases with more data and where additional usage of that product yields more of that data. The condition that matters: the data has to be central to how the product benefits users, not a side artifact. James Currier's own counterexample is the warning. Netflix improves with viewing data, but inventory drives the value, so the data effect there is only marginal.",
            "The 2025 investor consensus lands in the same place. Bessemer argues vertical AI winners will not compete on the underlying model, and the key differentiators are proprietary data, depth of integration, and economic value delivered. Insight Partners is sharper still. Earned data access creates a moat that widens with every customer onboarded, and access to specific, messy, unstandardized data remains one of the strongest moats in AI. That last clause is the real bar. Not we have data, but we have the kind of data only this copilot can generate at scale."
          ],
          "bullets": [
            "Scarce: the source is gated by regulation or by a holder reluctant to supply a second vendor.",
            "Earned in the workflow: the copilot is the only practical instrument that mints it at scale.",
            "Compounding in use: the data grows more valuable as the product is used, not as it sits in storage."
          ]
        },
        {
          "id": "stage-fund",
          "heading": "Stage three: data becomes capital",
          "level": 2,
          "paragraphs": [
            "There are two ways out of stage two, and the second is the interesting one. The first is to raise on the strength of the dataset. A proprietary, regulation-gated dataset that prices or scores an asset class is a fundraising story an off-the-shelf model cannot tell. The second is to deploy capital directly into the assets the data identifies. The dataset stops being a sales asset and becomes an origination engine.",
            "Embedded lending is the cleanest analog. The argument across fintech is that a platform sitting inside a workflow accumulates transaction and behavioral data that lets it underwrite risk better than a bank looking at the same borrower from outside. The data is the edge, and the edge gets monetized as capital deployed into credit. Data-as-collateral works the same way. A lender advances against a receivable or a claim only when someone can price the risk credibly, and a proprietary dataset is what makes that pricing believable.",
            "This is the turn most teams never reach, because it requires the data to be dense enough to bet money on. A model that is right 70 percent of the time is a fine copilot and a terrible underwriter. The capital stage is where thin data gets exposed."
          ]
        },
        {
          "id": "portfolio",
          "heading": "The pattern across Alphajuri, WIR, and BR Auction Intel",
          "level": 2,
          "paragraphs": [
            "The same loop runs in three different verticals across the Avante portfolio. Described by domain, no invented numbers.",
            "Alphajuri runs it in judicial assets. A copilot for precatorios and claims does the valuation and tracking work, and every case it processes thickens a dataset to value and fund those assets. The Brazilian context is why this works at scale. Services account for roughly 70% of Brazilian GDP with low software penetration, which means a vast surface of under-digitized, regulation-dense workflows where a copilot can mint data no incumbent holds. The precatorios market had roughly R$300 billion in unpaid court-ordered government debt outstanding, with the federal stock alone above R$140 billion in 2023, and about a quarter of pending precatorios had already changed hands in the secondary market. A market that large, that fragmented, and that hard to price is exactly where a copilot builds data no off-the-shelf model holds, and where the data can fund the assets directly.",
            "WIR runs it in insurtech, with AXA. Async pricing and risk scoring turns every underwriting interaction into a labeled pricing dataset. The output is a pricing signal a generic model cannot reproduce, because the generic model never saw the interactions. BR Auction Intel runs it in Brazilian real-estate auctions. Scrape, enrich, and score builds an auction-opportunity dataset that becomes an origination signal, routing capital toward specific properties."
          ]
        },
        {
          "id": "failure-mode",
          "heading": "Why the loop fails if the copilot goes unused",
          "level": 2,
          "paragraphs": [
            "The loop only closes if the copilot reaches enough usage to make the data dense. This is the honest weak point of the entire thesis, and pretending otherwise is how studios lose money. A copilot nobody uses produces no data, scarce or otherwise. Thin data prices nothing, scores nothing, and originates nothing, so the capital stage simply never arrives.",
            "Three concrete ways it breaks. Wrapper risk: the copilot adds too little over a raw model, so usage never builds and there is nothing to mint. Distribution risk: the data exists but the product never reaches the workflow density where the network effect kicks in, which is exactly Currier's marginal-effect warning playing out in real life. Model-dependency risk: the team mistakes the model for the moat, and when inference prices fall another 50x the supposed advantage evaporates.",
            "The discipline the flywheel demands is uncomfortable for founders who want to talk about the fund on day one. Obsess over copilot usage first. The data, the moat, and the capital are all strictly downstream of it. A studio that funds the dataset before the usage exists has bought a number that prices nothing."
          ],
          "callout": {
            "kind": "tip",
            "text": "Underwrite copilot usage before you underwrite the dataset. Scarce data is defensible, but a copilot nobody uses mints no data, and a dataset that prices nothing cannot reach the capital stage."
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante runs the flywheel",
          "level": 2,
          "paragraphs": [
            "Avante Ventures runs this as a studio, not as a portfolio of bets. It launches 3-4 ventures per year through a six-stage system: Research, Partner, Build, Traction, Revenue, Compound. It deploys $500K-1.5M per venture and retains co-founder economics. The structural edge is domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled on day one rather than recruited over the first year.",
            "The studio model and this flywheel fit for a specific reason. Solving company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction instead of overhead, which buys the copilot the runway to reach usage density before the data thesis has to prove itself. A studio venture launches 6-9 months ahead of a comparably funded standalone team, and in this pattern those months are pure data accumulation. The benchmark Avante points to is GSSN's finding that [studio IRR runs near ~50% versus ~19% for traditional VC](/library/why-venture-studios-win-latam), roughly 2.5x. That is the studio-model edge, not a claim about any single venture's return. See [/why-avante](/why-avante) for the thesis and [/principles](/principles) for how the studio operates.",
            "The flywheel is not a story about AI. It is a story about which asset survives when the model is free. The team that obsesses over the copilot ends up owning the only thing the price curve cannot copy. The team that obsesses over the fund ends up holding a dataset that prices nothing."
          ]
        }
      ]
    },
    "pt": {
      "title": "O Flywheel Copilot para Dado para Fundo, Explicado",
      "description": "Lance um copilot para cunhar dado proprietário e transforme esse dado em capital. O mecanismo, a falha e como a Avante roda isso.",
      "sections": [
        {
          "paragraphs": [
            "O flywheel copilot, dado, capital é uma ideia só, dita de três formas. Construa um copilot de IA que faça trabalho real em um vertical denso de regulação. Deixe cada interação cunhar dado estruturado e difícil de obter. Depois transforme esse dado em capital, seja captando com base na força do dataset, seja alocando capital direto nos ativos que o dado identifica.",
            "Esse é o padrão recorrente na Avante Ventures, um venture studio que constrói empresas AI-native no Brasil e na América Latina. Não é um slogan. É uma sequência de construção com ordem precisa e um único ponto de falha, e a maioria dos times erra a ordem. Eles correm atrás do fundo antes de o dado estar denso o bastante para precificar qualquer coisa."
          ]
        },
        {
          "id": "the-loop",
          "heading": "O loop em uma frase",
          "level": 2,
          "paragraphs": [
            "O copilot gera dado, o dado vira ativo precificado, o ativo atrai ou vira capital, e o capital compra mais uso que adensa o dado. É a máquina inteira. A ordem não se negocia. Pule o uso e o resto é um pitch deck sem motor embaixo.",
            "O que torna esse loop viável em 2026 é que a primeira volta ficou barata. O modelo deixou de ser a parte cara de uma empresa de IA, e deixou de ser a parte durável também. Tudo que dura foi empurrado para fora do modelo e para cima do dado que o modelo toca e que ninguém mais consegue copiar."
          ]
        },
        {
          "id": "stage-copilot",
          "heading": "Etapa um: um copilot que cunha dado",
          "level": 2,
          "paragraphs": [
            "Um copilot só é AI-native se remover o modelo quebrar o fluxo central. Aplique o teste em qualquer produto. Se ele ainda funcionaria como software comum com o modelo retirado, a IA é uma funcionalidade colada na borda. Se o fluxo existe apenas porque o modelo faz o trabalho de julgamento, e o ato de fazer esse trabalho deixa dado rotulado para trás, é AI-native. O produto é o instrumento de coleta de dado.",
            "A razão de isso ser [viável hoje sem uma Series A](/library/ai-native-without-series-a) é o colapso do custo de inferência. A Epoch AI mostrou que o preço para igualar o desempenho do GPT-4 em um conjunto de questões científicas de nível de doutorado caiu cerca de 40x por ano, com a mediana entre todas as tarefas medidas perto de 50x por ano e as tarefas mais rápidas caindo até 900x ao ano. Uma capacidade que custava uma fortuna no ano passado é arredondamento neste ano.",
            "A consequência estratégica é dura. Se o modelo é quase de graça e melhora para todo mundo ao mesmo tempo, nenhum modelo é moat. A defensibilidade precisa morar em algum lugar que a curva de preço não alcança. Nesse padrão, ela mora no dado proprietário que o copilot produz enquanto trabalha."
          ],
          "callout": {
            "kind": "stat",
            "text": "O preço para atingir o desempenho do GPT-4 em questões científicas de nível de doutorado caiu cerca de 40x por ano, com mediana entre tarefas perto de 50x por ano. O modelo é a parte barata agora. O dado é o moat.",
            "attribution": "Epoch AI, março de 2025"
          }
        },
        {
          "id": "stage-data",
          "heading": "Etapa dois: o dado vira o moat e o ativo",
          "level": 2,
          "paragraphs": [
            "A maioria dos moats de dado é ficção, e a crítica mais afiada vem de quem financia IA. A Andreessen Horowitz disse sem rodeios em 2019. Em geral não existe efeito de rede inerente que venha apenas de ter mais dado. A economia muitas vezes anda no sentido errado. O custo de adicionar dado único ao seu acervo pode subir, enquanto o valor do dado incremental cai. Passado certo limiar de cobertura, cada nova fatia custa mais e entrega menos.",
            "Então quando o dado é de fato defensável? A a16z nomeia a condição exata. Acumular dado proprietário é mais forte quando as fontes são escassas ou relutantes em fornecer dado para mais de um fornecedor. Os exemplos deles são fontes reguladas por governo e bureaus de crédito. Esse perfil, dado escasso, travado por regulação, em mãos de quem reluta em compartilhar duas vezes, é o alvo preciso deste flywheel.",
            "A versão que funciona tem nome. A NFX define um [efeito de rede de dado](/library/data-network-effects-vertical-ai) como o caso em que o valor de um produto aumenta com mais dado e em que mais uso do produto gera mais desse dado. A condição que importa: o dado precisa ser central para como o produto beneficia o usuário, não um artefato lateral. O contraexemplo do próprio James Currier é o aviso. A Netflix melhora com dado de audiência, mas o catálogo carrega o valor, então o efeito de dado ali é apenas marginal.",
            "O consenso dos investidores em 2025 chega ao mesmo ponto. A Bessemer argumenta que os vencedores de IA vertical não competirão no modelo de base, e os diferenciais-chave são dado proprietário, profundidade de integração e valor econômico entregue. A Insight Partners é ainda mais direta. Acesso a dado conquistado cria um moat que se alarga a cada cliente integrado, e o acesso a dado específico, bagunçado e não padronizado segue sendo um dos moats mais fortes em IA. Essa última frase é a régua de verdade. Não temos dado, mas temos o tipo de dado que só este copilot consegue gerar em escala."
          ],
          "bullets": [
            "Escasso: a fonte é travada por regulação ou por um detentor relutante em abastecer um segundo fornecedor.",
            "Conquistado no fluxo: o copilot é o único instrumento prático que o cunha em escala.",
            "Composto no uso: o dado fica mais valioso conforme o produto é usado, não conforme fica parado em armazenamento."
          ]
        },
        {
          "id": "stage-fund",
          "heading": "Etapa três: o dado vira capital",
          "level": 2,
          "paragraphs": [
            "Há duas saídas da etapa dois, e a segunda é a interessante. A primeira é captar com base na força do dataset. Um dataset proprietário e travado por regulação que precifica ou pontua uma classe de ativo é uma história de captação que um modelo de prateleira não consegue contar. A segunda é alocar capital direto nos ativos que o dado identifica. O dataset deixa de ser ativo de venda e vira um motor de originação.",
            "O crédito embarcado é o análogo mais limpo. O argumento no fintech é que uma plataforma dentro do fluxo acumula dado transacional e comportamental que a deixa precificar risco melhor do que um banco olhando o mesmo tomador de fora. O dado é a vantagem, e a vantagem é monetizada como capital alocado em crédito. Dado como garantia funciona igual. Um credor adianta contra um recebível ou uma ação judicial apenas quando alguém precifica o risco de forma crível, e um dataset proprietário é o que torna essa precificação confiável.",
            "Essa é a volta que a maioria dos times nunca alcança, porque exige que o dado esteja denso o bastante para apostar dinheiro. Um modelo certo 70 por cento das vezes é um bom copilot e um péssimo subscritor. A etapa de capital é onde o dado fino é exposto."
          ]
        },
        {
          "id": "portfolio",
          "heading": "O padrão em Alphajuri, WIR e BR Auction Intel",
          "level": 2,
          "paragraphs": [
            "O mesmo loop roda em três verticais diferentes no portfólio da Avante. Descrito por domínio, sem números inventados.",
            "A Alphajuri roda em ativos judiciais. Um copilot para precatórios e ações faz o trabalho de avaliação e acompanhamento, e cada caso que processa adensa um dataset para avaliar e financiar esses ativos. O contexto brasileiro é o que faz isso escalar. Serviços respondem por cerca de 70% do PIB brasileiro com baixa penetração de software, o que significa uma superfície imensa de fluxos pouco digitalizados e densos de regulação onde um copilot cunha dado que nenhum incumbente tem. O mercado de precatórios tinha cerca de R$300 bilhões em dívida pública não paga determinada por tribunal, com o estoque federal sozinho acima de R$140 bilhões em 2023, e cerca de um quarto dos precatórios pendentes já havia trocado de mãos no mercado secundário. Um mercado desse tamanho, tão fragmentado e tão difícil de precificar é exatamente onde um copilot constrói dado que nenhum modelo de prateleira tem, e onde o dado pode financiar os ativos direto.",
            "A WIR roda em insurtech, com a AXA. Precificação e scoring de risco assíncronos transformam cada interação de subscrição em um dataset rotulado de precificação. A saída é um sinal de preço que um modelo genérico não reproduz, porque o modelo genérico nunca viu as interações. A BR Auction Intel roda em leilões imobiliários brasileiros. Raspar, enriquecer e pontuar constrói um dataset de oportunidades de leilão que vira sinal de originação, direcionando capital para imóveis específicos."
          ]
        },
        {
          "id": "failure-mode",
          "heading": "Por que o loop falha se o copilot fica sem uso",
          "level": 2,
          "paragraphs": [
            "O loop só fecha se o copilot atingir uso suficiente para deixar o dado denso. Esse é o ponto fraco honesto de toda a tese, e fingir o contrário é como studios perdem dinheiro. Um copilot que ninguém usa não produz dado, escasso ou não. Dado fino não precifica nada, não pontua nada e não origina nada, então a etapa de capital simplesmente nunca chega.",
            "Três formas concretas de quebrar. Risco de wrapper: o copilot adiciona pouco demais sobre um modelo cru, então o uso nunca cresce e não há o que cunhar. Risco de distribuição: o dado existe mas o produto nunca atinge a densidade de fluxo onde o efeito de rede aparece, que é exatamente o aviso de efeito marginal de Currier acontecendo na prática. Risco de dependência de modelo: o time confunde o modelo com o moat, e quando o preço de inferência cai mais 50x a suposta vantagem evapora.",
            "A disciplina que o flywheel exige é desconfortável para fundadores que querem falar do fundo no dia um. Obcecue com o uso do copilot primeiro. O dado, o moat e o capital estão todos estritamente a jusante dele. Um studio que financia o dataset antes de o uso existir comprou um número que não precifica nada."
          ],
          "callout": {
            "kind": "tip",
            "text": "Avalie o uso do copilot antes de avaliar o dataset. Dado escasso é defensável, mas um copilot que ninguém usa não cunha dado, e um dataset que não precifica nada não chega à etapa de capital."
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante roda o flywheel",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures roda isso como um studio, não como um portfólio de apostas. Lança 3-4 ventures por ano por meio de um sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Aloca $500K-1.5M por venture e mantém economia de co-founder. A vantagem estrutural são operadores de domínio com mais de 10 anos de cicatriz do mercado brasileiro, somados a um playbook de Vale do Silício e capital de primeiro cheque, montados no dia um em vez de recrutados ao longo do primeiro ano.",
            "O modelo de studio e este flywheel se encaixam por um motivo específico. Resolver o encanamento da empresa uma vez roteia cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead, o que dá ao copilot o fôlego para atingir densidade de uso antes de a tese de dado precisar se provar. Uma venture de studio lança 6-9 meses à frente de um time autônomo com financiamento comparável, e nesse padrão esses meses são puro acúmulo de dado. O benchmark que a Avante cita é o achado da GSSN de que o [IRR de studio fica perto de ~50% contra ~19% do venture capital tradicional](/library/why-venture-studios-win-latam), cerca de 2.5x. Essa é a vantagem do modelo de studio, não uma afirmação sobre o retorno de qualquer venture isolada. Veja [/why-avante](/why-avante) para a tese e [/principles](/principles) para como o studio opera.",
            "O flywheel não é uma história sobre IA. É uma história sobre qual ativo sobrevive quando o modelo é de graça. O time que se obceca com o copilot acaba dono da única coisa que a curva de preço não copia. O time que se obceca com o fundo acaba segurando um dataset que não precifica nada."
          ]
        }
      ]
    },
    "es": {
      "title": "El Flywheel Copilot a Dato a Fondo, Explicado",
      "description": "Lanza un copilot para acuñar dato propietario y convierte ese dato en capital. El mecanismo, la falla y cómo lo corre Avante.",
      "sections": [
        {
          "paragraphs": [
            "El flywheel copilot, dato, capital es una sola idea dicha de tres formas. Construya un copilot de IA que haga trabajo real en un vertical denso en regulación. Deje que cada interacción acuñe dato estructurado y difícil de conseguir. Luego convierta ese dato en capital, ya sea levantando con base en la fuerza del dataset, ya sea desplegando capital directo en los activos que el dato identifica.",
            "Ese es el patrón recurrente en Avante Ventures, un venture studio que construye empresas AI-native en Brasil y América Latina. No es un eslogan. Es una secuencia de construcción con un orden preciso y un único punto de falla, y la mayoría de los equipos se equivoca en el orden. Corren tras el fondo antes de que el dato esté lo bastante denso para precificar algo."
          ]
        },
        {
          "id": "the-loop",
          "heading": "El loop en una frase",
          "level": 2,
          "paragraphs": [
            "El copilot genera dato, el dato se vuelve un activo precificado, el activo atrae o se vuelve capital, y el capital compra más uso que densifica el dato. Es la máquina completa. El orden no se negocia. Sáltese el uso y lo demás es un pitch deck sin motor debajo.",
            "Lo que hace viable este loop en 2026 es que la primera vuelta se abarató. El modelo dejó de ser la parte cara de una empresa de IA, y dejó de ser la parte durable también. Todo lo que perdura fue empujado fuera del modelo y encima del dato que el modelo toca y que nadie más puede copiar."
          ]
        },
        {
          "id": "stage-copilot",
          "heading": "Etapa uno: un copilot que acuña dato",
          "level": 2,
          "paragraphs": [
            "Un copilot es AI-native solo si quitar el modelo rompe el flujo central. Aplique la prueba a cualquier producto. Si seguiría funcionando como software corriente con el modelo retirado, la IA es una función pegada en el borde. Si el flujo existe solo porque el modelo hace el trabajo de juicio, y el acto de hacer ese trabajo deja dato etiquetado atrás, es AI-native. El producto es el instrumento de recolección de dato.",
            "La razón de que esto sea [viable hoy sin una Series A](/library/ai-native-without-series-a) es el colapso del costo de inferencia. Epoch AI mostró que el precio para igualar el desempeño de GPT-4 en un conjunto de preguntas científicas de nivel doctoral cayó cerca de 40x por año, con la mediana entre todas las tareas medidas cerca de 50x por año y las tareas más rápidas cayendo hasta 900x al año. Una capacidad que costaba una fortuna el año pasado es un redondeo este año.",
            "La consecuencia estratégica es dura. Si el modelo es casi gratis y mejora para todos al mismo tiempo, ningún modelo es moat. La defensibilidad tiene que vivir en algún lugar que la curva de precio no alcanza. En este patrón, vive en el dato propietario que el copilot produce mientras trabaja."
          ],
          "callout": {
            "kind": "stat",
            "text": "El precio para alcanzar el desempeño de GPT-4 en preguntas científicas de nivel doctoral cayó cerca de 40x por año, con mediana entre tareas cerca de 50x por año. El modelo es la parte barata ahora. El dato es el moat.",
            "attribution": "Epoch AI, marzo de 2025"
          }
        },
        {
          "id": "stage-data",
          "heading": "Etapa dos: el dato se vuelve el moat y el activo",
          "level": 2,
          "paragraphs": [
            "La mayoría de los moats de dato es ficción, y la crítica más afilada viene de quienes financian IA. Andreessen Horowitz lo dijo sin rodeos en 2019. En general no hay un efecto de red inherente que venga solo de tener más dato. La economía a menudo corre en sentido contrario. El costo de agregar dato único a su acervo puede subir, mientras el valor del dato incremental baja. Pasado cierto umbral de cobertura, cada nueva porción cuesta más y entrega menos.",
            "Entonces, ¿cuándo es el dato realmente defensable? a16z nombra la condición exacta. Acumular dato propietario es más fuerte cuando las fuentes son escasas o reacias a entregar dato a más de un proveedor. Sus ejemplos son fuentes reguladas por el gobierno y burós de crédito. Ese perfil, dato escaso, trabado por regulación, en manos de quien se resiste a compartirlo dos veces, es el blanco preciso de este flywheel.",
            "La versión que funciona tiene nombre. NFX define un [efecto de red de dato](/library/data-network-effects-vertical-ai) como el caso en que el valor de un producto aumenta con más dato y en que más uso del producto genera más de ese dato. La condición que importa: el dato tiene que ser central para cómo el producto beneficia al usuario, no un artefacto lateral. El propio contraejemplo de James Currier es la advertencia. Netflix mejora con dato de visualización, pero el catálogo carga el valor, así que el efecto de dato allí es apenas marginal.",
            "El consenso de los inversionistas en 2025 llega al mismo punto. Bessemer argumenta que los ganadores de IA vertical no competirán en el modelo de base, y los diferenciadores clave son dato propietario, profundidad de integración y valor económico entregado. Insight Partners es aún más directa. El acceso a dato ganado crea un moat que se ensancha con cada cliente integrado, y el acceso a dato específico, desordenado y no estandarizado sigue siendo uno de los moats más fuertes en IA. Esa última frase es la vara de verdad. No tenemos dato, sino que tenemos el tipo de dato que solo este copilot puede generar a escala."
          ],
          "bullets": [
            "Escaso: la fuente está trabada por regulación o por un tenedor reacio a abastecer a un segundo proveedor.",
            "Ganado en el flujo: el copilot es el único instrumento práctico que lo acuña a escala.",
            "Compuesto en el uso: el dato se vuelve más valioso conforme se usa el producto, no conforme queda guardado en almacenamiento."
          ]
        },
        {
          "id": "stage-fund",
          "heading": "Etapa tres: el dato se vuelve capital",
          "level": 2,
          "paragraphs": [
            "Hay dos salidas de la etapa dos, y la segunda es la interesante. La primera es levantar con base en la fuerza del dataset. Un dataset propietario y trabado por regulación que precifica o puntúa una clase de activo es una historia de levantamiento que un modelo de estante no puede contar. La segunda es desplegar capital directo en los activos que el dato identifica. El dataset deja de ser activo de venta y se vuelve un motor de originación.",
            "El crédito embebido es el análogo más limpio. El argumento en el fintech es que una plataforma dentro del flujo acumula dato transaccional y de comportamiento que la deja precificar riesgo mejor que un banco mirando al mismo deudor desde afuera. El dato es la ventaja, y la ventaja se monetiza como capital desplegado en crédito. El dato como garantía funciona igual. Un prestamista adelanta contra una cuenta por cobrar o una demanda judicial solo cuando alguien precifica el riesgo de forma creíble, y un dataset propietario es lo que hace creíble esa precificación.",
            "Esa es la vuelta que la mayoría de los equipos nunca alcanza, porque exige que el dato esté lo bastante denso para apostar dinero. Un modelo acertado el 70 por ciento de las veces es un buen copilot y un pésimo suscriptor. La etapa de capital es donde el dato delgado queda expuesto."
          ]
        },
        {
          "id": "portfolio",
          "heading": "El patrón en Alphajuri, WIR y BR Auction Intel",
          "level": 2,
          "paragraphs": [
            "El mismo loop corre en tres verticales distintos en el portafolio de Avante. Descrito por dominio, sin números inventados.",
            "Alphajuri lo corre en activos judiciales. Un copilot para precatórios y demandas hace el trabajo de valuación y seguimiento, y cada caso que procesa densifica un dataset para valuar y financiar esos activos. El contexto brasileño es lo que lo hace escalar. Los servicios representan cerca del 70% del PIB brasileño con baja penetración de software, lo que significa una superficie enorme de flujos poco digitalizados y densos en regulación donde un copilot acuña dato que ningún actor establecido tiene. El mercado de precatórios tenía cerca de R$300 mil millones en deuda pública impaga ordenada por tribunal, con el stock federal solo por encima de R$140 mil millones en 2023, y cerca de un cuarto de los precatórios pendientes ya había cambiado de manos en el mercado secundario. Un mercado de ese tamaño, tan fragmentado y tan difícil de precificar es exactamente donde un copilot construye dato que ningún modelo de estante tiene, y donde el dato puede financiar los activos directo.",
            "WIR lo corre en insurtech, con AXA. La precificación y el scoring de riesgo asíncronos convierten cada interacción de suscripción en un dataset etiquetado de precificación. La salida es una señal de precio que un modelo genérico no reproduce, porque el modelo genérico nunca vio las interacciones. BR Auction Intel lo corre en subastas inmobiliarias brasileñas. Raspar, enriquecer y puntuar construye un dataset de oportunidades de subasta que se vuelve señal de originación, dirigiendo capital hacia inmuebles específicos."
          ]
        },
        {
          "id": "failure-mode",
          "heading": "Por qué el loop falla si nadie usa el copilot",
          "level": 2,
          "paragraphs": [
            "El loop solo cierra si el copilot alcanza uso suficiente para densificar el dato. Ese es el punto débil honesto de toda la tesis, y fingir lo contrario es como los studios pierden dinero. Un copilot que nadie usa no produce dato, escaso o no. El dato delgado no precifica nada, no puntúa nada y no origina nada, así que la etapa de capital simplemente nunca llega.",
            "Tres formas concretas de quebrar. Riesgo de wrapper: el copilot agrega demasiado poco sobre un modelo crudo, así que el uso nunca crece y no hay qué acuñar. Riesgo de distribución: el dato existe pero el producto nunca alcanza la densidad de flujo donde el efecto de red aparece, que es exactamente la advertencia de efecto marginal de Currier ocurriendo en la práctica. Riesgo de dependencia del modelo: el equipo confunde el modelo con el moat, y cuando el precio de inferencia cae otras 50x la supuesta ventaja se evapora.",
            "La disciplina que el flywheel exige es incómoda para fundadores que quieren hablar del fondo el día uno. Obsesiónese con el uso del copilot primero. El dato, el moat y el capital están todos estrictamente aguas abajo de él. Un studio que financia el dataset antes de que el uso exista compró un número que no precifica nada."
          ],
          "callout": {
            "kind": "tip",
            "text": "Evalúe el uso del copilot antes de evaluar el dataset. El dato escaso es defensable, pero un copilot que nadie usa no acuña dato, y un dataset que no precifica nada no llega a la etapa de capital."
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo corre Avante el flywheel",
          "level": 2,
          "paragraphs": [
            "Avante Ventures corre esto como un studio, no como un portafolio de apuestas. Lanza 3-4 ventures por año mediante un sistema de seis etapas: Research, Partner, Build, Traction, Revenue, Compound. Despliega $500K-1.5M por venture y retiene economía de co-founder. La ventaja estructural son operadores de dominio con más de 10 años de cicatriz del mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque, ensamblados el día uno en vez de reclutados a lo largo del primer año.",
            "El modelo de studio y este flywheel encajan por una razón específica. Resolver la plomería de la empresa una sola vez enruta cerca de $300K-500K de capital efectivo por venture hacia producto y tracción en vez de overhead, lo que le da al copilot el aire para alcanzar densidad de uso antes de que la tesis de dato tenga que probarse. Una venture de studio lanza 6-9 meses por delante de un equipo independiente con financiamiento comparable, y en este patrón esos meses son puro acúmulo de dato. El benchmark que cita Avante es el hallazgo de GSSN de que el [IRR de studio ronda ~50% frente a ~19% del venture capital tradicional](/library/why-venture-studios-win-latam), cerca de 2.5x. Esa es la ventaja del modelo de studio, no una afirmación sobre el retorno de ninguna venture aislada. Vea [/why-avante](/why-avante) para la tesis y [/principles](/principles) para cómo opera el studio.",
            "El flywheel no es una historia sobre IA. Es una historia sobre qué activo sobrevive cuando el modelo es gratis. El equipo que se obsesiona con el copilot termina dueño de lo único que la curva de precio no copia. El equipo que se obsesiona con el fondo termina sosteniendo un dataset que no precifica nada."
          ]
        }
      ]
    }
  },
  {
    "slug": "data-network-effects-vertical-ai",
    "category": "ai",
    "type": "Playbook",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "Where the Moat Lives Once the Model Is a Commodity",
      "description": "Rent the model, own the moat. A playbook on proprietary data, data network effects, and process power in vertical AI, with the anti-moats to avoid.",
      "sections": [
        {
          "paragraphs": [
            "Foundation models stopped being a moat the moment inference [started falling 10x a year](/library/ai-infrastructure-cost-curve-latam). When the core capability is a utility every competitor can rent from multiple vendors, defensibility has to live somewhere the price curve cannot reach. That somewhere is data network effects, proprietary data, and process power in vertical AI.",
            "This is a playbook on where durable advantage actually sits once the model commoditizes. The short version. The model is the rented engine. The moat is what the engine is bolted to. At Avante Ventures we build for the second thing, because the first is no longer ownable."
          ]
        },
        {
          "id": "model-commoditizes",
          "heading": "The model is rented, so the moat moves",
          "level": 2,
          "paragraphs": [
            "The model commoditized because inference got cheap faster than almost any technology in history. According to [a16z](https://a16z.com/llmflation-llm-inference-cost/), for an LLM of equivalent performance the cost is dropping by 10x every year, a factor of 1,000 in three years. GPT-3-level quality went from $60 per million tokens in late 2021 to about $0.06. Independent trackers at [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends) confirm the direction, with some tasks falling 40x annually.",
            "A 10x annual price drop, available to everyone, is the definition of a utility. So the strategic question is no longer which model you use. It is what compounds around the model that a competitor with the same model and more money cannot replicate by next quarter. Three mechanisms pass that test. Read them in order of durability, and see how they connect in [/why-avante](/why-avante)."
          ],
          "callout": {
            "kind": "stat",
            "text": "For an LLM of equivalent performance, inference cost is falling 10x every year, a factor of 1,000 in three years.",
            "attribution": "a16z, Welcome to LLMflation, November 2024"
          }
        },
        {
          "id": "moat-data",
          "heading": "Proprietary data: a stock that decays",
          "level": 3,
          "paragraphs": [
            "A one-time proprietary dataset is a stock, and stocks decay. The sharpest correction to data-moat hype is still a16z's [The Empty Promise of Data Moats](https://a16z.com/the-empty-promise-of-data-moats/), which argues there generally is no inherent network effect from merely having more data. Worse, data hits diminishing returns. In their support-chatbot example, past roughly 40% query coverage the cost of adding unique data goes up while the value of each new record goes down.",
            "Data is only defensible under tight conditions. Access has to be genuinely exclusive, or accuracy in a high-stakes domain has to drive a usage-to-feedback loop. A dataset a rival can also buy or scrape is a cost line, not a moat. Owning a pile of data is a head start. The moat is whatever keeps the pile growing faster than anyone can copy it."
          ]
        },
        {
          "id": "moat-network",
          "heading": "Data network effects: the flow that compounds",
          "level": 3,
          "paragraphs": [
            "A data network effect is the durable kind because it is a flow, not a stock. Each customer's usage improves the product for the next customer, so the asset refills faster than it decays. NFX, in its [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), treats network effects as the core mechanism of defensibility and credits them with the majority of value created by technology companies.",
            "The qualifier matters, and it is where most founders fool themselves. The loop only counts when more usage measurably improves the product on a dimension the customer cares about, and when a competitor starting cold cannot match that improvement. Scale alone does not do this. A feedback loop does."
          ],
          "bullets": [
            "Scale, not a moat. A new entrant with the same model and more capital can replicate your data position within a quarter.",
            "A real flow. Your product is structurally better the longer it runs, because usage feeds an asset rivals cannot buy.",
            "The test. If a well-funded competitor cannot catch your data position by next quarter, you have a network effect, not just scale."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power and workflow lock-in",
          "level": 3,
          "paragraphs": [
            "Process power is the moat that compounds inside regulated workflows. Hamilton Helmer's [7 Powers](https://blas.com/7-powers/) defines Process Power as operational excellence plus hysteresis, the resistance that keeps a process hard to copy even when its outputs are visible. It pairs with Switching Costs, which arise when a customer values compatibility across repeated purchases from one firm over time.",
            "When an AI product becomes the system of record for a regulated process, leaving means re-validating a compliance trail, retraining staff, and re-integrating adjacent systems. The cost of leaving is the moat. This is why vertical AI beats horizontal AI. A general assistant has no workflow to anchor. A vertical product that lives inside a licensed, audited, regulation-dense process anchors deep and stays."
          ]
        },
        {
          "id": "helmer",
          "heading": "Mapping it onto 7 Powers",
          "level": 2,
          "paragraphs": [
            "Helmer's framework is useful here precisely because it forces honesty about which power you actually hold. The model is none of them. It is an input every rival shares. The durable AI moats map onto three of his seven, and the 2025 evidence backs it.",
            "According to [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), AI made building easier and defending exponentially harder, with software reaching $1 million ARR faster than ever. Their emerging-market case studies land on the same three powers. A used-car platform compounds a data flywheel from 160-plus data points per vehicle. A lender pairs a proprietary ERP with financing and holds 3% NPL versus an industry 20 to 30% through a downturn. A digital bank turns a scarce regulatory license into distribution no rival can match."
          ],
          "bullets": [
            "Network Economies. The data network effect, where each user makes the product better for the next.",
            "Process Power. Operational excellence plus hysteresis, the workflow lock-in of a system of record.",
            "Cornered Resource. A scarce license or exclusive data feed a competitor cannot rent or scrape.",
            "Switching Costs. The re-validation, retraining, and re-integration cost of leaving a regulated workflow."
          ]
        },
        {
          "id": "anti-moats",
          "heading": "The anti-moats: wrappers and buyable data",
          "level": 2,
          "paragraphs": [
            "Knowing what is not a moat is half the playbook. A thin wrapper on a public API rents the capability every competitor can rent, adds a prompt, and owns no compounding data. None of Helmer's powers apply to it. A proprietary dataset a rival can buy or scrape is a cost line wearing a moat's clothing.",
            "The other failure modes are quieter. Data scale gets mistaken for a data network effect, when more rows without a usage-driven loop is just a decaying stock. Model dependency masquerades as strategy, until a 10x annual price drop and multi-vendor availability erase it. And a clean dataset with no channel to deploy it loses to a worse dataset already living inside a workflow customers use every day."
          ],
          "callout": {
            "kind": "tip",
            "text": "Run the swap test on your own moat. If you replaced your model vendor tomorrow and your defensibility did not change, the model was never the moat. Find the loop or the workflow that survives the swap."
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante engineers the moat",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. The method is a [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to do real work inside a vertical, capture the proprietary data the work generates, then use that data asset to raise and deploy capital. The copilot is the wedge. The data network effect is the moat. The capital is the compounding.",
            "The studio deploys US$500K-1.5M per venture across a six-stage system, with GSSN data showing studio IRR of ~50% versus ~19% for traditional VC, roughly 2.5x, a benchmark for the studio model rather than a claim on Avante's own return. The full operating mechanics are at [how operating-partner economics work](/library/operating-partner-economics).",
            "The reason this works in LATAM is structural. Services account for roughly 70% of Brazilian GDP with low software penetration, the exact surface where a vertical product can become the system of record. Pair that with domain operators carrying 10+ years of Brazilian-market scar tissue, and the data compounds in places competitors cannot reach. Judicial-asset workflows and insurance risk scoring are flows, not stocks. Both are sectors we break down in [Brazil's 2026 AI market landscape](/library/brazil-ai-market-report-2026). The model will keep getting cheaper. The moat is everything you build so that no longer matters. See how we operate in [/principles](/principles)."
          ]
        }
      ]
    },
    "pt": {
      "title": "Onde Mora o Moat Quando o Modelo Vira Commodity",
      "description": "Alugue o modelo, seja dono do moat. Um playbook sobre dado proprietário, efeitos de rede de dados e process power em IA vertical, com os anti-moats a evitar.",
      "sections": [
        {
          "paragraphs": [
            "O modelo de fundação deixou de ser moat no instante em que a inferência [começou a cair 10x ao ano](/library/ai-infrastructure-cost-curve-latam). Quando a capacidade central vira utilidade que qualquer concorrente aluga de vários fornecedores, a defensibilidade precisa morar onde a curva de preço não alcança. Esse lugar é o efeito de rede de dados, o dado proprietário e o process power em IA vertical.",
            "Este é um playbook sobre onde a vantagem durável realmente fica depois que o modelo vira commodity. A versão curta. O modelo é o motor alugado. O moat é aquilo a que o motor está preso. Na Avante Ventures construímos para a segunda coisa, porque a primeira já não é algo que se possa possuir."
          ]
        },
        {
          "id": "model-commoditizes",
          "heading": "O modelo é alugado, então o moat se desloca",
          "level": 2,
          "paragraphs": [
            "O modelo virou commodity porque a inferência barateou mais rápido do que quase qualquer tecnologia da história. Segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/), para um LLM de desempenho equivalente o custo cai 10x a cada ano, um fator de 1.000 em três anos. A qualidade nível GPT-3 saiu de US$ 60 por milhão de tokens no fim de 2021 para cerca de US$ 0,06. Rastreadores independentes da [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends) confirmam a direção, com algumas tarefas caindo 40x ao ano.",
            "Uma queda de 10x ao ano, disponível para todos, é a definição de utilidade. Então a pergunta estratégica já não é qual modelo você usa. É o que se acumula ao redor do modelo que um concorrente com o mesmo modelo e mais dinheiro não consegue replicar até o próximo trimestre. Três mecanismos passam nesse teste. Leia em ordem de durabilidade, e veja como eles se conectam em [/why-avante](/why-avante)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Para um LLM de desempenho equivalente, o custo de inferência cai 10x a cada ano, um fator de 1.000 em três anos.",
            "attribution": "a16z, Welcome to LLMflation, novembro de 2024"
          }
        },
        {
          "id": "moat-data",
          "heading": "Dado proprietário: um estoque que decai",
          "level": 3,
          "paragraphs": [
            "Um dataset proprietário obtido uma única vez é um estoque, e estoque decai. A correção mais afiada ao hype do dado como moat continua sendo o texto da a16z [The Empty Promise of Data Moats](https://a16z.com/the-empty-promise-of-data-moats/), que argumenta que em geral não existe efeito de rede inerente em simplesmente ter mais dado. Pior, o dado bate em retornos decrescentes. No exemplo deles, de um chatbot de suporte, passados cerca de 40% de cobertura das perguntas o custo de adicionar dado único sobe enquanto o valor de cada novo registro cai.",
            "O dado só é defensível sob condições apertadas. O acesso precisa ser genuinamente exclusivo, ou a precisão em um domínio de alto risco precisa alimentar um loop de uso e feedback. Um dataset que um rival também pode comprar ou raspar é linha de custo, não moat. Ter uma pilha de dados é largada na frente. O moat é o que mantém a pilha crescendo mais rápido do que qualquer um consegue copiar."
          ]
        },
        {
          "id": "moat-network",
          "heading": "Efeitos de rede de dados: o fluxo que compõe",
          "level": 3,
          "paragraphs": [
            "O efeito de rede de dados é o tipo durável porque é um fluxo, não um estoque. O uso de cada cliente melhora o produto para o próximo cliente, então o ativo se reabastece mais rápido do que decai. A NFX, no seu [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), trata os efeitos de rede como o mecanismo central de defensibilidade e credita a eles a maior parte do valor criado por empresas de tecnologia.",
            "A ressalva importa, e é onde a maioria dos fundadores se engana. O loop só conta quando mais uso melhora o produto de forma mensurável numa dimensão que o cliente valoriza, e quando um concorrente começando do zero não consegue igualar essa melhora. Escala sozinha não faz isso. Um loop de feedback faz."
          ],
          "bullets": [
            "Escala, nao moat. Um novo entrante com o mesmo modelo e mais capital replica sua posicao de dado em um trimestre.",
            "Fluxo de verdade. Seu produto fica estruturalmente melhor quanto mais tempo roda, porque o uso alimenta um ativo que rivais nao compram.",
            "O teste. Se um concorrente bem financiado nao alcanca sua posicao de dado ate o proximo trimestre, voce tem efeito de rede, nao so escala."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power e lock-in de workflow",
          "level": 3,
          "paragraphs": [
            "Process power é o moat que compõe dentro de workflows regulados. O [7 Powers](https://blas.com/7-powers/) de Hamilton Helmer define Process Power como excelência operacional mais histerese, a resistência que mantém um processo difícil de copiar mesmo quando seus resultados estão à vista. Ele anda junto com os Switching Costs, que surgem quando um cliente valoriza compatibilidade entre compras repetidas de uma mesma empresa ao longo do tempo.",
            "Quando um produto de IA vira o sistema de registro de um processo regulado, sair significa revalidar uma trilha de compliance, retreinar equipe e reintegrar sistemas adjacentes. O custo de sair é o moat. É por isso que a IA vertical vence a IA horizontal. Um assistente genérico não tem workflow para ancorar. Um produto vertical que vive dentro de um processo licenciado, auditado e denso em regulação ancora fundo e permanece."
          ]
        },
        {
          "id": "helmer",
          "heading": "Mapeando isso nos 7 Powers",
          "level": 2,
          "paragraphs": [
            "O framework de Helmer é útil aqui justamente porque força honestidade sobre qual poder você de fato tem. O modelo não é nenhum deles. É um insumo que todo rival compartilha. Os moats duráveis de IA mapeiam em três dos sete poderes, e a evidência de 2025 confirma.",
            "Segundo a [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), a IA tornou o construir mais fácil e o defender exponencialmente mais difícil, com software chegando a US$ 1 milhão de ARR mais rápido do que nunca. Os estudos de caso de mercados emergentes deles caem nos mesmos três poderes. Uma plataforma de carros usados compõe um data flywheel a partir de mais de 160 pontos de dado por veículo. Um credor combina um ERP proprietário com financiamento e segura 3% de inadimplência contra 20 a 30% do setor numa retração. Um banco digital transforma uma licença regulatória escassa em distribuição que rival nenhum iguala."
          ],
          "bullets": [
            "Network Economies. O efeito de rede de dados, onde cada usuario melhora o produto para o proximo.",
            "Process Power. Excelencia operacional mais histerese, o lock-in de workflow de um sistema de registro.",
            "Cornered Resource. Uma licenca escassa ou um feed de dados exclusivo que um concorrente nao aluga nem raspa.",
            "Switching Costs. O custo de revalidacao, retreinamento e reintegracao de sair de um workflow regulado."
          ]
        },
        {
          "id": "anti-moats",
          "heading": "Os anti-moats: wrappers e dado comprável",
          "level": 2,
          "paragraphs": [
            "Saber o que não é moat é metade do playbook. Um wrapper fino sobre uma API pública aluga a capacidade que todo concorrente aluga, adiciona um prompt e não é dono de nenhum dado que compõe. Nenhum dos poderes de Helmer se aplica a ele. Um dataset proprietário que um rival pode comprar ou raspar é uma linha de custo vestida de moat.",
            "Os outros modos de falha são mais silenciosos. Escala de dado é confundida com efeito de rede de dados, quando mais linhas sem um loop dirigido por uso é apenas um estoque que decai. Dependência de modelo se disfarça de estratégia, até uma queda de 10x ao ano e a disponibilidade multi-fornecedor apagarem isso. E um dataset limpo sem canal para ser implantado perde para um dataset pior que já vive dentro de um workflow que clientes usam todo dia."
          ],
          "callout": {
            "kind": "tip",
            "text": "Rode o teste da troca no seu próprio moat. Se você trocasse de fornecedor de modelo amanhã e sua defensibilidade não mudasse, o modelo nunca foi o moat. Ache o loop ou o workflow que sobrevive à troca."
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante engenheira o moat",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. O método é um [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copilot de IA para fazer trabalho real dentro de uma vertical, capturar o dado proprietário que o trabalho gera, e usar esse ativo de dado para captar e implantar capital. O copilot é a cunha. O efeito de rede de dados é o moat. O capital é a composição.",
            "O studio implanta US$ 500K-1.5M por venture em um sistema de seis estágios, com dados da GSSN mostrando IRR de studio de ~50% contra ~19% do VC tradicional, cerca de 2.5x, um benchmark do modelo de studio e não uma afirmação sobre o retorno próprio da Avante. As mecânicas operacionais completas estão em [como a economia de parceiro operacional funciona](/library/operating-partner-economics).",
            "A razão de isso funcionar na América Latina é estrutural. Serviços respondem por cerca de 70% do PIB brasileiro com baixa penetração de software, exatamente a superfície onde um produto vertical pode virar o sistema de registro. Junte isso a operadores de domínio que carregam mais de 10 anos de cicatriz de mercado brasileiro, e o dado compõe em lugares que concorrentes não alcançam. Workflows de ativos judiciais, como precatórios e claims, e scoring de risco em seguros são fluxos, não estoques. O modelo vai continuar ficando mais barato. O moat é tudo o que você constrói para que isso deixe de importar. Veja como operamos em [/principles](/principles)."
          ]
        }
      ]
    },
    "es": {
      "title": "Dónde Vive el Moat Cuando el Modelo Es un Commodity",
      "description": "Renta el modelo, sé dueño del moat. Un playbook sobre dato propietario, efectos de red de datos y process power en IA vertical, con los anti-moats a evitar.",
      "sections": [
        {
          "paragraphs": [
            "El modelo de fundación dejó de ser un moat el instante en que la inferencia [empezó a caer 10x al año](/library/ai-infrastructure-cost-curve-latam). Cuando la capacidad central es una utilidad que cualquier competidor renta de varios proveedores, la defensibilidad tiene que vivir donde la curva de precio no llega. Ese lugar son los efectos de red de datos, el dato propietario y el process power en IA vertical.",
            "Este es un playbook sobre donde reside la ventaja durable una vez que el modelo se vuelve commodity. La versión corta. El modelo es el motor alquilado. El moat es aquello a lo que el motor está sujeto. En Avante Ventures construimos para lo segundo, porque lo primero ya no es algo que se pueda poseer."
          ]
        },
        {
          "id": "model-commoditizes",
          "heading": "El modelo es alquilado, así que el moat se mueve",
          "level": 2,
          "paragraphs": [
            "El modelo se volvió commodity porque la inferencia se abarató más rápido que casi cualquier tecnología de la historia. Según [a16z](https://a16z.com/llmflation-llm-inference-cost/), para un LLM de desempeño equivalente el costo cae 10x cada año, un factor de 1.000 en tres años. La calidad nivel GPT-3 pasó de US$ 60 por millón de tokens a fines de 2021 a cerca de US$ 0,06. Rastreadores independientes de [Epoch AI](https://epoch.ai/data-insights/llm-inference-price-trends) confirman la dirección, con algunas tareas cayendo 40x al año.",
            "Una caída de 10x al año, disponible para todos, es la definición de una utilidad. Entonces la pregunta estratégica ya no es qué modelo usa usted. Es qué se acumula alrededor del modelo que un competidor con el mismo modelo y más dinero no pueda replicar para el próximo trimestre. Tres mecanismos pasan esa prueba. Léalos en orden de durabilidad, y vea cómo se conectan en [/why-avante](/why-avante)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Para un LLM de desempeño equivalente, el costo de inferencia cae 10x cada año, un factor de 1.000 en tres años.",
            "attribution": "a16z, Welcome to LLMflation, noviembre de 2024"
          }
        },
        {
          "id": "moat-data",
          "heading": "Dato propietario: un stock que se deprecia",
          "level": 3,
          "paragraphs": [
            "Un dataset propietario obtenido una sola vez es un stock, y los stocks se deprecian. La corrección más afilada al hype del dato como moat sigue siendo el texto de a16z [The Empty Promise of Data Moats](https://a16z.com/the-empty-promise-of-data-moats/), que argumenta que en general no existe un efecto de red inherente por solo tener más dato. Peor, el dato choca con rendimientos decrecientes. En su ejemplo de un chatbot de soporte, pasado cerca de 40% de cobertura de las preguntas el costo de agregar dato único sube mientras el valor de cada nuevo registro baja.",
            "El dato solo es defensible bajo condiciones estrechas. El acceso tiene que ser genuinamente exclusivo, o la precisión en un dominio de alto riesgo tiene que alimentar un loop de uso y feedback. Un dataset que un rival también puede comprar o raspar es una línea de costo, no un moat. Tener una pila de datos es una ventaja de salida. El moat es lo que mantiene la pila creciendo más rápido de lo que cualquiera puede copiar."
          ]
        },
        {
          "id": "moat-network",
          "heading": "Efectos de red de datos: el flujo que compone",
          "level": 3,
          "paragraphs": [
            "El efecto de red de datos es el tipo durable porque es un flujo, no un stock. El uso de cada cliente mejora el producto para el siguiente cliente, así que el activo se reabastece más rápido de lo que se deprecia. NFX, en su [Network Effects Manual](https://www.nfx.com/post/network-effects-manual), trata los efectos de red como el mecanismo central de defensibilidad y les acredita la mayor parte del valor creado por empresas de tecnología.",
            "La salvedad importa, y es donde la mayoría de los fundadores se engaña. El loop solo cuenta cuando más uso mejora el producto de forma medible en una dimensión que el cliente valora, y cuando un competidor que empieza de cero no puede igualar esa mejora. La escala sola no hace esto. Un loop de feedback sí."
          ],
          "bullets": [
            "Escala, no moat. Un nuevo entrante con el mismo modelo y mas capital replica su posicion de dato en un trimestre.",
            "Flujo de verdad. Su producto es estructuralmente mejor cuanto mas tiempo corre, porque el uso alimenta un activo que los rivales no compran.",
            "La prueba. Si un competidor bien financiado no alcanza su posicion de dato para el proximo trimestre, usted tiene un efecto de red, no solo escala."
          ]
        },
        {
          "id": "moat-process",
          "heading": "Process power y lock-in de workflow",
          "level": 3,
          "paragraphs": [
            "El process power es el moat que compone dentro de workflows regulados. El [7 Powers](https://blas.com/7-powers/) de Hamilton Helmer define el Process Power como excelencia operacional más histéresis, la resistencia que mantiene un proceso difícil de copiar incluso cuando sus resultados están a la vista. Va de la mano con los Switching Costs, que surgen cuando un cliente valora la compatibilidad entre compras repetidas a una misma empresa a lo largo del tiempo.",
            "Cuando un producto de IA se vuelve el sistema de registro de un proceso regulado, salir significa revalidar un rastro de compliance, recapacitar al equipo y reintegrar sistemas adyacentes. El costo de salir es el moat. Por eso la IA vertical le gana a la IA horizontal. Un asistente genérico no tiene workflow que anclar. Un producto vertical que vive dentro de un proceso licenciado, auditado y denso en regulación ancla profundo y se queda."
          ]
        },
        {
          "id": "helmer",
          "heading": "Mapeándolo sobre los 7 Powers",
          "level": 2,
          "paragraphs": [
            "El framework de Helmer es útil aquí justamente porque obliga a ser honesto sobre qué poder usted de verdad tiene. El modelo no es ninguno de ellos. Es un insumo que todo rival comparte. Los moats durables de IA mapean sobre tres de sus siete poderes, y la evidencia de 2025 lo respalda.",
            "Según [Insignia Ventures](https://review.insignia.vc/2025/04/15/moats-ai/), la IA hizo el construir más fácil y el defender exponencialmente más difícil, con software llegando a US$ 1 millón de ARR más rápido que nunca. Sus estudios de caso de mercados emergentes caen en los mismos tres poderes. Una plataforma de autos usados compone un data flywheel a partir de más de 160 puntos de dato por vehículo. Un prestamista combina un ERP propietario con financiamiento y sostiene 3% de morosidad contra 20 a 30% del sector en una recesión. Un banco digital convierte una licencia regulatoria escasa en distribución que ningún rival iguala."
          ],
          "bullets": [
            "Network Economies. El efecto de red de datos, donde cada usuario mejora el producto para el siguiente.",
            "Process Power. Excelencia operacional mas histeresis, el lock-in de workflow de un sistema de registro.",
            "Cornered Resource. Una licencia escasa o un feed de datos exclusivo que un competidor no renta ni raspa.",
            "Switching Costs. El costo de revalidacion, recapacitacion y reintegracion de salir de un workflow regulado."
          ]
        },
        {
          "id": "anti-moats",
          "heading": "Los anti-moats: wrappers y dato comprable",
          "level": 2,
          "paragraphs": [
            "Saber qué no es un moat es la mitad del playbook. Un wrapper delgado sobre una API pública renta la capacidad que todo competidor renta, agrega un prompt y no es dueño de ningún dato que componga. Ninguno de los poderes de Helmer se le aplica. Un dataset propietario que un rival puede comprar o raspar es una línea de costo vestida de moat.",
            "Los otros modos de falla son más silenciosos. La escala de dato se confunde con un efecto de red de datos, cuando más filas sin un loop impulsado por uso es apenas un stock que se deprecia. La dependencia de modelo se disfraza de estrategia, hasta que una caída de 10x al año y la disponibilidad multi-proveedor la borran. Y un dataset limpio sin canal para desplegarlo pierde ante un dataset peor que ya vive dentro de un workflow que los clientes usan todos los días."
          ],
          "callout": {
            "kind": "tip",
            "text": "Corra la prueba del cambio sobre su propio moat. Si cambiara de proveedor de modelo mañana y su defensibilidad no cambiara, el modelo nunca fue el moat. Encuentre el loop o el workflow que sobrevive al cambio."
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante ingeniería el moat",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. El método es un [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copilot de IA para hacer trabajo real dentro de una vertical, capturar el dato propietario que el trabajo genera, y usar ese activo de dato para captar y desplegar capital. El copilot es la cuna. El efecto de red de datos es el moat. El capital es la composición.",
            "El studio despliega US$ 500K-1.5M por venture en un sistema de seis etapas, con datos de GSSN que muestran un IRR de studio de ~50% frente a ~19% del VC tradicional, cerca de 2.5x, un benchmark del modelo de studio y no una afirmación sobre el retorno propio de Avante. Las mecánicas operacionales completas están en [cómo funcionan las economías de socio operativo](/library/operating-partner-economics).",
            "La razón de que esto funcione en LATAM es estructural. Los servicios representan cerca de 70% del PIB brasileño con baja penetración de software, exactamente la superficie donde un producto vertical puede volverse el sistema de registro. Sume operadores de dominio que cargan más de 10 años de cicatriz de mercado brasileño, y el dato compone en lugares que los competidores no alcanzan. Los workflows de activos judiciales y el scoring de riesgo en seguros son flujos, no stocks. El modelo va a seguir abaratándose. El moat es todo lo que usted construye para que eso deje de importar. Vea cómo operamos en [/principles](/principles)."
          ]
        }
      ]
    }
  },
  {
    "slug": "domain-specific-evals-ai-moat",
    "category": "ai",
    "type": "Playbook",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/domain-specific-evals-ai-moat.png",
    "isPublished": true,
    "en": {
      "title": "Domain Evals: The Moat That Survives Model Churn",
      "description": "Models commoditize. The encoded judgment of what correct means does not. Why a domain eval suite is an underrated AI-native moat.",
      "sections": [
        {
          "paragraphs": [
            "A domain-specific evals AI moat is the most underrated form of defensibility an AI-native company can build. Models commoditize and prompts get copied within a quarter. The encoded judgment of what correct means inside a regulated, high-stakes workflow does not. That judgment, captured as a test suite of real cases, edge cases, and expert-labeled outcomes, is expensive to assemble, compounds with usage, and is the asset competitors cannot screenshot.",
            "It also buys you a second thing almost nobody prices in. The freedom to swap base models as inference prices collapse, without gambling on quality. At Avante Ventures, the venture studio we run building AI-native companies in Brazil and Latin America, the eval suite is where a copilot's accumulating usage turns into a quality lead you can prove rather than assert."
          ]
        },
        {
          "id": "the-claim",
          "heading": "Why evals are a moat, not a chore",
          "level": 2,
          "paragraphs": [
            "Most teams treat evaluation as QA hygiene. That framing is why they lose. An AI-native product makes a claim about the world every time it runs. A copilot that scores judicial-debt recovery, prices an insurance risk, or ranks an auction property can be right or wrong, and wrong is expensive. The mechanism that decides right from wrong is the eval suite, which makes it the product, not the paperwork around it.",
            "The standard moat conversation stops at proprietary data, and that is where it goes wrong. Data is raw material. An eval set is the encoded definition of correctness applied to that material. Two ventures can hold near-identical data and ship opposite quality, because one runs a rigorous, adversarial, operator-labeled suite and the other is guessing in production. The eval suite is the LLM evals defensibility layer that turns a pile of cases into a measurable lead."
          ],
          "callout": {
            "kind": "tip",
            "text": "If removing the model breaks your product rather than degrading a feature, you are AI-native. And the first question that follows is not how fast you ship. It is how you know the output is correct."
          }
        },
        {
          "id": "model-agnostic",
          "heading": "How evals make you model-agnostic",
          "level": 2,
          "paragraphs": [
            "A model-agnostic AI startup is one that can change its engine on a Tuesday and prove quality held by Wednesday. The eval suite is what makes that possible. Run the new model against the suite. Adopt it only if scores hold or improve. The proprietary eval set is what converts a volatile cost curve into pricing power instead of exposure.",
            "This matters because base-model price and quality reshuffle every few months. A venture that hard-codes its quality to one provider is betting its margin on that provider's roadmap. A venture with a domain eval suite treats every new model as a candidate, not a commitment. The cost of being model-agnostic is near zero when you can prove quality on every swap. It is enormous when you cannot, because then a switch is a leap of faith and you will not take it."
          ],
          "bullets": [
            "Owned eval suite: swap to a cheaper or better model the week it ships, validate in hours, capture the savings or the quality gain.",
            "No eval suite: stay locked to one provider out of fear, or switch blind and discover the regression in front of a customer.",
            "The asset is not the prompt or the model. It is the encoded, operator-labeled definition of correct that every model must pass."
          ]
        },
        {
          "id": "the-cost-curve",
          "heading": "Why the cost curve makes this urgent",
          "level": 2,
          "paragraphs": [
            "Inference prices are falling fast and unevenly, a dynamic we map for the region in [the AI infrastructure cost curve](/library/ai-infrastructure-cost-curve-latam), which is precisely why you should not anchor quality to one model. Epoch AI found the price to reach a fixed capability has dropped between [9x and 900x per year](https://epoch.ai/data-insights/llm-inference-price-trends) depending on the benchmark, with a median near 50x. Matching GPT-4 on PhD-level science questions got about 40x cheaper per year. The drops are accelerating. Measured from January 2024 onward, the median rate jumps to roughly 200x per year.",
            "a16z put a single number on it. The cost of inference at a fixed quality level fell from [60 dollars per million tokens in 2021 to about 6 cents](https://a16z.com/llmflation-llm-inference-cost/) by late 2024, a roughly 1,000x decline in three years. When the floor moves that fast, the only way to keep capturing the savings is to be ready to switch. Readiness is an eval suite. Without one, every price drop is a deal you watch a competitor take. This is the AI eval set proprietary advantage that compounds quietly while the cost curve does the loud work."
          ],
          "callout": {
            "kind": "stat",
            "text": "The cost of LLM inference at a fixed quality level fell from 60 dollars per million tokens in 2021 to about 6 cents by late 2024. Roughly 1,000x in three years.",
            "attribution": "a16z, Welcome to LLMflation, 2024"
          }
        },
        {
          "id": "three-layers",
          "heading": "Where evals sit among the moats",
          "level": 3,
          "paragraphs": [
            "The durable moat for a vertical AI venture is a stack, not a single model. Insignia Ventures put it bluntly. [The barrier to building has never been lower while defending what you built has become exponentially harder](https://review.insignia.vc/2025/04/15/moats-ai/). They documented AI image-editing startups that scaled past 5 million dollars in ARR and then watched their value erode overnight when an incumbent shipped the same feature. Generic capability is a commodity. The defensible layers sit underneath it."
          ],
          "bullets": [
            "Proprietary data: the cases, outcomes, and labels competitors cannot buy. Necessary, most discussed, not sufficient alone.",
            "Domain-specific evals: the encoded judgment of what correct means, run against every model and every release. The layer that turns accumulating usage into a provable quality lead.",
            "Workflow lock-in: the product becomes where work is authored and the system of record, so switching costs rise."
          ]
        },
        {
          "id": "evals-are-hard",
          "heading": "The quiet trap of bad evals",
          "level": 2,
          "paragraphs": [
            "A bad eval set is worse than no eval set, because it gives you confidence pointed in the wrong direction. Anthropic, a lab whose entire business is measuring models, wrote that [a true science of evals remains underdeveloped](https://www.anthropic.com/research/statistical-approach-to-model-evals) and that an apparent edge can be luck of the draw rather than real capability. If they call the science underdeveloped, a vertical startup should assume its first eval set is wrong in ways it cannot yet see.",
            "Here is the failure mode in plain terms. An eval set encodes a definition of correct. If that definition is subtly off, you optimize hard toward the wrong target and feel good doing it. A judicial-debt valuation that looks right to an engineer can be legally wrong in a way only a precatório specialist catches. An insurance score can pass a generic accuracy check and still misprice the tail that bankrupts the book. Building a good eval set demands the exact resource most AI startups lack. Deep domain operators who can label adversarial edge cases correctly. A team without that input does not build a weak instrument. It builds a precise one aimed at the wrong target, and ships with conviction."
          ],
          "callout": {
            "kind": "stat",
            "text": "A true science of evals remains underdeveloped, and an apparent model edge can be luck of the draw rather than real capability. The warning comes from a frontier lab, not a skeptic.",
            "attribution": "Anthropic research on evaluating models, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante builds evals with operators",
          "level": 2,
          "paragraphs": [
            "The eval-as-moat thesis is exactly why the studio model fits this moment. A correct eval set requires deep domain input, and that input is what most AI startups are short of. Avante Ventures pairs a Silicon Valley playbook and first-ticket capital with operators who carry 10+ years of Brazilian-market scar tissue, assembled on day one. The operating partner who knows the domain is in the build from the Partner stage, which is where eval design has to start, not after launch.",
            "The structure is deliberate. Avante launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. Each venture gets $500K-1.5M across pre-seed while the studio retains co-founder economics. The model has a track record behind it. Per the Global Startup Studio Network, venture studios show roughly ~50% IRR versus ~19% for traditional VC, about 2.5x over realistic horizons. That figure is the studio-model benchmark, not a claim about any single fund's realized return.",
            "The market it points at is concrete. Services account for roughly 70% of Brazilian GDP, and per [consolidated IBGE data](https://www.infomoney.com.br/colunistas/iee/responsavel-por-70-do-pib-setor-de-servicos-esta-sob-cerco/) they drive about 80% of formal job creation. These are regulated, judgment-heavy workflows where correct is domain-defined and adversarial. Exactly where a domain eval suite is hardest to build and most defensible once built. The portfolio runs one pattern in such domains. Build a copilot to generate proprietary data, encode domain correctness as evals so the quality lead is provable, then use the data and the credibility to raise and deploy capital. The [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel) shows up in judicial-asset valuation at Alphajuri, insurance risk scoring at WIR, and auction-property scoring at BR Auction Intel. AI infrastructure is now cheap enough to [deploy without a Series A](/library/ai-native-without-series-a). The bottleneck moved. It is no longer compute. It is the encoded judgment of what correct means, and the operators who can define it. That is the case we make in full on [why a studio builds this way](/why-avante)."
          ]
        }
      ]
    },
    "pt": {
      "title": "Evals de Domínio: o Moat que Sobrevive à Troca de Modelos",
      "description": "Modelos viram commodity. O julgamento codificado do que é correto não. Por que uma suíte de evals de domínio é um moat AI-native subestimado.",
      "sections": [
        {
          "paragraphs": [
            "Os evals de domínio são o moat de IA mais subestimado que uma empresa AI-native pode construir. Modelos viram commodity e prompts são copiados em um trimestre. O julgamento codificado do que significa correto dentro de um fluxo regulado e de alto risco não vira. Esse julgamento, capturado como uma suíte de testes com casos reais, casos de borda e resultados rotulados por especialistas, é caro de montar, composta com o uso e é o ativo que o concorrente não consegue copiar com um print.",
            "Ele também compra uma segunda coisa que quase ninguém precifica. A liberdade de trocar o modelo base conforme o preço de inferência despenca, sem apostar na qualidade. Na Avante Ventures, o venture studio que tocamos construindo empresas AI-native no Brasil e na América Latina, a suíte de evals é onde o uso acumulado de um copiloto vira uma vantagem de qualidade que você prova, e não apenas afirma."
          ]
        },
        {
          "id": "the-claim",
          "heading": "Por que evals são moat, não tarefa chata",
          "level": 2,
          "paragraphs": [
            "A maioria dos times trata avaliação como higiene de QA. É por isso que perdem. Um produto AI-native faz uma afirmação sobre o mundo toda vez que roda. Um copiloto que pontua recuperação de dívida judicial, precifica um risco de seguro ou ranqueia um imóvel de leilão pode estar certo ou errado, e errado custa caro. O mecanismo que decide certo de errado é a suíte de evals. Isso a torna o produto, não a papelada em volta dele.",
            "A conversa padrão sobre moat para na proprietary data, e é aí que ela erra. Dado é matéria-prima. Um conjunto de evals é a definição codificada de correção aplicada a essa matéria. Dois negócios podem ter dados quase idênticos e entregar qualidade oposta, porque um roda uma suíte rigorosa, adversarial e rotulada por operador e o outro está adivinhando em produção. A suíte de evals é a camada de defensabilidade de evals de LLM que transforma uma pilha de casos em uma vantagem mensurável."
          ],
          "callout": {
            "kind": "tip",
            "text": "Se tirar o modelo quebra o seu produto em vez de degradar uma funcionalidade, você é AI-native. E a primeira pergunta que vem depois não é quão rápido você entrega. É como você sabe que a saída está correta."
          }
        },
        {
          "id": "model-agnostic",
          "heading": "Como evals te tornam independente de modelo",
          "level": 2,
          "paragraphs": [
            "Uma startup de IA independente de modelo é aquela que troca o motor numa terça e prova que a qualidade se manteve na quarta. A suíte de evals é o que torna isso possível. Rode o novo modelo contra a suíte. Adote apenas se as notas se mantiverem ou melhorarem. O conjunto de evals proprietário é o que converte uma curva de custo volátil em poder de preço em vez de exposição.",
            "Isso importa porque preço e qualidade do modelo base se reorganizam a cada poucos meses. Um negócio que fixa sua qualidade em um único provedor está apostando a margem no roadmap daquele provedor. Um negócio com uma suíte de evals de domínio trata todo modelo novo como candidato, não como compromisso. O custo de ser independente de modelo é quase zero quando você consegue provar qualidade em cada troca. É enorme quando você não consegue, porque então a troca vira um salto de fé e você não vai dar."
          ],
          "bullets": [
            "Com suíte própria: troque para um modelo mais barato ou melhor na semana em que ele sai, valide em horas, capture a economia ou o ganho de qualidade.",
            "Sem suíte: fique preso a um provedor por medo, ou troque às cegas e descubra a regressão na frente de um cliente.",
            "O ativo não é o prompt nem o modelo. É a definição codificada e rotulada por operador do que é correto, que todo modelo precisa passar."
          ]
        },
        {
          "id": "the-cost-curve",
          "heading": "Por que a curva de custo torna isso urgente",
          "level": 2,
          "paragraphs": [
            "Os preços de inferência caem rápido e de forma desigual, uma dinâmica que mapeamos para a região em [a curva de custo da infraestrutura de IA](/library/ai-infrastructure-cost-curve-latam), e é exatamente por isso que você não deveria ancorar a qualidade em um único modelo. A Epoch AI mostrou que o preço para atingir uma capacidade fixa caiu entre [9x e 900x por ano](https://epoch.ai/data-insights/llm-inference-price-trends) conforme o benchmark, com mediana perto de 50x. Igualar o GPT-4 em questões de ciência de nível doutorado ficou cerca de 40x mais barato por ano. As quedas estão acelerando. Medindo de janeiro de 2024 em diante, a mediana salta para cerca de 200x por ano.",
            "A a16z colocou um número único nisso. O custo de inferência em um nível fixo de qualidade caiu de [60 dólares por milhão de tokens em 2021 para cerca de 6 centavos](https://a16z.com/llmflation-llm-inference-cost/) no fim de 2024, uma queda de aproximadamente 1.000x em três anos. Quando o piso se move tão rápido, o único jeito de continuar capturando a economia é estar pronto para trocar. Estar pronto é ter uma suíte de evals. Sem ela, toda queda de preço é um negócio que você vê um concorrente fechar. Essa é a vantagem do conjunto de evals proprietário, que se compõe em silêncio enquanto a curva de custo faz o trabalho barulhento."
          ],
          "callout": {
            "kind": "stat",
            "text": "O custo de inferência de LLM em um nível fixo de qualidade caiu de 60 dólares por milhão de tokens em 2021 para cerca de 6 centavos no fim de 2024. Cerca de 1.000x em três anos.",
            "attribution": "a16z, Welcome to LLMflation, 2024"
          }
        },
        {
          "id": "three-layers",
          "heading": "Onde os evals ficam entre os moats",
          "level": 3,
          "paragraphs": [
            "O moat durável de um negócio de IA vertical é uma pilha, não um único modelo. A Insignia Ventures foi direta. [A barreira para construir nunca foi tão baixa, enquanto defender o que você construiu ficou exponencialmente mais difícil](https://review.insignia.vc/2025/04/15/moats-ai/). Eles documentaram startups de edição de imagem com IA que passaram de 5 milhões de dólares em ARR e depois viram seu valor evaporar da noite para o dia quando um incumbente lançou a mesma funcionalidade. Capacidade genérica é commodity. As camadas defensáveis ficam embaixo dela."
          ],
          "bullets": [
            "Proprietary data: os casos, resultados e rótulos que o concorrente não compra. Necessário, o mais comentado, mas não suficiente sozinho.",
            "Evals de domínio: o julgamento codificado do que é correto, rodado contra cada modelo e cada release. A camada que transforma uso acumulado em vantagem de qualidade comprovável.",
            "Workflow lock-in: o produto vira onde o trabalho é feito e o sistema de registro, então o custo de troca sobe."
          ]
        },
        {
          "id": "evals-are-hard",
          "heading": "A armadilha silenciosa dos evals ruins",
          "level": 2,
          "paragraphs": [
            "Um conjunto de evals ruim é pior do que nenhum, porque te dá confiança apontada na direção errada. A Anthropic, um laboratório cujo negócio inteiro é medir modelos, escreveu que [uma verdadeira ciência de evals ainda é subdesenvolvida](https://www.anthropic.com/research/statistical-approach-to-model-evals) e que uma vantagem aparente pode ser sorte do sorteio, e não capacidade real. Se eles chamam a ciência de subdesenvolvida, um negócio vertical deveria assumir que seu primeiro conjunto de evals está errado de formas que ainda não consegue ver.",
            "Eis o modo de falha em termos simples. Um conjunto de evals codifica uma definição de correto. Se essa definição está sutilmente errada, você otimiza forte em direção ao alvo errado e se sente bem fazendo isso. Uma valuação de dívida judicial que parece certa para um engenheiro pode estar juridicamente errada de um jeito que só um especialista em precatórios pega. Um score de seguro pode passar num teste genérico de acurácia e ainda assim precificar mal a cauda que quebra a carteira. Construir um bom conjunto de evals exige o recurso exato que falta à maioria das startups de IA. Operadores de domínio profundos que sabem rotular casos de borda adversariais corretamente. Um time sem esse insumo não constrói um instrumento fraco. Constrói um instrumento preciso mirado no alvo errado, e entrega com convicção."
          ],
          "callout": {
            "kind": "stat",
            "text": "Uma verdadeira ciência de evals ainda é subdesenvolvida, e uma vantagem aparente de modelo pode ser sorte do sorteio em vez de capacidade real. O alerta vem de um laboratório de fronteira, não de um cético.",
            "attribution": "Pesquisa da Anthropic sobre avaliação de modelos, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante constrói evals com operadores",
          "level": 2,
          "paragraphs": [
            "A tese de eval como moat é exatamente por que o modelo de studio cabe neste momento. Um conjunto de evals correto exige insumo de domínio profundo, e esse insumo é o que falta à maioria das startups de IA. A Avante Ventures combina um playbook do Vale do Silício e capital de primeiro cheque com operadores que carregam mais de 10 anos de calo do mercado brasileiro, montados no dia um. O operating partner que conhece o domínio está na construção desde a etapa Partner, que é onde o design de evals tem que começar, não depois do lançamento.",
            "A estrutura é deliberada. A Avante lança de 3 a 4 ventures por ano por meio de um sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Cada venture recebe entre 500 mil e 1,5 milhão de dólares no pré-seed enquanto o studio retém economia de co-founder. O modelo tem histórico por trás. Segundo a Global Startup Studio Network, venture studios mostram cerca de ~50% de IRR contra ~19% do venture capital tradicional, cerca de 2,5x em horizontes realistas. Esse número é o benchmark do modelo de studio, não uma afirmação sobre o retorno realizado de um fundo específico.",
            "O mercado que isso mira é concreto. Os serviços respondem por cerca de 70% do PIB brasileiro, e segundo [dados consolidados do IBGE](https://www.infomoney.com.br/colunistas/iee/responsavel-por-70-do-pib-setor-de-servicos-esta-sob-cerco/) movimentam cerca de 80% da geração de emprego formal. São fluxos regulados e pesados em julgamento, onde correto é definido pelo domínio e é adversarial. Exatamente onde uma suíte de evals de domínio é mais difícil de construir e mais defensável depois de pronta. O portfólio roda um padrão nesses domínios. Construir um copiloto para gerar proprietary data, codificar a correção do domínio como evals para que a vantagem de qualidade seja comprovável, e então usar o dado e a credibilidade para captar e alocar capital. O [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel) aparece na valuação de ativos judiciais na Alphajuri, na precificação de risco de seguro na WIR e na pontuação de imóveis de leilão na BR Auction Intel. A infraestrutura de IA já está barata o bastante para [implantar sem uma Série A](/library/ai-native-without-series-a). O gargalo mudou. Não é mais computação. É o julgamento codificado do que significa correto, e os operadores que sabem defini-lo. É esse o argumento que detalhamos em [por que um studio constrói assim](/why-avante)."
          ]
        }
      ]
    },
    "es": {
      "title": "Evals de Dominio: el Moat que Sobrevive al Cambio de Modelos",
      "description": "Los modelos se vuelven commodity. El juicio codificado de qué es correcto no. Por qué una suite de evals de dominio es un moat AI-native subestimado.",
      "sections": [
        {
          "paragraphs": [
            "Los evals de dominio son el moat de IA más subestimado que una empresa AI-native puede construir. Los modelos se vuelven commodity y los prompts se copian en un trimestre. El juicio codificado de qué significa correcto dentro de un flujo regulado y de alto riesgo no se copia. Ese juicio, capturado como una suite de pruebas con casos reales, casos de borde y resultados etiquetados por expertos, es caro de armar, se compone con el uso y es el activo que un competidor no puede replicar con una captura de pantalla.",
            "También compra una segunda cosa que casi nadie pone en precio. La libertad de cambiar el modelo base mientras el costo de inferencia se desploma, sin apostar la calidad. En Avante Ventures, el venture studio que operamos construyendo empresas AI-native en Brasil y América Latina, la suite de evals es donde el uso acumulado de un copiloto se convierte en una ventaja de calidad que usted prueba, no que simplemente afirma."
          ]
        },
        {
          "id": "the-claim",
          "heading": "Por qué los evals son moat, no una tarea tediosa",
          "level": 2,
          "paragraphs": [
            "La mayoría de los equipos trata la evaluación como higiene de QA. Por eso pierden. Un producto AI-native hace una afirmación sobre el mundo cada vez que corre. Un copiloto que puntúa recuperación de deuda judicial, cotiza un riesgo de seguro o rankea un inmueble en subasta puede estar bien o mal, y mal cuesta caro. El mecanismo que decide lo correcto de lo incorrecto es la suite de evals. Eso la convierte en el producto, no en el papeleo que lo rodea.",
            "La conversación estándar sobre el moat se detiene en la proprietary data, y ahí es donde se equivoca. El dato es materia prima. Un conjunto de evals es la definición codificada de corrección aplicada a esa materia. Dos negocios pueden tener datos casi idénticos y entregar calidad opuesta, porque uno corre una suite rigurosa, adversarial y etiquetada por operador y el otro está adivinando en producción. La suite de evals es la capa de defensibilidad de evals de LLM que convierte un montón de casos en una ventaja medible."
          ],
          "callout": {
            "kind": "tip",
            "text": "Si quitar el modelo rompe su producto en lugar de degradar una funcionalidad, usted es AI-native. Y la primera pregunta que sigue no es qué tan rápido entrega. Es cómo sabe que la salida es correcta."
          }
        },
        {
          "id": "model-agnostic",
          "heading": "Como los evals te hacen independiente del modelo",
          "level": 2,
          "paragraphs": [
            "Una startup de IA independiente del modelo es la que cambia el motor un martes y prueba que la calidad se mantuvo el miércoles. La suite de evals es lo que lo hace posible. Corra el nuevo modelo contra la suite. Adóptelo solo si las notas se mantienen o mejoran. El conjunto de evals propietario es lo que convierte una curva de costo volátil en poder de precio en lugar de exposición.",
            "Esto importa porque el precio y la calidad del modelo base se reordenan cada pocos meses. Un negocio que fija su calidad a un solo proveedor está apostando su margen al roadmap de ese proveedor. Un negocio con una suite de evals de dominio trata cada modelo nuevo como candidato, no como compromiso. El costo de ser independiente del modelo es casi cero cuando usted puede probar calidad en cada cambio. Es enorme cuando no puede, porque entonces el cambio se vuelve un acto de fe y no lo va a dar."
          ],
          "bullets": [
            "Con suite propia: cambie a un modelo más barato o mejor la semana en que sale, valide en horas, capture el ahorro o la ganancia de calidad.",
            "Sin suite: quédese atado a un proveedor por miedo, o cambie a ciegas y descubra la regresión frente a un cliente.",
            "El activo no es el prompt ni el modelo. Es la definición codificada y etiquetada por operador de qué es correcto, que todo modelo debe pasar."
          ]
        },
        {
          "id": "the-cost-curve",
          "heading": "Por qué la curva de costo lo vuelve urgente",
          "level": 2,
          "paragraphs": [
            "Los precios de inferencia caen rápido y de forma despareja, una dinámica que mapeamos para la región en [la curva de costo de la infraestructura de IA](/library/ai-infrastructure-cost-curve-latam), y por eso mismo usted no debería anclar la calidad a un solo modelo. Epoch AI encontró que el precio para alcanzar una capacidad fija cayó entre [9x y 900x por año](https://epoch.ai/data-insights/llm-inference-price-trends) según el benchmark, con una mediana cerca de 50x. Igualar a GPT-4 en preguntas de ciencia de nivel doctoral se volvió cerca de 40x más barato por año. Las caídas se aceleran. Midiendo desde enero de 2024 en adelante, la mediana salta a cerca de 200x por año.",
            "a16z le puso un número único. El costo de inferencia en un nivel fijo de calidad cayó de [60 dólares por millón de tokens en 2021 a cerca de 6 centavos](https://a16z.com/llmflation-llm-inference-cost/) a fines de 2024, una caída de aproximadamente 1.000x en tres años. Cuando el piso se mueve tan rápido, la única forma de seguir capturando el ahorro es estar listo para cambiar. Estar listo es tener una suite de evals. Sin ella, cada caída de precio es un negocio que usted ve cerrar a un competidor. Esa es la ventaja del conjunto de evals propietario, que se compone en silencio mientras la curva de costo hace el trabajo ruidoso."
          ],
          "callout": {
            "kind": "stat",
            "text": "El costo de inferencia de LLM en un nivel fijo de calidad cayó de 60 dólares por millón de tokens en 2021 a cerca de 6 centavos a fines de 2024. Cerca de 1.000x en tres años.",
            "attribution": "a16z, Welcome to LLMflation, 2024"
          }
        },
        {
          "id": "three-layers",
          "heading": "Donde se ubican los evals entre los moats",
          "level": 3,
          "paragraphs": [
            "El moat durable de un negocio de IA vertical es un stack, no un solo modelo. Insignia Ventures fue directa. [La barrera para construir nunca fue tan baja, mientras defender lo que usted construyó se volvió exponencialmente más difícil](https://review.insignia.vc/2025/04/15/moats-ai/). Documentaron startups de edición de imagen con IA que pasaron los 5 millones de dólares en ARR y luego vieron su valor evaporarse de un día para otro cuando un actor establecido lanzó la misma funcionalidad. La capacidad genérica es commodity. Las capas defensables están debajo de ella."
          ],
          "bullets": [
            "Proprietary data: los casos, resultados y etiquetas que un competidor no compra. Necesario, lo más comentado, pero no suficiente por sí solo.",
            "Evals de dominio: el juicio codificado de qué es correcto, corrido contra cada modelo y cada release. La capa que convierte el uso acumulado en una ventaja de calidad comprobable.",
            "Workflow lock-in: el producto se vuelve donde se hace el trabajo y el sistema de registro, entonces el costo de cambio sube."
          ]
        },
        {
          "id": "evals-are-hard",
          "heading": "La trampa silenciosa de los evals malos",
          "level": 2,
          "paragraphs": [
            "Un conjunto de evals malo es peor que ninguno, porque le da confianza apuntada en la dirección equivocada. Anthropic, un laboratorio cuyo negocio entero es medir modelos, escribió que [una verdadera ciencia de evals sigue subdesarrollada](https://www.anthropic.com/research/statistical-approach-to-model-evals) y que una ventaja aparente puede ser suerte del sorteo, no capacidad real. Si ellos llaman subdesarrollada a la ciencia, un negocio vertical debería asumir que su primer conjunto de evals está mal de formas que todavía no puede ver.",
            "Este es el modo de falla en términos simples. Un conjunto de evals codifica una definición de correcto. Si esa definición está sutilmente mal, usted optimiza fuerte hacia el objetivo equivocado y se siente bien haciéndolo. Una valuación de deuda judicial que le parece correcta a un ingeniero puede estar jurídicamente mal de un modo que solo un especialista capta. Un score de seguro puede pasar una prueba genérica de exactitud y aún así cotizar mal la cola que quiebra la cartera. Construir un buen conjunto de evals exige el recurso exacto que le falta a la mayoría de las startups de IA. Operadores de dominio profundos que sepan etiquetar casos de borde adversariales correctamente. Un equipo sin ese insumo no construye un instrumento débil. Construye uno preciso apuntado al objetivo equivocado, y entrega con convicción."
          ],
          "callout": {
            "kind": "stat",
            "text": "Una verdadera ciencia de evals sigue subdesarrollada, y una ventaja aparente de modelo puede ser suerte del sorteo en lugar de capacidad real. La advertencia viene de un laboratorio de frontera, no de un escéptico.",
            "attribution": "Investigación de Anthropic sobre evaluación de modelos, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como Avante construye evals con operadores",
          "level": 2,
          "paragraphs": [
            "La tesis de eval como moat es exactamente por qué el modelo de studio encaja en este momento. Un conjunto de evals correcto exige insumo de dominio profundo, y ese insumo es lo que le falta a la mayoría de las startups de IA. Avante Ventures combina un playbook de Silicon Valley y capital de primer cheque con operadores que cargan más de 10 años de cicatrices del mercado brasileño, ensamblados el día uno. El operating partner que conoce el dominio está en la construcción desde la etapa Partner, que es donde el diseño de evals tiene que empezar, no después del lanzamiento.",
            "La estructura es deliberada. Avante lanza de 3 a 4 ventures por año mediante un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Cada venture recibe entre 500 mil y 1,5 millones de dólares en el pre-seed mientras el studio retiene economía de co-founder. El modelo tiene historial detrás. Según la Global Startup Studio Network, los venture studios muestran cerca de ~50% de IRR frente a ~19% del venture capital tradicional, cerca de 2,5x en horizontes realistas. Ese número es el benchmark del modelo de studio, no una afirmación sobre el retorno realizado de un fondo en particular.",
            "El mercado al que apunta es concreto. Los servicios representan cerca del 70% del PIB brasileño, y según [datos consolidados del IBGE](https://www.infomoney.com.br/colunistas/iee/responsavel-por-70-do-pib-setor-de-servicos-esta-sob-cerco/) mueven cerca del 80% de la generación de empleo formal. Son flujos regulados y cargados de juicio, donde lo correcto lo define el dominio y es adversarial. Justo donde una suite de evals de dominio es más difícil de construir y más defensable una vez lista. El portafolio corre un patrón en esos dominios. Construir un copiloto para generar proprietary data, codificar la corrección del dominio como evals para que la ventaja de calidad sea comprobable, y luego usar el dato y la credibilidad para levantar y desplegar capital. El [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel) aparece en la valuación de activos judiciales en Alphajuri, en la cotización de riesgo de seguro en WIR y en la puntuación de inmuebles en subasta en BR Auction Intel. La infraestructura de IA ya está barata como para [desplegar sin una Serie A](/library/ai-native-without-series-a). El cuello de botella se movió. Ya no es cómputo. Es el juicio codificado de qué significa correcto, y los operadores que saben definirlo. Ese es el argumento que detallamos en [por qué un studio construye así](/why-avante)."
          ]
        }
      ]
    }
  },
  {
    "slug": "infinity-constellation-ai-studio-thesis",
    "category": "insights",
    "type": "Market Note",
    "readTime": "9 min",
    "featured": true,
    "date": "Jun 2026",
    "datePublished": "2026-06-09",
    "isPublished": true,
    "en": {
      "title": "Infinity Constellation Raised $24M to Mass-Produce AI Companies. That Is the Studio Thesis.",
      "description": "A US studio just raised $24M to build up to eight AI companies a year in professional services. Read against the venture studio model Avante runs in LATAM, the signal is clear. The studio is becoming an asset class.",
      "sections": [
        {
          "paragraphs": [
            "On June 8 2026, Infinity Constellation told Axios it had raised a $24M Series A to build up to eight AI companies a year inside the professional services market. The round was led by Freestyle, with Backed VC, Rafferty, Oxford Funds, BY Ventures and others, as reported in the [Axios exclusive](https://www.axios.com/pro/all-deals/2026/06/08/infinity-constellation-24-million-multiple-ai-companies) and the company [press release](https://www.prnewswire.com/news-releases/infinity-constellation-raises-24m-series-a-to-take-on-professional-services-302794633.html). This is not a bet on one product. It is a bet on a factory.",
            "Read it next to the model [Avante Ventures](/why-avante) runs in Brazil and Latin America and the signal is hard to miss. The venture studio, once a niche structure argued about by a handful of believers, is now being capitalized like an asset class. The interesting question is no longer whether the studio model works. It is who runs it, and where."
          ]
        },
        {
          "id": "what-infinity-raised-to-do",
          "heading": "What Infinity actually raised money to do",
          "level": 2,
          "paragraphs": [
            "Infinity Constellation, led by CEO Brennan Pothetes and chaired by Francis Pedraza, the founder of [Invisible Technologies](https://www.invisible.co), is going after the $6 trillion global professional services market. Pothetes framed it plainly. Professional services is a $6T industry still built around people billing hours, and that era is ending. The thesis on the [company site](https://www.infinityconstellation.com) is sharper still. The future of the firm is built, not bought.",
            "The structure is the story. Infinity does not buy legacy firms and bolt AI onto them. It builds new AI-native companies from a central platform, then lets data, pricing, and expertise flow between them. Per Axios, it prefers repeat founders, who take 25% of the newco plus a stake in the holding company itself, so every operator is incentivized to make the next company better. It already runs several live units across executive assistance, compliance, design, hiring, finance, and data."
          ]
        },
        {
          "id": "this-is-a-studio-story",
          "heading": "This is a studio story, and the numbers explain why",
          "level": 2,
          "paragraphs": [
            "Strip the branding and Infinity is a venture studio. A central team builds companies on repeat instead of writing checks into other people's companies and hoping. That distinction is not cosmetic. It changes the returns. Per the Global Startup Studio Network, studio ventures average roughly 50% IRR against roughly 19% for traditional venture-backed startups, about 2.5x over realistic time horizons. The same dataset shows studio ventures reaching Series A in about 25 months against 56 for traditional startups, and graduating at 72% versus 42%. A model that halves the time to a priced round and nearly doubles the survival rate is not getting lucky on deal selection. The full case is in our breakdown of [why venture studios win in LATAM](/library/why-venture-studios-win-latam).",
            "Infinity says the quiet part in product language. One shared brain. Compounding by design. Each company makes the next one faster and smarter. That is the studio flywheel, and it is the exact reason a studio outperforms a fund that gives advice across a dozen boards. For the side-by-side on structure, see [studio versus accelerator versus VC](/library/studio-vs-accelerator-vs-vc)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR near 50% versus an industry-standard ~19% IRR for traditional VC, roughly 2.5x over realistic time horizons.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "ai-makes-a-company-a-year-believable",
          "heading": "AI is what makes a company-a-year believable",
          "level": 2,
          "paragraphs": [
            "A studio launching eight companies a year would have sounded reckless in 2019. Axios put the reason it no longer does in one line. It illustrates how rapidly companies can be spun up in the age of AI. The cost of standing up the first working version of a company has collapsed, because [LLM inference prices have fallen by orders of magnitude](https://a16z.com/llmflation-llm-inference-cost/) and the tooling now does work that used to need a team.",
            "That is why a serious studio can launch AI-native and reach revenue before it would have historically reached a priced round. Infinity claims one month to first revenue across its units. The same dynamic is what lets a disciplined builder ship without burning a Series A first, which we cover in [how to build AI-native without a Series A](/library/ai-native-without-series-a) and the [AI infrastructure cost curve in LATAM](/library/ai-infrastructure-cost-curve-latam)."
          ]
        },
        {
          "id": "where-avante-and-infinity-part-ways",
          "heading": "Where Avante and Infinity part ways: the map",
          "level": 2,
          "paragraphs": [
            "Infinity is attacking the global professional services market from the United States. Avante runs the same playbook where the gap between the size of the opportunity and the level of software is widest. Services account for roughly 70% of Brazilian GDP, and most of that economy is barely digitized. A studio that supplies operating depth on day one compounds hardest exactly there, where that depth is scarce and a generalist fund cannot manufacture it.",
            "This is the structural edge behind [why Avante builds where it builds](/why-avante). Domain operators with ten or more years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled before the company exists. Infinity validates the model. Geography is where the next decade of studio returns gets decided, and the deeper read on that is in [the Brazilian services economy opportunity](/library/brazil-services-economy-opportunity)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Services account for roughly 70% of Brazilian GDP, with low software penetration. That is the gap a studio is built to close.",
            "attribution": "Avante Ventures thesis, services share per IBGE"
          }
        },
        {
          "id": "the-line-the-headline-buries",
          "heading": "The line the headline buries: data",
          "level": 2,
          "paragraphs": [
            "The funding number gets the headline. The durable advantage is quieter. When repeat founders build inside one shared brain, the data each company generates flows into the next one. That is a moat that a single startup, however well funded, cannot assemble alone. It is also the part most reporting on studios skips.",
            "Avante names the loop directly. Copilot to data to fund. Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. A holding company that shares a brain across ventures turns that loop into a portfolio asset rather than a single-company trick. The mechanics are in [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel), and why the data compounds into defensibility is in [data network effects in vertical AI](/library/data-network-effects-vertical-ai)."
          ]
        },
        {
          "id": "what-an-lp-should-take-from-this",
          "heading": "What an LP should take from a $24M round",
          "level": 2,
          "paragraphs": [
            "Read the Infinity raise as a market signal, not a competitor scare. Serious investors are now funding the studio model at scale, in public, with a number attached. The debate about whether building companies on repeat beats betting on them one at a time is closing. What remains open is execution and geography.",
            "Avante is the answer for Latin America. A venture studio building AI-native companies in Brazil and Latin America, launching 3-4 ventures per year, deploying $500K-1.5M per venture, and running every one through a six-stage system from Research to Partner to Build to Traction to Revenue to Compound. The same model the market just priced at $24M, pointed at the economy where it should compound hardest. For an LP, the takeaway is not to chase Infinity. It is to ask which studio is positioned where the model has the most room left to compound. Read [how Avante operates](/principles), or [start a conversation](/contact)."
          ]
        }
      ]
    },
    "pt": {
      "title": "A Infinity Constellation levantou US$ 24M para produzir empresas de IA em escala. Essa é a tese do studio.",
      "description": "Um studio dos EUA acabou de levantar US$ 24M para construir até oito empresas de IA por ano em serviços profissionais. Lido ao lado do modelo que a Avante opera na América Latina, o sinal é claro. O studio está virando uma classe de ativos.",
      "sections": [
        {
          "paragraphs": [
            "Em 8 de junho de 2026, a Infinity Constellation revelou ao Axios que havia levantado uma Série A de US$ 24M para construir até oito empresas de IA por ano dentro do mercado de serviços profissionais. A rodada foi liderada pela Freestyle, com Backed VC, Rafferty, Oxford Funds, BY Ventures e outros, segundo a [exclusiva do Axios](https://www.axios.com/pro/all-deals/2026/06/08/infinity-constellation-24-million-multiple-ai-companies) e o [comunicado da empresa](https://www.prnewswire.com/news-releases/infinity-constellation-raises-24m-series-a-to-take-on-professional-services-302794633.html). Isso não é uma aposta em um produto. É uma aposta em uma fábrica.",
            "Leia isso ao lado do modelo que a [Avante Ventures](/why-avante) opera no Brasil e na América Latina e o sinal fica difícil de ignorar. O venture studio, antes uma estrutura de nicho discutida por um punhado de convictos, agora está sendo capitalizado como uma classe de ativos. A pergunta interessante não é mais se o modelo de studio funciona. É quem o opera, e onde."
          ]
        },
        {
          "id": "what-infinity-raised-to-do",
          "heading": "Para o que a Infinity de fato levantou capital",
          "level": 2,
          "paragraphs": [
            "A Infinity Constellation, liderada pelo CEO Brennan Pothetes e presidida por Francis Pedraza, fundador da [Invisible Technologies](https://www.invisible.co), mira o mercado global de serviços profissionais de US$ 6 trilhões. Pothetes foi direto. Serviços profissionais é uma indústria de US$ 6 trilhões ainda construída em torno de pessoas cobrando por hora, e essa era está acabando. A tese no [site da empresa](https://www.infinityconstellation.com) é ainda mais afiada. O futuro da firma é construído, não comprado.",
            "A estrutura é a história. A Infinity não compra firmas tradicionais para parafusar IA nelas. Ela constrói empresas AI-native novas a partir de uma plataforma central, e deixa dados, precificação e expertise fluírem entre elas. Segundo o Axios, prefere fundadores recorrentes, que ficam com 25% da nova empresa mais participação na própria holding, para que cada operador tenha incentivo de tornar a próxima empresa melhor. Já opera várias unidades vivas em assistência executiva, compliance, design, recrutamento, finanças e dados."
          ]
        },
        {
          "id": "this-is-a-studio-story",
          "heading": "Isso é uma história de studio, e os números explicam por que",
          "level": 2,
          "paragraphs": [
            "Tire a marca e a Infinity é um venture studio. Um time central constrói empresas em série em vez de assinar cheques nas empresas dos outros e torcer. Essa distinção não é cosmética. Ela muda o retorno. Segundo a Global Startup Studio Network, ventures de studio entregam em média cerca de 50% de IRR contra cerca de 19% das startups tradicionais financiadas por venture capital, cerca de 2,5x ao longo de horizontes realistas. O argumento completo está na nossa análise de [por que os venture studios vencem na América Latina](/library/why-venture-studios-win-latam).",
            "A Infinity diz a parte silenciosa em linguagem de produto. Um cérebro compartilhado. Composição por design. Cada empresa torna a próxima mais rápida e mais inteligente. Esse é o flywheel do studio, e é exatamente por que um studio supera um fundo que dá conselhos espalhado por uma dúzia de conselhos. Para o comparativo de estrutura, veja [studio versus aceleradora versus VC](/library/studio-vs-accelerator-vs-vc)."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio perto de 50% contra um padrão de mercado de ~19% para o VC tradicional, cerca de 2,5x ao longo de horizontes realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "ai-makes-a-company-a-year-believable",
          "heading": "A IA é o que torna uma empresa por ano algo crível",
          "level": 2,
          "paragraphs": [
            "Um studio lançando oito empresas por ano teria soado imprudente em 2019. O Axios resumiu o motivo de isso não soar mais assim em uma linha. Mostra a rapidez com que empresas podem ser criadas na era da IA. O custo de levantar a primeira versão funcional de uma empresa despencou, porque [os preços de inferência de LLM caíram ordens de magnitude](https://a16z.com/llmflation-llm-inference-cost/) e o ferramental agora faz o trabalho que antes exigia um time.",
            "Por isso um studio sério consegue nascer AI-native e chegar à receita antes do ponto em que historicamente chegaria a uma rodada precificada. A Infinity afirma um mês até a primeira receita em suas unidades. A mesma dinâmica é o que permite a um construtor disciplinado entregar sem queimar uma Série A antes, tema que cobrimos em [como construir AI-native sem Série A](/library/ai-native-without-series-a) e na [curva de custo de infraestrutura de IA na América Latina](/library/ai-infrastructure-cost-curve-latam)."
          ]
        },
        {
          "id": "where-avante-and-infinity-part-ways",
          "heading": "Onde Avante e Infinity se separam: o mapa",
          "level": 2,
          "paragraphs": [
            "A Infinity ataca o mercado global de serviços profissionais a partir dos Estados Unidos. A Avante opera o mesmo playbook onde a distância entre o tamanho da oportunidade e o nível de software é maior. Serviços representam cerca de 70% do PIB brasileiro, e a maior parte dessa economia mal foi digitalizada. Um studio que entrega profundidade operacional no dia um se compõe mais forte exatamente ali, onde essa profundidade é escassa e um fundo generalista não consegue fabricar.",
            "Essa é a vantagem estrutural por trás de [por que a Avante constrói onde constrói](/why-avante). Operadores de domínio com dez anos ou mais de cicatrizes do mercado brasileiro, somados a um playbook do Vale do Silício e capital de primeiro cheque, montados antes de a empresa existir. A Infinity valida o modelo. Geografia é onde a próxima década de retorno de studio será decidida, e a leitura mais profunda disso está em [a oportunidade da economia de serviços brasileira](/library/brazil-services-economy-opportunity)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Serviços respondem por cerca de 70% do PIB brasileiro, com baixa penetração de software. Essa é a lacuna que um studio foi feito para fechar.",
            "attribution": "Tese da Avante Ventures, participação de serviços via IBGE"
          }
        },
        {
          "id": "the-line-the-headline-buries",
          "heading": "A linha que a manchete esconde: dados",
          "level": 2,
          "paragraphs": [
            "O número da rodada leva a manchete. A vantagem durável é mais silenciosa. Quando fundadores recorrentes constroem dentro de um cérebro compartilhado, o dado que cada empresa gera flui para a próxima. Esse é um fosso que uma única startup, por mais bem financiada que seja, não consegue montar sozinha. É também a parte que a maior parte da cobertura sobre studios pula.",
            "A Avante nomeia o ciclo diretamente. Copilot, dado, capital. Construir um copilot de IA para gerar dado proprietário, depois usar esse dado para levantar e alocar capital. A mecânica está em [o flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel), e por que o dado se compõe em defensabilidade está em [efeitos de rede de dados em IA vertical](/library/data-network-effects-vertical-ai)."
          ]
        },
        {
          "id": "what-an-lp-should-take-from-this",
          "heading": "O que um LP deveria tirar de uma rodada de US$ 24M",
          "level": 2,
          "paragraphs": [
            "Leia a rodada da Infinity como sinal de mercado, não como susto competitivo. Investidores sérios agora financiam o modelo de studio em escala, em público, com um número anexado. O debate sobre se construir empresas em série supera apostar nelas uma a uma está se fechando. O que continua aberto é execução e geografia.",
            "A Avante é a resposta para a América Latina. Um venture studio que constrói empresas AI-native no Brasil e na América Latina, lançando 3-4 ventures por ano, alocando US$ 500K-1,5M por venture, e levando cada uma por um sistema de seis estágios de Research a Partner a Build a Traction a Revenue a Compound. O mesmo modelo que o mercado acabou de precificar em US$ 24M, apontado para a economia onde ele deveria se compor mais forte. Veja [como a Avante opera](/principles), ou [comece uma conversa](/contact)."
          ]
        }
      ]
    },
    "es": {
      "title": "Infinity Constellation levantó US$ 24M para producir empresas de IA en serie. Esa es la tesis del studio.",
      "description": "Un studio de EE. UU. acaba de levantar US$ 24M para construir hasta ocho empresas de IA al año en servicios profesionales. Leído junto al modelo que opera Avante en América Latina, la señal es clara. El studio se está volviendo una clase de activo.",
      "sections": [
        {
          "paragraphs": [
            "El 8 de junio de 2026, Infinity Constellation reveló a Axios que había levantado una Serie A de US$ 24M para construir hasta ocho empresas de IA al año dentro del mercado de servicios profesionales. La ronda fue liderada por Freestyle, con Backed VC, Rafferty, Oxford Funds, BY Ventures y otros, según la [exclusiva de Axios](https://www.axios.com/pro/all-deals/2026/06/08/infinity-constellation-24-million-multiple-ai-companies) y el [comunicado de la empresa](https://www.prnewswire.com/news-releases/infinity-constellation-raises-24m-series-a-to-take-on-professional-services-302794633.html). Esto no es una apuesta a un producto. Es una apuesta a una fábrica.",
            "Léelo junto al modelo que opera [Avante Ventures](/why-avante) en Brasil y América Latina y la señal cuesta ignorar. El venture studio, antes una estructura de nicho discutida por un puñado de convencidos, hoy se capitaliza como una clase de activo. La pregunta interesante ya no es si el modelo de studio funciona. Es quién lo opera, y dónde."
          ]
        },
        {
          "id": "what-infinity-raised-to-do",
          "heading": "Para qué levantó capital Infinity en realidad",
          "level": 2,
          "paragraphs": [
            "Infinity Constellation, liderada por el CEO Brennan Pothetes y presidida por Francis Pedraza, fundador de [Invisible Technologies](https://www.invisible.co), va por el mercado global de servicios profesionales de US$ 6 billones. Pothetes lo dijo sin rodeos. Servicios profesionales es una industria de US$ 6 billones aún construida alrededor de personas cobrando por hora, y esa era se está acabando. La tesis en el [sitio de la empresa](https://www.infinityconstellation.com) es aún más filosa. El futuro de la firma se construye, no se compra.",
            "La estructura es la historia. Infinity no compra firmas tradicionales para atornillarles IA. Construye empresas AI-native nuevas desde una plataforma central, y deja que datos, precios y expertise fluyan entre ellas. Según Axios, prefiere fundadores recurrentes, que se quedan con 25% de la nueva empresa más participación en la propia holding, para que cada operador tenga incentivo de hacer mejor la siguiente empresa. Ya opera varias unidades vivas en asistencia ejecutiva, compliance, diseño, reclutamiento, finanzas y datos."
          ]
        },
        {
          "id": "this-is-a-studio-story",
          "heading": "Esto es una historia de studio, y los números explican por qué",
          "level": 2,
          "paragraphs": [
            "Quítale la marca e Infinity es un venture studio. Un equipo central construye empresas en serie en vez de firmar cheques en las empresas de otros y esperar. Esa distinción no es cosmética. Cambia el retorno. Según la Global Startup Studio Network, las ventures de studio promedian cerca de 50% de IRR contra cerca de 19% de las startups tradicionales financiadas por venture capital, alrededor de 2,5x en horizontes realistas. El mismo conjunto de datos muestra a las ventures de studio llegando a Serie A en unos 25 meses contra 56 de las startups tradicionales, y graduando al 72% frente al 42%. El argumento completo está en nuestro análisis de [por qué los venture studios ganan en América Latina](/library/why-venture-studios-win-latam).",
            "Infinity dice la parte silenciosa en lenguaje de producto. Un cerebro compartido. Composición por diseño. Cada empresa hace a la siguiente más rápida y más inteligente. Ese es el flywheel del studio, y es justo por qué un studio supera a un fondo que da consejos repartido en una docena de directorios. Para el comparativo de estructura, mira [studio versus aceleradora versus VC](/library/studio-vs-accelerator-vs-vc)."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio cercano a 50% contra un estándar de mercado de ~19% para el VC tradicional, alrededor de 2,5x en horizontes realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "ai-makes-a-company-a-year-believable",
          "heading": "La IA es lo que vuelve creíble una empresa al año",
          "level": 2,
          "paragraphs": [
            "Un studio lanzando ocho empresas al año habría sonado imprudente en 2019. Axios resumió en una línea por qué ya no suena así. Ilustra qué tan rápido pueden crearse empresas en la era de la IA. El costo de levantar la primera versión funcional de una empresa se desplomó, porque [los precios de inferencia de LLM cayeron órdenes de magnitud](https://a16z.com/llmflation-llm-inference-cost/) y el herramental hoy hace el trabajo que antes exigía un equipo.",
            "Por eso un studio serio puede nacer AI-native y llegar a ingresos antes del punto en que históricamente habría llegado a una ronda con valoración. Infinity afirma un mes hasta el primer ingreso en sus unidades. La misma dinámica es la que permite a un constructor disciplinado lanzar sin quemar una Serie A antes, algo que cubrimos en [cómo construir AI-native sin Serie A](/library/ai-native-without-series-a) y en [la curva de costo de infraestructura de IA en América Latina](/library/ai-infrastructure-cost-curve-latam)."
          ]
        },
        {
          "id": "where-avante-and-infinity-part-ways",
          "heading": "Donde Avante e Infinity se separan: el mapa",
          "level": 2,
          "paragraphs": [
            "Infinity ataca el mercado global de servicios profesionales desde Estados Unidos. Avante opera el mismo playbook donde la distancia entre el tamaño de la oportunidad y el nivel de software es mayor. Los servicios representan cerca del 70% del PIB brasileño, y la mayor parte de esa economía apenas está digitalizada. Un studio que aporta profundidad operativa el día uno se compone más fuerte justo ahí, donde esa profundidad es escasa y un fondo generalista no puede fabricarla.",
            "Esa es la ventaja estructural detrás de [por qué Avante construye donde construye](/why-avante). Operadores de dominio con diez años o más de cicatrices del mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque, ensamblados antes de que la empresa exista. Infinity valida el modelo. La geografía es donde se decide la próxima década de retorno de studio, y la lectura más profunda está en [la oportunidad de la economía de servicios brasileña](/library/brazil-services-economy-opportunity)."
          ],
          "callout": {
            "kind": "stat",
            "text": "Los servicios representan cerca del 70% del PIB brasileño, con baja penetración de software. Esa es la brecha que un studio fue hecho para cerrar.",
            "attribution": "Tesis de Avante Ventures, participación de servicios via IBGE"
          }
        },
        {
          "id": "the-line-the-headline-buries",
          "heading": "La línea que el titular esconde: datos",
          "level": 2,
          "paragraphs": [
            "El número de la ronda se lleva el titular. La ventaja durable es más silenciosa. Cuando fundadores recurrentes construyen dentro de un cerebro compartido, el dato que cada empresa genera fluye a la siguiente. Ese es un foso que una sola startup, por bien financiada que esté, no puede armar sola. Es también la parte que la mayoría de la cobertura sobre studios omite.",
            "Avante nombra el ciclo directamente. Copilot, dato, capital. Construir un copilot de IA para generar dato propietario, luego usar ese dato para levantar y desplegar capital. La mecánica está en [el flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel), y por qué el dato se compone en defensibilidad está en [efectos de red de datos en IA vertical](/library/data-network-effects-vertical-ai)."
          ]
        },
        {
          "id": "what-an-lp-should-take-from-this",
          "heading": "Qué debería sacar un LP de una ronda de US$ 24M",
          "level": 2,
          "paragraphs": [
            "Lee la ronda de Infinity como señal de mercado, no como susto competitivo. Inversionistas serios hoy financian el modelo de studio a escala, en público, con un número adjunto. El debate sobre si construir empresas en serie le gana a apostar a ellas una por una se está cerrando. Lo que sigue abierto es ejecución y geografía.",
            "Avante es la respuesta para América Latina. Un venture studio que construye empresas AI-native en Brasil y América Latina, lanzando 3-4 ventures al año, desplegando US$ 500K-1,5M por venture, y llevando cada una por un sistema de seis etapas de Research a Partner a Build a Traction a Revenue a Compound. El mismo modelo que el mercado acaba de valorar en US$ 24M, apuntado a la economía donde debería componerse más fuerte. Mira [cómo opera Avante](/principles), o [inicia una conversación](/contact)."
          ]
        }
      ]
    }
  },
  {
    "slug": "lp-allocation-case-venture-studios",
    "category": "research",
    "type": "Research Report",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/lp-allocation-case-venture-studios.png",
    "isPublished": true,
    "en": {
      "title": "The LP Case for a Dedicated Venture Studio Allocation",
      "description": "Studio IRR runs near 50% against roughly 19% for traditional VC. How an LP should size, underwrite, and stress-test a venture studio allocation.",
      "sections": [
        {
          "paragraphs": [
            "The honest question for an allocator is not whether venture studios beat venture capital. It is whether to carve a dedicated studio sleeve inside a venture program, and how to size and underwrite it once you do. The headline that pulls people into that conversation is the Global Startup Studio Network benchmark of roughly 50% IRR versus roughly 19% for traditional VC, about 2.5x over realistic horizons. That number is a prior about the model. It is not an underwritable expected return for any one fund.",
            "This is the venture studio LP allocation case argued from the LP chair, not the founder's. We will state the return gap and its source, show what the J-curve looks like for a studio, lay out the four things an LP actually underwrites, treat the survivorship problem in the benchmark without flinching, and then size the position against the manager risk it carries. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and a young one, so this is also the lens we ask our own LPs to use on us."
          ]
        },
        {
          "id": "return-case",
          "heading": "The return case, stated honestly",
          "level": 2,
          "paragraphs": [
            "Every studio pitch leans on one figure, and it traces to a single source. The Global Startup Studio Network white paper [Disrupting the Venture Landscape](https://insightstudios.s3.amazonaws.com/Disrupting-the-Venture-Landscape_GSSN-White-Paper-1.pdf) puts studio-built companies at a net IRR that downstream summaries round to roughly 50%, against roughly 19% for the traditional venture benchmark, attributed to GSSN. [Alloy Partners](https://www.alloypartners.com/articles/venture-studios-vs-venture-capital), citing the same GSSN data, frames the same gap. For an LP the discipline is to read that as the studio-model benchmark, roughly 2.5x the IRR of traditional VC over realistic time horizons, attributed to GSSN, and we unpack [the data behind the 50% return figure](/library/why-venture-studios-win-latam) separately. It is not any individual studio's realized track record, and Avante does not claim it as ours.",
            "The funnel underneath the IRR is the more useful number, because it is what an allocator can actually diligence. Per the GSSN paper, 84% of companies coming out of studios raise a seed round. Of those, 72% advance from seed to Series A. Net it out and 60% of all studio-created companies reach Series A, against a 33% success rate for an Idealab-style benchmark portfolio of seed-funded companies from 2008 to 2010. The same paper notes that the startup idea accounts for only about 28% of a startup's success. That single line is the whole thesis. Execution is the scarce input, and a studio industrializes execution rather than betting on the next clever idea."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio-built companies show a net IRR near 50% versus roughly 19% for traditional VC, about 2.5x over realistic horizons. The studio-model benchmark, not any single studio's realized return.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "j-curve",
          "heading": "What the J-curve looks like for a studio",
          "level": 2,
          "paragraphs": [
            "The J-curve is the first thing an LP feels, and the studio version has a genuinely different shape. A traditional fund draws capital, charges fees, and marks early positions at cost or below for years before any write-up. That trough is the cost of a blind pool discovered over a three-year investment window. A studio deploys differently. It does not hunt for external deals. It builds the companies it owns from day one, so the team is assembled and the first product is in market before any priced round exists.",
            "That can pull the inflection forward. The studio knows the venture exists because it created it, which compresses the gap between first dollar and first markable position. The honest caveat is that fund-level fees and the long road to actual cash distributions still apply. A studio does not escape the J-curve. It reshapes the venture-level part of it. An LP should underwrite the shape it is buying, not assume the curve disappears."
          ]
        },
        {
          "id": "underwriting",
          "heading": "What an LP actually underwrites",
          "level": 2,
          "paragraphs": [
            "No allocator buys the 50% headline. You underwrite four concrete things, and the real diligence lives in each one."
          ],
          "bullets": [
            "Portfolio construction at the studio level. A studio that launches 3 to 4 ventures a year is a concentrated book by design. You are underwriting the pipeline, the thesis discipline, and how many genuinely independent shots the sleeve will own across the commitment.",
            "Manager concentration risk. A blind-pool fund spreads you across a manager's external sourcing. A single studio is a near-binary bet on one operating team's ability to repeat. This is the largest risk in the position.",
            "Fee and carry versus 2-and-20. Studios take more ownership because they act as institutional co-founder. Per Alloy Partners, that is commonly 20% to 60% or more of a venture against 10% to 30% for a traditional VC. The gross-to-net bridge does not look like a 2-and-20 fund, and you have to model it as its own thing.",
            "Where the overhead lands. A studio funds shared infrastructure, operating partners, and pre-idea research out of the same economics. You are deciding whether that cost is a drag or the exact machinery that produces the funnel advantage."
          ]
        },
        {
          "id": "survivorship",
          "heading": "The survivorship problem in the benchmark",
          "level": 2,
          "paragraphs": [
            "Here is where candor earns the allocation rather than the pitch deck. The studio outperformance figure is dataset-dependent, and the dataset is young. A sharp [analysis of the studio data](https://www.linkedin.com/feed/update/urn:li:activity:7378401918135738369/) makes the case plainly. The roughly 60% IRR often quoted comes from under 20 fully exited fund vehicles, most older than ten years. The sample is self-selected toward studios that survived long enough to report, which is textbook survivorship bias.",
            "There is a second trap worth naming. Comparing an average studio IRR to a top-quartile VC IRR is not a fair fight. The gap between median and top-quartile VC performance from 2001 to 2022 was roughly 2.1x, and venture is a power-law business where the average is a weak summary of anything. Even the traditional benchmark is lumpy. The [Cambridge Associates US PE/VC commentary for 2024](https://www.cambridgeassociates.com/insight/us-pe-vc-benchmark-commentary-calendar-year-2024/) shows the US Venture Capital Index returning 6.2% in 2024 after two negative years, with vintage returns spanning 0.7% to 25.3%. The honest read is that the studio sample is not yet large enough to use with full statistical confidence, even as the best evidence we have, which is why [how you measure studio performance](/library/measuring-studio-performance) matters as much as the headline. Treat the 50% as a directional prior, not a number you can mark a sleeve to."
          ]
        },
        {
          "id": "sizing",
          "heading": "Sizing the allocation against manager risk",
          "level": 2,
          "paragraphs": [
            "Once you accept a young benchmark and a concentrated structure, the sizing logic gets simple. A studio sleeve is a satellite, not a core holding. An LP underwriting a single studio is taking real manager risk, not buying an index, and the position should be sized the way you would size any concentrated, illiquid, single-manager bet. The diversification has to come from elsewhere in the venture program.",
            "What the sleeve buys is not lower portfolio risk. It is exposure to a different return mechanism, ownership and control from day one rather than price discovery on someone else's deal. An LP who wants the studio premium without the single-manager exposure would need a portfolio of studios, a vehicle that barely exists today, or would take the concentration consciously and size for it. There is no version of this where you get the premium and the diversification for free."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante presents to LPs",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and the pitch to an LP starts with where the model bites hardest. According to IBGE data reported in [MercoPress](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), services account for about 70% of Brazil's GDP, a base still lightly penetrated by software. Capital is thin on the ground. LATAM venture investment fell to roughly 3.6 billion dollars across 694 deals in 2024, one of the lowest levels in five years, before recovering into 2025. A thin capital market rewards building ventures over competing to fund them.",
            "The structure behind that claim is specific. Avante launches 3-4 ventures per year through a six-stage system, Research, Partner, Build, Traction, Revenue, Compound, deploying $500K-1.5M per venture and retaining co-founder economics. The recurring pattern is [the copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. The portfolio reads by domain. Alphajuri in judicial assets, WIR in insurance pricing with AXA, BR Auction Intel in real-estate auctions. None of it carries a number we cannot defend.",
            "So the LP case is narrow and it should be. We do not ask anyone to underwrite 50% IRR. We ask them to underwrite one operating team, in one underbuilt market, running a repeatable system, and to size that bet like the concentrated position it is. The full thesis sits at [/why-avante](/why-avante) and the operating model at [/principles](/principles). An allocator who reads the benchmark as a prior and the team as the asset is reading it the way we do."
          ]
        }
      ]
    },
    "pt": {
      "title": "O Argumento para o LP Alocar de Forma Dedicada em Venture Studio",
      "description": "O IRR de studios fica perto de 50% contra cerca de 19% do VC tradicional. Como um LP deve dimensionar, avaliar e testar uma alocação em studio.",
      "sections": [
        {
          "paragraphs": [
            "A pergunta honesta para quem aloca capital não é se venture studios batem o venture capital. É se vale separar uma fatia dedicada a studio dentro do programa de venture, e como dimensionar e avaliar essa fatia depois de decidir. O número que abre essa conversa é o benchmark da Global Startup Studio Network. IRR perto de 50% contra cerca de 19% do VC tradicional, cerca de 2,5x em horizontes realistas. Esse número é uma premissa sobre o modelo. Não é um retorno esperado que se possa subscrever para um fundo específico.",
            "Este é o argumento da alocação de LP em venture studio visto da cadeira do LP, não da cadeira do fundador. Vamos declarar a diferença de retorno e sua fonte, mostrar como é a curva J de um studio, listar as quatro coisas que um LP de fato avalia, tratar do problema de sobrevivência no benchmark sem rodeios, e então dimensionar a posição diante do risco de gestor que ela carrega. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e ainda jovem, então esta é também a lente que pedimos aos nossos próprios LPs usarem ao olhar para nós."
          ]
        },
        {
          "id": "return-case",
          "heading": "O argumento de retorno, dito com honestidade",
          "level": 2,
          "paragraphs": [
            "Todo pitch de studio se apoia em um número, e ele vem de uma fonte só. O white paper da Global Startup Studio Network, [Disrupting the Venture Landscape](https://insightstudios.s3.amazonaws.com/Disrupting-the-Venture-Landscape_GSSN-White-Paper-1.pdf), coloca as empresas construídas por studios em um IRR líquido que os resumos arredondam para perto de 50%, contra cerca de 19% do benchmark de venture tradicional, atribuído à GSSN. A [Alloy Partners](https://www.alloypartners.com/articles/venture-studios-vs-venture-capital), citando os dados da GSSN, enquadra a mesma diferença. Para um LP a disciplina é ler isso como o benchmark do modelo de studio, cerca de 2,5x o IRR do VC tradicional em horizontes realistas, atribuído à GSSN, e detalhamos [os dados por trás do número de 50% de retorno](/library/why-venture-studios-win-latam) à parte. Não é o histórico realizado de nenhum studio em particular, e a Avante não reivindica esse número como seu.",
            "O funil por trás do IRR é o dado mais útil, porque é o que um alocador consegue de fato investigar. Segundo o paper da GSSN, 84% das empresas que saem de studios levantam uma rodada seed. Dessas, 72% avançam de seed para Série A. No líquido, 60% de todas as empresas criadas por studios chegam à Série A, contra uma taxa de sucesso de 33% em uma carteira de referência no estilo Idealab, de empresas seed entre 2008 e 2010. O mesmo paper observa que a ideia da startup responde por apenas cerca de 28% do sucesso dela. Essa linha sozinha é a tese inteira. A execução é o insumo escasso, e um studio industrializa a execução em vez de apostar na próxima ideia esperta."
          ],
          "callout": {
            "kind": "stat",
            "text": "Empresas construídas por studios mostram IRR líquido perto de 50% contra cerca de 19% do VC tradicional, cerca de 2,5x em horizontes realistas. É o benchmark do modelo de studio, não o retorno realizado de um studio específico.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "j-curve",
          "heading": "Como é a curva J de um studio",
          "level": 2,
          "paragraphs": [
            "A curva J é a primeira coisa que um LP sente, e a versão de studio tem um formato genuinamente diferente. Um fundo tradicional chama capital, cobra taxas e marca posições iniciais a custo ou abaixo dele por anos antes de qualquer reavaliação para cima. Esse fundo de poço é o custo de uma carteira cega descoberta ao longo de uma janela de investimento de três anos. Um studio aplica o capital de outro jeito. Ele não caça deals externos. Ele constrói as empresas que controla desde o dia um, então o time está montado e o primeiro produto está no mercado antes de existir qualquer rodada precificada.",
            "Isso pode antecipar o ponto de inflexão. O studio sabe que a venture existe porque foi ele quem a criou, o que comprime o intervalo entre o primeiro real investido e a primeira posição marcável. A ressalva honesta é que as taxas no nível do fundo e o longo caminho até distribuições de caixa reais continuam valendo. Um studio não escapa da curva J. Ele remodela a parte dela que fica no nível da venture. Um LP deve avaliar o formato que está comprando, não supor que a curva some."
          ]
        },
        {
          "id": "underwriting",
          "heading": "O que um LP realmente avalia",
          "level": 2,
          "paragraphs": [
            "Nenhum alocador compra a manchete dos 50%. Você avalia quatro coisas concretas, e a investigação de verdade vive em cada uma delas."
          ],
          "bullets": [
            "Construção de portfólio no nível do studio. Um studio que lança 3 a 4 ventures por ano é uma carteira concentrada por desenho. Você está avaliando o pipeline, a disciplina de tese e quantas apostas de fato independentes a fatia vai deter ao longo do compromisso.",
            "Risco de concentração de gestor. Um fundo de carteira cega te espalha pela originação externa de um gestor. Um único studio é uma aposta quase binária na capacidade de um time operacional repetir o feito. Esse é o maior risco da posição.",
            "Taxas e carry diante do 2-and-20. Studios pegam mais participação porque atuam como co-founder institucional. Segundo a Alloy Partners, isso costuma ser de 20% a 60% ou mais de uma venture contra 10% a 30% de um VC tradicional. A ponte do bruto para o líquido não se parece com um fundo 2-and-20, e você tem que modelá-la como algo próprio.",
            "Onde o overhead cai. Um studio financia infraestrutura compartilhada, operating partners e pesquisa pré-ideia com a mesma economia. Você está decidindo se esse custo é um peso ou justamente a máquina que produz a vantagem do funil."
          ]
        },
        {
          "id": "survivorship",
          "heading": "O problema de sobrevivência no benchmark",
          "level": 2,
          "paragraphs": [
            "É aqui que a franqueza, e não o pitch, conquista a alocação. O número de outperformance dos studios depende do conjunto de dados, e o conjunto é jovem. Uma [análise afiada dos dados de studio](https://www.linkedin.com/feed/update/urn:li:activity:7378401918135738369/) coloca o ponto sem rodeios. O IRR perto de 60% que se cita com frequência vem de menos de 20 veículos de fundo totalmente liquidados, a maioria com mais de dez anos. A amostra é autosselecionada para studios que sobreviveram tempo suficiente para reportar, o que é viés de sobrevivência de manual.",
            "Há uma segunda armadilha que vale nomear. Comparar um IRR médio de studio com um IRR de VC do quartil superior não é luta justa. A diferença entre o desempenho mediano e o do quartil superior em VC entre 2001 e 2022 foi de cerca de 2,1x, e venture é um negócio de lei de potência onde a média é um resumo fraco de qualquer coisa. Até o benchmark tradicional é irregular. O [comentário de PE/VC dos EUA da Cambridge Associates para 2024](https://www.cambridgeassociates.com/insight/us-pe-vc-benchmark-commentary-calendar-year-2024/) mostra o US Venture Capital Index rendendo 6,2% em 2024 depois de dois anos negativos, com retornos por safra indo de 0,7% a 25,3%. A leitura honesta é que a amostra de studios ainda não é grande o bastante para ser usada com plena confiança estatística, mesmo sendo a melhor evidência que temos, e é por isso que [como você mede o desempenho de um studio](/library/measuring-studio-performance) importa tanto quanto a manchete. Trate os 50% como uma premissa direcional, não como um número ao qual você possa marcar uma fatia."
          ]
        },
        {
          "id": "sizing",
          "heading": "Dimensionar a alocação diante do risco de gestor",
          "level": 2,
          "paragraphs": [
            "Quando você aceita um benchmark jovem e uma estrutura concentrada, a lógica de dimensionamento fica simples. A fatia de studio é satélite, não posição central. Um LP que subscreve um único studio está assumindo risco de gestor de verdade, não comprando um índice, e a posição deve ser dimensionada como qualquer aposta concentrada, ilíquida e de gestor único. A diversificação tem que vir de outro lugar do programa de venture.",
            "O que a fatia compra não é menos risco de portfólio. É exposição a um mecanismo de retorno diferente, propriedade e controle desde o dia um em vez de descoberta de preço no deal de outra pessoa. Um LP que quer o prêmio de studio sem a exposição de gestor único precisaria de um portfólio de studios, um veículo que mal existe hoje, ou assumiria a concentração de forma consciente e a dimensionaria. Não há versão disso em que você ganha o prêmio e a diversificação de graça."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante se apresenta a LPs",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e o pitch a um LP começa por onde o modelo morde mais forte. Segundo dados do IBGE reportados pela [MercoPress](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), os serviços respondem por cerca de 70% do PIB do Brasil, uma base ainda pouco penetrada por software. O capital é escasso no chão. O investimento de venture na América Latina caiu para cerca de 3,6 bilhões de dólares em 694 deals em 2024, um dos níveis mais baixos em cinco anos, antes de se recuperar em 2025. Um mercado de capital escasso recompensa construir ventures em vez de competir para financiá-las.",
            "A estrutura por trás dessa afirmação é específica. A Avante lança 3-4 ventures por ano através de um sistema de seis estágios, Research, Partner, Build, Traction, Revenue, Compound, aplicando US$ 500K-1,5M por venture e retendo economia de co-founder. O padrão recorrente é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copiloto de IA para gerar dado proprietário, e então usar esse dado para captar e aplicar capital. O portfólio se lê por domínio. Alphajuri em ativos judiciais, WIR em precificação de seguros com a AXA, BR Auction Intel em leilões de imóveis. Nada disso carrega um número que a gente não consiga defender.",
            "Então o argumento ao LP é estreito, e deve ser mesmo. A gente não pede a ninguém para subscrever 50% de IRR. A gente pede para subscrever um time operacional, em um mercado pouco construído, rodando um sistema repetível, e para dimensionar essa aposta como a posição concentrada que ela é. A tese completa está em [/why-avante](/why-avante) e o modelo operacional em [/principles](/principles). O alocador que lê o benchmark como premissa e o time como o ativo está lendo do jeito que nós lemos."
          ]
        }
      ]
    },
    "es": {
      "title": "El Argumento para que un LP Asigne de Forma Dedicada a Venture Studio",
      "description": "El IRR de los studios ronda el 50% frente a cerca del 19% del VC tradicional. Cómo un LP debe dimensionar, evaluar y estresar una asignación a studio.",
      "sections": [
        {
          "paragraphs": [
            "La pregunta honesta para quien asigna capital no es si los venture studios le ganan al venture capital. Es si conviene separar una porción dedicada a studio dentro del programa de venture, y cómo dimensionarla y evaluarla una vez que lo decide. El número que abre esa conversación es el benchmark de la Global Startup Studio Network. IRR cercano al 50% frente a cerca del 19% del VC tradicional, alrededor de 2,5x en horizontes realistas. Ese número es una premisa sobre el modelo. No es un retorno esperado que se pueda suscribir para un fondo en particular.",
            "Este es el argumento de la asignación de LP en venture studio visto desde la silla del LP, no la del fundador. Vamos a plantear la diferencia de retorno y su fuente, mostrar cómo se ve la curva J de un studio, enumerar las cuatro cosas que un LP realmente evalúa, tratar el problema de supervivencia en el benchmark sin rodeos, y luego dimensionar la posición frente al riesgo de gestor que carga. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y todavía joven, así que esta es también la lente que le pedimos a nuestros propios LPs que usen al mirarnos."
          ]
        },
        {
          "id": "return-case",
          "heading": "El argumento de retorno, dicho con honestidad",
          "level": 2,
          "paragraphs": [
            "Todo pitch de studio se apoya en un número, y viene de una sola fuente. El white paper de la Global Startup Studio Network, [Disrupting the Venture Landscape](https://insightstudios.s3.amazonaws.com/Disrupting-the-Venture-Landscape_GSSN-White-Paper-1.pdf), ubica a las empresas construidas por studios en un IRR neto que los resúmenes redondean a cerca del 50%, frente a cerca del 19% del benchmark de venture tradicional, atribuido a GSSN. [Alloy Partners](https://www.alloypartners.com/articles/venture-studios-vs-venture-capital), citando los datos de GSSN, enmarca la misma diferencia. Para un LP la disciplina es leer eso como el benchmark del modelo de studio, alrededor de 2,5x el IRR del VC tradicional en horizontes realistas, atribuido a GSSN, y desglosamos [los datos detrás de la cifra de 50% de retorno](/library/why-venture-studios-win-latam) aparte. No es el historial realizado de ningún studio en particular, y Avante no reclama ese número como propio.",
            "El embudo detrás del IRR es el dato más útil, porque es lo que un asignador puede de verdad investigar. Según el paper de GSSN, el 84% de las empresas que salen de studios levantan una ronda seed. De esas, el 72% avanza de seed a Serie A. En neto, el 60% de todas las empresas creadas por studios llega a Serie A, frente a una tasa de éxito del 33% en una cartera de referencia al estilo Idealab, de empresas seed entre 2008 y 2010. El mismo paper observa que la idea de la startup explica solo cerca del 28% de su éxito. Esa línea sola es la tesis entera. La ejecución es el insumo escaso, y un studio industrializa la ejecución en lugar de apostar a la próxima idea ingeniosa."
          ],
          "callout": {
            "kind": "stat",
            "text": "Las empresas construidas por studios muestran un IRR neto cercano al 50% frente a cerca del 19% del VC tradicional, alrededor de 2,5x en horizontes realistas. Es el benchmark del modelo de studio, no el retorno realizado de un studio específico.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "j-curve",
          "heading": "Cómo se ve la curva J de un studio",
          "level": 2,
          "paragraphs": [
            "La curva J es lo primero que siente un LP, y la versión de studio tiene una forma genuinamente distinta. Un fondo tradicional llama capital, cobra comisiones y marca las posiciones iniciales a costo o por debajo durante años antes de cualquier revaluación al alza. Ese pozo es el costo de una cartera ciega descubierta a lo largo de una ventana de inversión de tres años. Un studio despliega el capital de otra manera. No caza deals externos. Construye las empresas que controla desde el día uno, así que el equipo está armado y el primer producto está en el mercado antes de que exista cualquier ronda con precio.",
            "Eso puede adelantar el punto de inflexión. El studio sabe que la venture existe porque él la creó, lo que comprime el intervalo entre el primer dólar invertido y la primera posición marcable. La salvedad honesta es que las comisiones a nivel del fondo y el largo camino hasta distribuciones de caja reales siguen aplicando. Un studio no escapa de la curva J. Reformula la parte que queda a nivel de la venture. Un LP debe evaluar la forma que está comprando, no suponer que la curva desaparece."
          ]
        },
        {
          "id": "underwriting",
          "heading": "Qué evalúa realmente un LP",
          "level": 2,
          "paragraphs": [
            "Ningún asignador compra el titular del 50%. Usted evalúa cuatro cosas concretas, y la investigación de verdad vive en cada una de ellas."
          ],
          "bullets": [
            "Construcción de portafolio a nivel del studio. Un studio que lanza 3 a 4 ventures por año es una cartera concentrada por diseño. Usted evalúa el pipeline, la disciplina de tesis y cuántas apuestas de verdad independientes tendrá la porción a lo largo del compromiso.",
            "Riesgo de concentración de gestor. Un fondo de cartera ciega lo reparte por la originación externa de un gestor. Un solo studio es una apuesta casi binaria a la capacidad de un equipo operativo de repetir el resultado. Es el mayor riesgo de la posición.",
            "Comisiones y carry frente al 2-and-20. Los studios toman más participación porque actúan como co-founder institucional. Según Alloy Partners, eso suele ser del 20% al 60% o más de una venture frente al 10% al 30% de un VC tradicional. El puente del bruto al neto no se parece a un fondo 2-and-20, y hay que modelarlo como algo propio.",
            "Dónde cae el overhead. Un studio financia infraestructura compartida, operating partners e investigación previa a la idea con la misma economía. Usted decide si ese costo es un lastre o justamente la maquinaria que produce la ventaja del embudo."
          ]
        },
        {
          "id": "survivorship",
          "heading": "El problema de supervivencia en el benchmark",
          "level": 2,
          "paragraphs": [
            "Aquí es donde la franqueza, y no el pitch, gana la asignación. El número de outperformance de los studios depende del conjunto de datos, y el conjunto es joven. Un [análisis agudo de los datos de studio](https://www.linkedin.com/feed/update/urn:li:activity:7378401918135738369/) plantea el punto sin rodeos. El IRR cercano al 60% que se cita seguido viene de menos de 20 vehículos de fondo totalmente liquidados, la mayoría con más de diez años. La muestra está autoseleccionada hacia studios que sobrevivieron lo suficiente para reportar, lo que es sesgo de supervivencia de manual.",
            "Hay una segunda trampa que vale nombrar. Comparar un IRR promedio de studio con un IRR de VC del cuartil superior no es pelea justa. La diferencia entre el desempeño mediano y el del cuartil superior en VC entre 2001 y 2022 fue de cerca de 2,1x, y el venture es un negocio de ley de potencia donde el promedio es un resumen débil de cualquier cosa. Hasta el benchmark tradicional es irregular. El [comentario de PE/VC de EE. UU. de Cambridge Associates para 2024](https://www.cambridgeassociates.com/insight/us-pe-vc-benchmark-commentary-calendar-year-2024/) muestra al US Venture Capital Index rindiendo 6,2% en 2024 tras dos años negativos, con retornos por añada que van del 0,7% al 25,3%. La lectura honesta es que la muestra de studios todavía no es lo bastante grande para usarse con plena confianza estadística, aun siendo la mejor evidencia que tenemos, y por eso [cómo se mide el desempeño de un studio](/library/measuring-studio-performance) importa tanto como el titular. Trate el 50% como una premisa direccional, no como un número al que pueda marcar una porción."
          ]
        },
        {
          "id": "sizing",
          "heading": "Dimensionar la asignación frente al riesgo de gestor",
          "level": 2,
          "paragraphs": [
            "Cuando usted acepta un benchmark joven y una estructura concentrada, la lógica de dimensionamiento se vuelve simple. La porción de studio es satélite, no posición central. Un LP que suscribe un solo studio está asumiendo riesgo de gestor real, no comprando un índice, y la posición debe dimensionarse como cualquier apuesta concentrada, ilíquida y de gestor único. La diversificación tiene que venir de otro lado del programa de venture.",
            "Lo que la porción compra no es menos riesgo de portafolio. Es exposición a un mecanismo de retorno distinto, propiedad y control desde el día uno en lugar de descubrimiento de precio en el deal de otra persona. Un LP que quiere la prima de studio sin la exposición de gestor único necesitaría un portafolio de studios, un vehículo que apenas existe hoy, o asumiría la concentración de forma consciente y la dimensionaría. No hay versión de esto donde usted se lleve la prima y la diversificación gratis."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo se presenta Avante ante LPs",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y el pitch a un LP arranca por donde el modelo muerde más fuerte. Según datos del IBGE reportados por [MercoPress](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), los servicios representan cerca del 70% del PIB de Brasil, una base todavía poco penetrada por software. El capital escasea en el terreno. La inversión de venture en América Latina cayó a cerca de 3,6 mil millones de dólares en 694 deals en 2024, uno de los niveles más bajos en cinco años, antes de recuperarse en 2025. Un mercado de capital escaso premia construir ventures en lugar de competir por financiarlas.",
            "La estructura detrás de esa afirmación es específica. Avante lanza 3-4 ventures por año a través de un sistema de seis etapas, Research, Partner, Build, Traction, Revenue, Compound, desplegando US$ 500K-1,5M por venture y reteniendo economía de co-founder. El patrón recurrente es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copiloto de IA para generar dato propietario, y luego usar ese dato para levantar y desplegar capital. El portafolio se lee por dominio. Alphajuri en activos judiciales, WIR en precificación de seguros con AXA, BR Auction Intel en remates inmobiliarios. Nada de eso carga un número que no podamos defender.",
            "Así que el argumento al LP es estrecho, y debe serlo. No le pedimos a nadie que suscriba 50% de IRR. Le pedimos que suscriba un equipo operativo, en un mercado poco construido, corriendo un sistema repetible, y que dimensione esa apuesta como la posición concentrada que es. La tesis completa está en [/why-avante](/why-avante) y el modelo operativo en [/principles](/principles). El asignador que lee el benchmark como premisa y al equipo como el activo lo está leyendo igual que nosotros."
          ]
        }
      ]
    }
  },
  {
    "slug": "measuring-studio-performance",
    "category": "research",
    "type": "Research Report",
    "readTime": "12 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "How to Actually Measure a Venture Studio",
      "description": "IRR flatters, TVPI is paper, DPI is the only cash truth. A guide to venture studio performance metrics, the survivorship traps, and why the ~50% benchmark holds up.",
      "sections": [
        {
          "paragraphs": [
            "A venture studio quoting one headline number is telling you almost nothing until you know which number it is. Three metrics carry the freight in private markets, and they answer three different questions. IRR answers how fast. TVPI answers how much on paper. DPI answers how much in cash. Confuse them and you will mistake a marketing slide for a track record.",
            "This is a guide to venture studio performance metrics for readers who have to allocate real capital. We will define IRR vs TVPI vs DPI, show what each one hides, treat survivorship bias head on, and explain why the GSSN studio benchmark of ~50% IRR versus ~19% for traditional VC still holds up as a directional fact. Avante Ventures is a venture studio building [AI-native companies in Brazil and Latin America](/library/ai-native-without-series-a), and a young one, so this is also how we think about reporting on ourselves."
          ]
        },
        {
          "id": "three-metrics",
          "heading": "IRR, TVPI, and DPI are not the same claim",
          "level": 2,
          "paragraphs": [
            "Each metric answers a different question, and a studio that blurs them is usually hiding behind the friendliest one. IRR is the annualized, time-weighted return on cash flows. It rewards early distributions disproportionately. TVPI, total value to paid-in, is realized plus unrealized value over invested capital, the total created on paper. DPI, distributions to paid-in, is the cash actually returned to investors over what they put in.",
            "The cleanest framing comes from a [Value Add VC breakdown of fund metrics](https://valueaddvc.com/blog/how-venture-capital-fund-performance-is-measured-irr-tvpi-dpi-and-rvpi-explained). IRR is a marketing metric. TVPI is a progress metric. DPI is the only one that settles the debate. A 1.0x DPI means investors got their money back in cash. A 0.3x DPI means 70% of the fund is still paper and a story."
          ],
          "bullets": [
            "IRR. How fast capital compounded, on paper, with timing assumptions baked in.",
            "TVPI. How much total value exists, realized plus unrealized, before anyone is paid.",
            "DPI. How much cash actually landed in an investor account. The only one that cannot be marked up."
          ],
          "callout": {
            "kind": "stat",
            "text": "Most 2019-2022 vintage funds showed DPI below 0.5x as of early 2026, after the IPO window slammed shut. Half the paper, almost none of the cash.",
            "attribution": "Value Add VC, 2026"
          }
        },
        {
          "id": "irr",
          "heading": "Why IRR alone is a yellow flag",
          "level": 3,
          "paragraphs": [
            "IRR is the most flattered number in private markets, and the academic record is blunt about it. Ludovic Phalippou, the Oxford finance professor, has spent years documenting how since-inception IRR overstates returns. In his November 2024 piece for the [CFA Institute on the tyranny of IRR](https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns), he shows that across 12,306 private capital funds holding $10.5 trillion, the median IRR was 9.1% and the public-market-equivalent implied just 1.4% annual outperformance over the S&P 500.",
            "The flattery is mechanical, not mysterious. IRR assumes interim cash can be reinvested at the same rate and it overweights early cash flows. A manager can lock in one early exit, hold the strugglers at cost, and post a number that has drifted away from anything an investor will ever bank. Phalippou put it sharply. IRR has become the theatre of private equity performance. It delivers a beautiful illusion until someone looks at the maths.",
            "So when a studio leads with IRR alone, especially in its early years, read it as a yellow flag. It is showing you the metric that is easiest to flatter and furthest from cash."
          ]
        },
        {
          "id": "tvpi-dpi",
          "heading": "TVPI is paper, DPI is cash",
          "level": 3,
          "paragraphs": [
            "TVPI tells you the trajectory. DPI tells you the truth. The gap between them is where most self-deception lives. The J-curve means early TVPI sits below 1.0x for years on fees and timing alone, and the metric mixes real cash with speculative paper valuations that depend entirely on the last round's price.",
            "Markups prove the point. In 2021 paper values ran hot. In 2023 and 2024 many funds quietly cut residual values by 30 to 50 percent, per the same Value Add VC analysis. A TVPI built on stale 2021 marks is a number waiting to be revised down.",
            "This is also why DPI lags for years and why an honest young studio cannot show a meaningful one yet. Distributions need exits, and exits need a liquid market. The metric that cannot be gamed is also the one that takes the longest to arrive. Patience is not a weakness in the number. It is the number working correctly."
          ]
        },
        {
          "id": "survivorship",
          "heading": "Survivorship bias and how benchmarks correct for it",
          "level": 2,
          "paragraphs": [
            "Every studio benchmark you read is built on a survivor's sample, and that quietly lifts the headline. Survivorship bias, as [VC Beast defines it](https://vcbeast.com/venture-capital-glossary/survivorship-bias), is the tendency to study only the funds and companies that lived while ignoring the far more numerous failures. The structural problem for any benchmark is plain. Failed funds stop reporting, so the database keeps the winners and loses the losers.",
            "The distortion is measurable in neighboring asset classes. A 2025 Wedge Capital Management study found survivors beat drop-outs by about 0.86% a year, and hedge fund indices have historically been inflated by roughly 3 to 4.5 percent annually from these biases. Numbers built only on who is left will always read high.",
            "Credible benchmarks fight back in three ways, and a reader should check for all three. Fix the time window so one boom vintage cannot dominate. Widen the sample so no single survivor swings the average. Disclose the sample size so the reader can judge it. The venture studio dataset compiled by 9point8 Collective does the last one openly, stating its performance figures rest on 20 studios with 2015 to 2022 vintages and that only 13% of studios keep firm-level track records."
          ],
          "callout": {
            "kind": "stat",
            "text": "Only ~13% of venture studios maintain a firm-level track record. Any benchmark drawn from the rest is reading the survivors.",
            "attribution": "9point8 Collective, 2024"
          }
        },
        {
          "id": "why-it-holds",
          "heading": "Why the GSSN gap still holds up",
          "level": 2,
          "paragraphs": [
            "The studio outperformance figure survives a skeptical read, as long as you frame it honestly. The Global Startup Studio Network benchmark puts studio IRR at roughly 50% against an industry-standard roughly 19% for traditional VC, about 2.5x the IRR of traditional VC over realistic time horizons. State it precisely. That is the GSSN studio-model benchmark, never any one studio's realized return, and a young studio has no meaningful DPI behind it.",
            "What makes the gap credible is that independent samples point the same way even when the decimals differ. The [9point8 Collective venture studio data](https://9point8collective.com/research) reports an average net studio IRR of 60% against 33% for top-quartile traditional VC, studios putting 2.3 to 2.6x more value into each dollar deployed, and studio-built companies reaching Series A in 25 months versus 56 for traditionally founded startups. Different number, same direction.",
            "The mechanism is why it is structural rather than luck. The studio compresses time-to-traction and routes capital into product instead of company-building overhead, repeated across every venture. Datasets argue about the exact figure. None of them argue about the sign. A directional benchmark that holds across independent samples is exactly the kind worth trusting, and exactly the kind worth stating with its caveats attached."
          ]
        },
        {
          "id": "misleading",
          "heading": "Metrics that mislead",
          "level": 2,
          "paragraphs": [
            "Some numbers a studio shows you are not performance at all. They are activity wearing performance's clothes. Learn to name them on sight."
          ],
          "bullets": [
            "Logo counts. The number of companies launched says nothing about whether any returned cash. Vanity at portfolio scale.",
            "Total capital raised by the portfolio. This measures other investors' enthusiasm, not the studio's return. A portfolio can raise a fortune in follow-on and distribute nothing to the studio's own backers.",
            "Unrealized markups in a frozen market. With most 2019-2022 vintages below 0.5x DPI, a TVPI resting on 2021 marks is a haircut waiting to happen.",
            "Since-inception IRR with no horizon context, the exact metric Phalippou argues should be banned in favor of horizon IRRs."
          ],
          "callout": {
            "kind": "tip",
            "text": "If a studio leads with logos launched and total capital raised, ask one question. What is your DPI, and on what sample. The answer, or the dodge, tells you everything."
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante reports on itself",
          "level": 2,
          "paragraphs": [
            "The honest position for a young studio is to name what it cannot yet prove. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We launch 3-4 ventures per year through a six-stage system, Research, Partner, Build, Traction, Revenue, Compound, deploying $500K-1.5M per venture and retaining co-founder economics. Avante is young, so our own DPI is not yet meaningful. Saying that plainly is the point. The ~50% IRR versus ~19% IRR gap is the GSSN benchmark for the model, not a claim about Avante's realized return.",
            "What we can be measured on today are leading indicators with teeth. Time-to-traction, where a studio venture launches 6-9 months ahead of a comparably funded standalone team. Capital efficiency, where solving company plumbing once routes roughly $300K-500K of effective capital per venture into product rather than overhead. And the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel), where an AI copilot generates proprietary data that earns the right to raise.",
            "The regional reading matters here. LATAM venture capital ran near $4.5 billion across 751 deals in 2024, a thinner and more cyclical exit market than the US, which makes DPI honesty more important in Brazil, not less, where [services are roughly 70% of GDP with low software penetration](/library/brazil-services-economy-opportunity). The edge is operators with 10+ years of Brazilian-market scar tissue paired with first-ticket capital on day one. A studio that earns the right to quote ~50% IRR is the one willing to tell you its DPI is still zero. Read the thesis at [/why-avante](/why-avante) and the operating model at [/principles](/principles)."
          ]
        }
      ]
    },
    "pt": {
      "title": "Como Medir de Verdade um Venture Studio",
      "description": "O IRR enfeita, o TVPI é papel, o DPI é a única verdade em caixa. Um guia das métricas de venture studio, das armadilhas de sobrevivência e do benchmark de ~50%.",
      "sections": [
        {
          "paragraphs": [
            "Um venture studio que cita um único número de destaque não está dizendo quase nada até você saber qual número é. Três métricas carregam o peso nos mercados privados, e cada uma responde a uma pergunta diferente. O IRR responde quão rápido. O TVPI responde quanto no papel. O DPI responde quanto em caixa. Confunda as três e você toma um slide de marketing por um histórico de retorno.",
            "Este é um guia das métricas de venture studio para quem precisa alocar capital de verdade. Vamos definir IRR vs TVPI vs DPI, mostrar o que cada uma esconde, tratar o viés de sobrevivência de frente e explicar por que o benchmark do GSSN de ~50% de IRR contra ~19% para VC tradicional ainda se sustenta como fato direcional. A Avante Ventures é um venture studio que constrói [empresas AI-native no Brasil e na América Latina](/library/ai-native-without-series-a), e um studio jovem. Então este texto também é como pensamos em prestar contas sobre nós mesmos."
          ]
        },
        {
          "id": "three-metrics",
          "heading": "IRR, TVPI e DPI não são a mesma afirmação",
          "level": 2,
          "paragraphs": [
            "Cada métrica responde a uma pergunta distinta, e um studio que as embaralha costuma estar se escondendo atrás da mais simpática. O IRR é o retorno anualizado e ponderado pelo tempo sobre os fluxos de caixa. Ele recompensa distribuições antecipadas de forma desproporcional. O TVPI, total value to paid-in, é o valor realizado mais o não realizado sobre o capital investido, o total criado no papel. O DPI, distributions to paid-in, é o caixa de fato devolvido aos investidores sobre o que eles aportaram.",
            "O enquadramento mais limpo vem de uma [análise de métricas de fundo da Value Add VC](https://valueaddvc.com/blog/how-venture-capital-fund-performance-is-measured-irr-tvpi-dpi-and-rvpi-explained). O IRR é uma métrica de marketing. O TVPI é uma métrica de progresso. O DPI é a única que encerra o debate. Um DPI de 1,0x significa que os investidores receberam seu dinheiro de volta em caixa. Um DPI de 0,3x significa que 70% do fundo ainda é papel e narrativa."
          ],
          "bullets": [
            "IRR. Quão rápido o capital compôs, no papel, com as premissas de tempo embutidas.",
            "TVPI. Quanto valor total existe, realizado mais não realizado, antes de alguém ser pago.",
            "DPI. Quanto caixa de fato chegou na conta do investidor. A única que não pode ser remarcada para cima."
          ],
          "callout": {
            "kind": "stat",
            "text": "A maioria dos fundos das safras de 2019 a 2022 mostrava DPI abaixo de 0,5x no início de 2026, depois que a janela de IPO fechou. Metade do papel, quase nada de caixa.",
            "attribution": "Value Add VC, 2026"
          }
        },
        {
          "id": "irr",
          "heading": "Por que IRR sozinho é um sinal amarelo",
          "level": 3,
          "paragraphs": [
            "O IRR é o número mais enfeitado dos mercados privados, e a literatura acadêmica é dura com ele. Ludovic Phalippou, professor de finanças de Oxford, passou anos documentando como o IRR desde a constituição superestima retornos. No texto dele de novembro de 2024 para o [CFA Institute sobre a tirania do IRR](https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns), ele mostra que, em 12.306 fundos de capital privado com 10,5 trilhões de dólares, o IRR mediano foi de 9,1% e o equivalente a mercado público implicava apenas 1,4% de retorno acima do S&P 500 ao ano.",
            "O enfeite é mecânico, não misterioso. O IRR assume que o caixa intermediário pode ser reinvestido à mesma taxa e pesa demais os fluxos iniciais. Um gestor trava uma saída antecipada, mantém os ativos problemáticos a custo e publica um número que já se descolou de tudo que um investidor um dia vai sacar. Phalippou foi direto. O IRR virou o teatro da performance de private equity. Entrega uma bela ilusão até alguém olhar a conta.",
            "Então, quando um studio lidera com IRR sozinho, sobretudo nos primeiros anos, leia como um sinal amarelo. Ele está mostrando a métrica mais fácil de enfeitar e a mais distante do caixa."
          ]
        },
        {
          "id": "tvpi-dpi",
          "heading": "TVPI é papel, DPI é caixa",
          "level": 3,
          "paragraphs": [
            "O TVPI mostra a trajetória. O DPI mostra a verdade. O espaço entre os dois é onde mora quase todo o autoengano. A curva J faz o TVPI inicial ficar abaixo de 1,0x por anos, só por taxas e timing, e a métrica mistura caixa real com valuations especulativos que dependem inteiramente do preço da última rodada.",
            "As remarcações provam o ponto. Em 2021 os valores de papel correram quentes. Em 2023 e 2024 muitos fundos cortaram em silêncio o valor residual em 30 a 50 por cento, segundo a mesma análise da Value Add VC. Um TVPI apoiado em marcas velhas de 2021 é um número esperando ser revisado para baixo.",
            "É também por isso que o DPI atrasa por anos e por que um studio jovem e honesto ainda não tem um DPI relevante. Distribuição exige saída, e saída exige um mercado líquido. A métrica que não pode ser manipulada também é a que demora mais a chegar. Paciência não é fraqueza no número. É o número funcionando como deve."
          ]
        },
        {
          "id": "survivorship",
          "heading": "Viés de sobrevivência e como os benchmarks corrigem",
          "level": 2,
          "paragraphs": [
            "Todo benchmark de studio que você lê é construído sobre uma amostra de sobreviventes, e isso eleva o número de destaque em silêncio. O viés de sobrevivência, como a [VC Beast define](https://vcbeast.com/venture-capital-glossary/survivorship-bias), é a tendência de estudar só os fundos e empresas que viveram, ignorando as falhas, bem mais numerosas. O problema estrutural para qualquer benchmark é simples. Fundos que falham param de reportar, então a base mantém os vencedores e perde os perdedores.",
            "A distorção é mensurável em classes de ativos vizinhas. Um estudo de 2025 da Wedge Capital Management encontrou sobreviventes batendo os que saíram em cerca de 0,86% ao ano, e índices de hedge fund foram historicamente inflados em torno de 3 a 4,5 por cento ao ano por esses vieses. Números montados só sobre quem ficou sempre leem alto.",
            "Benchmarks confiáveis reagem de três formas, e o leitor deve checar as três. Fixar a janela de tempo para que uma safra de boom não domine. Ampliar a amostra para que nenhum sobrevivente isolado mova a média. Divulgar o tamanho da amostra para que o leitor possa julgar. A base de venture studios compilada pela 9point8 Collective faz a última abertamente, afirmando que seus números de performance vêm de 20 studios com safras de 2015 a 2022 e que apenas 13% dos studios mantêm histórico no nível da firma."
          ],
          "callout": {
            "kind": "stat",
            "text": "Apenas ~13% dos venture studios mantêm um histórico de retorno no nível da firma. Qualquer benchmark tirado do resto está lendo os sobreviventes.",
            "attribution": "9point8 Collective, 2024"
          }
        },
        {
          "id": "why-it-holds",
          "heading": "Por que o gap do GSSN se sustenta",
          "level": 2,
          "paragraphs": [
            "O número de outperformance do modelo studio sobrevive a uma leitura cética, desde que você o enquadre com honestidade. O benchmark da Global Startup Studio Network coloca o IRR de studio em ~50% contra um padrão de mercado de ~19% para VC tradicional, cerca de 2,5x o IRR do VC tradicional em horizontes realistas. Diga com precisão. Esse é o benchmark do modelo studio do GSSN, nunca o retorno realizado de um único studio, e um studio jovem não tem DPI relevante por trás dele.",
            "O que torna o gap crível é que amostras independentes apontam na mesma direção mesmo quando as casas decimais divergem. Os [dados de venture studio da 9point8 Collective](https://9point8collective.com/research) reportam IRR líquido médio de studio de 60% contra 33% para o quartil superior de VC tradicional, studios colocando 2,3 a 2,6x mais valor por dólar empregado, e empresas criadas em studio chegando à Série A em 25 meses contra 56 para startups fundadas de forma tradicional. Número diferente, mesma direção.",
            "O mecanismo é por que isso é estrutural e não sorte. O studio comprime o time-to-traction e direciona capital para produto em vez de overhead de montar empresa, repetido em cada venture. As bases discutem o valor exato. Nenhuma discute o sinal. Um benchmark direcional que se mantém entre amostras independentes é exatamente o tipo em que vale confiar, e exatamente o tipo que vale declarar com as ressalvas anexadas."
          ]
        },
        {
          "id": "misleading",
          "heading": "Métricas que enganam",
          "level": 2,
          "paragraphs": [
            "Alguns números que um studio mostra não são performance. São atividade vestida de performance. Aprenda a reconhecê-los de primeira."
          ],
          "bullets": [
            "Contagem de logos. O número de empresas lançadas não diz nada sobre quais devolveram caixa. Vaidade em escala de portfólio.",
            "Capital total levantado pelo portfólio. Isso mede o entusiasmo de outros investidores, não o retorno do studio. Um portfólio pode levantar uma fortuna em follow-on e não distribuir nada para os próprios investidores do studio.",
            "Remarcações não realizadas em mercado congelado. Com a maioria das safras de 2019 a 2022 abaixo de 0,5x de DPI, um TVPI apoiado em marcas de 2021 é um corte esperando para acontecer.",
            "IRR desde a constituição sem contexto de horizonte, exatamente a métrica que Phalippou defende banir em favor de IRRs de horizonte."
          ],
          "callout": {
            "kind": "tip",
            "text": "Se um studio lidera com logos lançados e capital total levantado, faça uma pergunta. Qual é o seu DPI, e sobre qual amostra. A resposta, ou a esquiva, diz tudo."
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante presta contas sobre si mesma",
          "level": 2,
          "paragraphs": [
            "A posição honesta para um studio jovem é nomear o que ainda não pode provar. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Lançamos 3-4 ventures por ano por um sistema de seis estágios, Research, Partner, Build, Traction, Revenue, Compound, empregando $500K-1.5M por venture e retendo economia de co-founder. A Avante é jovem, então nosso próprio DPI ainda não é relevante. Dizer isso com clareza é o ponto. O gap de ~50% de IRR contra ~19% de IRR é o benchmark do GSSN para o modelo, não uma afirmação sobre o retorno realizado da Avante.",
            "O que pode ser medido em nós hoje são indicadores antecedentes com dentes. Time-to-traction, em que um venture de studio lança 6-9 meses à frente de um time autônomo com financiamento comparável. Eficiência de capital, em que resolver o encanamento da empresa uma vez direciona cerca de $300K-500K de capital efetivo por venture para produto em vez de overhead. E o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel), em que um copiloto de IA gera dados proprietários que dão direito a captar.",
            "A leitura regional importa aqui. O venture capital da América Latina rodou perto de 4,5 bilhões de dólares em 751 deals em 2024, um mercado de saída mais fino e mais cíclico que o dos EUA, o que torna a honestidade sobre DPI mais importante no Brasil, não menos, onde [serviços representam cerca de 70% do PIB brasileiro com baixa penetração de software](/library/brazil-services-economy-opportunity). A vantagem são operadores com mais de 10 anos de calo de mercado brasileiro pareados com capital de primeiro cheque no dia um. Um studio que ganha o direito de citar ~50% de IRR é o que se dispõe a dizer que seu DPI ainda é zero. Leia a tese em [/why-avante](/why-avante) e o modelo operacional em [/principles](/principles)."
          ]
        }
      ]
    },
    "es": {
      "title": "Cómo Medir de Verdad un Venture Studio",
      "description": "El IRR adorna, el TVPI es papel, el DPI es la única verdad en caja. Una guía de las métricas de venture studio, las trampas de supervivencia y el benchmark de ~50%.",
      "sections": [
        {
          "paragraphs": [
            "Un venture studio que cita un solo número de titular no le dice casi nada hasta que usted sepa cuál número es. Tres métricas cargan el peso en los mercados privados, y cada una responde una pregunta distinta. El IRR responde qué tan rápido. El TVPI responde cuánto en papel. El DPI responde cuánto en caja. Confúndalas y tomará una lámina de marketing por un historial de retorno.",
            "Esta es una guía de las métricas de venture studio para quien tiene que asignar capital de verdad. Vamos a definir IRR vs TVPI vs DPI, mostrar qué esconde cada una, tratar el sesgo de supervivencia de frente y explicar por qué el benchmark del GSSN de ~50% de IRR contra ~19% para VC tradicional todavía se sostiene como hecho direccional. Avante Ventures es un venture studio que construye [empresas AI-native en Brasil y América Latina](/library/ai-native-without-series-a), y un studio joven. Así que este texto también es cómo pensamos en rendir cuentas sobre nosotros mismos."
          ]
        },
        {
          "id": "three-metrics",
          "heading": "IRR, TVPI y DPI no son la misma afirmación",
          "level": 2,
          "paragraphs": [
            "Cada métrica responde una pregunta distinta, y un studio que las mezcla suele esconderse detrás de la más amable. El IRR es el retorno anualizado y ponderado por el tiempo sobre los flujos de caja. Premia las distribuciones tempranas de forma desproporcionada. El TVPI, total value to paid-in, es el valor realizado más el no realizado sobre el capital invertido, el total creado en papel. El DPI, distributions to paid-in, es la caja realmente devuelta a los inversionistas sobre lo que aportaron.",
            "El encuadre más limpio viene de un [análisis de métricas de fondo de Value Add VC](https://valueaddvc.com/blog/how-venture-capital-fund-performance-is-measured-irr-tvpi-dpi-and-rvpi-explained). El IRR es una métrica de marketing. El TVPI es una métrica de progreso. El DPI es la única que zanja el debate. Un DPI de 1,0x significa que los inversionistas recuperaron su dinero en caja. Un DPI de 0,3x significa que el 70% del fondo sigue siendo papel y relato."
          ],
          "bullets": [
            "IRR. Qué tan rápido compuso el capital, en papel, con los supuestos de tiempo incorporados.",
            "TVPI. Cuánto valor total existe, realizado más no realizado, antes de que alguien cobre.",
            "DPI. Cuánta caja llegó de verdad a la cuenta del inversionista. La única que no se puede remarcar al alza."
          ],
          "callout": {
            "kind": "stat",
            "text": "La mayoría de los fondos de las añadas 2019 a 2022 mostraba un DPI por debajo de 0,5x a inicios de 2026, tras cerrarse la ventana de salidas a bolsa. La mitad en papel, casi nada en caja.",
            "attribution": "Value Add VC, 2026"
          }
        },
        {
          "id": "irr",
          "heading": "Por qué el IRR solo es una señal amarilla",
          "level": 3,
          "paragraphs": [
            "El IRR es el número más adornado de los mercados privados, y la literatura académica es contundente al respecto. Ludovic Phalippou, profesor de finanzas de Oxford, lleva años documentando cómo el IRR desde el inicio sobreestima los retornos. En su texto de noviembre de 2024 para el [CFA Institute sobre la tiranía del IRR](https://rpc.cfainstitute.org/blogs/enterprising-investor/2024/the-tyranny-of-irr-a-reality-check-on-private-market-returns), muestra que en 12.306 fondos de capital privado con 10,5 billones de dólares, el IRR mediano fue de 9,1% y el equivalente a mercado público implicaba apenas 1,4% de retorno por encima del S&P 500 al año.",
            "El adorno es mecánico, no misterioso. El IRR supone que la caja intermedia puede reinvertirse a la misma tasa y pondera de más los flujos tempranos. Un gestor fija una salida temprana, mantiene los activos problemáticos a costo y publica un número que ya se desprendió de todo lo que un inversionista algún día retirará. Phalippou fue directo. El IRR se volvió el teatro del desempeño del private equity. Entrega una bella ilusión hasta que alguien mira las cuentas.",
            "Entonces, cuando un studio encabeza con IRR solo, sobre todo en sus primeros años, léalo como una señal amarilla. Le está mostrando la métrica más fácil de adornar y la más lejana de la caja."
          ]
        },
        {
          "id": "tvpi-dpi",
          "heading": "El TVPI es papel, el DPI es caja",
          "level": 3,
          "paragraphs": [
            "El TVPI muestra la trayectoria. El DPI muestra la verdad. El espacio entre ambos es donde vive casi todo el autoengaño. La curva J hace que el TVPI temprano quede por debajo de 1,0x durante años, solo por comisiones y timing, y la métrica mezcla caja real con valuaciones especulativas que dependen por completo del precio de la última ronda.",
            "Las remarcaciones lo prueban. En 2021 los valores en papel corrieron calientes. En 2023 y 2024 muchos fondos recortaron en silencio el valor residual entre 30 y 50 por ciento, según el mismo análisis de Value Add VC. Un TVPI apoyado en marcas viejas de 2021 es un número esperando ser revisado a la baja.",
            "Por eso también el DPI se demora años y por eso un studio joven y honesto todavía no tiene un DPI relevante. La distribución exige salidas, y las salidas exigen un mercado líquido. La métrica que no se puede manipular es también la que más tarda en llegar. La paciencia no es debilidad en el número. Es el número funcionando como debe."
          ]
        },
        {
          "id": "survivorship",
          "heading": "Sesgo de supervivencia y cómo lo corrigen los benchmarks",
          "level": 2,
          "paragraphs": [
            "Todo benchmark de studio que usted lee está construido sobre una muestra de sobrevivientes, y eso eleva el número de titular en silencio. El sesgo de supervivencia, como lo [define VC Beast](https://vcbeast.com/venture-capital-glossary/survivorship-bias), es la tendencia a estudiar solo los fondos y empresas que vivieron, ignorando los fracasos, mucho más numerosos. El problema estructural para cualquier benchmark es claro. Los fondos que fracasan dejan de reportar, así que la base conserva a los ganadores y pierde a los perdedores.",
            "La distorsión es medible en clases de activos vecinas. Un estudio de 2025 de Wedge Capital Management halló que los sobrevivientes superaron a los que salieron en cerca de 0,86% al año, y los índices de hedge fund han estado históricamente inflados en torno al 3 a 4,5 por ciento anual por estos sesgos. Los números armados solo sobre quien quedó siempre leen alto.",
            "Los benchmarks creíbles responden de tres formas, y el lector debe verificar las tres. Fijar la ventana de tiempo para que una añada de auge no domine. Ampliar la muestra para que ningún sobreviviente aislado mueva el promedio. Revelar el tamaño de la muestra para que el lector pueda juzgar. La base de venture studios compilada por 9point8 Collective hace lo último de forma abierta, al afirmar que sus cifras de desempeño descansan en 20 studios con añadas de 2015 a 2022 y que apenas el 13% de los studios mantiene historial a nivel de la firma."
          ],
          "callout": {
            "kind": "stat",
            "text": "Solo ~13% de los venture studios mantiene un historial de retorno a nivel de la firma. Cualquier benchmark sacado del resto está leyendo a los sobrevivientes.",
            "attribution": "9point8 Collective, 2024"
          }
        },
        {
          "id": "why-it-holds",
          "heading": "Por qué la brecha del GSSN se sostiene",
          "level": 2,
          "paragraphs": [
            "La cifra de outperformance del modelo studio sobrevive a una lectura escéptica, siempre que usted la encuadre con honestidad. El benchmark de la Global Startup Studio Network sitúa el IRR de studio en ~50% contra un estándar de mercado de ~19% para VC tradicional, cerca de 2,5x el IRR del VC tradicional en horizontes realistas. Dígalo con precisión. Ese es el benchmark del modelo studio del GSSN, nunca el retorno realizado de un solo studio, y un studio joven no tiene un DPI relevante detrás.",
            "Lo que vuelve creíble la brecha es que muestras independientes apuntan en la misma dirección aun cuando los decimales difieren. Los [datos de venture studio de 9point8 Collective](https://9point8collective.com/research) reportan un IRR neto medio de studio de 60% contra 33% para el cuartil superior de VC tradicional, studios poniendo 2,3 a 2,6x más valor por dólar empleado, y empresas creadas en studio alcanzando la Serie A en 25 meses contra 56 para startups fundadas de forma tradicional. Número distinto, misma dirección.",
            "El mecanismo es por qué esto es estructural y no suerte. El studio comprime el time-to-traction y dirige capital a producto en lugar de overhead de montar empresa, repetido en cada venture. Las bases discuten la cifra exacta. Ninguna discute el signo. Un benchmark direccional que se mantiene entre muestras independientes es justo el tipo en el que vale confiar, y justo el tipo que vale declarar con sus salvedades adjuntas."
          ]
        },
        {
          "id": "misleading",
          "heading": "Métricas que engañan",
          "level": 2,
          "paragraphs": [
            "Algunos números que un studio le muestra no son desempeño. Son actividad vestida de desempeño. Aprenda a reconocerlos a primera vista."
          ],
          "bullets": [
            "Conteo de logos. El número de empresas lanzadas no dice nada sobre cuáles devolvieron caja. Vanidad a escala de portafolio.",
            "Capital total levantado por el portafolio. Eso mide el entusiasmo de otros inversionistas, no el retorno del studio. Un portafolio puede levantar una fortuna en follow-on y no distribuir nada a los propios inversionistas del studio.",
            "Remarcaciones no realizadas en un mercado congelado. Con la mayoría de las añadas 2019 a 2022 por debajo de 0,5x de DPI, un TVPI apoyado en marcas de 2021 es un recorte esperando ocurrir.",
            "IRR desde el inicio sin contexto de horizonte, exactamente la métrica que Phalippou propone prohibir en favor de IRRs de horizonte."
          ],
          "callout": {
            "kind": "tip",
            "text": "Si un studio encabeza con logos lanzados y capital total levantado, haga una pregunta. Cuál es su DPI, y sobre qué muestra. La respuesta, o la evasiva, lo dice todo."
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo rinde cuentas Avante sobre sí misma",
          "level": 2,
          "paragraphs": [
            "La posición honesta para un studio joven es nombrar lo que todavía no puede probar. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Lanzamos 3-4 ventures por año mediante un sistema de seis etapas, Research, Partner, Build, Traction, Revenue, Compound, desplegando $500K-1.5M por venture y reteniendo economía de co-founder. Avante es joven, así que nuestro propio DPI todavía no es relevante. Decirlo con claridad es el punto. La brecha de ~50% de IRR contra ~19% de IRR es el benchmark del GSSN para el modelo, no una afirmación sobre el retorno realizado de Avante.",
            "Lo que se puede medir en nosotros hoy son indicadores adelantados con dientes. Time-to-traction, donde un venture de studio lanza 6-9 meses por delante de un equipo independiente con financiamiento comparable. Eficiencia de capital, donde resolver la plomería de la empresa una vez dirige cerca de $300K-500K de capital efectivo por venture a producto en lugar de overhead. Y el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel), donde un copiloto de IA genera datos propietarios que dan derecho a levantar.",
            "La lectura regional importa aquí. El venture capital de América Latina rondó los 4,5 mil millones de dólares en 751 deals en 2024, un mercado de salidas más delgado y más cíclico que el de Estados Unidos, lo que vuelve la honestidad sobre el DPI más importante en la región, no menos. La ventaja son operadores con más de 10 años de cicatrices de mercado brasileño combinados con capital de primer cheque desde el día uno, en un mercado donde [los servicios representan cerca del 70% del PIB brasileño con baja penetración de software](/library/brazil-services-economy-opportunity). Un studio que se gana el derecho de citar ~50% de IRR es el que se anima a decir que su DPI todavía es cero. Lea la tesis en [/why-avante](/why-avante) y el modelo operativo en [/principles](/principles)."
          ]
        }
      ]
    }
  },
  {
    "slug": "operating-partner-economics",
    "category": "insights",
    "type": "Essay",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "How Operating-Partner Economics Actually Work in a Venture Studio",
      "description": "A venture studio operating partner co-builds 3-4 ventures a year. A VC partner sits on 8-12 boards. The hours-to-ownership ratio is the whole story.",
      "sections": [
        {
          "paragraphs": [
            "A venture studio operating partner and a VC partner share a title and almost nothing else. One co-builds 3 to 4 ventures a year with deep weekly involvement. The other spreads attention across 8 to 12 boards and gives each a few hours a month. That single ratio, attention per company, is why a studio operator takes founder-level equity instead of a slice of fund carry.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We earn our equity in the build, not by writing checks. This is how that math actually works, and where it breaks."
          ]
        },
        {
          "heading": "Two roles that share a name and nothing else",
          "level": 2,
          "paragraphs": [
            "Call both of them partner and you hide the actual job. [A VC partner](/library/studio-vs-accelerator-vs-vc) allocates capital and governs from a board seat. A studio operating partner sits inside the company, in the product decisions, the first ten hires, the first paying customers. Visible.vc tells founders to ask a prospective lead investor how many boards the partner already sits on, because partner attention is a divided, scarce resource. That advice only makes sense for the VC. Nobody asks a studio operator that question, because the operator is in one of three or four companies, every week.",
            "The studio model treats venture studio operating partner economics as a function of presence. You are paid in ownership for the work you do with your hands, not the capital you route. That is the line between the two roles, and everything downstream of it follows from where the person actually spends their week."
          ],
          "id": "two-roles"
        },
        {
          "heading": "The attention math: 3-4 ventures vs 8-12 boards",
          "level": 2,
          "paragraphs": [
            "Start with the denominator. An active VC partner carries roughly 8 to 12 board seats and contributes a few hours per company per month between meetings. Spread across a dozen names, that is real governance and thin operating help. A studio operating partner inverts the ratio on purpose, going deep on 3 to 4 ventures with weekly involvement through the riskiest stretch, the first 18 months.",
            "The payoff of concentrated attention shows up in the data. According to GSSN-sourced research, [studio ventures reach Series A in about 25.2 months](/library/measuring-studio-performance) versus about 56 months for a conventional startup. Roughly 84% of studio-born companies raise a seed round and 72% reach Series A, with about 30% higher success rates than traditionally founded companies. None of that comes from picking better. It comes from being present."
          ],
          "callout": {
            "kind": "stat",
            "text": "Venture studios post studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x over realistic horizons.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "attention-math"
        },
        {
          "heading": "The hours-to-ownership ratio",
          "level": 3,
          "paragraphs": [
            "If you are in a company every week through Build and Traction, you have earned co-founder economics. If you give it three hours a month from a board seat, you have earned carry on a fund. Same word, opposite job. The hours-to-ownership ratio is what separates the two compensation structures, and it is the cleanest way to reason about who deserves what.",
            "The eFounders studio, now Hexa, is the public proof. Across 41 startups launched since 2011, it runs four to five per year, invests up to 800,000 euros per project, and reports a 6% failure rate against a market where startup survival runs 10 to 20%. A 6% failure rate is not stock-picking. It is the output of one operating team solving formation, first hires, first product, and first customers over and over, then handing founders a machine that already runs."
          ],
          "id": "hours-to-ownership"
        },
        {
          "heading": "Why operators take founder equity, not fund carry",
          "level": 3,
          "paragraphs": [
            "Studios take a founder-sized stake because they do founder-sized work. Hexa takes a 30% stake in each startup it builds, with the majority retained by the founders. That is a co-founder position earned by co-building, not a minority financial stake earned by funding. Carry on a fund rewards capital allocation. Equity in the company rewards the people who made the company exist.",
            "The honest tension sits right here. A 30% stake at formation is large, and it is justified only when the studio's build genuinely de-risks the company. Where the build is real, founders trade dilution for a 6 to 9 month head start and a working go-to-market. Where it is not, they overpay. The discipline is to take founder equity only where you put in founder work."
          ],
          "id": "why-equity"
        },
        {
          "heading": "From hands-on build to board oversight",
          "level": 2,
          "paragraphs": [
            "Operator involvement is not constant. It is front-loaded by design and then deliberately withdrawn. Operating partners stay engaged through the first revenue milestone, then transition to board-level oversight, which is what frees the capacity for the next cohort.",
            "Map it to the work. Through Research and Partner, the operator is choosing the problem and the founder. Through Build and Traction, they are in the unit-economics spreadsheet and the first sales calls. Once Revenue is real, the company can run itself and the operator steps back to the board. That hand-off is not a courtesy. It is the mechanism that lets a studio start its next ventures without starving the last ones."
          ],
          "bullets": [
            "Research and Partner. Operator picks the problem and the founding team. Highest leverage, lowest headcount.",
            "Build and Traction. Operator co-builds product, first hires, first customers. Deep weekly involvement.",
            "Revenue and Compound. Operator steps back to board oversight, freeing capacity for the next cohort."
          ],
          "id": "lifecycle"
        },
        {
          "heading": "Operator capacity is the real ceiling",
          "level": 2,
          "paragraphs": [
            "Here is the failure mode nobody puts on the website. A studio cannot run more ventures than its operating partners can actually be present in. Depth is the product. The moment a studio chases volume past its bench, it dilutes the very attention that produced the returns, and the model quietly becomes a worse VC fund with a higher fee.",
            "This is why disciplined studios cap at a few ventures a year rather than dozens. It also explains the two fair critiques of the category. Studios carry a higher fee structure for the breadth of services they provide, and they disclose less, since they are not required to publish portfolio or performance. The [~50% IRR](/library/why-venture-studios-win-latam) is part of that opacity. It is self-reported and survivor-weighted, which is exactly why we frame it as the GSSN studio benchmark and read it as directional rather than guaranteed."
          ],
          "id": "capacity-ceiling"
        },
        {
          "heading": "How Avante structures it",
          "level": 2,
          "paragraphs": [
            "Avante Ventures launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. We deploy $500K-1.5M per venture across pre-seed and retain co-founder economics, which is the founder-equity logic above applied to our own book. The operator is in the build through first revenue, then moves to the board.",
            "Brazil is where the math compounds hardest. Services account for roughly 70% of Brazilian GDP, per IBGE, with low software penetration, so a hands-on studio is filling a real gap rather than chasing a crowded one. Pair domain operators with 10+ years of Brazilian-market scar tissue with a Silicon Valley playbook and first-ticket capital on day one, and solving company plumbing once routes roughly $300K-$500K of effective capital per venture into product and traction instead of overhead. That is the 6-9 month head start, made concrete. You can read the full thesis at [/why-avante](/why-avante) and the operating discipline behind it at [/principles](/principles).",
            "The ceiling is honest and it is ours too. We will only ever run as many ventures as we can be genuinely present in. That constraint is not a weakness in the model. It is the model."
          ],
          "id": "how-avante"
        }
      ]
    },
    "pt": {
      "title": "Como Funciona de Verdade a Economia do Operating Partner em um Venture Studio",
      "description": "Um operating partner de venture studio cocria 3-4 ventures por ano. Um sócio de VC senta em 8-12 conselhos. A razão horas-por-ownership conta a história toda.",
      "sections": [
        {
          "paragraphs": [
            "Um operating partner de venture studio e um sócio de VC compartilham um título e quase nada mais. Um cocria 3 a 4 ventures por ano com envolvimento semanal profundo. O outro divide a atenção entre 8 a 12 conselhos e dedica poucas horas por mês a cada um. Essa razão, atenção por empresa, é o que faz o operador de studio pegar equity de fundador em vez de uma fatia de carry de fundo.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Ganhamos nosso equity no build, não escrevendo cheques. É assim que essa conta funciona de verdade, e onde ela quebra."
          ]
        },
        {
          "heading": "Dois papéis que dividem um nome e mais nada",
          "level": 2,
          "paragraphs": [
            "Chame os dois de sócio e você esconde o trabalho de verdade. [Um sócio de VC](/library/studio-vs-accelerator-vs-vc) aloca capital e governa de uma cadeira no conselho. Um operating partner de studio fica dentro da empresa, nas decisões de produto, nas dez primeiras contratações, nos primeiros clientes pagantes. A Visible.vc orienta fundadores a perguntar a um possível lead investor em quantos conselhos o sócio já senta, porque a atenção do sócio é um recurso escasso e dividido. Esse conselho só faz sentido para o VC. Ninguém faz essa pergunta a um operador de studio, porque o operador está dentro de uma de três ou quatro empresas, toda semana.",
            "O modelo de studio trata a economia do operating partner como função de presença. Você é pago em ownership pelo trabalho que faz com as próprias mãos, não pelo capital que encaminha. Essa é a linha entre os dois papéis, e tudo a jusante dela vem de onde a pessoa de fato passa a semana."
          ],
          "id": "two-roles"
        },
        {
          "heading": "A conta da atenção: 3-4 ventures vs 8-12 conselhos",
          "level": 2,
          "paragraphs": [
            "Comece pelo denominador. Um sócio de VC ativo carrega cerca de 8 a 12 cadeiras de conselho e contribui com algumas horas por empresa por mês entre as reuniões. Espalhado por uma dúzia de nomes, isso é governança real e ajuda operacional rasa. Um operating partner de studio inverte a razão de propósito, indo fundo em 3 a 4 ventures com envolvimento semanal ao longo do trecho mais arriscado, os primeiros 18 meses.",
            "O retorno da atenção concentrada aparece nos dados. Segundo pesquisa com base na GSSN, [ventures de studio chegam ao Series A em cerca de 25,2 meses](/library/measuring-studio-performance) contra cerca de 56 meses de uma startup convencional. Aproximadamente 84% das empresas nascidas em studio levantam uma rodada seed e 72% chegam ao Series A, com taxas de sucesso cerca de 30% maiores do que as fundadas de forma tradicional. Nada disso vem de escolher melhor. Vem de estar presente."
          ],
          "callout": {
            "kind": "stat",
            "text": "Venture studios registram IRR de studio de ~50% contra um padrão de mercado de ~19% para VC tradicional, cerca de 2,5x em horizontes realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "attention-math"
        },
        {
          "heading": "A razão horas-por-ownership",
          "level": 3,
          "paragraphs": [
            "Se você está dentro de uma empresa toda semana ao longo de Build e Traction, você ganhou economia de co-founder. Se você dedica três horas por mês de uma cadeira de conselho, você ganhou carry de um fundo. Mesma palavra, trabalho oposto. A razão horas-por-ownership é o que separa as duas estruturas de remuneração, e é a forma mais limpa de raciocinar sobre quem merece o quê.",
            "O studio eFounders, hoje Hexa, é a prova pública. Ao longo de 41 startups lançadas desde 2011, ele roda quatro a cinco por ano, investe até 800 mil euros por projeto e reporta uma taxa de falha de 6% contra um mercado onde a sobrevivência de startups fica entre 10 e 20%. Uma taxa de falha de 6% não é escolha de ações. É o resultado de um time operacional resolvendo formação, primeiras contratações, primeiro produto e primeiros clientes de novo e de novo, e então entregando aos fundadores uma máquina que já roda."
          ],
          "id": "hours-to-ownership"
        },
        {
          "heading": "Por que operadores pegam equity de fundador, não carry de fundo",
          "level": 3,
          "paragraphs": [
            "Studios pegam uma fatia de tamanho de fundador porque fazem trabalho de tamanho de fundador. A Hexa pega 30% de cada startup que constrói, com a maioria retida pelos fundadores. Isso é uma posição de co-founder ganha por cocriar, não um equity financeiro minoritário ganho por financiar. Carry de fundo recompensa alocação de capital. Equity na empresa recompensa quem fez a empresa existir.",
            "A tensão honesta mora exatamente aqui. Uma fatia de 30% na formação é grande, e só se justifica quando o build do studio de fato tira risco da empresa. Onde o build é real, fundadores trocam diluição por uma largada de 6 a 9 meses e um go-to-market que já funciona. Onde não é, eles pagam caro demais. A disciplina é pegar equity de fundador apenas onde você colocou trabalho de fundador."
          ],
          "id": "why-equity"
        },
        {
          "heading": "Do build mão na massa à supervisão de conselho",
          "level": 2,
          "paragraphs": [
            "O envolvimento do operador não é constante. Ele é concentrado no início de propósito e depois retirado de forma deliberada. Operating partners ficam engajados até o primeiro marco de receita, e então migram para a supervisão no nível do conselho, o que é o que libera capacidade para a próxima safra.",
            "Mapeie isso ao trabalho. Ao longo de Research e Partner, o operador escolhe o problema e o fundador. Ao longo de Build e Traction, ele está na planilha de unit economics e nas primeiras ligações de venda. Quando Revenue é real, a empresa consegue rodar sozinha e o operador recua para o conselho. Esse hand-off não é cortesia. É o mecanismo que permite ao studio começar suas próximas ventures sem matar de fome as anteriores."
          ],
          "bullets": [
            "Research e Partner. O operador escolhe o problema e o time fundador. Maior alavancagem, menor headcount.",
            "Build e Traction. O operador cocria produto, primeiras contratações, primeiros clientes. Envolvimento semanal profundo.",
            "Revenue e Compound. O operador recua para a supervisão de conselho, liberando capacidade para a próxima safra."
          ],
          "id": "lifecycle"
        },
        {
          "heading": "A capacidade do operador é o teto real",
          "level": 2,
          "paragraphs": [
            "Aqui está o modo de falha que ninguém coloca no site. Um studio não consegue rodar mais ventures do que seus operating partners conseguem de fato estar presentes. Profundidade é o produto. No momento em que um studio persegue volume além do seu banco de operadores, ele dilui a própria atenção que produziu os retornos, e o modelo silenciosamente vira um fundo de VC pior com taxa mais alta.",
            "É por isso que studios disciplinados se limitam a poucas ventures por ano em vez de dezenas. Isso também explica as duas críticas justas à categoria. Studios carregam uma estrutura de taxas mais alta pela amplitude de serviços que prestam, e divulgam menos, já que não são obrigados a publicar portfólio ou desempenho. O [IRR de ~50%](/library/why-venture-studios-win-latam) faz parte dessa opacidade. É autorreportado e enviesado por sobreviventes, que é exatamente por que o enquadramos como benchmark de studio da GSSN e o lemos como direcional, não garantido."
          ],
          "id": "capacity-ceiling"
        },
        {
          "heading": "Como a Avante estrutura isso",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures lança 3-4 ventures por ano por meio de um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. Aportamos $500K-1.5M por venture ao longo do pre-seed e retemos economia de co-founder, que é a lógica de equity de fundador acima aplicada ao nosso próprio livro. O operador está no build até a primeira receita, e então migra para o conselho.",
            "O Brasil é onde a conta compõe mais forte. Os serviços representam cerca de 70% do PIB brasileiro, segundo o IBGE, com baixa penetração de software, então um studio mão na massa preenche uma lacuna real em vez de disputar uma cheia. Una operadores de domínio com mais de 10 anos de calos do mercado brasileiro a um playbook do Vale do Silício e capital de primeiro ticket no dia um, e resolver o encanamento da empresa uma vez encaminha cerca de $300K-$500K de capital efetivo por venture para produto e tração em vez de overhead. É a largada de 6-9 meses, tornada concreta. Você pode ler a tese completa em [/why-avante](/why-avante) e a disciplina operacional por trás dela em [/principles](/principles).",
            "O teto é honesto e também é nosso. Só vamos rodar tantas ventures quantas conseguirmos estar genuinamente presentes. Essa restrição não é uma fraqueza do modelo. É o modelo."
          ],
          "id": "how-avante"
        }
      ]
    },
    "es": {
      "title": "Cómo Funciona de Verdad la Economía del Operating Partner en un Venture Studio",
      "description": "Un operating partner de venture studio coconstruye 3-4 ventures al año. Un socio de VC se sienta en 8-12 directorios. La razón horas-por-equity lo explica todo.",
      "sections": [
        {
          "paragraphs": [
            "Un operating partner de venture studio y un socio de VC comparten un título y casi nada más. Uno coconstruye 3 a 4 ventures al año con involucramiento semanal profundo. El otro reparte su atención entre 8 a 12 directorios y dedica pocas horas al mes a cada uno. Esa razón, atención por empresa, es lo que hace que el operador de studio tome equity de fundador en lugar de una tajada de carry de fondo.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Ganamos nuestro equity en el build, no firmando cheques. Así funciona esa cuenta de verdad, y dónde se rompe."
          ]
        },
        {
          "heading": "Dos roles que comparten un nombre y nada más",
          "level": 2,
          "paragraphs": [
            "Llame socio a los dos y oculta el trabajo real. [Un socio de VC](/library/studio-vs-accelerator-vs-vc) asigna capital y gobierna desde una silla del directorio. Un operating partner de studio se sienta dentro de la empresa, en las decisiones de producto, en las primeras diez contrataciones, en los primeros clientes que pagan. Visible.vc le aconseja al fundador preguntarle a un posible lead investor en cuántos directorios ya se sienta el socio, porque la atención del socio es un recurso escaso y dividido. Ese consejo solo tiene sentido para el VC. Nadie le hace esa pregunta a un operador de studio, porque el operador está dentro de una de tres o cuatro empresas, cada semana.",
            "El modelo de studio trata la economía del operating partner como función de presencia. A usted le pagan en ownership por el trabajo que hace con sus propias manos, no por el capital que canaliza. Esa es la línea entre los dos roles, y todo lo que viene después sale de dónde la persona pasa de verdad la semana."
          ],
          "id": "two-roles"
        },
        {
          "heading": "La cuenta de la atención: 3-4 ventures vs 8-12 directorios",
          "level": 2,
          "paragraphs": [
            "Empiece por el denominador. Un socio de VC activo carga cerca de 8 a 12 sillas de directorio y aporta unas pocas horas por empresa al mes entre reuniones. Repartido en una docena de nombres, eso es gobernanza real y ayuda operativa delgada. Un operating partner de studio invierte la razón a propósito, yendo a fondo en 3 a 4 ventures con involucramiento semanal a lo largo del tramo más riesgoso, los primeros 18 meses.",
            "El retorno de la atención concentrada aparece en los datos. Según investigación basada en la GSSN, [las ventures de studio llegan al Series A en cerca de 25,2 meses](/library/measuring-studio-performance) frente a cerca de 56 meses de una startup convencional. Aproximadamente 84% de las empresas nacidas en studio levantan una ronda seed y 72% llegan al Series A, con tasas de éxito cerca de 30% más altas que las fundadas de forma tradicional. Nada de eso viene de elegir mejor. Viene de estar presente."
          ],
          "callout": {
            "kind": "stat",
            "text": "Los venture studios registran un IRR de studio de ~50% frente a un estándar de mercado de ~19% para el VC tradicional, cerca de 2,5x en horizontes realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "attention-math"
        },
        {
          "heading": "La razón horas-por-equity",
          "level": 3,
          "paragraphs": [
            "Si usted está dentro de una empresa cada semana a lo largo de Build y Traction, se ganó la economía de co-founder. Si le dedica tres horas al mes desde una silla de directorio, se ganó carry de un fondo. Misma palabra, trabajo opuesto. La razón horas-por-equity es lo que separa las dos estructuras de compensación, y es la forma más limpia de razonar sobre quién merece qué.",
            "El studio eFounders, hoy Hexa, es la prueba pública. A lo largo de 41 startups lanzadas desde 2011, corre cuatro a cinco al año, invierte hasta 800 mil euros por proyecto y reporta una tasa de fracaso de 6% frente a un mercado donde la supervivencia de startups va de 10 a 20%. Una tasa de fracaso de 6% no es elección de acciones. Es el resultado de un equipo operativo resolviendo la constitución, las primeras contrataciones, el primer producto y los primeros clientes una y otra vez, y luego entregándole a los fundadores una máquina que ya anda."
          ],
          "id": "hours-to-ownership"
        },
        {
          "heading": "Por qué los operadores toman equity de fundador, no carry de fondo",
          "level": 3,
          "paragraphs": [
            "Los studios toman una tajada de tamaño de fundador porque hacen trabajo de tamaño de fundador. Hexa toma 30% de cada startup que construye, con la mayoría retenida por los fundadores. Esa es una posición de co-founder ganada por coconstruir, no un equity financiero minoritario ganado por financiar. El carry de fondo premia la asignación de capital. El equity en la empresa premia a quienes hicieron que la empresa existiera.",
            "La tensión honesta vive justo aquí. Una tajada de 30% en la constitución es grande, y solo se justifica cuando el build del studio de verdad le quita riesgo a la empresa. Donde el build es real, los fundadores cambian dilución por una ventaja de salida de 6 a 9 meses y un go-to-market que ya funciona. Donde no lo es, pagan de más. La disciplina es tomar equity de fundador solo donde usted puso trabajo de fundador."
          ],
          "id": "why-equity"
        },
        {
          "heading": "Del build con las manos en el código a la supervisión de directorio",
          "level": 2,
          "paragraphs": [
            "El involucramiento del operador no es constante. Está cargado al inicio a propósito y luego se retira de forma deliberada. Los operating partners siguen comprometidos hasta el primer hito de ingresos, y luego transitan hacia la supervisión a nivel de directorio, que es lo que libera capacidad para la siguiente camada.",
            "Mapéelo al trabajo. A lo largo de Research y Partner, el operador elige el problema y al fundador. A lo largo de Build y Traction, está en la hoja de unit economics y en las primeras llamadas de venta. Cuando Revenue es real, la empresa puede andar sola y el operador se repliega al directorio. Ese traspaso no es cortesía. Es el mecanismo que le permite al studio empezar sus próximas ventures sin matar de hambre a las anteriores."
          ],
          "bullets": [
            "Research y Partner. El operador elige el problema y al equipo fundador. Mayor apalancamiento, menor headcount.",
            "Build y Traction. El operador coconstruye producto, primeras contrataciones, primeros clientes. Involucramiento semanal profundo.",
            "Revenue y Compound. El operador se repliega a la supervisión de directorio, liberando capacidad para la siguiente camada."
          ],
          "id": "lifecycle"
        },
        {
          "heading": "La capacidad del operador es el techo real",
          "level": 2,
          "paragraphs": [
            "Aquí está el modo de falla que nadie pone en el sitio. Un studio no puede correr más ventures de las que sus operating partners pueden de verdad estar presentes. La profundidad es el producto. En el momento en que un studio persigue volumen más allá de su banca de operadores, diluye la misma atención que produjo los retornos, y el modelo silenciosamente se vuelve un fondo de VC peor con una comisión más alta.",
            "Por eso los studios disciplinados se limitan a unas pocas ventures al año en lugar de docenas. También explica las dos críticas justas a la categoría. Los studios cargan una estructura de comisiones más alta por la amplitud de servicios que prestan, y divulgan menos, ya que no están obligados a publicar portafolio ni desempeño. El [IRR de ~50%](/library/why-venture-studios-win-latam) es parte de esa opacidad. Es autorreportado y sesgado por sobrevivientes, que es exactamente por qué lo enmarcamos como el benchmark de studio de la GSSN y lo leemos como direccional, no garantizado."
          ],
          "id": "capacity-ceiling"
        },
        {
          "heading": "Cómo lo estructura Avante",
          "level": 2,
          "paragraphs": [
            "Avante Ventures lanza 3-4 ventures al año mediante un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Desplegamos $500K-1.5M por venture a lo largo del pre-seed y retenemos economía de co-founder, que es la lógica de equity de fundador de arriba aplicada a nuestro propio libro. El operador está en el build hasta el primer ingreso, y luego se mueve al directorio.",
            "Brasil es donde la cuenta compone con más fuerza. Los servicios representan cerca de 70% del PIB brasileño, según el IBGE, con baja penetración de software, así que un studio con las manos en el código llena una brecha real en vez de pelear una saturada. Una a operadores de dominio con más de 10 años de cicatrices del mercado brasileño con un playbook de Silicon Valley y capital de primer ticket el día uno, y resolver la plomería de la empresa una vez canaliza cerca de $300K-$500K de capital efectivo por venture hacia producto y tracción en vez de overhead. Es la ventaja de salida de 6-9 meses, hecha concreta. Puede leer la tesis completa en [/why-avante](/why-avante) y la disciplina operativa detrás en [/principles](/principles).",
            "El techo es honesto y también es nuestro. Solo correremos tantas ventures como podamos estar genuinamente presentes. Esa restricción no es una debilidad del modelo. Es el modelo."
          ],
          "id": "how-avante"
        }
      ]
    }
  },
  {
    "slug": "studio-vs-accelerator-vs-vc",
    "category": "insights",
    "type": "Comparison",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "Venture Studio vs VC vs Accelerator: An Honest Guide (2026)",
      "description": "Venture studio vs VC vs accelerator: how each prices dilution, control, and speed, and which path a founder should pick. The honest terms for all three.",
      "faqs": [
        {
          "q": "What is the difference between a venture studio, an accelerator, and a VC?",
          "a": "A venture studio co-builds the company with you and takes the largest early stake (often around 34%) because it supplies the idea, the build team, first capital, and operators. An accelerator takes a small stake (around 7%) for a fixed program and a network. A VC writes a priced check (typically 15% to 25% plus a board seat) but leaves you to build. The real trade is how much gets built for you versus how much equity you keep."
        },
        {
          "q": "Venture studio vs VC: which is better for an early-stage founder?",
          "a": "It depends on what you lack. Pick a VC if you already have a team and a product and mainly need capital and governance. Pick a venture studio if you are pre-team or pre-product and want operators building alongside you from day one, and you accept giving up more equity for that depth."
        },
        {
          "q": "Do venture studios deliver better returns than VCs?",
          "a": "Industry data from the Global Startup Studio Network puts the studio model at roughly 2.5x the IRR of traditional venture capital, driven by faster time to Series A and higher graduation rates. Avante reads that as a directional model benchmark attributed to GSSN, not a guaranteed return for any single venture."
        },
        {
          "q": "How much equity does a venture studio take?",
          "a": "Usually the largest early stake of the three paths, commonly around 34%, because the studio hands over the most: the idea, the building team, first capital, and operators co-building day to day. An accelerator takes far less (around 7%) because it sells a program, not a company."
        },
        {
          "q": "When should a founder pick an accelerator instead?",
          "a": "An accelerator fits a founder who already has a team and an early product and wants structured mentorship, a cohort network, and a demo day, while keeping most equity and control. It sells access and a program, not company-building."
        }
      ],
      "sections": [
        {
          "paragraphs": [
            "The choice between a venture studio, an accelerator, and traditional VC is not about which one is best. It is about which one prices the three things you are actually trading. Dilution, control, and speed to first traction. An accelerator like Y Combinator takes 7% for a small check and a fixed program. A priced VC round costs 15% to 25% and a board seat but leaves you owning the idea. A venture studio takes the largest early stake, often around 34%, because it hands you the most. The idea, the build team, first capital, and operators co-building day to day.",
            "This guide gives the real terms for each path and names who should pick what. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, so we have a view. We have also tried to be fair to the paths we did not choose."
          ],
          "table": {
            "caption": "How venture studio, accelerator, and VC price dilution, control, and speed.",
            "headers": ["", "Venture studio", "Accelerator", "VC"],
            "rows": [
              ["Equity taken", "Largest, often ~34%", "Small, ~7%", "Priced round, ~15 to 25%"],
              ["What you get", "Idea, build team, first capital, operators co-building", "Program, network, demo day", "Capital plus a board seat"],
              ["Best for", "Pre-team or pre-product founders who want operators on day one", "Founders with a team and an early product wanting structure", "Teams with a product who mainly need capital and governance"],
              ["Speed to traction", "Fastest: operators build from day one", "Fixed cohort timeline", "You build; the pace is on you"],
              ["Control kept", "Lowest, the studio co-owns more", "High", "High, minus a board seat"]
            ]
          }
        },
        {
          "heading": "The three things you are actually trading",
          "level": 2,
          "paragraphs": [
            "Strip away the labels and every path sets the same three dials. How much of the company you give up. How much control you keep. How fast you reach traction. The reason the equity numbers look so different is that the paths supply different amounts of the actual work.",
            "An accelerator and a studio can both ask for equity, but they are not selling the same thing. The accelerator sells a program and a network. The studio sells a company built around you. Read the trade as how much do I need built for me, not as cheap versus expensive."
          ],
          "bullets": [
            "Dilution. The percentage of the company you hand over at the start, before any of the upside is proven.",
            "Control. Whether you keep the board, the roadmap, and the right to say no.",
            "Speed. How many months until you have a product in market and a first cohort of customers."
          ],
          "id": "three-axes"
        },
        {
          "heading": "Venture studio: most support, most dilution",
          "level": 3,
          "paragraphs": [
            "A studio takes the biggest early stake because it does the most before you have anything to show. The average studio takes a 34% equity stake in the companies it co-founds, with the highest stakes near 80%, per the Global Startup Studio Network. In return you get an idea that has already been pressure-tested, a build team on day one, first-ticket capital, and operating partners who are in the unit-economics model in the first weeks rather than reviewing a deck once a quarter.",
            "This fits one founder profile in particular. A domain expert with no team and no built product. They are trading the largest slice of equity for the one thing they cannot assemble alone. A working company. The cost is real and so is the conflict question, since the same entity supplies the idea, the capital, and the operators."
          ],
          "id": "studio"
        },
        {
          "heading": "Accelerator: a program and a small check",
          "level": 3,
          "paragraphs": [
            "An accelerator buys a small, fixed slice for a small check and a fixed-length program. Y Combinator invests $500,000 in total. The first $125,000 buys 7% on a post-money SAFE, and the remaining $375,000 rides on an uncapped SAFE that converts at your next priced round. Techstars runs a similar shape, with 2025 terms of $220,000. A $20,000 agreement for 5% of common stock plus a $200,000 uncapped SAFE.",
            "The math is good when you need the network and the stamp more than the cash. It is expensive when you already have a team and traction, because you are paying 6% to 7% for a program you may have outgrown."
          ],
          "id": "accelerator"
        },
        {
          "heading": "VC: capital and a board seat, you keep the idea",
          "level": 3,
          "paragraphs": [
            "VC trades a larger slice than an accelerator for real capital and governance, while leaving you owning the original idea and team. A priced seed or Series A round typically costs 15% to 25% per round plus a board seat. You keep the company you came in with. You also accept a board member whose job is to push growth on a clock that may not match your business.",
            "This is the right path for a team that already has a working product and wants fuel, not a co-builder. It is also the path for a founder who wants to keep maximum ownership and is willing to move slower to do it."
          ],
          "id": "vc"
        },
        {
          "heading": "Which founder should pick which",
          "level": 2,
          "paragraphs": [
            "The decision is less about preference and more about what you are missing. Match the path to the gap, not to the lowest dilution number."
          ],
          "bullets": [
            "Solo domain expert, no team, no product. A venture studio. You are trading the most equity for the most build.",
            "Technical team with a working prototype. An accelerator or VC. You are paying for capital and network, not for the build.",
            "Founder who wants maximum ownership and control. Bootstrap or raise VC, and accept slower time to traction as the cost of keeping the cap table clean."
          ],
          "callout": {
            "kind": "tip",
            "text": "If you can already build and ship without help, a studio stake is overpriced for you. If you cannot, an accelerator check will not close the gap. Buy what you are actually short on."
          },
          "id": "who-picks-what"
        },
        {
          "heading": "Why a bigger studio stake can still win",
          "level": 2,
          "paragraphs": [
            "A 34% studio stake only makes sense if the studio model returns more, and the data says it does. Per the Global Startup Studio Network, startups created by studios show a [50% average internal rate of return against 19% for non-studio startups](/library/why-venture-studios-win-latam). Avante cites this as studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x, and always as the GSSN benchmark rather than any single firm's realized return.",
            "The speed numbers explain the returns. Studio startups reach a seed round in an average of 10.6 months, less than a third of the time non-studio startups take, and 72% of those that raise a seed go on to a Series A. The honest caveat is survivorship. The GSSN figures are self-reported and skew toward studios that survived to publish, so read the absolute IRR as directional. What is not in doubt is the mechanism. Plumbing solved once, operators in the model early, and a repeatable system that compounds across ventures."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR over realistic time horizons.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "dilution-vs-ev"
        },
        {
          "heading": "Where Avante fits",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and Brazil is the reason the model fits. Services account for roughly 70% of Brazilian GDP, with low software penetration, which is a large surface of under-digitized businesses understood by domain operators rather than generalist VCs. AI infrastructure is now cheap enough to deploy without a Series A, so the build can start lean.",
            "In practice that means Avante launches 3-4 ventures per year through a six-stage system, deploying $500K-1.5M per venture with [operating partners staying engaged through the first revenue milestone](/library/operating-partner-economics). The recurring pattern is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. You can read the full thesis on [/why-avante](/why-avante) and how the studio operates on [/principles](/principles).",
            "So choose by what you lack, not by what looks cheapest on day one. The founder who picks a studio is not buying a check. They are buying a company built around ten years of scar tissue, started the month they sign instead of the year they would have finished hiring."
          ],
          "id": "how-avante"
        }
      ]
    },
    "pt": {
      "title": "Venture Studio vs VC vs Aceleradora: Um Guia Honesto (2026)",
      "description": "Venture studio vs VC vs aceleradora: como cada um precifica diluição, controle e velocidade, e qual caminho um fundador deve escolher. Os termos reais dos três.",
      "faqs": [
        {
          "q": "Qual a diferença entre venture studio, aceleradora e VC?",
          "a": "Um venture studio co-constrói a empresa com você e fica com a maior fatia inicial (em geral perto de 34%) porque entrega a ideia, o time de construção, o primeiro capital e operadores. Uma aceleradora pega uma fatia pequena (cerca de 7%) por um programa fixo e uma rede. Um VC faz um cheque precificado (tipicamente 15% a 25% mais uma cadeira no conselho), mas deixa você construir. A troca real é quanto é construído para você versus quanto equity você mantém."
        },
        {
          "q": "Venture studio vs VC: qual é melhor para um fundador early-stage?",
          "a": "Depende do que falta a você. Escolha um VC se já tem time e produto e precisa sobretudo de capital e governança. Escolha um venture studio se está pré-time ou pré-produto e quer operadores construindo ao seu lado desde o dia um, aceitando ceder mais equity por essa profundidade."
        },
        {
          "q": "Venture studios dão retorno melhor que VCs?",
          "a": "Dados da Global Startup Studio Network colocam o modelo de studio em cerca de 2,5x o IRR do venture capital tradicional, puxado por menor tempo até a Série A e maior taxa de graduação. A Avante lê isso como um benchmark direcional do modelo, atribuído à GSSN, não como retorno garantido de qualquer venture isolada."
        },
        {
          "q": "Quanto de equity um venture studio pega?",
          "a": "Em geral a maior fatia inicial das três vias, comumente perto de 34%, porque o studio entrega o máximo: a ideia, o time de construção, o primeiro capital e operadores co-construindo no dia a dia. Uma aceleradora pega bem menos (cerca de 7%) porque vende um programa, não uma empresa."
        },
        {
          "q": "Quando um fundador deve escolher uma aceleradora?",
          "a": "Uma aceleradora serve a um fundador que já tem time e um produto inicial e quer mentoria estruturada, uma rede de cohort e um demo day, mantendo a maior parte do equity e do controle. Ela vende acesso e um programa, não a construção da empresa."
        }
      ],
      "sections": [
        {
          "paragraphs": [
            "A escolha entre um venture studio, uma aceleradora e VC tradicional não é sobre qual deles é melhor. É sobre qual deles cobra o preço certo pelas três coisas que você está de fato trocando. Diluição, controle e velocidade até a primeira tração. Uma aceleradora como a Y Combinator fica com 7% por um cheque pequeno e um programa de prazo fixo. Uma rodada de VC precificada custa de 15% a 25% e uma cadeira no conselho, mas deixa a ideia com você. Um venture studio fica com a maior fatia inicial, com frequência em torno de 34%, porque entrega o máximo. A ideia, o time que constrói, o primeiro capital e operadores construindo lado a lado todos os dias.",
            "Este guia traz os termos reais de cada caminho e diz quem deve escolher o quê. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, então temos uma posição. Também tentamos ser justos com os caminhos que não escolhemos."
          ],
          "table": {
            "caption": "Como venture studio, aceleradora e VC cobram diluição, controle e velocidade.",
            "headers": ["", "Venture studio", "Aceleradora", "VC"],
            "rows": [
              ["Equity que pega", "A maior, em geral ~34%", "Pequena, ~7%", "Rodada precificada, ~15 a 25%"],
              ["O que você recebe", "Ideia, time de construção, primeiro capital, operadores co-construindo", "Programa, rede, demo day", "Capital mais uma cadeira no conselho"],
              ["Melhor para", "Fundadores pré-time ou pré-produto que querem operadores no dia um", "Fundadores com time e produto inicial que querem estrutura", "Times com produto que precisam sobretudo de capital e governança"],
              ["Velocidade até tração", "A mais rápida: operadores constroem desde o dia um", "Cronograma fixo de cohort", "Você constrói; o ritmo é seu"],
              ["Controle mantido", "O menor, o studio co-detém mais", "Alto", "Alto, menos uma cadeira no conselho"]
            ]
          }
        },
        {
          "heading": "As três coisas que você está de fato trocando",
          "level": 2,
          "paragraphs": [
            "Tire os rótulos e todo caminho ajusta os mesmos três botões. Quanto da empresa você entrega. Quanto de controle você mantém. Em quanto tempo você chega à tração. A razão de os números de equity serem tão diferentes é que cada caminho entrega uma quantidade diferente do trabalho real.",
            "Aceleradora e studio podem pedir equity, mas não vendem a mesma coisa. A aceleradora vende um programa e uma rede. O studio vende uma empresa construída em torno de você. Leia a troca como quanto eu preciso que construam para mim, não como barato contra caro."
          ],
          "bullets": [
            "Diluição. O percentual da empresa que você entrega no começo, antes de qualquer upside estar provado.",
            "Controle. Se você mantém o conselho, o roadmap e o direito de dizer não.",
            "Velocidade. Quantos meses até ter um produto no mercado e uma primeira leva de clientes."
          ],
          "id": "three-axes"
        },
        {
          "heading": "Venture studio: mais apoio, mais diluição",
          "level": 3,
          "paragraphs": [
            "O studio fica com a maior fatia inicial porque faz mais antes de você ter algo a mostrar. O studio médio fica com 34% de equity nas empresas que co-funda, com as maiores participações perto de 80%, segundo a Global Startup Studio Network. Em troca, você recebe uma ideia já testada sob pressão, um time de construção no dia um, capital de primeiro cheque e operating partners que estão na planilha de unit economics nas primeiras semanas, não revisando um deck uma vez por trimestre.",
            "Isso encaixa em um perfil de fundador em especial. Um especialista de domínio sem time e sem produto construído. Ele troca a maior fatia de equity pela única coisa que não consegue montar sozinho. Uma empresa que funciona. O custo é real e a questão do conflito também, já que a mesma entidade entrega a ideia, o capital e os operadores."
          ],
          "id": "studio"
        },
        {
          "heading": "Aceleradora: um programa e um cheque pequeno",
          "level": 3,
          "paragraphs": [
            "Uma aceleradora compra uma fatia pequena e fixa por um cheque pequeno e um programa de prazo fixo. A Y Combinator investe US$ 500 mil no total. Os primeiros US$ 125 mil compram 7% num SAFE post-money, e os US$ 375 mil restantes vêm num SAFE sem cap que converte na sua próxima rodada precificada. A Techstars segue um formato parecido, com termos de 2025 de US$ 220 mil. Um acordo de US$ 20 mil por 5% em ações ordinárias mais um SAFE sem cap de US$ 200 mil.",
            "A conta fecha quando você precisa da rede e do selo mais do que do dinheiro. Fica cara quando você já tem time e tração, porque está pagando de 6% a 7% por um programa que talvez já tenha superado."
          ],
          "id": "accelerator"
        },
        {
          "heading": "VC: capital e cadeira no conselho, a ideia fica com você",
          "level": 3,
          "paragraphs": [
            "O VC troca uma fatia maior que a da aceleradora por capital de verdade e governança, deixando com você a ideia e o time originais. Uma rodada seed ou Série A precificada custa em geral de 15% a 25% por rodada mais uma cadeira no conselho. Você mantém a empresa com que entrou. Você também aceita um conselheiro cujo trabalho é empurrar crescimento num relógio que talvez não combine com o seu negócio.",
            "É o caminho certo para um time que já tem produto funcionando e quer combustível, não um co-construtor. É também o caminho para o fundador que quer manter o máximo de propriedade e topa andar mais devagar para isso."
          ],
          "id": "vc"
        },
        {
          "heading": "Qual fundador deve escolher o quê",
          "level": 2,
          "paragraphs": [
            "A decisão é menos sobre preferência e mais sobre o que está faltando. Case o caminho com a lacuna, não com o menor número de diluição."
          ],
          "bullets": [
            "Especialista de domínio solo, sem time, sem produto. Um venture studio. Você troca o máximo de equity pelo máximo de construção.",
            "Time técnico com protótipo funcionando. Uma aceleradora ou VC. Você paga por capital e rede, não pela construção.",
            "Fundador que quer máximo de propriedade e controle. Faça bootstrap ou levante VC, e aceite uma tração mais lenta como o preço de manter o cap table limpo."
          ],
          "callout": {
            "kind": "tip",
            "text": "Se você já constrói e entrega sem ajuda, a fatia de um studio está cara demais para você. Se você não consegue, o cheque de uma aceleradora não vai fechar a lacuna. Compre aquilo de que você realmente sente falta."
          },
          "id": "who-picks-what"
        },
        {
          "heading": "Por que uma fatia maior de studio ainda pode vencer",
          "level": 2,
          "paragraphs": [
            "Uma fatia de 34% de studio só faz sentido se o modelo de studio retorna mais, e os dados dizem que sim. Segundo a Global Startup Studio Network, startups criadas por studios mostram uma [taxa interna de retorno média de 50% contra 19% das startups fora de studio](/library/why-venture-studios-win-latam). A Avante cita isso como studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x, e sempre como o benchmark da GSSN, nunca como o retorno realizado de uma única firma.",
            "Os números de velocidade explicam o retorno. Startups de studio chegam à rodada seed em média em 10,6 meses, menos de um terço do tempo das startups fora de studio, e 72% das que levantam seed seguem para uma Série A. A ressalva honesta é sobrevivência. Os números da GSSN são autorreportados e pendem para studios que sobreviveram para publicar, então leia o IRR absoluto como direcional. O que não está em dúvida é o mecanismo. Encanamento resolvido uma vez, operadores no modelo cedo, e um sistema repetível que compõe entre as empresas."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x o IRR em horizontes de tempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "dilution-vs-ev"
        },
        {
          "heading": "Onde a Avante se encaixa",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e o Brasil é a razão de o modelo encaixar. Serviços representam cerca de 70% do PIB brasileiro, com baixa penetração de software, o que é uma superfície enorme de negócios pouco digitalizados entendidos por operadores de domínio, não por VCs generalistas. A infraestrutura de IA já está barata o bastante para lançar uma empresa sem uma Série A, então a construção pode começar enxuta.",
            "Na prática, isso significa que a Avante lança 3-4 ventures por ano através de um sistema de seis estágios, aportando US$ 500K-1.5M por venture com [operating partners engajados até o primeiro marco de receita](/library/operating-partner-economics). O padrão recorrente é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copilot de IA para gerar dado proprietário e usar esse dado para levantar e aplicar capital. Você pode ler a tese completa em [/why-avante](/why-avante) e como o studio opera em [/principles](/principles).",
            "Então escolha pelo que falta a você, não pelo que parece mais barato no dia um. O fundador que escolhe um studio não está comprando um cheque. Está comprando uma empresa construída sobre dez anos de cicatriz de operação, iniciada no mês em que assina, em vez do ano em que teria terminado de contratar."
          ],
          "id": "how-avante"
        }
      ]
    },
    "es": {
      "title": "Venture Studio vs VC vs Aceleradora: Una Guía Honesta (2026)",
      "description": "Venture studio vs VC vs aceleradora: cómo cada uno cobra dilución, control y velocidad, y qué camino debe elegir un fundador. Los términos reales de los tres.",
      "faqs": [
        {
          "q": "¿Cuál es la diferencia entre un venture studio, una aceleradora y un VC?",
          "a": "Un venture studio co-construye la empresa contigo y se queda con la mayor participación inicial (a menudo cerca del 34%) porque aporta la idea, el equipo de construcción, el primer capital y operadores. Una aceleradora toma una participación pequeña (alrededor del 7%) por un programa fijo y una red. Un VC hace un cheque con precio (típicamente 15% a 25% más un asiento en el directorio), pero te deja construir. El trade real es cuánto se construye para ti versus cuánto equity conservas."
        },
        {
          "q": "Venture studio vs VC: ¿cuál es mejor para un fundador early-stage?",
          "a": "Depende de lo que te falte. Elige un VC si ya tienes equipo y producto y sobre todo necesitas capital y gobierno. Elige un venture studio si estás pre-equipo o pre-producto y quieres operadores construyendo a tu lado desde el día uno, aceptando ceder más equity por esa profundidad."
        },
        {
          "q": "¿Los venture studios dan mejor retorno que los VC?",
          "a": "Datos de la Global Startup Studio Network ubican al modelo de studio en cerca de 2,5x el IRR del venture capital tradicional, impulsado por menor tiempo a la Serie A y mayor tasa de graduación. Avante lo lee como un benchmark direccional del modelo, atribuido a GSSN, no como retorno garantizado de ninguna venture aislada."
        },
        {
          "q": "¿Cuánto equity toma un venture studio?",
          "a": "Por lo general la mayor participación inicial de las tres vías, comúnmente cerca del 34%, porque el studio entrega lo máximo: la idea, el equipo de construcción, el primer capital y operadores co-construyendo día a día. Una aceleradora toma mucho menos (alrededor del 7%) porque vende un programa, no una empresa."
        },
        {
          "q": "¿Cuándo debe un fundador elegir una aceleradora?",
          "a": "Una aceleradora le sirve a un fundador que ya tiene equipo y un producto inicial y quiere mentoría estructurada, una red de cohort y un demo day, conservando la mayor parte del equity y el control. Vende acceso y un programa, no la construcción de la empresa."
        }
      ],
      "sections": [
        {
          "paragraphs": [
            "La elección entre un venture studio, una aceleradora y VC tradicional no es sobre cuál es mejor. Es sobre cuál pone el precio correcto a las tres cosas que de verdad está intercambiando. Dilución, control y velocidad hasta la primera tracción. Una aceleradora como Y Combinator se queda con 7% por un cheque pequeño y un programa de duración fija. Una ronda de VC con valuación cuesta entre 15% y 25% y un asiento en el directorio, pero deja la idea en sus manos. Un venture studio toma la mayor porción inicial, a menudo cerca de 34%, porque entrega lo máximo. La idea, el equipo que construye, el primer capital y operadores co-construyendo día a día.",
            "Esta guía da los términos reales de cada camino y dice quién debe elegir cuál. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, así que tenemos una postura. También intentamos ser justos con los caminos que no elegimos."
          ],
          "table": {
            "caption": "Cómo venture studio, aceleradora y VC cobran dilución, control y velocidad.",
            "headers": ["", "Venture studio", "Aceleradora", "VC"],
            "rows": [
              ["Equity que toma", "La mayor, a menudo ~34%", "Pequeña, ~7%", "Ronda con precio, ~15 a 25%"],
              ["Qué recibes", "Idea, equipo de construcción, primer capital, operadores co-construyendo", "Programa, red, demo day", "Capital más un asiento en el directorio"],
              ["Mejor para", "Fundadores pre-equipo o pre-producto que quieren operadores el día uno", "Fundadores con equipo y producto inicial que quieren estructura", "Equipos con producto que necesitan sobre todo capital y gobierno"],
              ["Velocidad a tracción", "La más rápida: operadores construyen desde el día uno", "Cronograma fijo de cohort", "Tú construyes; el ritmo es tuyo"],
              ["Control mantenido", "El menor, el studio co-posee más", "Alto", "Alto, menos un asiento en el directorio"]
            ]
          }
        },
        {
          "heading": "Las tres cosas que de verdad estás intercambiando",
          "level": 2,
          "paragraphs": [
            "Quite las etiquetas y todo camino ajusta las mismas tres perillas. Cuánto de la empresa entrega. Cuánto control conserva. En cuánto tiempo llega a la tracción. La razón de que los números de equity se vean tan distintos es que cada camino entrega una cantidad distinta del trabajo real.",
            "Aceleradora y studio pueden pedir equity, pero no venden lo mismo. La aceleradora vende un programa y una red. El studio vende una empresa construida alrededor de usted. Lea el intercambio como cuánto necesito que construyan para mí, no como barato contra caro."
          ],
          "bullets": [
            "Dilución. El porcentaje de la empresa que entrega al inicio, antes de que el upside esté probado.",
            "Control. Si conserva el directorio, el roadmap y el derecho a decir que no.",
            "Velocidad. Cuántos meses hasta tener un producto en el mercado y una primera camada de clientes."
          ],
          "id": "three-axes"
        },
        {
          "heading": "Venture studio: más apoyo, más dilución",
          "level": 3,
          "paragraphs": [
            "El studio toma la mayor porción inicial porque hace más antes de que usted tenga algo que mostrar. El studio promedio se queda con 34% de equity en las empresas que co-funda, con las participaciones más altas cerca de 80%, según la Global Startup Studio Network. A cambio recibe una idea ya probada bajo presión, un equipo de construcción el día uno, capital de primer cheque y operating partners que están en el modelo de unit economics en las primeras semanas, no revisando un deck una vez por trimestre.",
            "Esto calza con un perfil de fundador en particular. Un experto de dominio sin equipo y sin producto construido. Intercambia la mayor porción de equity por lo único que no puede armar solo. Una empresa que funciona. El costo es real y la cuestión del conflicto también, ya que la misma entidad entrega la idea, el capital y los operadores."
          ],
          "id": "studio"
        },
        {
          "heading": "Aceleradora: un programa y un cheque pequeño",
          "level": 3,
          "paragraphs": [
            "Una aceleradora compra una porción pequeña y fija por un cheque pequeño y un programa de duración fija. Y Combinator invierte US$ 500 mil en total. Los primeros US$ 125 mil compran 7% en un SAFE post-money, y los US$ 375 mil restantes van en un SAFE sin cap que convierte en su próxima ronda con valuación. Techstars sigue un formato parecido, con términos de 2025 de US$ 220 mil. Un acuerdo de US$ 20 mil por 5% en acciones comunes más un SAFE sin cap de US$ 200 mil.",
            "La cuenta cierra cuando necesita la red y el sello más que el dinero. Sale cara cuando ya tiene equipo y tracción, porque está pagando entre 6% y 7% por un programa que quizás ya superó."
          ],
          "id": "accelerator"
        },
        {
          "heading": "VC: capital y un asiento en el directorio, la idea es tuya",
          "level": 3,
          "paragraphs": [
            "El VC intercambia una porción mayor que la de la aceleradora por capital de verdad y gobernanza, dejándole la idea y el equipo originales. Una ronda seed o Serie A con valuación cuesta en general entre 15% y 25% por ronda más un asiento en el directorio. Usted conserva la empresa con la que entró. También acepta un miembro del directorio cuyo trabajo es empujar crecimiento en un reloj que quizás no calce con su negocio.",
            "Es el camino correcto para un equipo que ya tiene producto funcionando y quiere combustible, no un co-constructor. Es también el camino del fundador que quiere conservar el máximo de propiedad y está dispuesto a ir más lento por ello."
          ],
          "id": "vc"
        },
        {
          "heading": "Qué fundador debe elegir cuál",
          "level": 2,
          "paragraphs": [
            "La decisión es menos sobre preferencia y más sobre lo que le falta. Empate el camino con la brecha, no con el menor número de dilución."
          ],
          "bullets": [
            "Experto de dominio solo, sin equipo, sin producto. Un venture studio. Intercambia el máximo de equity por el máximo de construcción.",
            "Equipo técnico con prototipo funcionando. Una aceleradora o VC. Paga por capital y red, no por la construcción.",
            "Fundador que quiere el máximo de propiedad y control. Haga bootstrap o levante VC, y acepte una tracción más lenta como el precio de mantener el cap table limpio."
          ],
          "callout": {
            "kind": "tip",
            "text": "Si ya construye y lanza sin ayuda, la porción de un studio está cara para usted. Si no puede, el cheque de una aceleradora no va a cerrar la brecha. Compre aquello que de verdad le falta."
          },
          "id": "who-picks-what"
        },
        {
          "heading": "Por qué una participación mayor del studio aún puede ganar",
          "level": 2,
          "paragraphs": [
            "Una participación de 34% del studio solo tiene sentido si el modelo de studio retorna más, y los datos dicen que sí. Según la Global Startup Studio Network, las startups creadas por studios muestran una [tasa interna de retorno promedio de 50% contra 19% de las startups fuera de studio](/library/why-venture-studios-win-latam). Avante lo cita como studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x, y siempre como el benchmark de GSSN, nunca como el retorno realizado de una sola firma.",
            "Los números de velocidad explican el retorno. Las startups de studio llegan a una ronda seed en promedio en 10,6 meses, menos de un tercio del tiempo de las startups fuera de studio, y 72% de las que levantan seed siguen a una Serie A. La salvedad honesta es supervivencia. Los números de GSSN son autorreportados y se inclinan hacia studios que sobrevivieron para publicar, así que lea el IRR absoluto como direccional. Lo que no está en duda es el mecanismo. Plomería resuelta una vez, operadores en el modelo temprano, y un sistema repetible que compone entre empresas."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x el IRR en horizontes de tiempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "dilution-vs-ev"
        },
        {
          "heading": "Dónde encaja Avante",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y Brasil es la razón de que el modelo calce. Los servicios representan cerca del 70% del PIB brasileño, con baja penetración de software, que es una superficie enorme de negocios poco digitalizados entendidos por operadores de dominio, no por VCs generalistas. La infraestructura de IA ya está barata como para lanzar una empresa sin una Serie A, así que la construcción puede empezar austera.",
            "En la práctica, eso significa que Avante lanza 3-4 ventures por año a través de un sistema de seis etapas, aportando US$ 500K-1.5M por venture con [operating partners comprometidos hasta el primer hito de ingresos](/library/operating-partner-economics). El patrón recurrente es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copilot de IA para generar dato propietario y usar ese dato para levantar y desplegar capital. Puede leer la tesis completa en [/why-avante](/why-avante) y cómo opera el studio en [/principles](/principles).",
            "Entonces elija por lo que le falta, no por lo que se ve más barato el día uno. El fundador que elige un studio no está comprando un cheque. Está comprando una empresa construida sobre diez años de cicatriz de operación, iniciada el mes en que firma, en lugar del año en que habría terminado de contratar."
          ],
          "id": "how-avante"
        }
      ]
    }
  },
  {
    "slug": "taste-is-the-moat",
    "category": "ai",
    "type": "Essay",
    "readTime": "8 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-09",
    "isPublished": true,
    "en": {
      "title": "When Building Is Cheap, Taste Is the Moat",
      "description": "AI collapsed the cost of building. Tony Fadell's career explains what becomes scarce next, and where an AI-native company's defensibility actually lives.",
      "sections": [
        {
          "paragraphs": [
            "The scarce asset in an AI-native company is no longer the ability to build. It is the judgment to decide what is worth building, what to leave out, and why a customer should care. AI has collapsed the cost of production. It has not produced taste, architecture, or customer empathy. Those stay scarce. Scarcity is where margin lives.",
            "That is the through-line of Tony Fadell's career. He shipped the iPod, helped build the iPhone, and founded Nest, which Google acquired for $3.2 billion in 2014. In a recent conversation about building in the AI era, his argument was blunt. When everyone can produce, the premium moves to the people who know what to produce. We build AI-native companies in Brazil and Latin America for a living, and his frame matches what we see in the field every week.",
            "This is not a nostalgia piece about a hardware legend. It is a working thesis about where value accrues once the model itself is cheap for everyone."
          ]
        },
        {
          "id": "cost-of-building",
          "heading": "The cost of building collapsed",
          "level": 2,
          "paragraphs": [
            "Start with the number that changes everything. For a model of equivalent performance, the cost of inference is falling by roughly 10x a year. Andreessen Horowitz named it LLMflation and measured it. The cost of LLM inference dropped by a factor of 1,000 in three years. Hitting an MMLU score of 42 cost about $60 per million tokens with GPT-3 in November 2021. By late 2024 an open model reached the same score for about $0.06 per million tokens, per [a16z](https://a16z.com/llmflation-llm-inference-cost/). Independent measurement from Epoch AI puts the median decline across benchmarks at about 50x per year, and rising.",
            "Read the second-order effect, not just the first. When the cost of building falls this fast, building stops being the bottleneck. The bolt-on AI feature, the chat box next to the old product, is now available to everyone at a price that approaches zero. Cheap to build is the same sentence as not defensible. If you can ship it in a weekend, so can the next ten teams. The collapse that makes AI-native companies possible is the same collapse that makes most of them disposable.",
            "So the interesting question is no longer what the model can do. It is what you decide to do with it, and what you refuse to do."
          ],
          "callout": {
            "kind": "stat",
            "text": "The cost to reach a fixed AI capability fell roughly 1,000x in three years, about 10x per year. When production is nearly free, production cannot be the moat.",
            "attribution": "a16z, Welcome to LLMflation"
          }
        },
        {
          "id": "taste-is-a-test",
          "heading": "Taste is a test, not a vibe",
          "level": 2,
          "paragraphs": [
            "Fadell's word for the scarce asset is taste. It sounds soft. It is not. Taste is the discipline of knowing what to leave out.",
            "His clearest example is the iPhone keyboard. The data did not settle the debate between a physical keyboard and a virtual one. Someone had to decide against the evidence of the moment and ship a glass screen with no keys. Breakthrough 1.0 products cannot be fully validated by user research, because users cannot judge an experience they have never had. In a new category, consensus kills differentiation. Conviction makes it.",
            "AI sharpens this, because AI makes addition free. You can bolt on every feature, every integration, every clever capability the model exposes. The hard job becomes subtraction. A product that does everything is a product no one can describe, and a product no one can describe does not get bought. The founder's real work is deciding what the product is not.",
            "One honest caveat. Taste is not the same as ego. Informed taste is judgment accumulated through doing the work and staying close to the customer. Founder delusion wears the same clothes and skips the work. The test is whether the conviction survives contact with real users, not whether it feels bold in the room."
          ]
        },
        {
          "id": "sell-the-painkiller",
          "heading": "Sell the painkiller, not the model",
          "level": 2,
          "paragraphs": [
            "The antidote to feature-chasing is to start with pain, then add the new technology. The question is never what the model can do. It is what expensive, frequent, budgeted pain can now be solved differently because the model exists.",
            "This shows up most clearly in how a company talks. We use agents is not a story. It describes your supply chain, not the customer's life. We cut claims processing from ten days to ten minutes is a story, because it names a pain the buyer already pays for. The strongest AI products are marketed around the human job to be done, not the model capability that powers it.",
            "The screening question we apply to every venture is simple. Is this a painkiller, a vitamin, or a toy? Painkillers attach to a budget line and a measurable cost. Vitamins are nice and get cut first in a downturn. Toys get demoed and never bought. AI makes toys cheaper to build than ever, which is exactly why the discipline of finding real, budgeted pain matters more than ever."
          ]
        },
        {
          "id": "whole-system",
          "heading": "The product is the whole system",
          "level": 2,
          "paragraphs": [
            "Here is the trap that catches AI startups. They believe the product is the model plus an interface. Fadell's whole career argues the opposite. The winning product is the entire customer journey.",
            "The iPod was not a music player. It needed iTunes and the iTunes Music Store to become the iPod. The iPhone needed the App Store. Nest needed a new retail motion, a new install experience, and design that made a thermostat worth showing a friend. The object was never the product. The system around it was.",
            "The lesson for AI-native companies is direct. A thin interface over someone else's model owns nothing. Anyone can rent the same model at the same falling price. The company that owns the workflow, the data, the onboarding, and the outcome owns a position. The company that owns only the prompt owns a feature that the model provider can absorb in its next release."
          ]
        },
        {
          "id": "where-the-moat-lives",
          "heading": "Where the moat actually lives",
          "level": 2,
          "paragraphs": [
            "Models commoditize. The cost curve guarantees it. When every competitor can call the same model at the same falling price, the model cannot be the moat. Defensibility moves to what the model touches.",
            "Three places hold up, and none of them come from the model. They come from judgment about how the model meets a specific customer's reality."
          ],
          "bullets": [
            "Proprietary data and network effects. Data generated inside a real workflow, that compounds with every use, and that no competitor can buy. The product gets better as customers use it, and the gap widens on its own.",
            "Vertical workflow ownership. A company that redesigns one painful, regulated, messy process end to end is harder to displace than a horizontal copilot that floats above everyone's work and owns none of it.",
            "Trust. AI products are becoming intimate. Copilots, assistants, agents that act. Transparency, permissions, auditability, and human override stop being compliance overhead and become product features that win the deal. The most trusted product often beats the most aggressive one."
          ]
        },
        {
          "id": "how-avante-builds",
          "heading": "How Avante builds for taste",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. We do not bet on a model. We build the loop around it. Every venture is AI-native from day one, with a model in the core product loop and a copilot positioned to capture proprietary data inside a real workflow. That is the recurring pattern across the portfolio: [copilot to data to fund](/library/copilot-to-data-to-fund-flywheel). Build the copilot, generate the data, use the data to raise and deploy capital. More on the thesis at [why Avante](https://avanteventures.com/why-avante).",
            "The studio model is itself an exercise in subtraction. We solve company plumbing once, centrally, which routes roughly $300K to $500K of effective capital per venture into product and traction instead of overhead. The same logic that drops inference cost 10x a year, applied to the company itself. Do the expensive thing once and let every venture launch lean. We launch three to four ventures a year through six stages, Research, Partner, Build, Traction, Revenue, Compound, with $500K to $1.5M deployed per venture and co-founder economics retained.",
            "The structural payoff is the studio model's track record, covered in full in [Why Venture Studios Outperform VC in LATAM](/library/why-venture-studios-win-latam). The model rewards exactly what the AI era rewards: judgment, iteration, and capital efficiency over raw build speed.",
            "One last Fadell idea, because it sets the right expectation. Category-defining products take three generations. First you make the product, then you fix the product, then you fix the business. The iPod, the iPhone, and Nest were not iconic at launch. They earned it through iteration. The job of a studio is to underwrite that iteration capacity, not to bet on a perfect version one.",
            "In an AI-saturated market, anyone can build. Few decide well. Taste is not a soft virtue. It is the leverage that turns cheap production into a durable company. Browse the rest of [the Library](https://avanteventures.com/library)."
          ]
        }
      ]
    },
    "pt": {
      "title": "Quando Construir Fica Barato, o Moat é o Critério",
      "description": "A IA derrubou o custo de construir. A carreira de Tony Fadell explica o que fica escasso em seguida, e onde mora de verdade a defensibilidade de uma empresa AI-native.",
      "sections": [
        {
          "paragraphs": [
            "O ativo escasso em uma empresa AI-native não é mais a capacidade de construir. É o critério para decidir o que vale a pena construir, o que deixar de fora, e por que um cliente deveria se importar. A IA derrubou o custo de produção. Ela não produziu critério, arquitetura ou empatia com o cliente. Esses continuam escassos. E escassez é onde mora a margem.",
            "Esse é o fio condutor da carreira de Tony Fadell. Ele entregou o iPod, ajudou a construir o iPhone e fundou a Nest, que o Google comprou por US$ 3,2 bilhões em 2014. Em uma conversa recente sobre construir na era da IA, o argumento dele foi direto. Quando todo mundo consegue produzir, o prêmio migra para quem sabe o que produzir. Nós construímos empresas AI-native no Brasil e na América Latina, e a leitura dele bate com o que vemos no campo toda semana.",
            "Este não é um texto de nostalgia sobre uma lenda de hardware. É uma tese de trabalho sobre onde o valor se acumula quando o próprio modelo fica barato para todo mundo."
          ]
        },
        {
          "id": "cost-of-building",
          "heading": "O custo de construir despencou",
          "level": 2,
          "paragraphs": [
            "Comece pelo número que muda tudo. Para um modelo de desempenho equivalente, o custo de inferência cai cerca de 10x ao ano. A Andreessen Horowitz batizou isso de LLMflation e mediu. O custo de inferência de LLM caiu por um fator de 1.000 em três anos. Atingir um score MMLU de 42 custava cerca de US$ 60 por milhão de tokens com o GPT-3 em novembro de 2021. No fim de 2024, um modelo aberto chegou ao mesmo score por cerca de US$ 0,06 por milhão de tokens, segundo a [a16z](https://a16z.com/llmflation-llm-inference-cost/). A medição independente da Epoch AI coloca a queda mediana entre benchmarks em cerca de 50x ao ano, e subindo.",
            "Leia o efeito de segunda ordem, não só o primeiro. Quando o custo de construir cai nessa velocidade, construir deixa de ser o gargalo. O recurso de IA acoplado, a caixinha de chat ao lado do produto antigo, agora está disponível para todo mundo a um preço que tende a zero. Barato de construir é a mesma frase que não defensável. Se você entrega em um fim de semana, os próximos dez times também entregam. O mesmo colapso que torna as empresas AI-native possíveis é o que torna a maioria delas descartável.",
            "Então a pergunta interessante não é mais o que o modelo consegue fazer. É o que você decide fazer com ele, e o que você se recusa a fazer."
          ],
          "callout": {
            "kind": "stat",
            "text": "O custo de atingir uma capacidade fixa de IA caiu cerca de 1.000x em três anos, perto de 10x ao ano. Quando a produção é quase de graça, a produção não pode ser o moat.",
            "attribution": "a16z, Welcome to LLMflation"
          }
        },
        {
          "id": "taste-is-a-test",
          "heading": "Critério é um teste, não um clima",
          "level": 2,
          "paragraphs": [
            "A palavra de Fadell para o ativo escasso é taste. Soa subjetivo. Não é. Critério é a disciplina de saber o que deixar de fora.",
            "O exemplo mais claro dele é o teclado do iPhone. Os dados não resolviam o debate entre um teclado físico e um virtual. Alguém teve que decidir contra a evidência daquele momento e entregar uma tela de vidro sem teclas. Produtos 1.0 que abrem categoria não podem ser totalmente validados por pesquisa com usuário, porque o usuário não consegue julgar uma experiência que nunca teve. Em uma categoria nova, o consenso mata a diferenciação. A convicção a constrói.",
            "A IA agudiza isso, porque a IA torna adicionar algo de graça. Dá para acoplar todo recurso, toda integração, toda capacidade esperta que o modelo expõe. O trabalho difícil vira subtrair. Um produto que faz tudo é um produto que ninguém consegue descrever, e um produto que ninguém descreve não é comprado. O trabalho de verdade do fundador é decidir o que o produto não é.",
            "Uma ressalva honesta. Critério não é a mesma coisa que ego. Critério informado é julgamento acumulado fazendo o trabalho e ficando perto do cliente. A ilusão do fundador veste a mesma roupa e pula o trabalho. O teste é se a convicção sobrevive ao contato com usuários reais, não se ela parece ousada na sala."
          ]
        },
        {
          "id": "sell-the-painkiller",
          "heading": "Venda o analgésico, não o modelo",
          "level": 2,
          "paragraphs": [
            "O antídoto para a caça a recursos é começar pela dor, e só então adicionar a nova tecnologia. A pergunta nunca é o que o modelo consegue fazer. É qual dor cara, frequente e orçada agora pode ser resolvida de outro jeito porque o modelo existe.",
            "Isso aparece com clareza em como a empresa fala. Nós usamos agentes não é uma história. Descreve a sua cadeia de suprimentos, não a vida do cliente. Nós cortamos o processamento de sinistros de dez dias para dez minutos é uma história, porque nomeia uma dor que o comprador já paga. Os produtos de IA mais fortes são vendidos em torno do trabalho humano a ser feito, não da capacidade do modelo que o move.",
            "A pergunta de triagem que aplicamos a toda venture é simples. Isso é um analgésico, uma vitamina ou um brinquedo? Analgésicos se prendem a uma linha de orçamento e a um custo mensurável. Vitaminas são agradáveis e são as primeiras a cair numa retração. Brinquedos recebem demonstração e nunca são comprados. A IA torna brinquedos mais baratos de construir do que nunca, e é exatamente por isso que a disciplina de achar dor real e orçada importa mais do que nunca."
          ]
        },
        {
          "id": "whole-system",
          "heading": "O produto é o sistema inteiro",
          "level": 2,
          "paragraphs": [
            "Aqui está a armadilha que pega as startups de IA. Elas acreditam que o produto é o modelo mais uma interface. A carreira inteira de Fadell argumenta o contrário. O produto vencedor é a jornada inteira do cliente.",
            "O iPod não era um tocador de música. Ele precisava do iTunes e da iTunes Music Store para virar o iPod. O iPhone precisava da App Store. A Nest precisou de um novo varejo, de uma nova experiência de instalação e de um design que fizesse um termostato valer a pena mostrar para um amigo. O objeto nunca foi o produto. O sistema ao redor era.",
            "A lição para empresas AI-native é direta. Uma interface fina sobre o modelo de outra pessoa não é dona de nada. Qualquer um aluga o mesmo modelo ao mesmo preço em queda. A empresa que é dona do workflow, do dado, do onboarding e do resultado é dona de uma posição. A empresa que é dona só do prompt é dona de um recurso que o provedor do modelo absorve no próximo release."
          ]
        },
        {
          "id": "where-the-moat-lives",
          "heading": "Onde o moat de fato mora",
          "level": 2,
          "paragraphs": [
            "Modelos viram commodity. A curva de custo garante isso. Quando todo concorrente consegue chamar o mesmo modelo ao mesmo preço em queda, o modelo não pode ser o moat. A defensibilidade migra para o que o modelo toca.",
            "Três lugares se sustentam, e nenhum deles vem do modelo. Eles vêm do critério sobre como o modelo encontra a realidade de um cliente específico."
          ],
          "bullets": [
            "Dado proprietário e efeitos de rede. Dado gerado dentro de um workflow real, que se acumula a cada uso, e que nenhum concorrente consegue comprar. O produto melhora à medida que os clientes usam, e a vantagem se amplia sozinha.",
            "Propriedade do workflow vertical. Uma empresa que redesenha um processo doloroso, regulado e bagunçado de ponta a ponta é mais difícil de deslocar do que um copilot horizontal que flutua sobre o trabalho de todos e não é dono de nenhum.",
            "Confiança. Os produtos de IA estão ficando íntimos. Copilots, assistentes, agentes que agem. Transparência, permissões, auditabilidade e controle humano deixam de ser custo de compliance e viram recursos de produto que ganham a venda. O produto mais confiável costuma vencer o mais agressivo."
          ]
        },
        {
          "id": "how-avante-builds",
          "heading": "Como a Avante constrói para o critério",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Nós não apostamos em um modelo. Construímos o loop ao redor dele. Toda venture é AI-native desde o dia um, com um modelo no loop central do produto e um copilot posicionado para capturar dado proprietário dentro de um workflow real. Esse é o padrão recorrente do portfólio: [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construa o copilot, gere o dado, use o dado para levantar e alocar capital. Mais sobre a tese em [por que a Avante](https://avanteventures.com/why-avante).",
            "O modelo de studio é, em si, um exercício de subtração. Resolvemos o encanamento de empresa uma vez, de forma central, o que direciona cerca de US$ 300 mil a US$ 500 mil de capital efetivo por venture para produto e tração em vez de overhead. A mesma lógica que derruba o custo de inferência 10x ao ano, aplicada à própria empresa. Faça a coisa cara uma vez e deixe cada venture nascer enxuta. Lançamos de três a quatro ventures por ano em seis estágios, Research, Partner, Build, Traction, Revenue, Compound, com US$ 500 mil a US$ 1,5 milhão alocados por venture e economia de co-founder retida.",
            "O retorno estrutural é o histórico do modelo de studio, detalhado em [Por Que Venture Studios Superam o VC na LATAM](/library/why-venture-studios-win-latam). O modelo recompensa exatamente o que a era da IA recompensa: critério, iteração e eficiência de capital acima da velocidade bruta de construir.",
            "Uma última ideia de Fadell, porque ela calibra a expectativa certa. Produtos que abrem categoria levam três gerações. Primeiro você faz o produto, depois conserta o produto, depois conserta o negócio. O iPod, o iPhone e a Nest não eram icônicos no lançamento. Eles conquistaram isso pela iteração. O trabalho de um studio é financiar essa capacidade de iterar, não apostar em uma versão um perfeita.",
            "Em um mercado saturado de IA, qualquer um constrói. Poucos decidem bem. Critério não é uma virtude subjetiva. É a alavanca que transforma produção barata em empresa durável. Navegue pelo resto da [Biblioteca](https://avanteventures.com/library)."
          ]
        }
      ]
    }
  },
  {
    "slug": "venture-builders-brazil-vs-usa-benchmark",
    "category": "research",
    "type": "Benchmark",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-08",
    "isPublished": true,
    "ogImage": "/og/venture-builders-brazil-vs-usa-benchmark.png",
    "en": {
      "title": "Venture Studio Benchmark: The US Track Record and Brazil's Opening",
      "description": "A benchmark of the studios that built the model in the US and Europe, what it returns, and why Brazil is the open lane for an AI-native one.",
      "sections": [
        {
          "paragraphs": [
            "Here is the venture studio benchmark in one line. The model builds companies in-house, hands a founder a team and first capital on day one, and takes co-founder economics in return. That structure has a twenty-five year track record across the US and Europe, and almost none of it is in Brazil yet. Idealab started in 1996. The studios that followed produced IPOs, unicorns, and, by the most-cited industry figure, an internal rate of return near 50% against roughly 19% for traditional venture capital.",
            "This piece is that benchmark read builder by builder, with the numbers that hold up and the ones that do not. Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, so we read this record as proof and as opening at the same time. The model works. No one is running it AI-native in Brazil. That gap is the entire thesis. We size that gap across verticals in the [Brazilian AI market report](/library/brazil-ai-market-report-2026).",
            "A venture studio, also called a startup studio or company builder, conceives companies in-house and staffs them, rather than investing in founders who arrive with their own. That single design choice is what the rest of this benchmark measures. You can read the longer version of [why the structure fits Brazil](/why-avante)."
          ]
        },
        {
          "heading": "A model proven by twenty-five years of builders",
          "level": 2,
          "paragraphs": [
            "The venture studio is not a 2020s invention, and that is the first thing the record tells you. The benchmark builders were founded between 1996 and 2015. This is a proven structure with public exits attached to it, not an experiment running on a pitch deck.",
            "What unites them is simple. Each one created companies in-house, with operators inside from week one, rather than writing checks into other people's startups and hoping. The track records are specific and, in most cases, independently verifiable. Read the six together as one claim with six data points. Building on purpose, with the build team and the capital under one roof, produces public exits at a rate that pure check-writing does not."
          ],
          "bullets": [
            "Idealab. Founded 1996 by Bill Gross. More than 150 companies created and 45 or more IPOs and acquisitions, per [Caltech](https://board.caltech.edu/board-members/mr-william-t-gross-bs-81) and the firm.",
            "Rocket Internet. Founded 2007 in Berlin. Over 100 companies built, with Zalando, HelloFresh, and Delivery Hero all reaching public markets.",
            "eFounders, now Hexa. Founded 2011 in Paris. Roughly 50 companies and about $5B in cumulative value created, per [Hexa](https://www.hexa.com/).",
            "Human Ventures. Founded 2014 in New York. 60 or more companies and three unicorns, per [Fortune](https://fortune.com/2024/04/15/human-ventures-approaches-50-million-raised-second-fund/).",
            "Pioneer Square Labs. Founded 2015 in Seattle. More than 35 companies spun out, including Boundless and Recurrent, per [Ascend VC](https://www.ascend.vc/blog/tag/Pioneer+Square+Labs).",
            "Atomic. Founded 2012. Built Hims and Hers, now public on the NYSE under HIMS."
          ],
          "id": "the-proven-model"
        },
        {
          "heading": "What returns does the venture studio model actually generate?",
          "level": 2,
          "paragraphs": [
            "The most-cited number says the studio model returns far more than traditional venture. Per the Global Startup Studio Network, studio-created startups show an average internal rate of return near 50% against roughly 19% for non-studio startups. Avante cites this as studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x, and always as the GSSN benchmark rather than any single firm's realized return.",
            "Now the caveat that makes the figure usable instead of embarrassing. Those GSSN numbers are self-reported and trace to a single 2020 to 2022 white paper. The largest independent study of the model, [Big Venture Studio Research](https://inniches.com/big-venture-studio-research) published in December 2024, does not reproduce that magnitude. Read the absolute IRR as directional, not as a promise, and never as a guarantee of any one studio's outcome.",
            "What survives scrutiny is the scale and the mechanism. Enhance Ventures counted more than 560 studios operating worldwide, so the model has become a category of its own. A studio [outperforms for structural reasons](/library/why-venture-studios-win-latam) you can name. Plumbing solved once. Operators in the unit-economics model in the first weeks. A repeatable system that compounds across ventures. Argue with the exact multiple if you want. The direction of it holds. That is the honest read of the studio benchmark, worth far more as a working mechanism than as a single headline percentage."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR over realistic time horizons.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "what-it-returns"
        },
        {
          "heading": "Are there venture studios in Brazil yet?",
          "level": 2,
          "paragraphs": [
            "Here is the part of the benchmark that should interest a Brazilian founder most. None of it is Brazilian. The model that produced Zalando and Hims was built in Berlin, Paris, New York, and Seattle, and the category has barely arrived in Brazil.",
            "The names most often called Brazilian studios are not studios. [Domo Invest](https://domo.vc/), to take the most cited example, is a traditional venture capital fund rather than a company builder. There is no benchmark AI-native venture studio in Brazil yet. The lane is open, and it is open for a structural reason rather than a lack of talent."
          ],
          "bullets": [
            "The surface is large. Services account for roughly 70% of Brazilian GDP, per IBGE, with low software penetration.",
            "The buyers are under-digitized businesses that domain operators understand and generalist VCs usually do not.",
            "The competition for an AI-native, local studio is close to zero."
          ],
          "id": "brazil-white-space"
        },
        {
          "heading": "The AI-native edge the benchmarks never had",
          "level": 2,
          "paragraphs": [
            "Every studio in the benchmark shares one quiet limitation. They were all designed before AI could build. Idealab in 1996, Rocket in 2007, even Pioneer Square in 2015, all assume a large engineering team and a Series A to reach scale, because in their era that was the only way to do it.",
            "That assumption is now wrong, and the cost curve is the reason. AI infrastructure is now cheap enough to deploy without a Series A. A studio venture launches 6-9 months ahead of a comparably funded standalone team, and solving company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction rather than overhead.",
            "Be honest about the limit. Cheap AI is not a moat by itself, because it lowers the barrier for competitors at the same time. The edge is running the proven studio structure with AI agents inside from day one, in a market where no one else is doing it. That combination is exactly what the benchmark builders never had access to."
          ],
          "id": "ai-native-edge"
        },
        {
          "heading": "How Avante runs the playbook",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and the benchmark is why the model fits here rather than a hope that it might. The structure is proven abroad. The market is open at home. The cost curve finally allows the build to start lean.",
            "In practice that means Avante launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. It deploys $500K-1.5M per venture across pre-seed and retains co-founder economics, with operating partners staying engaged through the first revenue milestone. The recurring pattern is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. You can see [how the studio operates](/principles).",
            "The current portfolio follows that pattern. Alphajuri in judicial assets, WIR in insurance pricing, and BR Auction Intel in real estate auctions. The benchmark says the studio model produces IPOs and unicorns over twenty-five years of patient building. The opening says Brazil has none of it yet, not AI-native. Avante is building from that gap rather than toward it."
          ],
          "callout": {
            "kind": "tip",
            "text": "If you are weighing the studio path, judge it on the mechanism, not the headline IRR. Operators inside from week one and plumbing solved once are the parts that survive independent scrutiny."
          },
          "id": "how-avante"
        }
      ]
    },
    "pt": {
      "title": "Benchmark de Venture Studio: O Histórico dos EUA e a Brecha do Brasil",
      "description": "Um benchmark dos studios que criaram o modelo nos EUA e na Europa, o que ele retorna, e por que o Brasil é a pista aberta para um AI-native.",
      "sections": [
        {
          "paragraphs": [
            "Aqui está o benchmark de venture studio em uma linha. O modelo constrói empresas internamente, entrega ao fundador um time e o primeiro capital no dia um e fica com economia de co-founder em troca. Essa estrutura tem um histórico de vinte e cinco anos nos EUA e na Europa, e quase nada disso está no Brasil ainda. A Idealab começou em 1996. Os studios que vieram depois produziram IPOs, unicórnios e, pelo número mais citado do setor, uma taxa interna de retorno perto de 50% contra cerca de 19% do venture capital tradicional.",
            "Este texto é esse benchmark lido builder por builder, com os números que se sustentam e os que não se sustentam. A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, então lemos esse histórico como prova e como brecha ao mesmo tempo. O modelo funciona. Ninguém o roda AI-native no Brasil. Essa lacuna é a tese inteira.",
            "Um venture studio, também chamado de startup studio ou construtor de empresas, concebe empresas internamente e monta os times, em vez de investir em fundadores que chegam com os seus. Essa única escolha de desenho é o que o resto deste benchmark mede. Você pode ler a versão mais longa de [por que a estrutura encaixa no Brasil](/why-avante)."
          ]
        },
        {
          "heading": "Um modelo provado por vinte e cinco anos de builders",
          "level": 2,
          "paragraphs": [
            "O venture studio não é uma invenção dos anos 2020, e essa é a primeira coisa que o histórico mostra. Os builders de referência foram fundados entre 1996 e 2015. É uma estrutura provada, com saídas públicas anexadas a ela, não um experimento rodando em cima de um deck.",
            "O que os une é simples. Cada um criou empresas internamente, com operadores dentro desde a primeira semana, em vez de assinar cheques nas startups dos outros e torcer. Os históricos são específicos e, na maioria dos casos, verificáveis de forma independente."
          ],
          "bullets": [
            "Idealab. Fundada em 1996 por Bill Gross. Mais de 150 empresas criadas e 45 ou mais IPOs e aquisições, segundo a [Caltech](https://board.caltech.edu/board-members/mr-william-t-gross-bs-81) e a própria firma.",
            "Rocket Internet. Fundada em 2007 em Berlim. Mais de 100 empresas construídas, com Zalando, HelloFresh e Delivery Hero chegando ao mercado público.",
            "eFounders, hoje Hexa. Fundada em 2011 em Paris. Cerca de 50 empresas e aproximadamente US$ 5 bilhões em valor acumulado criado, segundo a [Hexa](https://www.hexa.com/).",
            "Human Ventures. Fundada em 2014 em Nova York. 60 ou mais empresas e três unicórnios, segundo a [Fortune](https://fortune.com/2024/04/15/human-ventures-approaches-50-million-raised-second-fund/).",
            "Pioneer Square Labs. Fundada em 2015 em Seattle. Mais de 35 empresas geradas, incluindo Boundless e Recurrent, segundo a [Ascend VC](https://www.ascend.vc/blog/tag/Pioneer+Square+Labs).",
            "Atomic. Fundada em 2012. Construiu a Hims and Hers, hoje listada na NYSE sob HIMS."
          ],
          "id": "the-proven-model"
        },
        {
          "heading": "Que retorno o modelo de venture studio de fato gera?",
          "level": 2,
          "paragraphs": [
            "O número mais citado diz que o modelo de studio retorna muito mais que o venture tradicional. Segundo a Global Startup Studio Network, startups criadas por studios mostram uma taxa interna de retorno média perto de 50% contra cerca de 19% das startups fora de studio. A Avante cita isso como studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x, e sempre como o benchmark da GSSN, nunca como o retorno realizado de uma única firma.",
            "Agora a ressalva que torna o número usável em vez de constrangedor. Esses dados da GSSN são autorreportados e vêm de um único white paper de 2020 a 2022. O maior estudo independente do modelo, o [Big Venture Studio Research](https://inniches.com/big-venture-studio-research) publicado em dezembro de 2024, não reproduz essa magnitude. Leia o IRR absoluto como direcional, não como promessa, e nunca como garantia do resultado de um studio específico.",
            "O que sobrevive ao escrutínio é a escala e o mecanismo. A Enhance Ventures contou mais de 560 studios operando no mundo, então o modelo virou uma categoria própria. Um studio [supera por razões estruturais](/library/why-venture-studios-win-latam) que dá para nomear. Encanamento resolvido uma vez. Operadores no modelo de unit economics nas primeiras semanas. Um sistema repetível que compõe entre empresas. Discuta o múltiplo exato se quiser. A direção se mantém. Essa é a leitura honesta do benchmark de studio, que vale muito mais como mecanismo de trabalho do que como uma única porcentagem de manchete."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x o IRR em horizontes de tempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "what-it-returns"
        },
        {
          "heading": "Existem venture studios no Brasil?",
          "level": 2,
          "paragraphs": [
            "Aqui está a parte do benchmark que mais deveria interessar a um fundador brasileiro. Nada dele é brasileiro. O modelo que produziu Zalando e Hims foi construído em Berlim, Paris, Nova York e Seattle, e a categoria mal chegou ao Brasil.",
            "Os nomes mais chamados de studios brasileiros não são studios. A [Domo Invest](https://domo.vc/), para usar o exemplo mais citado, é um fundo de venture capital tradicional, não um construtor de empresas. Não existe um venture studio AI-native de referência no Brasil ainda. A pista está aberta, e está aberta por uma razão estrutural, não por falta de talento."
          ],
          "bullets": [
            "A superfície é grande. Serviços representam cerca de 70% do PIB brasileiro, segundo o IBGE, com baixa penetração de software.",
            "Os compradores são negócios pouco digitalizados que operadores de domínio entendem e que VCs generalistas em geral não entendem.",
            "A concorrência por um studio AI-native e local é perto de zero."
          ],
          "id": "brazil-white-space"
        },
        {
          "heading": "A vantagem AI-native que os benchmarks nunca tiveram",
          "level": 2,
          "paragraphs": [
            "Todo studio do benchmark tem uma limitação silenciosa em comum. Todos foram desenhados antes de a IA conseguir construir. Idealab em 1996, Rocket em 2007, até a Pioneer Square em 2015, todos assumem um time de engenharia grande e uma Série A para chegar à escala, porque na época deles era o único jeito de fazer.",
            "Essa premissa hoje está errada, e a curva de custo é a razão. A infraestrutura de IA já está barata o bastante para lançar uma empresa sem uma Série A. Um venture de studio lança 6-9 meses à frente de um time autônomo com financiamento comparável, e resolver o encanamento da empresa uma vez direciona cerca de US$ 300K-500K de capital efetivo por venture para produto e tração em vez de overhead.",
            "Seja honesto sobre o limite. IA barata não é um moat por si só, porque ela baixa a barreira para os concorrentes ao mesmo tempo. A vantagem é rodar a estrutura provada de studio com agentes de IA dentro desde o dia um, num mercado onde ninguém mais faz isso. Essa combinação é exatamente o que os builders do benchmark nunca tiveram à disposição."
          ],
          "id": "ai-native-edge"
        },
        {
          "heading": "Como a Avante roda o playbook",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e o benchmark é a razão de o modelo encaixar aqui, não uma esperança de que talvez encaixe. A estrutura é provada lá fora. O mercado está aberto em casa. A curva de custo finalmente deixa a construção começar enxuta.",
            "Na prática, isso significa que a Avante lança 3-4 ventures por ano através de um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. Ela aporta US$ 500K-1.5M por venture ao longo do pré-seed e mantém economia de co-founder, com operating partners engajados até o primeiro marco de receita. O padrão recorrente é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copilot de IA para gerar dado proprietário e usar esse dado para levantar e aplicar capital. Você pode ver [como o studio opera](/principles).",
            "O portfólio atual segue esse padrão. Alphajuri em ativos judiciais, WIR em precificação de seguros e BR Auction Intel em leilões de imóveis. O benchmark diz que o modelo de studio produz IPOs e unicórnios ao longo de vinte e cinco anos de construção paciente. A brecha diz que o Brasil ainda não tem nada disso, AI-native. A Avante constrói a partir dessa lacuna, não em direção a ela."
          ],
          "callout": {
            "kind": "tip",
            "text": "Se você está avaliando o caminho de studio, julgue pelo mecanismo, não pelo IRR de manchete. Operadores dentro desde a primeira semana e encanamento resolvido uma vez são as partes que sobrevivem ao escrutínio independente."
          },
          "id": "how-avante"
        }
      ]
    },
    "es": {
      "title": "Benchmark de Venture Studio: El Historial de EE. UU. y la Brecha de Brasil",
      "description": "Un benchmark de los studios que crearon el modelo en EE. UU. y Europa, lo que retorna, y por qué Brasil es el carril abierto para uno AI-native.",
      "sections": [
        {
          "paragraphs": [
            "Aquí está el benchmark de venture studio en una línea. El modelo construye empresas internamente, entrega al fundador un equipo y el primer capital el día uno y se queda con economía de co-founder a cambio. Esa estructura tiene un historial de veinticinco años en EE. UU. y Europa, y casi nada de eso está en Brasil todavía. Idealab empezó en 1996. Los studios que vinieron después produjeron IPOs, unicornios y, según la cifra más citada del sector, una tasa interna de retorno cerca de 50% contra alrededor de 19% del venture capital tradicional.",
            "Este texto es ese benchmark leído builder por builder, con los números que se sostienen y los que no. Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, así que leemos este historial como prueba y como brecha al mismo tiempo. El modelo funciona. Nadie lo corre AI-native en Brasil. Esa brecha es la tesis entera.",
            "Un venture studio, también llamado startup studio o constructor de empresas, concibe empresas internamente y arma los equipos, en lugar de invertir en fundadores que llegan con los suyos. Esa sola decisión de diseño es lo que el resto de este benchmark mide. Puede leer la versión más larga de [por qué la estructura calza en Brasil](/why-avante)."
          ]
        },
        {
          "heading": "Un modelo probado por veinticinco años de builders",
          "level": 2,
          "paragraphs": [
            "El venture studio no es un invento de la década de 2020, y eso es lo primero que dice el historial. Los builders de referencia se fundaron entre 1996 y 2015. Es una estructura probada, con salidas públicas adjuntas, no un experimento corriendo sobre un deck.",
            "Lo que los une es simple. Cada uno creó empresas internamente, con operadores adentro desde la primera semana, en lugar de firmar cheques en las startups de otros y rezar. Los historiales son específicos y, en la mayoría de los casos, verificables de forma independiente."
          ],
          "bullets": [
            "Idealab. Fundada en 1996 por Bill Gross. Más de 150 empresas creadas y 45 o más IPOs y adquisiciones, según [Caltech](https://board.caltech.edu/board-members/mr-william-t-gross-bs-81) y la propia firma.",
            "Rocket Internet. Fundada en 2007 en Berlín. Más de 100 empresas construidas, con Zalando, HelloFresh y Delivery Hero llegando a los mercados públicos.",
            "eFounders, hoy Hexa. Fundada en 2011 en París. Cerca de 50 empresas y alrededor de US$ 5 mil millones en valor acumulado creado, según [Hexa](https://www.hexa.com/).",
            "Human Ventures. Fundada en 2014 en Nueva York. 60 o más empresas y tres unicornios, según [Fortune](https://fortune.com/2024/04/15/human-ventures-approaches-50-million-raised-second-fund/).",
            "Pioneer Square Labs. Fundada en 2015 en Seattle. Más de 35 empresas generadas, incluidas Boundless y Recurrent, según [Ascend VC](https://www.ascend.vc/blog/tag/Pioneer+Square+Labs).",
            "Atomic. Fundada en 2012. Construyó Hims and Hers, hoy listada en la NYSE bajo HIMS."
          ],
          "id": "the-proven-model"
        },
        {
          "heading": "¿Qué retorno genera de verdad el modelo de venture studio?",
          "level": 2,
          "paragraphs": [
            "La cifra más citada dice que el modelo de studio retorna mucho más que el venture tradicional. Según la Global Startup Studio Network, las startups creadas por studios muestran una tasa interna de retorno promedio cerca de 50% contra alrededor de 19% de las startups fuera de studio. Avante lo cita como studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x, y siempre como el benchmark de GSSN, nunca como el retorno realizado de una sola firma.",
            "Ahora la salvedad que vuelve el número usable en vez de vergonzoso. Esos datos de GSSN son autorreportados y vienen de un único white paper de 2020 a 2022. El mayor estudio independiente del modelo, el [Big Venture Studio Research](https://inniches.com/big-venture-studio-research) publicado en diciembre de 2024, no reproduce esa magnitud. Lea el IRR absoluto como direccional, no como promesa, y nunca como garantía del resultado de un studio en particular.",
            "Lo que sobrevive al escrutinio es la escala y el mecanismo. Enhance Ventures contó más de 560 studios operando en el mundo, así que el modelo se volvió una categoría propia. Un studio [supera por razones estructurales](/library/why-venture-studios-win-latam) que se pueden nombrar. Plomería resuelta una vez. Operadores en el modelo de unit economics en las primeras semanas. Un sistema repetible que compone entre empresas. Discuta el múltiplo exacto si quiere. La dirección se mantiene. Esa es la lectura honesta del benchmark de studio, que vale mucho más como mecanismo de trabajo que como un solo porcentaje de titular."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR de ~50% versus ~19% para VC tradicional, cerca de 2.5x el IRR en horizontes de tiempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          },
          "id": "what-it-returns"
        },
        {
          "heading": "¿Hay venture studios en Brasil todavía?",
          "level": 2,
          "paragraphs": [
            "Aquí está la parte del benchmark que más debería interesar a un fundador brasileño. Nada de él es brasileño. El modelo que produjo Zalando y Hims se construyó en Berlín, París, Nueva York y Seattle, y la categoría apenas llegó a Brasil.",
            "Los nombres que más se llaman studios brasileños no son studios. [Domo Invest](https://domo.vc/), para usar el ejemplo más citado, es un fondo de venture capital tradicional, no un constructor de empresas. No existe un venture studio AI-native de referencia en Brasil todavía. El carril está abierto, y está abierto por una razón estructural, no por falta de talento."
          ],
          "bullets": [
            "La superficie es grande. Los servicios representan cerca del 70% del PIB brasileño, según el IBGE, con baja penetración de software.",
            "Los compradores son negocios poco digitalizados que los operadores de dominio entienden y que los VCs generalistas por lo general no.",
            "La competencia por un studio AI-native y local es cercana a cero."
          ],
          "id": "brazil-white-space"
        },
        {
          "heading": "La ventaja AI-native que los benchmarks nunca tuvieron",
          "level": 2,
          "paragraphs": [
            "Todo studio del benchmark comparte una limitación silenciosa. Todos se diseñaron antes de que la IA pudiera construir. Idealab en 1996, Rocket en 2007, incluso Pioneer Square en 2015, todos asumen un equipo de ingeniería grande y una Serie A para llegar a escala, porque en su época era la única forma de hacerlo.",
            "Esa premisa hoy está equivocada, y la curva de costo es la razón. La infraestructura de IA ya está barata como para lanzar una empresa sin una Serie A. Un venture de studio lanza 6-9 meses antes que un equipo autónomo con financiamiento comparable, y resolver la plomería de la empresa una vez dirige cerca de US$ 300K-500K de capital efectivo por venture a producto y tracción en lugar de overhead.",
            "Sea honesto sobre el límite. La IA barata no es un moat por sí sola, porque baja la barrera para los competidores al mismo tiempo. La ventaja es correr la estructura probada de studio con agentes de IA adentro desde el día uno, en un mercado donde nadie más lo hace. Esa combinación es justo lo que los builders del benchmark nunca tuvieron a su alcance."
          ],
          "id": "ai-native-edge"
        },
        {
          "heading": "Cómo Avante corre el playbook",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y el benchmark es la razón de que el modelo calce aquí, no una esperanza de que quizás calce. La estructura está probada afuera. El mercado está abierto en casa. La curva de costo por fin deja que la construcción empiece austera.",
            "En la práctica, eso significa que Avante lanza 3-4 ventures por año a través de un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Aporta US$ 500K-1.5M por venture a lo largo del pre-seed y conserva economía de co-founder, con operating partners comprometidos hasta el primer hito de ingresos. El patrón recurrente es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copilot de IA para generar dato propietario y usar ese dato para levantar y desplegar capital. Puede ver [cómo opera el studio](/principles).",
            "El portafolio actual sigue ese patrón. Alphajuri en activos judiciales, WIR en precificación de seguros y BR Auction Intel en subastas de inmuebles. El benchmark dice que el modelo de studio produce IPOs y unicornios a lo largo de veinticinco años de construcción paciente. La brecha dice que Brasil aún no tiene nada de eso, AI-native. Avante construye desde esa brecha, no hacia ella."
          ],
          "callout": {
            "kind": "tip",
            "text": "Si está evaluando el camino de studio, júzguelo por el mecanismo, no por el IRR de titular. Operadores adentro desde la primera semana y plomería resuelta una vez son las partes que sobreviven al escrutinio independiente."
          },
          "id": "how-avante"
        }
      ]
    }
  },
  {
    "slug": "venture-studio-founder-economics-latam",
    "category": "insights",
    "type": "Insight",
    "readTime": "10 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/venture-studio-founder-economics-latam.png",
    "isPublished": true,
    "en": {
      "title": "The Founder Side of the Venture Studio Deal in LATAM",
      "description": "A studio takes founder equity early. When that trade pays a LATAM operator, when it does not, and the numbers to run before signing.",
      "sections": [
        {
          "paragraphs": [
            "Most writing about venture studios defends the model to LPs. This is the other view. You are a strong operator in Brazil or the broader LATAM market, and a studio offers to co-found your company in exchange for a real slice of equity on day one. The question is whether to take it or raise solo and keep the cap table.",
            "The answer is a trade, not a verdict. You give up points early. You gain a co-founder, shared plumbing, and first-ticket capital that compress six to nine months of company setup. The trade pays only when the studio actually removes risk and time. When it does not, the right move is to walk. This piece runs the venture studio founder economics from your side, names the honest failure mode, and shows why the math tilts harder toward the studio in LATAM than in the US."
          ]
        },
        {
          "id": "the-trade",
          "heading": "The trade a founder is actually making",
          "level": 2,
          "paragraphs": [
            "The venture studio founder equity question is not should I give up equity. It is what do I get for it, and would I have gotten there alone. A studio is not an investor writing a check from the sidelines. It is a co-founder with a balance sheet, a team, and a system, and it prices that role accordingly.",
            "So the real decision is a swap. You trade a large early slice of a company that does not exist yet for a higher chance that it will exist and reach a priced round on a shorter clock. Get that framing right and the rest of the analysis follows. Get it wrong, treat the studio as expensive money, and you will either overpay a weak studio or walk away from a strong one for the wrong reason."
          ],
          "callout": {
            "kind": "tip",
            "text": "Run one test before anything else. Subtract the studio's contribution from your plan. If the company would look about the same without it, keep the cap table and raise alone."
          }
        },
        {
          "id": "what-you-give",
          "heading": "What you give up, in points",
          "level": 2,
          "paragraphs": [
            "Start with the give, because it is large and it compounds. Studios take materially more equity at founding than a seed fund takes per round. The Startup VC puts studio stakes at 30% to 60% of a new company at founding, against 10% to 20% per round for a seed-stage VC. Alder VC pegs the working range at 15% to 50%, with many studios defaulting to 30% to 40%, while a solo founder who raises from VCs starts at 80% to 100% before any dilution.",
            "The cap table is where this gets concrete. Alder VC walks the math. A founder partnering with a 25% studio holds about 75% at incorporation, roughly 60% after a seed round, and about 48% after Series A. A founder with a 40% studio holds 60%, then 48%, then about 38% on the same path. Their line is the one to sit with. The 10-point gap at Series A is not academic. It changes how institutional investors read your incentive alignment.",
            "None of that is a reason to refuse a studio. It is a reason to demand that the studio earn the difference, and the mirror image of your dilution is [how the studio's operating-partner economics](/library/operating-partner-economics) get paid. You are not paying for money. Money is the cheap part. You are paying for the months and the risk a real studio takes off the table, and the only question that matters is whether it does."
          ],
          "bullets": [
            "Studio at founding. 15% to 50%, often 30% to 40%. The Startup VC sees 30% to 60% in aggressive cases.",
            "Seed VC. 10% to 20% per round, no operating role, no first build.",
            "Solo founder. 80% to 100% at incorporation, and every month and dollar of setup is yours to fund."
          ]
        },
        {
          "id": "what-you-get",
          "heading": "What you get, in months and capital",
          "level": 2,
          "paragraphs": [
            "What offsets the dilution is time you do not have to buy back later. The clearest founder-side account on record is from Merantix Capital. In a May 2025 essay titled Why on Earth Should a Founder Take a Venture Studio Deal, Adrian Locher lays out the model without spin. Roughly EUR 1M for 15% preferred plus 10% common, about 25% for first capital and full operating support. His words. We write smaller checks than a mega-fund, and our founders may take slightly more dilution upfront.",
            "The payoff he claims is efficiency. Founders can stretch EUR 1M in ways others need EUR 3M to EUR 5M, because the studio supplies corporate design partners, domain experts, and a talent pipeline that produces hundreds of qualified candidates within days. His traction claim is specific enough to check. Four of the last five Merantix studio startups reached EUR 500K in revenue within the first six months. The mechanism is shared plumbing. Engineering, design, recruiting, and go-to-market already exist, so you do not rebuild them from zero while burning your first ticket.",
            "The portfolio-level data points the same way. The Global Startup Studio Network reports that studio startups reach Series A in about 25.2 months against 56 months for traditional ones, and that 72% of studio ventures that reach the seed round go on to Series A. A model that more than halves the time to a priced round is not getting lucky on deal selection. It is removing the early failure points that kill ordinary startups in year one. That compressed clock is the time you buy back, and a studio venture launches 6-9 months ahead of a comparably funded standalone team."
          ]
        },
        {
          "id": "when-it-pays",
          "heading": "When the split pays, and when it does not",
          "level": 2,
          "paragraphs": [
            "The split pays only when the studio truly removes risk and time. A passive studio that takes founder equity for a brand and a desk is a worse deal than raising solo, and this is the part most studio writing skips. Locher draws the line himself. The model suits repeat operators and long-term thinkers willing to trade early equity for later advantage. It is the wrong deal for founders who want full independence or are uncomfortable co-building, for whom the dilution is simply unnecessary.",
            "Before you sign, stress-test three things. First, depth. If the studio cannot name the operators who will be in your build and what they shipped before, the equity is buying advice, not hours. Second, capital. If the first ticket does not actually compress your next raise, you traded points for a logo. Third, conflict. A studio juggling too many ventures on thin talent can starve any one company of the attention the equity was supposed to pay for.",
            "The headline that makes studios able to fund this much support is the model return, and it cuts both ways for you. Per the Global Startup Studio Network, the studio model produces roughly 50% IRR against an industry-standard roughly 19% for traditional VC, part of [why venture studios win in LATAM](/library/why-venture-studios-win-latam). A studio only earns that if its companies reach priced rounds and exits, which is why a real one puts operators in your unit-economics model in week two, not month nine. If it does not, the math is simple and unforgiving. Keep your cap table and raise alone."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR near 50% versus an industry-standard ~19% IRR for traditional VC, roughly 2.5x over realistic time horizons. The studio only earns it by removing your risk, not by holding your equity.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "latam-context",
          "heading": "Why the math shifts in LATAM",
          "level": 2,
          "paragraphs": [
            "The studio trade is more attractive in Brazil and the broader LATAM market than in the US, a contrast we draw out in [the Brazil versus US venture-builder benchmark](/library/venture-builders-brazil-vs-usa-benchmark), because the two things a studio supplies are exactly the two the region is short of. Capital depth is thin. LAVCA reports that venture capital invested across Latin America reached about USD 4.5 billion across 751 deals in 2024, a fraction of US deployment in the same year. In a market where a solo founder can spend nine months just finding a first check, a studio that hands you capital and a co-founder on day one removes more risk than the same studio would in a deep capital market.",
            "The opportunity is large for the same structural reason. Services account for roughly 70% of Brazilian GDP, a figure attributed to IBGE, and that services economy grew 3.1% in 2024 while staying barely digitized. Domain operators with 10+ years of Brazilian-market scar tissue are scarce, and rarely paired with a Silicon Valley playbook. AI infrastructure is now cheap enough to deploy without a Series A, so the binding constraint is no longer money for servers. It is operator depth and a first ticket, assembled on day one.",
            "That is the LATAM tilt in one line. The studio's contribution is worth more where the open market supplies less of it. The same 25% that looks expensive in a deep US market can be the cheapest path to a priced round in a region where capital and senior operators are both scarce."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante structures the founder deal",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. It launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. Capital per venture runs $500K-1.5M across pre-seed, and Avante retains co-founder economics rather than a passive minority. Operating partners stay engaged through the first revenue milestone, then move to board-level oversight.",
            "The efficiency comes from solving the company plumbing once and reusing it, which routes roughly $300K-500K of effective capital per venture into product and traction rather than overhead. The recurring pattern is the copilot to data to fund flywheel. Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital. It shows up by domain across the portfolio. Alphajuri in judicial assets. WIR in insurance pricing with AXA. BR Auction Intel in real-estate auctions. The studio thesis behind all of it is laid out at [/why-avante](/why-avante), and the operating discipline at [/principles](/principles).",
            "So bring it back to the test you started with. Subtract Avante from your plan. Would the company reach a priced round as fast, and as cheaply, alone. Where the answer is no, the founder split is the better deal by a wide margin. Where it is yes, you should keep the cap table. A studio worth its equity wants you to run that math, because it already knows how its companies answer it."
          ]
        }
      ]
    },
    "pt": {
      "title": "O Lado do Fundador no Deal de Venture Studio na América Latina",
      "description": "Um studio pega equity do fundador cedo. Quando essa troca compensa para um operador da América Latina, quando não, e as contas antes de assinar.",
      "sections": [
        {
          "paragraphs": [
            "Quase tudo que se escreve sobre venture studio defende o modelo para os LPs. Aqui é a visão oposta. Você é um operador forte no Brasil ou na América Latina, e um studio se oferece para co-fundar a sua empresa em troca de uma fatia real de equity no primeiro dia. A pergunta é se vale aceitar ou levantar sozinho e ficar com o cap table inteiro.",
            "A resposta é uma troca, não um veredito. Você abre mão de pontos cedo. Em troca, ganha um co-founder, infraestrutura compartilhada e capital de primeiro cheque que comprimem seis a nove meses de montagem da empresa. A troca só compensa quando o studio de fato tira risco e tempo da mesa. Quando não tira, o certo é recusar. Este texto roda a economia do fundador venture studio do seu lado, nomeia o modo de falha honesto e mostra por que a conta pende mais para o studio na América Latina do que nos Estados Unidos."
          ]
        },
        {
          "id": "the-trade",
          "heading": "A troca que o fundador realmente faz",
          "level": 2,
          "paragraphs": [
            "A pergunta sobre equity de fundador em venture studio não é se devo abrir mão de equity. É o que recebo em troca, e se eu teria chegado lá sozinho. Um studio não é um investidor assinando um cheque da arquibancada. É um co-founder com balanço, time e sistema, e ele precifica esse papel de acordo.",
            "Então a decisão real é uma permuta. Você troca uma fatia inicial grande de uma empresa que ainda não existe por uma chance maior de que ela exista e chegue a uma rodada precificada num relógio mais curto. Acerte esse enquadramento e o resto da análise vem junto. Erre, trate o studio como dinheiro caro, e você vai ou pagar demais por um studio fraco ou recusar um studio forte pelo motivo errado."
          ],
          "callout": {
            "kind": "tip",
            "text": "Faça um teste antes de qualquer coisa. Subtraia a contribuição do studio do seu plano. Se a empresa ficaria praticamente igual sem ele, fique com o cap table e levante sozinho."
          }
        },
        {
          "id": "what-you-give",
          "heading": "O que você abre mão, em pontos",
          "level": 2,
          "paragraphs": [
            "Comece pelo que se entrega, porque é muito e acumula. Studios pegam bem mais equity na fundação do que um fundo de seed pega por rodada. O The Startup VC coloca a fatia de studio em 30% a 60% de uma empresa nova na fundação, contra 10% a 20% por rodada de um VC de seed. O Alder VC fixa a faixa de trabalho em 15% a 50%, com muitos studios em 30% a 40%, enquanto um fundador solo que levanta com VCs começa em 80% a 100% antes de qualquer diluição.",
            "O cap table é onde isso fica concreto. O Alder VC mostra a conta. Um fundador que entra com um studio de 25% fica com cerca de 75% na constituição, perto de 60% após uma rodada de seed, e cerca de 48% após a Série A. Um fundador com um studio de 40% fica com 60%, depois 48%, depois cerca de 38% no mesmo caminho. A frase deles é a que vale sentar e digerir. A diferença de 10 pontos na Série A não é acadêmica. Ela muda como o investidor institucional lê o seu alinhamento de incentivo.",
            "Nada disso é motivo para recusar um studio. É motivo para exigir que o studio mereça a diferença, e o espelho da sua diluição é [como funciona a economia do operating partner do studio](/library/operating-partner-economics). Você não está pagando por dinheiro. Dinheiro é a parte barata. Você está pagando pelos meses e pelo risco que um studio de verdade tira da mesa, e a única pergunta que importa é se ele tira mesmo."
          ],
          "bullets": [
            "Studio na fundação. 15% a 50%, em geral 30% a 40%. O The Startup VC vê 30% a 60% em casos agressivos.",
            "VC de seed. 10% a 20% por rodada, sem papel operacional, sem o primeiro build.",
            "Fundador solo. 80% a 100% na constituição, e cada mês e cada real de montagem é você que banca."
          ]
        },
        {
          "id": "what-you-get",
          "heading": "O que você ganha, em meses e capital",
          "level": 2,
          "paragraphs": [
            "O que compensa a diluição é tempo que você não precisa recomprar depois. O relato mais claro do lado do fundador é da Merantix Capital. Num ensaio de maio de 2025 chamado Why on Earth Should a Founder Take a Venture Studio Deal, Adrian Locher expõe o modelo sem floreio. Cerca de EUR 1M por 15% preferencial mais 10% ordinário, perto de 25% por capital inicial e suporte operacional completo. Nas palavras dele. Escrevemos cheques menores que um mega-fundo, e nossos fundadores podem tomar um pouco mais de diluição no início.",
            "O retorno que ele defende é eficiência. Fundadores conseguem esticar EUR 1M de um jeito que outros precisam de EUR 3M a EUR 5M, porque o studio fornece parceiros corporativos de design, especialistas de domínio e um pipeline de talento que entrega centenas de candidatos qualificados em poucos dias. A afirmação de tração é específica o bastante para checar. Quatro das últimas cinco startups de studio da Merantix chegaram a EUR 500K de receita nos primeiros seis meses. O mecanismo é a infraestrutura compartilhada. Engenharia, design, recrutamento e go-to-market já existem, então você não reconstrói tudo do zero queimando o primeiro cheque.",
            "O dado no nível de portfólio aponta na mesma direção. A Global Startup Studio Network reporta que startups de studio chegam à Série A em cerca de 25,2 meses contra 56 meses das tradicionais, e que 72% das ventures de studio que chegam ao seed seguem para a Série A. Um modelo que mais do que corta pela metade o tempo até uma rodada precificada não está com sorte na seleção de deals. Está removendo os pontos de falha que matam startups comuns no primeiro ano. Esse relógio comprimido é o tempo que você recompra, e uma venture de studio nasce 6-9 meses à frente de um time independente com financiamento comparável."
          ]
        },
        {
          "id": "when-it-pays",
          "heading": "Quando a divisão compensa, e quando não",
          "level": 2,
          "paragraphs": [
            "A divisão só compensa quando o studio realmente tira risco e tempo. Um studio passivo que pega equity do fundador por uma marca e uma mesa é um deal pior do que levantar sozinho, e essa é a parte que quase todo texto de studio pula. Locher traça a linha ele mesmo. O modelo serve a operadores repetentes e a quem pensa no longo prazo, disposto a trocar equity cedo por vantagem depois. É o deal errado para fundadores que querem independência total ou que se incomodam em co-construir, para quem a diluição é simplesmente desnecessária.",
            "Antes de assinar, teste três coisas sob estresse. Primeiro, profundidade. Se o studio não consegue nomear os operadores que estarão no seu build e o que eles entregaram antes, a equity está comprando conselho, não horas. Segundo, capital. Se o primeiro cheque não comprime de fato a sua próxima captação, você trocou pontos por um logo. Terceiro, conflito. Um studio fazendo malabarismo com ventures demais e talento de menos pode deixar qualquer empresa sem a atenção que a equity deveria pagar.",
            "O número que torna os studios capazes de bancar tanto suporte é o retorno do modelo, e ele corta dos dois lados para você. Segundo a Global Startup Studio Network, o modelo de studio produz cerca de 50% de IRR contra um padrão de indústria de cerca de 19% para o VC tradicional, parte de [por que os venture studios vencem na América Latina](/library/why-venture-studios-win-latam). Um studio só ganha isso se as empresas dele chegam a rodadas precificadas e a exits, e por isso um studio de verdade coloca operadores no seu modelo de unit economics na segunda semana, não no nono mês. Se não coloca, a conta é simples e implacável. Fique com o seu cap table e levante sozinho."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio perto de 50% contra um padrão de indústria de ~19% de IRR para o VC tradicional, cerca de 2,5x em horizontes realistas. O studio só ganha isso removendo o seu risco, não segurando a sua equity.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "latam-context",
          "heading": "Por que a conta muda na América Latina",
          "level": 2,
          "paragraphs": [
            "A troca de studio é mais atraente no Brasil e na América Latina do que nos Estados Unidos, um contraste que detalhamos em [o benchmark de venture builders Brasil versus EUA](/library/venture-builders-brazil-vs-usa-benchmark), porque as duas coisas que um studio fornece são exatamente as duas que faltam na região. A profundidade de capital é rasa. A LAVCA reporta que o venture capital investido na América Latina chegou a cerca de USD 4,5 bilhões em 751 deals em 2024, uma fração do que foi alocado nos Estados Unidos no mesmo ano. Num mercado onde um fundador solo pode gastar nove meses só achando o primeiro cheque, um studio que entrega capital e um co-founder no primeiro dia tira mais risco do que o mesmo studio tiraria num mercado de capital profundo.",
            "A oportunidade é grande pelo mesmo motivo estrutural. Serviços respondem por cerca de 70% do PIB brasileiro, número atribuído ao IBGE, e essa economia de serviços cresceu 3,1% em 2024 seguindo pouco digitalizada. Operadores de domínio com 10+ anos de calo de mercado brasileiro são escassos, e raramente combinados com um playbook do Vale do Silício. A infraestrutura de IA já está barata o suficiente para implantar sem uma Série A, então a restrição que prende não é mais dinheiro para servidor. É profundidade de operador e um primeiro cheque, montados no primeiro dia.",
            "Esse é o pendor da América Latina em uma frase. A contribuição do studio vale mais onde o mercado aberto fornece menos dela. Os mesmos 25% que parecem caros num mercado americano profundo podem ser o caminho mais barato até uma rodada precificada numa região onde capital e operadores sênior são ambos escassos."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante estrutura o deal do fundador",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. Ela lança 3-4 ventures por ano por um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. O capital por venture fica entre $500K-1.5M no pre-seed, e a Avante mantém economia de co-founder em vez de uma minoria passiva. Os operating partners ficam engajados até o primeiro marco de receita, depois passam para supervisão de conselho.",
            "A eficiência vem de resolver a infraestrutura da empresa uma vez e reusar, o que direciona cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead. O padrão recorrente é o flywheel copilot, dado, capital. Construa um copilot de IA para gerar dado proprietário, depois use esse dado para levantar e alocar capital. Ele aparece por domínio no portfólio. Alphajuri em ativos judiciais. WIR em precificação de seguros com a AXA. BR Auction Intel em leilões de imóveis. A tese de studio por trás de tudo isso está em [/why-avante](/why-avante), e a disciplina operacional em [/principles](/principles).",
            "Então volte ao teste com que você começou. Subtraia a Avante do seu plano. A empresa chegaria a uma rodada precificada com a mesma velocidade, e tão barato, sozinha. Onde a resposta é não, a divisão com o fundador é o melhor deal por uma larga margem. Onde é sim, fique com o cap table. Um studio que vale a equity quer que você faça essa conta, porque já sabe como as empresas dele respondem."
          ]
        }
      ]
    },
    "es": {
      "title": "El Lado del Fundador en el Deal de Venture Studio en LATAM",
      "description": "Un studio toma equity del fundador temprano. Cuando esa decisión conviene a un operador de LATAM, cuando no, y los números antes de firmar.",
      "sections": [
        {
          "paragraphs": [
            "Casi todo lo que se escribe sobre venture studio defiende el modelo ante los LPs. Esta es la vista opuesta. Usted es un operador fuerte en Brasil o en LATAM, y un studio se ofrece a co-fundar su empresa a cambio de una porción real de equity desde el primer día. La pregunta es si conviene aceptar o levantar solo y quedarse con todo el cap table.",
            "La respuesta es un intercambio, no un veredicto. Usted cede puntos temprano. A cambio gana un co-founder, infraestructura compartida y capital de primer cheque que comprimen seis a nueve meses de armado de la empresa. El intercambio solo conviene cuando el studio de verdad quita riesgo y tiempo. Cuando no lo quita, lo correcto es rechazarlo. Este texto corre la economía del fundador venture studio desde su lado, nombra el modo de falla honesto y muestra por qué la cuenta se inclina más hacia el studio en LATAM que en Estados Unidos."
          ]
        },
        {
          "id": "the-trade",
          "heading": "El intercambio que el fundador realmente hace",
          "level": 2,
          "paragraphs": [
            "La pregunta sobre equity de fundador en venture studio no es si debo ceder equity. Es qué recibo a cambio, y si habría llegado ahí solo. Un studio no es un inversionista que firma un cheque desde la tribuna. Es un co-founder con balance, equipo y sistema, y cobra ese rol en consecuencia.",
            "Entonces la decisión real es una permuta. Usted cambia una porción inicial grande de una empresa que todavía no existe por una probabilidad mayor de que exista y llegue a una ronda con precio en un reloj más corto. Acierte ese encuadre y el resto del análisis se acomoda. Equivóquese, trate al studio como dinero caro, y va a pagar de más por un studio débil o a rechazar uno fuerte por la razón equivocada."
          ],
          "callout": {
            "kind": "tip",
            "text": "Haga una prueba antes que nada. Reste la contribución del studio de su plan. Si la empresa se vería casi igual sin él, quédese con el cap table y levante solo."
          }
        },
        {
          "id": "what-you-give",
          "heading": "A qué renuncias, en puntos",
          "level": 2,
          "paragraphs": [
            "Empiece por lo que se entrega, porque es mucho y se acumula. Los studios toman bastante más equity en la fundación que un fondo de seed por ronda. The Startup VC ubica la porción del studio en 30% a 60% de una empresa nueva en la fundación, contra 10% a 20% por ronda de un VC de seed. Alder VC fija el rango de trabajo en 15% a 50%, con muchos studios en 30% a 40%, mientras un fundador solo que levanta con VCs arranca en 80% a 100% antes de cualquier dilución.",
            "El cap table es donde esto se vuelve concreto. Alder VC muestra la cuenta. Un fundador que entra con un studio de 25% se queda con cerca de 75% en la constitución, cerca de 60% tras una ronda de seed, y cerca de 48% tras la Serie A. Un fundador con un studio de 40% se queda con 60%, luego 48%, luego cerca de 38% en el mismo camino. Su frase es la que vale sentarse a digerir. La diferencia de 10 puntos en la Serie A no es académica. Cambia cómo el inversionista institucional lee su alineación de incentivo.",
            "Nada de esto es razón para rechazar un studio. Es razón para exigir que el studio se gane la diferencia, y el espejo de su dilución es [cómo funciona la economía del operating partner del studio](/library/operating-partner-economics). Usted no está pagando por dinero. El dinero es la parte barata. Está pagando por los meses y el riesgo que un studio de verdad quita de la mesa, y la única pregunta que importa es si lo quita."
          ],
          "bullets": [
            "Studio en la fundación. 15% a 50%, por lo general 30% a 40%. The Startup VC ve 30% a 60% en casos agresivos.",
            "VC de seed. 10% a 20% por ronda, sin rol operativo, sin el primer build.",
            "Fundador solo. 80% a 100% en la constitución, y cada mes y cada dólar de armado lo financia usted."
          ]
        },
        {
          "id": "what-you-get",
          "heading": "Qué recibes, en meses y capital",
          "level": 2,
          "paragraphs": [
            "Lo que compensa la dilución es tiempo que no tiene que recomprar después. El relato más claro del lado del fundador es de Merantix Capital. En un ensayo de mayo de 2025 titulado Why on Earth Should a Founder Take a Venture Studio Deal, Adrian Locher expone el modelo sin adornos. Cerca de EUR 1M por 15% preferente más 10% ordinario, cerca de 25% por capital inicial y soporte operativo completo. En sus palabras. Escribimos cheques más chicos que un mega-fondo, y nuestros fundadores pueden tomar algo más de dilución al inicio.",
            "El retorno que defiende es eficiencia. Los fundadores pueden estirar EUR 1M de un modo que otros necesitan EUR 3M a EUR 5M, porque el studio aporta socios corporativos de diseño, expertos de dominio y un pipeline de talento que entrega cientos de candidatos calificados en pocos días. Su afirmación de tracción es bastante específica para verificar. Cuatro de las últimas cinco startups de studio de Merantix llegaron a EUR 500K de ingresos en los primeros seis meses. El mecanismo es la infraestructura compartida. Ingeniería, diseño, reclutamiento y go-to-market ya existen, así que usted no reconstruye todo desde cero quemando el primer cheque.",
            "El dato a nivel de portafolio apunta en la misma dirección. La Global Startup Studio Network reporta que las startups de studio llegan a la Serie A en cerca de 25,2 meses contra 56 meses de las tradicionales, y que 72% de las ventures de studio que llegan al seed siguen a la Serie A. Un modelo que más que parte por la mitad el tiempo hasta una ronda con precio no tiene suerte en la selección de deals. Está removiendo los puntos de falla que matan startups comunes en el primer año. Ese reloj comprimido es el tiempo que usted recompra, y una venture de studio nace 6-9 meses por delante de un equipo independiente con financiamiento comparable."
          ]
        },
        {
          "id": "when-it-pays",
          "heading": "Cuando el reparto conviene, y cuando no",
          "level": 2,
          "paragraphs": [
            "El reparto solo conviene cuando el studio de verdad quita riesgo y tiempo. Un studio pasivo que toma equity del fundador por una marca y un escritorio es un deal peor que levantar solo, y esa es la parte que casi todo texto de studio se salta. Locher traza la línea él mismo. El modelo sirve a operadores repetidos y a quien piensa en el largo plazo, dispuesto a cambiar equity temprano por ventaja después. Es el deal equivocado para fundadores que quieren independencia total o a quienes les incomoda co-construir, para quienes la dilución es sencillamente innecesaria.",
            "Antes de firmar, ponga tres cosas bajo estrés. Primero, profundidad. Si el studio no puede nombrar a los operadores que estarán en su build y qué entregaron antes, la equity está comprando consejo, no horas. Segundo, capital. Si el primer cheque no comprime de verdad su próxima ronda, cambió puntos por un logo. Tercero, conflicto. Un studio haciendo malabares con demasiadas ventures y poco talento puede dejar a cualquier empresa sin la atención que la equity debía pagar.",
            "El número que vuelve a los studios capaces de financiar tanto soporte es el retorno del modelo, y corta para ambos lados para usted. Según la Global Startup Studio Network, el modelo de studio produce cerca de 50% de IRR contra un estándar de industria de cerca de 19% para el VC tradicional, parte de [por qué los venture studios ganan en LATAM](/library/why-venture-studios-win-latam). Un studio solo gana eso si sus empresas llegan a rondas con precio y a exits, y por eso uno de verdad pone operadores en su modelo de unit economics en la segunda semana, no en el noveno mes. Si no lo hace, la cuenta es simple e implacable. Quédese con su cap table y levante solo."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio cerca de 50% contra un estándar de industria de ~19% de IRR para el VC tradicional, cerca de 2,5x en horizontes realistas. El studio solo lo gana removiendo su riesgo, no reteniendo su equity.",
            "attribution": "Global Startup Studio Network"
          }
        },
        {
          "id": "latam-context",
          "heading": "Por qué la cuenta cambia en LATAM",
          "level": 2,
          "paragraphs": [
            "El intercambio de studio es más atractivo en Brasil y en LATAM que en Estados Unidos, un contraste que desarrollamos en [el benchmark de venture builders Brasil versus EE. UU.](/library/venture-builders-brazil-vs-usa-benchmark), porque las dos cosas que aporta un studio son exactamente las dos que escasean en la región. La profundidad de capital es delgada. LAVCA reporta que el venture capital invertido en América Latina llegó a cerca de USD 4,5 mil millones en 751 deals en 2024, una fracción de lo desplegado en Estados Unidos el mismo año. En un mercado donde un fundador solo puede gastar nueve meses solo en encontrar el primer cheque, un studio que le entrega capital y un co-founder el primer día quita más riesgo del que quitaría el mismo studio en un mercado de capital profundo.",
            "La oportunidad es grande por la misma razón estructural. Los servicios representan cerca de 70% del PIB brasileño, cifra atribuida al IBGE, y esa economía de servicios creció 3,1% en 2024 mientras seguía poco digitalizada. Operadores de dominio con 10+ años de cicatrices del mercado brasileño son escasos, y rara vez combinados con un playbook de Silicon Valley. La infraestructura de IA ya está barata para desplegar sin una Serie A, así que la restricción que ata ya no es dinero para servidores. Es profundidad de operador y un primer cheque, armados el primer día.",
            "Ese es el sesgo de LATAM en una frase. La contribución del studio vale más donde el mercado abierto aporta menos de ella. El mismo 25% que parece caro en un mercado estadounidense profundo puede ser el camino más barato a una ronda con precio en una región donde el capital y los operadores senior escasean a la vez."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante estructura el deal del fundador",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. Lanza 3-4 ventures por año por un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. El capital por venture va entre $500K-1.5M en el pre-seed, y Avante retiene economía de co-founder en vez de una minoría pasiva. Los operating partners siguen comprometidos hasta el primer hito de ingresos, y luego pasan a supervisión de directorio.",
            "La eficiencia viene de resolver la infraestructura de la empresa una vez y reusarla, lo que dirige cerca de $300K-500K de capital efectivo por venture a producto y tracción en vez de overhead. El patrón recurrente es el flywheel copilot, dato, capital. Construya un copilot de IA para generar dato propietario, luego use ese dato para levantar y desplegar capital. Aparece por dominio en el portafolio. Alphajuri en activos judiciales. WIR en precios de seguros con AXA. BR Auction Intel en subastas de inmuebles. La tesis de studio detrás de todo eso está en [/why-avante](/why-avante), y la disciplina operativa en [/principles](/principles).",
            "Entonces vuelva a la prueba con que empezó. Reste a Avante de su plan. La empresa llegaría a una ronda con precio con la misma velocidad, y tan barato, sola. Donde la respuesta es no, el reparto con el fundador es el mejor deal por amplio margen. Donde es sí, quédese con el cap table. Un studio que vale su equity quiere que usted haga esa cuenta, porque ya sabe cómo responden sus empresas."
          ]
        }
      ]
    }
  },
  {
    "slug": "vertical-ai-studio-portfolio-construction",
    "category": "research",
    "type": "Research Report",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-15",
    "ogImage": "/og/vertical-ai-studio-portfolio-construction.png",
    "isPublished": true,
    "en": {
      "title": "How a Venture Studio Picks Which Verticals to Build",
      "description": "With only 3-4 builds a year, vertical selection is the studio's highest-leverage call. The four-part test a slot must pass, and when to walk.",
      "sections": [
        {
          "paragraphs": [
            "A venture studio that launches 3-4 ventures a year spends a quarter of its annual portfolio every time it picks a vertical. Get the vertical wrong and that is not a rounding error. It is three months of build capacity and $500K-1.5M aimed at a market the studio cannot win. So portfolio construction reduces to one decision made three or four times a year. Which vertical earns a build slot, and which large market gets passed over even when it looks tempting. This is selection at the studio level, a different question from defending any one venture's moat.",
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and the question of how studios pick verticals is one we answer in front of every build. The short version is a four-part test. A vertical earns a slot only when it combines a large under-digitized services market, an available domain operator with deep scar tissue, a workflow where AI changes the unit economics, and a path to proprietary data that compounds. Miss one and the slot is better spent elsewhere.",
            "The backdrop is the vertical AI thesis. Vertical AI that owns an industry workflow is proving more defensible and better valued than horizontal copilots, and Brazil happens to supply an unusual number of qualifying verticals. You can read the longer thesis at [/why-avante](/why-avante). What follows is the test itself, and the discipline of using it to say no."
          ]
        },
        {
          "id": "the-constraint",
          "heading": "Why selection is the whole game",
          "level": 2,
          "paragraphs": [
            "A venture studio is supply-constrained on purpose, and that constraint is the reason selection decides everything. With three or four slots a year, the studio cannot let portfolio math absorb its misses the way a fund writing 30 checks can. Every slot is a real bet that has to clear the bar before it is spent.",
            "The model earns its return premium precisely because it concentrates. Per the Global Startup Studio Network, studio ventures posted an average internal rate of return that rounds to roughly 50% against roughly 19% for traditional venture-backed startups, which Avante cites as studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x over realistic time horizons. That is the studio-model benchmark, never any single studio's realized return. The honest caveat is that this figure runs on a self-reported sample of surviving studios, which is why [measuring studio performance honestly](/library/measuring-studio-performance) matters, so read it as the ceiling the model can reach, not a number any one studio is owed. The traditional-VC figure traces to institutional benchmarks like the [Cambridge Associates US Venture Capital index](https://www.cambridgeassociates.com/private-investment-benchmarks/), built from quarterly fund financials across four decades.",
            "That premium only holds when the operating partner can go deep. A studio venture reaches Series A in 25.2 months against 56 for a traditional startup, and 72% of studio ventures reach Series A versus 42% of traditional ones, per [GSSN data via Bundl](https://www.bundl.com/articles/why-venture-studio-startups-have-higher-long-term-success-rates). Depth does not scale to dozens of bets at once. So the studio buys its edge by saying no far more often than it says yes. Selection is not the step before the work. It is the work."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR of ~50% versus an industry-standard ~19% for traditional VC, roughly 2.5x the IRR over realistic time horizons.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "the-test",
          "heading": "The four-part test for a vertical",
          "level": 2,
          "paragraphs": [
            "A vertical earns a build slot when four conditions hold at once. This is a gate, not a scorecard. A vertical that is strong on three dimensions and closed on the fourth still fails, because the missing condition is usually the one that decides the outcome."
          ],
          "bullets": [
            "A large, under-digitized services market. The vertical has to be big enough to matter and far enough behind on software that the work still runs on phone calls, spreadsheets, and PDFs. A huge market already well served by software is a knife fight, not an opening.",
            "An available domain operator with deep scar tissue. The studio needs a co-founder with 10+ years inside the industry, carrying the regulatory, relationship, and process knowledge no deck can teach. If that operator is not findable and recruitable, the vertical fails no matter how good the market looks.",
            "A workflow where AI changes the unit economics. AI has to convert a labor-heavy task into software, not bolt on a feature. Per a16z, that shift can expand revenue per customer by 2-10x, on top of the 2-5x that fintech embedding already delivered.",
            "A path to proprietary data that compounds. The workflow has to throw off data the studio can accumulate and that makes the product better with use. Without a compounding loop, a well-funded incumbent or a horizontal model eventually catches up."
          ]
        },
        {
          "id": "vertical-thesis",
          "heading": "Why vertical AI clears the bar",
          "level": 2,
          "paragraphs": [
            "The test points at vertical AI rather than horizontal copilots because vertical AI is proving both more defensible and better valued. The evidence is no longer theoretical. Per [Bessemer Venture Partners in September 2024](https://www.bvp.com/atlas/part-i-the-future-of-ai-is-vertical), LLM-native vertical companies were reaching 80% of traditional SaaS average contract value, posting roughly 400% year-over-year growth, and holding roughly 65% gross margins, with vertical AI market capitalization predicted to be at least 10x the size of legacy vertical SaaS.",
            "What separates a durable company from a thin wrapper is ownership of the workflow plus a data loop. Bessemer ties vertical AI moats to proprietary data, depth of product integration, and economic value delivered, not to model access, which everyone shares. a16z frames the same point through the system of record. The company that owns the workflow captures the labor budget, not just the software budget, and [U.S. software spending of $313B is only about 3% of the $10.5T spent on labor](https://a16z.com/vertical-saas-now-with-ai-inside/). Toast reached $1.5B ARR with over 80% of revenue from embedded financial services, which is what owning a vertical workflow looks like at scale.",
            "The data loop is the part founders overstate most, so the test stays strict about it, and we draw the line precisely in [how data network effects actually work in vertical AI](/library/data-network-effects-vertical-ai). Per the [NfX Network Effects Manual](https://www.nfx.com/post/network-effects-manual), network effects account for roughly 70% of the value created by tech companies since 1994, yet data advantages are weaker than commonly believed. Data is a real moat only when usage continuously updates a dataset central to the product, the way Waze improves with every trip, not marginal the way a recommendation feed is. For the studio, that distinction is the fourth condition made concrete. A vertical passes only when its workflow generates data that is both proprietary and load-bearing."
          ]
        },
        {
          "id": "brazil-supply",
          "heading": "Why Brazil supplies so many candidates",
          "level": 2,
          "paragraphs": [
            "Brazil produces an unusual number of verticals that clear the first condition, because services account for roughly 70% of Brazilian GDP with low software penetration across those sectors. That figure comes from [IBGE data reported in July 2024](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), with the services share sitting 12.7% above its pre-pandemic level. A large, growing base of economic activity still run on manual workflows is a deep bench of exactly what the test screens for first.",
            "The capital backdrop tells the studio these markets are open rather than crowded. LATAM startups raised $4.2B in 2024, up 27% from the prior year, with Brazil capturing close to half of all regional funding, per [Crunchbase](https://news.crunchbase.com/venture/latin-america-startup-funding-eoy-2024/). Funding is recovering from a weak 2023 and remains well below the 2021 peak, which means most verticals do not yet have a well-capitalized incumbent owning the data loop. That is the window. It does not stay open forever.",
            "The structural edge that lets a studio act is operator depth, and it is the core of [why venture studios win in LATAM](/library/why-venture-studios-win-latam). Domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital assembled on day one, is what a generalist fund cannot replicate from a board seat. AI infrastructure is now cheap enough to deploy without a Series A, which is why a studio can run 3-4 vertical bets a year in Brazil instead of one capital-heavy wager. The pattern repeats. Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital."
          ]
        },
        {
          "id": "when-to-pass",
          "heading": "When to pass on a big market",
          "level": 2,
          "paragraphs": [
            "The discipline of the test shows up in the passes, not the builds. A studio can pattern-match itself into a crowded vertical where a well-funded incumbent already owns the data loop. The market is large, the workflow is clearly broken, an operator is even available, and three of the four conditions light up green. The fourth is closed. Someone got there first, their proprietary dataset is already compounding, and a new entrant would be feeding a loop it cannot win.",
            "That is a pass, and it should be an easy one. Per the [NfX Network Effects Manual](https://www.nfx.com/post/network-effects-manual), the company whose dataset is central and continuously updated by usage holds an advantage a later entrant cannot simply outspend. Entering a vertical where the data path is already closed spends a scarce slot on a second-place finish.",
            "The size of the market does not rescue the decision. A studio with only 3-4 slots a year cannot afford one that produces a structurally capped outcome. The honest failure mode of studio portfolio construction is confusing a big market for an open one. Disciplined selection means walking away from a large, broken, tempting market precisely because the condition that compounds is the one that is gone."
          ]
        },
        {
          "id": "how-avante",
          "heading": "How Avante runs the selection",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America, and the four-part test is how it decides where to build. Avante launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. The Research stage is where the test meets candidate verticals. The Partner stage answers the second condition, because no build starts without a domain operator carrying real scar tissue. Capital deployed is $500K-1.5M per venture across pre-seed, and Avante retains co-founder economics.",
            "The operating discipline backs the selection. Operating partners stay engaged through the first revenue milestone, then move to board-level oversight. Solving company plumbing once routes roughly $300K-500K of effective capital per venture into product and traction rather than overhead, and a studio venture launches 6-9 months ahead of a comparably funded standalone team. That is the payoff for spending the slot well.",
            "The portfolio reads as the test applied three times, by domain. Alphajuri builds in judicial assets, the precatorios and claims market, where the workflow is document-heavy and the data compounds with every case. WIR, with AXA, builds in insurance pricing and risk scoring, where an async API owns a workflow and the loss data is load-bearing. BR Auction Intel builds in real estate auctions, scraping, enriching, and scoring properties where the dataset improves with coverage. Each cleared the same four conditions before it earned a slot. The operating model lives at [/principles](/principles). The work of a studio is not building. Most of the work is choosing what not to build."
          ]
        }
      ]
    },
    "pt": {
      "title": "Como um Venture Studio Escolhe em Quais Verticais Construir",
      "description": "Com 3 a 4 builds por ano, escolher a vertical é a decisão de maior alavancagem do studio. O teste de quatro partes antes de gastar um slot.",
      "sections": [
        {
          "paragraphs": [
            "Um venture studio que lança 3 a 4 ventures por ano gasta um quarto do portfólio anual cada vez que escolhe uma vertical. Errar a vertical não é um erro pequeno. São três meses de capacidade de build e $500K-1.5M apontados para um mercado onde o studio não consegue vencer. Por isso a construção de portfólio se resume a uma decisão tomada três ou quatro vezes por ano. Qual vertical merece um slot de build, e qual mercado grande fica de fora mesmo quando parece tentador. Esta é a seleção no nível do studio, uma pergunta diferente de defender o moat de uma única empresa.",
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e a pergunta de como os studios escolhem verticais é uma que respondemos antes de cada build. A versão curta é um teste de quatro partes. Uma vertical merece um slot apenas quando combina um grande mercado de serviços pouco digitalizado, um operador de domínio disponível com profunda bagagem de cicatrizes, um workflow onde a IA muda a economia unitária, e um caminho para dados proprietários que compõem com o tempo. Falhe em um e o slot rende mais em outro lugar.",
            "O pano de fundo é a tese de IA vertical. A IA vertical que domina um workflow de um setor está se provando mais defensável e melhor avaliada do que os copilots horizontais, e o Brasil por acaso oferece um número incomum de verticais qualificadas. A tese completa está em [/why-avante](/why-avante). O que vem a seguir é o teste em si, e a disciplina de usá-lo para dizer não."
          ]
        },
        {
          "id": "the-constraint",
          "heading": "Por que a seleção é o jogo inteiro",
          "level": 2,
          "paragraphs": [
            "Um venture studio é restrito em oferta de propósito, e essa restrição é a razão pela qual a seleção decide tudo. Com três ou quatro slots por ano, o studio não pode deixar a matemática de portfólio absorver seus erros do jeito que um fundo que assina 30 cheques pode. Cada slot é uma aposta real que precisa passar no teste antes de ser gasto.",
            "O modelo conquista seu prêmio de retorno justamente porque concentra. Segundo a Global Startup Studio Network, ventures de studio registraram uma taxa interna de retorno média que arredonda para perto de 50% contra cerca de 19% para startups financiadas por venture capital tradicional, o que a Avante cita como IRR de studio de ~50% versus ~19% padrão da indústria para VC tradicional, cerca de 2,5x em horizontes de tempo realistas. Esse é o benchmark do modelo de studio, nunca o retorno realizado de um studio específico. A ressalva honesta é que esse número roda sobre uma amostra autodeclarada de studios sobreviventes, e é por isso que [medir o desempenho de um studio com honestidade](/library/measuring-studio-performance) importa, então leia como o teto que o modelo alcança, não como um valor devido a um studio qualquer. O número de VC tradicional vem de benchmarks institucionais como o [índice de Venture Capital dos EUA da Cambridge Associates](https://www.cambridgeassociates.com/private-investment-benchmarks/), construído a partir de demonstrações financeiras trimestrais ao longo de quatro décadas.",
            "Esse prêmio só se sustenta quando o operating partner consegue ir fundo. Uma venture de studio chega à Série A em 25,2 meses contra 56 de uma startup tradicional, e 72% das ventures de studio alcançam a Série A versus 42% das tradicionais, segundo [dados da GSSN via Bundl](https://www.bundl.com/articles/why-venture-studio-startups-have-higher-long-term-success-rates). Profundidade não escala para dezenas de apostas ao mesmo tempo. Então o studio compra sua vantagem dizendo não com muito mais frequência do que diz sim. A seleção não é a etapa antes do trabalho. Ela é o trabalho."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio de ~50% versus ~19% padrão da indústria para VC tradicional, cerca de 2,5x o IRR em horizontes de tempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "the-test",
          "heading": "O teste de quatro partes para uma vertical",
          "level": 2,
          "paragraphs": [
            "Uma vertical merece um slot de build quando quatro condições valem ao mesmo tempo. Isto é um portão, não um placar. Uma vertical forte em três dimensões e fechada na quarta ainda falha, porque a condição que falta costuma ser a que decide o resultado."
          ],
          "bullets": [
            "Um grande mercado de serviços pouco digitalizado. A vertical precisa ser grande o bastante para importar e atrasada o bastante em software para que o trabalho ainda rode em ligações, planilhas e PDFs. Um mercado enorme já bem servido por software é uma briga de faca, não uma abertura.",
            "Um operador de domínio disponível com profunda bagagem de cicatrizes. O studio precisa de um co-founder com mais de 10 anos dentro do setor, carregando o conhecimento regulatório, de relacionamento e de processo que nenhum deck ensina. Se esse operador não puder ser encontrado e recrutado, a vertical falha por melhor que o mercado pareça.",
            "Um workflow onde a IA muda a economia unitária. A IA tem que converter uma tarefa intensiva em mão de obra em software, não acrescentar um recurso. Segundo a a16z, essa virada pode expandir a receita por cliente em 2-10x, além dos 2-5x que a integração de fintech já entregou.",
            "Um caminho para dados proprietários que compõem. O workflow tem que gerar dados que o studio possa acumular e que melhorem o produto com o uso. Sem um ciclo que se compõe, um incumbente bem financiado ou um modelo horizontal acaba alcançando."
          ]
        },
        {
          "id": "vertical-thesis",
          "heading": "Por que a IA vertical passa no teste",
          "level": 2,
          "paragraphs": [
            "O teste aponta para a IA vertical e não para os copilots horizontais porque a IA vertical está se provando mais defensável e melhor avaliada. A evidência já não é teórica. Segundo a [Bessemer Venture Partners em setembro de 2024](https://www.bvp.com/atlas/part-i-the-future-of-ai-is-vertical), empresas verticais LLM-native estavam alcançando 80% do valor médio de contrato do SaaS tradicional, crescendo cerca de 400% ano a ano, e mantendo margens brutas de cerca de 65%, com a capitalização de mercado da IA vertical prevista para ser ao menos 10x o tamanho do SaaS vertical legado.",
            "O que separa uma empresa durável de um wrapper raso é a posse do workflow somada a um ciclo de dados. A Bessemer liga os moats de IA vertical a dados proprietários, profundidade de integração do produto e valor econômico entregue, não ao acesso ao modelo, que todos compartilham. A a16z enquadra o mesmo ponto pelo sistema de registro. A empresa que domina o workflow captura o orçamento de mão de obra, não só o de software, e os [$313B gastos em software nos EUA são apenas cerca de 3% dos $10,5T gastos em mão de obra](https://a16z.com/vertical-saas-now-with-ai-inside/). A Toast chegou a $1,5B de ARR com mais de 80% da receita vindo de serviços financeiros embarcados, que é o que dominar um workflow vertical parece em escala.",
            "O ciclo de dados é a parte que os fundadores mais exageram, então o teste é rigoroso nisso, e traçamos a linha com precisão em [como os efeitos de rede de dados de fato funcionam na IA vertical](/library/data-network-effects-vertical-ai). Segundo o [Network Effects Manual da NfX](https://www.nfx.com/post/network-effects-manual), os efeitos de rede respondem por cerca de 70% do valor criado por empresas de tecnologia desde 1994, mas as vantagens de dados são mais fracas do que se imagina. Dado só é moat de verdade quando o uso atualiza continuamente um conjunto de dados central para o produto, do jeito que o Waze melhora a cada viagem, e não marginal como um feed de recomendação. Para o studio, essa distinção é a quarta condição tornada concreta. Uma vertical passa apenas quando seu workflow gera dados ao mesmo tempo proprietários e estruturais."
          ]
        },
        {
          "id": "brazil-supply",
          "heading": "Por que o Brasil oferece tantos candidatos",
          "level": 2,
          "paragraphs": [
            "O Brasil produz um número incomum de verticais que passam na primeira condição, porque os serviços representam cerca de 70% do PIB brasileiro com baixa penetração de software nesses setores. Esse dado vem de [números do IBGE divulgados em julho de 2024](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), com a fatia de serviços 12,7% acima do nível pré-pandemia. Uma base grande e crescente de atividade econômica ainda rodando em workflows manuais é um banco profundo de exatamente o que o teste procura primeiro.",
            "O pano de fundo de capital diz ao studio que esses mercados estão abertos, não lotados. Startups da América Latina captaram $4,2B em 2024, alta de 27% sobre o ano anterior, com o Brasil ficando com quase metade de todo o funding da região, segundo o [Crunchbase](https://news.crunchbase.com/venture/latin-america-startup-funding-eoy-2024/). O funding está se recuperando de um 2023 fraco e segue bem abaixo do pico de 2021, o que significa que a maioria das verticais ainda não tem um incumbente bem capitalizado dominando o ciclo de dados. Essa é a janela. Ela não fica aberta para sempre.",
            "A vantagem estrutural que permite o studio agir é a profundidade do operador, e ela é o núcleo de [por que os venture studios vencem na América Latina](/library/why-venture-studios-win-latam). Operadores de domínio com mais de 10 anos de cicatrizes do mercado brasileiro, somados a um playbook do Vale do Silício e capital de primeiro cheque montados no dia um, é o que um fundo generalista não consegue replicar de uma cadeira de conselho. A infraestrutura de IA hoje é barata o bastante para implantar sem uma Série A, e é por isso que um studio consegue rodar 3-4 apostas verticais por ano no Brasil em vez de uma única aposta pesada em capital. O padrão se repete. Construa um copilot de IA para gerar dados proprietários, depois use esses dados para captar e aplicar capital."
          ]
        },
        {
          "id": "when-to-pass",
          "heading": "Quando recusar um mercado grande",
          "level": 2,
          "paragraphs": [
            "A disciplina do teste aparece nas recusas, não nos builds. Um studio pode se viciar em padrão e entrar numa vertical lotada onde um incumbente bem financiado já domina o ciclo de dados. O mercado é grande, o workflow está claramente quebrado, há até um operador disponível, e três das quatro condições acendem verde. A quarta está fechada. Alguém chegou primeiro, o conjunto de dados proprietário dele já está se compondo, e um novo entrante estaria alimentando um ciclo que não tem como vencer.",
            "Isso é uma recusa, e deveria ser fácil. Segundo o [Network Effects Manual da NfX](https://www.nfx.com/post/network-effects-manual), a empresa cujo conjunto de dados é central e atualizado continuamente pelo uso tem uma vantagem que um entrante posterior não supera só gastando mais. Entrar numa vertical onde o caminho dos dados já está fechado gasta um slot escasso num segundo lugar.",
            "O tamanho do mercado não salva a decisão. Um studio com apenas 3-4 slots por ano não pode bancar um que produz um resultado estruturalmente limitado. O modo de falha honesto da construção de portfólio de um studio é confundir um mercado grande com um mercado aberto. Seleção disciplinada significa abrir mão de um mercado grande, quebrado e tentador justamente porque a condição que se compõe é a que se foi."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante conduz a seleção",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina, e o teste de quatro partes é como ela decide onde construir. A Avante lança 3-4 ventures por ano através de um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. O estágio Research é onde o teste encontra as verticais candidatas. O estágio Partner responde a segunda condição, porque nenhum build começa sem um operador de domínio carregando cicatrizes reais. O capital aplicado é $500K-1.5M por venture no pré-seed, e a Avante retém economia de co-founder.",
            "A disciplina operacional sustenta a seleção. Os operating partners ficam engajados até o primeiro marco de receita, depois passam à supervisão no nível do conselho. Resolver o encanamento da empresa uma vez direciona cerca de $300K-500K de capital efetivo por venture para produto e tração em vez de overhead, e uma venture de studio é lançada 6-9 meses à frente de um time autônomo com financiamento comparável. Esse é o retorno de gastar bem o slot.",
            "O portfólio se lê como o teste aplicado três vezes, por domínio. A Alphajuri constrói em ativos judiciais, o mercado de precatórios e claims, onde o workflow é intensivo em documentos e os dados se compõem a cada caso. A WIR, com a AXA, constrói em precificação de seguros e risk scoring, onde uma API assíncrona domina um workflow e os dados de sinistro são estruturais. A BR Auction Intel constrói em leilões imobiliários, fazendo scrape, enriquecimento e scoring de imóveis onde o conjunto de dados melhora com a cobertura. Cada uma passou pelas mesmas quatro condições antes de merecer um slot. O modelo operacional está em [/principles](/principles). O trabalho de um studio não é construir. A maior parte do trabalho é escolher o que não construir."
          ]
        }
      ]
    },
    "es": {
      "title": "Cómo un Venture Studio Elige en Qué Verticales Construir",
      "description": "Con 3 a 4 builds al año, elegir la vertical es la decisión de mayor apalancamiento del studio. El test de cuatro partes antes de gastar un cupo.",
      "sections": [
        {
          "paragraphs": [
            "Un venture studio que lanza 3 a 4 ventures al año gasta un cuarto del portafolio anual cada vez que elige una vertical. Equivocar la vertical no es un error menor. Son tres meses de capacidad de build y $500K-1.5M apuntados a un mercado donde el studio no puede ganar. Por eso la construcción de portafolio se reduce a una decisión tomada tres o cuatro veces al año. Qué vertical merece un cupo de build, y qué mercado grande se deja pasar aunque parezca tentador. Esta es la selección a nivel del studio, una pregunta distinta de defender el moat de una sola empresa.",
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y la pregunta de cómo los studios eligen verticales es una que respondemos antes de cada build. La versión corta es un test de cuatro partes. Una vertical merece un cupo solo cuando combina un gran mercado de servicios poco digitalizado, un operador de dominio disponible con profunda cicatriz de experiencia, un workflow donde la IA cambia la economía unitaria, y un camino hacia datos propietarios que se acumulan con el tiempo. Falle uno y el cupo rinde más en otra parte.",
            "El telón de fondo es la tesis de IA vertical. La IA vertical que domina el workflow de una industria se está probando más defendible y mejor valorada que los copilots horizontales, y Brasil por casualidad ofrece un número inusual de verticales que califican. La tesis completa está en [/why-avante](/why-avante). Lo que sigue es el test en sí, y la disciplina de usarlo para decir que no."
          ]
        },
        {
          "id": "the-constraint",
          "heading": "Por qué la selección es todo el juego",
          "level": 2,
          "paragraphs": [
            "Un venture studio está restringido en oferta a propósito, y esa restricción es la razón por la que la selección lo decide todo. Con tres o cuatro cupos al año, el studio no puede dejar que la matemática de portafolio absorba sus errores como lo hace un fondo que firma 30 cheques. Cada cupo es una apuesta real que debe pasar el test antes de gastarse.",
            "El modelo gana su prima de retorno justamente porque concentra. Según la Global Startup Studio Network, las ventures de studio registraron una tasa interna de retorno promedio que redondea a cerca del 50% frente a cerca del 19% de las startups financiadas por venture capital tradicional, lo que Avante cita como IRR de studio de ~50% versus ~19% estándar de la industria para VC tradicional, cerca de 2,5x en horizontes de tiempo realistas. Ese es el benchmark del modelo de studio, nunca el retorno realizado de un studio en particular. La salvedad honesta es que esa cifra corre sobre una muestra autodeclarada de studios sobrevivientes, y por eso [medir el desempeño de un studio con honestidad](/library/measuring-studio-performance) importa, así que léela como el techo que el modelo alcanza, no como un número que se le deba a un studio cualquiera. La cifra de VC tradicional proviene de benchmarks institucionales como el [índice de Venture Capital de EE. UU. de Cambridge Associates](https://www.cambridgeassociates.com/private-investment-benchmarks/), construido a partir de estados financieros trimestrales a lo largo de cuatro décadas.",
            "Esa prima solo se sostiene cuando el operating partner puede ir a fondo. Una venture de studio llega a Serie A en 25,2 meses frente a 56 de una startup tradicional, y 72% de las ventures de studio alcanzan la Serie A frente a 42% de las tradicionales, según [datos de GSSN vía Bundl](https://www.bundl.com/articles/why-venture-studio-startups-have-higher-long-term-success-rates). La profundidad no escala a docenas de apuestas a la vez. Así que el studio compra su ventaja diciendo que no mucho más seguido de lo que dice que sí. La selección no es el paso previo al trabajo. Es el trabajo."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio de ~50% versus ~19% estándar de la industria para VC tradicional, cerca de 2,5x el IRR en horizontes de tiempo realistas.",
            "attribution": "Global Startup Studio Network (GSSN)"
          }
        },
        {
          "id": "the-test",
          "heading": "El test de cuatro partes para una vertical",
          "level": 2,
          "paragraphs": [
            "Una vertical merece un cupo de build cuando cuatro condiciones se cumplen al mismo tiempo. Esto es una puerta, no un marcador. Una vertical fuerte en tres dimensiones y cerrada en la cuarta igual falla, porque la condición que falta suele ser la que decide el resultado."
          ],
          "bullets": [
            "Un gran mercado de servicios poco digitalizado. La vertical tiene que ser grande para importar y atrasada en software para que el trabajo aún corra en llamadas, hojas de cálculo y PDFs. Un mercado enorme ya bien servido por software es una pelea a cuchillo, no una apertura.",
            "Un operador de dominio disponible con profunda cicatriz de experiencia. El studio necesita un co-founder con más de 10 años dentro de la industria, que cargue el conocimiento regulatorio, de relaciones y de proceso que ningún deck enseña. Si ese operador no se puede encontrar ni reclutar, la vertical falla por bueno que se vea el mercado.",
            "Un workflow donde la IA cambia la economía unitaria. La IA tiene que convertir una tarea intensiva en mano de obra en software, no agregar una función. Según a16z, ese giro puede expandir los ingresos por cliente 2-10x, sobre los 2-5x que la integración de fintech ya entregó.",
            "Un camino hacia datos propietarios que se acumulan. El workflow tiene que generar datos que el studio pueda acumular y que mejoren el producto con el uso. Sin un ciclo que se acumula, un incumbente bien financiado o un modelo horizontal termina alcanzando."
          ]
        },
        {
          "id": "vertical-thesis",
          "heading": "Por qué la IA vertical pasa el test",
          "level": 2,
          "paragraphs": [
            "El test apunta a la IA vertical y no a los copilots horizontales porque la IA vertical se está probando más defendible y mejor valorada. La evidencia ya no es teórica. Según [Bessemer Venture Partners en septiembre de 2024](https://www.bvp.com/atlas/part-i-the-future-of-ai-is-vertical), las empresas verticales LLM-native alcanzaban 80% del valor promedio de contrato del SaaS tradicional, crecían cerca de 400% año contra año, y mantenían márgenes brutos de cerca de 65%, con la capitalización de mercado de la IA vertical proyectada en al menos 10x el tamaño del SaaS vertical heredado.",
            "Lo que separa a una empresa duradera de un wrapper superficial es la posesión del workflow más un ciclo de datos. Bessemer liga los moats de IA vertical a datos propietarios, profundidad de integración del producto y valor económico entregado, no al acceso al modelo, que todos comparten. a16z plantea el mismo punto a través del sistema de registro. La empresa que domina el workflow captura el presupuesto de mano de obra, no solo el de software, y los [$313B gastados en software en EE. UU. son apenas cerca del 3% de los $10,5T gastados en mano de obra](https://a16z.com/vertical-saas-now-with-ai-inside/). Toast llegó a $1,5B de ARR con más del 80% de los ingresos viniendo de servicios financieros embebidos, que es como se ve dominar un workflow vertical a escala.",
            "El ciclo de datos es la parte que los fundadores más exageran, así que el test es estricto en eso, y trazamos la línea con precisión en [cómo funcionan de verdad los efectos de red de datos en la IA vertical](/library/data-network-effects-vertical-ai). Según el [Network Effects Manual de NfX](https://www.nfx.com/post/network-effects-manual), los efectos de red explican cerca del 70% del valor creado por las empresas de tecnología desde 1994, pero las ventajas de datos son más débiles de lo que se cree. El dato solo es moat de verdad cuando el uso actualiza de forma continua un conjunto de datos central para el producto, como Waze que mejora con cada viaje, y no marginal como un feed de recomendación. Para el studio, esa distinción es la cuarta condición vuelta concreta. Una vertical pasa solo cuando su workflow genera datos a la vez propietarios y estructurales."
          ]
        },
        {
          "id": "brazil-supply",
          "heading": "Por qué Brasil ofrece tantos candidatos",
          "level": 2,
          "paragraphs": [
            "Brasil produce un número inusual de verticales que pasan la primera condición, porque los servicios representan cerca del 70% del PIB brasileño con baja penetración de software en esos sectores. Ese dato viene de [cifras del IBGE divulgadas en julio de 2024](https://en.mercopress.com/2024/07/13/ibge-finds-2-interannual-growth-in-services), con la porción de servicios 12,7% por encima del nivel prepandemia. Una base grande y creciente de actividad económica todavía corriendo en workflows manuales es un banco profundo de exactamente lo que el test busca primero.",
            "El telón de fondo de capital le dice al studio que estos mercados están abiertos, no saturados. Las startups de América Latina captaron $4,2B en 2024, un alza de 27% sobre el año previo, con Brasil quedándose con casi la mitad de todo el funding de la región, según [Crunchbase](https://news.crunchbase.com/venture/latin-america-startup-funding-eoy-2024/). El funding se recupera de un 2023 débil y sigue muy por debajo del pico de 2021, lo que significa que la mayoría de las verticales aún no tiene un incumbente bien capitalizado dominando el ciclo de datos. Esa es la ventana. No queda abierta para siempre.",
            "La ventaja estructural que permite al studio actuar es la profundidad del operador, y es el núcleo de [por qué los venture studios ganan en LATAM](/library/why-venture-studios-win-latam). Operadores de dominio con más de 10 años de cicatriz del mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque montados el día uno, es lo que un fondo generalista no puede replicar desde un asiento de directorio. La infraestructura de IA hoy es barata para desplegar sin una Serie A, y por eso un studio puede correr 3-4 apuestas verticales al año en Brasil en vez de una sola apuesta pesada en capital. El patrón se repite. Construya un copilot de IA para generar datos propietarios, luego use esos datos para captar y desplegar capital."
          ]
        },
        {
          "id": "when-to-pass",
          "heading": "Cuándo rechazar un mercado grande",
          "level": 2,
          "paragraphs": [
            "La disciplina del test aparece en los rechazos, no en los builds. Un studio puede caer en el reconocimiento de patrones y entrar en una vertical saturada donde un incumbente bien financiado ya domina el ciclo de datos. El mercado es grande, el workflow está claramente roto, hasta hay un operador disponible, y tres de las cuatro condiciones se encienden en verde. La cuarta está cerrada. Alguien llegó primero, su conjunto de datos propietario ya se está acumulando, y un nuevo entrante estaría alimentando un ciclo que no puede ganar.",
            "Eso es un rechazo, y debería ser fácil. Según el [Network Effects Manual de NfX](https://www.nfx.com/post/network-effects-manual), la empresa cuyo conjunto de datos es central y se actualiza de forma continua por el uso tiene una ventaja que un entrante posterior no supera solo gastando más. Entrar en una vertical donde el camino de los datos ya está cerrado gasta un cupo escaso en un segundo lugar.",
            "El tamaño del mercado no rescata la decisión. Un studio con apenas 3-4 cupos al año no puede darse el lujo de uno que produce un resultado estructuralmente limitado. El modo de falla honesto de la construcción de portafolio de un studio es confundir un mercado grande con uno abierto. La selección disciplinada significa renunciar a un mercado grande, roto y tentador justamente porque la condición que se acumula es la que ya no está."
          ]
        },
        {
          "id": "how-avante",
          "heading": "Cómo Avante conduce la selección",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina, y el test de cuatro partes es como decide dónde construir. Avante lanza 3-4 ventures al año a través de un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. La etapa Research es donde el test se encuentra con las verticales candidatas. La etapa Partner responde la segunda condición, porque ningún build arranca sin un operador de dominio que cargue cicatrices reales. El capital desplegado es $500K-1.5M por venture en el preseed, y Avante retiene economía de co-founder.",
            "La disciplina operativa sostiene la selección. Los operating partners siguen comprometidos hasta el primer hito de ingresos, luego pasan a la supervisión a nivel de directorio. Resolver la plomería de la empresa una vez dirige cerca de $300K-500K de capital efectivo por venture hacia producto y tracción en vez de overhead, y una venture de studio se lanza 6-9 meses por delante de un equipo autónomo con financiamiento comparable. Ese es el retorno de gastar bien el cupo.",
            "El portafolio se lee como el test aplicado tres veces, por dominio. Alphajuri construye en activos judiciales, el mercado de precatorios y claims, donde el workflow es intensivo en documentos y los datos se acumulan con cada caso. WIR, con AXA, construye en precios de seguros y risk scoring, donde una API asíncrona domina un workflow y los datos de siniestros son estructurales. BR Auction Intel construye en subastas inmobiliarias, haciendo scrape, enriquecimiento y scoring de propiedades donde el conjunto de datos mejora con la cobertura. Cada una pasó las mismas cuatro condiciones antes de merecer un cupo. El modelo operativo está en [/principles](/principles). El trabajo de un studio no es construir. La mayor parte del trabajo es elegir qué no construir."
          ]
        }
      ]
    }
  },
  {
    "slug": "why-venture-studios-win-latam",
    "category": "research",
    "type": "Research Report",
    "readTime": "11 min",
    "featured": false,
    "date": "Jun 2026",
    "datePublished": "2026-06-02",
    "isPublished": true,
    "en": {
      "title": "LATAM Venture Studios: Why They Outperform VC in Brazil",
      "description": "Studio IRR runs near 50% against roughly 19% for traditional VC. The structural reason, the honest failure modes, and why Brazil amplifies the model.",
      "sections": [
        {
          "paragraphs": [
            "Startups built inside a venture studio return more than startups a traditional fund writes a check into. The Global Startup Studio Network puts studio IRR at roughly 50% against roughly 19% for venture-backed startups. Avante Ventures frames that gap the way an LP should read it. Studio IRR near 50% versus an industry-standard ~19% IRR for traditional VC, roughly 2.5x over realistic time horizons.",
            "The interesting part is why. The gap is not a better-founder story. It is structural, it is repeatable, and it gets larger in a market like Brazil where operator depth is scarce and the services economy is barely digitized. This is the case for the venture studio vs VC question, the honest failure modes included, and why the model compounds hardest where Avante Ventures runs it."
          ]
        },
        {
          "id": "performance-gap",
          "heading": "The performance gap is structural",
          "level": 2,
          "paragraphs": [
            "Start with the number that anchors the whole venture studio IRR debate. Per the Global Startup Studio Network, studio ventures average roughly 50% IRR against roughly 19% for traditional venture-backed startups. The conservative framing is studio IRR near 50% versus ~19% IRR for traditional VC. Even that lands near the top of the realistic range for benchmark VC, where the Cambridge Associates US Venture Capital Index has posted long-run pooled net returns in the mid-teens.",
            "Speed is where the gap becomes visible. Studio startups reach Series A in about 25 months. Traditional startups take about 56 months. And 72% of studio ventures make it to Series A against 42% of traditional ones. A model that more than halves the time to a priced round and nearly doubles the graduation rate is not getting lucky on deal selection. It is removing the failure points that kill ordinary startups in year one."
          ],
          "callout": {
            "kind": "stat",
            "text": "Studio IRR near 50% versus an industry-standard ~19% IRR for traditional VC, roughly 2.5x over realistic time horizons.",
            "attribution": "Global Startup Studio Network, via Bundl and M Accelerator"
          }
        },
        {
          "id": "mechanism-depth",
          "heading": "Operational depth, by design",
          "level": 3,
          "paragraphs": [
            "A studio operating partner is inside the unit-economics model in the first weeks, not nine months after a board seat is negotiated. That is the first mechanism, and it is the one a generalist fund cannot copy. The studio supplies engineering, design, recruiting, and go-to-market from a central team that has shipped this work before.",
            "Read that against the alternative. A venture partner spread across 8 to 12 boards gives advice. A studio operator gives hours. When the people who have built companies are in the room writing the first pricing page, the early mistakes that sink ordinary startups simply do not get made."
          ]
        },
        {
          "id": "mechanism-time",
          "heading": "Time efficiency at the portfolio level",
          "level": 3,
          "paragraphs": [
            "The 25 months versus 56 months figure is the cleanest proxy for the studio's time advantage. The plumbing already exists, so the riskiest early period gets compressed. A studio venture launches 6-9 months ahead of a comparably funded standalone team.",
            "Hexa, formerly eFounders, built its entire thesis on exactly this. Treat company-building as a reusable system, not a sequence of one-off bets, and every new venture starts further down the field than the last one did."
          ]
        },
        {
          "id": "mechanism-capital",
          "heading": "Capital efficiency through repeatable systems",
          "level": 3,
          "paragraphs": [
            "Solve the company plumbing once and reuse it, and more of each dollar reaches product and traction instead of undifferentiated setup. In practice that discipline routes roughly $300K-500K of effective capital per venture into the work that actually moves the business.",
            "The higher graduation rate follows from there. When 72% of studio ventures reach Series A against 42% of traditional ones, it is because fewer months and fewer dollars were burned rebuilding the same foundation a sixth time."
          ],
          "bullets": [
            "Shared infrastructure means one engineering and design backbone amortized across every venture, not rebuilt per company.",
            "Operating partners stay engaged through the first revenue milestone, then transition to board-level oversight.",
            "Capital deployed is $500K-1.5M per venture across pre-seed, with Avante retaining co-founder economics."
          ]
        },
        {
          "id": "failure-modes",
          "heading": "Where the studio model breaks",
          "level": 2,
          "paragraphs": [
            "A piece that hides the weak points reads as marketing, so here are the real ones. The studio model breaks in three predictable ways, and the headline IRR carries a bias worth naming out loud.",
            "First, resource dilution. A studio that runs too many ventures at once spreads attention, capital, and expertise too thin, and every company in the cohort suffers for it. Second, founder conflict. Higher studio ownership can read to a founder as control over their own vision, and the equity math has to be honest from day one or the relationship sours. Third, capital intensity. Building companies from inception is expensive, and a studio that cannot fund its own overhead between exits does not survive long enough to compound.",
            "Then the bias. The 50% figure reflects studios that survived to report it. Failed studios do not publish their IRR, and early critics argued some studios were exploiting an immature ecosystem rather than building durable value. The honest reading is that the studio edge is real and shows up across sources, but the precise number is a benchmark, not a promise. The ~50% is the GSSN studio-model benchmark, never a claim about a studio's own realized return."
          ]
        },
        {
          "id": "brazil",
          "heading": "Why Brazil amplifies the model",
          "level": 2,
          "paragraphs": [
            "The studio edge compounds where two things are true at once. The market is large and under-digitized, and operator depth is scarce enough to be decisive. Brazil is the textbook case. Services account for roughly 70% of Brazilian GDP, and software penetration across those service sectors is low. That is precisely the terrain where an operator-led studio can build vertical AI companies a generalist fund could not even source, let alone staff. The specific sectors where that edge is sharpest are mapped in [Brazil's AI market report for 2026](/library/brazil-ai-market-report-2026).",
            "The capital backdrop helps too. LATAM venture funding is recovering rather than saturated, with funding ticking higher through 2024 and early-stage rounds taking the largest share. The deeper shift is on the cost side. [AI infrastructure is now cheap enough to deploy without a Series A](/library/ai-infrastructure-cost-curve-latam), which is the reason a studio can launch 3-4 ventures per year here instead of one capital-heavy bet. Read the broader thesis at [/why-avante](/why-avante).",
            "The edge that ties it together is people. Domain operators with 10+ years of Brazilian-market scar tissue, paired with a Silicon Valley playbook and first-ticket capital, assembled on day one. The recurring portfolio pattern is the [copilot to data to fund flywheel](/library/copilot-to-data-to-fund-flywheel). Build an AI copilot to generate proprietary data, then use that data to raise and deploy capital."
          ],
          "callout": {
            "kind": "stat",
            "text": "Services account for roughly 70% of Brazilian GDP, with low software penetration across those sectors.",
            "attribution": "IBGE, via MercoPress and Reuters, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "How Avante implements it",
          "level": 2,
          "paragraphs": [
            "Avante Ventures is a venture studio building AI-native companies in Brazil and Latin America. The model is deliberate, not opportunistic. It launches 3-4 ventures per year through a six-stage system. Research, Partner, Build, Traction, Revenue, Compound. Each venture gets $500K-1.5M across pre-seed, and Avante keeps co-founder economics rather than a passive minority stake.",
            "What that looks like in practice is operators inside the company, not on a quarterly call. Operating partners stay engaged through the first revenue milestone, then move to board-level oversight. The current portfolio runs across judicial asset infrastructure, insurance pricing, and real estate auction intelligence, each one a vertical where [Brazilian domain depth is the moat](/library/data-network-effects-vertical-ai). See how that maps to the operating model at [/principles](/principles).",
            "The studio premium is not a secret. It is the predictable result of putting experienced builders inside a company on day one, in a market where almost no one else can. Brazil does not just allow the venture studio model to work. It is where the model pays the most."
          ]
        }
      ]
    },
    "pt": {
      "title": "Venture Studios na LATAM: Por que Superam o VC no Brasil",
      "description": "O IRR de studios fica perto de 50% contra cerca de 19% do VC tradicional. A razão estrutural, as falhas do modelo e por que o Brasil amplifica tudo.",
      "sections": [
        {
          "paragraphs": [
            "Startups construídas dentro de um venture studio retornam mais do que startups em que um fundo tradicional apenas assina um cheque. A Global Startup Studio Network coloca o IRR de studios em torno de 50% contra cerca de 19% para startups financiadas por VC. A Avante Ventures enquadra essa diferença do jeito que um LP deve ler. IRR de studio perto de 50% contra um padrão de mercado de ~19% para o VC tradicional, cerca de 2,5x em horizontes de tempo realistas.",
            "O ponto interessante é o porquê. A diferença não é uma história de fundador melhor. É estrutural, é repetível e fica maior em um mercado como o Brasil, onde profundidade de operador é escassa e a economia de serviços mal foi digitalizada. Esta é a tese de venture studio vs VC, com as falhas honestas incluídas, e a razão pela qual o modelo compõe mais forte onde a Avante Ventures o roda."
          ]
        },
        {
          "id": "performance-gap",
          "heading": "A diferença de performance é estrutural",
          "level": 2,
          "paragraphs": [
            "Comece pelo número que ancora todo o debate sobre venture studio IRR. Segundo a Global Startup Studio Network, ventures de studio têm em média cerca de 50% de IRR contra cerca de 19% para startups tradicionais financiadas por VC. O enquadramento conservador é IRR de studio perto de 50% contra ~19% para o VC tradicional. Mesmo assim fica no topo da faixa realista de benchmark de VC, em que o índice de venture capital da Cambridge Associates registrou retornos líquidos de longo prazo na casa dos quinze por cento.",
            "A velocidade é onde a diferença aparece. Startups de studio chegam à Série A em cerca de 25 meses. As tradicionais levam cerca de 56. E 72% das ventures de studio chegam à Série A contra 42% das tradicionais. Um modelo que corta pela metade o tempo até uma rodada precificada e quase dobra a taxa de graduação não está tendo sorte na seleção de deals. Ele está removendo os pontos de falha que matam startups comuns no primeiro ano."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio perto de 50% contra um padrão de mercado de ~19% para o VC tradicional, cerca de 2,5x em horizontes de tempo realistas.",
            "attribution": "Global Startup Studio Network, via Bundl e M Accelerator"
          }
        },
        {
          "id": "mechanism-depth",
          "heading": "Profundidade operacional, por design",
          "level": 3,
          "paragraphs": [
            "Um operating partner de studio está dentro do modelo de unit economics nas primeiras semanas, não nove meses depois de negociar um assento no conselho. Esse é o primeiro mecanismo, e é o que um fundo generalista não consegue copiar. O studio fornece engenharia, design, recrutamento e go-to-market a partir de um time central que já entregou esse trabalho antes.",
            "Compare com a alternativa. Um sócio de VC espalhado por 8 a 12 conselhos dá conselho. Um operador de studio dá horas. Quando quem já construiu empresas está na sala escrevendo a primeira página de preços, os erros iniciais que afundam startups comuns simplesmente não acontecem."
          ]
        },
        {
          "id": "mechanism-time",
          "heading": "Eficiência de tempo no nível do portfólio",
          "level": 3,
          "paragraphs": [
            "Os 25 meses contra 56 meses são o melhor indicador da vantagem de tempo do studio. O encanamento já existe, então o período inicial mais arriscado é comprimido. Uma venture de studio nasce 6-9 meses à frente de um time autônomo com financiamento comparável.",
            "A Hexa, antiga eFounders, construiu toda a tese exatamente nisso. Trate a construção de empresas como um sistema reutilizável, não uma sequência de apostas avulsas, e cada nova venture começa mais adiante no campo do que a anterior."
          ]
        },
        {
          "id": "mechanism-capital",
          "heading": "Eficiência de capital com sistemas repetíveis",
          "level": 3,
          "paragraphs": [
            "Resolva o encanamento da empresa uma vez e reutilize, e mais de cada dólar chega a produto e tração em vez de setup indiferenciado. Na prática, essa disciplina direciona cerca de $300K-500K de capital efetivo por venture para o trabalho que de fato move o negócio.",
            "A maior taxa de graduação vem daí. Quando 72% das ventures de studio chegam à Série A contra 42% das tradicionais, é porque menos meses e menos dólares foram queimados reconstruindo a mesma fundação pela sexta vez."
          ],
          "bullets": [
            "Infraestrutura compartilhada significa uma espinha dorsal de engenharia e design amortizada entre todas as ventures, não refeita por empresa.",
            "Operating partners permanecem engajados até o primeiro marco de receita, depois passam para supervisão no nível do conselho.",
            "O capital aportado é de $500K-1.5M por venture no pré-seed, com a Avante retendo economia de co-founder."
          ]
        },
        {
          "id": "failure-modes",
          "heading": "Onde o modelo de studio quebra",
          "level": 2,
          "paragraphs": [
            "Um texto que esconde os pontos fracos soa como marketing, então aqui estão os reais. O modelo de studio quebra de três formas previsíveis, e o IRR de manchete carrega um viés que vale dizer em voz alta.",
            "Primeiro, diluição de recursos. Um studio que roda ventures demais ao mesmo tempo espalha atenção, capital e expertise fino demais, e cada empresa do grupo sofre por isso. Segundo, conflito com o fundador. A participação maior do studio pode soar para o fundador como controle sobre a própria visão, e a conta de equity precisa ser honesta desde o primeiro dia ou a relação azeda. Terceiro, intensidade de capital. Construir empresas do zero é caro, e um studio que não financia o próprio overhead entre exits não sobrevive tempo suficiente para compor.",
            "Depois o viés. O número de 50% reflete os studios que sobreviveram para reportá-lo. Studios que faliram não publicam IRR, e críticos iniciais argumentavam que alguns studios exploravam um ecossistema imaturo em vez de criar valor durável. A leitura honesta é que a vantagem do studio é real e aparece entre fontes, mas o número exato é um benchmark, não uma promessa. Os ~50% são o benchmark do modelo de studio da GSSN, nunca um retorno realizado do próprio studio."
          ]
        },
        {
          "id": "brazil",
          "heading": "Por que o Brasil amplifica o modelo",
          "level": 2,
          "paragraphs": [
            "A vantagem do studio compõe onde duas coisas são verdadeiras ao mesmo tempo. O mercado é grande e pouco digitalizado, e a profundidade de operador é escassa o bastante para ser decisiva. O Brasil é o caso de manual. Serviços representam cerca de 70% do PIB brasileiro, e a penetração de software nesses setores de serviço é baixa. É exatamente o terreno em que um studio liderado por operadores pode construir empresas de IA vertical que um fundo generalista nem conseguiria originar, quanto mais montar o time.",
            "O pano de fundo de capital também ajuda. O funding de venture na América Latina está se recuperando, não saturado, com o aporte subindo ao longo de 2024 e as rodadas early-stage levando a maior fatia. A mudança mais profunda está no custo. [A infraestrutura de IA já está barata o suficiente para entrar em operação sem uma Série A](/library/ai-infrastructure-cost-curve-latam), e é por isso que um studio consegue lançar 3-4 ventures por ano aqui em vez de uma aposta única e pesada em capital. Leia a tese completa em [/why-avante](/why-avante).",
            "A vantagem que amarra tudo são as pessoas. Operadores de domínio com mais de 10 anos de cicatriz do mercado brasileiro, somados a um playbook do Vale do Silício e capital de primeiro cheque, montados no primeiro dia. O padrão recorrente do portfólio é o [flywheel copilot, dado, capital](/library/copilot-to-data-to-fund-flywheel). Construir um copilot de IA para gerar dado proprietário, depois usar esse dado para levantar e aportar capital."
          ],
          "callout": {
            "kind": "stat",
            "text": "Serviços representam cerca de 70% do PIB brasileiro, com baixa penetração de software nesses setores.",
            "attribution": "IBGE, via MercoPress e Reuters, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "Como a Avante implementa",
          "level": 2,
          "paragraphs": [
            "A Avante Ventures é um venture studio que constrói empresas AI-native no Brasil e na América Latina. O modelo é deliberado, não oportunista. São 3-4 ventures lançadas por ano através de um sistema de seis estágios. Research, Partner, Build, Traction, Revenue, Compound. Cada venture recebe $500K-1.5M no pré-seed, e a Avante mantém economia de co-founder em vez de uma fatia minoritária passiva.",
            "Na prática, isso significa operadores dentro da empresa, não em uma call trimestral. Os operating partners ficam engajados até o primeiro marco de receita, depois migram para a supervisão no nível do conselho. O portfólio atual cobre infraestrutura de ativos judiciais, precificação de seguros e inteligência de leilões imobiliários, cada um um vertical em que a [profundidade de domínio brasileira é o moat](/library/data-network-effects-vertical-ai). Veja como isso se conecta ao modelo operacional em [/principles](/principles).",
            "O prêmio do studio não é segredo. É o resultado previsível de colocar construtores experientes dentro de uma empresa no primeiro dia, em um mercado onde quase ninguém mais consegue. O Brasil não apenas permite que o modelo de venture studio funcione. É onde o modelo paga mais."
          ]
        }
      ]
    },
    "es": {
      "title": "Venture Studios en LATAM: Por qué Superan al VC en Brasil",
      "description": "El IRR de los studios ronda el 50% frente a cerca del 19% del VC tradicional. La razón estructural, las fallas del modelo y por qué Brasil lo amplifica.",
      "sections": [
        {
          "paragraphs": [
            "Las startups construidas dentro de un venture studio rinden más que las startups en las que un fondo tradicional solo firma un cheque. La Global Startup Studio Network ubica el IRR de los studios cerca del 50% frente a cerca del 19% para startups financiadas por VC. Avante Ventures enmarca esa brecha como debe leerla un LP. IRR de studio cerca del 50% frente a un estándar de mercado de ~19% para el VC tradicional, cerca de 2,5x en horizontes de tiempo realistas.",
            "Lo interesante es el porqué. La brecha no es una historia de mejor fundador. Es estructural, es repetible y se agranda en un mercado como Brasil, donde la profundidad de operador es escasa y la economía de servicios apenas se ha digitalizado. Este es el caso de venture studio vs VC, con las fallas honestas incluidas, y la razón por la que el modelo compone más donde lo corre Avante Ventures."
          ]
        },
        {
          "id": "performance-gap",
          "heading": "La brecha de desempeño es estructural",
          "level": 2,
          "paragraphs": [
            "Empiece por el número que ancla todo el debate del venture studio IRR. Según la Global Startup Studio Network, las ventures de studio promedian cerca del 50% de IRR frente a cerca del 19% para startups tradicionales financiadas por VC. El encuadre conservador es IRR de studio cerca del 50% frente a ~19% para el VC tradicional. Aun así queda en el tope del rango realista de benchmark de VC, donde el índice de venture capital de Cambridge Associates registró retornos netos de largo plazo en el orden del quince por ciento.",
            "La velocidad es donde la brecha se vuelve visible. Las startups de studio llegan a la Serie A en unos 25 meses. Las tradicionales tardan unos 56. Y 72% de las ventures de studio llegan a la Serie A frente al 42% de las tradicionales. Un modelo que reduce a la mitad el tiempo hasta una ronda con precio y casi duplica la tasa de graduación no está teniendo suerte eligiendo deals. Está removiendo los puntos de falla que matan a las startups comunes en el primer año."
          ],
          "callout": {
            "kind": "stat",
            "text": "IRR de studio cerca del 50% frente a un estándar de mercado de ~19% para el VC tradicional, cerca de 2,5x en horizontes de tiempo realistas.",
            "attribution": "Global Startup Studio Network, vía Bundl y M Accelerator"
          }
        },
        {
          "id": "mechanism-depth",
          "heading": "Profundidad operativa, por diseño",
          "level": 3,
          "paragraphs": [
            "Un operating partner de studio está dentro del modelo de unit economics en las primeras semanas, no nueve meses después de negociar un asiento en el board. Ese es el primer mecanismo, y es el que un fondo generalista no puede copiar. El studio aporta ingeniería, diseño, reclutamiento y go-to-market desde un equipo central que ya entregó este trabajo antes.",
            "Compárelo con la alternativa. Un socio de VC repartido entre 8 y 12 boards da consejo. Un operador de studio da horas. Cuando quienes ya construyeron empresas están en la sala escribiendo la primera página de precios, los errores tempranos que hunden a las startups comunes simplemente no se cometen."
          ]
        },
        {
          "id": "mechanism-time",
          "heading": "Eficiencia de tiempo a nivel de portafolio",
          "level": 3,
          "paragraphs": [
            "Los 25 meses frente a 56 meses son el mejor indicador de la ventaja de tiempo del studio. La plomería ya existe, así que el período inicial más riesgoso se comprime. Una venture de studio nace 6-9 meses por delante de un equipo independiente con financiamiento comparable.",
            "Hexa, antes eFounders, construyó toda su tesis exactamente en esto. Trate la construcción de empresas como un sistema reutilizable, no una secuencia de apuestas sueltas, y cada nueva venture arranca más adelante en la cancha que la anterior."
          ]
        },
        {
          "id": "mechanism-capital",
          "heading": "Eficiencia de capital con sistemas repetibles",
          "level": 3,
          "paragraphs": [
            "Resuelva la plomería de la empresa una vez y reutilícela, y más de cada dólar llega a producto y tracción en lugar de setup indiferenciado. En la práctica, esa disciplina dirige cerca de $300K-500K de capital efectivo por venture al trabajo que de verdad mueve el negocio.",
            "La mayor tasa de graduación se desprende de ahí. Cuando 72% de las ventures de studio llegan a la Serie A frente al 42% de las tradicionales, es porque se quemaron menos meses y menos dólares reconstruyendo la misma base por sexta vez."
          ],
          "bullets": [
            "La infraestructura compartida significa una columna de ingeniería y diseño amortizada entre todas las ventures, no rehecha por empresa.",
            "Los operating partners siguen comprometidos hasta el primer hito de ingresos, luego pasan a supervisión a nivel de board.",
            "El capital aportado es de $500K-1.5M por venture en pre-seed, con Avante reteniendo economía de co-founder."
          ]
        },
        {
          "id": "failure-modes",
          "heading": "Dónde se rompe el modelo de studio",
          "level": 2,
          "paragraphs": [
            "Un texto que esconde los puntos débiles suena a marketing, así que aquí están los reales. El modelo de studio se rompe de tres formas predecibles, y el IRR de titular carga un sesgo que vale la pena decir en voz alta.",
            "Primero, dilución de recursos. Un studio que corre demasiadas ventures a la vez reparte atención, capital y expertise demasiado fino, y cada empresa del grupo lo sufre. Segundo, conflicto con el fundador. La mayor participación del studio puede leerse para el fundador como control sobre su propia visión, y la cuenta de equity tiene que ser honesta desde el primer día o la relación se agria. Tercero, intensidad de capital. Construir empresas desde cero es caro, y un studio que no financia su propio overhead entre exits no sobrevive lo suficiente para componer.",
            "Luego el sesgo. El 50% refleja a los studios que sobrevivieron para reportarlo. Los studios que fracasaron no publican su IRR, y críticos tempranos sostenían que algunos studios explotaban un ecosistema inmaduro en vez de crear valor duradero. La lectura honesta es que la ventaja del studio es real y aparece entre fuentes, pero el número exacto es un benchmark, no una promesa. El ~50% es el benchmark del modelo de studio de la GSSN, nunca un retorno realizado del propio studio."
          ]
        },
        {
          "id": "brazil",
          "heading": "Por qué Brasil amplifica el modelo",
          "level": 2,
          "paragraphs": [
            "La ventaja del studio compone donde dos cosas son ciertas al mismo tiempo. El mercado es grande y poco digitalizado, y la profundidad de operador es escasa al punto de ser decisiva. Brasil es el caso de manual. Los servicios representan cerca del 70% del PIB brasileño, y la penetración de software en esos sectores de servicio es baja. Es exactamente el terreno donde un studio liderado por operadores puede construir empresas de IA vertical que un fondo generalista ni siquiera podría originar, mucho menos armar el equipo.",
            "El telón de fondo de capital también ayuda. El financiamiento de venture en LATAM se está recuperando, no saturado, con la inversión subiendo a lo largo de 2024 y las rondas early-stage llevándose la mayor tajada. El cambio más profundo está en el costo. [La infraestructura de IA ya es lo bastante barata para entrar en operación sin una Serie A](/library/ai-infrastructure-cost-curve-latam), y por eso un studio puede lanzar 3-4 ventures por año aquí en lugar de una sola apuesta pesada en capital. Lea la tesis completa en [/why-avante](/why-avante).",
            "La ventaja que amarra todo es la gente. Operadores de dominio con más de 10 años de cicatriz del mercado brasileño, sumados a un playbook de Silicon Valley y capital de primer cheque, armados el primer día. El patrón recurrente del portafolio es el [flywheel copilot, dato, capital](/library/copilot-to-data-to-fund-flywheel). Construir un copilot de IA para generar dato propietario, luego usar ese dato para levantar y desplegar capital."
          ],
          "callout": {
            "kind": "stat",
            "text": "Los servicios representan cerca del 70% del PIB brasileño, con baja penetración de software en esos sectores.",
            "attribution": "IBGE, vía MercoPress y Reuters, 2024"
          }
        },
        {
          "id": "how-avante",
          "heading": "Cómo lo implementa Avante",
          "level": 2,
          "paragraphs": [
            "Avante Ventures es un venture studio que construye empresas AI-native en Brasil y América Latina. El modelo es deliberado, no oportunista. Lanza 3-4 ventures por año a través de un sistema de seis etapas. Research, Partner, Build, Traction, Revenue, Compound. Cada venture recibe $500K-1.5M en pre-seed, y Avante mantiene economía de co-founder en lugar de una participación minoritaria pasiva.",
            "En la práctica, eso significa operadores dentro de la empresa, no en una llamada trimestral. Los operating partners siguen comprometidos hasta el primer hito de ingresos, luego migran a la supervisión a nivel de board. El portafolio actual abarca infraestructura de activos judiciales, precificación de seguros e inteligencia de subastas inmobiliarias, cada uno un vertical donde la [profundidad de dominio brasileña es el moat](/library/data-network-effects-vertical-ai). Vea cómo se conecta al modelo operativo en [/principles](/principles).",
            "El premio del studio no es secreto. Es el resultado predecible de poner constructores experimentados dentro de una empresa el primer día, en un mercado donde casi nadie más puede. Brasil no solo permite que el modelo de venture studio funcione. Es donde el modelo paga más."
          ]
        }
      ]
    }
  },
]
// === CONTENT-ENGINE:END ===

// Hand-authored pillar (outside the engine block so merge.py never clobbers it).
const articleWhatIsVentureStudio: Article = {
  slug: 'what-is-a-venture-studio',
  category: 'insights',
  type: 'Guide',
  readTime: '8 min',
  featured: false,
  date: 'Jun 2026',
  datePublished: '2026-06-19',
  isPublished: true,
  en: {
    title: 'What Is a Venture Studio? The Model, Explained (2026)',
    description: 'A venture studio builds startups in-house, on repeat, supplying the idea, team, capital, and operators. How it works, how it differs from a VC, accelerator, or incubator, and why it is growing in LATAM.',
    sections: [
      {
        paragraphs: [
          'A venture studio is an organization that builds startups in-house, on repeat. Instead of writing checks into other people’s companies, a central team supplies the idea, the founding capital, the build team, and operators who co-build each company day to day. The studio takes the largest early stake in return, often around 34%, because it hands over the most.',
          'Studios are sometimes called startup studios, venture builders, or company builders. The label varies; the mechanism does not. One team launches a handful of companies a year, and each one makes the next faster to build. This guide explains how the model works, how it differs from a VC, an accelerator, and an incubator, and why it compounds fastest in markets like Brazil and Latin America.',
        ],
      },
      {
        heading: 'How a venture studio works',
        level: 2,
        paragraphs: [
          'A studio runs an assembly line for companies. A shared team handles the work every early startup repeats: incorporation, hiring, finance, design, go-to-market. Solving that plumbing once routes more capital into product and traction instead of overhead, and a studio venture typically launches several months ahead of a comparably funded standalone team.',
          'Discipline matters more than volume. Serious studios cap at three to four new ventures a year so operators can sit inside each company, not advise it from a board seat. That is the core difference from a fund: a studio operator is in the product decisions, the first hires, and the first paying customers.',
        ],
        bullets: [
          'Supplies the idea, first capital, build team, and operators',
          'Launches 3 to 4 ventures per year, by design',
          'Takes the largest early stake, commonly around 34%',
          'Each venture compounds the playbook for the next',
        ],
      },
      {
        heading: 'Venture studio vs VC vs accelerator',
        level: 2,
        paragraphs: [
          'The three paths price the same three things differently: how much equity you give up, how much control you keep, and how fast you reach traction. A VC writes a priced check and governs from a board seat. An accelerator sells a program and a network for a small stake. A studio builds the company around you for a larger one. We break the trade-offs down, with the real terms for each, in [venture studio vs VC vs accelerator](/library/studio-vs-accelerator-vs-vc).',
        ],
      },
      {
        heading: 'Venture studio vs incubator: not the same thing',
        level: 2,
        paragraphs: [
          'An incubator gives early companies space, mentorship, and shared services, but the founders still bring their own idea and team. A venture studio originates the company itself and staffs it. An incubator supports founders who already exist; a studio creates them. That single difference, who supplies the founding work, is what separates the two.',
        ],
      },
      {
        heading: 'Do venture studios actually work?',
        level: 2,
        paragraphs: [
          'The model’s track record is the reason it spread. Industry data from the Global Startup Studio Network puts studio-built companies at roughly 2.5x the IRR of traditional venture capital, driven by faster time to Series A and higher graduation rates. Read it as a directional model benchmark attributed to GSSN, not a guaranteed return. We unpack the data, and the honest failure modes, in [why venture studios outperform traditional VC](/library/why-venture-studios-win-latam).',
        ],
      },
      {
        heading: 'Why the model is growing in LATAM',
        level: 2,
        paragraphs: [
          'The studio edge is largest where operator depth is scarce and the economy is barely digitized, which describes Latin America precisely. Brazil’s economy is roughly 70% services and largely under-digitized, and AI infrastructure is now cheap enough to launch vertical companies without a Series A. That combination lets a studio run several regulated-vertical bets a year instead of one capital-heavy wager. Avante Ventures builds AI-native companies in Brazil and LATAM on exactly this thesis.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is a venture studio in simple terms?',
        a: 'A venture studio is a company that builds startups in-house, on repeat. A central team supplies the idea, first capital, build team, and operators, then takes the largest early stake (often around 34%) in each company it launches.',
      },
      {
        q: 'What is the difference between a venture studio and a VC?',
        a: 'A VC invests capital into companies other people found and governs from a board seat. A venture studio creates the company itself and puts operators inside it day to day. One allocates capital; the other builds.',
      },
      {
        q: 'How is a venture studio different from an incubator or accelerator?',
        a: 'An incubator and an accelerator support founders who already have an idea and a team, with space, mentorship, a network, or a program. A venture studio originates the company and staffs it. The studio supplies the founding work; the others support it.',
      },
      {
        q: 'How much equity does a venture studio take?',
        a: 'Usually the largest early stake of any early-stage path, commonly around 34%, because it hands over the most: the idea, the build team, first capital, and operators co-building day to day.',
      },
      {
        q: 'Are venture studios profitable?',
        a: 'Industry data from the Global Startup Studio Network points to roughly 2.5x the IRR of traditional venture capital across realistic horizons, though the figure is self-reported and survivor-weighted, so it is best read as a directional model benchmark rather than a guarantee.',
      },
    ],
  },
  pt: {
    title: 'O Que É um Venture Studio? O Modelo Explicado (2026)',
    description: 'Um venture studio constrói startups internamente, em série, fornecendo a ideia, o time, o capital e operadores. Como funciona, como difere de VC, aceleradora e incubadora, e por que cresce na América Latina.',
    sections: [
      {
        paragraphs: [
          'Um venture studio é uma organização que constrói startups internamente, em série. Em vez de assinar cheques nas empresas dos outros, um time central fornece a ideia, o capital inicial, o time de construção e operadores que co-constroem cada empresa no dia a dia. O studio fica com a maior fatia inicial em troca, em geral perto de 34%, porque entrega o máximo.',
          'Studios às vezes são chamados de startup studios, venture builders ou company builders. O rótulo varia; o mecanismo não. Um time lança um punhado de empresas por ano, e cada uma torna a próxima mais rápida de construir. Este guia explica como o modelo funciona, como difere de um VC, uma aceleradora e uma incubadora, e por que compõe mais rápido em mercados como o Brasil e a América Latina.',
        ],
      },
      {
        heading: 'Como funciona um venture studio',
        level: 2,
        paragraphs: [
          'Um studio roda uma linha de montagem de empresas. Um time compartilhado cuida do trabalho que toda startup inicial repete: constituição, contratação, finanças, design, go-to-market. Resolver esse encanamento uma vez direciona mais capital para produto e tração em vez de overhead, e uma venture de studio costuma lançar vários meses à frente de um time autônomo com financiamento comparável.',
          'Disciplina importa mais que volume. Studios sérios se limitam a três ou quatro novas ventures por ano para que operadores fiquem dentro de cada empresa, não a aconselhem de uma cadeira no conselho. Essa é a diferença central para um fundo: o operador de studio está nas decisões de produto, nas primeiras contratações e nos primeiros clientes pagantes.',
        ],
        bullets: [
          'Fornece a ideia, o primeiro capital, o time de construção e operadores',
          'Lança 3 a 4 ventures por ano, por design',
          'Fica com a maior fatia inicial, comumente perto de 34%',
          'Cada venture compõe o playbook para a próxima',
        ],
      },
      {
        heading: 'Venture studio vs VC vs aceleradora',
        level: 2,
        paragraphs: [
          'As três vias cobram de forma diferente as mesmas três coisas: quanto equity você cede, quanto controle você mantém e quão rápido chega à tração. Um VC faz um cheque precificado e governa de uma cadeira no conselho. Uma aceleradora vende um programa e uma rede por uma fatia pequena. Um studio constrói a empresa ao seu redor por uma maior. Detalhamos os trade-offs, com os termos reais de cada um, em [venture studio vs VC vs aceleradora](/library/studio-vs-accelerator-vs-vc).',
        ],
      },
      {
        heading: 'Venture studio vs incubadora: não é a mesma coisa',
        level: 2,
        paragraphs: [
          'Uma incubadora dá às empresas iniciais espaço, mentoria e serviços compartilhados, mas os fundadores ainda trazem a própria ideia e o próprio time. Um venture studio origina a empresa e a monta. Uma incubadora apoia fundadores que já existem; um studio os cria. Essa única diferença, quem fornece o trabalho fundador, é o que separa os dois.',
        ],
      },
      {
        heading: 'Venture studios funcionam de verdade?',
        level: 2,
        paragraphs: [
          'O histórico do modelo é a razão de ele ter se espalhado. Dados da Global Startup Studio Network colocam as empresas construídas por studios em cerca de 2,5x o IRR do venture capital tradicional, puxado por menor tempo até a Série A e maior taxa de graduação. Leia como um benchmark direcional do modelo atribuído à GSSN, não como retorno garantido. Destrinchamos os dados, e as falhas honestas do modelo, em [por que os venture studios superam o VC tradicional](/library/why-venture-studios-win-latam).',
        ],
      },
      {
        heading: 'Por que o modelo cresce na América Latina',
        level: 2,
        paragraphs: [
          'A vantagem do studio é maior onde a profundidade de operador é escassa e a economia é pouco digitalizada, o que descreve a América Latina com precisão. A economia do Brasil é cerca de 70% serviços e amplamente sub-digitalizada, e a infraestrutura de IA hoje é barata o bastante para lançar empresas verticais sem uma Série A. Essa combinação permite a um studio rodar várias apostas em verticais reguladas por ano em vez de uma única aposta pesada em capital. A Avante Ventures constrói empresas AI-native no Brasil e na América Latina exatamente sobre essa tese.',
        ],
      },
    ],
    faqs: [
      {
        q: 'O que é um venture studio em termos simples?',
        a: 'Um venture studio é uma empresa que constrói startups internamente, em série. Um time central fornece a ideia, o primeiro capital, o time de construção e operadores, e então fica com a maior fatia inicial (em geral perto de 34%) em cada empresa que lança.',
      },
      {
        q: 'Qual a diferença entre um venture studio e um VC?',
        a: 'Um VC investe capital em empresas que outras pessoas fundam e governa de uma cadeira no conselho. Um venture studio cria a própria empresa e coloca operadores dentro dela no dia a dia. Um aloca capital; o outro constrói.',
      },
      {
        q: 'Como um venture studio difere de uma incubadora ou aceleradora?',
        a: 'Uma incubadora e uma aceleradora apoiam fundadores que já têm ideia e time, com espaço, mentoria, rede ou um programa. Um venture studio origina a empresa e a monta. O studio fornece o trabalho fundador; os outros o apoiam.',
      },
      {
        q: 'Quanto de equity um venture studio pega?',
        a: 'Em geral a maior fatia inicial de qualquer via early-stage, comumente perto de 34%, porque entrega o máximo: a ideia, o time de construção, o primeiro capital e operadores co-construindo no dia a dia.',
      },
      {
        q: 'Venture studios são lucrativos?',
        a: 'Dados da Global Startup Studio Network apontam cerca de 2,5x o IRR do venture capital tradicional em horizontes realistas, embora o número seja autorreportado e enviesado por sobreviventes, então é melhor lido como um benchmark direcional do modelo, não uma garantia.',
      },
    ],
  },
  es: {
    title: '¿Qué Es un Venture Studio? El Modelo, Explicado (2026)',
    description: 'Un venture studio construye startups internamente, en serie, aportando la idea, el equipo, el capital y operadores. Cómo funciona, en qué se diferencia de un VC, aceleradora e incubadora, y por qué crece en América Latina.',
    sections: [
      {
        paragraphs: [
          'Un venture studio es una organización que construye startups internamente, en serie. En vez de firmar cheques en las empresas de otros, un equipo central aporta la idea, el capital inicial, el equipo de construcción y operadores que co-construyen cada empresa día a día. El studio se queda con la mayor participación inicial a cambio, en general cerca del 34%, porque entrega lo máximo.',
          'A los studios a veces se les llama startup studios, venture builders o company builders. La etiqueta varía; el mecanismo no. Un equipo lanza un puñado de empresas al año, y cada una hace que la siguiente sea más rápida de construir. Esta guía explica cómo funciona el modelo, en qué se diferencia de un VC, una aceleradora y una incubadora, y por qué compone más rápido en mercados como Brasil y América Latina.',
        ],
      },
      {
        heading: 'Cómo funciona un venture studio',
        level: 2,
        paragraphs: [
          'Un studio corre una línea de montaje de empresas. Un equipo compartido se encarga del trabajo que toda startup inicial repite: constitución, contratación, finanzas, diseño, go-to-market. Resolver esa plomería una sola vez dirige más capital a producto y tracción en vez de overhead, y una venture de studio suele lanzar varios meses por delante de un equipo independiente con financiamiento comparable.',
          'La disciplina importa más que el volumen. Los studios serios se limitan a tres o cuatro nuevas ventures al año para que los operadores estén dentro de cada empresa, no la asesoren desde un asiento del directorio. Esa es la diferencia central con un fondo: el operador de studio está en las decisiones de producto, en las primeras contrataciones y en los primeros clientes que pagan.',
        ],
        bullets: [
          'Aporta la idea, el primer capital, el equipo de construcción y operadores',
          'Lanza 3 a 4 ventures al año, por diseño',
          'Se queda con la mayor participación inicial, comúnmente cerca del 34%',
          'Cada venture compone el playbook para la siguiente',
        ],
      },
      {
        heading: 'Venture studio vs VC vs aceleradora',
        level: 2,
        paragraphs: [
          'Las tres vías cobran distinto las mismas tres cosas: cuánto equity cedes, cuánto control conservas y qué tan rápido llegas a tracción. Un VC hace un cheque con precio y gobierna desde un asiento del directorio. Una aceleradora vende un programa y una red por una participación pequeña. Un studio construye la empresa a tu alrededor por una mayor. Desglosamos los trade-offs, con los términos reales de cada uno, en [venture studio vs VC vs aceleradora](/library/studio-vs-accelerator-vs-vc).',
        ],
      },
      {
        heading: 'Venture studio vs incubadora: no son lo mismo',
        level: 2,
        paragraphs: [
          'Una incubadora da a las empresas iniciales espacio, mentoría y servicios compartidos, pero los fundadores aún traen su propia idea y su equipo. Un venture studio origina la empresa y la dota de equipo. Una incubadora apoya a fundadores que ya existen; un studio los crea. Esa única diferencia, quién aporta el trabajo fundador, es lo que separa a los dos.',
        ],
      },
      {
        heading: '¿Los venture studios funcionan de verdad?',
        level: 2,
        paragraphs: [
          'El historial del modelo es la razón de su expansión. Datos de la Global Startup Studio Network ubican a las empresas construidas por studios en cerca de 2,5x el IRR del venture capital tradicional, impulsado por menor tiempo a la Serie A y mayor tasa de graduación. Léelo como un benchmark direccional del modelo atribuido a GSSN, no como retorno garantizado. Desglosamos los datos, y las fallas honestas del modelo, en [por qué los venture studios superan al VC tradicional](/library/why-venture-studios-win-latam).',
        ],
      },
      {
        heading: 'Por qué el modelo crece en América Latina',
        level: 2,
        paragraphs: [
          'La ventaja del studio es mayor donde la profundidad de operador es escasa y la economía está poco digitalizada, lo que describe a América Latina con precisión. La economía de Brasil es cerca de 70% servicios y está ampliamente sub-digitalizada, y la infraestructura de IA hoy es barata para lanzar empresas verticales sin una Serie A. Esa combinación permite a un studio correr varias apuestas en verticales reguladas al año en vez de una sola apuesta pesada en capital. Avante Ventures construye empresas AI-native en Brasil y América Latina exactamente sobre esta tesis.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Qué es un venture studio en términos simples?',
        a: 'Un venture studio es una empresa que construye startups internamente, en serie. Un equipo central aporta la idea, el primer capital, el equipo de construcción y operadores, y luego se queda con la mayor participación inicial (en general cerca del 34%) en cada empresa que lanza.',
      },
      {
        q: '¿Cuál es la diferencia entre un venture studio y un VC?',
        a: 'Un VC invierte capital en empresas que otros fundan y gobierna desde un asiento del directorio. Un venture studio crea la propia empresa y pone operadores dentro de ella día a día. Uno asigna capital; el otro construye.',
      },
      {
        q: '¿En qué se diferencia un venture studio de una incubadora o aceleradora?',
        a: 'Una incubadora y una aceleradora apoyan a fundadores que ya tienen idea y equipo, con espacio, mentoría, red o un programa. Un venture studio origina la empresa y la dota de equipo. El studio aporta el trabajo fundador; los otros lo apoyan.',
      },
      {
        q: '¿Cuánto equity toma un venture studio?',
        a: 'Por lo general la mayor participación inicial de cualquier vía early-stage, comúnmente cerca del 34%, porque entrega lo máximo: la idea, el equipo de construcción, el primer capital y operadores co-construyendo día a día.',
      },
      {
        q: '¿Los venture studios son rentables?',
        a: 'Datos de la Global Startup Studio Network apuntan a cerca de 2,5x el IRR del venture capital tradicional en horizontes realistas, aunque la cifra es autorreportada y sesgada por sobrevivientes, así que se lee mejor como un benchmark direccional del modelo, no una garantía.',
      },
    ],
  },
}

export const articles: Article[] = [
  ...engineArticles, // generated by content-engine/merge.py
  articleWhatIsVentureStudio,
  articleVentureStudios,
  articleFirstTicket,
  articleBrazilAIMarket,
  articleSiggaCaseStudy, // featured on home hero — portfolio milestone
  articleOperatingStack, // featured — definitive Avante studio thesis piece
  articleAvantePlaybook,
  articleCashflow90Days,
  articleUnitEconomics,
  articleAIOperatorGuide,
  articleBrazilServices,
  articleGlobalStudioData,
]

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug)
