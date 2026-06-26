import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genFocusOutline, resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

// ============================== Tokens ==============================
export interface ComponentToken {
  // Radio
  /**
   * @desc 单选框大小
   * @descEN Radio size
   */
  radioSize: number;
  /**
   * @desc 单选框圆点大小
   * @descEN Size of Radio dot
   */
  dotSize: number;
  /**
   * @desc 单选框圆点禁用颜色
   * @descEN Color of disabled Radio dot
   */
  dotColorDisabled: string;

  // Radio buttons
  /**
   * @desc 单选框按钮背景色
   * @descEN Background color of Radio button
   */
  buttonBg: string;
  /**
   * @desc 单选框按钮选中背景色
   * @descEN Background color of checked Radio button
   */
  buttonCheckedBg: string;
  /**
   * @desc 单选框按钮文本颜色
   * @descEN Color of Radio button text
   */
  buttonColor: string;
  /**
   * @desc 单选框按钮横向内间距
   * @descEN Horizontal padding of Radio button
   */
  buttonPaddingInline: number;
  /**
   * @desc 单选框按钮选中并禁用时的背景色
   * @descEN Background color of checked and disabled Radio button
   */
  buttonCheckedBgDisabled: string;
  /**
   * @desc 单选框按钮选中并禁用时的文本颜色
   * @descEN Color of checked and disabled Radio button text
   */
  buttonCheckedColorDisabled: string;
  /**
   * @desc 单选框实色按钮选中时的文本颜色
   * @descEN Color of checked solid Radio button text
   */
  buttonSolidCheckedColor: string;
  /**
   * @desc 单选框实色按钮选中时的背景色
   * @descEN Background color of checked solid Radio button text
   */
  buttonSolidCheckedBg: string;
  /**
   * @desc 单选框实色按钮选中时的悬浮态背景色
   * @descEN Background color of checked solid Radio button text when hover
   */
  buttonSolidCheckedHoverBg: string;
  /**
   * @desc 单选框实色按钮选中时的激活态背景色
   * @descEN Background color of checked solid Radio button text when active
   */
  buttonSolidCheckedActiveBg: string;
  /**
   * @desc 单选框右间距
   * @descEN Margin right of Radio button
   */
  wrapperMarginInlineEnd: number;

  /** @internal */
  radioColor: string;
  /** @internal */
  radioBgColor: string;
}

/**
 * @desc Radio 组件的 Token
 * @descEN Token for Radio component
 */
interface RadioToken extends FullToken<'Radio'> {
  /**
   * @desc 单选框焦点阴影
   * @descEN Focus shadow of Radio
   */
  radioFocusShadow: string;
  /**
   * @desc 单选框按钮焦点阴影
   * @descEN Focus shadow of Radio button
   */
  radioButtonFocusShadow: string;
}

// ============================== Styles ==============================
// styles from RadioGroup only
const getGroupRadioStyle: GenerateStyle<RadioToken, CSSObject> = (token) => {
  const { componentCls, antCls, lineWidth, borderRadius, borderRadiusLG, borderRadiusSM, calc } =
    token;
  const groupPrefixCls = `${componentCls}-group`;
  const buttonWrapperCls = `${componentCls}-button-wrapper`;
  const badgeCls = `${antCls}-badge`;

  const genVerticalBadgeButtonStyle = (radius: number): CSSObject => ({
    [`> ${badgeCls}`]: {
      width: 'auto',
    },

    [`> ${badgeCls} > ${buttonWrapperCls}`]: {
      width: '100%',
    },

    [`> ${badgeCls}:not(:last-child)`]: {
      marginBlockEnd: calc(lineWidth).mul(-1).equal(),
    },

    [`> ${badgeCls} > ${buttonWrapperCls}:not(:last-child)`]: {
      marginBlockEnd: 0,
    },

    [`> ${badgeCls}:first-child > ${buttonWrapperCls}`]: {
      borderStartStartRadius: radius,
      borderStartEndRadius: radius,
      borderEndStartRadius: 0,
      borderEndEndRadius: 0,
    },

    [`> ${badgeCls}:last-child > ${buttonWrapperCls}`]: {
      borderStartStartRadius: 0,
      borderStartEndRadius: 0,
      borderEndStartRadius: radius,
      borderEndEndRadius: radius,
    },

    [`> ${badgeCls}:not(:first-child):not(:last-child) > ${buttonWrapperCls}`]: {
      borderRadius: 0,
    },

    [`> ${badgeCls}:first-child:last-child > ${buttonWrapperCls}`]: {
      borderRadius: radius,
    },
  });

  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      fontSize: 0,

      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: 'rtl',
      },

      [`&${groupPrefixCls}-block`]: {
        display: 'flex',
      },

      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1,
      },

      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: 'none',
      },

      '&-vertical': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: token.marginXS,

        [`&:has(> ${buttonWrapperCls}, > ${badgeCls} > ${buttonWrapperCls})`]: {
          rowGap: 0,
        },

        [`${componentCls}-wrapper`]: {
          marginInlineEnd: 0,
        },

        ...genVerticalBadgeButtonStyle(borderRadius),

        [`&${groupPrefixCls}-large`]: {
          ...genVerticalBadgeButtonStyle(borderRadiusLG),
        },

        [`&${groupPrefixCls}-small`]: {
          ...genVerticalBadgeButtonStyle(borderRadiusSM),
        },
      },
    },
  };
};

