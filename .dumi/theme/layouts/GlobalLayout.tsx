import React, { type FC, useLayoutEffect } from 'react';
import { useOutlet } from 'dumi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';
import ThemeContext, { ThemeContextProps } from '../slots/ThemeContext';

const ANT_DESIGN_SITE_THEME = 'antd-site-theme';

const GlobalLayout: FC = () => {
  const outlet = useOutlet();

  const [theme, setTheme] = React.useState<ThemeConfig>({});

  const contextValue = React.useMemo<ThemeContextProps>(
    () => ({
      theme,
      setTheme: (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem(
          ANT_DESIGN_SITE_THEME,
          JSON.stringify(newTheme, (key, value) => {
            if (key === 'algorithm') {
              return value === antdTheme.darkAlgorithm ? 'dark' : value;
            }
            return value;
          }),
        );
      },
    }),
    [theme],
  );

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem(ANT_DESIGN_SITE_THEME);
    if (localTheme) {
      try {
        const themeConfig = JSON.parse(localTheme);
        if (themeConfig.algorithm === 'dark') {
          themeConfig.algorithm = antdTheme.darkAlgorithm;
        }
        setTheme(themeConfig);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          ...theme,
          // TODO: Site algorithm
          // algorithm: undefined,
        }}
      >
        {outlet}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default GlobalLayout;
