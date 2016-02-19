import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import Input from '../input';
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

// 对于 import { Form, Input } from 'antd/lib/form/';
// 的方式做向下兼容
// https://github.com/ant-design/ant-design/pull/566
Form.Form = Form;
Form.Input = Input;

export default Form;
