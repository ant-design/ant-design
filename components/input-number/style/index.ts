import type { SharedComponentToken, SharedInputToken } from '../../input/style';
import {
  genBasicInputStyle,
  genDisabledStyle,
  genInputGroupStyle,
  genPlaceholderStyle,
  genStatusStyle,
  initComponentToken,
  initInputToken,
} from '../../input/style';
import { resetComponent, resetIcon } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { unit } from '@ant-design/cssinjs';
import type { FormatComponentToken } from '../../theme/util/genComponentStyleHook';

export interface ComponentToken extends SharedComponentToken {
  /**
   * @desc 输入框宽度
   * @descEN Width of input
   */
  controlWidth: number;
  /**
   * @desc 操作按钮宽度
   * @descEN Width of control button
   */
  handleWidth: number;
  /**
   * @desc 操作按钮图标大小
   * @descEN Icon size of control button
   */
  handleFontSize: number;
  /**
   * Default `auto`. Set `true` will always show the handle
   * @desc 操作按钮可见性
   * @descEN Handle visible
   */
  handleVisible: 'auto' | true;
  /**
   * @desc 操作按钮背景色
   * @descEN Background color of handle
   */
  handleBg: string;
  /**
   * @desc 操作按钮激活背景色
   * @descEN Active background color of handle
   */
  handleActiveBg: string;
  /**
   * @desc 操作按钮悬浮颜色
   * @descEN Hover color of handle
   */
  handleHoverColor: string;
  /**
   * @desc 操作按钮边框颜色
   * @descEN Border color of handle
   */
  handleBorderColor: string;
  /**
   * @internal
   */
  handleOpacity: number;
}

type InputNumberToken = FullToken<'InputNumber'> & SharedInputToken;

export const genRadiusStyle = (
  { componentCls, borderRadiusSM, borderRadiusLG }: InputNumberToken,
  size: 'lg' | 'sm',
) => {
  const borderRadius = size === 'lg' ? borderRadiusLG : borderRadiusSM;
  return {
    [`&-${size}`]: {
      [`${componentCls}-handler-wrap`]: {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius,
      },
      [`${componentCls}-handler-up`]: {
        borderStartEndRadius: borderRadius,
      },
      [`${componentCls}-handler-down`]: {
        borderEndEndRadius: borderRadius,
      },
    },
  };
};

const genInputNumberStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    colorError,
    paddingInlineSM,
    colorTextDescription,
    motionDurationMid,
    handleHoverColor,
    paddingInline,
    paddingBlock,
    handleBg,
    handleActiveBg,
    colorTextDisabled,
    borderRadiusSM,
    borderRadiusLG,
    controlWidth,
    handleOpacity,
    handleBorderColor,
    calc,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genBasicInputStyle(token),
        ...genStatusStyle(token, componentCls),

        display: 'inline-block',
        width: controlWidth,
        margin: 0,
        padding: 0,
        border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderRadius,

        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-input`]: {
            direction: 'rtl',
          },
        },

        '&-lg': {
          padding: 0,
          fontSize: fontSizeLG,
          borderRadius: borderRadiusLG,

          [`input${componentCls}-input`]: {
            height: calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal(),
          },
        },

        '&-sm': {
          padding: 0,
          borderRadius: borderRadiusSM,

          [`input${componentCls}-input`]: {
            height: calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal(),
            padding: `0 ${unit(paddingInlineSM)}`,
          },
        },

        // ===================== Out Of Range =====================
        '&-out-of-range': {
          [`${componentCls}-input-wrap`]: {
            input: {
              color: colorError,
            },
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

            [`${componentCls}-affix-wrapper`]: {
              width: '100%',
            },

            // Size
            '&-lg': {
              [`${componentCls}-group-addon`]: {
                borderRadius: borderRadiusLG,
                fontSize: token.fontSizeLG,
              },
            },
            '&-sm': {
              [`${componentCls}-group-addon`]: {
                borderRadius: borderRadiusSM,
              },
            },

            [`${componentCls}-wrapper-disabled > ${componentCls}-group-addon`]: {
              ...genDisabledStyle(token),
            },

            // Fix the issue of using icons in Space Compact mode
            // https://github.com/ant-design/ant-design/issues/45764
            [`&:not(${componentCls}-compact-first-item):not(${componentCls}-compact-last-item)${componentCls}-compact-item`]:
              {
                [`${componentCls}, ${componentCls}-group-addon`]: {
                  borderRadius: 0,
                },
              },

            [`&:not(${componentCls}-compact-last-item)${componentCls}-compact-first-item`]: {
              [`${componentCls}, ${componentCls}-group-addon`]: {
                borderStartEndRadius: 0,
                borderEndEndRadius: 0,
              },
            },

            [`&:not(${componentCls}-compact-first-item)${componentCls}-compact-last-item`]: {
              [`${componentCls}, ${componentCls}-group-addon`]: {
                borderStartStartRadius: 0,
                borderEndStartRadius: 0,
              },
            },
          },
        },

        [`&-disabled ${componentCls}-input`]: {
          cursor: 'not-allowed',
        },

        [componentCls]: {
          '&-input': {
            ...resetComponent(token),
            width: '100%',
            padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
            textAlign: 'start',
            backgroundColor: 'transparent',
            border: 0,
            borderRadius,
            outline: 0,
            transition: `all ${motionDurationMid} linear`,
            appearance: 'textfield',
            fontSize: 'inherit',
            ...genPlaceholderStyle(token.colorTextPlaceholder),

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
      [componentCls]: {
        [`&:hover ${componentCls}-handler-wrap, &-focused ${componentCls}-handler-wrap`]: {
          opacity: 1,
        },

        [`${componentCls}-handler-wrap`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          width: token.handleWidth,
          height: '100%',
          background: handleBg,
          borderStartStartRadius: 0,
          borderStartEndRadius: borderRadius,
          borderEndEndRadius: borderRadius,
          borderEndStartRadius: 0,
          opacity: handleOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          transition: `opacity ${motionDurationMid} linear ${motionDurationMid}`,

          // Fix input number inside Menu makes icon too large
          // We arise the selector priority by nest selector here
          // https://github.com/ant-design/ant-design/issues/14367
          [`${componentCls}-handler`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'auto',
            height: '40%',

            [`
              ${componentCls}-handler-up-inner,
              ${componentCls}-handler-down-inner
            `]: {
              marginInlineEnd: 0,
              fontSize: token.handleFontSize,
            },
          },
        },

        [`${componentCls}-handler`]: {
          height: '50%',
          overflow: 'hidden',
          color: colorTextDescription,
          fontWeight: 'bold',
          lineHeight: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderInlineStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
          transition: `all ${motionDurationMid} linear`,
          '&:active': {
            background: handleActiveBg,
          },

          // Hover
          '&:hover': {
            height: `60%`,

            [`
              ${componentCls}-handler-up-inner,
              ${componentCls}-handler-down-inner
            `]: {
              color: handleHoverColor,
            },
          },

          '&-up-inner, &-down-inner': {
            ...resetIcon(),

            color: colorTextDescription,
            transition: `all ${motionDurationMid} linear`,
            userSelect: 'none',
          },
        },

        [`${componentCls}-handler-up`]: {
          borderStartEndRadius: borderRadius,
        },

        [`${componentCls}-handler-down`]: {
          borderBlockStart: `${unit(lineWidth)} ${lineType} ${handleBorderColor}`,
          borderEndEndRadius: borderRadius,
        },

        ...genRadiusStyle(token, 'lg'),
        ...genRadiusStyle(token, 'sm'),

        // Disabled
        '&-disabled, &-readonly': {
          [`${componentCls}-handler-wrap`]: {
            display: 'none',
          },

          [`${componentCls}-input`]: {
            color: 'inherit',
          },
        },

        [`
          ${componentCls}-handler-up-disabled,
          ${componentCls}-handler-down-disabled
        `]: {
          cursor: 'not-allowed',
        },

        [`
          ${componentCls}-handler-up-disabled:hover &-handler-up-inner,
          ${componentCls}-handler-down-disabled:hover &-handler-down-inner
        `]: {
          color: colorTextDisabled,
        },
      },
    },

    // Border-less
    {
      [`${componentCls}-borderless`]: {
        borderColor: 'transparent',
        boxShadow: 'none',

        [`${componentCls}-handler-down`]: {
          borderBlockStartWidth: 0,
        },
      },
    },
  ];
};

const genAffixWrapperStyles: GenerateStyle<InputNumberToken> = (token: InputNumberToken) => {
  const {
    componentCls,
    paddingBlock,
    paddingInline,
    inputAffixPadding,
    controlWidth,
    borderRadiusLG,
    borderRadiusSM,
  } = token;

  return {
    [`${componentCls}-affix-wrapper`]: {
      ...genBasicInputStyle(token),
      ...genStatusStyle(token, `${componentCls}-affix-wrapper`),
      // or number handler will cover form status
      position: 'relative',
      display: 'inline-flex',
      width: controlWidth,
      padding: 0,
      paddingInlineStart: paddingInline,

      '&-lg': {
        borderRadius: borderRadiusLG,
      },

      '&-sm': {
        borderRadius: borderRadiusSM,
      },

      [`&:not(${componentCls}-affix-wrapper-disabled):hover`]: {
        zIndex: 1,
      },

      '&-focused, &:focus': {
        zIndex: 1,
      },

      [`&-disabled > ${componentCls}-disabled`]: {
        background: 'transparent',
      },

      [`> div${componentCls}`]: {
        width: '100%',
        border: 'none',
        outline: 'none',

        [`&${componentCls}-focused`]: {
          boxShadow: 'none !important',
        },
      },

      [`input${componentCls}-input`]: {
        padding: `${unit(paddingBlock)} 0`,
      },

      '&::before': {
        display: 'inline-block',
        width: 0,
        visibility: 'hidden',
        content: '"\\a0"',
      },

      [`${componentCls}-handler-wrap`]: {
        zIndex: 2,
      },

      [componentCls]: {
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
          marginInlineEnd: paddingInline,
          marginInlineStart: inputAffixPadding,
        },
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'InputNumber'> = (token) => ({
  ...initComponentToken(token),
  controlWidth: 90,
  handleWidth: token.controlHeightSM - token.lineWidth * 2,
  handleFontSize: token.fontSize / 2,
  handleVisible: 'auto',
  handleActiveBg: token.colorFillAlter,
  handleBg: token.colorBgContainer,
  handleHoverColor: token.colorPrimary,
  handleBorderColor: token.colorBorder,
  handleOpacity: 0,
});

export const formatComponentToken: FormatComponentToken<'InputNumber'> = (token) => ({
  ...token,
  handleOpacity: token.handleVisible === true ? 1 : 0,
});

export default genStyleHooks(
  'InputNumber',
  (token) => {
    const inputNumberToken = mergeToken<InputNumberToken>(token, initInputToken(token));
    return [
      genInputNumberStyles(inputNumberToken),
      genAffixWrapperStyles(inputNumberToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(inputNumberToken),
    ];
  },
  prepareComponentToken,
  {
    format: formatComponentToken,
    unitless: {
      handleOpacity: true,
    },
  },
);
