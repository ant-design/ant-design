import React from 'react';
import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from 'rc-slider';
import RcSlider from 'rc-slider';
import type { SliderRef } from 'rc-slider/lib/Slider';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import SliderTooltip from './SliderTooltip';
import useStyle from './style';

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

export type Formatter = ((value?: number) => React.ReactNode) | null;

export interface SliderTooltipProps extends AbstractTooltipProps {
  prefixCls?: string;
  open?: boolean;
  placement?: TooltipPlacement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  formatter?: Formatter;
  autoAdjustOverflow?: boolean;
}

export interface SliderBaseProps {
  prefixCls?: string;
  reverse?: boolean;
  min?: number;
  max?: number;
  step?: null | number;
  marks?: SliderMarks;
  dots?: boolean;
  included?: boolean;
  disabled?: boolean;
  keyboard?: boolean;
  vertical?: boolean;
  className?: string;
  rootClassName?: string;
  id?: string;
  style?: React.CSSProperties;
  tooltip?: SliderTooltipProps;
  autoFocus?: boolean;

  styles?: RcSliderProps['styles'];
  classNames?: RcSliderProps['classNames'];
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  // Deprecated
  /** @deprecated `tooltipPrefixCls` is deprecated. Please use `tooltip.prefixCls` instead. */
  tooltipPrefixCls?: string;
  /** @deprecated `tipFormatter` is deprecated. Please use `tooltip.formatter` instead. */
  tipFormatter?: Formatter;
  /** @deprecated `tooltipVisible` is deprecated. Please use `tooltip.open` instead. */
  tooltipVisible?: boolean;
  /**
   * @deprecated `getTooltipPopupContainer` is deprecated. Please use `tooltip.getPopupContainer`
   *   instead.
   */
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** @deprecated `tooltipPlacement` is deprecated. Please use `tooltip.placement` instead. */
  tooltipPlacement?: TooltipPlacement;
}

export interface SliderSingleProps extends SliderBaseProps {
  range?: false;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  /** @deprecated Please use `styles.handle` instead */
  handleStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.track` instead */
  trackStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.rail` instead */
  railStyle?: React.CSSProperties;
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true | SliderRange;
  value?: number[];
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  onAfterChange?: (value: number[]) => void;
  /** @deprecated Please use `styles.handle` instead */
  handleStyle?: React.CSSProperties[];
  /** @deprecated Please use `styles.track` instead */
  trackStyle?: React.CSSProperties[];
  /** @deprecated Please use `styles.rail` instead */
  railStyle?: React.CSSProperties;
}

interface SliderRange {
  draggableTrack?: boolean;
}

export type Opens = { [index: number]: boolean };

function getTipFormatter(tipFormatter?: Formatter, legacyTipFormatter?: Formatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter;
  }
  if (legacyTipFormatter || legacyTipFormatter === null) {
    return legacyTipFormatter;
  }
  return (val?: number) => (typeof val === 'number' ? val.toString() : '');
}

const Slider = React.forwardRef<SliderRef, SliderSingleProps | SliderRangeProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    range,
    className,
    rootClassName,
    style,
    disabled,
    // Deprecated Props
    tooltipPrefixCls: legacyTooltipPrefixCls,
    tipFormatter: legacyTipFormatter,
    tooltipVisible: legacyTooltipVisible,
    getTooltipPopupContainer: legacyGetTooltipPopupContainer,
    tooltipPlacement: legacyTooltipPlacement,
    ...restProps
  } = props;

  const { direction, slider, getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;
  const [opens, setOpens] = React.useState<Opens>({});

  const toggleTooltipOpen = (index: number, open: boolean) => {
    setOpens((prev: Opens) => ({ ...prev, [index]: open }));
  };

  const getTooltipPlacement = (placement?: TooltipPlacement, vertical?: boolean) => {
    if (placement) {
      return placement;
    }
    if (!vertical) {
      return 'top';
    }
    return direction === 'rtl' ? 'left' : 'right';
  };

  const prefixCls = getPrefixCls('slider', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    className,
    slider?.className,
    rootClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
  );

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

  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Slider');

    [
      ['tooltipPrefixCls', 'prefixCls'],
      ['getTooltipPopupContainer', 'getPopupContainer'],
      ['tipFormatter', 'formatter'],
      ['tooltipPlacement', 'placement'],
      ['tooltipVisible', 'open'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, `tooltip.${newName}`);
    });
  }

  const handleRender: RcSliderProps['handleRender'] = (node, info) => {
    const { index, dragging } = info;

    const { tooltip = {}, vertical } = props;

    const tooltipProps: SliderTooltipProps = {
      ...tooltip,
    };
    const {
      open: tooltipOpen,
      placement: tooltipPlacement,
      getPopupContainer: getTooltipPopupContainer,
      prefixCls: customizeTooltipPrefixCls,
      formatter: tipFormatter,
    } = tooltipProps;

    const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);

    const isTipFormatter = mergedTipFormatter ? opens[index] || dragging : false;
    const open =
      tooltipOpen ?? legacyTooltipVisible ?? (tooltipOpen === undefined && isTipFormatter);

    const passedProps = {
      ...node.props,
      onMouseEnter: () => toggleTooltipOpen(index, true),
      onMouseLeave: () => toggleTooltipOpen(index, false),
      onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
        toggleTooltipOpen(index, true);
        restProps.onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
        toggleTooltipOpen(index, false);
        restProps.onBlur?.(e);
      },
    };

    return (
      <SliderTooltip
        {...tooltipProps}
        prefixCls={getPrefixCls('tooltip', customizeTooltipPrefixCls ?? legacyTooltipPrefixCls)}
        title={mergedTipFormatter ? mergedTipFormatter(info.value) : ''}
        open={open}
        placement={getTooltipPlacement(tooltipPlacement ?? legacyTooltipPlacement, vertical)}
        key={index}
        overlayClassName={`${prefixCls}-tooltip`}
        getPopupContainer={
          getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
        }
      >
        {React.cloneElement(node, passedProps)}
      </SliderTooltip>
    );
  };

  const mergedStyle: React.CSSProperties = { ...slider?.style, ...style };

  return wrapSSR(
    <RcSlider
      {...restProps}
      step={restProps.step}
      range={mergedRange}
      draggableTrack={draggableTrack}
      className={cls}
      style={mergedStyle}
      disabled={mergedDisabled}
      ref={ref}
      prefixCls={prefixCls}
      handleRender={handleRender}
    />,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}

export default Slider;
