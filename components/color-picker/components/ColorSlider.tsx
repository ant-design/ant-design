import * as React from 'react';
import type { BaseSliderProps } from '@rc-component/color-picker';

import Slider from '../../slider';

const ColorSlider = (props: BaseSliderProps) => {
  const { prefixCls, colors, min, max, value, disabled, onChange, onChangeComplete, type, color } =
    props;

  const sliderProps = {
    min,
    max,
    value,
    disabled,
    onChange,
    onChangeComplete,
    track: false,
  };

  const linearCss = React.useMemo(() => {
    const colorsStr = colors.map((c) => `${c.color} ${c.percent}%`).join(', ');
    return `linear-gradient(to right, ${colorsStr})`;
  }, [colors]);

  const pointColor = React.useMemo(() => {
    if (type === 'alpha') {
      return color.toRgbString();
    }

    return `hsl(${color.toHsb().h}, 100%, 50%)`;
  }, [color, type]);

  return (
    <Slider
      {...sliderProps}
      className={`${prefixCls}-slider`}
      tooltip={{ open: false }}
      styles={{
        rail: {
          background: linearCss,
        },
        handle: {
          background: pointColor,
        },
      }}
      classNames={{
        rail: `${prefixCls}-slider-rail`,
        handle: `${prefixCls}-slider-handle`,
      }}
    />
  );
};

export default ColorSlider;
