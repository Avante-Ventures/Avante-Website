export type VentureKind = 'legal' | 'risk' | 'brand';

// How each official mark is extruded. Depth and bevel are in the logo SVG's own
// units; the resting tilt is in radians. `gradient` says how faces take colour
// from the SVG's gradients; without it every face uses the flat `face` colour.
// `depthStep` makes each later path shallower, so nested shapes read as steps.
type VentureScene = {
  depth: number; bevelThickness: number; bevelSize: number; depthStep?: number;
  restingX: number; restingY: number;
  face: string; edge: string; metalness: number; roughness: number;
  gradient?: 'first' | 'by-class';
};
type BrandImage = { src: string; width: number; height: number };
type VentureBrand = {
  name: string; label: string; slug: string; url: string; domain: string;
  logo: string; preview: string; previewSize: [number, number];
  website: string; height: number;
  wordmark?: BrandImage; signature?: BrandImage;
  scene: VentureScene;
};

export const VENTURES: Record<VentureKind, VentureBrand> = {
  legal: {
    name: 'AlphaJuri', label: 'AlphaJuri', slug: 'alphajuri', url: 'https://www.alphajuri.com/', domain: 'alphajuri.com',
    logo: '/world-assets/alphajuri-symbol.svg', preview: '/world-assets/alphajuri-symbol.svg', previewSize: [930, 730],
    website: '/world-assets/alphajuri-website', height: 538,
    wordmark: { src: '/world-assets/alphajuri-logo.svg', width: 4582, height: 1048 },
    scene: { depth: 110, bevelThickness: 5, bevelSize: 3, restingX: -.09, restingY: -.28, face: '#f5f2ec', edge: '#9c7564', metalness: .7, roughness: .32, gradient: 'first' },
  },
  risk: {
    name: 'WIR Innovation', label: 'WIR', slug: 'wir', url: 'https://wirinnovation.ai/', domain: 'wirinnovation.ai',
    logo: '/world-assets/wir-mark.svg', preview: '/world-assets/wir-mark.svg', previewSize: [637, 355],
    website: '/world-assets/wir-website', height: 550,
    signature: { src: '/world-assets/wir-signature.svg', width: 480, height: 76 },
    scene: { depth: 18, bevelThickness: .45, bevelSize: .3, restingX: -.035, restingY: .16, face: '#ffffff', edge: '#5c4c84', metalness: .45, roughness: .38, gradient: 'by-class' },
  },
  brand: {
    name: 'CRIA', label: 'CRIA', slug: 'cria', url: 'https://www.criabrazil.com/', domain: 'criabrazil.com',
    logo: '/world-assets/cria-mark.svg', preview: '/world-assets/cria-mark.svg', previewSize: [1024, 1024],
    website: '/world-assets/cria-website', height: 558,
    wordmark: { src: '/world-assets/cria-wordmark.svg', width: 2370, height: 758 },
    scene: { depth: 130, depthStep: 38, bevelThickness: 7, bevelSize: 4, restingX: -.1, restingY: .32, face: '#ff510a', edge: '#d2470c', metalness: .42, roughness: .4 },
  },
};

// Display order wherever the selected ventures are listed.
export const VENTURE_ORDER: VentureKind[] = ['legal', 'risk', 'brand'];
