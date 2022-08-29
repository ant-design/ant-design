import { initZoomMotion } from '../../style/motion';
import type { FullToken, GenerateStyle, PresetColorType } from '../../theme';
import { genComponentStyleHook, mergeToken, PresetColors } from '../../theme';
import { resetComponent } from '../../style';
import getArrowStyle from '../../style/placementArrow';

export interface ComponentToken {
  zIndexPopup: number;
  width: number;
}

export type PopoverToken = FullToken<'Popover'> & {
  popoverBg: string;
  popoverColor: string;
  popoverPadding: number;
};

const genBaseStyle: GenerateStyle<PopoverToken> = token => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    radiusLG: borderRadius,
    zIndexPopup,
    marginXS,
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
    getArrowStyle(token, token.colorBgElevated),

    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: 'relative',
        maxWidth: 'none',

        [`${componentCls}-content`]: {
          display: 'inline-block',
        },
      },
    },
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
    const { colorBgElevated, colorText, paddingSM } = token;

    const popoverToken = mergeToken<PopoverToken>(token, {
      popoverBg: colorBgElevated,
      popoverColor: colorText,
      popoverPadding: paddingSM,
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
