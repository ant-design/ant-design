---
order: 9
title: FAQ
---

Here are the frequently asked questions about Ant Design and antd that you should look up before you ask in the community or create a new issue. We also maintain a [FAQ issues label](http://u.ant.design/faq) for common github issues.

---

### Are you going to provide Sass/Stylus(etc.) style file?

No, but you can convert Less to Sass/Stylus(etc.) with tools that you can find on Google.

### `Select Dropdown DatePicker TimePicker Popover Popconfirm` disappears when I click another popup component inside it. How do I resolve this?

This has been fixed since `3.11.x`. If you're using an older version, you can use `<Select getPopupContainer={trigger => trigger.parentNode}>` to render a component inside Popover. (Or other getXxxxContainer props)

https://ant.design/components/select/#Select-props

related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### `Select Dropdown DatePicker TimePicker Popover Popconfirm` scrolls with the page?

Use `<Select getPopupContainer={trigger => trigger.parentNode}>` to render a component inside the scroll area. (Or other getXxxxContainer props).

https://ant.design/components/select/#Select-props

related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### How do I modify the default theme of Ant Design?

See: https://ant.design/docs/react/customize-theme .

### Would you supply other themes?

No, we follow Ant Design specification. https://github.com/ant-design/ant-design/issues/1241

### How to modify `Menu`/`Button`(etc.)'s style?

You can override its style but we don't recommend doing so. antd is not only a set of React components but also a design specification.

### I just want to use `Menu`/`Button`(etc.), but it seems that I have to import the whole of antd and its style.

Try [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), or import what you need in this way:

```jsx
import Menu from 'antd/es/menu';
import 'antd/es/menu/style/css';
```

or (ES6 way with tree shaking):

```jsx
import { Menu, Breadcrumb, Icon } from 'antd';
```

### How can I optimize momentjs bundle size with webpack?

See: https://github.com/jmblog/how-to-optimize-momentjs-with-webpack

### It doesn't work when I change `defaultValue` dynamically.

The `defaultXxxx` (like `defaultValue`) of `Input`/`Select`(etc...) only works on the first render. It is a specification of React. Please read [React's documentation](https://facebook.github.io/react/docs/forms.html#controlled-components).

### I set the `value` of `Input`/`Select`(etc.), and then it cannot be changed by user's action.

Try `defaultValue` or `onChange` to change `value`, and please read [React's documentation](https://facebook.github.io/react/docs/forms.html#controlled-components).

### antd overrides my global styles

Yes, antd is designed to develop a complete background application, we override some global styles for styling convenience, and it can't be removed now. More info at https://github.com/ant-design/ant-design/issues/4331 .

Alternatively, follow the instructions in [How to avoid modifying global styles?](docs/react/customize-theme#How-to-avoid-modifying-global-styles-?)

### I cannot install `antd` and `antd`'s dependencies in mainland China.

Long live the Girl Friend Wall! And try [cnpm](http://npm.taobao.org/).

### I set `dependencies.antd` as git repository in package.json, but it doesn't work.

Yes, please install `antd` with npm or yarn.

### `message` and `notification` is lower case, but other components are capitalized. Typo?

No, as `message` is just a function, not a React Component.

### `antd` doesn't work well in mobile.

Please check [And Design Mobile](http://mobile.ant.design) for details. `antd` has not been optimized to do so. You may try [react-component](https://github.com/react-component/), those repositories which start with 'm-' 'rn-' are designed for mobile.

### Does `antd` supply standalone files like 'React'?

Yes, you can [import `antd` with script tag](https://ant.design/docs/react/install?locale=en-US#Import-in-Browser). But we recommend using `npm` to import `antd`, it is simple and easy to maintain.

### I can't visit `icon` in my network environment.

You should deploy the iconfont files to your network by following this [example](https://github.com/ant-design/antd-init/tree/7c1a33cadb98f2fd8688fe527dd7f98215b9bced/examples/local-iconfont). [#1070](https://github.com/ant-design/ant-design/issues/1070)

After 3.9.x [we are using svg icon](/components/icon#svg-icons), so you don't need to deploy iconfont locally anymore.

### How do I extend antd's components?

If you need some features which should not be included in antd, try to extend antd's component with [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775). [more](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

### How do I fix dynamic style when open Content Security Policy (CSP)?

You can configure `nonce` by [ConfigProvider](/components/config-provider/#Content-Security-Policy).

### When I set `mode` to DatePicker/RangePicker, I cannot select year or month anymore?

In a real world development, you may need a YearPicker, MonthRangePicker or WeekRangePicker. You are trying to add `mode` to DatePicker/RangePicker expected to implement those pickers. However, the DatePicker/RangePicker cannot be selected and the panels won't close now.

- Reproduction link: https://codesandbox.io/s/dank-brook-v1csy
- Same issues：[#15572](https://github.com/ant-design/ant-design/issues/15572), [#16436](https://github.com/ant-design/ant-design/issues/16436), [#11938](https://github.com/ant-design/ant-design/issues/11938), [#11735](https://github.com/ant-design/ant-design/issues/11735), [#11586](https://github.com/ant-design/ant-design/issues/11586), [#10425](https://github.com/ant-design/ant-design/issues/10425), [#11053](https://github.com/ant-design/ant-design/issues/11053)

Like [the explaination](https://github.com/ant-design/ant-design/issues/11586#issuecomment-429189877) here, that is because `<DatePicker mode="year" />` do not equal to `YearPicker`, `<RangePicker mode="month" />` do not equal to `MonthRangePicker` either. The `mode` property was added to support [showing time picker panel in DatePicker](https://github.com/ant-design/ant-design/issues/5190) in antd 3.0, which simply control the displayed panel and won't change the original date picking behavior of `DatePicker/RangePicker` (for instance you still need to click date cell to finish selection in a DatePicker, whatever the `mode` is).

##### Workaround

You can refer to [this article](https://juejin.im/post/5cf65c366fb9a07eca6968f9) or [this article](https://www.cnblogs.com/zyl-Tara/p/10197177.html), using `mode` and `onPanelChange` to encapsulate a `YearPicker` or `MonthRangePicker` for your needs. Or you can wait for our [antd@4.0](https://github.com/ant-design/ant-design/issues/16911), in which we are planing to [add more XxxPickers](https://github.com/ant-design/ant-design/issues/4524#issuecomment-480576884) for those requirments.

### How to spell Ant Design correctly?

- ✅ **Ant Design**: Capitalized with space, for the design language.
- ✅ **antd**: all lowercase, for the React UI library.
- ✅ **ant.design**：For ant.design website url.

Here are some typical wrong examples:

- ❌ AntD
- ❌ antD
- ❌ Antd
- ❌ ant design
- ❌ AntDesign
- ❌ antdesign
- ❌ Antdesign

### Do you guys have any channel for donation, like PayPal or Alipay?

[https://opencollective.com/ant-design](https://opencollective.com/ant-design)

---

## Errors and Warnings

Here are some errors & warnings that you may meet while using antd, but most of them are not bugs of antd.

### Adjacent JSX elements must be wrapped in an enclosing tag

An [answer from StackOverflow](http://stackoverflow.com/questions/25034994/how-to-correctly-wrap-few-td-tags-for-jsxtransformer), and please read [React's documentation](http://facebook.github.io/react/docs/displaying-data.html#components-are-just-like-functions).

### React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components)

Please make sure that you import `antd`'s components correctly. Read the corresponding documentation of the `antd`'s version which you use, and pay attention to typos.

### rm is not recognized as an internal or external command

Please read this [issue](https://github.com/ant-design/ant-design/issues/650#issuecomment-164966511), or try Linux/Unix.

### Failed propType: Invalid prop `AAA` of type `BBB` supplied to `CCC`, expected `DDD`. Check the render method of `EEE`.

Please read the corresponding documentation of the `antd`'s version which you use, and make sure that you pass values with correct type to `antd`'s components,

### Unknown option: xxx/package.json.presets

An [answer from Stack Overflow](http://stackoverflow.com/questions/33685365/unknown-option-babelrc-presets).

### Invariant Violation: findComponentRoot(...): Unable to find element.

You may import React twice. Set React & ReactDOM as external, if you are using webpack, See [#525](https://github.com/ant-design/ant-design/issues/525). If you are using others (browserify, etc...), please read its documentation and find options which can set React & ReactDOM as external.
