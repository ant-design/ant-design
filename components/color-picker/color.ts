/* eslint-disable class-methods-use-this */
import type { ColorGenInput } from '@rc-component/color-picker';
import { Color as RcColor } from '@rc-component/color-picker';

export const toHexFormat = (value?: string, alpha?: boolean) =>
  value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || '';

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '');

export class AggregationColor extends RcColor {
  public cleared: boolean | 'controlled' = false;

  constructor(color: ColorGenInput<AggregationColor>) {
    super(color);

    if (!color) {
      this.setAlpha(0);
      this.cleared = true;
    }
  }

  toHex() {
    return getHex(this.toHexString(), this.getAlpha() < 1);
  }
}
