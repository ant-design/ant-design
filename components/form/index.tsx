import { Rule, RuleObject, RuleRender } from 'rc-field-form/lib/interface';
import InternalForm, { useForm, FormInstance, FormProps } from './Form';
import Item, { FormItemProps } from './FormItem';
import List, { FormListProps } from './FormList';
import { FormProvider } from './context';
import devWarning from '../_util/devWarning';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const Form = InternalForm as FormInterface;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;
Form.create = () => {
  devWarning(
    false,
    'Form',
    'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
  );
};

export { FormInstance, FormProps, FormItemProps, FormListProps, Rule, RuleObject, RuleRender };

export default Form;
