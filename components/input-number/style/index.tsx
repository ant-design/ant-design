// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
} from '../../_util/theme';
import {
  genActiveStyle,
  genBasicInputStyle,
  genDisabledStyle,
  genHoverStyle,
  genInputGroupStyle,
  genPlaceholderStyle,
  genStatusStyle,
  initInputToken,
  InputToken,
} from '../../input/style';

interface InputNumberToken extends InputToken {
  inputNumberCls: string;
  inputNumberHandlerActiveBgColor: string;
}

const genInputNumberStyles = (token: InputNumberToken): CSSObject => ({
  [`.${token.inputNumberCls}`]: {
    ...resetComponent(token),
    ...genBasicInputStyle(token.inputNumberCls, token),
    ...genStatusStyle(token.inputNumberCls, token),

    display: 'inline-block',
    width: '90px',
    margin: 0,
    padding: 0,
    border: `${token.borderWidth}px ${token.borderStyle} ${token.borderColor}`,
    borderRadius: token.borderRadius,

    '&-rtl': {
      direction: 'rtl',

      [`.${token.inputNumberCls}-input`]: {
        direction: 'rtl',
      },
    },

    [`&:hover .${token.inputNumberCls}-handler-wrap, &-focused .${token.inputNumberCls}-handler-wrap`]:
      {
        opacity: 1,
      },

    '&-lg': {
      padding: 0,
      fontSize: token.fontSizeLG,

      [`input.${token.inputNumberCls}-input`]: {
        height: token.controlHeightLG - 2,
      },
    },

    '&-sm': {
      padding: 0,

      [`input.${token.inputNumberCls}-input`]: {
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
      [`.${token.inputNumberCls}-input`]: {
        cursor: 'not-allowed',
      },
      [`.${token.inputNumberCls}-handler-wrap`]: {
        display: 'none',
      },
    },

    '&-readonly': {
      [`.${token.inputNumberCls}-handler-wrap`]: {
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
      ...genInputGroupStyle(token.inputNumberCls, token),

      '&-wrapper': {
        display: 'inline-block',
        textAlign: 'start',
        verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403

        [`.${token.inputNumberCls}-affix-wrapper`]: {
          width: '100%',
        },
      },
    },

    [`.${token.inputNumberCls}`]: {
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

        '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':
          {
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
        [`.${token.inputNumberCls}-handler`]: {
          [`.${token.inputNumberCls}-handler-up-inner,
          .${token.inputNumberCls}-handler-down-inner`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            marginRight: 0,
            fontSize: '7px', // FIXME: magic
          },
        },

        [`.${token.inputNumberCls}-borderless &`]: {
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
        [`.${token.inputNumberCls}-borderless &`]: {
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
  },
});

const genAffixWrapperStyles = (token: InputNumberToken): CSSObject => ({
  [`.${token.inputNumberCls}-affix-wrapper`]: {
    ...genBasicInputStyle(token.inputNumberCls, token),
    ...genStatusStyle(token.inputNumberCls, token),
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
      [`.${token.inputNumberCls}[disabled]`]: {
        background: 'transparent',
      },
    },

    [`> div.${token.inputNumberCls}`]: {
      width: '100%',
      border: 'none',
      outline: 'none',

      [`&.${token.inputNumberCls}-focused`]: {
        boxShadow: 'none !important',
      },
    },

    [`input.${token.inputNumberCls}-input`]: {
      padding: 0,
    },

    '&::before': {
      width: 0,
      visibility: 'hidden',
      content: '"\\a0"',
    },

    [`.${token.inputNumberCls}-handler-wrap`]: {
      zIndex: 2,
    },

    [`.${token.inputNumberCls}`]: {
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
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const inputNumberToken: InputNumberToken = {
    ...initInputToken(token),
    inputNumberCls: prefixCls,
    inputNumberHandlerActiveBgColor: '#f4f4f4', // FIXME: magic number
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genInputNumberStyles(inputNumberToken),
      genAffixWrapperStyles(inputNumberToken),
    ]),
    hashId,
  ];
}
