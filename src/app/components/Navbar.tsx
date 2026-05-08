import { useEffect, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";
import { Link, useLocation } from "react-router";
import avanteLogo from "figma:asset/1ee77d6dc5cd19bf91735ef627eddf9652d066cf.png";

/**
 * Avante Navbar Component
 * 
 * States:
 * 1. "Nav / Hidden (Top)" - Hidden at top of page (Hero section)
 *    - opacity: 0, pointer-events: none
 * 2. "Nav / Visible (Scrolled)" - Visible after scrolling past hero
 *    - Sticky glass navbar with blur, appears after ~80-120px scroll
 * 
 * Implementation:
 * - Starts with opacity: 0 and pointer-events: none
 * - On scroll > threshold (100px): opacity: 1, pointer-events: auto
 * - Smooth transition 250ms
 * - Active section indicator based on scroll position
 * - Mobile responsive with hamburger menu
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar background after scrolling past 50px
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position. After the home
      // consolidation (Move B), the only remaining home anchors are #playbook,
      // #team, #principles, and #contact. The navbar links favor full-route
      // navigation over anchors so they work on every page.
      const sections = ['hero', 'playbook', 'team', 'principles'];
      const scrollPosition = window.scrollY + 200;

      // Use slice() to avoid mutating the array with reverse()
      const reversedSections = [...sections].reverse();
      for (const sectionId of reversedSections) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Click handler: route links navigate normally (default browser behavior),
  // anchor links smooth-scroll. Route links are detected by absence of '#'.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) {
      // Route navigation — let the browser handle it (or react-router via <Link>).
      // Just close mobile menu.
      setMobileMenuOpen(false);
      return;
    }
    // Anchor link — smooth scroll if target on current page.
    const targetId = href.split('#')[1];
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
    // If anchor target doesn't exist on current page, allow default browser
    // navigation (will navigate to home + scroll).
  };

  // Nav prioritizes destination pages (work on every route) over anchors.
  // Playbook + Team remain as #anchors because they still exist on home.
  const navLinks = [
    { id: 'why', label: language === 'pt' ? 'Por Que' : 'Why', href: `/${language}/why-avante`, isRoute: true },
    { id: 'playbook', label: 'Playbook', href: `/${language}#playbook`, isRoute: false },
    { id: 'portfolio', label: language === 'pt' ? 'Portfólio' : 'Portfolio', href: `/${language}/portfolio`, isRoute: true },
    { id: 'principles', label: language === 'pt' ? 'Princípios' : 'Principles', href: `/${language}/principles`, isRoute: true },
  ];

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(21, 30, 53, 0.95)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none'
        }}
      >
        <div 
          className="flex items-center justify-between px-6 lg:px-12"
          style={{
            height: '72px',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {/* Left: Logo */}
          <a 
            href="/#hero"
            onClick={(e) => handleNavClick(e, '/#hero')}
            className="flex items-center"
            style={{ textDecoration: 'none' }}
          >
            <img 
              src={avanteLogo}
              alt="Avante"
              style={{ 
                height: '32px',
                width: 'auto',
              }}
            />
          </a>

          {/* Center/Right: Navigation Links - Desktop Only */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ 
                  color: activeSection === link.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  paddingBottom: '4px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = activeSection === link.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)';
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(135deg, #F4A261 0%, #98509A 100%)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Far Right: Language Toggle + Contact + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('pt')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: language === 'pt' ? '#F4A261' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  padding: '4px 8px'
                }}
                onMouseEnter={(e) => {
                  if (language !== 'pt') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  if (language !== 'pt') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                PT
              </button>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
              <button
                onClick={() => setLanguage('en')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: language === 'en' ? '#F4A261' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: '14px',
                  fontWeight: 'var(--font-weight-medium)',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  padding: '4px 8px'
                }}
                onMouseEnter={(e) => {
                  if (language !== 'en') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  if (language !== 'en') e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                EN
              </button>
            </div>

            {/* Contact Button - Desktop */}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="hidden sm:inline-block"
              style={{
                padding: '12px 20px',
                minHeight: '44px',
                minWidth: '90px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #F4A261 0%, #98509A 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Contact
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'all 0.3s ease'
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                opacity: mobileMenuOpen ? 0 : 1
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#FFFFFF',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{
            backgroundColor: 'rgba(21, 30, 53, 0.98)',
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              gap: 'var(--avante-space-6)',
              padding: 'var(--avante-space-6)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  color: 'var(--avante-text-primary)',
                  textDecoration: 'none',
                  fontSize: 'clamp(24px, 5vw, 32px)',
                  fontWeight: 'var(--font-weight-medium)',
                  transition: 'all 0.3s ease',
                  animation: `slideIn 0.4s ease ${index * 0.05}s both`,
                  padding: 'var(--avante-space-2) var(--avante-space-4)',
                  borderRadius: 'var(--avante-radius-12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F9B437';
                  e.currentTarget.style.backgroundColor = 'rgba(249, 180, 55, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--avante-text-primary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              style={{
                marginTop: 'var(--avante-space-4)',
                padding: 'var(--avante-space-3) var(--avante-space-6)',
                background: 'linear-gradient(135deg, #F4A261 0%, #98509A 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: '18px',
                textDecoration: 'none',
                display: 'inline-block',
                animation: 'slideIn 0.4s ease 0.4s both',
                boxShadow: '0 0 30px rgba(249, 180, 55, 0.4)'
              }}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}