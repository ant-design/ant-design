---
group:
  title: 迁移
order: 1
title: 从 Less 变量到 Design Token
---

本文档包含了所有 4.x 版本中组件相关的 less 变量与 5.x 版本的 Component Token 的对照关系。如果你是从 4.x 版本升级到 5.x 版本，可以通过这份对照表快速找到对应的 Component Token。

<Alert message="注意：仍有部分变量没有对应的 Component Token，这些变量在 5.x 版本中已被废弃。"></Alert>

## 如何配置 Component Token

通过 ConfigProvider 的 `theme` 属性，我们可以对每一个组件单独配置全局 Token 和组件 Token

```tsx
import React from 'react';
import { Checkbox, ConfigProvider, Radio } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Radio: {
          colorPrimary: '#00b96b',
        },
        Checkbox: {
          colorPrimary: '#ff4d4f',
        },
      },
    }}
  >
    <Radio>Radio</Radio>
    <Checkbox>Checkbox</Checkbox>
  </ConfigProvider>
);

export default App;
```

<!-- ## 全局变量 -->

## 组件变量

### Alert 警告提示

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@alert-success-border-color` | `colorSuccessBorder` | 全局 token |
| `@alert-success-bg-color` | `colorSuccessBg` | 全局 token |
| `@alert-success-icon-color` | `colorSuccess` | 全局 token |
| `@alert-info-border-color` | `colorInfoBorder` | 全局 token |
| `@alert-info-bg-color` | `colorInfoBg` | 全局 token |
| `@alert-info-icon-color` | `colorInfo` | 全局 token |
| `@alert-warning-border-color` | `colorWarningBorder` | 全局 token |
| `@alert-warning-bg-color` | `colorWarningBg` | 全局 token |
| `@alert-warning-icon-color` | `colorWarning` | 全局 token |
| `@alert-error-border-color` | `colorErrorBorder` | 全局 token |
| `@alert-error-bg-color` | `colorErrorBg` | 全局 token |
| `@alert-error-icon-color` | `colorError` | 全局 token |
| `@alert-message-color` | `colorTextHeading` | 全局 token |
| `@alert-text-color` | `colorText` | 全局 Token |
| `@alert-close-color` | `colorIcon` | 全局 token |
| `@alert-close-hover-color` | `colorIconHover` | 全局 token |
| `@alert-padding-vertical` | `defaultPadding` | 统一控制 |
| `@alert-padding-horizontal` | `defaultPadding` | 统一控制 |
| `@alert-no-icon-padding-vertical` | - | 已废弃 |
| `@alert-with-description-no-icon-padding-vertical` | `withDescriptionPadding` | 统一控制 |
| `@alert-with-description-padding-vertical` | `withDescriptionPadding` | 统一控制 |
| `@alert-with-description-padding` | `withDescriptionPadding` | 统一控制 |
| `@alert-icon-top` | - | 已废弃 |
| `@alert-with-description-icon-size` | `withDescriptionIconSize` | - |

### Anchor 锚点

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

### Badge 徽标数

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@zindex-badge` | `indicatorZIndex` | - |
| `@badge-height` | `indicatorHeight` | - |
| `@badge-height-sm` | `indicatorHeightSM` | - |
| `@badge-dot-size` | `dotSize` | - |
| `@badge-font-size` | `textFontSize` | - |
| `@badge-font-size-sm` | `textFontSizeSM` | - |
| `@badge-font-weight` | `textFontWeight` | - |
| `@badge-status-size` | `statusSize` | - |
| `@badge-text-color` | `colorBgContainer` | 全局 Token |
| `@badge-color` | `colorError` | 全局 Token |

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

