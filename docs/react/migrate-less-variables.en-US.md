---
order: 9
title: Migrate Less variables to Component Token
---

This document contains the correspondence between all the less variables related to components in version 4.x and the Component Token in version 5.x. If you are upgrading from version 4.x to version 5.x, you can quickly find the corresponding Component Token through this comparison table.

<Alert message="Note: There are still some less variables that do not have a corresponding Component Token, and these variables have been deprecated in version 5.x."></Alert>

<!-- ## 全局变量 -->

## Component Token

<!-- ### Alert -->

## Anchor

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@anchor-bg` | '-' | Can be modified directly by `className` or `style` |
| `@anchor-border-color` | `colorSplit` | GlobalToken |
| `@anchor-link-top` | `linkPaddingBlock` | - |
| `@anchor-link-left` | `linkPaddingInlineStart` | - |
| `@anchor-link-padding` | - | `${linkPaddingBlock}px ${linkPaddingInlineStart}px` |

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

## Carousel

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@carousel-dot-width` | `dotWidth` | - |
| `@carousel-dot-height` | `dotHeight` | - |
| `@carousel-dot-active-width` | `dotActiveWidth` | - |

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

### Descriptions

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@descriptions-bg` | `labelBg` | - |
| `@descriptions-title-margin-bottom` | `titleMarginBottom` | - |
| `@descriptions-default-padding` | `padding`、`paddingLG` | GlobalToken, used as `${token.padding}px ${token.paddingLG}px` |
| `@descriptions-middle-padding` | `paddingSM`、`paddingLG` | GlobalToken, used as `${token.paddingSM}px ${token.paddingLG}px` |
| `@descriptions-small-padding` | `paddingXS`、`padding` | GlobalToken, used as `${token.paddingXS}px ${token.padding}px` |
| `@descriptions-item-padding-bottom` | `itemPaddingBottom` | - |
| `@descriptions-item-trailing-colon` | - | Deprecated for style change |
| `@descriptions-item-label-colon-margin-right` | `colonMarginRight` | - |
| `@descriptions-item-label-colon-margin-left` | `colonMarginLeft` | - |
| `@descriptions-extra-color` | `extraColor` | - |

<!-- ### Divider -->

### Drawer

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@drawer-bg` | `colorBgElevated` | GlobalToken |
| `@drawer-header-padding` | `padding`、`paddingLG` | GlobalToken, used as `${padding}px ${paddingLG}px` |
| `@drawer-title-font-size` | `fontSizeLG` | GlobalToken |
| `@drawer-title-line-height` | `lineHeightLG` | GlobalToken |
| `@drawer-body-padding` | `paddingLG` | GlobalToken |
| `@drawer-footer-padding-vertical` | `footerPaddingBlock` | `footerPaddingBlock`  is a number without units, `@drawer-footer-padding-vertical` with units |
| `@drawer-footer-padding-horizontal` | `footerPaddingInline` | `footerPaddingInline`  is a number without units, `@drawer-footer-padding-horizontal` with units |

### Dropdown

| Less variables                       | Component Token       | Note        |
| ------------------------------------ | --------------------- | ----------- |
| `@dropdown-selected-color`           | `colorPrimary`        | -           |
| `@dropdown-menu-submenu-disabled-bg` | `colorBgElevated`     | GlobalToken |
| `@dropdown-selected-bg`              | `controlItemBgActive` | GlobalToken |

### Empty

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@empty-font-size` | `fontSize` | GlobalToken |

<!-- ### Form -->

<!-- ### Image -->

<!-- ### Input -->

<!-- ### Layout -->

### List

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
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
| `@list-customize-card-bg` | - | Deprecated for style change |
| `@list-item-meta-description-font-size` | `descriptionFontSize` | - |

<!-- ### Mentions -->

<!-- ### Menu -->

### Message

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@zindex-message` | `zIndexPopup` | - |
| `@message-notice-content-padding` | `contentPadding` | - |
| `@message-notice-content-bg` | `contentBg` | - |

