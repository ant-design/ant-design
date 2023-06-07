import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';
import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import type { Color } from './color';
import ColorClear from './components/ColorClear';
import ColorInput from './components/ColorInput';
import ColorPresets from './components/ColorPresets';
import type { ColorPickerBaseProps } from './interface';

interface ColorPickerPanelProps extends ColorPickerBaseProps {
  onChange?: (value?: Color, type?: HsbaColorType, pickColor?: boolean) => void;
  onChangeComplete?: (type?: HsbaColorType) => void;
  onClear?: () => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const {
    prefixCls,
    allowClear,
    presets,
    onChange,
    onClear,
    onChangeComplete,
    color,
    colorCleared,
    ...injectProps
  } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;

  const extraPanelRender = (panel: React.ReactNode) => (
    <div className={colorPickerPanelPrefixCls}>
      {allowClear && (
        <ColorClear
          prefixCls={prefixCls}
          value={color}
          colorCleared={colorCleared}
          onChange={(clearColor) => {
            onChange?.(clearColor);
            onClear?.();
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
