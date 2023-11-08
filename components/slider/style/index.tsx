import type * as React from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

// Direction naming standard:
// Horizontal base:
// -0-------------
// vertical: part   (水平时，垂直方向命名为 part)
// horizontal: full (水平时，水平方向命名为 full)

export interface ComponentToken {
  /**
   * @desc 滑动输入高度
   * @descEN Height of slider
   */
  controlSize: number;
  /**
   * @desc 轨道高度
   * @descEN Height of rail
   */
  railSize: number;
  /**
   * @desc 滑块尺寸
   * @descEN Size of handle
   */
  handleSize: number;
  /**
   * @desc 滑块尺寸（悬浮态）
   * @descEN Size of handle when hover
   */
  handleSizeHover: number;
  /**
   * @desc 滑块边框宽度
   * @descEN Border width of handle
   */
  handleLineWidth: number;
  /**
   * @desc 滑块边框宽度（悬浮态）
   * @descEN Border width of handle when hover
   */
  handleLineWidthHover: number;
  /**
   * @desc 滑块圆点尺寸
   * @descEN Size of dot
   */
  dotSize: number;
  railBg: string;
  railHoverBg: string;
  trackBg: string;
  trackHoverBg: string;
  handleColor: string;
  handleActiveColor: string;
  dotBorderColor: string;
  dotActiveBorderColor: string;
  trackBgDisabled: string;
}

interface SliderToken extends FullToken<'Slider'> {
  marginFull: number;
  marginPart: number;
  marginPartWithMark: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SliderToken> = (token) => {
  const {
    componentCls,
    antCls,
    controlSize,
    dotSize,
    marginFull,
    marginPart,
    colorFillContentHover,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      height: controlSize,
      margin: `${marginPart}px ${marginFull}px`,
      padding: 0,
      cursor: 'pointer',
      touchAction: 'none',

      [`&-vertical`]: {
        margin: `${marginFull}px ${marginPart}px`,
      },

      [`${componentCls}-rail`]: {
        position: 'absolute',
        backgroundColor: token.railBg,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${token.motionDurationMid}`,
      },

      [`${componentCls}-track,${componentCls}-tracks`]: {
        position: 'absolute',
        transition: `background-color ${token.motionDurationMid}`,
      },

      [`${componentCls}-track`]: {
        backgroundColor: token.trackBg,
        borderRadius: token.borderRadiusXS,
      },

      [`${componentCls}-track-draggable`]: {
        boxSizing: 'content-box',
        backgroundClip: 'content-box',
        border: 'solid rgba(0,0,0,0)',
      },

      '&:hover': {
        [`${componentCls}-rail`]: {
          backgroundColor: token.railHoverBg,
        },

        [`${componentCls}-track`]: {
          backgroundColor: token.trackHoverBg,
        },

        [`${componentCls}-dot`]: {
          borderColor: colorFillContentHover,
        },

        [`${componentCls}-handle::after`]: {
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${token.colorPrimaryBorderHover}`,
        },

        [`${componentCls}-dot-active`]: {
          borderColor: token.dotActiveBorderColor,
        },
      },

      [`${componentCls}-handle`]: {
        position: 'absolute',
        width: token.handleSize,
        height: token.handleSize,
        outline: 'none',

        // 扩大选区
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: -token.handleLineWidth,
          insetBlockStart: -token.handleLineWidth,
          width: token.handleSize + token.handleLineWidth * 2,
          height: token.handleSize + token.handleLineWidth * 2,
          backgroundColor: 'transparent',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: token.handleSize,
          height: token.handleSize,
          backgroundColor: token.colorBgElevated,
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${token.handleColor}`,
          borderRadius: '50%',
          cursor: 'pointer',
          transition: `
            inset-inline-start ${token.motionDurationMid},
            inset-block-start ${token.motionDurationMid},
            width ${token.motionDurationMid},
            height ${token.motionDurationMid},
            box-shadow ${token.motionDurationMid}
          `,
        },

        '&:hover, &:active, &:focus': {
          '&::before': {
            insetInlineStart: -(
              (token.handleSizeHover - token.handleSize) / 2 +
              token.handleLineWidthHover
            ),
            insetBlockStart: -(
              (token.handleSizeHover - token.handleSize) / 2 +
              token.handleLineWidthHover
            ),
            width: token.handleSizeHover + token.handleLineWidthHover * 2,
            height: token.handleSizeHover + token.handleLineWidthHover * 2,
          },

          '&::after': {
            boxShadow: `0 0 0 ${token.handleLineWidthHover}px ${token.handleActiveColor}`,
            width: token.handleSizeHover,
            height: token.handleSizeHover,
            insetInlineStart: (token.handleSize - token.handleSizeHover) / 2,
            insetBlockStart: (token.handleSize - token.handleSizeHover) / 2,
          },
        },
      },

      [`${componentCls}-mark`]: {
        position: 'absolute',
        fontSize: token.fontSize,
      },

      [`${componentCls}-mark-text`]: {
        position: 'absolute',
        display: 'inline-block',
        color: token.colorTextDescription,
        textAlign: 'center',
        wordBreak: 'keep-all',
        cursor: 'pointer',
        userSelect: 'none',

        '&-active': {
          color: token.colorText,
        },
      },

      [`${componentCls}-step`]: {
        position: 'absolute',
        background: 'transparent',
        pointerEvents: 'none',
      },

      [`${componentCls}-dot`]: {
        position: 'absolute',
        width: dotSize,
        height: dotSize,
        backgroundColor: token.colorBgElevated,
        border: `${token.handleLineWidth}px solid ${token.dotBorderColor}`,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,
        pointerEvents: 'auto',

        '&-active': {
          borderColor: token.dotActiveBorderColor,
        },
      },

      [`&${componentCls}-disabled`]: {
        cursor: 'not-allowed',

        [`${componentCls}-rail`]: {
          backgroundColor: `${token.railBg} !important`,
        },

        [`${componentCls}-track`]: {
          backgroundColor: `${token.trackBgDisabled} !important`,
        },

        [`
          ${componentCls}-dot
        `]: {
          backgroundColor: token.colorBgElevated,
          borderColor: token.trackBgDisabled,
          boxShadow: 'none',
          cursor: 'not-allowed',
        },

        [`${componentCls}-handle::after`]: {
          backgroundColor: token.colorBgElevated,
          cursor: 'not-allowed',
          width: token.handleSize,
          height: token.handleSize,
          boxShadow: `0 0 0 ${token.handleLineWidth}px ${new TinyColor(token.colorTextDisabled)
            .onBackground(token.colorBgContainer)
            .toHexShortString()}`,
          insetInlineStart: 0,
          insetBlockStart: 0,
        },

        [`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: {
          cursor: `not-allowed !important`,
        },
      },

      [`&-tooltip ${antCls}-tooltip-inner`]: {
        minWidth: 'unset',
      },
    },
  };
};

