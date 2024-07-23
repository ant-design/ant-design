import type { FC } from 'react';
import React, { useContext } from 'react';
import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';

import Segmented from '../../../segmented';
import type { AggregationColor } from '../../color';
import { PanelPickerContext } from '../../context';
import type { ColorPickerBaseProps } from '../../interface';
import { genAlphaColor, generateColor } from '../../util';
import ColorClear from '../ColorClear';
import ColorInput from '../ColorInput';
import ColorSlider, { GradientColorSlider } from '../ColorSlider';
import GradientColorBar from './GradientColorBar';

const components = {
  slider: ColorSlider,
};

export interface PanelPickerProps
  extends Required<
    Pick<
      ColorPickerBaseProps,
      | 'prefixCls'
      | 'allowClear'
      | 'disabledAlpha'
      | 'onChangeComplete'
      | 'mode'
      | 'onModeChange'
      | 'modeOptions'
    >
  > {
  value: AggregationColor;
  onChange: (value?: AggregationColor, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear: () => void;
}

const PanelPicker: FC = () => {
  const {
    mode,
    onModeChange,
    modeOptions,
    prefixCls,
    allowClear,
    value,
    disabledAlpha,
    onChange,
    onClear,
    onChangeComplete,
    ...injectProps
  } = useContext(PanelPickerContext);

  // ============================ Render ============================
  // Operation bar
  let operationNode: React.ReactNode = null;
  const showMode = modeOptions.length > 1;

  if (allowClear || showMode) {
    operationNode = (
      <div className={`${prefixCls}-operation`}>
        {showMode && (
          <Segmented size="small" options={modeOptions} value={mode} onChange={onModeChange} />
        )}
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

      {/* {mode === 'gradient' && (
        <GradientColorSlider
          min={0}
          max={100}
          prefixCls={prefixCls}
          className={`${prefixCls}-gradient-slider`}
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
      )} */}
      <GradientColorBar />

      <RcColorPicker
        prefixCls={prefixCls}
        value={value.toHsb()}
        disabledAlpha={disabledAlpha}
        onChange={(colorValue, type) => {
          const nextColor = generateColor(colorValue);
          onChange(value.cleared ? genAlphaColor(nextColor) : nextColor, type, true);
        }}
        onChangeComplete={(colorValue) => {
          onChangeComplete(generateColor(colorValue));
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
