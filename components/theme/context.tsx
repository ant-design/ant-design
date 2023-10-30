import type { FC, PropsWithChildren } from 'react';
import React, { useId, useRef } from 'react';
import type { Theme } from '@ant-design/cssinjs';
import { createTheme } from '@ant-design/cssinjs';

import type { AliasToken, MapToken, OverrideToken, SeedToken } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';

export const defaultTheme = createTheme(defaultDerivative);

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  override: { override: defaultSeedToken },
  hashed: true,
  hashId: 'default-hash',
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
  /** Just merge `token` & `override` at top to save perf */
  override: { override: Partial<AliasToken> } & ComponentsToken;
  hashed?: string | boolean;
  cssVar?: {
    key: string;
  };
}

export const DesignTokenContext = React.createContext<DesignTokenProviderProps>(defaultConfig);

type DesignTokenContextProviderProps = {
  theme: Omit<DesignTokenProviderProps, 'hashId'>;
};

export const DesignTokenProvider: FC<PropsWithChildren<DesignTokenContextProviderProps>> = (
  props,
) => {
  const { children, theme } = props;

  return <DesignTokenContext.Provider value={theme}>{children}</DesignTokenContext.Provider>;
};

export default DesignTokenProvider;
