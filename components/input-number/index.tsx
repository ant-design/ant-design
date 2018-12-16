import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
import { Omit } from '../_util/type';

// omitting this attrs because they conflicts with the ones defined in InputNumberProps
export type OmitAttrs = 'defaultValue' | 'onChange' | 'size';

export interface InputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
  prefixCls?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number | string;
  defaultValue?: number;
  tabIndex?: number;
  onChange?: (value: number | string | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number;
  decimalSeparator?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  precision?: number;
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    prefixCls: 'ant-input-number',
    step: 1,
  };

  private inputNumberRef: any;

  render() {
    const { className, size, ...others } = this.props;
    const inputNumberClass = classNames(
      {
        [`${this.props.prefixCls}-lg`]: size === 'large',
        [`${this.props.prefixCls}-sm`]: size === 'small',
      },
      className,
    );
    const upIcon = <Icon type="up" className={`${this.props.prefixCls}-handler-up-inner`} />;
    const downIcon = <Icon type="down" className={`${this.props.prefixCls}-handler-down-inner`} />;

    return (
      <RcInputNumber
        ref={(c: any) => (this.inputNumberRef = c)}
        className={inputNumberClass}
        upHandler={upIcon}
        downHandler={downIcon}
        {...others}
      />
    );
  }

  focus() {
    this.inputNumberRef.focus();
  }

  blur() {
    this.inputNumberRef.blur();
  }
}
