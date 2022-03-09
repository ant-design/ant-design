// ============================== Export ==============================
import { CSSObject } from '@ant-design/cssinjs';
import {
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  withPrefix,
} from '../../_util/theme';
import {
  genActiveStyle,
  genBasicInputStyle,
  genDisabledStyle,
  genHoverStyle,
  genInputGroupStyle,
  genPlaceholderStyle,
  genStatusStyle,
  InputToken,
} from '../../input/style';

interface InputNumberToken extends InputToken {
  inputNumberHandlerActiveBgColor: string;
}

const genInputNumberStyles = (prefixCls: string, token: InputNumberToken): CSSObject => ({
  ...resetComponent(token),
  ...genBasicInputStyle(prefixCls, token),
  ...genStatusStyle(prefixCls, token),

  display: 'inline-block',
  width: '90px',
  margin: 0,
  padding: 0,
  border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
  borderRadius: token.borderRadius,

  [`&:hover .${prefixCls}-handler-wrap, &-focused .${prefixCls}-handler-wrap`]: {
    opacity: 1,
  },

  '&-lg': {
    padding: 0,
    fontSize: token.fontSizeLG,

    [`input.${prefixCls}-input`]: {
      height: token.controlHeightLG - 2,
    },
  },

  '&-sm': {
    padding: 0,

    [`input.${prefixCls}-input`]: {
      height: token.controlHeightSM - 2,
      padding: `0 ${token.paddingXS - 1}px`,
    },
  },

  '&:hover': {
    ...genHoverStyle(token),
    '& + .ant-form-item-children-icon': {
      opacity: 0,
      transition: 'opacity 0.24s linear 0.24s', // FIXME: magic number
    },
  },

  '&-focused': {
    ...genActiveStyle(token),
  },

  '&-disabled': {
    ...genDisabledStyle(token),
    [`.${prefixCls}-input`]: {
      cursor: 'not-allowed',
    },
    [`.${prefixCls}-handler-wrap`]: {
      display: 'none',
    },
  },

  '&-readonly': {
    [`.${prefixCls}-handler-wrap`]: {
      display: 'none',
    },
  },

  '&-borderless': {
    boxShadow: 'none',
  },

  // ===================== Out Of Range =====================
  '&-out-of-range': {
    input: {
      color: token.errorColor,
    },
  },

  // Style for input-group: input with label, with button or dropdown...
  '&-group': {
    ...resetComponent(token),
    ...genInputGroupStyle(prefixCls, token),

    '&-wrapper': {
      display: 'inline-block',
      textAlign: 'start',
      verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403

      [`.${prefixCls}-affix-wrapper`]: {
        width: '100%',
      },
    },
  },

  [`.${prefixCls}`]: {
    '&-handler': {
      position: 'relative',
      display: 'block',
      width: '100%',
      height: '50%',
      overflow: 'hidden',
      color: token.textColorSecondary,
      fontWeight: 'bold',
      lineHeight: 0,
      textAlign: 'center',
      borderInlineStart: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
      transition: `all ${token.durationFast} linear`,

      '&:active': {
        background: token.inputNumberHandlerActiveBgColor,
      },

      '&:hover &-up-inner, &:hover &-down-inner': {
        color: token.primaryColor,
      },
    },

    '&-handler-up-inner, &-handler-down-inner': {
      // .iconfont-mixin();

      position: 'absolute',
      insetInlineEnd: token.marginXXS,
      width: 12, // FIXME: magic number
      height: 12, // FIXME: magic number
      color: token.textColorSecondary,
      lineHeight: 12, // FIXME: magic number
      transition: `all ${token.durationFast} linear`,
      userSelect: 'none',
    },

    '&-input': {
      width: '100%',
      height: token.controlHeight - 2,
      padding: `0 ${token.inputPaddingHorizontal - 1}px`,
      textAlign: 'start',
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: token.borderRadius,
      outline: 0,
      transition: `all ${token.duration} linear`,
      appearance: 'textfield', // FIXME: important
      ...genPlaceholderStyle(),

      '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button': {
        margin: 0,
        /* stylelint-disable-next-line property-no-vendor-prefix */
        webkitAppearance: 'none',
        appearance: 'none',
      },
    },

    '&-handler-wrap': {
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineEnd: 0,
      width: 22, // FIXME: magic number
      height: '100%',
      background: token.componentBackground,
      borderStartStartRadius: 0,
      borderStartEndRadius: token.borderRadius,
      borderEndEndRadius: token.borderRadius,
      borderEndStartRadius: 0,
      opacity: 0,
      transition: 'opacity 0.24s linear 0.1s', // FIXME: magic

      // Fix input number inside Menu makes icon too large
      // We arise the selector priority by nest selector here
      // https://github.com/ant-design/ant-design/issues/14367
      [`.${prefixCls}-handler`]: {
        [`.${prefixCls}-handler-up-inner,
          .${prefixCls}-handler-down-inner`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 'auto',
          marginRight: 0,
          fontSize: '7px', // FIXME: magic
        },
      },

      [`.${prefixCls}-borderless &`]: {
        borderInlineStartWidth: 0,
      },
    },

    '&-handler-wrap:hover &-handler': {
      height: '40%',
    },

    '&-handler-up': {
      borderStartEndRadius: token.borderRadius,
      cursor: 'pointer',

      '&-inner': {
        top: '50%',
        marginTop: -5, // FIXME: magic
        textAlign: 'center',
      },

      '&:hover': {
        height: '60% !important',
      },
    },

    '&-handler-down': {
      top: 0,
      borderBlockStart: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
      borderEndEndRadius: token.borderRadius,
      cursor: 'pointer',

      '&-inner': {
        top: '50%',
        textAlign: 'center',
        transform: 'translateY(-50%)',
      },

      '&:hover': {
        height: '60% !important',
      },
      [`.${prefixCls}-borderless &`]: {
        borderBlockStartWidth: 0,
      },
    },
    '&-handler-up-disabled, &-handler-down-disabled': {
      cursor: 'not-allowed',
    },

    [`&-handler-up-disabled:hover &-handler-up-inner,
      &-handler-down-disabled:hover &-handler-down-inner`]: {
      color: token.textColorDisabled,
    },
  },
});

