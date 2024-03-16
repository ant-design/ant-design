import useMemo from 'rc-util/lib/hooks/useMemo';
import isEqual from 'rc-util/lib/isEqual';
import type { OverrideToken } from '../../theme/interface';
import type { ThemeConfig } from '../context';
import { defaultConfig } from '../../theme/internal';
import useThemeKey from './useThemeKey';
import { devUseWarning } from '../../_util/warning';

export default function useTheme(
  theme?: ThemeConfig,
  parentTheme?: ThemeConfig,
  config?: {
    prefixCls?: string;
  },
): ThemeConfig | undefined {
  const warning = devUseWarning('ConfigProvider');

  const themeConfig = theme || {};
  const parentThemeConfig: ThemeConfig =
    themeConfig.inherit === false || !parentTheme
      ? {
          ...defaultConfig,
          hashed: parentTheme?.hashed ?? defaultConfig.hashed,
          cssVar: parentTheme?.cssVar,
        }
      : parentTheme;

  const themeKey = useThemeKey();

  if (process.env.NODE_ENV !== 'production') {
    const cssVarEnabled = themeConfig.cssVar || parentThemeConfig.cssVar;
    const validKey = !!(
      (typeof themeConfig.cssVar === 'object' && themeConfig.cssVar?.key) ||
      themeKey
    );
    warning(
      !cssVarEnabled || validKey,
      'breaking',
      'Missing key in `cssVar` config. Please upgrade to React 18 or set `cssVar.key` manually in each ConfigProvider inside `cssVar` enabled ConfigProvider.',
    );
  }

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

      const cssVarKey = `css-var-${themeKey.replace(/:/g, '')}`;
      const mergedCssVar = (themeConfig.cssVar ?? parentThemeConfig.cssVar) && {
        prefix: config?.prefixCls, // Same as prefixCls by default
        ...(typeof parentThemeConfig.cssVar === 'object' ? parentThemeConfig.cssVar : {}),
        ...(typeof themeConfig.cssVar === 'object' ? themeConfig.cssVar : {}),
        key: (typeof themeConfig.cssVar === 'object' && themeConfig.cssVar?.key) || cssVarKey,
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
    [themeConfig, parentThemeConfig],
    (prev, next) =>
      prev.some((prevTheme, index) => {
        const nextTheme = next[index];

        return !isEqual(prevTheme, nextTheme, true);
      }),
  );
}
