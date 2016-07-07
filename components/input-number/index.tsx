import React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import splitObject from '../_util/splitObject';

export default class InputNumber extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-input-number',
    step: 1,
  }

  render() {
    const [{className, size}, others] = splitObject(this.props,
      ['size','className']);
    const inputNumberClass = classNames({
      [`${this.props.prefixCls}-lg`]: size === 'large',
      [`${this.props.prefixCls}-sm`]: size === 'small',
      [className]: !!className,
    });

    return <RcInputNumber className={inputNumberClass} {...others} />;
  }
}
