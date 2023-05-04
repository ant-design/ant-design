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

<!-- ### Drawer 抽屉 -->

<!-- ### Dropdown 下拉菜单 -->

<!-- ### Empty 空状态 -->

<!-- ### Form 表单 -->

<!-- ### Image 图片 -->

<!-- ### Input 输入框 -->

<!-- ### Layout 布局 -->

<!-- ### List 列表 -->

<!-- ### Mentions 提及 -->

<!-- ### Menu 导航菜单 -->

## Message 全局提示

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@zindex-message` | `zIndexPopup` | - |
| `@message-notice-content-padding` | `messageNoticeContentPadding` | - |
| `@message-notice-content-bg` | `messageNoticeContentBg` | - |

### Modal 对话框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@modal-header-padding-vertical` | - | 由于样式变化已废弃 |
| `@modal-header-padding-horizontal` | - | 由于样式变化已废弃 |
| `@modal-body-padding` | - | 由于样式变化已废弃 |
| `@modal-header-bg` | `modalHeaderBg` | - |
| `@modal-header-padding` | - | 由于样式变化已废弃 |
| `@modal-header-border-width` | - | 由于样式变化已废弃 |
| `@modal-header-border-style` | - | 由于样式变化已废弃 |
| `@modal-header-title-line-height` | `modalHeaderTitleLineHeight` | - |
| `@modal-header-title-font-size` | `modalHeaderTitleFontSize` | - |
| `@modal-header-border-color-split` | - | 由于样式变化已废弃 |
| `@modal-header-close-size` | - | 由于样式变化已废弃 |
| `@modal-content-bg` | `modalContentBg` | - |
| `@modal-heading-color` | `modalHeadingColor` | - |
| `@modal-close-color` | `modalCloseIconColor` | - |
| `@modal-footer-bg` | `modalFooterBg` | - |
| `@modal-footer-border-color-split` | - | 由于样式变化已废弃 |
| `@modal-footer-border-style` | - | 由于样式变化已废弃 |
| `@modal-footer-padding-vertical` | - | 由于样式变化已废弃 |
| `@modal-footer-padding-horizontal` | - | 由于样式变化已废弃 |
| `@modal-footer-border-width` | - | 由于样式变化已废弃 |
| `@modal-mask-bg` | `colorBgMask` | - |
| `@modal-confirm-body-padding` | - | 由于样式变化已废弃 |
| `@modal-confirm-title-font-size` | `modalHeaderTitleFontSize` | - |
| `@modal-border-radius` | `borderRadiusLG` | - |

## Notification 通知提醒框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@notification-width` | `width` | - |
| `@notification-padding` | `notificationPadding` | - |
| `@notification-padding-vertical` | `notificationPaddingVertical` | - |
| `@notification-padding-horizontal` | `notificationPaddingHorizontal` | - |
| `@notification-margin-bottom` | `notificationMarginBottom` | - |
| `@notification-margin-edge` | `notificationMarginEdge` | - |
| `@notification-bg` | `notificationBg` | - |

<!-- ### Pagination 分页 -->

<!-- ### Popover 气泡卡片 -->

<!-- ### Progress 进度条 -->

<!-- ### Radio 单选框 -->

<!-- ### Rate 评分 -->

<!-- ### Result 结果 -->

<!-- ### Segment 分段器 -->

<!-- ### Select 选择器 -->

<!-- ### Skeleton 骨架屏 -->

<!-- ### Slider 滑动输入条 -->

<!-- ### Statistic 统计数值 -->

### Step 步骤条

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@process-tail-color` | `processTailColor` | - |
| `@steps-nav-arrow-color` | `stepsNavArrowColor` | - |
| `@steps-background` | - | 由于样式变化已废弃 |
| `@steps-icon-size` | `stepsIconSize` | - |
| `@steps-icon-custom-size` | `stepsIconCustomSize` | - |
| `@steps-icon-custom-top` | `stepsIconCustomTop` | - |
| `@steps-icon-custom-font-size` | `stepsIconCustomFontSize` | - |
| `@steps-icon-top` | `stepsIconTop` | - |
| `@steps-icon-font-size` | `stepsIconFontSize` | - |
| `@steps-icon-margin` | - | 由于样式变化已废弃 |
| `@steps-title-line-height` | `stepsTitleLineHeight` | - |
| `@steps-small-icon-size` | `stepsSmallIconSize` | - |
| `@steps-small-icon-margin` | - | 由于样式变化已废弃 |
| `@steps-dot-size` | `stepsDotSize` | - |
| `@steps-dot-top` | - | 由于样式变化已废弃 |
| `@steps-current-dot-size` | `stepsCurrentDotSize` | - |
| `@steps-description-max-width` | `stepsNavContentMaxWidth` | - |
| `@steps-nav-content-max-width` | - | 由于样式变化已废弃 |
| `@steps-vertical-icon-width` | - | 由于样式变化已废弃 |
| `@steps-vertical-tail-width` | - | 由于样式变化已废弃 |
| `@steps-vertical-tail-width-sm` | - | 由于样式变化已废弃 |

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
