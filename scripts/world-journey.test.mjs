import test from 'node:test';
import assert from 'node:assert/strict';
import { journeyPose, geographicPoint, stops } from '../src/app/components/world/journey.mjs';

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
