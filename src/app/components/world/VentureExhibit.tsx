import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { VENTURES, type VentureKind } from './ventures';

const LogoScene = lazy(() => import('./VentureLogoScene').catch(() => ({ default: () => <></> })));
const VISIT = { en: 'Visit website', pt: 'Visite o site', es: 'Visita el sitio' };
const PREVIEW = { en: 'Website preview', pt: 'Prévia do site', es: 'Vista del sitio' };

export function VentureExhibit({ kind, language }: { kind: VentureKind; language: keyof typeof VISIT }) {
  const venture = VENTURES[kind];
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setReady(false), []);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => {
      const active = inView && !motion.matches;
      setVisible(active);
      if (!active) setReady(false);
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    observer.observe(el);
    motion.addEventListener('change', update);
    return () => { observer.disconnect(); motion.removeEventListener('change', update); };
  }, []);
  return <div className={`venture-exhibit venture-exhibit--${kind}`}>
    <div className="venture-composition">
      <a className="venture-site-preview" href={venture.url} target="_blank" rel="noopener noreferrer" aria-label={`${VISIT[language]}: ${venture.name}`}>
        <div className="venture-site-bar" aria-hidden="true"><span>{venture.domain}</span><span>↗</span></div>
        <img src={`${venture.website}.webp`} srcSet={`${venture.website}-720.webp 720w, ${venture.website}.webp 1117w`} sizes="(max-width: 600px) 88vw, (max-width: 1100px) 72vw, 900px" alt={`${PREVIEW[language]} — ${venture.name}`} width="1117" height={venture.height} loading="lazy" decoding="async" />
      </a>
      <div ref={host} className="venture-logo-stage" data-ready={visible && ready} role="img" aria-label={venture.name}>
        <img className="venture-logo-fallback" src={venture.preview} alt="" loading="lazy" width={kind === 'legal' ? 930 : 590} height={kind === 'legal' ? 730 : 421} />
        {visible && <Suspense fallback={null}><LogoScene kind={kind} onReady={onReady} onFailure={onFailure} /></Suspense>}
      </div>
      {kind === 'legal' && <img className="venture-brand-wordmark" src="/world-assets/alphajuri-logo.svg" alt="" loading="lazy" width="4582" height="1048" />}
    </div>
    <a className="venture-website" href={venture.url} target="_blank" rel="noopener noreferrer" aria-label={`${VISIT[language]}: ${venture.name} (${venture.domain})`}>
      <span className="venture-website-domain">{venture.domain}</span><span>{VISIT[language]} <span aria-hidden="true">↗</span></span>
    </a>
  </div>;
}
