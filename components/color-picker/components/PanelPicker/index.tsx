import type { FC } from 'react';
import React, { useContext } from 'react';
import RcColorPicker from '@rc-component/color-picker';
import type { Color } from '@rc-component/color-picker';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

import Segmented from '../../../segmented';
import { AggregationColor } from '../../color';
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
  const panelPickerContext = useContext(PanelPickerContext);

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
    gradientDragging,
    ...injectProps
  } = panelPickerContext;

  // ============================ Colors ============================
  const colors = React.useMemo(() => {
    if (!value.cleared) {
      return value.getColors();
    }

    return [
      {
        percent: 0,
        color: new AggregationColor(''),
      },
      {
        percent: 100,
        color: new AggregationColor(''),
      },
    ];
  }, [value]);

  // ========================= Single Color =========================
  const isSingle = !value.isGradient();

  // We cache the point color in case user drag the gradient point across another one
  const [lockedColor, setLockedColor] = React.useState<AggregationColor>(value);

  // Use layout effect here since `useEffect` will cause a blink when mouseDown
  useLayoutEffect(() => {
    if (!isSingle) {
      setLockedColor(colors[activeIndex]?.color);
    }
  }, [gradientDragging, activeIndex]);

  const activeColor = React.useMemo(() => {
    if (isSingle) {
      return value;
    }

    // Use cache when dragging. User can not operation panel when dragging.
    if (gradientDragging) {
      return lockedColor;
    }

    return colors[activeIndex]?.color;
  }, [value, activeIndex, isSingle, lockedColor, gradientDragging]);

  // ============================ Change ============================
  const fillColor = (nextColor: AggregationColor) => {
    if (isSingle) {
      return nextColor;
    }

    const nextColors = [...colors];
    nextColors[activeIndex] = {
      ...nextColors[activeIndex],
      color: nextColor,
    };

    return new AggregationColor(nextColors);
  };

  const onInternalChange = (colorValue: AggregationColor | Color, fromPicker?: boolean) => {
    const nextColor = generateColor(colorValue);
    onChange(fillColor(value.cleared ? genAlphaColor(nextColor) : nextColor), fromPicker);
  };

  const onInternalChangeComplete = (nextColor: AggregationColor) => {
    onChangeComplete(fillColor(nextColor));
  };

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
            onChange(clearColor);
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

      <GradientColorBar {...panelPickerContext} colors={colors} />

      <RcColorPicker
        prefixCls={prefixCls}
        value={activeColor?.toHsb()}
        disabledAlpha={disabledAlpha}
        onChange={(colorValue) => {
          onInternalChange(colorValue, true);
        }}
        onChangeComplete={(colorValue) => {
          onInternalChangeComplete(generateColor(colorValue));
        }}
        components={components}
      />
      <ColorInput
        value={activeColor}
        onChange={onInternalChange}
        prefixCls={prefixCls}
        disabledAlpha={disabledAlpha}
        {...injectProps}
      />
    </>
  );
};
export default PanelPicker;
