import React, { cloneElement } from 'react';
import RcTooltip from 'rc-tooltip';
import getPlacements from '../popover/placements';

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

export default class Tooltip extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-tooltip',
    placement: 'top',
    transitionName: 'zoom-big',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    onVisibleChange() {},
    arrowPointAtCenter: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
    this.props.onVisibleChange(visible);
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

  // 动态设置动画点
  onPopupAlign = (domNode, align) => {
    const placements = this.getPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).filter(
      key => (
        placements[key].points[0] === align.points[0] &&
        placements[key].points[1] === align.points[1]
      )
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

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  getDisabledCompatibleChildren(element) {
    if ((element.type.ANT_BUTTON || element.type === 'button') &&
        element.props.disabled) {
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

  render() {
    const { prefixCls, title, overlay, children } = this.props;
    // Hide tooltip when there is no title
    let visible = this.state.visible;
    if (!title && !overlay) {
      visible = false;
    }
    if ('visible' in this.props) {
      visible = this.props.visible;
    }
    const child = this.getDisabledCompatibleChildren(
      React.isValidElement(children) ? children : <span>{children}</span>,
    );
    const openClassName = this.props.openClassName || `${prefixCls}-open`;
    const childrenCls = (children && children.props && children.props.className)
      ? `${children.props.className} ${openClassName}` : openClassName;

    return (
      <RcTooltip
        overlay={title}
        visible={visible}
        onPopupAlign={this.onPopupAlign}
        ref="tooltip"
        {...this.props}
        builtinPlacements={this.getPlacements()}
        onVisibleChange={this.onVisibleChange}
      >
        {visible ? cloneElement(child, { className: childrenCls }) : child}
      </RcTooltip>
    );
  }
}
