import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ColProps } from '../grid/col';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { FormContext } from './context';
import { FormLabelAlign } from './interface';
import { useForm, FormInstance } from './util';
import SizeContext, { SizeType, SizeContextProvider } from '../config-provider/SizeContext';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface FormProps extends Omit<RcFormProps, 'form'> {
  prefixCls?: string;
  hideRequiredMark?: boolean;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  form?: FormInstance;
  size?: SizeType;
  scrollToFirstError?: boolean;
}

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const contextSize = React.useContext(SizeContext);
  const { getPrefixCls, direction }: ConfigConsumerProps = React.useContext(ConfigContext);

  const {
    form,
    colon,
    name,
    labelAlign,
    labelCol,
    wrapperCol,
    prefixCls: customizePrefixCls,
    hideRequiredMark,
    className = '',
    layout = 'horizontal',
    size = contextSize,
    scrollToFirstError,
    onFinishFailed,
  } = props;
  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: size,
    },
    className,
  );

  const formProps = omit(props, [
    'prefixCls',
    'className',
    'layout',
    'hideRequiredMark',
    'wrapperCol',
    'labelAlign',
    'labelCol',
    'colon',
    'scrollToFirstError',
  ]);

  const [wrapForm] = useForm(form);
  wrapForm.__INTERNAL__.name = name;

  const formContextValue = React.useMemo(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical',
      colon,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, colon],
  );

  React.useImperativeHandle(ref, () => wrapForm);

  const onInternalFinishFailed = (errorInfo: ValidateErrorEntity) => {
    if (onFinishFailed) {
      onFinishFailed(errorInfo);
    }

    if (scrollToFirstError && errorInfo.errorFields.length) {
      wrapForm.scrollToField(errorInfo.errorFields[0].name);
    }
  };

  return (
    <SizeContextProvider size={size}>
      <FormContext.Provider value={formContextValue}>
        <FieldForm
          id={name}
          {...formProps}
          onFinishFailed={onInternalFinishFailed}
          form={wrapForm}
          className={formClassName}
        />
      </FormContext.Provider>
    </SizeContextProvider>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm);

export { useForm, List, FormInstance };

export default Form;
