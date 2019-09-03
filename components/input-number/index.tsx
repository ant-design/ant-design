import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import Icon from '../icon';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
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
  onChange?: (value: number | undefined) => void;
  disabled?: boolean;
  size?: 'large' | 'small' | 'default';
  formatter?: (value: number | string | undefined) => string;
  parser?: (displayValue: string | undefined) => number | string;
  decimalSeparator?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  id?: string;
  precision?: number;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export default class InputNumber extends React.Component<InputNumberProps, any> {
  static defaultProps = {
    step: 1,
  };

  private inputNumberRef: any;

  saveInputNumber = (inputNumberRef: any) => {
    this.inputNumberRef = inputNumberRef;
  };

  focus() {
    this.inputNumberRef.focus();
  }

  blur() {
    this.inputNumberRef.blur();
  }

  renderInputNumber = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { className, size, prefixCls: customizePrefixCls, ...others } = this.props;
    const prefixCls = getPrefixCls('input-number', customizePrefixCls);
    const inputNumberClass = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );
    const upIcon = <Icon type="up" className={`${prefixCls}-handler-up-inner`} />;
    const downIcon = <Icon type="down" className={`${prefixCls}-handler-down-inner`} />;

    return (
      <RcInputNumber
        ref={this.saveInputNumber}
        className={inputNumberClass}
        upHandler={upIcon}
        downHandler={downIcon}
        prefixCls={prefixCls}
        {...others}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderInputNumber}</ConfigConsumer>;
  }
}
