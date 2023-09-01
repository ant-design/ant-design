import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import type { Meta } from 'rc-field-form/lib/interface';

import type { ValidateStatus } from '.';
import { FormItemInputContext, type FormItemStatusContextProps } from '../context';
import { getStatus } from '../util';

const iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

export interface StatusProviderProps {
  children?: React.ReactNode;
  validateStatus?: ValidateStatus;
  prefixCls: string;
  meta: Meta;
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
  hasFeedback?: boolean;
}

export default function StatusProvider({
  children,
  errors,
  warnings,
  hasFeedback,
  validateStatus,
  prefixCls,
  meta,
}: StatusProviderProps) {
  const itemPrefixCls = `${prefixCls}-item`;

  const mergedValidateStatus = getStatus(errors, warnings, meta, hasFeedback, validateStatus);

  // ====================== Context =======================
  const formItemStatusContext = React.useMemo<FormItemStatusContextProps>(() => {
    let feedbackIcon: React.ReactNode;
    if (hasFeedback) {
      const IconNode = mergedValidateStatus && iconMap[mergedValidateStatus];
      feedbackIcon = IconNode ? (
        <span
          className={classNames(
            `${itemPrefixCls}-feedback-icon`,
            `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`,
          )}
        >
          <IconNode />
        </span>
      ) : null;
    }

    return {
      status: mergedValidateStatus,
      errors,
      warnings,
      hasFeedback,
      feedbackIcon,
      isFormItemInput: true,
    };
  }, [mergedValidateStatus, hasFeedback]);

  // ======================= Render =======================
  return (
    <FormItemInputContext.Provider value={formItemStatusContext}>
      {children}
    </FormItemInputContext.Provider>
  );
}
