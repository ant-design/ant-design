import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import ColorClear from './components/ColorClear';
import ColorInput from './components/ColorInput';
import ColorPresets from './components/ColorPresets';
import type { ColorPickerBaseProps } from './interface';

interface ExPanelProps extends ColorPickerBaseProps {
  children?: React.ReactElement;
}

const ExPanel: FC<ExPanelProps> = (props) => {
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
  const ExPanelPrefixCls = `${prefixCls}-expanel`;

  return (
    <div className={ExPanelPrefixCls}>
      {allowClear && (
        <div className={`${ExPanelPrefixCls}-clear`}>
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
          <Divider className={`${ExPanelPrefixCls}-divider`} />
          <div className={`${ExPanelPrefixCls}-presets`}>
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
export default ExPanel;
