import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { clearFix, resetComponent } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { ComponentToken, InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

// =============================== OTP ================================
const genOTPStyle: GenerateStyle<InputToken> = (token) => {
  const { componentCls, paddingXS } = token;

  return {
    [`${componentCls}`]: {
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'nowrap',

      columnGap: paddingXS,

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
