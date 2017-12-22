---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breadking change and new features.

---

## 3.0.3

`2017-12-22`

- 🐞 Add React.SFC type for Form.create return value. [#8672](https://github.com/ant-design/ant-design/issues/8672)
- 🐞 Fix form item height and align problem. [#8701](https://github.com/ant-design/ant-design/issues/8701)
- 🐞 Improve input addon size. [#8680](https://github.com/ant-design/ant-design/issues/8680)
- 🐞 Fix table size of fixed column. [#8660](https://github.com/ant-design/ant-design/issues/8660)

## 3.0.2

`2017-12-17`

- 📝 Provide a migration helper for antd@3.0. [e71b68dd](https://github.com/ant-design/ant-design/commit/e71b68dd1d2ff91200fea6dd9d56e6aa5653edbc)
- 📝 Rewrite [CONTRIBUTING Guideline](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)
- 🌟 Optimize notification display in small screen. [#8631](https://github.com/ant-design/ant-design/issues/8631)
- 🌟 Optimize Pagination design and fix some issues of alignment and margin.
- 🐞 Upgrade to `react-slick@0.16.0` for peerDependencies warning. [#8455](https://github.com/ant-design/ant-design/issues/8455)
- 🐞 Fix not working `size` property in fixed-header Table. [#8577](https://github.com/ant-design/ant-design/issues/8577)
- 🐞 Fix not working `locale` property of DatePicker/RangePicker. [#8635](https://github.com/ant-design/ant-design/issues/8635)
- 🐞 Fix Popover arrow position and size cannot be overrided by less variable. [#8548](https://github.com/ant-design/ant-design/issues/8548) [#8549](https://github.com/ant-design/ant-design/issues/8549)
- 🐞 Fix not working `notFoundContent` of AutoComponent. [#8553](https://github.com/ant-design/ant-design/issues/8553)
- 🐞 Tweak RangePicker vertical align position.
- 🐞 Layout.Sider breakpoints is same as Grid's now. [#8620](https://github.com/ant-design/ant-design/issues/8620)
- 🐞 Fix submenu still showing in a collapsed menu when collapsedWidth is `0`. [#8587](https://github.com/ant-design/ant-design/issues/8587)
- 🐞 Fix Card's `Meta.title` text overflow not working. [#8597](https://github.com/ant-design/ant-design/issues/8597)
- 🐞 Fix pagination margin problem of bordered List. [#8562](https://github.com/ant-design/ant-design/issues/8562)
- 🐞 Fix Menu's submenu cannot open when specified non-existed `defaultOpenKeys`. [#8475](https://github.com/ant-design/ant-design/issues/8475)
- 🐞 Fix type name collisions of `InputProps` and `SearchProps` in Input, AutoComplete, Transfer. [#8478](https://github.com/ant-design/ant-design/issues/8478)

## 3.0.1

`2017-12-11`

* Remove useless DOM wrapper of Card, so that Card's DOM structure will be the same as Card of 2.x.
* Fix that missing `antd/lib/style/v2-compatible-reset.css`. [28d13e2](https://github.com/ant-design/ant-design/commit/28d13e2539817f87b8a2029ea22d9c30b377167f)
* Fix that Affix will be overlap when it is heigher than viewport. [31a0654](https://github.com/ant-design/ant-design/commit/31a0654ef990eb7bae2b18095fa0d5230b9be1da)
* Fix the open animation of Collapse. [edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* Fix the aligment of large size Input and Button in Form. [#8459](https://github.com/ant-design/ant-design/issues/8459)
* Menu
  * Fix the popup will disappear unexpectly in Safari. [#8453](https://github.com/ant-design/ant-design/issues/8453)
  * Fix the open animation. [edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* Fix compile error of style of Notification. [#8437](https://github.com/ant-design/ant-design/issues/8437)
* Fix the background color of mini Pagination. [e13c6d8](https://github.com/ant-design/ant-design/commit/e13c6d87fa6bf7d5cf4b2d5154a85b4793997de5)
* Table
  * Fix broken style in mobile. [#8465](https://github.com/ant-design/ant-design/issues/8465)
  * Fix broken style when use size and nested Table together. [#8525](https://github.com/ant-design/ant-design/issues/8525)
* TypeScript
  * Fix TypeScript definition of AutoComplete. [#8383](https://github.com/ant-design/ant-design/pull/8383) [@nidhi-ag](https://github.com/nidhi-ag)
  * Fix TypeScript definition of Divider. [#8504](https://github.com/ant-design/ant-design/pull/8504) [@cyyyu](https://github.com/cyyyu)
  * Fix TypeScript definition of Dropdown. [#8444](https://github.com/ant-design/ant-design/issues/8444)
  * Fix TypeScript definition of List. [e27061e](https://github.com/ant-design/ant-design/commit/e27061ea5b2f2d3273b45862d9b87285448f0998) [1b2a955](https://github.com/ant-design/ant-design/commit/1b2a9550d9595dd2f31f79d1bdd52695ec792692)
  * Fix TypeScript definition of Table. [#8507](https://github.com/ant-design/ant-design/issues/8507) [#8515](https://github.com/ant-design/ant-design/pull/8515) [@danedavid](https://github.com/danedavid)

## 3.0.0

`2017-12-04`

Learn more in the [Ant Design 3.0 announcement post](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c)!

### Major Changes

- New [color system](https://ant.design/docs/spec/colors#Color-Palettes), We changed our primary color from 『`#108EE9`』 to 『`#1890FF`』, we called the new primary color "拂晓蓝 (Daybreak Blue)" which means the color of the sky at daybreak.
- New design of components.
- Increased the base font size from 12px to 14px.
- Changed default locale to `en_US`.
- Support React 16.
- Better TypeScript support.
- New [List](https://ant.design/components/list/) component.
- New [Divider](https://ant.design/components/divider/) component.
- 30 New [icons](https://ant.design/components/icon/).

### Breaking Changes

We provide a [migration tool](https://github.com/ant-design/antd-migration-helper) to help you find deprecated usages in your codebase.

- Card's `noHovering` has been renamed to `hoverable`，and its default value now is `true`.
- Added new Grid breakpoints. [#7230](https://github.com/ant-design/ant-design/pull/7230)
- Form `getFieldDecorator`'s `exclusive` option has been removeed.
- Added `Form.createFormField`, and you must use it to wrap field data returned in `option.mapPropsToFields`:

  ```diff
  import { Form } from 'antd';

  Form.create({
    mapPropsToFields() {
      return {
  -     name: { value: 'antd' },
  +     name: Form.createFormField({ value: 'antd' }),
      };
    },
  })
  ```

- Improved global reset style, if you encounter style problem after upgrading, you can try import our v2 compatible style.

  ```javascript
  import 'antd/lib/style/v2-compatible-reset';
  ```

  Or use less

  ```less
  @import '~antd/lib/style/v2-compatible-reset.less';
  ```

- Since we changed default locale to en_US, LocalProvider is not required any more for English users.
- We don't set `size="large"` to `Input` in `Form` by default any more.
- `Input.Search` 🔍 icon don't be interactive anymore, you can use new `enterButton` prop to add a button after input.
- UMD version of `dist/antd.js` doesn't include moment any more, you need add moment by yourself if you are using the UMD version.
  ```diff
  <html>
    <head>
  +   <script src="https://unpkg.com/moment@2.19.3/moment.js"></script>
      <script src="https://unpkg.com/antd@3.0.0/dist/antd.js"></script>
    </head>
  </html>
  ```

### Removed Deprecations

- 🗑 DatePicker.Calendar has been removed, you can use Calendar directly.
- 🗑 DatePicker's `toggleOpen` prop has been removed, use `onOpenChange` instead.
- 🗑 Form's `inline`, `horizontal`, `vertical` props has been removed, use `layout` instead.
- 🗑 Input's `type` prop has dropped textarea support, please use Input.TextArea instead.
- 🗑 Mention's `toEditorState` has been removed.
- 🗑 Select's `multiple`, `combobox`, `tags` props has been removed, use `mode` instead.

### Features and Improvements

- 🌟 Tabs added new size `size="large"`。
- 🌟 Row's `gutter` now support responsive setting, you can write `gutter={{ sm: 16, lg: 32 }}`.
- 🌟 Spin added new `indicator` prop to allow setting custom indicator. [#7977](https://github.com/ant-design/ant-design/pull/7977) [@kossel](https://github.com/ant-design/ant-design/pull/7977)
- 🌟 Input.Search added new `enterButton` prop to allow setting custom search button.[#7596](https://github.com/ant-design/ant-design/issues/7596)
- 🌟 Mention added new `placement` prop to allow setting the popup direction.
- 🌟 Carousel added new `next()`, `prev()`, `goTo(slideNumber)` methods to allow controlling slides programmatically.
- 🌟 Button added link support，Button with `href` prop will render to `<a>`. [#8343](https://github.com/ant-design/ant-design/pull/8343)
- 🌟 Steps was refactored, first rendering won't flash. [#6010](https://github.com/ant-design/ant-design/issues/6010)
- 🌟 Switch added new `loading` prop to show a loading status.
- Menu
  - 🌟 We refactored it with [rc-trigger](https://github.com/react-component/trigger) for delay popup and auto overflow in viewport.
  - 🌟 Added new `subMenuOpenDelay` and `subMenuCloseDelay` props to allow setting delay time for submenu toggling.
  - 🌟 Added new `forceSubMenuRender` prop to render submenu even if it's collapsed. [#5586](https://github.com/ant-design/ant-design/issues/5586)
- Form
  - 🌟 Added animations for validation message showing.
  - 🌟 Added field conditional rendering support. [#react-component/117](https://github.com/react-component/form/issues/117)
- Message
  - 🌟 Allow `duration` optional. [#7857](https://github.com/ant-design/ant-design/issues/7857) [@monkindey](https://github.com/monkindey)
- Badge
  - 🌟 Added new `offset` prop to allow setting the offset of status point.
  - 🌟 `status` can use whith `children` now. [#8164](https://github.com/ant-design/ant-design/issues/8164)
- Card
  - 🌟 Added new `inner` type. [Demo](https://ant.design/components/card/#components-card-demo-inner)。
  - 🌟 Added `cover`、`actions` and a new `Meta` component. [Demo](https://ant.design/components/card/#components-card-demo-meta)。
- DatePicker
  - 🌟 Added `mode` and `onPanelChange`，to allow controlling the panel mode. [Demo](https://ant.design/components/date-picker/#components-date-picker-demo-mode)。
  - 🌟 Added `WeekPicker` component. [Demo](https://ant.design/components/date-picker/#components-date-picker-demo-basic)
  - 🌟 Added new `dateRender` prop to allow customizing date cell.
- TimePicker
  - 🌟 Added new `hourStep`, `minuteStep`, `secondStep` props to allow customizing time setps. [Demo](https://ant.design/components/time-picker/#components-time-picker-demo-interval-options)
  - 🌟 Added new `focusOnOpen` prop to focus input after panel is open.
- Table
  - 🌟 Added new `components` prop to allow overriding default table elements.
    ```javascript
    // You can override following elements
    const components = {
      table: MyTable,
      header: {
        wrapper: HeaderWrapper,
        row: HeaderRow,
        cell: HeaderCell,
      },
      body: {
        wrapper: BodyWrapper,
        row: BodyRow,
        cell: BodyCell,
      },
    };

    <Table components={components} columns={columns data={data}}  />
    ```
  - 🌟 Added new `onRow` prop to allow passing custom props to table body row.
  - 🌟 Added new `onHeaderRow` props to allow passing custom props to table header row.
  - 🌟 Added `column[onCell]` to allow passing custom props to table body cell.
  - 🌟 Added `column[onHeaderCell]` to allow passing custom props to table header cell.
  - 🌟 Added `column[align]` to allow setting how text aligns.
  - 🌟 Added `column[defaultSortOrder]` to allow setting default sort order. [#8111](https://github.com/ant-design/ant-design/pull/8111) [@megawac](https://github.com/megawac)
  - 🌟 Added `rowSelection[fixed]` to allow fixing the selection column.。
  - 🙅 Deprecated `getBodyWrapper`, please use `components` instead.
  - 🙅 Deprecated `onRowClick`，`onRowDoubleClick`、`onRowContextMenu`、`onRowMouseEnter`、`onRowMouseLeave`, please use `onRow` instead.
    ```javascript
    <Table onRow={(record) => ({
      onClick: () => {},
      onDoubleClick: () => {},
      onContextMenu: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    })} />
    ```
- Select
  - 🌟 Option's value can be a number in single or multiple mode.
  - 🌟 Added new `maxTagCount` and `maxTagPlaceholder` props.
  - 🌟 Added new `showAction` prop to allow setting the trigger action for popup.
  - 🌟 Added new `onMouseEnter` and `onMouseLeave` callback.
- LocaleProvider
  - 🇮🇸 Added Icelandic. [#7561](https://github.com/ant-design/ant-design/pull/7561) [@paunovic-stefan](https://github.com/paunovic-stefan)
  - 🇪🇬 Added Egyptian Arabic. [#7888](https://github.com/ant-design/ant-design/pull/7888) [@mohamed-seada-1994](https://github.com/mohamed-seada-1994)
  - 🇺🇦 Added Ukrainian. [#8169](https://github.com/ant-design/ant-design/pull/8169) [@anxolerd](https://github.com/anxolerd)

### Bug fixes

- Form
  - 🐞 Fixed issue result in Input icon is hovered by feedback icon.
  - 🐞 Fixed feedback icon not centered in large input.
- 🐞 Fix Menu key press error. [#8089](https://github.com/ant-design/ant-design/issues/8089)

### Other things

- Don't need set `allowSyntheticDefaultImports` when using in TypeScript.
- We removed `react@0.14` and `react@15` from `peerDependencies`, though `antd@3.0` still works on old React versions, but we highly recommend you upgrading to React 16 since we may use the new features only exists in React 16 in the future. See [React 16](https://reactjs.org/blog/2017/09/26/react-v16.0.html)
- Fully es module support, if you are using webpack 3, you can set babel-plugin-import's `libraryDirectory` to `es` to enable tree shaking .
- We will support 2.x branch until June in next year.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.


## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
