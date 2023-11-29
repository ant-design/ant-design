import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

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

export const prepareComponentToken: GetDefaultToken<'App'> = () => ({});

// ============================== Export ==============================
export const [useStyle, useCSSVar] = genStyleHooks<'App'>(
  'App',
  genBaseStyle,
  prepareComponentToken,
);
