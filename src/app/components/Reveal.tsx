import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

// Reveal — the scroll-telling primitive. Children fade + rise in when they
// scroll into view. Defaults to VISIBLE under prerender (navigator.webdriver)
// or reduced-motion, so crawlers and a11y users get the resolved state and
// the prerender snapshot never ships blank.
interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, delay = 0, y = 18, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const wd = (navigator as Navigator & { webdriver?: boolean }).webdriver;
    return Boolean(reduce || wd);
  });

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
