/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { codecovWebpackPlugin } = require('@codecov/webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('@madccc/duplicate-package-checker-webpack-plugin');
const path = require('path');

function addLocales(config) {
  const newConfig = { ...config }; // Avoid mutating the original config
  let packageName = 'antd-with-locales';
  if (newConfig.entry['antd.min']) {
    packageName += '.min';
  }
  newConfig.entry[packageName] = './index-with-locales.js';
  newConfig.output.filename = '[name].js';
  return newConfig;
}

function externalDayjs(config) {
  const newConfig = { ...config }; // Shallow copy for safety
  newConfig.externals.dayjs = {
    root: 'dayjs',
    commonjs2: 'dayjs',
    commonjs: 'dayjs',
    amd: 'dayjs',
  };
  return newConfig;
}

function externalCssinjs(config) {
  const newConfig = { ...config }; // Shallow copy for safety
  newConfig.resolve = newConfig.resolve || {};
  newConfig.resolve.alias = newConfig.resolve.alias || {};
  newConfig.resolve.alias['@ant-design/cssinjs'] = path.resolve(__dirname, 'alias/cssinjs');
  return newConfig;
}

function addPluginsForProduction(config) {
  const newConfig = { ...config }; // Shallow copy for safety
  if (!process.env.CI || process.env.ANALYZER) {
    newConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../report.html',
      }),
    );
  }
  if (newConfig.mode === 'production' && !process.env.PRODUCTION_ONLY) {
    newConfig.plugins.push(
      new DuplicatePackageCheckerPlugin({
        verbose: true,
        emitError: true,
      }),
    );
  }

  newConfig.plugins.push(
    codecovWebpackPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: 'antd.min',
      uploadToken: process.env.CODECOV_TOKEN,
      gitService: "github",
    }),
    new CircularDependencyPlugin({
      failOnError: true,
    }),
  );

  return newConfig;
}

let webpackConfig = getWebpackConfig(false);

if (process.env.PRODUCTION_ONLY) {
  console.log('🍐 Build production only');
  webpackConfig = webpackConfig.filter((config) => config.mode === 'production');
}

if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig = webpackConfig.map((config) => {
    let newConfig = addLocales(config);
    newConfig = externalDayjs(newConfig);
    newConfig = externalCssinjs(newConfig);
    newConfig.optimization.usedExports = true;
    newConfig = addPluginsForProduction(newConfig);
    return newConfig;
  });
}

module.exports = [...webpackConfig];
