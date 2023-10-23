import type { ColorGenInput } from '@rc-component/color-picker';
import type { Color } from './color';
import { ColorFactory } from './color';

export const customizePrefixCls = 'ant-color-picker';

export const generateColor = (color: ColorGenInput<Color>): Color => {
  if (color instanceof ColorFactory) {
    return color;
  }
  return new ColorFactory(color);
};

export const getRoundNumber = (value: number) => Math.round(Number(value || 0));

export const getAlphaColor = (color: Color) => getRoundNumber(color.toHsb().a * 100);

export const genAlphaColor = (color: Color, alpha?: number) => {
  const hsba = color.toHsb();
  hsba.a = alpha || 1;
  return generateColor(hsba);
};
