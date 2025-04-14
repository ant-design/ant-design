import React from 'react';
import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from 'rc-slider';
import RcSlider from 'rc-slider';
import type { SliderRef } from 'rc-slider/lib/Slider';
import raf from 'rc-util/lib/raf';

import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import DisabledContext from '../config-provider/DisabledContext';
import type { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import SliderInternalContext from './Context';
import SliderTooltip from './SliderTooltip';
import useStyle from './style';
import useRafLock from './useRafLock';
import { useComponentConfig } from '../config-provider/context';

export type SliderMarks = RcSliderProps['marks'];

export type SemanticName = 'root' | 'tracks' | 'track' | 'rail' | 'handle';
export type SliderClassNames = Partial<Record<SemanticName, string>>;
export type SliderStyles = Partial<Record<SemanticName, React.CSSProperties>>;
export interface SliderProps extends RcSliderProps {
  classNames?: SliderClassNames;
  styles?: SliderStyles;
}

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

  styles?: SliderProps['styles'];
  classNames?: SliderProps['classNames'];
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

  // Accessibility
  tabIndex?: SliderProps['tabIndex'];
  ariaLabelForHandle?: SliderProps['ariaLabelForHandle'];
  ariaLabelledByForHandle?: SliderProps['ariaLabelledByForHandle'];
  ariaRequired?: SliderProps['ariaRequired'];
  ariaValueTextFormatterForHandle?: SliderProps['ariaValueTextFormatterForHandle'];
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

type SliderRange = Exclude<GetProp<RcSliderProps, 'range'>, boolean>;

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
    classNames: sliderClassNames,
    styles,
    ...restProps
  } = props;

  const { vertical } = props;

  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    getPopupContainer,
  } = useComponentConfig('slider');
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  // ============================= Context ==============================
  const { handleRender: contextHandleRender, direction: internalContextDirection } =
    React.useContext(SliderInternalContext);

  const mergedDirection = internalContextDirection || contextDirection;
  const isRTL = mergedDirection === 'rtl';

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
    return isRTL ? 'left' : 'right';
  };

  // ============================== Style ===============================
  const prefixCls = getPrefixCls('slider', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const rootClassNames = classNames(
    className,
    contextClassName,
    contextClassNames.root,
    sliderClassNames?.root,
    rootClassName,
    {
      [`${prefixCls}-rtl`]: isRTL,
      [`${prefixCls}-lock`]: dragging,
    },
    hashId,
    cssVarCls,
  );

  // make reverse default on rtl direction
  if (isRTL && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }

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

  const useActiveTooltipHandle = range && !lockOpen;

  const handleRender: RcSliderProps['handleRender'] =
    contextHandleRender ||
    ((node, info) => {
      const { index } = info;

      const nodeProps = node.props;

      function proxyEvent(
        eventName: keyof React.DOMAttributes<HTMLElement>,
        event: React.SyntheticEvent,
        triggerRestPropsEvent?: boolean,
      ) {
        if (triggerRestPropsEvent) {
          (restProps as any)[eventName]?.(event);
        }

        (nodeProps as any)[eventName]?.(event);
      }

      const passedProps: typeof nodeProps = {
        ...nodeProps,
        onMouseEnter: (e) => {
          setHoverOpen(true);
          proxyEvent('onMouseEnter', e);
        },
        onMouseLeave: (e) => {
          setHoverOpen(false);
          proxyEvent('onMouseLeave', e);
        },
        onMouseDown: (e) => {
          setFocusOpen(true);
          setDragging(true);
          proxyEvent('onMouseDown', e);
        },
        onFocus: (e) => {
          setFocusOpen(true);
          restProps.onFocus?.(e);
          proxyEvent('onFocus', e, true);
        },
        onBlur: (e) => {
          setFocusOpen(false);
          restProps.onBlur?.(e);
          proxyEvent('onBlur', e, true);
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
            classNames={{ root: `${prefixCls}-tooltip` }}
            getPopupContainer={
              getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
            }
          >
            {cloneNode}
          </SliderTooltip>
        );
      }

      return cloneNode;
    });

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
            classNames={{ root: `${prefixCls}-tooltip` }}
            getPopupContainer={
              getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
            }
            draggingDelete={info.draggingDelete}
          >
            {cloneNode}
          </SliderTooltip>
        );
      }
    : undefined;

  // ============================== Render ==============================
  const rootStyle: React.CSSProperties = {
    ...contextStyles.root,
    ...contextStyle,
    ...styles?.root,
    ...style,
  };

  const mergedTracks = {
    ...contextStyles.tracks,
    ...styles?.tracks,
  };

  const mergedTracksClassNames = classNames(contextClassNames.tracks, sliderClassNames?.tracks);

  return wrapCSSVar(
    // @ts-ignore
    <RcSlider
      {...restProps}
      classNames={{
        handle: classNames(contextClassNames.handle, sliderClassNames?.handle),
        rail: classNames(contextClassNames.rail, sliderClassNames?.rail),
        track: classNames(contextClassNames.track, sliderClassNames?.track),
        ...(mergedTracksClassNames ? { tracks: mergedTracksClassNames } : {}),
      }}
      styles={{
        handle: {
          ...contextStyles.handle,
          ...styles?.handle,
        },
        rail: {
          ...contextStyles.rail,
          ...styles?.rail,
        },
        track: {
          ...contextStyles.track,
          ...styles?.track,
        },
        ...(Object.keys(mergedTracks).length ? { tracks: mergedTracks } : {}),
      }}
      step={restProps.step}
      range={range}
      className={rootClassNames}
      style={rootStyle}
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
