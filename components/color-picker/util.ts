import type { ColorGenInput } from '@rc-component/color-picker';
import { getRoundNumber } from '@rc-component/color-picker/lib/util';
import type { Color } from './color';
import { ColorFactory } from './color';

export const customizePrefixCls = 'ant-color-picker';

export const generateColor = (color: ColorGenInput<Color>): Color => {
  if (color instanceof ColorFactory) {
    return color;
  }
  return new ColorFactory(color);
};

export const getAlphaColor = (color: Color) => getRoundNumber(color.toHsb().a * 100);

export const toHexFormat = (value: string) => value.replace(/[^\w/]/gi, '').slice(0, 8);

export const getHex = (value?: string) => (value ? toHexFormat(value) : '');