### Button 按钮

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@btn-font-weight` | `fontWeight` | - |
| `@btn-border-radius-base` | `borderRadius` | 全局 Token |
| `@btn-border-radius-sm` | `borderRadisuSM` | 全局 Token |
| `@btn-border-width` | `lineWidth` | 全局 Token |
| `@btn-border-style` | `lineStyle` | 全局 Token |
| `@btn-shadow` | `defaultShadow` | - |
| `@btn-primary-shadow` | `primaryShadow` | - |
| `@btn-text-shadow` | - | 已废弃，v5 中不再有 `text-shadow` |
| `@btn-primary-color` | `primaryColor` | - |
| `@btn-primary-bg` | `colorPrimary` | 全局 Token |
| `@btn-default-color` | `defaultColor` | - |
| `@btn-default-bg` | `defaultBg` | - |
| `@btn-default-border` | `defaultBorderColor` | - |
| `@btn-danger-color` | `dangerColor` | - |
| `@btn-danger-bg` | `colorError` | 全局 Token |
| `@btn-danger-border` | `colorError` | 全局 Token |
| `@btn-disable-color` | `colorTextDisabled` | 全局 Token |
| `@btn-disable-bg` | `colorBgContainerDisabled` | 全局 Token |
| `@btn-disable-border` | `borderColorDisabled` | - |
| `@btn-default-ghost-color` | `defaultGhostColor` | - |
| `@btn-default-ghost-bg` | `ghostBg` | - |
| `@btn-default-ghost-border` | `defaultGhostBorderColor` | - |
| `@btn-font-size-lg` | `fontSizeLG` | 全局 Token |
| `@btn-font-size-sm` | `fontSizeSM` | 全局 Token |
| `@btn-padding-horizontal-base` | `paddingInline` | - |
| `@btn-padding-horizontal-lg` | `paddingInlineLG` | - |
| `@btn-padding-horizontal-sm` | `paddingInlineSM` | - |
| `@btn-height-base` | `controlHeight` | 全局 Token |
| `@btn-height-lg` | `controlHeightLG` | 全局 Token |
| `@btn-height-sm` | `controlHeightSM` | 全局 Token |
| `@btn-line-height` | `lineHeight` | 全局 Token |
| `@btn-circle-size` | `controlHeight` | 全局 Token |
| `@btn-circle-size-lg` | `controlHeightLG` | 全局 Token |
| `@btn-circle-size-sm` | `controlHeightSM` | 全局 Token |
| `@btn-square-size` | `controlHeight` | 全局 Token |
| `@btn-square-size-lg` | `controlHeightLG` | 全局 Token |
| `@btn-square-size-sm` | `controlHeightSM` | 全局 Token |
| `@btn-square-only-icon-size` | `onlyIconSize` | - |
| `@btn-square-only-icon-size-sm` | `onlyIconSizeSM` | - |
| `@btn-square-only-icon-size-lg` | `onlyIconSizeLG` | - |
| `@btn-group-border` | `groupBorderColor` | - |
| `@btn-link-hover-bg` | `linkHoverBg` | - |
| `@btn-text-hover-bg` | `textHoverBg` | - |

### Calendar 日历

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

### Card 卡片

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@card-head-color` | `colorTextHeading` | 全局 Token |
| `@card-head-background` | `headerBg` | - |
| `@card-head-font-size` | `headerFontSize` | - |
| `@card-head-font-size-sm` | `headerFontSizeSM` | - |
| `@card-head-padding` | - | 已废弃 |
| `@card-head-padding-sm` | - | 已废弃 |
| `@card-head-height` | `headerHeight` | - |
| `@card-head-height-sm` | `headerHeightSM` | - |
| `@card-inner-head-padding` | - | 已废弃 |
| `@card-padding-base` | `cardPaddingBase` | - |
| `@card-padding-base-sm` | `cardPaddingBaseSm` | - |
| `@card-actions-background` | `actionsBackground` | - |
| `@card-actions-li-margin` | `actionsLiMargin` | - |
| `@card-skeleton-bg` | - | 已废弃，已改为内置 Skeleton 组件 |
| `@card-background` | `colorBgContainer` | 全局 Token |
| `@card-shadow` | - | 可由 `className` 或者 `style` 直接修改 |
| `@card-radius` | `borderRadiusLG` | 全局 Token |
| `@card-head-tabs-margin-bottom` | `tabsMarginBottom` | - |
| `@card-head-extra-color` | `extraColor` | - |

