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

## 3.9.2

`2018-09-08`

- 🐞 Title of children `Card` under `Card` using `tab-card` has wrong padding.[#12083](https://github.com/ant-design/ant-design/issues/12083)
- 🐞 Fix `AutoComplete` using `TextArea` as input, height adjust by manual has time delay.[#12117](https://github.com/ant-design/ant-design/issues/12117)
- 🐞 Fix `maskStyle` under `Drawer` not working.[#12125](https://github.com/ant-design/ant-design/pull/12125)[@ryerh](https://github.com/ryerh)
- 🌟 `popconfirm` add `onVisibleChange` support.[#8614](https://github.com/ant-design/ant-design/issues/8614)
- 🐞 Fix something table header in `Table` using fixed header and colums display unecessary scorllbar.[#6515](https://github.com/ant-design/ant-design/issues/6515)
- 🐞 Fix `Spin` using `delay` still render at first time.[#12131](https://github.com/ant-design/ant-design/issues/12131)
- Icon related:
  - 🐞 Fix `Icon` in `popconfirm` has wrong position.[#12080](https://github.com/ant-design/ant-design/issues/12080)
  - 🐞 Add `Icon` missing icons.[#121218](https://github.com/ant-design/ant-design/issues/121218)
  - 🐞 Fix `Select` don't have checked icon.[#12054](https://github.com/ant-design/ant-design/issues/12054)
  - 🐞 Fix `TreeSelect` clear icon not same as previous verions.[#12124](https://github.com/ant-design/ant-design/issues/12124)

## 3.9.1

`2018-09-03`

- 🐞 Fixed the bug that `Tooltip` can not be triggered by `Icon`. [#12005](https://github.com/ant-design/ant-design/issues/12005)
- 🐞 Fixed the bug that `InputNumber` shows wrong UP icon. [#12035](https://github.com/ant-design/ant-design/issues/12035)
- 🐞 Fixed the bug that `Modal` shows no icon in error confirm. [#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 Fixed the bug that the icon is misaligned in `Popconfirm`. [#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 Fixed the but that the icons are misaligned in `Card`'s `Actions` panel. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 Fixed that the icons in `Form`, `Alert`, `TimePicker` have wrong theme. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 Fixed that the icons are set to have 90deg rotation in the `header` property in `Collapse`. [#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 FIxed the issue that there are still old icons in some production environments. [#12016](https://github.com/ant-design/ant-design/pull/12016) [8b82f14](https://github.com/ant-design/ant-design/pull/12016/commits/8b82f143b6bd612e8ec7f1202dfd5f41127b025e)
- 🐞 Fixed the bug that the new static method `Icon.createFromIconFontCN({...})` doesn't work and gives a warning. [#12013](https://github.com/ant-design/ant-design/pull/12013)

## 3.9.0

`2018-09-02`

In September we brought an update for `3.9.0`. There are many new features in `3.9.0`, Ant Design is getting stronger and solider.

- 🔥🔥🔥 In the `3.9.0` version, we redraw all the icons, adding two new categories, more than 90 new icons. And the bit adds a variety of styles to each icon. To this end, we have rewritten the Icon component, replaced the `fontface` icon with `SVG`, adding a number of features that allow us to quickly use new icons and styles.
  ![](https://gw.alipayobjects.com/zos/rmsportal/CVDHuodLwcDeyQBDoUIZ.png)
  - 💄 Replace the `css` font icon with the `SVG` icon, [see more disscussion about it](https://github.com/ant-design/ant-design/issues/10353).
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

- 🌟 Added Model.open for optional icon dialog. [#11982](https://github.com/ant-design/ant-design/pull/11982) [@hsiehjack](https://github.com/hsiehjack)
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
  - 🐞 Fixed detete button missing in Upload. [#10454](https://github.com/ant-design/ant-design/issues/10454)
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
- 💄 Use [tabular-nums font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) instead of monospaced numberic font family Tahoma. [#11567](https://github.com/ant-design/ant-design/pull/11567) [@tibdex](https://github.com/tibdex)
- 🌟 Timeline support `mode="left|right|alternate"` now. [#11490](https://github.com/ant-design/ant-design/pull/11490) [@jrvboesch](https://github.com/jrvboesch)
- 🌟 Button added `block` prop which allow to fit parent container. [#11500](https://github.com/ant-design/ant-design/pull/11500) [@ilanus](https://github.com/ilanus)
- Tree
  - 💄 Better accessibility support.
  - 🐞 Fixed that some tree nodes disapear after dragged. [#11492](https://github.com/ant-design/ant-design/issues/11492)
  - 🐞 Fixed a vertical align style issue of draggable tree. [#11458](https://github.com/ant-design/ant-design/issues/11458)
- Table
  - 🌟 Added `rowSelection.columnTitle` to customize selection column title. [#11042](https://github.com/ant-design/ant-design/issues/11042) [@littleLane](https://github.com/littleLane)
  - 💄 Added demo of [resizable columns](/components/table/#components-table-demo-resizable-column)。
  - 💄 Support to select multiple rows when pressing `shift`. [#11404](https://github.com/ant-design/ant-design/issues/11404) [@RaphaelChauveau](https://github.com/RaphaelChauveau)
- Avatar
  - 🌟 Added `onError` prop that is callback when image loading fail. [#11285](https://github.com/ant-design/ant-design/pull/11285/) [@paranoidjk](https://github.com/paranoidjk)
  - 🌟 Added `size` prop for customize size of Avatar. [#11256](https://github.com/ant-design/ant-design/issues/11256) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🌟 Card added `headStyle` prop. [#11407](https://github.com/ant-design/ant-design/pull/11407) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🐞 Fixed that Tooltip not working with DatePicker. [#11451](https://github.com/ant-design/ant-design/issues/11451) [@yociduo](https://github.com/yociduo)
- 🐞 Fixed that Tooltip not working with Input.Group. [#11532](https://github.com/ant-design/ant-design/issues/11532) [@yociduo](https://github.com/yociduo)
- 🐞 Fixed that DatePicker time panel text jumping when hovering. [#11460](https://github.com/ant-design/ant-design/issues/11460)
- 🐞 Fixed Tabs display issue when switch focus elements bettween panels. [#11261](https://github.com/ant-design/ant-design/issues/11261)
- Select
  - 💄 Support `data-*` attributes.
  - 🐞 Fixed that selected item don't display correct position in dropdown menu items. [#11268](https://github.com/ant-design/ant-design/issues/11268)
- 🌟 Calendar added `onChange` prop. [#11476](https://github.com/ant-design/ant-design/pull/11476) [@tangjinzhou](https://github.com/tangjinzhou)
- 🌟 Popconfirm added `icon` prop. [#11191](https://github.com/ant-design/ant-design/pull/11191) [@nuintun](https://github.com/nuintun)
- Modal
  - 🌟 Added `centered` prop to set vertical center position of modal. [#11537](https://github.com/ant-design/ant-design/pull/11537) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fixed that closing all modals when pressing `ESC` once, now they will be closed one by one. [#11394](https://github.com/ant-design/ant-design/issues/11394) [@yoyo837](https://github.com/yoyo837)
  - 🐞 Fixed issue resulting title of Model.confirm shows scrollbar again. [#11568](https://github.com/ant-design/ant-design/pull/11568) [@cheshireoctopus](https://github.com/cheshireoctopus)
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
- 🐞 Fix the arrow buttons of InputNumber showing wrong positon in a fixed table. [#11408](https://github.com/ant-design/ant-design/issues/11408)
- 🐞 Fix issue resulting in Select.Option shows wrong border radius in Select.OptGroup. [6cb6f5c](https://github.com/ant-design/ant-design/commit/6cb6f5c83ed634e67d5b5d0816d11aa0788a74d8)
- 🐞 Fix issue resulting in `onChange` was trigged twice when click the filter icon of Table. [#11164](https://github.com/ant-design/ant-design/issues/11164) [@adybionka](https://github.com/adybionka)
- 🐞 Fix issue resulting title of Model.confirm shows scrollbar on Firefox. [#11432](https://github.com/ant-design/ant-design/issues/11432)
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

3.7.0 is a heavy update that brings a lot of exciting changes and new features.
Here are some highlights ✨:

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
  - 🌟 `filterIcon` prop  supports to be a render function which returns ReactNode. [1af4392](https://github.com/ant-design/ant-design/commit/1af4392ae9fbdaa6fcfbf2f0de5413100ef4a84a)
  - 🐞 Fix the row dislocation problem when the column is fixed. [#10392](https://github.com/ant-design/ant-design/issues/10392)
- 🌟 Allow to pass `data-*`, `aria-*` and `role-*` props to the inner for Alert. [f0b684d](https://github.com/ant-design/ant-design/commit/f0b684de6a7c422f0de56e1ef72aeb35ab25a858)
- 🌟 Add `alt` prop for Avatar to set the text when the image is unable to display. [#10798](https://github.com/ant-design/ant-design/pull/10798)
- 🌟 Allow to pass `data-*`, `aria-*` and `role-*` props to the inner Input for DatePicker. [e63f9d4](https://github.com/ant-design/ant-design/commit/e63f9d4beb440de92c0b0ce8e6e83f7e24fef792)
- 🌟 Add `event` object as the second param of `onSearch` prop for Input.Search. [#11015](https://github.com/ant-design/ant-design/issues/11015)
- 🌟 Add `onBreakPoint` prop for Layout.Sider to be the callback function when breakpoint is triggered. [#10750](https://github.com/ant-design/ant-design/pull/10750) [@nuintun](https://github.com/nuintun)
- 🌟 Add `okButtonProps` prop to set the props of ok button and add `cancelButtonProps` prop to set the props of cancal button for Modal. [#10955](https://github.com/ant-design/ant-design/pull/10955) [@djyde](https://github.com/djyde)
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
- 🌟 Add `okButtonDisabled` and `cancelButtonDisabled` props to disable ok button and cancel button. [#10955](https://github.com/ant-design/ant-design/pull/10955)


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

- 🐞 Fixed that capitalized extension of Upload image url couldn't be recognaized. [#10928](https://github.com/ant-design/ant-design/pull/10928) [@sliwey](https://github.com/sliwey)
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

* 🌟 `Form`'s error message now can be customized with ReactNode. [#10136](https://github.com/ant-design/ant-design/issues/10136) [@lovekonakona](https://github.com/lovekonakona)
* 🌟 `List` support customized configuration for position of pagination. [#10581](https://github.com/ant-design/ant-design/pull/10581) [@zheeeng](https://github.com/zheeeng)
* 🌟 `Layout.Sider` now can be configured with `light` or `dark` theme. [#10142](https://github.com/ant-design/ant-design/issues/10142) [@pd4d10](https://github.com/pd4d10)
* 🌟 Ant Design official site now supports offline mode. [#10625](https://github.com/ant-design/ant-design/issues/10625)
* 🌟 `Transfer` adding `style` and `operationStyle` props for further customization. [@eduludi](https://github.com/eduludi)
* 🌟 `Message` adds a promisfied interface to handle callback. [#10421](https://github.com/ant-design/ant-design/issues/10421) [@zhujinxuan](https://github.com/zhujinxuan)
* 🐞 Fix compilation issue with typescript@v2.9.1 . [#10729](https://github.com/ant-design/ant-design/issues/10729) [@karol-majewski](https://github.com/karol-majewski)
* 🐞 Fix a bug in `Menu` where outer menu item not highlighting while inner item is selected. [#8666](https://github.com/ant-design/ant-design/issues/8666) [@stonehank](https://github.com/stonehank)
* 🐞 Affix `offsetBottom` not working. [#10674](https://github.com/ant-design/ant-design/issues/10674)

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
  - 💄 Rewrited the editable table demo. [#10119](https://github.com/ant-design/ant-design/pull/10119)
  - 🐞 Fixed that table column overlay each other. [#9822](https://github.com/ant-design/ant-design/issues/9822)
- TypeScript
  - 🐞 Fixed Breadcrumb.Item type. [#10372](https://github.com/ant-design/ant-design/pull/10372) [@karol-majewski](https://github.com/karol-majewski)
  - 🐞 Fixed Table `rowSelection` type。[#10374](https://github.com/ant-design/ant-design/issues/10374)

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
  - 🌟 Better aria-* attributes support. [react-component/menu#137](https://github.com/react-component/menu/pull/137)
  - 🌟 Improve Menu performance by avoiding unnecessary updates. [react-component/menu#133](https://github.com/react-component/menu/pull/133)
  - 🌟 Support passing props through to MenuItem list item. [react-component/menu#135](https://github.com/react-component/menu/pull/135)
  - 🐞 Minor key shortcut bug fixes. [react-component/menu#132](https://github.com/react-component/menu/pull/132)
- Collapse
  - 🌟 Support custom `Collapse` styles with less. [#9943](https://github.com/ant-design/ant-design/pull/9943) [@davidhatten](https://github.com/davidhatten)
  - 🌟 Update `rc-collapse` to 1.9.0 to add `Collapse` keyboard support. [react-component/collapse#84](https://github.com/react-component/collapse/pull/84/)  [@kossel](https://github.com/kossel)
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
- 🐞 Fix `Menu` item's clickable region in dark theme. [#10187](https://github.com/ant-design/ant-design/pull/10187) [@dgeibi ](https://github.com/dgeibi )

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
- 🐞 Fix image url display with non-image extention in Upload. [#9936](https://github.com/ant-design/ant-design/pull/9936)

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

- Revert Upload `file` type change in previous version  which causes breaking change.

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
  - 🌟 Improve `onChange`, `onDeselect`, they will receive selected `Option` as second paramteter.
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

### Breaking Changes

We provide a [migration tool](https://github.com/ant-design/antd-migration-helper) to help you find deprecated usages in your codebase.

- Card's `noHovering` has been renamed to `hoverable`, and its default value now is `true`.
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
  - 🌟 `status` can use whith `children` now. [#8164](https://github.com/ant-design/ant-design/issues/8164)
- Card
  - 🌟 Added new `inner` type. [Demo](https://ant.design/components/card/#components-card-demo-inner)。
  - 🌟 Added `cover`, `actions` and a new `Meta` component. [Demo](https://ant.design/components/card/#components-card-demo-meta)。
- DatePicker
  - 🌟 Added `mode` and `onPanelChange`, to allow controlling the panel mode. [Demo](https://ant.design/components/date-picker/#components-date-picker-demo-mode)。
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
  - 🙅 Deprecated `onRowClick`, `onRowDoubleClick`, `onRowContextMenu`, `onRowMouseEnter`, `onRowMouseLeave`, please use `onRow` instead.
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
