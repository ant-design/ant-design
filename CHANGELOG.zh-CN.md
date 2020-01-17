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
