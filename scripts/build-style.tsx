import React from 'react';
import Module from 'module';
import path from 'path';
import fs from 'fs-extra';
import minimist from 'minimist';

import { ConfigProvider } from '../components';

const originalResolve = (Module as any)._resolveFilename;

(Module as any)._resolveFilename = function (request: string, ...args: any[]) {
  if (request === 'antd') {
    return require.resolve('../components');
  }
  return originalResolve.call(this, request, ...args);
};

// Check for media queries using CSS var like: @media (min-width: var(--xxx))
const isValidMediaQuery = (extractStyle: string) => {
  const cssVarMediaRegex = /@media\s*\([^)]*(?:min-width|max-width)\s*:\s*var\(/;
  const match = cssVarMediaRegex.test(extractStyle);

  return !match;
};

const run = async () => {
  const { extractStyle } = await import('@ant-design/static-style-extract');

  const argv = minimist(process.argv.slice(2));
  const enableLayer = argv.layer !== undefined;
  const layerContent = typeof argv.layer === 'string' ? argv.layer : '';

  const output = path.join(
    __dirname,
    '..',
    'components',
    'style',
    enableLayer ? '~antd.layer.css' : 'antd.css',
  );

  function buildStyle() {
    if (fs.existsSync(output)) {
      fs.unlinkSync(output);
    }

    const styleStr = extractStyle((node) => (
      <ConfigProvider
        theme={{
          hashed: false,
        }}
      >
        {node}
      </ConfigProvider>
    ));

    if (!isValidMediaQuery(styleStr)) {
      throw new Error('Invalid media query found, example: @media (min-width: var(--xxx))');
    }

    const finalStyleStr = layerContent
      ? `${layerContent}\n\n@layer antd {\n${styleStr}\n}`
      : styleStr;

    fs.writeFileSync(output, finalStyleStr);
  }

  buildStyle();
};

run();
