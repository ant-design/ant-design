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

interface RadioToken extends FullToken<'Radio'> {
  radioFocusShadow: string;
  radioButtonFocusShadow: string;
}

// ============================== Styles ==============================
// styles from RadioGroup only
const getGroupRadioStyle: GenerateStyle<RadioToken> = (token) => {
  const { componentCls, antCls } = token;
  const groupPrefixCls = `${componentCls}-group`;

  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      display: 'inline-block',
      fontSize: 0,

      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1,
      },

      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: 'none',
      },
    },
  };
};

// Styles from radio-wrapper
const getRadioBasicStyle: GenerateStyle<RadioToken> = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
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
    lineType,
    radioColor,
    radioBgColor,
    calc,
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;

  const dotPadding = 4;
  const radioDotDisabledSize = calc(radioSize).sub(calc(dotPadding).mul(2));
  const radioSizeCalc = calc(1).mul(radioSize).equal();

  return {
    [`${componentCls}-wrapper`]: {
      ...resetComponent(token),
      display: 'inline-flex',
      alignItems: 'baseline',
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: 'pointer',

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

      // hashId 在 wrapper 上，只能铺平
      [`${componentCls}-checked::after`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: '100%',
        height: '100%',
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: '50%',
        visibility: 'hidden',
        opacity: 0,
        content: '""',
      },

      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        display: 'inline-block',
        outline: 'none',
        cursor: 'pointer',
        alignSelf: 'center',
        borderRadius: '50%',
      },

      [`${componentCls}-wrapper:hover &,
        &:hover ${radioInnerPrefixCls}`]: {
        borderColor: colorPrimary,
      },

      [`${componentCls}-input:focus-visible + ${radioInnerPrefixCls}`]: {
        ...genFocusOutline(token),
      },

      [`${componentCls}:hover::after, ${componentCls}-wrapper:hover &::after`]: {
        visibility: 'visible',
      },

      [`${componentCls}-inner`]: {
        '&::after': {
          boxSizing: 'border-box',
          position: 'absolute',
          insetBlockStart: '50%',
          insetInlineStart: '50%',
          display: 'block',
          width: radioSizeCalc,
          height: radioSizeCalc,
          marginBlockStart: calc(1).mul(radioSize).div(-2).equal(),
          marginInlineStart: calc(1).mul(radioSize).div(-2).equal(),
          backgroundColor: radioColor,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSizeCalc,
          transform: 'scale(0)',
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          content: '""',
        },

        boxSizing: 'border-box',
        position: 'relative',
        insetBlockStart: 0,
        insetInlineStart: 0,
        display: 'block',
        width: radioSizeCalc,
        height: radioSizeCalc,
        backgroundColor: colorBgContainer,
        borderColor: colorBorder,
        borderStyle: 'solid',
        borderWidth: lineWidth,
        borderRadius: '50%',
        transition: `all ${motionDurationMid}`,
      },

      [`${componentCls}-input`]: {
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        cursor: 'pointer',
        opacity: 0,
      },

      // 选中状态
      [`${componentCls}-checked`]: {
        [radioInnerPrefixCls]: {
          borderColor: colorPrimary,
          backgroundColor: radioBgColor,

          '&::after': {
            transform: `scale(${token.calc(token.dotSize).div(radioSize).equal()})`,
            opacity: 1,
            transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          },
        },
      },

      [`${componentCls}-disabled`]: {
        cursor: 'not-allowed',

        [radioInnerPrefixCls]: {
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: 'not-allowed',

          '&::after': {
            backgroundColor: dotColorDisabled,
          },
        },

        [`${componentCls}-input`]: {
          cursor: 'not-allowed',
        },

        [`${componentCls}-disabled + span`]: {
          color: colorTextDisabled,
          cursor: 'not-allowed',
        },

        [`&${componentCls}-checked`]: {
          [radioInnerPrefixCls]: {
            '&::after': {
              transform: `scale(${calc(radioDotDisabledSize)
                .div(radioSize)
                .equal({ unit: false })})`,
            },
          },
        },
      },

      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS,
      },
    },
  };
};

// Styles from radio-button
const getRadioButtonStyle: GenerateStyle<RadioToken> = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationSlow,
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
      borderInlineStartWidth: 0,
      borderInlineEndWidth: lineWidth,
      cursor: 'pointer',
      transition: [
        `color ${motionDurationMid}`,
        `background ${motionDurationMid}`,
        `box-shadow ${motionDurationMid}`,
      ].join(','),

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

      '&:not(:first-child)': {
        '&::before': {
          position: 'absolute',
          insetBlockStart: calc(lineWidth).mul(-1).equal(),
          insetInlineStart: calc(lineWidth).mul(-1).equal(),
          display: 'block',
          boxSizing: 'content-box',
          width: 1,
          height: '100%',
          paddingBlock: lineWidth,
          paddingInline: 0,
          backgroundColor: colorBorder,
          transition: `background-color ${motionDurationSlow}`,
          content: '""',
        },
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

      '&:hover': {
        position: 'relative',
        color: colorPrimary,
      },

      '&:has(:focus-visible)': {
        ...genFocusOutline(token),
      },

      [`${componentCls}-inner, input[type='checkbox'], input[type='radio']`]: {
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
