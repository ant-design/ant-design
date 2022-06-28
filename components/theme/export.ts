/* eslint-disable import/prefer-default-export */
import { useToken } from '.';

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