### Modal

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@modal-header-padding-vertical` | - | Deprecated for style change |
| `@modal-header-padding-horizontal` | - | Deprecated for style change |
| `@modal-body-padding` | - | Deprecated for style change |
| `@modal-header-bg` | `headerBg` | - |
| `@modal-header-padding` | - | Deprecated for style change |
| `@modal-header-border-width` | - | Deprecated for style change |
| `@modal-header-border-style` | - | Deprecated for style change |
| `@modal-header-title-line-height` | `titleLineHeight` | - |
| `@modal-header-title-font-size` | `titleFontSize` | - |
| `@modal-header-border-color-split` | - | Deprecated for style change |
| `@modal-header-close-size` | - | Deprecated for style change |
| `@modal-content-bg` | `contentBg` | - |
| `@modal-heading-color` | `titleColor` | - |
| `@modal-close-color` | `colorIcon` | GlobalToken |
| `@modal-footer-bg` | `footerBg` | - |
| `@modal-footer-border-color-split` | - | Deprecated for style change |
| `@modal-footer-border-style` | - | Deprecated for style change |
| `@modal-footer-padding-vertical` | - | Deprecated for style change |
| `@modal-footer-padding-horizontal` | - | Deprecated for style change |
| `@modal-footer-border-width` | - | Deprecated for style change |
| `@modal-mask-bg` | `colorBgMask` | GlobalToken |
| `@modal-confirm-body-padding` | - | Deprecated for style change |
| `@modal-confirm-title-font-size` | `titleFontSize` | - |
| `@modal-border-radius` | `borderRadiusLG` | GlobalToken |

<!-- ### Notification -->

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

### Result

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@result-icon-font-size` | `iconFontSize` | - |
| `@result-title-font-size` | `titleFontSize` | - |
| `@result-subtitle-font-size` | `subtitleFontSize` | - |
| `@result-extra-margin` | `extraMargin` | - |

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

### Statistic

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@statistic-title-font-size` | `titleFontSize` | - |
| `@statistic-content-font-size` | `contentFontSize` | - |
| `@statistic-font-family` | `fontFamily` | GlobalToken |

### Step

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@process-tail-color` | `colorSplit` | GlobalToken |
| `@steps-nav-arrow-color` | `navArrowColor` | - |
| `@steps-background` | `colorBgContainer` | - |
| `@steps-icon-size` | `iconSize` | - |
| `@steps-icon-custom-size` | `customIconSize` | - |
| `@steps-icon-custom-top` | `customIconTop` | - |
| `@steps-icon-custom-font-size` | `customIconFontSize` | - |
| `@steps-icon-top` | `iconTop` | - |
| `@steps-icon-font-size` | `iconFontSize` | - |
| `@steps-icon-margin` | - | Deprecated |
| `@steps-title-line-height` | `titleLineHeight` | - |
| `@steps-small-icon-size` | `iconSizeSM` | - |
| `@steps-small-icon-margin` | - | Deprecated |
| `@steps-dot-size` | `dotSize` | - |
| `@steps-dot-top` | - | Deprecated |
| `@steps-current-dot-size` | `dotCurrentSize` | - |
| `@steps-description-max-width` | `descriptionMaxWidth` | - |
| `@steps-nav-content-max-width` | `stepsNavContentMaxWidth` | - |
| `@steps-vertical-icon-width` | `iconSize` | - |
| `@steps-vertical-tail-width` | - | Deprecated |
| `@steps-vertical-tail-width-sm` | - | Deprecated |

<!-- ### Switch -->

<!-- ### Table -->

<!-- ### Tabs -->

## Tag

<!-- prettier-ignore -->
| less 变量 | Component Token | 备注 |
| --- | --- | --- |
| `@tag-border-radius` | `borderRadiusSM` | Global Token |
| `@tag-default-bg` | `defaultBg` | - |
| `@tag-default-color` | `defaultColor` | - |
| `@tag-font-size` | `fontSizeSM` | Global Token |
| `@tag-line-height` | `lineHeightSM` | Global Token |

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

### Upload

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@upload-actions-color` | `actionsColor` | - |
