// Navbar — Phase B editorial refactor.
//
// Old (rev a3): glass card pill, gradient pixel logo, large gradient CTA
// "Contact" pill. Read like a SaaS marketing site.
//
// New: editorial publication header. JetBrains Mono uppercase nav links with
// 0.18em tracking, AvanteLockup (mark + word), minimal box-bordered CTA with
// a pulsing dot ("Vintage 1 — open"), and a low-key EN / PT mono toggle.
//
// Behavior preserved: scroll-triggered solid background, active section
// indicator (now a top-light underline rather than a gradient bar to match
// the editorial vocabulary), mobile hamburger, language switching, and
// route-aware navigation (route links navigate normally, anchor links
// smooth-scroll on the current page or route + scroll on a different page).
//
// Active link logic: routes win when their pathname matches; anchors win
// when their target section is in view on the home route.

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useLanguage } from '@/app/hooks/useLanguage'
import { AvanteLockup } from '@/app/components/AvanteLockup'

// Contact CTA flag — set via Vercel env variable.
// Values: 'shown' (default — neutral "Contact" CTA) or 'hidden' (CTA hidden
// entirely). Variable name kept (`VITE_VINTAGE_STATUS`) for backward
// Vercel-env compatibility; the CTA no longer carries any LP / fund-raise
// semantics or pulse — it is a plain link to the contact anchor.
const VINTAGE_STATUS = (import.meta.env.VITE_VINTAGE_STATUS ?? 'shown') as
  | 'shown'
  | 'hidden'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = ['hero', 'playbook', 'team', 'principles']
      const scrollPosition = window.scrollY + 200
      const reversed = [...sections].reverse()
      for (const sectionId of reversed) {
        const element = document.getElementById(sectionId)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId)
          return
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes('#')) {
      setMobileMenuOpen(false)
      return
    }
    const targetId = href.split('#')[1]
    const element = document.getElementById(targetId)
    if (element) {
      e.preventDefault()
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  // Route paths use react-router <Link>; anchors use <a> for smooth-scroll.
  const navLinks: Array<{
    id: string
    label: string
    href: string
    isRoute: boolean
  }> = [
    {
      id: 'why',
      label: language === 'pt' ? 'Por Que' : language === 'es' ? 'Por Qué' : 'Why',
      href: `/${language}/why-avante`,
      isRoute: true,
    },
    { id: 'playbook', label: 'Playbook', href: `/${language}#playbook`, isRoute: false },
    {
      id: 'portfolio',
      label: language === 'pt' ? 'Portfólio' : language === 'es' ? 'Portafolio' : 'Portfolio',
      href: `/${language}/portfolio`,
      isRoute: true,
    },
    {
      id: 'principles',
      label: language === 'pt' ? 'Princípios' : language === 'es' ? 'Principios' : 'Principles',
      href: `/${language}/principles`,
      isRoute: true,
    },
  ]

  // A route is active if pathname includes its tail; on home, fall back to
  // active scroll section for the playbook anchor.
  const isLinkActive = (link: (typeof navLinks)[number]) => {
    if (link.isRoute) {
      return location.pathname.endsWith(link.href.split('/').pop() || '')
    }
    return activeSection === link.id
  }

  const navTextStyle: React.CSSProperties = {
    fontFamily: 'var(--avt-font-body)',
    fontSize: '12.5px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: isScrolled ? 'rgba(6, 7, 13, 0.78)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(14px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--avt-hair)' : '1px solid transparent',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          className="flex items-center justify-between px-6 lg:px-12"
          style={{ height: '72px', maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Lockup — links to home with current locale */}
          <Link
            to={`/${language}`}
            aria-label="Avante — Home"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            <AvanteLockup size="sm" />
          </Link>

          {/* Center nav links — desktop only */}
          <div className="hidden lg:flex items-center" style={{ gap: '36px' }}>
            {navLinks.map((link) => {
              const active = isLinkActive(link)
              const color = active ? '#fff' : 'var(--avt-muted)'
              const sharedProps = {
                style: {
                  ...navTextStyle,
                  color,
                  position: 'relative' as const,
                  paddingBottom: '4px',
                },
                onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = '#fff'
                },
                onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = active ? '#fff' : 'var(--avt-muted)'
                },
              }

              if (link.isRoute) {
                return (
                  <Link key={link.id} to={link.href} {...sharedProps}>
                    {link.label}
                    {active && <ActiveUnderline />}
                  </Link>
                )
              }

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  {...sharedProps}
                >
                  {link.label}
                  {active && <ActiveUnderline />}
                </a>
              )
            })}
          </div>

          {/* Right cluster: language toggle + Contact CTA + mobile menu */}
          <div className="flex items-center" style={{ gap: '12px' }}>
            <LanguageToggleMini language={language} setLanguage={setLanguage} />

            {VINTAGE_STATUS !== 'hidden' && (
              <a
                href={`/${language}#contact`}
                onClick={(e) => handleNavClick(e, `/${language}#contact`)}
                className="hidden sm:inline-flex"
                style={{
                  ...navTextStyle,
                  color: '#fff',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid var(--avt-hair-2)',
                  padding: '10px 14px',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--avt-hair-2)')}
              >
                {language === 'pt' ? 'Contato' : language === 'es' ? 'Contacto' : 'Contact'}
              </a>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="avt-nav-hamburger"
              aria-label="Toggle menu"
              style={{
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <HamburgerBar open={mobileMenuOpen} position="top" />
              <HamburgerBar open={mobileMenuOpen} position="middle" />
              <HamburgerBar open={mobileMenuOpen} position="bottom" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{
            backgroundColor: 'rgba(6, 7, 13, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.3s ease',
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
              gap: '32px',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link, index) => {
              const sharedProps = {
                style: {
                  fontFamily: 'var(--avt-font-display)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(28px, 6vw, 40px)',
                  color: '#fff',
                  textDecoration: 'none',
                  animation: `slideIn 0.4s ease ${index * 0.05}s both`,
                },
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.href),
              }
              return link.isRoute ? (
                <Link key={link.id} to={link.href} {...sharedProps}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.id} href={link.href} {...sharedProps}>
                  {link.label}
                </a>
              )
            })}
            {VINTAGE_STATUS !== 'hidden' && (
              <a
                href={`/${language}#contact`}
                onClick={(e) => handleNavClick(e, `/${language}#contact`)}
                style={{
                  marginTop: '16px',
                  ...navTextStyle,
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid var(--avt-hair-2)',
                  padding: '14px 20px',
                  animation: 'slideIn 0.4s ease 0.4s both',
                }}
              >
                {language === 'pt' ? 'Contato' : language === 'es' ? 'Contacto' : 'Contact'}
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        /* Hamburger only renders below lg breakpoint (1024px). Inline media
           query because Tailwind's lg:hidden has been flaky in this build. */
        .avt-nav-hamburger { display: none; }
        @media (max-width: 1023px) { .avt-nav-hamburger { display: flex; } }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes navPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

function ActiveUnderline() {
  return (
    <span
      aria-hidden
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '1px',
        background: '#fff',
      }}
    />
  )
}

function LanguageToggleMini({
  language,
  setLanguage,
}: {
  language: 'en' | 'pt' | 'es'
  setLanguage: (l: 'en' | 'pt' | 'es') => void
}) {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--avt-font-body)',
    fontSize: '11.5px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 6px',
    transition: 'color 0.2s ease',
  }
  // Three-way toggle: EN / PT / ES separated by hairline slashes.
  const langs: Array<'en' | 'pt' | 'es'> = ['en', 'pt', 'es']
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        border: '1px solid var(--avt-hair-2)',
        padding: '6px 4px',
      }}
    >
      {langs.map((lang, i) => (
        <span key={lang} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <button
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            style={{
              ...baseStyle,
              color: language === lang ? '#fff' : 'var(--avt-muted)',
            }}
          >
            {lang.toUpperCase()}
          </button>
          {i < langs.length - 1 && (
            <span style={{ color: 'var(--avt-hair-2)', fontSize: '11px' }}>/</span>
          )}
        </span>
      ))}
    </span>
  )
}

function HamburgerBar({ open, position }: { open: boolean; position: 'top' | 'middle' | 'bottom' }) {
  let transform = 'none'
  let opacity: number | undefined
  if (open && position === 'top') transform = 'rotate(45deg) translateY(6px)'
  if (open && position === 'bottom') transform = 'rotate(-45deg) translateY(-6px)'
  if (open && position === 'middle') opacity = 0
  return (
    <span
      style={{
        display: 'block',
        width: '24px',
        height: '2px',
        backgroundColor: '#fff',
        borderRadius: '2px',
        transition: 'all 0.3s ease',
        transform,
        opacity,
      }}
    />
  )
}
