import React from 'react';
import Tooltip from 'rc-tooltip';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-tooltip',
      placement: 'top',
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1
    };
  },
  render() {
    let transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];
    return (
      this.props.title ? <Tooltip transitionName={transitionName}
        overlay={this.props.title}
        {...this.props}>
        {this.props.children}
      </Tooltip> : this.props.children
    );
  }
});
