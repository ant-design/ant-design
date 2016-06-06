import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import createDOMForm from 'rc-form/lib/createDOMForm';

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
  };

  return createDOMForm(options);
};
Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
