import * as React from 'react';
import RcTooltip from '@rc-component/tooltip';
import type { placements as Placements } from '@rc-component/tooltip/lib/placements';
import type {
  TooltipProps as RcTooltipProps,
  TooltipRef as RcTooltipRef,
} from '@rc-component/tooltip/lib/Tooltip';
import type { BuildInPlacements } from '@rc-component/trigger';
import useMergedState from '@rc-component/util/lib/hooks/useMergedState';
import classNames from 'classnames';

import type { PresetColorType } from '../_util/colors';
import ContextIsolator from '../_util/ContextIsolator';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { useZIndex } from '../_util/hooks/useZIndex';
import { getTransitionName } from '../_util/motion';
import type { AdjustOverflow, PlacementsConfig } from '../_util/placements';
import getPlacements from '../_util/placements';
import { cloneElement, isFragment } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { ConfigContext } from '../config-provider';
import { useToken } from '../theme/internal';
import useMergedArrow from './hook/useMergedArrow';
import PurePanel from './PurePanel';
import useStyle from './style';
import { parseColor } from './util';

export type { AdjustOverflow, PlacementsConfig };

export interface TooltipRef {
  forceAlign: VoidFunction;
  /** Wrapped dom element. Not promise valid if child not support ref */
  nativeElement: HTMLElement;
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
}

export interface AbstractTooltipProps extends LegacyTooltipProps {
  styles?: {
    root?: React.CSSProperties;
    body?: React.CSSProperties;
  };
  classNames?: {
    root?: string;
    body?: string;
  };
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType>;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrow?:
    | boolean
    | {
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

const InternalTooltip = React.forwardRef<TooltipRef, TooltipProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    color,
    overlayInnerStyle,
    children,
    afterOpenChange,
    destroyTooltipOnHide,
    title,
    overlay,
    builtinPlacements,
    autoAdjustOverflow = true,
    motion,
  } = props;

  const {
    getPopupContainer,
    placement = 'top',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    rootClassName,
    overlayClassName,
    styles,
    classNames: tooltipClassNames,
    arrow: tooltipArrow,
    ...restProps
  } = props;

  const [, token] = useToken();

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    tooltip,
  } = React.useContext(ConfigContext);
  const mergedArrow = useMergedArrow(tooltipArrow, tooltip?.arrow);
  const mergedShowArrow = mergedArrow?.show ?? true;

  // ============================== Ref ===============================
  const warning = devUseWarning('Tooltip');

  const tooltipRef = React.useRef<RcTooltipRef>(null);

  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };

  React.useImperativeHandle(ref, () => ({
    forceAlign,
    nativeElement: tooltipRef.current?.nativeElement!,
  }));

  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    [
      ['overlayStyle', 'styles={{ root: {} }}'],
      ['overlayInnerStyle', 'styles={{ body: {} }}'],
      ['overlayClassName', 'classNames={{ root: {} }}'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });

    warning(
      !destroyTooltipOnHide || typeof destroyTooltipOnHide === 'boolean',
      'usage',
      '`destroyTooltipOnHide` no need config `keepParent` anymore. Please use `boolean` value directly.',
    );
  }

  // ============================== Open ==============================
  const [open, setOpen] = useMergedState(false, {
    value: props.open,
    defaultValue: props.defaultOpen,
  });

  const noTitle = !title && !overlay && title !== 0; // overlay for old version compatibility

  const onOpenChange = (vis: boolean) => {
    setOpen(noTitle ? false : vis);
    if (!noTitle) {
      props.onOpenChange?.(vis);
    }
  };

  const tooltipPlacements = React.useMemo<BuildInPlacements>(() => {
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter: mergedArrow?.pointAtCenter ?? false,
        autoAdjustOverflow,
        arrowWidth: mergedShowArrow ? token.sizePopupArrow : 0,
        borderRadius: token.borderRadius,
        offset: token.marginXXS,
        visibleFirst: true,
      })
    );
  }, [mergedArrow, builtinPlacements, token]);

  const memoOverlay = React.useMemo<TooltipProps['overlay']>(() => {
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  }, [overlay, title]);

  const memoOverlayWrapper = (
    <ContextIsolator space>
      {typeof memoOverlay === 'function' ? memoOverlay() : memoOverlay}
    </ContextIsolator>
  );

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const injectFromPopover = (props as any)['data-popover-inject'];

  let tempOpen = open;
  // Hide tooltip when there is no title
  if (!('open' in props) && noTitle) {
    tempOpen = false;
  }

  // ============================= Render =============================
  const child =
    React.isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;
  const childProps = child.props;
  const childCls =
    !childProps.className || typeof childProps.className === 'string'
      ? classNames(childProps.className, openClassName || `${prefixCls}-open`)
      : childProps.className;

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, !injectFromPopover);

  // Color
  const colorInfo = parseColor(prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;

  const rootClassNames = classNames(
    overlayClassName,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    colorInfo.className,
    rootClassName,
    hashId,
    cssVarCls,
    tooltip?.className,
    tooltip?.classNames?.root,
    tooltipClassNames?.root,
  );

  const bodyClassNames = classNames(tooltip?.classNames?.body, tooltipClassNames?.body);

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tooltip', restProps.zIndex);

  const content = (
    <RcTooltip
      {...restProps}
      zIndex={zIndex}
      showArrow={mergedShowArrow}
      placement={placement}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      prefixCls={prefixCls}
      classNames={{ root: rootClassNames, body: bodyClassNames }}
      styles={{
        root: {
          ...arrowContentStyle,
          ...tooltip?.styles?.root,
          ...tooltip?.style,
          ...overlayStyle,
          ...styles?.root,
        },
        body: {
          ...tooltip?.styles?.body,
          ...overlayInnerStyle,
          ...styles?.body,
          ...colorInfo.overlayStyle,
        },
      }}
      getTooltipContainer={getPopupContainer || getTooltipContainer || getContextPopupContainer}
      ref={tooltipRef}
      builtinPlacements={tooltipPlacements}
      overlay={memoOverlayWrapper}
      visible={tempOpen}
      onVisibleChange={onOpenChange}
      afterVisibleChange={afterOpenChange}
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      motion={{
        motionName: getTransitionName(
          rootPrefixCls,
          'zoom-big-fast',
          typeof motion?.motionName === 'string' ? motion?.motionName : undefined,
        ),
        motionDeadline: 1000,
      }}
      destroyTooltipOnHide={!!destroyTooltipOnHide}
    >
      {tempOpen ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );

  return wrapCSSVar(
    <zIndexContext.Provider value={contextZIndex}>{content}</zIndexContext.Provider>,
  );
});

type CompoundedComponent = typeof InternalTooltip & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const Tooltip = InternalTooltip as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}

Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tooltip;
