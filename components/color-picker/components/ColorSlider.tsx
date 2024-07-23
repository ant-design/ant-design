import * as React from 'react';
import type { BaseSliderProps } from '@rc-component/color-picker';
import classNames from 'classnames';
import { useEvent } from 'rc-util';

import type { GetProp } from '../../_util/type';
import Slider from '../../slider';
import SliderInternalContext from '../../slider/style/Context';
import type { SliderInternalContextProps } from '../../slider/style/Context';

export interface GradientColorSliderProps
  extends Omit<BaseSliderProps, 'value' | 'onChange' | 'onChangeComplete' | 'type'> {
  value: number[];
  onChange: (value: number[]) => void;
  onChangeComplete: (value: number[]) => void;
  range?: boolean;
  className?: string;
  activeIndex?: number;
  onActive?: (index: number) => void;
  type: BaseSliderProps['type'] | 'gradient';
}

export const GradientColorSlider = (props: GradientColorSliderProps) => {
  const {
    prefixCls,
    colors,
    type,
    color,
    range = false,
    className,
    onActive,
    ...restProps
  } = props;

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
    if (!color || !type) {
      return null;
    }

    if (type === 'alpha') {
      return color.toRgbString();
    }

    return `hsl(${color.toHsb().h}, 100%, 50%)`;
  }, [color, type]);

  // =========================== Context ============================
  const handleRender: GetProp<SliderInternalContextProps, 'handleRender'> = useEvent(
    (ori, info) => {
      const { onFocus, onBlur, style } = ori.props;

      // Point Color
      const mergedStyle = { ...style };
      if (type === 'gradient') {
        mergedStyle.background = colors[info.index].color;
      }

      return React.cloneElement(ori, {
        onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
          onActive?.(info.index);
          onFocus?.(e);
        },
        onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
          onActive?.(-1);
          onBlur?.(e);
        },
        style: mergedStyle,
      });
    },
  );

  const sliderContext: SliderInternalContextProps = React.useMemo(
    () => ({
      handleRender,
    }),
    [],
  );

  // ============================ Render ============================
  return (
    <SliderInternalContext.Provider value={sliderContext}>
      <Slider
        {...sliderProps}
        className={classNames(className, `${prefixCls}-slider`)}
        tooltip={{ open: false }}
        range={{
          editable: range,
          minCount: 1,
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
    </SliderInternalContext.Provider>
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
