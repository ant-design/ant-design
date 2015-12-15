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
    return (
      <Dropdown {...this.props} />
    );
  }
});
