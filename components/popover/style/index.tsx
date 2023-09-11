import { resetComponent } from '../../style';
import { initZoomMotion } from '../../style/motion';
import getArrowStyle from '../../style/placementArrow';
import type { FullToken, GenerateStyle, PresetColorType } from '../../theme/internal';
import { PresetColors, genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @deprecated Please use `titleMinWidth` instead
   * @desc 气泡卡片宽度
   * @descEN Width of Popover
   */
  width: number;
  /**
   * @deprecated Please use `titleMinWidth` instead
   * @desc 气泡卡片最小宽度
   * @descEN Min width of Popover
   */
  minWidth: number;
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
}

export type PopoverToken = FullToken<'Popover'> & {
  popoverBg: string;
  popoverColor: string;
  popoverPadding: number | string;
};

const genBaseStyle: GenerateStyle<PopoverToken> = (token) => {
  const {
    componentCls,
    popoverColor,
    titleMinWidth,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG: borderRadius,
    zIndexPopup,
    marginXS,
    colorBgElevated,
    popoverBg,
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
          borderRadius,
          boxShadow: boxShadowSecondary,
          padding: popoverPadding,
        },

        [`${componentCls}-title`]: {
          minWidth: titleMinWidth,
          marginBottom: marginXS,
          color: colorTextHeading,
          fontWeight: fontWeightStrong,
        },

        [`${componentCls}-inner-content`]: {
          color: popoverColor,
        },
      },
    },

    // Arrow Style
    getArrowStyle(token, {
      colorBg: 'var(--antd-arrow-background-color)',
    }),

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

const genWireframeStyle: GenerateStyle<PopoverToken> = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorSplit,
    paddingSM,
    controlHeight,
    fontSize,
    lineHeight,
    padding,
  } = token;

  const titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;

  return {
    [componentCls]: {
      [`${componentCls}-inner`]: {
        padding: 0,
      },

      [`${componentCls}-title`]: {
        margin: 0,
        padding: `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px`,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      },

      [`${componentCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizontal}px`,
      },
    },
  };
};

export default genComponentStyleHook(
  'Popover',
  (token) => {
    const { colorBgElevated, colorText, wireframe } = token;

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverPadding: 12, // Fixed Value
      popoverBg: colorBgElevated,
      popoverColor: colorText,
    });

    return [
      genBaseStyle(popoverToken),
      genColorStyle(popoverToken),
      wireframe && genWireframeStyle(popoverToken),
      initZoomMotion(popoverToken, 'zoom-big'),
    ];
  },
  (token) => ({
    width: 177,
    minWidth: 177,
    titleMinWidth: 177,
    zIndexPopup: token.zIndexPopupBase + 30,
  }),
  {
    resetStyle: false,
    deprecatedTokens: [
      ['width', 'titleMinWidth'],
      ['minWidth', 'titleMinWidth'],
    ],
  },
);
