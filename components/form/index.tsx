import InternalForm, { useForm, FormInstance, FormProvider } from './Form';
import Item from './FormItem';
import List from './FormList';

type InternalForm = typeof InternalForm;
interface Form extends InternalForm {
  useForm: typeof useForm;
  Item: typeof Item;
  List: typeof List;
  Provider: typeof FormProvider;
}

const Form: Form = InternalForm as Form;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;

export { FormInstance };

export default Form;
