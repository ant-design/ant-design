export interface Sponsor {
  name: string;
  logo: string;
  url: string | { cn: string; en: string };
  opencollective: string;
  description: {
    cn: string;
    en: string;
  };
}

export const getSponsorUrl = (url: Sponsor['url'], lang: 'cn' | 'en'): string =>
  typeof url === 'string' ? url : (url[lang] ?? url.en);

export const getSponsorDescription = (desc: Sponsor['description'], lang: 'cn' | 'en'): string =>
  desc[lang] ?? desc.en;

export const sponsors: Sponsor[] = [
  {
    name: 'YouMind',
    logo: 'https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*SXcuQYBZ6oQAAAAAQJAAAAgAeh6VAQ/original',
    url: {
      cn: 'https://youmind.com/zh-CN?utm_source=ant-design',
      en: 'https://youmind.com?utm_source=ant-design',
    },
    opencollective: 'https://opencollective.com/youmind',
    description: {
      cn: 'YouMind 是学习与创作交汇的地方。在 YouMind 中，你可以与 AI 智能体一起学习、思考和创作。一切自然流动，与你共同成长。',
      en: 'The first AI creation studio where learning meets writing.',
    },
  },
  {
    name: 'TRACTIAN',
    logo: 'https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*Z4-4Q67SG5UAAAAAQLAAAAgAeh6VAQ/original',
    url: 'https://tractian.com?utm_source=ant-design',
    opencollective: 'https://opencollective.com/tractian',
    description: {
      cn: '工业 AI 平台，专注于预测性维护与资产管理。',
      en: 'Industrial AI platform for predictive maintenance and asset management.',
    },
  },
  {
    name: 'LobeHub',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@1.79.0/icons/lobehub-color.svg',
    url: 'https://lobehub.com?utm_source=ant-design',
    opencollective: 'https://opencollective.com/lobehub',
    description: {
      cn: 'LobeHub 是你工作与生活的终极空间：在这里发现、构建并与 Agent 团队一起无限进步。',
      en: 'Agent teammates that grow with you.',
    },
  },
];