### Carousel 走马灯

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@carousel-dot-width` | `dotWidth` | - |
| `@carousel-dot-height` | `dotHeight` | - |
| `@carousel-dot-active-width` | `dotActiveWidth` | - |

### Cascader 级联选择

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@cascader-bg` | - | 已废弃 |
| `@cascader-item-selected-bg` | `optionSelectedBg` | - |
| `@cascader-menu-bg` | - | 已废弃 |
| `@cascader-menu-border-color-split` | `colorSplit` | 全局 Token |
| `@cascader-dropdown-vertical-padding` | `optionPadding` | - |
| `@cascader-dropdown-edge-child-vertical-padding` | `menuPadding` | - |
| `@cascader-dropdown-font-size` | - | 已废弃 |
| `@cascader-dropdown-line-height` | `lineHeight` | 全局 Token |

### Checkbox 多选框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@checkbox-size` | `controlInteractiveSize` | 全局 Token |
| `@checkbox-color` | `colorPrimary` | 全局 Token |
| `@checkbox-check-color` | `colorWhite` | - |
| `@checkbox-check-bg` | `colorPrimary` | 全局 Token |
| `@checkbox-border-width` | `lineWidth` | - |
| `@checkbox-border-radius` | `borderRadiusSM` | - |
| `@checkbox-group-item-margin-right` | - | 由于样式变化已废弃 |

### Collapse 折叠面板

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@collapse-header-padding` | `headerPadding` | - |
| `@collapse-header-padding-extra` | - | 已废弃 |
| `@collapse-header-bg` | `headerBg` | - |
| `@collapse-content-padding` | `contentPadding` | - |
| `@collapse-content-bg` | `contentBg` | - |
| `@collapse-header-arrow-left` | - | 已废弃 |

### DatePicker 日期选择框

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@picker-bg` | `colorBgContainer` | 全局 Token |
| `@picker-basic-cell-hover-color` | `cellHoverBg` | - |
| `@picker-basic-cell-active-with-range-color` | `cellActiveWithRangeBg` | - |
| `@picker-basic-cell-hover-with-range-color` | `cellHoverWithRangeBg` | - |
| `@picker-basic-cell-disabled-bg` | `cellBgDisabled` | - |
| `@picker-border-color` | `colorSplit` | 全局 Token |
| `@picker-date-hover-range-border-color` | `cellRangeBorderColor` | - |
| `@picker-date-hover-range-color` | `cellHoverWithRangeColor` | - |
| `@picker-time-panel-column-width` | `timeColumnWidth` | - |
| `@picker-time-panel-column-height` | `timeColumnHeight` | - |
| `@picker-time-panel-cell-height` | `timeCellHeight` | - |
| `@picker-panel-cell-height` | `cellHeight` | - |
| `@picker-panel-cell-width` | `cellWidth` | - |
| `@picker-text-height` | `textHeight` | - |
| `@picker-panel-without-time-cell-height` | `withoutTimeCellHeight` | - |

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

### Divider 分割线

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@divider-text-padding` | `textPaddingInline` | - |
| `@divider-orientation-margin` | `orientationMargin` | - |
| `@divider-color` | `colorSplit` | 全局 Token |
| `@divider-vertical-gutter` | `verticalMarginInline` | - |

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
| `@dropdown-selected-color`           | `colorPrimary`        | 全局 Token |
| `@dropdown-menu-submenu-disabled-bg` | `colorBgElevated`     | 全局 Token |
| `@dropdown-selected-bg`              | `controlItemBgActive` | 全局 Token |

### Empty 空状态

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@empty-font-size` | `fontSize` | 全局 Token |

