import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyImgHeight: number;
  emptyImgHeightSM: number;
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
        color: token.colorTextDisabled,

        [`${componentCls}-description`]: {
          color: token.colorTextDisabled,
        },

        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD,
        },
      },

      '&-small': {
        marginBlock: marginXS,
        color: token.colorTextDisabled,

        [`${componentCls}-image`]: {
          height: token.emptyImgHeightSM,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Empty', (token) => {
  const { componentCls, controlHeightLG } = token;

  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875,
  });

  return [genSharedEmptyStyle(emptyToken)];
});
