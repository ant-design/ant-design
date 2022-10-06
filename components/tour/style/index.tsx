import type { CSSObject } from '@ant-design/cssinjs';
import type * as React from 'react';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

// Direction naming standard:
// Horizontal base:
// -0-------------
// vertical: part   (水平时，垂直方向命名为 part)
// horizontal: full (水平时，水平方向命名为 full)

export interface ComponentToken {
  controlSize: number;
  railSize: number;
  handleSize: number;
  handleSizeHover: number;
  handleLineWidth: number;
  handleLineWidthHover: number;
  dotSize: number;
}

interface SliderToken extends FullToken<'Slider'> {
  marginFull: number;
  marginPart: number;
  marginPartWithMark: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SliderToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-root`]: {
      [`${componentCls}${token.antCls}-zoom-enter, ${componentCls}${token.antCls}-zoom-appear`]: {
        // reset scale avoid mousePosition bug
        transform: 'none',
        opacity: 0,
        animationDuration: token.motionDurationSlow,
        userSelect: 'none',
      },

      [`${componentCls}-mask`]: {
        zIndex: token.zIndexPopupBase,
        height: '100%',
        backgroundColor: token.colorBgMask,

        [`${componentCls}-hidden`]: {
          display: 'none',
        },
      },

      [`${componentCls}-wrap`]: {
        overflow: 'auto',
        outline: 0,
        WebkitOverflowScrolling: 'touch',
      },
    },
    [componentCls]: {
      ...resetComponent(token),

      position: 'absolute',
      zIndex: 1070,
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

      [`${componentCls}-title`]: {
        margin: '0',
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 'bold',
      },

      [`${componentCls}-close`]: {
        cursor: 'pointer',
        border: '0',
        background: 'transparent',
        fontSize: '21px',
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

      [`${componentCls}-close-x`]: {
        [`&::after`]: {
          content: '×',
        },
      },

      [`${componentCls}-header`]: {
        padding: '13px 20px 14px 20px',
        borderRadius: '5px 5px 0 0',
        background: '#fff',
        color: '#666',
        borderBottom: '1px solid #e9e9e9',
      },

      [`${componentCls}-description`]: {
        padding: '24px',
        fontSize: '14px',
        lineHeight: '1.5715',
        wordWrap: 'break-word',
      },

      [`${componentCls}-footer`]: {
        padding: '10px 16px',
        textAlign: 'right',
        background: '0 0',
        borderTop: '1px solid rgba(0,0,0,.06)',
        borderRadius: '0 0 2px 2px',
        [`${componentCls}-prevButton,${componentCls}-nextButton`]: {
          display: 'inline-block',
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
    },
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

    // // Wrapper for the tour content
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
    },

    [`${componentCls}-placement-top ${componentCls}-arrow, ${componentCls}-placement-topLeft ${componentCls}-arrow,${componentCls}-placement-topRight ${componentCls}-arrow`]:
      {
        bottom: '4px',
        marginLeft: '-5px',
        borderWidth: '5px 5px 0',
        borderTopColor: '#fff',
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

// ============================ Horizontal ============================
const genDirectionStyle = (token: SliderToken, horizontal: boolean): CSSObject => {
  const { componentCls, railSize, controlSize, handleSize, dotSize } = token;

  const railPadding: keyof React.CSSProperties = horizontal ? 'paddingBlock' : 'paddingInline';
  const full: keyof React.CSSProperties = horizontal ? 'width' : 'height';
  const part: keyof React.CSSProperties = horizontal ? 'height' : 'width';
  const handlePos: keyof React.CSSProperties = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset: keyof React.CSSProperties = horizontal ? 'top' : 'insetInlineStart';

  return {
    [railPadding]: railSize,
    [part]: controlSize,

    [`${componentCls}-rail`]: {
      [full]: '100%',
      [part]: railSize,
    },

    [`${componentCls}-track`]: {
      [part]: railSize,
    },

    [`${componentCls}-handle`]: {
      [handlePos]: (controlSize - handleSize) / 2,
    },

    [`${componentCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: handleSize,
      [full]: '100%',
    },

    [`${componentCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [full]: '100%',
      [part]: railSize,
    },

    [`${componentCls}-dot`]: {
      position: 'absolute',
      [handlePos]: (railSize - dotSize) / 2,
    },
  };
};
// ============================ Horizontal ============================
const genHorizontalStyle: GenerateStyle<SliderToken> = token => {
  const { componentCls, marginPartWithMark } = token;

  return {
    [`${componentCls}-horizontal`]: {
      ...genDirectionStyle(token, true),

      [`&${componentCls}-with-marks`]: {
        marginBottom: marginPartWithMark,
      },
    },
  };
};

// ============================= Vertical =============================
const genVerticalStyle: GenerateStyle<SliderToken> = token => {
  const { componentCls } = token;

  return {
    [`${componentCls}-vertical`]: {
      ...genDirectionStyle(token, false),
      height: '100%',
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Slider',
  token => {
    const sliderToken = mergeToken<SliderToken>(token, {
      marginPart: (token.controlHeight - token.controlSize) / 2,
      marginFull: token.controlSize / 2,
      marginPartWithMark: token.controlHeightLG - token.controlSize,
    });
    console.log('styles', genBaseStyle(sliderToken));
    return [
      genBaseStyle(sliderToken),
      genHorizontalStyle(sliderToken),
      genVerticalStyle(sliderToken),
    ];
  },
  token => {
    // Handle line width is always width-er 1px
    const increaseHandleWidth = 1;
    const controlSize = token.controlHeightLG / 4;
    const controlSizeHover = token.controlHeightSM / 2;
    const handleLineWidth = token.lineWidth + increaseHandleWidth;
    const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 3;
    return {
      controlSize,
      railSize: controlSize / 3,
      handleSize: controlSize,
      handleSizeHover: controlSizeHover,
      dotSize: (controlSize / 3) * 2,
      handleLineWidth,
      handleLineWidthHover,
    };
  },
);
