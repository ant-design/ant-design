---
order: 9
title: Migrate Less variables to Component Token
---

This document contains the correspondence between all the less variables related to components in version 4.x and the Component Token in version 5.x. If you are upgrading from version 4.x to version 5.x, you can quickly find the corresponding Component Token through this comparison table.

<Alert message="Note: There are still some less variables that do not have a corresponding Component Token, and these variables have been deprecated in version 5.x."></Alert>

<!-- ## 全局变量 -->

## 组件变量

<!-- ### Alert -->

<!-- ### Anchor -->

<!-- ### Avatar -->

<!-- ### Badge -->

### BreadCrumb 面包屑

<!-- prettier-ignore -->
| Less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@breadcrumb-base-color` | `itemColor` | - |
| `@breadcrumb-last-item-color` | `lastItemColor` | - |
| `@breadcrumb-font-size` | `fontSize` | GlobalToken |
| `@breadcrumb-icon-font-size` | `iconFontSize` | - |
| `@breadcrumb-link-color` | `linkColor` | - |
| `@breadcrumb-link-color-hover` | `linkHoverColor` | - |
| `@breadcrumb-separator-color` | `separatorColor` | - |
| `@breadcrumb-separator-margin` | `separatorMargin` | - |

<!-- ### Button -->

## Calendar

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@calendar-bg` | - | Deprecated for style change |
| `@calendar-input-bg` | - | Deprecated for style change |
| `@calendar-border-color` | - | Deprecated for style change |
| `@calendar-item-active-bg` | `itemActiveBg` | - |
| `@calendar-column-active-bg` | - | Deprecated for style change |
| `@calendar-full-bg` | `fullBg` | - |
| `@calendar-full-panel-bg` | `fullPanelBg` | - |

<!-- ### Card -->

<!-- ### Carousel -->

<!-- ### Cascader -->

<!-- ### Checkbox -->

## Checkbox

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@checkbox-size` | `controlInteractiveSize` | GlobalToken |
| `@checkbox-color` | `colorPrimary` | - |
| `@checkbox-check-color` | `colorWhite` | - |
| `@checkbox-check-bg` | - | `colorPrimary` |
| `@checkbox-border-width` | `lineWidth` | - |
| `@checkbox-border-radius` | `borderRadiusSM` | - |
| `@checkbox-group-item-margin-right` | - | Deprecated for style change |

<!-- ### Collapse -->

<!-- ### Descriptions -->

<!-- ### Divider -->

## Drawer

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@drawer-bg` | `colorBgElevated` | - |
| `@drawer-header-padding` | `padding`、`paddingLG` | `${padding}px ${paddingLG}px` |
| `@drawer-title-font-size` | `fontSizeLG` | - |
| `@drawer-title-line-height` | `lineHeightLG` | - |
| `@drawer-body-padding` | `paddingLG` | - |
| `@drawer-footer-padding-vertical` | `drawerFooterPaddingVertical` | `drawerFooterPaddingVertical`  is a number without units, `@drawer-footer-padding-vertical` with units |
| `@drawer-footer-padding-horizontal` | `drawerFooterPaddingHorizontal` | `drawerFooterPaddingHorizontal`  is a number without units, `@drawer-footer-padding-horizontal` with units |

<!-- ### Dropdown -->

<!-- ### Empty -->

<!-- ### Form -->

<!-- ### Image -->

<!-- ### Input -->

<!-- ### Layout -->

<!-- ### List -->

<!-- ### Mentions -->

<!-- ### Menu -->

## Message

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@zindex-message` | `zIndexPopup` | - |
| `@message-notice-content-padding` | `messageNoticeContentPadding` | - |
| `@message-notice-content-bg` | `messageNoticeContentBg` | - |

## Modal

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@modal-header-padding-vertical` | - | Deprecated for style change |
| `@modal-header-padding-horizontal` | - | Deprecated for style change |
| `@modal-body-padding` | - | Deprecated for style change |
| `@modal-header-bg` | `modalHeaderBg` | - |
| `@modal-header-padding` | - | Deprecated for style change |
| `@modal-header-border-width` | - | Deprecated for style change |
| `@modal-header-border-style` | - | Deprecated for style change |
| `@modal-header-title-line-height` | `modalHeaderTitleLineHeight` | - |
| `@modal-header-title-font-size` | `modalHeaderTitleFontSize` | - |
| `@modal-header-border-color-split` | - | Deprecated for style change |
| `@modal-header-close-size` | - | Deprecated for style change |
| `@modal-content-bg` | `modalContentBg` | - |
| `@modal-heading-color` | `modalHeadingColor` | - |
| `@modal-close-color` | `modalCloseIconColor` | - |
| `@modal-footer-bg` | `modalFooterBg` | - |
| `@modal-footer-border-color-split` | - | Deprecated for style change |
| `@modal-footer-border-style` | - | Deprecated for style change |
| `@modal-footer-padding-vertical` | - | Deprecated for style change |
| `@modal-footer-padding-horizontal` | - | Deprecated for style change |
| `@modal-footer-border-width` | - | Deprecated for style change |
| `@modal-mask-bg` | `colorBgMask` | - |
| `@modal-confirm-body-padding` | - | Deprecated for style change |
| `@modal-confirm-title-font-size` | `modalHeaderTitleFontSize` | - |
| `@modal-border-radius` | `borderRadiusLG` | - |

