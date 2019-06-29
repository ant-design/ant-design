import * as React from 'react';
import { cloneElement } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import getPlacements, { AdjustOverflow, PlacementsConfig } from './placements';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';

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

export interface AbstractTooltipProps {
  prefixCls?: string;
  overlayClassName?: string;
  style?: React.CSSProperties;
  className?: string;
  overlayStyle?: React.CSSProperties;
  placement?: TooltipPlacement;
  builtinPlacements?: Object;
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  transitionName?: string;
  trigger?: TooltipTrigger;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  // getTooltipContainer had been rename to getPopupContainer
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  children?: React.ReactNode;
  // align is a more higher api
  align?: TooltipAlignConfig;
  destroyTooltipOnHide?: boolean;
}

export type RenderFunction = () => React.ReactNode;

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  overlay?: React.ReactNode | RenderFunction;
}

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

class Tooltip extends React.Component<TooltipProps, any> {
  static defaultProps = {
    placement: 'top' as TooltipPlacement,
    transitionName: 'zoom-big-fast',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true,
  };

  static getDerivedStateFromProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    }
    return null;
  }

  private tooltip: typeof RcTooltip;

  constructor(props: TooltipProps) {
    super(props);

    this.state = {
      visible: !!props.visible || !!props.defaultVisible,
    };
  }

  onVisibleChange = (visible: boolean) => {
    const { onVisibleChange } = this.props;
    if (!('visible' in this.props)) {
      this.setState({ visible: this.isNoTitle() ? false : visible });
    }
    if (onVisibleChange && !this.isNoTitle()) {
      onVisibleChange(visible);
    }
  };

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  getPlacements() {
    const { builtinPlacements, arrowPointAtCenter, autoAdjustOverflow } = this.props;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        verticalArrowShift: 8,
        autoAdjustOverflow,
      })
    );
  }

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  getDisabledCompatibleChildren(element: React.ReactElement<any>) {
    const elementType = element.type as any;
    if (
      (elementType.__ANT_BUTTON || elementType.__ANT_SWITCH || element.type === 'button') &&
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
        <span style={spanStyle} className={element.props.className}>
          {child}
        </span>
      );
    }
    return element;
  }

  isNoTitle() {
    const { title, overlay } = this.props;
    return !title && !overlay; // overlay for old version compatibility
  }

  // 动态设置动画点
  onPopupAlign = (domNode: HTMLElement, align: any) => {
    const placements: any = this.getPlacements();
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

  saveTooltip = (node: typeof RcTooltip) => {
    this.tooltip = node;
  };

  renderTooltip = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const { props, state } = this;
    const {
      prefixCls: customizePrefixCls,
      title,
      overlay,
      openClassName,
      getPopupContainer,
      getTooltipContainer,
    } = props;
    const children = props.children as React.ReactElement<any>;
    const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
    let visible = state.visible;
    // Hide tooltip when there is no title
    if (!('visible' in props) && this.isNoTitle()) {
      visible = false;
    }

    const child = this.getDisabledCompatibleChildren(
      React.isValidElement(children) ? children : <span>{children}</span>,
    );

    const childProps = child.props;
    const childCls = classNames(childProps.className, {
      [openClassName || `${prefixCls}-open`]: true,
    });

    return (
      <RcTooltip
        {...this.props}
        prefixCls={prefixCls}
        getTooltipContainer={getPopupContainer || getTooltipContainer || getContextPopupContainer}
        ref={this.saveTooltip}
        builtinPlacements={this.getPlacements()}
        overlay={overlay || title || ''}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        onPopupAlign={this.onPopupAlign}
      >
        {visible ? cloneElement(child, { className: childCls }) : child}
      </RcTooltip>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTooltip}</ConfigConsumer>;
  }
}

polyfill(Tooltip);

export default Tooltip;
