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
import { theme as antdTheme, App } from 'antd';
import type { MappingAlgorithm } from 'antd';
import type { DirectionType, ThemeConfig } from 'antd/es/config-provider';
import { createSearchParams, useOutlet, useSearchParams, useServerInsertedHTML } from 'dumi';

import { DarkContext } from '../../hooks/useDark';
import useLayoutState from '../../hooks/useLayoutState';
import type { ThemeName } from '../common/ThemeSwitch';
import SiteThemeProvider from '../SiteThemeProvider';
import type { SiteContextProps } from '../slots/SiteContext';
import SiteContext from '../slots/SiteContext';
import { isLocalStorageNameSupported } from '../utils';

import '@ant-design/v5-patch-for-react-19';

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteConfig'>>;

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

// 获取系统主题
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// 获取最终主题（优先级：URL Query > Local Storage > Site (Memory)）
const getFinalTheme = (urlTheme: ThemeName[], systemTheme: 'dark' | 'light'): ThemeName[] => {
  // 1. 优先使用 URL 中的主题设置
  const urlColorTheme = urlTheme.find((t) => ['light', 'dark', 'auto'].includes(t));
  if (urlColorTheme) {
    if (urlColorTheme === 'auto') {
      // auto 模式：使用系统主题
      return [...urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t)), systemTheme];
    }
    return urlTheme;
  }

  // 2. 从 localStorage 读取
  if (isLocalStorageNameSupported()) {
    const storedTheme = localStorage.getItem(ANT_DESIGN_SITE_THEME) as ThemeName;
    if (storedTheme && ['light', 'dark', 'auto'].includes(storedTheme)) {
      if (storedTheme === 'auto') {
        // auto 模式：使用系统主题
        return [...urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t)), systemTheme];
      }
      return [...urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t)), storedTheme];
    }
  }

  // 3. 默认使用系统主题
  return [...urlTheme.filter((t) => !['light', 'dark', 'auto'].includes(t)), systemTheme];
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ theme = [], direction, isMobile, bannerVisible = false }, setSiteState] =
    useLayoutState<SiteState>({
      isMobile: false,
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
    });

  const [systemTheme, setSystemTheme] = React.useState<'dark' | 'light'>(() => getSystemTheme());

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
            theme: value,
          });

          // 设置 data-prefers-color 属性
          const colorTheme = value.find((t) => ['light', 'dark'].includes(t));
          if (colorTheme) {
            document.querySelector('html')?.setAttribute('data-prefers-color', colorTheme);
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
    const finalTheme = getFinalTheme(urlTheme, systemTheme);
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
  }, [searchParams, systemTheme]);

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

  return (
    <DarkContext value={theme.includes('dark')}>
      <StyleProvider
        cache={styleCache}
        linters={[legacyNotSelectorLinter, parentSelectorLinter, NaNLinter]}
      >
        <SiteContext value={siteContextValue}>
          <SiteThemeProvider theme={themeConfig}>
            <HappyProvider disabled={!theme.includes('happy-work')}>
              <App>{outlet}</App>
            </HappyProvider>
          </SiteThemeProvider>
        </SiteContext>
      </StyleProvider>
    </DarkContext>
  );
};

export default GlobalLayout;
