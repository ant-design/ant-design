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
  /**
   * Whether the initial state is collapsed
   * @since 5.11.0
   * @default true
   */
  defaultOpen?: boolean;
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
  disabledAlpha?: boolean;
  presets?: PresetsItem[];
  panelRender?: ColorPickerProps['panelRender'];
  onFormatChange?: ColorPickerProps['onFormatChange'];
  onChangeComplete?: ColorPickerProps['onChangeComplete'];
}

export type ColorValueType = Color | string | null;