### Form 表单

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@label-required-color` | `labelRequiredMarkColor` | - |
| `@label-color` | `labelColor` | - |
| `@form-warning-input-bg` | - | 由于样式变化已废弃 |
| `@form-item-margin-bottom` | `itemMarginBottom` | - |
| `@form-item-trailing-colon` | - | 由于样式变化已废弃 |
| `@form-vertical-label-padding` | `verticalLabelPadding` | - |
| `@form-vertical-label-margin` | `verticalLabelMargin` | - |
| `@form-item-label-font-size` | `labelFontSize` | - |
| `@form-item-label-height` | `labelHeight` | - |
| `@form-item-label-colon-margin-right` | `labelColonMarginInlineEnd` | - |
| `@form-item-label-colon-margin-left` | `labelColonMarginInlineStart` | - |
| `@form-error-input-bg` | - | 由于样式变化已废弃 |

### Image 图片

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@image-size-base` | - | 未使用已废弃 |
| `@image-font-size-base` | - | 未使用已废弃 |
| `@image-bg` | `colorFillTertiary` | 全局 Token |
| `@image-color` | `colorTextLightSolid` | 全局 Token |
| `@image-preview-operation-size` | `previewOperationSize` | - |
| `@image-preview-operation-color` | `previewOperationColor` | - |
| `@image-preview-operation-disabled-color` | `previewOperationColorDisabled` | - |

### Input 输入框

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@input-height-base` | `controlHeight` | 全局 Token |
| `@input-height-lg` | `controlHeightLG` | 全局 Token |
| `@input-height-sm` | `controlHeightSM` | 全局 Token |
| `@input-padding-horizontal` | `paddingInline` | - |
| `@input-padding-horizontal-base` | `paddingInline` | - |
| `@input-padding-horizontal-sm` | `paddingInlineSM` | - |
| `@input-padding-horizontal-lg` | `paddingInlineLG` | - |
| `@input-padding-vertical-base` | `paddinBlock` | - |
| `@input-padding-vertical-sm` | `paddingBlockSM` | - |
| `@input-padding-vertical-lg` | `paddingBlockLG` | - |
| `@input-placeholder-color` | `colorTextPlaceholder` | 全局 Token |
| `@input-color` | `colorText` | 全局 Token |
| `@input-icon-color` | - | 已废弃 |
| `@input-border-color` | `colorBorder` | 全局 Token |
| `@input-bg` | `colorBgContainer` | 全局 Token |
| `@input-addon-bg` | `addonBg` | - |
| `@input-hover-border-color` | `hoverBorderColor` | - |
| `@input-disabled-bg` | `colorBgContainerDisabled` | 全局 Token |
| `@input-outline-offset` | `activeShadow` | 控制激活态阴影 |
| `@input-icon-hover-color` | `colorIconHover` | 全局 Token |
| `@input-disabled-color` | `colorTextDisabled` | 全局 Token |

### InputNumber 数字输入框

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@input-number-hover-border-color` | `hoverBorderColor` | - |
| `@input-number-handler-active-bg` | `handleActiveBg` | - |
| `@input-number-handler-hover-bg` | `handleHoverColor` | 4.x 中命名有误，实际上是 color |
| `@input-number-handler-bg` | `handleBg` | - |
| `@input-number-handler-border-color` | `handleBorderColor` | - |

