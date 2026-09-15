import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { focusSection } from './focusSection';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Keep the floating button clear of the journey's chapter and skip controls.
      const tour = document.querySelector('.world-tour');
      const inJourney = tour && tour.getBoundingClientRect().bottom > 0;
      setIsVisible(matchMedia('(min-width: 900px)').matches && window.scrollY > 500 && !inJourney);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); };
  }, []);

  const scrollToTop = () => {
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      // The chapter heading may still be hidden while the camera returns.
      focusSection(heroSection, behavior, false);
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: 'var(--avante-space-4)',
        right: 'var(--avante-space-4)',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      aria-label={language === 'pt' ? 'Voltar ao início' : language === 'es' ? 'Volver al inicio' : 'Back to top'}
    >
      <ArrowUp size={20} color="rgba(255, 255, 255, 0.9)" />
    </button>
  );
}
