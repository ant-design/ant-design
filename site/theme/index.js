const contentTmpl = './template/Content/index';

module.exports = {
  categoryOrder: {
    组件: 0,
    十大原则: 0,
    设计基础: 1,
    动画: 2,
  },
  typeOrder: {
    Basic: 0,
    'Form Controls': 1,
    Views: 2,
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
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: './template/Home/index' },
    childRoutes: [{
      path: 'docs/practice/:children',
      component: contentTmpl,
    }, {
      path: 'docs/pattern/:children',
      component: contentTmpl,
    }, {
      path: 'docs/react/:children',
      component: contentTmpl,
    }, {
      path: 'changelog',
      component: contentTmpl,
    }, {
      path: 'components/:children',
      component: contentTmpl,
    }, {
      path: 'docs/spec/:children',
      component: contentTmpl,
    }, {
      path: 'docs/resource/:children',
      component: contentTmpl,
    }],
  },
};
