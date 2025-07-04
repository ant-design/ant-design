import classNames from 'classnames';

import type { ValidateStatus } from '../form/FormItem';

const _InputStatuses = ['warning', 'error', ''] as const;
export type InputStatus = (typeof _InputStatuses)[number];

export function getStatusClassNames(
  prefixCls: string,
  status?: ValidateStatus,
  hasFeedback?: boolean,
) {
  return classNames({
    [`${prefixCls}-status-success`]: status === 'success',
    [`${prefixCls}-status-warning`]: status === 'warning',
    [`${prefixCls}-status-error`]: status === 'error',
    [`${prefixCls}-status-validating`]: status === 'validating',
    [`${prefixCls}-has-feedback`]: hasFeedback,
  });
}

export const getMergedStatus = (contextStatus?: ValidateStatus, customStatus?: InputStatus) =>
  customStatus || contextStatus;
