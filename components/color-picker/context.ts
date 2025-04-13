import React from 'react';

import type { GetProp } from '../_util/type';
import type { AggregationColor } from './color';
import type { ModeOptions } from './hooks/useModeColor';
import type { ColorFormatType, ColorPickerProps, ModeType, PresetsItem } from './interface';

export interface PanelPickerContextProps {
  prefixCls: string;
  allowClear?: boolean;
  disabled?: boolean;
  disabledAlpha?: boolean;
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
  modeOptions: ModeOptions;

  value: AggregationColor;
  onChange: (value?: AggregationColor, pickColor?: boolean) => void;
  onChangeComplete: GetProp<ColorPickerProps, 'onChangeComplete'>;

  format?: ColorFormatType;
  onFormatChange?: ColorPickerProps['onFormatChange'];

  /** The gradient Slider active handle */
  activeIndex: number;
  /** The gradient Slider handle active changed */
  onActive: (index: number) => void;
  /** Is gradient Slider dragging */
  gradientDragging: boolean;
  /** The gradient Slider dragging changed */
  onGradientDragging: (dragging: boolean) => void;

  onClear?: () => void;
  disabledFormat?: boolean;
}

export interface PanelPresetsContextProps {
  prefixCls: string;
  presets?: PresetsItem[];
  disabled?: boolean;
  value: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

export const PanelPickerContext = React.createContext<PanelPickerContextProps>(
  {} as PanelPickerContextProps,
);

export const PanelPresetsContext = React.createContext<PanelPresetsContextProps>(
  {} as PanelPresetsContextProps,
);
