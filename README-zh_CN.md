<p align="center">
  <a href="http://ant.design">
    <img width="320" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg">
  </a>
</p>

# Ant Design
[![](https://img.shields.io/travis/ant-design/ant-design.svg?style=flat-square)](https://travis-ci.org/ant-design/ant-design)
[![npm package](https://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
[![NPM downloads](http://img.shields.io/npm/dm/antd.svg?style=flat-square)](https://npmjs.org/package/antd)
[![CDNJS](https://img.shields.io/cdnjs/v/antd.svg?style=flat-square)](https://cdnjs.com/libraries/antd)
[![Dependency Status](https://david-dm.org/ant-design/ant-design.svg?style=flat-square)](https://david-dm.org/ant-design/ant-design)
[![Join the chat at https://gitter.im/ant-design/ant-design](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ant-design/ant-design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

一套企业级的 UI 设计语言和 React 实现。

## 特性

- 提炼和服务企业级中后台产品的交互语言和视觉风格。
- [React Component](http://react-component.github.io/badgeboard/) 基础上精心封装的高质量 UI 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 基于 npm + webpack + babel + [dora](https://github.com/dora-js/dora) + [dva](https://github.com/dvajs/dva) 的企业级业务开发框架。

## 安装

```bash
npm install antd
```

## 示例

```jsx
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

引入样式：

```jsx
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
```

按需加载可通过此写法 `import DatePicker from 'antd/lib/date-picker'` 或使用插件 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)。


## 浏览器支持

现代浏览器和 IE9 及以上。

> [IE8 issues](https://github.com/xcatliu/react-ie8)

## TypeScript

tsconfig.json

```
{
  "compilerOptions": {
    "moduleResolution": "node",
    "jsx": "preserve",
    "allowSyntheticDefaultImports": true
  }
}
```

## 链接

- [首页](http://ant.design/)
- [React 实现](http://ant.design/docs/react/introduce)
- [修改记录](CHANGELOG.zh-CN.md)
- [开发脚手架](https://github.com/ant-design/antd-init/)
- [开发工具文档](http://ant-tool.github.io/)
- [React 基础组件](http://react-component.github.io/)
- [移动端组件](http://mobile.ant.design)
- [React 代码规范](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-code-style.md)
- [组件设计原则](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-design.md)
- [网站和组件开发说明](https://github.com/ant-design/ant-design/wiki/%E7%BD%91%E7%AB%99%E5%92%8C%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91%E8%AF%B4%E6%98%8E)
- [版本发布手册](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [社区贡献脚手架和范例](https://github.com/ant-design/ant-design/issues/129)
- [常见问题](https://github.com/ant-design/ant-design/wiki/FAQ)
- [CodePen 模板](http://codepen.io/benjycui/pen/KgPZrE?editors=001)
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)

## 如何贡献

我们欢迎任何形式的贡献，有任何建议或意见您可以进行 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或者给我们 [提问](https://github.com/ant-design/ant-design/issues)。
