import * as React from 'react';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import type { Meta } from 'rc-field-form/lib/interface';

import type { FeedbackIcons, ValidateStatus } from '.';
import { FormContext, FormItemInputContext, type FormItemStatusContextProps } from '../context';
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
  hasFeedback?: boolean | { icons?: FeedbackIcons };
  noStyle?: boolean;
}

export default function StatusProvider({
  children,
  errors,
  warnings,
  hasFeedback,
  validateStatus,
  prefixCls,
  meta,
  noStyle,
}: StatusProviderProps) {
  const itemPrefixCls = `${prefixCls}-item`;
  const { feedbackIcons } = React.useContext(FormContext);

  const mergedValidateStatus = getStatus(
    errors,
    warnings,
    meta,
    null,
    !!hasFeedback,
    validateStatus,
  );

  const {
    isFormItemInput: parentIsFormItemInput,
    status: parentStatus,
    hasFeedback: parentHasFeedback,
    feedbackIcon: parentFeedbackIcon,
  } = React.useContext(FormItemInputContext);

  // ====================== Context =======================
  const formItemStatusContext = React.useMemo<FormItemStatusContextProps>(() => {
    let feedbackIcon: React.ReactNode;
    if (hasFeedback) {
      const customIcons = (hasFeedback !== true && hasFeedback.icons) || feedbackIcons;
      const customIconNode =
        mergedValidateStatus &&
        customIcons?.({ status: mergedValidateStatus, errors, warnings })?.[mergedValidateStatus];
      const IconNode = mergedValidateStatus && iconMap[mergedValidateStatus];
      feedbackIcon =
        customIconNode !== false && IconNode ? (
          <span
            className={classNames(
              `${itemPrefixCls}-feedback-icon`,
              `${itemPrefixCls}-feedback-icon-${mergedValidateStatus}`,
            )}
          >
            {customIconNode || <IconNode />}
          </span>
        ) : null;
    }

    const context: FormItemStatusContextProps = {
      status: mergedValidateStatus || '',
      errors,
      warnings,
      hasFeedback: !!hasFeedback,
      feedbackIcon,
      isFormItemInput: true,
    };

    // No style will follow parent context
    if (noStyle) {
      context.status = (mergedValidateStatus ?? parentStatus) || '';
      context.isFormItemInput = parentIsFormItemInput;
      context.hasFeedback = !!(hasFeedback ?? parentHasFeedback);
      context.feedbackIcon = hasFeedback !== undefined ? context.feedbackIcon : parentFeedbackIcon;
    }

    return context;
  }, [mergedValidateStatus, hasFeedback, noStyle, parentIsFormItemInput, parentStatus]);

  // ======================= Render =======================
  return (
    <FormItemInputContext.Provider value={formItemStatusContext}>
      {children}
    </FormItemInputContext.Provider>
  );
}
