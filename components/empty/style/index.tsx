// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyImgHeight: number;
  emptyImgHeightSM: number;
  emptyImgHeightMD: number;
}

const genEmptyImgStyle = (token: EmptyToken): CSSObject => {
  const { emptyImgCls } = token;
  const emptyImgDefaultCls = `${emptyImgCls}-default`;
  const emptyImgSimpleCls = `${emptyImgCls}-simple`;

  return {
    // FIXME: have not theme
    // just light, lost dark theme
    [emptyImgDefaultCls]: {
      '&-ellipse': {
        fill: '#f5f5f5',
        fillOpacity: '0.8',
      },

      '&-path': {
        '&-1': {
          fill: '#aeb8c2',
        },

        '&-2': {
          fill: "url('#linearGradient-1')",
        },

        '&-3': {
          fill: '#f5f5f7',
        },

        '&-4': {
          fill: '#dce0e6',
        },

        '&-5': {
          fill: '#dce0e6',
        },
      },

      '&-g': {
        fill: '#ffffff',
      },
    },
    [emptyImgSimpleCls]: {
      '&-ellipse': {
        fill: '#f5f5f5',
      },

      '&-g': {
        stroke: '#d9d9d9',
      },

      '&-path': {
        fill: '#fafafa',
      },
    },
  };
};

// ============================== Shared ==============================
const genSharedEmptyStyle: GenerateStyle<EmptyToken> = (token): CSSObject => {
  const { componentCls, margin, marginXS, marginXL, fontSizeBase, lineHeight } = token;

  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize: fontSizeBase,
      lineHeight,
      textAlign: 'center',

      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,

        img: {
          height: '100%',
        },

        svg: {
          height: '100%',
          margin: 'auto',
        },
      },

      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin,
      },

      '&-normal': {
        marginBlock: marginXL,
        color: token.colorTextDisabled,

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

      ...genEmptyImgStyle(token),
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Empty', token => {
  const { componentCls, controlHeightLG } = token;

  const emptyToken: EmptyToken = mergeToken<EmptyToken>(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875,
  });

  return [genSharedEmptyStyle(emptyToken), genEmptyImgStyle(emptyToken)];
});
