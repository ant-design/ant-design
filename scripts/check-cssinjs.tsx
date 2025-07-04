import path from 'path';
import React from 'react';
import {
  createCache,
  extractStyle,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  NaNLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import chalk from 'chalk';
import { parse } from 'css-tree';
import type { SyntaxParseError } from 'css-tree';
import { validate } from 'csstree-validator';
import fs from 'fs-extra';
import isCI from 'is-ci';
import ReactDOMServer from 'react-dom/server';

import { ConfigProvider } from '../components';
import { generateCssinjs } from './generate-cssinjs';

const tmpDir = path.join(`${__filename}.tmp`);
fs.emptyDirSync(tmpDir);

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

// https://github.com/csstree/validator/blob/7df8ca/lib/validate.js#L187
function cssValidate(css: string, filename: string) {
  const errors: SyntaxParseError[] = [];
  const ast = parse(css, {
    filename,
    positions: true,
    onParseError(error) {
      errors.push(error);
    },
  });

  return errors.concat(validate(ast));
}

async function checkCSSVar() {
  await generateCssinjs({
    key: 'check',
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
async function checkCSSContent() {
  const errors = new Map();
  await generateCssinjs({
    key: 'css-validate',
    render(Component: any, filePath: string) {
      const cache = createCache();
      ReactDOMServer.renderToString(
        <StyleProvider cache={cache}>
          <Component />
        </StyleProvider>,
      );

      const css = extractStyle(cache, { types: 'style', plain: true });
      let showPath = filePath;
      if (!isCI) {
        const [, name] = filePath.split(path.sep);
        const writeLocalPath = path.join(tmpDir, `${name}.css`);
        showPath = path.relative(process.cwd(), writeLocalPath);
        fs.writeFileSync(writeLocalPath, `/* ${filePath} */\n${css}`);
      }
      errors.set(filePath, cssValidate(css, showPath));
    },
  });

  for (const [filePath, error] of errors) {
    if (error.length > 0) {
      errorCount += error.length;
      console.log(chalk.red(`❌  ${filePath} has ${error.length} errors:`));
      console.log(error);
    }
  }
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
  await checkCSSContent();

  if (errorCount > 0) {
    console.log(chalk.red(`❌  CSS-in-JS check failed with ${errorCount} errors.`));
    process.exit(1);
  } else {
    console.log(chalk.green(`✅  CSS-in-JS check passed.`));
  }
})();
