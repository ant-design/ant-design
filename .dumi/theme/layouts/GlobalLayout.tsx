import React, { Suspense, useCallback, useEffect } from 'react';
import { Monitoring } from 'react-scan/monitoring';
import {
  createCache,
  extractStyle,
  legacyNotSelectorLinter,
  NaNLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import { theme as antdTheme, App } from 'antd';
import type { MappingAlgorithm } from 'antd';
import type { DirectionType, ThemeConfig } from 'antd/es/config-provider';
import {
  createSearchParams,
  useOutlet,
  useParams,
  useSearchParams,
  useServerInsertedHTML,
} from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import useLocation from '../../hooks/useLocation';
import type { ThemeName } from '../common/ThemeSwitch';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

import '@ant-design/v5-patch-for-react-19';

const ThemeSwitch = React.lazy(() => import('../common/ThemeSwitch'));

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;
export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';

// const styleCache = createCache();
// if (typeof global !== 'undefined') {
//   (global as any).styleCache = styleCache;
// }

// Compatible with old anchors
if (typeof window !== 'undefined') {
  const hashId = location.hash.slice(1);
  if (hashId.startsWith('components-')) {
    if (!document.querySelector(`#${hashId}`)) {
      location.hash = `#${hashId.replace(/^components-/, '')}`;
    }
  }
}

const getAlgorithm = (themes: ThemeName[] = []) =>
  themes
    .map((theme) => {
      if (theme === 'dark') {
        return antdTheme.darkAlgorithm;
      }
      if (theme === 'compact') {
        return antdTheme.compactAlgorithm;
      }
      return null as unknown as MappingAlgorithm;
    })
    .filter(Boolean);

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ theme = [], direction, isMobile, bannerVisible = false }, setSiteState] =
    useLayoutState<SiteState>({
      isMobile: false,
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
    });

  // TODO: This can be remove in v6
  const useCssVar = searchParams.get('cssVar') !== 'false';

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
    // const storedBannerVisibleLastTime =
    //   localStorage && localStorage.getItem(ANT_DESIGN_NOT_SHOW_BANNER);
    // const storedBannerVisible =
    //   storedBannerVisibleLastTime && dayjs().diff(dayjs(storedBannerVisibleLastTime), 'day') >= 1;

    setSiteState({
      theme: _theme,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
      // bannerVisible: storedBannerVisibleLastTime ? !!storedBannerVisible : true,
    });
    document.documentElement.setAttribute(
      'data-prefers-color',
      _theme.includes('dark') ? 'dark' : 'light',
    );
    // Handle isMobile
    updateMobileMode();

    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, []);

  const siteContextValue = React.useMemo<SiteContextProps>(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isMobile: isMobile!,
      bannerVisible,
    }),
    [isMobile, direction, updateSiteConfig, theme, bannerVisible],
  );

  const themeConfig = React.useMemo<ThemeConfig>(
    () => ({
      algorithm: getAlgorithm(theme),
      token: { motion: !theme.includes('motion-off') },
      cssVar: useCssVar,
      hashed: !useCssVar,
    }),
    [theme],
  );

  const [styleCache] = React.useState(() => createCache());

  useServerInsertedHTML(() => {
    const styleText = extractStyle(styleCache, {
      plain: true,
      types: 'style',
    });
    // biome-ignore lint/security/noDangerouslySetInnerHtml: only used in .dumi
    return <style data-type="antd-cssinjs" dangerouslySetInnerHTML={{ __html: styleText }} />;
  });

  useServerInsertedHTML(() => {
    const styleText = extractStyle(styleCache, {
      plain: true,
      types: ['cssVar', 'token'],
    });
    return (
      <style
        data-type="antd-css-var"
        data-rc-order="prepend"
        data-rc-priority="-9999"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: only used in .dumi
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  useServerInsertedHTML(() => (
    <style
      data-sandpack="true"
      id="sandpack"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: only used in .dumi
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
        <Suspense>
          <ThemeSwitch
            value={theme}
            onChange={(nextTheme) => updateSiteConfig({ theme: nextTheme })}
          />
        </Suspense>
      </App>
    );
  }

  return (
    <DarkContext.Provider value={theme.includes('dark')}>
      <StyleProvider
        cache={styleCache}
        linters={[legacyNotSelectorLinter, parentSelectorLinter, NaNLinter]}
      >
        <SiteContext.Provider value={siteContextValue}>
          <SiteThemeProvider theme={themeConfig}>
            <HappyProvider disabled={!theme.includes('happy-work')}>
              {content}
              <Monitoring
                apiKey="GhrCCNrHZHXlf4P6E03ntrFwhRLxJL30" // Safe to expose publically
                url="https://monitoring.react-scan.com/api/v1/ingest"
                commit={process.env.COMMIT_HASH}
                branch={process.env.BRANCH}
                params={params as Record<string, string>}
                path={pathname}
              />
            </HappyProvider>
          </SiteThemeProvider>
        </SiteContext.Provider>
      </StyleProvider>
    </DarkContext.Provider>
  );
};

export default GlobalLayout;
