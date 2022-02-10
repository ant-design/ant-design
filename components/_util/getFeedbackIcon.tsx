import React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { ValidateStatus } from '../form/FormItem';

const iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

const getFeedbackIcon = (prefixCls: string, status?: ValidateStatus) => {
  const IconNode = status && iconMap[status];
  return IconNode ? (
    <span className={`${prefixCls}-feedback-icon`}>
      <IconNode />
    </span>
  ) : null;
};

export default getFeedbackIcon;
