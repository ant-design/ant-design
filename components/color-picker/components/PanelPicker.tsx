import type { FC } from 'react';
import React, { useContext } from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';

import Segmented from '../../segmented';
import type { AggregationColor } from '../color';
import { PanelPickerContext } from '../context';
import useMode from '../hooks/useMode';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';
import ColorClear from './ColorClear';
import ColorInput from './ColorInput';
import ColorSlider, { GradientColorSlider } from './ColorSlider';

const components = {
  slider: ColorSlider,
};

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

  const [isSingle, isGradient, isBoth] = useMode(mode);

  // ============================ Render ============================
  // Operation bar
  let operationNode: React.ReactNode = null;
  if (allowClear || isGradient) {
    operationNode = (
      <div className={`${prefixCls}-operation`}>
        <Segmented
          size="small"
          options={[
            {
              label: '纯色',
              value: 'single',
            },
            {
              label: '渐变',
              value: 'gradient',
            },
          ]}
        />
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

      <GradientColorSlider
        min={0}
        max={100}
        prefixCls={prefixCls}
        colors={[
          { percent: 0, color: '#f00' },
          { percent: 100, color: '#ff0' },
        ]}
        color={null!}
        value={[]}
        onChange={() => {}}
        onChangeComplete={() => {}}
        disabled={false}
        type="alpha"
      />

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
        components={components}
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
