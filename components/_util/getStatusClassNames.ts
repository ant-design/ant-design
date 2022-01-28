import classNames from 'classnames';
import { ValidateStatus } from '../form/FormItem';

export default function getStatusClassNames(
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
