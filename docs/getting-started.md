# 快速上手

- category: 1
- order: 1

---

Ant Design React 致力于提供给程序员**愉悦**的开发体验。

## 第一个例子

最简单的试用方式参照以下 JSFiddle 演示, 也推荐 Fork 本例来进行 Bug Report, 注意不要在实际项目中这样使用。

- [antd JSFiddle](http://jsfiddle.net/yiminghe/9zrstuto/1/)


## 标准开发

实际项目开发中，你会需要对 ES2015 和 JSX 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们提供了一套 `npm` + `webpack` 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

### 1. 安装命令行工具

> 使用 `antd-init` 前，务必确认 [Node.js](https://nodejs.org/en/) 已经升级到 v4.x 或以上。

```bash
$ npm install antd-init -g
```

[更多使用说明](https://github.com/ant-tool/xtool/#使用说明)。

### 2. 创建一个项目

使用命令行进行初始化。

```bash
$ mkdir antd-demo && cd antd-demo
$ antd-init
$ npm install
```

若安装缓慢报错，可尝试用 `cnpm` 或别的镜像源自行安装：`rm -rf node_modules && cnpm install`.

### 3. 使用组件

编辑 `src/component/App.jsx`，用 React 的方式直接使用 Ant Design React 的组件。

```jsx
import React from 'react';
import { DatePicker, message } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      date: ''
    };
  },
  handleChange(value) {
    message.info('您选择的日期是: ' + value.toString());
    this.setState({
      date: value
    });
  },
  render() {
    return <div style={{width: 400, margin: '100px auto'}}>
      <DatePicker onSelect={this.handleChange} />
      <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
    </div>;
  }
});

export default App;
```

你可以在 [这里](/components/button) 选用更多组件。

### 4. 开发调试

一键启动调试，访问 http://127.0.0.1:8001 查看效果。

```bash
$ npm run dev
```

### 5. 构建和部署

```bash
$ npm run build
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

> 上述例子用于帮助你理解 Ant Design React 的使用流程，并非真实的开发过程，你可以根据自己的项目开发流程进行接入。

## 兼容性

Ant Design React 支持所有的现代浏览器和 IE8+。

对于 IE8，需要提供 [es5-shim](http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills) 等 Polyfills 的支持。

<div class="code-line-highlight"></div>

<style>
.code-line-highlight {
  box-shadow: 0px 196px 0px rgba(255, 207, 0, 0.16);
  height: 42px;
  margin-top: -42px;
  position: relative;
  z-index: 1;
}
</style>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="/index.css">
    <!-- Polyfills -->
    <script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.1.14/es5-shim.min.js,es5-shim/4.1.14/es5-sham.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>
  </head>
  <body>
  </body>
  <!-- 引入公用文件 -->
  <script src="/common.js"></script>
  <!-- 引入入口文件 -->
  <script src="/index.js"></script>
</html>
```

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](http://webpack.github.io/) 进行构建和调试，可以参考我们所使用的 [webpack 配置](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js)。

### 改变主色系

- [配置代码示例](https://github.com/ant-tool/xtool/tree/master/examples/customize-antd-theme)

## 小甜点

- 你可以享用 `npm` 生态圈里的所有模块。
- 我们使用了 `babel`，试试用 [ES6](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/) 的写法来提升编码的愉悦感。
