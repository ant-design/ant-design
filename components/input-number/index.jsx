import React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';

export default class InputNumber extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-input-number',
    step: 1,
  }

  render() {
    const { className, size, ...other } = this.props;
    const inputNumberClass = classNames({
      'ant-input-number-lg': size === 'large',
      'ant-input-number-sm': size === 'small',
      [className]: !!className,
    });

    return <RcInputNumber className={inputNumberClass} {...other} />;
  }
}
