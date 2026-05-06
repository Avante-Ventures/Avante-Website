import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { BackToTop } from "@/app/components/BackToTop";
import { SEOHelmet } from "@/app/components/SEOHelmet";
import { Link } from "react-router";
import { useState } from "react";
import comparisonChart from "figma:asset/37ee08c3bb79d5b7cd80ffc2853024534d044245.png";
import returnsChart from "figma:asset/0a469bd800ea0caef4b2723b1776b2438a3aada4.png";

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
} as const;

export default function WhyAvantePage() {
  const { t, language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const copy = SEO_COPY[language];

  const whyAvanteJsonLd = {
    "@context": "https://schema.org",
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

          <div style={{ 
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: 'rgba(249, 180, 55, 0.1)',
            border: '1px solid rgba(249, 180, 55, 0.2)',
            borderRadius: 'var(--avante-radius-8)',
            marginBottom: 'var(--avante-space-6)',
            fontSize: '12px',
            fontWeight: 'var(--font-weight-medium)',
            color: 'rgba(249, 180, 55, 0.9)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {t('whyavante.hero.badge')}
          </div>

          <h1 
            style={{
              fontSize: 'clamp(48px, 7vw, 84px)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--avante-text-primary)',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              marginBottom: 'var(--avante-space-8)',
              maxWidth: '1000px'
            }}
          >
            {t('whyavante.hero.title')}
          </h1>

          <p 
            style={{ 
              fontSize: '20px',
              color: 'var(--avante-text-secondary)',
              maxWidth: '800px',
              lineHeight: '1.7',
              marginBottom: 'var(--avante-space-12)'
            }}
          >
            {t('whyavante.hero.subtitle')}
          </p>

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
              { value: '30%', label: t('whyavante.stats.stat3'), color: '#42468C' }
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

        {/* Comparison Chart Section */}
        <section style={{ marginBottom: 'var(--avante-space-24)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--avante-space-10)' }}>
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
              {t('whyavante.comparison.title')}
            </h2>

            <p 
              style={{ 
                fontSize: '18px',
                color: 'var(--avante-text-secondary)',
                lineHeight: '1.7',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              {t('whyavante.comparison.description')}
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--avante-radius-16)',
            padding: 'var(--avante-space-10)',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <img 
              src={comparisonChart} 
              alt="Venture Studio vs VC Comparison"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'var(--avante-radius-8)'
              }}
            />
          </div>
        </section>

        {/* Returns Chart Section */}
        <section style={{ marginBottom: 'var(--avante-space-24)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--avante-space-10)' }}>
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
              {t('whyavante.returns.title')}
            </h2>

            <p 
              style={{ 
                fontSize: '18px',
                color: 'var(--avante-text-secondary)',
                lineHeight: '1.7',
                maxWidth: '700px',
                margin: '0 auto'
              }}
            >
              {t('whyavante.returns.description')}
            </p>
          </div>

          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--avante-radius-16)',
            padding: 'var(--avante-space-10)',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <img 
              src={returnsChart} 
              alt="Venture Studios Lead in Returns"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'var(--avante-radius-8)'
              }}
            />
          </div>

          {/* Data Source Note */}
          <p style={{
            fontSize: '13px',
            color: 'var(--avante-text-muted)',
            textAlign: 'center',
            marginTop: 'var(--avante-space-4)',
            fontStyle: 'italic'
          }}>
            {t('whyavante.returns.source')}
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

        {/* Why This Matters Section */}
        <section style={{ marginBottom: 'var(--avante-space-24)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.15',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--avante-space-12)',
                textAlign: 'center'
              }}
            >
              {t('whyavante.matters.title')}
            </h2>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--avante-space-6)'
            }}>
              {[1, 2, 3, 4].map((num) => (
                <div 
                  key={num}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--avante-radius-12)',
                    padding: 'var(--avante-space-7)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    setHoveredCard(num);
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(66, 70, 140, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(66, 70, 140, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredCard(null);
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    fontSize: '72px',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'rgba(255, 255, 255, 0.02)',
                    lineHeight: '1',
                    padding: 'var(--avante-space-3)'
                  }}>
                    {num}
                  </div>

                  <h3 
                    style={{
                      fontSize: '21px',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--avante-text-primary)',
                      marginBottom: 'var(--avante-space-4)',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {t(`whyavante.matters.point${num}.title`)}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: '15px',
                      color: 'var(--avante-text-secondary)',
                      lineHeight: '1.7',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {t(`whyavante.matters.point${num}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
    </div>
  );
}