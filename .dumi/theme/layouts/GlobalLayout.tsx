import React, { startTransition, useLayoutEffect } from 'react';
import { useOutlet } from 'dumi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import ThemeSwitch from '../common/ThemeSwitch';
import useLocation from '../../hooks/useLocation';

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

const ANT_DESIGN_SITE_THEME = 'antd-site-theme';

const getAlgorithm = (theme: string) => {
  if (theme === 'dark') {
    return antdTheme.darkAlgorithm;
  }
  if (theme === 'compact') {
    return antdTheme.compactAlgorithm;
  }
  return antdTheme.defaultAlgorithm;
};

const getThemeString = (algorithm: typeof antdTheme.defaultAlgorithm) => {
  if (algorithm === antdTheme.darkAlgorithm) {
    return 'dark';
  }
  if (algorithm === antdTheme.compactAlgorithm) {
    return 'compact';
  }
  return 'light';
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();

  const [theme, setTheme] = React.useState<ThemeConfig>({
    algorithm: [antdTheme.defaultAlgorithm],
  });

  const handleThemeChange = (newTheme: ThemeConfig, ignoreAlgorithm: boolean = true) => {
    const nextTheme = { ...newTheme };
    if (ignoreAlgorithm) {
      nextTheme.algorithm = theme.algorithm;
    }
    setTheme(nextTheme);
    localStorage.setItem(
      ANT_DESIGN_SITE_THEME,
      JSON.stringify(nextTheme, (key, value) => {
        if (key === 'algorithm') {
          return Array.isArray(value) ? value.map((item) => getThemeString(item)) : ['light'];
        }
        return value;
      }),
    );
  };

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem(ANT_DESIGN_SITE_THEME);
    if (localTheme) {
      const themeConfig = JSON.parse(localTheme);
      if (themeConfig.algorithm) {
        themeConfig.algorithm = themeConfig.algorithm.map((item: string) => getAlgorithm(item));
      } else {
        themeConfig.algorithm = [antdTheme.defaultAlgorithm];
      }
      startTransition(() => {
        setTheme(themeConfig);
      });
    }
  }, []);

  return (
    <StyleProvider cache={styleCache}>
      <ConfigProvider theme={theme}>
        {outlet}
        {!pathname.startsWith('/~demos') && (
          <ThemeSwitch
            value={theme.algorithm as []}
            onChange={(value) => handleThemeChange({ ...theme, algorithm: value }, false)}
          />
        )}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default GlobalLayout;
