const path = require('path');
const replaceLib = require('@ant-design/tools/lib/replaceLib');
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const { version } = require('../package.json');

const isNextVersion = !version.match(/^\d+\.\d+\.\d+$/);

const { webpack } = getWebpackConfig;

const isDev = process.env.NODE_ENV === 'development';
const usePreact = process.env.REACT_ENV === 'preact';

function alertBabelConfig(rules) {
  rules.forEach(rule => {
    if (rule.loader && rule.loader === 'babel-loader') {
      if (rule.options.plugins.indexOf(replaceLib) === -1) {
        rule.options.plugins.push(replaceLib);
      }
      // eslint-disable-next-line
      rule.options.plugins = rule.options.plugins.filter(
        plugin => !plugin.indexOf || plugin.indexOf('babel-plugin-add-module-exports') === -1,
      );
      // Add babel-plugin-add-react-displayname
      rule.options.plugins.push(require.resolve('babel-plugin-add-react-displayname'));
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  port: 8001,
  hash: true,
  source: {
    components: './components',
    docs: './docs',
    changelog: ['CHANGELOG.zh-CN.md', 'CHANGELOG.en-US.md'],
    'components/form/v3': ['components/form/v3.zh-CN.md', 'components/form/v3.en-US.md'],
  },
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig: {
    categoryOrder: {
      'Ant Design': 0,
      全局样式: 1,
      'Global Styles': 1,
      设计模式: 2,
      'Design Patterns': 2,
      其他: 6,
      Other: 6,
      Components: 100,
      组件: 100,
    },
    typeOrder: {
      // Component
      General: 0,
      Layout: 1,
      Navigation: 2,
      'Data Entry': 3,
      'Data Display': 4,
      Feedback: 5,
      Other: 6,
      Deprecated: 7,
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
      'Global Rules': 2,
      模板文档: 3,
      'Template Document': 3,
    },
    docVersions: {
      '0.9.x': 'http://09x.ant.design',
      '0.10.x': 'http://010x.ant.design',
      '0.11.x': 'http://011x.ant.design',
      '0.12.x': 'http://012x.ant.design',
      '1.x': 'http://1x.ant.design',
      '2.x': 'http://2x.ant.design',
    },
  },
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {
    verbose: true,
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    // eslint-disable-next-line
    config.resolve.alias = {
      'antd/lib': path.join(process.cwd(), 'components'),
      'antd/es': path.join(process.cwd(), 'components'),
      antd: path.join(process.cwd(), 'index'),
      site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter',
      'react-intl': 'react-intl/dist',
    };

    // eslint-disable-next-line
    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (usePreact) {
      // eslint-disable-next-line
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'create-react-class': 'preact-compat/lib/create-react-class',
        'react-router': 'react-router',
      });
    }

    if (isDev) {
      // eslint-disable-next-line
      config.devtool = 'source-map';
    }

    alertBabelConfig(config.module.rules);

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        antdReproduceVersion: JSON.stringify(isNextVersion ? 'next' : 'latest'),
      }),
    );

    delete config.module.noParse;

    return config;
  },

  devServerConfig: {
    public: process.env.DEV_HOST || 'localhost',
    disableHostCheck: !!process.env.DEV_HOST,
  },

  htmlTemplateExtraData: {
    isDev,
    usePreact,
  },
};
