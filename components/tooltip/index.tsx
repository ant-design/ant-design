import React from 'react';
import { cloneElement } from 'react';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import getPlacements from './placements';

export type TooltipPlacement =
  'top' | 'left' | 'right' | 'bottom' |
  'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' |
  'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface AbstractTooltipProps {
  prefixCls?: string;
  overlayClassName?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  placement?: TooltipPlacement;
  builtinPlacements?: Object;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  transitionName?: string;
  trigger?: 'hover' | 'focus' | 'click';
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  // getTooltipContainer had been rename to getPopupContainer
  getTooltipContainer?: (triggerNode: Element) => HTMLElement;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  children?: React.ReactElement<any>;
}

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode;
  overlay?: React.ReactNode;
}

const splitObject = (obj, keys) => {
  const picked = {};
  const omited = { ...obj };
  keys.forEach(key => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omited[key];
    }
  });
  return { picked, omited };
};

export default class Tooltip extends React.Component<TooltipProps, any> {
  static defaultProps = {
    prefixCls: 'ant-tooltip',
    placement: 'top',
    transitionName: 'zoom-big-fast',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
  };

  refs: {
    tooltip: any;
  };

  constructor(props: TooltipProps) {
    super(props);

    this.state = {
      visible: !!props.visible,
    };
  }

  componentWillReceiveProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onVisibleChange = (visible) => {
    const { onVisibleChange } = this.props;
    if (!('visible' in this.props)) {
      this.setState({ visible: this.isNoTitle() ? false : visible });
    }
    if (onVisibleChange && !this.isNoTitle()) {
      onVisibleChange(visible);
    }
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  getPlacements() {
    const { builtinPlacements, arrowPointAtCenter } = this.props;
    return builtinPlacements || getPlacements({
      arrowPointAtCenter,
      verticalArrowShift: 8,
    });
  }

  isHoverTrigger() {
    const { trigger } = this.props;
    if (!trigger || trigger === 'hover') {
      return true;
    }
    if (Array.isArray(trigger)) {
      return trigger.indexOf('hover') >= 0;
    }
    return false;
  }

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  getDisabledCompatibleChildren(element) {
    if ((element.type.__ANT_BUTTON || element.type === 'button') &&
        element.props.disabled && this.isHoverTrigger()) {
      // Pick some layout related style properties up to span
      // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
      const { picked, omited } = splitObject(
        element.props.style,
        ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex'],
      );
      const spanStyle = {
        display: 'inline-block',  // default inline-block is important
        ...picked,
        cursor: 'not-allowed',
      };
      const buttonStyle = {
        ...omited,
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
    return !title && !overlay;  // overlay for old version compatibility
  }

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    const placements = this.getPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key => (
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
      ),
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
  }

  render() {
    const { props, state } = this;
    const { prefixCls, title, overlay, openClassName, getPopupContainer, getTooltipContainer } = props;
    const children = props.children as React.ReactElement<any>;
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
        getTooltipContainer={getPopupContainer || getTooltipContainer}
        ref="tooltip"
        builtinPlacements={this.getPlacements()}
        overlay={overlay || title}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        onPopupAlign={this.onPopupAlign}
      >
        {visible ? cloneElement(child, { className: childCls }) : child}
      </RcTooltip>
    );
  }
}
