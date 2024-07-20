import * as React from 'react';
import type { BaseSliderProps } from '@rc-component/color-picker';
import classNames from 'classnames';

import Slider from '../../slider';

export interface GradientColorSliderProps
  extends Omit<BaseSliderProps, 'value' | 'onChange' | 'onChangeComplete'> {
  value: number[];
  onChange: (value: number[]) => void;
  onChangeComplete: (value: number[]) => void;
  range?: boolean;
  className?: string;
}

export const GradientColorSlider = (props: GradientColorSliderProps) => {
  const { prefixCls, colors, type, color, range = false, className, ...restProps } = props;

  const sliderProps = {
    ...restProps,
    track: false,
  };

  // ========================== Background ==========================
  const linearCss = React.useMemo(() => {
    const colorsStr = colors.map((c) => `${c.color} ${c.percent}%`).join(', ');
    return `linear-gradient(to right, ${colorsStr})`;
  }, [colors]);

  const pointColor = React.useMemo(() => {
    if (!color) {
      return null;
    }

    if (type === 'alpha') {
      return color.toRgbString();
    }

    return `hsl(${color.toHsb().h}, 100%, 50%)`;
  }, [color, type]);

  // ============================ Render ============================
  return (
    <Slider
      {...sliderProps}
      className={classNames(className, `${prefixCls}-slider`)}
      tooltip={{ open: false }}
      range={{
        editable: range,
      }}
      styles={{
        rail: {
          background: linearCss,
        },
        handle: pointColor
          ? {
              background: pointColor,
            }
          : {},
      }}
      classNames={{
        rail: `${prefixCls}-slider-rail`,
        handle: `${prefixCls}-slider-handle`,
      }}
    />
  );
};

const SingleColorSlider = (props: BaseSliderProps) => {
  const { value, onChange, onChangeComplete } = props;

  const singleOnChange = (v: number[]) => onChange(v[0]);
  const singleOnChangeComplete = (v: number[]) => onChangeComplete(v[0]);

  return (
    <GradientColorSlider
      {...props}
      value={[value]}
      onChange={singleOnChange}
      onChangeComplete={singleOnChangeComplete}
    />
  );
};

export default SingleColorSlider;
