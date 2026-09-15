import { useEffect, useState, type MutableRefObject } from 'react';
import { createFilmPlayback, filmIntent } from './filmPlayback.mjs';
import { COMPACT_QUERY, FILM_START, FILM_END } from './journey.mjs';
import { CityPicture } from './CityPicture';

// Both the guided tour and ordinary scrolling reveal a natively playing film.
export function JourneyFilm({ progress, enabled, guided, ambient, video, onBlocked, onPlaying }: {
  progress: MutableRefObject<number>; enabled: boolean; guided: MutableRefObject<boolean>;
  ambient: MutableRefObject<boolean>;
  video: MutableRefObject<HTMLVideoElement | null>; onBlocked: () => void; onPlaying: (playing: boolean) => void;
}) {
  const [ready, setReady] = useState(false);
  // Select the compact payload explicitly instead of relying on video source
  // media queries. Keep it stable so resizing cannot reset the decoder.
  const [source] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(COMPACT_QUERY).matches
    ? '/world-assets/saopaulo-flight-mobile.mp4' : '/world-assets/saopaulo-flight-journey.mp4');
  useEffect(() => {
    const el = video.current;
    if (!el || !enabled) return;
    const controller = createFilmPlayback(el, onBlocked);
    const sync = () => {
      const intent = filmIntent(progress.current, guided.current && !document.hidden, ambient.current && !document.hidden);
      if (intent.playing) controller.sync(intent.progress, true, intent.rate);
      else controller.pause(progress.current < FILM_START || progress.current >= FILM_END);
    };
    const loaded = () => { setReady(true); sync(); };
    const failed = () => setReady(false);
    el.addEventListener('loadeddata', loaded);
    el.addEventListener('loadedmetadata', sync);
    el.addEventListener('seeked', sync);
    el.addEventListener('canplay', sync);
    el.addEventListener('error', failed);
    window.addEventListener('avante-world-update', sync);
    document.addEventListener('visibilitychange', sync);
    if (el.readyState >= 2) loaded();
    return () => {
      controller.dispose();
      onPlaying(false);
      el.removeEventListener('loadeddata', loaded);
      el.removeEventListener('loadedmetadata', sync);
      el.removeEventListener('seeked', sync);
      el.removeEventListener('canplay', sync);
      el.removeEventListener('error', failed);
      window.removeEventListener('avante-world-update', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [progress, enabled, guided, ambient, video, onBlocked, onPlaying]);
  return <div className="journey-film" aria-hidden="true">
    <CityPicture />
    {enabled && <video ref={video} src={source} className={ready ? 'is-ready' : ''} muted playsInline preload="auto" tabIndex={-1} onPlaying={() => onPlaying(true)} onPause={() => onPlaying(false)} onEnded={() => onPlaying(false)} />}
  </div>;
}
