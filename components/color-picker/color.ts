import { Color as RcColor } from '@rc-component/color-picker';

import { isNumber, isPlainObject } from '../_util/is';
import type { ColorGenInput, Colors, LinearGradientType } from './interface';

const DEFAULT_GRADIENT_ANGLE = 90;

export const toHexFormat = (value?: string, alpha?: boolean) =>
  value?.replace(/[^0-9a-f]/gi, '').slice(0, alpha ? 8 : 6) || '';

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '');

export type GradientColor = {
  color: AggregationColor;
  percent: number;
}[];

type AggregationGradientType = Omit<LinearGradientType, 'colors'> & {
  colors: Colors<AggregationColor>;
};

export class AggregationColor {
  /** Original Color object */
  private metaColor: RcColor;

  private colors: GradientColor | undefined;

  private angle = DEFAULT_GRADIENT_ANGLE;

  public cleared = false;

  constructor(
    color: ColorGenInput<AggregationColor> | Colors<AggregationColor> | AggregationGradientType,
  ) {
    // Clone from another AggregationColor
    if (color instanceof AggregationColor) {
      this.metaColor = color.metaColor.clone();
      this.colors = color.colors?.map((info) => ({
        color: new AggregationColor(info.color),
        percent: info.percent,
      }));
      this.angle = color.angle;
      this.cleared = color.cleared;
      return;
    }

    const isArray = Array.isArray(color);
    const isGradientObject =
      isPlainObject<LinearGradientType>(color) && 'colors' in color && Array.isArray(color.colors);
    const gradientColors = isArray ? color : isGradientObject ? color.colors : undefined;

    if (gradientColors?.length) {
      this.colors = gradientColors.map(({ color: c, percent }) => ({
        color: new AggregationColor(c),
        percent,
      }));
      this.metaColor = new RcColor(this.colors[0].color.metaColor);
    } else {
      this.metaColor = new RcColor(gradientColors ? '' : (color as ColorGenInput));
    }

    if (isGradientObject && isNumber(color.angle)) {
      this.angle = color.angle;
    }

    if (!color || (gradientColors && !this.colors)) {
      this.metaColor = this.metaColor.setA(0);
      this.cleared = true;
    }
  }

  toHsb() {
    return this.metaColor.toHsb();
  }

  toHsbString() {
    return this.metaColor.toHsbString();
  }

  toHex() {
    return getHex(this.toHexString(), this.metaColor.a < 1);
  }

  toHexString() {
    return this.metaColor.toHexString();
  }

  toRgb() {
    return this.metaColor.toRgb();
  }

  toRgbString() {
    return this.metaColor.toRgbString();
  }

  isGradient(): boolean {
    return !!this.colors && !this.cleared;
  }

  getColors(): GradientColor {
    return this.colors || [{ color: this, percent: 0 }];
  }

  getAngle(): number {
    return this.angle;
  }

  setAngle(angle: number): AggregationColor {
    return new AggregationColor({
      angle,
      colors: this.getColors(),
    });
  }

  setColors(colors: Colors<AggregationColor>): AggregationColor {
    return new AggregationColor({
      angle: this.angle,
      colors,
    });
  }

  toCssString(): string {
    const { colors } = this;

    // CSS line-gradient
    if (colors) {
      const colorsStr = colors.map((c) => `${c.color.toRgbString()} ${c.percent}%`).join(', ');
      return `linear-gradient(${this.angle}deg, ${colorsStr})`;
    }

    return this.metaColor.toRgbString();
  }

  equals(color: AggregationColor | null): boolean {
    if (!color || this.isGradient() !== color.isGradient()) {
      return false;
    }

    if (!this.isGradient()) {
      return this.toHexString() === color.toHexString();
    }

    return (
      this.angle === color.angle &&
      this.colors!.length === color.colors!.length &&
      this.colors!.every((c, i) => {
        const target = color.colors![i];
        return c.percent === target.percent && c.color.equals(target.color);
      })
    );
  }
}
