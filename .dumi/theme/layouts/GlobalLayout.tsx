import React from 'react';
import { useOutlet, useSearchParams } from 'dumi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import ThemeSwitch from '../common/ThemeSwitch';
import useLocation from '../../hooks/useLocation';

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

const getAlgorithm = (theme: 'light' | 'dark' | 'compact') => {
  if (theme === 'dark') {
    return antdTheme.darkAlgorithm;
  }
  if (theme === 'compact') {
    return antdTheme.compactAlgorithm;
  }
  return antdTheme.defaultAlgorithm;
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = searchParams.get('theme') as 'light' | 'dark' | 'compact';
  const handleThemeChange = (value: 'light' | 'dark' | 'compact') => {
    setSearchParams({
      ...searchParams,
      theme: value === 'light' ? undefined : value,
    });
  };

  return (
    <StyleProvider cache={styleCache}>
      <ConfigProvider
        theme={{
          algorithm: [getAlgorithm(theme)],
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
