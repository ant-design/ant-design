import * as React from 'react';
import classNames from 'classnames';
import Col, { ColProps } from '../grid/col';
import { ValidateStatus } from './FormItem';
import { FormContext, FormItemPrefixContext } from './context';
import ErrorList, { FeedbackIconType, getStatusIcon } from './ErrorList';

/**
 * Legacy: show use `legacy`, and `false` to hidden.
 * Latest: `true`
 */
export type CompatibleIconType = 'legacy' | boolean;

interface FormItemInputMiscProps {
  prefixCls: string;
  compatibleIconType?: CompatibleIconType;
  children: React.ReactNode;
  errors: React.ReactNode[];
  validateStatus?: ValidateStatus;
  onDomErrorVisibleChange: (visible: boolean) => void;
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
  feedback?: React.ReactNode;
  feedbackIcon?: FeedbackIconType;
  extra?: React.ReactNode;
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = ({
  prefixCls,
  wrapperCol,
  children,
  feedback,
  feedbackIcon,
  compatibleIconType,
  errors,
  onDomErrorVisibleChange,
  validateStatus,
  extra,
}) => {
  const baseClassName = `${prefixCls}-item`;

  const formContext = React.useContext(FormContext);

  const mergedWrapperCol: ColProps = wrapperCol || formContext.wrapperCol || {};

  const className = classNames(`${baseClassName}-control`, mergedWrapperCol.className);

  React.useEffect(
    () => () => {
      onDomErrorVisibleChange(false);
    },
    [],
  );

  // Should provides additional icon if `hasFeedback`
  const icon =
    compatibleIconType === 'legacy' &&
    getStatusIcon(`${baseClassName}-children-icon`, validateStatus);

  // Pass to sub FormItem should not with col info
  const subFormContext = { ...formContext };
  delete subFormContext.labelCol;
  delete subFormContext.wrapperCol;

  return (
    <FormContext.Provider value={subFormContext}>
      <Col {...mergedWrapperCol} className={className}>
        <div className={`${baseClassName}-control-input`}>
          <div className={`${baseClassName}-control-input-content`}>{children}</div>
          {icon}
        </div>
        <FormItemPrefixContext.Provider
          value={{ prefixCls, validateStatus, feedbackIcon, compatibleIconType }}
        >
          <ErrorList
            errors={errors}
            feedback={feedback}
            onDomErrorVisibleChange={onDomErrorVisibleChange}
          />
        </FormItemPrefixContext.Provider>
        {extra && <div className={`${baseClassName}-extra`}>{extra}</div>}
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemInput;
