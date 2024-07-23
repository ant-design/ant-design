import * as React from 'react';

import { AggregationColor } from '../../color';
import { PanelPickerContext } from '../../context';
import { GradientColorSlider } from '../ColorSlider';

/**
 * GradientColorBar will auto show when the mode is `gradient`.
 */
export default function GradientColorBar() {
  const { prefixCls, mode, value, onChange, onChangeComplete } =
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
  const getColor = (nextValues: number[]) => {
    const nextColors = nextValues.map((percent, index) => {
      const { color } = colors[index];
      return {
        percent,
        color,
      };
    });

    return new AggregationColor(nextColors);
  };

  const onInternalChange = (nextValues: number[]) => {
    onChange(getColor(nextValues));
  };

  const onInternalChangeComplete = (nextValues: number[]) => {
    onChangeComplete(getColor(nextValues));
  };

  // ============================= Render =============================
  if (!isGradient) {
    return null;
  }

  return (
    <div>
      <GradientColorSlider
        min={0}
        max={100}
        prefixCls={prefixCls}
        className={`${prefixCls}-gradient-slider`}
        colors={colors}
        color={null!}
        value={values}
        onChange={onInternalChange}
        onChangeComplete={onInternalChangeComplete}
        disabled={false}
        type="alpha"
        // Active
        onActive={null}
      />
    </div>
  );
}
