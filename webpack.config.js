const webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig) {
  if (process.env.ANTD === 'WEBSITE') {
    const component = process.env.COMPONENT_STYLE;

    webpackConfig.entry = {
      index: './site/entry/index.jsx',
    };
    webpackConfig.resolve.root = process.cwd();
    webpackConfig.resolve.alias = {
      antd: process.cwd(),
      BrowserDemo: 'site/component/BrowserDemo',
    };

    if (component !== undefined) {
      const babelConfig = require('atool-build/lib/getBabelCommonConfig')();
      babelConfig.plugins.push([
        'antd',
        {
          // style: true,
          libDir: 'components',
        }
      ]);

      webpackConfig.module.loaders.push({
        test: new RegExp(`components/${component}/demo/.*\.md`),
        loader: `babel?${JSON.stringify(babelConfig)}!antd-md`,
      });
    }

    const exclude = [/node_modules/];
    if (component) {
      exclude.push(new RegExp(`components/${component}/demo/.*\.md`));
    }
    webpackConfig.module.loaders.push({
      test: /\.md$/,
      exclude: exclude,
      loader: `babel!antd-md`,
    });
  }

  if (process.env.ANTD === 'PRODUCTION') {
    const entry = ['./style/index.less', './index.js'];
    webpackConfig.entry = {
      'antd.min': entry,
    };
    webpackConfig.externals = {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    };
    webpackConfig.output.library = 'antd';
    webpackConfig.output.libraryTarget = 'umd';

    const uncompressedWebpackConfig = Object.assign({}, webpackConfig);
    uncompressedWebpackConfig.entry = {
      antd: entry,
    };
    uncompressedWebpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
      return !(plugin instanceof webpack.optimize.UglifyJsPlugin);
    });

    return [
      webpackConfig,
      uncompressedWebpackConfig,
    ];
  }

  // remove common.js
  if (webpackConfig.plugins[0].chunkNames === 'common') {
    webpackConfig.plugins.shift();
  }

  return webpackConfig;
};
