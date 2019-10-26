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

## 3.24.3

`2019-10-26`

- 🐞 Fix Table sort not working when `columns` inside render. [#19404](https://github.com/ant-design/ant-design/pull/19404)
- 🐞 Fix Grid responsive `gutter` not working. [#19308](https://github.com/ant-design/ant-design/pull/19308)
- 🐞 Fix small Table border style. [#19312](https://github.com/ant-design/ant-design/pull/19312) [#19342](https://github.com/ant-design/ant-design/pull/19342)
- 🐞 Fix the problem that Menu in Dropdown is not highlighted when SubMenu is selected. [#19313](https://github.com/ant-design/ant-design/pull/19313)
- 🐞 Fix the problem that moment.js in Typography & Drawer & Statistic can't be tree-shaking. [#19317](https://github.com/ant-design/ant-design/pull/19317)
- 🐞 Fix Input.Search react warnings of `non-boolean attribute` and `unique key`. [#19357](https://github.com/ant-design/ant-design/pull/19357)
- 🐞 Fix Modal icon position when not use title. [#19419](https://github.com/ant-design/ant-design/pull/19419)
- 💄 Fix a problem with the mouse pointer error when Checkbox is disabled. [#19403](https://github.com/ant-design/ant-design/pull/19403)
- 💄 Add `@modal-header-color` variable. [#19385](https://github.com/ant-design/ant-design/pull/19385)
- 🛠 Improved some TypeScript definitions. [#19377](https://github.com/ant-design/ant-design/pull/19377) [#19343](https://github.com/ant-design/ant-design/pull/19343) [#19333](https://github.com/ant-design/ant-design/pull/19333)

## 3.24.2

`2019-10-19`

- 🐞 Fix Table `scroll={{ x: 'max-content' }}` rendered without scrollbar problem in Chrome. [#19284](https://github.com/ant-design/ant-design/pull/19284)
- 🐞 Fix Table crash when passing `column.filterDropdown` as new prop. [#19302](https://github.com/ant-design/ant-design/pull/19302)
- 🐞 Fix Upload `download` button trigger preview unexpectedly. [#19268](https://github.com/ant-design/ant-design/pull/19268) [@qq645381995](https://github.com/qq645381995)
- 🐞 Fix Comment long author name breaks on small screen. [#19272](https://github.com/ant-design/ant-design/pull/19272) [@rayronvictor](https://github.com/rayronvictor)
- Typescript
  - 🐞 Improve RangePicker `value` types. [#19300](https://github.com/ant-design/ant-design/pull/19300) [@neung123](https://github.com/neung123)
  - 🐞 Improve Select `mode` types. [#19286](https://github.com/ant-design/ant-design/pull/19286) [@wleven](https://github.com/wleven)
  - 🐞 Improve Upload `customRequest` types. [#19278](https://github.com/ant-design/ant-design/pull/19278) [@broder](https://github.com/broder)

## 3.24.1

`2019-10-17`

- 🐞 Fix Table throw `React.createRef is not a function error` in old version of React . [#19262](https://github.com/ant-design/ant-design/pull/19262)
- 🐞 Fix Table TypeScript definition missing Column and ColumnGroup. [#19251](https://github.com/ant-design/ant-design/pull/19251)

## 3.24.0

`2019-10-16`

- 🔥 Promote [Yuque](https://www.yuque.com/?chInfo=ch_antd) on home page.
- Table
  - 🌟 Added `tableLayout` property for `table-layout` attribute. And using `tableLayout="fixed"` by default in scroll table to resolve align issue caused by cell content. [#17284](https://github.com/ant-design/ant-design/pull/17284)
  - 🌟 Added `column.ellipsis` to ellipsize cell content.
  - 🌟 Added the `scroll.scrollToFirstRowOnChange` property to set whether to scroll to the top of the table after page changing. [#18726](https://github.com/ant-design/ant-design/pull/18726)
  - 🌟 `filterDropdown` added a `visible` parameter to get the display state of the dropdown box. [#17614](https://github.com/ant-design/ant-design/pull/17614) [@sedx](https://github.com/ant-design/ant-design/pull/17614)
  - 🌟 `title` added a `sortColumn` parameter to get the currently sorted column. [#19012](https://github.com/ant-design/ant-design/pull/19012) [@swillis12](https://github.com/swillis12)
  - 🌟 The `sorter` parameter of `onChange` will always contain `column` information when sorting. [#19226](https://github.com/ant-design/ant-design/pull/19226)
  - 🐞 Fix Table filter submenu checkbox margin. [#e1a4f28](https://github.com/ant-design/ant-design/commit/e1a4f2891e3c35ae26495432bd2d288d4d81064a)
- 🌟 Anchor added a `onChange` attribute to listen for changes to anchor links. [#18715](https://github.com/ant-design/ant-design/pull/18715)
- Upload
  - 🌟 Added `showDownloadIcon` attribute to display download icon. [#18664](https://github.com/ant-design/ant-design/pull/18664) [@qq645381995](https://github.com/qq645381995)
  - 🌟 Support for `onRemove` control of upload interrupts. [#18937](https://github.com/ant-design/ant-design/pull/18937) [@ladjzero](https://github.com/ladjzero)
- 🌟 Input.Search added a `loading` property to show the state in the load. [#18771](https://github.com/ant-design/ant-design/pull/18771)
- 🌟 Grid's `gutter` property added support for vertical spacing. Now you can set an array for `gutter` and the second value of the array for vertical spacing. [#18979](https://github.com/ant-design/ant-design/pull/18979)
- 🌟 message added support for updating content with a unique key. [#18678](https://github.com/ant-design/ant-design/pull/18678)
- 🌟 Layout added a `zeroWidthTriggerStyle` property to control the style of the special `trigger` that appears when `collapsedWidth` is `0`. [#19079](https://github.com/ant-design/ant-design/pull/19079)
- 🌟 Drawer added the `drawerStyle` and `headerStyle` properties. [#19109](https://github.com/ant-design/ant-design/pull/19109)
- PageHeader
  - 💄 Redesigned. [#19100](https://github.com/ant-design/ant-design/pull/19100)
  - 🌟 Added `ghost` property to set whether white background is needed. [#19100](https://github.com/ant-design/ant-design/pull/19100)
- ConfigProvider
  - 🌟 Added `pageHeader` to globally control the style of PageHeader. [#19100](https://github.com/ant-design/ant-design/pull/19100)
  - 🐞 Fixed the issue that `moment` can't be tree-shark. [#19115](https://github.com/ant-design/ant-design/pull/19115)
- 🐞 Fixed the issue that the `removeIcon` and `clearIcon` properties of TreeSelect didn't work. [#18949](https://github.com/ant-design/ant-design/pull/18949)
- 🐞 Fixed the issue that the `switcherIcon` does not take effect after the Tree setting `showLine`. [#18829](https://github.com/ant-design/ant-design/pull/18829) [@MrHeer](https://github.com/MrHeer)
- 🐞 Fixed the issue that the Slider component set the handle size and positioned incorrectly. [#19120](https://github.com/ant-design/ant-design/pull/19120)
- Collapse
  - 🐞 Fix icon styles under IE 11. [#19135](https://github.com/ant-design/ant-design/pull/19135) [@GBcrimson](https://github.com/GBcrimson)
  - 🐞 Keep `className` given to `expandIcon`. [#19160](https://github.com/ant-design/ant-design/pull/19160) [@gpetrioli](https://github.com/gpetrioli)
- 🐞 Fixed the issue that `defaultExpandAll` does not take effect when Tree.DirectoryTree component passed `treeData`. [#19148](https://github.com/ant-design/ant-design/pull/19148)
- 🐞 Fixed the issue with some of the Menu styles under Dropdown. [#19150](https://github.com/ant-design/ant-design/pull/19150)
- 🐞 Fixed Cascader's `placeholder` internationalization error. [#19227](https://github.com/ant-design/ant-design/pull/19227) [@kagawagao](https://github.com/kagawagao)
- 🌟 Added less variables `@typography-title-margin-top`, `@typography-title-margin-bottom`. [#18746](https://github.com/ant-design/ant-design/pull/18746)
- 🗑 Discard the `autosize` property of Input.TextArea, use `autoSize` instead. [#19177](https://github.com/ant-design/ant-design/pull/19177)

## 3.23.6

`2019-10-05`

- 🐞 Fix Typography `ref` warning of React. [#19074](https://github.com/ant-design/ant-design/pull/19074)

## 3.23.5

`2019-09-29`

- 🐞 Fix Upload preview image cannot fill the picture card box. [#18990](https://github.com/ant-design/ant-design/pull/18990)
- 🐞 Fix Breadcrumb not support `data-*` and `aria-*` attributes. [#18941](https://github.com/ant-design/ant-design/pull/18941) [@sosohime](https://github.com/sosohime)
- 🐞 Fix TreeSelect `removeIcon` and `clearIcon` not working. [#18949](https://github.com/ant-design/ant-design/issues/18949) [@sosohime](https://github.com/sosohime)
- 🐞 Fix Tree `switcherIcon` prop not working when `showLine` is true. [#18829](https://github.com/ant-design/ant-design/pull/18829) [@MrHeer](https://github.com/MrHeer)
- 🐞 Fix style bug of Button with icon only when in Button.Group. [#18994](https://github.com/ant-design/ant-design/pull/18994)
- 🐞 Remove Select useless prop `searchValue` which is a total misunderstanding. [#19003](https://github.com/ant-design/ant-design/pull/19003)
- 🐞 Fix Avatar string blink when ssr render at first time. [#19029](https://github.com/ant-design/ant-design/pull/19029)
- TypeScript
  - 🐞 Fix Grid type definition. [#18946](https://github.com/ant-design/ant-design/pull/18946) [@handycode](https://github.com/handycode)

## 3.23.4

`2019-09-21`

- 🐞 Fix item not disabled when Transfer is `disabled`. [#18849](https://github.com/ant-design/ant-design/pull/18849)
- 🐞 Revert Dragger to class component to fix ref warning. [#18707](https://github.com/ant-design/ant-design/issues/18707)
- 🐞 Fix Input `addonAfter` icon height bug in Chrome. [#18858](https://github.com/ant-design/ant-design/pull/18858)
- 🐞 Fix Menu lost state when being collapsed to `0px`. [#18907](https://github.com/ant-design/ant-design/pull/18907)
- 🐞 Disabled input should not trigger the action of suffix part. [#18900](https://github.com/ant-design/ant-design/pull/18900)
- 🐞 Fix title and content of Alert not break line when long text exist. [#18929](https://github.com/ant-design/ant-design/pull/18929)
- 💄 Add `@page-header-back-color` less variable. [#18887](https://github.com/ant-design/ant-design/pull/18887)
- TypeScript
  - 🐞 Fix Table event type definition. [#18910](https://github.com/ant-design/ant-design/pull/18910)

## 3.23.3

`2019-09-16`

- 🐞 Fix ConfigProvider `locale` not working with Modal in some situation. [#18732](https://github.com/ant-design/ant-design/pull/18732)
- 🐞 Fix Avatar extrusion style when using long pictures. [#18768](https://github.com/ant-design/ant-design/pull/18768) [@Eusen](https://github.com/Eusen)
- 🐞 Fix InputNumber active border style. [#18791](https://github.com/ant-design/ant-design/pull/18791) [@escorponox](https://github.com/escorponox)
- 🐞 Fix Input.Search not trigger `onSearch` when click clear icon. [#18783](https://github.com/ant-design/ant-design/pull/18783)
- 🐞 Fix text color of Button inside Menu. [#18820](https://github.com/ant-design/ant-design/pull/18820)
- 🐞 Fix `size="small"` Table header missing right border. [#18821](https://github.com/ant-design/ant-design/pull/18821)
- ⌨️ Enhance accessibility of Alert close button. [#18750](https://github.com/ant-design/ant-design/pull/18750) [@MrHeer](https://github.com/MrHeer)
- 💄 Tweak Button `type="link"` should not insert space. [#18724](https://github.com/ant-design/ant-design/pull/18724)
- TypeScript
  - 🐞 Fix type definition of `onMouseEnter` and `onMouseLeave` for Tree. [#18796](https://github.com/ant-design/ant-design/pull/18796) [@MrHeer](https://github.com/MrHeer)

## 3.23.2

`2019-09-06`

- 🐞 Fix `round` Button font size too large. [#18701](https://github.com/ant-design/ant-design/pull/18701)
- 🐞 Fix Descriptions warning with same key when bordered is true. [#18637](https://github.com/ant-design/ant-design/pull/18637)
- 🐞 Fix Drawer animation when `placement` is right and `mask` is false. [#18636](https://github.com/ant-design/ant-design/pull/18636)
- 🐞 Fix Icon that `component` and `children` prop should have priority over `type` prop. [#18592](https://github.com/ant-design/ant-design/pull/18592)
- 🐞 Fix Layout.Sider boundary values for max-width. [#18553](https://github.com/ant-design/ant-design/pull/18553) [@Nikitenkova](https://github.com/Nikitenkova)
- 🐞 Fix PageHeader that back icon can't coexist with breadcrumb. [#18691](https://github.com/ant-design/ant-design/pull/18691)
- 🗑 Deprecated Select `inputValue` prop and use `searchValue` instead. [#18629](https://github.com/ant-design/ant-design/pull/18629)
- TypeScript
  - 🐞 Fix type definition of `status` for Result. [#18445](https://github.com/ant-design/ant-design/pull/18445)
  - 🐞 Fix type definition of `target` for Anchor.Link. [#18646](https://github.com/ant-design/ant-design/pull/18646)
  - 🐞 Fix type definition of `transformFile` params for Upload. [#18671](https://github.com/ant-design/ant-design/pull/18671)
  - 🐞 Fix type definition of `title` and `footer` for Table. [#18697](https://github.com/ant-design/ant-design/pull/18697) [@yoyo837](https://github.com/yoyo837)

## 3.23.1

`2019-09-03`

- 🐞 Fix Upload can not upload more than one file when `multiple` is `false`. [#18626](https://github.com/ant-design/ant-design/pull/18626)
- 🐞 Fix MonthPicker switch handler overflow style. [#18624](https://github.com/ant-design/ant-design/pull/18624)
- 💄 Tree add `@tree-node-hover-bg` and `@tree-node-selected-bg` less variable. [#18593](https://github.com/ant-design/ant-design/pull/18593) [@MrHeer](https://github.com/MrHeer)

## 3.23.0

`2019-09-02`

- 🔥 Pageheader has been redesigned to accommodate more situations. [#18128](https://github.com/ant-design/ant-design/pull/18128)
- 🌟 Card support `tabBarExtraContent` prop. [#18433](https://github.com/ant-design/ant-design/pull/18433) [@lengthmin](https://github.com/lengthmin)
- 🌟 Anchor.Link add add new property `target`. [#18335](https://github.com/ant-design/ant-design/pull/18335) [@DiamondYuan](https://github.com/DiamondYuan)
- 🌟 Breadcrumb support children use with `React.Fragment`. [#18340](https://github.com/ant-design/ant-design/pull/18340) [@long-zhuge](https://github.com/long-zhuge)
- 🌟 Card.Grid add new prop `hoverable` for support disable hover state. [#18457](https://github.com/ant-design/ant-design/pull/18457) [@MrHeer](https://github.com/MrHeer)
- 🇦🇲 Added locales for the Armenian language. [#18586](https://github.com/ant-design/ant-design/pull/18586) [@ashmna](https://github.com/ashmna)
- InputNumber
  - 🌟 Support `onPressEnter` prop. [#18346](https://github.com/ant-design/ant-design/pull/18346)
  - 🐞 Fix React lifecycle warning. [#18346](https://github.com/ant-design/ant-design/pull/18346)
- Less variables
  - 💄 Add `@modal-footer-border-color-split`. [#18522](https://github.com/ant-design/ant-design/pull/18522)
  - 💄 Add `@input-number-handler-bg` `@input-number-handler-border-color`. [#18533](https://github.com/ant-design/ant-design/pull/18533)
  - 💄 Add `@card-background` `@card-skeleton-bg`. [#18531](https://github.com/ant-design/ant-design/pull/18531)
  - 💄 Add `@typography-title-font-weight`. [#18456](https://github.com/ant-design/ant-design/pull/18456) [@MrHeer](https://github.com/MrHeer)
- 🛎 Add warning when use `value` of Switch, Checkbox, Upload. [#18497](https://github.com/ant-design/ant-design/pull/18497)
- 🛠 Refactor styleChecker to arrow function for fix serverless target in next.js. [#18541](https://github.com/ant-design/ant-design/pull/18541) [@ZhengYuTay](https://github.com/ZhengYuTay)
- 🐞 Fix circle Button not circle in some situation. [#18516](https://github.com/ant-design/ant-design/pull/18516)
- 🐞 Fix icon position in Input. [#18521](https://github.com/ant-design/ant-design/pull/18521) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix RangePicker selected date style. [#18559](https://github.com/ant-design/ant-design/pull/18559)
- Descriptions
  - 🐞 Fix Descriptions last Item has wrong calculated width issue. [#18568](https://github.com/ant-design/ant-design/pull/18568)
  - 🐞 Description.Item will reuse `key` in render if user provided. [#18578](https://github.com/ant-design/ant-design/pull/18578)
- 🐞 Fix Tab content width not correct in Safari. [#18574](https://github.com/ant-design/ant-design/pull/18574)
- 🐞 Fix Mentions popup position not correct when `prefix` is empty string. [#18576](https://github.com/ant-design/ant-design/pull/18576)
- 🐞 Fix Upload.Dragger can upload multiple files when `multiple` is false. [#18580](https://github.com/ant-design/ant-design/pull/18580)
- 🐞 Fix Card `actions` style when contains link Button. [#18588](https://github.com/ant-design/ant-design/pull/18588)
- 🐞 Fix Input not vertical align with Button in Chrome. [#18603](https://github.com/ant-design/ant-design/pull/18603)
- 🐞 Fix nested List style in grid layout. [#18589](https://github.com/ant-design/ant-design/pull/18589)
- TypeScript
  - 🐞 Fix Steps.Step component's `subTitle` prop types. [#18525](https://github.com/ant-design/ant-design/pull/18525) [@wtzeng1](https://github.com/wtzeng1)
  - 🐞 Ensure title or overlay is required in Tooltip props definition. [#18515](https://github.com/ant-design/ant-design/pull/18515) [@laysent](https://github.com/laysent)

## 3.22.2

`2019-08-27`

- 🐞 Fix Mentions has additional height in Form. [#18478](https://github.com/ant-design/ant-design/pull/18478)
- 🐞 Fix disabled Input should not be allowed to clear. [#18482](https://github.com/ant-design/ant-design/pull/18482)
- 🐞 Fix Input.Password crash with `Cannot read property 'input' of null` when unmount. [#18475](https://github.com/ant-design/ant-design/pull/18475)
- 🐞 Fix Table `style` should applied to outside wrapper. [#18494](https://github.com/ant-design/ant-design/pull/18494)
- 🐞 Fix PageHeader default english text. [#18471](https://github.com/ant-design/ant-design/pull/18471) [@hjiawei](https://github.com/hjiawei)

## 3.22.1

`2019-08-26`

- 🔥 The official website now supports the search icon through the picture! [#18425](https://github.com/ant-design/ant-design/pull/18425)
- 💄 Tweak Table expand icon style. [c5344bd](https://github.com/ant-design/ant-design/commit/c5344bde529a2f2ec814f46e7ec5d249eac8d608)
- 🐞 Fix prop `style` is getting duplicated on Table. [#18330](https://github.com/ant-design/ant-design/pull/18330) [@MrHeer](https://github.com/MrHeer)
- 🐞 Fix Input line height style bug in IE11. [#17759](https://github.com/ant-design/ant-design/pull/17759)
- 🐞 Fix Steps progressDot broken style. [#18356](https://github.com/ant-design/ant-design/pull/18356)
- 🐞 Fix an issue with plain icon button style errors. [#18458](https://github.com/ant-design/ant-design/pull/18458) [@qhanw](https://github.com/qhanw)
- 🐞 Fix TextArea with `autosize` in controlled mode that scrollbar blink when typing. [#18401](https://github.com/ant-design/ant-design/pull/18401)
- 🐞 Fixed an issue where Input.Password `ref` could not get the input element and had no `focus` and `blur` method. [#18441](https://github.com/ant-design/ant-design/pull/18441)
- 🐞 Fix Upload wrong line break. [#18423](https://github.com/ant-design/ant-design/pull/18423)
- 💄 Add less variables `@select-dropdown-bg` `@select-item-selected-bg` `@select-item-active-bg` `@anchor-border-colorr` `@descriptions-bg`. [#18444](https://github.com/ant-design/ant-design/pull/18444) [#18372](https://github.com/ant-design/ant-design/pull/18440) [@MrHeer](https://github.com/MrHeer)

## 3.22.0

`2019-08-17`

- 🔥 New type `navigation` of Step. [#17994](https://github.com/ant-design/ant-design/pull/17994)
  - <img width="600" class="markdown-inline-image" src="https://gw.alipayobjects.com/zos/antfincdn/oc7rRuPBbR/421d7885-a822-4375-9deb-92d607e0d9de.png" />
- 🇷🇴 Add Romanian locale. [#18163](https://github.com/ant-design/ant-design/pull/18163) [@stefy](https://github.com/stefy)
- Anchor
  - 🌟 Add `getCurrentAnchor` property to specify current active anchor. [#17823](https://github.com/ant-design/ant-design/pull/17823) [@shaodahong](https://github.com/shaodahong)
  - 🌟 Add `targetOffset` property to customize scroll position offset. [#17827](https://github.com/ant-design/ant-design/pull/17827) [@shaodahong](https://github.com/shaodahong)
- 🌟 Drawer supports popup in custom dom node. [#18167](https://github.com/ant-design/ant-design/pull/18167)
- 🌟 Mentions support `getPopupContainer` property. [#18298](https://github.com/ant-design/ant-design/pull/18298) [@vijayst](https://github.com/vijayst)
- 🌟 Modal support custom `closeIcon`. [#18309](https://github.com/ant-design/ant-design/pull/18309)
- 🌟 Upload support to preview `jfif` format images. [#18322](https://github.com/ant-design/ant-design/pull/18322)
- 💄 Tweak Descriptions.Item padding bottom via size. [#18270](https://github.com/ant-design/ant-design/pull/18270)
- Cascader
  - 🌟 Allow input `autoComplete` to be overrided. [#18279](https://github.com/ant-design/ant-design/pull/18279) [@zomars](https://github.com/zomars)
  - 🐞 Fix wrong `notFoundContent` width when using `fieldNames`.[#18325](https://github.com/ant-design/ant-design/pull/18325)
  - 🐞 Fix missing `options` cause crash. [#18190](https://github.com/ant-design/ant-design/pull/18190) [@nnecec](https://github.com/nnecec)
- 🐞 Fix Menu.SubMenu `className` applied to popup menu mistakenly. [#18290](https://github.com/ant-design/ant-design/pull/18290)
- 🐞 Upgrade react-slick to fix Carousel lifecycle warning. [#18209](https://github.com/ant-design/ant-design/pull/18209)
- 🐞 Fix Button `received false for a non-boolean attribute loading` warning. [#18208](https://github.com/ant-design/ant-design/pull/18208)
- 🐞 Fix style problem when hovering Table selected row. [#18261](https://github.com/ant-design/ant-design/pull/18261)
- 🐞 Fix Checkbox hovering border color when it is `disabled`. [#18168](https://github.com/ant-design/ant-design/pull/18168)
- 🐞 Fix Progress missing or messed gradient color. [#18284](https://github.com/ant-design/ant-design/pull/18284)
- 🐞 修复 TextArea scrollbar blinking problem when using `autosize` and `maxRows`. [#18289](https://github.com/ant-design/ant-design/pull/18289)
- TypeScript
  - 🐞 Fix some components (Tooltip, Breadcrumb, Badge) importing error. [#18282](https://github.com/ant-design/ant-design/pull/18282) [@lidianhao123](https://github.com/lidianhao123)
  - 🐞 Fix MonthPicker `monthCellContentRender` property definition. [#18192](https://github.com/ant-design/ant-design/pull/18192) [@JonathanLee-LX](https://github.com/JonathanLee-LX)
  - 🐞 Fix Upload.Dragger `children` error. [#18196](https://github.com/ant-design/ant-design/pull/18196)
  - 🐞 Fix Tag.CheckableTag `style` property definition. [#18300](https://github.com/ant-design/ant-design/pull/18300)

## 3.21.4

`2019-08-09`

- 🐞 Fix the problem that Dropdown.Button requires `title` props.

## 3.21.3

`2019-08-09`

- Timeline
  - 🐞 Fix the problem that `content` content does not wrap when it is too long. [#18092](https://github.com/ant-design/ant-design/pull/18092) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 Fixed inconsistency in styles in `alternate` and `right` modes and width overflow of `content`. [#18093](https://github.com/ant-design/ant-design/pull/18093) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix Tabs content with margin collapse with navigation. [#18112](https://github.com/ant-design/ant-design/pull/18112)
- 🐞 Fix Textarea `autosize` shows scrollbar after resize. [#18114](https://github.com/ant-design/ant-design/pull/18114)
- 🐞 Fix Tooltip not work correctly on `disabled` Checkbox. [#18138](https://github.com/ant-design/ant-design/pull/18138)
- 🐞 Fix a Button line-height align issue. [#18139](https://github.com/ant-design/ant-design/pull/18139)
- 🐞 Fix missing `blur` and `focus` methods on Mentions. [#18132](https://github.com/ant-design/ant-design/pull/18132) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix missing `title` on Button. [#18130](https://github.com/ant-design/ant-design/pull/18130) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Upload throw File not defined in IE9. [#18115](https://github.com/ant-design/ant-design/pull/18115)
- 🐞 Fix Input clear icon not align correctly. [#18151](https://github.com/ant-design/ant-design/pull/18151)
- 🐞 Fix Card broken style when using Button as `actions`. [#18179](https://github.com/ant-design/ant-design/pull/18179)
- 🐞 Fix the problem that Modal.confirm can't set `getContainer`. [#18182](https://github.com/ant-design/ant-design/pull/18182)
- ⌨️ Improve Divider accessibility by adding role="separator". [#18116](https://github.com/ant-design/ant-design/pull/18116)

## 3.21.2

`2019-08-06`

- 🐞 Fix `React does not recognize the noStyle prop on a DOM element` warning. [#18088](https://github.com/ant-design/ant-design/pull/18088)
- 🐞 Fix Input `prefix` & `suffix` not align with text. [#18097](https://github.com/ant-design/ant-design/pull/18097)
- 🐞 Fix ConfigProvider nest in LocaleProvider make `locale` not work. [#18105](https://github.com/ant-design/ant-design/pull/18105)

## 3.21.1

`2019-08-05`

- 🐞 Fix ConfigProvider crash with multiple children. [#18075](https://github.com/ant-design/ant-design/pull/18075)

## 3.21.0

`2019-08-04`

- 🌟 Breadcrumb adds `Separator` component. [#17873](https://github.com/ant-design/ant-design/pull/17873) [@long-zhuge](https://github.com/long-zhuge)
- 🌟 Descriptions adds `colon` props. [#17560](https://github.com/ant-design/ant-design/pull/17560) [@hengkx](https://github.com/hengkx)
- 🌟 Rotate zero when Sider triggers in right mode. [#18043](https://github.com/ant-design/ant-design/pull/18043) [@kagawagao](https://github.com/kagawagao)
- 🌟 Table add `getPopupContainer` props. [#17806](https://github.com/ant-design/ant-design/pull/17806)
- 🌟 Add new color `gray` for Timeline.Item for unfinished or disabled status. [#17731](https://github.com/ant-design/ant-design/pull/17731)
- 🌟 Upload adds `transformFile` to support transforming file before file uploading. [#18009](https://github.com/ant-design/ant-design/pull/18009) [@lijinke666](https://github.com/lijinke666)
- 🐞 Fix ConfigProvider `getPopupContainer` not working in Table. [#17806](https://github.com/ant-design/ant-design/pull/17806)
- 🐞 Fix Statistic font not align with global font. [#18044](https://github.com/ant-design/ant-design/pull/18044)
- 🐞 Fix `Form.Item` label replace regexp. [#17985](https://github.com/ant-design/ant-design/pull/17985) [@shaodahong](https://github.com/shaodahong)
- 🐞 Fix Select search style. [#17760](https://github.com/ant-design/ant-design/pull/17760) [@chenyizhongx](https://github.com/chenyizhongx)
- 🐞 Fix DatePicker style bug when `mode` is decade. [#17887](https://github.com/ant-design/ant-design/pull/17887) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 Fix wave effect performance of Button and other related component. [#17945](https://github.com/ant-design/ant-design/pull/17945)
- 🐞 Fix Tabs `tabBarExtraContent` align issue. [#17969](https://github.com/ant-design/ant-design/pull/17969)
- 🐞 Fix Tabs error when `type` is `editable-card` and child component is false. [#17965](https://github.com/ant-design/ant-design/pull/17965) [@oldturkey](https://github.com/oldturkey)
- 🐞 Fix Input align issue of `clearIcon` and `suffix` again. [#17684](https://github.com/ant-design/ant-design/pull/17684) [@LilyWakana](https://github.com/LilyWakana)
- 🐞 Remove `a` tag in Alert's close tag. [#17872](https://github.com/ant-design/ant-design/pull/17872) [@geograous](https://github.com/geograous)
- 💄 Unified drawer and modal `mask` opacity. [#17943](https://github.com/ant-design/ant-design/pull/17943)
- 💄 Optimize RangePicker focus style. [#17983](https://github.com/ant-design/ant-design/pull/17983)
- 💄 Tag now will be rendered as a `span`. [#17971](https://github.com/ant-design/ant-design/pull/17971)
- 💄 Enhance accessibility of Table expanded icon. [#17781](https://github.com/ant-design/ant-design/pull/17781)
- 💄 Merge LocaleProvider into ConfigProvider. [#17816](https://github.com/ant-design/ant-design/pull/17816)
- 💄 Add some less variables. [#17976](https://github.com/ant-design/ant-design/pull/17976) [@Yangzhedi](https://github.com/Yangzhedi) [#17613](https://github.com/ant-design/ant-design/pull/17613) [@alxkosov](https://github.com/alxkosov):
  - `@table-footer-bg`
  - `@table-footer-color`
  - `@menu-icon-size`
  - `@menu-icon-size-lg`
- 🇲🇾 Add locale Malay. [#17546](https://github.com/ant-design/ant-design/pull/17546) [@austin-krave](https://github.com/austin-krave)
- 🇸🇪 Add Swedish translation for Typography (Text) component. [#17858](https://github.com/ant-design/ant-design/pull/17858) [@Malven](https://github.com/Malven)
- 🇫🇷 Add French translation for Typography (Text) component. [#17418](https://github.com/ant-design/ant-design/pull/17418) [@Clafouti](https://github.com/Clafouti)
- 🏴 Add Tamil spanish translations. [#17903](https://github.com/ant-design/ant-design/pull/17903) [@sivaraj-dev](https://github.com/sivaraj-dev)
- TypeScript
  - 🐞 Fix DatePicker `onChange` type definition. [#17955](https://github.com/ant-design/ant-design/pull/17955) [@haimrait](https://github.com/haimrait)

## 3.20.7

`2019-07-26`

- 🐞 Fix Upload can not click in Form.Item. [#17897](https://github.com/ant-design/ant-design/pull/17897)

## 3.20.6

`2019-07-24`

- 🐞 Fix Col miss the place when its height is 0. [#17748](https://github.com/ant-design/ant-design/pull/17748) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Cascader was broken when `options`'s `children` is `null`. [#17756](https://github.com/ant-design/ant-design/pull/17756)
- 🐞 Fix Checkbox padding where all spans align left. [#17752](https://github.com/ant-design/ant-design/pull/17752) [#17761](https://github.com/ant-design/ant-design/pull/17761) [@inovux](https://github.com/inovux)
- 🐞 Fix Input line height style bug in IE. [#17759](https://github.com/ant-design/ant-design/pull/17759)
- 🐞 Fix last item of Rate has additional margin. [#17764](https://github.com/ant-design/ant-design/pull/17764) [@inovux](https://github.com/inovux)
- 🐞 Fix Radio.Button disabled item border style. [#17775](https://github.com/ant-design/ant-design/pull/17775)
- 🐞 Fix DatePicker `@input-hover-border-color` variables not working. [#17784](https://github.com/ant-design/ant-design/pull/17784)
- 🐞 Fix Transfer not re-render list when `dataSource` with `lazy`. [#17783](https://github.com/ant-design/ant-design/pull/17783)
- 🐞 Fix RangePicker `defaultValue` startTime later than endTime. [#17694](https://github.com/ant-design/ant-design/pull/17694) [@mraiguo](https://github.com/mraiguo)
- 💄 Tweak long `placeholder` truncate style. [#17797](https://github.com/ant-design/ant-design/pull/17797) [@Kapiroska](https://github.com/Kapiroska)
- 🐞 Fix Menu circular dependencies. [#17805](https://github.com/ant-design/ant-design/pull/17805) [@phthhieu](https://github.com/phthhieu)
- 🐞 Fix Alert `message` style. [#17808](https://github.com/ant-design/ant-design/pull/17808) [@mtadams007](https://github.com/mtadams007)
- 🐞 Fix Result `extra` is not centered. [#17786](https://github.com/ant-design/ant-design/pull/17786) [@nnecec](https://github.com/nnecec)
- 🐞 Fix Progress with mini `value` not keeps bar radius round. [#17819](https://github.com/ant-design/ant-design/pull/17819)
- 🐞 Fix Statistic.Countdown `format` not escaping characters in square brackets. [#17841](https://github.com/ant-design/ant-design/pull/17841)
- 🐞 Fix Table custom `filterDropdown` always triggering `onChange` in some situations. [#17846](https://github.com/ant-design/ant-design/pull/17846)
- 🐞 Fix TimePicker weird render bug in Safari. [#17857](https://github.com/ant-design/ant-design/pull/17857)

## 3.20.5

`2019-07-19`

- 🐞 Fix `<Button type="danger" ghost />` broken style. [#17743](https://github.com/ant-design/ant-design/pull/17743)

## 3.20.4

`2019-07-19`

- 🐞 Fix multiple level Drawer with falsy `mask`, parent Drawer can not collapse after removing sub component. [#17698](https://github.com/ant-design/ant-design/pull/17698)
- 🐞 Fix Table border radius missing in Firefox. [#17641](https://github.com/ant-design/ant-design/pull/17641)
- 🐞 Fix Menu throw warning `Cannot update during an existing state transition`. [#17657](https://github.com/ant-design/ant-design/pull/17657)
- 🐞 Fix Affix not resize when container size changed. [#17678](https://github.com/ant-design/ant-design/pull/17678)
- 🐞 Fix Anchor not update bind element when `getContainer` changed. [#17677](https://github.com/ant-design/ant-design/pull/17677)
- 🐞 Fix window scroll issue when using Modal and Drawer same time. [#17600](https://github.com/ant-design/ant-design/pull/17600)
- 🌟 Empty `description` supports `false`. [#17659](https://github.com/ant-design/ant-design/pull/17659) [@billfeller](https://github.com/billfeller)
- 💄 Remove Pagination element underline style to avoid polluted by global style. [#17728](https://github.com/ant-design/ant-design/pull/17728)
- 💄 Extends Card action click area. [#17705](https://github.com/ant-design/ant-design/pull/17705) [@lhx6538665](https://github.com/lhx6538665)
- 💄 Tweak less variables and UI to improve style customization. [#17705](https://github.com/ant-design/ant-design/pull/17705)

  - Optimize danger Button UI design.

    <img width="103" class="markdown-inline-image" alt="image" src="https://user-images.githubusercontent.com/507615/61370809-e37aa480-a8c5-11e9-98b3-51ce06dfba24.png">

  - Fix `@border-radius-sm` not working for Slider, TreeSelect.
  - Added some less variables for Progress, Tabs, Slider and Timeline.

- TypeScript
  - 💄 Improve type definition of Form. [#17676](https://github.com/ant-design/ant-design/pull/17676) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
  - 💄 Improve type definition of Tabs. [#17675](https://github.com/ant-design/ant-design/pull/17675)

## 3.20.3

`2019-07-15`

- 🚨 Revert change of Input suffix style in [#17508](https://github.com/ant-design/ant-design/pull/17508), since it introduced other problems

## 3.20.2

`2019-07-13`

- 📖 Add version description for every features. [#17373](https://github.com/ant-design/ant-design/pull/17373) [@muzea](https://github.com/muzea)
- 🐞 Fix Button transition style when loading. [#17596](https://github.com/ant-design/ant-design/pull/17596) [@LilyWakana](https://github.com/LilyWakana)
- Cascader
  - 🐞 Fix not display `notFoundContent` when options.length is 0. [#17538](https://github.com/ant-design/ant-design/pull/17538)
  - 🐞 Fix option's loading not aligned when `isLeaf` is true. [#17550](https://github.com/ant-design/ant-design/pull/17550)
  - 🐞 Fix over-length text covered by arrow. [#17583](https://github.com/ant-design/ant-design/pull/17583)
- 🐞 Fix Input style when suffix and clear icon exist both. [#17508](https://github.com/ant-design/ant-design/pull/17508) [@LilyWakana](https://github.com/LilyWakana)
- TypeScript
  - 💄 Improve type definition of Cascader's option. [#17581](https://github.com/ant-design/ant-design/pull/17581) [@MrHeer](https://github.com/MrHeer)
  - 🐞 Fix type definition of Descriptions.title. [#17559](https://github.com/ant-design/ant-design/pull/17559)
  - 🐞 Fix type definition of Collapse.activeKey, Collapse.defaultActiveKey and CollapsePanel.key. [#17557](https://github.com/ant-design/ant-design/pull/17557) [@thylsky](https://github.com/thylsky)

## 3.20.1

- 💄 Optimize TimePicker focus style. [#17447](https://github.com/ant-design/ant-design/pull/17447)
- 💄 Optimize DatePicker arrow style for resolve messy when not use utf-8. [#17480](https://github.com/ant-design/ant-design/pull/17480)
- 🐞 Remove useless props which Drawer pass to rc-drawer for avoid error. [#17390](https://github.com/ant-design/ant-design/pull/17390)
- 🐞 Fix Tabs disabled tab and next icon style. [#17500](https://github.com/ant-design/ant-design/pull/17500)
- 🐞 Fix Result's problem that the `className` is empty and the class name is wrong. [#17389](https://github.com/ant-design/ant-design/pull/17389)
- 🐞 Fix DatePicker's input box is obscured on safari. [#17421](https://github.com/ant-design/ant-design/pull/17421)
- 🐞 Fix typo icon name `colum-height` to `column-height`. [#17458](https://github.com/ant-design/ant-design/pull/17458)
- TypeScript
  - 🐞 Fix Form `onSubmit` type. [#17412](https://github.com/ant-design/ant-design/pull/17412)
  - 🐞 Fix omit AutoComplete `loading` type. [#17433](https://github.com/ant-design/ant-design/pull/17433)
  - 🐞 Fix Switch `onClick` type. [#17502](https://github.com/ant-design/ant-design/pull/17502) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.20.0

- 🔥🔥🔥 Add [Result](https://ant.design/components/result) Used to feed back the results of a series of operational tasks.
- 🔥 Descriptions support vertical layout. [#17330](https://github.com/ant-design/ant-design/pull/17330) [@hengkx](https://github.com/hengkx)
- 🔥 Progress.Circle support gradient line color. [#17315](https://github.com/ant-design/ant-design/pull/17315) [@hengkx](https://github.com/hengkx)

  <img class="markdown-inline-image" src="https://gw.alipayobjects.com/zos/antfincdn/WogwW6kA4O/method-draw-image.svg" alt="Progress">

- 🔥 Optimize PageHeader className naming. [#17321](https://github.com/ant-design/ant-design/pull/17321)
- 🐞 Drawer fixes `maskCloseble` to false, keyboard ESC closes invalid. [#17316](https://github.com/ant-design/ant-design/pull/17316)
- 🐞 Fixed an issue where Drawer closes not calling `afterVisibleChange` in Edge. [#17311](https://github.com/ant-design/ant-design/pull/17311)
- 🌟 Drawer adds `keyboard` to allow opening and closing of responses to keyboard events. [#17316](https://github.com/ant-design/ant-design/pull/17316)
- 🌟 Popconfirm adds the `disabled` props to control whether the click child element pops up. [#16985](https://github.com/ant-design/ant-design/pull/16985) [@lhyt](https://github.com/lhyt)
- ⌨️ Improve TimePicker accessibility. [#17099](https://github.com/ant-design/ant-design/pull/17099)
- 💄 Fix Tooltip arrow shadow style. [#17264](https://github.com/ant-design/ant-design/pull/17264)
- 🐞 Fix Descriptions.Item not support `className`. [#17280](https://github.com/ant-design/ant-design/pull/17280)
- 🐞 Fixing Descriptions.Item does not set a label and will also display the `:` question. [#17337](https://github.com/ant-design/ant-design/pull/17337)
- 🐞 Fixed the incorrect color of the `placeholder` of the Mentions. [#17317](https://github.com/ant-design/ant-design/pull/17317)
- 🐞 Fixed incorrect line-height for Mentions. [#17347](https://github.com/ant-design/ant-design/pull/17347)
- 💄 Fixed small Table header background to white according to design spec. [#17351](https://github.com/ant-design/ant-design/pull/17351)
- 🌟 The CheckboxGroup`onChange` value keeps the order of the options. [#17342](https://github.com/ant-design/ant-design/pull/17342) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Tooltip not work correctly on disabled Switch. [#17372](https://github.com/ant-design/ant-design/pull/17372)
- 💄 Add variables [#16843](https://github.com/ant-design/ant-design/pull/16843) [#17031](https://github.com/ant-design/ant-design/pull/17031) [#16996](https://github.com/ant-design/ant-design/pull/16996) [@alxkosov](https://github.com/alxkosov):
  - `@dropdown-line-height`
  - `@dropdown-font-size`
  - `@dropdown-vertical-padding`
  - `@collapse-panel-border-radius`
  - `@table-body-selected-sort-bg`
  - `@table-selected-row-hover-bg`
- TypeScript
  - 🌟 Improve the type definition of the Switch. [#17331](https://github.com/ant-design/ant-design/pull/17331)
  - 🐞 Skeleton AvatarProps `size` supports number. [#17331](https://github.com/ant-design/ant-design/pull/17331)
- 📝 Updated several documents. [#17336](https://github.com/ant-design/ant-design/pull/17336) [#17345](https://github.com/ant-design/ant-design/pull/17345) [#17355](https://github.com/ant-design/ant-design/pull/17355)

## 3.19.8

`2019-06-24`

- 🐞 Revert `unknown` to `any` for now to avoid introducing tones of errors in one time. [#17249](https://github.com/ant-design/ant-design/issues/17249)

## 3.19.7

`2019-06-21`

- 🐞 Fix Descriptions throw error when contains falsy child. [#17207](https://github.com/ant-design/ant-design/pull/17207) [@superandrew213](http://github.com/superandrew213)
- 🐞 Fix a scrollbar style problem of empty Table in IE. [#17223](https://github.com/ant-design/ant-design/pull/17223)
- 🐞 Fix single Breadcrumb not showing on PageHeader. [#17209](https://github.com/ant-design/ant-design/pull/17209)
- 🐞 Fix Modal that 24px botton area cannot trigger mask click event. [#17229](https://github.com/ant-design/ant-design/pull/17229)
- 🐞 Fix Layout Sider‘s zero-width trigger `z-index` bug. [#17228](https://github.com/ant-design/ant-design/pull/17228)
- TypeScript
  - ⚡️ Use the `unknown` type in typescript 3.0 to improve defintions. [#14044](https://github.com/ant-design/ant-design/issues/14044) [@Zzzen](http://github.com/Zzzen)
  - 🐞 Fix Calendar `headerRender` should be optional. [#17063](https://github.com/ant-design/ant-design/pull/17063) [@wonderjar](http://github.com/wonderjar)

## 3.19.6

`2019-06-19`

- 🐞 Fix nest Card `extra` position not correct. [#17140](https://github.com/ant-design/ant-design/pull/17140)
- 🐞 Fix Table crash while `filter` dynamic change. [#17141](https://github.com/ant-design/ant-design/pull/17141)
- 🐞 Fix TextArea & DatePicker separator position too low and align issue. [#17165](https://github.com/ant-design/ant-design/pull/17165)

## 3.19.5

`2019-06-17`

- 🐞 Fix RangerPicker input style not align. [#17126](https://github.com/ant-design/ant-design/issues/17126)
- 🐞 Fix `getPopupContainer` of ConfigProvider not works on Modal. [#17132](https://github.com/ant-design/ant-design/issues/17132)
- TypeScript
  - 🐞 Fix Descriptions.Item definition. [#17049](https://github.com/ant-design/ant-design/pull/17049)

## 3.19.4

`2019-06-16`

- PageHeader
  - 🐞 Fix abnormal margin issue of PageHeader `extra`. [#17025](https://github.com/ant-design/ant-design/issues/17025)
  - 🐞 Fix the `onBack` button displays a pointer that is not always clickable. [#17114](https://github.com/ant-design/ant-design/pull/17114)
- 🐞 Fix Table with sort not back to first page. [#16978](https://github.com/ant-design/ant-design/issues/16978)
- 🐞 Fix Menu.SubMenu with selected item should have active style. [#17039](https://github.com/ant-design/ant-design/pull/17039)
- 🐞 Fix Tree with showLine animation shake. [#17055](https://github.com/ant-design/ant-design/pull/17055)
- 🐞 Fix Collapse's redundant scrollbar. [#17009](https://github.com/ant-design/ant-design/pull/17009) [#mtadams007](https://github.com/mtadams007)
- 🐞 Fixing date formats for Arabic-Egypt locale. [#17092](https://github.com/ant-design/ant-design/pull/17092) [#3b3ziz](https://github.com/3b3ziz)
- 🐞 Fix Input not align with other components in Chrome. [#17082](https://github.com/ant-design/ant-design/issues/17082)
- 💄 Adjust bordered table header scrollbar style. [#17065](https://github.com/ant-design/ant-design/pull/17065)
- 🌟 Make Divider style customization easier. [#17113](https://github.com/ant-design/ant-design/pull/17113)
- 🇷🇺 Add missing Russian translations. [#17108](https://github.com/ant-design/ant-design/pull/17108) [#Enfield1](https://github.com/Enfield1)
- 🌟 Add new less variables [#17041](https://github.com/ant-design/ant-design/pull/17041) [#SamKirkland](https://github.com/SamKirkland)：
  - `@comment-font-size-base`
  - `@comment-font-size-sm`

## 3.19.3

`2019-06-06`

- 📝 Add FAQ for DatePicker/RangePicker with `mode` cannot be selected. [#16984](https://github.com/ant-design/ant-design/pull/16984)
- 🐞 Fix Breadcrumb validateDOMNesting warning. [#16929](https://github.com/ant-design/ant-design/pull/16929)
- 🐞 Fix Breadcrumb path error when `children` is selected. [#16885](https://github.com/ant-design/ant-design/pull/16885) [@haianweifeng](https://github.com/haianweifeng)
- 🐞 Fix InputNumber with `number` type display native spinner. [#16926](https://github.com/ant-design/ant-design/pull/16926)
- 🐞 Fix Transfer render Empty when customize without data. [#16925](https://github.com/ant-design/ant-design/pull/16925)
- 🐞 **Fix Table header extra vertical scrollbar problem.** [#16950](https://github.com/ant-design/ant-design/pull/16950)
- 🐞 Fix Table miss `border-radius` in Firefox. [#16957](https://github.com/ant-design/ant-design/pull/16957)
- 🐞 Fix Table error when `rowSelection.getCheckboxProps()` has no return value. [#15224](https://github.com/ant-design/ant-design/pull/15224)
- 🐞 Fix Table abnormal scrollbar in Chrome when using `title` and `rowSelection`. [#16934](https://github.com/ant-design/ant-design/pull/16934)
- 🐞 Fix Divider `orientation="center"` style. [#16988](https://github.com/ant-design/ant-design/pull/16988)
- 🐞 Fix Cascader error when type space. [#16918](https://github.com/ant-design/ant-design/pull/16918) [@Durisvk](https://github.com/Durisvk)
- 🐞 Fix missing spanish translations. [#17002](https://github.com/ant-design/ant-design/pull/17002) [@morellan](https://github.com/morellan)
- TypeScript
  - 🐞 Fix Upload `RcFile` definition. [#16851](https://github.com/ant-design/ant-design/pull/16851)
  - ⚡️ Export `TextProps` type in Typography. [#17003](https://github.com/ant-design/ant-design/pull/17003) [@Jarvis1010](https://github.com/Jarvis1010)

## 3.19.2

`2019-06-01`

- 🐞 Fix Tabs vertical card mode not scrollable. [#16825](https://github.com/ant-design/ant-design/pull/16825)
- 🐞 Fix Transfer warn `setStart` on an unmounted component. [#16822](https://github.com/ant-design/ant-design/pull/16822) [@shiningjason](https://github.com/shiningjason)
- 💄 Using less variables `@error-color`, `@warning-color` instead of `@text-color-danger`, `@text-color-warning`. [#16890](https://github.com/ant-design/ant-design/pull/16890) [@MrHeer](https://github.com/MrHeer)
- 💄 Add warning if Menu use `inlineCollapsed` under Sider. [#16826](https://github.com/ant-design/ant-design/pull/16826)
- TypeScript
  - ⚡️ Add `forceSubmenuRender` into MenuProps. [#16827](https://github.com/ant-design/ant-design/pull/16827)
  - ⚡️ Export `TypographyProps` type. [#16835](https://github.com/ant-design/ant-design/pull/16835)
  - ⚡️ Add `onChange` prop type definition to Steps. [#16845](https://github.com/ant-design/ant-design/pull/16845) [@JonathanLee-LX](https://github.com/JonathanLee-LX)
  - ⚡️ Add `webkitRelativePath` prop type definition to Upload. [#16850](https://github.com/ant-design/ant-design/pull/16850) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.19.1

`2019-05-27`

- 🐞 Fix Tooltip not hidden when Menu collapsed in control mode. [#16812](https://github.com/ant-design/ant-design/pull/16812)
- 🐞 Fix Description warning with column count not correct. [#16819](https://github.com/ant-design/ant-design/pull/16819)
- 🐞 Correct typo icon names `canlendar` / `interation` to `calendar` / `interaction`. [#16818](https://github.com/ant-design/ant-design/pull/16818)
- TypeScript
  - ⚡️ Fix Mentions definition. [#16814](https://github.com/ant-design/ant-design/pull/16814)
  - ⚡️ Update Select `onSelect` & `onDeselect` prop definition. [#16817](https://github.com/ant-design/ant-design/pull/16817)

## 3.19.0

`2019-05-26`

- New Components:
  - 🔥🔥🔥 [Mentions](https://ant.design/components/mentions-cn/) Provides Mentions component and origin Mention marked as deprecated.
  - 🔥🔥🔥 [Descriptions](https://ant.design/components/descriptions-cn/) Display multiple read-only fields in groups.
- 🇱🇻 Add Latvian localization support. [#16780](https://github.com/ant-design/ant-design/pull/16780) [@kirbo](https://github.com/kirbo)
- 🌟 Drawer support close by press `ESC`. [#16694](https://github.com/ant-design/ant-design/pull/16694)
- 🌟 Steps support click to switch. [#16773](https://github.com/ant-design/ant-design/pull/16773)
- 🌟 Calendar support `headerRender` to customize header。[#16535](https://github.com/ant-design/ant-design/pull/16535) [@abgaryanharutyun](https://github.com/abgaryanharutyun)
- 🌟 Slider support `tooltipPlacement` to set tooltip position. [#16641](https://github.com/ant-design/ant-design/pull/16641) [@cmaster11](https://github.com/cmaster11)
- 🌟 Slider support `getTooltipPopupContainer` to customize tooltip container. [#16717](https://github.com/ant-design/ant-design/pull/16717)
- 🐞 Fix PageHeader horizontal divider style. [#16684](https://github.com/ant-design/ant-design/pull/16684)
- 🐞 Fix Carousel `initialSlide` not work when `children` count change. [#16756](https://github.com/ant-design/ant-design/pull/16756)
- 🐞 Fix Cascader `displayRender` not interactive. [#16782](https://github.com/ant-design/ant-design/pull/16782)
- 🐞 Fix Upload list still can be removed when `disabled`. [#16786](https://github.com/ant-design/ant-design/pull/16786)
- 💄 Update Upload `disabled` cursor style. [#16799](https://github.com/ant-design/ant-design/pull/16799) [@attacking](https://github.com/attacking)
- 💄 Correct Statistic font color. [#16801](https://github.com/ant-design/ant-design/pull/16801)
- TypeScript
  - ⚡️ Update Upload `action` prop definition. [#16716](https://github.com/ant-design/ant-design/pull/16716) [@christophehurpeau](https://github.com/christophehurpeau)
  - ⚡️ Update Upload `onRemove` prop definition. [#16570](https://github.com/ant-design/ant-design/pull/16570) [@christophehurpeau](https://github.com/christophehurpeau)
  - ⚡️ Update Select `getPopupContainer` prop definition. [#16778](https://github.com/ant-design/ant-design/pull/16778) [@chj-damon](https://github.com/chj-damon)
  - ⚡️ Update InputNumber `parse` prop definition. [#16797](https://github.com/ant-design/ant-design/pull/16797)
  - ⚡️ Remove useless props definition. [#16705](https://github.com/ant-design/ant-design/pull/16705) [@sirlantis](https://github.com/sirlantis)

## 3.18.2

`2019-05-20`

- 🐞 Fix space missing for Button with mixed content. [#15342](https://github.com/ant-design/ant-design/issues/15342)
- 🐞 Fix active status missing for Carousel when `children` is changed. [#16583](https://github.com/ant-design/ant-design/issues/16583)
- 🐞 Fix panel not close when DatePicker is `blur` by upgrading `rc-calendar` requirement to version `9.13.3`. [#16588](https://github.com/ant-design/ant-design/issues/16588)
- 🐞 Fix style disorder for Form.Item with `help` prop and `margin-bottom` is negative. [#16584](https://github.com/ant-design/ant-design/pull/16584) [@sbusch](https://github.com/sbusch)
- 🐞 Fix Spin not align when set `font-size` style. [#15206](https://github.com/ant-design/ant-design/issues/15206)
- 🐞 Fix `selectedRows` missing when there is `childrenColumnName` in Table. [#16614](https://github.com/ant-design/ant-design/issues/16614)
- TypeScript
  - ⚡️ Improve the definition of `children` prop for Breadcrumb. [#16550](https://github.com/ant-design/ant-design/pull/16550) [@Gin-X](https://github.com/Gin-X)
  - ⚡️ Improve the definition of `onFieldsChange` params for Form. [#16577](https://github.com/ant-design/ant-design/pull/16577) [@SylvanasGone](https://github.com/SylvanasGone)
  - ⚡️ Improve the definition of `dataSource` and `renderItem` for List. [#16587](https://github.com/ant-design/ant-design/issues/16587)
  - ⚡️ Improve the definition of `onDragEnter` params for Tree. [#16638](https://github.com/ant-design/ant-design/pull/16638) [@eruca](https://github.com/eruca)
  - ⚡️ Improve the definition of `event` for Tree。[#16624](https://github.com/ant-design/ant-design/pull/16624) [@ztplz](https://github.com/ztplz)

## 3.18.1

`2019-05-13`

- 🐞 Remove useless `module.export` of package. [#antd-tools](https://github.com/ant-design/antd-tools/commit/b9e230c91551af5b4555f672130b14304ff58357)

## 3.18.0

`2019-05-12`

- 🌟 Transfer support `children` prop to customize render list. [#16026](https://github.com/ant-design/ant-design/pull/16026)
- 🌟 Pagination support `disabled` prop. [#16493](https://github.com/ant-design/ant-design/pull/16493)
- 🌟 Upgrade `@ant-design/icons` and `@ant-design/icons-react` to 2.0 for fix lots of missing icons. [#15874](https://github.com/ant-design/ant-design/pull/15874)
- 🐞 Fix Form `hasFeedback` overlap issue with Input.Password. [#16445](https://github.com/ant-design/ant-design/pull/16445)
- 🐞 Fix Select selected and disabled item wrong hover color. [#16477](https://github.com/ant-design/ant-design/pull/16477)
- 🐞 Fix disabled Upload being triggered by label. [#16483](https://github.com/ant-design/ant-design/pull/16483)
- 🐞 Fix `hoist-non-react-statics` compilation error. [#16397](https://github.com/ant-design/ant-design/pull/16397) [@ztplz](https://github.com/ztplz)
- 🐞 Fix customize icon style in Notification size not correct. [#16507](https://github.com/ant-design/ant-design/pull/16507)
- 🐞 Fix PageHeader should not render blank dom when `title` is undefined. [#16510](https://github.com/ant-design/ant-design/pull/16510) [@yociduo](https://github.com/yociduo)
- ⚡️ Print reject error when Modal's `onOk` callback return an promise rejects. [#16437](https://github.com/ant-design/ant-design/pull/16437) [@jas0ncn](https://github.com/jas0ncn)
- TypeScript
  - ⚡️ Improve Table column.filterDropdown type. [#16446](https://github.com/ant-design/ant-design/pull/16446)
  - ⚡️ Add Select missing type definition `maxTagTextLength`. [#16504](https://github.com/ant-design/ant-design/pull/16504) [@SylvanasGone](https://github.com/SylvanasGone)
  - ⚡️ Improve return type of `getFieldError` in Form. [#16524](https://github.com/ant-design/ant-design/pull/16524) [@vicrep](https://github.com/vicrep)
  - 🐞 Fix List missing style prop definition. [#16485](https://github.com/ant-design/ant-design/pull/16485)

## 3.17.0

`2019-05-05`

- 🎉 Breadcrumb.Item supports `overlay` props to define drop-down menus. [#16315](https://github.com/ant-design/ant-design/pull/16315)
- 🎉 Button added a new type `link`. [#16289](https://github.com/ant-design/ant-design/pull/16289)
- ⌨️ Wrap List.Item under `ul` to enhance accessibility.[#15890](https://github.com/ant-design/ant-design/pull/15890)
- 🌟 TreeSelect support `showSearch` in multiple mode. [#15933](https://github.com/ant-design/ant-design/pull/15933)
- 🌟 Provides `previewFile` to customize preview logic. [#15984](https://github.com/ant-design/ant-design/pull/15984)
- 🌟 Added the `@table-selected-row-color` variable to customize the color selected by the table. [#15971](https://github.com/ant-design/ant-design/pull/15971) [@hextion](https://github.com/hextion)
- 🌟 Added `@form-warning-input-bg` and `@form-error-input-bg` variables to customize the background color when the form is in error state. [#15954](https://github.com/ant-design/ant-design/pull/15954) [@hextion](https://github.com/hextion)
- 🌟 Dropdown.Button supports `icon` props to customize icons. [#15996](https://github.com/ant-design/ant-design/pull/15996) [@DiamondYuan](https://github.com/DiamondYuan)
- 🌟 Support SkeletonAvatarProps `size` accept number. [#16128](https://github.com/ant-design/ant-design/pull/16128) [@MrHeer](https://github.com/MrHeer)
- 🌟 Notification.config now supports `getContainer` for custom dom rendering locations. [#16123](https://github.com/ant-design/ant-design/pull/16123) [@Nouzbe](https://github.com/Nouzbe)
- 🌟 Drawer supports `afterVisibleChange` props, which fires when the drawer animation is complete. [#16228](https://github.com/ant-design/ant-design/pull/16228)
- 🌟 Form.Item supports `htmlFor` props. [#16278](https://github.com/ant-design/ant-design/pull/16278)
- 🌟 Collapse supports `expandIconPosition` props. [#16365](https://github.com/ant-design/ant-design/pull/16365)
- 🌟 Carousel supports the location of custom panel indicator points. [#16225](https://github.com/ant-design/ant-design/pull/16225) [@yociduo](https://github.com/yociduo)
- 🌟 TreeNode supports the properties of `checkable`. [#16369](https://github.com/ant-design/ant-design/pull/16369)
- 🌟 🇭🇷 Added Croatian language pack. [#15641](https://github.com/ant-design/ant-design/pull/15641) [@fpintaric](https://github.com/fpintaric)
- 🐞 Fix Drawer wrong animation direction. [#16358](https://github.com/ant-design/ant-design/pull/16358)
- 🐞 Fix Slider mark text style will break line. [#15128](https://github.com/ant-design/ant-design/pull/15128)
- 🐞 Fix Checkbox.Group `onChange` pass removed value. [#16392](https://github.com/ant-design/ant-design/pull/16392)
- 🐞 Fixed multiple Typescript type errors. [#16043](https://github.com/ant-design/ant-design/pull/16043) [#16341](https://github.com/ant-design/ant-design/pull/16341) [#16343](https://github.com/ant-design/ant-design/pull/16343) [#16360](https://github.com/ant-design/ant-design/pull/16360) [#16344](https://github.com/ant-design/ant-design/pull/16344)

## 3.16.6

`2019-04-26`

- ⌨️ Improve PageHeader `backIcon` keyboard accessibility. [#16038](https://github.com/ant-design/ant-design/issues/16038)
- 🇮🇹 Optimize Italian localization. [#16093](https://github.com/ant-design/ant-design/pull/16093) [@yp](https://github.com/yp) [#16172](https://github.com/ant-design/ant-design/pull/16172) [@afelicioni](https://github.com/afelicioni)
- 🐞 Fix Select with `showSearch` not trigger `onSearch` when blur it. [#16235](https://github.com/ant-design/ant-design/pull/16235)
- 🐞 Fix Select active item's hover background color. [#16238](https://github.com/ant-design/ant-design/pull/16238) [@yociduo](https://github.com/yociduo)
- 🐞 Fix unexpected pressed style of disabled Switch. [#16251](https://github.com/ant-design/ant-design/pull/16251) [@atomoo](https://github.com/atomoo)
- 🐞 Fix small size Table header background. [#16266](https://github.com/ant-design/ant-design/pull/16266)
- 🐞 Fix Tabs missing border when `tabPosition="bottom"`. [#16130](https://github.com/ant-design/ant-design/pull/16130) [@rinick](https://github.com/rinick)
- 🐞 Fix Typography.Title not support `type`. [#16275](https://github.com/ant-design/ant-design/pull/16275)
- 🐞 Fix Typography editable mode not support `className`. [#16307](https://github.com/ant-design/ant-design/pull/16307)
- 🐞 Fix List `actions` misplaced. [#16239](https://github.com/ant-design/ant-design/pull/16239)
- 🐞 Fix long word Modal title display problem. [#16267](https://github.com/ant-design/ant-design/pull/16267) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix Pagination active item background color. [#16306](https://github.com/ant-design/ant-design/pull/16306)
- 🐞 Fix a `core-js@<2.6.5 is no longer maintained` install warning. [#16325](https://github.com/ant-design/ant-design/issues/16325)
- Typescript
  - 🐞 Fix `Form.create()` don't work. [#16242](https://github.com/ant-design/ant-design/pull/16242)
  - 🐞 Fix Tooltip `className` definition. [#16195](https://github.com/ant-design/ant-design/pull/16195) [@swillis12](https://github.com/swillis12)

## 3.16.5

`2019-04-22`

- 🐞 Fix Table in Firefox miss bottom line when sorter enabled. [#16174](https://github.com/ant-design/ant-design/pull/16174)
- 🐞 Fix List crash when `pagination` is `null`. [#16231](https://github.com/ant-design/ant-design/pull/16231)
- TypeScript
  - 🐞 Fix typescript `hoist-non-react-statics` has no default export warning with `allowSyntheticDefaultImports: false`. [#16224](https://github.com/ant-design/ant-design/pull/16224)

## 3.16.4

`2019-04-21`

- 🐞 Fix circle button responding mouse event when loading. [#16063](https://github.com/ant-design/ant-design/pull/16063) [@gxvv](https://github.com/gxvv)
- 🐞 Fix issue that Form.Item's `labelAlign` does not work. [#16067](https://github.com/ant-design/ant-design/issues/16067)
- 🐞 Fix issue that tailing debounce call raising error when Spin unmount. [#16081](https://github.com/ant-design/ant-design/pull/16081) [@raybooysen](https://github.com/raybooysen)
- 🐞 Fix issue that List's `defaultPageSize` does not work. [#16100](https://github.com/ant-design/ant-design/issues/16100)
- 🐞 Fix error moment call in DatePicker. [#16109](https://github.com/ant-design/ant-design/issues/16109)
- 🐞 Fix Radio does not in center on Firefox. [#16039](https://github.com/ant-design/ant-design/issues/16039)
- 🐞 Fix issue that Affix's `target` does not work after it's value changing. [#16146](https://github.com/ant-design/ant-design/pull/16146)
- 🐞 Fix the Modal's animation issue Modal on first rendering. [#15795](https://github.com/ant-design/ant-design/issues/15795)
- 🐞 Fix issue that Table's `rowSelection.columnWidth` does not work. [#16163](https://github.com/ant-design/ant-design/issues/16163)
- 🐞 Fix type definition of Form.create. [#16095](https://github.com/ant-design/ant-design/issues/16095)
- 🐞 Fix type definition of Icon's `aria-hidden`. [#16202](https://github.com/ant-design/ant-design/pull/16202)
- 🐞 Fix type definition of PageHeader's `tags`. [#16092](https://github.com/ant-design/ant-design/issues/16092)
- 🌟 Add new less variable `@text-selection-bg;`. [#16155](https://github.com/ant-design/ant-design/pull/16155)

## 3.16.3

`2019-04-12`

- 🐞 **Fix Button TypeScript definition.** [#15938](https://github.com/ant-design/ant-design/pull/15938)
- ⚠️ Add DatePicker warning when time invalidate. [#15920](https://github.com/ant-design/ant-design/pull/15920)
- 🐞 Fix Menu arrow not display in old version of IE. [#15932](https://github.com/ant-design/ant-design/pull/15932)
- 🐞 Fix Progress success UI when `status` is `undefined`. [#15951](https://github.com/ant-design/ant-design/pull/15951)
- 🐞 Fix Tooltips not work when Menu collapsed. [#15948](https://github.com/ant-design/ant-design/pull/15948)
- 🐞 Fix Switch can't be trigger by click of form label. [#15923](https://github.com/ant-design/ant-design/pull/15923)
- 🐞 Fix Directory `onSelect` info not correct. [#15967](https://github.com/ant-design/ant-design/pull/15967)
- 🐞 Fix Menu `defaultOpenKeys` not work as expect. [#15970](https://github.com/ant-design/ant-design/pull/15970)
- 🐞 Fix Nested Table with `middle` `size` style not correct. [#16008](https://github.com/ant-design/ant-design/pull/16008)
- 🐞 Fix nest Tabs ink bar style issue. [#16013](https://github.com/ant-design/ant-design/pull/16013)
- 🐞 Fix Empty in IE not fully render. [#16016](https://github.com/ant-design/ant-design/pull/16016)
- 🐞 Fix Switcher loading icon and checkbox should be vertical align when `@tree-title-height` is modified. [#15962](https://github.com/ant-design/ant-design/pull/15962)
- 💄 Default selection column width can be overridden in css. [#15990](https://github.com/ant-design/ant-design/pull/15990)
- TypeScript
  - 🐞 Fix Pagination `showLessItems` TS definition. [#15952](https://github.com/ant-design/ant-design/pull/15952)

## 3.16.2

`2019-04-07`

- 🐞 Fix Menu shaking and collapse behavior. [#15868](https://github.com/ant-design/ant-design/pull/15868)
- 🐞 Fix List pagination pageSize changer not work. [#15871](https://github.com/ant-design/ant-design/pull/15871)
- 🐞 Fix RangePicker end time input not editable. [#15866](https://github.com/ant-design/ant-design/pull/15866)
- 📝 Site [Icon](https://ant.design/components/icon/) supports search. [#15867](https://github.com/ant-design/ant-design/pull/15867) [@DiamondYuan](https://github.com/DiamondYuan)
- 🐞 Fix TimePicker `locale` doesn't work. [#15837](https://github.com/ant-design/ant-design/pull/15837)
- 🐞 Fix Steps style broken when using `progressDot` and `size="small"`. [#15856](https://github.com/ant-design/ant-design/pull/15856)
- 🐞 Fix Affix position not update when content height changed. [#15899](https://github.com/ant-design/ant-design/pull/15899)
- Table
  - 🐞 Fix Table `align: right` not work on title when sorting is enabled. [#15895](https://github.com/ant-design/ant-design/pull/15895)
  - 🐞 Fix Table filter display issue when use non-string type. [#15817](https://github.com/ant-design/ant-design/pull/15817)
- 🐞 Fix Badge display negative count incorrect. [#15810](https://github.com/ant-design/ant-design/pull/15810)
- 💄 Optimize Empty default UI of `Empty.PRESENTED_IMAGE_SIMPLE`. [#15841](https://github.com/ant-design/ant-design/pull/15841)
- 🌟 Added a new less variable `@html-selector` to enable override of html selector to support theme prefix. [#15613](https://github.com/ant-design/ant-design/pull/15613) [@krokofant](https://github.com/krokofant)
- TypeScript
  - 🐞 Fix Table columnGroup definition. [fc45d](https://github.com/ant-design/ant-design/commit/fc45d7003efab225298bbc7ac740df40d34872d1)

## 3.16.1

`2019-04-01`

- 🐞 Fix `antd.less` file missing. [#15790](https://github.com/ant-design/ant-design/issues/15790)

## 3.16.0

`2019-04-01`

- 🌟 Badge support customize color. [#15764](https://github.com/ant-design/ant-design/pull/15764)
- 🌟 Checkbox.Group support `name` prop. [#15760](https://github.com/ant-design/ant-design/pull/15760) [@bencallaway](https://github.com/bencallaway)
- 🌟 Modal support `confirm({ icon: null })` to hide Icon. [#15319](https://github.com/ant-design/ant-design/pull/15319) [@Adamwu1992](https://github.com/Adamwu1992)
- Empty
  - 🌟 Support `imageStyle` prop. [#15487](https://github.com/ant-design/ant-design/pull/15487)
  - 🌟 Support `Empty.PRESENTED_IMAGE_DEFAULT` and `Empty.PRESENTED_IMAGE_SIMPLE` for default image. [#15487](https://github.com/ant-design/ant-design/pull/15487)
- 🌟 Progress.Line support gradient line color. [#15524](https://github.com/ant-design/ant-design/pull/15524) [@zy410419243](https://github.com/zy410419243)
- DatePicker
  - 🌟 Update `rc-calendar` to support default value can be null. [#520](https://github.com/react-component/calendar/pull/520)
  - 🐞 Fix disabled and selected date cell style of DatePicker. [#15608](https://github.com/ant-design/ant-design/pull/15608)
  - 🐞 Fix RangePicker can not select same month. [#15427](https://github.com/ant-design/ant-design/pull/15427)
- ⚡️ Refactor Form move `ant-form-item-no-colon` selector position in Form.Item. [#15592](https://github.com/ant-design/ant-design/pull/15592) [@HsuanXyz](https://github.com/HsuanXyz)
- Menu
  - 🐞 Fix Menu unexpected shaking when collapsed. [#15625](https://github.com/ant-design/ant-design/pull/15625) [@zy410419243](https://github.com/zy410419243)
  - 🐞 Fix MenuItem rendered unexpected Tooltip when `inlineCollapsed` is `false`. [#15705](https://github.com/ant-design/ant-design/pull/15705) [@zy410419243](https://github.com/zy410419243)
- 🐞 Fix Upload border jumping issue in Chrome. [#15636](https://github.com/ant-design/ant-design/pull/15636)
- 🐞 Fix clear icon style in Input and Input.Search. [#15672](https://github.com/ant-design/ant-design/pull/15672)
- 🐞 PageHeader support level 2 breadcrumb. [#15689](https://github.com/ant-design/ant-design/pull/15689)
- Tag
  - 🐞 Revert Tag wrap style to fix display in table. [#15690](https://github.com/ant-design/ant-design/pull/15690)
  - 💄 Remove Tag animation. [#15233](https://github.com/ant-design/ant-design/pull/15233)
- 🐞 Fix Spin style when `indicator` is Icon. [#15712](https://github.com/ant-design/ant-design/pull/15712)
- 🐞 Fix collapsible Layout.Sider throw error when use svg icon. [#15720](https://github.com/ant-design/ant-design/pull/15720) [@wx1322](https://github.com/wx1322)
- 💄 Remove underlines from focused links. [#15759](https://github.com/ant-design/ant-design/pull/15759) [@Nouzbe](https://github.com/Nouzbe)
- Table
  - 💄 Move Table sort button after title closely. [#15758](https://github.com/ant-design/ant-design/pull/15758)
  - 💄 Fix components covered by Table fixed columns. [#15782](https://github.com/ant-design/ant-design/pull/15782)
- 🐞 Fix col element missing relative style. [#15766](https://github.com/ant-design/ant-design/pull/15766)
- 💄 Adjust Card and PageHeader padding from `32px` to `24px`. [#15755](https://github.com/ant-design/ant-design/pull/15755)
- 🌟 Add less variables
  - 🌟 Button add `@btn-border-width` and `@btn-border-style`. [#15397](https://github.com/ant-design/ant-design/pull/15397) [@searleb](https://github.com/searleb)
  - 🌟 Modal add `@modal-body-padding` and `@modal-footer-bg`. [#15476](https://github.com/ant-design/ant-design/pull/15476) [#15469](https://github.com/ant-design/ant-design/pull/15469) [@shumkovdenis](https://github.com/shumkovdenis)
  - 🌟 Radio add `@radio-button-checked-bg`. [#15541](https://github.com/ant-design/ant-design/pull/15541) [@willc001](https://github.com/willc001)
- 🌟 Adjust multiple TypeScript types
  - 🐞 **Fix for changes in `@types/react` for Button.** [#15702](https://github.com/ant-design/ant-design/pull/15702) [@ferdikoomen](https://github.com/ferdikoomen)
  - 🌟 Menu add `overflowedIndicator` type. [#15355](https://github.com/ant-design/ant-design/pull/15459) [@Yangzhedi](https://github.com/Yangzhedi)
  - 🐞 Fix Input `action` definition. [#15598](https://github.com/ant-design/ant-design/pull/15598) [@Yangzhedi](https://github.com/Yangzhedi)
  - 🐞 Fix Tree `onLoad` typo. [#15718](https://github.com/ant-design/ant-design/pull/15718) [@babycannotsay](https://github.com/babycannotsay)
  - 🌟 CheckBox.Group add `name` type. [#15753](https://github.com/ant-design/ant-design/pull/15753)
  - 🌟 RangePicker add `separator` type. [#15765](https://github.com/ant-design/ant-design/pull/15765)

## 3.15.2

`2019-03-23`

- 📖 New English translation for [Data Display](https://ant.design/docs/spec/data-display) and [Feedback](https://ant.design/docs/spec/feedback). [#15454](https://github.com/ant-design/ant-design/pull/15454) [@klouskingsley](https://github.com/klouskingsley) [#15460](https://github.com/ant-design/ant-design/pull/15460) [@klouskingsley](https://github.com/klouskingsley)
- 🌟 Add two less variables `@font-feature-settings` and `@select-item-selected-font-weight`. [#15506](https://github.com/ant-design/ant-design/pull/15506) [@dancerphil](https://github.com/dancerphil) [#15515](https://github.com/ant-design/ant-design/pull/15515) [@willc001](https://github.com/willc001)
- 🐞 Fix the scale calculate logic when Avatar is remounted. [#15503](https://github.com/ant-design/ant-design/pull/15503)
- 🐞 Fix inefficient custom `width` for DatePicker. [#15547](https://github.com/ant-design/ant-design/pull/15547) [@DiamondYuan](https://github.com/DiamondYuan)
- 🐞 Fix the incorrect priority of icon style for Notification. [#15530](https://github.com/ant-design/ant-design/pull/15530)
- 🐞 Fix that `notFound` content is not aligned for Select. [#15570](https://github.com/ant-design/ant-design/pull/15570)
- 🐞 Fix empty missing when `loading` property is true for Table. [#15583](https://github.com/ant-design/ant-design/pull/15583)
- 🐞 Fix the incorrect `white-space` style for Tag. [#15526](https://github.com/ant-design/ant-design/pull/15526) [@Kapiroska](https://github.com/Kapiroska)
- 🐞 Fix the incorrect judgement on image type for Upload. [#15354](https://github.com/ant-design/ant-design/pull/15354)

## 3.15.1

`2019-03-17`

- 🌟 Add four less variables `@pagination-item-bg-active`, `@icon-color`. [#15302](https://github.com/ant-design/ant-design/pull/15302) [#15343](https://github.com/ant-design/ant-design/issues/15343)
- 🐞 Fix tree-shaking not working for importing PageHeader. [#15354](https://github.com/ant-design/ant-design/pull/15354)
- List
  - 🐞 Fix some List Item styling issues. [#15328](https://github.com/ant-design/ant-design/pull/15328)
  - 🐞 Keep same content color of List like previous version. [#15301](https://github.com/ant-design/ant-design/pull/15301)
- 🐞 Fix Calendar can't switch type. [#15338](https://github.com/ant-design/ant-design/pull/15338) [@zy410419243](https://github.com/zy410419243)
- Badge
  - 🐞 Fix the issue that customized color is not supported in Badge. [#15356](https://github.com/ant-design/ant-design/pull/15356) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🐞 Fix height problem of Badge with dot. [#15395](https://github.com/ant-design/ant-design/pull/15395)
- 🐞 Fix tabbar style of Tabs in card mode when browser is zoomed out. [#15299](https://github.com/ant-design/ant-design/pull/15299) [@rinick](https://github.com/rinick)
- 🐞 Fix Avatar component cannot calculate the offset when `display: none` is set. [#15351](https://github.com/ant-design/ant-design/pull/15351) [@ppbl](https://github.com/ppbl)
- 🐞 Correct suffix icon in Input.Password. [#15381](https://github.com/ant-design/ant-design/pull/15381) [@melchior-voidwolf](https://github.com/melchior-voidwolf)
- 🐞 Fix Layout has classname `ant-layout-has-sider` even if `hasFixer` is set to `false`. [#15396](https://github.com/ant-design/ant-design/pull/15396) [@SoraYama](https://github.com/SoraYama)
- 🐞 Fix Divider alignment issue in PageHeader. [#15400](https://github.com/ant-design/ant-design/pull/15400)
- 🐞 Fix a style issue of Skeleton. [#15421](https://github.com/ant-design/ant-design/pull/15421) [@Maktel](https://github.com/Maktel)
- 🌟 Adjust multiple TypeScript types
  - 🌟 FormComponentProps added a generic type of form values. [#15355](https://github.com/ant-design/ant-design/pull/15355)
  - 🌟 Export ConfigProviderProps interface. [#15446](https://github.com/ant-design/ant-design/pull/15446) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🐞 Add `onClick` prop for Breadcrumb.Item. [#15331](https://github.com/ant-design/ant-design/pull/15331) [@tgxpuisb](https://github.com/tgxpuisb)
  - 🐞 Add `style` prop for Steps.Step component. [#15393](https://github.com/ant-design/ant-design/pull/15393) [@pavolgolias](https://github.com/pavolgolias)
  - 🐞 Fix `itemRender` definition of Pagination. [#15428](https://github.com/ant-design/ant-design/pull/15428) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.15.0

`2019-03-08`

- 🌟 Tree supports new prop `blockNode`. [#14858](https://github.com/ant-design/ant-design/pull/14858) [@kimochg](https://github.com/kimochg)
- Form
  - 🌟 Supports `colon` prop in Form. [#15276](https://github.com/ant-design/ant-design/pull/15276) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🌟 Add new prop `labelAlign`. [#15252](https://github.com/ant-design/ant-design/pull/15252) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fix two colons will appear in FormItem label. [15285](https://github.com/ant-design/ant-design/pull/15285) [@jinxin0112](https://github.com/jinxin0112)
- 🐞 Fix Typography dom structure. [#15210](https://github.com/ant-design/ant-design/pull/15210)
- 🐞 Fix Affix position update logic. [#15150](https://github.com/ant-design/ant-design/pull/15150)
- Input
  - 🐞 Fix Password lost focus when change `visibilityToggle`. [#15184](https://github.com/ant-design/ant-design/pull/15184)
  - 🐞 Fix `allowClear` do not focus after clear content. [#15184](https://github.com/ant-design/ant-design/pull/15184)
  - 🐞 Fix Search style with `allowClear` or `suffix`/`prefix`. [#15242](https://github.com/ant-design/ant-design/pull/15242)
  - 🐞 Fix Input warning logic for focus lose. [#15251](https://github.com/ant-design/ant-design/pull/15251)
- 🐞 Fix DatePicker and TimePicker cursor style. [#15218](https://github.com/ant-design/ant-design/pull/15218)
- 🐞 Fix Steps label text not align center. [#15256](https://github.com/ant-design/ant-design/pull/15256) [@yoyo837](https://github.com/yoyo837)
- TypeScript
  - ⚡️ Refactor and simplify List Item dom structure, and fix spaces lost inside List Item. [#15197](https://github.com/ant-design/ant-design/pull/15197)
  - 🐞 Fix Layout `tagName` definition. [#15181](https://github.com/ant-design/ant-design/pull/15181) [@ngolin](https://github.com/ngolin)
  - 🐞 Fix Text `ellipsis` definition. [#15209](https://github.com/ant-design/ant-design/pull/15209) [@xiaohuoni](https://github.com/xiaohuoni)
  - 🐞 Fix Badge `text` types. [#15264](https://github.com/ant-design/ant-design/pull/15264)
- 🇹🇷 Turkish translations of new components. [#15238](https://github.com/ant-design/ant-design/pull/15238) [@codesignist](https://github.com/codesignist)

## 3.14.1

`2019-03-04`

- 🌟 PageHeader support `className` prop. [#15159](https://github.com/ant-design/ant-design/pull/15159)
- 🐞 Fix Form warning with unique key & additional attributes. [#15160](https://github.com/ant-design/ant-design/pull/15160)
- 🐞 Fix `getPopupContainer` of ConfigProvider not work with DatePicker. [#15156](https://github.com/ant-design/ant-design/pull/15156)
- 🐞 Fix Collapse `extra` node style missing. [#15176](https://github.com/ant-design/ant-design/pull/15176)

## 3.14.0

`2019-03-02`

- Two new components added this month:
  - 🔥🔥🔥[Typography](https://ant.design/components/typography/) provides basic formatting and common operations for text.
  - 🔥🔥🔥[PageHeader](https://ant.design/components/page-header/) can be used to declare the page theme, display important information about the page that the user is interested in, and host the relevant page. Action item.
- 🌟 TimePicker provides `clearIcon` prop for customizing clear icon. [#14556](https://github.com/ant-design/ant-design/pull/14556)
- 🌟 Statistic.Countdown supports `onFinish` prop. [#14791](https://github.com/ant-design/ant-design/pull/14791)
- 🌟 Collapse.Panel support `extra` prop. [62e65d](https://github.com/ant-design/ant-design/commit/62e65d955065b1862240f9f30d84de44349a0cf9)
- DatePicker
  - 🐞 Fix not support name prop. [#15029](https://github.com/ant-design/ant-design/pull/15029)
  - 🌟 Supports `separator` prop. [#15055](https://github.com/ant-design/ant-design/pull/15055)
- 🌟 The Form supports `labelCol` & `wrapperCol` prop. [#15038](https://github.com/ant-design/ant-design/pull/15038)
- 🌟 Add type `more` for Icon. [#15047](https://github.com/ant-design/ant-design/pull/15047)
- 🐞 Fix Table filter can not support other type of value. [#15046](https://github.com/ant-design/ant-design/pull/15046)
- 🐞 Fix Spin `wrapperClassName` setting `padding` icon is not centered. [#15056](https://github.com/ant-design/ant-design/pull/15056)
- 🐞 Fix Calendar won't trigger `onPanelChange` correctly in some cases. [#15063](https://github.com/ant-design/ant-design/pull/15063)
- 🌟 Select supports `showArrow` in multi-select mode. [#15091](https://github.com/ant-design/ant-design/pull/15091)
- 🐞 Fix closable Drawer hiding without transition. [#15147](https://github.com/ant-design/ant-design/pull/15147)
- 🌟 Two less variables `@drawer-header-padding` and `@drawer-body-padding` have been added to control Drawer padding. [#15120](https://github.com/ant-design/ant-design/pull/15120)
- 🐞 Fix Cascader should tab twice to exist. [#15117](https://github.com/ant-design/ant-design/pull/15117)
- 🐞 The `onChange` of InputNumber will return `null` instead of `undefined` to fix the problem that the value of the control cannot be properly collected and emptied. [#14960](https://github.com/ant-design/ant-design/pull/14960)
- 🌟 Adjusted multiple TypeScript types
  - 🐞 Fixed a problem with the `onPanelChange` TypeScript declaration missing. [#15043](https://github.com/ant-design/ant-design/pull/15043)
  - 🐞 Fix the TypeScript type problem for Table `Column Filter`. [#15056](https://github.com/ant-design/ant-design/pull/15056)
  - 🌟 Support goto button in Pagination. [#14819](https://github.com/ant-design/ant-design/pull/14819)
  - 🐞 Fix the problem that Carousel response prop TypeScript declaration is missing. [#15071](https://github.com/ant-design/ant-design/pull/15071)

## 3.13.6

`2019-02-23`

- Form
  - 🐞 Use new method to repair align issue of Form.Item with validate message. [#14946](https://github.com/ant-design/ant-design/issues/14946)
  - 🐞 Improved warning message logic of generating Form.Item `help` and `validateStatus`. [#14911](https://github.com/ant-design/ant-design/issues/14911)
- 🐞 Fixed extra space at the bottom of Table header in chrome. [#14926](https://github.com/ant-design/ant-design/issues/14926)
- 🐞 Fixed that Select check icon is not aligned center. [#15016](https://github.com/ant-design/ant-design/issues/15016)
- 🐞 Fixed Input.Search `addonBefore` or `addonAfter` style issue. [#14959](https://github.com/ant-design/ant-design/issues/14959)
- 🐞 Fixed growing space of Tree nodes. [#14958](https://github.com/ant-design/ant-design/issues/14958) [@Yangzhedi](https://github.com/Yangzhedi)
- 🐞 Improved accessibility of Icon when `type` is falsy. [#14970](https://github.com/ant-design/ant-design/issues/14970)
- 🐞 Fixed Dropdown subMenu disabled cursor style. [#14952](https://github.com/ant-design/ant-design/issues/14952)
- 🇮🇩 Updated locale to be more natural for Indonesian. [#15013](https://github.com/ant-design/ant-design/issues/15013) [@kamalmahmudi](https://github.com/kamalmahmudi)

## 3.13.5

`2019-02-19`

- 🐞 Revert FormItem with additional place holder. [#14937](https://github.com/ant-design/ant-design/pull/14937)
- 🐞 Adjust Input style to support `text-align: inherit`. [#14912](https://github.com/ant-design/ant-design/pull/14912)
- 🐞 Fix incorrect collapse icon position when Sider in the right. [#14446](https://github.com/ant-design/ant-design/pull/14446)
- 🐞 Fix Table miss top border in some case. [#14922](https://github.com/ant-design/ant-design/pull/14922)
- 🐞 Fix some TypeScript definitions. [#14857](https://github.com/ant-design/ant-design/pull/14857) [#14903](https://github.com/ant-design/ant-design/pull/14903)

## 3.13.4

`2019-02-18`

- 🐞 Fix Table ajax load display no data. [#14898](https://github.com/ant-design/ant-design/pull/14898)
- 🐞 Fix FormItem margin style not correct. [#14886](https://github.com/ant-design/ant-design/pull/14886)

## 3.13.3

`2019-02-16`

- 📖 New English translation
  - [Motion](https://ant.design/docs/spec/motion) [@balloonio](https://github.com/balloonio)
  - [Data Entry](https://ant.design/docs/spec/data-entry) [@balloonio](https://github.com/balloonio)
- 🐞 Fix mouse cursor style when Switch is disabled. [#14764](https://github.com/ant-design/ant-design/issues/14764)
- 🐞 Fix Progress shows a wrong successful status. [#14769](https://github.com/ant-design/ant-design/pull/14769) [@imhele](https://github.com/imhele)
- 🐞 Fix the issue that the upload status has always been `uploading` after hiding the upload button in the Upload. [#14779](https://github.com/ant-design/ant-design/issues/14779)
- 🐞 Fix the issue where the custom icons for vertical Steps were not centered. [#14677](https://github.com/ant-design/ant-design/issues/14677)
- 🐞 Fix the issue with Input.Search does not support `addonAfter`. [#14785](https://github.com/ant-design/ant-design/issues/14785)
- 🐞 Fix layout issues with FormItem when there is an error. [#14772](https://github.com/ant-design/ant-design/issues/14772)
- 🐞 Fix the issue that the operation button will be blocked when the Card is `loading`. [#14832](https://github.com/ant-design/ant-design/issues/14832)
- 🐞 Fix the issue that describes overflow in List. [#14765](https://github.com/ant-design/ant-design/pull/14765) [@Shub1427](https://github.com/ant-design/ant-design/pull/14765)
- 🐞 Fix the style issue of TimePicker's clear button, when using the `small` size. [#14861](https://github.com/ant-design/ant-design/pull/14861) [@Yangzhedi](https://github.com/Yangzhedi)
- Table
  - 🐞 Fix the issue that the floating element misalignment. [#14822](https://github.com/ant-design/ant-design/pull/14822) [@chiaweilee](https://github.com/ant-design/ant-design/pull/14822)
  - 🐞 Fix the issue where the className was not synchronized when the `rowSelection` property was removed. [#14759](https://github.com/ant-design/ant-design/issues/14759)
  - 🐞 Fix border display issue when there is no data. [#14834](https://github.com/ant-design/ant-design/issues/14834)
  - 🐞 Fix the issue where `pagination` was set to `true`.
  - 🐞 Fix the issue where the filter drop-down box would be occluded.
- TypeScript
  - 🐞 Checkbox adds `onClick`. [#14762](https://github.com/ant-design/ant-design/pull/14762) [@Frezc](https://github.com/Frezc)
  - 🐞 Menu adds `onTitleMouseEnter` and `onTitleMouseLeave`. [#14737](https://github.com/ant-design/ant-design/pull/14737) [#GabeMedrash](https://github.com/ant-design/ant-design/pull/14737)

## 3.13.2

`2019-02-07`

- 🐞 Fix Table ajax render only display data on first page. [#14724](https://github.com/ant-design/ant-design/pull/14724) [@imhele](https://github.com/imhele)
- 🐞 Adjust font style to fix display issue in IE. [#14708](https://github.com/ant-design/ant-design/pull/14708) [@ashearer](https://github.com/ashearer)
- 🐞 Fix Input not hide clear button when value is `null`. [#14733](https://github.com/ant-design/ant-design/pull/14733) [@thilo-behnke](https://github.com/thilo-behnke)

## 3.13.1

`2019-02-04`

- 📝 Rewrite the documentation of [Use in TypeScript](https://ant.design/docs/react/use-in-typescript). [#14637](https://github.com/ant-design/ant-design/pull/14637)
- 📝 Upgrade the document of [Real project with umi and dva](https://ant.design/docs/react/practical-projects). [#14574](https://github.com/ant-design/ant-design/pull/14574) [@cc189](https://github.com/cc189)
- 🐞 Fix Spin style issue in IE 10. [#14588](https://github.com/ant-design/ant-design/pull/14588) [#14365](https://github.com/ant-design/ant-design/issues/14365)
- 🐞 Fix DatePicker missing dateTime default format in `showTime`. [#14593](https://github.com/ant-design/ant-design/pull/14593)
- 🐞 Fix List style issue in IE 11. [#14602](https://github.com/ant-design/ant-design/pull/14602) [@Shub1427](https://github.com/Shub1427)
- Table
  - 🐞 Fix pagination when its data length is less than or equal to pageSize. [#14608](https://github.com/ant-design/ant-design/pull/14608) [@sdli](https://github.com/sdli)
  - 🐞 Fix selection being wrap unexpectedly. [#14619](https://github.com/ant-design/ant-design/pull/14619) [#14316](https://github.com/ant-design/ant-design/issues/14316)
  - 🐞 Fix `placeholder` border style issue when Table is empty. [#14533](https://github.com/ant-design/ant-design/pull/14533) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fix Table should pick `pageSize` over `defaultPageSize` in priority. [#14696](https://github.com/ant-design/ant-design/pull/14696) [#14320](https://github.com/ant-design/ant-design/issues/14320)
- Upload
  - 🐞 Fix `fileIndex` is not present in IE 11. [#14603](https://github.com/ant-design/ant-design/pull/14603) [@Shub1427](https://github.com/Shub1427)
  - 🐞 Fix when being triggered by label even upload button don't display. [#14619](https://github.com/ant-design/ant-design/pull/14619) [#14298](https://github.com/ant-design/ant-design/issues/14298)
- 🐞 Fix Dropdown pseudo class style which causes the overlay non-clickable. [#14604](https://github.com/ant-design/ant-design/pull/14604) [@shawtung](https://github.com/shawtung)
- 💄 Improve Checkbox the style for check don't align center in some cases. [#14619](https://github.com/ant-design/ant-design/pull/14619) [#14271](https://github.com/ant-design/ant-design/issues/14271)
- 🐞 Fix Avatar change `src` not trigger reload if previous image load failed. [#14606](https://github.com/ant-design/ant-design/pull/14606) [@AhmedAlSammany](https://github.com/AhmedAlSammany)
- 🐞 Fix Modal `destroy` logic not process correctly. [#14600](https://github.com/ant-design/ant-design/pull/14600) [@xu-snow](https://github.com/xu-snow)
- 🐞 Fix Tooltip arrow not align when the content of `title` is less. [#14667](https://github.com/ant-design/ant-design/pull/14667) [@Yangzhedi](https://github.com/Yangzhedi)
- Calendar
  - 🐞 Fix Tweak calendar select width for IE9. [#14464](https://github.com/ant-design/ant-design/issues/14464) [#14669](https://github.com/ant-design/ant-design/pull/14669)
  - 🐞 Fix margin in calendar select. [#14636](https://github.com/ant-design/ant-design/issues/14636) [#14669](https://github.com/ant-design/ant-design/pull/14669)
- 🐞 Fix AutoComplete `placeholder` not display when disabled. [#14652](https://github.com/ant-design/ant-design/pull/14652) [@tangjinzhou](https://github.com/tangjinzhou)
- 🐞 Fix Icon customize svg Icon miss viewBox. [#14686](https://github.com/ant-design/ant-design/pull/14686)
- 🐞 Fix Statistic not support negative number. [#14695](https://github.com/ant-design/ant-design/pull/14695) [#14692](https://github.com/ant-design/ant-design/issues/14692)
- Less
  - 🌟 Enable monospaced for OpenType font, reduce the font animation shake. [56ac0](https://github.com/ant-design/ant-design/commit/56ac01610f600b3c2d62c33fa87e99156f114ccf)
  - 🐞 Corrected typo `@dawer-prfix-cls` to `@drawer-prfix-cls`. [#14631](https://github.com/ant-design/ant-design/pull/14631)
  - 🐞 Fix animation in Dropdown SubMenu. [#14703](https://github.com/ant-design/ant-design/pull/14703) [#14638](https://github.com/ant-design/ant-design/issues/14638)
- 🐞 Fix some TypeScript definitions. [#14584](https://github.com/ant-design/ant-design/pull/14584) [@boraikizoglu](https://github.com/boraikizoglu), [#14591](https://github.com/ant-design/ant-design/pull/14591), [#14640](https://github.com/ant-design/ant-design/pull/14640) [@SylvanasGone](https://github.com/SylvanasGone), [#14654](https://github.com/ant-design/ant-design/pull/14654) [@kuitos](https://github.com/kuitos), [#12667](https://github.com/ant-design/ant-design/pull/12667) [@yueyes](https://github.com/yueyes), [#14653](https://github.com/ant-design/ant-design/pull/14653), [#14676](https://github.com/ant-design/ant-design/pull/14676) [@kristof0425](https://github.com/kristof0425), [#14684](https://github.com/ant-design/ant-design/pull/14684) [@RunningCoderLee](https://github.com/RunningCoderLee)

## 3.13.0

`2019-01-26`

- 🎉 **New component [Statistic](https://ant.design/components/statistic)**. [#14154](https://github.com/ant-design/ant-design/pull/14154)
- Button
  - 🌟 Button support `round` shape. [#14236](https://github.com/ant-design/ant-design/pull/14236)
- Collapse
  - 🌟 Add `expandIcon` to allow customization of Collapse icon. [#14060](https://github.com/ant-design/ant-design/pull/14060)
- ConfigProvider
  - 🌟 Support Content Security Policy (CSP) config. [#14222](https://github.com/ant-design/ant-design/pull/14222)
  - 🌟 Support `autoInsertSpaceInButton` to remove space between 2 Chinese characters on Button. [#14230](https://github.com/ant-design/ant-design/pull/14230)
- DatePicker
  - 🌟 Will read format as default format in locale if provided. [#14340](https://github.com/ant-design/ant-design/pull/14340)
- Tabs
  - 🌟 Support customize bar node. [#14368](https://github.com/ant-design/ant-design/pull/14368)
- Icon
  - 🌟 Icon component add `aria-label` prop to enhance accessibility. [#14258](https://github.com/ant-design/ant-design/pull/14258)
  - 🌟 Add `rotate` to allow icon rotate as specified degrees. [#14060](https://github.com/ant-design/ant-design/pull/14060)
- Badge
  - 🐞 Fix changing the count with `border-color` will raises an property readonly error. [#14525](https://github.com/ant-design/ant-design/pull/14525)
- Modal
  - 🌟 Add `mask` property support for Modal method. [#14197](https://github.com/ant-design/ant-design/pull/14197)
  - 🌟 Add `transitionName` and `maskTransitionName` property support for Modal method. [#14273](https://github.com/ant-design/ant-design/pull/14273) [@thomasJang](https://github.com/thomasJang)
- Input
  - 🐞 Fix Input.Search style issue. Move `className` from inner input to top wrapper when with `addon`. [#14461](https://github.com/ant-design/ant-design/pull/14461)
- TimePicker
  - 🌟 Deprecated `allowEmpty` prop and use `allowClear` instead. Sync style with DatePicker. [#14490](https://github.com/ant-design/ant-design/pull/14490)
- Radio
  - 🐞 Fix RadioButton trigger onChange twice in RadioGroup. [#14523](https://github.com/ant-design/ant-design/pull/14523)
- Spin
  - 🐞 Fix Table cannot click with loading when IE <= 10. [#14511](https://github.com/ant-design/ant-design/pull/14511)
- Switch
  - 🌟 Switch support `event` as `onChange`, `onClick` argument. [#14560](https://github.com/ant-design/ant-design/pull/14560)
- Table
  - 🐞 Fix style issue when use fixed column in Safari. [#14550](https://github.com/ant-design/ant-design/pull/14550)
- Progress
  - 🌟 All types support `successPercent` prop. [#14412](https://github.com/ant-design/ant-design/pull/14412)
- Pagination
  - 🐞 Fix ellipsis misalignment. [#14473](https://github.com/ant-design/ant-design/pull/14473) [@ranbena](https://github.com/ranbena)
- 🐞 Fix wave style issue in Edge. [#14469](https://github.com/ant-design/ant-design/pull/14469)

## 3.12.4

`2019-01-19`

- 🌟 Update the "Use in create-react-app" document to be compatible with upgraded create-react-app and react-scripts-rewired. [#14385](https://github.com/ant-design/ant-design/pull/14385)
- 🐞 Fix using autoprefixer 9.4.5 in postcss (webpack) will throw an error `Replace text-decoration-skip: ink to text-decoration-skip-ink: auto, because spec had been changed`. [#14312](https://github.com/ant-design/ant-design/pull/14312)
- 🐞 Fix InputNumber style not correct in MenuItem. [#14373](https://github.com/ant-design/ant-design/pull/14373)
- 🐞 Fix Input.Search with enterButton style issue. [#14397](https://github.com/ant-design/ant-design/pull/14397)
- 🐞 Fix Input.TextArea autosize not correct when input number. [#14375](https://github.com/ant-design/ant-design/pull/14375)
- 🐞 Fix Slider focus style. [9202509](https://github.com/ant-design/ant-design/commit/92025095032a05b2bc347218b523ffd42f75a607)
- 🐞 Fix the problem that the `prefixCls` property is passed to the `Empty` . [#14404](https://github.com/ant-design/ant-design/pull/14404)
- 🐞 Fix the problem that Radio `onChange` will be override by RadioGroup `onChange`.[#14364](https://github.com/ant-design/ant-design/pull/14364)

## 3.12.3

`2019-01-13`

- 🐞 Reverted [#14157](https://github.com/ant-design/ant-design/pull/14157) to fix Input `prefix` and `suffix` missing problem. [#14310](https://github.com/ant-design/ant-design/issues/14310)
- 🐞 Fixed Empty `image` TypeScript type to ReactNode. [#14308](https://github.com/ant-design/ant-design/issues/14308) [@chunlea](https://github.com/chunlea)

## 3.12.2

`2019-01-12`

- 🐞 Fix the ineffectiveness of `className` prop for Anchor.Link. [#14248](https://github.com/ant-design/ant-design/pull/14248)
- 🐞 Fix the incompatibility of float number for Badge. [#14195](https://github.com/ant-design/ant-design/pull/14195) [@ztplz](https://github.com/ztplz)
- 🐞 Fix the auto focus when popup layer is `open` still for DatePicker. [#14092](https://github.com/ant-design/ant-design/pull/14092) [@Yangzhedi](https://github.com/Yangzhedi)
- Drawer
  - 🐞 Fix the empty header when `title` is null for Drawer. [#14264](https://github.com/ant-design/ant-design/pull/14264) [@ztplz](https://github.com/ztplz)
  - 🐞 Fix the ineffectiveness of `bodyStyle` prop for Drawer. [#14294](https://github.com/ant-design/ant-design/pull/14294) [@ztplz](https://github.com/ztplz)
- 🐞 Fix label for vertical Form cannot be wrapped. [#14135](https://github.com/ant-design/ant-design/pull/14135) [@ranbena](https://github.com/ranbena)
- 🐞 Fix the wrong position for Modal.confirm in small screen. [#14279](https://github.com/ant-design/ant-design/issues/14279)
- Radio
  - 🐞 Fix the wrong style for Radio.Button when it is disabled and selected. [#14165](https://github.com/ant-design/ant-design/issues/14165)
  - 💄 Improve the style for focused Radio. [#14186](https://github.com/ant-design/ant-design/issues/14186)
- 🐞 Fix the empty style for Select. [#14204](https://github.com/ant-design/ant-design/issues/14204)
- 💄 Simplify the implementation of Spin to improve performance. [#14100](https://github.com/ant-design/ant-design/issues/14100)
- Table
  - 🐞 Fix the unexpected appearance of sorter `title` for Table. [#14168](https://github.com/ant-design/ant-design/issues/14168)
  - 🐞 Fix the unexpected sorter trigger when click `filterDropdown` for Table. [#14238](https://github.com/ant-design/ant-design/issues/14238)
- 🐞 Fix the unexpected call of `afterClose` for Tag when visible changes from false to true. [#14200](https://github.com/ant-design/ant-design/pull/14200) [@tangjinzhou](https://github.com/tangjinzhou)
- TypeScript
  - 🐞 Fix the TypeScript definition lack of `forceRender` for Modal. [#14160](https://github.com/ant-design/ant-design/issues/14160)
  - 🐞 Fix TypeScript definition of `sortDirections` which should be optional. [#14182](https://github.com/ant-design/ant-design/pull/14182)
  - 🐞 Fix the wrong TypeScript definition of `locale` for Table. [#14245](https://github.com/ant-design/ant-design/pull/14245) [@LeezQ](https://github.com/LeezQ)
  - 🐞 Fix the TypeScript definition not extending from native `div` element for List.Item. [#14171](https://github.com/ant-design/ant-design/issues/14171)
- 🌟 Add new `Less` variables, including `@btn-shadow`, `@btn-primary-shadow` and `@btn-text-shadow`. [#14172](https://github.com/ant-design/ant-design/issues/14172)

## 3.12.1

`2019-01-06`

- 🐞 Fixed build error caused by importing svg.

## 3.12.0

`2019-01-06`

- 🎉 New component [Empty](https://ant.design/components/empty/), and improved empty data style of all components! [13651](https://github.com/ant-design/ant-design/pull/13651)
- 🎉 Hindi locale added (hi_IN). [#13776](https://github.com/ant-design/ant-design/pull/13759) [@gurungrahul2](https://github.com/aashutoshrathi)
- 🎉 Kannada locale added (kn_IN). [#13776](https://github.com/ant-design/ant-design/pull/13776) [@gurungrahul2](https://github.com/gurungrahul2)
- 🌟 Add `eye-invisible` Icon. [b8630b3](https://github.com/ant-design/ant-design/commit/b8630b34556e58af31f51fb42d1299725ddd8219)
- 🌟 ConfigProvider component support prefixCls. [#13389](https://github.com/ant-design/ant-design/pull/13389)
- Less
  - 🌟 Add more less variables for support custom colors definitions of some components. [#13425](https://github.com/ant-design/ant-design/pull/13425) [@amedora](https://github.com/amedora)
  - 🐞 Fixed font-family been reset in each component. [#13969](https://github.com/ant-design/ant-design/issues/13969)
- Input
  - 🌟 Add Input.Password. [#13342](https://github.com/ant-design/ant-design/pull/13342) [@zy410419243](https://github.com/zy410419243)
  - 🌟 Support `allowClear`. [#13939](https://github.com/ant-design/ant-design/pull/13939)
- Modal
  - 🌟 Add `forceRender` support. [f791a50](https://github.com/ant-design/ant-design/commit/f791a50084eda5692635fd373bc2ec4a6b8d98e1)
  - 🌟 Add `destroyAll`. [#13409](https://github.com/ant-design/ant-design/pull/13409) [@caolvchong](https://github.com/caolvchong)
  - 🌟 Add `icon` to Modal.confirm/info/warning/error, `iconType` is deprecated. [5c26635](https://github.com/ant-design/ant-design/commit/5c266355ec84d54d054ba89d35cc9280aef50a6e)
- 🌟 Add `small` type Card component. [#13180](https://github.com/ant-design/ant-design/pull/13180) [@ndbroadbent](https://github.com/ndbroadbent)
- Form
  - 🌟 Add `name` option to `Form.create`. [83b449b](https://github.com/ant-design/ant-design/commit/83b449b1ff00afadde57d96dea457e625509786f)
  - 🌟 FormItem support error message with reactNode. [#13046](https://github.com/ant-design/ant-design/pull/13046)
  - 🌟 Add `preserve` of Form `getFieldDecorator` option. [f65fb28](https://github.com/ant-design/ant-design/commit/f65fb2867f16dbcec40ba97afb8d3682dde93941)
- 🌟 Add `switcherIcon` prop to Tree. [#13592](https://github.com/ant-design/ant-design/pull/13592) [@nick-ChenZe](https://github.com/nick-ChenZe)
- 🌟 Mention add `defaultSuggestion`. [#13695](https://github.com/ant-design/ant-design/pull/13695)
- Dropdown
  - 🌟 Dropdown.Button support `href` prop. [607d080](https://github.com/ant-design/ant-design/commit/607d08094d4c59416c17d49e1ed5e87a166f61f7)
  - 🌟 Add `openClassName`. [c6f267d](https://github.com/ant-design/ant-design/commit/c6f267d740d82ffc3e4f2f2a84cd3b2cc159c595)
  - 🌟 Dropdown `overlay` support function callback. [#14003](https://github.com/ant-design/ant-design/pull/14003)
- Button
  - 🐞 Fixed Button throw error when use a custom type. [#13915](https://github.com/ant-design/ant-design/issues/13915)
  - 🐞 Fixed plus and minus Icon style in Button on Windows. [#13924](https://github.com/ant-design/ant-design/issues/13924)
- Table
  - 🌟 Add prop `sortDirections` for Table and Table.Column. [#13773](https://github.com/ant-design/ant-design/pull/13773) [@elfman](https://github.com/elfman)
  - 🐞 Fixed Badge component display over the fixed table column. [#13930](https://github.com/ant-design/ant-design/issues/13930)
  - 🐞 Fixed rowSelection columnWidth doesn't work. [#14115](https://github.com/ant-design/ant-design/pull/14115) [@dyygtfx](https://github.com/dyygtfx)
- DatePicker
  - 🌟 Add new `renderFooter` API for DatePicker. [3c007a8](https://github.com/ant-design/ant-design/commit/3c007a85dd8a670f66c7e0aed95d3537e25ef6ea)
  - 🐞 Fixed `dateRender` not supported at WeekPicker. [#13957](https://github.com/ant-design/ant-design/issues/13957)
  - 🐞 Fixed disabled button style in DatePicker panel. [#14098](https://github.com/ant-design/ant-design/pull/14098)
  - 🌟 support prop `renderExtraFooter` in all mode. [#13813](https://github.com/ant-design/ant-design/pull/13813) [@elfman](https://github.com/elfman)
  - 🐞 Fixed month range display when start year equals end year. [#14049](https://github.com/ant-design/ant-design/pull/14049) [@meihuanyu](https://github.com/meihuanyu)
- TimePicker
  - 🌟 TimePicker support new prop `popupStyle` and `onAmPmChange`. [833c181](https://github.com/ant-design/ant-design/commit/833c18192247f265b4004afa11a054846c7ba662)
  - 🐞 Fixed TimePicker Icon disappear when used with Input.Group. [#13797](https://github.com/ant-design/ant-design/pull/13797) [@mraiguo](https://github.com/ant-design/ant-design/pull/13797)
- 🌟 Update `rc-tree-select` to 2.5.0 to support use a ReactNode as `notFoundContent` in TreeSelect. [47b89e5](https://github.com/ant-design/ant-design/commit/47b89e56fbedfa07a4c263ca390a78d58132563f)
- 🌟 Rate component support `tooltips`. [192e188](https://github.com/ant-design/ant-design/commit/192e188fe87018ad9d004b9c2002e2b0045fa4b4)
- 🐞 Fixed Drawer prop `style` not working. [#13850](https://github.com/ant-design/ant-design/issues/13850)
- Upload
  - 💄 Add new less var `upload-picture-card-border-style` and Fixed `upload-picture-card-size` typo. [#13919](https://github.com/ant-design/ant-design/pull/13919) [#13929](https://github.com/ant-design/ant-design/pull/13929) [@flexchen](https://github.com/flexchen)
  - 🐞 Fixed `dpg` file type is not recognizable as image in Upload component. [#14013](https://github.com/ant-design/ant-design/pull/14013)
- Popover
  - 🐞 Fixed arrow of Popover shadow. [#13935](https://github.com/ant-design/ant-design/pull/13935) [@crazyurus](https://github.com/crazyurus)
  - 🐞 Fixed Popover top border disappear in IE9. [#14064](https://github.com/ant-design/ant-design/issues/14064) [@gyh9457](https://github.com/gyh9457)
- 🐞 Fixed Radio style bug in Chrome. [#3699](https://github.com/ant-design/ant-design/issues/3699)
- 🐞 Fixed affix Menu flickering when scrolling. [#13662](https://github.com/ant-design/ant-design/issues/13662)
- 🐞 Fixed Steps style issue on IE9. [#14001](https://github.com/ant-design/ant-design/issues/14001)
- 🐞 Fixed nested Timeline last item missing line. [#14108](https://github.com/ant-design/ant-design/pull/14110)
- 🐞 Fixed spin never shows up when delay got initially set. [#14100](https://github.com/ant-design/ant-design/issues/14100)
- Badge
  - 🐞 Fixed animation jump when count is ReactNode. [#13800](https://github.com/ant-design/ant-design/issues/13800)
- TypeScript
  - 🐞 Fixed type define of DatePicker prop `disabledDate`. [#14008](https://github.com/ant-design/ant-design/pull/14008) [@vnguyen94](https://github.com/vnguyen94)
  - 🐞 Fixed Dropdown `onVisibleChange` type define bug. [#13988](https://github.com/ant-design/ant-design/pull/13988) [@travikk](https://github.com/travikk)

## 3.11.6

`2018-12-25`

- 📝 Remove Christmas egg. [#13098](https://github.com/ant-design/ant-design/issues/13098)

## 3.11.5

`2018-12-24`

- 🐞 Fixed `lib` missing css file match. [#13791](https://github.com/ant-design/ant-design/issues/13803)

## 3.11.4

`2018-12-23`

- 🐞 Fixed DependencyNotFoundError `Could not find dependency: '@babel/runtime'`. [#13791](https://github.com/ant-design/ant-design/issues/13791)
- ⚡️ Refactor Tag component with less code and better performance. [b828741](https://github.com/ant-design/ant-design/commit/b828741dc06eaa69ff3f8c76024fd5527ed6d74f)

## 3.11.3 🎅🏻

`2018-12-22`

- ⚡️ Upgrade our toolchains (babel and webpack) to latest version and prettier all codes!
- Table
  - 🐞 **Fixed that dropdown menu action not clickable**. [#13563](https://github.com/ant-design/ant-design/issues/13563)
  - 🐞 Fixed hovering components on Table sortable column. [#13467](https://github.com/ant-design/ant-design/issues/13467)
  - 🐞 Fixed crash issue of selection Table under IE9/10. [#13540](https://github.com/ant-design/ant-design/issues/13540)
  - 🐞 Fixed check-all checkbox state when Table `childrenColumnName` is specified. [#13710](https://github.com/ant-design/ant-design/issues/13710)
  - 💄 Remove work break styles in table cell for consistent behavior. [#13624](https://github.com/ant-design/ant-design/issues/13624)
  - 💄 Rewrote the custom filter demo of Table. [Link](https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel)
- 🐞 Fixed padding of Button which children is `0`. [#13596](https://github.com/ant-design/ant-design/pull/13596) [@951565664](https://github.com/951565664)
- 💄 Chore Card header and loading UI.
- 💄 Optimized Spin wrapper styles and improve performance slightly. [2c7112b](https://github.com/ant-design/ant-design/commit/2c7112be7bf32c6e8362334b86b0799cc3a4a6c4)
- 🐞 Fixed border color of validated Input.Group. [#13529](https://github.com/ant-design/ant-design/issues/13529) [@morenyang](https://github.com/morenyang)
- 🐞 Fixed submenu animation of vertical-type Menu. [#13597](https://github.com/ant-design/ant-design/issues/13597)
- 🐞 Fixed width of WeekPicker. [#13629](https://github.com/ant-design/ant-design/issues/13629)
- 🐞 Fixed cursor style of disabled Radio.Button. [#13642](https://github.com/ant-design/ant-design/pull/13642) [@gianpaj](https://github.com/gianpaj)
- Dropdown
  - 🐞 Fixed slight shift when menu is popped in Chrome. [#12115](https://github.com/ant-design/ant-design/issues/12115) [@gurungrahul2](https://github.com/gurungrahul2)
  - 🐞 Fixed unexpected scrollbar caused by dropdown placed at screen edge. [00564dd](https://github.com/ant-design/ant-design/commit/3aeca7c10ec6ee3441f024fe7fdb5ae9e00564dd)
- 🐞 Fixed `offset` props when Badge `count` is specified as a ReactNode. [#13694](https://github.com/ant-design/ant-design/issues/13694)
- 🐞 Remove nested Form.Item negative margin. [#13748](https://github.com/ant-design/ant-design/issues/13748)
- 📝 Added a Select demo of [Hide Already Selected](https://ant.design/components/select/#components-select-demo-hide-selected). [#13552](https://github.com/ant-design/ant-design/pull/13552) [@SergeyVolynkin](https://github.com/SergeyVolynkin)
- 🐞 Fixed padding of Comment actions. [#13713](https://github.com/ant-design/ant-design/issues/13713)
- 🐞 Fixed broken arrow style when customize Popover's background color. [#13533](https://github.com/ant-design/ant-design/issues/13533) [@gurungrahul2](https://github.com/gurungrahul2)
- 🐞 Corrected Drawer `style` prop to outside wrapper. [#11504](https://github.com/ant-design/ant-design/issues/11504)
- 🐞 Fixed one problem of incorrect state when Affix first mounted. [#13737](https://github.com/ant-design/ant-design/pull/13737) [@xuxinhang](https://github.com/xuxinhang)
- 🐞 Fixed Tabs cursor style of disabled tab. [#13709](https://github.com/ant-design/ant-design/issues/13709)
- 🌟 Added some less variables of [Tabs](https://github.com/ant-design/ant-design/pull/13727), [Table](https://github.com/ant-design/ant-design/pull/13754), [Alert](https://github.com/ant-design/ant-design/pull/13768).
- TypeScript
  - ⚡️ Enhanced Table `ColumnProps` types about `dataIndex`. [#13605](https://github.com/ant-design/ant-design/pull/13605) [@bondBo](https://github.com/bondBo)
  - ⚡️ Enhanced Table `TableRowSelection.onChange` arguments with generic types.[#13761](https://github.com/ant-design/ant-design/issues/13761) [@hahabazinga](https://github.com/hahabazinga)
  - 🐞 Fixed type of LocaleProvider's `children`. [#12974](https://github.com/ant-design/ant-design/issues/12974)
  - 🐞 Fixed type of RangePicker `onOk`'s arguments. [#13650](https://github.com/ant-design/ant-design/pull/13650) [@iugo](https://github.com/iugo)
  - 🐞 Fixed Comment `author` type from string to ReactNode. [#13670](https://github.com/ant-design/ant-design/pull/13670) [@reichjustin](https://github.com/reichjustin)
  - 🐞 Fixed type of Select `dropdownProps`'s arguments. [#13617](https://github.com/ant-design/ant-design/pull/13617) [@SylvanasGone](https://github.com/SylvanasGone)

## 3.11.2

`2018-12-10`

- 🐞 Fixed Table `Cannot read property 'children' of undefined` error when customize `column.title` as ReactNode. [#13542](https://github.com/ant-design/ant-design/issues/13542) [@geraldchen890806](https://github.com/geraldchen890806)
- 🐞 Fixed another border problem of Button when customized less variable `@border-width-base`. [#13534](https://github.com/ant-design/ant-design/issues/13534) [@morenyang](https://github.com/morenyang)
- 🐞 Fixed Upload don't support resolve `Blob` object when `beforeUpload` returns a Promise. [#13528](https://github.com/ant-design/ant-design/pull/13528/) [@huanz](https://github.com/huanz)
- 🐞 Fixed two props of Dropdown TypeScript definitions. [#13536](https://github.com/ant-design/ant-design/pull/13536) [@wangxingkang](https://github.com/wangxingkang)

## 3.11.1

`2018-12-08`

- 🐞 Fixed the issue where the Avatar icon could not be centered vertically. [#13408](https://github.com/ant-design/ant-design/issues/13408)
- 🐞 Fixed the border problem of Button when customized less variable `@border-width-base`. [#13413](https://github.com/ant-design/ant-design/issues/13413) [@morenyang](https://github.com/morenyang)
- 🐞 Fixed Comment does not correctly display line breaks. [#13429](https://github.com/ant-design/ant-design/issues/13429)
- 🐞 Fixed the issue that when the Alert is in `closable`, the icon will be covered by the text. [#13440](https://github.com/ant-design/ant-design/issues/13440)
- Button
  - 🐞 Fixed the issue that when the `href` property is `undefined`, the Button will also be rendered as a anchor. [#13337](https://github.com/ant-design/ant-design/issues/13337)
  - 🐞 Fixed the issue that Edge throws an error when setting the `loading` property. [#13216](https://github.com/ant-design/ant-design/issues/13216)
- Dropdown
  - 🐞 Fixed the issue that causes the icon in the Button to display smaller. [#13442](https://github.com/ant-design/ant-design/issues/13442)
  - 🐞 Fixed the gap between the drop-down menu and the trigger element causes the drop-down menu to close. [#10481](https://github.com/ant-design/ant-design/issues/10481)
- Table
  - 🐞 Fixed the use of filter causes an inconsistency between `selectedRowKeys` and `selectedRows` in `onChange`. [#11384](https://github.com/ant-design/ant-design/issues/11384)
  - 💄 Optimize the display of the title when the mouse hovers over the sortable header. [#13312](https://github.com/ant-design/ant-design/issues/13312)
- DatePicker
  - 🐞 Fixed the issue where the component lost focus after selecting the date. [#12475](https://github.com/ant-design/ant-design/issues/12475)
  - 🐞 Fixed the issue that cause Safari to unresponsive. [#13424](https://github.com/ant-design/ant-design/issues/13424)
  - 🐞 Fixed the issue where WeekPicker's date selection box was not aligned with the input box.
- 🐞 Fixed the blur method of the Slider. [#13439](https://github.com/ant-design/ant-design/issues/13439)
- 🐞 Fixed Cascader's i18n issues. [#13486](https://github.com/ant-design/ant-design/issues/13486)
- 🐞 Fix some TypeScript definitions. [#13390](https://github.com/ant-design/ant-design/pull/13390) [#13488](https://github.com/ant-design/ant-design/pull/13488) [#13420](https://github.com/ant-design/ant-design/issues/13420)

## 3.11.0

`2018-12-02`

3.11.0 brings two new Components, a lot of exciting changes and new features.

- 🔥 Added a new component [Comment](https://ant.design/components/comment/). [#12770](https://github.com/ant-design/ant-design/pull/12770) [@ilanus](https://github.com/ilanus)
- 🔥 Added a new component [ConfigProvider](https://ant.design/components/config-provider/) for user to customize some global setting. [#12991](https://github.com/ant-design/ant-design/pull/12991)

Component Fixes / Enhancements:

- 🌟 Avatar Added `srcSet` prop that is a list of sources to use for different screen resolutions. [#12525](https://github.com/ant-design/ant-design/pull/12525) [@philipodev](https://github.com/philipodev)
- 🌟 Upgrade `rc-notification` to `3.3.0`, Notification Added `onClick` prop that is called when the notification is clicked. [#11832](https://github.com/ant-design/ant-design/issues/11832)
- Transfer
  - 🌟 Added `onSearch` prop that is executed when search field are changed and deprecated `onSearchChange`. [#12422](https://github.com/ant-design/ant-design/pull/12422)
  - 🌟 Added `disabled` prop that whether disable transfer. [#13330](https://github.com/ant-design/ant-design/issues/13330)
- 🌟 Refactor Badge, support `count` as custom component. [#12140](https://github.com/ant-design/ant-design/pull/12140) [@supra28](https://github.com/supra28)
- 🌟 Slider Added `tooltipVisible` prop that whether Tooltip will always show. [#12915](https://github.com/ant-design/ant-design/pull/12915) [@zy410419243](https://github.com/zy410419243)
- 🌟 Support custom font-variant style through less variable `@font-variant-base`. [#12691](https://github.com/ant-design/ant-design/pull/12691) [@neemski](https://github.com/neemski)
- Table upgrade `rc-table` to `6.4.0`
  - 🌟 Added `expandIcon` prop that custom the default expand icon. [#236](https://github.com/react-component/table/pull/236) [@kagd](https://github.com/kagd)
  - 💄 Support `data-*`, `aria-*` attributes. [#227](https://github.com/react-component/table/pull/227) [@kagd](https://github.com/kagd)
  - 🌟 onCell added `index` prop. [#222](https://github.com/react-component/table/pull/222) [@yoyo837](https://github.com/yoyo837)
- Select upgrade `rc-select` to `8.6.0`
  - 🌟 Added `removeIcon`, `clearIcon`, `menuItemSelectedIcon` prop, allow setting `remove`, `clear`, `menuItemSelected` custom icons. [#12958](https://github.com/ant-design/ant-design/pull/12958) [@kimochg](https://github.com/kimochg)
  - 🌟 Added `dropdownRender` prop that custom dropdown content. [#10831](https://github.com/ant-design/ant-design/issues/10831)
  - 🌟 Added `loading` prop that indicate loading state. [#11225](https://github.com/ant-design/ant-design/issues/11225)
- 💄 Added `title` prop that Menu.Item support tooltip title when collapsed. [#12952](https://github.com/ant-design/ant-design/pull/12952)
- Cascader upgrade `rc-calendar` to `9.8.0`
  - 🌟 Support multiple date format. [#437](https://github.com/react-component/calendar/pull/437) [@onlyann](https://github.com/onlyann)
  - 🌟 showSearch added `limit` prop that support limit filtered item count. [#13206](https://github.com/ant-design/ant-design/pull/13206)
- 🌟 Added Hungarian locale. [#13026](https://github.com/ant-design/ant-design/pull/13026) [@ilanus](https://github.com/ilanus)
- 🐞 Fix TextArea use resize observer to check textarea size. [#13295](https://github.com/ant-design/ant-design/pull/13295)
- 🐞 Fix Tabs renderTabBar style error when tabPosition is left or right. [#13118](https://github.com/ant-design/ant-design/pull/13118)
- 🐞 Fix Upload thumbnail icon broken styles. [#13333](https://github.com/ant-design/ant-design/issues/13333)

## 3.10.9

`2018-11-24`

- 🐞 Fix disabled Checkbox label cursor style. [#13199](https://github.com/ant-design/ant-design/issues/13199) [@walker27](https://github.com/walker27)
- 🐞 Fix TimePicker input exceeds the boundary of container. [#13194](https://github.com/ant-design/ant-design/issues/13194)
- 🌟 Adjust Table sort order from `desc -> asc` to `asc -> desc`. [#13069](https://github.com/ant-design/ant-design/pull/13069) [@OvestLabs](https://github.com/OvestLabs)
- 🐞 Fix Switch can be operated when loading. [#13219](https://github.com/ant-design/ant-design/pull/13219) [@jojoLockLock](https://github.com/jojoLockLock)
- 🐞 Fix Carousel can not be interactive in fade mode. [#13215](https://github.com/ant-design/ant-design/issues/13215)
- 🐞 Fix DatePicker don't support `tabIndex` prop. [#13265](https://github.com/ant-design/ant-design/pull/13265) [@arifemrecelik](https://github.com/arifemrecelik)
- 🐞 TreeSelect won't call `loadData` when searching to avoid lagging problem. [#13245](https://github.com/ant-design/ant-design/issues/13245)

## 3.10.8

`2018-11-17`

- 🐞 Fix pop-up menu background transparency.[#13104](https://github.com/ant-design/ant-design/issues/13104)
- 🐞 Fixed an issue where disabled Button does not full width in Popconfirm.[#13119](https://github.com/ant-design/ant-design/issues/13119)
- 🐞 Fixed an issue where Radio.Button in Radio.Group overridden Badge.[#13132](https://github.com/ant-design/ant-design/issues/13132)
- 🐞 Fixed a issue where RangePicker was not aligned in `small` mode.[#13105](https://github.com/ant-design/ant-design/issues/13105)
- 🐞 Fix the problem that the Dropdown font size affects the avatar.[#13091](https://github.com/ant-design/ant-design/issues/13091)
- 🐞 Fixed an issue where tabBarGutter could not work in vertical mode.[#12968](https://github.com/ant-design/ant-design/issues/12968)
- 🌟 Adjusted the types of multiple typescript.

## 3.10.7

`2018-11-11`

- 🐞 Fix a Button `line-height` typo. [74aeace](https://github.com/ant-design/ant-design/commit/74aeaceaa88034b8cb669efb8aa3b6de41ff6f9d)

## 3.10.6

`2018-11-11`

- 🐞 Reverted [adee2f3](https://github.com/ant-design/ant-design/commit/adee2f33294b9223bda959e6ae27b4d7dadcec49) for fixing link button broken style, and changed another way to resolve [#12978](https://github.com/ant-design/ant-design/issues/12978).

## 3.10.5

`2018-11-09`

- 🎉 [Ant Design Landing](https://landing.ant.design) released!
- 📖 Published the new [sketch resource](https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.Components.Beta.3.10.5.sketch) of Ant Design.
- Button
  - 🐞 Fix the style of vertical align in small `Button.Group`. [#12972](https://github.com/ant-design/ant-design/issues/12972)
  - 🐞 Fix the style of vertical align with `href` prop. [#12978](https://github.com/ant-design/ant-design/issues/12978)
- 🐞 Fix the incompatibility for `Cascader[filedNames]` after `3.7.0` version. [#12970](https://github.com/ant-design/ant-design/issues/12970)
- 🐞 Fix that the show date in pop-up layer should be reset when date value is not modified successfully for `DatePicker`. [#12929](https://github.com/ant-design/ant-design/issues/12929)
- 🐞 Fix the lose of type `cross` for Icon. [#12970](https://github.com/ant-design/ant-design/issues/12970)
- 🐞 Fix the incorrect `mode` for collapsed Menu. [#2782](https://github.com/ant-design/ant-design-pro/issues/2782) [#2783](https://github.com/ant-design/ant-design-pro/issues/2783) [#2786](https://github.com/ant-design/ant-design-pro/issues/2786)
- 🐞 Fix the unnecessary `reflow` to avoid weird wave animation for Popover and Tooltip. [#12942](https://github.com/ant-design/ant-design/issues/12942)
- Table
  - 🐞 Fix the style of overflow when nested in other components. [#13025](https://github.com/ant-design/ant-design/issues/13025)
  - 🐞 Fix the style of overlap between the overlong head content and sort icon. [#12552](https://github.com/ant-design/ant-design/issues/12552) [#12650](https://github.com/ant-design/ant-design/issues/12650)
- 🐞 Fix the disappearance when nested in Popover and Popconfirm for Tooltip whose children is `disabled`. [#13001](https://github.com/ant-design/ant-design/issues/13001)
- 🐞 Fix the stuck problem when upload non-image file for Upload. [#12948](https://github.com/ant-design/ant-design/issues/12948)
- 🐞 Fix that `DOM Object` doesn't support property or method `removeAttribute` in `IE` and `Edge`. [#2423](https://github.com/ant-design/ant-design-pro/issues/2423)
- 🐞 Remove the unnecessary wave animation for hidden elements. [#12967](https://github.com/ant-design/ant-design/issues/12967)

## 3.10.4

`2018-11-03`

- 🌟 Support custom modal header style through less variable `@modal-header-bg`. [#12914](https://github.com/ant-design/ant-design/issues/12914)
- 🐞 Fixed mask style not working for Modal.method. [#12688](https://github.com/ant-design/ant-design/issues/12688)
- 🐞 Fixed Checkbox missing check mark inside table in IE 11. [#12597](https://github.com/ant-design/ant-design/issues/12597)
- 🐞 Fixed FormItem having different height with help info. [#12803](https://github.com/ant-design/ant-design/issues/12803)
- 🐞 Fixed Divider expands Popover card width under Chrome. [#10914](https://github.com/ant-design/ant-design/issues/10914)
- 🐞 Fixed Avatar content not aligned in Popover. [#10917](https://github.com/ant-design/ant-design/issues/#10917)
- Button
  - 🐞 Fixed unable to find node on unmounted components error. [#12843](https://github.com/ant-design/ant-design/issues/12843)
  - 🐞 Fixed icon margin style. [546c59a](https://github.com/ant-design/ant-design/commit/546c59a4c1a6b482afecbcb4a3cb1e385c0bbdb6)
- Table
  - 🐞 Fixed sorter issue when render function is present in column. [#12870](https://github.com/ant-design/ant-design/issues/12870) [#12737](https://github.com/ant-design/ant-design/issues/12737)
  - 🐞 Fixed fixed-columns border issue. [#9687](https://github.com/ant-design/ant-design/issues/9687)
- TypeScript
  - 🐞 Fixed Select `onPopupScroll` props definition. [#12913](https://github.com/ant-design/ant-design/pull/12913)
  - 🐞 Fixed `onFocus` and `onBlur` missing in AutoComplete props. [@muzea](https://github.com/muzea) [#12793](https://github.com/ant-design/ant-design/issues/12793);

## 3.10.3

`2018-10-27`

- 🌟 Improve util function `getScroll` TypeScript definition. [#12784](https://github.com/ant-design/ant-design/pull/12784) [@ztplz](https://github.com/ztplz)
- 🐞 Fixed that Checkbox inside CheckboxGroup do not trigger `onChange`. [#12642](https://github.com/ant-design/ant-design/issues/12642)
- 🐞 Fixed Calendar month picker not correct when set with `validRange`. [#12675](https://github.com/ant-design/ant-design/issues/12675)
- 🐞 Fixed multiple Select drop-down bug when set `dropdownMatchSelectWidth`. [#12816](https://github.com/ant-design/ant-design/pull/12816) [@hengkx](https://github.com/hengkx)
- 🐞 Fixed Card title overflow bug. [#12680](https://github.com/ant-design/ant-design/issues/12680)
- 🐞 Fixed Form[inline] help and extra overlapped. [#12725](https://github.com/ant-design/ant-design/issues/12725)
- Table
  - 🌟 Support custom Table filter backgrounds. [#12775](https://github.com/ant-design/ant-design/pull/12775) [@ivankravets](https://github.com/ivankravets)
  - 🐞 Adjust small table placeholder style. [#12682](https://github.com/ant-design/ant-design/issues/12682)
  - 🐞 Fixed small size table header border missing in Firefox. [#12840](https://github.com/ant-design/ant-design/issues/12840)
  - 🐞 Fixed checkbox align of small/middle size table. [#12723](https://github.com/ant-design/ant-design/issues/12723)

## 3.10.2

`2018-10-23`

- 📝 Translated documentation [patterns overview](https://ant.design/docs/spec/overview) to English. [#12637](https://github.com/ant-design/ant-design/pull/12637) [@ilanus](https://github.com/ilanus)
- 🛠 Improve support vi_VN locale for DatePicker component. [#12656](https://github.com/ant-design/ant-design/pull/12656) [@hieuhlc](https://github.com/hieuhlc)
- 🐞 Fixed TimePicker style issue in IE11. [#12707](https://github.com/ant-design/ant-design/pull/12707) [jinyaqiao1102](https://github.com/jinyaqiao1102)
- 🐞 Fixed Popconfirm defaultVisible. [#12733](https://github.com/ant-design/ant-design/issues/12733)
- 🐞 Fixed Table the border missing in Firefox. [#12628](https://github.com/ant-design/ant-design/issues/12628)
- 🐞 Add `touch-action: none` css on Slider to fix chrome warning. [#12595](https://github.com/ant-design/ant-design/issues/12595)
- 🐞 Fixed Tabs ink-bar vertical css. [#12276](https://github.com/ant-design/ant-design/issues/12276)
- 🐞 Fixed vertical align issue of empty Button. [#12681](https://github.com/ant-design/ant-design/issues/12681)
- 🐞 Fixed Calendar `locale` prop should have priority. [#12706](https://github.com/ant-design/ant-design/issues/12706)
- 🐞 Fixed Checkbox[checked] indeterminate style. [#12724](https://github.com/ant-design/ant-design/issues/12724)
- 🐞 Fixed `prefixCls` not passed to Popconfirm's button. [#12677](https://github.com/ant-design/ant-design/pull/12677) [@concefly](https://github.com/concefly)
- 🐞 Fixed Edge ignoring `pointer-events:none` on Button's span. [#12712](https://github.com/ant-design/ant-design/pull/12712) [@dazbo](https://github.com/dazbo)
- Progress
  - 🐞 Fixed Progress `strokeColor` props not work. [#12587](https://github.com/ant-design/ant-design/pull/12587) [@lyhper](https://github.com/lyhper)
  - 🐞 Fixed Progress[type="circle"] should wrap text. [#12718](https://github.com/ant-design/ant-design/issues/12718)
- TypeScript
  - 🐞 Fixed `trexpandedKeys` and `onTreeExpand` definition missing in TreeSelect. [#12648](https://github.com/ant-design/ant-design/pull/12648) [@decadef20](https://github.com/decadef20)
  - 🐞 Fixed missed property `key` in TabPaneProps. [682af0d](https://github.com/ant-design/ant-design/commit/682af0d44bf38a7d3e487aa909c46409db163030) [@ztplz](https://github.com/ztplz)
  - 🐞 Fixed some definition of Icon. [3dbc357](https://github.com/ant-design/ant-design/commit/3dbc357ff2837debbb9b36a25b14be4757297cad)

## 3.10.1

`2018-10-12`

- 🎉 [Ant Design Mobile of Angular](http://ng.mobile.ant.design/)(NG-ZORRO-Mobile) released!
- 📝 Upgrade document `Real project with dva` to [Real project with umi](https://ant.design/docs/react/practical-projects).
- Table
  - 🐞 Fixed clicking all columns will trigger sort behavior even without `sorter` props. [#12515](https://github.com/ant-design/ant-design/issues/12515)
  - 🐞 Fixed extra "Sort" title hint of column. [#12613](https://github.com/ant-design/ant-design/issues/12613)
  - 🐞 Fixed broken style of sort and right-aligned column. [#12552](https://github.com/ant-design/ant-design/issues/12552)
  - 🐞 Fixed sort not working as expected when `columns` defined in `render`. [#12571](https://github.com/ant-design/ant-design/issues/12571)
  - 🐞 Fixed sorted column background color of small size Table.
  - 🐞 Fixed overlap style of Table row selection Checkbox in chrome. [5bef1aa](https://github.com/ant-design/ant-design/commit/5bef1aa6c2e792180ef8d53a1f1489376b8e35db)
  - 🐞 Fixed broken style of Table inside Form.Item. [#12554](https://github.com/ant-design/ant-design/issues/12554)
- DatePicker
  - 🐞 Tweak Italian locale. [#12413](https://github.com/ant-design/ant-design/issues/12413) [@yp](https://github.com/yp)
  - 🐞 Fixed that picker does not get focused state after select date. [#12475](https://github.com/ant-design/ant-design/issues/12475)
  - 🐞 Fixed calendar icon missing when use it in Input.Group. [#12536](https://github.com/ant-design/ant-design/issues/12536)
- 🐞 Fixed Anchor text edge cut problem. [#12520](https://github.com/ant-design/ant-design/issues/12520)
- 🐞 Fixed that Drawer still cover page even set `mask={false}`. [#12401](https://github.com/ant-design/ant-design/issues/12401)
- 🐞 Fixed disabled style missing of Input.TextArea when used as custom input in AutoComplete. [#12594](https://github.com/ant-design/ant-design/issues/12594)
- 🐞 Fixed Modal.confirm `prefixCls` prop not passing to mask element, and changed it's default value to `ant-model-confirm`. [#12546](https://github.com/ant-design/ant-design/issues/12546)
- 🐞 Fixed an align issue of Input.Group in safari. [#12493](https://github.com/ant-design/ant-design/issues/12493)
- 🐞 Fixed an align issue of standalone `<Badge />`. [#12419](https://github.com/ant-design/ant-design/issues/12419)
- 🐞 Fixed inconsistent arguments of `onExpand` when click Tree.DirectoryTree switch icon and tree node. [#12567](https://github.com/ant-design/ant-design/issues/12567)
- 🐞 Fixed hasFeedback icon unexpected focused state in IE11. [#12524](https://github.com/ant-design/ant-design/pull/12524) [@siyu77](https://github.com/siyu77)
- 🐞 Fixed multiple Select will trigger `onFocus` and `onBlur` repeatedly when click it multiple times. [#12281](https://github.com/ant-design/ant-design/issues/12281) [@Frezc ](https://github.com/Frezc)
- 🐞 Fixed long text overflow issue of circle type Progress.
- TypeScript
  - 🐞 Fixed Steps `labelPlacement` definition. [#12575](https://github.com/ant-design/ant-design/pull/12575) [@yueyes](https://github.com/yueyes)
  - 🐞 Fixed Select.Option `style` definition. [#12609](https://github.com/ant-design/ant-design/pull/12609) [@dimitropoulos](https://github.com/dimitropoulos)
  - 🐞 Fixed `form.validateFields` overload order problem. [#12538](https://github.com/ant-design/ant-design/pull/12538) [@TomIsion](https://github.com/TomIsion)
  - 🐞 Fixed AutoComponent `onFocus` `onBlur` definitions. [#12498](https://github.com/ant-design/ant-design/issues/12498)

## 3.10.0

`2018-09-30`

- 🌟 Upload adds `openFileDialogOnClick` prop to allow setting whether to open the upload dialog when the component is clicked. [#12347](https://github.com/ant-design/ant-design/pull/12347) [@hengkx](https://github.com/hengkx)
- 🌟 InputNumber adds `decimalSeparator` prop to allow setting a custom decimal. [#12329](https://github.com/ant-design/ant-design/pull/12329) [@amedora](https://github.com/amedora)
- 🌟 TreeSelect adds the `treeExpandedKeys` and `onTreeExpand` props to control the expansion of the tree. [#12145](https://github.com/ant-design/ant-design/issues/12145)
- Transfer
  - 🌟 Adds `disabled` prop. [#12066](https://github.com/ant-design/ant-design/issues/12066)
- Modal
  - 🌟 Adds `autoFocusButton` prop to allow specifying a button that automatically gets focus when Modal opens. [#11756](https://github.com/ant-design/ant-design/pull/11756) [@erwin-k](https://github.com/erwin-k)
  - 🌟 `confirm` added `okButtonProps` and `cancelButtonProps` prop to allow setting custom props on buttons. [#12425](https://github.com/ant-design/ant-design/pull/12425) [@Whoaa512](https://github.com/Whoaa512)
- Table
  - 🌟 `column.title` accepts function now. [#11246](https://github.com/ant-design/ant-design/issues/11246)
  - 🌟 `onChange` adds a new parameter `extra` to allow you getting filtered data. [#12369](https://github.com/ant-design/ant-design/pull/12369)
  - 🌟 Improve the sort and filter UX, You can now sort by clicking on the entire header. [#12264](https://github.com/ant-design/ant-design/pull/12264)
- 🌟 Alert adds `icon` prop to allow setting a custom icon. [Demo](https://ant.design/components/alert/#components-alert-demo-custom-icon)
- 🌟 The following components add a `suffixIcon` prop, which is used to set the icon behind the input box. For details, please refer to the documentation.
  - Cascader
  - DatePicker
  - Select
  - TreeSelect
  - TimePicker
- 🌟 Add some new less variables. [f237eff](https://github.com/ant-design/ant-design/commit/f237effc2a35eb249273f6f2826092a2f9b9db45)
- 🐞 Fix Icon.createFromIconfontCN prepending `https` to the `scriptUrl`. [#12316](https://github.com/ant-design/ant-design/issues/12316)
- 🐞 Fix the issue with the `gutter` props of Row that doesn't work when using nested Col. [#12320](https://github.com/ant-design/ant-design/pull/12320)
- 🐞 Fix the issue where the Tree.DirectoryTree component could not properly expand the node when the 'expandedKeys` prop had initial values. [#12396](https://github.com/ant-design/ant-design/issues/12396)
- 🐞 Fix the issue when the `render` prop of the Transfer component returns a ReactNode, the `title` property of the list item shows an unexpected value. [#12399](https://github.com/ant-design/ant-design/issues/12399)
- 🐞 Fix Tooltip not working with CheckboxGroup. [#12427](https://github.com/ant-design/ant-design/issues/12427)
- 🐞 Fix the issue that Button can still be clicked in IE9 under loading state. [#12466](https://github.com/ant-design/ant-design/pull/12466) [@snail](https://github.com/120216220)
- 🐞 Fix the issue with mouse hover when using non-Input components in Input.Group. [#12407](https://github.com/ant-design/ant-design/pull/12407) [@hengkx](https://github.com/hengkx)
- 🐞 Fix some TypeScript type definitions. [#12374](https://github.com/ant-design/ant-design/pull/12374) [#12370](https://github.com/ant-design/ant-design/pull/12370) [#12354](https://github.com/ant-design/ant-design/pull/12354/files) [#12473](https://github.com/ant-design/ant-design/pull/12473)

## 3.9.3

`2018-09-22`

- 🐞 Fix `Select` render lag of long text in Chrome. [#11456](https://github.com/ant-design/ant-design/issues/11456) [#11843](https://github.com/ant-design/ant-design/issues/11843)
- 🐞 Fix `onOpenChange` handler not being called in `RangePicker` for preset ranges. [#12142](https://github.com/ant-design/ant-design/pull/12142)[@leijingdao](https://github.com/leijingdao)
- 🐞 Fix parameter `dontAnimate` to `goTo` of `Carousel`, the parameter be used to closing animation transitions. [#12205](https://github.com/ant-design/ant-design/pull/12205)
- 🐞 Fix duplicated className for tabBar in `Tabs`. [589ba](https://github.com/ant-design/ant-design/commit/589bafd5db92a817c078ead6decdb81e64b2b5a8) [#12051](https://github.com/ant-design/ant-design/issues/12051)
- 🐞 Fix the vertical alignment for the title of `Card`. [#11036](https://github.com/ant-design/ant-design/pull/11036) [#10576](https://github.com/ant-design/ant-design/issues/10576)
- 🐞 Fix Item key unexpected change on `List` component. [#12299](https://github.com/ant-design/ant-design/pull/12299)[@douglasjunior](https://github.com/douglasjunior)
- 🐞 Fix `confirmFilter` in `Table` does not refresh immediately. [954c7](https://github.com/ant-design/ant-design/commit/954c7ecd8ed384a3c67ec8dfb0e0deaa14bbf83b) [#12284](https://github.com/ant-design/ant-design/issues/12284)
- Menu
  - 🐞 Fix extra scrollbar when popup `Menu` in `horizontal` mode. [#12152](https://github.com/ant-design/ant-design/issues/12152)
  - 🐞 Fix `openKeys` have higher priority in `Menu`. [#12361](https://github.com/ant-design/ant-design/pull/12361) [@tangjinzhou](https://github.com/tangjinzhou)
- Upload
  - 🐞 Fix `linkProps` in `Upload` fileList to support json string format and can override rel, target, title and etc. [efb23c](https://github.com/ant-design/ant-design/commit/efb23c1525858114460bfe3bd5fcb18c9f236bdc)
  - 🐞 Fix deduplication of the same key when uploading multiple files in `Upload`. [273fd](https://github.com/ant-design/ant-design/commit/273fd2ea1bca395d61509cc98c3ebbf1c620bf43) [#10953](https://github.com/ant-design/ant-design/issues/10953)
- Icon related
  - 🐞 Fix `Upload` close icon style error. [#12330](https://github.com/ant-design/ant-design/pull/12330) [#12304](https://github.com/ant-design/ant-design/issues/12304)
  - 🐞 Fix `Select` add select clear icon. [#12196](https://github.com/ant-design/ant-design/pull/12196) [#12181](https://github.com/ant-design/ant-design/issues/12181)
  - 🐞 Fix `Icon` svg align. [0698c](https://github.com/ant-design/ant-design/commit/0698c8217327224611d4be5fcfd149a355f1c08d)
  - 🐞 Fix `React.Children.only` error when `Icon` contain children. [c21ff](https://github.com/ant-design/ant-design/commit/c21ff5251d1ff0f00d7f283dd377a7b13eec21ee)
  - 🐞 Fix `Notification` icon align when no description. [e6579](https://github.com/ant-design/ant-design/commit/e657985cc35359fb813a2bd68be8c3afbe75c95a)
  - 🐞 Fix sorter icon align of `Table`. [c935d](https://github.com/ant-design/ant-design/commit/c935d53b713afb3ec314133d749ca4e29e0c1ee5)
- TypeScript
  - 🐞 Fix `Message` miss return type of MessageApi. [e82d7](https://github.com/ant-design/ant-design/commit/e82d7a9c095317d62b054fcf7c2d6666ba54660d) [#12137](https://github.com/ant-design/ant-design/issues/12137)
  - 🐞 Fix `Tree` onDrop type. [e5827](https://github.com/ant-design/ant-design/commit/e58273dccf59d58862e8bab0da36c7065e1c1044) [#12269](https://github.com/ant-design/ant-design/issues/12269)
  - 🐞 Add `TreeSelect` missing argument `extra` in onChange event. [#12243](https://github.com/ant-design/ant-design/pull/12243)[@jardicc](https://github.com/jardicc)

## 3.9.2

`2018-09-08`

- 🐞 Title of children `Card` under `Card` using `tab-card` has wrong padding. [#12083](https://github.com/ant-design/ant-design/issues/12083)
- 🐞 Fix `AutoComplete` using `TextArea` as input, height adjust by manual has time delay. [#12117](https://github.com/ant-design/ant-design/issues/12117)
- 🐞 Fix `maskStyle` under `Drawer` not working. [#12125](https://github.com/ant-design/ant-design/pull/12125)[@ryerh](https://github.com/ryerh)
- 🌟 `Popconfirm` can detect whether `onVisibleChange` is triggered by Ok or Cancel buttons. [#8614](https://github.com/ant-design/ant-design/issues/8614)
- 🐞 Fix something table header in `Table` using fixed header and columns display unnecessary scrollbar. [#6515](https://github.com/ant-design/ant-design/issues/6515)
- 🐞 Fix `Spin` using `delay` still render at first time. [#12131](https://github.com/ant-design/ant-design/issues/12131)
- Icon related:
  - 🐞 Fix `Icon` in `popconfirm` has wrong position. [#12080](https://github.com/ant-design/ant-design/issues/12080)
  - 🐞 Add `Icon` missing icons. [#121218](https://github.com/ant-design/ant-design/issues/121218)
  - 🐞 Fix `Select` don't have checked icon. [#12054](https://github.com/ant-design/ant-design/issues/12054)
  - 🐞 Fix `TreeSelect` clear icon not same as previous versions. [#12124](https://github.com/ant-design/ant-design/issues/12124)

## 3.9.1

`2018-09-03`

- 🐞 Fixed the bug that `Tooltip` can not be triggered by `Icon`. [#12005](https://github.com/ant-design/ant-design/issues/12005)
- 🐞 Fixed the bug that `InputNumber` shows wrong UP icon. [#12035](https://github.com/ant-design/ant-design/issues/12035)
- 🐞 Fixed the bug that `Modal` shows no icon in error confirm. [#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 Fixed the bug that the icon is misaligned in `Popconfirm`. [#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 Fixed the but that the icons are misaligned in `Card`'s `Actions` panel. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 Fixed that the icons in `Form`, `Alert`, `TimePicker` have wrong theme. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 Fixed that the icons are set to have 90deg rotation in the `header` property in `Collapse`. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 Fixed the issue that there are still old icons in some production environments. [#12016](https://github.com/ant-design/ant-design/pull/12016) [8b82f14](https://github.com/ant-design/ant-design/pull/12016/commits/8b82f143b6bd612e8ec7f1202dfd5f41127b025e)
- 🐞 Fixed the bug that the new static method `Icon.createFromIconFontCN({...})` doesn't work and gives a warning. [#12013](https://github.com/ant-design/ant-design/pull/12013)

## 3.9.0

`2018-09-02`

In September we brought an update for `3.9.0`. There are many new features in `3.9.0`, Ant Design is getting stronger and solider.

- 🔥🔥🔥 In the `3.9.0` version, we redraw all the icons, adding two new categories, more than 90 new icons. And the bit adds a variety of styles to each icon. To this end, we have rewritten the Icon component, replaced the `fontface` icon with `SVG`, adding a number of features that allow us to quickly use new icons and styles. ![](https://gw.alipayobjects.com/zos/rmsportal/CVDHuodLwcDeyQBDoUIZ.png)
  - 💄 Replace the `css` font icon with the `SVG` icon, [see more discussion about it](https://github.com/ant-design/ant-design/issues/10353).
  - 💄 You can now render a two-color icon.
  - 💄 We provide three theme of icons: outlined, filled, twoTone, default theme is outlined.
  - 🌟 Two new categories, **Edit Icons** and **Data Icons**, have been added.
  - 🌟 Add the `theme` attribute to set the theme style of the icon. [#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 Added `component` attribute, you can externally pass a component to customize the control rendering result. [#11322](https://github.com/ant-design/ant-design/pull/11322)
  - 🌟 The `twoToneColor` property is added to control the theme color of the two-color icon. [#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 Added static methods `Icon.getTowToneColor()` and `Icon.setTwoToneColor(...)` to globally get and set the theme color of all two-color icons. [#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 The new static method `Icon.createFromIconfontCN({...})` is added to make it easier to use icons hosted on [`iconfont.cn`](http://iconfont.cn/). For more usage, please refer to [Ant Design Pro - Introduction to Business Icons](https://pro.ant.design/docs/biz-icon). [#11322](https://github.com/ant-design/ant-design/pull/11322)
- 🔥 Added a new component [Skeleton](https://ant.design/components/skeleton/).
- 🔥 Menu will automatically close up to fit width in `horizontal` mode.
- 🔥 The `placement` of the drawer supports `top` and `bottom` to accommodate more scenes.

In addition, our **Ant Design Pro 2.0.0** version has also been released simultaneously, please see [here](https://medium.com/ant-design/beautiful-and-powerful-ant-design-pro-2-0-release-51358da5af95) for details.

### Bugfix/Feature：

- 🌟 Added Modal.open for optional icon dialog. [#11982](https://github.com/ant-design/ant-design/pull/11982) [@hsiehjack](https://github.com/hsiehjack)
- 🌟 Modal.info adds the configuration of `getContainer`. [#11377](https://github.com/ant-design/ant-design/issues/11377)
- 🌟 Improve RangePicker footer UI by merging them.
- 🌟 The Anchor component adds `onClick` property. [#11898](https://github.com/ant-design/ant-design/pull/11898)
- 🌟 The Tab component adds the `renderTabBar` property. [#11856](https://github.com/ant-design/ant-design/pull/11856)
- 🌟 The Input component adds the `select` method. [#11906](https://github.com/ant-design/ant-design/pull/11906)
- 🌟 Steps adds the `initial` attribute. [#11180](https://github.com/ant-design/ant-design/issues/11180)
- 🐞 Fixed Steps dot style broken.
- 🐞 Fixed an issue where setting fontSize in the `headStyle` of the Card does not work. [#11995](https://github.com/ant-design/ant-design/issues/11995)
- 🐞 Fixed an issue where the Button component wave animation was mix up. [#11985](https://github.com/ant-design/ant-design/issues/11985)
- 🐞 Fixed an issue where the Modal.confirm setting `centered` attribute didn't work. [#11969](https://github.com/ant-design/ant-design/issues/11969)
- 🐞 Fixed an issue where setting the `suffix` and `prefix` of the second Input in the `compact` mode of Input.Group would cause the right border to disappear. [#11965](https://github.com/ant-design/ant-design/pull/11965)
- 🐞 Fixed an issue where Upload components might cause misplaced images when uploading many images. [#11183](https://github.com/ant-design/ant-design/issues/11183)
- 🐞 Fixed MonthPicker `renderExtraFooter` not working. [#8184](https://github.com/ant-design/ant-design/issues/8184)

## 3.8.4

`2018-08-27`

- 🐞 Fixed an issue where the Tag component would cause a line break after deleting the tag.
- 🐞 Fixed `Failed to execute 'removeChild' on 'Node'` error when click Switch.

## 3.8.3

`2018-08-26`

- 📖 Rewrite the documentation of [Customize Theme](https://ant.design/docs/react/customize-theme) and provider instruction for major `Less` variables. [6fd5e9](https://github.com/ant-design/ant-design/commit/6fd5e95cec2f1c936dcf857a72446ec956a5c7ad) [53dd82](https://github.com/ant-design/ant-design/commit/53dd82e4e3dd39d7ccc4f752901cb182b5b90555)
- 🐞 Fix the zoom animation style for Badge. [#11870](https://github.com/ant-design/ant-design/issues/11870)
- 🐞 Fix the abnormal width in IE and Edge for Cascader. [#11857](https://github.com/ant-design/ant-design/issues/11857)
- 🐞 Fix the blurry style in Windows Chrome for Checkbox. [#11797](https://github.com/ant-design/ant-design/issues/11797)
- 🐞 Fix that `style` prop is not effective for DatePicker.WeekPicker. [#11738](https://github.com/ant-design/ant-design/issues/11738)
- 🐞 Fix the flash style for Drawer. [#11813](https://github.com/ant-design/ant-design/issues/11813)
- 🐞 Fix the border style for compact Input.Group with `prefix` or `suffix`. [#11863](https://github.com/ant-design/ant-design/issues/11863)
- Menu
  - 🐞 Fix the gap style between SubMenu and that Menu disappears when hovering over the tap. [#11725](https://github.com/ant-design/ant-design/issues/11725)
  - 🐞 Fix the displayed error when ItemGroup wraps the first SubMenu and the Menu is collapsed. [a52370](https://github.com/ant-design/ant-design/commit/a523706625bd695f44401579d980089292089dda) [@ohhoney1](https://github.com/ohhoney1)
- 🐞 Fix that overlong `description` is cut off for Steps. [#11864](https://github.com/ant-design/ant-design/issues/11864)
- 🐞 Fix that the word maybe break in overlong `title` for Tooltip. [#11722](https://github.com/ant-design/ant-design/issues/11722)
- 🐞 Fix that `custom prop` of TreeNode cannot be accepted for Tree. [#11423](https://github.com/ant-design/ant-design/issues/11423)
- 🐞 Fix the effective area for Upload.Dragger. [#11869](https://github.com/ant-design/ant-design/issues/11869)

## 3.8.2

`2018-8-18`

- 🐞 Fixed Tag still visible when initially setting `visible` prop to false. [#11757](https://github.com/ant-design/ant-design/issues/11757)
- 🐞 Fixed Modal text got selected when opened by double click. [#11777](https://github.com/ant-design/ant-design/issues/11777)
- 🐞 Fixed style of Rate component while getting clicked. [#11736](https://github.com/ant-design/ant-design/issues/11736)
- 🐞 Fixed style of Badge component when its children is `display:block`. [#84119d8](https://github.com/ant-design/ant-design/commit/84119d8959d55edf535a9cac5ff532e61b6ee698)
- Drawer
  - 🐞 Fixed Drawer not compatible with IE10 and IE9. [#11583](https://github.com/ant-design/ant-design/issues/11583)
  - 🐞 Fixed Drawer not being able to be scrolled vertically on mobile device. [#11443](https://github.com/ant-design/ant-design/issues/11443)
- TypeScript
  - 🐞 Fixed `selectable` prop is missing in TreeNode props. [#11604](https://github.com/ant-design/ant-design/issues/11604) [@apieceofbart](https://github.com/apieceofbart)
  - 🐞 Fixed `autosize` prop is missing in Input props. [#11697](https://github.com/ant-design/ant-design/issues/11697)

## 3.8.1

`2018-08-12`

- 🐞 Fixed TimePicker unexpected long width. [80f8267](https://github.com/ant-design/ant-design/commit/80f82674fb63b068d047651ccba772999139f1b7)
- 🐞 Fixed Tabs that focusable element in inactive panel cause tabs disappear. [#11261](https://github.com/ant-design/ant-design/issues/11261)
- 🐞 Fixed Badge `offset` x y axis order error. [#11648](https://github.com/ant-design/ant-design/pull/11648) [@tangjinzhou](https://github.com/tangjinzhou)
- Upload
  - 🐞 Fixed delete button missing in Upload. [#10454](https://github.com/ant-design/ant-design/issues/10454)
  - 🐞 Fixed Upload thumbnail which url has no extension. [#11684](https://github.com/ant-design/ant-design/pull/11684) [@elantion](https://github.com/elantion)
- 🐞 Fixed Anchor with `affix=true` doesn't work inside inner scrollable. [#11688](https://github.com/ant-design/ant-design/pull/11688) [@vitaliymaz](https://github.com/vitaliymaz)
- 🐞 Fixed card width in List.Grid. [!11712](https://github.com/ant-design/ant-design/issues/11712)
- 🐞 Fixed Radio align problem in safari. [754a22c](https://github.com/ant-design/ant-design/commit/754a22ca24dee685666554778f53a5fe700959ff)
- 💄 Apply wave click animation to components Switch, Radio.Button and Tag. [9cf6ae6](https://github.com/ant-design/ant-design/commit/9cf6ae601010acbf665d575d34c0cc0918e604e7)
- TypeScript
  - 🐞 Fixed missing prop signature `destroyInactivePanel` of Collapse. [#11646](https://github.com/ant-design/ant-design/pull/11646) [@zheeeng](https://github.com/zheeeng)
  - 🐞 Fixed missing prop `getPopupContainer` signature of AutoComplete. [#11690](https://github.com/ant-design/ant-design/pull/11690) [@Huanghuiying0624](https://github.com/Huanghuiying0624)
  - 🐞 Fixed Upload `lastModifiedDate` signature. [#11709](https://github.com/ant-design/ant-design/pull/11709) [@andycall](https://github.com/andycall)
- 💄 Migrate to new lifecycle methods, include components TimePicker, Upload, CheckboxGroup, Layout.Sider, Tooltip, Popconfirm. [#11666](https://github.com/ant-design/ant-design/pull/11666) [@dancerphil](https://github.com/dancerphil) [#11682](https://github.com/ant-design/ant-design/pull/11682) [@dancerphil](https://github.com/dancerphil)

## 3.8.0

`2018-08-05`

Thanks to 24 contributors who send pull request to 3.8.0!

- 💄 Support TypeScript 3 and improve lots of definitions.
- 💄 Use [tabular-nums font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) instead of monospaced numeric font family Tahoma. [#11567](https://github.com/ant-design/ant-design/pull/11567) [@tibdex](https://github.com/tibdex)
- 🌟 Timeline support `mode="left|right|alternate"` now. [#11490](https://github.com/ant-design/ant-design/pull/11490) [@jrvboesch](https://github.com/jrvboesch)
- 🌟 Button added `block` prop which allow to fit parent container. [#11500](https://github.com/ant-design/ant-design/pull/11500) [@ilanus](https://github.com/ilanus)
- Tree
  - 💄 Better accessibility support.
  - 🐞 Fixed that some tree nodes disappear after dragged. [#11492](https://github.com/ant-design/ant-design/issues/11492)
  - 🐞 Fixed a vertical align style issue of draggable tree. [#11458](https://github.com/ant-design/ant-design/issues/11458)
- Table
  - 🌟 Added `rowSelection.columnTitle` to customize selection column title. [#11042](https://github.com/ant-design/ant-design/issues/11042) [@littleLane](https://github.com/littleLane)
  - 💄 Added demo of [resizable columns](/components/table/#components-table-demo-resizable-column).
  - 💄 Support to select multiple rows when pressing `shift`. [#11404](https://github.com/ant-design/ant-design/issues/11404) [@RaphaelChauveau](https://github.com/RaphaelChauveau)
- Avatar
  - 🌟 Added `onError` prop that is callback when image loading fail. [#11285](https://github.com/ant-design/ant-design/pull/11285/) [@paranoidjk](https://github.com/paranoidjk)
  - 🌟 Added `size` prop for customize size of Avatar. [#11256](https://github.com/ant-design/ant-design/issues/11256) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🌟 Card added `headStyle` prop. [#11407](https://github.com/ant-design/ant-design/pull/11407) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🐞 Fixed that Tooltip not working with DatePicker. [#11451](https://github.com/ant-design/ant-design/issues/11451) [@yociduo](https://github.com/yociduo)
- 🐞 Fixed that Tooltip not working with Input.Group. [#11532](https://github.com/ant-design/ant-design/issues/11532) [@yociduo](https://github.com/yociduo)
- 🐞 Fixed that DatePicker time panel text jumping when hovering. [#11460](https://github.com/ant-design/ant-design/issues/11460)
- 🐞 Fixed Tabs display issue when switch focus elements between panels. [#11261](https://github.com/ant-design/ant-design/issues/11261)
- Select
  - 💄 Support `data-*` attributes.
  - 🐞 Fixed that selected item don't display correct position in dropdown menu items. [#11268](https://github.com/ant-design/ant-design/issues/11268)
- 🌟 Calendar added `onChange` prop. [#11476](https://github.com/ant-design/ant-design/pull/11476) [@tangjinzhou](https://github.com/tangjinzhou)
- 🌟 Popconfirm added `icon` prop. [#11191](https://github.com/ant-design/ant-design/pull/11191) [@nuintun](https://github.com/nuintun)
- Modal
  - 🌟 Added `centered` prop to set vertical center position of modal. [#11537](https://github.com/ant-design/ant-design/pull/11537) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fixed that closing all modals when pressing `ESC` once, now they will be closed one by one. [#11394](https://github.com/ant-design/ant-design/issues/11394) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fixed issue resulting title of Modal.confirm shows scrollbar again. [#11568](https://github.com/ant-design/ant-design/pull/11568) [@cheshireoctopus](https://github.com/cheshireoctopus)
- 🌟 Progress added `strokeLinecap` to customize shape of edge. [#11547](https://github.com/ant-design/ant-design/pull/11547) [@blatinier](https://github.com/blatinier)
- 🌟 Drawer added `className` and deprecated `wrapClassName`. [#11609](https://github.com/ant-design/ant-design/pull/11609) [@fergiar](https://github.com/fergiar)

## 3.7.3

`2018-07-28`

- 🐞 Fix issue resulting in title not vertical align with icon when setting `labelPlacement` to `vertical` in Steps. [#11426](https://github.com/ant-design/ant-design/pull/11426) [@yoyo837](https://github.com/yoyo837)
- 🐞 Fix issue resulting in the children field specified in `fieldName` could not be read correctly in Cascader. [#11311](https://github.com/ant-design/ant-design/pull/11311) [@405go](https://github.com/405go)
- TypeScript
  - 🐞 Fix type definition of Pagination. [#11474](https://github.com/ant-design/ant-design/pull/11474) [@kagd](https://github.com/kagd)
  - 🐞 Fix type definition of Select. [#11189](https://github.com/ant-design/ant-design/pull/11189<Paste>) [@thisJJ](https://github.com/thisJJ)

## 3.7.2

`2018-07-25`

- DatePicker
  - 🐞 **Fix issue resulting in year and month can not be changed in control mode.** [b9992f4](https://github.com/ant-design/ant-design/commit/b9992f4a08574efb47b6e6cd80eb1e888b9a1ede)
  - 🐞 Fix warning of `getDerivedStateFromProp`. [#11398](https://github.com/ant-design/ant-design/pull/11398) [@yoyo837](https://github.com/yoyo837)
- Drawer
  - 🐞 Fix close animation when setting `destroyOnClose`. [#11307](https://github.com/ant-design/ant-design/issues/11307)
  - 🐞 Fix display issue when using a `vw` value as `width`. [#11326](https://github.com/ant-design/ant-design/issues/11326)
  - 🐞 Fix `wrapClassName` now working.
- 🐞 Fix text overflow of Tooltip. [#11402](https://github.com/ant-design/ant-design/pull/11402) [@weidapao](https://github.com/weidapao)
- 🐞 Fix style issue of dark theme Menu in Layout.Header. [#11400](https://github.com/ant-design/ant-design/pull/11400) [@hongxuWei](https://github.com/hongxuWei)
- 🐞 Fix the arrow buttons of InputNumber showing wrong position in a fixed table. [#11408](https://github.com/ant-design/ant-design/issues/11408)
- 🐞 Fix issue resulting in Select.Option shows wrong border radius in Select.OptGroup. [6cb6f5c](https://github.com/ant-design/ant-design/commit/6cb6f5c83ed634e67d5b5d0816d11aa0788a74d8)
- 🐞 Fix issue resulting in `onChange` was trigged twice when click the filter icon of Table. [#11164](https://github.com/ant-design/ant-design/issues/11164) [@adybionka](https://github.com/adybionka)
- 🐞 Fix issue resulting title of Modal.confirm shows scrollbar on Firefox. [#11432](https://github.com/ant-design/ant-design/issues/11432)
- TypeScript
  - 🐞 Fix type definition of Radio.Group. [#11409](https://github.com/ant-design/ant-design/pull/11409) [@eddiemoore](https://github.com/eddiemoore)
  - 🐞 Fix type definition of TreeSelect. [#11442](https://github.com/ant-design/ant-design/pull/11442) [@JribiBelhassen](https://github.com/JribiBelhassen)
  - 🐞 Fix type definition of Badge. [#11421](https://github.com/ant-design/ant-design/pull/11421) [@zongzi531](https://github.com/zongzi531)

## 3.7.1

`2018-07-21`

- 🐞 Fix popup content can't display in Drawer component.[#11304](https://github.com/ant-design/ant-design/issues/11304)
- 🐞 Card using `tabList` support `disabled` prop.[#11212](https://github.com/ant-design/ant-design/issues/11212)
- 🐞 Fix Link of Anchor not sync when `href` update.[#11287](https://github.com/ant-design/ant-design/pull/11287/files) [@tangjinzhou](https://github.com/tangjinzhou)
- 🐞 Fix Menu component style.[#11299](https://github.com/ant-design/ant-design/issues/11299)
- 🐞 Fix Drawer component don't have animation when `destroyOnClose` is set.[#11307](https://github.com/ant-design/ant-design/issues/11307)
- 🐞 Fix DirectoryTree can't expand when `expandedKeys` is in control.[#11366](https://github.com/ant-design/ant-design/issues/11366)
- 🐞 Fix Button with Tooltip under ButtonGroup style issue when Button is `disabled`.[11321](https://github.com/ant-design/ant-design/pull/11321) [@tangjinzhou](https://github.com/tangjinzhou)

## 3.7.0

3.7.0 is a heavy update that brings a lot of exciting changes and new features. Here are some highlights ✨:

- 🌟 Add drawer component : [Drawer](https://ant.design/components/drawer-cn/). [#10791](https://github.com/ant-design/ant-design/pull/10791)
- 🌟 Add `Tree.DirectoryTree` component as the built-in directory tree. [#7749](https://github.com/ant-design/ant-design/issues/7749)

Component Fixes / Enhancements:

- Upgrade `rc-tree-select` to `2.0.5` for TreeSelect, refactored to fix the logic of the check.
  - 🌟 Add `autoClearSearchValue` prop to clear the value of search input when multiple select is selected or deselected. [10996](https://github.com/ant-design/ant-design/issues/10996)
  - 🌟 Add `searchValue` prop to set the value of search input. [6ff7dd8](https://github.com/ant-design/ant-design/commit/6ff7dd8fb953f079ee51ee638aaf4d832d0e10bf#diff-1e8e47abbdbe6e12d009aa61619ab22f)
  - 🌟 Add `maxTagCount` prop to set the max count of visible tags. [fb96c9d](https://github.com/ant-design/ant-design/commit/fb96c9db351e44a202f64f780470c6319a8a9626)
  - 🌟 Add `maxTagPlaceholder` prop to set the content when the tag is hidden. [fb96c9d](https://github.com/ant-design/ant-design/commit/fb96c9db351e44a202f64f780470c6319a8a9626)
  - 🌟 Search input now supports case sensitive search. [#10990](https://github.com/ant-design/ant-design/issues/10990)
  - 🗑 Remove `label` prop and use `title` prop instead in the `treeData`.
- Upgrade `rc-upload` to `2.5.0` for Upload.
  - 🌟 Add `directory` prop to support folder uploading. [#7315](https://github.com/ant-design/ant-design/issues/7315)
  - 🌟 `action` prop supports to be the a function which returns a Promise object. [fd96967](https://github.com/ant-design/ant-design/commit/fd96967c872600b79bb608e9ddf9f8c38814a704)
- Dropdown
  - 🌟 Provide default margin for icon in the menu item. [8e60a59](https://github.com/ant-design/ant-design/commit/8e60a591fd24f644de4f67d69c2210e9270be9cc)
  - 🌟 Be able to adjust the menu position for the trigger mode of `contextMenu` automatically. [16e4260](https://github.com/ant-design/ant-design/commit/16e42601d6772fc0830ee237a1e751a38a118676)
- Upgrade `rc-table` to `6.2.2` for Table. [f2fddff](https://github.com/ant-design/ant-design/commit/f2fddff3fd0d6b36e8e6d8ee06bfcbcc85ead4f0)
  - 🌟 Add `expanded` as the fourth param of `expandedRowRender` prop to get the expanded state of current row. [#10379](https://github.com/ant-design/ant-design/issues/10379)
  - 🌟 Add the ability to override the filter menu without the fully controlled component. [59cc3a8](https://github.com/ant-design/ant-design/commit/59cc3a8b6c643f7206feedf2dc2c7154296ba3e3) [@chrvadala](https://github.com/chrvadala)
  - 🌟 `filterIcon` prop supports to be a render function which returns ReactNode. [1af4392](https://github.com/ant-design/ant-design/commit/1af4392ae9fbdaa6fcfbf2f0de5413100ef4a84a)
  - 🐞 Fix the row dislocation problem when the column is fixed. [#10392](https://github.com/ant-design/ant-design/issues/10392)
- 🌟 Allow to pass `data-*`, `aria-*` and `role-*` props to the inner for Alert. [f0b684d](https://github.com/ant-design/ant-design/commit/f0b684de6a7c422f0de56e1ef72aeb35ab25a858)
- 🌟 Add `alt` prop for Avatar to set the text when the image is unable to display. [#10798](https://github.com/ant-design/ant-design/pull/10798)
- 🌟 Allow to pass `data-*`, `aria-*` and `role-*` props to the inner Input for DatePicker. [e63f9d4](https://github.com/ant-design/ant-design/commit/e63f9d4beb440de92c0b0ce8e6e83f7e24fef792)
- 🌟 Add `event` object as the second param of `onSearch` prop for Input.Search. [#11015](https://github.com/ant-design/ant-design/issues/11015)
- 🌟 Add `onBreakPoint` prop for Layout.Sider to be the callback function when breakpoint is triggered. [#10750](https://github.com/ant-design/ant-design/pull/10750) [@nuintun](https://github.com/nuintun)
- 🌟 Add `okButtonProps` prop to set the props of ok button and add `cancelButtonProps` prop to set the props of cancel button for Modal. [#10955](https://github.com/ant-design/ant-design/pull/10955) [@djyde](https://github.com/djyde)
- 🌟 Add `strokeColor` prop to set the color of progress bar for Progress. [#10725](https://github.com/ant-design/ant-design/issues/10725)
- 🌟 Add `buttonStyle` prop whose optional value is `outline` or `solid` to set the Radio.Group style. [60e3cfa](https://github.com/ant-design/ant-design/commit/60e3cfa37ac0dae3a895e74c1fe5351c54536a07#diff-c2ee8b5a368a121e9d2cc2661212045d)
- 🌟 Add `setDefaultIndicator` static function to set global indicator for Spin. [#10787](https://github.com/ant-design/ant-design/issues/10787)
- 🌟 Add `visible` prop to set the visibility for `Tag`. [4ac0277](https://github.com/ant-design/ant-design/commit/4ac027781372dda08a5458bc73836fbc14dfe51f)
- Upgrade `rc-tree` to `1.12.0` for Tree
  - 🌟 Add `loadedKeys` prop to set the loaded nodes, which usually works with loadData prop. [#10666](https://github.com/ant-design/ant-design/issues/10666)
  - 🌟 Add `onLoad` prop to be the callback function when all the nodes are loaded. [c488aca](https://github.com/ant-design/ant-design/commit/c488aca05e11d942d77c1b6bff45d12bbb1a2bd6)
- 🗑 Deprecate `combobox` value for `Select[mode]` and please replace it with `AutoComplete`. [53046a4](https://github.com/ant-design/ant-design/commit/53046a454ad83ca03dc313e63f56474ed1173002)
- 🐞 Cascader adds `fieldNames` and discards the misspelled `filedNames`. [#10896](https://github.com/ant-design/ant-design/issues/10896)
- 🐞 Fix Timeline dot not working with Tooltip. [0e3b67e](https://github.com/ant-design/ant-design/commit/0e3b67e9999d867cc304f3be61a8a042a2ab92ee)
- 🐞 Fix border radius when avatar has custom size. [e1e6523](https://github.com/ant-design/ant-design/commit/e1e6523452286ba56f20b73abad762a58ea7d7bc)

## 3.6.6

`2018-07-07`

- 🐞 Fix the style of the selected day for `DatePicker`. [#6146](https://github.com/ant-design/ant-design/issues/6146) [#9529](https://github.com/ant-design/ant-design/issues/9529)
- 🐞 Fix the style of the selected day for `DatePicker.RangePicker`. [004561b](https://github.com/ant-design/ant-design/commit/004561ba1f3b894dc164225e9e27b0a90679d15c)
- 🐞 Fix the alignment style wrapped by `Form.Item` for `Cascader`. [#9827](https://github.com/ant-design/ant-design/issues/9827) [#11133](https://github.com/ant-design/ant-design/issues/11133)
- 🐞 Fix the background style of the `handler` for `InputNumber`. [4aabc53](https://github.com/ant-design/ant-design/commit/4aabc5374497359e13a958ef81ae4569db6164a7)
- 🐞 Fix the header overflow in `FireFox` when the data is empty for `Table`. [#11135](https://github.com/ant-design/ant-design/issues/11135)

## 3.6.5

`2018-07-02`

- 🐞 Fixed wired `Transfer` repaint problem in IE or Edge. [#9697](https://github.com/ant-design/ant-design/issues/9697)
- 🐞 Fixed `Card` background overflow when zoom in chrome. [#9085](https://github.com/ant-design/ant-design/issues/9085)
- TypeScript
  - 🐞 Fixed `Table` incompatible type `size`. [bf5b6ae1](https://github.com/ant-design/ant-design/commit/bf5b6ae1f3b5da4629a7d10a2d1764eaa3fbbb04)
  - 🐞 Fixed `Select` missing showArrow option in types. [cde2a6b6](https://github.com/ant-design/ant-design/commit/cde2a6b6f011a5b3a367b3f58731def547bc98d8)
- 🐞 Add custom local support in `Pagination`. [babbbdd4](https://github.com/ant-design/ant-design/commit/babbbdd4e5c33ca050f8ee08969185c8d3269b4c)
- 🐞 Move max-width to ant-tooltip, so that it can be override by overlayStyle.maxWidth. [e2b359e9](https://github.com/ant-design/ant-design/commit/e2b359e9c3dae067eeba37a886f7896474c87e31)
- 🐞 Adjust `Select` mirror style to avoid to long string. [#11035](https://github.com/ant-design/ant-design/issues/11035)

## 3.6.4

`2018-06-23`

- 🐞 Fixed `Steps` theme `@process-icon-color`. [#10973](https://github.com/ant-design/ant-design/issues/10973)
- 🐞 Fixed style of RangePicker with preset ranges. [#10986](https://github.com/ant-design/ant-design/issues/10986)
- 🐞 Fixed `Dropdown` non-boolean attribute warning. [#7798](https://github.com/ant-design/ant-design/issues/7798)
- TypeScript
  - 🌟 Add `Tree` prop `className` definition. [#10950](https://github.com/ant-design/ant-design/issues/10950)
  - 🌟 Add `Tree` prop `selectable` definition. [3fb478e](https://github.com/ant-design/ant-design/commit/3fb478e743f3bad23dc300f501df11e5423468ba)

## 3.6.3

`2018-06-17`

- 🐞 Fixed that capitalized extension of Upload image url couldn't be recognized. [#10928](https://github.com/ant-design/ant-design/pull/10928) [@sliwey](https://github.com/sliwey)
- 🐞 Fixed missing border of InputNumber when browser is zoomed in. [#10562](https://github.com/ant-design/ant-design/issues/10562)
- 🐞 Fixed that fixed element inside Spin cannot be fixed. [#10196](https://github.com/ant-design/ant-design/issues/10196)
- 🐞 Fixed broken border style of small table. [#9754](https://github.com/ant-design/ant-design/issues/9754)
- 🐞 Fixed missing `className` prop of Table's `filterIcon`. [#10937](https://github.com/ant-design/ant-design/issues/10937)
- 🐞 Fixed that Affix `offsetTop` and `offsetBottom` cannot be updated. [#10874](https://github.com/ant-design/ant-design/issues/10874)
- TypeScript
  - 🐞 Fixed TreeSelect `TS2339` error. [#10868](https://github.com/ant-design/ant-design/issues/10868)
  - 🌟 Added Form arguments definitions of `validateMessages` and `onFieldsChange`.
  - 🌟 Improved Button prop definitions. [#10877](https://github.com/ant-design/ant-design/pull/10877) [@zheeeng](https://github.com/zheeeng)
  - 🌟 Added `backfill` prop for AutoComplete. [#10909](https://github.com/ant-design/ant-design/pull/10909) [@zhanba](https://github.com/zhanba)

## 3.6.2

`2018-06-09`

- 🐞 Fix the wrong status of check all checkbox in Table when data change. [#10629](https://github.com/ant-design/ant-design/issues/10629)
- 🐞 Fix border style of Button.Group.
- 🐞 Fix file list being reversed when `beforeUpload` returns `false` in Upload component. [#10681](https://github.com/ant-design/ant-design/issues/10681)
- 🐞 Fix overflow of cell content in Calendar. [#10808](https://github.com/ant-design/ant-design/pull/10808) [@Yangzhedi](https://github.com/ant-design/Yangzhedi)
- 🐞 Fix the processing color of Badge not follows the `primary-color`.
- Spin
  - 🐞 Fix custom icon does not follow the value of `size`. [#10786](https://github.com/ant-design/ant-design/issues/10786)
  - 🐞 Fix no `delay` issue when sets `spinning` to `true` as default.[#10727](https://github.com/ant-design/ant-design/pull/10727) [@dreamerblue](https://github.com/dreamerblue)
- TypeScript
  - 🐞 Fix Menu type definition. [#10773](https://github.com/ant-design/ant-design/issues/10773)
  - 🐞 Fix AutoComplete type definition. [#10745](https://github.com/ant-design/ant-design/issues/10745) [#10619](https://github.com/ant-design/ant-design/issues/10619)
  - 🐞 Fix Tree type definition. [#10841](https://github.com/ant-design/ant-design/pull/10841) [@Voronar](https://github.com/Voronar)
  - 🐞 Fix Checkbox.Group definition. [#10677](https://github.com/ant-design/ant-design/pull/10677)

## 3.6.0

`2018-06-02`

- 🌟 `Form`'s error message now can be customized with ReactNode. [#10136](https://github.com/ant-design/ant-design/issues/10136) [@lovekonakona](https://github.com/lovekonakona)
- 🌟 `List` support customized configuration for position of pagination. [#10581](https://github.com/ant-design/ant-design/pull/10581) [@zheeeng](https://github.com/zheeeng)
- 🌟 `Layout.Sider` now can be configured with `light` or `dark` theme. [#10142](https://github.com/ant-design/ant-design/issues/10142) [@pd4d10](https://github.com/pd4d10)
- 🌟 Ant Design official site now supports offline mode. [#10625](https://github.com/ant-design/ant-design/issues/10625)
- 🌟 `Transfer` adding `style` and `operationStyle` props for further customization. [@eduludi](https://github.com/eduludi)
- 🌟 `Message` adds a promised interface to handle callback. [#10421](https://github.com/ant-design/ant-design/issues/10421) [@zhujinxuan](https://github.com/zhujinxuan)
- 🐞 Fix compilation issue with typescript@v2.9.1 . [#10729](https://github.com/ant-design/ant-design/issues/10729) [@karol-majewski](https://github.com/karol-majewski)
- 🐞 Fix a bug in `Menu` where outer menu item not highlighting while inner item is selected. [#8666](https://github.com/ant-design/ant-design/issues/8666) [@stonehank](https://github.com/stonehank)
- 🐞 Affix `offsetBottom` not working. [#10674](https://github.com/ant-design/ant-design/issues/10674)

## 3.5.4

`2018-05-26`

- 🐞 Fix `showSearch` on `Cascader` not working.[968488a2](https://github.com/ant-design/ant-design/commit/968488a2fac9bcb16bee9f0c248f49bca00dbec6)
- 🐞 `Badge[status]` support `Tooltip`.[#10626](https://github.com/ant-design/ant-design/issues/10626)
- 🐞 Fix `text-align` on parent element affects `Spin`.[#10643](https://github.com/ant-design/ant-design/pull/10643) [@wmzhong](https://github.com/wmzhong)
- 💄 `Table` break line style change from `break-all` to `break-word`.[#10655](https://github.com/ant-design/ant-design/pull/10655) [@clinyong](https://github.com/clinyong)
- 🌟 When `Search` not define `enterButton`, click search icon will trigger `onSearch`. [36ffe7e1](https://github.com/ant-design/ant-design/commit/36ffe7e1dc9d9473c8c68168ab79b7a03a604702)

## 3.5.3

`2018-05-20`

- 🐞 Fix `Affix` with offsetTop === 0, value becomes `undefined` problem [#10566](https://github.com/ant-design/ant-design/pull/10566)
- 🐞 Fixed issue with shaded `Input.Group` component shadows[#10230](https://github.com/ant-design/ant-design/issues/10230)
- 🐞 Fixed issue where the `Transfer` component checkbox event fired twice [#10480](https://github.com/ant-design/ant-design/issues/10480)
- 💄 Unifying the name of the variable [12d3046](https://github.com/ant-design/ant-design/commit/12d3046687a0dcdb51fece08dd2bea64f185cc40)
- 💄 Fine-tuned the style of `Dropdown` [8e2f72f](https://github.com/ant-design/ant-design/commit/8e2f72ffe0eb300f5997296726b02246bf990c8f)
- 💄 The components of the Chinese document will now be demonstrated using Chinese language packages. [9b17a94](https://github.com/ant-design/ant-design/commit/9b17a943f5d57d40d65041b7b0c247add09d2851)
- 💄 The main theme switch was changed to `antd-theme-generato`, thanks to the work of [@mzohaibqc](https://github.com/mzohaibqc).
- TypeScript
  - 🐞 Fixed an issue with the type of gutter attribute in `Row` [b7d508e](https://github.com/ant-design/ant-design/commit/b7d508e1662bf20a0cacbe6440a2ce31a65a8a59)
  - 💄 Improved the `Form` component type [#10564](https://github.com/ant-design/ant-design/pull/10564)
  - 💄 Improved the `Button` and `Tag` types[1ed9fed](https://github.com/ant-design/ant-design/commit/1ed9fed2cf1c99b947359fafb101b2e58213cb48)

## 3.5.2

`2018-05-13`

- 🐞 Fixed `Table` filter doesn't work when click checkbox. [#10452](https://github.com/ant-design/ant-design/issues/10452)
- 🐞 Fixed `Cascader` displayRender z-index issue. [#10433](https://github.com/ant-design/ant-design/issues/10433)
- 🐞 Fixed `Button` Types of property 'ref' are incompatible. [#10405](https://github.com/ant-design/ant-design/issues/10405)
- 🐞 Fixed the height of `Form` item when checks position is dithered. [#10445](https://github.com/ant-design/ant-design/issues/10445)
- 🌟 Allow to use any CSS units for `Layout` width. [#10479](https://github.com/ant-design/ant-design/pull/10479)

## 3.5.1

`2018-05-09`

- 🐞 Fixed broken style of Input.Group under Form. [#10371](https://github.com/ant-design/ant-design/issues/10371)
- 🐞 Fixed overlay style of Select. [#10383](https://github.com/ant-design/ant-design/issues/10383)
- 🐞 Remove focused style of Collapse.
- 🐞 Remove unnecessary `z-index` of Input.Group and Checkbox. [#9840](https://github.com/ant-design/ant-design/issues/9840) [#10385](https://github.com/ant-design/ant-design/issues/10385)
- 🐞 Fixed that monospaced font family can't be bold.
- Table
  - 💄 Rewrote the editable table demo. [#10119](https://github.com/ant-design/ant-design/pull/10119)
  - 🐞 Fixed that table column overlay each other. [#9822](https://github.com/ant-design/ant-design/issues/9822)
- TypeScript
  - 🐞 Fixed Breadcrumb.Item type. [#10372](https://github.com/ant-design/ant-design/pull/10372) [@karol-majewski](https://github.com/karol-majewski)
  - 🐞 Fixed Table `rowSelection` type. [#10374](https://github.com/ant-design/ant-design/issues/10374)

## 3.5.0

`2018-05-04`

- 🌟 Add `title` prop to `Badge` that shows when hovering it. [74d81c2](https://github.com/ant-design/ant-design/commit/74d81c2d078a3c84b3e44cbfbdd99b8f479ea71d) [@ludwigbacklund](https://github.com/ludwigbacklund)
- 🌟 Add `successPercent` as `Progress[format]` argument. [#10096](https://github.com/ant-design/ant-design/issues/10096)
- 🌟 Update `rc-notification` to 3.1.0 so that `Notification` support set `maxCount`. [#10161](https://github.com/ant-design/ant-design/pull/10161) [@jzhangs](https://github.com/jzhangs)
- 🌟 Update `rc-cascader` to 1.13.0 so that `Cascader` support set `filedNames`. [react-component/cascader#23](https://github.com/react-component/cascader/pull/23) [@405go](https://github.com/405go)
- 🌟 Add ability to update `Notification` props by key. [react-component/notification#40](https://github.com/react-component/notification/pull/40) [@yevhen-hryhorevskyi](https://github.com/yevhen-hryhorevskyi)
- 🌟 `List` support pagination by default. [#10135](https://github.com/ant-design/ant-design/pull/10135)
- Table
  - 🌟 Column `sorter` function is passed `sortOrder` as param. [#10306](https://github.com/ant-design/ant-design/pull/10306) [@kumarashwin](https://github.com/kumarashwin)
  - 🐞 Fix merged header cell border. [#10359](https://github.com/ant-design/ant-design/issues/10359)
  - 🐞 Fix lost of user selection on data updates. [#10332](https://github.com/ant-design/ant-design/pull/10332) [@chrvadala](https://github.com/chrvadala)
- Menu upgrade `rc-menu` to `7.x` [#10305](https://github.com/ant-design/ant-design/pull/10305)
  - 🌟 Better aria-\* attributes support. [react-component/menu#137](https://github.com/react-component/menu/pull/137)
  - 🌟 Improve Menu performance by avoiding unnecessary updates. [react-component/menu#133](https://github.com/react-component/menu/pull/133)
  - 🌟 Support passing props through to MenuItem list item. [react-component/menu#135](https://github.com/react-component/menu/pull/135)
  - 🐞 Minor key shortcut bug fixes. [react-component/menu#132](https://github.com/react-component/menu/pull/132)
- Collapse
  - 🌟 Support custom `Collapse` styles with less. [#9943](https://github.com/ant-design/ant-design/pull/9943) [@davidhatten](https://github.com/davidhatten)
  - 🌟 Update `rc-collapse` to 1.9.0 to add `Collapse` keyboard support. [react-component/collapse#84](https://github.com/react-component/collapse/pull/84/) [@kossel](https://github.com/kossel)
- Select
  - 🐞 Fix type for `placeholder`. [#10282](https://github.com/ant-design/ant-design/pull/10282) [@thomasthiebaud](https://github.com/thomasthiebaud)
  - 🐞 Fix extra space taken up when arrow disabled. [#10296](https://github.com/ant-design/ant-design/pull/10296)
  - 🐞 Fix property `value` typescript type. [#10336](https://github.com/ant-design/ant-design/pull/10336) [@paranoidjk](https://github.com/paranoidjk)
- Input
  - 🐞 Fix `Input.Search` not disable enter button when disabled prop is true. [#10040](https://github.com/ant-design/ant-design/issues/10040)
  - 🐞 Fix `Input.Group` align issue in Form. [#10281](https://github.com/ant-design/ant-design/issues/10281)
- Form
  - 🐞 Fix typing for `Form.onValuesChange`. [#10231](https://github.com/ant-design/ant-design/pull/10231) [@whtsky](https://github.com/whtsky)
  - 🐞 Fix typescript interface `ComponentDecorator`. [#10324](https://github.com/ant-design/ant-design/pull/10324) [@paranoidjk](https://github.com/paranoidjk)
- 🐞 Fix dashed `Divider`. [#10216](https://github.com/ant-design/ant-design/issues/10216)
- 🐞 Fix `Spin` container interaction. [#10227](https://github.com/ant-design/ant-design/issues/10227)
- 🐞 Fix `Notification` icon hover color. [#10272](https://github.com/ant-design/ant-design/issues/10272)
- 🐞 Fix `Upload` property `lastModifiedDate` name. [#10315](https://github.com/ant-design/ant-design/pull/10315) [@danielg2002](https://github.com/danielg2002)
- 🐞 Fix `Button` props type, use `React.HTMLProps`. [#10229](https://github.com/ant-design/ant-design/pull/10229) [@whtsky](https://github.com/whtsky)
- 🐞 Fix less var naming convention. [#10275](https://github.com/ant-design/ant-design/issues/10275)

## 3.4.5

`2018-05-03`

- 🐞 Fix file object is empty and file name not showing in Upload. [#10319](https://github.com/ant-design/ant-design/issues/10319)

## 3.4.4

`2018-04-28`

- 🐞 Fix that Upload file in`onChange({ file })` is not a File instance introduced in `3.4.2`. [#10293](https://github.com/ant-design/ant-design/issues/10293)
- 🐞 Fix style lose bug when use tree shaking in webpack@4. [#10217](https://github.com/ant-design/ant-design/pull/10217) [@whtsky](https://github.com/whtsky)

## 3.4.3

`2018-04-23`

- 🐞 Fix style lose bug when use tree shaking in webpack@4. [#10197](https://github.com/ant-design/ant-design/pull/10197) [@Aladdin-ADD](https://github.com/Aladdin-ADD)
- 🐞 Fix `Menu` item's clickable region in dark theme. [#10187](https://github.com/ant-design/ant-design/pull/10187) [@dgeibi ](https://github.com/dgeibi)

## 3.4.2

`2018-04-22`

- 💄 Deployed site by [netlify](http://netlify.com/) to avoid blocking by GFW.
- 🐞 Fix TypeScript definitions of Menu, Tooltip, Card, Anchor, Avatar, Form, Tabs, Transfer, Tree, AutoComplete and etc.
- 💄 Added `sideEffects` to `package.json` for better Tree-Shaking. [#10043](https://github.com/ant-design/ant-design/pull/10043) [@Aladdin-ADD](https://github.com/Aladdin-ADD)
- List
  - 🐞 Fix extra border. [#10028](https://github.com/ant-design/ant-design/issues/10028)
  - 🐞 Fix extra prop warning of `locale`. [#10128](https://github.com/ant-design/ant-design/pull/10128) [@slonoed](https://github.com/slonoed)
- 🐞 Fix wrong preview image of Upload list when file.url contains url params. [#10102](https://github.com/ant-design/ant-design/issues/10102)
- 🐞 Fix Progress when percent is out of range. [0eb8357](https://github.com/ant-design/ant-design/commit/0eb835772dbaa7ed14babe03fc177821c5bd5ca5)
- Menu
  - 🐞 Fix arrow style of disabled SubMenu. [#10113](https://github.com/ant-design/ant-design/issues/10113)
  - 🐞 Fix that menu width is wrong when `collapsedWidth` is assigned as px string like `40px`. [#10140](https://github.com/ant-design/ant-design/issues/10140)
- 🐞 Fix that sometimes controlled input in Form cannot be edited. [#9790](https://github.com/ant-design/ant-design/issues/9790)
- 🐞 Fix padding jumping issue of loading Card. [#10052](https://github.com/ant-design/ant-design/pull/10052) [@zheeeng](https://github.com/zheeeng)
- 🐞 Fix that Avatar's fallback text don't scale as the text avatar does. [#10184](https://github.com/ant-design/ant-design/pull/10184)
- 🐞 Fix Table `getCheckboxProps` cannot be updated as expected. [#10133](https://github.com/ant-design/ant-design/issues/10133)
- 🐞 Fix CheckboxGroup `prefixCls` prop not passed to Checkbox. [#9950](https://github.com/ant-design/ant-design/issues/9950)

## 3.4.1

`2018-04-08`

- 🐞 Fix TypeScript type error caused by code error of Badge. [#9931](https://github.com/ant-design/ant-design/issues/9931)
- 💄 Improve clicking region of Card `actions`. [#9882](https://github.com/ant-design/ant-design/issues/9882)
- 🐞 Fix Divider style issue when used with float elements. [#9956](https://github.com/ant-design/ant-design/issues/9956)
- 🐞 Fix style issue of Form in advanced-search mode. [#9907](https://github.com/ant-design/ant-design/issues/9907)
- 🐞 Add `onHeaderRow` TypeScript type definitions for Table. [#9902](https://github.com/ant-design/ant-design/pull/9902) [@Nokecy](https://github.com/Nokecy)
- 💄 Improve the customized-icon demo of Tree. [#9893](https://github.com/ant-design/ant-design/pull/9893)
- 🐞 Fix image url display with non-image extension in Upload. [#9936](https://github.com/ant-design/ant-design/pull/9936)

## 3.4.0

`2018-04-01`

- Tree
  - 🛠 In this version, we refactored the underlying code of Tree to resolve some long living issues.
  - 🌟 Added `defaultExpandParent` for expanding parent at first render.
  - 🌟 Added `disabled` for disabling the whole tree.
  - 🌟 Added `TreeNode[icon]` to allow setting custom node icon.
  - 🌟 Improved the check logic for disabled TreeNode.
- 🌟 Anchor added `getContainer` for setting the container of scroll content.
- 🌟 Table added a new less variable `@table-expanded-row-bg`. [#9789](https://github.com/ant-design/ant-design/pull/9789)
- 🐞 Fixed a less syntax error. [#9832](https://github.com/ant-design/ant-design/pull/9832) [@jojoLockLock](https://github.com/jojoLockLock)
- 🐞 Fixed `moment.locale` invoking error in LocaleProvider. [#9853](https://github.com/ant-design/ant-design/pull/9853)
- 🐞 Fixed issue resulting in `style` of WeekPicker not works. [#9848](https://github.com/ant-design/ant-design/issues/9848)
- 🐞 Fixed type definition of Layout.Sider. [#9885](https://github.com/ant-design/ant-design/pull/9885) [@zachguo](https://github.com/zachguo)
- 💄 Improved style of Modal for long contents. [#9592](https://github.com/ant-design/ant-design/pull/9592)
- 🌟 Added new locale Slovenian.

## 3.3.3

`2018-03-25`

- Revert Upload `file` type change in previous version which causes breaking change.

## 3.3.2

`2018-03-24`

- 🐞 `Carousel`: Upgrade `react-slick` version to fix width calculation. [#3659](https://github.com/ant-design/ant-design/issues/3659)
- 💄 `Rate`: Adjust `disabled` style. [#9747](https://github.com/ant-design/ant-design/issues/9747)
- 💄 `Modal`: Adjust `confirm-modal` style to fix display issue when content use grid layout. [#9374](https://github.com/ant-design/ant-design/issues/9374)
- 💄 `Menu`: Adjust style to fix mouse trigger event region. [#9666](https://github.com/ant-design/ant-design/pull/9666) [@dgeibi](https://github.com/dgeibi)
- 🐞 `Upload`: Fix type of `file` on `beforeUpload` function. [#9775](https://github.com/ant-design/ant-design/issues/9775)
- 🐞 `Button`: Fix `two-chinese-words` space not re-calculate when text changed. [4502ad8](https://github.com/ant-design/ant-design/commit/4502ad8376e536c450fa4f27d2a5855be5a153e7)

## 3.3.1

`2018-03-18`

- 💄 Tweak danger button focus style.
- 🐞 Fix a show error when the value of enterButton is a button element. [#9639](https://github.com/ant-design/ant-design/issues/9639)
- 🐞 Fix missing key of `column.title` in Table .[#9658](https://github.com/ant-design/ant-design/issues/9658) [@terence55](https://github.com/terence55)
- 🐞 Fix `scroll: { x: true }` not working if `.ant-table-scroll table` width is `auto`. [#9704](https://github.com/ant-design/ant-design/pull/9704)
- 🐞 Fix when the helper message disappears, the input box will shake. [#8831](https://github.com/ant-design/ant-design/issues/8831)
- 🐞 Fix isMoment call in `TimePicker` will report error in parcel. [85c78e4](https://github.com/ant-design/ant-design/commit/85c78e49a91737c2841dc42621db21ca248b62b4)
- 🐞 Tweak `Table` border radius. [#9674](https://github.com/ant-design/ant-design/pull/9674)

## 3.3.0

`2018-03-12`

- 🌟 Add `afterClose` prop for `Alert` to achieve smooth unmount. [#9448](https://github.com/ant-design/ant-design/pull/9448) [@Hughen](https://github.com/Hughen)
- 🌟 Add `validRange` prop for `Calendar` to set the date range. [71f65a0](https://github.com/ant-design/ant-design/commit/71f65a0be8e72a67f334c57e79ae3ff5fb640630) [@Rohanhacker](https://github.com/Rohanhacker)
- 🌟 Add `defaultActiveTabKey` prop for `Card` to initial TabPane's active key. [30fe88d](https://github.com/ant-design/ant-design/commit/30fe88d4bdcec765bf92ca32a755d9646b36978e) [@u3u](https://github.com/u3u)
- `DatePicker`
  - 🌟 Add `dropdownClassName` prop to set the className of popup calendar. [#7211](https://github.com/ant-design/ant-design/issues/7211)
  - 🐞 Fix the error of resolving `moment` object. [#9539](https://github.com/ant-design/ant-design/pull/9539)
  - 🐞 Fix incorrect import of `turkish(tr_TR)` locale file. [#9373](https://github.com/ant-design/ant-design/issues/9373)
- 🌟 Add `orientation` prop for `Divider` to set the alignment of text in divider. [#9275](https://github.com/ant-design/ant-design/pull/9275) [@jrvboesch](https://github.com/jrvboesch)
- 🌟 Add `keyboard` prop for `Modal` to set whether Modal could be closed by `Esc` key. [#8818](https://github.com/ant-design/ant-design/issues/8818)
- 🌟 Improve the TypeScript definition of `event` param in `onChange` prop for `Radio` and `Checkbox`. [#9574](https://github.com/ant-design/ant-design/issues/9574)
- `Table`
  - 🌟 Add `position` prop in `pagination` prop to set the position of pagination. [#9357](https://github.com/ant-design/ant-design/pull/9357) [@kanweiwei](https://github.com/kanweiwei)
  - 🌟 Add event param of `onSelect` prop in `rowSelection` prop. [#9376](https://github.com/ant-design/ant-design/pull/9376) [@kanweiwei](https://github.com/kanweiwei)
  - 🌟 Add `columnWidth` prop in `rowSelection` prop to set the column width of selection. [#9474](https://github.com/ant-design/ant-design/pull/9474) [@SimpleFrontend](https://github.com/SimpleFrontend)
  - 🐞 Fix border radius issue in `Chrome` for `Table`. [af8e54f](https://github.com/ant-design/ant-design/commit/af8e54f1d6ac2891892e39b153cbe3e998370f61)
- 🌟 Add `pendingDot` prop for `Timeline` to set icon of ghost node. [#9546](https://github.com/ant-design/ant-design/pull/9546) [@SimpleFrontend](https://github.com/SimpleFrontend)
- 🌟 Add `inputReadOnly` prop for `TimePicker` to set if it's read only. [4a69446](https://github.com/ant-design/ant-design/commit/4a69446be155c1c176b18cb2c31459f999aa5d5e) [@JesperWe](https://github.com/JesperWe)
- 🌟 Add `dropdownClassName` prop for `TreeSelect`. [69b154f](https://github.com/ant-design/ant-design/commit/69b154f9a9cfa5f2d89a82b6ed730d4d8793de73) [56e4ce0](https://github.com/ant-design/ant-design/commit/56e4ce099d950601538d72243563021e8083776b)
- 🌟 Improve the preview for `Upload` when uploading the file of non-image format. [#9621](https://github.com/ant-design/ant-design/pull/9621) [@zswang](https://github.com/zswang)
- 🐞 Fix `successPercent` prop that cannot decide the success status for `Progress`. [#9382](https://github.com/ant-design/ant-design/issues/9382)
- 🐞 Fix font size for `Tabs`. [#9509](https://github.com/ant-design/ant-design/pull/9509)
- 🐞 Fix that disabled parent node cannot spread for `Tree` and `TreeSelect`. [#9539](https://github.com/ant-design/ant-design/pull/9539)

## 3.2.3

`2018-03-02`

- 🐞 Fix props `onPopupScroll` ts define in `Select`. [#9475](https://github.com/ant-design/ant-design/pull/9475) [@twobin](https://github.com/twobin)
- 🐞 Fix `Table` filter dropdown menu popup container. [#9209](https://github.com/ant-design/ant-design/issues/9209)
- 🐞 Fix `Timeline` head custom style error in chrome. [#9429](https://github.com/ant-design/ant-design/pull/9429) [@vthinkxie](https://github.com/vthinkxie)
- 🐞 Fix `Select` dropdown border. [82092c1](https://github.com/ant-design/ant-design/commit/82092c154ac1fa7ff2f89e1adbdf0aaf22e3ff53)
- 🐞 Fix compatibility with less 3. [#7850](https://github.com/ant-design/ant-design/issues/7850)
- 🐞 Fix `DatePicker.WeekPicker` year. [#9463](https://github.com/ant-design/ant-design/issues/9463)
- 🐞 Fix `Button.Group` align issue in chrome. [#9457](https://github.com/ant-design/ant-design/issues/9457)

## 3.2.2

`2018-02-24`

- 🌟 Add font-family variable for `Pagination`. [#9351](https://github.com/ant-design/ant-design/issues/9351)
- 🌟 Add font-weight variable for `Badge`. [#9352](https://github.com/ant-design/ant-design/issues/9352)
- 🐞 Fix table custom spin indicator. [#9355](https://github.com/ant-design/ant-design/issues/9355)
- 🐞 Fix `Form.create`. [#9331](https://github.com/ant-design/ant-design/issues/9331)
- 🐞 Revert typescript definition of `column.dataIndex`. [#9393](https://github.com/ant-design/ant-design/issues/9393)
- 🐞 Fix last menu item in Sider could be blocked by collapse trigger. [#9398](https://github.com/ant-design/ant-design/issues/9398) [@MJ111](https://github.com/MJ111)
- 🐞 Fix badge works wrong in dot mode. [#9359](https://github.com/ant-design/ant-design/issues/9359) [@khayalan-mathew](https://github.com/khayalan-mathew)

## 3.2.1

`2018-02-11`

- 🌟 Add icons of some famous products. [c04377e5](https://github.com/ant-design/ant-design/commit/c04377e5413d344b37c34ceac6fee456933fa516)
- Mention
  - 🌟 `multiLines` mode will support autosize.
  - 🐞 Fix paste not working when `placeholder` is specified. [#9215](https://github.com/ant-design/ant-design/issues/9215)
- Table
  - 🐞 Fix padding of middle size table. [#9319](https://github.com/ant-design/ant-design/issues/9319)
  - 🐞 Fix border bug of small size table. [#8980](https://github.com/ant-design/ant-design/issues/8980)
  - 🐞 Fix overflow issue of sort icon interactive area. [#8979](https://github.com/ant-design/ant-design/issues/8979)
  - 🌟 Improve typescript definition of `column.dataIndex`. [#9298](https://github.com/ant-design/ant-design/pull/9298) [@clinyong](https://github.com/clinyong)
- Select
  - 🐞 Fix wrong scroll position when navigating active item with keyboard. [#9276](https://github.com/ant-design/ant-design/issues/9276)
  - 🐞 Fix arrow position in IE11.
- 🐞 Fix issue that file item showing `uploading` when Upload `beforeUpload` return false. [#8020](https://github.com/ant-design/ant-design/issues/8020)
- 🐞 Fix misplace of feedback icon of `vertical` layout Form. [#9153](https://github.com/ant-design/ant-design/issues/9153)
- 🐞 Fix loading style missing of empty children Card. [#9258](https://github.com/ant-design/ant-design/issues/9258)
- 🐞 Fix background color of Avatar when image source is not existed. [#9278](https://github.com/ant-design/ant-design/pull/9278) [@andriijas](https://github.com/andriijas)
- 🐞 Fix RangePicker `Cannot read property 'locale' of undefined` error when select end date. [#9267](https://github.com/ant-design/ant-design/issues/9267)
- 🐞 Fix style problem when using disabled button with Tooltip inside ButtonGroup. [#9296](https://github.com/ant-design/ant-design/issues/9296) [#9296](https://github.com/ant-design/ant-design/issues/9296)
- 🐞 Fix z-index of Dropdown's submenu. [#9218](https://github.com/ant-design/ant-design/issues/9218)

## 3.2.0

`2018-02-04`

- 🌟 Add new `tabBarGutter` prop to Tab to allow setting gutter between tabs. [#8644](https://github.com/ant-design/ant-design/pull/8644) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- 🌟 Add new `hasSider` prop to Layout to avoid render error when server rendering. [#8937](https://github.com/ant-design/ant-design/issues/8937)
- 🌟 Add new `successPercent` to Progress to allow showing two phases. [Demo](https://ant.design/components/progress/#components-progress-demo-segment)
- 🌟 Add new `iconType` prop to Alert to allow setting icon type. [#8811](https://github.com/ant-design/ant-design/pull/8811) [@minwe](https://github.com/ant-design/ant-design/pull/8811)
- 🌟 Add `id` prop to DatePicker. [#8598](https://github.com/ant-design/ant-design/pull/8598) [@mgrdevport](https://github.com/mgrdevport)
- 🌟 Add new `forceRender` prop to Collapse to allow rendering hide panel. [#9192](https://github.com/ant-design/ant-design/pull/9192) [#Pyroboomka](https://github.com/ant-design/ant-design/pull/9192) [@paulcmason](https://github.com/react-component/collapse/pull/82)
- RangePicker
  - 🌟 Improve `ranges` prop to allow passing function to it. [#8281](https://github.com/ant-design/ant-design/issues/8281)
  - 🐞 Fix issue resulting in can not input start date manually. [#6999](https://github.com/ant-design/ant-design/issues/6999)
  - 🐞 Fix issue resulting date panel being closed without animation when click on the preset range. [#6364](https://github.com/ant-design/ant-design/issues/6364)
  - 🐞 Fix issue resulting `onOk` is not being trigged, when click on the preset range. [#7747](https://github.com/ant-design/ant-design/issues/7747)
- Select
  - 🌟 Improve `onChange`, `onDeselect`, they will receive selected `Option` as second parameter.
  - 🐞 Fix issue resulting in `onSelect` is not trigged when using automatic tokenization. [#9094](https://github.com/ant-design/ant-design/issues/9094)
  - 🐞 Fix the missing scrollbar in Chrome.
- 🌟 Improve Table's `rowSelection[getCheckboxProps]` prop, now the all the properties returned by `getCheckboxProps` will be passed to checkbox. [#9054](https://github.com/ant-design/ant-design/pull/9054) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9054)
- 🐞 Fix issue resulting in Calendar's `mode` not being allowed to be changed from outside. [#9243](https://github.com/ant-design/ant-design/pull/9243) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9243)
- 🐞 Fix issue resulting AutoComplete showing wrong border when showing validation message.[9f2b490](https://github.com/ant-design/ant-design/commit/9f2b4905f09fca503da7a8bb5f2b8347bea663b7)
- 🐞 Fix issue resulting in DatePicker showing wrong time in the control mode. [#8885](https://github.com/ant-design/ant-design/issues/8885)
- 🐞 Fix issue resulting in TextArea showing wrong height in Edge. [#9108](https://github.com/ant-design/ant-design/pull/9108) [@cuyl](https://github.com/cuyl)
- 🐞 Fix issue resulting in Tabs showing wrong tab style when using `type="card"` combine with `tabPosition="bottom"`. [#9165](https://github.com/ant-design/ant-design/pull/9165) [@ryanhoho](https://github.com/ryanhoho)
- 🌟 Add new Kurdish locale.

## 3.1.6

`2018-01-28`

- 🐞 Revert [#9141](https://github.com/ant-design/ant-design/pull/9141) since it causes year and month can not be selected in DatePicker.

## 3.1.5

`2018-01-27`

- 🐞 Fix Select Options were disappeared when click the scrollbar in IE11. [#7934](https://github.com/ant-design/ant-design/issues/7934) [@tianlang89757](https://github.com/tianlang89757)
- 🐞 Fix Form `getFieldDecorator` referenced item will conflicted when using the same id. [#9103](https://github.com/ant-design/ant-design/issues/9103) [#7351](https://github.com/ant-design/ant-design/issues/7351)
- 🐞 Fix RangePicker i18n issue which will shown the last language when change the language. [#8970](https://github.com/ant-design/ant-design/issues/8970)
- 🐞 Fix DatePicker shown wrong in the control mode. [#8885](https://github.com/ant-design/ant-design/issues/8885)
- 🐞 Fix Table shown emptyText when loading state. [#9095](https://github.com/ant-design/ant-design/pull/9095) [@sallen450](https://github.com/sallen450)
- 🐞 Add Icon `file-word`. [#9092](https://github.com/ant-design/ant-design/issues/9092) [#9061](https://github.com/ant-design/ant-design/issues/9061)
- 🐞 Fix wrong font family. [commit/506f97](https://github.com/ant-design/ant-design/commit/506f97640ec34a6d3d9fdb18e8036e5d34796a5f)
- 📖 Add some TypeScript type definitions
  - Add `duration` for Notification. [pull/9120](https://github.com/ant-design/ant-design/pull/9120) [@duhongjun](https://github.com/duhongjun)
  - Add `style` for Steps. [pull/9126](https://github.com/ant-design/ant-design/pull/9126) [@wanliyunyan](https://github.com/wanliyunyan)
- 🌟 Optimize Avatar default background color. [commit/275946](https://github.com/ant-design/ant-design/commit/275946090823ab8da90f1871976c671b2c7ac851)
- 🌟 Add the less variable for Slider and Menu. [pull/9065](https://github.com/ant-design/ant-design/pull/9065) [pull/9115](https://github.com/ant-design/ant-design/pull/9115) [@mrgeorgegray](https://github.com/mrgeorgegray)

## 3.1.4

`2018-01-21`

- 🐞 Fix ButtonGroup z-index issue. [#9014](https://github.com/ant-design/ant-design/issues/9014)
- 🐞 Fix Dropdown.Button can not be fully disabled. [#8991](https://github.com/ant-design/ant-design/issues/8991) [@sallen450](https://github.com/sallen450)
- 🐞 Fix Layout error responsive docs. [#8995](https://github.com/ant-design/ant-design/pull/8995) [@ReedSun](https://github.com/ReedSun)
- 🐞 Fix List `grid` do not support xxl. [#9019](https://github.com/ant-design/ant-design/issues/9019)
- 🐞 Fix RangePicker can not cancel selected start date when the panel is closed. [#8839](https://github.com/ant-design/ant-design/issues/8839)
- 🐞 Fix Tabs error margin. [commit/200d6c](https://github.com/ant-design/ant-design/commit/200d6cb11aba12a488510f957353bbd5bd1dcd1b)
- 🐞 Fix WeekPicker shows error weeks. [#9021](https://github.com/ant-design/ant-design/issues/9021)
- 🐞 Fix some TypeScript type definitions.
  - Add `subMenuCloseDelay` and `subMenuOpenDelay` for Menu. [#8976](https://github.com/ant-design/ant-design/issues/8976) [@Rohanhacker](https://github.com/Rohanhacker)
  - Refactor DatePicker types. [commit/0bb531](https://github.com/ant-design/ant-design/commit/0bb531aca6cb2045d5323196a599c925537a4eb0)
  - Fix Input `maxLength` type definitions. [#9046](https://github.com/ant-design/ant-design/pull/9046) [@Riokai](https://github.com/Riokai)
- 🌟 Add some new less variables.
  - About Checkbox and Radio: [#9003](https://github.com/ant-design/ant-design/pull/9003) [@mrgeorgegray](https://github.com/mrgeorgegray)
  - About Breadcrumb: [#9022](https://github.com/ant-design/ant-design/pull/9022) [@mrgeorgegray](https://github.com/mrgeorgegray)
- 🌟 Add aliyun icon.

## 3.1.3

`2018-01-14`

- 🐞 Fix error when passing `null` `locale` to LocaleProvider.

## 3.1.2

`2018-01-13`

- 🐞 Fix Button can not display `0`. [#8733](https://github.com/ant-design/ant-design/pull/8733) [@Cuihongsen](https://github.com/Cuihongsen)
- 🐞 Fix extra scrollbar in Table and List caused by Spin. [#8799](https://github.com/ant-design/ant-design/issues/8799)
- 🐞 Fix can not pass function to Table[emptyText]. [#8871](https://github.com/ant-design/ant-design/issues/8871)
- 🐞 Fix now working Dropdown[transitionName].
- 🐞 Fix issue resulting in font changes when enter number in Input.[#8636](https://github.com/ant-design/ant-design/issues/8636)
- 🐞 Fix issue resulting in wrong locale text when import multiple locale files. [#8785](https://github.com/ant-design/ant-design/pull/8785)
- 🐞 Fix `locales` in dist/antd-with-locales.js has a `extra` default key. [#8881](https://github.com/ant-design/ant-design/issues/8881)
- 🐞 Fix some TypeScript type definitions. [4cc29bc](https://github.com/ant-design/ant-design/commit/4cc29bc11cf7c019c63a25693adff3dbb58b41c3) [693e734](https://github.com/ant-design/ant-design/commit/693e734a82b5e1faf25b025127afca67e75f9c88) [67e956d](https://github.com/ant-design/ant-design/commit/67e956dddd040f63b2a59b8b619123bbb0065780) [ecd4177](https://github.com/ant-design/ant-design/commit/ecd4177638da1eac3a3750fe5ad68b9309865542) [33119ec](https://github.com/ant-design/ant-design/commit/33119ec535e7b819541d4753464871988b37dd6f) [88e0c9b](https://github.com/ant-design/ant-design/commit/88e0c9b436f196def62e737ea72e105aba4b5d4e)
- 🌟 Add some new less variables [b9b5aba](https://github.com/ant-design/ant-design/commit/b9b5abab3364bf752e9644415088b142a153e385) [5931b20](https://github.com/ant-design/ant-design/commit/5931b201da58e993227a04128045e627f2b65c46) [c9d7397](https://github.com/ant-design/ant-design/commit/c9d73978dd2694f9d2bd0111f82a20d237f83621)
- 🌟 Optimize Chinese quotes displaying.

## 3.1.1

`2018-01-08`

- 📖 Published the new site and design guideline.
- 📖 Updated the guideline of real project with dva to [roadhog 2.0](https://github.com/sorrycc/blog/issues/55). [5dcf1c0](https://github.com/ant-design/ant-design/commit/5dcf1c015fc2674adb09434bf766549d6f3f0022)
- 📖 Published the new sketch resource of Ant Design 3.0. [22dfe88](https://github.com/ant-design/ant-design/commit/22dfe88ab043c1e116382fc96b7d78cabf125054)
- 🐞 Fix contextMenu event for trigger prop in the TypeScript definition of Dropdown. [#8646](https://github.com/ant-design/ant-design/issues/8646) [@cjahv](https://github.com/cjahv)
- 🐞 Fix HOC in Button not inserted space between Chinese words.
- 🐞 Fix the style compatibility in IE 11 for List Component. [#8784](https://github.com/ant-design/ant-design/issues/8784)
- 🐞 Fix notFoundContent prop not working for Select Component. [#8809](https://github.com/ant-design/ant-design/issues/8809)
- 🐞 Fix the warning for BackTop Component in React 16. [#8848](https://github.com/ant-design/ant-design/issues/8848)
- 🐞 Fix unexpected scrollbar for List Component when setting gutter. [#8799](https://github.com/ant-design/ant-design/issues/8799)
- 🐞 Fix to support complete href link for Anchor.Link Component. [#8808](https://github.com/ant-design/ant-design/issues/8808)
- 🌟 Optimize the font family of Chinese quote. [c6fcc31](https://github.com/ant-design/ant-design/commit/c6fcc3121758dfe6ac5b50c1b55790eb42b805c5)

## 3.1.0

`2017-12-29`

Happy 2018 !~ 2018 2018 2018 coming!~~~

- 🐞 Fix ant-spin-container overflow resizing for Spin component. [#8602](https://github.com/ant-design/ant-design/issues/8602) [@jhsu](https://github.com/jhsu)
- 🐞 Fix extra padding in Table small with fixed columns. [#8724](https://github.com/ant-design/ant-design/issues/8724)
- 🐞 Fix Checkbox.Group align issue in Form. [#8739](https://github.com/ant-design/ant-design/issues/8739)
- 🐞 Fix unexpected scrollbar in Affix. [#8606](https://github.com/ant-design/ant-design/issues/8606)
- 🐞 Fix List component "No Data" mixed with loading. [#8647](https://github.com/ant-design/ant-design/issues/8647)
- 🌟 Add onKeyUp TypeScript definition to Input component. [#8705](https://github.com/ant-design/ant-design/issues/8705) [@delesseps](https://github.com/delesseps)
- 🌟 Add `showArrow` for disabling arrow icon in collapse panel. [#8536](https://github.com/ant-design/ant-design/pull/8536) [@apieceofbart](https://github.com/apieceofbart)
- 🌟 Rate add `allowClear` for reset when click again. [#8627](https://github.com/ant-design/ant-design/issues/8627)
- 🌟 Add responsive for BackTop. [#8719](https://github.com/ant-design/ant-design/issues/8719) [@JetRunner](https://github.com/JetRunner)
- 🌟 Add `destroyOnClose` to Modal component to support unmount child components on onClose. [#8769](https://github.com/ant-design/ant-design/pull/8769) [@Rohanhacker](https://github.com/Rohanhacker)
- 🌟 Pagination add `hideOnSinglePage` for support hide it when only one page. [#8615](https://github.com/ant-design/ant-design/pull/8615) [@camsong](https://github.com/camsong)
- 🌟 Support customize spin for List component.
- 👻 Support open official demo in CodeSandbox.

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
- 🐞 Fix Popover arrow position and size cannot be overridden by less variable. [#8548](https://github.com/ant-design/ant-design/issues/8548) [#8549](https://github.com/ant-design/ant-design/issues/8549)
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

- Remove useless DOM wrapper of Card, so that Card's DOM structure will be the same as Card of 2.x.
- Fix that missing `antd/lib/style/v2-compatible-reset.css`. [28d13e2](https://github.com/ant-design/ant-design/commit/28d13e2539817f87b8a2029ea22d9c30b377167f)
- Fix that Affix will be overlap when it is higher than viewport. [31a0654](https://github.com/ant-design/ant-design/commit/31a0654ef990eb7bae2b18095fa0d5230b9be1da)
- Fix the open animation of Collapse. [edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
- Fix the alignment of large size Input and Button in Form. [#8459](https://github.com/ant-design/ant-design/issues/8459)
- Menu
  - Fix the popup will disappear unexpectedly in Safari. [#8453](https://github.com/ant-design/ant-design/issues/8453)
  - Fix the open animation. [edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
- Fix compile error of style of Notification. [#8437](https://github.com/ant-design/ant-design/issues/8437)
- Fix the background color of mini Pagination. [e13c6d8](https://github.com/ant-design/ant-design/commit/e13c6d87fa6bf7d5cf4b2d5154a85b4793997de5)
- Table
  - Fix broken style in mobile. [#8465](https://github.com/ant-design/ant-design/issues/8465)
  - Fix broken style when use size and nested Table together. [#8525](https://github.com/ant-design/ant-design/issues/8525)
- TypeScript
  - Fix TypeScript definition of AutoComplete. [#8383](https://github.com/ant-design/ant-design/pull/8383) [@nidhi-ag](https://github.com/nidhi-ag)
  - Fix TypeScript definition of Divider. [#8504](https://github.com/ant-design/ant-design/pull/8504) [@cyyyu](https://github.com/cyyyu)
  - Fix TypeScript definition of Dropdown. [#8444](https://github.com/ant-design/ant-design/issues/8444)
  - Fix TypeScript definition of List. [e27061e](https://github.com/ant-design/ant-design/commit/e27061ea5b2f2d3273b45862d9b87285448f0998) [1b2a955](https://github.com/ant-design/ant-design/commit/1b2a9550d9595dd2f31f79d1bdd52695ec792692)
  - Fix TypeScript definition of Table. [#8507](https://github.com/ant-design/ant-design/issues/8507) [#8515](https://github.com/ant-design/ant-design/pull/8515) [@danedavid](https://github.com/danedavid)

## 3.0.0

`2017-12-04`

Learn more in the [Ant Design 3.0 announcement post](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c).

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

### ⚠️ Read it before migration

- We suggest you upgrade to latest 3.x version directly.
- Some APIs may be deprecated in other 3.x versions which don't described below, please pay attention to warning in browser console and upgrade them.
- We strongly suggest upgrade react to 16 or newest for better support and performance, which could be conduct via [React 16 upgrading](https://reactjs.org/blog/2017/09/26/react-v16.0.html#upgrading).
- Then you can migrate to antd@3 by following `Breaking Changes` section.

### Breaking Changes

We provide a [migration tool](https://github.com/ant-design/antd-migration-helper) to help you find deprecated usages in your codebase.

- Card's `noHovering` has been renamed to `hoverable`, and its default value now is `true`.
- Added new Grid breakpoints. [#7230](https://github.com/ant-design/ant-design/pull/7230)
- Form `getFieldDecorator`'s `exclusive` option has been removed.
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
  import 'antd/es/style/v2-compatible-reset';
  ```

  Or use less

  ```less
  @import '~antd/es/style/v2-compatible-reset.less';
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

- 🌟 Tabs added new size `size="large"`.
- 🌟 Row's `gutter` now support responsive setting, you can write `gutter={{ sm: 16, lg: 32 }}`.
- 🌟 Spin added new `indicator` prop to allow setting custom indicator. [#7977](https://github.com/ant-design/ant-design/pull/7977) [@kossel](https://github.com/ant-design/ant-design/pull/7977)
- 🌟 Input.Search added new `enterButton` prop to allow setting custom search button.[#7596](https://github.com/ant-design/ant-design/issues/7596)
- 🌟 Mention added new `placement` prop to allow setting the popup direction.
- 🌟 Carousel added new `next()`, `prev()`, `goTo(slideNumber)` methods to allow controlling slides programmatically.
- 🌟 Button added link support, Button with `href` prop will render to `<a>`. [#8343](https://github.com/ant-design/ant-design/pull/8343)
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
  - 🌟 `status` can use with `children` now. [#8164](https://github.com/ant-design/ant-design/issues/8164)
- Card
  - 🌟 Added new `inner` type. [Demo](https://ant.design/components/card/#components-card-demo-inner).
  - 🌟 Added `cover`, `actions` and a new `Meta` component. [Demo](https://ant.design/components/card/#components-card-demo-meta).
- DatePicker
  - 🌟 Added `mode` and `onPanelChange`, to allow controlling the panel mode. [Demo](https://ant.design/components/date-picker/#components-date-picker-demo-mode).
  - 🌟 Added `WeekPicker` component. [Demo](https://ant.design/components/date-picker/#components-date-picker-demo-basic)
  - 🌟 Added new `dateRender` prop to allow customizing date cell.
- TimePicker
  - 🌟 Added new `hourStep`, `minuteStep`, `secondStep` props to allow customizing time steps. [Demo](https://ant.design/components/time-picker/#components-time-picker-demo-interval-options)
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

    <Table components={components} columns={columns} data={data} />;
    ```

  - 🌟 Added new `onRow` prop to allow passing custom props to table body row.
  - 🌟 Added new `onHeaderRow` props to allow passing custom props to table header row.
  - 🌟 Added `column[onCell]` to allow passing custom props to table body cell.
  - 🌟 Added `column[onHeaderCell]` to allow passing custom props to table header cell.
  - 🌟 Added `column[align]` to allow setting how text aligns.
  - 🌟 Added `column[defaultSortOrder]` to allow setting default sort order. [#8111](https://github.com/ant-design/ant-design/pull/8111) [@megawac](https://github.com/megawac)
  - 🌟 Added `rowSelection[fixed]` to allow fixing the selection column.
  - 🙅 Deprecated `getBodyWrapper`, please use `components` instead.
  - 🙅 Deprecated `onRowClick`, `onRowDoubleClick`, `onRowContextMenu`, `onRowMouseEnter`, `onRowMouseLeave`, please use `onRow` instead.
    ```javascript
    <Table
      onRow={record => ({
        onClick: () => {},
        onDoubleClick: () => {},
        onContextMenu: () => {},
        onMouseEnter: () => {},
        onMouseLeave: () => {},
      })}
    />
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
