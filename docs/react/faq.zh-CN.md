---
order: 11
title: FAQ
---

以下整理了一些 Ant Design 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外我们也维护了一个反馈较多 [FAQ issues 标签](http://u.ant.design/faq) 亦可参考。

---

## `undefined` 和 `null` 在 `antd` 的受控组件中有区别吗？

**有。antd 约定：`undefined` 是非受控的标志，`null` 作为显式的受控空值。**

在输入元素中，React 认为 `undefined` 和 `null` 都属于非受控的标志。当 `value` 由非空值转化为 `undefined` 或 `null` 时，组件不再受控，这通常是一些意外情况发生的原因。

但在 antd 中，我们定义 `undefined` 为非受控的标志，而 `null` 则作为显式的受控空值。为的是处理 `value` 为复杂数据类型时的清空（如 `allowClear`）置 `value` 为空值等场景。如果需要让组件受控且希望将 `value` 置为空值，请将 `value` 设置为 `null`。

注意：对于类 `Select` 组件的 `options`，我们**强烈不建议**使用 `undefined` 和 `null` 作为 `option` 中的 `value`，请使用 `string | number` 作为 `option` 的 `value`。

## 官方文档中没有提供的隐藏 API 我可以使用吗？

不推荐。对内接口不保证兼容性，它很可能在某个版本中因重构而移除。如果你确实需要使用，需自行确保版本升级时隐藏接口仍旧可用，或者锁定版本。

## 为何新增 API 请求需要严格讨论？

我们在添加 API 时十分谨慎，因为一些 API 可能不够抽象从而变成历史债务。例如当需要对交互方式进行更改，这些不良抽象可能会引发 Breaking Change。为了避免诸如此类问题，我们推荐新功能优先通过 HOC 实现。

## 当我点击 `Select Dropdown DatePicker TimePicker Popover Popconfirm` 内的另一个 popup 组件时它会消失，如何解决？

该问题在 `3.11.0` 后已经解决。如果你仍在使用旧版本，你可以通过 `<Select getPopupContainer={trigger => trigger.parentElement}>` 来在 Popover 中渲染组件，或者使用其他的 `getXxxxContainer` 参数。

可以参考 [Select 属性](/components/select-cn#select-props)

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

## `Select Dropdown DatePicker TimePicker Popover Popconfirm` 会跟随滚动条上下移动？

使用 `<Select getPopupContainer={trigger => trigger.parentElement}>`（[API 文档](/components/select-cn#select-props)）来将组件渲染到滚动区域内，或者使用其他的 `getXxxxContainer` 参数。如果需要全局解决这个问题，可以使用 `<ConfigProvider getPopupContainer={trigger => trigger.parentElement}>`（[API 文档](/components/config-provider-cn#api)）

并且保证 parentElement 是 `position: relative` 或 `position: absolute`。

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

## 如何修改 Ant Design 的默认主题？

可以参考[定制主题](/docs/react/customize-theme-cn)。

## 如何修改 Ant Design 组件的默认样式？

你可以覆盖它们的样式，但是我们不推荐这么做。antd 是一系列 React 组件，但同样是一套设计规范。

## 如何避免升级导致的破坏性变更？

antd 在 minor 和 patch 版本迭代中会避免引入破坏性变更，遵从以下原则会确保不会破坏你的代码：

- 使用出现在官方 Demo 中的写法
- FAQ 中出现的解法，包含代码片段以及 codesandbox 示例、issue 中当前版本标记 FAQ label 的

而下述变更则需要开发者自行校验：

- 特定场景的错误用法，BUG as Feature（例如 Tabs 下直接包 div 的用法）
- 可以通过正常用法实现功能需求却魔改的

## 如何使用其他时间日期库如 Moment.js？

可以参考[使用自定义日期库](/docs/react/use-custom-date-library-cn)。

## 当我动态改变 `defaultValue` 的时候它并没有生效。

`Input`/`Select` 等的 `defaultXxxx`（例如 `defaultValue`）只有在第一次渲染的时候有效，这是 React 的规范，请阅读 [React 的文档](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)。

## 为什么修改组件传入的对象或数组属性组件不会更新？

antd 内部会对 props 进行浅比较实现性能优化。当状态变更，你总是应该传递一个新的对象。具体请参考 [React 的文档](https://zh-hans.reactjs.org/docs/thinking-in-react.html)

## 当我设置了 `Input`/`Select` 等的 `value` 时它就无法修改了。

尝试使用 `onChange` 来改变 `value`，请参考 [React 的文档](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)。

## 多个组件放一排时没有垂直对齐怎么办？

尝试使用 [Space](/components/space-cn) 组件来使他们对齐。

## antd 覆盖了我的全局样式！

是的，antd 在设计的时候就是用来开发一个完整的应用的，为了方便，我们覆盖了一些全局样式，现在还不能移除，想要了解更多请追踪 [这个 issue](https://github.com/ant-design/ant-design/issues/4331)，或者参考这个教程 [How to avoid modifying global styles?](/docs/react/customize-theme-cn#how-to-avoid-modifying-global-styles)

## 我没法安装 `antd` 和 `antd` 的依赖，顺便提一句，我在中国大陆。

那啥，试试 [npmmirror 国内镜像](https://npmmirror.com) 和 [cnpm](https://github.com/cnpm/cnpm)。

## 我在 package.json 里将 `dependencies.antd` 添加到了 git repository 中，但是没有用。

当然没用了，请使用 npm 安装 `antd`。

## `message` 和 `notification` 是小写的，但是其他的组件都是首字母大写的，这是手滑吗？

不，因为 `message` 是一个函数，而不是一个 React 组件。

## `antd` 在移动端体验不佳。

请浏览 [Ant Design Mobile](http://mobile.ant.design) 以了解详情，`antd` 并非针对移动端设计。你可以试试 [react-component](https://github.com/react-component/)，其中带有 'm-' 'rn-' 前缀的库是为移动端设计的。

## `antd` 是否有国内镜像？

有的，你可以访问 https://ant-design.antgroup.com/index-cn 或 https://ant-design.gitee.io/index-cn 。

历史版本:

- 4.x: https://4x-ant-design.antgroup.com
- 3.x: https://ant-design-3x.gitee.io/
- 2.x: https://ant-design-2x.gitee.io/
- 1.x: https://ant-design-1x.gitee.io/

## `antd` 可以像 `React` 那样使用单文件引入吗？

可以，[你可以用 script 标签引入](https://ant.design/docs/react/introduce-cn#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%BC%95%E5%85%A5)。但是我们推荐使用 `npm` 来引入 `antd`，这样维护起来更简单方便。

## 在我的网络环境下没法获取到 `icon` 文件。

你应该自行部署 iconfont 文件到你的网络上，参考这个[例子](https://github.com/ant-design/antd-init/tree/7c1a33cadb98f2fd8688fe527dd7f98215b9bced/examples/local-iconfont)。 [#1070](https://github.com/ant-design/ant-design/issues/1070)

在 `3.9.x` 版本后，[我们会使用 svg 图标](/components/icon-cn#svg-icons)，你就不用担心本地部署 iconfont 的问题了！

## 如何拓展 antd 的组件？

如果你需要一些 antd 没有包含的功能，你可以尝试通过 [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) 拓展 antd 的组件。 [更多](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

## 如何获取未导出的属性定义？

antd 会透出组件定义，但是随着重构可能导致内部一些定义命名或者属性变化。因而更推荐直接使用 Typescript 原生能力获取：

```tsx
import { Table } from 'antd';

type Props<T extends (...args: any) => any> = Parameters<T>[0];

type TableProps = Props<typeof Table<{ key: string; name: string; age: number }>>;
type DataSource = TableProps['dataSource'];
```

## 我的组件默认语言是英文的？如何切回中文的。

请尝试使用 [ConfigProvider](/components/config-provider-cn#components-config-provider-demo-locale) 组件来包裹你的应用。

如果日期组件的国际化仍未生效，请配置 `dayjs.locale('zh-cn')` 并**检查你本地的 `dayjs` 版本和 `antd` 依赖的 `dayjs` 版本是否一致**。

## 为什么时间类组件的国际化 locale 设置不生效？

请检查是否正确设置了 dayjs 语言包。

```js
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
```

如果还有问题，请检查是否有两个版本的 dayjs 共存？

```jsx
npm ls dayjs
```

一般来说，如果项目中依赖的 dayjs 版本和 [antd 依赖的 dayjs 版本](https://github.com/ant-design/ant-design/blob/7dfc80504a36cf8952cd732a1d0c137a16d56fd4/package.json#L125) 无法兼容（semver 无法匹配，比如项目中的 dayjs 版本写死且较低），则会导致使用两个不同版本的 dayjs 实例，这样也会导致国际化失效。

## 开启了 Content Security Policy (CSP) 如何处理动态样式？

你可以通过 [ConfigProvider](/components/config-provider-cn#content-security-policy) 来配置 `nonce` 属性。

## 当我指定了 DatePicker/RangePicker 的 `mode` 属性后，点击后无法选择年份/月份？

在业务开发中，你可能有年份选择，月份范围选择，周范围选择等需求，此时你给现有组件增加了 `mode` 属性，却发现无法进行点击选择行为，面板也不会关闭。如果给面板添加 `disabledDate` 也不会相应禁用对应的年/月/周。

- 重现链接：https://codesandbox.io/s/dank-brook-v1csy
- 相同 issue：[#15572](https://github.com/ant-design/ant-design/issues/15572)、[#16436](https://github.com/ant-design/ant-design/issues/16436)、[#11938](https://github.com/ant-design/ant-design/issues/11938)、[#11735](https://github.com/ant-design/ant-design/issues/11735)、[#11586](https://github.com/ant-design/ant-design/issues/11586)、[#10425](https://github.com/ant-design/ant-design/issues/10425)、[#11053](https://github.com/ant-design/ant-design/issues/11053)

就像 [这个回复](https://github.com/ant-design/ant-design/issues/15572#issuecomment-475476135) 里解释的一样，这是因为 `<DatePicker mode="year" />` 不等于 `YearPicker`，`<RangePicker mode="month" />` 不等于 `MonthRangePicker`。 `mode` 属性是在 antd 3.0 时，为了控制面板展现状态而添加的属性，以支持[展示时间面板](https://github.com/ant-design/ant-design/issues/5190)等需求而添加的。`mode` 只会简单的改变当前显示的面板，不会修改默认的交互行为（比如 DatePicker 依然是点击日才会完成选择并关闭面板）。

同样的，`disabledDate` 对于任何 `<DatePicker />` 也只会针对**日面板**生效，[并不会对 `<DatePicker mode="year/month" />` 上的年/月面板生效](https://github.com/ant-design/ant-design/issues/9008#issuecomment-358554118)。

### 解决办法

你可以参照 [这篇文章](https://juejin.im/post/5cf65c366fb9a07eca6968f9) 或者 [这篇文章](https://www.cnblogs.com/zyl-Tara/p/10197177.html) 里的做法，利用 `mode` 和 `onPanelChange` 等方法去封装一个 `YearPicker` 等组件。

另外我们已经在在 [antd@4.0](https://github.com/ant-design/ant-design/issues/16911) 中直接[添加了更多相关日期组件](https://github.com/ant-design/ant-design/issues/4524#issuecomment-480576884)来支持这些需求，现在不再需要使用 `mode="year|month"`，而是直接可以用 `YearPicker` `MonthPicker`，并且 `disabledDate` 也可以正确作用于这些 Picker。

## ConfigProvider 设置 `prefixCls` 后，message/notification/Modal.confirm 生成的节点样式丢失了？

message/notification/Modal.confirm 等静态方法不同于 `<Button />` 的渲染方式，是单独渲染在 `ReactDOM.render` 生成的 DOM 树节点上，无法共享 ConfigProvider 提供的 context 信息。你有两种解决方式：

1. 使用官方提供的 [message.useMessage](/components/message-cn/#components-message-demo-hooks)、[notification.useNotification](/components/notification-cn#%E4%B8%BA%E4%BB%80%E4%B9%88-notification-%E4%B8%8D%E8%83%BD%E8%8E%B7%E5%8F%96-context%E3%80%81redux-%E7%9A%84%E5%86%85%E5%AE%B9%E5%92%8C-ConfigProvider-%E7%9A%84-locale/prefixCls-%E9%85%8D%E7%BD%AE%EF%BC%9F) 和 [Modal.useModal](/components/modal-cn/#%E4%B8%BA%E4%BB%80%E4%B9%88-Modal-%E6%96%B9%E6%B3%95%E4%B8%8D%E8%83%BD%E8%8E%B7%E5%8F%96-context%E3%80%81redux%E3%80%81%E7%9A%84%E5%86%85%E5%AE%B9%E5%92%8C-ConfigProvider-locale/prefixCls-%E9%85%8D%E7%BD%AE%EF%BC%9F) 来调用这些方法。

2. 使用 `ConfigProvider.config` 方法全局设置 `prefixCls`。

```js
ConfigProvider.config({
  prefixCls: 'ant',
});
```

## 为什么我不应该通过 ref 访问组件内部的 props 和 state？

你通过 ref 获得引用时只应该使用文档提供的方法。直接读取组件内部的 `props` 和 `state` 不是一个好的设计，这会使你的代码与组件版本强耦合。任何重构都可能会使你的代码无法工作，其中重构包括且不仅限于改造成 [Hooks](https://reactjs.org/docs/hooks-intro.html) 版本、移除 / 更名内部 `props` 与 `state`、调整内部 React 节点结构等等。

<div id="why-open"></div>

## 弹层类组件为什么要统一至 `open` 属性？

因为历史原因，弹层类组件展示命名并不统一，出现了 `open` 与 `visible` 都在使用的情况。这使得非 tsx 用户在开发时遭遇的记忆成本。同样导致新增 feature 时选择何种命名的模棱两可。因而我们希望统一该属性命名，你仍然可以使用原本的 `visible` 它仍然会向下兼容，但是从 v5 起我们将从文档中移除该属性。

## 动态样式有 `:where` 导致旧版浏览器不支持怎么办？

请参考动态主题文档 [兼容性调整](/docs/react/customize-theme-cn#兼容性调整) 部分内容。

## 如何关闭组件动画

通过 SeedToken 可以很方便的实现：

```jsx
import { ConfigProvider } from 'antd';

<ConfigProvider theme={{ token: { motion: false } }}>
  <App />
</ConfigProvider>;
```

## CSS-in-JS 与 tailwindcss 优先级冲突？

同上，你可以调整 antd 样式优先级以覆盖。相关 issue: [#38794](https://github.com/ant-design/ant-design/issues/38794)

## CSS-in-JS 如何与 Shadow DOM 一同使用？

请参考文档 [Shadow Dom 场景](/docs/react/customize-theme-cn#shadow-dom-场景) 内容。

## 如何支持 SSR？

请参考动态主题文档 [服务端渲染](/docs/react/customize-theme-cn#服务端渲染) 部分内容。

## 如何正确的拼写 Ant Design？

- ✅ **Ant Design**：用空格分隔的首字母大写单词，指代设计语言。
- ✅ **antd**：全小写，指代 React UI 组件库。
- ✅ **ant.design**：特指 ant.design 网站网址。

下面是一些典型的错误例子：

- ❌ AntD
- ❌ Ant-D
- ❌ antD
- ❌ Antd
- ❌ ant design
- ❌ AntDesign
- ❌ antdesign
- ❌ Antdesign

## 你们有接受捐助的渠道吗，比如支付宝或者微信支付？

[https://opencollective.com/ant-design](https://opencollective.com/ant-design)
