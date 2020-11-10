import * as React from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import classNames from 'classnames';
import { BuildInPlacements } from 'rc-trigger/lib/interface';
import getPlacements, { AdjustOverflow, PlacementsConfig } from './placements';
import { cloneElement, isValidElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { PresetColorType, PresetColorTypes } from '../_util/colors';
import { LiteralUnion } from '../_util/type';

export { AdjustOverflow, PlacementsConfig };

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

export interface AbstractTooltipProps extends Partial<Omit<RcTooltipProps, 'children'>> {
  style?: React.CSSProperties;
  className?: string;
  color?: LiteralUnion<PresetColorType, string>;
  placement?: TooltipPlacement;
  builtinPlacements?: BuildInPlacements;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;
}

export type RenderFunction = () => React.ReactNode;

export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay: React.ReactNode | RenderFunction;
}

export interface TooltipPropsWithTitle extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

const splitObject = (obj: any, keys: string[]) => {
  const picked: any = {};
  const omitted: any = { ...obj };
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};
const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
function getDisabledCompatibleChildren(element: React.ReactElement<any>, prefixCls: string) {
  const elementType = element.type as any;
  if (
    (elementType.__ANT_BUTTON === true ||
      elementType.__ANT_SWITCH === true ||
      elementType.__ANT_CHECKBOX === true ||
      element.type === 'button') &&
    element.props.disabled
  ) {
    // Pick some layout related style properties up to span
    // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
    const { picked, omitted } = splitObject(element.props.style, [
      'position',
      'left',
      'right',
      'top',
      'bottom',
      'float',
      'display',
      'zIndex',
    ]);
    const spanStyle = {
      display: 'inline-block', // default inline-block is important
      ...picked,
      cursor: 'not-allowed',
      width: element.props.block ? '100%' : null,
    };
    const buttonStyle = {
      ...omitted,
      pointerEvents: 'none',
    };
    const child = cloneElement(element, {
      style: buttonStyle,
      className: null,
    });
    return (
      <span
        style={spanStyle}
        className={classNames(element.props.className, `${prefixCls}-disabled-compatible-wrapper`)}
      >
        {child}
      </span>
    );
  }
  return element;
}

const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction } = React.useContext(
    ConfigContext,
  );

  const [visible, setVisible] = React.useState(!!props.visible || !!props.defaultVisible);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  const isNoTitle = () => {
    const { title, overlay } = props;
    return !title && !overlay && title !== 0; // overlay for old version compatibility
  };

  const onVisibleChange = (vis: boolean) => {
    if (!('visible' in props)) {
      setVisible(isNoTitle() ? false : vis);
    }
    if (props.onVisibleChange && !isNoTitle()) {
      props.onVisibleChange(vis);
    }
  };

  const getTooltipPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = props;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        autoAdjustOverflow,
      })
    );
  };

  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: any) => {
    const placements: any = getTooltipPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key =>
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1],
    )[0];
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();
    const transformOrigin = {
      top: '50%',
      left: '50%',
    };
    if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
      transformOrigin.top = `${rect.height - align.offset[1]}px`;
    } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
      transformOrigin.top = `${-align.offset[1]}px`;
    }
    if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
      transformOrigin.left = `${rect.width - align.offset[0]}px`;
    } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
      transformOrigin.left = `${-align.offset[0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  };

  const getOverlay = () => {
    const { title, overlay } = props;
    if (title === 0) {
      return title;
    }
    return overlay || title || '';
  };

  const {
    prefixCls: customizePrefixCls,
    openClassName,
    getPopupContainer,
    getTooltipContainer,
    overlayClassName,
    color,
    overlayInnerStyle,
    children,
  } = props;
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  let tempVisible = visible;
  // Hide tooltip when there is no title
  if (!('visible' in props) && isNoTitle()) {
    tempVisible = false;
  }

  const child = getDisabledCompatibleChildren(
    isValidElement(children) ? children : <span>{children}</span>,
    prefixCls,
  );
  const childProps = child.props;
  const childCls = classNames(childProps.className, {
    [openClassName || `${prefixCls}-open`]: true,
  });

  const customOverlayClassName = classNames(overlayClassName, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-${color}`]: color && PresetColorRegex.test(color),
  });

  let formattedOverlayInnerStyle = overlayInnerStyle;
  let arrowContentStyle;
  if (color && !PresetColorRegex.test(color)) {
    formattedOverlayInnerStyle = { ...overlayInnerStyle, background: color };
    arrowContentStyle = { background: color };
  }

  return (
    <RcTooltip
      {...props}
      prefixCls={prefixCls}
      overlayClassName={customOverlayClassName}
      getTooltipContainer={getPopupContainer || getTooltipContainer || getContextPopupContainer}
      ref={ref}
      builtinPlacements={getTooltipPlacements()}
      overlay={getOverlay()}
      visible={tempVisible}
      onVisibleChange={onVisibleChange}
      onPopupAlign={onPopupAlign}
      overlayInnerStyle={formattedOverlayInnerStyle}
      arrowContent={<span className={`${prefixCls}-arrow-content`} style={arrowContentStyle} />}
    >
      {tempVisible ? cloneElement(child, { className: childCls }) : child}
    </RcTooltip>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  placement: 'top' as TooltipPlacement,
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
};

export default Tooltip;
