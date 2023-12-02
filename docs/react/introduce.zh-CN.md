---
order: 0
title: Ant Design of React
---

`antd` 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

<div class="pic-plus">
  <img width="150" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"/>
  <span>+</span>
  <img width="160" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
</div>

---

## ✨ 特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

## 兼容环境

- 现代浏览器
- 支持服务端渲染。
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) 来解决浏览器兼容问题。如果你在使用 [umi](http://umijs.org/)，可以直接使用 [targets](https://umijs.org/zh/config/#targets) 配置。

> `antd@2.0` 之后不再支持 IE8。 `antd@4.0` 之后不再支持 React 15 和 IE9/10。 `antd@5.0` 之后不再支持 IE。

## 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

你可以订阅：https://github.com/ant-design/ant-design/releases.atom 来获得版本发布的通知。

## 安装

### 使用 npm 或 yarn 或 pnpm 安装

**我们推荐使用 [npm](https://www.npmjs.com/) 或 [yarn](https://github.com/yarnpkg/yarn/) 或 [pnpm](https://pnpm.io/zh/) 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save'></InstallDependencies>

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 浏览器引入

在浏览器中使用 `script` 和 `link` 标签直接引入文件，并使用全局变量 `antd`。

我们在 npm 发布包内的 dist 目录下提供了 `antd.js`、`antd.min.js` 和 `reset.css`。你也可以通过 [![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd)，[![](https://data.jsdelivr.com/v1/package/npm/antd/badge)](https://www.jsdelivr.com/package/npm/antd) 或 [UNPKG](https://unpkg.com/antd/dist/) 进行下载。

> **强烈不推荐使用已构建文件**，这样无法按需加载，而且难以获得底层依赖模块的 bug 快速修复支持。

> 注意：`antd.js` 和 `antd.min.js` 依赖 `react`、`react-dom`、`dayjs`，请确保提前引入这些文件。

## 示例

```jsx
import React from 'react';
import { DatePicker } from 'antd';

const App = () => {
  return <DatePicker />;
};

export default App;
```

### 按需加载

`antd` 默认支持基于 ES modules 的 tree shaking。

### TypeScript

`antd` 使用 TypeScript 进行书写并提供了完整的定义文件（不要引用 `@types/antd`）。

## 链接

- [首页](/index-cn)
- [组件库](/components/overview-cn)
- [国内镜像](https://github.com/ant-design/ant-design/issues/25661)
- [Ant Design Pro](https://pro.ant.design/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Ant Design Charts](https://charts.ant.design)
- [更新日志](/changelog)
- [React 底层基础组件](https://react-component.github.io/)
- [移动端组件库](https://mobile.ant.design)
- [小程序组件库](https://mini.ant.design)
- [Ant Design 图标](https://github.com/ant-design/ant-design-icons)
- [Ant Design 色彩](https://github.com/ant-design/ant-design-colors)
- [首页模板集](https://landing.ant.design)
- [动效](https://motion.ant.design)
- [脚手架市场](https://scaffold.ant.design)
- [设计规范速查手册](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [常见问题](/docs/react/faq)
- [CodeSandbox 模板](https://u.ant.design/codesandbox-repro) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [定制主题](/docs/react/customize-theme)
- [成为社区协作成员](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## 谁在使用

- [蚂蚁集团](https://www.antgroup.com/)
- [阿里巴巴](https://www.alibaba.com/)
- [腾讯](https://www.tencent.com)
- [百度](https://www.baidu.com)
- [口碑](https://www.koubei.com/)
- [美团](https://www.meituan.com)
- [滴滴](https://www.xiaojukeji.com/)
- [饿了么](https://www.ele.me/)

> 如果你的公司和产品使用了 Ant Design，欢迎到 [这里](https://github.com/ant-design/ant-design/issues/477) 留言。

## 如何贡献

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)。如果你希望参与贡献，欢迎提交 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或给我们 [报告 Bug](http://new-issue.ant.design/)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 GitHub Discussions 提问时，建议使用 `Q&A` 标签。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `antd` 标签。

1. [GitHub Discussions](https://github.com/ant-design/ant-design/discussions)
2. [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](http://stackoverflow.com/questions/tagged/antd) (English)
3. [<img alt="Segment Fault" src="https://gw.alipayobjects.com/zos/rmsportal/hfYFfCvHTQTUKntlJbMF.svg" width="100" />](https://segmentfault.com/t/antd)（中文）
