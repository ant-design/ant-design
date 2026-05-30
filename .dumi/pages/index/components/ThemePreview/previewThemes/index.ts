import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useBootstrapTheme from './bootstrapTheme';
import bootstrapThemeSource from './bootstrapTheme.ts?raw';
import useCartoonTheme from './cartoonTheme';
import cartoonThemeSource from './cartoonTheme.ts?raw';
import useGeekTheme from './geekTheme';
import geekThemeSource from './geekTheme.ts?raw';
import useGlassTheme from './glassTheme';
import glassThemeSource from './glassTheme.ts?raw';
import useIllustrationTheme from './illustrationTheme';
import illustrationThemeSource from './illustrationTheme.ts?raw';
import useMuiTheme from './muiTheme';
import muiThemeSource from './muiTheme.ts?raw';
import useShadcnTheme from './shadcnTheme';
import shadcnThemeSource from './shadcnTheme.ts?raw';

export type PreviewThemeConfig = {
  name: string;
  key?: string;
  props?: ConfigProviderProps;
  bgImg?: string;
  bgImgDark?: true;
  copyCode?: string;
  colors?: string[];
};

const locales = {
  cn: {
    default: '默认',
    dark: '暗黑',
    geek: '极客',
    glass: '玻璃',
    mui: 'MUI',
    shadcn: 'shadcn',
    bootstrap: 'Bootstrap',
    cartoon: '卡通',
    illustration: '插画',
  },
  en: {
    default: 'Default',
    dark: 'Dark',
    geek: 'Geek',
    glass: 'Glass',
    mui: 'MUI',
    shadcn: 'shadcn',
    bootstrap: 'Bootstrap',
    cartoon: 'Cartoon',
    illustration: 'Illustration',
  },
};

export type UseTheme = () => ConfigProviderProps;

export default function usePreviewThemes() {
  const [locale] = useLocale(locales);

  const cartoonTheme = useCartoonTheme();
  const illustrationTheme = useIllustrationTheme();
  const geekTheme = useGeekTheme();
  const glassTheme = useGlassTheme();
  const muiTheme = useMuiTheme();
  const shadcnTheme = useShadcnTheme();
  const bootstrapTheme = useBootstrapTheme();

  return React.useMemo<PreviewThemeConfig[]>(() => {
    return [
      {
        icon: 'https://mui.com/static/favicon.svg',
        name: locale.mui,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*IFkZRpIKEEkAAAAAQzAAAAgAegCCAQ/original',
        props: muiTheme,
        copyCode: muiThemeSource,
        colors: ['#1976d2', '#2e7d32'],
      },
      {
        icon: 'https://ui.shadcn.com/favicon.ico',
        name: locale.shadcn,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*56tPQbwgFyEAAAAARuAAAAgAegCCAQ/original',
        props: shadcnTheme,
        copyCode: shadcnThemeSource,
        colors: ['#262626', '#22c55e', '#ef4444'],
      },
      {
        icon: 'https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg',
        name: locale.bootstrap,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ZrLfQIO34x4AAAAAS4AAAAgAegCCAQ/original',
        props: bootstrapTheme,
        copyCode: bootstrapThemeSource,
        colors: ['#1677ff', '#52c41a'],
      },
      {
        name: locale.cartoon,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*tgpBT7vYIUsAAAAAQ-AAAAgAegCCAQ/original',
        props: cartoonTheme,
        copyCode: cartoonThemeSource,
        colors: ['#51463B', '#DA8787'],
      },
      {
        name: locale.illustration,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*HuVGQKqOER0AAAAARsAAAAgAegCCAQ/original',
        props: illustrationTheme,
        copyCode: illustrationThemeSource,
        colors: ['#52C41A', '#FA5252'],
      },
      {
        name: locale.glass,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*PbKXQLie7OAAAAAARTAAAAgAegCCAQ/original',
        bgImgDark: true,
        props: glassTheme,
        copyCode: glassThemeSource,
        colors: ['#1677ff', '#52c41a'],
      },
      {
        name: locale.geek,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*fzA2T4ms154AAAAARtAAAAgAegCCAQ/original',
        bgImgDark: true,
        props: geekTheme,
        copyCode: geekThemeSource,
        colors: ['#39ff14', '#39ff14'],
      },
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
        colors: ['#1677ff', '#52c41a'],
      },
      {
        name: locale.dark,
        key: 'dark',
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ETkNSJ-oUGwAAAAAQ_AAAAgAegCCAQ/original',
        bgImgDark: true,
        props: {
          theme: {
            algorithm: theme.darkAlgorithm,
          },
        },
        colors: ['#141414', '#1f1f1f'],
      },
    ];
  }, [locale]);
}
