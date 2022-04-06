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
}

// ============================== Shared ==============================
const genSharedBackTopStyle: GenerateStyle<BackTopToken> = (token): CSSObject => {
  const { backTopCls } = token;

  return {
    [backTopCls]: {
      ...resetComponent(token),

      position: 'fixed',
      // FIXME
      right: '100px',
      // FIXME
      bottom: '50px',
      // FIX ME @zindex-back-top
      zIndex: token.zIndexPopup,
      width: '40px',
      height: '40px',
      cursor: 'pointer',

      '&:empty': {
        display: 'none',
      },

      '&-rtl': {
        right: 'auto',
        // FIXME
        left: '100px',
        direction: 'rtl',
      },

      [`${backTopCls}-content`]: {
        width: '40px',
        height: '40px',
        overflow: 'hidden',
        // FIXME @back-top-color
        color: token.backTopColor,
        textAlign: 'center',
        // FIXME @back-top-bg
        backgroundColor: token.backTopBackground,
        // FIXME
        borderRadius: '20px',
        transition: 'all 0.3s',

        '&:hover': {
          // FIX ME @back-top-hover-bg
          backgroundColor: token.backTopHoverBackground,
          transition: 'all 0.3s',
        },
      },

      '&-icon': {
        // FIXME
        fontSize: '24px',
        // FIXME
        lineHeight: '40px',
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

      const backTopToken: BackTopToken = {
        ...token,

        backTopCls: `.${prefixCls}`,

        backTopBackground,
        backTopColor,
        backTopHoverBackground,

        ...BackTop,
      };

      return [genSharedBackTopStyle(backTopToken)];
    }),
    hashId,
  ];
}
