import * as React from 'react';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ColProps } from '../grid/col';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { FormContext } from './context';
import { FormLabelAlign } from './interface';
import useForm, { FormInstance } from './hooks/useForm';
import SizeContext, { SizeType, SizeContextProvider } from '../config-provider/SizeContext';

export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  hideRequiredMark?: boolean;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  form?: FormInstance<Values>;
  size?: SizeType;
  scrollToFirstError?: boolean;
}

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (props, ref) => {
  const contextSize = React.useContext(SizeContext);
  const { getPrefixCls, direction }: ConfigConsumerProps = React.useContext(ConfigContext);

  const { name } = props;

  const {
    prefixCls: customizePrefixCls,
    className = '',
    size = contextSize,
    form,
    colon,
    labelAlign,
    labelCol,
    wrapperCol,
    hideRequiredMark,
    layout = 'horizontal',
    scrollToFirstError,
    onFinishFailed,
    ...restFormProps
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

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = React.useMemo(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical',
      colon,
      itemRef: __INTERNAL__.itemRef,
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
          {...restFormProps}
          onFinishFailed={onInternalFinishFailed}
          form={wrapForm}
          className={formClassName}
        />
      </FormContext.Provider>
    </SizeContextProvider>
  );
};

const Form = React.forwardRef<FormInstance, FormProps>(InternalForm) as <Values = any>(
  props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

export { useForm, List, FormInstance };

export default Form;