// Styles from radio-wrapper
const getRadioBasicStyle: GenerateStyle<RadioToken, CSSObject> = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
    colorPrimaryHover,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOutCirc,
    colorBgContainer,
    colorBorder,
    lineWidth,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    dotSize,
    lineType,
    radioColor,
    radioBgColor,
  } = token;

  return {
    [`${componentCls}-wrapper`]: {
      ...resetComponent(token),
      display: 'inline-flex',
      alignItems: 'baseline',
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: 'pointer',

      '&:last-child': {
        marginInlineEnd: 0,
      },

      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: 'rtl',
      },

      '&-disabled': {
        cursor: 'not-allowed',
        color: token.colorTextDisabled,
      },

      '&::after': {
        display: 'inline-block',
        width: 0,
        overflow: 'hidden',
        content: '"\\a0"',
      },

      '&-block': {
        flex: 1,
        justifyContent: 'center',
      },

      // ===================== Radio =====================
      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        whiteSpace: 'nowrap',
        lineHeight: 1,
        cursor: 'pointer',
        alignSelf: 'center',

        // Styles moved from inner
        boxSizing: 'border-box',
        display: 'block',
        width: `calc(${radioSize} * 1px)`,
        height: `calc(${radioSize} * 1px)`,
        backgroundColor: colorBgContainer,
        border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderRadius: '50%',
        transition: `all ${motionDurationMid}`,
        flex: 'none',

        // Dot
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0)',
          width: `calc(${dotSize} * 1px)`,
          height: `calc(${dotSize} * 1px)`,
          backgroundColor: radioColor,
          borderRadius: '50%',
          transformOrigin: '50% 50%',
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
        },

        // Wrapper > Radio > input
        [`${componentCls}-input`]: {
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          cursor: 'pointer',
          opacity: 0,
          margin: 0,
        },

        // Focus outline on radio when input is focus-visible
        [`&:has(${componentCls}-input:focus-visible)`]: genFocusOutline(token),
      },

      // ===================== Hover =====================
      [`&:hover:not(${componentCls}-wrapper-disabled) ${componentCls}`]: {
        borderColor: colorPrimary,
      },

      [`&:hover ${componentCls}-checked:not(${componentCls}-disabled)`]: {
        backgroundColor: colorPrimaryHover,
        borderColor: 'transparent',
      },

      // ==================== Checked ====================
      [`${componentCls}-checked`]: {
        backgroundColor: radioBgColor,
        borderColor: colorPrimary,

        '&::after': {
          transform: `translate(-50%, -50%)`,
          opacity: 1,
        },
      },

      // ==================== Disable ====================
      [`${componentCls}-disabled`]: {
        // Wrapper > Radio > input
        [`&, ${componentCls}-input`]: {
          cursor: 'not-allowed',
          // Disabled for native input to enable Tooltip event handler
          pointerEvents: 'none',
        },

        // Disabled radio styles
        background: colorBgContainerDisabled,
        borderColor: colorBorder,

        '&::after': {
          backgroundColor: dotColorDisabled,
        },
      },

      [`${componentCls}-disabled + span`]: {
        color: colorTextDisabled,
        cursor: 'not-allowed',
      },

      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS,
      },
    },
  };
};

