---
order: 2
title: 快速上手
---

Ant Design React 致力于提供给程序员**愉悦**的开发体验。

> 在开始之前，推荐先学习 [React](http://reactjs.org) 和 [ES2015](http://babeljs.io/docs/learn-es2015/)，并正确安装和配置了 [Node.js](https://nodejs.org/) v8 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 React 全家桶的正确开发方式。如果你刚开始学习前端或者 React，将 UI 框架作为你的第一步可能不是最好的主意。

---

## 第一个例子

这是一个最简单的 Ant Design 组件的在线 codesandbox 演示。

<iframe
  src="https://codesandbox.io/embed/antd-reproduction-template-6e93z?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="antd reproduction template"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>

### 1. 创建一个 codesandbox

访问 http://u.ant.design/codesandbox-repro 创建一个 codesandbox 的在线示例，别忘了保存以创建一个新的实例。

### 2. 使用组件

直接用下面的代码替换 `index.js` 的内容，用 React 的方式直接使用 antd 组件。

```jsx
import React, { useState } from 'react';
import { render } from 'react-dom';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

dayjs.locale('zh-cn');

const App = () => {
  const [date, setDate] = useState(null);
  const handleChange = value => {
    message.info(`您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`);
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
    </ConfigProvider>
  );
};

render(<App />, document.getElementById('root'));
```

### 3. 探索更多组件用法

你可以在组件页面的左侧菜单查看组件列表，比如 [Alert](/components/alert) 组件，组件文档中提供了各类演示，最下方有组件 API 文档可以查阅。在代码演示部分找到第一个例子，点击右下角的图标展开代码。

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

实际项目开发中，你会需要构建、调试、代理、打包部署等一系列工程化的需求。您可以阅读后面的文档或者使用以下脚手架和范例：

- [Ant Design Pro](http://pro.ant.design/)
- [antd-admin](https://github.com/zuiidea/antd-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- 更多脚手架可以查看 [脚手架市场](http://scaffold.ant.design/)

## 按需加载

`antd` 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 `import { Button } from 'antd'` 就会有按需加载的效果。

如果你在开发环境的控制台看到下面的提示，那么你可能还在使用 `webpack@1.x` 或者 tree shaking 失效，请升级或检查相关配置。

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

![控制台警告](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](https://webpack.github.io/) 进行构建和调试，可以使用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#react-tools) 进行开发。

目前社区也有很多基于 antd 定制的 [React 脚手架](http://scaffold.ant.design/)，欢迎进行试用和贡献。
