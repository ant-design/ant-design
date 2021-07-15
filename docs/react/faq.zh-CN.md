---
order: 11
title: FAQ
---

以下整理了一些 Ant Design 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外我们也维护了一个反馈较多 [FAQ issues 标签](http://u.ant.design/faq) 亦可参考。

---

### 你们会提供 Sass/Stylus 等格式的样式文件吗？

暂无计划。事实上你可以使用工具（请自行 Google）将 Less 转换成 Sass/Stylus 等。

### 当我点击 `Select Dropdown DatePicker TimePicker Popover Popconfirm` 内的另一个 popup 组件时它会消失，如何解决？

该问题在 `3.11.0` 后已经解决。如果你仍在使用旧版本，你可以通过 `<Select getPopupContainer={trigger => trigger.parentElement}>` 来在 Popover 中渲染组件，或者使用其他的 `getXxxxContainer` 参数。

可以参考 [Select 属性](/components/select/#Select-props)

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### `Select Dropdown DatePicker TimePicker Popover Popconfirm` 会跟随滚动条上下移动？

使用 `<Select getPopupContainer={trigger => trigger.parentElement}>`（[API 文档](/components/select/#Select-props)）来将组件渲染到滚动区域内，或者使用其他的 `getXxxxContainer` 参数。如果需要全局解决这个问题，可以使用 `<ConfigProvider getPopupContainer={trigger => trigger.parentElement}>`（[API 文档](/components/config-provider/#API)）

并且保证 parentElement 是 `position: relative` 或 `position: absolute`。

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### 如何修改 Ant Design 的默认主题？

可以参考[定制主题](/docs/react/customize-theme)。

### 如何修改 Ant Design 组件的默认样式？

你可以覆盖它们的样式，但是我们不推荐这么做。antd 是一系列 React 组件，但同样是一套设计规范。

### 如何使用 Day.js 替换 Moment.js 来减小打包大小？

可以参考[替换 Moment.js](/docs/react/replace-moment)。

### 当我动态改变 `defaultValue` 的时候它并没有生效。

`Input`/`Select` 等的 `defaultXxxx`（例如 `defaultValue`）只有在第一次渲染的时候有效，这是 React 的规范，请阅读 [React 的文档](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)。

### 为什么修改组件传入的对象或数组属性组件不会更新？

antd 内部会对 props 进行浅比较实现性能优化。当状态变更，你总是应该传递一个新的对象。具体请参考 [React 的文档](https://zh-hans.reactjs.org/docs/thinking-in-react.html)

### 当我设置了 `Input`/`Select` 等的 `value` 时它就无法修改了。

尝试使用 `onChange` 来改变 `value`，请参考 [React 的文档](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)。

### 多个组件放一排时没有垂直对齐怎么办？

尝试使用 [Space](/components/space/) 组件来使他们对齐。

### antd 覆盖了我的全局样式！

是的，antd 在设计的时候就是用来开发一个完整的应用的，为了方便，我们覆盖了一些全局样式，现在还不能移除，想要了解更多请追踪 [这个 issue](https://github.com/ant-design/ant-design/issues/4331)，或者参考这个教程 [How to avoid modifying global styles?](/docs/react/customize-theme#How-to-avoid-modifying-global-styles)

### 我没法安装 `antd` 和 `antd` 的依赖，顺便提一句，我在中国大陆。

那啥，试试 [cnpm](http://npm.taobao.org/)。

### 我在 package.json 里将 `dependencies.antd` 添加到了 git repository 中，但是没有用。

当然没用了，请使用 npm 安装 `antd`。

### `message` 和 `notification` 是小写的，但是其他的组件都是首字母大写的，这是手滑吗？

不，因为 `message` 是一个函数，而不是一个 React 组件。

### `antd` 在移动端体验不佳。

请浏览 [And Design Mobile](http://mobile.ant.design) 以了解详情，`antd` 并非针对移动端设计。你可以试试 [react-component](https://github.com/react-component/)，其中带有 'm-' 'rn-' 前缀的库是为移动端设计的。

### `antd` 是否有国内镜像？

有的，你可以点击 https://ant-design.gitee.io/index-cn 访问。

历史版本:

- 3.x: https://ant-design-3x.gitee.io/
- 2.x: https://ant-design-2x.gitee.io/
- 1.x: https://ant-design-1x.gitee.io/

### `antd` 会像 `React` 那样提供单文件引入吗？

是的，[你可以用 script 标签引入](https://ant.design/docs/react/introduce-cn#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%BC%95%E5%85%A5)。但是我们推荐使用 `npm` 来引入 `antd`，这样维护起来更简单方便。

### 在我的网络环境下没法获取到 `icon` 文件。

你应该自行部署 iconfont 文件到你的网络上，参考这个[例子](https://github.com/ant-design/antd-init/tree/7c1a33cadb98f2fd8688fe527dd7f98215b9bced/examples/local-iconfont)。 [#1070](https://github.com/ant-design/ant-design/issues/1070)

在 `3.9.x` 版本后，[我们会使用 svg 图标](/components/icon#svg-icons)，你就不用担心本地部署 iconfont 的问题了！

### 如何拓展 antd 的组件？

如果你需要一些 antd 没有包含的功能，你可以尝试通过 [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) 拓展 antd 的组件。 [更多](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

### 我的组件默认语言是英文的？如何切回中文的。

请尝试使用 [ConfigProvider](/components/config-provider/#components-config-provider-demo-locale) 组件来包裹你的应用。

如果日期组件的国际化仍未生效，请配置 `moment.locale('zh-cn')` 并**检查你本地的 `moment` 版本和 `antd` 依赖的 `moment` 版本是否一致**。

### 开启了 Content Security Policy (CSP) 如何处理动态样式？

你可以通过 [ConfigProvider](/components/config-provider/#Content-Security-Policy) 来配置 `nonce` 属性。

### 当我指定了 DatePicker/RangePicker 的 `mode` 属性后，点击后无法选择年份/月份？

在业务开发中，你可能有年份选择，月份范围选择，周范围选择等需求，此时你给现有组件增加了 `mode` 属性，却发现无法进行点击选择行为，面板也不会关闭。如果给面板添加 `disabledDate` 也不会相应禁用对应的年/月/周。

- 重现链接：https://codesandbox.io/s/dank-brook-v1csy
- 相同 issue：[#15572](https://github.com/ant-design/ant-design/issues/15572)、[#16436](https://github.com/ant-design/ant-design/issues/16436)、[#11938](https://github.com/ant-design/ant-design/issues/11938)、[#11735](https://github.com/ant-design/ant-design/issues/11735)、[#11586](https://github.com/ant-design/ant-design/issues/11586)、[#10425](https://github.com/ant-design/ant-design/issues/10425)、[#11053](https://github.com/ant-design/ant-design/issues/11053)

就像 [这个回复](https://github.com/ant-design/ant-design/issues/15572#issuecomment-475476135) 里解释的一样，这是因为 `<DatePicker mode="year" />` 不等于 `YearPicker`，`<RangePicker mode="month" />` 不等于 `MonthRangePicker`。 `mode` 属性是在 antd 3.0 时，为了控制面板展现状态而添加的属性，以支持[展示时间面板](https://github.com/ant-design/ant-design/issues/5190)等需求而添加的。`mode` 只会简单的改变当前显示的面板，不会修改默认的交互行为（比如 DatePicker 依然是点击日才会完成选择并关闭面板）。

同样的，`disabledDate` 对于任何 `<DatePicker />` 也只会针对**日面板**生效，[并不会对 `<DatePicker mode="year/month" />` 上的年/月面板生效](https://github.com/ant-design/ant-design/issues/9008#issuecomment-358554118)。

##### 解决办法

你可以参照 [这篇文章](https://juejin.im/post/5cf65c366fb9a07eca6968f9) 或者 [这篇文章](https://www.cnblogs.com/zyl-Tara/p/10197177.html) 里的做法，利用 `mode` 和 `onPanelChange` 等方法去封装一个 `YearPicker` 等组件。

另外我们已经在在 [antd@4.0](https://github.com/ant-design/ant-design/issues/16911) 中直接[添加了更多相关日期组件](https://github.com/ant-design/ant-design/issues/4524#issuecomment-480576884)来支持这些需求，现在不再需要使用 `mode="year|month"`，而是直接可以用 `YearPicker` `MonthPicker`，并且 `disabledDate` 也可以正确作用于这些 Picker。

### ConfigProvider 设置 `prefixCls` 后，message/notification/Modal.confirm 生成的节点样式丢失了？

message/notification/Modal.confirm 等静态方法不同于 `<Button />` 的渲染方式，是单独渲染在 `ReactDOM.render` 生成的 DOM 树节点上，无法共享 ConfigProvider 提供的 context 信息。你有两种解决方式：

1. 使用官方提供的 [message.useMessage](/components/message-cn/#components-message-demo-hooks)、[notification.useNotification](/components/notification/#%E4%B8%BA%E4%BB%80%E4%B9%88-notification-%E4%B8%8D%E8%83%BD%E8%8E%B7%E5%8F%96-context%E3%80%81redux-%E7%9A%84%E5%86%85%E5%AE%B9%E5%92%8C-ConfigProvider-%E7%9A%84-locale/prefixCls-%E9%85%8D%E7%BD%AE%EF%BC%9F) 和 [Modal.useModal](/components/modal/#%E4%B8%BA%E4%BB%80%E4%B9%88-Modal-%E6%96%B9%E6%B3%95%E4%B8%8D%E8%83%BD%E8%8E%B7%E5%8F%96-context%E3%80%81redux%E3%80%81%E7%9A%84%E5%86%85%E5%AE%B9%E5%92%8C-ConfigProvider-locale/prefixCls-%E9%85%8D%E7%BD%AE%EF%BC%9F) 来调用这些方法。

2. 使用 `ConfigProvider.config` 方法全局设置 `prefixCls`。

```js
ConfigProvider.config({
  prefixCls: 'ant',
});
```

### 如何正确的拼写 Ant Design？

- ✅ **Ant Design**：用空格分隔的首字母大写单词，指代设计语言。
- ✅ **antd**：全小写，指代 React UI 组件库。
- ✅ **ant.design**：特指 ant.design 网站网址。

下面是一些典型的错误例子：

- ❌ AntD
- ❌ antD
- ❌ Antd
- ❌ ant design
- ❌ AntDesign
- ❌ antdesign
- ❌ Antdesign

### 你们有接受捐助的渠道吗，比如支付宝或者微信支付？

[https://opencollective.com/ant-design](https://opencollective.com/ant-design)

---

## 错误和警告

这里是一些你在使用 antd 的过程中可能会遇到的错误和警告，但是其中一些并不是 antd 的 bug。

### Adjacent JSX elements must be wrapped in an enclosing tag

这里有一篇[来自 StackOverflow 的回答](http://stackoverflow.com/questions/25034994/how-to-correctly-wrap-few-td-tags-for-jsxtransformer)，另外请阅读 [React 的文档](http://facebook.github.io/react/docs/displaying-data.html#components-are-just-like-functions)。

### React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components)

请确保你正确引入了 `antd` 的组件。参考 `antd` 相应组件的文档，注意你代码中的 typo。

### rm is not recognized as an internal or external command

请阅读这个 [issue](https://github.com/ant-design/ant-design/issues/650#issuecomment-164966511)，或者试试 Linux/Unix。

### Failed propType: Invalid prop `AAA` of type `BBB` supplied to `CCC`, expected `DDD`. Check the render method of `EEE`.

请阅读你正在使用版本的 `antd` 的文档，确保你传递给 `antd` 组件的参数类型正确。

### Unknown option: xxx/package.json.presets

这里有一篇[来自 StackOverflow 的回答](http://stackoverflow.com/questions/33685365/unknown-option-babelrc-presets)可以参考。

### Invariant Violation: findComponentRoot(...): Unable to find element.

你或许引入了 React 两次。如果你使用 webpack，请将 React & ReactDOM 设置为 external，参见：[#525](https://github.com/ant-design/ant-design/issues/525)。如果你使用其他工具（browserify 等），请阅读它们的文档并将 React & ReactDOM 设置为 external。
