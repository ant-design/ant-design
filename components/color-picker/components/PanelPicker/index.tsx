import type { FC } from 'react';
import React, { useContext } from 'react';
import RcColorPicker from '@rc-component/color-picker';

import Segmented from '../../../segmented';
import { PanelPickerContext } from '../../context';
import { genAlphaColor, generateColor } from '../../util';
import ColorClear from '../ColorClear';
import ColorInput from '../ColorInput';
import ColorSlider from '../ColorSlider';
import GradientColorBar from './GradientColorBar';

const components = {
  slider: ColorSlider,
};

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
    activeIndex,
    ...injectProps
  } = useContext(PanelPickerContext);

  // ========================= Single Color =========================
  const activeColor = React.useMemo(() => {
    if (!value.isGradient()) {
      return value;
    }

    return value.getColors()[activeIndex].color;
  }, [value, activeIndex]);

  // ============================ Change ============================

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

      <GradientColorBar />

      <RcColorPicker
        prefixCls={prefixCls}
        value={activeColor.toHsb()}
        disabledAlpha={disabledAlpha}
        onChange={(colorValue) => {
          const nextColor = generateColor(colorValue);
          onChange(value.cleared ? genAlphaColor(nextColor) : nextColor, true);
        }}
        onChangeComplete={(colorValue) => {
          onChangeComplete(generateColor(colorValue));
        }}
        components={components}
      />
      <ColorInput
        value={activeColor}
        onChange={onChange}
        prefixCls={prefixCls}
        disabledAlpha={disabledAlpha}
        {...injectProps}
      />
    </>
  );
};
export default PanelPicker;
