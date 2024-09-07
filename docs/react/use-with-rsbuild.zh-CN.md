---
group:
  title: 如何使用
order: 5
title: 在 Rsbuild 中使用
tag: New
---

[Rsbuild](https://rsbuild.dev/zh) 由 Rspack 驱动的构建工具，本文会尝试使用 `Rsbuild` 创建一个项目，并引入 antd。

## 安装和初始化

在开始之前，你可能需要安装 [yarn](https://github.com/yarnpkg/yarn) 或者 [pnpm](https://pnpm.io/zh) 或者 [bun](https://bun.sh)。

<InstallDependencies npm='$ npm create rsbuild' yarn='$ yarn create rsbuild' pnpm='$ pnpm create rsbuild' bun='$ bun create rsbuild'></InstallDependencies>

在初始化的过程中，`create-rsbuild` 提供了一系列模板供我们选择，这里我们选择 `React` 模板。

工具会自动初始化一个脚手架并安装 React 项目的各种必要依赖，如果在过程中出现网络问题，请尝试配置代理或使用其他 npm registry。

然后我们进入项目并启动。

```bash
$ cd demo
$ npm run dev
```

此时访问浏览器 http://localhost:3000 ，看到 `Rsbuild with React` 的界面就算成功了。

## 引入 antd

现在从 yarn 或 npm 或 pnpm 或 bun 安装并引入 antd。

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

修改 `src/App.tsx`，引入 antd 的 Button 组件。

```tsx
import React from 'react';
import { Button } from 'antd';

const App: React.FC = () => (
  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

export default App;
```

好了，现在你应该能看到页面上已经有了 antd 的蓝色按钮组件，接下来就可以继续选用其他组件开发应用了。其它开发流程你可以参考 Rsbuild 的[官方文档](https://rsbuild.dev/zh)。

### 自定义主题

参考 [配置主题](/docs/react/customize-theme)，通过 ConfigProvider 进行主题配置：

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
    <MyApp />
  </ConfigProvider>
);

export default App;
```

我们现在已经把 antd 组件成功使用 Rsbuild 运行起来了，开始开发你的应用吧！
