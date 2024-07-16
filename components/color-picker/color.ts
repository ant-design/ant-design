/* eslint-disable class-methods-use-this */
import { Color as RcColor } from '@rc-component/color-picker';

import type { ColorGenInput, Colors } from './interface';

export const toHexFormat = (value?: string, alpha?: boolean) =>
  value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || '';

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '');

export type GradientColor = {
  color: AggregationColor;
  percent: number;
}[];

export class AggregationColor {
  /** Original Color object */
  private metaColor: RcColor;

  private colors: GradientColor | undefined;

  public cleared: boolean | 'controlled' = false;

  constructor(color: ColorGenInput<AggregationColor> | Colors<AggregationColor>) {
    const getRcConstructorColor = (c: ColorGenInput<AggregationColor>) =>
      c instanceof AggregationColor ? c.metaColor : c;

    if (Array.isArray(color)) {
      this.colors = color.map(({ color: c, percent }) => ({
        color: new AggregationColor(c),
        percent,
      }));
      this.metaColor = new RcColor(getRcConstructorColor(color[0].color));
    } else {
      this.metaColor = new RcColor(getRcConstructorColor(color));
    }

    if (!color) {
      this.metaColor.setAlpha(0);
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
    return getHex(this.toHexString(), this.metaColor.getAlpha() < 1);
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
    return !!this.colors;
  }

  getColors(): GradientColor {
    return this.colors || [{ color: this, percent: 0 }];
  }
}
