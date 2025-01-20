import type * as React from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

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
  handleLineWidth: number | string;
  /**
   * @desc 滑块边框宽度（悬浮态）
   * @descEN Border width of handle when hover
   */
  handleLineWidthHover: number | string;
  /**
   * @desc 滑块圆点尺寸
   * @descEN Size of dot
   */
  dotSize: number;
  /**
   * @desc 轨道背景色
   * @descEN Background color of rail
   */
  railBg: string;
  /**
   * @desc 轨道背景色（悬浮态）
   * @descEN Background color of rail when hover
   */
  railHoverBg: string;
  /**
   * @desc 轨道已覆盖部分背景色
   * @descEN Background color of track
   */
  trackBg: string;
  /**
   * @desc 轨道已覆盖部分背景色（悬浮态）
   * @descEN Background color of track when hover
   */
  trackHoverBg: string;
  /**
   * @desc 滑块颜色
   * @descEN Color of handle
   */
  handleColor: string;
  /**
   * @desc 滑块激活态边框色
   * @descEN Border color of handle when active
   */
  handleActiveColor: string;
  /**
   * @desc 滑块激活态外框色
   * @descEN Outline color of handle when active
   */
  handleActiveOutlineColor: string;
  /**
   * @desc 滑块禁用颜色
   * @descEN Color of handle when disabled
   */
  handleColorDisabled: string;
  /**
   * @desc 圆点边框颜色
   * @descEN Border color of dot
   */
  dotBorderColor: string;
  /**
   * @desc 圆点激活态边框颜色
   * @descEN Border color of dot when active
   */
  dotActiveBorderColor: string;
  /**
   * @desc 轨道禁用态背景色
   * @descEN Background color of track when disabled
   */
  trackBgDisabled: string;
}

interface SliderToken extends FullToken<'Slider'> {
  marginFull: number | string;
  marginPart: number | string;
  marginPartWithMark: number | string;
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
    handleColorDisabled,
    calc,
    handleSize,
    handleSizeHover,
    handleActiveColor,
    handleActiveOutlineColor,
    handleLineWidth,
    handleLineWidthHover,
    motionDurationMid,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      height: controlSize,
      margin: `${unit(marginPart)} ${unit(marginFull)}`,
      padding: 0,
      cursor: 'pointer',
      touchAction: 'none',

      '&-vertical': {
        margin: `${unit(marginFull)} ${unit(marginPart)}`,
      },

      [`${componentCls}-rail`]: {
        position: 'absolute',
        backgroundColor: token.railBg,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${motionDurationMid}`,
      },

      [`${componentCls}-track,${componentCls}-tracks`]: {
        position: 'absolute',
        transition: `background-color ${motionDurationMid}`,
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
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.colorPrimaryBorderHover}`,
        },

