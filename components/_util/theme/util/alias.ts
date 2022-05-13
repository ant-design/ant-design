import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import type { AliasToken, DerivativeToken, OverrideToken } from '../interface';

/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = DerivativeToken & OverrideToken;

/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
export default function formatToken(derivativeToken: RawMergedToken): AliasToken {
  const { derivative, ...restToken } = derivativeToken;

  const mergedToken = {
    ...restToken,
    ...derivative,
  };

  const { fontSizes, lineHeights } = mergedToken;

  // FIXME: tmp
  const primaryColors = generate(mergedToken.colorPrimary);
  const infoColors = generate(mergedToken.colorInfo);
  const successColors = generate(mergedToken.colorSuccess);
  const warningColors = generate(mergedToken.colorWarning);
  const errorColors = generate(mergedToken.colorError);
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;

  const fontSizeSM = fontSizes[0];

  // Generate alias token
  const aliasToken: AliasToken = {
    ...mergedToken,

    // Colors
    colorTextSecondary: mergedToken.colorTextBelow,
    colorTextDisabled: mergedToken.colorTextBelow2,
    colorPlaceholder: mergedToken.colorTextBelow2,
    colorTextHeading: mergedToken.colorText,

    colorBgContainer: mergedToken.colorBgBelow2,
    colorBgContainerSecondary: mergedToken.colorBg3,
    colorBgComponent: mergedToken.colorBg,
    colorBgComponentSecondary: mergedToken.colorBg2,
    colorBgComponentDisabled: mergedToken.colorBgBelow2,

    colorLink: mergedToken.colorPrimary,
    colorLinkHover: primaryColors[4],
    colorLinkActive: primaryColors[6],

    colorAction: mergedToken.colorTextBelow,
    colorActionHover: mergedToken.colorText,

    // Font
    fontSizeSM,
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    fontSizeIcon: fontSizeSM,

    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],

    // Control
    controlLineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    controlItemBgHover: mergedToken.colorBgBelow2,

    // 👀👀👀👀👀👀👀👀👀 Not align with Derivative 👀👀👀👀👀👀👀👀👀
    // FIXME: @arvinxx handle this
    controlLineType: 'solid',
    controlRadius: mergedToken.radiusBase,
    colorBorder: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),
    colorSplit: 'rgba(0, 0, 0, 0.06)',
    controlItemBgActive: primaryColors[0],
    fontWeightStrong: 600,

    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥 All TMP Token leaves here 🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // FIXME: Handle this when derivative is ready
    // primaryColors,
    // warningColors,
    // errorColors,

    colorLoadingOpacity: 0.65,

    colorSuccessSecondary: successColors[2],
    colorWarningSecondary: warningColors[2],
    colorErrorSecondary: errorColors[2],
    colorInfoSecondary: infoColors[2],

    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',

    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,

    padding: 16,
    margin: 16,

    paddingXXS: 4,
    paddingXS: 8,
    paddingSM: 12,
    paddingLG: 24,

    marginXXS: 4,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,

    boxShadow: `
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,

    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenXS - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenSM - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenMD - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenLG - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXL - 1,

    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

    colorPopupBg: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    colorBorderSecondary: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(),
  };

  return aliasToken;
}
