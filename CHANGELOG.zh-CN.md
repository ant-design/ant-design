---
order: 6
title: 更新日志
toc: false
timeline: true
---

`antd` 遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 5.6.4

`2023-07-03`

- Form
  - 🐞 修复 Form 在提交时，字段没有配置 `rules` 时仍会错误触发 `onFieldsChange` 事件的问题。[#43290](https://github.com/ant-design/ant-design/pull/43290)
  - 🐞 修复 Form.List 的 `name` 为 0 时误报 `name` 为空的警告信息的问题。[#43199](https://github.com/ant-design/ant-design/pull/43199) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Badge `color` 属性不生效的问题。[#43304](https://github.com/ant-design/ant-design/pull/43304)
- 🐞 修复 Select 组件的消除图标在 FormItem 设置 `hasFeedback` 时的位置问题。[#43302](https://github.com/ant-design/ant-design/pull/43302) [@tinyfind](https://github.com/tinyfind)
- 🐞 修复 Transfer 分页下拉按钮被隐藏以及 `showSizeChanger` 方法无效。[#41906](https://github.com/ant-design/ant-design/pull/41906) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Popconfirm 组件 `colorText` 和  `fontSize` 修改无效的问题。[#43212](https://github.com/ant-design/ant-design/pull/43212) [@MadCcc](https://github.com/MadCcc)
- 🐞 修复 Upload 配置 `maxCount` 后删除文件不会触发 `onChange` 的问题。[#43193](https://github.com/ant-design/ant-design/pull/43193)
- 💄 修复 Button 在有 `link` 或 `href` 属性时禁用样式错误。[#43091](https://github.com/ant-design/ant-design/pull/43091) [@BoyYangzai](https://github.com/BoyYangzai)
- TypeScript
  - 🤖 优化 Breadcrumb `params` 类型，支持泛型。[#43211](https://github.com/ant-design/ant-design/pull/43211)
  - 🤖 优化 Typography `copyIdRef` 类型。[#43257](https://github.com/ant-design/ant-design/pull/43257) [@thinkasany](https://github.com/thinkasany)
  - 🤖 移除 Button `loading` 多余 number 类型。[#43256](https://github.com/ant-design/ant-design/pull/43256) [@thinkasany](https://github.com/thinkasany)
  - 🤖 透传 Cascader `optionType` 泛型。[#43231](https://github.com/ant-design/ant-design/pull/43231) [@ZWkang](https://github.com/ZWkang)

## 5.6.3

`2023-06-25`

- BreadCrumb
  - 🐞 修复 BreadCrumb 传递 `dropdownProps` 不生效的问题。[#43151](https://github.com/ant-design/ant-design/pull/43151) [@linxianxi](https://github.com/linxianxi)
  - 🛠 优化 BreadCrumb 处理 `title` 为 `null` 时的行为。[#43099](https://github.com/ant-design/ant-design/pull/43099) [@Asanio06](https://github.com/Asanio06)
- 🐞 修复 Slider 在 Form 内部时的禁用状态。[#43142](https://github.com/ant-design/ant-design/pull/43142) [@Starpuccino](https://github.com/Starpuccino)
- 🐞 修复 Form 标签偏移值在垂直布局中不生效的问题。[#43155](https://github.com/ant-design/ant-design/pull/43155) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Table 打开筛选面板会报 `react ref` 错误警告信息。[#43139](https://github.com/ant-design/ant-design/pull/43139)
- 🐞 修复 Transfer 配置 `rowKey` 后无法选中的问题。[#43115](https://github.com/ant-design/ant-design/pull/43115)
- 🐞 修复 Space 与其他组件搭配使用时的 `size` 优先级[#42752](https://github.com/ant-design/ant-design/pull/42752) [@linxianxi](https://github.com/linxianxi)
- 🐞 修复 QRCode 在暗黑模式下的颜色。[#43162](https://github.com/ant-design/ant-design/pull/43162) [@ds1371dani](https://github.com/ds1371dani)
- 💄 修复 Select 选项使用 Badge 和 Tag 时底部存在意外边距的问题。[#43097](https://github.com/ant-design/ant-design/pull/43097) [@Yuiai01](https://github.com/Yuiai01)
- TypeScript
  - 🤖 优化 Button 的 `target` 属性类型定义。[#43129](https://github.com/ant-design/ant-design/pull/43129) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 优化 Progress 的 `size` 属性类型定义以支持百分比值。[#43123](https://github.com/ant-design/ant-design/pull/43123) [@Ali-ovo](https://github.com/Ali-ovo)
  - 🤖 优化 Slider tooltip 的类型定义。[#43094](https://github.com/ant-design/ant-design/pull/43094) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.6.2

`2023-06-19`

- 🐞 修复 Dropdown 配置 `autoFocus` 无效的问题。[#43002](https://github.com/ant-design/ant-design/pull/43002) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 InputNumber 设置 `prefix` 在 Form.Item `hasFeedBack` 内高度异常的问题。[#43049](https://github.com/ant-design/ant-design/pull/43049)
- 💄 修复 Input 和 InputNumber 禁用状态样式。[#42974](https://github.com/ant-design/ant-design/pull/42974) [@kampiu](https://github.com/kampiu)
- 🐞 修复 Upload 配置 `maxCount` 后，上传超出范围的文件仍然会触发 `onChange` 事件的问题。[#43034](https://github.com/ant-design/ant-design/pull/43034)
- 🐞 修复打包时即便没有使用 `rc-field-form` 包仍然会包含它的问题。[#43023](https://github.com/ant-design/ant-design/pull/43023)
- 🐞 修复 DatePicker 动态设置 `disabledTime` 时值不正确的问题。[#42991](https://github.com/ant-design/ant-design/pull/42991) [@linxianxi](https://github.com/linxianxi)
- 📖 补充 FloatButton 受控实例，并添加对应的 warning 提示。[#42835](https://github.com/ant-design/ant-design/pull/42835) [@poyiding](https://github.com/poyiding)
- 🐞 修复 Button 禁用时子节点仍然可以交互的问题。[#42949](https://github.com/ant-design/ant-design/pull/42949) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 Drawer 添加最大宽度以防止在小屏幕下超出的问题。[#42914](https://github.com/ant-design/ant-design/pull/42914) [@amir2mi](https://github.com/amir2mi)
- 🐞 修复 Table 设置 `checkStrictly` 时，`preserveSelectedRowKeys` 无效的问题。[#42784](https://github.com/ant-design/ant-design/pull/42784) [@linxianxi](https://github.com/linxianxi)
- 🐞 修复 Transfer 在动态变更数据时，展示的选中数不同步的问题。[#42785](https://github.com/ant-design/ant-design/pull/42785) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 修复 Radio.Button `title` 属性不生效，并补齐对应定义。[#43012](https://github.com/ant-design/ant-design/pull/43012) [@linxianxi](https://github.com/linxianxi)

## 5.6.1

`2023-06-07`

- ColorPicker
  - 🐞 修复 ColorPicker 预设颜色没法选中的问题。[#42882](https://github.com/ant-design/ant-design/pull/42882) [@RedJue](https://github.com/RedJue)
  - 🐞 修复 ColorPicker 组件清除后再点击清除仍然触发 `onChange` 的问题。[#42643](https://github.com/ant-design/ant-design/pull/42643) [@linxianxi](https://github.com/linxianxi)
- 🐞 修复 Collapse 组件废弃警告异常显示问题。[#42876](https://github.com/ant-design/ant-design/pull/42876) [@kiner-tang](https://github.com/kiner-tang)
- TypeScript
  - 🤖 修复 Collapse 组件 `items` 类型应该为可选。[#42877](https://github.com/ant-design/ant-design/pull/42877) [@Dunqing](https://github.com/Dunqing)

## 5.6.0

`2023-06-06`

- 🆕 ColorPicker 添加 `onClear` 属性，清除选中颜色时不自动关闭弹窗。[#42634](https://github.com/ant-design/ant-design/pull/42634) [@linxianxi](https://github.com/linxianxi)
- 🆕 Collapse 支持通过 `items` 属性来配置面板内容。[#42545](https://github.com/ant-design/ant-design/pull/42545) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 新增静态方法 `getDesignToken` 用于获取完整的主题 token。[#42723](https://github.com/ant-design/ant-design/pull/42723) [@MadCcc](https://github.com/MadCcc)
- 🆕 ConfigProvider 支持配置 Space 组件的 `classNames` 和 `styles` 属性。[#42748](https://github.com/ant-design/ant-design/pull/42748) [@RedJue](https://github.com/RedJue)
- 🆕 Space 组件支持 `classNames` 和 `styles` 属性。[#42743](https://github.com/ant-design/ant-design/pull/42743) [@RedJue](https://github.com/RedJue)
- 🆕 Drawer 抽屉面板支持事件监听，包裹元素支持传入 `data-*` 属性。[#42718](https://github.com/ant-design/ant-design/pull/42718) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 ConfigProvider 支持自定义 Button 的 `style` / `className` / `styles` / `classNames`。[#42623](https://github.com/ant-design/ant-design/pull/42623) [@LuZhenJie1999](https://github.com/LuZhenJie1999)
- 🆕 Pagination 的页码选择器可以进行搜索了。[#42608](https://github.com/ant-design/ant-design/pull/42608)
- 🆕 QRCode 支持渲染 svg。[#42570](https://github.com/ant-design/ant-design/pull/42570) [@sy296565890](https://github.com/sy296565890)
- 🆕 Calendar 支持将 `panelMode` 作为选择源类型传递给内部选择触发器回调，以便在调用时使用正确的源类型。[#42459](https://github.com/ant-design/ant-design/pull/42459) [@bombillazo](https://github.com/bombillazo)
- 🆕 Select `fieldNames` 新增 `groupLabel` 字段映射分组标题。[#42492](https://github.com/ant-design/ant-design/pull/42492) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Table 添加对列自定义排序图标的支持。[#42498](https://github.com/ant-design/ant-design/pull/42498) [@sawadyecma](https://github.com/sawadyecma)
- 🆕 DatePicker 支持 `kk:mm` 格式的 `format` 以支持显示 24:00。[#42494](https://github.com/ant-design/ant-design/pull/42494) [@cooljser](https://github.com/cooljser)
- 🆕 ConfigProvider.config 新增 `theme` 支持配置静态方法主题。[#42473](https://github.com/ant-design/ant-design/pull/42473)
- 🆕 Calendar `onSelect` 支持 `info.source` 参数以获取选择来源。[#42432](https://github.com/ant-design/ant-design/pull/42432)
- 💄 优化 ColorPicker 组件在暗黑模式下的样式。[#42827](https://github.com/ant-design/ant-design/pull/42827) [@RedJue](https://github.com/RedJue)
- 💄 修复 Popconfirm、Alert 和 Notification 组件 `colorTextHeading` 和 `colorText` 误用问题。[#42839](https://github.com/ant-design/ant-design/pull/42839) [@MadCcc](https://github.com/MadCcc)
- 💄 修复 Divider 组件的样式问题。[#42797](https://github.com/ant-design/ant-design/pull/42797) [@kongmingLatern](https://github.com/kongmingLatern)
- 🐞 修复 Image.PreviewGroup 预览时图片切换后状态没有重置的问题。[#42793](https://github.com/ant-design/ant-design/pull/42793) [@linxianxi](https://github.com/linxianxi)
- 🐞 统一使用 `rc-util/lib/pickAttrs` 以节省包体积。修复 Rate 组件在 StrictMode 下 `findDOMNode is deprecated` 警告信息。[#42688](https://github.com/ant-design/ant-design/pull/42688)
- 🐞 Rate 组件支持传入 `id` `data-*` `aria-*` `role` `onMouseEnter` `onMouseLeave` 等属性，修复不支持 Tooltip 包裹的问题。[#42676](https://github.com/ant-design/ant-design/pull/42676)
- 🐞 修复 Menu 组件横向模式下子菜单没有对齐的问题。[#42648](https://github.com/ant-design/ant-design/pull/42648) [@MadCcc](https://github.com/MadCcc)
- 🐞 将 Card `tabList` 的 API 与 Tab `items` 对齐。[#42413](https://github.com/ant-design/ant-design/pull/42413)
- 🐞 修复循环依赖问题。
  - 🐞 修复 Modal 组件循环依赖问题。[#42841](https://github.com/ant-design/ant-design/pull/42841) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复 Space 组件循环依赖问题。[#42811](https://github.com/ant-design/ant-design/pull/42811) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复 Statistic 组件循环依赖问题。[#42814](https://github.com/ant-design/ant-design/pull/42814) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复 List 组件循环依赖问题。[#42806](https://github.com/ant-design/ant-design/pull/42806) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复 Dropdown 组件循环依赖问题。[#42764](https://github.com/ant-design/ant-design/pull/42764) [@Dunqing](https://github.com/Dunqing)
- ⌨️ 增强 Progress 可访问性表现，添加 `aria` 属性。[#42704](https://github.com/ant-design/ant-design/pull/42704) [@MehmetYararVX](https://github.com/MehmetYararVX)
- ⌨️ Notification 添加 `role` 属性。[#42484](https://github.com/ant-design/ant-design/pull/42484) [@guan404ming](https://github.com/guan404ming)
- 🛠 Collapse 使用 `onKeyDown` 替代 `onKeyPress` 来改变折叠面板的激活状态。[#42592](https://github.com/ant-design/ant-design/pull/42592) [@kiner-tang](https://github.com/kiner-tang)
- 🛠 使用 `@rc-component/trigger` 重构 Menu 组件。移除 `rc-trigger` 依赖，缩小打包体积。[#42554](https://github.com/ant-design/ant-design/pull/42554) [@MadCcc](https://github.com/MadCcc)
- 🛠 Table 组件将 `sorterOrder` 重命名为 `sortOrder` 用于 `sortIcon` 的参数。[#42519](https://github.com/ant-design/ant-design/pull/42519) [@sawadyecma](https://github.com/sawadyecma)
- 组件 Token 迁移，更多详情请查看文档：[迁移 less 变量](/docs/react/migrate-less-variables-cn)
  - 🛠 使用新的命名标准重命名 Menu 组件 token。[#42848](https://github.com/ant-design/ant-design/pull/42848) [@MadCcc](https://github.com/MadCcc)
  - 🛠 迁移 Radio 组件 less 变量。[#42050](https://github.com/ant-design/ant-design/pull/42050) [@Yuiai01](https://github.com/Yuiai01)
  - 🛠 迁移 Image 组件 less 变量。[#42048](https://github.com/ant-design/ant-design/pull/42048) [@guan404ming](https://github.com/guan404ming)
  - 🛠 迁移 Tooltip 组件 less 变量。[#42046](https://github.com/ant-design/ant-design/pull/42046) [@guan404ming](https://github.com/guan404ming)
  - 🛠 迁移 Transfer 组件 less 变量。[#42431](https://github.com/ant-design/ant-design/pull/42431) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Tabs 组件 less 变量。[#42186](https://github.com/ant-design/ant-design/pull/42186) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Card 组件 less 变量。[#42061](https://github.com/ant-design/ant-design/pull/42061) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Mentions 组件 less 变量。[#42711](https://github.com/ant-design/ant-design/pull/42711) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Avatar 组件 less 变量。[#42063](https://github.com/ant-design/ant-design/pull/42063) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Pagination 组件 less 变量。[#42330](https://github.com/ant-design/ant-design/pull/42330) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Popover 组件 less 变量。[#42337](https://github.com/ant-design/ant-design/pull/42337) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Tag 组件 less 变量。[#42053](https://github.com/ant-design/ant-design/pull/42053) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 List 组件 less 变量。[#42041](https://github.com/ant-design/ant-design/pull/42041) [@jrr997](https://github.com/jrr997)
  - 🛠 迁移 Dropdown 组件 less 变量。[#42258](https://github.com/ant-design/ant-design/pull/42258) [@poyiding](https://github.com/poyiding)
  - 🛠 迁移 Timeline 组件 less 变量。[#42491](https://github.com/ant-design/ant-design/pull/42491) [@jrr997](https://github.com/jrr997)
  - 🛠 迁移 Anchor 组件 less 变量。[#42141](https://github.com/ant-design/ant-design/pull/42141) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 迁移 Carousel 组件 less 变量。[#42157](https://github.com/ant-design/ant-design/pull/42157) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 迁移 Upload 组件 less 变量。[#42042](https://github.com/ant-design/ant-design/pull/42042) [@jrr997](https://github.com/jrr997)
  - 🛠 迁移 Typography 组件 less 变量。[#42442](https://github.com/ant-design/ant-design/pull/42442) [@jrr997](https://github.com/jrr997)
  - 🛠 迁移 Segmented 组件 less 变量。[#42136](https://github.com/ant-design/ant-design/pull/42136) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 迁移 Checkbox 组件 less 变量。[#42097](https://github.com/ant-design/ant-design/pull/42097) [@poyiding](https://github.com/poyiding)
  - 🛠 迁移 Skeleton 组件 less 变量。[#42134](https://github.com/ant-design/ant-design/pull/42134) [@kiner-tang](https://github.com/kiner-tang)
  - 🛠 迁移 Breadcrumb 组件 less 变量。[#42342](https://github.com/ant-design/ant-design/pull/42342) [@heiyu4585](https://github.com/heiyu4585)
  - 🛠 迁移 Calendar 组件 less 变量。[#42194](https://github.com/ant-design/ant-design/pull/42194) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 迁移 Rate 组件 less 变量。[#42135](https://github.com/ant-design/ant-design/pull/42135) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🛠 迁移 Descriptions 组件 less 变量。[#42038](https://github.com/ant-design/ant-design/pull/42038) [@jrr997](https://github.com/jrr997)

## 5.5.2

`2023-05-30`

- 🐞 修复 ColorPicker 组件悬停边界问题。[#42669](https://github.com/ant-design/ant-design/pull/42669) [@RedJue](https://github.com/RedJue)
- 🐞 修复 Menu 组件 `overflowedIndicatorClassName` 覆盖了原本的 class 的问题。[#42692](https://github.com/ant-design/ant-design/pull/42692) [@MadCcc](https://github.com/MadCcc)
- 🐞 修复 Select 组件在某些情况下显示乱码问题。[#42651](https://github.com/ant-design/ant-design/pull/42651) [@895433995](https://github.com/895433995)
- 🐞 修复 Card 组件，当 Image 设置 `cover` 属性时，悬停蒙版没有圆角属性，导致 UI 异常。[#42642](https://github.com/ant-design/ant-design/pull/42642) [@iNeedToCopy](https://github.com/iNeedToCopy)
- 🐞 修复 Checkbox 和 label 不对齐的问题。[#42590](https://github.com/ant-design/ant-design/pull/42590) [@MadCcc](https://github.com/MadCcc)
- 🐞 修复使用 ConfigProvider 会导致未使用的 Form 组件也被打包的问题。[#42604](https://github.com/ant-design/ant-design/pull/42604)
- 🐞 修复 InputNumber 和其他组件无法基线对齐的问题。[#42580](https://github.com/ant-design/ant-design/pull/42580)
- 🐞 修复 Badge 组件中旋转的 `icon` 动画。[#42575](https://github.com/ant-design/ant-design/pull/42575) [@MadCcc](https://github.com/MadCcc)
- 📦 优化 Form `setFieldsValue` 相关代码以降低打包尺寸。[#42635](https://github.com/ant-design/ant-design/pull/42635)
- 💄 优化 Image 组件预览组样式。[#42675](https://github.com/ant-design/ant-design/pull/42675) [@kiner-tang](https://github.com/kiner-tang)
- 💄 修复 Tag 无边框样式在 `error` 等状态下不生效的问题。[#42619](https://github.com/ant-design/ant-design/pull/42619) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 修复 Table `rowSpan` 悬浮高亮背景颜色丢失的问题。[#42572](https://github.com/ant-design/ant-design/pull/42572)
- 💄 修复 Pagination 在禁用状态下 link 图标和 ellipsis hover 时的样式。[#42541](https://github.com/ant-design/ant-design/pull/42541) [@qmhc](https://github.com/qmhc)
- 💄 修复部分全局 Token 无法覆盖组件样式的问题。[#42535](https://github.com/ant-design/ant-design/pull/42535) [@MadCcc](https://github.com/MadCcc)
- 🇱🇹 为 `lt_LT` 添加缺失的部分文案。[#42664](https://github.com/ant-design/ant-design/pull/42664) [@Digital-512](https://github.com/Digital-512)
- RTL
  - 💄 修复 ColorPicker 组件 RTL 模式样式。[#42716](https://github.com/ant-design/ant-design/pull/42716) [@RedJue](https://github.com/RedJue)
  - 💄 修复 Anchor RTL 模式下轨道的位置。[#42706](https://github.com/ant-design/ant-design/pull/42706) [@qmhc](https://github.com/qmhc)

## 5.5.1

`2023-05-22`

- 🐞 修复 Button 组件 icon 尺寸和间距问题。[#42516](https://github.com/ant-design/ant-design/pull/42516) [@MadCcc](https://github.com/MadCcc)
- 🐞 修复 Select 移除和选中按钮不居中的问题。[#42513](https://github.com/ant-design/ant-design/pull/42513)
- 🐞 重构 Popconfirm DOM 结构以解决 `icon={null}` 时 `title` 和 `description` 的多余 margin 问题。[#42433](https://github.com/ant-design/ant-design/pull/42433)
- 🐞 修复 Menu 图标在 `itemMarginInline` 为 0 时不居中的问题。[#42426](https://github.com/ant-design/ant-design/pull/42426) [@zzwgh](https://github.com/zzwgh)
- 🐞 修复 Tag 被 Tooltip 包裹时，hover 会导致 `font-size` 错误的问题。[#42414](https://github.com/ant-design/ant-design/pull/42414)
- 🐞 修复 Popconfirm 的 `onVisibleChange` 会重复触发的问题。[#42393](https://github.com/ant-design/ant-design/pull/42393)
- 🐞 调整 Tooltip 和 Popover 展示逻辑，现在会优先保证不会被 `overflow: hidden` 裁剪，其次保证尽可能在可见屏幕范围内展示。[#42394](https://github.com/ant-design/ant-design/pull/42394)
- ColorPicker
  - 🐞 优化 ColorPicker `allowClear` 交互逻辑，重新打开面板选择颜色会默认 100% 透明度，而不是 0%。[#42439](https://github.com/ant-design/ant-design/pull/42439) [@RedJue](https://github.com/RedJue)
  - 🐞 优化 ColorPicker 交互，点击清除按钮时隐藏面板。[#42406](https://github.com/ant-design/ant-design/pull/42406) [@kiner-tang](https://github.com/kiner-tang)
- 💄 修改 Table 筛选下拉菜单的圆角。[#42451](https://github.com/ant-design/ant-design/pull/42451) [@Yuiai01](https://github.com/Yuiai01)
- 🛠 全局移除 `rc-util/lib/Dom/addEventListener` 引入的 `addEventListener` 方法，用原生代替。[#42464](https://github.com/ant-design/ant-design/pull/42464) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 优化 @ant-design/icons 的 bundle 体积大小。修复 TwoTone 类的图标色为 5.0 的新主色。[#42443](https://github.com/ant-design/ant-design/pull/42443)
- 🌐 添加 `mn_MN` 中缺失的翻译。[#42512](https://github.com/ant-design/ant-design/pull/42512) [@ariunbatb](https://github.com/ariunbatb)
- RTL
  - 💄 修复 Select `direction` 为 `rtl` 时 scrollbar 的位置。[#42508](https://github.com/ant-design/ant-design/pull/42508) [@BoyYangzai](https://github.com/BoyYangzai)
- TypeScript
  - 🤖 优化 Slider ref 类型，移除 `unknown` 和 `any` 类型，用 `SliderRef` 代替。[#42420](https://github.com/ant-design/ant-design/pull/42420) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.5.0

`2023-05-15`

- 🔥 新增颜色选择器组件。[#41990](https://github.com/ant-design/ant-design/pull/41990) [@RedJue](https://github.com/RedJue)
- 🆕 新增 `DatePicker.generateCalendar` 与 `Calendar.generateCalendar` 自定义日期库组件方法，不再需要通过路径引入使用。[#41773](https://github.com/ant-design/ant-design/pull/41773)
- 💄 优化 Select、TreeSelect、Cascader 多选模式下的样式，去除标签的边框。[#41480](https://github.com/ant-design/ant-design/pull/41480)
- 🆕 Form `validateFields` 支持 `validateOnly` 配置仅做校验而不改变 UI 状态。[#42273](https://github.com/ant-design/ant-design/pull/42273)
- 🆕 DatePicker 支持 `changeOnBlur` 以允许不点击确认按钮，在失去焦点时也能触发 change 事件。[#42168](https://github.com/ant-design/ant-design/pull/42168)
- 🆕 Cascader `options` 支持 `disableCheckbox` 在多选时禁用勾选框。[#42024](https://github.com/ant-design/ant-design/pull/42024) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm 新增 `onPopupClick` 属性。[#42272](https://github.com/ant-design/ant-design/pull/42272) [@bolosea](https://github.com/bolosea)
- 🆕 QRCode 新增 `bgColor` 属性设置背景色。[#42214](https://github.com/ant-design/ant-design/pull/42214) [@bolosea](https://github.com/bolosea)
- 🆕 Table.Summary.Row 组件增加 `onClick` 属性。[#42175](https://github.com/ant-design/ant-design/pull/42175) [@Ylg12345](https://github.com/Ylg12345)
- 🆕 Space 新增支持 ref。[#42266](https://github.com/ant-design/ant-design/pull/42266) [@RedJue](https://github.com/RedJue)
- 🆕 Tab 新增默认继承 Card 的 `size`。[#42183](https://github.com/ant-design/ant-design/pull/42183) [@huangkairan](https://github.com/huangkairan)
- ConfigProvider
  - 🐞 修复 ConfigProvider `size` 对 Pagination 无效的问题。[#42206](https://github.com/ant-design/ant-design/pull/42206)
  - 🐞 修复 ConfigProvider `size` 对 Steps 无效的问题。[#42278](https://github.com/ant-design/ant-design/pull/42278) [@wanghui2021](https://github.com/wanghui2021)
  - 🐞 修复 ConfigProvider `size` 对 Descriptions 无效的问题。[#42244](https://github.com/ant-design/ant-design/pull/42244) [@wanghui2021](https://github.com/wanghui2021)
  - 🐞 修复当 ConfigProvider 中 `componentSize` 被设定时, Space.Compact 没有继承的问题。[#42199](https://github.com/ant-design/ant-design/pull/42199) [@Ec-tracker](https://github.com/Ec-tracker)
- 🐞 修复 Input 在 Space.Compact 下使用图标的样式错误。[#42167](https://github.com/ant-design/ant-design/pull/42167) [@pengyw97](https://github.com/pengyw97)
- 🐞 修复当 `title` 和 `content` 属性均为空值时，Popover 组件展示空白气泡的问题。[#42217](https://github.com/ant-design/ant-design/pull/42217) [@hairgc](https://github.com/hairgc)
- 🐞 修复 Circle Progress 未设置 `size` 的报错问题。[#41875](https://github.com/ant-design/ant-design/pull/41875) [@notzheng](https://github.com/notzheng)
- 🐞 修复 Progress 抛出的警告 `findDOMNode is deprecated in StrictMode`。[#42241](https://github.com/ant-design/ant-design/pull/42241) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 修复 InputNumber 超出范围样式不生效的问题。[#42250](https://github.com/ant-design/ant-design/pull/42250) [@pengyw97](https://github.com/pengyw97)
- 💄 修复 Divider 在垂直方向虚线样式被覆盖导致无法正常显示的问题。[#40418](https://github.com/ant-design/ant-design/pull/40418) [@buqiyuan](https://github.com/buqiyuan)
- 💄 调整 Tooltip 动画，现在弹出位置会动态从箭头方向弹出。[#42225](https://github.com/ant-design/ant-design/pull/42225)
- 💄 调整 Checkbox.Group 样式风格与 v4 保持一致。[#42103](https://github.com/ant-design/ant-design/pull/42103) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 完善 Menu 溢出时样式。[#42294](https://github.com/ant-design/ant-design/pull/42294) [@dhalenok](https://github.com/dhalenok)
- 💄 完善 Segmented 鼠标 active 样式。[#42249](https://github.com/ant-design/ant-design/pull/42249)
- 🤖 Spin 添加在非嵌套下使用 `tip` 的警告提示。[#42293](https://github.com/ant-design/ant-design/pull/42293)
- 🤖 组件 Token 名称规范化。[#42184](https://github.com/ant-design/ant-design/pull/42184)
- TypeScript
  - 🤖 完善 Tag 的类型定义。[#42235](https://github.com/ant-design/ant-design/pull/42235) [@gaoqiiii](https://github.com/gaoqiiii)
  - 🤖 完善 Notification `getContainer` 类型定义。[#40206](https://github.com/ant-design/ant-design/pull/40206) [@leshalv](https://github.com/leshalv)
  - 🤖 改进了 Menu 组件对 MenuItemType 和 MenuItemProps 泛型的支持。[#42240](https://github.com/ant-design/ant-design/pull/42240) [@yangyuanxx](https://github.com/yangyuanxx)
- 国际化
  - 🇧🇬 补充 bg_BG Form 文案。[#42203](https://github.com/ant-design/ant-design/pull/42203) [@tangzixuan](https://github.com/tangzixuan)

## 5.4.7

`2023-05-06`

- 🐞 修复 Menu.Item 与 Submenu 之间间距不统一的问题。[#42160](https://github.com/ant-design/ant-design/pull/42160)
- 🐞 修复 Breadcrumb 使用 `itemRender` 并且配置 `path` 时，渲染元素会额外包一层 a 元素的问题。[#42049](https://github.com/ant-design/ant-design/pull/42049)
- 🐞 修复 Transfer 在受控模式下报 React 状态嵌套更新错误信息。[#42033](https://github.com/ant-design/ant-design/pull/42033)
- 🐞 修复 Upload 禁用状态的逻辑。[#42102](https://github.com/ant-design/ant-design/pull/42102) [@Wxh16144](https://github.com/Wxh16144)
- 💄 修复 Spin 与其 icon 子元素高度不一致的问题。[#42162](https://github.com/ant-design/ant-design/pull/42162) [@cheapCoder](https://github.com/cheapCoder)
- ⚡️ 优化 Affix 组件在无需更新时计算逻辑。[#42015](https://github.com/ant-design/ant-design/pull/42015) [@Simon-He95](https://github.com/Simon-He95)
- ⚡️ 优化 Anchor 组件在无需跳转时计算逻辑。[#42018](https://github.com/ant-design/ant-design/pull/42018) [@Simon-He95](https://github.com/Simon-He95)

## 5.4.6

`2023-04-26`

- 🐞 修复 Table 一系列边框和圆角的样式细节问题。[#41985](https://github.com/ant-design/ant-design/pull/41985)
- 💄 修复 Layout.Sider 折叠时丢失动画的问题。[#41993](https://github.com/ant-design/ant-design/pull/41993)
- 🐞 修复 InputNumber 字体样式错误。[#41983](https://github.com/ant-design/ant-design/pull/41983)
- 🐞 修复响应式 Col `colSize` 不支持 `flex` 的问题。[#41962](https://github.com/ant-design/ant-design/pull/41962) [@AlexisSniffer](https://github.com/AlexisSniffer)
- 🐞 修复 Carousel `goTo` 在动画播放时无效的问题。[#41969](https://github.com/ant-design/ant-design/pull/41969) [@guan404ming](https://github.com/guan404ming)
- Form
- 🐞 修复 Form 触发重置事件后反馈图标未重置的问题。[#41976](https://github.com/ant-design/ant-design/pull/41976)
- 🐞 修复 `onValuesChange` 收集到的数据不准确的问题。[#41976](https://github.com/ant-design/ant-design/pull/41976)
- TypeScript
  - 🤖 修复 Menu 报错 OverrideContext 类型定义不存在的问题。[#41907](https://github.com/ant-design/ant-design/pull/41907)
  - 🤖 修复 TreeSelect 定义不支持 `aria-*` 的问题。[#41978](https://github.com/ant-design/ant-design/pull/41978) [@guan404ming](https://github.com/guan404ming)

## 5.4.5

`2023-04-23`

- 🐞 修复 Anchor 组件 `onChange` 方法改变后不触发的问题。[#41934](https://github.com/ant-design/ant-design/pull/41934) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 InputNumber 组件样式被浏览器原生样式覆盖的问题。[#41940](https://github.com/ant-design/ant-design/pull/41940) [@Wxh16144](https://github.com/Wxh16144)
- Tree
  - 🐞 修复 Tree 组件可拖拽树文本换行时其标题不对齐。[#41928](https://github.com/ant-design/ant-design/pull/41928) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 修复 Checkbox 组件标题没有对齐的问题。[#41920](https://github.com/ant-design/ant-design/pull/41920) [@Yuiai01](https://github.com/Yuiai01)
- 🛠 升级 `rc-switch` 以修复重复引入 `@babel/runtime/helpers` 的问题，减小打包体积。[#41954](https://github.com/ant-design/ant-design/pull/41954)

## 5.4.4

`2023-04-20`

- 💄 修复 Message hooks 的图标样式不跟随动态主题 token 切换的问题。[#41899](https://github.com/ant-design/ant-design/pull/41899)
- 🐞 修复 CSS 属性值为 `undefined` 时 cssinjs 报错的问题。[#41896](https://github.com/ant-design/ant-design/pull/41896)

## 5.4.3

`2023-04-19`

- 🐞 修复 FloatButton 警告: findDOMNode is deprecated in StrictMode.。[#41833](https://github.com/ant-design/ant-design/pull/41833) [@fourcels](https://github.com/fourcels)
- 🐞 箭头元素兼容旧版本不支持 `clip-path: path()` 的浏览器。 [#41872](https://github.com/ant-design/ant-design/pull/41872)
- 🐞 修复 Layout.Sider 切换主题时存在背景切换延迟的问题。[#41828](https://github.com/ant-design/ant-design/pull/41828)
- 🐞 修复 Tour 的 `type="primary"` 时箭头的颜色仍为白色的问题。[#41761](https://github.com/ant-design/ant-design/pull/41761)
- 🐞 优化 Form 字段绑定，现在会忽略在 Form.Item 内的注释不再作为子组件进行绑定。[#41771](https://github.com/ant-design/ant-design/pull/41771)
- 🐞 修复 Input.Password 在 Edge 中会额外展示切换按钮的问题。[#41759](https://github.com/ant-design/ant-design/pull/41759)
- 💄 修复 Space.Compact 包裹底层为 Tooltip 组件的组件时的样式问题。[#41707](https://github.com/ant-design/ant-design/pull/41707) [@foryuki](https://github.com/foryuki)
- 🇩🇪 修复德语本地化文案。[#41780](https://github.com/ant-design/ant-design/pull/41780) [@aaarichter](https://github.com/aaarichter)
- TypeScript
  - 🤖 完善 Modal 的类型定义。[#41742](https://github.com/ant-design/ant-design/pull/41742) [@MuxinFeng](https://github.com/MuxinFeng)

## 5.4.2

`2023-04-11`

- 🐞 修复 DatePicker 组件异常显示废弃警告的问题。[#41753](https://github.com/ant-design/ant-design/pull/41753) [@kiner-tang](https://github.com/kiner-tang)
- 🇩🇪 补充 `de_DE` 遗漏的国际化。[#41747](https://github.com/ant-design/ant-design/pull/41747) [@eldarcodes](https://github.com/eldarcodes)
- TypeScript
  - 🤖 优化 TimePicker `hourStep` 的类型。[1fc3675](https://github.com/ant-design/ant-design/commit/1fc3675) [@Wuxh](https://github.com/Wuxh)

## 5.4.1

`2023-04-11`

- 💄 优化类 Select 组件弹窗逻辑，现在总是会尝试优先在可视区域展示以减少用户额外滚动成本。[#41619](https://github.com/ant-design/ant-design/pull/41619)
- 💄 去除 Badge.Ribbon 里固定的高度。[#41661](https://github.com/ant-design/ant-design/pull/41661) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 修复 Select 在搜索时宽度变为 `0px` 的问题。[#41722](https://github.com/ant-design/ant-design/pull/41722)
- 🐞 修复 Empty 空数据组件在宽度不够的容器内样式错位的问题。[#41727](https://github.com/ant-design/ant-design/pull/41727)
- 🐞 改进 Form.Item `noStyle` 验证消息显隐逻辑。[#41698](https://github.com/ant-design/ant-design/pull/41698) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修正 Form.Item 不应支持设置 `requiredMark` 的问题。[#41725](https://github.com/ant-design/ant-design/pull/41725) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Space 影响父元素字体大小和样式的问题。[#40326](https://github.com/ant-design/ant-design/pull/40326)
- 🐞 修复 Pagination 简洁模式中的上一页下一页按钮 hover 样式丢失的问题。[#41685](https://github.com/ant-design/ant-design/pull/41685)
- 🐞 修复 Tree `switcherIcon` 无法隐藏。[#41708](https://github.com/ant-design/ant-design/pull/41708) [@acyza](https://github.com/acyza)
- 🐞 修复 `List.Item.Meta` 的 `avatar` 和 `title` 不对齐的问题。[#41688](https://github.com/ant-design/ant-design/pull/41688) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Row 的 `justify` 设置为 `space-evenly` 无效。[#41679](https://github.com/ant-design/ant-design/pull/41679) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Button 类型定义不支持 `data-*` 属性的问题。[#41650](https://github.com/ant-design/ant-design/pull/41650)
- 🐞 修复 Table `rowSelection.selections` 有值时选择列宽度不够的问题。[#41626](https://github.com/ant-design/ant-design/pull/41626)
- 🐞 修复 Mentions 弹层样式。[#41660](https://github.com/ant-design/ant-design/pull/41660)
- 🐞 改进 Form.Item 关于 `require` 的判断逻辑。[#41623](https://github.com/ant-design/ant-design/pull/41623) [@Wxh16144](https://github.com/Wxh16144)
- 国际化
  - 🇹🇭 添加 Tour、Image 和 QRCode 泰语语言环境。[#41697](https://github.com/ant-design/ant-design/pull/41697) [@buildingwatsize](https://github.com/buildingwatsize)

## 5.4.0

`2023-04-03`

- 🗑 移除 `antd/es/locale-provider` `antd/lib/locale-provider` 目录，LocaleProvider 已在 4.x 版本移除，使用 ConfigProvider 作为替代。[#41289](https://github.com/ant-design/ant-design/pull/41289) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 DatePicker 等时间类组件可以定制 luxon 作为日期库。[#41580](https://github.com/ant-design/ant-design/pull/41580) [@hihuz](https://github.com/hihuz)
- 🆕 新增 Form.Item.useStatus 以支持获取错误状态信息。[#41554](https://github.com/ant-design/ant-design/pull/41554) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Input 和 Input.TextArea 组件支持 `classNames` 和 `styles` 属性，用于更细粒度的样式自定义。[#41493](https://github.com/ant-design/ant-design/pull/41493)
- 🆕 Tag 新增无边框模式。[#41305](https://github.com/ant-design/ant-design/pull/41305) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 FloatButton 支持用 `badge` 属性开启角标功能。[#41040](https://github.com/ant-design/ant-design/pull/41040) [@li-jia-nan](https://github.com/li-jia-nan)
- 🆕 Select 支持 `title` 属性以便覆盖一些自带的 title 提示。[#41280](https://github.com/ant-design/ant-design/pull/41280)
- 🆕 Image 组件支持设置 `preview.rootClassName`。[#41265](https://github.com/ant-design/ant-design/pull/41265) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Modal 组件支持 `afterOpenChange` 属性。[#41253](https://github.com/ant-design/ant-design/pull/41253) [@MuxinFeng](https://github.com/MuxinFeng)
- 🆕 Form.useWatch 新增 `preserve` 参数，支持在 Form.Item 未注册的情况下 `setFieldValue` 时触发监听。[#41191](https://github.com/ant-design/ant-design/pull/41191) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 使用 `useMemo` 重构部分组件代码。[#41533](https://github.com/ant-design/ant-design/pull/41533) [#41550](https://github.com/ant-design/ant-design/pull/41550) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 使用 React hooks 重构 Checkbox，并优化了 TS 定义。[#41117](https://github.com/ant-design/ant-design/pull/41117)
- 🛠 重构 Input.TextArea 文字计数实现方式，移至 `affixWrapper` 元素中。[#41450](https://github.com/ant-design/ant-design/pull/41450)
- 🆕 DatePicker/Calendar 组件新增 `cellRender` 用于自定义日期单元格，同时在 DatePicker 中废弃 `dateRender` 和 `monthRender` 等属性，在 Calendar 中废弃 `dateCellRender`、`monthCellRender`、`dateFullCellRender`、`monthFullCellRender` 等属性。[#41584](https://github.com/ant-design/ant-design/pull/41584) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Tour 出现两个箭头的问题。[#41578](https://github.com/ant-design/ant-design/pull/41578) [@acyza](https://github.com/acyza)
- 🐞 修复 Checkbox 配置 `controlHeight` token 时勾选框与文字不对齐的问题。[#41566](https://github.com/ant-design/ant-design/pull/41566)
- 🐞 修复 Form.Item 存在 `help` 值时在 Modal 中没有正确渲染元素。[#40519](https://github.com/ant-design/ant-design/pull/40519) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Form 使用 `hasFeedback` 时表单状态不对的问题。[#41594](https://github.com/ant-design/ant-design/pull/41594) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Slider 组件显示 `Warning: [antd: Tooltip] forcePopupAlign is align to forceAlign instead` 警告信息的问题。[#41540](https://github.com/ant-design/ant-design/pull/41540) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 修复可选择 Table 的勾选框在边缘点击的时候无法触发勾选的问题。[#41519](https://github.com/ant-design/ant-design/pull/41519)
- 国际化
  - 🇩🇪 更新 TimePicker 德语本地化文案。[#41521](https://github.com/ant-design/ant-design/pull/41521) [@Yuiai01](https://github.com/Yuiai01)
  - 🇻🇳 修复越南语本地化文案。[#41320](https://github.com/ant-design/ant-design/pull/41320) [@trongtai37](https://github.com/trongtai37) [#41345](https://github.com/ant-design/ant-design/pull/41345) [@duypham90](https://github.com/duypham90)
  - 🇲🇲 添加缅甸语本地化文案。[#41366](https://github.com/ant-design/ant-design/pull/41366) [@enson0131](https://github.com/enson0131)

## 5.3.3

`2023-03-28`

- Menu
  - 🐞 修复 Menu `items` 没有使用传入的 `key` 的问题。[#41434](https://github.com/ant-design/ant-design/pull/41434) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 修复 Menu 使用 `getPopupContainer` 选择主菜单时子菜单主题被覆盖。[#41465](https://github.com/ant-design/ant-design/pull/41465) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Table 过滤器未保持状态当筛选下拉框展示时。[#41445](https://github.com/ant-design/ant-design/pull/41445) [@ablakey](https://github.com/ablakey)
- 🐞 修复 Modal 使用 `useModal` 未透传并优先选择用户设定。[#41422](https://github.com/ant-design/ant-design/pull/41422) [@luo3house](https://github.com/luo3house)
- Form
  - 🐞 修复 Form 验证状态不按照顺序改变的问题。[#41412](https://github.com/ant-design/ant-design/pull/41412) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 修复 Form 组件 `layout="inline"` 时组件标题与表单项布局异常换行问题。[#41140](https://github.com/ant-design/ant-design/pull/41140) [@itkui](https://github.com/itkui)
- 💄 修复 ConfigProvider `nonce` 对 CSS-in-JS 样式不生效的问题。[#41482](https://github.com/ant-design/ant-design/pull/41482)
- 💄 修复 Pagination `size=small` 时，分页按钮 active、上一页下一页按钮 hover 和 active 样式丢失。[#41462](https://github.com/ant-design/ant-design/pull/41462) [#41458](https://github.com/ant-design/ant-design/pull/41458)
- 💄 修复 Tabs 组件下边框与其他边框叠加的样式问题。[#41381](https://github.com/ant-design/ant-design/pull/41381)
- 💄 修复 Dropdown.Button down 图标尺寸问题。[#41501](https://github.com/ant-design/ant-design/pull/41501)
- TypeScript
  - 🐞 修复 Breadcrumb.Item `menu` 类型定义不正确的问题。[#41373](https://github.com/ant-design/ant-design/pull/41373)
  - 🤖 优化 Grid Col 类型提示。[#41453](https://github.com/ant-design/ant-design/pull/41453) [@vaakian](https://github.com/vaakian)
  - 🤖 优化 Table `resetPagination` 类型提示。[#41415](https://github.com/ant-design/ant-design/pull/41415)
  - 🤖 优化 TreeSelect `InternalTreeSelect` 类型提示。[#41386](https://github.com/ant-design/ant-design/pull/41386) [@Andarist](https://github.com/Andarist)
- 国际化
  - 🇮🇷 完善 DatePicker `fa_IR` 翻译。[#41455](https://github.com/ant-design/ant-design/pull/41455) [@ds1371dani](https://github.com/ds1371dani)
  - 🇸🇪 完善 `sv_SE` 语言缺失内容。[#41424](https://github.com/ant-design/ant-design/pull/41424) [@dhalenok](https://github.com/dhalenok)

## 5.3.2

`2023-03-20`

- Anchor
  - 💄 修复 Anchor 组件设置为水平方向时多余的 border 样式。[#41336](https://github.com/ant-design/ant-design/pull/41336) [@gooyoung](https://github.com/gooyoung)
  - 💄 修复 Anchor 处于 `vertical` 方向时 ink 小方块的样式。[#41317](https://github.com/ant-design/ant-design/pull/41317) [@acyza](https://github.com/acyza)
- 🐞 修复 Grid 在不同设备屏幕下的 `offset` 设置不会被覆盖的问题。[#41309](https://github.com/ant-design/ant-design/pull/41309) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Breadcrumb `onClick` 不工作的问题。[#41283](https://github.com/ant-design/ant-design/pull/41283) [@acyza](https://github.com/acyza)
- 🐞 修复 Upload 在上传完毕后 Progress 组件抛出警告的问题。[#41234](https://github.com/ant-design/ant-design/pull/41234) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Table 在拖动元素一直右移时布局错误的问题。[#41139](https://github.com/ant-design/ant-design/pull/41139) [@hoho2017](https://github.com/hoho2017)
- 💄 修复 Tabs 在深色模式下更多图标的色值。[#41313](https://github.com/ant-design/ant-design/pull/41313) [@PhosphorusP](https://github.com/PhosphorusP)
- 💄 修复 Button 下拉时聚焦轮廓被其他元素遮挡的问题。[#41282](https://github.com/ant-design/ant-design/pull/41282) [@Yuiai01](https://github.com/Yuiai01)
- 💄 修复 Input.TextArea 在 focus 状态下的样式问题。[#41228](https://github.com/ant-design/ant-design/pull/41228) [@MuxinFeng](https://github.com/MuxinFeng)

- RTL
  - 💄 修复 Input.TextArea 在启用 `showCount` 时 RTL 模式下位置不正确的问题。[#41319](https://github.com/ant-design/ant-design/pull/41319) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 导出 Statistic 的 `CountdownProps` 类型。[#41341](https://github.com/ant-design/ant-design/pull/41341) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🤖 优化 token 的类型提示和说明。[#41297](https://github.com/ant-design/ant-design/pull/41297) [@arvinxx](https://github.com/arvinxx)
  - 🤖 优化 Badge `React.forwardRef` 类型定义。[#41189](https://github.com/ant-design/ant-design/pull/41189) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.3.1

`2023-03-13`

- 🐞 更新 DatePicker 底层依赖，修复 Safari 下卡顿，支持 `transform scale` 下对齐。[#41090](https://github.com/ant-design/ant-design/pull/41090)
- 🐞 修复 Menu 收缩时，Tooltip 有时会弹出的问题。[#41081](https://github.com/ant-design/ant-design/issues/41081)
- 🐞 修复 Modal.confirm 窗体有额外节点导致高度不正确的问题。[#41173](https://github.com/ant-design/ant-design/pull/41173) [@Svudec](https://github.com/Svudec)
- 🐞 修复 InputNumber `disabled` 时字体高亮不正确的问题。[#41167](https://github.com/ant-design/ant-design/pull/41167) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Anchor 动态添加 `items` 后高亮失效问题。[#40743](https://github.com/ant-design/ant-design/pull/40743) [@zqran](https://github.com/zqran)
- 🛠 更新 Mentions 底层依赖，支持 `transform scale` 下对齐。[#41160](https://github.com/ant-design/ant-design/pull/41160) [@MuxinFeng](https://github.com/MuxinFeng)
- 🐞 修复 Form 手工调用 `validateFields` 时，`hasFeedback` 对成功态不生效的问题。[#41116](https://github.com/ant-design/ant-design/pull/41116) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Cascader 在悬浮至叶子节点时，展开面板没有关闭的问题。[#41134](https://github.com/ant-design/ant-design/issues/41134)
- 🐞 修复 Popconfirm 使用 `Promise` 关闭时再次打开仍然是 `loading` 状态的问题。[#41121](https://github.com/ant-design/ant-design/pull/41121)
- 🐞 修复 Upload 在 React 18 下 `onChange` 有时数据不正确的问题。[#41082](https://github.com/ant-design/ant-design/pull/41082) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛎 补充官网中没有切换到 Space.Compact 的遗留示例，并且添加相应警告。[#41080](https://github.com/ant-design/ant-design/pull/41080) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 更新韩语国际化，添加国际化阿姆哈拉语。[#41103](https://github.com/ant-design/ant-design/pull/41103) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.3.0

`2023-03-06`

- 🆕 Tooltip 组件新增 `arrow.pointAtCenter`， 废弃 `arrow.arrowPointAtCenter`。[#40989](https://github.com/ant-design/ant-design/pull/40989)
- 🆕 Progress 组件支持自定义 `size`。[#40903](https://github.com/ant-design/ant-design/pull/40903) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Tour 组件支持自定义 `zIndex`。[#40982](https://github.com/ant-design/ant-design/pull/40982) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 Table `onHeaderCell` 支持自定义 `colSpan` 和 `rowSpan`。[#40885](https://github.com/ant-design/ant-design/pull/40885)
- 🆕 Image.Group 支持 `onChange` 回调。[#40857](https://github.com/ant-design/ant-design/pull/40857) [@kiner-tang](https://github.com/kiner-tang)
- App
  - 🆕 App 支持自定义 `style`。[#40708](https://github.com/ant-design/ant-design/pull/40708) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🆕 App 提供预先配置 `message`、`notification` 的选项。[#40458](https://github.com/ant-design/ant-design/pull/40458) [@luo3house](https://github.com/luo3house)
- 🆕 ConfigProvider 新增 `useConfig` 以获取上下文中的 `size` 和 `disabled`。[#40215](https://github.com/ant-design/ant-design/pull/40215) [@xliez](https://github.com/xliez)
- 🆕 Breadcrumb 支持 `items` 数据驱动。[#40543](https://github.com/ant-design/ant-design/pull/40543) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Breadcrumb 分隔符统一为 `li` 元素。[#40887](https://github.com/ant-design/ant-design/pull/40887) [@heiyu4585](https://github.com/heiyu4585)
- 🛠 Tooltip 现在自动调整自身以及箭头位置以更好的展示。同时废弃 `destroyTooltipOnHide.keepParent`，现在总是会自动销毁不需要的容器。[#40632](https://github.com/ant-design/ant-design/pull/40632)
- 🛠 重命名 token 中的预设颜色，如 `blue-1` 变为 `blue1`，废弃原有的 token。[#41071](https://github.com/ant-design/ant-design/pull/41071)
- 💄 Message 组件使用 `colorText` 优化样式。[#41047](https://github.com/ant-design/ant-design/pull/41047) [@Yuiai01](https://github.com/Yuiai01)
- 💄 修复 Select, TreeSelect, Cascader 父元素存在 `transform: scale` 样式时的对齐问题。[#41013](https://github.com/ant-design/ant-design/pull/41013)
- 💄 优化 Table 中 `rowScope` 的样式。[#40304](https://github.com/ant-design/ant-design/pull/40304) [@Yuiai01](https://github.com/Yuiai01)
- 💄 为组件聚焦时的 `outline` 提供新的 AliasToken `lineWidthFocus`。[#40840](https://github.com/ant-design/ant-design/pull/40840)
- 💄 WeekPicker 支持鼠标悬浮样式。[#40772](https://github.com/ant-design/ant-design/pull/40772)
- 💄 调整 Select, TreeSelect, Cascader 在多选时总是默认显示下拉箭头。[#41028](https://github.com/ant-design/ant-design/pull/41028)
- 🐞 修复 Form 组件 `Form.Item.useStatus` 导致的服务端渲染问题。[#40977](https://github.com/ant-design/ant-design/pull/40977) [@AndyBoat](https://github.com/AndyBoat)
- 🐞 修复部分组件箭头形状问题。[#40971](https://github.com/ant-design/ant-design/pull/40971)
- 🐞 修复 Layout 报错 `React does not recognize the `suffixCls` prop on a DOM element` 的问题。[#40969](https://github.com/ant-design/ant-design/pull/40969)
- 🐞 修复 Watermark 组件图片加载异常时的问题，默认展示文字。[#40770](https://github.com/ant-design/ant-design/pull/40770) [@OriginRing](https://github.com/OriginRing)
- 🐞 Image 预览新增图片翻转功能。并修复 Image `fallback` 在 ssr 下失效的问题。[#40660](https://github.com/ant-design/ant-design/pull/40660)
- 🐞 修复 Select 中使用 Typography 不居中的问题。[#40422](https://github.com/ant-design/ant-design/pull/40422) [@Yuiai01](https://github.com/Yuiai01)
- 🌐 完善 Form 的 `vi_VN` 语言包。[#40992](https://github.com/ant-design/ant-design/pull/40992) [@lamvananh](https://github.com/lamvananh)
- RTL
  - 💄 修复 FloatButton 不支持 `rtl` 模式的问题。[#40990](https://github.com/ant-design/ant-design/pull/40990) [@li-jia-nan](https://github.com/li-jia-nan)
- TypeScript
  - 🤖 修复 Cascader 泛型为非必传。[#40961](https://github.com/ant-design/ant-design/pull/40961) [@crazyair](https://github.com/crazyair)

## 5.2.3

`2023-02-27`

- 🐞 修复 Progress 同时设置 percent 和 success.percent 时，进度文本不会随着 percent 改变而改变。[#40922](https://github.com/ant-design/ant-design/pull/40922)
- 🐞 修复 Image 预览图标不对齐的问题。[#40911](https://github.com/ant-design/ant-design/pull/40911)
- 🐞 修复 ConfigProvider 组件表单校验消息生效顺序。[#40533](https://github.com/ant-design/ant-design/pull/40533) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Confirm Modal `onOk` 可能触发两次的问题。[#40719](https://github.com/ant-design/ant-design/pull/40719) [@Rafael-Martins](https://github.com/Rafael-Martins)
- 🛠 重写 `useLocale` 方法，对外暴露 `localeCode`。[#40884](https://github.com/ant-design/ant-design/pull/40884) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Segemented 组件子项不响应鼠标事件的问题。[#40894](https://github.com/ant-design/ant-design/pull/40894)
- 🛠 重构：使用 `useLocale` 替换 LocaleReceiver 组件，并删除 LocaleReceiver 组件。[#40870](https://github.com/ant-design/ant-design/pull/40870) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 ConfigProvider 注入的 `getPopupContainer` 属性 不生效的问题。[#40871](https://github.com/ant-design/ant-design/pull/40871) [@RedJue](https://github.com/RedJue)
- 🐞 修复 Descriptions 不接受 `data-*` 和 `aria-*` 等属性的问题。[#40859](https://github.com/ant-design/ant-design/pull/40859) [@goveo](https://github.com/goveo)
- 🛠 修改 Separator 的 dom 由 `span` 改为 `li`。[#40867](https://github.com/ant-design/ant-design/pull/40867) [@heiyu4585](https://github.com/heiyu4585)
- 💄 修改组件聚焦下的 `outline` 为默认 `4px`。[#40839](https://github.com/ant-design/ant-design/pull/40839)
- 🐞 修复 Layout.Header 单独使用时，`Layout.colorBgHeader` token 配置不生效的问题。[#40933](https://github.com/ant-design/ant-design/pull/40933)
- 🐞 修复 Badge 颜色显示异常问题。[#40848](https://github.com/ant-design/ant-design/pull/40848) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Timeline 的子项的 `className` 错误。[#40835](https://github.com/ant-design/ant-design/pull/40835) [@Yuiai01](https://github.com/Yuiai01)
- 💄 修复 Rate 在禁用状态下的交互样式。[#40836](https://github.com/ant-design/ant-design/pull/40836) [@Yuiai01](https://github.com/Yuiai01)
- 🇮🇷 增加了伊朗本地化。[#40895](https://github.com/ant-design/ant-design/pull/40895) [@majidsadr](https://github.com/majidsadr)

## 5.2.2

`2023-02-19`

- DatePicker
  - 💄 调整 DatePicker 组件日期面板的间距样式。[#40768](https://github.com/ant-design/ant-design/pull/40768)
  - 🐞 修复 RangePicker `hover` 日期错位的问题。[#40785](https://github.com/ant-design/ant-design/pull/40785) [@Yuiai01](https://github.com/Yuiai01)
- Form
  - 🐞 修复 Form 下 Radio/Checkbox 的 disabled 优先级问题。[#40741](https://github.com/ant-design/ant-design/pull/40741) [@Yuiai01](https://github.com/Yuiai01)
  - 🐞 修复 Form 为 `disabled` 时 Checkbox 和 Radio 表现不一致的问题。[#40728](https://github.com/ant-design/ant-design/pull/40728) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 List 启用 `grid` 时下额外 `padding` 样式。[#40806](https://github.com/ant-design/ant-design/pull/40806)
- 🐞 修复 Upload 操作图标不对齐的问题。[#40805](https://github.com/ant-design/ant-design/pull/40805)
- 💄 调整 Table 筛选菜单的底部圆角样式。[#40802](https://github.com/ant-design/ant-design/pull/40802)
- 🐞 修复 Button 组件 `loading.delay` 第一次不生效的问题。[#40759](https://github.com/ant-design/ant-design/pull/40759) [@RedJue](https://github.com/RedJue)
- 🐞 修复 Input `addonAfter` 和 `addonBefore` 的各种状态样式。[#40744](https://github.com/ant-design/ant-design/pull/40744) [@carla-cn](https://github.com/carla-cn)
- 🐞 修复 Skeleton 在 Safari 下 `active` 效果闪烁的问题。[#40692](https://github.com/ant-design/ant-design/pull/40692) [@slotDumpling](https://github.com/slotDumpling)
- 国际化
  - 🇫🇷 补充 Tour 法语本地化文案。[#40750](https://github.com/ant-design/ant-design/pull/40750) [@RedJue](https://github.com/RedJue)
  - 🇰🇷 更新韩国本地化文案。[#40716](https://github.com/ant-design/ant-design/pull/40716) [@owjs3901](https://github.com/owjs3901)

## 5.2.1

`2023-02-13`

- 🛠 重构 Tour 中 `panelRender` 为函数式组件。[#40670](https://github.com/ant-design/ant-design/pull/40670) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 TimeLine 中 `className` 传给子节点的问题。[#40700](https://github.com/ant-design/ant-design/pull/40700) [@any1024](https://github.com/any1024)
- 🐞 修复 Silder 中的标记点在边缘无法点击的问题。[#40679](https://github.com/ant-design/ant-design/pull/40679) [@LongHaoo](https://github.com/LongHaoo)
- 🐞 修复 Tour 不支持 `0` 作为节点的问题。[#40631](https://github.com/ant-design/ant-design/pull/40631) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 修复 DataPicker.RangePicker 的 hover 范围样式。[#40607](https://github.com/ant-design/ant-design/pull/40607) [@Yuiai01](https://github.com/Yuiai01)
- 💄 优化 Steps 组件自定义 `icon` 的大小。[#40672](https://github.com/ant-design/ant-design/pull/40672)
- TypeScript
  - 🤖 Upload 组件支持泛型。[#40634](https://github.com/ant-design/ant-design/pull/40634) [@riyadelberkawy](https://github.com/riyadelberkawy)
- 🌐 国际化
  - 🇷🇺/🇺🇦 补全 `ru_RU` 和 `uk_UA` 文案。[#40656](https://github.com/ant-design/ant-design/pull/40656) [@eldarcodes](https://github.com/eldarcodes)

## 5.2.0

`2023-02-08`

- 🔥 Upload 的 `listType` 属性添加 `picture-circle` 支持。[#40134](https://github.com/ant-design/ant-design/pull/40134) [@ds1371dani](https://github.com/ds1371dani)
- 🔥 Anchor 组件新增 `direction` 属性，支持 vertical。[#39372](https://github.com/ant-design/ant-design/pull/39372) [@foryuki](https://github.com/foryuki)
- 🆕 Tooltip 新增 `arrow` 属性用来改变箭头的显示状态和箭头是否指向目标元素的中心。[#40234](https://github.com/ant-design/ant-design/pull/40234) [@kiner-tang](https://github.com/kiner-tang)
- 🆕 List 分页新增 `align` 配置。[#39858](https://github.com/ant-design/ant-design/pull/39858) [@Yuiai01](https://github.com/Yuiai01)
- 🆕 Timeline 新增 `items` 支持选项配置。[#40424](https://github.com/ant-design/ant-design/pull/40424)
- Collapse
  - 🆕 Collapse 新增支持设置 `size`。[#40286](https://github.com/ant-design/ant-design/pull/40286) [@Yuiai01](https://github.com/Yuiai01)
  - 🆕 为 Collapse 和 Panel 添加 ref。[#40443](https://github.com/ant-design/ant-design/pull/40443) [@any1024](https://github.com/any1024)
- Slider
  - 🆕 Slider 新增 `railStyle` 属性用于自定义样式。[#40579](https://github.com/ant-design/ant-design/pull/40579) [@david-cord](https://github.com/david-cord)
  - 🆕 Slider 新增 `keyboard` 属性以支持禁用键盘事件。[#40526](https://github.com/ant-design/ant-design/pull/40526)
  - 🐞 修复 Slider 展示 Tooltip 时动画丢失的问题。[#39857](https://github.com/ant-design/ant-design/pull/39857)
- Dropdown
  - 🆕 Dropdown 组件支持 `autoAdjustOverflow` 属性。[#39735](https://github.com/ant-design/ant-design/pull/39735)
  - 💄 修复 Dropdown `danger` 和 `disable` 属性同时使用样式问题。[#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- Tour
  - 🆕 Tour 新增 `indicatorsRender` 支持自定义指示器。[#40613](https://github.com/ant-design/ant-design/pull/40613)
  - 🆕 Tour 支持通过 `scrollIntoViewOptions` 改变`scrollIntoView` 的选项。[#39980](https://github.com/ant-design/ant-design/pull/39980) [@kiner-tang](https://github.com/kiner-tang)
  - 🆕 Tour 遮罩支持传递自定义样式和填充颜色。[#39919](https://github.com/ant-design/ant-design/pull/39919) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复 Tour 在严格模式下调用 `findDomNode` 抛出警告问题。[#40160](https://github.com/ant-design/ant-design/pull/40160) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 删除了最后一个指示器的 margin。[#40624](https://github.com/ant-design/ant-design/pull/40624)
- 🆕 新增 Design token `fontFamilyCode` 并应用到 Typography 的 `code` `kbd` `pre` 等元素上。[#39823](https://github.com/ant-design/ant-design/pull/39823)
- 🆕 ConfigProvider 新增 Form `scrollToFirstError`。[#39509](https://github.com/ant-design/ant-design/pull/39509) [@linxianxi](https://github.com/linxianxi)
- 🐞 为全部组件补足 `rootClassName` 属性。[#40217](https://github.com/ant-design/ant-design/pull/40217)
- 🐞 修复 Empty 在默认主题和暗黑主题下的描述文字颜色。[#40584](https://github.com/ant-design/ant-design/pull/40584) [@MuxinFeng](https://github.com/MuxinFeng)
- Table
  - 🐞 修复 Table 行 `aria-label` 和 `role="presentation"` 无法一起使用的问题。[#40413](https://github.com/ant-design/ant-design/pull/40413) [@Ke1sy](https://github.com/Ke1sy)
  - 🐞 修改非受控 `filtered` 修改不生效的问题。[#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 修表头过滤器在分组标题情况下失效的问题。[#40463](https://github.com/ant-design/ant-design/pull/40463) [@roman40a](https://github.com/roman40a)
  - 🐞 修复选择列固定时滚动会被其他单元格遮盖的问题。[#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
  - 🐞 修复排序/筛选的表格的固定列背景色透明导致显示异常问题。[#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 优化 Table 组件 hover 样式，修复边框异常问题。[#40469](https://github.com/ant-design/ant-design/pull/40469)
- DatePicker
  - 🐞 修复 DatePicker 组件禁用时状态样式生效的问题。[#40608](https://github.com/ant-design/ant-design/pull/40608)
  - 💄 优化 DatePicker 输入框样式。[#40549](https://github.com/ant-design/ant-design/pull/40549) [@Wxh16144](https://github.com/Wxh16144)
  - 💄 优化 DatePicker Dropdown 箭头样式。[#40521](https://github.com/ant-design/ant-design/pull/40521)
- 🐞 修复 Space `ant-space-item` 选择器错误。[#40554](https://github.com/ant-design/ant-design/pull/40554) [@cncolder](https://github.com/cncolder)
- 🐞 修复当设置 `delay` 时，Spin 没有立即关闭的问题。[#40475](https://github.com/ant-design/ant-design/pull/40475) [@3Alan](https://github.com/3Alan)
- 🐞 修复 Modal `useModal` 默认确认按钮文本逻辑。[#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 🛠 重构水波纹视效，以支持多个水波纹同时触发了。[#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 重构 Input.TextArea 组件和 Mentions 组件。[#40045](https://github.com/ant-design/ant-design/pull/40045)
- 🛠 重构 Affix Calendar 使用 React.createRef 代替函数。[#40538](https://github.com/ant-design/ant-design/pull/40538) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 修复 Tabs 更多按钮高度样式错误。[#40488](https://github.com/ant-design/ant-design/pull/40488)
- 💄 修复 Image 预览样式会被 TailwindCSS 影响的问题。[#39914](https://github.com/ant-design/ant-design/pull/39914)
- 💄 修复 Progress 成功进度条 `transition` 样式丢失问题。[#40487](https://github.com/ant-design/ant-design/pull/40487)
- 💄 修复 Input.Group 在 windows 下缩放屏幕时的错位问题。[#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 💄 修复 Select placeholder 样式问题。[#40477](https://github.com/ant-design/ant-design/pull/40477) [@Wxh16144](https://github.com/Wxh16144)
- 💄 调整 Descriptions 标签样式使其更容易区分。[#40085](https://github.com/ant-design/ant-design/pull/40085)
- 💄 优化 QRCode 过期显示样式。[#39849](https://github.com/ant-design/ant-design/pull/39849)
- 💄 优化 `boxShadow` token 分级。[#40516](https://github.com/ant-design/ant-design/pull/40516)
- TypeScript
  - 🤖 优化 Badge Tag Tooltip `color` 类型定义。[#39871](https://github.com/ant-design/ant-design/pull/39871)
  - 🤖 新增 `Breakpoint` `ThmeConfig` `GlobalToken` 类型导出。[#40508](https://github.com/ant-design/ant-design/pull/40508) [@Kamahl19](https://github.com/Kamahl19)
  - 🤖 更新 Upload `fileList` 类型。[#40585](https://github.com/ant-design/ant-design/pull/40585)
  - 🤖 移除 Tour ForwardRefRenderFunction。[#39924](https://github.com/ant-design/ant-design/pull/39924)
- 🌐 国际化
  - 🇮🇳 补全 `ta_IN` 文案。[#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.7

`2023-01-31`

- Input
  - 🐞 修复 Input 组件 `type="search"` 时未隐藏浏览器原生取消按钮的问题。[#40457](https://github.com/ant-design/ant-design/pull/40457)
  - 🐞 修复 Input 的 suffix 颜色不随组件状态改变的问题。[#40344](https://github.com/ant-design/ant-design/pull/40344) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Switch 在 Safari 和 Chrome <= 84 兼容模式下文本的显示问题。[#40453](https://github.com/ant-design/ant-design/pull/40453) [@Ifeinstein](https://github.com/Ifeinstein)
- 🐞 修复 Progress 的 `percent` 属性设置为 `null` 时报错的问题。[#40378](https://github.com/ant-design/ant-design/pull/40378) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 List 中 title 和 avatar 渲染错位的问题。[#40395](https://github.com/ant-design/ant-design/pull/40395) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Dropdown 子菜单位置不正确的问题。[#40349](https://github.com/ant-design/ant-design/pull/40349)
- 🐞 修复 Badge 在 StrictMode 下切换 `dot` 时会报 `findDOMNode` 警告的问题。[#40347](https://github.com/ant-design/ant-design/pull/40347)
- 🐞 修复 Message 图标颜色错误的问题。[#40471](https://github.com/ant-design/ant-design/pull/40471) [@Wxh16144](https://github.com/Wxh16144)
- 💄 优化 Empty 在暗色主题下默认的颜色。[#40447](https://github.com/ant-design/ant-design/pull/40447)
- RTL
  - 💄 修复 Table 在 RTL 模式下的滚动阴影。[#40441](https://github.com/ant-design/ant-design/pull/40441) [@ds1371dani](https://github.com/ds1371dani)
- TypeScript
  - 🤖 导出 ConfigProvider 组件的 ThemeConfig 类型。[#40370](https://github.com/ant-design/ant-design/pull/40370) [@Kamahl19](https://github.com/Kamahl19)

## 5.1.6

`2023-01-20`

- 🐞 修复 DatePicker 等组件动画 timing function 错误的问题。[#40133](https://github.com/ant-design/ant-design/pull/40133)
- Menu
  - 🐞 修复 Menu 收缩时，Tooltip 偶尔会错误展示的问题。[#40328](https://github.com/ant-design/ant-design/pull/40328)
  - 🐞 修复 Menu 分割线样式错误。[#40268](https://github.com/ant-design/ant-design/pull/40268) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复带波纹效果的组件（如 Button）在波纹展示前移除时，控制台报错的问题。[#40307](https://github.com/ant-design/ant-design/pull/40307) [@luo3house](https://github.com/luo3house)
- 🐞 修复 Breadcrumb 组件使用 `menu` 属性，但是出现 overlay deprecation 警告的问题。[#40211](https://github.com/ant-design/ant-design/pull/40211) [@candy4290](https://github.com/candy4290)
- 🐞 修复 Modal.useModal `destroyAll` 不工作的问题。[#40281](https://github.com/ant-design/ant-design/pull/40281) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 修复 `message` 组件通过 `config` 设置 `duration` 无效问题。[#40232](https://github.com/ant-design/ant-design/pull/40232) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Button 包含 `a` 标签时的 文本颜色不正确的问题。[#40269](https://github.com/ant-design/ant-design/pull/40269) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 修复 Radio 在 `disabled` 时显示错误的文本颜色和光标。[#40273](https://github.com/ant-design/ant-design/pull/40273) [@ds1371dani](https://github.com/ds1371dani)
- 💄 优化 focus `outline` 计算逻辑，替换 `lineWidth` 为 `lineWidthBold`。[#40291](https://github.com/ant-design/ant-design/pull/40291) [@simonpfish](https://github.com/simonpfish)
- 💄 重写部分组件样式以兼容部分对 `:not` 支持不完全的旧版浏览器。[#40264](https://github.com/ant-design/ant-design/pull/40264)
- 🌐 修复 `pt_BR` 缺失的国际化。[#40270](https://github.com/ant-design/ant-design/pull/40270) [@rafaelncarvalho](https://github.com/rafaelncarvalho)

## 5.1.5

`2023-01-15`

- 🐞 修复 Checkbox 组件 label 不对齐的问题。 [#40208](https://github.com/ant-design/ant-design/pull/40208)
- 🐞 修复 Button 水波纹效果有时会使得布局抖动的问题。[#40192](https://github.com/ant-design/ant-design/pull/40192)
- 🐞 修复 Select 组件会卡住的问题。[#40158](https://github.com/ant-design/ant-design/pull/40158) [@helloqian12138](https://github.com/helloqian12138)
- 🐞 修复 Timeline 组件自定义颜色显示错误类名和对齐溢出的问题。[#39394](https://github.com/ant-design/ant-design/pull/39394) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Breadcrumb 最后一项颜色。[#40119](https://github.com/ant-design/ant-design/pull/40119) [@messaooudi](https://github.com/messaooudi)
- 💄 修复 Table 固定表头阴影样式错误。[#40171](https://github.com/ant-design/ant-design/pull/40171) [@Wxh16144](https://github.com/Wxh16144)
- 💄 修复 Segmented hover 时圆角和选中圆角不一致的问题。[#40175](https://github.com/ant-design/ant-design/pull/40175) [#40179](https://github.com/ant-design/ant-design/pull/40179)
- TypeScript
  - 🤖 修复 Tabs 组件 `onEdit` 类型问题。[#39926](https://github.com/ant-design/ant-design/pull/39926) [@RSS1102](https://github.com/RSS1102)
- RTL
  - 💄 优化 DatePicker 在 RTL 模式下 next 和 prev 图标。[#40238](https://github.com/ant-design/ant-design/pull/40238) [@ds1371dani](https://github.com/ds1371dani)
  - 💄 修复 Badge 作用在块级元素上时 RTL 样式不生效的问题。[#40125](https://github.com/ant-design/ant-design/pull/40125)

## 5.1.4

`2023-01-09`

- 🐞 修复 locale 文件丢失的问题。[#40116](https://github.com/ant-design/ant-design/pull/40116)
- 🐞 修复 Cascader 组件 RTL 模式中下拉菜单位置问题。[#40109](https://github.com/ant-design/ant-design/pull/40109) [@3hson](https://github.com/3hson)
- 🐞 修复部分组件动画闪烁的问题。[react-component/motion#39](https://github.com/react-component/motion/pull/39)

## 5.1.3

`2023-01-09`

- Table
  - 🛠 优化 Table `shouldCellUpdate` 逻辑，提升二次渲染速度。[#40063](https://github.com/ant-design/ant-design/pull/40063)
  - 🐞 修复 Table `columns.render` 中如果使用闭包数据，更新闭包数据不会触发重新渲染的问题。[#40004](https://github.com/ant-design/ant-design/pull/40004)
  - 🐞 修复 Table filter 时,边框会有黑色的问题。[#39938](https://github.com/ant-design/ant-design/pull/39938) [@JarvisArt](https://github.com/JarvisArt)
- Button
  - 🐞 修复 Button 水波纹效果不跟随屏幕滚动的问题。[#39954](https://github.com/ant-design/ant-design/pull/39954)
  - 🐞 修复 Button `block` 属性不生效的问题。[#39992](https://github.com/ant-design/ant-design/pull/39992) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Menu 自定义展开图标无法隐藏的错误。[#40071](https://github.com/ant-design/ant-design/pull/40071) [@Wxh16144](https://github.com/Wxh16144)
- 💄 修复横向 Menu 组件暗色模式样式。[#40105](https://github.com/ant-design/ant-design/pull/40105)
- 💄 修复圆形 Progress 文本在 rtl 模式下不显示的问题。[#40103](https://github.com/ant-design/ant-design/pull/40103)
- 🐞 修复 Cascader `notFoundContent` 内容无法交互的问题。[#40067](https://github.com/ant-design/ant-design/pull/40067)
- 🐞 修复 Transfer 中 CheckBox 在列表为空的时候没有变成 disabled 状态的问题。[#40038](https://github.com/ant-design/ant-design/pull/40038) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 修复 Checkbox 同时开启 `disabled` 和 `indeterminate` 时的样式问题。[#39974](https://github.com/ant-design/ant-design/pull/39974) [@ds1371dani](https://github.com/ds1371dani)
- 🐞 修复 Alert.ErrorBoundary 内容溢出的问题。[#40033](https://github.com/ant-design/ant-design/pull/40033)
- 💄 修复 Tag `onClick` 为 undefined，鼠标点击也会出现边框样式。[#40023](https://github.com/ant-design/ant-design/pull/40023) [@crazyair](https://github.com/crazyair)
- 💄 修复 Avatar.Group 内 Avatar 外层包裹其他元素时间距样式失效问题。[#39993](https://github.com/ant-design/ant-design/pull/39993)
- 🐞 修复 Submenu 箭头过渡动画不正确的问题。[#39945](https://github.com/ant-design/ant-design/pull/39945) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复选择列固定时滚动会被其他单元格遮盖的问题。[#39940](https://github.com/ant-design/ant-design/pull/39940) [@kiner-tang](https://github.com/kiner-tang)
- 🌐 增加缺失的泰米尔语翻译。[#39936](https://github.com/ant-design/ant-design/pull/39936) [@KIRUBASHANKAR26](https://github.com/KIRUBASHANKAR26)

## 5.1.2

`2022-12-30`

- 🆕 官网主题编辑器添加主题上传功能。[#39621](https://github.com/ant-design/ant-design/pull/39621) [@BoyYangzai](https://github.com/BoyYangzai)
- 💄 重构水波纹视效，现在可以多个水波纹同时触发了。[#39705](https://github.com/ant-design/ant-design/pull/39705) [@li-jia-nan](https://github.com/li-jia-nan)
- Table
  - 🐞 修复 Table `column.filtered` 更新不生效的问题。[#39883](https://github.com/ant-design/ant-design/pull/39883)
  - 🐞 修复 Table 排序/筛选的固定列背景色透明的样式异常问题。[#39012](https://github.com/ant-design/ant-design/pull/39012) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 解决 Image 预览样式会被 TailwindCSS 影响的问题。[#39914](https://github.com/ant-design/ant-design/pull/39914)
- 🐞 修复 Dropdown 组件 `danger` 和 `disabled` 属性同时使用的样式问题。[#39904](https://github.com/ant-design/ant-design/pull/39904) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 App `useApp` 中 `modal` 确认按钮文案。[#39884](https://github.com/ant-design/ant-design/pull/39884) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 修复 Input.Group 在 windows 下缩放屏幕时的错位问题。[#39842](https://github.com/ant-design/ant-design/pull/39842) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 修复 Slider 展示 Tooltip 时动画丢失的问题。[#39857](https://github.com/ant-design/ant-design/pull/39857)
- 🐞 修复 QRCode 过期文案在暗色模式下看不清的问题。[#39849](https://github.com/ant-design/ant-design/pull/39849) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Tree 在暗黑模式下 `switcher` 背景显示异常问题。[#39838](https://github.com/ant-design/ant-design/pull/39838) [@kiner-tang](https://github.com/kiner-tang)
- 🐞 修复 Menu 组件滑块在 `border` 被预设值重置时的样式问题。[#39819](https://github.com/ant-design/ant-design/pull/39819)
- 🐞 修复 Checkbox 禁用时不支持 Tooltip 和 Popover 的问题。[#39829](https://github.com/ant-design/ant-design/pull/39829)

## 5.1.1

`2022-12-26`

- 📦 在构建流程中去掉对 IE 等旧版本浏览器的支持以减少包体积。[#38779](https://github.com/ant-design/ant-design/pull/38779)
- ⚡️ 提升 Transfer 在大数据量下勾选和移动节点时的性能。[#39465](https://github.com/ant-design/ant-design/pull/39465) [@wqs576222103](https://github.com/wqs576222103)
- 🐞 修复组件字体错误问题。[#39806](https://github.com/ant-design/ant-design/pull/39806)
- 🐞 修复 Drawer `placement` `open` `width` 等参数为 undefined 时默认值不生效的问题。[#39782](https://github.com/ant-design/ant-design/pull/39782)
- 🐞 修复 Menu 切换时图标动画效果不流畅的问题。[#39800](https://github.com/ant-design/ant-design/pull/39800) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复 Image 预览操作条在动态过程中会被高 zIndex 的元素覆盖。[#39788](https://github.com/ant-design/ant-design/pull/39788) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复 List 组件分页器错误参数导致报错问题。[#39681](https://github.com/ant-design/ant-design/pull/39681) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Space `align="baseline"` 不生效的问题。[#39748](https://github.com/ant-design/ant-design/pull/39748) [@candy4290](https://github.com/candy4290)
- Table
  - 🐞 修复 Table 可扩展行标题没有左上边框半径的问题。[#39781](https://github.com/ant-design/ant-design/pull/39781) [@chunsch](https://github.com/chunsch)
  - 🐞 修复 Table 列头的圆角丢失问题。[#39723](https://github.com/ant-design/ant-design/pull/39723)
  - 🐞 修复 Table 组件合并单元格后底部边框消失和边框重叠时颜色变深的问题。[#39729](https://github.com/ant-design/ant-design/pull/39729)
  - ⌨️ 修正 Table `aria-*` 属性到 table 元素上以支持更好的可访问性。[#39700](https://github.com/ant-design/ant-design/pull/39700)
  - ⌨️ 重置 Table 列的 `aria-label` 属性值。[#39738](https://github.com/ant-design/ant-design/pull/39738) [@kiner-tang](https://github.com/kiner-tang)
  - 💄 为 Table 边框添加过渡动画使其 hover 效果更顺滑。[#39713](https://github.com/ant-design/ant-design/pull/39713) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复 Tabs 添加按钮在暗色模式下不可见的问题。[#39724](https://github.com/ant-design/ant-design/pull/39724)
- 🐞 修复 Card 只有 `extra` 时标题栏高度不足的问题。[#39646](https://github.com/ant-design/ant-design/pull/39646) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复 Row 组件 `justify` 和 `align` 属性，动态改变不生效的问题。[#39704](https://github.com/ant-design/ant-design/pull/39704) [@candy4290](https://github.com/candy4290)
- 🐞 修复 App 中 `children` 使用相同 key 的警告。[#39695](https://github.com/ant-design/ant-design/pull/39695) [@Kamahl19](https://github.com/Kamahl19)，[#39701](https://github.com/ant-design/ant-design/pull/39701) [@li-jia-nan](https://github.com/li-jia-nan)
- 💄 Image 组件预览交互优化. [#39812](https://github.com/ant-design/ant-design/pull/39812) [@JarvisArt](https://github.com/JarvisArt)
- 💄 修复 Table 筛选菜单选中背景色和菜单阴影样式。[#39805](https://github.com/ant-design/ant-design/pull/39805)
- TypeScript
  - 🤖 修复部分 Design Token 缺少类型提示的问题。[#39754](https://github.com/ant-design/ant-design/pull/39754)

## 5.1.0

`2022-12-20`

- 🔥 新增 App 包裹组件，提供重置样式和提供消费上下文的默认环境。[#39046](https://github.com/ant-design/ant-design/pull/39046)
- 🔥 新增 QRCode 二维码组件。[#38948](https://github.com/ant-design/ant-design/pull/38948)
- 🔥 新增 Watermark 水印组件。[#39064](https://github.com/ant-design/ant-design/pull/39064) [@JarvisArt](https://github.com/JarvisArt)
- 🆕 Mentions 新增 `options` 配置。[#38630](https://github.com/ant-design/ant-design/pull/38630) [@heiyu4585](https://github.com/heiyu4585)
- 🆕 FloatButton 新增支持点击外侧自动关闭功能。[#39501](https://github.com/ant-design/ant-design/pull/39501) [@BoyYangzai](https://github.com/BoyYangzai)
- 🆕 Popconfirm 组件新增 `description` 属性。[#39250](https://github.com/ant-design/ant-design/pull/39250) [@xhh0223](https://github.com/xhh0223)
- 🆕 Modal.confirm 新增 `footer` 属性以自定义按钮列表。[#39048](https://github.com/ant-design/ant-design/pull/39048) [@owjs3901](https://github.com/owjs3901)
- 🆕 Table 新增 `rowScope` 以设置列范围。[#39571](https://github.com/ant-design/ant-design/pull/39571)
- 🆕 Anchor 新增 `items` 数据化配置选项内容，支持通过 children 嵌套。[#39034](https://github.com/ant-design/ant-design/pull/39034) [@foryuki](https://github.com/foryuki)
- 🆕 Grid 组件的响应式断点现在会消费主题 token 配置。[#39105](https://github.com/ant-design/ant-design/pull/39105) [@azro352](https://github.com/azro352)
- 🆕 Tour 的 prevButtonProps nextButtonProps 新增 `style` 和 `classname` 设置。[#38939](https://github.com/ant-design/ant-design/pull/38939) [@ONLY-yours](https://github.com/ONLY-yours)
- 🆕 ConfigProvider 支持配置 `select.showSearch`。[#39531](https://github.com/ant-design/ant-design/pull/39531) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 修复 Tabs `inkBar` 在 StrictMode 下不展示的问题。[#39653](https://github.com/ant-design/ant-design/pull/39653)
- 🐞 修复 Badge 组件宽度不受父元素影响。[#39605](https://github.com/ant-design/ant-design/pull/39605) [@AydenGen](https://github.com/AydenGen)
- Select
  - 🐞 修复 Select 组件 icon 颜色使用的 token。[#39644](https://github.com/ant-design/ant-design/pull/39644)
  - 💄 优化 Select 无障碍体验，当 `virtual=false` 时，将会绑定无障碍访问到实际选项元素上。[#39550](https://github.com/ant-design/ant-design/pull/39550)
- 🐞 修复 Tour steps 设置 `type="primary"` 无效的问题。[#39382](https://github.com/ant-design/ant-design/pull/39382) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 修复带有 `href` 的 Button 组件 `disabled` 时 style 不生效的问题。[#39456](https://github.com/ant-design/ant-design/pull/39456) [@BoyYangzai](https://github.com/BoyYangzai)
- 🐞 修复 Segmented 组件 icon 与文字间距消失的问题。[#39575](https://github.com/ant-design/ant-design/pull/39575)
- 🐞 修复 Drawer 组件关于 `DefaultProps` 的警告。[#39562](https://github.com/ant-design/ant-design/pull/39562)
- Menu
  - 🐞 修复 React18 中使用 `createRoot` 渲染 Menu.Submenu 会闪烁的问题。[#38855](https://github.com/ant-design/ant-design/pull/38855) [@JarvisArt](https://github.com/JarvisArt)
  - 🛠 重构 MenuItem 为 Function Component。[#38751](https://github.com/ant-design/ant-design/pull/38751)
  - 💄 优化 Menu 组件选中样式。[#39439](https://github.com/ant-design/ant-design/pull/39439)
- 🛠 LocaleProvider 在 4.x 中已经废弃（使用 `<ConfigProvider locale />` 替代），我们在 5.x 里彻底移除了相关目录 antd/es/locale-provider、antd/lib/locale-provider。[#39373](https://github.com/ant-design/ant-design/pull/39373)
- 🛠 简化 lodash 方法引用。[#39599](https://github.com/ant-design/ant-design/pull/39599) [#39602](https://github.com/ant-design/ant-design/pull/39602)
- TypeScript
  - 🤖 优化 Button DropDown Modal Popconfirm Select Transfer 鼠标事件类型定义。[#39533](https://github.com/ant-design/ant-design/pull/39533)
  - 🤖 新增导出类型 `FloatButtonGroupProps`。[#39553](https://github.com/ant-design/ant-design/pull/39553)
- 🌐 国际化
  - 🇧🇪 补全 `fr_BE` 文案。[#39415](https://github.com/ant-design/ant-design/pull/39415) [@azro352](https://github.com/azro352)
  - 🇨🇦 补全 `fr_CA` 文案。[#39416](https://github.com/ant-design/ant-design/pull/39416) [@azro352](https://github.com/azro352)
  - 🇪🇸 补全 `eu_ES` 文案。[#39371](https://github.com/ant-design/ant-design/pull/39371) [@Ian-Inizias](https://github.com/Ian-Inizias)

## 5.0.7

`2022-12-13`

- 🐞 修复 Slider 组件 Tooltip 动画丢失问题。[#39463](https://github.com/ant-design/ant-design/pull/39463) [@YinDongFang](https://github.com/YinDongFang)
- 🐞 修复 Table 组件有边框且为空时出现横向滚动条的问题。[#39455](https://github.com/ant-design/ant-design/pull/39455) [@zjfresh](https://github.com/zjfresh)
- 🐞 修复 Popover 组件箭头背景色不随自定义颜色改变的问题。[#39517](https://github.com/ant-design/ant-design/pull/39517)
- 🐞 修复 Modal hooks 没有完全传递 ConfigProvider 配置的问题。[#39513](https://github.com/ant-design/ant-design/pull/39513)
- 🐞 修复 Radio 组件尺寸修改后不对齐的问题。[#39476](https://github.com/ant-design/ant-design/pull/39476)

## 5.0.6

`2022-12-12`

- 🐞 修复 FloatButton 的 `toolip` 属性不支持设置为 `0` 的问题。[#39425](https://github.com/ant-design/ant-design/pull/39425) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Space 组件包裹的 Select 系列组件在 hover 时清除图标不展示的问题。[#39468](https://github.com/ant-design/ant-design/pull/39468) [@foryuki](https://github.com/foryuki)
- 💄 修复 Cascader 内部 ul 的 margin 值异常的问题。[#39436](https://github.com/ant-design/ant-design/pull/39436) [@ZN1996](https://github.com/ZN1996)
- 💄 修复 Input 组件在紧凑模式下内边距异常的问题。[#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 优化 Message 组件在紧凑模式下的内边距。[#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 修复 Radio.Button 组件在暗色模式下的文字颜色。[#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 修复 Select 组件在紧凑模式下内边距异常的问题。[#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 修复 Slider 组件标签原点样式问题。[#39428](https://github.com/ant-design/ant-design/pull/39428)
- 💄 优化 Switch 组件暗色模式下的颜色。[#39428](https://github.com/ant-design/ant-design/pull/39428)

## 5.0.5

`2022-12-08`

- 🐞 修复 Space.Compact 下 Button hover 样式问题。[#39157](https://github.com/ant-design/ant-design/pull/39157) [@foryuki](https://github.com/foryuki)
- 🐞 修复 Tabs 在 windows Chrome 下高亮条有时候会丢失的问题。[#39352](https://github.com/ant-design/ant-design/pull/39352) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 修复 Divider `horizontal` 在 flex 布局下的对齐问题。[#39339](https://github.com/ant-design/ant-design/pull/39339)
- 🐞 修复 Popover 在 rtl 模式下宽度异常的问题。[#39311](https://github.com/ant-design/ant-design/pull/39311)
- 🐞 修复 Popconfirm 组件 token 配置线框化后边框坍缩的样式问题。[#39313](https://github.com/ant-design/ant-design/pull/39313)
- 💄 修复 Select 组件搜索框会出现空白区域的样式问题。[#39299](https://github.com/ant-design/ant-design/pull/39299)
- 💄 修复 Tree 丢失选中样式的问题。[#39292](https://github.com/ant-design/ant-design/pull/39292)
- 🐞 修复 FloatButton 自定义尺寸时，内容不居中的问题。[#39282](https://github.com/ant-design/ant-design/pull/39282) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 RangePicker 日期 hover 样式。[#39266](https://github.com/ant-design/ant-design/pull/39266)
- 💄 优化 Button 在 Space.Compact 下的 Hover 样式。[#39241](https://github.com/ant-design/ant-design/pull/39241) [@foryuki](https://github.com/foryuki)
- 🌐 修正 `vi_VN` 国际化描述。[#39279](https://github.com/ant-design/ant-design/pull/39279) [@nghiepdev](https://github.com/nghiepdev)
- 🌐 修正 `he_IL` 国际化描述。[#39280](https://github.com/ant-design/ant-design/pull/39280) [@Ran-Sagy](https://github.com/Ran-Sagy)
- TypeScript
  - 🤖 优化 Anchor `onClick` 的事件类型定义。[#39305](https://github.com/ant-design/ant-design/pull/39305) [@li-jia-nan](https://github.com/li-jia-nan)

## 5.0.4

`2022-12-05`

- Modal
  - 🐞 修复 Modal 文字内容过多会超出框体的样式问题。[#39249](https://github.com/ant-design/ant-design/pull/39249) [@MuxinFeng](https://github.com/MuxinFeng)
  - 🐞 修复 Modal.info 没有图标时，内容宽度不正确的问题。[#39047](https://github.com/ant-design/ant-design/pull/39047) [@owjs3901](https://github.com/owjs3901)
- 🐞 修复 Tree `checkable` 与 `blockNode` 配合时，`title` 元素不拉伸的问题。[#39209](https://github.com/ant-design/ant-design/pull/39209) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Dropdown 二级菜单丢失动画的问题。[#39235](https://github.com/ant-design/ant-design/pull/39235)
- 💄 修复 RangePicker 内时间面板的 padding 样式。[#39228](https://github.com/ant-design/ant-design/pull/39228)
- 🐞 修复 Card 的按钮组圆角样式。[#39210](https://github.com/ant-design/ant-design/pull/39210) [@muxin](https://github.com/muxin)
- 🐞 修复了 Badge 自定义颜色的时候，波纹的颜色不会跟着小圆点颜色发生变化的问题。[#39182](https://github.com/ant-design/ant-design/pull/39182) [@li-jia-nan](https://github.com/li-jia-nan)
- 🐞 修复 Radio 禁用状态选中样式。[#39165](https://github.com/ant-design/ant-design/pull/39165) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 TextArea `resize` 不是 `none` 时计数文字的样式问题。[#39121](https://github.com/ant-design/ant-design/pull/39121) [@51wangping](https://github.com/51wangping)
- 🐞 修复 Transfer 组件 点击复选框位置不可以取消选中，并触发了两次 onSelectChange 问题。[#39078](https://github.com/ant-design/ant-design/pull/39078) [@edc-hui](https://github.com/edc-hui)
- 🐞 修复 Steps `size="small"` 第一项带有进度时，进度条显示不全的问题。[#39100](https://github.com/ant-design/ant-design/pull/39100) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Form 水平布局下 `xs` 的响应式布局不生效的问题。[#39130](https://github.com/ant-design/ant-design/pull/39130)
- 🐞 修复 message 在 RTL 下位置不正确的问题。[#39248](https://github.com/ant-design/ant-design/pull/39248) [@Yuiai01](https://github.com/Yuiai01)
- 🐞 修复 Switch 在只设置 `checkedChildren` 或 `unCheckedChildren` 时，其内容不会显示的问题。[#39262](https://github.com/ant-design/ant-design/pull/39262)

## 5.0.3

`2022-11-30`

- 🐞 修复 Spin 包裹模式时的样式偏移问题。[#38923](https://github.com/ant-design/ant-design/pull/38923) [@sribich](https://github.com/sribich)
- Menu
  - 🐞 修复 Menu 溢出时下拉菜单的样式问题。[#39093](https://github.com/ant-design/ant-design/pull/39093)
  - 🐞 修复 hover 在 Menu.Item 外面时颜色变蓝的问题。[#39077](https://github.com/ant-design/ant-design/pull/39077) [@Pulset](https://github.com/Pulset)
- 🐞 修复 Input.TextArea 没有重置样式导致 resize 行为和 4.x 不一致的问题。[aa92f02](https://github.com/ant-design/ant-design/commit/aa92f02)
- 🐞 修复 Upload 默认图标颜色。[#39114](https://github.com/ant-design/ant-design/pull/39114) [@MARKX97](https://github.com/MARKX97)
- 🐞 修复 dev 下动态 hashId 导致的 ssr 注水失败的问题。[#39069](https://github.com/ant-design/ant-design/pull/39069)
- 🐞 修复 FloatButton.Group 关闭时闪烁的问题。[#39061](https://github.com/ant-design/ant-design/pull/39061)
- 🐞 修复 Card.Meta 宽度没有默认填满容器的问题。[#39026](https://github.com/ant-design/ant-design/pull/39026) [@justanotheranonymoususer](https://github.com/justanotheranonymoususer)

## 5.0.2

`2022-11-27`

- 💄 修复 Card 组件设置 `bodyStyle` 的背景颜色后圆角失效的问题。[#38973](https://github.com/ant-design/ant-design/pull/38973) [@Yukiniro](https://github.com/Yukiniro)
- 💄 优化错误色的默认算法。[#38933](https://github.com/ant-design/ant-design/pull/38933)
- 💄 修复 RTL 模式下的样式问题。[#38829](https://github.com/ant-design/ant-design/pull/38829) [@Wxh16144](https://github.com/Wxh16144)
- Space.Compact
  - 💄 Space.Compact 包裹单个子组件时，展示该子组件本身的样式。[#38896](https://github.com/ant-design/ant-design/pull/38896) [@foryuki](https://github.com/foryuki)
  - 💄 修复 Space.Compact 组件嵌套 Modal，Dropdown，Drawer 等组件时的样式问题。[#38870](https://github.com/ant-design/ant-design/pull/38870) [@foryuki](https://github.com/foryuki)
- 🐞 修复横向 Menu 组件有溢出时宽度问题。[#38989](https://github.com/ant-design/ant-design/pull/38989)
- 🐞 修复 Table 组件过滤列被移除后过滤效果仍然影响列表数据的问题。[#38982](https://github.com/ant-design/ant-design/pull/38982)
- 🐞 修复 Select 和 Pagination 在暗色主题下文字颜色不正确。[#38979](https://github.com/ant-design/ant-design/pull/38979) [@Dunqing](https://github.com/Dunqing)
- 🐞 修复 Mentions `options` 不生效的问题。[#38968](https://github.com/ant-design/ant-design/pull/38968) [@heiyu4585](https://github.com/heiyu4585)
- 🐞 修复 `reset.css` 不会被打包的问题。[#38956](https://github.com/ant-design/ant-design/pull/38956) [@passerV](https://github.com/passerV)
- 🐞 修复 Badge 组件 `showZero` 和 `color` 不能一起使用问题。[#38967](https://github.com/ant-design/ant-design/pull/38967) [@Wxh16144](https://github.com/Wxh16144)
- 🐞 修复 Form 校验信息动效卡顿的问题。[#38962](https://github.com/ant-design/ant-design/pull/38962)
- 🐞 修复 Tabs 下拉菜单动画消失的问题。[#38892](https://github.com/ant-design/ant-design/pull/38892)
- 🐞 修复 ConfigProvider `componentDisabled` 失效问题。[#38886](https://github.com/ant-design/ant-design/pull/38886) [@lidianhao123](https://github.com/lidianhao123)
- 🐞 修复 Button `block` 属性有时不生效的问题。[#38869](https://github.com/ant-design/ant-design/pull/38869) [@jjlstruggle](https://github.com/jjlstruggle)
- 🐞 修复 Dropdown.Button 的 `dropdownRender` 未执行的问题。[#38862](https://github.com/ant-design/ant-design/pull/38862) [@imoctopus](https://github.com/imoctopus)

## 5.0.1

`2022-11-22`

- 💄 优化 Empty 组件的 svg 图片在暗色主题下的颜色。[#38785](https://github.com/ant-design/ant-design/pull/38785)
- 💄 修复 Form, Input, Select, Tree 转换到 CSS-in-JS 丢失少量样式的问题。[#38742](https://github.com/ant-design/ant-design/pull/38742)
- 💄 修复 Firefox 下拉菜单动画抖动的问题。[#38729](https://github.com/ant-design/ant-design/pull/38729)
- Menu
  - 🐞 修复 Menu SubMenu 间距问题。[#38714](https://github.com/ant-design/ant-design/pull/38714) [@JarvisArt](https://github.com/JarvisArt)
  - 🐞 修复 Menu 暗色主题下高度多了 1px 的问题。[#38741](https://github.com/ant-design/ant-design/pull/38741) [@LuciNyan](https://github.com/LuciNyan)
  - 🐞 修复 Menu 展开 Submenu 时抖动的问题。[#38748](https://github.com/ant-design/ant-design/pull/38748) [@JarvisArt](https://github.com/JarvisArt)
- 🐞 修复 Table 组件展开 icon 不对齐的问题。[#38823](https://github.com/ant-design/ant-design/pull/38823) [@turdiyev](https://github.com/turdiyev)
- 🐞 修复 FloatButton.BackTop 组件动画丢失的问题。[#38770](https://github.com/ant-design/ant-design/pull/38770) [@li-jia-nan](https://github.com/li-jia-nan)
- 🛠 清除残留 `Moment.js` 依赖。[#38762](https://github.com/ant-design/ant-design/pull/38762)
- 🛠 修复外部暴露类 `CompoundedComponent` 的组件的类型报错。[#38666](https://github.com/ant-design/ant-design/pull/38666) [@wangcch](https://github.com/wangcch)
- 🛠 重新添加 `lib` 产物。[#38832](https://github.com/ant-design/ant-design/pull/38832) [@chunsch](https://github.com/chunsch)

## 5.0.0

`2022-11-18`

🏆 Ant Design 5.0.0 已发布！欢迎阅读我们的 [发布文档](https://www.yuque.com/ant-design/ant-design/cy5nfvdo8oidvwmz)。

#### 升级必读

🌟 如果你想升级到 Ant Design 5.0，请仔细查阅我们的[迁移文档](/docs/react/migration-v5-cn)。

#### 主要变化

- 🔥 新增组件
  - 🔥 FloatButton 悬浮按钮，原 BackTop 移至 FloatButton 子组件。[#37520](https://github.com/ant-design/ant-design/pull/37520) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Tour 漫游式引导。[#37867](https://github.com/ant-design/ant-design/pull/37867) [#38469](https://github.com/ant-design/ant-design/pull/38469) [@heiyu4585](https://github.com/heiyu4585)
- 🔥 新增组件变体
  - 🔥 DatePicker 新增 `presets` 属性用于预设时间范围快捷选择。[#38249](https://github.com/ant-design/ant-design/pull/38249)
  - 🔥 Progress `circle` 类型支持小尺寸自适应。[#38231](https://github.com/ant-design/ant-design/pull/38231) [@li-jia-nan](https://github.com/li-jia-nan)
  - 🔥 Steps 新增 `inline` 类型。[#38311](https://github.com/ant-design/ant-design/pull/38311) [@JarvisArt](https://github.com/JarvisArt)
- 💄 设计变化
  - 💄 调整主色为 `#1677ff`。[#37254](https://github.com/ant-design/ant-design/pull/37254)
  - 💄 基础圆角调整为 `6px`，并支持梯度圆角。[#37146](https://github.com/ant-design/ant-design/pull/37146) [#37369](https://github.com/ant-design/ant-design/pull/37369)
  - 💄 优化组件整体动画速度，效果更简练。[#37438](https://github.com/ant-design/ant-design/pull/37438)
  - 💄 对部分组件进行了去线框化和间距上的调整，整体风格更加简洁。[#37283](https://github.com/ant-design/ant-design/pull/37283)
    - 💄 Pagination 组件去线框化。[#37441](https://github.com/ant-design/ant-design/pull/37441)
    - 💄 优化 Timeline 组件 UI 设计。[#37465](https://github.com/ant-design/ant-design/pull/37465)
    - 💄 优化 Steps 组件 UI 设计。[#37473](https://github.com/ant-design/ant-design/pull/37473)
  - 💄 优化部分组件 focus 样式。[#37483](https://github.com/ant-design/ant-design/pull/37483)
  - 💄 优化组件圆角较大时的部分样式。
    - 💄 优化 Table 组件 hover 样式。[#37370](https://github.com/ant-design/ant-design/pull/37370)
    - 💄 优化 Segmented 组件 hover 样式。[#37498](https://github.com/ant-design/ant-design/pull/37498)
    - 💄 优化 Dropdown 组件 hover 样式。[#37491](https://github.com/ant-design/ant-design/pull/37491)
    - 💄 优化 Modal 等组件关闭按钮样式。[#37634](https://github.com/ant-design/ant-design/pull/37634)
    - 💄 优化 Menu 组件样式。[#38009](https://github.com/ant-design/ant-design/pull/38009)
    - 💄 更多组件 hover 样式优化。[#37433](https://github.com/ant-design/ant-design/pull/37433)
  - 💄 优化 Switch 组件动画效果。[#37658](https://github.com/ant-design/ant-design/pull/37658)
  - 💄 优化 Anchor 组件样式 UI 设计。[#38616](https://github.com/ant-design/ant-design/pull/38616)
- 🆕 新增导出对象 `theme`，用于获取主题相关属性。[#36302](https://github.com/ant-design/ant-design/pull/36302)
  - 🆕 新增 `theme.useToken` hook，用于获取当前上下文的主题变量。[#36267](https://github.com/ant-design/ant-design/pull/36267)
  - 🆕 新增内置算法。
    - 🆕 默认算法 `theme.defaultAlgorithm`。[#36175](https://github.com/ant-design/ant-design/pull/36175)
    - 🆕 暗色算法 `theme.darkAlgorithm`。[#36546](https://github.com/ant-design/ant-design/pull/36546) [#36656](https://github.com/ant-design/ant-design/pull/36656)
    - 🆕 紧凑算法 `theme.compactAlgorithm`。[#38105](https://github.com/ant-design/ant-design/pull/38105)
- 🆕 ConfigProvider 新增 `theme` 属性，用于更改主题配置，详情：[定制主题](https://ant.design/docs/react/customize-theme-cn)。
  - 🆕 支持多个 `algorithm`。[#37082](https://github.com/ant-design/ant-design/pull/37082)
  - 🆕 支持线框化切换。[#37507](https://github.com/ant-design/ant-design/pull/37507)
  - 🆕 支持覆盖单个组件的主题变量。[#37568](https://github.com/ant-design/ant-design/pull/37568)
- 🆕 产物新增 `locale` 目录，内含 cjs 格式的语言文件。[#38194](https://github.com/ant-design/ant-design/pull/38194) [@chunsch](https://github.com/chunsch)
- 🗑 移除对 IE 的支持。
- 🗑 移除 `lib` 产物。[#36362](https://github.com/ant-design/ant-design/pull/36362)
  - 🛠 调整 `package.json` 中 `main` 为 `dist/antd.js`。[eb8835f](https://github.com/ant-design/ant-design/commit/eb8835fe29b39767c0f5e310f5c69619a75d5840)
- 🗑 移除 `dist/antd.css` 产物。默认不再入侵全局样式，新增 `dist/reset.css` 用于重置部分常见样式。[#36224](https://github.com/ant-design/ant-design/pull/36224)
- 🗑 废弃下列组件的 `visible` 属性，改用 `open`。[@yykoypj](https://github.com/yykoypj)
  - 🗑 Tag 废弃 `visible` 属性。[#36671](https://github.com/ant-design/ant-design/pull/36671)
  - 🗑 Table `filterDropdownVisible` 调整为 `filterDropdownOpen`。[#36747](https://github.com/ant-design/ant-design/pull/36747)
  - 🗑 Drawer 废弃 `visible` 属性，改用 `open`。[#36750](https://github.com/ant-design/ant-design/pull/36750)
  - 🗑 Modal 废弃 `visible` 属性，改用 `open`。[#36774](https://github.com/ant-design/ant-design/pull/36774)
  - 🗑 Dropdown 废弃 `visible` 属性，改用 `open`。[#36799](https://github.com/ant-design/ant-design/pull/36799)
  - 🗑 Tooltip & Popover & Popconfirm 废弃 `visible` 属性，改用 `open`。[#36807](https://github.com/ant-design/ant-design/pull/36807)
- 🗑 废弃下列组件的 `dropdownClassName`，统一为 `popupClassName`。[@heiyu4585](https://github.com/heiyu4585)
  - 🗑 AutoComplete 废弃 `dropdownClassName`，改用 `popupClassName`。[#37087](https://github.com/ant-design/ant-design/pull/37087)
  - 🗑 Mentions 废弃 `dropdownClassName`，改用 `popupClassName`。[#37122](https://github.com/ant-design/ant-design/pull/37122)
  - 🗑 Cascader 废弃 `dropdownClassName`，改用 `popupClassName`。[#37089](https://github.com/ant-design/ant-design/pull/37089)
  - 🗑 Select 废弃 `dropdownClassName`，改用 `popupClassName`。[#37091](https://github.com/ant-design/ant-design/pull/37091)
  - 🗑 TreeSelect 废弃 `dropdownClassName`，改用 `popupClassName`。[#37092](https://github.com/ant-design/ant-design/pull/37092)
  - 🗑 DatePicker 和 TimePicker 废弃 `dropdownClassName`，改用 `popupClassName`。[#37207](https://github.com/ant-design/ant-design/pull/37207)
- 🛠 所有组件使用 CSS-in-JS 重构样式。
  - 🗑 移除 less 及相关 less 和 css 产物。[#36244](https://github.com/ant-design/ant-design/pull/36244)
- 🛠 内置时间库由 Moment.js 替换为 Day.js，详情：[使用自定义日期库](https://ant.design/docs/react/use-custom-date-library-cn)。[b22815d](https://github.com/ant-design/ant-design/commit/b22815d4d223b80755b472e14d7888beab8dd1da) [@iamkun](https://github.com/iamkun)
- 🛠 重构 Notification 以支持 React 18 concurrent 模式，并重构 useNotification hook，推荐替代静态方法使用。[#35423](https://github.com/ant-design/ant-design/pull/35423) [#35568](https://github.com/ant-design/ant-design/pull/35568)
- 🛠 Slider 组件 Tooltip 相关 API 合并至 `tooltip` 属性中。[#37043](https://github.com/ant-design/ant-design/pull/37043) [@yykoypj](https://github.com/yykoypj)
- 🛠 文档站技术栈迁移 [dumi@2](https://next.d.umijs.org/)。[#38328](https://github.com/ant-design/ant-design/pull/38328)

## 4.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/4.x-stable/CHANGELOG.zh-CN.md) 查看 `4.x` 的 Change Log。

## 3.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/3.x-stable/CHANGELOG.zh-CN.md) 查看 `3.x` 的 Change Log。

## 2.x

去 [GitHub](https://github.com/ant-design/ant-design/blob/2.x-stable/CHANGELOG.zh-CN.md) 查看 `2.x` 的 Change Log。

## 1.11.4

去 [GitHub](https://github.com/ant-design/ant-design/blob/1.x-stable/CHANGELOG.md) 查看 `0.x` 到 `1.x` 的 Change Log。
