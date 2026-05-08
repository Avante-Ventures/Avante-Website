import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { BackToTop } from "@/app/components/BackToTop";
import { SEOHelmet } from "@/app/components/SEOHelmet";
import { SectionMasthead } from "@/app/components/SectionMasthead";
import { PortfolioStrip } from "@/app/components/PortfolioStrip";
import { Link } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
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
  isPublished: boolean;
}

export default function LibraryPage() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const libraryItems: LibraryItem[] = articles.map((a, i) => ({
    id: String(i + 1),
    slug: a.slug,
    title: a[language].title,
    description: a[language].description,
    category: a.category,
    type: a.type,
    readTime: a.readTime,
    featured: a.featured,
    date: a.date,
    isPublished: a.isPublished,
  }));

  // Editorial discipline: no emoji icons. The dot signature carries the
  // category accent — same pattern used in the masthead family.
  // Indigo (#42468C) dropped per Beirut's panel note — palette consolidated
  // to gold / orange / purple as primary punctuation.
  const categories = [
    { id: 'all',         label: t('library.category.all'),         color: '#FFFFFF' },
    { id: 'insights',    label: t('library.category.insights'),    color: '#F9B437' },
    { id: 'research',    label: t('library.category.research'),    color: '#98509A' },
    { id: 'casestudies', label: t('library.category.casestudies'), color: '#F4A261' },
    { id: 'playbooks',   label: t('library.category.playbooks'),   color: '#F9B437' },
    { id: 'brazil',      label: t('library.category.brazil'),      color: '#98509A' },
    { id: 'ai',          label: t('library.category.ai'),          color: '#E6C54C' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? libraryItems 
    : libraryItems.filter(item => item.category === activeCategory);

  const getCategoryColor = (category: Category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || '#FFFFFF';
  };


  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail) return;
    
    const subject = encodeURIComponent('Newsletter Subscription Request');
    const body = encodeURIComponent(
      `New newsletter subscription request:\n\n` +
      `Email: ${newsletterEmail}\n\n` +
      `Source: Avante Library Page`
    );
    
    const mailtoLink = `mailto:cristian@avanteventures.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Clear the input after opening email client
    setTimeout(() => {
      setNewsletterEmail('');
    }, 500);
  };

  // GEO-friendly schema: CollectionPage + ItemList of every published article.
  // Lets LLMs cite specific titles even when the underlying article pages
  // don't exist as standalone routes yet (they're listed inline on /library).
  const SEO_COPY = {
    en: {
      title: "Library: Insights, Research, Playbooks on AI-native Venture Building",
      description: "Avante Library: research, case studies, and playbooks on venture studios, Brazil's AI market, and operating AI-native startups. 9+ articles.",
      collectionName: "Avante Library: Insights, Research, Playbooks",
      collectionDescription: "Insights, research reports, case studies, and playbooks on AI-native venture building, Brazil's service economy, and venture studio dynamics.",
      inLanguage: "en",
    },
    pt: {
      title: "Biblioteca: Insights, Pesquisa e Playbooks para Empresas AI-Native",
      description: "Biblioteca Avante: pesquisas, estudos de caso e playbooks sobre venture studios, mercado de IA no Brasil e operação de startups AI-native. 9+ artigos.",
      collectionName: "Biblioteca Avante: Insights, Pesquisa, Playbooks",
      collectionDescription: "Insights, relatórios de pesquisa, estudos de caso e playbooks sobre venture building AI-native, economia de serviços do Brasil e dinâmica de venture studios.",
      inLanguage: "pt-BR",
    },
  } as const;
  const copy = SEO_COPY[language];

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
        pathname="/library"
        jsonLd={libraryJsonLd}
      />
      <Navbar />
      <BackToTop />

      {/* Animated Background Gradients */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          animate={{
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(ellipse at 30% 20%, rgba(66, 70, 140, 0.05) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
        />
        
        <motion.div 
          animate={{
            opacity: [0.5, 0.7, 0.5],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(152, 80, 154, 0.04) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        <motion.div 
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '20%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(249, 180, 55, 0.03) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />
      </div>

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
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginBottom: 'var(--avante-space-16)' }}
        >
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
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--avante-text-primary)';
              e.currentTarget.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--avante-text-muted)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <span>←</span> {t('library.backhome')}
          </Link>

          <SectionMasthead
            eyebrow={t('library.hero.badge')}
            title={t('library.hero.title')}
            description={t('library.hero.subtitle')}
          />

          <div
            style={{
              display: 'flex',
              gap: 'var(--avante-space-3)',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 'var(--avante-space-6)',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: 'var(--avante-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--avante-space-2)',
                padding: '6px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--avante-radius-8)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#F9B437',
                }}
              />
              {t('library.hero.stats')}
            </span>
          </div>

          {/* Portfolio strip — discoverability + social proof */}
          <div style={{ marginTop: 'var(--avante-space-8)' }}>
            <PortfolioStrip
              label={language === 'pt' ? 'Portfólio do Studio' : 'Studio Portfolio'}
              viewAllHref={`/${language}/portfolio`}
              compact
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ 
            marginBottom: 'var(--avante-space-12)',
            paddingBottom: 'var(--avante-space-8)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <div style={{
            display: 'flex',
            gap: 'var(--avante-space-3)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id as Category)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeCategory === category.id 
                    ? `${category.color}20` 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: activeCategory === category.id
                    ? `1px solid ${category.color}80`
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: activeCategory === category.id 
                    ? category.color 
                    : 'var(--avante-text-secondary)',
                  fontSize: '14px',
                  fontWeight: activeCategory === category.id 
                    ? 'var(--font-weight-semibold)' 
                    : 'var(--font-weight-regular)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  letterSpacing: '0.02em',
                  backdropFilter: activeCategory === category.id ? 'blur(10px)' : 'none',
                  boxShadow: activeCategory === category.id 
                    ? `0 0 20px ${category.color}30, inset 0 0 20px ${category.color}10` 
                    : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--avante-space-2)'
                }}
              >
                {/* Dot signature — same atom as the masthead family */}
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: category.color,
                    boxShadow: activeCategory === category.id
                      ? `0 0 8px ${category.color}AA`
                      : `0 0 6px ${category.color}66`,
                    transition: 'box-shadow 0.3s ease',
                  }}
                />
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(var(--avante-space-4), 4vw, var(--avante-space-6))',
            marginBottom: 'var(--avante-space-16)'
          }}
        >
          {filteredItems.map((item, index) => {
            const categoryColor = getCategoryColor(item.category);
            return (
              <Link
                key={item.id}
                to={`/${language}/library/${item.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                style={{
                  padding: 'clamp(var(--avante-space-6), 5vw, var(--avante-space-8))',
                  background: item.featured
                    ? `linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)`
                    : 'rgba(255, 255, 255, 0.02)',
                  border: item.featured
                    ? `1px solid ${categoryColor}40`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--avante-radius-20)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${categoryColor}08`;
                  e.currentTarget.style.borderColor = `${categoryColor}60`;
                  e.currentTarget.style.boxShadow = `0 20px 60px ${categoryColor}25, inset 0 0 30px ${categoryColor}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = item.featured 
                    ? 'rgba(255, 255, 255, 0.06)' 
                    : 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = item.featured
                    ? `${categoryColor}40`
                    : 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Glow Effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: `radial-gradient(circle, ${categoryColor}20 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />

                {item.featured && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                    style={{
                      position: 'absolute',
                      top: 'var(--avante-space-5)',
                      right: 'var(--avante-space-5)',
                      padding: '6px 12px',
                      background: `linear-gradient(135deg, ${categoryColor}30 0%, ${categoryColor}20 100%)`,
                      borderRadius: 'var(--avante-radius-8)',
                      fontSize: '10px',
                      fontWeight: 'var(--font-weight-bold)',
                      color: categoryColor,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: `1px solid ${categoryColor}40`,
                      boxShadow: `0 0 15px ${categoryColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    ⭐ Featured
                  </motion.div>
                )}

                <div style={{
                  display: 'flex',
                  gap: 'var(--avante-space-3)',
                  alignItems: 'center',
                  marginBottom: 'var(--avante-space-4)',
                  position: 'relative',
                  zIndex: 1,
                  flexWrap: 'wrap'
                }}>
                  {/* Dot signature replaces the previous emoji icon */}
                  <span
                    aria-hidden
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: categoryColor,
                      boxShadow: `0 0 8px ${categoryColor}80`,
                    }}
                  />
                  <span style={{
                    fontSize: 'clamp(11px, 1.5vw, 12px)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: categoryColor,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}>
                    {item.type}
                  </span>
                  {item.date && (
                    <>
                      <span style={{ 
                        color: 'var(--avante-text-muted)', 
                        fontSize: '12px' 
                      }}>
                        •
                      </span>
                      <span style={{
                        fontSize: 'clamp(11px, 1.5vw, 12px)',
                        color: 'var(--avante-text-muted)',
                        fontWeight: 'var(--font-weight-medium)'
                      }}>
                        {item.date}
                      </span>
                    </>
                  )}
                </div>

                <h3 
                  style={{
                    fontSize: 'clamp(20px, 3vw, 24px)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--avante-text-primary)',
                    marginBottom: 'var(--avante-space-4)',
                    lineHeight: '1.3',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {item.title}
                </h3>

                <p 
                  style={{ 
                    fontSize: 'clamp(14px, 2vw, 15px)',
                    color: 'var(--avante-text-secondary)',
                    lineHeight: '1.7',
                    marginBottom: 'var(--avante-space-6)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {item.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--avante-space-2)',
                    fontSize: 'clamp(12px, 1.5vw, 13px)',
                    color: 'var(--avante-text-muted)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{item.readTime} read</span>
                  </div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    style={{
                      fontSize: '20px',
                      color: categoryColor,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
              </Link>
            );
          })}</motion.div>

        {/* Newsletter CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--avante-radius-24)',
            padding: 'var(--avante-space-16)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Animated Background Glows */}
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(66, 70, 140, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(249, 180, 55, 0.12) 0%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(66, 70, 140, 0.2) 0%, rgba(249, 180, 55, 0.2) 100%)',
                border: '1px solid rgba(66, 70, 140, 0.3)',
                marginBottom: 'var(--avante-space-6)',
                fontSize: '28px',
                boxShadow: '0 0 30px rgba(66, 70, 140, 0.3)'
              }}
            >
              📬
            </motion.div>

            <h2 
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--avante-text-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                marginBottom: 'var(--avante-space-5)'
              }}
            >
              {t('library.cta.title')}
            </h2>

            <p 
              style={{ 
                fontSize: '17px',
                color: 'var(--avante-text-secondary)',
                marginBottom: 'var(--avante-space-10)',
                lineHeight: '1.7'
              }}
            >
              {t('library.cta.description')}
            </p>

            <div style={{
              display: 'flex',
              gap: 'var(--avante-space-3)',
              maxWidth: '550px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                placeholder={t('library.cta.placeholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: '1',
                  minWidth: '250px',
                  padding: '18px 24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 'var(--avante-radius-12)',
                  color: 'var(--avante-text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(66, 70, 140, 0.6)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 70, 140, 0.3)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewsletterSubscribe}
                style={{
                  padding: '18px 36px',
                  background: 'linear-gradient(135deg, rgba(66, 70, 140, 1) 0%, rgba(66, 70, 140, 0.9) 100%)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--avante-radius-12)',
                  fontSize: '16px',
                  fontWeight: 'var(--font-weight-bold)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 30px rgba(66, 70, 140, 0.4)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 40px rgba(66, 70, 140, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(66, 70, 140, 0.4)';
                }}
              >
                {t('library.cta.button')} →
              </motion.button>
            </div>

            <p style={{
              fontSize: '13px',
              color: 'var(--avante-text-muted)',
              marginTop: 'var(--avante-space-5)',
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--avante-space-2)'
            }}>
              <span style={{ fontSize: '16px' }}>🔒</span>
              {t('library.cta.note')}
            </p>
          </div>
        </motion.section>

      </div>

      <Footer />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}