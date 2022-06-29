/* eslint-disable import/prefer-default-export */
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { AliasToken } from '.';
import { useToken } from '.';
import defaultMap from './themes/default';
import seed from './themes/seed';
import formatToken from './util/alias';

// ZombieJ: We export as object to user but array in internal.
// This is used to minimize the bundle size for antd package but safe to refactor as object also.
// Please do not export internal `useToken` directly to avoid something export unexpected.
/**
 * Get current context Design Token. Will be different if you using nest theme config.
 */
export function useDesignToken() {
  const [theme, token, hashId] = useToken();

  return { theme, token, hashId };
}

export function getDesignToken(config: ThemeConfig): AliasToken {
  const seedToken = { ...seed, ...config.token };
  const mapFn = config.derivative ?? defaultMap;
  const mapToken = { ...mapFn(seedToken), ...config.override };
  return formatToken(mapToken);
}
