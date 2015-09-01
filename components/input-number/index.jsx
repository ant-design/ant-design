import InputNumber from 'rc-input-number';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render() {
    let sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = 'ant-input-number-lg';
    } else if (this.props.size === 'small') {
      sizeClass = 'ant-input-number-sm';
    }
    return <InputNumber className={sizeClass} style={{width: 90}} {...this.props} />;
  }
});
