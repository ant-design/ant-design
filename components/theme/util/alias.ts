import { TinyColor } from '@ctrl/tinycolor';
import type { AliasToken, MapToken, OverrideToken } from '../interface';

/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = MapToken & OverrideToken;

/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
export default function formatToken(derivativeToken: RawMergedToken): AliasToken {
  const { derivative, alias, ...restToken } = derivativeToken;

  const mergedToken = {
    ...restToken,
    ...derivative,
  };

  const { fontSizes, lineHeights } = mergedToken;
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

    colorLink: mergedToken.colorPrimaryText,
    colorLinkHover: mergedToken.colorPrimaryTextHover,
    colorLinkActive: mergedToken.colorPrimaryActive,

    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,

    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,

    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorHighlight: mergedToken.colorError,

    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,

    colorErrorOutline: mergedToken.colorErrorBg,
    colorWarningOutline: mergedToken.colorWarningBg,

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
    lineHeightSM: lineHeights[0],

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],

    // Control
    controlLineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,

    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorTextQuaternary,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: mergedToken.colorPrimaryBg,

    controlLineType: mergedToken.lineType,
    controlRadius: mergedToken.radiusBase,
    controlRadiusXS: mergedToken.radiusXS,
    controlRadiusSM: mergedToken.radiusSM,
    controlRadiusLG: mergedToken.radiusLG,

    fontWeightStrong: 600,

    opacityLoading: 0.65,

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
    paddingXL: 32,

    marginXXS: 4,
    marginXS: 8,
    marginSM: 12,
    marginLG: 24,
    marginXL: 32,
    marginXXL: 48,

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

    // FIXME: component box-shadow, should be removed
    boxShadowPopoverArrow: `3px 3px 7px rgba(0, 0, 0, 0.1)`,
    boxShadowPopoverArrowBottom: `2px 2px 5px rgba(0, 0, 0, 0.1)`,
    boxShadowSegmentedSelectedItem: [
      `0 2px 8px -2px ${new TinyColor('#000').setAlpha(0.05).toRgbString()}`,
      `0 1px 4px -1px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
      `0 0 1px 0 ${new TinyColor('#000').setAlpha(0.08).toRgbString()}`,
    ].join(','),
    boxShadowCard: `
      0 1px 2px -2px ${new TinyColor('rgba(0, 0, 0, 0.16)').toRgbString()},
      0 3px 6px 0 ${new TinyColor('rgba(0, 0, 0, 0.12)').toRgbString()},
      0 5px 12px 4px ${new TinyColor('rgba(0, 0, 0, 0.09)').toRgbString()}
    `,
    boxShadowDrawerRight:
      '6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),12px 0 48px 16px rgba(0, 0, 0, 0.03)',
    boxShadowDrawerLeft:
      '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
    boxShadowDrawerUp:
      '0 -6px 16px -8px rgba(0, 0, 0, 0.32), 0 -9px 28px 0 rgba(0, 0, 0, 0.2),0 -12px 48px 16px rgba(0, 0, 0, 0.12)',
    boxShadowDrawerDown:
      '0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)',
    boxShadowTabsOverflowLeft: `inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)`,
    boxShadowTabsOverflowRight: `inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)`,
    boxShadowTabsOverflowTop: `inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)`,
    boxShadowTabsOverflowBottom: `inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)`,

    // Override AliasToken
    ...alias,
  };

  return aliasToken;
}
