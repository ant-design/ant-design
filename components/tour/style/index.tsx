import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

export interface ComponentToken {
  controlSize: number;
  railSize: number;
  handleSize: number;
  handleSizeHover: number;
  handleLineWidth: number;
  handleLineWidthHover: number;
  dotSize: number;
}

interface TourToken extends FullToken<'Tour'> {
  tourZIndexPopup: number;
  slidersPrimaryBackground: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TourToken> = token => {
  const {
    componentCls,
    lineHeight,
    padding,
    fontSizeSM,
    fontSizeLG,
    lineHeightLG,
    controlRadius,
    controlRadiusXS,
    controlLineWidth,
    paddingXL,
    colorBgBase,
    colorPrimary,
    colorText,
    colorBgMask,
    colorFillSecondary,
    sizeSpaceXXS,
    sizeSpaceXS,
    slidersPrimaryBackground,
    colorPrimaryBorder,
    paddingXS,
    paddingXXS,
    colorBorderBg,
    boxShadow,
    tourZIndexPopup,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),

      color: colorText,
      position: 'absolute',
      zIndex: tourZIndexPopup,
      display: 'block',
      visibility: 'visible',
      fontSize: fontSizeSM,
      lineHeight: lineHeightLG,
      width: '520px',
      [`${componentCls}-hidden`]: {
        display: 'none',
      },

      // ============================= inner content ===========================
      [`${componentCls}-inner`]: {
        textAlign: 'start',
        textDecoration: 'none',
        borderRadius: controlRadius,
        boxShadow: '@overlay-shadow',
        position: 'relative',
        backgroundColor: colorBgBase,
        border: 'none',
        backgroundClip: 'padding-box',

        [`${componentCls}-close`]: {
          cursor: 'pointer',
          background: 'transparent',
          fontSize: fontSizeLG,
          position: 'absolute',
          insetInlineEnd: '20px',
          insetBlockStart: '12px',
          fontWeight: '700',
          lineHeight: '1',
          textShadow: '0 1px 0 #fff',
          filter: 'alpha(opacity=20)',
          opacity: '.2',
          textDecoration: 'none',
          [`&:hover`]: {
            opacity: '1',
            filter: 'alpha(opacity=100)',
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
          padding: `${padding}px`,

          [`${componentCls}-title`]: {
            lineHeight: lineHeightLG,
            fontWeight: 'bold',
          },
        },

        [`${componentCls}-description`]: {
          padding: ` 0 ${padding}px 0`,
          lineHeight,
          wordWrap: 'break-word',
        },

        [`${componentCls}-footer`]: {
          padding,
          textAlign: 'end',
          borderTop: `${controlLineWidth} solid ${colorFillSecondary}`,
          borderRadius: `0 0 ${controlRadiusXS}px ${controlRadiusXS}px`,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',

          [`${componentCls}-sliders`]: {
            display: 'inline-block',
            span: {
              width: `${sizeSpaceXS}px`,
              height: `${sizeSpaceXS}px`,
              display: 'inline-block',
              borderRadius: '50%',
              background: colorBgMask,
              marginInlineEnd: `${sizeSpaceXXS}px`,
              opacity: 0.75,
              '&.active': {
                background: colorPrimary,
              },
            },
          },
          [`${componentCls}-buttons button`]: {
            marginInlineStart: `${sizeSpaceXS}px`,
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
          color: colorBgBase,
          textAlign: 'start',
          textDecoration: 'none',
          backgroundColor: colorPrimary,
          borderRadius: controlRadius,
          textShadow: '0 -1px 0 rgb(0 0 0 / 12%)',
          boxShadow,

          [`${componentCls}-close`]: {
            opacity: 0.9,
          },

          [`${componentCls}-sliders`]: {
            span: {
              background: slidersPrimaryBackground,
              marginInlineEnd: `${sizeSpaceXXS}px`,
              opacity: 0.75,
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
        padding: `${paddingXXS}px 0 ${paddingXS}px 0`,
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
        insetBlockEnd: `${sizeSpaceXXS}px`,
        marginInlineStart: `-${sizeSpaceXXS}px`,
        borderWidth: `${sizeSpaceXXS}px ${sizeSpaceXXS}px 0`,
        borderTopColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-primary${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        borderTopColor: colorPrimaryBorder,
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
        insetInlineStart: `${sizeSpaceXXS}px`,
        marginBlockStart: `-${sizeSpaceXXS}px`,
        borderBlockWidth: `${sizeSpaceXXS}px`,
        borderInlineStartWidth: '0',
        borderInlineEndWidth: `${sizeSpaceXXS}px`,
        borderInlineEndColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        borderInlineEndColor: colorPrimaryBorder,
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
        insetInlineEnd: `${sizeSpaceXXS}px`,
        marginBlockStart: `-${sizeSpaceXXS}px`,
        borderBlockWidth: `${sizeSpaceXXS}px`,
        borderInlineStartWidth: `${sizeSpaceXXS}px`,
        borderInlineEndWidth: '0',
        borderInlineStartColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        borderInlineStartColor: colorPrimaryBorder,
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
        insetBlockStart: `${sizeSpaceXXS}px`,
        marginInlineStart: `-${sizeSpaceXXS}px`,
        borderWidth: `0 ${sizeSpaceXXS}px ${sizeSpaceXXS}px`,
        borderBlockEndColor: colorBorderBg,
      },
    [`${componentCls}-primary${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        borderBlockEndColor: colorPrimaryBorder,
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
    slidersPrimaryBackground: token['blue-4'],
  });
  return [genBaseStyle(TourToken)];
});
