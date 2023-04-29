---
order: 9
title: less 变量迁移 Component Token
---

本文档包含了所有 4.x 版本中组件相关的 less 变量与 5.x 版本的 Component Token 的对照关系。如果你是从 4.x 版本升级到 5.x 版本，可以通过这份对照表快速找到对应的 Component Token。

<Alert message="注意：仍有部分变量没有对应的 Component Token，这些变量在 5.x 版本中已被废弃。"></Alert>

## Modal 对话框

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
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


## Step 步骤条

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
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

## Notification 通知提醒框

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@zindex-notification` | `zIndexPopup` | - |
| `@notification-width` | `width` | - |
| `@notification-padding` | `notificationPadding` | - |
| `@notification-padding-vertical` | `notificationPaddingVertical` | - |
| `@notification-padding-horizontal` | `notificationPaddingHorizontal` | - |
| `@notification-margin-bottom` | `notificationMarginBottom` | - |
| `@notification-margin-edge` | `notificationMarginEdge` | - |
| `@line-height-base` | - | 由于样式变化已废弃 |
| `@notification-bg` | `notificationBg` | - |
| `@border-radius-base` | `borderRadiusLG` | - |
| `@shadow-2` | `boxShadow` | - |
| `@heading-color` | `colorTextHeading` | - |
| `@font-size-lg` | `fontSizeLG` | - |
| `@font-size-base` | - | 由于样式变化已废弃 |
| `@success-color` | `colorSuccess` | - |
| `@info-color` | `colorInfo` | - |
| `@warning-color` | `colorWarning` | - |
| `@error-color` | `colorError` | - |
| `@text-color-secondary` | `colorIcon` | - |
| `shade(@text-color-secondary, 40%)` | `token.colorIconHover` | - |
| `fade(@white, 85%)` | `token.colorIconHover` | - |
