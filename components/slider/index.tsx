import React from 'react';
import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from 'rc-slider';
import RcSlider from 'rc-slider';
import type { SliderProps, SliderRef } from 'rc-slider/lib/Slider';
import raf from 'rc-util/lib/raf';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import type { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import SliderTooltip from './SliderTooltip';
import useStyle from './style';
import useRafLock from './useRafLock';

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
  /** @deprecated Please use `onChangeComplete` instead */
  onAfterChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
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
  /** @deprecated Please use `onChangeComplete` instead */
  onAfterChange?: (value: number[]) => void;
  onChangeComplete?: (value: number[]) => void;
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
    tooltip = {},
    onChangeComplete,
    ...restProps
  } = props;

  const { vertical } = props;

  const { direction, slider, getPrefixCls, getPopupContainer } = React.useContext(ConfigContext);
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  // =============================== Open ===============================
  const [hoverOpen, setHoverOpen] = useRafLock();
  const [focusOpen, setFocusOpen] = useRafLock();

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

  const lockOpen = tooltipOpen ?? legacyTooltipVisible;
  const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;

  const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);

  // ============================= Change ==============================
  const [dragging, setDragging] = useRafLock();

  const onInternalChangeComplete: RcSliderProps['onChangeComplete'] = (nextValues) => {
    onChangeComplete?.(nextValues as any);
    setDragging(false);
  };

  // ============================ Placement ============================
  const getTooltipPlacement = (placement?: TooltipPlacement, vert?: boolean) => {
    if (placement) {
      return placement;
    }
    if (!vert) {
      return 'top';
    }
    return direction === 'rtl' ? 'left' : 'right';
  };

  // ============================== Style ===============================
  const prefixCls = getPrefixCls('slider', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const cls = classNames(
    className,
    slider?.className,
    rootClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-lock`]: dragging,
    },
    hashId,
    cssVarCls,
  );

  // make reverse default on rtl direction
  if (direction === 'rtl' && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }

  // ============================= Multiple =============================
  // Range config
  const [mergedRange, draggableTrack] = React.useMemo(() => {
    if (!range) {
      return [false];
    }

    return typeof range === 'object' ? [true, range.draggableTrack] : [true, false];
  }, [range]);

  // ============================= Warning ==============================
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

  // ============================== Handle ==============================

  React.useEffect(() => {
    const onMouseUp = () => {
      // Delay for 1 frame to make the click to enable hide tooltip
      // even when the handle is focused
      raf(() => {
        setFocusOpen(false);
      }, 1);
    };
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const useActiveTooltipHandle = mergedRange && !lockOpen;

  const handleRender: RcSliderProps['handleRender'] = (node, info) => {
    const { index } = info;

    const nodeProps = node.props;

    const passedProps: typeof nodeProps = {
      ...nodeProps,
      onMouseEnter: (e) => {
        setHoverOpen(true);
        nodeProps.onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setHoverOpen(false);
        nodeProps.onMouseLeave?.(e);
      },
      onMouseDown: (e) => {
        setFocusOpen(true);
        setDragging(true);
        nodeProps.onMouseDown?.(e);
      },
      onFocus: (e) => {
        setFocusOpen(true);
        restProps.onFocus?.(e);
        nodeProps.onFocus?.(e);
      },
      onBlur: (e) => {
        setFocusOpen(false);
        restProps.onBlur?.(e);
        nodeProps.onBlur?.(e);
      },
    };

    const cloneNode = React.cloneElement(node, passedProps);

    const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;

    // Wrap on handle with Tooltip when is single mode or multiple with all show tooltip
    if (!useActiveTooltipHandle) {
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
          {cloneNode}
        </SliderTooltip>
      );
    }

    return cloneNode;
  };

  // ========================== Active Handle ===========================
  const activeHandleRender: SliderProps['activeHandleRender'] = useActiveTooltipHandle
    ? (handle, info) => {
        const cloneNode = React.cloneElement(handle, {
          style: {
            ...handle.props.style,
            visibility: 'hidden',
          },
        });

        return (
          <SliderTooltip
            {...tooltipProps}
            prefixCls={getPrefixCls('tooltip', customizeTooltipPrefixCls ?? legacyTooltipPrefixCls)}
            title={mergedTipFormatter ? mergedTipFormatter(info.value) : ''}
            open={mergedTipFormatter !== null && activeOpen}
            placement={getTooltipPlacement(tooltipPlacement ?? legacyTooltipPlacement, vertical)}
            key="tooltip"
            overlayClassName={`${prefixCls}-tooltip`}
            getPopupContainer={
              getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
            }
          >
            {cloneNode}
          </SliderTooltip>
        );
      }
    : undefined;

  // ============================== Render ==============================
  const mergedStyle: React.CSSProperties = { ...slider?.style, ...style };

  return wrapCSSVar(
    // @ts-ignore
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
      activeHandleRender={activeHandleRender}
      onChangeComplete={onInternalChangeComplete}
    />,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}

export default Slider;
