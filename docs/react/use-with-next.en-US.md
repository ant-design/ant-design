---
group:
  title: Basic Usage
order: 3
title: Usage with Next.js
tag: Updated
---

[Next.js](https://nextjs.org/) is currently the most popular React server-side isomorphic framework in the world. This article will try to use `antd` components in projects created by Next.js.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/) or [bun](https://bun.sh/).

<InstallDependencies npm='$ npx create-next-app antd-demo' yarn='$ yarn create next-app antd-demo' pnpm='$ pnpm create next-app antd-demo' bun='$ bun create next-app antd-demo'></InstallDependencies>

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting, or use another npm registry if any network errors happen during it.

After the initialization is complete, we enter the project and start.

```bash
$ cd antd-demo
$ npm run dev
```

Open the browser at http://localhost:3000/. if you see the NEXT logo, it is considered a success.

## Import antd

Now we install `antd` from yarn or npm or pnpm or bun.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

Modify `src/app/page.tsx`, import Button component from `antd`.

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

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `Next.js` at its [User Guide](https://nextjs.org/).

You could find that components of antd do not have styles in the first screen. Next, you need to choose different SSR style processing methods according to the mode of Next.js.

## Using App Router <Badge>Updated</Badge>

If you are using the App Router in Next.js and using antd as your component library, to make the antd component library work better in your Next.js application and provide a better user experience, you can try using the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker.

1. Install `@ant-design/nextjs-registry`

<InstallDependencies npm='$ npm install @ant-design/nextjs-registry --save' yarn='$ yarn add @ant-design/nextjs-registry' pnpm='$ pnpm install @ant-design/nextjs-registry --save' bun='$ bun add @ant-design/nextjs-registry'></InstallDependencies>

2. Use it in `app/layout.tsx`

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
Next.js App Router currently not support using sub-components via `.` like `<Select.Option />` and `<Typography.Text />`. Importing them from path would solve this problem.
:::

For more detailed information, please refer to [with-nextjs-app-router-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-app-router-inline-style)。

## Using Pages Router

If you are using the Pages Router in Next.js and using antd as your component library, to make the antd component library work better in your Next.js application and provide a better user experience, you can try using the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker.

1. Install `@ant-design/cssinjs`

> Notes for developers
>
> Please note that when you install `@ant-design/cssinjs`, you must ensure that the version is consistent with the version of `@ant-design/cssinjs` in local `node_modules` of `antd`, otherwise, multiple React instances will appear, resulting in ctx being unable to be read correctly. (Tips: you can use `npm ls @ant-design/cssinjs` command to view the local version)
>
> <img width="514" alt="image" src="https://github.com/ant-design/ant-design/assets/49217418/aad6e9e2-62cc-4c89-a0b6-38c592e3c648">

<InstallDependencies npm='$ npm install @ant-design/cssinjs --save' yarn='$ yarn add @ant-design/cssinjs' pnpm='$ pnpm install @ant-design/cssinjs --save' bun='$ bun add @ant-design/cssinjs'></InstallDependencies>

2. Rewrite `pages/_document.tsx`

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

3. Supports custom themes

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

4. Rewrite `pages/_app.tsx`

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

5. Use antd in page component

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

For more detailed information, please refer to [with-nextjs-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style).
