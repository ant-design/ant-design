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

如果需要查看 `2.0.0` 之前的更新日志，请移步 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md)。

---

## 2.10.1

`2017-05-14`

- 升级 normalize.css 到 7.0.0。
- 修复 AutoComplete 在 Input.Group 里的样式问题。[#6058](https://github.com/ant-design/ant-design/issues/6058)
- 修复 Tabs 在 `card` 和 `editable-card` 模式下不能设置动画的问题。[#6070](https://github.com/ant-design/ant-design/issues/6070)
- 修复 Form 在屏幕缩放时的样式问题。[#6097](https://github.com/ant-design/ant-design/issues/6097)
- 修复 RangePicker 在 Safari 和 360 浏览器下的 placeholder 显示错位的问题。[#6061](https://github.com/ant-design/ant-design/issues/6061)
- Notification
  - 修复设置 `getContainer` 无效的问题。[#6099](https://github.com/ant-design/ant-design/pull/6099) [@hardfist](https://github.com/hardfist)
  - 修复会出现重叠的问题。[#5895](https://github.com/ant-design/ant-design/issues/5895) [@ystarlongzi](https://github.com/ystarlongzi)
- 新增 `fork` 图标。
- 新增 less 变量 [#6039](https://github.com/ant-design/ant-design/pull/6039) [#6038](https://github.com/ant-design/ant-design/pull/6038) [#6105](https://github.com/ant-design/ant-design/issues/6105) [#6040](https://github.com/ant-design/ant-design/pull/6040)

## 2.10.0

`2017-05-02`

- LocaleProvider
  - 新增繁体中文。[#5665](https://github.com/ant-design/ant-design/pull/5665) [@GeorgioWan](https://github.com/GeorgioWan)
  - 新增芬兰语。[#5699](https://github.com/ant-design/ant-design/pull/5699) [@kirbo](https://github.com/kirbo)
  - 新增越南语。[#5927](https://github.com/ant-design/ant-design/pull/5927) [@pnghai](https://github.com/pnghai)
  - 更新西班牙语。[#5932](https://github.com/ant-design/ant-design/pull/5932) [@ginodeise](https://github.com/ginodeis)
- AutoComplete 新增 `onSearch` 以监听搜索事件。
- Checkbox.Group 可以内嵌 Checkbox，以支持更灵活的布局。[demo](http://ant.design/components/checkbox-cn/#components-checkbox-demo-layout)
- Notification 现在可以自定义弹出框的样式和 className。[#5893](https://github.com/ant-design/ant-design/issues/5893) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- TimePicker 的展开状态可以通过受控属性 `open` 控制。[#5913](https://github.com/ant-design/ant-design/pull/5913)
- Upload[onRemove] 可以返回一个 promise 以异步控制移除逻辑。[#5973](https://github.com/ant-design/ant-design/issues/5973) [@shlice](https://github.com/shlice)
- 调整 Dropdown 弹出层的边距。[#5088](https://github.com/ant-design/ant-design/issues/5088)
- AutoComplete
  - 修复 dataSource 为 `Object[]` 时行为与 `String[]` 不一致的问题。[#5860](https://github.com/ant-design/ant-design/issues/5860)
  - 修复在 Form 内使用时，错误样式显示错误的问题。[#5834](https://github.com/ant-design/ant-design/issues/5834) [@kossel](https://github.com/kossel)
- 修复 Button 内嵌 Icon 后，两个汉字之间会插入空格的问题。[#5977](https://github.com/ant-design/ant-design/issues/5977)
- 修复 Card[title] 内使用 Cascader 导致样式错乱的问题。[#5952](https://github.com/ant-design/ant-design/issues/5952)
- 修复 Checkbox Radio 禁用后的 cursor 样式问题。[#5935](https://github.com/ant-design/ant-design/issues/5935)
- 修复 DatePicker 内嵌的 TimePicker 使用 `use12Hours` 后样式错误的问题。[#5959](https://github.com/ant-design/ant-design/issues/5959)
- 修复 Input.Group 内嵌 AutoComplete Cascader Mention TimePicker 时的样式问题。[#5832](https://github.com/ant-design/ant-design/issues/5832)
- 修复 Menu 的 TypeScript 定义缺少 `inlineIndent` 的问题。[#5903](https://github.com/ant-design/ant-design/pull/5903) [@brookshi](https://github.com/brooksh)
- Mention
  - 修复不支持 readOnly 和 disabled 的问题。[#5175](https://github.com/ant-design/ant-design/issues/5175)
  - 修复受控模式。[#5788](https://github.com/ant-design/ant-design/issues/5788)
- 修复 RangePicker 与 Form 一起使用时会报错的问题。[#5872](https://github.com/ant-design/ant-design/issues/5872)
- 修复 loading 状态 Table 的分页能点击的问题。[#5937](https://github.com/ant-design/ant-design/issues/5937)
- Tabs
  - 修复内嵌 Table 或者表单控件时布局错乱的问题。[#5953](https://github.com/ant-design/ant-design/issues/5953)
  - 修复 `2.9.2` 引入的垂直布局样式错乱的问题。[#5877](https://github.com/ant-design/ant-design/issues/5877)
- Transfer
  - 修复搜索结果无法正常显示的问题。[#5631](https://github.com/ant-design/ant-design/issues/5631)
  - 修复搜索模式下全选和反选的逻辑。[#5993](https://github.com/ant-design/ant-design/issues/5993)

## 2.9.3

`2017-04-24`

- **notification** 修复了不能在默认的 4.5s 后关闭的问题。[#5869](https://github.com/ant-design/ant-design/issues/5869)
- **Tabs** 增加了 `ink-bar` 宽度渐变动效。[#5858](https://github.com/ant-design/ant-design/pull/5858) [@hlehmann](https://github.com/hlehmann)

## 2.9.2

`2017-04-22`

- **Alert** 修复 banner 型属性无法覆盖的问题。[#5800](https://github.com/ant-design/ant-design/issues/5800)
- **AutoComplete** 修复自定义输入组件无法监听 `onKeyDown` 事件的问题。[#5487](https://github.com/ant-design/ant-design/issues/5487)
- **Button** 危险按钮使用新的样式。[#5815](https://github.com/ant-design/ant-design/pull/5815)
- **DatePicker**
  - 优化了 RangePicker 的体验，rc-calendar 升级至 `~8.0.0`。[#4985](https://github.com/ant-design/ant-design/issues/4985)
  - 修复了 RangePicker 自定义高度后文字不能上下居中的问题。[pull/5718](https://github.com/ant-design/ant-design/pull/5718) [@leadream](https://github.com/leadream)
- **Form** 增加样式变量来控制表单项标题冒号的展示。[pull/5855](https://github.com/ant-design/ant-design/pull/5855) [@megawac](https://github.com/megawac)
- **Icon** 增加 displayName 属性。[pull/5643](https://github.com/ant-design/ant-design/pull/5643) [@handycode](https://github.com/handycode)
- **Input**
  - 修复了 Input.Search 在 Input.Group 下的样式问题。[#5743](https://github.com/ant-design/ant-design/issues/5743)
  - 修复了 AutoComplete 在 Input.Group 下的样式问题。[#5832](https://github.com/ant-design/ant-design/issues/5832)
  - 修复了 Select 在 Input.Group 下的 size 问题。[#5754](https://github.com/ant-design/ant-design/issues/5754)
  - 调整了 suffix 的颜色。[pull/5820](https://github.com/ant-design/ant-design/pull/5820) [@megawac](https://github.com/megawac)
- **InputNumber** 更新了 `parser` 和 `formatter` 配合使用的文档及示例。[#5683](https://github.com/ant-design/ant-design/issues/5683)
- **Layout**
  - 增加了[固定侧边栏](https://ant.design/components/layout/#components-layout-demo-fixed-sider)示例。
  - 修复 firefox 下响应式侧边栏的样式问题。[#5613](https://github.com/ant-design/ant-design/issues/5613)
- **LocaleProvider** 自动引入样式变量以便自定义。[#5712](https://github.com/ant-design/ant-design/issues/5712) [@lionkeng](https://github.com/lionkeng)
- **Menu** 去掉 Menu 组件中 a 标签默认的 focus 下划线样式。[#5707](https://github.com/ant-design/ant-design/issues/5707)
- **Notification** 样式自适应单行文案。[#5846](https://github.com/ant-design/ant-design/issues/5846)
- **Radio** 新增 Radio.Button 颜色及背景色样式变量。[pull/5791](https://github.com/ant-design/ant-design/pull/5791) [@megawac](https://github.com/megawac)
- **Table**
  - 增加了头部背景及行 hover 背景样式变量。[#5706](https://github.com/ant-design/ant-design/issues/5706) [@kappa-gooner](https://github.com/kappa-gooner)
  - 修复了表头分组示例的展示问题。[#5697](https://github.com/ant-design/ant-design/issues/5697)
- **Tabs** 修复了垂直模式下滚动按钮的位置问题。[#5765](https://github.com/ant-design/ant-design/issues/5765) [@dicklwm](https://github.com/dicklwm)
- **TreeSelect** 修复了下拉箭头方向不能改变的问题。[#5693](https://github.com/ant-design/ant-design/issues/5693)
- **TypeScript**
  - 补充了 InputNumber 的部分定义。[#5717](https://github.com/ant-design/ant-design/issues/5717)  [@whtang906](https://github.com/whtang906)
- **全局性优化**
  - 修复了组件中因升级 React@15.5.0 带来的 `React.PropTypes` 警告。[pull/5723](https://github.com/ant-design/ant-design/pull/5723)  [@manjitkumar](https://github.com/manjitkumar)
- **网站**
  - 『指引』中增加了英文版的[图标说明](https://ant.design/docs/spec/icon)。[@kenaniah](https://github.com/kenaniah)
  - 增加了[英文版在线讨论](https://gitter.im/ant-design/ant-design-english)。

## 2.9.1

`2017-04-09`

- Step
  - 增加 less 变量。[#5624](https://github.com/ant-design/ant-design/pull/5624) [@megawac](https://github.com/megawac)
  - 修复样式问题。[#5623](https://github.com/ant-design/ant-design/issues/5623)
- Button 点击后不会再失去焦点。[#5597](https://github.com/ant-design/ant-design/pull/5597) [@kenaniah](https://github.com/kenaniah)
- 链接获取焦点的时候增加下划线。[#5587](https://github.com/ant-design/ant-design/pull/5597) [@kenaniah](https://github.com/kenaniah)
- 修复 Dropdown.Button 不能使用 `placement` 的问题。[#5594](https://github.com/ant-design/ant-design/issues/5594)
- 修复 Pagination 不对齐的问题。[#5632](https://github.com/ant-design/ant-design/issues/5632)
- 修复 AutoComplete 使用 `allowClear` 时的样式问题。[#5634](https://github.com/ant-design/ant-design/issues/5634)
- 修复 DatePicker 设置 `showToday` 为 `false` 时的样式问题。[#5620](https://github.com/ant-design/ant-design/issues/5620)
- 修复 Select 搜索无结果时默认显示英文的问题。[#5661](https://github.com/ant-design/ant-design/pull/5661) [@LeeHarlan](https://github.com/LeeHarlan)

## 2.9.0

`2017-04-01` 👻

- 默认字体中数字设为等宽，方便进行纵向比较。[b526083](https://github.com/ant-design/ant-design/commit/b526083fa6a619113a3d26c4f4f092a8648f3bd4)
- Select
  - 新增 `mode` 参数，废弃 `tags|combobox|multiple` 属性，使用 `mode={tags|combobox|multiple}` 来代替。
  - `tags|multiple` 模式现在支持配置 `allowClear` 清除按钮。[#4843](https://github.com/ant-design/ant-design/issues/4843)
- Progress 新增 `dashboard` 仪表盘类型。[#5225](https://github.com/ant-design/ant-design/issues/5225) [@qiaolb](https://github.com/qiaolb)
- Tree 新增 `showLine` 属性，支持纵向连接线展示。[#3854](https://github.com/ant-design/ant-design/issues/3854)
- TimePicker 支持 12 小时制：`use12Hours`。[#4063](https://github.com/ant-design/ant-design/issues/4063)
- Table 支持 `column.filterIcon`，支持使用自定义筛选菜单时自定义图标。[#5293](https://github.com/ant-design/ant-design/pull/5293)
- Spin 新增 `wrapperClassName`，方便给包裹形态的加载条增加类名。[#5425](https://github.com/ant-design/ant-design/pull/5425) [@aaronplanell](https://github.com/aaronplanell)
- Tabs 新增点击左右切换箭头的回调 `onPrevClick` `onNextClick`。[#4395](https://github.com/ant-design/ant-design/issues/4395)
- InputNumber 新增 `parser` 属性，用于有时指定了 `formatter` 时需要解析出数字。[#5178](https://github.com/ant-design/ant-design/pull/5178#issuecomment-284557933)
- 国际化
  - 新增日语。[#5529](https://github.com/ant-design/ant-design/pull/5529)  [@novi](https://github.com/novi)
  - 新增斯洛伐克语。[#5304](https://github.com/ant-design/ant-design/pull/5304) [@Kamahl19](https://github.com/Kamahl19)
  - 新增爱沙尼亚语。[#5266](https://github.com/ant-design/ant-design/pull/5266) [@madisvain](https://github.com/madisvain)
  - 新增土耳其语。[#5536](https://github.com/ant-design/ant-design/pull/5536) [@c0b41](https://github.com/c0b41)
- TypeScript
  - 参照 react-slick 补充 Carousel 的定义。
  - 修复 Form 的部分定义。
  - 修正 `getPopupContainer` 定义。
- 允许分开禁用 Tabs 的高亮条和面板的切换动画。[#5089](https://github.com/ant-design/ant-design/issues/5089) [@xieguanglei](https://github.com/xieguanglei)
- Button 的 `loading` 属性支持 `{ delay: 1000 }` 的形式，默认不再延迟切换状态 。[#5365](https://github.com/ant-design/ant-design/issues/5365)
- 增加 Card 头部的 less 变量。[#5354](https://github.com/ant-design/ant-design/pull/5354) [@kossel](https://github.com/kossel)
- 修复 Breadcrumb 没有设置 `breadcrumbName` 时分隔符多余的问题。
- 修复 Dropdown.Button 的 `Unknown prop placement` 警告信息。[#5594](https://github.com/ant-design/ant-design/issues/5594)
- 修复 RangePicker 和 InputNumber 的占位文字颜色。
- 修复 Cascasder 搜索模式下无法使用退格键的问题。[#5340](https://github.com/ant-design/ant-design/issues/5340)
- 修复 LocaleProvider 有时对 `Modal.confirm` 失效的问题。[#5493](https://github.com/ant-design/ant-design/issues/5493) [@hargasinski](https://github.com/hargasinski)
- 修复 BackTop 设置了 `target` 时滚动动效消失的问题。[#5564](https://github.com/ant-design/ant-design/issues/5564)
- 优化 Pagination 的样式实现。[#5557](https://github.com/ant-design/ant-design/issues/5557)

## 2.8.3

`2017-03-27`

- TypeScript
  - 修复 `AutoComplete[filterOption]` 定义缺失的问题。[#5393](https://github.com/ant-design/ant-design/pull/5393) [@mitchelldemler](https://github.com/mitchelldemler)
  - 修复 `getPopupContainer` `getCalendarContainer` `getTooltipContainer` `getSuggestionContainer` 等的定义问题。[322e9ef](https://github.com/ant-design/ant-design/commit/322e9efdc9db28bd92230fc690f1fdf5a72cf7cd)
  - 优化 `Form.create` 的定义。[#5420](https://github.com/ant-design/ant-design/pull/5420) [@infeng](https://github.com/infeng)
- 修复 Badge 在 Maxthon 内的兼容性问题。[#5477](https://github.com/ant-design/ant-design/issues/5477)
- 修复 Button 内无法使用 `null` `undefined` 的问题。[#5472](https://github.com/ant-design/ant-design/issues/5472) [@blade254353074](https://github.com/blade254353074)
- Breadcrumb 不再强依赖于 `route.breadcrumbName` [ac1c7f3](https://github.com/ant-design/ant-design/commit/ac1c7f312bc46ba6ef7aacace43e4ac99b87dd54)
- 修复 `Form.Item[hasFeedback]` 与 `Input[prefix]` 混用时的样式问题。[#5456](https://github.com/ant-design/ant-design/issues/5456) [@william-yz](https://github.com/william-yz)
- 修复 Layout.Content 与 Carousel 一起使用时的样式问题。[#5415](https://github.com/ant-design/ant-design/issues/5415)
- LocaleProvider
  - 修复对德语支持不完善的问题。[#5387](https://github.com/ant-design/ant-design/pull/5387) [@Knacktus](https://github.com/Knacktus)
  - 修复对俄语支持不完善的问题。[#5406](https://github.com/ant-design/ant-design/pull/5406) [@plandem](https://github.com/plandem)
  - 修复不支持 Upload 的问题。[#5388](https://github.com/ant-design/ant-design/pull/5388) [@natergj](https://github.com/natergj)
- 修复 Menu 内 Icon 动画效果与文字不一致的问题。[#5495](https://github.com/ant-design/ant-design/issues/5495)
- 修复 `Modale[footer]` 无法置空的问题。[#5462](https://github.com/ant-design/ant-design/issues/5462)
- 修复 `2.8.2` 引入的 Pagination 在 `IE<=10` 下样式丢失的问题。[#5484](https://github.com/ant-design/ant-design/issues/5484)
- 修复 Popover 内使用 Table 时会意外关闭的问题。[#5407](https://github.com/ant-design/ant-design/issues/5407)
- 去掉 Radio 只能作为 Radio.Group 的直接后代的限制。[#5443](https://github.com/ant-design/ant-design/issues/5443)
- 修复 Switch 在 Form.Item 内使用时的 warning。[#5368](https://github.com/ant-design/ant-design/issues/5368)
- Table 的选择全部菜单现在默认隐藏，`selections` 设置为 true 时展现。[#5246](https://github.com/ant-design/ant-design/issues/5246) [@infeng](https://github.com/infeng)
- 新增 `@info-color` 主题变量。[#5442](https://github.com/ant-design/ant-design/issues/5442)
- 现在可以通过 `NODE_ENV=test` 来禁用测试时 antd 全量加载的 warning。[#5345](https://github.com/ant-design/ant-design/issues/5345)
- 升级 moment 到 `2.18.0`。

## 2.8.2

`2017-03-19`

- 发布了新的 [设计基础文档](https://ant.design/docs/spec/colors-cn)。
- 修复使用 Modal.confirm 时报错的问题。[#5269](https://github.com/ant-design/ant-design/issues/5269)。
- 修复 Upload 的蒙层样式 [#5275](https://github.com/ant-design/ant-design/issues/5275)。
- 修复 Upload 上传进度条不显示的问题 [#5323](https://github.com/ant-design/ant-design/issues/5323)。
- 修复 Table 的分页的 showTotal 数据错误的问题 [#5259](https://github.com/ant-design/ant-design/issues/5259)。
- 修复了 Popconfirm 与 Button 同时使用时的样式问题 [5301](https://github.com/ant-design/ant-design/issues/5301)。
- 修复 Radio 的一个样式问题 [#5336](https://github.com/ant-design/ant-design/pull/5336)。
- 修复 Message 的 getContainer 无法使用的问题 [#5380](https://github.com/ant-design/ant-design/issues/5380)。
- 修复 Checkbox 和 Radio 标签的文字对齐 [696a3c0](https://github.com/ant-design/ant-design/commit/696a3c0e34156d78e87d629a3f0f8703af1f03ec)。
- 调整了 Spin 的动画 [fa1e031](https://github.com/ant-design/ant-design/commit/fa1e031a7396c61fa9709a0c46fe63200c35d232)。
- 调整了 Mention 的一些样式 [240a93c](https://github.com/ant-design/ant-design/commit/240a93cee25bc8c6ad4520cd907a14a7b22ed773)。

## 2.8.1

`2017-03-11`

- **DatePicker** 优化了带时间的 DatePicker 的选择行为，并修复父组件 state 变化导致无法选中的问题。[#5189](https://github.com/ant-design/ant-design/issues/5189) [@megawac](https://github.com/megawac)
- **Form**
  - 补充了校验规则相关文档。[#5201](https://github.com/ant-design/ant-design/issues/5201)
  - 修复了一些样式问题。[#5196](https://github.com/ant-design/ant-design/issues/5196) [#5236](https://github.com/ant-design/ant-design/issues/5236) [#5222](https://github.com/ant-design/ant-design/issues/5222)
- **Icon** 增加 `shake` 和 `android-o` 图标。[commit/941782](https://github.com/ant-design/ant-design/commit/941782f7ec000a9054c3bc945ab887f93ab46749)
- **Input** 修复有 `addonBefore` 时 `hasFeedback` 失效的问题。[#5228](https://github.com/ant-design/ant-design/issues/5228)
- **InputNumber** 补充缺失的 type 定义。[#5240](https://github.com/ant-design/ant-design/issues/5240) [@hlehmann](https://github.com/hlehmann)
- **Modal** 支持点击 esc 调用 `onCancle`。[#5203](https://github.com/ant-design/ant-design/issues/5203) [@elios264](https://github.com/elios264)
- **Table**
  - 补充缺失的 type 定义。[#5206](https://github.com/ant-design/ant-design/issues/5206) [@kvey](https://github.com/kvey)
  - 修复小号表格无数据时右边线缺失的问题。[#5237](https://github.com/ant-design/ant-design/issues/5237)
  - 修复表头分组时排序失效的问题。[#5158](https://github.com/ant-design/ant-design/issues/5158)
- **Tooltip** 修复 Trigger 为绝对定位且禁用的按钮时失效的问题。[#5254](https://github.com/ant-design/ant-design/issues/5254)
- **Upload**
  - 修复上传文件名字过长时的样式问题。[commit/0a3519](https://github.com/ant-design/ant-design/commit/0a35197a35513ca45308bb7163c8243b75dd6f8d)
  - 修复并优化了动画。[pull/5210](https://github.com/ant-design/ant-design/pull/5210)
  - 支持覆盖 `onProgress`。[pull/5260](https://github.com/ant-design/ant-design/pull/5260) [@minwe](https://github.com/minwe)
- **全局性优化**
  - 修复 `lodash.debounce` 依赖缺失问题。[#5230](https://github.com/ant-design/ant-design/issues/5230)
- **网站**
  - 修复 safari 语言检测失效的问题。[pull/5245](https://github.com/ant-design/ant-design/pull/5245)
  - 色板支持点击复制色号。[pull/5247](https://github.com/ant-design/ant-design/pull/5247) [@bsheikh](https://github.com/bsheikh)
  - 增加脚手架示例。[commit/f2f786](https://github.com/ant-design/ant-design/commit/f2f786d66d75eebef8406a72db8a15e1640cea1f)

## 2.8.0

`2017-03-06`

- Tabs
  - 新增 `tabBarStyle` 用于自定义 tabBar 的样式。[#4966](https://github.com/ant-design/ant-design/issues/4966)
  - 新增 `TabPane[closable]` 用于设置是否显示删除按钮。[#4807](https://github.com/ant-design/ant-design/pull/4807) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
- Anchor
  - 新增 `showInkInFixed` 用于设置在 fixed 状态下是否圆形图标。[#4960](https://github.com/ant-design/ant-design/pull/4960)
  - 修复 `children` 不是 AnchorLink 时会报错的问题。[#5129](https://github.com/ant-design/ant-design/issues/5129)
- Table
  - 新增反选功能并允许自定义全选选项。[#4962](https://github.com/ant-design/ant-design/pull/4962)
  - `spin` 属性支持所有 Spin 的属性。[#4824](https://github.com/ant-design/ant-design/pull/4824) [@lixiaoyang1992](https://github.com/lixiaoyang1992)
  - 修正 `size` 是 `small` 的时候表头没有底边框的问题。[#5182](https://github.com/ant-design/ant-design/issues/5182)
- Mention 新增自定义触发字符的支持。[demo](https://ant.design/components/mention-cn/#components-mention-demo-multiple-trigger)
  - ![Mention animation](https://zos.alipayobjects.com/rmsportal/QDYwAbwKrqOUOykRaNai.gif)
- Rate
  - 支持自定义字符。[demo](https://ant.design/components/rate-cn/#components-rate-demo-character)
  - 新增 `className` 属性。
- Layout
  - 新增 `顶部-侧边布局-通栏` 的例子。[demo](http://ant.design/components/layout-cn/#components-layout-demo-top-side-2)
  - 新增 `固定头部` 的例子。[demo](https://ant.design/components/layout-cn/#components-layout-demo-fixed)
  - Sider 新增 `breakpoint` 用于设置响应式展示。[#4931](https://github.com/ant-design/ant-design/pull/4931)
- Form
  - 新增 `layout` 属性用于取代原有的 `horizontal`、`vertical`、`inline`。[#5056](https://github.com/ant-design/ant-design/issues/5056)
- Calendar
  - 新增 `dateFullCellRender` 和 `monthFullCellRender` 用于覆盖单元格的内容。[#5138](https://github.com/ant-design/ant-design/pull/5138) [@wonyun](https://github.com/wonyun)
  - 新增 `onSelect` 用于日期选择功能。[demo](https://ant.design/components/calendar-cn/#components-calendar-demo-select)
- AutoComplete
  - 修复在 Form.Item 里不对齐的问题。[#5139](https://github.com/ant-design/ant-design/issues/5139)
  - 新增 `查询模式 - 确定类目` 的例子。[demo](https://ant.design/components/auto-complete-cn/#components-auto-complete-demo-uncertain-category)
- Col 新增 `xl` 属性，支持 1600px 的响应布局断点。[#4796](https://github.com/ant-design/ant-design/pull/4796) [@hjin-me](https://github.com/hjin-me)
- Upload 新增 `locale` 支持国际化文案定义。[#4697](https://github.com/ant-design/ant-design/issues/4697)
- Transfer 新增 `onScroll` 支持动态加载数据。[#4188](https://github.com/ant-design/ant-design/issues/4188)
- message 和 notification 新增 `getContainer` 参数支持自定义消息渲染的容器。[#5019](https://github.com/ant-design/ant-design/issues/5019)
- Badge 新增 `showZero` 支持设置是否显示 `0`。[#4251](https://github.com/ant-design/ant-design/issues/4251)
- InputNumber
  - 新增 `formatter` 用于格式化展示的值。
  - 新增组合键的支持。[详细](https://github.com/react-component/input-number#keyboard-navigation)
- 新增大量图标。[#5107](https://github.com/ant-design/ant-design/pull/5107)
- 新增语言支持：
  - 荷兰语 [#4785](https://github.com/ant-design/ant-design/pull/4785) [@corneyl](https://github.com/corneyl)
  - 加泰罗尼亚语 [#4929](https://github.com/ant-design/ant-design/pull/4929) [@aaronplanell](https://github.com/aaronplanell)
  - 捷克语 [#5169](https://github.com/ant-design/ant-design/pull/5169) [@martinnov92](https://github.com/ant-design/ant-design/pull/5169)
  - 韩语/朝鲜语 [#5141](https://github.com/ant-design/ant-design/pull/5141) [@minsungryu](https://github.com/ant-design/ant-design/pull/5141)
- 优化 Spin 显示位置。[#4722](https://github.com/ant-design/ant-design/issues/4722)
- 优化 Checkbox 以兼容 `browser-sync`。[#2744](https://github.com/ant-design/ant-design/issues/2744)
- 修复 Steps 在窗口变化时的宽度问题。[#5083](https://github.com/ant-design/ant-design/issues/5083)
- 修复 Upload.Dragger unmount 时会报错的问题。[#5162](https://github.com/ant-design/ant-design/issues/5162)
- 修复 Button 里的文字在 IE 下点击时会移动的问题。
- 修复 Input 的前缀跟后缀的垂直居中对齐问题。

## 2.7.4

`2017-02-28`

- 修复 TreeSelect 多选框无法展现的问题。[#5092](https://github.com/ant-design/ant-design/issues/5092)
- 修复 Anchor 的 `e.stopPreventDefault is not a function` 的报错。[#5080](https://github.com/ant-design/ant-design/issues/5080)
- 修复 Input、Cascader、Upload 的一些样式细节。

## 2.7.3

`2017-02-25`

- 演示代码统一为 ES6 class 的写法。[#4878](https://github.com/ant-design/ant-design/issues/4878)
- TypeScript
  - 修复 `Cannot find module '../../package.json'` 的问题。[#4935](https://github.com/ant-design/ant-design/issues/4935)
  - 补充了 Table、RangePicker 和 Upload 的部分属性定义。
- 修复了 Modal `onOk` `afterClose` 和 Popconfirm `onConfirm` `onCancel` 缺少点击 event 参数的问题。 [#4787](https://github.com/ant-design/ant-design/issues/4787)
- 优化 Menu[inline] 和 Collapse 的折叠动画效果。
- 优化了 Checkbox 和 Radio 的垂直对齐样式。
- Table
  - 修复固定列时列头样式错位的问题。[#4936](https://github.com/ant-design/ant-design/issues/4936)
  - 修复未清除浮动导致排版错位的问题。[#4945](https://github.com/ant-design/ant-design/issues/4945)
  - 修复筛选子菜单无法显示的问题。[#4975](https://github.com/ant-design/ant-design/issues/4975)
  - 修复固定列上的自定义筛选菜单无法交互的问题。[#5010](https://github.com/ant-design/ant-design/issues/5010)
  - 修正 `pagination.onChange` 和 Pagination 的 `onChange` 参数不一致的问题。
  - 修复加载状态切换不柔和的问题。[#4934](https://github.com/ant-design/ant-design/issues/4934)
- 优化多个 message 展示重叠的问题。[#3543](https://github.com/ant-design/ant-design/issues/3543)
- 修复 Carousel 在改变浏览器窗口大小后 autoplay 会失效的问题。[#2550](https://github.com/ant-design/ant-design/issues/2550)
- 修复了 InputNumber 在受控模式（Form 表单内）无法输入 `1.01` `1.001` 等数字的问题。[#5012](https://github.com/ant-design/ant-design/issues/5012)
- 优化 Button 加载状态切换时的宽度抖动问题。[#4913](https://github.com/ant-design/ant-design/issues/4913)
- 修复 Dropdown 的菜单选中样式和 `Menu[theme="dark"]` 样式无效的问题。[#5013](https://github.com/ant-design/ant-design/issues/5013) [#4903](https://github.com/ant-design/ant-design/issues/4903)
- 修复 Menu 的弹出菜单的 `z-index` 问题。[#4937](https://github.com/ant-design/ant-design/issues/4937)
- 修复 DatePicker 和 RangePicker 无法设置小于 300px 的宽度的问题。[#4920](https://github.com/ant-design/ant-design/issues/4920)
- 修复 Spin 内嵌 Spin 的样式问题。[#4971](https://github.com/ant-design/ant-design/issues/4971)
- 修复了使用 babel-plugin-import 引入 Popconfirm 时，未引入 Button 样式的问题。
- 修复了样式变量在 Progress `type="circle"` 上未生效的问题。[#5002](https://github.com/ant-design/ant-design/issues/5002)
- 修复了 Breadcrumb 的 chilren 为 `null` 或 `undefined` 时报错的问题。[#5015](https://github.com/ant-design/ant-design/issues/5015)
- 修复 Slider 的 tooltip 闪烁的问题。[#5003](https://github.com/ant-design/ant-design/issues/5003)
- 修复了 Transfer 中 disabled 选项仍然可以被移动的问题。[#4981](https://github.com/ant-design/ant-design/pull/4981) [@tianlizhao](https://github.com/tianlizhao)
- 文档
  - 修复和优化了移动端的展现。
  - 优化了 1.x 升级到 2.x 的不兼容改动文档。

## 2.7.2

`2017-02-17`

- 修复 `antd.version` 无法正常使用的问题。 [#4844](https://github.com/ant-design/ant-design/issues/4844)
- 修复 dist 文件没有 locales 的问题。 [#4910](https://github.com/ant-design/ant-design/pull/4910)
- 修复 Cascader 搜索模式下可以选择已禁用选项的问题。 [#4699](https://github.com/ant-design/ant-design/issues/4699)
- **Button**
  - 修复 `Button[type=danger]` 的点击动画。
  - 修复设置 `loading` 时的样式问题。 [#4875](https://github.com/ant-design/ant-design/issues/4875)
- **Menu**
  - 修复 `vertical` 模式下 `openKeys` 为受控属性。 [#4876](https://github.com/ant-design/ant-design/issues/4876)
  - 修复 Menu.Item 选中时的动画问题。
  - 修复 Menu.SubMenu 的样式问题。 [#4906](https://github.com/ant-design/ant-design/issues/4906)
- **Table**
  - 修复在混合使用固定表头和小尺寸时的样式问题。 [#4850](https://github.com/ant-design/ant-design/issues/4850)
  - 修复无数据时的占位符样式问题。 [#4851](https://github.com/ant-design/ant-design/pull/4851)
  - 精简了 DOM 结构。 [#4868](https://github.com/ant-design/ant-design/issues/4868)
- 修复 Radio 组件 children 无法为数字 `0` 的问题。 [#4874](https://github.com/ant-design/ant-design/issues/4874) [@HQidea](https://github.com/HQidea)
- 修复 RangePicker `style.width` 无法小于 300 的问题。 [#4920](https://github.com/ant-design/ant-design/issues/4920)
- 修复 Spin 样式在打包时会导致编译错误的问题。 [#4915](https://github.com/ant-design/ant-design/issues/4915)
- 修复 Chrome 下 Tooltip 无法在 disabled 的按钮上使用的问题。 [#4865](https://github.com/ant-design/ant-design/pull/4865)
- 修复 Tree 节点在拖动时会导致整棵树抖动的问题。 [#4858](https://github.com/ant-design/ant-design/issues/4858)
- 修复 Upload 上传失败的样式问题。 [#4810](https://github.com/ant-design/ant-design/issues/4810)
- 修复 `Menu[vertical]` 和 Layout.Sider 配合使用时二级菜单无法弹出的问题。 [#4890](https://github.com/ant-design/ant-design/issues/4890)
- 优化 Button、`Badge[status=processing]` 的动画。

![Badge animation](https://camo.githubusercontent.com/6874b2333f2fac3fac346404c6e70684e4dafc1a/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f73516b72756c716346734b4e54785158615971512e676966)
![Button animation](https://camo.githubusercontent.com/3963d12b45de4f522c2799361dbc3177e7bd93d1/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f46624b776d636f766d795364666c557468494e522e676966)

## 2.7.1

`2017-02-10`

- **Affix**
  - 修复 hover 时元素被隐藏的问题。[#4800](https://github.com/ant-design/ant-design/issues/4800)
  - 修复 event listener 未被正确移除的问题。[#4755](https://github.com/ant-design/ant-design/issues/4755)
  - 修复快速滚动时不能正确复位的问题。[#4760](https://github.com/ant-design/ant-design/issues/4760)
- **Anchor** 修复了有 offsetTop 时的定位问题。[#4706](https://github.com/ant-design/ant-design/issues/4706)
- **AutoComplete**
  - 修复了 size 问题。[#4766](https://github.com/ant-design/ant-design/issues/4766)
  - 修复了自动加入其他字符的问题。[#4778](https://github.com/ant-design/ant-design/issues/4778)
- **Dropdown** 补充了之前缺失的弹出框位置设定相关的文档及示例。[#4811](https://github.com/ant-design/ant-design/issues/4811)
- **Layout** 修复了侧边布局动效不平滑的问题。[#4752](https://github.com/ant-design/ant-design/issues/4752)
- **LocaleProvider** 修复了瑞典语相关问题。[pull-4762](https://github.com/ant-design/ant-design/pull/4762) [@JesperWe](https://github.com/JesperWe)
- **RangePicker** 修复了图标与表单校验反馈图标重叠的问题。[#4783](https://github.com/ant-design/ant-design/issues/4783) [@zhenzong](https://github.com/zhenzong)
- **Table**
  - 修复了 size 定义里没有 'middle' 的问题。[#4819](https://github.com/ant-design/ant-design/pull/4819) [@warrenseymour](https://github.com/warrenseymour)
  - 修复过滤功能在 JSX 模式下不生效的问题。[#4759](https://github.com/ant-design/ant-design/issues/4759)
  - 修复分页跳转问题。[#4779](https://github.com/ant-design/ant-design/issues/4779)
- **Tabs** 修复了在 IE9 中从第二个标签页起都显示空白的问题。[#4795](https://github.com/ant-design/ant-design/issues/4795)
- **rc-pagination** 升级至 ~1.7.0，onChange 增加 pageSize 参数。
- **全局性优化**
  - 修复或优化了一些了文档，链接，样式细节。
  - 接入 stylelint 以替代 lesslint，修复一些 lint 问题。[#2179](https://github.com/ant-design/ant-design/issues/2179)
  - border-radius 统一为 4px。[#4772](https://github.com/ant-design/ant-design/issues/4772)
  - 支持 `import { version } from 'antd'`。[#4751](https://github.com/ant-design/ant-design/pull/4751)
- **网站**
  - 首页自动选择语言。[#4552](https://github.com/ant-design/ant-design/issues/4552)
  - 接入 Google 作为文档的全文本搜索。[#4814](https://github.com/ant-design/ant-design/issues/4814)
  - 改变版本切换 Select 的位置。[pull-4799](https://github.com/ant-design/ant-design/pull/4799)

## 2.7.0

`2017-02-03`

* Button 新增 `danger` 和 `ghost` 属性。[#4679](https://github.com/ant-design/ant-design/pull/4679)
* AutoComplete 支持自定义输入框的用法。 [#4483](https://github.com/ant-design/ant-design/pull/4483)
* 升级了 rc-cascader 到 0.11.0，支持键盘操作。[#4411](https://github.com/ant-design/ant-design/pull/4411)
* notification 支持更多弹出方向。[#4732](https://github.com/ant-design/ant-design/pull/4700)
* 升级了 rc-steps 到 2.3.0，Steps 新增 `progressDot` 属性，支持自定义点状步骤条的样式。[#4659](https://github.com/ant-design/ant-design/pull/4659)
* 升级了 rc-input-number 到 3.0.0
  * 现在输入时也会触发 `onChange`。[#4265](https://github.com/ant-design/ant-design/pull/4265)
  * 修复了 `onKeyUp` 事件。[#4717](https://github.com/ant-design/ant-design/issues/4717)
* Slider 增加 `veritical` 模式。[#4473](https://github.com/ant-design/ant-design/pull/4473)
* Tag
  - 增加了预设颜色。[#4571](https://github.com/ant-design/ant-design/pull/4571)
  - 调整了垂直对齐和默认间距。
* 添加了对德语的支持。[#4686](https://github.com/ant-design/ant-design/pull/4686)
* 添加了对瑞典语的支持。[#4455](https://github.com/ant-design/ant-design/pull/4455)
* 添加了对法语的支持。[#4538](https://github.com/ant-design/ant-design/pull/4538)
* Transfer 添加了 `onSearchChange` 回调。 [#4464](https://github.com/ant-design/ant-design/pull/4464)
* Modal.confirm 添加了 maskClosable 配置项。[#4488](https://github.com/ant-design/ant-design/pull/4488), [#4488](https://github.com/ant-design/ant-design/pull/4490)
* Form
  * 增加 `options.onValuesChange` 参数，可用于代替会触发多次 `options.onFieldsChange`。[#2934](https://github.com/ant-design/ant-design/pull/2934)
  * 增加 `props.form.getFieldsError` `props.form.isFieldTouched` `props.form.isFieldsTouched` 三个方法，可用于提交表单按钮的禁用展示。 [#4374](https://github.com/ant-design/ant-design/issues/4374)
  * 增加 `hideRequiredMark` 属性。[#4732](https://github.com/ant-design/ant-design/pull/4732)
* 改进了 Upload 的列表图片预览。 [#4516](https://github.com/ant-design/ant-design/pull/4516)
* 升级了 rc-select 到 6.7.1。
  * 修复了 Select 的 `onChange` 回调重复触发的问题。[#156@rc-select](https://github.com/react-component/select/pull/156)
  * 修复了 Select 显示初始化值的问题。[#152@rc-select](https://github.com/react-component/select/pull/152)
* 升级 rc-tree-select 到 `1.9.0`。
  * 新增 `treeDefaultExpandedKeys` 属性。[#43@rc-tree-select](https://github.com/react-component/tree-select/pull/43)
  * 修复了文字溢出换行问题。[#42@rc-tree-select](https://github.com/react-component/tree-select/pull/42)
* 新增 less 变量: `@border-style-base` `@border-width-base` `@btn-danger-color` `@btn-danger-bg` 等。
* 修复了 Badge 在页面放大时错位的问题。[#4747](https://github.com/ant-design/ant-design/issues/4747) [#4290](https://github.com/ant-design/ant-design/issues/4290)
* 修复一个固定表头的表格错位问题。[#4750](https://github.com/ant-design/ant-design/issues/4750)
* 修复一个 IE 下表格滚动时卡顿的问题。[#4522](https://github.com/ant-design/ant-design/issues/4522)
* 添加别名以修正图标命名风格：`addfile` => `file-add`，`addfolder` => `folder-open`，原有的命名依然有效。[#4758](https://github.com/ant-design/ant-design/issues/4758)

## 2.6.4

`2017-01-20`

* 优化 RangePicker 选择预设时间时的界面显示。[#4561](https://github.com/ant-design/ant-design/issues/4561)
* 修复 DatePicker 选择时间界面的滚动问题。[#4412](https://github.com/ant-design/ant-design/issues/4412)
* 修复 Menu 在 `vertical` 的受控模式下，子菜单不会弹出的问题。[#3783](https://github.com/ant-design/ant-design/issues/3783)
* 修复 Cascader 禁用时的值显示样式问题。[#4648](https://github.com/ant-design/ant-design/issues/4648)
* Table
  * 优化固定表头的滚动条显示。[#4637](https://github.com/ant-design/ant-design/issues/4637)
  * 修复在 Safari 下显示 loading 效果时表头会闪烁的问题。[#4622](https://github.com/ant-design/ant-design/issues/4622)
  * 修复多处边框问题。[#4647](https://github.com/ant-design/ant-design/issues/4647)、[#4635](https://github.com/ant-design/ant-design/issues/4635)
  * 修复 showHeader 的默认值不为 `false` 的问题。[#4658](https://github.com/ant-design/ant-design/issues/4658)
  * 修复找不到 `TableColumnConfig` 的类型定义的问题。[#4660](https://github.com/ant-design/ant-design/issues/4660)

## 2.6.3

`2017-01-15`

* 修复 `2.6.2` 中 Popconfirm 不可用的问题。[#4606](https://github.com/ant-design/ant-design/issues/4606)

## 2.6.2

`2017-01-14`

* 新增社区精选组件页面。[链接](/docs/react/recommendation)
* 修复一个内容过长导致 Layout 侧边布局错位的问题。[#4459](https://github.com/ant-design/ant-design/issues/4459)
* 修复 Input.Search 输入框和图标错位的问题。[#4540](https://github.com/ant-design/ant-design/issues/4540)
* 补充了一个自定义灰底样式的 Collapse 折叠面板的例子。[链接](/components/collapse/#components-collapse-demo-custom)
* Table
  * 调大了 Table 选择框和展开按钮的列宽度。
  * 修复 `pagination` 属性切换后分页不可用的问题。[#4532](https://github.com/ant-design/ant-design/issues/4532)
  * 修复不支持三级筛选菜单的问题。[#4541](https://github.com/ant-design/ant-design/issues/4541)
  * 修复 `column.filteredValue` 无法设置为 `null` 的问题。
* 调整 Carousel 为默认不可拖拽和文字可选择。
* 增加了 Breadcrumb 内嵌非 Breadcrumb.Item 元素时的警告提示。[#4403](https://github.com/ant-design/ant-design/issues/4403)
* 修复 Tooltip 在 `onVisibleChange(visible)` 返回 `true` 时不展示的问题。[#4579](https://github.com/ant-design/ant-design/issues/4579)
* 优化 TreeSelect 内容过长时的面板高度。[#4537](https://github.com/ant-design/ant-design/pull/4537)
* 补充了 TimePicker 和 Spin 的组件样式变量。
* 用年份代替了 DatePicker 年份选择面板上的箭头。[#4415](https://github.com/ant-design/ant-design/issues/4415)
* 修复 AutoComplete 和 Form `[options.validateTrigger]` 的 TypeScript 定义。
* 优化 Spin、Progress 的动画细节效果。

## 2.6.1

`2017-1-6`

* 修复 Menu dark theme 样式问题。[#4440](https://github.com/ant-design/ant-design/issues/4440)
* 修复 `Select[tokenSeparators]` `Modal[afterClose]` `Input[name]` 等的 TypeScript interface 定义。[#4441](https://github.com/ant-design/ant-design/pull/4441) [@eddhannay](https://github.com/eddhannay)
* 修复 `TimePicker[placeholder]` 无法置空的问题。[#4446](https://github.com/ant-design/ant-design/pull/4446) [@jialeicui](https://github.com/jialeicui)
* 修复 DatePicker 等年份选择面板折行问题。[#4415](https://github.com/ant-design/ant-design/issues/4415)
* 修复 Table loading 状态分页器可操作的问题。[#4461](https://github.com/ant-design/ant-design/issues/4461)
* 修复 `Input[prefix|suffix]` 垂直对齐问题。[commit](https://github.com/ant-design/ant-design/commit/c4ac4d1eca53ae2f6f4a1e15210b43745f283534)
* 修复 Cascader 对齐问题。[commit](https://github.com/ant-design/ant-design/commit/1fbebd4ecfff432e1b2261c9dfee4b9f471e7b1f)

## 2.6.0

`2017-1-2`

- 采用全新的色彩系统。[pull/4426](https://github.com/ant-design/ant-design/pull/4426)
  - 使用新的算法函数代替 `tint/shade`。
  - 利用算法生成的新版色板。[色板演示](http://ant.design/docs/spec/colors)
  - 调整默认文字颜色。
- 增加 Layout 布局组件。[#3534](https://github.com/ant-design/ant-design/issues/3534)
- 增加 Grid 栅格配置器示例。[commit/ee17ab](https://github.com/ant-design/ant-design/commit/ee17abfa9d0362c6f9baab4a9a09e57574583246)
- Input
  - 增加 prefix 和 suffix 属性，支持前后缀配置。[#4226](https://github.com/ant-design/ant-design/issues/4226) [@ystarlongzi](https://github.com/ystarlongzi)
  - InputGroup 增加 compact 属性，支持紧凑型展示。[pull/4309](https://github.com/ant-design/ant-design/pull/4309)
- Spin 增加延迟显示属性 delay。[#4306](https://github.com/ant-design/ant-design/issues/4306)
- 修复 Pagination 在低分辨率下的错位问题。[#4349](https://github.com/ant-design/ant-design/issues/4349)
- 修复 Dropdown.Button 换行的问题。[pull/4355](https://github.com/ant-design/ant-design/pull/4355) [@Morhaus](https://github.com/Morhaus)
- 修复 Cascader disabled 状态底色的问题。[#4434](https://github.com/ant-design/ant-design/issues/4434)
- 修复 MonthPicker monthCellContentRender 属性无效的问题，并修正了错误的文档。[#4394](https://github.com/ant-design/ant-design/issues/4394)
- 修复 ButtonGroup 存在多余蓝色边框的问题。[#4382](https://github.com/ant-design/ant-design/pull/4382) [@ystarlongzi](https://github.com/ystarlongzi)
- 修复 Menu horizontal 模式子菜单选择项背景色错误的问题。[#4414](https://github.com/ant-design/ant-design/issues/4414)
- 修复配置了 hasFeedback 的 Select/Cascader 下拉箭头被遮盖的问题。[#4431](https://github.com/ant-design/ant-design/issues/4431) [@JesperWe](https://github.com/JesperWe)
- Table 没有 header 时，第一行改为非圆角。[#4373](https://github.com/ant-design/ant-design/issues/4373)
- 优化 Tree 的拖拽效果。[#4371](https://github.com/ant-design/ant-design/issues/4371)
- 进行了一些文档或示例优化、文档错误修正以及网站样式问题修复。
- 升级 rc-form 底层依赖，getFieldDecorator 的 id 支持嵌套式写法。

## 2.5.3

`2016-12-24` 🎄🎄🎄

* 支持 TypeScript@2.1。[#4208](https://github.com/ant-design/ant-design/issues/4208)
* 修正了 Tabs 嵌套时的样式问题。 [#4317](https://github.com/ant-design/ant-design/issues/4317)
* 修正了 Radio 在当前项选中时，再次点击仍会触发 onChange 的问题。 [#4242](https://github.com/ant-design/ant-design/issues/4242) [@ystarlongzi](https://github.com/ystarlongzi)
* 修正了 Form 多列栅格式的表单排列方式布局异常。 [#4271](https://github.com/ant-design/ant-design/issues/4271)
* 修正了 Menu 竖直方向的当前选择项的背景问题。[#4253](https://github.com/ant-design/ant-design/issues/4253)
* 优化了 Dropdown 的 `onVisibleChange` 回调参数 Type 类型。[#4236](https://github.com/ant-design/ant-design/issues/4236)
* 优化了 Cascader 的 `onChange` 回调参数的 Type 类型。[#4231](https://github.com/ant-design/ant-design/issues/4231)
* 优化了 Datepicker[showTime] 的默认宽度 [b912f1c](https://github.com/ant-design/ant-design/commit/b912f1cea6f470c16b8dd90554883460161cef47)

## 2.5.2

`2016-12-10`

* 优化 Menu 已选择项的样式。
* 修复 Mention 不能响应 `onFocus` 和 `onBlur` 的问题。[#4163](https://github.com/ant-design/ant-design/issues/4163)
* 修复 `disabled` 和 `checked` 的 Radio 之间会多一条阴影的问题。[#4114](https://github.com/ant-design/ant-design/pull/4114) @jdz321
* 修复 RangePicker、TimePicker、Calendar 设置 Moment 的 `defaultValue` 和 `value` 时也会报错的问题。[#4147](https://github.com/ant-design/ant-design/issues/4147)
* 修复 Affix 在开启动画的 Tabs 里使用时会消失的问题。[#3943](https://github.com/ant-design/ant-design/issues/3943)
* 修复 Cascader 手动选择和搜索选择时 `onChange` 接收到的 `selectedOptions` 不同的问题。[#4096](https://github.com/ant-design/ant-design/issues/4096)
* 修复 Tabs 页增加到一定数量时会产生偏移的问题。[#3637](https://github.com/ant-design/ant-design/issues/3637)
* Table
  * 居中对齐表头分组的父表头。
  * 修正设置 filterDropdownVisible 时不生效的问题。[#4162](https://github.com/ant-design/ant-design/issues/4162)

## 2.5.1

`2016-12-03`

* 提升网站首页在移动端访问的体验。
* 补充从 `1.x` 升级到 `2.x` 时的组件改动警告提示。[#4028](https://github.com/ant-design/ant-design/pull/4028)
* 现在 ToolTip、Popover、Popconfirm 支持直接包裹文本节点和多个节点。[#3924](https://github.com/ant-design/ant-design/issues/3924)
* Anchor
  * 修复快速滚动时的定位问题。[#4053](https://github.com/ant-design/ant-design/issues/4053)
  * 修复 target 指定父元素 ref 时无效的问题。[#4037](https://github.com/ant-design/ant-design/issues/4037)
* Table
  * 修复设置 defaultChecked 时的一个选中问题。[#4020](https://github.com/ant-design/ant-design/issues/4020)
  * 修复分组表头中筛选功能无法使用的问题。[#4099](https://github.com/ant-design/ant-design/issues/4099)
* 修复在 `Input[type="textarea"]` 上使用 Popover 定位错误问题。[#4092](https://github.com/ant-design/ant-design/issues/4092)
* 修复 Popconfirm 的 `visible` 属性失效的问题。[#4068](https://github.com/ant-design/ant-design/issues/4068)
* 修复 TimePicker 无法设置 `style.width` 的问题。
* 修复 Steps 自定义图标和默认图标大小不一致的问题。[#3817](https://github.com/ant-design/ant-design/issues/3817)
* 修复 Form、Button、Slider、Table 等组件的一些样式细节。

## 2.5.0

`2016-11-25`

* 默认主题风格修改为支付宝钱包风格，及大量样式优化。
* 支持服务端渲染。（Mention 会因为 [draft-js](https://github.com/facebook/draft-js/issues/385) 的问题有 warning）
* 引入 [Jest Snapshot](https://facebook.github.io/jest/docs/tutorial-react.html#snapshot-testing) 测试组件结构及服务端渲染问题。
* 官网及文档优化。
* 新增自定义主题的 [文档](https://ant.design/docs/react/customize-theme)。
* 新增 [Sketch 资源文件](https://ant.design/docs/resource/download)。
* LocaleProvider 新增巴西语支持。[#4004](https://github.com/ant-design/ant-design/pull/4004) [@nathantn](https://github.com/nathantn)
* DatePicker
  * DatePicker 现在可以决定是否展示 “今天” 按钮。[commit](https://github.com/ant-design/ant-design/commit/bbef274aae169d142e3e7e3ea0af922d48e6dd64)
  * RangePicker 现在可以自定义快捷选择。[demo](https://ant.design/components/date-picker/#components-date-picker-demo-presetted-ranges)
  * 修复 DatePicker 设置 `showTime` 后 “此刻” 按钮失效的问题。[#3748](https://github.com/ant-design/ant-design/issues/3748)
  * 修复 `RangePicker[format]` 失效的问题。[#3808](https://github.com/ant-design/ant-design/issues/3808)
  * 修复 RangePicker `placeholder=['xx', 'xx']` 失效的问题。
* 新增并优化部分 Icon。[#3977](https://github.com/ant-design/ant-design/pull/3977)
* 新增 Input.Search 控件。[demo](https://ant.design/components/input/#components-input-demo-search-input)
* Mention onSelect 事件现在可以获取完整的数据。[#3867](https://github.com/ant-design/ant-design/issues/3867)
* Pagination 现在支持展示当前页的索引范围。[demo](https://ant.design/components/pagination/#components-pagination-demo-total)
* Table
  * 自定义筛选的显示隐藏现在可以通过代码控制。[demo](https://ant.design/components/table/#components-table-demo-custom-filter-panel)
  * 支持 JSX 风格的方式设置 columns。[demo](https://ant.design/components/table/#components-table-demo-jsx)
  * 现在可以监听单元格的点击事件 `onCellClick`。[#3774](https://github.com/ant-design/ant-design/issues/3774)
  * 修复无边框 Table 头部的圆角样式问题。
  * 修复 title 和 footer 高度不随 `Table[size]` 变化的问题。[commit](https://github.com/ant-design/ant-design/commit/9e6439b06cd099ab384a4a2f026f0def6e12bf23)
  * 修复选中状态出错的问题。[#3900](https://github.com/ant-design/ant-design/issues/3900)
* Upload
  * 修复 children 不能为 `null` 的问题。
  * 修复预览逻辑的问题。[commit](https://github.com/ant-design/ant-design/commit/e552880c32aaa3f5b0fb09a5e1fb7454c24d5378)
* 修复 Badge 会覆盖其他组件的问题。[#3898](https://github.com/ant-design/ant-design/issues/3898)
* 修复多行 Checkbox 样式不对齐的问题。[#3971](https://github.com/ant-design/ant-design/issues/3971) [@flashback313](https://github.com/flashback313)
* 修复 InputNumber 与其它表单控件不对齐的问题。[#3866(comment)](https://github.com/ant-design/ant-design/issues/3866#issuecomment-261148256)
* 修复 `Menu.Divider` 样式问题。[#3813](https://github.com/ant-design/ant-design/issues/3813)
* 修复 Popover 直接内嵌 Checkbox 和 Radio 无效的问题。[#3455](https://github.com/ant-design/ant-design/issues/3455)
* 修复 Select combobox 高度异常问题。[#3855](https://github.com/ant-design/ant-design/issues/3855)
* 修复 Switch actived 后的样式问题。[#3838](https://github.com/ant-design/ant-design/issues/3838)
* 修复 Transfer 搜索无结果时不展示 “Not Found” 提示的问题。[#3996](https://github.com/ant-design/ant-design/issues/3996)
* 修复 TreeSelect 占位符的样式问题。[#3841](https://github.com/ant-design/ant-design/issues/3841)
* 修复 TypeScript 编译报错的问题。[#3969](https://github.com/ant-design/ant-design/pull/3969) [@AlbertZheng](https://github.com/AlbertZheng)
* 修复表单反馈图标影响用户操作的问题。[#3891](https://github.com/ant-design/ant-design/issues/3891)

## 2.4.3

`2016-11-17`

* 修复 `Anchor` 内部 querySelector 报错，并做了一些体验优化 。[#3832](https://github.com/ant-design/ant-design/issues/3832) [#3844](https://github.com/ant-design/ant-design/issues/3844)

## 2.4.2

`2016-11-13`

* 修复 `Dropdown.Button` 不弹出的问题。[#3815](https://github.com/ant-design/ant-design/issues/3815)

## 2.4.1

`2016-11-11`

* 修复 `2.4.0` 组件 index 文件丢失的问题。

## 2.4.0

`2016-11-11`

* 调整了组件的导航结构。
* 新增 [Anchor](https://ant.design/components/anchor) 锚点组件。
* 整理了样式变量，修复 `@font-size-base` 和 `@text-color` 在部分组件无效的问题，新增 `@font-size-lg` `@text-color-secondary`，并移除了部分无用的变量。
* `Transfer` 组件新增了受控属性 `selectedKeys`。[#3729](https://github.com/ant-design/ant-design/issues/3729)
* `Tag` 新增选中状态。
* 修复 `Dropdown.Button` 不支持 `visible` 和 `onVisibleChange` 的问题。[#3779](https://github.com/ant-design/ant-design/issues/3779)
* 修复 `DatePicker[showTime]`` 的 `此刻` 按钮。[#3748](https://github.com/ant-design/ant-design/issues/3748)
* 修复 `Steps` 竖直方向的样式。[#3760](https://github.com/ant-design/ant-design/issues/3760)
* 修复 `Spin` 组件在 IE10+ 的样式问题。[#3755](https://github.com/ant-design/ant-design/issues/3755)
* 修复 `Mention` 组件的 focus 逻辑. [#3801](https://github.com/ant-design/ant-design/issues/3801)
* 修复 `Progress` 组件的动画问题。[#3784](https://github.com/ant-design/ant-design/issues/3784)
* 修复 `Select` 搜索时的丢失焦点问题。[#3778](https://github.com/ant-design/ant-design/issues/3778)
* 修复 `TimePicker` 不支持 `format="HH"` 等格式的问题。[#3793](https://github.com/ant-design/ant-design/issues/3793)
* 修复 `Input` 的 `suffix` 部分区域中鼠标事件无法响应的问题。[#3714](https://github.com/ant-design/ant-design/issues/3714)
* 优化了 `Table` 选择的性能。[#3757](https://github.com/ant-design/ant-design/pull/3757)
* 优化 `Carousel` 的默认样式。
* 优化 `Checkbox` 和 `Radio` 的样式。[#3590](https://github.com/ant-design/ant-design/issues/3590)
* 修复 `DatePicker`、`Form`、`Table` 等组件的样式细节。

## 2.3.2

`2016-11-09`

* 修复使用 `getFieldProps` 会导致死循环的问题。

## 2.3.1

`2016-11-07`

* 修正上个版本缺少 `dist/antd.css` 的问题。

## 2.3.0

`2016-11-04`

* 升级 normalize.css 到 5.0。
* package.json 的 main 换成了 `lib/index.js`。[#3397](https://github.com/ant-design/ant-design/pull/3397)
* 全新的 `Spin` 设计。
* `TimePicker` 新增了 `addon` 以支持自定义的附加内容。
* `Tree` 新增了 `onDragEnd`。
* `Collapse` 新增了 `bordered`。
* 优化 `Tabs` 切换时的动画效果。
* 优化 `Radio` 和 `Checkbox` 在禁用和鼠标停留时的样式。[#3590](https://github.com/ant-design/ant-design/issues/3590)
* 优化 `Transfer` 的性能。[#2860](https://github.com/ant-design/ant-design/issues/2860)
* 修复 `Popover` 嵌套时的样式问题。[#3448](https://github.com/ant-design/ant-design/issues/3448)
* 修复 `Transfer` 服务端渲染报错的问题。[#3686](https://github.com/ant-design/ant-design/issues/3686)
* 修复 `Upload` `picture-card` 模式下新上传的图片不显示预览的问题。[#3706](https://github.com/ant-design/ant-design/pull/3706) [@denzw](https://github.com/denzw)
* DatePicker
  * 在 `showTime` 模式下现在失去焦点也会触发 `onChange`。
  * `MonthPicker` 增加了 `monthCellContentRender`。
  * `RangePicker` 现在可以手动输入时间了。[#3718](https://github.com/ant-design/ant-design/issues/3718)
  * 新增了捷克语的翻译。
* Badge
  * 优化鼠标停留时超过 99 的数字显示。[#3645](https://github.com/ant-design/ant-design/issues/3645)
  * 修复单独使用时会有移动动画的问题。[#3709](https://github.com/ant-design/ant-design/issues/3709)
* Mention
  * 修复会被 `Table` 遮住的问题。[#3588](https://github.com/ant-design/ant-design/issues/3588)
  * 新增 `getSuggestionContainer` 来指定容器。[#3658](https://github.com/ant-design/ant-design/pull/3658)
* Tag
  * 废弃 `color` 属性。[#3560](https://github.com/ant-design/ant-design/issues/3560)
  * 新增 `type`。[#3560](https://github.com/ant-design/ant-design/issues/3560)
  * 新增 `checkable`。[#3560](https://github.com/ant-design/ant-design/issues/3560)
* Radio.Group
  * 新增 `className`。
  * `children` 为 `null` 或 `undefined` 时现在会被忽略。
* Select
  * 新增 `tokenSeparators` 支持粘贴时自动分词。[#2071](https://github.com/ant-design/ant-design/issues/2071)
  * 新增 `onFocus` 回调。[#3587](https://github.com/ant-design/ant-design/issues/3587)
  * 修复 `combobox` 模式下选中项不能正确显示的问题。[#3401](https://github.com/ant-design/ant-design/issues/3401)

## 2.2.1

`2016-11-02`

* 修复 Form 中 DatePicker[showTime]（受控）无法使用的问题。[#3665](https://github.com/ant-design/ant-design/issues/3665)

## 2.2.0

`2016-10-28`

* 支持 TypeScript@2.0。[@AlbertZheng](https://github.com/AlbertZheng) [#3358](https://github.com/ant-design/ant-design/issues/3358)
* 不再强依赖于 React 特定版本。[#3627](https://github.com/ant-design/ant-design/pull/3627)
* Alert 支持 `className` `style` 属性。
* DatePicker MonthPicker RangePicker 现在允许设置是否显示清除按钮。[#3618](https://github.com/ant-design/ant-design/issues/3618)
* Form.Item 现在可以感知深层嵌套的表单域，以自动为其生成错误信息和状态。[#3212](https://github.com/ant-design/ant-design/issues/3212)
* RangePicker 现在可以设置不可选的时间。[#](https://ant.design/components/date-picker/#components-date-picker-demo-disabled-date)
* Switch
  * 宽度现在会随着 `checkedChildren/unCheckedChildren` 自动调整。[#3380](https://github.com/ant-design/ant-design/issues/3380)
  * 优化切换动画。
* Upload 现在可以 [自定义上传方式](https://github.com/react-component/upload#customrequest)。[@edgji](https://github.com/edgji)
* Icon
  * 新增 `bulb` `select` `like-o` `dislike-o`。
  * 调整 `loading` `like` `dislike`。
* 优化 Card DatePicker Icon Table 的 TypeScript 定义。[@infeng](https://github.com/infeng) [3468](https://github.com/ant-design/ant-design/pull/3468) [#3603](https://github.com/ant-design/ant-design/pull/3603) [#3531](https://github.com/ant-design/ant-design/pull/3531)
* 修复 Cascader `defaultValue` 失效的问题。[#3470](https://github.com/ant-design/ant-design/issues/3470)
* 修复在一行内同时使用 Button Input DatePicker Select 时对齐的问题。[#3481](https://github.com/ant-design/ant-design/issues/3481)
* DatePicker
  * 修复设置 `DatePicker[showTime]` 后 `onChange` 事件触发时机问题。[#3523](https://github.com/ant-design/ant-design/issues/3523)
* 修复 Dropdown.Button disabled 后仍然响应操作的问题。[#3535](https://github.com/ant-design/ant-design/issues/3535)
* Menu
  * 修复服务端渲染问题，感谢 [@xpcode](https://github.com/xpcode) 定位问题。[#2061](https://github.com/ant-design/ant-design/issues/2061) [#2406](https://github.com/ant-design/ant-design/issues/2406) [#3293](https://github.com/ant-design/ant-design/issues/3293)
  * 修复 children 不能为 `null` 的问题。[#3599](https://github.com/ant-design/ant-design/issues/3599)
* 修复 message 加载状态无动画的问题。[#3536](https://github.com/ant-design/ant-design/issues/3536)
* Form
  * 修复 `Form[inline]` 与 `Input[addonBefore|addonAfter]` 一起使用时的样式问题。[#3524](https://github.com/ant-design/ant-design/issues/3524)
  * 修复 Form.Item 内 Radio.Button 样式问题。
  * 修复 Form.Item 内搜索按钮的样式问题。[#3630](https://github.com/ant-design/ant-design/issues/3630)
  * 修复用户无输入时 Form.Item 识别为校验成功的问题。[#3613](https://github.com/ant-design/ant-design/issues/3613)
* 当 `Popover[title]` 没有设置时，不再限制 Popover 的最小宽度。
* Table
  * 修复固定表头在没有数据情况下的样式问题。[#3567](https://github.com/ant-design/ant-design/issues/3567)
  * 修复无数据时会覆盖 SubMenu 的问题。[#3521](https://github.com/ant-design/ant-design/issues/3521)
* Tabs
  * 修复卡片叶签头部高度与设计稿不一致的问题。
  * 修复 TabPane 的高度会被同级 TabPane 撑高的问题。[#3304](https://github.com/ant-design/ant-design/issues/3304)
* 修复 `TreeSelect[showSearch]` 样式问题。[#3520](https://github.com/ant-design/ant-design/issues/3520)

## 2.1.0

`2016-10-16`

- Icon 现在支持旋转动画。
- Tabs 现在可以禁用切换动画。[#3324](https://github.com/ant-design/ant-design/issues/3324)
- 新增西班牙语的 localization 支持。@Danjavia
- 更新俄语的 localization 文案。@plandem
- 新增 AutoComplete[onSelect] 回调。
- 优化 Modal 样式细节。
- 优化 Tooltip 动画。
- 优化 Transfer 按钮的样式。
- 优化 Tree 的样式细节。
- 整理和修复了部分 less 变量。
- 修复服务端渲染时全量引入 antd 报错的问题。
- 修复 Affix 与 BackTop 的服务端渲染问题。[#3283](https://github.com/ant-design/ant-design/issues/3283) [#3343](https://github.com/ant-design/ant-design/issues/3343)
- 修复 Card[title] 内无法使用 `h3` 之类的标签的问题。[#3388](https://github.com/ant-design/ant-design/issues/3388)
- 修复 Cascader 搜索模式与浏览器自动完成有冲突的问题。[#3350](https://github.com/ant-design/ant-design/issues/3350)
- DatePicker
  - 修复设置 `showTime` 后，`onChange` 重复触发的问题。[#3376](https://github.com/ant-design/ant-design/issues/3376)
  - 修复浮层与 Trigger 日期格式不一致的问题。[#3405](https://github.com/ant-design/ant-design/issues/3405) [#3298](https://github.com/ant-design/ant-design/issues/3298)
  - 修复与 TimePicker 样式冲突问题。[#3312](https://github.com/ant-design/ant-design/issues/3312) [#3307](https://github.com/ant-design/ant-design/issues/3307)
- 修复 Form.Item 标签文案过长溢出的问题。
- 修复 Icon 在 Safari 下会出现边框的问题。
- 修复 InputNubmer 键盘事件死循环问题。[#3239](https://github.com/ant-design/ant-design/issues/3239)
- 修复 Popover 箭头样式问题。
- 修复 Popover 和 Popconfirm 的 `arrowPointAtCenter` 无效的问题。
- Select
  - 修复样式重复引入的问题。[#3376](https://github.com/ant-design/ant-design/issues/3376)
  - 修复 `notFoundContent` 无法置空的问题。[#3345](https://github.com/ant-design/ant-design/issues/3345)
  - 修复 Table 内使用 Select[showSearch] 后宽度会跳动的问题。[#3413](https://github.com/ant-design/ant-design/issues/3413)
- 修复 Table 边框线与页头页脚冲突的问题。[#3301](https://github.com/ant-design/ant-design/issues/3301)
- 修复 TabPane 高度不随内容变化的问题。[#3377](https://github.com/ant-design/ant-design/issues/3377)
- 修复 Transfer[titles] 不受 LocaleProvider 控制的问题。[#3264](https://github.com/ant-design/ant-design/pull/3264)
- Upload
  - 修复用户自定义 `onRemove` 事件会覆盖默认行为的问题。[#3317](https://github.com/ant-design/ant-design/issues/3317)
  - 修复图片卡片样式问题。[#3316](https://github.com/ant-design/ant-design/issues/3316)
- 修复项目构建时 moment locales 找不到的问题。[#3204](https://github.com/ant-design/ant-design/issues/3204) [#3411](https://github.com/ant-design/ant-design/issues/3411)

## 2.0.1

`2016-10-01`

- 修复无法调用 react-slick 方法的问题。[#3164](https://github.com/ant-design/ant-design/issues/3164)
- 修复 Steps.Step[icon] 不支持 React.ReactNode 的问题。[#3159](https://github.com/ant-design/ant-design/issues/3159)
- 修复 Affix 不支持服务端渲染的问题。[#3216](https://github.com/ant-design/ant-design/issues/3216)
- 修复 Mention 不支持 `onSelect` `placeholder` 的问题。[#3236](https://github.com/ant-design/ant-design/issues/3236) [#3226](https://github.com/ant-design/ant-design/issues/3226)
- 修复 Transfer 与 `getFieldDecorator` 一起使用时的报错问题。
- 修复 LocaleProvider 对时间组件无效的问题。
- 修复 Cascader 搜索模式搜索文字显示不了的问题。
- 修复 Spin 动画与文案整体不垂直居中的问题。
- 修复 RangePicker Modal Tag Progress 等组件样式问题。

## 2.0.0

`2016-09-28`

很高兴的通知各位，经过四个月时间的紧密开发，`antd@2.0.0` 终于发布了。这个版本我们重构了底层代码，持续完善现有组件功能和优化细节，并提供了英文版的文档，其中很多都来自社区的贡献，无法一一感谢，欢迎各位持续关注和鞭策。在升级过程中遇到任何问题，请及时 [反馈给我们](https://github.com/ant-design/ant-design/issues)。

### 2.x 主要变化

* 开发语言改为 TypeScript，提供 **官方支持的 `.d.ts` 文件**，感谢 [#1846](https://github.com/ant-design/ant-design/issues/1846) 中所有参与到这次重构的人以及后期 @infeng 对其的完善。
* **新增英文文档**， 以后将同时提供中英双语文档，感谢 [#1471](https://github.com/ant-design/ant-design/issues/1471) 里所有参与到翻译和审阅工作中的人。
* 时间类组件 DatePicker、TimePicker、Calendar 等的底层 **使用 [moment](http://momentjs.com/) 替换 [gregorian-calendar](github.com/yiminghe/gregorian-calendar)**。
* 全新设计的 [图标](http://ant.design/components/icon/)。
* 新增提及组件 [Mention](http://ant.design/components/mention/)。
* 新增自动完成组件 [AutoComplete](http://ant.design/components/auto-complete/)。
* Form 新增 `getFieldDecorator` 作为 `getFieldProps` 的替代，对于不正确的使用方式 `getFieldDecorator` 会给出提示，可以降低踩坑的概率。相关讨论见 [#1533](https://github.com/ant-design/ant-design/issues/1533)。
* Table 支持 [表头分组](http://ant.design/components/table/#components-table-demo-grouping-columns)。@yesmeck
* 完全移除 `antd@1.x` 中已经废弃的 QueueAnim、Validation、Form.ValueMixin、Progress.Line、Progress.Circle、Popover[overlay] 及 Slider[marks] 对数组的支持。

### 2.x 不兼容改动

> 建议从 `1.x` 升级时，直接升级到 `2.x` 的最新版本。

> 建议在升级 antd 的过程中，每做完一次合理的修改并 review 和测试之后，就 git commit 一次，这样在误操作时能随时回滚到之前的版本

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。另外由于人肉查找代码中的废弃用法过于低效，所以我们提供了 [antd-migration-helper](https://github.com/ant-design/antd-migration-helper) 用于扫描代码中的废弃用法。

* 时间类组件的 `value` 和 `defaultValue` 不再支持 `String/Date` 类型，请使用 [moment](http://momentjs.com/)。需要对代码进行如下修改，可人手修改也可用我们提供的 [codemod](https://github.com/ant-design/antd-codemod#time-related-value-to-moment) 脚本自动修改类似用法，但注意脚本不能覆盖所有情况，所以在运行脚本后仍然需要 review 和测试。
  ```diff
  - <TimePicker defaultValue="12:08:23" />
  + <TimePicker defaultValue={moment('12:08:23', 'HH:mm:ss')} />

  - <DatePicker defaultValue="2015/01/01" />
  + <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} />

  - <Calendar defaultValue={new Date('2010-10-10')} />
  + <Calendar defaultValue={moment('2010-10-10', 'YYYY-MM-DD')} />
  ```
* 时间类组件的 `onChange` 和 `onPanelChange` 及其他回调函数中为 `Date/GregorianCalendar` 类型的参数，均修改为 moment 类型，两者 API 有所不同，但功能基本一致，请对照 [moment 的 API 文档](http://momentjs.com/docs/) 和 [gregorian-calendar 的文档](https://github.com/yiminghe/gregorian-calendar) 进行修改。
  1. 也可以参考这个 [commit](https://github.com/ant-design/ant-design/commit/4026221d451b246956983bb42140142d4a48b7d7) 来进行修改。
  1. 也可用我们提供的 [codemod](https://github.com/ant-design/antd-codemod#gergoriancalendar-to-moment) 脚本自动修改类似用法，但注意脚本不能覆盖所有情况，所以在运行脚本后仍然需要 review 和测试。
  ```diff
  function disabledDate(date) {
  - console.log(date.getTime());
  + console.log(date.valueOf());
  }
  ```
* 由于 `JSON.stringify(date: moment)` 返回的值会丢失时区设置，所以在提交前要先使用 `.format` 把日期转成字符串，相关 issue 见 [#3082](https://github.com/ant-design/ant-design/issues/3082)：
  ```js
  handleSubmit() {
    const values = this.props.form.getFieldsValue();
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss'); // 或其它格式
    const data = JSON.stringify(values);
    // 发送 data 到服务器
  }
  ```
* 时间类组件与表单校验一起使用时，`type: 'date'` 改为 `type: 'object'`。
  ```diff
  getFieldDecorator('time', {
    rules: [{
      required: true,
  -   type: 'date',
  +   type: 'object',
    }],
  })(...)
  ```
* 时间类组件的 `format` 属性也发生了变化，从 [gregorian-calendar-format 的格式](https://github.com/yiminghe/gregorian-calendar-format#api) 变化为与 [moment 的格式](http://momentjs.com/docs/#/parsing/string-format/)，例如原来的 `yyyy-MM-dd` 将变为 `YYYY-MM-DD`。可人手修改也可用我们提供的 [codemod](https://github.com/ant-design/antd-codemod#time-related-value-to-moment) 脚本自动修改类似用法，但注意脚本不能覆盖所有情况，所以在运行脚本后仍然需要 review 和测试。
* Breadcrumb 移除 `linkRender` 和 `nameRender`，请使用 `itemRender`。
* Menu 移除 `onClose` `onOpen`，请使用 `onOpenChange`。API 差异较大，请先研究 [demo](http://beta.ant.design/components/menu/#components-menu-demo-sider-current)。
* Table 移除列分页功能，请使用 [固定列](http://ant.design/components/table/#components-table-demo-fixed-columns)。
* Popover 移除 `overlay` ，请使用 `content`。

以下变化升级后旧代码仍然能正常运行，但是控制台会出现警告提示，建议按提示进行修改。

* Form 废弃 `getFieldProps`，请使用 `getFieldDecorator`。可人手修改也可用我们提供的 [codemod](https://github.com/ant-design/antd-codemod#getfieldprops-to-getfielddecorator) 脚本自动修改类似用法，但注意脚本不能覆盖所有情况，所以在运行脚本后仍然需要 review 和测试。

  ```diff
  -  <Input placeholder="text" {...getFieldProps('userName', { ... })} />
  +  {getFieldDecorator('userName', { ... })(
  +    <Input placeholder="text" />
  +  )}
  ```

  相关讨论可以看 [#1533](https://github.com/ant-design/ant-design/issues/1533)。

* DatePicker 废弃 `toggleOpen`，请使用 `onOpenChange`：

  ```diff
  - handleToggleOpen({ open }) {
  + handleOpenChange(open) {
    ...
  }
  ```

最后，由于时间类组件修改比较复杂，可能还需要深入业务逻辑，所以在项目比较赶的情况下，可以考虑使用 [antd-adapter](https://github.com/ant-design/antd-adapter) 适配为 `antd@1.x` 里面的用法，但不建议。

### 2.x Bug 修复

* 修复 Dropdown.Button `disabled` 属性无效的问题。[#3070](https://github.com/ant-design/ant-design/issues/3070)
* 修复 Form.create `withRef` 选项失效的问题。[#2843](https://github.com/ant-design/ant-design/issues/2843)
* 修复 Menu inline 模式下子菜单展开的问题。[#2701](https://github.com/ant-design/ant-design/issues/2701)
* 修复 Modal.confirm 之类的弹窗在异步调用时按钮仍可点击的问题。[#2684](https://github.com/ant-design/ant-design/issues/2684)
* 修复 DatePicker[showTime] 参数中的 `format` 失效的问题。[#3123](https://github.com/ant-design/ant-design/issues/3123)
* 修复 Table[dataSource] 中的项的 key 为 `0` 时识别错误的问题。[#3166](https://github.com/ant-design/ant-design/pull/3166) @noonnightstorm
* 修复 Tree.Node 无子节点时仍然显示箭头的问题。[#2616](https://github.com/ant-design/ant-design/issues/2616)
* 修复 Tree.Node 箭头隐藏后鼠标 hover 上去光标仍会发生变化的问题。[#2748](https://github.com/ant-design/ant-design/issues/2748)

### 2.x 其他改进

* Alert 新增 [`banner` 模式](http://ant.design/components/alert/#components-alert-demo-banner)。
* BackTop 增加回到顶部的动画效果。
* Badge 新增 [状态点模式](http://ant.design/components/badge/#components-badge-demo-status)。
* Cascader 新增 [搜索功能](http://ant.design/components/cascader/#components-cascader-demo-search)。
* Checkbox 新增 [indeterminate 状态](http://ant.design/components/checkbox/#components-checkbox-demo-check-all)。
* Form 新增 [垂直布局](http://ant.design/components/form/#components-form-demo-validate-customized)。
* InputNumber 现在支持长按。[#](http://ant.design/components/input-number/#components-input-number-demo-basic)
* notification 支持 [自定义 icon](http://ant.design/components/notification/#components-notification-demo-custom-icon)。
* Spin 现在允许 [自定义文案与动画共存](http://ant.design/components/spin/#components-spin-demo-tip)。@jerrybendy
* Transfer 现在可以监听用户选择了哪些选项。[#](http://ant.design/components/transfer/#components-transfer-demo-basic)
* Transfer 现在可以定义哪些选项是 [不可选择的](http://ant.design/components/transfer/#components-transfer-demo-basic)。
* 优化 Alert 和 notification 的样式。
* 优化 Modal.confirm 之类的弹窗的键盘交互。@Dafrok
* 优化 [DatePicker 的时间选择](http://ant.design/components/date-picker/#components-date-picker-demo-time) 交互。
* 优化 [Spin 状态切换](http://ant.design/components/spin/#components-spin-demo-nested ) 时的效果。
* 更新 [font-family](https://github.com/ant-design/ant-design/commit/2f308b0f995cfcb2a3c8feb1e35ffd3f0bf93cfc)。

### 2.x 相关工具发布

* 新增配套网站 [AntD Library](http://library.ant.design/)，提供遵循 Ant Design 设计规范的组件、模式等的 Axure 资源。
* `babel-plugin-antd` 更名为 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，标志着该插件将作为一个通用的按需加载方案存在，而不再是 `antd` 专有。

  请更新 `package.json`：

  ```diff
  {
    "devDependencies": {
  -   "babel-plugin-antd": "^0.x.x",
  +   "babel-plugin-import": "^1.0.0",
    }
  }
  ```

  同时更新 `.babelrc` 或你在其它地方对其的配置：

  ```diff
  {
  -  "plugins": [["antd", { style: "css" }]]
  +  "plugins": [["import", { libraryName: "antd", style: "css" }]]
  }
  ```

* [dva@1.0.0](https://github.com/dvajs/dva) 也已经发布，并推荐 [在实战项目中使用](http://ant.design/docs/react/practical-projects)。
* 脚手架工具推荐使用 [dva-cli](https://github.com/dvajs/dva-cli)，原来的 `antd-init` 以后仅会用于学习以及 demo。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
