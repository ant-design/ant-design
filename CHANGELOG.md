---
order: 3
chinese: 更新日志
toc: false
timeline: true
---

你也可以查看 GitHub 上的 [发布日志](https://github.com/ant-design/ant-design/releases)。

---

## 1.1.0

`2016-05-18`

- Cascader 的 `displayRender` 方法增加了 `selectedOptions` 参数，以支持输入框中自定义节点。[#1726](https://github.com/ant-design/ant-design/issues/1726)
- Input.Group 新增 `size` 属性，可设置控件尺寸。[#1732](https://github.com/ant-design/ant-design/issues/1732)
- Layout 新增常用布局：侧边导航展开收起模式。[#1643](https://github.com/ant-design/ant-design/issues/1643)
- Transfer 支持自定义渲染行数据。[#1664](https://github.com/ant-design/ant-design/issues/1664)
- Upload 的 children 为空时，不再显示上传按钮。[#1610](https://github.com/ant-design/ant-design/issues/1610)
- Table
  - 修复 `filter` 过滤数据后显示错误分页的问题。[#1669](https://github.com/ant-design/ant-design/issues/1669)
  - 修复 `pagination` 不指定时显示错误分页的问题。[#1683](https://github.com/ant-design/ant-design/issues/1683)
- 修复 Form 搜索输入框样式问题。[7b7f846](https://github.com/ant-design/ant-design/commit/7b7f8461611e53f4f96ae8d64d37fe28ee8d2553)
- 修复 Modal 的关闭按钮获得焦点时的样式问题。[#1668](https://github.com/ant-design/ant-design/issues/1668)
- 修复 Select 获得焦点时的样式问题。[#1684](https://github.com/ant-design/ant-design/issues/1684)
- 修复 TreeSelect 占位符样式问题。[#1657](https://github.com/ant-design/ant-design/issues/1657)
- 修复了类型定义以更好地支持 `TypeScript`。[#1696](https://github.com/ant-design/ant-design/pull/1696) [@xujihui1985](https://github.com/xujihui1985)
- 优化了 LocaleProvider。[a3850a4](https://github.com/ant-design/ant-design/commit/a3850a4df84d7055a1a40600919f2f9ba1bbf2b2)
- 其他组件的样式优化。

## 1.0.1

`2016-05-11`

- 修复当 Table 的 `rowSelection.type` 为 'radio' 时的报错。[#1627](https://github.com/ant-design/ant-design/issues/1627)
- 修复 CheckboxGroup 与 `getFieldProps`共用时的问题。[#1631](https://github.com/ant-design/ant-design/issues/1631)
- 修复 RangePicker 中 TimePicker 不会受 locale 控制的问题。[#1635](https://github.com/ant-design/ant-design/issues/1635)
- 修复 Tag 组件缺失的问题。
- 修复 Table 的 className 不在最外层容器上的问题。
- 修复一个样式文件重复打包的问题。

## 1.0.0

`2016-05-09`

很高兴的通知各位，经过四个月时间的紧密开发，`antd@1.0.0` 终于发布了。从去年 5 月 7 日提交第一行代码以来，经过整整一年的开发迭代，antd 受到社区的大量关注，使用的公司和产品持续增加，已经日趋成熟。这个版本我们重构了底层代码和站点，持续完善现有组件功能和优化细节，其中很多都来自社区的贡献，无法一一感谢，欢迎各位持续关注和鞭策。在升级过程中遇到任何问题，请及时反馈给我们。

### 主要变化

- **兼容 React@15.x**。
- **全新单页站点**，使用 React 和 antd 进行了彻底重构，加载更快，访问更流畅。
- **样式支持按需加载**。可参考 [antd-init](https://github.com/ant-design/antd-init) 的模版代码, 需要配合 [babel-plugin-antd](https://github.com/ant-design/babel-plugin-antd#usage) 插件和 `style` 配置进行使用。[#900](https://github.com/ant-design/ant-design/issues/900)
- **提供独立的构建文件**。[文档](/docs/react/install?scrollTo=浏览器引入)
- 新增卡片组件 [Card](/components/card)。
- 新增评分组件 [Rate](/components/rate)。
- 新增 [LocaleProvider](/components/locale-provider) 组件，提供组件文案的国际化支持，并新增了英语和俄语的语言配置。[#1411](https://github.com/ant-design/ant-design/issues/1411)
- 更好的服务端渲染支持，修复了 Badge、Spin、Calendar、Upload 等组件服务端渲染的问题。
- 新增 antd.d.ts 以更好的支持 TypeScript。[@bang88](https://github.com/bang88)
- 布局组件支持响应式布局和栅格间隔设置。[#1082](https://github.com/ant-design/ant-design/issues/1082)
- Table 支持固定列和横向滚动。[#1265](https://github.com/ant-design/ant-design/issues/1265)

### 不兼容改动

此版本有部分不兼容的改动，升级时确保修改相应的使用代码。

- 推荐使用样式按需加载, 如果需要整体载入样式, **样式入口文件变为** `antd/dist/antd.css` 和 `antd/dist/antd.less`。如果你在项目中覆盖了 less 变量，less 文件的引用方式也有 [相应变更](https://github.com/ant-design/ant-design/issues/1558#issuecomment-218120000)。

   ```diff
   - import 'antd/lib/index.css';  // import 'antd/style/index.less';
   + import 'antd/dist/antd.css';  // import 'antd/dist/antd.less';
   ```

- 完全移除了 `0.12` 中废弃的 Validation 组件，可以直接 import [rc-form-validation](https://github.com/react-component/form-validation) 用以代替。[#1096](https://github.com/ant-design/ant-design/issues/1096)
- Breadcrumb.Item 的 `href` 属性被移除，请直接用 `a` 标签包裹可点击的内容。
- Modal 移除 了`align` 属性，现在可以使用 `style` 属性调整位置。
- `Modal.confirm` 等方法的配置项 `iconClassName` 重命名为 `iconType`。

#### 有兼容提示的改动

这里的改动在升级后控制台会出现警告提示，请按提示进行修改。

- 废弃 QueueAnim，可以直接 import [rc-queue-anim](https://github.com/react-component/queue-anim) 用以代替。Ant Design 的动效方案已移至 [Ant Motion](http://motion.ant.design/#/components/queue-anim)，欢迎前往探索。
- Affix 的 `offset` 属性重命名为 `offsetTop`。
- Popover 的 `overlay` 属性重命名为 `content`。
- Progress.Line 使用方式改为 `<Progress />` 或 `<Progress type="line" />`。
- Progress.Circle 使用方式改为 `<Progress type="circle" />`。
- Spin 的 `spining` 属性更正为 `spinning`。
- Alert 的 type `warn` 重命名为 `warning`。[#1225](https://github.com/ant-design/ant-design/issues/1225)
- `notification.warn`、`message.warn` 修改为 `notification.warning` 和 `message.warning`。[#1225](https://github.com/ant-design/ant-design/issues/1225)
- Tree 的 `onExpand` 参数从 `function(node, expanded, expandedKeys)` 调整为 `function(expandedKeys, {expanded, node})`。

### Bug 修复

- 修复 Table 的 `size` 为 `middle` 时，分页器大小无法控制的问题。[#1396](https://github.com/ant-design/ant-design/issues/1396)
- 修复 Table 的 `pagination.defaultCurrent` 失效的问题。
- 修复 Cascader 的 `defaultValue` 没有被 `value` 覆盖的问题。
- 修复 Select 同时设置 `allowClear` `disabled` 时还是会出现清除按钮的问题。[#1480](https://github.com/ant-design/ant-design/issues/1480)
- 修复 Transfer 的 `DataSource` 变化时已选中项没有同步的问题。[#1587](https://github.com/ant-design/ant-design/issues/1587)
- 修复 DatePicker 日期格式与国际化配置不同步的问题。[#1509](https://github.com/ant-design/ant-design/issues/1509)
- 修复 Button 禁用时事件仍然会冒泡的问题。[#1541](https://github.com/ant-design/ant-design/issues/1541)
- 修复 Carousel 自动播放时的卡顿和报错问题。[#1397](https://github.com/ant-design/ant-design/issues/1397)
- 修复 Tabs 的 card 类型内嵌标准 Tabs 时的样式问题。[#1617](https://github.com/ant-design/ant-design/issues/1617)
- 修复 Menu `horizontal` 和 `vertical` 模式不支持受控 `openKeys` 的问题。

### 其他改进

- 样式变量梳理，去除了部分无用的变量，另外还有大量样式细节问题修复。
- 使用 ES2016 classes 重构了代码。[@waywardmonkeys](https://github.com/waywardmonkeys)
- Popover、Popconfirm 和 Tooltip 组件根据不同的弹出位置有了更精准方向的弹出动画。
- 补充 Select TreeSelect Switch Radio Checkbox 等组件的 `focus` 表现，增强表单组件的可用性。[#1358](https://github.com/ant-design/ant-design/issues/1358)
- message 和 notification 现在可以全局配置 `duration`。[#1143](https://github.com/ant-design/ant-design/issues/1143)
- DatePicker 和 TimePicker 的 `onChange(date, dateString)` 方法增加第二个参数用于获得格式化后的日期字符串。[#1104](https://github.com/ant-design/ant-design/issues/1104)
- DatePicker 和 DatePicker.RangePicker 现在可以设置内部 TimePikcer 的属性。[#1415](https://github.com/ant-design/ant-design/issues/1415)
- Checkbox
  - 支持类似 Radio 的使用方式 `<Checkbox>option</Checkbox>`。[#1029](https://github.com/ant-design/ant-design/issues/1029)
  - Checkbox.Group 现在允许 `label` 和 `value` 不同。[#1025](https://github.com/ant-design/ant-design/issues/1025)
  - Checkbox.Group 允许单独设置某个 Checkbox 为 `disabled`。[#1218](https://github.com/ant-design/ant-design/issues/1218)
- Breadcrumb
  - 支持路由模式下自定义链接 `linkRender`。[#1026](https://github.com/ant-design/ant-design/issues/1026)
  - 支持路由模式下自定义最后一项内容 `nameRender`。[#1304](https://github.com/ant-design/ant-design/issues/1304)
- Modal
  - 新增 `Modal.warning` 方法。
  - 弹出时背景不再跟随滚动。[#1195](https://github.com/ant-design/ant-design/issues/1195)
- Select
  - 搜索框和单选选择框合并，以优化视觉和交互效果。
  - 优化多选框的选中效果。
- Spin
  - 增加延时展示以优化体验。[#1273](https://github.com/ant-design/ant-design/issues/1273)
  - 增加 `tip` 属性用于定义加载文案。[#1046](https://github.com/ant-design/ant-design/issues/1046)
- Steps
  - 重构布局方式，以支持更灵活的自适应布局和优化了性能，并移除了 `maxDescriptionWidth` 属性。[#1099](https://github.com/ant-design/ant-design/issues/1099)
  - 新增 `status` 属性以指定当前步骤状态，同时支持错误步骤的展示。[#1098](https://github.com/ant-design/ant-design/issues/1098)
- Timeline
  - 新增 `dot` 属性，可自定义时间轴点。
  - 现在可以设置 `className` 和 `style` 的问题。
  - `color` 属性现在支持自定义色值。
- Tree
  - 当子节点被选中时，自动展开父节点。
  - 新增 `checkStrictly` 属性，支持父子节点选中关系脱离。
- Upload
  - 在上传文件列表中的文件被删除时，将触发 `onRemove` 事件。[#1240](https://github.com/ant-design/ant-design/issues/1240)
  - 增加 `onPreview` 支持文件的自定义预览方式。[#1240](https://github.com/ant-design/ant-design/issues/1240)
  - `data` 属性支持设为一个函数，用于动态修改上传参数。[react-component/upload#32](https://github.com/react-component/upload/pull/32)
- Slider `marks` 现在支持 JSX 并可以单独设置某个标记的样式。
- Tag 的 `onClose` 可以使用 `e.preventDefault()` 阻止默认事件。[#1267](https://github.com/ant-design/ant-design/issues/1267)
- Form.Item 在有多个 child 时也可以自动生成错误信息与校验状态，但一个 Form.Item 内仍然只能有一个表单控件。[#1287](https://github.com/ant-design/ant-design/issues/1287)
- Input 新增 `onPressEnter` 属性监听回车事件。
- Table 现在可以通过 `filteredValue` `sortOrder` 控制筛选和排序的状态。[#971](https://github.com/ant-design/ant-design/issues/971)
- Button 增加了 `icon` 属性。[#1199](https://github.com/ant-design/ant-design/issues/1199)
- SubMenu 增加 `onTitleClick` 属性。
- Affix 增加 `offsetBottm` 属性，支持固定在底部。[#1000](https://github.com/ant-design/ant-design/issues/1000)

### 相关工具发布

- [antd-init](http://github.com/ant-design/antd-init) 同步发布 `1.0.0` 版本，享受最新 [ant-tool](https://github.com/ant-tool/) 工具带来的流畅开发体验。
- [Ant Motion](http://motion.ant.design) 全新的动效设计解决方案。
- [Ant UX](http://ux.ant.design/) 发布 1.0 版本，提供多种平台的流程素材支持。

## 0.12.17

`2016-05-05`

- 修复 FormItem 校验时表单项高度跳动的问题。[#1557](https://github.com/ant-design/ant-design/issues/1557)
- 修复一个 Table 圆角样式的小问题。

## 0.12.16

`2016-04-27`

- 修复 Collapse 在 safari 中切换动画异常的问题。[#1494](https://github.com/ant-design/ant-design/issues/1494)
- 修复 Table 的 selectedRowKeys 在初次渲染时失效的问题。[#1501](https://github.com/ant-design/ant-design/issues/1501)
- Table 现在点击选择框时将不再触发 `onRowClick`。[#1470](https://github.com/ant-design/ant-design/issues/1470)
- 修复一个 Calender 服务端渲染时提示 `Option is not defined` 的问题。[#1521](https://github.com/ant-design/ant-design/issues/1521)
- 修复 Menu 动态切换模式时的一些细节问题。
- 优化了 export 导出图标。
- 修复 Form 的一些样式细节。

## 0.12.15

`2016-04-21`

- 升级 rc-collapse 修复一个性能问题。
- 修复一个 Collapse 内嵌 Tabs 的选中项样式问题。[#1451](https://github.com/ant-design/ant-design/issues/1451)
- 修复 Input 组件服务端渲染报错的问题。[#1321](https://github.com/ant-design/ant-design/issues/1321)
- 修复 Tag 组件调用了两次 afterClose 的问题。[#1435](https://github.com/ant-design/ant-design/issues/1435)
- 修复一个 Table 控制模式的问题。[#1434](https://github.com/ant-design/ant-design/issues/1434)
- 修复一个 Tabs 相互嵌套的样式问题。[#1435](https://github.com/ant-design/ant-design/issues/1435)
- 修复 Dropdown.Button 点击右边也触发 onClick 的问题。
- 修复 Radio.Button 在 IE8 下无法选择的问题。[#1459](https://github.com/ant-design/ant-design/issues/1459)
- 优化了 Button 点击后仍然有 focus 效果的问题。

## 0.12.14

`2016-04-13`

- Form 和 Form.Item 支持 style 属性。[#1290](https://github.com/ant-design/ant-design/issues/1290)
- 修正 IE9 下没有 prefix css3 属性的问题。
- 修正 Table 中指定了 pagination.current 时依然能响应用户操作的问题。[#1311](https://github.com/ant-design/ant-design/issues/1311)
- 修正 Table 的单选模式无法用 `selectedRowKeys` 控制的问题。[#1346](https://github.com/ant-design/ant-design/issues/1346)
- 修正 DatePicker 启用 showTime 时时区失效的问题。[#1356](https://github.com/ant-design/ant-design/issues/1356)
- 修正 Menu、Progress、Form、Table、Select、Pagination、Cascader 的样式细节问题。
- 修正 Breadcrumb 不支持 IndexRoute 的问题。[#1375](https://github.com/ant-design/ant-design/issues/1375)
- 修正 Table 的筛选菜单 filters 的 value 为数字时无法选中的问题。
- 修正 DatePicker 面板输入框的日期格式 format 和外面不一致的问题。[#1403](https://github.com/ant-design/ant-design/issues/1403)

## 0.12.13

`2016-03-29`

- 按照最新的规范修正 Message、Alert、Notification 的默认图标。
- 统一梳理和优化了各浮层组件的 `z-index`，并增加了对应的 less 变量。
- 修复一个 Breadcrumb 组件未指定 breadcrumbName 导致的解析问题。[#1251](https://github.com/ant-design/ant-design/pull/1251)
- 现在 Upload 服务端返回数据不是 JSON 格式时将不判断为出错。[#1248](https://github.com/ant-design/ant-design/issues/1248)
- 修复 Cascader 在 Chrome 下无法滚动菜单的问题。
- 修复 Select、Radio、Progress、Table、DatePicker 的一些样式细节。

## 0.12.12

`2016-03-18`

- 更新了设计资源文件 `Axure Components` 和 `Axure Box`。
- 修复 Popover 和 Popconfirm 箭头消失的问题。
- 修复一个 Table 切换分页长度时的页码溢出的问题。

## 0.12.11

`2016-03-16`

- 全新的设计文档 `语言` 部分。
- 修复 Popconfirm `onConfirm` 和 `onCancel` 时没有触发 `onVisibleChange` 的问题。
- TreeSelect 组件补充 `showCheckedStrategy` 属性，支持回填数据的不同展示方式。
- 补充 Modal `align` 属性的文档。
- 修复 Menu 弹出菜单 `z-index` 丢失的问题。
- Progress 的默认颜色固定，不再随着主色变化。
- 优化 Button 点击动画在 Chrome 下的效果。
- 修复一个 Affix 的 `z-index` 太低的问题。
- 修复 Table 树形数据的二级节点列前无法选择的问题。[#1212](https://github.com/ant-design/ant-design/issues/1212)
- 修复 Table 修改 `pageSize` 没有触发 `onChange` 的问题。[#1206](https://github.com/ant-design/ant-design/issues/1206)
- 修复 Table 指定 `rowKey` 时导致 `rowSelection.onChange` 的 `selectedRows` 参数为空的问题。

## 0.12.10

- 修复 0.12.9 版本 npm 包打包错误的问题。

## 0.12.9

`2016-03-11`

- Transfer
  - 可以定义 `notFoundContent `。
  - 修复 `searchPlaceholder` 使用了 `placeholder` 的值的问题。
- 修复 Popconfirm、Popover、Tooltip 的箭头位置未指向元素的问题。
- 修正 Badge 在搜狗等旧版 webkit 浏览器下无法使用的问题。
- 调整 Tabs 样式。
- 修复 Table 中的 Pagination 默认配置问题。
- 调整 Form.Item 在 inline 模式下的 `margin-bottom`。[#1141](https://github.com/ant-design/ant-design/issues/1141)
- 修复 DatePicker `style` 设置错误的问题。
- 优化 Popconfirm、Button 样式。
- Dropdown 增加默认的 mouseEnterDelay 延迟以优化体验。
- 修复 Dialog 样式问题。
- 修复 Upload 上传中的状态问题。[#1159](https://github.com/ant-design/ant-design/issues/1159)
- 优化 Menu、Tabs 在 Chorme 下的渲染问题。
- Form 默认阻止 submit 事件。

## 0.12.8

`2016-03-06`

- 新增 `heart` `calculator` 图标。
- Table 补充了 `showHeader` 和 `footer` 属性。
- Modal 补充了 `maskClosable` 属性。
- 修正一个 Tag 和 Popover 配合使用的问题。[#1111](https://github.com/ant-design/ant-design/issues/1111)
- 将 TreeSelect 的 `treeDefaultExpandAll` 默认属性设为 false，并优化了性能。
- 修复 RadioGroup 无法垂直布局的问题。[#1119](https://github.com/ant-design/ant-design/issues/1119)
- 统一了 less 文件的部分变量。
- 修正部分组件的样式。

## 0.12.7

`2016-03-03`

- 修正 Table 的 `rowSelect.onSelectAll` 的第三个参数 `deselectedRows` 为 `changeRows`，记录每次变化的列。

## 0.12.6

`2016-03-02`

- 优化 Table 本地排序在 Chrome 下的稳定性问题。
- 修正 Pagination 的 pageSize 属性为受控属性，并补充了 `defaultPageSize` 属性。[#1087](https://github.com/ant-design/ant-design/issues/1087)
- 优化 Select 的 combobox 模式的交互体验。
- 升级 react-slick 依赖到 `0.11`，修复自动播放有时会失效的问题。[#1009](https://github.com/ant-design/ant-design/issues/1009)
- 修复 TreeSelect 的 allowClear 属性失效的问题。[#1084](https://github.com/ant-design/ant-design/issues/1084)
- 修复 Input 组件的 className 属性失效的问题。[#1103](https://github.com/ant-design/ant-design/issues/1103)
- 修复 Dropdown 的 onClick 属性失效的问题。[#1097](https://github.com/ant-design/ant-design/issues/1097)
- 修复多个 CheckboxGroup 选项互相影响的问题。[#1101](https://github.com/ant-design/ant-design/pull/1101)
- 修复 FormItem 的子元素为 `null` 时报错的问题。
- 修复 Table 组件的选择功能和展开功能配合使用的问题。[#1102](https://github.com/ant-design/ant-design/issues/1102)
- 增加了一个搜索框和提示功能结合的 [例子](http://ant.design/components/select/#demo-search-box)。
- 允许可编辑的 Tabs 删除最后一个页签。[#1071](https://github.com/ant-design/ant-design/issues/1071)
- Table 的 `rowSelect.onSelectAll` 补充了第三个参数 `deselectedRows`, `rowSelect.onChange` 补充了第二个参数 `selectedRows`。[#1105](https://github.com/ant-design/ant-design/issues/1105)
- 修正部分组件的样式。

## 0.12.5

`2016-02-25`

- Pagination 支持 `showTotal` 属性。[#1077](https://github.com/ant-design/ant-design/pull/1077)
- Cascader 添加 `allowClear` 属性，允许隐藏清除按钮。
- 补充了一个带图标的搜索建议框的例子。[#1067](https://github.com/ant-design/ant-design/issues/1067)
- 修复 Transfer 在不支持 Object.assign 的浏览器上报错的问题。
- 修复 Cascader 在 Safari 下错位的问题。[#1066](https://github.com/ant-design/ant-design/issues/1066)
- 移除对 Button 圆角的降级方案。
- 修复了部分组件样式的小问题。

## 0.12.4

`2016-02-22`

- Radio 的 value 支持更多类型。[#1043](https://github.com/ant-design/ant-design/pull/1043)
- 修复 Spin 组件的大小、居中等样式问题。
- FormItem 补充 extra 属性的文档。[#931](https://github.com/ant-design/ant-design/issues/931)
- 修复的 Table 下树形数据和选择框配合时的样式问题。
- 修复一个水平表单的错误提示的样式错位问题。[#1040](https://github.com/ant-design/ant-design/issues/1040)
- 添加了一个轻微的 Button 点击动效。

## 0.12.3

`2016-02-19`

- DatePicker 补充 allowClear 属性，支持单选的清空。
- 修复显示时间的 DatePicker 的清空按钮失效的问题。
- 优化 DatePicker 的 `确定` 按钮失效样式。

## 0.12.2

`2016-02-19`

- DatePicker 如果有 `确定` 按钮，现在只有点击 `确定` 按钮才会触发 onChange 事件。
- 修复带时间选择的 DatePicker 日期格式缺少时间部分的问题。[#1005](https://github.com/ant-design/ant-design/issues/1005)
- 修复 DatePicker 内输入框多余的时间展示的问题。[#953](https://github.com/ant-design/ant-design/issues/953)
- 升级依赖 react-slick 到 `0.10`。
- 支持表单校验错误时自动滚动到第一个错误项。[#993](https://github.com/ant-design/ant-design/issues/993)
- 优化了 Select 和 TreeSelect 多选禁用的样式。
- Upload 列表项支持链接展现形式。[#1013](https://github.com/ant-design/ant-design/issues/1013)
- 修复 Safari 下的样式警告信息。[#999](https://github.com/ant-design/ant-design/issues/999)
- Cascader 支持 popupPlacement 位置配置。

## 0.12.1

`2016-02-03`

- 依赖升级到 `rc-pagination@1.4`、`rc-menu@4.10`、`rc-form@0.12`。
- 修复 TreeSelect 的不可用样式。
- DatePicker 补充 `getCalendarContainer` 属性，用于解决问题 [#991](https://github.com/ant-design/ant-design/issues/991)。
- 修正 Modal `onCancel` 的参数为点击事件。[#980](https://github.com/ant-design/ant-design/issues/980)
- 修复一个 Tooltip 内嵌套 Popconfirm 的问题。[#977](https://github.com/ant-design/ant-design/issues/977)
- 修复 DatePicker 和 RangePicker 的 `onOk` 一直不可用的问题。
- 修复一个 Badge 的 count 无法切换的问题。[#983](https://github.com/ant-design/ant-design/issues/983)

## 0.12.0

`2016-02-01`

- 新增 [级联选择(Cascader)](http://ant.design/components/cascader/) 组件。
- 新增 [树选择控件(TreeSelect)](http://ant.design/components/tree-select/) 组件。
- Form 自身支持校验功能，废弃 Validation。[演示](http://ant.design/components/form/#demo-validate-basic)
- Tabs
  - `activeKey` 修正为受控属性。
  - 当前项现在会始终显示。[#815](https://github.com/ant-design/ant-design/issues/815)
- Modal 可以配置右上关闭按钮是否显示。
- Select
  - 打开选项菜单时，自动滚动到选中项。
  - `combobox` 模式时，可配置是否默认选中第一项。[rc-select#38](https://github.com/react-component/select/issues/38)
- Table
  - filter 支持层级选择。
  - 支持行点击事件 `onRowClick`。
  - 支持多列的横向切换。[演示](http://ant.design/components/table/#demo-paging-columns)
  - 更换 `dataSource` 和变换页面时不再默认清除选择数据，你可以用 `selectedRowKeys` 手动控制。`原来默认清除的行为会触发一个数据更新的死循环，而且难以实现跨页选择。`
  - 支持固定表头。[演示](http://ant.design/components/table/#demo-fixed-header)
- Tag 去除 `href` 属性，默认标签名从 `a` 改为 `span`。
- Timeline 支持指定 pending 节点的内容。
- Tree
  - 节点支持拖拽。
  - 支持动态控制节点展开与否。[演示](http://ant.design/components/tree/#demo-basic-controlled)
  - 可以监听节点展开/关闭事件 `onExpand`。
  - `onCheck` `onSelect` 参数调整。
  - `onDataLoaded` 改为 `loadData`。
  - 新增 drag&drop 相关属性：
    - `onDragStart`
    - `onDragEnter`
    - `onDragOver`
    - `onDragLeave`
    - `onDrop`
  - 新增 TreeNode 节点属性：
    - `disableCheckbox`
    - `isLeaf`
- Transfer 给 `onChange` 增加参数。[#972](https://github.com/ant-design/ant-design/issues/972)
- DatePicker
  - 修复 RangePicker 开始结束日期相同的 bug。[#822](https://github.com/ant-design/ant-design/issues/822)
  - 修复 `format` 对浮层不生效问题。[#917](https://github.com/ant-design/ant-design/issues/917)
- TimePicker 修复一个 `value` 为 `null` 时没有进入受控模式的问题。
- Upload
  - 可以用 `headers` 设置上传头部。
  - 新增上传图片卡片样式。[演示](http://ant.design/components/upload/#demo-picture-card)
- Radio
  - 更换 Radio.Button 的展现样式。
  - 可以设置 Radio.Button 的大小。
- Progress
  - `format` 属性现在支持自定义 function 的方式进行定义。[#893](https://github.com/ant-design/ant-design/issues/893)
  - `format` 指定 string 和 React.Node 的方式被废弃。
  - 支持 `style` 属性。[#895](https://github.com/ant-design/ant-design/issues/895)
- message && notification 现在可以销毁。
- Button
  - 小号 Button 的圆角调整为 `4px`。
  - 修复 Button.Group disabled 后的样式问题。[#926](https://github.com/ant-design/ant-design/issues/926)
- BreadCrumb
  - 移除 `router` 属性，无需设置。
  - 修复一个链接参数不对的问题。

## 0.11.3

`2016-01-19`

- 修复 TimePicker 受控模式点选即关闭面板的问题。[#818](https://github.com/ant-design/ant-design/issues/818)
- 修复一个两栏的 TimePicker 点击右边空白处无法关闭面板的问题。[#826](https://github.com/ant-design/ant-design/issues/826)
- 修复 Table `pagination.onChange` 指定无效的问题。[#824](https://github.com/ant-design/ant-design/issues/824)
- 修复 Transfer 搜索功能失效的问题。
- 修复 DatePicker 的 MonthPicker 样式错乱的问题。
- 修复 RangePicker 时区无法设置的问题。[#837](https://github.com/ant-design/ant-design/issues/837)
- 修复二维码图标，新增一个扫描图标。[#772](https://github.com/ant-design/ant-design/issues/772)

## 0.11.2

`2015-01-03`

- 新增了[贡献文档](https://github.com/ant-design/ant-design/blob/master/CONTRIBUTING.md)。
- 修复一个 DatePicker 中选择的国际化文案问题。[#771](https://github.com/ant-design/ant-design/issues/771)
- 增加了一个高级搜索类型表单的[演示](http://ant.design/components/form/#demo-advanced-search-form)。
- Dropdown 支持多级的下拉菜单。[演示](http://ant.design/components/dropdown/#demo-sub-menu)
- Table
  - 新增 `rowSelection.onChange` 和 `rowSelection.selectedRowKeys`，完善选择功能。
  - 更新 dataSource 时，选中项现在会被清空。
  - 修复一个全选框和禁用的选择项配合的问题。
- 修复 `0.11.1`版本 menu 内嵌型菜单（inline）选中后关闭的问题。
- 修复 `0.11.1`版本对 React 版本要求太严的问题，对应的警告提示对于 `0.14.x` 将不再出现。
- 组件和文档的样式小调整。

## 0.11.1

`2015-12-29`

- 修复一个 Table 无法修改 pageSize 的问题。
- 修复一个 Table 子表格展开的对齐问题。
- 修复一个 Chrome 下部分图标左侧切边的问题。
- 修复搜索输入框在表单下使用的样式问题。[#762](https://github.com/ant-design/ant-design/issues/762)

## 0.11.0

`2015-12-28`

- **移除默认加载的样式文件，样式现在需要独立加载。**
- 按钮圆角调整为 `6px`。
- Modal、Popconfirm、Table、TimePicker 支持国际化配置。
- 新增虚线型按钮。
- 新增 [通用搜索框](http://ant.design/components/form/#demo-search-input) 样式。
- 新增图片上传列表样式[演示](http://ant.design/components/upload/#demo-picture-style)。
- **部分设计资源开放 [下载](http://ant.design/spec/tools)，包括 Axure 组件库和 Iconfont 字体打包文件。**
- 新增 [吊顶规范](http://ant.design/spec/layout/#demo-ceiling)。
- 组件演示页面增加锚点。
- 新增穿梭框 [Transfer](http://ant.design/components/transfer/) 组件。
- 新增小尺寸的 Switch 开关组件。
- 增加更多的图标。[#](https://github.com/ant-design/ant-design/commit/087c64649d73206a4d62e52f9b3f6042c1d28608#diff-dc1a1f4794c1c4ee3b083381d4c50c47R180)
- 全局微调了警告和错误状态色。
- Select
  - 选中样式进行了调整。
  - 在标签/多选模式下，选中或删除选项增加了动画效果。
- Alert
  - 默认样式不展示图标。
  - 带描述的警告框图标改为描线图标。
  - `type="warn"` 图标修改。
- Dropdown 新增带菜单触发的按钮 `Dropdown.Button`。[演示](http://ant.design/components/dropdown/#demo-dropdown-button)
- Menu
  - 新增 `Menu.ItemGroup` 用于把菜单项分组。
  - onOpen 和 onClose 函数的参数新增了 `keyPath` 数据，可用于制作手风琴类型的菜单。
- Badge
  - 徽章可以独立使用。[演示](http://ant.design/components/badge/#demo-no-wrapper)
  - 支持设置封顶的 `99+` 的数字。[演示](http://ant.design/components/badge/#demo-overflow)
- Slider
  - 增加 `onAfterChange` 事件。[演示](http://ant.design/components/slider/#demo-event)
  - 现在设置 `tipFormatter={null}` 可以隐藏 `Tooltip`。
  - 双滑块拖动体验优化，一个滑块在拖动时可以直接跨过另一滑块。
- Breadcrumb 可以自定义分隔符。[演示](http://ant.design/components/breadcrumb/#demo-separator)
- Popconfirm 添加 `visible` 属性，使其可以控制是否显示。[演示](http://ant.design/components/popconfirm/#demo-dynamic-trigger)
- 修复 Icon `ref` 引起的报错。
- 修复 Calendar 组件无法切换年/月的问题。[#757](https://github.com/ant-design/ant-design/issues/757)
- Checkbox 新增 `Checkbox.Group`，现可以方便的 [生成一组选择框](http://ant.design/components/checkbox/#demo-group)
- Tabs
  - 新增 [卡片式页签](http://ant.design/components/tabs/#demo-card)。
  - 调整 [新增和关闭页签](http://ant.design/components/tabs/#demo-editable-card) 的样式。
  - 现在支持页签的四个位置 `tabPosition="top|right|bottom|left"`。
  - 移除 `animation` 属性，并在 `tabPosition="top|bottom"` 时默认启用切换动画。
- Timepicker
  - **重命名为 TimePicker。**
  - 国际化属性 `locale` 结构发生了 [变化](https://github.com/ant-design/ant-design/issues/1270#issuecomment-201181384)。
  - 新增 `value` 属性。
  - 新增属性 `disabledHours` `disabledMinutes` `disabledSeconds`。[演示](http://ant.design/components/time-picker/#picker-demo-disable-options)
  - 移除 `hourOptions` `minuteOptions` `secondOptions`，新增 `hideDisabled` 属性用于替代。
- Datepicker
  - **重命名为 DatePicker。**
  - 新增 [日期范围选择控件](http://ant.design/components/date-picker/#picker-demo-range)。
  - 修改 `showTime` 的交互。[演示](http://ant.design/components/date-picker/#picker-demo-time)
  - 修正为受控组件。
- Table
  - **移除 `dataSource` 的远程模式。**
  - 新增 [紧凑型表格](http://ant.design/components/table/#demo-size)。
  - 允许监听分页的 `onShowSizeChange`。[演示](http://ant.design/components/table/#demo-paging)
  - 优化表格对树形数据的显示。[演示](http://ant.design/components/table/#demo-indent-size)
  - 优化了筛选菜单的样式，并添加了最大高度。[演示](http://ant.design/components/table/#demo-head)。
  - 修复 column.key 设置失效的问题。[#642](https://github.com/ant-design/ant-design/issues/642)
  - 修复设置时 rowKey 时单选会导致全部选中的问题。[#697](https://github.com/ant-design/ant-design/issues/697)
  - 修复一个列重新渲染导致选项错乱的问题。[#418](https://github.com/ant-design/ant-design/issues/418#issuecomment-163093580)
  - 修复选择列无法设置宽度的问题。[#649](https://github.com/ant-design/ant-design/issues/649)
- Form
  - 修复了 Textarea 无法输入的问题。[#646](https://github.com/ant-design/ant-design/issues/646)
  - 修复了 Textarea 设置 `cols` 和 `rows` 属性失效的问题。[#694](https://github.com/ant-design/ant-design/issues/694)
  - 修复无法设置 `className` 的问题。[#711](https://github.com/ant-design/ant-design/issues/711)
- 修复 Upload 组件在 `beforeUpload` 返回 `false` 后依然更新上传列表问题。[#757](https://github.com/ant-design/ant-design/issues/757)
- 工具
  - 替换 `antd build` 为 [atool-build](https://github.com/ant-tool/atool-build)，重构并改善了 webpack 配置的自定义方式。
  - 替换 `antd server` 为 [dora](https://github.com/dora-js/dora)，一个完全插件化的开发服务器，支持[代理转发和数据 Mock](https://github.com/dora-js/dora-plugin-proxy)、[atool-build](https://github.com/dora-js/dora-plugin-atool-build)、[热替换](https://github.com/dora-js/dora-plugin-hmr)。
  - 新增 babel 插件 [babel-plugin-antd](https://github.com/ant-design/babel-plugin-antd)，转换 `import {Button} from 'antd'` 为 `import Button from 'antd/lib/button'`。
  - 发布了 `antd-init@0.6.x`，支持以上改动。

> [0.11 升级指南](http://ant.design/docs/react/upgrade-notes#0-10-gt-0-11)

## 0.10.5

`2016-01-04`

- 修复 Table 更新 dataSource 后，选中项没有置空的问题。[#793](https://github.com/ant-design/ant-design/issues/793)

## 0.10.4

`2015-11-30`

- 将 media-match 加入默认的 polyfill 文件中。[5626974](https://github.com/ant-design/ant-design/commit/562697423b1139eb324c1dceb051c143f4870ed7)
- 修复了 [MonthPicker](http://ant.design/components/datepicker/#demo-month-picker) 报错问题，并增加了相关演示。
- 修复 RadioGroup 中的 Radio/RadioButton 无法单独设置 disabled 的问题。[#603](https://github.com/ant-design/ant-design/issues/603)
- 修复今天是不可选日期时的一个展示问题。[#606](https://github.com/ant-design/ant-design/issues/606)


## 0.10.3

`2015-11-26`

- 和 0.9.x 保持一致默认引入 `antd/lib/index.css`（而非 less 文件），方便第三方引用。引用 less 文件进行变量配置的可自行 `import 'antd/style/index.less'`。[#593](https://github.com/ant-design/ant-design/issues/593)
- 升级 Pagination，增加 `defaultCurrent` 属性，修正原来的 `current` 为[完全受控属性](https://facebook.github.io/react/docs/forms.html#controlled-components)。
- Pagination 的改动也修复了 Table 切换数据源后回到[第一页的例子](http://ant.design/components/table/#demo-ajax)。
- 对演示和样式代码增加了 lint 检查。


## 0.10.2

`2015-11-25`

- Slider 新增 `tipFormatter` 用于格式化 Tooltip 的内容。
- 优化 Badge 动画效果。
- 修复以下问题：
  - 文本域的表单校验无法重置。
  - 设置 Upload 的 `multiple` 为 `true` 时，未显示每个文件的上传进度。
  - Breadcrumb 配合 Router 的时候如果没有 `breadcrumbName` 会抛错。
  - InputNumber 同时设置 `size` `className` 时会有冲突。


## 0.10.1

`2015-11-20`

- 修改内部组件的引用结构，方便工具优化。[#566](https://github.com/ant-design/ant-design/pull/566)
  - 移除了演示中没有使用过的 `antd.ButtonGroup`，依然用 `const ButtonGroup = Button.Group` 来使用。
  - Form 和 Input 目录分离，`import { Form, Input } from 'ant/lib/form'` 的引用方式被废弃。

     现在可以 `import Form from 'ant/lib/form'` 和 `import Input from 'ant/lib/input'`。

     原有的 `import { Form, Input } from 'antd'` 则不受影响。

- 修复 Datepicker 的 `style` 和 `calendarStyle` 属性失效的问题，并将 `calendarStyle` 更名为 `popupStyle`。


## 0.10.0

`2015-11-20`

- 全面兼容 `react@0.14.x`。
- 新增 [时间选择 Timepicker](http://ant.design/components/timepicker/)、[日历 Calendar](http://ant.design/components/calendar/)、[加载中 Spin](http://ant.design/components/spin/) 组件。
- [Button](http://ant.design/components/button/)、[Iconfont](http://ant.design/components/icon/)、[Layout](http://ant.design/components/layout/)、[Form](http://ant.design/components/form/)、[Input](http://ant.design/components/form/#demo-input) 等样式模块改造为 React 组件。
- 新增 [Queue-anim](http://ant.design/components/queue-anim/) 组件，更换了原来的 enter-animation。
- 全新的[字体图标](/components/icon)。
  - 全面更新视觉风格，补充更多图标。[#313](https://github.com/ant-design/ant-design/issues/313)
  - 调整字体基线，告别对图标位置的特殊调节。(感谢 [iconfont.cn](http://iconfont.cn) 的鼎力支持)
- Datepicker、Dropdown、Select、Popover、Popconfirm 等浮层组件添加在空间不足的情况下自动调整位置功能。
- Popover、Tooltip、Popconfirm 组件支持 12 个方向。[#312](https://github.com/ant-design/ant-design/issues/312)
- 优先使用苹方字体。
- 统一 size 属性的可选值为 `small` `default` `large`。
- 开始初步补充[测试用例](https://github.com/ant-design/ant-design/tree/1a3a19793c0791201666fdcf0dbd12a30fad4be0/tests)。
- 提供主色系更换的[方案](https://github.com/ant-tool/xtool/tree/master/examples/customize-antd-theme)。[#384](https://github.com/ant-design/ant-design/issues/384)
- 添加[色彩换算工具](http://ant.design/spec/colors#色彩换算工具)。
- 添加布局和导航规范，以及[常用布局](http://ant.design/spec/layout/)。
- 文档支持标题和演示的锚点，方便分享文档和演示代码。
- 提供多版本的文档，在[主站](http://ant.design)的右下角提供切换按钮。
- [antd-bin](https://github.com/ant-tool/xtool) 升级到 `0.10`。
  - 拆分出 [antd-init](https://github.com/ant-design/antd-init) 和 [antd-build](https://github.com/ant-design/antd-build)。
  - 提供代理功能。
  - 提供 UI 测试功能。

#### 组件变更

- Table
  - 支持单选。[演示](http://ant.design/components/table/#demo-row-selection-radio-props)
  - 选择模式支持默认选中和不可用效果。[演示](/components/table/#demo-row-selection-props)
  - 列支持了 `colSpan` 和 `rowSpan` 配置。[演示](/components/table/#demo-colspan-rowspan)
  - 新增 `loading` 属性。
  - 筛选增加 `filterMultiple` 属性，支持单选的配置。
- Datepicker
  - 添加国际化支持。
  - 添加手动输入和清除功能。
  - 优化了视觉样式。
  - 修复不标准的日期格式导致显示错误的问题。
  - 用 `onChange` 属性代替 `onSelect` 属性。
- Validation 修复了 对 Datepicker、Input-number、Select 的支持，并添加了相关演示。
- Carousel 的依赖 react-slick 升级到 0.9.x，相关 API 也相应更新。
- Tree 组件支持完全受控模式。[#397](https://github.com/ant-design/ant-design/issues/397)
- Input Number
  - 组件输入体验优化，现在可以键入任意字符，失焦时格式化为合法值。
  - 修复不支持小数 step 的问题。[#530](https://github.com/ant-design/ant-design/issues/530)
- Tabs 新增[垂直页签功能](http://ant.design/components/tabs/#demo-vertical-left)。
- Upload 组件视觉优化，新增高级浏览器下的上传进度展示。[#311](https://github.com/ant-design/ant-design/issues/311)
- Menu
  - 视觉效果大幅优化。
  - 新增 [dark 主题](http://ant.design/components/menu/#demo-theme) 的样式。
  - 修复一个链接点击区域的问题。[#535](https://github.com/ant-design/ant-design/issues/535)
- Dropdown 用 onClick 代替 onSelect 作为推荐的使用方式，因为原有的 onSelect 只在变化时触发。
- Slider
  - 新增[双滑块功能](http://ant.design/components/slider/#demo-range)。
  - 优化 marks 属性的使用逻辑，使其可以和具体数值进行绑定。[slider#26](https://github.com//react-component/slider/issues/26)
  - 属性命名优化，用 `dots` 代替了 `withDots` 属性，用 `included` 代替了 `isIncluded`。
- Badge 当 `count` 为 0 时不展示。
- Progress 新增 `format` 属性，能够自定义展示的进度文案。
- Modal 新增 `confirmLoading` 属性。
- 新增 Radio.Button 的失效样式。
- 提供 IE8 下的圆角按钮[兼容方案](http://ant.design/components/button/#ie8-border-radius-support)。
- `antd.Notification()` 修正为 `antd.notification()`。
- 另有巨量样式的修复和优化。

> 备注：
>
> - [计划和推进 issue](https://github.com/ant-design/ant-design/issues/276)
> - [0.10 升级指南](http://010x.ant.design/docs/upgrade-to-0.10)

---

## 0.9.3 ~ 0.9.5

`2015-11-04`

* 增加对 React 版本的检测提示机制，0.9.x 序列只能使用 `react@~0.13.3`。


## 0.9.2

`2015-10-26`

* Tooltip 的 title 为空时不展示浮层。[9b53117](https://github.com/ant-design/ant-design/commit/9b5311791e73270c7c16a602ac74dd59719a5f76)
* 修复 Upload 文件列表链接的 target 属性。[340a170](https://github.com/ant-design/ant-design/commit/340a1702b6a7b065ac02d417c891e1886dfe470d)
* 修复 Datepicker 设置 defaultValue 时星期顺序错误的问题。[9ef1450](https://github.com/ant-design/ant-design/commit/9ef14500f3abfcc7081f8dceab8187ec835e3918)
* 修复一些小的样式问题。


## 0.9.1

`2015-09-26`

* 添加 Pagination pageSize 发生变化的回调。[#317](https://github.com/ant-design/ant-design/issues/317)
* 升级依赖 rc-upload 到 1.6.x，修复 IE8/9 下的兼容性问题。
* 升级依赖 rc-steps 到 1.3.x。
  * 新增 current 属性，方便配置当前的步骤。[#290](https://github.com/ant-design/ant-design/issues/290)
  * 修复因滚动条影响页面宽度导致的错位问题。
* 升级依赖 rc-menu 到 1.5.x。
  * 新增 onSelect 回调中返回参数 keyPath，从而支持只展开当前父级菜单的交互方式。[demo](http://ant.design/components/menu/#demo-sider-current)
  * 修复 hover 类型的弹出菜单能响应点击事件的问题。[react-component/menu#14](https://github.com/react-component/menu/issues/14)
* 修复一个 Table 的分页无法正确展示的问题。[#253](https://github.com/ant-design/ant-design/issues/253)
* 修复一个 combobox 选择框无法选中的问题。[0435ca6](https://github.com/ant-design/ant-design/commit/0435ca60e3b574bac3808a10ba3db62f482335fd)
* 修复 Radio.Button 在 IE 8 下不可用的问题。[#321](https://github.com/ant-design/ant-design/issues/321)
* 适配 breadcrumb 面包屑组件和 `react-router@1.0.0-rc1`。
* 修复只能同时弹出一个 Modal 通知框的问题。[d6a4094](https://github.com/ant-design/ant-design/commit/d6a4094bc4c72acd05be001c7e46dbd17092001a)
* 升级依赖 rc-tooltip 到 2.8.0，增加 overlayClassName 属性。
* 部分组件交互和视觉效果修正。


## 0.9.0

`2015-09-14`

* 新增 [timeline](components/timeline/) 和 [badge](components/badge/) 组件。
* 优化弹出层类组件的动画效果，使其更加流畅。
* 部分文案更新。
* 优化主站在小分辨率屏幕下的样式。
* 使用 instantclick 改造主站，加载速度有明显提升。
* antd-bin 升级到 [0.6.x](https://github.com/ant-design/antd-bin/blob/master/HISTORY.md) 。
* Upload **重构了 API 接口，不向下兼容**，支持自定义的功能扩展。
  * 新增 `onChange(file) {}` 接口，移出原来的 `onSuccess`、`onProgess`、`onError` 等接口。
  * 新增 `fileList` 和 `defaultFileList` 属性，以满足更多的自定义功能，具体见演示。
  * 设置 fileList 数组项的 url 属性可以作为链接展示在文件列表中方便下载。
  * 移除内建的上传成功或失败的信息提示，业务可自行实现。
  * 修正多文件选择上传时文件列表只展示一个文件的问题。
* Table
  * 新增可展开的 table。[#258](https://github.com/ant-design/ant-design/pull/258)
  * 新增无数据的展示样式。[4c54644](https://github.com/ant-design/ant-design/commit/4c54644116d46cb2510d2d475234529bad60e5d5)
  * 修复本地模式 `dataSource` 无法更新的问题。[6d2dcc4](https://github.com/ant-design/ant-design/commit/6d2dcc45393b6ec0ad1ba73caf8b1ec42353743f)
  * 修复远程模式 loading 失效的问题。[9b8abb2](https://github.com/ant-design/ant-design/commit/9b8abb219934c246970a84200818aa8f85974bdf)
  * 用 [reqwest-without-xhr2](http://npmjs.com/reqwest-without-xhr2) 代替了 reqwest，解决某些开发环境下 xhr2 依赖的问题。
* Select
  * 增加 label 属性，允许多选模式下展示标签（原来只能显示 value 值）。[演示](http://react-component.github.io/select/examples/mul-suggest.html)
  * 修复 combobox 模式下 value 失效的问题。
* Notification 修复不会自动消失的问题。[23fce55](https://github.com/ant-design/ant-design/commit/23fce559b0b2faf4e0b686a92dbcdd045727a464)
* Steps 新增竖版的步骤条。
* Carousel 修复 fade 模式下可以拖拽的问题。#212
* Collapse 修复动画不生效的问题。
* Datepicker 修复无法设置为空值的问题。
* Modal
  * 添加 [通知类型](http://ant.design/components/modal/#demo-info) 的对话框函数。
  * 用 `Modal.confirm()` 代替 `confirm()` 方法。
  * 修改为需要在 onCancel 手动设置 visible 属性来关闭。
* Message 添加 [加载中类型](http://ant.design/components/message/#demo-loading)。
* Radio 修改 Radio.Group 容器的盒模型属性为 inline-block 。
* Enter Animation
  * 大幅度的重构，全新 API 的设计。
  * 支持和 react-router 结合使用。


## 0.8.0

`2015-08-25`

这个版本是第一个稳定版，组件经过三期迭代，基本到齐，并有大量改进和变化，不向下兼容。

* 新增九个组件 `menu`、`upload`、`carousel`、`tree`、`notification`、`validation`、`affix`、`alert`、`enterAnimation`。目前共有组件 34 个，基本能满足后台类项目的组件需求。
* 新增设计文档部分，包括文字、色彩、动画。
* 重新梳理了设计和 React 实现部分的关系，强调了 Ant Design 的设计属性，并更新了网站的信息结构。
* 构建工具 `antd-bin` 升级到 `0.4.0` 版本，支持合并 webpack 配置，热替换（HMR）等特性，[详见](https://github.com/ant-design/antd-bin)。
* 组件动画优化和补充，体验更加流畅动感。
* 排查并修复 IE 和 safari 等浏览器的兼容问题。
* 大量代码重构，演示代码补充，文档更新、以及样式上的优化。

## 0.7.3

`2015-07-30`

* 小幅重构了 Table 分页，修复了分页导致的数据不展示的问题。
* 更新了部分文档。

## 0.7.2

`2015-07-27`

* 修复本地模式下 pagination 为 false 时数据无法显示的 [问题](https://github.com/ant-design/ant-design/commit/1954586665e59031eae5d2c8b2cdb08f83d64fcb)。
* 重构了 message 组件。
* 添加英文版说明文档 [README-en_US.md](https://github.com/ant-design/ant-design/blob/master/README-en_US.md)。
* 部分代码切换至 ES6 模式。
* 修正了部分组件的样式和演示，优化部分动画。

## 0.7.1

`2015-07-22`

* 修复了 Table 组件的 pagination 为 false 时分页未消失的 [问题](https://github.com/ant-design/ant-design/commit/01a6c0f1e6707b72a54ef30d073d148a87b391a8)。
* select 组件[选中后默认显示标签内容](https://github.com/ant-design/ant-design/issues/50)（原来是显示 value）。
* 修正了部分组件的样式和演示。
* 打包文件为 [umd 模式](https://github.com/ant-design/ant-design/commit/9b7b940cb417429d8fc57d83e252991b043d0f2f)。

## 0.7.0

`2015-07-21`

* 第一个公开版本，发布 `layout`、`iconfont`、`button`、`form`、`checkbox`、`radio`、`switch`、`slider`、`input-number`、`datepicker`、`select`、`tabs`、`steps`、`breadcrumb`、`collapse`、`pagination`、`modal`、`message`、`dropdown`、`popover`、`popconfirm`、`tooltip`、`progress`、`table` 等组件。
* 发布 [Ant Design 首页](http://ant.design/) 和入门文档。
