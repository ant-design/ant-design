import React from 'react';
import { useOutlet, useSearchParams } from 'dumi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import ThemeSwitch from '../common/ThemeSwitch';
import type { ThemeName } from '../common/ThemeSwitch';
import useLocation from '../../hooks/useLocation';

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

const getAlgorithm = (themes: ThemeName[]) =>
  (themes || []).map((theme) => {
    if (theme === 'dark') {
      return antdTheme.darkAlgorithm;
    }
    if (theme === 'compact') {
      return antdTheme.compactAlgorithm;
    }
    return antdTheme.defaultAlgorithm;
  });

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = searchParams.getAll('theme') as unknown as ThemeName[];
  const handleThemeChange = (value: ThemeName[]) => {
    setSearchParams({
      ...searchParams,
      theme: value,
    });
  };

  return (
    <StyleProvider cache={styleCache}>
      <ConfigProvider
        theme={{
          algorithm: getAlgorithm(theme),
        }}
      >
        {outlet}
        {!pathname.startsWith('/~demos') && (
          <ThemeSwitch value={theme} onChange={handleThemeChange} />
        )}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default GlobalLayout;
