import React from 'react';
import { ValidateStatus } from '../form/FormItem';
import iconMap from './validationIcons';

const getFeedbackIcon = (prefixCls: string, status?: ValidateStatus) => {
  const IconNode = status && iconMap[status];
  return IconNode ? (
    <span className={`${prefixCls}-feedback-icon`}>
      <IconNode />
    </span>
  ) : null;
};

export default getFeedbackIcon;
