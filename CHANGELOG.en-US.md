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

If you want to read change logs before `2.0.0`, please visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md).

---

## 2.7.0

`2017-02-03`

* Added `danger` button and `ghost` button style. [#4679](https://github.com/ant-design/ant-design/pull/4679)
* Input element of AutoComplete can be customized. [#4483](https://github.com/ant-design/ant-design/pull/4483)
* Upgrade rc-cascader to `0.11.0`, keyborad interactions supported. [#4411](https://github.com/ant-design/ant-design/pull/4411)
* More popup directions are supported in notification. [#4732](https://github.com/ant-design/ant-design/pull/4700)
* Upgrade rc-steps to `2.3.0`, added `progressDot` property of Steps, which allows users to customize the display for Steps with progress dot style.
* Upgrade rc-input-number to `3.0.0`
  * Input behavious will trigger `onChange` callback now.[#4265](https://github.com/ant-design/ant-design/pull/4265)
  * Fixed `onKeyUp`. [#4717](https://github.com/ant-design/ant-design/issues/4717)
* Added `vertical` mode of Slider. [#4473](https://github.com/ant-design/ant-design/pull/4473)
* Tag
  * Added preset colors. [#4571](https://github.com/ant-design/ant-design/pull/4571)
  * Improvement vertical-align and margin.
* Add German localization for LocaleProvider.[#4686](https://github.com/ant-design/ant-design/pull/4686)
* Add Swedish localization for LocaleProvider. [#4455](https://github.com/ant-design/ant-design/pull/4455)
* Add French localization for LocaleProvider. [#4538](https://github.com/ant-design/ant-design/pull/4538)
* Added `onSearchChange` callback of Transfer. [#4464](https://github.com/ant-design/ant-design/pull/4464)
* Added `maskClosable` property of Modal.confirm. [#4488](https://github.com/ant-design/ant-design/pull/4488), [#4488](https://github.com/ant-design/ant-design/pull/4490)
* Added `hideRequiredMark` property if Form. [#4732](https://github.com/ant-design/ant-design/pull/4732)
* Improvement upload list of Upload. [#4516](https://github.com/ant-design/ant-design/pull/4516)
* Upgrade rc-select to `6.7.1`.
  * Fixed duplication `onChange` callback. [#156@rc-select](https://github.com/react-component/select/pull/156)
  * Fixed displaying of initial value. [#152@rc-select](https://github.com/react-component/select/pull/152)
* Upgrade rc-tree-select to `1.9.0`.
  * Added `treeDefaultExpandedKeys` property.[#43@rc-tree-select](https://github.com/react-component/tree-select/pull/43)
  * Fixed an overflow-wrap issue. [#42@rc-tree-select](https://github.com/react-component/tree-select/pull/42)
* Added less variables: `@border-style-base` `@border-width-base` `@btn-danger-color` `@btn-danger-bg` and etc.
* Fixed Badge misplace issue when browser zoom above 100%. [#4747](https://github.com/ant-design/ant-design/issues/4747) [#4290](https://github.com/ant-design/ant-design/issues/4290)
* Fixed a mis-align issue of fixed header Table. [#4750](https://github.com/ant-design/ant-design/issues/4750)
* Fixed Table scrolling lag issue in IE. [#4522](https://github.com/ant-design/ant-design/issues/4522)
* Add icon aliases: `addfile` => `file-add`，`addfolder` => `folder-open`, and the old type names are still working. [#4758](https://github.com/ant-design/ant-design/issues/4758)

## 2.6.4

`2017-01-20`

* Improve RangePicker when selecting a preset date.[#4561](https://github.com/ant-design/ant-design/issues/4561)
* Fix DatePicker select time scroll issue.[#4412](https://github.com/ant-design/ant-design/issues/4412)
* Fix issue resulting in vertical Menu can't be controlled.[#3783](https://github.com/ant-design/ant-design/issues/3783)
* Fix Cascader's style when it's disabled.[#4648](https://github.com/ant-design/ant-design/issues/4648)
* Table
  * Improve Table fixed header's scrollbar style.[#4637](https://github.com/ant-design/ant-design/issues/4637)
  * Fix issue resulting in Table's header flashes when `loading` is true in Safari.[#4622](https://github.com/ant-design/ant-design/issues/4622)
  * Fix multiple border issues. [#4647](https://github.com/ant-design/ant-design/issues/4647)、[#4635](https://github.com/ant-design/ant-design/issues/4635)
  * Fix `showHeader`'s default value.[#4658](https://github.com/ant-design/ant-design/issues/4658)
  * Fix missing `TableColumnConfig` type.[#4660](https://github.com/ant-design/ant-design/issues/4660)

## 2.6.3

`2017-01-15`

* Fixed issue introduced in `2.6.2` that Popconfirm is not working. [#4606](https://github.com/ant-design/ant-design/issues/4606)

## 2.6.2

`2017-01-14`

* Added a Third-Party Library Page for recommending other greet react components. [Link](/docs/react/recommendation)
* Fixed misplaced Sider of Layout. [#4459](https://github.com/ant-design/ant-design/issues/4459)
* Fixed Input.Search wrong block layout and misplaced icon. [#4540](https://github.com/ant-design/ant-design/issues/4540)
* Added a customize Collapse panel demo. [Link](/components/collapse/#components-collapse-demo-custom)
* Table
  * Enlarged the width of selection column and expand column.
  * Fixed not-available pagination issue when property `pagination` is changed. [#4532](https://github.com/ant-design/ant-design/issues/4532)
  * Fixed that three level filter menu is not working. [#4541](https://github.com/ant-design/ant-design/issues/4541)
  * Fixed `column.filteredValue` issue of cannot being set to `null`.
* Now Carousel is undragglble and text-selectable defaultly.
* Added warnings when non-BreadcrumbItem node is nested under Breadcrumb. [#4403](https://github.com/ant-design/ant-design/issues/4403)
* Fixed Tooltip hidden issue when `onVisibleChange(visible)` return `true`. [#4579](https://github.com/ant-design/ant-design/issues/4579)
* Make TreeSelect panel default height smaller than screen height. [#4537](https://github.com/ant-design/ant-design/pull/4537)
* Added less variables of TimePicker and Spin.
* Replaced arrows of DatePicker year panel by year text. [#4415](https://github.com/ant-design/ant-design/issues/4415)
* Fixed TypeScript definites of AutoComplete and Form `[options.validateTrigger]`.
* Improved the animation details of Spin and Progress.

## 2.6.1

`2017-1-6`

* Fix style problem for Menu dark theme. [#4440](https://github.com/ant-design/ant-design/issues/4440)
* Fix TypeScript interface definition for `Select[tokenSeparators]` `Modal[afterClose]` `Input[name]` and so on. [#4441](https://github.com/ant-design/ant-design/pull/4441) [@eddhannay](https://github.com/eddhannay)
* Fix that `TimePicker[placeholder]` cannot be set to empty string. [#4446](https://github.com/ant-design/ant-design/pull/4446) [@jialeicui](https://github.com/jialeicui)
* Fix style problem in DatePicker year panel. [#4415](https://github.com/ant-design/ant-design/issues/4415)
* Fix that Table loading doesn't mask Pagination. [#4461](https://github.com/ant-design/ant-design/issues/4461)
* Fix align style for `Input[prefix|suffix]`. [commit](https://github.com/ant-design/ant-design/commit/c4ac4d1eca53ae2f6f4a1e15210b43745f283534)
* Fix align style for Cascader. [commit](https://github.com/ant-design/ant-design/commit/1fbebd4ecfff432e1b2261c9dfee4b9f471e7b1f)

## 2.6.0

`2017-1-2`

- Brand new color system. [pull/4426](https://github.com/ant-design/ant-design/pull/4426)
  - Brand new color algorithm replacing the tint/shade system.
  - Brand new color palattes generated by new algorithm. [Link](http://ant.design/docs/spec/colors)
  - Change default font color.
- Add Layout component. [#3534](https://github.com/ant-design/ant-design/issues/3534)
- Add Grid playground demo. [commit/ee17ab](https://github.com/ant-design/ant-design/commit/ee17abfa9d0362c6f9baab4a9a09e57574583246)
- Input
  - Support prefix and suffix. [#4226](https://github.com/ant-design/ant-design/issues/4226) [@ystarlongzi](https://github.com/ystarlongzi)
  - InputGroup support compact display mode. [pull/4309](https://github.com/ant-design/ant-design/pull/4309)
- Spin support delayed display. [#4306](https://github.com/ant-design/ant-design/issues/4306)
- Fix the dislocation problem of Pagination in low resolution. [#4349](https://github.com/ant-design/ant-design/issues/4349)
- Fix wrapping display of Dropdown.Button. [pull/4355](https://github.com/ant-design/ant-design/pull/4355) [@Morhaus](https://github.com/Morhaus)
- Fix wrong background color of Cascader in disabled status. [#4434](https://github.com/ant-design/ant-design/issues/4434)
- Fix MonthPicker[monthCellContentRender] doesn't work, and some documentation errors. [#4394](https://github.com/ant-design/ant-design/issues/4394)
- Fix the extra border of ButtonGroup. [#4382](https://github.com/ant-design/ant-design/pull/4382) [@ystarlongzi](https://github.com/ystarlongzi)
- Fix wrong background color of the Submenu(horizontal mode). [#4414](https://github.com/ant-design/ant-design/issues/4414)
- Fix overlapping graphics with Select/Cascader in Form.Item with hasFeedback. [#4431](https://github.com/ant-design/ant-design/issues/4431) [@JesperWe](https://github.com/JesperWe)
- Reset border-radius of the first row in Table without header. [#4373](https://github.com/ant-design/ant-design/issues/4373)
- Improve the drag performance of Tree. [#4371](https://github.com/ant-design/ant-design/issues/4371)
- Improve official website and documentation, fix some bugs.
- Update rc-form to support nested style of getFieldDecorator[id].

## 2.5.3

`2016-12-24` 🎄🎄🎄

* Supports TypeScript@2.1. [#4208](https://github.com/ant-design/ant-design/issues/4208)
* Fix style issue resulting in nested Tabs. [#4317](https://github.com/ant-design/ant-design/issues/4317)
* Fix `onChange` callback issue resulting in Radio. [#4242](https://github.com/ant-design/ant-design/issues/4242) [@ystarlongzi](https://github.com/ystarlongzi)
* Fix a FormItem mis-aligin bug. [#4271](https://github.com/ant-design/ant-design/issues/4271)
* Fix background issue resulting in selected element of veritcal Menu.[#4253](https://github.com/ant-design/ant-design/issues/4253)
* Improve arguments type of `onVisibleChange` callback of  Dropdown.[#4236](https://github.com/ant-design/ant-design/issues/4236) [@bang88](https://github.com/bang88)
* Improve first argument type of `onChange` callback of Cascader.[#4231](https://github.com/ant-design/ant-design/issues/4231) [@bang88](https://github.com/bang88)
* Improve default width of Datepicker[showTime]. [b912f1c](https://github.com/ant-design/ant-design/commit/b912f1cea6f470c16b8dd90554883460161cef47)

## 2.5.2

`2016-12-10`

* Improve selected item style of Menu.
* Fix issue resulting in Mention not responses `onFocus` and `onBlur`. [#4163](https://github.com/ant-design/ant-design/issues/4163)
* Fix issue resulting in there is a redundant shadow between `disabled` and `checked` Radio. [#4114](https://github.com/ant-design/ant-design/pull/4114) @jdz321
* Fix error when setting Momment `defaultValue` or `value` on RangePicker, TimePicker, Calendar. [#4147](https://github.com/ant-design/ant-design/issues/4147)
* Fix issue resulting in Affix disappears when it's uesed in animated Tabs. [#3943](https://github.com/ant-design/ant-design/issues/3943)
* Fix issue resulting in Cascader passes different `selectedOptions` to `onChange` when manually selecting and selecting by search. [#4096](https://github.com/ant-design/ant-design/issues/4096)
* Fix issue resulting in Tabs get offset, when too many tabs are opening. [#3637](https://github.com/ant-design/ant-design/issues/3637)
* Table
  * Align text of grouped parent header to center.
  * Fix issue resulting in `filterDropdownVisible` can't be set correctly. [#4162](https://github.com/ant-design/ant-design/issues/4162)

## 2.5.1

`2016-12-03`

* Improve website experience on mobile devices.
* Add some migrate warnings for `1.x` to `2.x`.
* ToolTip, Popover, Popconfirm support to wrap text node and multiple node directly now. [#3924](https://github.com/ant-design/ant-design/issues/3924)
* Anchor
  * Fix current position bug when scroll fastly. [#4053](https://github.com/ant-design/ant-design/issues/4053)
  * Fix a bug of parent component ref node is undefined. [#4037](https://github.com/ant-design/ant-design/issues/4037)
* Table
  * Fix a selection problem when setting defaultChecked in rowSelection. [#4020](https://github.com/ant-design/ant-design/issues/4020)
  * Fix grouping column title cannot work with filters. [#4099](https://github.com/ant-design/ant-design/issues/4099)
* Fix a misplace bug when using Popover over `Input[type="textarea"]`. [#4092](https://github.com/ant-design/ant-design/issues/4092)
* Fix Popconfirm `visible` is not-working problem. [#4068](https://github.com/ant-design/ant-design/issues/4068)
* Fix TimePicker can not override width by `style.width`.
* Unify Steps icon size. [#3817](https://github.com/ant-design/ant-design/issues/3817)
* Fix style details of Form, Button, Slider, Table.

## 2.5.0

`2016-11-25`

* Change the default theme to Alipay style and improve lots of style details.
* Supports server-side rendering. (`Mention` will throw warning for [draft-js](https://github.com/facebook/draft-js/issues/385)' issue)
* Introduce [Jest Snapshot](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing) to test the structure of components and SSR issues.
* Improve official website and documentation.
* Add [document](https://ant.design/docs/react/customize-theme) for customizing theme.
* Add [Sketch template files](https://ant.design/docs/resource/download).
* `LocaleProvider` supports Brazilian. [#4004](https://github.com/ant-design/ant-design/pull/4004) [@nathantn](https://github.com/nathantn)
* DatePicker
  * DatePicker can determine whether to show "Today" button. [commit](https://github.com/ant-design/ant-design/commit/bbef274aae169d142e3e7e3ea0af922d48e6dd64)
  * RangePicker can set presetted ranges. [demo](https://ant.design/components/date-picker/#components-date-picker-demo-presetted-ranges)
  * Fix "Now" button doesn't work while `DatePicker[showTime]` is set. [#3748](https://github.com/ant-design/ant-design/issues/3748)
  * Fix `RangePicker[format]` should work. [#3808](https://github.com/ant-design/ant-design/issues/3808)
* Add and update some icons. [#3977](https://github.com/ant-design/ant-design/pull/3977)
* New component `Input.Search`. [demo](https://ant.design/components/input/#components-input-demo-search-input)
* Mention onSelect event will get complete record. [#3867](https://github.com/ant-design/ant-design/issues/3867)
* Pagination can get current range. [demo](https://ant.design/components/pagination/#components-pagination-demo-total)
* Table
  * We can control the visible of customized `filterDropdown`. [demo](https://ant.design/components/table/#components-table-demo-custom-filter-panel)
  * Supports JSX-style columns. [demo](https://ant.design/components/table/#components-table-demo-jsx)
  * Can listen the click event of table cell. [#3774](https://github.com/ant-design/ant-design/issues/3774)
  * Fix border radius of head of border-less table.
  * Fix that height of title and footer don't follow `Table[size]`. [commit](https://github.com/ant-design/ant-design/commit/9e6439b06cd099ab384a4a2f026f0def6e12bf23)
  * Fix issue with selected status. [#3900](https://github.com/ant-design/ant-design/issues/3900)
* Upload
  * Fix that children could not be `null`.
  * Fix logic of preview. [commit](https://github.com/ant-design/ant-design/commit/e552880c32aaa3f5b0fb09a5e1fb7454c24d5378)
* Fix `z-index` of Badge. [#3898](https://github.com/ant-design/ant-design/issues/3898)
* Fix alignment of multi-line Checkbox. [#3971](https://github.com/ant-design/ant-design/issues/3971) [@flashback313](https://github.com/flashback313)
* Fix alignment of InputNumber while using with other form controls. [#3866(comment)](https://github.com/ant-design/ant-design/issues/3866#issuecomment-261148256)
* Fix style of `Menu.Divider`. [#3813](https://github.com/ant-design/ant-design/issues/3813)
* Fix that Popover should support Checkbox and Radio as children. [#3455](https://github.com/ant-design/ant-design/issues/3455)
* Fix height of `Select[combobox]`. [#3855](https://github.com/ant-design/ant-design/issues/3855)
* Fix style of actived Switch. [#3838](https://github.com/ant-design/ant-design/issues/3838)
* Fix that Transfer doesn't show "Not Found" while there is no search result. [#3996](https://github.com/ant-design/ant-design/issues/3996)
* Fix style of placeholder of TreeSelect. [#3841](https://github.com/ant-design/ant-design/issues/3841)
* Fix compile errors in TypeScript. [#3969](https://github.com/ant-design/ant-design/pull/3969) [@AlbertZheng](https://github.com/AlbertZheng)
* Fix that feedback icon should not affect users' operation. [#3891](https://github.com/ant-design/ant-design/issues/3891)

## 2.4.3

`2016-11-17`

* Fix errors in `Anchor` about querySelector, and make some experience Optimization .[#3832](https://github.com/ant-design/ant-design/issues/3832) [#3844](https://github.com/ant-design/ant-design/issues/3844)

## 2.4.2

`2016-11-13`

* Fix `Dropdown.Button` cannot popup menu.[#3815](https://github.com/ant-design/ant-design/issues/3815)

## 2.4.1

`2016-11-11`

* Fix `2.4.0` missing index files.

## 2.4.0

`2016-11-11`

* Adjust components structure.
* New [Anchor](https://ant.design/components/anchor) Component.
* Fix less variables `@font-size-base` and `@text-color`, add `@font-size-lg` `@text-color-secondary`.
* Add new props `selectedKeys` for `Transfer` component [#3729]. (https://github.com/ant-design/ant-design/issues/3729)
* Add `Tag` selected status.
* Fix `Dropdown.Button` not support `visible` and `onVisibleChange`. [#3779](https://github.com/ant-design/ant-design/issues/3779)
* Fix `Now` button of `DatePicker[showTime]`. [#3748](https://github.com/ant-design/ant-design/issues/3748)
* Fix style of `Steps` in vertical mode. [#3760](https://github.com/ant-design/ant-design/issues/3760)
* Fix style compatibility of `Spin` in IE10+.[#3755](https://github.com/ant-design/ant-design/issues/3755)
* Fix default style of `Carousel` component.
* Fix focus logic of `Mention` component. [#3801](https://github.com/ant-design/ant-design/issues/3801)
* Fix animate bug of `Progress` component. [#3784](https://github.com/ant-design/ant-design/issues/3784)
* Fix focus bug of `Select` component. [#3778](https://github.com/ant-design/ant-design/issues/3778)
* Fix `TimePicker` not support `format="HH"` bug. [#3793](https://github.com/ant-design/ant-design/issues/3793)
* Fix `Input` `suffix` mouse event responsive area. [#3714](https://github.com/ant-design/ant-design/issues/3714)
* Improve performance of `Table` selection. [#3757](https://github.com/ant-design/ant-design/pull/3757)
* Improve Carousel default UI style.
* Improve style of `Checkbox` and `Radio`. [#3590](https://github.com/ant-design/ant-design/issues/3590)
* Fix style of DatePickek, Form, Table.

## 2.3.2

`2016-11-09`

* Fix dead loop while using `getFieldProps`.

## 2.3.1

`2016-11-07`

* Add missing `dist/antd.css` back.

## 2.3.0

`2016-11-04`

* Upgrade normalize.css to 5.0.
* Point main file to `lib/index.js` in package.json. [#3397](https://github.com/ant-design/ant-design/pull/3397)
* A brand new `Spin` design.
* Add `addon` for `TimePicker` to allow render some addon to its bottom.
* Add `onDragEnd` for `Tree`.
* Add `bordered` for `Collapse`.
* Improve `Tabs` switch animation.
* Improve `Radio` and `Checkbox` style when it's disabled and mouse hovered. [#3590](https://github.com/ant-design/ant-design/issues/3590)
* Optimize `Transfer` performance.[#2860](https://github.com/ant-design/ant-design/issues/2860)
* Fix nested `Popover` style issue. [#3448](https://github.com/ant-design/ant-design/issues/3448)
* Fix issue resulting in server side render `Transfer` failed. [#3686](https://github.com/ant-design/ant-design/issues/3686)
* Fix issue resulting in preview image not display when `Upload` in `picture-card` mode. [#3706](https://github.com/ant-design/ant-design/pull/3706) [@denzw](https://github.com/denzw)
* DatePicker
  * `onChange` will be triggered when `DatePicker` in `showTime` mode on blur now.
  * Add `monthCellContentRender` for `MonthPicker`.
  * `Rangepicker` can input time manually now.[#3718](https://github.com/ant-design/ant-design/issues/3718)
  * Add czech locale/translations.
* Badge
  * Improve number over 99 displaying when mouse hovering. [#3645](https://github.com/ant-design/ant-design/issues/3645)
  * Fix moving animation when using `Badge` alone. [#3709](https://github.com/ant-design/ant-design/issues/3709)
* Mention
  * Fix issue resulting in `Mention` will be covered by `Table`. [#3588](https://github.com/ant-design/ant-design/issues/3588)
  * Add `getSuggestionContainer` to allow specify container. [#3658](https://github.com/ant-design/ant-design/pull/3658)
* Tag
  * Deprecate `color`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
  * Add `type`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
  * Add `checkable`. [#3560](https://github.com/ant-design/ant-design/issues/3560)
* Radio.Group
  * Add `className`.
  * `null` or `undefined` `children` will be ignored.
* Select
  * Add `tokenSeparators` to support automatic tokenization. [#2071](https://github.com/ant-design/ant-design/issues/2071)
  * Add `onFocus` callback. [#3587](https://github.com/ant-design/ant-design/issues/3587)
  * Fix issue resulting in Select can't display correct selected item text in `combobox` mode. [#3401](https://github.com/ant-design/ant-design/issues/3401)

## 2.2.1

`2016-11-02`

* Fix controlled DatePicker[showTime] not working bug. [#3665](https://github.com/ant-design/ant-design/issues/3665)

## 2.2.0

`2016-10-28`

* Supports TypeScript@2.0. [@AlbertZheng](https://github.com/AlbertZheng) [#3358](https://github.com/ant-design/ant-design/issues/3358)
* Not rely on specific version of React now. [#3627](https://github.com/ant-design/ant-design/pull/3627)
* Alert supports `className` `style`.
* DatePicker & MonthPicker & RangePicker allow developers to set whether to show the clear button. [#3618](https://github.com/ant-design/ant-design/issues/3618)
* Form.Item can generate `validateStatus` & `help` for nested form control automatically. [#3212](https://github.com/ant-design/ant-design/issues/3212)
* RangePicker can set some hours or minutes or seconds to be not selectable. [#](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date)
* Switch
  * The width of Switch will resize automatically, according to `checkedChildren/unCheckedChildren`. [#3380](https://github.com/ant-design/ant-design/issues/3380)
  * Improve the switch animation.
* Upload can [customized request](https://github.com/react-component/upload#customrequest) now. [@edgji](https://github.com/edgji)
* Icon
  * New icons `bulb` `select` `like-o` `dislike-o`.
  * Adjust existing icons `loading` `like` `dislike`.
* Improve the TypeScript definition of Card & DatePicker & Icon & Table. [@infeng](https://github.com/infeng) [3468](https://github.com/ant-design/ant-design/pull/3468) [#3603](https://github.com/ant-design/ant-design/pull/3603) [#3531](https://github.com/ant-design/ant-design/pull/3531)
* Fix Cascader `defaultValue` should work. [#3470](https://github.com/ant-design/ant-design/issues/3470)
* Fix the alignment of Button & Input & DatePicker & Select. [#3481](https://github.com/ant-design/ant-design/issues/3481)
* DatePicker
  * Fix wrong timing of triggering `onChange` while `DatePicker[showTime]` is set. [#3523](https://github.com/ant-design/ant-design/issues/3523)
* Fix `Dropdown.Button[disabled]` doesn't works for behaviour. [#3535](https://github.com/ant-design/ant-design/issues/3535)
* Menu
  * Fix errors in SSR, thanks to  [@xpcode](https://github.com/xpcode) to find the solution. [#2061](https://github.com/ant-design/ant-design/issues/2061) [#2406](https://github.com/ant-design/ant-design/issues/2406) [#3293](https://github.com/ant-design/ant-design/issues/3293)
  * Fix children don't support `null`. [#3599](https://github.com/ant-design/ant-design/issues/3599)
* Fix loading status animation for message.[#3536](https://github.com/ant-design/ant-design/issues/3536)
* Form
  * Fix style issue while using `Form[inline]` and `Input[addonBefore|addonAfter]` together. [#3524](https://github.com/ant-design/ant-design/issues/3524)
  * Fix style issue for Radio.Button in Form.Item.
  * Fix style issue for search button in Form.Item. [#3630](https://github.com/ant-design/ant-design/issues/3630)
  * Fix Form.Item should not treat no user input as validate success. [#3613](https://github.com/ant-design/ant-design/issues/3613)
* Should not limit the min width of Popover while `Popover[title]` is not set.
* Table
  * Fix style of fixed header of Table while `dataSource` is empty.[#3567](https://github.com/ant-design/ant-design/issues/3567)
  * Fix Table will overlap SubMenu while `dataSource` is empty. [#3521](https://github.com/ant-design/ant-design/issues/3521)
* Tabs
  * Height of header of `Tabs[type="card|editable-card"]` should follow design.
  * Fix height of TabPane should follow height of its content. [#3304](https://github.com/ant-design/ant-design/issues/3304)
* Fix style of `TreeSelect[showSearch]`. [#3520](https://github.com/ant-design/ant-design/issues/3520)

## 2.1.0

`2016-10-16`

- Supports spinning Icon.
- Tabs's switch animation could be disabled now. [#3324](https://github.com/ant-design/ant-design/issues/3324)
- Add Spanish localization for LocaleProvider. @Danjavia
- Update Russian localization for LocaleProvider. @plandem
- Add `onSelect` event for AutoComplete.
- Improve style of Modal.
- Improve animation of Tooltip.
- Improve style of Transfer's buttons.
- Improve style of Tree.
- Fix some less variables.
- Fix errors while import the whole antd in SSR.
- Fix errors while render Affix and BackTop on server. [#3283](https://github.com/ant-design/ant-design/issues/3283) [#3343](https://github.com/ant-design/ant-design/issues/3343)
- Fix conflicts between Cascader search mode and browser's autocomplete behaviour. [#3350](https://github.com/ant-design/ant-design/issues/3350)
- Fix bug that `h3` cannot be the value of Card[title]. [#3388](https://github.com/ant-design/ant-design/issues/3388)
- DatePicker
  - Fix bug that `onChange` will be trigger twice when `showTime` is set. [#3376](https://github.com/ant-design/ant-design/issues/3376)
  - Fix differences between overlay's and trigger's date format. [#3405](https://github.com/ant-design/ant-design/issues/3405) [#3298](https://github.com/ant-design/ant-design/issues/3298)
  - Fix style conflicts with TimePicker. [#3312](https://github.com/ant-design/ant-design/issues/3312) [#3307](https://github.com/ant-design/ant-design/issues/3307)
- Fix overflow issue for Form.Item label.
- Fix that Icon should not show border in Safari.
- Fix infinite loop while inc/dec InputNubmer with keyboard. [#3239](https://github.com/ant-design/ant-design/issues/3239)
- Fix the style of the arrow of Popover.
- Fix bug Popover and Popconfirm `arrowPointAtCenter` doesn't work.
- Select
  - Fix bug that styles of Select are imported twice. [#3332](https://github.com/ant-design/ant-design/issues/3332)
  - Fix bug `notFoundContent` cannot be set as `''`. [#3345](https://github.com/ant-design/ant-design/issues/3345)
  - Fix the unstable width of table cell with Select[showSearch]. [#3413](https://github.com/ant-design/ant-design/issues/3413)
- Fix style conflicts while use `border` & `title` & `footer` of Table at the same time. [#3301](https://github.com/ant-design/ant-design/issues/3301)
- Fix that the height of TabPane doesn't follow height of content. [#3377](https://github.com/ant-design/ant-design/issues/3377)
- Fix bug Transfer[titles] is not under the control of LocaleProvider. [#3264](https://github.com/ant-design/ant-design/pull/3264)
- Upload
  - Fix bug users' `onRemove` will override default behaviour. [#3317](https://github.com/ant-design/ant-design/issues/3317)
  - Fix style for `listType='picture-card'`.[#3316](https://github.com/ant-design/ant-design/issues/3316)
- Fix bug that moment locales is not found while built. [#3204](https://github.com/ant-design/ant-design/issues/3204) [#3411](https://github.com/ant-design/ant-design/issues/3411)

## 2.0.1

`2016-10-01`

- Fix developers cannot call methods of react-slick. [#3164](https://github.com/ant-design/ant-design/issues/3164)
- Fix Steps.Step[icon] should support React.ReactNode. [#3159](https://github.com/ant-design/ant-design/issues/3159)
- Fix server-side render for Affix. [#3216](https://github.com/ant-design/ant-design/issues/3216)
- Fix Mention should support `onSelect` `placeholder`. [#3236](https://github.com/ant-design/ant-design/issues/3236) [#3226](https://github.com/ant-design/ant-design/issues/3226)
- Fix Transfer cannot work with `getFieldDecorator`.
- Fix LocaleProvider doesn't work for time-related components.
- Fix Cascader doesn't show search text in search mode.
- Fix the animation & text Spin should be placed in vertical middle.
- Fix styles of RangePicker Modal Tag Progress.

## 2.0.0

`2016-09-28`

After four months, `antd@2.0.0` is published. We had refactored code and improve functionalities and details of existing components. What's more, we provide English version of the documentation. The antd community help us a lot in developing `antd@2.0.0`.

If you meet any problem while you try to upgrade from `antd@1.0.0`, feel free to [create issues on GitHub](https://github.com/ant-design/ant-design/issues).

### 2.x Major changes

* Refactor components with TypeScript, and provide **`.d.ts` files which are officially supported**. Thanks to all the developers that contributed to [#1846](https://github.com/ant-design/ant-design/issues/1846) and @infeng.
* **Translate the documentation into English**, and we are going to provide both of Chinese and English versions of the documentation in the future. Thanks to all the translators and reviewers that contributed to [#1471](https://github.com/ant-design/ant-design/issues/1471).
* DatePicker, TimePicker, Calendar and other components that are designed to select time **are refactored to replace [gregorian-calendar](github.com/yiminghe/gregorian-calendar) with [moment](http://momentjs.com/)**.
* All the [icons](http://ant.design/components/icon/) are re-designed.
* New component [Mention](http://ant.design/components/mention/).
* New component [AutoComplete](http://ant.design/components/auto-complete/).
* The `getFieldProps` of Form is replaced with `getFieldDecorator` which will warn developers if they make mistakes. Related discussion [#1533](https://github.com/ant-design/ant-design/issues/1533).
* Table supports [grouping columns](http://ant.design/components/table/#components-table-demo-grouping-columns). @yesmeck
* Removed components and features which are deprecated in `antd@1.x`, such as QueueAnim, Validation, Form.ValueMixin, Progress.Line, Progress.Circle, Popover[overlay] and Slider[marks] will not support array any more.

### 2.x Breaking changes

> We suggest you upgrade to lastest version of `2.x`.

There are some breaking changes in `antd@2.0.0`, and you need to modify your code to work with it.

* `value` and `defaultValue` of all the time-related components will not support type `String/Date`, please use [moment](http://momentjs.com/):
  ```diff
  - <TimePicker defaultValue="12:08:23" />
  + <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />

  - <DatePicker defaultValue="2015/01/01" />
  + <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />

  - <Calendar defaultValue={new Date('2010-10-10')} />
  + <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')} />
  ```
* Parameters of type `Date/GregorianCalendar` of functions such as `onChange` and `onPanelChange`, plus other callback functions had been changed to type moment. Please consult [APIs of gregorian-calendar](https://github.com/yiminghe/gregorian-calendar) and [APIs of moment](http://momentjs.com/docs/), and update your code accordingly. And you can consult this [commit](https://github.com/ant-design/ant-design/commit/4026221d451b246956983bb42140142d4a48b7d7) to see how to update.

  Because the return value of `JSON.stringy(date: moment)` will lost time zone, we should use `.format` to convert date to string first, see related issue [#3082](https://github.com/ant-design/ant-design/issues/3082) for details:
  ```js
  handleSubmit() {
    const values = this.props.form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss'); // or other format
    const data = JSON.stringify(values);
    // send data to server
  }
  ```
* For the value of time-related components becomes an instance of `moment`, you should replace `type: 'date'` with `type: 'object'` in form validation.
* The `format` of time-related components is changed from [gregorian-calendar-format](https://github.com/yiminghe/gregorian-calendar-format#api) to [moment  format](http://momentjs.com/docs/#/parsing/string-format/) now, for instance the format `yyyy-MM-dd` should change to `YYYY-MM-DD`.
* `linkRender` and `nameRender` of Breadcrumb are removed, please use `itemRender`.
* `onClose` and `onOpen` of Menu are removed, please use `onOpenChange`. As being totally different, please check [this demo](http://beta.ant.design/components/menu/#components-menu-demo-sider-current) first.
* Paging columns of Table were removed, please use [fixed columns](http://ant.design/components/table/#components-table-demo-fixed-columns).
* `Popover[overlay]` is removed, please use `Popover[content]` instead.

The following change will throw some warnings in the console and it will still work, but we recommend to update your code.

* `getFieldProps` of Form is deprecated, please use `getFieldDecorator`:

  ```diff
  -  <Input placeholder="text" {...getFieldProps('userName', { ... })} />
  +  {getFieldDecorator('userName', { ... })(
  +    <Input placeholder="text" />
  +  )}
  ```

  Look up to [#1533](https://github.com/ant-design/ant-design/issues/1533) for related discussion.

* `toggleOpen` of DatePicker is deprecated, please use `onOpenChange`:

  ```diff
  - handleToggleOpen({ open }) {
  + handleOpenChange(open) {
    ...
  }
  ```

### 2.x Bug fixes

* Dropdown.Button[disabled] should work. [#3070](https://github.com/ant-design/ant-design/issues/3070)
* `option.withRef` of Form.create should work. [#2843](https://github.com/ant-design/ant-design/issues/2843)
* Fix slow response of expanding sub menu in Menu[inline] mode. [#2701](https://github.com/ant-design/ant-design/issues/2701)
* The button of Modal.confirm(and so on) should not be clickable while it is closed asynchronously. [#2684](https://github.com/ant-design/ant-design/issues/2684)
* `format` of DatePicker[showTime] should work. [#3123](https://github.com/ant-design/ant-design/issues/3123)
* Fix Table[dataSource] treat key whose value is `0` as inexisting. [#3166](https://github.com/ant-design/ant-design/pull/3166) @noonnightstorm
* Tree.Node should not show arrow if it has no child nodes. [#2616](https://github.com/ant-design/ant-design/issues/2616)
* Fix cursor style of arrows that are hidden of Tree.Node. [#2748](https://github.com/ant-design/ant-design/issues/2748)

### 2.x Other improvements

* Alert supports [`banner` mode](http://ant.design/components/alert/#components-alert-demo-banner).
* BackTop will scroll to top with animation.
* Badge supports [status dot mode](http://ant.design/components/badge/#components-badge-demo-status).
* Cascader supports [searching options directly](http://ant.design/components/cascader/#components-cascader-demo-search).
* Checkbox supports [indeterminate mode](http://ant.design/components/checkbox/#components-checkbox-demo-check-all).
* Form supports [vertical layout](http://ant.design/components/form/#components-form-demo-validate-customized).
* InputNumber supports long press to increase/decrease number. [#](http://ant.design/components/input-number/#components-input-number-demo-basic)
* notification supports [customized icon](http://ant.design/components/notification/#components-notification-demo-custom-icon).
* Spin allows [customized tips and animation work together](http://ant.design/components/spin/#components-spin-demo-tip). @jerrybendy
* Transfer can handle event while options are checked/unchecked. [#](http://ant.design/components/transfer/#components-transfer-demo-basic)
* Transfer can determine [whether an option is checkable](http://ant.design/components/transfer/#components-transfer-demo-basic).
* Improve style of Alert and notification.
* Modal.confirm(and so on) can be closed by keyboard. @Dafrok
* Improve the user experience of [selecting time in DatePicker](http://ant.design/components/date-picker/#components-date-picker-demo-time).
* Improve the status changed animation of [Spin](http://ant.design/components/spin/#components-spin-demo-nested ).
* Update [font-family](https://github.com/ant-design/ant-design/commit/2f308b0f995cfcb2a3c8feb1e35ffd3f0bf93cfc).

### 2.x Workflow

* [AntD Library](http://library.ant.design/) a collection of Axure files which includes components and patterns that follow Ant Design Specification.
* Rename `babel-plugin-antd` to [`babel-plugin-import`](https://github.com/ant-design/babel-plugin-import), and this means that `babel-plugin-import` becomes an common load-on-demand solution and not just for `antd`.

  Please update `package.json`:

  ```diff
  {
    "devDependencies": {
  -   "babel-plugin-antd": "^0.x.x",
  +   "babel-plugin-import": "^1.0.0",
    }
  }
  ```

  And update your babel config in `.babelrc` or other place:

  ```diff
  {
  -  "plugins": [["antd", { style: "css" }]]
  +  "plugins": [["import", { libraryName: "antd", style: "css" }]]
  }
  ```

* [dva@1.0.0](https://github.com/dvajs/dva) is published and it is officially recommended framework [in real world](http://ant.design/docs/react/practical-projects).
* The officially recommended scaffold is [dva-cli](https://github.com/dvajs/dva-cli) now, the old `antd-init` is just for studying and demo.

## 1.11.4

Visit [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) to read change logs from `0.x` to `1.x`.
