---
group:
  title: 如何使用
order: 3
title: 在 Vite 中使用
---

[Vite](https://cn.vitejs.dev/) 是业界最优秀的 React 应用开发工具之一，本文会尝试在 Vite 创建的工程中使用 `antd` 组件，并自定义 Vite 的配置以满足各类工程化需求。

## 安装和初始化

在开始之前，你可能需要安装 [yarn](https://github.com/yarnpkg/yarn/) 或者 [pnpm](https://pnpm.io/zh/)。

<InstallDependencies npm='$ npm create vite antd-demo' yarn='$ yarn create vite antd-demo' pnpm='$ pnpm create vite antd-demo'></InstallDependencies>

工具会自动初始化一个脚手架并安装 React 项目的各种必要依赖，如果在过程中出现网络问题，请尝试配置代理，或使用其他 npm registry。

然后我们进入项目安装依赖并启动。

```bash
$ cd antd-demo
$ npm install
$ npm run dev
```

此时使用浏览器访问 http://localhost:5173/ ，看到 `Vite + React` 的界面就算成功了。

## 引入 antd

这是 vite 生成的默认目录结构。

```
├── public
│   └── vite.svg
├── src
│   └── assets
│       └── react.svg
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── main.js
│   └── logo.svg
├── index.html
├── package.json
└── vite.config.js
```

现在从 yarn 或 npm 或 pnpm 安装并引入 antd。

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save'></InstallDependencies>

修改 `src/App.js`，引入 antd 的按钮组件。

```jsx
import React from 'react';
import { Button } from 'antd';

const App = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

好了，现在你应该能看到页面上已经有了 `antd` 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 Vite 的[官方文档](https://cn.vitejs.dev/)。

我们现在已经把 antd 组件成功运行起来了，开始开发你的应用吧！
