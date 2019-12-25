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
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';

moment.locale('zh-cn');

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({ date });
  };
  render() {
    const { date } = this.state;
    return (
      <ConfigProvider locale={zhCN}>
        <div style={{ width: 400, margin: '100px auto' }}>
          <DatePicker onChange={this.handleChange} />
          <div style={{ marginTop: 20 }}>
            当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
          </div>
        </div>
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 3. 探索更多组件用法

你可以在左侧菜单查看组件列表，比如 [Alert](/components/alert-cn) 组件，组件文档中提供了各类演示，最下方有组件 API 文档可以查阅。在代码演示部分找到第一个例子，点击右下角的图标展开代码。

然后依照演示代码的写法，在之前的 codesandbox 里修改 `index.js`，首先在 `import` 内引入 Alert 组件：

```diff
- import { ConfigProvider, DatePicker, message } from 'antd';
+ import { ConfigProvider, DatePicker, message, Alert } from 'antd';
```

然后在 `render` 内添加相应的 jsx 代码：

```diff
  <DatePicker onChange={value => this.handleChange(value)} />
  <div style={{ marginTop: 20 }}>
-   当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
+   <Alert message={`当前日期：${date ? date.format('YYYY-MM-DD') : '未选择'}`} type="success" />
  </div>
```

在右侧预览区就可以看到如图的效果。

<img width="420" src="https://gw.alipayobjects.com/zos/antfincdn/Up3%24VYhN0S/134614ee-7440-46f1-a797-fa6f6b3e300f.png" alt="codesandbox screenshot" />

好的，现在你已经会使用基本的 antd 组件了，你可以在这个例子中继续探索其他组件的用法。如果你遇到组件的 bug，也推荐建一个可重现的 codesandbox 来报告 bug。

### 4. 下一步

实际项目开发中，你会需要构建、调试、代理、打包部署等一系列工程化的需求。您可以阅读后面的文档或者使用以下脚手架和范例：

- [Ant Design Pro](http://pro.ant.design/)
- [antd-admin](https://github.com/zuiidea/antd-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- 更多脚手架可以查看 [脚手架市场](http://scaffold.ant.design/)

## 兼容性

Ant Design React 支持所有的现代浏览器和 IE11+。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) 来解决浏览器兼容问题。如果你在使用 [umi](http://umijs.org/)，可以直接使用 [targets](https://umijs.org/zh/config/#targets) 配置。

Ant Design 3.0 对 React 15/16 两个版本提供支持，但是我们强烈建议你升级到 React 16，以便获得更好的性能和遇到更少的问题。

#### IE note

> `antd@2.0` 之后将不再支持 IE8，`antd@4.0` 之后将不再支持 IE9/10。

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](http://webpack.github.io/) 进行构建和调试。理论上你可以利用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#boilerplates) 进行开发，如果遇到问题可参考我们所使用的 [webpack 配置](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js) 进行 [定制](http://ant-tool.github.io/webpack-config.html)。

如果你使用 [parcel](https://parceljs.org)，这里也有 [一个例子](https://github.com/ant-design/parcel-antd) 可以参考。

目前社区也有很多基于 antd 定制的 [脚手架](http://scaffold.ant.design/)，欢迎进行试用和贡献。

## 按需加载

如果你在开发环境的控制台看到下面的提示，那么你可能使用了 `import { Button } from 'antd';` 的写法引入了 antd 下所有的模块，这会影响应用的网络性能。

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.
```

> ![控制台警告](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

可以通过以下的写法来按需加载组件。

```jsx
import Button from 'antd/es/button';
import 'antd/es/button/style'; // 或者 antd/es/button/style/css 加载 css 文件
```

> 注意：antd 默认支持基于 ES module 的 tree shaking，对于 js 部分，直接引入 `import { Button } from 'antd'` 也会有按需加载的效果。

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：

```jsx
import { Button } from 'antd';
```

插件会帮你转换成 `antd/es/xxx` 的写法。另外此插件配合 [style](https://github.com/ant-design/babel-plugin-import#usage) 属性可以做到模块样式的按需自动加载。

> 注意，babel-plugin-import 的 `style` 属性除了引入对应组件的样式，也会引入一些必要的全局样式。如果你不需要它们，建议不要使用此属性。你可以 `import 'antd/dist/antd.css'` 手动引入，并覆盖全局样式。

## 使用 Day.js 替换 momentjs 优化打包大小

你可以使用 [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin) 插件用 Day.js 替换 momentjs 来大幅减小打包大小。这需要更新 webpack 的配置文件如下：

```js
// webpack-config.js
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

module.exports = {
  // ...
  plugins: [new AntdDayjsWebpackPlugin()],
};
```

## 配置主题和字体

- [改变主题](/docs/react/customize-theme)
- [使用本地字体](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)
