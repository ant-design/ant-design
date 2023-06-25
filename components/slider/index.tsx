import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from 'rc-slider';
import RcSlider from 'rc-slider';
import type { SliderRef } from 'rc-slider/lib/Slider';
import React from 'react';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { TooltipPlacement } from '../tooltip';
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

export type Formatter = (value?: number) => React.ReactNode;
const defaultFormatter: Formatter = (val) => (typeof val === 'number' ? val.toString() : '');

export interface SliderTooltipProps {
  prefixCls?: string;
  open?: boolean;
  placement?: TooltipPlacement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  formatter?: null | Formatter;
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

  // Deprecated
  /** @deprecated `tooltipPrefixCls` is deprecated. Please use `tooltip.prefixCls` instead. */
  tooltipPrefixCls?: string;
  /** @deprecated `tipFormatter` is deprecated. Please use `tooltip.formatter` instead. */
  tipFormatter?: null | ((value?: number) => React.ReactNode);
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
  handleStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  railStyle?: React.CSSProperties;
}

export interface SliderRangeProps extends SliderBaseProps {
  range: true | SliderRange;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  onAfterChange?: (value: [number, number]) => void;
  handleStyle?: React.CSSProperties[];
  trackStyle?: React.CSSProperties[];
  railStyle?: React.CSSProperties;
}

interface SliderRange {
  draggableTrack?: boolean;
}

export type Opens = { [index: number]: boolean };

const Slider = React.forwardRef<SliderRef, SliderSingleProps | SliderRangeProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    range,
    className,
    rootClassName,
    disabled,
    // Deprecated Props
    tooltipPrefixCls: legacyTooltipPrefixCls,
    tipFormatter: legacyTipFormatter,
    tooltipVisible: legacyTooltipVisible,
    getTooltipPopupContainer: legacyGetTooltipPopupContainer,
    tooltipPlacement: legacyTooltipPlacement,

    ...restProps
  } = props;

  const { getPrefixCls, direction, getPopupContainer } = React.useContext(ConfigContext);
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
    [
      ['tooltipPrefixCls', 'prefixCls'],
      ['getTooltipPopupContainer', 'getPopupContainer'],
      ['tipFormatter', 'formatter'],
      ['tooltipPlacement', 'placement'],
      ['tooltipVisible', 'open'],
    ].forEach(([deprecatedName, newName]) => {
      warning(
        !(deprecatedName in props),
        'Slider',
        `\`${deprecatedName}\` is deprecated, please use \`tooltip.${newName}\` instead.`,
      );
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

    let mergedTipFormatter;
    if (tipFormatter || tipFormatter === null) {
      mergedTipFormatter = tipFormatter;
    } else if (legacyTipFormatter || legacyTipFormatter === null) {
      mergedTipFormatter = legacyTipFormatter;
    } else {
      mergedTipFormatter = defaultFormatter;
    }

    const isTipFormatter = mergedTipFormatter ? opens[index] || dragging : false;
    const open =
      tooltipOpen ?? legacyTooltipVisible ?? (tooltipOpen === undefined && isTipFormatter);

    const passedProps = {
      ...node.props,
      onMouseEnter: () => toggleTooltipOpen(index, true),
      onMouseLeave: () => toggleTooltipOpen(index, false),
    };

    const tooltipPrefixCls = getPrefixCls(
      'tooltip',
      customizeTooltipPrefixCls ?? legacyTooltipPrefixCls,
    );

    return (
      <SliderTooltip
        prefixCls={tooltipPrefixCls}
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

  return wrapSSR(
    <RcSlider
      {...restProps}
      step={restProps.step}
      range={mergedRange}
      draggableTrack={draggableTrack}
      className={cls}
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
