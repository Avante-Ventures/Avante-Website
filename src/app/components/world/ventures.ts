export type VentureKind = 'legal' | 'risk';

export const VENTURES = {
  legal: { name: 'AlphaJuri', url: 'https://www.alphajuri.com/', domain: 'alphajuri.com', logo: '/world-assets/alphajuri-symbol.svg', preview: '/world-assets/alphajuri-symbol.svg', website: '/world-assets/alphajuri-website', height: 538 },
  risk: { name: 'WIR Innovation', url: 'https://wirinnovation.ai/', domain: 'wirinnovation.ai', logo: '/world-assets/wir-logo.svg', preview: '/world-assets/wir-logo.svg', website: '/world-assets/wir-website', height: 550 },
} as const;
