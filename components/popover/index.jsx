import React from 'react';
import Tooltip from 'rc-tooltip';

const prefixCls = 'ant-popover';

const Popover = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: prefixCls,
      placement: 'top',
      trigger: 'hover',
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1,
      overlayStyle: {}
    };
  },

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
               ref="tooltip"
               {...this.props}
               overlay={this.getOverlay()}>
        {this.props.children}
      </Tooltip>
    );
  },

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  },

  getOverlay() {
    return <div>
      {this.props.title && <div className={prefixCls + '-title'}>{this.props.title}</div>}
      <div className={prefixCls + '-content'}>
        {this.props.overlay}
      </div>
    </div>;
  },
});

export default Popover;
