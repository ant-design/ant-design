import type { CSSProperties, FC, ReactNode } from 'react';
import type { ColorPickerProps as RcColorPickerProps } from '@rc-component/color-picker';

import type { SizeType } from '../config-provider/SizeContext';
import type { PopoverProps } from '../popover';
import type { Color } from './color';

export enum ColorFormat {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}

export type ColorFormatType = keyof typeof ColorFormat;

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
  format?: ColorFormatType;
  allowClear?: boolean;
  disabled?: boolean;
  disabledAlpha?: boolean;
  presets?: PresetsItem[];
  panelRender?: ColorPickerProps['panelRender'];
  onFormatChange?: ColorPickerProps['onFormatChange'];
  onChangeComplete?: ColorPickerProps['onChangeComplete'];
}

export type ColorValueType = Color | string | null;

export type ColorPickerProps = Omit<
  RcColorPickerProps,
  'onChange' | 'value' | 'defaultValue' | 'panelRender' | 'disabledAlpha' | 'onChangeComplete'
> & {
  value?: ColorValueType;
  defaultValue?: ColorValueType;
  children?: React.ReactNode;
  open?: boolean;
  disabled?: boolean;
  placement?: TriggerPlacement;
  trigger?: TriggerType;
  format?: ColorFormatType;
  defaultFormat?: ColorFormatType;
  allowClear?: boolean;
  presets?: PresetsItem[];
  arrow?: boolean | { pointAtCenter: boolean };
  panelRender?: (
    panel: React.ReactNode,
    extra: { components: { Picker: FC; Presets: FC } },
  ) => React.ReactNode;
  showText?: boolean | ((color: Color) => React.ReactNode);
  size?: SizeType;
  styles?: { popup?: CSSProperties; popupOverlayInner?: CSSProperties };
  rootClassName?: string;
  disabledAlpha?: boolean;
  [key: `data-${string}`]: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format?: ColorFormatType) => void;
  onChange?: (value: Color, hex: string) => void;
  onClear?: () => void;
  onChangeComplete?: (value: Color) => void;
} & Pick<PopoverProps, 'getPopupContainer' | 'autoAdjustOverflow' | 'destroyTooltipOnHide'>;
