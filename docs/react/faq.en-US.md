---
order: 11
title: FAQ
---

Here are the frequently asked questions about Ant Design and antd that you should look up before you ask in the community or create a new issue. We also maintain a [FAQ issues label](http://u.ant.design/faq) for common github issues.

---

### Will you provide Sass/Stylus(etc.) style files in addition to the Less style files currently included?

There is currently no plan to add support for Sass/Stylus(etc.) style files, but using tools on Google you can easily convert the provided Less files to your desired style format.

### `Select Dropdown DatePicker TimePicker Popover Popconfirm` disappears when I click another popup component inside it. How do I resolve this?

This is an old bug that has been fixed since `v3.11.x`. If you're using an older version, you can use `<Select getPopupContainer={trigger => trigger.parentElement}>` to render a component inside Popover. (Or other `getXxxxContainer` props)

https://ant.design/components/select/#Select-props

Related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### How do I prevent `Select Dropdown DatePicker TimePicker Popover Popconfirm` scrolling with the page?

Use `<Select getPopupContainer={trigger => trigger.parentElement}>` ([API reference](https://ant.design/components/select-cn/#Select-props)) to render a component inside the scroll area. If you need to config this globally in your application, try `<ConfigProvider getPopupContainer={trigger => trigger.parentElement}>` ([API reference](https://ant.design/components/config-provider-cn/#API))

Related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

### How do I modify the default theme of Ant Design?

See: https://ant.design/docs/react/customize-theme .

### Will you provide other themes?

No, we follow Ant Design's design specification. 

Related issue: https://github.com/ant-design/ant-design/issues/1241

### How do I modify `Menu`/`Button`(etc.)'s style?

While you can override a component's style, we don't recommend doing so. antd is not only a set of React components, but also a design specification as well.

### How do I replace Moment.js with Day.js to reduce bundle size？

Please refer to [Replace Moment.js](/docs/react/replace-moment).

### It doesn't work when I change `defaultValue` dynamically.

The `defaultXxxx` (e.g. `defaultValue`) of `Input`/`Select`(etc...) only works on the first render. It is a specification of React. Please read [React's documentation](https://facebook.github.io/react/docs/forms.html#controlled-components).

### Why does modifying props in mutable way not trigger a component update?

antd use shallow compare of props to optimize performance. You should always pass the new object when updating the state. Please ref [React's document](https://reactjs.org/docs/thinking-in-react.html)

### After I set the `value` of an `Input`/`Select`(etc.) component, the value cannot be changed by user's action.

Try `defaultValue` or `onChange` to change `value`, and please read [React's documentation](https://facebook.github.io/react/docs/forms.html#controlled-components).

### Components are not vertically aligned when placed in single row.

Try [Space](https://ant.design/components/space/) component to make them aligned.

### antd overrides my global styles

Yes, antd is designed to help you develop a complete background application. To do so, we override some global styles for styling convenience, and currently these cannot be removed or changed. More info at https://github.com/ant-design/ant-design/issues/4331 .

Alternatively, follow the instructions in [How to avoid modifying global styles?](docs/react/customize-theme#How-to-avoid-modifying-global-styles-?)

### I cannot install `antd` and `antd`'s dependencies in mainland China.

To potentially solve this, try [cnpm](http://npm.taobao.org/).

### I set `dependencies.antd` as the git repository in `package.json`, but it doesn't work.

Please install `antd` with either npm or yarn.

### `message` and `notification` is lower case, but other components are capitalized. Is this a typo?

No, `message` is just a function, not a React Component, thus it is not a typo that it is in lower case.

### `antd` doesn't work well in mobile.

Please check [And Design Mobile](http://mobile.ant.design) as a possible solution, as `antd` has not been optimized to work well on mobile. You can also try the [react-component](https://github.com/react-component/) repositories which start with 'm-' 'rn-', which are also designed for mobile.

### Does `antd` supply standalone files like 'React'?

Yes, you can [import `antd` with script tag](https://ant.design/docs/react/introduce#Import-in-Browser), but we recommend using `npm` to import `antd`, as it is simple and easy to maintain.

### I can't visit `icon` in my network environment.

You should deploy the iconfont files to your network by following this [example](https://github.com/ant-design/antd-init/tree/7c1a33cadb98f2fd8688fe527dd7f98215b9bced/examples/local-iconfont). [#1070](https://github.com/ant-design/ant-design/issues/1070)

After 3.9.x [we will also switch to using svg icons](/components/icon#svg-icons), so you won't need to deploy iconfont locally anymore as well.

### How do I extend antd's components?

If you need some features which should not be included in antd, try to extend antd's component with [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775). [more](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

### How do I fix dynamic styles while using a Content Security Policy (CSP)?

You can configure `nonce` by [ConfigProvider](/components/config-provider/#Content-Security-Policy).

### When I set `mode` to `DatePicker`/`RangePicker`, why can I not select a year or month anymore?

In a real world development, you may need a `YearPicker`, `MonthRangePicker` or `WeekRangePicker`. You are trying to add `mode` to `DatePicker`/`RangePicker` expected to implement those pickers. However, the `DatePicker`/`RangePicker` cannot be selected and the panels won't close now.

- Reproduction link: https://codesandbox.io/s/dank-brook-v1csy
- Same issues：[#15572](https://github.com/ant-design/ant-design/issues/15572), [#16436](https://github.com/ant-design/ant-design/issues/16436), [#11938](https://github.com/ant-design/ant-design/issues/11938), [#11735](https://github.com/ant-design/ant-design/issues/11735), [#11586](https://github.com/ant-design/ant-design/issues/11586), [#10425](https://github.com/ant-design/ant-design/issues/10425), [#11053](https://github.com/ant-design/ant-design/issues/11053)

Like [the explaination](https://github.com/ant-design/ant-design/issues/11586#issuecomment-429189877) explains, this is because `<DatePicker mode="year" />` does not equal the `YearPicker`, nor is `<RangePicker mode="month" />` equal to `MonthRangePicker`. The `mode` property was added to support [showing time picker panel in DatePicker](https://github.com/ant-design/ant-design/issues/5190) in antd 3.0, which simply controls the displayed panel, and won't change the original date picking behavior of `DatePicker`/`RangePicker` (for instance you will still need to click date cell to finish selection in a `DatePicker`, whatever the `mode` is).

##### Workaround

You can refer to [this article](https://juejin.im/post/5cf65c366fb9a07eca6968f9) or [this article](https://www.cnblogs.com/zyl-Tara/p/10197177.html), using `mode` and `onPanelChange` to encapsulate a `YearPicker` or `MonthRangePicker` for your needs. Or you can wait for our [antd@4.0](https://github.com/ant-design/ant-design/issues/16911), in which we are already planning to [add more XxxPickers](https://github.com/ant-design/ant-design/issues/4524#issuecomment-480576884) to meet those requirements.

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

### Do you guys have any channel or website for submitting monetary donations, like through PayPal or Alipay?

[https://opencollective.com/ant-design](https://opencollective.com/ant-design)

---

## Errors and Warnings

Here are some errors & warnings that you may encounter while using antd, although most of these are not actual bugs of antd itself.

### Adjacent JSX elements must be wrapped in an enclosing tag

Check out [this answer from StackOverflow](http://stackoverflow.com/questions/25034994/how-to-correctly-wrap-few-td-tags-for-jsxtransformer), along with also reading [React's documentation](http://facebook.github.io/react/docs/displaying-data.html#components-are-just-like-functions) to solve this.

### React.createElement: type should not be null, undefined, boolean, or number. It should be a string (for DOM elements) or a ReactClass (for composite components)

Please make sure that you import `antd`'s components correctly. Read the corresponding documentation of the `antd`'s version which you use, and pay attention to typos.

### rm is not recognized as an internal or external command

Please read [this issue](https://github.com/ant-design/ant-design/issues/650#issuecomment-164966511), or try Linux/Unix.

### Failed propType: Invalid prop `AAA` of type `BBB` supplied to `CCC`, expected `DDD`. Check the render method of `EEE`.

Please read the corresponding documentation of the `antd`'s version which you are currently using, and make sure that you pass values with correct type to `antd`'s components,

### Unknown option: xxx/package.json.presets

Check out [this answer from Stack Overflow](http://stackoverflow.com/questions/33685365/unknown-option-babelrc-presets).

### Invariant Violation: findComponentRoot(...): Unable to find element.

You may have imported `React` twice. Set `React` & `ReactDOM` as external, if you are using webpack, see [#525](https://github.com/ant-design/ant-design/issues/525). If you are using others (browserify, etc...), please read their documentation and find options which can set `React` & `ReactDOM` as external.
