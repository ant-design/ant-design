import React from 'react';
import type { ConfigProviderProps, ThemeConfig } from 'antd';
import { theme } from 'antd';

import useLocale from '../../../../../hooks/useLocale';
import useBlossomTheme from './blossomTheme';
import blossomThemeSource from './blossomTheme.ts?raw';
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
import useLarkTheme from './larkTheme';
import larkThemeSource from './larkTheme.ts?raw';
import useMuiTheme from './muiTheme';
import muiThemeSource from './muiTheme.ts?raw';
import useShadcnTheme from './shadcnTheme';
import shadcnThemeSource from './shadcnTheme.ts?raw';
import useV4Theme from './v4Theme';
import v4ThemeSource from './v4Theme.ts?raw';
import sereneIcon from './assets/serene-icon.svg';
import useSereneTheme from './sereneTheme';
import sereneThemeSource from './sereneTheme.ts?raw';

export type PreviewThemeConfig = {
  icon?: string;
  name: string;
  key?: string;
  props?: ConfigProviderProps;
  bgImg?: string;
  bgImgDark?: boolean;
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
    lark: '知识协作',
    blossom: '桃花缘',
    v4: 'Ant Design V4',
    serene: '静谧',
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
    lark: 'Document',
    blossom: 'Blossom',
    v4: 'Ant Design V4',
    serene: 'Serene',
  },
};

export type UseTheme = () => ConfigProviderProps;

export const DEFAULT_COLOR = '#1677FF';
export const PINK_COLOR = '#ED4192';

const previewThemeComponents: NonNullable<ThemeConfig['components']> = {
  Layout: {
    bodyBg: '#f5f8ff',
    footerBg: '#f5f8ff',
    headerBg: '#ffffff',
    headerColor: 'rgba(0, 0, 0, 0.88)',
    siderBg: '#ffffff',
    triggerBg: '#f0f5ff',
    triggerColor: 'rgba(0, 0, 0, 0.88)',
  },
  Menu: {
    activeBarBorderWidth: 0,
    itemBg: 'transparent',
    subMenuItemBg: 'transparent',
  },
  Button: {},
  Alert: {},
  Modal: {},
  Card: {},
  Tooltip: {},
  Checkbox: {},
  Radio: {},
  Select: {},
  Input: {},
  Switch: {},
  Progress: {
    circleTextColor: 'rgba(0, 0, 0, 0.88)',
    defaultColor: DEFAULT_COLOR,
    remainingColor: 'rgba(0, 0, 0, 0.06)',
  },
  Steps: {},
  Slider: {},
  ColorPicker: {},
  Notification: {},
};

const darkPreviewLayoutToken: NonNullable<ThemeConfig['components']>['Layout'] = {
  bodyBg: '#050505',
  footerBg: '#050505',
  headerBg: '#111111',
  headerColor: 'rgba(255, 255, 255, 0.88)',
  siderBg: '#050505',
  triggerBg: '#111111',
  triggerColor: 'rgba(255, 255, 255, 0.88)',
};

const darkPreviewMenuToken: NonNullable<ThemeConfig['components']>['Menu'] = {
  darkItemBg: 'transparent',
  darkItemColor: 'rgba(255, 255, 255, 0.68)',
  darkItemHoverBg: 'rgba(255, 255, 255, 0.08)',
  darkItemHoverColor: '#fff',
  darkItemSelectedBg: 'rgba(22, 119, 255, 0.28)',
  darkItemSelectedColor: '#fff',
  darkSubMenuItemBg: 'transparent',
};

const darkPreviewProgressToken: NonNullable<ThemeConfig['components']>['Progress'] = {
  circleTextColor: 'rgba(255, 255, 255, 0.88)',
  defaultColor: DEFAULT_COLOR,
  remainingColor: 'rgba(255, 255, 255, 0.12)',
};

const isDarkAlgorithm = (algorithm: ThemeConfig['algorithm']) => {
  const algorithms = Array.isArray(algorithm) ? algorithm : algorithm ? [algorithm] : [];

  return algorithms.includes(theme.darkAlgorithm);
};

const getBasePreviewThemeProps = (algorithm: ThemeConfig['algorithm']): ConfigProviderProps => ({
  theme: {
    algorithm,
    components: isDarkAlgorithm(algorithm)
      ? {
          ...previewThemeComponents,
          Layout: darkPreviewLayoutToken,
          Menu: darkPreviewMenuToken,
          Progress: darkPreviewProgressToken,
        }
      : previewThemeComponents,
  },
  wave: {},
  app: {},
  card: {},
  modal: {},
  button: {},
  alert: {},
  colorPicker: {},
  checkbox: {},
  dropdown: {},
  select: {},
  datePicker: {},
  input: {},
  inputNumber: {},
  popover: {},
  tooltip: {},
  notification: {},
  switch: {},
  radio: {},
  segmented: {},
  progress: {},
});

const usePreviewThemes = () => {
  const [locale] = useLocale(locales);

  const larkTheme = useLarkTheme();
  const blossomTheme = useBlossomTheme();
  const v4Theme = useV4Theme();
  const cartoonTheme = useCartoonTheme();
  const illustrationTheme = useIllustrationTheme();
  const geekTheme = useGeekTheme();
  const glassTheme = useGlassTheme();
  const muiTheme = useMuiTheme();
  const shadcnTheme = useShadcnTheme();
  const bootstrapTheme = useBootstrapTheme();
  const sereneTheme = useSereneTheme();

  return React.useMemo<PreviewThemeConfig[]>(() => {
    return [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        name: locale.default,
        key: 'light',
        bgImg:
          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*T8IlRaNez08AAAAARwAAAAgAegCCAQ/original',
        props: getBasePreviewThemeProps(theme.defaultAlgorithm),
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
        props: getBasePreviewThemeProps(theme.darkAlgorithm),
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
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/3e899b2b-4eb4-4771-a7fc-14c7ff078aed.svg',
        name: locale.lark,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*iM6CQ496P3oAAAAAAAAAAAAADrJ8AQ/fmt.webp',
        props: larkTheme,
        copyCode: larkThemeSource,
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/ed9b04e8-9b8d-4945-8f8a-c8fc025e846f.svg',
        name: locale.blossom,
        bgImg:
          'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*s5OdR6wZZIkAAAAAAAAAAAAADrJ8AQ/fmt.webp',
        props: blossomTheme,
        copyCode: blossomThemeSource,
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bOiWT4-34jkAAAAAAAAAAAAADrJ8AQ/original',
        name: locale.v4,
        props: v4Theme,
        copyCode: v4ThemeSource,
      },
      {
        name: locale.serene,
        icon: sereneIcon,
        props: sereneTheme,
        copyCode: sereneThemeSource,
      },
    ];
  }, [locale]);
};

export default usePreviewThemes;
