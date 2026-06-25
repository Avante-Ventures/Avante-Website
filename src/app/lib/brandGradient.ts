// brandGradient — the single source of truth for Avante's signature gradient
// (gold → coral → mauve → indigo) as sampleable RGB, plus the tiny easing
// helpers the canvas/3D scenes share. Kept dependency-free (plain numbers, no
// three.js) so it can live in the initial bundle that the hero + ShowTheWork
// load — the THREE.Color conversion lives in the stage3d layer, which already
// pulls three, to avoid dragging WebGL into first paint (CWV).

// Brand stops, RGB 0–255: gold #f4a93a · coral #ec5f72 · mauve #a8429b · indigo #3a2f8f.
export const GRAD: number[][] = [
  [244, 169, 58],
  [236, 95, 114],
  [168, 66, 155],
  [58, 47, 143],
];

// Sample the gradient at t∈[0,1] → [r,g,b] (0–255). Clamps t.
export function lerpColor(t: number): number[] {
  t = Math.max(0, Math.min(1, t));
  const seg = Math.min(GRAD.length - 2, Math.floor(t * (GRAD.length - 1)));
  const lt = t * (GRAD.length - 1) - seg;
  const a = GRAD[seg];
  const b = GRAD[seg + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * lt),
    Math.round(a[1] + (b[1] - a[1]) * lt),
    Math.round(a[2] + (b[2] - a[2]) * lt),
  ];
}

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