### Layout 布局

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@layout-body-background` | `bodyBg` | - |
| `@layout-header-background` | `headerBg` | - |
| `@layout-header-height` | `headerHeight` | - |
| `@layout-header-padding` | `headerPadding` | - |
| `@layout-header-color` | `headerColor` | - |
| `@layout-footer-padding` | `footerPadding` | - |
| `@layout-footer-background` | `footerBg` | - |
| `@layout-sider-background` | `siderBg` | - |
| `@layout-trigger-height` | `triggerHeight` | - |
| `@layout-trigger-background` | `triggerBg` | - |
| `@layout-trigger-color` | `triggerColor` | - |
| `@layout-zero-trigger-width` | `zeroTriggerWidth` | - |
| `@layout-zero-trigger-height` | `zeroTriggerHeight` | - |
| `@layout-sider-background-light` | `lightSiderBg` | - |
| `@layout-trigger-background-light` | `lightTriggerBg` | - |
| `@layout-trigger-color-light` | `lightTriggerColor` | - |

ssgit chekcout featuregit pucheckout featire'uregit pull

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
| `@mentions-dropdown-bg` | `colorBgElevated` | 全局 Token |
| `@mentions-dropdown-menu-item-hover-bg` | - | 已废弃 |

### Menu 导航菜单

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@menu-inline-toplevel-item-height` | `itemHeight` | 同 `@menu-item-height` |
| `@menu-item-height` | `itemHeight` | - |
| `@menu-item-group-height` | `groupTitleLineHeight` | - |
| `@menu-collapsed-width` | `collapsedWidth` | - |
| `@menu-bg` | `itemBg` | - |
| `@menu-popup-bg` | `popupBg` | - |
| `@menu-item-color` | `itemColor` | - |
| `@menu-inline-submenu-bg` | `subMenuItemBg` | - |
| `@menu-highlight-color` | `itemSelectedColor` | - |
| `@menu-highlight-danger-color` | `dangerItemSelectedColor` | - |
| `@menu-item-active-bg` | `itemActiveBg` | - |
| `@menu-item-active-danger-bg` | `dangerItemActiveBg` | - |
| `@menu-item-active-border-width` | `activeBarBorderWidth` | - |
| `@menu-item-group-title-color` | `groupTitleColor` | - |
| `@menu-item-vertical-margin` | `itemMarginBlock` | - |
| `@menu-item-font-size` | `fontSize` | 全局 Token |
| `@menu-item-boundary-margin` | - | 因样式调整已废弃，可使用 `itemMarginBlock` 替代 |
| `@menu-item-padding-horizontal` | `itemPaddingInline` | - |
| `@menu-item-padding` | - | 已废弃，使用 `itemPaddingInline` 和 `itemHeight` 替代 |
| `@menu-horizontal-line-height` | `horizontalLineHeight` | - |
| `@menu-icon-margin-right` | `iconMarginInlineEnd` | - |
| `@menu-icon-size` | `iconSize` | - |
| `@menu-icon-size-lg` | `horizontalLineHeight` | - |
| `@menu-dark-color` | `darkItemColor` | - |
| `@menu-dark-danger-color` | `darkDangerItemColor` | - |
| `@menu-dark-bg` | `darkItemBg` | - |
| `@menu-dark-arrow-color` | - | 已废弃，和文字颜色相同 |
| `@menu-dark-inline-submenu-bg` | `darkSubMenuItemBg` | - |
| `@menu-dark-highlight-color` | `darkItemSelectedColor` | - |
| `@menu-dark-item-active-bg` | `darkItemSelectedBg` | - |
| `@menu-dark-item-active-danger-bg` | `darkDangerItemSelectedBg` | - |
| `@menu-dark-selected-item-icon-color` | - | 已废弃，同 `darkItemSelectedColor` |
| `@menu-dark-selected-item-text-color` | - | 已废弃，同 `darkItemSelectedColor` |
| `@menu-dark-item-hover-bg` | `darkItemHoverBg` | - |

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
| `@popover-bg` | `colorBgElevated` | 全局 Token |
| `@popover-color` | `colorText` | 全局 Token |
| `@popover-min-width` | `minWidth` | - |
| `@popover-min-height` | - | 已废弃 |
| `@popover-arrow-width` | `sizePopupArrow` | 全局 Token |
| `@popover-arrow-color` | - | 已废弃 |
| `@popover-arrow-outer-color`| - | 已废弃 |
| `@popover-distance` | `marginXXS` | 全局 Token |
| `@popover-padding-horizontal` | - | 已废弃 |

