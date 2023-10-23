---
group:
  title: Other
order: 2
title: FAQ
---

Here are the frequently asked questions about Ant Design and antd that you should look up before you ask in the community or create a new issue. We also maintain a [FAQ issues label](http://u.ant.design/faq) for common github issues.

---

## Is there a difference between `undefined` and `null` in the controlled components of `antd`?

**Yes. antd will treat `undefined` as uncontrolled but `null` as controlled component which means empty value of it.**

As input element, React treats both `undefined` and `null` as uncontrolled. When the `value` is converted from a valid value to `undefined` or `null`, the component is no longer controlled, which causes some unexpected cases.

But in antd, `undefined` is treated as uncontrolled, and `null` is used as an explicit empty value of controlled components. To deal with some cases (e.g. `allowClear`) like clearing the `value` when the `value` is non-primitive. If you need a component controlled with the `value` valid, just set the `value` as `null`.

Note: For `options` in `Select-like` components, it is **strongly recommended not** to use `undefined` and `null` as `value` in `option`. Please use `string | number` as a valid `value` in `option`.

## Can I use internal API which is not documented on the site?

NOT RECOMMENDED. Internal API is not guaranteed to be compatible with future versions. It may be removed or changed in some versions. If you really need to use it, you should make sure these APIs are still valid when upgrading to a new version or just lock version for usage.

## Why API request should be strict discussion?

We are cautious when adding APIs because some APIs may not be abstract enough to become historical debt. For example, when there is a need to change the way of interaction, these poor abstractions may cause breaking changes. To avoid such problems, we recommend that new features be implemented through HOCs first.

## `Select Dropdown DatePicker TimePicker Popover Popconfirm` disappears when I click another popup component inside it. How do I resolve this?

This is an old bug that has been fixed since `v3.11.x`. If you're using an older version, you can use `<Select getPopupContainer={trigger => trigger.parentElement}>` to render a component inside Popover. (Or other `getXxxxContainer` props)

https://ant.design/components/select/#Select-props

Related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

## How do I prevent `Select Dropdown DatePicker TimePicker Popover Popconfirm` scrolling with the page?

Use `<Select getPopupContainer={trigger => trigger.parentElement}>` ([API reference](/components/select/#select-props)) to render a component inside the scroll area. If you need to config this globally in your application, try `<ConfigProvider getPopupContainer={trigger => trigger.parentElement}>` ([API reference](/components/config-provider/#api))

And make sure that parentElement is `position: relative` or `position: absolute`.

Related issue: [#3487](https://github.com/ant-design/ant-design/issues/3487) [#3438](https://github.com/ant-design/ant-design/issues/3438)

## How do I modify the default theme of Ant Design?

See: [customize-theme](/docs/react/customize-theme).

## How do I modify `Menu`/`Button`(etc.)'s style?

While you can override a component's style, we don't recommend doing so. antd is not only a set of React components, but also a design specification as well.

## How to avoid breaking change when update version?

antd will avoid breaking change in minor & patch version. You can safe do follow things:

- Official demo usage
- FAQ suggestion. Including codesandbox sample, marked as FAQ issue

And which you should avoid to do:

- Bug as feature. It will break in any other case (e.g. Use div as Tabs children)
- Use magic code to realize requirement but which can be realized with normal API

## How to use other data-time lib like Moment.js?

Please refer to [Use custom date library](/docs/react/use-custom-date-library).

## It doesn't work when I change `defaultValue` dynamically.

The `defaultXxxx` (e.g. `defaultValue`) of `Input`/`Select`(etc...) only works on the first render. It is a specification of React. Please read [React's documentation](https://facebook.github.io/react/docs/forms.html#controlled-components).

## Why does modifying props in mutable way not trigger a component update?

antd use shallow compare of props to optimize performance. You should always pass the new object when updating the state. Please ref [React's document](https://reactjs.org/docs/thinking-in-react.html)

## After I set the `value` of an `Input`/`Select`(etc.) component, the value cannot be changed by user's action.

Try `onChange` to change `value`, and please read [React's documentation](https://reactjs.org/docs/forms.html#controlled-components).

## Components are not vertically aligned when placed in single row.

Try [Space](https://ant.design/components/space/) component to make them aligned.

## antd overrides my global styles

Yes, antd is designed to help you develop a complete background application. To do so, we override some global styles for styling convenience, and currently these cannot be removed or changed. More info at https://github.com/ant-design/ant-design/issues/4331 .

Alternatively, follow the instructions in [How to avoid modifying global styles?](/docs/react/customize-theme#how-to-avoid-modifying-global-styles)

## I cannot install `antd` and `antd`'s dependencies in mainland China.

To potentially solve this, try [npm mirror china](https://npmmirror.com) and [cnpm](https://github.com/cnpm/cnpm).

## I set `dependencies.antd` as the git repository in `package.json`, but it doesn't work.

Please install `antd` with either npm or yarn.

## `message` and `notification` is lower case, but other components are capitalized. Is this a typo?

No, `message` is just a function, not a React Component, thus it is not a typo that it is in lower case.

## `antd` doesn't work well in mobile.

Please check [Ant Design Mobile](http://mobile.ant.design) as a possible solution, as `antd` has not been optimized to work well on mobile. You can also try the [react-component](https://github.com/react-component/) repositories which start with 'm-' 'rn-', which are also designed for mobile.

## Does `antd` supply standalone files like 'React'?

Yes, you can [import `antd` with script tag](https://ant.design/docs/react/introduce#import-in-browser), but we recommend using `npm` to import `antd`, as it is simple and easy to maintain.

## How do I extend antd's components?

If you need some features which should not be included in antd, try to extend antd's component with [HOC](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775). [more](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.eeu8q01s1)

## How to get the definition which is not export?

antd will export mainly definitions, but not export internal definitions which may be rename or changed. So we recommend you to use Typescript's native ability to get the definition if needed:

```tsx
import { Table } from 'antd';

type Props<T extends (...args: any) => any> = Parameters<T>[0];

type TableProps = Props<typeof Table<{ key: string; name: string; age: number }>>;
type DataSource = TableProps['dataSource'];
```

## Date-related components locale is not working?

Please check whether you have imported dayjs locale correctly.

```jsx
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
```

Please check whether there are two versions of dayjs installed.

```jsx
npm ls dayjs
```

If you are using a mismatched version of dayjs with [antd's dayjs](https://github.com/ant-design/ant-design/blob/7dfc80504a36cf8952cd732a1d0c137a16d56fd4/package.json#L125) in your project. That would be a problem cause locale not working.

## How do I fix dynamic styles while using a Content Security Policy (CSP)?

You can configure `nonce` by [ConfigProvider](/components/config-provider/#content-security-policy).

## When I set `mode` to `DatePicker`/`RangePicker`, why can I not select a year or month anymore?

In a real world development, you may need a `YearPicker`, `MonthRangePicker` or `WeekRangePicker`. You are trying to add `mode` to `DatePicker`/`RangePicker` expected to implement those pickers. However, the `DatePicker`/`RangePicker` cannot be selected and the panels won't close now.

- Reproduction link: https://codesandbox.io/s/dank-brook-v1csy
- Same issues：[#15572](https://github.com/ant-design/ant-design/issues/15572), [#16436](https://github.com/ant-design/ant-design/issues/16436), [#11938](https://github.com/ant-design/ant-design/issues/11938), [#11735](https://github.com/ant-design/ant-design/issues/11735), [#11586](https://github.com/ant-design/ant-design/issues/11586), [#10425](https://github.com/ant-design/ant-design/issues/10425), [#11053](https://github.com/ant-design/ant-design/issues/11053)

Like [the explanation](https://github.com/ant-design/ant-design/issues/11586#issuecomment-429189877) explains, this is because `<DatePicker mode="year" />` does not equal the `YearPicker`, nor is `<RangePicker mode="month" />` equal to `MonthRangePicker`. The `mode` property was added to support [showing time picker panel in DatePicker](https://github.com/ant-design/ant-design/issues/5190) in antd 3.0, which simply controls the displayed panel, and won't change the original date picking behavior of `DatePicker`/`RangePicker` (for instance you will still need to click date cell to finish selection in a `DatePicker`, whatever the `mode` is).

Likewise, `disabledDate` [cannot work on year/month panels](https://github.com/ant-design/ant-design/issues/9008#issuecomment-358554118) of `<DatePicker mode="year/month" />`, but only on cells of date panel.

### Workaround

You can refer to [this article](https://juejin.im/post/5cf65c366fb9a07eca6968f9) or [this article](https://www.cnblogs.com/zyl-Tara/p/10197177.html), using `mode` and `onPanelChange` to encapsulate a `YearPicker` or `MonthRangePicker` for your needs.

Or you can simply upgrade to [antd@4.0](https://github.com/ant-design/ant-design/issues/16911), in which we [added more XxxPickers](https://github.com/ant-design/ant-design/issues/4524#issuecomment-480576884) to meet those requirements, and `disabledDate` could be effect on those pickers too.

## message/notification/Modal.confirm lost styles when set `prefixCls` on ConfigProvider?

Static methods like message/notification/Modal.confirm are not using the same render tree as `<Button />`, but rendered to independent DOM node created by `ReactDOM.render`, which cannot access React context from ConfigProvider. Consider two solutions here:

1. Replace original usages with [message.useMessage](/components/message/#components-message-demo-hooks), [notification.useNotification](/components/notification/#why-i-can-not-access-context-redux-configprovider-localeprefixcls-in-notification) and [Modal.useModal](/components/modal/#why-i-can-not-access-context-redux-configprovider-localeprefixcls-in-modalxxx).

2. Use [App.useApp](/components/app-cn#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95) to get message/notification/modal instance.

## Why shouldn't I use component internal props or state with ref?

You should only access the API by official doc with ref. Directly access internal `props` or `state` is not recommended which will make your code strong coupling with current version. Any refactor will break your code like refactor with [Hooks](https://reactjs.org/docs/hooks-intro.html) version, delete or rename internal `props` or `state`, adjust internal node constructor, etc.

<div id="why-open"></div>

## Why we need align pop component with `open` prop?

For historical reasons, the display names of the pop components are not uniform, and both `open` and `visible` are used. This makes the memory cost that non-tsx users encounter when developing. It also leads to ambiguity about what name to choose when adding a feature. So we want to unify the attribute name, you can still use the original `visible` and it will still be backward compatible, but we will remove this attribute from the documentation as of v5.

## Dynamic style using `:where` selector which not support old browser.

Please ref dynamic theme document [Legacy Browser Compatible](/docs/react/compatible-style) part.

## How to disable motion?

Config with SeedToken:

```jsx
import { ConfigProvider } from 'antd';

<ConfigProvider theme={{ token: { motion: false } }}>
  <App />
</ConfigProvider>;
```

## CSS-in-JS css priority conflict with tailwindcss?

Same as above. You can adjust antd css priority to override. Related issue: [#38794](https://github.com/ant-design/ant-design/issues/38794)

## How to let CSS-in-JS work with shadow DOM?

Please ref document [Shadow Dom Usage](/docs/react/compatible-style#shadow-dom-usage).

## How to support SSR？

Please ref dynamic theme document [SSR](/docs/react/server-side-rendering) part.

## What is the relationship between colorPrimary and colorInfo and colorLink in V5?

In the Ant Design Token system, `colorPrimary` and `colorInfo` are both [Seed Token](../react/customize-theme.en-US.md#seed-token), so they are independent of each other. `colorLink` is an [Alias Token](../react/customize-theme.en-US.md#alias-token), inherits `colorInfo` by default, and is independent of `colorPrimary`.

## How to spell Ant Design correctly?

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

## Do you guys have any channel or website for submitting monetary donations, like through PayPal or Alipay?

[https://opencollective.com/ant-design](https://opencollective.com/ant-design)

## Use Form's `setFieldsValue` method to report an error if the object type contains `null`

When we try to set the form value using the `setFieldsValue` method in the form instance of the form component, if the passed object contains the type null, such as:

```tsx
// This is not real world code, just for explain
import { Form } from 'antd';

type Test = {
  value: string[] | null;
};

export default () => {
  const [form] = Form.useForm<Test>();

  form.setFieldsValue({
    value: null, // Error: Type "null" cannot be assigned to type "string[] | undefined".
  });
};
```

If you encounter the above error, please check the current project `tsconfig.json` contains the following configuration:

```json
{
  "strictNullChecks": true
}
```

The above problem occurs if `strictNullChecks` is set to `true`, If you can determine the project don't need this configuration (see [strictNullChecks](https://www.typescriptlang.org/zh/tsconfig#strictNullChecks) to judge whether need the configuration). You can try changing to `false` to turn off the control strict check. However, if you do need to enable this feature, you can avoid this situation by using other types instead of `null` when defining types

## The antd component reported an error when using the App Router of Next.js

If you are using the App Router of Next.js, when you use the sub-components provided by some antd components, such as `Select.Option `, `Form.Item`, etc., you may get the following error:

```bash
Error: Cannot access .Option on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.
```

At present, this problem is waiting for Next.js to give an official solution, before this, if you use sub-components in your page, you can try to add the following client tag at the top of the page to solve this problem:

```tsx
'use client';

// This is not real world code, just for explain
export default () => {
  return (
    <div className="App">
      <Form>
        <Form.Item>
          <Button type="primary">Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```
