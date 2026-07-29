const babelConfigModule = require('@ant-design/tools/lib/getBabelCommonConfig');

const getBabelCommonConfig = babelConfigModule.default;

babelConfigModule.default = (...args) => {
  const config = getBabelCommonConfig(...args);
  config.plugins = [
    require.resolve('@babel/plugin-transform-class-static-block'),
    ...(config.plugins || []),
  ];
  return config;
};

module.exports = require('@ant-design/tools/lib/jest/codePreprocessor');
