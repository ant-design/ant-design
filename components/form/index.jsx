import ReactDOM from 'react-dom';
import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import Input from '../input';
import { createForm } from 'rc-form';
import scrollIntoView from 'dom-scroll-into-view';

function wrapValidateFields(validateFields) {
  return (...args) => {
    const originalCallback = args[args.length - 1];

    function newCb(error, values) {
      if (error) {
        for (const name in error) {
          if (error.hasOwnProperty(name) && error[name].instance) {
            scrollIntoView(ReactDOM.findDOMNode(error[name].instance), window, {
              onlyScrollIfNeeded: true,
            });
            break;
          }
        }
      }
      if (typeof originalCallback === 'function') {
        originalCallback(error, values);
      }
    }

    if (typeof originalCallback === 'function') {
      args[args.length - 1] = newCb;
    } else {
      args.push(newCb);
    }
    return validateFields.apply(null, args);
  };
}

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: '__meta',
    refComponent: true,
    mapProps(props) {
      const form = props.form;
      form.validateFieldsAndScroll = wrapValidateFields(form.validateFields);
      if (typeof o.mapProps === 'function') {
        return o.mapProps(props);
      }
      return props;
    },
  };

  return createForm(options);
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
