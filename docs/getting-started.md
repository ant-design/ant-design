# 快速上手

- category: 入门
- order: 1

---

Ant Design 致力于提供给用户愉悦的开发体验。

## 第一个例子

Ant Design 封装了一套基于 React 实现的 UI 组件，可以用 React 的方式直接使用。

下面有一个使用了 [日期选择](http://ant.design/components/datepicker) 组件的简单例子。

<iframe width="100%" height="400" src="//jsfiddle.net/afc163/6k22tgpx/embedded/result,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

源码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="http://ant.design/dist/antd.css">
    <!-- 引入 react 和 antd.js -->
    <script src="https://a.alipayobjects.com/??jquery/jquery/1.11.1/jquery.js,react/0.13.3/react.min.js,react/0.13.3/JSXTransformer.js"></script>
    <script src="http://ant.design/dist/antd.js"></script>
  </head>
  <body>
  </body>
  <!-- 直接调用全局变量 -->
  <script type="text/jsx">
    React.render(<antd.Datepicker />, document.body);
  </script>
</html>
```

你可以在 [这里](/components/progress/) 选用更多组件。


## 标准项目

实际项目开发中，你会需要 CommonJS 、JSX 构建、打包部署等一系列工程化的需求。
Ant Design 提供了一套 `npm` + `webpack` 的开发工具链来辅助开发，下面我们用一个简单的实例来说明。

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

编辑 `index.js`，使用 Ant Design 的组件：

```jsx
var antd = require('antd');
var Datepicker = antd.Datepicker;

var MyPage = React.creatClass({
  render() {
    return (<div>
      <Datepicker />
      <button className="ant-btn ant-btn-primary">确 定</button>
    </div>);
  }
});

React.render(<MyPage />, document.body);
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
    <script src="https://a.alipayobjects.com/react/0.13.3/react.min.js"></script>
  </head>
  <body>
  </body>
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

> 上述例子用于帮助你理解 Ant Design 的使用流程，并非真实的开发过程，你可以根据自己的项目开发流程进行接入。

## 兼容性

Ant Design 支持所有的现代浏览器和 IE8+。

对于 IE8，需要提供 [es5-shim](http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills) 等 Polyfills 的支持。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- 引入样式 -->
    <link rel="stylesheet" href="http://ant.design/dist/antd.css">
    <!-- 引入 jquery 和 react -->
    <script src="https://a.alipayobjects.com/??jquery/jquery/1.11.1/jquery.js,react/0.13.3/react.min.js"></script>
    <!-- Polyfills -->
    <script src="https://a.alipayobjects.com/react/0.13.3/??es5-shim/4.0.5/es5-shim.js,es5-shim/4.0.5/es5-sham.js,html5shiv/3.7.2/src/html5shiv.js"></script>
  </head>
  <body>
  </body>
</html>
```

<div class="code-line-highlight"></div>

<style>
.code-line-highlight {
  box-shadow: 0 -155px 0 rgba(255, 207, 0, 0.16);
  height: 42px;
  margin-bottom: -42px;
}
</style>

## 小甜点

- 你可以享用 `npm` 生态圈里的所有模块。
- 我们使用了 `babel`，试试用 [ES6](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/) 的写法来提升编码的愉悦感。