// Styles from radio-button
const getRadioButtonStyle: GenerateStyle<RadioToken, CSSObject> = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationMid,
    buttonPaddingInline,
    fontSize,
    buttonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    buttonCheckedBg,
    buttonSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    buttonCheckedBgDisabled,
    buttonCheckedColorDisabled,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    buttonSolidCheckedBg,
    buttonSolidCheckedHoverBg,
    buttonSolidCheckedActiveBg,
    calc,
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: 'relative',
      display: 'inline-block',
      height: controlHeight,
      margin: 0,
      paddingInline: buttonPaddingInline,
      paddingBlock: 0,
      color: buttonColor,
      fontSize,
      lineHeight: unit(calc(controlHeight).sub(calc(lineWidth).mul(2)).equal()),
      background: buttonBg,
      border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: calc(lineWidth).add(0.02).equal(),
      borderInlineEndWidth: lineWidth,
      cursor: 'pointer',
      transition: [`color`, `background-color`, `box-shadow`]
        .map((prop) => `${prop} ${motionDurationMid}`)
        .join(','),

      a: {
        color: buttonColor,
      },

      [`> ${componentCls}-button`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      },

      '&:not(:last-child)': {
        marginInlineEnd: calc(lineWidth).mul(-1).equal(),
      },

      '&:first-child': {
        borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius,
      },

      '&:last-child': {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius,
      },

      '&:first-child:last-child': {
        borderRadius,
      },

      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: unit(calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal()),

        '&:first-child': {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG,
        },

        '&:last-child': {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG,
        },
      },

      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: calc(paddingXS).sub(lineWidth).equal(),
        paddingBlock: 0,
        lineHeight: unit(calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal()),

        '&:first-child': {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM,
        },

        '&:last-child': {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM,
        },
      },

      [`${componentCls}-group-vertical > &`]: {
        marginInlineEnd: 0,
        borderRadius: 0,

        '&:not(:last-child)': {
          marginBlockEnd: calc(lineWidth).mul(-1).equal(),
        },

        '&:first-child': {
          borderStartStartRadius: borderRadius,
          borderStartEndRadius: borderRadius,
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
        },

        '&:last-child': {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
          borderEndStartRadius: borderRadius,
          borderEndEndRadius: borderRadius,
        },

        '&:first-child:last-child': {
          borderRadius,
        },
      },

      [`${componentCls}-group-vertical${componentCls}-group-large > &`]: {
        '&:first-child': {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG,
        },

        '&:last-child': {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG,
        },

        '&:first-child:last-child': {
          borderRadius: borderRadiusLG,
        },
      },

      [`${componentCls}-group-vertical${componentCls}-group-small > &`]: {
        '&:first-child': {
          borderStartStartRadius: borderRadiusSM,
          borderStartEndRadius: borderRadiusSM,
        },

        '&:last-child': {
          borderEndStartRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM,
        },

        '&:first-child:last-child': {
          borderRadius: borderRadiusSM,
        },
      },

      '&:hover': {
        position: 'relative',
        color: colorPrimary,
      },

      '&:has(:focus-visible)': genFocusOutline(token),

      [`${componentCls}, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: 'none',
      },

      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: colorPrimary,
        background: buttonCheckedBg,
        borderColor: colorPrimary,

        '&::before': {
          backgroundColor: colorPrimary,
        },

        '&:first-child': {
          borderColor: colorPrimary,
        },

        '&:hover': {
          color: colorPrimaryHover,
          borderColor: colorPrimaryHover,

          '&::before': {
            backgroundColor: colorPrimaryHover,
          },
        },

        '&:active': {
          color: colorPrimaryActive,
          borderColor: colorPrimaryActive,

          '&::before': {
            backgroundColor: colorPrimaryActive,
          },
        },
      },

      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: buttonSolidCheckedColor,
        background: buttonSolidCheckedBg,
        borderColor: buttonSolidCheckedBg,

        '&:hover': {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedHoverBg,
          borderColor: buttonSolidCheckedHoverBg,
        },

        '&:active': {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedActiveBg,
          borderColor: buttonSolidCheckedActiveBg,
        },
      },

      '&-disabled': {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: 'not-allowed',

        '&:first-child, &:hover': {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
        },
      },

      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: buttonCheckedColorDisabled,
        backgroundColor: buttonCheckedBgDisabled,
        borderColor: colorBorder,
        boxShadow: 'none',
      },

      '&-block': {
        flex: 1,
        textAlign: 'center',
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Radio'> = (token) => {
  const {
    wireframe,
    padding,
    marginXS,
    lineWidth,
    fontSizeLG,
    colorText,
    colorBgContainer,
    colorTextDisabled,
    controlItemBgActiveDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    colorWhite,
  } = token;

  const dotPadding = 4; // Fixed value
  const radioSize = fontSizeLG;
  const radioDotSize = wireframe
    ? radioSize - dotPadding * 2
    : radioSize - (dotPadding + lineWidth) * 2;

  return {
    // Radio
    radioSize,
    dotSize: radioDotSize,
    dotColorDisabled: colorTextDisabled,

    // Radio buttons
    buttonSolidCheckedColor: colorTextLightSolid,
    buttonSolidCheckedBg: colorPrimary,
    buttonSolidCheckedHoverBg: colorPrimaryHover,
    buttonSolidCheckedActiveBg: colorPrimaryActive,
    buttonBg: colorBgContainer,
    buttonCheckedBg: colorBgContainer,
    buttonColor: colorText,
    buttonCheckedBgDisabled: controlItemBgActiveDisabled,
    buttonCheckedColorDisabled: colorTextDisabled,
    buttonPaddingInline: padding - lineWidth,
    wrapperMarginInlineEnd: marginXS,

    // internal
    radioColor: wireframe ? colorPrimary : colorWhite,
    radioBgColor: wireframe ? colorBgContainer : colorPrimary,
  };
};

export default genStyleHooks(
  'Radio',
  (token) => {
    const { controlOutline, controlOutlineWidth } = token;

    const radioFocusShadow = `0 0 0 ${unit(controlOutlineWidth)} ${controlOutline}`;
    const radioButtonFocusShadow = radioFocusShadow;

    const radioToken = mergeToken<RadioToken>(token, {
      radioFocusShadow,
      radioButtonFocusShadow,
    });

    return [
      getGroupRadioStyle(radioToken),
      getRadioBasicStyle(radioToken),
      getRadioButtonStyle(radioToken),
    ];
  },
  prepareComponentToken,
  {
    unitless: {
      radioSize: true,
      dotSize: true,
    },
  },
);
