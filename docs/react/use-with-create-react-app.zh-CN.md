---
order: 4
title: 在 create-react-app 中使用
---

[create-react-app](https://github.com/facebookincubator/create-react-app) 是业界最优秀的 React 应用开发工具之一，本文会尝试在 create-react-app 创建的工程中使用 antd 组件，并自定义 webpack 的配置以满足各类工程化需求。

---

## 安装和初始化

我们需要在命令行中安装 create-react-app 工具，你可能还需要安装 [yarn](https://github.com/yarnpkg/yarn/)。

```bash
$ npm install -g create-react-app yarn
```

然后新建一个项目。

```bash
$ create-react-app antd-demo
```

工具会自动初始化一个脚手架并安装 React 项目的各种必要依赖，如果在过程中出现网络问题，请尝试配置代理或使用其他 npm registry。

然后我们进入项目并启动。

```bash
$ cd antd-demo
$ yarn start
```

此时浏览器会访问 http://localhost:3000/ ，看到 `Welcome to React` 的界面就算成功了。

## 引入 antd

这是 create-react-app 生成的默认目录结构。

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

现在从 yarn 或 npm 安装并引入 antd。

```bash
$ yarn add antd
```

修改 `src/App.js`，引入 antd 的按钮组件。

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

修改 `src/App.css`，在文件顶部引入 `antd/dist/antd.css`。

```css
@import '~antd/dist/antd.css';

.App {
  text-align: center;
}

...
```

好了，现在你应该能看到页面上已经有了 antd 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 create-react-app 的[官方文档](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)。

## 高级配置

我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。

此时我们可能需要对 create-react-app 的默认配置进行自定义。可以使用 `eject` 命令将所有内建的配置暴露出来。

```bash
$ yarn run eject
```

### 使用 babel-plugin-import

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](/docs/react/getting-started#按需加载)），现在我们尝试安装它并修改 `config/webpack.config.dev.js` 文件。

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

> 注意，由于 create-react-app eject 之后的配置中没有 `.babelrc` 文件，所以需要把配置放到 `webpack.config.js` 或 `package.json` 的 `babel` 属性中。


然后移除前面在 `src/App.css` 里全量添加的 `@import '~antd/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

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

最后重启 `yarn start` 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的[警告信息](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)。关于按需加载的原理和其他方式可以阅读[这里](/docs/react/getting-started#Import-on-Demand).

### 自定义主题

按照 [配置主题](/docs/react/customize-theme) 的要求，自定义主题需要用到 less 变量覆盖功能，因此首先我们需要引入 [less-loader](https://github.com/webpack/less-loader) 来加载 less 样式，同时修改 `config/webpack.config.dev.js` 文件。

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

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，
变量和其他配置方式可以参考 [配置主题](/docs/react/customize-theme) 文档。

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

> 注意，上述示例只修改了 `webpack.config.dev.js`，如果需要在生产环境生效，你需要同步修改 `webpack.config.prod.js`。

## 源码和其他脚手架

以上是在 create-react-app 中使用 antd 的相关实践，你也可以借鉴此文的做法在自己的 webpack 工作流中使用 antd，更多 webpack 配置可参考 [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js)。（例如加入 [moment noParse](https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L90) 避免加载所有语言文件）

React 生态圈中还有很多优秀的脚手架，使用它们并引入 antd 时，你可能会遇到一些问题，下面是一些著名脚手架使用 antd 的范例，包括本文的 create-react-app。

- [react-boilerplate/react-boilerplate](https://github.com/ant-design/react-boilerplate)
- [kriasoft/react-starter-kit](https://github.com/ant-design/react-starter-kit)
- [create-react-app-antd](https://github.com/ant-design/create-react-app-antd)
