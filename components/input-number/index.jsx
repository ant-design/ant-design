import InputNumber from 'rc-input-number';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render() {
    return <InputNumber style={{width: 90}} {...this.props} />;
  }
});
