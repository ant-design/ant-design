import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from 'rc-slider';
import RcSlider from 'rc-slider';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { TooltipPlacement } from '../tooltip';
import SliderTooltip from './SliderTooltip';

export type SliderMarks = RcSliderProps['marks'];

interface HandleGeneratorInfo {
  value?: number;
  dragging?: boolean;
  index: number;
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string;
  prefixCls?: string;
  info: HandleGeneratorInfo;
}) => React.ReactElement;

export interface SliderBaseProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  reverse?: boolean;
  min?: number;
  max?: number;
  step?: null | number;
  marks?: SliderMarks;
  dots?: boolean;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  tipFormatter?: null | ((value?: number) => React.ReactNode);
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  tooltipVisible?: boolean;
  tooltipPlacement?: TooltipPlacement;
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  autoFocus?: boolean;
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  handleStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true | SliderRange;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  onAfterChange?: (value: [number, number]) => void;
  handleStyle?: React.CSSProperties[];
  trackStyle?: React.CSSProperties[];
}

interface SliderRange {
  draggableTrack?: boolean;
}

export type Visibles = { [index: number]: boolean };

const Slider = React.forwardRef<unknown, SliderSingleProps | SliderRangeProps>(
  (props, ref: any) => {
    const { getPrefixCls, direction, getPopupContainer } = React.useContext(ConfigContext);
    const [visibles, setVisibles] = React.useState<Visibles>({});

    const toggleTooltipVisible = (index: number, visible: boolean) => {
      setVisibles((prev: Visibles) => ({ ...prev, [index]: visible }));
    };

    const getTooltipPlacement = (tooltipPlacement?: TooltipPlacement, vertical?: boolean) => {
      if (tooltipPlacement) {
        return tooltipPlacement;
      }
      if (!vertical) {
        return 'top';
      }
      return direction === 'rtl' ? 'left' : 'right';
    };

    const {
      prefixCls: customizePrefixCls,
      tooltipPrefixCls: customizeTooltipPrefixCls,
      range,
      className,
      ...restProps
    } = props;
    const prefixCls = getPrefixCls('slider', customizePrefixCls);
    const tooltipPrefixCls = getPrefixCls('tooltip', customizeTooltipPrefixCls);
    const cls = classNames(className, {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    });

    // make reverse default on rtl direction
    if (direction === 'rtl' && !restProps.vertical) {
      restProps.reverse = !restProps.reverse;
    }

    // Range config
    const [mergedRange, draggableTrack] = React.useMemo(() => {
      if (!range) {
        return [false];
      }

      return typeof range === 'object' ? [true, range.draggableTrack] : [true, false];
    }, [range]);

    const handleRender: RcSliderProps['handleRender'] = (node, info) => {
      const { index, dragging } = info;

      const rootPrefixCls = getPrefixCls();
      const { tipFormatter, tooltipVisible, tooltipPlacement, getTooltipPopupContainer, vertical } =
        props;

      const isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
      const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter);

      const passedProps = {
        ...node.props,
        onMouseEnter: () => toggleTooltipVisible(index, true),
        onMouseLeave: () => toggleTooltipVisible(index, false),
      };

      return (
        <SliderTooltip
          prefixCls={tooltipPrefixCls}
          title={tipFormatter ? tipFormatter(info.value) : ''}
          visible={visible}
          placement={getTooltipPlacement(tooltipPlacement, vertical)}
          transitionName={`${rootPrefixCls}-zoom-down`}
          key={index}
          overlayClassName={`${prefixCls}-tooltip`}
          getPopupContainer={getTooltipPopupContainer || getPopupContainer}
        >
          {React.cloneElement(node, passedProps)}
        </SliderTooltip>
      );
    };

    return (
      <RcSlider
        {...(restProps as SliderRangeProps)}
        step={restProps.step!}
        range={mergedRange}
        draggableTrack={draggableTrack}
        className={cls}
        ref={ref}
        prefixCls={prefixCls}
        handleRender={handleRender}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}

Slider.defaultProps = {
  tipFormatter(value: number) {
    return typeof value === 'number' ? value.toString() : '';
  },
};

export default Slider;
