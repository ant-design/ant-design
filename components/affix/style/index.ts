import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

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

export const prepareComponentToken: GetDefaultToken<'Affix'> = (token) => ({
  zIndexPopup: token.zIndexBase + 10,
});

// ============================== Export ==============================
export default genComponentStyleHook('Affix', (token) => {
  const affixToken = mergeToken<AffixToken>(token, {
    zIndexPopup: token.zIndexBase + 10,
  });
  return [genSharedAffixStyle(affixToken)];
});
