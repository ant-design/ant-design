import React from 'react';
import Tooltip from 'rc-tooltip';
import getPlacements from './placements';

const placements = getPlacements();

export default class Popover extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-popover',
    placement: 'top',
    trigger: 'hover',
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    overlayStyle: {},
  }

  render() {
    const transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left',
      topLeft: 'zoom-down',
      bottomLeft: 'zoom-up',
      leftTop: 'zoom-right',
      rightTop: 'zoom-left',
      topRight: 'zoom-down',
      bottomRight: 'zoom-up',
      leftBottom: 'zoom-right',
      rightBottom: 'zoom-left',
    })[this.props.placement];

    return (
      <Tooltip transitionName={transitionName}
        builtinPlacements={placements}
        ref="tooltip"
        {...this.props}
        overlay={this.getOverlay()}>
        {this.props.children}
      </Tooltip>
    );
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  getOverlay() {
    const { title, prefixCls, overlay } = this.props;
    return (
      <div>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        <div className={`${prefixCls}-inner-content`}>
          {overlay}
        </div>
      </div>
    );
  }
}
