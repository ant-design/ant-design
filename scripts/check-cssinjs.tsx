/* eslint-disable no-console */
import {
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  NaNLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import chalk from 'chalk';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { generateCssinjs } from './generate-cssinjs';
import { ConfigProvider } from '../components';

console.log(chalk.green(`🔥 Checking CSS-in-JS...`));

let errorCount = 0;
const originError = console.error;
console.error = (msg: any) => {
  if (msg.includes('Warning: [Ant Design CSS-in-JS]')) {
    errorCount += 1;
    console.log(chalk.red(`❌ `), msg.slice(msg.indexOf('Error in')).replace(/\s+/g, ' '));
  } else {
    originError(msg);
  }
};

async function checkCSSVar() {
  const ignore = [
    'affix',
    'alert',
    'anchor',
    'auto-complete',
    'avatar',
    'back-top',
    'badge',
    'breadcrumb',
    'calendar',
    'carousel',
    'cascader',
    'checkbox',
    'collapse',
    'color-picker',
    'date-picker',
    'descriptions',
    'divider',
    'drawer',
    'dropdown',
    'float-button',
    'form',
    'grid',
    'icon',
    'image',
    'layout',
    'message',
    'pagination',
    'progress',
    'qr-code',
    'radio',
    'select',
    'slider',
    'space',
    'steps',
    'switch',
    'table',
    'tabs',
    'tag',
    'timeline',
    'tree',
    'tree-select',
    'upload',
  ];

  await generateCssinjs({
    key: 'check',
    ignore,
    render(Component: any) {
      ReactDOMServer.renderToString(
        <StyleProvider linters={[NaNLinter]}>
          <ConfigProvider theme={{ cssVar: true, hashed: false }}>
            <Component />
          </ConfigProvider>
        </StyleProvider>,
      );
    },
  });
}

(async () => {
  await generateCssinjs({
    key: 'check',
    render(Component: any) {
      ReactDOMServer.renderToString(
        <StyleProvider
          linters={[logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter]}
        >
          <Component />
        </StyleProvider>,
      );
    },
  });

  await checkCSSVar();

  if (errorCount > 0) {
    console.log(chalk.red(`❌  CSS-in-JS check failed with ${errorCount} errors.`));
    process.exit(1);
  } else {
    console.log(chalk.green(`✅  CSS-in-JS check passed.`));
  }
})();
