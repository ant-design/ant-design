---
order: 2
title: 安装
---

## 使用 npm 安装

**我们推荐使用 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

可以通过 npm 直接安装到项目中，使用 `import` 或 `require` 进行引用。

稳定版：

[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd --save
```

你可以订阅：https://github.com/ant-design/ant-design/releases.atom 来获得稳定版发布的通知。

开发版本：

[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd@beta --save
```

## 浏览器引入

[![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd)

我们在 npm 发布包内的 `antd/dist` 目录下提供了 `antd.js` `antd.css` 以及 `antd.min.js` `antd.min.css` 用于一次性引入所有的 antd 组件，也可以通过 [UNPKG](https://unpkg.com/) 进行下载。

> 不推荐使用构建文件，因为难以获得底层依赖模块的 bug 快速修复支持。

#### stable

- https://unpkg.com/antd/dist/antd.js
- https://unpkg.com/antd/dist/antd.css
- https://unpkg.com/antd/dist/antd.min.js
- https://unpkg.com/antd/dist/antd.min.css

#### beta

- https://unpkg.com/antd@beta/dist/antd.js
- https://unpkg.com/antd@beta/dist/antd.css
- https://unpkg.com/antd@beta/dist/antd.min.js
- https://unpkg.com/antd@beta/dist/antd.min.css

> 对于 1.0 之前的版本，这里有一个 [自行构建的例子](https://github.com/ant-design/antd-init/tree/master/examples/build-antd-standalone) 以供参考。

## 开发工具

我们提供了 React 前端应用开发的 [脚手架工具](https://github.com/ant-design/antd-init)，可以安装到全局直接使用。

```bash
$ npm install antd-init -g
```

在空目录运行 `antd-init` 可以初始化一个 antd 的前端应用。

最新的脚手架结构可以到这里 [查看](https://github.com/ant-design/antd-init/tree/master/boilerplates)，建议持续关注更新以便获得最新的开发工程特性。

> 更多开发工具 [使用方式](http://ant-tool.github.io/)。
