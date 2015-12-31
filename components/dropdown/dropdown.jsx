import React from 'react';
import Dropdown from 'rc-dropdown';

export default React.createClass({
  getDefaultProps: function () {
    return {
      transitionName: 'slide-up',
      prefixCls: 'ant-dropdown',
    };
  },
  render: function () {
    const { overlay, ...otherProps } = this.props;
    const menu = React.cloneElement(overlay, {
      openTransitionName: 'zoom-big',
    });
    return (
      <Dropdown {...otherProps} overlay={menu} />
    );
  }
});
