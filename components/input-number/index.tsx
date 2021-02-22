import * as React from 'react';
import classNames from 'classnames';
import RcInputNumber, { InputNumberProps as RcInputNumberProps } from 'rc-input-number';
import UpOutlined from '@ant-design/icons/UpOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';

import { ConfigContext } from '../config-provider';
import { Omit } from '../_util/type';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

type ValueType = string | number;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'size'> {
  prefixCls?: string;
  size?: SizeType;
  bordered?: boolean;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const size = React.useContext(SizeContext);

  const {
    className,
    size: customizeSize,
    prefixCls: customizePrefixCls,
    bordered = true,
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
      [`${prefixCls}-borderless`]: !bordered,
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

export default InputNumber as (<T extends ValueType = ValueType>(
  props: React.PropsWithChildren<InputNumberProps<T>> & {
    ref?: React.Ref<HTMLInputElement>;
  },
) => React.ReactElement) & { displayName?: string };
