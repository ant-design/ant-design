import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSearchStyle: GenerateStyle<FullToken<'Input'>> = (token) => {
  const { componentCls } = token;

  const btnCls = `${componentCls}-btn`;

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
    },
  };
};

export default genStyleHooks(['Input', 'Search'], (token) => {
  return [genSearchStyle(token)];
});
