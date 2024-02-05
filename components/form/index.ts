import type { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import warning from '../_util/warning';
import ErrorList, { type ErrorListProps } from './ErrorList';
import InternalForm, { useForm, useWatch, type FormInstance, type FormProps } from './Form';
import Item, { type FormItemProps } from './FormItem';
import List, {
  type FormListFieldData,
  type FormListOperation,
  type FormListProps,
} from './FormList';
import type { FormScope, FormScopeProps } from './context';
import { FormProvider, ScopeProvider } from './context';
import useFormInstance from './hooks/useFormInstance';
import useFormScope from './hooks/useFormScope';

type InternalFormType = typeof InternalForm;

type CompoundedComponent = InternalFormType & {
  useForm: typeof useForm;
  useFormInstance: typeof useFormInstance;
  useWatch: typeof useWatch;
  useScope: typeof useFormScope;
  Item: typeof Item;
  List: typeof List;
  ErrorList: typeof ErrorList;
  Provider: typeof FormProvider;
  Scope: typeof ScopeProvider;

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
Form.Scope = ScopeProvider;
Form.useScope = useFormScope;
Form.create = () => {
  warning(
    false,
    'Form',
    'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
  );
};

export type {
  ErrorListProps,
  FormInstance,
  FormItemProps,
  FormListFieldData,
  FormListOperation,
  FormListProps,
  FormProps,
  Rule,
  RuleObject,
  RuleRender,
  FormScope,
  FormScopeProps,
};

export default Form;
