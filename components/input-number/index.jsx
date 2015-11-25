import React from 'react';
import classNames from 'classnames';
import InputNumber from 'rc-input-number';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number',
      step: 1,
    };
  },
  render() {
    const {className, size, ...other} = this.props;
    const inputNumberClass = classNames({
      'ant-input-number-lg': size === 'large',
      'ant-input-number-sm': size === 'small',
      [className]: !!className,
    });

    return <InputNumber className={inputNumberClass} {...other} />;
  }
});
