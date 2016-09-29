---
order: 2
title: Installation
---

## Using npm to install

**We recommend using npm to install**，it not only makes development easier，but you can also take advantage of the whole ecosystem.


If using npm to install, you could use `import` or `require`.

Stable version：

[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd --save
```

You can Subscribe to this feed for new version notification: https://github.com/ant-design/ant-design/releases.atom


Beta version：

[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

```bash
$ npm install antd@beta --save
```

> **Past releases**：https://github.com/ant-design/ant-design/releases

## Import in Browser

We provide `antd.js` `antd.css` and `antd.min.js` `antd.min.css` under `antd/dist` in antd's npm package, in order to import all the components of antd directly. Also, you can use [unpkg](https://unpkg.com/).

> It's not recommended to use the already built files, as you cannot get bugfixes from the dependencies of antd.

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

> Here is an [example](https://github.com/ant-design/antd-init/tree/master/examples/build-antd-standalone) of how to build your own antd.js if you are using antd@<1.0.0.

## Development tool

We provide React components [Scaffold tool](https://github.com/ant-design/antd-init).

```bash
$ npm install antd-init -g
```

Inside an empty folder run `antd-init` to init.

You can explore the latest structure of scaffold [here](https://github.com/ant-design/antd-init/tree/master/boilerplates), it is a good habit to watch this repo to get the latest features.

> [More development tools](http://ant-tool.github.io/)。
