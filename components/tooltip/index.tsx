import * as React from 'react';
import RcTooltip from '@rc-component/tooltip';
import type { placements as Placements } from '@rc-component/tooltip/lib/placements';
import type {
  TooltipProps as RcTooltipProps,
  TooltipRef as RcTooltipRef,
} from '@rc-component/tooltip/lib/Tooltip';
import type { BuildInPlacements } from '@rc-component/trigger';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import type { PresetColorType } from '../_util/colors';
import ContextIsolator from '../_util/ContextIsolator';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { useMergeSemantic, useZIndex } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { getTransitionName } from '../_util/motion';
import type { AdjustOverflow, PlacementsConfig } from '../_util/placements';
import getPlacements from '../_util/placements';
import { cloneElement, isFragment } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import zIndexContext from '../_util/zindexContext';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import useMergedArrow from './hook/useMergedArrow';
import PurePanel from './PurePanel';
import useStyle from './style';
import UniqueProvider from './UniqueProvider';
import { parseColor } from './util';

export type { AdjustOverflow, PlacementsConfig };

export interface TooltipRef {
  forceAlign: VoidFunction;
  /** Wrapped dom element. Not promise valid if child not support ref */
  nativeElement: HTMLElement;
  /** Popup dom element */
  popupElement: HTMLDivElement;
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
      | 'classNames'
      | 'styles'
    >
  > {
  open?: RcTooltipProps['visible'];
  defaultOpen?: RcTooltipProps['defaultVisible'];
  onOpenChange?: RcTooltipProps['onVisibleChange'];
  afterOpenChange?: RcTooltipProps['afterVisibleChange'];
}

export type SemanticName = 'root' | 'container' | 'arrow';

export type TooltipClassNamesType = SemanticClassNamesType<TooltipProps, SemanticName>;

export type TooltipStylesType = SemanticStylesType<TooltipProps, SemanticName>;

export interface AbstractTooltipProps extends LegacyTooltipProps {
  style?: React.CSSProperties;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType>;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrow?: boolean | { pointAtCenter?: boolean };
  autoAdjustOverflow?: boolean | AdjustOverflow;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;

  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;

  // ===================== Legacy ==============================
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyTooltipOnHide?: boolean | { keepParent?: boolean };

  /** @deprecated Please use `styles.root` instead */
  overlayStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.container` instead */
  overlayInnerStyle?: React.CSSProperties;
  /** @deprecated Please use `classNames.root` instead */
  overlayClassName?: string;
}

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
  classNames?: TooltipClassNamesType;
  styles?: TooltipStylesType;
}

interface InternalTooltipProps extends TooltipProps {
  /**
   * @internal
   * Internal props type with hidden properties
   */
  'data-popover-inject'?: boolean;
}

const InternalTooltip = React.forwardRef<TooltipRef, InternalTooltipProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getTooltipContainer,
    color,

    children,
    afterOpenChange,
    arrow: tooltipArrow,
    destroyTooltipOnHide,
    destroyOnHidden,
    title,
    overlay,
    trigger,
    builtinPlacements,
    autoAdjustOverflow = true,
    motion,
    getPopupContainer,
    placement = 'top',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,

    rootClassName,

    styles,
    classNames,
    onOpenChange,

    // Legacy
    overlayInnerStyle,
    overlayStyle,
    overlayClassName,

    ...restProps
  } = props;

  const [, token] = useToken();

  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    arrow: contextArrow,
    trigger: contextTrigger,
  } = useComponentConfig('tooltip');
  const mergedArrow = useMergedArrow(tooltipArrow, contextArrow);
  const mergedShowArrow = mergedArrow.show;
  const mergedTrigger = trigger || contextTrigger || 'hover';

  // ============================== Ref ===============================
  const warning = devUseWarning('Tooltip');

  const tooltipRef = React.useRef<RcTooltipRef>(null);

  const forceAlign = () => {
    tooltipRef.current?.forceAlign();
  };

  React.useImperativeHandle(ref, () => ({
    forceAlign,
    nativeElement: tooltipRef.current?.nativeElement!,
    popupElement: tooltipRef.current?.popupElement!,
  }));

  // ============================== Warn ==============================
  if (process.env.NODE_ENV !== 'production') {
    [
      ['overlayStyle', 'styles.root'],
      ['overlayInnerStyle', 'styles.container'],
      ['overlayClassName', 'classNames.root'],
      ['destroyTooltipOnHide', 'destroyOnHidden'],
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
  const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);

  const noTitle = !title && !overlay && title !== 0; // overlay for old version compatibility

  const onInternalOpenChange = (vis: boolean) => {
    setOpen(noTitle ? false : vis);
    if (!noTitle && onOpenChange) {
      onOpenChange(vis);
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
  }, [mergedArrow, builtinPlacements, token, mergedShowArrow, autoAdjustOverflow]);

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

  // =========== Merged Props for Semantic ===========
  const mergedProps: TooltipProps = {
    ...props,
    trigger: mergedTrigger,
    color,
    placement,
    builtinPlacements,
    openClassName,
    arrow: tooltipArrow,
    autoAdjustOverflow,
    getPopupContainer,
    children,
    destroyTooltipOnHide,
    destroyOnHidden,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TooltipClassNamesType,
    TooltipStylesType,
    TooltipProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  const rootPrefixCls = getPrefixCls();

  const injectFromPopover = props['data-popover-inject'];

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
      ? clsx(childProps.className, openClassName || `${prefixCls}-open`)
      : childProps.className;

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls, !injectFromPopover);

  // Color
  const colorInfo = parseColor(rootPrefixCls, prefixCls, color);
  const arrowContentStyle = colorInfo.arrowStyle;

  const themeCls = clsx(rootCls, hashId, cssVarCls);

  const rootClassNames = clsx(
    overlayClassName,
    { [`${prefixCls}-rtl`]: direction === 'rtl' },
    colorInfo.className,
    rootClassName,
    themeCls,
    contextClassName,
    mergedClassNames.root,
  );

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tooltip', restProps.zIndex);

  const containerStyle: React.CSSProperties = {
    ...mergedStyles.container,
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const content = (
    <RcTooltip
      unique
      {...restProps}
      trigger={mergedTrigger}
      zIndex={zIndex}
      showArrow={mergedShowArrow}
      placement={placement}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      prefixCls={prefixCls}
      classNames={{
        root: rootClassNames,
        container: mergedClassNames.container,
        arrow: mergedClassNames.arrow,
        uniqueContainer: clsx(themeCls, mergedClassNames.container),
      }}
      styles={{
        root: {
          ...arrowContentStyle,
          ...mergedStyles.root,
          ...contextStyle,
          ...overlayStyle,
        },
        container: containerStyle,
        uniqueContainer: containerStyle,
        arrow: mergedStyles.arrow,
      }}
      getTooltipContainer={getPopupContainer || getTooltipContainer || getContextPopupContainer}
      ref={tooltipRef}
      builtinPlacements={tooltipPlacements}
      overlay={memoOverlayWrapper}
      visible={tempOpen}
      onVisibleChange={onInternalOpenChange}
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
      destroyOnHidden={destroyOnHidden ?? !!destroyTooltipOnHide}
    >
      {tempOpen ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );

  return <zIndexContext.Provider value={contextZIndex}>{content}</zIndexContext.Provider>;
});

type CompoundedComponent = typeof InternalTooltip & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
  UniqueProvider: typeof UniqueProvider;
};

const Tooltip = InternalTooltip as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}

Tooltip._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
Tooltip.UniqueProvider = UniqueProvider;

export default Tooltip;
