import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';

interface AffixToken extends FullToken<'Affix'> {
  zIndexPopup: number;
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexPopup,
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Affix'> = (token) => {
  const { zIndexBase } = token;
  return { zIndexPopup: zIndexBase + 10 };
};

// ============================== Export ==============================
export default genComponentStyleHook('Affix', genSharedAffixStyle, prepareComponentToken);
