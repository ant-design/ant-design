---
order: 6
title: 更新日志
toc: false
timeline: true
---

`antd` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

* 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
* 次版本号：每月发布一个带有新特性的向下兼容的版本。
* 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 3.11.1

`2018-12-08`

- 🐞 修复 Avatar 图标不能垂直居中的问题。[#13408](https://github.com/ant-design/ant-design/issues/13408)
- 🐞 修复 Input 在设置 less 变量 `@border-width-base` 为 `1` 时的边框问题。[#13413](https://github.com/ant-design/ant-design/issues/13413) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Commnet 组件不能正确显示换行的问题。[#13429](https://github.com/ant-design/ant-design/issues/13429)
- 🐞 修复 Alert 在 `closable` 时，关闭图标会被文字遮挡的问题。[#13440](https://github.com/ant-design/ant-design/issues/13440)
- Button
  - 🐞 修复 `href` 属性为 `undefined` 时，Button 也会被渲染为 a 标签的问题。[#13337](https://github.com/ant-design/ant-design/issues/13337)
  - 🐞 修复设置 `loading` 属性时在 Edge 下会报错的问题。[#13216](https://github.com/ant-design/ant-design/issues/13216)
- Dropdown
  - 🐞 修复会导致 Button 中的图标显示变小的问题。[#13442](https://github.com/ant-design/ant-design/issues/13442)
  - 🐞 修复下拉菜单跟触发元素之间的孔隙会导致下拉菜单关闭的问题。[#10481](https://github.com/ant-design/ant-design/issues/10481)
- Table
  - 🐞 修复使用 filter 会导致 `onChange` 中 `selectedRowKeys` 和 `selectedRows` 不一致的问题。[#11384](https://github.com/ant-design/ant-design/issues/11384)
  - 💄 优化鼠标悬停在可排序的表头上时 title 的显示。[#13312](https://github.com/ant-design/ant-design/issues/13312)
- DatePicker
  - 🐞 修复选择日期后，组件会失去焦点的问题。[#12475](https://github.com/ant-design/ant-design/issues/12475)
  - 🐞 修复会导致 Safari 假死的问题。[#13424](https://github.com/ant-design/ant-design/issues/13424)
  - 🐞 修复 WeekPicker 的日期选择框跟输入框不对齐的问题。
- 🐞 修复 Slider 的 blur 方法。[#13439](https://github.com/ant-design/ant-design/issues/13439)
- 🐞 修复 Cascader 的国际化问题。[#13486](https://github.com/ant-design/ant-design/issues/13486)
- 🐞 修复一些组件 TypeScript 定义。[#13390](https://github.com/ant-design/ant-design/pull/13390) [#13488](https://github.com/ant-design/ant-design/pull/13488) [#13420](https://github.com/ant-design/ant-design/issues/13420)

## 3.11.0

`2018-12-02`

3.11.0 版本带来了两个新组件，还有很多激动人心的变化和新特性。

- 🔥 增加了一个新组件 [Comment](https://ant.design/components/comment-cn/)。[#12770](https://github.com/ant-design/ant-design/pull/12770) [@ilanus](https://github.com/ilanus)
- 🔥 增加了一个新组件 [ConfigProvider](https://ant.design/components/config-provider-cn/) 为组件提供统一的全局化配置。[#12991](https://github.com/ant-design/ant-design/pull/12991)

组件修复/功能增强：

- 🌟 Avatar 组件增加 `srcSet` 属性，用于设置图片类头像响应式资源地址。[#12525](https://github.com/ant-design/ant-design/pull/12525) [@philipodev](https://github.com/philipodev)
- 🌟 Notification 组件升级 `rc-notification` 到 `3.3.0`，增加 `onClick` 属性，点击通知时触发的回调函数。[#11832](https://github.com/ant-design/ant-design/issues/11832)
- Transfer
  - 🌟 增加 `onSearch` 属性，搜索框内容时改变时的回调函数，并废弃 `onSearchChange` 属性。[#12422](https://github.com/ant-design/ant-design/pull/12422)
  - 🌟 增加 `disabled` 属性，用于禁用搜索框。[#13330](https://github.com/ant-design/ant-design/issues/13330)
- 🌟 Badge 进行了重构，`count` 支持自定义组件。[#12140](https://github.com/ant-design/ant-design/pull/12140) [@supra28](https://github.com/supra28)
- 🌟 Slider 组件增加 `tooltipVisible` 属性，用于 Tooltip 是否始终显示。[#12915](https://github.com/ant-design/ant-design/pull/12915) [@zy410419243](https://github.com/zy410419243)
- 🌟 增加 less 变量 `@font-variant-base` 定制 font-variant 样式。[#12691](https://github.com/ant-design/ant-design/pull/12691) [@neemski](https://github.com/neemski)
- Table 升级 `rc-table` 到 `6.4.0`
  - 🌟 增加 `expandIcon` 属性，用于自定义表格展开图标。[#236](https://github.com/react-component/table/pull/236) [@kagd](https://github.com/kagd)
  - 💄 支持 `data-*`、`aria-*` 属性。[#227](https://github.com/react-component/table/pull/227) [@kagd](https://github.com/kagd)
  - 🌟 onCell 方法增加 `index` 参数。[#222](https://github.com/react-component/table/pull/222) [@yoyo837](https://github.com/yoyo837)
- Select 组件升级 `rc-select` 到 `8.6.0`
  - 🌟 增加 `removeIcon`、`clearIcon`、`menuItemSelectedIcon` 属性，用于自定义删除、清空、选中的图标。[#12958](https://github.com/ant-design/ant-design/pull/12958) [@kimochg](https://github.com/kimochg)
  - 🌟 增加 `dropdownRender` 属性， 用于自定义下拉框内容。[#10831](https://github.com/ant-design/ant-design/issues/10831)
  - 🌟 增加 `loading` 属性， 用于展示加载中状态。 [#11225](https://github.com/ant-design/ant-design/issues/11225)
- 💄 Menu.Item 组件增加 `title` 属性，用于在收缩时展示的悬浮标题。[#12952](https://github.com/ant-design/ant-design/pull/12952)
- Cascader 升级 `rc-calendar` 到 `9.8.0`
  - 🌟 支持多种时间格式。[#437](https://github.com/react-component/calendar/pull/437) [@onlyann](https://github.com/onlyann)
  - 🌟 showSearch 方法增加 `limit` 参数，用于限制搜索结果展示数量。[#13206](https://github.com/ant-design/ant-design/pull/13206)
- 🌟 增加匈牙利国际化文案。[#13026](https://github.com/ant-design/ant-design/pull/13026) [@ilanus](https://github.com/ilanus)
- 🐞 修复 TextArea 组件高度不能自适应问题。[#13295](https://github.com/ant-design/ant-design/pull/13295)
- 🐞 修复 Tabs 组件当 tabPosition 为 left 或 right 的时候，renderTabBar 样式问题。[#13118](https://github.com/ant-design/ant-design/pull/13118)
- 🐞 修复 Upload 缩略图图标样式错误。[#13333](https://github.com/ant-design/ant-design/issues/13333)

## 3.10.9

`2018-11-24`

- 🐞 修复 Checkbox 标签名鼠标失效样式没有生效的问题。[#13199](https://github.com/ant-design/ant-design/issues/13199) [@walker27](https://github.com/walker27)
- 🐞 修复 TimePicker 输入框超出边界的样式问题。[#13194](https://github.com/ant-design/ant-design/issues/13194)
- 🌟 Table 排序调整为先升序后降序。[#13069](https://github.com/ant-design/ant-design/pull/13069) [@OvestLabs](https://github.com/OvestLabs)
- 🐞 修复 loading 状态下，Switch 仍然可以被操作的问题。[#13219](https://github.com/ant-design/ant-design/pull/13219) [@jojoLockLock](https://github.com/jojoLockLock)
- 🐞 修复 Carousel 组件渐显效果下轮播区域无法点击的问题。[#13215](https://github.com/ant-design/ant-design/issues/13215)
- 🐞 修复 DatePicker 对 `tabIndex` 属性的支持。[#13265](https://github.com/ant-design/ant-design/pull/13265) [@arifemrecelik](https://github.com/arifemrecelik)
- 🐞 TreeSelect 现在在搜索时不再调用 `loadData` 以避免卡死。[#13245](https://github.com/ant-design/ant-design/issues/13245)

## 3.10.8

`2018-11-17`

- 🐞 修复弹出菜单背景透明的问题。[#13104](https://github.com/ant-design/ant-design/issues/13104)
- 🐞 修复了 disabled  Button  在 Popconfirm 中的不占用整个宽度的问题。[#13119](https://github.com/ant-design/ant-design/issues/13119)
- 🐞 修复了 Radio.Group 中的 Radio.Button 覆盖了 Badge 的问题。[#13132](https://github.com/ant-design/ant-design/issues/13132)
- 🐞 修复 RangePicker 在 `small` 模式不对齐的问题。[#13105](https://github.com/ant-design/ant-design/issues/13105)
- 🐞 修复 Dropdown 字体大小影响到头像的问题。[#13091](https://github.com/ant-design/ant-design/issues/13091)
- 🐞 修复 tabBarGutter 无法在垂直模式下工作的问题。[#12968](https://github.com/ant-design/ant-design/issues/12968)
- 🌟 调整了多处 typescript 的类型。

## 3.10.7

`2018-11-11`

- 🐞 修复一个 Button `line-height` 的笔误。 [74aeace](https://github.com/ant-design/ant-design/commit/74aeaceaa88034b8cb669efb8aa3b6de41ff6f9d)

## 3.10.6

`2018-11-11`

- 🐞 回滚了 [adee2f3](https://github.com/ant-design/ant-design/commit/adee2f33294b9223bda959e6ae27b4d7dadcec49) 以修复一个链接按钮样式问题，并且换了一个方式修复 [#12978](https://github.com/ant-design/ant-design/issues/12978)。

## 3.10.5

`2018-11-09`

- 🎉 发布 [Landing 模板集](https://landing.ant.design)！
- 📖 发布  Ant Design [新版 Sketch 模版文件](https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.Components.Beta.3.10.5.sketch)。
- Button
  - 🐞 修复在小尺寸的 `Button.Group` 中没有垂直对齐的问题。[#12972](https://github.com/ant-design/ant-design/issues/12972)
  - 🐞 修复设置了 `href` 属性没有垂直对齐的问题。[#12978](https://github.com/ant-design/ant-design/issues/12978)
- 🐞 修复 Cascader 组件的 `filedNames` 属性在 `3.7.0` 版本后的兼容性问题。[#12970](https://github.com/ant-design/ant-design/issues/12970)
- 🐞 修复 DatePicker 组件的日期值没有被成功修改，浮层中显示的日期应该被重置的问题。[#12929](https://github.com/ant-design/ant-design/issues/12929)
- 🐞 修复 Icon 组件丢失 `cross` 类型图标的问题。[#12970](https://github.com/ant-design/ant-design/issues/12970)
- 🐞 修复 Menu 组件处于折叠状态时菜单类型不正确的问题。[#2782](https://github.com/ant-design/ant-design-pro/issues/2782) [#2783](https://github.com/ant-design/ant-design-pro/issues/2783) [#2786](https://github.com/ant-design/ant-design-pro/issues/2786)
- 🐞 修复 Popover 和 Tooltip 组件中出现不必要的回流问题，避免出现奇怪的动画。[#12942](https://github.com/ant-design/ant-design/issues/12942)
- Table
  - 🐞 修复嵌套在其他组件中时样式溢出的问题。[#13025](https://github.com/ant-design/ant-design/issues/13025)
  - 🐞 修复表头内容过长会与排序图表重合的问题。[#12552](https://github.com/ant-design/ant-design/issues/12552) [#12650](https://github.com/ant-design/ant-design/issues/12650)
- 🐞 修复 Tooltip 组件嵌套在 `Popover/Popconfirm` 下，并且子元素为 `disabled` 状态时不消失的问题。[#13001](https://github.com/ant-design/ant-design/issues/13001)
- 🐞 修复 Upload 组件在上传非图片类型文件时会将文件读取至内存，造成浏览器卡顿的问题。[#12948](https://github.com/ant-design/ant-design/issues/12948)
- 🐞 修复在 `IE` 和 `Edge` 浏览器下 `DOM 对象` 不支持 `removeAttribute` 属性的问题。[#2423](https://github.com/ant-design/ant-design-pro/issues/2423)
- 🐞 对于隐藏元素去掉不必要的波浪动画。[#12967](https://github.com/ant-design/ant-design/issues/12967)

## 3.10.4

`2018-11-03`

- Modal
  - 🌟 增加 less 变量 `@modal-header-bg` 定制 Modal 头部颜色。[#12914](https://github.com/ant-design/ant-design/issues/12914)
  - 🐞 修复 maskStyle 在 Modal.method 中无效的问题。[#12688](https://github.com/ant-design/ant-design/issues/12688)
- 🐞 修复 Checkbox 在 IE 11 中丢失勾号的问题。[#12597](https://github.com/ant-design/ant-design/issues/12597)
- 🐞 修复 FormItem 在有帮助信息时高度不一致的问题。[#12803](https://github.com/ant-design/ant-design/issues/12803)
- 🐞 修复 Chrome 下 Divider 在 Popover 中会撑宽 Popover card 的问题。[#10914](https://github.com/ant-design/ant-design/issues/10914)
- 🐞 修复 Avatar 内容在 Popover 中没有对齐的问题。[#10917](https://github.com/ant-design/ant-design/issues/#10917)
- Button
  - 🐞 修复 unable to find node on unmounted components 报错问题。[#12843](https://github.com/ant-design/ant-design/issues/12843)
  - 🐞 修复 icon margin 样式。[546c59a](https://github.com/ant-design/ant-design/commit/546c59a4c1a6b482afecbcb4a3cb1e385c0bbdb6)
- Table
  - 🐞 修复在 Column 中使用 render function 时的排序问题。[#12870](https://github.com/ant-design/ant-design/issues/12870) [#12737](https://github.com/ant-design/ant-design/issues/12737)
  - 🐞 修复固定列 border 样式问题。[#9687](https://github.com/ant-design/ant-design/issues/9687)
- TypeScript
  - 🐞 修复 Select `onPopupScroll` 属性定义 [#12913](https://github.com/ant-design/ant-design/pull/12913)。
  - 🐞 修复 AutoComplete 缺失 `onFocus` 以及 `onBlur` 属性定义。[@muzea](https://github.com/muzea) [#12793](https://github.com/ant-design/ant-design/issues/12793);

## 3.10.3

`2018-10-27`

- 🌟 完善工具方法 `getScroll` 的 TypeScript 定义。[#12784](https://github.com/ant-design/ant-design/pull/12784) [@ztplz](https://github.com/ztplz)
- 🐞 修复 CheckboxGroup 内 Checkbox 没有触发 `onChange` 的问题。[#12642](https://github.com/ant-design/ant-design/issues/12642)
- 🐞 修复 Calendar 组件设置 `validRange` 后选择月份时的问题。[#12675](https://github.com/ant-design/ant-design/issues/12675)
- 🐞 修复 Select 组件设置了 `dropdownMatchSelectWidth` 后多选下拉框的问题。[#12816](https://github.com/ant-design/ant-design/pull/12816) [@hengkx](https://github.com/hengkx)
- 🐞 修复 Card 标题可能会被覆盖的问题。[#12680](https://github.com/ant-design/ant-design/issues/12680)
- 🐞 修复 Form[inline] 提示信息和错误文案被覆盖的问题。[#12725](https://github.com/ant-design/ant-design/issues/12725)
- Table
  - 🌟 支持自定义 Table 组件的筛选按钮的背景色。[#12775](https://github.com/ant-design/ant-design/pull/12775) [@ivankravets](https://github.com/ivankravets)
  - 🐞 调整 Table 组件的样式细节。[#12682](https://github.com/ant-design/ant-design/issues/12682)
  - 🐞 修复在火狐下，当 size="small" 未排序时下边框不显示。[#12840](https://github.com/ant-design/ant-design/issues/12840)
  - 🐞 修复大小为 small/middle 时复选框不能对齐的问题。[#12723](https://github.com/ant-design/ant-design/issues/12723)

## 3.10.2

`2018-10-23`

- 📝 翻译[模式-概览](https://ant.design/docs/spec/overview)文档到英文。[#12637](https://github.com/ant-design/ant-design/pull/12637) [@ilanus](https://github.com/ilanus)
- 🛠 DatePicker 组件完善对越南语（vi_VN）的支持。[#12656](https://github.com/ant-design/ant-design/pull/12656) [@hieuhlc](https://github.com/hieuhlc)
- 🐞 修复 TimePicker 组件在 IE11 下的样式问题。[#12707](https://github.com/ant-design/ant-design/pull/12707) [jinyaqiao1102](https://github.com/jinyaqiao1102)
- 🐞 修复 Popconfirm 组件的 `defaultVisible` 属性的问题。[#12733](https://github.com/ant-design/ant-design/issues/12733)
- 🐞 修复在 Firefox 下 Table 组件头部边框不显示的问题。[#12628](https://github.com/ant-design/ant-design/issues/12628)
- 🐞 组件 Slider 添加 `touch-action: none` 样式修复 Chrome 上可能出现的报错。[#12595](https://github.com/ant-design/ant-design/issues/12595)
- 🐞 修复 Tabs 组件垂直模式下边框条的问题。[#12276](https://github.com/ant-design/ant-design/issues/12276)
- 🐞 修复 Button 组件无内容时垂直不对齐的问题。[#12681](https://github.com/ant-design/ant-design/issues/12681)
- 🐞 修复 Calendar 组件 `locale` 属性不生效的问题。[#12706](https://github.com/ant-design/ant-design/issues/12706)
- 🐞 修复 Checkbox 组件在设置 `indeterminate` 的情况下的样式问题。[#12724](https://github.com/ant-design/ant-design/issues/12724)
- 🐞 修复 `prefixCls` 没有应用到 Popconfirm 组件按钮上的问题。[#12677](https://github.com/ant-design/ant-design/pull/12677) [@concefly](https://github.com/concefly)
- 🐞 修复 Edge 下 Button 组件 `pointer-events:none` 对于 span 不生效的问题。[#12712](https://github.com/ant-design/ant-design/pull/12712) [@dazbo](https://github.com/dazbo)
- Progress
  - 🐞 修复 Progress 组件的 `strokeColor` 属性无效的问题。[#12587](https://github.com/ant-design/ant-design/pull/12587) [@lyhper](https://github.com/lyhper)
  - 🐞 修复 Progress[type="circle"] 中文本溢出的问题。[#12718](https://github.com/ant-design/ant-design/issues/12718)
- TypeScript
  - 🐞 修复 TreeSelect 组件缺少 `treeExpandedKeys` 和 `onTreeExpand` 的定义的问题。[#12648](https://github.com/ant-design/ant-design/pull/12648) [@decadef20](https://github.com/decadef20)
  - 🐞 修复 TabPaneProps 组件缺少 `key` 属性定义的问题。[682af0d](https://github.com/ant-design/ant-design/commit/682af0d44bf38a7d3e487aa909c46409db163030) [@ztplz](https://github.com/ztplz)
  - 🐞 修复 Icon 组件的部分定义问题。[3dbc357](https://github.com/ant-design/ant-design/commit/3dbc357ff2837debbb9b36a25b14be4757297cad)

## 3.10.1

`2018-10-12`

- 🎉 [Ant Design Mobile of Angular](http://ng.mobile.ant.design/)（NG-ZORRO-Mobile）发布！
- 📝 更新 [项目实战](https://ant.design/docs/react/practical-projects-cn) 文档为最新的 umi 技术栈。
- Table
  - 🐞 修复未指定排序的列头点击时也会触发排序的问题。[#12515](https://github.com/ant-design/ant-design/issues/12515)
  - 🐞 修复列头多余的排序 title 提示。[#12613](https://github.com/ant-design/ant-design/issues/12613)
  - 🐞 修复排序和右对齐的列样式错位的问题。[#12552](https://github.com/ant-design/ant-design/issues/12552)
  - 🐞 修复一个 columns 定义在 render 内时排序失效的问题。[#12571](https://github.com/ant-design/ant-design/issues/12571)
  - 🐞 修复小号表格下排序列的列头背景色。
  - 🐞 修复 Table 的选择器在 chrome 下选中样式的重影问题。[5bef1aa](https://github.com/ant-design/ant-design/commit/5bef1aa6c2e792180ef8d53a1f1489376b8e35db)
  - 🐞 修复 Form.Item 内的 Table 分页样式。[#12554](https://github.com/ant-design/ant-design/issues/12554)
- DatePicker
  - 🐞 调整意大利国际化文案。[#12413](https://github.com/ant-design/ant-design/issues/12413) [@yp](https://github.com/yp)
  - 🐞 修复选择完成后选择框没有获取焦点的问题。[#12475](https://github.com/ant-design/ant-design/issues/12475)
  - 🐞 修复在 Input.Group 内使用时日期图标消失的问题。[#12536](https://github.com/ant-design/ant-design/issues/12536)
- 🐞 修复 Anchor 中文字边缘被切割的问题。[#12520](https://github.com/ant-design/ant-design/issues/12520)
- 🐞 修复 Drawer 设置无遮罩时依然挡住了页面元素的问题。[#12401](https://github.com/ant-design/ant-design/issues/12401)
- 🐞 修复 AutoComplete 下使用自定义 Input.TextArea 下失效样式丢失的问题。[#12594](https://github.com/ant-design/ant-design/issues/12594)
- 🐞 修复 Modal.confirm 的 `prefixCls` 属性没有透传给 mask 的问题，并调整了默认的 prefixCls 的值为 `ant-model-confirm`。[#12546](https://github.com/ant-design/ant-design/issues/12546)
- 🐞 修复 Input.Group 在 safari 下的一个对齐问题。[#12493](https://github.com/ant-design/ant-design/issues/12493)
- 🐞 修复独自使用 `<Badge />` 时的垂直对齐。[#12419](https://github.com/ant-design/ant-design/issues/12419)
- 🐞 修复 Tree.DirectoryTree 点击切换图标和点击文本时 `onExpand` 参数不一致的问题。[#12567](https://github.com/ant-design/ant-design/issues/12567)
- 🐞 修复在 IE11 下错误聚焦到表单状态图标的问题。[#12524](https://github.com/ant-design/ant-design/pull/12524) [@siyu77](https://github.com/siyu77)
- 🐞 修复多选 Select 多次点击输入框时会反复触发 `onFocus` 和 `onBlur` 的问题。[#12281](https://github.com/ant-design/ant-design/issues/12281) [@Frezc ](https://github.com/Frezc)
- 🐞 修复环形 Progress 内文本超长溢出的问题。
- TypeScript
  - 🐞 补充 Steps 的 `labelPlacement` 属性定义。[#12575](https://github.com/ant-design/ant-design/pull/12575) [@yueyes](https://github.com/yueyes)
  - 🐞 补充 Select.Option 的 `style` 属性定义。[#12609](https://github.com/ant-design/ant-design/pull/12609) [@dimitropoulos](https://github.com/dimitropoulos)
  - 🐞 修复 `form.validateFields` 的定义重载问题。[#12538](https://github.com/ant-design/ant-design/pull/12538) [@TomIsion](https://github.com/TomIsion)
  - 🐞 补充 AutoComponent 的 `onFocus` `onBlur` 定义。[#12498](https://github.com/ant-design/ant-design/issues/12498)

## 3.10.0

`2018-09-30`

🎉 国庆节快乐

- 📝 更新了[图标](https://ant.design/docs/spec/icon-cn)和[动效](https://ant.design/docs/spec/motion-cn)两篇设计指引。
- 🌟 Upload 组件新增 `openFileDialogOnClick` 属性，用于设置点击组件时是否打开上传对话框。[#12347](https://github.com/ant-design/ant-design/pull/12347) [@hengkx](https://github.com/hengkx)
- 🌟 InputNumber 组件新增 `decimalSeparator` 属性，用于设置自定义的小数点。[#12329](https://github.com/ant-design/ant-design/pull/12329) [@amedora](https://github.com/amedora)
- 🌟 TreeSelect 组件新增 `treeExpandedKeys` 和 `onTreeExpand` 属性，用于控制树的展开收起。[#12145](https://github.com/ant-design/ant-design/issues/12145)
- Transfer
  - 🌟 新增 `disabled` 属性。[#12066](https://github.com/ant-design/ant-design/issues/12066)
- Modal
  - 🌟 新增 `autoFocusButton` 属性，用于指定 Modal 打开时自动获取焦点的按钮。[#11756](https://github.com/ant-design/ant-design/pull/11756) [@erwin-k](https://github.com/erwin-k)
  - 🌟 `confirm` 方法的参数新增 `okButtonProps` 和 `cancelButtonProps`，用户设置对应按钮的属性。[#12425](https://github.com/ant-design/ant-design/pull/12425) [@Whoaa512](https://github.com/Whoaa512)
- Table
  - 🌟 现在可以把 `column.title` 设置为一个方法了。[#11246](https://github.com/ant-design/ant-design/issues/11246)
  - 🌟 `onChange` 属性新增第四个参数 `extra`，用于获取当前显示的筛选后的数据。[#12369](https://github.com/ant-design/ant-design/pull/12369)
  - 🌟 优化了排序和筛选交互，现在整个列表头都可以点击排序了。[#12264](https://github.com/ant-design/ant-design/pull/12264)
- 🌟 Alert 新增 `icon` 属性，用户设置自定义图标。例子：[自定义图标](https://ant.design/components/alert-cn/#components-alert-demo-custom-icon)
- 🌟 以下组件均新增了 `suffixIcon` 属性，用于设置输入框后面的图标，具体用法可以参考文档。
  - Cascader
  - DatePicker
  - Select
  - TreeSelect
  - TimePicker
- 🌟 新增 less 变量 [f237eff](https://github.com/ant-design/ant-design/commit/f237effc2a35eb249273f6f2826092a2f9b9db45)
- 🐞 修复 Icon.createFromIconfontCN 方法会自动给 `scriptUrl` 加 `https` 的问题。[#12316](https://github.com/ant-design/ant-design/issues/12316)
- 🐞 修复 Row 的 `gutter` 属性，在使用嵌套的 Col 时不生效的问题。[#12320](https://github.com/ant-design/ant-design/pull/12320)
- 🐞 修复 Tree.DirectoryTree 组件在设置的 `expandedKeys` 有初始值时不能正确展开节点的问题。[#12396](https://github.com/ant-design/ant-design/issues/12396)
- 🐞 修复 Transfer 组件使用 `render` 属性返回  ReactNode 时，列表项的 `title` 属性显示错误的问题。[#12399](https://github.com/ant-design/ant-design/issues/12399)
- 🐞 修复 Tooltip 在 CheckboxGroup 上不工作的问题。[#12427](https://github.com/ant-design/ant-design/issues/12427)
- 🐞 修复 Button 组件 loading 状态下在 IE9 里依然可以被点击的问题。[#12466](https://github.com/ant-design/ant-design/pull/12466) [@snail](https://github.com/120216220)
- 🐞 修复 Input.Group 中使用非 Input 组件时，鼠标 hover 时会产生抖动的问题。[#12407](https://github.com/ant-design/ant-design/pull/12407) [@hengkx](https://github.com/hengkx)
- 🐞 修复 TypeScript 类型定义 [#12374](https://github.com/ant-design/ant-design/pull/12374) [#12370](https://github.com/ant-design/ant-design/pull/12370) [#12354](https://github.com/ant-design/ant-design/pull/12354/files) [#12473](https://github.com/ant-design/ant-design/pull/12473)

## 3.9.3

`2018-09-22`

- 🐞 修复 `Select` 组件在 Chrome 下超长文本的渲染延迟。[#11456](https://github.com/ant-design/ant-design/issues/11456) [#11843](https://github.com/ant-design/ant-design/issues/11843)
- 🐞 修复 `RangePicker` 组件中的 `onOpenChange` 非正常数值报错问题。[#12142](https://github.com/ant-design/ant-design/pull/12142)[@leijingdao](https://github.com/leijingdao)
- 🐞 修复 `Carousel` 组件的 `goTo` 方法缺少 `dontAnimate` 参数问题，参数用于关闭转场过渡动画。[#12205](https://github.com/ant-design/ant-design/pull/12205)
- 🐞 修复 `Tabs` 中 `tabBar` 的重复类名。[589ba](https://github.com/ant-design/ant-design/commit/589bafd5db92a817c078ead6decdb81e64b2b5a8)[#12051](https://github.com/ant-design/ant-design/issues/12051)
- 🐞 修复 `Card` 组件标题的垂直对齐方式。[#11036](https://github.com/ant-design/ant-design/pull/11036)[#10576](https://github.com/ant-design/ant-design/issues/10576)
- 🐞 修复 `List` 组件刷新后 key 值非预期变化。[#12299](https://github.com/ant-design/ant-design/pull/12299)[@douglasjunior](https://github.com/douglasjunior)
- 🐞 修复 `Table` 组件 `confirmFilter` 方法不能及时更新数据。[954c7](https://github.com/ant-design/ant-design/commit/954c7ecd8ed384a3c67ec8dfb0e0deaa14bbf83b)[#12284](https://github.com/ant-design/ant-design/issues/12284)
- `Menu` 组件相关
  - 🐞 修复 `Menu` 在 `horizontal` 模式下时出现额外的滚动条。[#12152](https://github.com/ant-design/ant-design/issues/12152)
  - 🐞 修复 `Menu` 组件 `openKeys` 有更高的优先级。[#12361](https://github.com/ant-design/ant-design/pull/12361) [@tangjinzhou](https://github.com/tangjinzhou)
- `Upload` 组件相关
  - 🐞 修复 `Upload` 上传文件列表中的 `linkProps` ，支持 JSON 格式链接且可传入 `rel` 、`target` `title` 等属性。[efb23](https://github.com/ant-design/ant-design/commit/efb23c1525858114460bfe3bd5fcb18c9f236bdc)
  - 🐞 修复 `Upload` 组件多文件类型同时上传时，key 重复引用冲突的报错问题。[273fd](https://github.com/ant-design/ant-design/commit/273fd2ea1bca395d61509cc98c3ebbf1c620bf43)，[#10953](https://github.com/ant-design/ant-design/issues/10953)
- 图标相关内容
  - 🐞 修复 `Upload` 组件关闭图标样式。[#12330](https://github.com/ant-design/ant-design/pull/12330) [#12304](https://github.com/ant-design/ant-design/issues/12304)
  - 🐞 修复 `Select` 组件清除图标。[#12196](https://github.com/ant-design/ant-design/pull/12196) [#12181](https://github.com/ant-design/ant-design/issues/12181)
  - 🐞 修复 `Icon` svg 对齐问题。[0698c](https://github.com/ant-design/ant-design/commit/0698c8217327224611d4be5fcfd149a355f1c08d)
  - 🐞 修复当 `Icon` 组件包含子组件时，`React.Children.only` 报错。[c21ff](https://github.com/ant-design/ant-design/commit/c21ff5251d1ff0f00d7f283dd377a7b13eec21ee)
  - 🐞 修复 `Notification` 组件没有描述时图标对齐问题。[e6579](https://github.com/ant-design/ant-design/commit/e657985cc35359fb813a2bd68be8c3afbe75c95a)
  - 🐞 修复 `Table` 组件的排序图标对齐问题。[c935d](https://github.com/ant-design/ant-design/commit/c935d53b713afb3ec314133d749ca4e29e0c1ee5)
-  TypeScript
  - 🐞 修复 `Message` 组件中 `MessageApi` 类型定义。[e82d7](https://github.com/ant-design/ant-design/commit/e82d7a9c095317d62b054fcf7c2d6666ba54660d)[#12137](https://github.com/ant-design/ant-design/issues/12137)
  - 🐞 修复 `Tree` onDrop 类型定义。[e5827](https://github.com/ant-design/ant-design/commit/e58273dccf59d58862e8bab0da36c7065e1c1044)[#12269](https://github.com/ant-design/ant-design/issues/12269)
  - 🐞 `TreeSelect` 组件中 `onChange` 方法中添加 `extra` 类型定义。[#12243](https://github.com/ant-design/ant-design/pull/12243)[@jardicc](https://github.com/jardicc)

## 3.9.2

`2018-09-08`

- 🐞 修复 `Card` 组件 `tab-card` 下嵌套 `Card` 导致标题边距偏窄的样式问题。[#12083](https://github.com/ant-design/ant-design/issues/12083)
- 🐞 修复 `AutoComplete` 组件设置自定输入组件为 `TextArea` 时，手工调整高度的延迟问题。[#12117](https://github.com/ant-design/ant-design/issues/12117)
- 🐞 修复 `Drawer` 组件 `maskStyle` 属性无效的问题。[#12125](https://github.com/ant-design/ant-design/pull/12125)[@ryerh](https://github.com/ryerh)
- 🌟 `Popconfirm` 可以在 `onVisibleChange` 里判断是否触发自确定取消按钮。[#8614](https://github.com/ant-design/ant-design/issues/8614)
- 🐞 修复 `Table` 组件固定头和列时，表头会出现滚动条的问题。[#6515](https://github.com/ant-design/ant-design/issues/6515)
- 🐞 修复 `Spin` 组件设置 `delay` 时初始化仍会渲染的问题。[#12131](https://github.com/ant-design/ant-design/issues/12131)
- 图标相关内容:
  - 🐞 修复 `Icon` 组件在 `popconfirm` 中位置不正确的问题。[#12080](https://github.com/ant-design/ant-design/issues/12080)
  - 🐞 添加 `Icon` 组件缺失的图标。[#121218](https://github.com/ant-design/ant-design/issues/121218)
  - 🐞 修复 `Select` 组件勾选缺失的图标问题。[#12054](https://github.com/ant-design/ant-design/issues/12054)
  - 🐞 修复 `TreeSelect` 组件删除图标与之前版本不同的问题。[#12124](https://github.com/ant-design/ant-design/issues/12124)

## 3.9.1

`2018-09-03`

- 🐞 修复 `Icon` 组件在被 `Tooltip` 组件包裹时，无法显示 `Tooltip` 内容的问题。[#12005](https://github.com/ant-design/ant-design/issues/12005)
- 🐞 修复 `InputNumber` 组件的向上图标显示不正常的问题。[#12035](https://github.com/ant-design/ant-design/issues/12035)
- 🐞 修复 `Modal` 组件的错误确认框不显示图标的问题。[#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 修复 `Popconfirm` 组件中的图标显示位置不正确的问题。[#12026](https://github.com/ant-design/ant-design/issues/12026)
- 🐞 修复 `Card` 组件中的 `Actions` 图标显示位置不正确的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 修复 `Form`、`Alert`、`TimePicker` 等组件图标主题风格不正确的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 修复 `Collapse` 组件中的 `header` 中的图标会顺时针旋转90度的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 修复在特定部署环境中，新旧图标会同时出现的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016) [8b82f14](https://github.com/ant-design/ant-design/pull/12016/commits/8b82f143b6bd612e8ec7f1202dfd5f41127b025e)
- 🐞 修复使用 `Icon.createFromIconFontCN({...})` 方法失效并报错的问题。[#12013](https://github.com/ant-design/ant-design/pull/12013)

## 3.9.0

`2018-09-02`

在开学之际我们带来了久违的 `3.9.0` 的更新。多个重量级的新特性和大量修复，使 Ant Design 的能力显著提升。

- 🔥🔥🔥 在 `3.9.0` 版本中，我们重绘了所有的图标，新增了两大类，超过 90 个新图标，并且为每个图标增加了多种风格。为此我们重写了 Icon 组件，使用 `SVG` 替换了 `fontface` 图标，增加了多个特性，可以快速的使用新的图标和风格。
  ![](https://gw.alipayobjects.com/zos/rmsportal/CVDHuodLwcDeyQBDoUIZ.png)
  - 💄 使用 `SVG` 图标替换了 `css` 字体图标，[可以看这里的讨论了解 svg 的优势](https://github.com/ant-design/ant-design/issues/10353)。
  - 💄 提供了三套图标风格线性、实色和双色图标，默认为线性风格。
  - 🌟 新增了 **编辑类** 和 **数据类** 两个新类别。
  - 🌟 新增 `theme` 属性，可以设置图标的主题风格。[#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 新增 `component` 属性，可以外部传入一个组件来自定义控制渲染结果。[#11322](https://github.com/ant-design/ant-design/pull/11322)
  - 🌟 新增 `twoToneColor` 属性，可以控制双色图标的主题色。[#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 新增静态方法 `Icon.getTowToneColor()` 和 `Icon.setTwoToneColor(...)`，可以全局性的获取和设置所有双色图标的主题色。[#11971](https://github.com/ant-design/ant-design/pull/11971)
  - 🌟 新增静态方法 `Icon.createFromIconfontCN({...})`，可以更加方便地使用 [`iconfont.cn`](http://iconfont.cn/) 上托管的图标。更多用法请参阅 [Ant Design Pro - 业务图标](https://pro.ant.design/docs/biz-icon-cn) 的介绍。[#11322](https://github.com/ant-design/ant-design/pull/11322)
- 🔥 增加了一个新组件 [Skeleton](https://ant.design/components/skeleton-cn/)。
- 🔥 Menu 在 `horizontal` 模式下会自动收起来适应宽度。
- 🔥 Drawer 的 `placement` 支持 `top` 和 `bottom`，可以适应更多场景。

另外我们的 **Ant Design Pro 2.0.0** 也已同步发布，详细内容请看 [这里](https://www.yuque.com/ant-design/ant-design-pro/ant_design_pro_2.0_is_out)。

### 组件修复/功能增强：

- 🌟 新增 Modal.open 方法，用于可自定义图标的快捷对话框。[#11982](https://github.com/ant-design/ant-design/pull/11982) [@hsiehjack](https://github.com/hsiehjack)
- 🌟 Modal.info 增加 `getContainer` 的配置。[#11377](https://github.com/ant-design/ant-design/issues/11377)
- 🌟 合并优化了 RangePicker 的日历页脚 UI。
- 🌟 Anchor 组件增加 `onClick` 属性。[#11898](https://github.com/ant-design/ant-design/pull/11898)
- 🌟 Tab 组件增加 `renderTabBar` 属性。[#11856](https://github.com/ant-design/ant-design/pull/11856)
- 🌟 Input 组件增加 `select` 方法。[#11906](https://github.com/ant-design/ant-design/pull/11906)
- 🌟 Steps 增加 `initial` 属性。[#11180](https://github.com/ant-design/ant-design/issues/11180)
- 🐞 修复 Steps 点状步骤条样式错位的问题。[7d59075](https://github.com/ant-design/ant-design/commit/7d5907500f5b1db59d30a17ef466271af3655fa2)
- 🐞 修复在 Card 的 `headStyle` 中设置 fontSize 不生效的问题。[#11995](https://github.com/ant-design/ant-design/issues/11995)
- 🐞 修复了 Button 组件波浪动画混淆的问题。[#11985](https://github.com/ant-design/ant-design/issues/11985)
- 🐞 修复了 Modal.confirm 设置 `centered` 属性无效的问题。[#11969](https://github.com/ant-design/ant-design/issues/11969)
- 🐞 修复了在 Input.Group 的 `compact` 模式下设置第二个 Input 的前后缀会造成右边框消失的问题。 [#11965](https://github.com/ant-design/ant-design/pull/11965)
- 🐞 修复 Upload 组件上传图片较多时可能会造成图片错位的问题。[#11183](https://github.com/ant-design/ant-design/issues/11183)
- 🐞 修复 MonthPicker `renderExtraFooter` 失效的问题。[#8184](https://github.com/ant-design/ant-design/issues/8184)

## 3.8.4

`2018-08-27`

- 🐞 修复 Tag 组件删除 tag 后会造成换行的问题。
- 🐞 修复 Switch 单击时会产生 `Failed to execute 'removeChild' on 'Node'` 错误的问题。

## 3.8.3

`2018-08-26`

- 📖 重新编写了 [定制主题](https://ant.design/docs/react/customize-theme-cn) 文档，并提供了主要的 `Less` 变量说明。
- 🐞 修复 Badge 组件动画出现位置不正确的问题。[#11870](https://github.com/ant-design/ant-design/issues/11870)
- 🐞 修复 Cascader 组件在 IE 和 Edge 浏览器中浮层与数据列宽度不一致的问题。[#11857](https://github.com/ant-design/ant-design/issues/11857)
- 🐞 修复 Checkbox 组件在 Windows Chrome 下样式模糊的问题。[#11797](https://github.com/ant-design/ant-design/issues/11797)
- 🐞 修复 DatePicker.WeekPicker 组件的 `style` 属性无法生效的问题。[#11738](https://github.com/ant-design/ant-design/issues/11738)
- 🐞 修复 Drawer 组件在多层状态下切换出现的背景闪烁的问题。[#11813](https://github.com/ant-design/ant-design/issues/11813)
- 🐞 修复带有前缀或后缀的 Input.Group 组件在紧凑模式下右边框宽度过宽的问题。[#11863](https://github.com/ant-design/ant-design/issues/11863)
- Menu
	- 🐞 修复子菜单之间存在间隙导致鼠标 hover 时菜单消失的问题。[#11725](https://github.com/ant-design/ant-design/issues/11725)
	- 🐞 修复当分组菜单包含了第一个菜单项，并且在菜单收起时出现错误的问题。[a52370](https://github.com/ant-design/ant-design/commit/a523706625bd695f44401579d980089292089dda) [@ohhoney1](https://github.com/ohhoney1)
- 🐞 修复 Steps 组件中过长的 `description` 会被截断，无法完整展示的问题。[#11864](https://github.com/ant-design/ant-design/issues/11864)
- 🐞 修复 Tooltip 组件在 `title` 过长时会将单词拆分到两行的问题。[#11722](https://github.com/ant-design/ant-design/issues/11722)
- 🐞 修复 Tree 组件中的树节点无法接收自定义属性的问题。[#11423](https://github.com/ant-design/ant-design/issues/11423)
- 🐞 修复 Upload.Dragger 组件的有效拖拽区域不匹配的问题。[#11869](https://github.com/ant-design/ant-design/issues/11869)

## 3.8.2

`2018-8-18`
- 🐞 修复 Tag 组件 `visible` 属性初始值为 false 时仍然可见的问题。[#11757](https://github.com/ant-design/ant-design/issues/11757)
- 🐞 修复 Modal 文本在双击打开的时候会被选中的问题。[#11777](https://github.com/ant-design/ant-design/issues/11777)
- 🐞 修复 Rate 组件点击时的样式问题。[#11736](https://github.com/ant-design/ant-design/issues/11736)
- 🐞 修复 Badge 组件在子元素为 `display:block` 时的样式问题。[#84119d8](https://github.com/ant-design/ant-design/commit/84119d8959d55edf535a9cac5ff532e61b6ee698)
- Drawer
  - 🐞 修复 Drawer 组件不兼容 IE10 和 IE9  的问题。[#11583](https://github.com/ant-design/ant-design/issues/11583)
  - 🐞 修复 Drawer 组件在移动设备上无法垂直滚动的问题。 [#11443](https://github.com/ant-design/ant-design/issues/11443)
- TypeScript
  - 🐞 修复 TreeNode 组件缺少的 `selectable` 属性定义。[#11604](https://github.com/ant-design/ant-design/issues/11604) [@apieceofbart](https://github.com/apieceofbart)
  - 🐞 修复 Input 组件缺失 `autosize` 属性的类型错误。[#11697](https://github.com/ant-design/ant-design/issues/11697)

## 3.8.1

`2018-08-12`

- 🐞 修复 TimePicker 面板输入框宽度过长的问题。[80f8267](https://github.com/ant-design/ant-design/commit/80f82674fb63b068d047651ccba772999139f1b7)
- 🐞 修复 Tabs 中隐藏的输入框可能被聚焦的问题。[#11261](https://github.com/ant-design/ant-design/issues/11261)
- 🐞 修复 Badge 组件属性 `offset` 的坐标设置顺序问题。[#11648](https://github.com/ant-design/ant-design/pull/11648) [@tangjinzhou](https://github.com/tangjinzhou)
- Upload
  - 🐞 修复 Upload 组件删除按钮可能不展示的问题。[#10454](https://github.com/ant-design/ant-design/issues/10454)
  - 🐞 修复 Upload 组件缩略图地址没有文件扩展名时的显示问题。[#11684](https://github.com/ant-design/ant-design/pull/11684) [@elantion](https://github.com/elantion)
- 🐞 修复 Anchor 组件当 `affix=true` 时无法在滚动的窗口中固定的问题。[#11688](https://github.com/ant-design/ant-design/pull/11688) [@vitaliymaz](https://github.com/vitaliymaz)
- 🐞 修复 List.Grid 组件中的卡片宽度问题。[!11712](https://github.com/ant-design/ant-design/issues/11712)
- 🐞 修复 Radio 在 safari 下对齐的问题。[754a22c](https://github.com/ant-design/ant-design/commit/754a22ca24dee685666554778f53a5fe700959ff)
- 💄 添加点击动画效果到组件 Switch, Radio.Button 和 Tag。[9cf6ae6](https://github.com/ant-design/ant-design/commit/9cf6ae601010acbf665d575d34c0cc0918e604e7)
- TypeScript
  - 🐞 修复 Collapse 组件缺少的 `destroyInactivePanel` 定义。[#11646](https://github.com/ant-design/ant-design/pull/11646) [@zheeeng](https://github.com/zheeeng)
  - 💄 修复 AutoComplete 没有 `getPopupContainer` 属性定义的问题。[#11690](https://github.com/ant-design/ant-design/pull/11690) [@Huanghuiying0624](https://github.com/Huanghuiying0624)
  - 🐞 修复 Upload 组件的 `lastModifiedDate` 定义。[#11709](https://github.com/ant-design/ant-design/pull/11709) [@andycall](https://github.com/andycall)
-  💄 使用新的 React 生命周期函数，包括组件 Upload, CheckboxGroup, Layout.Sider, Tooltip, Popconfirm。[#11666](https://github.com/ant-design/ant-design/pull/11666) [@dancerphil](https://github.com/dancerphil) [#11682](https://github.com/ant-design/ant-design/pull/11682) [@dancerphil](https://github.com/dancerphil)

## 3.8.0

`2018-08-05`

非常感谢在 3.8.0 上提交 PR 的 24 位贡献者！

- 💄 支持 TypeScript 3，并优化了大量组件定义。
- 💄 使用 [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) 优化了等宽数字的实现方式，解决了数字字体和其他字体不一致的问题。[#11567](https://github.com/ant-design/ant-design/pull/11567) [@tibdex](https://github.com/tibdex)
- 🌟 Timeline 现在支持左/右/交替三种布局形式。[#11490](https://github.com/ant-design/ant-design/pull/11490) [@jrvboesch](https://github.com/jrvboesch)
- 🌟 Button 增加 `block` 属性用于撑满父容器宽度。[#11500](https://github.com/ant-design/ant-design/pull/11500) [@ilanus](https://github.com/ilanus)
- Tree
  - 💄 优化了组件可访问性。
  - 🐞 修复一个拖拽后节点失踪的问题。[#11492](https://github.com/ant-design/ant-design/issues/11492)
  - 🐞 修复一个在拖拽后节点位置没有垂直居中的问题。[#11458](https://github.com/ant-design/ant-design/issues/11458)
- Table
  - 🌟 新增 `rowSelection.columnTitle` 可以定制选择列的列标题。[#11042](https://github.com/ant-design/ant-design/issues/11042) [@littleLane](https://github.com/littleLane)
  - 💄 新增了一个[可拖拽改变列宽的例子](/components/table/#components-table-demo-resizable-column)。
  - 💄 支持按住 shift 进行多选。[#11404](https://github.com/ant-design/ant-design/issues/11404) [@RaphaelChauveau](https://github.com/RaphaelChauveau)
- Avatar
  - 🌟 新增 `onError` 属性，作为图片加载失败时的回调。[#11285](https://github.com/ant-design/ant-design/pull/11285/) [@paranoidjk](https://github.com/paranoidjk)
  - 🌟 新增 `size` 属性，方便自定义头像大小。[#11256](https://github.com/ant-design/ant-design/issues/11256) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🌟 Card 新增 `headStyle` 属性用于定制标题样式。[#11407](https://github.com/ant-design/ant-design/pull/11407) [@emersonlaurentino](https://github.com/emersonlaurentino)
- 🐞 修复 DatePicker 上无法使用 Tooltip 的问题。[#11451](https://github.com/ant-design/ant-design/issues/11451) [@yociduo](https://github.com/yociduo)
- 🐞 修复 Input.Group 上无法使用 Tooltip 的问题。[#11532](https://github.com/ant-design/ant-design/issues/11532) [@yociduo](https://github.com/yociduo)
- 🐞 修复一个 DatePicker 中时间面板 hover 时数字跳动的问题。[#11460](https://github.com/ant-design/ant-design/issues/11460)
- 🐞 Tabs 修复了一个切换焦点异常的问题。[#11261](https://github.com/ant-design/ant-design/issues/11261)
- Select
  - 🌟 支持 `data-*` 属性。
  - 🐞 修复一个选中项在列表中没有聚焦的问题。[#11268](https://github.com/ant-design/ant-design/issues/11268)
- 🌟 Calendar 新增了 `onChange` 作为日期改变的回调。[#11476](https://github.com/ant-design/ant-design/pull/11476) [@tangjinzhou](https://github.com/tangjinzhou)
- 🌟 Popconfirm 新增 `icon` 支持自定义图标。[#11191](https://github.com/ant-design/ant-design/pull/11191) [@nuintun](https://github.com/nuintun)
- Modal
  - 🌟 新增 `centered` 属性用于设置对话框垂直居中。[#11537](https://github.com/ant-design/ant-design/pull/11537) [@yoyo837](https://github.com/yoyo837)
  - 🐞 修复了多个对话框会被 ESC 一次性全部关掉的问题。[#11394](https://github.com/ant-design/ant-design/issues/11394) [@yoyo837](https://github.com/yoyo837)
  - 🐞 再次修复 Modal.confirm 的标题区域某些情况下会显示滚动条的问题。[#11568](https://github.com/ant-design/ant-design/pull/11568) [@cheshireoctopus](https://github.com/cheshireoctopus)
- 🌟 Progress 新增 `strokeLinecap` 属性用于调整边缘形状。[#11547](https://github.com/ant-design/ant-design/pull/11547) [@blatinier](https://github.com/blatinier)
- 🌟 Drawer 新增 `className` 并废弃 `wrapClassName`。[#11609](https://github.com/ant-design/ant-design/pull/11609) [@fergiar](https://github.com/fergiar)

## 3.7.3

`2018-07-28`

- 🐞 修复 Steps 在 `labelPlacement` 为 `vertical` 时标题与图标不对齐的问题。[#11426](https://github.com/ant-design/ant-design/pull/11426) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Cascader 设置 `fieldNames` 时不能正确读取子节点的问题。[#11311](https://github.com/ant-design/ant-design/pull/11311) [@405go](https://github.com/405go)
- TypeScript
  - 🐞 修复 Pagination 类型定义。[#11474](https://github.com/ant-design/ant-design/pull/11474) [@kagd](https://github.com/kagd)
  - 🐞 修复 Select 类型定义。[#11189](https://github.com/ant-design/ant-design/pull/11189<Paste>) [@thisJJ](https://github.com/thisJJ)

## 3.7.2

`2018-07-25`

- DatePicker
  - 🐞 **修复在受控模式下不能切换年月的问题。**[b9992f4](https://github.com/ant-design/ant-design/commit/b9992f4a08574efb47b6e6cd80eb1e888b9a1ede)
  - 🐞 修复在 `getDerivedStateFromProp` 的警告。[#11398](https://github.com/ant-design/ant-design/pull/11398) [@yoyo837](https://github.com/yoyo837)
- Drawer
  - 🐞 修复使用 `destroyOnClose` 时没有关闭动画的问题。[#11307](https://github.com/ant-design/ant-design/issues/11307)
  - 🐞 修复 `width` 以 `vw` 为单位时的显示错误。[#11326](https://github.com/ant-design/ant-design/issues/11326)
  - 🐞 修复 `wrapClassName` 属性无效的问题。
- 🐞 修复 Tooltip 文字溢出的问题。[#11402](https://github.com/ant-design/ant-design/pull/11402) [@weidapao](https://github.com/weidapao)
- 🐞 修复 Menu 在 `theme` 为 `dark` 是在 Layout.Header 里的样式问题。[#11400](https://github.com/ant-design/ant-design/pull/11400) [@hongxuWei](https://github.com/hongxuWei)
- 🐞 修复 InputNumber 的箭头按钮在使用了固定列的 Table 里显示错位的问题。[#11408](https://github.com/ant-design/ant-design/issues/11408)
- 🐞 修复 Select 使用分组时 Option 的圆角显示错误。[6cb6f5c](https://github.com/ant-design/ant-design/commit/6cb6f5c83ed634e67d5b5d0816d11aa0788a74d8)
- 🐞 修复 Table 第一次点击过滤按钮的时候 `onChange` 会被触发两次的问题。[#11164](https://github.com/ant-design/ant-design/issues/11164) [@adybionka](https://github.com/adybionka)
- 🐞 修复 Modal.confirm 的标题在 Firefox 下会显示滚动条的问题。[#11432](https://github.com/ant-design/ant-design/issues/11432)
- TypeScript
  - 🐞 修复 Radio.Group 类型定义。[#11409](https://github.com/ant-design/ant-design/pull/11409) [@eddiemoore](https://github.com/eddiemoore)
  - 🐞 修复 TreeSelect 类型定义。[#11442](https://github.com/ant-design/ant-design/pull/11442) [@JribiBelhassen](https://github.com/JribiBelhassen)
  - 🐞 修复 Badge 类型定义。[#11421](https://github.com/ant-design/ant-design/pull/11421) [@zongzi531](https://github.com/zongzi531)

## 3.7.1

`2018-07-21`

- 🐞 修复 Drawer 内无法显示弹层组件的问题。[#11304](https://github.com/ant-design/ant-design/issues/11304)
- 🐞 带页签的卡片页签支持 disabled 属性。[#11212](https://github.com/ant-design/ant-design/issues/11212)
- 🐞 修复锚点链接组件 href 改变不更新的问题。 [#11287](https://github.com/ant-design/ant-design/pull/11287/files) [@tangjinzhou](https://github.com/tangjinzhou)
- 🐞 修复 Menu 样式细节问题。[#11299](https://github.com/ant-design/ant-design/issues/11299)
- 🐞 修复 Drawer 组件设置 `destroyOnClose` 后关闭动画消失。[#11307](https://github.com/ant-design/ant-design/issues/11307)
- 🐞 修复 DirectoryTree 在 `expandedKeys` 属性可控时点击无法展开的问题。[#11366](https://github.com/ant-design/ant-design/issues/11366)
- 🐞 修复 ButtonGroup 中使用 Tooltip 的 Button 在 `disabled` 时样式不正确的问题。[11321](https://github.com/ant-design/ant-design/pull/11321) [@tangjinzhou](https://github.com/tangjinzhou)

## 3.7.0

3.7.0 是一个重磅更新，带来了很多激动人心的变化和新特性。
以下是一些亮点✨：

- 🔥 增加抽屉组件 : [`Drawer`](https://ant.design/components/drawer-cn/) [#10791](https://github.com/ant-design/ant-design/pull/10791)
- 🔥 新增 `Tree.DirectoryTree` 组件，作为内置的目录树。[#7749](https://github.com/ant-design/ant-design/issues/7749)

组件修复/功能增强：

- TreeSelect 组件升级 `rc-tree-select` 到 `2.0.5`，进行了重构，修复了 check 的逻辑。
  - 🌟 新增 `autoClearSearchValue` 属性，当多选模式下值被选择，用于自动清空搜索框。[10996](https://github.com/ant-design/ant-design/issues/10996)
  - 🌟 新增 `searchValue` 属性，用于设置搜索框的值。[6ff7dd8](https://github.com/ant-design/ant-design/commit/6ff7dd8fb953f079ee51ee638aaf4d832d0e10bf#diff-1e8e47abbdbe6e12d009aa61619ab22f)
  - 🌟 新增 `maxTagCount` 属性，用于设置显示标签的最大数量。[fb96c9d](https://github.com/ant-design/ant-design/commit/fb96c9db351e44a202f64f780470c6319a8a9626)
  - 🌟 新增 `maxTagPlaceholder` 属性，用于设置标签隐藏时显示的内容。[fb96c9d](https://github.com/ant-design/ant-design/commit/fb96c9db351e44a202f64f780470c6319a8a9626)
  - 🌟 搜索框支持大小写敏感。[#10990](https://github.com/ant-design/ant-design/issues/10990)
  - 🗑 `treeData` 数据格式中的 `label` 属性被废弃，使用 `title` 属性代替。
- Upload 组件升级 `rc-upload` 到 `2.5.0`
  - 🌟 新增 `directory` 属性，支持上传一个文件夹。[#7315](https://github.com/ant-design/ant-design/issues/7315)
  - 🌟 `action` 属性支持作为一个返回 `Promise` 对象的函数，使用更加灵活。[fd96967](https://github.com/ant-design/ant-design/commit/fd96967c872600b79bb608e9ddf9f8c38814a704)
- Dropdown 增加新特性，可以做为右键菜单来使用。
  - 🌟 给菜单项的 icon 提供默认的外间距样式。[8e60a59](https://github.com/ant-design/ant-design/commit/8e60a591fd24f644de4f67d69c2210e9270be9cc)
  - 🌟 触发方式为 `contextMenu` 时自动调整菜单的位置。[16e4260](https://github.com/ant-design/ant-design/commit/16e42601d6772fc0830ee237a1e751a38a118676)
- Table 组件升级 `rc-table` 到 `6.2.2`。[f2fddff](https://github.com/ant-design/ant-design/commit/f2fddff3fd0d6b36e8e6d8ee06bfcbcc85ead4f0)
  - 🌟 新增 `expanded` 作为 `expandedRowRender` 属性函数的第四个参数，用于获取当前行是否展开。[#10379](https://github.com/ant-design/ant-design/issues/10379)
  - 🌟 新增无须使用完全受控组件也能覆盖筛选菜单的能力。[59cc3a8](https://github.com/ant-design/ant-design/commit/59cc3a8b6c643f7206feedf2dc2c7154296ba3e3) [@chrvadala](https://github.com/chrvadala)
  - 🌟 `filterIcon` 属性支持作为一个返回 `ReactNode` 的函数。[1af4392](https://github.com/ant-design/ant-design/commit/1af4392ae9fbdaa6fcfbf2f0de5413100ef4a84a)
  - 🐞 修复在固定列时导致的行错位的问题。[#10392](https://github.com/ant-design/ant-design/issues/10392)
  - 🐞 修复在组件中使用 `combobox` 模式的 `Select` 导致的重影问题。[#10828](https://github.com/ant-design/ant-design/issues/10828)
  - 🐞 修复 components 属性值不能变化的问题。[c380186](https://github.com/ant-design/ant-design/commit/c380186e794a7735ae91e992f25a313158ee4984)
- 🗑 Select 组件废弃了 `combobox` 模式，请使用 `AutoComplete` 组件代替。[53046a4](https://github.com/ant-design/ant-design/commit/53046a454ad83ca03dc313e63f56474ed1173002)
- 🌟 Alert 组件允许传递 `data-*`、`aria-*` 和 `role-*` 属性到组件内部。[f0b684d](https://github.com/ant-design/ant-design/commit/f0b684de6a7c422f0de56e1ef72aeb35ab25a858)
- 🌟 Avatar 组件新增 `alt` 属性，用于设置图像无法显示时的替代文本。[#10798](https://github.com/ant-design/ant-design/pull/10798)
- 🌟 DatePicker 组件允许传递 `data-*`、`aria-*` 和 `role-*` 属性到组件内部的 `Input`。[e63f9d4](https://github.com/ant-design/ant-design/commit/e63f9d4beb440de92c0b0ce8e6e83f7e24fef792)
- 🌟 Input.Search 组件新增 `event` 事件对象作为 `onSearch` 属性函数的第二个参数。[#11015](https://github.com/ant-design/ant-design/issues/11015)
- 🌟 Layout.Sider 组件新增 `onBreakPoint` 属性，用作响应式布局的断点触发时的回调函数。[#10750](https://github.com/ant-design/ant-design/pull/10750) [@nuintun](https://github.com/nuintun)
- 🌟 Modal 组件新增 `okButtonProps` 和 `cancelButtonProps` 属性，分别用于设置 `取消` 按钮和 `确定` 按钮的属性。[#10955](https://github.com/ant-design/ant-design/pull/10955) [@djyde](https://github.com/djyde)
- 🌟 Progress 组件新增 `strokeColor` 属性，用于设置进度条的颜色。[#10725](https://github.com/ant-design/ant-design/issues/10725)
- 🌟 Radio.Group 组件新增 `buttonStyle` 属性 (可选值 `outline | solid`)，用于设置 `RadioButton` 的风格样式。[60e3cfa](https://github.com/ant-design/ant-design/commit/60e3cfa37ac0dae3a895e74c1fe5351c54536a07#diff-c2ee8b5a368a121e9d2cc2661212045d)
- 🌟 Spin 组件新增 `setDefaultIndicator` 静态方法，用于设置全局的加载指示符。[#10787](https://github.com/ant-design/ant-design/issues/10787)
- 🌟 Tag 组件新增 `visible` 属性，用于设置是否显示标签。[4ac0277](https://github.com/ant-design/ant-design/commit/4ac027781372dda08a5458bc73836fbc14dfe51f)
- Tree 组件升级 `rc-tree` 到 `1.12.0`
  - 🌟 新增 `loadedKeys` 属性，用于设置已经加载的节点，需要配合 `loadData` 使用。[#10666](https://github.com/ant-design/ant-design/issues/10666)
  - 🌟 新增 `onLoad` 属性，作为节点加载完毕时的回调函数。[c488aca](https://github.com/ant-design/ant-design/commit/c488aca05e11d942d77c1b6bff45d12bbb1a2bd6)
- 🌟 增加 `okButtonDisabled` and `cancelButtonDisabled` 属性用于禁用确定和取消按钮。[#10955](https://github.com/ant-design/ant-design/pull/10955)
- 🌟 Cascader 新增 fieldNames 并废弃拼写错误的 filedNames。 [#10896](https://github.com/ant-design/ant-design/issues/10896)
- 🐞 修复时间轴不能与`Tooltip`一起使用的问题。 [0e3b67e](https://github.com/ant-design/ant-design/commit/0e3b67e9999d867cc304f3be61a8a042a2ab92ee)
- 🐞 修复当 Avatar 自定义大小时，圆角不改变的问题。[e1e6523](https://github.com/ant-design/ant-design/commit/e1e6523452286ba56f20b73abad762a58ea7d7bc)

## 3.6.6

`2018-07-07`

- 🐞 修复 `DatePicker` 组件被选中日期的样式问题。[#6146](https://github.com/ant-design/ant-design/issues/6146) [#9529](https://github.com/ant-design/ant-design/issues/9529)
- 🐞 修复 `DatePicker.RangePicker` 组件中被选中日期的样式问题。[004561b](https://github.com/ant-design/ant-design/commit/004561ba1f3b894dc164225e9e27b0a90679d15c)
- 🐞 修复 `Cascader` 组件在 `Form.Item` 下的对齐问题。[#9827](https://github.com/ant-design/ant-design/issues/9827) [#11133](https://github.com/ant-design/ant-design/issues/11133)
- 🐞 修复 `InputNumber` 组件的 `handler` 的背景样式问题。[4aabc53](https://github.com/ant-design/ant-design/commit/4aabc5374497359e13a958ef81ae4569db6164a7)
- 🐞 修复 `Table` 组件在 `FireFox` 浏览器下数据为空时的头部溢出的样式问题。[#11135](https://github.com/ant-design/ant-design/issues/11135)

## 3.6.5

`2018-07-02`

- 🐞 修复 `Transfer` 组件的文本 "Not Found" 在 IE 或 Edge 浏览器上显示异常。[#9697](https://github.com/ant-design/ant-design/issues/9697)
- 🐞 修复 Chrome 在缩放模式下，`Card` 组件的边框被标题的背景色覆盖。[#9085](https://github.com/ant-design/ant-design/issues/9085)
- TypeScript
  - 🐞 修复 `Table` 不兼容的类型 `size`。[bf5b6ae1](https://github.com/ant-design/ant-design/commit/bf5b6ae1f3b5da4629a7d10a2d1764eaa3fbbb04)
  - 🐞 修复 `Select` 组件的 `showArrow` 类型定义。[cde2a6b6](https://github.com/ant-design/ant-design/commit/cde2a6b6f011a5b3a367b3f58731def547bc98d8)
- 🐞 修复 Pagination 全局 locale 设置不能被组件 locale 覆盖的问题。[babbbdd4](https://github.com/ant-design/ant-design/commit/babbbdd4e5c33ca050f8ee08969185c8d3269b4c)
- 🐞 修复 `Tooltip` 组件的 `max-width` 样式，使 `overlayStyle.maxWidth` 可覆盖。[e2b359e9](https://github.com/ant-design/ant-design/commit/e2b359e9c3dae067eeba37a886f7896474c87e31)
- 🐞 修复 `Select` 组件的样式，避免过长文本的溢出。[#11035](https://github.com/ant-design/ant-design/issues/11035)

## 3.6.4

`2018-06-23`

- 🐞 修复 `Steps` 组件的 `@process-icon-color` 样式定义。[#10973](https://github.com/ant-design/ant-design/issues/10973)
- 🐞 修复 `RangePicker` 组件使用预置范围时的样式问题。[#10986](https://github.com/ant-design/ant-design/issues/10986)
- 🐞 修复 `Dropdown` 组件可能报出的 `non-boolean attribute` 的警告。[#7798](https://github.com/ant-design/ant-design/issues/7798)
- TypeScript
  - 🌟 给 `Tree` 组件添加 `className` 的定义。[#10950](https://github.com/ant-design/ant-design/issues/10950)
  - 🌟 给 `Tree` 组件添加 `selectable` 的定义。[3fb478e](https://github.com/ant-design/ant-design/commit/3fb478e743f3bad23dc300f501df11e5423468ba)

## 3.6.3

`2018-06-17`

- 🐞 修复 Upload 图片文件后缀名为大写时无法正确识别的问题。[#10928](https://github.com/ant-design/ant-design/pull/10928) [@sliwey](https://github.com/sliwey)
- 🐞 修复 InputNumber 在浏览器缩放时边框样式丢失的问题。[#10562](https://github.com/ant-design/ant-design/issues/10562)
- 🐞 修复 Spin 内使用 `position: fixed` 的元素无法固定的问题。[#10196](https://github.com/ant-design/ant-design/issues/10196)
- 🐞 修复小号表格下固定列的边框样式问题。[#9754](https://github.com/ant-design/ant-design/issues/9754)
- 🐞 修复 Table `filterIcon` 的 `className` 属性失效的问题。[#10937](https://github.com/ant-design/ant-design/issues/10937)
- 🐞 修复 Affix 的 `offsetTop` 和 `offsetBottom` 无法动态修改的问题。[#10874](https://github.com/ant-design/ant-design/issues/10874)
- TypeScript
  - 🐞 修复 TreeSelect `TS2339` 错误。[#10868](https://github.com/ant-design/ant-design/issues/10868)
  - 🌟 补充 Form 的 `validateMessages` 和 `onFieldsChange` 参数的定义。
  - 🌟 优化 Button 的属性定义。[#10877](https://github.com/ant-design/ant-design/pull/10877) [@zheeeng](https://github.com/zheeeng)
  - 🌟 补充 AutoComplete 的 `backfill` 属性定义。[#10909](https://github.com/ant-design/ant-design/pull/10909) [@zhanba](https://github.com/zhanba)

## 3.6.2

`2018-06-09`

- 🐞 修复 Table 数据变化时全选勾选框状态显示不正确的问题。[#10629](https://github.com/ant-design/ant-design/issues/10629)
- 🐞 修复 Button.Group 中使用 disabled 按钮时缺失边框。
- 🐞 修复 Upload 中 `beforeUpload` 返回 `false` 时，文件列表排序会被反转的问题。[#10681](https://github.com/ant-design/ant-design/issues/10681)
- 🐞 修复 Calendar 表格中内容溢出的问题。[#10808](https://github.com/ant-design/ant-design/pull/10808) [@Yangzhedi](https://github.com/ant-design/Yangzhedi)
- Spin
  - 🐞 修复使用图标时不能按照 `size` 正确显示大小的问题。[#10786](https://github.com/ant-design/ant-design/issues/10786)
  - 🐞 修复默认旋转时 `delay` 不生效的问题。[#10727](https://github.com/ant-design/ant-design/pull/10727) [@dreamerblue](https://github.com/dreamerblue)
- 修复 Badge 的状态色不跟主题色变化的问题。
- TypeScript
  - 🐞 修复 Menu 类型定义。[#10773](https://github.com/ant-design/ant-design/issues/10773)
  - 🐞 修复 AutoComplete 类型定义。[#10745](https://github.com/ant-design/ant-design/issues/10745) [#10619](https://github.com/ant-design/ant-design/issues/10619)
  - 🐞 修复 Tree 类型定义。[#10841](https://github.com/ant-design/ant-design/pull/10841) [@Voronar](https://github.com/Voronar)
  - 🐞 修复 Checkbox.Group 的类型定义。[#10677](https://github.com/ant-design/ant-design/pull/10677)

## 3.6.0

`2018-06-02`

* 🌟 `Form` 表单错误信息展示支持传入 ReactNode。 [#10136](https://github.com/ant-design/ant-design/issues/10136) [@lovekonakona](https://github.com/lovekonakona)
* 🌟 `List` 组件支持指定分页器的位置。 [#10581](https://github.com/ant-design/ant-design/pull/10581) [@zheeeng](https://github.com/zheeeng)
* 🌟 `Layout.Sider` 支持 dark/light 主题定制。 [#10142](https://github.com/ant-design/ant-design/issues/10142) [@pd4d10](https://github.com/pd4d10)
* 🌟 支持 Ant Design 站点的离线模式。 [#10625](https://github.com/ant-design/ant-design/issues/10625)
* 🌟 `Transfer` 新增 `style` 以及 `operationStyle` 属性配置样式。 [@eduludi](https://github.com/eduludi)
* 🌟 `Message` 增加 promise 化的回调接口。 [#10421](https://github.com/ant-design/ant-design/issues/10421) [@zhujinxuan](https://github.com/zhujinxuan)
* 🐞 修复编译时 typescript v2.9.1兼容性问题。 [#10729](https://github.com/ant-design/ant-design/issues/10729) [@karol-majewski](https://github.com/karol-majewski)
* 🐞 修复 `Menu` 嵌套超过两层时选中最里层后对应最外层没有亮起问题。 [#8666](https://github.com/ant-design/ant-design/issues/8666) [@stonehank](https://github.com/stonehank)
* 🐞 修复 `Affix` 组件 offsetBottom 无效问题。 [#10674](https://github.com/ant-design/ant-design/issues/10674)

## 3.5.4

`2018-05-26`

- 🐞 修复 `Cascader` 的 `showSearch` 无效问题。[968488a2](https://github.com/ant-design/ant-design/commit/968488a2fac9bcb16bee9f0c248f49bca00dbec6)
- 🐞 使 `Badge[status]` 支持 `Tooltip`。[#10626](https://github.com/ant-design/ant-design/issues/10626)
- 🐞 修复父元素使用 `text-align` 会影响 `Spin` 的问题。[#10643](https://github.com/ant-design/ant-design/pull/10643) [@wmzhong](https://github.com/wmzhong)
- 💄 `Table` 换行从 `break-all` 改为 `break-word`。[#10655](https://github.com/ant-design/ant-design/pull/10655) [@clinyong](https://github.com/clinyong)
- 🌟 `Search` 在未定义 `enterButton` 时，点击搜索图标将触发 `onSearch`。[36ffe7e1](https://github.com/ant-design/ant-design/commit/36ffe7e1dc9d9473c8c68168ab79b7a03a604702)

## 3.5.3

`2018-05-20`

- 🐞 修复了 `Affix` 当 `offsetTop === 0`，值将变为 `undefined` 的问题 [#10566](https://github.com/ant-design/ant-design/pull/10566)
- 🐞 修复了 `Menu` item 中的高亮链接颜色问题 [09d5e36](https://github.com/ant-design/ant-design/commit/09d5e36cfa27e371a7b4d4e68276a279698ea901)
- 🐞 修复了 `Input.Group` 组件阴影被遮盖的问题 [#10230](https://github.com/ant-design/ant-design/issues/10230)
- 🐞 修复了 `Transfer` 组件 checkbox 事件触发两次的问题 [`#10480`](https://github.com/ant-design/ant-design/issues/10480)
- 💄 统一 less 的变量命名 [12d3046](https://github.com/ant-design/ant-design/commit/12d3046687a0dcdb51fece08dd2bea64f185cc40)
- 💄 微调了 `Dropdown` 的样式 [8e2f72f](https://github.com/ant-design/ant-design/commit/8e2f72ffe0eb300f5997296726b02246bf990c8f)
- 💄 现在中文文档的组件会用中文语言包进行演示。[9b17a94](https://github.com/ant-design/ant-design/commit/9b17a943f5d57d40d65041b7b0c247add09d2851)
- 💄 主站主题切换 修改为 `antd-theme-generato` ，感谢 [@mzohaibqc](https://github.com/mzohaibqc) 的工作.
- TypeScript
  - 🐞 修复了 `Row` 中 gutter 属性的类型问题 [b7d508e](https://github.com/ant-design/ant-design/commit/b7d508e1662bf20a0cacbe6440a2ce31a65a8a59)
  - 💄 改进了 `Form` 组件类型 [#10564](https://github.com/ant-design/ant-design/pull/10564)
  - 💄 改进了 `Button` 和 `Tag` 类型 [1ed9fed](https://github.com/ant-design/ant-design/commit/1ed9fed2cf1c99b947359fafb101b2e58213cb48)

## 3.5.2

`2018-05-13`

- 🐞 修复 `Table` 过滤器和 `Transfer` 复选框无法点击的问题。[#10452](https://github.com/ant-design/ant-design/issues/10452)
- 🐞 修复 `Cascader` 的 `displayRender` 里的链接无法点击的问题。[#10433](https://github.com/ant-design/ant-design/issues/10433)
- 🐞 修复 `Button` ref 不兼容问题。[#10405](https://github.com/ant-design/ant-design/issues/10405)
- 🐞 修复 `Form` 表单项校验位置高度时出现抖动问题。[#10445](https://github.com/ant-design/ant-design/issues/10445)
- 🌟 设置 `Layout` 宽度时，允许使用任何的 CSS 单位。 [#10479](https://github.com/ant-design/ant-design/pull/10479)

## 3.5.1

`2018-05-09`

- 🐞 修复 Input.Group 在 Form 下样式错位的问题。[#10371](https://github.com/ant-design/ant-design/issues/10371)
- 🐞 修复 Select 箭头和内容重叠的问题。[#10383](https://github.com/ant-design/ant-design/issues/10383)
- 🐞 移除 Collapse 点击时的 focus 样式。
- 🐞 移除 Input.Group 和 Checkbox 不必要的 `z-index`。[#9840](https://github.com/ant-design/ant-design/issues/9840) [#10385](https://github.com/ant-design/ant-design/issues/10385)
- 🐞 修复一个数字等宽字体没有加粗的问题。
- Table
  - 💄 重写了可编辑表格的演示。[#10119](https://github.com/ant-design/ant-design/pull/10119)
  - 🐞 修复一个表格列内容互相重叠的问题。[#9822](https://github.com/ant-design/ant-design/issues/9822)
- TypeScript
  - 🐞 调整 Breadcrumb.Item 的类型。[#10372](https://github.com/ant-design/ant-design/pull/10372) [@karol-majewski](https://github.com/karol-majewski)
  - 🐞 修复 Table 的 `rowSelection` 的类型。[#10374](https://github.com/ant-design/ant-design/issues/10374)

## 3.5.0

`2018-05-04`

- 🌟 组件 `Badge` 新增 `title` 属性支持鼠标 hover 的时候显示。[74d81c2](https://github.com/ant-design/ant-design/commit/74d81c2d078a3c84b3e44cbfbdd99b8f479ea71d) [@ludwigbacklund](https://github.com/ludwigbacklund)
- 🌟 添加 `successPercent` 为 `Progress[format]` 的参数。[#10096](https://github.com/ant-design/ant-design/issues/10096)
- 🌟 更新 `rc-notification` 到 3.1.0 来支持组件 `Notification` 的 `maxCount` 属性。[#10161](https://github.com/ant-design/ant-design/pull/10161) [@jzhangs](https://github.com/jzhangs)
- 🌟 更新 `rc-cascader` 到 1.13.0 来支持组件 `Cascader` 的 `filedNames` 属性。[react-component/cascader#23](https://github.com/react-component/cascader/pull/23) [@405go](https://github.com/405go)
- 🌟 组件 `Notification` 支持通过 key 更新通知属性。 [react-component/notification#40](https://github.com/react-component/notification/pull/40) [@yevhen-hryhorevskyi](https://github.com/yevhen-hryhorevskyi)
- 🌟 组件 `List` 支持内置的翻页功能。[#10135](https://github.com/ant-design/ant-design/pull/10135)
- Table
  - 🌟 新增 `sortOrder` 参数传递给列配置中的 `sorter` 方法。[#10306](https://github.com/ant-design/ant-design/pull/10306) [@kumarashwin](https://github.com/kumarashwin)
  - 🐞 修复头部单元格的边框样式问题。[#10359](https://github.com/ant-design/ant-design/issues/10359)
  - 🐞 修复当数据变化时用户选择项丢失的问题。[#10332](https://github.com/ant-design/ant-design/pull/10332) [@chrvadala](https://github.com/chrvadala)
- `Menu` 升级 `rc-menu` 到 `7.x` [#10305](https://github.com/ant-design/ant-design/pull/10305)
  - 🌟 更好的 aria-* 属性支持。[react-component/menu#137](https://github.com/react-component/menu/pull/137)
  - 🌟 一些内部优化提升组件性能。[react-component/menu#133](https://github.com/react-component/menu/pull/133)
  - 🌟 支持将属性传递到菜单项中。[react-component/menu#135](https://github.com/react-component/menu/pull/135)
  - 🐞 修复一些快捷键的问题。[react-component/menu#132](https://github.com/react-component/menu/pull/132)
- Collapse
  - 🌟 更新 `rc-collapse` 到 1.9.0 优化键盘支持。[react-component/collapse#84](https://github.com/react-component/collapse/pull/84/)  [@kossel](https://github.com/kossel)
  - 🌟 支持通过 less 定义组件 `Collapse` 的样式。[#9943](https://github.com/ant-design/ant-design/pull/9943) [@davidhatten](https://github.com/davidhatten)
- Select
  - 🐞 修复 `placeholder` 的 ts 类型问题。[#10282](https://github.com/ant-design/ant-design/pull/10282) [@thomasthiebaud](https://github.com/thomasthiebaud)
  - 🐞 修复不显示箭头时多余的空白。[#10296](https://github.com/ant-design/ant-design/pull/10296)
  - 🐞 修复属性 `value` 的 typescript 类型错误。[#10336](https://github.com/ant-design/ant-design/pull/10336) [@paranoidjk](https://github.com/paranoidjk)
- Input
  - 🐞 修复 `Input.Search` 当 disabled 为 true 时按钮没有被禁用的问题。[#10040](https://github.com/ant-design/ant-design/issues/10040)
  - 🐞 修复 `Input.Group` 在表单中对齐的问题。[#10281](https://github.com/ant-design/ant-design/issues/10281)
- Form
  - 🐞 修复 `Form.onValuesChange` 的 ts 类型错误。[#10231](https://github.com/ant-design/ant-design/pull/10231) [@whtsky](https://github.com/whtsky)
  - 🐞 修复 `ComponentDecorator` typescript 定义的错误。[#10324](https://github.com/ant-design/ant-design/pull/10324) [@paranoidjk](https://github.com/paranoidjk)
- 🐞 修复 `Divider` 为 dashed 时的样式问题。[#10216](https://github.com/ant-design/ant-design/issues/10216)
- 🐞 修复 `Spin` 覆盖层的展示问题。[#10227](https://github.com/ant-design/ant-design/issues/10227)
- 🐞 修复 `Notification` 鼠标 hover 是图标的颜色问题。[#10272](https://github.com/ant-design/ant-design/issues/10272)
- 🐞 修复 `Upload` 组件属性 `lastModifiedDate` 的拼写错误。[#10315](https://github.com/ant-design/ant-design/pull/10315) [@danielg2002](https://github.com/danielg2002)
- 🐞 修复 `Button` 的属性类型，使用 `React.HTMLProps`。[#10229](https://github.com/ant-design/ant-design/pull/10229) [@whtsky](https://github.com/whtsky)
- 🐞 修复 less 命名约定不一致的问题。 [#10275](https://github.com/ant-design/ant-design/issues/10275)

## 3.4.5

`2018-05-03`

- 🐞 修复 Upload 上传文件名不展示（file 对象属性为空）的问题。[#10319](https://github.com/ant-design/ant-design/issues/10319)

## 3.4.4

`2018-04-28`

- 🐞 修复 3.4.2 中引入的 Upload 中 onChange 参数 `{ file }` file 不是 File 实例的问题。[#10293](https://github.com/ant-design/ant-design/issues/10293)
- 🐞 修复 webpack@4 下使用 Tree Shaking 样式丢失的问题。[#10217](https://github.com/ant-design/ant-design/pull/10217) [@whtsky](https://github.com/whtsky)

## 3.4.3

`2018-04-23`

- 🐞 修复了 webpack@4 下使用 Tree Shaking 样式丢失的问题。[#10197](https://github.com/ant-design/ant-design/pull/10197) [@Aladdin-ADD](https://github.com/Aladdin-ADD)
- 🐞 修复 `Menu` 组件在 `dark` 主题下点击区域的问题。[#10187](https://github.com/ant-design/ant-design/pull/10187) [@dgeibi](https://github.com/dgeibi)

## 3.4.2

`2018-04-22`

- 💄 部署网站到 [netlify](http://netlify.com/)，解决网站被墙的问题。
- 🐞 修复和调整 Menu、Tooltip、Card、Anchor、Avatar、Form、Tabs、Transfer、Tree、AutoComplete 等组件的 TypeScript 定义。
- 💄 增加 `sideEffects` 配置以优化 Tree Shaking 效果。[#10043](https://github.com/ant-design/ant-design/pull/10043) [@Aladdin-ADD](https://github.com/Aladdin-ADD)
- List
  - 🐞 修复多余边框问题。[#10028](https://github.com/ant-design/ant-design/issues/10028)
  - 🐞 修复 `locale` 属性被传递给 div 的警告。[#10128](https://github.com/ant-design/ant-design/pull/10128) [@slonoed](https://github.com/slonoed)
- 🐞 修复 Upload 的文件 url 带有参数时，图片预览效果失效的问题。[#10102](https://github.com/ant-design/ant-design/issues/10102)
- 🐞 修复 Progress 的百分比越界时的展现。[0eb8357](https://github.com/ant-design/ant-design/commit/0eb835772dbaa7ed14babe03fc177821c5bd5ca5)
- Menu
  - 🐞 修复 SubMenu 的失效箭头样式。[#10113](https://github.com/ant-design/ant-design/issues/10113)
  - 🐞 修复 `collapsedWidth` 为像素字符串 `40px` 菜单宽度失效的问题。[#10140](https://github.com/ant-design/ant-design/issues/10140)
- 🐞 修复一个某些情况下 Form 内使用受控组件时无法编辑的问题。[#9790](https://github.com/ant-design/ant-design/issues/9790)
- 🐞 修复 Card 切换 loading 状态时的内边距跳动问题。[#10052](https://github.com/ant-design/ant-design/pull/10052) [@zheeeng](https://github.com/zheeeng)
- 🐞 修复 Avatar 图片加载失败时的文字没有正确缩放的问题。[#10184](https://github.com/ant-design/ant-design/pull/10184)
- 🐞 修复 Table 的 `getCheckboxProps` 无法动态更新的问题。[#10133](https://github.com/ant-design/ant-design/issues/10133)
- 🐞 修复 CheckGroup 指定 `prefixCls` 没有传递给 Checkbox 的问题。[#9950](https://github.com/ant-design/ant-design/issues/9950)

## 3.4.1

`2018-04-08`

- 🐞 修复了 Badge 代码错误引起的 TypeScript 类型报错。[#9931](https://github.com/ant-design/ant-design/issues/9931)
- 💄 优化了 Card `actions` 点击区域的范围。[#9882](https://github.com/ant-design/ant-design/issues/9882)
- 🐞 修复了 Divider 与浮动元素一起使用时的样式问题。[#9956](https://github.com/ant-design/ant-design/issues/9956)
- 🐞 修复了 Form 高级搜索模式下的样式问题。[#9907](https://github.com/ant-design/ant-design/issues/9907)
- 🐞 补充了 Table 缺失的 `onHeaderRow` TypeScript 定义。[#9902](https://github.com/ant-design/ant-design/pull/9902) [@Nokecy](https://github.com/Nokecy)
- 💄 优化了 Tree 自定义图标示例。[#9893](https://github.com/ant-design/ant-design/pull/9893)
- 🐞 修复了 Upload 对无扩展名图片地址的预览展示问题。[#9936](https://github.com/ant-design/ant-design/pull/9936)

## 3.4.0

`2018-04-01`

- Tree
  - 🛠 在这个版本里，我们重构了 Tree 底层的代码，以解决一些存在了很久的问题。
  - 🌟 新增 `defaultExpandParent` 用于在第一次渲染时自动展开父节点。
  - 🌟 新增 `disabled` 用于禁用整棵树。
  - 🌟 TreeNode 新增 `icon` 用于设置自定义图标。
  - 🌟 优化了 TreeNode 设置 `disabled` 时的勾选逻辑。
- 🌟 Anchor 新增 `getContainer` 用于指定内容滚动的容器。
- 🌟 Table 新增 less 变量 `@table-expanded-row-bg`。[#9789](https://github.com/ant-design/ant-design/pull/9789)
- 🐞 修复一处 less 语法错误。[#9832](https://github.com/ant-design/ant-design/pull/9832) [@jojoLockLock](https://github.com/jojoLockLock)
- 🐞 修复 LocaleProvider 中 moment.locale 调用报错的问题。 [#9853](https://github.com/ant-design/ant-design/pull/9853)
- 🐞 修复 WeekPicker 的 style 属性不生效的问题。[#9848](https://github.com/ant-design/ant-design/issues/9848)
- 🐞 修复 Layout.Sider 的 TypeScript 定义。[#9885](https://github.com/ant-design/ant-design/pull/9885) [@zachguo](https://github.com/zachguo)
- 💄 优化了 Modal 中超长内容的显示。[#9592](https://github.com/ant-design/ant-design/pull/9592)
- 🌟 新增斯洛维尼亚语。

## 3.3.3

`2018-03-25`

- 回退上个版本 Upload 中 `file` 类型的修改。

## 3.3.2

`2018-03-24`

- 🐞 `Carousel`: 升级 `react-slick` 版本以修复宽度计算错误。 [#3659](https://github.com/ant-design/ant-design/issues/3659)
- 💄 `Rate`: 调整 `disabled` 样式。 [#9747](https://github.com/ant-design/ant-design/issues/9747)
- 💄 `Modal`: 调整 `confirm-modal` 样式以修复 content 内使用栅格会错位的问题。 [#9374](https://github.com/ant-design/ant-design/issues/9374)
- 💄 `Menu`: 调整样式以修复鼠标事件范围。[#9666](https://github.com/ant-design/ant-design/pull/9666) [@dgeibi](https://github.com/dgeibi)
- 🐞 `Upload`: 修复 `beforeUpload` 的 `file` 类型错误。 [#9775](https://github.com/ant-design/ant-design/issues/9775)
- 🐞 `Button`: 修复文本改变时，空格插入没有重新计算 [4502ad8](https://github.com/ant-design/ant-design/commit/4502ad8376e536c450fa4f27d2a5855be5a153e7)

## 3.3.1

`2018-03-18`

- 💄 调整 danger Button 的 `focus` 样式。
- 🐞 修复 enterButton 的值为 button 元素时显示错误的问题。 [#9639](https://github.com/ant-design/ant-design/issues/9639)
- 🐞 修复 Table 中的 `column.title` 的缺少 key 的问题。 [#9658](https://github.com/ant-design/ant-design/issues/9658) [@terence55](https://github.com/terence55)
- 🐞 修复 `scroll: { x: true }` 在 `.ant-table-scroll table`宽度为 `auto`的情况下不工作的问题。[#9704](https://github.com/ant-design/ant-design/pull/9704)
- 🐞 修复表单校验文字消失的时候输入框会抖一下的问题。 [#8831](https://github.com/ant-design/ant-design/issues/8831)
- 🐞 修复 `TimePicker` 里的 isMoment 调用在 parcel 里会报错的问题。[85c78e4](https://github.com/ant-design/ant-design/commit/85c78e49a91737c2841dc42621db21ca248b62b4)
- 💄 调整 Table 的圆角样式。 [#9674](https://github.com/ant-design/ant-design/pull/9674)

## 3.3.0

`2018-03-12`

- 🌟 `Alert` 组件新增 `afterClose` 属性，用于实现更流畅的关闭效果。[#9448](https://github.com/ant-design/ant-design/pull/9448) [@Hughen](https://github.com/Hughen)
- 🌟 `Calendar` 组件新增 `validRange` 属性，用于设置显示的时间范围。[71f65a0](https://github.com/ant-design/ant-design/commit/71f65a0be8e72a67f334c57e79ae3ff5fb640630) [@Rohanhacker](https://github.com/Rohanhacker)
- 🌟 `Card` 组件新增 `defaultActiveTabKey` 属性，用于初始化选中面板的 key。[30fe88d](https://github.com/ant-design/ant-design/commit/30fe88d4bdcec765bf92ca32a755d9646b36978e) [@u3u](https://github.com/u3u)
- `DatePicker`
    - 🌟 新增 `dropdownClassName` 属性，用于设置弹出日历的 className。[#7211](https://github.com/ant-design/ant-design/issues/7211)
    - 🐞 修复解析 `moment` 对象出错的问题。[#9539](https://github.com/ant-design/ant-design/pull/9539)
    - 🐞 修复引入土耳其语 `tr_TR` 文件的问题。[#9373](https://github.com/ant-design/ant-design/issues/9373)
- 🌟 `Divider` 组件新增 `orientation` 属性，用于设置分割线内文本的对齐方式。[#9275](https://github.com/ant-design/ant-design/pull/9275) [@jrvboesch](https://github.com/jrvboesch)
- 🌟 `Modal` 组件新增 `keyboard` 属性，用于设置按下 `Esc` 键是否可以关闭 `Modal`。[#8818](https://github.com/ant-design/ant-design/issues/8818)
- 🌟 优化 `Radio` 和 `Checkbox` 组件 `onChange` 属性中的事件参数的 `TypeScript` 类型定义的问题。[#9574](https://github.com/ant-design/ant-design/issues/9574)
- `Table`
    - 🌟 新增 `pagination` 属性的配置项 `position`，用于设置分页的显示位置。[#9357](https://github.com/ant-design/ant-design/pull/9357) [@kanweiwei](https://github.com/kanweiwei)
    - 🌟 新增 `rowSelection` 属性的配置项 `onSelect` 回调函数的事件参数。[#9376](https://github.com/ant-design/ant-design/pull/9376) [@kanweiwei](https://github.com/kanweiwei)
    - 🌟 新增 `rowSelection` 属性的配置项 `columnWidth`，用于设置选择框的列宽。[#9474](https://github.com/ant-design/ant-design/pull/9474) [@SimpleFrontend](https://github.com/SimpleFrontend)
    - 🐞 修复 `Table` 组件在 `Chrome` 下圆角边框样式的问题。[af8e54f](https://github.com/ant-design/ant-design/commit/af8e54f1d6ac2891892e39b153cbe3e998370f61)
- 🌟 `Timeline` 组件新增 `pendingDot` 属性，用于设置幽灵节点的图标。[#9546](https://github.com/ant-design/ant-design/pull/9546) [@SimpleFrontend](https://github.com/SimpleFrontend)
- 🌟 `TimePicker` 组件新增 `inputReadOnly` 属性，用于设置组件是否只读。[4a69446](https://github.com/ant-design/ant-design/commit/4a69446be155c1c176b18cb2c31459f999aa5d5e) [@JesperWe](https://github.com/JesperWe)
- 🌟 `TreeSelect` 组件新增 `dropdownClassName` 属性。[69b154f](https://github.com/ant-design/ant-design/commit/69b154f9a9cfa5f2d89a82b6ed730d4d8793de73) [56e4ce0](https://github.com/ant-design/ant-design/commit/56e4ce099d950601538d72243563021e8083776b)
- 🌟 优化 `Upload` 组件在上传非图片格式文件时的预览效果。[#9621](https://github.com/ant-design/ant-design/pull/9621) [@zswang](https://github.com/zswang)
- 🐞 修复 `Progress` 组件的 `successPercent` 属性无法决定组件是否处于 `success` 状态的问题。[#9382](https://github.com/ant-design/ant-design/issues/9382)
- 🐞 修复 `Tabs` 组件字体尺寸的问题。[#9509](https://github.com/ant-design/ant-design/pull/9509)
- 🐞 修复 `Tree` 和 `TreeSelect` 组件的父节点在 `disabled` 状态下无法展开的问题。[#9539](https://github.com/ant-design/ant-design/pull/9539)

## 3.2.3

`2018-03-02`

- 🐞 修复组件 `Select` 中的 `onPopupScroll` 属性的 ts 定义。 [#9475](https://github.com/ant-design/ant-design/pull/9475) [@twobin](https://github.com/twobin)
- 🐞 修复 `Table` 过滤条件下拉选择框的问题。 [#9209](https://github.com/ant-design/ant-design/issues/9209)
- 🐞 修复 `Timeline` 自定义头部样式在 Chrome 下的显示问题。 [#9429](https://github.com/ant-design/ant-design/pull/9429) [@vthinkxie](https://github.com/vthinkxie)
- 🐞 修复 `Select` 下拉窗口的边框显示问题。 [82092c1](https://github.com/ant-design/ant-design/commit/82092c154ac1fa7ff2f89e1adbdf0aaf22e3ff53)
- 🐞 修复对 less 3 的兼容性问题。 [#7850](https://github.com/ant-design/ant-design/issues/7850)
- 🐞 修复 `DatePicker.WeekPicker` 年份问题。 [#9463](https://github.com/ant-design/ant-design/issues/9463)
- 🐞 修复 `Button.Group` 在 Chrome 下的定位对齐问题。 [#9457](https://github.com/ant-design/ant-design/issues/9457)

## 3.2.2

`2018-02-24`

- 🌟 添加 `Pagination` 字体变量。 [#9351](https://github.com/ant-design/ant-design/issues/9351)
- 🌟 添加 `Badge` 字重变量。 [#9352](https://github.com/ant-design/ant-design/issues/9352)
- 🐞 修复 `Table` 当自定义 `loading.indicator` 时，不显示emptyText。 [#9355](https://github.com/ant-design/ant-design/issues/9355)
- 🐞 修复 `Form.create` 。[#9331](https://github.com/ant-design/ant-design/issues/9331)
- 🐞 回滚 `Table` 中 `column.dataIndex` 的 TypeScript 定义。 [#9393](https://github.com/ant-design/ant-design/issues/9393)
- 🐞 修复 `Layout` 中 sider 高度不足时，最后一个菜单无法显示。 [#9398](https://github.com/ant-design/ant-design/issues/9398) [@MJ111](https://github.com/MJ111)
- 🐞 修复 `Badge` dot 模式问题。 [#9359](https://github.com/ant-design/ant-design/issues/9359) [@khayalan-mathew](https://github.com/khayalan-mathew)

## 3.2.1

`2018-02-11`

- 🌟 新增了部分著名产品的图标。[c04377e5](https://github.com/ant-design/ant-design/commit/c04377e5413d344b37c34ceac6fee456933fa516)
- Mention
  - 🌟 现在 `multiLines` 模式的高度将默认自适应内容。
  - 🐞 修复指定了 `placeholder` 时无法粘贴内容的问题。[#9215](https://github.com/ant-design/ant-design/issues/9215)
- Table
  - 🐞 修复中号表格的 padding。[#9319](https://github.com/ant-design/ant-design/issues/9319)
  - 🐞 修复小号表格的边框错位问题。[#8980](https://github.com/ant-design/ant-design/issues/8980)
  - 🐞 修复排序图标点击区域溢出表头的问题。[#8979](https://github.com/ant-design/ant-design/issues/8979)
  - 🌟 优化了 `column.dataIndex` 的 TypeScript 定义。[#9298](https://github.com/ant-design/ant-design/pull/9298) [@clinyong](https://github.com/clinyong)
- Select
  - 🐞 修复使用键盘导航时，滚动条不会自动定位的问题。[#9276](https://github.com/ant-design/ant-design/issues/9276)
  - 🐞 修复在 IE11 下的箭头位置。
- 🐞 修复 Upload `beforeUpload` 返回 `false` 时，上传文件仍然显示 `uploading` 以及文件列表被替换的问题。[#8020](https://github.com/ant-design/ant-design/issues/8020)
- 🐞 修复 `vertical` 布局的 Form 下反馈图标错位的问题。[#9153](https://github.com/ant-design/ant-design/issues/9153)
- 🐞 修复 Card 没有子节点时 `loading` 样式不生效的问题。[#9258](https://github.com/ant-design/ant-design/issues/9258)
- 🐞 修复 Avatar 的图片不存在时的背景色。[#9278](https://github.com/ant-design/ant-design/pull/9278) [@andriijas](https://github.com/andriijas)
- 🐞 修复 RangePicker 选择结束时间时报 `Cannot read property 'locale' of undefined` 的问题。[#9267](https://github.com/ant-design/ant-design/issues/9267)
- 🐞 修复 ButtonGroup 内使用了失效按钮和 Tooltip 时样式错位的问题。[#9296](https://github.com/ant-design/ant-design/issues/9296) [#9296](https://github.com/ant-design/ant-design/issues/9296)
- 🐞 修复 Dropdown 的子菜单被遮挡的问题。[#9218](https://github.com/ant-design/ant-design/issues/9218)

## 3.2.0

`2018-02-04`

- 🌟 Tab 新增 `tabBarGutter` 属性，用于设置 tabs 之间的间隙。[#8644](https://github.com/ant-design/ant-design/pull/8644) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- 🌟 Layout 新增 `hasSider` 属性，用于避免服务端渲染时显示问题。[#8937](https://github.com/ant-design/ant-design/issues/8937)
- 🌟 Progress 新增 `successPercent` 属性，用于显示分段进度条。[例子](https://ant.design/components/progress-cn/#components-progress-demo-segment)
- 🌟 Alert 新增 `iconType` 属性，用于显示自定义图标。[#8811](https://github.com/ant-design/ant-design/pull/8811) [@minwe](https://github.com/ant-design/ant-design/pull/8811)
- 🌟 DatePicker 新增 `id` 属性。[#8598](https://github.com/ant-design/ant-design/pull/8598) [@mgrdevport](https://github.com/mgrdevport)
- 🌟 Collapse 新增 `forceRender` 属性，用于渲染隐藏的内容。[#9192](https://github.com/ant-design/ant-design/pull/9192) [#Pyroboomka](https://github.com/ant-design/ant-design/pull/9192) [@paulcmason](https://github.com/react-component/collapse/pull/82)
- RangePicker
  - 🌟 改进 `ranges` 属性，使其支持方法。[#8281](https://github.com/ant-design/ant-design/issues/8281)
  - 🐞 修复无法手动输入开始时间的问题。[#6999](https://github.com/ant-design/ant-design/issues/6999)
  - 🐞 修复点击预设范围关闭日期面板的时候没有动画的问题。[#6364](https://github.com/ant-design/ant-design/issues/6364)
  - 🐞 修复点击预设范围时不触发 `onOk` 的问题。[#7747](https://github.com/ant-design/ant-design/issues/7747)
- Select
  - 🌟 改进了 `onChange`、`onDeselect` 方法，现在他们会接受选中的 `Option` 作为第二个参数。
  - 🐞 修复自动分词不触发 `onSelect` 的问题。[#9094](https://github.com/ant-design/ant-design/issues/9094)
  - 🐞 修复 Chrome 上下拉框没有滚动条的问题。
- 🌟 改进 Table 的 `rowSelection[getCheckboxProps]` 属性，现在可以传任意属性给 chekbox 了。[#9054](https://github.com/ant-design/ant-design/pull/9054) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9054)
- 🐞 修复 Calendar 的 `mode` 属性不能从外部控制的问题。[#9243](https://github.com/ant-design/ant-design/pull/9243) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9243)
- 🐞 修复 AutoComplete 在 Form 中显示错误信息时的边框颜色。[9f2b490](https://github.com/ant-design/ant-design/commit/9f2b4905f09fca503da7a8bb5f2b8347bea663b7)
- 🐞 修复 DatePicker 在受控模式下时间显示不正确的问题。[#8885](https://github.com/ant-design/ant-design/issues/8885)
- 🐞 修复 TextArea 在 Edge 下高度计算错误的问题。[#9108](https://github.com/ant-design/ant-design/pull/9108) [@cuyl](https://github.com/cuyl)
- 🐞 修复 Tabs 在 card 模式且 tabPosition 是 `bottom` 时的样式问题。[#9165](https://github.com/ant-design/ant-design/pull/9165) [@ryanhoho](https://github.com/ryanhoho)
- 🌟 新增库尔德语。


## 3.1.6

`2018-01-28`

- 🐞 回退了 [#9141](https://github.com/ant-design/ant-design/pull/9141) 的修改，因其导致的 DatePicker 年月无法选择。

## 3.1.5

`2018-01-27`

- 🐞 修复了 Select 下拉选择框在 IE11 点击滚动条会无故消失的问题。[#7934](https://github.com/ant-design/ant-design/issues/7934) [@tianlang89757](https://github.com/tianlang89757)
- 🐞 修复了 Form 中使用 `getFieldDecorator` 当 id 重复时引用冲突的问题。[#9103](https://github.com/ant-design/ant-design/issues/9103) [#7351](https://github.com/ant-design/ant-design/issues/7351)
- 🐞 修复了 RangePicker 在语言切换时会显示上一次的语言的问题。[#8970](https://github.com/ant-design/ant-design/issues/8970)
- 🐞 修复了 DatePicker 在受控模式下时间显示不正确的问题。[#8885](https://github.com/ant-design/ant-design/issues/8885)
- 🐞 修复了 Table 在 `loading` 时显示空提示的问题。[#9095](https://github.com/ant-design/ant-design/pull/9095) [@sallen450](https://github.com/sallen450)
- 🐞 补充 Icon 类型 `file-word`。[#9092](https://github.com/ant-design/ant-design/issues/9092) [#9061](https://github.com/ant-design/ant-design/issues/9061)
- 🐞 修复写错的字体名称，造成浏览器无法正确识别的问题。[commit/506f97](https://github.com/ant-design/ant-design/commit/506f97640ec34a6d3d9fdb18e8036e5d34796a5f)
- 📖 修复了 TypeScript 定义
  - 补充 Notification 缺失的 `duration` 定义。[pull/9120](https://github.com/ant-design/ant-design/pull/9120) [@duhongjun](https://github.com/duhongjun)
  - 补充 Steps 缺失的 `style` 定义。[pull/9126](https://github.com/ant-design/ant-design/pull/9126) [@wanliyunyan](https://github.com/wanliyunyan)
- 🌟 优化了 Avatar 的默认背景色。[commit/275946](https://github.com/ant-design/ant-design/commit/275946090823ab8da90f1871976c671b2c7ac851)
- 🌟 新增了 Slider 以及 Menu 的 less 变量，更加方便的修改主题。[pull/9065](https://github.com/ant-design/ant-design/pull/9065) [pull/9115](https://github.com/ant-design/ant-design/pull/9115)  [@mrgeorgegray](https://github.com/mrgeorgegray)

## 3.1.4

`2018-01-21`

- 🐞 修复 ButtonGroup 错误 z-index 导致的样式问题。[#9014](https://github.com/ant-design/ant-design/issues/9014)
- 🐞 修复 Dropdown.Button 不能被完全禁用的问题。[#8991](https://github.com/ant-design/ant-design/issues/8991) [@sallen450](https://github.com/sallen450)
- 🐞 修复 Layout 错误的响应式相关文档。[#8995](https://github.com/ant-design/ant-design/pull/8995) [@ReedSun](https://github.com/ReedSun)
- 🐞 修复 List `grid` 不支持 xxl 配置的问题。[#9019](https://github.com/ant-design/ant-design/issues/9019)
- 🐞 修复 RangePicker 关闭选择面板之后无法清空已选开始时间的问题。[#8839](https://github.com/ant-design/ant-design/issues/8839)
- 🐞 修复 Tabs 错误外边距导致的样式问题。[commit/200d6c](https://github.com/ant-design/ant-design/commit/200d6cb11aba12a488510f957353bbd5bd1dcd1b)
- 🐞 修复 WeekPicker 显示错误周数的问题。[#9021](https://github.com/ant-design/ant-design/issues/9021)
- 🐞 修复 TypeScript 定义
  - 补充 Menu 缺失的 `subMenuCloseDelay` 和 `subMenuOpenDelay`。[#8976](https://github.com/ant-design/ant-design/issues/8976) [@Rohanhacker](https://github.com/Rohanhacker)
  - 重构了 DatePicker 相关 type 定义。[commit/0bb531](https://github.com/ant-design/ant-design/commit/0bb531aca6cb2045d5323196a599c925537a4eb0)
  - 修复了 Input `maxLength` type 定义。[#9046](https://github.com/ant-design/ant-design/pull/9046) [@Riokai](https://github.com/Riokai)
- 🌟 新增 less 变量
  - Checkbox 和 Radio 相关：[#9003](https://github.com/ant-design/ant-design/pull/9003) [@mrgeorgegray](https://github.com/mrgeorgegray)
  - Breadcrumb 相关：[#9022](https://github.com/ant-design/ant-design/pull/9022) [@mrgeorgegray](https://github.com/mrgeorgegray)
- 🌟 新增 aliyun 图标。

## 3.1.3

`2018-01-14`

- 🐞 修复 `locale` 为 `null` 时 LocaleProvider 出错的问题。

## 3.1.2

`2018-01-13`

- 🐞 修复 Button 不能正确显示 `0` 的问题。[#8733](https://github.com/ant-design/ant-design/pull/8733) [@Cuihongsen](https://github.com/Cuihongsen)
- 🐞 修复 Table 和 List 中由于 Spin 导致的滚动条。[#8799](https://github.com/ant-design/ant-design/issues/8799)
- 🐞 修复不能传方法给 Table[emptyText] 的问题。[#8871](https://github.com/ant-design/ant-design/issues/8871)
- 🐞 修复 Dropdown[transitionName] 不生效的问题。
- 🐞 修复 Input 中输入数字时字体会发生变化的问题。 [#8636](https://github.com/ant-design/ant-design/issues/8636)
- 🐞 修复 import 多个 locale 文件后日期文本显示错误的问题。[#8785](https://github.com/ant-design/ant-design/pull/8785)
- 🐞 修复 dist/antd-with-locales.js 中的 locale 会多一个 default 字段的问题。[#8881](https://github.com/ant-design/ant-design/issues/8881)
- 🐞 修复 TypeScript 定义 [4cc29bc](https://github.com/ant-design/ant-design/commit/4cc29bc11cf7c019c63a25693adff3dbb58b41c3) [693e734](https://github.com/ant-design/ant-design/commit/693e734a82b5e1faf25b025127afca67e75f9c88) [67e956d](https://github.com/ant-design/ant-design/commit/67e956dddd040f63b2a59b8b619123bbb0065780) [ecd4177](https://github.com/ant-design/ant-design/commit/ecd4177638da1eac3a3750fe5ad68b9309865542) [33119ec](https://github.com/ant-design/ant-design/commit/33119ec535e7b819541d4753464871988b37dd6f) [88e0c9b](https://github.com/ant-design/ant-design/commit/88e0c9b436f196def62e737ea72e105aba4b5d4e)
- 🌟 新增 less 变量 [b9b5aba](https://github.com/ant-design/ant-design/commit/b9b5abab3364bf752e9644415088b142a153e385) [5931b20](https://github.com/ant-design/ant-design/commit/5931b201da58e993227a04128045e627f2b65c46) [c9d7397](https://github.com/ant-design/ant-design/commit/c9d73978dd2694f9d2bd0111f82a20d237f83621)
- 🌟 优化中文引号的显示。

## 3.1.1

`2018-01-08`

- 📖 发布了全新的官网和设计文档。
- 📖 更新了项目实战文档到 [roadhog 2.0](https://github.com/sorrycc/blog/issues/55)。[5dcf1c0](https://github.com/ant-design/ant-design/commit/5dcf1c015fc2674adb09434bf766549d6f3f0022)
- 📖 发布了 Ant Design 3.0 的 sketch 模板包。[22dfe88](https://github.com/ant-design/ant-design/commit/22dfe88ab043c1e116382fc96b7d78cabf125054)
- 🐞 修复 Dropdown 组件的 TypeScript 类型定义中 trigger 属性缺少 contextMenu 事件的问题。[#8646](https://github.com/ant-design/ant-design/issues/8646) [@cjahv](https://github.com/cjahv)
- 🐞 修复 Button 内使用 HOC 组件时两个中文字符间未添加空格的问题。
- 🐞 修复 List 组件在 IE 11 下的样式兼容问题。[#8784](https://github.com/ant-design/ant-design/issues/8784)
- 🐞 修复 Select 组件 notFoundContent 属性不生效的问题。[#8809](https://github.com/ant-design/ant-design/issues/8809)
- 🐞 修复 BackTop 组件在 React 16 下 target 属性出现警告的问题。[#8848](https://github.com/ant-design/ant-design/issues/8848)
- 🐞 修复当设置 gutter 后 List 组件出现横向滚动条的问题。[#8799](https://github.com/ant-design/ant-design/issues/8799)
- 🐞 修复 Anchor.Link 的 href 属性不支持完整链接的问题。[#8808](https://github.com/ant-design/ant-design/issues/8808)
- 🌟 优化中文引号的字体。[c6fcc31](https://github.com/ant-design/ant-design/commit/c6fcc3121758dfe6ac5b50c1b55790eb42b805c5)

## 3.1.0

`2017-12-29`

新年快乐！~ 2018年了，00后都成年了！少年赶紧提个 PR 给我们吧！~

- 🐞 修复组件 Spin 可能出现跳动的问题。[#8602](https://github.com/ant-design/ant-design/issues/8602) [@jhsu](https://github.com/jhsu)
- 🐞 修复 Table 在设置 `size=small` 的情况下出现多余 padding 的问题。[#8724](https://github.com/ant-design/ant-design/issues/8724)
- 🐞 修复 Checkbox.Group 在 Form 中和 label 的对齐问题。[#8739](https://github.com/ant-design/ant-design/issues/8739)
- 🐞 修复 Affix 组件出现滚动条的问题。[#8606](https://github.com/ant-design/ant-design/issues/8606)
- 🐞 修复组件 List "No Data" 和加载动画重叠的问题。[#8647](https://github.com/ant-design/ant-design/issues/8647)
- 🌟 为 Input 添加 onKeyUp。[#8705](https://github.com/ant-design/ant-design/issues/8705) [@delesseps](https://github.com/delesseps)
- 🌟 折叠面板 Collapse 添加 `showArrow` 来支持隐藏箭头。[#8536](https://github.com/ant-design/ant-design/pull/8536) [@apieceofbart](https://github.com/apieceofbart)
- 🌟 评分 Rate 组件添加 `allowClear`，支持再次点击后重置。[#8627](https://github.com/ant-design/ant-design/issues/8627)
- 🌟 优化 BackTop 组件的响应式效果。[#8719](https://github.com/ant-design/ant-design/issues/8719) [@JetRunner](https://github.com/JetRunner)
- 🌟 Modal 组件添加 `destroyOnClose` 支持关闭时销毁 Modal 里的子元素。[#8769](https://github.com/ant-design/ant-design/pull/8769) [@Rohanhacker](https://github.com/Rohanhacker)
- 🌟 组件 Pagination 添加 `hideOnSinglePage` 支持当只有一页时隐藏组件。[#8615](https://github.com/ant-design/ant-design/pull/8615) [@camsong](https://github.com/camsong)
- 🌟 支持 List 组件自定义加载动画。
- 👻 你现在可以通过 CodeSandbox 来打开官方文档中的示例了。

## 3.0.3

`2017-12-22`

- 🐞 Form.create 返回值增加 `React.SFC` 类型的支持。[#8672](https://github.com/ant-design/ant-design/issues/8672)
- 🐞 修复 Form 控件高度和对齐的问题。[#8701](https://github.com/ant-design/ant-design/issues/8701)
- 🐞 修复前后置标签与 Input 高度不一致的问题。[#8680](https://github.com/ant-design/ant-design/issues/8680)
- 🐞 修复 Table 固定列时左右未对齐的问题。[#8660](https://github.com/ant-design/ant-design/issues/8660)

## 3.0.2

`2017-12-17`

- 📝 提供了 3.0 迁移工具。[e71b68dd](https://github.com/ant-design/ant-design/commit/e71b68dd1d2ff91200fea6dd9d56e6aa5653edbc)
- 📝 重写了 [开源贡献指南](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.zh-CN.md)
- 🌟 优化 notification 在小屏幕下的显示效果。[#8631](https://github.com/ant-design/ant-design/issues/8631)
- 🌟 优化了 Pagination 的样式和并修复了对齐和边距问题。
- 🐞 升级 react-slick 到 `0.16.0`，修复 peerDependencies 安装警告。[#8455](https://github.com/ant-design/ant-design/issues/8455)
- 🐞 修复固定列头的表格大小设置无效的问题。[#8577](https://github.com/ant-design/ant-design/issues/8577)
- 🐞 修复 DatePicker 等时间组件的 `locale` 属性失效的问题。[#8635](https://github.com/ant-design/ant-design/issues/8635)
- 🐞 修复 Popover 的箭头偏移和大小无法覆盖的问题。[#8548](https://github.com/ant-design/ant-design/issues/8548) [#8549](https://github.com/ant-design/ant-design/issues/8549)
- 🐞 修复 AutoComponent 的 `notFoundContent` 设置无效的问题。[#8553](https://github.com/ant-design/ant-design/issues/8553)
- 🐞 微调 RangePicker 的垂直对齐问题。
- 🐞 Layout.Sider 的响应式断点和栅格系统保持一致。[#8620](https://github.com/ant-design/ant-design/issues/8620)
- 🐞 修复一个 collapsedWidth 为 0 时，收缩后子菜单依然会显示的问题。[#8587](https://github.com/ant-design/ant-design/issues/8587)
- 🐞 修复 Card 的 `Meta.title` 文本无法自动截断的问题。[#8597](https://github.com/ant-design/ant-design/issues/8597)
- 🐞 修复带边框的 List 下的分页样式边距。[#8562](https://github.com/ant-design/ant-design/issues/8562)
- 🐞 修复一个 Menu 指定了不存在的 defaultOpenKeys 时子菜单无法展开的问题。[#8475](https://github.com/ant-design/ant-design/issues/8475)
- 🐞 修复 Input、AutoComplete、Transfer 的 `InputProps` 和 `SearchProps` TypeScript 类型命名冲突。[#8478](https://github.com/ant-design/ant-design/issues/8478)

## 3.0.1

`2017-12-11`

* 移除 Card 无用 DOM wrapper，以和 2.x 保持一致。
* 修复 `antd/lib/style/v2-compatible-reset.css` 缺失问题。[28d13e2](https://github.com/ant-design/ant-design/commit/28d13e2539817f87b8a2029ea22d9c30b377167f)
* 修复 Affix 比浏览器可见区域还高时被截断的问题。[31a0654](https://github.com/ant-design/ant-design/commit/31a0654ef990eb7bae2b18095fa0d5230b9be1da)
* 修复 Collapse 展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* 修复 Form 内大尺寸 Input、Button 的对齐问题。[#8459](https://github.com/ant-design/ant-design/issues/8459)
* Menu
  * 修复弹层在 Safari 下消失的问题。[#8453](https://github.com/ant-design/ant-design/issues/8453)
  * 修复展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
* 修复 Notification 样式编译错误。[#8437](https://github.com/ant-design/ant-design/issues/8437)
* 修复迷你 Pagination 的背景色问题。[e13c6d8](https://github.com/ant-design/ant-design/commit/e13c6d87fa6bf7d5cf4b2d5154a85b4793997de5)
* Table
  * 修复在移动端样式错乱的问题。[#8465](https://github.com/ant-design/ant-design/issues/8465)
  * 修复嵌套表格与 size 属性共用时的样式问题。[#8525](https://github.com/ant-design/ant-design/issues/8525)
* TypeScript
  * 修复 AutoComplete 的 TypeScript 定义。[#8383](https://github.com/ant-design/ant-design/pull/8383) [@nidhi-ag](https://github.com/nidhi-ag)
  * 修复 Divider 的 TypeScript 定义。[#8504](https://github.com/ant-design/ant-design/pull/8504) [@cyyyu](https://github.com/cyyyu)
  * 修复 Dropdown 的 TypeScript 定义。[#8444](https://github.com/ant-design/ant-design/issues/8444)
  * 修复 List 的 TypeScript 定义。[e27061e](https://github.com/ant-design/ant-design/commit/e27061ea5b2f2d3273b45862d9b87285448f0998) [1b2a955](https://github.com/ant-design/ant-design/commit/1b2a9550d9595dd2f31f79d1bdd52695ec792692)
  * 修复 Table 的 TypeScript 定义。[#8507](https://github.com/ant-design/ant-design/issues/8507) [#8515](https://github.com/ant-design/ant-design/pull/8515) [@danedavid](https://github.com/danedavid)

## 3.0.0

`2017-12-04`

更多内容见 [Ant Design 3.0 发布公告](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c)。

### 主要变化

- 全新的[色彩系统](https://ant.design/docs/spec/colors-cn#Color-Palettes)，组件主色由『`#108EE9`』改为『`#1890FF`』，新主色我们称之为『拂晓蓝』。
- 全新的视觉样式和组件尺寸，更现代更美观。
- 基础字体大小由 `12px` 增大到 `14px`。
- 默认语言由中文改为英文。
- 全面支持 React 16。
- 更友好的 TypeScript 支持。
- 新的 [List](https://ant.design/components/list-cn/) 组件。
- 新的 [Divider](https://ant.design/components/divider-cn/) 组件。
- 新增 30 个[图标](https://ant.design/components/icon-cn/)。

### 不兼容改动

> 如果你从 2.x 升级到 3.x，建议直接升级到 3.x 的最新版本。

> 3.x 后续的版本可能已经废弃了一些下面没有提到的改动，请参考控制台的警告提示相应升级。

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。另外由于人肉查找代码中的废弃用法过于低效，所以我们提供了 [antd-migration-helper](https://github.com/ant-design/antd-migration-helper) 用于扫描代码中的废弃用法。

- Card 的 `noHovering` 属性重命名为 `hoverable`，且默认值改为 `true`。
- 调整了 Grid 的响应式断点值。详见 [#7230](https://github.com/ant-design/ant-design/pull/7230)
- Form `getFieldDecorator` 的 `exclusive` 参数被移除，此类场景应该由 Radio.Group、Checkbox.Group 之类的组件来完成。
- 新增 `Form.createFormField` 方法，`mapPropsToFields` 返回的字段都需要由该方法创建。

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

- 优化了全局的重置样式，如果升级后你的全局样式有问题，可以引入我们提供的 2.x 兼容样式。

  ```javascript
  import 'antd/lib/style/v2-compatible-reset';
  ```

  或者在 less 里引入

  ```less
  @import '~antd/lib/style/v2-compatible-reset.less';
  ```

- 由于默认语言改为英文，如果你需要显示中文，现在需要配置 `LocalProvider`。

  ```javascript
  import { LocaleProvider } from 'antd';
  import zhCN from 'antd/lib/locale-provider/zh_CN';

  ReactDOM.render(
    <LocaleProvider locale={zhCN}><YourApp /></LocaleProvider>,
    document.getElementById('root')
  );
  ```

- Form 下的表单控件不再默认为 `size="large"`。
- `Input.Search` 默认的 🔍 图标只作为装饰，不再响应用户交互。需要添加可交互按钮请使用 `enterButton`。
- UMD 版本的 `dist/antd.js` 不再包含 moment，使用的时候需要自己引入 moment。
  ```diff
  <html>
    <head>
  +   <script src="https://unpkg.com/moment@2.19.3/moment.js"></script>
      <script src="https://unpkg.com/antd@3.0.0/dist/antd.js"></script>
    </head>
  </html>
  ```

### 以下在 2.x 中废弃的特性被移除

- 🗑 移除了 DatePicker.Calendar， 请直接使用 Calendar 组件。
- 🗑 移除了 DatePicker 的 `toggleOpen` 属性， 请使用 `onOpenChange` 代替。
- 🗑 移除了 Form 的 `inline`、`horizontal`、`vertical` 属性，请使用 `layout` 代替。
- 🗑 移除了 Select 的 `multiple`、`tags`、`combobox` 属性，请使用 `mode` 代替。
- 🗑 移除了 Input 对 `type='textarea'` 的支持，请直接使用 `Input.TextArea` 组件。
- 🗑 移除了 Mention 的 `toEditorState` 方法，请使用 `toContentState` 代替。

### 新增功能及改进

- 🌟 Tabs 新增 `size="large"`。
- 🌟 Row 的 `gutter` 属性新增响应式断点的支持，可以使用诸如 `gutter={{ sm: 16, lg: 32 }}` 的设置。
- 🌟 Spin 新增 `indicator` 属性，用于设置自定义的加载指示符。 [#7977](https://github.com/ant-design/ant-design/pull/7977) [@kossel](https://github.com/ant-design/ant-design/pull/7977)
- 🌟 Input.Search 新增 `enterButton` 用于设置自定义的搜索图标。[#7596](https://github.com/ant-design/ant-design/issues/7596)
- 🌟 Mention 新增 `placement`，用于设置下拉框的弹出方向。
- 🌟 Carousel 新增 `next()`、`prev()`、`goTo(slideNumber)` 方法，用于控制面板展示。
- 🌟 Button 新增链接支持，当提供 `href` 时会自动渲染为 `<a>`。[#8343](https://github.com/ant-design/ant-design/pull/8343)
- 🌟 Steps 进行了重构，首次渲染的时候不会再闪烁。 [#6010](https://github.com/ant-design/ant-design/issues/6010)
- 🌟 Switch 新增 `loading` 属性，用于表现加载中的状态。
- Menu
  - 🌟 我们使用了 [rc-trigger](https://github.com/react-component/trigger) 重构了菜单以支持延迟加载和窗口边缘浮层自适应方向。
  - 🌟 新增 `subMenuOpenDelay` 和 `subMenuCloseDelay`，用于设置子菜单打开和关闭的延迟。
  - 🌟 新增 `forceSubMenuRender`，用于强制渲染子菜单。[#5586](https://github.com/ant-design/ant-design/issues/5586)
- Form
  - 🌟 新增显示验证信息时的动画效果。
  - 🌟 新增按条件渲染表单项的支持。[#react-component/117](https://github.com/react-component/form/issues/117)
- Message
  - 🌟 `duration` 允许可选 [#7857](https://github.com/ant-design/ant-design/issues/7857) [@monkindey](https://github.com/monkindey)
- Badge
  - 🌟 新增 `offset` 属性，用于设置状态点的位置偏移。
  - 🌟 `status` 允许与 `children` 同时使用。[#8164](https://github.com/ant-design/ant-design/issues/8164)
- Card
  - 🌟 新增 `inner` 类型。[例子](https://ant.design/components/card-cn/#components-card-demo-inner)。
  - 🌟 新增 `cover`、`actions` 以及 `Meta` 子组件。[例子](https://ant.design/components/card-cn/#components-card-demo-meta)。
- DatePicker
  - 🌟 新增 `mode` 和 `onPanelChange`，用户控制面板的展示模式。[例子](https://ant.design/components/date-picker-cn/#components-date-picker-demo-mode)。
  - 🌟 新增 `WeekPicker` 子组件。[例子](https://ant.design/components/date-picker-cn/#components-date-picker-demo-basic)
  - 🌟 新增 `dateRender` 属性，用于自定义日期单元格的渲染。
- TimePicker
  - 🌟 新增 `hourStep`、`minuteStep`、`secondStep`，用于设置时间步长。[例子](https://ant.design/components/time-picker-cn/#components-time-picker-demo-interval-options)
  - 🌟 新增 `focusOnOpen`，用于设置在打开面板的时候是否聚焦输入框。
- Table
  - 🌟 新增 `components` 属性，用于覆盖表格元素的默认标签。
    ```javascript
    // 支持覆盖的元素
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
  - 🌟 新增 `onRow` 属性，用于设置表格列的属性。
  - 🌟 新增 `onHeaderRow`，用户设置表格头部列的属性。
  - 🌟 新增 `column[onCell]`，用户设置单元格的属性。
  - 🌟 新增 `column[onHeaderCell]`，用于设置头部单元格的属性。
  - 🌟 新增 `column[align]`，用于设置列内文字的对其方向。
  - 🌟 新增 `column[defaultSortOrder]`，用于设置列的默认排序。[#8111](https://github.com/ant-design/ant-design/pull/8111) [@megawac](https://github.com/megawac)
  - 🌟 新增 `rowSelection[fixed]`，用于固定选择列。
  - 🙅 废弃 `getBodyWrapper`，请使用 `components` 属性代替。
  - 🙅 废弃以下属性 `onRowClick`，`onRowDoubleClick`、`onRowContextMenu`、`onRowMouseEnter`、`onRowMouseLeave`，请使用 `onRow` 代替。
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
  - 🌟 默认和多选模式下 Option 的值允许使用 number。
  - 🌟 新增 `maxTagCount 和 `maxTagPlaceholder`，用于设置最多可显示的选中项。
  - 🌟 新增 `showAction`，用于设置出发下拉框打开的事件。
  - 🌟 新增 `onMouseEnter` 和 `onMouseLeave` 事件回调。
- LocaleProvider
  - 🇮🇸 新增冰岛语。[#7561](https://github.com/ant-design/ant-design/pull/7561) [@paunovic-stefan](https://github.com/paunovic-stefan)
  - 🇪🇬 新增埃及语。[#7888](https://github.com/ant-design/ant-design/pull/7888) [@mohamed-seada-1994](https://github.com/mohamed-seada-1994)
  - 🇺🇦 新增乌克兰语。[#8169](https://github.com/ant-design/ant-design/pull/8169) [@anxolerd](https://github.com/anxolerd)

### Bug 修复

- Form
  - 🐞 修复输入框的图标会被验证图标覆盖的问题。
  - 🐞 修复使用大尺寸输入框时，验证图标不居中的问题。
- 🐞 修复 Menu 按键时的报错。[#8089](https://github.com/ant-design/ant-design/issues/8089)

### 其他

- 在 TypeScript 中使用时不再需要设置 `allowSyntheticDefaultImports`。
- 从 `peerDependencies` 中移除了 `react@0.14` 和 `react@15`，虽然目前 antd 3.0.0 依然可以在旧版本的 React 上使用，但是我们在未来有可能使用 React 16 的新特性，所以强烈建议升级到 React 16，见[升级文档](https://reactjs.org/blog/2017/09/26/react-v16.0.html)。
- 全面支持 ES Module ，antd 及其依赖的底层 react-component 组件全部提供了 ES Module 的构建版本，如果你使用 webpack 3，可以把 `babel-plugin-import` 的 `libraryDirectory` 设置为 `es`，以获得 Tree Shaking 的优化效果。
- 最后，我们会继续维护 2.x 的分支到明年 6 月份。

## 2.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.zh-CN.md) 查看 `2.x` 的 Change Log。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
