#!/usr/bin/env node
const path = require('path');
const genCss = require('antd-pro-merge-less');
const { generateTheme } = require('antd-theme-generator');

// 还不支持浏览器中渲染，因为 inline javascript 放不进去
genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './_site/dark.css',
      modifyVars: {
        '@site-markdown-code-bg': '@input-bg',
      },
    },
  ],
  {
    ignoreAntd: true,
    ignoreProLayout: true,
  },
);

const options = {
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antdStylesDir: path.join(__dirname, '../components'),
  varFile: path.join(__dirname, '../components/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../_site/color.less'),
};

generateTheme(options);
