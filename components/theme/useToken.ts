import type { Theme } from '@ant-design/cssinjs';
import { createTheme, useCacheToken } from '@ant-design/cssinjs';
import React from 'react';
import version from '../version';
import type { AliasToken, GlobalToken, MapToken, OverrideToken, SeedToken } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';

const defaultTheme = createTheme(defaultDerivative);
// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  hashed: true,
};

export const DesignTokenContext = React.createContext<{
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, MapToken>;
  components?: OverrideToken;
  hashed?: string | boolean;
}>(defaultConfig);

// ================================== Hook ==================================
export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    components,
  } = React.useContext(DesignTokenContext);

  const salt = `${version}-${hashed || ''}`;

  const mergedTheme = theme || defaultTheme;

  const [token, hashId] = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override: { override: rootDesignToken, ...components },
      formatToken,
    },
  );

  return [mergedTheme, token, hashed ? hashId : ''];
}
