import useMemo from 'rc-util/lib/hooks/useMemo';
import isEqual from 'rc-util/lib/isEqual';
import type { OverrideToken } from '../../theme/interface';
import type { ThemeConfig } from '../context';
import { defaultConfig } from '../../theme/internal';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
): ThemeConfig | undefined {
  const themeConfig = theme || {};
  const parentThemeConfig: ThemeConfig =
    themeConfig.inherit === false || !parentTheme ? defaultConfig : parentTheme;

  const mergedTheme = useMemo<ThemeConfig | undefined>(
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

      // Base token
      return {
        ...parentThemeConfig,
        ...themeConfig,

        token: {
          ...parentThemeConfig.token,
          ...themeConfig.token,
        },
        components: mergedComponents,
      };
    },
    [themeConfig, parentThemeConfig],
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];

        return !isEqual(prevTheme, nextTheme, true);
      }),
  );

  return mergedTheme;
}
