import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import type { InputToken } from './token';
import { initComponentToken, initInputToken } from './token';

const genSearchStyle: GenerateStyle<InputToken, CSSObject> = (token) => {
  const { componentCls, antCls, calc, max } = token;

  const btnCls = `${componentCls}-btn`;
  const [varName, varRef] = genCssVar(antCls, 'input-search');
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
      [varName('btn-height')]: unit(token.controlHeight),
      width: '100%',

      // =========================== Button ===========================
      [btnCls]: {
        height: varRef('btn-height'),

        [`&${antCls}-btn-icon-only`]: {
          width: varRef('btn-height'),
        },

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

      [`&${componentCls}-large`]: {
        [varName('btn-height')]: unit(token.controlHeightLG),
      },

      [`&${componentCls}-small`]: {
        [varName('btn-height')]: unit(token.controlHeightSM),
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
