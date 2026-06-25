import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Nav
    'nav.thesis': 'Tese',
    'nav.playbook': 'Playbook',
    'nav.team': 'Time',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contato',
    'nav.what': 'O que Fazemos',
    'nav.brazil': 'Brasil',
    'nav.cta': 'Começar',
    'nav.cta.primary': 'Seja Parceiro Avante',
    'nav.cta.secondary': 'Ver o Sistema',
    
    // Hero - OPTIMIZED FOR CLARITY (Y Combinator Rules)
    'hero.tagline': 'Venture Building + Investimento em Estágio Inicial',
    'hero.headline': 'Co-fundamos empresas do zero e investimos em startups pré-tração no Brasil.',
    'hero.subheadline': 'Avante fornece capital, desenvolvimento de produto, engenharia e infraestrutura de go-to-market. Ou construímos com você desde o dia um, ou investimos antes da sua Série A.',
    'hero.cta.primary': 'Iniciar uma Conversa',
    'hero.cta.secondary': 'Ver o Sistema',
    'hero.microproof': 'Build-to-compound. Cashflow first. Sem hype, só execução.',
    'hero.scroll': 'Rolar',
    
    // CTA Sections
    'cta.title': 'Pronto para construir?',
    'cta.subtitle': 'Junte-se a operadores construindo a próxima geração de empresas AI-native no Brasil.',
    'cta.primary': 'Iniciar uma Conversa',
    'cta.secondary': 'Conheça o Time',
    'cta.compact': 'Entre em Contato',
    
    // Contact Modal
    'contact.title': 'Vamos construir juntos',
    'contact.subtitle': 'Conte-nos sobre sua visão e retornaremos em até 48 horas.',
    'contact.success': 'Mensagem enviada! Entraremos em contato em breve.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.company': 'Empresa (opcional)',
    'contact.form.message': 'O que você está construindo?',
    'contact.form.stage': 'Estágio',
    'contact.form.stages.idea': 'Ideia / Conceito',
    'contact.form.stages.mvp': 'MVP / Construindo',
    'contact.form.stages.traction': 'Tração Inicial',
    'contact.form.stages.scaling': 'Escalando',
    'contact.form.submit': 'Enviar Mensagem',
    'contact.form.submitting': 'Enviando...',
    
    // What We Do - OPTIMIZED FOR CLARITY
    'whatwedo.title.line1': 'Duas formas de trabalhar com Avante:',
    'whatwedo.title.line2': 'Venture building ou investimento em estágio inicial.',
    'whatwedo.bullet1': 'Caminho 1: Co-Construir. Somos parceiros desde o dia um, fornecendo produto, engenharia e capital para lançar do zero.',
    'whatwedo.bullet2': 'Caminho 2: Investir Cedo. Lideramos rodadas pré-tração em fundadores excepcionais construindo líderes de categoria AI-native.',
    'whatwedo.bullet3': 'Ambos Caminhos: Suporte operacional completo incluindo go-to-market, estratégia de capital e infraestrutura de governança.',
    'whatwedo.tagline': 'Avante combina execução de venture studio com disciplina de investimento em estágio inicial.',
    
    // The Avante System
    'system.title': 'O Sistema Avante',
    'system.subtitle': 'Um loop repetível para lançar 3–4 ventures por ano e fazer compound dos vencedores por décadas.',
    'system.step1.title': 'Pesquisar a cunha',
    'system.step1.desc': 'encontrar workflows onde IA cria vantagem de 10×.',
    'system.step2.title': 'Parceria com operadores',
    'system.step2.desc': 'especialistas de domínio + construtores.',
    'system.step3.title': 'Construir rápido',
    'system.step3.desc': 'equipe pequena, core com IA, iteração rápida.',
    'system.step4.title': 'Ganhar tração',
    'system.step4.desc': 'usuários reais, receita real, sinais honestos.',
    'system.step5.title': 'Provar unit economics',
    'system.step5.desc': 'LTV:CAC importa desde o dia um.',
    'system.step6.title': 'Fazer Compound',
    'system.step6.desc': 'escalar com lucro, construir moats duráveis.',
    'system.miniline': 'Pesquisa → Parceria → Construção → Tração → Receita → Compounding.',
    
    // Resource Backbone
    'backbone.title': 'Capacidades de uma organização escalada, no dia zero.',
    'backbone.subtitle': 'Fundadores não falham por falta de ideias. Falham porque a execução é fragmentada. Nós fornecemos a estrutura.',
    'backbone.card1.title': 'Produto & Engenharia',
    'backbone.card1.desc': 'Entrega de produto de classe mundial e infraestrutura de IA, pronta para lançar.',
    'backbone.card2.title': 'Capital & Acesso a Deals',
    'backbone.card2.desc': 'Capital pré-tração + caminho credível para follow-on quando os sinais são reais.',
    'backbone.card3.title': 'Domínio & Distribuição',
    'backbone.card3.desc': 'Vantagem local do Brasil + redes de operadores para alcançar clientes rapidamente.',
    'backbone.card4.title': 'Marca & Design',
    'backbone.card4.desc': 'Posicionamento premium, clareza de categoria e storytelling que reflete a realidade.',
    'backbone.card5.title': 'Sistema Operacional',
    'backbone.card5.desc': 'Governança, cadência, relatórios e disciplina na tomada de decisões.',
    'backbone.card6.title': 'Crescimento & GTM',
    'backbone.card6.desc': 'Movimento de vendas, precificação, funis, parcerias, construído para cashflow.',
    
    // Why Brazil, Why Now
    'whybrazil.title': 'Brasil é o maior mercado de compounding negligenciado.',
    'whybrazil.bullet1': 'Indústrias massivas focadas em serviços onde workflows ainda são manuais e fragmentados.',
    'whybrazil.bullet2': 'IA está no início da produção: líderes de categoria ainda não foram coroados.',
    'whybrazil.bullet3': 'Baixa saturação de produtos cria espaço para novos negócios que definem categorias.',
    'whybrazil.bullet4': 'Velocidade + disciplina vence hype em mercados com complexidade operacional real.',
    
    // Build-to-Compound
    'compound.title': 'Build-to-Compound.',
    'compound.subtitle': 'Não construímos para exits. Construímos negócios duráveis que geram caixa e fazem compound por décadas.',
    'compound.principle1': 'Cashflow é a tração mais honesta.',
    'compound.principle2': 'Provar unit economics cedo (LTV:CAC desde o dia um).',
    'compound.principle3': 'Retenção vence métricas de vaidade (uso real, stickiness real).',
    'compound.principle4': 'Moats são construídos, não reivindicados (loops, lock-in, redes).',
    
    // Thesis (for tabs)
    'thesis.tab': 'Build-to-Compound',
    'thesis.intro': 'Não construímos para exits. Construímos negócios duráveis que geram caixa e fazem compound por décadas.',
    'thesis.step1.title': 'Cashflow First',
    'thesis.step1.desc': 'Provar unit economics cedo. LTV:CAC desde o dia um. Caixa é a tração mais honesta.',
    'thesis.step2.title': 'Retenção > Vaidade',
    'thesis.step2.desc': 'Uso real, stickiness real. Otimizamos para o usuário que fica, não o que se inscreve.',
    'thesis.step3.title': 'Construir Moats',
    'thesis.step3.desc': 'Efeitos de rede, custos de troca, loops de dados. Moats são construídos através de compounding, não reivindicados.',
    
    // What We Don't Do
    'dontdo.title': 'O que não fazemos.',
    'dontdo.tab': 'Filtro Anti-Hype',
    'dontdo.intro': 'Sem turistas. Sem teatro. Filtramos o ruído e focamos no que realmente funciona.',
    'dontdo.item1': 'Não perseguimos mercados hype-first sem vantagem operacional.',
    'dontdo.item2': 'Não construímos serviços disfarçados de software.',
    'dontdo.item3': 'Não dependemos de fundraising como modelo de negócio.',
    'dontdo.item4': 'Não fazemos ciclos longos de R&D antes da demanda ser provada.',
    'dontdo.item5': 'Não contratamos para manchetes, contratamos para execução.',
    'dontdo.item6': 'Não otimizamos para demo day, otimizamos para a semana 52.',
    'dontdo.bullet1': 'Não perseguimos mercados hype-first sem vantagem operacional.',
    'dontdo.bullet2': 'Não construímos serviços disfarçados de software.',
    'dontdo.bullet3': 'Não dependemos de fundraising como modelo de negócio.',
    'dontdo.bullet4': 'Não fazemos ciclos longos de R&D antes da demanda ser provada.',
    'dontdo.tagline': 'Sem turistas. Sem teatro. Apenas operadores construindo para a realidade.',
    
    // Where Avante Fits
    'fits.title': 'Onde Avante se encaixa.',
    'fits.tab': 'Onde nos Encaixamos',
    'fits.intro': 'Não somos uma VC. Nem uma aceleradora. Nem uma agência. Somos os três, e nenhum deles.',
    'fits.column.traditional': 'Modelo Tradicional',
    'fits.column.avante': 'Avante',
    'fits.traditional.item1': 'Investe apenas capital',
    'fits.traditional.item2': 'Fornece mentoria',
    'fits.traditional.item3': 'Programas de curto prazo',
    'fits.traditional.item4': 'Abordagem hands-off',
    'fits.avante.item1': 'Co-constrói + financia',
    'fits.avante.item2': 'Estrutura completa de execução',
    'fits.avante.item3': 'Parceria de longo prazo',
    'fits.avante.item4': 'Hands-on diário',
    'fits.tagline': 'Co-fundamos, construímos, financiamos e escalamos sob um sistema operacional único.',
    'fits.vc': 'VC: investe capital, não co-constrói diariamente.',
    'fits.accelerator': 'Aceleradora: ajuda fundadores, não fornece estrutura de execução.',
    'fits.agency': 'Agência: entrega para clientes, não possui e faz compound do venture.',
    'fits.avante': 'Avante: co-funda + constrói + financia + escala sob um sistema operacional único.',
    
    // Team
    'team.title': 'Construído por operadores que já estiveram lá.',
    "team.subtitle": "Construímos, escalamos e saímos. Agora estamos aplicando esse reconhecimento de padrões para construir os próximos líderes de categoria do Brasil.",
    'team.location.sf': 'San Francisco',
    'team.location.sp': 'São Paulo',
    'team.role.cofounder': 'Co-Fundador',
    'team.role.cofounderM': 'Co-Fundadora',
    'team.role.strategicpartner': 'Parceiro Estratégico',
    'team.andrea.desc': 'Líder de produto na [Empresa]. Lançou produtos 0→1, escalou times, navegou aquisição.',
    'team.jess.desc': 'Líder de engenharia na [Empresa]. Construiu infraestrutura em escala, expertise profunda em IA/ML.',
    'team.amanda.desc': 'Operadora na [Empresa Brasileira]. Expertise profunda em mercado vertical, execução de go-to-market.',
    'team.felipe.desc': 'Constructor na [Startup Brasileira]. Velocidade de produto, execução técnica, levantou capital.',
    "team.quote": "Não somos turistas. Construímos, escalamos e saímos. Agora estamos aplicando esse reconhecimento de padrões para construir os próximos líderes de categoria do Brasil.",
    
    // Logo Strip
    'logos.title': 'Operadores que construíram, escalaram e saíram, agora aplicando esse reconhecimento de padrões no Brasil.',
    'logos.subtitle': 'Nosso ecossistema: ventures que construímos e parceiros com quem operamos.',
    
    // FAQ - OPTIMIZED FOR CLARITY & TRUST
    'faq.title': 'Perguntas Frequentes',
    'faq.q1': 'Quem deve fazer parceria com Avante?',
    'faq.a1': 'Operadores e fundadores construindo software alimentado por IA para indústrias focadas em serviços no Brasil. Você deve ter expertise de domínio e querer suporte hands-on de construtores experientes.',
    'faq.q2': 'Quanto capital vocês fornecem?',
    'faq.a2': 'Para venture builds: Capital pré-seed a seed vinculado a milestones. Para investimentos iniciais: Lideramos ou co-lideramos rodadas pré-tração, tipicamente $250K-$2M.',
    'faq.q3': 'O que vocês fornecem além de capital?',
    'faq.a3': 'Suporte de execução completo: Time de desenvolvimento de produto, infraestrutura de engenharia, estratégia de go-to-market, orientação para fundraising e sistemas de governança. Trabalhamos ao seu lado diariamente.',
    'faq.q4': 'Que participação acionária vocês tomam?',
    "faq.a4": "Varia por modelo. Venture builds: Equity alinhada de co-fundador. Investimentos iniciais: Termos padrão de pré-seed/seed a valor justo de mercado. Otimizamos para alinhamento de longo prazo, não propriedade máxima.",
    'faq.q5': 'Quanto tempo leva para começar?',
    'faq.a5': 'Após conversa inicial: 1-2 semanas para avaliação de venture build, 2-4 semanas para due diligence de investimento. Nos movemos rápido quando vemos um fit.',
    'faq.q6': 'Como faço para me candidatar ou entrar em contato?',
    'faq.a6': 'Clique em "Iniciar uma Conversa" acima. Inclua: o que você está construindo, seu background, estágio atual e por que Brasil. Respondemos toda consulta séria em até 48 horas.',
    
    // Footer
    'footer.tagline': 'Construindo campeões verticais AI-native no Brasil.',
    'footer.company': 'Empresa',
    'footer.connect': 'Conectar',
    'footer.resources': 'Recursos',
    'footer.thesis': 'Tese',
    'footer.playbook': 'Playbook',
    'footer.team': 'Time',
    'footer.faq': 'FAQ',
    'footer.whyavante': 'Por que Avante',
    'footer.library': 'Biblioteca',
    'footer.copyright': '© 2026 Avante. Todos os direitos reservados.',

    // Why Avante Page
    'whyavante.backhome': 'Voltar ao Início',
    'whyavante.hero.badge': 'Dados & Fatos',
    'whyavante.hero.title': 'Venture Studios Retornam ~50% ao Ano. VCs Tradicionais Retornam ~19%.',
    'whyavante.hero.subtitle': 'Co-construímos empresas do zero e investimos antes do consenso. Sem esperar por tração. Sem seguir multidões. Dados da GSSN provam: venture building + primeiros tickets superam todas as classes de ativos.',
    
    // Stats
    'whyavante.stats.stat1': 'Retorno Anual Médio (Venture Studios)',
    'whyavante.stats.stat2': 'Maior que VCs Tradicionais',
    'whyavante.stats.stat3': 'Taxa de Sucesso Maior',
    
    // Problem Section
    'whyavante.problem.title': 'O Modelo Tradicional está Quebrado',
    'whyavante.problem.subtitle': 'Venture capital em mercados emergentes segue um padrão previsível: esperar por tração, perseguir consenso, diluir fundadores e torcer por exits. Isso cria incentivos desalinhados e resultados medíocres.',
    'whyavante.problem.issue1.label': 'Problema #1',
    'whyavante.problem.issue1.title': 'VCs Esperam por Tração',
    'whyavante.problem.issue1.description': 'Fundos tradicionais deployam capital apenas após o risco ser reduzido. Nesse ponto, o preço está alto, equity diluído e upside limitado.',
    'whyavante.problem.issue2.label': 'Problema #2',
    'whyavante.problem.issue2.title': 'Fundadores Carecem de Suporte de Execução',
    'whyavante.problem.issue2.description': 'Mentoria e intros de rede não são suficientes. Fundadores precisam de produto, capital, distribuição e sistemas desde o dia zero.',
    'whyavante.problem.issue3.label': 'Problema #3',
    'whyavante.problem.issue3.title': 'Mentalidade Exit-First',
    'whyavante.problem.issue3.description': 'Quando o modelo de negócio é rodadas de fundraising e flips, os incentivos quebram. Negócios reais fazem compound, não otimizam para demo day.',
    
    // Comparison & Returns
    'whyavante.comparison.title': 'Venture Studio vs Capital Tradicional',
    'whyavante.comparison.description': 'Enquanto VCs escrevem cheques e esperam, venture studios co-constroem do zero com execução hands-on. A diferença é estrutural, e os retornos refletem isso.',
    'whyavante.returns.title': 'Os Dados: Venture Studios Superam',
    'whyavante.returns.description': 'Venture studios lideram todas as classes de ativos com ~50% de retornos anualizados, o dobro de aceleradoras e cerca de 2.5x de VCs tradicionais. Isso não é sorte. É um modelo operacional superior.',
    'whyavante.returns.source': 'Fonte: GSSN Global Venture Studio Report 2023',
    
    // The Avante Dual Model
    'whyavante.model.title': 'O Modelo Dual Avante',
    'whyavante.model.subtitle': 'Combinamos o melhor de venture building E investimento de primeiro ticket. Dois caminhos, um sistema, resultados compostos.',
    
    'whyavante.model.path1.badge': 'Caminho 1',
    'whyavante.model.path1.title': 'Venture Building',
    'whyavante.model.path1.description': 'Co-fundamos do zero em verticais onde IA cria vantagens de 10x. Estrutura completa de execução, capital pré-tração, equity alinhado.',
    'whyavante.model.path1.point1': 'Pesquisar oportunidades AI-native em indústrias focadas em serviços',
    'whyavante.model.path1.point2': 'Parceria com operadores de domínio que conhecem o workflow',
    'whyavante.model.path1.point3': 'Construir MVPs em 8–12 semanas com nosso time de produto + engenharia',
    'whyavante.model.path1.point4': 'Provar unit economics cedo, escalar com disciplina de cashflow',
    
    'whyavante.model.path2.badge': 'Caminho 2',
    'whyavante.model.path2.title': 'Primeiros Tickets',
    'whyavante.model.path2.description': 'Investimos pré-tração em fundadores excepcionais construindo líderes de categoria AI-native. Entramos antes do consenso, ganhamos melhor preço e escalamos com governança.',
    'whyavante.model.path2.point1': 'Identificar mega-vencedores antes do mercado ver o sinal',
    'whyavante.model.path2.point2': 'Liderar rodadas com capital estratégico + suporte operacional',
    'whyavante.model.path2.point3': 'Fornecer a estrutura de recursos: produto, GTM, sistemas',
    'whyavante.model.path2.point4': 'Manter por décadas: compound, não flip',
    
    // Why This Matters
    'whyavante.matters.title': 'Por que isso Importa para o Brasil',
    'whyavante.matters.point1.title': 'Hands-On desde o Dia Zero',
    'whyavante.matters.point1.description': 'Não esperamos os fundadores descobrirem. Co-construímos com produto, capital e distribuição desde o dia um.',
    'whyavante.matters.point2.title': 'Capital Pré-Tração',
    'whyavante.matters.point2.description': 'Primeiros tickets nos dão o melhor preço, mais equity e controle sobre direção estratégica antes do mercado ficar ruidoso.',
    'whyavante.matters.point3.title': 'Capital Efficient por Design',
    'whyavante.matters.point3.description': 'Otimizamos para cashflow e unit economics, não métricas de vaidade. Cada dólar deployado está vinculado a tração real.',
    'whyavante.matters.point4.title': 'Compounding ao Invés de Exits',
    'whyavante.matters.point4.description': 'Construímos para manter por décadas. Os melhores resultados vêm de negócios que fazem compound, não otimizados para demo day.',
    
    // Why Brazil, Why Now
    'whyavante.brazil.title': 'Por que Brasil, Por que Agora',
    'whyavante.brazil.subtitle': 'Brasil é o maior mercado de compounding negligenciado do mundo. Indústrias massivas focadas em serviços, baixa saturação de produtos e IA criando vantagens geracionais, agora mesmo.',
    'whyavante.brazil.point1.label': 'Tamanho de Mercado',
    'whyavante.brazil.point1.text': '215M de população, economia de $2T+, ainda dramaticamente mal servida por software.',
    'whyavante.brazil.point2.label': 'Complexidade Operacional',
    'whyavante.brazil.point2.text': 'Indústrias focadas em serviços onde workflows são manuais, fragmentados e maduros para automação de IA.',
    'whyavante.brazil.point3.label': 'Adoção Inicial de IA',
    'whyavante.brazil.point3.text': 'IA está em produção mas líderes de categoria ainda não foram coroados. Velocidade + disciplina vence.',
    'whyavante.brazil.point4.label': 'Baixa Saturação',
    'whyavante.brazil.point4.text': 'Espaço para novos negócios que definem categorias. Não competindo com 50 copycats.',
    'whyavante.brazil.point5.label': 'Vantagem Local',
    'whyavante.brazil.point5.text': 'Expertise profunda de domínio, redes de operadores e distribuição que players internacionais não conseguem replicar.',
    'whyavante.brazil.point6.label': 'Capital Efficient',
    'whyavante.brazil.point6.text': 'Construir por menos, ganhar tração mais rápido, fazer compound sem precisar de mega rodadas.',
    
    // CTA
    'whyavante.cta.title': 'Pronto para Construir do Jeito Avante?',
    'whyavante.cta.description': 'Junte-se a operadores, construtores e investidores criando a próxima geração de líderes de categoria AI-native do Brasil. Sem turistas. Sem hype. Só execução.',
    'whyavante.cta.button': 'Seja Parceiro Avante',
    
    // Library Page
    'library.backhome': 'Voltar ao Início',
    'library.hero.badge': 'Pesquisa & Insights',
    'library.hero.title': 'Insights de Venture Building para Operadores',
    'library.hero.subtitle': 'Relatórios de pesquisa, playbooks e estudos de caso sobre venture studios, investimento de primeiro ticket, negócios AI-native e oportunidades no Brasil. Escritos por operadores que construíram e escalaram empresas.',
    'library.hero.stats': '9 Recursos • Atualizado Semanalmente',
    
    // Categories
    'library.category.all': 'Todos',
    'library.category.insights': 'Insights',
    'library.category.research': 'Pesquisa',
    'library.category.casestudies': 'Casos de Estudo',
    'library.category.playbooks': 'Playbooks',
    'library.category.brazil': 'Mercado Brasil',
    'library.category.ai': 'IA & Tech',
    
    // CTA
    'library.cta.title': 'Receba Novas Pesquisas & Insights',
    'library.cta.description': 'Junte-se a operadores, investidores e construtores recebendo insights semanais sobre venture building, negócios AI-native e oportunidades em mercados emergentes.',
    'library.cta.placeholder': 'seu@email.com',
    'library.cta.button': 'Inscrever',
    'library.cta.note': 'Um email por semana. Sem spam. Cancele quando quiser.',
  },
  en: {
    // Nav
    'nav.thesis': 'Thesis',
    'nav.playbook': 'Playbook',
    'nav.team': 'Team',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.what': 'What We Do',
    'nav.brazil': 'Brazil',
    'nav.cta': 'Get Started',
    'nav.cta.primary': 'Partner with Avante',
    'nav.cta.secondary': 'See the System',
    
    // Hero - OPTIMIZED FOR CLARITY (Y Combinator Rules)
    'hero.tagline': 'Venture Building + Early-Stage Investment',
    'hero.headline': 'We co-found companies from scratch and invest in pre-traction startups in Brazil.',
    'hero.subheadline': 'Avante provides capital, product development, engineering, and go-to-market infrastructure. We either build with you from day one, or invest before your Series A.',
    'hero.cta.primary': 'Start a Conversation',
    'hero.cta.secondary': 'See the System',
    'hero.microproof': 'Build-to-compound. Cashflow first. No hype, just execution.',
    'hero.scroll': 'Scroll',
    
    // CTA Sections
    'cta.title': 'Ready to build?',
    'cta.subtitle': 'Join operators building the next generation of AI-native companies in Brazil.',
    'cta.primary': 'Start a Conversation',
    'cta.secondary': 'Meet the Team',
    'cta.compact': 'Get in Touch',
    
    // Contact Modal
    'contact.title': 'Let\'s build together',
    'contact.subtitle': 'Tell us about your vision and we\'ll get back to you within 48 hours.',
    'contact.success': 'Message sent! We\'ll be in touch soon.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company (optional)',
    'contact.form.message': 'What are you building?',
    'contact.form.stage': 'Stage',
    'contact.form.stages.idea': 'Idea / Concept',
    'contact.form.stages.mvp': 'MVP / Building',
    'contact.form.stages.traction': 'Early Traction',
    'contact.form.stages.scaling': 'Scaling',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    
    // What We Do - OPTIMIZED FOR CLARITY
    'whatwedo.title.line1': 'Two ways to work with Avante:',
    'whatwedo.title.line2': 'Venture building or early-stage investment.',
    'whatwedo.bullet1': 'Path 1: Co-Build. We partner with you from day one, providing product, engineering, and capital to launch from zero.',
    'whatwedo.bullet2': 'Path 2: Invest Early. We lead pre-traction rounds in exceptional founders building AI-native category leaders.',
    'whatwedo.bullet3': 'Both Paths: Full operating support including go-to-market, capital strategy, and governance infrastructure.',
    'whatwedo.tagline': 'Avante combines venture studio execution with early-stage investment discipline.',
    
    // The Avante System
    'system.title': 'The Avante System',
    'system.subtitle': 'A repeatable loop to launch 3–4 ventures per year and compound the winners for decades.',
    'system.step1.title': 'Research the wedge',
    'system.step1.desc': 'find workflows where AI creates 10× advantage.',
    'system.step2.title': 'Partner with operators',
    'system.step2.desc': 'domain experts + builders.',
    'system.step3.title': 'Build fast',
    'system.step3.desc': 'small team, AI-powered core, rapid iteration.',
    'system.step4.title': 'Earn traction',
    'system.step4.desc': 'real users, real revenue, honest signals.',
    'system.step5.title': 'Prove unit economics',
    'system.step5.desc': 'LTV:CAC matters from day one.',
    'system.step6.title': 'Compound',
    'system.step6.desc': 'scale profitably, build durable moats.',
    'system.miniline': 'Research → Partner → Build → Traction → Revenue → Compounding.',
    
    // Resource Backbone
    'backbone.title': 'Capabilities of a scaled organization, at day zero.',
    'backbone.subtitle': 'Founders do not fail because they lack ideas. They fail because execution is fragmented. We provide the backbone.',
    'backbone.card1.title': 'Product & Engineering',
    'backbone.card1.desc': 'World-class product delivery and AI infrastructure, built to ship.',
    'backbone.card2.title': 'Capital & Deal Access',
    'backbone.card2.desc': 'Pre-traction capital + a credible path to follow-on when signals are real.',
    'backbone.card3.title': 'Domain & Distribution',
    'backbone.card3.desc': 'Local Brazil advantage + operator networks to reach customers fast.',
    'backbone.card4.title': 'Brand & Design',
    'backbone.card4.desc': 'Premium positioning, category clarity, and storytelling that matches reality.',
    'backbone.card5.title': 'Operating System',
    'backbone.card5.desc': 'Governance, cadence, reporting, and decision-making discipline.',
    'backbone.card6.title': 'Growth & GTM',
    'backbone.card6.desc': 'Sales motion, pricing, funnels, partnerships, built for cashflow.',
    
    // Why Brazil, Why Now
    'whybrazil.title': 'Brazil is the biggest overlooked compounding market.',
    'whybrazil.bullet1': 'Massive service-heavy industries where workflows are still manual and fragmented.',
    'whybrazil.bullet2': 'AI is early in production: category leaders are not crowned yet.',
    'whybrazil.bullet3': 'Low product saturation creates room for new category-defining businesses.',
    'whybrazil.bullet4': 'Speed + discipline beats hype in markets with real operational complexity.',
    
    // Build-to-Compound
    'compound.title': 'Build-to-Compound.',
    'compound.subtitle': 'We do not build for exits. We build durable businesses that generate cash and compound for decades.',
    'compound.principle1': 'Cashflow is the most honest traction.',
    'compound.principle2': 'Prove unit economics early (LTV:CAC from day one).',
    'compound.principle3': 'Retention beats vanity metrics (real usage, real stickiness).',
    'compound.principle4': 'Moats are built, not claimed (loops, lock-in, networks).',
    
    // Thesis (for tabs)
    'thesis.tab': 'Build-to-Compound',
    'thesis.intro': 'We do not build for exits. We build durable businesses that generate cash and compound for decades.',
    'thesis.step1.title': 'Cashflow First',
    'thesis.step1.desc': 'Prove unit economics early. LTV:CAC from day one. Cash is the most honest traction.',
    'thesis.step2.title': 'Retention > Vanity',
    'thesis.step2.desc': 'Real usage, real stickiness. We optimize for the user who stays, not the one who signs up.',
    'thesis.step3.title': 'Build Moats',
    'thesis.step3.desc': 'Network effects, switching costs, data loops. Moats are built through compounding, not claimed.',
    
    // What We Don't Do
    'dontdo.title': 'What we do not do.',
    'dontdo.tab': 'Anti-Hype Filter',
    'dontdo.intro': 'No tourists. No theater. We filter out the noise and focus on what actually works.',
    'dontdo.item1': 'We do not chase hype-first markets with no operational edge.',
    'dontdo.item2': 'We do not build services disguised as software.',
    'dontdo.item3': 'We do not depend on fundraising as the business model.',
    'dontdo.item4': 'We do not run long R&D cycles before demand is proven.',
    'dontdo.item5': 'We do not hire for headlines, we hire for execution.',
    'dontdo.item6': 'We do not optimize for demo day, we optimize for week 52.',
    'dontdo.bullet1': 'We do not chase hype-first markets with no operational edge.',
    'dontdo.bullet2': 'We do not build services disguised as software.',
    'dontdo.bullet3': 'We do not depend on fundraising as the business model.',
    'dontdo.bullet4': 'We do not run long R&D cycles before demand is proven.',
    'dontdo.tagline': 'No tourists. No theater. Just operators building for reality.',
    
    // Where Avante Fits
    'fits.title': 'Where Avante fits.',
    'fits.tab': 'Where We Fit',
    'fits.intro': 'We are not a VC. Not an accelerator. Not an agency. We are all three, and none of them.',
    'fits.column.traditional': 'Traditional Model',
    'fits.column.avante': 'Avante',
    'fits.traditional.item1': 'Invests capital only',
    'fits.traditional.item2': 'Provides mentorship',
    'fits.traditional.item3': 'Short-term programs',
    'fits.traditional.item4': 'Hands-off approach',
    'fits.avante.item1': 'Co-builds + funds',
    'fits.avante.item2': 'Full execution backbone',
    'fits.avante.item3': 'Long-term partnership',
    'fits.avante.item4': 'Hands-on daily',
    'fits.tagline': 'We co-found, build, fund, and scale under one operating system.',
    'fits.vc': 'VC: invests capital, does not co-build daily.',
    'fits.accelerator': 'Accelerator: helps founders, does not provide execution backbone.',
    'fits.agency': 'Agency: ships for clients, does not own and compound the venture.',
    'fits.avante': 'Avante: co-founds + builds + funds + scales under one operating system.',
    
    // Team
    'team.title': 'Built by operators who have been there.',
    "team.subtitle": "We have built, scaled, and exited. Now we are deploying that pattern recognition to build Brazil's next category leaders.",
    'team.location.sf': 'San Francisco',
    'team.location.sp': 'São Paulo',
    'team.role.cofounder': 'Co-Founder',
    'team.role.cofounderM': 'Co-Founder',
    'team.role.strategicpartner': 'Strategic Partner',
    'team.andrea.desc': 'Product leader at [Company]. Shipped 0→1 products, scaled teams, navigated acquisition.',
    'team.jess.desc': 'Engineering leader at [Company]. Built infrastructure at scale, deep AI/ML expertise.',
    'team.amanda.desc': 'Operator at [Brazilian Company]. Deep vertical market expertise, go-to-market execution.',
    'team.felipe.desc': 'Builder at [Brazilian Startup]. Product velocity, technical execution, raised capital.',
    "team.quote": "We are not tourists. We have built, scaled, and exited. Now we are deploying that pattern recognition to build Brazil's next category leaders.",
    
    // Logo Strip
    'logos.title': 'Operators who have built, scaled, and exited, now applying that pattern recognition in Brazil.',
    'logos.subtitle': 'Our ecosystem: ventures we build and partners we operate with.',
    
    // FAQ - OPTIMIZED FOR CLARITY & TRUST
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Who should partner with Avante?',
    'faq.a1': 'Operators and founders building AI-powered software for service-heavy industries in Brazil. You should have domain expertise and want hands-on support from experienced builders.',
    'faq.q2': 'How much capital do you provide?',
    'faq.a2': 'For venture builds: Pre-seed to seed stage capital tied to milestones. For early investments: We lead or co-lead pre-traction rounds, typically $250K-$2M.',
    'faq.q3': 'What do you provide beyond capital?',
    'faq.a3': 'Full execution support: Product development team, engineering infrastructure, go-to-market strategy, fundraising guidance, and governance systems. We work alongside you daily.',
    'faq.q4': 'What equity stake do you take?',
    "faq.a4": "It varies by model. Venture builds: Aligned co-founder equity. Early investments: Standard pre-seed/seed terms at fair market value. We optimize for long-term alignment, not maximum ownership.",
    'faq.q5': 'How long does it take to get started?',
    'faq.a5': 'After initial conversation: 1-2 weeks for venture build assessment, 2-4 weeks for investment diligence. We move fast when we see a fit.',
    'faq.q6': 'How do I apply or get in touch?',
    'faq.a6': 'Click "Start a Conversation" above. Include: what you\'re building, your background, current stage, and why Brazil. We respond to every serious inquiry within 48 hours.',
    
    // Footer
    'footer.tagline': 'Building AI-native vertical champions in Brazil.',
    'footer.company': 'Company',
    'footer.connect': 'Connect',
    'footer.resources': 'Resources',
    'footer.thesis': 'Thesis',
    'footer.playbook': 'Playbook',
    'footer.team': 'Team',
    'footer.faq': 'FAQ',
    'footer.whyavante': 'Why Avante',
    'footer.library': 'Library',
    'footer.copyright': '© 2026 Avante. All rights reserved.',

    // Why Avante Page
    'whyavante.backhome': 'Back to Home',
    'whyavante.hero.badge': 'Data & Facts',
    'whyavante.hero.title': 'Venture Studios Return ~50% Annually. Traditional VCs Return ~19%.',
    'whyavante.hero.subtitle': 'We co-build companies from scratch and invest pre-consensus. No waiting for traction. No following crowds. Data from GSSN proves: venture building + first tickets outperform every asset class.',
    
    // Stats
    'whyavante.stats.stat1': 'Avg. Annual Return (Venture Studios)',
    'whyavante.stats.stat2': 'Higher Than Traditional VC',
    'whyavante.stats.stat3': 'Higher Success Rate',
    
    // Problem Section
    'whyavante.problem.title': 'The Traditional Model is Broken',
    'whyavante.problem.subtitle': 'Venture capital in emerging markets follows a predictable pattern: wait for traction, chase consensus, dilute founders, and hope for exits. This creates misaligned incentives and mediocre outcomes.',
    'whyavante.problem.issue1.label': 'Issue #1',
    'whyavante.problem.issue1.title': 'VCs Wait for Traction',
    'whyavante.problem.issue1.description': 'Traditional funds deploy capital only after risk is reduced. By then, price is high, equity is diluted, and upside is capped.',
    'whyavante.problem.issue2.label': 'Issue #2',
    'whyavante.problem.issue2.title': 'Founders Lack Execution Support',
    'whyavante.problem.issue2.description': 'Mentorship and network intros are not enough. Founders need product, capital, distribution, and systems from day zero.',
    'whyavante.problem.issue3.label': 'Issue #3',
    'whyavante.problem.issue3.title': 'Exit-First Mindset',
    'whyavante.problem.issue3.description': 'When the business model is fundraising rounds and flips, incentives break. Real businesses compound, they don\'t optimize for demo day.',
    
    // Comparison & Returns
    'whyavante.comparison.title': 'Venture Studio vs Traditional Capital',
    'whyavante.comparison.description': 'While VCs write checks and wait, venture studios co-build from scratch with hands-on execution. The difference is structural, and the returns reflect it.',
    'whyavante.returns.title': 'The Data: Venture Studios Outperform',
    'whyavante.returns.description': 'Venture studios lead all asset classes with ~50% annualized returns, double that of accelerators and roughly 2.5x traditional VC. This isn\'t luck. It\'s a superior operating model.',
    'whyavante.returns.source': 'Source: GSSN Global Venture Studio Report 2023',
    
    // The Avante Dual Model
    'whyavante.model.title': 'The Avante Dual Model',
    'whyavante.model.subtitle': 'We combine the best of venture building AND first-ticket investing. Two paths, one system, compounding outcomes.',
    
    'whyavante.model.path1.badge': 'Path 1',
    'whyavante.model.path1.title': 'Venture Building',
    'whyavante.model.path1.description': 'We co-found from scratch in verticals where AI creates 10x advantages. Full execution backbone, pre-traction capital, aligned equity.',
    'whyavante.model.path1.point1': 'Research AI-native opportunities in service-heavy industries',
    'whyavante.model.path1.point2': 'Partner with domain operators who know the workflow',
    'whyavante.model.path1.point3': 'Build MVPs in 8–12 weeks with our product + engineering team',
    'whyavante.model.path1.point4': 'Prove unit economics early, scale with cashflow discipline',
    
    'whyavante.model.path2.badge': 'Path 2',
    'whyavante.model.path2.title': 'First Tickets',
    'whyavante.model.path2.description': 'We invest pre-traction in exceptional founders building AI-native category leaders. We enter before consensus, earn best price, and scale with governance.',
    'whyavante.model.path2.point1': 'Identify mega-winners before the market sees the signal',
    'whyavante.model.path2.point2': 'Lead rounds with strategic capital + operating support',
    'whyavante.model.path2.point3': 'Provide the resource backbone: product, GTM, systems',
    'whyavante.model.path2.point4': 'Hold for decades: compound, don\'t flip',
    
    // Why This Matters
    'whyavante.matters.title': 'Why This Matters for Brazil',
    'whyavante.matters.point1.title': 'Hands-On from Day Zero',
    'whyavante.matters.point1.description': 'We don\'t wait for founders to figure it out. We co-build with product, capital, and distribution from day one.',
    'whyavante.matters.point2.title': 'Pre-Traction Capital',
    'whyavante.matters.point2.description': 'First tickets give us the best price, the most equity, and control over strategic direction before the market gets noisy.',
    'whyavante.matters.point3.title': 'Capital Efficient by Design',
    'whyavante.matters.point3.description': 'We optimize for cashflow and unit economics, not vanity metrics. Every dollar deployed is tied to real traction.',
    'whyavante.matters.point4.title': 'Compounding Over Exits',
    'whyavante.matters.point4.description': 'We build to hold for decades. The best outcomes come from businesses that compound, not ones optimized for demo day.',
    
    // Why Brazil, Why Now
    'whyavante.brazil.title': 'Why Brazil, Why Now',
    'whyavante.brazil.subtitle': 'Brazil is the biggest overlooked compounding market in the world. Massive service-heavy industries, low product saturation, and AI creating generational advantages, right now.',
    'whyavante.brazil.point1.label': 'Market Size',
    'whyavante.brazil.point1.text': '215M population, $2T+ economy, yet dramatically underserved by software.',
    'whyavante.brazil.point2.label': 'Operational Complexity',
    'whyavante.brazil.point2.text': 'Service-heavy industries where workflows are manual, fragmented, and ripe for AI automation.',
    'whyavante.brazil.point3.label': 'Early AI Adoption',
    'whyavante.brazil.point3.text': 'AI is in production but category leaders are not crowned yet. Speed + discipline wins.',
    'whyavante.brazil.point4.label': 'Low Saturation',
    'whyavante.brazil.point4.text': 'Room for new category-defining businesses. Not competing with 50 copycats.',
    'whyavante.brazil.point5.label': 'Local Advantage',
    'whyavante.brazil.point5.text': 'Deep domain expertise, operator networks, and distribution that international players can\'t replicate.',
    'whyavante.brazil.point6.label': 'Capital Efficient',
    'whyavante.brazil.point6.text': 'Build for less, earn traction faster, compound without needing mega rounds.',
    
    // CTA
    'whyavante.cta.title': 'Ready to Build the Avante Way?',
    'whyavante.cta.description': 'Join operators, builders, and investors creating Brazil\'s next generation of AI-native category leaders. No tourists. No hype. Just execution.',
    'whyavante.cta.button': 'Partner with Avante',
    
    // Library Page
    'library.backhome': 'Back to Home',
    'library.hero.badge': 'Research & Insights',
    'library.hero.title': 'Venture Building Insights for Operators',
    'library.hero.subtitle': 'Research reports, playbooks, and case studies on venture studios, first-ticket investing, AI-native businesses, and Brazil opportunities. Written by operators who have built and scaled companies.',
    'library.hero.stats': '9 Resources • Updated Weekly',
    
    // Categories
    'library.category.all': 'All',
    'library.category.insights': 'Insights',
    'library.category.research': 'Research',
    'library.category.casestudies': 'Case Studies',
    'library.category.playbooks': 'Playbooks',
    'library.category.brazil': 'Brazil Market',
    'library.category.ai': 'AI & Tech',
    
    // CTA
    'library.cta.title': 'Get New Research & Insights',
    'library.cta.description': 'Join operators, investors, and builders getting weekly insights on venture building, AI-native businesses, and emerging market opportunities.',
    'library.cta.placeholder': 'your@email.com',
    'library.cta.button': 'Subscribe',
    'library.cta.note': 'One email per week. No spam. Unsubscribe anytime.',
  },

  // Spanish translations — added in Round 6. Mirrors the EN dictionary 1:1
  // so any key resolved through `t()` returns native Spanish copy. Strings
  // are written in neutral LATAM Spanish (no Spain regionalisms), tuned for
  // the same operator + investor audience that reads the EN/PT versions.
  es: {
    // Nav
    'nav.thesis': 'Tesis',
    'nav.playbook': 'Playbook',
    'nav.team': 'Equipo',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    'nav.what': 'Qué Hacemos',
    'nav.brazil': 'Brasil',
    'nav.cta': 'Empezar',
    'nav.cta.primary': 'Asóciate con Avante',
    'nav.cta.secondary': 'Ver el Sistema',

    // Hero
    'hero.tagline': 'Venture Building + Inversión en Etapa Temprana',
    'hero.headline': 'Co-fundamos empresas desde cero e invertimos en startups pre-tracción en Brasil.',
    'hero.subheadline': 'Avante aporta capital, desarrollo de producto, ingeniería e infraestructura de go-to-market. O construimos contigo desde el día uno, o invertimos antes de tu Serie A.',
    'hero.cta.primary': 'Iniciar una Conversación',
    'hero.cta.secondary': 'Ver el Sistema',
    'hero.microproof': 'Build-to-compound. Cashflow primero. Sin hype, solo ejecución.',
    'hero.scroll': 'Bajar',

    // CTA Sections
    'cta.title': '¿Listo para construir?',
    'cta.subtitle': 'Únete a operadores construyendo la próxima generación de empresas AI-native en Brasil.',
    'cta.primary': 'Iniciar una Conversación',
    'cta.secondary': 'Conoce al Equipo',
    'cta.compact': 'Contáctanos',

    // Contact Modal
    'contact.title': 'Construyamos juntos',
    'contact.subtitle': 'Cuéntanos sobre tu visión y te respondemos en menos de 48 horas.',
    'contact.success': '¡Mensaje enviado! Te contactaremos pronto.',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.company': 'Empresa (opcional)',
    'contact.form.message': '¿Qué estás construyendo?',
    'contact.form.stage': 'Etapa',
    'contact.form.stages.idea': 'Idea / Concepto',
    'contact.form.stages.mvp': 'MVP / Construyendo',
    'contact.form.stages.traction': 'Tracción Inicial',
    'contact.form.stages.scaling': 'Escalando',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.submitting': 'Enviando...',

    // What We Do
    'whatwedo.title.line1': 'Dos formas de trabajar con Avante:',
    'whatwedo.title.line2': 'Venture building o inversión en etapa temprana.',
    'whatwedo.bullet1': 'Camino 1: Co-Construir. Somos socios desde el día uno, aportando producto, ingeniería y capital para lanzar desde cero.',
    'whatwedo.bullet2': 'Camino 2: Invertir Temprano. Lideramos rondas pre-tracción en fundadores excepcionales construyendo líderes de categoría AI-native.',
    'whatwedo.bullet3': 'Ambos Caminos: Soporte operativo completo incluyendo go-to-market, estrategia de capital e infraestructura de gobernanza.',
    'whatwedo.tagline': 'Avante combina ejecución de venture studio con disciplina de inversión en etapa temprana.',

    // The Avante System
    'system.title': 'El Sistema Avante',
    'system.subtitle': 'Un loop repetible para lanzar 3–4 ventures por año y hacer compound de los ganadores por décadas.',
    'system.step1.title': 'Investigar la cuña',
    'system.step1.desc': 'encontrar workflows donde la IA crea ventaja de 10×.',
    'system.step2.title': 'Asociarse con operadores',
    'system.step2.desc': 'expertos de dominio + constructores.',
    'system.step3.title': 'Construir rápido',
    'system.step3.desc': 'equipo pequeño, núcleo con IA, iteración rápida.',
    'system.step4.title': 'Ganar tracción',
    'system.step4.desc': 'usuarios reales, ingresos reales, señales honestas.',
    'system.step5.title': 'Probar unit economics',
    'system.step5.desc': 'LTV:CAC importa desde el día uno.',
    'system.step6.title': 'Compound',
    'system.step6.desc': 'escalar con rentabilidad, construir moats duraderos.',
    'system.miniline': 'Investigar → Asociar → Construir → Tracción → Ingresos → Compounding.',

    // Resource Backbone
    'backbone.title': 'Capacidades de una organización escalada, desde el día cero.',
    'backbone.subtitle': 'Los fundadores no fallan por falta de ideas. Fallan porque la ejecución está fragmentada. Nosotros aportamos la espina dorsal.',
    'backbone.card1.title': 'Producto e Ingeniería',
    'backbone.card1.desc': 'Entrega de producto de clase mundial e infraestructura de IA, construida para entregar.',
    'backbone.card2.title': 'Capital y Acceso a Deal Flow',
    'backbone.card2.desc': 'Capital pre-tracción + un camino creíble al follow-on cuando las señales son reales.',
    'backbone.card3.title': 'Dominio y Distribución',
    'backbone.card3.desc': 'Ventaja local en Brasil + redes de operadores para llegar rápido a clientes.',
    'backbone.card4.title': 'Marca y Diseño',
    'backbone.card4.desc': 'Posicionamiento premium, claridad de categoría y storytelling que coincide con la realidad.',
    'backbone.card5.title': 'Sistema Operativo',
    'backbone.card5.desc': 'Gobernanza, cadencia, reporting y disciplina de toma de decisiones.',
    'backbone.card6.title': 'Crecimiento y GTM',
    'backbone.card6.desc': 'Motion de ventas, pricing, funnels, partnerships, construido para cashflow.',

    // Why Brazil, Why Now
    'whybrazil.title': 'Brasil es el mercado de compounding más subestimado.',
    'whybrazil.bullet1': 'Industrias enormes intensivas en servicios donde los workflows siguen siendo manuales y fragmentados.',
    'whybrazil.bullet2': 'La IA está temprano en producción: los líderes de categoría aún no están coronados.',
    'whybrazil.bullet3': 'Baja saturación de producto crea espacio para nuevos negocios que definen categoría.',
    'whybrazil.bullet4': 'Velocidad + disciplina vence al hype en mercados con complejidad operativa real.',

    // Build-to-Compound
    'compound.title': 'Build-to-Compound.',
    'compound.subtitle': 'No construimos para exits. Construimos negocios duraderos que generan caja y hacen compound por décadas.',
    'compound.principle1': 'El cashflow es la tracción más honesta.',
    'compound.principle2': 'Probar unit economics temprano (LTV:CAC desde el día uno).',
    'compound.principle3': 'Retención vence métricas de vanidad (uso real, stickiness real).',
    'compound.principle4': 'Los moats se construyen, no se reclaman (loops, lock-in, redes).',

    // Thesis (for tabs)
    'thesis.tab': 'Build-to-Compound',
    'thesis.intro': 'No construimos para exits. Construimos negocios duraderos que generan caja y hacen compound por décadas.',
    'thesis.step1.title': 'Cashflow Primero',
    'thesis.step1.desc': 'Probar unit economics temprano. LTV:CAC desde el día uno. La caja es la tracción más honesta.',
    'thesis.step2.title': 'Retención > Vanidad',
    'thesis.step2.desc': 'Uso real, stickiness real. Optimizamos para el usuario que se queda, no para el que firma.',
    'thesis.step3.title': 'Construir Moats',
    'thesis.step3.desc': 'Network effects, costos de switching, loops de datos. Los moats se construyen mediante compounding, no se reclaman.',

    // What We Don't Do
    'dontdo.title': 'Lo que no hacemos.',
    'dontdo.tab': 'Filtro Anti-Hype',
    'dontdo.intro': 'Sin turistas. Sin teatro. Filtramos el ruido y nos enfocamos en lo que realmente funciona.',
    'dontdo.item1': 'No perseguimos mercados hype-first sin ventaja operativa.',
    'dontdo.item2': 'No construimos servicios disfrazados de software.',
    'dontdo.item3': 'No dependemos del fundraising como modelo de negocio.',
    'dontdo.item4': 'No corremos ciclos largos de R&D antes de probar demanda.',
    'dontdo.item5': 'No contratamos por titulares, contratamos por ejecución.',
    'dontdo.item6': 'No optimizamos para demo day, optimizamos para semana 52.',
    'dontdo.bullet1': 'No perseguimos mercados hype-first sin ventaja operativa.',
    'dontdo.bullet2': 'No construimos servicios disfrazados de software.',
    'dontdo.bullet3': 'No dependemos del fundraising como modelo de negocio.',
    'dontdo.bullet4': 'No corremos ciclos largos de R&D antes de probar demanda.',
    'dontdo.tagline': 'Sin turistas. Sin teatro. Solo operadores construyendo para la realidad.',

    // Where Avante Fits
    'fits.title': 'Dónde encaja Avante.',
    'fits.tab': 'Dónde Encajamos',
    'fits.intro': 'No somos un VC. Ni un acelerador. Ni una agencia. Somos los tres, y ninguno.',
    'fits.column.traditional': 'Modelo Tradicional',
    'fits.column.avante': 'Avante',
    'fits.traditional.item1': 'Solo invierte capital',
    'fits.traditional.item2': 'Provee mentoría',
    'fits.traditional.item3': 'Programas de corto plazo',
    'fits.traditional.item4': 'Aproximación hands-off',
    'fits.avante.item1': 'Co-construye + financia',
    'fits.avante.item2': 'Espina dorsal de ejecución completa',
    'fits.avante.item3': 'Asociación de largo plazo',
    'fits.avante.item4': 'Hands-on diariamente',
    'fits.tagline': 'Co-fundamos, construimos, financiamos y escalamos bajo un único sistema operativo.',
    'fits.vc': 'VC: invierte capital, no co-construye diariamente.',
    'fits.accelerator': 'Acelerador: ayuda a fundadores, no aporta espina dorsal de ejecución.',
    'fits.agency': 'Agencia: entrega para clientes, no es dueña ni compone valor del venture.',
    'fits.avante': 'Avante: co-funda + construye + financia + escala bajo un único sistema operativo.',

    // Team
    'team.title': 'Construido por operadores que ya han estado ahí.',
    'team.subtitle': 'Hemos construido, escalado y salido. Ahora estamos desplegando esa pattern recognition para construir los próximos líderes de categoría de Brasil.',
    'team.location.sf': 'San Francisco',
    'team.location.sp': 'São Paulo',
    'team.role.cofounder': 'Co-Fundadora',
    'team.role.cofounderM': 'Co-Fundador',
    'team.role.strategicpartner': 'Socio Estratégico',
    'team.andrea.desc': 'Líder de producto en [Empresa]. Lanzó productos 0→1, escaló equipos, navegó adquisición.',
    'team.jess.desc': 'Líder de ingeniería en [Empresa]. Construyó infraestructura a escala, profunda experiencia en AI/ML.',
    'team.amanda.desc': 'Operadora en [Empresa Brasileña]. Profunda experiencia vertical, ejecución de go-to-market.',
    'team.felipe.desc': 'Builder en [Startup Brasileña]. Velocidad de producto, ejecución técnica, levantó capital.',
    'team.quote': 'No somos turistas. Hemos construido, escalado y salido. Ahora desplegamos esa pattern recognition para construir los próximos líderes de categoría de Brasil.',

    // Logo Strip
    'logos.title': 'Operadores que han construido, escalado y salido, aplicando ahora esa pattern recognition en Brasil.',
    'logos.subtitle': 'Nuestro ecosistema: ventures que construimos y socios con los que operamos.',

    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.q1': '¿Quién debería asociarse con Avante?',
    'faq.a1': 'Operadores y fundadores construyendo software AI-powered para industrias intensivas en servicios en Brasil. Debes tener experiencia de dominio y querer soporte hands-on de builders experimentados.',
    'faq.q2': '¿Cuánto capital aportan?',
    'faq.a2': 'Para venture builds: capital pre-seed a seed atado a milestones. Para inversiones tempranas: lideramos o co-lideramos rondas pre-tracción, típicamente $250K–$2M.',
    'faq.q3': '¿Qué aportan más allá del capital?',
    'faq.a3': 'Soporte completo de ejecución: equipo de desarrollo de producto, infraestructura de ingeniería, estrategia de go-to-market, guía de fundraising y sistemas de gobernanza. Trabajamos contigo diariamente.',
    'faq.q4': '¿Qué participación accionaria toman?',
    'faq.a4': 'Varía por modelo. Venture builds: equity de co-fundador alineado. Inversiones tempranas: términos estándar pre-seed/seed a precio justo de mercado. Optimizamos para alineación de largo plazo, no para ownership máximo.',
    'faq.q5': '¿Cuánto tarda en arrancar?',
    'faq.a5': 'Después de la conversación inicial: 1–2 semanas para evaluación de venture build, 2–4 semanas para diligence de inversión. Nos movemos rápido cuando vemos un fit.',
    'faq.q6': '¿Cómo aplico o me pongo en contacto?',
    'faq.a6': 'Haz clic en "Iniciar una Conversación" arriba. Incluye: qué estás construyendo, tu background, etapa actual y por qué Brasil. Respondemos a cada consulta seria en menos de 48 horas.',

    // Footer
    'footer.tagline': 'Construyendo campeones verticales AI-native en Brasil.',
    'footer.company': 'Empresa',
    'footer.connect': 'Conecta',
    'footer.resources': 'Recursos',
    'footer.thesis': 'Tesis',
    'footer.playbook': 'Playbook',
    'footer.team': 'Equipo',
    'footer.faq': 'FAQ',
    'footer.whyavante': 'Por Qué Avante',
    'footer.library': 'Biblioteca',
    'footer.copyright': '© 2026 Avante. Todos los derechos reservados.',

    // Why Avante Page
    'whyavante.backhome': 'Volver al Inicio',
    'whyavante.hero.badge': 'Datos & Hechos',
    'whyavante.hero.title': 'Los Venture Studios Retornan ~50% Anual. Los VCs Tradicionales ~19%.',
    'whyavante.hero.subtitle': 'Co-construimos empresas desde cero e invertimos pre-consenso. Sin esperar tracción. Sin seguir multitudes. Datos de GSSN lo prueban: venture building + first tickets superan a toda otra clase de activo.',

    // Stats
    'whyavante.stats.stat1': 'Retorno Anual Promedio (Venture Studios)',
    'whyavante.stats.stat2': 'Más Alto que VC Tradicional',
    'whyavante.stats.stat3': 'Mayor Tasa de Éxito',

    // Problem Section
    'whyavante.problem.title': 'El Modelo Tradicional Está Roto',
    'whyavante.problem.subtitle': 'El venture capital en mercados emergentes sigue un patrón predecible: esperar tracción, perseguir consenso, diluir fundadores y esperar exits. Eso crea incentivos desalineados y resultados mediocres.',
    'whyavante.problem.issue1.label': 'Issue #1',
    'whyavante.problem.issue1.title': 'Los VCs Esperan Tracción',
    'whyavante.problem.issue1.description': 'Los fondos tradicionales despliegan capital solo cuando el riesgo está reducido. Para entonces, el precio es alto, el equity está diluido y el upside está acotado.',
    'whyavante.problem.issue2.label': 'Issue #2',
    'whyavante.problem.issue2.title': 'Los Fundadores Carecen de Soporte de Ejecución',
    'whyavante.problem.issue2.description': 'Mentoría e intros de network no son suficientes. Los fundadores necesitan producto, capital, distribución y sistemas desde el día cero.',
    'whyavante.problem.issue3.label': 'Issue #3',
    'whyavante.problem.issue3.title': 'Mentalidad Exit-First',
    'whyavante.problem.issue3.description': 'Cuando el modelo de negocio son rondas de fundraising y flips, los incentivos se rompen. Los negocios reales hacen compound, no optimizan para demo day.',

    // Comparison & Returns
    'whyavante.comparison.title': 'Venture Studio vs Capital Tradicional',
    'whyavante.comparison.description': 'Mientras los VCs firman cheques y esperan, los venture studios co-construyen desde cero con ejecución hands-on. La diferencia es estructural, y los retornos lo reflejan.',
    'whyavante.returns.title': 'Los Datos: Venture Studios Superan',
    'whyavante.returns.description': 'Los venture studios lideran todas las clases de activos con ~50% de retornos anualizados, el doble de los aceleradores y cerca de 2.5x el VC tradicional. Esto no es suerte. Es un modelo operativo superior.',
    'whyavante.returns.source': 'Fuente: GSSN Global Venture Studio Report 2023',

    // The Avante Dual Model
    'whyavante.model.title': 'El Modelo Dual Avante',
    'whyavante.model.subtitle': 'Combinamos lo mejor de venture building Y first-ticket investing. Dos caminos, un sistema, resultados que componen.',

    'whyavante.model.path1.badge': 'Camino 1',
    'whyavante.model.path1.title': 'Venture Building',
    'whyavante.model.path1.description': 'Co-fundamos desde cero en verticales donde la IA crea ventajas de 10x. Espina dorsal de ejecución completa, capital pre-tracción, equity alineado.',
    'whyavante.model.path1.point1': 'Investigar oportunidades AI-native en industrias intensivas en servicios',
    'whyavante.model.path1.point2': 'Asociarnos con operadores de dominio que conocen el workflow',
    'whyavante.model.path1.point3': 'Construir MVPs en 8–12 semanas con nuestro equipo de producto + ingeniería',
    'whyavante.model.path1.point4': 'Probar unit economics temprano, escalar con disciplina de cashflow',

    'whyavante.model.path2.badge': 'Camino 2',
    'whyavante.model.path2.title': 'First Tickets',
    'whyavante.model.path2.description': 'Invertimos pre-tracción en fundadores excepcionales construyendo líderes de categoría AI-native. Entramos antes del consenso, ganamos el mejor precio y escalamos con gobernanza.',
    'whyavante.model.path2.point1': 'Identificar mega-ganadores antes de que el mercado vea la señal',
    'whyavante.model.path2.point2': 'Liderar rondas con capital estratégico + soporte operativo',
    'whyavante.model.path2.point3': 'Aportar la espina dorsal de recursos: producto, GTM, sistemas',
    'whyavante.model.path2.point4': 'Mantener por décadas: componer, no flippear',

    // Why This Matters
    'whyavante.matters.title': 'Por Qué Esto Importa para Brasil',
    'whyavante.matters.point1.title': 'Hands-On Desde el Día Cero',
    'whyavante.matters.point1.description': 'No esperamos a que los fundadores lo descifren. Co-construimos con producto, capital y distribución desde el día uno.',
    'whyavante.matters.point2.title': 'Capital Pre-Tracción',
    'whyavante.matters.point2.description': 'Los first tickets nos dan el mejor precio, el mayor equity y control sobre la dirección estratégica antes de que el mercado se ponga ruidoso.',
    'whyavante.matters.point3.title': 'Capital-Eficiente por Diseño',
    'whyavante.matters.point3.description': 'Optimizamos para cashflow y unit economics, no para métricas de vanidad. Cada dólar desplegado está atado a tracción real.',
    'whyavante.matters.point4.title': 'Compounding Sobre Exits',
    'whyavante.matters.point4.description': 'Construimos para mantener por décadas. Los mejores resultados vienen de negocios que componen, no de los optimizados para demo day.',

    // Why Brazil, Why Now
    'whyavante.brazil.title': 'Por Qué Brasil, Por Qué Ahora',
    'whyavante.brazil.subtitle': 'Brasil es el mercado de compounding más subestimado del mundo. Industrias enormes intensivas en servicios, baja saturación de producto e IA creando ventajas generacionales, ahora mismo.',
    'whyavante.brazil.point1.label': 'Tamaño de Mercado',
    'whyavante.brazil.point1.text': 'Población de 215M, economía de $2T+, aún dramáticamente subatendida por software.',
    'whyavante.brazil.point2.label': 'Complejidad Operativa',
    'whyavante.brazil.point2.text': 'Industrias intensivas en servicios donde los workflows son manuales, fragmentados y maduros para automatización con IA.',
    'whyavante.brazil.point3.label': 'Adopción Temprana de IA',
    'whyavante.brazil.point3.text': 'La IA está en producción pero los líderes de categoría aún no están coronados. Velocidad + disciplina gana.',
    'whyavante.brazil.point4.label': 'Baja Saturación',
    'whyavante.brazil.point4.text': 'Espacio para nuevos negocios que definen categoría. Sin competir con 50 copycats.',
    'whyavante.brazil.point5.label': 'Ventaja Local',
    'whyavante.brazil.point5.text': 'Profunda experiencia de dominio, redes de operadores y distribución que jugadores internacionales no pueden replicar.',
    'whyavante.brazil.point6.label': 'Capital-Eficiente',
    'whyavante.brazil.point6.text': 'Construir por menos, ganar tracción más rápido, hacer compound sin necesitar mega-rondas.',

    // CTA
    'whyavante.cta.title': '¿Listo para Construir al Estilo Avante?',
    'whyavante.cta.description': 'Únete a operadores, builders e inversores creando la próxima generación de líderes de categoría AI-native en Brasil. Sin turistas. Sin hype. Solo ejecución.',
    'whyavante.cta.button': 'Asóciate con Avante',

    // Library Page
    'library.backhome': 'Volver al Inicio',
    'library.hero.badge': 'Investigación & Insights',
    'library.hero.title': 'Insights de Venture Building para Operadores',
    'library.hero.subtitle': 'Reportes de investigación, playbooks y case studies sobre venture studios, first-ticket investing, negocios AI-native y oportunidades en Brasil. Escritos por operadores que han construido y escalado empresas.',
    'library.hero.stats': '9 Recursos • Actualizado Semanalmente',

    // Categories
    'library.category.all': 'Todos',
    'library.category.insights': 'Insights',
    'library.category.research': 'Investigación',
    'library.category.casestudies': 'Case Studies',
    'library.category.playbooks': 'Playbooks',
    'library.category.brazil': 'Mercado Brasil',
    'library.category.ai': 'IA & Tech',

    // CTA
    'library.cta.title': 'Recibe Nueva Investigación & Insights',
    'library.cta.description': 'Únete a operadores, inversores y builders recibiendo insights semanales sobre venture building, negocios AI-native y oportunidades en mercados emergentes.',
    'library.cta.placeholder': 'tu@email.com',
    'library.cta.button': 'Suscribirse',
    'library.cta.note': 'Un email a la semana. Sin spam. Cancela cuando quieras.',
  }
};

// Locale is now sourced from the URL (`/en/...` or `/pt/...`) — passed in
// by routes.tsx via `<LocaleLayout>`. Toggling navigates to the same path
// under the other locale prefix.
//
// Why URL-driven instead of state: Google + LLM crawlers index the URL,
// not in-memory React state. State-only toggle is invisible to them.
export function LanguageProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Language;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const setLanguage = useCallback((lang: Language) => {
    if (lang === locale) return;
    // Replace the leading /en /pt /es with the target lang and keep the rest
    const newPath = location.pathname.replace(/^\/(en|pt|es)/, `/${lang}`);
    navigate(newPath || `/${lang}`, { replace: false });
  }, [locale, location.pathname, navigate]);

  // ES dictionary may have gaps during incremental rollout — fall back to
  // EN strings rather than rendering raw key names. Pattern: `es?[k] || en[k]`.
  const t = useCallback((key: string): string => {
    const dict = translations[locale] as Record<string, string> | undefined;
    if (dict && dict[key]) return dict[key];
    // Fallback chain: dict -> EN -> the key itself
    return translations.en[key] || key;
  }, [locale]);

  const value = useMemo(() => ({
    language: locale,
    setLanguage,
    t
  }), [locale, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}