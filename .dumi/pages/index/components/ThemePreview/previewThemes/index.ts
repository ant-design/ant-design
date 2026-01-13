import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useGeekTheme from './geekTheme';

type PreviewThemeConfig = {
  name: string;
  props?: ConfigProviderProps;
};

const locales = {
  cn: {
    default: '默认主题',
    dark: '暗黑主题',
    geek: '极客主题',
  },
  en: {
    default: 'Default Theme',
    dark: 'Dark Theme',
    geek: 'Geek Theme',
  },
};

export type UseTheme = () => ConfigProviderProps;

export default function usePreviewThemes() {
  const [locale] = useLocale(locales);

  const geekTheme = useGeekTheme();

  return React.useMemo<PreviewThemeConfig[]>(() => {
    return [
      {
        name: locale.default,
      },
      {
        name: locale.dark,
        props: {
          theme: {
            algorithm: theme.darkAlgorithm,
          },
        },
      },
      {
        name: locale.geek,
        props: geekTheme,
      },
    ];
  }, [locale]);
}
