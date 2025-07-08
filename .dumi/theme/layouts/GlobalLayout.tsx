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

import '@ant-design/v5-patch-for-react-19';

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
type SiteState = Partial<Omit<SiteContextProps, 'updateSiteContext'>>;

const RESPONSIVE_MOBILE = 768;
export const ANT_DESIGN_NOT_SHOW_BANNER = 'ANT_DESIGN_NOT_SHOW_BANNER';
export const ANT_DESIGN_THEME_PREFERENCE = 'ANT_DESIGN_THEME_PREFERENCE';

const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getUserThemePreference = (): 'dark' | 'light' | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const saved = localStorage.getItem(ANT_DESIGN_THEME_PREFERENCE);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // localStorage might not be available
  }
  return null;
};

const setUserThemePreference = (theme: 'dark' | 'light') => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(ANT_DESIGN_THEME_PREFERENCE, theme);
  } catch {
    // localStorage might not be available
  }
};

const clearUserThemePreference = () => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(ANT_DESIGN_THEME_PREFERENCE);
  } catch {
    // localStorage might not be available
  }
};

export { clearUserThemePreference };

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
  const [{ theme = [], direction, isMobile, bannerVisible = false }, setSiteState] =
    useLayoutState<SiteState>({
      isMobile: false,
      direction: 'ltr',
      theme: [],
      bannerVisible: false,
    });

  const [systemTheme, setSystemTheme] = React.useState<'dark' | 'light'>(() => getSystemTheme());
  const [userThemePreference, setUserThemePreferenceState] = React.useState<'dark' | 'light' | null>(() => getUserThemePreference());

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

          // Save user theme preference when they explicitly change light/dark theme
          const hasUserColorTheme = value.includes('dark') || value.includes('light');
          if (hasUserColorTheme) {
            const themePreference = value.includes('dark') ? 'dark' : 'light';
            setUserThemePreference(themePreference);
            setUserThemePreferenceState(themePreference);
          }

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
      // Only auto-switch if user hasn't explicitly set a preference AND there's no theme in URL
      if (!hasUserColorTheme && userThemePreference === null) {
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
  }, [searchParams, setSiteState, userThemePreference]);

  useEffect(() => {
    const _theme = searchParams.getAll('theme') as ThemeName[];
    const hasUserColorTheme = _theme.includes('dark') || _theme.includes('light');
    
    let finalTheme: ThemeName[];
    if (hasUserColorTheme) {
      // Use theme from URL if explicitly set
      finalTheme = _theme;
    } else if (userThemePreference) {
      // Use saved user preference if available
      finalTheme = [..._theme.filter((t) => t !== 'dark' && t !== 'light'), userThemePreference];
    } else {
      // Fall back to system theme only if no user preference exists
      finalTheme = [..._theme.filter((t) => t !== 'dark' && t !== 'light'), systemTheme];
    }
    
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
  }, [systemTheme, userThemePreference]);

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
