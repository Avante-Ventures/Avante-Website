import { useLanguage } from "@/app/hooks/useLanguage";
import { Navbar } from "@/app/components/Navbar";
import { BackToTop } from "@/app/components/BackToTop";
import { Link } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";

type Category = 'all' | 'insights' | 'research' | 'casestudies' | 'playbooks' | 'brazil' | 'ai';

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  type: string;
  readTime: string;
  featured?: boolean;
  date?: string;
}

export default function LibraryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const libraryItems: LibraryItem[] = [
    {
      id: '1',
      title: 'Why Venture Studios Outperform Traditional VC',
      description: 'Deep dive into the data: how hands-on execution and pre-traction capital create superior returns across all asset classes.',
      category: 'insights',
      type: 'Research Report',
      readTime: '12 min',
      featured: true,
      date: 'Jan 2026'
    },
    {
      id: '2',
      title: 'The First Ticket Advantage: A Framework',
      description: 'Why investing before consensus forms—combined with operational support—creates compounding returns and strategic control.',
      category: 'playbooks',
      type: 'Playbook',
      readTime: '8 min',
      featured: true,
      date: 'Jan 2026'
    },
    {
      id: '3',
      title: 'Brazil AI Market Report 2026',
      description: 'Service-heavy industries, low product saturation, and AI adoption creating generational opportunities in Latin America\'s largest economy.',
      category: 'brazil',
      type: 'Market Report',
      readTime: '15 min',
      featured: true,
      date: 'Jan 2026'
    },
    {
      id: '4',
      title: 'Building AI-Native Companies: The Avante Playbook',
      description: 'Our repeatable system for launching 3-4 ventures per year: from research to traction to compounding.',
      category: 'playbooks',
      type: 'Playbook',
      readTime: '10 min',
      date: 'Dec 2025'
    },
    {
      id: '5',
      title: 'Case Study: From Idea to Cashflow in 90 Days',
      description: 'How we co-built an AI workflow automation tool in a fragmented service industry—proving unit economics in 12 weeks.',
      category: 'casestudies',
      type: 'Case Study',
      readTime: '7 min',
      date: 'Dec 2025'
    },
    {
      id: '6',
      title: 'Unit Economics 101: LTV:CAC from Day One',
      description: 'Why cashflow-first businesses compound, and how to prove unit economics before scaling.',
      category: 'insights',
      type: 'Article',
      readTime: '6 min',
      date: 'Nov 2025'
    },
    {
      id: '7',
      title: 'The Operator\'s Guide to AI Automation',
      description: 'Identifying workflows where AI creates 10x advantages—a framework for domain experts building AI-native products.',
      category: 'ai',
      type: 'Guide',
      readTime: '9 min',
      date: 'Nov 2025'
    },
    {
      id: '8',
      title: 'Why Brazil\'s Service Economy is Ripe for Disruption',
      description: 'Manual workflows, fragmented industries, and low software penetration create massive opportunities for AI automation.',
      category: 'brazil',
      type: 'Analysis',
      readTime: '11 min',
      date: 'Oct 2025'
    },
    {
      id: '9',
      title: 'Global Venture Studio Data: 50% Annual Returns',
      description: 'GSSN Report breakdown: why venture studios lead all asset classes and what this means for emerging markets.',
      category: 'research',
      type: 'Data Report',
      readTime: '14 min',
      date: 'Oct 2025'
    }
  ];

  const categories = [
    { 
      id: 'all', 
      label: t('library.category.all'), 
      color: '#FFFFFF',
      icon: '✨'
    },
    { 
      id: 'insights', 
      label: t('library.category.insights'), 
      color: '#42468C',
      icon: '💡'
    },
    { 
      id: 'research', 
      label: t('library.category.research'), 
      color: '#98509A',
      icon: '📊'
    },
    { 
      id: 'casestudies', 
      label: t('library.category.casestudies'), 
      color: '#F18B46',
      icon: '🎯'
    },
    { 
      id: 'playbooks', 
      label: t('library.category.playbooks'), 
      color: '#F9B437',
      icon: '📖'
    },
    { 
      id: 'brazil', 
      label: t('library.category.brazil'), 
      color: '#42468C',
      icon: '🇧🇷'
    },
    { 
      id: 'ai', 
      label: t('library.category.ai'), 
      color: '#98509A',
      icon: '🤖'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? libraryItems 
    : libraryItems.filter(item => item.category === activeCategory);

  const getCategoryColor = (category: Category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || '#FFFFFF';
  };

  const getCategoryIcon = (category: Category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || '✨';
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

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: 'var(--avante-background)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
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
            to="/" 
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

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ 
              display: 'inline-block',
              padding: '8px 14px',
              backgroundColor: 'rgba(66, 70, 140, 0.12)',
              border: '1px solid rgba(66, 70, 140, 0.25)',
              borderRadius: 'var(--avante-radius-8)',
              marginBottom: 'var(--avante-space-6)',
              fontSize: '11px',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'rgba(66, 70, 140, 1)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            {t('library.hero.badge')}
          </motion.div>

          <h1 
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--avante-text-primary)',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              marginBottom: 'var(--avante-space-6)',
              maxWidth: '900px'
            }}
          >
            {t('library.hero.title')}
          </h1>

          <p 
            style={{ 
              fontSize: '18px',
              color: 'var(--avante-text-secondary)',
              maxWidth: '800px',
              lineHeight: '1.7',
              marginBottom: 'var(--avante-space-6)' }}
          >
            {t('library.hero.subtitle')}
          </p>

          <div 
            style={{
              display: 'flex',
              gap: 'var(--avante-space-3)',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ 
              fontSize: '13px', 
              color: 'var(--avante-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--avante-space-2)',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--avante-radius-8)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%',
                backgroundColor: '#F9B437'
              }} />
              {t('library.hero.stats')}
            </span>
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
                <span style={{ fontSize: '16px' }}>{category.icon}</span>
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
            const categoryIcon = getCategoryIcon(item.category);
            return (
              <motion.div
                key={item.id}
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
                  <span style={{
                    fontSize: '20px'
                  }}>
                    {categoryIcon}
                  </span>
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

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}