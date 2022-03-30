// deps-lint-skip-all
import { CSSInterpolation, Keyframes } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  resetComponent,
  UseComponentStyleResult,
} from '../../_util/theme';
import { GlobalToken } from '../../_util/theme/interface';

// ============================== Tokens ==============================
interface RadioToken extends DerivativeToken {
  radioDuration: string;
  radioFocusShadow: string;
  radioButtonFocusShadow: string;

  radioSize: number;
  radioTop: string;
  radioBorderWidth: number;
  radioDotSize: number;
  radioDotColor: string;
  radioDotDisabledColor: string;
  radioSolidCheckedColor: string;

  radioButtonBg: string;
  radioButtonCheckedBg: string;
  radioButtonColor: string;
  radioButtonHoverColor: string;
  radioButtonActiveColor: string;
  radioButtonPaddingHorizontal: number;
  radioDisabledButtonCheckedBg: string;
  radioDisabledButtonCheckedColor: string;
  radioWrapperMarginRight: number;
}

function getRadioToken(token: GlobalToken) {
  // Radio
  const radioDuration = '0.3s';
  // primary-color-1
  const radioFocusShadow = `0 0 0 3px ${token.colorPrimary}`;
  const radioButtonFocusShadow = radioFocusShadow;

  const radioSize = token.fontSizeLG;
  const radioTop = '0.2em';
  const radioBorderWidth = 1;
  const radioDotSize = radioSize - 8;
  const radioDotColor = token.colorPrimary;
  // FIXME: hard code
  const radioDotDisabledColor = new TinyColor('#000').setAlpha(0.2).toRgbString();
  const radioSolidCheckedColor = token.colorBgComponent;

  // Radio buttons
  const radioButtonBg = token.colorBgComponent;
  const radioButtonCheckedBg = token.colorBgComponent;
  const radioButtonColor = token.colorText;
  const radioButtonHoverColor = token.colorPrimaryHover;
  const radioButtonActiveColor = token.colorPrimaryActive;
  const radioButtonPaddingHorizontal = token.padding - 1;
  const radioDisabledButtonCheckedBg = token.colorBgComponentDisabledActive;
  const radioDisabledButtonCheckedColor = token.colorTextDisabled;
  const radioWrapperMarginRight = token.margin / 2;

  return {
    ...token,

    radioDuration,
    radioFocusShadow,
    radioButtonFocusShadow,
    radioSize,
    radioTop,
    radioBorderWidth,
    radioDotSize,
    radioDotColor,
    radioDotDisabledColor,
    radioSolidCheckedColor,
    radioButtonBg,
    radioButtonCheckedBg,
    radioButtonColor,
    radioButtonHoverColor,
    radioButtonActiveColor,
    radioButtonPaddingHorizontal,
    radioDisabledButtonCheckedBg,
    radioDisabledButtonCheckedColor,
    radioWrapperMarginRight,
  };
}

// ============================== Styles ==============================
const antRadioEffect = new Keyframes('antRadioEffect', {
  '0%': { transform: 'scale(1)', opacity: 0.5 },
  '100%': { transform: 'scale(1.6)', opacity: 0 },
});

// styles from RadioGroup only
function getGroupRadioStyle(
  prefixCls: string,
  antPrefix: string,
  token: DerivativeToken,
): CSSInterpolation {
  const groupPrefixCls = `${prefixCls}-group`;

  return {
    [`.${groupPrefixCls}`]: {
      ...resetComponent(token),
      display: 'inline-block',
      fontSize: 0,

      // RTL
      '&&-rtl': {
        direction: 'rtl',
      },

      [`.${antPrefix}-badge .${antPrefix}-badge-count`]: {
        zIndex: 1,
      },

      [`> .${antPrefix}-badge:not(:first-child) > .${prefixCls}-button-wrapper`]: {
        borderLeft: 'none',
      },
    },
  };
}

