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

  // Generate alias token
  const aliasToken: AliasToken = {
    ...mergedToken,

    // Colors
    primaryHoverColor: mergedToken.colorPrimaryHover,
    primaryActiveColor: mergedToken.colorPrimaryActive,
    errorHoverColor: mergedToken.colorErrorHover,
    errorActiveColor: mergedToken.colorErrorActive,
    warningHoverColor: mergedToken.colorWarningHover,

    // Font
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],

    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],

    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥 All TMP Token leaves here 🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // FIXME: Handle this when derivative is ready
    primaryColors,
    warningColors,
    errorColors,

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

    primaryOutlineColor: new TinyColor(mergedToken.colorPrimary).setAlpha(0.2).toRgbString(),
    errorOutlineColor: new TinyColor(mergedToken.colorError).setAlpha(0.2).toRgbString(),
    warningOutlineColor: new TinyColor(mergedToken.colorWarning).setAlpha(0.2).toRgbString(),

    itemActiveBackground: primaryColors[0],

    highlightColor: errorColors[5], // FIXME: Should not align with error color
    // FIXME: fix2 badge-color

    linkColor: mergedToken.colorPrimary,
    linkHoverColor: primaryColors[4],
    linkActiveColor: primaryColors[6],
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',

    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    borderColor: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(),

    outlineWidth: 2,
    outlineBlurSize: 0,

    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
    textColorSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    textColorDisabled: new TinyColor('#000').setAlpha(0.25).toRgbString(),
    textColorInverse: '#fff',
    placeholderColor: new TinyColor({ h: 0, s: 0, v: 75 }).setAlpha(0.5).toRgbString(),

    disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(),

    headingColor: new TinyColor('#000').setAlpha(0.85).toRgbString(),

    iconColorHover: new TinyColor('#000').setAlpha(0.75).toRgbString(),

    itemHoverBackground: '#f5f5f5',

    controlHeightSM: 24,
    controlHeightXS: 16,
    controlHeightLG: 40,
    controlPaddingHorizontal: 16,
    controlPaddingHorizontalSM: 12,

    padding: 16,
    margin: 16,

    paddingXXS: 2,
    paddingXS: 4,
    paddingSM: 8,
    paddingLG: 32,

    marginXXS: 2,
    marginXS: 4,
    // marginSM: 8,
    marginLG: 32,

    // Default grey background color
    background: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

    // background of header and selected item
    backgroundLight: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(),

    componentBackground: '#fff',
    componentBackgroundDisabled: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

    duration: '0.3s',
    durationMid: '0.2s',
    durationFast: '0.1s',

    zIndexDropdown: 1050,
  };

  return aliasToken;
}
