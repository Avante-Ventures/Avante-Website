import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '@/app/hooks/useLanguage';
import '../world/world.css';
import './interiors.css';

const Sculpture = lazy(() => import('./InteriorScene'));
export type InteriorKind = 'studio' | 'ventures' | 'investors' | 'principles';

class SculptureBoundary extends Component<{ children: ReactNode; onFailure: (ready: boolean) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(false); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function InteriorSculpture({ mode = 'gallery', stage = 5 }: { mode?: 'gallery' | 'process'; stage?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false), [ready, setReady] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(min-width: 760px) and (prefers-reduced-motion: no-preference)');
    let visible = false;
    const update = () => { setEnabled(visible && mq.matches); setReady(false); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { rootMargin: '100px' });
    if (host.current) observer.observe(host.current);
    mq.addEventListener('change', update);
    return () => { observer.disconnect(); mq.removeEventListener('change', update); };
  }, []);
  return <div ref={host} className={`interior-sculpture interior-sculpture--${mode}`} data-ready={ready && enabled} aria-hidden="true">
    <div className="sculpture-fallback">{mode === 'gallery' ? <img src="/world-assets/avante-A.svg" alt="" width="200" height="260" /> : <div className="structure-fallback">{Array.from({ length: 6 }, (_, i) => <i key={i} data-active={i <= stage} style={{ bottom: `${i * 24}px` }} />)}</div>}<span /></div>
    {enabled && <SculptureBoundary onFailure={setReady}><Suspense fallback={null}><Sculpture mode={mode} stage={stage} onReady={setReady} /></Suspense></SculptureBoundary>}
  </div>;
}

export function InteriorHero({ kind, eyebrow, title, description, children }: { kind: InteriorKind; eyebrow: string; title: ReactNode; description: ReactNode; children?: ReactNode }) {
  const { language } = useLanguage();
  const labels = { en: ['Home', 'Explore the venture builder', 'Explore the ventures', 'The investment thesis', 'Explore the process'], pt: ['Início', 'Conheça o venture builder', 'Explore os ventures', 'A tese de investimento', 'Conheça o processo'], es: ['Inicio', 'Conoce el venture builder', 'Explora los ventures', 'La tesis de inversión', 'Conoce el proceso'] }[language];
  const picture = kind === 'studio' ? 'saopaulo-perspective' : 'saopaulo-interior';
  const photo = kind === 'studio' || kind === 'investors';
  return <header className={`interior-hero interior-hero--${kind}`}>
    <div className="interior-hero-art" aria-hidden="true">
      {photo && <picture><source media="(max-width: 600px)" srcSet={kind === 'studio' ? '/world-assets/saopaulo-perspective-portrait-588.webp' : '/world-assets/saopaulo-interior-portrait-600.webp'} /><img src={`/world-assets/${picture}-1280.webp`} srcSet={`/world-assets/${picture}-1280.webp 1280w, /world-assets/${picture}-${kind === 'studio' ? '1672' : '1920'}.webp ${kind === 'studio' ? 1672 : 1920}w`} sizes="100vw" alt="" width="1920" height="1080" fetchPriority="high" /></picture>}
      {!photo && <div className="interior-architecture"><i /><i /><i /></div>}
    </div>
    {!photo && <InteriorSculpture mode={kind === 'principles' ? 'process' : 'gallery'} />}
    <div className="interior-hero-content">
      <Link className="interior-breadcrumb" to={`/${language}`}>{labels[0]} <span>/</span> {eyebrow}</Link>
      <span className="interior-kicker">{eyebrow}</span>
      <h1>{title}</h1><p>{description}</p>
      {children ?? <a className="interior-link" href="#page-content">{labels[{ studio: 1, ventures: 2, investors: 3, principles: 4 }[kind]]} <span>↓</span></a>}
    </div>
    <div className="interior-hero-caption"><span>Avante Ventures</span><span>{photo ? 'São Paulo / Brasil' : kind === 'principles' ? 'Research → Compound' : 'Built to compound'}</span></div>
  </header>;
}

export function InteriorClosing({ title, body }: { title?: string; body?: string }) {
  const { language } = useLanguage();
  const c = { en: ['The next chapter is being built.', 'Building a company or exploring a partnership? Tell us what you are working on.', 'Start a conversation'], pt: ['O próximo capítulo está em construção.', 'Está construindo uma empresa ou buscando uma parceria? Conte o que você está desenvolvendo.', 'Vamos conversar'], es: ['El próximo capítulo está en construcción.', '¿Estás construyendo una empresa o buscando una alianza? Cuéntanos en qué estás trabajando.', 'Conversemos'] }[language];
  return <section className="interior-closing"><div><span className="interior-kicker">Avante Ventures</span><h2>{title ?? c[0]}</h2><p>{body ?? c[1]}</p><a className="interior-button" href="mailto:cristian@avanteventures.com?subject=Building%20with%20Avante">{c[2]} ↗</a></div><img src="/world-assets/avante-A.svg" alt="" loading="lazy" width="180" height="240" /></section>;
}
