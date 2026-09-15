export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const ease = (value) => { const p = clamp(value); return p * p * (3 - 2 * p); };
export const segment = (progress, start, end) => ease((progress - start) / (end - start));
export const chapterAt = (progress) => Math.min(4, Math.floor(clamp(progress) * 5));

// A pure pose function: scrolling backward reproduces exactly the same scene.
export function scenePose(progress) {
  const p = clamp(progress);
  const open = segment(p, .12, .36);
  const build = segment(p, .36, .62);
  const compound = segment(p, .79, 1);
  return { open, build, compound, rotation: -.18 + open * .12 + build * .24 - compound * .18,
    cameraZ: 9.8 - open * 1.1 + compound * 3.6,
    cameraY: 5.1 + open * .7 + compound * 1.2,
    paperY: .65 + open * 1.4 - build * .6,
    screenY: .65 + build * 1.2,
    recordsY: .66 + build * .6,
    secondScale: compound * .72 };
}

export const COPY = {
  en: {
    eyebrow: 'AI-NATIVE VENTURE BUILDER · BRAZIL', skip: 'Meet the operators', scroll: 'Scroll to explore',
    chapters: ['The ambition', 'The operation', 'The company', 'The work', 'The next build'],
    titles: [['Built to', 'compound.'], ['Start with', 'the work.'], ['Build the', 'whole company.'], ['One method.', 'Real operations.'], ['Build. Learn.', 'Build again.']],
    descriptions: ['We co-found AI-native companies. Product, data and operators, working together from day one.', 'Inside every industry, there is work waiting to be done better. That is where we begin.', 'A product is the beginning. We build the data infrastructure and operating team around it.', 'Follow the workflow. See how the same approach takes shape in legal services and insurance.', 'Every build adds experience. Shared infrastructure and operating knowledge carry into what comes next.'],
    labels: ['PRODUCT', 'DATA', 'OPERATORS'], detail: 'Explore the workflow', illustrative: 'Illustrative workflow · synthetic data',
    legal: ['Case file', 'Extract relevant fields', 'Review the claim'], insurance: ['Submission', 'Assess risk appetite', 'Review the decision'],
    legalDescription: 'An AI copilot for Brazilian lawyers.', insuranceDescription: 'The AI layer for insurers and brokers.',
    desktopHint: 'An operation, assembled.', replay: 'Back to the beginning', next: 'The people behind the work',
    partner: 'Alongside our operating network', partnerBody: 'Explore the companies and people we work with.',
  },
  pt: {
    eyebrow: 'VENTURE BUILDER AI-NATIVE · BRASIL', skip: 'Conheça os operadores', scroll: 'Role para explorar',
    chapters: ['A ambição', 'A operação', 'A empresa', 'O trabalho', 'A próxima empresa'],
    titles: [['Construir para', 'multiplicar.'], ['Comece pelo', 'trabalho.'], ['Construa a', 'empresa inteira.'], ['Um método.', 'Operações reais.'], ['Construir. Aprender.', 'Construir de novo.']],
    descriptions: ['Cofundamos empresas AI-native. Produto, dados e operadores, juntos desde o primeiro dia.', 'Em cada setor, existe trabalho que pode ser feito melhor. É por aí que começamos.', 'O produto é o começo. Construímos a infraestrutura de dados e o time que faz a operação acontecer.', 'Acompanhe o fluxo. Veja como a mesma abordagem ganha forma no direito e nos seguros.', 'Cada empresa agrega experiência. A infraestrutura e o conhecimento operacional alimentam o próximo projeto.'],
    labels: ['PRODUTO', 'DADOS', 'OPERADORES'], detail: 'Explore o fluxo', illustrative: 'Fluxo ilustrativo · dados sintéticos',
    legal: ['Autos', 'Extrair campos relevantes', 'Revisar o crédito'], insurance: ['Submissão', 'Avaliar apetite de risco', 'Revisar a decisão'],
    legalDescription: 'Um copiloto de IA para advogados brasileiros.', insuranceDescription: 'A camada de IA para seguradoras e corretores.',
    desktopHint: 'Uma operação ganha forma.', replay: 'Voltar ao início', next: 'As pessoas por trás do trabalho',
    partner: 'Junto à nossa rede de operadores', partnerBody: 'Conheça as empresas e as pessoas com quem trabalhamos.',
  },
  es: {
    eyebrow: 'VENTURE BUILDER AI-NATIVE · BRASIL', skip: 'Conoce a los operadores', scroll: 'Desplázate para explorar',
    chapters: ['La ambición', 'La operación', 'La empresa', 'El trabajo', 'La próxima empresa'],
    titles: [['Construir para', 'multiplicar.'], ['Empieza por', 'el trabajo.'], ['Construye la', 'empresa completa.'], ['Un método.', 'Operaciones reales.'], ['Construir. Aprender.', 'Construir de nuevo.']],
    descriptions: ['Cofundamos empresas AI-native. Producto, datos y operadores, juntos desde el primer día.', 'En cada industria hay trabajo que se puede hacer mejor. Por ahí empezamos.', 'El producto es el comienzo. Construimos la infraestructura de datos y el equipo que lo hace funcionar.', 'Sigue el proceso. Descubre cómo el mismo enfoque toma forma en servicios legales y seguros.', 'Cada empresa aporta experiencia. La infraestructura y el conocimiento operativo alimentan el siguiente proyecto.'],
    labels: ['PRODUCTO', 'DATOS', 'OPERADORES'], detail: 'Explora el proceso', illustrative: 'Flujo ilustrativo · datos sintéticos',
    legal: ['Expediente', 'Extraer campos relevantes', 'Revisar el crédito'], insurance: ['Solicitud', 'Evaluar apetito de riesgo', 'Revisar la decisión'],
    legalDescription: 'Un copiloto de IA para abogados brasileños.', insuranceDescription: 'La capa de IA para aseguradoras y corredores.',
    desktopHint: 'Una operación toma forma.', replay: 'Volver al inicio', next: 'Las personas detrás del trabajo',
    partner: 'Junto a nuestra red de operadores', partnerBody: 'Conoce a las empresas y personas con las que trabajamos.',
  },
};
