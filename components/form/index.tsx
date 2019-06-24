import InternalForm from './Form';
import Item from './FormItem';

type InternalForm = typeof InternalForm;
interface Form extends InternalForm {
  Item: typeof Item;
}

const Form: Form = InternalForm as Form;

Form.Item = Item;

export default Form;
