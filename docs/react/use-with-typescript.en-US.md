---
order: 5
title: Usage with TypeScript
---

Let's create a `TypeScript` project by using `create-react-app`, then import `antd` step by step.

> We build `antd` based on latest stable version of TypeScript (`>=5.0.0`), please make sure your project dependency matches it.

## Install and Initialization

Ensure your system has installed latest version of [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/).

Create a new [cra-template-typescript](https://github.com/facebook/create-react-app/tree/main/packages/cra-template-typescript) project named `antd-demo-ts`.

<InstallDependencies npm='$ npx create-react-app antd-demo-ts --template typescript' yarn='$ yarn create react-app antd-demo-ts --template typescript' pnpm='$ pnpm create react-app antd-demo-ts --template typescript'></InstallDependencies>

If you are using `vite`, there will be an option during build where you can choose the `typescript` template.

![](https://github-production-user-asset-6210df.s3.amazonaws.com/49217418/245092600-9af66ed4-f44d-4793-9d7a-179ff39fc284.png)

Then we go inside `antd-demo-ts` and start it.

```bash
$ cd antd-demo-ts
$ yarn start
```

Open browser at http://localhost:3000/, it renders a header saying "Welcome to React" on the page.

## Import antd

```bash
$ yarn add antd
```

Modify `src/App.tsx`, import Button component from `antd`.

```tsx
import { Button } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

OK, reboot with `yarn start`, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `create-react-app` at it's [User Guide](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app).

`antd` is written in TypeScript with complete definitions, try out and enjoy the property suggestion and typing check.

![](https://gw.alipayobjects.com/zos/antfincdn/26L5vPoLug/8d7da796-175e-40af-8eea-e7031ba09f9f.png)

> Don't install `@types/antd`.

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import { ConfigProvider } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <MyApp />
  </ConfigProvider>
);

export default App;
```