// Styles from radio-wrapper
function getRadioBasicStyle(
  prefixCls: string,
  hashId: string,
  token: RadioToken,
): CSSInterpolation {
  const radioInnerPrefixCls = `${prefixCls}-inner`;

  return {
    [`.${prefixCls}-wrapper`]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'baseline',
      marginInlineStart: 0,
      marginInlineEnd: token.radioWrapperMarginRight,
      cursor: 'pointer',

      // RTL
      '&&-rtl': {
        direction: 'rtl',
      },

      '&-disabled': {
        cursor: 'not-allowed',
      },

      '&::after': {
        display: 'inline-block',
        width: 0,
        overflow: 'hidden',
        content: '"\\a0"',
      },

      // hashId 在 wrapper 上，只能铺平
      [`.${prefixCls}-checked::after`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: `1px solid ${token.radioDotColor}`,
        borderRadius: '50%',
        visibility: 'hidden',
        animation: `${antRadioEffect.getName(hashId)} 0.36s ease-in-out`,
        animationFillMode: 'both',
        content: '""',
      },

      [`.${prefixCls}`]: {
        ...resetComponent(token),
        position: 'relative',
        top: token.radioTop,
        display: 'inline-block',
        outline: 'none',
        cursor: 'pointer',
      },

      [`.${prefixCls}-wrapper:hover &,
              &:hover .${radioInnerPrefixCls},
              &-input:focus + .${radioInnerPrefixCls}`]: {
        borderColor: token.radioDotColor,
      },

      [`.${prefixCls}-input:focus + .${radioInnerPrefixCls}`]: {
        boxShadow: token.radioFocusShadow,
      },

      [`.${prefixCls}:hover::after, .${prefixCls}-wrapper:hover &::after`]: {
        visibility: 'visible',
      },

      [`.${prefixCls}-inner`]: {
        '&::after': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'block',
          width: token.radioSize,
          height: token.radioSize,
          marginTop: token.radioSize / -2,
          marginLeft: token.radioSize / -2,
          backgroundColor: token.radioDotColor,
          borderTop: 0,
          borderLeft: 0,
          borderRadius: token.radioSize,
          transform: 'scale(0)',
          opacity: 0,
          transition: `all ${token.radioDuration} ${token.motionEaseInOutCirc}`,
          content: '""',
        },

        position: 'relative',
        top: 0,
        left: 0,
        display: 'block',
        width: token.radioSize,
        height: token.radioSize,
        backgroundColor: token.radioButtonBg,
        borderColor: token.colorBorder,
        borderStyle: 'solid',
        borderWidth: token.radioBorderWidth,
        borderRadius: '50%',
        transition: `all ${token.radioDuration}`,
      },

      [`.${prefixCls}-input`]: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        cursor: 'pointer',
        opacity: 0,
      },

      // 选中状态
      [`.${prefixCls}-checked`]: {
        [`.${radioInnerPrefixCls}`]: {
          borderColor: token.radioDotColor,

          '&::after': {
            transform: `scale(${token.radioDotSize / token.radioSize})`,
            opacity: 1,
            transition: `all ${token.radioDuration} ${token.motionEaseInOutCirc}`,
          },
        },
      },

      [`.${prefixCls}-disabled`]: {
        cursor: 'not-allowed',

        [`.${radioInnerPrefixCls}`]: {
          backgroundColor: token.colorBgComponentDisabled,
          borderColor: `${token.colorBorder} !important`,
          cursor: 'not-allowed',

          '&::after': {
            backgroundColor: token.radioDotDisabledColor,
          },
        },

        '&-input': {
          cursor: 'not-allowed',
        },

        [`.${prefixCls}-disabled + span`]: {
          color: token.colorTextDisabled,
          cursor: 'not-allowed',
        },
      },

      [`span.${prefixCls} + *`]: {
        paddingRight: token.paddingSM,
        paddingLeft: token.paddingSM,
      },
    },
  };
}

