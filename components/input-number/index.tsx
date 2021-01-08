import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber from 'rc-input-number';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';

import { ConfigContext } from '../config-provider';
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
  onChange?: (value: number | string | undefined | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
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
  onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
}

const InputNumber = React.forwardRef<unknown, InputNumberProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const {
    className,
    size: customizeSize,
    prefixCls: customizePrefixCls,
    readOnly,
    ...others
  } = props;

  const prefixCls = getPrefixCls('input-number', customizePrefixCls);
  const upIcon = <UpOutlined className={`${prefixCls}-handler-up-inner`} />;
  const downIcon = <DownOutlined className={`${prefixCls}-handler-down-inner`} />;

  const mergeSize = customizeSize || size;
  const inputNumberClass = classNames(
    {
      [`${prefixCls}-lg`]: mergeSize === 'large',
      [`${prefixCls}-sm`]: mergeSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-readonly`]: readOnly,
    },
    className,
  );

  return (
    <RcInputNumber
      ref={ref}
      className={inputNumberClass}
      upHandler={upIcon}
      downHandler={downIcon}
      prefixCls={prefixCls}
      readOnly={readOnly}
      {...others}
    />
  );
});

InputNumber.defaultProps = {
  step: 1,
};

export default InputNumber;
