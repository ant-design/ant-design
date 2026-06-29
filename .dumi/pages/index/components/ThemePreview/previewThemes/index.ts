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
    default: 'Ant Design',
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
    default: 'Ant Design',
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
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
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
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*LuUWTKWMy34AAAAAFvAAAAgAegCCAQ/original',
        name: locale.mui,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*IFkZRpIKEEkAAAAAQzAAAAgAegCCAQ/original',
        props: muiTheme,
        copyCode: muiThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*X-rDQY7JQ-oAAAAAFVAAAAgAegCCAQ/original',
        name: locale.shadcn,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*56tPQbwgFyEAAAAARuAAAAgAegCCAQ/original',
        props: shadcnTheme,
        copyCode: shadcnThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*V0RKS7vJxqEAAAAAQBAAAAgAegCCAQ/original',
        name: locale.bootstrap,
        props: bootstrapTheme,
        copyCode: bootstrapThemeSource,
      },
      {
        name: locale.cartoon,
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*fLjhR5tqNIwAAAAAN9AAAAgAegCCAQ/original',
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*tgpBT7vYIUsAAAAAQ-AAAAgAegCCAQ/original',
        props: cartoonTheme,
        copyCode: cartoonThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*rjPZR5DHPO0AAAAAQBAAAAgAegCCAQ/original',
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
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*Tm6ESY5h6ZgAAAAAQBAAAAgAegCCAQ/original',
        name: locale.illustration,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*HuVGQKqOER0AAAAARsAAAAgAegCCAQ/original',
        props: illustrationTheme,
        copyCode: illustrationThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*GF9US7qG8tAAAAAAQCAAAAgAegCCAQ/original',
        name: locale.glass,
        // bgImg:
        //   'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*PbKXQLie7OAAAAAARTAAAAgAegCCAQ/original',
        props: glassTheme,
        copyCode: glassThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*MsjGSYbZ6xkAAAAAQCAAAAgAegCCAQ/original',
        name: locale.geek,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*fzA2T4ms154AAAAARtAAAAgAegCCAQ/original',
        bgImgDark: true,
        props: geekTheme,
        copyCode: geekThemeSource,
      },
    ];
  }, [locale]);
}
