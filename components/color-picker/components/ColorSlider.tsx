import * as React from 'react';
import type { BaseSliderProps } from '@rc-component/color-picker';
import classNames from 'classnames';
import { UnstableContext } from 'rc-slider';
import useEvent from 'rc-util/lib/hooks/useEvent';

import type { GetContextProp, GetProp } from '../../_util/type';
import Slider from '../../slider';
import SliderInternalContext from '../../slider/Context';
import type { SliderInternalContextProps } from '../../slider/Context';
import { getGradientPercentColor } from '../util';

export interface GradientColorSliderProps
  extends Omit<BaseSliderProps, 'value' | 'onChange' | 'onChangeComplete' | 'type'> {
  value: number[];
  onChange?: (value: number[]) => void;
  onChangeComplete: (value: number[]) => void;
  range?: boolean;
  className?: string;
  activeIndex?: number;
  onActive?: (index: number) => void;
  type: BaseSliderProps['type'] | 'gradient';

  // Drag events
  onDragStart?: GetContextProp<typeof UnstableContext, 'onDragStart'>;
  onDragChange?: GetContextProp<typeof UnstableContext, 'onDragChange'>;

  // Key event
  onKeyDelete?: (index: number) => void;
}

export const GradientColorSlider = (props: GradientColorSliderProps) => {
  const {
    prefixCls,
    colors,
    type,
    color,
    range = false,
    className,
    activeIndex,
    onActive,

    onDragStart,
    onDragChange,
    onKeyDelete,

    ...restProps
  } = props;

  const sliderProps = {
    ...restProps,
    track: false,
  };

  // ========================== Background ==========================
  const linearCss = React.useMemo(() => {
    const colorsStr = colors.map((c) => `${c.color} ${c.percent}%`).join(', ');
    return `linear-gradient(90deg, ${colorsStr})`;
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

  // ======================= Context: Slider ========================
  const onInternalDragStart: GetContextProp<typeof UnstableContext, 'onDragStart'> = useEvent(
    onDragStart!,
  );

  const onInternalDragChange: GetContextProp<typeof UnstableContext, 'onDragChange'> = useEvent(
    onDragChange!,
  );

  const unstableContext = React.useMemo(
    () => ({
      onDragStart: onInternalDragStart,
      onDragChange: onInternalDragChange,
    }),
    [],
  );

  // ======================= Context: Render ========================
  const handleRender: GetProp<SliderInternalContextProps, 'handleRender'> = useEvent(
    (ori, info) => {
      const { onFocus, style, className: handleCls, onKeyDown } = ori.props;

      // Point Color
      const mergedStyle = { ...style };
      if (type === 'gradient') {
        mergedStyle.background = getGradientPercentColor(colors, info.value);
      }

      return React.cloneElement(ori, {
        onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
          onActive?.(info.index);
          onFocus?.(e);
        },
        style: mergedStyle,
        className: classNames(handleCls, {
          [`${prefixCls}-slider-handle-active`]: activeIndex === info.index,
        }),
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if ((e.key === 'Delete' || e.key === 'Backspace') && onKeyDelete) {
            onKeyDelete(info.index);
          }

          onKeyDown?.(e);
        },
      });
    },
  );

  const sliderContext: SliderInternalContextProps = React.useMemo(
    () => ({
      direction: 'ltr',
      handleRender,
    }),
    [],
  );

  // ============================ Render ============================
  return (
    <SliderInternalContext.Provider value={sliderContext}>
      <UnstableContext.Provider value={unstableContext}>
        <Slider
          {...sliderProps}
          className={classNames(className, `${prefixCls}-slider`)}
          tooltip={{ open: false }}
          range={{
            editable: range,
            minCount: 2,
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
      </UnstableContext.Provider>
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
