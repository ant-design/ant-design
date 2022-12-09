import type * as React from 'react';
import type { MapToken } from './maps';

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// 🔥🔥🔥🔥🔥🔥🔥 DO NOT MODIFY THIS. PLEASE CONTACT DESIGNER. 🔥🔥🔥🔥🔥🔥🔥

export interface AliasToken extends MapToken {
  // Background
  colorFillContentHover: string;
  colorFillAlter: string;
  colorFillContent: string;

  colorBgContainerDisabled: string;
  colorBgTextHover: string;
  colorBgTextActive: string;

  // Border
  colorBorderBg: string;
  /**
   * @nameZH 分割线颜色
   * @desc 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。
   */
  colorSplit: string;

  // Text
  colorTextPlaceholder: string;
  colorTextDisabled: string;
  colorTextHeading: string;
  colorTextLabel: string;
  colorTextDescription: string;
  colorTextLightSolid: string;

  /** Weak action. Such as `allowClear` or Alert close button */
  colorIcon: string;
  /** Weak action hover color. Such as `allowClear` or Alert close button */
  colorIconHover: string;

  colorLink: string;
  colorLinkHover: string;
  colorLinkActive: string;

  colorHighlight: string;

  controlOutline: string;
  colorWarningOutline: string;
  colorErrorOutline: string;

  // Font
  /** Operation icon in Select, Cascader, etc. icon fontSize. Normal is same as fontSizeSM */
  fontSizeIcon: number;

  /** For heading like h1, h2, h3 or option selected item */
  fontWeightStrong: number;

  // Control
  controlOutlineWidth: number;
  controlItemBgHover: string; // Note. It also is a color
  controlItemBgActive: string; // Note. It also is a color
  controlItemBgActiveHover: string; // Note. It also is a color
  controlInteractiveSize: number;
  controlItemBgActiveDisabled: string; // Note. It also is a color

  // Padding
  paddingXXS: number;
  paddingXS: number;
  paddingSM: number;
  padding: number;
  paddingMD: number;
  paddingLG: number;
  paddingXL: number;

  // Padding Content
  paddingContentHorizontalLG: number;
  paddingContentHorizontal: number;
  paddingContentHorizontalSM: number;
  paddingContentVerticalLG: number;
  paddingContentVertical: number;
  paddingContentVerticalSM: number;

  // Margin
  marginXXS: number;
  marginXS: number;
  marginSM: number;
  margin: number;
  marginMD: number;
  marginLG: number;
  marginXL: number;
  marginXXL: number;

  // =============== Legacy: should be remove ===============
  opacityLoading: number;

  boxShadow: string;
  boxShadowSecondary: string;

  linkDecoration: React.CSSProperties['textDecoration'];
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;

  // Media queries breakpoints
  screenXS: number;
  screenXSMin: number;
  screenXSMax: number;
  screenSM: number;
  screenSMMin: number;
  screenSMMax: number;
  screenMD: number;
  screenMDMin: number;
  screenMDMax: number;
  screenLG: number;
  screenLGMin: number;
  screenLGMax: number;
  screenXL: number;
  screenXLMin: number;
  screenXLMax: number;
  screenXXL: number;
  screenXXLMin: number;

  /** Used for DefaultButton, Switch which has default outline */
  controlTmpOutline: string;

  // FIXME: component box-shadow, should be removed
  /** @internal */
  boxShadowPopoverArrow: string;
  /** @internal */
  boxShadowCard: string;
  /** @internal */
  boxShadowDrawerRight: string;
  /** @internal */
  boxShadowDrawerLeft: string;
  /** @internal */
  boxShadowDrawerUp: string;
  /** @internal */
  boxShadowDrawerDown: string;
  /** @internal */
  boxShadowTabsOverflowLeft: string;
  /** @internal */
  boxShadowTabsOverflowRight: string;
  /** @internal */
  boxShadowTabsOverflowTop: string;
  /** @internal */
  boxShadowTabsOverflowBottom: string;
}
