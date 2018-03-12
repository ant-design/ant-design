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
- 🐞 修复 `Form.create` 。 [#9331](https://github.com/ant-design/ant-design/issues/9331)
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
- 🐞 修复组件 List "No Data" 和加载动画重叠的问题. [#8647](https://github.com/ant-design/ant-design/issues/8647)
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

更多内容见 [Ant Design 3.0 发布公告](https://medium.com/ant-design/announcing-ant-design-3-0-70e3e65eca0c)！

### 主要变化

- 全新的[色彩系统](https://ant.design/docs/spec/colors-cn#Color-Palettes)，组件主色由 『`#108EE9`』 改为 『`#1890FF`』，新主色我们称之为『拂晓蓝』。
- 全新的视觉样式和组件尺寸，更现代更美观。
- 基础字体大小由 `12px` 增大到 `14px`。
- 默认语言由中文改为英文。
- 全面支持 React 16。
- 更友好的 TypeScript 支持。
- 新的 [List](https://ant.design/components/list-cn/) 组件。
- 新的 [Divider](https://ant.design/components/divider-cn/) 组件。
- 新增 30 个[图标](https://ant.design/components/icon-cn/)。

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
- UMD 版本的  `dist/antd.js` 不再包含 moment，使用的时候需要自己引入 moment。
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
- 🌟 Mention 新增 `placement`, 用于设置下拉框的弹出方向。
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
