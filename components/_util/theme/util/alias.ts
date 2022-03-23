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
    colorTextSecondary: mergedToken.colorTextBelow,
    colorTextDisabled: mergedToken.colorTextBelow2,
    colorPlaceholder: mergedToken.colorTextBelow2,
    colorTextHeading: mergedToken.colorText,

    colorBgContainer: mergedToken.colorBgBelow2,
    colorBgComponent: mergedToken.colorBg,
    colorBgComponentDisabled: mergedToken.colorBgBelow2,

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

    // Control
    controlLineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    controlItemBgHover: mergedToken.colorBgBelow2,

    // 👀👀👀👀👀👀👀👀👀 Not align with Derivative 👀👀👀👀👀👀👀👀👀
    // FIXME: @arvinxx handle this
    controlLineType: 'solid',
    controlRadius: mergedToken.radiusBase,
    colorBorder: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),
    colorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(),
    controlItemBgActive: primaryColors[0],

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

    highlightColor: errorColors[5], // FIXME: Should not align with error color
    // FIXME: fix2 badge-color

    linkColor: mergedToken.colorPrimary,
    linkHoverColor: primaryColors[4],
    linkActiveColor: primaryColors[6],
    linkDecoration: 'none',
    linkHoverDecoration: 'none',
    linkFocusDecoration: 'none',

    iconColorHover: new TinyColor('#000').setAlpha(0.75).toRgbString(),

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

    // background of header and selected item
    backgroundLight: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(),

    zIndexDropdown: 1050,
    zIndexAffix: 10,

    boxShadow: `
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
  };

  return aliasToken;
}
