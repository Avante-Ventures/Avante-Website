import test from 'node:test';
import assert from 'node:assert/strict';
import { scenePose, chapterAt, COPY } from '../src/app/components/compound/story.mjs';

test('scene is reversible and all poses remain finite throughout a scroll', () => {
  const forward = Array.from({ length: 101 }, (_, i) => scenePose(i / 100));
  for (let i = 100; i >= 0; i--) {
    assert.deepEqual(scenePose(i / 100), forward[i]);
    Object.values(forward[i]).forEach(value => assert.ok(Number.isFinite(value)));
  }
  assert.deepEqual(scenePose(-1), scenePose(0));
  assert.deepEqual(scenePose(2), scenePose(1));
});
test('assembly precedes duplication, and the initial scene has a closed document stack', () => {
  assert.equal(scenePose(0).open, 0);
  assert.equal(scenePose(.5).secondScale, 0);
  assert.equal(scenePose(.8).build, 1);
  assert.ok(scenePose(1).secondScale > .7);
  assert.ok(scenePose(.35).paperY > scenePose(0).paperY);
});
test('chapter navigation has bounded endpoints and all locales cover the whole story', () => {
  assert.equal(chapterAt(-.2), 0);
  assert.equal(chapterAt(1), 4);
  assert.equal(chapterAt(.68), 3);
  for (const locale of ['en', 'pt', 'es']) {
    const copy = COPY[locale];
    assert.equal(copy.chapters.length, 5);
    assert.equal(copy.titles.length, 5);
    assert.equal(copy.descriptions.length, 5);
    assert.equal(copy.legal.length, 3);
    assert.equal(copy.insurance.length, 3);
    assert.ok(copy.illustrative.length > 0);
  }
});
