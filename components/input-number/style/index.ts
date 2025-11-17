import { unit } from '@ant-design/cssinjs';

import { genBasicInputStyle, genPlaceholderStyle, initInputToken } from '../../input/style';
import {
  genBorderlessStyle,
  genFilledStyle,
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

const genInputNumberStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    borderRadius,
    inputFontSizeSM,
    inputFontSizeLG,
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
    inputAffixPadding,
    borderRadiusSM,
    controlWidth,
    handleBorderColor,
    filledHandleBg,
    lineHeightLG,
  } = token;

  const borderStyle = `${unit(lineWidth)} ${lineType} ${handleBorderColor}`;

  return [
    // ==========================================================
    // ==                         Base                         ==
    // ==========================================================
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genBasicInputStyle(token),

        '--input-number-input-padding-block': unit(paddingBlock),
        '--input-number-input-padding-inline': unit(paddingInline),

        display: 'inline-flex',
        width: controlWidth,
        margin: 0,
        paddingBlock: 0,
        borderRadius,

        // ======================= Variants =======================
        ...genOutlinedStyle(token, {
          [`${componentCls}-actions`]: {
            background: handleBg,
            [`${componentCls}-action-down`]: {
              borderBlockStart: borderStyle,
            },
          },
        }),
        ...genFilledStyle(token, {
          [`${componentCls}-actions`]: {
            background: filledHandleBg,
            [`${componentCls}-action-down`]: {
              borderBlockStart: borderStyle,
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
              borderBlockStart: borderStyle,
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

        // ===================== Out Of Range =====================
        [`&${componentCls}-out-of-range`]: {
          [`${componentCls}-input`]: {
            color: colorError,
          },
        },

        // ======================== Input =========================
        [`${componentCls}-input`]: {
          ...resetComponent(token),
          width: '100%',
          paddingBlock: `var(--input-number-input-padding-block)`,
          textAlign: 'start',
          backgroundColor: 'transparent',
          border: 0,
          borderRadius,
          outline: 0,
          transition: `all ${motionDurationMid} linear`,
          appearance: 'textfield',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          ...genPlaceholderStyle(token.colorTextPlaceholder),

          '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':
            {
              margin: 0,
              appearance: 'none',
            },
        },
        [`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
          width: token.handleWidth,
          opacity: 1,
        },

        // ======================= Disabled =======================
        [`&-disabled ${componentCls}-input`]: {
          cursor: 'not-allowed',
          color: token.colorTextDisabled,
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

        [`${componentCls}-action`]: {
          ...resetIcon(),

          userSelect: 'none',
          overflow: 'hidden',
          fontWeight: 'bold',
          lineHeight: 0,
          textAlign: 'center',
          cursor: 'pointer',
          transition: `all ${motionDurationMid} linear`,

          '&:active': {
            background: handleActiveBg,
          },
          // Hover
          '&:hover': {
            color: handleHoverColor,
          },
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
            color: colorIcon,
            height: '50%',
            borderInlineStart: borderStyle,

            // Hover
            '&:hover': {
              height: `60%`,
            },
          },

          [`&${componentCls}-disabled, &${componentCls}-readonly`]: {
            [`${componentCls}-actions`]: {
              display: 'none',
            },
          },
        },

        // ==================== Spinner Mode ====================
        [`&${componentCls}-mode-spinner`]: {
          padding: 0,
          width: 'auto',

          [`${componentCls}-action`]: {
            flex: 'none',
            paddingInline: 'var(--input-number-input-padding-inline)',

            '&-up': {
              borderInlineStart: borderStyle,
            },

            '&-down': {
              borderInlineEnd: borderStyle,
            },
          },

          [`${componentCls}-input`]: {
            textAlign: 'center',
            paddingInline: 'var(--input-number-input-padding-inline)',
          },
        },
      },
    },

    // ==========================================================
    // ==                         Size                         ==
    // ==========================================================
    {
      [componentCls]: {
        '&-lg': {
          '--input-number-input-padding-block': unit(paddingBlockLG),
          '--input-number-input-padding-inline': unit(paddingInlineLG),

          paddingBlock: 0,
          fontSize: inputFontSizeLG,
          lineHeight: lineHeightLG,
        },

        '&-sm': {
          '--input-number-input-padding-block': unit(paddingBlockSM),
          '--input-number-input-padding-inline': unit(paddingInlineSM),

          paddingBlock: 0,
          fontSize: inputFontSizeSM,
          borderRadius: borderRadiusSM,
        },
      },
    },

    // ==========================================================
    // ==                      Pre/Suffix                      ==
    // ==========================================================
    {
      [componentCls]: {
        [`${componentCls}-prefix, ${componentCls}-suffix`]: {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',
          alignSelf: 'center',
          pointerEvents: 'none',
        },

        [`${componentCls}-prefix`]: {
          marginInlineEnd: inputAffixPadding,
        },

        [`${componentCls}-suffix`]: {
          height: '100%',
          marginInlineStart: inputAffixPadding,
          transition: `margin ${motionDurationMid}`,
        },

        [`&:hover:not(${componentCls}-without-controls)`]: {
          [`${componentCls}-suffix`]: {
            marginInlineEnd: token.handleWidth,
          },
        },
      },
    },
  ];
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
