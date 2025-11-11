import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

const genSearchStyle: GenerateStyle<FullToken<'Input'>> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      width: '100%',
    },
  };
};

export default genStyleHooks(['Input', 'Search'], (token) => {
  return [genSearchStyle(token)];
});
