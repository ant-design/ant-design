import React from 'react';
import {
  CSSInterpolation,
  CSSObject,
  Theme,
  useCacheToken,
  useStyleRegister,
} from '@ant-design/cssinjs';
import defaultSeedToken, { derivative as defaultDerivative } from './themes/default';
import version from '../../version';
import { resetComponent, resetIcon, clearFix } from './util';
import {
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
} from './util/slide';
import type { SeedToken, DerivativeToken, AliasToken, OverrideToken } from './interface';

export {
  resetComponent,
  resetIcon,
  clearFix,
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
};

export { useStyleRegister };

// ================================ Context =================================
const defaultTheme = new Theme(defaultDerivative);

export const DesignTokenContext = React.createContext<{
  token: Partial<SeedToken>;
  theme: Theme<SeedToken, DerivativeToken>;
  override?: OverrideToken;
  hashed?: string | boolean;
}>({
  token: defaultSeedToken,
  theme: defaultTheme,
});

// =============================== MergeToken ===============================
/** Raw merge of `@ant-design/cssinjs` token. Which need additional process */
type RawMergedToken = DerivativeToken & OverrideToken;

/**
 * Seed (designer) > Derivative (designer) > Alias (developer).
 *
 * Merge seed & derivative & override token and generate alias token for developer.
 */
function useMergeToken(derivativeToken: RawMergedToken): AliasToken {
  const mergedToken = React.useMemo(() => {
    const { derivative, ...restToken } = derivativeToken;

    return {
      ...restToken,
      ...derivative,
    };
  }, [derivativeToken]);

  // Generate alias token
  const aliasToken = React.useMemo(() => {}, [mergedToken]);

  return aliasToken;
}

// ================================== Hook ==================================
export function useToken(): [Theme<SeedToken, DerivativeToken>, AliasToken, string] {
  const {
    token: rootDesignToken,
    theme = defaultTheme,
    override,
    hashed,
  } = React.useContext(DesignTokenContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken<RawMergedToken, SeedToken>(
    theme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override,
    },
  );

  // Merge token
  const mergedToken = useMergeToken(token);

  return [theme, mergedToken, hashed ? hashId : ''];
}

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

export type GenerateStyle<ComponentToken extends object, ReturnType = CSSInterpolation> = (
  token: ComponentToken,
  hashId?: string,
) => ReturnType;

// ================================== Util ==================================
export function withPrefix(
  style: CSSObject,
  prefixCls: string,
  additionalClsList: string[] = [],
): CSSObject {
  const fullClsList = [prefixCls, ...additionalClsList].filter(cls => cls).map(cls => `.${cls}`);

  return {
    [fullClsList.join('')]: style,
  };
}
