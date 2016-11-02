import React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import splitObject from '../_util/splitObject';

export interface InputNumberProps {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
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
    const [{ className, size }, others] = splitObject(this.props,
      ['size', 'className']);
    const inputNumberClass = classNames({
      [`${this.props.prefixCls}-lg`]: size === 'large',
      [`${this.props.prefixCls}-sm`]: size === 'small',
      [className]: !!className,
    });

    return <RcInputNumber className={inputNumberClass} {...others} />;
  }
}
