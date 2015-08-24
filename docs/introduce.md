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
- 丰富实用的 React UI 组件。
- 基于 React 的组件化开发模式。
- 背靠 npm 生态圈。
- 基于 webpack 的调试构建方案，支持 ES6。

## 示例

```jsx
var antd = require('antd');
var Datepicker = antd.Datepicker;

React.render(<Datepicker />, mountNode);
```

## 版本

- 稳定版：<span class="versions" id="stable-version"></span>
- 开发版：<span class="versions" id="latest-version"></span>

<style>
.versions {
  font-weight: bold;
  color: #C05B4D;
  font-family: Consolas;
  margin-left: 0.3em;
  background: #FFF1E7;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>

<script>
$('#latest-version').html(antdVersion.latest);
$('#latest-links a').each(function(i, item) {
  $(item).attr('href', $(item).attr('href').replace('dist/antd', 'dist/antd-' + antdVersion.latest));
});

if (antdVersion.stable) {
  $('#stable-version').html(antdVersion.stable);
  $('#stable-link').attr('href', 'https://github.com/ant-design/ant-design/releases/tag/' + antdVersion.stable);
} else {
  $('#stable-version').html('暂无');
  $('#stable-link').hide();
}
</script>

## 链接

- [首页](http://ant.design/)
- [文档](http://ant.design/docs/introduce)
- [组件](http://ant.design/components/)
- [构建调试 antd-bin](https://github.com/ant-design/antd-bin)
- [开发计划](https://github.com/ant-design/ant-design/issues/9)
- [React 模块](http://react-component.github.io/)
- [React 代码规范](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-code-style.md)
- [组件设计原则](https://github.com/react-component/react-component.github.io/blob/master/docs/zh-cn/component-design.md)

## 谁在使用

- 蚂蚁金服

## 如何贡献

我们欢迎任何形式的贡献，有任何建议或意见您可以进行 [Pull Request](https://github.com/ant-design/ant-design/pulls)，或者给我们[提问](https://github.com/ant-design/ant-design/issues)。
