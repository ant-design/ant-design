import { TinyColor } from '@ctrl/tinycolor';

import type { DesignToken, PresetColorType } from '.';

const presetColors: PresetColorType = {
  blue: '#1890FF',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
};

const defaultDesignToken: DesignToken = {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1890ff',

  // https://github.com/ant-design/ant-design/issues/20210
  lineHeight: 1.5715,

  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 2,
  borderColor: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),
  borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(),

  easeInOut: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  easeInOutCirc: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
  easeOutBack: `cubic-bezier(0.12, 0.4, 0.29, 1.46)`,
  easeInQuint: `cubic-bezier(0.755, 0.05, 0.855, 0.06)`,
  easeOutQuint: `cubic-bezier(0.23, 1, 0.32, 1)`,

  outlineWidth: 2,
  outlineBlurSize: 0,

  fontSize: 14,
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji'`,
  textColor: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  textColorSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(),
  textColorDisabled: new TinyColor('#000').setAlpha(0.25).toRgbString(),
  textColorInverse: '#fff',
  placeholderColor: new TinyColor({ h: 0, s: 0, v: 75 }).setAlpha(0.5).toRgbString(),

  headingColor: new TinyColor('#000').setAlpha(0.85).toRgbString(),

  iconColorHover: new TinyColor('#000').setAlpha(0.75).toRgbString(),

  itemHoverBackground: '#f5f5f5',

  controlHeight: 32,

  padding: 16,
  margin: 16,

  // Default grey background color
  background: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

  // background of header and selected item
  backgroundLight: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(),

  componentBackground: '#fff',
  componentBackgroundDisabled: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

  duration: 0.3,

  zIndexDropdown: 1050,

  // preset color palettes
  ...presetColors,
};

export default defaultDesignToken;
