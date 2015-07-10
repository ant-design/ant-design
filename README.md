# Ant Design [![](https://travis-ci.org/ant-design/ant-design.svg)](https://travis-ci.org/ant-design/ant-design) [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

一套企业级的前端设计语言和基于 React 的实现。

仍在紧密开发中，预计 8 月份推出 beta 版本。

![](https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg)


## 特性

- 企业级金融产品的交互语言和视觉体系。
- 丰富实用的 React UI 组件。
- 基于 React 的组件化开发模式。
- 背靠 npm 生态圈。
- 基于 webpack 的调试构建方案，支持 ES6。


## 范例

```jsx
var antd = require('antd');
var Datepicker = antd.Datepicker;

React.render(<Datepicker />, mountNode);
```

## 链接

- [首页](http://ant.design/)
- [文档](http://ant.design/docs/introduce)
- [组件](http://ant.design/components/)
- [发布计划](https://github.com/ant-design/ant-design/issues/9)
- [React 模块](http://react-component.github.io/)
- [React 代码规范](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-code-style.md)
- [组件设计原则](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-design.md)


## 如何贡献

我们欢迎任何形式的贡献，有任何建议或意见您可以进行 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或者给我们[提问](https://github.com/ant-design/ant-design/issues)。


## 开发说明

#### 本地调试

```bash
$ npm start
```

然后访问 http://127.0.0.1:8000 。

#### 部署到 ant.design

```bash
$ npm run deploy
```

#### 构建

```bash
$ npm run build
```
