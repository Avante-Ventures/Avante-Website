export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const smooth = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const between = (value, start, end) => smooth((value - start) / (end - start));
export const stops = [0, 0.16, 0.49, 0.96];
export const TOUR_SECONDS = 30;
export const FILM_START = 0.21;
export const FILM_END = 0.86;
export const ENHANCED_QUERY = '(prefers-reduced-motion: no-preference)';
export const COMPACT_QUERY = '(max-width: 899px), (hover: none), (pointer: coarse), (max-height: 619px)';
export function journeyPose(value) {
  const p = clamp(value);
  return {
    chapter: p < 0.12 ? 0 : p < 0.28 ? 1 : p < 0.78 ? 2 : 3,
    copyOpacity: p < .12 ? 1 - between(p, .085, .12)
      : p < .28 ? between(p, .12, .15) * (1 - between(p, .21, .27))
      : p < .78 ? between(p, .32, .38) * (1 - between(p, .70, .78))
      : between(p, .82, .90),
    approach: between(p, 0.035, 0.29),
    landing: between(p, FILM_START, 0.34),
    cityTravel: clamp((p - FILM_START) / (FILM_END - FILM_START)),
    arrival: between(p, 0.72, FILM_END),
    discovery: between(p, 0.88, 0.96),
    globeVisible: p < 0.35,
    cityVisible: p > 0.21,
  };
}

// Frame the same opening inside a full-stage canvas. Its drawing buffer never
// changes size at a chapter boundary, and the approaching globe can leave its
// original rectangle. Reframe for the gallery while the film is fully opaque.
export function compactJourneyFrame(progress, opening, stage) {
  const approach = between(progress, .06, .32);
  const settle = between(progress, .38, .68);
  const mix = (a, b, t) => a + (b - a) * t;
  return {
    centerX: mix(mix(opening.centerX, stage.width * .5, approach), stage.width * (stage.landscape ? .75 : .5), settle),
    centerY: mix(mix(opening.centerY, stage.height * .47, approach), stage.landscape ? stage.height * .46 : 56 + stage.height * .15, settle),
    height: mix(opening.height * (1 + approach * .15), stage.height * (stage.landscape ? .68 : .30), settle),
  };
}
// Longitude follows Three's SphereGeometry UV convention.
export function geographicPoint(lat, lon, radius = 1) {
  const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
  return [radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), -radius * Math.cos(phi) * Math.sin(theta)];
}
