---
order: 5
title: Use in TypeScript
---

Let's create a TypeScript project by using `create-react-app`, then import `antd` step by step.

---

## Install and Initialization

Ensure your system has installed latest version of [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/).

Create a new [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript) project named `antd-demo-ts` using yarn.

```bash
$ yarn create react-app antd-demo-ts --template typescript

# or

npx create-react-app my-app --template typescript
```

If you are using npm (we will use yarn in the following instructions, it's ok to replace yarn with npm)

```bash
$ npx create-react-app antd-demo-ts --typescript
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
import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';

class App extends Component {
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

We are successfully running antd components now but in the real world, there are still lots of problems about antd-demo-ts. For instance, we actually import all styles of components in the project which may be a network performance issue.

Now we need to customize the default webpack config. We can achieve that by using [react-app-rewired](https://github.com/timarney/react-app-rewired) which is one of create-react-app's custom config solutions.

Import react-app-rewired and modify the `scripts` field in package.json. Due to new [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) issue, you shall need [customize-cra](https://github.com/arackaf/customize-cra) along with react-app-rewired.

```
$ yarn add react-app-rewired customize-cra
```

```diff
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

Then create a `config-overrides.js` at root directory of your project for further overriding.

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### Use babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is a babel plugin for importing components on demand ([How does it work?](/docs/react/getting-started#Import-on-Demand)). We are now trying to install it and modify `config-overrides.js`.

```bash
$ yarn add babel-plugin-import
```

```diff
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

Remove the `@import '~antd/dist/antd.css';` statement added before because `babel-plugin-import` will import styles and import components like below:

```diff
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/es/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
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

According to the [Customize Theme documentation](/docs/react/customize-theme), to customize the theme, we need to modify `less` variables with tools such as [less-loader](https://github.com/webpack/less-loader). We can also use [addLessLoader](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions) to achieve this. Import it and modify `config-overrides.js` like below.

```bash
$ yarn add less less-loader
```

```diff
- const { override, fixBabelImports } = require('customize-cra');
+ const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
-   style: 'css',
+   style: true,
  }),
+ addLessLoader({
+   javascriptEnabled: true,
+   modifyVars: { '@primary-color': '#1DA57A' },
+ }),
);
```

We use `modifyVars` option of [less-loader](https://github.com/webpack/less-loader#less-options) here, you can see a green button rendered on the page after rebooting the start server.

> You could also try [craco](https://github.com/sharegate/craco) and [craco-antd](https://github.com/FormAPI/craco-antd) to customize create-react-app webpack config same as customize-cra does.

## Alternative ways

You can also follow instructions in [Use in create-react-app](/docs/react/use-with-create-react-app.en-US.md), then use to setup the TypeScript development environment by yourself.

And you can use [react-scripts-ts-antd](https://www.npmjs.com/package/react-scripts-ts-antd) which includes ts-import-plugin, react-app-rewired, scss, less and etc. You can create a new project that without any configurations by running just one command.

- [Create React apps (with Typescript and antd) with no build configuration](https://github.com/SZzzzz/react-scripts-ts-antd)
- [react-app-rewire-typescript][https://github.com/lwd-technology/react-app-rewire-typescript]
- [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin)
- [create-react-app Adding TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript)
- [Migrating from create-react-app-typescript to Create React App](https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/)
