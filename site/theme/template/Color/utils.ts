import { HsvColor, RgbColor } from 'react-colorful';

const primaryMinSaturation = 70; // 主色推荐最小饱和度
const primaryMinBrightness = 70; // 主色推荐最小亮度

export const hexToRgb = (hex: string): RgbColor => {
  if (hex[0] === '#') hex = hex.substr(1);

  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16),
  };
};

export const rgbToHsv = ({ r, g, b }: RgbColor): HsvColor => {
  let hh;
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  if (delta === 0) {
    hh = 0;
  } else if (r === max) {
    hh = (g - b) / delta;
  } else if (g === max) {
    hh = 2 + (b - r) / delta;
  } else {
    hh = 4 + (r - g) / delta;
  }

  return {
    h: Math.round(60 * (hh < 0 ? hh + 6 : hh)),
    s: Math.round(max ? (delta / max) * 100 : 0),
    v: Math.round((max / 255) * 100),
  };
};

export const validateColor = (color: string) => {
  const { s, v } = rgbToHsv(hexToRgb(color));
  const errors = [];

  if (s < primaryMinSaturation) {
    errors.push(`饱和度建议不低于${primaryMinSaturation}（现在 ${s.toFixed(2)})`);
  }
  if (v < primaryMinBrightness) {
    errors.push(`亮度建议不低于${primaryMinBrightness}（现在 ${v.toFixed(2)})`);
  }

  return errors.join(' ');
};
