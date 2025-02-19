<div align="center"><a name="readme-top"></a>

<img height="180" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">

<h1>Ant Design</h1>

一套企业级 UI 设计语言和 React 组件库。

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![][bundlephobia-image]][bundlephobia-url] [![][jsdelivr-image]][jsdelivr-url] [![FOSSA Status][fossa-image]][fossa-url]

[![Follow Twitter][twitter-image]][twitter-url] [![Renovate status][renovate-image]][renovate-dashboard-url] [![][issues-helper-image]][issues-helper-url] [![dumi][dumi-image]][dumi-url] [![Issues need help][help-wanted-image]][help-wanted-url]

[更新日志](./CHANGELOG.zh-CN.md) · [报告问题][github-issues-url] · [特性需求][github-issues-url] · [English](./README.md) · 中文

## ❤️ 赞助者 ![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen) ![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=72)](https://opencollective.com/ant-design/contribute/sponsors-218/checkout) [![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=72)](https://opencollective.com/ant-design/contribute/backers-217/checkout)

[npm-image]: https://img.shields.io/npm/v/antd.svg?style=flat-square
[npm-url]: https://npmjs.org/package/antd
[github-action-image]: https://github.com/ant-design/ant-design/actions/workflows/test.yml/badge.svg
[github-action-url]: https://github.com/ant-design/ant-design/actions/workflows/test.yml
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master
[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square
[download-url]: https://npmjs.org/package/antd
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fant-design%2Fant-design.svg?type=shield
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fant-design%2Fant-design?ref=badge_shield
[help-wanted-image]: https://flat.badgen.net/github/label-issues/ant-design/ant-design/help%20wanted/open
[help-wanted-url]: https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22
[twitter-image]: https://img.shields.io/twitter/follow/AntDesignUI.svg?label=Ant%20Design
[twitter-url]: https://twitter.com/AntDesignUI
[jsdelivr-image]: https://data.jsdelivr.com/v1/package/npm/antd/badge
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/antd
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/antd?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/antd
[issues-helper-image]: https://img.shields.io/badge/using-actions--cool-blue?style=flat-square
[issues-helper-url]: https://github.com/actions-cool
[renovate-image]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square
[renovate-dashboard-url]: https://github.com/ant-design/ant-design/issues/32498
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi
[github-issues-url]: https://new-issue.ant.design

</div>

[![](https://user-images.githubusercontent.com/507615/209472919-6f7e8561-be8c-4b0b-9976-eb3c692aa20a.png)](https://ant.design)

## ✨ 特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 应用开发框架和设计工具配套。
- 🌍 数十个国际化语言支持。
- 🎨 基于 CSS-in-JS 的主题定制能力。

## 🖥 兼容环境

支持范围：https://browsersl.ist/#q=defaults

- 现代浏览器。
- 支持服务端渲染。
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 安装

```bash
npm install antd --save
```

```bash
yarn add antd
```

```bash
pnpm add antd
```

## 🔨 示例

```tsx
import React from 'react';
import { Button, DatePicker } from 'antd';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker />
  </>
);

export default App;
```

### 🌈 定制主题

参考 [定制主题](https://ant.design/docs/react/customize-theme-cn) 文档。

### 🛡 TypeScript

`antd` 使用 TypeScript 编写，具有完整的类型定义，参考 [在 Next.js 中使用](https://ant.design/docs/react/use-with-next-cn)。

## 🌍 国际化

参考 [国际化文档](https://ant.design/docs/react/i18n-cn)。

## 🔗 链接

- [首页](https://ant.design/)
- [所有组件](https://ant.design/components/overview-cn)
- [更新日志](CHANGELOG.zh-CN.md)
- [React 底层基础组件](https://react-component.github.io/)
- [🆕 Ant Design X](https://x.ant.design/index-cn)
- [Ant Design Pro](https://pro.ant.design/)
- [Pro Components](https://procomponents.ant.design)
- [Ant Design Mobile](https://mobile.ant.design)
- [Ant Design Mini](https://mini.ant.design)
- [Ant Design Charts](https://charts.ant.design)
- [Ant Design Web3](https://web3.ant.design)
- [动效](https://motion.ant.design)
- [脚手架市场](https://scaffold.ant.design)
- [设计规范速查手册](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [常见问题](https://ant.design/docs/react/faq-cn)
- [在线演示](https://u.ant.design/reproduce)，用于报告 bug
- [定制主题](https://ant.design/docs/react/customize-theme-cn)
- [国际化](https://ant.design/docs/react/i18n-cn)
- [成为社区协作成员](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ 本地开发

推荐使用 [opensumi.run](https://opensumi.run) 进行在线开发：

[![opensumi.run](https://custom-icon-badges.demolab.com/badge/opensumi-run-blue.svg?logo=opensumi)](https://opensumi.run/ide/ant-design/ant-design)

或者克隆到本地开发:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:8001 ，更多[本地开发文档](https://github.com/ant-design/ant-design/wiki/Development)。

## 🤝 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

<table>
<tr>
  <td>
    <a href="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors?repo_id=34526884" target="_blank" style="display: block" align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors/thumbnail.png?repo_id=34526884&image_size=auto&color_scheme=dark" width="280">
        <img alt="Top Contributors of ant-design/ant-design - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors/thumbnail.png?repo_id=34526884&image_size=auto&color_scheme=light" width="280">
      </picture>
    </a>
  </td>
  <td rowspan="2">
    <a href="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats?repo_id=34526884" target="_blank" style="display: block" align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=34526884&image_size=auto&color_scheme=dark" width="655" height="auto">
        <img alt="Performance Stats of ant-design/ant-design - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-last-28-days-stats/thumbnail.png?repo_id=34526884&image_size=auto&color_scheme=light" width="655" height="auto">
      </picture>
    </a>
  </td>
</tr>
<tr>
  <td>
    <a href="https://next.ossinsight.io/widgets/official/compose-org-active-contributors?period=past_28_days&activity=new&owner_id=12101536&repo_ids=34526884" target="_blank" style="display: block" align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?period=past_28_days&activity=new&owner_id=12101536&repo_ids=34526884&image_size=2x3&color_scheme=dark" width="273" height="auto">
        <img alt="New participants of ant-design - past 28 days" src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?period=past_28_days&activity=new&owner_id=12101536&repo_ids=34526884&image_size=2x3&color_scheme=light" width="273" height="auto">
      </picture>
    </a>
  </td>
</tr>
</table>

请参考[贡献指南](https://ant.design/docs/react/contributing-cn).

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](https://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

[![赞助链接](https://raw.githubusercontent.com/BoostIO/issuehunt-materials/master/v1/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## 👥 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 GitHub Discussions 提问时，建议使用 `Q&A` 标签。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `antd` 标签。

1. [GitHub Discussions](https://github.com/ant-design/ant-design/discussions)
2. [Stack Overflow](https://stackoverflow.com/questions/tagged/antd)（英文）
3. [Segment Fault](https://segmentfault.com/t/antd)（中文）

## Issue 赞助

我们使用 [Polar.sh](https://polar.sh/ant-design) 和 [Issuehunt](https://issuehunt.io/repos/3452688) 来推动您希望看到的针对 antd 的修复和改进，请查看我们的赞助列表：

<a href="https://polar.sh/ant-design"><img src="https://polar.sh/embed/fund-our-backlog.svg?org=ant-design" /></a>

[![Let's fund issues in this repository](https://raw.githubusercontent.com/BoostIO/issuehunt-materials/master/v1/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)
