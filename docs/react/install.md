# 安装

- category: 2
- order: 2

---

## 使用 npm 安装

**我们推荐使用 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

可以通过 npm 直接安装到项目中，使用 `import` 或 `require` 进行引用。

稳定版：

[![npm package](http://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd --save
```

开发版本：

[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd@beta --save
```

> **历史版本**：https://github.com/ant-design/ant-design/releases


## 浏览器引入

官方目前不提供单独的构建文件，建议开发者自行构建 `antd.js` 和 `antd.css`。我们提供了一个 [构建的例子](https://github.com/ant-design/antd-init/tree/master/examples/build-antd-standalone) 以供参考。

## 开发工具

我们提供了 React 前端应用开发的 [脚手架工具](https://github.com/ant-design/antd-init)，可以安装到全局直接使用。

```bash
$ npm install antd-init -g
```

在空目录运行 `antd-init` 可以初始化一个 antd 的前端应用。

最新的脚手架结构可以到这里 [查看](https://github.com/ant-design/antd-init/tree/master/boilerplate)，建议持续关注更新以便获得最新的开发工程特性。

> 更多开发工具 [使用方式](http://ant-tool.github.io/)。
