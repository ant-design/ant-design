import type { ColorGenInput } from '@rc-component/color-picker';

import { AggregationColor } from './color';

export const generateColor = (color: ColorGenInput<AggregationColor>): AggregationColor => {
  if (color instanceof AggregationColor) {
    return color;
  }
  return new AggregationColor(color);
};

export const getRoundNumber = (value: number) => Math.round(Number(value || 0));

export const getAlphaColor = (color: AggregationColor) => getRoundNumber(color.toHsb().a * 100);

export const genAlphaColor = (color: AggregationColor, alpha?: number) => {
  const hsba = color.toHsb();
  hsba.a = alpha || 1;
  return generateColor(hsba);
};
