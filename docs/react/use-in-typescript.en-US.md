---
order: 4
title: Use in TypeScript
---

Let's create a TypeScript project by using `create-react-app`, then import `antd` step by step.

---

## Install and Initialization

Ensure your system has installed latest version of [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/).

Create a new project named `antd-demo-ts` using yarn.

```bash
$ yarn create react-app antd-demo-ts --scripts-version=react-scripts-ts
```

If you are using npm (we will use yarn in the following instructions, it's ok to replace yarn with npm)

```bash
$ npm install -g create-react-app
$ create-react-app antd-demo-ts --scripts-version=react-scripts-ts
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

```jsx
import { Button } from 'antd';
import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
```

Add `antd/dist/antd.css` at the top of `src/App.css`.

```css
@import '~antd/dist/antd.css';

.App {
  text-align: center;
}

...
```

Ok, reboot with `yarn start`, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `create-react-app` at its [User Guide ](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Advanced Guides

We are successfully running antd components now but in the real world, there are still lots of problems about antd-demo-ts.
For instance, we actually import all styles of components in the project which may be a network performance issue.

Now we need to customize the default webpack config. We can achieve that by using [react-app-rewired](https://github.com/timarney/react-app-rewired) which is one of create-react-app's custom config solutions.

Import react-app-rewired and modify the `scripts` field in package.json.

```
$ yarn add react-app-rewired --dev
```


```diff
/* package.json */
"scripts": {
-   "start": "react-scripts-ts start",
+   "start": "react-app-rewired start --scripts-version react-scripts-ts",
-   "build": "react-scripts-ts build",
+   "build": "react-app-rewired build --scripts-version react-scripts-ts",
-   "test": "react-scripts-ts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
}
```

Then create a `config-overrides.js` at root directory of your project for further overriding.

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### Use ts-import-plugin

[ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) is a TypeScript plugin for importing components on demand ([How does it work?](/docs/react/getting-started#Import-on-Demand)). We are now trying to install it and modify `config-overrides.js`.

```bash
$ yarn add ts-import-plugin --dev
```

```js
/* config-overrides.js */
const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      }) ]
    })
  };

  return config;
}
```

Remove the `@import '~antd/dist/antd.css';` statement added before because `babel-plugin-import` will import styles and import components like below:

```diff
import * as React from 'react';
import { Button } from 'antd';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
```

Then reboot with `yarn start` and visit the demo page, you should not find any [warning messages](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png) in the console, which prove that the `import on demand` config is working now. You will find more info about it in [this guide](/docs/react/getting-started#Import-on-Demand).

### Customize Theme

According to the [Customize Theme documentation](/docs/react/customize-theme), to customize the theme, we need to modify `less` variables with tools such as [less-loader](https://github.com/webpack/less-loader). We can also use [react-app-rewire-less](http://npmjs.com/react-app-rewire-less) to achieve this. Import it and modify `config-overrides.js` like below.

```bash
$ yarn add react-app-rewire-less --dev
```

```diff
  const tsImportPluginFactory = require('ts-import-plugin')
  const { getLoader } = require("react-app-rewired");
+ const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config) {
    const tsLoader = getLoader(
      config.module.rules,
      rule =>
        rule.loader &&
        typeof rule.loader === 'string' &&
        rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'es',
-         style: 'css',
+         style: true,
        }) ]
      })
    };

+   config = rewireLess.withLoaderOptions({
+     javascriptEnabled: true,
+     modifyVars: { "@primary-color": "#1DA57A" },
+   })(config, env);

    return config;
  }
```

We use `modifyVars` option of [less-loader](https://github.com/webpack/less-loader#less-options) here, you can see a green button rendered on the page after rebooting the start server.

## Alternative way

You can also follow instructions in [Use in create-react-app](/docs/react/use-with-create-react-app.en-US.md), then use [react-app-rewire-typescript][https://github.com/lwd-technology/react-app-rewire-typescript] to setup the TypeScript development environment by yourself.

And you can use [react-scripts-ts-antd](https://www.npmjs.com/package/react-scripts-ts-antd) which includes ts-import-plugin, react-app-rewired, scss, less and etc.You can create a new project that without any configurations by running just one command.
```bash
$ create-react-app my-project --scripts-version=react-scripts-ts-antd
```

## FAQ

### error TS2605: JSX element type Xxx is not a constructor function for JSX elements.

Before antd 3, You need setting `allowSyntheticDefaultImports` to `true` in tsconfig.json.
