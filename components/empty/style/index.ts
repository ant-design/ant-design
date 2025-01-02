import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

/**
 * @desc Empty 组件的 Token
 * @descEN Token for Empty component
 */
interface EmptyToken extends FullToken<'Empty'> {
  /**
   * @desc 空状态图片类名
   * @descEN Class name for empty state image
   */
  emptyImgCls: string;
  /**
   * @desc 空状态图片高度
   * @descEN Height of empty state image
   */
  emptyImgHeight: number | string;
  /**
   * @desc 小号空状态图片高度
   * @descEN Height of small empty state image
   */
  emptyImgHeightSM: number | string;
  /**
   * @desc 中号空状态图片高度
   * @descEN Height of medium empty state image
   */
  emptyImgHeightMD: number | string;
}

// ============================== Shared ==============================
const genSharedEmptyStyle: GenerateStyle<EmptyToken> = (token): CSSObject => {
  const { componentCls, margin, marginXS, marginXL, fontSize, lineHeight } = token;

  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: 'center',

      // 原来 &-image 没有父子结构，现在为了外层承担我们的 hashId，改成父子结构
      [`${componentCls}-icon`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token.opacityImage,

        img: {
          height: '100%',
        },

        svg: {
          maxWidth: '100%',
          height: '100%',
          margin: 'auto',
        },
      },

      [`${componentCls}-description`]: {
        color: token.colorTextDescription,
      },

      // 原来 &-footer 没有父子结构，现在为了外层承担我们的 hashId，改成父子结构
      [`${componentCls}-footer`]: {
        marginTop: margin,
      },

      '&-normal': {
        marginBlock: marginXL,
        color: token.colorTextDescription,

        [`${componentCls}-description`]: {
          color: token.colorTextDescription,
        },

        [`${componentCls}-icon`]: {
          height: token.emptyImgHeightMD,
        },
      },

      '&-small': {
        marginBlock: marginXS,
        color: token.colorTextDescription,

        [`${componentCls}-icon`]: {
          height: token.emptyImgHeightSM,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('Empty', (token) => {
  const { componentCls, controlHeightLG, calc } = token;

  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: calc(controlHeightLG).mul(2.5).equal(),
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: calc(controlHeightLG).mul(0.875).equal(),
  });

  return [genSharedEmptyStyle(emptyToken)];
});
