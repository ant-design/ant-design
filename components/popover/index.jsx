import React from 'react';
import Tooltip from 'rc-tooltip';
const prefixCls = 'ant-popover';

export default React.createClass({
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
    const overlay = <div>
      <div className={prefixCls + '-title'}>
        {this.props.title}
      </div>
      <div className={prefixCls + '-content'}>
        {this.props.overlay}
      </div>
    </div>;

    const transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return (
      <Tooltip transitionName={transitionName}
        {...this.props} overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
