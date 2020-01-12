---
order: 6
title: Change Log
toc: false
timeline: true
---

`antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 4.0.0-rc.1

`2020-01-11`

- 🌟 Drawer Added `footer` and `footerStyle` properties. [#20690](https://github.com/ant-design/ant-design/pull/20690) [@DeanVanNiekerk](https://github.com/DeanVanNiekerk)
- 🌟 Switch Added `@switch-min-width` and `@switch-sm-min-width` less variables. [#20829](https://github.com/ant-design/ant-design/pull/20829) [@abdih](https://github.com/abdih)
- Table
  - 🐞 Fix expanded icon not work when `expandRowByClick` is set. [#20808](https://github.com/ant-design/ant-design/pull/20808)
  - 🐞 Fix expanded row width in scaled dom element and border style. [#20805](https://github.com/ant-design/ant-design/pull/20805)
  - 🐞 Fix background color css priority too high to override user customize style. [#20794](https://github.com/ant-design/ant-design/pull/20794)
  - 🐞 Fix `rowSelection` of `fixed` not work. [#20735](https://github.com/ant-design/ant-design/pull/20735)
  - 🐞 Fix fixed columns in Chrome show the vertical scrollbar. [#20705](https://github.com/ant-design/ant-design/pull/20705)
  - 🐞 Fix crash when columns with empty children. [#20703](https://github.com/ant-design/ant-design/pull/20703)
- 💄 Tweak Calendar basic style month drop-down box width and notice items of word order and card mode, select the size of the box. [#20790](https://github.com/ant-design/ant-design/pull/20790) [@xrkffgg](https://github.com/xrkffgg)
- DatePicker
  - 💄 Optimize the `border-radius` of the rounded corners connection. [#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 Fix selected style overlap. [#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 Fix extra dividing line at the bottom. [#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 Fix button style for DatePicker's default range. [#20760](https://github.com/ant-design/ant-design/pull/20760) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Input not block user input when value is `undefined`. [#20783](https://github.com/ant-design/ant-design/pull/20783)
- 🐞 Fix Carousel card carousel orientation in left / right mode. [#20781](https://github.com/ant-design/ant-design/pull/20781) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix Grid responsive gutter under SSR initial value of `0`. [#20762](https://github.com/ant-design/ant-design/pull/20762)
- 🐞 Fix InputNumber, Select and other components icon size. [#20765](https://github.com/ant-design/ant-design/pull/20765)
- 🐞 Fix Badge `z-index` higher than Table fixed columns. [#20751](https://github.com/ant-design/ant-design/pull/20751)
- 💄 Tweak font family to be same as tailwindcss. [#20747](https://github.com/ant-design/ant-design/pull/20747)
- 🐞 Fix TextArea `autoSize` blink in FireFox. [#20737](https://github.com/ant-design/ant-design/pull/20737)
- 🐞 Fix Form.Item not keep error message sync when hit rule changed. [#20725](https://github.com/ant-design/ant-design/pull/20725)
- 🐞 Fix Form.Item add additional feedback style when `hasFeedback` is not set. [#20691](https://github.com/ant-design/ant-design/pull/20691)
- 🐞 Fix Cascader search bug when `fieldNames` is existed and label/value share same name. [#20720](https://github.com/ant-design/ant-design/pull/20720)
- 🐞 Fix Collapse background color with wrong less variable. [#20718](https://github.com/ant-design/ant-design/pull/20718) [@kuitos](https://github.com/kuitos)
- 🐞 Fix Slider's Tooltip not follow handle. [#20699](https://github.com/ant-design/ant-design/pull/20699)
- 🐞 Fix Card cover image get skretched. [#20701](https://github.com/ant-design/ant-design/pull/20701)
- 🐞 Fix Typography automatic overflow with `suffix` property. [#20689](https://github.com/ant-design/ant-design/pull/20689) [@zouxiaomingya](https://github.com/zouxiaomingya)
- 🐞 Fix AutoComplete with customize component with wrong style. [#20686](https://github.com/ant-design/ant-design/pull/20686)
- 🐞 Fix Input.Group to be partial to a pixel in Form. [#20681](https://github.com/ant-design/ant-design/pull/20681)
- TypeScript
  - 🐞 Export Form interfaces. [3a1c5](https://github.com/ant-design/ant-design/commit/3a1c51010fecfa59f63f5e09027805a141e9ec11)
  - 🐞 Fix Table types. [#20789](https://github.com/ant-design/ant-design/pull/20789)
  - 🐞 Fix Table.Column and Table.ColumnGroup definition. [#20695](https://github.com/ant-design/ant-design/pull/20695)

## 4.0.0-rc.0

`2020-01-04`

Ant Design 4.0-rc released! Here is the release [document](https://github.com/ant-design/ant-design/issues/20661).

⚠️ Migrate from v3 to v4 please ref to [migration document](/docs/react/migration-v4)。

### New features and improvements

- 🌟 antd package size optimization, js gzipped dropped from 532.75KB to 289.89 KB. [#20356](https://github.com/ant-design/ant-design/pull/20356)
- 💄 New dark theme support. [#20281](https://github.com/ant-design/ant-design/pull/20281)
- 🌟 ConfigProvider supports `direction` internationalization setting`rtl`. [#19380](https://github.com/ant-design/ant-design/pull/19380)
- 🌟 New Form component. [#17327](https://github.com/ant-design/ant-design/pull/17327)
  - 🌟 Form comes with data binding function.
  - 🌟 Field changes only affect the rendering of related field components and not the entire Form.
  - 🌟 Added `initialValues` to replace the original field initialization.
  - 🌟 Added `validateMessages` to support modify validation templates.
  - 🌟 Added `onFinish` and `onFinishFailed` to complete the overall component verification logic.
  - 🌟 Added `onFieldsChange` and `onValuesChange` for triggering controlled state.
  - 🌟 Provide hook support for `useForm`.
  - 🌟 Form.Item adds `name` property for data binding.
  - 🌟 Form.Item `validateTrigger` will only perform validation trigger and will not collect field values ​​at the same time.
  - 🌟 Form.Item adds `rules` property for data validation.
  - 🌟 Form.Item adds `shouldUpdate` property to support render props.
  - 🌟 Form.Item adds `dependencies` property to simplify related field update logic.
  - 🌟 Form.Item adds `noStyle` property and adds unstyled data binding.
  - 🌟 Added Form.List component to simplify adding, deleting, modifying and checking operations.
  - 🌟 Added Form.Provider component to support multi-form linkage.
- 🌟 New Table component. [#19678](https://github.com/ant-design/ant-design/pull/19678)
  - 🌟 Added `summary` support for summary lines.
  - 🌟 Now `fixedColumn`,`expandable`, and `scroll` can be mixed.
  - 🌟 Support multi-column sort.
  - 🌟 Support custom `body` and add virtual scrolling example.
  - 🌟 Expansion-related props moved into the `expandable` attribute and add `rowExpandable` prop.
  - 🎉 Use css `sticky` to achieve fixed effects to optimize performance.
  - 💄 Optimized `expand` animation effect.
- 🌟 New DatePicker, TimePicker and Calendar components. [#20023](https://github.com/ant-design/ant-design/pull/20023)
  - 🌟 Support custom date library.
  - 🌟 Added `picker` support for setting selectors (no longer need to simulate selectors via controlled`mode`).
  - 🌟 Full range selector support: time, date, week, month, year.
  - 🌟 Range selector can now select start and end times individually.
  - 🌟 The range selector can be set to `disabled` separately for the start and end time.
  - 🌟 The range selector allows empty start and end times.
  - 🌟 Optimized manual input and keyboard interaction support.
- 🌟 Remove Icon and use `@ ant-design / icons` instead. [#18217](https://github.com/ant-design/ant-design/pull/18217)
- Skeleton
  - 🌟 Support Skeleton.Avatar placeholder component. [#19898](https://github.com/ant-design/ant-design/pull/19898) [@Rustin-Liu](https://github.com/Rustin-Liu)
  - 🌟 Support Skeleton.Button placeholder component. [#19699](https://github.com/ant-design/ant-design/pull/19699) [@Rustin-Liu](https://github.com/Rustin-Liu)
  - 🌟 Support Skeleton.Input placeholder component. [#20264](https://github.com/ant-design/ant-design/pull/20264) [@Rustin-Liu](https://github.com/Rustin-Liu)
- 🌟 Tree supports virtual scrolling. [#18172](https://github.com/ant-design/ant-design/pull/18172)
- 🌟 Tree Enhanced accessibility support and keyboard interaction. [#18866](https://github.com/ant-design/ant-design/pull/18866)
- 🌟 Select uses virtual scrolling and enhanced accessibility support and keyboard interaction. [#18658](https://github.com/ant-design/ant-design/pull/18658)
  - 🌟 Uncontrolled mode when `value` is `undefined` now.
- 🌟 TreeSelect uses virtual scrolling and optimizes keyboard support. [#19040](https://github.com/ant-design/ant-design/pull/19040)
  - 🌟 Uncontrolled mode when `value` is `undefined` now.
- 🌟 Button adds `default` and`link` styles for `danger`. [#19837](https://github.com/ant-design/ant-design/pull/19837)
- 🌟 Form and ConfigProvider support `size` setting to include component size. [#20570](https://github.com/ant-design/ant-design/pull/20570)
- 🌟 Typography adds `suffix` attribute. [#20224](https://github.com/ant-design/ant-design/pull/20224)
- 🌟 Progress adds `steps` subcomponent. [#19613](https://github.com/ant-design/ant-design/pull/19613)
- 🌟 TextArea supports `onResize`. [#20408](https://github.com/ant-design/ant-design/pull/20408)
- 🌟 Added Alert.ErrorBoundary to provide friendly error interception and prompting. [#19923](https://github.com/ant-design/ant-design/pull/19923)
- 🌟 Upload supports iconRender to customize icons. [#20034](https://github.com/ant-design/ant-design/pull/20034) [@qq645381995](https://github.com/qq645381995)
- 🌟 Tag component preset status color. [#19399](https://github.com/ant-design/ant-design/pull/19399)
- 🌟 Grid uses `flex` layout. [#16635](https://github.com/ant-design/ant-design/pull/16635)
- 🐞 Fix the display error of Carousel component `dotposition` as`left | right`. [#20645](https://github.com/ant-design/ant-design/pull/20645) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix Alert style text overflow. [#20318](https://github.com/ant-design/ant-design/pull/20318)
- 🙅 Removed warning messages for deprecated APIs. [#17510](https://github.com/ant-design/ant-design/pull/17510)
- 🙅 Added warning for Avatar, Button, Modal.method and Result components using v3 strings as icons. [#20226](https://github.com/ant-design/ant-design/pull/20226)
- 💄 Add `@border-color-split-popover`、`@input-icon-hover-color`、`@select-clear-background`、`@cascader-menu-border-color-split`、`@modal-header-border-color-split`、`@skeleton-to-color`、`@transfer-item-hover-bg` and other less variables. [#20070](https://github.com/ant-design/ant-design/pull/20070)

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
