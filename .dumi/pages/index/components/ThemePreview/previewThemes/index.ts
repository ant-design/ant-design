import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useBootstrapTheme from './bootstrapTheme';
import useGeekTheme from './geekTheme';
import useGlassTheme from './glassTheme';
import useMuiTheme from './muiTheme';
import useShadcnTheme from './shadcnTheme';

type PreviewThemeConfig = {
  name: string;
  key?: string;
  props?: ConfigProviderProps;
  bgImg?: string;
  bgImgDark?: true;
};

const locales = {
  cn: {
    default: '默认风格',
    dark: '暗黑风格',
    geek: '极客风格',
    glass: '玻璃风格',
    mui: 'MUI 风格',
    shadcn: 'shadcn 风格',
    bootstrap: '老派风格',
  },
  en: {
    default: 'Default Style',
    dark: 'Dark Style',
    geek: 'Geek Style',
    glass: 'Glass Style',
    mui: 'MUI Style',
    shadcn: 'shadcn Style',
    bootstrap: 'Old School Style',
  },
};

export type UseTheme = () => ConfigProviderProps;

export default function usePreviewThemes() {
  const [locale] = useLocale(locales);

  const geekTheme = useGeekTheme();
  const glassTheme = useGlassTheme();
  const muiTheme = useMuiTheme();
  const shadcnTheme = useShadcnTheme();
  const bootstrapTheme = useBootstrapTheme();

  return React.useMemo<PreviewThemeConfig[]>(() => {
    return [
      {
        name: locale.default,
        key: 'light',
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*T8IlRaNez08AAAAARwAAAAgAegCCAQ/original',
        props: {
          theme: {
            algorithm: theme.defaultAlgorithm,
          },
        },
      },
      {
        name: locale.dark,
        key: 'dark',
        dark: true,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ETkNSJ-oUGwAAAAAQ_AAAAgAegCCAQ/original',
        bgImgDark: true,
        props: {
          theme: {
            algorithm: theme.darkAlgorithm,
          },
        },
      },
      {
        name: locale.mui,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*IFkZRpIKEEkAAAAAQzAAAAgAegCCAQ/original',
        props: muiTheme,
      },
      {
        name: locale.shadcn,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*56tPQbwgFyEAAAAARuAAAAgAegCCAQ/original',
        props: shadcnTheme,
      },
      {
        name: locale.bootstrap,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ZrLfQIO34x4AAAAAS4AAAAgAegCCAQ/original',
        // bgImgDark: true,
        props: bootstrapTheme,
      },
      {
        name: locale.glass,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*PbKXQLie7OAAAAAARTAAAAgAegCCAQ/original',
        bgImgDark: true,
        props: glassTheme,
      },
      {
        name: locale.geek,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*fzA2T4ms154AAAAARtAAAAgAegCCAQ/original',
        bgImgDark: true,
        props: geekTheme,
      },
    ];
  }, [locale]);
}
