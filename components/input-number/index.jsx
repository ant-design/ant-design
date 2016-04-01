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
    const { className, size, ...other } = this.props;
    const inputNumberClass = classNames({
      [`${this.props.prefixCls}-lg`]: size === 'large',
      [`${this.props.prefixCls}-sm`]: size === 'small',
      [className]: !!className,
    });

    return <InputNumber className={inputNumberClass} {...other} />;
  }
});
