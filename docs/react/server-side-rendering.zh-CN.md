---
group:
  title: 进阶使用
order: 2
title: 服务端渲染
tag: New
---

服务端渲染样式有两种方案，它们各有优缺点：

- **内联样式**：在渲染时无需额外请求样式文件，好处是减少额外的网络请求，缺点则是会使得 HTML 体积增大，影响首屏渲染速度，相关讨论参考：[#39891](https://github.com/ant-design/ant-design/issues/39891)
- **整体导出**：提前烘焙 antd 组件样式为 css 文件，在页面中时引入。好处是打开任意页面时如传统 css 方案一样都会复用同一套 css 文件以命中缓存，缺点是如果页面中存在多主题，则需要额外进行烘焙

## 内联样式

使用 `@ant-design/cssinjs` 将所需样式抽离：

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

## 整体导出

如果你想要将样式文件抽离到 css 文件中，可以尝试使用以下方案：

1. 安装依赖

```bash
npm install ts-node tslib cross-env --save-dev
```

2. 新增 `tsconfig.node.json` 文件

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

3. 新增 `scripts/genAntdCss.tsx` 文件

```tsx
// scripts/genAntdCss.tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';

const outputPath = './public/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
```

若你想使用混合主题或自定义主题，可采用以下脚本：

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

你可以选择在启动开发命令或编译前执行这个脚本，运行上述脚本将会在当前项目的指定（如： public 目录）目录下直接生成一个全量的 antd.min.css 文件。

以 Next.js 为例（[参考示例](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style)）：

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

然后，你只需要在`pages/_app.tsx`文件中引入这个文件即可：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';
import type { AppProps } from 'next/app';
import '../public/antd.min.css'; // 添加这行
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider hashPriority="high">
      <Component {...pageProps} />
    </StyleProvider>
  );
}
```

### 自定义主题

如果你的项目中使用了自定义主题，可以尝试通过以下方式进行烘焙：

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

### 混合主题

如果你的项目中使用了混合主题，可以尝试通过以下方式进行烘焙：

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

更多`static-style-extract`的实现细节请看：[static-style-extract](https://github.com/ant-design/static-style-extract)。

## 按需抽取

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

在 `_document.tsx` 中使用上述工具进行按需导出：

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

演示示例请看：[按需抽取样式示例](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-generate-css-on-demand)
