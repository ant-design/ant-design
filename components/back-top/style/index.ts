import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  zIndexPopup: number;
}

type BackTopToken = FullToken<'BackTop'> & {
  backTopBackground: string;
  backTopColor: string;
  backTopHoverBackground: string;
  backTopFontSize: number;
  backTopSize: number;

  // Position
  backTopBlockEnd: number | string;
  backTopInlineEnd: number | string;
  backTopInlineEndMD: number | string;
  backTopInlineEndXS: number | string;
};

// ============================== Shared ==============================
const genSharedBackTopStyle: GenerateStyle<BackTopToken, CSSObject> = (token): CSSObject => {
  const { componentCls, backTopFontSize, backTopSize, zIndexPopup } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'fixed',
      insetInlineEnd: token.backTopInlineEnd,
      insetBlockEnd: token.backTopBlockEnd,
      zIndex: zIndexPopup,
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
        transition: `all ${token.motionDurationMid}`,

        '&:hover': {
          backgroundColor: token.backTopHoverBackground,
          transition: `all ${token.motionDurationMid}`,
        },
      },

      // change to .backtop .backtop-icon
      [`${componentCls}-icon`]: {
        fontSize: backTopFontSize,
        lineHeight: unit(backTopSize),
      },
    },
  };
};

const genMediaBackTopStyle: GenerateStyle<BackTopToken> = (token): CSSObject => {
  const { componentCls, screenMD, screenXS, backTopInlineEndMD, backTopInlineEndXS } = token;
  return {
    [`@media (max-width: ${unit(screenMD)})`]: {
      [componentCls]: {
        insetInlineEnd: backTopInlineEndMD,
      },
    },
    [`@media (max-width: ${unit(screenXS)})`]: {
      [componentCls]: {
        insetInlineEnd: backTopInlineEndXS,
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'BackTop'> = (token) => ({
  zIndexPopup: token.zIndexBase + 10,
});

// ============================== Export ==============================
export default genStyleHooks(
  'BackTop',
  (token) => {
    const {
      fontSizeHeading3,
      colorTextDescription,
      colorTextLightSolid,
      colorText,
      controlHeightLG,
      calc,
    } = token;
    const backTopToken = mergeToken<BackTopToken>(token, {
      backTopBackground: colorTextDescription,
      backTopColor: colorTextLightSolid,
      backTopHoverBackground: colorText,
      backTopFontSize: fontSizeHeading3,
      backTopSize: controlHeightLG,
      backTopBlockEnd: calc(controlHeightLG).mul(1.25).equal(),
      backTopInlineEnd: calc(controlHeightLG).mul(2.5).equal(),
      backTopInlineEndMD: calc(controlHeightLG).mul(1.5).equal(),
      backTopInlineEndXS: calc(controlHeightLG).mul(0.5).equal(),
    });
    return [genSharedBackTopStyle(backTopToken), genMediaBackTopStyle(backTopToken)];
  },
  prepareComponentToken,
);
