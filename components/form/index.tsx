import InternalForm, { useForm, FormInstance } from './Form';
import Item from './FormItem';
import List from './FormList';

type InternalForm = typeof InternalForm;
interface Form extends InternalForm {
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
}

const Form: Form = InternalForm as Form;

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;

export { FormInstance };

export default Form;
