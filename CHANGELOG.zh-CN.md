---
order: 6
title: 更新日志
timeline: true
tag: vVERSION
---

`antd` 遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 6.3.7

`2026-04-27`

- Input
  - 🐞 修复 Input.OTP 在 Windows 下选中文本时可能显示真实值的问题。[#57689](https://github.com/ant-design/ant-design/pull/57689) [@QDyanbing](https://github.com/QDyanbing)
  - ⌨️ 优化 Input 清除按钮的可访问性。[#57432](https://github.com/ant-design/ant-design/pull/57432) [@cyphercodes](https://github.com/cyphercodes)
- 🐞 修复 Card 在未传入内容时仍渲染空 body 容器的问题。[#57735](https://github.com/ant-design/ant-design/pull/57735) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 InputNumber 选中文本时的高亮圆角问题。[#57705](https://github.com/ant-design/ant-design/pull/57705) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Tooltip 的 ConfigProvider 语义化配置比如 `className`、`styles` 等泄漏到 Popover 和 Popconfirm 的问题。[#57731](https://github.com/ant-design/ant-design/pull/57731) [@pikanohup](https://github.com/pikanohup)
- 🐞 修复 Typography.Link 在 disabled 状态下无法触发复制、编辑等操作按钮的问题。[#57762](https://github.com/ant-design/ant-design/pull/57762) [@aviu16](https://github.com/aviu16)
- 🐞 修复 ESM/CJS 默认导出 ConfigProvider 语言包失效的问题。[#57318](https://github.com/ant-design/ant-design/pull/57318) [@ug-hero](https://github.com/ug-hero)
- 💄 修复 Alert 的关闭按钮没有焦点样式的问题。[#57695](https://github.com/ant-design/ant-design/pull/57695) [@KittyGiraudel](https://github.com/KittyGiraudel)

## 6.3.6

`2026-04-17`

- 🐞 修复 InputNumber 禁用步进按钮仍显示悬浮样式的问题。 [#57592](https://github.com/ant-design/ant-design/pull/57592) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Space.Addon 在紧凑布局中展示中文等 CJK 内容时会换行的问题。 [#57622](https://github.com/ant-design/ant-design/pull/57622) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Cascader 菜单项长选项文本的省略样式问题。 [#57540](https://github.com/ant-design/ant-design/pull/57540) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Image 通过键盘打开预览时焦点未被正确锁定的问题，并在关闭预览后恢复焦点到触发元素。 [#57613](https://github.com/ant-design/ant-design/pull/57613) [#57614](https://github.com/ant-design/ant-design/pull/57614) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 修复 Input 禁用状态边框未使用 `colorBorderDisabled` token 的问题。 [#57518](https://github.com/ant-design/ant-design/pull/57518) [@Gdhanush-13](https://github.com/Gdhanush-13)
- 🐞 MISC: 修复部分展开动画崩溃的问题。 [#57636](https://github.com/ant-design/ant-design/pull/57636) [@momesana](https://github.com/momesana)
- 🐞 修复 Notification 在 title 为空时关闭按钮与描述内容重叠的问题。 [#57590](https://github.com/ant-design/ant-design/pull/57590) [@EndlessLucky](https://github.com/EndlessLucky)
- 🐞 修复 Radio 禁用状态下 hover 仍显示主色的问题。 [#57562](https://github.com/ant-design/ant-design/pull/57562) [@yfy3939](https://github.com/yfy3939)
- Table
  - ⚡️ 优化 Table 筛选性能，缓存展开后的筛选键，避免重复计算。 [#57546](https://github.com/ant-design/ant-design/pull/57546) [@Jiyur](https://github.com/Jiyur)
  - ⚡️ 优化 Table 筛选搜索性能，复用规范化后的搜索输入。 [#57651](https://github.com/ant-design/ant-design/pull/57651) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🐞 修复 Table `rowSelection` 默认未使用 Design Token 中 `selectionColumnWidth` 的问题。 [#57621](https://github.com/ant-design/ant-design/pull/57621) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🐞 修复 Design Token 阴影 token 未适配暗色主题的问题。 [#57511](https://github.com/ant-design/ant-design/pull/57511) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Transfer 列表项禁用时移除按钮在悬停下仍会变色的问题。 [#57579](https://github.com/ant-design/ant-design/pull/57579) [@Jiyur](https://github.com/Jiyur)
- 🐞 修复 Tree 父级节点出现多行内容时 checkbox、switcher 和 content 未整体对齐的问题。 [#57471](https://github.com/ant-design/ant-design/pull/57471) [@jiangrong-devops](https://github.com/jiangrong-devops)

## 6.3.5

`2026-03-30`

- 🐞 修复 Image 预览底部操作按钮没有重置原生按钮样式的问题。[#57491](https://github.com/ant-design/ant-design/pull/57491) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 TimePicker 在移动端触摸设备无法直接滚动时间列的问题。[#57468](https://github.com/ant-design/ant-design/pull/57468) [@afc163](https://github.com/afc163)
- 🐞 杂项：修复 Icon 在特定场景没有居中对齐的问题。[#57460](https://github.com/ant-design/ant-design/pull/57460) [@QDyanbing](https://github.com/QDyanbing)

## 6.3.4

`2026-03-24`

- 🔥 新增官方命令行工具 [`@ant-design/cli`](https://www.npmjs.com/package/@ant-design/cli)，支持离线查询 Ant Design 组件知识、分析项目用法及提供迁移指导。[#57413](https://github.com/ant-design/ant-design/pull/57413) [@afc163](https://github.com/afc163)
- 🐞 修复 Form.List 在使用 `onValuesChange` 时丢失同级字段值的问题。[#57399](https://github.com/ant-design/ant-design/pull/57399) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 `useToken` 缺少 `screenXXXLMin` 导致生成错误的 antd.css 的问题。[#57372](https://github.com/ant-design/ant-design/pull/57372) [@sealye09](https://github.com/sealye09)
- 🐞 修复 ConfigProvider 组件配置的类型定义，为已支持的组件暴露语义化 `classNames` 和 `styles`。[#57396](https://github.com/ant-design/ant-design/pull/57396) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Image 组件 `fetchPriority` 属性未正确透传到 `<img>` 元素的问题。[#57392](https://github.com/ant-design/ant-design/pull/57392) [@aojunhao123](https://github.com/aojunhao123)
- Menu
  - 🐞 修复通过 ConfigProvider 自定义 Menu 的 `itemHoverColor` 时，SubMenu 父级菜单项 hover 状态颜色不生效的问题。[#57374](https://github.com/ant-design/ant-design/pull/57374) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 修复 Menu 自定义 `collapsedIconSize` 后折叠图标看起来未居中的问题。[#57360](https://github.com/ant-design/ant-design/pull/57360) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Table 在开启滚动时列头中受控 Popover 被重复渲染的问题。[#57342](https://github.com/ant-design/ant-design/pull/57342) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Transfer `render` 属性返回 JSX 元素时搜索功能失效的问题。[#57133](https://github.com/ant-design/ant-design/pull/57133) [@WustLCQ](https://github.com/WustLCQ)
- 🐞 修复 Tree 开启 `showLine` 时自定义 `switcherIcon` 缺少 `switcher-line-icon` 类名导致样式异常的问题。[#57303](https://github.com/ant-design/ant-design/pull/57303) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Watermark 在未传入 `onRemove` 时的 TypeScript 报错。[#57344](https://github.com/ant-design/ant-design/pull/57344) [@QDyanbing](https://github.com/QDyanbing)

## 6.3.3

`2026-03-16`

- Image
  - 💄 优化 Image 预览蒙层 blur 效果的 `backdrop-filter` 过渡，减少闪烁感。[#57299](https://github.com/ant-design/ant-design/pull/57299) [@mango766](https://github.com/mango766)
  - 🐞 修复 Image 在 `movable={false}` 时仍显示 move 光标的问题。[#57288](https://github.com/ant-design/ant-design/pull/57288) [@ug-hero](https://github.com/ug-hero)
- ⌨️ 优化 App 链接的 `:focus-visible` 外框样式，提升键盘可访问性。[#57266](https://github.com/ant-design/ant-design/pull/57266) [@ug-hero](https://github.com/ug-hero)
- 🐞 修复 Form 必填标记文案中硬编码 `SimSun` 字体的问题。[#57273](https://github.com/ant-design/ant-design/pull/57273) [@mavericusdev](https://github.com/mavericusdev)
- 🐞 修复 Grid `xxxl` 断点在媒体尺寸映射中的错误。[#57246](https://github.com/ant-design/ant-design/pull/57246) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 修复 Tree 点击节点时页面回滚到顶部的问题。[#57242](https://github.com/ant-design/ant-design/pull/57242) [@aojunhao123](https://github.com/aojunhao123)

## 6.3.2

`2026-03-09`

- 🐞 修复 Form.Item 使用动态 `rules` 与 `dependencies` 配合使用时，时序问题导致的校验失败的问题。[#57147](https://github.com/ant-design/ant-design/pull/57147) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 InputNumber 在 `borderless` 形态下与 Input 或 Select 并排时高度异常的问题。[#57162](https://github.com/ant-design/ant-design/pull/57162) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Radio.Group 在选项文案长短不一或换行时，勾选框宽度不一致的问题。[#57171](https://github.com/ant-design/ant-design/pull/57171) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Skeleton.Avatar，Skeleton.Button，Skeleton.Input，Rate 及 Spin 无法响应全局 `componentSize` 设置的问题。[#57093](https://github.com/ant-design/ant-design/pull/57093) [#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Splitter 存在 `size` 受控面板时其他面板尺寸可能计算错误的问题。[#57142](https://github.com/ant-design/ant-design/pull/57142) [@js0753](https://github.com/js0753)
- 🐞 修复 Tree 及 TreeSelect 在自定义 `titleHeight` 时会连线错位的问题。[#56785](https://github.com/ant-design/ant-design/pull/56785) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 Checkbox.Group 在选项文案长短不一或换行时，勾选框宽度不一致的问题。[#57144](https://github.com/ant-design/ant-design/pull/57144) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 ConfigProvider 的 `csp` 配置没有对所有的动态 style 生效的问题。[#57159](https://github.com/ant-design/ant-design/pull/57159) [@zombieJ](https://github.com/zombieJ)
- Select
  - 💄 修复 Select 在 Firefox 浏览器下可能出现文字跳动的问题。[#57030](https://github.com/ant-design/ant-design/pull/57030) [@pierreeurope](https://github.com/pierreeurope)
  - 💄 修复 Select 无法通过 `style` 设置 `visibility: hidden` 的问题。[#56720](https://github.com/ant-design/ant-design/pull/56720) [@claytonlin1110](https://github.com/claytonlin1110)
- Upload
  - 💄 修复 Upload 在 `picture-card` 模式下无数据时仍然存在无效空白区域的问题。[#57157](https://github.com/ant-design/ant-design/pull/57157) [@QDyanbing](https://github.com/QDyanbing)
  - ⌨️ 优化 Upload 在不支持悬停或粗指针的设备上默认显示列表操作按钮。[#57156](https://github.com/ant-design/ant-design/pull/57156) [@Arktomson](https://github.com/Arktomson)
- 🌐 新增 `es_US` 国际化配置。[#57137](https://github.com/ant-design/ant-design/pull/57137) [@yuriidumych-max](https://github.com/yuriidumych-max)
- 🛠 统一 `size` 枚举值定义，针对 Badge、Card、Progress、Steps、Switch 及 Spin 使用 `medium` 替代 `default`，针对 Descriptions 使用 `medium` 和 `large` 替代 `middle` 和 `default`，针对 Table 和 Divider 使用 `medium` 替代 `middle`。[#57127](https://github.com/ant-design/ant-design/pull/57127) [#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- 🛠 统一 `size` className 在所有组件元素上的设置值。[#57106](https://github.com/ant-design/ant-design/pull/57106) [@QDyanbing](https://github.com/QDyanbing)
- TypeScript
  - 🤖 新增 Upload.Dragger 的泛型支持。[#57103](https://github.com/ant-design/ant-design/pull/57103) [@fnoopv](https://github.com/fnoopv)
  - 🤖 修复 Modal `onCancel` 入参不支持 `KeyboardEvent` 类型的问题。[#57048](https://github.com/ant-design/ant-design/pull/57048) [@eureka928](https://github.com/eureka928)

## 6.3.1

`2026-02-24`

- Select
  - 🐞 Select 修复 `value` 为空字符串时下拉框高度不正确的问题。[#56976](https://github.com/ant-design/ant-design/pull/56976) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Select 修复 `value` 为空字符串时值回显异常的问题。[#56966](https://github.com/ant-design/ant-design/pull/56966) [@luozz1994](https://github.com/luozz1994)
  - 🐞 Select & TreeSelect 修复搜索时已选中值文本仍然显示的问题。[#56946](https://github.com/ant-design/ant-design/pull/56946)
- 🐞 TreeSelect 修复多行文本时 Checkbox 被压缩变形的问题。[#56961](https://github.com/ant-design/ant-design/pull/56961) [@luozz1994](https://github.com/luozz1994)
- 🐞 Typography 修复同时开启 `copyable` 和 `ellipsis` 时，悬停复制按钮会触发省略号 tooltip 的问题；修复从复制按钮移回文字后省略号 tooltip 不再出现的问题。[#56855](https://github.com/ant-design/ant-design/pull/56855) [@claytonlin1110](https://github.com/claytonlin1110)
- 🐞 Progress 修复 `status="active"` 时动画溢出的问题。[#56972](https://github.com/ant-design/ant-design/pull/56972) [@aibayanyu20](https://github.com/aibayanyu20)
- 🐞 Upload 修复照片墙模式下文件数量超过一行时列表溢出重叠的问题。[#56945](https://github.com/ant-design/ant-design/pull/56945) [@xbsheng](https://github.com/xbsheng)
- 🐞 Image 修复打开预览时，部分浏览器会出现闪烁的问题。[#56937](https://github.com/ant-design/ant-design/pull/56937) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ 为 Button、Checkbox、Radio、Switch、Segmented 等组件添加 `prefers-reduced-motion` 媒体查询支持，禁用过渡动画以改善无障碍体验。[#56902](https://github.com/ant-design/ant-design/pull/56902) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 Input 修复 `variant="borderless"` 时高度与 Select 不一致的问题。[#57014](https://github.com/ant-design/ant-design/pull/57014) [@njlazzar-su](https://github.com/njlazzar-su)
- 🐞 Modal 修复 `confirm` 方法在 `icon` 为空时布局出现多余空白的问题。[#57024](https://github.com/ant-design/ant-design/pull/57024) [@Arktomson](https://github.com/Arktomson)
- 🐞 Select 组件中的禁用选项添加 `aria-disabled` 属性。[#57049](https://github.com/ant-design/ant-design/pull/57049) [@meet-student](https://github.com/meet-student)

## 6.3.0

`2026-02-10`

- ConfigProvider
  - 🆕 ConfigProvider 支持 Modal 和 Drawer 的 `maskClosable` 全局配置。[#56739](https://github.com/ant-design/ant-design/pull/56739) [@luozz1994](https://github.com/luozz1994)
  - 🆕 ConfigProvider 支持 DatePicker 和 TimePicker 的 `suffixIcon` 全局配置。[#56709](https://github.com/ant-design/ant-design/pull/56709) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider 支持 Cascader 的 `expandIcon` 和 `loadingIcon` 全局配置。[#56482](https://github.com/ant-design/ant-design/pull/56482) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider 支持 Table 的 `scroll` 全局配置。[#56628](https://github.com/ant-design/ant-design/pull/56628) [@Clayton](https://github.com/Clayton)
  - 🆕 ConfigProvider 支持配置 App 的 `className` 与 `style`，以及 ColorPicker 的 `arrow` 属性。[#56573](https://github.com/ant-design/ant-design/pull/56573) [@zombieJ](https://github.com/zombieJ)
  - 🆕 ConfigProvider 支持 Button 的 `loadingIcon` 全局配置。[#56439](https://github.com/ant-design/ant-design/pull/56439) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider 支持 `rangePicker.separator` 全局配置。[#56499](https://github.com/ant-design/ant-design/pull/56499) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider 支持 Form 的 `tooltipIcon` 和 `tooltipProps` 全局配置。[#56372](https://github.com/ant-design/ant-design/pull/56372) [@guoyunhe](https://github.com/guoyunhe)
- Upload
  - 🆕 Upload 新增 `classNames.trigger` 和 `styles.trigger` 属性。[#56578](https://github.com/ant-design/ant-design/pull/56578) [@QdabuliuQ](https://github.com/QdabuliuQ)
  - 🆕 Upload.Dragger 支持 `onDoubleClick` 事件。[#56579](https://github.com/ant-design/ant-design/pull/56579) [@ug-hero](https://github.com/ug-hero)
  - 🐞 Upload 修复 `picture-card` / `picture-circle` 父节点缺少默认高度的问题。[#56864](https://github.com/ant-design/ant-design/pull/56864) [@wanpan11](https://github.com/wanpan11)
- 🆕 Grid 新增 `xxxl`（1920px）断点以适应 FHD 屏幕。[#56825](https://github.com/ant-design/ant-design/pull/56825) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Switch 语义化结构支持 `indicator` 定制。[#56710](https://github.com/ant-design/ant-design/pull/56710) [@zombieJ](https://github.com/zombieJ)
- Button
  - 🐞 Button 修复暗色主题下 `color` 的 `hover` 与 `active` 状态颜色相反的问题。[#56872](https://github.com/ant-design/ant-design/pull/56872) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Button 修复边框尺寸未跟随 Design Token `lineWidth` 的问题。[#56683](https://github.com/ant-design/ant-design/pull/56683) [@zombieJ](https://github.com/zombieJ)
- Select
  - 💄 Select 移除单选模式下额外的 `-content-value` div DOM，优化语义化结构并支持通过 `classNames` 与 `styles` 覆盖。[#56811](https://github.com/ant-design/ant-design/pull/56811) [@zombieJ](https://github.com/zombieJ)
  - 🐞 Select 修复 `notFoundContent` 不生效的问题。[#56756](https://github.com/ant-design/ant-design/pull/56756) [@QdabuliuQ](https://github.com/QdabuliuQ)
- Radio
  - 🐞 Radio.Group 修复垂直排列时单选项出现多余右边距的问题。[#56909](https://github.com/ant-design/ant-design/pull/56909) [@jany55555](https://github.com/jany55555)
  - 💄 Radio 移除 `icon` 子元素 `-inner` DOM 节点以更好适配语义化结构。[#56783](https://github.com/ant-design/ant-design/pull/56783) [@zombieJ](https://github.com/zombieJ)
- 💄 Modal & Drawer 默认关闭蒙层 blur 效果。[#56781](https://github.com/ant-design/ant-design/pull/56781) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 Tooltip & Popover 修复弹出层动画起始位置偏左的问题。[#56887](https://github.com/ant-design/ant-design/pull/56887) [@zombieJ](https://github.com/zombieJ)
- 🐞 List 修复废弃组件配置的颜色相关 token 不生效的问题。[#56913](https://github.com/ant-design/ant-design/pull/56913) [@zombieJ](https://github.com/zombieJ)
- 🛠 Spin 重构 DOM 结构以对齐不同场景，并支持全量语义化结构（Semantic Structure）。[#56852](https://github.com/ant-design/ant-design/pull/56852) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ Icon 为搜索图标 SVG 添加无障碍名称，改善屏幕阅读器支持。[#56521](https://github.com/ant-design/ant-design/pull/56521) [@huangkevin-apr](https://github.com/huangkevin-apr)
- 🐞 Cascader 修复搜索模式下选择选项并关闭时，过滤列表立即还原影响体验的问题。[#56764](https://github.com/ant-design/ant-design/pull/56764) [@zombieJ](https://github.com/zombieJ)
- ⌨️ ♿ Tree 优化无障碍支持。[#56716](https://github.com/ant-design/ant-design/pull/56716) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 ColorPicker 选择块支持语义化结构，并修复 `root` 语义化错误应用到弹出元素的问题。[#56607](https://github.com/ant-design/ant-design/pull/56607) [@zombieJ](https://github.com/zombieJ)
- 💄 Avatar 将 `size` 默认值从 `default` 改为 `medium` 以保持一致性。[#56440](https://github.com/ant-design/ant-design/pull/56440) [@guoyunhe](https://github.com/guoyunhe)
- 💄 Checkbox 移除 `icon` 子元素 `-inner` DOM 节点以更好适配语义化结构。[#56783](https://github.com/ant-design/ant-design/pull/56783) [@zombieJ](https://github.com/zombieJ)
- MISC
  - 🐞 MISC: 修复 UMD 版本中 React Compiler 兼容性问题，现已默认关闭。[#56830](https://github.com/ant-design/ant-design/pull/56830) [@zombieJ](https://github.com/zombieJ)
  - 🛠 精简 `styles` 和 `classNames` 类型定义，使其更规范。[#56758](https://github.com/ant-design/ant-design/pull/56758) [@crazyair](https://github.com/crazyair)

## 6.2.3

`2026-02-02`

- Button
  - 🐞 修复 Button `defaultBg`、`defaultColor`、`defaultHoverColor` 和 `defaultActiveColor` token 不生效的问题。[#56238](https://github.com/ant-design/ant-design/pull/56238) [@ug-hero](https://github.com/ug-hero)
  - 🐞 修复 Button 默认 token 不生效的问题。[#56719](https://github.com/ant-design/ant-design/pull/56719) [@unknowntocka](https://github.com/unknowntocka)
  - 🐞 修复 Button `variant="solid"` 在 Space.Compact 中边框显示异常的问题。[#56486](https://github.com/ant-design/ant-design/pull/56486) [@Pareder](https://github.com/Pareder)
- 🐞 修复 Input.TextArea ref 缺少 `nativeElement` 属性的问题。[#56803](https://github.com/ant-design/ant-design/pull/56803) [@smith3816](https://github.com/smith3816)
- 🐞 修复 Flex 使用 `orientation` 时默认 `align` 不生效的问题。[#55950](https://github.com/ant-design/ant-design/pull/55950) [@YingtaoMo](https://github.com/YingtaoMo)
- 🐞 修复 Typography 链接选择器特异性过低导致样式被覆盖的问题。[#56759](https://github.com/ant-design/ant-design/pull/56759) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 ColorPicker HEX 输入框可以输入无效字符的问题。[#56752](https://github.com/ant-design/ant-design/pull/56752) [@treephesians](https://github.com/treephesians)

## 6.2.2

`2026-01-26`

- 🐞 修复被 Typography 包裹的带 href 的 Button 显示错误颜色和 hover 时 outline 闪烁的问题。[#56619](https://github.com/ant-design/ant-design/pull/56619) [@QdabuliuQ](https://github.com/QdabuliuQ)
- 🐞 修复 Button `type="text"` 时组件 Token 不生效的问题。[#56291](https://github.com/ant-design/ant-design/pull/56291) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Popover 内组件被 Form.Item 状态关联影响的问题。[#56728](https://github.com/ant-design/ant-design/pull/56728)
- 🐞 修复 Select 多选时占位符显示异常的问题。[#56675](https://github.com/ant-design/ant-design/pull/56675)
- 💄 修复 Pagination 全局 `fontSize` 变大时各元素上下错位的问题。[#56715](https://github.com/ant-design/ant-design/pull/56715) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 Drawer 在 rtl 模式下 dragger 位置错误的样式问题。[#56693](https://github.com/ant-design/ant-design/pull/56693) [@QdabuliuQ](https://github.com/QdabuliuQ)

## 6.2.1

`2026-01-20`

- 🐞 修复 Button 子元素为包含两个中文字符的标签时，原有 `className` 被清空的问题。[#56593](https://github.com/ant-design/ant-design/pull/56593) [@QdabuliuQ](https://github.com/QdabuliuQ)
- 🐞 修复 DatePicker 在设置 `suffixIcon` 为 `null` 后不会更新 DOM 的问题。[#56637](https://github.com/ant-design/ant-design/pull/56637) [@AlanQtten](https://github.com/AlanQtten)
- 🐞 修复 Table 容器设置圆角时，内部内容区域圆角不一致的问题。[#56478](https://github.com/ant-design/ant-design/pull/56478) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 Card Body 区域有非预期圆角值的问题。[#56653](https://github.com/ant-design/ant-design/pull/56653) [@ug-hero](https://github.com/ug-hero)
- 💄 杂项：修复 `undefined` 和 `null` 值被注入到 CSS 的问题。[#56636](https://github.com/ant-design/ant-design/pull/56636) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 杂项：优化所有组件中的 `background` 过渡为 `background-color`。[#56598](https://github.com/ant-design/ant-design/pull/56598) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 优化 Grid 使用 `genCssVar` 方法以生成更加稳定的 CSS 变量名。[#56635](https://github.com/ant-design/ant-design/pull/56635) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 优化 @ant-design/icons 引入方式为独立图标引入，避免被 externals 增加前置依赖。[#56639](https://github.com/ant-design/ant-design/pull/56639) [@ShenHongFei](https://github.com/ShenHongFei)

## 6.2.0

`2026-01-13`

- 🛠 Button、Masonry、Mentions、Select、Space、Splitter、Steps 等组件批量使用 `genCssVar` 方法以生成更加稳定的 css 变量名。[#56562](https://github.com/ant-design/ant-design/pull/56562) [#56559](https://github.com/ant-design/ant-design/pull/56559) [#56557](https://github.com/ant-design/ant-design/pull/56557) [#56555](https://github.com/ant-design/ant-design/pull/56555) [#56550](https://github.com/ant-design/ant-design/pull/56550) [#56547](https://github.com/ant-design/ant-design/pull/56547) [#56546](https://github.com/ant-design/ant-design/pull/56546) [#56529](https://github.com/ant-design/ant-design/pull/56529) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 QRCode 新增 `marginSize` 属性用于展示二维码留白区。[#56569](https://github.com/ant-design/ant-design/pull/56569) [@afc163](https://github.com/afc163)
- 🆕 Tour 新增 `keyboard` 属性以配置键盘操作。[#56581](https://github.com/ant-design/ant-design/pull/56581) [@cactuser-Lu](https://github.com/cactuser-Lu)
- Tooltip
  - 🆕 Tooltip 增加 `maxWidth` design token。[#56540](https://github.com/ant-design/ant-design/pull/56540) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tooltip/Popover/Popconfirm 默认情况下可以通过 ESC 关闭。[#56492](https://github.com/ant-design/ant-design/pull/56492) [@aojunhao123](https://github.com/aojunhao123)
- 🛠 Steps 移除无用的样式。[#56565](https://github.com/ant-design/ant-design/pull/56565) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Form 支持 `tel` 类型校验。[#56533](https://github.com/ant-design/ant-design/pull/56533) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 修复 Badge 在使用 `text` 属性时，`ref` 无效的问题。[#56532](https://github.com/ant-design/ant-design/pull/56532) [@zombieJ](https://github.com/zombieJ)
- 🆕 Calendar 和 DatePicker 的 `locale` 配置现在支持只填充部分内容。[#56376](https://github.com/ant-design/ant-design/pull/56376) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 ConfigProvider 配置 `theme.cssVar` 对图标无效的问题。[#56504](https://github.com/ant-design/ant-design/pull/56504) [@seanparmelee](https://github.com/seanparmelee)
- 🐞 修复 Collapse `items` 语义化属性无效的问题。[#56517](https://github.com/ant-design/ant-design/pull/56517) [@zombieJ](https://github.com/zombieJ)
- Modal
  - 🆕 Modal 支持 `focusable.trap` 以配置是否将焦点锁定在 Modal 内部。[#56500](https://github.com/ant-design/ant-design/pull/56500) [@zombieJ](https://github.com/zombieJ)
  - 🛠 移除 Modal 无用的 DOM 结构并且优化焦点捕获以防止意外的焦点逃逸到 Modal 外的情况。[#56142](https://github.com/ant-design/ant-design/pull/56142) [@zombieJ](https://github.com/zombieJ)
- ConfigProvider
  - 🆕 ConfigProvider 支持 `pagination` 配置 `totalBoundary` 与 `showSizeChanger` 属性。[#56475](https://github.com/ant-design/ant-design/pull/56475) [@chiaweilee](https://github.com/chiaweilee)
  - 🆕 ConfigProvider 支持配置 Alert 全局图标。[#56241](https://github.com/ant-design/ant-design/pull/56241) [@guoyunhe](https://github.com/guoyunhe)
- Drawer
  - 🆕 Drawer 新增 `focusable` 以配置展开后的焦点行为，支持配置锁定焦点在框内、关闭后是否返回焦点。[#56463](https://github.com/ant-design/ant-design/pull/56463) [@zombieJ](https://github.com/zombieJ)
  - 🐞 修复 Drawer `size` 定义不支持 string 的问题。[#56358](https://github.com/ant-design/ant-design/pull/56358) [@ug-hero](https://github.com/ug-hero)
- 🐞 修复 Image 嵌套在 Modal 内时，Esc无法顺序关闭。[#56386](https://github.com/ant-design/ant-design/pull/56386) [@aojunhao123](https://github.com/aojunhao123)
- 🆕 Pagination 支持 `size` 属性。[#56009](https://github.com/ant-design/ant-design/pull/56009) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Breadcrumb 支持 `dropdownIcon` 自定义。[#56250](https://github.com/ant-design/ant-design/pull/56250) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Checkbox.Group 支持 `role` 配置。[#56126](https://github.com/ant-design/ant-design/pull/56126) [@Pareder](https://github.com/Pareder)
- 💄 Mentions 修复不同尺寸下 `padding: undefined` 的无效样式。[#56564](https://github.com/ant-design/ant-design/pull/56564) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Select 在 `size="small"` 时，清除按钮位置对齐问题。[#56525](https://github.com/ant-design/ant-design/pull/56525) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.4

`2026-01-05`

- 🐞 修复 Select 配置 `aria-` 属性时，会同时给多个 DOM 添加的问题。[#56451](https://github.com/ant-design/ant-design/pull/56451) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 Table 配置 `scroll.y` 属性时，隐藏的测量表头挂载筛选下拉组件并参与事件判断，导致筛选下拉意外关闭的问题。 [#56425](https://github.com/ant-design/ant-design/pull/56425) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.3

`2025-12-29`

- 🐞 修复 Drawer.PurePanel 无法响应鼠标交互的问题。[#56387](https://github.com/ant-design/ant-design/pull/56387) [@wanpan11](https://github.com/wanpan11)
- 🐞 修复 Select options 属性透传至原生 DOM 导致 React 未知属性警告的问题。[#56341](https://github.com/ant-design/ant-design/pull/56341) [@afc163](https://github.com/afc163)

## 6.1.2

`2025-12-24`

- 🐞 修复 Wave 组件水波纹消失的问题，以及 Button 组件在配置 Dropdown 后，点击触发再次 `hover` 时无法立刻显示 Dropdown 的问题。[#56273](https://github.com/ant-design/ant-design/pull/56273) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 Form.List 使用 `useWatch` 时，删除项会触发两次渲染，第一次为不正确的中间状态的问题。[#56319](https://github.com/ant-design/ant-design/pull/56319) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 Breadcrumb 组件自定义 `itemRender` 时的链接颜色异常的问题。[#56253](https://github.com/ant-design/ant-design/pull/56253) [@guoyunhe](https://github.com/guoyunhe)
- Transfer
  - 💄 修复 Transfer 组件在禁用时不存在选择状态样式类的问题。[#56316](https://github.com/ant-design/ant-design/pull/56316) [@zenggpzqbx](https://github.com/zenggpzqbx)
  - 🐞 优化 Transfer 组件逻辑，确保优先使用 `disabled` 属性。[#56280](https://github.com/ant-design/ant-design/pull/56280) [#56093](https://github.com/ant-design/ant-design/pull/56093) [@zenggpzqbx](https://github.com/zenggpzqbx)
- Select
  - 🐞 修复 Select 组件缺少语义化 DOM 名称的问题。[#56322](https://github.com/ant-design/ant-design/pull/56322) [@seanparmelee](https://github.com/seanparmelee)
  - 🐞 修复 Select 组件在搜索状态下鼠标手型样式不对的问题。[#56130](https://github.com/ant-design/ant-design/pull/56130) [@fpsqdb](https://github.com/fpsqdb)
  - 🐞 修复 Select 在同时设置 `showSearch` 和 `disabled` 时鼠标样式不为禁用的问题。[#56340](https://github.com/ant-design/ant-design/pull/56340) [@QDyanbing](https://github.com/QDyanbing)
- 💄 修复 Card 组件在使用 Card.Grid 且未设置头部内容时，边框圆角显示异常的问题。[#56214](https://github.com/ant-design/ant-design/pull/56214) [@DDDDD12138](https://github.com/DDDDD12138)
- 💄 Tag 加深默认背景，提升无边框状态的对比度。[#56326](https://github.com/ant-design/ant-design/pull/56326) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Segmented 组件中多余的 `role` 属性和 `aria` 属性。[#56278](https://github.com/ant-design/ant-design/pull/56278) [@aojunhao123](https://github.com/aojunhao123)

## 6.1.1

`2025-12-15`

- 🐞 修复 DatePicker 不兼容 webpack 4 的问题：Can't resolve '@rc-component/picker/locale/en_US'。[#56219](https://github.com/ant-design/ant-design/pull/56219) [@afc163](https://github.com/afc163)
- 🐞 修复 ColorPicker 弹层内输入框高度不一致问题。[#56220](https://github.com/ant-design/ant-design/pull/56220) [@ug-hero](https://github.com/ug-hero)
- 🐞 修复 notification 在 cssVar 未启用时默认背景色不为白色的问题。[#56169](https://github.com/ant-design/ant-design/pull/56169) [@wanpan11](https://github.com/wanpan11)
- 🐞 修复 Input 在 Space.Compact 下配置 `allowClear` 时聚焦边框丢失的问题。[#56105](https://github.com/ant-design/ant-design/pull/56105) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 修复 Splitter 在 RTL + 垂直模式下折叠方向错误的问题，RTL 逻辑现在仅在横向布局下生效。[#56179](https://github.com/ant-design/ant-design/pull/56179) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 修复 Result 未向根节点透传 `data-*` 与 `aria-*` 属性的问题。[#56165](https://github.com/ant-design/ant-design/pull/56165) [@QDyanbing](https://github.com/QDyanbing)
- 🐞 MISC: 修复：`theme.cssVar.prefix` 与 `theme.cssVar.key` 不支持传入空字符串的问题。[#56146](https://github.com/ant-design/ant-design/pull/56146) [@QDyanbing](https://github.com/QDyanbing)
- 💄 提升 Breadcrumb 链接样式优先级以避免被全局样式覆盖。[#56137](https://github.com/ant-design/ant-design/pull/56137) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 修复 ConfigProvider `closable.placement` 配置失效的问题。[#55985](https://github.com/ant-design/ant-design/pull/55985) [@meet-student](https://github.com/meet-student)
- 🐞 修复 Form `onValuesChange` 对存在嵌套数据的 Form.List 缺失内容的问题。[#56129](https://github.com/ant-design/ant-design/pull/56129) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 Select `selectorBg` token 不生效的问题。[#56052](https://github.com/ant-design/ant-design/pull/56052) [@ug-hero](https://github.com/ug-hero)
- 🐞 修复 Upload 进度条位置样式错误的问题。[#56194](https://github.com/ant-design/ant-design/pull/56194) [@QDyanbing](https://github.com/QDyanbing)

## 6.1.0

`2025-12-08`

- 🆕 ConfigProvider 新增支持配置 Tooltip、Popover 和 Popconfirm 的 `trigger` 属性。[#55932](https://github.com/ant-design/ant-design/pull/55932) [@aojunhao123](https://github.com/aojunhao123)
- 🆕 Alert 新增语义化关闭按钮元素。[#55815](https://github.com/ant-design/ant-design/pull/55815) [@coding-ice](https://github.com/coding-ice)
- Drawer
  - 🆕 Drawer 新增语义化关闭按钮元素。[#55816](https://github.com/ant-design/ant-design/pull/55816) [@coding-ice](https://github.com/coding-ice)
  - 🆕 Drawer 新增 `resizable`的布尔类型设置。[#55861](https://github.com/ant-design/ant-design/pull/55861) [@cactuser-Lu](https://github.com/cactuser-Lu)
- Select
  - 🆕 Select 新增 `optionFilterProp` 多字段搜索。[#56057](https://github.com/ant-design/ant-design/pull/56057) [@ug-hero](https://github.com/ug-hero)
  - 🐞 修复 Select 非搜索状态下显示输入光标的问题。[#56067](https://github.com/ant-design/ant-design/pull/56067) [@afc163](https://github.com/afc163)
  - 🐞 修复 Select 包含交互内容时「选择」选项未打开的问题。[#56054](https://github.com/ant-design/ant-design/pull/56054) [@yoyo837](https://github.com/yoyo837)
- 🐞 修复 Table `cellFontSizeSM` 和 `cellFontSizeLG` token 不生效的问题。[#55770](https://github.com/ant-design/ant-design/pull/55770) [@guoyunhe](https://github.com/guoyunhe)
- 🐞 修复 Button 部分 Token（primaryColor, dangerColor, defaultHoverBg, defaultActiveBg）在特定变体（solid, outlined, dashed）下不生效的问题。[#55934](https://github.com/ant-design/ant-design/pull/55934) [@tuzixiangs](https://github.com/tuzixiangs)
- 💄 修复 Menu  组件 item 中定义的 style 不生效错误。[#56041](https://github.com/ant-design/ant-design/pull/56041) [@Wxh16144](https://github.com/Wxh16144)
- 🛠 杂项：更新 `@ant-design/react-slick` 版本以删除 `classnames`。[#56080](https://github.com/ant-design/ant-design/pull/56080) [@yoyo837](https://github.com/yoyo837)
- 🛠 杂项：迁移 `rc-overflow` 到  `@rc-component/overflow`、`rc-virtual-list` 到  `@rc-component/virtual-list` 以删除 `rc-util`。[#56074](https://github.com/ant-design/ant-design/pull/56074) [@yoyo837](https://github.com/yoyo837)
- TypeScript
  - 🤖 Alert 新增导出 ErrorBoundaryProps 类型。[#55974](https://github.com/ant-design/ant-design/pull/55974) [@guoyunhe](https://github.com/guoyunhe)
  - 🤖 ConfigProvider 支持 Table `rowKey` 传入函数。[#56095](https://github.com/ant-design/ant-design/pull/56095) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 Notification `title` 属性修改为可选。[#56027](https://github.com/ant-design/ant-design/pull/56027) [@afc163](https://github.com/afc163)

## 6.0.1

`2025-12-02`

- Flex
  - 🐞 修复 Flex 的 `flex` 属性不能设置为 `0` 的问题。[#55829](https://github.com/ant-design/ant-design/pull/55829) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🐞 修复 Flex 的 `gap` 属性不能设置为 `0` 的问题。[#55803](https://github.com/ant-design/ant-design/pull/55803) [@li-jia-nan](https://github.com/li-jia-nan)
- Input
  - 🐞 修复 Input `colorText` token 在无前后缀的 `filled` 变体下不工作的问题。[#56019](https://github.com/ant-design/ant-design/pull/56019) [@ug-hero](https://github.com/ug-hero)
  - 🐞 修复 Input.OTP 在输入时可跳过空位的问题。[#56001](https://github.com/ant-design/ant-design/pull/56001) [@aojunhao123](https://github.com/aojunhao123)
- 🐞 修复 Anchor 快速点击同一链接时的滚动问题。[#55814](https://github.com/ant-design/ant-design/pull/55814) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 修复 Button 在 `solid` 变体下悬浮态的文字颜色。[#55825](https://github.com/ant-design/ant-design/pull/55825) [@andriib-ship-it](https://github.com/andriib-ship-it)
- 🐞 修复 Cascader 使用 defaultValue 时首次打开会滚动到页面顶部的问题。[#55890](https://github.com/ant-design/ant-design/pull/55890) [@tuzixiangs](https://github.com/tuzixiangs)
- 🐞 修复 DatePicker `borderRadiusSM` 和 `borderRadiusLG` token 未生效问题。[#56018](https://github.com/ant-design/ant-design/pull/56018) [@ug-hero](https://github.com/ug-hero)
- 🐞 修复 InputNumber 在 ColorPicker 中使用时文字被裁切的问题。[#55966](https://github.com/ant-design/ant-design/pull/55966) [@DDDDD12138](https://github.com/DDDDD12138)
- 🐞 修复 Select 在深色模式下的搜索框文本颜色。[#55914](https://github.com/ant-design/ant-design/pull/55914) [@divyeshagrawal](https://github.com/divyeshagrawal)
- 🐞 修复 Splitter 在 Panel 总占比不为 1 时出现占不满的情况。 [#56025](https://github.com/ant-design/ant-design/pull/56025) [@zombieJ](https://github.com/zombieJ)
- 🐞 修复 Wave 可能由于 RAF 未清理引发内存泄露的风险。[#55962](https://github.com/ant-design/ant-design/pull/55962) [@Copilot](https://github.com/Copilot)
- 🐞 修复 Modal/Image/Drawer 组件 `colorBgMask` token 不生效的问题。[#56031](https://github.com/ant-design/ant-design/pull/56031) [@ug-hero](https://github.com/ug-hero)
- 💄 修复 ConfigProvider 默认没有配置 `theme.hashed` 为 `true`，从而会导致多版本混用样式冲突的问题。[#55880](https://github.com/ant-design/ant-design/pull/55880) [@zombieJ](https://github.com/zombieJ)
- 💄 修复 Layout.Sider 在 zeroRuntime 开启时样式缺失的问题。[#55864](https://github.com/ant-design/ant-design/pull/55864) [@wanpan11](https://github.com/wanpan11)
- 🛠 杂项：修复版本无法在 pnpm `hoist: false` 下通过 vite 编译。[#55938](https://github.com/ant-design/ant-design/pull/55938) [@afc163](https://github.com/afc163)
- TypeScript
  - 🤖 修复 ConfigProvider 的 Table `classNames` 及 `styles` 配置类型缺失的问题。[#55984](https://github.com/ant-design/ant-design/pull/55984) [@meet-student](https://github.com/meet-student)
  - 🤖 修复 DatePicker 多个属性的类型定义。[#55826](https://github.com/ant-design/ant-design/pull/55826) [@divyeshagrawal](https://github.com/divyeshagrawal)

## 6.0.0

`2025-11-22`

🏆 Ant Design 6.0.0 已发布！

#### 升级必读

🌟 如果你想升级到 Ant Design 6.0，请仔细查阅我们的[迁移文档](/docs/react/migration-v6-cn)。

#### 主要变化

- 🔥 组件语义化结构，阅读[《语义化发现组件精致的美》](/docs/blog/semantic-beauty-cn)了解更多。
  <details>
    <summary>🔥 antd 组件支持语义化结构以及 ConfigProvider 配置，由 <a href="https://github.com/thinkasany" target="_blank">@thinkasany</a> 主导。</summary>

    - feat(Result): support `classNames` and `styles` for component and ConfigProvider [#52171](https://github.com/ant-design/ant-design/pull/52171)
    - feat(Statistic): support `classNames` and `styles` for component and ConfigProvider [#52141](https://github.com/ant-design/ant-design/pull/52141)
    - feat(Collapse): support `classNames` and `styles` for component and ConfigProvider [#52258](https://github.com/ant-design/ant-design/pull/52258)
    - feat(Badge.Ribbon): support ConfigProvider [#52303](https://github.com/ant-design/ant-design/pull/52303)
    - feat(Segmented): support `classNames` and `styles` for component and ConfigProvider [#52376](https://github.com/ant-design/ant-design/pull/52376)
    - feat(Modal): support `classNames` and `styles` for component and ConfigProvider [#52340](https://github.com/ant-design/ant-design/pull/52340)
    - feat(Alert): support `classNames` and `styles` for component and ConfigProvider [#52669](https://github.com/ant-design/ant-design/pull/52669)
    - feat(Skeleton): support `classNames` and `styles` [#52470](https://github.com/ant-design/ant-design/pull/52470) [@coding-ice](https://github.com/coding-ice)
    - feat(Notification): support `classNames` and `styles` for component and ConfigProvider [#52759](https://github.com/ant-design/ant-design/pull/52759)
    - feat(Tag): support `classNames` and `styles` for component and ConfigProvider [#52764](https://github.com/ant-design/ant-design/pull/52764)
    - feat(Affix): support `classNames` and `styles` for component and ConfigProvider [#52745](https://github.com/ant-design/ant-design/pull/52745)
    - feat(Checkbox): support `classNames` and `styles` for component and ConfigProvider [#52781](https://github.com/ant-design/ant-design/pull/52781)
    - feat(Radio): support `classNames` and `styles` for component and ConfigProvider [#52780](https://github.com/ant-design/ant-design/pull/52780)
    - feat(Message): support `classNames` and `styles` for component and ConfigProvider [#52793](https://github.com/ant-design/ant-design/pull/52793)
    - feat(Watermark): support `classNames` and `styles` for component and ConfigProvider [#52811](https://github.com/ant-design/ant-design/pull/52811)
    - feat(Spin): support `classNames` and `styles` for component and ConfigProvider [#52823](https://github.com/ant-design/ant-design/pull/52823)
    - feat(Switch): support `classNames` and `styles` for component and ConfigProvider [#52849](https://github.com/ant-design/ant-design/pull/52849)
    - feat(Breadcrumb): support `classNames` and `styles` for component and ConfigProvider [#52859](https://github.com/ant-design/ant-design/pull/52859)
    - feat(Anchor): support `classNames` and `styles` for component and ConfigProvider [#52866](https://github.com/ant-design/ant-design/pull/52866)
    - feat(Pagination): support `classNames` and `styles` for component and ConfigProvider [#52893](https://github.com/ant-design/ant-design/pull/52893)
    - feat(Tabs): support `classNames` and `styles` for component and ConfigProvider [#52895](https://github.com/ant-design/ant-design/pull/52895)
    - feat(Timeline): support `classNames` and `styles` for component and ConfigProvider [#52976](https://github.com/ant-design/ant-design/pull/52976)
    - feat(Mentions): support `classNames` and `styles` for component and ConfigProvider [#52961](https://github.com/ant-design/ant-design/pull/52961)
    - feat(Upload): support `classNames` and `styles` for component and ConfigProvider [#52972](https://github.com/ant-design/ant-design/pull/52972)
    - feat(Tour): support ConfigProvider [#52250](https://github.com/ant-design/ant-design/pull/52250)
    - feat(Button): support `classNames` and `styles` for component and ConfigProvider [#53055](https://github.com/ant-design/ant-design/pull/53055)
    - feat(Select): support `classNames` and `styles` for component and ConfigProvider [#52948](https://github.com/ant-design/ant-design/pull/52948)
    - feat(Image): support `classNames` and `styles` for component and ConfigProvider [#53028](https://github.com/ant-design/ant-design/pull/53028)
    - feat(Tree): support `classNames` and `styles` for component and ConfigProvider [#53174](https://github.com/ant-design/ant-design/pull/53174)
    - feat(AutoComplete): support `classNames` and `styles` for component and ConfigProvider [#53150](https://github.com/ant-design/ant-design/pull/53150)
    - feat(Splitter): support `classNames` and `styles` [#53225](https://github.com/ant-design/ant-design/pull/53225) [@wanpan11](https://github.com/wanpan11)
    - feat(Form): support `classNames` and `styles` for component and ConfigProvider [#53226](https://github.com/ant-design/ant-design/pull/53226)
    - feat(Calendar): support `classNames` and `styles` for component and ConfigProvider [#53159](https://github.com/ant-design/ant-design/pull/53159)
    - feat(TreeSelect): support `classNames` and `styles` for component and ConfigProvider [#53229](https://github.com/ant-design/ant-design/pull/53229)
    - feat(ColorPicker): support `classNames` and `styles` for component and ConfigProvider [#53303](https://github.com/ant-design/ant-design/pull/53303)
    - feat(Transfer): support `classNames` and `styles` for component and ConfigProvider [#53429](https://github.com/ant-design/ant-design/pull/53429) [@zombieJ](https://github.com/zombieJ)
    - feat(QRCode): support ConfigProvider [#52172](https://github.com/ant-design/ant-design/pull/52172)
    - feat(Progress): support `classNames` and `styles` for component and ConfigProvider [#53535](https://github.com/ant-design/ant-design/pull/53535) [@zombieJ](https://github.com/zombieJ)
    - feat(TimePicker, DatePicker): support `classNames` and `styles` for components and ConfigProvider [#53489](https://github.com/ant-design/ant-design/pull/53489)
    - feat(Menu): support `classNames` and `styles` for component and ConfigProvider [#53324](https://github.com/ant-design/ant-design/pull/53324)
    - feat(Dropdown): support `classNames` and `styles` for component and ConfigProvider [#53272](https://github.com/ant-design/ant-design/pull/53272)
    - feat(Cascader): support `classNames` and `styles` for component and ConfigProvider [#53694](https://github.com/ant-design/ant-design/pull/53694)
    - feat(InputNumber): support `classNames` and `styles` for component and ConfigProvider [#53698](https://github.com/ant-design/ant-design/pull/53698)
    - feat(Steps): support `classNames` and `styles` for component and ConfigProvider [#53789](https://github.com/ant-design/ant-design/pull/53789) [@zombieJ](https://github.com/zombieJ)
    - feat(Table): support `classNames` and `styles` for component and ConfigProvider [#53659](https://github.com/ant-design/ant-design/pull/53659)
    - feat(Divider): support `classNames` and `styles` for component and ConfigProvider [#53890](https://github.com/ant-design/ant-design/pull/53890)
    - feat(Input): support semantic DOM [#53958](https://github.com/ant-design/ant-design/pull/53958) [@aojunhao123](https://github.com/aojunhao123)
    - feat(FloatButton): support semantic structure and support ConfigProvider to pass related props [#54145](https://github.com/ant-design/ant-design/pull/54145) [@zombieJ](https://github.com/zombieJ)
    - refactor(Select): support semantic structure [#55430](https://github.com/ant-design/ant-design/pull/55430) [@zombieJ](https://github.com/zombieJ)

  </details>

  <details>
    <summary>🔥 antd 组件支持通过函数动态生成语义化结构，由 <a href="https://github.com/meet-student" target="_blank">@meet-student</a> 主导。</summary>

    - feat(button): Support better customization with semantic classNames/styles as  function [#54813](https://github.com/ant-design/ant-design/pull/54813)
    - feat(input): Support better customization with semantic classNames/styles as function [#54919](https://github.com/ant-design/ant-design/pull/54919)
    - feat(float-button): Support better customization with semantic classNames/styles as  function [#54917](https://github.com/ant-design/ant-design/pull/54917)
    - feat(divider): Support better customization with semantic classNames/styles as function [#54949](https://github.com/ant-design/ant-design/pull/54949)
    - feat(breadcrumb): Support better customization with semantic classNames/styles as function [#54950](https://github.com/ant-design/ant-design/pull/54950)
    - feat(anchor): Support better customization with semantic classNames/styles as function [#54948](https://github.com/ant-design/ant-design/pull/54948)
    - feat(masonry): Support better customization with semantic classNames/styles as function [#55032](https://github.com/ant-design/ant-design/pull/55032)
    - feat(Progress): Support better customization with semantic classNames & styles [#55058](https://github.com/ant-design/ant-design/pull/55058) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(menu): Support better customization with semantic classNames/styles as function [#54955](https://github.com/ant-design/ant-design/pull/54955)
    - feat(space): Support better customization with semantic classNames/styles as function [#55031](https://github.com/ant-design/ant-design/pull/55031) [@hcjlxl](https://github.com/hcjlxl)
    - feat(tabs): Support better customization with semantic classNames/styles as function [#54958](https://github.com/ant-design/ant-design/pull/54958)
    - feat(splitter): Support better customization with semantic classNames/styles as function [#55013](https://github.com/ant-design/ant-design/pull/55013) [@hcjlxl](https://github.com/hcjlxl)
    - feat(pagination): Support better customization with semantic classNames/styles as function [#54957](https://github.com/ant-design/ant-design/pull/54957)
    - feat(steps): Support better customization with semantic classNames/styles as function [#54956](https://github.com/ant-design/ant-design/pull/54956)
    - feat(dropdown): Support better customization with semantic classNames/styles as function [#55114](https://github.com/ant-design/ant-design/pull/55114) [@Arktomson](https://github.com/Arktomson)
    - feat(checkbox_radio): Support better customization with semantic classNames/styles as function [#55056](https://github.com/ant-design/ant-design/pull/55056)
    - feat(auto-complete): Support better customization with semantic classNames/styles as function [#54959](https://github.com/ant-design/ant-design/pull/54959)
    - feat(form): Support better customization with semantic classNames/styles as function [#55126](https://github.com/ant-design/ant-design/pull/55126)
    - feat(date-picker_time-picker): Support better customization with semantic classNames/styles as function [#54969](https://github.com/ant-design/ant-design/pull/54969)
    - feat(InputNumber): Support better customization with semantic classNames/styles as function [#54996](https://github.com/ant-design/ant-design/pull/54996) [@zjr222](https://github.com/zjr222)
    - feat(input-otp_textarea_search): Support better customization with semantic classNames/styles as function [#55109](https://github.com/ant-design/ant-design/pull/55109) [@Arktomson](https://github.com/Arktomson)
    - feat(mentions): Support better customization with semantic classNames/styles as function [#54963](https://github.com/ant-design/ant-design/pull/54963)
    - feat(select): Support better customization with semantic classNames/styles as function [#55101](https://github.com/ant-design/ant-design/pull/55101) [@Linkodt](https://github.com/Linkodt)
    - feat(slider): Support better customization with semantic classNames/styles as function [#54965](https://github.com/ant-design/ant-design/pull/54965)
    - feat(switch): Support better customization with semantic classNames/styles as function [#54994](https://github.com/ant-design/ant-design/pull/54994) [@xkhanhan](https://github.com/xkhanhan)
    - feat(transfer): Support better customization with semantic classNames/styles as function [#54966](https://github.com/ant-design/ant-design/pull/54966)
    - feat(upload): Support better customization with semantic classNames/styles as function [#54968](https://github.com/ant-design/ant-design/pull/54968)
    - feat(calendar): Support better customization with semantic classNames/styles as function [#54978](https://github.com/ant-design/ant-design/pull/54978)
    - feat(descriptions): Support better customization with semantic classNames/styles [#55118](https://github.com/ant-design/ant-design/pull/55118) [@tanjiahao24](https://github.com/tanjiahao24)
    - feat(empty): Support better customization with semantic classNames/styles as function [#55007](https://github.com/ant-design/ant-design/pull/55007) [@Susuperli](https://github.com/Susuperli)
    - refactor: semantic of Descriptions [#55190](https://github.com/ant-design/ant-design/pull/55190)
    - feat(qr-code): Support better customization with semantic classNames/styles as function [#54982](https://github.com/ant-design/ant-design/pull/54982)
    - feat(statistic): Support better customization with semantic classNames/styles as function [#55117](https://github.com/ant-design/ant-design/pull/55117) [@Arktomson](https://github.com/Arktomson)
    - feat(table): Support better customization with semantic classNames/styles as function [#54983](https://github.com/ant-design/ant-design/pull/54983)
    - feat(tag): Support better customization with semantic classNames/styles as function [#54984](https://github.com/ant-design/ant-design/pull/54984)
    - feat(alert): Support better customization with semantic classNames/styles [#55060](https://github.com/ant-design/ant-design/pull/55060) [@ccc1018](https://github.com/ccc1018)
    - feat(result): Support better customization with semantic classNames/styles as function [#55044](https://github.com/ant-design/ant-design/pull/55044) [@ccc1018](https://github.com/ccc1018)
    - feat(Drawer): Support better customization with semantic classNames & styles [#55096](https://github.com/ant-design/ant-design/pull/55096) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(Modal): Support better customization with semantic classNames & styles [#55081](https://github.com/ant-design/ant-design/pull/55081) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(notification): Support better customization with semantic classNames/styles as function [#55021](https://github.com/ant-design/ant-design/pull/55021) [@GinWU05](https://github.com/GinWU05)
    - feat(spin): Support better customization with semantic classNames/styles as function [#55157](https://github.com/ant-design/ant-design/pull/55157) [@Susuperli](https://github.com/Susuperli)
    - feat(card): Support better customization with semantic classNames/styles as function [#55161](https://github.com/ant-design/ant-design/pull/55161) [@lovelts](https://github.com/lovelts)
    - feat(collapse): Support better customization with semantic classNames/styles as function [#54979](https://github.com/ant-design/ant-design/pull/54979)
    - feat(message): support better customization with semantic classNames/styles [#55054](https://github.com/ant-design/ant-design/pull/55054) [@nmsn](https://github.com/nmsn)
    - feat(image): Support better customization with semantic classNames/styles as function [#54980](https://github.com/ant-design/ant-design/pull/54980)
    - feat(segmented): Support better customization with semantic classNames/styles as function [#55119](https://github.com/ant-design/ant-design/pull/55119) [@Arktomson](https://github.com/Arktomson)
    - feat(timeline): Support better customization with semantic classNames/styles as function [#54985](https://github.com/ant-design/ant-design/pull/54985)
    - refactor: semantic of message and notification [#55199](https://github.com/ant-design/ant-design/pull/55199)
    - feat(tour): Support better customization with semantic classNames/styles as function [#54987](https://github.com/ant-design/ant-design/pull/54987)
    - feat(tree): Support better customization with semantic classNames/styles as function [#54988](https://github.com/ant-design/ant-design/pull/54988)
    - feat(Popover/Tooltip/Popconfirm): Support better customization with semantic classNames/styles as function [#54986](https://github.com/ant-design/ant-design/pull/54986)
    - feat(Skeleton): Support better customization with semantic classNames & styles [#55099](https://github.com/ant-design/ant-design/pull/55099) [@li-jia-nan](https://github.com/li-jia-nan)
    - feat(cascader): Support better customization with semantic classNames/styles as function [#54960](https://github.com/ant-design/ant-design/pull/54960)
    - feat(color-picker): Support better customization with semantic classNames/styles as function [#54962](https://github.com/ant-design/ant-design/pull/54962)
    - feat(badge): Support better customization with semantic classNames/styles as function [#54977](https://github.com/ant-design/ant-design/pull/54977)
    - feat(tree-select): Support better customization with semantic classNames/styles as function [#54967](https://github.com/ant-design/ant-design/pull/54967)
    - feat(CheckableTagGroup): Support better customization with semantic classNames/styles as function [#55796](https://github.com/ant-design/ant-design/pull/55796)

  </details>

- 🔥 新增 Masonry 瀑布流组件。[#52162](https://github.com/ant-design/ant-design/pull/52162) [@OysterD3](https://github.com/OysterD3)
- ConfigProvider
  - 🆕 ConfigProvider 支持 Table `rowKey` 全局配置。[#52751](https://github.com/ant-design/ant-design/pull/52751) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 ConfigProvider 支持 Card.Meta 的配置。[#52214](https://github.com/ant-design/ant-design/pull/52214) [@thinkasany](https://github.com/thinkasany)
  - 🆕 ConfigProvider 支持Tooltip / Popover / Popconfirm 组件的箭头配置。[#52434](https://github.com/ant-design/ant-design/pull/52434) [@thinkasany](https://github.com/thinkasany)
  - 🆕 ConfigProvider 支持 Space 组件 `root` 配置。[#52248](https://github.com/ant-design/ant-design/pull/52248) [@thinkasany](https://github.com/thinkasany)
- Tooltip
  - 🔥 ConfigProvider 支持配置 `tooltip.unique` 让 Tooltip 支持平滑移动。[#55154](https://github.com/ant-design/ant-design/pull/55154) [@zombieJ](https://github.com/zombieJ)
  - ⚡️ 优化 Tooltip 开发模式下性能（约 ~40%）以提升研发体验。[#53844](https://github.com/ant-design/ant-design/pull/53844) [@zombieJ](https://github.com/zombieJ)
- Input
  - 🔥 InputNumber 增加 `mode="spinner"` 拨轮模式。[#55592](https://github.com/ant-design/ant-design/pull/55592) [@guoyunhe](https://github.com/guoyunhe)
  - 🗑 Input.Search 重构废弃内部 `addon*` 的使用，用 Space.Compact 替换。[#55705](https://github.com/ant-design/ant-design/pull/55705) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 修复 Input.TextArea 的 `styles.textarea` 无法覆盖内置样式的问题。[#55579](https://github.com/ant-design/ant-design/pull/55579) [@meet-student](https://github.com/meet-student)
- 🆕 Pagination 快速跳转输入框现在限制只能输入数字。[#55700](https://github.com/ant-design/ant-design/pull/55700) [@afc163](https://github.com/afc163)
- Mentions
  - 🛠 重构 Mentions DOM 结构并支持 `suffix` 语义化结构以及 `size` 属性。[#55638](https://github.com/ant-design/ant-design/pull/55638) [@zombieJ](https://github.com/zombieJ)
  - 🐞 修复 Mentions 的 `autoResize=false` 时，无法拖拽缩放尺寸的问题。[#54039](https://github.com/ant-design/ant-design/pull/54039) [@jin19980928](https://github.com/jin19980928)
- 🆕 Watermark 新增 `onRemove` 以支持被用户手工删除的事件触发。[#55551](https://github.com/ant-design/ant-design/pull/55551) [@984507092](https://github.com/984507092)
- 🆕 Breadcrumb 支持 ConfigProvider `separator` 全局配置。[#54680](https://github.com/ant-design/ant-design/pull/54680) [@guoyunhe](https://github.com/guoyunhe)
- 🆕 Alert `closable` 支持 onClose 和 afterClose 方法。[#54735](https://github.com/ant-design/ant-design/pull/54735) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Radio.Group 支持 `vertical` 纵向排列语法糖。[#54727](https://github.com/ant-design/ant-design/pull/54727) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- Cascader
  - 🆕 Cascader 支持 `aria-*` 和 `data-*` 属性。[#53910](https://github.com/ant-design/ant-design/pull/53910) [@kiner-tang](https://github.com/kiner-tang)
  - 🆕 Cascader.Panel 添加 optionRender 允许自定义渲染选项。[#54843](https://github.com/ant-design/ant-design/pull/54843) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Upload `accept` 配置支持自定义过滤逻辑。[#55543](https://github.com/ant-design/ant-design/pull/55543) [@zombieJ](https://github.com/zombieJ)
- Rate
  - 🆕 Rate 支持 `size` 以配置大小。[#55028](https://github.com/ant-design/ant-design/pull/55028) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Rate `tooltips` 支持所有的提示属性配置。[07b1610](https://github.com/ant-design/ant-design/commit/07b1610) [@Jerryqun](https://github.com/Jerryqun)
- 🆕 Select 支持键盘和鼠标交互时  `onActive` 回调。[#53931](https://github.com/ant-design/ant-design/pull/53931) [@Wxh16144](https://github.com/Wxh16144)
- 🆕 Typography `copyable` 支持 HTTP 环境。[#55073](https://github.com/ant-design/ant-design/pull/55073) [@JeeekXY](https://github.com/JeeekXY)
- Form
  - 🔥 Form `useWatch` 支持动态更改监听字段名称。[#54260](https://github.com/ant-design/ant-design/pull/54260) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Form 现在取值会排除 `Form.List` 中未被注册的字段值。[#55526](https://github.com/ant-design/ant-design/pull/55526) [@crazyair](https://github.com/crazyair)
  - ⚡️ 优化 Form 在大量字段卸载时 `useWatch` 的性能。[#54212](https://github.com/ant-design/ant-design/pull/54212) [@zombieJ](https://github.com/zombieJ)
- 🆕 Flex 增加 `orientation` 属性用于布局，原 `vertical` 语法糖仍然保留。[#53648](https://github.com/ant-design/ant-design/pull/53648) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- DatePicker
  - 🆕 DatePicker 语义化结构新增面板 `container` 支持。[#55388](https://github.com/ant-design/ant-design/pull/55388) [@meet-student](https://github.com/meet-student)
  - 🆕 DatePicker 新增 `previewValue` ，以控制鼠标悬停在选项时是否输入框展示预览值。[#55258](https://github.com/ant-design/ant-design/pull/55258) [@meet-student](https://github.com/meet-student)
  - 🐞 修复 DatePicker 在清空时，`onChange` 参数 `dateString` 返回值错误的问题。[#55155](https://github.com/ant-design/ant-design/pull/55155) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- Drawer
  - 🆕 Drawer 新增 `resizable` 支持拖拽能力。[#54883](https://github.com/ant-design/ant-design/pull/54883) [@cactuser-Lu](https://github.com/cactuser-Lu)
  - 💄 Drawer 遮罩添加模糊效果。[#54707](https://github.com/ant-design/ant-design/pull/54707) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 ColorPicker `presets` 支持渐变色预设值。[#53250](https://github.com/ant-design/ant-design/pull/53250) [@zombieJ](https://github.com/zombieJ)
- Collapse
  - 🆕 Collapse `expandIconPosition` 替换为`expandIconPlacement`，并使用逻辑位置以优化 RTL 体验。[#54311](https://github.com/ant-design/ant-design/pull/54311) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 修复 Collapse 语义化结构 `icon` 作用元素不正确的问题。[#55499](https://github.com/ant-design/ant-design/pull/55499) [@thinkasany](https://github.com/thinkasany)
  - 🐞 修复 Collapse 动态修改语义化 icon 不生效的问题。[#55452](https://github.com/ant-design/ant-design/pull/55452) [@thinkasany](https://github.com/thinkasany)
- Table
  - 🆕 Table `scrollTo` 方法支持 `offset` 以设置滚动偏移量。[#54385](https://github.com/ant-design/ant-design/pull/54385) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Table `pagination.position` 替换为 `pagination.placement`。[#54338](https://github.com/ant-design/ant-design/pull/54338) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - ⌨️ ⌨️ 优化 Table `column` 为 `sortable` 时的 `aria-description` 可访问性属性。[#53087](https://github.com/ant-design/ant-design/pull/53087) [@jon-cullison](https://github.com/jon-cullison)
  - 🆕 重构 Table `column.fixed` 用 `start` 和 `end` 的逻辑位置以支持 RTL。[#53114](https://github.com/ant-design/ant-design/pull/53114) [@zombieJ](https://github.com/zombieJ)
  - 🐞 修复 Table 在使用 `sticky` 或 `scroll.y` 时出现重复的筛选下拉框和提示气泡显示的问题。修复 Table 渲染初始阶段列头不显示的问题。[#54910](https://github.com/ant-design/ant-design/pull/54910) [@afc163](https://github.com/afc163)
  - 🐞 修复 Table 在动态修改 `childrenColumnName` 时，数据不会刷新的问题。[#55559](https://github.com/ant-design/ant-design/pull/55559) [@li-jia-nan](https://github.com/li-jia-nan)
- Progress
  - 🆕 Progress `gapPosition` 替换为 `gapPlacement`，并使用位置描述值 `start` 和 `end` 取代 `left` 和 `right`。[#54329](https://github.com/ant-design/ant-design/pull/54329) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 修复 Progress 在变更 props 时，指示内容不会更新的问题。[#55554](https://github.com/ant-design/ant-design/pull/55554) [@thinkasany](https://github.com/thinkasany)
- 🛠 Grid 使用 CSS 逻辑位置以支持 RTL 体验。[#52560](https://github.com/ant-design/ant-design/pull/52560) [@li-jia-nan](https://github.com/li-jia-nan)
- Notification
  - 🛠 Notification 提供 `closable` 属性将 `onClose` 与 `closeIcon` 收敛至其中。[#54645](https://github.com/ant-design/ant-design/pull/54645) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Notification 支持自定义进度条颜色。[#52964](https://github.com/ant-design/ant-design/pull/52964) [@yellowryan](https://github.com/yellowryan)
  - 🆕 Notification 新增 `title` 属性用以替代 `message` 属性，同时废弃 `message` 属性。[#52759](https://github.com/ant-design/ant-design/pull/52759) [@thinkasany](https://github.com/thinkasany)
- Image
  - 🆕 Image 的预览遮罩 `cover` 支持设置遮罩位置。[#54492](https://github.com/ant-design/ant-design/pull/54492) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 Image 移除默认的查看图标和文案（仍然可以通过 `cover` 配置）。[#54379](https://github.com/ant-design/ant-design/pull/54379) [@765477020](https://github.com/765477020)
  - 🐞 修复 Image 在 RTL 下预览文案的展示问题。[#53596](https://github.com/ant-design/ant-design/pull/53596) [@aojunhao123](https://github.com/aojunhao123)
- Modal
  - 🆕 Modal `closable` 支持 `onClose` 属性以任意方式关闭时触发。[#54607](https://github.com/ant-design/ant-design/pull/54607) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 ConfigProvider 支持配置 Modal 的 `okButtonProps` 和 `cancelButtonProps`。[#53684](https://github.com/ant-design/ant-design/pull/53684) [@guoyunhe](https://github.com/guoyunhe)
  - 🛠 Modal 调整 DOM `className` 以与语义化结构规范保持一致。[#54472](https://github.com/ant-design/ant-design/pull/54472) [@thinkasany](https://github.com/thinkasany)
  - ⌨️ 将 Modal 在 `closable` 对象中配置的 `aria-*` 属性应用到关闭按钮上。[#53289](https://github.com/ant-design/ant-design/pull/53289) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🐞 修复 Modal 快速切换 `open` 状态时，屏幕交互会被锁定的问题。[#52753](https://github.com/ant-design/ant-design/pull/52753) [@zombieJ](https://github.com/zombieJ)
- Tabs
  - 🆕 Tabs `tabPosition` 替换为 `tabPlacement`，并使用位置描述值 `start` 和 `end` 取代 `left` 和 `right`。[#54358](https://github.com/ant-design/ant-design/pull/54358) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 💄 Tabs 移除激活态文字阴影。[#53617](https://github.com/ant-design/ant-design/pull/53617) [@guoyunhe](https://github.com/guoyunhe)
  - 🐞 Tabs 修复空内容 TabPane 的焦点行为，提升无障碍体验。[#52856](https://github.com/ant-design/ant-design/pull/52856) [@aojunhao123](https://github.com/aojunhao123)
  - 🛠 移除 Tabs 废弃 API。[#52768](https://github.com/ant-design/ant-design/pull/52768) [@aojunhao123](https://github.com/aojunhao123)
- Theme
  - 🔥 支持通过 ConfigProvider 的 `theme` 中开启 `zeroRuntime`，屏蔽 cssinjs 样式生成。[#54334](https://github.com/ant-design/ant-design/pull/54334) [@MadCcc](https://github.com/MadCcc)
  - 🆕 杂项：CSS-in-JS 支持配置 `autoPrefixTransformer` 添加浏览器样式前缀。[#54427](https://github.com/ant-design/ant-design/pull/54427) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Design Token: 在 `useToken` 中透出 css 变量。[#53195](https://github.com/ant-design/ant-design/pull/53195) [@MadCcc](https://github.com/MadCcc)
  - 💄 杂项：从 reset.css 中移除 mark 样式。[#52974](https://github.com/ant-design/ant-design/pull/52974) [@afc163](https://github.com/afc163)
  - 🔥 杂项：默认使用 CSS 变量。[#52671](https://github.com/ant-design/ant-design/pull/52671) [@MadCcc](https://github.com/MadCcc)
  - 💄 Design Token 新增 `colorBorderDisabled` token 以统一禁用状态下的边框颜色。[#52421](https://github.com/ant-design/ant-design/pull/52421) [@aojunhao123](https://github.com/aojunhao123)
- Segmented
  - 🆕 Segmented 支持 `items.tooltip` 属性以配置提示信息。[#54273](https://github.com/ant-design/ant-design/pull/54273) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Segmented 增加 `orientation` 属性用于布局，原 `vertical` 语法糖仍然保留。[#53664](https://github.com/ant-design/ant-design/pull/53664) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🛠 改善 Segmented 组件可访问性。[#52618](https://github.com/ant-design/ant-design/pull/52618) [@aojunhao123](https://github.com/aojunhao123)
- 🛠 重命名 Steps 的 `labelPlacement` 为 `titlePlacement` 以统一 API。[#53873](https://github.com/ant-design/ant-design/pull/53873) [@zombieJ](https://github.com/zombieJ)
- Space
  - 🛠 Space 使用 `separator` 代替 `split`。[#53983](https://github.com/ant-design/ant-design/pull/53983) [@thinkasany](https://github.com/thinkasany)
  - 🛠 Space 使用 `orientation` 代替 `direction` 属性。[#53669](https://github.com/ant-design/ant-design/pull/53669) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Spin 支持  `styles.wrapper`。[#53448](https://github.com/ant-design/ant-design/pull/53448) [@crazyair](https://github.com/crazyair)
- Splitter
  - 🆕 Splitter 使用 `orientation` 代替 `layout`，并增加 `vertical` 属性。[#53670](https://github.com/ant-design/ant-design/pull/53670) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🆕 Splitter 新增自定义拖拽图标。[#52216](https://github.com/ant-design/ant-design/pull/52216) [@wanpan11](https://github.com/wanpan11)
- Tour
  - 🐞 修复 Tour 在滚动时，弹层不跟随的问题。[#53140](https://github.com/ant-design/ant-design/pull/53140) [@dependabot](https://github.com/dependabot)
  - 🐞 修复 Tour dom 结构中 `panel` 的 `className` 拼写错误。[#55178](https://github.com/ant-design/ant-design/pull/55178) [@thinkasany](https://github.com/thinkasany)
- Button
  - 🆕 Button `iconPosition` 替换为 `iconPlacement` 并支持逻辑位置描述。[#54279](https://github.com/ant-design/ant-design/pull/54279) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
  - 🛠 Button `variant` 与 `color` 样式重构为 css variables 版本以降低尺寸。[#54100](https://github.com/ant-design/ant-design/pull/54100) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Button 新增自定义普通、虚线类型的按钮在禁用状态下的背景颜色。[#52839](https://github.com/ant-design/ant-design/pull/52839) [@yellowryan](https://github.com/yellowryan)
- Tag
  - 🆕 Tag 新增 CheckableTagGroup 子组件。[#53256](https://github.com/ant-design/ant-design/pull/53256) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tag 自定义颜色支持变体。[#53097](https://github.com/ant-design/ant-design/pull/53097) [@guoyunhe](https://github.com/guoyunhe)
  - 🆕 Tag 新增 `disabled` 和 `href` 属性。[#52229](https://github.com/ant-design/ant-design/pull/52229) [@aojunhao123](https://github.com/aojunhao123)
  - 🐞 修复 Tag 通过 ConfigProvider 修改 `variant` 时，Tag 不会更新的问题。[#55555](https://github.com/ant-design/ant-design/pull/55555) [@thinkasany](https://github.com/thinkasany)
  - 💄 移除 Tag `margin` 样式。[#52123](https://github.com/ant-design/ant-design/pull/52123) [@li-jia-nan](https://github.com/li-jia-nan)
- Timeline
  - 🆕 Timeline 支持 `titleSpan` 以配置 `title` 占用尺寸。[#54072](https://github.com/ant-design/ant-design/pull/54072) [@zombieJ](https://github.com/zombieJ)
  - 🆕 Timeline 支持 `orientation=horizontal` 布局。[#54031](https://github.com/ant-design/ant-design/pull/54031) [@zombieJ](https://github.com/zombieJ)
- 🆕 TimeLine `items.position` 替换为 `items.placement` 并使用逻辑位置以优化 RTL 体验。[#54382](https://github.com/ant-design/ant-design/pull/54382) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Transfer 新增 `actions` 属性可用于自定义操作按钮。[#54104](https://github.com/ant-design/ant-design/pull/54104) [@afc163](https://github.com/afc163)
- 🆕 Carousel `dotPosition` 替换为 `dotPlacement`，使用位置描述值 `start` 和 `end` 取代 `left` 和 `right`。[#54294](https://github.com/ant-design/ant-design/pull/54294) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Divider 使用 `orientation` 替换 `type`，并且支持 `vertical` 语法糖。[#53645](https://github.com/ant-design/ant-design/pull/53645) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🛠 AutoComplete 将搜索相关属性合并至 `showSearch` 属性。[#54184](https://github.com/ant-design/ant-design/pull/54184) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🆕 Menu 支持 `popupRender` 属性自定义弹出层。[#53566](https://github.com/ant-design/ant-design/pull/53566) [@Zyf665](https://github.com/Zyf665)
- 🆕 Message 支持 `pauseOnHover` 以配置用户在悬浮时暂停倒计时。[#53785](https://github.com/ant-design/ant-design/pull/53785) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 `reset.css` 移除对 IE 的兼容。[#55108](https://github.com/ant-design/ant-design/pull/55108) [@thinkasany](https://github.com/thinkasany)
- 🛠 Slider 支持 `orientation` 用于配置布局方向。[#53671](https://github.com/ant-design/ant-design/pull/53671) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 移除 InputNumber 移动端对于控制器默认隐藏。[#54900](https://github.com/ant-design/ant-design/pull/54900) [@Wxh16144](https://github.com/Wxh16144)
- 💄 Image 遮罩添加模糊效果。[#54714](https://github.com/ant-design/ant-design/pull/54714) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 💄 Modal 遮罩添加模糊效果。[#54670](https://github.com/ant-design/ant-design/pull/54670) [@EmilyyyLiu](https://github.com/EmilyyyLiu)
- 🐞 修复 Statistic.Timer 在页面进入非激活态时，`onFinish` 和 `onChange` 未触发的问题。[#53894](https://github.com/ant-design/ant-design/pull/53894) [@Psiphonc](https://github.com/Psiphonc)
- 🛠 废弃 List 组件并且从官网移除。[#54182](https://github.com/ant-design/ant-design/pull/54182) [@zombieJ](https://github.com/zombieJ)
- 🛠 BackTop 完成生命周期已被移除。[#52206](https://github.com/ant-design/ant-design/pull/52206) [@li-jia-nan](https://github.com/li-jia-nan)
- 🗑 Icon 占位组件完成生命周期已被移除。[#52241](https://github.com/ant-design/ant-design/pull/52241) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 移除 Dropdown.Button，请使用 Space.Compact。[#53793](https://github.com/ant-design/ant-design/pull/53793) [@Meet-student](https://github.com/Meet-student)
- 🛠 Badge 重构 `offset` 样式偏移为 CSS 逻辑位置。[#55245](https://github.com/ant-design/ant-design/pull/55245) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 杂项：替换 `classNames` 库为 `clsx`。[0246702](https://github.com/ant-design/ant-design/commit/0246702) [#55164](https://github.com/ant-design/ant-design/pull/55164) [@lijianan](https://github.com/lijianan)
- 🛠 杂项：移除 MediaQueryList 针对旧版浏览器的兼容代码。[#55396](https://github.com/ant-design/ant-design/pull/55396) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 杂项：移除 React 19 兼容代码，现在 antd 默认支持 React 19。[#55274](https://github.com/ant-design/ant-design/pull/55274) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 杂项：移除 `copy-to-clipboard` 依赖。[#54448](https://github.com/ant-design/ant-design/pull/54448) [@765477020](https://github.com/765477020)
- 🔥 杂项：提升构建目标版本，不再支持 IE。[#53390](https://github.com/ant-design/ant-design/pull/53390) [@zombieJ](https://github.com/zombieJ)
- 🔥 杂项：在打包产物 `antd.js` 以及 `antd.min.js` 中启用了 `React Compiler` 以优化性能，对使用 CJS/ESM 场景的用户可自行选择开启，参考[React 官方文档](https://zh-hans.react.dev/learn/react-compiler)。 [#55781](https://github.com/ant-design/ant-design/pull/55781) [@li-jia-nan](https://github.com/li-jia-nan)
- 🔥 杂项：颜色相关组件现在支持预设颜色名（如 `red`, `blue`, `green` 等等）。[#53241](https://github.com/ant-design/ant-design/pull/53241) [@zombieJ](https://github.com/zombieJ)
- 🌐 添加马拉地语国际化翻译。[#55179](https://github.com/ant-design/ant-design/pull/55179) [@divyeshagrawal](https://github.com/divyeshagrawal)
- TypeScript
  - 🤖 优化 Notification `duration` 定义，现在禁止关闭为 `false`。[#55580](https://github.com/ant-design/ant-design/pull/55580) [@wanpan11](https://github.com/wanpan11)

## 5.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/5.x-stable/CHANGELOG.zh-CN.md) 查看 `5.x` 的 Change Log。

## 4.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.zh-CN.md) 查看 `4.x` 的 Change Log。

## 3.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.zh-CN.md) 查看 `3.x` 的 Change Log。

## 2.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.zh-CN.md) 查看 `2.x` 的 Change Log。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
