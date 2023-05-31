---
order: 9
title: Less 变量迁移 Design Token
---

本文档包含了所有 4.x 版本中组件相关的 less 变量与 5.x 版本的 Component Token 的对照关系。如果你是从 4.x 版本升级到 5.x 版本，可以通过这份对照表快速找到对应的 Component Token。

<Alert message="注意：仍有部分变量没有对应的 Component Token，这些变量在 5.x 版本中已被废弃。"></Alert>

<!-- ## 全局变量 -->

## 组件变量

<!-- ### Alert 警告提示 -->

## Anchor 锚点

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@anchor-bg` | - | 可以由 `className` 或 `style` 直接修改 |
| `@anchor-border-color` | `colorSplit` | 全局 Token |
| `@anchor-link-top` | `linkPaddingBlock` | - |
| `@anchor-link-left` | `linkPaddingInlineStart` | - |
| `@anchor-link-padding` | - | `${linkPaddingBlock}px ${linkPaddingInlineStart}px` |

### Avatar 头像

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@avatar-size-base` | `containerSize` | - |
| `@avatar-size-lg` | `containerSizeLG` | - |
| `@avatar-size-sm` | `containerSizeSM` | - |
| `@avatar-font-size-base` | `textFontSize` | - |
| `@avatar-font-size-lg` | `textFontSizeLG` | - |
| `@avatar-font-size-sm` | `textFontSizeSM` | - |
| `@avatar-bg` | - | 可由 `className` 或 `style` 直接覆盖 |
| `@avatar-color` | `colorTextLightSolid` | 全局 Token |
| `@avatar-border-radius` | `borderRadius` | 全局 Token |
| `@avatar-group-overlapping` | `groupOverlapping` | - |
| `@avatar-group-space` | `groupSpace` | - |
| `@avatar-group-border-color` | `colorBorderBg` | 全局 Token |

<!-- ### Badge 徽标数 -->

### BreadCrumb 面包屑

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@breadcrumb-base-color` | `itemColor` | - |
| `@breadcrumb-last-item-color` | `lastItemColor` | - |
| `@breadcrumb-font-size` | `fontSize` | 全局 Token |
| `@breadcrumb-icon-font-size` | `iconFontSize` | - |
| `@breadcrumb-link-color` | `linkColor` | - |
| `@breadcrumb-link-color-hover` | `linkHoverColor` | - |
| `@breadcrumb-separator-color` | `separatorColor` | - |
| `@breadcrumb-separator-margin` | `separatorMargin` | - |

<!-- ### Button 按钮 -->

## Calendar 日历

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@calendar-bg` | - | 由于样式变化已废弃 |
| `@calendar-input-bg` | - | 由于样式变化已废弃 |
| `@calendar-border-color` | - | 由于样式变化已废弃 |
| `@calendar-item-active-bg` | `itemActiveBg` | - |
| `@calendar-column-active-bg` | - | 由于样式变化已废弃 |
| `@calendar-full-bg` | `fullBg` | - |
| `@calendar-full-panel-bg` | `fullPanelBg` | - |

<!-- ### Card 卡片 -->

## Carousel 走马灯

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@carousel-dot-width` | `dotWidth` | - |
| `@carousel-dot-height` | `dotHeight` | - |
| `@carousel-dot-active-width` | `dotActiveWidth` | - |

<!-- ### Cascader 级联选择 -->

## Checkbox 多选框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@checkbox-size` | `controlInteractiveSize` | 全局 Token |
| `@checkbox-color` | `colorPrimary` | - |
| `@checkbox-check-color` | `colorWhite` | - |
| `@checkbox-check-bg` | - | `colorPrimary` |
| `@checkbox-border-width` | `lineWidth` | - |
| `@checkbox-border-radius` | `borderRadiusSM` | - |
| `@checkbox-group-item-margin-right` | - | 由于样式变化已废弃 |

<!-- ### Collapse 折叠面板 -->

### Descriptions 描述列表

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@descriptions-bg` | `labelBg` | - |
| `@descriptions-title-margin-bottom` | `titleMarginBottom` | - |
| `@descriptions-default-padding` | `padding`、`paddingLG` | 全局 Token，对应值为 `${token.padding}px ${token.paddingLG}px` |
| `@descriptions-middle-padding` | `paddingSM`、`paddingLG` | 全局 Token，对应值为 `${token.paddingSM}px ${token.paddingLG}px` |
| `@descriptions-small-padding` | `paddingXS`、`padding` | 全局 Token，对应值为 `${token.paddingXS}px ${token.padding}px` |
| `@descriptions-item-padding-bottom` | `itemPaddingBottom` | - |
| `@descriptions-item-trailing-colon` | - | 由于样式变化已废弃 |
| `@descriptions-item-label-colon-margin-right` | `colonMarginRight` | - |
| `@descriptions-item-label-colon-margin-left` | `colonMarginLeft` | - |
| `@descriptions-extra-color` | `extraColor` | - |

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

### Dropdown 下拉菜单

| Less 变量                            | Component Token       | 备注       |
| ------------------------------------ | --------------------- | ---------- |
| `@dropdown-selected-color`           | `colorPrimary`        | -          |
| `@dropdown-menu-submenu-disabled-bg` | `colorBgElevated`     | 全局 Token |
| `@dropdown-selected-bg`              | `controlItemBgActive` | 全局 Token |

### Empty 空状态

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@empty-font-size` | `fontSize` | 全局 Token |

