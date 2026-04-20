export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  description: string;
}

export const sponsors: Sponsor[] = [
  {
    name: 'TRACTIAN',
    logo: 'https://images.opencollective.com/tractian/0235da9/logo/256.png',
    url: 'https://tractian.com',
    description: 'Industrial AI platform for predictive maintenance and asset management.',
  },
  {
    name: 'LobeHub',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg',
    url: 'https://lobehub.com',
    description: 'Agent teammates that grow with you.',
  },
  {
    name: 'YouMind',
    logo: 'https://marketing-assets.youmind.com/logo-512.png',
    url: 'https://youmind.com',
    description: 'The first AI creation studio where learning meets writing.',
  },
];
