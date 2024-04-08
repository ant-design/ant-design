import { genStyleHooks, mergeToken, type GenerateStyle } from '../../theme/internal';
import { initComponentToken, initInputToken, type InputToken } from './token';

// =============================== OTP ================================
const genOTPStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingXS } = token;

  return {
    [`${componentCls}`]: {
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      columnGap: paddingXS,

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

    return [genOTPStyle(inputToken)];
  },
  initComponentToken,
);
