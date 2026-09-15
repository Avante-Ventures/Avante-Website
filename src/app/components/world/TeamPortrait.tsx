import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';

// Art direction for the portrait backdrop, independent of the person's bio/location.
const SUNSET_BACKDROPS: Record<string, string> = {
  andrea: 'San Francisco', jess: 'San Francisco', cristian: 'San Francisco',
  amanda: 'São Paulo', felipe: 'São Paulo', luiz: 'São Paulo',
};
// Square originals cover a taller portrait box: size for the painted image,
// including the crop and desktop hover, rather than just the card's width.
const PORTRAIT_SIZES = '(max-width: 380px) min(calc((100vw - 48px) * 1.25), 390px), (max-width: 600px) calc((100vw - 68px) / 1.5), (max-width: 899px) min(calc((100vw - 154px) * .5875), 410px), 410px';

export function TeamPortrait({ slug, name, city, index, sizes = PORTRAIT_SIZES }: { slug: string; name: string; city: string; index: number; sizes?: string }) {
  const backdrop = SUNSET_BACKDROPS[slug];
  const source = backdrop ? `/world-assets/team/${slug}-sunset-hq` : null;
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const interactive = useRef(false);
  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const syncMotion = () => {
      interactive.current = media.matches;
      if (!media.matches) {
        cancelAnimationFrame(frame.current);
        element.style.removeProperty('--portrait-x');
        element.style.removeProperty('--portrait-y');
      }
    };
    syncMotion();
    media.addEventListener('change', syncMotion);
    // The default image is visible. Intersection only starts a one-time framing animation.
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: .18 });
    observer.observe(element);
    return () => { observer.disconnect(); media.removeEventListener('change', syncMotion); cancelAnimationFrame(frame.current); };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!interactive.current || event.pointerType !== 'mouse') return;
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--portrait-x', `${-y * 2.5}deg`);
      element.style.setProperty('--portrait-y', `${x * 3.5}deg`);
    });
  }

  function reset() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.removeProperty('--portrait-x');
    ref.current?.style.removeProperty('--portrait-y');
  }

  return <div ref={ref} className="person-photo" data-entered={entered && loaded} style={{ '--portrait-delay': `${index % 3 * 90}ms` } as CSSProperties} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    <div className="person-photo-surface"><img src={source ? `${source}-1254.webp` : `/redesign-assets/team-${slug}.webp`} srcSet={source ? `${source}-480.webp 480w, ${source}-960.webp 960w, ${source}-1254.webp 1254w` : undefined} sizes={source ? sizes : undefined} style={source ? { objectPosition: '30% 30%' } : undefined} alt={name} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} width="1254" height="1254" /><span>{backdrop ?? city}</span></div>
  </div>;
}
