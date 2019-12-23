#!/usr/bin/env node
const path = require('path');
const genCss = require('antd-pro-merge-less');
const dark = require('./dart');

genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './_site/dark.css',
      modifyVars: {
        ...dark,
        '@site-markdown-code-bg': '@input-bg',
      },
    },
  ],
  {
    ignoreAntd: true,
    isModule: false,
    cache: false,
    ignoreProLayout: true,
  },
);
