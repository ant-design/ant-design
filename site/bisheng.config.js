const path = require('path');

module.exports = {
  source: ['./components', './docs', './CHANGELOG.md'],
  theme: './site/theme',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    './site/bisheng-plugin-antd',
  ],
  webpackConfig(config) {
    config.resolve.alias = {
      antd: process.cwd(),
      site: path.join(process.cwd(), 'site'),
    };

    config.module.loaders.forEach((loader) => {
      if (loader.test.toString() !== '/\\.md$/') return;
      loader.loaders.splice(1, 0, path.join(process.cwd(), 'site/bisheng-markdown-react-loader'));
    });

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
