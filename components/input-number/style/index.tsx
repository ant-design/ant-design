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
  handleWidth: number;
  handleFontSize: number;
}

interface InputNumberToken extends InputToken, ComponentToken {
  inputNumberCls: string;
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
    inputPaddingHorizontalSM,
    colorTextSecondary,
    motionDurationFast,
    colorPrimary,
    controlHeight,
    inputPaddingHorizontal,
    motionDurationSlow,
    colorBgComponent,
    motionDurationMid,
    colorTextDisabled,
    controlWidth,
  } = token;

  return [
    {
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
            padding: `0 ${inputPaddingHorizontalSM}px`,
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
          '&-input': {
            width: '100%',
            height: controlHeight - 2 * controlLineWidth,
            padding: `0 ${inputPaddingHorizontal}px`,
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
        },
      },
    },

    // Handler
    {
      [inputNumberCls]: {
        [`&:hover ${inputNumberCls}-handler-wrap, &-focused ${inputNumberCls}-handler-wrap`]: {
          opacity: 1,
        },

        [`${inputNumberCls}-handler-wrap`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          width: token.handleWidth,
          height: '100%',
          background: colorBgComponent,
          borderStartStartRadius: 0,
          borderStartEndRadius: controlRadius,
          borderEndEndRadius: controlRadius,
          borderEndStartRadius: 0,
          opacity: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          transition: `opacity ${motionDurationMid} linear ${motionDurationFast}`,

          // Fix input number inside Menu makes icon too large
          // We arise the selector priority by nest selector here
          // https://github.com/ant-design/ant-design/issues/14367
          [`${inputNumberCls}-handler`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'auto',
            height: '40%',

            [`
              ${inputNumberCls}-handler-up-inner,
              ${inputNumberCls}-handler-down-inner
            `]: {
              marginInlineEnd: 0,
              fontSize: token.handleFontSize,
            },
          },
        },

        [`${inputNumberCls}-handler`]: {
          height: '50%',
          overflow: 'hidden',
          color: colorTextSecondary,
          fontWeight: 'bold',
          lineHeight: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderInlineStart: `${controlLineWidth}px ${controlLineType} ${colorBorder}`,
          transition: `all ${motionDurationFast} linear`,
          '&:active': {
            background: token.colorBgComponentSecondary,
          },

          // Hover
          '&:hover': {
            height: `60%`,

            [`
              ${inputNumberCls}-handler-up-inner,
              ${inputNumberCls}-handler-down-inner
            `]: {
              color: colorPrimary,
            },
          },

          '&-up-inner, &-down-inner': {
            ...resetIcon(),

            color: colorTextSecondary,
            transition: `all ${motionDurationFast} linear`,
            userSelect: 'none',
          },
        },

        [`${inputNumberCls}-handler-up`]: {
          borderStartEndRadius: controlRadius,
        },

        [`${inputNumberCls}-handler-down`]: {
          borderBlockStart: `${controlLineWidth}px ${controlLineType} ${colorBorder}`,
          borderEndEndRadius: controlRadius,
        },

        // Disabled
        '&-disabled, &-readonly': {
          [`${inputNumberCls}-handler-wrap`]: {
            display: 'none',
          },
        },

        [`
          ${inputNumberCls}-handler-up-disabled,
          ${inputNumberCls}-handler-down-disabled
        `]: {
          cursor: 'not-allowed',
        },

        [`
          ${inputNumberCls}-handler-up-disabled:hover &-handler-up-inner,
          ${inputNumberCls}-handler-down-disabled:hover &-handler-down-inner
        `]: {
          color: colorTextDisabled,
        },
      },
    },

    // Border-less
    {
      [`${inputNumberCls}-borderless`]: {
        borderColor: 'transparent',
        boxShadow: 'none',

        [`${inputNumberCls}-handler-down`]: {
          borderBlockStartWidth: 0,
        },
      },
    },
  ];
};

const genAffixWrapperStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const { inputNumberCls, inputPaddingHorizontal, inputAffixPadding, controlWidth } = token;

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
          marginInlineEnd: inputAffixPadding,
        },

        '&-suffix': {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          zIndex: 1,
          height: '100%',
          marginInlineEnd: inputPaddingHorizontal,
          marginInlineStart: inputAffixPadding,
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
      const { InputNumber, controlLineWidth, controlHeightSM, fontSize } = token;

      const inputNumberToken: InputNumberToken = {
        ...initInputToken(token, prefixCls, iconPrefixCls),
        inputNumberCls: `.${prefixCls}`,

        controlWidth: 90,
        handleWidth: controlHeightSM - controlLineWidth * 2,
        handleFontSize: fontSize / 2,

        ...InputNumber,
      };

      return [genInputNumberStyles(inputNumberToken), genAffixWrapperStyles(inputNumberToken)];
    }),
    hashId,
  ];
}
