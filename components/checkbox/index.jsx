import Checkbox from 'rc-checkbox';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-checkbox'
    };
  },
  render() {
    return <Checkbox {...this.props} />;
  }
});
