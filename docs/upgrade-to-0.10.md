# 0.10 升级指南

- category: 3
- order: 3

---

`0.10.0` 版本有大量改动，是一个不完全向下兼容的版本。以下文档尽力列出了 `0.9.x` 到 `0.10.0` 的不兼容变动，以帮助开发者升级。

- `0.10.x` 文档：http://ant.design
- `0.9.x` 文档：http://09x.ant.design

### 升级 React

新版本推荐使用 react@0.14.x 及以上版本，并增加了对低版本 react 的警告。建议进行同步升级，参考官方的[升级文档](http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html)。

### 组件化改造

此版本对 [Button](/components/button/)、[Iconfont](/components/icon/)、[Layout](/components/layout/)、[Form](/components/form/)、[Input](/components/form/#demo-input) 模块进行了 React 组件化的改造，请基于新的使用方式修改。

例如：

```html
<button className="ant-btn ant-btn-primary">按 钮</button>
  ==>
<Button type="primary">按钮</Button>
```

```html
<i className="anticon anticon-appstore"></i>
  ==>
<Icon type="appstore" />
```

### size 属性统一

原有组件的 `size` 属性统一为大中小：`large` `default` `small`，包括 `Button` `Table` `Tabs` `Steps` `Select` `Pagination` `InputNumber` `Datepicker`。

例如：

```html
<Tabs size="mini"> ... </Tabs>
  ==>
<Tabs size="small"> ... </Tabs>
```

详情可参考：https://github.com/ant-design/ant-design/issues/415

### 其他

- [enter-animation](http://09x.ant.design/components/enter-animation) 组件下线， 请使用 [queue-anim](/components/queue-anim) 来代替。
- Carousel 升级依赖，参考新的[新的 API 和使用方式](/components/carousel/)进行修改。
- `antd.Notification()` 修改为小写的 `antd.notification()`。
- Datepicker 的 `onSelect` 属性修改为 `onChange` 属性。
- Slider 的 `withDots` `isIncluded` 属性修改为 `dots` `included`。
- iconfont 的基线更新，可能导致原有图标的位置偏移。

新版本变化较大，以上升级指南可能有遗漏，全部改动可以参考 [Changelog](/changelog)。在升级过程中遇到问题，欢迎 [报告](https://github.com/ant-design/ant-design/issues/new) 给我们。
