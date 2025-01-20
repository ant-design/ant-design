import type { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';

import warning from '../_util/warning';
import { FormProvider } from './context';
import ErrorList from './ErrorList';
import type { ErrorListProps } from './ErrorList';
import InternalForm, { useForm, useWatch } from './Form';
import type { FormInstance, FormProps } from './Form';
import Item from './FormItem';
import type { FormItemProps } from './FormItem';
import List from './FormList';
import type { FormListFieldData, FormListOperation, FormListProps } from './FormList';
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
};

export default Form;
