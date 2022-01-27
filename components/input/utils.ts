import classNames from 'classnames';
import { ValidateStatus } from '../form/FormItem';
import type { DirectionType } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import type { ClearableInputProps } from './ClearableLabeledInput';
import type { InputProps } from './Input';

export function getInputValidationClassName(
  prefixCls: string,
  status?: ValidateStatus,
  hasFeedback?: boolean,
) {
  return classNames({
    [`${prefixCls}-has-success`]: status === 'success',
    [`${prefixCls}-has-warning`]: status === 'warning',
    [`${prefixCls}-has-error`]: status === 'error',
    [`${prefixCls}-is-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  });
}

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
  status?: ValidateStatus,
  hasFeedback?: boolean,
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
    getInputValidationClassName(prefixCls, status, hasFeedback),
  );
}

export function hasPrefixSuffix(props: InputProps | ClearableInputProps) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
