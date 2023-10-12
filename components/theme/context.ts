import type { Theme } from '@ant-design/cssinjs';
import { createTheme } from '@ant-design/cssinjs';
import React from 'react';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';

export const defaultTheme = createTheme(defaultDerivative);

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  override: defaultSeedToken,
  hashed: true,
};

export type ComponentsToken = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    theme?: Theme<SeedToken, MapToken>;
  };
};

export interface DesignTokenProviderProps {
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, MapToken>;
  components?: ComponentsToken;
  override: Partial<AliasToken> & ComponentsToken;
  hashed?: string | boolean;
}

export const DesignTokenContext = React.createContext<DesignTokenProviderProps>(defaultConfig);
