// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  mergeToken,
  statisticToken,
} from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface EmptyToken extends DerivativeToken, ComponentToken {
  emptyCls: string;
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
  const { emptyCls } = token;

  return {
    [emptyCls]: {
      // FIX ME
      margin: '0 8px',
      // @empty-font-size
      fontSize: token.emptyFontSize,
      // '@line-height-base'
      lineHeight: token.lineHeight,
      textAlign: 'center',

      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${emptyCls}-image`]: {
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
      [`${emptyCls}-footer`]: {
        // FIX ME
        marginTop: '16px',
      },

      '&-normal': {
        // FIX ME
        margin: '32px 0',
        // '@disabled-color'
        color: token.colorTextDisabled,

        [`${emptyCls}-image`]: {
          // FIX ME
          height: '40px',
        },
      },

      '&-small': {
        // FIX ME
        margin: '8px 0',
        color: '@disabled-color',

        [`${emptyCls}-image`]: {
          // FIX ME
          height: '35px',
        },
      },

      ...genEmptyImgStyle(token),
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { token: proxyToken, flush } = statisticToken(token);
      const { Empty } = proxyToken;

      const emptyFontSize = token.fontSizeBase;

      const emptyToken = mergeToken<EmptyToken>(proxyToken, {
        emptyCls: `.${prefixCls}`,
        emptyImgCls: `.${prefixCls}-img`,

        emptyFontSize,
        white: '#fff',

        ...Empty,
      });

      const style = [genSharedEmptyStyle(emptyToken), genEmptyImgStyle(emptyToken)];
      flush('Empty');
      return style;
    }),
    hashId,
  ];
}
