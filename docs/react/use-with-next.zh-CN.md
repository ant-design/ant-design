---
group:
  title: 如何使用
order: 3
title: 在 Next.js 中使用
tag: Updated
---

[Next.js](https://nextjs.org/) 是目前世界上最流行的 React 服务端同构框架，本文会尝试在 Next.js 创建的工程中使用 `antd` 组件。

## 安装和初始化

在开始之前，你可能需要安装 [yarn](https://github.com/yarnpkg/yarn/) 或者 [pnpm](https://pnpm.io/zh/) 或者 [bun](https://bun.sh/)。

<InstallDependencies npm='$ npx create-next-app antd-demo' yarn='$ yarn create next-app antd-demo' pnpm='$ pnpm create next-app antd-demo' bun='$ bun create next-app antd-demo'></InstallDependencies>

工具会自动初始化一个脚手架并安装项目的各种必要依赖，在安装过程中，有一些配置项需要自行选择，如果在过程中出现网络问题，请尝试配置代理，或使用其他 npm registry，例如，你可以切换到淘宝镜像源：`npm config set registry https://registry.npmmirror.com`。

初始化完成后，我们进入项目并启动。

```bash
$ cd antd-demo
$ npm run dev
```

此时使用浏览器访问 http://localhost:3000/ ，看到 NEXT 的 logo 就算成功了。

## 引入 antd

现在从 yarn 或 npm 或 pnpm 或 bun 安装并引入 antd。

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

修改 `src/app/page.tsx`，引入 antd 的按钮组件。

```tsx
import React from 'react';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default Home;
```

好了，现在你应该能看到页面上已经有了 `antd` 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 Next.js 的[官方文档](https://nextjs.org/)。

细心的朋友可以发现这时引入的 antd 组件在首屏并没有样式，下面就需要根据 Next.js 的模式来选择不同的 SSR 样式处理方式。

## 使用 App Router <Badge>Updated</Badge>

如果你在 Next.js 当中使用了 App Router, 并使用 antd 作为页面组件库，为了让 antd 组件库在你的 Next.js 应用中能够更好的工作，提供更好的用户体验，你可以尝试使用下面的方式将 antd 首屏样式按需抽离并植入到 HTML 中，以避免页面闪动的情况。

1. 安装 `@ant-design/nextjs-registry`

<InstallDependencies npm='$ npm install @ant-design/nextjs-registry --save' yarn='$ yarn add @ant-design/nextjs-registry' pnpm='$ pnpm install @ant-design/nextjs-registry --save' bun='$ bun add @ant-design/nextjs-registry'></InstallDependencies>

2. 在 `app/layout.tsx` 中使用

```tsx
import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
```

<!-- prettier-ignore -->
:::warning
注意: Next.js App Router 当前不支持直接使用 `.` 引入的子组件，如 `<Select.Option />`、`<Typography.Text />` 等，需要从路径引入这些子组件来避免错误。
:::

更多详细的细节可以参考 [with-nextjs-app-router-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-app-router-inline-style)。

## 使用 Pages Router

如果你在 Next.js 当中使用了 Pages Router, 并使用 antd 作为页面组件库，为了让 antd 组件库在你的 Next.js 应用中能够更好的工作，提供更好的用户体验，你可以尝试使用下面的方式将 antd 首屏样式按需抽离并植入到 HTML 中，以避免页面闪动的情况。

1. 安装 `@ant-design/cssinjs`

> 开发者注意事项：
>
> 请注意，安装 `@ant-design/cssinjs` 时必须确保版本号跟 `antd` 本地的 `node_modules` 中的 `@ant-design/cssinjs` 版本保持一致，否则会出现多个 React 实例，导致无法正确的读取 ctx。（Tips: 你可以通过 `npm ls @ant-design/cssinjs` 命令查看本地版本）
>
> <img width="514" alt="image" src="https://github.com/ant-design/ant-design/assets/49217418/aad6e9e2-62cc-4c89-a0b6-38c592e3c648">

<InstallDependencies npm='$ npm install @ant-design/cssinjs --save' yarn='$ yarn add @ant-design/cssinjs' pnpm='$ pnpm install @ant-design/cssinjs --save' bun='$ bun add @ant-design/cssinjs'></InstallDependencies>

2. 改写 `pages/_document.tsx`

```tsx
import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';

const MyDocument = () => (
  <Html lang="en">
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
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
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
```

3. 支持自定义主题

```ts
// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#52c41a',
  },
};

export default theme;
```

4. 改写 `pages/_app.tsx`

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import theme from './theme/themeConfig';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;
```

5. 在页面中使用 antd

```tsx
import React from 'react';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default Home;
```

更多详细的细节可以参考 [with-nextjs-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style)。
