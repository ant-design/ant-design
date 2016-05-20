module.exports = {
  source: ['./components', './docs'],
  theme: './site/theme',
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2',
    './site/bisheng-plugin-antd',
  ],
  webpackConfig(config) {
    config.resolve.alias = {
      antd: process.cwd(),
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
