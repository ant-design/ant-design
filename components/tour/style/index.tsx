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
  marginFull: number;
  marginPart: number;
  marginPartWithMark: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<TourToken> = token => {
  const {
    componentCls,
    lineHeight,
    zIndexPopupBase,
    padding,
    paddingSM,
    fontSizeSM,
    fontSizeLG,
    lineHeightLG,
    controlRadius,
    controlLineWidth,
    paddingXL,
    paddingLG,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'absolute',
      zIndex: zIndexPopupBase + 70,
      display: 'block',
      visibility: 'visible',
      fontSize: fontSizeSM,
      lineHeight: lineHeightLG,
      opacity: '0.9',
      width: '520px',
      [`${componentCls}-hidden`]: {
        display: 'none',
      },

      // =============================  Wrapper for the tour content ===========================
      [`${componentCls}-inner`]: {
        // color: '#fff',
        textAlign: 'start',
        textDecoration: 'none',
        borderRadius: controlRadius,
        boxShadow: '@overlay-shadow',
        position: 'relative',
        backgroundColor: '#ffffff',
        border: 'none',
        backgroundClip: 'padding-box',

        [`${componentCls}-close`]: {
          cursor: 'pointer',
          border: '0',
          background: 'transparent',
          fontSize: fontSizeLG,
          position: 'absolute',
          insetInlineEnd: '20px',
          insetBlockStart: '12px',
          fontWeight: '700',
          lineHeight: '1',
          color: '#000',
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
          padding: `${paddingXL}px ${paddingLG}px 0`,
          img: {
            width: '100%',
          },
        },
        [`${componentCls}-header`]: {
          padding: `${paddingSM}px ${paddingLG}px`,
          borderRadius: `${controlRadius}px ${controlRadius}px 0 0`,
          background: '#fff',
          color: '#666',
          borderBlockEnd: '1px solid #e9e9e9',

          [`${componentCls}-title`]: {
            margin: '0',
            lineHeight: lineHeightLG,
            fontWeight: 'bold',
          },
        },

        [`${componentCls}-description`]: {
          padding: paddingLG,
          lineHeight,
          wordWrap: 'break-word',
        },

        [`${componentCls}-footer`]: {
          padding,
          textAlign: 'end',
          background: '0 0',
          borderTop: `${controlLineWidth} solid rgba(0,0,0,.06)`,
          borderRadius: '0 0 2px 2px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',

          [`${componentCls}-sliders`]: {
            display: 'inline-block',
            span: {
              width: '8px',
              height: '8px',
              display: 'inline-block',
              borderRadius: '50%',
              background: '#000',
              marginInlineEnd: '4px',
              opacity: 0.75,
              '&.active': {
                background: '#1890ff',
              },
            },
          },
          [`${componentCls}-buttons button`]: {
            marginInlineStart: '8px',
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
          color: '#fff',
          textAlign: 'start',
          textDecoration: 'none',
          backgroundColor: '#1890ff',
          borderRadius: controlRadius,
          textShadow: '0 -1px 0 rgb(0 0 0 / 12%)',
          boxShadow: '0 2px #0000000b',

          [`${componentCls}-close`]: {
            color: `#fff`,
            opacity: 0.75,
          },
          [`${componentCls}-header`]: {
            backgroundColor: '#1890ff',
            borderColor: `#1890ff`,
            color: `#fff`,
          },

          [`${componentCls}-sliders`]: {
            span: {
              background: '#007aff',
              marginInlineEnd: '4px',
              opacity: 0.75,
              '&.active': {
                background: '#fff',
              },
            },
          },
        },
      },
    },

    // ============================= panel placement ===========================
    [`${componentCls}-placement-top,${componentCls}-placement-topLeft,${componentCls}-placement-topRight`]:
      {
        padding: '5px 0 9px 0',
      },
    [`${componentCls}-placement-right, ${componentCls}-placement-rightTop, ${componentCls}-placement-rightBottom`]:
      {
        paddingBlock: 0,
        paddingInlineStart: '9px',
        paddingInlineEnd: '5px',
      },
    [`${componentCls}-placement-bottom, ${componentCls}-placement-bottomLeft, ${componentCls}-placement-bottomRight`]:
      {
        padding: '9px 0 5px 0',
      },
    [`${componentCls}-placement-left, ${componentCls}-placement-leftTop, ${componentCls}-placement-leftBottom`]:
      {
        paddingBlock: 0,
        paddingInlineStart: '5px',
        paddingInlineEnd: '9px',
      },
    [`${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        insetBlockEnd: '4px',
        marginInlineStart: '-5px',
        borderWidth: '5px 5px 0',
        borderTopColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-primary${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        borderTopColor: '#007aff',
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
        insetInlineStart: '4px',
        marginBlockStart: '-5px',
        borderBlockWidth: '5px',
        borderInlineStartWidth: '0',
        borderInlineEndWidth: '5px',
        borderInlineEndColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        borderInlineEndColor: '#007aff',
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
        insetInlineEnd: '4px',
        marginBlockStart: '-5px',
        borderBlockWidth: '5px',
        borderInlineStartWidth: '5px',
        borderInlineEndWidth: '0',
        borderInlineStartColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        borderInlineStartColor: '#007aff',
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
        insetBlockStart: '4px',
        marginInlineStart: '-5px',
        borderWidth: '0 5px 5px',
        borderBlockEndColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        borderBlockEndColor: '#007aff',
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
  const sliderToken = mergeToken<TourToken>(token, {
    marginPart: (token.controlHeight - token.controlSize) / 2,
    marginFull: token.controlSize / 2,
    marginPartWithMark: token.controlHeightLG - token.controlSize,
  });
  return [genBaseStyle(sliderToken)];
});
