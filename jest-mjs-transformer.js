const babelJest = require('babel-jest');
const { default: getBabelCommonConfig } = require('@ant-design/tools/lib/getBabelCommonConfig');

const babelConfig = getBabelCommonConfig(false);
const baseTransformer = babelJest.createTransformer(babelConfig);

// Return the transformer directly, babel-jest handles this correctly
module.exports = baseTransformer;
