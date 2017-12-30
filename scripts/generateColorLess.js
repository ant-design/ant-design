#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const less = require('less');

const COLOR_MAP = {
  '#e6f7ff': 'color(~`colorPalette("@{primary-color}", 1)`)', // @primary-1
  '#bae7ff': 'color(~`colorPalette("@{primary-color}", 2)`)', // @primary-2
  '#40a9ff': 'color(~`colorPalette("@{primary-color}", 5)`)', // @primary-5
  '#1890ff': '@primary-color',
  '#096dd9': 'color(~`colorPalette("@{primary-color}", 7)`)', // @primary-7
  '#46a6ff': 'tint(@primary-color, 20%)',
  '#8cc8ff': 'tint(@primary-color, 50%)',
  'rgba\\(24, 144, 255, 0.2\\)': 'fade(@primary-color, 20%)',
};

const reducePlugin = postcss.plugin('reducePlugin', () => {
  const cleanRule = (rule) => {
    if (rule.selector.startsWith('.main-color .palatte-')) {
      rule.remove();
      return;
    }
    let removeRule = true;
    rule.walkDecls((decl) => {
      if (
        !decl.prop.includes('color') &&
        !decl.prop.includes('background') &&
        !decl.prop.includes('border') &&
        !decl.prop.includes('box-shadow')
      ) {
        decl.remove();
      } else {
        removeRule = false;
      }
    });
    if (removeRule) {
      rule.remove();
    }
  };
  return (css) => {
    css.walkAtRules((atRule) => {
      atRule.remove();
    });

    css.walkRules(cleanRule);

    css.walkComments(c => c.remove());
  };
});

const antd = path.resolve(__dirname, '../');
const entry = path.join(antd, 'components/style/index.less');
let content = fs.readFileSync(entry).toString();
const styles = glob.sync(path.join(antd, 'components/*/style/index.less'));
content += '\n';
styles.forEach((style) => {
  content += `@import "${style}";\n`;
});
content += `@import "${path.join(antd, 'site/theme/static/index.less')}";\n`;

less.render.call(less, content, {
  paths: [path.join(antd, 'components/style')],
}).then(({ css }) => {
  return postcss([
    reducePlugin,
  ]).process(css, { parser: less.parser, from: entry });
}).then(({ css }) => {
  Object.keys(COLOR_MAP).forEach((key) => {
    css = css.replace(new RegExp(key, 'g'), COLOR_MAP[key]);
  });

  const bezierEasing = fs.readFileSync(path.join(antd, 'components/style/color/bezierEasing.less')).toString();
  const tinyColor = fs.readFileSync(path.join(antd, 'components/style/color/tinyColor.less')).toString();
  const colorPalette = fs.readFileSync(path.join(antd, 'components/style/color/colorPalette.less'))
    .toString()
    .replace('@import "bezierEasing";', '')
    .replace('@import "tinyColor";', '');

  css = `${colorPalette}\n${css}`;
  css = `${tinyColor}\n${css}`;
  css = `${bezierEasing}\n${css}`;
  css = `@primary-color: #1890ff;\n${css}`;

  const siteDir = path.resolve(__dirname, '../_site');
  if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir);
  }
  fs.writeFileSync(path.resolve(__dirname, '../_site/color.less'), css);
});
