import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

export interface ComponentToken {}

interface TourToken extends FullToken<'Tour'> {
  tourZIndexPopup: number;
  sliderWidth: number;
  sliderHeight: number;
  marginMD: number;
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
    colorTextTertiary,
    lineWidth,
    lineType,
    colorSplit,
    sliderHeight,
    sliderWidth,
    colorPrimaryBorderHover,
    paddingXS,
    paddingXXS,
    colorBorderBg,
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
  } = token;
  return {
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
      [`&${componentCls}-hidden`]: {
        display: 'none',
      },

      // ============================= inner content ===========================
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
            span: {
              width: `${sliderWidth}px`,
              height: `${sliderHeight}px`,
              display: 'inline-block',
              borderRadius: '50%',
              background: colorTextTertiary,
              marginInlineEnd: marginXXS,
              '&.active': {
                background: colorPrimary,
              },
            },
          },
          [`${componentCls}-buttons button`]: {
            marginInlineStart: marginXS,
          },
        },
      },

      // Arrows
      [`${componentCls}-arrow`]: {
        position: 'absolute',
        width: '0',
        height: '0',
        borderColor: 'transparent',
        borderStyle: 'solid',
      },
      // =============================  primary type ===========================
      [`&${componentCls}-primary`]: {
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

    // ============================= panel placement ===========================
    [`${componentCls}-placement-top,${componentCls}-placement-topLeft,${componentCls}-placement-topRight`]:
      {
        padding: `${paddingXXS}px 0 ${paddingXS}px`,
      },
    [`${componentCls}-placement-right, ${componentCls}-placement-rightTop, ${componentCls}-placement-rightBottom`]:
      {
        paddingBlock: 0,
        paddingInlineStart: `${paddingXS}px`,
        paddingInlineEnd: `${paddingXXS}px`,
      },
    [`${componentCls}-placement-bottom, ${componentCls}-placement-bottomLeft, ${componentCls}-placement-bottomRight`]:
      {
        padding: `${paddingXS}px 0 ${paddingXXS}px 0`,
      },
    [`${componentCls}-placement-left, ${componentCls}-placement-leftTop, ${componentCls}-placement-leftBottom`]:
      {
        paddingBlock: 0,
        paddingInlineStart: `${paddingXXS}px`,
        paddingInlineEnd: `${paddingXS}px`,
      },
    [`${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        insetBlockEnd: `${marginXXS}px`,
        marginInlineStart: `-${marginXXS}px`,
        borderWidth: `${marginXXS}px ${marginXXS}px 0`,
        borderTopColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-primary${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        borderTopColor: colorPrimary,
      },
    [`${componentCls}-placement-top ${componentCls}-arrow`]: {
      insetInlineStart: '50%',
    },

    [`${componentCls}-placement-topLeft ${componentCls}-arrow`]: {
      insetInlineStart: '15%',
    },

    [`${componentCls}-placement-topRight ${componentCls}-arrow`]: {
      insetInlineEnd: '15%',
    },

    [`${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        insetInlineStart: `${marginXXS}px`,
        marginBlockStart: `-${marginXXS}px`,
        borderBlockWidth: `${marginXXS}px`,
        borderInlineStartWidth: '0',
        borderInlineEndWidth: `${marginXXS}px`,
        borderInlineEndColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        borderInlineEndColor: colorPrimary,
      },

    [`${componentCls}-placement-right ${componentCls}-arrow`]: {
      insetBlockStart: '50%',
    },

    [`${componentCls}-placement-rightTop ${componentCls}-arrow`]: {
      insetBlockStart: '15%',
      marginBlockStart: '0',
    },

    [`${componentCls}-placement-rightBottom ${componentCls}-arrow`]: {
      insetBlockEnd: '15%',
    },

    [`${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        insetInlineEnd: `${marginXXS}px`,
        marginBlockStart: `-${marginXXS}px`,
        borderBlockWidth: `${marginXXS}px`,
        borderInlineStartWidth: `${marginXXS}px`,
        borderInlineEndWidth: '0',
        borderInlineStartColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        borderInlineStartColor: colorPrimary,
      },
    [`${componentCls}-placement-left ${componentCls}-arrow`]: {
      insetBlockStart: '50%',
    },

    [`${componentCls}-placement-leftTop ${componentCls}-arrow`]: {
      insetBlockStart: '15%',
      marginBlockStart: '0',
    },

    [`${componentCls}-placement-leftBottom ${componentCls}-arrow`]: {
      insetBlockEnd: '15%',
    },

    [`${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        insetBlockStart: `${marginXXS}px`,
        marginInlineStart: `-${marginXXS}px`,
        borderWidth: `0 ${marginXXS}px ${marginXXS}px`,
        borderBlockEndColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        borderBlockEndColor: colorPrimary,
      },
    [`${componentCls}-placement-bottom ${componentCls}-arrow`]: {
      insetInlineStart: '50%',
    },

    [`${componentCls}-placement-bottomLeft ${componentCls}-arrow`]: {
      insetInlineStart: '15%',
    },

    [`${componentCls}-placement-bottomRight ${componentCls}-arrow`]: {
      insetInlineEnd: '15%',
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Tour', token => {
  const TourToken = mergeToken<TourToken>(token, {
    tourZIndexPopup: token.zIndexPopupBase + 70,
    sliderWidth: 8,
    sliderHeight: 8,
  });
  return [genBaseStyle(TourToken)];
});
