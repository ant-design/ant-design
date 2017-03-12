---
order: 0
title: Ant Design of React
---

Following Ant Design specification, We develop a React UI library `antd` that contains a set of high quality components and demos for building rich interactive desktop applications.

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
- Written in TypeScript with complete define types.
- A npm + webpack + [dva](https://github.com/dvajs/dva) front-end development workflow.

## Compatibility

Modern browsers and IE9+.

> [Read more about compatibility](/docs/react/getting-started#Compatibility)

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- Beta: [![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

You can subscribe to this feed for new version notification: https://github.com/ant-design/ant-design/releases.atom

## Installation

### Using npm or yarn

**We recommend using npm or yarn to install**，it not only makes development easier，but you can also take advantage of the whole ecosystem.

```bash
$ npm install antd --save
```

```bash
$ yarn add antd
```

If you are in a bad network enviornment，you can try other registers and tools like [cnpm](https://github.com/cnpm/cnpm).

### Import in Browser

Add `script` and `link` tag in your browser and use global variable `antd`.

We provide `antd.js` `antd.css` and `antd.min.js` `antd.min.css` under `antd/dist` in antd's npm package. Also you can download from [![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd) or [unpkg](https://unpkg.com/).

> **We are strongly not recommended to use these built files**, that make you import all components with large size, and you cannot get bugfixes from the dependencies of antd.

## Usage

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

And import style manually:

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

   Then you can import components from antd, equivalent to import manually below.

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

 > Note: set `allowSyntheticDefaultImports` to prevent `error TS1192: Module 'react' has no default export`.

 > Note: Don't use @types/antd, antd provide a built-in ts definition already.

## Links

- [Home Page](http://ant.design/)
- [UI library](/docs/react/introduce)
- [Change Log](/changelog)
- [Scaffold tool](https://github.com/dvajs/dva-cli/)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Motion](https://motion.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [Boilerplates](https://github.com/ant-design/ant-design/issues/129)
- [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen boilerplate](http://codepen.io/benjycui/pen/KgPZrE?editors=001) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](/docs/react/customize-theme)

## Who are using antd

- [Ant Financial](http://www.antgroup.com/index.htm?locale=en_US)
- [Alibaba](http://www.alibaba.com/)
- [Koubei](http://www.koubei.com/)
- [Meituan](http://www.meituan.com)
- [Didi](http://www.xiaojukeji.com/)

> If your company or product uses Ant Design, you are welcome to comment in [this issue](https://github.com/ant-design/ant-design/issues/477). Thank you!

## Contributing

Please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first.

If you have any idea to improve antd, just create a [Pull Request](https://github.com/ant-design/ant-design/pulls). Also, you can also [issue](https://github.com/ant-design/ant-design/issues/new) bugs.

> Recommend to read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) and [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html), a smart question will get right answer quickly.

## Need Help?

You can ask questions while you meet problem through the following ways.
And we encourage experienced users to help those who are not familiar with `antd`.

We recommend to tag your questions with `antd` on Stack Overflow.

1. [Stack Overflow](http://stackoverflow.com/questions/tagged/antd)(Recommended)
2. [![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