// ============================ Horizontal ============================
const genDirectionStyle = (token: SliderToken, horizontal: boolean): CSSObject => {
  const { componentCls, railSize, handleSize, dotSize } = token;

  const railPadding: keyof React.CSSProperties = horizontal ? 'paddingBlock' : 'paddingInline';
  const full: keyof React.CSSProperties = horizontal ? 'width' : 'height';
  const part: keyof React.CSSProperties = horizontal ? 'height' : 'width';
  const handlePos: keyof React.CSSProperties = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset: keyof React.CSSProperties = horizontal ? 'top' : 'insetInlineStart';

  const handlePosSize = (railSize * 3 - handleSize) / 2;
  const draggableBorderSize = (handleSize - railSize) / 2;

  const draggableBorder: React.CSSProperties = horizontal
    ? {
        borderWidth: `${draggableBorderSize}px 0`,
        transform: `translateY(-${draggableBorderSize}px)`,
      }
    : {
        borderWidth: `0 ${draggableBorderSize}px`,
        transform: `translateX(-${draggableBorderSize}px)`,
      };

  return {
    [railPadding]: railSize,
    [part]: railSize * 3,

    [`${componentCls}-rail`]: {
      [full]: '100%',
      [part]: railSize,
    },

    [`${componentCls}-track,${componentCls}-tracks`]: {
      [part]: railSize,
    },

    [`${componentCls}-track-draggable`]: {
      ...draggableBorder,
    },

    [`${componentCls}-handle`]: {
      [handlePos]: handlePosSize,
    },

    [`${componentCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      // https://github.com/ant-design/ant-design/issues/43731
      [markInset]: railSize * 3 + (horizontal ? 0 : token.marginFull),
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
const genHorizontalStyle: GenerateStyle<SliderToken> = (token) => {
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
const genVerticalStyle: GenerateStyle<SliderToken> = (token) => {
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
  (token) => {
    const sliderToken = mergeToken<SliderToken>(token, {
      marginPart: (token.controlHeight - token.controlSize) / 2,
      marginFull: token.controlSize / 2,
      marginPartWithMark: token.controlHeightLG - token.controlSize,
    });
    return [
      genBaseStyle(sliderToken),
      genHorizontalStyle(sliderToken),
      genVerticalStyle(sliderToken),
    ];
  },
  (token) => {
    // Handle line width is always width-er 1px
    const increaseHandleWidth = 1;
    const controlSize = token.controlHeightLG / 4;
    const controlSizeHover = token.controlHeightSM / 2;
    const handleLineWidth = token.lineWidth + increaseHandleWidth;
    const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 3;
    return {
      controlSize,
      railSize: 4,
      handleSize: controlSize,
      handleSizeHover: controlSizeHover,
      dotSize: 8,
      handleLineWidth,
      handleLineWidthHover,
      railBg: token.colorFillTertiary,
      railHoverBg: token.colorFillSecondary,
      trackBg: token.colorPrimaryBorder,
      trackHoverBg: token.colorPrimaryBorderHover,
      handleColor: token.colorPrimaryBorder,
      handleActiveColor: token.colorPrimary,
      dotBorderColor: token.colorBorderSecondary,
      dotActiveBorderColor: token.colorPrimaryBorder,
      trackBgDisabled: token.colorBgContainerDisabled,
    };
  },
);
