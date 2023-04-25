import type { ReactNode } from 'react';
import type { Color } from './color';
import type { ColorPickerProps } from './ColorPicker';

export type ColorFormat = 'hex' | 'rgb' | 'hsb';

export type PresetsItem = { label: ReactNode; colors: Array<string | Color> };

export interface ColorPickerBaseProps {
  color?: Color;
  prefixCls: string;
  format?: ColorFormat;
  allowClear?: boolean;
  clearColor?: boolean;
  disabled?: boolean;
  presets?: PresetsItem[];
  onFormatChange?: ColorPickerProps['onFormatChange'];
  updateColor?: (value?: Color) => void;
  updateClearColor?: (clear?: boolean) => void;
}
