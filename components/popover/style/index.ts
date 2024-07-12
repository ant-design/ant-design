import { resetComponent } from '../../style';
import { initZoomMotion } from '../../style/motion';
import type { ArrowOffsetToken } from '../../style/placementArrow';
import getArrowStyle, { getArrowOffsetToken } from '../../style/placementArrow';
import type { ArrowToken } from '../../style/roundedArrow';
import { getArrowToken } from '../../style/roundedArrow';
import type {
  FullToken,
  GenerateStyle,
  GetDefaultToken,
  PresetColorType,
} from '../../theme/internal';
import { genStyleHooks, mergeToken, PresetColors } from '../../theme/internal';

export interface ComponentToken extends ArrowToken, ArrowOffsetToken {
  /**
   * @deprecated Please use `titleMinWidth` instead
   * @desc 气泡卡片宽度
   * @descEN Width of Popover
   */
  width?: number;
  /**
   * @deprecated Please use `titleMinWidth` instead
   * @desc 气泡卡片最小宽度
   * @descEN Min width of Popover
   */
  minWidth?: number;
  /**
   * @desc 气泡卡片标题最小宽度
   * @descEN Min width of Popover title
   */
  titleMinWidth: number;
  /**
   * @desc 气泡卡片 z-index
   * @descEN z-index of Popover
   */
  zIndexPopup: number;
  /** @internal */
  innerPadding: number;
  /** @internal */
  titlePadding: number | string;
  /** @internal */
  titleMarginBottom: number;
  /** @internal */
  titleBorderBottom: string;
  /** @internal */
  innerContentPadding: number | string;
}

export type PopoverToken = FullToken<'Popover'> & {
  popoverBg: string;
  popoverColor: string;
};

const genBaseStyle: GenerateStyle<PopoverToken> = (token) => {
  const {
    componentCls,
    popoverColor,
    titleMinWidth,
    fontWeightStrong,
    innerPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG,
    zIndexPopup,
    titleMarginBottom,
    colorBgElevated,
    popoverBg,
    titleBorderBottom,
    innerContentPadding,
    titlePadding,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        top: 0,
        // use `left` to fix https://github.com/ant-design/ant-design/issues/39195
        left: {
          _skip_check_: true,
          value: 0,
        },
        zIndex: zIndexPopup,
        fontWeight: 'normal',
        whiteSpace: 'normal',
        textAlign: 'start',
        cursor: 'auto',
        userSelect: 'text',
        transformOrigin: `var(--arrow-x, 50%) var(--arrow-y, 50%)`,
        '--antd-arrow-background-color': colorBgElevated,
        width: 'max-content',
        maxWidth: '100vw',

        '&-rtl': {
          direction: 'rtl',
        },

        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-content`]: {
          position: 'relative',
        },

        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: 'padding-box',
          borderRadius: borderRadiusLG,
          boxShadow: boxShadowSecondary,
          padding: innerPadding,
        },

        [`${componentCls}-title`]: {
          minWidth: titleMinWidth,
          marginBottom: titleMarginBottom,
          color: colorTextHeading,
          fontWeight: fontWeightStrong,
          borderBottom: titleBorderBottom,
          padding: titlePadding,
        },

        [`${componentCls}-inner-content`]: {
          color: popoverColor,
          padding: innerContentPadding,
        },
      },
    },

    // Arrow Style
    getArrowStyle(token, 'var(--antd-arrow-background-color)'),

    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: 'relative',
        maxWidth: 'none',
        margin: token.sizePopupArrow,
        display: 'inline-block',

        [`${componentCls}-content`]: {
          display: 'inline-block',
        },
      },
    },
  ];
};

const genColorStyle: GenerateStyle<PopoverToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: PresetColors.map((colorKey: keyof PresetColorType) => {
      const lightColor = token[`${colorKey}6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          '--antd-arrow-background-color': lightColor,
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor,
          },
          [`${componentCls}-arrow`]: {
            background: 'transparent',
          },
        },
      };
    }),
  };
};

export const prepareComponentToken: GetDefaultToken<'Popover'> = (token) => {
  const {
    lineWidth,
    controlHeight,
    fontHeight,
    padding,
    wireframe,
    zIndexPopupBase,
    borderRadiusLG,
    marginXS,
    lineType,
    colorSplit,
    paddingSM,
  } = token;

  const titlePaddingBlockDist = controlHeight - fontHeight;
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;

  return {
    titleMinWidth: 177,
    zIndexPopup: zIndexPopupBase + 30,
    ...getArrowToken(token),
    ...getArrowOffsetToken({
      contentRadius: borderRadiusLG,
      limitVerticalRadius: true,
    }),

    // internal
    innerPadding: wireframe ? 0 : 12,
    titleMarginBottom: wireframe ? 0 : marginXS,
    titlePadding: wireframe
      ? `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px`
      : 0,
    titleBorderBottom: wireframe ? `${lineWidth}px ${lineType} ${colorSplit}` : 'none',
    innerContentPadding: wireframe ? `${paddingSM}px ${popoverPaddingHorizontal}px` : 0,
  };
};

export default genStyleHooks(
  'Popover',
  (token) => {
    const { colorBgElevated, colorText } = token;

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverBg: colorBgElevated,
      popoverColor: colorText,
    });

    return [
      genBaseStyle(popoverToken),
      genColorStyle(popoverToken),
      initZoomMotion(popoverToken, 'zoom-big'),
    ];
  },
  prepareComponentToken,
  {
    resetStyle: false,
    deprecatedTokens: [
      ['width', 'titleMinWidth'],
      ['minWidth', 'titleMinWidth'],
    ],
  },
);
