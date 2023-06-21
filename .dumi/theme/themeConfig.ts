const chineseMirror =
  typeof location !== 'undefined' && location.hostname.includes('.antgroup.com');

export default {
  categoryOrder: {
    'Ant Design': 0,
    全局样式: 1,
    'Global Styles': 1,
    设计模式: 2,
    'Design Patterns': 2,
    '设计模式 - 探索': 3,
    'Design Patterns (Research)': 3,
    Components: 100,
    组件: 100,
  },
  typeOrder: {
    // Component
    Overview: -1,
    General: 0,
    Layout: 1,
    Navigation: 2,
    'Data Entry': 3,
    'Data Display': 4,
    Feedback: 5,
    Other: 6,
    Deprecated: 7,

    组件总览: -1,
    通用: 0,
    布局: 1,
    导航: 2,
    数据录入: 3,
    数据展示: 4,
    反馈: 5,
    其他: 6,
    废弃: 7,

    // Design
    原则: 1,
    Principles: 1,
    全局规则: 2,
    重型组件: 8,
    ProComponents: 8,
    'Global Rules': 2,
    模板文档: 3,
    'Template Document': 3,
  },
  docVersions: {
    '4.x': chineseMirror ? 'https://4x-ant-design.antgroup.com' : 'https://4x.ant.design',
    '3.x': 'https://3x.ant.design',
    '2.x': 'https://2x.ant.design',
    '1.x': 'https://1x.ant.design',
    '0.12.x': 'https://012x.ant.design',
    '0.11.x': 'https://011x.ant.design',
    '0.10.x': 'https://010x.ant.design',
    '0.9.x': 'https://09x.ant.design',
  },
};
