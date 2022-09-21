import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent } from '../../style';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
}

type FloatButtonToken = FullToken<'FloatButton'> & {
  floatButtonColor: string;
  floatButtonBackgroundColor: string;
  floatButtonHoverBackgroundColor: string;
  floatButtonFontSize: number;
  floatButtonSize: number;
  floatButtonIconSize: number;

  // Position
  floatButtonBlockEnd: number;
  floatButtonInlineEnd: number;
};

// ============================== Group ==============================
const floatButtonGroupStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const { componentCls, floatButtonSize, margin, radiusBase, motionDurationSlow } = token;
  const groupPrefixCls = `${componentCls}-group`;
  const moveDownIn = new Keyframes('antMoveDownIn', {
    '0%': {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },

    '100%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },
  });
  const moveDownOut = new Keyframes('antMoveDownOut', {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: '0 0',
      opacity: 1,
    },

    '100%': {
      transform: `translate3d(0, ${floatButtonSize}px, 0)`,
      transformOrigin: '0 0',
      opacity: 0,
    },
  });
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      display: 'block',
      border: 'none',
      position: 'fixed',
      width: floatButtonSize,
      height: 'auto',
      boxShadow: 'none',
      minHeight: floatButtonSize,
      insetInlineEnd: token.floatButtonInlineEnd,
      insetBlockEnd: token.floatButtonBlockEnd,
      backgroundColor: token.colorBgContainer,
      borderRadius: token.radiusSM,
      [`${groupPrefixCls}-wrap`]: {
        display: 'block',
        marginBottom: margin,
      },
      '&&-rtl': {
        direction: 'rtl',
      },
      [componentCls]: {
        position: 'static',
      },
      [`${componentCls}-square-tigger`]: {
        borderRadius: `${radiusBase}px !important`,
      },
    },
    [`${groupPrefixCls}-circle`]: {
      [`${componentCls}-circle:not(:last-child)`]: {
        marginBottom: token.margin,
        [`${componentCls}-body`]: {
          width: floatButtonSize,
          height: floatButtonSize,
        },
      },
    },
    [`${groupPrefixCls}-square`]: {
      [`${componentCls}-square`]: {
        borderRadius: 0,
        padding: token.paddingXXS,
        '&:first-child': {
          borderRadius: `${radiusBase}px ${radiusBase}px 0 0`,
        },
        '&:last-child': {
          borderRadius: `0 0 ${radiusBase}px ${radiusBase}px`,
        },
        '&:not(:last-child)': {
          borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
        [`${componentCls}-body`]: {
          width: floatButtonSize - token.paddingXXS * 2,
          height: floatButtonSize - token.paddingXXS * 2,
        },
      },
      [`${groupPrefixCls}-wrap`]: {
        display: 'block',
        borderRadius: radiusBase,
        boxShadow: token.boxShadowSecondary,
        overflow: 'hidden',
        [`${componentCls}-square`]: {
          boxShadow: 'none',
          marginTop: 0,
          borderRadius: 0,
        },
      },
    },

    [`${groupPrefixCls}-wrap-enter,${groupPrefixCls}-wrap-enter-active`]: {
      animationName: moveDownIn,
      animationDuration: motionDurationSlow,
    },
    [`${groupPrefixCls}-wrap-leave`]: {
      animationName: moveDownOut,
      animationDuration: motionDurationSlow,
    },

    [`${groupPrefixCls}-circle-shadow`]: {
      boxShadow: 'none',
    },
    [`${groupPrefixCls}-square-shadow`]: {
      boxShadow: token.boxShadowSecondary,
      [`${componentCls}-square`]: {
        boxShadow: 'none',
      },
    },
  };
};

// ============================== Shared ==============================
const sharedFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const { componentCls, floatButtonIconSize, floatButtonSize } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      border: 'none',
      position: 'fixed',
      cursor: 'pointer',
      overflow: 'hidden',
      zIndex: 20,
      display: 'block',
      justifyContent: 'center',
      alignItems: 'center',
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInlineEnd,
      insetBlockEnd: token.floatButtonBlockEnd,
      boxShadow: token.boxShadowSecondary,
      '&:empty': {
        display: 'none',
      },
      [`${componentCls}-body`]: {
        width: floatButtonSize,
        height: floatButtonSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: `all ${token.motionDurationFast}`,
        [`${componentCls}-content`]: {
          overflow: 'hidden',
          textAlign: 'center',
        },
        [`${componentCls}-icon`]: {
          width: floatButtonIconSize,
          fontSize: floatButtonIconSize,
          lineHeight: 1,
        },
        [`${componentCls}-default-icon`]: {
          color: token.colorText,
        },
        [`${componentCls}-primary-icon`]: {
          color: token.colorTextLightSolid,
        },
      },
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: '50%',
      [`${componentCls}-body`]: {
        borderRadius: '50%',
      },
    },
    [`${componentCls}-square`]: {
      minHeight: floatButtonSize,
      borderRadius: token.radiusBase,
      [`${componentCls}-body`]: {
        borderRadius: token.radiusSM,
      },
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.colorBgContainer,
      transition: `background-color ${token.motionDurationFast}`,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorBgContainer,
        transition: `background-color ${token.motionDurationFast}`,
        '&:hover': {
          backgroundColor: token.colorFillContent,
          transition: `background-color ${token.motionDurationFast}`,
        },
      },
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorPrimary,
        transition: `background-color ${token.motionDurationFast}`,
        '&:hover': {
          backgroundColor: token.colorPrimaryHover,
          transition: `background-color ${token.motionDurationFast}`,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook<'FloatButton'>('FloatButton', token => {
  const {
    colorTextLightSolid,
    colorBgContainer,
    controlHeightLG,
    marginXXL,
    marginLG,
    fontSize,
    fontSizeHeading4,
    controlItemBgHover,
  } = token;
  const floatButtonToken = mergeToken<FloatButtonToken>(token, {
    floatButtonBackgroundColor: colorBgContainer,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: fontSizeHeading4,
    floatButtonSize: controlHeightLG,

    floatButtonBlockEnd: marginXXL,
    floatButtonInlineEnd: marginLG,
  });
  return [floatButtonGroupStyle(floatButtonToken), sharedFloatButtonStyle(floatButtonToken)];
});
