import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../hooks/useLocale';

type PreviewThemeConfig = {
  name: string;
  props?: ConfigProviderProps;
};

const locales = {
  cn: {
    default: '默认主题',
    dark: '暗黑主题',
  },
  en: {
    default: 'Default Theme',
    dark: 'Dark Theme',
  },
};

export default function usePreviewThemes() {
  const [locale] = useLocale(locales);

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
    ];
  }, [locale]);
}
