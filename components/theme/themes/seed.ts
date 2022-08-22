import type { PresetColorType, SeedToken } from '..';

export const defaultPresetColors: PresetColorType = {
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

const seedToken: SeedToken = {
  // preset color palettes
  ...defaultPresetColors,

  // Color
  colorPrimary: '#1890ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1890ff',
  colorTextBase: '',
  colorTextLightSolid: '#fff',

  colorBgBase: '',

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
  lineType: 'solid',

  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: `cubic-bezier(0.08, 0.82, 0.17, 1)`,
  motionEaseInOutCirc: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseInOut: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutBack: `cubic-bezier(0.12, 0.4, 0.29, 1.46)`,
  motionEaseInQuint: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutQuint: `cubic-bezier(0.23, 1, 0.32, 1)`,

  // Radius
  radiusBase: 6,

  // Size
  sizeUnit: 4,
  sizeBaseStep: 4,
  sizePopupArrow: 8 * Math.sqrt(2),

  // Control Base
  controlHeight: 32,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,

  // Image
  opacityImage: 1,
};
export default seedToken;
