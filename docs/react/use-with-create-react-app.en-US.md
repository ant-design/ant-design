---
order: 3
title: Use in create-react-app
---

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of the best React application development tools. We are going to use `antd` within it and modify the webpack config for some customized needs.

---

## Install and Initialization

Before all start, you may need install [yarn](https://github.com/yarnpkg/yarn/).

```bash
$ yarn create react-app antd-demo
```

The tool will create and initialize environment and dependencies automatically,
please try config your proxy setting or use another npm registry if any network errors happen during it.

Then we go inside `antd-demo` and start it.

```bash
$ cd antd-demo
$ yarn start
```

Open the browser at http://localhost:3000/. It renders a header saying "Welcome to React" on the page.

## Import antd

Below is the default directory structure.

```
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── logo.svg
└── yarn.lock
```

Now we install `antd` from yarn or npm.

```bash
$ yarn add antd
```

Modify `src/App.js`, import Button component from `antd`.

```jsx
import React, { Component } from 'react';
import Button from 'antd/lib/button';
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

Ok, you should now see a blue primary button displayed on the page. Next you can choose any components of `antd` to develop your application. Visit other workflows of `create-react-app` at its [User Guide ](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Advanced Guides

We are successfully running antd components now but in the real world, there are still lots of problems about antd-demo.
For instance, we actually import all styles of components in the project which may be a network performance issue.

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
- import Button from 'antd/lib/button';
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

## eject

You can also could try [yarn run eject](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup)  for a custom setup of create-react-app, although you should dig into it by yourself.

## Source code and other boilerplates

Finally, we used antd with create-react-app successfully, you can learn these practices for your own webpack workflow too, and find more webpack configs in the [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js). (For instance, add [moment noParse](https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L90) to avoid loading all language files.)

There are a lot of great boilerplates like create-react-app in the React community. There are some source code samples of importing antd in them if you encounter some problems.

- [create-react-app-antd](https://github.com/ant-design/create-react-app-antd)
- [comerc/cra-ts-antd](https://github.com/comerc/cra-ts-antd)
- [react-boilerplate/react-boilerplate](https://github.com/ant-design/react-boilerplate)
- [kriasoft/react-starter-kit](https://github.com/ant-design/react-starter-kit)
- [next.js](https://github.com/zeit/next.js/tree/master/examples/with-ant-design)
- [nwb](https://github.com/insin/nwb-examples/tree/master/react-app-antd)
- [antd-react-scripts](https://github.com/minesaner/create-react-app/tree/antd/packages/react-scripts)
