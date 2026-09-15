import test from 'node:test';
import assert from 'node:assert/strict';
import { recoverRoute } from '../src/app/routeRecovery.mjs';

function environment() {
  const values = new Map(), visits = [];
  return {
    visits, online: true, build: 'build-1',
    storage: { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) },
    navigate: url => visits.push(url),
  };
}

test('missing route chunks open the intended destination including locale, search and hash', () => {
  for (const message of ['Failed to fetch dynamically imported module: /assets/page-old.js', 'Importing a module script failed.', 'error loading dynamically imported module', 'Unable to preload CSS for /assets/page-old.css']) {
    const env = environment();
    const url = '/es/portfolio?source=home#venture-wir';
    assert.equal(recoverRoute(new TypeError(message), url, env), true);
    assert.deepEqual(env.visits, [url]);
  }
});

test('a permanently missing chunk cannot cause a reload loop', () => {
  const env = environment(), error = new TypeError('Failed to fetch dynamically imported module');
  assert.equal(recoverRoute(error, '/en/why-avante', env), true);
  assert.equal(recoverRoute(error, '/en/why-avante', env), false);
  assert.deepEqual(env.visits, ['/en/why-avante']);
});

test('a later deployment or a different destination can recover independently', () => {
  const env = environment(), error = new TypeError('Importing a module script failed.');
  recoverRoute(error, '/pt/library', env);
  assert.equal(recoverRoute(error, '/pt/portfolio', env), true);
  assert.equal(recoverRoute(error, '/pt/portfolio', { ...env, build: 'build-2' }), true);
});

test('offline, blocked storage and ordinary application errors keep the usable error page', () => {
  const error = new TypeError('Failed to fetch dynamically imported module');
  const env = environment();
  assert.equal(recoverRoute(error, '/en/library', { ...env, online: false }), false);
  assert.equal(recoverRoute(error, '/en/library', { ...env, storage: { getItem() { throw new Error('blocked'); } } }), false);
  assert.equal(recoverRoute(new Error('Invalid application state'), '/en/library', env), false);
  assert.deepEqual(env.visits, []);
});
