import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../../theme';
import { genComponentStyleHook, mergeToken } from '../../../theme';
import { resetComponent } from '../../../style';

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
  backTopInlineEndMD: number;
  backTopInlineEndXS: number;
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
  } = token;

  const backTopToken = mergeToken<BackTopToken>(token, {
    backTopBackground: colorTextDescription,
    backTopColor: colorTextLightSolid,
    backTopHoverBackground: colorText,
    backTopFontSize: fontSizeHeading3,
    backTopSize: controlHeightLG,

    backTopBlockEnd: controlHeightLG * 1.25,
    backTopInlineEnd: controlHeightLG * 2.5,
    backTopInlineEndMD: controlHeightLG * 1.5,
    backTopInlineEndXS: controlHeightLG * 0.5,
  });
  return [genSharedBackTopStyle(backTopToken)];
});
