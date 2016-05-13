<p align="center">
  <a href="http://ant.design">
    <img width="320" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
  </a>
</p>

# Ant Design [![](https://img.shields.io/travis/ant-design/ant-design.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design) [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd) [![NPM downloads](http://img.shields.io/npm/dm/antd.svg?style=flat-square)](https://npmjs.org/package/antd) [![Dependency Status](https://david-dm.org/ant-design/ant-design.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design) [![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An enterprise-class UI design language and React-based implementation.

## Features

- An enterprise-class design language and high quality UI style.
- Rich library of UI components base on [React Component](http://react-component.github.io/badgeboard/).
- A npm + webpack + babel + dora [workflow](http://ant-tool.github.io/index.html).

## Install

```bash
npm install antd
```

## Usage example

### Use prebuilt bundle

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

Import style:

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

### Use modularized antd

```jsx
import DatePicker from 'antd/lib/date-picker';  // just for js
```

We recommend use [babel-plugin-antd](https://github.com/ant-design/babel-plugin-antd) with config:

```js
['antd', {
  style: 'css'
}]
```

```jsx
import { DatePicker } from 'antd'; // automatically parse and require js and css modularly
```

No need to import style manually.

## Browser Support

Normal browsers and Internet Explorer 8+.

> [IE8 issues](https://github.com/xcatliu/react-ie8)

## TypeScript

```js
///<reference path='./node_modules/antd/type-definitions/antd.d.ts'/>
...
```

## Links

- [Home page](http://ant.design/)
- [React UI page](http://ant.design/#/docs/react/introduce)
- [ChangeLog](CHANGELOG.md)
- [Scaffold tool](https://github.com/ant-design/antd-init/)
- [Development tool](http://ant-tool.github.io/)
- [React components](http://react-component.github.io/)
- [React style guide](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-code-style.md)
- [React component design guide](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-design.md)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)


## Contributing

We welcome all contributions, please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/ant-design/ant-design/pulls) or as a [GitHub issue](https://github.com/ant-design/ant-design/issues). If you'd like to improve code, check out the [Development Instruction](https://github.com/ant-design/ant-design/wiki/Development) and have a good time! :)
