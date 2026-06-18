import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

const genSearchStyle: GenerateStyle<InputToken, CSSObject> = (token) => {
  const { componentCls, calc, max } = token;

  const btnCls = `${componentCls}-btn`;
  const inputFontSizeSM = token.inputFontSizeSM ?? token.fontSize;
  const smallButtonHeight = max(
    token.controlHeightSM,
    calc(inputFontSizeSM)
      .mul(token.lineHeight)
      .add(calc(token.paddingBlockSM).mul(2))
      .add(calc(token.lineWidth).mul(2))
      .equal(),
  );

  return {
    [componentCls]: {
      width: '100%',

      // =========================== Button ===========================
      [btnCls]: {
        '&-filled': {
          background: token.colorFillTertiary,

          '&:not(:disabled)': {
            '&:hover': {
              background: token.colorFillSecondary,
            },

            '&:active': {
              background: token.colorFill,
            },
          },
        },
      },

      [`&${componentCls}-small ${btnCls}`]: {
        minHeight: smallButtonHeight,

        [`&${token.antCls}-btn-icon-only`]: {
          minWidth: smallButtonHeight,
        },
      },
    },
  };
};

export default genStyleHooks(
  ['Input', 'Search'],
  (token) => {
    const inputToken = mergeToken<InputToken>(token, initInputToken(token));
    return genSearchStyle(inputToken);
  },
  initComponentToken,
);
