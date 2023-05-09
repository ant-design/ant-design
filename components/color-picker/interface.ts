import type { ReactNode } from 'react';
import type { ColorPickerProps } from './ColorPicker';
import type { Color } from './color';

export enum ColorFormat {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}

export type PresetsItem = { label: ReactNode; colors: Array<string | Color> };

export interface ColorPickerBaseProps {
  color?: Color;
  prefixCls: string;
  format?: keyof typeof ColorFormat;
  allowClear?: boolean;
  clearColor?: boolean;
  disabled?: boolean;
  presets?: PresetsItem[];
  onFormatChange?: ColorPickerProps['onFormatChange'];
}
