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
* Major version release is not included in this schedule for breaking change and new features.

---

## 3.3.3

`2018-03-25`

- Revert Upload `file` type change in previous version  which causes breaking change.

## 3.3.2

`2018-03-24`

- 🐞 `Carousel`: Upgrade `react-slick` version to fix width calculation. [#3659](https://github.com/ant-design/ant-design/issues/3659)
- 💄 `Rate`: Adjust `disabled` style. [#9747](https://github.com/ant-design/ant-design/issues/9747)
- 💄 `Modal`: Adjust `confirm-modal` style to fix multiple line display issue. [#9374](https://github.com/ant-design/ant-design/issues/9374)
- 💄 `Menu`: Adjust style to fix mouse trigger event region. [#9666](https://github.com/ant-design/ant-design/pull/9666) [@dgeibi](https://github.com/dgeibi)
- 🐞 `Upload`: Fix type of `file` on `beforeUpload` function. [#9775](https://github.com/ant-design/ant-design/issues/9775)
- 🐞 `Button`: Fix `two-chinese-words` space not re-calculate when text changed. [4502ad8](https://github.com/ant-design/ant-design/commit/4502ad8376e536c450fa4f27d2a5855be5a153e7)

## 3.3.1

`2018-03-18`

- 💄 Tweak danger button focus style.
- 🐞 Fix a show error when the value of enterButton is a button element.  [#9639](https://github.com/ant-design/ant-design/issues/9639)
- 🐞 Fix missing key of `column.title` in Table .[#9658](https://github.com/ant-design/ant-design/issues/9658) [@terence55](https://github.com/terence55)
- 🐞 Fix `scroll: { x: true }` not working if `.ant-table-scroll table` width is `auto`. [#9704](https://github.com/ant-design/ant-design/pull/9704)
- 🐞 Fix when the helper message disappears, the input box will shake.  [#8831](https://github.com/ant-design/ant-design/issues/8831)
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
    - 🐞 Fix uncorrect import of `turkish(tr_TR)` locale file. [#9373](https://github.com/ant-design/ant-design/issues/9373)
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
- 🐞 Fix loading style missing of empty childen Card. [#9258](https://github.com/ant-design/ant-design/issues/9258)
- 🐞 Fix background color of Avatar when image source is not existe. [#9278](https://github.com/ant-design/ant-design/pull/9278) [@andriijas](https://github.com/andriijas)
- 🐞 Fix RangePicker `Cannot read property 'locale' of undefined` error when select end date. [#9267](https://github.com/ant-design/ant-design/issues/9267)
- 🐞 Fix style problem when using disabled button with Tooltip inside ButtonGroup. [#9296](https://github.com/ant-design/ant-design/issues/9296) [#9296](https://github.com/ant-design/ant-design/issues/9296)
- 🐞 Fix z-index of Dropdown's submenu. [#9218](https://github.com/ant-design/ant-design/issues/9218)

## 3.2.0

`2018-02-04`

- 🌟 Add new `tabBarGutter` prop to Tab to allow setting gutter between tabs. [#8644](https://github.com/ant-design/ant-design/pull/8644) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- 🌟 Add new `hasSider` prop to Layout to avoid render error when server rendering. [#8937](https://github.com/ant-design/ant-design/issues/8937)
- 🌟 Add new `successPercent` to Progress to allow showing two phases. [Demo](https://ant.design/components/progress/#components-progress-demo-segment)
- 🌟 Add new `iconType` prop to Alert to allow settting icon type. [#8811](https://github.com/ant-design/ant-design/pull/8811) [@minwe](https://github.com/ant-design/ant-design/pull/8811)
- 🌟 Add `id` prop to DatePicker. [#8598](https://github.com/ant-design/ant-design/pull/8598) [@mgrdevport](https://github.com/mgrdevport)
- 🌟 Add new `forceRender` prop to Collapse to allow rendering hide panel. [#9192](https://github.com/ant-design/ant-design/pull/9192) [#Pyroboomka](https://github.com/ant-design/ant-design/pull/9192) [@paulcmason](https://github.com/react-component/collapse/pull/82)
- RangePicker
  - 🌟 Improve `ranges` prop to allow passing function to it. [#8281](https://github.com/ant-design/ant-design/issues/8281)
  - 🐞 Fix issue resulting in can not input start date manually. [#6999](https://github.com/ant-design/ant-design/issues/6999)
  - 🐞 Fix issue resulting date panel being closed without animation when click on the preset range. [#6364](https://github.com/ant-design/ant-design/issues/6364)
  - 🐞 Fix issue resulting `onOk` is not being trigged, when click on the preset range. [#7747](https://github.com/ant-design/ant-design/issues/7747)
- Select
  - 🌟 Improve `onChange`、`onDeselect`, they will receive selected `Option` as second paramteter.
  - 🐞 Fix issue resulting in `onSelect` is not trigged when using automatic tokenization. [#9094](https://github.com/ant-design/ant-design/issues/9094)
  - 🐞 Fix the missing scrollbar in Chrome.
- 🌟 Improve Table's `rowSelection[getCheckboxProps]` prop, now the all the properties returned by `getCheckboxProps` will be passed to checkbox. [#9054](https://github.com/ant-design/ant-design/pull/9054) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9054)
- 🐞 Fix issue resulting in Calendar's `mode` not being allowed to be changed from outside. [#9243](https://github.com/ant-design/ant-design/pull/9243) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9243)
- 🐞 Fix issue resulting AutoComplete showing wrong border when showing validattion message.[9f2b490](https://github.com/ant-design/ant-design/commit/9f2b4905f09fca503da7a8bb5f2b8347bea663b7)
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
- 🌟 Add the less variable for Slider and Menu. [pull/9065](https://github.com/ant-design/ant-design/pull/9065) [pull/9115](https://github.com/ant-design/ant-design/pull/9115)  [@mrgeorgegray](https://github.com/mrgeorgegray)

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
- 🐞 Fix HOC in Button not inserted space between chinese words.
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
- 🌟 Add `destroyOnClose` to Modal component to support unmount child compenents on onClose. [#8769](https://github.com/ant-design/ant-design/pull/8769) [@Rohanhacker](https://github.com/Rohanhacker)
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

    <Table components={components} columns={columns} data={data} />
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
