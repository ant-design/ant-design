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
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import type { MappingAlgorithm } from 'antd';
import type { DirectionType, ThemeConfig } from 'antd/es/config-provider';
import dayjs from 'dayjs';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useIsMobile from '../../hooks/useIsMobile';
import useLayoutState from '../../hooks/useLayoutState';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getBannerData } from '../../pages/index/components/util';
import { ANT_DESIGN_SITE_THEME } from '../common/ThemeSwitch';
import type { ThemeName } from '../common/ThemeSwitch';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SimpleComponentClassNames, SiteContextProps, SiteState } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';

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

const isColorTheme = (value?: string) => {
  return value === 'light' || value === 'dark' || value === 'auto';
};

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
  const isMobile = useIsMobile();
  const [{ theme = [], direction, bannerVisible = false, dynamicTheme }, setSiteState] =
    useLayoutState<SiteState>({
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
      dynamicTheme: undefined,
    });

  const [storedTheme] = useLocalStorage<ThemeName | undefined>(ANT_DESIGN_SITE_THEME, {
    initialValue: undefined,
  });

  const [bannerLastTime] = useLocalStorage<string | undefined>(ANT_DESIGN_NOT_SHOW_BANNER, {
    initialValue: undefined,
  });

  // 颜色模式优先级：URL Query > Local Storage > auto。
  const urlColor = searchParams.getAll('theme').find((t) => t === 'light' || t === 'dark');

  const colorTheme = urlColor || (isColorTheme(storedTheme) ? storedTheme : 'auto');

  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(() => getSystemTheme());
  const isDark = isThemeDark(theme, systemTheme);

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

  // 设置 data-prefers-color 属性
  useEffect(() => {
    const color = theme.find((t) => t === 'light' || t === 'dark');
    const html = document.querySelector<HTMLHtmlElement>('html');
    if (theme.includes('auto') && systemTheme) {
      html?.setAttribute('data-prefers-color', systemTheme);
    } else if (color) {
      html?.setAttribute('data-prefers-color', color);
    }
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
    const _direction = searchParams.get('direction') as DirectionType;

    const storedBannerVisible = bannerLastTime && dayjs().diff(dayjs(bannerLastTime), 'day') >= 1;

    const isZhCN = typeof window !== 'undefined' && window.location.pathname.includes('-cn');

    const hasBannerContent = isZhCN && !!bannerData;

    setSiteState((prev) => ({
      ...prev,
      theme: [
        ...urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t)),
        ...(prev.theme || []).filter((t) => ['light', 'dark', 'auto'].includes(t)),
      ],
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
      bannerVisible: hasBannerContent && (bannerLastTime ? !!storedBannerVisible : true),
    }));

    // 配合 dumi 的 mirror-notify 脚本使用
    const retrieveMirrorNotification = (window as any)[Symbol.for('antd.mirror-notify')];
    if (typeof retrieveMirrorNotification === 'function') {
      retrieveMirrorNotification();
    }
  }, [bannerData, bannerLastTime, searchParams]);

  // 颜色偏好变化只更新颜色模式，保留动态主题和当前的其他主题设置。
  useEffect(() => {
    setSiteState((prev) => ({
      ...prev,
      theme: [
        ...(prev.theme || []).filter((t) => !['light', 'dark', 'auto'].includes(t)),
        colorTheme,
      ],
    }));
  }, [colorTheme]);

  const siteContextValue = React.useMemo<SiteContextProps>(
    () => ({
      direction,
      updateSiteConfig,
      theme: theme!,
      isDark: isDark!,
      isMobile,
      bannerVisible,
      dynamicTheme,
    }),
    [isMobile, direction, updateSiteConfig, theme, isDark, bannerVisible, dynamicTheme],
  );

  const [themeConfig, componentsClassNames] = React.useMemo<
    [ThemeConfig, SimpleComponentClassNames]
  >(() => {
    const mergedTheme = theme;

    // Ignore `algorithm` from AI-generated theme to preserve user's dark/light preference
    const {
      algorithm: _dynamicAlgorithm,
      token: dynamicToken,
      ...rawComponentsClassNames
    } = dynamicTheme || {};

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
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

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
