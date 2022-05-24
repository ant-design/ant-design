// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle, PresetColorType } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, PresetColors, resetComponent } from '../../_util/theme';
import getArrowStyle from './arrow';

export interface ComponentToken {
  zIndexPopup: number;
}

export type PopoverToken = FullToken<'Popover'> & {
  popoverBg: string;
  popoverColor: string;
  popoverMinWidth: number;
  popoverMinHeight: number;
  popoverPaddingHorizontal: number;
};

const genBaseStyle: GenerateStyle<PopoverToken> = token => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    popoverMinWidth,
    popoverMinHeight,
    popoverPaddingHorizontal,

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

        '&::after': {
          position: 'absolute',
          // FIXME
          background: new TinyColor('#fff').setAlpha(0.01).toRgbString(),
          content: '""',
        },

        '&-rtl': {
          direction: 'rtl',
        },

        '&-hidden': {
          display: 'none',
        },

        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: 'padding-box',
          borderRadius,
          boxShadow,
        },

        [`${componentCls}-title`]: {
          minWidth: popoverMinWidth,
          minHeight: popoverMinHeight,
          margin: 0,
          // FIXME
          padding: `5px ${popoverPaddingHorizontal}px 4px`,
          color: colorTextHeading,
          fontWeight: 500,
          // FIXME
          borderBottom: `1px solid ${colorSplit}`,
        },

        [`${componentCls}-inner-content`]: {
          padding: `${paddingSM}px ${popoverPaddingHorizontal}px`,
          color: popoverColor,
        },

        // [`${componentCls}-arrow`]: {
        //   position: 'absolute',
        //   display: 'block',
        //   width: sizePopupArrow,
        //   height: sizePopupArrow,
        //   overflow: 'hidden',
        //   background: 'transparent',
        //   pointerEvents: 'none',

        //   '&-content': {
        //     position: 'absolute',
        //     top: 0,
        //     insetInlineEnd: 0,
        //     bottom: 0,
        //     insetInlineStart: 0,
        //     display: 'block',
        //     width: sizePopupArrow,
        //     height: sizePopupArrow,
        //     margin: 'auto',
        //     backgroundColor: popoverBg,
        //     content: '""',
        //     pointerEvents: 'auto',
        //     ...roundedArrow(sizePopupArrow, 5, popoverBg),
        //   },
        // },
      },
    },

    // Arrow Style
    getArrowStyle(token, popoverBg),
  ];
};

// FIXME: special preset colors
const genColorStyle: GenerateStyle<PopoverToken> = token => {
  const { componentCls } = token;

  return PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const lightColor = token[`${colorKey}-6`];
    return {
      ...prev,
      [`${componentCls}-${colorKey}`]: {
        [`${componentCls}-inner`]: {
          backgroundColor: lightColor,
        },
        [`${componentCls}-arrow`]: {
          '&-content': {
            backgroundColor: lightColor,
          },
        },
      },
    };
  }, {} as CSSObject);
};

export default genComponentStyleHook(
  'Popover',
  token => {
    const popoverBg = token.colorBgComponent;
    // FIXME

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverBg,
      popoverColor: token.colorText,
      // FIXME
      popoverMinWidth: 177,
      popoverMinHeight: 32,
      popoverPaddingHorizontal: token.padding,
    });

    return [genBaseStyle(popoverToken), genColorStyle(popoverToken)];
  },
  ({ zIndexPopupBase }) => ({
    zIndexPopup: zIndexPopupBase + 30,
  }),
);
