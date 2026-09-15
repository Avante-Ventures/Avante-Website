import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceJourney, createFilmPlayback, dampProgress, filmIntent, resumeJourney } from '../src/app/components/world/filmPlayback.mjs';
import { FILM_START, FILM_END, TOUR_SECONDS, journeyPose } from '../src/app/components/world/journey.mjs';

function fakeVideo() {
  let time = 0;
  return {
    duration: 20.6, seeking: false, readyState: 4, paused: true, ended: false,
    writes: [], plays: 0, playbackRate: 1,
    get currentTime() { return time; },
    set currentTime(value) { this.writes.push(value); time = value; this.seeking = true; },
    decode(value) { time = value; this.seeking = false; },
    pause() { this.paused = true; },
    play() { this.paused = false; this.plays++; return Promise.resolve(); },
  };
}

test('guided city playback advances decoded frames without seeking every frame', async () => {
  const video = fakeVideo();
  const controller = createFilmPlayback(video, () => assert.fail('play should succeed'));
  controller.sync(FILM_START, true);
  await Promise.resolve();
  for (let i = 1; i < 500; i++) {
    video.decode(i / 500 * video.duration);
    const p = advanceJourney(FILM_START, 1 / 60, video);
    controller.sync(p, true);
  }
  assert.equal(video.writes.length, 0);
  assert.equal(video.plays, 1);
  assert.equal(video.playbackRate, video.duration / ((FILM_END - FILM_START) * TOUR_SECONDS));
  controller.dispose();
  assert.equal(video.paused, true);
});

test('entering the city by scrolling starts a continuous take, not a mid-film still', () => {
  const video = fakeVideo();
  const controller = createFilmPlayback(video, () => assert.fail());
  for (const progress of [.49, .52, .6, .7, .82]) {
    const intent = filmIntent(progress, false, true);
    controller.sync(intent.progress, intent.playing, intent.rate);
  }
  assert.equal(video.currentTime, 0);
  assert.equal(video.writes.length, 0);
  assert.equal(video.plays, 1);
  assert.equal(video.playbackRate, 1);
  assert.equal(filmIntent(.49, false, false).playing, false, 'explicit pause disables ambient playback');
  assert.equal(filmIntent(.85, false, true).playing, false, 'leaving the city stops the film');
  controller.dispose();
});

test('manual reversal serializes seeks and resume aligns once before playing', () => {
  const video = fakeVideo();
  const controller = createFilmPlayback(video, () => assert.fail());
  controller.sync(.7, false);
  controller.sync(.4, false);
  assert.equal(video.writes.length, 1, 'do not replace a seek in flight');
  video.seeking = false;
  controller.sync(.4, false);
  assert.equal(video.writes.length, 2, 'finish by catching up to the newest position');
  controller.sync(.4, true);
  assert.equal(video.plays, 0, 'wait for the pending seek');
  video.seeking = false;
  controller.sync(.4, true);
  assert.equal(video.plays, 1);
  controller.sync(.4, false);
  assert.equal(video.paused, true);
  controller.dispose();
});

test('pause and tab suspension preserve the decoded frame; re-entry restarts the take', async () => {
  const video = fakeVideo();
  const controller = createFilmPlayback(video, () => assert.fail());
  controller.sync(FILM_START, true, 1);
  await Promise.resolve(); await Promise.resolve();
  video.decode(2);
  controller.pause();
  assert.equal(video.paused, true);
  assert.equal(video.currentTime, 2);
  assert.equal(video.writes.length, 0);
  controller.sync(FILM_START, true, 1);
  assert.equal(video.paused, false);
  assert.equal(video.currentTime, 2);
  assert.equal(video.writes.length, 0);
  controller.pause(true);
  controller.sync(FILM_START, true, 1);
  assert.deepEqual(video.writes, [0]);
  controller.dispose();
});

test('Watch resumes the actual ambient frame instead of jumping to scroll time', async () => {
  const video = fakeVideo();
  const controller = createFilmPlayback(video, () => assert.fail());
  controller.sync(FILM_START, true, 1);
  await Promise.resolve(); await Promise.resolve();
  video.decode(2);
  controller.pause();
  const progress = resumeJourney(.49, video);
  assert.ok(progress < .3);
  controller.sync(progress, true);
  assert.equal(video.writes.length, 0);
  assert.equal(video.currentTime, 2);
  assert.equal(video.paused, false);
  video.ended = true;
  assert.equal(resumeJourney(.49, video), FILM_START);
  assert.equal(resumeJourney(.96, video), 0);
  assert.equal(resumeJourney(.1, video), .1);
  controller.dispose();
});

test('pausing invalidates a pending play rejection without seeking', async () => {
  const video = fakeVideo();
  let reject, blocked = 0;
  video.play = () => new Promise((_, fail) => { reject = fail; });
  const controller = createFilmPlayback(video, () => blocked++);
  controller.sync(FILM_START, true, 1);
  video.decode(2);
  controller.pause();
  reject(new Error('interrupted by pause'));
  await Promise.resolve(); await Promise.resolve();
  assert.equal(blocked, 0);
  assert.equal(video.currentTime, 2);
  assert.equal(video.writes.length, 0);
  controller.dispose();
});

test('buffering cannot advance the gallery, and ended hands off to the outro', () => {
  assert.equal(advanceJourney(FILM_START, .016, null), FILM_START);
  const video = fakeVideo();
  video.decode(video.duration * .6);
  const p = advanceJourney(FILM_START, .016, video);
  for (let i = 0; i < 120; i++) assert.equal(advanceJourney(p, .016, video), p);
  video.seeking = true;
  assert.equal(advanceJourney(p, .1, video), p);
  video.seeking = false; video.ended = true;
  assert.equal(advanceJourney(p, .016, video), FILM_END);
  assert.ok(advanceJourney(FILM_END, .016, video) > FILM_END);
  assert.ok(advanceJourney(p, .016, null, true) > p, 'static fallback remains traversable');
});

test('a rejected obsolete play request cannot stop a later pause or replay', async () => {
  const video = fakeVideo();
  let reject, blocked = 0;
  video.play = () => new Promise((_, fail) => { reject = fail; });
  const controller = createFilmPlayback(video, () => blocked++);
  controller.sync(FILM_START, true);
  controller.sync(0, false);
  reject(new Error('aborted by pause'));
  await Promise.resolve(); await Promise.resolve();
  assert.equal(blocked, 0);
  controller.sync(FILM_START, true);
  reject(new Error('playback blocked'));
  await Promise.resolve(); await Promise.resolve();
  assert.equal(blocked, 1);
  controller.dispose();
});

test('scroll easing converges at the same speed at 30, 60 and 120 Hz', () => {
  const results = [30, 60, 120].map(fps => {
    let p = 0;
    for (let i = 0; i < fps / 2; i++) p = dampProgress(p, .8, 1 / fps);
    return p;
  });
  assert.ok(Math.max(...results) - Math.min(...results) < 1e-10);
  assert.ok(results[0] > .79 && results[0] < .8);
});

test('chapter copy changes while invisible, without flashes on reverse travel', () => {
  for (const boundary of [.12, .28, .78]) {
    assert.ok(journeyPose(boundary - .00001).copyOpacity < .001);
    assert.ok(journeyPose(boundary + .00001).copyOpacity < .001);
  }
});
