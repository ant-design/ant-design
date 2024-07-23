import type { FC } from 'react';
import React from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';

import Divider from '../divider';
import type { AggregationColor } from './color';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerContext, PanelPresetsContext } from './context';
import type { PanelPickerContextProps, PanelPresetsContextProps } from './context';
import type { ColorPickerProps } from './interface';

export interface ColorPickerPanelProps extends PanelPickerContextProps, PanelPresetsContextProps {
  onChange: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear?: () => void;
  panelRender?: ColorPickerProps['panelRender'];
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const {
    prefixCls,
    presets,
    panelRender,
    value,
    onChange,
    onClear,
    allowClear,
    disabledAlpha,
    mode,
    onModeChange,
    modeOptions,
    onChangeComplete,
  } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner`;

  // ===================== Context ======================
  const panelContext: PanelPickerContextProps = React.useMemo(
    () => ({
      prefixCls,
      value,
      onChange,
      onClear,
      allowClear,
      disabledAlpha,
      mode,
      onModeChange,
      modeOptions,
      onChangeComplete,
    }),
    [
      prefixCls,
      value,
      onChange,
      onClear,
      allowClear,
      disabledAlpha,
      mode,
      onModeChange,
      modeOptions,
      onChangeComplete,
    ],
  );

  const presetContext: PanelPresetsContextProps = React.useMemo(
    () => ({
      prefixCls,
      value,
      presets,
      onChange,
    }),
    [prefixCls, value, presets, onChange],
  );

  // ====================== Render ======================
  const innerPanel = (
    <div className={`${colorPickerPanelPrefixCls}-content`}>
      <PanelPicker />
      {Array.isArray(presets) && <Divider />}
      <PanelPresets />
    </div>
  );

  return (
    <PanelPickerContext.Provider value={panelContext}>
      <PanelPresetsContext.Provider value={presetContext}>
        <div className={colorPickerPanelPrefixCls}>
          {typeof panelRender === 'function'
            ? panelRender(innerPanel, {
                components: {
                  Picker: PanelPicker,
                  Presets: PanelPresets,
                },
              })
            : innerPanel}
        </div>
      </PanelPresetsContext.Provider>
    </PanelPickerContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
