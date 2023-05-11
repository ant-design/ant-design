import type { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import warning from '../_util/warning';
import { FormProvider } from './context';
import ErrorList, { type ErrorListProps } from './ErrorList';
import InternalForm, { type FormInstance, type FormProps, useForm, useWatch } from './Form';
import Item, { type FormItemProps } from './FormItem';
import List, {
  type FormListFieldData,
  type FormListOperation,
  type FormListProps,
} from './FormList';
import useFormInstance from './hooks/useFormInstance';

type InternalFormType = typeof InternalForm;

type CompoundedComponent = InternalFormType & {
  useForm: typeof useForm;
  useFormInstance: typeof useFormInstance;
  useWatch: typeof useWatch;
  Item: typeof Item;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
};

const Form = InternalForm as CompoundedComponent;

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

export type {
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
