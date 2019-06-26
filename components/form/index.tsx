import InternalForm, { useForm } from './Form';
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

export default Form;
