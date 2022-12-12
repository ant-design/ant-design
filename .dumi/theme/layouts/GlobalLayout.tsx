import React, { useCallback, useEffect, useMemo } from 'react';
import { createSearchParams, useOutlet, useSearchParams } from 'dumi';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import type { DirectionType } from 'antd/es/config-provider';
import ThemeSwitch from '../common/ThemeSwitch';
import type { ThemeName } from '../common/ThemeSwitch';
import useLocation from '../../hooks/useLocation';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

const getAlgorithm = (themes: ThemeName[] = []) =>
  themes.map((theme) => {
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
  const [{ theme, direction, isMobile }, setSiteState] = React.useState<SiteState>({
    isMobile: false,
    direction: 'ltr',
    theme: ['light'],
  });

  const updateSiteContext = useCallback((props: SiteState) => {
    setSiteState((prev) => ({ ...prev, ...props }));

    let nextSearchParams: URLSearchParams = searchParams;
    (Object.entries(props) as Entries<SiteContextProps>).forEach(([key, value]) => {
      if (key === 'direction') {
        if (value === 'rtl') {
          nextSearchParams.set('direction', 'rtl');
        } else {
          nextSearchParams.delete('direction');
        }
      }
      if (key === 'theme') {
        nextSearchParams = createSearchParams({
          ...nextSearchParams,
          theme: value.filter((t) => t !== 'light'),
        });
      }
    });

    setSearchParams(nextSearchParams);
  }, [searchParams, setSearchParams]);

  const updateMobileMode = () => {
    updateSiteContext({ isMobile: window.innerWidth < RESPONSIVE_MOBILE });
  };

  useEffect(() => {
    const _theme = searchParams.getAll('theme') as ThemeName[];
    const _direction = searchParams.get('direction') as DirectionType;
    setSiteState({ theme: _theme, direction: _direction });

    // Handle isMobile
    updateMobileMode();
    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, []);

  const siteContextValue = useMemo(
    () => ({
      direction,
      updateSiteContext,
      theme: theme!,
      isMobile: isMobile!,
    }),
    [isMobile, direction, updateSiteContext, theme],
  );

  return (
    <StyleProvider cache={styleCache}>
      <SiteContext.Provider value={siteContextValue}>
        <ConfigProvider
          theme={{
            algorithm: getAlgorithm(theme),
          }}
        >
          {outlet}
          {!pathname.startsWith('/~demos') && (
            <ThemeSwitch
              value={theme}
              onChange={(nextTheme) => updateSiteContext({ theme: nextTheme })}
            />
          )}
        </ConfigProvider>
      </SiteContext.Provider>
    </StyleProvider>
  );
};

export default GlobalLayout;
