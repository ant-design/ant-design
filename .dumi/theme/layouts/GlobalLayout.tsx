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
import { isLocalStorageNameSupported } from '../utils';

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;
export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';

// 主题持久化存储键名
const ANT_DESIGN_SITE_THEME = 'ant-design-site-theme';

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

// 获取最终主题（优先级：URL Query > Local Storage > Site (Memory)）
const getFinalTheme = (urlTheme: ThemeName[]): ThemeName[] => {
  // 只认 light/dark
  const baseTheme = urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t));
  const urlColor = urlTheme.find((t) => t === 'light' || t === 'dark');
  if (urlColor) return [...baseTheme, urlColor];

  if (isLocalStorageNameSupported()) {
    const stored = localStorage.getItem(ANT_DESIGN_SITE_THEME) as ThemeName;
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      return [...baseTheme, stored];
    }
  }
  // 默认 auto
  return [...baseTheme, 'auto'];
};

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
          // 设置 data-prefers-color
          if (color) {
            document.querySelector('html')?.setAttribute('data-prefers-color', color);
          }
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

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {};

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

    setSiteState({
      theme: finalTheme,
      direction: _direction === 'rtl' ? 'rtl' : 'ltr',
    });

    // 设置 data-prefers-color 属性
    const colorTheme = finalTheme.find((t) => ['light', 'dark'].includes(t));
    if (colorTheme) {
      document.documentElement.setAttribute('data-prefers-color', colorTheme);
    }

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
  }, [searchParams]);

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
