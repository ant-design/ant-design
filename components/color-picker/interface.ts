import type React from 'react';
import type {
  ColorGenInput,
  ColorPickerProps as RcColorPickerProps,
} from '@rc-component/color-picker';

import type {
  SemanticClassNames,
  SemanticClassNamesType,
  SemanticStyles,
  SemanticStylesType,
} from '../_util/hooks/useMergeSemantic';
import type { SizeType } from '../config-provider/SizeContext';
import type { PopoverProps } from '../popover';
import type { TooltipPlacement } from '../tooltip';
import type { AggregationColor } from './color';

export type { ColorGenInput };

export type Colors<T> = {
  color: ColorGenInput<T>;
  percent: number;
}[];

export const FORMAT_HEX = 'hex';
export const FORMAT_RGB = 'rgb';
export const FORMAT_HSB = 'hsb';

export type ColorFormatType = typeof FORMAT_HEX | typeof FORMAT_RGB | typeof FORMAT_HSB;

export interface PresetsItem {
  label: React.ReactNode;
  colors: (string | AggregationColor | LineGradientType)[];
  /**
   * Whether the initial state is collapsed
   * @since 5.11.0
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * The key of the panel
   * @since 5.23.0
   */
  key?: React.Key;
}

export type TriggerType = 'click' | 'hover';

export type TriggerPlacement = TooltipPlacement; // Alias, to prevent breaking changes.

export type SingleValueType = AggregationColor | string;

export type LineGradientType = {
  color: SingleValueType;
  percent: number;
}[];

export type ColorValueType = SingleValueType | null | LineGradientType;

export type ModeType = 'single' | 'gradient';

type SemanticName = 'root';

type PopupSemantic = 'root';

export type ColorPickerClassNamesType = SemanticClassNamesType<
  ColorPickerProps,
  SemanticName,
  { popup?: SemanticClassNames<PopupSemantic> }
>;

export type ColorPickerStylesType = SemanticStylesType<
  ColorPickerProps,
  SemanticName,
  {
    popup?: SemanticStyles<PopupSemantic>;
    popupOverlayInner?: React.CSSProperties;
  }
>;

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
    extra: { components: { Picker: React.FC; Presets: React.FC } },
  ) => React.ReactNode;
  showText?: boolean | ((color: AggregationColor) => React.ReactNode);
  size?: SizeType;
  classNames?: ColorPickerClassNamesType;
  styles?: ColorPickerStylesType;
  rootClassName?: string;
  disabledAlpha?: boolean;
  [key: `data-${string}`]: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format?: ColorFormatType) => void;
  onChange?: (value: AggregationColor, css: string) => void;
  onClear?: () => void;
  onChangeComplete?: (value: AggregationColor) => void;
  disabledFormat?: boolean;
} & Pick<
    PopoverProps,
    'getPopupContainer' | 'autoAdjustOverflow' | 'destroyTooltipOnHide' | 'destroyOnHidden'
  >;
