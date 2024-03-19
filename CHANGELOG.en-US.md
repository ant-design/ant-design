---
order: 6
title: Changelog
toc: false
timeline: true
tag: vVERSION
---

`antd` follows [Semantic Versioning 2.0.0](http://semver.org/).

#### Release Schedule

- Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
- Monthly release: minor version at the end of every month for new features.
- Major version release is not included in this schedule for breaking change and new features.

---

## 5.15.3

`2024-03-17`

- 💄 Unify Modal, Drawer, notification and Tour close button style. [#47909](https://github.com/ant-design/ant-design/pull/47909)
- 🐞 Fix Badge and text node align style under Space. [#47908](https://github.com/ant-design/ant-design/pull/47908)
- 💄 Fix Upload file list actions wrap style. [#47898](https://github.com/ant-design/ant-design/pull/47898)
- 🐞 Fix Typography config the `ellipsis.symbol` exceed the single line height will make ellipsis rows not correct issue. [#47889](https://github.com/ant-design/ant-design/pull/47889)
- 🐞 Fix DatePicker component height not correct when customize `controlHeight`. [#47874](https://github.com/ant-design/ant-design/pull/47874)
- 🐞 Fix DatePicker with `multiple` selector collapse for cross the line. [#47821](https://github.com/ant-design/ant-design/pull/47821)
- 🐞 TimePicker revert and add warning for `onSelect` API which is already removed in v4 but not update in English documentation. [#47878](https://github.com/ant-design/ant-design/pull/47878)
- 💄 Darken the Empty text color to make it readable. [#47268](https://github.com/ant-design/ant-design/pull/47268) [@evgmol](https://github.com/evgmol)

## 5.15.2

`2024-03-11`

- 🛠 Adjust the closing trigger of Tour, Dropdown, Menu, Tabs, Mentions, Picker, Select, TreeSelect, Cascader, Tooltip, and Popover pop-ups from `click` to `mouseDown` to uniformly solve some event timing issues related to pop-up interactions. [#47775](https://github.com/ant-design/ant-design/pull/47775)
- 🐞 Fix Descriptions extra padding of items. [#47737](https://github.com/ant-design/ant-design/pull/47737)
- 🐞 Fix Anchor wrong active status when bounds value is 0. [#47795](https://github.com/ant-design/ant-design/pull/47795)[@winchesHe](https://github.com/winchesHe)
- 💄 Fix ColorPicker clear icon hover style. [#47761](https://github.com/ant-design/ant-design/pull/47761)
- 🇷🇺 Improve DatePicker ru_RU locale. [#47768](https://github.com/ant-design/ant-design/pull/47768) [@AlexeyTeterin](https://github.com/AlexeyTeterin)

## 5.15.1

`2024-03-06`

- 🐞 Revert code that removed margin of Tag. [#47736](https://github.com/ant-design/ant-design/pull/47736)
- 🇷🇺 Improve DatePicker ru_RU locale. [#47705](https://github.com/ant-design/ant-design/pull/47705)

## 5.15.0

`2024-03-02`

- ConfigProvider
  - 🆕 ConfigProvider support Input.TextArea `allowClear` `autoComplete` `className` `style` `classNames` `styles` props. [#47589](https://github.com/ant-design/ant-design/pull/47589)
  - 🆕 ConfigProvider support Input `allowClear` props. [#47602](https://github.com/ant-design/ant-design/pull/47602)
  - 🆕 ConfigProvider support Menu `expandIcon` props. [#47561](https://github.com/ant-design/ant-design/pull/47561)
  - 🆕 ConfigProvider support Collapse `expandIcon` props. [#47473](https://github.com/ant-design/ant-design/pull/47473)
  - 🆕 ConfigProvider support Tabs `removeIcon` props, when set `type="editable-card"`. [#47334](https://github.com/ant-design/ant-design/pull/47334)
  - 🆕 Prefixes for CSS variables follow the `prefixCls` property of ConfigProvider by default. [#47481](https://github.com/ant-design/ant-design/pull/47481)
  - 🤖 CardProps `styles` in ConfigProvider is set to optional. [#47601](https://github.com/ant-design/ant-design/pull/47601) [@Yawenina](https://github.com/Yawenina)
- 🆕 Select、Checkbox、Radio、DatePicker、TreeSelect、Cascader the `focus` supports passing `options`. [#47664](https://github.com/ant-design/ant-design/pull/47664)
- 🆕 Select add `labelRender` property to customize current selected label render。[#47664](https://github.com/ant-design/ant-design/pull/47664)
- 🆕 Modal support configuring `aria-*` in `closable`. [#47650](https://github.com/ant-design/ant-design/pull/47650)
- 🆕 Alert support configuring `aria-*` in `closable`. [#47474](https://github.com/ant-design/ant-design/pull/47474)
- 🆕 Tabs support `removeIcon` props, when set `type="editable-card"`. [#47334](https://github.com/ant-design/ant-design/pull/47334)
- Drawer
  - 🆕 Drawer support configuring `aria-*` in `closable`. [#47543](https://github.com/ant-design/ant-design/pull/47543)
  - 🆕 Drawer support passing `aria-*` attributes to panel nodes. [#47387](https://github.com/ant-design/ant-design/pull/47387)
- Table
  - 🆕 Table adds `filterOnClose` to specify whether to trigger filtering when the filter menu is closed. [#47451](https://github.com/ant-design/ant-design/pull/47451) [@xsjcTony](https://github.com/xsjcTony)
  - 🆕 Table adds `components.header.table` to customize the header component when scrolling the column. [#47382](https://github.com/ant-design/ant-design/pull/47382)
  - 🐞 Fix the issue where scroll bars would not be displayed during initial rendering under Table `sticky`. [#47382](https://github.com/ant-design/ant-design/pull/47382)
  - 🐞 Fix the issue where the `th` element is not used in the column header when Table `column.title` is empty. [#47382](https://github.com/ant-design/ant-design/pull/47382)
  - 🐞 Fix the issue where `prefixCls` is invalid when Table uses a virtual list. [#47639](https://github.com/ant-design/ant-design/pull/47639)
  - 💄 Fix abnormal shadow display when Table fixed columns. [#47518](https://github.com/ant-design/ant-design/pull/47518)
- 🐞 Fix the issue where when using DirectoryTree in Tree, pressing shift for continuous multi-selection will report an error. [#47567](https://github.com/ant-design/ant-design/pull/47567) [@wkmyws](https://github.com/wkmyws)
- 🐞 Fix the issue where `isFieldsTouched(true)` always returns `false` when Form exists in Form.List. [#47629](https://github.com/ant-design/ant-design/pull/47629) [@lemonied](https://github.com/lemonied)
- 🐞 Fix the issue of Button being incompatible with v4 `type=''`. [#47612](https://github.com/ant-design/ant-design/pull/47612)
- 🛠 Refactor Typography to omit measurement logic to support dynamic row height scenarios. [#47597](https://github.com/ant-design/ant-design/pull/47597)
- 💄 Remove redundant margin styles from Tag. [#47504](https://github.com/ant-design/ant-design/pull/47504)
- 🤖 MISC: fix an issue that could not be compiled under pnpm configuration `hoist: false`. [#47587](https://github.com/ant-design/ant-design/pull/47587)

## 5.14.2

`2024-02-23`

- 🐞 Fix DatePicker.RangePicker time column sometime not scroll to the target time value. [#47542](https://github.com/ant-design/ant-design/pull/47542)
- 🐞 Fix Modal that pointer events will triggered during openning animation. [#47508](https://github.com/ant-design/ant-design/pull/47508) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Avatar.Group unnecessary dom since tooltip. [#47478](https://github.com/ant-design/ant-design/pull/47478)
- 💄 Fix Progress unexpected margin style. [#47493](https://github.com/ant-design/ant-design/pull/47493) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Table scrollbar color in darkmode. [#47487](https://github.com/ant-design/ant-design/pull/47487) [@wkmyws](https://github.com/wkmyws)
- 💄 Fix Layout content font color in dark mode. [#47441](https://github.com/ant-design/ant-design/pull/47441) [@nova1751](https://github.com/nova1751)
- 💄 Fix Menu cannot customize `darkItemSelectedColor` and `darkItemSelectedBg` token in horizontal dark mode. [#47463](https://github.com/ant-design/ant-design/pull/47463) [@gandavarapurajasekhar](https://github.com/gandavarapurajasekhar)

## 5.14.1

`2024-02-13`

- 🐞 Fix Steps cannot interact correctly when `type="inline"`. [#47406](https://github.com/ant-design/ant-design/pull/47406)
- 🐞 Fix DatePicker &amp; TimePicker arrow position not consider panel border radius distance. [#47389](https://github.com/ant-design/ant-design/pull/47389)
- 🐞 Fix Dropdown should not display when items is empty array. [#47375](https://github.com/ant-design/ant-design/pull/47375)
- 🐞 Fix Tag that should use `defaultBg` token with `bordered={false}`. [#47372](https://github.com/ant-design/ant-design/pull/47372) [@MadCcc](https://github.com/MadCcc)
- 🐞 MISC: Fix that `theme.inherit` should not affect `hashded` and `cssVar`. [#47360](https://github.com/ant-design/ant-design/pull/47360) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Calendar panel not switch when change year or month. [#47361](https://github.com/ant-design/ant-design/pull/47361)
- 💄 Fix Table's sub-table style issue in virtual mode. [#47333](https://github.com/ant-design/ant-design/pull/47333) [@Enigama](https://github.com/Enigama)

## 5.14.0

`2024-02-04`

- 🔥 Refactored the DatePicker component, details are follows. [#46982](https://github.com/ant-design/ant-design/pull/46982)
  - 🆕 DatePicker adds `multiple` to support multiple selection capabilities.
  - 🆕 DatePicker supports `showWeek` attribute.
  - 🆕 DatePicker.RangePicker supports `order` attribute.
  - 🆕 DatePicker `id` attribute under RangePicker supports setting the `id` of the `start` and `end` input boxes separately.
  - 🆕 DatePicker `onFocus` and `onBlur` events of RangePicker will additionally provide an `info.range` to inform which input box the current focus comes from.
  - 🆕 DatePicker add matching `pickerValue` and `defaultPickerValue` attributes to control the date where the expanded panel is located.
  - 🆕 DatePicker add the `preserveInvalidOnBlur` attribute to keep the input content when losing focus in the case of accessibility.
  - 🆕 DatePicker `format` supports the `align` attribute, allowing input content through the mask mode.
  - 🆕 DatePicker Support `required` attribute.
  - 🆕 DatePicker time panel supports `scrollOnChange` to automatically select the corresponding time when scrolling.
  - 🆕 DatePicker add the `needConfirm` attribute to allow setting the confirmation or non-confirmation submission mode.
  - 🆕 DatePicker add the `components` attribute to allow customizing some panels.
  - 🆕 DatePicker all date-related information in the panel will allow configuration through `locale`.
  - 🆕 DatePicker `format` supports `LT` and `LTS` date formats.
  - 🆕 DatePicker add `minDate` and `maxDate` to set the panel switching range.
  - 🐞 DatePicker `defaultPickerValue` will now be reset each time the panel is expanded.
  - 🐞 DatePicker fix the problem that the input box function key will trigger the pop-up box, now it will only be triggered when the interactive key and the input content change.
  - 🐞 DatePicker Losing focus after entering the date through the input box will submit the change instead of losing the input content (that is, it is no longer necessary to press Enter to submit).
  - 🐞 DatePicker fix the problem that the `hour` obtained by `disabledTime` under `use12Hours` will also be clipped to 0~12.
  - 🐞 DatePicker fix the problem that the disabled date is not effective and can still be submitted under some interactions.
  - ⚡️ DatePicker Optimize `disabledDate` check logic, now it will provide `info.type` to inform the current panel information.
  - 🛠 DatePicker `allowClear` trigger event from `onMouseDown` to `onClick`.
  - 🛠 DatePicker Deprecate the `preventDefault` parameter of `onKeyDown`, please call it directly through `event.preventDefault`.
  - 🛠 DatePicker Remove the keyboard interaction with the panel, it needs to be redesigned based on accessibility.
  - 💄 DatePicker Remove the dotted line style of RangePicker to reduce visual interference.
  - 💄 DatePicker Remove the disabled range of RangePicker when selecting start or end time to optimize the interaction experience.
- 🔥 Added support for stacked fixed columns in the Table component. [#47245](https://github.com/ant-design/ant-design/pull/47245)
- 🆕 Added support for `components.body` in the Table component under the `virtual` mode. [#47098](https://github.com/ant-design/ant-design/pull/47098) by [@linxianxi](https://github.com/linxianxi)
- 🆕 Added support for generics in the Segmented `value` type. [#47091](https://github.com/ant-design/ant-design/pull/47091) by [@madocto](https://github.com/madocto)
- 🆕 Added the `changeOnWheel` property to the InputNumber component to enable mouse wheel control. [#47158](https://github.com/ant-design/ant-design/pull/47158) by [@MadCcc](https://github.com/MadCcc)
- 🆕 Added six tokens (`defaultHoverBg`, `defaultHoverColor`, `defaultHoverBorderColor`, `defaultActiveBg`, `defaultActiveColor`, and `defaultActiveBorderColor`) to the Button component. [#47075](https://github.com/ant-design/ant-design/pull/47075) by [@madocto](https://github.com/madocto)
- 🆕 Added `duration` configuration support to the `useNotification` function in the Notification component. This update also applies to the `notification` configuration of the App component. [#47141](https://github.com/ant-design/ant-design/pull/47141)
- 🆕 Added support for configuring `flex` property in responsive layouts of the Grid component. [#47124](https://github.com/ant-design/ant-design/pull/47124)
- 🐞 Improved the Transfer internal padding of the Pagination component. [#47231](https://github.com/ant-design/ant-design/pull/47231) by [@qmhc](https://github.com/qmhc)
- 🐞 Fixed the alignment issue in the Avatar component when the height is less than 16px. [#47236](https://github.com/ant-design/ant-design/pull/47236) by [@lcgash](https://github.com/lcgash)
- 🐞 Fixed the incorrect mouse pointer when the Input component is disabled. [#47280](https://github.com/ant-design/ant-design/pull/47280) by [@MadCcc](https://github.com/MadCcc)
- 🐞 Fixed the issue where the `hoverBorderColor` and `activeBorderColor` token customization didn't work in the Input component. [#47243](https://github.com/ant-design/ant-design/pull/47243) by [@MadCcc](https://github.com/MadCcc)
- 💄 Fixed the issue where the hover style of submenus in the Menu component disappears at the edges. [#47227](https://github.com/ant-design/ant-design/pull/47227) by [@MadCcc](https://github.com/MadCcc)
- 💄 Menu fixed component styling issues in non-hash mode. [#46609](https://github.com/ant-design/ant-design/pull/46609) by [@MadCcc](https://github.com/MadCcc)
- 💄 Added `classNames` and `styles` properties to the Card component. [#46811](https://github.com/ant-design/ant-design/pull/46811) by [@zh-lx](https://github.com/zh-lx)
- ConfigProvider
  - 🆕 Added support for `selectionsIcon` in the Transfer component to ConfigProvide. [#47301](https://github.com/ant-design/ant-design/pull/47301) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `addIcon` and `moreIcon` in the Tabs component to ConfigProvide. [#47274](https://github.com/ant-design/ant-design/pull/47274) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Image component to ConfigProvide. [#47252](https://github.com/ant-design/ant-design/pull/47252) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Tag component to ConfigProvide. [#47250](https://github.com/ant-design/ant-design/pull/47250) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Notification component to ConfigProvide. [#47244](https://github.com/ant-design/ant-design/pull/47244) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Modal component to ConfigProvide. [#47226](https://github.com/ant-design/ant-design/pull/47226) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `expandIcon` in the Table component to ConfigProvide. [#47225](https://github.com/ant-design/ant-design/pull/47225) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Tour component to ConfigProvide. [#47200](https://github.com/ant-design/ant-design/pull/47200) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `icons` in the Drawer component to ConfigProvide. [#46894](https://github.com/ant-design/ant-design/pull/46894) by [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 Added support for `closeIcon` in the Alert component to ConfigProvide. [#47235](https://github.com/ant-design/ant-design/pull/47235) by [@li-jia-nan](https://github.com/li-jia-nan)

## 5.13.3

`2024-01-28`

- Input
  - 🐞 Fix Input.Search width 1px smaller than Input. [#47193](https://github.com/ant-design/ant-design/pull/47193)
  - 🐞 Fix Input inside Space.Compact display incorrectly when `showCount` is `true`. [#47112](https://github.com/ant-design/ant-design/pull/47112) [@huiliangShen](https://github.com/huiliangShen)
- 🐞 Fix Descriptions lost border style when item's children is falsy. [#47191](https://github.com/ant-design/ant-design/pull/47191)
- 🐞 Fix Table `column.onFilter` don't work on tree table data. [#47170](https://github.com/ant-design/ant-design/pull/47170) [@Mumujianguang](https://github.com/Mumujianguang)
- 🐞 Fix Affix `placeholder` height anomaly when browser zoom is 80%. [#46823](https://github.com/ant-design/ant-design/pull/46823) [@zhipenglin](https://github.com/zhipenglin)
- 🐞 Fix QRCode background color in dark mode. [#47128](https://github.com/ant-design/ant-design/pull/47128) [@kampiu](https://github.com/kampiu)
- 🐞 Fix Statistic component don't support html `role` and `data-*` and `aria-*` attributes. [#47149](https://github.com/ant-design/ant-design/pull/47149)
- 🐞 Fix Transfer inverting current page incorrectly. [#47125](https://github.com/ant-design/ant-design/pull/47125) [@linxianxi](https://github.com/linxianxi)
- 💄 Lower the priority of Button `size` styles. [#47074](https://github.com/ant-design/ant-design/pull/47074) [@crazyair](https://github.com/crazyair)
- 🐞 Fix Modal conflicting props bettween `classNames.wrapper` and `centered`. [#47076](https://github.com/ant-design/ant-design/pull/47076) [@sunsunmonkey](https://github.com/sunsunmonkey)
- 🐞 Fix false positive console warning for Spin with `tip` and `fullscreen` used together. [#47015](https://github.com/ant-design/ant-design/pull/47015) [@xsjcTony](https://github.com/xsjcTony)
- 🗑 Remove unused PageHeader locale text and ConfigProvider `pageHeader` property. [#47163](https://github.com/ant-design/ant-design/pull/47163) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Refactor Drawer motion style code. [#47194](https://github.com/ant-design/ant-design/pull/47194)
- Locales
  - 🇮🇹 Added missing it_IT translations for Tour component. [#47148](https://github.com/ant-design/ant-design/pull/47148) [@nikzanda](https://github.com/nikzanda)
  - 🇯🇵 Added missing locale keys in ja_JP locale for Table filters. [#47072](https://github.com/ant-design/ant-design/pull/47072) [@sebastibe](https://github.com/sebastibe)

## 5.13.2

`2024-01-19`

- 🐞 Fix that the inline rendering does not take effect when the `preview.getContainer` value for Image is false. [#47034](https://github.com/ant-design/ant-design/pull/47034) [@FEyudong](https://github.com/FEyudong)
- 🐞 Fix Modal static function with `prefixCls` breaks children other component `prefixCls` and thus bring the motion miss. [#47010](https://github.com/ant-design/ant-design/pull/47010)
- 🐞 Fix ok button of the DatePicker becomes compacted when used with Space.Compact. [#46769](https://github.com/ant-design/ant-design/pull/46769) [@Fatpandac](https://github.com/Fatpandac)
- 💄 Optimize Tree draggable node cursor style and collaspe icon hover style. [#46974](https://github.com/ant-design/ant-design/pull/46974)

## 5.13.1

`2024-01-15`

- 🐞 Fix Checkbox type error with `@types/react` version 16 or 17. [#46962](https://github.com/ant-design/ant-design/pull/46962) [@crazyair](https://github.com/crazyair)

## 5.13.0

`2024-01-13`

- 🔥 Form support `variant` to control components variant inside. [#46573](https://github.com/ant-design/ant-design/pull/46573)
  - 🆕 Cascader、DatePicker、Select、TreeSelect、Input、InputNumber、Mentions support `variant` props. [#46568](https://github.com/ant-design/ant-design/pull/46568) [#46549](https://github.com/ant-design/ant-design/pull/46549) [#46435](https://github.com/ant-design/ant-design/pull/46435) [#46381](https://github.com/ant-design/ant-design/pull/46381) [#46379](https://github.com/ant-design/ant-design/pull/46379) [#46337](https://github.com/ant-design/ant-design/pull/46337)
- 🆕 QRCode support `status` adds a new scanned option. [#46704](https://github.com/ant-design/ant-design/pull/46704)
- 🆕 Table support `hidden` to set hidden columns. [#46957](https://github.com/ant-design/ant-design/pull/46957) [@madocto](https://github.com/madocto)
- 🆕 Select support the `maxCount`, which is used to set the maximum selectable value. [#46667](https://github.com/ant-design/ant-design/pull/46667)
- 🆕 Mentions support `allowClear` for setting the clearing function. [#46396](https://github.com/ant-design/ant-design/pull/46396) [@yociduo](https://github.com/yociduo)
- 🆕 ColorPicker support displaying cleared status. [#45993](https://github.com/ant-design/ant-design/pull/45993)
- 🆕 Drawer adds `styles.wrapper` and discards the `contentWrapperStyle` `drawerStyle` `maskStyle` attributes, and simplifies the dom structure. [#46858](https://github.com/ant-design/ant-design/pull/46858)
- Tour
  - 🆕 Tour support `disabledInteraction`, which is used to disable the interactive behavior of the highlighted area. [#46304](https://github.com/ant-design/ant-design/pull/46304)
  - 🐞 Fixed the issue where modifying `pointAtCenter` under the `arrow` attribute of the Tour component does not take effect. [#46301](https://github.com/ant-design/ant-design/pull/46301)
- Tabs
  - 🆕 Tabs support the `indicator: { align: xxx }` attribute, which is used to set the alignment of the Tabs indicator bar. [#46786](https://github.com/ant-design/ant-design/pull/46786)
  - 🛠 Tabs deprecated the `indicatorSize` attribute and replaced it with `indicator: { size: xxx }`. [#46786](https://github.com/ant-design/ant-design/pull/46786)
- ConfigProvider
  - 🆕 ConfigProvider adds `ConfigProvider.config` to support `holderRender` for `message` `modal` `notification` static method setting `Provider`. [#46596](https://github.com/ant-design/ant-design/pull/46596)
  - 🆕 ConfigProvider support the `indicator: { align: xxx }` attribute, which is used to set the alignment of the Tabs indicator bar. [#46786](https://github.com/ant-design/ant-design/pull/46786)
  - 🛠 ConfigProvider deprecated the Tabs `indicatorSize` attribute and replaced it with `indicator: { size: xxx }`. [#46786](https://github.com/ant-design/ant-design/pull/46786)
- 🐞 Fix the problem of Segmented content being obscured in `hover` and `active`. [#46925](https://github.com/ant-design/ant-design/pull/46925) [@madocto](https://github.com/madocto)
- 🐞 Fixed the problem that the customized font size of Checkbox does not take effect under Form. [#46904](https://github.com/ant-design/ant-design/pull/46904)
- 🐞 Fixed the issue where the Radio component configuration `title` did not take effect. [#46809](https://github.com/ant-design/ant-design/pull/46809)
- 🐞 Fixed Input hover style in css var mode. [#46946](https://github.com/ant-design/ant-design/pull/46946)
- 💄 Fixed the problem of abnormal display of Dropdown style under multi-level menu. [#46888](https://github.com/ant-design/ant-design/pull/46888)
- 🛠 Refactor the popup panel logic of the ColorPicker component to avoid style conflicts when customizing using `panelRender`. [#46327](https://github.com/ant-design/ant-design/pull/46327)
- TypeScript
  - 🆕 MISC: Export `GetProp` `GetProps` `GetRef` tool methods to facilitate developers to obtain unexported type definitions. [#46923](https://github.com/ant-design/ant-design/pull/46923)
  - 🆕 Checkbox.Group now supports generic configurable `options.value`. [#46423](https://github.com/ant-design/ant-design/pull/46423) [@daledelv](https://github.com/daledelv)
- 🌈 Token
  - 🆕 Button support the `contentLineHeight` series of tokens. [#46936](https://github.com/ant-design/ant-design/pull/46936)
  - 🆕 Input support `inputFontSize` token. [#46875](https://github.com/ant-design/ant-design/pull/46875)
  - 🆕 Menu support `darkPopupBg` token. [#46618](https://github.com/ant-design/ant-design/pull/46618)
  - 🆕 Segmented support `trackPadding` and `trackBg` token. [#46674](https://github.com/ant-design/ant-design/pull/46674)
  - 🐞 Fix the problem that `paddingBlock` does not take effect after customizing `contentFontSize` token in Button component. [#46901](https://github.com/ant-design/ant-design/pull/46901)
  - 🐞 Fixed the issue where the InputNumber component cannot customize the `padding` token. [#46878](https://github.com/ant-design/ant-design/pull/46878)
- 🌐 Localization
  - 🇩🇰 Improve da_DK Form local. [#46493](https://github.com/ant-design/ant-design/pull/46493) [@Eloi0424](https://github.com/Eloi0424)

## 5.12.8

`2024-01-05`

- 🐞 Fix Upload.Dragger not align center and focus ring style. [#46810](https://github.com/ant-design/ant-design/pull/46810)
- 🐞 Fix Popconfirm config empty `okText` and `cancelText` will not fallback to locale text. [#46812](https://github.com/ant-design/ant-design/pull/46812)
- 🐞 Fix Progress that line border-radius cannot be overrided. [#46789](https://github.com/ant-design/ant-design/pull/46789)
- 🐞 Fix Typography without `children` has extra `margin-left` when `copyable` is true. [#46748](https://github.com/ant-design/ant-design/pull/46748)
- 🐞 Fix Typography copied icon color. [#46748](https://github.com/ant-design/ant-design/pull/46748)

## 5.12.7

`2024-01-02`

- 🐞 MISC: Fix error caused by upgrading `@ctrl/tinycolor@4.0.2`. [#46744](https://github.com/ant-design/ant-design/pull/46744) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Mentions item height bug. [#46737](https://github.com/ant-design/ant-design/pull/46737)

## 5.12.6

`2023-12-30`

- 🐞 Fix Upload accessibility issue of tabbing twicely. [#46432](https://github.com/ant-design/ant-design/pull/46432)
- 🐞 Fix Modal `footer` Button duplicated gap style. [#46702](https://github.com/ant-design/ant-design/pull/46702)
- Select
  - 🐞 Fix Select that scrollbar do not display in some case. [#46696](https://github.com/ant-design/ant-design/pull/46696) [@MadCcc](https://github.com/MadCcc)
  - 💄 Optimize Select style of multiple selection. [#46646](https://github.com/ant-design/ant-design/pull/46646) [@MadCcc](https://github.com/MadCcc)
- Tree
  - 🐞 Fix Tree that scrollbar do not display in some case. [#46672](https://github.com/ant-design/ant-design/pull/46672) [@yyz945947732](https://github.com/yyz945947732)
  - 💄 Optimize Tree the TreeNode style when focused. [#46608](https://github.com/ant-design/ant-design/pull/46608) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Layout.Sider will collapse when trigger printer. [#46650](https://github.com/ant-design/ant-design/pull/46650) [@anilpixel](https://github.com/anilpixel)
- 🐞 Fix Table style with edge shadow overflow. [#46644](https://github.com/ant-design/ant-design/pull/46644) [@Fatpandac](https://github.com/Fatpandac)
- 🐞 Typography.Text should update the Tooltip when the width changes. [#46613](https://github.com/ant-design/ant-design/pull/46613) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix Tooltip, Popover or other popup like component arrow issue when in nest case. [#46294](https://github.com/ant-design/ant-design/pull/46294) [@bestlyg](https://github.com/bestlyg)
- TypeScript
  - 🤖 Export ConfigProvider `ConfigProviderProps` type. [#46605](https://github.com/ant-design/ant-design/pull/46605) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.12.5

`2023-12-22`

- 💄 Fix Tabs style issue of editable mode when there is only "new" button left. [#46585](https://github.com/ant-design/ant-design/pull/46585) [@hzyhbk](https://github.com/hzyhbk)
- 💄 Fix Progress style issue of `line` mode with `strokeLinecap`. [#46551](https://github.com/ant-design/ant-design/pull/46551) [@ZN1996](https://github.com/ZN1996)
- 🐞 Fix ColorPicker not support `prefixCls`. [#46561](https://github.com/ant-design/ant-design/pull/46561)

## 5.12.4

`2023-12-19`

- 🐞 Fix DatePicker style in `cssVar` mode. [#46526](https://github.com/ant-design/ant-design/pull/46526)

## 5.12.3

`2023-12-18`

- 💄 Fix Tag that style would be missing in SSR. [#46500](https://github.com/ant-design/ant-design/pull/46500) [@MadCcc](https://github.com/MadCcc)
- 🐞 Upload `disabled` prop should not affect download icon. [#46454](https://github.com/ant-design/ant-design/pull/46454)
- 💄 Upload.Dragger add vertical padding style. [#46457](https://github.com/ant-design/ant-design/pull/46457)
- 🐞 Fix Upload actions color issue. [#46456](https://github.com/ant-design/ant-design/pull/46456)
- 🐞 Fix Form with `getValueProps` not working with value update. [#46445](https://github.com/ant-design/ant-design/pull/46445)
- 💄 Fix Checkbox style when customize `token.lineWidth`. [#46431](https://github.com/ant-design/ant-design/pull/46431)
- 🐞 Fix Select that custom token make `padding` broken. [#46427](https://github.com/ant-design/ant-design/pull/46427) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Message that token overrides not work in `cssVar` mode. [#46415](https://github.com/ant-design/ant-design/pull/46415) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Flex component don't apply extra style. [#46404](https://github.com/ant-design/ant-design/pull/46404) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.12.2

`2023-12-11`

- 🐞 MISC: Fix `useId` error when webpack build with React 17. [#46261](https://github.com/ant-design/ant-design/pull/46261)
- Pagination
  - 🐞 Fix Pagination throws error in legacy browsers. [react-component/pagination#545](https://github.com/react-component/pagination/pull/545)
  - 🐞 Fix Pagination `current` not working in `simple` mode. [react-component/pagination#546](https://github.com/react-component/pagination/pull/546)
- 🐞 Fix Table filter dropdown lost background color in CSS variables mode. [#46314](https://github.com/ant-design/ant-design/pull/46314)
- 🐞 Prevent interaction when Spin component enable `fullscreen` prop. [#46303](https://github.com/ant-design/ant-design/pull/46303) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Form `hideRequiredMark` prop's priority compared with ConfigProvider `form` prop. [#46299](https://github.com/ant-design/ant-design/pull/46299) [@linhf123](https://github.com/linhf123)
- TypeScript
  - 🤖 Fix Descriptions `id` type. [#46367](https://github.com/ant-design/ant-design/pull/46367) [@RSS1102](https://github.com/RSS1102)

## 5.12.1

`2023-12-04`

- 🐞 MISC: Fix missing color less variables converted from token. [#46250](https://github.com/ant-design/ant-design/pull/46250)
- 🐞 Fix Notification title overlaps with the close icon when it is too long. [#46211](https://github.com/ant-design/ant-design/pull/46211) [@zh-lx](https://github.com/zh-lx)

## 5.12.0

`2023-12-04`

- 🔥 Component Token support CSS variables mode. For more detail, see [CSS Variables](/docs/react/css-variables). Special thank for contributors of this feature: [@li-jia-nan](https://github.com/li-jia-nan) [@RedJue](https://github.com/RedJue) [@c0dedance](https://github.com/c0dedance) [@kiner-tang](https://github.com/kiner-tang) [@JarvisArt](https://github.com/JarvisArt) [@cc-hearts](https://github.com/cc-hearts)
- 🛠 Refactor rc-pagination from class component to FC. [#46204](https://github.com/ant-design/ant-design/pull/46204) [@Wxh16144](https://github.com/Wxh16144)
- 🆕 Alert could support linear-gradient background by `colorInfoBg` token. [#46188](https://github.com/ant-design/ant-design/pull/46188)
- 🆕 `Form.useWatch` support selector function param. [#46180](https://github.com/ant-design/ant-design/pull/46180) [@crazyair](https://github.com/crazyair)
- 🆕 Slider support `onChangeComplete` and deprecate `onAfterChange`. [#46182](https://github.com/ant-design/ant-design/pull/46182) [@MadCcc](https://github.com/MadCcc)
- 🆕 Tabs `items` support `icon` prop. [#46096](https://github.com/ant-design/ant-design/pull/46096) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Tour supports `getPopupContainer` property. [#45751](https://github.com/ant-design/ant-design/pull/45751) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Switch support for `value` and `defaultValue` props. [#45747](https://github.com/ant-design/ant-design/pull/45747) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix that clicking Form `tooltip` icon should not trigger Switch. [#46155](https://github.com/ant-design/ant-design/pull/46155)
- 🐞 Fix Notification that icon should have line-height. [#46148](https://github.com/ant-design/ant-design/pull/46148) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Progress that gradient in line should follow percent. [#46209](https://github.com/ant-design/ant-design/pull/46209) [@MadCcc](https://github.com/MadCcc)
- 💄 Button could be customized to gradient style. [#46192](https://github.com/ant-design/ant-design/pull/46192)
- 💄 Fix style of InputNumber with `addon` inside Space.Compact. [#46130](https://github.com/ant-design/ant-design/pull/46130) [@MadCcc](https://github.com/MadCcc)
- TypeScript
  - 🤖 Update `FloatButtonProps` type with `React.DOMAttributes` in FloatButton. [#46175](https://github.com/ant-design/ant-design/pull/46175) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.11.5

`2023-11-27`

- 🐞 MISC: Fix error in `dist` artifact. [#46103](https://github.com/ant-design/ant-design/pull/46103) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix DatePicker style when disabled and hovered. [#45940](https://github.com/ant-design/ant-design/pull/45940) [@crazyair](https://github.com/crazyair)

## 5.11.4

`2023-11-24`

- 🐞 Fix where Image sets `z-index` abnormally in nested Modal. [#46035](https://github.com/ant-design/ant-design/pull/46035)
- 🐞 Fix Button that disabled link button should not have navigate options when right click. [#46021](https://github.com/ant-design/ant-design/pull/46021)
- Card
  - 🛠 Refactor the Card internal method `getAction` into a function component. [#46032](https://github.com/ant-design/ant-design/pull/46032)
  - 🐞 Fix the problem of Card warning `invalid annotation` in Rollup. [#46024](https://github.com/ant-design/ant-design/pull/46024)
- TypeScript
  - 🤖 Export the type definition for the `required` property of the Radio and Checkbox components. [#46028](https://github.com/ant-design/ant-design/pull/46028) [@nnmax](https://github.com/nnmax)

## 5.11.3

`2023-11-22`

- 🐞 Fix Modal static method create `zIndex` too high will cover other popup content. [#46012](https://github.com/ant-design/ant-design/pull/46012)
- Image
  - 🆕 Image preview support mobile touch interactive. [#45989](https://github.com/ant-design/ant-design/pull/45989) [@JarvisArt](https://github.com/JarvisArt)
  - 🐞 Fixed Image preview `z-index` conflict when in a nested pop-up. [#45979](https://github.com/ant-design/ant-design/pull/45979) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Collapse header cursor style. [#45994](https://github.com/ant-design/ant-design/pull/45994)
- 🐞 Fix ColorPicker not support Form disabled config. [#45978](https://github.com/ant-design/ant-design/pull/45978) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Typography.Text `ellipsis.tooltip` cannot open under Layout component. [#45962](https://github.com/ant-design/ant-design/pull/45962)
- 🐞 Remove Select native 🔍 icon from search input in Safari. [#46008](https://github.com/ant-design/ant-design/pull/46008)
- 💄 Remove Rate useless style. [#45927](https://github.com/ant-design/ant-design/pull/45927) [@JarvisArt](https://github.com/JarvisArt)
- 🛠 UMD `antd.js` will try to reuse global `@ant-design/cssinjs` first now. [#46009](https://github.com/ant-design/ant-design/pull/46009)
- 🌐 Improve `eu_ES` localization. [#45928](https://github.com/ant-design/ant-design/pull/45928) [@ionlizarazu](https://github.com/ionlizarazu)

## 5.11.2

`2023-11-17`

- 🆕 Table with `virtual` can now customize `components` except the `components.body`. [#45857](https://github.com/ant-design/ant-design/pull/45857)
- 🐞 Fix Button with href and disabled that could be focused. [#45910](https://github.com/ant-design/ant-design/pull/45910) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix `zIndex` logic problem that message and notification are covered when multiple Modal are opened. [#45911](https://github.com/ant-design/ant-design/pull/45911) [#45864](https://github.com/ant-design/ant-design/pull/45864) [@kiner-tang](https://github.com/kiner-tang)
- 💄 Fix QRCode `style.padding` is not working. [#45815](https://github.com/ant-design/ant-design/pull/45815)
- 💄 Optimize Carousel dots border radius style. [#45817](https://github.com/ant-design/ant-design/pull/45817)
- TypeScript
  - 🤖 Optimize List `gutter` property type definition. [#45791](https://github.com/ant-design/ant-design/pull/45791) [@Asanio06](https://github.com/Asanio06)

## 5.11.1

`2023-11-09`

- 🐞 Fix Dropdown use wrong `zIndex` when nest items. [#45761](https://github.com/ant-design/ant-design/pull/45761)
- 🐞 Fix Upload should show remove icon when `showRemoveIcon` is specified to true explicitly. [#45752](https://github.com/ant-design/ant-design/pull/45752)
- 🐞 Fix Descriptions use `children` structure missing the Descriptions.Item `key` prop. [#45757](https://github.com/ant-design/ant-design/pull/45757)
- 🐞 Fix Message that token specified in component scope not work. [#45721](https://github.com/ant-design/ant-design/pull/45721) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Popconfirm not compatible with `visible` prop. [#45702](https://github.com/ant-design/ant-design/pull/45702) [@linhf123](https://github.com/linhf123)
- 🐞 Fix Tag default background color not correct. [#45711](https://github.com/ant-design/ant-design/pull/45711) [@kiner-tang](https://github.com/kiner-tang)
- 💄 Fix Notification that `style.width` not work. [#45681](https://github.com/ant-design/ant-design/pull/45681) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix App console unexpected attr warning when set `component=false`. [#45671](https://github.com/ant-design/ant-design/pull/45671) [@li-jia-nan](https://github.com/li-jia-nan)
- TypeScript
  - 🤖 App support generic type definition. [#45669](https://github.com/ant-design/ant-design/pull/45669) [@JexLau](https://github.com/JexLau)

## 5.11.0

`2023-11-03`

- Slider
  - 🆕 Slider will show tooltip when focus handler. [#45653](https://github.com/ant-design/ant-design/pull/45653)
  - 💄 Slider handler should be movable after click tracker. [#45651](https://github.com/ant-design/ant-design/pull/45651)
- InputNumber
  - 🆕 InputNumber support `changeOnBlur` prop to disable trigger `onChange` event when blur. [#45395](https://github.com/ant-design/ant-design/pull/45395)
  - 🐞 Fix InputNumber in Form with `hasFeedback` that will lose focus when feedback icon appear. [#45632](https://github.com/ant-design/ant-design/pull/45632) [@MadCcc](https://github.com/MadCcc)
  - 🐞 Fix InputNumber dynamic modify `formatter` not working. [#45325](https://github.com/ant-design/ant-design/pull/45325)
- Table
  - 🆕 Table `columnTitle` support render function. [#41937](https://github.com/ant-design/ant-design/pull/41937) [@Zhou-Bill](https://github.com/Zhou-Bill)
  - 🛠 Refactor Table `ref` to support `scrollTo` to scroll to target `key` or `index` or `top`. [#45245](https://github.com/ant-design/ant-design/pull/45245)
- Tabs
  - 🆕 Tabs `items` support tab pane level `destroyInactiveTabPane`. [#45359](https://github.com/ant-design/ant-design/pull/45359)
  - 🐞 Fix Tabs overflow blinking when Tab bar has decimal width. [#45370](https://github.com/ant-design/ant-design/pull/45370)
- ConfigProvider
  - 🆕 ConfigProvider support RangePicker `className` and `style` properties. [#45479](https://github.com/ant-design/ant-design/pull/45479) [@chenzhuo198](https://github.com/chenzhuo198)
  - 🆕 ConfigProvider support Dropdown `className` and `style` properties. [#45621](https://github.com/ant-design/ant-design/pull/45621) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 ColorPicker `preset` prop support `defaultOpen` to control whether preset colors is open by default. [#45607](https://github.com/ant-design/ant-design/pull/45607) [@Wxh16144](https://github.com/Wxh16144)
- 🆕 Select support `optionRender` prop. [#45529](https://github.com/ant-design/ant-design/pull/45529) [@RedJue](https://github.com/RedJue)
- 🆕 Pagination support combine `simple` and `showSizeChanger`. [#45538](https://github.com/ant-design/ant-design/pull/45538)
- 🆕 Spin support `fullscreen` to display as backdrop. [#44986](https://github.com/ant-design/ant-design/pull/44986) [@Rafael-Martins](https://github.com/Rafael-Martins) [#45436](https://github.com/ant-design/ant-design/pull/45436) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Form `validateFields` support `dirty` for validating touched and validated fields. [#45389](https://github.com/ant-design/ant-design/pull/45389)
- 🆕 Watermark support `inherit` prop to disable watermark pass to Drawer and Modal. [#45319](https://github.com/ant-design/ant-design/pull/45319)
- 🆕 App support `component` for customization. [#45292](https://github.com/ant-design/ant-design/pull/45292)
- 🆕 Input and Input.TextArea support `count` custom character count (for example, fix emoji character length to `1`); `count.max` supports out-of-range styles; restore emoji to native count to solve the problem of `maxLength` and `value` mismatch. [#45140](https://github.com/ant-design/ant-design/pull/45140)
- 🐞 Fix Dropdown not trigger `onOpenChange` when click menu item to close the popup. [#45378](https://github.com/ant-design/ant-design/pull/45378)
- 💄 Modal static function support `styles`. [#45558](https://github.com/ant-design/ant-design/pull/45558) [@KotoriK](https://github.com/KotoriK)
- 💄 Optimize z-index logic of popup components, and make them don't block each other by default. [#45512](https://github.com/ant-design/ant-design/pull/45512) [#45490](https://github.com/ant-design/ant-design/pull/45490) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Menu. [#45498](https://github.com/ant-design/ant-design/pull/45498) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of DatePicker and TimePicker. [#45497](https://github.com/ant-design/ant-design/pull/45497) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Drawer. [#45496](https://github.com/ant-design/ant-design/pull/45496) [#45417](https://github.com/ant-design/ant-design/pull/45417) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Cascader, TreeSelect and AutoComplete. [#45494](https://github.com/ant-design/ant-design/pull/45494) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Dropdown. [#45486](https://github.com/ant-design/ant-design/pull/45486) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Tour. [#45425](https://github.com/ant-design/ant-design/pull/45425) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Tooltip. [#45422](https://github.com/ant-design/ant-design/pull/45422) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Popover. [#45420](https://github.com/ant-design/ant-design/pull/45420) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Popconfirm. [#45421](https://github.com/ant-design/ant-design/pull/45421) [@kiner-tang](https://github.com/kiner-tang)
  - Optimize z-index logic of Modal and Select. [#45346](https://github.com/ant-design/ant-design/pull/45346) [@kiner-tang](https://github.com/kiner-tang)

## 5.10.3

`2023-10-30`

- 💄 Fix Typography.Text lost right border when enable `ellipsis` and `code`. [#45575](https://github.com/ant-design/ant-design/pull/45575)
- 💄 Modify the TimePicker scroll bar style. [#45478](https://github.com/ant-design/ant-design/pull/45478) [@GeorgeHcc](https://github.com/GeorgeHcc) [#45586](https://github.com/ant-design/ant-design/pull/45586)
- 🆕 FloatButton.BackTop `ref` support `nativeElement`. [#45547](https://github.com/ant-design/ant-design/pull/45547) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Watermark that `gap` should have default value when passing `undefined` in array. [#45537](https://github.com/ant-design/ant-design/pull/45537) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Dropdown always closes after clicking on an item. [#45513](https://github.com/ant-design/ant-design/pull/45513) [@vyachsed](https://github.com/vyachsed)
- 💄 Fix Notification style issue in windows system. [#45500](https://github.com/ant-design/ant-design/pull/45500) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Notification duplicated `style` applied to wrapper. [#45487](https://github.com/ant-design/ant-design/pull/45487) [@MadCcc](https://github.com/MadCcc)
- TypeScript
  - 🐞 Fix `modal` return type in `App.useApp` hook. [#45462](https://github.com/ant-design/ant-design/pull/45462) [@mjss](https://github.com/mjss)

## 5.10.2

`2023-10-21`

- 🐞 Layout support auto `hasSider` check to avoid blink in SSR. [#45361](https://github.com/ant-design/ant-design/pull/45361)
- 🐞 Fix FloatButton.BackTop throws warning `findDOMNode is deprecated in StrictMode`. [#45390](https://github.com/ant-design/ant-design/pull/45390) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix ColorPicker does not supports `id` and `data-*` attributes. [#45413](https://github.com/ant-design/ant-design/pull/45413) [@cheng87126](https://github.com/cheng87126)
- 🐞 Fix Table sorter tooltip cannot be open when `column.showSorterTooltip` is a object. [#45403](https://github.com/ant-design/ant-design/pull/45403)
- 🐞 Fix `Form` with `inline` mode makes elements overlap on the small screen. [#45340](https://github.com/ant-design/ant-design/pull/45340) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Remove duplicate disabled styles in Upload.Dragger. [#45446](https://github.com/ant-design/ant-design/pull/45446) [@vagusX](https://github.com/vagusX)
- TypeScript
  - 🐞 Table `pagination.position` should accept `'none'`. [#45398](https://github.com/ant-design/ant-design/pull/45398)
- RTL
  - 💄 Fix Notification's incorrect `margin` in `rtl` mode. [#45386](https://github.com/ant-design/ant-design/pull/45386)

## 5.10.1

`2023-10-15`

- ⚡️ Optimize CSS-in-JS Design Token cache matching. [#45302](https://github.com/ant-design/ant-design/pull/45302)
- 🆕 Checkbox.Group &amp; Radio.Group `options` add missing `id` props. [#45287](https://github.com/ant-design/ant-design/pull/45287)
- 🐞 Fix Affix that `target` not work. [#45314](https://github.com/ant-design/ant-design/pull/45314) [@mingming-ma](https://github.com/mingming-ma)
- 🐞 MISC: Add `csp` attribute for icon style. [#45334](https://github.com/ant-design/ant-design/pull/45334) [@AlexeyTeterin](https://github.com/AlexeyTeterin)
- 🐞 Fix Button that does not display loading status when `loading` property is set to `{ delay: 0 }`. [#45282](https://github.com/ant-design/ant-design/pull/45282) [@YDFlame13](https://github.com/YDFlame13)
- 🐞 Fix Segmented text jump issue in Safari. [#45310](https://github.com/ant-design/ant-design/pull/45310)
- 🐞 Fix Watermark that can be hidden via "Hide Element" feature in browser. [#45290](https://github.com/ant-design/ant-design/pull/45290) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Input that background should not be transparent when hovered or focused. [#45297](https://github.com/ant-design/ant-design/pull/45297) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Form call `resetFields` will still keep Form.List field when its `initialValue` is set. [#45284](https://github.com/ant-design/ant-design/pull/45284)
- 🐞 Fix Tree.DirectoryTree `selectedNodes` in `onSelect` method could not get a value when configuring `fieldNames`. [#45036](https://github.com/ant-design/ant-design/pull/45036) [@Zian502](https://github.com/Zian502)
- 💄 Revert outline style of Input, InputNumber, Select, Cascader, TreeSelect, DatePicker, TimePicker, ColorPicker. [#45286](https://github.com/ant-design/ant-design/pull/45286) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Card style with small size Tabs. [#45272](https://github.com/ant-design/ant-design/pull/45272) [@MadCcc](https://github.com/MadCcc)

## 5.10.0

`2023-10-10`

- 🔥 New component Flex, used to set flexible layout. [#44362](https://github.com/ant-design/ant-design/pull/44362)
- 🔥 Notification component supports `stack` configuration. By default, more than three notifications will be stacked. [#44618](https://github.com/ant-design/ant-design/pull/44618)
- 🔥 Update the active styles of Input, InputNumber, Select, Cascader, TreeSelect, DatePicker, and ColorPicker. [#45009](https://github.com/ant-design/ant-design/pull/45009)
- 🆕 Watermark supports setting the text alignment direction through `textAlign`. [#44888](https://github.com/ant-design/ant-design/pull/44888) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Slider supports any number of nodes and migrates xxxStyles to semantic `styles` and `classNames` properties. [#45000](https://github.com/ant-design/ant-design/pull/45000)
- 🆕 Cascader supports the Cascader.Panel component for inline use. [#45089](https://github.com/ant-design/ant-design/pull/45089)
- 🆕 Tooltip adds `fresh` attribute to support scenarios where content still needs to be updated when closed. [#45020](https://github.com/ant-design/ant-design/pull/45020)
- 🆕 Drawer supports customizing the `className` of built-in modules through `classNames`. [#44935](https://github.com/ant-design/ant-design/pull/44935)
- 🆕 ConfigProvider supports the `warning` attribute to configure warning levels (e.g. filter out deprecated API warnings). [#44809](https://github.com/ant-design/ant-design/pull/44809)
- Modal
  - 🆕 Modal supports customizing the `className` of built-in modules through `classNames`. [#44934](https://github.com/ant-design/ant-design/pull/44934)
  - 🐞 Fixed the content overflow problem when Modal.confirm `description` is a long text. [#45212](https://github.com/ant-design/ant-design/pull/45212)
- 🐞 Fix the problem that the nested Typography of Menu.Item cannot be vertically centered when `ellipsis` is true. [#41146](https://github.com/ant-design/ant-design/pull/41146) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Select internal input not being able to apply fontFamily. [#45197](https://github.com/ant-design/ant-design/pull/45197) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix InputNumber border issue when using `addonBefore` in Space.Compact. [#45004](https://github.com/ant-design/ant-design/pull/45004) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix the problem that Tag.CheckableTag does not support ref. [#45164](https://github.com/ant-design/ant-design/pull/45164) [@mingming-ma](https://github.com/mingming-ma)
- 🐞 Fixed the issue where the font in the Avatar.Group component does not support responsiveness. [#34722](https://github.com/ant-design/ant-design/pull/34722) [@laishiwen](https://github.com/laishiwen)
- 🛠 Refactor Affix into a functional component. [#42674](https://github.com/ant-design/ant-design/pull/42674)
- 🛠 The Popover component deprecates the `minWidth` component token and adds `titleMinWidth` as a replacement. [#44750](https://github.com/ant-design/ant-design/pull/44750)
- 🌈 Token
  - 🆕 Input adds `hoverBg` `activeBg` token to set the input box hover and activation background color. [#44752](https://github.com/ant-design/ant-design/pull/44752) [@Pan-yongyong](https://github.com/Pan-yongyong)
  - 🆕 Descriptions Added `titleColor` and `contentColor` to set the title color and content area text color. [#44729](https://github.com/ant-design/ant-design/pull/44729) [@Child-qjj](https://github.com/Child-qjj)
  - 🐞 Fixed the issue where the Input component Token `addonBg` is invalid. [#45222](https://github.com/ant-design/ant-design/pull/45222)
- TypeScript
  - 🤖 The ArgsProps type for exported Notification is NotificationArgsProps. [#45147](https://github.com/ant-design/ant-design/pull/45147)
- 🌐 Locales
  - 🇵🇱 Added Tour locales for pl_PL. [#45166](https://github.com/ant-design/ant-design/pull/45166) [@antonisierakowski](https://github.com/antonisierakowski)
  - 🇰🇷 Optimize ko_KR locales. [#45150](https://github.com/ant-design/ant-design/pull/45150) [@owjs3901](https://github.com/owjs3901)

## 5.9.4

`2023-09-28`

- Button
  - 🐞 Fix Button that two Chinese characters in nested span should have space between. [#45126](https://github.com/ant-design/ant-design/pull/45126) [@MadCcc](https://github.com/MadCcc)
  - 🐞 Fix Button unexpected loading icon when conditional rendering. [#45030](https://github.com/ant-design/ant-design/pull/45030) [@lzl0304](https://github.com/lzl0304)
- 🐞 Fix Tour that `step.type` didn't work when shown at first time. [#45086](https://github.com/ant-design/ant-design/pull/45086) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Select and DatePicker that input should use `fontFamily` token. [#45088](https://github.com/ant-design/ant-design/pull/45088) [@MadCcc](https://github.com/MadCcc)

## 5.9.3

`2023-09-25`

- 🔥 Tooltip delete the logic of wrap `span` on `disabled` element. It can always work as expect on disabled element now. [#44895](https://github.com/ant-design/ant-design/pull/44895) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Popover that should shift automaticly when overflowed. [#45015](https://github.com/ant-design/ant-design/pull/45015) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Tooltip / Popover position jump when content height changed. [#44976](https://github.com/ant-design/ant-design/pull/44976)
- 🛠 ComponentToken remove `radiusBase` must less than `16` limitation. [#44980](https://github.com/ant-design/ant-design/pull/44980)
- 🐞 Fix Dropdown can not give `ref` for the root children rendered by `dropdownRender`. [#44971](https://github.com/ant-design/ant-design/pull/44971)
- 🐞 Fix Table `cellPaddingBlock` not working. [#45040](https://github.com/ant-design/ant-design/pull/45040)
- 🐞 Fix Input wrong height with small `controlHeight`. [#45048](https://github.com/ant-design/ant-design/pull/45048)
- 🐞 Fix Typography style issue when `fontSize` is odd. [#45031](https://github.com/ant-design/ant-design/pull/45031)
- TypeScript
  - 🤖 MISC: Fix `@types/react@18.2.22` React.Key type errors. [#44938](https://github.com/ant-design/ant-design/pull/44938)

## 5.9.2

`2023-09-19`

- 🐞 Fix Table selection column not align in center when `size` is `small`. [#44922](https://github.com/ant-design/ant-design/pull/44922)
- 🐞 Fix Select style problem when `label` contains `div` element. [#44927](https://github.com/ant-design/ant-design/pull/44927)
- 🐞 Fix Modal broken style of buttons when custom `footer`. [#44929](https://github.com/ant-design/ant-design/pull/44929) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix notification wrong pop-up animation when `placement` is `bottom`. [#44918](https://github.com/ant-design/ant-design/pull/44918) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix missing inherited feedbackIcon in Form.Item with `noStyle`. [#44937](https://github.com/ant-design/ant-design/pull/44937)

## 5.9.1

`2023-09-15`

- 🐞 Fix Select that `controlHeightSM` not work in small size. [#44859](https://github.com/ant-design/ant-design/pull/44859) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix Rate that star transaform not at center. [#44855](https://github.com/ant-design/ant-design/pull/44855) [@MadCcc](https://github.com/MadCcc)
- 🐞 Fix DatePicker that in `dateTime` mode switching input didn't trigger `onCalendarChange`. [#44845](https://github.com/ant-design/ant-design/pull/44845) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Table `virtual` selection checkbox or radio not align in center. [#44786](https://github.com/ant-design/ant-design/pull/44786)
- 🐞 Fix Select carbin align top bug when enable `maxTagCount`. [#44757](https://github.com/ant-design/ant-design/pull/44757)
- 🐞 Fix Select alignment issue when label is Typography. [#44756](https://github.com/ant-design/ant-design/pull/44756)
- 💄 Fix Table with `virtual` display issue about columns less than table size and some border &amp; hover style missing. [#44818](https://github.com/ant-design/ant-design/pull/44818)
- 💄 Fix wrong style of Select in Input `addon`. [#44825](https://github.com/ant-design/ant-design/pull/44825) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Tree that Checkbox should be aligned with first line. [#44827](https://github.com/ant-design/ant-design/pull/44827) [@MadCcc](https://github.com/MadCcc)
- 💄 Fix Card that Card.Grid has wrong style with left bottom corner. [#44801](https://github.com/ant-design/ant-design/pull/44801) [@Jason-huang66](https://github.com/Jason-huang66)
- 💄 Fix Select/Cascader/TreeSelect style issue when customize their height. [#44753](https://github.com/ant-design/ant-design/pull/44753)
- TypeScript
  - 🤖 Optimize `ref` type of Radio.Button. [#44747](https://github.com/ant-design/ant-design/pull/44747) [@LexiosAlex](https://github.com/LexiosAlex)
  - 🤖 Optimize `ref` type of Checkbox. [#44746](https://github.com/ant-design/ant-design/pull/44746) [@LexiosAlex](https://github.com/LexiosAlex)

## 5.9.0

`2023-09-08`

- 🔥 Table component now supports the `virtual` attribute to enable virtual scrolling. [#44349](https://github.com/ant-design/ant-design/pull/44349)
- 🔥 Form's `validateFields` now supports `recursive` to validate all fields with nested paths. [#44130](https://github.com/ant-design/ant-design/pull/44130)
- 🔥 Form.Item now supports `validateDebounce` to configure validation debounce. [#44633](https://github.com/ant-design/ant-design/pull/44633)
- 🆕 Button component has added three component tokens: `contentFontSize`, `contentFontSizeSM`, and `contentFontSizeLG`, allowing customization of font sizes for different sizes. [#44257](https://github.com/ant-design/ant-design/pull/44257)
- 🆕 Form's `requiredMark` now supports custom rendering. [#44073](https://github.com/ant-design/ant-design/pull/44073)
- 🆕 Tabs component has added a new component token `itemColor` to control the text color of normal tabs. [#44201](https://github.com/ant-design/ant-design/pull/44201)
- 🆕 ColorPicker now supports `defaultFormat`. [#44487](https://github.com/ant-design/ant-design/pull/44487) [@CYBYOB](https://github.com/CYBYOB)
- 🆕 Form supports `feedbackIcons` and Form.Item supports `hasFeedback={{ icons: ... }}`, now feedback icons could be customized in both ways. [#43894](https://github.com/ant-design/ant-design/pull/43894) [@gldio](https://github.com/gldio)
- 🆕 Added the `itemSelectedColor` component token to the Segmented component. [#44570](https://github.com/ant-design/ant-design/pull/44570) [@xiaozisong](https://github.com/xiaozisong)
- 🆕 Added support for custom function rendering in the Modal footer. [#44318](https://github.com/ant-design/ant-design/pull/44318) [@RedJue](https://github.com/RedJue)
- 🆕 Added responsive setting support for `items.span` in Descriptions. [#44534](https://github.com/ant-design/ant-design/pull/44534)
- 🆕 Added support for global configuration of `indicatorSize` in Tabs component through ConfigProvider. [#44517](https://github.com/ant-design/ant-design/pull/44517)
- 🆕 Added the `direction` parameter to the `filterOption` function in the Transfer component. [#44417](https://github.com/ant-design/ant-design/pull/44417) [@Zian502](https://github.com/Zian502)
- 🆕 Added support for the `source` parameter in the `onSearch` method of the Input.Search component. [#44457](https://github.com/ant-design/ant-design/pull/44457) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Added a component token to the Input component for customizing the shadow when activated. [#44410](https://github.com/ant-design/ant-design/pull/44410)
- 🆕 Added a component token to the Radio component for customizing the color when the fill button is selected. [#44389](https://github.com/ant-design/ant-design/pull/44389)
- 🆕 Tour component now supports horizontal offset for spacing. [#44377](https://github.com/ant-design/ant-design/pull/44377) [@RedJue](https://github.com/RedJue)
- 🆕 Tour component now supports customizing the close button using the `closeIcon` prop. [#44312](https://github.com/ant-design/ant-design/pull/44312) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Avatar component now supports configuring size using ConfigProvider. [#44288](https://github.com/ant-design/ant-design/pull/44288) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 List component now supports configuring size using ConfigProvider's `componentSize` option. [#44267](https://github.com/ant-design/ant-design/pull/44267) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Cascader component now supports `autoClearSearchValue` option. [#44033](https://github.com/ant-design/ant-design/pull/44033) [@linxianxi](https://github.com/linxianxi)
- 🆕 Added support for `rootClassName` in [Upload](https://github.com/ant-design/ant-design/pull/44060),[AutoComplete](https://github.com/ant-design/ant-design/pull/44055),[Badge.Ribbon](https://github.com/ant-design/ant-design/pull/44056),[Input.TextArea](https://github.com/ant-design/ant-design/pull/44058),[RangePicker](https://github.com/ant-design/ant-design/pull/44057),[TimePicker](https://github.com/ant-design/ant-design/pull/44059) [@kiner-tang](https://github.com/kiner-tang).
- 💄 Refactored the structure of Modal.confirm to fix the width abnormality caused by `width: fit-content` and the style line break issue with a large amount of text. Extracted confirm styles for lazy loading to optimize style size in SSR. [#44557](https://github.com/ant-design/ant-design/pull/44557)
- 💄 Adjusted the linear gradient colors for `circle` and `dashboard` in Progress to conical gradients. [#44404](https://github.com/ant-design/ant-design/pull/44404)
- 💄 Fixed DatePicker missing custom footer style. [#44642](https://github.com/ant-design/ant-design/pull/44642) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fixed Tag where `tag.className` and `tag.style` did not work on Tag.CheckableTag in ConfigProvider. [#44602](https://github.com/ant-design/ant-design/pull/44602)
- 💄 Fixed the inconsistency in width between the dropdown and the input box when the container of Select component has `transform: scale` style configured in `getPopupContainer` option. [#44378](https://github.com/ant-design/ant-design/pull/44378)
- 🐞 Fixed an issue where Form.Item with `noStyle` configuration prevented the bound element from consuming `useStatus`. [#44576](https://github.com/ant-design/ant-design/pull/44576)
- 🐞 Fixed an issue where using Tag within Popover/Popconfirm caused incorrect `font-size` on hover. [#44663](https://github.com/ant-design/ant-design/pull/44663)
- 🐞 Fixed an issue where Input's default button had extra shadow. [#44660](https://github.com/ant-design/ant-design/pull/44660) [@daledelv](https://github.com/daledelv)
- 🐞 Fixed an issue where using Modal's hooks to close it with the `esc` key didn't correctly trigger the `await`. [#44646](https://github.com/ant-design/ant-design/pull/44646)
- 🐞 Fixed the issue where the preset `size` of Space did not follow the Design Token, now compact mode correctly handles the corresponding spacing values. [#44598](https://github.com/ant-design/ant-design/pull/44598) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fixed the issue in Upload where the download button would still be displayed after clicking on it and moving the mouse out of the file. [#44594](https://github.com/ant-design/ant-design/pull/44594) [@zbw-zbw](https://github.com/zbw-zbw)
- 🐞 Fix FloatButton that margin not work with `href` in FloatButton.Group. [#44707](https://github.com/ant-design/ant-design/pull/44707) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fixed the issue where `fontSizeSM` token was not being applied to Button component. [#44217](https://github.com/ant-design/ant-design/pull/44217) [@CHENGTIANG](https://github.com/CHENGTIANG)
- 🐞 The Watermark now works in nested Modal and Drawer components. [#44104](https://github.com/ant-design/ant-design/pull/44104)
- 🛠 Alert, Tree, Cascader, Layout, Table, Modal, Drawer, Button, Switch, Select, Badge, Form, TimePicker, Spin, Input, Progress, Divider Added Component Token. [#42142](https://github.com/ant-design/ant-design/pull/42142) [#42607](https://github.com/ant-design/ant-design/pull/42607) [#42627](https://github.com/ant-design/ant-design/pull/42627) [#42757](https://github.com/ant-design/ant-design/pull/42757) [#42774](https://github.com/ant-design/ant-design/pull/42774) [#42778](https://github.com/ant-design/ant-design/pull/42778) [#44090](https://github.com/ant-design/ant-design/pull/44090) [#44118](https://github.com/ant-design/ant-design/pull/44118) [#44174](https://github.com/ant-design/ant-design/pull/44174) [#44228](https://github.com/ant-design/ant-design/pull/44228) [#44261](https://github.com/ant-design/ant-design/pull/44261) [#44282](https://github.com/ant-design/ant-design/pull/44282) [#44334](https://github.com/ant-design/ant-design/pull/44334) [#42192](https://github.com/ant-design/ant-design/pull/42192) [@hms181231](https://github.com/hms181231) [@linhf123](https://github.com/linhf123) [@poyiding](https://github.com/poyiding) [@Wxh16144](https://github.com/Wxh16144) [@Yuiai01](https://github.com/Yuiai01)
- 🛠 Remove compatibility logic for old versions of IE browser for Space and Grid components to reduce bundle size. [#44620](https://github.com/ant-design/ant-design/pull/44620) [@li-jia-nan](https://github.com/li-jia-nan)
- TypeScript
  - 🤖 Export BasicDataNode type from the Tree. [#44624](https://github.com/ant-design/ant-design/pull/44624) [@kiner-tang](https://github.com/kiner-tang)

## 5.8.6

`2023-09-02`

- 🛠 Optimize some styles size in document.head by extracting unused styles.
  - 🛠 Notification and Message only generate styles when displayed. [#44488](https://github.com/ant-design/ant-design/pull/44488)
  - 🛠 Extract Tag status & preset color style which will only generate by needed. [#44512](https://github.com/ant-design/ant-design/pull/44512)
  - 🛠 Extract Button compact style, now only the corresponding style will be generated when Space.Compact is used. [#44475](https://github.com/ant-design/ant-design/pull/44475)
- 📦 Remove `lodash/camelCase` from `@ant-design/icons` dependencies to reduce bundle size. [ant-design-icons#595](https://github.com/ant-design/ant-design-icons/pull/595)
- Form
  - 🐞 Fix Form.Item children not hidden when `wrapperCol.span` is `0`. [#44485](https://github.com/ant-design/ant-design/pull/44485) [#44472](https://github.com/ant-design/ant-design/pull/44472) [@crazyair](https://github.com/crazyair)
  - 🐞 Fix Form `wrapperCol` to be 24 not working when `labelCol` is set to 24. [#44541](https://github.com/ant-design/ant-design/pull/44541)
- 🐞 Fix Watermark that would crash if `content` is empty string. [#44501](https://github.com/ant-design/ant-design/pull/44501)
- 🐞 Fix ColorPicker popup still working when `disabled` is `true`. [#44466](https://github.com/ant-design/ant-design/pull/44466) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Transfer trigger `onSelectChange` twice sometimes when click checkbox. [#44471](https://github.com/ant-design/ant-design/pull/44471) [@kovsu](https://github.com/kovsu)
- 🐞 Fix Typography scrollbar flush problem when enable `ellipsis`. [#43058](https://github.com/ant-design/ant-design/pull/43058) [@bbb169](https://github.com/bbb169)
- Slider
  - 🐞 Fix Slider draggable track unpredictable behavior. [#44503](https://github.com/ant-design/ant-design/pull/44503) [@BoyYangzai](https://github.com/BoyYangzai) [@yoyo837](https://github.com/yoyo837)
  - ⌨️ Improve Slider a11y behavior by adding `aria-orientation`. [react-component/slider#859](https://github.com/react-component/slider/pull/859) [@5im0n](https://github.com/5im0n)
- 🐞 Fix Steps `type="nav"` last item did not hide arrow properly. [#44582](https://github.com/ant-design/ant-design/pull/44582) [@ohhoney1](https://github.com/ohhoney1)
- TypeScript
  - 🤖 Fix Upload file `status` definition to remove unused success status. [#44468](https://github.com/ant-design/ant-design/pull/44468)

## 5.8.5

`2023-08-28`

- 🛠 Refactor Badge style logic and take Ribbon style out to reduce SSR inline style size. [#44451](https://github.com/ant-design/ant-design/pull/44451)
- 🐞 Fix the issue of abnormal icon styling when using `@ant-design/icons` within App. [#41208](https://github.com/ant-design/ant-design/pull/41208) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix the issue of vertical dragging malfunction in Carousel. [#44460](https://github.com/ant-design/ant-design/pull/44460) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Tour panel use wrong design token. [#44428](https://github.com/ant-design/ant-design/pull/44428)
- 🐞 Fix Form `wrapperCol` with responsive `xs` config not working. [#44388](https://github.com/ant-design/ant-design/pull/44388)
- 🐞 Fix ColorPicker duplicate `key` issue. [#44370](https://github.com/ant-design/ant-design/pull/44370) [@xr0master](https://github.com/xr0master)
- 🐞 Fix Radio that not work in Tree title. [#44380](https://github.com/ant-design/ant-design/pull/44380)
- 🐞 Fix Table that would crash when `filterDropdown` does not support `ref`. [#44357](https://github.com/ant-design/ant-design/pull/44357)
- 🐞 Fix Form `inline` layout show extra bottom margin when validation failed. [#44360](https://github.com/ant-design/ant-design/pull/44360)
- 🐞 Fix DatePicker `showTime` working error when `format` is Array. [#44306](https://github.com/ant-design/ant-design/pull/44306) [@Zian502](https://github.com/Zian502)
- 🐞 Fix Watermark can not be fully shown when `content` is too long. [#44321](https://github.com/ant-design/ant-design/pull/44321)
- TypeScript
  - 🤖 Fix the type error with align property in Dropdown component. [#44423](https://github.com/ant-design/ant-design/pull/44423) [@LeTuongKhanh](https://github.com/LeTuongKhanh)

## 5.8.4

`2023-08-18`

- ColorPicker
  - 🐞 Fix the cursor jumps when entering lowercase English letters in the ColorPicker color value input box. [#44137](https://github.com/ant-design/ant-design/pull/44137) [@gouge666](https://github.com/gouge666)
  - 🐞 Fix the ColorPicker style is deformed under different sizes. [#44273](https://github.com/ant-design/ant-design/pull/44273) [@kouchao](https://github.com/kouchao)
- 🐞 Fix Descriptions throwing `key is not a prop` error message. [#44278](https://github.com/ant-design/ant-design/pull/44278) [@RedJue](https://github.com/RedJue)
- 🐞 Fix the node is still rendered when Pagination `itemRender` is customized to `null`. [#44226](https://github.com/ant-design/ant-design/pull/44226)
- 🐞 Fix Modal in Dropdown `menu.items`, rapid mouse movement when expanding Modal will make Dropdown reopen. [#44204](https://github.com/ant-design/ant-design/pull/44204)
- DatePicker
  - 💄 Fix DatePicker content is not centered. [#44245](https://github.com/ant-design/ant-design/pull/44245) [@Zian502](https://github.com/Zian502)
  - 💄 Optimize DatePicker selection range style. [#44206](https://github.com/ant-design/ant-design/pull/44206) [@kiner-tang](https://github.com/kiner-tang)
- 💄 Fix clicking on the Tabs area on the mobile terminal triggers a color change. [#44200](https://github.com/ant-design/ant-design/pull/44200) [@yilaikesi](https://github.com/yilaikesi)
- RTL
  - 💄 Fix the numbers in the Badge are also RTL when the text direction of the page is RTL. [#43998](https://github.com/ant-design/ant-design/pull/43998) [@NotEvenANeko](https://github.com/NotEvenANeko)

## 5.8.3

`2023-08-11`

- DatePicker
  - 🐞 Fix DatePicker panel cannot toggle when selecting time with truthy `open` and truthy `defaultOpen`. [#44105](https://github.com/ant-design/ant-design/pull/44105) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 Fix DatePicker and RangePicker still show the clear button when disable `allowClear`. [#44015](https://github.com/ant-design/ant-design/pull/44015) [@bartpio](https://github.com/bartpio)
- Carousel
  - 🐞 Fix Carousel do not support `id` prop. [#44079](https://github.com/ant-design/ant-design/pull/44079)
  - 💄 Fix Carousel `dots` extra margin style. [#44076](https://github.com/ant-design/ant-design/pull/44076)
- 🐞 Fix Modal footer disabled state that affect by Form. [#43055](https://github.com/ant-design/ant-design/pull/43055) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Upload thumbnail that gif will not play. [#44083](https://github.com/ant-design/ant-design/pull/44083) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix FloatButton that menu mode didn't support `badge` prop. [#44109](https://github.com/ant-design/ant-design/pull/44109)
- 🐞 Fix Grid & List responsive config take effect after first render which cause screen flick. [#44075](https://github.com/ant-design/ant-design/pull/44075)
- 🐞 Fix that Design Token partially missing when `@ant-design/cssinjs` version `1.15.0`. [#44091](https://github.com/ant-design/ant-design/pull/44091)
- 💄 Fix Badge `status="processing"` with `dot` wave style issue. [#44153](https://github.com/ant-design/ant-design/pull/44153)
- 💄 Fix Descriptions border styles when it nests itself. [#43454](https://github.com/ant-design/ant-design/pull/43454) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fix Pagination transition style in prev/next buttons. [#44030](https://github.com/ant-design/ant-design/pull/44030)
- 💄 Fix Popconfirm button group wraps unexpectedly. [#44022](https://github.com/ant-design/ant-design/pull/44022) [@MuxinFeng](https://github.com/MuxinFeng)
- 💄 Optimize style of Image preview operation icons. [#44141](https://github.com/ant-design/ant-design/pull/44141)
- 💄 Optimize Input and InputNumber font size in large mode. [#44000](https://github.com/ant-design/ant-design/pull/44000) [@MuxinFeng](https://github.com/MuxinFeng)
- 💄 Remove Space part useless style. [#44098](https://github.com/ant-design/ant-design/pull/44098)

## 5.8.2

`2023-08-04`

- 🐞 Fix Checkbox & Radio not support customize wave and add className `ant-wave-target` for this case. [#44014](https://github.com/ant-design/ant-design/pull/44014)
- 🐞 Adjust Form.Item renderProps definition to return correct `FormInstance`. [#43996](https://github.com/ant-design/ant-design/pull/43996)
- 🐞 Fixed Table incorrect expand icon direction and row indentation in RTL. [#43977](https://github.com/ant-design/ant-design/pull/43977) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fix Pagination that should not have hover and focus style when disabled. [#43970](https://github.com/ant-design/ant-design/pull/43970)
- TypeScript
  - 🤖 Fix Drawer & Anchor part Design Token TS description not correct issue. [#43994](https://github.com/ant-design/ant-design/pull/43994) [@wving5](https://github.com/wving5)

## 5.8.1

`2023-08-02`

- 🐞 Fix Select, TreeSelect, Cascader, DatePicker unexpected warning of deprecated `clearIcon` [#43945](https://github.com/ant-design/ant-design/pull/43945) [@kiner-tang](https://github.com/kiner-tang)
- TypeScript
  - 🤖 Export Design Token `MappingAlgorithm` as type of theme algorithm. [#43953](https://github.com/ant-design/ant-design/pull/43953)

## 5.8.0

`2023-08-01`

- 🔥 Component Token support `algorithm` to calculate derivative tokens same as global. [#43810](https://github.com/ant-design/ant-design/pull/43810)
- 🔥 Modal hooks function support `await` call. [#43470](https://github.com/ant-design/ant-design/pull/43470)
- 🔥 ConfigProvider support `wave` to customize wave effect. [#43784](https://github.com/ant-design/ant-design/pull/43784)
- 🆕 Form support `getFieldsValue({ strict: true })` to support only Item bind values. [#43828](https://github.com/ant-design/ant-design/pull/43828)
- 🆕 Descriptions support `items` prop. [#43483](https://github.com/ant-design/ant-design/pull/43483) [@RedJue](https://github.com/RedJue)
- 🆕 ColorPicker support `disabledAlpha` prop. [#43355](https://github.com/ant-design/ant-design/pull/43355) [@RedJue](https://github.com/RedJue)
- 🆕 Avatar.Group support `shape` prop. [#43817](https://github.com/ant-design/ant-design/pull/43817) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 AutoComplete/Cascader/DatePicker/Input.Textarea/TimePicker/TreeSelect support `allowClear` prop to customize clear button. [#43582](https://github.com/ant-design/ant-design/discussions/43582) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 DatePicker.RangePicker `presets` support callback functions. [#43476](https://github.com/ant-design/ant-design/pull/43476) [@Wxh16144](https://github.com/Wxh16144)
- 🆕 Added the `preview={{ movable: Boolean }}` prop to the Image component to support dragging and dropping into folders. [#43823](https://github.com/ant-design/ant-design/pull/43823) [@linxianxi](https://github.com/linxianxi)
- 🆕 Slider `tooltip` support `autoAdjustOverflow` prop. [#43788](https://github.com/ant-design/ant-design/pull/43788)
- 🆕 Added the `selectionsIcon` property to the Transfer component to support custom icons for the dropdown menu. [#43773](https://github.com/ant-design/ant-design/pull/43773) [@li-jia-nan](https://github.com/li-jia-nan)
- 🗑 Select, Tree-Select and Cascader deprecated `showArrow` prop. Now suffix arrow should be configured with `suffixIcon`. [#43520](https://github.com/ant-design/ant-design/pull/43520) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Optimized the import method for `@ant-design/icons` to avoid importing all icons. [#43915](https://github.com/ant-design/ant-design/pull/43915) [@ssxenon01](https://github.com/ssxenon01)
- 🐞 Fix Anchor not trigger `getCurrentAnchor` when scroll. [#43916](https://github.com/ant-design/ant-design/pull/43916)
- 🐞 Fix Tooltip `hover` not trigger on `disabled` element. [#43872](https://github.com/ant-design/ant-design/pull/43872)
- 🐞 Fix ColorPicker not calling `onChangeComplete` callback when changing value. [#43867](https://github.com/ant-design/ant-design/pull/43867) [@RedJue](https://github.com/RedJue)
- 🐞 Fix `Modal.confirm` `locale` setting were reset. [#43277](https://github.com/ant-design/ant-design/pull/43277) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Slider description info and slider handle overlap issue. [#43780](https://github.com/ant-design/ant-design/pull/43780) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix InputNumber handler style in large size. [#43875](https://github.com/ant-design/ant-design/pull/43875) [@yee94](https://github.com/yee94)
- 🐞 Fix Select popup flip position motion not correct. [#43764](https://github.com/ant-design/ant-design/pull/43764)
- 💄 Optimized `@ant-design/icons` the design of icons including CloseCircleFilled/CloseSquareFilled/CloseOutlined/CloseCircleOutlined/CloseSquareOutlined/ExportOutlined/ImportOutlined. [824500](https://github.com/ant-design/ant-design-icons/commit/824500349894a87562f033dbdc5e3c5d301a2f5c)
- 💄 Fix when using with other component libraries that use `@ant-design/cssinjs`, antd styles will always be inserted at the top to avoid style override issues caused by loading order. [#43847](https://github.com/ant-design/ant-design/pull/43847)
- 💄 Optimize message and notification to not to extract style in SSR. [#43808](https://github.com/ant-design/ant-design/pull/43808)
- ⌨️ Fix Select `aria-activedescendant` didn't conform to valid value. [#43800](https://github.com/ant-design/ant-design/pull/43800)
- ⌨️ Fix `Layout.Header` accessibility role. [#43749](https://github.com/ant-design/ant-design/pull/43749) [@khalibloo](https://github.com/khalibloo)
- TypeScript
  - 🤖 `Form.Item` support for generic pairs `name` props verification. [#43904](https://github.com/ant-design/ant-design/pull/43904) [@crazyair](https://github.com/crazyair)

## 5.7.3

`2023-07-24`

- 🐞 Fix Adjust the positioning of the Tour to be centered when the `target` is `null`. [#43694](https://github.com/ant-design/ant-design/pull/43694) [@linxianxi](https://github.com/linxianxi)
- 💄 Fix Watermark style issue in dark theme. [#43754](https://github.com/ant-design/ant-design/pull/43754)
- 🐞 Fix Button missing part `React.ButtonHTMLAttributes` issue. [#43716](https://github.com/ant-design/ant-design/pull/43716)
- 💄 Watermark use Design Token to support dark theme. [#43754](https://github.com/ant-design/ant-design/pull/43754)
- TypeScript
  - 🤖 Button `ref` type optimization. [#43703](https://github.com/ant-design/ant-design/pull/43703) [@Negentropy247](https://github.com/Negentropy247)

## 5.7.2

`2023-07-20`

- 💄 Fix Menu miss hover style issue. [#43656](https://github.com/ant-design/ant-design/pull/43656)
- 🐞 Fix Notification throwPurePanel definition missing error. [#43687](https://github.com/ant-design/ant-design/pull/43687) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Button `onClick` missing `event` definition. [#43666](https://github.com/ant-design/ant-design/pull/43666)
- 🐞 Fix Input and InputNumber align issue. [#43548](https://github.com/ant-design/ant-design/pull/43548) [@bbb169](https://github.com/bbb169)
- 🐞 Fix DatePicker suffix use wrong token. [#43646](https://github.com/ant-design/ant-design/pull/43646)
- 🐞 Fix Steps with clickable can not trigger by keyboard. [#43644](https://github.com/ant-design/ant-design/pull/43644)
- TypeScript
  - 🤖 Remove Button type `ghost` from TS definition. [#43675](https://github.com/ant-design/ant-design/pull/43675)

## 5.7.1

`2023-07-19`

- 💄 Migrate Component Token of Menu from 4.x less variables. [#43576](https://github.com/ant-design/ant-design/pull/43576)
- 🐞 Fix QRCode throws `Can't resolve 'antd/lib/qr-code'` in Next.js 13. [#43572](https://github.com/ant-design/ant-design/issues/43572)
- 🐞 Fix that antd components usage in Next.js App Router, check the [documentation](/docs/react/use-with-next#using-nextjs-app-router). [#43573](https://github.com/ant-design/ant-design/pull/43573) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix InputNumber Phantom dependency issue: `Cannot find module 'rc-component/mini-decimal'`. [#43635](https://github.com/ant-design/ant-design/pull/43635)
- 🐞 Fix Checkbox both set `checked` and `indeterminate` prop will not show as `indeterminate` style. [#43626](https://github.com/ant-design/ant-design/pull/43626)
- 🐞 Fix Form.Item set `label=""` will break the line align. [#43614](https://github.com/ant-design/ant-design/pull/43614)
- 🐞 Fix notification `placement` not being respected when passed via App component. [#43522](https://github.com/ant-design/ant-design/pull/43522) [@Rajil1213](https://github.com/Rajil1213)
- 🐞 Fix Pagination jumpy page size select when search in it. [#43556](https://github.com/ant-design/ant-design/pull/43556)
- 🐞 Fix Button disabled style is missing when use with the deprecated usage of `type="ghost"`. [#43558](https://github.com/ant-design/ant-design/pull/43558) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Tag extra margin when there is only `icon` inside it. [#43518](https://github.com/ant-design/ant-design/pull/43518) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix ColorPicker that status style is missing inside Form.Item. [#42880](https://github.com/ant-design/ant-design/pull/42880) [@RedJue](https://github.com/RedJue)
- TypeScript
  - 🤖 Fix Space `SpaceContext` don't exported correctly. [#43501](https://github.com/ant-design/ant-design/pull/43501) [@VovkaGoodwin](https://github.com/VovkaGoodwin)
  - 🤖 Improve AutoComplete definitions. [#43581](https://github.com/ant-design/ant-design/pull/43581) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Improve Select and List definitions. [#43545](https://github.com/ant-design/ant-design/pull/43545) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Improve Button definitions. [#43588](https://github.com/ant-design/ant-design/pull/43588) [#43629](https://github.com/ant-design/ant-design/pull/43629) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Improve Cascader, ConfigProvider, DatePicker, InputNumber, Slider and Upload definitions. [#43610](https://github.com/ant-design/ant-design/pull/43610)

## 5.7.0

`2023-07-11`

- 🆕 ConfigProvider now supports `className` and `style` properties for all components. Thanks to [@Yuiai01](https://github.com/Yuiai01), [@li-jia-nan](https://github.com/li-jia-nan), [@MuxinFeng](https://github.com/MuxinFeng) for their contributions.
- 🆕 Badge now supports `classNames` and `styles` properties. [#43245](https://github.com/ant-design/ant-design/pull/43245) [@li-jia-nan](https://github.com/li-jia-nan)
- ColorPicker
  - 🆕 ColorPicker support `showText` prop. [#42865](https://github.com/ant-design/ant-design/pull/42865) [@RedJue](https://github.com/RedJue)
  - 🆕 ColorPicker support `destroyTooltipOnHide` prop. [#42645](https://github.com/ant-design/ant-design/pull/42645) [@linxianxi](https://github.com/linxianxi)
  - 🆕 ColorPicker support `onChangeComplete` prop. [#43370](https://github.com/ant-design/ant-design/pull/43370) [@RedJue](https://github.com/RedJue)
  - 🆕 ColorPicker support `panelRender` prop. [#43134](https://github.com/ant-design/ant-design/pull/43134) [@RedJue](https://github.com/RedJue)
  - 🆕 ColorPicker support `size` prop. [#43116](https://github.com/ant-design/ant-design/pull/43116) [@RedJue](https://github.com/RedJue)
- 🆕 Alert, Drawer, Modal, Notifaction, Tag, Tabs now support hiding the close button by setting `closeIcon` to null or false. [#42828](https://github.com/ant-design/ant-design/discussions/42828) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Image supports `imageRender`, `toolbarRender` attributes to support custom rendering of preview images and toolbars, also supports new props such as `onTransform`, `minScale`, `maxScale`. Image.PreviewGroup supports `items` attribute to pass in list data, and fixes that the native attributes of the img tag are not passed to preview images The problem. [#43075](https://github.com/ant-design/ant-design/pull/43075) [@linxianxi](https://github.com/linxianxi)
- 🆕 Modify the layout style of the Image preview, the `preview` attribute supports `closeIcon`, Image.PreviewGroup supports the `fallback` attribute, and fixes the problem of loading preview resources in advance. [#43167](https://github.com/ant-design/ant-design/pull/43167) [@linxianxi](https://github.com/linxianxi)
- 🆕 Changed Image the layout style, Preview now supports `closeIcon`, PreviewGroup now supports `fallback`, and fixed an issue where preview resources would be loaded at the beginning. [#43167](https://github.com/ant-design/ant-design/pull/43167) [@linxianxi](https://github.com/linxianxi)
- 🛠 InputNumber was refactored to use rc-input. [#42762](https://github.com/ant-design/ant-design/pull/43000) [@MuxinFeng](https://github.com/MuxinFeng)
- 🛠 Resolved Circular dependency issue in vite, rollup, meteor and microbundle. [#42750](https://github.com/ant-design/ant-design/pull/42750). Thanks to [@jrr997](https://github.com/jrr997), [@kiner-tang](https://github.com/kiner-tang) and [@MuxinFeng](https://github.com/MuxinFeng) for their contributions.
- 🐞 Remove default values (empty string) of `className` prop in Anchor, CollapsePanel, and Input.Group. [#43481](https://github.com/ant-design/ant-design/pull/43481) [@thinkasany](https://github.com/thinkasany)
- 🐞 Fix Upload progress bar missing fade motion. [#43471](https://github.com/ant-design/ant-design/pull/43471)
- 🐞 Added warning for deprecated Token `colorItemBgSelected` in Menu. [#43461](https://github.com/ant-design/ant-design/pull/43461)
- 🐞 MISC: Fixed an issue where some browsers had scroll bars that were not redrawn when style feature support was detected. [#43358](https://github.com/ant-design/ant-design/pull/43358) [@LeeeeeeM](https://github.com/LeeeeeeM)
- 🐞 Fixed an issue where the Tab component of Card would not be displayed at all when tabList is empty. [#43416](https://github.com/ant-design/ant-design/pull/43416) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fixed an issue where the `form.validateMessages` configuration would be lost when using ConfigProvider nestedly. [#43239](https://github.com/ant-design/ant-design/pull/43239) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed an issue where the ripple effect of Tag click would sometimes be offset from the Tag element. [#43402](https://github.com/ant-design/ant-design/pull/43402)
- 🐞 Fixed an issue where clicking "now" in DatePicker when switching to the year-month panel would not work. [#43367](https://github.com/ant-design/ant-design/pull/43367) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fixed an issue where the height set for the Input.TextArea component would become invalid when the screen size changed. [#43169](https://github.com/ant-design/ant-design/pull/43169)
- 💄 In Slider, the `tooltip` should be centered when there is little content. [#43430](https://github.com/ant-design/ant-design/pull/43430) [@Jomorx](https://github.com/Jomorx)
- 💄 Design Token add `colorLink` to the seed token, and `colorLinkHover` and `colorLinkActive` will be calculated from colorLink. [#43183](https://github.com/ant-design/ant-design/pull/43183)
- 💄 Adjusted some tokens in Slider to component tokens. [#42428](https://github.com/ant-design/ant-design/pull/42428) [@heiyu4585](https://github.com/heiyu4585) RTL[#42428](https://github.com/ant-design/ant-design/pull/42428) [@heiyu4585](https://github.com/heiyu4585)
- RTL
  - 🤖 Progress now supports animations in rtl direction. [#43316](https://github.com/ant-design/ant-design/pull/43316) [@Yuiai01](https://github.com/Yuiai01)
- TypeScript
  - 🤖 Added `RawPurePanelProps` interface description for Popover. [#43453](https://github.com/ant-design/ant-design/pull/43453) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Replaced `ref` type with `TooltipRef` instead of `unknown` for `Popconfirm`. [#43452](https://github.com/ant-design/ant-design/pull/43452) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Replaced `ref` type with `TooltipRef` instead of `unknown` for Popover. [#43450](https://github.com/ant-design/ant-design/pull/43450) [@Negentropy247](https://github.com/Negentropy247)
  - 🤖 Improved type declaration of `GroupSizeContext` in Button.ButtonGroup. [#43439](https://github.com/ant-design/ant-design/pull/43439) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Improved type declaration of `mode` property in Select. [#43413](https://github.com/ant-design/ant-design/pull/43413) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Replaced `ref` type with `CheckboxRef` instead of `unknown` for Checkbox. [#43424](https://github.com/ant-design/ant-design/pull/43424) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 Improved Table internal type implementation. [#43366](https://github.com/ant-design/ant-design/pull/43366) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 Improved Tag internal type implementation. [#43357](https://github.com/ant-design/ant-design/pull/43357) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Improved Notification internal type implementation. [#43351](https://github.com/ant-design/ant-design/pull/43351) [@thinkasany](https://github.com/thinkasany)

## 5.6.4

`2023-07-03`

- Form
  - 🐞 Fix `onFieldsChange` event will still be triggered incorrectly when the field is not configured with `rules` when the Form is submitted. [#43290](https://github.com/ant-design/ant-design/pull/43290)
  - 🐞 Fix the problem that the warning message that `name` is empty is falsely reported when the `name` of Form.List is 0. [#43199](https://github.com/ant-design/ant-design/pull/43199) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix the Badge `color` attribute does not take effect. [#43304](https://github.com/ant-design/ant-design/pull/43304)
- 🐞 Fix the position of Select clear icon when FormItem sets `hasFeedback`. [#43302](https://github.com/ant-design/ant-design/pull/43302) [@tinyfind](https://github.com/tinyfind)
- 🐞 Fix Transfer paging drop-down button is hidden and `showSizeChanger` method is invalid. [#41906](https://github.com/ant-design/ant-design/pull/41906) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix the invalid modification of `colorText` and `fontSize` of Popconfirm component. [#43212](https://github.com/ant-design/ant-design/pull/43212)
- 🐞 Fix the problem that deleting files after Upload configures `maxCount` will not trigger `onChange`. [#43193](https://github.com/ant-design/ant-design/pull/43193)
- 💄 Fix Button disabled style error when it has `link` or `href` attribute. [#43091](https://github.com/ant-design/ant-design/pull/43091) [@BoyYangzai](https://github.com/BoyYangzai)
- TypeScript
  - 🤖 Optimize Breadcrumb `params` type and support generics. [#43211](https://github.com/ant-design/ant-design/pull/43211)
  - 🤖 Optimize Breadcrumb `params` type and support generics. [#43257](https://github.com/ant-design/ant-design/pull/43257) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Remove redundant number type from Button `loading`. [#43256](https://github.com/ant-design/ant-design/pull/43256) [@thinkasany](https://github.com/thinkasany)
  - 🤖 Transparently pass Cascader `optionType` generic. [#43231](https://github.com/ant-design/ant-design/pull/43231) [@ZWkang](https://github.com/ZWkang)

## 5.6.3

`2023-06-25`

- BreadCrumb
  - 🐞 Fix Breadcrumb `dropdownProps` does not working bug. [#43151](https://github.com/ant-design/ant-design/pull/43151) [@linxianxi](https://github.com/linxianxi)
  - 🛠 Improve BreadCrumb behavior when receiving a null title. [#43099](https://github.com/ant-design/ant-design/pull/43099) [@Asanio06](https://github.com/Asanio06)
- 🐞 Fix Slider disabled state within Form. [#43142](https://github.com/ant-design/ant-design/pull/43142) [@Starpuccino](https://github.com/Starpuccino)
- 🐞 Fix Form that label offset does not work in vertical mode. [#43155](https://github.com/ant-design/ant-design/pull/43155) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Table open filter popup throw react ref warning. [#43139](https://github.com/ant-design/ant-design/pull/43139)
- 🐞 Fix Transfer with `rowKey` makes item unselectable. [#43115](https://github.com/ant-design/ant-design/pull/43115)
- 🐞 Fix Space `size` priority when using with other components [#42752](https://github.com/ant-design/ant-design/pull/42752) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix QRCode color in dark mode. [#43162](https://github.com/ant-design/ant-design/pull/43162) [@ds1371dani](https://github.com/ds1371dani)
- 💄 Fix Select option unexpected margin when using with Badge and Tag. [#43097](https://github.com/ant-design/ant-design/pull/43097) [@Yuiai01](https://github.com/Yuiai01)
- TypeScript
  - 🤖 Improve Button `target` property type definition. [#43129](https://github.com/ant-design/ant-design/pull/43129) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 Improve Progress `size` property type to support percent value. [#43123](https://github.com/ant-design/ant-design/pull/43123) [@Ali-ovo](https://github.com/Ali-ovo)
  - 🤖 Improve Slider tooltip type definition. [#43094](https://github.com/ant-design/ant-design/pull/43094) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.6.2

`2023-06-19`

- 🐞 Fix Dropdown with `autoFocus` not work as expect. [#43002](https://github.com/ant-design/ant-design/pull/43002) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix InputNumber with `prefix` abnormal height under Form.Item of `hasFeedBack`. [#43049](https://github.com/ant-design/ant-design/pull/43049)
- 💄 Fix Input and InputNumber disabled style with addons. [#42974](https://github.com/ant-design/ant-design/pull/42974) [@kampiu](https://github.com/kampiu)
- 🐞 Fix Upload trigger extra `onChange` event when upload the file exceeds `maxCount`. [#43034](https://github.com/ant-design/ant-design/pull/43034)
- 🐞 Fix export bundle size always contain `rc-field-form` even not use Form. [#43023](https://github.com/ant-design/ant-design/pull/43023)
- 🐞 Fix DatePicker `disabledTime` sometime can select disabled option. [#42991](https://github.com/ant-design/ant-design/pull/42991) [@linxianxi](https://github.com/linxianxi)
- 📖 Add FloatButton controlled demo and patch related warning info. [#42835](https://github.com/ant-design/ant-design/pull/42835) [@poyiding](https://github.com/poyiding)
- 🐞 Fix Button with `disabled` still can interactive with sub component. [#42949](https://github.com/ant-design/ant-design/pull/42949) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Drawer add max width to avoid exceed in small screen. [#42914](https://github.com/ant-design/ant-design/pull/42914) [@amir2mi](https://github.com/amir2mi)
- 🐞 Fix Table `preserveSelectedRowKeys` not working when `checkStrictly` configured. [#42784](https://github.com/ant-design/ant-design/pull/42784) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix Transfer select count not sync when dynamic update data. [#42785](https://github.com/ant-design/ant-design/pull/42785) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 Fix Radio.Button `title` not work and update typescript definition. [#43012](https://github.com/ant-design/ant-design/pull/43012) [@linxianxi](https://github.com/linxianxi)

## 5.6.1

`2023-06-07`

- ColorPicker
  - 🐞 Fix ColorPicker preset cannot be selected. [#42882](https://github.com/ant-design/ant-design/pull/42882) [@RedJue](https://github.com/RedJue)
  - 🐞 Fix ColorPicker that should not trigger `onChange` when click clear after clearing. [#42643](https://github.com/ant-design/ant-design/pull/42643) [@linxianxi](https://github.com/linxianxi)
- 🐞 Fix Collapse that displayed unexpected deprecated warning. [#42876](https://github.com/ant-design/ant-design/pull/42876) [@kiner-tang](https://github.com/kiner-tang)
- TypeScript
  - 🤖 Fix Collapse's `items` type should be optional. [#42877](https://github.com/ant-design/ant-design/pull/42877) [@Dunqing](https://github.com/Dunqing)

## 5.6.0

`2023-06-06`

- 🆕 ColorPicker add `onClear` and dont't close panel when clearing. [#42634](https://github.com/ant-design/ant-design/pull/42634) [@linxianxi](https://github.com/linxianxi)
- 🆕 Collapse `items` to support configure panel content. [#42545](https://github.com/ant-design/ant-design/pull/42545) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Add static function `getDesignToken` to access full Design Token. [#42723](https://github.com/ant-design/ant-design/pull/42723)
- 🆕 ConfigProvider support configure Space `classNames` and `styles` properties. [#42748](https://github.com/ant-design/ant-design/pull/42748) [@RedJue](https://github.com/RedJue)
- 🆕 Space support `classNames` and `styles` properties. [#42743](https://github.com/ant-design/ant-design/pull/42743) [@RedJue](https://github.com/RedJue)
- 🆕 Drawer panel support event listener. Wrapper support passing `data-*` props. [#42718](https://github.com/ant-design/ant-design/pull/42718) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 ConfigProvider support configuring Button `style` / `className` / `styles` / `classNames`. [#42623](https://github.com/ant-design/ant-design/pull/42623) [@LuZhenJie1999](https://github.com/LuZhenJie1999)
- 🆕 Pagination size change select component is searchable now. [#42608](https://github.com/ant-design/ant-design/pull/42608)
- 🆕 QRCode support render svg. [#42570](https://github.com/ant-design/ant-design/pull/42570) [@sy296565890](https://github.com/sy296565890)
- 🆕 Calendar support passing `panelMode` as the select source type to the internal select trigger callback to use the correct source type when called. [#42459](https://github.com/ant-design/ant-design/pull/42459) [@bombillazo](https://github.com/bombillazo)
- 🆕 Select add `groupLabel` prop in `fieldNames` to refleact title of group. [#42492](https://github.com/ant-design/ant-design/pull/42492) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Table add support for custom sort icon of table column. [#42498](https://github.com/ant-design/ant-design/pull/42498) [@sawadyecma](https://github.com/sawadyecma)
- 🆕 DatePicker support `kk:mm` format. [#42494](https://github.com/ant-design/ant-design/pull/42494) [@cooljser](https://github.com/cooljser)
- 🆕 ConfigProvider.config support `theme` for static method config. [#42473](https://github.com/ant-design/ant-design/pull/42473)
- 🆕 Calendar `onSelect` support `info.source` param to help get select source. [#42432](https://github.com/ant-design/ant-design/pull/42432)
- 💄 Optimize ColorPicker style in dark theme. [#42827](https://github.com/ant-design/ant-design/pull/42827) [@RedJue](https://github.com/RedJue)
- 💄 Fix Popconfirm, Alert and Notification that `colorTextHeading` and `colorText` usage. [#42839](https://github.com/ant-design/ant-design/pull/42839)
- 💄 Fix Divider style problem. [#42797](https://github.com/ant-design/ant-design/pull/42797) [@kongmingLatern](https://github.com/kongmingLatern)
- 🐞 Fix Image.PreviewGroup not reset image state when switch it. [#42793](https://github.com/ant-design/ant-design/pull/42793) [@linxianxi](https://github.com/linxianxi)
- 🐞 Reduce bundle size by refactor via `rc-util/lib/pickAttrs`. Fix Rate `findDOMNode is deprecated` warning in StrictMode. [#42688](https://github.com/ant-design/ant-design/pull/42688)
- 🐞 Rate could accept `id` `data-*` `aria-*` `role` `onMouseEnter` `onMouseLeave` attributes now, so that it can be wrapped by Tooltip component. [#42676](https://github.com/ant-design/ant-design/pull/42676)
- 🐞 Fix Menu.Submenu not aligned in horizontal mode. [#42648](https://github.com/ant-design/ant-design/pull/42648)
- 🐞 Align Card `tabList` API with Tab `items`. [#42413](https://github.com/ant-design/ant-design/pull/42413)
- 🐞 Fix circular dependencies.
  - 🐞 Fix Modal circular dependency issue. [#42841](https://github.com/ant-design/ant-design/pull/42841) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix Space circular dependency issue. [#42811](https://github.com/ant-design/ant-design/pull/42811) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix Statistic circular dependency issue. [#42814](https://github.com/ant-design/ant-design/pull/42814) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix List circular dependency issue. [#42806](https://github.com/ant-design/ant-design/pull/42806) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix Dropdown circular dependency issue. [#42764](https://github.com/ant-design/ant-design/pull/42764) [@Dunqing](https://github.com/Dunqing)
- ⌨️ Improve Progress accessibility by adding more `aria` props. [#42704](https://github.com/ant-design/ant-design/pull/42704) [@MehmetYararVX](https://github.com/MehmetYararVX)
- ⌨️ Notification add role `props`. [#42484](https://github.com/ant-design/ant-design/pull/42484) [@guan404ming](https://github.com/guan404ming)
- 🛠 Collapse use `onKeyDown` instead of `onKeyPress` to change collapse panel active state. [#42592](https://github.com/ant-design/ant-design/pull/42592) [@kiner-tang](https://github.com/kiner-tang)
- 🛠 Refactor Menu with `@rc-component/trigger`. Remove `rc-trigger` and reduce bundle size. [#42554](https://github.com/ant-design/ant-design/pull/42554)
- 🛠 Table rename `sorterOrder` to `sortOrder` for arguement of `sortIcon`. [#42519](https://github.com/ant-design/ant-design/pull/42519) [@sawadyecma](https://github.com/sawadyecma)
- Component Token Migration. For more info: [Migrate less variables](/docs/react/migrate-less-variables)
  - 🛠 Rename Menu component token with new naming standard. [#42848](https://github.com/ant-design/ant-design/pull/42848)
  - 🛠 Migrate Radio less variables. [#42050](https://github.com/ant-design/ant-design/pull/42050) [@Yuiai01](https://github.com/Yuiai01)
  - 🛠 Migrate Image less variables. [#42048](https://github.com/ant-design/ant-design/pull/42048) [@guan404ming](https://github.com/guan404ming)
  - 🛠 Migrate Tooltip less variables. [#42046](https://github.com/ant-design/ant-design/pull/42046) [@guan404ming](https://github.com/guan404ming)
  - 🛠 Migrate Transfer less variables. [#42431](https://github.com/ant-design/ant-design/pull/42431) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Tabs less variables. [#42186](https://github.com/ant-design/ant-design/pull/42186) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Card less variables. [#42061](https://github.com/ant-design/ant-design/pull/42061) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Mentions less variables. [#42711](https://github.com/ant-design/ant-design/pull/42711) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Avatar less variables. [#42063](https://github.com/ant-design/ant-design/pull/42063) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Pagination less variables. [#42330](https://github.com/ant-design/ant-design/pull/42330) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Popover less variables. [#42337](https://github.com/ant-design/ant-design/pull/42337) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Tag less variables. [#42053](https://github.com/ant-design/ant-design/pull/42053) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate List less variables. [#42041](https://github.com/ant-design/ant-design/pull/42041) [@jrr997](https://github.com/jrr997)
  - 🛠 Migrate Dropdown less variables. [#42258](https://github.com/ant-design/ant-design/pull/42258) [@poyiding](https://github.com/poyiding)
  - 🛠 Migrate Timenline less variables. [#42491](https://github.com/ant-design/ant-design/pull/42491) [@jrr997](https://github.com/jrr997)
  - 🛠 Migrate Anchor less variables. [#42141](https://github.com/ant-design/ant-design/pull/42141) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 Migrate Carousel less variables. [#42157](https://github.com/ant-design/ant-design/pull/42157) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 Migrate Upload less variables. [#42042](https://github.com/ant-design/ant-design/pull/42042) [@jrr997](https://github.com/jrr997)
  - 🛠 Migrate Typography less variables. [#42442](https://github.com/ant-design/ant-design/pull/42442) [@jrr997](https://github.com/jrr997)
  - 🛠 Migrate Segmented less variables. [#42136](https://github.com/ant-design/ant-design/pull/42136) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 Migrate Checkbox less variables. [#42097](https://github.com/ant-design/ant-design/pull/42097) [@poyiding](https://github.com/poyiding)
  - 🛠 Migrate Skeleton less variables. [#42134](https://github.com/ant-design/ant-design/pull/42134) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 Migrate Breadcrumb less variables. [#42342](https://github.com/ant-design/ant-design/pull/42342) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 Migrate Calendar less variables. [#42194](https://github.com/ant-design/ant-design/pull/42194) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 Migrate Rate less variables. [#42135](https://github.com/ant-design/ant-design/pull/42135) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 Migrate Descriptions less variables. [#42038](https://github.com/ant-design/ant-design/pull/42038) [@jrr997](https://github.com/jrr997)

## 5.5.2

`2023-05-30`

- 🐞 Fix ColorPicker hover boundary issue. [#42669](https://github.com/ant-design/ant-design/pull/42669) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Menu that `overflowedIndicatorClassName` should not override origin classes. [#42692](https://github.com/ant-design/ant-design/pull/42692)
- 🐞 Fix Select that in some cases will display the letter `A`. [#42651](https://github.com/ant-design/ant-design/pull/42651) [@895433995](https://github.com/895433995)
- 🐞 Fix Card when `cover` is set to Image, hover mask does not have rounded corner attribute, resulting in UI exception. [#42642](https://github.com/ant-design/ant-design/pull/42642) [@iNeedToCopy](https://github.com/iNeedToCopy)
- 🐞 Fix Checkbox align with label. [#42590](https://github.com/ant-design/ant-design/pull/42590)
- 🐞 Fix ConfigProvider makes Form component in the bundle even not use it. [#42604](https://github.com/ant-design/ant-design/pull/42604)
- 🐞 Fix InputNumber cannot align well by baseline. [#42580](https://github.com/ant-design/ant-design/pull/42580)
- 🐞 Fix spinning icon animation in Badge. [#42575](https://github.com/ant-design/ant-design/pull/42575)
- 📦 Optimize Form `setFieldsValue` logic to reduce bundle size. [#42635](https://github.com/ant-design/ant-design/pull/42635)
- 💄 Optimize Image.ImagePreviewGroup style. [#42675](https://github.com/ant-design/ant-design/pull/42675) [@kiner-tang](https://github.com/kiner-tang)
- 💄 Fix Tag borderless style with `error` and other status. [#42619](https://github.com/ant-design/ant-design/pull/42619) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Table `rowSpan` hover highlight style missing. [#42572](https://github.com/ant-design/ant-design/pull/42572)
- 💄 Fix Pagination's link icon and ellipsis hover style when disabled. [#42541](https://github.com/ant-design/ant-design/pull/42541) [@qmhc](https://github.com/qmhc)
- 💄 Fix Design Token that global token should be able to override component style. [#42535](https://github.com/ant-design/ant-design/pull/42535)
- 🇱🇹 Add missing i18n for `lt_LT` locale. [#42664](https://github.com/ant-design/ant-design/pull/42664) [@Digital-512](https://github.com/Digital-512)
- RTL
  - 💄 Fix ColorPicker style in RTL mode. [#42716](https://github.com/ant-design/ant-design/pull/42716) [@RedJue](https://github.com/RedJue)
  - 💄 Fix Anchor track position in RTL mode. [#42706](https://github.com/ant-design/ant-design/pull/42706) [@qmhc](https://github.com/qmhc)

## 5.5.1

`2023-05-22`

- 🐞 Fix wrong Button icon size and margin. [#42516](https://github.com/ant-design/ant-design/pull/42516)
- 🐞 Fix Select remove &amp; selected icon not align in center. [#42513](https://github.com/ant-design/ant-design/pull/42513)
- 🐞 Refactor Popconfirm DOM structure to fix extra margin before `title` and `description` when `icon={null}`. [#42433](https://github.com/ant-design/ant-design/pull/42433)
- 🐞 Fix Menu item icon not centered when `itemMarginInline` is 0. [#42426](https://github.com/ant-design/ant-design/pull/42426) [@zzwgh](https://github.com/zzwgh)
- 🐞 Fix Tag wrapped with Tooltip will use wrong `font-size` when hover. [#42414](https://github.com/ant-design/ant-design/pull/42414)
- 🐞 Fix Popconfirm trigger `onVisibleChange` twice. [#42393](https://github.com/ant-design/ant-design/pull/42393)
- 🐞 Adjust Tooltip &amp; Popover display logic. Now the first priority is to ensure that it will not be clipped by `overflow: hidden`, and the second is to ensure that it is displayed within the viewport as much as possible. [#42394](https://github.com/ant-design/ant-design/pull/42394)
- ColorPicker
  - 🐞 Optimize ColorPicker the `allowClear` interaction logic, reopening the panel to select a color will default to 100% transparency instead of 0%. [#42439](https://github.com/ant-design/ant-design/pull/42439) [@RedJue](https://github.com/RedJue)
  - 🐞 Optimize ColorPicker interaction. Now it will close panel when click clear button. [#42406](https://github.com/ant-design/ant-design/pull/42406) [@kiner-tang](https://github.com/kiner-tang)
- 💄 Optimize border radius in filter dropdown of Table. [#42451](https://github.com/ant-design/ant-design/pull/42451) [@Yuiai01](https://github.com/Yuiai01)
- 🛠 Remove `addEventListener` from `rc-util/lib/Dom/addEventListener` and use native `addEventListener` instead. [#42464](https://github.com/ant-design/ant-design/pull/42464) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Reduce 1KB @ant-design/icons bundle size. Fix TwoTone icon color to primary color of 5.0. [#42443](https://github.com/ant-design/ant-design/pull/42443)
- 🌐 Add missing translation for `mn_MN`. [#42512](https://github.com/ant-design/ant-design/pull/42512) [@ariunbatb](https://github.com/ariunbatb)
- RTL
  - 💄 Fix Select scrollbar `rtl` direction position. [#42508](https://github.com/ant-design/ant-design/pull/42508) [@BoyYangzai](https://github.com/BoyYangzai)
- TypeScript
  - 🤖 Optimize Slider ref type definition, replace `unknown` and `any` with `SliderRef`. [#42420](https://github.com/ant-design/ant-design/pull/42420) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.5.0

`2023-05-15`

- 🔥 New Component ColorPicker. [#41990](https://github.com/ant-design/ant-design/pull/41990) [@RedJue](https://github.com/RedJue)
- 🆕 Add `DatePicker.generateCalendar` and `Calendar.generateCalendar` custom date component method, no need to import from module path. [#41773](https://github.com/ant-design/ant-design/pull/41773)
- 💄 Optimize the style of Select, TreeSelect, Cascader multi-selection mode, remove the Tag border. [#41480](https://github.com/ant-design/ant-design/pull/41480)
- 🆕 Form `validateFields` support `validateOnly` to not to update UI status. [#42273](https://github.com/ant-design/ant-design/pull/42273)
- 🆕 DatePicker support changeOnBlur to trigger change event without clicking confirm. [#42168](https://github.com/ant-design/ant-design/pull/42168)
- 🆕 Cascader `options` support `disableCheckbox` prop. [#42024](https://github.com/ant-design/ant-design/pull/42024) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm add `onPopupClick` prop. [#42272](https://github.com/ant-design/ant-design/pull/42272) [@bolosea](https://github.com/bolosea)
- 🆕 QRCode add `bgColor` prop to set background color. [#42214](https://github.com/ant-design/ant-design/pull/42214) [@bolosea](https://github.com/bolosea)
- 🆕 Table.Summary.Row component add `onClick` prop. [#42175](https://github.com/ant-design/ant-design/pull/42175) [@Ylg12345](https://github.com/Ylg12345)
- 🆕 Space support ref. [#42266](https://github.com/ant-design/ant-design/pull/42266) [@RedJue](https://github.com/RedJue)
- 🆕 The `size` of Tab defaults to inherit Card. [#42183](https://github.com/ant-design/ant-design/pull/42183) [@huangkairan](https://github.com/huangkairan)
- ConfigProvider
  - 🐞 Fix ConfigProvider `size` prop not work on Pagination. [#42206](https://github.com/ant-design/ant-design/pull/42206)
  - 🐞 Fix ConfigProvider `size` prop not work on Steps. [#42278](https://github.com/ant-design/ant-design/pull/42278) [@wanghui2021](https://github.com/wanghui2021)
  - 🐞 Fix ConfigProvider `size` prop not work on Descriptions. [#42244](https://github.com/ant-design/ant-design/pull/42244) [@wanghui2021](https://github.com/wanghui2021)
  - 🐞 Fix the size is not inherited from ConfigProvider when the `componentSize` is set. [#42199](https://github.com/ant-design/ant-design/pull/42199) [@Ec-tracker](https://github.com/Ec-tracker)
- 🐞 Fix then icon styles for Input are incorrect in Space Compact mode. [#42167](https://github.com/ant-design/ant-design/pull/42167) [@pengyw97](https://github.com/pengyw97)
- 🐞 Fix Popover display empty div when `title` and `content` is null. [#42217](https://github.com/ant-design/ant-design/pull/42217) [@hairgc](https://github.com/hairgc)
- 🐞 Fix the error that Circle Progress does not set `size`. [#41875](https://github.com/ant-design/ant-design/pull/41875) [@notzheng](https://github.com/notzheng)
- 🐞 Fix Progress throws warning `findDOMNode is deprecated in StrictMode`. [#42241](https://github.com/ant-design/ant-design/pull/42241) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Fix the problem that the InputNumber out of range style does not take effect. [#42250](https://github.com/ant-design/ant-design/pull/42250) [@pengyw97](https://github.com/pengyw97)
- 💄 Fix the problem that Divider cannot be displayed normally due to the overwriting of the dashed line style in the vertical direction. [#40418](https://github.com/ant-design/ant-design/pull/40418) [@buqiyuan](https://github.com/buqiyuan)
- 💄 Adjust Tooltip motion that will auto detect best match transform origin. [#42225](https://github.com/ant-design/ant-design/pull/42225)
- 💄 keep Checkbox.Group style the same as v4. [#42103](https://github.com/ant-design/ant-design/pull/42103) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Improve the style when the Menu overflowed. [#42294](https://github.com/ant-design/ant-design/pull/42294) [@dhalenok](https://github.com/dhalenok)
- 💄 Improve the Segmented mouse active style. [#42249](https://github.com/ant-design/ant-design/pull/42249)
- 🤖 Spin add warning if use `tip` when not in nest pattern. [#42293](https://github.com/ant-design/ant-design/pull/42293)
- 🤖 Component Token name canonicalization. [#42184](https://github.com/ant-design/ant-design/pull/42184)
- TypeScript
  - 🤖 Optimize the type definition of Tag. [#42235](https://github.com/ant-design/ant-design/pull/42235) [@gaoqiiii](https://github.com/gaoqiiii)
  - 🤖 Optimize Notification `getContainer` type definition. [#40206](https://github.com/ant-design/ant-design/pull/40206) [@leshalv](https://github.com/leshalv)
  - 🤖 Improved support for generics MenuItemType and MenuItemProps in the Menu component. [#42240](https://github.com/ant-design/ant-design/pull/42240) [@yangyuanxx](https://github.com/yangyuanxx)
- Locales
  - 🇧🇬 Add bg_BG Form locales. [#42203](https://github.com/ant-design/ant-design/pull/42203) [@tangzixuan](https://github.com/tangzixuan)

## 5.4.7

`2023-05-06`

- 🐞 Fix Menu different margin between Menu.Item and Menu.Submenu in vertical and inline mode. [#42160](https://github.com/ant-design/ant-design/pull/42160)
- 🐞 Fix Breadcrumb using `itemRender` with `path` render additional a element. [#42049](https://github.com/ant-design/ant-design/pull/42049)
- 🐞 Fix Transfer in control mode throw React nest state update warning. [#42033](https://github.com/ant-design/ant-design/pull/42033)
- 🐞 Fix Upload logic of disable state. [#42102](https://github.com/ant-design/ant-design/pull/42102) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix Spin height is inconsistent with its icon children. [#42162](https://github.com/ant-design/ant-design/pull/42162) [@cheapCoder](https://github.com/cheapCoder)
- ⚡️ Improve Affix logic when it does not need to update. [#42015](https://github.com/ant-design/ant-design/pull/42015) [@Simon-He95](https://github.com/Simon-He95)
- ⚡️ Improve Anchor logic when it does not need to scroll. [#42018](https://github.com/ant-design/ant-design/pull/42018) [@Simon-He95](https://github.com/Simon-He95)

## 5.4.6

`2023-04-26`

- 🐞 Fix lots of Table border and radius styling issues. [#41985](https://github.com/ant-design/ant-design/pull/41985)
- 💄 Fix Layout.Sider collapse animation style. [#41993](https://github.com/ant-design/ant-design/pull/41993)
- 🐞 Fix InputNumber font-size error. [#41983](https://github.com/ant-design/ant-design/pull/41983)
- 🐞 Fix responsive Col don't support `flex` prop in `colSize`. [#41962](https://github.com/ant-design/ant-design/pull/41962) [@AlexisSniffer](https://github.com/AlexisSniffer)
- 🐞 Fix Carousel `goTo` is ignored if animation is in progress. [#41969](https://github.com/ant-design/ant-design/pull/41969) [@guan404ming](https://github.com/guan404ming)
- Form
  - 🐞 Resolve Form issue about the feedback icon was not reset after a reset event had been triggered. [#41976](https://github.com/ant-design/ant-design/pull/41976)
  - 🐞 Fixed Form inaccurate data collected by onValuesChange. [#41976](https://github.com/ant-design/ant-design/pull/41976)
- TypeScript
  - 🤖 Fix Menu OverrideContext type missing warning. [#41907](https://github.com/ant-design/ant-design/pull/41907)
  - 🤖 Fix TreeSelect missing `aria-*` definition. [#41978](https://github.com/ant-design/ant-design/pull/41978) [@guan404ming](https://github.com/guan404ming)

## 5.4.5

`2023-04-23`

- 🐞 Fix Anchor that `onChange` was memoized by `useCallback` and wouldn't change. [#41934](https://github.com/ant-design/ant-design/pull/41934) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Draggable Tree that title is not aligned when the text is wrapped. [#41928](https://github.com/ant-design/ant-design/pull/41928) [@Yuiai01](https://github.com/Yuiai01)
- Tree
  - 🐞 Fix Checkbox that title do not align. [#41920](https://github.com/ant-design/ant-design/pull/41920) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 Fix InputNumber that style was override by browser. [#41940](https://github.com/ant-design/ant-design/pull/41940) [@Wxh16144](https://github.com/Wxh16144)
- 🛠 Reduce Switch bundle size by upgrading `rc-switch`. [#41954](https://github.com/ant-design/ant-design/pull/41954)

## 5.4.4

`2023-04-20`

- 💄 Fix Message hooks icon style not follow dynamic theme token. [#41899](https://github.com/ant-design/ant-design/pull/41899)
- 🐞 Fix `@ant-design/cssinjs` that cssinjs may crash if CSS value is `undefined`. [#41896](https://github.com/ant-design/ant-design/pull/41896)

## 5.4.3

`2023-04-19`

- 🐞 Fix FloatButton throws warning `findDOMNode is deprecated in StrictMode`. [#41833](https://github.com/ant-design/ant-design/pull/41833) [@fourcels](https://github.com/fourcels)
- 🐞 MISC: Arrow element support more old browsers which do not support `clip-path: path()`. [#41872](https://github.com/ant-design/ant-design/pull/41872)
- 🐞 Fix Layout.Sider transition issue when switch theme. [#41828](https://github.com/ant-design/ant-design/pull/41828)
- 🐞 Fix the problem that when the type of Tour is primary, the color of the arrow is still white. [#41761](https://github.com/ant-design/ant-design/pull/41761)
- 🐞 Optimize Form field binding, now will ignore comments in Form.Item as subcomponents. [#41771](https://github.com/ant-design/ant-design/pull/41771)
- 🐞 Fix Input.Password show additional toggle button in Edge. [#41759](https://github.com/ant-design/ant-design/pull/41759)
- 💄 Fix styling issues with components that have a Tooltip component as their base within the Space.Compact wrapper. [#41707](https://github.com/ant-design/ant-design/pull/41707) [@foryuki](https://github.com/foryuki)
- 🇩🇪 Fix typo in German locale. [#41780](https://github.com/ant-design/ant-design/pull/41780) [@aaarichter](https://github.com/aaarichter)
- TypeScript
  - 🤖 Optimize the type definition of Modal. [#41742](https://github.com/ant-design/ant-design/pull/41742) [@MuxinFeng](https://github.com/MuxinFeng)

## 5.4.2

`2023-04-11`

- 🐞 Fix unexpected deprecated warning in DatePicker. [#41753](https://github.com/ant-design/ant-design/pull/41753) [@kiner-tang](https://github.com/kiner-tang)
- 🇩🇪 Add missing translations for `de_DE`. [#41747](https://github.com/ant-design/ant-design/pull/41747) [@eldarcodes](https://github.com/eldarcodes)
- TypeScript
  - 🤖 Optimize type of TimePicker `hourStep`. [1fc3675](https://github.com/ant-design/ant-design/commit/1fc3675) [@Wuxh](https://github.com/Wuxh)

## 5.4.1

`2023-04-11`

- 💄 Optimize Select-like component popup logic (e.g. Select, TreeSelect, Cascader). Now always try to display it in the visible area first to reduce the user's extra scrolling cost. [#41619](https://github.com/ant-design/ant-design/pull/41619)
- 💄 Remove fixed height in Badge.Ribbon. [#41661](https://github.com/ant-design/ant-design/pull/41661) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Fix Select width becomes 0px when search after select something. [#41722](https://github.com/ant-design/ant-design/pull/41722)
- 🐞 Fix Empty style in small width container. [#41727](https://github.com/ant-design/ant-design/pull/41727)
- 🐞 Improve Form.Item `noStyle` validation message reveal logic. [#41698](https://github.com/ant-design/ant-design/pull/41698) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix that Form.Item should not support `requiredMark`. [#41725](https://github.com/ant-design/ant-design/pull/41725) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Space should not affect font style and font family. [#40326](https://github.com/ant-design/ant-design/pull/40326)
- 🐞 Fix the problem that the hover style of the Previous/Next button in Pagination simple mode is lost. [#41685](https://github.com/ant-design/ant-design/pull/41685)
- 🐞 Fix Tree `switcherIcon` cannot be hidden. [#41708](https://github.com/ant-design/ant-design/pull/41708) [@acyza](https://github.com/acyza)
- 🐞 Fix `List.Item.Meta` avatar and title are not aligned. [#41688](https://github.com/ant-design/ant-design/pull/41688) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Row justify setting `space-evenly` does not work. [#41679](https://github.com/ant-design/ant-design/pull/41679) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Button type to support custom data attributes. [#41650](https://github.com/ant-design/ant-design/pull/41650)
- 🐞 Fix Table column width issue when `rowSelection.selections` is not empty. [#41626](https://github.com/ant-design/ant-design/pull/41626)
- 🐞 Fix Mentions dropdown style. [#41660](https://github.com/ant-design/ant-design/pull/41660)
- 🐞 Improve Form.Item on `require` judgment logic. [#41623](https://github.com/ant-design/ant-design/pull/41623) [@Wxh16144](https://github.com/Wxh16144)
- Locales
  - 🇹🇭 add Tour, Image, and QRCode Thai locale. [#41697](https://github.com/ant-design/ant-design/pull/41697) [@buildingwatsize](https://github.com/buildingwatsize)

## 5.4.0

`2023-04-03`

- 🗑 Remove `antd/es/locale-provider` `antd/lib/locale-provider` directory since LocaleProvider was replaced by ConfigProvider and removed in 4.x version years before. [#41289](https://github.com/ant-design/ant-design/pull/41289) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 DatePicker/TimePicker/Calendar could change date-library to luxon now. [#41580](https://github.com/ant-design/ant-design/pull/41580) [@hihuz](https://github.com/hihuz)
- 🆕 Add Form.Item.useStatus hook to get error messages. [#41554](https://github.com/ant-design/ant-design/pull/41554) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Input and Input.TextArea support `classNames` and `styles` props. [#41493](https://github.com/ant-design/ant-design/pull/41493)
- 🆕 Tag add `bordered={false}` to support border-less style. [#41305](https://github.com/ant-design/ant-design/pull/41305) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 FloatButton support `badge` prop. [#41040](https://github.com/ant-design/ant-design/pull/41040) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Select add `title` property. [#41280](https://github.com/ant-design/ant-design/pull/41280)
- 🆕 Image component supports `preview.rootClassName`. [#41265](https://github.com/ant-design/ant-design/pull/41265) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Modal added `afterOpenChange` prop. [#41253](https://github.com/ant-design/ant-design/pull/41253) [@MuxinFeng](https://github.com/MuxinFeng)
- 🆕 Form.useWatch could watch field change at preserve mode. [#41191](https://github.com/ant-design/ant-design/pull/41191) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Refactor some components by using `useMemo`. [#41533](https://github.com/ant-design/ant-design/pull/41533) [#41550](https://github.com/ant-design/ant-design/pull/41550) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Refactor Checkbox with hooks and new types. [#41117](https://github.com/ant-design/ant-design/pull/41117)
- 🛠 Refactor Input.TextArea that move count into `affixWrapper` element. [#41450](https://github.com/ant-design/ant-design/pull/41450)
- 🆕 DatePicker/Calendar add `cellRender` for custom cells and deprecated properties `dateRender` and `monthCellRender` in DatePicker, deprecated properties `dateCellRender`、`monthCellRender`、`dateFullCellRender`、`monthFullCellRender` in Calendar. [#41584](https://github.com/ant-design/ant-design/pull/41584) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Tour double arrow problem. [#41578](https://github.com/ant-design/ant-design/pull/41578) [@acyza](https://github.com/acyza)
- 🐞 Fix Checkbox with customize `controlHeight` token not align in center with text. [#41566](https://github.com/ant-design/ant-design/pull/41566)
- 🐞 Fix Form.Item not rendering correctly in Modal when it has `help`. [#40519](https://github.com/ant-design/ant-design/pull/40519) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Form wrong UI status when using `hasFeedback`. [#41594](https://github.com/ant-design/ant-design/pull/41594) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Slider throws warning `[antd: Tooltip] forcePopupAlign is align to forceAlign instead`. [#41540](https://github.com/ant-design/ant-design/pull/41540) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Fix checkable Table checking not working when click on the edge of checkbox. [#41519](https://github.com/ant-design/ant-design/pull/41519)
- Locales
  - 🇲🇲 Added Burmese locale. [#41366](https://github.com/ant-design/ant-design/pull/41366) [@enson0131](https://github.com/enson0131)
  - 🇻🇳 Fix Vietnamese locale text. [#41320](https://github.com/ant-design/ant-design/pull/41320) [@trongtai37](https://github.com/trongtai37) [#41345](https://github.com/ant-design/ant-design/pull/41345) [@duypham90](https://github.com/duypham90)
  - 🇩🇪 Update TimePicker german locale. [#41521](https://github.com/ant-design/ant-design/pull/41521) [@Yuiai01](https://github.com/Yuiai01)

## 5.3.3

`2023-03-28`

- Menu
  - 🐞 Fix Menu `items` not accept `key` issue. [#41434](https://github.com/ant-design/ant-design/pull/41434) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 Fix submenu themes being overwritten when using `getPopupContainer` to select the main Menu. [#41465](https://github.com/ant-design/ant-design/pull/41465) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Table filter do not persist filter status when filter dropdown is visible. [#41445](https://github.com/ant-design/ant-design/pull/41445) [@ablakey](https://github.com/ablakey)
- 🐞 Fix Modal using `useModal` is not transparent and prefers user settings. [#41422](https://github.com/ant-design/ant-design/pull/41422) [@luo3house](https://github.com/luo3house)
- Form
  - 🐞 Fix the problem that the Form validation state does not change in sequence. [#41412](https://github.com/ant-design/ant-design/pull/41412) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Fix Form component layout exceptions when set props `layout="inline"`. [#41140](https://github.com/ant-design/ant-design/pull/41140) [@itkui](https://github.com/itkui)
- 💄 Fix ConfigProvider `nonce` not working on CSS-in-JS style. [#41482](https://github.com/ant-design/ant-design/pull/41482)
- 💄 Fix Pagination when `size=small`, pagination button active, previous page next page button hover and active styles are lost. [#41462](https://github.com/ant-design/ant-design/pull/41462) [#41458](https://github.com/ant-design/ant-design/pull/41458)
- 💄 Fix the style problem that the bottom border of the Tabs component overlaps with other borders. [#41381](https://github.com/ant-design/ant-design/pull/41381)
- 💄 Fix Dropdown.Button down icon size issue. [#41501](https://github.com/ant-design/ant-design/pull/41501)
- TypeScript
  - 🐞 Fix the incorrect type definition of Breadcrumb.Item `menu`. [#41373](https://github.com/ant-design/ant-design/pull/41373)
  - 🤖 Optimize Grid Col type. [#41453](https://github.com/ant-design/ant-design/pull/41453) [@vaakian](https://github.com/vaakian)
  - 🤖 Optimize Table `resetPagination` type. [#41415](https://github.com/ant-design/ant-design/pull/41415)
  - 🤖 Optimize TreeSelect `InternalTreeSelect` type. [#41386](https://github.com/ant-design/ant-design/pull/41386) [@Andarist](https://github.com/Andarist)
- Locales
  - 🇮🇷 Improve DatePicker `fa_IR` translation. [#41455](https://github.com/ant-design/ant-design/pull/41455) [@ds1371dani](https://github.com/ds1371dani)
  - 🇸🇪 Add the missing content of `sv_SE` language. [#41424](https://github.com/ant-design/ant-design/pull/41424) [@dhalenok](https://github.com/dhalenok)

## 5.3.2

`2023-03-20`

- Anchor
  - 💄 Fix Anchor redundant border style when it is set to horizontal direction. [#41336](https://github.com/ant-design/ant-design/pull/41336) [@gooyoung](https://github.com/gooyoung)
  - 💄 Fix Anchor ink square style in `vertical` mode. [#41317](https://github.com/ant-design/ant-design/pull/41317) [@acyza](https://github.com/acyza)
- 🐞 Fix Grid `offset` can not be overwritten problem under different device screen sizes. [#41309](https://github.com/ant-design/ant-design/pull/41309) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Breadcrumb `onClick` not working bug. [#41283](https://github.com/ant-design/ant-design/pull/41283) [@acyza](https://github.com/acyza)
- 🐞 Fix Upload trigger Progress warning after upload. [#41234](https://github.com/ant-design/ant-design/pull/41234) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Table unexpected layout problem when dragging element to the right. [#41139](https://github.com/ant-design/ant-design/pull/41139) [@hoho2017](https://github.com/hoho2017)
- 💄 Fix Tabs more icon color in dark mode. [#41313](https://github.com/ant-design/ant-design/pull/41313) [@PhosphorusP](https://github.com/PhosphorusP)
- 💄 Fix Button focus outline style be covered by Dropdown.Button. [#41282](https://github.com/ant-design/ant-design/pull/41282) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fix Input.TextArea style problem when focusing. [#41228](https://github.com/ant-design/ant-design/pull/41228) [@MuxinFeng](https://github.com/MuxinFeng)
- RTL
  - 💄 Fix Input.TextArea RTL style when enable `showCount`. [#41319](https://github.com/ant-design/ant-design/pull/41319) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 Export `CountdownProps` for Statistic. [#41341](https://github.com/ant-design/ant-design/pull/41341) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 Improve Design Token most alias token meta info. [#41297](https://github.com/ant-design/ant-design/pull/41297) [@arvinxx](https://github.com/arvinxx)
  - 🤖 Improve Badge `React.forwardRef` type definition. [#41189](https://github.com/ant-design/ant-design/pull/41189) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.3.1

`2023-03-13`

- 🐞 Update DatePicker deps to fix laggy in Safari and support align with `transform scale`. [#41090](https://github.com/ant-design/ant-design/pull/41090)
- 🐞 Fix Menu collapse, Tooltip sometime show with unexpected. [#41081](https://github.com/ant-design/ant-design/issues/41081)
- 🐞 Fix Modal.confirm has additional node which makes height not correct. [#41173](https://github.com/ant-design/ant-design/pull/41173) [@Svudec](https://github.com/Svudec)
- 🐞 Fixed InputNumber `disabled` text color not correct. [#41167](https://github.com/ant-design/ant-design/pull/41167) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Anchor highlighting not working when dynamically updating `items`. [#40743](https://github.com/ant-design/ant-design/pull/40743) [@zqran](https://github.com/zqran)
- 🛠 Update Mentions deps to support align with `transform scale`. [#41160](https://github.com/ant-design/ant-design/pull/41160) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Fix Form with manually called `validateFields` not show success status when `hasFeedback` is on. [#41116](https://github.com/ant-design/ant-design/pull/41116) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Cascader sub panel not close when hover to leaf node. [#41134](https://github.com/ant-design/ant-design/issues/41134)
- 🐞 Fix Popconfirm using `Promise` to close will not exist `loading` state even when open again. [#41121](https://github.com/ant-design/ant-design/pull/41121)
- 🐞 Fix Upload `onChange` sometime not sync when in React 18. [#41082](https://github.com/ant-design/ant-design/pull/41082) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛎 Update demo with Space.Compact instead of legacy one and patch warning info. [#41080](https://github.com/ant-design/ant-design/pull/41080) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 Update ko_KR、Added Amharic Language. [#41103](https://github.com/ant-design/ant-design/pull/41103) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.3.0

`2023-03-06`

- 🆕 Tooltip support `arrow.pointAtCenter` and deprecate `arrow.arrowPointAtCenter`. [#40989](https://github.com/ant-design/ant-design/pull/40989)
- 🆕 Progress support custom `size`. [#40903](https://github.com/ant-design/ant-design/pull/40903) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Tour support custom `zIndex`. [#40982](https://github.com/ant-design/ant-design/pull/40982) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Table `onHeaderCell` support customize `colSpan` and `rowSpan`. [#40885](https://github.com/ant-design/ant-design/pull/40885)
- 🆕 Image.Group support `onChange` callback. [#40857](https://github.com/ant-design/ant-design/pull/40857) [@kiner-tang](https://github.com/kiner-tang)
- App
  - 🆕 App support `style` props. [#40708](https://github.com/ant-design/ant-design/pull/40708) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 App support `message` and `notification` options. [#40458](https://github.com/ant-design/ant-design/pull/40458) [@luo3house](https://github.com/luo3house)
- 🆕 ConfigProvider support `useConfig` hook to get `size` and `disabled` in context. [#40215](https://github.com/ant-design/ant-design/pull/40215) [@xliez](https://github.com/xliez)
- 🆕 Breadcrumb support `items` prop. [#40543](https://github.com/ant-design/ant-design/pull/40543) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Breadcrumb separators are unified into `li` elements. [#40887](https://github.com/ant-design/ant-design/pull/40887) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Tooltip support auto arrow position &amp; adjust position if possible. `destroyTooltipOnHide.keepParent` is deprecated since it will be always auto destroy unnecessary container now. [#40632](https://github.com/ant-design/ant-design/pull/40632)
- 🛠 Rename preset colors in token, .e.g `blue-1` to `blue1`, and deprecate tokens before. [#41071](https://github.com/ant-design/ant-design/pull/41071)
- 💄 Message use `colorText` in style. [#41047](https://github.com/ant-design/ant-design/pull/41047) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fix Select, TreeSelect, Cascader popup align position not correct when parent has `transform: scale` style. [#41013](https://github.com/ant-design/ant-design/pull/41013)
- 💄 Optimize `rowScope` style for Table. [#40304](https://github.com/ant-design/ant-design/pull/40304) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Provide Design Token new AliasToken `lineWidthFocus` for `outline-width` of focused component. [#40840](https://github.com/ant-design/ant-design/pull/40840)
- 💄 DatePicker.WeekPicker support hover style. [#40772](https://github.com/ant-design/ant-design/pull/40772)
- 💄 Adjust Select, TreeSelect, Cascader always show the `arrow` by default when multiple. [#41028](https://github.com/ant-design/ant-design/pull/41028)
- 🐞 Fix Form `Form.Item.useStatus` problem with sever-side-rendering. [#40977](https://github.com/ant-design/ant-design/pull/40977) [@AndyBoat](https://github.com/AndyBoat)
- 🐞 MISC: Fix arrow shape in some components. [#40971](https://github.com/ant-design/ant-design/pull/40971)
- 🐞 Fix Layout throw `React does not recognize the `suffixCls` prop on a DOM element` warning. [#40969](https://github.com/ant-design/ant-design/pull/40969)
- 🐞 Fix Watermark that text will be displayed when the picture loads abnormally. [#40770](https://github.com/ant-design/ant-design/pull/40770) [@OriginRing](https://github.com/OriginRing)
- 🐞 Image support flip function in preview mode. Fix Image `fallback` when used in ssr. [#40660](https://github.com/ant-design/ant-design/pull/40660)
- 🐞 Fix Typography component is not centered in the Select component. [#40422](https://github.com/ant-design/ant-design/pull/40422) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 Update locale `vi_VN` adding Vietnamese translation for Form component validation. [#40992](https://github.com/ant-design/ant-design/pull/40992) [@lamvananh](https://github.com/lamvananh)
- RTL
  - 💄 FloatButton support `rtl` mode. [#40990](https://github.com/ant-design/ant-design/pull/40990) [@li-jia-nan](https://github.com/li-jia-nan)
- TypeScript
  - 🤖 Fix Cascader that generics should not be necessary. [#40961](https://github.com/ant-design/ant-design/pull/40961) [@crazyair](https://github.com/crazyair)

## 5.2.3

`2023-02-27`

- 🐞 Fix for setting `percent` and `success.percent` at the same time for `Progress`, the progress text does not change as `percent` changes. [#40922](https://github.com/ant-design/ant-design/pull/40922)
- 🐞 Fixed Image preview icon was misaligned. [#40911](https://github.com/ant-design/ant-design/pull/40911)
- 🐞 Fix ConfigProvider validation message template override Form configure template sometime. [#40533](https://github.com/ant-design/ant-design/pull/40533) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed Confirm Modal `onOk` event could be triggered twice when close. [#40719](https://github.com/ant-design/ant-design/pull/40719) [@Rafael-Martins](https://github.com/Rafael-Martins)
- 🛠 Rewrote the `useLocale` method and exposed `localeCode` to the public. [#40884](https://github.com/ant-design/ant-design/pull/40884) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fixed Segmented component items were unresponsive to mouse events. [#40894](https://github.com/ant-design/ant-design/pull/40894)
- 🛠 Refactored: replaced the LocaleReceiver component with `useLocale` and removed the LocaleReceiver component. [#40870](https://github.com/ant-design/ant-design/pull/40870) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fixed `getPopupContainer` property injected by ConfigProvider did not work. [#40871](https://github.com/ant-design/ant-design/pull/40871) [@RedJue](https://github.com/RedJue)
- 🐞 Fixed where Descriptions did not accept `data-_` and `aria-_` attributes. [#40859](https://github.com/ant-design/ant-design/pull/40859) [@goveo](https://github.com/goveo)
- 🛠 Changed the Breadcrumb Separator's DOM element from `span` to `li`. [#40867](https://github.com/ant-design/ant-design/pull/40867) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix token of `Layout.colorBgHeader` not work when single use Layout.Header directly. [#40933](https://github.com/ant-design/ant-design/pull/40933)
- 💄 Changed Design Token the component's focus `outline` to the default `4px`. [#40839](https://github.com/ant-design/ant-design/pull/40839)
- 🐞 Fixed the Badge color was displayed abnormally. [#40848](https://github.com/ant-design/ant-design/pull/40848) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fixed an issue with the Timeline item's `className`. [#40835](https://github.com/ant-design/ant-design/pull/40835) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Fixed the interaction style of the Rate component in the disabled state. [#40836](https://github.com/ant-design/ant-design/pull/40836) [@Yuiai01](https://github.com/Yuiai01)
- 🇮🇷 Added Iranian localization. [#40895](https://github.com/ant-design/ant-design/pull/40895) [@majidsadr](https://github.com/majidsadr)

## 5.2.2

`2023-02-19`

- DatePicker
  - 💄 Optimize DatePicker date panel style. [#40768](https://github.com/ant-design/ant-design/pull/40768)
  - 🐞 Fix DatePicker.RangePicker hover style on wrong date. [#40785](https://github.com/ant-design/ant-design/pull/40785) [@Yuiai01](https://github.com/Yuiai01)
- Form
  - 🐞 Fixed inconsistency between Checkbox and Radio in table when Form is `disabled`. [#40728](https://github.com/ant-design/ant-design/pull/40728) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 Fix Radio/Checkbox under Form `disabled` property don't works correctly. [#40741](https://github.com/ant-design/ant-design/pull/40741) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix List extra padding when enable `grid` property. [#40806](https://github.com/ant-design/ant-design/pull/40806)
- 🐞 Fix Upload actions icon alignment issue. [#40805](https://github.com/ant-design/ant-design/pull/40805)
- 💄 Tweak Table filter dropdown radius style. [#40802](https://github.com/ant-design/ant-design/pull/40802)
- 🐞 Fix Button `loading.delay` not delay at first time. [#40759](https://github.com/ant-design/ant-design/pull/40759) [@RedJue](https://github.com/RedJue)
- 🐞 Fix Input status style when using `addonAfter` and `addonBefore`. [#40744](https://github.com/ant-design/ant-design/pull/40744) [@carla-cn](https://github.com/carla-cn)
- 🐞 Fix Skeleton `active` flicky animation in Safari. [#40692](https://github.com/ant-design/ant-design/pull/40692) [@slotDumpling](https://github.com/slotDumpling)
- Locales
  - 🇫🇷 Added french locale for Tour component. [#40750](https://github.com/ant-design/ant-design/pull/40750) [@RedJue](https://github.com/RedJue)
  - 🇰🇷 Update ko_KR locale. [#40716](https://github.com/ant-design/ant-design/pull/40716) [@owjs3901](https://github.com/owjs3901)

## 5.2.1

`2023-02-13`

- 🛠 Rewrite `panelRender` in Tour to function component. [#40670](https://github.com/ant-design/ant-design/pull/40670) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Timeline `className` property wrongly passed to child nodes. [#40700](https://github.com/ant-design/ant-design/pull/40700) [@any1024](https://github.com/any1024)
- 🐞 Fix Slider dot to trigger click and hover correctly. [#40679](https://github.com/ant-design/ant-design/pull/40679) [@LongHaoo](https://github.com/LongHaoo)
- 🐞 Fix Tour that should support `0` as element. [#40631](https://github.com/ant-design/ant-design/pull/40631) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix DatePicker.RangePicker hover range style. [#40607](https://github.com/ant-design/ant-design/pull/40607) [@Yuiai01](https://github.com/Yuiai01)
- 💄 Optimize Steps custom `icon` size. [#40672](https://github.com/ant-design/ant-design/pull/40672)
- TypeScript
  - 🤖 Update Upload to support generic types. [#40634](https://github.com/ant-design/ant-design/pull/40634) [@riyadelberkawy](https://github.com/riyadelberkawy)
- 🌐 Localization
  - 🇷🇺/🇺🇦 add missing translations for ru_RU and uk_UA. [#40656](https://github.com/ant-design/ant-design/pull/40656) [@eldarcodes](https://github.com/eldarcodes)

## 5.2.0

`2023-02-08`

- 🔥 Add `picture-circle` to Upload's `listType` prop. [#40134](https://github.com/ant-design/ant-design/pull/40134) [@ds1371dani](https://github.com/ds1371dani)
- 🔥 Anchor component add `direction`, which supports vertical. [#39372](https://github.com/ant-design/ant-design/pull/39372) [@foryuki](https://github.com/foryuki)
- 🆕 Tooltip support `arrow` to change arrow's visible state and whether the arrow is pointed at the center of target. [#40234](https://github.com/ant-design/ant-design/pull/40234) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Added List pagination `align` option. [#39858](https://github.com/ant-design/ant-design/pull/39858) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Timeline added `items` to support option configuration. [#40424](https://github.com/ant-design/ant-design/pull/40424)
- Collapse
  - 🆕 Collapse supports setting `size`. [#40286](https://github.com/ant-design/ant-design/pull/40286) [@Yuiai01](https://github.com/Yuiai01)
  - 🆕 Add ref for Collapse and Panel. [#40443](https://github.com/ant-design/ant-design/pull/40443) [@any1024](https://github.com/any1024)
- Slider
  - 🆕 Slider add `railStyle` for custom style. [#40579](https://github.com/ant-design/ant-design/pull/40579) [@david-cord](https://github.com/david-cord)
  - 🆕 Slider add support for disable `keyboard` events. [#40526](https://github.com/ant-design/ant-design/pull/40526)
  - 🐞 Fix Slider missing Tooltip appear motion. [#39857](https://github.com/ant-design/ant-design/pull/39857)
- Dropdown
  - 🆕 Dropdown support `autoAdjustOverflow` option. [#39735](https://github.com/ant-design/ant-design/pull/39735)
  - 💄 Fix Dropdown component `danger` and `disabled` style priority issue. [#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- Tour
  - 🆕 Tour added `indicatorsRender` to support custom indicators. [#40613](https://github.com/ant-design/ant-design/pull/40613)
  - 🆕 Tour support `scrollIntoViewOptions` to change scrollIntoView options. [#39980](https://github.com/ant-design/ant-design/pull/39980) [@kiner-tang](https://github.com/kiner-tang)
  - 🆕 Tour masks support passing custom styles and fill colors. [#39919](https://github.com/ant-design/ant-design/pull/39919) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fixed Tour thrown `findDomNode` warning when called in strict mode. [#40160](https://github.com/ant-design/ant-design/pull/40160) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Deleted Tour margin of the last indicator. [#40624](https://github.com/ant-design/ant-design/pull/40624)
- 🆕 Adds Design token `fontFamilyCode` and apply to Typography `code` `kbd` `pre` elements. [#39823](https://github.com/ant-design/ant-design/pull/39823)
- 🆕 ConfigProvider add Form `scrollToFirstError`. [#39509](https://github.com/ant-design/ant-design/pull/39509) [@linxianxi](https://github.com/linxianxi)
- 🆕 Global: Fill rest `rootClassName` for all components. [#40217](https://github.com/ant-design/ant-design/pull/40217)
- 🐞 Fix Empty descriptions text color in default theme and dark theme. [#40584](https://github.com/ant-design/ant-design/pull/40584) [@MuxinFeng](https://github.com/MuxinFeng)
- Table
  - 🐞 Fix `aria-label` and `role="presentation"` cannot be used together in Table row. [#40413](https://github.com/ant-design/ant-design/pull/40413) [@Ke1sy](https://github.com/Ke1sy)
  - 🐞 Fix Table uncontrolled `filtered` update not working. [#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 Fix Table header filter is invalid in the case of group headers. [#40463](https://github.com/ant-design/ant-design/pull/40463) [@roman40a](https://github.com/roman40a)
  - 🐞 Fix Table selection column cover by other cell when fixed. [#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 Fix Table Sorted/Filtered fixed column transparent background unreadable. [#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Optimize Table hover style to fix problems with border. [#40469](https://github.com/ant-design/ant-design/pull/40469)
- DatePicker
  - 🐞 Fix DatePicker that have status style when disabled. [#40608](https://github.com/ant-design/ant-design/pull/40608)
  - 💄 Optimize the DatePicker input box style. [#40549](https://github.com/ant-design/ant-design/pull/40549) [@Wxh16144](https://github.com/Wxh16144)
  - 💄 Optimize DatePicker Dropdown arrow style. [#40521](https://github.com/ant-design/ant-design/pull/40521)
- 🐞 Fix Space `ant-space-item` selector bug. [#40554](https://github.com/ant-design/ant-design/pull/40554) [@cncolder](https://github.com/cncolder)
- 🐞 Fix not close Spin immediately when using `delay`. [#40475](https://github.com/ant-design/ant-design/pull/40475) [@3Alan](https://github.com/3Alan)
- 🐞 Fix Modal `useModal` default confirm button text logic. [#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 🛠 Refactored the water ripple visual effect to trigger multiple water ripples at the same time. [#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Refactor Input.TextArea and Mentions. [#40045](https://github.com/ant-design/ant-design/pull/40045)
- 🛠 Refactor Affix Calendar to use React.createRef instead of function. [#40538](https://github.com/ant-design/ant-design/pull/40538) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Tabs more button unexpected height. [#40488](https://github.com/ant-design/ant-design/pull/40488)
- 💄 Resolve Image preview style conflict with TailwindCSS. [#39914](https://github.com/ant-design/ant-design/pull/39914)
- 💄 Fix Progress that `transition` of success bar is missing. [#40487](https://github.com/ant-design/ant-design/pull/40487)
- 💄 Fix the misalignment of Input.Group when zooming the screen under windows. [#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 💄 Fix Select placeholder style issue. [#40477](https://github.com/ant-design/ant-design/pull/40477) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Adjust Descriptions label style for more readable. [#40085](https://github.com/ant-design/ant-design/pull/40085)
- 💄 Optimize QRCode expiration display style. [#39849](https://github.com/ant-design/ant-design/pull/39849)
- 💄 Optimize Design Token `boxShadow` tokens. [#40516](https://github.com/ant-design/ant-design/pull/40516)
- TypeScript
  - 🤖 Optimize Badge Tag Tooltip `color` type definition. [#39871](https://github.com/ant-design/ant-design/pull/39871)
  - 🤖 MISC: Add `Breakpoint` `ThmeConfig` `GlobalToken` type export. [#40508](https://github.com/ant-design/ant-design/pull/40508) [@Kamahl19](https://github.com/Kamahl19)
  - 🤖 Update Upload `fileList` type. [#40585](https://github.com/ant-design/ant-design/pull/40585)
  - 🤖 Remove Tour ForwardRefRenderFunction. [#39924](https://github.com/ant-design/ant-design/pull/39924)
- 🌐 Localization
  - 🇮🇳 Add `ta_IN` local. [#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.7

`2023-01-31`

- Input
  - 🐞 Fix Input that unexpected cancel button is shown when `type="search"`. [#40457](https://github.com/ant-design/ant-design/pull/40457)
  - 🐞 Fix Input suffix color does not update bug when component status changed. [#40344](https://github.com/ant-design/ant-design/pull/40344) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch text layout problem in Safari and Chrome <= 84 with compatible mode. [#40453](https://github.com/ant-design/ant-design/pull/40453) [@Ifeinstein](https://github.com/Ifeinstein)
- 🐞 Fix Progress that throw error when `percent` is `null`. [#40378](https://github.com/ant-design/ant-design/pull/40378) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix List title and avatar be rendered in the wrong position. [#40395](https://github.com/ant-design/ant-design/pull/40395) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Dropdown submenu wrong position. [#40349](https://github.com/ant-design/ant-design/pull/40349)
- 🐞 Fix Badge throw `findDOMNode` warning in StrictMode when `dot` switch. [#40347](https://github.com/ant-design/ant-design/pull/40347)
- 🐞 Fix Message wrong icon color problem. [#40471](https://github.com/ant-design/ant-design/pull/40471) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Adjust Empty component default style in dark theme. [#40447](https://github.com/ant-design/ant-design/pull/40447)
- RTL
  - 💄 Fix Table scroll shadow in RTL mode. [#40441](https://github.com/ant-design/ant-design/pull/40441) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 Export ConfigProvider's ThemeConfig type. [#40370](https://github.com/ant-design/ant-design/pull/40370) [@Kamahl19](https://github.com/Kamahl19)

## 5.1.6

`2023-01-20`

- 🐞 Fix DatePicker animation timing function. [#40133](https://github.com/ant-design/ant-design/pull/40133)
- Menu
  - 🐞 Fix Tooltip incorrectly shown when Menu collapsed. [#40328](https://github.com/ant-design/ant-design/pull/40328)
  - 🐞 Fix Menu split line style error. [#40268](https://github.com/ant-design/ant-design/pull/40268) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix the console warning of Wave effect when bind component unmount before wave effect trigger. [#40307](https://github.com/ant-design/ant-design/pull/40307) [@luo3house](https://github.com/luo3house)
- 🐞 Fix Breadcrumb throw wrong overlay deprecation warning when use `menu` prop. [#40211](https://github.com/ant-design/ant-design/pull/40211) [@candy4290](https://github.com/candy4290)
- 🐞 Fix Modal.useModal hooks `destroyAll` not work as expect. [#40281](https://github.com/ant-design/ant-design/pull/40281) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix `message` global static method `config` setting `duration` not working. [#40232](https://github.com/ant-design/ant-design/pull/40232) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Button text color when containing an `a` tag. [#40269](https://github.com/ant-design/ant-design/pull/40269) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Radio displaying wrong text color and cursor when `disabled`. [#40273](https://github.com/ant-design/ant-design/pull/40273) [@ds1371dani](https://github.com/ds1371dani)
- 💄 Optimize Design Token calculation logic of focus `outline`, replace `lineWidth` with `lineWidthBold`. [#40291](https://github.com/ant-design/ant-design/pull/40291) [@simonpfish](https://github.com/simonpfish)
- 💄 MISC: Rewrite part component style to compatible the browser that not support concat `:not` selector. [#40264](https://github.com/ant-design/ant-design/pull/40264)
- 🌐 Fix missing translation for `pt_BR`. [#40270](https://github.com/ant-design/ant-design/pull/40270) [@rafaelncarvalho](https://github.com/rafaelncarvalho)

## 5.1.5

`2023-01-15`

- 🐞 Fix Checkbox that label not aligned with checkbox. [#40208](https://github.com/ant-design/ant-design/pull/40208)
- 🐞 Fix Button wave effect sometime makes layout shaking. [#40192](https://github.com/ant-design/ant-design/pull/40192)
- 🐞 Fix Select crash problem. [#40158](https://github.com/ant-design/ant-design/pull/40158) [@helloqian12138](https://github.com/helloqian12138)
- 🐞 Fix Timeline custom color displaying wrong classname &amp; alignment overflow. [#39394](https://github.com/ant-design/ant-design/pull/39394) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Breadcrumb last item color. [#40119](https://github.com/ant-design/ant-design/pull/40119) [@messaooudi](https://github.com/messaooudi)
- 💄 Fix Table sticky table header shadow style. [#40171](https://github.com/ant-design/ant-design/pull/40171) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix Segmented item hover radius style. [#40175](https://github.com/ant-design/ant-design/pull/40175) [#40179](https://github.com/ant-design/ant-design/pull/40179)
- TypeScript
  - 🤖 Fix Tabs `onEdit` Callback parameter type problem. [#39926](https://github.com/ant-design/ant-design/pull/39926) [@RSS1102](https://github.com/RSS1102)
- RTL
  - 💄 Fix DatePicker's next &amp; prev icons in RTL mode. [#40238](https://github.com/ant-design/ant-design/pull/40238) [@ds1371dani](https://github.com/ds1371dani)
  - 💄 Fix Badge RTL style when wrap a block element. [#40125](https://github.com/ant-design/ant-design/pull/40125)

## 5.1.4

`2023-01-09`

- 🐞 Fix missing locale file. [#40116](https://github.com/ant-design/ant-design/pull/40116)
- 🐞 Fix Cascader dropdown `placement` in RTL mode. [#40109](https://github.com/ant-design/ant-design/pull/40109) [@3hson](https://github.com/3hson)
- 🐞 Fix `rc-motion` animation flicking in some components. [react-component/motion#39](https://github.com/react-component/motion/pull/39)

## 5.1.3

`2023-01-09`

- Table
  - 🛠 Optimize the Table `shouldCellUpdate` logic to increase the secondary rendering speed. [#40063](https://github.com/ant-design/ant-design/pull/40063)
  - 🐞 Fix Table `columns.render` not trigger re-render when render function use closure data. [#40004](https://github.com/ant-design/ant-design/pull/40004)
  - 🐞 Fix when Table filter, the border will be black. [#39938](https://github.com/ant-design/ant-design/pull/39938) [@JarvisArt](https://github.com/JarvisArt)
- Button
  - 🐞 Fix Button wave effect not following screen scroll. [#39954](https://github.com/ant-design/ant-design/pull/39954)
  - 🐞 Fix Button `block` props not work. [#39992](https://github.com/ant-design/ant-design/pull/39992) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Menu custom expand icon cannot be hidden. [#40071](https://github.com/ant-design/ant-design/pull/40071) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Fix circular Progress text not being displayed in rtl mode. [#40103](https://github.com/ant-design/ant-design/pull/40103)
- 💄 Fix horizontal Menu style with `theme="dark"`. [#40105](https://github.com/ant-design/ant-design/pull/40105)
- 🐞 Fix Cascader `notFoundContent` cannot be clicked. [#40067](https://github.com/ant-design/ant-design/pull/40067)
- 🐞 Fix Transfer Checkbox not disabled when itemsLits is empty. [#40038](https://github.com/ant-design/ant-design/pull/40038) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Fix Checkbox style with `disabled` and `indeterminate`. [#39974](https://github.com/ant-design/ant-design/pull/39974) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 Fix Alert.ErrorBoundary description overflow bug. [#40033](https://github.com/ant-design/ant-design/pull/40033)
- 💄 Fix Tag onClick as undefined, click the mouse to display the border style. [#40023](https://github.com/ant-design/ant-design/pull/40023) [@crazyair](https://github.com/crazyair)
- 💄 Fix Avatar.Group item margin when item is wrapped by other elements. [#39993](https://github.com/ant-design/ant-design/pull/39993)
- 🐞 Fix Menu.Submenu arrow transition. [#39945](https://github.com/ant-design/ant-design/pull/39945) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Table selection column cover by other cell when fixed. [#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
- 🌐 Add missing ta_IN translations. [#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.2

`2022-12-30`

- 📖 Theme Editor supports uploading themes. [#39621](https://github.com/ant-design/ant-design/pull/39621) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Refactor Wave effect that can now trigger multiple times. [#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- Table
  - 🐞 Fix Table `column.filtered` cannot be updated. [#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 Fix Table fixed column which is sorted or filtered transparent background bug. [#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Image preview style conflict with TailwindCSS. [#39914](https://github.com/ant-design/ant-design/pull/39914)
- 🐞 Fix Dropdown `danger` and `disabled` style priority bug. [#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix App.useApp `modal` default `okText`. [#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 Fix Input.Group misplace style when zoom up in windows. [#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Slider missing Tooltip appear motion. [#39857](https://github.com/ant-design/ant-design/pull/39857)
- 🐞 Fix QRCode missing expired style. [#39849](https://github.com/ant-design/ant-design/pull/39849) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Tree switcher's background display unexpected in dark theme. [#39838](https://github.com/ant-design/ant-design/pull/39838) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Fix Menu slide bar style issue when `border` is reset by preset. [#39819](https://github.com/ant-design/ant-design/pull/39819)
- 🐞 Fix Checkbox not support Tooltip or Popover when it is `disabled`. [#39829](https://github.com/ant-design/ant-design/pull/39829)

## 5.1.1

`2022-12-26`

- 📦 Remove IE and other legacy browsers from browserslist to reduce bundle size. [#38779](https://github.com/ant-design/ant-design/pull/38779)
- ⚡️ Improve Transfer performance when selecting and moving nodes with large data. [#39465](https://github.com/ant-design/ant-design/pull/39465) [@wqs576222103](https://github.com/wqs576222103)
- 🐞 Fix Design Token wrong `font-family` of components. [#39806](https://github.com/ant-design/ant-design/pull/39806)
- 🐞 Fix Drawer default props not working when `placement` `open` `width` are `undefined`. [#39782](https://github.com/ant-design/ant-design/pull/39782)
- 🐞 Fix Menu icon animation when collapse it. [#39800](https://github.com/ant-design/ant-design/pull/39800) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Image preview operation bar is covered during the animation. [#39788](https://github.com/ant-design/ant-design/pull/39788) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix List crash when `pagination.pageSize` is undefined. [#39681](https://github.com/ant-design/ant-design/pull/39681) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Space `align="baseline"` not working. [#39748](https://github.com/ant-design/ant-design/pull/39748) [@candy4290](https://github.com/candy4290)
- Table
  - 🐞 Fix Table expandable row header has no top left border radius. [#39781](https://github.com/ant-design/ant-design/pull/39781) [@chunsch](https://github.com/chunsch)
  - 🐞 Fix Table header radius missing when has fixed header and columns. [#39723](https://github.com/ant-design/ant-design/pull/39723)
  - 🐞 Fix Table missing `border-bottom` in merged cell and unexpected border color if overlapping. [#39729](https://github.com/ant-design/ant-design/pull/39729)
  - ⌨️ Improve Table a11y by appling aria-props to table element. [#39700](https://github.com/ant-design/ant-design/pull/39700)
  - ⌨️ Reset `aria-label` in Table column. [#39738](https://github.com/ant-design/ant-design/pull/39738) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 Adds transition animation for Table border. [#39713](https://github.com/ant-design/ant-design/pull/39713) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix Tabs add button color invisible in dark mode. [#39724](https://github.com/ant-design/ant-design/pull/39724)
- 🐞 Fix the problem that the height of the title bar is not enough when Card only has `extra`. [#39646](https://github.com/ant-design/ant-design/pull/39646) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix `justify` and `align` properties are not reactive in Row. [#39704](https://github.com/ant-design/ant-design/pull/39704) [@candy4290](https://github.com/candy4290)
- 🐞 Fix warning in App about two children with the same key. [#39695](https://github.com/ant-design/ant-design/pull/39695) [@Kamahl19](https://github.com/Kamahl19), [#39701](https://github.com/ant-design/ant-design/pull/39701) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Image preview interactive optimization. [#39812](https://github.com/ant-design/ant-design/pull/39812) [@JarvisArt](https://github.com/JarvisArt)
- 💄 Fix Table filter dropdown wrong active background and dropdown shadow style. [#39805](https://github.com/ant-design/ant-design/pull/39805)
- TypeScript
  - 🤖 Fix missing type defination for Design Token. [#39754](https://github.com/ant-design/ant-design/pull/39754)

## 5.1.0

`2022-12-20`

- 🔥 New App Component which provide global style & static function replacement. [#39046](https://github.com/ant-design/ant-design/pull/39046)
- 🔥 New QRCode Component. [#38948](https://github.com/ant-design/ant-design/pull/38948)
- 🔥 New Watermark Component. [#39064](https://github.com/ant-design/ant-design/pull/39064) [@JarvisArt](https://github.com/JarvisArt)
- 🆕 Mentions support `options` prop. [#38630](https://github.com/ant-design/ant-design/pull/38630) [@heiyu4585](https://github.com/heiyu4585)
- 🆕 FloatButton support `clickOutAutoClose`. [#39501](https://github.com/ant-design/ant-design/pull/39501) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm support `description` prop. [#39250](https://github.com/ant-design/ant-design/pull/39250) [@xhh0223](https://github.com/xhh0223)
- 🆕 Modal.confirm support `footer` prop. [#39048](https://github.com/ant-design/ant-design/pull/39048) [@owjs3901](https://github.com/owjs3901)
- 🆕 Table support `rowScope` to set the column range. [#39571](https://github.com/ant-design/ant-design/pull/39571)
- 🆕 Anchor support `items` data configuration option content, which supports nesting through children. [#39034](https://github.com/ant-design/ant-design/pull/39034) [@foryuki](https://github.com/foryuki)
- 🆕 Grid breakpoints can now follow theme token config. [#39105](https://github.com/ant-design/ant-design/pull/39105) [@azro352](https://github.com/azro352)
- 🆕 Tour prevButtonProps nextButtonProps support `style` `classname` prop. [#38939](https://github.com/ant-design/ant-design/pull/38939) [@ONLY-yours](https://github.com/ONLY-yours)
- 🆕 ConfigProvider support config `select.showSearch`. [#39531](https://github.com/ant-design/ant-design/pull/39531) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Tabs `inkBar` not show in StrictMode. [#39653](https://github.com/ant-design/ant-design/pull/39653)
- 🐞 Fix Badge component width not being affected by parent element. [#39605](https://github.com/ant-design/ant-design/pull/39605) [@AydenGen](https://github.com/AydenGen)
- Select
  - 🐞 Fix wrong usage of icon color token in Select. [#39644](https://github.com/ant-design/ant-design/pull/39644)
  - 💄 Optimize Select a11y to bind real option element when `virtual=false`. [#39550](https://github.com/ant-design/ant-design/pull/39550)
- 🐞 Fix Tour steps set type=‘primary’ not work. [#39382](https://github.com/ant-design/ant-design/pull/39382) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix disabled style miss when has href on Button. [#39456](https://github.com/ant-design/ant-design/pull/39456) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 Fix Segmented icon unexpected margin. [#39575](https://github.com/ant-design/ant-design/pull/39575)
- 🐞 Fix Drawer unexpected warning about `DefaultProps`. [#39562](https://github.com/ant-design/ant-design/pull/39562)
- Menu
  - 🐞 Fix Menu.Submenu will flicker when use `createRoot` to render. [#38855](https://github.com/ant-design/ant-design/pull/38855) [@JarvisArt](https://github.com/JarvisArt)
  - 🛠 Refactor Menu.MenuItem to Function Component. [#38751](https://github.com/ant-design/ant-design/pull/38751)
  - 💄 Optimize Menu item style when selected. [#39439](https://github.com/ant-design/ant-design/pull/39439)
- 🛠 LocaleProvider has been deprecated in 4.x (use `<ConfigProvider locale />` instead), we removed the related folder antd/es/locale-provider and antd/lib/locale-provider in 5.x. [#39373](https://github.com/ant-design/ant-design/pull/39373)
- 🛠 Simplified lodash method introduction. [#39599](https://github.com/ant-design/ant-design/pull/39599) [#39602](https://github.com/ant-design/ant-design/pull/39602)
- TypeScript
  - 🤖 Optimize Button DropDown Modal Popconfirm Select Transfer mouse event type definition. [#39533](https://github.com/ant-design/ant-design/pull/39533)
  - 🤖 New export FloatButton type `FloatButtonGroupProps`. [#39553](https://github.com/ant-design/ant-design/pull/39553)
- 🌐 Localization
  - 🇧🇪 Add `fr_BE` locale. [#39415](https://github.com/ant-design/ant-design/pull/39415) [@azro352](https://github.com/azro352)
  - 🇨🇦 Add `fr_CA` locale. [#39416](https://github.com/ant-design/ant-design/pull/39416) [@azro352](https://github.com/azro352)
  - 🇪🇸 Add `eu_ES` locale. [#39371](https://github.com/ant-design/ant-design/pull/39371) [@Ian-Inizias](https://github.com/Ian-Inizias)

## 5.0.7

`2022-12-13`

- 🐞 Fix Slider's Tooltip missing animation. [#39463](https://github.com/ant-design/ant-design/pull/39463) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 Fix Table unexpected horizontal scroll bar when empty and bordered. [#39455](https://github.com/ant-design/ant-design/pull/39455) [@zjfresh](https://github.com/zjfresh)
- 🐞 Fix Popover arrow background color with customized `color`. [#39517](https://github.com/ant-design/ant-design/pull/39517)
- 🐞 Fix Modal hooks not pass ConfigProvider config correctly. [#39513](https://github.com/ant-design/ant-design/pull/39513)
- 🐞 Fix Radio align issue with custom size. [#39476](https://github.com/ant-design/ant-design/pull/39476)

## 5.0.6

`2022-12-12`

- 🐞 Fix FloatButton `tooltip` property is not support `0` value. [#39425](https://github.com/ant-design/ant-design/pull/39425) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Space wrapped Select not display clear icon problem when mouse hover. [#39468](https://github.com/ant-design/ant-design/pull/39468) [@foryuki](https://github.com/foryuki)
- 💄 Fix Cascader ul has unexpected margin value. [#39436](https://github.com/ant-design/ant-design/pull/39436) [@ZN1996](https://github.com/ZN1996)
- 💄 Fix Input has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Message padding in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Radio.Button has unexpected text color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Select has unexpected padding problem in compact mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Fix Slider has unexpected size for marking dot. [#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 Optimize Switch color in dark mode. [#39428](https://github.com/ant-design/ant-design/pull/39428)

## 5.0.5

`2022-12-08`

- 🐞 Fix button hover style in Space.Compact. [#39157](https://github.com/ant-design/ant-design/pull/39157) [@foryuki](https://github.com/foryuki)
- 🐞 Fix Tabs active bar missing sometimes in windows Chrome. [#39352](https://github.com/ant-design/ant-design/pull/39352) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix Divider `horizontal` align issue in flex layout. [#39339](https://github.com/ant-design/ant-design/pull/39339)
- 🐞 Fix Popover width in rtl mode. [#39311](https://github.com/ant-design/ant-design/pull/39311)
- 🐞 Fix Popconfirm padding style issue when `wireframe` is `true`. [#39313](https://github.com/ant-design/ant-design/pull/39313)
- 💄 Fix Select search input with white space style issue. [#39299](https://github.com/ant-design/ant-design/pull/39299)
- 💄 Fix Tree missing selection style. [#39292](https://github.com/ant-design/ant-design/pull/39292)
- 🐞 Fix FloatButton content not align when customize size. [#39282](https://github.com/ant-design/ant-design/pull/39282) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix DatePicker.RangePicker cell hover style. [#39266](https://github.com/ant-design/ant-design/pull/39266)
- 💄 Optimize Button style under Space.Compact. [#39241](https://github.com/ant-design/ant-design/pull/39241) [@foryuki](https://github.com/foryuki)
- 🌐 Fix `vi_VN` i18n mistake. [#39279](https://github.com/ant-design/ant-design/pull/39279) [@nghiepdev](https://github.com/nghiepdev)
- 🌐 Fix `he_IL` i18n mistake. [#39280](https://github.com/ant-design/ant-design/pull/39280) [@Ran-Sagy](https://github.com/Ran-Sagy)
- TypeScript
  - 🤖 Optimize Anchor `onClick` event definition. [#39305](https://github.com/ant-design/ant-design/pull/39305) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.0.4

`2022-12-05`

- Modal
  - 🐞 Fix Modal with long content exceed the panel. [#39249](https://github.com/ant-design/ant-design/pull/39249) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🐞 Fix Modal.info content width when without icon. [#39047](https://github.com/ant-design/ant-design/pull/39047) [@owjs3901](https://github.com/owjs3901)
- 🐞 Fix Tree config `checkable` and `blockNode` not makes `title` stretch issue. [#39209](https://github.com/ant-design/ant-design/pull/39209) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Dropdown sub menu missing motion. [#39235](https://github.com/ant-design/ant-design/pull/39235)
- 💄 Fix DatePicker.RangePicker time panel padding style. [#39228](https://github.com/ant-design/ant-design/pull/39228)
- 🐞 Fix Card action button round style. [#39210](https://github.com/ant-design/ant-design/pull/39210) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 Fix Badge wave effect color not follow `color`. [#39182](https://github.com/ant-design/ant-design/pull/39182) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Fix Radio disabled status check style. [#39165](https://github.com/ant-design/ant-design/pull/39165) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fixed Input.TextArea count style when `resize` is not `none`. [#39121](https://github.com/ant-design/ant-design/pull/39121) [@51wangping](https://github.com/51wangping)
- 🐞 Fix Transfer clicking the checkbox position cannot be unchecked and onSelectChange is triggered twice. [#39078](https://github.com/ant-design/ant-design/pull/39078) [@edc-hui](https://github.com/edc-hui)
- 🐞 Fix Steps set `size="small"` with progress not fully display. [#39100](https://github.com/ant-design/ant-design/pull/39100) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form horizontal layout with `xs` responsive config not work. [#39130](https://github.com/ant-design/ant-design/pull/39130)
- 🐞 Fix message position not correct in RTL. [#39248](https://github.com/ant-design/ant-design/pull/39248) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 Fix Switch only set with `checkedChildren` or `unCheckedChildren` content not display. [#39262](https://github.com/ant-design/ant-design/pull/39262)

## 5.0.3

`2022-11-30`

- 🐞 Fix Spin alignment when using `tip`. [#38923](https://github.com/ant-design/ant-design/pull/38923) [@sribich](https://github.com/sribich)
- Menu
  - 🐞 Fix Menu Submenu style when overflowed. [#39093](https://github.com/ant-design/ant-design/pull/39093)
  - 🐞 Fix Menu.Item hover area when trigger active color change. [#39077](https://github.com/ant-design/ant-design/pull/39077) [@Pulset](https://github.com/Pulset)
- 🐞 Fix Input.TextArea resize behavior by adding reset style. [aa92f02](https://github.com/ant-design/ant-design/commit/aa92f02)
- 🐞 Fix Upload default icon color. [#39114](https://github.com/ant-design/ant-design/pull/39114) [@MARKX97](https://github.com/MARKX97)
- 🐞 Fix `@ant-design/cssinjs` ssr warning in dev mode caused by dynamic hashId. [#39069](https://github.com/ant-design/ant-design/pull/39069)
- 🐞 Fix FloatButton.Group flicking on closing. [#39061](https://github.com/ant-design/ant-design/pull/39061)
- 🐞 Fix Card.Meta that width is not 100%. [#39026](https://github.com/ant-design/ant-design/pull/39026) [@justanotheranonymoususer](https://github.com/justanotheranonymoususer)

## 5.0.2

`2022-11-27`

- 💄 Fix Card radius style broken when customize `bodyStyle` background color. [#38973](https://github.com/ant-design/ant-design/pull/38973) [@Yukiniro](https://github.com/Yukiniro)
- 💄 Optimize Design Token default algorithm for error color. [#38933](https://github.com/ant-design/ant-design/pull/38933)
- 💄 Optimize the style issue in RTL mode. [#38829](https://github.com/ant-design/ant-design/pull/38829) [@Wxh16144](https://github.com/Wxh16144)
- Space.Compact
  - 💄 Optimize Space.Compact style when wrapping a single child component. [#38896](https://github.com/ant-design/ant-design/pull/38896) [@foryuki](https://github.com/foryuki)
  - 💄 Fix Space.Compact component style problem when wrapping Modal, Dropdown, Drawer and other components. [#38870](https://github.com/ant-design/ant-design/pull/38870) [@foryuki](https://github.com/foryuki)
- 🐞 Fix horizontal Menu that has wrong width when is overflow. [#38989](https://github.com/ant-design/ant-design/pull/38989)
- 🐞 Fix Table that the old filter state still takes effect when the list filter column changes. [#38982](https://github.com/ant-design/ant-design/pull/38982)
- 🐞 Fix Select and Pagination incorrect text color in dark theme. [#38979](https://github.com/ant-design/ant-design/pull/38979) [@Dunqing](https://github.com/Dunqing)
- 🐞 Fix that Mentions `options` props not working. [#38968](https://github.com/ant-design/ant-design/pull/38968) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 Fix that `dist/reset.css` may be dropped in production. [#38956](https://github.com/ant-design/ant-design/pull/38956) [@passerV](https://github.com/passerV)
- 🐞 Fix Badge that `showZero` can't be used with custom color. [#38967](https://github.com/ant-design/ant-design/pull/38967) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 Fix Form validation motion flick issue. [#38962](https://github.com/ant-design/ant-design/pull/38962)
- 🐞 Fix Tabs dropdown motion not work. [#38892](https://github.com/ant-design/ant-design/pull/38892)
- 🐞 Fix ConfigProvider that `componentDisabled` is not work. [#38886](https://github.com/ant-design/ant-design/pull/38886) [@lidianhao123](https://github.com/lidianhao123)
- 🐞 Fix Button `block` prop is not working when `shape="round"`. [#38869](https://github.com/ant-design/ant-design/pull/38869) [@jjlstruggle](https://github.com/jjlstruggle)
- 🐞 Fix Dropdown.Button that `dropdownRender` is not executed. [#38862](https://github.com/ant-design/ant-design/pull/38862) [@imoctopus](https://github.com/imoctopus)

## 5.0.1

`2022-11-22`

- 💄 Optimize Empty svg color in dark theme. [#38785](https://github.com/ant-design/ant-design/pull/38785)
- 💄 Fix Form, Input, Select, Tree part style convert to CSS-in-JS missing. [#38742](https://github.com/ant-design/ant-design/pull/38742)
- 💄 Fix Dropdown animation flick in Firefox. [#38729](https://github.com/ant-design/ant-design/pull/38729)
- Menu
  - 🐞 Fix Menu SubMenu margin style. [#38714](https://github.com/ant-design/ant-design/pull/38714) [@JarvisArt](https://github.com/JarvisArt)
  - 🐞 Fix Menu height in dark theme. [#38741](https://github.com/ant-design/ant-design/pull/38741) [@LuciNyan](https://github.com/LuciNyan)
  - 🐞 Fix Menu SubMenu flicking when expanding. [#38748](https://github.com/ant-design/ant-design/pull/38748) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 Fix that Table expanded icons are not aligned. [#38823](https://github.com/ant-design/ant-design/pull/38823) [@turdiyev](https://github.com/turdiyev)
- 🐞 Fix FloatButton.BackTop missing animation. [#38770](https://github.com/ant-design/ant-design/pull/38770) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 Remove `Moment.js` dependency. [#38762](https://github.com/ant-design/ant-design/pull/38762)
- 🛠 Fix `CompoundedComponent` ts error. [#38666](https://github.com/ant-design/ant-design/pull/38666) [@wangcch](https://github.com/wangcch)
- 🛠 Rollback `lib` in package. [#38832](https://github.com/ant-design/ant-design/pull/38832) [@chunsch](https://github.com/chunsch)

## 5.0.0

`2022-11-18`

🏆 Ant Design 5.0.0 is released, see our [release note](https://github.com/ant-design/ant-design/issues/38671) for more details.

#### Read it before migration

🌟 If you want to migrate to Ant Design 5.0, please check [V4 to V5](/docs/react/migration-v5).

#### Major Changes

- 🔥 New Components
  - 🔥 FloatButton component, and refactor BackTop as child component of FloatButton. [#37520](https://github.com/ant-design/ant-design/pull/37520) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Tour component. [#37867](https://github.com/ant-design/ant-design/pull/37867) [#38469](https://github.com/ant-design/ant-design/pull/38469) [@heiyu4585](https://github.com/heiyu4585)
- 🔥 New Component Variants
  - 🔥 DatePicker add `presets` to support preset ranges for quick selection. [#38249](https://github.com/ant-design/ant-design/pull/38249)
  - 🔥 Progress `circle` type support responsive `format` text for small size. [#38231](https://github.com/ant-design/ant-design/pull/38231) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Steps add `inline` type. [#38311](https://github.com/ant-design/ant-design/pull/38311) [@JarvisArt](https://github.com/JarvisArt)
- 💄 New Design
  - 💄 Change primary color to `#1677ff`. [#37254](https://github.com/ant-design/ant-design/pull/37254)
  - 💄 Change basic border radius to `6px`, and support gradient radius. [#37146](https://github.com/ant-design/ant-design/pull/37146) [#37369](https://github.com/ant-design/ant-design/pull/37369)
  - 💄 Optimize transition duration. [#37438](https://github.com/ant-design/ant-design/pull/37438)
  - 💄 Optimize padding and remove border for some components. [#37283](https://github.com/ant-design/ant-design/pull/37283)
    - 💄 Pagination remove border. [#37441](https://github.com/ant-design/ant-design/pull/37441)
    - 💄 Optimize Timeline style. [#37465](https://github.com/ant-design/ant-design/pull/37465)
    - 💄 Optimize Steps style. [#37473](https://github.com/ant-design/ant-design/pull/37473)
  - 💄 Optimize focus style for some components. [#37483](https://github.com/ant-design/ant-design/pull/37483)
  - 💄 Optimize style with large border radius.
    - 💄 Optimize Table hover style. [#37370](https://github.com/ant-design/ant-design/pull/37370)
    - 💄 Optimize Segmented hover style. [#37498](https://github.com/ant-design/ant-design/pull/37498)
    - 💄 Optimize Dropdown hover style. [#37491](https://github.com/ant-design/ant-design/pull/37491)
    - 💄 Optimize close button style for some components like Modal. [#37634](https://github.com/ant-design/ant-design/pull/37634)
    - 💄 Optimize Menu style. [#38009](https://github.com/ant-design/ant-design/pull/38009)
    - 💄 Optimize hover style for some more components. [#37433](https://github.com/ant-design/ant-design/pull/37433)
  - 💄 Optimize Switch transition. [#37658](https://github.com/ant-design/ant-design/pull/37658)
  - 💄 Optimize Anchor ink ball style. [#38616](https://github.com/ant-design/ant-design/pull/38616)
- 🆕 Export object `theme` which contains hooks and algorithms related with theme. [#36302](https://github.com/ant-design/ant-design/pull/36302)
  - 🆕 Add `theme.useToken` hook to get Design Token in context. [#36267](https://github.com/ant-design/ant-design/pull/36267)
  - 🆕 Preset algorithm
    - 🆕 Default algorithm `theme.defaultAlgorithm`. [#36175](https://github.com/ant-design/ant-design/pull/36175)
    - 🆕 Dark algorithm `theme.darkAlgorithm`. [#36546](https://github.com/ant-design/ant-design/pull/36546) [#36656](https://github.com/ant-design/ant-design/pull/36656)
    - 🆕 Compact algorithm `theme.compactAlgorithm`. [#38105](https://github.com/ant-design/ant-design/pull/38105)
- 🆕 ConfigProvider support `theme` prop to modify theme configuration. For more: [Customize Theme](https://ant.design/docs/react/customize-theme).
  - 🆕 Support multiple `algorithm` pipeline. [#37082](https://github.com/ant-design/ant-design/pull/37082)
  - 🆕 Support switching wireframe style. [#37507](https://github.com/ant-design/ant-design/pull/37507)
  - 🆕 Support override Design Token for single component. [#37568](https://github.com/ant-design/ant-design/pull/37568)
- 🆕 Add `locale` directory in package, which contains commonjs locale files. [#38194](https://github.com/ant-design/ant-design/pull/38194) [@chunsch](https://github.com/chunsch)
- 🗑 Do not support IE browser anymore.
- 🗑 Remove package `antd/lib`. [#36362](https://github.com/ant-design/ant-design/pull/36362)
  - 🛠 Change `main` in `package.json` to `dist/antd.js`. [eb8835f](https://github.com/ant-design/ant-design/commit/eb8835fe29b39767c0f5e310f5c69619a75d5840)
- 🗑 Remove `dist/antd.css`, and add `dist/reset.css` to override common styles. [#36224](https://github.com/ant-design/ant-design/pull/36224)
- 🗑 Deprecate `visible` and provide `open` instead in components below. [@yykoypj](https://github.com/yykoypj)
  - 🗑 Tag deprecate `visible`. [#36671](https://github.com/ant-design/ant-design/pull/36671)
  - 🗑 Table deprecate `filterDropdownVisible` and provide `filterDropdownOpen`. [#36747](https://github.com/ant-design/ant-design/pull/36747)
  - 🗑 Drawer deprecate `visible` and provide `open` instead. [#36750](https://github.com/ant-design/ant-design/pull/36750)
  - 🗑 Modal deprecate `visible` and provide `open` instead. [#36774](https://github.com/ant-design/ant-design/pull/36774)
  - 🗑 Dropdown deprecate `visible` and provide `open` instead. [#36799](https://github.com/ant-design/ant-design/pull/36799)
  - 🗑 Tooltip deprecate `visible` and provide `open` instead, Popover and Popconfirm. [#36807](https://github.com/ant-design/ant-design/pull/36807)
- 🗑 Deprecate `dropdownClassName` and provide `popupClassName` instead in components below. [@heiyu4585](https://github.com/heiyu4585)
  - 🗑 AutoComplete deprecate `dropdownClassName` and provide `popupClassName` instead. [#37087](https://github.com/ant-design/ant-design/pull/37087)
  - 🗑 Mentions deprecate `dropdownClassName` and provide `popupClassName` instead. [#37122](https://github.com/ant-design/ant-design/pull/37122)
  - 🗑 Cascader deprecate `dropdownClassName` and provide `popupClassName` instead. [#37089](https://github.com/ant-design/ant-design/pull/37089)
  - 🗑 Select deprecate `dropdownClassName` and provide `popupClassName` instead. [#37091](https://github.com/ant-design/ant-design/pull/37091)
  - 🗑 TreeSelect deprecate `dropdownClassName` and provide `popupClassName` instead. [#37092](https://github.com/ant-design/ant-design/pull/37092)
  - 🗑 DatePicker and TimePicker deprecate `dropdownClassName` and provide `popupClassName` instead. [#37207](https://github.com/ant-design/ant-design/pull/37207)
- 🛠 Refactor styles with CSS-in-JS for all components.
  - 🗑 Remove less and css in package. [#36244](https://github.com/ant-design/ant-design/pull/36244)
- 🛠 Change date library from Moment.js to Day.js, for more: [Use custom date library](https://ant.design/docs/react/use-custom-date-library). [b22815d](https://github.com/ant-design/ant-design/commit/b22815d4d223b80755b472e14d7888beab8dd1da) [@iamkun](https://github.com/iamkun)
- 🛠 React Notification to support React 18 concurrent mode and refactor useNotification hook, which is preferred instead of static function. [#35423](https://github.com/ant-design/ant-design/pull/35423) [#35568](https://github.com/ant-design/ant-design/pull/35568)
- 🛠 Slider props related with Tooltip are unified into `tooltip`. [#37043](https://github.com/ant-design/ant-design/pull/37043) [@yykoypj](https://github.com/yykoypj)
- 🛠 Migrate official site to [dumi@2](https://next.d.umijs.org/). [#38328](https://github.com/ant-design/ant-design/pull/38328)

## 4.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.en-US.md) to read `4.x` change logs.

## 3.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.en-US.md) to read `3.x` change logs.

## 2.x

Visit [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.en-US.md) to read `2.x` change logs.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
