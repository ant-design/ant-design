export interface PresetColorType {
  blue: string;
  purple: string;
  cyan: string;
  green: string;
  magenta: string;
  pink: string;
  red: string;
  orange: string;
  yellow: string;
  volcano: string;
  geekblue: string;
  lime: string;
  gold: string;
}

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
export interface DerivativeToken extends SeedToken {
  // Color
  colorPrimaryHover: string;
  colorPrimaryActive: string;
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
export interface AliasToken {}
