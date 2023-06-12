---
order: 4
title: 在 Next.js 中使用
---

[Next.js](https://nextjs.org/) 是目前世界上最流行的 React 服务端同构框架，本文会尝试在 Next.js 创建的工程中使用 `antd` 组件。

## 安装和初始化

在开始之前，你可能需要安装 [yarn](https://github.com/yarnpkg/yarn/) 或者 [pnpm](https://pnpm.io/zh/)。

<InstallDependencies npm='$ npx create-next-app antd-demo' yarn='$ yarn create next-app antd-demo' pnpm='$ pnpm create next-app antd-demo'></InstallDependencies>

工具会自动初始化一个脚手架并安装项目的各种必要依赖，在安装过程中，有一些配置项需要自行选择，如果在过程中出现网络问题，请尝试配置代理，或使用其他 npm registry。

初始化完成后，我们进入项目并启动。

```bash
$ cd antd-demo
$ npm run dev
```

此时使用浏览器访问 http://localhost:3000/ ，看到 NEXT 的 logo 就算成功了。

## 引入 antd

现在从 yarn 或 npm 安装并引入 antd。

```bash
$ npm install antd --save
```

修改 `src/app/page.tsx`，引入 antd 的按钮组件。

```jsx
import React from 'react';
import { Button } from 'antd';

const Home = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default Home;
```

好了，现在你应该能看到页面上已经有了 `antd` 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 Next.js 的[官方文档](https://nextjs.org/)。

我们现在已经把 antd 组件成功运行起来了，开始开发你的应用吧！
