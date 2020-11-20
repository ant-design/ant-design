import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';

import Col, { ColProps } from '../grid/col';
import { ValidateStatus } from './FormItem';
import { FormContext, FormItemPrefixContext } from './context';
import ErrorList from './ErrorList';

interface FormItemInputMiscProps {
  prefixCls: string;
  children: React.ReactNode;
  errors: React.ReactNode[];
  hasFeedback?: boolean;
  validateStatus?: ValidateStatus;
  onDomErrorVisibleChange: (visible: boolean) => void;
  /**
   * @private Internal usage, do not use in any of your production.
   */
  _internalItemRender?: {
    mark: string;
    render: (
      props: FormItemInputProps & FormItemInputMiscProps,
      domList: {
        input: JSX.Element;
        errorList: JSX.Element;
        extra: JSX.Element | null;
      },
    ) => React.ReactNode;
  };
}

export interface FormItemInputProps {
  wrapperCol?: ColProps;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  status?: ValidateStatus;
}

const iconMap: { [key: string]: any } = {
  success: CheckCircleFilled,
  warning: ExclamationCircleFilled,
  error: CloseCircleFilled,
  validating: LoadingOutlined,
};

const FormItemInput: React.FC<FormItemInputProps & FormItemInputMiscProps> = props => {
  const {
    prefixCls,
    status,
    wrapperCol,
    children,
    help,
    errors,
    onDomErrorVisibleChange,
    hasFeedback,
    _internalItemRender: formItemRender,
    validateStatus,
    extra,
  } = props;
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

  const inputDom = (
    <div className={`${baseClassName}-control-input`}>
      <div className={`${baseClassName}-control-input-content`}>{children}</div>
      {icon}
    </div>
  );
  const errorListDom = (
    <FormItemPrefixContext.Provider value={{ prefixCls, status }}>
      <ErrorList errors={errors} help={help} onDomErrorVisibleChange={onDomErrorVisibleChange} />
    </FormItemPrefixContext.Provider>
  );

  // If extra = 0, && will goes wrong
  // 0&&error -> 0
  const extraDom = extra ? <div className={`${baseClassName}-extra`}>{extra}</div> : null;

  const dom =
    formItemRender && formItemRender.mark === 'pro_table_render' && formItemRender.render ? (
      formItemRender.render(props, { input: inputDom, errorList: errorListDom, extra: extraDom })
    ) : (
      <>
        {inputDom}
        {errorListDom}
        {extraDom}
      </>
    );
  return (
    <FormContext.Provider value={subFormContext}>
      <Col {...mergedWrapperCol} className={className}>
        {dom}
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemInput;
