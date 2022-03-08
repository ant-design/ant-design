// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { DerivativeToken, useStyleRegister, useToken, withPrefix } from '../../_util/theme';

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  return useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => []);
}
