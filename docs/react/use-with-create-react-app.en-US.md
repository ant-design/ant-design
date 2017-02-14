---
order: 4
title: Use in create-react-app
---

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of best React application development tool, we are going to use `antd` within it and modify the webpack config for some customized needs.

---

## Install and Initialization

We need to install `create-react-app` first, you may need install [yarn](https://github.com/yarnpkg/yarn/) too.

```bash
$ npm install -g create-react-app yarn
```

Create a new project named `antd-demo`.

```bash
$ create-react-app antd-demo
```

The tool will create and initialize environment and dependencies automaticly,
please try config your proxy setting or use other npm registry if any network errors happen during it.

Then we go inside `antd-demo` and start it.

```bash
$ cd antd-demo
$ yarn start
```

Open browser at http://localhost:3000/, it renders a header saying "Welcome to React" on the page.

## Import antd

It is the default directory structure below.

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
$ yarn add antd --save
```

Modify `src/App.js`, import Button component from `antd`.

```jsx
import React, { Component } from 'react';
import { Button } from 'antd';
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

Ok, you now see a blue primary button displaying in page now, next you can choose any components of `antd` to develop your application. Visit other workflow of `create-react-app` at its [User Guide ](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Advanced Guides

We are successd to run antd components now, but in the real world, there are still lots of problems about antd-demo.
For instance, we actully import all components in the project which will be a serious network perfermance issue.

> You will see a warning in your browser console.
> ![](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)

So it is necessary to customize the default webpack config. We can achieve that by using `eject` script command.

```bash
$ yarn run eject
```

### Import on demand

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is a babel plugin for importing components on demand ([principle](/docs/react/getting-started#Import-on-Demand)). After eject all config files to antd-demo, we allowed to install it and modify `config/webpack.config.dev.js` now.

```bash
$ yarn add babel-plugin-import --save-dev
```

```diff
// Process JS with Babel.
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: 'babel',
  query: {
+   plugins: [
+     ['import', [{ libraryName: "antd", style: 'css' }]],
+   ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true
  }
},
```

> Note: because there is no `.babelrc` file after config eject, so we have to put the babel option into `webpack.config.js` or `babel` field of `package.json`.

Remove the `@import '~antd/dist/antd.css';` statement added before because `babel-plugin-import` will import styles.

Then reboot `yarn start` and visit demo page, you should find that the above warning message would be gone which prove the `import on demand` config is effective now.

### Customize Theme

According to [Customize Theme documentation](/docs/react/customize-theme), we need `less` variables modify ability of [less-loader](https://github.com/webpack/less-loader), so we add it.

```bash
$ yarn add less less-loader --save-dev
```

```diff
loaders: [
  {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
+     /\.less$/,
      /\.css$/,
      /\.json$/,
      /\.svg$/
    ],
    loader: 'url',
  },

...

  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: 'babel',
    query: {
      plugins: [
-       ['import', [{ libraryName: "antd", style: 'css' }]],
+       ['import', [{ libraryName: "antd", style: true }]],  // import less
      ],
   },

...

+ // Parse less files and modify variables
+ {
+   test: /\.less$/,
+   loader: 'style!css!postcss!less?{modifyVars:{"@primary-color":"#1DA57A"}}'
+ },
]
```

We use `modifyVars` option of [less-loader](https://github.com/webpack/less-loader#less-options) here, you can see a green button rendered on the page after reboot start server.

---

Finally, we use antd with create-react-app successfully, you can learn these practice for your own webpack workflow too, and find more webpack config in the [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js). (For instance, add [moment noParse](https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L90) to avoid loading all language files)

Source code about this article：https://github.com/ant-design/create-react-app-antd
