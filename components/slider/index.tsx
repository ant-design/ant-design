import * as React from 'react';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import classNames from 'classnames';
import { TooltipPlacement } from '../tooltip';
import SliderTooltip from './SliderTooltip';
import { ConfigContext } from '../config-provider';

export interface SliderMarks {
  [key: number]:
    | React.ReactNode
    | {
        style: React.CSSProperties;
        label: React.ReactNode;
      };
}

export type SliderValue = number | [number, number];

interface HandleGeneratorInfo {
  value: number;
  dragging: boolean;
  index: number;
  rest: any[];
}

export type HandleGeneratorFn = (config: {
  tooltipPrefixCls?: string;
  prefixCls?: string;
  info: HandleGeneratorInfo;
}) => React.ReactNode;

export interface SliderProps {
  prefixCls?: string;
  tooltipPrefixCls?: string;
  range?: boolean;
  reverse?: boolean;
  min?: number;
  max?: number;
  step?: number | null;
  marks?: SliderMarks;
  dots?: boolean;
  value?: SliderValue;
  defaultValue?: SliderValue;
  included?: boolean;
  disabled?: boolean;
  vertical?: boolean;
  onChange?: (value: SliderValue) => void;
  onAfterChange?: (value: SliderValue) => void;
  tipFormatter?: null | ((value: number) => React.ReactNode);
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  tooltipVisible?: boolean;
  tooltipPlacement?: TooltipPlacement;
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export type Visibles = { [index: number]: boolean };

const Slider = React.forwardRef<unknown, SliderProps>((props, ref) => {
  const { getPrefixCls, direction, getPopupContainer } = React.useContext(ConfigContext);
  const [visibles, setVisibles] = React.useState<Visibles>({});

  const toggleTooltipVisible = (index: number, visible: boolean) => {
    const temp = { ...visibles };
    temp[index] = visible;
    setVisibles(temp);
  };

  const handleWithTooltip: HandleGeneratorFn = ({
    tooltipPrefixCls,
    prefixCls,
    info: { value, dragging, index, ...restProps },
  }) => {
    const {
      tipFormatter,
      tooltipVisible,
      tooltipPlacement,
      getTooltipPopupContainer,
      vertical,
    } = props;
    const isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
    const visible = tooltipVisible || (tooltipVisible === undefined && isTipFormatter);
    return (
      <SliderTooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={visible}
        placement={tooltipPlacement || (vertical ? 'right' : 'top')}
        transitionName="zoom-down"
        key={index}
        overlayClassName={`${prefixCls}-tooltip`}
        getPopupContainer={getTooltipPopupContainer || getPopupContainer || (() => document.body)}
      >
        <RcHandle
          {...restProps}
          value={value}
          onMouseEnter={() => toggleTooltipVisible(index, true)}
          onMouseLeave={() => toggleTooltipVisible(index, false)}
        />
      </SliderTooltip>
    );
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
  if (range) {
    return (
      <RcRange
        {...restProps}
        className={cls}
        ref={ref}
        handle={(info: HandleGeneratorInfo) =>
          handleWithTooltip({
            tooltipPrefixCls,
            prefixCls,
            info,
          })
        }
        prefixCls={prefixCls}
        tooltipPrefixCls={tooltipPrefixCls}
      />
    );
  }
  return (
    <RcSlider
      {...restProps}
      className={cls}
      ref={ref}
      handle={(info: HandleGeneratorInfo) =>
        handleWithTooltip({
          tooltipPrefixCls,
          prefixCls,
          info,
        })
      }
      prefixCls={prefixCls}
      tooltipPrefixCls={tooltipPrefixCls}
    />
  );
});

Slider.displayName = 'Slider';

Slider.defaultProps = {
  tipFormatter(value: number) {
    return typeof value === 'number' ? value.toString() : '';
  },
};

export default Slider;
