import useMemo from 'rc-util/lib/hooks/useMemo';
import isEqual from 'rc-util/lib/isEqual';
import type { OverrideToken } from '../../theme/interface';
import type { ThemeConfig } from '../context';
import { defaultConfig } from '../../theme/internal';
import { useId } from 'react';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
): ThemeConfig | undefined {
  const themeConfig = theme || {};
  const parentThemeConfig: ThemeConfig =
    themeConfig.inherit === false || !parentTheme ? defaultConfig : parentTheme;

  const id = useId().replace(/:/g, 'c');

  return useMemo<ThemeConfig | undefined>(
    () => {
      if (!theme) {
        return parentTheme;
      }

      // Override
      const mergedComponents = {
        ...parentThemeConfig.components,
      };

      Object.keys(theme.components || {}).forEach((componentName: keyof OverrideToken) => {
        mergedComponents[componentName] = {
          ...mergedComponents[componentName],
          ...theme.components![componentName],
        } as any;
      });

      const mergedCssVar =
        (themeConfig.cssVar && {
          ...themeConfig.cssVar,
          key: themeConfig.cssVar.key ?? `css-var-${id}`,
        }) ??
        (parentThemeConfig.cssVar && {
          ...parentThemeConfig.cssVar,
          key: `css-var-${id}`,
        });

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
    [themeConfig, parentThemeConfig],
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];

        return !isEqual(prevTheme, nextTheme, true);
      }),
  );
}
