import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { ColProps } from '../grid/col';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { FormContext } from './context';
import { FormLabelAlign } from './interface';
import { useForm, FormInstance } from './util';
import { SizeType, SizeContextProvider } from '../config-provider/SizeContext';

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
}

const InternalForm: React.FC<FormProps> = (props, ref) => {
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
    size,
  } = props;
  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
      [`${prefixCls}-rtl`]: direction === 'rtl',
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
  ]);

  const [wrapForm] = useForm(form);
  wrapForm.__INTERNAL__.name = name;

  React.useImperativeHandle(ref, () => wrapForm);

  return (
    <SizeContextProvider size={size}>
      <FormContext.Provider
        value={{
          name,
          labelAlign,
          labelCol,
          wrapperCol,
          vertical: layout === 'vertical',
          colon,
        }}
      >
        <FieldForm id={name} {...formProps} form={wrapForm} className={formClassName} />
      </FormContext.Provider>
    </SizeContextProvider>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm);

export { useForm, List, FormInstance };

export default Form;
