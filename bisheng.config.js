module.exports = {
  source: ['./components', './docs'],
  theme: './site/theme',
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
