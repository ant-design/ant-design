import type { ReactNode } from 'react';
import type { ColorPickerProps } from './ColorPicker';
import type { Color } from './color';

export enum ColorFormat {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}

export interface PresetsItem {
  label: ReactNode;
  colors: (string | Color)[];
}
export type TriggerType = 'click' | 'hover';

export type TriggerPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';
export interface ColorPickerBaseProps {
  color?: Color;
  prefixCls: string;
  format?: keyof typeof ColorFormat;
  allowClear?: boolean;
  colorCleared?: boolean;
  disabled?: boolean;
  presets?: PresetsItem[];
  onFormatChange?: ColorPickerProps['onFormatChange'];
}
