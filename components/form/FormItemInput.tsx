import * as React from 'React';
import classNames from 'classnames';
import Icon from '../icon';
import CSSMotion from 'rc-animate/lib/CSSMotion';
import Col, { ColProps } from '../grid/col';
import { ValidateStatus } from './FormItem';
import { FormContext, FormContextProps } from './context';
import { useCacheErrors } from './util';

interface FormItemInputMiscProps {
  prefixCls: string;
  children: React.ReactNode;
  errors: string[];
  touched: boolean;
  validating: boolean;
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  onDomErrorVisibleChange: (visible: boolean) => void;
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
}

function getIconType(validateStatus?: ValidateStatus) {
  switch (validateStatus) {
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-circle';
    case 'error':
      return 'close-circle';
    case 'validating':
      return 'loading';
    default:
      return '';
  }
}

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = ({
  prefixCls,
  wrapperCol,
  children,
  errors,
  onDomErrorVisibleChange,
  hasFeedback,
  validateStatus,
  help,
  extra,
}) => {
  const baseClassName = `${prefixCls}-item`;

  const { wrapperCol: contextWrapperCol, vertical }: FormContextProps = React.useContext(
    FormContext,
  );

  const mergedWrapperCol: ColProps = wrapperCol || contextWrapperCol || {};

  const className = classNames(`${baseClassName}-control`, mergedWrapperCol.className);

  const [visible, cacheErrors] = useCacheErrors(errors, visible => {
    if (visible) {
      onDomErrorVisibleChange(true);
    }
  });

  // Should provides additional icon if `hasFeedback`
  const iconType = getIconType(validateStatus);
  const icon =
    hasFeedback && iconType ? (
      <span className={`${baseClassName}-children-icon`}>
        <Icon type={iconType} theme={iconType === 'loading' ? 'outlined' : 'filled'} />
      </span>
    ) : null;

  // No pass FormContext since it's useless
  return (
    <FormContext.Provider value={{ vertical }}>
      <Col {...mergedWrapperCol} className={className}>
        <div className={`${baseClassName}-control-input`}>
          {children}
          {icon}
        </div>
        <CSSMotion
          visible={visible}
          motionName="show-help"
          onLeaveEnd={() => {
            onDomErrorVisibleChange(false);
          }}
          motionAppear
          removeOnLeave
        >
          {({ className }: { className: string }) => {
            return (
              <div className={classNames(`${baseClassName}-explain`, className)} key="help">
                {cacheErrors}
              </div>
            );
          }}
        </CSSMotion>
        {extra && <div className={`${baseClassName}-extra`}>{extra}</div>}
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemInput;
