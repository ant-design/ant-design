// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../tooltip/style';

// deps-lint-skip-all
import * as React from 'react';
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

interface SliderToken extends DerivativeToken {
  sliderCls: string;
  handleSize: number;
  sliderSize: number;
  railSize: number;
  dotSize: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SliderToken> = token => {
  const { sliderCls, sliderSize, dotSize } = token;

  const FIXED_RAIL_HOVER_COLOR = '#e1e1e1';

  return {
    [sliderCls]: {
      ...resetComponent(token),

      position: 'relative',
      height: sliderSize,
      margin: '10px 6px', // FIXME: hard code in v4
      padding: 0,
      cursor: 'pointer',
      touchAction: 'none',

      //   .vertical();

      [`${sliderCls}-rail`]: {
        position: 'absolute',
        backgroundColor: token.background,
        borderRadius: token.controlRadius,
        transition: `background-color ${token.duration}`,
      },

      [`${sliderCls}-track`]: {
        position: 'absolute',
        backgroundColor: token.tmpPrimaryColorWeak, // FIXME: Origin @primary-3
        borderRadius: token.controlRadius,
        transition: `background-color ${token.duration}`,
      },

      [`${sliderCls}-handle`]: {
        position: 'absolute',
        width: token.handleSize,
        height: token.handleSize,
        backgroundColor: token.componentBackground,
        border: `2px solid ${token.tmpPrimaryColorWeak}`,
        borderRadius: '50%',
        boxShadow: 'none',
        cursor: 'pointer',
        transition: `
          border-color ${token.duration},
          box-shadow ${token.duration},
          transform ${token.duration} cubic-bezier(0.18, 0.89, 0.32, 1.28)
        `,
        outline: 'none',

        [`${sliderCls}-dragging`]: {
          zIndex: 1,
        },

        '&:focus': {
          borderColor: token.primaryHoverColor,
          boxShadow: 'none',
        },

        '&:focus-visible': {
          // FIXME: This is a inline color calculation
          boxShadow: `0 0 0 5px ${new TinyColor(token.primaryHoverColor)
            .setAlpha(0.2)
            .toRgbString()}`,
        },

        // FIXME: Seems useless?
        //     &.@{ant-prefix}-tooltip-open {
        //       border-color: @slider-handle-color-tooltip-open;
        //     }
      },

      '&:hover': {
        [`${sliderCls}-rail`]: {
          backgroundColor: FIXED_RAIL_HOVER_COLOR, // FIXME: Not match color
        },

        [`${sliderCls}-track`]: {
          backgroundColor: token.primaryHoverColor, // FIXME: origin primary-4
        },

        [`${sliderCls}-dot`]: {
          borderColor: FIXED_RAIL_HOVER_COLOR,
        },

        // FIXME: We use below style instead
        //     ${sliderCls}-handle:not(.@{ant-prefix}-tooltip-open) {
        //       border-color: @slider-handle-color-hover;
        //     }

        [`
          ${sliderCls}-handle,
          ${sliderCls}-dot-active
        `]: {
          borderColor: token.primaryHoverColor,
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
        backgroundColor: token.componentBackground,
        border: `2px solid ${token.colorSplit}`, // FIXME: hardcode in v4
        borderRadius: '50%',
        cursor: 'pointer',
        transition: `border-color ${token.duration}`,

        '&-active': {
          borderColor: token.tmpPrimaryColorWeak,
        },
      },

      '&-disabled': {
        cursor: 'not-allowed',

        [`${sliderCls}-rail`]: {
          backgroundColor: `${token.background} !important`,
        },

        [`${sliderCls}-track`]: {
          backgroundColor: `${token.colorTextDisabled} !important`,
        },

        [`
          ${sliderCls}-handle,
          ${sliderCls}-dot
        `]: {
          backgroundColor: token.componentBackground,
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
  const { sliderCls, railSize, sliderSize, handleSize, dotSize } = token;

  const railPadding: keyof React.CSSProperties = horizontal ? 'paddingBlock' : 'paddingInline';
  const stretch: keyof React.CSSProperties = horizontal ? 'width' : 'height';
  const contain: keyof React.CSSProperties = horizontal ? 'height' : 'width';
  const handlePos: keyof React.CSSProperties = horizontal ? 'insetBlockStart' : 'insetInlineStart';
  const markInset: keyof React.CSSProperties = horizontal ? 'top' : 'insetInlineStart';

  return {
    [railPadding]: railSize,

    [`${sliderCls}-rail`]: {
      [stretch]: '100%',
      [contain]: railSize,
    },

    [`${sliderCls}-track`]: {
      [contain]: railSize,
    },

    [`${sliderCls}-handle`]: {
      [handlePos]: (sliderSize - handleSize) / 2,
    },

    [`${sliderCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: handleSize,
      [stretch]: '100%',
    },

    [`${sliderCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [stretch]: '100%',
      [contain]: railSize,
    },

    [`${sliderCls}-dot`]: {
      position: 'absolute',
      [handlePos]: (railSize - dotSize) / 2,
    },
  };
};
// ============================ Horizontal ============================
const genHorizontalStyle: GenerateStyle<SliderToken> = token => {
  const { sliderCls } = token;

  return {
    [`${sliderCls}-horizontal`]: {
      ...genDirectionStyle(token, true),

      [`&${sliderCls}-with-marks`]: {
        marginBottom: 28, // FIXME: hard code in v4
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

  const sliderSize = 12; // FIXME: hard code in v4

  const sliderToken: SliderToken = {
    ...token,
    sliderCls: `.${prefixCls}`,
    handleSize: 14, // FIXME: hard code in v4
    sliderSize,
    railSize: sliderSize / 3,
    dotSize: 8,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(sliderToken, hashId),
      genHorizontalStyle(sliderToken),
      genVerticalStyle(sliderToken),
    ]),
    hashId,
  ];
}
