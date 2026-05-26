import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { BackToTop } from "@/app/components/BackToTop";
import { SEOHelmet } from "@/app/components/SEOHelmet";
import { SectionMasthead } from "@/app/components/SectionMasthead";
import { PortfolioStrip } from "@/app/components/PortfolioStrip";
import { Link } from "react-router";

const SEO_COPY = {
  en: {
    title: "Why Avante: The Venture Studio Advantage in Brazil",
    description: "Why venture studios outperform traditional VC. 50% annual returns. Pre-traction capital + operational support compound. Silicon Valley playbooks for Brazil.",
    inLanguage: "en",
  },
  pt: {
    title: "Por Que Avante: A Vantagem do Venture Studio no Brasil",
    description: "Por que venture studios superam VC tradicional. 50% de retornos anuais. Capital pré-tração + suporte operacional compõem. Playbooks do Vale para o Brasil.",
    inLanguage: "pt-BR",
  },
  es: {
    title: "Por Qué Avante: La Ventaja del Venture Studio en Brasil",
    description: "Por qué los venture studios superan al VC tradicional. 50% de retornos anuales. Capital pre-tracción + soporte operativo hacen compound. Playbooks de Silicon Valley para Brasil.",
    inLanguage: "es",
  },
} as const;

// FAQ schema feeds LLM retrieval (Perplexity / ChatGPT / Claude) more than
// it feeds Google rich results (which has restricted Q&A since 2023). Every
// Q&A here is anchored to a number or claim that appears visibly on the
// page or in the linked long-form articles — never invented.
const FAQ_COPY = {
  en: [
    {
      q: "What is a venture studio and how is it different from a VC fund?",
      a: "A venture studio co-founds companies from scratch with shared infrastructure, operating partners, and first-ticket capital. Traditional VC funds invest after companies already exist. The studio operating partner is in the codebase and unit economics from day one; the VC partner sits on the board.",
    },
    {
      q: "What returns do venture studios generate compared to traditional VC?",
      a: "Industry data shows venture studios generate approximately 50% annualized IRR over 10-year vintages, versus approximately 19% for traditional VC funds in similar periods. The gap is structural — driven by operational depth and entry-stage advantages — not a survivorship artifact.",
    },
    {
      q: "Why do venture studios outperform traditional VC?",
      a: "Three structural advantages: (1) operating partners are in the codebase and unit economics from day one, (2) shared infrastructure cuts 6–9 months off time-to-traction versus an unaffiliated team with the same capital, (3) first-ticket capital lets the studio shape unit economics before market consensus arrives.",
    },
    {
      q: "At what stage does Avante invest?",
      a: "First ticket, always. Avante co-founds at pre-traction — before product, before customers — and accompanies operationally through to the next institutional round. Avante does not write follow-on checks into companies founded by others.",
    },
    {
      q: "Why focus on Brazil for AI-native venture building?",
      a: "Brazil is a $2.5 trillion economy with 215 million people, 70% services GDP, and approximately 90% of SMEs under-digitized. The combination of large fragmented service markets and advancing AI tooling creates the structural setup for AI-native venture creation in Latin America.",
    },
  ],
  pt: [
    {
      q: "O que é um venture studio e como se diferencia de um fundo de VC?",
      a: "Um venture studio co-funda empresas do zero com infraestrutura compartilhada, operating partners e capital de primeiro cheque. Fundos de VC tradicionais investem depois que empresas já existem. O operating partner do studio está no código e na economia unitária desde o dia um; o sócio de VC está no conselho.",
    },
    {
      q: "Quais retornos os venture studios geram em comparação ao VC tradicional?",
      a: "Dados da indústria mostram que venture studios geram aproximadamente 50% de IRR anualizado em vintages de 10 anos, contra aproximadamente 19% de fundos de VC tradicionais em períodos comparáveis. A diferença é estrutural — derivada de profundidade operacional e vantagens de estágio de entrada — não um artefato de sobrevivência.",
    },
    {
      q: "Por que os venture studios superam o VC tradicional?",
      a: "Três vantagens estruturais: (1) operating partners estão no código e na economia unitária desde o dia um, (2) infraestrutura compartilhada corta 6–9 meses do time-to-traction versus uma equipe não afiliada com o mesmo capital, (3) capital de primeiro cheque permite ao studio moldar a economia unitária antes do consenso de mercado chegar.",
    },
    {
      q: "Em que estágio a Avante investe?",
      a: "Primeiro cheque, sempre. A Avante co-funda em pré-tração — antes do produto, antes dos clientes — e acompanha operacionalmente até a próxima rodada institucional. A Avante não emite cheques de follow-on em empresas fundadas por terceiros.",
    },
    {
      q: "Por que focar no Brasil para construção de empresas AI-native?",
      a: "O Brasil é uma economia de US$ 2,5 trilhões com 215 milhões de pessoas, 70% do PIB em serviços e aproximadamente 90% das PMEs sub-digitalizadas. A combinação de mercados de serviços fragmentados e ferramentas de IA em avanço cria o cenário estrutural para criação de empresas AI-native na América Latina.",
    },
  ],
  es: [
    {
      q: "¿Qué es un venture studio y en qué se diferencia de un fondo de VC?",
      a: "Un venture studio co-funda empresas desde cero con infraestructura compartida, operating partners y capital de primer cheque. Los fondos de VC tradicionales invierten después de que las empresas ya existen. El operating partner del studio está en el código y en la economía unitaria desde el día uno; el socio de VC está en el directorio.",
    },
    {
      q: "¿Qué retornos generan los venture studios comparados con el VC tradicional?",
      a: "Datos de la industria muestran que los venture studios generan aproximadamente 50% de IRR anualizado en vintages de 10 años, contra aproximadamente 19% de fondos de VC tradicionales en períodos comparables. La diferencia es estructural — derivada de profundidad operativa y ventajas de etapa de entrada — no un artefacto de supervivencia.",
    },
    {
      q: "¿Por qué los venture studios superan al VC tradicional?",
      a: "Tres ventajas estructurales: (1) los operating partners están en el código y en la economía unitaria desde el día uno, (2) la infraestructura compartida recorta 6–9 meses del time-to-traction frente a un equipo no afiliado con el mismo capital, (3) el capital de primer cheque permite al studio moldear la economía unitaria antes de que llegue el consenso de mercado.",
    },
    {
      q: "¿En qué etapa invierte Avante?",
      a: "Primer cheque, siempre. Avante co-funda en pre-tracción — antes del producto, antes de los clientes — y acompaña operativamente hasta la siguiente ronda institucional. Avante no emite cheques de follow-on en empresas fundadas por terceros.",
    },
    {
      q: "¿Por qué enfocarse en Brasil para construcción de empresas AI-native?",
      a: "Brasil es una economía de US$ 2,5 billones con 215 millones de personas, 70% del PIB en servicios y aproximadamente 90% de las PYMEs subdigitalizadas. La combinación de mercados de servicios fragmentados y herramientas de IA en avance crea el escenario estructural para creación de empresas AI-native en América Latina.",
    },
  ],
} as const;

