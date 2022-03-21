import * as React from 'react';

export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

type PresetColorKey = typeof PresetColors[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColorPalettes = {
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};

export interface OverrideToken {
  derivative: Partial<DerivativeToken & AliasToken>;
  [componentName: string]: object; // FIXME: tmp of component token
}

// ======================================================================
// ==                            Seed Token                            ==
// ======================================================================

export interface SeedToken extends PresetColorType {
  // Color
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorText: string;
  colorTextLightSolid: string;
  colorBg: string;

  // Font
  fontFamily: string;
  fontSizeBase: number;

  // Grid
  gridUnit: number;
  gridBaseStep: number;

  // Line
  lineWidth: number;

  // Motion
  motionUnit: number;
  motionBaseStep: number;
  motionEaseInOutCirc: string;
  motionEaseInOut: string;
  motionEaseOutBack: string;
  motionEaseInQuint: string;
  motionEaseOutQuint: string;

  // Radius
  radiusBase: number;

  // Size
  sizeUnit: number;
  sizeBaseStep: number;
}

// ======================================================================
// ==                         Derivative Token                         ==
// ======================================================================

export interface DerivativeToken extends SeedToken, ColorPalettes {
  // Color
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorWarningHover: string;
  colorWarningActive: string;
  colorErrorHover: string;
  colorErrorActive: string;

  colorText2: string;
  colorTextBelow: string;
  colorTextBelow2: string;
  colorTextBelow3: string;

  colorBgBelow: string;
  colorBgBelow2: string;

  // Font
  fontSizeSM: number;
  fontSizeLG: number;
  fontSize: number;
  fontSizeXL: number;

  // Size
  sizeSpace: number;
  sizeSpaceXS: number;
  sizeSpaceXXS: number;
  sizeSpaceSM: number;

  // Grid
  gridSpaceSM: number;
  gridSpaceBase: number;
  gridSpaceLG: number;
  gridSpaceXL: number;
  gridSpaceXXL: number;

  // Motion
  motionDurationBase: string;
  motionDurationMd: string;
  motionDurationFast: string;
  motionDurationSlow: string;
  fontHeight: number;

  // Radius
  radiusSM: number;
  radiusLG: number;
  radiusXL: number;
}

// ======================================================================
// ==                           Alias Token                            ==
// ======================================================================
// FIXME: DerivativeToken should part pick
export interface AliasToken extends DerivativeToken {
  // =============== Legacy: should be remove ===============
  primaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;

  lineHeight: number;
  borderWidth: number;
  borderStyle: string;
  borderRadius: number;
  borderColor: string;
  borderColorSplit: string;

  easeInOut: string;
  easeInOutCirc: string;
  easeOutBack: string;
  easeInQuint: string;
  easeOutQuint: string;

  outlineWidth: number;
  outlineBlurSize: number;

  fontSize: number;
  fontFamily: string;
  textColor: string;
  textColorSecondary: string;
  textColorDisabled: string;
  textColorInverse: string;
  placeholderColor: string;

  disabledColor: string;

  iconColorHover: string;

  headingColor: string;

  itemHoverBackground: string;

  controlHeight: number;

  padding: number;
  margin: number;

  background: string;
  backgroundLight: string;

  componentBackground: string;
  componentBackgroundDisabled: string;

  zIndexDropdown: number;

  boxShadow?: string;

  // =============== Legacy: should be remove ===============
  primaryHoverColor: string;
  primaryActiveColor: string;
  primaryOutlineColor: string;
  errorHoverColor: string;
  errorActiveColor: string;
  errorOutlineColor: string;
  warningHoverColor: string;
  warningOutlineColor: string;
  itemActiveBackground: string;

  highlightColor: string;

  linkColor: string;
  linkHoverColor: string;
  linkActiveColor: string;
  linkDecoration: React.CSSProperties['textDecoration'];
  linkHoverDecoration: React.CSSProperties['textDecoration'];
  linkFocusDecoration: React.CSSProperties['textDecoration'];

  fontSizeSM: number;
  fontSizeLG: number;
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;
  paddingSM: number;
  paddingXS: number;
  paddingXXS: number;
  paddingLG: number;
  marginXS: number;
  marginLG: number;
  marginXXS: number;

  duration: string;
  durationMid: string;
  durationFast: string;

  heading1Size: number;
  heading2Size: number;
  heading3Size: number;
  heading4Size: number;
  heading5Size: number;

  primaryColors: string[];
  errorColors: string[];
  warningColors: string[];

  // TMP
  tmpPrimaryColorWeak: string;
  tmpPrimaryHoverColorWeak: string;
  // Checked background for Checkable Tag
  tmpPrimaryColor6: string;
  // Active background for Checkable Tag
  tmpPrimaryColor7: string;

  tmpSuccessColorDeprecatedBg: string;
  tmpWarningColorDeprecatedBg: string;
  tmpErrorColorDeprecatedBg: string;
  tmpInfoColorDeprecatedBg: string;

  tmpSuccessColorDeprecatedBorder: string;
  tmpWarningColorDeprecatedBorder: string;
  tmpErrorColorDeprecatedBorder: string;
  tmpInfoColorDeprecatedBorder: string;
}
