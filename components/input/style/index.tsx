// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  withPrefix,
  resetComponent,
  placeholder,
} from '../../_util/theme';

const getInputPaddingVerticalBase = (token: DerivativeToken) =>
  Math.max(
    Math.round((((token.height - token.fontSize * token.lineHeight) / 2) * 10) / 10) -
      token.borderWidth,
    3,
  );
const getInputPaddingVerticalLarge = (token: DerivativeToken) =>
  Math.max(
    Math.round((((token.heightLG - token.fontSizeLG * token.lineHeight) / 2) * 10) / 10) -
      token.borderWidth,
    3,
  );
const getInputPaddingVerticalSmall = (token: DerivativeToken) =>
  Math.max(
    Math.round((((token.heightSM - token.fontSize * token.lineHeight) / 2) * 10) / 10) -
      token.borderWidth,
    3,
  );

const genHoverStyle = (
  token: DerivativeToken,
  color: string = token.primaryHoverColor /* primary-5 */,
): CSSObject => ({
  borderColor: color,
  borderRightWidth: token.borderWidth,
});

const genActiveStyle = (
  theme: any,
  token: DerivativeToken,
  borderColor: string = token.primaryColor,
  hoverBorderColor: string = token.primaryHoverColor,
  outlineColor: string = token.primaryHoverColor, // FIXME: primaryOutlineColor
) => ({
  borderColor: theme === 'dark' ? borderColor : hoverBorderColor,
  boxShadow: `0 0 0 2px ${
    theme === 'variable' ? outlineColor : new TinyColor(borderColor).setAlpha(0.2)
  }`, // FIXME: outlineFade outlineWidth
  borderRightWidth: token.borderWidth,
  outline: 0,
});

const genDisabledStyle = (token: DerivativeToken): CSSObject => ({
  color: token.textColorDisabled,
  backgroundColor: token.componentBackgroundDisabled,
  borderColor: token.borderColor,
  boxShadow: 'none',
  cursor: 'not-allowed',
  opacity: 1,

  '&:hover': {
    ...genHoverStyle(token, token.borderColor),
  },
});

const genInputLargeStyle = (token: DerivativeToken): CSSObject => ({
  padding: `${getInputPaddingVerticalLarge(token)}px ${token.padding - 1}px`, // FIXME: padding-sm
  fontSize: token.fontSizeLG,
});

const genInputSmallStyle = (token: DerivativeToken): CSSObject => ({
  padding: `${getInputPaddingVerticalSmall(token)}px ${token.paddingXS - 1}px`,
});

const genBasicInputStyle = (theme: any, token: DerivativeToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  minWidth: 0,
  padding: `${getInputPaddingVerticalBase(token)}px ${token.padding - 1}px`, // FIXME: padding-sm
  color: token.textColor,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  backgroundColor: token.componentBackground,
  backgroundImage: 'none',
  borderWidth: token.borderWidth,
  borderStyle: token.borderStyle,
  borderColor: token.borderColor,
  borderRadius: token.borderRadius,
  transition: `all 0.3s`,
  ...placeholder(),

  '&:hover': {
    ...genHoverStyle(token),
  },

  '&:focus, &-focused': {
    ...genActiveStyle(theme, token),
  },

  '&:disabled, &[disabled]': {
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
    minHeight: token.height,
    lineHeight: token.lineHeight,
    verticalAlign: 'bottom',
    transition: 'all 0.3s, height 0s',
  },

  // Size
  '&-lg': {
    ...genInputLargeStyle(token),
  },
  '&-sm': {
    ...genInputSmallStyle(token),
  },
});

const genInputGroupStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  position: 'relative',
  display: 'table',
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,

  // Undo padding and float of grid classes
  [`&[class*='col-']`]: {
    paddingRight: '8px',

    '&:last-child': {
      paddingRight: 0,
    },
  },

  [`&-addon, &-wrap, > .${prefixCls}`]: {
    display: 'table-cell',

    '&:not(:first-child):not(:last-child)': {
      borderRadius: 0,
    },
  },

  '&-addon, &-wrap': {
    width: '1px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },

  '&-wrap > *': {
    display: 'block !important',
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

  '&-addon': {
    position: 'relative',
    padding: `0 ${token.padding - 1}px`, // FIXME: paddingSM
    color: token.textColor,
    fontWeight: 'normal',
    fontSize: token.fontSize,
    textAlign: 'center',
    backgroundColor: token.componentBackground, // FIXME: backgorundColorLight,
    border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
    borderRadius: token.borderRadius,
    transition: 'all 0.3s',

    // Reset Select's style in addon
    '.ant-select': {
      // FIXME: ant
      margin: `-${getInputPaddingVerticalBase(token) + 1}px -${token.padding - 1}px`, // FIXME: paddingSM

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
      margin: `-9px -${token.padding - 1}px`, // FIXME: paddingSM
      backgroundColor: 'transparent',
      '.ant-cascader-input': {
        textAlign: 'left',
        border: 0,
        boxShadow: 'none',
      },
    },
  },

  // Reset rounded corners
  [`> .${prefixCls}:first-child, &-addon:first-child`]: {
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

  '&-addon:first-child': {
    borderRight: 0,
  },

  '&-addon:last-child': {
    borderLeft: 0,
  },

  [`> .${prefixCls}:last-child, &-addon:last-child`]: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,

    // Reset Select's style in addon
    '.ant-select .ant-select-selector': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },

  // Sizing options
  [`&-lg .${prefixCls}, &-lg > &-addon`]: {
    ...genInputLargeStyle(token),
  },

  [`&-sm .${prefixCls}, &-sm > &-addon`]: {
    ...genInputSmallStyle(token),
  },

  // Fix https://github.com/ant-design/ant-design/issues/5754
  '&-lg .ant-select-single .ant-select-selector': {
    height: token.heightLG,
  },

  '&-sm .ant-select-single .ant-select-selector': {
    height: token.heightSM,
  },

  [`.${prefixCls}-affix-wrapper`]: {
    '&:not(:last-child)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      '.ant-input-search &': {
        borderTopLeftRadius: token.borderRadius,
        borderBottomLeftRadius: token.borderRadius,
      },
    },

    '&:not(:first-child), .ant-input-search &:not(:first-child)': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },

  '&&-compact': {
    display: 'block',
    // .clearfix(),

    [`&-addon, &-wrap, > .${prefixCls}`]: {
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
      marginRight: -token.borderWidth,
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
      marginLeft: -1,
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
          borderRadius: `${token.borderRadius} 0 0 ${token.borderRadius}`,
        },
      },
    },
  },
});

const genInputStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  theme: any,
  token: DerivativeToken,
): CSSObject => ({
  ...resetComponent(token),
  ...genBasicInputStyle(theme, token),

  // Style for input-group: input with label, with button or dropdown...
  '&-group': {
    ...resetComponent(token),
    ...genInputGroupStyle(prefixCls, token),

    '&-wrapper': {
      display: 'inline-block',
      width: '100%',
      textAlign: 'start',
      verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403
    },
  },

  '&-affix-wrapper': {
    ...genBasicInputStyle(theme, token),
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
      content: '\\a0',
    },
  },

  '&-prefix, &-suffix': {
    display: 'flex',
    flex: 'none',
    alignItems: 'center',
  },

  '&-show-count-suffix': {
    color: 'token.secondaryColor', // FIXME: secondaryColor
  },

  '&-show-count-has-suffix': {
    marginRight: '2px',
  },

  '&-prefix': {
    marginRight: '4px',
  },

  '&-suffix': {
    marginLeft: '4px',
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string, iconPrefixCls: string) {
  const [theme, token, hashId] = useToken();

  return useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    withPrefix(genInputStyle(prefixCls, iconPrefixCls, theme, token), prefixCls),
  ]);
}
