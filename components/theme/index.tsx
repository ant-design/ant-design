import type { Theme } from '@ant-design/cssinjs';

import getDesignToken from './getDesignToken';
import type { AliasToken, GlobalToken, MappingAlgorithm, SeedToken } from './interface';
import {
  defaultConfig,
  DesignTokenContext as InternalDesignTokenContext,
  useToken as useInternalToken,
} from './internal';
import compactAlgorithm from './themes/compact';
import darkAlgorithm from './themes/dark';
import defaultAlgorithm from './themes/default';

// ZombieJ: We export as object to user but array in internal.
// This is used to minimize the bundle size for antd package but safe to refactor as object also.
// Please do not export internal `useToken` directly to avoid something export unexpected.
/** Get current context Design Token. Will be different if you are using nest theme config. */
function useToken(): {
  theme: Theme<SeedToken, AliasToken>;
  token: GlobalToken;
  hashId: string;
} {
  const [theme, token, hashId] = useInternalToken();

  return { theme, token, hashId };
}

export type { GlobalToken, MappingAlgorithm };

interface ThemeExport {
  /** Default seedToken */
  defaultSeed: typeof defaultConfig.token;
  useToken: typeof useToken;
  defaultAlgorithm: typeof defaultAlgorithm;
  darkAlgorithm: typeof darkAlgorithm;
  compactAlgorithm: typeof compactAlgorithm;
  getDesignToken: typeof getDesignToken;
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  defaultConfig: typeof defaultConfig;
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  _internalContext: typeof InternalDesignTokenContext;
}

const themeExport: ThemeExport = {
  /** Default seedToken */
  defaultSeed: defaultConfig.token,
  useToken,
  defaultAlgorithm,
  darkAlgorithm,
  compactAlgorithm,
  getDesignToken,
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  defaultConfig,
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  _internalContext: InternalDesignTokenContext,
};

export default themeExport;
