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
- 💄 修正 TextArea `allowClear` 中的输入边框半径的样式问题和 Input `Suffix` 在 Firefox 下的样式问题。[#21316](https://github.com/ant-design/ant-design/pull/21316)
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
- 🐞 修复 Steps 在 size="small" 和 labelPlacement="vertical" 时图标没有对齐的问题。[#21258](https://github.com/ant-design/ant-design/pull/21258)
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
- 🐞 修复 Input `suffix / prefix` 样式与 `addonBefore / addonAfter` 冲突的问题。[#21105](https://github.com/ant-design/ant-design/pull/21105) [@zombieJ](https://github.com/zombieJ)
- 💄 完善 Timeline 组件 RTL 模式下样式。[#21068](https://github.com/ant-design/ant-design/pull/21068) [@xrkffgg](https://github.com/xrkffgg)
- 💄 更新基本样式 `clearfix` 移除过时的 `zoom` 属性。[#21109](https://github.com/ant-design/ant-design/pull/21109) [@morenyang](https://github.com/morenyang)
- 💄Card 组件使用 `@font-size-base` 变量以代替固定的 `14px`。[#21107](https://github.com/ant-design/ant-design/pull/21107) [@morenyang](https://github.com/morenyang)
- 💄 调整 Layout 组件传入的 `className` 到最后以提高其优先级。[#21074](https://github.com/ant-design/ant-design/pull/21074) [@yoyo837](https://github.com/yoyo837)

- Typescript
  - 🐞 修复 Tree 中 AntTreeNodeMouseEvent 的定义问题。[#21102](https://github.com/ant-design/ant-design/pull/21102) [@Jirka-Lhotka](https://github.com/Jirka-Lhotka)
  - 🐞 修复 Form.Item 返回的类型定义。[#21067](https://github.com/ant-design/ant-design/pull/21067) [@zombieJ](https://github.com/zombieJ)

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
