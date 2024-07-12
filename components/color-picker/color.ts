/* eslint-disable class-methods-use-this */
import type { ColorGenInput } from '@rc-component/color-picker';
import { Color as RcColor } from '@rc-component/color-picker';

export const toHexFormat = (value?: string, alpha?: boolean) =>
  value?.replace(/[^\w/]/gi, '').slice(0, alpha ? 8 : 6) || '';

export const getHex = (value?: string, alpha?: boolean) => (value ? toHexFormat(value, alpha) : '');

export class AggregationColor {
  /** Original Color object */
  private metaColor: RcColor;

  public cleared: boolean | 'controlled' = false;

  constructor(color: ColorGenInput<AggregationColor>) {
    this.metaColor = new RcColor(color instanceof AggregationColor ? color.metaColor : color);

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
}
