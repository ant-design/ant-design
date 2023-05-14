import { resetComponent } from '../../style';
import { initZoomMotion } from '../../style/motion';
import getArrowStyle from '../../style/placementArrow';
import type { FullToken, GenerateStyle, PresetColorType } from '../../theme/internal';
import { PresetColors, genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  popoverBg: string;
  popoverColor: string;
  minWidth: number;
  minHeight: number;
  arrowWidth: number;
  arrowColor: string;
  arrowOuterColor: string;
  distance: number;
  paddingHorizontal: number;
}

export type PopoverToken = FullToken<'Popover'> & {
  zIndexPopup: number;
  width: number;
  popoverPadding: number | string;
};

const genBaseStyle: GenerateStyle<PopoverToken> = (token) => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG: borderRadius,
    zIndexPopup,
    marginXS,
    colorBgElevated,
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
          minWidth: width,
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
    const { wireframe, zIndexPopupBase } = token;

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverPadding: 12, // Fixed Value
      zIndexPopup: zIndexPopupBase + 30,
      width: 177,
    });

    return [
      genBaseStyle(popoverToken),
      genColorStyle(popoverToken),
      wireframe && genWireframeStyle(popoverToken),
      initZoomMotion(popoverToken, 'zoom-big'),
    ];
  },
  (token) => ({
    popoverBg: token.colorBgElevated,
    popoverColor: token.colorText,
    minWidth: 177,
    minHeight: 32,
    arrowWidth: token.sizePopupArrow,
    arrowColor: token.colorBgElevated,
    arrowOuterColor: token.colorBgElevated,
    distance: token.sizePopupArrow + 4,
    paddingHorizontal: token.paddingMD,
  }),
);
