const path = require('path');

module.exports = {
  source: ['./components', './docs', './CHANGELOG.md'],
  theme: './site/theme',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    'bisheng-plugin-react?lang=__react',
    './site/bisheng-plugin-antd',
  ],
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
