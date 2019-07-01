import InternalForm, { useForm, FormInstance } from './Form';
import Item from './FormItem';
import List from './FormList';
import { FormProvider } from './context';

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
