---
order: 0
title: Ant Design of React
---

We supply a react implementation `antd` following Ant Design specification, which is designed to help in developing RIA such as dashboards or other enterprise-like complex UI needs.

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

- Following Ant Design, a design language for creating user friendly and beautiful websites.
- It is a set of high quality UI components and based on [React Component](http://react-component.github.io/badgeboard/).
- Provides a work flow which is based on npm, webpack, and babel, supporting ES2015 and TypeScript.

## Installation

```bash
$ npm install antd --save
```

## Usage

### Use prebuilt bundle

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
   // .babelrc
   {
     "plugins": [["import", { libraryName: "antd", style: "css" }]]
   }
   ```

   Then you can import components from antd directly.

   ```jsx
   // import js and css modularly, parsed by babel-plugin-import
   import { DatePicker } from 'antd';
   ```

- Manually import

   ```jsx
   import DatePicker from 'antd/lib/date-picker';  // just for js
   import 'antd/lib/date-picker/style/css';  // with style
   ```

## Version

- Stable: [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- Beta: [![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

## Compatibility

Modern browsers and IE9+.

> [IE8 issues](https://github.com/xcatliu/react-ie8)

## Useful Links

- [Home page](http://ant.design/)
- [UI library](http://ant.design/docs/react/introduce)
- [Change Log](https://ant.design/changelog)
- [Scaffold tool](https://github.com/dvajs/dva-cli/)
- [Development tool](http://ant-tool.github.io/)
- [React components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Motion](https://motion.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [Boilerplates](https://github.com/ant-design/ant-design/issues/129)
- [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen boilerplate](http://codepen.io/benjycui/pen/KgPZrE?editors=001) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](https://github.com/ant-design/antd-init/tree/master/examples/customize-antd-theme)

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
