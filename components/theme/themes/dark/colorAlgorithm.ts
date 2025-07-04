import { FastColor } from '@ant-design/fast-color';

export const getAlphaColor = (baseColor: string, alpha: number) =>
  new FastColor(baseColor).setA(alpha).toRgbString();

export const getSolidColor = (baseColor: string, brightness: number) => {
  const instance = new FastColor(baseColor);
  return instance.lighten(brightness).toHexString();
};