const genAffixWrapperStyles = (prefixCls: string, token: InputNumberToken): CSSObject => ({
  ...genBasicInputStyle(prefixCls, token),
  ...genStatusStyle(prefixCls, token),
  // or number handler will cover form status
  position: 'relative',
  display: 'inline-flex',
  width: 90, // FIXME: magic
  padding: 0,
  paddingInlineStart: token.inputPaddingHorizontal,

  '&:not(&-disabled):hover': {
    ...genHoverStyle(token),
    zIndex: 1,
  },

  '&-focused, &:focus': {
    zIndex: 1,
  },

  '&-disabled': {
    [`.${prefixCls}[disabled]`]: {
      background: 'transparent',
    },
  },

  [`> div.${prefixCls}`]: {
    width: '100%',
    border: 'none',
    outline: 'none',

    [`&.${prefixCls}-focused`]: {
      boxShadow: 'none !important',
    },
  },

  [`input.${prefixCls}-input`]: {
    padding: 0,
  },

  '&::before': {
    width: 0,
    visibility: 'hidden',
    content: '"\\a0"',
  },

  [`.${prefixCls}-handler-wrap`]: {
    zIndex: 2,
  },

  [`.${prefixCls}`]: {
    '&-prefix, &-suffix': {
      display: 'flex',
      flex: 'none',
      alignItems: 'center',
      pointerEvents: 'none',
    },

    '&-prefix': {
      marginInlineEnd: token.inputAffixMargin,
    },

    '&-suffix': {
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineEnd: 0,
      zIndex: 1,
      height: '100%',
      marginInlineEnd: token.inputPaddingHorizontal,
      marginInlineStart: token.inputAffixMargin,
    },
  },
});

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const inputNumberToken: InputNumberToken = {
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
    inputPaddingHorizontal: token.paddingSM - 1,
    inputBorderHoverColor: token.primaryHoverColor,
    inputBorderActiveColor: token.primaryHoverColor,
    inputNumberHandlerActiveBgColor: '#f4f4f4', // FIXME: magic number
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genInputNumberStyles(prefixCls, inputNumberToken), prefixCls),
      withPrefix(genAffixWrapperStyles(prefixCls, inputNumberToken), `${prefixCls}-affix-wrapper`),
    ]),
    hashId,
  ];
}
