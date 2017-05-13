<p align="center">
  <a href="http://ant.design">
    <img width="320" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
  </a>
</p>

# Ant Design

[![](https://img.shields.io/travis/ant-design/ant-design.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design)
[![Codecov](https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square)](https://codecov.io/gh/ant-design/ant-design/branch/master)
[![Dependency Status](https://img.shields.io/gemnasium/react-component/trigger.svg?style=flat-square)](https://gemnasium.com/ant-design/ant-design)

[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
[![NPM downloads](http://img.shields.io/npm/dm/antd.svg?style=flat-square)](https://npmjs.org/package/antd)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/ant-design/ant-design.svg)](http://isitmaintained.com/project/ant-design/ant-design "Percentage of issues still open")
[![Gitter](https://badges.gitter.im/ant-design/ant-design-english.svg)](https://gitter.im/ant-design/ant-design-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) (English)
[![Join the chat at https://gitter.im/ant-design/ant-design](https://img.shields.io/gitter/room/ant-design/ant-design.svg?style=flat-square)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)（中文）

一套企业级的 UI 设计语言和 React 实现。

[README in English](README.md)

## 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 React 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 基于 npm + webpack + [dva](https://github.com/dvajs/dva) 的企业级开发框架。

## 支持环境

* 现代浏览器和 IE9 及以上。
* 支持服务端渲染。
* [Electron](http://electron.atom.io/)

## 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

`antd` 是一个开源项目，我们欢迎社区参与共建。如果你对此项目感兴趣，有 [很多方式](https://opensource.guide/how-to-contribute/) 进行参与。你可以 watch 这个仓库，加入 [issue 中的讨论](https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3ADiscussion)，以及尝试实现一些 [已接受的特性](https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22PR+welcome%22)。我们会给予有活跃贡献的社区成员 [collaborator 权限](https://github.com/ant-design/ant-design/issues/3222)。

## 安装

```bash
npm install antd
```

## 示例

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

引入样式：

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

按需加载可通过此写法 `import DatePicker from 'antd/lib/date-picker'` 或使用插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)。

## TypeScript

```js
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true
  }
}
```

> 注意：
> - 设置 `allowSyntheticDefaultImports` 避免 `error TS1192: Module 'react' has no default export` 的错误。
> - 不要使用 @types/antd, antd 已经自带了 TypeScript 定义。

## 国际化

参考 [国际化文档](http://ant.design/docs/react/i18n)。

## 链接

- [首页](http://ant.design/index-cn)
- [UI 组件库](http://ant.design/docs/react/introduce-cn)
- [更新日志](CHANGELOG.en-US.md)
- [官方脚手架](https://github.com/dvajs/dva-cli)
- [开发工具文档](http://ant-tool.github.io/)
- [脚手架市场](http://scaffold.ant.design)
- [React 底层基础组件](http://react-component.github.io/)
- [移动端组件](http://mobile.ant.design)
- [动效](https://motion.ant.design)
- [设计规范速查手册](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [常见问题](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen 模板](http://codepen.io/benjycui/pen/KgPZrE?editors=001) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [定制主题](http://ant.design/docs/react/customize-theme-cn)

## 本地开发

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:8001 ，更多本地开发文档参见: https://github.com/ant-design/ant-design/wiki/Development 。

## 如何贡献

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或给我们 [报告 Bug](http://new-issue.ant.design/)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)，更好的问题更容易获得帮助。

## 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `antd` 标签。

1. [Stack Overflow](http://stackoverflow.com/questions/tagged/antd)（英文）
2. [Segment Fault](https://segmentfault.com/t/antd)（中文）
3. [![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
