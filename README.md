# Ant Design [![](https://travis-ci.org/ant-design/ant-design.svg)](https://travis-ci.org/ant-design/ant-design)

下一个设计&前端框架，基于 React 的企业级前端开发框架。

仍在紧密开发中，预计 8 月份推出 beta 版本。

![](https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg)


## 特性

- 丰富实用的 UI 组件。
- 基于 React 的组件化开发模式。
- 基于 webpack 的调试构建方案，支持 ES6。
- 背靠 npm 生态圈。
- 提炼于企业级金融产品的交互语言和视觉体系，使用 Sketch3 设计。

## 使用

1. script 直接引用 `dist/antd.js` `dist/antd.css`，通过全局变量 antd 使用。

2. npm

   `npm install antd` 后，使用示例：

   ```js
   require('antd/style/index.less');
   require('antd/lib/datepicker');
   ```

## 链接

- [首页](http://ant.design/)
- [使用文档](http://ant.design/docs/introduce)
- [组件](http://ant.design/components/)
- [React 模块](http://react-component.github.io/)


## 如何贡献

我们欢迎任何形式的贡献，有任何建议或意见您可以进行 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或者给我们[提问](https://github.com/ant-design/ant-design/issues)。


## 开发说明

#### 本地调试

```bash
$ npm start
```

然后访问 http://127.0.0.1:8000 。

#### 部署上线

```bash
$ npm run deploy
```

#### 构建

```bash
$ npm run build
```
