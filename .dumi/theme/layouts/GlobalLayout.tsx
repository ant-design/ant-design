// prettier-ignore
import { scan } from 'react-scan'; // import this BEFORE react

import React, { useCallback, useEffect } from 'react';
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
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import type { MappingAlgorithm } from 'antd';
import type { DirectionType, ThemeConfig } from 'antd/es/config-provider';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import type { ThemeName } from '../common/ThemeSwitch';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SimpleComponentClassNames, SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

import '@ant-design/v5-patch-for-react-19';

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;
export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';

const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Compatible with old anchors
if (typeof window !== 'undefined') {
  const hashId = location.hash.slice(1);
  if (hashId.startsWith('components-')) {
    if (!document.querySelector(`#${hashId}`)) {
      location.hash = `#${hashId.replace(/^components-/, '')}`;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    scan({
      enabled: false,
      showToolbar: true,
    });
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ theme = [], direction, isMobile, bannerVisible = false, dynamicTheme }, setSiteState] =
    useLayoutState<SiteState>({
      isMobile: false,
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
      dynamicTheme: undefined,
    });

  const [systemTheme, setSystemTheme] = React.useState<'dark' | 'light'>(() => getSystemTheme());

  const updateSiteConfig = useCallback(
    (props: SiteState) => {
      setSiteState((prev) => ({ ...prev, ...props }));

      // updating `searchParams` will clear the hash
      const oldSearchStr = searchParams.toString();

      let nextSearchParams: URLSearchParams = searchParams;
      Object.entries(props).forEach((kv) => {
        const [key, value] = kv as [string, string];

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
            theme: value,
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
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);

      const urlTheme = searchParams.getAll('theme') as ThemeName[];
      const hasUserColorTheme = urlTheme.includes('dark') || urlTheme.includes('light');
      if (!hasUserColorTheme) {
        setSiteState((prev) => ({
          ...prev,
          theme: [...urlTheme.filter((t) => t !== 'dark' && t !== 'light'), newSystemTheme],
        }));

        document.documentElement.setAttribute(
          'data-prefers-color',
          newSystemTheme === 'dark' ? 'dark' : 'light',
        );
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [searchParams, setSiteState]);

  useEffect(() => {
    const _theme = searchParams.getAll('theme') as ThemeName[];
    const hasUserColorTheme = _theme.includes('dark') || _theme.includes('light');
    const finalTheme = hasUserColorTheme
      ? _theme
      : [..._theme.filter((t) => t !== 'dark' && t !== 'light'), systemTheme];
    const _direction = searchParams.get('direction') as DirectionType;

    setSiteState({
      theme: finalTheme,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
    });
    document.documentElement.setAttribute(
      'data-prefers-color',
      finalTheme.includes('dark') ? 'dark' : 'light',
    );
    // Handle isMobile
    updateMobileMode();

    // 配合 dumi 的 mirror-notify 脚本使用
    const retrieveMirrorNotification = (window as any)[Symbol.for('antd.mirror-notify')];
    if (typeof retrieveMirrorNotification === 'function') {
      retrieveMirrorNotification();
    }

    window.addEventListener('resize', updateMobileMode);
    return () => {
      window.removeEventListener('resize', updateMobileMode);
    };
  }, [systemTheme]);

  const siteContextValue = React.useMemo<SiteContextProps>(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isMobile: isMobile!,
      bannerVisible,
      dynamicTheme,
    }),
    [isMobile, direction, updateSiteConfig, theme, bannerVisible, dynamicTheme],
  );

  const [themeConfig, componentsClassNames] = React.useMemo<
    [ThemeConfig, SimpleComponentClassNames]
  >(() => {
    let mergedTheme = theme;

    const {
      algorithm: dynamicAlgorithm,
      token: dynamicToken,
      ...rawComponentsClassNames
    } = dynamicTheme || {};

    if (dynamicAlgorithm) {
      mergedTheme = mergedTheme.filter((c) => c !== 'dark' && c !== 'light');
      mergedTheme.push(dynamicAlgorithm);
    }

    // Convert rawComponentsClassNames to nextComponentsClassNames
    const nextComponentsClassNames: any = {};
    Object.keys(rawComponentsClassNames).forEach((key) => {
      nextComponentsClassNames[key] = {
        classNames: (rawComponentsClassNames as any)[key],
      };
    });

    return [
      {
        algorithm: getAlgorithm(mergedTheme),
        token: {
          motion: !theme.includes('motion-off'),
          ...dynamicToken,
          // colorBgContainer: 'rgba(255,0,0,0.1)',
        },
        hashed: false,
        zeroRuntime: process.env.NODE_ENV === 'production',
      },
      nextComponentsClassNames,
    ];
  }, [theme, dynamicTheme]);

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

  return (
    <DarkContext value={theme.includes('dark')}>
      <StyleProvider
        cache={styleCache}
        layer
        linters={[legacyNotSelectorLinter, parentSelectorLinter, NaNLinter]}
      >
        <SiteContext value={siteContextValue}>
          <SiteThemeProvider theme={themeConfig}>
            <HappyProvider disabled={!theme.includes('happy-work')}>
              <ConfigProvider {...componentsClassNames}>
                <App>{outlet}</App>
              </ConfigProvider>
            </HappyProvider>
          </SiteThemeProvider>
        </SiteContext>
      </StyleProvider>
    </DarkContext>
  );
};

export default GlobalLayout;
