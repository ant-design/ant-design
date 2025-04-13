import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  /**
   * @desc 弹出层的 z-index
   * @descEN z-index of popup
   */
  zIndexPopup: number;
}

type BackTopToken = FullToken<'BackTop'> & {
  /**
   * @desc BackTop 背景颜色
   * @descEN Background color of BackTop
   */
  backTopBackground: string;
  /**
   * @desc BackTop 文字颜色
   * @descEN Text color of BackTop
   */
  backTopColor: string;
  /**
   * @desc BackTop 悬停背景颜色
   * @descEN Hover background color of BackTop
   */
  backTopHoverBackground: string;
  /**
   * @desc BackTop 字体大小
   * @descEN Font size of BackTop
   */
  backTopFontSize: number;
  /**
   * @desc BackTop 尺寸
   * @descEN Size of BackTop
   */
  backTopSize: number;

  // Position
  /**
   * @desc BackTop 底部偏移量
   * @descEN Bottom offset of BackTop
   */
  backTopBlockEnd: number | string;
  /**
   * @desc BackTop 右侧偏移量
   * @descEN Right offset of BackTop
   */
  backTopInlineEnd: number | string;
  /**
   * @desc BackTop 中等屏幕右侧偏移量
   * @descEN Right offset of BackTop on medium screens
   */
  backTopInlineEndMD: number | string;
  /**
   * @desc BackTop 小屏幕右侧偏移量
   * @descEN Right offset of BackTop on small screens
   */
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
