# Ant Design [![](https://img.shields.io/travis/ant-design/ant-design.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design) [![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd) [![Dependency Status](https://david-dm.org/ant-design/ant-design.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design)

An enterprise grade front-end development language and React-based implementation.

Design documents and component implementations are still being revised so several pages are not yet complete.  We are currently planning a release version for August.

![](https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg)

## Features

- An enterprise-grade graphical design language and framework for financial applications
- Rich library of React UI components.
- A Component development model based on React.
- Backed by the npm ecosystem.
- webpack-based debug builds supporting ES6


## Usage example

```jsx
var antd = require('antd');
var Datepicker = antd.Datepicker;

React.render(<Datepicker />, mountNode);
```

## Links

- [Home page](http://ant.design/)
- [Documentation](http://ant.design/docs/introduce)
- [Components](http://ant.design/components/)
- [Build/Debug tools](https://github.com/ant-design/antd-bin)
- [Roadmap](https://github.com/ant-design/ant-design/issues/9)
- [ChangeLog](CHANGELOG.md)
- [React modules](http://react-component.github.io/)
- [React style guide](https://github.com/react-component/react-component.github.io/blob/master/docs/en-US/component-code-style.md)
- [React component design guide](https://github.com/react-component/react-component.github.io/blob/master/docs/en-US/component-design.md)


## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/ant-design/ant-design/pulls) or as a [GitHub issue](https://github.com/ant-design/ant-design/issues).


## Development

#### Building locally

```bash
$ npm start
```

Then open `http://127.0.0.1:8000`.

#### [Website](http://ant.design) deployment

```bash
$ npm run deploy
```

#### Creating a release build

```bash
$ npm run release
```
