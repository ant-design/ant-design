import type { FC } from 'react';
import React from 'react';

import Divider from '../divider';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerContext, PanelPresetsContext } from './context';
import type { PanelPickerContextProps, PanelPresetsContextProps } from './context';
import type { ColorPickerProps } from './interface';

export interface ColorPickerPanelProps
  extends PanelPickerContextProps,
    Omit<PanelPresetsContextProps, 'onChange'> {
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
    activeIndex,
    onActive,
    format,
    onFormatChange,
    gradientDragging,
    onGradientDragging,
    disabledFormat,
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
      activeIndex,
      onActive,
      format,
      onFormatChange,
      gradientDragging,
      onGradientDragging,
      disabledFormat,
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
      activeIndex,
      onActive,
      format,
      onFormatChange,
      gradientDragging,
      onGradientDragging,
      disabledFormat,
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
