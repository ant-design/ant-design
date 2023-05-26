---
order: 9
title: Migrate Less variables to Component Token
---

This document contains the correspondence between all the less variables related to components in version 4.x and the Component Token in version 5.x. If you are upgrading from version 4.x to version 5.x, you can quickly find the corresponding Component Token through this comparison table.

<Alert message="Note: There are still some less variables that do not have a corresponding Component Token, and these variables have been deprecated in version 5.x."></Alert>

<!-- ## 全局变量 -->

## Component Token

<!-- ### Alert -->

<!-- ### Anchor -->

<!-- ### Avatar -->

<!-- ### Badge -->

<!-- ### BreadCrumb -->

<!-- ### Button -->

<!-- ### Calendar -->

<!-- ### Card -->

<!-- ### Carousel -->

<!-- ### Cascader -->

<!-- ### Checkbox -->

<!-- ### Collapse -->

<!-- ### Descriptions -->

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

<!-- ### Dropdown -->

<!-- ### Empty -->

<!-- ### Form -->

<!-- ### Image -->

<!-- ### Input -->

<!-- ### Layout -->

<!-- ### List -->

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

<!-- ### Rate -->

### Result

<!-- prettier-ignore -->
| Less variables | Component Token | Note |
| --- | --- | --- |
| `@result-icon-font-size` | `iconFontSize` | - |
| `@result-title-font-size` | `titleFontSize` | - |
| `@result-subtitle-font-size` | `subtitleFontSize` | - |
| `@result-extra-margin` | `extraMargin` | - |

<!-- ### Segment -->

<!-- ### Select -->

<!-- ### Skeleton -->

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

<!-- ### Tag -->

<!-- ### Timeline -->

<!-- ### TimePicker -->

<!-- ### Tooltip -->

<!-- ### Transfer -->

<!-- ### Tree -->

<!-- ### Typography -->

<!-- ### Upload -->
