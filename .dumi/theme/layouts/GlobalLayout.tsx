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
import dayjs from 'dayjs';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getBannerData } from '../../pages/index/components/util';
import { ANT_DESIGN_SITE_THEME } from '../common/ThemeSwitch';
import type { ThemeName } from '../common/ThemeSwitch';
import VersionUpgrade from '../common/VersionUpgrade';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SimpleComponentClassNames, SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteConfig'>>;

const RESPONSIVE_MOBILE = 768;

export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';

// Compatible with old anchors
if (typeof window !== 'undefined') {
  const hashId = location.hash.slice(1);
  if (hashId.startsWith('components-')) {
    if (!document.querySelector(`#${hashId}`)) {
      location.hash = `#${hashId.replace(/^components-/, '')}`;
    }
  }
}

const getAlgorithm = (themes: ThemeName[] = [], systemTheme: 'dark' | 'light') =>
  themes
    .map((theme) => {
      // auto 模式下根据系统主题切换
      if (theme === 'auto' && systemTheme === 'dark') {
        return antdTheme.darkAlgorithm;
      }
      if (theme === 'dark') {
        return antdTheme.darkAlgorithm;
      }
      if (theme === 'compact') {
        return antdTheme.compactAlgorithm;
      }
      return null as unknown as MappingAlgorithm;
    })
    .filter(Boolean);

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const isThemeDark = (theme: ThemeName[], systemTheme: 'dark' | 'light') => {
  return theme.includes('dark') || (theme.includes('auto') && systemTheme === 'dark');
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [searchParams, setSearchParams] = useSearchParams();
  const [
    { theme = [], direction, isMobile, bannerVisible = false, dynamicTheme, isDark = false },
    setSiteState,
  ] = useLayoutState<SiteState>({
    isMobile: false,
    direction: 'ltr',
    theme: [],
    isDark: false,
    bannerVisible: false,
    dynamicTheme: undefined,
  });

  const [storedTheme] = useLocalStorage<ThemeName>(ANT_DESIGN_SITE_THEME, {
    defaultValue: undefined,
  });

  const [bannerLastTime] = useLocalStorage<string>(ANT_DESIGN_NOT_SHOW_BANNER, {
    defaultValue: undefined,
  });

  // 获取最终主题（优先级：URL Query > Local Storage > Site (Memory)）
  const getFinalTheme = (urlTheme: ThemeName[]): ThemeName[] => {
    // 只认 light/dark
    const baseTheme = urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t));
    const urlColor = urlTheme.find((t) => t === 'light' || t === 'dark');
    if (urlColor) {
      return [...baseTheme, urlColor];
    }
    if (['light', 'dark', 'auto'].includes(storedTheme)) {
      return [...baseTheme, storedTheme];
    }
    return [...baseTheme, 'auto'];
  };

  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(() => getSystemTheme());

  const bannerData = getBannerData();

  const updateSiteConfig = useCallback(
    (props: SiteState) => {
      setSiteState((prev) => ({ ...prev, ...props }));

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
          const arr = Array.isArray(value) ? value : [value];
          const base = arr.filter((t) => !['light', 'dark', 'auto'].includes(t));
          const color = arr.find((t) => t === 'light' || t === 'dark');
          if (color) {
            nextSearchParams = createSearchParams({ ...nextSearchParams, theme: [...base, color] });
          } else {
            nextSearchParams.delete('theme');
          }
        }
      });

      if (nextSearchParams.toString() !== oldSearchStr) {
        setSearchParams(nextSearchParams);
      }
    },

    [searchParams, setSearchParams],
  );

  const updateMobileMode = useCallback(() => {
    updateSiteConfig({ isMobile: window.innerWidth < RESPONSIVE_MOBILE });
  }, [updateSiteConfig]);

  // 设置 data-prefers-color 属性和 isDark 状态
  useEffect(() => {
    const color = theme.find((t) => t === 'light' || t === 'dark');
    const html = document.querySelector<HTMLHtmlElement>('html');
    if (theme.includes('auto') && systemTheme) {
      html?.setAttribute('data-prefers-color', systemTheme);
    } else if (color) {
      html?.setAttribute('data-prefers-color', color);
    }

    setSiteState((prev) => ({ ...prev, isDark: isThemeDark(theme, systemTheme) }));
  }, [systemTheme, theme]);

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // 主题初始化
  useEffect(() => {
    const urlTheme = searchParams.getAll('theme') as ThemeName[];
    const finalTheme = getFinalTheme(urlTheme);
    const _direction = searchParams.get('direction') as DirectionType;
    const _isDark = isThemeDark(finalTheme, systemTheme);

    const storedBannerVisible = bannerLastTime && dayjs().diff(dayjs(bannerLastTime), 'day') >= 1;

    const isZhCN = typeof window !== 'undefined' && window.location.pathname.includes('-cn');

    const hasBannerContent = isZhCN && !!bannerData;

    setSiteState({
      theme: finalTheme,
      isDark: _isDark,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
      bannerVisible: hasBannerContent && (bannerLastTime ? !!storedBannerVisible : true),
    });

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
  }, [searchParams, updateMobileMode]);

  const siteContextValue = React.useMemo<SiteContextProps>(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isDark: isDark!,
      isMobile: isMobile!,
      bannerVisible,
      dynamicTheme,
    }),
    [isMobile, direction, updateSiteConfig, theme, isDark, bannerVisible, dynamicTheme],
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
        algorithm: getAlgorithm(mergedTheme, systemTheme),
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
  }, [theme, dynamicTheme, systemTheme]);

  const styleCache = React.useMemo(() => createCache(), []);

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
    <DarkContext value={isDark}>
      <StyleProvider
        cache={styleCache}
        layer
        linters={[legacyNotSelectorLinter, parentSelectorLinter, NaNLinter]}
      >
        <SiteContext value={siteContextValue}>
          <SiteThemeProvider theme={themeConfig}>
            <HappyProvider disabled={!theme.includes('happy-work')}>
              <ConfigProvider {...componentsClassNames}>
                <App>
                  {outlet}
                  <VersionUpgrade />
                </App>
              </ConfigProvider>
            </HappyProvider>
          </SiteThemeProvider>
        </SiteContext>
      </StyleProvider>
    </DarkContext>
  );
};

export default GlobalLayout;
