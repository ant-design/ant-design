import React, { useCallback, useEffect, useMemo } from 'react';
import {
  createCache,
  extractStyle,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { theme as antdTheme, App } from 'antd';
import type { DirectionType } from 'antd/es/config-provider';
import {
  createSearchParams,
  useOutlet,
  useSearchParams,
  useServerInsertedHTML,
  usePrefersColor,
} from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import useLocation from '../../hooks/useLocation';
import type { ThemeName } from '../common/ThemeSwitch';
import ThemeSwitch from '../common/ThemeSwitch';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;

// const styleCache = createCache();
// if (typeof global !== 'undefined') {
//   (global as any).styleCache = styleCache;
// }

const getAlgorithm = (themes: ThemeName[] = []) =>
  themes
    .map((theme) => {
      if (theme === 'dark') {
        return antdTheme.darkAlgorithm;
      }
      if (theme === 'compact') {
        return antdTheme.compactAlgorithm;
      }
      return null;
    })
    .filter((item) => item);

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [, , setPrefersColor] = usePrefersColor();
  const [{ theme = [], direction, isMobile }, setSiteState] = useLayoutState<SiteState>({
    isMobile: false,
    direction: 'ltr',
    theme: [],
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
          const _theme = value.filter((t) => t !== 'light');
          nextSearchParams = createSearchParams({
            ...nextSearchParams,
            theme: _theme,
          });
          setPrefersColor(_theme.includes('dark') ? 'dark' : 'light');
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

    setSiteState({ theme: _theme, direction: _direction === 'rtl' ? 'rtl' : 'ltr' });
    // Handle isMobile
    updateMobileMode();
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    setPrefersColor(_theme.includes('dark') ? 'dark' : 'light');

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

  const [styleCache] = React.useState(() => createCache());

  useServerInsertedHTML(() => {
    const styleText = extractStyle(styleCache, true);
    return <style data-type="antd-cssinjs" dangerouslySetInnerHTML={{ __html: styleText }} />;
  });

  useServerInsertedHTML(() => (
    <style
      data-sandpack="true"
      id="sandpack"
      dangerouslySetInnerHTML={{ __html: getSandpackCssText() }}
    />
  ));

  const demoPage = pathname.startsWith('/~demos');

  // ============================ Render ============================
  let content: React.ReactNode = outlet;

  // Demo page should not contain App component
  if (!demoPage) {
    content = (
      <App>
        {outlet}
        <ThemeSwitch
          value={theme}
          onChange={(nextTheme) => updateSiteConfig({ theme: nextTheme })}
        />
      </App>
    );
  }

  return (
    <DarkContext.Provider value={theme.includes('dark')}>
      <StyleProvider
        cache={styleCache}
        linters={[logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter]}
      >
        <SiteContext.Provider value={siteContextValue}>
          <SiteThemeProvider
            theme={{
              algorithm: getAlgorithm(theme),
              token: {
                motion: !theme.includes('motion-off'),
              },
            }}
          >
            <HappyProvider disabled={!theme.includes('happy-work')}>{content}</HappyProvider>
          </SiteThemeProvider>
        </SiteContext.Provider>
      </StyleProvider>
    </DarkContext.Provider>
  );
};

export default GlobalLayout;
