---
order: 0
title: Ant Design of React
---

这里是 Ant Design 的 React 实现，开发和服务于企业级后台产品。

<div class="pic-plus">
  <img width="150" src="https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg">
  <span>+</span>
  <img width="160" src="https://t.alipayobjects.com/images/rmsweb/T16xRhXkxbXXXXXXXX.svg">
</div>

<style>
.pic-plus > * {
  display: inline-block!important;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>

---

## 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 React 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。

## 浏览器支持

现代浏览器和 IE9 及以上。

> [更多兼容性信息](/docs/react/getting-started#兼容性)

## 版本

- 稳定版：[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- 开发版：[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

你可以订阅：https://github.com/ant-design/ant-design/releases.atom 来获得稳定版发布的通知。

## 安装

### 使用 npm 安装

**我们推荐使用 npm 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

可以通过 npm 直接安装到项目中，使用 `import` 或 `require` 进行引用。

稳定版：

```bash
$ npm install antd --save
```

开发版本：

```bash
$ npm install antd@beta --save
```

### 浏览器引入

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

## 示例

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

引入样式：

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

以下两种方法都可以达到按需加载的目的：

- `import DatePicker from 'antd/lib/date-picker'`
- 配合插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 使用 `import { DatePicker } from 'antd';`

> babel-plugin-import 支持 js 和 css 同时按需加载。

## 链接

- [首页](http://ant.design/)
- [组件文档](/docs/react/introduce)
- [更新日志](/changelog)
- [开发脚手架](https://github.com/dvajs/dva-cli/)
- [开发工具文档](http://ant-tool.github.io/)
- [React 基础组件](http://react-component.github.io/)
- [移动端组件](http://mobile.ant.design)
- [动效](https://motion.ant.design)
- [设计规范速查手册](https://os.alipayobjects.com/rmsportal/HTXUgPGkyyxEivE.png)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [社区贡献脚手架和范例](https://github.com/ant-design/ant-design/issues/129)
- [常见问题](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen 模板](http://codepen.io/benjycui/pen/KgPZrE?editors=001) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [定制主题](/docs/react/customize-theme)

## 谁在使用

- [蚂蚁金服](http://www.antgroup.com/)
- [阿里巴巴](http://www.alibaba.com/)
- [口碑](http://www.koubei.com/)
- [美团](http://www.meituan.com)
- [滴滴](http://www.xiaojukeji.com/)

> 如果你的公司和产品使用了 Ant Design，欢迎到 [这里](https://github.com/ant-design/ant-design/issues/477) 留言。

## 如何贡献

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)。有任何建议或意见您可以 [Pull Request](https://github.com/ant-design/ant-design/pulls)，给我们 [报告 Bug](https://github.com/ant-design/ant-design/issues/new)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)，更好的问题更容易获得帮助。

## 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `antd` 标签。

1. [Stack Overflow](http://stackoverflow.com/questions/tagged/antd)（英文）
2. [Segment Fault](https://segmentfault.com/t/antd)（中文）
3. [![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
