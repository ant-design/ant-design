import InputNumber from 'rc-input-number';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render() {
    var sizeClass = 'ant-input-number-';
    if(this.props.size === 'large'){
      sizeClass += 'lg';
    }
    if(this.props.size === 'small'){
      sizeClass += 'sm';
    }
    return <InputNumber className={sizeClass} style={{width: 90}} {...this.props} />;
  }
});
