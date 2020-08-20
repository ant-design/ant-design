import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { ColProps } from '../grid/col';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import { FormContext, FormContextProps } from './context';
import { FormLabelAlign } from './interface';
import useForm, { FormInstance } from './hooks/useForm';
import SizeContext, { SizeType, SizeContextProvider } from '../config-provider/SizeContext';

export type RequiredMark = boolean | 'optional';
export type FormLayout = 'horizontal' | 'inline' | 'vertical';

export interface FormProps<Values = any> extends Omit<RcFormProps<Values>, 'form'> {
  prefixCls?: string;
  colon?: boolean;
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  form?: FormInstance<Values>;
  size?: SizeType;
  scrollToFirstError?: boolean;
  requiredMark?: RequiredMark;
}

interface InternalFormProps<Values = any> extends FormProps<Values> {
  hideRequiredMark?: boolean;
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
    requiredMark,
    onFinishFailed,
    ...restFormProps
  } = props as InternalFormProps;

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (hideRequiredMark) {
      return false;
    }

    return true;
  }, [hideRequiredMark, requiredMark]);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: size,
    },
    className,
  );

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = useMemo<FormContextProps>(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical',
      colon,
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, colon, mergedRequiredMark],
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
