import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { COPY, chapterAt, clamp } from './story.mjs';
import './compound.css';

const Scene = lazy(() => import('./CompoundScene'));
class SceneBoundary extends Component<{ children: React.ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function CompoundExperience() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.en;
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [venture, setVenture] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const sync = () => { setReady(false); setEnhanced(media.matches); };
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enhanced || failed) return;
    const el = root.current!;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const next = clamp(-rect.top / Math.max(1, el.offsetHeight - window.innerHeight));
      progress.current = next;
      el.style.setProperty('--journey-progress', String(next));
      setChapter(chapterAt(next));
      window.dispatchEvent(new Event('compound-update'));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [enhanced, failed]);

  const goTo = (index: number) => {
    const el = root.current!;
    const start = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: start + (el.offsetHeight - window.innerHeight) * [0, .31, .55, .71, .98][index], behavior: 'smooth' });
  };
  const animated = enhanced && !failed;
  const workflow = venture === 0 ? copy.legal : copy.insurance;
  const renderWorkflow = () => <div className="compound-workflow">
    <div className="compound-venture-picker" role="group" aria-label={copy.detail}>
      <button type="button" aria-pressed={venture === 0} onClick={() => setVenture(0)}>αlphajuri <span>↗</span></button>
      <button type="button" aria-pressed={venture === 1} onClick={() => setVenture(1)}>WIR <span>↗</span></button>
    </div>
    <p className="compound-venture-description">{venture === 0 ? copy.legalDescription : copy.insuranceDescription}</p>
    <ol className="compound-flow" aria-live="polite">{workflow.map((item: string, i: number) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ol>
    <small>{copy.illustrative}</small>
  </div>;

  return <section ref={root} className={`compound-experience ${animated ? 'is-animated' : 'is-static'} ${ready ? 'is-ready' : ''}`} aria-label={copy.eyebrow}>
    <div className="compound-sticky">
      <div className="compound-skyline" aria-hidden="true" />
      <div className="compound-horizon" aria-hidden="true" />
      <div className="compound-topline"><span>AVANTE / BUILD JOURNAL</span><a href="#compound-people">{copy.skip} <span aria-hidden="true">↗</span></a></div>
      <div className="compound-art">
        <img className="compound-poster" src="/compound-assets/operation-poster.svg" alt="" width="1000" height="850" fetchPriority="high" />
        {animated && <SceneBoundary onFailure={onFailure}><Suspense fallback={null}><Scene progress={progress} venture={venture} labels={copy.labels} onReady={onReady} onFailure={onFailure} /></Suspense></SceneBoundary>}
        <div className="compound-art-caption"><span className="compound-live-dot" /> SÃO PAULO, BR <span>23°33′S · 46°38′W</span></div>
      </div>
      <div className="compound-copy-stack">
        {copy.titles.map((title: string[], i: number) => {
          const active = animated ? chapter === i : i === 0;
          return <div key={i} className={`compound-copy ${active ? 'is-current' : ''}`} aria-hidden={!active}>
            <p className="compound-eyebrow">{i === 0 ? copy.eyebrow : `0${i + 1} / ${copy.chapters[i]}`}</p>
            {i === 0 ? <h1>{title[0]}<br /><span>{title[1]}</span></h1> : <h2>{title[0]}<br /><span>{title[1]}</span></h2>}
            <p className="compound-description">{copy.descriptions[i]}</p>
            {i === 0 && <button className="compound-text-link" type="button" onClick={() => animated ? goTo(1) : document.getElementById('compound-static-story')?.scrollIntoView({ behavior: 'smooth' })}>{copy.scroll} <span>↓</span></button>}
            {i === 2 && <div className="compound-layers">{copy.labels.map((label: string, n: number) => <span key={label}><b>0{n + 1}</b>{label}</span>)}</div>}
            {i === 3 && renderWorkflow()}
            {i === 4 && <a href="#compound-people" className="compound-text-link">{copy.next} <span>↗</span></a>}
          </div>;
        })}
      </div>
      {animated && <nav className="compound-chapters" aria-label={copy.scroll}>
        {copy.chapters.map((label: string, i: number) => <button key={label} type="button" onClick={() => goTo(i)} aria-current={chapter === i ? 'step' : undefined}><span>0{i + 1}</span><span>{label}</span><span className="compound-chapter-dot" /></button>)}
        <div className="compound-progress" />
      </nav>}
    </div>
    {!animated && <div id="compound-static-story" className="compound-static-story">
      {[1, 2, 3, 4].map(i => <article key={i}><span className="compound-eyebrow">0{i + 1} / {copy.chapters[i]}</span><h2>{copy.titles[i].join(' ')}</h2><p>{copy.descriptions[i]}</p>{i === 2 && <div className="compound-layers">{copy.labels.map((label: string) => <span key={label}>{label}</span>)}</div>}{i === 3 && renderWorkflow()}{i === 4 && <a className="compound-text-link" href="#compound-people">{copy.next} ↗</a>}</article>)}
    </div>}
  </section>;
}
