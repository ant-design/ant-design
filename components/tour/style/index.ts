import { TinyColor } from '@ctrl/tinycolor';

import { resetComponent } from '../../style';
import getArrowStyle, { MAX_VERTICAL_CONTENT_RADIUS } from '../../style/placementArrow';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface TourToken extends FullToken<'Tour'> {
  tourZIndexPopup: number;
  indicatorWidth: number;
  indicatorHeight: number;
  tourBorderRadius: number;
  tourCloseSize: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TourToken> = (token) => {
  const {
    componentCls,
    lineHeight,
    padding,
    paddingXS,
    borderRadius,
    borderRadiusXS,
    colorPrimary,
    colorText,
    colorFill,
    indicatorHeight,
    indicatorWidth,
    boxShadowTertiary,
    tourZIndexPopup,
    fontSize,
    colorBgElevated,
    fontWeightStrong,
    marginXS,
    colorTextLightSolid,
    tourBorderRadius,
    colorWhite,
    colorBgTextHover,
    tourCloseSize,
    motionDurationSlow,
    antCls,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),

        color: colorText,
        position: 'absolute',
        zIndex: tourZIndexPopup,
        display: 'block',
        visibility: 'visible',
        fontSize,
        lineHeight,
        width: 520,
        '--antd-arrow-background-color': colorBgElevated,

        '&-pure': {
          maxWidth: '100%',
          position: 'relative',
        },

        [`&${componentCls}-hidden`]: {
          display: 'none',
        },

        // ============================= panel content ============================
        [`${componentCls}-content`]: {
          position: 'relative',
        },
        [`${componentCls}-inner`]: {
          textAlign: 'start',
          textDecoration: 'none',
          borderRadius: tourBorderRadius,
          boxShadow: boxShadowTertiary,
          position: 'relative',
          backgroundColor: colorBgElevated,
          border: 'none',
          backgroundClip: 'padding-box',

          [`${componentCls}-close`]: {
            position: 'absolute',
            top: padding,
            insetInlineEnd: padding,
            color: token.colorIcon,
            outline: 'none',
            width: tourCloseSize,
            height: tourCloseSize,
            borderRadius: token.borderRadiusSM,
            transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '&:hover': {
              color: token.colorIconHover,
              backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent,
            },
          },

          [`${componentCls}-cover`]: {
            textAlign: 'center',
            padding: `${padding + tourCloseSize + paddingXS}px ${padding}px 0`,
            img: {
              width: '100%',
            },
          },
          [`${componentCls}-header`]: {
            padding: `${padding}px ${padding}px ${paddingXS}px`,

            [`${componentCls}-title`]: {
              lineHeight,
              fontSize,
              fontWeight: fontWeightStrong,
            },
          },

          [`${componentCls}-description`]: {
            padding: `0 ${padding}px`,
            lineHeight,
            wordWrap: 'break-word',
          },

          [`${componentCls}-footer`]: {
            padding: `${paddingXS}px ${padding}px ${padding}px`,
            textAlign: 'end',
            borderRadius: `0 0 ${borderRadiusXS}px ${borderRadiusXS}px`,
            display: 'flex',
            [`${componentCls}-indicators`]: {
              display: 'inline-block',

              [`${componentCls}-indicator`]: {
                width: indicatorWidth,
                height: indicatorHeight,
                display: 'inline-block',
                borderRadius: '50%',
                background: colorFill,
                '&:not(:last-child)': {
                  marginInlineEnd: indicatorHeight,
                },
                '&-active': {
                  background: colorPrimary,
                },
              },
            },
            [`${componentCls}-buttons`]: {
              marginInlineStart: 'auto',
              [`${antCls}-btn`]: {
                marginInlineStart: marginXS,
              },
            },
          },
        },

        // =============================  primary type  ===========================
        // `$` for panel, `&$` for pure panel
        [`${componentCls}-primary, &${componentCls}-primary`]: {
          '--antd-arrow-background-color': colorPrimary,

          [`${componentCls}-inner`]: {
            color: colorTextLightSolid,
            textAlign: 'start',
            textDecoration: 'none',
            backgroundColor: colorPrimary,
            borderRadius,
            boxShadow: boxShadowTertiary,

            [`${componentCls}-close`]: {
              color: colorTextLightSolid,
            },

            [`${componentCls}-indicators`]: {
              [`${componentCls}-indicator`]: {
                background: new TinyColor(colorTextLightSolid).setAlpha(0.15).toRgbString(),
                '&-active': {
                  background: colorTextLightSolid,
                },
              },
            },

            [`${componentCls}-prev-btn`]: {
              color: colorTextLightSolid,
              borderColor: new TinyColor(colorTextLightSolid).setAlpha(0.15).toRgbString(),
              backgroundColor: colorPrimary,

              '&:hover': {
                backgroundColor: new TinyColor(colorTextLightSolid).setAlpha(0.15).toRgbString(),
                borderColor: 'transparent',
              },
            },

            [`${componentCls}-next-btn`]: {
              color: colorPrimary,
              borderColor: 'transparent',
              background: colorWhite,

              '&:hover': {
                background: new TinyColor(colorBgTextHover).onBackground(colorWhite).toRgbString(),
              },
            },
          },
        },
      },

      // ============================= mask ===========================
      [`${componentCls}-mask`]: {
        [`${componentCls}-placeholder-animated`]: {
          transition: `all ${motionDurationSlow}`,
        },
      },

      // =========== Limit left and right placement radius ==============
      [[
        '&-placement-left',
        '&-placement-leftTop',
        '&-placement-leftBottom',
        '&-placement-right',
        '&-placement-rightTop',
        '&-placement-rightBottom',
      ].join(',')]: {
        [`${componentCls}-inner`]: {
          borderRadius: Math.min(tourBorderRadius, MAX_VERTICAL_CONTENT_RADIUS),
        },
      },
    },

    // ============================= Arrow ===========================
    getArrowStyle<TourToken>(token, {
      colorBg: 'var(--antd-arrow-background-color)',
      contentRadius: tourBorderRadius,
      limitVerticalRadius: true,
    }),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Tour', (token) => {
  const { borderRadiusLG, fontSize, lineHeight } = token;
  const TourToken = mergeToken<TourToken>(token, {
    tourZIndexPopup: token.zIndexPopupBase + 70,
    indicatorWidth: 6,
    indicatorHeight: 6,
    tourBorderRadius: borderRadiusLG,
    tourCloseSize: fontSize * lineHeight,
  });
  return [genBaseStyle(TourToken)];
});
