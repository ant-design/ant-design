---
order: 0
title: Ant Design of React
---

<audio id="antd-audio">
  <source src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*ChCdRJ0w8SUAAAAAAAAAAAAADgCCAQ" type="audio/mpeg">
</audio>

Following the Ant Design specification, we developed a React UI library `antd` (<Audio id="antd-audio">Pronunciation</Audio>) that contains a set of high quality components and demos for building rich, interactive user interfaces.

<div class="pic-plus">
  <img width="150" draggable="false" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  <span>+</span>
  <img width="160" draggable="false" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
</div>

---

## ✨ Features

- 🌈 Enterprise-class UI designed for web applications.
- 📦 A set of high-quality React components out of the box.
- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.
- 🌍 Internationalization support for dozens of languages.
- 🎨 Powerful theme customization in every detail.

## Environment Support

- Modern browsers
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

Polyfills are needed for IE browsers. We recommend [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) for it. You can set `targets` config if you are using [umi](https://umijs.org/).

> Dropped support of IE8 after `antd@2.0`. Dropped support of React 15 and IE9/10 after `antd@4.0`. Dropped support of IE after `antd@5.0`.

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

You can subscribe to this feed for new version notifications: https://github.com/ant-design/ant-design/releases.atom

## Installation

### Using npm or yarn or pnpm or bun

**We recommend using [npm](https://www.npmjs.com/) or [yarn](https://github.com/yarnpkg/yarn/) or [pnpm](https://pnpm.io/) or [bun](https://bun.sh/) to install**, it not only makes development easier, but also allow you to take advantage of the rich ecosystem of Javascript packages and tooling.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

If you are in a bad network environment, you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

### Import in Browser

Add `script` and `link` tags in your browser and use the global variable `antd`.

We provide `antd.js` and `antd.min.js` `reset.css` under [dist](https://unpkg.com/browse/antd@5.0.0/dist/) folder in antd's npm package. You can also download these files directly from [![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd), [![](https://data.jsdelivr.com/v1/package/npm/antd/badge)](https://www.jsdelivr.com/package/npm/antd) or [unpkg](https://unpkg.com/antd/dist).

> **We strongly discourage loading the entire files** this will add bloat to your application and make it more difficult to receive bugfixes and updates. Antd is intended to be used in conjunction with a build tool, such as [webpack](https://webpack.github.io/), which will make it easy to import only the parts of antd that you are using.

> Note: You should import `react`、`react-dom`、`dayjs` before using `antd.js`.

## Usage

```jsx
import React from 'react';
import { DatePicker } from 'antd';

const App = () => {
  return <DatePicker />;
};

export default App;
```

### Use modularized antd

`antd` supports ES modules tree shaking by default.

### TypeScript

`antd` provides a built-in ts definition, don't install `@types/antd`.

## Links

- [Home page](/)
- [China Mirrors](https://github.com/ant-design/ant-design/issues/25661)
- [Components](/components/overview)
- [Change Log](/changelog)
- [rc-components](https://react-component.github.io/)
- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
- [Ant Design Colors](https://github.com/ant-design/ant-design-colors)
- [🆕 Ant Design X](https://x.ant.design/index-cn)
- [Ant Design Pro](https://pro.ant.design/)
- [Pro Components](https://procomponents.ant.design)
- [Ant Design Mobile](https://mobile.ant.design)
- [Ant Design Mini](https://mini.ant.design)
- [Ant Design Charts](https://charts.ant.design)
- [Ant Design Web3](https://web3.ant.design)
- [Landing Pages](https://landing.ant.design)
- [Ant Motion](https://motion.ant.design)
- [Scaffold Market](https://scaffold.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](/docs/react/faq)
- [CodeSandbox Template](https://u.ant.design/codesandbox-repro) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](/docs/react/customize-theme)
- [How to Apply for Being A Collaborator](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## Non-React Implementations

React is used to encapsulate a library of components which embody our design language. We welcome the community to implement our design system [in other front-end frameworks](/docs/spec/introduce#front-end-implementation) of their choice.

## Companies using antd

Ant Design is widely used for building enterprise-level websites both domestically and internationally. You can refer to wappalyzer for reference data. If your company or product uses Ant Design, let us know [here](https://github.com/ant-design/ant-design/issues/477)!

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first.

If you'd like to help us improve antd, just create a [Pull Request](https://github.com/ant-design/ant-design/pulls). Feel free to report bugs and issues [here](https://new-issue.ant.design/).

> If you're new to posting issues, we ask that you read [_How To Ask Questions The Smart Way_](https://www.catb.org/~esr/faqs/smart-questions.html) and [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](https://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## Need Help?

For questions on how to use antd, please post questions to [GitHub Discussions](https://github.com/ant-design/ant-design/discussions) using the `Q&A` tag or [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](https://stackoverflow.com/questions/tagged/antd) using the `antd` tag.

As always, we encourage experienced users to help those who are not familiar with `antd`!