## Notification

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@notification-width` | `width` | - |
| `@notification-padding` | `notificationPadding` | - |
| `@notification-padding-vertical` | `notificationPaddingVertical` | - |
| `@notification-padding-horizontal` | `notificationPaddingHorizontal` | - |
| `@notification-margin-bottom` | `notificationMarginBottom` | - |
| `@notification-margin-edge` | `notificationMarginEdge` | - |
| `@notification-bg` | `notificationBg` | - |

<!-- ### Pagination -->

<!-- ### Popover -->

<!-- ### Progress -->

<!-- ### Radio -->

## Rate

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@rate-star-color` | `starColor` | - |
| `@rate-star-bg` | `starBg` | - |
| `@rate-star-size` | `starSize` | - |
| `@rate-star-hover-scale` | `starHoverScale` | - |

## Result

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@result-icon-font-size` | `resultIconFontSize` | - |
| `@result-title-font-size` | `resultTitleFontSize` | - |
| `@result-subtitle-font-size` | `resultSubtitleFontSize` | - |
| `@result-extra-margin` | `resultExtraMargin` | - |

### Segment

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@segmented-container-padding` | `padding` | - |
| `@segmented-label-color` | `itemColor` | - |
| `@segmented-hover-bg` | `itemHoverBg` | - |
| `@segmented-bg` | - | Could be customized with `className` or `style` |
| `@segmented-label-hover-color` | `itemHoverColor` | - |
| `@segmented-selected-bg` | `itemSelectedBg` | - |

<!-- ### Select -->

### Skeleton

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@skeleton-block-radius` | `blockRadius` | - |
| `@skeleton-title-height` | `titleHeight` | - |
| `@skeleton-color` | `gradientFromColor` | - |
| `@skeleton-to-color` | `gradientToColor` | - |
| `@skeleton-paragraph-margin-top` | `paragraphMarginTop` | - |
| `@skeleton-paragraph-li-height` | `paragraphLiHeight` | - |
| `@skeleton-paragraph-li-margin-top` | - | 由于样式变化已废弃 |

<!-- ### Slider -->

## Statistic

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@statistic-title-font-size` | `statisticTitleFontSize` | - |
| `@statistic-content-font-size` | `statisticContentFontSize` | - |
| `@statistic-font-family` | `statisticFontFamily` | - |

## Step

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@process-tail-color` | `processTailColor` | - |
| `@steps-nav-arrow-color` | `stepsNavArrowColor` | - |
| `@steps-background` | - | Deprecated for style change |
| `@steps-icon-size` | `stepsIconSize` | - |
| `@steps-icon-custom-size` | `stepsIconCustomSize` | - |
| `@steps-icon-custom-top` | `stepsIconCustomTop` | - |
| `@steps-icon-custom-font-size` | `stepsIconCustomFontSize` | - |
| `@steps-icon-top` | `stepsIconTop` | - |
| `@steps-icon-font-size` | `stepsIconFontSize` | - |
| `@steps-icon-margin` | - | Deprecated for style change |
| `@steps-title-line-height` | `stepsTitleLineHeight` | - |
| `@steps-small-icon-size` | `stepsSmallIconSize` | - |
| `@steps-small-icon-margin` | - | Deprecated for style change |
| `@steps-dot-size` | `stepsDotSize` | - |
| `@steps-dot-top` | - | Deprecated for style change |
| `@steps-current-dot-size` | `stepsCurrentDotSize` | - |
| `@steps-description-max-width` | `stepsNavContentMaxWidth` | - |
| `@steps-nav-content-max-width` | - | Deprecated for style change |
| `@steps-vertical-icon-width` | - | Deprecated for style change |
| `@steps-vertical-tail-width` | - | Deprecated for style change |
| `@steps-vertical-tail-width-sm` | - | Deprecated for style change |

<!-- ### Switch -->

<!-- ### Table -->

<!-- ### Tabs -->

<!-- ### Tag -->

### Timeline

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@timeline-width` | `tailWidth` | `tailWidth`  is a number without units, `@timeline-width` with units |
| `@timeline-color` | `tailColor` | - |
| `@timeline-dot-border-width` | `dotBorderWidth` | - |
| `@timeline-dot-color` | - | Deprecated |
| `@timeline-dot-bg` | `dotBg` | - |
| `@timeline-item-padding-bottom` | `itemPaddingBottom` | - |

<!-- ### TimePicker -->

<!-- ### Tooltip -->

<!-- ### Transfer -->

<!-- ### Tree -->

### Typography

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@typography-title-font-weight` | `fontWeightStrong` | Global Token |
| `@typography-title-margin-top` | `titleMarginTop` | - |
| `@typography-title-margin-bottom` | `titleMarginBottom` | - |

<!-- ### Upload -->
