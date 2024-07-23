import React from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';

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
  onChange: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onChangeComplete: GetProp<ColorPickerProps, 'onChangeComplete'>;

  format?: ColorFormatType;
  onFormatChange?: ColorPickerProps['onFormatChange'];

  /** The Slider active handle */
  activeIndex: number;
  /** The Slider handle active changed */
  onActive: (index: number) => void;

  onClear?: () => void;
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
