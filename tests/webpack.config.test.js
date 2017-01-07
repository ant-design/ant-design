import getWebpackCommonConfig from 'atool-build/lib/getWebpackCommonConfig';
import getWebpackConfig from '../webpack.config.js';

describe('webpackConfig', () => {
  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  it('has es3ify loader', () => {
    process.env.RUN_ENV = 'PRODUCTION';
    const commonConfig = getWebpackCommonConfig({ cwd: process.cwd() });
    const webpackConfig = getWebpackConfig(commonConfig);
    webpackConfig.forEach((config) => {
      expect(
        config.module.loaders.filter(l => l.loader === 'es3ify-loader')
      ).toHaveLength(1);
    });
  });
});
