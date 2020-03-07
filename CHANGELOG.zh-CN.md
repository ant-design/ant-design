---
order: 6
title: 更新日志
toc: false
timeline: true
---

`antd` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 3.26.13

`2020-03-07`

- 🐞 修复 Result `status` 属性不能赋值 `string` 或者 `number` 类型的问题。[#21691](https://github.com/ant-design/ant-design/pull/21691)
- 🐞 修复 Badge 数字在 10 和 11 切换时的动画错误。[#21887](https://github.com/ant-design/ant-design/pull/21887) [@wendellhu95](https://github.com/wendellhu95)
- 🐞 修复 DatePicker 日历图标在禁用时的手型。[#21655](https://github.com/ant-design/ant-design/pull/21655) [@jhoneybee](https://github.com/jhoneybee)
- 🐞 修复 Grid 多个 Row 之间的边距叠加问题。[#21518](https://github.com/ant-design/ant-design/pull/21518) [@felipeptcho](https://github.com/felipeptcho)
- 🐞 修复 Table 筛选菜单高度溢出屏幕的问题。[#21602](https://github.com/ant-design/ant-design/pull/21602)

## 3.26.12

`2020-02-24`

- 🐞 修复 Input 在设置 `readOnly` 时 `allowClear` 仍然可以清除的问题。[#21492](https://github.com/ant-design/ant-design/pull/21492)
- 🐞 修复 Upload 列表默认情况下不展现下载按钮。[#21496](https://github.com/ant-design/ant-design/pull/21496)
- ⚡️ 提升 Button 渲染性能。[#21217](https://github.com/ant-design/ant-design/pull/21217)


## 3.26.11

`2020-02-17`

- 🐞 回滚原子样式 `clearfix` 以修复破坏 flex 布局的问题（主要影响 Row、Form、Layout 等布局问题）。[#21406](https://github.com/ant-design/ant-design/pull/21406)

## 3.26.10

`2020-02-16`

- 🐞 修复 `<Form layout="vertical" >` 内 Input.Group 偏上一像素的问题。[#20685](https://github.com/ant-design/ant-design/pull/20685)
- 🐞 修复 Badge 包裹模式下 `color` 属性失效的问题。[#21333](https://github.com/ant-design/ant-design/pull/21333)
- 🐞 修复 Alert 关闭按钮额外的 `padding`。[#21325](https://github.com/ant-design/ant-design/pull/21325)
- 🐞 修复 Affix 在移动设备下抛错 `Cannot read property getBoundingClientRect` 的问题。[#21350](https://github.com/ant-design/ant-design/pull/21350)
- 💄 微调 Steps 文本 1px 使其居中对齐。[#21306](https://github.com/ant-design/ant-design/pull/21306)
- 💄 修复 Row 组件影响下一个元素样式问题。[#21310](https://github.com/ant-design/ant-design/pull/21310)
- Typescript
  - 🔷 回滚 [#21250](https://github.com/ant-design/ant-design/pull/21250) 的类型定义更新。[#21356](https://github.com/ant-design/ant-design/pull/21356)

## 3.26.9

`2020-02-08`

- 🐞 修复 Badge 在 Typography 下数字错位的问题。[#21237](https://github.com/ant-design/ant-design/pull/21237)
- 🐞 修复 Steps 在 `size="small"` 和 `labelPlacement="vertical"` 时图标没有对齐的问题。[#21258](https://github.com/ant-design/ant-design/pull/21258)
- 🐞 修复 Typography 在可编辑状态时光标没有在输入框末位的问题。[#21268](https://github.com/ant-design/ant-design/pull/21268)
- TypeScript
  - 💄 完善 Form 中校验规则类型的类型定义。[#21250](https://github.com/ant-design/ant-design/pull/21250) [@hansololai](https://github.com/hansololai)
  - 🐞 修复 Tree 中事件类型定义不正确的问题。[#21200](https://github.com/ant-design/ant-design/pull/21200) [@Jirka-Lhotka](https://github.com/Jirka-Lhotka)

## 3.26.8

`2020-02-03`

- 🐞 修复 Tooltip `title` 为 `0` 时没有显示的问题。[#20894](https://github.com/ant-design/ant-design/pull/20894)
- 🐞 修复 List `actions` 位置不在右边的问题。[#20897](https://github.com/ant-design/ant-design/pull/20897)
- 🐞 修复 Card `actions` 字体大小不受 less 变量影响的问题。[#21106](https://github.com/ant-design/ant-design/pull/21106)
- 🐞 修正 Layout 各组件的 `displayName`。[#21124](https://github.com/ant-design/ant-design/pull/21124)
- 🐞 优化 Modal.confirm 的 `okButtonProps` 和 `cancelButtonProps` 的 TypeScript 类型。[#21165](https://github.com/ant-design/ant-design/pull/21165)

## 3.26.7

`2020-01-13`

- 💄 优化 Table 固定列在某些情况下出现空白间隔的问题。[#20821](https://github.com/ant-design/ant-design/pull/20821) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复 Tree `switcherIcon` 在叶子节点上展示的问题。[#20753](https://github.com/ant-design/ant-design/pull/20753)
- 🐞 修复 Badge 在 Table 固定列中穿透的问题。[#20751](https://github.com/ant-design/ant-design/pull/20751)
- 🐞 修复 Cascader `fieldNames` 中 label 和 value 共用一个值时搜索功能失效的问题。[#20720](https://github.com/ant-design/ant-design/pull/20720)
- 🐞 修复 Collapse 背景使用错误的 less 变量。[#20718](https://github.com/ant-design/ant-design/pull/20718) [@kuitos](https://github.com/kuitos)
- 🐞 修复 `<Form layout="vertical" >` 内 Input.Group 偏上一像素的问题。[#20685](https://github.com/ant-design/ant-design/pull/20685)

## 3.26.6

`2020-01-03`

- 📢 v3 分支由 `master` 进入 `3.x-stable`，v4 合入 `master`。
- 💄 优化 Steps `type="navigation"` 在小屏幕下的样式。[#20545](https://github.com/ant-design/ant-design/pull/20545)
- 🐞 修复 `message.xxx` 传入 `null` 会报错的问题。[#20546](https://github.com/ant-design/ant-design/pull/20546)
- 🐞 优化 Input.Password 在 dom 中明文显示 `value` 属性的问题。[#20544](https://github.com/ant-design/ant-design/pull/20544)

## 3.26.5

`2019-12-29`

- Table
  - 🐞 回滚排序后默认回到第一页的逻辑。[#20507](https://github.com/ant-design/ant-design/pull/20507)
  - 🐞 修复分组列头在 `colspan=1` 时文本没有对齐的问题。[#20463](https://github.com/ant-design/ant-design/pull/20463)
- 🐞 修复 Tabs 的 `animated` 属性为 false 时，高亮条消失的问题。[#20417](https://github.com/ant-design/ant-design/pull/20417) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Tree 节点缩进不正确的问题。[#20456](https://github.com/ant-design/ant-design/pull/20456)

## 3.26.4

`2019-12-22`

- 💄 优化 Steps `subTitle` 在 `labelPlacement="vertical"` 下的展现方式。[#20325](https://github.com/ant-design/ant-design/pull/20325)
- 🐞 修复 Upload 组件预览不支持 `.ico` 文件问题。[#20375](https://github.com/ant-design/ant-design/pull/20375) [@Rustin-Liu](https://github.com/Rustin-Liu)
- 🐞 修复 Form feedback 图标结合 Input `suffix` 显示不正确。[#20363](https://github.com/ant-design/ant-design/pull/20363)
- 🐞 修复 Tag 关闭时 `onClick` 被触发的问题。[#20355](https://github.com/ant-design/ant-design/pull/20355)
- 🐞 修复 Cascader 组件 Form 校验触发时，鼠标悬浮显示颜色问题。[#20347](https://github.com/ant-design/ant-design/pull/20347) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复移动端点击搜索后，自动聚焦输入框，导致弹出键盘的问题。[#20332](https://github.com/ant-design/ant-design/pull/20332) [@YaoKaiLun](https://github.com/YaoKaiLun)
- 🐞 修复 Tabs 高亮条宽度的 `transition` 过度动画失效的问题。[#20283](https://github.com/ant-design/ant-design/pull/20283)
- 🐞 修复 TreeNode 不设置 `icon` 时会展示一个空白占位的问题。[#20274](https://github.com/ant-design/ant-design/pull/20274)
- TypeScript
  - ⚡️ 更新 Table `onChange` 中 `filters` 的定义。[#20337](https://github.com/ant-design/ant-design/pull/20337) [@MrHeer](https://github.com/MrHeer)

## 3.26.3

`2019-12-14`

- 🛠 antd `package.json` 中补充 `unpkg` 字段。[#20193](https://github.com/ant-design/ant-design/pull/20193)
- 🐞 修复 Tree `showLine` 和 `showIcon` 同时开启时 `[+]` `[-]` 图标丢失的问题。[#20196](https://github.com/ant-design/ant-design/pull/20196)
- 🐞 修复 Modal 和 Drawer 结合使用时导致滚动失效的问题。[#20242](https://github.com/ant-design/ant-design/pull/20242)
- 🐞 修复 Drawer `switchScrollingEffect prop on a DOM element` 警告。[#20175](https://github.com/ant-design/ant-design/pull/20175)
- 🐞 修复 Select Option 的 `label` 属性定义。[#20190](https://github.com/ant-design/ant-design/pull/20190) [@ZhechenLi](https://github.com/ZhechenLi)
- 💄 优化 Form 反馈图标的间距样式。[#20164](https://github.com/ant-design/ant-design/pull/20164) [@Satloff](https://github.com/Satloff)
- 💄 Select/Cascader 新增和优化边距 padding 和圆角的相关 less 变量。[#20156](https://github.com/ant-design/ant-design/pull/20156) [@Satloff](https://github.com/Satloff)

## 3.26.2

`2019-12-10`

- 🐞 修正 DatePicker `disabledTime` 属性 TypeScript 定义为可选。[#20153](https://github.com/ant-design/ant-design/pull/20153) [@khaledkhalil94](https://github.com/khaledkhalil94)
- 🐞 修正 Transfer `dataSource` 的 `title` 属性 TypeScript 定义为可选。[#20144](https://github.com/ant-design/ant-design/pull/20144) [@mraiguo](https://github.com/mraiguo)

## 3.26.1

`2019-12-09`

- 🐞 修复 List 下分页选项文本对齐问题。[#20037](https://github.com/ant-design/ant-design/issues/20037)
- 🐞 修复 Chrome 下 Button 文字没有垂直居中的问题。[#20059](https://github.com/ant-design/ant-design/pull/20059)
- 🐞 修复 DescriptionItem 的 `className` 错误应用于 label。[#20067](https://github.com/ant-design/ant-design/pull/20067) [@Liu-Ya](https://github.com/Liu-Ya)
- 🐞 修复 Tree `showLine` 为 true 时展示多余图标的问题。[#20090](https://github.com/ant-design/ant-design/issues/20090)
- 🐞 修复 Typography 可编辑组件在 Firefox 下闪动的问题。[#20118](https://github.com/ant-design/ant-design/pull/20118)
- 🐞 修复 Icon `component` 的定义，使其兼容于 create-react-app 的 svg 组件定义。[#20142](https://github.com/ant-design/ant-design/pull/20142)
- Table
  - 🐞 修复小号 Table 表头边框丢失的问题。[#20030](https://github.com/ant-design/ant-design/issues/20030)
  - 🐞 修复 `filterIcon` 返回字符串或数字时报错的问题。
  - 🐞 修复 `filterIcon` 返回 Tooltip 时显示了错误的 `title`。[#20049](https://github.com/ant-design/ant-design/issues/20049)
  - 🐞 修复在 Windows Chrome 下固定列有 9px 的对齐问题。[#19952](https://github.com/ant-design/ant-design/issues/19952)

## 3.26.0

`2019-12-01`

- 🏆 `3.26.0` 将为 antd v3 最后一个 minor 版本，v4 beta 版即将发布！
- 🌟 Notification 支持 `closeIcon` 属性。[#19618](https://github.com/ant-design/ant-design/pull/19618) [@liuchao233](https://github.com/liuchao233)
- 🌟 Typography 添加 `pt_BR` 国际化支持。[#19651](https://github.com/ant-design/ant-design/pull/19651) [@liuchao233](https://github.com/liuchao233)
- 🌟 Table 支持 `defaultFilteredValues` 属性。[#18925](https://github.com/ant-design/ant-design/pull/18925) [@mgcrea](https://github.com/mgcrea)
- 🇲🇰 国际化添加北马其顿支持。[#19647](https://github.com/ant-design/ant-design/pull/19647) [@sradevski](https://github.com/sradevski)
- 🐞 修复 Input.Group 紧凑模式下使用 Input Addon 圆角不对的问题。[#19926](https://github.com/ant-design/ant-design/pull/19926)
- 🐞 修复 Spin 在 `indicator` 属性为 `null` 时，渲染默认的旋转图标。[#19943](https://github.com/ant-design/ant-design/pull/19943)
- 🐞 修复 Button 组件 `disabled` 和 `loading` 状态下没有阻止鼠标事件。[#19958](https://github.com/ant-design/ant-design/pull/19958)
- 🐞 修复 message 组件使用 `key` 时无法手动取消的问题。[#19967](https://github.com/ant-design/ant-design/pull/19967)
- 🐞 修复 Upload 在 `picture-card` 模式下，图片过长会超出边界的问题。[#20008](https://github.com/ant-design/ant-design/pull/20008) [@qq645381995](https://github.com/qq645381995)
- 🐞 修复 Input 清除图标和反馈图标重合的问题。[#20017](https://github.com/ant-design/ant-design/pull/20017)
- 🐞 修复 Slider 的 tooltip 内容没有居中的问题。[#20016](https://github.com/ant-design/ant-design/pull/20016)
- 🐞 修复 Descriptions 内使用 React.Fragment 的渲染问题。[#20019](https://github.com/ant-design/ant-design/pull/20019)
- 🛠 Upload 拖拽模式下的 `className` 和 `style` 将会作用到真正的 dom 上。[#19987](https://github.com/ant-design/ant-design/pull/19987)
- 💄 新增 less 变量 `@table-header-bg-sm` 并修复小号 Table 的 footer 样式。[#19939](https://github.com/ant-design/ant-design/pull/19939)

## 3.25.3

`2019-11-24`

- 🐞 修复 TimePicker 禁用项 focus 时的样式问题。[#19812](https://github.com/ant-design/ant-design/pull/19812) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Menu.Item 链接在 Badge 内时，始终处于 active 状态的问题。[#19810](https://github.com/ant-design/ant-design/pull/19810)
- 🐞 修复 Upload 类型为 `picture-card` 时，列表删除时的样式问题。[#19783](https://github.com/ant-design/ant-design/pull/19783) [@qq645381995](https://github.com/qq645381995)
- 🇳🇱 更新 `sk-SK` 国际化。[#19787](https://github.com/ant-design/ant-design/pull/19787) [@Kamahl19](https://github.com/Kamahl19)
- TypeScript
  - ⚡️ 导出 Tooltip 类型定义。[19846](https://github.com/ant-design/ant-design/pull/19846) [@kachkaev](https://github.com/kachkaev)

## 3.25.2

`2019-11-17`

- 🐞 修复 Upload List 上传错误时没有鼠标悬浮提示的问题。[#19689](https://github.com/ant-design/ant-design/pull/19689) [@qq645381995](https://github.com/qq645381995)
- 💄 修复 Transfer 输入框内容会与清除按钮重叠的问题。[#19693](https://github.com/ant-design/ant-design/pull/19693) [@Abdullah700](https://github.com/Abdullah700)
- 🇳🇱 更新 `NL-nl` 国际化。[#19734](https://github.com/ant-design/ant-design/pull/19734) [@hoest](https://github.com/hoest)
- TypeScript
  - 🐞 修复 Table FilterDropdownProps 定义。[#19701](https://github.com/ant-design/ant-design/pull/19701) [@DeanVanNiekerk](https://github.com/DeanVanNiekerk)
  - 🛠 Slider 添加 `reverse` 定义。[#19713](https://github.com/ant-design/ant-design/pull/19713) [@jacklee814](https://github.com/jacklee814)
  - 🐞 更新 Table `filteredValue` 定义。[#19722](https://github.com/ant-design/ant-design/pull/19722) [@andelf](https://github.com/andelf)

## 3.25.1

`2019-11-10`

- 🐞 修复定制 `@menu-icon-size` 和 `@menu-icon-size-lg` less 变量不生效的问题。[#19553](https://github.com/ant-design/ant-design/pull/19553) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 DirectoryTree 中 `defaultExpandedAll` 在使用 `treeData` 时不生效的问题。[#19646](https://github.com/ant-design/ant-design/pull/19646)
- 🐞 修复 Drawer 中 `placement` 属性为 top 或 bottom 时内容溢出的问题。[#19506](https://github.com/ant-design/ant-design/pull/19506) [@shaodahong](https://github.com/shaodahong)
- 🐞 修复 Dropdown 下 Menu.ItemGroup 样式错乱的问题。 [#19578](https://github.com/ant-design/ant-design/pull/19578)
- 🐞 修复 Dropdown 中菜单图标丢失右边距的问题。[#19635](https://github.com/ant-design/ant-design/pull/19635)
- 🐞 修复 Form.Item 中自定义属性无法生效的问题。[#19599](https://github.com/ant-design/ant-design/pull/19599) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Icon 中 `extraCommonProps` 属性不生效的问题。 [#19572](https://github.com/ant-design/ant-design/pull/19572) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Modal.method() 中浏览器滚动条没有禁用的问题。[#19233](https://github.com/ant-design/ant-design/pull/19233) [@emersonlaurentino](https://github.com/emersonlaurentino)
- Table
  - 🐞 修复合并单元格和固定列同时使用时边框丢失的问题。[#19559](https://github.com/ant-design/ant-design/pull/19559)
  - 🐞 修复 Column 设置了 `sortOrder` 属性导致死循环的问题。[#19558](https://github.com/ant-design/ant-design/pull/19558)
  - 🐞 修复 Column 的 `defaultSortOrder` 属性不生效的问题。[#19558](https://github.com/ant-design/ant-design/pull/19558)
- TypeScript
  - 🐞 修复 Transfer 中 `ListStyle` 的类型定义。[#19568](https://github.com/ant-design/ant-design/pull/19568) [@lxnxbnq](https://github.com/lxnxbnq)
  - 🐞 修复 RangePicker 中多个属性的类型定义缺失的问题。[#19421](https://github.com/ant-design/ant-design/pull/19421) [@JennieJi](https://github.com/JennieJi)

## 3.25.0

`2019-11-04`

- 🌟 Transfer `listStyle` 支持回调函数。[#19330](https://github.com/ant-design/ant-design/pull/19330) [@lxnxbnq](https://github.com/lxnxbnq)
- 🌟 Avatar 的 `icon` 属性支持传递 ReactNode。[#19368](https://github.com/ant-design/ant-design/pull/19368)
- 🌟 TextArea 支持 `allowClear`。[#19310](https://github.com/ant-design/ant-design/pull/19310) [@Rustin-Liu](https://github.com/Rustin-Liu)
- 🌟 Upload 新增 `method` 属性用于修改请求方式。[#19533](https://github.com/ant-design/ant-design/pull/19533)
- 🌟 Upload `onChange` 新增 `XMLHttpRequest` 作为额外参数。[#19539](https://github.com/ant-design/ant-design/pull/19539) [@hahmadia](https://github.com/hahmadia)
- 🐞 修复 WeekPicker 中 `defaultPickerValue` 不生效的问题。[#19141](https://github.com/ant-design/ant-design/pull/19141) [@NightFox7](https://github.com/NightFox7)
- 🐞 修复 DatePicker 抛出 `onEsc is not a function` 错误。[#19474](https://github.com/ant-design/ant-design/pull/19474)
- 🐞 修复 Table 改变每页大小时不滚动到第一行的问题。[#19474](https://github.com/ant-design/ant-design/pull/19474) [@MrHeer](https://github.com/MrHeer)
- 💄 修复 Button.Group 下图标按钮没有对齐的问题。[#19453](https://github.com/ant-design/ant-design/pull/19453)
- 💄 修复 Checkbox 对勾在 Chrome 下有时没有居中的问题。[#19452](https://github.com/ant-design/ant-design/pull/19452)
- 💄 修复 Menu `margin` 样式重合的问题。[#19476](https://github.com/ant-design/ant-design/pull/19476) [@wangweijun0418](https://github.com/wangweijun0418)
- 💄 移除 Select 中没有必要的样式。[#19510](https://github.com/ant-design/ant-design/pull/19510) [@jacklee814](https://github.com/jacklee814)
- 💄 新增 less 变量 `@input-number-hover-border-color`, `@select-background`。[#19546](https://github.com/ant-design/ant-design/pull/19546)
- 🌍 国际化添加缺失的 `downloadFile` 支持。[#19361](https://github.com/ant-design/ant-design/pull/19361) [@DemetriusHR](https://github.com/DemetriusHR)
- 🇹🇭 添加丢失的泰文国际化 (th_TH)。[#19378](https://github.com/ant-design/ant-design/pull/19378) [@anawinwz](https://github.com/anawinwz)
- Typescript
  - 🐞 修复 Upload 丢失的 `preview` 定义。[#19496](https://github.com/ant-design/ant-design/pull/19496) [@chnliquan](https://github.com/chnliquan)

## 3.24.3

`2019-10-26`

- 🐞 修复 Table `columns` 在 render 中会导致排序失效的问题。[#19404](https://github.com/ant-design/ant-design/pull/19404)
- 🐞 修复 Grid 响应式 `gutter` 失效的问题。[#19308](https://github.com/ant-design/ant-design/pull/19308)
- 🐞 修复小号 Table 边框样式问题。[#19312](https://github.com/ant-design/ant-design/pull/19312) [#19342](https://github.com/ant-design/ant-design/pull/19342)
- 🐞 修复 Dropdown 中的 Menu 在 SubMenu 选中后父级菜单未高亮的问题。[#19313](https://github.com/ant-design/ant-design/pull/19313)
- 🐞 修复 Typography & Drawer & Statistic 中的 moment.js 无法被 tree-shaking 的问题。[#19317](https://github.com/ant-design/ant-design/pull/19317)
- 🐞 修复 Input.Search 出现 `non-boolean attribute` 和 `unique key` 警告信息。[#19357](https://github.com/ant-design/ant-design/pull/19357)
- 🐞 修复 Modal 没有标题时，图标没能对齐的问题。[#19419](https://github.com/ant-design/ant-design/pull/19419)
- 💄 修复 Checkbox 在被禁用时，光标仍为可选状态的问题。[#19403](https://github.com/ant-design/ant-design/pull/19403)
- 💄 新增 `@modal-header-color` 变量。[#19385](https://github.com/ant-design/ant-design/pull/19385)
- 🛠 多处 TypeScript 的定义更新。[#19377](https://github.com/ant-design/ant-design/pull/19377) [#19343](https://github.com/ant-design/ant-design/pull/19343) [#19333](https://github.com/ant-design/ant-design/pull/19333)

## 3.24.2

`2019-10-19`

- 🐞 修复 Table `scroll.x` 设置 `max-content` 无效导致横向滚动消失的问题。[#19284](https://github.com/ant-design/ant-design/pull/19284)
- 🐞 修复 Table 将 `column.filterDropdown` 作为新属性设置时报错的问题。[#19302](https://github.com/ant-design/ant-design/pull/19302)
- 🐞 Fix Upload 点击下载按钮会触发预览的问题。[#19268](https://github.com/ant-design/ant-design/pull/19268) [@qq645381995](https://github.com/qq645381995)
- 🐞 修复 Comment 长作者名在小屏幕上破坏布局的问题。[#19272](https://github.com/ant-design/ant-design/pull/19272) [@rayronvictor](https://github.com/rayronvictor)
- Typescript
  - 🐞 优化 RangePicker `value` 属性定义。[#19300](https://github.com/ant-design/ant-design/pull/19300) [@neung123](https://github.com/neung123)
  - 🐞 优化 Select `mode` 属性定义。[#19286](https://github.com/ant-design/ant-design/pull/19286) [@wleven](https://github.com/wleven)
  - 🐞 优化 Upload `customRequest` 属性定义。[#19278](https://github.com/ant-design/ant-design/pull/19278) [@broder](https://github.com/broder)

## 3.24.1

`2019-10-17`

- 🐞 修复 Table 在旧版 React 会报 `React.createRef is not a function` 的错误信息。[#19262](https://github.com/ant-design/ant-design/pull/19262)
- 🐞 修复 Table TypeScript 定义丢失 Column 和 ColumnGroup 的问题。[#19251](https://github.com/ant-design/ant-design/pull/19251)

## 3.24.0

`2019-10-16`

- 🔥 首页新增[语雀](https://www.yuque.com/?chInfo=ch_antd)的推广链接。
- Table
  - 🌟 新增 `tableLayout` 属性，支持设置表格的 `table-layout` 布局，并在固定表头/列下默认开启 `tableLayout="fixed"`，解决因为表格自动根据内容排版造成的列对齐问题。[#17284](https://github.com/ant-design/ant-design/pull/17284)
  - 🌟 新增 `column.ellipsis` 支持单元格内容自动省略。
  - 🌟 新增 `scroll.scrollToFirstRowOnChange` 属性，用于设置在翻页后是否滚动到表格顶部。[#18726](https://github.com/ant-design/ant-design/pull/18726)
  - 🌟 `filterDropdown` 新增 `visible` 参数，用于获取下拉框的显示状态。[#17614](https://github.com/ant-design/ant-design/pull/17614) [@sedx](https://github.com/ant-design/ant-design/pull/17614)
  - 🌟 `title` 方法新增 `sortColumn` 参数，用于获取当前排序的列。[#19012](https://github.com/ant-design/ant-design/pull/19012) [@swillis12](https://github.com/swillis12)
  - 🌟 排序时 `onChange` 的 `sorter` 参数将始终包含 `column` 信息。[#19226](https://github.com/ant-design/ant-design/pull/19226)
  - 🐞 修复过滤下拉菜单的间距问题。[#e1a4f28](https://github.com/ant-design/ant-design/commit/e1a4f2891e3c35ae26495432bd2d288d4d81064a)
- 🌟 Anchor 新增 `onChange` 属性，用于监听锚点链接的改变。[#18715](https://github.com/ant-design/ant-design/pull/18715)
- Upload
  - 🌟 新增 `showDownloadIcon` 属性，用于展示下载图标。[#18664](https://github.com/ant-design/ant-design/pull/18664) [@qq645381995](https://github.com/qq645381995)
  - 🌟 支持 `onRemove` 对上传中断的控制。[#18937](https://github.com/ant-design/ant-design/pull/18937) [@ladjzero](https://github.com/ladjzero)
- 🌟 Input.Search 新增 `loading` 属性，用于展示加载中的状态。[#18771](https://github.com/ant-design/ant-design/pull/18771)
- 🌟 Grid 的 `gutter` 属性新增垂直间距的支持，现在你可以给 `gutter` 设置一个数组，数组的第二个值就表示垂直间距。[#18979](https://github.com/ant-design/ant-design/pull/18979)
- 🌟 message 新增支持通过唯一的 `key` 来更新内容。[#18678](https://github.com/ant-design/ant-design/pull/18678)
- 🌟 Layout 新增 `zeroWidthTriggerStyle` 属性以控制当 `collapsedWidth` 为 `0` 时，出现的特殊 `trigger` 的样式。[#19079](https://github.com/ant-design/ant-design/pull/19079)
- 🌟 Drawer 新增 `drawerStyle` 和 `headerStyle` 属性。[#19109](https://github.com/ant-design/ant-design/pull/19109)
- PageHeader
  - 💄 重新设计了样式 [#19100](https://github.com/ant-design/ant-design/pull/19100)
  - 🌟 新增 `ghost` 属性，用于设置是否需要白底背景。[#19100](https://github.com/ant-design/ant-design/pull/19100)
- ConfigProvider
  - 🌟 新增 `pageHeader` 用于全局控制 PageHeader 的样式。[#19100](https://github.com/ant-design/ant-design/pull/19100)
  - 🐞 修复 moment 不能被 tree shaking 的问题。[#19115](https://github.com/ant-design/ant-design/pull/19115)
- 🐞 修复 TreeSelect 的 `removeIcon` 和 `clearIcon` 属性不生效的问题。[#18949](https://github.com/ant-design/ant-design/pull/18949)
- 🐞 修复 Tree 设置 `showLine` 后 `switcherIcon` 不生效的问题。[#18829](https://github.com/ant-design/ant-design/pull/18829) [@MrHeer](https://github.com/MrHeer)
- 🐞 修复 Slider 组件设置 `handle` 大小后定位错误的问题。[#19120](https://github.com/ant-design/ant-design/pull/19120)
- Collapse
  - 🐞 修复在 IE 11 下的图标样式。[#19135](https://github.com/ant-design/ant-design/pull/19135) [@GBcrimson](https://github.com/GBcrimson)
  - 🐞 修复 `expandIcon` 的 `className` 会被覆盖的问题。[#19160](https://github.com/ant-design/ant-design/pull/19160) [@gpetrioli](https://github.com/gpetrioli)
- 🐞 修复 Tree.DirectoryTree 组件传入 `treeData` 时 `defaultExpandAll` 不生效的问题。[#19148](https://github.com/ant-design/ant-design/pull/19148)
- 🐞 修复 Dropdown 下部分 Menu 样式错乱的问题。[#19150](https://github.com/ant-design/ant-design/pull/19150)
- 🐞 修复 Cascader 的 `placeholder` 国际化错误。[#19227](https://github.com/ant-design/ant-design/pull/19227) [@kagawagao](https://github.com/kagawagao)
- 🌟 新增 less 变量 `@typography-title-margin-top` 和 `@typography-title-margin-bottom`。[#18746](https://github.com/ant-design/ant-design/pull/18746)
- 🗑 废弃 Input.TextArea 的 `autosize` 属性，请使用 `autoSize` 代替。[#19177](https://github.com/ant-design/ant-design/pull/19177)

## 3.23.6

`2019-10-05`

- 🐞 修复 Typography 提示获取不到 `ref` 的错误信息。[#19074](https://github.com/ant-design/ant-design/pull/19074)

## 3.23.5

`2019-09-29`

- 🐞 修复 Upload 预览图片无法填充满图片框的问题。[#18990](https://github.com/ant-design/ant-design/pull/18990)
- 🐞 修复 Breadcrumb 不支持 `data-*` 和 `aria-*` 的问题。[#18941](https://github.com/ant-design/ant-design/pull/18941) [@sosohime](https://github.com/sosohime)
- 🐞 修复 TreeSelect `removeIcon` 和 `clearIcon` 不工作的问题。[#18949](https://github.com/ant-design/ant-design/issues/18949) [@sosohime](https://github.com/sosohime)
- 🐞 修复 Tree 组件当 `showLine` 设置后 `switcherIcon` 没有正常工作的问题。[#18829](https://github.com/ant-design/ant-design/pull/18829) [@MrHeer](https://github.com/MrHeer)
- 🐞 修复按钮图标在 Button.Group 中的错位问题。[#18994](https://github.com/ant-design/ant-design/pull/18994)
- 🐞 移除 Select 中无效属性 `searchValue` 的定义及文档。[#19003](https://github.com/ant-design/ant-design/pull/19003)
- 🐞 修复 Avatar 文本头像在 ssr 时会闪烁的问题。[#19029](https://github.com/ant-design/ant-design/pull/19029)
- TypeScript
  - 🐞 修复 Grid 组件的类型定义。[#18946](https://github.com/ant-design/ant-design/pull/18946) [@handycode](https://github.com/handycode)

## 3.23.4

`2019-09-21`

- 🐞 修复 Transfer `disabled` 下勾选框不被禁用的问题。[#18849](https://github.com/ant-design/ant-design/pull/18849)
- 🐞 回滚 Dragger 到 class component 以修复 ref 警告信息。[#18707](https://github.com/ant-design/ant-design/issues/18707)
- 🐞 修复 Input `addonAfter` 里图标高度在 Chrome 下偏大的问题。[#18858](https://github.com/ant-design/ant-design/pull/18858)
- 🐞 修复 Menu 在 `collapsedWidth={0}` 时，折叠后丢失 `selectedKeys` 状态的问题。[#18907](https://github.com/ant-design/ant-design/pull/18907)
- 🐞 修复 Input 在禁用状态时，后缀图标可点击的问题。[#18900](https://github.com/ant-design/ant-design/pull/18900)
- 🐞 修复 Alert 标题和内容过长不换行的问题。[#18929](https://github.com/ant-design/ant-design/pull/18929)
- 💄 增加 `@page-header-back-color` less 变量。[#18887](https://github.com/ant-design/ant-design/pull/18887)
- TypeScript
  - 🐞 修复 Table 事件的类型定义。[#18910](https://github.com/ant-design/ant-design/pull/18910)

## 3.23.3

`2019-09-16`

- 🐞 修复 ConfigProvider `locale` 国际化在某些场景下对 Modal 不生效的问题。[#18732](https://github.com/ant-design/ant-design/pull/18732)
- 🐞 修复 Avatar 长图片时被挤压的样式问题。[#18768](https://github.com/ant-design/ant-design/pull/18768) [@Eusen](https://github.com/Eusen)
- 🐞 修复 InputNumber 高亮边框的样式问题。[#18791](https://github.com/ant-design/ant-design/pull/18791) [@escorponox](https://github.com/escorponox)
- 🐞 修复 Input.Search 点击清除图标时没有触发 `onSearch` 的问题。[#18783](https://github.com/ant-design/ant-design/pull/18783)
- 🐞 修复 Menu 内的 Button 字体颜色。[#18820](https://github.com/ant-design/ant-design/pull/18820)
- 🐞 修复 Table `size="small"` 时丢失列头右边框的问题。[#18821](https://github.com/ant-design/ant-design/pull/18821)
- ⌨️ 增强 Alert 关闭按钮的可访问性。[#18750](https://github.com/ant-design/ant-design/pull/18750) [@MrHeer](https://github.com/MrHeer)
- 💄 优化 Button 类型为 `link` 时，中文字符之间不再自动插入空格。[#18724](https://github.com/ant-design/ant-design/pull/18724)
- TypeScript
  - 🐞 修复 Tree 中 `onMouseEnter` 和 `onMouseLeave` 类型。[#18796](https://github.com/ant-design/ant-design/pull/18796) [@MrHeer](https://github.com/MrHeer)

## 3.23.2

`2019-09-06`

- 🐞 修复圆形按钮的字体大一号的问题。[#18701](https://github.com/ant-design/ant-design/pull/18701)
- 🐞 修复 Descriptions 带边框时控制台告警的问题。[#18637](https://github.com/ant-design/ant-design/pull/18637)
- 🐞 修复 Drawer 无遮罩从右边展开时的动画问题。[#18636](https://github.com/ant-design/ant-design/pull/18636)
- 🐞 修复 Icon 中 `component` 和 `children` 属性优先级低于 `type` 的问题。[#18592](https://github.com/ant-design/ant-design/pull/18592)
- 🐞 修复 Layout.Sider 的最大宽度的响应式断点值。[#18553](https://github.com/ant-design/ant-design/pull/18553) [@Nikitenkova](https://github.com/Nikitenkova)
- 🐞 修复 PageHeader 中返回图标与面包屑无法共存的问题。[#18691](https://github.com/ant-design/ant-design/pull/18691)
- 🗑 废弃 Select 的 `inputValue` 属性，请使用 `searchValue` 代替。[#18629](https://github.com/ant-design/ant-design/pull/18629)
- TypeScript
  - 🐞 修复 Result 中 `status` 的类型定义。[#18445](https://github.com/ant-design/ant-design/pull/18445)
  - 🐞 修复 Anchor.Link 中 `target` 的类型定义。[#18646](https://github.com/ant-design/ant-design/pull/18646)
  - 🐞 修复 Upload 中 `transformFile` 函数的参数定义。[#18671](https://github.com/ant-design/ant-design/pull/18671)
  - 🐞 修复 Table 中 `title` 和 `footer` 的类型定义。[#18697](https://github.com/ant-design/ant-design/pull/18697) [@yoyo837](https://github.com/yoyo837)

## 3.23.1

`2019-09-03`

- 🐞 修复 Upload 在 `multiple` 为 `false` 时无法上传多于一个文件的问题。[#18626](https://github.com/ant-design/ant-design/pull/18626)
- 🐞 修复 MonthPicker 切换按钮溢出的问题。[#18624](https://github.com/ant-design/ant-design/pull/18624)
- 💄 Tree 增加 `@tree-node-hover-bg` 和 `@tree-node-selected-bg` less 变量。[#18593](https://github.com/ant-design/ant-design/pull/18593) [@MrHeer](https://github.com/MrHeer)

## 3.23.0

`2019-09-02`

- 🔥 PageHeader 样式重新设计以适应更多的情况。[#18128](https://github.com/ant-design/ant-design/pull/18128)
- 🌟 Card 组件新增了 `tabBarExtraContent` 属性。[#18433](https://github.com/ant-design/ant-design/pull/18433) [@lengthmin](https://github.com/lengthmin)
- 🌟 Anchor.Link 增加 `target` 属性。[#18335](https://github.com/ant-design/ant-design/pull/18335) [@DiamondYuan](https://github.com/DiamondYuan)
- 🌟 Breadcrumb 支持子组件使用 `React.Fragment` 的场景。[#18340](https://github.com/ant-design/ant-design/pull/18340) [@long-zhuge](https://github.com/long-zhuge)
- 🌟 Card.Grid 新增 `hoverable` 属性允许禁用浮动效果。[#18457](https://github.com/ant-design/ant-design/pull/18457) [@MrHeer](https://github.com/MrHeer)
- 🇦🇲 新增亚美尼亚语。[#18586](https://github.com/ant-design/ant-design/pull/18586) [@ashmna](https://github.com/ashmna)
- InputNumber
  - 🌟 新增 `onPressEnter` 属性。[#18346](https://github.com/ant-design/ant-design/pull/18346)
  - 🐞 修复在 React 16.9 下的生命周期警告信息。[#18346](https://github.com/ant-design/ant-design/pull/18346)
- Less 变量
  - 💄 增加 `@modal-footer-border-color-split`。[#18522](https://github.com/ant-design/ant-design/pull/18522)
  - 💄 增加 `@input-number-handler-bg` `@input-number-handler-border-color`。[#18533](https://github.com/ant-design/ant-design/pull/18533)
  - 💄 增加 `@card-background` `@card-skeleton-bg`。[#18531](https://github.com/ant-design/ant-design/pull/18531)
  - 💄 增加 `@typography-title-font-weight`。[#18456](https://github.com/ant-design/ant-design/pull/18456) [@MrHeer](https://github.com/MrHeer)
- 🛎 Switch、Checkbox 和 Upload 使用 `value` 时会提示正确的属性名。[#18497](https://github.com/ant-design/ant-design/pull/18497)
- 🛠 使用箭头函数重构 styleChecker 来修复在 next.js 中的问题。[#18541](https://github.com/ant-design/ant-design/pull/18541) [@ZhengYuTay](https://github.com/ZhengYuTay)
- 🐞 修复圆形 Button 有时候不是圆形的问题。[#18516](https://github.com/ant-design/ant-design/pull/18516)
- 🐞 修复 Input 中图标位置不居中情况。[#18521](https://github.com/ant-design/ant-design/pull/18521) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 RangePicker 多余的选中日期样式。[#18559](https://github.com/ant-design/ant-design/pull/18559)
- Descriptions
  - 🐞 修复 Descriptions.Item 最后一个宽度计算不正确的问题。[#18568](https://github.com/ant-design/ant-design/pull/18568)
  - 🐞 Description.Item 在渲染时会复用用户提供的 `key`。[#18578](https://github.com/ant-design/ant-design/pull/18578)
- 🐞 修复 Tabs 内容宽度在 Safari 下不正确的问题。[#18574](https://github.com/ant-design/ant-design/pull/18574)
- 🐞 修复 Mentions 的 `prefix` 为空字符串时，弹窗位置不正确的问题。[#18576](https://github.com/ant-design/ant-design/pull/18576)
- 🐞 修复 Upload.Dragger 在 `multiple` 为 false 时，仍然可以上传多份文件的问题。[#18580](https://github.com/ant-design/ant-design/pull/18580)
- 🐞 修复 `Button[href]` 在 Card `actions` 中样式变形的问题。[#18588](https://github.com/ant-design/ant-design/pull/18588)
- 🐞 修复 Chrome 中 Input 与 Button 不垂直对齐的问题。[#18603](https://github.com/ant-design/ant-design/pull/18603)
- 🐞 修复网格 List 中内嵌 List 的边距问题。[#18589](https://github.com/ant-design/ant-design/pull/18589)
- TypeScript
  - 🐞 修复 Steps.Step 组件 `subTitle` 属性类型。[#18525](https://github.com/ant-design/ant-design/pull/18525) [@wtzeng1](https://github.com/wtzeng1)
  - 🐞 确保 Tooltip 属性定义中，`title` 或 `overlay` 至少有一个是必填的。[#18515](https://github.com/ant-design/ant-design/pull/18515) [@laysent](https://github.com/laysent)

## 3.22.2

`2019-08-27`

- 🐞 修复 Mentions 在 Form 中高度略高的问题。[#18478](https://github.com/ant-design/ant-design/pull/18478)
- 🐞 修复失效 Input 依然支持 allowClear 的问题。[#18482](https://github.com/ant-design/ant-design/pull/18482)
- 🐞 修复 Input.Password unmount 时报错 `Cannot read property 'input' of null`。[#18475](https://github.com/ant-design/ant-design/pull/18475)
- 🐞 修正 Table `style` 属性到最外层容器。[#18494](https://github.com/ant-design/ant-design/pull/18494)
- 🐞 修正 PageHeader 默认英文文案。[#18471](https://github.com/ant-design/ant-design/pull/18471) [@hjiawei](https://github.com/hjiawei)

## 3.22.1

`2019-08-26`

- 🔥 官网现在支持通过图片搜索图标啦！[#18425](https://github.com/ant-design/ant-design/pull/18425)
- 💄 调整 Table 展开按钮的样式。[c5344bd](https://github.com/ant-design/ant-design/commit/c5344bde529a2f2ec814f46e7ec5d249eac8d608)
- 🐞 修复 Table 的 `style` 属性被应用了两次的问题。[#18330](https://github.com/ant-design/ant-design/pull/18330) [@MrHeer](https://github.com/MrHeer)
- 🐞 修复 Input 在 IE11 下错位的问题。[#17759](https://github.com/ant-design/ant-design/pull/17759)
- 🐞 修复 Input.Password `ref` 获取不到 input 元素且没有 `focus` 和 `blur` 方法的问题。[#18441](https://github.com/ant-design/ant-design/pull/18441)
- 🐞 修复 Steps `progressDot` 样式错位问题。[#18356](https://github.com/ant-design/ant-design/pull/18356)
- 🐞 修复纯图标按钮样式错误的问题。[#18458](https://github.com/ant-design/ant-design/pull/18458) [@qhanw](https://github.com/qhanw)
- 🐞 修复 TextArea 受控模式下配置 `autosize` 时，输入会导致滚动条闪烁的问题。[#18401](https://github.com/ant-design/ant-design/pull/18401)
- 🐞 修复 Upload 错误换行的问题。[#18423](https://github.com/ant-design/ant-design/pull/18423)
- 💄 增加 less 变量 `@select-dropdown-bg` `@select-item-selected-bg` `@select-item-active-bg` `@anchor-border-colorr` `@descriptions-bg`。[#18444](https://github.com/ant-design/ant-design/pull/18444) [#18372](https://github.com/ant-design/ant-design/pull/18440) [@MrHeer](https://github.com/MrHeer)

## 3.22.0

`2019-08-17`

- 🔥 新增 Steps `type="navigation"` 导航步骤条。[#17994](https://github.com/ant-design/ant-design/pull/17994)
  - <img width="600" class="markdown-inline-image" src="https://gw.alipayobjects.com/zos/antfincdn/oc7rRuPBbR/421d7885-a822-4375-9deb-92d607e0d9de.png" />
- 🇷🇴 新增罗马尼亚语。[#18163](https://github.com/ant-design/ant-design/pull/18163) [@stefy](https://github.com/stefy)
- Anchor
  - 🌟 新增 `getCurrentAnchor` 属性用于指定当前高亮锚点。[#17823](https://github.com/ant-design/ant-design/pull/17823) [@shaodahong](https://github.com/shaodahong)
  - 🌟 新增 `targetOffset` 属性用于自定义滚动偏移量。[#17827](https://github.com/ant-design/ant-design/pull/17827) [@shaodahong](https://github.com/shaodahong)
- 🌟 支持 Drawer 在局部节点弹出。[#18167](https://github.com/ant-design/ant-design/pull/18167)
- 🌟 Mentions 新增 `getPopupContainer` 属性。[#18298](https://github.com/ant-design/ant-design/pull/18298) [@vijayst](https://github.com/vijayst)
- 🌟 Modal 支持 `closeIcon` 属性用于自定义关闭图标。[#18309](https://github.com/ant-design/ant-design/pull/18309)
- 🌟 Upload 支持预览 `jfif` 格式图片。[#18322](https://github.com/ant-design/ant-design/pull/18322)
- 💄 调整不同大小下 Descriptions.Item 内边距样式。 [#18270](https://github.com/ant-design/ant-design/pull/18270)
- Cascader
  - 🌟 允许自定义输入框的 `autoComplete` 属性可以被覆盖。[#18279](https://github.com/ant-design/ant-design/pull/18279) [@zomars](https://github.com/zomars)
  - 🐞 修复指定 `fieldNames` 时空数据弹层宽度问题。[#18325](https://github.com/ant-design/ant-design/pull/18325)
  - 🐞 修复 `options` 参数未传入数组类型导致页面崩溃。[#18190](https://github.com/ant-design/ant-design/pull/18190) [@nnecec](https://github.com/nnecec)
- 🐞 修复 Menu.SubMenu `className` 错误应用到弹层上的问题。[#18290](https://github.com/ant-design/ant-design/pull/18290)
- 🐞 升级 react-slick 以修复 Carousel 的生命周期警告问题。[#18209](https://github.com/ant-design/ant-design/pull/18209)
- 🐞 修复 Button `received false for a non-boolean attribute loading` 警告信息。[#18208](https://github.com/ant-design/ant-design/pull/18208)
- 🐞 修复 Table 选中行 hover 背景样式问题。[#18261](https://github.com/ant-design/ant-design/pull/18261)
- 🐞 修复 Checkbox 失效时的 hover 边框颜色。[#18168](https://github.com/ant-design/ant-design/pull/18168)
- 🐞 修复 Progress 渐变色混乱和失效的问题。[#18284](https://github.com/ant-design/ant-design/pull/18284)
- 🐞 修复 TextArea `autosize` 内使用 `maxRows` 时滚动条闪烁的问题。[#18289](https://github.com/ant-design/ant-design/pull/18289)
- TypeScript
  - 🐞 修复部分组件（Tooltip、Breadcrumb、Badge）无法引入的问题。[#18282](https://github.com/ant-design/ant-design/pull/18282) [@lidianhao123](https://github.com/lidianhao123)
  - 🐞 修复 MonthPicker `monthCellContentRender` 属性。[#18192](https://github.com/ant-design/ant-design/pull/18192) [@JonathanLee-LX](https://github.com/JonathanLee-LX)
  - 🐞 修复 Upload.Dragger `children` 报错的问题。[#18196](https://github.com/ant-design/ant-design/pull/18196)
  - 🐞 修复 Tag.CheckableTag 的 `style` 属性定义。[#18300](https://github.com/ant-design/ant-design/pull/18300)

## 3.21.4

`2019-08-09`

- 🐞 修复 Dropdown.Button 的 `title` 类型。

## 3.21.3

`2019-08-09`

- Timeline
  - 🐞 修复 `content` 内容连续过长时不换行的问题。[#18092](https://github.com/ant-design/ant-design/pull/18092) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 修复 `alternate` 和 `right` 模式下样式不一致和 `content` 的宽度溢出的问题。 [#18093](https://github.com/ant-design/ant-design/pull/18093) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Tabs 内容带有 margin 时会与标题相互作用的问题。[#18112](https://github.com/ant-design/ant-design/pull/18112)
- 🐞 修复 Textarea `autosize` 在调整尺寸后仍然显示滚动条的问题。[#18114](https://github.com/ant-design/ant-design/pull/18114)
- 🐞 修复 Tooltip 在 `disabled` Checkbox 上不能正确工作的问题。[#18138](https://github.com/ant-design/ant-design/pull/18138)
- 🐞 修复 Button 的行高对齐问题。[#18139](https://github.com/ant-design/ant-design/pull/18139)
- 🐞 修复 Mentions 没有 `blur` 和 `focus` 方法的问题。[#18132](https://github.com/ant-design/ant-design/pull/18132) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Button 无法设置 `title` 的问题。[#18130](https://github.com/ant-design/ant-design/pull/18130) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Upload 在 IE9 下报 File 未定义的问题。[#18115](https://github.com/ant-design/ant-design/pull/18115)
- 🐞 修复 Input 清除图标不居中对齐的问题。[#18151](https://github.com/ant-design/ant-design/pull/18151)
- 🐞 修复 Card `actions` 内使用 Button 的样式问题。[#18179](https://github.com/ant-design/ant-design/pull/18179)
- 🐞 修复 Modal.confirm 无法设置 `getContainer` 的问题。[#18182](https://github.com/ant-design/ant-design/pull/18182)
- ⌨️ 增强 Divider 可访问性支持。[#18116](https://github.com/ant-design/ant-design/pull/18116)

## 3.21.2

`2019-08-06`

- 🐞 修复 `React does not recognize the noStyle prop on a DOM element` 的问题。[#18088](https://github.com/ant-design/ant-design/pull/18088)
- 🐞 修复 Input `prefix` & `suffix` 文本没对齐的问题。[#18097](https://github.com/ant-design/ant-design/pull/18097)
- 🐞 修复 ConfigProvider 嵌套于 LocaleProvider 内时 `locale` 无效的问题。[#18105](https://github.com/ant-design/ant-design/pull/18105)

## 3.21.1

`2019-08-05`

- 🐞 修复 ConfigProvider 存在多个子节点崩溃的问题。[#18075](https://github.com/ant-design/ant-design/pull/18075)

## 3.21.0

`2019-08-04`

- 🌟 新增 `Breadcrumb.Separator` 组件，可进行 `separator` 自定义。[#17873](https://github.com/ant-design/ant-design/issues/17873) [@long-zhuge](https://github.com/long-zhuge)
- 🌟 Descriptions 新增 `colon` 属性。[#17560](https://github.com/ant-design/ant-design/pull/17560) [@hengkx](https://github.com/hengkx)
- 🌟 当 Sider 在右边时，翻转 `trigger` 方向。[#18043](https://github.com/ant-design/ant-design/pull/18043) [@kagawagao](https://github.com/kagawagao)
- 🌟 Table 新增 `getPopupContainer` 属性用于设置表格内的各类浮层渲染节点。[#17806](https://github.com/ant-design/ant-design/pull/17806)
- 🌟 Timeline.Item 新增 `gray` 色彩类型，可用于未完成或失效状态。[#17731](https://github.com/ant-design/ant-design/pull/17731)
- 🌟 Upload 新增 `transformFile` 支持上传之前转换文件。[#18009](https://github.com/ant-design/ant-design/pull/18009) [@lijinke666](https://github.com/lijinke666)
- 🐞 修复 ConfigProvider `getPopupContainer` 对 Table 不生效的问题。 [#17806](https://github.com/ant-design/ant-design/pull/17806)
- 🐞 修复 Statistic 字体与全局字体不一致的问题。[#18044](https://github.com/ant-design/ant-design/pull/18044)
- 🐞 修复 `Form.Item` label 正则替换问题。[#17985](https://github.com/ant-design/ant-design/pull/17985) [@shaodahong](https://github.com/shaodahong)
- 🐞 修复 Select 搜索框箭头样式问题。 [#17760](https://github.com/ant-design/ant-design/pull/17760) [@chenyizhongx](https://github.com/chenyizhongx)
- 🐞 修复 DatePicker 中选择 `mode` 为 decade 时，border 样式 bug。[#17887](https://github.com/ant-design/ant-design/pull/17887) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Button 以及相关组件的波纹性能问题。[#17945](https://github.com/ant-design/ant-design/pull/17945)
- 🐞 修复 Tabs `tabBarExtraContent` 不居中对齐的问题。[#17969](https://github.com/ant-design/ant-design/pull/17969)
- 🐞 修复 Tabs 在 `type` 为 `editable-card` 且子组件为 false 值时会报错的问题。[#17965](https://github.com/ant-design/ant-design/pull/17965) [@oldturkey](https://github.com/oldturkey)
- 🐞 再次修复 Input 内的清除图标和 `suffix` 对齐问题。[#17684](https://github.com/ant-design/ant-design/pull/17684) [@LilyWakana](https://github.com/LilyWakana)
- 🐞 移除 Alert 关闭标签中的 `a` 标签。[#17872](https://github.com/ant-design/ant-design/pull/17872) [@geograous](https://github.com/geograous)
- 💄 统一 Drawer 和 Modal 的 `mask` 透明度为 45%。[#17943](https://github.com/ant-design/ant-design/pull/17943)
- 💄 优化 RangePicker 当前选中样式，与 DatePicker 样式统一。[#17983](https://github.com/ant-design/ant-design/pull/17983)
- 💄 调整 Tag 的 html 标签为 `span`。[#17971](https://github.com/ant-design/ant-design/pull/17971)
- 💄 提升 Table 展开按钮的无障碍体验。[#17781](https://github.com/ant-design/ant-design/pull/17781)
- 💄 将 LocaleProvider 合并入 ConfigProvider。[#17816](https://github.com/ant-design/ant-design/pull/17816)
- 💄 增加 less 变量 [#17976](https://github.com/ant-design/ant-design/pull/17976) [@Yangzhedi](https://github.com/Yangzhedi) [#17613](https://github.com/ant-design/ant-design/pull/17613) [@alxkosov](https://github.com/alxkosov)：
  - `@table-footer-bg`
  - `@table-footer-color`
  - `@menu-icon-size`
  - `@menu-icon-size-lg`
- 🇲🇾 新增马来语语言包。[#17546](https://github.com/ant-design/ant-design/pull/17546) [@austin-krave](https://github.com/austin-krave)
- 🇸🇪 新增 Typography 的瑞典语言翻译。[#17858](https://github.com/ant-design/ant-design/pull/17858) [@Malven](https://github.com/Malven)
- 🇫🇷 新增 Typography 的法语语言翻译。[#17418](https://github.com/ant-design/ant-design/pull/17418) [@Clafouti](https://github.com/Clafouti)
- 🏴 新增部分组件的泰米尔语语言翻译。[#17903](https://github.com/ant-design/ant-design/pull/17903) [@sivaraj-dev](https://github.com/sivaraj-dev)
- TypeScript
  - 🐞 修复 DatePicker `onChange` 类型定义。[#17955](https://github.com/ant-design/ant-design/pull/17955) [@haimrait](https://github.com/haimrait)

## 3.20.7

`2019-07-26`

- 🐞 修复 Upload 在 Form.Item 中无法点击的问题。[#17897](https://github.com/ant-design/ant-design/pull/17897)

## 3.20.6

`2019-07-24`

- 🐞 修复 Col 在高度为 0 时的占位问题。 [#17748](https://github.com/ant-design/ant-design/pull/17748) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Cascader `options` 中 `children` 为 `null` 时报错的问题。[#17756](https://github.com/ant-design/ant-design/pull/17756)
- 🐞 修复 Checkbox 左对齐的内边距问题。[#17752](https://github.com/ant-design/ant-design/pull/17752) [#17761](https://github.com/ant-design/ant-design/pull/17761) [@inovux](https://github.com/inovux)
- 🐞 修复 Input 在 IE 下错位的问题。[#17759](https://github.com/ant-design/ant-design/pull/17759)
- 🐞 修复最后一个 Rate 有额外边距的问题。[#17764](https://github.com/ant-design/ant-design/pull/17764) [@inovux](https://github.com/inovux)
- 🐞 修复 Radio.Button 失效项的边框样式问题。[#17775](https://github.com/ant-design/ant-design/pull/17775)
- 🐞 修复 DatePicker `@input-hover-border-color` 变量不生效的问题。[#17784](https://github.com/ant-design/ant-design/pull/17784)
- 🐞 修复 Transfer 在 `lazy` 时更新数据不触发重新渲染的问题。[#17783](https://github.com/ant-design/ant-design/pull/17783)
- 🐞 修复 RangePicker `defaultValue` 中开始时间可大于结束时间的问题。[#17694](https://github.com/ant-design/ant-design/pull/17694) [@mraiguo](https://github.com/mraiguo)
- 💄 优化 `placeholder` 文字过长时的截断样式兼容性问题。[#17797](https://github.com/ant-design/ant-design/pull/17797) [@Kapiroska](https://github.com/Kapiroska)
- 🐞 修复 Menu 循环依赖的问题。[#17805](https://github.com/ant-design/ant-design/pull/17805) [@phthhieu](https://github.com/phthhieu)
- 🐞 修复 Alert `message` 样式问题。[#17808](https://github.com/ant-design/ant-design/pull/17808) [@mtadams007](https://github.com/mtadams007)
- 🐞 修复 Result `extra` 部分不居中的问题。[#17786](https://github.com/ant-design/ant-design/pull/17786) [@nnecec](https://github.com/nnecec)
- 🐞 修复 Progress 在 `value` 较小时，左边条不够圆的问题。[#17819](https://github.com/ant-design/ant-design/pull/17819)
- 🐞 修复 Statistic.Countdown `format` 不支持方括号保留字符串的问题。[#17841](https://github.com/ant-design/ant-design/pull/17841)
- 🐞 修复 Table 自定义 `filterDropdown` 在某些情况下消失时总是触发 `onChange` 的问题。[#17846](https://github.com/ant-design/ant-design/pull/17846)
- 🐞 修复 TimePicker 在 Safari 下的滚动条渲染问题。[#17857](https://github.com/ant-design/ant-design/pull/17857)

## 3.20.5

`2019-07-19`

- 🐞 修复 `<Button type="danger" ghost />` 样式问题。[#17743](https://github.com/ant-design/ant-design/pull/17743)

## 3.20.4

`2019-07-19`

- 🐞 修复多层级 Drawer 的 `mask` 为 false 时，卸载子级组件后父抽屉不收回的问题。[#17698](https://github.com/ant-design/ant-design/pull/17698)
- 🐞 修复 Table 圆角样式在 Firefox 下丢失的问题。[#17641](https://github.com/ant-design/ant-design/pull/17641)
- 🐞 修复 Menu 抛出 `Cannot update during an existing state transition` 警告的问题。[#17657](https://github.com/ant-design/ant-design/pull/17657)
- 🐞 修复 Affix 容器变化时尺寸不变的问题。[#17678](https://github.com/ant-design/ant-design/pull/17678)
- 🐞 修复 Anchor 监听元素不随着 `getContainer` 变化的问题。[#17677](https://github.com/ant-design/ant-design/pull/17677)
- 🐞 修复 Modal 和 Drawer 同时使用导致的窗体滚动条冲突的问题。[#17600](https://github.com/ant-design/ant-design/pull/17600)
- 🌟 Empty `description` 支持 `false`。 [#17659](https://github.com/ant-design/ant-design/pull/17659) [@billfeller](https://github.com/billfeller)
- 💄 去除 Pagination 元素下划线以防止被全局样式污染。[#17728](https://github.com/ant-design/ant-design/pull/17728)
- 💄 拓展 Card action 可点击区域。[#17705](https://github.com/ant-design/ant-design/pull/17705) [@lhx6538665](https://github.com/lhx6538665)
- 💄 对 Less 变量进行了一波调整，以适应更多细节风格定制。[#17697](https://github.com/ant-design/ant-design/pull/17697)

  - 调整危险按钮样式。

    <img width="103" class="markdown-inline-image" alt="image" src="https://user-images.githubusercontent.com/507615/61370809-e37aa480-a8c5-11e9-98b3-51ce06dfba24.png">

  - 修复 `@border-radius-sm` 对 Slider、TreeSelect 不生效的问题。
  - Progress、Tabs、Slider、Timeline 组件补充 less 变量。

- TypeScript
  - 💄 完善 Form 的类型定义。[#17676](https://github.com/ant-design/ant-design/pull/17676) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
  - 💄 完善 Tabs 的类型定义。[#17675](https://github.com/ant-design/ant-design/pull/17675)

## 3.20.3

`2019-07-15`

- 🚨 回滚 [#17508](https://github.com/ant-design/ant-design/pull/17508) 中对 Input 后缀样式的修改，因其导致了其他更多问题。

## 3.20.2

`2019-07-13`

- 📖 文档中增加对组件新特性的版本说明。[#17373](https://github.com/ant-design/ant-design/pull/17373) [@muzea](https://github.com/muzea)
- 🐞 修复 Button 组件的 loading 样式问题。[#17596](https://github.com/ant-design/ant-design/pull/17596) [@LilyWakana](https://github.com/LilyWakana)
- Cascader
  - 🐞 修复 options 为空时不展示空内容的问题。[#17538](https://github.com/ant-design/ant-design/pull/17538)
  - 🐞 修复 option 的 isLeaf 为 true 时 loading 样式没有对齐的问题。[#17550](https://github.com/ant-design/ant-design/pull/17550)
  - 🐞 修复文本过长被箭头遮挡的问题。[#17583](https://github.com/ant-design/ant-design/pull/17583)
- 🐞 修复 Input 组件存在多个后缀图标时的样式错乱问题。[#17508](https://github.com/ant-design/ant-design/pull/17508) [@LilyWakana](https://github.com/LilyWakana)
- TypeScript
  - 💄 完善 Cascader 的 `option` 类型定义。[#17581](https://github.com/ant-design/ant-design/pull/17581) [@MrHeer](https://github.com/MrHeer)
  - 🐞 修复 Descriptions 的 `title` 类型定义。[#17559](https://github.com/ant-design/ant-design/pull/17559)
  - 🐞 修复 Collapse 的 activeKey、defaultActiveKey 以及 Collapse.Panel 的 key 类型定义。[#17557](https://github.com/ant-design/ant-design/pull/17557) [@thylsky](https://github.com/thylsky)

## 3.20.1

- 💄 优化 TimePicker 聚焦状态的样式。[#17447](https://github.com/ant-design/ant-design/pull/17447)
- 💄 优化 DatePicker 箭头样式，解决非 utf-8 编码下箭头样式乱码的问题。[#17480](https://github.com/ant-design/ant-design/pull/17480)
- 🐞 删除 Drawer 中传给 rc-drawer 的不必要的属性避免报错。[#17390](https://github.com/ant-design/ant-design/pull/17390)
- 🐞 修复 Tabs 当前失效页签样式以及切换图标错位 2px 的问题。[#17500](https://github.com/ant-design/ant-design/pull/17500)
- 🐞 修复 Result 组件 `className` 为空造成类名错误的问题。[#17389](https://github.com/ant-design/ant-design/pull/17389)
- 🐞 修复 safari 浏览器 DatePicker 组件输入框被遮挡的问题。[#17421](https://github.com/ant-design/ant-design/pull/17421)
- 🐞 修复图标名 `colum-height` 为 `column-height`。[#17458](https://github.com/ant-design/ant-design/pull/17458)
- TypeScript
  - 🐞 修复 Form `onSubmit` TypeScript 定义。[#17412](https://github.com/ant-design/ant-design/pull/17412)
  - 🐞 修复 AutoComplete 多余的 `loading` 属性 TypeScript 定义。[#17433](https://github.com/ant-design/ant-design/pull/17433)
  - 🐞 修复 Switch 的 `onClick` 的 TypeScript 定义。[#17502](https://github.com/ant-design/ant-design/pull/17502) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.20.0

- 🔥🔥🔥 新增 [Result](https://ant.design/components/result) 用于反馈一系列操作任务的处理结果。
- 🔥 Descriptions 支持垂直布局。[#17330](https://github.com/ant-design/ant-design/pull/17330) [@hengkx](https://github.com/hengkx)
- 🔥 优化 PageHeader 的 `className` 定义。[#17321](https://github.com/ant-design/ant-design/pull/17321)
- 🔥 Progress.Circle 支持渐变色。[#17315](https://github.com/ant-design/ant-design/pull/17315) [@hengkx](https://github.com/hengkx)

  <img class="markdown-inline-image" src="https://gw.alipayobjects.com/zos/antfincdn/WogwW6kA4O/method-draw-image.svg" alt="Progress">

- 🐞 Drawer 修复 `maskCloseble` 为 false，键盘 ESC 关闭无效的问题。[#17316](https://github.com/ant-design/ant-design/pull/17316)
- 🐞 修复在 Edge 下 Drawer 关闭后没有调用 `afterVisibleChange` 的问题。[#17311](https://github.com/ant-design/ant-design/pull/17311)
- 🌟 Drawer 新增 `keyboard`，允许打开关闭对键盘事件的响应。[#17316](https://github.com/ant-design/ant-design/pull/17316)
- 🌟 Popconfirm 增加 `disabled` props，用于控制点击子元素是否弹出。[#16985](https://github.com/ant-design/ant-design/pull/16985) [@lhyt](https://github.com/lhyt)
- ⌨️ 改进 TimePicker 可访问性。[#17099](https://github.com/ant-design/ant-design/pull/17099)
- 💄 修复 Tooltip 箭头阴影样式。[#17264](https://github.com/ant-design/ant-design/pull/17264)
- 🐞 修复 Descriptions.Item 不支持 `className` 的问题。[#17280](https://github.com/ant-design/ant-design/pull/17280)
- 🐞 修复 Descriptions.Item 不设置 label，也会显示 `:` 的问题。[#17337](https://github.com/ant-design/ant-design/pull/17337)
- 🐞 修复 Mentions 组件的 `placeholder` 颜色不正确的问题。[#17317](https://github.com/ant-design/ant-design/pull/17317)
- 🐞 修复 Mentions 组件的行高不正确的问题。[#17347](https://github.com/ant-design/ant-design/pull/17347)
- 💄 按照设计规范修复小号 Table 的背景色。[#17351](https://github.com/ant-design/ant-design/pull/17351)
- 🌟 CheckboxGroup `onChange` 值保持选项的顺序。[#17342](https://github.com/ant-design/ant-design/pull/17342) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Tooltip 在 disabled Switch 中工作不正确的问题。[#17372](https://github.com/ant-design/ant-design/pull/17372)
- 💄 增加 less 变量 [#16843](https://github.com/ant-design/ant-design/pull/16843) [#17031](https://github.com/ant-design/ant-design/pull/17031) [#16996](https://github.com/ant-design/ant-design/pull/16996) [@alxkosov](https://github.com/alxkosov)：
  - `@dropdown-line-height`
  - `@dropdown-font-size`
  - `@dropdown-vertical-padding`
  - `@collapse-panel-border-radius`
  - `@table-body-selected-sort-bg`
  - `@table-selected-row-hover-bg`
- TypeScript
  - 🌟 改进 Switch 的类型定义。[#17331](https://github.com/ant-design/ant-design/pull/17331)
  - 🐞 Skeleton AvatarProps `size` 支持 number。[#17331](https://github.com/ant-design/ant-design/pull/17331)
- 📝 更新了几处文档。[#17336](https://github.com/ant-design/ant-design/pull/17336) [#17345](https://github.com/ant-design/ant-design/pull/17345) [#17355](https://github.com/ant-design/ant-design/pull/17355)

## 3.19.8

`2019-06-24`

- 🐞 回滚 `unknown` 到 `any` 避免一次性引入大量 TS 错误。[#17249](https://github.com/ant-design/ant-design/issues/17249)

## 3.19.7

`2019-06-21`

- 🐞 修复 Descriptions 内无法嵌套空值的问题。[#17207](https://github.com/ant-design/ant-design/pull/17207) [@superandrew213](http://github.com/superandrew213)
- 🐞 修复 Table 空数据表格在 IE 下的一个滚动条样式问题。[#17223](https://github.com/ant-design/ant-design/pull/17223)
- 🐞 修复单个 Breadcrumb 未在 PageHeader 上显示的问题。[#17209](https://github.com/ant-design/ant-design/pull/17209)
- 🐞 修复 Modal 底部 24px 像素遮罩区域无法触发关闭弹窗行为。[#17229](https://github.com/ant-design/ant-design/pull/17229)
- 🐞 修复 Layout Sider 的展开按钮 `z-index` 太低的问题。[#17228](https://github.com/ant-design/ant-design/pull/17228)
- TypeScript
  - ⚡️ 使用 `unknown` 代替 `any` 优化 TypeScript 定义。[#14044](https://github.com/ant-design/ant-design/issues/14044) [@Zzzen](http://github.com/Zzzen)
  - 🐞 修复 Calendar `headerRender` 属性为可选。[#17063](https://github.com/ant-design/ant-design/pull/17063) [@wonderjar](http://github.com/wonderjar)

## 3.19.6

`2019-06-19`

- 🐞 修复嵌套 Card `extra` 位置不正确的问题。[#17140](https://github.com/ant-design/ant-design/pull/17140)
- 🐞 修复 Table 动态改变 `filter` 时报错的问题。[#17141](https://github.com/ant-design/ant-design/pull/17141)
- 🐞 修复 TextArea 和 RangePicker 分隔符位置偏下和对齐的问题。[#17165](https://github.com/ant-design/ant-design/pull/17165)

## 3.19.5

`2019-06-17`

- 🐞 修复 RangerPicker 输入框内容没有对齐的问题。[#17126](https://github.com/ant-design/ant-design/issues/17126)
- 🐞 修复 ConfigProvider 的 `getPopupContainer` 对 Modal 无效的问题。[#17132](https://github.com/ant-design/ant-design/issues/17132)
- TypeScript
  - 🐞 修复 Descriptions.Item 的类型定义。[#17049](https://github.com/ant-design/ant-design/pull/17049)

## 3.19.4

`2019-06-16`

- PageHeader
  - 🐞 修复 `extra` 的一个元素边距问题。[#17025](https://github.com/ant-design/ant-design/issues/17025)
  - 🐞 修复手型鼠标指针并不总是可点击的问题。[#17114](https://github.com/ant-design/ant-design/pull/17114)
- 🐞 修复 Table 数据排序后不会回到第一页的问题。[#16978](https://github.com/ant-design/ant-design/issues/16978)
- 🐞 修复 Menu 选项的子菜单选中并收起时没有高亮的问题。[#17039](https://github.com/ant-design/ant-design/pull/17039)
- 🐞 修复 Tree 使用 `showLine` 时动画抖动的问题。[#17055](https://github.com/ant-design/ant-design/pull/17055)
- 🐞 修复 Collapse 会出现多余滚动条的问题。[#17009](https://github.com/ant-design/ant-design/pull/17009) [#mtadams007](https://github.com/mtadams007)
- 🐞 修复 DatePicker 阿拉伯语的时间格式。[#17092](https://github.com/ant-design/ant-design/pull/17092) [#3b3ziz](https://github.com/3b3ziz)
- 🐞 修复 Input 与其他组件不对齐的问题。[#17082](https://github.com/ant-design/ant-design/issues/17082)
- 💄 优化带边框 Table 的滚动条样式细节。[#17065](https://github.com/ant-design/ant-design/pull/17065)
- 🌟 优化 Divider 实现方式以方便样式定制。[#17113](https://github.com/ant-design/ant-design/pull/17113)
- 🇷🇺 新增部分俄语翻译。[#17108](https://github.com/ant-design/ant-design/pull/17108) [#Enfield1](https://github.com/Enfield1)
- 🌟 新增 less 变量 [#17041](https://github.com/ant-design/ant-design/pull/17041) [#SamKirkland](https://github.com/SamKirkland)：
  - `@comment-font-size-base`
  - `@comment-font-size-sm`

## 3.19.3

`2019-06-06`

- 📝 增加 DatePicker/RangePicker 指定 `mode` 后无法选择的文档说明。[#16984](https://github.com/ant-design/ant-design/pull/16984)
- 🐞 修复 Breadcrumb 的 `validateDOMNesting` 警告信息。[#16929](https://github.com/ant-design/ant-design/pull/16929)
- 🐞 修复 Breadcrumb 选中子路由时浏览器路径问题。[#16885](https://github.com/ant-design/ant-design/pull/16885) [@haianweifeng](https://github.com/haianweifeng)
- 🐞 修复 InputNumber 设置 `number` 类型时会展示原生按钮的问题。[#16926](https://github.com/ant-design/ant-design/pull/16926)
- 🐞 修复 Transfer 在自定义列表为空时展示 Empty 样式。[#16925](https://github.com/ant-design/ant-design/pull/16925)
- 🐞 **修复 Table 头部多余的垂直滚动条样式。**[#16950](https://github.com/ant-design/ant-design/pull/16950)
- 🐞 修复 Table 的 `rowSelection.getCheckboxProps()` 在没有返回值时报错的问题。[#15224](https://github.com/ant-design/ant-design/pull/15224)
- 🐞 修复 Firefox 的 Table 丢失 `border-radius` 样式问题。[#16957](https://github.com/ant-design/ant-design/pull/16957)
- 🐞 修复 Table 当 `title` 和 `rowSelection` 同时指定时在 Chrome 下滚动条异常的问题。[#16934](https://github.com/ant-design/ant-design/pull/16934)
- 🐞 修复 Divider `orientation="center"` 时样式错位的问题。[#16988](https://github.com/ant-design/ant-design/pull/16988)
- 🐞 修复 Cascader 搜索时不支持空格输入的问题。[#16918](https://github.com/ant-design/ant-design/pull/16918) [@Durisvk](https://github.com/Durisvk)
- 🐞 修复部分组件的西班牙语言翻译。[#17002](https://github.com/ant-design/ant-design/pull/17002) [@morellan](https://github.com/morellan)
- TypeScript
  - 🐞 修复 Upload 的 `RcFile` 类型定义。[#16851](https://github.com/ant-design/ant-design/pull/16851)
  - ⚡️ 导出 Typography 中 `TextProps` 的类型定义。[#17003](https://github.com/ant-design/ant-design/pull/17003) [@Jarvis1010](https://github.com/Jarvis1010)

## 3.19.2

`2019-06-01`

- 🐞 修复 Tabs 在垂直卡片模式下标签不能滚动的问题。[#16825](https://github.com/ant-design/ant-design/pull/16825)
- 🐞 修复 Transfer 组件在 unmount 时 `setState` 警告。[#16822](https://github.com/ant-design/ant-design/pull/16822) [@shiningjason](https://github.com/shiningjason)
- 💄 使用 Less 变量 `@error-color`、`@warning-color` 代替 `@text-color-danger`、`@text-color-warning`。[#16890](https://github.com/ant-design/ant-design/pull/16890) [@MrHeer](https://github.com/MrHeer)
- 💄 增加在 Sider 内 Menu 使用 `inlineCollapsed` 时的提示信息。[#16826](https://github.com/ant-design/ant-design/pull/16826)
- TypeScript
  - ⚡️ 增加 Menu 中 `forceSubMenuRender` 类型定义。[#16827](https://github.com/ant-design/ant-design/pull/16827)
  - ⚡️ 导出 Typography 类型定义。[#16835](https://github.com/ant-design/ant-design/pull/16835)
  - ⚡️ 增加 Steps 中的 `onChange` 类型定义。[#16845](https://github.com/ant-design/ant-design/pull/16845) [@JonathanLee-LX](https://github.com/JonathanLee-LX)
  - ⚡️ 增加 Upload 中 `webkitRelativePath` 类型定义。[#16850](https://github.com/ant-design/ant-design/pull/16850) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.19.1

`2019-05-27`

- 🐞 修复 Menu 在受控模式下收起 Tooltip 不消失的问题。[#16812](https://github.com/ant-design/ant-design/pull/16812)
- 🐞 修复 Descriptions 排列警告信息逻辑错误的问题。[#16819](https://github.com/ant-design/ant-design/pull/16819)
- 🐞 修复图标 `canlendar` 和 `interation` 为正确的拼写 `calendar` 和 `interaction`。[#16818](https://github.com/ant-design/ant-design/pull/16818)
- TypeScript
  - ⚡️ 修复 Mentions 定义。[#16814](https://github.com/ant-design/ant-design/pull/16814)
  - ⚡️ 完善 Select 中 `onSelect` 和 `onDeselect` 属性的定义。[#16817](https://github.com/ant-design/ant-design/pull/16817)

## 3.19.0

`2019-05-26`

- 本月新增组件：
  - 🔥🔥🔥 [Mentions](https://ant.design/components/mentions-cn/) 新增提及组件并废弃原有 Mention 组件。
  - 🔥🔥🔥 [Descriptions](https://ant.design/components/descriptions-cn/) 成组展示多个只读字段。
- 🇱🇻 新增拉脱维亚语支持。[#16780](https://github.com/ant-design/ant-design/pull/16780) [@kirbo](https://github.com/kirbo)
- 🌟 Drawer 支持 `ESC` 关闭。[#16694](https://github.com/ant-design/ant-design/pull/16694)
- 🌟 Steps 支持点击切换功能。[#16773](https://github.com/ant-design/ant-design/pull/16773)
- 🌟 Calendar 支持 `headerRender` 以自定义头部。[#16535](https://github.com/ant-design/ant-design/pull/16535) [@abgaryanharutyun](https://github.com/abgaryanharutyun)
- 🌟 Slider 支持 `tooltipPlacement` 以定义提示所在位置。[#16641](https://github.com/ant-design/ant-design/pull/16641) [@cmaster11](https://github.com/cmaster11)
- 🌟 Slider 支持 `getTooltipPopupContainer` 以允许自定义提示所在容器。[#16717](https://github.com/ant-design/ant-design/pull/16717)
- 🐞 修复 PageHeader 中水平分割线样式问题。[#16684](https://github.com/ant-design/ant-design/pull/16684)
- 🐞 修复 Carousel `initialSlide` 在 `children` 数量变化时无效的问题。[#16756](https://github.com/ant-design/ant-design/pull/16756)
- 🐞 修复 Cascader 自定义渲染时元素无法交互的问题。[#16782](https://github.com/ant-design/ant-design/pull/16782)
- 🐞 修复 Upload 列表在 `disabled` 时仍然可以移除的问题。[#16786](https://github.com/ant-design/ant-design/pull/16786)
- 💄 增加 Upload `disabled` 状态下鼠标样式。[#16799](https://github.com/ant-design/ant-design/pull/16799) [@attacking](https://github.com/attacking)
- 💄 修正 Statistic 的字体颜色。[#16801](https://github.com/ant-design/ant-design/pull/16801)
- TypeScript
  - ⚡️ 完善 Upload 中 `action` 属性的定义。[#16716](https://github.com/ant-design/ant-design/pull/16716) [@christophehurpeau](https://github.com/christophehurpeau)
  - ⚡️ 完善 Upload 中 `onRemove` 属性的定义。[#16570](https://github.com/ant-design/ant-design/pull/16570) [@christophehurpeau](https://github.com/christophehurpeau)
  - ⚡️ 完善 Select 中 `getPopupContainer` 属性的定义。[#16778](https://github.com/ant-design/ant-design/pull/16778) [@chj-damon](https://github.com/chj-damon)
  - ⚡️ 完善 InputNumber 中 `parser` 属性的定义。[#16797](https://github.com/ant-design/ant-design/pull/16797)
  - ⚡️ 移除已经失效的属性定义。[#16705](https://github.com/ant-design/ant-design/pull/16705) [@sirlantis](https://github.com/sirlantis)

## 3.18.2

`2019-05-20`

- 🐞 修复 Button 组件中插入文本时空格丢失的问题。[#15342](https://github.com/ant-design/ant-design/issues/15342)
- 🐞 修复 Carousel 组件的 `children` 数量变化时，面板指示点的选中状态不正常的问题。[#16583](https://github.com/ant-design/ant-design/issues/16583)
- 🐞 升级 `rc-calendar` 依赖到 `9.13.3` 版本，以修复 DatePicker 组件在失去焦点时面板不会关闭的问题。[#16588](https://github.com/ant-design/ant-design/issues/16588)
- 🐞 修复 Form.Item 组件带有 `help` 信息，并且 `margin-bottom` 为负数时，导致之后的元素样式错乱的问题。[#16584](https://github.com/ant-design/ant-design/pull/16584) [@sbusch](https://github.com/sbusch)
- 🐞 修复 Spin 组件在设置 `font-size` 样式时没有水平居中的问题。[#15206](https://github.com/ant-design/ant-design/issues/15206)
- 🐞 修复 Table 组件指定 `childrenColumnName` 时，`selectedRows` 参数为空的问题。[#16614](https://github.com/ant-design/ant-design/issues/16614)
- TypeScript
  - ⚡️ 完善 Breadcrumb 中 `children` 属性的定义。[#16550](https://github.com/ant-design/ant-design/pull/16550) [@Gin-X](https://github.com/Gin-X)
  - ⚡️ 完善 Form 中 `onFieldsChange` 函数的参数定义。[#16577](https://github.com/ant-design/ant-design/pull/16577) [@SylvanasGone](https://github.com/SylvanasGone)
  - ⚡️ 完善 List 中 `dataSource` 和 `renderItem` 属性的定义。[#16587](https://github.com/ant-design/ant-design/issues/16587)
  - ⚡️ 完善 Tree 中 `onDragEnter` 函数的参数定义。[#16638](https://github.com/ant-design/ant-design/pull/16638) [@eruca](https://github.com/eruca)
  - ⚡️ 完善 Tree 中 event 属性的定义。[#16624](https://github.com/ant-design/ant-design/pull/16624) [@ztplz](https://github.com/ztplz)

## 3.18.1

`2019-05-13`

- 🐞 移除打包后多余的 `module.export`。[#antd-tools](https://github.com/ant-design/antd-tools/commit/b9e230c91551af5b4555f672130b14304ff58357)

## 3.18.0

`2019-05-12`

- 🌟 Transfer 支持 `children` 来自定义渲染列表。[#16026](https://github.com/ant-design/ant-design/pull/16026)
- 🌟 Pagination 支持 `disabled` 属性。[#16493](https://github.com/ant-design/ant-design/pull/16493)
- 🌟 升级 `@ant-design/icons` 和 `@ant-design/icons-react` 到 2.0 修复一些图标缺失的问题。[#15874](https://github.com/ant-design/ant-design/pull/15874)
- 🐞 修复 Form `hasFeedback` 和 Input.Password 一起使用时互相重叠的问题。[#16445](https://github.com/ant-design/ant-design/pull/16445)
- 🐞 修复 Select 当前选中的失效项的样式问题。[#16477](https://github.com/ant-design/ant-design/pull/16477)
- 🐞 修复 Upload disabled 状态下会被 label 激活的问题。[#16483](https://github.com/ant-design/ant-design/pull/16483)
- 🐞 修复 `hoist-non-react-statics` 导致的编译错误问题。[#16397](https://github.com/ant-design/ant-design/pull/16397) [@ztplz](https://github.com/ztplz)
- 🐞 修复自定义图标在 Notification 组件中的大小不对的问题。[#16507](https://github.com/ant-design/ant-design/pull/16507)
- 🐞 修复 PageHeader 组件当 `title` 为空时不应该渲染空白元素的问题。[#16510](https://github.com/ant-design/ant-design/pull/16510) [@yociduo](https://github.com/yociduo)
- ⚡️ 当 Modal 组件 `onOk` 回调返回的 Promise 被 Reject 的时候，打印错误。[#16437](https://github.com/ant-design/ant-design/pull/16437) [@jas0ncn](https://github.com/jas0ncn)
- TypeScript
  - ⚡️ 完善 Table 中 `column.filterDropdown` 的定义。[#16446](https://github.com/ant-design/ant-design/pull/16446)
  - ⚡️ 添加 Select 中 `maxTagTextLength` 的定义。[#16504](https://github.com/ant-design/ant-design/pull/16504) [@SylvanasGone](https://github.com/SylvanasGone)
  - ⚡️ 完善 Form 中 `getFieldError` 的返回值的定义。[#16524](https://github.com/ant-design/ant-design/pull/16524) [@vicrep](https://github.com/vicrep)
  - 🐞 修复 List 组件缺少 `style` 定义的问题。[#16485](https://github.com/ant-design/ant-design/pull/16485)

## 3.17.0

`2019-05-05`

- 🎉 Breadcrumb.Item 支持 `overlay` 属性来定义下拉菜单。[#16315](https://github.com/ant-design/ant-design/pull/16315)
- 🎉 Button 的增加了新的类型 `link`。[#16289](https://github.com/ant-design/ant-design/pull/16289)
- ⌨️ 用`ul`包裹 List.Item，以增加可访问性。[#15890](https://github.com/ant-design/ant-design/pull/15890)
- 🌟 TreeSelect 的 `showSearch` 支持多选模式。[#15933](https://github.com/ant-design/ant-design/pull/15933)
- 🌟 Upload 提供 `previewFile` 属性以自定义预览逻辑。[#15984](https://github.com/ant-design/ant-design/pull/15984)
- 🌟 添加了 `@table-selected-row-color` 变量来自定义表格选中的颜色。[#15971](https://github.com/ant-design/ant-design/pull/15971) [@hextion](https://github.com/hextion)
- 🌟 添加了 `@form-warning-input-bg` 和 `@form-error-input-bg` 变量来自定义表单错误状态时的背景颜色。[#15954](https://github.com/ant-design/ant-design/pull/15954) [@hextion](https://github.com/hextion)
- 🌟 Dropdown.Button 支持 `icon` 属性来自定义图标。[#15996](https://github.com/ant-design/ant-design/pull/15996) [@DiamondYuan](https://github.com/DiamondYuan)
- 🌟 SkeletonAvatarProps 的 `size` 属性支持传入数字。[#16128](https://github.com/ant-design/ant-design/pull/16128) [@MrHeer](https://github.com/MrHeer)
- 🌟 notification.config 现在支持 `getContainer` 来进行自定义 dom 渲染位置。[#16123](https://github.com/ant-design/ant-design/pull/16123) [@Nouzbe](https://github.com/Nouzbe)
- 🌟 Drawer 支持 `afterVisibleChange` 属性，在抽屉动画完成后触发。[#16228](https://github.com/ant-design/ant-design/pull/16228)
- 🌟 Form.Item 支持了 `htmlFor` 属性. [#16278](https://github.com/ant-design/ant-design/pull/16278)
- 🌟 Collapse 支持 `expandIconPosition` 属性。[#16365](https://github.com/ant-design/ant-design/pull/16365)
- 🌟 Carousel 支持自定义面板指示点的位置。[#16225](https://github.com/ant-design/ant-design/pull/16225) [@yociduo](https://github.com/yociduo)
- 🌟 TreeNode 支持 `checkable` 属性。[#16369](https://github.com/ant-design/ant-design/pull/16369)
- 🌟 🇭🇷 新增克罗地亚语言包。[#15641](https://github.com/ant-design/ant-design/pull/15641) [@fpintaric](https://github.com/fpintaric)
- 🐞 修复 Drawer 组件的弹出动画闪烁的问题。[#16358](https://github.com/ant-design/ant-design/pull/16358)
- 🐞 修复 Slider 的文字会换行的问题。[#15128](https://github.com/ant-design/ant-design/pull/15128)
- 🐞 修复 Checkbox.Group `onChange` 会包含已移除的值的问题。[#16392](https://github.com/ant-design/ant-design/pull/16392)
- 🐞 修正了多处 Typescript 的类型错误。[#16043](https://github.com/ant-design/ant-design/pull/16043) [#16341](https://github.com/ant-design/ant-design/pull/16341) [#16343](https://github.com/ant-design/ant-design/pull/16343) [#16360](https://github.com/ant-design/ant-design/pull/16360) [#16344](https://github.com/ant-design/ant-design/pull/16344)

## 3.16.6

`2019-04-26`

- ⌨️ 优化 PageHeader `backIcon` 的键盘可访问性。[#16038](https://github.com/ant-design/ant-design/issues/16038)
- 🇮🇹 调整意大利语文案。[#16093](https://github.com/ant-design/ant-design/pull/16093) [@yp](https://github.com/yp) [#16172](https://github.com/ant-design/ant-design/pull/16172) [@afelicioni](https://github.com/afelicioni)
- 🐞 修复 Select `showSearch` 模式下取消选择时没有触发 `onSearch` 的问题。[#16235](https://github.com/ant-design/ant-design/pull/16235)
- 🐞 修复 Select 当前选项的 hover 样式。[#16238](https://github.com/ant-design/ant-design/pull/16238) [@yociduo](https://github.com/yociduo)
- 🐞 修复 Switch 失效状态下依然有按下样式的问题。[#16251](https://github.com/ant-design/ant-design/pull/16251) [@atomoo](https://github.com/atomoo)
- 🐞 修复小号 Table 表头背景样式。[#16266](https://github.com/ant-design/ant-design/pull/16266)
- 🐞 修复 Tabs 在底部时的边框样式问题。[#16130](https://github.com/ant-design/ant-design/pull/16130) [@rinick](https://github.com/rinick)
- 🐞 修复 Typography.Title 不支持 `type` 的问题。[#16275](https://github.com/ant-design/ant-design/pull/16275)
- 🐞 修复 Typography.Paragraph 编辑模式 `className` 失效的问题。[#16307](https://github.com/ant-design/ant-design/pull/16307)
- 🐞 修复一个 List `actions` 错位问题。[#16239](https://github.com/ant-design/ant-design/pull/16239)
- 🐞 修复一个超长 Modal 标题的展现问题。[#16267](https://github.com/ant-design/ant-design/pull/16267) [@yoyo837](https://github.com/yoyo837)
- 🐞 修正 Pagination 当前项的背景色。[#16306](https://github.com/ant-design/ant-design/pull/16306)
- 🐞 修复 `core-js@<2.6.5 is no longer maintained` 的安装警告。[#16325](https://github.com/ant-design/ant-design/issues/16325)
- Typescript
  - 🐞 修复 `Form.create()` 报错。[#16242](https://github.com/ant-design/ant-design/pull/16242)
  - 🐞 修复 Tooltip `className` 的定义。[#16195](https://github.com/ant-design/ant-design/pull/16195) [@swillis12](https://github.com/swillis12)

## 3.16.5

`2019-04-22`

- 🐞 修复 Firefox 中 Table 使用 sorter 丢失线框的样式问题。[#16174](https://github.com/ant-design/ant-design/pull/16174)
- 🐞 修复 List 中设置 `pagination` 为 `null` 时报错的问题。[#16231](https://github.com/ant-design/ant-design/pull/16231)
- TypeScript
  - 🐞 修复 `allowSyntheticDefaultImports: false` 下 `hoist-non-react-statics` 报错的问题。[#16224](https://github.com/ant-design/ant-design/pull/16224)

## 3.16.4

`2019-04-21`

- 🐞 修复圆形 Button 在 `loading` 时还会响应鼠标事件的问题。[#16063](https://github.com/ant-design/ant-design/pull/16063) [@gxvv](https://github.com/gxvv)
- 🐞 修复 Form.Item 的 `labelAlign` 不生效的问题。[#16067](https://github.com/ant-design/ant-design/issues/16067)
- 🐞 修复 Spin 在 unmount 时遗留的 debounce 调用导致的报错问题。[#16081](https://github.com/ant-design/ant-design/pull/16081) [@raybooysen](https://github.com/raybooysen)
- 🐞 修复 List 的 `defaultPageSize` 不生效的问题。[#16100](https://github.com/ant-design/ant-design/issues/16100)
- 🐞 修复 PageHeader 的 `tags` 类型错误。[#16092](https://github.com/ant-design/ant-design/issues/16092)
- 🐞 修复 DatePicker 中 moment 报错的问题。[#16109](https://github.com/ant-design/ant-design/issues/16109)
- 🐞 修复 Radio 在 Firefox 上没有垂直居中的问题。[#16039](https://github.com/ant-design/ant-design/issues/16039)
- 🐞 修复 Affix 的 `target` 变化后不能工作的问题。[#16146](https://github.com/ant-design/ant-design/pull/16146)
- 🐞 修复 Modal 在首次渲染时的动画问题。[#15795](https://github.com/ant-design/ant-design/issues/15795)
- 🐞 修复 Table 的 `rowSelection.columnWidth` 不工作的问题。[#16163](https://github.com/ant-design/ant-design/issues/16163)
- 🐞 修复 Form.create 的类型定义。[#16095](https://github.com/ant-design/ant-design/issues/16095)
- 🐞 修复 Icon `aria-hidden` 的类型定义。[#16202](https://github.com/ant-design/ant-design/pull/16202)
- 🌟 新增 less 变量 `@text-selection-bg;`。[#16155](https://github.com/ant-design/ant-design/pull/16155)

## 3.16.3

`2019-04-12`

- 🐞 **修复 Button TS 类型定义。**[#15938](https://github.com/ant-design/ant-design/pull/15938)
- ⚠️ DatePicker 新增当日期不合法的提示。[#15920](https://github.com/ant-design/ant-design/pull/15920)
- 🐞 修复 Menu 箭头在老 IE 版本上不显示的问题。[#15932](https://github.com/ant-design/ant-design/pull/15932)
- 🐞 修复 Progress 当 `status` 为 `undefined` 时的展示。[#15951](https://github.com/ant-design/ant-design/pull/15951)
- 🐞 修复 Menu 折叠时 Tooltip 的问题。[#15948](https://github.com/ant-design/ant-design/pull/15948)
- 🐞 修复 Switch 应该被 Label 触发的问题。[#15923](https://github.com/ant-design/ant-design/pull/15923)
- 🐞 修复 Directory `onSelect` 无法使用的问题。[#15967](https://github.com/ant-design/ant-design/pull/15967)
- 🐞 修复 Menu `defaultOpenKeys` 不工作。[#15970](https://github.com/ant-design/ant-design/pull/15970)
- 🐞 修复内嵌的 Table `size` 为 `middle` 时的样式。[#16008](https://github.com/ant-design/ant-design/pull/16008)
- 🐞 修复 Tab `display: none` 时高亮线条丢失的问题。[#16013](https://github.com/ant-design/ant-design/pull/16013)
- 🐞 修复 Empty IE 展示的问题。[#16016](https://github.com/ant-design/ant-design/pull/16016)
- 🐞 修复通过修改 `@tree-title-height` 的值会导致 tree-switcher-loading-icon 位置不再居中的问题。[#15962](https://github.com/ant-design/ant-design/pull/15962)
- 💄 修复默认的 selection column width 无法被样式覆盖的问题。[#15990](https://github.com/ant-design/ant-design/pull/15990)
- TypeScript
  - 🐞 修复 Pagination `showLessItems` TS 类型定义。[#15952](https://github.com/ant-design/ant-design/pull/15952)

## 3.16.2

`2019-04-07`

- 🐞 修复 Menu 收缩的异常闪动。[#15868](https://github.com/ant-design/ant-design/pull/15868)
- 🐞 修复 List 分页无法改变每页条数。[#15871](https://github.com/ant-design/ant-design/pull/15871)
- 🐞 修复 RangePicker 结束时间不可输入。[#15866](https://github.com/ant-design/ant-design/pull/15866)
- 📝 站点 [Icon](https://ant.design/components/icon-cn/) 支持图标搜索。[#15867](https://github.com/ant-design/ant-design/pull/15867) [@DiamondYuan](https://github.com/DiamondYuan)
- 🐞 修复 TimePicker `locale` 属性无效的问题。[#15837](https://github.com/ant-design/ant-design/pull/15837)
- 🐞 修复 Steps 同时使用 `progressDot` 和 `size="small"` 时的样式错乱问题。[#15856](https://github.com/ant-design/ant-design/pull/15856)
- 🐞 修复 Affix 的内容高度改变时，位置不更新的问题。[#15899](https://github.com/ant-design/ant-design/pull/15899)
- Table
  - 🐞 修复 Table 使用排序时，表头设置 `align: right` 失效的问题。[#15895](https://github.com/ant-design/ant-design/pull/15895)
  - 🐞 修复 Table 筛选使用 string 以外类型的展示问题。[#15817](https://github.com/ant-design/ant-design/pull/15817)
- 🐞 修复 Badge `count` 为负数时的显示问题。[#15810](https://github.com/ant-design/ant-design/pull/15810)
- 💄 优化 `Empty.PRESENTED_IMAGE_SIMPLE` 的默认样式。[#15841](https://github.com/ant-design/ant-design/pull/15841)
- 🌟 新增 less 变量 `@html-selector` 用于支持主题前缀。[#15613](https://github.com/ant-design/ant-design/pull/15613) [@krokofant](https://github.com/krokofant)
- TypeScript
  - 🐞 修复 Table `columnGroup` 定义。[fc45d](https://github.com/ant-design/ant-design/commit/fc45d7003efab225298bbc7ac740df40d34872d1)

## 3.16.1

`2019-04-01`

- 🐞 修复 `antd.less` 丢失的问题。[#15790](https://github.com/ant-design/ant-design/issues/15790)

## 3.16.0

`2019-04-01`

- 🌟 Badge 支持自定义颜色。[#15764](https://github.com/ant-design/ant-design/pull/15764)
- 🌟 Checkbox.Group 支持 `name` 属性。[#15760](https://github.com/ant-design/ant-design/pull/15760) [@bencallaway](https://github.com/bencallaway)
- 🌟 Modal 支持通过 `confirm({ icon: null })` 隐藏图标。[#15319](https://github.com/ant-design/ant-design/pull/15319) [@Adamwu1992](https://github.com/Adamwu1992)
- Empty
  - 🌟 Empty 支持 `imageStyle` 属性。[#15487](https://github.com/ant-design/ant-design/pull/15487)
  - 🌟 Empty 支持通过 `Empty.PRESENTED_IMAGE_DEFAULT` 和 `Empty.PRESENTED_IMAGE_SIMPLE` 访问预置图片。[#15487](https://github.com/ant-design/ant-design/pull/15487)
- 🌟 Progress.Line 支持渐变色。[#15524](https://github.com/ant-design/ant-design/pull/15524) [@zy410419243](https://github.com/zy410419243)
- DatePicker
  - 🌟 更新 `rc-calendar` 依赖，允许默认值可以是空。[#520](https://github.com/react-component/calendar/pull/520)
  - 🐞 修复 DatePicker 中 disabled 和 selected 日期单元的样式。[#15608](https://github.com/ant-design/ant-design/pull/15608)
  - 🐞 修复 RangePicker 不能选择同一个月的问题。[#15427](https://github.com/ant-design/ant-design/pull/15427)
- ⚡️ 重构 Form 移动 `ant-form-item-no-colon` 样式到 Form.Item 中。[#15592](https://github.com/ant-design/ant-design/pull/15592) [@HsuanXyz](https://github.com/HsuanXyz)
- Menu
  - 🐞 修复 Menu 收缩的异常闪动。[#15625](https://github.com/ant-design/ant-design/pull/15625) [@zy410419243](https://github.com/zy410419243)
  - 🐞 修复 MenuItem 在非 `inlineCollapsed` 时显示了多余 Tooltip 的问题。[#15705](https://github.com/ant-design/ant-design/pull/15705) [@zy410419243](https://github.com/zy410419243)
- 🐞 修复 Chrome 中 Upload 边框跳动的问题。[#15636](https://github.com/ant-design/ant-design/pull/15636)
- 🐞 修复 Input 和 Input.Search 中清除按钮图标样式。[#15672](https://github.com/ant-design/ant-design/pull/15672)
- 🐞 PageHeader 支持 2 层的 `breadcrumb`。[#15689](https://github.com/ant-design/ant-design/pull/15689)
- Tag
  - 🐞 回滚 Tag 换行样式，以避免表格中切行。[#15690](https://github.com/ant-design/ant-design/pull/15690)
  - 💄 移除 Tag 动画。[#15233](https://github.com/ant-design/ant-design/pull/15233)
- 🐞 修复 Spin `indicator` 为 Icon 时的样式。[#15712](https://github.com/ant-design/ant-design/pull/15712)
- 🐞 修复可收缩 Layout.Sider 使用 svg 图标时会报错的问题。[#15720](https://github.com/ant-design/ant-design/pull/15720) [@wx1322](https://github.com/wx1322)
- 💄 移除聚焦链接的下划线样式。[#15759](https://github.com/ant-design/ant-design/pull/15759) [@Nouzbe](https://github.com/Nouzbe)
- Table
  - 💄 将 Table 排序按钮移至标题后。[#15758](https://github.com/ant-design/ant-design/pull/15758)
  - 💄 修复 Table 固定列遮挡其他组件的问题。[#15782](https://github.com/ant-design/ant-design/pull/15782)
- 🐞 修复 Col 丢失相关样式的问题。[#15766](https://github.com/ant-design/ant-design/pull/15766)
- 💄 调整 Card 和 PageHeader 样式，将 padding 从 `32px` 改成 `24px`。[#15755](https://github.com/ant-design/ant-design/pull/15755)
- 🌟 添加 less 变量
  - 🌟 Button 添加 `@btn-border-width` 和 `@btn-border-style`。[#15397](https://github.com/ant-design/ant-design/pull/15397) [@searleb](https://github.com/searleb)
  - 🌟 Modal 添加 `@modal-body-padding` 和 `@modal-footer-bg`。[#15476](https://github.com/ant-design/ant-design/pull/15476) [#15469](https://github.com/ant-design/ant-design/pull/15469) [@shumkovdenis](https://github.com/shumkovdenis)
  - 🌟 Radio 添加 `@radio-button-checked-bg`。[#15541](https://github.com/ant-design/ant-design/pull/15541) [@willc001](https://github.com/willc001)
- 🌟 调整相关 TypeScript 类型定义
  - 🐞 **修复 Button 和 `@types/react` 的定义冲突。**[#15702](https://github.com/ant-design/ant-design/pull/15702) [@ferdikoomen](https://github.com/ferdikoomen)
  - 🌟 Menu 添加 `overflowedIndicator` 定义。[#15355](https://github.com/ant-design/ant-design/pull/15459) [@Yangzhedi](https://github.com/Yangzhedi)
  - 🐞 修复 Input `action` 定义。[#15598](https://github.com/ant-design/ant-design/pull/15598) [@Yangzhedi](https://github.com/Yangzhedi)
  - 🐞 修复 Tree `onLoad` 定义。[#15718](https://github.com/ant-design/ant-design/pull/15718) [@babycannotsay](https://github.com/babycannotsay)
  - 🌟 CheckBox.Group 添加 `name` 定义。[#15753](https://github.com/ant-design/ant-design/pull/15753)
  - 🌟 RangePicker 添加 `separator` 定义。[#15765](https://github.com/ant-design/ant-design/pull/15765)

## 3.15.2

`2019-03-23`

- 📖 翻译[模式-数据展示](https://ant.design/docs/spec/data-display)和[模式-反馈](https://ant.design/docs/spec/feedback)文档到英文。[#15454](https://github.com/ant-design/ant-design/pull/15454) [@klouskingsley](https://github.com/klouskingsley) [#15460](https://github.com/ant-design/ant-design/pull/15460) [@klouskingsley](https://github.com/klouskingsley)
- 🌟 新增 less 变量 `@font-feature-settings` 和 `@select-item-selected-font-weight`。[#15506](https://github.com/ant-design/ant-design/pull/15506) [@dancerphil](https://github.com/dancerphil) [#15515](https://github.com/ant-design/ant-design/pull/15515) [@willc001](https://github.com/willc001)
- 🐞 修复 Avatar 组件在重新挂载后字符大小和长度计算错误的问题。[#15503](https://github.com/ant-design/ant-design/pull/15503)
- 🐞 修复 DatePicker 组件的宽度无法自定义的问题。[#15547](https://github.com/ant-design/ant-design/pull/15547) [@DiamondYuan](https://github.com/DiamondYuan)
- 🐞 修复 Notification 组件的 icon 样式被全局默认样式覆盖的问题。[#15530](https://github.com/ant-design/ant-design/pull/15530)
- 🐞 修复 Select 组件的空状态文本和图片没有对齐的问题。[#15570](https://github.com/ant-design/ant-design/pull/15570)
- 🐞 修复 Table 组件在加载中时空状态丢失的问题。[#15583](https://github.com/ant-design/ant-design/pull/15583)
- 🐞 修复 Tag 组件的内容长度超过屏幕宽度时不可见的问题。[#15526](https://github.com/ant-design/ant-design/pull/15526) [@Kapiroska](https://github.com/Kapiroska)
- 🐞 修复 Upload 组件对图片类型文件判断不准确的问题。[#15354](https://github.com/ant-design/ant-design/pull/15354)

## 3.15.1

`2019-03-17`

- 🌟 补充了 less 变量 `@pagination-item-bg-active`、`@icon-color`。[#15302](https://github.com/ant-design/ant-design/pull/15302) [#15345](https://github.com/ant-design/ant-design/pull/15345)
- 🐞 修复引入 PageHeader 导致 tree-shaking 失效的问题。[#15354](https://github.com/ant-design/ant-design/pull/15354)
- List
  - 🐞 修复 List 的一些样式问题。[#15328](https://github.com/ant-design/ant-design/pull/15328)
  - 🐞 保持 List 组件内容颜色与之前的版本一致。[#15301](https://github.com/ant-design/ant-design/pull/15301)
- 🐞 修复 Calendar 无法切换类型的问题。[#15338](https://github.com/ant-design/ant-design/pull/15338) [@zy410419243](https://github.com/zy410419243)
- Badge
  - 🐞 修复 Badge 组件不支持自定义颜色的问题。[#15356](https://github.com/ant-design/ant-design/pull/15356) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🐞 修复 Badge 组件内带小圆点时的高度问题。[#15395](https://github.com/ant-design/ant-design/pull/15395)
- 🐞 微调 Tabs 标签模式在浏览器放大时丢失边框的问题。[#15299](https://github.com/ant-design/ant-design/pull/15299) [@rinick](https://github.com/rinick)
- 🐞 修复 Avatar 组件设置了 `display: none` 的时候无法计算偏移量的问题。[#15351](https://github.com/ant-design/ant-design/pull/15351) [@ppbl](https://github.com/ppbl)
- 🐞 修复 Input.Password 组件的 `suffix` 失效问题。[#15381](https://github.com/ant-design/ant-design/pull/15381) [@melchior-voidwolf](https://github.com/melchior-voidwolf)
- 🐞 修复 Layout 即使在 `hasSider` 属性为 `false` 的时候依然会加 `ant-layout-has-sider` 类名的问题[#15396](https://github.com/ant-design/ant-design/pull/15396) [@SoraYama](https://github.com/SoraYama)
- 🐞 修复 Divider 在 PageHeader 组件中的对齐问题。[#15400](https://github.com/ant-design/ant-design/pull/15400)
- 🐞 修复 Menu 收缩后，SubMenu 异常渲染的问题。[#15409](https://github.com/ant-design/ant-design/pull/15409) [@zy410419243](https://github.com/zy410419243)
- 🐞 修复 Skeleton 组件的样式问题。[#15421](https://github.com/ant-design/ant-design/pull/15421) [@Maktel](https://github.com/Maktel)
- 调整了多处 Typescript 类型
  - 🌟 FormComponentProps 新增 Form 值的泛型。[#15355](https://github.com/ant-design/ant-design/pull/15355)
  - 🌟 导出 ConfigProviderProps 定义。[#15446](https://github.com/ant-design/ant-design/pull/15446) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🐞 添加 Breadcrumb.Item 的 `onClick` 定义。[#15331](https://github.com/ant-design/ant-design/pull/15331) [@tgxpuisb](https://github.com/tgxpuisb)
  - 🐞 添加 Steps.Step 组件的 `style` 定义。[#15393](https://github.com/ant-design/ant-design/pull/15393) [@pavolgolias](https://github.com/pavolgolias)
  - 🐞 修复 PaginationProps 组件 `itemRender` 函数的类型错误。[#15428](https://github.com/ant-design/ant-design/pull/15428) [@DiamondYuan](https://github.com/DiamondYuan)

## 3.15.0

`2019-03-08`

- 🌟 Tree 组件支持 `blockNode` 属性。[#14858](https://github.com/ant-design/ant-design/pull/14858) [@kimochg](https://github.com/kimochg)
- Form
  - 🌟 支持直接在 Form 上面配置 `colon` 属性。[#15276](https://github.com/ant-design/ant-design/pull/15276) [@DiamondYuan](https://github.com/DiamondYuan)
  - 🌟 支持 `labelAlign` 属性。[#15252](https://github.com/ant-design/ant-design/pull/15252) [@yoyo837](https://github.com/yoyo837)
  - 🐞 修复可能出现两个冒号的问题。[15285](https://github.com/ant-design/ant-design/pull/15285) [@jinxin0112](https://github.com/jinxin0112)
- ⚡️ 重构并简化了 List Item 的 dom 结构，并且修复了 Item 中内容空格丢失的问题。[#15210](https://github.com/ant-design/ant-design/pull/15210)
- 🐞 修复 Affix 组件定位更新的逻辑问题。[#15150](https://github.com/ant-design/ant-design/pull/15150)
- Input
  - 🐞 修复 Password 当 `visibilityToggle` 变化时丢失焦点的问题。[#15184](https://github.com/ant-design/ant-design/pull/15184)
  - 🐞 修复通过 `allowClear` 清除内容后没有获得焦点的问题。[#15184](https://github.com/ant-design/ant-design/pull/15184)
  - 🐞 修复 Search 当使用了 `allowClear` 或者 `suffix`/`prefix` 时的样式问题。[#15242](https://github.com/ant-design/ant-design/pull/15242)
  - 🐞 修复 Input 丢失焦点时的警告问题。[#15251](https://github.com/ant-design/ant-design/pull/15251)
- 🐞 修复 DatePicker 和 TimePicker 的 cursor 样式问题。[#15218](https://github.com/ant-design/ant-design/pull/15218)
- 🐞 修复 Steps 的 label 不居中的问题。[#15256](https://github.com/ant-design/ant-design/pull/15256) [@yoyo837](https://github.com/yoyo837)
- TypeScript
  - 🐞 修复 Typography 的 `setContentRef` 定义。[#15197](https://github.com/ant-design/ant-design/pull/15197)
  - 🐞 修复 Layout 的 `tagName` 定义。[#15181](https://github.com/ant-design/ant-design/pull/15181) [@ngolin](https://github.com/ngolin)
  - 🐞 修复 Text 的 `ellipsis` 定义。[#15209](https://github.com/ant-design/ant-design/pull/15209) [@xiaohuoni](https://github.com/xiaohuoni)
  - 🐞 修复 Badge 的 `text` 定义。[#15264](https://github.com/ant-design/ant-design/pull/15264)
- 🇹🇷 添加一些新组件的土耳其语翻译。[#15238](https://github.com/ant-design/ant-design/pull/15238) [@codesignist](https://github.com/codesignist)

## 3.14.1

`2019-03-04`

- 🌟 PageHeader 支持 `className` prop。[#15159](https://github.com/ant-design/ant-design/pull/15159)
- 🐞 修复 Form 输出警告信息的问题。[#15160](https://github.com/ant-design/ant-design/pull/15160)
- 🐞 修复 ConfigProvider 中 getPopupContainer 对于 DatePicker 无效的问题。[#15156](https://github.com/ant-design/ant-design/pull/15156)
- 🐞 修复 Collapse `extra` 位置错误的问题。[#15176](https://github.com/ant-design/ant-design/pull/15176)

## 3.14.0

`2019-03-02`

- 本月新增了两个组件：
  - 🔥🔥🔥 [Typography](https://ant.design/components/typography-cn/) 提供了文本的基本格式及常见操作。
  - 🔥🔥🔥 [PageHeader](https://ant.design/components/page-header-cn/) 可用于声明页面主题、展示用户所关注的页面重要信息，以及承载与当前页相关的操作项。
- 🌟 TimePicker 新增了 `clearIcon` prop，用于自定义清除图标。[#14556](https://github.com/ant-design/ant-design/pull/14556)
- 🌟 Statistic.Countdown 支持 `onFinish` prop。[#14791](https://github.com/ant-design/ant-design/pull/14791)
- 🌟 Collapse.Panel 新增了 `extra`。[62e65d](https://github.com/ant-design/ant-design/commit/62e65d955065b1862240f9f30d84de44349a0cf9)
- DatePicker
  - 🐞 修复 `name` prop 无效的问题。[#15029](https://github.com/ant-design/ant-design/pull/15029)
  - 🌟 支持 `separator` prop。[#15055](https://github.com/ant-design/ant-design/pull/15055)
- 🌟 Form 支持 `labelCol` & `wrapperCol` prop。[#15038](https://github.com/ant-design/ant-design/pull/15038)
- 🌟 Icon 增加了 `more` 的图标。[#15047](https://github.com/ant-design/ant-design/pull/15047)
- 🐞 修复 Table 筛选不支持 string 以外类型的问题。[#15046](https://github.com/ant-design/ant-design/pull/15046)
- 🐞 修复 Spin `wrapperClassName` 设置 `padding` 图标不居中的问题。[#15056](https://github.com/ant-design/ant-design/pull/15056)
- 🐞 修复 Calendar `onPanelChange` 在某些情况下不会触发的问题。[#15063](https://github.com/ant-design/ant-design/pull/15063)
- 🌟 Select 在多选模式下支持 `showArrow`。[#15091](https://github.com/ant-design/ant-design/pull/15091)
- 🐞 修复关闭抽屉时浮层阴影没有缓动消失的细节。[#15147](https://github.com/ant-design/ant-design/pull/15147)
- 🌟 增加了两个 less 变量 `@drawer-header-padding` 和 `@drawer-body-padding` 以控制 Drawer 的 padding。[#15120](https://github.com/ant-design/ant-design/pull/15120)
- 🐞 修复 Cascader 需要按 Tab 两次切换聚焦的问题。[#15117](https://github.com/ant-design/ant-design/pull/15117)
- 🐞 InputNumber 的 `onChange` 将会返回 `null` 而不是 `undefined`，以修复组件的值无法正确收集和清空的问题。[#14960](https://github.com/ant-design/ant-design/pull/14960)
- 🐞 调整了多处 TypeScript 的类型
  - 🐞 修复 `onPanelChange` TypeScript 声明缺失的问题。[#15043](https://github.com/ant-design/ant-design/pull/15043)
  - 🐞 订正了 Table `column filter` 的 TypeScript 类型问题。[#14777](https://github.com/ant-design/ant-design/issues/14777)
  - 🌟 Pagination 支持添加分页跳转按钮。[#14819](https://github.com/ant-design/ant-design/pull/14819)
  - 🐞 修复 Carousel 的 responsive prop TypeScript 声明缺失的问题。[#15071](https://github.com/ant-design/ant-design/pull/15071)

## 3.13.6

`2019-02-23`

- Form
  - 🐞 使用新的方式修复 Form.Item 在有错误提示时的布局对齐问题。[#14946](https://github.com/ant-design/ant-design/issues/14946)
  - 🐞 优化 Form.Item 自动生成 `help` 和 `validateStatus` 的警告信息。[#14911](https://github.com/ant-design/ant-design/issues/14911)
- 🐞 修复 chrome 下 Table 列头有一点额外空白的样式问题。[#14926](https://github.com/ant-design/ant-design/issues/14926)
- 🐞 修复 Select 选中图标位置偏下的问题。[#15016](https://github.com/ant-design/ant-design/issues/15016)
- 🐞 修复 Input.Search 增加 `addonBefore` 或 `addonAfter` 时的样式问题。[#14959](https://github.com/ant-design/ant-design/issues/14959)
- 🐞 修复 Tree 节点内底部边距叠加的问题。[#14958](https://github.com/ant-design/ant-design/issues/14958) [@Yangzhedi](https://github.com/Yangzhedi)
- 🐞 优化 Icon 的 `type` 为空时的可访问性问题。[#14970](https://github.com/ant-design/ant-design/issues/14970)
- 🐞 修复 Dropdown 的菜单失效样式。[#14952](https://github.com/ant-design/ant-design/issues/14952)
- 🇮🇩 优化印度尼西亚国际化文案。[#15013](https://github.com/ant-design/ant-design/issues/15013) [@kamalmahmudi](https://github.com/kamalmahmudi)

## 3.13.5

`2019-02-19`

- 🐞 回滚 FormItem 占位符以修复额外高度的问题。[#14937](https://github.com/ant-design/ant-design/pull/14937)
- 🐞 调整 Input 样式以支持 `text-align: inherit`。[#14912](https://github.com/ant-design/ant-design/pull/14912)
- 🐞 修复 Sider 在右侧收缩时，图标位置不正确的问题。[#14446](https://github.com/ant-design/ant-design/pull/14446)
- 🐞 修复 Table 在某些情况下丢失顶部边框的问题。[#14922](https://github.com/ant-design/ant-design/pull/14922)
- 🐞 修复 TypeScript 类型定义。[#14857](https://github.com/ant-design/ant-design/pull/14857) [#14903](https://github.com/ant-design/ant-design/pull/14903)

## 3.13.4

`2019-02-18`

- 🐞 修复 Table 异步加载没有数据的问题。[#14898](https://github.com/ant-design/ant-design/pull/14898)
- 🐞 修复 FormItem margin 不正确的问题。[#14886](https://github.com/ant-design/ant-design/pull/14886)

## 3.13.3

`2019-02-16`

- 🐞 修复 Upload 中隐藏上传按钮后导致上传状态一直是 `uploading` 的问题。[#14779](https://github.com/ant-design/ant-design/issues/14779)
- 🐞 修复 Switch 禁用时的鼠标样式。[#14764](https://github.com/ant-design/ant-design/issues/14764)
- 🐞 修复 Progress 显示成功状态错误的问题。[#14769](https://github.com/ant-design/ant-design/pull/14769) [@imhele](https://github.com/imhele)
- 🐞 修复垂直 Steps 的自定义图标不居中的问题。[#14677](https://github.com/ant-design/ant-design/issues/14677)
- 🐞 修复 Input.Search 不支持 `addonAfter` 的问题。[#14785](https://github.com/ant-design/ant-design/issues/14785)
- 🐞 修复 FormItem 在有错误提示时的布局问题。[#14772](https://github.com/ant-design/ant-design/issues/14772)
- 🐞 修复 Card 在 `loading` 时，操作按钮会被遮住的问题。[#14832](https://github.com/ant-design/ant-design/issues/14832)
- 🐞 修复 List 中描述溢出的问题。[#14765](https://github.com/ant-design/ant-design/pull/14765) [@Shub1427](https://github.com/ant-design/ant-design/pull/14765)
- 🐞 修复 TimePicker 在使用 `small` 大小时，清楚按钮的样式显示问题。[#14861](https://github.com/ant-design/ant-design/pull/14861) [@Yangzhedi](https://github.com/Yangzhedi)
- Table
  - 🐞 修复浮动元素错位的问题。[#14822](https://github.com/ant-design/ant-design/pull/14822) [@chiaweilee](https://github.com/ant-design/ant-design/pull/14822)
  - 🐞 修复移除 `rowSelection` 属性时，className 不同步的问题。[#14759](https://github.com/ant-design/ant-design/issues/14759)
  - 🐞 修复无数据时的边框显示问题。[#14834](https://github.com/ant-design/ant-design/issues/14834)
  - 🐞 修复 `pagination` 为 `true` 时报错的问题。
  - 🐞 修复过滤下拉框会被遮挡的问题。[#11730](https://github.com/ant-design/ant-design/issues/11730)
- TypeScript 类型
  - 🐞 修复 Checkbox 缺少的 `onClick` 类型。[#14762](https://github.com/ant-design/ant-design/pull/14762) [@Frezc](https://github.com/Frezc)
  - 🐞 修复 Menu 缺少的 `onTitleMouseEnter` 和 `onTitleMouseLeave` 类型。[#14737](https://github.com/ant-design/ant-design/pull/14737) [#GabeMedrash](https://github.com/ant-design/ant-design/pull/14737)

## 3.13.2

`2019-02-07`

- 🐞 修复 Table 异步时只有第一页能展示数据的问题。[#14724](https://github.com/ant-design/ant-design/pull/14724) [@imhele](https://github.com/imhele)
- 🐞 调整字体样式以适配旧版 IE 下的展示问题。[#14708](https://github.com/ant-design/ant-design/pull/14708) [@ashearer](https://github.com/ashearer)
- 🐞 修复 Input 值为 `null` 时，清除按钮不消失的问题。[#14733](https://github.com/ant-design/ant-design/pull/14733) [@thilo-behnke](https://github.com/thilo-behnke)

## 3.13.1

`2019-02-04`

- 📝 重新编写 [在 TypeScript 中使用](https://ant.design/docs/react/use-in-typescript-cn) 文档。[#14637](https://github.com/ant-design/ant-design/pull/14637)
- 📝 更新 [项目实战](https://ant.design/docs/react/practical-projects-cn) 文档为最新的 umi 技术栈。[#14574](https://github.com/ant-design/ant-design/pull/14574) [@cc189](https://github.com/cc189)
- 🐞 修复 Spin 组件在 IE 10 样式问题。[#14588](https://github.com/ant-design/ant-design/pull/14588) [#14365](https://github.com/ant-design/ant-design/issues/14365)
- 🐞 修复 DatePicker 组件在 `showTime` 时缺少默认格式的问题。[#14593](https://github.com/ant-design/ant-design/pull/14593)
- 🐞 修复 List 组件在 IE 11 下的样式问题。[#14602](https://github.com/ant-design/ant-design/pull/14602) [@Shub1427](https://github.com/Shub1427)
- Table
  - 🐞 修复数据总数小于等于每页数（pageSize）时的翻页问题。[#14608](https://github.com/ant-design/ant-design/pull/14608) [@sdli](https://github.com/sdli)
  - 🐞 修复表格行被包裹时的样式问题。[#14619](https://github.com/ant-design/ant-design/pull/14619) [#14316](https://github.com/ant-design/ant-design/issues/14316)
  - 🐞 修复表格为空时的 `placeholder` 边距样式问题。[#14533](https://github.com/ant-design/ant-design/pull/14533) [@yoyo837](https://github.com/yoyo837)
  - 🐞 修复同时指定 `pageSize` 和 `defaultPageSize` 时的优先级问题。[#14696](https://github.com/ant-design/ant-design/pull/14696) [#14320](https://github.com/ant-design/ant-design/issues/14320)
- Upload
  - 🐞 修复在 IE 11 下的 `fileIndex` 兼容性。[#14603](https://github.com/ant-design/ant-design/pull/14603) [@Shub1427](https://github.com/Shub1427)
  - 🐞 修复 label 触发上传的问题。[#14619](https://github.com/ant-design/ant-design/pull/14619) [#14298](https://github.com/ant-design/ant-design/issues/14298)
- 🐞 修复 Dropdown 组件因伪类层级样式导致不能点击的问题。[#14604](https://github.com/ant-design/ant-design/pull/14604) [@shawtung](https://github.com/shawtung)
- 💄 优化了 Checkbox 组件在选中状态下的对齐样式。[#14619](https://github.com/ant-design/ant-design/pull/14619) [#14271](https://github.com/ant-design/ant-design/issues/14271)
- 🐞 修复 Avatar 组件在切换 `src` 失败后，不触发加载的问题。[#14606](https://github.com/ant-design/ant-design/pull/14606) [@AhmedAlSammany](https://github.com/AhmedAlSammany)
- 🐞 修复 Modal 组件 `destroy` 代码逻辑不正确的问题。[#14600](https://github.com/ant-design/ant-design/pull/14600) [@xu-snow](https://github.com/xu-snow)
- 🐞 修复 Tooltip 组件标题内容过少时，箭头样式错位的问题。[#14667](https://github.com/ant-design/ant-design/pull/14667) [@Yangzhedi](https://github.com/Yangzhedi)
- Calendar
  - 🐞 修复 IE 9 下卡片模式年选择出现省略号的问题。[#14464](https://github.com/ant-design/ant-design/issues/14464) [#14669](https://github.com/ant-design/ant-design/pull/14669)
  - 🐞 修复年月选择框之间的边距样式。[#14636](https://github.com/ant-design/ant-design/issues/14636) [#14669](https://github.com/ant-design/ant-design/pull/14669)
- AutoComplete
  - 🐞 修复禁用时 `placeholder` 无法显示的样式问题。[#14652](https://github.com/ant-design/ant-design/pull/14652) [@tangjinzhou](https://github.com/tangjinzhou)
- 🐞 修复 Icon 组件自定义 svg Icon 丢失 viewBox 的问题。[#14686](https://github.com/ant-design/ant-design/pull/14686)
- 🐞 修复 Statistic 组件不支持负数的问题。[#14695](https://github.com/ant-design/ant-design/pull/14695) [#14692](https://github.com/ant-design/ant-design/issues/14692)
- Less
  - 🌟 设置 OpenType 数字字体等宽，减轻字体动画震颤。[56ac0](https://github.com/ant-design/ant-design/commit/56ac01610f600b3c2d62c33fa87e99156f114ccf)
  - 🐞 修复 Less 变量 `@drawer-prefix-cls` 拼写问题。[#14631](https://github.com/ant-design/ant-design/pull/14631)
  - 🐞 修复 Dropdown 的 SubMenu 动画问题。[#14703](https://github.com/ant-design/ant-design/pull/14703) [#14638](https://github.com/ant-design/ant-design/issues/14638)
- 🐞 修复 TypeScript 类型定义。[#14584](https://github.com/ant-design/ant-design/pull/14584) [@boraikizoglu](https://github.com/boraikizoglu)、[#14591](https://github.com/ant-design/ant-design/pull/14591)、[#14640](https://github.com/ant-design/ant-design/pull/14640) [@SylvanasGone](https://github.com/SylvanasGone)、[#14654](https://github.com/ant-design/ant-design/pull/14654) [@kuitos](https://github.com/kuitos)、[#12667](https://github.com/ant-design/ant-design/pull/12667) [@yueyes](https://github.com/yueyes)、[#14653](https://github.com/ant-design/ant-design/pull/14653)、[#14676](https://github.com/ant-design/ant-design/pull/14676) [@kristof0425](https://github.com/kristof0425)、[#14684](https://github.com/ant-design/ant-design/pull/14684) [@RunningCoderLee](https://github.com/RunningCoderLee)

## 3.13.0

`2019-01-26`

- 🎉 **新增 [Statistic](https://ant.design/components/statistic-cn/) 统计/倒计时组件**。[#14154](https://github.com/ant-design/ant-design/pull/14154)
- Button
  - 🌟 Button 添加圆边形状。[#14236](https://github.com/ant-design/ant-design/pull/14236)
- Collapse
  - 🌟 新增 `expandIcon` 属性，允许用户自定义 Collapse 折叠图标。[#14060](https://github.com/ant-design/ant-design/pull/14060)
- ConfigProvider
  - 🌟 支持 Content Security Policy (CSP) 配置。[#14222](https://github.com/ant-design/ant-design/pull/14222)
  - 🌟 提供 `autoInsertSpaceInButton` 属性以移除按钮中 2 个汉字时字间的空格。[#14230](https://github.com/ant-design/ant-design/pull/14230)
- DatePicker
  - 🌟 将会读取本地化格式配置作为默认日期格式。[#14340](https://github.com/ant-design/ant-design/pull/14340)
- Tabs
  - 🌟 支持自定义标签节点。[#14368](https://github.com/ant-design/ant-design/pull/14368)
- Icon
  - 🌟 Icon 组件添加 `aria-label` 属性以提升无障碍体验。[#14258](https://github.com/ant-design/ant-design/pull/14258)
  - 🌟 新增 `rotate` 属性，允许用户修改图标旋转角度。[#14060](https://github.com/ant-design/ant-design/pull/14060)
- Badge
  - 🐞 修复带 `border-color` 时改变数值报错的问题。[#14525](https://github.com/ant-design/ant-design/pull/14525)
- Modal
  - 🌟 Modal 函数组件新增 `mask` 属性支持。[#14197](https://github.com/ant-design/ant-design/pull/14197)
  - 🌟 Modal 函数组件新增 `transitionName` 和 `maskTransitionName` 属性支持。[#14273](https://github.com/ant-design/ant-design/pull/14273) [@thomasJang](https://github.com/thomasJang)
- Input
  - 🐞 修复 Input.Search 样式问题。在 `addon` 下，将 `className` 从 input 改到最顶层元素上。[#14461](https://github.com/ant-design/ant-design/pull/14461)
- TimePicker
  - 🌟 废弃 `allowEmpty` 属性，改用 `allowClear` 替代。并与 DatePicker 统一样式。[#14490](https://github.com/ant-design/ant-design/pull/14490)
- Radio
  - 🐞 修复 RadioButton 在 RadioGroup 下会触发 2 次 onChange 的问题。[#14523](https://github.com/ant-design/ant-design/pull/14523)
- Spin
  - 🐞 修复 Table 在低版本 IE 中 spinning 会遮挡操作的问题。[#14511](https://github.com/ant-design/ant-design/pull/14511)
- Switch
  - 🌟 Switch 为 `onChange`，`onClick` 添加 `event` 参数。[#14560](https://github.com/ant-design/ant-design/pull/14560)
- Table
  - 🐞 修复 Safari 中固定列样式问题。[#14550](https://github.com/ant-design/ant-design/pull/14550)
- Progress
  - 🌟 所有类型都支持 `successPercent` 属性。[#14412](https://github.com/ant-design/ant-design/pull/14412)
- Pagination
  - 🐞 修复省略号不居中的样式问题。[#14473](https://github.com/ant-design/ant-design/pull/14473) [@ranbena](https://github.com/ranbena)
- 🐞 修复水波纹在 Edge 下的样式问题。[#14469](https://github.com/ant-design/ant-design/pull/14469)

## 3.12.4

`2019-01-19`

- 🌟 更新《在 create-react-app 中使用》文档以兼容升级后的 create-react-app 和 react-scripts-rewired。[#14385](https://github.com/ant-design/ant-design/pull/14385)
- 🐞 修复在 postcss（webpack）中使用 autoprefixer 9.4.5 会抛出错误 `Replace text-decoration-skip: ink to text-decoration-skip-ink: auto, because spec had been changed` 的问题。[#14312](https://github.com/ant-design/ant-design/pull/14312)
- 🐞 修复 InputNumber 在 MenuItem 中样式不正确的问题。[#14373](https://github.com/ant-design/ant-design/pull/14373)
- 🐞 修复 Input.Search 使用 `enterButton` 时的样式问题。[#14397](https://github.com/ant-design/ant-design/pull/14397)
- 🐞 修复 Input.TextArea 中输入数字时 `autosize` 高度无法自适应的问题。[#14375](https://github.com/ant-design/ant-design/pull/14375)
- 🐞 修复 Slider focus 时的样式错误。[9202509](https://github.com/ant-design/ant-design/commit/92025095032a05b2bc347218b523ffd42f75a607)
- 🐞 修复 `prefixCls` 属性被传递到了 Empty 元素上的问题。[#14404](https://github.com/ant-design/ant-design/pull/14404)
- 🐞 修复 RadioGroup `onChange` 将覆盖 Radio `onChange` 的问题。[#14364](https://github.com/ant-design/ant-design/pull/14364)

## 3.12.3

`2019-01-13`

- 🐞 回滚 [#14157](https://github.com/ant-design/ant-design/pull/14157) 修复 Input `prefix` 和 `suffix` 丢失的问题。[#14310](https://github.com/ant-design/ant-design/issues/14310)
- 🐞 修复 Empty 的 `image` 属性的 TypeScript 定义。[#14308](https://github.com/ant-design/ant-design/issues/14308) [@chunlea](https://github.com/chunlea)

## 3.12.2

`2019-01-12`

- 🐞 修复 Anchor.Link 组件不支持 `className` 属性的问题。[#14248](https://github.com/ant-design/ant-design/pull/14248)
- 🐞 修复 Badge 组件浮点数展示错误的问题。[#14195](https://github.com/ant-design/ant-design/pull/14195) [@ztplz](https://github.com/ztplz)
- 🐞 修复 DatePicker 组件在弹层展开时依然会获取焦点的问题。[#14092](https://github.com/ant-design/ant-design/pull/14092) [@Yangzhedi](https://github.com/Yangzhedi)
- Drawer
  - 🐞 修复 Drawer 组件未设置 `title` 时显示空白头的问题。[#14264](https://github.com/ant-design/ant-design/pull/14264) [@ztplz](https://github.com/ztplz)
  - 🐞 修复 Drawer 组件不支持 `bodyStyle` 属性的问题。[#14294](https://github.com/ant-design/ant-design/pull/14294) [@ztplz](https://github.com/ztplz)
- 🐞 修复 Form 组件垂直布局时标签文本无法自动换行的问题。[#14135](https://github.com/ant-design/ant-design/pull/14135) [@ranbena](https://github.com/ranbena)
- 🐞 修复 Modal.confirm 组件在小屏幕下位置错误的问题。[#14279](https://github.com/ant-design/ant-design/issues/14279)
- Radio
  - 🐞 修复 Radio 组件在禁选和选中状态下样式不正确的问题。[#14165](https://github.com/ant-design/ant-design/issues/14165)
  - 💄 优化 Radio 组件在获取焦点时的样式。[#14186](https://github.com/ant-design/ant-design/issues/14186)
- 🐞 修复 Select 组件空数据样式缺失的问题。[#14204](https://github.com/ant-design/ant-design/issues/14204)
- 💄 简化 Spin 组件实现以优化运行性能。[#14100](https://github.com/ant-design/ant-design/issues/14100)
- Table
  - 🐞 修复 Table 组件表头列的排序 `title` 遮挡 Tooltip 的问题。[#14168](https://github.com/ant-design/ant-design/issues/14168)
  - 🐞 修复 Table 组件点击自定义筛选菜单会触发排序的问题。[#14238](https://github.com/ant-design/ant-design/issues/14238)
- 🐞 修复 Tag 组件从隐藏到可见时会调用 `afterClose` 属性函数的问题。[#14200](https://github.com/ant-design/ant-design/pull/14200) [@tangjinzhou](https://github.com/tangjinzhou)
- 🌟 新增 `@btn-shadow`、`@btn-primary-shadow` 和 `@btn-text-shadow` 样式变量。[#14172](https://github.com/ant-design/ant-design/issues/14172)
- TypeScript
  - 🐞 修复 Modal 组件的 TypeScript 类型定义缺少 `forceRender` 属性的问题。[#14160](https://github.com/ant-design/ant-design/issues/14160)
  - 🐞 修复 Table 组件的 `TypeScript` 类型定义中 `sortDirections` 属性必选的问题。[#14182](https://github.com/ant-design/ant-design/pull/14182)
  - 🐞 修复 Table 组件的 `locale` 属性的 TypeScript 类型定义错误的问题。[#14245](https://github.com/ant-design/ant-design/pull/14245) [@LeezQ](https://github.com/LeezQ)
  - 🐞 修复 List.Item 组件的 TypeScript 类型定义不支持原生 div 元素属性的问题。[#14171](https://github.com/ant-design/ant-design/issues/14171)

## 3.12.1

`2019-01-06`

- 🐞 修复引用 svg 导致的构建错误。

## 3.12.0

`2019-01-06`

- 🎉 新的组件 [Empty](https://ant.design/components/empty/)，同时优化了各个组件的空数据状态样式！[13651](https://github.com/ant-design/ant-design/pull/13651)
- 🎉 添加新的国际化资源北印度语（kn_IN）和坎那达语（kn_IN）。[#13776](https://github.com/ant-design/ant-design/pull/13759) [@gurungrahul2](https://github.com/aashutoshrathi) [#13776](https://github.com/ant-design/ant-design/pull/13776) [@gurungrahul2](https://github.com/gurungrahul2)
- 🌟 新增 Icon `eye-invisible`。[b8630b3](https://github.com/ant-design/ant-design/commit/b8630b34556e58af31f51fb42d1299725ddd8219)
- 🌟 ConfigProvider 组件添加 `prefixCls` 属性。[#13389](https://github.com/ant-design/ant-design/pull/13389)
- Less
  - 🌟 给部分组件添加更多的 Less 变量支持。[#13425](https://github.com/ant-design/ant-design/pull/13425) [@amedora](https://github.com/amedora)
  - 🐞 修复 font-family 被重置的问题。[#13969](https://github.com/ant-design/ant-design/issues/13969)
- Input
  - 🌟 添加 Input.Password 密码输入组件。[#13342](https://github.com/ant-design/ant-design/pull/13342) [@zy410419243](https://github.com/zy410419243)
  - 🌟 支持 `allowClear`。[#13939](https://github.com/ant-design/ant-design/pull/13939)
- Modal
  - 🌟 添加 `forceRender` 属性。[f791a50](https://github.com/ant-design/ant-design/commit/f791a50084eda5692635fd373bc2ec4a6b8d98e1)
  - 🌟 添加 `destroyAll` 方法。[#13409](https://github.com/ant-design/ant-design/pull/13409) [@caolvchong](https://github.com/caolvchong)
  - 🌟 Modal.confirm/info/warning/error 新增 `icon` 属性。原有的 `iconType` 废弃。[5c26635](https://github.com/ant-design/ant-design/commit/5c266355ec84d54d054ba89d35cc9280aef50a6e)
- 🌟 Card 组件添加 `small` 类型。[#13180](https://github.com/ant-design/ant-design/pull/13180) [@ndbroadbent](https://github.com/ndbroadbent)
- Form
  - 🌟 添加 `name` 选项到 `Form.create`。[83b449b](https://github.com/ant-design/ant-design/commit/83b449b1ff00afadde57d96dea457e625509786f)
  - 🌟 FormItem 支持错误提示信息为一个 reactNode。[#13046](https://github.com/ant-design/ant-design/pull/13046)
  - 🌟 Form 的 `getFieldDecorator` 方法选项添加 `preserve` 参数。[f65fb28](https://github.com/ant-design/ant-design/commit/f65fb2867f16dbcec40ba97afb8d3682dde93941)
- 🌟 Tree 添加 `switcherIcon` 属性。[#13592](https://github.com/ant-design/ant-design/pull/13592) [@nick-ChenZe](https://github.com/nick-ChenZe)
- 🌟 Mention 添加 `defaultSuggestion` 属性。[#13695](https://github.com/ant-design/ant-design/pull/13695)
- Dropdown
  - 🌟 Dropdown.Button 支持 `href` 属性。[607d080](https://github.com/ant-design/ant-design/commit/607d08094d4c59416c17d49e1ed5e87a166f61f7)
  - 🌟 添加 `openClassName` 属性。[c6f267d](https://github.com/ant-design/ant-design/commit/c6f267d740d82ffc3e4f2f2a84cd3b2cc159c595)
  - 🌟 Dropdown `overlay` 支持回调函数。[#14003](https://github.com/ant-design/ant-design/pull/14003)
- Button
  - 🐞 修复 Button 使用自定义类型抛出时的问题。[#13915](https://github.com/ant-design/ant-design/issues/13915)
  - 🐞 修复按钮中有 plus 和 minus 图标时在 Windows 下的样式问题。[#13924](https://github.com/ant-design/ant-design/issues/13924)
- Table
  - 🌟 添加属性 `sortDirections` 到 Table 和 Table.Column。[#13773](https://github.com/ant-design/ant-design/pull/13773) [@elfman](https://github.com/elfman)
  - 🐞 修复 Badge 组件遮盖 Table 固定列的问题。[#13930](https://github.com/ant-design/ant-design/issues/13930)
  - 🐞 修复行选择器列的 `columnWidth` 设置不生效的问题。[#14115](https://github.com/ant-design/ant-design/pull/14115) [@dyygtfx](https://github.com/dyygtfx)
- DatePicker
  - 🌟 DatePicker component 添加 `renderFooter` 属性。[3c007a8](https://github.com/ant-design/ant-design/commit/3c007a85dd8a670f66c7e0aed95d3537e25ef6ea)
  - 🐞 修复 WeekPicker 不支持 `dateRender` 的问题。[#13957](https://github.com/ant-design/ant-design/issues/13957)
  - 🐞 修复禁用按钮在 DatePicker 面板中的样式问题。[#14098](https://github.com/ant-design/ant-design/pull/14098)
  - 🌟 在所有模式中支持 `renderExtraFooter` 属性。[#13813](https://github.com/ant-design/ant-design/pull/13813) [@elfman](https://github.com/elfman)
  - 🐞 修复月份选择器在开始年份和结束年份相等时的显示问题。[#14049](https://github.com/ant-design/ant-design/pull/14049) [@meihuanyu](https://github.com/meihuanyu)
- TimePicker
  - 🌟 TimePicker 添加新的属性 `popupStyle` 和 `onAmPmChange`。[833c181](https://github.com/ant-design/ant-design/commit/833c18192247f265b4004afa11a054846c7ba662)
  - 🐞 修复 TimePicker 在跟 Input.Group 一起使用时图标会消失的问题。[#13797](https://github.com/ant-design/ant-design/pull/13797) [@mraiguo](https://github.com/ant-design/ant-design/pull/13797)
- 🌟 更新 `rc-tree-select` 到 2.5.0，现在 TreeSelect 组件中的 `notFoundContent` 支持传入 ReactNode。[47b89e5](https://github.com/ant-design/ant-design/commit/47b89e56fbedfa07a4c263ca390a78d58132563f)
- 🌟 组件 Rate 支持 `tooltips`。[192e188](https://github.com/ant-design/ant-design/commit/192e188fe87018ad9d004b9c2002e2b0045fa4b4)
- 🐞 修复 Drawer 的属性 `style` 不生效的问题。[#13850](https://github.com/ant-design/ant-design/issues/13850)
- Upload
  - 💄 添加新的 Less 变量 `upload-picture-card-border-style` 并修复 `upload-picture-card-size` 的拼写错误。[#13919](https://github.com/ant-design/ant-design/pull/13919) [#13929](https://github.com/ant-design/ant-design/pull/13929) [@flexchen](https://github.com/flexchen)
  - 🐞 修复在 Upload 组件中无法识别 `dpg` 后缀文件为图片的问题。[#14013](https://github.com/ant-design/ant-design/pull/14013)
- Popover
  - 🐞 修复 Popover 组件的箭头的阴影问题。[#13935](https://github.com/ant-design/ant-design/pull/13935) [@crazyurus](https://github.com/crazyurus)
  - 🐞 修复 Popover 上方的 border 在某些 IE9 下不显示的问题。[#14064](https://github.com/ant-design/ant-design/issues/14064) [@gyh9457](https://github.com/gyh9457)
- 🐞 修复 Radio 组件在 Chrome 下的样式问题。[#3699](https://github.com/ant-design/ant-design/issues/3699)
- 🐞 修复 Steps 组件在 IE9 下的样式问题。[#14001](https://github.com/ant-design/ant-design/issues/14001)
- 🐞 修复嵌套的 TimeLine 最后一条线丢失的问题。[#14108](https://github.com/ant-design/ant-design/pull/14110)
- 🐞 修复 Spin 组件初始设置 `delay` 属性后不显示的问题。[#14100](https://github.com/ant-design/ant-design/issues/14100)
- Badge
  - 🐞 修复当 `count` 是一个 ReactNode 时动画跳动的问题。[#13800](https://github.com/ant-design/ant-design/issues/13800)
- TypeScript
  - 🐞 修复 DatePicker 属性 `disabledDate` 的定义问题。[#14008](https://github.com/ant-design/ant-design/pull/14008) [@vnguyen94](https://github.com/vnguyen94)
  - 🐞 修复 Dropdown 属性的 `onVisibleChange` 的定义问题。[#13988](https://github.com/ant-design/ant-design/pull/13988) [@travikk](https://github.com/travikk)

## 3.11.6

`2018-12-25`

- 📝 移除圣诞彩蛋。 [#13098](https://github.com/ant-design/ant-design/issues/13098)

## 3.11.5

`2018-12-24`

- 🐞 修复 `lib` 下样式文件路径问题。[#13791](https://github.com/ant-design/ant-design/issues/13803)

## 3.11.4

`2018-12-23`

- 🐞 修复 `Could not find dependency: '@babel/runtime'` 的问题。[#13791](https://github.com/ant-design/ant-design/issues/13791)
- ⚡️ 重构 Tag 组件，简化代码并提升性能。[b828741](https://github.com/ant-design/ant-design/commit/b828741dc06eaa69ff3f8c76024fd5527ed6d74f)

## 3.11.3 🎅🏻

`2018-12-22`

- ⚡️ 升级内部依赖到 babel@7 和 webpack@4，并使用 prettier 格式化了所有代码。
- Table
  - 🐞 **修复 Table 列筛选菜单按钮不可点击的问题**。[#13563](https://github.com/ant-design/ant-design/issues/13563)
  - 🐞 修复 Table 列设置排序后影响列头自定义浮出组件的展现问题。[#13467](https://github.com/ant-design/ant-design/issues/13467)
  - 🐞 修复 Table 选择时在 IE9/10 下崩溃的问题。[#13540](https://github.com/ant-design/ant-design/issues/13540)
  - 🐞 修复 Table 指定 `childrenColumnName` 时，全选框无法自动勾选的问题。[#13710](https://github.com/ant-design/ant-design/issues/13710)
  - 💄 移除 Table 下英文单词断行的样式。[#13624](https://github.com/ant-design/ant-design/issues/13624)
  - 💄 优化了 Table 自定义列搜索例子的实现和 UI。[演示](https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel)
- 🐞 修复 Button 内容为 `0` 时的样式。[#13596](https://github.com/ant-design/ant-design/pull/13596) [@951565664](https://github.com/951565664)
- 💄 微调 Card 头部和加载中的样式细节。
- 💄 优化 Spin 样式并略微提升了切换状态的性能。[2c7112b](https://github.com/ant-design/ant-design/commit/2c7112be7bf32c6e8362334b86b0799cc3a4a6c4)
- 🐞 修复一个 Input.Group 使用 compact 时校验状态边框样式的问题。[#13529](https://github.com/ant-design/ant-design/issues/13529) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Menu 在 vertical 模式下的展开收起动画。[#13597](https://github.com/ant-design/ant-design/issues/13597)
- 🐞 修复 WeekPicker 的宽度样式异常。[#13629](https://github.com/ant-design/ant-design/issues/13629)
- 🐞 修复 Radio.Button 失效状态下的鼠标手势。[#13642](https://github.com/ant-design/ant-design/pull/13642) [@gianpaj](https://github.com/gianpaj)
- Dropdown
  - 🐞 修复 Chrome 下菜单弹出时有轻微移动的问题。[#12115](https://github.com/ant-design/ant-design/issues/12115) [@gurungrahul2](https://github.com/gurungrahul2)
  - 🐞 修复一个屏幕边缘的 Dropdown 菜单引起的浏览器滚动条异常出现的问题。[00564dd](https://github.com/ant-design/ant-design/commit/3aeca7c10ec6ee3441f024fe7fdb5ae9e00564dd)
- 🐞 修复 Badge 的 `count` 是自定义 ReactNode 时 `offset` 属性失效的问题。[#13694](https://github.com/ant-design/ant-design/issues/13694)
- 🐞 去掉 Form.Item 内嵌负边距，改用其他的方式实现单行多个表单项。[#13748](https://github.com/ant-design/ant-design/issues/13748)
- 📝 补充了一个 Select 选择后隐藏选项的[例子](https://ant.design/components/select-cn/#components-select-demo-hide-selected)。[#13552](https://github.com/ant-design/ant-design/pull/13552) [@SergeyVolynkin](https://github.com/SergeyVolynkin)
- 🐞 修复 Comment 的操作链接边距样式。[#13713](https://github.com/ant-design/ant-design/issues/13713)
- 🐞 修复自定义 Popover 背景色时箭头样式突兀的问题。[#13533](https://github.com/ant-design/ant-design/issues/13533) [@gurungrahul2](https://github.com/gurungrahul2)
- 🐞 修正 Drawer 的 `style` 属性到最外层容器上。[#11504](https://github.com/ant-design/ant-design/issues/11504)
- 🐞 修复一个 Affix 初始化时固定状态不正确的问题。[#13737](https://github.com/ant-design/ant-design/pull/13737) [@xuxinhang](https://github.com/xuxinhang)
- 🐞 修复 Tabs 失效页签的鼠标手型。[#13709](https://github.com/ant-design/ant-design/issues/13709)
- 🌟 补充 [Tabs](https://github.com/ant-design/ant-design/pull/13727)、[Table](https://github.com/ant-design/ant-design/pull/13754)、[Alert](https://github.com/ant-design/ant-design/pull/13768) 组件的一些样式变量。
- TypeScript
  - ⚡️ 完善 Table 的 `ColumnProps` 定义，增强对 `dataIndex` 的校验。[#13605](https://github.com/ant-design/ant-design/pull/13605) [@bondBo](https://github.com/bondBo)
  - ⚡️ 完善 Table 的 `TableRowSelection.onChange` 参数泛型定义。[#13761](https://github.com/ant-design/ant-design/issues/13761) [@hahabazinga](https://github.com/hahabazinga)
  - 🐞 修复 LocaleProvider 的 `children` 类型。[#12974](https://github.com/ant-design/ant-design/issues/12974)
  - 🐞 修复 RangePicker 的 `onOk` 的参数类型。[#13650](https://github.com/ant-design/ant-design/pull/13650) [@iugo](https://github.com/iugo)
  - 🐞 修正 Comment `author` 属性的类型为 ReactNode。[#13670](https://github.com/ant-design/ant-design/pull/13670) [@reichjustin](https://github.com/reichjustin)
  - 🐞 修复 Select `dropdownProps` 的参数定义。[#13617](https://github.com/ant-design/ant-design/pull/13617) [@SylvanasGone](https://github.com/SylvanasGone)

## 3.11.2

`2018-12-10`

- 🐞 修复 Table 使用自定义列头时报 `Cannot read property 'children' of undefined` 的问题。[#13542](https://github.com/ant-design/ant-design/issues/13542) [@geraldchen890806](https://github.com/geraldchen890806)
- 🐞 修复另一个 Input 在自定义了 less 变量 `@border-width-base` 时的边框问题。[#13534](https://github.com/ant-design/ant-design/pull/13534) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Upload 的 `beforeUpload` 方法返回 Promise 时不支持 resolve `Blob` 对象的问题。[#13528](https://github.com/ant-design/ant-design/pull/13528/) [@huanz](https://github.com/huanz)
- 🐞 修复 Dropdown 两个属性的 TypeScript 定义。[#13536](https://github.com/ant-design/ant-design/pull/13536) [@wangxingkang](https://github.com/wangxingkang)

## 3.11.1

`2018-12-08`

- 🐞 修复 Avatar 图标不能垂直居中的问题。[#13408](https://github.com/ant-design/ant-design/issues/13408)
- 🐞 修复 Input 在自定义了 less 变量 `@border-width-base` 时的边框问题。[#13413](https://github.com/ant-design/ant-design/issues/13413) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Comment 组件不能正确显示换行的问题。[#13429](https://github.com/ant-design/ant-design/issues/13429)
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
  - 🌟 增加 `dropdownRender` 属性，用于自定义下拉框内容。[#10831](https://github.com/ant-design/ant-design/issues/10831)
  - 🌟 增加 `loading` 属性，用于展示加载中状态。[#11225](https://github.com/ant-design/ant-design/issues/11225)
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
- 🐞 修复了 disabled Button 在 Popconfirm 中的不占用整个宽度的问题。[#13119](https://github.com/ant-design/ant-design/issues/13119)
- 🐞 修复了 Radio.Group 中的 Radio.Button 覆盖了 Badge 的问题。[#13132](https://github.com/ant-design/ant-design/issues/13132)
- 🐞 修复 RangePicker 在 `small` 模式不对齐的问题。[#13105](https://github.com/ant-design/ant-design/issues/13105)
- 🐞 修复 Dropdown 字体大小影响到头像的问题。[#13091](https://github.com/ant-design/ant-design/issues/13091)
- 🐞 修复 tabBarGutter 无法在垂直模式下工作的问题。[#12968](https://github.com/ant-design/ant-design/issues/12968)
- 🌟 调整了多处 TypeScript 的类型。

## 3.10.7

`2018-11-11`

- 🐞 修复一个 Button `line-height` 的笔误。[74aeace](https://github.com/ant-design/ant-design/commit/74aeaceaa88034b8cb669efb8aa3b6de41ff6f9d)

## 3.10.6

`2018-11-11`

- 🐞 回滚了 [adee2f3](https://github.com/ant-design/ant-design/commit/adee2f33294b9223bda959e6ae27b4d7dadcec49) 以修复一个链接按钮样式问题，并且换了一个方式修复 [#12978](https://github.com/ant-design/ant-design/issues/12978)。

## 3.10.5

`2018-11-09`

- 🎉 发布 [首页模板集](https://landing.ant.design)！
- 📖 发布 Ant Design [新版 Sketch 模版文件](https://github.com/ant-design/ant-design/releases/download/resource/Ant.Design.Components.Beta.3.10.5.sketch)。
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
- 🐞 修复 Transfer 组件使用 `render` 属性返回 ReactNode 时，列表项的 `title` 属性显示错误的问题。[#12399](https://github.com/ant-design/ant-design/issues/12399)
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
- TypeScript
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
- 🐞 修复 `Collapse` 组件中的 `header` 中的图标会顺时针旋转 90 度的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016)
- 🐞 修复在特定部署环境中，新旧图标会同时出现的问题。[#12016](https://github.com/ant-design/ant-design/pull/12016) [8b82f14](https://github.com/ant-design/ant-design/pull/12016/commits/8b82f143b6bd612e8ec7f1202dfd5f41127b025e)
- 🐞 修复使用 `Icon.createFromIconFontCN({...})` 方法失效并报错的问题。[#12013](https://github.com/ant-design/ant-design/pull/12013)

## 3.9.0

`2018-09-02`

在开学之际我们带来了久违的 `3.9.0` 的更新。多个重量级的新特性和大量修复，使 Ant Design 的能力显著提升。

- 🔥🔥🔥 在 `3.9.0` 版本中，我们重绘了所有的图标，新增了两大类，超过 90 个新图标，并且为每个图标增加了多种风格。为此我们重写了 Icon 组件，使用 `SVG` 替换了 `fontface` 图标，增加了多个特性，可以快速的使用新的图标和风格。![](https://gw.alipayobjects.com/zos/rmsportal/CVDHuodLwcDeyQBDoUIZ.png)
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
- 🐞 修复了在 Input.Group 的 `compact` 模式下设置第二个 Input 的前后缀会造成右边框消失的问题。[#11965](https://github.com/ant-design/ant-design/pull/11965)
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
  - 🐞 修复 Drawer 组件不兼容 IE10 和 IE9 的问题。[#11583](https://github.com/ant-design/ant-design/issues/11583)
  - 🐞 修复 Drawer 组件在移动设备上无法垂直滚动的问题。[#11443](https://github.com/ant-design/ant-design/issues/11443)
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
- 💄 添加点击动画效果到组件 Switch，Radio.Button 和 Tag。[9cf6ae6](https://github.com/ant-design/ant-design/commit/9cf6ae601010acbf665d575d34c0cc0918e604e7)
- TypeScript
  - 🐞 修复 Collapse 组件缺少的 `destroyInactivePanel` 定义。[#11646](https://github.com/ant-design/ant-design/pull/11646) [@zheeeng](https://github.com/zheeeng)
  - 💄 修复 AutoComplete 没有 `getPopupContainer` 属性定义的问题。[#11690](https://github.com/ant-design/ant-design/pull/11690) [@Huanghuiying0624](https://github.com/Huanghuiying0624)
  - 🐞 修复 Upload 组件的 `lastModifiedDate` 定义。[#11709](https://github.com/ant-design/ant-design/pull/11709) [@andycall](https://github.com/andycall)
- 💄 使用新的 React 生命周期函数，包括组件 Upload，CheckboxGroup，Layout.Sider，Tooltip，Popconfirm。[#11666](https://github.com/ant-design/ant-design/pull/11666) [@dancerphil](https://github.com/dancerphil) [#11682](https://github.com/ant-design/ant-design/pull/11682) [@dancerphil](https://github.com/dancerphil)

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
- 🐞 修复锚点链接组件 href 改变不更新的问题。[#11287](https://github.com/ant-design/ant-design/pull/11287/files) [@tangjinzhou](https://github.com/tangjinzhou)
- 🐞 修复 Menu 样式细节问题。[#11299](https://github.com/ant-design/ant-design/issues/11299)
- 🐞 修复 Drawer 组件设置 `destroyOnClose` 后关闭动画消失。[#11307](https://github.com/ant-design/ant-design/issues/11307)
- 🐞 修复 DirectoryTree 在 `expandedKeys` 属性可控时点击无法展开的问题。[#11366](https://github.com/ant-design/ant-design/issues/11366)
- 🐞 修复 ButtonGroup 中使用 Tooltip 的 Button 在 `disabled` 时样式不正确的问题。[11321](https://github.com/ant-design/ant-design/pull/11321) [@tangjinzhou](https://github.com/tangjinzhou)

## 3.7.0

3.7.0 是一个重磅更新，带来了很多激动人心的变化和新特性。以下是一些亮点 ✨：

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
- Dropdown 增加新特性，可以做为右键菜单来使用。
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
- 🌟 Cascader 新增 fieldNames 并废弃拼写错误的 filedNames。[#10896](https://github.com/ant-design/ant-design/issues/10896)
- 🐞 修复时间轴不能与`Tooltip`一起使用的问题。[0e3b67e](https://github.com/ant-design/ant-design/commit/0e3b67e9999d867cc304f3be61a8a042a2ab92ee)
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

- 🌟 `Form` 表单错误信息展示支持传入 ReactNode。[#10136](https://github.com/ant-design/ant-design/issues/10136) [@lovekonakona](https://github.com/lovekonakona)
- 🌟 `List` 组件支持指定分页器的位置。[#10581](https://github.com/ant-design/ant-design/pull/10581) [@zheeeng](https://github.com/zheeeng)
- 🌟 `Layout.Sider` 支持 dark/light 主题定制。[#10142](https://github.com/ant-design/ant-design/issues/10142) [@pd4d10](https://github.com/pd4d10)
- 🌟 支持 Ant Design 站点的离线模式。[#10625](https://github.com/ant-design/ant-design/issues/10625)
- 🌟 `Transfer` 新增 `style` 以及 `operationStyle` 属性配置样式。[@eduludi](https://github.com/eduludi)
- 🌟 `Message` 增加 promise 化的回调接口。[#10421](https://github.com/ant-design/ant-design/issues/10421) [@zhujinxuan](https://github.com/zhujinxuan)
- 🐞 修复编译时 TypeScript v2.9.1 兼容性问题。[#10729](https://github.com/ant-design/ant-design/issues/10729) [@karol-majewski](https://github.com/karol-majewski)
- 🐞 修复 `Menu` 嵌套超过两层时选中最里层后对应最外层没有亮起问题。[#8666](https://github.com/ant-design/ant-design/issues/8666) [@stonehank](https://github.com/stonehank)
- 🐞 修复 `Affix` 组件 offsetBottom 无效问题。[#10674](https://github.com/ant-design/ant-design/issues/10674)

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
- 💄 主站主题切换 修改为 `antd-theme-generator` ，感谢 [@mzohaibqc](https://github.com/mzohaibqc) 的工作.
- TypeScript
  - 🐞 修复了 `Row` 中 gutter 属性的类型问题 [b7d508e](https://github.com/ant-design/ant-design/commit/b7d508e1662bf20a0cacbe6440a2ce31a65a8a59)
  - 💄 改进了 `Form` 组件类型 [#10564](https://github.com/ant-design/ant-design/pull/10564)
  - 💄 改进了 `Button` 和 `Tag` 类型 [1ed9fed](https://github.com/ant-design/ant-design/commit/1ed9fed2cf1c99b947359fafb101b2e58213cb48)

## 3.5.2

`2018-05-13`

- 🐞 修复 `Table` 过滤器和 `Transfer` 复选框无法点击的问题。[#10452](https://github.com/ant-design/ant-design/issues/10452)
- 🐞 修复 `Cascader` 的 `displayRender` 里的链接无法点击的问题。[#10433](https://github.com/ant-design/ant-design/issues/10433)
- 🐞 修复 `Button` ref 不兼容问题。[#10405](https://github.com/ant-design/ant-design/issues/10405)
- 🐞 修复 `Form` 表单项校验位置高度时出现抖动问题。[#10445](https://github.com/ant-design/ant-design/issues/10445)
- 🌟 设置 `Layout` 宽度时，允许使用任何的 CSS 单位。[#10479](https://github.com/ant-design/ant-design/pull/10479)

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
- 🌟 组件 `Notification` 支持通过 key 更新通知属性。[react-component/notification#40](https://github.com/react-component/notification/pull/40) [@yevhen-hryhorevskyi](https://github.com/yevhen-hryhorevskyi)
- 🌟 组件 `List` 支持内置的翻页功能。[#10135](https://github.com/ant-design/ant-design/pull/10135)
- Table
  - 🌟 新增 `sortOrder` 参数传递给列配置中的 `sorter` 方法。[#10306](https://github.com/ant-design/ant-design/pull/10306) [@kumarashwin](https://github.com/kumarashwin)
  - 🐞 修复头部单元格的边框样式问题。[#10359](https://github.com/ant-design/ant-design/issues/10359)
  - 🐞 修复当数据变化时用户选择项丢失的问题。[#10332](https://github.com/ant-design/ant-design/pull/10332) [@chrvadala](https://github.com/chrvadala)
- `Menu` 升级 `rc-menu` 到 `7.x` [#10305](https://github.com/ant-design/ant-design/pull/10305)
  - 🌟 更好的 aria-\* 属性支持。[react-component/menu#137](https://github.com/react-component/menu/pull/137)
  - 🌟 一些内部优化提升组件性能。[react-component/menu#133](https://github.com/react-component/menu/pull/133)
  - 🌟 支持将属性传递到菜单项中。[react-component/menu#135](https://github.com/react-component/menu/pull/135)
  - 🐞 修复一些快捷键的问题。[react-component/menu#132](https://github.com/react-component/menu/pull/132)
- Collapse
  - 🌟 更新 `rc-collapse` 到 1.9.0 优化键盘支持。[react-component/collapse#84](https://github.com/react-component/collapse/pull/84/) [@kossel](https://github.com/kossel)
  - 🌟 支持通过 less 定义组件 `Collapse` 的样式。[#9943](https://github.com/ant-design/ant-design/pull/9943) [@davidhatten](https://github.com/davidhatten)
- Select
  - 🐞 修复 `placeholder` 的 ts 类型问题。[#10282](https://github.com/ant-design/ant-design/pull/10282) [@thomasthiebaud](https://github.com/thomasthiebaud)
  - 🐞 修复不显示箭头时多余的空白。[#10296](https://github.com/ant-design/ant-design/pull/10296)
  - 🐞 修复属性 `value` 的 TypeScript 类型错误。[#10336](https://github.com/ant-design/ant-design/pull/10336) [@paranoidjk](https://github.com/paranoidjk)
- Input
  - 🐞 修复 `Input.Search` 当 disabled 为 true 时按钮没有被禁用的问题。[#10040](https://github.com/ant-design/ant-design/issues/10040)
  - 🐞 修复 `Input.Group` 在表单中对齐的问题。[#10281](https://github.com/ant-design/ant-design/issues/10281)
- Form
  - 🐞 修复 `Form.onValuesChange` 的 ts 类型错误。[#10231](https://github.com/ant-design/ant-design/pull/10231) [@whtsky](https://github.com/whtsky)
  - 🐞 修复 `ComponentDecorator` TypeScript 定义的错误。[#10324](https://github.com/ant-design/ant-design/pull/10324) [@paranoidjk](https://github.com/paranoidjk)
- 🐞 修复 `Divider` 为 dashed 时的样式问题。[#10216](https://github.com/ant-design/ant-design/issues/10216)
- 🐞 修复 `Spin` 覆盖层的展示问题。[#10227](https://github.com/ant-design/ant-design/issues/10227)
- 🐞 修复 `Notification` 鼠标 hover 是图标的颜色问题。[#10272](https://github.com/ant-design/ant-design/issues/10272)
- 🐞 修复 `Upload` 组件属性 `lastModifiedDate` 的拼写错误。[#10315](https://github.com/ant-design/ant-design/pull/10315) [@danielg2002](https://github.com/danielg2002)
- 🐞 修复 `Button` 的属性类型，使用 `React.HTMLProps`。[#10229](https://github.com/ant-design/ant-design/pull/10229) [@whtsky](https://github.com/whtsky)
- 🐞 修复 less 命名约定不一致的问题。[#10275](https://github.com/ant-design/ant-design/issues/10275)

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
  - 🌟 优化了 TreeNode 设置 `disabled` 时的勾选逻辑。
- 🌟 Anchor 新增 `getContainer` 用于指定内容滚动的容器。
- 🌟 Table 新增 less 变量 `@table-expanded-row-bg`。[#9789](https://github.com/ant-design/ant-design/pull/9789)
- 🐞 修复一处 less 语法错误。[#9832](https://github.com/ant-design/ant-design/pull/9832) [@jojoLockLock](https://github.com/jojoLockLock)
- 🐞 修复 LocaleProvider 中 moment.locale 调用报错的问题。[#9853](https://github.com/ant-design/ant-design/pull/9853)
- 🐞 修复 WeekPicker 的 style 属性不生效的问题。[#9848](https://github.com/ant-design/ant-design/issues/9848)
- 🐞 修复 Layout.Sider 的 TypeScript 定义。[#9885](https://github.com/ant-design/ant-design/pull/9885) [@zachguo](https://github.com/zachguo)
- 💄 优化了 Modal 中超长内容的显示。[#9592](https://github.com/ant-design/ant-design/pull/9592)
- 🌟 新增斯洛维尼亚语。

## 3.3.3

`2018-03-25`

- 回退上个版本 Upload 中 `file` 类型的修改。

## 3.3.2

`2018-03-24`

- 🐞 `Carousel`: 升级 `react-slick` 版本以修复宽度计算错误。[#3659](https://github.com/ant-design/ant-design/issues/3659)
- 💄 `Rate`: 调整 `disabled` 样式。[#9747](https://github.com/ant-design/ant-design/issues/9747)
- 💄 `Modal`: 调整 `confirm-modal` 样式以修复 content 内使用栅格会错位的问题。[#9374](https://github.com/ant-design/ant-design/issues/9374)
- 💄 `Menu`: 调整样式以修复鼠标事件范围。[#9666](https://github.com/ant-design/ant-design/pull/9666) [@dgeibi](https://github.com/dgeibi)
- 🐞 `Upload`: 修复 `beforeUpload` 的 `file` 类型错误。[#9775](https://github.com/ant-design/ant-design/issues/9775)
- 🐞 `Button`: 修复文本改变时，空格插入没有重新计算 [4502ad8](https://github.com/ant-design/ant-design/commit/4502ad8376e536c450fa4f27d2a5855be5a153e7)

## 3.3.1

`2018-03-18`

- 💄 调整 danger Button 的 `focus` 样式。
- 🐞 修复 enterButton 的值为 button 元素时显示错误的问题。[#9639](https://github.com/ant-design/ant-design/issues/9639)
- 🐞 修复 Table 中的 `column.title` 的缺少 key 的问题。[#9658](https://github.com/ant-design/ant-design/issues/9658) [@terence55](https://github.com/terence55)
- 🐞 修复 `scroll: { x: true }` 在 `.ant-table-scroll table`宽度为 `auto`的情况下不工作的问题。[#9704](https://github.com/ant-design/ant-design/pull/9704)
- 🐞 修复表单校验文字消失的时候输入框会抖一下的问题。[#8831](https://github.com/ant-design/ant-design/issues/8831)
- 🐞 修复 `TimePicker` 里的 isMoment 调用在 parcel 里会报错的问题。[85c78e4](https://github.com/ant-design/ant-design/commit/85c78e49a91737c2841dc42621db21ca248b62b4)
- 💄 调整 Table 的圆角样式。[#9674](https://github.com/ant-design/ant-design/pull/9674)

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

- 🐞 修复组件 `Select` 中的 `onPopupScroll` 属性的 ts 定义。[#9475](https://github.com/ant-design/ant-design/pull/9475) [@twobin](https://github.com/twobin)
- 🐞 修复 `Table` 过滤条件下拉选择框的问题。[#9209](https://github.com/ant-design/ant-design/issues/9209)
- 🐞 修复 `Timeline` 自定义头部样式在 Chrome 下的显示问题。[#9429](https://github.com/ant-design/ant-design/pull/9429) [@vthinkxie](https://github.com/vthinkxie)
- 🐞 修复 `Select` 下拉窗口的边框显示问题。[82092c1](https://github.com/ant-design/ant-design/commit/82092c154ac1fa7ff2f89e1adbdf0aaf22e3ff53)
- 🐞 修复对 less 3 的兼容性问题。[#7850](https://github.com/ant-design/ant-design/issues/7850)
- 🐞 修复 `DatePicker.WeekPicker` 年份问题。[#9463](https://github.com/ant-design/ant-design/issues/9463)
- 🐞 修复 `Button.Group` 在 Chrome 下的定位对齐问题。[#9457](https://github.com/ant-design/ant-design/issues/9457)

## 3.2.2

`2018-02-24`

- 🌟 添加 `Pagination` 字体变量。[#9351](https://github.com/ant-design/ant-design/issues/9351)
- 🌟 添加 `Badge` 字重变量。[#9352](https://github.com/ant-design/ant-design/issues/9352)
- 🐞 修复 `Table` 当自定义 `loading.indicator` 时，不显示 emptyText。[#9355](https://github.com/ant-design/ant-design/issues/9355)
- 🐞 修复 `Form.create` 。[#9331](https://github.com/ant-design/ant-design/issues/9331)
- 🐞 回滚 `Table` 中 `column.dataIndex` 的 TypeScript 定义。[#9393](https://github.com/ant-design/ant-design/issues/9393)
- 🐞 修复 `Layout` 中 sider 高度不足时，最后一个菜单无法显示。[#9398](https://github.com/ant-design/ant-design/issues/9398) [@MJ111](https://github.com/MJ111)
- 🐞 修复 `Badge` dot 模式问题。[#9359](https://github.com/ant-design/ant-design/issues/9359) [@khayalan-mathew](https://github.com/khayalan-mathew)

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
- 🌟 改进 Table 的 `rowSelection[getCheckboxProps]` 属性，现在可以传任意属性给 checkbox 了。[#9054](https://github.com/ant-design/ant-design/pull/9054) [@mgrdevport](https://github.com/ant-design/ant-design/pull/9054)
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
- 🌟 新增了 Slider 以及 Menu 的 less 变量，更加方便的修改主题。[pull/9065](https://github.com/ant-design/ant-design/pull/9065) [pull/9115](https://github.com/ant-design/ant-design/pull/9115) [@mrgeorgegray](https://github.com/mrgeorgegray)

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
- 🐞 修复 Input 中输入数字时字体会发生变化的问题。[#8636](https://github.com/ant-design/ant-design/issues/8636)
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

新年快乐！~ 2018 年了，00 后都成年了！少年赶紧提个 PR 给我们吧！~

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

- 移除 Card 无用 DOM wrapper，以和 2.x 保持一致。
- 修复 `antd/lib/style/v2-compatible-reset.css` 缺失问题。[28d13e2](https://github.com/ant-design/ant-design/commit/28d13e2539817f87b8a2029ea22d9c30b377167f)
- 修复 Affix 比浏览器可见区域还高时被截断的问题。[31a0654](https://github.com/ant-design/ant-design/commit/31a0654ef990eb7bae2b18095fa0d5230b9be1da)
- 修复 Collapse 展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
- 修复 Form 内大尺寸 Input、Button 的对齐问题。[#8459](https://github.com/ant-design/ant-design/issues/8459)
- Menu
  - 修复弹层在 Safari 下消失的问题。[#8453](https://github.com/ant-design/ant-design/issues/8453)
  - 修复展开动画。[edd592c](https://github.com/ant-design/ant-design/commit/edd592cb9dd79d534853e7a0c1b648382e3f1a12)
- 修复 Notification 样式编译错误。[#8437](https://github.com/ant-design/ant-design/issues/8437)
- 修复迷你 Pagination 的背景色问题。[e13c6d8](https://github.com/ant-design/ant-design/commit/e13c6d87fa6bf7d5cf4b2d5154a85b4793997de5)
- Table
  - 修复在移动端样式错乱的问题。[#8465](https://github.com/ant-design/ant-design/issues/8465)
  - 修复嵌套表格与 size 属性共用时的样式问题。[#8525](https://github.com/ant-design/ant-design/issues/8525)
- TypeScript
  - 修复 AutoComplete 的 TypeScript 定义。[#8383](https://github.com/ant-design/ant-design/pull/8383) [@nidhi-ag](https://github.com/nidhi-ag)
  - 修复 Divider 的 TypeScript 定义。[#8504](https://github.com/ant-design/ant-design/pull/8504) [@cyyyu](https://github.com/cyyyu)
  - 修复 Dropdown 的 TypeScript 定义。[#8444](https://github.com/ant-design/ant-design/issues/8444)
  - 修复 List 的 TypeScript 定义。[e27061e](https://github.com/ant-design/ant-design/commit/e27061ea5b2f2d3273b45862d9b87285448f0998) [1b2a955](https://github.com/ant-design/ant-design/commit/1b2a9550d9595dd2f31f79d1bdd52695ec792692)
  - 修复 Table 的 TypeScript 定义。[#8507](https://github.com/ant-design/ant-design/issues/8507) [#8515](https://github.com/ant-design/ant-design/pull/8515) [@danedavid](https://github.com/danedavid)

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

### ⚠️ 升级必读

- 如果你从 2.x 升级到 3.x，建议直接升级到 3.x 的最新版本。
- 3.x 后续的版本可能已经废弃了一些下面没有提到的改动，请参考控制台的警告提示相应升级。
- 建议同时升级 React 到 16 或更新版本，以获得更好的性能和更完善的支持，升级方式见 [官方发布文档](https://reactjs.org/blog/2017/09/26/react-v16.0.html#upgrading)。
- 最后请参照下面的不兼容改动进行升级。

### 不兼容改动

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
  import 'antd/es/style/v2-compatible-reset';
  ```

  或者在 less 里引入

  ```less
  @import '~antd/es/style/v2-compatible-reset.less';
  ```

- 由于默认语言改为英文，如果你需要显示中文，现在需要配置 `LocalProvider`。

  ```javascript
  import { LocaleProvider } from 'antd';
  import zhCN from 'antd/es/locale/zh_CN';

  ReactDOM.render(
    <LocaleProvider locale={zhCN}>
      <YourApp />
    </LocaleProvider>,
    document.getElementById('root'),
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

- 🗑 移除了 DatePicker.Calendar，请直接使用 Calendar 组件。
- 🗑 移除了 DatePicker 的 `toggleOpen` 属性，请使用 `onOpenChange` 代替。
- 🗑 移除了 Form 的 `inline`、`horizontal`、`vertical` 属性，请使用 `layout` 代替。
- 🗑 移除了 Select 的 `multiple`、`tags`、`combobox` 属性，请使用 `mode` 代替。
- 🗑 移除了 Input 对 `type='textarea'` 的支持，请直接使用 `Input.TextArea` 组件。
- 🗑 移除了 Mention 的 `toEditorState` 方法，请使用 `toContentState` 代替。

### 新增功能及改进

- 🌟 Tabs 新增 `size="large"`。
- 🌟 Row 的 `gutter` 属性新增响应式断点的支持，可以使用诸如 `gutter={{ sm: 16, lg: 32 }}` 的设置。
- 🌟 Spin 新增 `indicator` 属性，用于设置自定义的加载指示符。[#7977](https://github.com/ant-design/ant-design/pull/7977) [@kossel](https://github.com/ant-design/ant-design/pull/7977)
- 🌟 Input.Search 新增 `enterButton` 用于设置自定义的搜索图标。[#7596](https://github.com/ant-design/ant-design/issues/7596)
- 🌟 Mention 新增 `placement`，用于设置下拉框的弹出方向。
- 🌟 Carousel 新增 `next()`、`prev()`、`goTo(slideNumber)` 方法，用于控制面板展示。
- 🌟 Button 新增链接支持，当提供 `href` 时会自动渲染为 `<a>`。[#8343](https://github.com/ant-design/ant-design/pull/8343)
- 🌟 Steps 进行了重构，首次渲染的时候不会再闪烁。[#6010](https://github.com/ant-design/ant-design/issues/6010)
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

    <Table components={components} columns={columns} data={data} />;
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
  - 🌟 默认和多选模式下 Option 的值允许使用 number。
  - 🌟 新增 `maxTagCount` 和 `maxTagPlaceholder`，用于设置最多可显示的选中项。
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
