import type { CSSObject } from '@ant-design/cssinjs';
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

  // Position
  floatButtonBlockEnd: number;
  floatButtonInlineEnd: number;
  floatButtonInlineEndMD: number;
  floatButtonInlineEndXS: number;
};

// ============================== Shared ==============================
const sharedFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = (token): CSSObject => {
  const { componentCls, floatButtonFontSize, floatButtonSize, zIndexPopup } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      // position: 'fixed',
      insetInlineEnd: token.floatButtonInlineEnd,
      insetBlockEnd: token.floatButtonBlockEnd,
      zIndex: zIndexPopup,
      width: 40,
      height: 40,
      cursor: 'pointer',
      overflow: 'hidden',
      boxShadow: token.boxShadowSecondary,
      '&:empty': {
        display: 'none',
      },
      [`${componentCls}-circle`]: {
        borderRadius: token.radiusBase * 20,
      },
      [`${componentCls}-square`]: {
        height: 'auto',
        minHeight: floatButtonSize,
        borderRadius: token.radiusBase,
      },
      [`${componentCls}-default`]: {
        backgroundColor: token.colorTextLightSolid,
      },
      [`${componentCls}-primary`]: {
        backgroundColor: token.colorPrimaryHover,
      },
      [`${componentCls}-content`]: {
        width: floatButtonSize,
        overflow: 'hidden',
        // color: token.floatButtonColor,
        textAlign: 'center',
        transition: `all ${token.motionDurationSlow}`,
        '&:hover': {
          backgroundColor: token.floatButtonHoverBackgroundColor,
        },
      },
      [`${componentCls}-icon`]: {
        fontSize: floatButtonFontSize,
        lineHeight: `${floatButtonSize}px`,
      },
      [`${componentCls}-default-icon`]: {
        color: token.colorTextBase,
      },
      [`${componentCls}-primary-icon`]: {
        color: token.colorTextLightSolid,
      },
    },
    [`${componentCls}-circle`]: {
      borderRadius: token.radiusBase * 20,
    },
    [`${componentCls}-square`]: {
      height: 'auto',
      minHeight: floatButtonSize,
      borderRadius: token.radiusBase,
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.colorTextLightSolid,
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimaryHover,
    },
  };
};

const mediaFloatButtonStyle: GenerateStyle<FloatButtonToken> = (token): CSSObject => {
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
export default genComponentStyleHook<'FloatButton'>(
  'FloatButton',
  token => {
    const { fontSizeHeading3, colorTextLightSolid, colorText, controlHeightLG } = token;

    const floatButtonToken = mergeToken<FloatButtonToken>(token, {
      floatButtonBackgroundColor: colorTextLightSolid,
      floatButtonColor: colorTextLightSolid,
      floatButtonHoverBackgroundColor: colorText,
      floatButtonFontSize: fontSizeHeading3,
      floatButtonSize: controlHeightLG,

      floatButtonBlockEnd: controlHeightLG * 1.25,
      floatButtonInlineEnd: controlHeightLG * 2.5,
      floatButtonInlineEndMD: controlHeightLG * 1.5,
      floatButtonInlineEndXS: controlHeightLG * 0.5,
    });
    return [sharedFloatButtonStyle(floatButtonToken), mediaFloatButtonStyle(floatButtonToken)];
  },
  token => ({
    zIndexPopup: token.zIndexBase + 20,
  }),
);
