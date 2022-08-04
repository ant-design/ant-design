import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import warning from '../_util/warning';
import { FormProvider } from './context';
import ErrorList, { ErrorListProps } from './ErrorList';
import InternalForm, { FormInstance, FormProps, useForm, useWatch } from './Form';
import Item, { FormItemProps } from './FormItem';
import List, { FormListFieldData, FormListOperation, FormListProps } from './FormList';
import useFormInstance from './hooks/useFormInstance';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  useFormInstance: typeof useFormInstance;
  useWatch: typeof useWatch;
  Item: typeof Item;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;
Form.List = List;
Form.ErrorList = ErrorList;
Form.useForm = useForm;
Form.useFormInstance = useFormInstance;
Form.useWatch = useWatch;
Form.Provider = FormProvider;
Form.create = () => {
  warning(
    false,
    'Form',
    'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
  );
};

export {
  FormInstance,
  FormProps,
  FormItemProps,
  ErrorListProps,
  Rule,
  RuleObject,
  RuleRender,
  FormListProps,
  FormListFieldData,
  FormListOperation,
};

export default Form;
