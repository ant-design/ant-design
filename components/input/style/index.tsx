// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  clearFix,
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  withPrefix,
} from '../../_util/theme';

export interface InputToken extends DerivativeToken {
  inputAffixMargin: number;
  inputPaddingVertical: number;
  inputPaddingVerticalLG: number;
  inputPaddingVerticalSM: number;
  inputPaddingHorizontal: number;
  inputBorderHoverColor: string;
  inputBorderActiveColor: string;
}

// FIXME: magic color string
export const genPlaceholderStyle = (
  color: string = new TinyColor({ h: 0, s: 0, v: '75%' }).toHexString(),
): CSSObject => ({
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
  borderInlineEndWidth: token.borderWidth,
});

export const genActiveStyle = (token: InputToken) => ({
  borderColor: token.inputBorderHoverColor,
  boxShadow: `0 0 0 ${token.outlineWidth}px ${token.primaryOutlineColor}`,
  borderInlineEndWidth: token.borderWidth,
  outline: 0,
});

export const genDisabledStyle = (token: InputToken): CSSObject => ({
  color: token.textColorDisabled,
  backgroundColor: token.componentBackgroundDisabled,
  borderColor: token.borderColor,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle({ ...token, inputBorderHoverColor: token.borderColor }),
  },
});

const genInputLargeStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  padding: `${token.inputPaddingVerticalLG}px ${token.inputPaddingHorizontal}px`,
  fontSize: token.fontSizeLG,

  [`.${prefixCls}`]: {
    fontSize: token.fontSizeLG,
  },
});

const genInputSmallStyle = (token: InputToken): CSSObject => ({
  padding: `${token.inputPaddingVerticalSM}px ${token.paddingXS - 1}px`,
});

export const genStatusStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  '&-status-error:not(&-disabled):not(&-borderless)&': {
    '&, &:hover': {
      borderColor: token.errorColor,
    },

    '&:focus, &-focused': {
      ...genActiveStyle({
        ...token,
        inputBorderActiveColor: token.errorColor,
        inputBorderHoverColor: token.errorColor,
      }),
    },

    [`.${prefixCls}-feedback-icon, .${prefixCls}-prefix`]: {
      color: token.errorColor,
    },
  },
  '&-status-warning:not(&-disabled):not(&-borderless)&': {
    '&, &:hover': {
      borderColor: token.warningColor,
    },

    '&:focus, &-focused': {
      ...genActiveStyle({
        ...token,
        inputBorderActiveColor: token.warningColor,
        inputBorderHoverColor: token.warningColor,
      }),
    },

    [`.${prefixCls}-feedback-icon, .${prefixCls}-prefix`]: {
      color: token.warningColor,
    },
  },
});

