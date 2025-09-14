import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

// =============================== OTP ================================
const genOTPStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingXS } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      columnGap: paddingXS,

      [`${componentCls}-input-wrapper`]: {
        position: 'relative',
        [`${componentCls}-mask-icon`]: {
          position: 'absolute',
          zIndex: '1',
          top: '50%',
          right: '50%',
          transform: 'translate(50%, -50%)',
          pointerEvents: 'none',
        },
        [`${componentCls}-mask-input`]: {
          color: 'transparent',
          caretColor: token.colorText,
        },
        [`${componentCls}-mask-input[type=number]::-webkit-inner-spin-button`]: {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        [`${componentCls}-mask-input[type=number]`]: {
          '-moz-appearance': 'textfield',
        },
      },

      '&-rtl': {
        direction: 'rtl',
      },

      [`${componentCls}-input`]: {
        textAlign: 'center',
        paddingInline: token.paddingXXS,
      },

      // ================= Size =================
      [`&${componentCls}-sm ${componentCls}-input`]: {
        paddingInline: token.calc(token.paddingXXS).div(2).equal(),
      },

      [`&${componentCls}-lg ${componentCls}-input`]: {
        paddingInline: token.paddingXS,
      },
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  ['Input', 'OTP'],
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token));
    return genOTPStyle(inputToken);
  },
  initComponentToken,
);
