import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSearchStyle: GenerateStyle<FullToken<'Input'>, CSSObject> = (token) => {
  const { componentCls, calc, max } = token;

  const btnCls = `${componentCls}-btn`;
  const smallButtonHeight = max(
    token.controlHeightSM,
    calc(token.fontSize).mul(token.lineHeight).add(calc(token.lineWidth).mul(2).equal()).equal(),
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
        height: smallButtonHeight,

        [`&${token.antCls}-btn-icon-only`]: {
          width: smallButtonHeight,
        },
      },
    },
  };
};

export default genStyleHooks(['Input', 'Search'], genSearchStyle);
