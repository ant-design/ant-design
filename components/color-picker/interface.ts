import type { CSSProperties, FC, ReactNode } from 'react';
import type {
  ColorGenInput,
  ColorPickerProps as RcColorPickerProps,
} from '@rc-component/color-picker';

import type { SizeType } from '../config-provider/SizeContext';
import type { PopoverProps } from '../popover';
import type { TooltipPlacement } from '../tooltip';
import type { AggregationColor } from './color';

export type { ColorGenInput };

export type Colors<T> = {
  color: ColorGenInput<T>;
  percent: number;
}[];

export enum ColorFormat {
  hex = 'hex',
  rgb = 'rgb',
  hsb = 'hsb',
}

export type ColorFormatType = keyof typeof ColorFormat;

export interface PresetsItem {
  label: ReactNode;
  colors: (string | AggregationColor)[];
  /**
   * Whether the initial state is collapsed
   * @since 5.11.0
   * @default true
   */
  defaultOpen?: boolean;
}
export type TriggerType = 'click' | 'hover';

export type TriggerPlacement = TooltipPlacement; // Alias, to prevent breaking changes.

export type SingleValueType = AggregationColor | string;

export type ColorValueType =
  | SingleValueType
  | null
  | {
      color: SingleValueType;
      percent: number;
    }[];

export type ModeType = 'single' | 'gradient';

export type ColorPickerProps = Omit<
  RcColorPickerProps,
  | 'onChange'
  | 'value'
  | 'defaultValue'
  | 'panelRender'
  | 'disabledAlpha'
  | 'onChangeComplete'
  | 'components'
> & {
  mode?: ModeType | ModeType[];
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
  showText?: boolean | ((color: AggregationColor) => React.ReactNode);
  size?: SizeType;
  styles?: { popup?: CSSProperties; popupOverlayInner?: CSSProperties };
  rootClassName?: string;
  disabledAlpha?: boolean;
  [key: `data-${string}`]: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format?: ColorFormatType) => void;
  onChange?: (value: AggregationColor, css: string) => void;
  onClear?: () => void;
  onChangeComplete?: (value: AggregationColor) => void;
} & Pick<PopoverProps, 'getPopupContainer' | 'autoAdjustOverflow' | 'destroyTooltipOnHide'>;
