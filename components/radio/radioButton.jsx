import React from 'react';
import Radio from './radio';

const RadioButton = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio-button',
    };
  },
  render() {
    return (
      <Radio {...this.props} />
    );
  }
});

export default RadioButton;
