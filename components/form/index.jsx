import React, { PropTypes } from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import Form from './Form';
import FormItem from './FormItem';
import ValueMixin from './ValueMixin';
import { FIELD_META_PROP } from './constants';

Form.create = (o = {}) => {
  const options = {
    ...o,
    fieldNameProp: 'id',
    fieldMetaProp: FIELD_META_PROP,
  };
  const formWrapper = createDOMForm(options);

  /* eslint-disable react/prefer-es6-class */
  return (Component) => formWrapper(React.createClass({
    propTypes: {
      form: PropTypes.object.isRequired,
    },
    childContextTypes: {
      form: PropTypes.object.isRequired,
    },
    getChildContext() {
      return {
        form: this.props.form,
      };
    },
    render() {
      return <Component {...this.props} />;
    },
  }));
};
Form.Item = FormItem;

// @Deprecated
Form.ValueMixin = ValueMixin;

export default Form;
