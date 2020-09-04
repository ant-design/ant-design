/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const EsbuildPlugin = require('esbuild-webpack-plugin').default;
const darkVars = require('./scripts/dark-vars');
const compactVars = require('./scripts/compact-vars');

const { webpack } = getWebpackConfig;

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better: http://stackoverflow.com/q/25384360
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function addLocales(webpackConfig) {
  let packageName = 'antd-with-locales';
  if (webpackConfig.entry['antd.min']) {
    packageName += '.min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

function injectWarningCondition(config) {
  config.module.rules.forEach(rule => {
    // Remove devWarning if needed
    if (rule.test.test('test.tsx')) {
      rule.use = [
        ...rule.use,
        {
          loader: 'string-replace-loader',
          options: {
            search: 'devWarning(',
            replace: "if (process.env.NODE_ENV !== 'production') devWarning(",
          },
        },
      ];
    }
  });
}

function processWebpackThemeConfig(themeConfig, theme, vars) {
  themeConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);

    // rename default entry to ${theme} entry
    Object.keys(config.entry).forEach(entryName => {
      config.entry[entryName.replace('antd', `antd.${theme}`)] = config.entry[entryName];
      delete config.entry[entryName];
    });

    // apply ${theme} less variables
    config.module.rules.forEach(rule => {
      // filter less rule
      if (rule.test instanceof RegExp && rule.test.test('.less')) {
        const lessRule = rule.use[rule.use.length - 1];
        if (lessRule.options.lessOptions) {
          lessRule.options.lessOptions.modifyVars = vars;
        } else {
          lessRule.options.modifyVars = vars;
        }
      }
    });

    const themeReg = new RegExp(`${theme}(.min)?\\.js(\\.map)?$`);
    // ignore emit ${theme} entry js & js.map file
    config.plugins.push(new IgnoreEmitPlugin(themeReg));
  });
}

const webpackConfig = getWebpackConfig(false);
const webpackDarkConfig = getWebpackConfig(false);
const webpackCompactConfig = getWebpackConfig(false);

webpackConfig.forEach(config => {
  injectWarningCondition(config);
});

if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
    // Reduce non-minified dist files size
    config.optimization.usedExports = true;
    // use esbuild
    if (process.env.ESBUILD || process.env.CSB_REPO) {
      config.optimization.minimizer[0] = new EsbuildPlugin({
        target: 'chrome49',
      });
    }

    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: '../report.html',
      }),
    );
  });

  processWebpackThemeConfig(webpackDarkConfig, 'dark', darkVars);
  processWebpackThemeConfig(webpackCompactConfig, 'compact', compactVars);
}

module.exports = [...webpackConfig, ...webpackDarkConfig, ...webpackCompactConfig];
