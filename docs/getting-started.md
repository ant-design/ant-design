# 快速上手

- category: 1
- order: 1

---

Ant Design React 致力于提供给程序员愉悦的开发体验。

## 标准项目

实际项目开发中，你会需要 CommonJS 、JSX 构建、打包部署等一系列工程化的需求。
提供了一套 `npm` + `webpack` 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

### 1. 安装命令行工具

```bash
$ npm install antd-bin -g
```

[更多使用说明](https://github.com/ant-design/antd-bin#使用说明)。

### 2. 创建一个项目

使用命令行进行初始化。

```bash
$ mkdir antd-demo && cd antd-demo
$ antd init
$ npm install
```

### 3. 使用组件

编辑 `index.js`，使用 Ant Design React 的组件：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Datepicker, message } from 'antd';

var App = React.createClass({
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
      <Datepicker onSelect={this.handleChange} />
      <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
    </div>;
  }
});

ReactDOM.render(<App />, document.body);
```

> `var Datepicker = require('antd/lib/datepicker')` 单独引入需要的组件文件可以有效减少最终构建文件的大小。

> `lib` 即构建后的 `components` 目录。

然后建一个页面用于开发。

```bash
$ touch index.html
```

编辑 `index.html` 如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="/index.css">
  </head>
  <body>
  </body>
  <!-- 引入公用文件 -->
  <script src="/common.js"></script>
  <!-- 引入入口文件 -->
  <script src="/index.js"></script>
</html>
```

### 4. 开发调试

一键启动调试，访问 http://127.0.0.1:8000 查看效果。

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

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="http://ant.design/dist/antd.css">
    <!-- Polyfills -->
    <script src="https://a.alipayobjects.com/??es5-shim/4.1.10/es5-shim.min.js,es5-shim/4.1.10/es5-sham.min.js,html5shiv/3.7.2/src/html5shiv.js"></script>
  </head>
  <body>
  </body>
</html>
```

<div class="code-line-highlight"></div>

<style>
.code-line-highlight {
  box-shadow: 0 -197px 0 rgba(255, 207, 0, 0.16);
  height: 42px;
  margin-bottom: -42px;
}
</style>

## 小甜点

- 你可以享用 `npm` 生态圈里的所有模块。
- 我们使用了 `babel`，试试用 [ES6](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/) 的写法来提升编码的愉悦感。
