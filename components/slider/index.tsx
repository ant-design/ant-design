import React from 'react';
import raf from '@rc-component/util/lib/raf';
import classNames from 'classnames';
import type { SliderProps as RcSliderProps } from '@rc-component/slider';
import RcSlider from '@rc-component/slider';
import type { SliderRef } from '@rc-component/slider/lib/Slider';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import useOrientation from '../_util/hooks/useOrientation';
import type { Orientation } from '../_util/hooks/useOrientation';
import type { GetProp } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import type { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import SliderInternalContext from './Context';
import SliderTooltip from './SliderTooltip';
import useStyle from './style';
import useRafLock from './useRafLock';

export type SliderMarks = RcSliderProps['marks'];

export type SemanticName = 'root' | 'tracks' | 'track' | 'rail' | 'handle';

export type SliderClassNamesType = SemanticClassNamesType<SliderProps, SemanticName>;
export type SliderStylesType = SemanticStylesType<SliderProps, SemanticName>;
export interface SliderProps extends Omit<RcSliderProps, 'styles' | 'classNames'> {
  classNames?: SliderClassNamesType;
  styles?: SliderStylesType;
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
  orientation?: Orientation;
  vertical?: boolean;
  className?: string;
  rootClassName?: string;
  id?: string;
  style?: React.CSSProperties;
  tooltip?: SliderTooltipProps;
  autoFocus?: boolean;

  styles?: SliderStylesType;
  classNames?: SliderClassNamesType;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

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

function getTipFormatter(tipFormatter?: Formatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter;
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
    tooltip = {},
    onChangeComplete,
    classNames: sliderClassNames,
    styles,
    vertical,
    orientation,
    ...restProps
  } = props;

  const [, mergedVertical] = useOrientation(orientation, vertical);
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

  // =========== Merged Props for Semantic ==========
  const mergedProps: SliderSingleProps | SliderRangeProps = {
    ...props,
    disabled: mergedDisabled,
    vertical: mergedVertical,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SliderClassNamesType,
    SliderStylesType,
    SliderSingleProps | SliderRangeProps
  >([contextClassNames, sliderClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

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

  const lockOpen = tooltipOpen;
  const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;

  const mergedTipFormatter = getTipFormatter(tipFormatter);

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

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const rootClassNames = classNames(
    className,
    contextClassName,
    mergedClassNames.root,
    rootClassName,
    {
      [`${prefixCls}-rtl`]: isRTL,
      [`${prefixCls}-lock`]: dragging,
    },
    hashId,
    cssVarCls,
  );

  // make reverse default on rtl direction
  if (isRTL && !mergedVertical) {
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
            prefixCls={getPrefixCls('tooltip', customizeTooltipPrefixCls)}
            title={mergedTipFormatter ? mergedTipFormatter(info.value) : ''}
            value={info.value}
            open={open}
            placement={getTooltipPlacement(tooltipPlacement, mergedVertical)}
            key={index}
            classNames={{ root: `${prefixCls}-tooltip` }}
            getPopupContainer={getTooltipPopupContainer || getPopupContainer}
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
            prefixCls={getPrefixCls('tooltip', customizeTooltipPrefixCls)}
            title={mergedTipFormatter ? mergedTipFormatter(info.value) : ''}
            open={mergedTipFormatter !== null && activeOpen}
            placement={getTooltipPlacement(tooltipPlacement, mergedVertical)}
            key="tooltip"
            classNames={{ root: `${prefixCls}-tooltip` }}
            getPopupContainer={getTooltipPopupContainer || getPopupContainer}
            draggingDelete={info.draggingDelete}
          >
            {cloneNode}
          </SliderTooltip>
        );
      }
    : undefined;

  // ============================== Render ==============================
  const rootStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  return (
    // @ts-ignore
    <RcSlider
      {...restProps}
      classNames={{
        handle: mergedClassNames.handle,
        rail: mergedClassNames.rail,
        track: mergedClassNames.track,
        tracks: mergedClassNames.tracks,
      }}
      styles={{
        handle: mergedStyles.handle,
        rail: mergedStyles.rail,
        track: mergedStyles.track,
        tracks: mergedStyles.tracks,
      }}
      step={restProps.step}
      range={range}
      className={rootClassNames}
      style={rootStyle}
      disabled={mergedDisabled}
      vertical={mergedVertical}
      ref={ref}
      prefixCls={prefixCls}
      handleRender={handleRender}
      activeHandleRender={activeHandleRender}
      onChangeComplete={onInternalChangeComplete}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}

export default Slider;
