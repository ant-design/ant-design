import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import useMemo from 'rc-util/lib/hooks/useMemo';
import CSSMotion from 'rc-motion';

import Col, { ColProps } from '../grid/col';
import { ValidateStatus } from './FormItem';
import { FormContext } from './context';
import useCacheErrors from './hooks/useCacheErrors';

interface FormItemInputMiscProps {
  prefixCls: string;
  children: React.ReactNode;
  errors: React.ReactNode[];
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  onDomErrorVisibleChange: (visible: boolean) => void;
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
}

const iconMap: { [key: string]: any } = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = ({
  prefixCls,
  wrapperCol,
  children,
  help,
  errors,
  onDomErrorVisibleChange,
  hasFeedback,
  validateStatus,
  extra,
}) => {
  const [, forceUpdate] = React.useState({});

  const baseClassName = `${prefixCls}-item`;

  const formContext = React.useContext(FormContext);

  const mergedWrapperCol: ColProps = wrapperCol || formContext.wrapperCol || {};

  const className = classNames(`${baseClassName}-control`, mergedWrapperCol.className);

  const [visible, cacheErrors] = useCacheErrors(
    errors,
    changedVisible => {
      if (changedVisible) {
        /**
         * We trigger in sync to avoid dom shaking but this get warning in react 16.13.
         * So use Promise to keep in micro async to handle this.
         * https://github.com/ant-design/ant-design/issues/21698#issuecomment-593743485
         */
        Promise.resolve().then(() => {
          onDomErrorVisibleChange(true);
        });
      }
      forceUpdate({});
    },
    !!help,
  );

  React.useEffect(
    () => () => {
      onDomErrorVisibleChange(false);
    },
    [],
  );

  const memoErrors = useMemo(
    () => cacheErrors,
    visible,
    (_, nextVisible) => nextVisible,
  );

  // Should provides additional icon if `hasFeedback`
  const IconNode = validateStatus && iconMap[validateStatus];
  const icon =
    hasFeedback && IconNode ? (
      <span className={`${baseClassName}-children-icon`}>
        <IconNode />
      </span>
    ) : null;

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
        <CSSMotion
          motionDeadline={500}
          visible={visible}
          motionName="show-help"
          onLeaveEnd={() => {
            onDomErrorVisibleChange(false);
          }}
          motionAppear
          removeOnLeave
        >
          {({ className: motionClassName }: { className: string }) => {
            return (
              <div className={classNames(`${baseClassName}-explain`, motionClassName)} key="help">
                {memoErrors.map((error, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} role="alert">
                    {error}
                  </div>
                ))}
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
