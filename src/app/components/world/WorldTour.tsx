import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLanguage } from '@/app/hooks/useLanguage';
import { clamp, journeyPose, stops, TOUR_SECONDS, ENHANCED_QUERY } from './journey.mjs';
import { JourneyFilm } from './JourneyFilm';
import { advanceJourney, dampProgress, resumeJourney } from './filmPlayback.mjs';
import { CityPicture } from './CityPicture';
import { Link } from 'react-router';
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
const COPY = {
  en: { eyebrow: 'A venture builder. A world of possibility.', title: ['Built in Brazil.', 'Built to compound.'], intro: 'Avante Ventures is a venture builder building AI-native companies in Brazil and Latin America.', explore: 'Explore our ventures', studio: 'Meet the venture builder', scroll: 'Scroll to explore', skip: 'Skip the journey', tour: 'Explore the world', places: ['The world', 'Brazil', 'São Paulo', 'Avante'], chapters: [ ['A global perspective.', 'A local conviction.', 'Experience across Silicon Valley and Brazil. A shared ambition to build enduring companies.'], ['The next chapter', 'starts here.', 'We turn local complexity into companies. Built alongside founders, from the first question to the work of operating.'] ], coord: ['23°33′S · 46°38′W', 'Brazil · Latin America', 'São Paulo', 'Avante · São Paulo'] },
  pt: { eyebrow: 'Um venture builder. Um mundo de possibilidades.', title: ['Nascido no Brasil.', 'Feito para crescer.'], intro: 'A Avante Ventures é um venture builder que constrói empresas AI-native no Brasil e na América Latina.', explore: 'Explore nossos ventures', studio: 'Conheça o venture builder', scroll: 'Role para explorar', skip: 'Pular o percurso', tour: 'Explore o mundo', places: ['O mundo', 'Brasil', 'São Paulo', 'Avante'], chapters: [ ['Uma visão global.', 'Uma convicção local.', 'Experiência entre o Vale do Silício e o Brasil. Uma ambição compartilhada de construir empresas duradouras.'], ['O próximo capítulo', 'começa aqui.', 'Transformamos a complexidade local em empresas. Ao lado dos fundadores, da primeira pergunta à operação.'] ], coord: ['23°33′S · 46°38′W', 'Brasil · América Latina', 'São Paulo', 'Avante · São Paulo'] },
  es: { eyebrow: 'Un venture builder. Un mundo de posibilidades.', title: ['Nacido en Brasil.', 'Hecho para crecer.'], intro: 'Avante Ventures es un venture builder que construye empresas AI-native en Brasil y Latinoamérica.', explore: 'Explora nuestros ventures', studio: 'Conoce el venture builder', scroll: 'Desliza para explorar', skip: 'Saltar el recorrido', tour: 'Explora el mundo', places: ['El mundo', 'Brasil', 'São Paulo', 'Avante'], chapters: [ ['Una perspectiva global.', 'Una convicción local.', 'Experiencia entre Silicon Valley y Brasil. Una ambición compartida de construir empresas duraderas.'], ['El próximo capítulo', 'empieza aquí.', 'Convertimos la complejidad local en empresas. Junto a los fundadores, desde la primera pregunta hasta la operación.'] ], coord: ['23°33′S · 46°38′W', 'Brasil · Latinoamérica', 'São Paulo', 'Avante · São Paulo'] },
};
const ARRIVAL = {
  en: { play: 'Watch the journey', pause: 'Pause journey', replay: 'Replay journey', welcome: 'Welcome to Avante.', title: ['This is where', 'we build.'], body: 'From a world of possibility to the companies taking shape. Come inside the work.', choose: 'Discover what we are building', legal: 'Liquidity for judicial claims', risk: 'Intelligence for insurance', enter: 'Explore', label: 'Avante / Built to compound', film: 'Watch São Paulo', close: 'Close film' },
  pt: { play: 'Assista ao percurso', pause: 'Pausar percurso', replay: 'Repetir percurso', welcome: 'Bem-vindo à Avante.', title: ['É aqui que', 'construímos.'], body: 'De um mundo de possibilidades às empresas que ganham forma. Conheça o trabalho.', choose: 'Descubra o que estamos construindo', legal: 'Liquidez para créditos judiciais', risk: 'Inteligência para seguros', enter: 'Explorar', label: 'Avante / Feito para crescer', film: 'Assista a São Paulo', close: 'Fechar filme' },
  es: { play: 'Ver el recorrido', pause: 'Pausar recorrido', replay: 'Repetir recorrido', welcome: 'Bienvenido a Avante.', title: ['Aquí es donde', 'construimos.'], body: 'De un mundo de posibilidades a las empresas que toman forma. Conoce el trabajo.', choose: 'Descubre lo que estamos construyendo', legal: 'Liquidez para créditos judiciales', risk: 'Inteligencia para seguros', enter: 'Explorar', label: 'Avante / Hecho para crecer', film: 'Ver São Paulo', close: 'Cerrar video' },
};
export function WorldTour() {
  const { language } = useLanguage(); const c = COPY[language], a = ARRIVAL[language];
  const section = useRef<HTMLElement>(null); const progress = useRef(0);
  const playback = useRef(0);
  const guided = useRef(false), filmVideo = useRef<HTMLVideoElement | null>(null);
  const ambient = useRef(true);
  const filmUnavailable = useRef(false);
  const [playing, setPlaying] = useState(false), [filmOpen, setFilmOpen] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [filmRequested, setFilmRequested] = useState(false);
  // Reserve the desktop journey height before the router resolves venture anchors.
  const [enhanced, setEnhanced] = useState(() => typeof window !== 'undefined' && matchMedia(ENHANCED_QUERY).matches), [failed, setFailed] = useState(false), [ready, setReady] = useState(false), [chapter, setChapter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const success = useCallback(() => setReady(true), []);
  const failure = useCallback(() => { setFailed(true); setReady(false); }, []);
  const animated = enhanced && !failed;
  const [Scene, setScene] = useState<typeof import('./WorldScene')['default'] | null>(null);
  const stop = useCallback(() => {
    guided.current = false;
    cancelAnimationFrame(playback.current); playback.current = 0;
    if (!ambient.current || document.hidden) filmVideo.current?.pause();
    setPlaying(false);
    window.dispatchEvent(new Event('avante-world-update'));
  }, []);
  const blocked = useCallback(() => { filmUnavailable.current = true; ambient.current = false; stop(); }, [stop]);
  const present = useCallback((value: number) => {
    const el = section.current;
    if (!el) return;
    progress.current = clamp(value);
    const pose = journeyPose(progress.current);
    if (progress.current > .06 && progress.current < .85) setFilmRequested(true);
    setChapter(pose.chapter); setSeconds(Math.round(progress.current * TOUR_SECONDS));
    for (const key of ['landing', 'arrival', 'discovery', 'copyOpacity'] as const) el.style.setProperty(`--${key}`, String(pose[key]));
    el.dataset.discovered = String(pose.discovery > 0.05);
    el.style.setProperty('--travel', String(progress.current));
    window.dispatchEvent(new Event('avante-world-update'));
  }, []);
  useEffect(() => {
    if (!animated || Scene) return;
    const el = section.current;
    if (!el) return;
    let cancelled = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      import('./WorldScene').then(module => { if (!cancelled) setScene(() => module.default); }).catch(() => { if (!cancelled) failure(); });
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => { cancelled = true; observer.disconnect(); };
  }, [animated, Scene, failure]);
  useEffect(() => {
    const query = matchMedia(ENHANCED_QUERY);
    const change = () => { setEnhanced(query.matches); stop(); };
    change(); query.addEventListener('change', change); return () => query.removeEventListener('change', change);
  }, [stop]);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let frame = 0, previous = performance.now();
    const update = (now: number) => {
      frame = 0;
      if (!animated) { stop(); present(0); return; }
      if (guided.current) return;
      const target = animated ? clamp(-el.getBoundingClientRect().top / Math.max(1, el.offsetHeight - window.innerHeight)) : 0;
      const elapsed = Math.min((now - previous) / 1000, .05); previous = now;
      present(animated && !document.hidden ? dampProgress(progress.current, target, elapsed) : target);
      if (progress.current !== target) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!guided.current && !frame) { previous = performance.now() - 16; frame = requestAnimationFrame(update); } };
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule); update(performance.now());
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, [animated, present, stop]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (event.key !== 'Escape' && target?.closest('input, select, textarea, video, [contenteditable="true"]')) return;
      if (event.key === ' ' && target?.closest('button, a')) return;
      if (event.key === 'Escape') ambient.current = false;
      if (['Escape', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) stop();
    };
    const visibility = () => { if (document.hidden) stop(); };
    window.addEventListener('wheel', stop, { passive: true }); window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', key); document.addEventListener('visibilitychange', visibility);
    return () => { cancelAnimationFrame(playback.current); window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); window.removeEventListener('keydown', key); document.removeEventListener('visibilitychange', visibility); };
  }, [stop]);
  const scrollTo = (p: number, behavior: ScrollBehavior = 'instant') => {
    const el = section.current;
    if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - innerHeight) * p, behavior });
  };
  const jump = (index: number) => { ambient.current = true; stop(); scrollTo(stops[index], 'smooth'); };
  const watch = () => {
    if (playing || filmPlaying) { ambient.current = false; stop(); return; }
    ambient.current = true;
    setFilmRequested(true);
    const start = resumeJourney(progress.current, filmVideo.current);
    let previous = performance.now(), stalled = 0;
    filmUnavailable.current = false;
    guided.current = true;
    present(start); scrollTo(start);
    setPlaying(true);
    const tick = (now: number) => {
      if (!guided.current) return;
      const elapsed = (now - previous) / 1000; previous = now;
      const p = advanceJourney(progress.current, elapsed, filmVideo.current, filmUnavailable.current);
      stalled = p === progress.current ? stalled + elapsed : 0;
      if (stalled > 10) { stop(); return; }
      present(p); scrollTo(p);
      if (p < 1) playback.current = requestAnimationFrame(tick); else stop();
    };
    playback.current = requestAnimationFrame(tick);
  };
  const arrived = animated && chapter === 3;
  return <section ref={section} id="hero" data-chapter={chapter} className={`world-tour ${animated ? 'world-tour--3d' : ''} ${ready && animated ? 'world-tour--ready' : ''}`} aria-label={c.tour}>
    <div className="world-stage">
      <CityPicture className="world-poster" priority opening />
      <div className="world-aura" />
      {animated && Scene && <SceneBoundary onFailure={failure}><Scene progress={progress} onReady={success} onFailure={failure} /></SceneBoundary>}
      {animated && <JourneyFilm progress={progress} enabled={filmRequested} guided={guided} ambient={ambient} video={filmVideo} onBlocked={blocked} onPlaying={setFilmPlaying} />}
      <div className="world-shade" />
      {animated && <span className="journey-gallery-caption" aria-hidden="true">{a.label}</span>}
      <div className="world-copy" hidden={arrived}>
        <span className="world-kicker">{c.eyebrow}</span>
        <div className="world-headline-slot">
          <h1 hidden={chapter !== 0}>{c.title[0]}<br /><span>{c.title[1]}</span></h1>
          {c.chapters.map((copy, i) => <h2 key={i} hidden={chapter !== i + 1}>{copy[0]}<br /><span>{copy[1]}</span></h2>)}
        </div>
        <p className="world-intro">{chapter === 0 ? c.intro : c.chapters[Math.min(chapter - 1, 1)][2]}</p>
        <div className="world-actions"><Link className="world-button" to="#ventures" onClick={stop}>{c.explore}<span>↗</span></Link><Link className="world-text-link" to="#studio" onClick={stop}>{c.studio}<span>↗</span></Link></div>
        {!animated && <button className="journey-watch journey-watch--static" onClick={() => setFilmOpen(true)}>▷ {a.film}</button>}
      </div>
      {arrived && <div className="journey-destination">
        <span className="world-kicker">{a.welcome}</span>
        <h2>{a.title[0]}<br />{a.title[1]}</h2><p>{a.body}</p>
        <div className="journey-ventures" aria-label={a.choose}>
          <Link to="#home-alphajuri" onClick={stop}><img className="journey-venture-logo" src="/world-assets/alphajuri-logo-white.svg" alt="AlphaJuri" width="140" height="32" /><span>{a.legal}</span><b>{a.enter} ↗</b></Link>
          <Link to="#home-wir" onClick={stop}><img className="journey-venture-logo journey-venture-logo--wir" src="/world-assets/wir-logo.svg" alt="WIR Innovation" width="72" height="52" /><span>{a.risk}</span><b>{a.enter} ↗</b></Link>
        </div>
        <Link className="world-text-link" to="#studio" onClick={stop}>{c.studio} ↘</Link>
      </div>}
      <div className="world-location" aria-hidden="true"><span>{c.coord[chapter]}</span></div>
      <div className="world-bottom">
        {animated ? <button className="journey-watch" onClick={watch} aria-pressed={playing || filmPlaying}><span>{playing || filmPlaying ? 'Ⅱ' : '▷'}</span>{playing || filmPlaying ? a.pause : seconds >= 29 ? a.replay : a.play}<small>{String(seconds).padStart(2, '0')} / 30</small></button> : <span className="world-scroll-label"><span>↓</span>{c.scroll}</span>}
        {animated && <nav className="world-stops" aria-label={c.tour}>{c.places.map((place, i) => <button key={place} onClick={() => jump(i)} aria-current={chapter === i ? 'step' : undefined}><span>0{i + 1}</span>{place}</button>)}</nav>}
        <Link to="#studio" className="world-skip" onClick={stop}>{c.skip} ↘</Link>
      </div>
      {animated && <div className="world-progress" />}
    </div>
    {filmOpen && <MobileFilm title={a.film} closeLabel={a.close} language={language} onClose={() => setFilmOpen(false)} />}
  </section>;
}
function MobileFilm({ title, closeLabel, language, onClose }: { title: string; closeLabel: string; language: 'en' | 'pt' | 'es'; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState(false), [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const el = dialog.current, trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    el?.showModal(); document.body.style.overflow = 'hidden';
    return () => { el?.close(); document.body.style.overflow = previousOverflow; trigger?.focus({ preventScroll: true }); };
  }, []);
  const error = { en: 'The film could not load. Please try again.', pt: 'Não foi possível carregar o filme. Tente novamente.', es: 'No se pudo cargar el video. Inténtalo de nuevo.' }[language];
  const retry = { en: 'Try again', pt: 'Tentar novamente', es: 'Intentar de nuevo' }[language];
  return <dialog ref={dialog} className="journey-film-dialog" aria-label={title} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}><button onClick={onClose} autoFocus>{closeLabel} ×</button><video key={attempt} src="/world-assets/saopaulo-flight-mobile.mp4" poster="/world-assets/saopaulo-flight-1280.webp" controls muted playsInline preload="metadata" onError={() => setFailed(true)} />{failed && <div className="journey-film-error" role="alert"><p>{error}</p><button onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{retry} ↻</button></div>}</dialog>;
}
