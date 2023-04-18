/* eslint-disable class-methods-use-this */
import type { ColorGenInput } from '@rc-component/color-picker';
import { Color as RcColor } from '@rc-component/color-picker';

export interface Color
  extends Pick<RcColor, 'toHsb' | 'toHsbString' | 'toHexString' | 'toRgb' | 'toRgbString'> {}

export class ColorFactory {
  /** Original Color object */
  metaColor: RcColor;

  constructor(color: ColorGenInput<Color>) {
    this.metaColor = new RcColor(color as ColorGenInput);
  }

  toHsb() {
    return this.metaColor.toHsb();
  }

  toHsbString() {
    return this.metaColor.toHsbString();
  }

  toHexString() {
    return this.metaColor.getAlpha() === 1
      ? this.metaColor.toHexString()
      : this.metaColor.toHex8String();
  }

  toRgb() {
    return this.metaColor.toRgb();
  }

  toRgbString() {
    return this.metaColor.toRgbString();
  }

  setAlpha(alpha?: string | number | undefined) {
    return this.metaColor.setAlpha(alpha);
  }

  getAlpha() {
    return this.metaColor.getAlpha();
  }
}
