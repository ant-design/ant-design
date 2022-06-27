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
  const { derivative, alias, ...restToken } = derivativeToken;

  const mergedToken = {
    ...restToken,
    ...derivative,
  };

  const { fontSizes, lineHeights, textColors, bgColors } = mergedToken;

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
    colorText: textColors['85'],
    // TODO: 只有 Slider 用了，感觉命名有问题
    colorTextSecondary: textColors['45'],
    // TODO: 这个 30 估计要改成 25
    colorTextDisabled: textColors['30'],
    colorTextPlaceholder: textColors['25'],
    colorTextHeading: textColors['85'],

    colorBgContainer: bgColors['0'],
    colorBgContainerSecondary: bgColors['26'],
    colorBgComponent: bgColors['8'],
    // TODO：Menu 用了这个 感觉命名有问题
    // TODO：能不能用透明色？用透明色会造成重叠后变亮的问题，是不是得用实色？
    colorBgComponentSecondary: textColors['4'],
    colorBgComponentDisabled: textColors['8'],
    // 浮窗等组件的背景色 token
    colorBgElevated: bgColors['12'],
    // TODO: Slider 和 Progress 需要一个名字
    colorBgComponentTmp: bgColors['15'],

    colorLink: mergedToken.colorPrimary,
    colorLinkHover: primaryColors[4],
    colorLinkActive: primaryColors[6],

    // TODO: 确认 Action 的色彩关系
    colorAction: textColors['45'],
    colorActionHover: textColors['75'],
    colorActionTmp: textColors['30'],

    // Split
    colorBorder: bgColors['26'],
    // TODO：Secondary 在纯实色背景下的颜色和 Split 是一样的
    colorBorderSecondary: bgColors['19'],
    colorSplit: textColors['12'],

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
    // TODO: 确认下 hover 是用 Alpha 还是实色
    // 暂时确认下来应该用 alpha
    controlLineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,

    controlItemBgHover: mergedToken.textColors['8'],
    controlItemBgActive: primaryColors[0],
    controlItemBgActiveHover: primaryColors[1],
    controlItemBgActiveDisabled: textColors['25'],
    controlMaskBg: textColors['45'],

    // 👀👀👀👀👀👀👀👀👀 Not align with Derivative 👀👀👀👀👀👀👀👀👀
    // FIXME: @arvinxx handle this
    controlLineType: mergedToken.lineType,
    controlRadius: mergedToken.radiusBase,
    fontWeightStrong: 600,

    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥 All TMP Token leaves here 🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // FIXME: Handle this when derivative is ready
    // primaryColors,
    // warningColors,
    // errorColors,

    opacityLoading: 0.65,

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

    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',

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
