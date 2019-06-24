import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import FieldForm, { FormInstance } from 'rc-field-form';
import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { tuple } from '../_util/type';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';

const FormLayouts = tuple('horizontal', 'inline', 'vertical');
export type FormLayout = (typeof FormLayouts)[number];

interface FormProps extends RcFormProps {
  prefixCls?: string;
  hideRequiredMark?: boolean;
  layout?: FormLayout;
}

const InternalForm: React.FC<FormProps> = (props, ref) => {
  const { getPrefixCls }: ConfigConsumerProps = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    hideRequiredMark,
    className = '',
    layout = 'horizontal',
  } = props;
  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
    },
    className,
  );

  const formProps = omit(props, [
    'prefixCls',
    'className',
    'layout',
    'form',
    'hideRequiredMark',
    'wrapperCol',
    'labelAlign',
    'labelCol',
    'colon',
  ]);

  return <FieldForm {...formProps} ref={ref} className={formClassName} />;
};

const Form = React.forwardRef<FormInstance>(InternalForm);

export default Form;
