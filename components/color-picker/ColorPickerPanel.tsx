import { ColorPickerPanel as RcColorPickerPanel } from '@rc-component/color-picker';
import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import type { Color } from './color';
import ColorClear from './components/ColorClear';
import ColorInput from './components/ColorInput';
import ColorPresets from './components/ColorPresets';
import type { ColorPickerBaseProps } from './interface';

interface ColorPickerPanelProps extends ColorPickerBaseProps {
  onChange?: (value?: Color) => void;
  onClear?: (clear?: boolean) => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const { prefixCls, allowClear, presets, onChange, onClear, color, ...injectProps } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;

  const extraPanelRender = (panel: React.ReactNode) => (
    <div className={colorPickerPanelPrefixCls}>
      {allowClear && (
        <ColorClear
          prefixCls={prefixCls}
          value={color}
          onChange={(clearColor) => {
            onChange?.(clearColor);
            onClear?.(true);
          }}
          {...injectProps}
        />
      )}
      {panel}
      <ColorInput value={color} onChange={onChange} prefixCls={prefixCls} {...injectProps} />
      {Array.isArray(presets) && (
        <>
          <Divider className={`${colorPickerPanelPrefixCls}-divider`} />
          <ColorPresets value={color} presets={presets} prefixCls={prefixCls} onChange={onChange} />
        </>
      )}
    </div>
  );
  return (
    <RcColorPickerPanel
      prefixCls={prefixCls}
      value={color?.toHsb()}
      onChange={onChange}
      panelRender={extraPanelRender}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
