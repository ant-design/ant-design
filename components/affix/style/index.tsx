// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';

interface AffixToken extends DerivativeToken {
  affixCls: string;
}

// ============================== Shared ==============================
const genSharedAffixStyle: GenerateStyle<AffixToken> = (token): CSSObject => {
  const { affixCls } = token;

  return {
    [affixCls]: {
      position: 'fixed',
      zIndex: token.zIndexAffix,
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const affixToken: AffixToken = {
    ...token,

    affixCls: `.${prefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genSharedAffixStyle(affixToken),
    ]),
    hashId,
  ];
}
