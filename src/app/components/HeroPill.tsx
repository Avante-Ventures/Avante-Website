import { useEffect, useState } from "react";

/**
 * Hero Floating Pill Button
 * 
 * Minimal floating "Join ecosystem" pill in hero top-right corner
 * - Only visible when at top of page (Hero section)
 * - Fades out when user scrolls past hero
 * - Subtle glass style
 */
export function HeroPill() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Pill fades out when scrolling past hero
      const scrollThreshold = 100;
      setIsVisible(window.scrollY <= scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-[var(--avante-space-3)] right-[var(--avante-space-3)] z-40"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 250ms ease',
      }}
    >
      <button
        className="avante-body"
        style={{
          padding: 'var(--avante-space-1) var(--avante-space-3)',
          backgroundColor: 'var(--avante-surface)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--avante-border)',
          borderRadius: '20px',
          color: 'var(--avante-text-primary)',
          cursor: 'pointer',
          fontWeight: 'var(--font-weight-semibold)',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.backgroundColor = 'var(--avante-surface-strong)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = 'var(--avante-surface)';
        }}
      >
        Join ecosystem
      </button>
    </div>
  );
}