        [`${componentCls}-dot-active`]: {
          borderColor: token.dotActiveBorderColor,
        },
      },

      [`${componentCls}-handle`]: {
        position: 'absolute',
        width: handleSize,
        height: handleSize,
        outline: 'none',
        userSelect: 'none',

        // Dragging status
        '&-dragging-delete': {
          opacity: 0,
        },

        // 扩大选区
        '&::before': {
          content: '""',
          position: 'absolute',
          insetInlineStart: calc(handleLineWidth).mul(-1).equal(),
          insetBlockStart: calc(handleLineWidth).mul(-1).equal(),
          width: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          height: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          backgroundColor: 'transparent',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: handleSize,
          height: handleSize,
          backgroundColor: token.colorBgElevated,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.handleColor}`,
          outline: `0px solid transparent`,
          borderRadius: '50%',
          cursor: 'pointer',
          transition: `
            inset-inline-start ${motionDurationMid},
            inset-block-start ${motionDurationMid},
            width ${motionDurationMid},
            height ${motionDurationMid},
            box-shadow ${motionDurationMid},
            outline ${motionDurationMid}
          `,
        },

        '&:hover, &:active, &:focus': {
          '&::before': {
            insetInlineStart: calc(handleSizeHover)
              .sub(handleSize)
              .div(2)
              .add(handleLineWidthHover)
              .mul(-1)
              .equal(),
            insetBlockStart: calc(handleSizeHover)
              .sub(handleSize)
              .div(2)
              .add(handleLineWidthHover)
              .mul(-1)
              .equal(),
            width: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
            height: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
          },

          '&::after': {
            boxShadow: `0 0 0 ${unit(handleLineWidthHover)} ${handleActiveColor}`,
            outline: `6px solid ${handleActiveOutlineColor}`,
            width: handleSizeHover,
            height: handleSizeHover,
            insetInlineStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
            insetBlockStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
          },
        },
      },

      [`&-lock ${componentCls}-handle`]: {
        '&::before, &::after': {
          transition: 'none',
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
        border: `${unit(handleLineWidth)} solid ${token.dotBorderColor}`,
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
          width: handleSize,
          height: handleSize,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${handleColorDisabled}`,
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
  const { componentCls, railSize, handleSize, dotSize, marginFull, calc } = token;

  const railPadding: keyof React.CSSProperties = horizontal ? 'paddingBlock' : 'paddingInline';
  const full: keyof React.CSSProperties = horizontal ? 'width' : 'height';
  const part: keyof React.CSSProperties = horizontal ? 'height' : 'width';
  const handlePos: keyof React.CSSProperties = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset: keyof React.CSSProperties = horizontal ? 'top' : 'insetInlineStart';

  const handlePosSize = calc(railSize).mul(3).sub(handleSize).div(2).equal();
  const draggableBorderSize = calc(handleSize).sub(railSize).div(2).equal();

  const draggableBorder: React.CSSProperties = horizontal
    ? {
        borderWidth: `${unit(draggableBorderSize)} 0`,
        transform: `translateY(${unit(calc(draggableBorderSize).mul(-1).equal())})`,
      }
    : {
        borderWidth: `0 ${unit(draggableBorderSize)}`,
        transform: `translateX(${unit(token.calc(draggableBorderSize).mul(-1).equal())})`,
      };

  return {
    [railPadding]: railSize,
    [part]: calc(railSize).mul(3).equal(),

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
      [markInset]: calc(railSize)
        .mul(3)
        .add(horizontal ? 0 : marginFull)
        .equal(),
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
      [handlePos]: calc(railSize).sub(dotSize).div(2).equal(),
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
export const prepareComponentToken: GetDefaultToken<'Slider'> = (token) => {
  // Handle line width is always width-er 1px
  const increaseHandleWidth = 1;
  const controlSize = token.controlHeightLG / 4;
  const controlSizeHover = token.controlHeightSM / 2;
  const handleLineWidth = token.lineWidth + increaseHandleWidth;
  const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 1.5;
  const handleActiveColor = token.colorPrimary;
  const handleActiveOutlineColor = new FastColor(handleActiveColor).setA(0.2).toRgbString();

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
    handleActiveColor,
    handleActiveOutlineColor,
    handleColorDisabled: new FastColor(token.colorTextDisabled)
      .onBackground(token.colorBgContainer)
      .toHexString(),
    dotBorderColor: token.colorBorderSecondary,
    dotActiveBorderColor: token.colorPrimaryBorder,
    trackBgDisabled: token.colorBgContainerDisabled,
  };
};

export default genStyleHooks(
  'Slider',
  (token) => {
    const sliderToken = mergeToken<SliderToken>(token, {
      marginPart: token.calc(token.controlHeight).sub(token.controlSize).div(2).equal(),
      marginFull: token.calc(token.controlSize).div(2).equal(),
      marginPartWithMark: token.calc(token.controlHeightLG).sub(token.controlSize).equal(),
    });
    return [
      genBaseStyle(sliderToken),
      genHorizontalStyle(sliderToken),
      genVerticalStyle(sliderToken),
    ];
  },
  prepareComponentToken,
);
