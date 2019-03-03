---
order: 9
title: FAQ
---

以下整理了一些 Ant Design 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。此外我们也维护了一个反馈较多 [FAQ issues 标签](http://u.ant.design/faq) 亦可参考。

---

### 你们会提供 Sass/Stylus 等格式的样式文件吗？

不。事实上你可以使用工具（请自行 Google）将 Less 转换成 Sass/Stylus 等。

### 当我点击 `Select Dropdown DatePicker TimePicker Popover Popconfirm` 内的另一个 popup 组件时它会消失，如何解决？

该问题在 3.11.0 后已经解决。
如果你仍在使用旧版本，你可以通过 `<Select getPopupContainer={trigger => trigger.parentNode}>` 来在 Popover 中渲染组件，或者使用其他的 getXxxxContainer 参数。

https://ant.design/components/select/#Select-props

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### `Select Dropdown DatePicker TimePicker Popover Popconfirm` 会跟随滚动条上下移动？

使用 `<Select getPopupContainer={trigger => trigger.parentNode}>` 来将组件渲染到滚动区域内，或者使用其他的 getXxxxContainer 参数。

https://ant.design/components/select/#Select-props

相关 issue：[#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### 如何修改 Ant Design 的默认主题？

参考：https://ant.design/docs/react/customize-theme 。

### 你们会提供其他主题吗？

不，我们遵守 Ant Design 设计规范。https://github.com/ant-design/ant-design/issues/1241 。

### 如何修改 Ant Design 组件的默认样式？

你可以覆盖它们的样式，但是我们不推荐这么做。antd 是一系列 React 组件，但同样是一套设计规范。

### 我只想使用 `Menu`/`Button` 等，但似乎我必须 import 整个 antd 和它的样式文件。

试试 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，或者用下面这种方式来按需加载：

```jsx
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
```

或者（ES6 支持的 tree shaking 方式）：

```jsx
import { Menu, Breadcrumb, Icon } from 'antd';
```

### 如何配置 webpack 以优化 momentjs 的打包大小？

参考：https://github.com/jmblog/how-to-optimize-momentjs-with-webpack 。

### 当我动态改变 `defaultValue` 的时候它并没有生效。

`Input`/`Select` 等的 `defaultXxxx`（例如 `defaultValue`）只有在第一次渲染的时候有效，这是 React 的规范，请阅读 [React 的文档](https://reactjs.org/docs/forms.html#controlled-components)。

### 当我设置了 `Input`/`Select` 等的 `value` 时它就无法修改了。

尝试使用 `defaultValue` 或 `onChange` 来改变 `value`，请参考 [React 的文档](https://reactjs.org/docs/forms.html#controlled-components)。

### antd 覆盖了我的全局样式！

是的，antd 在设计的时候就是用来开发一个完整的应用的，为了方便，我们覆盖了一些全局样式，现在还不能移除，想要了解更多请追踪这个 issue：https://github.com/ant-design/ant-design/issues/4331 ，或者参考这个教程 [How to avoid modifying global styles?](docs/react/customize-theme#How-to-avoid-modifying-global-styles-?)

### 我没法安装 `antd` 和 `antd` 的依赖，顺便提一句，我在中国大陆。

那啥，试试 [cnpm](http://npm.taobao.org/)。

### 我在 package.json 里将 `dependencies.antd` 添加到了 git repository 中，但是没有用。

当然没用了，请使用 npm 安装 `antd`。

### `message` 和 `notification` 是小写的，但是其他的组件都是首字母大写的，这是手滑吗？

不，因为 `message` 是一个函数，而不是一个 React 组件。

### `antd` 在移动端体验不佳。

请浏览 [And Design Mobile](http://mobile.ant.design) 以了解详情，`antd` 并非针对移动端设计。你可以试试 [react-component](https://github.com/react-component/)，其中带有 'm-' 'rn-' 前缀的库是为移动端设计的。

### `antd` 会像 `React` 那样提供单文件引入吗？

是的，[你可以用 script 标签引入](https://ant.design/docs/react/install?locale=en-US#Import-in-Browser)。但是我们推荐使用 `npm` 来引入 `antd`，这样维护起来更简单方便。

### 在我的网络环境下没法获取到 `icon` 文件。

你应该自行部署 iconfont 文件到你的网络上，参考这个[例子](https://github.com/ant-design/antd-init/tree/7c1a33cadb98f2fd8688fe527dd7f98215b9bced/examples/local-iconfont)。 [#1070](https://github.com/ant-design/ant-design/issues/1070)

在 3.9.x 版本后，[我们会使用 svg 图标](/components/icon#svg-icons)，你就不用担心本地部署 iconfont 的问题了！

### 如何拓展 antd 的组件？

如果你需要一些 antd 没有包含的功能，你可以尝试通过 [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775) 拓展 antd 的组件。 [更多](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

### 开启了 Content Security Policy (CSP) 如何处理动态样式？

你可以通过 [ConfigProvider](/components/config-provider/#Content-Security-Policy) 来配置 `nonce` 属性。

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

还没有。

### 为什么？

马爸爸会付给我们钱。

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
