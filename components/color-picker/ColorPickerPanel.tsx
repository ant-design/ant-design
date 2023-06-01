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
  onChange?: (value?: Color, type?: HsbaColorType) => void;
  onClear?: () => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const { prefixCls, allowClear, presets, onChange, onClear, color, layout, ...injectProps } =
    props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;

  const clearEle = allowClear && (
    <ColorClear
      prefixCls={prefixCls}
      value={color}
      onChange={(clearColor) => {
        onChange?.(clearColor);
        onClear?.();
      }}
      {...injectProps}
    />
  );

  const presetsEle = Array.isArray(presets) && (
    <ColorPresets value={color} presets={presets} prefixCls={prefixCls} onChange={onChange} />
  );

  const innerPanelBodyRender = (panel: React.ReactNode) => (
    <div className={`${colorPickerPanelPrefixCls}-body`}>
      {panel}
      <ColorInput value={color} onChange={onChange} prefixCls={prefixCls} {...injectProps} />
    </div>
  );

  const defaultLayoutRender = (panel: React.ReactNode) => (
    <>
      {clearEle}
      {innerPanelBodyRender(panel)}
      {Array.isArray(presets) && <Divider className={`${colorPickerPanelPrefixCls}-divider`} />}
      {presetsEle}
    </>
  );

  const horizontalLayoutRender = (panel: React.ReactNode) => (
    <>
      <div className={`${colorPickerPanelPrefixCls}-foot`}>
        {clearEle}
        {presetsEle}
      </div>
      {(Array.isArray(presets) || allowClear) && (
        <Divider className={`${colorPickerPanelPrefixCls}-divider`} type="vertical" />
      )}
      {innerPanelBodyRender(panel)}
    </>
  );

  const extraPanelRender = (panel: React.ReactNode) => (
    <div className={colorPickerPanelPrefixCls}>
      {layout === 'horizontal' && (allowClear || presets)
        ? horizontalLayoutRender(panel)
        : defaultLayoutRender(panel)}
    </div>
  );
  return (
    <RcColorPicker
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