export const genBasicInputStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${token.inputPaddingVertical}px ${token.inputPaddingHorizontal}px`,
  color: token.textColor,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.componentBackground,
  backgroundImage: 'none',
  borderWidth: token.borderWidth,
  borderStyle: token.borderStyle,
  borderColor: token.borderColor,
  borderRadius: token.borderRadius,
  transition: `all ${token.duration}`,
  ...genPlaceholderStyle(),

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
    transition: `all ${token.duration}, height 0s`,
  },

  '&-textarea': {
    '&-rtl': {
      direction: 'rtl',
    },
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(prefixCls, token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },

  '&-rtl': {
    direction: 'rtl',
  },
});

export const genInputGroupStyle = (prefixCls: string, token: InputToken): CSSObject => ({
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
    ...genInputLargeStyle(prefixCls, token),
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
      width: 1, // FIXME: magic number
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
      color: token.textColor,
      fontWeight: 'normal',
      fontSize: token.fontSize,
      textAlign: 'center',
      backgroundColor: token.backgroundLight,
      border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
      borderRadius: token.borderRadius,
      transition: `all ${token.duration}`,

      // Reset Select's style in addon
      '.ant-select': {
        margin: `-${token.inputPaddingVertical + 1}px -${token.inputPaddingHorizontal}px`,

        '&.ant-select-single:not(.ant-select-customize-input)': {
          '.ant-select-selector': {
            backgroundColor: 'inherit',
            border: `${token.borderWidth}px ${token.borderStyle} transparent`,
            boxShadow: 'none',
          },
        },

        '&-open, &-focused': {
          '.ant-select-selector': {
            color: token.primaryColor,
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
        borderStartStartRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
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
        borderInlineEndWidth: token.borderWidth,

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
      marginInlineEnd: -token.borderWidth,
      borderInlineEndWidth: token.borderWidth,
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
      borderInlineEndWidth: token.borderWidth,
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
      borderStartStartRadius: token.borderRadius,
      borderEndStartRadius: token.borderRadius,
    },

    [`& > *:last-child,
      & > .ant-select:last-child > .ant-select-selector,
      & > .ant-cascader-picker:last-child .${prefixCls},
      & > .ant-cascader-picker-focused:last-child .${prefixCls}`]: {
      borderInlineEndWidth: token.borderWidth,
      borderStartEndRadius: token.borderRadius,
      borderEndEndRadius: token.borderRadius,
    },

    // https://github.com/ant-design/ant-design/issues/12493
    [`& > .ant-select-auto-complete .${prefixCls}`]: {
      verticalAlign: 'top',
    },

    [`.${prefixCls}-group-wrapper + .${prefixCls}-group-wrapper`]: {
      marginInlineStart: -1, // FIXME: magic number
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
          borderStartStartRadius: token.borderRadius,
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
          borderEndStartRadius: token.borderRadius,
        },
      },
    },
  },
});

const genInputStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  ...resetComponent(token),
  ...genBasicInputStyle(prefixCls, token),
  ...genStatusStyle(prefixCls, token),

  '&[type="color"]': {
    height: token.controlHeight,

    [`&.${prefixCls}-lg`]: {
      height: token.controlHeightLG,
    },
    [`&.${prefixCls}-sm`]: {
      height: token.controlHeightSM,
      paddingTop: 3, // FIXME: magic number
      paddingBottom: 3, // FIXME: magic number
    },
  },
});

const genAllowClearStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  // ========================= Input =========================
  [`.${prefixCls}-clear-icon`]: {
    margin: 0,
    color: token.textColorDisabled,
    fontSize: token.fontSizeSM,
    verticalAlign: -1, // FIXME: magic number
    // https://github.com/ant-design/ant-design/pull/18151
    // https://codesandbox.io/s/wizardly-sun-u10br
    cursor: 'pointer',
    transition: `color ${token.duration}`,

    '&:hover': {
      color: token.textColorSecondary,
    },

    '&:active': {
      color: token.textColor,
    },

    '&-hidden': {
      visibility: 'hidden',
    },

    '&-has-suffix': {
      margin: `0 ${token.inputAffixMargin}px`,
    },
  },

  // ======================= TextArea ========================
  [`.${prefixCls}-affix-wrapper-textarea-with-clear-btn`]: {
    padding: '0 !important',
    border: '0 !important',

    [`.${prefixCls}-clear-icon`]: {
      position: 'absolute',
      insetBlockStart: token.paddingXS,
      insetInlineEnd: token.paddingXS,
      zIndex: 1,
    },
  },
});

const genAffixStyle = (prefixCls: string, iconPrefixCls: string, token: InputToken): CSSObject => ({
  ...genBasicInputStyle(prefixCls, token),
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
    },

    '&-show-count-suffix': {
      color: token.textColorSecondary,
    },

    '&-show-count-has-suffix': {
      marginInlineEnd: 2, // FIXME: magic number
    },

    '&-prefix': {
      marginInlineEnd: token.inputAffixMargin,
    },

    '&-suffix': {
      marginInlineStart: token.inputAffixMargin,
    },
  },

  ...genAllowClearStyle(prefixCls, token),

  // password
  [`.${iconPrefixCls}.${prefixCls}-password-icon`]: {
    color: token.textColorSecondary,
    cursor: 'pointer',
    transition: `all ${token.duration}`,

    '&:hover': {
      color: token.iconColorHover,
    },
  },

  // status
  ...genStatusStyle(prefixCls, token),
  '&-status-validating': {
    [`.${prefixCls}-feedback-icon`]: {
      display: 'inline-block',
      color: token.primaryColor,
    },
  },
  '&-status-success': {
    [`.${prefixCls}-feedback-icon`]: {
      color: token.successColor,
      // FIXME: animationName
    },
  },
});

const genGroupStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  // Style for input-group: input with label, with button or dropdown...
  ...resetComponent(token),
  ...genInputGroupStyle(prefixCls, token),

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
        color: token.errorColor,
        borderColor: token.errorColor,
      },
    },
    '&-status-warning': {
      [`.${prefixCls}-group-addon`]: {
        color: token.successColor,
        borderColor: token.successColor,
      },
    },
  },
});

const genSearchInputStyle = (
  prefixCls: string,
  searchPrefixCls: string,
  token: DerivativeToken,
): CSSObject => ({
  [`.${prefixCls}`]: {
    '&:hover, &:focus': {
      borderColor: token.primaryHoverColor,

      [`+ .${prefixCls}-group-addon .${searchPrefixCls}-button:not(.@{ant-prefix}-btn-primary)`]: {
        borderInlineStartColor: token.primaryHoverColor,
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

      [`.${searchPrefixCls}-button`]: {
        paddingTop: 0,
        paddingBottom: 0,
        borderStartStartRadius: 0,
        borderStartEndRadius: token.borderRadius,
        borderEndEndRadius: token.borderRadius,
        borderEndStartRadius: 0,
      },

      [`.${searchPrefixCls}-button:not(.ant-btn-primary)`]: {
        color: token.textColorSecondary,

        '&.ant-btn-loading::before': {
          insetInlineStart: 0,
          insetInlineEnd: 0,
          insetBlockStart: 0,
          insetBlockEnd: 0,
        },
      },
    },
  },

  [`.${searchPrefixCls}-button`]: {
    height: token.controlHeight,

    '&:hover, &:focus': {
      zIndex: 1,
    },
  },

  [`&-large .${searchPrefixCls}-button`]: {
    height: token.controlHeightLG,
  },

  [`&-small .${searchPrefixCls}-button`]: {
    height: token.controlHeightSM,
  },

  '&-rtl': {
    direction: 'rtl',
  },
});

export const initInputToken = (token: DerivativeToken): InputToken => ({
  ...token,
  inputAffixMargin: token.marginXXS,
  inputPaddingVertical: Math.max(
    Math.round(((token.controlHeight - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
      token.borderWidth,
    3,
  ),
  inputPaddingVerticalLG:
    Math.ceil(((token.controlHeightLG - token.fontSizeLG * token.lineHeight) / 2) * 10) / 10 -
    token.borderWidth,
  inputPaddingVerticalSM: Math.max(
    Math.round(((token.controlHeightSM - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
      token.borderWidth,
    0,
  ),
  inputPaddingHorizontal: token.paddingSM - token.borderWidth,
  inputBorderHoverColor: token.primaryHoverColor,
  inputBorderActiveColor: token.primaryHoverColor,
});

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const inputToken: InputToken = initInputToken(token);

  const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
  const groupPrefixCls = `${prefixCls}-group`;
  const searchPrefixCls = `${prefixCls}-search`;

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genInputStyle(prefixCls, inputToken), prefixCls),
      withPrefix(genAffixStyle(prefixCls, iconPrefixCls, inputToken), affixWrapperPrefixCls),
      withPrefix(genGroupStyle(prefixCls, inputToken), groupPrefixCls),
      withPrefix(genSearchInputStyle(prefixCls, searchPrefixCls, inputToken), searchPrefixCls),
    ]),
    hashId,
  ];
}
