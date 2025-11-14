import { unit } from '@ant-design/cssinjs';

import {
  genBasicInputStyle,
  genInputGroupStyle,
  genPlaceholderStyle,
  initInputToken,
} from '../../input/style';
import {
  genBorderlessStyle,
  genFilledGroupStyle,
  genFilledStyle,
  genOutlinedGroupStyle,
  genOutlinedStyle,
  genUnderlinedStyle,
} from '../../input/style/variants';
import { resetComponent, resetIcon } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { ComponentToken, InputNumberToken } from './token';
import { prepareComponentToken } from './token';

export type { ComponentToken };

export const genRadiusStyle = (
  { componentCls, borderRadiusSM, borderRadiusLG }: InputNumberToken,
  size: 'lg' | 'sm',
) => {
  const borderRadius = size === 'lg' ? borderRadiusLG : borderRadiusSM;
  return {
    [`&-${size}`]: {
      [`${componentCls}-handler-wrap`]: {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius,
      },
      [`${componentCls}-handler-up`]: {
        borderStartEndRadius: borderRadius,
      },
      [`${componentCls}-handler-down`]: {
        borderEndEndRadius: borderRadius,
      },
    },
  };
};

const genInputNumberStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    borderRadius,
    inputFontSizeSM,
    inputFontSizeLG,
    controlHeightLG,
    controlHeightSM,
    colorError,
    paddingInlineSM,
    paddingBlockSM,
    paddingBlockLG,
    paddingInlineLG,
    colorIcon,
    motionDurationMid,
    handleHoverColor,
    handleOpacity,
    paddingInline,
    paddingBlock,
    handleBg,
    handleActiveBg,
    colorTextDisabled,
    borderRadiusSM,
    borderRadiusLG,
    controlWidth,
    handleBorderColor,
    filledHandleBg,
    lineHeightLG,
    calc,
  } = token;

  return [
    // ==========================================================
    // ==                         Base                         ==
    // ==========================================================
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genBasicInputStyle(token),

        display: 'inline-flex',
        width: controlWidth,
        margin: 0,
        padding: 0,
        borderRadius,

        // ======================= Variants =======================
        ...genOutlinedStyle(token, {
          [`${componentCls}-actions`]: {
            background: handleBg,
            [`${componentCls}-action-down`]: {
              borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
            },
          },
        }),
        ...genFilledStyle(token, {
          [`${componentCls}-actions`]: {
            background: filledHandleBg,
            [`${componentCls}-action-down`]: {
              borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
            },
          },
          '&:focus-within': {
            [`${componentCls}-actions`]: {
              background: handleBg,
            },
          },
        }),
        ...genUnderlinedStyle(token, {
          [`${componentCls}-actions`]: {
            background: handleBg,
            [`${componentCls}-action-down`]: {
              borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
            },
          },
        }),
        ...genBorderlessStyle(token),

        // ========================= RTL ==========================
        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-input`]: {
            direction: 'rtl',
          },
        },

        // ========================= Size =========================
        '&-lg': {
          padding: 0,
          fontSize: inputFontSizeLG,
          lineHeight: lineHeightLG,
          borderRadius: borderRadiusLG,

          [`input${componentCls}-input`]: {
            height: calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal(),
            padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
          },
        },

        '&-sm': {
          padding: 0,
          fontSize: inputFontSizeSM,
          borderRadius: borderRadiusSM,

          [`input${componentCls}-input`]: {
            height: calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal(),
            padding: `${unit(paddingBlockSM)} ${unit(paddingInlineSM)}`,
          },
        },

        // ===================== Out Of Range =====================
        '&-out-of-range': {
          [`${componentCls}-input-wrap`]: {
            input: {
              color: colorError,
            },
          },
        },

        // // Style for input-group: input with label, with button or dropdown...
        // '&-group': {
        //   ...resetComponent(token),
        //   ...genInputGroupStyle(token),

        //   '&-wrapper': {
        //     display: 'inline-block',
        //     textAlign: 'start',
        //     verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403

        //     [`${componentCls}-affix-wrapper`]: {
        //       width: '100%',
        //     },

        //     // Size
        //     '&-lg': {
        //       [`${componentCls}-group-addon`]: {
        //         borderRadius: borderRadiusLG,
        //         fontSize: token.fontSizeLG,
        //       },
        //     },
        //     '&-sm': {
        //       [`${componentCls}-group-addon`]: {
        //         borderRadius: borderRadiusSM,
        //       },
        //     },

        //     // Variants
        //     ...genOutlinedGroupStyle(token),
        //     ...genFilledGroupStyle(token),

        //     // Fix the issue of using icons in Space Compact mode
        //     // https://github.com/ant-design/ant-design/issues/45764
        //     [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]:
        //       {
        //         [`${componentCls}, ${componentCls}-group-addon`]: {
        //           borderRadius: 0,
        //         },
        //       },

        //     [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
        //       [`${componentCls}, ${componentCls}-group-addon`]: {
        //         borderStartEndRadius: 0,
        //         borderEndEndRadius: 0,
        //       },
        //     },

        //     [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
        //       [`${componentCls}, ${componentCls}-group-addon`]: {
        //         borderStartStartRadius: 0,
        //         borderEndStartRadius: 0,
        //       },
        //     },
        //   },
        // },

        [`&-disabled ${componentCls}-input`]: {
          cursor: 'not-allowed',
        },

        [componentCls]: {
          '&-input': {
            ...resetComponent(token),
            width: '100%',
            padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
            textAlign: 'start',
            backgroundColor: 'transparent',
            border: 0,
            borderRadius,
            outline: 0,
            transition: `all ${motionDurationMid} linear`,
            appearance: 'textfield',
            fontSize: 'inherit',
            ...genPlaceholderStyle(token.colorTextPlaceholder),

            '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':
              {
                margin: 0,
                appearance: 'none',
              },
          },
        },
        [`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
          width: token.handleWidth,
          opacity: 1,
        },
      },
    },

    // ==========================================================
    // ==                        Action                        ==
    // ==========================================================
    {
      [componentCls]: {
        // ======================= Shared =======================
        [`
          ${componentCls}-action-up-disabled,
          ${componentCls}-action-down-disabled
        `]: {
          cursor: 'not-allowed',
        },

        // ===================== Input Mode =====================
        '&-mode-input': {
          overflow: 'hidden',

          [`${componentCls}-actions`]: {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineEnd: 0,
            width: token.handleVisibleWidth,
            opacity: handleOpacity,
            height: '100%',
            borderRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            transition: `all ${motionDurationMid}`,
            overflow: 'hidden',

            // Fix input number inside Menu makes icon too large
            // We arise the selector priority by nest selector here
            // https://github.com/ant-design/ant-design/issues/14367
            [`${componentCls}-action`]: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'auto',
              height: '40%',
              marginInlineEnd: 0,
              fontSize: token.handleFontSize,
            },
          },

          [`&:hover ${componentCls}-actions, &-focused ${componentCls}-actions`]: {
            width: token.handleWidth,
            opacity: 1,
          },

          [`${componentCls}-action`]: {
            ...resetIcon(),
            color: colorIcon,
            userSelect: 'none',
            height: '50%',
            overflow: 'hidden',
            fontWeight: 'bold',
            lineHeight: 0,
            textAlign: 'center',
            cursor: 'pointer',
            borderInlineStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
            transition: `all ${motionDurationMid} linear`,

            '&:active': {
              background: handleActiveBg,
            },
            // Hover
            '&:hover': {
              height: `60%`,
              color: handleHoverColor,
            },
          },

          [`&${componentCls}-disabled, &${componentCls}-readonly`]: {
            [`${componentCls}-actions`]: {
              display: 'none',
            },
          },
        },

        // ==================== Spinner Mode ====================
      },
    },

    // Spinner Handler
    {
      [`${componentCls}${componentCls}-mode-spinner`]: {
        display: 'inline-flex',
        alignItems: 'stretch',

        [`${componentCls}-handler`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'auto',
          width: token.handleWidth,
          flex: '0 0 auto',
          borderRadius: 0,
        },

        [`${componentCls}-handler-up`]: {
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
          borderEndRadius: borderRadius,
        },

        [`${componentCls}-handler-down`]: {
          borderInlineEnd: `${unit(lineWidth)} ${lineType} ${handleBorderColor} `,
          borderInlineStart: 'none',
        },

        [`${componentCls}-input`]: {
          textAlign: 'center',
        },
      },
    },
  ];
};

const genAffixWrapperStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    componentCls,
    paddingBlock,
    paddingInline,
    inputAffixPadding,
    controlWidth,
    borderRadiusLG,
    borderRadiusSM,
    paddingInlineLG,
    paddingInlineSM,
    paddingBlockLG,
    paddingBlockSM,
    motionDurationMid,
  } = token;

  return {
    [`${componentCls}-affix-wrapper`]: {
      [`input${componentCls}-input`]: {
        padding: `${unit(paddingBlock)} 0`,
      },

      ...genBasicInputStyle(token),
      // or number handler will cover form status
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: controlWidth,
      padding: 0,
      paddingInlineStart: paddingInline,

      '&-lg': {
        borderRadius: borderRadiusLG,
        paddingInlineStart: paddingInlineLG,

        [`input${componentCls}-input`]: {
          padding: `${unit(paddingBlockLG)} 0`,
        },
      },

      '&-sm': {
        borderRadius: borderRadiusSM,
        paddingInlineStart: paddingInlineSM,

        [`input${componentCls}-input`]: {
          padding: `${unit(paddingBlockSM)} 0`,
        },
      },

      [`&:not(${componentCls}-disabled):hover`]: {
        zIndex: 1,
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      [`&-disabled > ${componentCls}-disabled`]: {
        background: 'transparent',
      },

      [`> div${componentCls}`]: {
        width: '100%',
        border: 'none',
        outline: 'none',

        [`&${componentCls}-focused`]: {
          boxShadow: 'none !important',
        },
      },

      '&::before': {
        display: 'inline-block',
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [`${componentCls}-handler-wrap`]: {
        zIndex: 2,
      },

      [componentCls]: {
        position: 'static',
        color: 'inherit',

        '&-prefix, &-suffix': {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',
          pointerEvents: 'none',
        },

        '&-prefix': {
          marginInlineEnd: inputAffixPadding,
        },

        '&-suffix': {
          insetBlockStart: 0,
          insetInlineEnd: 0,
          height: '100%',
          marginInlineEnd: paddingInline,
          marginInlineStart: inputAffixPadding,
          transition: `margin ${motionDurationMid}`,
        },
      },

      [`&:not(${componentCls}-affix-wrapper-without-controls):hover ${componentCls}-suffix`]: {
        marginInlineEnd: token.calc(token.handleWidth).add(paddingInline).equal(),
      },
    },
    // 覆盖 affix-wrapper borderRadius！
    [`${componentCls}-underlined`]: {
      borderRadius: 0,
    },
  };
};

const genCompatibleStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const { componentCls, antCls } = token;

  return {
    [`${componentCls}-addon`]: {
      [`&:has(${antCls}-select)`]: {
        border: 0,
        padding: 0,
      },
    },
  };
};

export default genStyleHooks(
  'InputNumber',
  (token) => {
    const inputNumberToken = mergeToken<InputNumberToken>(token, initInputToken(token));
    return [
      genInputNumberStyles(inputNumberToken),
      // genAffixWrapperStyles(inputNumberToken),
      genCompatibleStyles(inputNumberToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(inputNumberToken),
    ];
  },
  prepareComponentToken,
  {
    unitless: {
      handleOpacity: true,
    },
    resetFont: false,
  },
);