### Progress 进度条

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@progress-default-color` | `defaultColor` | - |
| `@progress-remaining-color` | `remainingColor` | - |
| `@progress-info-text-color` | `colorText` | 全局 Token |
| `@progress-text-color` | `circleTextColor` | - |
| `@progress-radius` | `lineBorderRadius` | - |
| `@progress-steps-item-bg` | `remainingColor` | - |
| `@progress-text-font-size` | `fontSizeSM` | 全局 Token |
| `@progress-circle-text-font-size` | `circleTextFontSize` | - |

### Radio 单选框

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@radio-size` | `radioSize` | - |
| `@radio-top` | - | 已废弃 |
| `@radio-border-width` | `lineWidth` | 全局 Token |
| `@radio-dot-size` | `dotSize` | - |
| `@radio-dot-color` | - | 已废弃 |
| `@radio-dot-disabled-color` | `dotColorDisabled` | - |
| `@radio-solid-checked-color` | `buttonSolidCheckedColor` | - |
| `@radio-button-bg` | `buttonBg` | - |
| `@radio-button-checked-bg` | `buttonCheckedBg` | - |
| `@radio-button-color` | `buttonColor` | - |
| `@radio-button-hover-color` | `colorPrimaryHover` | 全局 Token |
| `@radio-button-active-color` | `colorPrimaryActive` | 全局 Token |
| `@radio-button-padding-horizontal` | `buttonPaddingInline` | - |
| `@radio-disabled-button-checked-bg` | `buttonCheckdBgDisabled` | - |
| `@radio-disabled-button-checked-color` | `buttonCheckdColorDisabled` | - |
| `@radio-wrapper-margin-right` | `wrapperMarginInlineEnd` | - |

### Rate 评分

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

### Select 选择器

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@select-border-color` | `colorBorder` | 全局 Token |
| `@select-item-selected-color` | `optionSelectedColor` | - |
| `@select-item-selected-font-weight` | `optionSelectedFontWeight` | - |
| `@select-dropdown-bg` | `colorBgElevated` | 全局 Token |
| `@select-item-selected-bg` | `optionSelectedBg` | - |
| `@select-item-active-bg` | `optionActiveBg` | - |
| `@select-dropdown-vertical-padding` | `optionPadding` | 控制整体内间距 |
| `@select-dropdown-font-size` | `optionFontSize` | - |
| `@select-dropdown-line-height` | `optionLineHeight` | - |
| `@select-dropdown-height` | `optionHeight` | - |
| `@select-background` | `selectorBg` | - |
| `@select-clear-background` | `clearBg` | - |
| `@select-selection-item-bg` | `multipleItemBg` | - |
| `@select-selection-item-border-color` | `multipleItemBorderColor` | - |
| `@select-single-item-height-lg` | `singleItemHeightLG` | - |
| `@select-multiple-item-height` | `multipleItemHeight` | - |
| `@select-multiple-item-height-lg` | `multipleItemHeightLG` | - |
| `@select-multiple-item-spacing-half` | - | 已废弃 |
| `@select-multiple-disabled-background` | `multipleSelectorBgDisabled` | - |
| `@select-multiple-item-disabled-color` | `multipleItemColorDisabled` | - |
| `@select-multiple-item-disabled-border-color` | `multipleItemBorderColorDisabled` | - |

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

### Slider 滑动输入条

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@slider-margin` | - | 可由 `className` 或 `style` 直接修改 |
| `@slider-rail-background-color` | `railBg` | - |
| `@slider-rail-background-color-hover` | `railHoverBg` | - |
| `@slider-track-background-color` | `trackBg` | - |
| `@slider-track-background-color-hover` | `trackHoverBg` | - |
| `@slider-handle-border-width` | `handleLineWidth` | - |
| `@slider-handle-background-color` | - | 已废弃 |
| `@slider-handle-color` | `handleColor` | - |
| `@slider-handle-color-hover` | `handleActiveColor` | - |
| `@slider-handle-color-focus` | `handleActiveColor` | - |
| `@slider-handle-color-focus-shadow` | - | 已废弃 |
| `@slider-handle-color-tooltip-open` | `handleActiveColor` | - |
| `@slider-handle-size` | `handleSize` | - |
| `@slider-handle-margin-top` | - | 已废弃 |
| `@slider-handle-margin-left` | - | 已废弃 |
| `@slider-handle-shadow` | - | 已废弃 |
| `@slider-dot-border-color` | `dotBorderColor` | - |
| `@slider-dot-border-color-active` | `dotActiveBorderColor` | - |
| `@slider-disabled-color` | `trackBgDisabled` | - |
| `@slider-disabled-background-color` | - | 已废弃 |

