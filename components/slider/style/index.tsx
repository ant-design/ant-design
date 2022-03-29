// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../tooltip/style';

// deps-lint-skip-all
import * as React from 'react';
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

// Direction naming standard:
// Horizontal base:
// -0-------------
// vertical: part   (水平时，垂直方向命名为 part)
// horizontal: full (水平时，水平方向命名为 full)

export interface ComponentToken {
  controlSize: number;
  railSize: number;
  handleSize: number;
  lineHandleWidth: number;
  dotSize: number;
}

interface SliderToken extends DerivativeToken, ComponentToken {
  sliderCls: string;
  marginFull: number;
  marginPart: number;
  marginPartWithMark: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SliderToken> = token => {
  const { sliderCls, controlSize, dotSize, marginFull, marginPart, colorBgContainerSecondary } =
    token;

  return {
    [sliderCls]: {
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

      [`${sliderCls}-rail`]: {
        position: 'absolute',
        backgroundColor: token.colorBgContainer,
        borderRadius: token.controlRadius,
        transition: `background-color ${token.motionDurationSlow}`,
      },

      [`${sliderCls}-track`]: {
        position: 'absolute',
        backgroundColor: token.colorPrimarySecondary,
        borderRadius: token.controlRadius,
        transition: `background-color ${token.motionDurationSlow}`,
      },

      [`${sliderCls}-handle`]: {
        position: 'absolute',
        width: token.handleSize,
        height: token.handleSize,
        backgroundColor: token.colorBgComponent,
        border: `${token.lineHandleWidth}px solid ${token.colorPrimarySecondary}`,
        borderRadius: '50%',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: `
          border-color ${token.motionDurationSlow},
          box-shadow ${token.motionDurationSlow},
          transform ${token.motionDurationSlow} cubic-bezier(0.18, 0.89, 0.32, 1.28)
        `,
        outline: 'none',

        [`${sliderCls}-dragging`]: {
          zIndex: 1,
        },

        '&:focus': {
          borderColor: token.colorPrimaryHover,
          boxShadow: 'none',
        },

        '&:focus-visible': {
          boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.colorPrimarySecondary}`,
        },

        // Seems useless?
        //     &.@{ant-prefix}-tooltip-open {
        //       border-color: @slider-handle-color-tooltip-open;
        //     }
      },

      '&:hover': {
        [`${sliderCls}-rail`]: {
          backgroundColor: colorBgContainerSecondary,
        },

        [`${sliderCls}-track`]: {
          backgroundColor: token.colorPrimaryHover,
        },

        [`${sliderCls}-dot`]: {
          borderColor: colorBgContainerSecondary,
        },

        // We use below style instead
        //     ${sliderCls}-handle:not(.@{ant-prefix}-tooltip-open) {
        //       border-color: @slider-handle-color-hover;
        //     }

        [`
          ${sliderCls}-handle,
          ${sliderCls}-dot-active
        `]: {
          borderColor: token.colorPrimaryHover,
        },
      },

      [`${sliderCls}-mark`]: {
        position: 'absolute',
        fontSize: token.fontSize,
      },

      [`${sliderCls}-mark-text`]: {
        position: 'absolute',
        display: 'inline-block',
        color: token.colorTextSecondary,
        textAlign: 'center',
        wordBreak: 'keep-all',
        cursor: 'pointer',
        userSelect: 'none',

        '&-active': {
          color: token.colorText,
        },
      },

      [`${sliderCls}-step`]: {
        position: 'absolute',
        background: 'transparent',
        pointerEvents: 'none',
      },

      [`${sliderCls}-dot`]: {
        position: 'absolute',
        width: dotSize,
        height: dotSize,
        backgroundColor: token.colorBgComponent,
        border: `${token.lineHandleWidth}px solid ${token.colorSplit}`,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: `border-color ${token.motionDurationSlow}`,

        '&-active': {
          borderColor: token.colorPrimarySecondary,
        },
      },

      '&-disabled': {
        cursor: 'not-allowed',

        [`${sliderCls}-rail`]: {
          backgroundColor: `${token.colorBgContainer} !important`,
        },

        [`${sliderCls}-track`]: {
          backgroundColor: `${token.colorTextDisabled} !important`,
        },

        [`
          ${sliderCls}-handle,
          ${sliderCls}-dot
        `]: {
          backgroundColor: token.colorBgComponent,
          borderColor: `${token.colorTextDisabled} !important`,
          boxShadow: 'none',
          cursor: 'not-allowed',
        },

        [`
          ${sliderCls}-mark-text,
          ${sliderCls}-dot
        `]: {
          cursor: `not-allowed !important`,
        },
      },
    },
  };
};

// ============================ Horizontal ============================
const genDirectionStyle = (token: SliderToken, horizontal: boolean): CSSObject => {
  const { sliderCls, railSize, controlSize, handleSize, dotSize } = token;

  const railPadding: keyof React.CSSProperties = horizontal ? 'paddingBlock' : 'paddingInline';
  const full: keyof React.CSSProperties = horizontal ? 'width' : 'height';
  const part: keyof React.CSSProperties = horizontal ? 'height' : 'width';
  const handlePos: keyof React.CSSProperties = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset: keyof React.CSSProperties = horizontal ? 'top' : 'insetInlineStart';

  return {
    [railPadding]: railSize,
    [part]: controlSize,

    [`${sliderCls}-rail`]: {
      [full]: '100%',
      [part]: railSize,
    },

    [`${sliderCls}-track`]: {
      [part]: railSize,
    },

    [`${sliderCls}-handle`]: {
      [handlePos]: (controlSize - handleSize) / 2,
    },

    [`${sliderCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: handleSize,
      [full]: '100%',
    },

    [`${sliderCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [full]: '100%',
      [part]: railSize,
    },

    [`${sliderCls}-dot`]: {
      position: 'absolute',
      [handlePos]: (railSize - dotSize) / 2,
    },
  };
};
// ============================ Horizontal ============================
const genHorizontalStyle: GenerateStyle<SliderToken> = token => {
  const { sliderCls, marginPartWithMark } = token;

  return {
    [`${sliderCls}-horizontal`]: {
      ...genDirectionStyle(token, true),

      [`&${sliderCls}-with-marks`]: {
        marginBottom: marginPartWithMark,
      },
    },
  };
};

// ============================= Vertical =============================
const genVerticalStyle: GenerateStyle<SliderToken> = token => {
  const { sliderCls } = token;

  return {
    [`${sliderCls}-vertical`]: {
      ...genDirectionStyle(token, false),
      height: '100%',
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { controlHeightSM, controlHeightLG, controlHeight, lineWidth, Slider } = token;

      // Handle line width is always width-er 1px
      const increaseHandleWidth = 1;
      const controlSize = controlHeightSM / 2;
      const lineHandleWidth = lineWidth + increaseHandleWidth;

      const sliderToken: SliderToken = {
        ...token,
        sliderCls: `.${prefixCls}`,

        controlSize,
        railSize: controlSize / 3,
        handleSize: controlSize + lineHandleWidth,
        dotSize: (controlSize / 3) * 2,
        lineHandleWidth,

        marginPart: (controlHeight - controlSize) / 2,
        marginFull: controlSize / 2,
        marginPartWithMark: controlHeightLG - controlSize,

        ...Slider,
      };

      return [
        genBaseStyle(sliderToken, hashId),
        genHorizontalStyle(sliderToken),
        genVerticalStyle(sliderToken),
      ];
    }),
    hashId,
  ];
}
