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

## 4.5.0

`2020-07-26`

- Avatar
  - 🐞 修复 Avatar `src` 图片地址失效时没有正确 fallback 的问题。[#25806](https://github.com/ant-design/ant-design/pull/25806)
  - 🆕 新增 Avatar.Group 用于展现一组头像集合。[#25192](https://github.com/ant-design/ant-design/pull/25192)
- DatePicker
  - 🛎 移除 DatePicker.XxxPicker 用法并于开发时推荐替换为 `picker='xxx'`。[#25768](https://github.com/ant-design/ant-design/pull/25768)
  - 🆕 提升日期组件悬停体验，当悬停在某个日期上时占位符将变为对应的日期格式化后的值。([#25050](https://github.com/ant-design/ant-design/issues/25050))。[#25784](https://github.com/ant-design/ant-design/pull/25784) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
  - 🆕 RangePicker `onCalendarChange` 支持 info。[#25568](https://github.com/ant-design/ant-design/pull/25568) [@Kim-Wing-Fung](https://github.com/Kim-Wing-Fung)
  - 🆕 DatePicker 支持 `panelRender` 以自定义渲染面板。[#25488](https://github.com/ant-design/ant-design/pull/25488)
- Form
  - 🐞 修复 Form.Item 有时候没有清理之前的错误信息的问题。[#25737](https://github.com/ant-design/ant-design/pull/25737)
  - 🐞 修复 Form.Item 在子 Form.Item 设置 `noStyle` 并校验失败时没有更新 `validateStatus` 的问题。[#25734](https://github.com/ant-design/ant-design/pull/25734)
  - 🐞 修复 Form 垂直布局时 Form.Item 设置 labelCol offset 不生效。[#25713](https://github.com/ant-design/ant-design/pull/25713) [@zhangchen915](https://github.com/zhangchen915)
  - 🆕 Form 错误信息节点增加属性 `role="alert"`。[#25735](https://github.com/ant-design/ant-design/pull/25735) [@AlbertAZ1992](https://github.com/AlbertAZ1992)
  - 🆕 Form.List 中的 `remove` 方法支持数组类型。[#25638](https://github.com/ant-design/ant-design/pull/25638) [@fireairforce](https://github.com/fireairforce)
  - 🆕 Form.Item 在用 render props 作为 children 时支持使用 `dependencies` 控制更新逻辑。[#25408](https://github.com/ant-design/ant-design/pull/25408)
  - 🆕 调整 Form.Item `validateFirst` 属性为依次执行校验，原并行逻辑改由配置 `parallel` 开启。[#25321](https://github.com/ant-design/ant-design/pull/25321)
- Calendar
  - 🐞 修复 Calendar 组件的 `validRange` 导致 `` 不生效 。[#25626](https://github.com/ant-design/ant-design/pull/25626) [@zhangchen915](https://github.com/zhangchen915)
  - 🐞 修复 Calendar 组件 MonthSelect 月份下拉筛选。[#25626](https://github.com/ant-design/ant-design/pull/25626) [@zhangchen915](https://github.com/zhangchen915)
- 🐞 修复 Table `getCheckboxProps` 返回的 `indeterminate` 不生效。[#25649](https://github.com/ant-design/ant-design/pull/25649)
- 🐞 修复 Select 清除按钮在 Form.Item 下位置不对的问题。[#25728](https://github.com/ant-design/ant-design/pull/25728)
- 🐞 修复 Pagination 翻页按钮的鼠标样式。[#25772](https://github.com/ant-design/ant-design/pull/25772)
- 🐞 修复 TreeSelect `treeNodeLabelProp` 会影响树节点展示内容的问题。[#25755](https://github.com/ant-design/ant-design/pull/25755)
- 🐞 修复 Carousel 在 React 严格模式下的 `findDOMNode` 废弃警告。[#25744](https://github.com/ant-design/ant-design/pull/25744)
- 🆕 Input 和 Input.TextArea 支持 `bordered` 属性。[#25617](https://github.com/ant-design/ant-design/pull/25617)
- 🆕 Message 新增 `useMessage` hook，以支持 `context` 访问。[#25422](https://github.com/ant-design/ant-design/pull/25422)
- 🆕 Tree 添加 `titleRender` 以支持全局设置 tree node 节点。[#25624](https://github.com/ant-design/ant-design/pull/25624)
- 🆕 Descriptions 新增 `extra` 属性。[#25512](https://github.com/ant-design/ant-design/pull/25512) [@zzz111](https://github.com/zzz111)
- 🆕 新增 `Modal.config` 用于全局配置 Modal 静态方法的 `rootPrefixCls`。[#25613](https://github.com/ant-design/ant-design/pull/25613)
- 🆕 Drawer 增加 `push` 属性用于自定义多层级 Drawer 之间的联动([#21382](https://github.com/ant-design/ant-design/issues/21382))。[#25445](https://github.com/ant-design/ant-design/pull/25445) [@jinxin0112](https://github.com/jinxin0112)
- 🆕 添加 Badge.Ribbon 缎带组件。[#25456](https://github.com/ant-design/ant-design/pull/25456)
- 💄 Card 操作面板颜色与主体颜色统一。[#25722](https://github.com/ant-design/ant-design/pull/25722)
- 💄 **Menu.Item 水平模式的蓝色指示线和下拉菜单宽度现在和其文字内容宽度一致。**[#25622](https://github.com/ant-design/ant-design/pull/25622)
- ⌨️ 提升 Alert/message/notification 组件的可访问性。[#25774](https://github.com/ant-design/ant-design/pull/25774)
- 🇭🇰 新增 zh-HK 本地化。[#7d7cbf8](https://github.com/ant-design/ant-design/commit/7d7cbf8) [@wuchu](https://github.com/wuchu)

## 4.4.3

`2020-07-20`

- 🐞 修复 Layout `trigger` 属性无法定制零宽触发器的问题。[#25653](https://github.com/ant-design/ant-design/pull/25653)
- 🐞 修复 Form.Item `help` 在校验失败时的样式。[#25582](https://github.com/ant-design/ant-design/pull/25582) [@zhangchen915](https://github.com/zhangchen915)
- 🐞 修复 Descriptions 在 Table `expandedRowRender` 样式异常的问题。[#25593](https://github.com/ant-design/ant-design/pull/25593)
- 💄 新增 `@zindex-popconfirm: 1060` less 变量，并将 `@zindex-tooltip` 提升为 `1070`。[#25693](https://github.com/ant-design/ant-design/pull/25693)
- 🛠 更新 `react-slick` 依赖优化包大小。[#25599](https://github.com/ant-design/ant-design/pull/25599)
- 🌐 改进加泰罗尼亚语 ca_ES 国际化。[#25583](https://github.com/ant-design/ant-design/pull/25583) [@albertms10](https://github.com/albertms10)
- 🇸🇦 改进阿拉伯语 ar_EG 国际化。[#25587](https://github.com/ant-design/ant-design/pull/25587) [@amir5000](https://github.com/amir5000)
- TypeScript
  - 🐞 修复 Upload `customRequest` 的 File 定义。[#25598](https://github.com/ant-design/ant-design/pull/25598) [@AlbertAZ1992](https://github.com/AlbertAZ1992)

## 4.4.2

`2020-07-11`

- 🛠 调整 Alert 组件关闭动画实现移除直接的 dom 操作。[#dd8e9f8](https://github.com/ant-design/ant-design/commit/dd8e9f8) [@Yunfly](https://github.com/Yunfly)
- Select
  - 🐞 修正了 Select 在搜索时纵向位移的问题。[#25536](https://github.com/ant-design/ant-design/pull/25536)
  - 💄 增加 `@select-item-selected-color` 以控制 Select 选项选中时的颜色。[#25476](https://github.com/ant-design/ant-design/pull/25476)
- 🐞 修复 Form.Item 警告 `preserve` 是无效 dom 属性的问题。[#25518](https://github.com/ant-design/ant-design/pull/25518)
- 🐞 修复当 Card 组件无边框时封面图边距的问题。[#25515](https://github.com/ant-design/ant-design/pull/25515) [@yutingzhao1991](https://github.com/yutingzhao1991)
- 💄 调整 Typography 样式添加 `overflow-wrap: break-word` 默认样式。[#25516](https://github.com/ant-design/ant-design/pull/25516)
- 🐞 修复 Table `expandedRowRender` 内嵌 Table 时单元格背景丢失的问题。[#25498](https://github.com/ant-design/ant-design/pull/25498)
- 🐞 修复 Radio.Button 上使用 Popover 时的位置异常问题。[#25449](https://github.com/ant-design/ant-design/pull/25449) [@zgoby](https://github.com/zgoby)
- 🐞 修复 RangePicker 在 `size=small` 时清除按钮的位置问题。[#25458](https://github.com/ant-design/ant-design/pull/25458)
- 🆕 Upload 支持上传非图片文件时在 `onChange` 事件中设置 `thumbUrl` 来展示缩略图。[#25432](https://github.com/ant-design/ant-design/pull/25432) [@AlbertAZ1992](https://github.com/AlbertAZ1992)
- 🐞 修复 Table 切换页条目数时 `onChange` 触发多次的问题。[#25520](https://github.com/ant-design/ant-design/pull/25520) [@zhangchen915](https://github.com/zhangchen915)
- 🛠 移除 `babel-runtime` 并添加 `@babel/runtime` 依赖，减少 gzipped 包体积 `18.6KB`。[#25530](https://github.com/ant-design/ant-design/pull/25530)
- 🇪🇸 改进 es_ES 国际化。[#25460](https://github.com/ant-design/ant-design/pull/25460) [@gersongams](https://github.com/gersongams)

## 4.4.1

`2020-07-06`

- Menu
  - 🐞 修复 Menu.Item 中内嵌的 `a` 标签颜色样式问题。[#25414](https://github.com/ant-design/ant-design/pull/25414) [@kaysonwu](https://github.com/kaysonwu)
  - 🐞 修复 Menu 内嵌菜单动画不正确问题。[#25341](https://github.com/ant-design/ant-design/pull/25341)
  - 💄 优化 Menu 菜单收缩动画。[#25301](https://github.com/ant-design/ant-design/pull/25301)
- 🐞 修复 Input 在禁用状态下背景颜色被 `error` 或 `warning` 的 Form.Item 覆盖的问题。[#25385](https://github.com/ant-design/ant-design/pull/25385)
- 🐞 修复 Table 固定列头最右侧的多余边框样式。[#25378](https://github.com/ant-design/ant-design/pull/25378)
- 🐞 修复 Grid 响应式监听函数没有正确销毁的问题。[#25319](https://github.com/ant-design/ant-design/pull/25319) [@zhangchen915](https://github.com/zhangchen915)
- 🐞 修复 Progress `successPercent` 警告信息修复 Progress `success.progress` 为 `success.percent`。[#25356](https://github.com/ant-design/ant-design/pull/25356) [@fireairforce](https://github.com/fireairforce)
- 🐞 修复 PageHeader 内 Tabs 不必要的 `margin-bottom`。[#25340](https://github.com/ant-design/ant-design/pull/25340) [@dickeylth](https://github.com/dickeylth)
- Form
  - 🐞 修复 Form.Item `hidden` 属性不生效的问题。[#25336](https://github.com/ant-design/ant-design/pull/25336)
  - 🐞 修复 Form.Item 在 `display: none` 的容器中提示信息可能不会消失的问题。[#25297](https://github.com/ant-design/ant-design/pull/25297)
- Radio
  - 🐞 修复 Radio.Group 报错 `Function components cannot be given refs` 的问题。[#25328](https://github.com/ant-design/ant-design/pull/25328)
  - 🐞 修复 Radio.Group 中 `children` 使用空格出现的样式异常问题。[#25304](https://github.com/ant-design/ant-design/pull/25304) [@ElderJames](https://github.com/ElderJames)
- 🐞 修复 Drawer 点击遮罩可能会触发多次关闭事件的问题。[#25313](https://github.com/ant-design/ant-design/pull/25313)
- 🐞 修复 Skeleton 中 Button/Avatar/Input/Image 默认宽度为 auto。[#25303](https://github.com/ant-design/ant-design/pull/25303)
- 🇺🇦 更新 uk_UA 国际化。[#25402](https://github.com/ant-design/ant-design/pull/25402) [@kitsoRik](https://github.com/kitsoRik)
- 🇳🇴 更新 nb_NO 国际化。[#25374](https://github.com/ant-design/ant-design/pull/25374) [@Johannes-Andersen](https://github.com/Johannes-Andersen)
- TypeScript
  - 🐞 修复 Slider `onChange` 定义问题。[#25358](https://github.com/ant-design/ant-design/pull/25358) [@CornerSkyless](https://github.com/CornerSkyless)
  - 🐞 修复 Tooltip 自定义颜色类型定义。[#25315](https://github.com/ant-design/ant-design/pull/25315) [@CornerSkyless](https://github.com/CornerSkyless)

## 4.4.0

`2020-06-29`

- 🔥 优化 RangePicker 交互，现在任意面板选择完毕后，另一个面板会自动弹出。[#25135](https://github.com/ant-design/ant-design/pull/25135)
- 🔥 新增 Skeleton.Image 组件。[#24805](https://github.com/ant-design/ant-design/pull/24805) [@fireairforce](https://github.com/fireairforce)
- Form
  - 🆕 Form 实例支持 `getFieldInstance`。[#24711](https://github.com/ant-design/ant-design/pull/24711)
  - 🆕 Form.Item 新增 `hidden` 属性用于隐藏表单项。[#25108](https://github.com/ant-design/ant-design/pull/25108)
  - 🆕 Form.Item 添加 `preserve` 属性以支持字段值清理。[#25186](https://github.com/ant-design/ant-design/pull/25186)
- Table
  - 🆕 Table 添加 `rowSelection.dirty` 以支持异步数据下保留 `key`。[#24718](https://github.com/ant-design/ant-design/pull/24718)
  - 🆕 Table `onChange` 添加 `action` 参数用于标示操作类型。[#24697](https://github.com/ant-design/ant-design/pull/24697)
  - 🐞 Table 支持 `rowSelection.checkStrictly` 来完全受控节点。[#24931](https://github.com/ant-design/ant-design/pull/24931)
  - 🐞 修复 Table `onSelectAll` 的 `changeRows` 参数不正确的问题。[#24931](https://github.com/ant-design/ant-design/pull/24931)
  - 🐞 修复 Table 树形数据叶节点行的展开按钮仍能被点击的问题。[#24931](https://github.com/ant-design/ant-design/pull/24931)
  - 🐞 修复 Table 展开图标隐藏时仍然有鼠标手型的问题。[#25170](https://github.com/ant-design/ant-design/pull/25170)
  - 🐞 修复 Table 展开图标隐藏时仍然有鼠标手型的问题。[#25170](https://github.com/ant-design/ant-design/pull/25170)
- TimePicker
  - 🐞 修复 TimePicker 面板 12 AM 显示为 0 AM 的问题。[#25174](https://github.com/ant-design/ant-design/pull/25174)
  - 🐞 修复 TimePicker 在 use12Hours 时没有用 0 ～ 23 来禁用小时的问题。[#25174](https://github.com/ant-design/ant-design/pull/25174)
  - 🐞 修复 TimePicker 没有根据小时禁用情况禁用 AM PM 的问题。[#25174](https://github.com/ant-design/ant-design/pull/25174)
  - 🐞 修复 TimePicker `Now` 按钮没有和 `hour|minute|second|step` 保持一致的问题。[#25174](https://github.com/ant-design/ant-design/pull/25174)
- Cascader
  - 🆕 Cascader 新增 `expandIcon` 来自定义次级菜单展开图标。[#24865](https://github.com/ant-design/ant-design/pull/24865)
  - 🆕 Cascader 增加 `dropdownRender` 属性用于扩展菜单。[#24812](https://github.com/ant-design/ant-design/pull/24812)
- Menu
  - 🆕 Menu 增加 `triggerSubMenuAction` 属性以支持配置菜单弹出的交互方式。[#25127](https://github.com/ant-design/ant-design/pull/25127) [@hydRAnger](https://github.com/hydRAnger)
  - 🐞 修复 Menu `theme="dark"` 时子菜单背景色为白色的问题。[#25205](https://github.com/ant-design/ant-design/pull/25205)
- Tabs
  - 🆕 Tabs 支持 `addIcon` 以自定义添加图标。[#25006](https://github.com/ant-design/ant-design/pull/25006)
  - 🐞 修复 Tabs 在 IE11 下无法关闭的问题。[#25200](https://github.com/ant-design/ant-design/pull/25200)
- Pagination
  - 🆕 Pagination 支持当 `pageSize` 改变时，`onChange` 的调用。[#24964](https://github.com/ant-design/ant-design/pull/24964) [@fireairforce](https://github.com/fireairforce)
  - 🐞 优化 Pagination 可访问性，修复一个 W3C 属性错误。[#25119](https://github.com/ant-design/ant-design/pull/25119)
- DatePicker
  - 🐞 修复 DatePicker 组件的月份和季度前后选择器 icon 的大小。[#25035](https://github.com/ant-design/ant-design/pull/25035) [@fireairforce](https://github.com/fireairforce)
  - 🆕 TimePicker 支持 `showNow` 属性。[#25032](https://github.com/ant-design/ant-design/pull/25032)
- Drawer
  - 🆕 Drawer 支持 `closeIcon` 属性。[#24842](https://github.com/ant-design/ant-design/pull/#24842)
  - 🐞 修复 Drawer 使用 `getContainer={false}` 时可能导致页面滚动条消失的问题。[#25273](https://github.com/ant-design/ant-design/pull/25273)
- 🆕 Rate `character` 支持通过 `(RateProps) => ReactNode` 自定义。[#24903](https://github.com/ant-design/ant-design/pull/24903)
- 💄 移除了垂直点状 Steps.Step 的 140px 宽度限制。[#24907](https://github.com/ant-design/ant-design/pull/24907)
- 🆕 Menution 新增 `autoSize` 属性以支持高度自适应。[#24961](https://github.com/ant-design/ant-design/pull/24961) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🆕 调整 Result `children` 显示位置到组件尾部。[#24945](https://github.com/ant-design/ant-design/pull/24945)
- 🆕 Radio.Group 新增 `optionType` 来设置 `options` 的 Radio 类型。[#24809](https://github.com/ant-design/ant-design/pull/24809)
- 🆕 Tag 新增 `closeIcon` 用以自定义关闭按钮。[#24885](https://github.com/ant-design/ant-design/pull/24885)
- 🆕 Dropdown 组件支持下拉框箭头。[#23869](https://github.com/ant-design/ant-design/pull/23869) [@wendellhu95](https://github.com/wendellhu95)
- 🆕 Collapse 增加了 `ghost` 属性来设置透明背景。[#24734](https://github.com/ant-design/ant-design/pull/24734)
- 🆕 Progress 组件支持自定义已完成进度条颜色。[#24655](https://github.com/ant-design/ant-design/pull/24655) [@fireairforce](https://github.com/fireairforce)
- 🆕 Typography copyable 属性支持 `icon` 和 `tooltips` 用于自定义图标和提示文案。[#25274](https://github.com/ant-design/ant-design/pull/25274) [@israelKusayev](https://github.com/israelKusayev)
- 🆕 Tree `showLine` 属性支持配置隐藏叶节点图标。[#25271](https://github.com/ant-design/ant-design/pull/25271)
- 🆕 BackTop 支持 `duration` 来设置回到顶部所需时间。[#25254](https://github.com/ant-design/ant-design/pull/25254)
- 🐞 修复 Select 点击下拉箭头时输入框不能获得焦点的问题。[#25212](https://github.com/ant-design/ant-design/pull/25212)
- 🐞 修复 Rate 半选时 `value` 被四舍五入的问题。[#24993](https://github.com/ant-design/ant-design/pull/24993)
- 🐞 修复 Notification 修改 `width` 时没有相对屏幕边缘对齐的问题。[#25168](https://github.com/ant-design/ant-design/pull/25168)
- 🐞 修正 InputNumber `max` 属性没有默认值的问题。[#25243](https://github.com/ant-design/ant-design/pull/25243)
- 🛠 给 Modal 组件增加了更多的 less 变量。[#24773](https://github.com/ant-design/ant-design/pull/24773) [@hicrystal](https://github.com/hicrystal)
- 💄 更快的 Switch 动画切换效果。[#25160](https://github.com/ant-design/ant-design/pull/25160)
- 🐞 修复 PageHeader 内 Tabs 多余的边框样式。[#25159](https://github.com/ant-design/ant-design/pull/25159)
- 🌐 增加了德语，意大利语和捷克语缺失的翻译。[#25233](https://github.com/ant-design/ant-design/pull/25233) [@karelsoupaEMZ](https://github.com/karelsoupaEMZ)
- 🇯🇵 增加了 Form 的日语国际化。[#25244](https://github.com/ant-design/ant-design/pull/25244) [@kentaro84207](https://github.com/kentaro84207)
- RTL
  - 🐞 修复 Table RTL 模式下的嵌套表格样式。[#25156](https://github.com/ant-design/ant-design/pull/25156)
  - 🐞 修复 Table RTL 模式下，筛选和排序的头部样式。[#25152](https://github.com/ant-design/ant-design/pull/25152)
  - 🐞 修复 InputNumber RTL 模式下输入框内显示。[#25146](https://github.com/ant-design/ant-design/pull/25146)

## 4.3.5

`2020-06-21`

- 🐞 修复 Input.Search 作为 AutoComplete 自定义组件会崩溃的问题。[#25049](https://github.com/ant-design/ant-design/pull/25049)
- 🛠 使用 hooks 重写 Input.Password。[#25012](https://github.com/ant-design/ant-design/pull/25012) [@Rustin-Liu](https://github.com/Rustin-Liu)
- 🐞 修复 PageHeader 从 `4.3.0` 后的 `tabs` 样式错误。[#24991](https://github.com/ant-design/ant-design/pull/24991)
- 🐞 修复 Backtop 没有完全隐藏的问题。[#25132](https://github.com/ant-design/ant-design/pull/25132) [@jesse3mh9a](https://github.com/jesse3mh9a)
- 🐞 修复 Upload 不支持包裹 Popover 的问题。[#25090](https://github.com/ant-design/ant-design/pull/25090)
- 🐞 修复 Tabs 内容会超出容器宽度的问题。[#25072](https://github.com/ant-design/ant-design/pull/25072)
- 🐞 修复 DataPicker/TimePicker 时间下拉选对齐问题。[#25019](https://github.com/ant-design/ant-design/pull/25019)
- Table
  - 💄 优化 Table 筛选菜单为空时的 UI。[#25073](https://github.com/ant-design/ant-design/pull/25073)
  - 🐞 修复 Table 嵌套 Table 时的边框样式问题。[#24995](https://github.com/ant-design/ant-design/pull/24995)
  - 💄 缩小了 Table 筛选菜单的最大高度。[#25001](https://github.com/ant-design/ant-design/pull/25001)
- Descriptions
  - 🐞 修复 Descriptions 双击会同时选中标签和内容的问题。[#24983](https://github.com/ant-design/ant-design/pull/24983) [@harupy](https://github.com/harupy)
  - 💄 修正了 Descriptions 在 Safari 下标签文本没有左侧对齐的问题。[#25018](https://github.com/ant-design/ant-design/pull/25018)
- 💄 修正了 List.Item.Meta 内容宽度有时会溢出的问题。[#24992](https://github.com/ant-design/ant-design/pull/24992)
- 🐞 修复 Menu.SubMenu 在紧凑模式下暗黑主题的背景颜色。[#24997](https://github.com/ant-design/ant-design/pull/24997)
- ⚡️ 减少 Button `3KB` 样式打包体积。[#24996](https://github.com/ant-design/ant-design/pull/24996)
- 🇹🇷 优化土耳其语语言包。[#25100](https://github.com/ant-design/ant-design/pull/25100) [@smddzcy](https://github.com/smddzcy)
- TypeScript
  - 导出 Tree `DataNode` 定义。[#25065](https://github.com/ant-design/ant-design/pull/25065) [@jinxin0112](https://github.com/jinxin0112)

## 4.3.4

`2020-06-14`

- Form
  - 🐞 修复 Form 中配置 `validateTrigger` 无效的问题。[#24979](https://github.com/ant-design/ant-design/pull/24979)
  - 🐞 修复 Form.Item 在组件设置 `id` 时仍然会替换它的问题。[#24929](https://github.com/ant-design/ant-design/pull/24929)
  - 🐞 修复 Form.List 嵌套使用 `noStyle` 时，错误信息展示混乱的问题。[#24867](https://github.com/ant-design/ant-design/pull/24867)
- Table
  - 🐞 修复 Table 的 `shouldCellUpdate` 缺少 `prevRecord` 参数的问题。[#24963](https://github.com/ant-design/ant-design/pull/24963)
  - 🐞 修复 Table 受控状态下列的过滤菜单显示的值和 `filteredValue` 不同步的问题。[#24952](https://github.com/ant-design/ant-design/pull/24952)
  - 🐞 修复 Table 在多列排序时 `onChange` 获得错误排序状态的问题。[#24852](https://github.com/ant-design/ant-design/pull/24852)
- 🐞 修复 Modal 缺少 `confirm()` 默认图标。[#24956](https://github.com/ant-design/ant-design/pull/24956)
- 🐞 修复 List `grid` 属性在 React.Framgment 或者封装了的 List.Item 上失效的问题。[#24955](https://github.com/ant-design/ant-design/pull/24955)
- 🐞 修复 Avatar 图片加载错误的显示问题。[#24944](https://github.com/ant-design/ant-design/pull/24944) [@sosohime](https://github.com/sosohime)
- 🐞 修复 Drawer `getTargetContainer` 属性没有被忽略的问题。[#24938](https://github.com/ant-design/ant-design/pull/24938)
- 🐞 修复 Tabs 下拉框标题过长时被截断的问题。[#24928](https://github.com/ant-design/ant-design/pull/24928)
- 🐞 修复 Carousel 在 Tabs 下切换时会跳跃的问题。[#24873](https://github.com/ant-design/ant-design/pull/24873)
- 🐞 修复 Transfer 在关闭 tree shaking 后打包尺寸增加的问题。[#24847](https://github.com/ant-design/ant-design/pull/24847) [@DavidSichau](https://github.com/DavidSichau)
- 💄 新增 `@rate-star-hover-scale` 控制 Rate 鼠标悬浮放大比例。[#24917](https://github.com/ant-design/ant-design/pull/24917)
- 💄 新增 `@divider-orientation-margin` less 变量，以控制 Divider 设置了 `orientation` 时的左侧距离。[#24877](https://github.com/ant-design/ant-design/pull/24877)
- 🌐 Localization
  - 🇫🇷 改进 fr_FR 语言包。[#24962](https://github.com/ant-design/ant-design/pull/24962) [@sharkyze](https://github.com/sharkyze)
- TypeScript
  - 🛠 导出 Select 的 `OptionProps` 接口。[#24870](https://github.com/ant-design/ant-design/pull/24870) [@nitinknolder](https://github.com/nitinknolder)
  - 🛠 导出 Card 的 `CardInterface` 接口。[#24866](https://github.com/ant-design/ant-design/pull/24866) [@THPubs](https://github.com/THPubs)
  - 🛠 从 Table `TableProps` 中去除 `emptyText` 定义。[#24948](https://github.com/ant-design/ant-design/pull/24948) [@hehex9](https://github.com/hehex9)
  - 🛠 为 Upload `method` 属性添加 `patch` 类型。[#24936](https://github.com/ant-design/ant-design/pull/24936) [@miclle](https://github.com/miclle)

## 4.3.3

`2020-06-07`

- 🐞 修复 Drawer 无法显示的问题。[#24802](https://github.com/ant-design/ant-design/pull/24802)
- 🐞 修复 Menu.SubMenu 滚动区域无法交互的问题。[#24806](https://github.com/ant-design/ant-design/pull/24806)

## 4.3.2

`2020-06-06`

- 🐞 修复 Tag.CheckableTag 不支持 `onClick` 和 `stopPropagation` 的问题。[#24743](https://github.com/ant-design/ant-design/pull/24743)
- 🐞 修复 Drawer 支持通过 ConfigProvider 来全局设置 `getPrefixCls` 和 `getPopupContainer`。[#24727](https://github.com/ant-design/ant-design/pull/24727)
- 🐞 修复 Button 在父组件重新渲染时 `loading.delay` 会重复触发的问题。[#24713](https://github.com/ant-design/ant-design/pull/24713)
- 🐞 修复 Dropdown 带图标 `icon` 菜单项的链接色彩。[#24707](https://github.com/ant-design/ant-design/pull/24707) [#24702](https://github.com/ant-design/ant-design/pull/24702)
- Select
  - 🐞 修复 Select 在紧凑模式下表现不正常。[#24706](https://github.com/ant-design/ant-design/pull/24706)
  - ⚡️ 优化 Select 多选模式的性能。[#24785](https://github.com/ant-design/ant-design/pull/24785) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🐞 修复 Calendar 在同一个面板下选择日期也会触发 `onPanelChange` 的问题。[#24695](https://github.com/ant-design/ant-design/pull/24695)
- 🐞 修复 Input 组件在 IE11 中高度异常问题。[#24673](https://github.com/ant-design/ant-design/pull/24673) [@xiaosongxiaosong](https://github.com/xiaosongxiaosong)
- 🐞 修复 Radio 的 TypeScript 定义错误。[#24693](https://github.com/ant-design/ant-design/pull/24693) [@hengkx](https://github.com/hengkx)
- 🐞 修复 Statistic 不能包裹 Tooltip 的问题。[#24782](https://github.com/ant-design/ant-design/pull/24782)
- 🐞 修复 TimePicker.RangePicker 指定 `className` 后无边框样式失效的问题。[#24781](https://github.com/ant-design/ant-design/pull/24781)
- 🐞 修复 List 翻页时 `onChange` 不触发的问题。[#24514](https://github.com/ant-design/ant-design/pull/24514)
- 🌐 国际化
  - 🇮🇱 Form 校验文案增加希伯来语（以色列）。[#24716](https://github.com/ant-design/ant-design/pull/24716) [@israelKusayev](https://github.com/israelKusayev)
  - 🇰🇷 Form 校验文案增加韩文。[#24783](https://github.com/ant-design/ant-design/pull/24783) [@Jaewoook](https://github.com/Jaewoook)
- 💄 新增 less 变量 `@table-font-size`，`@table-font-size-md` 和 `@table-font-size-sm`，用于自定义 Table 文字大小。[#24714](https://github.com/ant-design/ant-design/pull/24714) [@morenyang](https://github.com/morenyang)
- RTL
  - 💄 优化 Tabs 标签下拉框在 RTL 模式下样式。[#24715](https://github.com/ant-design/ant-design/pull/24715)
  - 💄 增加 `Modal.method()` RTL 模式支持，仅限 hooks 用法。[#24682](https://github.com/ant-design/ant-design/pull/24682)
  - 💄 修复 Badge RTL 模式位置偏移量设置。[#24724](https://github.com/ant-design/ant-design/pull/24724)

## 4.3.1

`2020-06-02`

- Tabs
  - 🐞 修复 Tabs `hideAdd` 无效的问题。[#24621](https://github.com/ant-design/ant-design/pull/24621)
  - 🐞 修复 Tabs 下拉菜单内在 Firefox 下出现水平滚动条。[#24677](https://github.com/ant-design/ant-design/pull/24677)
  - 🐞 修复 Tabs 配合 `react-sticky` 使用时下划线遗失问题。[#24643](https://github.com/ant-design/ant-design/pull/24643)
  - 💄 调整 Tabs `tabBarStyle` 的展示样式。[#24620](https://github.com/ant-design/ant-design/pull/24620)
- Button
  - 🐞 修复 Button 将 `loading` 从 `delay` 快速切换至 `false` 时仍然会变成加载状态的问题。[#24678](https://github.com/ant-design/ant-design/pull/24678)
  - 🐞 修复 Text Button 在 `danger` 时样式不一致的问题。[#24622](https://github.com/ant-design/ant-design/pull/24622) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Table 包裹在 Row 中时无法展现横向滚动条的问题。[#24661](https://github.com/ant-design/ant-design/pull/24661) [@zt123123](https://github.com/zt123123)
- 🐞 修复 Drawer 会报 dom 节点设置 `dropdownMatchSelectWidth` 的警告信息。[#24651](https://github.com/ant-design/ant-design/pull/24651)
- 🐞 调整 Steps 现支持 `children` 下使用 React.Fragment。[#24644](https://github.com/ant-design/ant-design/pull/24644)
- 🐞 解决 Upload 删除图标键盘无法导航操作的问题。[#24615](https://github.com/ant-design/ant-design/pull/24615) [@morenyang](https://github.com/morenyang)
- 🐞 修复多选 Select 输入框的光标展示问题。[#24631](https://github.com/ant-design/ant-design/pull/24631)
- 🐞 修复 Radio.Group 设置 `options` 报错的问题。[#24631](https://github.com/ant-design/ant-design/pull/24631)
- RTL
  - 💄 调整 Notification RTL 模式下默认弹窗位置为左上。[#24632](https://github.com/ant-design/ant-design/pull/24632)
- TypeScript
  - 🛠 导出 Tabs `TabPaneProps` 定义。[#24648](https://github.com/ant-design/ant-design/pull/24648)

## 4.3.0

`2020-05-31`

- 🔥 重做 Tabs 以提升多标签在不同环境下的用户体验，**DOM 结构完全重写**，请注意覆盖样式丢失的问题。[#24552](https://github.com/ant-design/ant-design/pull/24552)
- 📖 新增组件[总览页面](https://ant.design/components/overview-cn)。[#24491](https://github.com/ant-design/ant-design/pull/24491) [@arvinxx](https://github.com/arvinxx)
- 🛠 增加大量功能，同时减少了包体积（相比 `4.2.5` 减少了 2KB）。[#24584](https://github.com/ant-design/ant-design/pull/24584)
- Button
  - 🆕 新增文本类型按钮 `type="text"`。[#22552](https://github.com/ant-design/ant-design/pull/22552)
  - 💄 优化 Button 背景 less 变量的影响范围。[#24372](https://github.com/ant-design/ant-design/pull/24372) [@morenyang](https://github.com/morenyang)
- Upload
  - 🆕 `data` 属性支持返回 `Promise`。[#24546](https://github.com/ant-design/ant-design/pull/24546) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
  - 🆕 添加 `progress` 属性以支持自定义进度条。[#24319](https://github.com/ant-design/ant-design/pull/24319) [@morenyang](https://github.com/morenyang)
  - 🐞 修复进度条类型会被意外覆盖的问题。[#24339](https://github.com/ant-design/ant-design/pull/24339) [@morenyang](https://github.com/morenyang)
- Table
  - 🆕 Table 新增 `rowSelection.hideSelectAll` 用于隐藏全选框。[#24592](https://github.com/ant-design/ant-design/pull/24592) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
  - 🆕 `ellipsis` 支持 `showTitle` 以关闭自动设置 `title` 属性。[#24056](https://github.com/ant-design/ant-design/pull/24056) [@lijinke666](https://github.com/lijinke666)
  - 🆕 Table `columns` 支持 `shouldCellUpdate` 属性。[#23872](https://github.com/ant-design/ant-design/pull/23872)
- Input
  - 🆕 Input.Passowrd 支持自定义图标。[#23792](https://github.com/ant-design/ant-design/pull/23792)
  - 🐞 修复 Input.Password 一个明文显示 `value` 的问题。[#24535](https://github.com/ant-design/ant-design/pull/24535)
  - 💄 添加 `@input-disabled-color` less 变量。[#23775](https://github.com/ant-design/ant-design/pull/23775) [@alwaysloseall](https://github.com/alwaysloseall)
- Form
  - 🆕 Form 添加 `validateTrigger` 支持全局设置子字段校验时机。[#23972](https://github.com/ant-design/ant-design/pull/23972)
  - 🐞 修复 Form.Item 内联样式下 `label` 在狭窄空间被挤压的问题。[#24531](https://github.com/ant-design/ant-design/pull/24531)
  - 🐞 修复 Form.List 字段状态同步逻辑并添加嵌套字段示例。[#24009](https://github.com/ant-design/ant-design/pull/24009)
- Menu
  - 🆕 调整 Menu `inline` 模式下未设置 `icon` 的菜单收起时文字显示第一个字符。[#24330](https://github.com/ant-design/ant-design/pull/24330)
  - 🆕 Menu.Item 支持 `danger` 属性。[#23785](https://github.com/ant-design/ant-design/pull/23785)
- Avatar
  - 🆕 Avatar 新增 `gap` 来设置字符类型距离左右两侧边界单位像素。[#24357](https://github.com/ant-design/ant-design/pull/24357)
  - 🐞 修复 Avatar `onError` 会触发两次的问题。[#24506](https://github.com/ant-design/ant-design/pull/24506) [@sanonz](https://github.com/sanonz)
- Typography
  - 🆕 Typography.Paragraph 支持自定义展开样式。[#24385](https://github.com/ant-design/ant-design/pull/24385) [@fireairforce](https://github.com/fireairforce)
  - 🆕 Typography.Text 支持 `keyboard` 样式。[#24195](https://github.com/ant-design/ant-design/pull/24195)
  - 🆕 添加 Link 组件。[#24019](https://github.com/ant-design/ant-design/pull/24019)
  - 🐞 修复 Typography 不支持 `title` 属性的问题。[#24440](https://github.com/ant-design/ant-design/pull/24440) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🆕 Tooltip 支持配置背景颜色。[#23155](https://github.com/ant-design/ant-design/pull/23155)
- 🆕 Popconfirm 支持按 `ESC` 关闭。[#24420](https://github.com/ant-design/ant-design/pull/24420)
- 🆕 Tooltip `destroyTooltipOnHide` 支持 `keepParent` 配置。[#24362](https://github.com/ant-design/ant-design/pull/24362) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🆕 Notification 支持全局配置 `prefixCls`。[#24295](https://github.com/ant-design/ant-design/pull/24295) [@tdida](https://github.com/tdida)
- 🆕 RangePicker `dateRender` 支持额外参数来判断是 `start` 还是 `end` 字段。[#24278](https://github.com/ant-design/ant-design/pull/24278)
- 🆕 Skeleton 添加 `round` 属性，允许段落和标题显示圆角。[#24137](https://github.com/ant-design/ant-design/pull/24137) [@xilihuasi](https://github.com/xilihuasi)
- 🆕 Transfer 支持 `oneWay` 配置单向选择以及 `pagination` 配置分页。[#24041](https://github.com/ant-design/ant-design/pull/24041)
- 🆕 Message 支持自定义样式通过使用`className`和`style`。[#24024](https://github.com/ant-design/ant-design/pull/24024) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🆕 ConfigProvider 支持 `virtual` 和 `dropdownMatchSelectWidth` 配置。[#23841](https://github.com/ant-design/ant-design/pull/23841) [@hengkx](https://github.com/hengkx)
- 🐞 修复 Cascader 下拉框中扩展按钮在禁用时的颜色。[#24521](https://github.com/ant-design/ant-design/pull/24521)
- 🐞 修复 Alert 关闭按钮 `padding` 样式。[#24471](https://github.com/ant-design/ant-design/pull/24471)
- 🐞 修复 Tree `@tree-directory-selected-bg` 变量不生效的问题。[#24468](https://github.com/ant-design/ant-design/pull/24468) [@morenyang](https://github.com/morenyang)
- 🐞 修复 `@ant-prefix` 变量在部分样式里不生效的问题。[#24459](https://github.com/ant-design/ant-design/pull/24459) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Steps `subtitle` hover 渐变过渡。[#24593](https://github.com/ant-design/ant-design/pull/24593)
- 🐞 修复 List 报 `React does not recognize colStyle prop` 的问题。[#24568](https://github.com/ant-design/ant-design/pull/24568)
- 🐞 修复步骤 Progress `percent` 样式未正确更新的问题。[#24534](https://github.com/ant-design/ant-design/pull/24534) [@ChuckJonas](https://github.com/ChuckJonas)
- 🐞 修复 Breadcrumb 内使用链接时图标间距丢失的问题。[#24490](https://github.com/ant-design/ant-design/pull/24490) [@EscapeB](https://github.com/EscapeB)
- 💄 Descriptions 新增 `@descriptions-item-trailing-colon` 等 less 变量。[#24032](https://github.com/ant-design/ant-design/pull/24032) [@hengkx](https://github.com/hengkx)
- 🌐 国际化
  - 🇮🇪 新增爱尔兰语言包。[#24609](https://github.com/ant-design/ant-design/pull/24609) [@AbhijeetGaware](https://github.com/AbhijeetGaware)
  - 🇫🇮 改进 Typography `fi_FI` 国际化。[#24591](https://github.com/ant-design/ant-design/pull/24591) [@sagge](https://github.com/sagge)
  - 🇧🇷 改进 `pt_BR` 国际化。[#24518](https://github.com/ant-design/ant-design/pull/24518) [@arturpfb](https://github.com/arturpfb)
  - 🇬🇧 改进 Form `en_GB` 国际化。[#24404](https://github.com/ant-design/ant-design/pull/24404) [@morenyang](https://github.com/morenyang)
- RTL
  - 💄 优化 Tree RTL 模式下选项框样式。[#24563](https://github.com/ant-design/ant-design/pull/24563)
  - 💄 优化 Calendar 通知事项文字在 RTL 模式下的样式。[#24528](https://github.com/ant-design/ant-design/pull/24528)
  - 💄 优化 Table 筛选下拉框在 RTL 模式下样式。[#24529](https://github.com/ant-design/ant-design/pull/24529)
  - 💄 优化 Cascader RTL 模式下拉框的样式。[#24520](https://github.com/ant-design/ant-design/pull/24520)
- TypeScript
  - 🛠 Form 导出 `RuleObject` 与 `RuleRender` 定义。[#24541](https://github.com/ant-design/ant-design/pull/24541) [@sorteam](https://github.com/sorteam)

## 4.2.5

`2020-05-25`

- 🐞 修复 Table 在 `dataSource` 移除条目时，`rowSelection.onChange` 仍然会缓存的问题。[#24338](https://github.com/ant-design/ant-design/pull/24338)
- 🐞 修复 Table 的选中箭头在 `size=small/middle` 时超出的问题。[#24394](https://github.com/ant-design/ant-design/pull/24394)
- 🐞 修复 Input.Group 内 Input.TextArea `hover` 时清除图标消失的问题。[#24360](https://github.com/ant-design/ant-design/pull/24360) [@Mr-jiangzhiguo](https://github.com/Mr-jiangzhiguo)
- 🐞 修复 Notificiation 使用 `useNotificiation` 时无限 render 的行为。[#24337](https://github.com/ant-design/ant-design/pull/24337)
- 🐞 修复 Button `loading` 切换动画丢失和 Modal `confirmLoading` 按钮未复位的问题。[#24328](https://github.com/ant-design/ant-design/pull/24328)
- 🐞 修复 Drawer 关闭后依然会遮挡页面元素的问题。[#24290](https://github.com/ant-design/ant-design/pull/24290)
- 🐞 修复 Cascader/Select/Table/TreeSelect 空数据时字体的颜色。[#24279](https://github.com/ant-design/ant-design/pull/24279)
- 💄 优化 InputNumber 操作按钮居中样式。[#24266](https://github.com/ant-design/ant-design/pull/24266)
- 🐞 修复 Table 在 `filteredValue` 使用空数组时仍然会高亮过滤图标的问题。[#24263](https://github.com/ant-design/ant-design/pull/24263)
- 🐞 修复 Cascader 不支持 `number[]` 类型 `value` 的问题。[#24247](https://github.com/ant-design/ant-design/pull/24247)
- ⌨️ 修复 Switch `autoFocus` 在 `disabled` 移除后会触发的问题，调整样式以避免切换时额外的抖动，并移除鼠标点击失焦逻辑以提升无障碍体验。[#24254](https://github.com/ant-design/ant-design/pull/24254)
- 💄 增加 Menu 默认 `text-align` 样式定义以修复被外部样式影响的问题。[#24253](https://github.com/ant-design/ant-design/pull/24253)
- 🛠 用 hooks 重构 List。[#24280](https://github.com/ant-design/ant-design/pull/24280) [@hengkx](https://github.com/hengkx)
- 🛠 用 hooks 重构 Alert 以支持严格模式。[#24236](https://github.com/ant-design/ant-design/pull/24236) [@hengkx](https://github.com/hengkx)
- 🐞 修复 Card 和 `react-split` 一起使用时卡顿的问题。[#24425](https://github.com/ant-design/ant-design/pull/24425)
- TypeScript
  - 🛠 优化 Cascader 的 TypeScript 定义。[#24393](https://github.com/ant-design/ant-design/pull/24393) [@zhangyu1818](https://github.com/zhangyu1818)
  - 🐞 修复 Upload TypeScript 报错：`Could not find a declaration rc-upload` 的问题。[#24325](https://github.com/ant-design/ant-design/pull/24325)
  - 🛠 BackTop 增加 `children` 定义。[#24235](https://github.com/ant-design/ant-design/pull/24235)

## 4.2.4

`2020-05-18`

- 🐞 回滚 Switch 以修复配置 `unCheckedChildren` 时，控制点位置样式问题。[#24242](https://github.com/ant-design/ant-design/pull/24242)
- 💄 调整 Upload 错误状态图标的颜色默认为红色。[#24160](https://github.com/ant-design/ant-design/pull/24160)
- 💄 向上微调 Dropdown 箭头位置。[#24215](https://github.com/ant-design/ant-design/pull/24215)
- 🌐 Form `defaultValidateMessages` 支持 `ru_RU`。[#24219](https://github.com/ant-design/ant-design/pull/24219) [@aivinog1](https://github.com/aivinog1)

## 4.2.3

`2020-05-16`

- 🐞 重构 `rc-progress` 以解决 `<script src="antd.min.js" />` 会抛出 `h3g is not defined` 的问题。[#24127](https://github.com/ant-design/ant-design/pull/24127)
- 📖 重写了 [在 create-react-app 中使用](https://ant.design/docs/react/use-with-create-react-app-cn)。[#24184](https://github.com/ant-design/ant-design/pull/24184)
- Drawer
  - 🐞 修复 Drawer `getContainer={false}` 时的高度问题。[#24082](https://github.com/ant-design/ant-design/pull/24082)
  - 🐞 修复 Drawer `mask={false}` 时隐藏动画不生效的问题。[#24082](https://github.com/ant-design/ant-design/pull/24082)
- BackTop
  - 🛠 BackTop 使用 hooks 重构。[#23575](https://github.com/ant-design/ant-design/pull/23575)
  - 🐞 修复 BackTop 在 Chrome 的 iframe 里不生效的问题。[#24194](https://github.com/ant-design/ant-design/pull/24194)
- DatePicker
  - 🐞 修复 DatePicker `disabledDate` 不会作用到 `showToday` 上的问题。[#24190](https://github.com/ant-design/ant-design/pull/24190)
  - 🐞 修复 DatePicker `renderExtraFooter` 内容过长超出容器宽度的问题。[#24145](https://github.com/ant-design/ant-design/pull/24145)
- Button
  - 🐞 修复 Button 内图标无法使用 Tooltip 的问题。[#24095](https://github.com/ant-design/ant-design/pull/24095)
  - 🐞 修复定制主题时小号 Button 错位的问题。[#24097](https://github.com/ant-design/ant-design/pull/24097)
- 🛠 Tooltip 使用 hooks 重构。[#23699](https://github.com/ant-design/ant-design/pull/23699)
- 🐞 修复 Upload.Dragger 禁用时依然会被 Form `label` 触发的问题。[#24202](https://github.com/ant-design/ant-design/pull/24202)
- 🐞 修复 Select 回填选项无法进行交互的问题（如 `title` 不生效）。[#24170](https://github.com/ant-design/ant-design/pull/24170)
- 🐞 修复 Switch 在 Safari 和 iOS Chrome 上点击时错位的问题。[#24122](https://github.com/ant-design/ant-design/pull/24122) [@lexlexa](https://github.com/lexlexa)
- 🐞 Carousel 更新依赖到 `react-slick@0.26.1` 以修正一些问题。[#24067](https://github.com/ant-design/ant-design/pull/24067)
- 🐞 Cascader 没有匹配任何选项时展示 `defaultValue` 而不是空字符串。[#24058](https://github.com/ant-design/ant-design/pull/24058) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🌎 完善繁体中文国际化。[#24065](https://github.com/ant-design/ant-design/pull/24065) [@wx1322](https://github.com/wx1322)
- 🐞 修复 Table `onChange` pagination 参数定义。[#24114](https://github.com/ant-design/ant-design/pull/24114) [@sorteam](https://github.com/sorteam)
- 💄 新增 less 变量 `@card-head-extra-color`。[#24189](https://github.com/ant-design/ant-design/pull/24189)
- 💄 调整 Pagination 简洁模式下按钮的背景色为透明。[#24152](https://github.com/ant-design/ant-design/pull/24152)
- 💄 修复暗色 Menu 内的链接颜色。[#24110](https://github.com/ant-design/ant-design/pull/24110)
- RTL
  - 💄 修复 Dropdown.Button 下拉框在 RTL 模式下默认位置。[#24150](https://github.com/ant-design/ant-design/pull/24150)
  - 💄 优化 Pagination 分隔符在 RTL 下的样式。[#24154](https://github.com/ant-design/ant-design/pull/24154)
  - 💄 修复 Menu 在 RTL 下的 `border` 样式。[#24101](https://github.com/ant-design/ant-design/pull/24101)
  - 💄 优化 Select 多选项在 RTL 模式下样式。[#24112](https://github.com/ant-design/ant-design/pull/24112)
  - 💄 优化 Typography `expand` 在 RTL 下的样式。[#24084](https://github.com/ant-design/ant-design/pull/24084)

## 4.2.2

`2020-05-11`

- 🐞 修复安装 antd `npm run version` 报错的问题。[#24059](https://github.com/ant-design/ant-design/pull/24059)
- 🐞 修复 Menu `@menu-item-font-size` 变量失效的问题。[#24052](https://github.com/ant-design/ant-design/pull/24052)
- 💄 新增 `@modal-close-color` less 变量。[#24053](https://github.com/ant-design/ant-design/pull/24053)

## 4.2.1

`2020-05-11`

- Form
  - 🐞 修复 Form.Item 使用 `getValueProps` React 会报警的问题。[#23875](https://github.com/ant-design/ant-design/pull/23875)
  - 🐞 修复 Form.Item `help` 在 `validateStatus` 不是 `error` 时的样式问题。[#23945](https://github.com/ant-design/ant-design/pull/23945)
- Table
  - 🐞 修复 Table 固定表头时选择列的宽度问题。[#23806](https://github.com/ant-design/ant-design/pull/23806)
  - 💄 调整 Table 选择列 css 选择器优先级以支持自定义宽度。[#23914](https://github.com/ant-design/ant-design/pull/23914)
- DatePicker
  - 🐞 修复在 `placeholder` 为 `undefined` 时不展示的问题。[#23818](https://github.com/ant-design/ant-design/pull/23818)
  - 🐞 修复清除图标的颜色。[#23811](https://github.com/ant-design/ant-design/pull/23811)
- Switch
  - 🐞 修复暗色主题下的加载样式。[#23766](https://github.com/ant-design/ant-design/pull/23766) [@vsn4ik](https://github.com/vsn4ik)
  - 🐞 修复 `unCheckedChildren` 不显示的问题。[#23791](https://github.com/ant-design/ant-design/pull/23791)
- 🐞 修复 Upload 在浮层中错误提示滚动定位问题。[#24001](https://github.com/ant-design/ant-design/pull/24001) [@mraiguo](https://github.com/mraiguo)
- 💄 调整 Comment 中 `avatar` 为空时不必要的 div 样式[#23994](https://github.com/ant-design/ant-design/pull/23994) [@Xuhao](https://github.com/Xuhao)
- 🐞 修复 Input.Group 中 Select 选项 `focus` 边框样式[#23985](https://github.com/ant-design/ant-design/pull/23985)
- 🐞 修复 Steps `subTitle` 上会显示 `[object Object]` 提示的问题。[#23989](https://github.com/ant-design/ant-design/pull/23989)
- 💄 微调 Select 移除图标的位置。[#23963](https://github.com/ant-design/ant-design/pull/23963)
- 🐞 修复无遮罩的 Drawer 设置 `50%` 宽度时不显示的问题。[#23925](https://github.com/ant-design/ant-design/pull/23925)
- 🐞 修复 Textarea 开启 `allowClear` 时高度错误的问题。[#23835](https://github.com/ant-design/ant-design/pull/23835)
- 💄 调整 Modal.xxx 方法为异步以防止其影响 React 事件响应。[#23826](https://github.com/ant-design/ant-design/pull/23826)
- 🐞 修复受控模式 Menu `inlineCollapsed` 折叠时的表现。[#23822](https://github.com/ant-design/ant-design/pull/23822)
- 🐞 修复 Button `loading` 动画切换不平滑的问题。[#23783](https://github.com/ant-design/ant-design/pull/23783)
- 🐞 修复 Slider 拖拽中选中 `marks` 文本的问题。[#23773](https://github.com/ant-design/ant-design/pull/23773)
- 🛠 Timeline 使用 React Hooks 重构。[#23631](https://github.com/ant-design/ant-design/pull/23631) [@hengkx](https://github.com/hengkx)
- 🌎 国际化
  - 🇮🇷 增加波斯语 `fa_IR` 国际化默认提示模板。[#23926](https://github.com/ant-design/ant-design/pull/23926) [@NarimanMov](https://github.com/NarimanMov)
  - 🇺🇸 增加 Form `en` 国际化默认提示模板[#23859](https://github.com/ant-design/ant-design/pull/23859) [@mjfwebb](https://github.com/mjfwebb)
- 📦 包体积优化
  - 🗑 移除 `react-lifecycles-compat` 依赖以优化包体积。[#23969](https://github.com/ant-design/ant-design/pull/23969)
  - 🛠 源码中不再引用 `package.json` 从而优化了一点包体积。[#23957](https://github.com/ant-design/ant-design/pull/23957)
  - 🛠 更新 `rc-animate` 到 3.x 以优化包体积。[#23937](https://github.com/ant-design/ant-design/pull/23937)
- RTL
  - 🐞 修复 Input 在 RTL 模式下清空按钮的样式。[#23999](https://github.com/ant-design/ant-design/pull/23999)
  - 🐞 修复 DatePicker 下拉框在 RTL 模式下样式。[#24028](https://github.com/ant-design/ant-design/pull/24028) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化 DatePick 在 `RTL` 模式下的激活条样式。[#23981](https://github.com/ant-design/ant-design/pull/23981)
  - 🐞 修复 Transfer 查询框在 `RTL` 模式下的边距样式。[#23962](https://github.com/ant-design/ant-design/pull/23962)
  - 💄 优化 Layout RTL 样式。[#23921](https://github.com/ant-design/ant-design/pull/23921)
  - 💄 优化 Button `loading` 状态在 RTL 下样式。[#23776](https://github.com/ant-design/ant-design/pull/23776)
  - 💄 优化 Input.Search RTL 样式。[#23797](https://github.com/ant-design/ant-design/pull/23797)
- TypeScript
  - 🐞 修复 InputNumber `onChange` 类型。[#23871](https://github.com/ant-design/ant-design/pull/23871) [@jjhbw](https://github.com/jjhbw)

## 4.2.0

`2020-04-29`

- 🆕 List `grid` 支持所有分栏数字，比如分为 5 栏。[#23630](https://github.com/ant-design/ant-design/pull/23630)
- 🆕 Divider 新增 `plain` 属性，可用于设置一个非标题样式的分割文字。[#23405](https://github.com/ant-design/ant-design/pull/23405)
- 🆕 Typography `ellipsis` 支持 `onEllipsis` 事件。[#23414](https://github.com/ant-design/ant-design/pull/23414)
- 🆕 Space 支持 `align` 属性。[#23306](https://github.com/ant-design/ant-design/pull/23306)
- 🆕 Upload 添加 `isImageUrl` 属性以强制将文件作为图标文件。[#23248](https://github.com/ant-design/ant-design/pull/23248) [@onjuju](https://github.com/onjuju)
- 🆕 Form.Item 支持 `initialValue` 和 `getValueProps` 属性。[#22993](https://github.com/ant-design/ant-design/pull/22993)
- ConfigProvider
  - 🆕 ConfigProvider 支持 `getTargetContainer` 以配置 Affix `target` 属性。[#23751](https://github.com/ant-design/ant-design/pull/23751)
  - 🆕 ConfigProvider 添加 `input` 属性以支持全局化配置 Input `autoComplete` 的默认值。[#23455](https://github.com/ant-design/ant-design/pull/23455)
  - 🐞 修复 ConfigProvider `getPopupContainer` 对 DatePicker 和 Slider 不生效的问题。[#23594](https://github.com/ant-design/ant-design/pull/23594) [@hengkx](https://github.com/hengkx)
- Table
  - 🆕 Table `summary` 支持固定列。[#23647](https://github.com/ant-design/ant-design/pull/23647)
  - 🆕 Table 支持响应式展现列。[#23298](https://github.com/ant-design/ant-design/pull/23298) [@vbudovski](https://github.com/vbudovski)
  - 🐞 修复 Table pagination 在 RTL 下默认位置。[#23747](https://github.com/ant-design/ant-design/pull/23747)
  - 🐞 修复 Table 在 `pageSize` 是 `undefined` 时崩溃的问题。[#23724](https://github.com/ant-design/ant-design/pull/23724)
  - 🐞 修复 Table 大小为 `small` 和 `middle` 时嵌套表格错位的问题。[#23602](https://github.com/ant-design/ant-design/pull/23602) [@hengkx](https://github.com/hengkx)
- 🐞 修正 RangePicker 范围标签的颜色为主色。[#23705](https://github.com/ant-design/ant-design/pull/23705)
- 🐞 修复 Transfer 为空自定义图片样式问题。[#23694](https://github.com/ant-design/ant-design/pull/23694) [@hengkx](https://github.com/hengkx)
- Input
  - 🐞 修复 Password 组件输入光标位置。[#23633](https://github.com/ant-design/ant-design/pull/23633) [@huntdream](https://github.com/huntdream)
  - 💄 调整 Input.Search 的搜索图标样式。[#23406](https://github.com/ant-design/ant-design/pull/23406)
- Button
  - 🐞 修复 Button 图标类型按钮的对齐问题。[#23671](https://github.com/ant-design/ant-design/pull/23671)
  - 🐞 修复 Button 图标按钮 `loading` 样式错误的问题。[#23614](https://github.com/ant-design/ant-design/pull/23614)
  - 🐞 解决 Button 无法直接被 `react-dnd` 调用的问题。[#23571](https://github.com/ant-design/ant-design/pull/23571) [@hengkx](https://github.com/hengkx)
- Menu
  - 🆕 Menu Item 和 SubMenu 新增 `icon` 属性。[#23629](https://github.com/ant-design/ant-design/pull/23629)
  - 🐞 修复 Menu 菜单重复阴影的问题。[#23664](https://github.com/ant-design/ant-design/pull/23664)
- 🐞 解决 Tag 无法直接被 `react-dnd` 调用的问题。[#23632](https://github.com/ant-design/ant-design/pull/23632) [@hengkx](https://github.com/hengkx)
- Anchor
  - 🐞 修复 Anchor Link 包含多个 `#` 时无法跳转的问题。[#23595](https://github.com/ant-design/ant-design/pull/23595) [@wuzekang](https://github.com/wuzekang)
  - 🐞 修复 Input 带 `suffix` 时的元素对齐问题。[#23606](https://github.com/ant-design/ant-design/pull/23606)
- 💄 Select 箭头打开时不再翻转。[#23468](https://github.com/ant-design/ant-design/pull/23468)
- 💄 新增 Rate 的 `direction` 支持优化。[#23321](https://github.com/ant-design/ant-design/pull/23321)
- 💄 调整紧凑模式下默认的字体大小。[#23135](https://github.com/ant-design/ant-design/pull/23135)
- RTL
  - 💄 优化 Result RTL 下按钮样式。[#23733](https://github.com/ant-design/ant-design/pull/23733)
  - 💄 新增 Divider RTL 支持。[#23734](https://github.com/ant-design/ant-design/pull/23734)
  - 💄 修复 Alert 在 RTL 下无 icon 的间隔问题。[#23714](https://github.com/ant-design/ant-design/pull/23714)
  - 💄 优化 Table RTL 模式下扩展按钮动画与分页样式问题。[#23706](https://github.com/ant-design/ant-design/pull/23706)
  - 💄 修复 Table 筛选下拉框在 RTL 下的位置。[#23695](https://github.com/ant-design/ant-design/pull/23695)
  - 💄 修复 Table 勾选框图标 RTL 样式。[#23690](https://github.com/ant-design/ant-design/pull/23690)
  - 💄 优化 List RTL 样式。[#23676](https://github.com/ant-design/ant-design/pull/23676)
  - 💄 新增 Calendar RTL 支持。[#23394](https://github.com/ant-design/ant-design/pull/23394)
  - 💄 优化 Input.Search RTL 样式。[#23424](https://github.com/ant-design/ant-design/pull/23424)
  - 💄 增加 Notification RTL 设置。[#23185](https://github.com/ant-design/ant-design/pull/23185)
- TypeScript
  - 🐞 修复 PageHeader `tag` 属性定义错误。[#23712](https://github.com/ant-design/ant-design/pull/23712) [@hengkx](https://github.com/hengkx)
  - 🗑 移除已废弃的 Button `type="danger"` TypeScript 定义并增加警告信息。[#23709](https://github.com/ant-design/ant-design/pull/23709)
  - 🐞 修复 Table pagination `position` Typescript 定义错误。[#23681](https://github.com/ant-design/ant-design/pull/23681) [@hengkx](https://github.com/hengkx)

## 4.1.5

`2020-04-25`

- 🐞 修复 Button.Group 中按钮没有对齐的问题。[#23590](https://github.com/ant-design/ant-design/pull/23590)
- 🐞 修复 Select 箭头图标点击无法触发下拉的问题。[#23448](https://github.com/ant-design/ant-design/pull/23448)
- 🐞 修复 Form 自定义 `@form-item-margin-bottom` 变量时表单校验抖动的问题。[#23436](https://github.com/ant-design/ant-design/pull/23436) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复第一个 Divider 渲染时样式不一致的问题。[#23438](https://github.com/ant-design/ant-design/pull/23438)
- 🐞 修复嵌套 ConfigProvider 会丢失 `prefixCls` 值的问题。[#23423](https://github.com/ant-design/ant-design/pull/23423)
- 🐞 修复 Carousel 键盘切换到非活跃 slide 上的 Radio/Checkbox 的问题。[#23380](https://github.com/ant-design/ant-design/pull/23380)
- 🐞 修复 Tree 使用虚拟滚动时会因为 `loadData` 更新过快而锁死的问题。[#23581](https://github.com/ant-design/ant-design/pull/23581)
- 🐞 修复 Steps 组件竖直展示时在 IE11 下样式错误的问题。[#23561](https://github.com/ant-design/ant-design/pull/23561) [@AdrianoRuberto](https://github.com/AdrianoRuberto)
- 🐞 修复 Input.Search 高度被 `suffix` 撑高的问题和报 `react key` 重复警告的问题。[#23527](https://github.com/ant-design/ant-design/pull/23527)
- 🐞 修复 Menu 鼠标移到缝隙处子菜单会消失的问题。[#23511](https://github.com/ant-design/ant-design/pull/23511)
- 🐞 修复 Tree 自定义图标在加载状态下消失的问题。[#23494](https://github.com/ant-design/ant-design/pull/23494)
- RTL
  - 🐞 修复 Alert 在 `showIcon` 和 `closable` 都存在时的 RTL 样式问题。[#23526](https://github.com/ant-design/ant-design/pull/23526)
  - 🐞 修复 Button 在 RTL 下 loading 样式不正确的问题。[#23399](https://github.com/ant-design/ant-design/pull/23399)
  - 🐞 修复 Collapse 在 RTL 下切换图标位置不正确的问题。[#23445](https://github.com/ant-design/ant-design/pull/23445)
  - 🐞 修复 Select 分组名称的 RTL 样式问题。[#23404](https://github.com/ant-design/ant-design/pull/23404)
  - 🐞 修复 Statistic 的 RTL 样式不正确的问题。[#23397](https://github.com/ant-design/ant-design/pull/23397)
- TypeScript
  - 🐞 修复 Table 的 `selections` 类型定义。[#23462](https://github.com/ant-design/ant-design/pull/23462) [@xiaoxintang](https://github.com/xiaoxintang)

## 4.1.4

`2020-04-18`

- 🐞 修复暗黑主题和紧凑主题不生效的问题。[#23243](https://github.com/ant-design/ant-design/pull/23243)
- 🐞 修复 Modal.info 等方法的 `onOk` 函数有参数时只触发一次的问题。[#23360](https://github.com/ant-design/ant-design/pull/23360)
- 🐞 修复 Dropdown 弹出菜单背景样式问题。[#23296](https://github.com/ant-design/ant-design/pull/23296)
- 💄 优化 PageHeader 的响应式表现。[#23277](https://github.com/ant-design/ant-design/pull/23277)
- 🐞 修复紧凑模式下树选择出现空白。[#23231](https://github.com/ant-design/ant-design/pull/23231)
- 🛎 修改 Checkbox 和 Switch 中控制台输出的错别字 (validate -> a valid)。[#23240](https://github.com/ant-design/ant-design/pull/23240) [@evancharlton](https://github.com/evancharlton)
- 🐞 修复 Table `rowSelection` 在设置 `childrenColumnName` 时事件参数不正确的问题。[#23205](https://github.com/ant-design/ant-design/pull/23205)
- Input
  - 🐞 修复 Input `type="color"` 的高度问题。[#23351](https://github.com/ant-design/ant-design/pull/23351)
  - 🐞 修复 Input 设置 `allowClear` 内联展示时，触发清除按钮样式抖动的问题。[#23259](https://github.com/ant-design/ant-design/pull/23259)
  - 🐞 修复 Input.Search 全局设置 `size` 不生效问题。[#23331](https://github.com/ant-design/ant-design/pull/23331)
- Select
  - 🐞 修复 Select 多选时设置 `disabled` 选项仍然会展示移除按钮的问题。[#23295](https://github.com/ant-design/ant-design/pull/23295)
  - 🐞 修复 Select 自定义 `suffixIcon` 无法交互的问题。[#23274](https://github.com/ant-design/ant-design/pull/23274)
  - 🐞 修复 Select 输入光标在 Collapse 内不显示的问题。[#23250](https://github.com/ant-design/ant-design/pull/23250)
- 国际化
  - 🌐 Form 校验信息支持国际化并增加中文文案。[#23165](https://github.com/ant-design/ant-design/pull/23165) [@hengkx](https://github.com/hengkx)
  - 🌐 完善希伯来语(以色列) 国际化。[#23302](https://github.com/ant-design/ant-design/pull/23302) [@MishaKav](https://github.com/MishaKav)
  - 🌐 完善俄语国际化。[#23303](https://github.com/ant-design/ant-design/pull/23303) [@MishaKav](https://github.com/MishaKav)
- TypeScript
  - 🔷 更新 Tree 的类型定义。[#23348](https://github.com/ant-design/ant-design/pull/23348) [@yoyo837](https://github.com/yoyo837)
  - 🔷 更新 Form Item 的类型定义。[#22962](https://github.com/ant-design/ant-design/pull/22962) [@fa93hws](https://github.com/fa93hws)
  - 🐞 修复 Slider 组件 `value` 和 `defaultValue` 文档与 TypeScript 定义不一致的问题。[#23252](https://github.com/ant-design/ant-design/pull/23252) [@DongchengWang](https://github.com/DongchengWang)
- RTL
  - 🐞 修复 Menu RTL 样式。[#23319](https://github.com/ant-design/ant-design/pull/23319)
  - 💄 修复 Select 的 RTL 样式。[#23235](https://github.com/ant-design/ant-design/pull/23235)

## 4.1.3

`2020-04-13`

- 💄 调整 Form.Item `label` 在垂直布局下的高度样式。[#23192](https://github.com/ant-design/ant-design/pull/23192)
- 🐞 修复引用暗黑或紧凑主题时提示 `Variable is undefined` 的问题，并提供 `getThemeVariables` 方便获取对应主题变量。[#23171](https://github.com/ant-design/ant-design/pull/23171)
- 🐞 修复 PageHeader `title` 超长时布局被破坏的问题并优化响应式表现。[#23133](https://github.com/ant-design/ant-design/pull/23133)
- Tabs
  - 🐞 修复 Tabs `@tabs-card-height` less 变量无效的问题。[#23168](https://github.com/ant-design/ant-design/pull/23168)
  - 🐞 修复 Tabs 在 Safair 浏览器下无法显示的问题。[#23151](https://github.com/ant-design/ant-design/pull/23151) [@imhxc](https://github.com/imhxc)
- Table
  - 🐞 修复 Table 固定列在 Safari 12 中不能固定的问题。[#23161](https://github.com/ant-design/ant-design/pull/23161)
  - 🐞 修复 Table `summary` 在小尺寸下的内边距样式。[#23140](https://github.com/ant-design/ant-design/pull/23140) [@someyoungideas](https://github.com/someyoungideas)
- 🐞 修复 Select 不同尺寸下的对齐样式问题。[#23160](https://github.com/ant-design/ant-design/pull/23160)
- 🐞 修复 RangePicker 在 Input.Group 内的样式问题。[#23149](https://github.com/ant-design/ant-design/pull/23149)
- 🐞 修复 Pagination 缺少 `showTitle` TypeScript 定义的问题。[#23144](https://github.com/ant-design/ant-design/pull/23144) [@DongchengWang](https://github.com/DongchengWang)

## 4.1.2

`2020-04-10`

- Menu
  - 🐞 修复暗色 Menu 弹出菜单背景色为白色的问题。[#22981](https://github.com/ant-design/ant-design/pull/22981) [@AshoneA](https://github.com/AshoneA)
  - 🐞 修复 SubMenu 标题过长而导致被箭头图标部分覆盖的问题。[#23028](https://github.com/ant-design/ant-design/pull/23028) [@wwyx778](https://github.com/wwyx778)
- 🐞 修复紧凑模式和暗黑模式无法同时开启的问题。[#22934](https://github.com/ant-design/ant-design/pull/22934) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复 Notification 非法的 `padding-top` 值。[#22941](https://github.com/ant-design/ant-design/pull/22941)
- Button
  - 🐞 修复带图标 Button 的 `loading` 动画效果。[#23102](https://github.com/ant-design/ant-design/pull/23102)
  - ⚠️ 优化 Button 非法 `type` 的控制台提示。[#22933](https://github.com/ant-design/ant-design/pull/22933)
- 🐞 修复 Statistic 在值为 `-` 时会展示成 `-0` 的问题。[@22950](https://github.com/ant-design/ant-design/pull/22950)
- 🐞 修复 Modal.confirm `onOk` 可以被触发多次的问题。[#22963](https://github.com/ant-design/ant-design/pull/22963)
- Input
  - 🐞 修复 Input.Group 中 Button 不能对齐的问题。[#22975](https://github.com/ant-design/ant-design/pull/22975)
  - 🐞 修复 Input 在暗黑模式下使用 `affix` 的背景样式问题。[#23115](https://github.com/ant-design/ant-design/pull/23115)
- 🐞 修复 Form.Item 在动态切换时没有正确重置错误样式的问题。[#23041](https://github.com/ant-design/ant-design/pull/23041)
- 💄 微调 RangePicker 箭头和后缀的颜色样式。[#23025](https://github.com/ant-design/ant-design/pull/23025)
- Table
  - 🐞 修复 Table 选择行在 hover 时的背景样式问题。[#23110](https://github.com/ant-design/ant-design/pull/23110)
  - 💄 微调 Table 行 hover 时的背景色。[#23113](https://github.com/ant-design/ant-design/pull/23113)
  - ⚠️ Table 在异步数据下 `dataSource` 长度与 `pageSize` 不匹配时，添加警告信息。[#23118](https://github.com/ant-design/ant-design/pull/23118)
- Select
  - 💄 微调多选 Select 的光标位置使其与单选 Select 统一。[#22978](https://github.com/ant-design/ant-design/pull/22978)
  - 🐞 修复 无边框 Select 在 Form.Item 设置 `validateStatus` 时会出现边框的问题。[#23004](https://github.com/ant-design/ant-design/pull/23004)
  - 🐞 修复 Select 在 IE11 下的展示问题。[#23020](https://github.com/ant-design/ant-design/pull/23020)
- 🐞 修复 Calendar 不支持 `style` 属性的问题。[#23081](https://github.com/ant-design/ant-design/pull/23081)
- 🐞 修复 Tabs 下方卡片布局激活标签的高度问题。[#23087](https://github.com/ant-design/ant-design/pull/23087)
- 🐞 修复 Anchor、Select、DatePicker、Grid、Mentions 组件的 RTL 支持。[@xrkffgg](https://github.com/xrkffgg)
- TypeScript
  - 🌟 Upload `UploadProps` 支持泛型定义。[#22921](https://github.com/ant-design/ant-design/pull/22921) [@dpyzo0o](https://github.com/dpyzo0o)
  - 🐞 修复 Modal.confirm 的 `okButtonProps` 定义。[#21165](https://github.com/ant-design/ant-design/pull/21165) [@nicu-chiciuc](https://github.com/nicu-chiciuc)
  - 🌟 暴露 Form `Store` 接口。[#22755](https://github.com/ant-design/ant-design/pull/22755) [@shaodahong](https://github.com/shaodahong)
  - 🌟 优化 Input、Tag、Badge 组件的枚举类型属性定义。[#23026](https://github.com/ant-design/ant-design/pull/23026) [#22999](https://github.com/ant-design/ant-design/pull/22999) [#23006](https://github.com/ant-design/ant-design/pull/23006) [@fjc0k](https://github.com/fjc0k)
  - 🐞 修复 Pagination `position` 定义。[#23048](https://github.com/ant-design/ant-design/pull/23048) [@Arttse](https://github.com/Arttse)

## 4.1.1

`2020-04-05`

- 🐞 移除 Tabs 的内容区域的 focus 蓝色轮廓线。[#22752](https://github.com/ant-design/ant-design/pull/22752) [@MrHeer](https://github.com/MrHeer)
- 🐞 修复 Input 前后缀添加弹出元素不能点击获得焦点的问题。[#22887](https://github.com/ant-design/ant-design/pull/22887)
- Table
  - 🐞 修复 Table 行选择下拉菜单不支持 `getPopupContainer`。[#22787](https://github.com/ant-design/ant-design/pull/22787) [@mikeyshing88](https://github.com/mikeyshing88)
  - 🐞 修复 Table 配 `size` 时，使用过滤和排序的表头尺寸问题。[#22872](https://github.com/ant-design/ant-design/pull/22872)
  - 💄 调整嵌套 Table 样式，只有一个子 Table 时才移除边距。[#22868](https://github.com/ant-design/ant-design/pull/22868)
  - 🐞 修复 Table 列 `align` 在 `sorter` 开启时标题不居中的问题。[#22858](https://github.com/ant-design/ant-design/pull/22858)
  - 🐞 修复 Table 过滤设置在 jsx 结构下无效的问题。[#22888](https://github.com/ant-design/ant-design/pull/22888)
  - 🐞 调整 Table 在无固定列滚动时，展开行将跟随表格一同滚动。[#22832](https://github.com/ant-design/ant-design/pull/22832)
  - 🐞 修复当 `column.children` 为 `undefined` 时整列未显示的问题。[#22832](https://github.com/ant-design/ant-design/pull/22832)
  - 🐞 修复 Table 在 `filters` 为 `undefined` 时仍然展示过滤按钮的问题。[#22833](https://github.com/ant-design/ant-design/pull/22833)
  - 🐞 修复 Table `filters` 未变化时触发 `onChange` 事件的问题。[#22829](https://github.com/ant-design/ant-design/pull/22829)
  - 🐞 修复 Table `loading` 兼容性。[#22739](https://github.com/ant-design/ant-design/pull/22739)
  - 🐞 修复 Table 在 Safari 下滚动阴影的样式。[#22794](https://github.com/ant-design/ant-design/pull/22794)
- 💄 调整 RangePicker 箭头样式。[#22847](https://github.com/ant-design/ant-design/pull/22847)
- 🐞 修复 Text 使用 `ellipsis` 的对齐问题。[#22836](https://github.com/ant-design/ant-design/pull/22836)
- 💄 优化 `@info-color` less 变量，默认为 `@primary-color`。[#22723](https://github.com/ant-design/ant-design/pull/22723)
- 🐞 修复大号多选 Select 未选择时的高度问题。[#22904](https://github.com/ant-design/ant-design/pull/22904)
- 🐞 修复 BackTop 在 iframe 里不生效并提升了组件性能。[#22788](https://github.com/ant-design/ant-design/pull/22788)
- 🐞 修复 Radio less 变量名错误。[#22803](https://github.com/ant-design/ant-design/pull/22803) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Card Tabs 不支持小尺寸的问题。[#22666](https://github.com/ant-design/ant-design/pull/22666) [@MrHeer](https://github.com/MrHeer)
- 🐞 修复 Affix 抛出 `React state update on unmounted component` 警告的问题。[#22790](https://github.com/ant-design/ant-design/pull/22790)
- 🐞 修复 Textarea 配置 `clearIcon` 在 Form.Item 下会有额外的 `margin` 的问题。[#22793](https://github.com/ant-design/ant-design/pull/22793)
- 🐞 修复 List 空数据时 `footer` 上分割线缺失的问题。[#22771](https://github.com/ant-design/ant-design/pull/22771)
- 🐞 修复 Slider 中 `tooltipPlacement` 与 `vertical` 配置在顺序上问题。[#22772](https://github.com/ant-design/ant-design/pull/22772) [@phoenixeliot](https://github.com/phoenixeliot)
- 🛠 用新的 React context 重构 LocaleReceiver 以避免严格模式下的警告信息。[#22762](https://github.com/ant-design/ant-design/pull/22762)
- 🐞 修复 Radio 和 Checkbox 上 required 属性没有传给原生 input 的问题。[#22761](https://github.com/ant-design/ant-design/pull/22761)
- 🐞 修复 CSS 变量 `--scroll-bar` 未定义的问题。[#22754](https://github.com/ant-design/ant-design/pull/22754) [@mikeyshing88](https://github.com/mikeyshing88)
- 🐞 修复 Menu 和 Spin 在紧凑模式下样式。[#22908](https://github.com/ant-design/ant-design/pull/22908) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复 Space 子项重复的 `key`。[#22745](https://github.com/ant-design/ant-design/pull/22745)
- 🐞 修复 Select 鼠标手型样式。[#22743](https://github.com/ant-design/ant-design/pull/22743)
- 🇫🇷 DatePicker 和 TimePicker 法语国际化。[#22769](https://github.com/ant-design/ant-design/pull/22769) [@PaulJln](https://github.com/PaulJln)
- RTL
  - 💄 新增 Message RTL 样式。[#22513](https://github.com/ant-design/ant-design/pull/22513) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 修复 Radio RTL 样式。[#22926](https://github.com/ant-design/ant-design/pull/22926) [@AshoneA](https://github.com/AshoneA)
  - 🐞 修复 Menu RTL 样式问题。[#22841](https://github.com/ant-design/ant-design/pull/22841)
  - 🐞 修复 Form RTL 下 label 样式问题。[#22621](https://github.com/ant-design/ant-design/pull/22621) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 修复 Space RTL 样式问题。[#22809](https://github.com/ant-design/ant-design/pull/22809) [@xrkffgg](https://github.com/xrkffgg)
- TypeScript
  - 🐞 修复 Table `FilterDropdownProps` 类型定义。[#22895](https://github.com/ant-design/ant-design/pull/22895) [@zhangyu1818](https://github.com/zhangyu1818)
  - 🐞 修复 Form `Store` 和 `StoreValue` 类型定义。[#22755](https://github.com/ant-design/ant-design/pull/22755) [@shaodahong](https://github.com/shaodahong)

## 4.1.0

`2020-03-29`

- 🔥 支持紧凑模式主题。[#22126](https://github.com/ant-design/ant-design/pull/22126) [@AshoneA](https://github.com/AshoneA)
- 🔥 新的 Space 组件以支持内联组件的间距样式。[#22363](https://github.com/ant-design/ant-design/pull/22363)
- 🔥 DatePicker 支持季度选择器。[#22468](https://github.com/ant-design/ant-design/pull/22468)
- 🆕 Tree/TreeSelect/Select 支持 `virtual` 属性以关闭虚拟滚动。[#21955](https://github.com/ant-design/ant-design/pull/21955)
- 🆕 改进 Pagination 使用体验。[#22711](https://github.com/ant-design/ant-design/pull/22711)
  - Pagination 当 `total > 50` 时默认显示切换页数选择器。
  - 统一 Pagination 十页以内的页码个数使其宽度更统一。
  - Pagination 调整默认页数选项为 `10, 20, 50, 100`。
- Table
  - 🆕 Table 分页位置增加更多选项。[#22647](https://github.com/ant-design/ant-design/pull/22647) [@hengkx](https://github.com/hengkx)
  - 🆕 Table 选择列支持 `renderCell`。[#21711](https://github.com/ant-design/ant-design/pull/21711)
  - 🆕 Table 排序增加下次排序的提示，并增加 `showSorterTooltip` 属性开关。[#21631](https://github.com/ant-design/ant-design/pull/21631) [@AshoneA](https://github.com/AshoneA)
- 🆕 Tag 支持 `icon` 属性。[#22418](https://github.com/ant-design/ant-design/pull/22418) [@vtsybulin](https://github.com/vtsybulin)
- 🆕 Grid 添加 `useBreakpoint` hook. [#22226](https://github.com/ant-design/ant-design/pull/22226)
- 🆕 Card 支持 `tabProps`。[#22207](https://github.com/ant-design/ant-design/pull/22207)
- 🆕 Menu.Item 上的 Tooltip 现在可以使用 `title={null}` 来禁用。[#22202](https://github.com/ant-design/ant-design/pull/22202)
- 🆕 Pagination supports `autoResize` prop。[#21959](https://github.com/ant-design/ant-design/pull/21959) [@wendellhu95](https://github.com/wendellhu95)
- 🆕 Popover/Popconfirm 添加 render props 支持。[#22034](https://github.com/ant-design/ant-design/pull/22034) [@nossbigg](https://github.com/nossbigg)
- 🆕 TimePicker.RangePicker 支持 `order` 属性用于设置排序行为。[#21948](https://github.com/ant-design/ant-design/pull/21948)
- 🆕 Carousel `dots` 支持对象传递 `className`。[#21848](https://github.com/ant-design/ant-design/pull/21848)
- 🆕 Form `validateMessages` 支持 `${label}` 变量。[#21835](https://github.com/ant-design/ant-design/pull/21835)
- 🆕 暴露 Breadcrumb.Item 组件的所有 Dropdown 的可配置属性。[#20763](https://github.com/ant-design/ant-design/pull/20763) [@paranoidjk](https://github.com/paranoidjk)
- ⌨️ 增强 Tabs 可访问性。[#22287](https://github.com/ant-design/ant-design/pull/22287)
  - 新增 Tabs keyboard 属性用于开关键盘切换功能。
  - Tabs `extraContent` 里的元素不再触发键盘切换功能。
- 🛠 添加 Form.Item 在受控时使用 `defaultValue` 的警告信息。[#22571](https://github.com/ant-design/ant-design/pull/22571)
- 🛠 Typography `onExpand` 添加事件参数。[#22092](https://github.com/ant-design/ant-design/pull/22092) [@BlazPocrnja](https://github.com/BlazPocrnja)
- 🛠 简化 Popconfirm 和 Popover 的 dom 结构。[#22052](https://github.com/ant-design/ant-design/pull/22052)
- 🐞 修复 Autocomplete `value` 为 `null` 时，值展示 `null` 的问题。[#21955](https://github.com/ant-design/ant-design/pull/21955)
- 🐞 调整 Drawer 无 `title` 时关闭按钮样式以避免遮挡滚动条。[#22710](https://github.com/ant-design/ant-design/pull/22710)
- 🐞 修复 Calendar 的一些样式细节问题。[#22676](https://github.com/ant-design/ant-design/pull/22676)
- Table
  - 🐞 修复 Table 在 Safari 下固定列的阴影样式问题。[#22680](https://github.com/ant-design/ant-design/pull/22680)
  - 🐞 修复 Table 样式影响内嵌 table 的问题。[#22643](https://github.com/ant-design/ant-design/pull/22643)
  - 🐞 修复 Table 同时设置 `rowSelection` 和 `onRow` 事件冒泡问题。[#22566](https://github.com/ant-design/ant-design/pull/22566) [@hengkx](https://github.com/hengkx)
  - 🐞 修复 Table 空文本没有居中的问题与空数据依然展示了分页的问题。[#22548](https://github.com/ant-design/ant-design/pull/22548) [@hengkx](https://github.com/hengkx)
- 🐞 修复 Input 只配置 `suffix` 时的样式对齐问题。[#22603](https://github.com/ant-design/ant-design/pull/22603)
- 🐞 修复 Alert 无法和 Tooltip/Popover 一起使用的问题。[#22594](https://github.com/ant-design/ant-design/pull/22594)
- 🐞 修复嵌套动态 Form.Item 会被 react 警告更新移除节点的信息。[#22575](https://github.com/ant-design/ant-design/pull/22575)
- 💄 调整 Tag `processing` 状态颜色。[#22303](https://github.com/ant-design/ant-design/pull/22303)
- 💄 移除 Select 下拉组标题的鼠标可点击样式。[#22581](https://github.com/ant-design/ant-design/pull/22581)
- 💄 迁移 `@form-item-label-height` less 变量到主题变量中。[#22600](https://github.com/ant-design/ant-design/pull/22600) [@slavakam](https://github.com/slavakam)
- 💄 优化 Table 筛选菜单按钮的样式并修复 Dropdown 二级菜单的上下边距。[#22072](https://github.com/ant-design/ant-design/pull/22072)
- 💄 新增 less 变量 `@link-focus-decoration` 和 `@link-focus-outline`。[#22511](https://github.com/ant-design/ant-design/pull/22511)
- 💄 新增 DatePicker `disabled` 时，分隔符鼠标禁用样式。[#22563](https://github.com/ant-design/ant-design/pull/22563)
- RTL
  - 💄 优化 CheckBox `inner` RTL 样式问题。[#22627](https://github.com/ant-design/ant-design/pull/22627)
  - 🐞 优化 Upload `picture-card` RTL 样式问题。[#22630](https://github.com/ant-design/ant-design/pull/22630)
  - 🐞 修复 Badge RTL 数字显示样式问题。[#22665](https://github.com/ant-design/ant-design/pull/22665)
  - 🐞 修复 Select RTL 多选可清空时，选项样式问题。[#22596](https://github.com/ant-design/ant-design/pull/22596)
  - 🐞 修复 Progress RTL 样式问题。[#22558](https://github.com/ant-design/ant-design/pull/22558)
  - 🐞 修复 Badge RTL 样式问题。[#22551](https://github.com/ant-design/ant-design/pull/22551)
  - 🐞 修复 Input RTL 样式问题。[#22525](https://github.com/ant-design/ant-design/pull/22525)
  - 🐞 修复 Steps RTL 样式问题。[#22523](https://github.com/ant-design/ant-design/pull/22523)
  - 💄 优化 Tabs RTL 按钮样式问题。[#22653](https://github.com/ant-design/ant-design/pull/22653)
  - 💄 优化 Input.Group RTL 样式问题。[#22624](https://github.com/ant-design/ant-design/pull/22624)
  - 💄 优化 Timeline label RTL 样式问题。[#22652](https://github.com/ant-design/ant-design/pull/22652)
  - 💄 优化 Select group RTL 样式问题。[#22584](https://github.com/ant-design/ant-design/pull/22584)
  - 💄 优化 Dropdown.Button RTL 样式问题。[#22519](https://github.com/ant-design/ant-design/pull/22519)
- Typescript
  - 🛠 替换废弃的 `React.SFC` 为 `React.FC`。[#22691](https://github.com/ant-design/ant-design/pull/22691) [@Rustin-Liu](https://github.com/Rustin-Liu)
  - 🐞 修复 Form.Item `children` 的类型定义。[#22662](https://github.com/ant-design/ant-design/pull/22662)

## 4.0.4

`2020-03-23`

- 🐞 修复 AutoComplete 下使用 Search 时清除图标和搜索图标重叠样式异常的问题。[#22310](https://github.com/ant-design/ant-design/pull/22310)
- 🐞 修复 Button 为 `disabled` 时被 Tooltip 包裹时的对齐问题。[#22461](https://github.com/ant-design/ant-design/pull/22461)
- 🐞 修复 Cascader 搜索时需要按两次向下箭头才能选中问题。[#22216](https://github.com/ant-design/ant-design/pull/22216) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🐞 修复 Carousel 无法使用 Snowpack 构建的问题。[#22507](https://github.com/ant-design/ant-design/pull/22507)
- 🐞 修复 ConfigProvider `componentSize` 对 DatePicker.RangePicker 无效的问题。[#22486](https://github.com/ant-design/ant-design/pull/22486)
- 🐞 修复 Descriptions 在小尺寸下无法自适应的问题。[#22407](https://github.com/ant-design/ant-design/pull/22407)
- 🐞 修复 Grid 下使用不带 `span` 的 Col 时样式错乱的问题。[#22455](https://github.com/ant-design/ant-design/pull/22455)
- ⚡️ 优化 Form.Item 有多个 `noStyle` 子 Form.Item 时信息收集性能。[#22410](https://github.com/ant-design/ant-design/pull/22410)
- 💄 增加 InputNumber RTL 模式样式。[#22434](https://github.com/ant-design/ant-design/pull/22434)
- Menu
  - 🛠 Menu 继承标题的 `line-height`。[#16142](https://github.com/ant-design/ant-design/pull/16142) [@sheerun](https://github.com/sheerun)
  - 🐞 修复 Menu 子菜单展开/收起时会出现滚动条的问题。[#22248](https://github.com/ant-design/ant-design/pull/22248)
- 🐞 修复 Progress 仪表盘状进度条传入 `gapDeg` 为 `0` 时仍然有缺口的问题。[#22462](https://github.com/ant-design/ant-design/pull/22462) [@thisrabbit](https://github.com/thisrabbit)
- 🛠 调整 Radio.Group 逻辑，`value` 为 `undefined` 时为非受控状态。[#22245](https://github.com/ant-design/ant-design/pull/22245)
- 💄 微调 RangePicker 箭头阴影样式。[#22406](https://github.com/ant-design/ant-design/pull/22406)
- ⚡️ 减少 Row 在 `gutter` 是数组时非必要的额外渲染。[#22475](https://github.com/ant-design/ant-design/pull/22475) [@dolfje](https://github.com/dolfje)
- 🐞 修复 Select 下拉菜单的上下 padding。[#22251](https://github.com/ant-design/ant-design/pull/22251)
- 🐞 修复 Slider 使用 `nullable` 值时弹出提示会崩溃的问题。[#22482](https://github.com/ant-design/ant-design/pull/22482)
- Table
  - 🐞 修复 Table ColumnGroup 使用受控 `sorterOrder` 无效的问题。[#22450](https://github.com/ant-design/ant-design/pull/22450)
  - 🐞 修复 Table 边框圆角样式问题。[#22413](https://github.com/ant-design/ant-design/pull/22413) [@akshatmittal](https://github.com/akshatmittal)
  - 🐞 修复 Table 固定列高度样式问题。[#22367](https://github.com/ant-design/ant-design/pull/22367)
  - 🐞 修复 Table 展开行按钮在 ipad 下的样式问题。[#22334](https://github.com/ant-design/ant-design/pull/22334) [@BugHiding](https://github.com/BugHiding)
  - 🐞 修复 Table 在只设置 `onFilter` 时过滤无效的问题。[#22317](https://github.com/ant-design/ant-design/pull/22317)
  - 🛠 Table `column.filter` 的 value 定义可以支持 `boolean`。[#22277](https://github.com/ant-design/ant-design/pull/22277) [@xudongdev](https://github.com/xudongdev)
- 🐞 重构 DirectoryTree 以修复废弃 API 警告信息。[#22318](https://github.com/ant-design/ant-design/pull/22318)
- 🐞 修复 TreeSelect `treeIcon` 无效的问题。[#22437](https://github.com/ant-design/ant-design/pull/22437)
- 🐞 修复 Typography 嵌套列表的样式问题。[#22284](https://github.com/ant-design/ant-design/pull/22284)
- 🐞 调整 Upload `onChange` 返回参数 `fileList` 为不可变数据以解决渲染问题。[#22322](https://github.com/ant-design/ant-design/pull/22322)
- 🌎 国际化
  - 🇩🇪 更新德语国际化。[#22270](https://github.com/ant-design/ant-design/pull/22270) [@iChebbi](https://github.com/iChebbi)
  - 🇫🇷 更新法语国际化。[#22238](https://github.com/ant-design/ant-design/pull/22238) [@abenhamdine](https://github.com/abenhamdine)
- Typescript
  - 🐞 移除 Table `getCheckboxProps` 的 `checked` 类型定义。[#22391](https://github.com/ant-design/ant-design/pull/22391) [@geekrainy](https://github.com/geekrainy)

## 4.0.3

`2020-03-14`

- Menu
  - 🐞 修复 Menu 水平 Item 使用嵌套结构 Icon 会丢失 `margin` 的问题。[#22021](https://github.com/ant-design/ant-design/pull/22021)
  - 💄 优化 Menu 中 Icon 的样式。[#22090](https://github.com/ant-design/ant-design/pull/22090) [@x1mrdonut1x](https://github.com/x1mrdonut1x)
  - 🐞 修复 Menu 收起模式下设置 `getPopupContainer` 时标题显示错误的问题。[#22182](https://github.com/ant-design/ant-design/pull/22182)
  - 🐞 修复 Avatar 在水平 Menu 中的 `margin` 样式问题。[#22038](https://github.com/ant-design/ant-design/pull/22038) [#22033](https://github.com/ant-design/ant-design/pull/22033)
- Slider
  - 🐞 修复 Slider 垂直情况下拖动节点的位置错误的问题。[#22135](https://github.com/ant-design/ant-design/pull/22135) [@wendellhu95](https://github.com/wendellhu95)
  - 💄 修复 Slider 丢失的 `focus` 样式。[#22161](https://github.com/ant-design/ant-design/pull/22161)
- Table
  - 🐞 修复 Table 筛选功能抛出 `Cannot read property 'map' of undefined` 的问题。[#22096](https://github.com/ant-design/ant-design/pull/22096) [@yoyo837](https://github.com/yoyo837)
  - 🐞 修复 ConfigProvider 没有作用在 Table 过滤弹框上的问题。[#22133](https://github.com/ant-design/ant-design/pull/22133)
  - 🐞 修复 Table 树形结构下展开与固定列配合的样式问题。[#22131](https://github.com/ant-design/ant-design/pull/22131)
  - 🐞 修复 Table 选择列固定时展开列不固定的问题。[#22087](https://github.com/ant-design/ant-design/pull/22087)
  - 🐞 修复 Table 过滤菜单重置失效的问题。[#22079](https://github.com/ant-design/ant-design/pull/22079)
  - 🐞 修复 Table 筛选子菜单高度溢出屏幕的问题。[#22230](https://github.com/ant-design/ant-design/pull/22230)
- Form
  - 💄 优化 Form 的响应式和盒模型表现。[#21907](https://github.com/ant-design/ant-design/pull/21907) [@shaodahong](https://github.com/shaodahong)
  - 🐞 修复 FormItem 在 hooks 中报错的问题。[#22053](https://github.com/ant-design/ant-design/pull/22053) [@kagawagao](https://github.com/kagawagao)
- 🐞 修复 Input.Group 中使用 自定义图标换行的问题。[#22197](https://github.com/ant-design/ant-design/pull/22197) [@xrkffgg](https://github.com/xrkffgg)
- 💄 修复 Calendar 年月选择菜单内容被省略的问题。[#22148](https://github.com/ant-design/ant-design/pull/22148)
- 💄 调整 Select 单选框 `padding` 样式以防止下拉框内容的抖动。[#22167](https://github.com/ant-design/ant-design/pull/22167)
- 💄 修复 Dropdown 内容和图标重叠问题。[#22098](https://github.com/ant-design/ant-design/pull/22098) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Select 在 Firefox 下异常省略的问题。[#22101](https://github.com/ant-design/ant-design/pull/22101)
- 🐞 移除 PageHeader 中不必要的 `overflow: hidden` 样式以修复弹层隐藏问题，优化 PageHeader 右侧按钮的响应式表现。[#22030](https://github.com/ant-design/ant-design/pull/22030)
- 🐞 修复 Radio 组无法正确换行的问题。[#22229](https://github.com/ant-design/ant-design/pull/22229)
- 🐞 修复 TextArea `autoSize` 时在 Firefox 下不会自动滚动到底的问题。[#22014](https://github.com/ant-design/ant-design/pull/22014)
- 🇫🇷 补全的 fr_FR 国际化文本。[#22122](https://github.com/ant-design/ant-design/pull/22122) [@PaulJln](https://github.com/PaulJln)
- RTL
  - 💄 优化 Pagination 在 RTL 模式下的样式。[#22155](https://github.com/ant-design/ant-design/pull/22155) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 修复 Cascader RTL 模式下 icon 样式的错误的问题。[#22191](https://github.com/ant-design/ant-design/pull/22191) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化 Checkbox.Group 在 RTL 模式下样式。[#22186](https://github.com/ant-design/ant-design/pull/22186) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化 Radio.Button 在 RTL 模式下样式问题。[#22066](https://github.com/ant-design/ant-design/pull/22066) [@xrkffgg](https://github.com/xrkffgg)
  - 🐞 优化 Table 固定列在 RTL 下的样式问题。[#21914](https://github.com/ant-design/ant-design/pull/21914) [@saeedrahimi](https://github.com/saeedrahimi)
  - 💄 调整 Dropdown 在 RTL 模式的下拉图标方向。[#22104](https://github.com/ant-design/ant-design/pull/22104) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化 Breadcrumb 在 RTL 模式下样式。[#22159](https://github.com/ant-design/ant-design/pull/22159) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化 Steps 组件在 RTL 模式下的样式。[#22175](https://github.com/ant-design/ant-design/pull/22175) [@xrkffgg](https://github.com/xrkffgg)
  - 💄 优化表单反馈下在 RTL 模式下的样式。[#22222](https://github.com/ant-design/ant-design/pull/22222)
- TypeScript
  - 🔷 更新 FormList 的 `operation` 类型定义。[#22058](https://github.com/ant-design/ant-design/pull/22058) [@kagawagao](https://github.com/kagawagao)
  - 🔷 更新 Tooltip 等组件的 `trigger` 参数的定义。[#22043](https://github.com/ant-design/ant-design/pull/22043) [@wendellhu95](https://github.com/wendellhu95)

## 4.0.2

`2020-03-08`

- Form
  - 🐞 修复嵌套 Form.Item 移除会导致 React 报警告的问题。[#21896](https://github.com/ant-design/ant-design/pull/21896)
  - ⚡️ `Form.useForm` 现在将返回相同的实例以优化重复渲染的问题。[#21927](https://github.com/ant-design/ant-design/pull/21927)
  - ⚡️ 重构 Form.Item 渲染逻辑以使其子元素为纯组件时值变更只会渲染一次。[#21991](https://github.com/ant-design/ant-design/pull/21991)
  - ⚡️ FormContext 使用 memoized 值避免 Form.Item 产生额外的渲染。[#21980](https://github.com/ant-design/ant-design/pull/21980) [@qiqiboy](https://github.com/qiqiboy)
- Table
  - 🐞 修复 Table 内浮层组件弹出方向异常的问题。[#21905](https://github.com/ant-design/ant-design/pull/21905)
  - 🐞 修复 Table `className` 和 `style` 作用在了错误的元素上的问题。[#21974](https://github.com/ant-design/ant-design/pull/21974)
  - 🐞 修复 Table `expandIconColumnIndex` 与 `rowSelection` 共用时的展示顺序问题。[#21915](https://github.com/ant-design/ant-design/pull/21915)
  - 🐞 修复 Table `size="small"` 时表头颜色和其他尺寸不一致的问题。[#21942](https://github.com/ant-design/ant-design/pull/21942)
- Select
  - 🐞 修复 Select 在空字符串值时的样式对齐问题。[#21880](https://github.com/ant-design/ant-design/pull/21880)
  - 🐞 修复小号 Select 在多选模式下 `tag` 文字不居中的问题。[#21940](https://github.com/ant-design/ant-design/pull/21940) [@xrkffgg](https://github.com/xrkffgg)
- Menu
  - 🐞 修复 Menu 弹出菜单底部边距丢失的问题。[#21867](https://github.com/ant-design/ant-design/pull/21867)
  - 🐞 修复 Menu 水平模式下 Menu.Item 只有一个 Icon 时仍然有额外 `margin` 的问题。[#21925](https://github.com/ant-design/ant-design/pull/21925)
  - 🐞 修复 Menu 弹出菜单超出屏幕高度的问题。[#21930](https://github.com/ant-design/ant-design/pull/21930)
- 🐞 修复 Badge 数字在 10 和 11 切换时的动画错误。[#21834](https://github.com/ant-design/ant-design/pull/21834) [@wendellhu95](https://github.com/wendellhu95)
- 🐞 修复 Radio.Button 上使用 Tooltip 会报 `Function components cannot be given refs` 警告。[#21895](https://github.com/ant-design/ant-design/pull/21895)
- 🐞 修复 Descriptions 内容为 falsy 值时样式丢失的问题。[#21901](https://github.com/ant-design/ant-design/pull/21901)
- 🐞 修复 DatePicker 在分隔符上的鼠标手型。[#21937](https://github.com/ant-design/ant-design/pull/21937) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 ConfigProvider `prefixCls` 在 Input.Password 上不生效的问题。[#21953](https://github.com/ant-design/ant-design/pull/21953) [@tdida](https://github.com/tdida)
- 🐞 修复 Carousel `dots` 控件不居中的问题。[#21960](https://github.com/ant-design/ant-design/pull/21960) [@liusiasi](https://github.com/liusiasi)
- 🐞 修复 Input.Search 边框高亮样式在 `rtl` 模式下丢失的问题。[#21946](https://github.com/ant-design/ant-design/pull/21946) [@xrkffgg](https://github.com/xrkffgg)
- Less
  - 🆕 新增 `@outline-fade` 变量。[#20227](https://github.com/ant-design/ant-design/pull/20227) [@Satloff](https://github.com/Satloff)
  - 🆕 新增 `@form-item-label-height` 变量。[#21912](https://github.com/ant-design/ant-design/pull/21912)
- TypeScript
  - 🌟 增强 Form.Item `renderProps` 定义。[#21911](https://github.com/ant-design/ant-design/pull/21911)

## 4.0.1

`2020-03-04`

- Form
  - 🐞 修复 Form help 受控时会导致 `react@16.13` 报警告的问题。[#21800](https://github.com/ant-design/ant-design/pull/21800) [#21702](https://github.com/ant-design/ant-design/pull/21702)
  - 🐞 修复 Form.Item 宽度在内容过长时会超出 Form 的样式问题。[#21682](https://github.com/ant-design/ant-design/pull/21682)
- Input
  - 🐞 修复 TextArea 样式在 `react@16.13` 下会报警告的问题。[#21703](https://github.com/ant-design/ant-design/pull/21703)
  - 🐞 修复 Input.Search 有 `prefix` 时的右边框样式问题。[#21753](https://github.com/ant-design/ant-design/pull/21753)
- Table
  - 🐞 修复 Table column 的 `filtered` 属性无效的问题。[#21825](https://github.com/ant-design/ant-design/pull/21825)
  - 🐞 修复 Table `locale` 无效的问题。[#21772](https://github.com/ant-design/ant-design/pull/21772)
  - 🐞 修复 Table.Column `sortOrder` 在 JSX 模式下无效的问题。[#21719](https://github.com/ant-design/ant-design/pull/21719)
  - 🐞 修复 Table 固定列在排序状态时的样式问题。[#21679](https://github.com/ant-design/ant-design/pull/21679)
- 🐞 修复 Dropdown 菜单里箭头图标的位置。[#21768](https://github.com/ant-design/ant-design/pull/21768) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 List 组件 `bordered` 和 `split` 属性冲突的问题。[#21784](https://github.com/ant-design/ant-design/pull/21784) [@MXWXZ](https://github.com/MXWXZ)
- 🐞 修复 Menu.Item 中 `a` 标签换行无法显示的问题。[#21699](https://github.com/ant-design/ant-design/pull/21699) [@shaodahong](https://github.com/shaodahong)
- 🐞 修复 `message.open` 中 `icon` 为空时报错的问题。[#21747](https://github.com/ant-design/ant-design/pull/21747) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复 Result `status` 属性不能赋值 string 或者 number 类型的问题。[#21691](https://github.com/ant-design/ant-design/pull/21691)
- 🐞 修复 Descriptions 报 `key` 重复的警告信息。[#21688](https://github.com/ant-design/ant-design/pull/21688)
- 💄 优化 Calendar 在窄屏幕下的标题样式。[#21813](https://github.com/ant-design/ant-design/pull/21813)
- 💄 Radio.Group 不再折行。[#21813](https://github.com/ant-design/ant-design/pull/21813)
- 🛠 重构 icons 导入代码以降低没有开启 tree shaking 的打包尺寸。[#21752](https://github.com/ant-design/ant-design/pull/21752)
- Typescript
  - 🐞 修复 Radio.Button 的类型定义。[#21807](https://github.com/ant-design/ant-design/pull/21807) [@jhoneybee](https://github.com/jhoneybee)
  - 🐞 修复了 `TreeSelect.SHOW_*` 的类型问题。[#21791](https://github.com/ant-design/ant-design/pull/21791) [@TennyZhuang](https://github.com/TennyZhuang)
  - 🐞 修复 TreeSelect 缺失 `suffix` 定义。[#21714](https://github.com/ant-design/ant-design/pull/21714)
  - 🐞 修复 Drawer `forceRender` 的 TypeScript 定义。[#21774](https://github.com/ant-design/ant-design/pull/21774)
  - 🐞 修复 Tree `treeData` 定义。[#21756](https://github.com/ant-design/ant-design/pull/21756)
  - 🐞 修复 Form.Item `renderProps` 的类型定义。[#21716](https://github.com/ant-design/ant-design/pull/21716)

## 4.0.0

`2020-02-28`

- 🏆 Ant Design v4 发布！点击[此处](https://github.com/ant-design/ant-design/issues/21656)查看更多信息。
- 🐞 Breadcrumb 使用 `path` 作为默认 key 以修复 `name` 作为 key 重名的冲突问题。[#21583](https://github.com/ant-design/ant-design/pull/21583) [@douxc](https://github.com/douxc)
- 🌟 Timeline.Item 支持 `label`。[#21560](https://github.com/ant-design/ant-design/pull/21560) [@shaodahong](https://github.com/shaodahong)
- 🐞 修复 Table 筛选菜单高度溢出屏幕的问题。[#21602](https://github.com/ant-design/ant-design/pull/21602)
- 💄 增加 Calendar 组件自定义显示内容的默认字体颜色。[#21598](https://github.com/ant-design/ant-design/pull/21598) [@xrkffgg](https://github.com/xrkffgg)
- 🚮 移除 DatePicker 针对自定义单元格的 3.x 的兼容类名。[#21589](https://github.com/ant-design/ant-design/pull/21589)
- 🐞 修复 RangePicker 在 IE11 下的样式渲染问题。[#21587](https://github.com/ant-design/ant-design/pull/21587)
- 🛠 Progress 中 `strokeColor` 属性现在会忽略错误的百分比参数。[#21564](https://github.com/ant-design/ant-design/pull/21564) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复 Progress `trailColor` 属性在 `type=line` 时无效果的问题。[#21552](https://github.com/ant-design/ant-design/pull/21552) [@AshoneA](https://github.com/AshoneA)
- 🐞 修复暗色主题下，组件在弹出层组件下的背景样式问题。[#21299](https://github.com/ant-design/ant-design/pull/21299)
  - 💄 优化暗色主题下色板透明度。
  - 🌟 新增 less 变量 `@popover-customize-border-color`、`@list-customize-card-bg`、`@table-expand-icon-bg`、`@steps-background`、`@pagination-item-input-bg` 用于主题定制。

## 4.0.0-rc.6

`2020-02-24`

- Form
  - 🌟 支持 `scrollToFirstError` 属性以简化提交表单滚动到错误字段的编码量。[#21462](https://github.com/ant-design/ant-design/pull/21462)
  - 🐞 修复 Form.Item 设置 `help` 时的样式问题。[#21476](https://github.com/ant-design/ant-design/pull/21476)
  - 🐞 修复 Form 和 BraftEditor 同时使用时抛错的问题。[#21425](https://github.com/ant-design/ant-design/pull/21425)
  - 🐞 修复 Form 验证信息切换时表单项抖动。[#21302](https://github.com/ant-design/ant-design/pull/21302) [@yoyo837](https://github.com/yoyo837)
- Upload
  - 🌟 Upload 组件 `showUploadList` 新增 `removeIcon` 和 `downloadIcon` 属性。[#21363](https://github.com/ant-design/ant-design/pull/21363) [@sdhr27](https://github.com/sdhr27)
  - 🐞 修复 Upload 识别图片类型逻辑错误。[#21473](https://github.com/ant-design/ant-design/pull/21473) [@holynewbie](https://github.com/holynewbie)
  - 💄 优化 Upload `showDownloadIcon` 默认不展示。[b4636](https://github.com/ant-design/ant-design/commit/b4636ab2dfdb006c14bdb3d5d7de09e1650c3567)
- Input
  - 🐞 修复 Input 在设置 `readOnly` 时 `allowClear` 仍然可以清除的问题。[#21494](https://github.com/ant-design/ant-design/pull/21494)
  - 🐞 修复 Input 点击 `prefix` / `suffix` 不会获得焦点的问题。[#21413](https://github.com/ant-design/ant-design/pull/21413)
- Table
  - 🐞 修复 Table 选择在树形结构子节点为 `null` 会崩溃的问题。[#21528](https://github.com/ant-design/ant-design/pull/21528)
  - 🐞 修复 Table 在 `small` 尺寸下固定列的样式问题。[#21431](https://github.com/ant-design/ant-design/pull/21431)
- Descriptions
  - 🐞 修复非 `bordered` 时，`label` 不存在仍然会渲染 label 元素的问题。[#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 修复 `vertical` 下且非 `bordered` 标题也是 `td` 的问题。[#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 修复 `vertical` 且 `bordered` 布局混乱的问题。[#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 修复 `style` 无法作用于 `Item` 的问题。[#21542](https://github.com/ant-design/ant-design/pull/21542)
  - 🐞 修复 `border` 下 `th` 还会额外获得无用的 `-colon` className 的问题。[#21542](https://github.com/ant-design/ant-design/pull/21542)
- 🌟 Select 增加 `tagRender` 支持自定义 tag 内容。[#21064](https://github.com/ant-design/ant-design/pull/21064) [@fguitton](https://github.com/fguitton)
- 💄 调整 Picker 的 `onPanelChange` 在面板值变化时也会触发。[#21455](https://github.com/ant-design/ant-design/pull/21455)
- 🐞 修复 Notification 第一次重复调用无法堆叠的问题。[#21531](https://github.com/ant-design/ant-design/pull/21531)
- 🐞 修复 TreeSelect 弹出层不更新的问题。[#21410](https://github.com/ant-design/ant-design/pull/21410)
- 💄 优化 Divider 内嵌文字的默认 `padding`，并新增 `@divider-text-padding` 变量。[#21407](https://github.com/ant-design/ant-design/pull/21407)
- Typescript
  - 🐞 修复 Form 组件类型。[#21483](https://github.com/ant-design/ant-design/pull/21483) [#21411](https://github.com/ant-design/ant-design/pull/21411)

## 4.0.0-rc.5

`2020-02-16`

- 🐞 修复 Form.Item 设置 `validateFirst` 导致表单无法提交的问题。[#21329](https://github.com/ant-design/ant-design/pull/21329)
- 🐞 解决了 InputNumber 删除连续相同数字时的光标位置问题。[#21344](https://github.com/ant-design/ant-design/pull/21344)
- 💄 Menu 移除掉多余的背景色。[#21365](https://github.com/ant-design/ant-design/pull/21365)
- 💄 优化 DatePicker 组件 `disabled` 状态的鼠标样式。[#21352](https://github.com/ant-design/ant-design/pull/21352)
- 🐞 修复 Affix 在移动设备下抛错 `Cannot read property getBoundingClientRect` 的问题。[#21350](https://github.com/ant-design/ant-design/pull/21350)
- 🐞 修复 Form 在屏幕小于 `xs` 时标签宽度不正确的问题。[#21222](https://github.com/ant-design/ant-design/pull/21222)
- 🐞 修复 Input 在 `size` 为 `large` 时的高度问题。[#21338](https://github.com/ant-design/ant-design/pull/21338)
- 🐞 修复 Badge 包裹模式下 `color` 属性失效的问题。[#21333](https://github.com/ant-design/ant-design/pull/21333)
- 🐞 修复 Alert 关闭按钮额外的 `padding`。[#21325](https://github.com/ant-design/ant-design/pull/21325)
- 💄 微调 Steps 文本 1px 使其居中对齐。[#21306](https://github.com/ant-design/ant-design/pull/21306)
- 💄 修复遗留的 Button.Group `large` 尺寸的样式问题。[#21307](https://github.com/ant-design/ant-design/pull/21307)
- 💄 修正 TextArea `allowClear` 中的输入边框半径的样式问题和 Input `suffix` 在 Firefox 下的样式问题。[#21316](https://github.com/ant-design/ant-design/pull/21316)
- 🐞 Pagination 自定义 `itemRender` 返回的上一页下一页现在会补充 `disabled` 属性。[#21361](https://github.com/ant-design/ant-design/pull/21361)
- 🇦🇿 添加了阿塞拜疆语翻译。[#21387](https://github.com/ant-design/ant-design/pull/21387) [@orkhan-huseyn](https://github.com/orkhan-huseyn)
- Typescript
  - 🔷 Menu 导出 `MenuItemGroupProps`。[#21356](https://github.com/ant-design/ant-design/pull/21356)
  - 🔷 Table 导出 `ColumnProps`。[#21321](https://github.com/ant-design/ant-design/pull/21321)

## 4.0.0-rc.4

`2020-02-09`

- 📖 官网提供了暗色模式下的 [色板](https://preview-21101-ant-design.surge.sh/docs/spec/dark-cn#%E5%9F%BA%E7%A1%80%E8%89%B2%E6%9D%BF) 和 [色板生成工具](https://preview-21101-ant-design.surge.sh/docs/spec/dark-cn#%E8%89%B2%E6%9D%BF%E7%94%9F%E6%88%90%E5%B7%A5%E5%85%B7)。[#21101](https://github.com/ant-design/ant-design/pull/21101)
- 🌟 Checkbox.Group 和 Radio.Group 的 `options` 属性中新增 `style` 字段，用于设置可选项的样式。[#21219](https://github.com/ant-design/ant-design/pull/21219)
- 🌟 Form.Item 新增 `validateFirst` 属性，用于设置当某一规则校验不通过时，是否停止剩下规则的校验。[#21178](https://github.com/ant-design/ant-design/pull/21178)
- 🌟 Modal 新增 `useModal` hook，以支持 `context` 访问。[#20949](https://github.com/ant-design/ant-design/pull/20949)
- 🌟 Notification 新增 `useNotification` hook，以支持 `context` 访问。[#21275](https://github.com/ant-design/ant-design/pull/21275)
- 🌟 Select、TreeSelect、DatePicker、TimePicker 和 Cascader 新增 `bordered` 属性，用于设置组件是否有边框。[#21242](https://github.com/ant-design/ant-design/pull/21242)
- 🌟 Transfer 新增 `selectAllLabels` 属性，用于自定义头部选择框的文案。[#21139](https://github.com/ant-design/ant-design/pull/21139) [@morenyang](https://github.com/morenyang)
- 💄 重新设计了 Tabs 火柴棍的样式。[#21256](https://github.com/ant-design/ant-design/pull/21256)
- 💄 新增 `@form-item-label-font-size` less 变量。[#21216](https://github.com/ant-design/ant-design/pull/21216)
- 🐞 修复 Badge 在 Typography 下数字错位的问题。[#21235](https://github.com/ant-design/ant-design/pull/21235)
- 🐞 修复 Checkbox 和 Checkbox.Group 之间被其他组件隔断时多选框无法选中的问题。[#21146](https://github.com/ant-design/ant-design/pull/21146) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Collapse.Panel 设置了 `extra` 属性时内容宽度变窄的问题。[#21202](https://github.com/ant-design/ant-design/pull/21202) [@zhiyuc123](https://github.com/zhiyuc123)
- Form
  - 🐞 修复 Form.Item 没有设置 `name` 属性时必填校验不生效的问题。[#21168](https://github.com/ant-design/ant-design/pull/21168)
  - 🐞 修复 Form.Item 的 `name` 属性为 `0` 时数据绑定不生效的问题。[#21186](https://github.com/ant-design/ant-design/pull/21186) [@wanjas](https://github.com/wanjas)
  - 🐞 修复 Form.Item 的 `help` 属性从有到无时会造成布局抖动的问题。[#21211](https://github.com/ant-design/ant-design/pull/21211)
- Input
  - 🐞 修复设置了前缀时校验样式不正确的问题。[#21121](https://github.com/ant-design/ant-design/pull/21121)
  - 🐞 修复设置了前缀或后缀时 `size` 属性不生效的问题。[#21290](https://github.com/ant-design/ant-design/pull/21290) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Radio.Group 中使用 Badge 的样式问题。[#21215](https://github.com/ant-design/ant-design/pull/21215)
- 🐞 修复 Select 在多选或标签模式下上下行之间没有外间距的问题。[#21175](https://github.com/ant-design/ant-design/pull/21175)
- 🐞 修复 Slider 的锚点聚焦样式错误的问题。[#21244](https://github.com/ant-design/ant-design/pull/21244) [@Kermit-Xuan](https://github.com/Kermit-Xuan)
- 🐞 修复 Steps 在 `size="small"` 和 `labelPlacement="vertical"` 时图标没有对齐的问题。[#21258](https://github.com/ant-design/ant-design/pull/21258)
- Table
  - 🐞 修复数据项没有 `children` 字段时 `expandIcon` 属性不生效的问题。[#21169](https://github.com/ant-design/ant-design/pull/21169)
  - 🐞 修复 Column 的 `sorter` 属性不生效的问题。[#21194](https://github.com/ant-design/ant-design/pull/21194)
  - 🐞 修复自定义筛选无法输入的问题。[#21218](https://github.com/ant-design/ant-design/pull/21218)
- 🐞 修复 TimePicker 的 `defaultOpenValue` 属性不生效的问题。[#21198](https://github.com/ant-design/ant-design/pull/21198)
- Transfer
  - 🐞 修复头部选择框文案的单位展示不正确的问题。[#21136](https://github.com/ant-design/ant-design/pull/21136) [@morenyang](https://github.com/morenyang)
  - 🐞 修复搜索框中的搜索图标没有垂直居中的问题。[#21247](https://github.com/ant-design/ant-design/pull/21247)
- 🐞 修复 Typography 在可编辑状态时光标没有在输入框末尾的问题。[#21268](https://github.com/ant-design/ant-design/pull/21268)

## 4.0.0-rc.3

`2020-01-27`

- 🛠 移除 Countdown 组件的 `moment` 依赖。[#21108](https://github.com/ant-design/ant-design/pull/21108) [@morenyang](https://github.com/morenyang)
- 🐞 修复 Input `suffix / prefix` 样式与 `addonBefore / addonAfter` 冲突的问题。[#21105](https://github.com/ant-design/ant-design/pull/21105)
- 💄 完善 Timeline 组件 RTL 模式下的样式。[#21068](https://github.com/ant-design/ant-design/pull/21068) [@xrkffgg](https://github.com/xrkffgg)
- 💄 更新基本样式 `clearfix` 移除过时的 `zoom` 属性。[#21109](https://github.com/ant-design/ant-design/pull/21109) [@morenyang](https://github.com/morenyang)
- 💄 Card 组件使用 `@font-size-base` 变量以代替固定的 `14px`。[#21107](https://github.com/ant-design/ant-design/pull/21107) [@morenyang](https://github.com/morenyang)
- 💄 调整 Layout 组件传入的 `className` 到最后以提高其优先级。[#21074](https://github.com/ant-design/ant-design/pull/21074) [@yoyo837](https://github.com/yoyo837)
- Typescript
  - 🐞 修复 Tree 中 AntTreeNodeMouseEvent 的定义问题。[#21102](https://github.com/ant-design/ant-design/pull/21102) [@Jirka-Lhotka](https://github.com/Jirka-Lhotka)
  - 🐞 修复 Form.Item 返回的类型定义。[#21067](https://github.com/ant-design/ant-design/pull/21067)

## 4.0.0-rc.2

`2020-01-21`

- 🛠 部分演示改写成 React hooks 和 TypeScript。[#21045](https://github.com/ant-design/ant-design/pull/21045)
- 🐞 修复 Input/Select 等组件的 `1px` 对齐问题。[#20869](https://github.com/ant-design/ant-design/pull/20869)
- Dropdown
  - 🆕 新增 `buttonsRender` 用于定制按钮，如给左侧按钮增加 Tooltip。[#20815](https://github.com/ant-design/ant-design/pull/20815)
  - 🐞 修复禁用的 Dropdown.Button 在 Chrome 下 Tooltip 不会消失的问题。[#20960](https://github.com/ant-design/ant-design/pull/20960)
- Input
  - 🐞 修复 Input `prefix` 和 `suffix` 和输入内容重叠的问题。[#20872](https://github.com/ant-design/ant-design/pull/20872)
  - 🐞 修复 Input `placeholder` 在 Firefox 下的颜色问题。[#20850](https://github.com/ant-design/ant-design/issues/20850)
- Table
  - 🐞 修复 `onChange` 返回缓存排序、过滤状态的问题。[#20858](https://github.com/ant-design/ant-design/pull/20858)
  - 🐞 修复全选在所有选项为禁用时为勾选状态的问题。[#20968](https://github.com/ant-design/ant-design/pull/20968)
  - 🐞 修复 `locale.emptyText` 不生效的问题。[#21024](https://github.com/ant-design/ant-design/pull/21024)
- Select
  - 🐞 修复 `placeholder` 的换行和对齐问题。[#20883](https://github.com/ant-design/ant-design/pull/20883) [#20884](https://github.com/ant-design/ant-design/pull/20884)
  - 🐞 修复多选 Select 的左边距。[#20861](https://github.com/ant-design/ant-design/pull/20861)
  - 🐞 修复多选 Select 清除按钮和选项重叠的问题。[#20914](https://github.com/ant-design/ant-design/pull/20914)
- Form
  - 🆕 `scrollToField` 方法支持传入滚动相关参数。[#20774](https://github.com/ant-design/ant-design/pull/20774)
  - 🐞 修复 Form.Item 改变 `help` 会导致布局闪动的问题。[#20886](https://github.com/ant-design/ant-design/pull/20886)
  - 🐞 修复 Form.Item 即便不是一个真正的 Field 也会触发重新渲染的问题。[#20963](https://github.com/ant-design/ant-design/pull/20963)
  - 🐞 修复 Form.Item 不处理 `help=""` 的问题。[#21026](https://github.com/ant-design/ant-design/pull/21026)
  - 🐞 修复 Form.Item `label` 在屏幕小于 xs 并且 `span` 不是 24 的时候对齐不正确。[#20836](https://github.com/ant-design/ant-design/issues/20836)
- 🐞 修复 message 隐藏时阴影切边的问题。[#20856](https://github.com/ant-design/ant-design/issues/20856)
- 🐞 修复 Tooltip `title` 为 `0` 时没有显示问题。[#20894](https://github.com/ant-design/ant-design/pull/20894)
- 🐞 修复 List `actions` 位置不在右边的问题。[#20897](https://github.com/ant-design/ant-design/pull/20897)
- 🆕 新增一个 Tree 的虚拟滚动演示。[#20911](https://github.com/ant-design/ant-design/pull/20911)
- 🐞 修复 AutoComplete 演示样式错位的问题。[#20946](https://github.com/ant-design/ant-design/pull/20946)
- 🗑 移除掉 AutoComplete 中无用的 `labelInValue` 定义。[#20967](https://github.com/ant-design/ant-design/pull/20967)
- 🐞 修复 Drawer 组件添加 `footerStyle` 属性后控制台报错。[#20983](https://github.com/ant-design/ant-design/pull/20983)
- 🐞 修复 Breadcrumb 在 `rtl` 模式下的样式问题。[#21054](https://github.com/ant-design/ant-design/pull/21054)
- 💄 调整 Layout `className` 的顺序到最后。[#21041](https://github.com/ant-design/ant-design/pull/21041)
- TypeScript
  - 🐞 开放 DatePicker 的相关接口定义。[#20900](https://github.com/ant-design/ant-design/pull/20900)
- Less 变量
  - 🆕 重新加回 `@border-radius-sm` 变量。[#20818](https://github.com/ant-design/ant-design/pull/20818)
  - 🆕 新增 `@timeline-item-padding-bottom` 变量。[#21013](https://github.com/ant-design/ant-design/pull/21013)
  - 🆕 新增 `@layout-header-color` 变量。[#21033](https://github.com/ant-design/ant-design/pull/21033)

## 4.0.0-rc.1

`2020-01-11`

- 🌟 Drawer 增加 `footer` 及 `footerStyle` 属性。[#20690](https://github.com/ant-design/ant-design/pull/20690) [@DeanVanNiekerk](https://github.com/DeanVanNiekerk)
- 🌟 Switch 增加 `@switch-min-width` 和 `@switch-sm-min-width` less 变量。[#20829](https://github.com/ant-design/ant-design/pull/20829) [@abdih](https://github.com/abdih)
- Table
  - 🐞 修复在 `expandRowByClick` 下展开 Icon 点击失效。[#20808](https://github.com/ant-design/ant-design/pull/20808)
  - 🐞 修复在缩放下的展开行宽度样式。[#20805](https://github.com/ant-design/ant-design/pull/20805)
  - 🐞 修复背景色优先级高导致用户自定义样式被覆盖的问题。[#20794](https://github.com/ant-design/ant-design/pull/20794)
  - 🐞 修复在 `rowSelection` 下 `fixed` 属性失效。[#20735](https://github.com/ant-design/ant-design/pull/20735)
  - 🐞 修复固定列在 Chrome 下放大时出现纵向滚动条问题。[#20705](https://github.com/ant-design/ant-design/pull/20705)
  - 🐞 修复 `columns` 为空时 Table 报错问题。[#20703](https://github.com/ant-design/ant-design/pull/20703)
- 💄 优化 Calendar 基本样式月份下拉框宽度、通知事项的文字顺序以及卡片模式，选择框的尺寸。[#20790](https://github.com/ant-design/ant-design/pull/20790) [@xrkffgg](https://github.com/xrkffgg)
- DatePicker
  - 💄 优化圆角连接处 `border-radius`。[#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 修复选中样式重叠。[#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 修复底部额外分割线。[#20736](https://github.com/ant-design/ant-design/pull/20736)
  - 🐞 修复预设范围的按钮样式。[#20760](https://github.com/ant-design/ant-design/pull/20760) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Input 值为 `undefined` 时不能输入的问题。[#20783](https://github.com/ant-design/ant-design/pull/20783)
- 🐞 修复 Carousel 组件 left/right 模式下卡片轮播方向。[#20781](https://github.com/ant-design/ant-design/pull/20781) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Grid 响应式 gutter 在 SSR 下初始值为 `0` zIndex 的问题。[#20762](https://github.com/ant-design/ant-design/pull/20762)
- 🐞 修复 InputNumber、Select、Table 等组件的图标大小问题。[#20765](https://github.com/ant-design/ant-design/pull/20765)
- 🐞 修复 Badge 在 Table 固定列中穿透的问题。[#20751](https://github.com/ant-design/ant-design/pull/20751)
- 💄 微调默认字体和 tailwindcss 一致。[#20747](https://github.com/ant-design/ant-design/pull/20747)
- 🐞 修复 TextArea `autoSize` 在 FireFox 浏览器下闪烁问题。[#20737](https://github.com/ant-design/ant-design/pull/20737)
- 🐞 修复 Form.Item 动态校验下错误提示不同步的问题。[#20725](https://github.com/ant-design/ant-design/pull/20725)
- 🐞 修复 Form.Item 不设置 `hasFeedback` 时校验，图标闪动问题。[#20691](https://github.com/ant-design/ant-design/pull/20691)
- 🐞 修复 Cascader `fieldNames` 中 `label` 和 `value` 共用一个值时搜索功能失效的问题。[#20720](https://github.com/ant-design/ant-design/pull/20720)
- 🐞 修复 Collapse 背景使用错误的 less 变量。[#20718](https://github.com/ant-design/ant-design/pull/20718) [@kuitos](https://github.com/kuitos)
- 🐞 修复 Slider 中 Tooltip 不跟随鼠标的问题。[#20699](https://github.com/ant-design/ant-design/pull/20699)
- 🐞 修复 Card 封面图片被拉伸的问题。[#20701](https://github.com/ant-design/ant-design/pull/20701)
- 🐞 修复 Typography 使用 `suffix` 属性时溢出问题。[#20689](https://github.com/ant-design/ant-design/pull/20689) [@zouxiaomingya](https://github.com/zouxiaomingya)
- 🐞 修复 AutoComplete 下使用 Input 时的样式错误。[#20686](https://github.com/ant-design/ant-design/pull/20686)
- 🐞 修复 Form 下 Input.Group 偏上一像素的问题。[#20681](https://github.com/ant-design/ant-design/pull/20681)
- TypeScript
  - 🐞 导出 Form 接口类型。[3a1c5](https://github.com/ant-design/ant-design/commit/3a1c51010fecfa59f63f5e09027805a141e9ec11)
  - 🐞 修复 Table 类型缺失。[#20789](https://github.com/ant-design/ant-design/pull/20789)
  - 🐞 修复 Table.Column 及 Table.ColumnGroup 定义。[#20695](https://github.com/ant-design/ant-design/pull/20695)

## 4.0.0-rc.0

`2020-01-04`

Ant Design 4.0-rc 发布，发布文档请查看[此处](https://github.com/ant-design/ant-design/issues/20661)。

⚠️ 从 v3 迁移到 v4 请参考[迁移文档](/docs/react/migration-v4)。

### 新增功能及改进

- 🌟 antd 打包尺寸优化，js gzipped 从 532.75KB 下降到 289.89 KB。[#20356](https://github.com/ant-design/ant-design/pull/20356)
- 💄 新增黑暗主题支持。[#20281](https://github.com/ant-design/ant-design/pull/20281)
- 🌟 ConfigProvider 支持 `direction` 国际化设置 `rtl`。[#19380](https://github.com/ant-design/ant-design/pull/19380)
- 🌟 全新 Form 组件。[#17327](https://github.com/ant-design/ant-design/pull/17327)
  - 🌟 Form 组件自带数据绑定功能。
  - 🌟 字段值改动只会影响相关组件的渲染而非整个 Form。
  - 🌟 新增 `initialValues` 以代替原 field 初始化字段。
  - 🌟 新增 `validateMessages` 以支持修改校验模板。
  - 🌟 新增 `onFinish` 与 `onFinishFailed` 完成整体组件校验逻辑。
  - 🌟 新增 `onFieldsChange` 与 `onValuesChange` 以用于受控状态触发。
  - 🌟 提供 `useForm` 的 hook 支持。
  - 🌟 Form.Item 新增 `name` 属性以进行数据绑定。
  - 🌟 Form.Item `validateTrigger` 将只进行校验触发而不会同时收集字段值。
  - 🌟 Form.Item 新增 `rules` 属性以进行数据校验。
  - 🌟 Form.Item 新增 `shouldUpdate` 属性以支持 render props。
  - 🌟 Form.Item 新增 `dependencies` 属性以简化相关字段更新逻辑。
  - 🌟 Form.Item 新增 `noStyle` 属性以及添加无样式数据绑定。
  - 🌟 新增 Form.List 组件以简化增删改查操作。
  - 🌟 新增 Form.Provider 组件以支持多表联动。
- 🌟 全新 Table 组件。[#19678](https://github.com/ant-design/ant-design/pull/19678)
  - 🌟 添加 `summary` 支持总结行。
  - 🌟 现在 `fixedColumn`、`expandable`、`scroll` 可以混合使用。
  - 🌟 支持多列排序。
  - 🌟 支持自定义 `body` 并添加虚拟滚动例子。
  - 🌟 展开相关功能归入 `expandable` 属性并添加 `rowExpandable` 支持。
  - 🎉 使用 css `sticky` 实现固定效果以优化性能。
  - 💄 优化 `expand` 动画效果。
- 🌟 全新 DatePicker、 TimePicker 与 Calendar 组件。[#20023](https://github.com/ant-design/ant-design/pull/20023)
  - 🌟 支持自定义日期库。
  - 🌟 添加 `picker` 支持设置选择器（不再需要通过受控 `mode` 模拟选择器）。
  - 🌟 全范围选择器支持：时间、日期、周、月、年。
  - 🌟 范围选择器现在可以单独选择开始与结束时间。
  - 🌟 范围选择器可以为开始与结束时间单独设置 `disabled`。
  - 🌟 范围选择器可以允许开始与结束时间为空。
  - 🌟 优化手工输入与键盘交互支持。
  - 🌟 支持 `inputReadOnly` 禁用手动输入。
- 🌟 移除 Icon，使用 `@ant-design/icons` 代替。[#18217](https://github.com/ant-design/ant-design/pull/18217)
- Skeleton
  - 🌟 支持 Skeleton.Avatar 占位组件。[#19898](https://github.com/ant-design/ant-design/pull/19898) [@Rustin-Liu](https://github.com/Rustin-Liu)
  - 🌟 支持 Skeleton.Button 占位组件。[#19699](https://github.com/ant-design/ant-design/pull/19699) [@Rustin-Liu](https://github.com/Rustin-Liu)
  - 🌟 支持 Skeleton.Input 占位组件。[#20264](https://github.com/ant-design/ant-design/pull/20264) [@Rustin-Liu](https://github.com/Rustin-Liu)
- 🌟 Tree 支持虚拟滚动。[#18172](https://github.com/ant-design/ant-design/pull/18172)
- 🌟 Tree 增强无障碍支持以及键盘交互。[#18866](https://github.com/ant-design/ant-design/pull/18866)
- 🌟 Select 使用虚拟滚动并增强无障碍支持以及键盘交互。[#18658](https://github.com/ant-design/ant-design/pull/18658)
  - 🌟 `value` 为 `undefined` 时，改为非受控模式。
- 🌟 TreeSelect 使用虚拟滚动并优化键盘支持。[#19040](https://github.com/ant-design/ant-design/pull/19040)
  - 🌟 `value` 为 `undefined` 时，改为非受控模式。
- 🌟 Button 添加 `danger` 的 `default` 和 `link` 样式。[#19837](https://github.com/ant-design/ant-design/pull/19837)
- 🌟 Form 与 ConfigProvider 支持 `size` 设置包含组件尺寸。[#20570](https://github.com/ant-design/ant-design/pull/20570)
- 🌟 Typography 增加 `suffix` 属性。[#20224](https://github.com/ant-design/ant-design/pull/20224)
- 🌟 Progress 增加 `steps` 子组件。[#19613](https://github.com/ant-design/ant-design/pull/19613)
- 🌟 TextArea 支持 `onResize`。[#20408](https://github.com/ant-design/ant-design/pull/20408)
- 🌟 新增 Alert.ErrorBoundary 用于提供友好的出错拦截和提示。[#19923](https://github.com/ant-design/ant-design/pull/19923)
- 🌟 Upload 支持 iconRender 以自定义 icon。[#20034](https://github.com/ant-design/ant-design/pull/20034) [@qq645381995](https://github.com/qq645381995)
- 🌟 Tag 组件预设状态颜色。[#19399](https://github.com/ant-design/ant-design/pull/19399)
- 🌟 Grid 使用 `flex` 布局。[#16635](https://github.com/ant-design/ant-design/pull/16635)
- 🐞 修复 Carousel 组件 `dotposition` 为 `left | right` 的显示错误。[#20645](https://github.com/ant-design/ant-design/pull/20645) [@xrkffgg](https://github.com/xrkffgg)
- 🐞 修复 Alert 组件文本溢出的问题。[#20318](https://github.com/ant-design/ant-design/pull/20318)
- 🙅 移除废弃 API 的警告信息。[#17510](https://github.com/ant-design/ant-design/pull/17510)
- 🙅 为使用 v3 字符串作为 icon 的 Avatar, Button, Modal.method 和 Result 组件增加 warning。[#20226](https://github.com/ant-design/ant-design/pull/20226)
- 💄 添加 `@border-color-split-popover`、`@input-icon-hover-color`、`@select-clear-background`、`@cascader-menu-border-color-split`、`@modal-header-border-color-split`、`@skeleton-to-color`、`@transfer-item-hover-bg` 等 less 变量。[#20070](https://github.com/ant-design/ant-design/pull/20070)

## 3.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.zh-CN.md) 查看 `3.x` 的 Change Log。

## 2.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.zh-CN.md) 查看 `2.x` 的 Change Log。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
