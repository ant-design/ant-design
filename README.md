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
[![NPM downloads](http://img.shields.io/npm/dm/antd.svg?style=flat-square)](https://npmjs.org/package/antd)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/ant-design/ant-design.svg)](http://isitmaintained.com/project/ant-design/ant-design "Percentage of issues still open")
[![Gitter](https://badges.gitter.im/ant-design/ant-design-english.svg)](https://gitter.im/ant-design/ant-design-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) (English)
[![Join the chat at https://gitter.im/ant-design/ant-design](https://img.shields.io/gitter/room/ant-design/ant-design.svg?style=flat-square)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)（中文）

An enterprise-class UI design language and React-based implementation.

[中文 README](README-zh_CN.md)

## 3.0 Released Now! :tada::tada::tada:

[Announcing Ant Design 3.0](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c)

## Features

- An enterprise-class UI design language for web applications.
- A set of high-quality React components out of the box.
- Written in TypeScript with complete define types.
- A npm + webpack + [dva](https://github.com/dvajs/dva) front-end development workflow.

## Environment Support

* Modern browsers and Internet Explorer 9+ (with [polyfills](https://ant.design/docs/react/getting-started#Compatibility))
* Server-side Rendering
* [Electron](http://electron.atom.io/)

## Let's build a better antd together [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Read our [contributing guide](./.github/CONTRIBUTING.md).

## Install

```bash
npm install antd --save
```

## Usage

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

And import style manually:

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

Or [import components on demand](https://ant.design/docs/react/getting-started#Import-on-Demand)

### TypeScript

See [Use in TypeScript](https://ant.design/docs/react/use-in-typescript)


## Internationalization

See [i18n](http://ant.design/docs/react/i18n).

## Links

- [Home page](http://ant.design/)
- [Components](http://ant.design/docs/react/introduce)
- [Ant Design Pro](http://pro.ant.design/)
- [Change Log](CHANGELOG.en-US.md)
- [Scaffold Market](http://scaffold.ant.design)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Motion](https://motion.ant.design)
- [Developer Instruction](https://github.com/ant-design/ant-design/wiki/Development)
- [Versioning Release Note](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodeSandbox Template](https://u.ant.design/codesandbox-repro) for bug reports
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](http://ant.design/docs/react/customize-theme)

## Development

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ npm install
$ npm start
```

Open your browser and visit http://127.0.0.1:8001 , see more at https://github.com/ant-design/ant-design/wiki/Development .

## Contributing

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/ant-design/ant-design/pulls) or as [GitHub issues](https://github.com/ant-design/ant-design/issues). If you'd like to improve code, check out the [Development Instructions](https://github.com/ant-design/ant-design/wiki/Development) and have a good time! :)
