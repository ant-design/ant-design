// deps-lint-skip-all
import { initZoomMotion } from '../../style/motion';
import type { FullToken, GenerateStyle, PresetColorType } from '../../theme';
import {
  genComponentStyleHook,
  getArrowStyle,
  mergeToken,
  PresetColors,
  resetComponent,
} from '../../theme';

export interface ComponentToken {
  zIndexPopup: number;
  width: number;
}

export type PopoverToken = FullToken<'Popover'> & {
  popoverBg: string;
  popoverColor: string;
  popoverPaddingHorizontal: number;
  popoverTitlePaddingBlockTop: number;
  popoverTitlePaddingBlockBottom: number;
};

const genBaseStyle: GenerateStyle<PopoverToken> = token => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    popoverPaddingHorizontal,
    popoverTitlePaddingBlockTop,
    popoverTitlePaddingBlockBottom,
    lineWidth,
    lineType,
    fontWeightStrong,

    boxShadow,
    colorSplit,
    colorTextHeading,
    radiusBase: borderRadius,
    paddingSM,
    zIndexPopup,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        zIndex: zIndexPopup,
        fontWeight: 'normal',
        whiteSpace: 'normal',
        textAlign: 'start',
        cursor: 'auto',
        userSelect: 'text',

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
          boxShadow,
        },

        [`${componentCls}-title`]: {
          minWidth: width,
          margin: 0,
          padding: `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px`,
          color: colorTextHeading,
          fontWeight: fontWeightStrong,
          borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
        },

        [`${componentCls}-inner-content`]: {
          padding: `${paddingSM}px ${popoverPaddingHorizontal}px`,
          color: popoverColor,
        },
      },
    },

    // Arrow Style
    getArrowStyle(token, token.colorBgElevated),
  ];
};

const genColorStyle: GenerateStyle<PopoverToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: PresetColors.map((colorKey: keyof PresetColorType) => {
      const lightColor = token[`${colorKey}-6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor,
          },
          [`${componentCls}-arrow`]: {
            background: 'transparent',

            '&:before': {
              backgroundColor: lightColor,
            },
          },
        },
      };
    }),
  };
};

export default genComponentStyleHook(
  'Popover',
  token => {
    const { controlHeight, fontSize, lineHeight, lineWidth, colorBgElevated } = token;
    const titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverBg: colorBgElevated,
      popoverColor: token.colorText,
      popoverTitlePaddingBlockTop: titlePaddingBlockDist / 2,
      popoverTitlePaddingBlockBottom: titlePaddingBlockDist / 2 - lineWidth,
      popoverPaddingHorizontal: token.padding,
    });

    return [
      genBaseStyle(popoverToken),
      genColorStyle(popoverToken),
      initZoomMotion(popoverToken, 'zoom-big'),
    ];
  },
  ({ zIndexPopupBase }) => ({
    zIndexPopup: zIndexPopupBase + 30,
    width: 177,
  }),
);
