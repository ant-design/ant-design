/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { codecovWebpackPlugin } = require('@codecov/webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('@madccc/duplicate-package-checker-webpack-plugin');
const path = require('path');

function addLocales(webpackConfig) {
  let packageName = 'antd-with-locales';
  if (webpackConfig.entry['antd.min']) {
    packageName += '.min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalDayjs(config) {
  config.externals.dayjs = {
    root: 'dayjs',
    commonjs2: 'dayjs',
    commonjs: 'dayjs',
    amd: 'dayjs',
  };
}

function externalCssinjs(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};

  config.resolve.alias['@ant-design/cssinjs'] = path.resolve(__dirname, 'alias/cssinjs');
}

let webpackConfig = getWebpackConfig(false);

// Used for `size-limit` ci which only need to check min files
if (process.env.PRODUCTION_ONLY) {
  // eslint-disable-next-line no-console
  console.log('🍐 Build production only');
  webpackConfig = webpackConfig.filter((config) => config.mode === 'production');
}

// RUN_ENV: https://github.com/ant-design/antd-tools/blob/14ee166fc1f4ab5e87da45ee3b0643a8325f1bc3/lib/gulpfile.js#L48
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach((config) => {
    addLocales(config);
    externalDayjs(config);
    externalCssinjs(config);
    // Reduce non-minified dist files size
    config.optimization.usedExports = true;

    if (!process.env.CI || process.env.ANALYZER) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: '../report.html',
        }),
      );
    }

    if (config.mode !== 'production') {
      return;
    }

    if (!process.env.PRODUCTION_ONLY) {
      config.plugins.push(
        new DuplicatePackageCheckerPlugin({
          verbose: true,
          emitError: true,
        }),
      );
    }

    config.plugins.push(
      codecovWebpackPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: 'antd.min',
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    );

    config.plugins.push(
      new CircularDependencyPlugin({
        // add errors to webpack instead of warnings
        failOnError: true,
      }),
    );
  });
}

module.exports = [...webpackConfig];
