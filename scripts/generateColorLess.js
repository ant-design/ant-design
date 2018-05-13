#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antDir: path.join(__dirname, '../node_modules/antd'),
  varFile: path.join(__dirname, '../node_modules/antd/lib/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ],
  indexFileName: false,
  outputFilePath: path.join(__dirname, '../_site/color.less')
};

generateTheme(options);
