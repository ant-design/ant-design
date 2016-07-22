const path = require('path');

module.exports = {
  port: 8001,
  source: [
    './components',
    './docs',
    'CHANGELOG.md', // TODO: fix it in bisheng
  ],
  lazyLoad: true,
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    'bisheng-plugin-react?lang=__react',
    'bisheng-plugin-antd',
  ],
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {
    config.resolve.alias = {
      antd: process.cwd(),
      site: path.join(process.cwd(), 'site'),
    };

    config.babel.plugins.push([
      require.resolve('babel-plugin-antd'),
      {
        style: true,
        libraryName: 'antd',
        libDir: 'components',
      },
    ]);

    return config;
  },
};
