// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { GenerateStyle, genComponentStyleHook, FullToken } from '../../_util/theme';

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
  const affixToken: AffixToken = {
    ...token,
    zIndexAffix: token.zIndexBase + 10,
  };
  return [genSharedAffixStyle(affixToken)];
});
