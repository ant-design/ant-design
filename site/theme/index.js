const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';

module.exports = {
  categoryOrder: {
    十大原则: 0,
    Principles: 0,
    设计基础: 1,
    'Design Fundamental': 1,
  },
  typeOrder: {
    General: 0,
    Layout: 1,
    Navigation: 2,
    'Data Entry': 3,
    'Data Display': 4,
    Feedback: 5,
    Localization: 6,
    Other: 7,
  },
  docVersions: {
    '0.9.x': 'http://09x.ant.design',
    '0.10.x': 'http://010x.ant.design',
    '0.11.x': 'http://011x.ant.design',
    '0.12.x': 'http://012x.ant.design',
    '1.x': 'http://1x.ant.design',
  },
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [{
      path: 'index-cn',
      component: homeTmpl,
      dataPath: '/',
    }, {
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
      dataPath: 'CHANGELOG',
    }, {
      path: 'changelog-cn',
      component: contentTmpl,
      dataPath: 'CHANGELOG',
    }, {
      path: 'components/:children/',
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
