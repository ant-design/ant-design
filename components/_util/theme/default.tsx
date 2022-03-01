import { TinyColor } from '@ctrl/tinycolor';
import type { DesignToken } from '.';

const defaultDesignToken: DesignToken = {
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',

  // https://github.com/ant-design/ant-design/issues/20210
  lineHeight: 1.5715,

  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 2,
  borderColor: new TinyColor({ h: 0, s: 0, v: 85 }).toHexString(),

  easeInOut: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  easeOutBack: `cubic-bezier(0.12, 0.4, 0.29, 1.46)`,

  fontSize: 14,
  textColor: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  textColorDisabled: new TinyColor('#000').setAlpha(0.25).toRgbString(),

  height: 32,

  padding: 16,
  margin: 16,

  background: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),
  componentBackground: '#fff',
  componentBackgroundDisabled: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

  duration: 0.3,
};

export default defaultDesignToken;
