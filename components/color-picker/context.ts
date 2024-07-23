import React from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';

import type { AggregationColor } from './color';
import type { PanelPresetsProps } from './components/PanelPresets';
import type { ColorPickerBaseProps } from './interface';

export interface PanelPickerProps
  extends Required<
    Pick<
      ColorPickerBaseProps,
      | 'prefixCls'
      | 'allowClear'
      | 'disabledAlpha'
      | 'onChangeComplete'
      | 'mode'
      | 'onModeChange'
      | 'modeOptions'
    >
  > {
  value: AggregationColor;
  onChange: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear: () => void;
}

export const PanelPickerContext = React.createContext<PanelPickerProps>({} as PanelPickerProps);

export const PanelPresetsContext = React.createContext<PanelPresetsProps>({} as PanelPresetsProps);

export const { Provider: PanelPickerProvider } = PanelPickerContext;
export const { Provider: PanelPresetsProvider } = PanelPresetsContext;
