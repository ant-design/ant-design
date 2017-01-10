---
order: 1
title: 快速上手
---

Ant Design React 致力于提供给程序员**愉悦**的开发体验。

---

在开始之前，推荐先学习 [React](http://facebook.github.io/react/) 和 [ES2015](http://babeljs.io/docs/learn-es2015/)。

## 第一个例子

最简单的使用方式参照以下 CodePen 演示，也推荐 Fork 本例来进行 `Bug Report`，注意不要在实际项目中这样使用。

- [antd CodePen](http://codepen.io/benjycui/pen/KgPZrE?editors=001)

## 标准开发

实际项目开发中，你会需要对 ES2015 和 JSX 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们提供了一套 `npm` + `webpack` 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

### 1. 安装脚手架工具

> 使用 `antd-init` 前，务必确认 [Node.js](https://nodejs.org/en/) 已经升级到 v4.x 或以上。

```bash
$ npm install antd-init -g
```

更多功能请参考 [脚手架工具](https://github.com/ant-design/antd-init/) 和 [开发工具文档](http://ant-tool.github.io/)。

> 除了官方提供的脚手架，您也可以使用社区提供的脚手架和范例：
>
>   - [reactSPA](https://github.com/JasonBai007/reactSPA)
>   - [react-redux-antd by Justin-lu](https://github.com/Justin-lu/react-redux-antd)
>   - [react-redux-antd by okoala](https://github.com/okoala/react-redux-antd)
>   - [react-antd-admin](https://github.com/fireyy/react-antd-admin)
>   - [react-antd-redux-router-starter](https://github.com/yuzhouisme/react-antd-redux-router-starter)
>   - [react-redux-antd-starter](https://github.com/BetaRabbit/react-redux-antd-starter)
>   - [更多](https://github.com/ant-design/ant-design/issues/129)

### 2. 创建一个项目

使用命令行进行初始化。

```bash
$ mkdir antd-demo && cd antd-demo
$ antd-init
```

antd-init 会自动安装 npm 依赖，若有问题则可自行安装。

若安装缓慢报错，可尝试用 `cnpm` 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`。

### 3. 使用组件

脚手架会生成一个 Todo 应用实例（一个很有参考价值的 React 上手示例），先不管它，我们用来测试组件。

直接用下面的代码替换 `index.js` 的内容，用 React 的方式直接使用 antd 组件。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  handleChange(date) {
    message.info('您选择的日期是: ' + date.toString());
    this.setState({ date });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

> 你可以在左侧菜单选用更多组件。

### 4. 开发调试

一键启动调试，访问 http://127.0.0.1:8000 查看效果。

```bash
$ npm start
```

### 5. 构建和部署

```bash
$ npm run build
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

> 上述例子用于帮助你理解 Ant Design React 的使用流程，并非真实的开发过程，你可以根据自己的项目开发流程进行接入。

## 兼容性

Ant Design React 支持所有的现代浏览器和 IE9+。

对于 IE 系列浏览器，需要提供 [es5-shim](https://github.com/es-shims/es5-shim) 和 [es6-shim](https://github.com/paulmillr/es6-shim) 等 Polyfills 的支持。如果你使用了 babel，强烈推荐使用 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) 和 [babel-plugin-transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/)。

> 如果在 IE 浏览器中遇到 `startsWith` 的[问题](https://github.com/ant-design/ant-design/issues/3400#issuecomment-253181445)，请引入 [es6-shim](https://github.com/paulmillr/es6-shim) 或 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="/index.css">
    <!-- Polyfills -->
    <!--[if lt IE 10]>
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
    <![endif]-->
    <!--[if lte IE 11]>
    <script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>
    <![endif]-->
  </head>
  <body>
  </body>
  <!-- 引入公用文件 -->
  <script src="/common.js"></script>
  <!-- 引入入口文件 -->
  <script src="/index.js"></script>
</html>
```

#### IE8 note

> `antd@2.0` 之后将不再支持 IE8。

IE8 需要配合使用 [react@0.14.x](https://facebook.github.io/react/blog/2016/01/12/discontinuing-ie8-support.html) 版本。

另外，由于 `babel@6.x` 对 IE8 的支持不佳，你可能会遇到类似 [#28](https://github.com/ant-tool/atool-build/issues/28) 和 [#858](https://github.com/ant-design/ant-design/issues/858) 的 default 报错的问题，你也可以参照这个 [webpack 配置](https://github.com/ant-design/antd-init/blob/f5fb9479ca973fade51fd6754e50f8b3fafbb1df/boilerplate/webpack.config.js#L4-L8) 来解决。

> 更多 IE8 下使用 React 的相关问题可以参考：https://github.com/xcatliu/react-ie8

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](http://webpack.github.io/) 进行构建和调试。理论上你可以利用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#boilerplates) 进行开发，如果遇到问题可参考我们所使用的 [webpack 配置](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js) 进行 [定制](http://ant-tool.github.io/webpack-config.html)。

目前社区也有很多基于 antd 定制的 [脚手架](https://github.com/ant-design/ant-design/issues/129)，欢迎进行试用和贡献。

## 按需加载

如果你在控制台看到下面的提示，则你可能使用了 `import { Button } from 'antd';` 的写法引入了 antd 下所有的模块，这会影响应用的网络性能。

> ![](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)

可以通过以下的写法来按需加载组件。

```jsx
import Button from 'antd/lib/button';
import Button from 'antd/lib/button/style/css'; // 按需引入 css
```

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，加入这个插件后。你可以仍然这么写：

```jsx
import { Button } from 'antd';
```

插件会帮你转换成 `antd/lib/xxx` 的写法。另外此插件配合 [style](https://github.com/ant-design/babel-plugin-import#usage) 属性可以做到模块样式的按需自动加载。

## 配置主题和字体

- [改变主题](/docs/react/customize-theme)
- [使用本地字体](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)

## 小甜点

- 你可以享用 `npm` 生态圈里的所有模块。
- 我们使用了 `babel`，试试用 [ES2015](http://babeljs.io/blog/2015/06/07/react-on-es6-plus) 的写法来提升编码的愉悦感。
