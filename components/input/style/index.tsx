// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  placeholder,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  withPrefix,
} from '../../_util/theme';

interface InputToken extends DerivativeToken {
  inputAffixMargin: number;
  inputPaddingVertical: number;
  inputPaddingVerticalLG: number;
  inputPaddingVerticalSM: number;
  inputPaddingHorizontal: number;
  inputBorderHoverColor: string;
  inputBorderActiveColor: string;
}

export const genHoverStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  borderColor: token.inputBorderHoverColor,
  borderRightWidth: token.borderWidth,

  [`.${prefixCls}-rtl &`]: {
    borderRightWidth: 0,
    borderLeftWidth: `${token.borderWidth}px !important`,
  },
});

export const genActiveStyle = (prefixCls: string, theme: any, token: InputToken) => ({
  borderColor: theme === 'dark' ? token.inputBorderActiveColor : token.inputBorderHoverColor,
  boxShadow: `0 0 0 2px ${new TinyColor(token.inputBorderActiveColor).setAlpha(0.2)}`, // FIXME: outlineFade outlineWidth
  borderRightWidth: token.borderWidth,
  outline: 0,

  [`.${prefixCls}-rtl &`]: {
    borderRightWidth: 0,
    borderLeftWidth: `${token.borderWidth}px !important`,
  },
});

export const genDisabledStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  color: token.textColorDisabled,
  backgroundColor: token.componentBackgroundDisabled,
  borderColor: token.borderColor,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle(prefixCls, { ...token, inputBorderHoverColor: token.borderColor }),
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

