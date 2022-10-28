import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';
import getArrowStyle, { MAX_VERTICAL_CONTENT_RADIUS } from '../../style/placementArrow';

export interface ComponentToken {}

interface TourToken extends FullToken<'Tour'> {
  tourZIndexPopup: number;
  sliderWidth: number;
  sliderHeight: number;
  marginMD: number;
  tourRadiusOuter: number;
  tourBorderRadius: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TourToken> = token => {
  const {
    componentCls,
    lineHeight,
    padding,
    fontSizeLG,
    lineHeightLG,
    controlRadius,
    radiusXS,
    paddingXL,
    colorBgBase,
    colorPrimary,
    colorText,
    colorFill,
    lineWidth,
    lineType,
    colorSplit,
    sliderHeight,
    sliderWidth,
    colorPrimaryBorderHover,
    boxShadow,
    tourZIndexPopup,
    fontSize,
    colorBgContainer,
    fontWeightStrong,
    marginSM,
    marginXXS,
    marginXS,
    colorTextLightSolid,
    radiusBase,
    tourBorderRadius,
    tourRadiusOuter,
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
        '--antd-arrow-background-color': colorBgContainer,

        [`&${componentCls}-hidden`]: {
          display: 'none',
        },

        // ============================= panel content ===========================
        [`${componentCls}-content`]: {
          position: 'relative',
        },
        [`${componentCls}-inner`]: {
          textAlign: 'start',
          textDecoration: 'none',
          borderRadius: controlRadius,
          boxShadow,
          position: 'relative',
          backgroundColor: colorBgContainer,
          border: 'none',
          backgroundClip: 'padding-box',

          [`${componentCls}-close`]: {
            cursor: 'pointer',
            background: 'transparent',
            fontSize: fontSizeLG,
            position: 'absolute',
            insetInlineEnd: marginSM,
            insetBlockStart: marginSM,
            fontWeight: fontWeightStrong,
            lineHeight: 1,
            opacity: 0.2,
            textDecoration: 'none',
            [`&:hover`]: {
              opacity: 1,
              textDecoration: 'none',
            },
          },

          [`${componentCls}-cover`]: {
            textAlign: 'center',
            padding: `${paddingXL}px ${padding}px 0`,
            img: {
              width: '100%',
            },
          },
          [`${componentCls}-header`]: {
            padding,

            [`${componentCls}-title`]: {
              lineHeight: lineHeightLG,
              fontWeight: fontWeightStrong,
              fontSize: fontSizeLG,
            },
          },

          [`${componentCls}-description`]: {
            padding: `0 ${padding}px`,
            lineHeight,
            wordWrap: 'break-word',
          },

          [`${componentCls}-footer`]: {
            padding,
            textAlign: 'end',
            borderTop: `${lineWidth}px ${lineType} ${colorSplit}`,
            borderRadius: `0 0 ${radiusXS}px ${radiusXS}px`,
            display: 'flex',
            justifyContent: 'space-between',

            [`${componentCls}-sliders`]: {
              display: 'inline-block',

              [`${componentCls}-slider`]: {
                width: `${sliderWidth}px`,
                height: `${sliderHeight}px`,
                display: 'inline-block',
                borderRadius: '50%',
                background: colorFill,
                marginInlineEnd: marginXXS,
              },
              [`${componentCls}-slider-active`]: {
                background: colorPrimary,
              },
            },
            [`${componentCls}-buttons button`]: {
              marginInlineStart: marginXS,
            },
          },
        },

        // ============================= primary type ===========================
        [`&${componentCls}-primary`]: {
          '--antd-arrow-background-color': colorPrimary,
          [`${componentCls}-inner`]: {
            color: colorTextLightSolid,
            textAlign: 'start',
            textDecoration: 'none',
            backgroundColor: colorPrimary,
            borderRadius: radiusBase,
            boxShadow,

            [`${componentCls}-close`]: {
              opacity: 0.9,
            },

            [`${componentCls}-sliders`]: {
              span: {
                background: colorPrimaryBorderHover,
                marginInlineEnd: marginXXS,
                '&.active': {
                  background: colorBgBase,
                },
              },
            },
          },
        },
      },

      // Limit left and right placement radius
      [[
        `&-placement-left`,
        `&-placement-leftTop`,
        `&-placement-leftBottom`,
        `&-placement-right`,
        `&-placement-rightTop`,
        `&-placement-rightBottom`,
      ].join(',')]: {
        [`${componentCls}-inner`]: {
          borderRadius:
            tourBorderRadius > MAX_VERTICAL_CONTENT_RADIUS
              ? MAX_VERTICAL_CONTENT_RADIUS
              : tourBorderRadius,
        },
      },
    },
    // Arrow Style
    getArrowStyle<TourToken>(
      mergeToken<TourToken>(token, {
        radiusOuter: tourRadiusOuter,
      }),
      {
        colorBg: 'var(--antd-arrow-background-color)',
        showArrowCls: '',
        contentRadius: tourBorderRadius,
        limitVerticalRadius: true,
      },
    ),
  ];
};

// ============================== Export ==============================
export default genComponentStyleHook('Tour', token => {
  const { radiusBase, radiusOuter } = token;
  const TourToken = mergeToken<TourToken>(token, {
    tourZIndexPopup: token.zIndexPopupBase + 70,
    sliderWidth: 8,
    sliderHeight: 8,
    tourRadiusOuter: radiusOuter > 4 ? 4 : radiusOuter,
    tourBorderRadius: radiusBase,
  });
  return [genBaseStyle(TourToken)];
});
