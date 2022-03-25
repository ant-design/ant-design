import useMemo from 'rc-util/lib/hooks/useMemo';
import shallowEqual from 'shallowequal';
import type { OverrideToken } from '../../_util/theme/interface';
import type { ThemeConfig } from '../context';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
): ThemeConfig | undefined {
  const themeConfig = theme || {};
  const parentThemeConfig = parentTheme || {};

  const mergedTheme = useMemo<ThemeConfig | undefined>(
    () => {
      if (!theme) {
        return parentTheme;
      }

      // Override
      const mergedOverride = {
        ...parentThemeConfig.override,
      };

      Object.keys(theme.override || {}).forEach((componentName: keyof OverrideToken) => {
        mergedOverride[componentName] = {
          ...mergedOverride[componentName],
          ...theme.override![componentName],
        } as any;
      });

      // Base token
      const merged = {
        ...parentThemeConfig,
        ...themeConfig,

        token: {
          ...parentThemeConfig.token,
          ...themeConfig.token,
        },
        override: mergedOverride,
      };

      return merged;
    },
    [themeConfig, parentThemeConfig],
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];

        return !shallowEqual(prevTheme, nextTheme);
      }),
  );

  return mergedTheme;
}
