import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import * as React from 'react';
import omit from 'rc-util/lib/omit';
import pickAttrs from 'rc-util/lib/pickAttrs';
import type { Meta } from 'rc-field-form/lib/interface';
import Row from '../../row';
import FormItemLabel from '../FormItemLabel';
import FormItemInput from '../FormItemInput';
import type { FormItemStatusContextProps, ReportMetaChange } from '../context';
import { FormContext, FormItemInputContext, NoStyleItemContext } from '../context';
import type { FormItemProps, ValidateStatus } from '.';

const iconMap = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

export interface ItemHolderProps
  extends Pick<FormItemProps, 'help' | 'validateStatus' | 'hasFeedback' | 'hidden'> {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
  meta: Meta;
  children?: React.ReactNode;
  fieldId?: string;
  isRequired?: boolean;
  onSubItemMetaChange: ReportMetaChange;
}

export default function ItemHolder(props: ItemHolderProps) {
  const {
    prefixCls,
    className,
    style,
    help,
    errors,
    warnings,
    validateStatus,
    meta,
    hasFeedback,
    hidden,
    children,
    fieldId,
    isRequired,
    onSubItemMetaChange,
    ...restProps
  } = props;

  const { requiredMark } = React.useContext(FormContext);

  // ======================== Status ========================
  let mergedValidateStatus: ValidateStatus = '';
  if (validateStatus !== undefined) {
    mergedValidateStatus = validateStatus;
  } else if (meta.validating) {
    mergedValidateStatus = 'validating';
  } else if (errors.length) {
    mergedValidateStatus = 'error';
  } else if (warnings.length) {
    mergedValidateStatus = 'warning';
  } else if (meta.touched) {
    mergedValidateStatus = 'success';
  }

  const formItemStatusContext = React.useMemo<FormItemStatusContextProps>(() => {
    let feedbackIcon: React.ReactNode;
    if (hasFeedback) {
      const IconNode = mergedValidateStatus && iconMap[mergedValidateStatus];
      feedbackIcon = IconNode ? (
        <span
          className={classNames(
            `${prefixCls}-item-feedback-icon`,
            `${prefixCls}-item-feedback-icon-${mergedValidateStatus}`,
          )}
        >
          <IconNode />
        </span>
      ) : null;
    }

    return {
      status: mergedValidateStatus,
      hasFeedback,
      feedbackIcon,
      isFormItemInput: true,
    };
  }, [mergedValidateStatus, hasFeedback]);

  // ======================== Render ========================
  const itemClassName = {
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-item-with-help`]:
      (help !== undefined && help !== null) || errors.length || warnings.length,
    [`${className}`]: !!className,

    // Status
    [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
    [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
    [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
    [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
    [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
    [`${prefixCls}-item-hidden`]: hidden,
  };

  return (
    <Row
      className={classNames(itemClassName)}
      style={style}
      key="row"
      {...omit(pickAttrs(restProps), [
        'htmlFor',
        'id', // It is deprecated because `htmlFor` is its replacement.
      ] as any)}
    >
      {/* Label */}
      <FormItemLabel
        htmlFor={fieldId}
        required={isRequired}
        requiredMark={requiredMark}
        {...props}
        prefixCls={prefixCls}
      />
      {/* Input Group */}
      <FormItemInput
        {...props}
        {...meta}
        errors={errors}
        warnings={warnings}
        prefixCls={prefixCls}
        status={mergedValidateStatus}
        help={help}
      >
        <NoStyleItemContext.Provider value={onSubItemMetaChange}>
          <FormItemInputContext.Provider value={formItemStatusContext}>
            {children}
          </FormItemInputContext.Provider>
        </NoStyleItemContext.Provider>
      </FormItemInput>
    </Row>
  );
}
