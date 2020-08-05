#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
const genCss = require('antd-pro-merge-less');
const defaultVar = require('./default-vars');
const dark = require('./dark-vars');
const compact = require('./compact-vars');

genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './_site/dark.css',
      modifyVars: {
        ...defaultVar,
        ...dark,
        '@site-text-color': '@heading-color',
        '@site-markdown-code-bg': '@input-bg',
      },
    },
    {
      theme: 'compact',
      fileName: './_site/compact.css',
      modifyVars: {
        ...defaultVar,
        ...compact,
      },
    },
  ],
  {
    ignoreAntd: true,
    isModule: false,
    cache: false,
    loadAny: true,
    ignoreProLayout: true,
  },
);

const options = {
  antDir: path.join(__dirname, '../node_modules/antd'),
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antdStylesDir: path.join(__dirname, '../node_modules/antd/lib/'),
  varFile: path.join(__dirname, '../site/theme/static/theme.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../_site/color.less'),
};

generateTheme(options);
