import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyImgHeight: number | string;
  emptyImgHeightSM: number | string;
  emptyImgHeightMD: number;
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

      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
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
        color: token.colorText,
      },

      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin,
      },

      '&-normal': {
        marginBlock: marginXL,
        color: token.colorTextDescription,

        [`${componentCls}-description`]: {
          color: token.colorTextDescription,
        },

        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD,
        },
      },

      '&-small': {
        marginBlock: marginXS,
        color: token.colorTextDescription,

        [`${componentCls}-image`]: {
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
