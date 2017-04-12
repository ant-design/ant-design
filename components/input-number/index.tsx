import React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';

export interface InputNumberProps {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  onChange?: (value: number | string | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    prefixCls: 'ant-input-number',
    step: 1,
  };

  render() {
    const { className, size, ...others } = this.props;
    const inputNumberClass = classNames({
      [`${this.props.prefixCls}-lg`]: size === 'large',
      [`${this.props.prefixCls}-sm`]: size === 'small',
    }, className);

    return <RcInputNumber className={inputNumberClass} {...others} />;
  }
}
