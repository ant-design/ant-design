---
order: 9
title: Less 变量迁移 Design Token
---

本文档包含了所有 4.x 版本中组件相关的 less 变量与 5.x 版本的 Component Token 的对照关系。如果你是从 4.x 版本升级到 5.x 版本，可以通过这份对照表快速找到对应的 Component Token。

<Alert message="注意：仍有部分变量没有对应的 Component Token，这些变量在 5.x 版本中已被废弃。"></Alert>

<!-- ## 全局变量 -->

## 组件变量

<!-- ### Alert 警告提示 -->

<!-- ### Anchor 锚点 -->

<!-- ### Avatar 头像 -->

<!-- ### Badge 徽标数 -->

<!-- ### BreadCrumb 面包屑 -->

<!-- ### Button 按钮 -->

<!-- ### Calendar 日历 -->

<!-- ### Card 卡片 -->

<!-- ### Carousel 走马灯 -->

<!-- ### Cascader 级联选择 -->

<!-- ### Checkbox 多选框 -->

<!-- ### Collapse 折叠面板 -->

<!-- ### Descriptions 描述列表 -->

<!-- ### Divider 分割线 -->

### Drawer 抽屉

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@drawer-bg` | `colorBgElevated` | 全局 Token |
| `@drawer-header-padding` | `padding`、`paddingLG` | 全局 Token，对应值为 `${padding}px ${paddingLG}px` |
| `@drawer-title-font-size` | `fontSizeLG` | 全局 Token |
| `@drawer-title-line-height` | `lineHeightLG` | 全局 Token |
| `@drawer-body-padding` | `paddingLG` | 全局 Token |
| `@drawer-footer-padding-vertical` | `footerPaddingBlock` | `footerPaddingBlock` 为数字，不带单位，`@drawer-footer-padding-vertical` 带单位 |
| `@drawer-footer-padding-horizontal` | `footerPaddingInline` | `footerPaddingInline` 为数字，不带单位，`@drawer-footer-padding-horizontal` 带单位 |

<!-- ### Dropdown 下拉菜单 -->

<!-- ### Empty 空状态 -->

<!-- ### Form 表单 -->

<!-- ### Image 图片 -->

<!-- ### Input 输入框 -->

<!-- ### Layout 布局 -->

<!-- ### List 列表 -->

<!-- ### Mentions 提及 -->

<!-- ### Menu 导航菜单 -->

### Message 全局提示

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@zindex-message` | `zIndexPopup` | - |
| `@message-notice-content-padding` | `contentPadding` | - |
| `@message-notice-content-bg` | `contentBg` | - |

### Modal 对话框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@modal-header-padding-vertical` | - | 由于样式变化已废弃 |
| `@modal-header-padding-horizontal` | - | 由于样式变化已废弃 |
| `@modal-body-padding` | - | 由于样式变化已废弃 |
| `@modal-header-bg` | `headerBg` | - |
| `@modal-header-padding` | - | 由于样式变化已废弃 |
| `@modal-header-border-width` | - | 由于样式变化已废弃 |
| `@modal-header-border-style` | - | 由于样式变化已废弃 |
| `@modal-header-title-line-height` | `titleLineHeight` | - |
| `@modal-header-title-font-size` | `titleFontSize` | - |
| `@modal-header-border-color-split` | - | 由于样式变化已废弃 |
| `@modal-header-close-size` | - | 由于样式变化已废弃 |
| `@modal-content-bg` | `contentBg` | - |
| `@modal-heading-color` | `titleColor` | - |
| `@modal-close-color` | `colorIcon` | 全局 Token |
| `@modal-footer-bg` | `footerBg` | - |
| `@modal-footer-border-color-split` | - | 由于样式变化已废弃 |
| `@modal-footer-border-style` | - | 由于样式变化已废弃 |
| `@modal-footer-padding-vertical` | - | 由于样式变化已废弃 |
| `@modal-footer-padding-horizontal` | - | 由于样式变化已废弃 |
| `@modal-footer-border-width` | - | 由于样式变化已废弃 |
| `@modal-mask-bg` | `colorBgMask` | 全局 Token |
| `@modal-confirm-body-padding` | - | 由于样式变化已废弃 |
| `@modal-confirm-title-font-size` | `titleFontSize` | - |
| `@modal-border-radius` | `borderRadiusLG` | 全局 Token |

<!-- ### Notification 通知提醒框 -->

<!-- ### Pagination 分页 -->

<!-- ### Popover 气泡卡片 -->

<!-- ### Progress 进度条 -->

<!-- ### Radio 单选框 -->

<!-- ### Rate 评分 -->

### Result 结果

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@result-icon-font-size` | `iconFontSize` | - |
| `@result-title-font-size` | `titleFontSize` | - |
| `@result-subtitle-font-size` | `subtitleFontSize` | - |
| `@result-extra-margin` | `extraMargin` | - |

<!-- ### Segment 分段器 -->

<!-- ### Select 选择器 -->

<!-- ### Skeleton 骨架屏 -->

<!-- ### Slider 滑动输入条 -->

### Statistic 统计数值

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@statistic-title-font-size` | `titleFontSize` | - |
| `@statistic-content-font-size` | `contentFontSize` | - |
| `@statistic-font-family` | `fontFamily` | 全局 Token |

### Step 步骤条

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@process-tail-color` | `colorSplit` | 全局 Token |
| `@steps-nav-arrow-color` | `navArrowColor` | - |
| `@steps-background` | `colorBgContainer` | - |
| `@steps-icon-size` | `iconSize` | - |
| `@steps-icon-custom-size` | `customIconSize` | - |
| `@steps-icon-custom-top` | `customIconTop` | - |
| `@steps-icon-custom-font-size` | `customIconFontSize` | - |
| `@steps-icon-top` | `iconTop` | - |
| `@steps-icon-font-size` | `iconFontSize` | - |
| `@steps-icon-margin` | - | 已废弃 |
| `@steps-title-line-height` | `titleLineHeight` | - |
| `@steps-small-icon-size` | `iconSizeSM` | - |
| `@steps-small-icon-margin` | - | 已废弃 |
| `@steps-dot-size` | `dotSize` | - |
| `@steps-dot-top` | - | 已废弃 |
| `@steps-current-dot-size` | `dotCurrentSize` | - |
| `@steps-description-max-width` | `descriptionMaxWidth` | - |
| `@steps-nav-content-max-width` | `stepsNavContentMaxWidth` | - |
| `@steps-vertical-icon-width` | `iconSize` | - |
| `@steps-vertical-tail-width` | - | 已废弃 |
| `@steps-vertical-tail-width-sm` | - | 已废弃 |

<!-- ### Switch 开关 -->

<!-- ### Table 表格 -->

<!-- ### Tabs 标签页 -->

<!-- ### Tag 标签 -->

<!-- ### Timeline 时间轴 -->

<!-- ### TimePicker 时间选择 -->

<!-- ### Tooltip 文字提示 -->

<!-- ### Transfer 穿梭框 -->

<!-- ### Tree 树形控件 -->

<!-- ### Typography 排版 -->

<!-- ### Upload 上传 -->
