import * as React from 'react';

import { AggregationColor } from '../../color';
import { PanelPickerContext } from '../../context';
import { getGradientPercentColor } from '../../util';
import { GradientColorSlider } from '../ColorSlider';

function getDiffIndex<T>(ori: T[], next: T[]) {
  for (let i = 0; i < ori.length; i += 1) {
    if (ori[i] !== next[i]) {
      return i;
    }
  }
  return ori.length;
}

/**
 * GradientColorBar will auto show when the mode is `gradient`.
 */
export default function GradientColorBar() {
  const { prefixCls, mode, value, onChange, onChangeComplete, onActive, activeIndex } =
    React.useContext(PanelPickerContext);

  const isGradient = mode === 'gradient';

  // ============================= Colors =============================
  const colors = React.useMemo(
    () =>
      value.getColors().map((info) => ({
        percent: info.percent,
        color: info.color.toRgbString(),
      })),
    [value],
  );

  const values = React.useMemo(() => colors.map((info) => info.percent), [colors]);

  // ============================= Change =============================
  const removedColorRef = React.useRef<string | null>(null);

  const getColor = (nextValues: number[]) => {
    let nextColors = [...colors];

    if (nextValues.length < values.length) {
      // Remove node
      const diffIndex = getDiffIndex(values, nextValues);

      nextColors.splice(diffIndex, 1);

      removedColorRef.current = colors[diffIndex].color;
    } else if (nextValues.length > values.length) {
      // Add node
      const diffIndex = getDiffIndex(values, nextValues);
      const newPercent = nextValues[diffIndex];

      if (removedColorRef.current) {
        nextColors.splice(diffIndex, 0, {
          percent: newPercent,
          color: removedColorRef.current,
        });
      } else {
        const newPointColor = getGradientPercentColor(colors, newPercent);

        nextColors.splice(diffIndex, 0, {
          percent: newPercent,
          color: newPointColor,
        });
      }
    } else {
      nextColors = nextValues.map((percent, index) => {
        const { color } = colors[index];
        return {
          percent,
          color,
        };
      });
    }

    return new AggregationColor(nextColors);
  };

  const onInternalChange = (nextValues: number[]) => {
    onChange(getColor(nextValues));
  };

  const onInternalChangeComplete = (nextValues: number[]) => {
    onChangeComplete(getColor(nextValues));

    removedColorRef.current = null;
  };

  // ============================= Render =============================
  if (!isGradient) {
    return null;
  }

  return (
    <GradientColorSlider
      min={0}
      max={100}
      prefixCls={prefixCls}
      className={`${prefixCls}-gradient-slider`}
      colors={colors}
      color={null!}
      value={values}
      range
      onChange={onInternalChange}
      onChangeComplete={onInternalChangeComplete}
      disabled={false}
      type="gradient"
      // Active
      activeIndex={activeIndex}
      onActive={onActive}
    />
  );
}
