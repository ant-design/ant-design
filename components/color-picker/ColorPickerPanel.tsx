import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import ColorClear from './components/ColorClear';
import ColorInput from './components/ColorInput';
import ColorPresets from './components/ColorPresets';
import type { ColorPickerBaseProps } from './interface';

interface ColorPickerPanelProps extends ColorPickerBaseProps {
  children?: React.ReactElement;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const {
    prefixCls,
    children,
    allowClear,
    presets,
    updateColor,
    updateClearColor,
    color,
    ...injectProps
  } = props;
  const ColorPickerPanelPrefixCls = `${prefixCls}-inner-panel`;

  return (
    <div className={ColorPickerPanelPrefixCls}>
      {allowClear && (
        <div className={`${ColorPickerPanelPrefixCls}-clear`}>
          <ColorClear
            prefixCls={prefixCls}
            value={color}
            onChange={(clearColor) => {
              updateColor?.(clearColor);
              updateClearColor?.(true);
            }}
            {...injectProps}
          />
        </div>
      )}
      {children}
      <ColorInput
        value={color}
        onChange={(value) => updateColor?.(value)}
        prefixCls={prefixCls}
        {...injectProps}
      />

      {Array.isArray(presets) && (
        <>
          <Divider className={`${ColorPickerPanelPrefixCls}-divider`} />
          <div className={`${ColorPickerPanelPrefixCls}-presets`}>
            <ColorPresets
              value={color}
              presets={presets}
              onChange={(value) => updateColor?.(value)}
              prefixCls={prefixCls}
              {...injectProps}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ColorPickerPanel;
