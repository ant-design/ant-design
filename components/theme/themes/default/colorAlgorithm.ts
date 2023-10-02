import { TinyColor } from '@ctrl/tinycolor';

export const getAlphaColor = (baseColor: string, alpha: number) =>
  new TinyColor(baseColor).setAlpha(alpha).toRgbString();

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};
