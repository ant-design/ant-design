import React from 'react';
import type { PanelPickerProps } from './components/PanelPicker';
import type { PanelPresetsProps } from './components/PanelPresets';

export const PanelPickerContext = React.createContext<PanelPickerProps>({} as PanelPickerProps);

export const PanelPresetsContext = React.createContext<PanelPresetsProps>({} as PanelPresetsProps);

export const { Provider: PanelPickerProvider } = PanelPickerContext;
export const { Provider: PanelPresetsProvider } = PanelPresetsContext;
