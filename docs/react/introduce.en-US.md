---
order: 0
title: Ant Design of React
---

Following the Ant Design specification, we developed a React UI library `antd` that contains a set of high quality components and demos for building rich, interactive user interfaces.

<div class="pic-plus">
  <img width="150" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  <span>+</span>
 <img width="160" src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
</div>

<style>
.pic-plus > * {
  display: inline-block !important;
  vertical-align: middle;
}
.pic-plus span {
  font-size: 30px;
  color: #aaa;
  margin: 0 20px;
}
</style>

---

## ✨ Features

- 🌈 Enterprise-class UI designed for web applications.
- 📦 A set of high-quality React components out of the box.
- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.
- 🌍 Internationalization support for dozens of languages.
- 🎨 Powerful theme customization in every detail.

## Environment Support

- Modern browsers and Internet Explorer 11+ (with [polyfills](https://ant.design/docs/react/getting-started#Compatibility))
- Server-side Rendering
- [Electron](http://electron.atom.io/)

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)

You can subscribe to this feed for new version notifications: https://github.com/ant-design/ant-design/releases.atom

## Installation

### Using npm or yarn

**We recommend using npm or yarn to install**, it not only makes development easier, but also allow you to take advantage of the rich ecosystem of Javascript packages and tooling.

```bash
$ npm install antd
```

```bash
$ yarn add antd
```

If you are in a bad network environment, you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

### Import in Browser

Add `script` and `link` tags in your browser and use the global variable `antd`.

We provide `antd.js` `antd.css` and `antd.min.js` `antd.min.css` under `antd/dist` in antd's npm package. You can also download these files directly from [![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd), [![](https://data.jsdelivr.com/v1/package/npm/antd/badge)](https://www.jsdelivr.com/package/npm/antd) or [unpkg](https://unpkg.com/antd/dist).

> **We strongly discourage loading the entire files** this will add bloat to your application and make it more difficult to receive bugfixes and updates. Antd is intended to be used in conjunction with a build tool, such as [webpack](https://webpack.github.io/), which will make it easy to import only the parts of antd that you are using.

> Note: you should import moment before using antd.js after `3.0`.

## Usage

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

And import stylesheets manually:

```jsx
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

### Use modularized antd

> Note: antd support ES6 tree shaking by default even without the below plugin.

- Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (Recommended)

  ```js
  // .babelrc or babel-loader option
  {
    "plugins": [
      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` for less
    ]
  }
  ```

  This allows you to import components from antd without having to manually import the corresponding stylesheet. The antd babel plugin will automatically import stylesheets.

  ```jsx
  // import js and css modularly, parsed by babel-plugin-import
  import { DatePicker } from 'antd';
  ```

- Manually import

  ```jsx
  import DatePicker from 'antd/es/date-picker'; // for js
  import 'antd/es/date-picker/style/css'; // for css
  // import 'antd/es/date-picker/style';         // that will import less
  ```

### TypeScript

- Don't use @types/antd, as antd provides a built-in ts definition already.

## Links

- [Home page](https://ant.design/)
- [Components](/docs/react/introduce)
- [Ant Design Pro](https://pro.ant.design/)
- [Change Log](/changelog)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
- [Ant Design Colors](https://github.com/ant-design/ant-design-colors)
- [Ant Design Pro Layout](https://github.com/ant-design/ant-design-pro-layout)
- [Ant Design Pro Blocks](https://github.com/ant-design/pro-blocks)
- [Dark Theme](https://github.com/ant-design/ant-design-dark-theme)
- [Landing Pages](https://landing.ant.design)
- [Motion](https://motion.ant.design)
- [Scaffold Market](http://scaffold.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](/docs/react/faq)
- [CodeSandbox Template](https://u.ant.design/codesandbox-repro) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](/docs/react/customize-theme)

## Companies using antd

- [Ant Financial](http://www.antfin.com/index.htm?locale=en_US)
- [Alibaba](http://www.alibaba.com/)
- [Tencent](http://www.tencent.com)
- [Baidu](http://www.baidu.com)
- [Koubei](http://www.koubei.com/)
- [Meituan](http://www.meituan.com)
- [Didi](http://www.xiaojukeji.com/)
- [Eleme](https://www.ele.me/)

> If your company or product uses Ant Design, let us know [here](https://github.com/ant-design/ant-design/issues/477)!

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first.

If you'd like to help us improve antd, just create a [Pull Request](https://github.com/ant-design/ant-design/pulls). Feel free to report bugs and issues [here](http://new-issue.ant.design/).

> If you're new to posting issues, we ask that you read [_How To Ask Questions The Smart Way_](http://www.catb.org/~esr/faqs/smart-questions.html) and [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## Need Help?

For questions on how to use antd, please post questions to [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](http://stackoverflow.com/questions/tagged/antd) using the `antd` tag. If you're not finding what you need on stackoverflow, you can find us on [![Gitter](https://badges.gitter.im/ant-design/ant-design-english.svg)](https://gitter.im/ant-design/ant-design-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) as well.

As always, we encourage experienced users to help those who are not familiar with `antd`!
