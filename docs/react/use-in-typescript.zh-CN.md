---
order: 4
title: 在 TypeScript 中使用
---

使用 `create-react-app` 一步步地创建一个 TypeScript 项目，并引入 antd。

---

## 安装和初始化

请确保电脑上已经安装了最新版的 [yarn](https://yarnpkg.com) 或者 [npm](https://www.npmjs.com/)。

使用 yarn 创建项目。

```bash
$ yarn create react-app antd-demo-ts --scripts-version=react-scripts-ts
```

如果你使用的是 npm（接下来我们都会用 yarn 作为例子，如果你习惯用 npm 也没问题）。

```bash
$ npm install -g create-react-app
$ create-react-app antd-demo-ts --scripts-version=react-scripts-ts
```

然后我们进入项目并启动。

```bash
$ cd antd-demo-ts
$ yarn start
```

此时浏览器会访问 http://localhost:3000/ ，看到 `Welcome to React` 的界面就算成功了。

## 引入 antd

```bash
$ yarn add antd
```

修改 `src/App.tsx`，引入 antd 的按钮组件。

```jsx
import * as React from 'react';
import Button from 'antd/lib/button';
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

修改 `src/App.css` 引入 antd 的样式。

```css
@import '~antd/dist/antd.css';

.App {
  text-align: center;
}

...
```

重新启动 `yarn start`，现在你应该能看到页面上已经有了 antd 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 create-react-app 的[官方文档](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)。

## 高级配置

我们现在已经把组件成功运行起来了，但是在实际开发过程中还有很多问题，例如上面的例子实际上加载了全部的 antd 组件的样式（对前端性能是个隐患）。

此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) （一个对 create-react-app 进行自定义配置的社区解决方案）。

引入 react-app-rewired 并修改 package.json 里的启动配置。

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

然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

```js
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```

### 使用 ts-import-plugin

[ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 是一个用于按需加载组件代码和样式的 TypeScript 插件（[原理](/docs/react/getting-started#按需加载)），现在我们尝试安装它并修改 `config-overrides.js` 文件。

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

然后移除前面在 `src/App.css` 里全量添加的 `@import '~antd/dist/antd.css';` 样式代码，并且按下面的格式引入模块。

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

最后重启 `yarn start` 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的[警告信息](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)。关于按需加载的原理和其他方式可以阅读[这里](/docs/react/getting-started#按需加载)。

### 自定义主题

按照 [配置主题](/docs/react/customize-theme) 的要求，自定义主题需要用到 less 变量覆盖功能。我们可以引入 react-app-rewire 的 less 插件 [react-app-rewire-less](http://npmjs.com/react-app-rewire-less) 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件。

```bash
$ yarn add react-app-rewire-less --dev
```

```diff
  const tsImportPluginFactory = require('ts-import-plugin')
  const { getLoader } = require("react-app-rewired");
+ const rewireLess = require('react-app-rewire-less');

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

这里利用了 [less-loader](https://github.com/webpack/less-loader#less-options) 的 `modifyVars` 来进行主题配置，
变量和其他配置方式可以参考 [配置主题](/docs/react/customize-theme) 文档。

修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

## 其他方案

你也可以根据 [在 create-react-app 中使用](/docs/react/use-with-create-react-app.zh-CN.md) 的介绍使用 [react-app-rewire-typescript][https://github.com/lwd-technology/react-app-rewire-typescript] 自己来配置 TypeScript 的开发环境。

此外，还可以选择 [react-scripts-ts-antd](https://www.npmjs.com/package/react-scripts-ts-antd)，其中已经配置好了 ts-import-plugin、react-app-rewired、scss、less 等常用功能。只需一条命令即可生成一个免配置的 TypeScript 项目.
```bash
$ create-react-app my-project --scripts-version=react-scripts-ts-antd
```

## 常见问题

### error TS2605: JSX element type Xxx is not a constructor function for JSX elements.

antd 3 以前的版本需要在 tsconfig.json 的 `compilerOptions` 中配置 `"allowSyntheticDefaultImports": true`。
