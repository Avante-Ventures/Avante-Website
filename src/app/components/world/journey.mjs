export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const smooth = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const between = (value, start, end) => smooth((value - start) / (end - start));
export const stops = [0, 0.16, 0.49, 0.96];
export const TOUR_SECONDS = 30;
export const FILM_START = 0.21;
export const FILM_END = 0.8;
export const ENHANCED_QUERY = '(prefers-reduced-motion: no-preference)';
export const COMPACT_QUERY = '(max-width: 899px), (hover: none), (pointer: coarse), (max-height: 619px)';
export function journeyPose(value) {
  const p = clamp(value);
  return {
    chapter: p < 0.12 ? 0 : p < 0.28 ? 1 : p < 0.78 ? 2 : 3,
    copyOpacity: p < .12 ? 1 - between(p, .085, .12)
      : p < .28 ? between(p, .12, .15) * (1 - between(p, .245, .28))
      : p < .78 ? between(p, .28, .33) * (1 - between(p, .72, .78))
      : between(p, .78, .85),
    approach: between(p, 0.035, 0.29),
    landing: between(p, 0.21, 0.31),
    cityTravel: clamp((p - FILM_START) / (FILM_END - FILM_START)),
    arrival: between(p, 0.73, 0.85),
    discovery: between(p, 0.85, 0.95),
    globeVisible: p < 0.32,
    cityVisible: p > 0.21,
  };
}
// Longitude follows Three's SphereGeometry UV convention.
export function geographicPoint(lat, lon, radius = 1) {
  const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180;
  return [radius * Math.cos(phi) * Math.cos(theta), radius * Math.sin(phi), -radius * Math.cos(phi) * Math.sin(theta)];
}