export default function WhyAvantePage() {
  const { t, language } = useLanguage();
  const copy = SEO_COPY[language] ?? SEO_COPY.en;
  const faqEntries = FAQ_COPY[language] ?? FAQ_COPY.en;

  const whyAvanteJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `https://avanteventures.com/${language}/why-avante#article`,
        "headline": copy.title,
        "description": copy.description,
        "url": `https://avanteventures.com/${language}/why-avante`,
        "image": "https://avanteventures.com/og-image.png",
        "inLanguage": copy.inLanguage,
        "author": { "@id": "https://avanteventures.com/#organization" },
        "publisher": { "@id": "https://avanteventures.com/#organization" },
        "isPartOf": { "@id": "https://avanteventures.com/#website" },
        "about": [
          "Venture Studios",
          "Brazil Startup Ecosystem",
          "AI-Native Startups",
          "Pre-traction Capital",
          "Returns Comparison",
        ],
        "datePublished": "2026-01-01",
      },
      {
        "@type": "FAQPage",
        "@id": `https://avanteventures.com/${language}/why-avante#faq`,
        "inLanguage": copy.inLanguage,
        "mainEntity": faqEntries.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--avante-background)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        pathname="/why-avante"
        jsonLd={whyAvanteJsonLd}
      />
      <Navbar />
      <BackToTop />

      {/* Background Effects */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Purple Haze - Top */}
        <div 
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '60%',
            background: 'radial-gradient(ellipse at 30% 20%, rgba(152, 80, 154, 0.025) 0%, transparent 60%)',
            opacity: 0.8
          }}
        />
        
        {/* Gold Haze - Middle */}
        <div 
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1000px',
            height: '1000px',
            background: 'radial-gradient(circle, rgba(249, 180, 55, 0.02) 0%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0.7
          }}
        />
      </div>

      {/* Content Container */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '0 var(--avante-space-6)',
        paddingTop: 'var(--avante-space-20)',
        paddingBottom: 'var(--avante-space-20)',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: 'var(--avante-space-20)' }}>
          <Link
            to={`/${language}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--avante-space-2)',
              color: 'var(--avante-text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: 'var(--avante-space-8)',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--avante-text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--avante-text-muted)'}
          >
            <span>←</span> {t('whyavante.backhome')}
          </Link>

          <SectionMasthead
            eyebrow={t('whyavante.hero.badge')}
            title={t('whyavante.hero.title')}
            description={t('whyavante.hero.subtitle')}
          />

          {/* Key Stats Row */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--avante-space-6)',
            marginTop: 'var(--avante-space-12)'
          }}>
            {[
              { value: '50%', label: t('whyavante.stats.stat1'), color: '#F9B437' },
              { value: '3x', label: t('whyavante.stats.stat2'), color: '#98509A' },
              { value: '30%', label: t('whyavante.stats.stat3'), color: '#98509A' }
            ].map((stat, index) => (
              <div 
                key={index}
                style={{
                  padding: 'var(--avante-space-6)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: `2px solid ${stat.color}`,
                  borderRadius: 'var(--avante-radius-12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${stat.color}14`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 32px ${stat.color}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  fontSize: '48px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: stat.color,
                  lineHeight: '1',
                  marginBottom: 'var(--avante-space-3)'
                }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: 'var(--avante-text-secondary)',
                  lineHeight: '1.4'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio strip — social proof under the hero */}
          <div style={{ marginTop: 'var(--avante-space-12)' }}>
            <PortfolioStrip
              label={t('Portfolio includes', 'Portfólio inclui')}
              viewAllHref={`/${language}/portfolio`}
              bordered={false}
            />
          </div>
        </div>

        {/* The Problem Section */}
        <section style={{ 
          marginBottom: 'var(--avante-space-24)',
          padding: 'var(--avante-space-16) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--avante-space-8)',
                textAlign: 'center'
              }}
            >
              {t('whyavante.problem.title')}
            </h2>

            <p 
              style={{ 
                fontSize: '18px',
                color: 'var(--avante-text-secondary)',
                lineHeight: '1.7',
                marginBottom: 'var(--avante-space-12)',
                textAlign: 'center'
              }}
            >
              {t('whyavante.problem.subtitle')}
            </p>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--avante-space-6)',
              marginTop: 'var(--avante-space-10)'
            }}>
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  style={{
                    padding: 'var(--avante-space-6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '3px solid rgba(241, 139, 70, 0.5)',
                    borderRadius: 'var(--avante-radius-12)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(241, 139, 70, 0.05)';
                    e.currentTarget.style.borderLeftColor = 'rgba(241, 139, 70, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderLeftColor = 'rgba(241, 139, 70, 0.5)';
                  }}
                >
                  <div style={{ 
                    fontSize: '14px',
                    color: 'rgba(241, 139, 70, 0.7)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--avante-space-3)',
                    letterSpacing: '0.05em'
                  }}>
                    {t(`whyavante.problem.issue${num}.label`)}
                  </div>
                  <h3 
                    style={{
                      fontSize: '19px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--avante-text-primary)',
                      marginBottom: 'var(--avante-space-3)',
                      lineHeight: '1.3'
                    }}
                  >
                    {t(`whyavante.problem.issue${num}.title`)}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: '15px',
                      color: 'var(--avante-text-secondary)',
                      lineHeight: '1.6'
                    }}
                  >
                    {t(`whyavante.problem.issue${num}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table — replaces the two legacy chart-image sections.
            Single tabular block, editorial typography, no static PNGs.       */}
        <section style={{ marginBottom: 'var(--avante-space-24)' }}>
          <SectionMasthead
            centered
            eyebrow={t('whyavante.comparison.title')}
            title={
              language === 'pt'
                ? 'Venture studio vs. VC tradicional, lado a lado.'
                : 'Venture studio vs. traditional VC, side by side.'
            }
            description={
              language === 'pt'
                ? 'Os mesmos vintages, métricas comparáveis. Os números são da indústria — não nossos.'
                : 'Same vintages, comparable metrics. The numbers are industry data — not ours.'
            }
          />

          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr',
                padding: '20px 28px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              <span>{language === 'pt' ? 'Métrica' : 'Metric'}</span>
              <span style={{ color: '#F9B437' }}>Studio</span>
              <span>{language === 'pt' ? 'VC tradicional' : 'Traditional VC'}</span>
            </div>

            {[
              {
                metric: language === 'pt' ? 'IRR anualizado (10 anos)' : 'IRR annualized (10-yr)',
                studio: '~50%',
                vc: '~19%',
              },
              {
                metric: language === 'pt' ? 'Time-to-traction' : 'Time-to-traction',
                studio: language === 'pt' ? '6–9 meses à frente' : '6–9 months ahead',
                vc: language === 'pt' ? 'Linha de base' : 'Baseline',
              },
              {
                metric: language === 'pt' ? 'Encanamento da empresa' : 'Company "plumbing"',
                studio: language === 'pt' ? 'Compartilhado, dia 1' : 'Shared, day one',
                vc: language === 'pt' ? '~40% do pré-seed' : '~40% of pre-seed',
              },
              {
                metric: language === 'pt' ? 'Engajamento operacional' : 'Operating engagement',
                studio: language === 'pt' ? 'Operating partner no código' : 'Operating partner in the code',
                vc: language === 'pt' ? '8–12 board seats' : '8–12 board seats',
              },
              {
                metric: language === 'pt' ? 'Estágio de entrada' : 'Entry stage',
                studio: language === 'pt' ? 'Primeiro cheque, sempre' : 'First ticket, always',
                vc: language === 'pt' ? 'Seed → Série C' : 'Seed → Series C',
              },
            ].map((row, i, arr) => (
              <div
                key={row.metric}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr',
                  padding: '22px 28px',
                  borderBottom:
                    i < arr.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  fontSize: '15px',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500 }}>
                  {row.metric}
                </span>
                <span style={{ color: '#F9B437', fontWeight: 600 }}>{row.studio}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.55)' }}>{row.vc}</span>
              </div>
            ))}
          </div>

          {/* Data source note (anchored to /en#source-6 footnote) */}
          <p
            style={{
              fontSize: '13px',
              color: 'var(--avante-text-muted)',
              textAlign: 'center',
              marginTop: 'var(--avante-space-5)',
              fontStyle: 'italic',
              maxWidth: '700px',
              margin: 'var(--avante-space-5) auto 0',
            }}
          >
            {language === 'pt'
              ? 'Fontes: GSSN Annual Report 2025 · Cambridge Associates US VC Index Q4 2025.'
              : 'Sources: GSSN Annual Report 2025 · Cambridge Associates US VC Index Q4 2025.'}
          </p>
        </section>

        {/* The Avante Dual Model Section */}
        <section style={{ 
          marginBottom: 'var(--avante-space-24)',
          padding: 'var(--avante-space-16) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative'
        }}>
          {/* Subtle ambient glow */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px',
              height: '500px',
              background: 'radial-gradient(ellipse, rgba(98, 80, 154, 0.015) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: 'clamp(var(--avante-space-10), 8vw, var(--avante-space-14))',
              padding: '0 var(--avante-space-4)'
            }}>
              <h2 
                style={{
                  fontSize: 'clamp(28px, 6vw, 52px)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--avante-text-primary)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                  marginBottom: 'clamp(var(--avante-space-4), 4vw, var(--avante-space-6))'
                }}
              >
                {t('whyavante.model.title')}
              </h2>

              <p 
                style={{ 
                  fontSize: 'clamp(15px, 2.5vw, 18px)',
                  color: 'var(--avante-text-secondary)',
                  lineHeight: '1.7',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}
              >
                {t('whyavante.model.subtitle')}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(var(--avante-space-6), 4vw, var(--avante-space-8))',
              marginTop: 'clamp(var(--avante-space-10), 6vw, var(--avante-space-12))'
            }}>
              {/* Venture Building Path */}
              <div 
                style={{
                  padding: 'clamp(var(--avante-space-6), 5vw, var(--avante-space-8))',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '3px solid rgba(98, 80, 154, 0.7)',
                  borderRadius: 'var(--avante-radius-16)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(98, 80, 154, 0.06)';
                  e.currentTarget.style.borderTopColor = 'rgba(98, 80, 154, 1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(98, 80, 154, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderTopColor = 'rgba(98, 80, 154, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Subtle inner glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '150px',
                  background: 'radial-gradient(ellipse at top, rgba(98, 80, 154, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  opacity: 0.4,
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(98, 80, 154, 0.15)',
                    border: '1px solid rgba(98, 80, 154, 0.3)',
                    borderRadius: 'var(--avante-radius-8)',
                    fontSize: 'clamp(10px, 1.5vw, 11px)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'rgba(152, 80, 154, 1)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--avante-space-5)'
                  }}>
                    {t('whyavante.model.path1.badge')}
                  </div>

                  <h3 
                    style={{
                      fontSize: 'clamp(22px, 4vw, 28px)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--avante-text-primary)',
                      marginBottom: 'var(--avante-space-4)',
                      lineHeight: '1.2'
                    }}
                  >
                    {t('whyavante.model.path1.title')}
                  </h3>

                  <p 
                    style={{ 
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      color: 'var(--avante-text-secondary)',
                      lineHeight: '1.7',
                      marginBottom: 'clamp(var(--avante-space-5), 4vw, var(--avante-space-6))'
                    }}
                  >
                    {t('whyavante.model.path1.description')}
                  </p>

                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(var(--avante-space-2), 2vw, var(--avante-space-3))'
                  }}>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--avante-space-3)' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(152, 80, 154, 0.8)',
                          marginTop: '8px',
                          flexShrink: 0,
                          boxShadow: '0 0 8px rgba(152, 80, 154, 0.4)'
                        }} />
                        <span style={{
                          fontSize: 'clamp(13px, 1.8vw, 15px)',
                          color: 'var(--avante-text-secondary)',
                          lineHeight: '1.6'
                        }}>
                          {t(`whyavante.model.path1.point${num}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* First Tickets Path */}
              <div 
                style={{
                  padding: 'clamp(var(--avante-space-6), 5vw, var(--avante-space-8))',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: '3px solid rgba(249, 180, 55, 0.7)',
                  borderRadius: 'var(--avante-radius-16)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.06)';
                  e.currentTarget.style.borderTopColor = 'rgba(249, 180, 55, 1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(249, 180, 55, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderTopColor = 'rgba(249, 180, 55, 0.7)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Subtle inner glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '150px',
                  background: 'radial-gradient(ellipse at top, rgba(249, 180, 55, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  opacity: 0.4,
                  zIndex: 0
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(249, 180, 55, 0.15)',
                    border: '1px solid rgba(249, 180, 55, 0.3)',
                    borderRadius: 'var(--avante-radius-8)',
                    fontSize: 'clamp(10px, 1.5vw, 11px)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'rgba(249, 180, 55, 1)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--avante-space-5)'
                  }}>
                    {t('whyavante.model.path2.badge')}
                  </div>

                  <h3 
                    style={{
                      fontSize: 'clamp(22px, 4vw, 28px)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--avante-text-primary)',
                      marginBottom: 'var(--avante-space-4)',
                      lineHeight: '1.2'
                    }}
                  >
                    {t('whyavante.model.path2.title')}
                  </h3>

                  <p 
                    style={{ 
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      color: 'var(--avante-text-secondary)',
                      lineHeight: '1.7',
                      marginBottom: 'clamp(var(--avante-space-5), 4vw, var(--avante-space-6))'
                    }}
                  >
                    {t('whyavante.model.path2.description')}
                  </p>

                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(var(--avante-space-2), 2vw, var(--avante-space-3))'
                  }}>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--avante-space-3)' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(249, 180, 55, 0.8)',
                          marginTop: '8px',
                          flexShrink: 0,
                          boxShadow: '0 0 8px rgba(249, 180, 55, 0.4)'
                        }} />
                        <span style={{
                          fontSize: 'clamp(13px, 1.8vw, 15px)',
                          color: 'var(--avante-text-secondary)',
                          lineHeight: '1.6'
                        }}>
                          {t(`whyavante.model.path2.point${num}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom insight note */}
            <div style={{
              marginTop: 'clamp(var(--avante-space-8), 6vw, var(--avante-space-12))',
              padding: 'clamp(var(--avante-space-5), 4vw, var(--avante-space-6))',
              backgroundColor: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--avante-radius-12)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: 'clamp(13px, 2vw, 14px)',
                color: 'var(--avante-text-muted)',
                lineHeight: '1.6',
                fontStyle: 'italic',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                This dual approach allows us to capture alpha at every stage—building from scratch where opportunity is clearest, and investing early where exceptional teams are already proving the model.
              </p>
            </div>
          </div>
        </section>

        {/* "Why This Matters" section removed — its 4 cards were repetitive
            with The Problem (above) and Why Brazil Why Now (below). The
            consolidation keeps 5 content sections instead of 7.             */}

        {/* Why Brazil, Why Now Section */}
        <section style={{ 
          marginBottom: 'var(--avante-space-24)',
          padding: 'var(--avante-space-16) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--avante-space-12)' }}>
              <h2 
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--avante-text-primary)',
                  lineHeight: '1.15',
                  letterSpacing: '-0.02em',
                  marginBottom: 'var(--avante-space-6)'
                }}
              >
                {t('whyavante.brazil.title')}
              </h2>

              <p 
                style={{ 
                  fontSize: '18px',
                  color: 'var(--avante-text-secondary)',
                  lineHeight: '1.7',
                  maxWidth: '800px',
                  margin: '0 auto'
                }}
              >
                {t('whyavante.brazil.subtitle')}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--avante-space-5)',
              marginBottom: 'var(--avante-space-10)'
            }}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num}
                  style={{
                    padding: 'var(--avante-space-5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--avante-radius-12)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(152, 80, 154, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(152, 80, 154, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <div style={{ 
                    fontSize: '13px',
                    color: 'rgba(152, 80, 154, 0.7)',
                    fontWeight: 'var(--font-weight-semibold)',
                    marginBottom: 'var(--avante-space-2)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    {t(`whyavante.brazil.point${num}.label`)}
                  </div>
                  <p 
                    style={{ 
                      fontSize: '15px',
                      color: 'var(--avante-text-secondary)',
                      lineHeight: '1.6'
                    }}
                  >
                    {t(`whyavante.brazil.point${num}.text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--avante-radius-20)',
            padding: 'var(--avante-space-16)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(249, 180, 55, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
            <h2 
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--avante-space-5)'
              }}
            >
              {t('whyavante.cta.title')}
            </h2>

            <p 
              style={{ 
                fontSize: '17px',
                color: 'var(--avante-text-secondary)',
                marginBottom: 'var(--avante-space-10)',
                lineHeight: '1.7'
              }}
            >
              {t('whyavante.cta.description')}
            </p>

            <Link
              to={`/${language}`}
              style={{
                display: 'inline-block',
                padding: '18px 36px',
                backgroundColor: 'rgba(249, 180, 55, 1)',
                color: '#151E35',
                borderRadius: 'var(--avante-radius-8)',
                fontSize: '17px',
                fontWeight: 'var(--font-weight-semibold)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 24px rgba(249, 180, 55, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.9)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(249, 180, 55, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(249, 180, 55, 0.4)';
              }}
            >
              {t('whyavante.cta.button')}
            </Link>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}