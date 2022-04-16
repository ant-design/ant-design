// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  resetComponent,
  GenerateStyle,
} from '../../_util/theme';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {}

interface BackTopToken extends DerivativeToken, ComponentToken {
  backTopCls: string;

  backTopBackground: string;
  backTopColor: string;
  backTopHoverBackground: string;

  durationSlow: number;
}

// ============================== Shared ==============================
const genSharedBackTopStyle: GenerateStyle<BackTopToken> = (token): CSSObject => {
  const { backTopCls } = token;

  return {
    [backTopCls]: {
      ...resetComponent(token),

      position: 'fixed',
      // FIXME
      right: 100,
      // FIXME
      bottom: 50,
      // FIX ME @zindex-back-top
      zIndex: token.zIndexPopup,
      width: 40,
      height: 40,
      cursor: 'pointer',

      '&:empty': {
        display: 'none',
      },

      '&-rtl': {
        right: 'auto',
        // FIXME
        left: 100,
        direction: 'rtl',
      },

      [`${backTopCls}-content`]: {
        width: 40,
        height: 40,
        overflow: 'hidden',
        // FIXME @back-top-color
        color: token.backTopColor,
        textAlign: 'center',
        // FIXME @back-top-bg
        backgroundColor: token.backTopBackground,
        // FIXME
        borderRadius: 20,
        transition: `all ${token.durationSlow}s`,

        '&:hover': {
          // FIX ME @back-top-hover-bg
          backgroundColor: token.backTopHoverBackground,
          transition: `all ${token.durationSlow}s`,
        },
      },

      // change to .backtop .backtop-icon
      [`${backTopCls}-icon`]: {
        // FIXME
        fontSize: 24,
        // FIXME
        lineHeight: '40px',
      },
    },
  };
};

const genMediaBackTopStyle: GenerateStyle<BackTopToken> = (token): CSSObject => {
  const { backTopCls } = token;

  return {
    [`@media (max-width: ${token.screenMD}px)`]: {
      [backTopCls]: {
        marginInlineEnd: 60,
      },
    },

    [`@media (max-width: ${token.screenXS}px)`]: {
      [backTopCls]: {
        marginInlineEnd: 20,
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
      const { BackTop } = token;

      const backTopBackground = 'rgb(16, 136, 233)';
      const backTopColor = '#fff';
      const backTopHoverBackground = '#000000d9';

      const durationSlow = 3;

      const backTopToken: BackTopToken = {
        ...token,

        backTopCls: `.${prefixCls}`,

        backTopBackground,
        backTopColor,
        backTopHoverBackground,

        durationSlow,

        ...BackTop,
      };

      return [genSharedBackTopStyle(backTopToken), genMediaBackTopStyle(backTopToken)];
    }),
    hashId,
  ];
}
