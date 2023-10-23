import React, { useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
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
import { App, theme as antdTheme } from 'antd';
import type { DirectionType } from 'antd/es/config-provider';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';

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
export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';

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
    .filter((item) => item) as typeof antdTheme.darkAlgorithm[];

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ theme = [], direction, isMobile, bannerVisible = false }, setSiteState] =
    useLayoutState<SiteState>({
      isMobile: false,
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
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

          document
            .querySelector('html')
            ?.setAttribute('data-prefers-color', value.includes('dark') ? 'dark' : 'light');
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
    const storedBannerVisibleLastTime =
      localStorage && localStorage.getItem(ANT_DESIGN_NOT_SHOW_BANNER);
    const storedBannerVisible =
      storedBannerVisibleLastTime && dayjs().diff(dayjs(storedBannerVisibleLastTime), 'day') >= 1;

    setSiteState({
      theme: _theme,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
      bannerVisible: storedBannerVisibleLastTime ? !!storedBannerVisible : true,
    });
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
      updateSiteConfig,
      theme: theme!,
      isMobile: isMobile!,
      bannerVisible,
    }),
    [isMobile, direction, updateSiteConfig, theme, bannerVisible],
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
