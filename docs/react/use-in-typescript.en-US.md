---
order: 5
title: Use in TypeScript
---

Let's create a TypeScript project by using `create-react-app`, then import `antd` step by step.

> We build `antd` based on latest stable version of TypeScript (`>=4.0.0`), please make sure your project dependency matches it.

---

## Install and Initialization

Ensure your system has installed latest version of [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/).

Create a new [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript) project named `antd-demo-ts` using yarn.

```bash
$ yarn create react-app antd-demo-ts --template typescript
```

If you are using npm (we will use yarn in the following instructions, it's ok to replace yarn with npm)

```bash
$ npx create-react-app antd-demo-ts --template typescript
```

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
import 'antd/dist/reset.css';
import type { FC } from 'react';
import React from 'react';
import './App.css';

const App: FC = () => (
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

## Advanced Guides

In the real world, we usually have to modify default webpack config for custom needs such as themes. We can achieve that by using [craco](https://github.com/gsoft-inc/craco) which is one of create-react-app's custom config solutions.

Install craco and modify the `scripts` field in `package.json`.

```bash
$ yarn add @craco/craco
```

```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```

Then create a `craco.config.js` at root directory of your project for further overriding.

```js
/* craco.config.js */
module.exports = {
  // ...
};
```

### Customize Theme

Ref to the [Customize Theme documentation](/docs/react/customize-theme). Modify theme with ConfigProvider:

```tsx
import { ConfigProvider } from 'antd';
import React from 'react';

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <MyApp />
  </ConfigProvider>
);
```

## Alternative ways

Follow manual in [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript) to setup TypeScript development environment if you already create a project by [Use in create-react-app](/docs/react/use-with-create-react-app).

- [Create React apps (with Typescript and antd) with no build configuration](https://github.com/SZzzzz/react-scripts-ts-antd)
- [react-app-rewire-typescript](https://github.com/lwd-technology/react-app-rewire-typescript)
- [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin)
- [Migrating from create-react-app-typescript to Create React App](https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/)
