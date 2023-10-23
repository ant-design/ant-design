import * as React from 'react';
import type { BuildInPlacements } from '@rc-component/trigger';
import classNames from 'classnames';
import RcTooltip from 'rc-tooltip';
import type { placements as Placements } from 'rc-tooltip/lib/placements';
import type {
  TooltipProps as RcTooltipProps,
  TooltipRef as RcTooltipRef,
} from 'rc-tooltip/lib/Tooltip';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import type { PresetColorType } from '../_util/colors';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import type { AdjustOverflow, PlacementsConfig } from '../_util/placements';
import getPlacements from '../_util/placements';
import { cloneElement, isFragment, isValidElement } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import { NoCompactStyle } from '../space/Compact';
import { useToken } from '../theme/internal';
import PurePanel from './PurePanel';
import useStyle from './style';
import { parseColor } from './util';

export type { AdjustOverflow, PlacementsConfig };

export interface TooltipRef {
  /** @deprecated Please use `forceAlign` instead */
  forcePopupAlign: VoidFunction;
  forceAlign: VoidFunction;
}

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

// https://github.com/react-component/tooltip
// https://github.com/yiminghe/dom-align
export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}
// remove this after RcTooltip switch visible to open.
interface LegacyTooltipProps
  extends Partial<
    Omit<
      RcTooltipProps,
      | 'children'
      | 'visible'
      | 'defaultVisible'
      | 'onVisibleChange'
      | 'afterVisibleChange'
      | 'destroyTooltipOnHide'
    >
  > {
  open?: RcTooltipProps['visible'];
  defaultOpen?: RcTooltipProps['defaultVisible'];
  onOpenChange?: RcTooltipProps['onVisibleChange'];
  afterOpenChange?: RcTooltipProps['afterVisibleChange'];

  // Legacy
  /** @deprecated Please use `open` instead. */
  visible?: RcTooltipProps['visible'];
  /** @deprecated Please use `defaultOpen` instead. */
  defaultVisible?: RcTooltipProps['defaultVisible'];
  /** @deprecated Please use `onOpenChange` instead. */
  onVisibleChange?: RcTooltipProps['onVisibleChange'];
  /** @deprecated Please use `afterOpenChange` instead. */
  afterVisibleChange?: RcTooltipProps['afterVisibleChange'];
}

export interface AbstractTooltipProps extends LegacyTooltipProps {
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType>;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  /** @deprecated Please use `arrow={{ pointAtCenter: true }}` instead. */
  arrowPointAtCenter?: boolean;
  arrow?:
    | boolean
    | {
        /** @deprecated Please use `pointAtCenter` instead. */
        arrowPointAtCenter?: boolean;
        pointAtCenter?: boolean;
      };
  autoAdjustOverflow?: boolean | AdjustOverflow;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;
  destroyTooltipOnHide?: boolean | { keepParent?: boolean };
}

export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

export interface TooltipPropsWithTitle extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

