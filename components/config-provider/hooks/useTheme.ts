import { useId } from 'react';
import { isEqual, useMemo } from '@rc-component/util';

import type { OverrideToken } from '../../theme/interface';
import { defaultConfig } from '../../theme/internal';
import type { ThemeConfig } from '../context';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
  config?: {
    prefixCls?: string;
  },
): ThemeConfig | undefined {
  const themeConfig = theme || {};
  const parentThemeConfig: ThemeConfig =
    themeConfig.inherit === false || !parentTheme
      ? {
          ...defaultConfig,
          hashed: parentTheme?.hashed ?? defaultConfig.hashed,
          cssVar: parentTheme?.cssVar,
          zeroRuntime: parentTheme?.zeroRuntime,
        }
      : parentTheme;

  // Generate a unique key for cssVar
  const themeKey = useId();

  return useMemo<ThemeConfig | undefined>(
    () => {
      if (!theme) {
        return parentTheme;
      }

      // Override
      const mergedComponents = {
        ...parentThemeConfig.components,
      };

      (Object.keys(theme.components || {}) as (keyof OverrideToken)[]).forEach((componentName) => {
        mergedComponents[componentName] = {
          ...mergedComponents[componentName],
          ...theme.components![componentName],
        } as any;
      });

      const cssVarKey = `css-var-${themeKey.replace(/:/g, '')}`;
      const mergedCssVar = {
        prefix: config?.prefixCls, // Same as prefixCls by default
        ...parentThemeConfig.cssVar,
        ...themeConfig.cssVar,
        key: themeConfig.cssVar?.key || cssVarKey,
      };

      // Base token
      return {
        ...parentThemeConfig,
        ...themeConfig,

        token: {
          ...parentThemeConfig.token,
          ...themeConfig.token,
        },
        components: mergedComponents,
        cssVar: mergedCssVar,
      };
    },
    [themeConfig, parentThemeConfig, config?.prefixCls, themeKey],
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];
        return !isEqual(prevTheme, nextTheme, true);
      }),
  );
}
