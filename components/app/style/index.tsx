import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook } from '../../theme';

export type ComponentToken = {};

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
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('App', (token) => [genBaseStyle(token)]);
