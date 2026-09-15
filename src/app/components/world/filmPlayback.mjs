import { clamp, FILM_START, FILM_END, TOUR_SECONDS, journeyPose } from './journey.mjs';

// During the city chapter the decoder is the clock. Waiting for media must not
// advance the dissolve into a gallery the visitor has not reached yet.
export function advanceJourney(progress, elapsed, media, unavailable = false) {
  const next = clamp(progress + Math.min(elapsed, 0.1) / TOUR_SECONDS);
  if (unavailable || media?.error || progress >= FILM_END) return next;
  if (progress < FILM_START) return Math.min(next, FILM_START);
  if (!media || !Number.isFinite(media.duration) || media.duration <= 0 || media.seeking || media.readyState < 2) return progress;
  if (media.ended || media.currentTime >= media.duration - 0.025) return FILM_END;
  return Math.max(progress, FILM_START + clamp(media.currentTime / media.duration) * (FILM_END - FILM_START));
}

export function dampProgress(current, target, elapsed) {
  const next = current + (target - current) * (1 - Math.exp(-elapsed / 0.11));
  return Math.abs(next - target) < 0.00005 ? target : next;
}

// Scrolling reveals the film; it does not step through still frames. A visitor
// entering São Paulo without Watch gets the entire take from its first frame.
export function filmIntent(progress, guided, ambientAllowed) {
  if (guided) return { progress, playing: true, rate: undefined };
  if (ambientAllowed && progress >= FILM_START && progress < .85) return { progress: FILM_START, playing: true, rate: 1 };
  return { progress, playing: false, rate: undefined };
}

// Resume from the decoded frame, which can be ahead of or behind scroll progress.
export function resumeJourney(progress, media) {
  if (progress >= .95) return 0;
  if (progress < FILM_START || progress >= .85 || !media || !Number.isFinite(media.duration) || media.duration <= 0) return progress;
  if (media.ended || media.currentTime >= media.duration - 1 / 30) return FILM_START;
  return FILM_START + clamp(media.currentTime / media.duration) * (FILM_END - FILM_START);
}

/** @param {HTMLVideoElement} media @param {() => void} onBlocked */
export function createFilmPlayback(media, onBlocked) {
  let native = false, ambient = false, aligned = false, pending = false, disposed = false, generation = 0;
  return {
    /** @param {number} progress @param {boolean} guided @param {number | undefined} [rate] */
    sync(progress, guided, rate = undefined) {
      if (disposed) return;
      const shouldPlay = guided && progress >= FILM_START && progress < FILM_END;
      if (shouldPlay !== native || (native && ambient && rate === undefined)) {
        native = shouldPlay; aligned = false; pending = false; generation++;
        media.pause();
      }
      ambient = rate === 1;
      if (!Number.isFinite(media.duration) || media.duration <= 0 || media.seeking) return;
      const target = journeyPose(progress).cityTravel * Math.max(0, media.duration - 1 / 30);
      if (!native || !aligned) {
        if (!media.paused) media.pause();
        if (Math.abs(media.currentTime - target) > 1 / 30) {
          media.currentTime = target;
          return;
        }
        aligned = true;
      }
      if (native) {
        const speed = rate ?? media.duration / ((FILM_END - FILM_START) * TOUR_SECONDS);
        if (media.playbackRate !== speed) media.playbackRate = speed;
      }
      if (!native || media.readyState < 2 || !media.paused || media.ended || pending) return;
      const request = generation;
      pending = true;
      media.play().catch(() => {
        if (!disposed && native && request === generation) onBlocked();
      }).finally(() => { if (request === generation) pending = false; });
    },
    pause(reset = false) {
      if (disposed) return;
      generation++; pending = false;
      media.pause();
      if (reset) { native = false; ambient = false; aligned = false; }
    },
    dispose() { disposed = true; generation++; media.pause(); },
  };
}
