---
group:
  title: 如何使用
  order: 0
order: 0
title: 快速上手
---

Ant Design React 致力于提供给程序员**愉悦**的开发体验。

> 在开始之前，推荐先学习 [React](https://react.dev)，并正确安装和配置了 [Node.js](https://nodejs.org/) v16 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 React 全家桶的正确开发方式。如果你刚开始学习前端或者 React，将 UI 框架作为你的第一步可能不是最好的主意。

---

## 第一个例子

这是一个最简单的 Ant Design 组件的在线 codesandbox 演示。

```sandpack
const sandpackConfig = {
  autorun: true,
};

import React from 'react';
import { Button, Space, DatePicker, version } from 'antd';

const App = () => (
  <div style={{ padding: '0 24px' }}>
    <h1>antd version: {version}</h1>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
  </div>
);

export default App;
```

### 1. 创建一个 codesandbox

访问 https://u.ant.design/codesandbox-repro 创建一个 codesandbox 的在线示例，别忘了保存以创建一个新的实例。

### 2. 使用组件

直接用下面的代码替换 `index.js` 的内容，用 React 的方式直接使用 antd 组件。

```jsx
import React, { useState } from 'react';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from 'dayjs';
import { createRoot } from 'react-dom/client';

import 'dayjs/locale/zh-cn';

import zhCN from 'antd/locale/zh_CN';

import './index.css';

dayjs.locale('zh-cn');

const App = () => {
  const [date, setDate] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    messageApi.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
    setDate(value);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>
          当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
        </div>
      </div>
      {contextHolder}
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
```

### 3. 探索更多组件用法

你可以在组件页面的左侧菜单查看组件列表，比如 [Alert](/components/alert-cn) 组件，组件文档中提供了各类演示，最下方有组件 API 文档可以查阅。在代码演示部分找到第一个例子，点击右下角的图标展开代码。

然后依照演示代码的写法，在之前的 codesandbox 里修改 `index.js`，首先在 `import` 内引入 Alert 组件：

```diff
- import { ConfigProvider, DatePicker, message } from 'antd';
+ import { ConfigProvider, DatePicker, message, Alert } from 'antd';
```

然后在 `render` 内添加相应的 jsx 代码：

```diff
  <DatePicker onChange={value => this.handleChange(value)} />
  <div style={{ marginTop: 16 }}>
-   当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
+   <Alert message="当前日期" description={date ? date.format('YYYY年MM月DD日') : '未选择'} />
  </div>
```

选择一个日期，在右侧预览区就可以看到如图的效果。

<img width="420" src="https://gw.alipayobjects.com/zos/antfincdn/ZosQjL9pqe/e6179c89-21a9-44c9-aea4-3cc04af7ef25.png" alt="codesandbox screenshot" />

好的，现在你已经会使用基本的 antd 组件了，你可以在这个例子中继续探索其他组件的用法。如果你遇到组件的 bug，也推荐建一个可重现的 codesandbox 来报告 bug。

### 4. 下一步

在实际项目开发中，你会遇到构建、调试、代理、打包部署等一系列工程化的需求。你可以阅读后面的文档或者使用以下脚手架和范例：

- [Ant Design Pro](https://pro.ant.design/)
- [create-next-app](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style)
- 更多脚手架可以查看 [脚手架市场](https://scaffold.ant.design/)

## 按需加载

`antd` 默认支持基于 ES modules 的 tree shaking，直接引入 `import { Button } from 'antd';` 就会有按需加载的效果。

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](https://webpack.js.org) 或者 [vite](https://cn.vitejs.dev/) 进行构建和调试，可以使用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#react-tools) 进行开发。

目前社区也有很多基于 antd 定制的 [React 脚手架](https://scaffold.ant.design/)，欢迎进行试用和贡献。
