import {
  createCache,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme, App } from 'antd';
import type { DirectionType } from 'antd/es/config-provider';
import { createSearchParams, useOutlet, useSearchParams } from 'dumi';
import React, { startTransition, useCallback, useEffect, useMemo } from 'react';
import useLocation from '../../hooks/useLocation';
import type { ThemeName } from '../common/ThemeSwitch';
import ThemeSwitch from '../common/ThemeSwitch';
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

  const updateSiteConfig = useCallback(
    (props: SiteState) => {
      setSiteState((prev) => ({ ...prev, ...props }));

      // updating `searchParams` will clear the hash
      const oldSearchStr = searchParams.toString();

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

      if (nextSearchParams.toString() !== oldSearchStr) {
        setSearchParams(nextSearchParams);
      }
    },
    [searchParams, setSearchParams],
  );

  const updateMobileMode = () => {
    updateSiteConfig({ isMobile: window.innerWidth < RESPONSIVE_MOBILE });
  };

  useEffect(() => {
    const _theme = searchParams.getAll('theme') as ThemeName[];
    const _direction = searchParams.get('direction') as DirectionType;

    startTransition(() => {
      setSiteState({ theme: _theme, direction: _direction === 'rtl' ? 'rtl' : 'ltr' });
      // Handle isMobile
      updateMobileMode();
    });

    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, []);

  const siteContextValue = useMemo(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isMobile: isMobile!,
    }),
    [isMobile, direction, updateSiteConfig, theme],
  );

  return (
    <StyleProvider
      cache={styleCache}
      linters={[logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter]}
    >
      <SiteContext.Provider value={siteContextValue}>
        <ConfigProvider
          theme={{
            algorithm: getAlgorithm(theme),
          }}
        >
          <App>
            {outlet}
            {!pathname.startsWith('/~demos') && (
              <ThemeSwitch
                value={theme}
                onChange={(nextTheme) => updateSiteConfig({ theme: nextTheme })}
              />
            )}
          </App>
        </ConfigProvider>
      </SiteContext.Provider>
    </StyleProvider>
  );
};

export default GlobalLayout;
