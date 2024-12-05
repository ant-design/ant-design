---
group:
  title: Basic Usage
order: 5
title: Usage with Rsbuild
tag: New
---

[Rsbuild](https://rsbuild.dev) is a build tool driven by Rspack. This article will try to use `Rsbuild` to create a project and import antd.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn) or [pnpm](https://pnpm.io) or [bun](https://bun.sh).

<InstallDependencies npm='$ npm create rsbuild' yarn='$ yarn create rsbuild' pnpm='$ pnpm create rsbuild' bun='$ bun create rsbuild'></InstallDependencies>

During the initialization process, `create-rsbuild` provides a series of templates for us to choose, We need choose the `React` template.

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting or use another npm registry if any network errors happen during it.

Then we go inside project and start it.

```bash
$ cd demo
$ npm run dev
```

Open the browser at http://localhost:3000. It renders a title saying `Rsbuild with React` on the page, which is considered successful.

## Import antd

Now we install `antd` from yarn or npm or pnpm or bun.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

Modify `src/App.tsx`, import Button component from `antd`.

```tsx
import React from 'react';
import { Button } from 'antd';

const App: React.FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `Rsbuild` at its [Official documentation](https://rsbuild.dev).

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <MyApp />
  </ConfigProvider>
);

export default App;
```

We are successfully running the antd components using Rsbuild now, let’s start build your own application!
