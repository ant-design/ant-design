---
order: 4
title: Usage with Next.js
---

[Next.js](https://nextjs.org/) is currently the most popular React server-side isomorphic framework in the world. This article will try to use `antd` components in projects created by Next.js.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/).

<InstallDependencies npm='$ npx create-next-app antd-demo' yarn='$ yarn create next-app antd-demo' pnpm='$ pnpm create next-app antd-demo'></InstallDependencies>

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting, or use another npm registry if any network errors happen during it.

After the initialization is complete, we enter the project and start.

```bash
$ cd antd-demo
$ npm run dev
```

Open the browser at http://localhost:3000/. if you see the NEXT logo, it is considered a success.

## Import antd

Now we install `antd` from yarn or npm or pnpm.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save'></InstallDependencies>

Modify `src/app/page.tsx`, import Button component from `antd`.

```jsx
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

We are successfully running antd components now, go build your own application!

## Use the Pages Router of Next.js

If you are using the Pages Router in Next.js and using antd as your component library, to make the antd component library work better in your Next.js application and provide a better user experience, you can try using the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker.

1. Install `@ant-design/cssinjs`

<InstallDependencies npm='$ npm install @ant-design/cssinjs --save' yarn='$ yarn add @ant-design/cssinjs' pnpm='$ pnpm install @ant-design/cssinjs --save'></InstallDependencies>

2. Rewrite `pages/_document.tsx`

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
    // 1.1 extract style which had been used
    const style = extractStyle(cache, true);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* 1.2 inject css */}
          <style dangerouslySetInnerHTML={{ __html: style }}></style>
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

3. Supports custom themes

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 16,
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
);

export default withTheme;
```

4. Rewrite `pages/_app.tsx`

```tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import withTheme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return withTheme(<Component {...pageProps} />);
}
```

5. Use antd in page component

```tsx
import { Button } from 'antd';

export default function Home() {
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  );
}
```

For more detailed information, please refer to [with-nextjs-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style).

## Using Next.js App Router

If you are using the App Router in Next.js and using antd as your component library, to make the antd component library work better in your Next.js application and provide a better user experience, you can try using the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker.

1. Install `@ant-design/cssinjs`

<InstallDependencies npm='$ npm install @ant-design/cssinjs --save' yarn='$ yarn add @ant-design/cssinjs' pnpm='$ pnpm install @ant-design/cssinjs --save'></InstallDependencies>

2. Create `lib/AntdRegistry.tsx`

```tsx
'use client';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = createCache();
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
```

3. Use it in `app/layout.tsx`

```tsx
import { Inter } from 'next/font/google';
import React from 'react';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
```

4. Customize theme config in `theme/*.ts`

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

5. Use in page

```tsx
import { Button, ConfigProvider } from 'antd';
import React from 'react';
import theme from './themeConfig';

const HomePage: React.FC = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  </ConfigProvider>
);

export default HomePage;
```

> Tips: The above method does not use sub-components such as `Select.Option` and `Typography.text` in the page, so it can be used normally. However, if you use a sub-component like this in your page, you will currently see the following warning in next.js: `Error:  Cannot access .Option on the server. You cannot dot into a client module from a server component. You can only pass the  imported name through.`, currently need to wait for Next.js official solution. Before again, if you use the above sub-components in your page, you can add "use client" to the first line of the page component to avoid warnings. See examples for more details: [with-sub-components](https://github.com/ant-design/ant-design-examples/blob/main/examples/with-nextjs-app-router-inline-style/src/app/with-sub-components/page.tsx).

For more detailed information, please refer to [with-nextjs-app-router-inline-style](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-app-router-inline-style)。
