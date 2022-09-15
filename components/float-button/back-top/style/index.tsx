import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../../theme';
import { genComponentStyleHook, mergeToken } from '../../../theme';
import { resetComponent } from '../../../style';
import { floatButtonPrefixCls } from '../..';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
}

type BackTopToken = FullToken<'FloatButtonBackTop'> & {
  backTopBackground: string;
  backTopColor: string;
  backTopHoverBackground: string;
  backTopFontSize: number;
  backTopSize: number;

  // Position
  backTopBlockEnd: number;
  backTopInlineEnd: number;
};

// ============================== Group ==============================
const floatButtonGroupStyle: GenerateStyle<BackTopToken, CSSObject> = token => {
  const { componentCls } = token;
  const groupPrefixCls = `${floatButtonPrefixCls}-group`;
  return {
    [groupPrefixCls]: {
      ...resetComponent(token),
      [componentCls]: {
        position: 'static',
      },
    },
  };
};

// ============================== Shared ==============================
const genSharedBackTopStyle: GenerateStyle<BackTopToken, CSSObject> = token => {
  const { componentCls, backTopFontSize, backTopSize } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'fixed',
      insetInlineEnd: token.backTopInlineEnd,
      insetBlockEnd: token.backTopBlockEnd,
      zIndex: 20,
      width: 40,
      height: 40,
      cursor: 'pointer',

      '&:empty': {
        display: 'none',
      },

      [`${componentCls}-content`]: {
        width: backTopSize,
        height: backTopSize,
        overflow: 'hidden',
        color: token.backTopColor,
        textAlign: 'center',
        backgroundColor: token.backTopBackground,
        borderRadius: backTopSize,
        transition: `all ${token.motionDurationFast}`,

        '&:hover': {
          backgroundColor: token.backTopHoverBackground,
          transition: `all ${token.motionDurationFast}`,
        },
      },

      // change to .backtop .backtop-icon
      [`${componentCls}-icon`]: {
        fontSize: backTopFontSize,
        lineHeight: `${backTopSize}px`,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook<'FloatButtonBackTop'>('FloatButtonBackTop', token => {
  const {
    fontSizeHeading3,
    colorTextDescription,
    colorTextLightSolid,
    colorText,
    controlHeightLG,
    marginXXL,
    marginLG,
  } = token;

  const backTopToken = mergeToken<BackTopToken>(token, {
    backTopBackground: colorTextDescription,
    backTopColor: colorTextLightSolid,
    backTopHoverBackground: colorText,
    backTopFontSize: fontSizeHeading3,
    backTopSize: controlHeightLG,

    backTopBlockEnd: marginXXL,
    backTopInlineEnd: marginLG,
  });
  return [genSharedBackTopStyle(backTopToken), floatButtonGroupStyle(backTopToken)];
});
