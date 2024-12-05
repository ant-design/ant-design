---
group:
  title: Basic Usage
order: 6
title: Usage with Farm
tag: New
---

[Farm](https://www.farmfe.org/) is a Rust-Based Web Building Engine to Facilitate Your Web Program and JavaScript Library. This article will try to use `Farm` to create a project and import antd.

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn) or [pnpm](https://pnpm.io) or [bun](https://bun.sh).

<InstallDependencies npm='$ npm create farm@latest' yarn='$ yarn create farm@latest' pnpm='$ pnpm create farm@latest' bun='$ bun create farm@latest'></InstallDependencies>

During the initialization process, `farm` provides a series of templates for us to choose, We need choose the `React` template.

The tool will create and initialize environment and dependencies automatically, please try config your proxy setting or use another npm registry if any network errors happen during it.

Then we go inside project and start it.

```bash
$ cd farm-project
$ npm install
$ npm start
```

Open the browser at http://localhost:9000. It renders a title saying `Farm with React` on the page, which is considered successful.

## Import antd

Now we install `antd` from yarn or npm or pnpm or bun.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

Modify `src/main.tsx`, import Button component from `antd`.

```tsx
import React from 'react';
import { Button } from 'antd';

export function Main() {
  return (
    <div>
      <Button type="primary">Button</Button>
    </div>
  );
}
```

OK, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `Farm` at its [Official documentation](https://www.farmfe.org).

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import React from 'react';
import { Button, ConfigProvider } from 'antd';

export function Main() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <Button type="primary">Button</Button>
    </ConfigProvider>
  );
}
```

We are successfully running the antd components using Rsbuild now, let’s start build your own application!
