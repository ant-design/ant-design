// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends FullToken<'Empty'> {
  emptyImgCls: string;
  emptyFontSize: number;
  white: string;
}

const genEmptyImgStyle = (token: EmptyToken): CSSObject => {
  const { emptyImgCls } = token;
  const emptyImgDefaultCls = `${emptyImgCls}-default`;
  const emptyImgSimpleCls = `${emptyImgCls}-simple`;

  return {
    // FIX ME have not theme
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
        // FIX ME @white
        fill: token.white,
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
  const { componentCls } = token;

  return {
    [componentCls]: {
      // FIX ME
      margin: '0 8px',
      // @empty-font-size
      fontSize: token.emptyFontSize,
      // '@line-height-base'
      lineHeight: token.lineHeight,
      textAlign: 'center',

      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        // FIX ME
        height: '100px',
        // FIX ME
        marginBottom: '8px',

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
        // FIX ME
        marginTop: '16px',
      },

      '&-normal': {
        // FIX ME
        margin: '32px 0',
        // '@disabled-color'
        color: token.colorTextDisabled,

        [`${componentCls}-image`]: {
          // FIX ME
          height: '40px',
        },
      },

      '&-small': {
        // FIX ME
        margin: '8px 0',
        color: '@disabled-color',

        [`${componentCls}-image`]: {
          // FIX ME
          height: '35px',
        },
      },

      ...genEmptyImgStyle(token),
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Empty', token => {
  const emptyToken: EmptyToken = {
    ...token,
    emptyImgCls: `${token.componentCls}-img`,
    emptyFontSize: token.fontSizeBase,
    white: '#fff',
  };
  return [genSharedEmptyStyle(emptyToken), genEmptyImgStyle(emptyToken)];
});