const Tooltip = React.forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    afterVisibleChange,
    destroyTooltipOnHide,
    arrow = true,
    title,
    overlay,
    builtinPlacements,
    arrowPointAtCenter = false,
    autoAdjustOverflow = true,
  } = props;

  const mergedShowArrow = !!arrow;

  const [, token] = useToken();

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
  } = React.useContext(ConfigContext);

  // ============================== Ref ===============================
  const warning = devUseWarning('Tooltip');

  const tooltipRef = React.useRef<RcTooltipRef>(null);

  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };

  React.useImperativeHandle(ref, () => ({
    forceAlign,
    forcePopupAlign: () => {
      warning.deprecated(false, 'forcePopupAlign', 'forceAlign');
      forceAlign();
    },
  }));

  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    [
      ['visible', 'open'],
      ['defaultVisible', 'defaultOpen'],
      ['onVisibleChange', 'onOpenChange'],
      ['afterVisibleChange', 'afterOpenChange'],
      ['arrowPointAtCenter', 'arrow={{ pointAtCenter: true }}'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    warning(
      !destroyTooltipOnHide || typeof destroyTooltipOnHide === 'boolean',
      'usage',
      '`destroyTooltipOnHide` no need config `keepParent` anymore. Please use `boolean` value directly.',
    );

    warning(
      !arrow || typeof arrow === 'boolean' || !('arrowPointAtCenter' in arrow),
      'deprecated',
      '`arrowPointAtCenter` in `arrow` is deprecated. Please use `pointAtCenter` instead.',
    );
  }

  // ============================== Open ==============================
  const [open, setOpen] = useMergedState(false, {
    value: props.open ?? props.visible,
    defaultValue: props.defaultOpen ?? props.defaultVisible,
  });

  const noTitle = !title && !overlay && title !== 0; // overlay for old version compatibility

  const onOpenChange = (vis: boolean) => {
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      props.onOpenChange?.(vis);
      props.onVisibleChange?.(vis);
    }
  };

  const tooltipPlacements = React.useMemo<BuildInPlacements>(() => {
    let mergedArrowPointAtCenter = arrowPointAtCenter;
    if (typeof arrow === 'object') {
      mergedArrowPointAtCenter =
        arrow.pointAtCenter ?? arrow.arrowPointAtCenter ?? arrowPointAtCenter;
    }
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter: mergedArrowPointAtCenter,
        autoAdjustOverflow,
        arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
        borderRadius: token.borderRadius,
        offset: token.marginXXS,
        visibleFirst: true,
      })
    );
  }, [arrowPointAtCenter, arrow, builtinPlacements, token]);

  const memoOverlay = React.useMemo<TooltipProps['overlay']>(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  }, [overlay, title]);

  const memoOverlayWrapper = (
    <NoCompactStyle>
      {typeof memoOverlay === 'function' ? memoOverlay() : memoOverlay}
    </NoCompactStyle>
  );

  const {
    getPopupContainer,
    placement = 'top',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    rootClassName,
    ...otherProps
  } = props;

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const injectFromPopover = (props as any)['data-popover-inject'];

  let tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && !('visible' in props) && noTitle) {
    tempOpen = false;
  }

  // ============================= Render =============================
  const child =
    isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;
  const childProps = child.props;
  const childCls =
    !childProps.className || typeof childProps.className === 'string'
      ? classNames(childProps.className, openClassName || `${prefixCls}-open`)
      : childProps.className;

  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls, !injectFromPopover);

  // Color
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;
  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const customOverlayClassName = classNames(
    overlayClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    colorInfo.className,
    rootClassName,
    hashId,
  );

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tooltip', otherProps.zIndex);

  const content = (
    <RcTooltip
      {...otherProps}
      zIndex={injectFromPopover ? otherProps.zIndex : zIndex}
      showArrow={mergedShowArrow}
      placement={placement}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      prefixCls={prefixCls}
      overlayClassName={customOverlayClassName}
      overlayStyle={{ ...arrowContentStyle, ...overlayStyle }}
      getTooltipContainer={getPopupContainer || getTooltipContainer || getContextPopupContainer}
      ref={tooltipRef}
      builtinPlacements={tooltipPlacements}
      overlay={memoOverlayWrapper}
      visible={tempOpen}
      onVisibleChange={onOpenChange}
      afterVisibleChange={afterOpenChange ?? afterVisibleChange}
      overlayInnerStyle={formattedOverlayInnerStyle}
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      motion={{
        motionName: getTransitionName(rootPrefixCls, 'zoom-big-fast', props.transitionName),
        motionDeadline: 1000,
      }}
      destroyTooltipOnHide={!!destroyTooltipOnHide}
    >
      {tempOpen ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );

  return wrapSSR(<zIndexContext.Provider value={contextZIndex}>{content}</zIndexContext.Provider>);
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TooltipProps> & React.RefAttributes<unknown>
> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}

Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tooltip;
