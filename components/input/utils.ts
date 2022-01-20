import classNames from 'classnames';
import { ValidateStatus } from '../form/FormItem';
import type { DirectionType } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import type { ClearableInputProps } from './ClearableLabeledInput';
import type { InputProps } from './Input';

export function getInputValidationClassName(prefixCls: string, validateStatus?: ValidateStatus) {
  return classNames({
    [`${prefixCls}-has-success`]: validateStatus === 'success',
    [`${prefixCls}-has-warning`]: validateStatus === 'warning',
    [`${prefixCls}-has-error`]: validateStatus === 'error',
    [`${prefixCls}-is-validating`]: validateStatus === 'validating',
  });
}

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
  validateStatus?: ValidateStatus,
) {
  return classNames(
    prefixCls,
    {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    getInputValidationClassName(prefixCls, validateStatus),
  );
}

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
