// deps-lint-skip-all
import {
  GenerateStyle,
  resetComponent,
  resetIcon,
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

export interface ComponentToken {
  controlWidth: number;
}

interface InputNumberToken extends InputToken, ComponentToken {
  inputNumberCls: string;
  inputNumberHandlerActiveBgColor: string;
}

const genInputNumberStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    inputNumberCls,
    controlLineWidth,
    controlLineType,
    colorBorder,
    controlRadius,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    colorError,
    paddingXS,
    colorTextSecondary,
    motionDurationFast,
    inputNumberHandlerActiveBgColor,
    colorPrimary,
    marginXXS,
    controlHeight,
    inputPaddingHorizontal,
    motionDurationSlow,
    colorBgComponent,
    motionDurationMid,
    colorTextDisabled,
    controlWidth,
  } = token;

  return {
    [inputNumberCls]: {
      ...resetComponent(token),
      ...genBasicInputStyle(token),
      ...genStatusStyle(token),

      display: 'inline-block',
      width: controlWidth,
      margin: 0,
      padding: 0,
      border: `${controlLineWidth}px ${controlLineType} ${colorBorder}`,
      borderRadius: controlRadius,

      '&-rtl': {
        direction: 'rtl',

        [`${inputNumberCls}-input`]: {
          direction: 'rtl',
        },
      },

      [`&:hover ${inputNumberCls}-handler-wrap, &-focused ${inputNumberCls}-handler-wrap`]: {
        opacity: 1,
      },

      '&-lg': {
        padding: 0,
        fontSize: fontSizeLG,

        [`input${inputNumberCls}-input`]: {
          height: controlHeightLG - 2 * controlLineWidth,
        },
      },

      '&-sm': {
        padding: 0,

        [`input${inputNumberCls}-input`]: {
          height: controlHeightSM - 2 * controlLineWidth,
          padding: `0 ${paddingXS - controlLineWidth}px`,
        },
      },

      '&:hover': {
        ...genHoverStyle(token),
      },

      '&-focused': {
        ...genActiveStyle(token),
      },

      '&-disabled': {
        ...genDisabledStyle(token),
        [`${inputNumberCls}-input`]: {
          cursor: 'not-allowed',
        },
        [`${inputNumberCls}-handler-wrap`]: {
          display: 'none',
        },
      },

      '&-readonly': {
        [`${inputNumberCls}-handler-wrap`]: {
          display: 'none',
        },
      },

      '&-borderless': {
        boxShadow: 'none',
      },

      // ===================== Out Of Range =====================
      '&-out-of-range': {
        input: {
          color: colorError,
        },
      },

      // Style for input-group: input with label, with button or dropdown...
      '&-group': {
        ...resetComponent(token),
        ...genInputGroupStyle(token),

        '&-wrapper': {
          display: 'inline-block',
          textAlign: 'start',
          verticalAlign: 'top', // https://github.com/ant-design/ant-design/issues/6403

          [`${inputNumberCls}-affix-wrapper`]: {
            width: '100%',
          },
        },
      },

      [inputNumberCls]: {
        '&-handler': {
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '50%',
          overflow: 'hidden',
          color: colorTextSecondary,
          fontWeight: 'bold',
          lineHeight: 0,
          textAlign: 'center',
          borderInlineStart: `${controlLineWidth}px ${controlLineType} ${colorBorder}`,
          transition: `all ${motionDurationFast} linear`,

          '&:active': {
            background: inputNumberHandlerActiveBgColor,
          },

          '&:hover &-up-inner, &:hover &-down-inner': {
            color: colorPrimary,
          },
        },

        '&-handler-up-inner, &-handler-down-inner': {
          ...resetIcon(),

          position: 'absolute',
          insetInlineEnd: marginXXS,
          width: controlHeightSM / 2,
          height: controlHeightSM / 2,
          color: colorTextSecondary,
          lineHeight: controlHeightSM / 2,
          transition: `all ${motionDurationFast} linear`,
          userSelect: 'none',
        },

        '&-input': {
          width: '100%',
          height: controlHeight - 2 * controlLineWidth,
          padding: `0 ${inputPaddingHorizontal - controlLineWidth}px`,
          textAlign: 'start',
          backgroundColor: 'transparent',
          border: 0,
          borderRadius: controlRadius,
          outline: 0,
          transition: `all ${motionDurationSlow} linear`,
          appearance: 'textfield',
          ...genPlaceholderStyle(token.colorPlaceholder),

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
          background: colorBgComponent,
          borderStartStartRadius: 0,
          borderStartEndRadius: controlRadius,
          borderEndEndRadius: controlRadius,
          borderEndStartRadius: 0,
          opacity: 0,
          transition: `opacity ${motionDurationMid} linear ${motionDurationFast}`,

          // Fix input number inside Menu makes icon too large
          // We arise the selector priority by nest selector here
          // https://github.com/ant-design/ant-design/issues/14367
          [`${inputNumberCls}-handler`]: {
            [`${inputNumberCls}-handler-up-inner,
              ${inputNumberCls}-handler-down-inner`]: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 'auto',
              marinInlineEnd: 0,
              fontSize: 7, // FIXME: magic
            },
          },

          [`${inputNumberCls}-borderless &`]: {
            borderInlineStartWidth: 0,
          },

          [`&:hover ${inputNumberCls}-handler`]: {
            height: '40%',
          },
        },

        '&-handler-up': {
          borderStartEndRadius: controlRadius,
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
          borderBlockStart: `${controlLineWidth}px ${controlLineType} ${colorBorder}`,
          borderEndEndRadius: controlRadius,
          cursor: 'pointer',

          '&-inner': {
            top: '50%',
            textAlign: 'center',
            transform: 'translateY(-50%)',
          },

          '&:hover': {
            height: '60% !important',
          },

          [`${inputNumberCls}-borderless &`]: {
            borderBlockStartWidth: 0,
          },
        },
        '&-handler-up-disabled, &-handler-down-disabled': {
          cursor: 'not-allowed',
        },

        [`&-handler-up-disabled:hover &-handler-up-inner,
      &-handler-down-disabled:hover &-handler-down-inner`]: {
          color: colorTextDisabled,
        },
      },
    },
  };
};

const genAffixWrapperStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const { inputNumberCls, inputPaddingHorizontal, inputAffixMargin, controlWidth } = token;

  return {
    [`${inputNumberCls}-affix-wrapper`]: {
      ...genBasicInputStyle(token),
      ...genStatusStyle(token),
      // or number handler will cover form status
      position: 'relative',
      display: 'inline-flex',
      width: controlWidth,
      padding: 0,
      paddingInlineStart: inputPaddingHorizontal,

      '&:not(&-disabled):hover': {
        ...genHoverStyle(token),
        zIndex: 1,
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      '&-disabled': {
        [`${inputNumberCls}[disabled]`]: {
          background: 'transparent',
        },
      },

      [`> div${inputNumberCls}`]: {
        width: '100%',
        border: 'none',
        outline: 'none',

        [`&${inputNumberCls}-focused`]: {
          boxShadow: 'none !important',
        },
      },

      [`input${inputNumberCls}-input`]: {
        padding: 0,
      },

      '&::before': {
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [`${inputNumberCls}-handler-wrap`]: {
        zIndex: 2,
      },

      [inputNumberCls]: {
        '&-prefix, &-suffix': {
          display: 'flex',
          flex: 'none',
          alignItems: 'center',
          pointerEvents: 'none',
        },

        '&-prefix': {
          marginInlineEnd: inputAffixMargin,
        },

        '&-suffix': {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          zIndex: 1,
          height: '100%',
          marginInlineEnd: inputPaddingHorizontal,
          marginInlineStart: inputAffixMargin,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { InputNumber } = token;

      const inputNumberToken: InputNumberToken = {
        ...initInputToken(token, prefixCls, iconPrefixCls),
        inputNumberCls: `.${prefixCls}`,
        inputNumberHandlerActiveBgColor: '#f4f4f4', // FIXME: magic number

        controlWidth: 90,

        ...InputNumber,
      };

      return [genInputNumberStyles(inputNumberToken), genAffixWrapperStyles(inputNumberToken)];
    }),
    hashId,
  ];
}