// Styles from radio-button
function getRadioButtonStyle(prefixCls: string, token: RadioToken): CSSInterpolation {
  return {
    [`.${prefixCls}-button-wrapper`]: {
      position: 'relative',
      display: 'inline-block',
      height: token.controlHeight,
      margin: 0,
      padding: `0 ${token.radioButtonPaddingHorizontal}px`,
      color: token.radioButtonColor,
      fontSize: token.fontSize,
      lineHeight: `${token.controlHeight - 2}px`,
      background: token.radioButtonBg,
      border: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderTopWidth: token.controlLineWidth + 0.02,
      borderLeftWidth: 0,
      cursor: 'pointer',
      transition: `color ${token.radioDuration}, background ${token.radioDuration}, border-color ${token.radioDuration}, box-shadow ${token.radioDuration}`,

      a: {
        color: token.radioButtonColor,
      },

      [`> .${prefixCls}-button`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      },

      [`.${prefixCls}-group-large &`]: {
        height: token.controlHeightLG,
        fontSize: token.fontSizeLG,
        lineHeight: `${token.controlHeightLG - 2}px`,
      },

      [`.${prefixCls}-group-small &`]: {
        height: token.controlHeightSM,
        padding: `0 ${token.paddingXS - token.controlLineWidth}px`,
        lineHeight: `${token.controlHeightSM - 2}px`,
      },

      '&:not(:first-child)': {
        '&::before': {
          position: 'absolute',
          top: token.controlLineWidth * -1,
          left: -1,
          display: 'block',
          boxSizing: 'content-box',
          width: 1,
          height: '100%',
          padding: `${token.controlLineWidth} 0`,
          backgroundColor: token.colorBorder,
          transition: `background-color ${token.radioDuration}`,
          content: '',
        },
      },

      '&:first-child': {
        borderLeft: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        borderRadius: `${token.controlRadius}px 0 0 ${token.controlRadius}px`,
      },

      '&:last-child': {
        borderRadius: `0 ${token.controlRadius}px ${token.controlRadius}px 0`,
      },

      '&:first-child:last-child': {
        borderRadius: token.controlRadius,
      },

      '&:hover': {
        position: 'relative',
        color: token.radioDotColor,
      },

      '&:focus-within': {
        boxShadow: token.radioButtonFocusShadow,
      },

      [`.${prefixCls}-inner,
      input[type='checkbox'],
      input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: 'none',
      },

      '&-checked:not(&-disabled)': {
        zIndex: '1',
        color: token.radioDotColor,
        background: token.radioButtonCheckedBg,
        borderColor: token.radioDotColor,

        '&::before': {
          backgroundColor: token.radioDotColor,
        },

        '&:first-child': {
          borderColor: token.radioDotColor,
        },

        '&:hover': {
          color: token.radioButtonHoverColor,
          borderColor: token.radioButtonHoverColor,

          '&::before': {
            backgroundColor: token.radioButtonHoverColor,
          },
        },

        '&:active': {
          color: token.radioButtonActiveColor,
          borderColor: token.radioButtonActiveColor,

          '&::before': {
            backgroundColor: token.radioButtonActiveColor,
          },
        },

        '&:focus-within': {
          boxShadow: token.radioButtonFocusShadow,
        },
      },

      [`.${prefixCls}-group-solid &-checked:not(&-disabled)`]: {
        color: token.radioSolidCheckedColor,
        background: token.radioDotColor,
        borderColor: token.radioDotColor,

        '&:hover': {
          color: token.radioSolidCheckedColor,
          background: token.radioButtonHoverColor,
          borderColor: token.radioButtonHoverColor,
        },

        '&:active': {
          color: token.radioSolidCheckedColor,
          background: token.radioButtonActiveColor,
          borderColor: token.radioButtonActiveColor,
        },

        '&:focus-within': {
          boxShadow: token.radioButtonFocusShadow,
        },
      },

      '&-disabled': {
        color: token.colorTextDisabled,
        backgroundColor: token.colorBgComponentDisabled,
        borderColor: token.colorBorder,
        cursor: 'not-allowed',

        '&:first-child, &:hover': {
          color: token.colorTextDisabled,
          backgroundColor: token.colorBgComponentDisabled,
          borderColor: token.colorBorder,
        },

        '&:first-child': {
          borderLeftColor: token.colorBorder,
        },
      },

      '&-disabled&-checked': {
        color: token.radioDisabledButtonCheckedColor,
        backgroundColor: token.radioDisabledButtonCheckedBg,
        borderColor: token.colorBorder,
        boxShadow: 'none',
      },
    },
  };
}

// Styles from radio-button rtl
function getRadioButtonRTLStyle(prefixCls: string, token: RadioToken): CSSInterpolation {
  return {
    [`.${prefixCls}-button-wrapper`]: {
      '&&-rtl': {
        borderRightWidth: 0,
        borderLeftWidth: token.controlLineWidth,
      },

      '&:not(:first-child)': {
        '&::before': {
          [`.${prefixCls}-button-wrapper.${prefixCls}-button-wrapper-rtl&`]: {
            right: -1,
            left: 0,
          },
        },
      },

      '&:first-child': {
        [`.${prefixCls}-button-wrapper.${prefixCls}-button-wrapper-rtl&`]: {
          borderRight: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
          borderRadius: `0 ${token.controlRadius}px ${token.controlRadius}px 0`,
        },

        [`.${prefixCls}-button-wrapper-checked:not([class*=~" ${prefixCls}-button-wrapper-disabled"])&`]:
          {
            borderRightColor: token.radioButtonHoverColor,
          },
      },

      '&:last-child': {
        [`.${prefixCls}-button-wrapper.${prefixCls}-button-wrapper-rtl&`]: {
          borderRadius: `${token.controlRadius}px 0 0 ${token.controlRadius}px`,
        },
      },

      '&-disabled': {
        '&:first-child': {
          [`.${prefixCls}-button-wrapper.${prefixCls}-button-wrapper-rtl&`]: {
            borderRightColor: token.colorBorder,
          },
        },
      },
    },
  };
}

// ============================== Export ==============================
export function getStyle(
  prefixCls: string,
  hashId: string,
  antPrefix: string,
  token: RadioToken,
): CSSInterpolation {
  return [
    getGroupRadioStyle(prefixCls, antPrefix, token),
    getRadioBasicStyle(prefixCls, hashId, token),
    getRadioButtonStyle(prefixCls, token),
    getRadioButtonRTLStyle(prefixCls, token),
  ];
}

export default function useStyle(prefixCls: string, antPrefix: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();
  const radioToken = getRadioToken(token);
  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
      getStyle(prefixCls, hashId, antPrefix, radioToken),
    ),
    hashId,
  ];
}
