/* eslint no-param-reassign: 0 */
// This config is for building dist files
const chalk = require('chalk');
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const RemovePlugin = require('remove-files-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const darkVars = require('./scripts/dark-vars');
const compactVars = require('./scripts/compact-vars');

const { webpack } = getWebpackConfig;

function injectLessVariables(config, variables) {
  (Array.isArray(config) ? config : [config]).forEach(conf => {
    conf.module.rules.forEach(rule => {
      // filter less rule
      if (rule.test instanceof RegExp && rule.test.test('.less')) {
        const lessRule = rule.use[rule.use.length - 1];
        if (lessRule.options.lessOptions) {
          lessRule.options.lessOptions.modifyVars = {
            ...lessRule.options.lessOptions.modifyVars,
            ...variables,
          };
        } else {
          lessRule.options.modifyVars = {
            ...lessRule.options.modifyVars,
            ...variables,
          };
        }
      }
    });
  });

  return config;
}

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

function processWebpackThemeConfig(themeConfig, theme, vars) {
  themeConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);

    // rename default entry to ${theme} entry
    Object.keys(config.entry).forEach(entryName => {
      const originPath = config.entry[entryName];
      let replacedPath = [...originPath];

      // We will replace `./index` to `./index-style-only` since theme dist only use style file
      if (originPath.length === 1 && originPath[0] === './index') {
        replacedPath = ['./index-style-only'];
      } else {
        // eslint-disable-next-line no-console
        console.log(chalk.red('🆘 Seems entry has changed! It should be `./index`'));
      }

      config.entry[entryName.replace('antd', `antd.${theme}`)] = replacedPath;
      delete config.entry[entryName];
    });

    // apply ${theme} less variables
    injectLessVariables(config, vars);

    // ignore emit ${theme} entry js & js.map file
    config.plugins.push(
      new RemovePlugin({
        after: {
          root: './dist',
          include: [
            `antd.${theme}.js`,
            `antd.${theme}.js.map`,
            `antd.${theme}.min.js`,
            `antd.${theme}.min.js.map`,
          ],
          log: false,
          logWarning: false,
        },
      }),
    );
  });
}

const legacyEntryVars = {
  'root-entry-name': 'default',
};
const webpackConfig = injectLessVariables(getWebpackConfig(false), legacyEntryVars);
const webpackDarkConfig = injectLessVariables(getWebpackConfig(false), legacyEntryVars);
const webpackCompactConfig = injectLessVariables(getWebpackConfig(false), legacyEntryVars);
const webpackVariableConfig = injectLessVariables(getWebpackConfig(false), {
  'root-entry-name': 'variable',
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
      config.optimization.minimizer[0] = new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      });
    }

    if (!process.env.CI) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: '../report.html',
        }),
      );
    }

    if (!process.env.NO_DUP_CHECK) {
      config.plugins.push(
        new DuplicatePackageCheckerPlugin({
          verbose: true,
          emitError: true,
        }),
      );
    }
  });

  processWebpackThemeConfig(webpackDarkConfig, 'dark', darkVars);
  processWebpackThemeConfig(webpackCompactConfig, 'compact', compactVars);
  processWebpackThemeConfig(webpackVariableConfig, 'variable', {});
}

module.exports = [
  ...webpackConfig,
  ...webpackDarkConfig,
  ...webpackCompactConfig,
  ...webpackVariableConfig,
];
