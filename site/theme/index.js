const contentTmpl = './template/Content/index';

export default {
  categoryOrder: {
    组件: 0,
    十大原则: 0,
    设计基础: 1,
    动画: 2,
  },
  typeOrder: {
    Basic: 0,
    'Form Control': 1,
    Presentation: 2,
    Navigation: 3,
    Other: 4,
  },
  docVersions: {
    '0.9.x': 'http://09x.ant.design/',
    '0.10.x': 'http://010x.ant.design/',
    '0.11.x': 'http://011x.ant.design/',
    '0.12.x': 'http://012x.ant.design/',
  },
  routes: {
    '/': './template/Home/index',
    '/docs/practice/:children': contentTmpl,
    '/docs/pattern/:children': contentTmpl,
    '/docs/react/:children': contentTmpl,
    '/components/:children': contentTmpl,
    '/docs/spec/:children': contentTmpl,
    '/docs/resource/:children': contentTmpl,
  },
};
