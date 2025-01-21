import type { ColorGenInput } from '@rc-component/color-picker';
import { Color as RcColor } from '@rc-component/color-picker';

import { AggregationColor } from './color';
import type { ColorValueType } from './interface';

export const generateColor = (
  color: ColorGenInput<AggregationColor> | Exclude<ColorValueType, null>,
): AggregationColor => {
  if (color instanceof AggregationColor) {
    return color;
  }
  return new AggregationColor(color);
};

export const getRoundNumber = (value: number) => Math.round(Number(value || 0));

export const getColorAlpha = (color: AggregationColor) => getRoundNumber(color.toHsb().a * 100);

/** Return the color whose `alpha` is 1 */
export const genAlphaColor = (color: AggregationColor, alpha?: number) => {
  const rgba = color.toRgb();

  // Color from hsb input may get `rgb` is (0/0/0) when `hsb.b` is 0
  // So if rgb is empty, we should get from hsb
  if (!rgba.r && !rgba.g && !rgba.b) {
    const hsba = color.toHsb();
    hsba.a = alpha || 1;
    return generateColor(hsba);
  }

  rgba.a = alpha || 1;
  return generateColor(rgba);
};

/**
 * Get percent position color. e.g. [10%-#fff, 20%-#000], 15% => #888
 */
export const getGradientPercentColor = (
  colors: { percent: number; color: string }[],
  percent: number,
): string => {
  const filledColors = [
    {
      percent: 0,
      color: colors[0].color,
    },
    ...colors,
    {
      percent: 100,
      color: colors[colors.length - 1].color,
    },
  ];

  for (let i = 0; i < filledColors.length - 1; i += 1) {
    const startPtg = filledColors[i].percent;
    const endPtg = filledColors[i + 1].percent;
    const startColor = filledColors[i].color;
    const endColor = filledColors[i + 1].color;

    if (startPtg <= percent && percent <= endPtg) {
      const dist = endPtg - startPtg;
      if (dist === 0) {
        return startColor;
      }

      const ratio = ((percent - startPtg) / dist) * 100;
      const startRcColor = new RcColor(startColor);
      const endRcColor = new RcColor(endColor);

      return startRcColor.mix(endRcColor, ratio).toRgbString();
    }
  }

  // This will never reach
  /* istanbul ignore next */
  return '';
};
