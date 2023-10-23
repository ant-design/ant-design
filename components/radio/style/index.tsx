import { genFocusOutline, resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

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
}

interface RadioToken extends FullToken<'Radio'> {
  radioDotDisabledSize: number;
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
    dotSize,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    lineType,
    radioDotDisabledSize,
    wireframe,
    colorWhite,
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;

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
        border: `${lineWidth}px ${lineType} ${colorPrimary}`,
        borderRadius: '50%',
        visibility: 'hidden',
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
          width: radioSize,
          height: radioSize,
          marginBlockStart: radioSize / -2,
          marginInlineStart: radioSize / -2,
          backgroundColor: wireframe ? colorPrimary : colorWhite,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSize,
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
        width: radioSize,
        height: radioSize,
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
          backgroundColor: wireframe ? colorBgContainer : colorPrimary,

          '&::after': {
            transform: `scale(${dotSize / radioSize})`,
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
              transform: `scale(${radioDotDisabledSize / radioSize})`,
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
      lineHeight: `${controlHeight - lineWidth * 2}px`,
      background: buttonBg,
      border: `${lineWidth}px ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: lineWidth + 0.02,
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
          insetBlockStart: -lineWidth,
          insetInlineStart: -lineWidth,
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
        borderInlineStart: `${lineWidth}px ${lineType} ${colorBorder}`,
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
        lineHeight: `${controlHeightLG - lineWidth * 2}px`,

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
        paddingInline: paddingXS - lineWidth,
        paddingBlock: 0,
        lineHeight: `${controlHeightSM - lineWidth * 2}px`,

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

const getDotSize = (radioSize: number): number => {
  const dotPadding = 4; // Fixed Value
  return radioSize - dotPadding * 2;
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Radio',
  (token) => {
    const { controlOutline, controlOutlineWidth, radioSize } = token;

    const radioFocusShadow = `0 0 0 ${controlOutlineWidth}px ${controlOutline}`;
    const radioButtonFocusShadow = radioFocusShadow;
    const radioDotDisabledSize = getDotSize(radioSize);

    const radioToken = mergeToken<RadioToken>(token, {
      radioDotDisabledSize,
      radioFocusShadow,
      radioButtonFocusShadow,
    });

    return [
      getGroupRadioStyle(radioToken),
      getRadioBasicStyle(radioToken),
      getRadioButtonStyle(radioToken),
    ];
  },
  (token) => {
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
    } = token;

    const dotPadding = 4; // Fixed value
    const radioSize = fontSizeLG;
    const radioDotSize = wireframe
      ? getDotSize(radioSize)
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
    };
  },
);
