export interface Sponsor {
  name: string;
  logo: string;
  url: string | { cn: string; en: string };
  description: {
    cn: string;
    en: string;
  };
}

export const getSponsorUrl = (url: Sponsor['url'], lang: string): string =>
  typeof url === 'string' ? url : (url[lang as 'cn' | 'en'] ?? url.en);

export const sponsors: Sponsor[] = [
  {
    name: 'TRACTIAN',
    logo: 'https://images.opencollective.com/tractian/0235da9/logo/256.png',
    url: 'https://tractian.com?from=ant-design',
    description: {
      cn: '工业 AI 平台，专注于预测性维护与资产管理。',
      en: 'Industrial AI platform for predictive maintenance and asset management.',
    },
  },
  {
    name: 'LobeHub',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg',
    url: 'https://lobehub.com?from=ant-design',
    description: {
      cn: 'LobeHub 是你工作与生活的终极空间：在这里发现、构建并与 Agent 团队一起无限进步。',
      en: 'Agent teammates that grow with you.',
    },
  },
  {
    name: 'YouMind',
    logo: 'https://marketing-assets.youmind.com/logo-512.png',
    url: {
      cn: 'https://youmind.com/zh-CN?from=ant-design',
      en: 'https://youmind.com?from=ant-design',
    },
    description: {
      cn: 'YouMind 是学习与创作交汇的地方。在 YouMind 中，你可以与 AI 智能体一起学习、思考和创作。一切自然流动，与你共同成长。',
      en: 'The first AI creation studio where learning meets writing.',
    },
  },
];
