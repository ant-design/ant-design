import InternalForm, { useForm, FormInstance } from './Form';
import Item from './FormItem';
import List from './FormList';
import { FormProvider } from './context';
import warning from '../_util/warning';

type InternalForm = typeof InternalForm;
interface Form extends InternalForm {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  Provider: typeof FormProvider;

  /** @deprecated Only for warning usage. Do not use. */
  create: () => void;
}

const Form: Form = InternalForm as Form;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;
Form.create = () => {
  warning(
    false,
    'Form',
    'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.',
  );
};

export { FormInstance };

export default Form;
