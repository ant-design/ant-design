import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

export interface ComponentToken {
  zIndexPopup: number;
}

interface AffixToken extends FullToken<'Affix'> {
  //
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
export default genStyleHooks('Affix', genSharedAffixStyle, prepareComponentToken);
