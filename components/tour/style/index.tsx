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
  const { componentCls, zIndexPopupBase } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'absolute',
      zIndex: zIndexPopupBase + 70,
      display: 'block',
      visibility: 'visible',
      fontSize: '12px',
      lineHeight: 1.5,
      opacity: '0.9',
      width: '520px',
      [`${componentCls}-hidden`]: {
        display: 'none',
      },

      [`${componentCls}-wrap`]: {
        position: 'fixed',
        overflow: 'auto',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '1050',
        WebkitOverflowScrolling: 'touch',
        outline: '0',
      },
      // =============================  Wrapper for the tour content ===========================
      [`${componentCls}-inner`]: {
        // color: '#fff',
        textAlign: 'left',
        textDecoration: 'none',
        borderRadius: '6px',
        boxShadow: '@overlay-shadow',
        position: 'relative',
        backgroundColor: '#ffffff',
        border: 'none',
        backgroundClip: 'padding-box',

        [`${componentCls}-close`]: {
          cursor: 'pointer',
          border: '0',
          background: 'transparent',
          fontSize: '16px',
          position: 'absolute',
          right: '20px',
          top: '12px',
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
          padding: '40px 24px 0',
          img: {
            width: '100%',
          },
        },
        [`${componentCls}-header`]: {
          padding: '13px 20px 14px 20px',
          borderRadius: '5px 5px 0 0',
          background: '#fff',
          color: '#666',
          borderBottom: '1px solid #e9e9e9',

          [`${componentCls}-title`]: {
            margin: '0',
            fontSize: '14px',
            lineHeight: '21px',
            fontWeight: 'bold',
          },
        },

        [`${componentCls}-description`]: {
          padding: '24px',
          fontSize: '14px',
          lineHeight: '1.5715',
          wordWrap: 'break-word',
        },

        [`${componentCls}-footer`]: {
          padding: '16px',
          textAlign: 'right',
          background: '0 0',
          borderTop: '1px solid rgba(0,0,0,.06)',
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
              marginRight: '4px',
              opacity: 0.75,
              '&.active': {
                background: '#007aff',
              },
            },
          },
          [`${componentCls}-buttons button`]: {
            marginLeft: '8px',
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
          textAlign: 'left',
          textDecoration: 'none',
          backgroundColor: '#1890ff',
          borderRadius: '6px',
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
              marginRight: '4px',
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
        padding: '0 5px 0 9px',
      },
    [`${componentCls}-placement-bottom, ${componentCls}-placement-bottomLeft, ${componentCls}-placement-bottomRight`]:
      {
        padding: '9px 0 5px 0',
      },
    [`${componentCls}-placement-left, ${componentCls}-placement-leftTop, ${componentCls}-placement-leftBottom`]:
      {
        padding: '0 9px 0 5px',
      },

    [`${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        bottom: '4px',
        marginLeft: '-5px',
        borderWidth: '5px 5px 0',
        borderTopColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-primary${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        borderTopColor: '#007aff',
      },
    [`${componentCls}-placement-top ${componentCls}-arrow`]: {
      left: '50%',
    },

    [`${componentCls}-placement-topLeft ${componentCls}-arrow`]: {
      left: '15%',
    },

    [`${componentCls}-placement-topRight ${componentCls}-arrow`]: {
      right: '15%',
    },

    [`${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        left: '4px',
        marginTop: '-5px',
        borderWidth: '5px 5px 5px 0',
        borderRightColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-right ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-rightBottom ${componentCls}-arrow`]:
      {
        borderRightColor: '#007aff',
      },

    [`${componentCls}-placement-right ${componentCls}-arrow`]: {
      top: '50%',
    },

    [`${componentCls}-placement-rightTop ${componentCls}-arrow`]: {
      top: '15%',
      marginTop: '0',
    },

    [`${componentCls}-placement-rightBottom ${componentCls}-arrow`]: {
      bottom: '15%',
    },

    [`${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        right: '4px',
        marginTop: '-5px',
        borderWidth: '5px 0 5px 5px',
        borderLeftColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-left ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftTop ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-leftBottom ${componentCls}-arrow`]:
      {
        borderLeftColor: '#007aff',
      },
    [`${componentCls}-placement-left ${componentCls}-arrow`]: {
      top: '50%',
    },

    [`${componentCls}-placement-leftTop ${componentCls}-arrow`]: {
      top: '15%',
      marginTop: '0',
    },

    [`${componentCls}-placement-leftBottom ${componentCls}-arrow`]: {
      bottom: '15%',
    },

    [`${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        top: '4px',
        marginLeft: '-5px',
        borderWidth: '0 5px 5px',
        borderBottomColor: '#fff',
      },
    [`${componentCls}-primary${componentCls}-placement-bottom ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomLeft ${componentCls}-arrow,${componentCls}-primary${componentCls}-placement-bottomRight ${componentCls}-arrow`]:
      {
        borderBottomColor: '#007aff',
      },
    [`${componentCls}-placement-bottom ${componentCls}-arrow`]: {
      left: '50%',
    },

    [`${componentCls}-placement-bottomLeft ${componentCls}-arrow`]: {
      left: '15%',
    },

    [`${componentCls}-placement-bottomRight ${componentCls}-arrow`]: {
      right: '15%',
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
