import React from 'react';
import { cloneElement } from 'react';
import RcTooltip from 'rc-tooltip';
import getPlacements from './placements';
import classNames from 'classnames';

export type PopoverPlacement =
  'top' | 'left' | 'right' | 'bottom' | 'topLeft' |
  'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' |
  'leftBottom' | 'rightTop' | 'rightBottom'

// Tooltip
export interface TooltipProps {
  /**
    气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft`
    `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom`
  */
  placement?: PopoverPlacement;
  /** 提示文字 */
  title: React.ReactNode;
  style?: React.CSSProperties;
  builtinPlacements?: Object;
  /** Style of overlay */
  overlayStyle?: React.CSSProperties;
  prefixCls?: string;
  /** Callback when display/hide */
  onVisibleChange?: (visible: boolean) => void;
  transitionName?: string;
  visible?: boolean;
  trigger?: 'hover' | 'focus' | 'click';
  overlay?: React.ReactNode;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  getTooltipContainer?: (triggerNode: React.ReactNode) => HTMLElement;
}

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
    [key: string]: any;
    tooltip: any;
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onVisibleChange = (visible) => {
    this.setState({ visible });
    const onVisibleChange = this.props.onVisibleChange;
    if (onVisibleChange) {
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

    const childrenProps = children ? (children as React.ReactElement<any>).props : {};
    const childrenCls = classNames({
      [childrenProps.className]: !!childrenProps.className,
      [this.props.openClassName || `${prefixCls}-open`]: true,
    });

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
        {visible ? cloneElement((children as React.ReactElement<any>), { className: childrenCls }) : children}
      </RcTooltip>
    );
  }
}