### Spin 加载中

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@spin-dot-size-sm` | `dotSizeSM` | - |
| `@spin-dot-size` | `dotSize` | - |
| `@spin-dot-size-lg` | `dotSizeLG` | - |

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

### Switch 开关

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@switch-height` | `trackHeight` | - |
| `@switch-sm-height` | `trackHeightSM` | - |
| `@switch-min-width` | `trackMinWidth` | - |
| `@switch-sm-min-width` | `trackMinWidthSM` | - |
| `@switch-disabled-opacity` | `opacityLoading` | 全局 Token |
| `@switch-color` | `colorPrimary` | 全局 Token |
| `@switch-bg` | `handleBg` | - |
| `@switch-shadow-color` | `handleShadow` | 控制把手阴影，不仅是颜色 |
| `@switch-padding` | `trackPadding` | - |
| `@switch-inner-margin-min` | `innerMinMargin` | - |
| `@switch-inner-margin-max` | `innerMaxMargin` | - |
| `@switch-sm-inner-margin-min` | `innerMinMarginSM` | - |
| `@switch-sm-inner-margin-max` | `innerMaxMarginSM` | - |

### Table 表格

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@table-bg` | `colorBgContainer` | 全局 Token |
| `@table-header-bg` | `headerBg` | - |
| `@table-header-color` | `headerColor` | - |
| `@table-header-sort-bg` | `headerSortActiveBg` | - |
| `@table-body-sort-bg` | `bodySortActiveBg` | - |
| `@table-row-hover-bg` | `rowHoverBg` | - |
| `@table-selected-row-color` | `colorText` | 全局 Token |
| `@table-selected-row-bg` | `rowSelectedBg` | - |
| `@table-body-selected-sort-bg` | - | 已废弃，同 `rowSelectedBg` |
| `@table-selected-row-hover-bg` | `rowSelectedHoverBg` | - |
| `@table-expanded-row-bg` | `rowExpandedBg` | - |
| `@table-padding-vertical` | `cellPaddingBlock` | - |
| `@table-padding-horizontal` | `cellPaddingInline` | - |
| `@table-padding-vertical-md` | `cellPaddingBlockMD` | - |
| `@table-padding-horizontal-md` | `cellPaddingInlineMD` | - |
| `@table-padding-vertical-sm` | `cellPaddingBlockSM` | - |
| `@table-padding-horizontal-sm` | `cellPaddingInlineSM` | - |
| `@table-border-color` | `borderColor` | - |
| `@table-border-radius-base` | `headerBorderRadius` | - |
| `@table-footer-bg` | `footerBg` | - |
| `@table-footer-color` | `footerColor` | - |
| `@table-header-bg-sm` | - | 已废弃，同 `headerBg` |
| `@table-font-size` | `cellFontSize` | - |
| `@table-font-size-md` | `cellFontSizeMD` | - |
| `@table-font-size-sm` | `cellFontSizeSM` | - |
| `@table-header-cell-split-color` | `headerSplitColor` | - |
| `@table-header-sort-active-bg` | `headerSortHoverBg` | v4 中有误，实际上用于悬浮背景色 |
| `@table-fixed-header-sort-active-bg` | `fixedHeaderSortActiveBg` | - |
| `@table-header-filter-active-bg` | `headerFilterHoverBg` | - |
| `@table-filter-btns-bg` | - | 已废弃，同 `filterDropdownBg` |
| `@table-filter-dropdown-bg` | `filterDropdownBg` | - |
| `@table-expand-icon-bg` | `expandIconBg` | - |
| `@table-selection-column-width` | `selectionColumnWidth` | - |
| `@table-sticky-scroll-bar-bg` | `stickyScrollBarBg` | - |
| `@table-sticky-scroll-bar-radius` | `stickyScrollBarBorderRadius` | - |

### Tabs 标签页

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@tabs-card-head-background` | `cardBg` | - |
| `@tabs-card-height` | `cardHeight` | - |
| `@tabs-card-active-color` | `itemSelectedColor` | - |
| `@tabs-card-horizontal-padding` | `cardPadding` | - |
| `@tabs-card-horizontal-padding-sm` | `cardPaddingSM` | - |
| `@tabs-card-horizontal-padding-lg` | `cardPaddingLG` | - |
| `@tabs-title-font-size` | `titleFontSize` | - |
| `@tabs-title-font-size-lg` | `titleFontSizeLG` | - |
| `@tabs-title-font-size-sm` | `titleFontSizeSM` | - |
| `@tabs-ink-bar-color` | `inkBarColor` | - |
| `@tabs-bar-margin` | `horizontalMargin` | - |
| `@tabs-horizontal-gutter` | `horizontalItemGutter` | - |
| `@tabs-horizontal-margin` | `horizontalItemMargin` | - |
| `@tabs-horizontal-margin-rtl` | `horizontalItemMarginRTL` | - |
| `@tabs-horizontal-padding` | `horizontalItemPadding` | - |
| `@tabs-horizontal-padding-lg` | `horizontalItemPaddingLG` | - |
| `@tabs-horizontal-padding-sm` | `horizontalItemPaddingSM` | - |
| `@tabs-vertical-padding` | `verticalItemPadding` | - |
| `@tabs-vertical-margin` | `verticalItemMargin` | - |
| `@tabs-scrolling-size` | - | 已废弃 |
| `@tabs-highlight-color` | `itemSelectedColor` | - |
| `@tabs-hover-color` | `itemHoverColor` | - |
| `@tabs-active-color` | `itemActiveColor` | - |
| `@tabs-card-gutter` | `cardGutter` | - |
| `@tabs-card-tab-active-border-top` | - | 已废弃 |

