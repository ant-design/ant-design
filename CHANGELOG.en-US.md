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

## 4.0.4

`2020-03-23`

- 🐞 Fix AutoComplete clear icon overlap issue on search icon. [#22310](https://github.com/ant-design/ant-design/pull/22310)
- 🐞 Fix Button align issue when is `disabled` and wrapped by Tooltip. [#22461](https://github.com/ant-design/ant-design/pull/22461)
- 🐞 Fix Cascader search need to press down arrow twice to select item. [#22216](https://github.com/ant-design/ant-design/pull/22216) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🐞 Fix Carousel cannot works on Snowpack. [#22507](https://github.com/ant-design/ant-design/pull/22507)
- 🐞 Fix ConfigProvider `componentSize` not works on DatePicker.RangePicker. [#22486](https://github.com/ant-design/ant-design/pull/22486)
- 🐞 Fix Descriptions cannot fit to small container width. [#22407](https://github.com/ant-design/ant-design/pull/22407)
- ⚡️ Optimization Form.Item with multiple noStyle children Form.Item message collection performance. [#22410](https://github.com/ant-design/ant-design/pull/22410)
- 🐞 Fix Grid broken style using Col without `span`. [#22455](https://github.com/ant-design/ant-design/pull/22455)
- 💄 Add InputNumber RTL style. [#22434](https://github.com/ant-design/ant-design/pull/22434)
- Menu
  - 🛠 Menu inherit `line-height` from header. [#16142](https://github.com/ant-design/ant-design/pull/16142) [@sheerun](https://github.com/sheerun)
  - 🐞 Fix Menu unexpected scrollbar when show and hide. [#22248](https://github.com/ant-design/ant-design/pull/22248)
- 🐞 Fix Progress Dashboard won't allow `gapDeg` to be `0`. [#22462](https://github.com/ant-design/ant-design/pull/22462) [@thisrabbit](https://github.com/thisrabbit)
- 🛠 Adjust Radio.Group logic that `value` is `undefined` should be uncontrolled mode. [#22245](https://github.com/ant-design/ant-design/pull/22245)
- ⚡️ Reduce Row unnecessary render when `gutter` is array. [#22475](https://github.com/ant-design/ant-design/pull/22475) [@dolfje](https://github.com/dolfje)
- 💄 Tweak RangePicker arrow shadow style. [#22406](https://github.com/ant-design/ant-design/pull/22406)
- 🐞 Fix Select dropdown menu vertical padding. [#22251](https://github.com/ant-design/ant-design/pull/22251)
- 🐞 Fix Slider tooltip crash when with `nullable` value. [#22482](https://github.com/ant-design/ant-design/pull/22482)
- Table
  - 🐞 Fix Table ColumnGroup with controlled `sorterOrder` not working issue. [#22450](https://github.com/ant-design/ant-design/pull/22450)
  - 🐞 Fix Table border radius style. [#22413](https://github.com/ant-design/ant-design/pull/22413) [@akshatmittal](https://github.com/akshatmittal)
  - 🐞 Fix Table fixed column height issue. [#22367](https://github.com/ant-design/ant-design/pull/22367)
  - 🐞Fix Table row expand icon show error in ipad. [#22334](https://github.com/ant-design/ant-design/pull/22334) [@BugHiding](https://github.com/BugHiding)
  - 🛠 Table `column.filter` support `boolean` value. [#22277](https://github.com/ant-design/ant-design/pull/22277) [@xudongdev](https://github.com/xudongdev)
  - 🐞 Fix Table filter no working when only set `onFilter`. [#22317](https://github.com/ant-design/ant-design/pull/22317)
- 🐞 Fix TreeSelect `treeIcon` not working. [#22437](https://github.com/ant-design/ant-design/pull/22437)
- 🐞 Refactor DirectoryTree to fix deprecated warning. [#22318](https://github.com/ant-design/ant-design/pull/22318)
- 🐞 Fix Typography nest list style issue. [#22284](https://github.com/ant-design/ant-design/pull/22284)
- 🐞 Adjust Upload `onChange` return `fileList` is immutable data to avoid render issue. [#22322](https://github.com/ant-design/ant-design/pull/22322)
- 🌎 Localization
  - 🇩🇪 Updated German locale. [#22270](https://github.com/ant-design/ant-design/pull/22270) [@iChebbi](https://github.com/iChebbi)
  - 🇫🇷 Update French locale. [#22238](https://github.com/ant-design/ant-design/pull/22238) [@abenhamdine](https://github.com/abenhamdine)
- Typescript
  - 🐞 Omit Table `getCheckboxProps` typeof `checked`. [#22391](https://github.com/ant-design/ant-design/pull/22391) [@geekrainy](https://github.com/geekrainy)

## 4.0.3

`2020-03-14`

- Menu
  - 🐞 Fix Menu horizontal Item with nest Icon miss margin style. [#22021](https://github.com/ant-design/ant-design/pull/22021)
  - 🐞 Fix Menu item wrong `title` when setting `getPopupContainer`. [#22182](https://github.com/ant-design/ant-design/pull/22182)
  - 💄 Optimize the style of Icon in Menu. [#22090](https://github.com/ant-design/ant-design/pull/22090) [@x1mrdonut1x](https://github.com/x1mrdonut1x)
  - 🐞 Fix Avatar in horizontal Menu `margin` issue. [#22038](https://github.com/ant-design/ant-design/pull/22038) [#22033](https://github.com/ant-design/ant-design/pull/22033)
- Slider
  - 🐞 Fix an issue where the position of 'slider handle' is incorrect in the vertical case of Slider. [#22135](https://github.com/ant-design/ant-design/pull/22135) [@wendellhu95](https://github.com/wendellhu95)
  - 💄 Fix Slider missing `focus` style. [#22161](https://github.com/ant-design/ant-design/pull/22161)
- Table
  - 🐞 Fix ConfigProvider not work on Table filter dropdown. [#22133](https://github.com/ant-design/ant-design/pull/22133)
  - 🐞 Fix Table nest tree column expandable style issue with fixed column. [#22131](https://github.com/ant-design/ant-design/pull/22131)
  - 🐞 Fix an issue where Table filtering throws `cannot read property 'map' of undefined`. [#22096](https://github.com/ant-design/ant-design/pull/22096) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fix Table expandable column not fixed when selection column is fixed. [#22087](https://github.com/ant-design/ant-design/pull/22087)
  - 🐞 Fix Table filter menu reset not working. [#22079](https://github.com/ant-design/ant-design/pull/22079) [@shaodahong](https://github.com/shaodahong)
  - 🐞 Fix Table filter sub menu max height with many items. [#22230](https://github.com/ant-design/ant-design/pull/22230)
- Form
  - 💄 Optimize the responsive and box model performance of The Form. [#21907](https://github.com/ant-design/ant-design/pull/21907) [@shaodahong](https://github.com/shaodahong)
  - 🐞 Fix FormItem hooks render error. [#22053](https://github.com/ant-design/ant-design/pull/22053) [@kagawagao](https://github.com/kagawagao)
- 🐞 Fixed the problem of using custom icons to wrap in Input.Group. [#22197](https://github.com/ant-design/ant-design/pull/22197) [@xrkffgg](https://github.com/xrkffgg)
- 💄 Adjust Select single padding style to avoid tweak with dropdown. [#22167](https://github.com/ant-design/ant-design/pull/22167)
- 💄 Fix Calendar header select ellipsis bug. [#22148](https://github.com/ant-design/ant-design/pull/22148)
- 💄 Fixed Dropdown content and icons overlapping. [#22098](https://github.com/ant-design/ant-design/pull/22098) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix Select ellipsis bug in Firefox. [#22101](https://github.com/ant-design/ant-design/pull/22101)
- 🐞 Remove PageHeader unnecessary `overflow: hidden` style,Optimize PageHeader extra buttons responsive design. [#22030](https://github.com/ant-design/ant-design/pull/22030)
- 🐞 Fix TextArea `autoSize` don't scroll bottom in Firefox. [#22014](https://github.com/ant-design/ant-design/pull/22014)
- 🇫🇷 The full fr_FR internationalized text. [#22122](https://github.com/ant-design/ant-design/pull/22122) [@PaulJln](https://github.com/PaulJln)
- RTL
  - 💄 Optimize the style of Pagination in RTL mode. [#22155](https://github.com/ant-design/ant-design/pull/22155) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Fixed the icon style with Cascader RTL. [#22191](https://github.com/ant-design/ant-design/pull/22191) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Optimize the Checkbox.Group style in RTL mode. [#22186](https://github.com/ant-design/ant-design/pull/22186) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Optimize Radio.Button style issues in RTL mode. [#22066](https://github.com/ant-design/ant-design/pull/22066) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 Optimize table-pinned style issues that are listed under RTL. [#21914](https://github.com/ant-design/ant-design/pull/21914) [@saeedrahimi](https://github.com/saeedrahimi)
  - 💄 Adjust the direction of the Dropdown icon in RTL mode. [#22104](https://github.com/ant-design/ant-design/pull/22104) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Optimize the Breadcrumb style in RTL mode. [#22159](https://github.com/ant-design/ant-design/pull/22159) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Optimize the style of the Steps component in RTL mode. [#22175](https://github.com/ant-design/ant-design/pull/22175) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 Optimize styles in RTL mode with form feedback. [#22222](https://github.com/ant-design/ant-design/pull/22222)
- TypeScript
  - 🔷 Update the `operation` type definition of FormList. [#22058](https://github.com/ant-design/ant-design/pull/22058) [@kagawagao](https://github.com/kagawagao)
  - 🔷 Update the definition of the `trigger` parameter for components such as Tooltip. [#22043](https://github.com/ant-design/ant-design/pull/22043) [@wendellhu95](https://github.com/wendellhu95)

## 4.0.2

`2020-03-08`

- Form
  - 🐞 Fix nest Form.Item dynamic remove will warning in React. [#21896](https://github.com/ant-design/ant-design/pull/21896)
  - ⚡️ Form `useForm` now return same instance for perfermance. [#21927](https://github.com/ant-design/ant-design/pull/21927)
  - ⚡️ Refactor Form.Item render logic that will only render once when children is a pure component. [#21991](https://github.com/ant-design/ant-design/pull/21991)
  - ⚡️ FormContext use a memoized value to avoid trigger FormItem's unintentional renders. [#21980](https://github.com/ant-design/ant-design/pull/21980) [@qiqiboy](https://github.com/qiqiboy)
- Table
  - 🐞 Fix Table dropdown popup at abnormal direction. [#21905](https://github.com/ant-design/ant-design/pull/21905)
  - 🐞 Fix Table `expandIconColumnIndex` display order with `rowSelection`. [#21915](https://github.com/ant-design/ant-design/pull/21915)
  - 🐞 Fix Table `size="small"` header background color is not same as other size. [#21942](https://github.com/ant-design/ant-design/pull/21942)
  - 🐞 Fix Table `className` and `style` works on wrong node. [#21974](https://github.com/ant-design/ant-design/pull/21974)
- Select
  - 🐞 Fix Select align issue with empty string value. [#21880](https://github.com/ant-design/ant-design/pull/21880)
  - 🐞 Fix small size Select tag text not align middle. [#21940](https://github.com/ant-design/ant-design/pull/21940) [@xrkffgg](https://github.com/xrkffgg)
- Menu
  - 🐞 Fix Menu bottom margin is missing. [#21867](https://github.com/ant-design/ant-design/pull/21867)
  - 🐞 Fix horizontal Menu extra margin of Menu.Item with only icon. [#21925](https://github.com/ant-design/ant-design/pull/21925)
  - 🐞 Fix Menu popup menu overflow issue when contains too many items. [#21930](https://github.com/ant-design/ant-design/pull/21930)
- 🐞 Fix Badge animation when switch between 10 and 11. [#21834](https://github.com/ant-design/ant-design/pull/21834) [@wendellhu95](https://github.com/wendellhu95)
- 🐞 Fix Radio.Button inside Tooltip throws `Function components cannot be given refs` warning. [#21895](https://github.com/ant-design/ant-design/pull/21895) [@AshoneA](https://github.com/AshoneA)
- 🐞 Fix Descriptions miss style when content is falsy. [#21901](https://github.com/ant-design/ant-design/pull/21901)
- 🐞 Fix DatePicker cursor style on `seperator`. [#21937](https://github.com/ant-design/ant-design/pull/21937) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix ConfigProvider `prefixCls` not working on Input.Password. [#21953](https://github.com/ant-design/ant-design/pull/21953) [@tdida](https://github.com/tdida)
- 🐞 Fix Carousel `dots` not align center. [#21960](https://github.com/ant-design/ant-design/pull/21960) [@liusiasi](https://github.com/liusiasi)
- 🐞 Fix Input.Search border style in `rtl` mode. [#21946](https://github.com/ant-design/ant-design/pull/21946) [@xrkffgg](https://github.com/xrkffgg)
- Less
  - 🆕 Add `@outline-fade` variable. [#20227](https://github.com/ant-design/ant-design/pull/20227) [@Satloff](https://github.com/Satloff)
  - 🆕 Add `@form-item-label-height` variable. [#21912](https://github.com/ant-design/ant-design/pull/21912)
- TypeScript
  - 🌟 Improve Form.Item `renderProps` definite. [#21911](https://github.com/ant-design/ant-design/pull/21911)

## 4.0.1

`2020-03-04`

- Form
  - 🐞 Fix Form help control will get `react@16.13` warning. [#21800](https://github.com/ant-design/ant-design/pull/21800) [#21702](https://github.com/ant-design/ant-design/pull/21702)
  - 🐞 Fix Form.Item exceed Form width when content is too long. [#21682](https://github.com/ant-design/ant-design/pull/21682)
- Input
  - 🐞 Fix TextArea style get warning in `react@16.13`. [#21703](https://github.com/ant-design/ant-design/pull/21703)
  - 🐞 Fix Input.Search extra border when has `prefix`. [#21753](https://github.com/ant-design/ant-design/pull/21753)
- Table
  - 🐞 Fix Table column with `filtered` not working. [#21825](https://github.com/ant-design/ant-design/pull/21825)
  - 🐞 Fix Table locale not work. [#21772](https://github.com/ant-design/ant-design/pull/21772)
  - 🐞 Fix Table.Column `sortOrder` is not working in JSX mode. [#21719](https://github.com/ant-design/ant-design/pull/21719)
  - 🐞 Fix Table fixed column with sorted status style issue. [#21679](https://github.com/ant-design/ant-design/pull/21679)
- 🐞 Fix Dropdown menu arrow position. [#21768](https://github.com/ant-design/ant-design/pull/21768) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix List `bordered` and `split` props conflict. [#21784](https://github.com/ant-design/ant-design/pull/21784) [@MXWXZ](https://github.com/MXWXZ)
- 🐞 Fix Menu.Item `a` tag hidden bug. [#21699](https://github.com/ant-design/ant-design/pull/21699) [@shaodahong](https://github.com/shaodahong)
- 🐞 Fix `message.open` crash when `icon` is not passed. [#21747](https://github.com/ant-design/ant-design/pull/21747) [@AshoneA](https://github.com/AshoneA)
- 🐞 Fix Result `status` cannot assigned to string or number type. [#21691](https://github.com/ant-design/ant-design/pull/21691)
- 🐞 Fix Descriptions warning for duplicate key. [#21688](https://github.com/ant-design/ant-design/pull/21688)
- 💄 Optimize Calendar header style in small screen. [#21813](https://github.com/ant-design/ant-design/pull/21813)
- 💄 Radio.Group not wrapping now. [#21813](https://github.com/ant-design/ant-design/pull/21813)
- 🛠 Refactor icons import code to reduce webpack disabled tree shaking bundle size. [#21752](https://github.com/ant-design/ant-design/pull/21752)
- Typescript
  - 🐞 Fix Radio.Button type error. [#21807](https://github.com/ant-design/ant-design/pull/21807) [@jhoneybee](https://github.com/jhoneybee)
  - 🐞 fix `TreeSelect.SHOW_*` type. [#21791](https://github.com/ant-design/ant-design/pull/21791) [@TennyZhuang](https://github.com/TennyZhuang)
  - 🐞 Fix TreeSelect missing `suffix` define. [#21714](https://github.com/ant-design/ant-design/pull/21714)
  - 🐞 Fix Drawer `forceRender` TypeScript definite. [#21774](https://github.com/ant-design/ant-design/pull/21774)
  - 🐞 Fix Tree `treeData` define. [#21756](https://github.com/ant-design/ant-design/pull/21756)
  - 🐞 Fix Form.Item `renderProps` return type define. [#21716](https://github.com/ant-design/ant-design/pull/21716)

## 4.0.0

`2020-02-28`

- 🏆 Ant Design v4 is out! Check [here](https://github.com/ant-design/ant-design/issues/21656) for more info.
- 🐞 Breadcrumb use `path` as default key to fix `name` key conflict. [#21583](https://github.com/ant-design/ant-design/pull/21583) [@douxc](https://github.com/douxc)
- 🌟 Timeline.Item support `label`. [#21560](https://github.com/ant-design/ant-design/pull/21560) [@shaodahong](https://github.com/shaodahong)
- 🐞 Fix Table filter menu max height style with many items. [#21602](https://github.com/ant-design/ant-design/pull/21602)
- 💄 Add the Calendar component's custom default font color for display content. [#21598](https://github.com/ant-design/ant-design/pull/21598) [@xrkffgg](https://github.com/xrkffgg)
- 🚮 Remove DatePicker legacy cell className for custom cell style. [#21589](https://github.com/ant-design/ant-design/pull/21589)
- 🐞 Fix RangePicker style render bug in IE11. [#21587](https://github.com/ant-design/ant-design/pull/21587)
- 🛠 Progress `strokeColor` now will ignore incorrect percent. [#21564](https://github.com/ant-design/ant-design/pull/21564) [@AshoneA](https://github.com/AshoneA)
- 🐞 Fix Progress `trailColor` not working when `type=line`. [#21552](https://github.com/ant-design/ant-design/pull/21552) [@AshoneA](https://github.com/AshoneA)
- 🐞 Fix the background of the components in the pop-up components in the dark theme. [#21299](https://github.com/ant-design/ant-design/pull/21299)
  - 💄 Optimization under the dark theme color swatches transparency.
  - 🌟 new less variable `@popover-customize-border-color`, `@list-customize-card-bg`, `@table-expand-icon-bg`, `@steps-background`, `@pagination-item-input-bg` for theme customization.

## 4.0.0-rc.6

`2020-02-24`

- Form
  - 🌟 support `scrollToFirstError` to simplify submit scroll logic. [#21462](https://github.com/ant-design/ant-design/pull/21462)
  - 🐞 Fix Form.Item with `help` align style. [#21476](https://github.com/ant-design/ant-design/pull/21476)
  - 🐞 Fix Form throw error when using BraftEditor. [#21425](https://github.com/ant-design/ant-design/pull/21425)
  - 🐞 Fix Form fields shake when switching the validing info. [#21302](https://github.com/ant-design/ant-design/pull/21302) [@yoyo837](https://github.com/yoyo837)
- Upload
  - 🌟 Upload added `removeIcon` and `downloadIcon` properties. [#21363](https://github.com/ant-design/ant-design/pull/21363) [@sdhr27](https://github.com/sdhr27)
  - 🐞 Fix Upload identify types of image logic errors. [#21473](https://github.com/ant-design/ant-design/pull/21473) [@holynewbie](https://github.com/holynewbie)
- Input
  - 🐞 Fix Input with `readOnly` still clearable by `allowClear`. [#21494](https://github.com/ant-design/ant-design/pull/21494)
  - 🐞 Fix Input click with `prefix` / `suffix` not get focused. [#21413](https://github.com/ant-design/ant-design/pull/21413)
- Table
  - 🐞 Fix Table selection crash when record children is `null`. [#21528](https://github.com/ant-design/ant-design/pull/21528)
  - 🐞 Fix Table fixed column style with `small` size. [#21431](https://github.com/ant-design/ant-design/pull/21431)
- Descriptions
  - 🐞 Fix `label` does not have the problem of still rendering the label element when not using `bordered`. [#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 Fix Non-bordered titles under `vertical` are also a problem for `td`. [#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 Fix `vertical` and `bordered` layout issues. [#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 Fix the problem of `style` not working on `Item`. [#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 Fix `th` will also get the useless `-colon` className problem under `border`. [#21542](https://github.com/ant-design/ant-design/pull/21542)
- 🌟 Select added `tagRender` for customized tag rendering. [#21064](https://github.com/ant-design/ant-design/pull/21064) [@fguitton](https://github.com/fguitton)
- 💄 Picker `onPanelChange` will also trigger when panel value changed. [#21455](https://github.com/ant-design/ant-design/pull/21455)
- 🐞 Fix Notification first call multiple time can not stack. [#21531](https://github.com/ant-design/ant-design/pull/21531)
- 🐞 Fix TreeSelect popup do not update issue. [#21410](https://github.com/ant-design/ant-design/pull/21410)
- 💄 Optimize Upload `showDownloadIcon` default doesn't show. [b4636](https://github.com/ant-design/ant-design/commit/b4636ab2dfdb006c14bdb3d5d7de09e1650c3567)
- 💄 Tweak Divider inner text `padding` and add `@divider-text-padding`. [#21407](https://github.com/ant-design/ant-design/pull/21407)
- Typescript
  - 🐞 Fix Form types. [#21483](https://github.com/ant-design/ant-design/pull/21483) [#21411](https://github.com/ant-design/ant-design/pull/21411)

## 4.0.0-rc.5

`2020-02-16`

- 🐞 Fix Form.Item `validateFirst` prevent form submit. [#21329](https://github.com/ant-design/ant-design/pull/21329)
- 🐞 Fix InputNumber cursor position issue when deleting consecutive identical numbers. [#21344](https://github.com/ant-design/ant-design/pull/21344)
- 💄 Remove Menu excess background color. [#21365](https://github.com/ant-design/ant-design/pull/21365)
- 💄 Optimize the mouse style for the `disabled` state of the DatePicker component. [#21352](https://github.com/ant-design/ant-design/pull/21352)
- 🐞 Fix Affix throws `Cannot read property getBoundingClientRect` in mobile device. [#21350](https://github.com/ant-design/ant-design/pull/21350)
- 🐞 Fix the problem that the label width is incorrect when the screen is less than `xs`. [#21222](https://github.com/ant-design/ant-design/pull/21222)
- 🐞 Fix Input `size` is `large` height style. [#21338](https://github.com/ant-design/ant-design/pull/21338)
- 🐞 Fix Badge `color` not working when contains children. [#21333](https://github.com/ant-design/ant-design/pull/21333)
- 🐞 Fix Alert close button extra padding. [#21325](https://github.com/ant-design/ant-design/pull/21325)
- 💄 Tweak Steps 1px align issue. [#21306](https://github.com/ant-design/ant-design/pull/21306)
- 💄 Fix legacy Button.Group `large` size style issue. [#21307](https://github.com/ant-design/ant-design/pull/21307)
- 💄 Fix Input border radius with suffix, style in Firefox, TextArea allowClear style issues. [#21316](https://github.com/ant-design/ant-design/pull/21316)
- 🐞 Pagination will pass `disabled` prop to prev/next buttons return by `itemRender`. [#21361](https://github.com/ant-design/ant-design/pull/21361)
- 🇦🇿 Added Azerbaijani translation. [#21387](https://github.com/ant-design/ant-design/pull/21387) [@orkhan-huseyn](https://github.com/orkhan-huseyn)
- Typescript
  - 🔷 Menu export `MenuItemGroupProps`. [#21356](https://github.com/ant-design/ant-design/pull/21356)
  - 🔷 Table export `ColumnProps`. [#21321](https://github.com/ant-design/ant-design/pull/21321)

## 4.0.0-rc.4

`2020-02-09`

- 📖 Add [color palette](https://preview-21101-ant-design.surge.sh/docs/spec/dark-cn#%E5%9F%BA%E7%A1%80%E8%89%B2%E6%9D%BF) and [palette generation tool](https://preview-21101-ant-design.surge.sh/docs/spec/dark-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7) for dark theme. [#21101](https://github.com/ant-design/ant-design/pull/21101)
- 🌟 Add `style` field for `options` prop of Checkbox.Group and Radio.Group. [#21219](https://github.com/ant-design/ant-design/pull/21219)
- 🌟 Add `validateFirst` prop for Form.Item. [#21178](https://github.com/ant-design/ant-design/pull/21178)
- 🌟 Add `useModal` hook for Modal to support `context` access. [#20949](https://github.com/ant-design/ant-design/pull/20949)
- 🌟 Add `useNotification` hook for Notification to support `context` access. [#21275](https://github.com/ant-design/ant-design/pull/21275)
- 🌟 Add `bordered` prop for Select、TreeSelect、DatePicker、TimePicker and Cascader. [#21242](https://github.com/ant-design/ant-design/pull/21242)
- 🌟 Add `selectAllLabels` prop for Transfer. [#21139](https://github.com/ant-design/ant-design/pull/21139) [@morenyang](https://github.com/morenyang)
- 💄 Redesign the style of ink bar for Tabs. [#21256](https://github.com/ant-design/ant-design/pull/21256)
- 💄 Add less variable `@form-item-label-font-size`. [#21216](https://github.com/ant-design/ant-design/pull/21216)
- 🐞 Fix Badge style for Badge with Typography. [#21235](https://github.com/ant-design/ant-design/pull/21235)
- 🐞 Fix Checkbox not work when Checkbox and Checkbox.Group are separated by other component. [#21146](https://github.com/ant-design/ant-design/pull/21146) [@morenyang](https://github.com/morenyang)
- 🐞 Fix Collapse.Panel wrong content width when `extra` prop is set. [#21202](https://github.com/ant-design/ant-design/pull/21202) [@zhiyuc123](https://github.com/zhiyuc123)
- Form
  - 🐞 Fix Form.Item `required` validation not work when name is not set. [#21168](https://github.com/ant-design/ant-design/pull/21168)
  - 🐞 Fix Form.Item data binding not work when `name` is `0`. [#21186](https://github.com/ant-design/ant-design/pull/21186) [@wanjas](https://github.com/wanjas)
  - 🐞 Fix Form.Item shaking when `help` prop change from valuable to `undefined`. [#21211](https://github.com/ant-design/ant-design/pull/21211)
- Input
  - 🐞 Fix worng validating style when `prefix` is set. [#21121](https://github.com/ant-design/ant-design/pull/21121)
  - 🐞 Fix `size` prop not work when `prefix` or `affix` is set. [#21290](https://github.com/ant-design/ant-design/pull/21290) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Radio.Group style with Badge. [#21215](https://github.com/ant-design/ant-design/pull/21215)
- 🐞 Fix Select no margin between lines when mode is `tags` or `multiple`. [#21175](https://github.com/ant-design/ant-design/pull/21175)
- 🐞 Fix Slider dots focus style. [#21244](https://github.com/ant-design/ant-design/pull/21244) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🐞 Fix Steps icon not align when `size="small"` and `labelPlacement="vertical"`. [#21258](https://github.com/ant-design/ant-design/pull/21258)
- Table
  - 🐞 Fix `expandIcon` prop not work when data item has no `children` field. [#21169](https://github.com/ant-design/ant-design/pull/21169)
  - 🐞 Fix Column `sorter` prop not work. [#21194](https://github.com/ant-design/ant-design/pull/21194)
  - 🐞 Fix custom filter's typing not work. [#21218](https://github.com/ant-design/ant-design/pull/21218)
- 🐞 Fix TimePicker `defaultOpenValue` prop not work. [#21198](https://github.com/ant-design/ant-design/pull/21198)
- Transfer
  - 🐞 Fix wrong unit for checkbox label of header. [#21136](https://github.com/ant-design/ant-design/pull/21136) [@morenyang](https://github.com/morenyang)
  - 🐞 Fix icon not align in search input. [#21247](https://github.com/ant-design/ant-design/pull/21247)
- 🐞 Fix Typography not focus at the end of textarea when editable is true. [#21268](https://github.com/ant-design/ant-design/pull/21268)

## 4.0.0-rc.3

`2020-01-27`

- 🛠 Use native Date instead of moment to get timestamp in Countdown component. [#21108](https://github.com/ant-design/ant-design/pull/21108) [@morenyang](https://github.com/morenyang)
- 🐞 Fix Input `suffix / prefix` style issue with `addonBefore / addonAfter`. [#21105](https://github.com/ant-design/ant-design/pull/21105)
- 💄 Improved Timeline component style in RTL mode. [#21068](https://github.com/ant-design/ant-design/pull/21068) [@xrkffgg](https://github.com/xrkffgg)
- 💄 Update `clearfix` mixin to remove legacy `zoom` descriptor. [#21109](https://github.com/ant-design/ant-design/pull/21109) [@morenyang](https://github.com/morenyang)
- 💄Card component use `@font-size-base` instead of inline `14px`. [#21107](https://github.com/ant-design/ant-design/pull/21107) [@morenyang](https://github.com/morenyang)
- 💄 Adjust Layout component to let `className` get higher priority. [#21074](https://github.com/ant-design/ant-design/pull/21074) [@yoyo837](https://github.com/yoyo837)
- Typescript
  - 🐞 Fix Tree wrong event type of AntTreeNodeMouseEvent. [#21102](https://github.com/ant-design/ant-design/pull/21102) [@Jirka-Lhotka](https://github.com/Jirka-Lhotka)
  - 🐞 Fix Form.Item return type define. [#21067](https://github.com/ant-design/ant-design/pull/21067)

## 4.0.0-rc.2

`2020-01-21`

- 🛠 Refactor some demos to React hooks and TypeScript. [#21045](https://github.com/ant-design/ant-design/pull/21045)
- 🐞 Fixed Input/Select components align issue. [#20869](https://github.com/ant-design/ant-design/pull/20869)
- Dropdown
  - 🆕 Support `buttonsRender` to customize buttons. [#20815](https://github.com/ant-design/ant-design/pull/20815)
  - 🐞 Tooltip doesn't disappear on `disabled` Dropdown.Button in Chrome. [#20960](https://github.com/ant-design/ant-design/pull/20960)
- Input
  - 🐞 Fixed Input `prefix` and `suffix` overlap with content issue. [#20872](https://github.com/ant-design/ant-design/pull/20872)
  - 🐞 Fixed Input `placeholder` color in Firefox. [#20850](https://github.com/ant-design/ant-design/issues/20850)
- Table
  - 🐞 Fixed `onChange` return cached fresh sorter & filter state. [#20858](https://github.com/ant-design/ant-design/pull/20858)
  - 🐞 Fixed problem that all-checkbox is checked when all the checkboxes are disabled. [#20968](https://github.com/ant-design/ant-design/pull/20968)
  - 🐞 Fixed `locale.emptyText` not working. [#21024](https://github.com/ant-design/ant-design/pull/21024)
- Select
  - 🐞 Fixed `placeholder` wrap and align issue. [#20883](https://github.com/ant-design/ant-design/pull/20883) [#20884](https://github.com/ant-design/ant-design/pull/20884)
  - 🐞 Fixed multiple Select left padding. [#20861](https://github.com/ant-design/ant-design/pull/20861)
  - 🐞 Fixed multiple Select clean icon overlap issue. [#20914](https://github.com/ant-design/ant-design/pull/20914)
- Form
  - 🆕 Added scroll options as `scrollToField` argument. [#20774](https://github.com/ant-design/ant-design/pull/20774)
  - 🐞 Fixed Form.Item update `help` makes layout shake. [#20886](https://github.com/ant-design/ant-design/pull/20886)
  - 🐞 Fixed unexpected extra rerender when Form.Item is not a real Field. [#20963](https://github.com/ant-design/ant-design/pull/20963)
  - 🐞 Fixed Form.Item ignore `help=""` issue. [#21026](https://github.com/ant-design/ant-design/pull/21026)
  - 🐞 Fixed Form.Item `label` align bug in small screen. [#20836](https://github.com/ant-design/ant-design/issues/20836)
- 🐞 Fixed message cut shadow issue. [#20856](https://github.com/ant-design/ant-design/issues/20856)
- 🐞 Fixed Tooltip hidden when `title` is `0`. [#20894](https://github.com/ant-design/ant-design/pull/20894)
- 🐞 Fixed List `actions` inconsistent position. [#20897](https://github.com/ant-design/ant-design/pull/20897)
- 🆕 Add a visual list example for Tree. [#20911](https://github.com/ant-design/ant-design/pull/20911)
- 🐞 Fixed AutoComplete example styling issue. [#20946](https://github.com/ant-design/ant-design/pull/20946)
- 🗑 Removed AutoComplete useless `labelInValue`. [#20967](https://github.com/ant-design/ant-design/pull/20967)
- 🐞 Fixed Drawer `footerStyle` prop cause react warning. [#20983](https://github.com/ant-design/ant-design/pull/20983)
- 🐞 Fixed Breadcrumb style in `rtl` mode. [#21054](https://github.com/ant-design/ant-design/pull/21054)
- 💄 Tweak Layout `className` order to end. [#21041](https://github.com/ant-design/ant-design/pull/21041)
- TypeScript
  - 🐞 Export DatePicker related interface. [#20900](https://github.com/ant-design/ant-design/pull/20900)
- Less variables
  - 🆕 Readded `@border-radius-sm`. [#20818](https://github.com/ant-design/ant-design/pull/20818)
  - 🆕 Added `@timeline-item-padding-bottom`. [#21013](https://github.com/ant-design/ant-design/pull/21013)
  - 🆕 Added `@layout-header-color`. [#21033](https://github.com/ant-design/ant-design/pull/21033)

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

⚠️ Migrate from v3 to v4 please ref to [migration document](/docs/react/migration-v4).

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
  - 🌟 Added `inputReadOnly` to disable manual input.
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
