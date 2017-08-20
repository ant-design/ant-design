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

An enterprise-class UI design language and React-based implementation.

[中文 README](README-zh_CN.md)

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

`antd` is an open source project; improvements are welcomed. If you are interested in contributing to `antd`, you can watch this repository, join in [discussion](https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3ADiscussion), or try to implement some [features which have been accepted](https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22PR+welcome%22). Actually, there are [many ways](https://opensource.guide/how-to-contribute/) to contribute. And we are always happy to [offer collaborator permission](https://github.com/ant-design/ant-design/issues/3222) for some active contributors.

## Install

```bash
npm install antd
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
> - Don't use @types/antd, antd provide a built-in ts definition already.

#### Use [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) with modularized antd

  ```js
  {
    loader: "ts-loader", // or awesome-typescript-loader
    options {
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({ libraryName: "antd", style: "css" }) ]
      })
    }
  }
  ```

## Internationalization

See [i18n](http://ant.design/docs/react/i18n).

## Links

- [Home page](http://ant.design/)
- [UI library](http://ant.design/docs/react/introduce)
- [Change Log](CHANGELOG.en-US.md)
- [Official Scaffold Tool](https://github.com/dvajs/dva-cli/)
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
