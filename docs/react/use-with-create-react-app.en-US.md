---
order: 4
title: Use in create-react-app
---

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of the best React application development tools. We are going to use `antd` within it and modify the webpack config for some customized needs.

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

Ok, you now see a blue primary button displaying on the page. Next you can choose any components of `antd` to develop your application. Visit other workflow of `create-react-app` at its [User Guide ](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Advanced Guides

We are successfully running antd components now but in the real world, there are still lots of problems about antd-demo.
For instance, we actually import all styles of components in the project which maybe a network perfermance issue.

Sometimes it could be necessary to customize the default webpack config. We can achieve that by using `eject` script command.

```bash
$ yarn run eject
```

### Use babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is a babel plugin for importing components on demand ([principle](/docs/react/getting-started#Import-on-Demand)). After ejecting all config files of antd-demo, we are now allowed to install it and modify `config/webpack.config.dev.js`.

```bash
$ yarn add babel-plugin-import --dev
```

```diff
// Process JS with Babel.
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
+   plugins: [
+     ['import', { libraryName: 'antd', style: 'css' }],
+   ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true
  }
},
```

> Note: Because there is no `.babelrc` file after the config eject, we have to put the babel option into `webpack.config.js` or `babel` field of `package.json`.

Remove the `@import '~antd/dist/antd.css';` statement added before because `babel-plugin-import` will import styles and import components like below:

```diff
  // scr/App.js
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

Then reboot `yarn start` and visit demo page, you should not find any [warning message](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png) in the console which prove that the `import on demand` config is working now. You will find more info about it in [this guide](/docs/react/getting-started#Import-on-Demand).

### Customize Theme

According to [Customize Theme documentation](/docs/react/customize-theme), we need `less` variables modify ability of [less-loader](https://github.com/webpack/less-loader), so we add it.

```bash
$ yarn add less less-loader --dev
```

```diff
  {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
      /\.css$/,
+     /\.less$/,
      /\.json$/,
      /\.bmp$/,
      /\.gif$/,
      /\.jpe?g$/,
      /\.png$/,
    ],
    loader: require.resolve('file-loader'),
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  }

...

  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: 'babel',
    options: {
      plugins: [
-       ['import', [{ libraryName: 'antd', style: 'css' }]],
+       ['import', [{ libraryName: 'antd', style: true }]],  // import less
      ],
   },

...

+  // Parse less files and modify variables
+  {
+    test: /\.less$/,
+    use: [
+      require.resolve('style-loader'),
+      require.resolve('css-loader'),
+      {
+        loader: require.resolve('postcss-loader'),
+        options: {
+          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
+          plugins: () => [
+            require('postcss-flexbugs-fixes'),
+            autoprefixer({
+              browsers: [
+                '>1%',
+                'last 4 versions',
+                'Firefox ESR',
+                'not ie < 9', // React doesn't support IE8 anyway
+              ],
+              flexbox: 'no-2009',
+            }),
+          ],
+        },
+      },
+      {
+        loader: require.resolve('less-loader'),
+        options: {
+          modifyVars: { "@primary-color": "#1DA57A" },
+        },
+      },
+    ],
+  },
],
```

We use `modifyVars` option of [less-loader](https://github.com/webpack/less-loader#less-options) here, you can see a green button rendered on the page after reboot start server.

> Note, we only modified `webpack.config.dev.js` now, if you wish this config working on production environment, you need to update `webpack.config.prod.js` as well.

## Source code and other boilerplates

Finally, we used antd with create-react-app successfully, you can learn these practice for your own webpack workflow too, and find more webpack configs in the [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js). (For instance, add [moment noParse](https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L90) to avoid loading all language files)

There are a lot of great boilerplates like create-react-app in React community. There are some source code samples of importing antd in them if you encounter some problems.

- [create-react-app-antd](https://github.com/ant-design/create-react-app-antd)
- [react-boilerplate/react-boilerplate](https://github.com/ant-design/react-boilerplate)
- [kriasoft/react-starter-kit](https://github.com/ant-design/react-starter-kit)
