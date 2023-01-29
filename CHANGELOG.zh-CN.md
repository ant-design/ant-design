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
- 🐞 修复 Popconfirm 组件 token 配置线框化后边框坍缩的样式问题。[#39313](https://github.com/ant-design/ant-design/pull/39313) [@MadCcc](https://github.com/MadCcc)
- 💄 修复 Select 组件搜索框会出现空白区域的样式问题。[#39299](https://github.com/ant-design/ant-design/pull/39299) [@MadCcc](https://github.com/MadCcc)
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
