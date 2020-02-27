import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

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
  size?: SizeType;
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
    const { className, size: customizeSize, prefixCls: customizePrefixCls, ...others } = this.props;
    const prefixCls = getPrefixCls('input-number', customizePrefixCls);
    const upIcon = <UpOutlined className={`${prefixCls}-handler-up-inner`} />;
    const downIcon = <DownOutlined className={`${prefixCls}-handler-down-inner`} />;

    return (
      <SizeContext.Consumer>
        {size => {
          const mergeSize = customizeSize || size;
          const inputNumberClass = classNames(
            {
              [`${prefixCls}-lg`]: mergeSize === 'large',
              [`${prefixCls}-sm`]: mergeSize === 'small',
            },
            className,
          );

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
        }}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderInputNumber}</ConfigConsumer>;
  }
}
