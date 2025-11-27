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

## 6.0.0

`2025-11-22`

🏆 Ant Design 6.0.0 已发布！

#### 升级必读

🌟 如果你想升级到 Ant Design 6.0，请仔细查阅我们的[迁移文档](/docs/react/migration-v6-cn)。

#### 主要变化

- 🔥 组件语义化结构。
  <details>
    <summary>🔥 antd 组件支持语义化结构以及 ConfigProvider 配置，由 <a href="https://github.com/thinkasany" target="_blank">@thinkasany</a> 主导。</summary>

    - feat: ConfigProvider support classNames and styles for Result [#52171](https://github.com/ant-design/ant-design/pull/52171)
    - feat: ConfigProvider support `classNames` and `styles` for Statistic [#52141](https://github.com/ant-design/ant-design/pull/52141)
    - feat: ConfigProvider support Collapse semantic props `classNames` and `styles` [#52258](https://github.com/ant-design/ant-design/pull/52258)
    - feat: ConfigProvider support Badge.Ribbon [#52303](https://github.com/ant-design/ant-design/pull/52303)
    - feat: ConfigProvider support classnames and styles for segmented [#52376](https://github.com/ant-design/ant-design/pull/52376)
    - feat: ConfigProvider support `classNames` and `styles` for Modal [#52340](https://github.com/ant-design/ant-design/pull/52340)
    - feat: ConfigProvider support classnames and styles for Alert [#52669](https://github.com/ant-design/ant-design/pull/52669)
    - feat: Enhance Skeleton components with classNames and styles support [#52470](https://github.com/ant-design/ant-design/pull/52470) [@coding-ice](https://github.com/coding-ice)
    - feat: ConfigProvider support classnames and styles for notification [#52759](https://github.com/ant-design/ant-design/pull/52759)
    - feat: ConfigProvider support classnames and styles for tag [#52764](https://github.com/ant-design/ant-design/pull/52764)
    - feat: ConfigProvider support classname and style for affix [#52745](https://github.com/ant-design/ant-design/pull/52745)
    - feat: ConfigProvider support classnames and styles for checkbox [#52781](https://github.com/ant-design/ant-design/pull/52781)
    - feat: ConfigProvider support classNames and styles for radio [#52780](https://github.com/ant-design/ant-design/pull/52780)
    - feat: ConfigProvider support classnames and styles for message [#52793](https://github.com/ant-design/ant-design/pull/52793)
    - feat: ConfigProvider support classname and style for watermark [#52811](https://github.com/ant-design/ant-design/pull/52811)
    - feat: ConfigProvider support classNames and styles for Spin [#52823](https://github.com/ant-design/ant-design/pull/52823)
    - feat: ConfigProvider support classnames and styles for switch [#52849](https://github.com/ant-design/ant-design/pull/52849)
    - feat: ConfigProvider support classnames and styles for breadcrumb [#52859](https://github.com/ant-design/ant-design/pull/52859)
    - feat: ConfigProvider support classnames and styles for anchor [#52866](https://github.com/ant-design/ant-design/pull/52866)
    - feat: ConfigProvider support classnames and styles for pagination [#52893](https://github.com/ant-design/ant-design/pull/52893)
    - feat: ConfigProvider support classnames and styles for tabs [#52895](https://github.com/ant-design/ant-design/pull/52895)
    - feat: ConfigProvider support classnames and styles for timeline [#52976](https://github.com/ant-design/ant-design/pull/52976)
    - feat: ConfigProvider support classnames and styles for mentions [#52961](https://github.com/ant-design/ant-design/pull/52961)
    - feat: ConfigProvider support classnames and styles for upload [#52972](https://github.com/ant-design/ant-design/pull/52972)
    - feat: ConfigProvider support Tour [#52250](https://github.com/ant-design/ant-design/pull/52250)
    - feat: ConfigProvider support classNames and styles for button [#53055](https://github.com/ant-design/ant-design/pull/53055)
    - feat: ConfigProvider support classnames and styles for select [#52948](https://github.com/ant-design/ant-design/pull/52948)
    - feat: ConfigProvider support classNames and styles for image [#53028](https://github.com/ant-design/ant-design/pull/53028)
    - feat: ConfigProvider support classNames and styles for tree [#53174](https://github.com/ant-design/ant-design/pull/53174)
    - feat: ConfigProvider support classNames and styles for autoComplete [#53150](https://github.com/ant-design/ant-design/pull/53150)
    - feat: Splitter support classNames and styles [#53225](https://github.com/ant-design/ant-design/pull/53225) [@wanpan11](https://github.com/wanpan11)
    - feat: ConfigProvider support classNames and styles for form [#53226](https://github.com/ant-design/ant-design/pull/53226)
    - feat: ConfigProvider support classNames and styles for calendar [#53159](https://github.com/ant-design/ant-design/pull/53159)
    - feat: ConfigProvider support classNames and styles for treeSelect [#53229](https://github.com/ant-design/ant-design/pull/53229)
    - feat: ConfigProvider support classNames and styles for colorPicker [#53303](https://github.com/ant-design/ant-design/pull/53303)
    - feat: ConfigProvider support classNames and styles for Transfer [#53429](https://github.com/ant-design/ant-design/pull/53429) [@zombieJ](https://github.com/zombieJ)
    - feat: ConfigProvider support qrcode [#52172](https://github.com/ant-design/ant-design/pull/52172)
    - feat: ConfigProvider support classNames and styles for Progress [#53535](https://github.com/ant-design/ant-design/pull/53535) [@zombieJ](https://github.com/zombieJ)
    - feat: ConfigProvider support classNames and styles for TimePicker / DatePicker [#53489](https://github.com/ant-design/ant-design/pull/53489)
    - feat: ConfigProvider support classNames and styles for menu [#53324](https://github.com/ant-design/ant-design/pull/53324)
    - feat: ConfigProvider support classNames and styles for dropdown [#53272](https://github.com/ant-design/ant-design/pull/53272)
    - feat: ConfigProvider support classNames and styles for Cascader [#53694](https://github.com/ant-design/ant-design/pull/53694)
    - feat: ConfigProvider support classNames and styles for inputNumber [#53698](https://github.com/ant-design/ant-design/pull/53698)
    - feat: ConfigProvider support classNames and styles for Steps [#53789](https://github.com/ant-design/ant-design/pull/53789) [@zombieJ](https://github.com/zombieJ)
    - feat: ConfigProvider support classNames and styles for table [#53659](https://github.com/ant-design/ant-design/pull/53659)
    - feat: ConfigProvider support classNames and styles for divider [#53890](https://github.com/ant-design/ant-design/pull/53890)
    - feat: input support semantic dom [#53958](https://github.com/ant-design/ant-design/pull/53958) [@aojunhao123](https://github.com/aojunhao123)
    - feat: FloatButton support semantic structure & ConfigProvider support passing related props [#54145](https://github.com/ant-design/ant-design/pull/54145) [@zombieJ](https://github.com/zombieJ)
    - refactor: Select like component support semantic structure [#55430](https://github.com/ant-design/ant-design/pull/55430) [@zombieJ](https://github.com/zombieJ)

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
