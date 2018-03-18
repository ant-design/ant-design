<p align="center">
  <a href="http://ant.design">
    <img width="230" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

# Ant Design

[![](https://img.shields.io/travis/ant-design/ant-design.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design)
[![Codecov](https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square)](https://codecov.io/gh/ant-design/ant-design/branch/master)
[![Dependency Status](https://img.shields.io/gemnasium/react-component/trigger.svg?style=flat-square)](https://gemnasium.com/ant-design/ant-design)

[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
[![NPM downloads](http://img.shields.io/npm/dm/antd.svg?style=flat-square)](http://www.npmtrends.com/antd)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/ant-design/ant-design.svg)](http://isitmaintained.com/project/ant-design/ant-design "Percentage of issues still open")
[![Gitter](https://badges.gitter.im/ant-design/ant-design-english.svg)](https://gitter.im/ant-design/ant-design-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) (English)
[![Join the chat at https://gitter.im/ant-design/ant-design](https://img.shields.io/gitter/room/ant-design/ant-design.svg?style=flat-square)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)（中文）

一套企业级的 UI 设计语言和 React 实现。

[README in English](README.md)

## 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 React 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 全链路开发和设计工具体系。

## 支持环境

* 现代浏览器和 IE9 及以上。
* 支持服务端渲染。
* [Electron](http://electron.atom.io/)

## 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

请参考[贡献指南](https://ant.design/docs/react/contributing-cn).

## 安装

```bash
npm install antd --save
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

你也可以[按需加载组件](https://ant.design/docs/react/getting-started-cn#按需加载)。

## TypeScript

参考 [在 TypeScript 中使用](https://ant.design/docs/react/use-in-typescript-cn)

## 国际化

参考 [国际化文档](http://ant.design/docs/react/i18n-cn)。

## 链接

- [首页](http://ant.design/)
- [组件库](http://ant.design/docs/react/introduce)
- [Ant Design Pro](http://pro.ant.design/)
- [更新日志](CHANGELOG.en-US.md)
- [脚手架市场](http://scaffold.ant.design)
- [React 底层基础组件](http://react-component.github.io/)
- [移动端组件](http://mobile.ant.design)
- [动效](https://motion.ant.design)
- [设计规范速查手册](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [常见问题](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodeSandbox 模板](https://u.ant.design/codesandbox-repro) for bug reports
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

阅读我们的[贡献指南](./.github/CONTRIBUTING.md).

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `antd` 标签。

1. [Stack Overflow](http://stackoverflow.com/questions/tagged/antd)（英文）
2. [Segment Fault](https://segmentfault.com/t/antd)（中文）
3. [![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
