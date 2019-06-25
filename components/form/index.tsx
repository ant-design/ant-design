import InternalForm, { useForm } from './Form';
import Item from './FormItem';

type InternalForm = typeof InternalForm;
interface Form extends InternalForm {
  Item: typeof Item;
  useForm: typeof useForm;
}

const Form: Form = InternalForm as Form;

Form.Item = Item;
Form.useForm = useForm;

export default Form;
