import { FastColor } from '@ant-design/fast-color';

export const getAsSolidColor = (color: string, background: string) => {
  if (color?.startsWith('var(') || background?.startsWith('var(')) {
    return color;
  }
  return new FastColor(color).onBackground(background).toHexString();
};
