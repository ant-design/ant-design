---
order: 0
title: Ant Design of React
---

Following the Ant Design specification, we developed a React UI library `antd` that contains a set of high quality components and demos for building rich, interactive user interfaces.

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

## Features

- An enterprise-class UI design language for web applications.
- A set of high-quality React components out of the box.
- Written in TypeScript with complete defined types.
- A npm + webpack + [dva](https://github.com/dvajs/dva) front-end development workflow.

## Environment Support

* Modern browsers and Internet Explorer 9+
* Server-side Rendering
* [Electron](http://electron.atom.io/)

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- Beta: [![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

You can subscribe to this feed for new version notifications: https://github.com/ant-design/ant-design/releases.atom

## Installation

### Using npm or yarn

**We recommend using npm or yarn to install**，it not only makes development easier，but also allow you to take advantage of the rich ecosystem of javascript packages and tooling.

```bash
$ npm install antd --save
```

```bash
$ yarn add antd
```

If you are in a bad network environment，you can try other registries and tools like [cnpm](https://github.com/cnpm/cnpm).

### Import in Browser

Add `script` and `link` tags in your browser and use the global variable `antd`.

We provide `antd.js` `antd.css` and `antd.min.js` `antd.min.css` under `antd/dist` in antd's npm package. You can also download these files directly from [![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd) or [unpkg](https://unpkg.com/).

> **We strongly discourage loading these entire files** this will add bloat to your application and make it more difficult to receive bugfixes and updates. Ant is intended to be used in conjunction with a build tool, such as [webpack](https://webpack.github.io/), which will make it easy to import only the parts of antd that you are using.

## Usage

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

And import stylesheets manually:

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

### Use modularized antd

- Use [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) (Recommended)

   ```js
   // .babelrc or babel-loader option
   {
     "plugins": [
       ["import", { libraryName: "antd", style: "css" }] // `style: true` for less
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
   import DatePicker from 'antd/lib/date-picker';  // for js
   import 'antd/lib/date-picker/style/css';        // for css
   // import 'antd/lib/date-picker/style';         // that will import less
   ```

### TypeScript

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

> Note:
> - set `allowSyntheticDefaultImports` to prevent `error TS1192: Module 'react' has no default export`.
> - Don't use @types/antd, antd provides a built-in ts definition already.

## Links

- [Home Page](http://ant.design/)
- [UI library](/docs/react/introduce)
- [Change Log](/changelog)
- [Offcial Scaffold Tool](https://github.com/dvajs/dva-cli/)
- [Development Tool](http://ant-tool.github.io/)
- [Scaffold Market](http://scaffold.ant.design)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Motion](https://motion.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen boilerplate](http://codepen.io/benjycui/pen/KgPZrE?editors=001) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](/docs/react/customize-theme)

## Companies using antd

- [Ant Financial](http://www.antgroup.com/index.htm?locale=en_US)
- [Alibaba](http://www.alibaba.com/)
- [Koubei](http://www.koubei.com/)
- [Meituan](http://www.meituan.com)
- [Didi](http://www.xiaojukeji.com/)

> If your company or product uses Ant Design, let us know [here](https://github.com/ant-design/ant-design/issues/477)!

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first.

If you'd like to help us improve antd, just create a [Pull Request](https://github.com/ant-design/ant-design/pulls). Feel free to report bugs and issues [here](http://new-issue.ant.design/).

> If you're new to posting issues, we ask that you read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) and [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

## Need Help?

For questions on how to use antd, please post questions to [stackoverflow](http://stackoverflow.com/questions/tagged/antd) using the `antd` tag. If you're not finding what you need on stackoverflow, you can find us on [gitter](https://gitter.im/ant-design/ant-design-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) as well.

As always, we encourage experienced users to help those who are not familiar with `antd`!
