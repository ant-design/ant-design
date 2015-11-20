# Ant Design of React

- category: 0
- order: 0

---

这里是 Ant Design 的 React 实现，开发和服务于企业级后台产品。

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


## 特性

- Designed as Ant Design.
- [React Component](http://react-component.github.io/badgeboard/) 上二次封装的丰富实用的 UI 组件。
- 基于 React 的组件化开发模式。
- 背靠 npm 生态圈。
- 基于 webpack 的调试构建方案，支持 ES6。


## 示例

```jsx
import { Datepicker } from 'antd';
ReactDOM.render(<Datepicker />, mountNode);
```

或者按需加载：

```jsx
import Datepicker from 'antd/lib/datepicker';
ReactDOM.render(<Datepicker />, mountNode);
```

```jsx
import 'antd/lib/index.css'; // 样式需要在入口处引用一次
```

## 版本

- 稳定版：[![npm package](http://img.shields.io/npm/v/antd.svg?style=flat-square)](https://www.npmjs.org/package/antd)
- 开发版：[![](https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm)](https://www.npmjs.org/package/antd)

## 浏览器支持

现代浏览器和 IE8 及以上。

## 链接

- [首页](http://ant.design/)
- [文档和组件](http://ant.design/docs/introduce)
- [构建调试工具](https://github.com/ant-design/antd-bin)
- [开发计划](https://github.com/ant-design/ant-design/issues/9)
- [React 模块](http://react-component.github.io/)
- [React 代码规范](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-code-style.md)
- [组件设计原则](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-design.md)

## 谁在使用

- 蚂蚁金服

> 如果你的公司和产品使用了 Ant Design，欢迎到 [这里](https://github.com/ant-design/ant-design/issues/477) 留言。

## 如何贡献

我们欢迎任何形式的贡献，有任何建议或意见您可以进行 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或者给我们[提问](https://github.com/ant-design/ant-design/issues)。
