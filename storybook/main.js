const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve, relative, join } = require('path');

function getStoriesFromEnv() {
  const folder = process.env.STORYBOOK_PKG || 'components';
  const root = resolve(__dirname, '..');
  const stories = resolve(root, folder);
  const relativePath = relative(__dirname, stories);
  const glob = join(relativePath, '**', '*.stories.tsx');
  return glob;
}

module.exports = {
  webpackFinal: async config => {
    config.module = config.module || { rules: [] };
    config.plugins = config.plugins || [];
    const webpackConfig = getWebpackConfig(false);

    if (webpackConfig.module == null) {
      throw new Error('our webpack config should have module rules');
    }
    if (webpackConfig.plugins == null) {
      throw new Error('our webpack config should have plugins');
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        ...webpackConfig.resolve,
      },
      module: {
        ...config.module,
        ...webpackConfig.module,
      },
      plugins: [...config.plugins, new MiniCssExtractPlugin()],
    };
  },

  stories: [getStoriesFromEnv()],
  addons: ['@storybook/addon-knobs/register', '@storybook/addon-actions/register'],
};