const genStatusStyle = (prefixCls: string, theme: any, token: InputToken): CSSObject => ({
  '&-status-error:not(&-disabled):not(&-borderless)&': {
    '&, &:hover': {
      borderColor: token.errorColor,
    },

    '&:focus, &-focused': {
      ...genActiveStyle(prefixCls, theme, {
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
      ...genActiveStyle(prefixCls, theme, {
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

export const genBasicInputStyle = (
  prefixCls: string,
  theme: any,
  token: InputToken,
): CSSObject => ({
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
  ...placeholder(),

  '&:hover': {
    ...genHoverStyle(prefixCls, token),
  },

  '&:focus, &-focused': {
    ...genActiveStyle(prefixCls, theme, token),
  },

  '&:disabled, &[disabled]': {
    ...genDisabledStyle(prefixCls, token),
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

const genInputGroupStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  position: 'relative',
  display: 'table',
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,

  // Undo padding and float of grid classes
  [`&[class*='col-']`]: {
    paddingInlineEnd: '8px', // FIXME: magic number

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
      width: '1px',
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
        // FIXME: ant
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
          textAlign: 'left',
          border: 0,
          boxShadow: 'none',
        },
      },
    },

    '&-addon:first-child': {
      borderRight: 0,
    },

    '&-addon:last-child': {
      borderLeft: 0,
    },
  },

  [`.${prefixCls}`]: {
    float: 'left',
    width: '100%',
    marginBottom: 0,
    textAlign: 'inherit',

    '&:focus': {
      zIndex: 1, // Fix https://gw.alipayobjects.com/zos/rmsportal/DHNpoqfMXSfrSnlZvhsJ.png
      borderRightWidth: '1px',
    },

    '&:hover': {
      zIndex: 1,
      borderRightWidth: '1px',

      [`.ant-input-search-with-button &`]: {
        // FIXME: ant
        zIndex: 0,
      },
    },
  },

  // Reset rounded corners
  [`> .${prefixCls}:first-child, .${prefixCls}-group-addon:first-child`]: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    // Reset Select's style in addon
    'ant-select .ant-select-selector': {
      // FIXME: ant
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },

  [`> .${prefixCls}-affix-wrapper`]: {
    [`&:not(:first-child) .${prefixCls}`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },

    [`&:not(:last-child) .${prefixCls}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },

  [`> .${prefixCls}:last-child, .${prefixCls}-group-addon:last-child`]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,

    // Reset Select's style in addon
    '.ant-select .ant-select-selector': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },

  [`.${prefixCls}-affix-wrapper`]: {
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      [`.${prefixCls}-search &`]: {
        borderTopLeftRadius: token.borderRadius,
        borderBottomLeftRadius: token.borderRadius,
      },
    },

    [`&:not(:first-child), .${prefixCls}-search &:not(:first-child)`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },

  '&&-compact': {
    display: 'block',
    // .clearfix(),

    [`.${prefixCls}-group-addon, .${prefixCls}-group-wrap, > .${prefixCls}`]: {
      '&:not(:first-child):not(:last-child)': {
        borderRightWidth: token.borderWidth,

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
      borderRightWidth: token.borderWidth,
    },

    // Undo float for .ant-input-group .ant-input
    [`.${prefixCls}`]: {
      float: 'none',
    },

    // reset border for Select, DatePicker, AutoComplete, Cascader, Mention, TimePicker, Input
    [`& > .ant-select > .ant-select-selector,
      & > .ant-select-auto-complete .ant-input,
      & > .ant-cascader-picker .ant-input,
      & > .ant-input-group-wrapper .ant-input`]: {
      borderRightWidth: token.borderWidth,
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
      & > .ant-select-auto-complete:first-child .ant-input,
      & > .ant-cascader-picker:first-child .ant-input`]: {
      borderTopLeftRadius: token.borderRadius,
      borderBottomLeftRadius: token.borderRadius,
    },

    [`& > *:last-child,
      & > .ant-select:last-child > .ant-select-selector,
      & > .ant-cascader-picker:last-child .ant-input,
      & > .ant-cascader-picker-focused:last-child .ant-input`]: {
      borderRightWidth: token.borderWidth,
      borderTopRightRadius: token.borderRadius,
      borderBottomRightRadius: token.borderRadius,
    },

    // https://github.com/ant-design/ant-design/issues/12493
    '& > .ant-select-auto-complete .ant-input': {
      verticalAlign: 'top',
    },

    '.ant-input-group-wrapper + .ant-input-group-wrapper': {
      marginInlineStart: -1,
      '.ant-input-affix-wrapper': {
        borderRadius: 0,
      },
    },

    '.ant-input-group-wrapper:not(:last-child)': {
      '&.ant-input-search > .ant-input-group': {
        '& > .ant-input-group-addon > .ant-input-search-button': {
          borderRadius: 0,
        },

        '& > .ant-input': {
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
        },
      },
    },
  },
});

const genInputStyle = (prefixCls: string, theme: any, token: InputToken): CSSObject => ({
  ...resetComponent(token),
  ...genBasicInputStyle(prefixCls, theme, token),
  ...genStatusStyle(prefixCls, theme, token),

  '&[type="color"]': {
    height: token.controlHeight,

    [`&.${prefixCls}-lg`]: {
      height: token.controlHeightLG,
    },
    [`&.${prefixCls}-sm`]: {
      height: token.controlHeightSM,
      paddingTop: 3,
      paddingBottom: 3,
    },
  },
});

const genAllowClearStyle = (prefixCls: string, token: InputToken): CSSObject => ({
  // ========================= Input =========================
  [`.${prefixCls}-clear-icon`]: {
    margin: 0,
    color: token.textColorDisabled,
    fontSize: token.fontSizeSM,
    verticalAlign: '-1px',
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
      top: '8px',
      right: '8px',
      zIndex: 1,
    },
  },
});

const genAffixStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  theme: any,
  token: InputToken,
): CSSObject => ({
  ...genBasicInputStyle(prefixCls, theme, token),
  display: 'inline-flex',

  '&:not(&-disabled):hover': {
    ...genHoverStyle(prefixCls, token),
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
      marginInlineEnd: '2px',
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
  ...genStatusStyle(prefixCls, theme, token),
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
        borderLeftColor: token.primaryHoverColor,
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
      left: '-1px',
      padding: 0,
      border: 0,

      [`.${searchPrefixCls}-button`]: {
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: `0 ${token.borderRadius}px ${token.borderRadius}px 0`,
      },

      [`.${searchPrefixCls}-button:not(.ant-btn-primary)`]: {
        color: token.textColorSecondary,

        '&.ant-btn-loading::before': {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
});

const genRTLStyle = (prefixCls: string, searchPrefixCls: string, token: InputToken): CSSObject => ({
  // Style for input-group: input with label, with button or dropdown...
  [`.${prefixCls}-group`]: {
    [`> .${prefixCls}-rtl:first-child, &-rtl .${prefixCls}-group-addon:first-child`]: {
      borderRadius: `0 ${token.borderRadius}px ${token.borderRadius}px 0`,
    },

    [`&-rtl`]: {
      [`.${prefixCls}-group-addon:last-child`]: {
        borderRight: 0,
        borderLeft: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,

        [`.${searchPrefixCls}-button`]: {
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px !important`,
        },
      },
      [`.${prefixCls}-group-addon:first-child`]: {
        borderRight: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
        borderLeft: 0,
      },
    },

    [`> .${prefixCls}:last-child, .${prefixCls}-group-addon:last-child`]: {
      [`.${prefixCls}-group-rtl&`]: {
        borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
      },
    },

    [`.${prefixCls}-affix-wrapper`]: {
      '&:not(:first-child)': {
        [`.${prefixCls}-group-rtl&`]: {
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
        },
      },

      '&:not(:last-child)': {
        [`.${prefixCls}-group-rtl&`]: {
          borderRadius: `0 ${token.borderRadius}px ${token.borderRadius}px 0`,
        },
      },

      '&:not(:last-child):not(:first-child)': {
        [`.${prefixCls}-group-rtl&`]: {
          borderRadius: 0,
        },
      },
    },

    '&&-compact': {
      '& > *:not(:last-child)': {
        [`.${prefixCls}-group-rtl&`]: {
          borderLeftWidth: token.borderWidth,
        },
      },

      [`& > *:first-child,
        & > .ant-select:first-child > .ant-select-selector,
        & > .ant-select-auto-complete:first-child .ant-input,
        & > .ant-cascader-picker:first-child .ant-input`]: {
        [`.${prefixCls}-group-rtl&`]: {
          borderRadius: `0 ${token.borderRadius}px ${token.borderRadius}px 0`,
        },
      },

      [`& > *:last-child,
        & > .ant-select:last-child > .ant-select-selector,
        & > .ant-select-auto-complete:last-child .ant-input,
        & > .ant-cascader-picker:last-child .ant-input,
        & > .ant-cascader-picker-focused:last-child .ant-input`]: {
        [`.${prefixCls}-group-rtl&`]: {
          borderLeftWidth: token.borderWidth,
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
        },
      },

      [`.${prefixCls}-group-wrapper-rtl:not(:last-child)`]: {
        [`&.${prefixCls}-search > .${prefixCls}-group`]: {
          [`& > .${prefixCls}`]: {
            borderRadius: `0 ${token.borderRadius}px ${token.borderRadius}px 0`,
          },
        },
      },
    },
  },

  [`.${prefixCls}`]: {
    '&-affix-wrapper&-affix-wrapper-rtl': {
      [`> input.${prefixCls}`]: {
        border: 'none',
        outline: 'none',
      },
    },

    '&-textarea': {
      '&-rtl': {
        direction: 'rtl',
      },

      '&-rtl&-show-count::after': {
        textAlign: 'left',
      },
    },
  },

  // allow-clear
  [`.${prefixCls}-clear-icon`]: {
    [`.${prefixCls}-affix-wrapper-rtl &`]: {
      right: 'auto',
      left: '8px',
    },
  },

  [`.${searchPrefixCls}-rtl`]: {
    direction: 'rtl',

    [`.${prefixCls}`]: {
      '&:hover, &:focus': {
        [`+ .${prefixCls}-group-addon .${searchPrefixCls}-button:not(.ant-btn-primary)`]: {
          borderRightColor: token.primaryHoverColor,
          borderLeftColor: token.borderColor,
        },
      },
    },

    [`> .${prefixCls}-group`]: {
      [`> .${prefixCls}-affix-wrapper`]: {
        '&:hover, &-focused': {
          borderRightColor: token.primaryHoverColor,
        },
      },

      [`> .${prefixCls}-group-addon`]: {
        right: '-1px',
        left: 'auto',
        [`.${searchPrefixCls}-button`]: {
          borderRadius: `${token.borderRadius}px 0 0 ${token.borderRadius}px`,
        },
      },
    },
  },
});

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const inputToken: InputToken = {
    ...token,
    inputAffixMargin: 4,
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
    inputPaddingHorizontal: token.paddingSM - 1,
    inputBorderHoverColor: token.primaryHoverColor,
    inputBorderActiveColor: token.primaryHoverColor,
  };

  const affixWrapperPrefixCls = `${prefixCls}-affix-wrapper`;
  const groupPrefixCls = `${prefixCls}-group`;
  const searchPrefixCls = `${prefixCls}-search`;

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genInputStyle(prefixCls, theme, inputToken), prefixCls),
      withPrefix(genAffixStyle(prefixCls, iconPrefixCls, theme, inputToken), affixWrapperPrefixCls),
      withPrefix(genGroupStyle(prefixCls, inputToken), groupPrefixCls),
      withPrefix(genSearchInputStyle(prefixCls, searchPrefixCls, inputToken), searchPrefixCls),
      genRTLStyle(prefixCls, searchPrefixCls, inputToken),
    ]),
    hashId,
  ];
}
