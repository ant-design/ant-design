import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

interface AppToken extends FullToken<'App'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<AppToken> = (token) => {
  const { componentCls, colorText, fontSize, lineHeight, fontFamily } = token;
  return {
    [componentCls]: {
      color: colorText,
      fontSize,
      lineHeight,
      fontFamily,
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'App'> = () => ({});

// ============================== Export ==============================
export default genStyleHooks('App', genBaseStyle, prepareComponentToken);
