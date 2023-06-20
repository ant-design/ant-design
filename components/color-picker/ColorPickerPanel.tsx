import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';
import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import type { Color } from './color';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerProvider, PanelPresetsPanelProvider } from './context';
import type { ColorPickerBaseProps } from './interface';

interface ColorPickerPanelProps extends ColorPickerBaseProps {
  onChange?: (value?: Color, type?: HsbaColorType, pickColor?: boolean) => void;
  onChangeComplete?: (type?: HsbaColorType) => void;
  onClear?: () => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const { prefixCls, presets, panelRender, onChangeComplete, onChange, color, ...injectProps } =
    props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;

  // ==== Inject props ===
  const panelPickerProps = {
    prefixCls,
    value: color,
    ...injectProps,
  };

  const panelPresetsProps = {
    prefixCls,
    value: color,
    presets,
    onChange,
  };

  // ====================== Render ======================
  const innerPanel = (
    <>
      <PanelPicker />
      {Array.isArray(presets) && <Divider className={`${prefixCls}-inner-panel-divider`} />}
      <PanelPresets />
    </>
  );

  const extraPanelRender = (panel: React.ReactNode) => (
    <PanelPickerProvider value={{ panel, ...panelPickerProps }}>
      <PanelPresetsPanelProvider value={panelPresetsProps}>
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
      </PanelPresetsPanelProvider>
    </PanelPickerProvider>
  );

  return (
    <RcColorPicker
      prefixCls={prefixCls}
      value={color?.toHsb()}
      onChange={(colorValue, type) => onChange?.(colorValue, type, true)}
      panelRender={extraPanelRender}
      onChangeComplete={onChangeComplete}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
