import type { FC } from 'react';
import React, { useContext } from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';

import type { AggregationColor } from '../color';
import { PanelPickerContext } from '../context';
import useMode from '../hooks/useMode';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';
import ColorClear from './ColorClear';
import ColorInput from './ColorInput';

export interface PanelPickerProps
  extends Pick<
    ColorPickerBaseProps,
    'prefixCls' | 'allowClear' | 'disabledAlpha' | 'onChangeComplete' | 'mode'
  > {
  value?: AggregationColor;
  onChange?: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear?: () => void;
}

const PanelPicker: FC = () => {
  const {
    mode,
    prefixCls,
    allowClear,
    value,
    disabledAlpha,
    onChange,
    onClear,
    onChangeComplete,
    ...injectProps
  } = useContext(PanelPickerContext);

  const [isSingle, isGradient] = useMode(mode);

  // ============================ Render ============================
  // Operation bar
  let operationNode: React.ReactNode = null;
  if (allowClear) {
    operationNode = (
      <div className={`${prefixCls}-operation`}>
        <ColorClear
          prefixCls={prefixCls}
          value={value}
          onChange={(clearColor) => {
            onChange?.(clearColor);
            onClear?.();
          }}
          {...injectProps}
        />
      </div>
    );
  }

  // Return
  return (
    <>
      {operationNode}
      <RcColorPicker
        prefixCls={prefixCls}
        value={value?.toHsb()}
        disabledAlpha={disabledAlpha}
        onChange={(colorValue, type) => {
          onChange?.(generateColor(colorValue), type, true);
        }}
        onChangeComplete={(colorValue) => {
          onChangeComplete?.(generateColor(colorValue));
        }}
      />
      <ColorInput
        value={value}
        onChange={onChange}
        prefixCls={prefixCls}
        disabledAlpha={disabledAlpha}
        {...injectProps}
      />
    </>
  );
};
export default PanelPicker;
