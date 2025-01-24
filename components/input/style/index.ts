import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { ComponentToken, InputToken } from './token';
import { initComponentToken, initInputToken } from './token';
import { genBorderlessStyle, genFilledStyle, genOutlinedStyle } from './variants';

export type { ComponentToken };
export { initComponentToken, initInputToken };

export const genPlaceholderStyle = (color: string): CSSObject => ({
  // Firefox
  '&::-moz-placeholder': {
    opacity: 1,
  },
  '&::placeholder': {
    color,
    userSelect: 'none', // https://github.com/ant-design/ant-design/pull/32639
  },
  '&:placeholder-shown': {
    textOverflow: 'ellipsis',
  },
});

export const genActiveStyle = (token: InputToken) => ({
  borderColor: token.activeBorderColor,
  boxShadow: token.activeShadow,
  outline: 0,
  backgroundColor: token.activeBg,
});

export const genInputLargeStyle = (token: InputToken): CSSObject => {
  const { paddingBlockLG, lineHeightLG, borderRadiusLG, paddingInlineLG } = token;

  return {
    padding: `${unit(paddingBlockLG)} ${unit(paddingInlineLG)}`,
    fontSize: token.inputFontSizeLG,
    lineHeight: lineHeightLG,
    borderRadius: borderRadiusLG,
  };
};

export const genInputSmallStyle = (token: InputToken): CSSObject => ({
  padding: `${unit(token.paddingBlockSM)} ${unit(token.paddingInlineSM)}`,
  fontSize: token.inputFontSizeSM,
  borderRadius: token.borderRadiusSM,
});

export const genBasicInputStyle = (token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${unit(token.paddingBlock)} ${unit(token.paddingInline)}`,
  color: token.colorText,
  fontSize: token.inputFontSize,
  lineHeight: token.lineHeight,
  borderRadius: token.borderRadius,
  transition: `all ${token.motionDurationMid}`,
  ...genPlaceholderStyle(token.colorTextPlaceholder),

  // Reset height for `textarea`s
  'textarea&': {
    maxWidth: '100%', // prevent textarea resize from coming out of its container
    height: 'auto',
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: 'bottom',
    transition: `all ${token.motionDurationSlow}, height 0s`,
    resize: 'vertical',
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },

  // RTL
  '&-rtl, &-textarea-rtl': {
    direction: 'rtl',
  },
});

const genInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls, controlHeightSM, lineWidth, calc } = token;

  const FIXED_CHROME_COLOR_HEIGHT = 16;
  const colorSmallPadding = calc(controlHeightSM)
    .sub(calc(lineWidth).mul(2))
    .sub(FIXED_CHROME_COLOR_HEIGHT)
    .div(2)
    .equal();

  return {
    [componentCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),

      // Variants
      ...genOutlinedStyle(token),
      ...genFilledStyle(token),
      ...genBorderlessStyle(token),

      '&[type="color"]': {
        height: token.controlHeight,

        [`&${componentCls}-lg`]: {
          height: token.controlHeightLG,
        },
        [`&${componentCls}-sm`]: {
          height: controlHeightSM,
          paddingTop: colorSmallPadding,
          paddingBottom: colorSmallPadding,
        },
      },

      '&[type="search"]::-webkit-search-cancel-button, &[type="search"]::-webkit-search-decoration':
        {
          '-webkit-appearance': 'none',
        },
    },
  };
};

const genAllowClearStyle = (token: InputToken): CSSObject => {
  const { componentCls } = token;
  return {
    // ========================= Input =========================
    [`${componentCls}-clear-icon`]: {
      margin: 0,
      padding: 0,
      lineHeight: 0,
      color: token.colorTextQuaternary,
      fontSize: token.fontSizeIcon,
      verticalAlign: -1,
      // https://github.com/ant-design/ant-design/pull/18151
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: 'pointer',
      transition: `color ${token.motionDurationSlow}`,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      '&:hover': {
        color: token.colorTextTertiary,
      },

      '&:active': {
        color: token.colorText,
      },

      '&-hidden': {
        visibility: 'hidden',
      },

      '&-has-suffix': {
        margin: `0 ${unit(token.inputAffixPadding)}`,
      },
    },
  };
};

const genAffixStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const {
    componentCls,
    inputAffixPadding,
    colorTextDescription,
    motionDurationSlow,
    colorIcon,
    colorIconHover,
    iconCls,
  } = token;

  const affixCls = `${componentCls}-affix-wrapper`;
  const affixClsDisabled = `${componentCls}-affix-wrapper-disabled`;

  return {
    [affixCls]: {
      ...genBasicInputStyle(token),
      display: 'inline-flex',

      [`&:not(${componentCls}-disabled):hover`]: {
        zIndex: 1,
        [`${componentCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      [`> input${componentCls}`]: {
        padding: 0,
      },

      [`> input${componentCls}, > textarea${componentCls}`]: {
        fontSize: 'inherit',
        border: 'none',
        borderRadius: 0,
        outline: 'none',
        background: 'transparent',
        color: 'inherit',

        '&::-ms-reveal': {
          display: 'none',
        },

        '&:focus': {
          boxShadow: 'none !important',
        },
      },

      '&::before': {
        display: 'inline-block',
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [componentCls]: {
        '&-prefix, &-suffix': {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',

          '> *:not(:last-child)': {
            marginInlineEnd: token.paddingXS,
          },
        },

        '&-show-count-suffix': {
          color: colorTextDescription,
        },

        '&-show-count-has-suffix': {
          marginInlineEnd: token.paddingXXS,
        },

        '&-prefix': {
          marginInlineEnd: inputAffixPadding,
        },

        '&-suffix': {
          marginInlineStart: inputAffixPadding,
        },
      },

      ...genAllowClearStyle(token),

      // password
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: 'pointer',
        transition: `all ${motionDurationSlow}`,

        '&:hover': {
          color: colorIconHover,
        },
      },
    },
    [affixClsDisabled]: {
      // password disabled
      [`${iconCls}${componentCls}-password-icon`]: {
        color: colorIcon,
        cursor: 'not-allowed',

        '&:hover': {
          color: colorIcon,
        },
      },
    },
  };
};

const genSearchInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { componentCls, antCls } = token;
  const searchPrefixCls = `${componentCls}-search`;
  return {
    [searchPrefixCls]: {
      [componentCls]: {
        '&:hover, &:focus': {
          [`+ ${componentCls}-group-addon ${searchPrefixCls}-button:not(${antCls}-btn-primary)`]: {
            borderInlineStartColor: token.colorPrimaryHover,
          },
        },
      },

      [`${componentCls}-affix-wrapper`]: {
        height: token.controlHeight,
        borderRadius: 0,
      },

      // fix slight height diff in Firefox:
      // https://ant.design/components/auto-complete-cn/#auto-complete-demo-certain-category
      [`${componentCls}-lg`]: {
        lineHeight: token.calc(token.lineHeightLG).sub(0.0002).equal(),
      },

      [`> ${componentCls}-group`]: {
        [`> ${componentCls}-group-addon:last-child`]: {
          insetInlineStart: -1,
          padding: 0,
          border: 0,

          [`${searchPrefixCls}-button`]: {
            // Fix https://github.com/ant-design/ant-design/issues/47150
            marginInlineEnd: -1,
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            boxShadow: 'none',
          },

          [`${searchPrefixCls}-button:not(${antCls}-btn-primary)`]: {
            color: token.colorTextDescription,

            '&:hover': {
              color: token.colorPrimaryHover,
            },

            '&:active': {
              color: token.colorPrimaryActive,
            },

            [`&${antCls}-btn-loading::before`]: {
              insetInlineStart: 0,
              insetInlineEnd: 0,
              insetBlockStart: 0,
              insetBlockEnd: 0,
            },
          },
        },
      },

      [`${searchPrefixCls}-button`]: {
        height: token.controlHeight,

        '&:hover, &:focus': {
          zIndex: 1,
        },
      },

      '&-large': {
        [`${componentCls}-affix-wrapper, ${searchPrefixCls}-button`]: {
          height: token.controlHeightLG,
        },
      },

      '&-small': {
        [`${componentCls}-affix-wrapper, ${searchPrefixCls}-button`]: {
          height: token.controlHeightSM,
        },
      },

      '&-rtl': {
        direction: 'rtl',
      },

      // ===================== Compact Item Customized Styles =====================
      [`&${componentCls}-compact-item`]: {
        [`&:not(${componentCls}-compact-last-item)`]: {
          [`${componentCls}-group-addon`]: {
            [`${componentCls}-search-button`]: {
              marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
              borderRadius: 0,
            },
          },
        },

        [`&:not(${componentCls}-compact-first-item)`]: {
          [`${componentCls},${componentCls}-affix-wrapper`]: {
            borderRadius: 0,
          },
        },

        [`> ${componentCls}-group-addon ${componentCls}-search-button,
        > ${componentCls},
        ${componentCls}-affix-wrapper`]: {
          '&:hover, &:focus, &:active': {
            zIndex: 2,
          },
        },

        [`> ${componentCls}-affix-wrapper-focused`]: {
          zIndex: 2,
        },
      },
    },
  };
};

const genTextAreaStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingLG } = token;
  const textareaPrefixCls = `${componentCls}-textarea`;

  return {
    [textareaPrefixCls]: {
      position: 'relative',

      '&-show-count': {
        // https://github.com/ant-design/ant-design/issues/33049
        [`> ${componentCls}`]: {
          height: '100%',
        },

        [`${componentCls}-data-count`]: {
          position: 'absolute',
          bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        },
      },

      [`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: {
        paddingInlineEnd: paddingLG,
      },

      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,

        [`> textarea${componentCls}`]: {
          fontSize: 'inherit',
          border: 'none',
          outline: 'none',
          background: 'transparent',

          '&:focus': {
            boxShadow: 'none !important',
          },
        },

        [`${componentCls}-suffix`]: {
          margin: 0,

          '> *:not(:last-child)': {
            marginInline: 0,
          },

          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: 'absolute',
            insetInlineEnd: token.paddingInline,
            insetBlockStart: token.paddingXS,
          },

          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: 'absolute',
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            margin: 'auto',
            pointerEvents: 'none',
          },
        },
      },

      [`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-clear-icon`]: {
            insetInlineEnd: token.paddingInlineSM,
          },
        },
      },
    },
  };
};

// ============================== Range ===============================
const genRangeStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-out-of-range`]: {
      [`&, & input, & textarea, ${componentCls}-show-count-suffix, ${componentCls}-data-count`]: {
        color: token.colorError,
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  'Input',
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token));

    return [
      genInputStyle(inputToken),
      genTextAreaStyle(inputToken),
      genAffixStyle(inputToken),
      genSearchInputStyle(inputToken),
      genRangeStyle(inputToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(inputToken),
    ];
  },
  initComponentToken,
  {
    resetFont: false,
  },
);
