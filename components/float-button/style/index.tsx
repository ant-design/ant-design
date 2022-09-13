import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
import { resetComponent, resetIcon } from '../../style';

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
  floatButtonInlineEndMD: number;
  floatButtonInlineEndXS: number;
};

const floatButtonGroupStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const { componentCls } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      display: 'block',
      border: 'none',
      position: 'fixed',
      width: token.floatButtonSize,
      minHeight: token.floatButtonSize,
      height: 'auto',
      '&&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Shared ==============================
const sharedFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const { componentCls, floatButtonFontSize, floatButtonSize, zIndexPopup } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'block',
      border: 'none',
      position: 'fixed',
      cursor: 'pointer',
      overflow: 'hidden',
      zIndex: zIndexPopup + 20,
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInlineEnd,
      insetBlockEnd: token.floatButtonBlockEnd,
      boxShadow: token.boxShadowSecondary,
      transition: `all ${token.motionDurationFast}`,
      '&:empty': {
        display: 'none',
      },
      [`${componentCls}-content`]: {
        width: floatButtonSize,
        overflow: 'hidden',
        textAlign: 'center',
      },
      [`${componentCls}-icon`]: {
        ...resetIcon(),
        fontSize: floatButtonFontSize,
        lineHeight: 1,
      },
      [`${componentCls}-default-icon`]: {
        color: token.colorText,
      },
      [`${componentCls}-primary-icon`]: {
        color: token.colorTextLightSolid,
      },
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: '50%',
    },
    [`${componentCls}-square`]: {
      height: 'auto',
      minHeight: floatButtonSize,
      borderRadius: token.radiusBase,
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.colorBgContainer,
      '&:hover': {
        backgroundColor: token.colorFillContent,
      },
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      '&:hover': {
        backgroundColor: token.colorPrimaryHover,
      },
    },
  };
};

const mediaFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`@media (max-width: ${token.screenMD}px)`]: {
      [componentCls]: {
        insetInlineEnd: token.floatButtonInlineEndMD,
      },
    },
    [`@media (max-width: ${token.screenXS}px)`]: {
      [componentCls]: {
        insetInlineEnd: token.floatButtonInlineEndXS,
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
    marginTmp,
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
    floatButtonInlineEndMD: controlHeightLG * 1.5,
    floatButtonInlineEndXS: marginTmp,
  });
  return [
    floatButtonGroupStyle(floatButtonToken),
    sharedFloatButtonStyle(floatButtonToken),
    mediaFloatButtonStyle(floatButtonToken),
  ];
});
