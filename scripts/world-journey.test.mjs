import test from 'node:test';
import assert from 'node:assert/strict';
import { PerspectiveCamera, Vector3 } from 'three';
import { compactJourneyFrame, journeyPose, geographicPoint, stops } from '../src/app/components/world/journey.mjs';

test('each navigation stop lands inside its own chapter', () => {
  stops.forEach((p, i) => assert.equal(journeyPose(p).chapter, i));
  assert.equal(journeyPose(-1).chapter, 0);
  assert.equal(journeyPose(2).chapter, 3);
});
test('camera travel is bounded, monotonic and can be reversed without state', () => {
  let previous = journeyPose(0);
  for (let i = 0; i <= 1000; i++) {
    const pose = journeyPose(i / 1000);
    for (const key of ['approach', 'landing', 'cityTravel', 'arrival', 'discovery']) {
      assert.ok(pose[key] >= 0 && pose[key] <= 1);
      assert.ok(pose[key] >= previous[key]);
    }
    assert.ok(pose.globeVisible || pose.cityVisible);
    previous = pose;
  }
  const forward = stops.map(journeyPose);
  assert.deepEqual([...stops].reverse().map(journeyPose).reverse(), forward);
});
test('the arrival follows the city and the last stop exposes the destination', () => {
  assert.equal(journeyPose(stops[2]).arrival, 0);
  assert.equal(journeyPose(stops[2]).discovery, 0);
  assert.equal(journeyPose(stops[3]).arrival, 1);
  assert.equal(journeyPose(stops[3]).discovery, 1);
  assert.equal(journeyPose(stops[3]).cityTravel, 1);
  assert.equal(journeyPose(0).cityTravel, 0);
});
test('geography lies on the sphere and puts Brazil in the southern western hemisphere', () => {
  for (const [lat, lon] of [[-23.55, -46.63], [37.4, -122.1], [0, 0], [90, 180]]) {
    const point = geographicPoint(lat, lon, 2.17);
    assert.ok(Math.abs(Math.hypot(...point) - 2.17) < 1e-10);
  }
  const [x, y, z] = geographicPoint(-23.55, -46.63);
  assert.ok(x > 0 && y < 0 && z > 0);
});

test('the full-stage camera exactly preserves the existing opening poster projection', () => {
  const cases = [
    { stage: { width: 390, height: 720, landscape: false }, opening: { centerX: 195, centerY: 220, height: 312 }, width: 390 },
    { stage: { width: 320, height: 568, landscape: false }, opening: { centerX: 160, centerY: 154.88, height: 181.76 }, width: 320 },
    { stage: { width: 844, height: 390, landscape: true }, opening: { centerX: 633, centerY: 179.4, height: 265.2 }, width: 422 },
  ];
  for (const { stage, opening, width } of cases) {
    const old = new PerspectiveCamera(38, width / opening.height, .1, 160);
    const full = new PerspectiveCamera(38, 1, .1, 160);
    const frame = compactJourneyFrame(0, opening, stage);
    full.setViewOffset(stage.width, frame.height, stage.width / 2 - frame.centerX, frame.height / 2 - frame.centerY, stage.width, stage.height);
    for (const camera of [old, full]) { camera.position.z = 8.6; camera.lookAt(0, 0, 0); camera.updateMatrixWorld(); }
    for (const point of [[0, 0, 0], [1.4, -.8, 1.5], [-1.2, 1.1, .7]]) {
      const before = new Vector3(...point).project(old), after = new Vector3(...point).project(full);
      assert.ok(Math.abs(opening.centerX + before.x * width / 2 - (1 + after.x) * stage.width / 2) < 1e-7);
      assert.ok(Math.abs(opening.centerY - before.y * opening.height / 2 - (1 - after.y) * stage.height / 2) < 1e-7);
    }
    assert.deepEqual(compactJourneyFrame(.77999, opening, stage), compactJourneyFrame(.78001, opening, stage), 'the chapter switch cannot reframe the sculpture');
  }
});
