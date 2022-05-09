// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { genComponentStyleHook, mergeToken } from '../../_util/theme';

interface AffixToken extends FullToken<'Affix'> {
  zIndexAffix: number;
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      zIndex: token.zIndexAffix,
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Affix', token => {
  const affixToken = mergeToken<AffixToken>(token, {
    zIndexAffix: token.zIndexBase + 10,
  });
  return [genSharedAffixStyle(affixToken)];
});
