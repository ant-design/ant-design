import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useGeekTheme from './geekTheme';
import useMuiTheme from './muiTheme';
import useShadcnTheme from './shadcnTheme';

type PreviewThemeConfig = {
  name: string;
  props?: ConfigProviderProps;
};

const locales = {
  cn: {
    default: '默认风格',
    dark: '暗黑风格',
    geek: '极客风格',
    mui: 'MUI 风格',
    shadcn: 'shadcn 风格',
  },
  en: {
    default: 'Default Style',
    dark: 'Dark Style',
    geek: 'Geek Style',
    mui: 'MUI Style',
    shadcn: 'shadcn Style',
  },
};

export type UseTheme = () => ConfigProviderProps;

export default function usePreviewThemes() {
  const [locale] = useLocale(locales);

  const geekTheme = useGeekTheme();
  const muiTheme = useMuiTheme();
  const shadcnTheme = useShadcnTheme();

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
      {
        name: locale.mui,
        props: muiTheme,
      },
      {
        name: locale.shadcn,
        props: shadcnTheme,
      },
    ];
  }, [locale]);
}
