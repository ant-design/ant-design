import React from 'react';
import type { ConfigProviderProps } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useBootstrapTheme from './bootstrapTheme';
import useCartoonTheme from './cartoonTheme';
import useGeekTheme from './geekTheme';
import useGlassTheme from './glassTheme';
import useIllustrationTheme from './illustrationTheme';
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
    mui: '类 MUI 风格',
    shadcn: '类 shadcn 风格',
    bootstrap: '类 Bootstrap 拟物化风格',
    cartoon: '卡通风格',
    illustration: '插画风格',
  },
  en: {
    default: 'Default Style',
    dark: 'Dark Style',
    geek: 'Geek Style',
    glass: 'Glass Style',
    mui: 'MUI-like Style',
    shadcn: 'shadcn-like Style',
    bootstrap: 'Bootstrap Skeuomorphism',
    cartoon: 'Cartoon Style',
    illustration: 'Illustration Style',
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
        name: locale.cartoon,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*tgpBT7vYIUsAAAAAQ-AAAAgAegCCAQ/original',
        props: cartoonTheme,
      },
      {
        name: locale.illustration,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*HuVGQKqOER0AAAAARsAAAAgAegCCAQ/original',
        props: illustrationTheme,
      },
      {
        name: locale.bootstrap,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ZrLfQIO34x4AAAAAS4AAAAgAegCCAQ/original',
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
