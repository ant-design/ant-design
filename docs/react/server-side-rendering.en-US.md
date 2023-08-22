---
group:
  title: Advanced
order: 2
title: Server Side Rendering
tag: New
---

There are two options for server-side rendering styles, each with advantages and disadvantages:

- **Inline mode**: there is no need to request additional style files during rendering. The advantage is to reduce additional network requests. The disadvantage is that the HTML volume will increase and the speed of the first screen rendering will be affected. Relevant discussion: [#39891](https://github.com/ant-design/ant-design/issues/39891)
- **Whole export**: The antd component is pre-baked and styled as a css file to be introduced in the page. The advantage is that when opening any page, the same set of css files will be reused just like the traditional css scheme to hit the cache. The disadvantage is that if there are multiple themes in the page, additional baking is required

## Inline Style

Use `@ant-design/cssinjs` to extract style:

```tsx
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { renderToString } from 'react-dom/server';

export default () => {
  // SSR Render
  const cache = createCache();

  const html = renderToString(
    <StyleProvider cache={cache}>
      <MyApp />
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extractStyle(cache);

  // Mix with style
  return `
<!DOCTYPE html>
<html>
  <head>
    ${styleText}
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
`;
};
```

## Whole Export

If you want to detach a style file into a css file, try the following schemes:

1. Installation dependency

```bash
npm install ts-node tslib cross-env --save-dev
```

2. Add `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "module": "NodeNext",
    "jsx": "react",
    "esModuleInterop": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

3. Add `scripts/genAntdCss.tsx`

```tsx
// scripts/genAntdCss.tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = './public/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
```

If you want to use mixed themes or custom themes, you can use the following script:

```tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';
import React from 'react';
import { ConfigProvider } from 'antd';

const outputPath = './public/antd.min.css';

const testGreenColor = '#008000';
const testRedColor = '#ff0000';

const css = extractStyle((node) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: testGreenColor,
        },
      }}
    >
      {node}
    </ConfigProvider>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: testGreenColor,
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: testRedColor,
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
));

fs.writeFileSync(outputPath, css);
```

You can choose to execute this script before starting the development command or before compiling. Running this script will generate a full antd.min.css file directly in the specified directory of the current project (e.g. public).

Take Next.js for example（[example](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style)）：

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "predev": "ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx",
    "prebuild": "cross-env NODE_ENV=production ts-node --project ./tsconfig.node.json ./scripts/genAntdCss.tsx"
  }
}
```

Then, you just need to import this file into the `pages/_app.tsx` file:

```tsx
import { StyleProvider } from '@ant-design/cssinjs';
import type { AppProps } from 'next/app';
import '../public/antd.min.css'; // add this line
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider hashPriority="high">
      <Component {...pageProps} />
    </StyleProvider>
  );
}
```

### Custom theme

If you're using a custom theme for your project, try baking in the following ways:

```tsx
import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';

const cssText = extractStyle((node) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'red',
      },
    }}
  >
    {node}
  </ConfigProvider>
));
```

### Mixed theme

If you're using a mixed theme for your project, try baking in the following ways:

```tsx
import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';

const cssText = extractStyle((node) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: 'green ',
        },
      }}
    >
      {node}
    </ConfigProvider>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'blue',
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: 'red ',
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
));
```

More about static-style-extract, see [static-style-extract](https://github.com/ant-design/static-style-extract).

## Extract on demand

```tsx
// scripts/genAntdCss.tsx
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import type Entity from '@ant-design/cssinjs/lib/Cache';
import { extractStyle } from '@ant-design/cssinjs';

export type DoExtraStyleOptions = {
  cache: Entity;
  dir?: string;
  baseFileName?: string;
};
export function doExtraStyle({
  cache,
  dir = 'antd-output',
  baseFileName = 'antd.min',
}: DoExtraStyleOptions) {
  const baseDir = path.resolve(__dirname, '../../static/css');

  const outputCssPath = path.join(baseDir, dir);

  if (!fs.existsSync(outputCssPath)) {
    fs.mkdirSync(outputCssPath, { recursive: true });
  }

  const css = extractStyle(cache, true);
  if (!css) return '';

  const md5 = createHash('md5');
  const hash = md5.update(css).digest('hex');
  const fileName = `${baseFileName}.${hash.substring(0, 8)}.css`;
  const fullpath = path.join(outputCssPath, fileName);

  const res = `_next/static/css/${dir}/${fileName}`;

  if (fs.existsSync(fullpath)) return res;

  fs.writeFileSync(fullpath, css);

  return res;
}
```

Export on demand using the above tools in `_document.tsx`

```tsx
// _document.tsx
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { doExtraStyle } from '../scripts/genAntdCss';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    let fileName = '';
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    // 1.1 extract style which had been used
    fileName = doExtraStyle({
      cache,
    });
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* 1.2 inject css */}
          {fileName && <link rel="stylesheet" href={`/${fileName}`} />}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

See the demo：[Export the css files on demand demo](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-generate-css-on-demand)
