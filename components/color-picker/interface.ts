import type { ReactNode } from 'react';
import type { DirectionType } from '../config-provider';
import type { ColorPickerProps } from './ColorPicker';
import type { Color } from './color';

export type ColorFormat = 'hex' | 'rgb' | 'hsb';

export type PresetsItem = { label: ReactNode; colors: Array<string | Color> };

export interface ColorPickerBaseProps {
  color?: Color;
  prefixCls: string;
  format?: ColorFormat;
  allowClear?: boolean;
  clearColor?: boolean;
  disabled?: boolean;
  direction?: DirectionType;
  presets?: PresetsItem[];
  onFormatChange?: ColorPickerProps['onFormatChange'];
  updateColor?: (value?: Color) => void;
  updateClearColor?: (clear?: boolean) => void;
}

export enum ColorFormatEnum {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}
