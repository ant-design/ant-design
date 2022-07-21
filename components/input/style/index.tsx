import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import type { GlobalToken } from '../../theme/interface';
import { clearFix, resetComponent } from '../../style';

export type InputToken<T extends GlobalToken = FullToken<'Input'>> = T & {
  inputAffixPadding: number;
  inputPaddingVertical: number;
  inputPaddingVerticalLG: number;
  inputPaddingVerticalSM: number;
  inputPaddingHorizontal: number;
  inputPaddingHorizontalSM: number;
  inputBorderHoverColor: string;
  inputBorderActiveColor: string;
};

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

export const genHoverStyle = (token: InputToken): CSSObject => ({
  borderColor: token.inputBorderHoverColor,
  borderInlineEndWidth: token.controlLineWidth,
});

export const genActiveStyle = (token: InputToken) => ({
  borderColor: token.inputBorderHoverColor,
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.controlOutline}`,
  borderInlineEndWidth: token.controlLineWidth,
  outline: 0,
});

export const genDisabledStyle = (token: InputToken): CSSObject => ({
  color: token.colorTextDisabled,
  backgroundColor: token.colorBgContainerDisabled,
  borderColor: token.colorBorder,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle(mergeToken<InputToken>(token, { inputBorderHoverColor: token.colorBorder })),
  },
});

const genInputLargeStyle = (token: InputToken): CSSObject => {
  const { inputPaddingVerticalLG, inputPaddingHorizontal, fontSizeLG } = token;

  return {
    padding: `${inputPaddingVerticalLG}px ${inputPaddingHorizontal}px`,
    fontSize: fontSizeLG,
  };
};

export const genInputSmallStyle = (token: InputToken): CSSObject => ({
  padding: `${token.inputPaddingVerticalSM}px ${token.controlPaddingHorizontalSM - 1}px`,
});

export const genStatusStyle = (token: InputToken): CSSObject => {
  const { prefixCls, colorError, colorWarning, colorErrorOutline, colorWarningOutline } = token;

  return {
    '&-status-error:not(&-disabled):not(&-borderless)&': {
      '&, &:hover': {
        borderColor: colorError,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            inputBorderActiveColor: colorError,
            inputBorderHoverColor: colorError,
            controlOutline: colorErrorOutline,
          }),
        ),
      },

      [`.${prefixCls}-prefix`]: {
        color: colorError,
      },
    },
    '&-status-warning:not(&-disabled):not(&-borderless)&': {
      '&, &:hover': {
        borderColor: colorWarning,
      },

      '&:focus, &-focused': {
        ...genActiveStyle(
          mergeToken<InputToken>(token, {
            inputBorderActiveColor: colorWarning,
            inputBorderHoverColor: colorWarning,
            controlOutline: colorWarningOutline,
          }),
        ),
      },

      [`.${prefixCls}-prefix`]: {
        color: colorWarning,
      },
    },
  };
};

export const genBasicInputStyle = (token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.colorBgContainer,
  backgroundImage: 'none',
  borderWidth: token.controlLineWidth,
  borderStyle: token.controlLineType,
  borderColor: token.colorBorder,
  borderRadius: token.controlRadius,
  transition: `all ${token.motionDurationSlow}`,
  ...genPlaceholderStyle(token.colorTextPlaceholder),

  '&:hover': {
    ...genHoverStyle(token),
  },

  '&:focus, &-focused': {
    ...genActiveStyle(token),
  },

  '&-disabled, &[disabled]': {
    ...genDisabledStyle(token),
  },

  '&-borderless': {
    '&, &:hover, &:focus, &-focused, &-disabled, &[disabled]': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },

  // Reset height for `textarea`s
  'textarea&': {
    maxWidth: '100%', // prevent textearea resize from coming out of its container
    height: 'auto',
    minHeight: token.controlHeight,
    lineHeight: token.lineHeight,
    verticalAlign: 'bottom',
    transition: `all ${token.motionDurationSlow}, height 0s`,
  },

  '&-textarea': {
    '&-rtl': {
      direction: 'rtl',
    },
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },

  '&-rtl': {
    direction: 'rtl',
  },
});

export const genInputGroupStyle = (token: InputToken): CSSObject => {
  const { prefixCls } = token;

  return {
    position: 'relative',
    display: 'table',
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,

    // Undo padding and float of grid classes
    [`&[class*='col-']`]: {
      paddingInlineEnd: token.paddingXS,

      '&:last-child': {
        paddingInlineEnd: 0,
      },
    },

    // Sizing options
    [`&-lg .${prefixCls}, &-lg > .${prefixCls}-group-addon`]: {
      ...genInputLargeStyle(token),
    },

    [`&-sm .${prefixCls}, &-sm > .${prefixCls}-group-addon`]: {
      ...genInputSmallStyle(token),
    },

    // Fix https://github.com/ant-design/ant-design/issues/5754
    '&-lg .ant-select-single .ant-select-selector': {
      height: token.controlHeightLG,
    },

    '&-sm .ant-select-single .ant-select-selector': {
      height: token.controlHeightSM,
    },

    [`> .${prefixCls}`]: {
      display: 'table-cell',

      '&:not(:first-child):not(:last-child)': {
        borderRadius: 0,
      },
    },

    [`.${prefixCls}-group`]: {
      [`&-addon, &-wrap`]: {
        display: 'table-cell',
        width: 1,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',

        '&:not(:first-child):not(:last-child)': {
          borderRadius: 0,
        },
      },

      '&-wrap > *': {
        display: 'block !important',
      },

      '&-addon': {
        position: 'relative',
        padding: `0 ${token.inputPaddingHorizontal}px`,
        color: token.colorText,
        fontWeight: 'normal',
        fontSize: token.fontSize,
        textAlign: 'center',
        backgroundColor: token.colorFillAlter,
        border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        borderRadius: token.controlRadius,
        transition: `all ${token.motionDurationSlow}`,

        // Reset Select's style in addon
        '.ant-select': {
          margin: `-${token.inputPaddingVertical + 1}px -${token.inputPaddingHorizontal}px`,

          '&.ant-select-single:not(.ant-select-customize-input)': {
            '.ant-select-selector': {
              backgroundColor: 'inherit',
              border: `${token.controlLineWidth}px ${token.controlLineType} transparent`,
              boxShadow: 'none',
            },
          },

          '&-open, &-focused': {
            '.ant-select-selector': {
              color: token.colorPrimary,
            },
          },
        },

        // https://github.com/ant-design/ant-design/issues/31333
        '.ant-cascader-picker': {
          margin: `-9px -${token.inputPaddingHorizontal}px`,
          backgroundColor: 'transparent',
          '.ant-cascader-input': {
            textAlign: 'start',
            border: 0,
            boxShadow: 'none',
          },
        },
      },

      '&-addon:first-child': {
        borderInlineEnd: 0,
      },

      '&-addon:last-child': {
        borderInlineStart: 0,
      },
    },

    [`.${prefixCls}`]: {
      float: 'inline-start',
      width: '100%',
      marginBottom: 0,
      textAlign: 'inherit',

      '&:focus': {
        zIndex: 1, // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
        borderInlineEndWidth: 1,
      },

      '&:hover': {
        zIndex: 1,
        borderInlineEndWidth: 1,

        [`.${prefixCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },
    },

    // Reset rounded corners
    [`> .${prefixCls}:first-child, .${prefixCls}-group-addon:first-child`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,

      // Reset Select's style in addon
      '.ant-select .ant-select-selector': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> .${prefixCls}-affix-wrapper`]: {
      [`&:not(:first-child) .${prefixCls}`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },

      [`&:not(:last-child) .${prefixCls}`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`> .${prefixCls}:last-child, .${prefixCls}-group-addon:last-child`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,

      // Reset Select's style in addon
      '.ant-select .ant-select-selector': {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    [`.${prefixCls}-affix-wrapper`]: {
      '&:not(:last-child)': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        [`.${prefixCls}-search &`]: {
          borderStartStartRadius: token.controlRadius,
          borderEndStartRadius: token.controlRadius,
        },
      },

      [`&:not(:first-child), .${prefixCls}-search &:not(:first-child)`]: {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    '&&-compact': {
      display: 'block',
      ...clearFix(),

      [`.${prefixCls}-group-addon, .${prefixCls}-group-wrap, > .${prefixCls}`]: {
        '&:not(:first-child):not(:last-child)': {
          borderInlineEndWidth: token.controlLineWidth,

          '&:hover': {
            zIndex: 1,
          },

          '&:focus': {
            zIndex: 1,
          },
        },
      },

      '& > *': {
        display: 'inline-block',
        float: 'none',
        verticalAlign: 'top', // https://github.com/ant-design/ant-design-pro/issues/139
        borderRadius: 0,
      },

      [`& > .${prefixCls}-affix-wrapper`]: {
        display: 'inline-flex',
      },

      '& > .ant-picker-range': {
        display: 'inline-flex',
      },

      '& > *:not(:last-child)': {
        marginInlineEnd: -token.controlLineWidth,
        borderInlineEndWidth: token.controlLineWidth,
      },

      // Undo float for .ant-input-group .ant-input
      [`.${prefixCls}`]: {
        float: 'none',
      },

      // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
      [`& > .ant-select > .ant-select-selector,
      & > .ant-select-auto-complete .${prefixCls},
      & > .ant-cascader-picker .${prefixCls},
      & > .${prefixCls}-group-wrapper .${prefixCls}`]: {
        borderInlineEndWidth: token.controlLineWidth,
        borderRadius: 0,

        '&:hover': {
          zIndex: 1,
        },

        '&:focus': {
          zIndex: 1,
        },
      },

      '& > .ant-select-focused': {
        zIndex: 1,
      },

      // update z-index for arrow icon
      '& > .ant-select > .ant-select-arrow': {
        zIndex: 1, // https://github.com/ant-design/ant-design/issues/20371
      },

      [`& > *:first-child,
      & > .ant-select:first-child > .ant-select-selector,
      & > .ant-select-auto-complete:first-child .${prefixCls},
      & > .ant-cascader-picker:first-child .${prefixCls}`]: {
        borderStartStartRadius: token.controlRadius,
        borderEndStartRadius: token.controlRadius,
      },

      [`& > *:last-child,
      & > .ant-select:last-child > .ant-select-selector,
      & > .ant-cascader-picker:last-child .${prefixCls},
      & > .ant-cascader-picker-focused:last-child .${prefixCls}`]: {
        borderInlineEndWidth: token.controlLineWidth,
        borderStartEndRadius: token.controlRadius,
        borderEndEndRadius: token.controlRadius,
      },

      // https://github.com/ant-design/ant-design/issues/12493
      [`& > .ant-select-auto-complete .${prefixCls}`]: {
        verticalAlign: 'top',
      },

      [`.${prefixCls}-group-wrapper + .${prefixCls}-group-wrapper`]: {
        marginInlineStart: -token.controlLineWidth,
        [`.${prefixCls}-affix-wrapper`]: {
          borderRadius: 0,
        },
      },

      [`.${prefixCls}-group-wrapper:not(:last-child)`]: {
        [`&.${prefixCls}-search > .${prefixCls}-group`]: {
          [`& > .${prefixCls}-group-addon > .${prefixCls}-search-button`]: {
            borderRadius: 0,
          },

          [`& > .${prefixCls}`]: {
            borderStartStartRadius: token.controlRadius,
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            borderEndStartRadius: token.controlRadius,
          },
        },
      },
    },
  };
};

const genInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { prefixCls, controlHeightSM, controlLineWidth } = token;

  const FIXED_CHROME_COLOR_HEIGHT = 16;
  const colorSmallPadding =
    (controlHeightSM - controlLineWidth * 2 - FIXED_CHROME_COLOR_HEIGHT) / 2;

  return {
    [`.${prefixCls}`]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),
      ...genStatusStyle(token),

      '&[type="color"]': {
        height: token.controlHeight,

        [`&.${prefixCls}-lg`]: {
          height: token.controlHeightLG,
        },
        [`&.${prefixCls}-sm`]: {
          height: controlHeightSM,
          paddingTop: colorSmallPadding,
          paddingBottom: colorSmallPadding,
        },
      },
    },
  };
};

const genAllowClearStyle = (token: InputToken): CSSObject => {
  const { prefixCls } = token;
  return {
    // ========================= Input =========================
    [`.${prefixCls}-clear-icon`]: {
      margin: 0,
      color: token.colorIcon,
      fontSize: token.fontSizeIcon,
      verticalAlign: -1,
      // https://github.com/ant-design/ant-design/pull/18151
      // https://codesandbox.io/s/wizardly-sun-u10br
      cursor: 'pointer',
      transition: `color ${token.motionDurationSlow}`,

      '&:hover': {
        color: token.colorTextSecondary,
      },

      '&:active': {
        color: token.colorText,
      },

      '&-hidden': {
        visibility: 'hidden',
      },

      '&-has-suffix': {
        margin: `0 ${token.inputAffixPadding}px`,
      },
    },

    // ======================= TextArea ========================
    '&-textarea-with-clear-btn': {
      padding: '0 !important',
      border: '0 !important',

      [`.${prefixCls}-clear-icon`]: {
        position: 'absolute',
        insetBlockStart: token.paddingXS,
        insetInlineEnd: token.paddingXS,
        zIndex: 1,
      },
    },
  };
};

const genAffixStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const {
    prefixCls,
    inputAffixPadding,
    colorTextSecondary,
    motionDurationSlow,
    colorIcon,
    colorIconHover,
    iconCls,
  } = token;

  return {
    [`.${prefixCls}-affix-wrapper`]: {
      ...genBasicInputStyle(token),
      display: 'inline-flex',

      '&:not(&-disabled):hover': {
        ...genHoverStyle(token),
        zIndex: 1,
        [`.${prefixCls}-search-with-button &`]: {
          zIndex: 0,
        },
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      '&-disabled': {
        [`.${prefixCls}[disabled]`]: {
          background: 'transparent',
        },
      },

      [`> input.${prefixCls}`]: {
        padding: 0,
        border: 'none',
        outline: 'none',

        '&:focus': {
          boxShadow: 'none !important',
        },
      },

      '&::before': {
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [`.${prefixCls}`]: {
        '&-prefix, &-suffix': {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',

          '> *:not(:last-child)': {
            marginInlineEnd: token.paddingXS,
          },
        },

        '&-show-count-suffix': {
          color: colorTextSecondary,
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
      [`${iconCls}.${prefixCls}-password-icon`]: {
        color: colorIcon,
        cursor: 'pointer',
        transition: `all ${motionDurationSlow}`,

        '&:hover': {
          color: colorIconHover,
        },
      },

      // status
      ...genStatusStyle(token),
    },
  };
};

const genGroupStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { prefixCls, colorError, colorSuccess } = token;

  return {
    [`.${prefixCls}-group`]: {
      // Style for input-group: input with label, with button or dropdown...
      ...resetComponent(token),
      ...genInputGroupStyle(token),

      '&-rtl': {
        direction: 'rtl',
      },

      '&-wrapper': {
        display: 'inline-block',
        width: '100%',
        textAlign: 'start',
        verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403

        '&-rtl': {
          direction: 'rtl',
        },

        // Status
        '&-status-error': {
          [`.${prefixCls}-group-addon`]: {
            color: colorError,
            borderColor: colorError,
          },
        },
        '&-status-warning': {
          [`.${prefixCls}-group-addon`]: {
            color: colorSuccess,
            borderColor: colorSuccess,
          },
        },
      },
    },
  };
};

const genSearchInputStyle: GenerateStyle<InputToken> = (token: InputToken) => {
  const { prefixCls } = token;
  const searchPrefixCls = `.${prefixCls}-search`;
  return {
    [searchPrefixCls]: {
      [`.${prefixCls}`]: {
        '&:hover, &:focus': {
          borderColor: token.colorPrimaryHover,

          [`+ .${prefixCls}-group-addon ${searchPrefixCls}-button:not(.@{ant-prefix}-btn-primary)`]:
            {
              borderInlineStartColor: token.colorPrimaryHover,
            },
        },
      },

      [`.${prefixCls}-affix-wrapper`]: {
        borderRadius: 0,
      },

      // fix slight height diff in Firefox:
      // https://ant.design/components/auto-complete-cn/#components-auto-complete-demo-certain-category
      [`.${prefixCls}-lg`]: {
        lineHeight: token.lineHeight - 0.0002,
      },

      [`> .${prefixCls}-group`]: {
        [`> .${prefixCls}-group-addon:last-child`]: {
          insetInlineStart: -1,
          padding: 0,
          border: 0,

          [`${searchPrefixCls}-button`]: {
            paddingTop: 0,
            paddingBottom: 0,
            borderStartStartRadius: 0,
            borderStartEndRadius: token.controlRadius,
            borderEndEndRadius: token.controlRadius,
            borderEndStartRadius: 0,
          },

          [`${searchPrefixCls}-button:not(.ant-btn-primary)`]: {
            color: token.colorTextSecondary,

            '&.ant-btn-loading::before': {
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

      [`&-large ${searchPrefixCls}-button`]: {
        height: token.controlHeightLG,
      },

      [`&-small ${searchPrefixCls}-button`]: {
        height: token.controlHeightSM,
      },

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

export function initInputToken<T extends GlobalToken = GlobalToken>(token: T): InputToken<T> {
  // @ts-ignore
  return mergeToken<InputToken<T>>(token, {
    inputAffixPadding: token.paddingXXS,
    inputPaddingVertical: Math.max(
      Math.round(((token.controlHeight - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.controlLineWidth,
      3,
    ),
    inputPaddingVerticalLG:
      Math.ceil(((token.controlHeightLG - token.fontSizeLG * token.lineHeight) / 2) * 10) / 10 -
      token.controlLineWidth,
    inputPaddingVerticalSM: Math.max(
      Math.round(((token.controlHeightSM - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.controlLineWidth,
      0,
    ),
    inputPaddingHorizontal: token.controlPaddingHorizontal - token.controlLineWidth,
    inputPaddingHorizontalSM: token.controlPaddingHorizontalSM - token.controlLineWidth,
    inputBorderHoverColor: token.colorPrimaryHover,
    inputBorderActiveColor: token.colorPrimaryHover,
  });
}

const genTextAreaStyle: GenerateStyle<InputToken> = token => {
  const { prefixCls, inputPaddingHorizontal, paddingLG } = token;
  const textareaPrefixCls = `.${prefixCls}-textarea`;

  return {
    [textareaPrefixCls]: {
      position: 'relative',

      [`${textareaPrefixCls}-suffix`]: {
        position: 'absolute',
        top: 0,
        insetInlineEnd: inputPaddingHorizontal,
        bottom: 0,
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        margin: 'auto',
      },

      [`&-status-error,
        &-status-warning,
        &-status-success,
        &-status-validating`]: {
        [`&${textareaPrefixCls}-has-feedback`]: {
          [`.${prefixCls}`]: {
            paddingInlineEnd: paddingLG,
          },
        },
      },

      '&-show-count': {
        // https://github.com/ant-design/ant-design/issues/33049
        [`> .${prefixCls}`]: {
          height: '100%',
        },

        '&::after': {
          position: 'absolute',
          bottom: 0,
          insetInlineEnd: 0,
          color: token.colorTextSecondary,
          whiteSpace: 'nowrap',
          content: 'attr(data-count)',
          pointerEvents: 'none',
          display: 'block',
          transform: 'translateY(100%)',
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Input', token => {
  const inputToken = initInputToken<FullToken<'Input'>>(token);

  return [
    genInputStyle(inputToken),
    genTextAreaStyle(inputToken),
    genAffixStyle(inputToken),
    genGroupStyle(inputToken),
    genSearchInputStyle(inputToken),
  ];
});
