import { TinyColor } from '@ctrl/tinycolor';

import type { PresetColorType } from '..';

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

/**
 * 种子是万物起源
 */
export interface SeedToken extends PresetColorType {
  // Color
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorText: string;
  colorTextLightSolid: string;
  colorBg: string;

  // Font
  fontFamily: string;
  fontSizeBase: number;

  // Grid
  gridUnit: number;
  gridBaseStep: number;

  // Line
  lineWidth: number;

  // Motion
  motionUnit: number;
  motionBaseStep: number;
  motionEaseInOutCirc: string;
  motionEaseInOut: string;
  motionEaseOutBack: string;
  motionEaseInQuint: string;
  motionEaseOutQuint: string;

  // Radius
  radiusBase: number;

  // Size
  sizeUnit: number;
  sizeBaseStep: number;
}

const seedToken: SeedToken = {
  // Color
  colorPrimary: '#1890ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1890ff',
  colorText: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  colorTextLightSolid: '#fff',

  colorBg: new TinyColor({ h: 0, s: 0, v: 100 }).toHexString(),

  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontSizeBase: 14,

  // Grid
  gridUnit: 4,
  gridBaseStep: 2,

  // Line
  lineWidth: 1,

  // Motion
  motionUnit: 0.1,
  motionBaseStep: 3,
  motionEaseInOutCirc: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
  motionEaseInOut: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutBack: `cubic-bezier(0.12, 0.4, 0.29, 1.46)`,
  motionEaseInQuint: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutQuint: `cubic-bezier(0.23, 1, 0.32, 1)`,

  // Radius
  radiusBase: 2,

  // Size
  sizeUnit: 4,
  sizeBaseStep: 4,
  // preset color palettes
  ...presetColors,
};

export default seedToken;
