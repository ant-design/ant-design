import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import useCSSVarToken from '@ant-design/cssinjs/es/hooks/useCSSVarToken';
import React from 'react';
import version from '../version';
import type { AliasToken, GlobalToken, MapToken, SeedToken } from './interface';
import type { DesignTokenProviderProps } from './context';
import { defaultTheme, DesignTokenContext } from './context';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';
import cssVarMap from './util/cssVarMap';

export const getComputedToken = (
  originToken: SeedToken,
  overrideToken: DesignTokenProviderProps['components'] & {
    override?: Partial<AliasToken>;
  },
  theme: Theme<any, any>,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  const { override, ...components } = overrideToken;

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    override,
  };

  // Format if needed
  mergedDerivativeToken = formatToken(mergedDerivativeToken);

  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const { theme: componentTheme, ...componentTokens } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken(
          {
            ...mergedDerivativeToken,
            ...componentTokens,
          },
          {
            override: componentTokens,
          },
          componentTheme,
        );
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }

  return mergedDerivativeToken;
};

// ================================== Hook ==================================
export default function useToken(): [
  theme: Theme<SeedToken, MapToken>,
  token: GlobalToken,
  hashId: string,
] {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    components,
  } = React.useContext(DesignTokenContext);

  const salt = `${version}-${hashed || ''}`;

  const mergedTheme = theme || defaultTheme;

  const [token, hashId] = useCSSVarToken<GlobalToken, SeedToken>(
    {
      tokens: [defaultSeedToken, rootDesignToken],
      theme: mergedTheme,
      override: { override: rootDesignToken, ...components },
    },
    {
      salt,
      getComputedToken,
      // formatToken will not be consumed after 1.15.0 with getComputedToken.
      // But token will break if @ant-design/cssinjs is under 1.15.0 without it
      formatToken,
    },
  );

  return [mergedTheme, token, hashed ? hashId : ''];
}
