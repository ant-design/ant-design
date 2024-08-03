import * as React from 'react';
import type { UnstableContext } from 'rc-slider';

import type { GetContextProp } from '../../../_util/type';
import { AggregationColor } from '../../color';
import type { GradientColor } from '../../color';
import type { PanelPickerContextProps } from '../../context';
import { getGradientPercentColor } from '../../util';
import { GradientColorSlider } from '../ColorSlider';

function sortColors(colors: { percent: number; color: string }[]) {
  return [...colors].sort((a, b) => a.percent - b.percent);
}

export interface GradientColorBarProps extends PanelPickerContextProps {
  colors: GradientColor;
}

/**
 * GradientColorBar will auto show when the mode is `gradient`.
 */
const GradientColorBar = (props: GradientColorBarProps) => {
  const {
    prefixCls,
    mode,
    onChange,
    onChangeComplete,
    onActive,
    activeIndex,
    onGradientDragging,
    colors,
  } = props;

  const isGradient = mode === 'gradient';

  // ============================= Colors =============================
  const colorList = React.useMemo(
    () =>
      colors.map((info) => ({
        percent: info.percent,
        color: info.color.toRgbString(),
      })),
    [colors],
  );

  const values = React.useMemo(() => colorList.map((info) => info.percent), [colorList]);

  // ============================== Drag ==============================
  const colorsRef = React.useRef(colorList);

  // Record current colors
  const onDragStart: GetContextProp<typeof UnstableContext, 'onDragStart'> = ({
    rawValues,
    draggingIndex,
    draggingValue,
  }) => {
    if (rawValues.length > colorList.length) {
      // Add new node
      const newPointColor = getGradientPercentColor(colorList, draggingValue);
      const nextColors = [...colorList];
      nextColors.splice(draggingIndex, 0, {
        percent: draggingValue,
        color: newPointColor,
      });

      colorsRef.current = nextColors;
    } else {
      colorsRef.current = colorList;
    }

    onGradientDragging(true);
    onChange(new AggregationColor(sortColors(colorsRef.current)), true);
  };

  // Adjust color when dragging
  const onDragChange: GetContextProp<typeof UnstableContext, 'onDragChange'> = ({
    deleteIndex,
    draggingIndex,
    draggingValue,
  }) => {
    let nextColors = [...colorsRef.current];

    if (deleteIndex !== -1) {
      nextColors.splice(deleteIndex, 1);
    } else {
      nextColors[draggingIndex] = {
        ...nextColors[draggingIndex],
        percent: draggingValue,
      };

      nextColors = sortColors(nextColors);
    }

    onChange(new AggregationColor(nextColors), true);
  };

  // ============================== Key ===============================
  const onKeyDelete = (index: number) => {
    const nextColors = [...colorList];
    nextColors.splice(index, 1);

    const nextColor = new AggregationColor(nextColors);

    onChange(nextColor);
    onChangeComplete(nextColor);
  };

  // ============================= Change =============================
  const onInternalChangeComplete = (nextValues: number[]) => {
    onChangeComplete(new AggregationColor(colorList));

    // Reset `activeIndex` if out of range
    if (activeIndex >= nextValues.length) {
      onActive(nextValues.length - 1);
    }

    onGradientDragging(false);
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
      colors={colorList}
      color={null!}
      value={values}
      range
      onChangeComplete={onInternalChangeComplete}
      disabled={false}
      type="gradient"
      // Active
      activeIndex={activeIndex}
      onActive={onActive}
      // Drag
      onDragStart={onDragStart}
      onDragChange={onDragChange}
      onKeyDelete={onKeyDelete}
    />
  );
};

export default React.memo(GradientColorBar);