<!-- ### Form 表单 -->

<!-- ### Image 图片 -->

<!-- ### Input 输入框 -->

<!-- ### Layout 布局 -->

### List 列表

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@list-header-background` | `headerBg` | - |
| `@list-footer-background` | `footerBg` | - |
| `@list-empty-text-padding` | `emptyTextPadding` | - |
| `@list-item-padding` | `itemPadding` | - |
| `@list-item-padding-sm` | `itemPaddingSM` | - |
| `@list-item-padding-lg` | `itemPaddingLG` | - |
| `@list-item-meta-margin-bottom` | `metaMarginBottom` | - |
| `@list-item-meta-avatar-margin-right` | `avatarMarginRight` | - |
| `@list-item-meta-title-margin-bottom` | `titleMarginBottom` | - |
| `@list-customize-card-bg` | - | 由于样式变化已废弃 |
| `@list-item-meta-description-font-size` | `descriptionFontSize` | - |

Mentions 提及

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@mentions-dropdown-bg` | `colorBgElevated` | - |
| `@mentions-dropdown-menu-item-hover-bg` | - | 已废弃 |

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

### Pagination 分页

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@pagination-item-bg` | `itemBg` | - |
| `@pagination-item-size` | `itemSize` | - |
| `@pagination-item-size-sm` | `itemSizeSM` | - |
| `@pagination-font-family` | `fontFamily` | 全局 Token |
| `@pagination-font-weight-active` | `fontWeightStrong` | 全局 Token |
| `@pagination-item-bg-active` | `itemActiveBg` | - |
| `@pagination-item-link-bg` | `itemLinkBg` | - |
| `@pagination-item-disabled-color-active` | `itemActiveColorDisabled` | - |
| `@pagination-item-disabled-bg-active` | `itemActiveBgDisabled` | - |
| `@pagination-item-input-bg` | `itemInputBg` | - |
| `@pagination-mini-options-size-changer-top` | `miniOptionsSizeChangerTop` | - |

### Popover 气泡卡片

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@popover-bg` | `colorBgElevated` | - |
| `@popover-color` | `colorText` | 全局 Token |
| `@popover-min-width` | `minWidth` | - |
| `@popover-min-height` | - | 已废弃 |
| `@popover-arrow-width` | `sizePopupArrow` | 全局 Token |
| `@popover-arrow-color` | - | 已废弃 |
| `@popover-arrow-outer-color`| - | 已废弃 |
| `@popover-distance` | `marginXXS` | 全局 Token |
| `@popover-padding-horizontal` | - | 已废弃 |

<!-- ### Progress 进度条 -->

<!-- ### Radio 单选框 -->

## Rate 评分

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@rate-star-color` | `starColor` | - |
| `@rate-star-bg` | `starBg` | - |
| `@rate-star-size` | `starSize` | - |
| `@rate-star-hover-scale` | `starHoverScale` | - |

### Result 结果

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@result-title-font-size` | `titleFontSize` | - |
| `@result-subtitle-font-size` | `subtitleFontSize` | - |
| `@result-extra-margin` | `extraMargin` | - |

### Segment

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@segmented-container-padding` | `padding` | - |
| `@segmented-label-color` | `itemColor` | - |
| `@segmented-bg` | - | 可以用 `className` 或 `style` 自定义 |
| `@segmented-hover-bg` | `itemHoverBg` | - |
| `@segmented-label-hover-color` | `itemHoverColor` | - |
| `@segmented-selected-bg` | `itemSelectedBg` | - |

<!-- ### Select 选择器 -->

### Skeleton 骨架屏

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@skeleton-block-radius` | `blockRadius` | - |
| `@skeleton-title-height` | `titleHeight` | - |
| `@skeleton-color` | `gradientFromColor` | - |
| `@skeleton-to-color` | `gradientToColor` | - |
| `@skeleton-paragraph-margin-top` | `paragraphMarginTop` | - |
| `@skeleton-paragraph-li-height` | `paragraphLiHeight` | - |
| `@skeleton-paragraph-li-margin-top` | - | 由于样式变化已废弃 |

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

## Tag 标签

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@tag-border-radius` | `borderRadiusSM` | 全局 Token |
| `@tag-default-bg` | `defaultBg` | - |
| `@tag-default-color` | `defaultColor` | - |
| `@tag-font-size` | `fontSizeSM` | 全局 Token |
| `@tag-line-height` | `lineHeightSM` | 全局 Token |

### Timeline 时间轴

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@timeline-width` | `tailWidth` | `tailWidth` 为数字，不带单位，`@timeline-width` 带单位 |
| `@timeline-color` | `tailColor` | - |
| `@timeline-dot-border-width` | `dotBorderWidth` | - |
| `@timeline-dot-color` | - | 已废弃 |
| `@timeline-dot-bg` | `dotBg` | - |
| `@timeline-item-padding-bottom` | `itemPaddingBottom` | - |

<!-- ### TimePicker 时间选择 -->

<!-- ### Tooltip 文字提示 -->

<!-- ### Transfer 穿梭框 -->

<!-- ### Tree 树形控件 -->

### Typography 排版

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@typography-title-font-weight` | `fontWeightStrong` | 全局 Token |
| `@typography-title-margin-top` | `titleMarginTop` | - |
| `@typography-title-margin-bottom` | `titleMarginBottom` | - |

### Upload 上传

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@upload-actions-color` | `actionsColor` | - |