### Tag 标签

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

### Tooltip 文字提示

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@tooltip-max-width` | - | 可由 `className` 或 `style` 直接修改 |
| `@tooltip-color` | `colorTextLightSolid` | 全局 Token |
| `@tooltip-bg` | `colorBgSpotlight` | 全局 token |
| `@tooltip-arrow-width` | `sizePopupArrow` | 全局 Token |
| `@tooltip-distance` | `marginXXS` | 全局 Token |
| `@tooltip-arrow-color` | - | 同 `@tooltip-bg`，已废弃 |
| `@tooltip-border-radius` | `borderRadius` | 全局 Token |

### Transfer 穿梭框

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@transfer-header-height` | `headerHeight` | - |
| `@transfer-item-height` | `itemHeight` | - |
| `@transfer-disabled-bg` | `colorBgContainerDisabled` | 全局 Token |
| `@transfer-list-height` | `listHeight` | - |
| `@transfer-item-hover-bg` | `controlItemBgHover` | 全局 Token |
| `@transfer-item-selected-hover-bg` | `controlItemBgActiveHover` | 全局 Token |
| `@transfer-item-padding-vertical` | `itemPaddingBlock` | - |
| `@transfer-list-search-icon-top` | - | 已废弃 |

### Tree 树形控件

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@tree-bg` | `colorBgContainer` | 全局 Token |
| `@tree-title-height` | `titleHeight` | - |
| `@tree-child-padding` | - | 已废弃 |
| `@tree-directory-selected-color` | `directoryNodeSelectedColor` | - |
| `@tree-directory-selected-bg` | `directoryNodeSelectedBg` | - |
| `@tree-node-hover-bg` | `nodeHoverBg` | - |
| `@tree-node-selected-bg` | `nodeSelectedBg` | - |

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
