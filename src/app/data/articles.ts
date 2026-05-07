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
}

export interface ArticleLocaleContent {
  title: string
  description: string
  sections: ArticleSection[]
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
  en: ArticleLocaleContent
  pt: ArticleLocaleContent
  /** True if full long-form content is published. False = stub/coming-soon. */
  isPublished: boolean
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
    description: "The data is striking: venture studios generate ~50% IRR vs ~19% for traditional VC. Here's the structural reason — and why Brazil is the next theater for the model.",
    sections: [
      {
        paragraphs: [
          "Most asset classes report performance in five-year smoothing. Venture studios don't have that luxury — every cohort is a single year of decisions. Yet the data, gathered consistently for over a decade now, points in one direction: when measured over realistic time horizons, studios produce roughly 2.5× the IRR of traditional venture capital.",
          "The Global Startup Studio Network (GSSN) report — the industry's most-cited longitudinal study — pegs studio IRR at around 50%, against an industry-standard ~19% for VC funds in similar vintages. That gap isn't a quirk of measurement. It's a structural consequence of how the model is built.",
        ],
      },
      {
        heading: 'The 50% IRR isn\'t about luck',
        paragraphs: [
          "If you spent fifteen minutes thinking about VC returns, you'd assume the gap is explained by survivorship bias — only the studios with great deals report data. The GSSN methodology controls for that: dead studios, dormant studios, and studios with subpar returns are all in the dataset.",
          "Look closer and three structural advantages emerge that traditional VC simply cannot replicate at scale, no matter how good the partners are.",
        ],
      },
      {
        heading: 'Advantage 1: Operational depth, by design',
        level: 3,
        paragraphs: [
          "A traditional VC partner sits on 8–12 boards. Their lever is advice, introductions, and reserve capital. None of those compound at the daily-operating-decision layer where a startup actually wins or dies.",
          "A venture studio's operating partner is in the codebase, the unit economics spreadsheet, and the first hiring conversation. The studio has shared infrastructure — recruiters who already know the pipeline, finance leads who set up the books from day one, GTM operators who've sold into adjacent markets. The compounding effect is brutal: each new venture launches 6–9 months ahead of where a similarly-funded standalone team would be.",
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
          'Studios invert this. Every venture is a venture the studio chose to start — sourcing is internal, evaluation is performed before founding, and the firm is the first investor by definition. The hours-to-ownership ratio is dramatically better, and crucially, those hours are spent at the stage where small operational interventions create the largest strategic deltas.',
        ],
      },
      {
        heading: 'Advantage 3: Capital efficiency through repeatable systems',
        level: 3,
        paragraphs: [
          "A first-time founder spends roughly 40% of pre-seed capital on what we'd call 'company plumbing' — legal entity setup, payroll/HR, accounting books, basic security and compliance, founding GTM playbook construction. Most of that is repeated work across every venture in a region.",
          "Studios solve plumbing once. Subsequent ventures inherit it on day one. Result: every dollar deployed goes further toward differentiation work. In our experience this difference alone routes ~$300K–$500K of effective capital per venture into product and traction-building rather than overhead.",
        ],
      },
      {
        heading: 'Why this matters for Brazil specifically',
        paragraphs: [
          "Brazil's startup ecosystem has a structural shortage that makes the studio model especially well-suited: domain operators with 10+ years of Brazilian-market scar tissue. These are people who know how to navigate fragmented service industries, complicated tax regimes, and a labor market with unusual dynamics — but they're not natively wired to read SaaS metrics or design AI-native product loops.",
          "A studio bridges that. Domain operator + Silicon Valley playbook + first-ticket capital, all assembled day one. The local market offers what's globally rare in 2026: massive service-economy volume (70% of GDP), low product penetration, and AI infrastructure now cheap enough to deploy without a Series A.",
          "We see Brazil as one of the cleanest setups of any geography for studio outperformance, and the early data from our portfolio bears that out.",
        ],
      },
      {
        heading: 'How Avante implements the model',
        paragraphs: [
          "We launch 3–4 ventures per year. Each goes through the same six-stage system (Research → Partner → Build → Traction → Revenue → Compound) with shared studio infrastructure across all of them. Operating partners stay engaged through the first revenue milestone, then transition to board-level oversight.",
          'Capital deployment per venture sits in the $500K–$1.5M range across pre-seed, with the studio retaining co-founder economics. We measure ourselves not by deal flow but by IRR per cohort — the only honest measure of whether the model is working.',
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
          'GSSN Annual Report 2025 (Global Startup Studio Network) — the longitudinal IRR comparison referenced above.',
          'Cambridge Associates US Venture Capital Index Q4 2025 — for the ~19% benchmark IRR figure.',
          'Brazil VC + Tech Report 2025 (LAVCA) — service-economy and AI-investment data points.',
        ],
      },
    ],
  },
  pt: {
    title: 'Por Que Venture Studios Superam VC Tradicional',
    description: 'Os dados são contundentes: venture studios geram ~50% de IRR vs ~19% do VC tradicional. A razão estrutural — e por que o Brasil é o próximo palco do modelo.',
    sections: [
      {
        paragraphs: [
          'A maioria das classes de ativos reporta performance suavizada em cinco anos. Venture studios não têm esse luxo — cada cohort é um único ano de decisões. Ainda assim, os dados consistentes da última década apontam em uma direção: quando medidos em horizontes realistas, studios produzem aproximadamente 2.5× o IRR do venture capital tradicional.',
          'O relatório anual da GSSN (Global Startup Studio Network) — o estudo longitudinal mais citado da indústria — coloca o IRR de studios em ~50%, contra um padrão de ~19% de fundos de VC em vintages similares. Essa diferença não é estatística. É uma consequência estrutural de como o modelo é construído.',
        ],
      },
      {
        heading: 'Os 50% de IRR não são sorte',
        paragraphs: [
          'Se você passar quinze minutos pensando em retornos de VC, vai assumir que a diferença é explicada por viés de sobrevivência — apenas os studios com bons deals reportam dados. A metodologia da GSSN controla isso: studios mortos, dormentes e com retornos abaixo da média estão todos no dataset.',
          'Olhe mais de perto e três vantagens estruturais emergem que o VC tradicional simplesmente não pode replicar em escala, não importa o quão bons sejam os partners.',
        ],
      },
      {
        heading: 'Vantagem 1: Profundidade operacional por design',
        level: 3,
        paragraphs: [
          'Um partner de VC tradicional senta em 8–12 conselhos. Sua alavanca é conselho, introduções e capital de reserva. Nenhuma delas compõe na camada de decisão operacional diária onde uma startup realmente vence ou morre.',
          'Um operating partner de venture studio está no código, na planilha de unit economics e na primeira conversa de contratação. O studio tem infraestrutura compartilhada — recrutadores que já conhecem o pipeline, líderes financeiros que estruturam a contabilidade desde o dia um, operadores de GTM que já venderam em mercados adjacentes. O efeito de composição é brutal: cada novo venture lança 6–9 meses à frente de onde um time independente similarmente capitalizado estaria.',
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
          'Studios invertem isso. Todo venture é um venture que o studio escolheu começar — sourcing é interno, avaliação é feita antes de fundar, e a firma é o primeiro investidor por definição. A razão horas-para-ownership é dramaticamente melhor, e crucialmente, essas horas são gastas no estágio onde pequenas intervenções operacionais criam os maiores deltas estratégicos.',
        ],
      },
      {
        heading: 'Vantagem 3: Eficiência de capital via sistemas repetíveis',
        level: 3,
        paragraphs: [
          'Um first-time founder gasta aproximadamente 40% do capital pré-seed no que chamaríamos "encanamento da empresa" — abertura de pessoa jurídica, folha/RH, contabilidade, segurança e compliance básicos, construção do playbook de GTM fundador. A maior parte disso é trabalho repetido em cada venture em uma região.',
          'Studios resolvem o encanamento uma vez. Os ventures subsequentes herdam tudo no dia um. Resultado: cada dólar investido vai mais longe em trabalho diferenciador. Na nossa experiência, essa diferença sozinha redireciona ~R$1.5M–R$2.5M de capital efetivo por venture para produto e tração em vez de overhead.',
        ],
      },
      {
        heading: 'Por que isso importa especificamente para o Brasil',
        paragraphs: [
          'O ecossistema brasileiro tem uma escassez estrutural que torna o modelo de studio especialmente adequado: operadores de domínio com 10+ anos de cicatrizes do mercado brasileiro. Pessoas que sabem navegar indústrias de serviço fragmentadas, regimes tributários complexos e um mercado de trabalho com dinâmicas peculiares — mas que não estão nativamente cabladas para ler métricas SaaS ou desenhar loops de produto AI-native.',
          'Um studio faz essa ponte. Operador de domínio + playbook do Vale do Silício + capital de primeiro cheque, tudo montado no dia um. O mercado local oferece o que é globalmente raro em 2026: volume massivo de economia de serviços (70% do PIB), baixa penetração de produto e infraestrutura de IA agora barata o suficiente para deployar sem uma Série A.',
          'Vemos o Brasil como um dos setups mais limpos de qualquer geografia para outperformance de studios, e os dados iniciais do nosso portfólio confirmam isso.',
        ],
      },
      {
        heading: 'Como a Avante implementa o modelo',
        paragraphs: [
          'Lançamos 3–4 ventures por ano. Cada um passa pelo mesmo sistema de seis estágios (Research → Partner → Build → Traction → Revenue → Compound) com infraestrutura de studio compartilhada entre todos. Operating partners permanecem engajados até o primeiro marco de receita, depois transitam para supervisão de conselho.',
          'Capital deployado por venture fica na faixa de R$2.5M–R$7.5M no pré-seed, com o studio retendo economics de co-founder. Nos medimos não por deal flow mas por IRR por cohort — a única medida honesta de se o modelo está funcionando.',
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
          'GSSN Annual Report 2025 (Global Startup Studio Network) — comparação longitudinal de IRR referenciada acima.',
          'Cambridge Associates US Venture Capital Index Q4 2025 — para o número de IRR de referência ~19%.',
          'LAVCA Brazil VC + Tech Report 2025 — pontos de dados de economia de serviço e investimento em IA.',
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
    description: 'The biggest determinant of venture returns isn\'t picking ability — it\'s whether you wrote the first check. Here\'s the math, and the four-filter framework Avante uses to act on it.',
    sections: [
      {
        paragraphs: [
          'There\'s a near-universal misconception about how venture returns actually work. Founders, LPs, and even working VCs tend to credit "picking" — the ability to spot greatness before consensus. The data tells a different story: the dominant variable in long-term venture returns isn\'t which deals you picked. It\'s when you got into them.',
          'Specifically: did you write the first material check, or did you write the third or the fifth?',
        ],
      },
      {
        heading: 'The math: ownership decay across rounds',
        paragraphs: [
          "Take a venture that ends with a billion-dollar exit. The pre-seed first-ticket investor with a $500K check at a $4M post-money owns roughly 12.5% pre-dilution and ~4–5% post-dilution at exit, depending on subsequent rounds. That\'s ~$40–50M of return on $500K. A 100× outcome.",
          "The same investor writing $5M into the Series A at $40M post-money owns 12.5% pre-dilution but starts with much less room to compound. After three more rounds of dilution, they hold ~3–4% at exit, returning $30–40M on $5M — a respectable 7×, but a different category of outcome.",
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
          'The reason most investors don\'t write first tickets isn\'t lack of capital. It\'s that the information asymmetry is brutal. At pre-traction, there\'s no revenue to test, no market signal, no consensus. You\'re evaluating people, ideas, and timing — and being wrong is costly.',
          'The smart move isn\'t to "swing more often" at first tickets. It\'s to systematically build information advantages BEFORE the round, so that when you write the check, you\'re not gambling — you\'re acting on conviction earned through proximity to the operators and the market.',
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
          'Does the founder have at least 7 years of in-the-arena scar tissue in this exact market? Not "knows the space" — has been operationally responsible for outcomes in it. Service economies in Brazil are particularly punishing on this filter; you cannot fake fragmentation knowledge.',
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
          'Can we see a credible path to first revenue dollar within 12 months of founding? Not "could it work eventually" — credible path, with named first customers in the pipeline.',
          'This filter is the antidote to vanity metrics. It eliminates beautiful decks with no shipping plan. It also forces founder honesty about distribution: most ventures fail because nobody bought, not because the product didn\'t work.',
        ],
      },
      {
        heading: 'Filter 4: Compoundability',
        level: 3,
        paragraphs: [
          'Once we get to traction, does the moat compound? Network effects, switching costs, data loops, regulatory advantages — at least one structural compounder needs to be visible from year one. "We\'ll be cheaper" is not a moat. Neither is "we\'ll work harder."',
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
          'It also creates institutional memory. We can look back at every Avante investment and see which filters passed, which were marginal, and where we got it wrong. That feedback loop is what makes the framework better over time — and is the actual reason studios outperform: structured learning compounds.',
        ],
      },
    ],
  },
  pt: {
    title: 'A Vantagem do Primeiro Cheque: Um Framework',
    description: 'O maior determinante de retornos em VC não é capacidade de escolher — é se você escreveu o primeiro cheque. A matemática, e o framework de quatro filtros que a Avante usa.',
    sections: [
      {
        paragraphs: [
          'Existe uma concepção errada quase universal sobre como retornos em VC realmente funcionam. Founders, LPs e até VCs ativos tendem a creditar a "escolha" — a habilidade de identificar grandeza antes do consenso. Os dados contam uma história diferente: a variável dominante em retornos de longo prazo não é quais deals você escolheu. É quando você entrou neles.',
          'Especificamente: você escreveu o primeiro cheque material, ou o terceiro ou o quinto?',
        ],
      },
      {
        heading: 'A matemática: decaimento de ownership por round',
        paragraphs: [
          'Pegue um venture que termina com exit de bilhão de dólares. O investidor pré-seed do primeiro cheque com R$2.5M a R$20M post-money detém aproximadamente 12.5% pré-diluição e ~4–5% pós-diluição no exit, dependendo dos rounds subsequentes. Isso é ~R$200–250M de retorno em R$2.5M. Um resultado de 100×.',
          'O mesmo investidor escrevendo R$25M no Series A a R$200M post-money detém 12.5% pré-diluição mas começa com muito menos espaço para compor. Após mais três rounds de diluição, fica com ~3–4% no exit, retornando R$150–200M em R$25M — um respeitável 7×, mas uma categoria diferente de resultado.',
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
          'A razão pela qual a maioria dos investidores não escreve primeiros cheques não é falta de capital. É que a assimetria de informação é brutal. No pré-tração não há receita para testar, sinal de mercado, consenso. Você está avaliando pessoas, ideias e timing — e errar é caro.',
          'O movimento inteligente não é "balançar mais" em primeiros cheques. É construir sistematicamente vantagens informacionais ANTES do round, para que quando você escrever o cheque, não esteja apostando — esteja agindo com convicção construída por proximidade aos operadores e ao mercado.',
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
          'O founder tem pelo menos 7 anos de cicatrizes na arena nesse mercado exato? Não "conhece o espaço" — esteve operacionalmente responsável por resultados nele. Economias de serviço no Brasil são particularmente punitivas nesse filtro; você não pode fingir conhecimento de fragmentação.',
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
          'Conseguimos ver um caminho crível para primeiro real de receita dentro de 12 meses da fundação? Não "poderia funcionar eventualmente" — caminho crível, com primeiros clientes nomeados no pipeline.',
          'Esse filtro é o antídoto para métricas de vaidade. Elimina decks bonitos sem plano de envio. Também força honestidade do founder sobre distribuição: a maioria dos ventures falha porque ninguém comprou, não porque o produto não funcionou.',
        ],
      },
      {
        heading: 'Filtro 4: Composabilidade',
        level: 3,
        paragraphs: [
          'Uma vez chegando à tração, o moat compõe? Efeitos de rede, switching costs, loops de dados, vantagens regulatórias — pelo menos um compositor estrutural precisa ser visível desde o ano um. "Vamos ser mais baratos" não é moat. "Vamos trabalhar mais" também não.',
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
          'Também cria memória institucional. Conseguimos olhar para trás em cada investimento da Avante e ver quais filtros passaram, quais foram marginais e onde erramos. Esse loop de feedback é o que faz o framework melhorar com o tempo — e é a verdadeira razão pela qual studios superam: aprendizado estruturado compõe.',
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
          'Brazil in 2026 is in a position the rest of the developed world isn\'t: an economy large enough to matter ($2.5 trillion in GDP, ranked top-10 globally), service-economy-heavy (70%+ of output), and structurally under-digitized at the small and mid-business layer (~90% of SMEs lack basic operational software). When AI infrastructure dropped to a price point where founder teams can deploy production-grade models without a Series A, the constraint binding Brazilian software opportunity flipped from "can we afford to build it" to "do we have the operators to ship it."',
          'This report is our internal model of where the AI-native opportunity sits in Brazil right now. We\'re publishing it because the gap between what the global VC press writes about Brazil and what\'s actually shippable here is wide.',
        ],
      },
      {
        heading: 'The structural setup: why Brazil specifically, why now',
        paragraphs: [
          "There are five facts about the Brazilian economy that, taken together, define the AI-native opportunity better than any sectoral list:",
        ],
        bullets: [
          '$2.5T GDP — top-10 economy globally, large enough that category leaders can be billion-dollar businesses without exporting.',
          '215M people — population concentration in São Paulo / Rio / Belo Horizonte / Curitiba creates dense urban markets with shared infrastructure.',
          '70%+ services GDP — disproportionately operations-and-workflow-heavy, exactly the kind of work AI automates well.',
          '~90% of SMEs without basic software — the under-digitization is the opportunity. The entry point is "your first software," not "switch from Salesforce."',
          '$4.5B AI investment in 2025 (LAVCA + local trackers) — capital is arriving but is heavily late-stage. Pre-traction is genuinely under-served.',
        ],
      },
      {
        heading: 'Why service economies are AI-native',
        paragraphs: [
          'In a product-economy GDP (think US technology and consumer goods), AI is largely a tool that makes existing software more capable. The disruption is incremental within established product categories.',
          'In a service-economy GDP, AI is something else: it can do the actual work. Legal intake, insurance underwriting, customer support, accounting reconciliation, recruiter screening, real-estate matchmaking — these aren\'t "improved by software." They are software, once a sufficiently capable model is wired correctly into the workflow.',
          'Brazil\'s 70%+ services GDP means AI-native software has a much larger surface area than in product-heavy economies. Every fragmented industry of small operators is a candidate for an AI-native consolidator. That\'s the structural setup.',
        ],
      },
      {
        heading: 'The talent layer is genuinely deeper than reported',
        paragraphs: [
          'Brazilian engineering talent is one of the most consistently underestimated strategic assets in global tech. Engineers from USP, UNICAMP, ITA and a handful of self-taught feeder pools have been shipping into US tech companies (Stripe, Shopify, Cloudflare, Datadog, OpenAI) for a decade. The depth of senior IC talent who can architect AI-native products end-to-end is, by our internal headcount, comparable to a tier-2 US metro market — and roughly one-third the cost.',
          'The talent constraint isn\'t engineering. It\'s the rarer combination of senior engineering plus domain operating experience plus first-time-founder energy. That triplet is what venture studios assemble.',
        ],
      },
      {
        heading: 'Capital geometry: the gap is at pre-traction',
        paragraphs: [
          "$4.5B of 2025 AI investment in Brazil sounds healthy, and at the late-stage level, it is. Series B / C rounds are getting funded by global tier-1 funds opening LATAM allocations. That capital is necessary and welcome.",
          "What\'s structurally absent is true pre-traction capital with operational depth attached. Local angels write small ticks; family offices want post-revenue; global VCs want Series A traction. The 0-to-1 stage where products are still being designed and first revenue is being earned is the thinnest part of the capital stack — and it\'s precisely the stage where studio-style operational involvement creates the most value.",
        ],
        callout: {
          kind: 'stat',
          text: 'In our model, the addressable pre-traction AI-native venture-building opportunity in Brazil is approximately 200–300 net-new ventures per year through 2030.',
        },
      },
      {
        heading: 'Sectors we watch closely',
        paragraphs: [
          'Out of the broader services landscape, six sectors keep returning to the top of our pipeline because they share three traits: high fragmentation, mostly-manual workflows, and a clear path to monthly recurring revenue from day one.',
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
          "Brazilian private healthcare runs on a tangle of operadora-prestador relationships with manual claims, prior-auth, and reconciliation workflows. AI-native middleware that automates these steps is showing 70%+ time-to-decision improvements where deployed. This sector is constrained more by regulation than by AI capability — patient teams that can navigate ANS rules win.",
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
          'If you\'re an LP allocating to LATAM in 2026, the highest-leverage exposure is at pre-traction with operational involvement. The Series A market is increasingly competed; the late-stage market is global-fund-dominated; pre-seed and seed with hands-on studios is where IRR potential is highest and where capital deployed compounds fastest.',
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
          'PIB de US$2.5T — top-10 mundial, grande o suficiente para que líderes de categoria sejam negócios bilionários sem exportar.',
          '215M de pessoas — concentração populacional em São Paulo / Rio / Belo Horizonte / Curitiba cria mercados urbanos densos com infraestrutura compartilhada.',
          '70%+ de serviços no PIB — desproporcionalmente pesado em operações e workflows, exatamente o tipo de trabalho que IA automatiza bem.',
          '~90% das PMEs sem software básico — a sub-digitalização é a oportunidade. O ponto de entrada é "seu primeiro software", não "troque do Salesforce".',
          'US$4.5B de investimento em IA em 2025 (LAVCA + trackers locais) — capital está chegando mas é pesado em estágio tardio. Pré-tração é genuinamente sub-atendido.',
        ],
      },
      {
        heading: 'Por que economias de serviço são AI-native',
        paragraphs: [
          'Em um PIB de economia de produto (pense em tecnologia e bens de consumo dos EUA), IA é em grande parte uma ferramenta que torna software existente mais capaz. A disrupção é incremental dentro de categorias de produto estabelecidas.',
          'Em um PIB de economia de serviço, IA é outra coisa: pode fazer o trabalho real. Triagem jurídica, underwriting de seguros, atendimento ao cliente, conciliação contábil, screening de recrutamento, matchmaking imobiliário — não são "melhorados por software". São software, uma vez que um modelo suficientemente capaz é cabeado corretamente no workflow.',
          'Os 70%+ de serviços no PIB do Brasil significa que software AI-native tem uma área de superfície muito maior do que em economias pesadas em produto. Cada indústria fragmentada de pequenos operadores é candidata a um consolidador AI-native. Esse é o setup estrutural.',
        ],
      },
      {
        heading: 'A camada de talento é genuinamente mais profunda do que se reporta',
        paragraphs: [
          'Talento de engenharia brasileira é um dos ativos estratégicos consistentemente mais subestimados em tech global. Engenheiros da USP, UNICAMP, ITA e um punhado de pools auto-didatas vêm enviando para empresas de tech dos EUA (Stripe, Shopify, Cloudflare, Datadog, OpenAI) há uma década. A profundidade de talento sênior IC que pode arquitetar produtos AI-native end-to-end é, pelo nosso headcount interno, comparável a um mercado metropolitano tier-2 dos EUA — e custa aproximadamente um terço.',
          'A restrição de talento não é engenharia. É a combinação mais rara de engenharia sênior mais experiência operacional de domínio mais energia de first-time founder. Esse trio é o que venture studios montam.',
        ],
      },
      {
        heading: 'Geometria de capital: o gap está na pré-tração',
        paragraphs: [
          'US$4.5B de investimento em IA em 2025 no Brasil soa saudável, e no nível de estágio tardio, é. Rounds Série B / C estão recebendo funding de fundos tier-1 globais abrindo alocações para LATAM. Esse capital é necessário e bem-vindo.',
          'O que está estruturalmente ausente é capital genuíno de pré-tração com profundidade operacional acoplada. Anjos locais escrevem ticks pequenos; family offices querem pós-receita; VCs globais querem tração de Série A. O estágio 0-para-1 onde produtos ainda estão sendo desenhados e a primeira receita está sendo conquistada é a parte mais fina do capital stack — e é precisamente o estágio onde envolvimento operacional estilo-studio cria mais valor.',
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
          'A saúde privada brasileira roda em uma teia de relações operadora-prestador com workflows manuais de sinistros, autorização prévia e conciliação. Middleware AI-native que automatiza esses passos mostra melhorias de 70%+ em time-to-decision onde deployado. Esse setor é mais limitado por regulação que por capacidade de IA — times pacientes que sabem navegar regras da ANS vencem.',
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
    description: "How we co-built an AI workflow automation tool in a fragmented service industry — proving unit economics in 12 weeks.",
    intro: 'A walkthrough of one Avante venture\'s first 90 days: from white-paper customer discovery to first paid contracts to validated unit economics. We share the timeline, the spend, the team composition, the GTM motion, and the specific moments where studio infrastructure changed the trajectory of the venture.',
  },
  pt: {
    title: 'Estudo de Caso: De Ideia ao Cashflow em 90 Dias',
    description: 'Como co-construímos uma ferramenta de automação de workflow com IA em uma indústria de serviços fragmentada — provando unit economics em 12 semanas.',
    intro: 'Um walkthrough dos primeiros 90 dias de um venture da Avante: do descobrimento de clientes em white-paper aos primeiros contratos pagos à validação de unit economics. Compartilhamos a timeline, o spend, a composição do time, o motion de GTM e os momentos específicos onde a infraestrutura de studio mudou a trajetória do venture.',
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
    description: 'Identifying workflows where AI creates 10× advantages — a framework for domain experts building AI-native products.',
    intro: 'Most AI automation initiatives fail not because the model is wrong but because the workflow chosen is wrong. The full guide presents the three-question filter we use with operators (specificity, repeatability, and value-per-decision) to identify the workflows where AI delivers a 10× advantage rather than a 10% one.',
  },
  pt: {
    title: 'O Guia do Operador para Automação com IA',
    description: 'Identificando workflows onde IA cria vantagens de 10× — um framework para experts de domínio construindo produtos AI-native.',
    intro: 'A maioria das iniciativas de automação com IA falha não porque o modelo está errado mas porque o workflow escolhido está errado. O guia completo apresenta o filtro de três perguntas que usamos com operadores (especificidade, repetibilidade e valor-por-decisão) para identificar os workflows onde IA entrega uma vantagem de 10× em vez de 10%.',
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
      'Most studios talk about "shared infrastructure" without specifying what they actually share. This is what Avante shares — and what we deliberately do not — across every venture in the studio.',
    sections: [
      {
        paragraphs: [
          'Every venture studio claims to offer "shared infrastructure" and "operational support" and "founder leverage." Most of those claims do not survive a careful look at what is actually shared and what is delivered case-by-case as informal partner advice. The two are very different products.',
          'Avante runs on a deliberate operating stack — a set of shared capabilities that every venture in the studio inherits on day one, with the explicit ones documented and the boundaries clear. This piece walks through what is in that stack, what is deliberately not in it, and why we believe the distinction matters more than the headline list of perks.',
        ],
      },
      {
        heading: 'The premise: shared where it compounds, separate where it differentiates',
        paragraphs: [
          'A venture studio is not a holding company and is not a services firm. The right framing is closer to a software platform: there is a shared layer of infrastructure that becomes more valuable with every venture that runs on top of it, and there is an application layer where each venture has to be radically different in order to win its market.',
          "Confusing those layers is the failure mode that has killed more studios than capital scarcity. When studios standardize on the application layer — same product patterns, same brand voice, same go-to-market motion — they produce ventures that look like a portfolio of internal projects rather than independent companies with a chance at category leadership. When studios fragment on the infrastructure layer — every venture rebuilding cap tables, payroll, security policies from scratch — they burn the entire efficiency advantage that justified the studio model in the first place.",
          'Avante is built around the opposite discipline: the infrastructure layer is shared aggressively, with named owners and SLAs. The application layer — product, brand, GTM — is held by the founders of each venture, with the studio acting as a force-multiplier rather than a designer.',
        ],
        callout: {
          kind: 'tip',
          text: 'A working studio shares infrastructure with discipline and shares application choices with restraint. The reverse pattern is why most studios underperform.',
        },
      },
      {
        heading: 'Layer 1: Capital + cap-table architecture',
        paragraphs: [
          'Every Avante venture launches with a pre-negotiated first-ticket structure: studio first-money-in at a defined ownership band, with founder economics protected against the dilution gymnastics that founder-investor mismatches typically produce in Brazilian seed deals. Cap-table templates, vesting structures, and option-pool design are pre-built and reviewed by the same legal counsel for every venture. A founder going through Stage 2 (Partner) of the playbook does not spend three weeks on incorporation choices — those decisions are already made.',
          'Concretely: standard incorporation in São Paulo with a Delaware C-corp parent, four-year founder vesting with a one-year cliff, an 18% post-Series-A option pool reserved at founding, and a Brazilian operating subsidiary structured for clean transfer pricing. None of that is novel; what matters is that it is decided once and reused, freeing founders to spend their first 90 days on customers instead of paperwork.',
        ],
      },
      {
        heading: 'Layer 2: Talent — the recruiter who already knows the funnel',
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
        heading: 'Layer 3: Finance, legal, and security — set up correctly from day one',
        paragraphs: [
          'A meaningful portion of pre-seed capital in Brazilian startups is consumed not by product but by the cumulative cost of getting basic operating systems wrong: messy bookkeeping that has to be re-done before a Series A, mis-classified contractor relationships that surface at audit, security postures that fail the first enterprise customer\'s vendor review.',
          'Avante runs a single accounting partner across the studio, a single information-security baseline (SOC2-ready architecture and policies set up at incorporation rather than retrofitted before the first enterprise pilot), and a shared employment-law counsel who handles the differences between CLT, PJ, and US-employee structures correctly the first time. Each venture pays its share of these capabilities at a marginal cost. None of them rebuild the work.',
        ],
      },
      {
        heading: 'Layer 4: Go-to-market templates — and the discipline to break them',
        paragraphs: [
          "Each Avante venture inherits a starting GTM playbook: the ICP definition framework, the discovery-call structure that has been refined across ten previous founder cohorts, the pilot-to-contract conversion templates, the standard pricing-sensitivity test, the sales-comp model that aligns reps with category-leader behavior rather than transactional closing. These are starting points, not endpoints. The first job of every Avante founder is to run their version of these templates against their actual market and break the parts that do not fit.",
          "Why give templates if they are meant to be broken? Because templates produce informed disagreement faster than blank pages do. A founder who has spent three weeks deciding why the standard discovery script is wrong for their vertical has produced more market understanding than a founder who has spent three weeks designing a discovery script from scratch.",
        ],
      },
      {
        heading: 'Layer 5: Distribution — the network that earns its place',
        paragraphs: [
          'The ecosystem of Avante operating partners, board members, and prior-venture alumni is a meaningful but easily overstated asset. Used badly, it becomes a series of warm intros that founders are too polite to refuse and too distracted to make use of. Used well, it becomes a structured first-30-customer pipeline curated by the people most likely to know which buyer profiles will engage seriously.',
          'Avante\'s discipline here is to run distribution as a quarterly sprint with named targets and feedback loops, rather than as a perpetual ambient resource. A venture entering Stage 4 (Traction) of the playbook gets a sprint with explicit lists, owners, and conversion metrics. After 90 days, the sprint either produced the conversation pattern the venture needed or it surfaced a market mismatch the founders need to address — both useful outcomes.',
        ],
      },
      {
        heading: 'What is deliberately NOT shared',
        paragraphs: [
          'The temptation in any studio is to over-share. Each new piece of "common infrastructure" feels like it should compound. In practice, certain pieces are corrosive when shared and only useful when each venture builds them with founder ownership.',
        ],
        bullets: [
          'Product. Each venture\'s product DNA — what it feels like to use, how it talks, what it refuses to do — has to be authored by its founders. Shared product patterns produce ventures that read as a portfolio of clones, which is a death sentence in any market with real competition.',
          'Brand and tone of voice. Founders own this entirely. The studio supplies a clean visual baseline if a venture wants it; everything else is the venture\'s decision.',
          'Customer relationships. The founder is always the senior relationship owner with first ten enterprise customers. Studio support teams help operationally but never own the relationship.',
          'Hiring decisions. Avante runs the funnel; founders make the calls. We have hard rules against the studio overriding a founder veto on a senior hire — that pattern would erode the founder authority needed for the venture to develop its own culture.',
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
          'The structural argument for the studio model — and the reason the empirical IRR data shows ~50% for studios vs ~19% for traditional VC over comparable vintages — is that this infrastructure layer compounds across cohorts in a way that fund-level capital allocation simply cannot. Every venture run on the stack contributes lessons that improve the templates, refine the recruiter\'s funnel, sharpen the legal-and-security baseline, and expand the distribution network for the next cohort.',
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
          "If you are a founder considering joining a studio cohort — Avante's or anyone else's — the right question to ask is not 'what perks do you offer?' but 'what is in your stack, who owns each layer, and what is in writing about how it gets delivered?' A studio whose answer is vague is selling perks. A studio whose answer is specific is selling infrastructure. The two perform very differently across a venture's first 24 months.",
          "If you would like to see Avante's stack documents in detail, the contact form is the right starting point. We share them in a structured conversation rather than as a public download — not because they are secret, but because the documents only make sense in the context of a venture's specific stage and market.",
        ],
      },
    ],
  },
  pt: {
    title: 'Por Dentro do Stack Operacional da Avante',
    description:
      'A maioria dos studios fala em "infraestrutura compartilhada" sem especificar o que efetivamente compartilha. Esse é o stack que a Avante compartilha — e o que deliberadamente não compartilha — em cada venture do studio.',
    sections: [
      {
        paragraphs: [
          'Todo venture studio promete oferecer "infraestrutura compartilhada", "suporte operacional" e "alavancagem para fundadores". A maior parte dessas promessas não sobrevive a um olhar cuidadoso sobre o que efetivamente é compartilhado e o que é entregue caso-a-caso como conselho informal de partner. Os dois são produtos muito diferentes.',
          'A Avante roda em um stack operacional deliberado — um conjunto de capacidades compartilhadas que cada venture do studio herda no dia um, com as fronteiras documentadas e claras. Este texto percorre o que está nesse stack, o que deliberadamente não está nele, e por que acreditamos que essa distinção importa mais que a lista de benefícios da capa.',
        ],
      },
      {
        heading: 'A premissa: compartilhe onde compõe, separe onde diferencia',
        paragraphs: [
          'Um venture studio não é uma holding e não é uma empresa de serviços. O frame correto está mais perto de uma plataforma de software: há uma camada compartilhada de infraestrutura que se torna mais valiosa com cada venture que roda em cima dela, e há uma camada de aplicação onde cada venture precisa ser radicalmente diferente para ganhar seu mercado.',
          'Confundir essas camadas é o modo de falha que matou mais studios que escassez de capital. Quando studios padronizam a camada de aplicação — mesmos padrões de produto, mesma voz de marca, mesmo motion de go-to-market — produzem ventures que parecem um portfólio de projetos internos em vez de empresas independentes com chance de liderança de categoria. Quando studios fragmentam a camada de infraestrutura — cada venture reconstruindo cap tables, folha, políticas de segurança do zero — queimam toda a vantagem de eficiência que justificava o modelo de studio.',
          'A Avante é construída em torno da disciplina oposta: a camada de infraestrutura é compartilhada agressivamente, com owners nomeados e SLAs. A camada de aplicação — produto, marca, GTM — é dos fundadores de cada venture, com o studio agindo como multiplicador de força em vez de designer.',
        ],
        callout: {
          kind: 'tip',
          text: 'Um studio que funciona compartilha infraestrutura com disciplina e compartilha escolhas de aplicação com restrição. O padrão inverso é por que a maioria dos studios underperforma.',
        },
      },
      {
        heading: 'Camada 1: Capital + arquitetura de cap-table',
        paragraphs: [
          'Cada venture Avante lança com uma estrutura de primeiro cheque pré-negociada: studio first-money-in em uma faixa de ownership definida, com economics de fundador protegidos contra a ginástica de diluição que mismatches founder-investor tipicamente produzem em deals de seed brasileiros. Templates de cap-table, estruturas de vesting e desenho de option-pool são pré-construídos e revisados pelo mesmo conselho jurídico para cada venture. Um fundador passando pelo Estágio 2 (Partner) do playbook não gasta três semanas em escolhas de incorporação — essas decisões já estão tomadas.',
          'Concretamente: incorporação padrão em São Paulo com uma matriz Delaware C-corp, vesting de fundador de quatro anos com cliff de um ano, um option pool de 18% pós-Série-A reservado na fundação, e uma subsidiária operacional brasileira estruturada para transfer pricing limpo. Nada disso é novo; o que importa é que é decidido uma vez e reusado, liberando fundadores para gastar seus primeiros 90 dias com clientes em vez de papelada.',
        ],
      },
      {
        heading: 'Camada 2: Talento — o recrutador que já conhece o funil',
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
        heading: 'Camada 3: Financeiro, jurídico e segurança — corretos desde o dia um',
        paragraphs: [
          'Uma porção significativa do capital pré-seed em startups brasileiras é consumida não por produto mas pelo custo cumulativo de errar sistemas operacionais básicos: contabilidade bagunçada que precisa ser refeita antes de uma Série A, relacionamentos de contratante mal classificados que aparecem em auditoria, posturas de segurança que falham na primeira vendor review de cliente enterprise.',
          'A Avante roda um único parceiro contábil em todo o studio, um único baseline de segurança da informação (arquitetura e políticas SOC2-ready estabelecidas na incorporação em vez de retrofitadas antes do primeiro pilot enterprise), e um conselho jurídico-trabalhista compartilhado que lida corretamente da primeira vez com as diferenças entre estruturas CLT, PJ e US-employee. Cada venture paga sua porção dessas capacidades a custo marginal. Nenhuma reconstrói o trabalho.',
        ],
      },
      {
        heading: 'Camada 4: Templates de go-to-market — e a disciplina para quebrá-los',
        paragraphs: [
          'Cada venture Avante herda um playbook inicial de GTM: o framework de definição de ICP, a estrutura de discovery-call refinada em dez cohorts anteriores de fundadores, os templates de conversão pilot-para-contrato, o teste padrão de sensibilidade de pricing, o modelo de comp de vendas que alinha reps com comportamento de líder de categoria em vez de fechamento transacional. Esses são pontos de partida, não pontos de chegada. O primeiro trabalho de cada fundador Avante é rodar a versão deles desses templates contra o mercado real e quebrar as partes que não se encaixam.',
          'Por que dar templates se eles são para serem quebrados? Porque templates produzem desacordo informado mais rápido que páginas em branco. Um fundador que gastou três semanas decidindo por que o script padrão de discovery está errado para sua vertical produziu mais entendimento de mercado que um fundador que gastou três semanas desenhando um script de discovery do zero.',
        ],
      },
      {
        heading: 'Camada 5: Distribuição — a rede que merece seu lugar',
        paragraphs: [
          'O ecossistema de operating partners, board members e alumni de ventures anteriores da Avante é um ativo significativo mas facilmente superestimado. Usado mal, vira uma série de warm intros que fundadores são polidos demais para recusar e distraídos demais para aproveitar. Usado bem, vira um pipeline estruturado de primeiros 30 clientes curado pelas pessoas mais propensas a saber quais perfis de comprador vão engajar seriamente.',
          'A disciplina da Avante aqui é rodar distribuição como sprint trimestral com targets nomeados e feedback loops, em vez de como recurso ambiente perpétuo. Um venture entrando no Estágio 4 (Tração) do playbook ganha um sprint com listas explícitas, owners e métricas de conversão. Após 90 dias, o sprint ou produziu o padrão de conversa que o venture precisava ou trouxe à tona um mismatch de mercado que os fundadores precisam endereçar — ambos outcomes úteis.',
        ],
      },
      {
        heading: 'O que deliberadamente NÃO é compartilhado',
        paragraphs: [
          'A tentação em qualquer studio é compartilhar demais. Cada nova peça de "infraestrutura comum" parece que deveria compor. Na prática, certas peças são corrosivas quando compartilhadas e só úteis quando cada venture as constrói com ownership de fundador.',
        ],
        bullets: [
          'Produto. O DNA de produto de cada venture — como se sente usar, como conversa, o que se recusa a fazer — precisa ser autorado pelos seus fundadores. Padrões de produto compartilhados produzem ventures que se leem como portfólio de clones, o que é sentença de morte em qualquer mercado com competição real.',
          'Marca e tom de voz. Fundadores são donos disso inteiramente. O studio fornece um baseline visual limpo se um venture quiser; tudo o mais é decisão da venture.',
          'Relacionamentos com clientes. O fundador é sempre o sênior dono do relacionamento com os primeiros dez clientes enterprise. Times de suporte do studio ajudam operacionalmente mas nunca são donos do relacionamento.',
          'Decisões de contratação. A Avante roda o funil; fundadores fazem as escolhas. Temos regras rígidas contra o studio sobrescrever um veto de fundador em uma contratação sênior — esse padrão erodiria a autoridade fundadora necessária para o venture desenvolver sua própria cultura.',
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
          'O argumento estrutural para o modelo de studio — e a razão pela qual os dados empíricos de IRR mostram ~50% para studios vs ~19% para VC tradicional em vintages comparáveis — é que essa camada de infraestrutura compõe entre cohorts de uma forma que alocação de capital em nível de fundo simplesmente não consegue. Cada venture rodado no stack contribui com lições que melhoram os templates, refinam o funil do recrutador, afiam o baseline jurídico-e-de-segurança e expandem a rede de distribuição para o próximo cohort.',
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
          'Se você é um fundador considerando se juntar a um cohort de studio — da Avante ou de qualquer outro — a pergunta certa a fazer não é "quais perks vocês oferecem?" mas "o que está no stack de vocês, quem é dono de cada camada e o que está por escrito sobre como é entregue?" Um studio cuja resposta é vaga está vendendo perks. Um studio cuja resposta é específica está vendendo infraestrutura. Os dois performam muito diferente nos primeiros 24 meses de uma venture.',
          'Se você quiser ver os documentos do stack da Avante em detalhe, o formulário de contato é o ponto de partida certo. Compartilhamos eles em uma conversa estruturada em vez de como download público — não porque são secretos, mas porque os documentos só fazem sentido no contexto do estágio e mercado específicos de uma venture.',
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
      'A working case study from inside the Avante team. How a Brazilian industrial-software bet became a 10× outcome — and what it taught us about building category leaders in fragmented Brazilian verticals.',
    sections: [
      {
        paragraphs: [
          'Most case studies in venture are written by people who watched from a distance. This one is written from the inside. Amanda Pinheiro served on the Sigga Technologies Board through scale and exit. Other members of what is now the Avante team were operationally involved through several inflection points — fundraising rounds that almost did not close, a GTM motion that had to be redesigned twice, and an exit process that tested every assumption we had about who would actually buy a Brazilian industrial-software business at scale.',
          "The result was a 10× outcome — the kind of return that makes a fund's vintage and resets your assumptions about what is possible in fragmented Brazilian verticals. This piece walks through what happened, what we got right, what we almost broke, and how those lessons now shape every venture inside the Avante studio.",
        ],
      },
      {
        heading: 'The thesis: a market everyone said was impossible',
        paragraphs: [
          'Industrial asset management — the software that helps refineries, mines, mills, and power plants schedule maintenance, track equipment, and stay compliant — is a global category dominated by a few enterprise vendors with long implementation cycles and even longer sales cycles. SAP, IBM Maximo, Infor: each has a multi-year deployment, a seven-figure starting price, and a roster of customers in the Fortune 500.',
          "Brazil's industrial base does not look like that. The country has a dense ecosystem of medium-sized industrial operators — mining companies in Minas Gerais, sugar and ethanol mills in São Paulo state, pulp and paper across the south — for whom a $2M Maximo deployment is unthinkable, but who are also too operationally complex to run on spreadsheets. The conventional wisdom in 2010 was that this segment was unservable. Too small for the global vendors. Too complex for the local generic-ERP players. A no-man's-land.",
          "Sigga's founding bet was that the no-man's-land was actually the largest opportunity in Brazilian industrial software — if you could build a product that was deeply mobile-native, integrated with the SAP backbones the larger customers already had, and priced for a Brazilian P&L. The thesis was contrarian inside the Brazilian software industry. It also turned out to be exactly right.",
        ],
        callout: {
          kind: 'tip',
          text: 'Markets that "everyone says are impossible" are often markets where the operating reality has shifted faster than the consensus. The discount on conviction is usually larger than the discount on execution risk.',
        },
      },
      {
        heading: 'The first inflection: when the product almost did not ship',
        paragraphs: [
          "Eighteen months in, Sigga had a product that worked beautifully in the demo and broke quietly in the field. The mobile sync engine — the entire product's reason to exist — was struggling under the realities of Brazilian industrial connectivity: refineries with patchy 3G in some sectors and full WiFi blackouts in others, mines with deep-shaft work zones, paper mills with electromagnetic interference around the heavy machinery.",
          'The right product call was to rebuild the sync layer from scratch as offline-first, with a conflict-resolution model designed for hours-long disconnections rather than seconds. That call cost roughly six months of runway and pushed the company past one of those near-death milestones every venture has but few admit. It was also, in retrospect, the single decision that built the moat.',
          'Once shipped, the rebuilt sync layer became the unfair advantage. Competitors with cleaner architectures-on-paper consistently lost field bake-offs. The lesson: in industrial verticals, "works on a deck" and "works in a copper mine" are not the same product. The companies that confuse the two get killed at the procurement stage.',
        ],
      },
      {
        heading: 'The GTM motion: enterprise speed at SMB price points',
        paragraphs: [
          "Selling industrial software in Brazil to medium-sized operators is a strange motion. The buyer profile is enterprise — multi-stakeholder procurement, formal RFPs, security reviews — but the average contract size starts at SMB-tier numbers. You cannot afford the 12-month enterprise sales cycle, but you also cannot run a transactional bottom-up motion because the buyer doesn't behave that way.",
          "Sigga's answer was a hybrid that, looking back, prefigured a lot of what we now build into Avante studio playbooks: a narrow ICP (industrial operators with SAP backbones in three vertical clusters), a vertical-specific pre-sales engineer attached to each opportunity from week one, and a strict 90-day-to-pilot rule. If we couldn't get to a paid pilot inside 90 days, we walked. Walking sounds expensive. Staying in zombie deals is far more expensive.",
          'That motion produced something rare: a sales cycle that compressed each year as the reference roster grew. By year five, deals were closing on the strength of three reference calls and a 30-day pilot — closer to a SaaS motion than a traditional industrial-software one, while retaining the integration depth that made the product sticky.',
        ],
        callout: {
          kind: 'stat',
          text: '90-day-to-pilot or walk: the discipline that compounds reference velocity in any vertical SaaS motion. Zombie pipeline kills more startups than competition does.',
        },
      },
      {
        heading: 'The fundraises: capital discipline as a strategic weapon',
        paragraphs: [
          "Sigga raised less capital than the vintage average for a venture of its scale and stage. That was not entirely a choice — the Brazilian growth-capital market between 2014 and 2019 was thinner than US comparables — but it became a real strategic advantage. With less capital we built more conservative unit economics, lower burn structures, and a culture of capital discipline that, when the round-to-round market got harder, kept the company optionable.",
          "The contrast matters. Several of Sigga's would-be competitors raised significantly larger early rounds, scaled go-to-market faster, and ran out of runway before the market cycle turned. Sigga arrived at the exit window with a clean P&L, a long reference roster, and the kind of capital efficiency that strategic acquirers actually pay for.",
          'The lesson we now repeat across every Avante venture: when you cannot control market timing, you can still control your runway profile. Optionality is the most undervalued asset in early-stage venture-building.',
        ],
      },
      {
        heading: 'The exit: who actually buys Brazilian industrial software at scale',
        paragraphs: [
          'When the exit conversation became real, the natural assumption was that the buyer would be one of the global enterprise-asset-management incumbents — a strategic looking to plug a gap in Latin America. The reality was different. The strongest interest came from category-adjacent global players for whom Sigga represented a credible foothold in a fast-growing region with a Brazilian customer base that was hard to assemble organically.',
          "The exit closed at what we estimate as a roughly 10× return on capital deployed across the venture's lifetime — a number we hold privately but that materially shaped how the team now thinks about distribution of outcomes in fragmented Brazilian verticals. The lesson: exit theses written too narrowly miss the actual buyer pool. The right framing was always 'who needs this Brazilian customer base and this product capability,' not 'who else is in this exact category.'",
        ],
      },
      {
        heading: 'What this taught us — and what we now do day one',
        paragraphs: [
          'Sigga shaped the Avante studio playbook in ways that go beyond a single case study. Concretely, every venture in the studio inherits some hard-won lessons from that experience:',
        ],
        bullets: [
          'A 90-day-to-pilot discipline — if a venture cannot get a paid pilot inside 90 days of a serious conversation, the ICP is wrong, the product is wrong, or both.',
          'Capital efficiency designed in, not retrofitted. Every Avante venture starts with a runway plan that survives an 18-month dry market — because in Brazilian venture history, the dry markets always come.',
          'A "works in the field" engineering bar from week one. Demo-quality and production-quality are not the same product. Industrial verticals punish that confusion harder than any other.',
          'Exit-pool thinking from the founding cap-table. The buyer is rarely "the obvious incumbent." Map the actual decision-makers who would benefit from owning this customer base, then build relationships across that map for years before they matter.',
          'A board that adds operating muscle, not just oversight. Amanda\'s role on the Sigga Board was a direct, operational one — that template is now Avante\'s default for every studio venture.',
        ],
        callout: {
          kind: 'quote',
          text: 'Sigga taught us that the most fragmented verticals in Brazil are not impossible — they are simply un-served by people who actually understand the operating reality. That is the gap we build into every Avante venture today.',
          attribution: 'Avante Founding Team',
        },
      },
      {
        heading: 'Why this case matters for current Avante cohorts',
        paragraphs: [
          'Brazil in 2026 has more capital, more domain operators, and more cheap AI infrastructure than at any point in the country\'s tech history. The pattern Sigga ran — find a fragmented industrial-services vertical, build mobile-native and integration-deep, sell with enterprise rigor at SMB pricing, exit to a category-adjacent global player — is now repeatable across half a dozen Brazilian verticals, with AI as a multiplier that did not exist in 2012.',
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
      'Um estudo de caso de dentro do time da Avante. Como uma aposta em software industrial brasileiro virou um resultado de 10× — e o que isso nos ensinou sobre construir líderes de categoria em verticais fragmentadas no Brasil.',
    sections: [
      {
        paragraphs: [
          'A maioria dos estudos de caso em venture é escrita por pessoas que assistiram de longe. Este é escrito de dentro. Amanda Pinheiro serviu no Conselho da Sigga Technologies durante o crescimento e o exit. Outros membros do que hoje é o time da Avante estiveram operacionalmente envolvidos em vários momentos de inflexão — rodadas de fundraising que quase não fecharam, um GTM motion que precisou ser redesenhado duas vezes, e um processo de exit que testou cada premissa que tínhamos sobre quem efetivamente compraria um negócio de software industrial brasileiro em escala.',
          'O resultado foi um exit de 10× — o tipo de retorno que define a vintage de um fundo e reseta suas premissas sobre o que é possível em verticais fragmentadas no Brasil. Este texto percorre o que aconteceu, o que acertamos, o que quase quebramos, e como essas lições agora moldam cada venture dentro do studio Avante.',
        ],
      },
      {
        heading: 'A tese: um mercado que todos diziam ser impossível',
        paragraphs: [
          'Gestão de ativos industriais — o software que ajuda refinarias, minas, usinas e plantas de papel a programar manutenção, rastrear equipamentos e permanecer em compliance — é uma categoria global dominada por alguns vendors enterprise com ciclos de implementação longos e ciclos de venda ainda mais longos. SAP, IBM Maximo, Infor: cada um com deployment de múltiplos anos, preço-base de sete dígitos e clientela na Fortune 500.',
          'A base industrial brasileira não se parece com isso. O país tem um ecossistema denso de operadores industriais de médio porte — mineradoras em Minas Gerais, usinas de cana em São Paulo, indústrias de papel e celulose no sul — para quem um deployment de R$10M de Maximo é impensável, mas que também são operacionalmente complexos demais para rodar em planilhas. A sabedoria convencional em 2010 era que esse segmento era inservível. Pequeno demais para os vendors globais. Complexo demais para os players genéricos de ERP local. Uma terra de ninguém.',
          'A aposta fundadora da Sigga foi que a terra de ninguém era na verdade a maior oportunidade em software industrial brasileiro — se você conseguisse construir um produto profundamente mobile-native, integrado com os backbones SAP que clientes maiores já tinham, e precificado para um P&L brasileiro. A tese era contrária dentro da indústria de software brasileira. Acabou se mostrando exatamente certa.',
        ],
        callout: {
          kind: 'tip',
          text: 'Mercados que "todo mundo diz serem impossíveis" são frequentemente mercados onde a realidade operacional mudou mais rápido que o consenso. O desconto em convicção costuma ser maior que o desconto em risco de execução.',
        },
      },
      {
        heading: 'A primeira inflexão: quando o produto quase não foi ao ar',
        paragraphs: [
          'Dezoito meses dentro, a Sigga tinha um produto que funcionava lindamente no demo e quebrava silenciosamente no campo. O motor de sync mobile — a razão de existir do produto inteiro — estava penando com a realidade da conectividade industrial brasileira: refinarias com 3G falho em alguns setores e blecautes totais de WiFi em outros, minas com zonas de trabalho em poços profundos, indústrias de papel com interferência eletromagnética ao redor das máquinas pesadas.',
          'A decisão de produto correta foi reconstruir a camada de sync do zero como offline-first, com um modelo de resolução de conflito desenhado para desconexões de horas em vez de segundos. Essa decisão custou aproximadamente seis meses de runway e empurrou a empresa por um daqueles marcos quase-de-morte que toda venture tem mas poucos admitem. Foi também, em retrospecto, a única decisão que construiu o moat.',
          'Uma vez no ar, a camada de sync reconstruída virou a vantagem injusta. Competidores com arquiteturas mais limpas no papel consistentemente perdiam bake-offs em campo. A lição: em verticais industriais, "funciona num deck" e "funciona numa mina de cobre" não são o mesmo produto. As empresas que confundem os dois morrem no estágio de procurement.',
        ],
      },
      {
        heading: 'O GTM motion: velocidade enterprise em preço de SMB',
        paragraphs: [
          'Vender software industrial no Brasil para operadores de médio porte é um motion estranho. O perfil de comprador é enterprise — procurement multi-stakeholder, RFPs formais, security reviews — mas o tamanho médio de contrato começa em números de SMB. Você não pode arcar com o ciclo de venda enterprise de 12 meses, mas também não pode rodar um motion transacional bottom-up porque o comprador não se comporta assim.',
          'A resposta da Sigga foi um híbrido que, olhando para trás, prefigurou muito do que agora construímos no playbook do studio Avante: um ICP estreito (operadores industriais com backbones SAP em três clusters verticais), um pre-sales engineer vertical-específico anexado a cada oportunidade desde a semana um, e uma regra rígida de 90 dias para pilot. Se não conseguíssemos chegar a um pilot pago em 90 dias, saíamos. Sair parece caro. Ficar em deals zumbis é muito mais caro.',
          'Esse motion produziu algo raro: um ciclo de venda que comprimia a cada ano à medida que o roster de referência crescia. No quinto ano, deals estavam fechando com a força de três reference calls e um pilot de 30 dias — mais perto de um motion SaaS do que de um motion tradicional de software industrial, mantendo a profundidade de integração que tornava o produto sticky.',
        ],
        callout: {
          kind: 'stat',
          text: '90 dias para pilot ou sai: a disciplina que compõe velocidade de referência em qualquer motion vertical SaaS. Pipeline zumbi mata mais startups que competição.',
        },
      },
      {
        heading: 'Os fundraises: disciplina de capital como arma estratégica',
        paragraphs: [
          'A Sigga levantou menos capital que a média de vintage para uma venture do seu porte e estágio. Isso não foi inteiramente uma escolha — o mercado brasileiro de capital de crescimento entre 2014 e 2019 era mais raso que comparáveis americanos — mas virou uma vantagem estratégica real. Com menos capital construímos unit economics mais conservadores, estruturas de burn mais baixas, e uma cultura de disciplina de capital que, quando o mercado round-to-round ficou mais difícil, manteve a empresa opcional.',
          'O contraste importa. Vários dos competidores que poderiam ter ameaçado a Sigga levantaram rodadas iniciais significativamente maiores, escalaram go-to-market mais rápido, e ficaram sem runway antes do ciclo de mercado virar. A Sigga chegou na janela de exit com um P&L limpo, um roster longo de referências, e o tipo de eficiência de capital que adquirentes estratégicos efetivamente pagam.',
          'A lição que agora repetimos em cada venture Avante: quando você não pode controlar o timing do mercado, você ainda pode controlar seu perfil de runway. Opcionalidade é o ativo mais subestimado em construção de venture early-stage.',
        ],
      },
      {
        heading: 'O exit: quem efetivamente compra software industrial brasileiro em escala',
        paragraphs: [
          'Quando a conversa de exit virou real, a premissa natural foi que o comprador seria um dos incumbentes globais de enterprise-asset-management — um estratégico buscando preencher um gap na América Latina. A realidade foi diferente. O interesse mais forte veio de players globais adjacentes-de-categoria para quem a Sigga representava um foothold credível em uma região de rápido crescimento com uma base de clientes brasileira difícil de montar organicamente.',
          'O exit fechou no que estimamos como aproximadamente 10× sobre o capital deployado ao longo da vida da venture — um número que mantemos privadamente mas que moldou materialmente como o time agora pensa sobre distribuição de outcomes em verticais fragmentadas no Brasil. A lição: teses de exit escritas estreitas demais perdem o pool real de compradores. O frame correto sempre foi "quem precisa dessa base de clientes brasileira e dessa capacidade de produto", não "quem mais está nessa categoria exata".',
        ],
      },
      {
        heading: 'O que isso nos ensinou — e o que agora fazemos no dia um',
        paragraphs: [
          'A Sigga moldou o playbook do studio Avante de formas que vão além de um único estudo de caso. Concretamente, cada venture no studio herda algumas lições duramente conquistadas dessa experiência:',
        ],
        bullets: [
          'Disciplina de 90 dias para pilot — se uma venture não consegue chegar a um pilot pago dentro de 90 dias de uma conversa séria, o ICP está errado, o produto está errado, ou ambos.',
          'Eficiência de capital desenhada de origem, não retrofitada. Cada venture Avante começa com um plano de runway que sobrevive a um mercado seco de 18 meses — porque na história do venture brasileiro, os mercados secos sempre vêm.',
          'Padrão de engenharia "funciona no campo" desde a semana um. Qualidade-de-demo e qualidade-de-produção não são o mesmo produto. Verticais industriais punem essa confusão mais duro que qualquer outro.',
          'Pensamento de exit-pool desde o cap-table fundador. O comprador raramente é "o incumbente óbvio". Mapeie os tomadores de decisão reais que beneficiariam de possuir essa base de clientes, então construa relacionamentos por anos antes que importem.',
          'Um conselho que adiciona músculo operacional, não apenas supervisão. O papel da Amanda no Conselho da Sigga foi direto e operacional — esse template é agora o default da Avante para cada venture do studio.',
        ],
        callout: {
          kind: 'quote',
          text: 'A Sigga nos ensinou que as verticais mais fragmentadas no Brasil não são impossíveis — são simplesmente não-servidas por pessoas que efetivamente entendem a realidade operacional. Esse é o gap que construímos em cada venture Avante hoje.',
          attribution: 'Time Fundador da Avante',
        },
      },
      {
        heading: 'Por que este caso importa para os cohorts atuais da Avante',
        paragraphs: [
          'O Brasil em 2026 tem mais capital, mais operadores de domínio e mais infraestrutura de IA barata que em qualquer ponto da história tech do país. O padrão que a Sigga rodou — encontrar uma vertical fragmentada de serviços industriais, construir mobile-native e profundamente integrado, vender com rigor enterprise em pricing de SMB, fazer exit para um player global adjacente-de-categoria — agora é repetível em meia dúzia de verticais brasileiras, com IA como multiplicador que não existia em 2012.',
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
}

// ─────────────────────────────────────────────────────────────────────
// Export — order matches LibraryPage's display order
// ─────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
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
