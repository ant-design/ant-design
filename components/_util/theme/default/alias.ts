import { TinyColor } from '@ctrl/tinycolor';
import { generate } from '@ant-design/colors';
import { CSSObject } from '@ant-design/cssinjs';
import { DesignToken } from './index';

export interface AliasToken {
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
  linkDecoration: CSSObject['textDecoration'];
  linkHoverDecoration: CSSObject['textDecoration'];
  linkFocusDecoration: CSSObject['textDecoration'];

  controlHeight: number;
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;

  paddingSM: number;
  paddingXS: number;
  paddingXXS: number;
  paddingLG: number;
  marginXS: number;
  marginLG: number;
  marginXXS: number;

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

  zIndexDropdown: number;
  boxShadow?: string;
  outlineBlurSize: number;
}

// ===================== Alias Parts ======================
function alias(designToken: DesignToken): AliasToken {
  const {
    colorPrimary,
    colorError,
    colorWarning,
    colorInfo,
    colorSuccess,
    sizeSpaceSM,
    sizeSpaceXS,
    fontSize,
    sizeUnit,
    sizeBaseStep,
  } = designToken;
  const primaryColors = generate(colorPrimary);
  const errorColors = generate(colorError);
  const warningColors = generate(colorWarning);
  const infoColors = generate(colorInfo);
  const successColors = generate(colorSuccess);

  const controlHeight = 32;
  return {
    zIndexDropdown: 1050,

    // =============== Legacy: should be remove ===============
    // FIXME: Need design token
    boxShadow: `
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
    outlineBlurSize: 0,

    ...designToken,

    primaryHoverColor: primaryColors[4],
    primaryActiveColor: primaryColors[6],
    primaryOutlineColor: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),

    errorHoverColor: errorColors[4],
    errorActiveColor: errorColors[6],
    errorOutlineColor: new TinyColor(colorError).setAlpha(0.2).toRgbString(),

    warningHoverColor: warningColors[4],
    warningOutlineColor: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),

    highlightColor: errorColors[4], // FIXME: Should not align with error color

    itemActiveBackground: primaryColors[0],

    linkColor: colorPrimary,
    linkHoverColor: primaryColors[4],
    linkActiveColor: primaryColors[6],
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',

    controlHeight,
    controlHeightXS: controlHeight / 2,
    controlHeightSM: controlHeight * 0.75,
    controlHeightLG: controlHeight * 1.25,

    paddingSM: sizeSpaceSM,
    paddingXS: sizeSpaceXS,
    paddingXXS: sizeUnit * (sizeBaseStep - 3),
    paddingLG: sizeUnit * (sizeBaseStep + 2),
    marginXS: sizeUnit * (sizeBaseStep - 2),
    marginLG: sizeUnit * (sizeBaseStep + 2),
    marginXXS: sizeUnit * (sizeBaseStep - 3),

    heading1Size: Math.ceil(fontSize * 2.71),
    heading2Size: Math.ceil(fontSize * 2.14),
    heading3Size: Math.ceil(fontSize * 1.71),
    heading4Size: Math.ceil(fontSize * 1.42),
    heading5Size: Math.ceil(fontSize * 1.14),

    primaryColors,
    errorColors,
    warningColors,

    // TMP
    tmpPrimaryColorWeak: primaryColors[2],
    tmpPrimaryHoverColorWeak: primaryColors[0],
    tmpPrimaryColor6: primaryColors[5],
    tmpPrimaryColor7: primaryColors[6],

    tmpSuccessColorDeprecatedBg: successColors[0],
    tmpWarningColorDeprecatedBg: warningColors[0],
    tmpErrorColorDeprecatedBg: errorColors[0],
    tmpInfoColorDeprecatedBg: infoColors[0],

    tmpSuccessColorDeprecatedBorder: successColors[2],
    tmpWarningColorDeprecatedBorder: warningColors[2],
    tmpErrorColorDeprecatedBorder: errorColors[2],
    tmpInfoColorDeprecatedBorder: infoColors[2],

    // colorBorder: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),
    // colorBorderSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(),
    // controlHeight: 32,
    //
    // controlLineType: 'solid',
    // controlOutlineWidthActive: 2,
    // controlRadius: designToken.radiusBase,
    // controlItemBgHover: '#f5f5f5',
    // // https://github.com/ant-design/ant-design/issues/20210
    // fontLineHeight: 1.5715,
    // colorTextPlaceholder: new TinyColor({ h: 0, s: 0, v: 75 }).setAlpha(0.5).toRgbString(),
    // colorTextSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    // colorTextDisabled: designToken.colorTextBelow2,
    // colorBgComponent: '#fff',
    //
    // colorBgComponentDisabled: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),
    // // background of header and selected item
    // colorBgHover: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(),
    //
    // colorHeading: new TinyColor('#000').setAlpha(0.85).toRgbString(),
    // colorIconHover: new TinyColor('#000').setAlpha(0.75).toRgbString(),
    //
    // colorBgContainer: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),
  };
}

export default alias;
